import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPackageFromEventType, getPackageConfig } from "../_lib/billing-config";
import { parseCalendlyBookingPayload, verifyCalendlySignature } from "../_lib/calendly";
import {
  ensureSchema,
  insertOrGetBooking,
  markEventProcessed,
  trackAnalyticsEvent,
  updateBookingStatus,
  upsertBillingIntent,
  upsertCustomer,
} from "../_lib/db";
import { sendPaymentRequestEmail } from "../_lib/email";
import { ENV } from "../_lib/env";
import { isPost, readRawBody, sendJson } from "../_lib/http";
import { createCheckoutSession, findOrCreateStripeCustomer } from "../_lib/stripe";

function deriveCalendlyEventId(payload: unknown): string {
  const source = (payload as Record<string, unknown>) || {};
  const p = (source.payload as Record<string, unknown>) || {};
  const inviteeObject = (p.invitee as Record<string, unknown>) || {};
  const eventObject = (p.event as Record<string, unknown>) || {};

  const inviteeUri =
    (typeof inviteeObject.uri === "string" ? inviteeObject.uri : null) ||
    (typeof p.invitee === "string" ? p.invitee : null);
  const eventUri =
    (typeof eventObject.uri === "string" ? eventObject.uri : null) ||
    (typeof p.event === "string" ? p.event : null);
  const sourceId = typeof source.id === "string" ? source.id : null;
  const fallbackTime = typeof source.time === "string" ? source.time : Date.now().toString();

  return inviteeUri || eventUri || sourceId || fallbackTime;
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!isPost(req)) {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  await ensureSchema();

  const rawBody = await readRawBody(req);
  const signatureHeader = (req.headers["calendly-webhook-signature"] || req.headers["Calendly-Webhook-Signature"]) as
    | string
    | undefined;
  const signatureValid = verifyCalendlySignature({
    signatureHeader,
    payload: rawBody,
    signingKey: ENV.CALENDLY_WEBHOOK_SIGNING_KEY(),
  });

  if (!signatureValid) {
    sendJson(res, 401, { error: "Invalid Calendly signature" });
    return;
  }

  const body = req.body && typeof req.body === "object" ? req.body : JSON.parse(rawBody || "{}");
  const eventType = String((body as Record<string, unknown>)?.event || "unknown");
  const eventId = deriveCalendlyEventId(body);

  const shouldProcess =
    eventType === "invitee.created" || eventType === "invitee_no_show.created" || eventType === "invitee.rescheduled";

  if (!shouldProcess) {
    await markEventProcessed({
      provider: "calendly",
      eventId,
      eventType,
      payload: body,
      status: "ignored",
    });
    sendJson(res, 200, { ok: true, ignored: true });
    return;
  }

  const firstProcess = await markEventProcessed({
    provider: "calendly",
    eventId,
    eventType,
    payload: body,
    status: "processed",
  });

  if (!firstProcess) {
    sendJson(res, 200, { ok: true, duplicate: true });
    return;
  }

  const bookingPayload = parseCalendlyBookingPayload(body);
  if (!bookingPayload.inviteeEmail) {
    sendJson(res, 400, { error: "Could not extract invitee email from Calendly payload" });
    return;
  }

  const packageId = getPackageFromEventType(bookingPayload.eventTypeUri, bookingPayload.eventTypeName);
  if (!packageId) {
    await trackAnalyticsEvent("booking_completed", "calendly", {
      matchedPackage: null,
      eventTypeUri: bookingPayload.eventTypeUri,
      eventTypeName: bookingPayload.eventTypeName,
      inviteeEmail: bookingPayload.inviteeEmail,
    });
    sendJson(res, 202, { ok: true, warning: "No package mapping found" });
    return;
  }

  const stripeCustomer = await findOrCreateStripeCustomer({
    email: bookingPayload.inviteeEmail,
    name: bookingPayload.inviteeName,
    phone: bookingPayload.inviteePhone,
    metadata: {
      source: "calendly_webhook",
    },
  });

  const customer = await upsertCustomer({
    email: bookingPayload.inviteeEmail,
    name: bookingPayload.inviteeName,
    phone: bookingPayload.inviteePhone,
    language: "en",
    stripeCustomerId: stripeCustomer.id,
  });

  const { booking } = await insertOrGetBooking({
    customerId: customer.id,
    packageId,
    calendlyEventUri: bookingPayload.eventUri,
    calendlyInviteeUri: bookingPayload.inviteeUri,
    calendlyEventTypeUri: bookingPayload.eventTypeUri,
    scheduledAt: bookingPayload.scheduledAt,
    rawPayload: bookingPayload.raw,
  });

  const checkoutSession = await createCheckoutSession({
    packageId,
    bookingId: booking.id,
    customerId: stripeCustomer.id,
    customerEmail: customer.email,
  });

  const packageConfig = getPackageConfig(packageId);
  await upsertBillingIntent({
    bookingId: booking.id,
    packageId,
    billingMode: packageConfig.mode,
    amountCents: packageConfig.amountCents,
    status: "checkout_created",
    checkoutSessionId: checkoutSession.id,
    paymentLinkUrl: checkoutSession.url || null,
  });

  await updateBookingStatus(booking.id, "checkout_created");

  if (checkoutSession.url) {
    await sendPaymentRequestEmail({
      to: customer.email,
      firstName: customer.name,
      packageId,
      checkoutUrl: checkoutSession.url,
      language: customer.language || "en",
    });

    await trackAnalyticsEvent("payment_link_sent", "calendly", {
      bookingId: booking.id,
      packageId,
      email: customer.email,
    });
  }

  await trackAnalyticsEvent("booking_completed", "calendly", {
    bookingId: booking.id,
    packageId,
    email: customer.email,
  });

  sendJson(res, 200, { ok: true });
}
