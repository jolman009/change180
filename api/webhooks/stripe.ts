import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import type { BillingPackageId } from "../_lib/types.js";
import {
  ensureSchema,
  findBookingIdByCheckoutSession,
  findCustomerByStripeCustomerId,
  getSubscriptionByStripeId,
  markEventProcessed,
  trackAnalyticsEvent,
  updateBillingIntentByCheckoutSession,
  updateBillingIntentByInvoiceId,
  updateBillingIntentBySubscriptionId,
  updateBookingStatus,
  upsertSubscription,
} from "../_lib/db.js";
import { recordPaidDownload } from "../_lib/db.js";
import { sendBillingUpdateEmail, sendDownloadLinkEmail } from "../_lib/email.js";
import { ENV } from "../_lib/env.js";
import { isPost, readRawBody, sendJson } from "../_lib/http.js";
import { getDownloadProduct } from "../_lib/products.js";
import { createBillingPortalSession, getStripeClient } from "../_lib/stripe.js";
import { randomBytes } from "node:crypto";

// Stripe signs the EXACT raw request bytes. Disable Vercel's automatic body
// parsing so `readRawBody` reads the untouched payload from the request stream.
// Otherwise Vercel parses req.body to an object and readRawBody falls back to
// JSON.stringify(), whose output is not guaranteed byte-identical to what
// Stripe signed — intermittently breaking signature verification ("No
// signatures found matching the expected signature for payload").
export const config = {
  api: {
    bodyParser: false,
  },
};

