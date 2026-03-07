import crypto from "node:crypto";
import type { CalendlyBookingPayload } from "./types";

interface CalendlyWebhookSignature {
  timestamp: string;
  signature: string;
}

export function parseCalendlySignatureHeader(headerValue: string | undefined): CalendlyWebhookSignature | null {
  if (!headerValue) return null;

  const parts = headerValue.split(",").map((part) => part.trim());
  const timestampPart = parts.find((part) => part.startsWith("t="));
  const signaturePart = parts.find((part) => part.startsWith("v1="));

  if (!timestampPart || !signaturePart) {
    return null;
  }

  return {
    timestamp: timestampPart.slice(2),
    signature: signaturePart.slice(3),
  };
}

export function verifyCalendlySignature(input: {
  signatureHeader: string | undefined;
  payload: string;
  signingKey: string;
}): boolean {
  const parsed = parseCalendlySignatureHeader(input.signatureHeader);
  if (!parsed) return false;

  const signedPayload = `${parsed.timestamp}.${input.payload}`;
  const expected = crypto
    .createHmac("sha256", input.signingKey)
    .update(signedPayload, "utf8")
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "hex");
  const signatureBuffer = Buffer.from(parsed.signature, "hex");

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

export function parseCalendlyBookingPayload(rawPayload: unknown): CalendlyBookingPayload {
  const payload = (rawPayload as Record<string, unknown>) || {};
  const eventRoot = (payload.payload as Record<string, unknown>) || {};
  const invitee = (eventRoot.invitee as Record<string, unknown>) || {};
  const eventData = (eventRoot.event as Record<string, unknown>) || {};
  const eventType = (eventRoot.event_type as Record<string, unknown>) || {};

  const eventTypeUri =
    stringOrNull(eventRoot.event_type as unknown) ||
    stringOrNull(eventRoot.event_type_uri as unknown) ||
    stringOrNull(eventData.event_type as unknown) ||
    stringOrNull(eventType.uri as unknown) ||
    stringOrNull(payload.event_type as unknown);

  const eventTypeName =
    stringOrNull(eventRoot.event_type_name as unknown) ||
    stringOrNull(eventType.name as unknown) ||
    stringOrNull(eventData.name as unknown);

  const eventUri =
    stringOrNull(eventData.uri as unknown) ||
    stringOrNull(eventRoot.event as unknown) ||
    stringOrNull(payload.event as unknown);

  const inviteeUri =
    stringOrNull(invitee.uri as unknown) ||
    stringOrNull(eventRoot.invitee as unknown);

  const inviteeEmail =
    stringOrNull(invitee.email as unknown) ||
    stringOrNull(eventRoot.email as unknown) ||
    stringOrNull(payload.email as unknown);

  const inviteeName =
    stringOrNull(invitee.name as unknown) ||
    stringOrNull(eventRoot.name as unknown);

  const inviteePhone =
    stringOrNull(invitee.phone_number as unknown) ||
    stringOrNull(eventRoot.phone_number as unknown) ||
    stringOrNull(invitee.text_reminder_number as unknown);

  const scheduledAt =
    stringOrNull(eventData.start_time as unknown) ||
    stringOrNull(eventRoot.scheduled_event_start_time as unknown);

  return {
    eventTypeUri,
    eventTypeName,
    eventUri,
    inviteeUri,
    inviteeEmail,
    inviteeName,
    inviteePhone,
    scheduledAt,
    raw: rawPayload,
  };
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}
