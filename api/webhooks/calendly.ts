import { getPackageFromEventType, getPackageConfig } from "../_lib/billing-config.js";
import { parseCalendlyBookingPayload, verifyCalendlySignature } from "../_lib/calendly.js";
import {
  ensureSchema,
  insertOrGetBooking,
  markEventProcessed,
  trackAnalyticsEvent,
  updateBookingStatus,
  upsertBillingIntent,
  upsertCustomer,
} from "../_lib/db.js";
import { sendPaymentRequestEmail } from "../_lib/email.js";
import { ENV } from "../_lib/env.js";
import { createCheckoutSession, findOrCreateStripeCustomer } from "../_lib/stripe.js";

// Uses the Web-standard (Request -> Response) signature so `await request.text()`
// yields the EXACT raw request bytes. Calendly's signature is verified over those
// bytes; Vercel's Node runtime eagerly parses the body and offers no reliable way
// to recover the raw payload on this Vite project (config.api.bodyParser is a
// Next.js-only setting that is ignored here).
function jsonResponse(status: number, payload: Record<string, unknown>): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

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

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  await ensureSchema();

  const rawBody = await request.text();
  const signatureHeader = request.headers.get("calendly-webhook-signature") || undefined;
  const signatureValid = verifyCalendlySignature({
    signatureHeader,
    payload: rawBody,
    signingKey: ENV.CALENDLY_WEBHOOK_SIGNING_KEY(),
  });

  if (!signatureValid) {
    return jsonResponse(401, { error: "Invalid Calendly signature" });
  }

  const body = JSON.parse(rawBody || "{}");
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
    return jsonResponse(200, { ok: true, ignored: true });
  }

  const firstProcess = await markEventProcessed({
    provider: "calendly",
    eventId,
    eventType,
    payload: body,
    status: "processed",
  });

  if (!firstProcess) {
    return jsonResponse(200, { ok: true, duplicate: true });
  }

  const bookingPayload = parseCalendlyBookingPayload(body);
  if (!bookingPayload.inviteeEmail) {
    return jsonResponse(400, { error: "Could not extract invitee email from Calendly payload" });
  }

  const packageId = getPackageFromEventType(bookingPayload.eventTypeUri, bookingPayload.eventTypeName);
  if (!packageId) {
    await trackAnalyticsEvent("booking_completed", "calendly", {
      matchedPackage: null,
      eventTypeUri: bookingPayload.eventTypeUri,
      eventTypeName: bookingPayload.eventTypeName,
      inviteeEmail: bookingPayload.inviteeEmail,
    });
    return jsonResponse(202, { ok: true, warning: "No package mapping found" });
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

  return jsonResponse(200, { ok: true });
}