function getMetadataValue(
  metadata: Stripe.Metadata | null | undefined,
  key: string
): string | null {
  if (!metadata) return null;
  const value = metadata[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function toBillingPackageId(value: string | null): BillingPackageId {
  if (
    value === "discovery" ||
    value === "family" ||
    value === "clarity" ||
    value === "rooted" ||
    value === "flourish"
  ) {
    return value;
  }
  return "discovery";
}

function toDate(timestamp?: number | null): Date | null {
  if (!timestamp) return null;
  return new Date(timestamp * 1000);
}

async function handlePaidDownloadPurchase(session: Stripe.Checkout.Session): Promise<void> {
  const fileId = getMetadataValue(session.metadata, "file_id");
  const product = getDownloadProduct(fileId);
  if (!product) return;

  const email = session.customer_details?.email || getMetadataValue(session.metadata, "customer_email");
  if (!email) {
    console.error(`Paid download ${fileId}: no buyer email on session ${session.id}`);
    return;
  }

  const downloadToken = randomBytes(32).toString("hex");
  const created = await recordPaidDownload({
    fileId: product.fileId,
    customerEmail: email,
    checkoutSessionId: session.id,
    paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
    downloadToken,
    amountCents: product.amountCents,
  });

  // Idempotent: a null result means this session was already recorded
  // (webhook retry) — don't email the buyer a second time.
  if (!created) return;

  const downloadUrl = `${ENV.SITE_BASE_URL()}/api/download/${product.fileId}?token=${downloadToken}`;
  await sendDownloadLinkEmail({
    to: email,
    fileName: product.displayName,
    downloadUrl,
  });
}

async function sendPortalEnabledEmail(customerId: string, customSubject: string, bodyPrefix: string): Promise<void> {
  const customer = await findCustomerByStripeCustomerId(customerId);
  if (!customer?.email) return;

  const portalUrl = await createBillingPortalSession(customerId);
  await sendBillingUpdateEmail({
    to: customer.email,
    firstName: customer.name,
    subject: customSubject,
    body: `${bodyPrefix}\n\nManage billing: ${portalUrl}\n\nSupport: ${ENV.BILLING_SUPPORT_EMAIL()}`,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!isPost(req)) {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  await ensureSchema();
  const stripe = getStripeClient();
  const signature = req.headers["stripe-signature"];
  const rawBody = await readRawBody(req);

  // TEMP DIAGNOSTIC — remove after webhook signature issue is resolved.
  console.log("[stripe-webhook-diag]", JSON.stringify({
    bodyType: typeof req.body,
    isBuffer: Buffer.isBuffer(req.body),
    bodyUndefined: req.body === undefined,
    rawBodyLen: rawBody.length,
    rawBodyHead: rawBody.slice(0, 40),
    hasSig: typeof signature === "string",
  }));

  if (!signature || typeof signature !== "string") {
    sendJson(res, 400, { error: "Missing Stripe signature" });
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, ENV.STRIPE_WEBHOOK_SECRET());
  } catch (error) {
    console.error("[stripe-webhook-diag] constructEvent failed:", error instanceof Error ? error.message : error);
    sendJson(res, 400, { error: "Invalid Stripe signature", details: error instanceof Error ? error.message : "Unknown" });
    return;
  }

  const firstProcess = await markEventProcessed({
    provider: "stripe",
    eventId: event.id,
    eventType: event.type,
    payload: event,
  });

  if (!firstProcess) {
    sendJson(res, 200, { ok: true, duplicate: true });
    return;
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Paid file downloads are keyed by a file_id in metadata and are
        // independent of the coaching-package booking flow below.
        await handlePaidDownloadPurchase(session);

        const bookingIdFromMetadata = Number(getMetadataValue(session.metadata, "booking_id"));
        const bookingId = Number.isFinite(bookingIdFromMetadata)
          ? bookingIdFromMetadata
          : await findBookingIdByCheckoutSession(session.id);

        await updateBillingIntentByCheckoutSession({
          checkoutSessionId: session.id,
          status: "checkout_completed",
          stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
          stripeInvoiceId: typeof session.invoice === "string" ? session.invoice : null,
        });

        if (bookingId) {
          await updateBookingStatus(bookingId, "checkout_completed");
        }

        await trackAnalyticsEvent("checkout_completed", "stripe", {
          checkoutSessionId: session.id,
          mode: session.mode,
          bookingId: bookingId || null,
          packageId: getMetadataValue(session.metadata, "package_id"),
        });

        if (session.mode === "subscription" && typeof session.subscription === "string") {
          const packageId = toBillingPackageId(getMetadataValue(session.metadata, "package_id"));
          const totalIterations = Number(getMetadataValue(session.metadata, "total_iterations") || "0");

          await upsertSubscription({
            bookingId: bookingId || null,
            stripeSubscriptionId: session.subscription,
            stripeCustomerId: typeof session.customer === "string" ? session.customer : null,
            packageId,
            status: "active",
            totalIterations: totalIterations || 0,
            paidIterations: 0,
          });

          await updateBillingIntentByCheckoutSession({
            checkoutSessionId: session.id,
            status: "subscription_active",
          });

          await trackAnalyticsEvent("subscription_started", "stripe", {
            subscriptionId: session.subscription,
            packageId,
            bookingId: bookingId || null,
          });
        }

        if (typeof session.customer === "string") {
          await sendPortalEnabledEmail(
            session.customer,
            "Payment confirmed",
            "Your checkout is complete. You can view invoices and manage billing from your portal."
          );
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const rawSubRef = invoice.parent?.subscription_details?.subscription;
        const subscriptionId = typeof rawSubRef === "string" ? rawSubRef : typeof rawSubRef === "object" && rawSubRef ? rawSubRef.id : null;
        const customerId = typeof invoice.customer === "string" ? invoice.customer : null;

        if (invoice.id) {
          await updateBillingIntentByInvoiceId({
            invoiceId: invoice.id,
            status: "payment_succeeded",
          });
        }

        if (subscriptionId) {
          const existing = await getSubscriptionByStripeId(subscriptionId);
          const nextPaidIterations = existing.paid_iterations + 1;
          const totalIterations = existing.total_iterations || Number(getMetadataValue(invoice.parent?.subscription_details?.metadata, "total_iterations") || "0");

          await upsertSubscription({
            bookingId: existing.booking_id ?? null,
            stripeSubscriptionId: subscriptionId,
            stripeCustomerId: customerId,
            packageId: toBillingPackageId(getMetadataValue(invoice.parent?.subscription_details?.metadata, "package_id")),
            status: "active",
            totalIterations: totalIterations || 0,
            paidIterations: nextPaidIterations,
            cancelAtPeriodEnd: totalIterations > 0 && nextPaidIterations >= totalIterations,
            currentPeriodEnd: toDate(invoice.period_end),
          });

          if (totalIterations > 0 && nextPaidIterations >= totalIterations) {
            await stripe.subscriptions.update(subscriptionId, {
              cancel_at_period_end: true,
            });
          }
        }

        if (customerId) {
          await sendPortalEnabledEmail(
            customerId,
            "Payment received",
            "We successfully processed your payment."
          );
        }

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const rawSubRef2 = invoice.parent?.subscription_details?.subscription;
        const subscriptionId = typeof rawSubRef2 === "string" ? rawSubRef2 : typeof rawSubRef2 === "object" && rawSubRef2 ? rawSubRef2.id : null;
        const customerId = typeof invoice.customer === "string" ? invoice.customer : null;

        if (invoice.id) {
          await updateBillingIntentByInvoiceId({
            invoiceId: invoice.id,
            status: "payment_failed",
            lastError: invoice.last_finalization_error?.message || "Payment failed",
          });
        }

        if (subscriptionId) {
          await updateBillingIntentBySubscriptionId({
            subscriptionId,
            status: "payment_failed",
            lastError: invoice.last_finalization_error?.message || "Payment failed",
          });
        }

        await trackAnalyticsEvent("payment_failed", "stripe", {
          invoiceId: invoice.id,
          subscriptionId,
          customerId,
        });

        if (customerId) {
          await sendPortalEnabledEmail(
            customerId,
            "Payment issue detected",
            "We could not process your latest payment. Please update your payment method."
          );
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const packageId = toBillingPackageId(getMetadataValue(subscription.metadata, "package_id"));
        const totalIterations = Number(getMetadataValue(subscription.metadata, "total_iterations") || "0");
        const existing = await getSubscriptionByStripeId(subscription.id);

        await upsertSubscription({
          bookingId: existing.booking_id ?? null,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: typeof subscription.customer === "string" ? subscription.customer : null,
          packageId,
          status: subscription.status,
          totalIterations: totalIterations || existing.total_iterations || 0,
          paidIterations: existing.paid_iterations || 0,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          currentPeriodEnd: toDate(subscription.items?.data?.[0]?.current_period_end),
        });

        await updateBillingIntentBySubscriptionId({
          subscriptionId: subscription.id,
          status: subscription.status === "canceled" ? "subscription_canceled" : "subscription_active",
        });
        break;
      }

      default:
        break;
    }

    sendJson(res, 200, { ok: true });
  } catch (error) {
    await markEventProcessed({
      provider: "stripe",
      eventId: `${event.id}-error`,
      eventType: event.type,
      payload: event,
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });

    sendJson(res, 500, {
      error: "Failed to process Stripe webhook",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
