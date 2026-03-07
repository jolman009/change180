import { sql } from "@vercel/postgres";
import type { BillingMode, BillingPackageId, BillingStatus } from "./types.js";

let schemaPromise: Promise<void> | null = null;

export async function ensureSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS customers (
          id BIGSERIAL PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          phone TEXT,
          language TEXT DEFAULT 'en',
          stripe_customer_id TEXT UNIQUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS bookings (
          id BIGSERIAL PRIMARY KEY,
          customer_id BIGINT REFERENCES customers(id) ON DELETE SET NULL,
          package_id TEXT NOT NULL,
          calendly_event_uri TEXT UNIQUE,
          calendly_invitee_uri TEXT UNIQUE,
          calendly_event_type_uri TEXT,
          scheduled_at TIMESTAMPTZ,
          status TEXT NOT NULL DEFAULT 'pending',
          raw_payload JSONB,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS billing_intents (
          id BIGSERIAL PRIMARY KEY,
          booking_id BIGINT REFERENCES bookings(id) ON DELETE CASCADE UNIQUE,
          package_id TEXT NOT NULL,
          billing_mode TEXT NOT NULL,
          amount_cents INTEGER NOT NULL,
          currency TEXT NOT NULL DEFAULT 'usd',
          status TEXT NOT NULL DEFAULT 'pending',
          stripe_checkout_session_id TEXT UNIQUE,
          stripe_payment_intent_id TEXT,
          stripe_invoice_id TEXT,
          payment_link_url TEXT,
          last_error TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS subscriptions (
          id BIGSERIAL PRIMARY KEY,
          booking_id BIGINT REFERENCES bookings(id) ON DELETE CASCADE,
          stripe_subscription_id TEXT UNIQUE NOT NULL,
          stripe_customer_id TEXT,
          package_id TEXT NOT NULL,
          status TEXT NOT NULL,
          total_iterations INTEGER NOT NULL,
          paid_iterations INTEGER NOT NULL DEFAULT 0,
          cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
          current_period_end TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS payment_events (
          id BIGSERIAL PRIMARY KEY,
          provider TEXT NOT NULL,
          provider_event_id TEXT UNIQUE NOT NULL,
          event_type TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'processed',
          error TEXT,
          payload JSONB,
          processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS analytics_events (
          id BIGSERIAL PRIMARY KEY,
          event_name TEXT NOT NULL,
          source TEXT NOT NULL,
          payload JSONB,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
    })();
  }

  return schemaPromise;
}

export interface CustomerRecord {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  language: string | null;
  stripe_customer_id: string | null;
}

export async function upsertCustomer(input: {
  email: string;
  name?: string | null;
  phone?: string | null;
  language?: string;
  stripeCustomerId?: string | null;
}): Promise<CustomerRecord> {
  const language = input.language || "en";
  const { rows } = await sql<CustomerRecord>`
    INSERT INTO customers (email, name, phone, language, stripe_customer_id)
    VALUES (${input.email}, ${input.name ?? null}, ${input.phone ?? null}, ${language}, ${input.stripeCustomerId ?? null})
    ON CONFLICT (email)
    DO UPDATE SET
      name = COALESCE(EXCLUDED.name, customers.name),
      phone = COALESCE(EXCLUDED.phone, customers.phone),
      language = COALESCE(EXCLUDED.language, customers.language),
      stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, customers.stripe_customer_id),
      updated_at = NOW()
    RETURNING id, email, name, phone, language, stripe_customer_id
  `;

  return rows[0];
}

export interface BookingRecord {
  id: number;
  customer_id: number | null;
  package_id: BillingPackageId;
  calendly_event_uri: string | null;
  calendly_invitee_uri: string | null;
  calendly_event_type_uri: string | null;
  status: BillingStatus | string;
}

export async function insertOrGetBooking(input: {
  customerId: number;
  packageId: BillingPackageId;
  calendlyEventUri: string | null;
  calendlyInviteeUri: string | null;
  calendlyEventTypeUri: string | null;
  scheduledAt: string | null;
  rawPayload: unknown;
}): Promise<{ booking: BookingRecord; created: boolean }> {
  const existingByEvent = input.calendlyEventUri
    ? await sql<BookingRecord>`
        SELECT id, customer_id, package_id, calendly_event_uri, calendly_invitee_uri, calendly_event_type_uri, status
        FROM bookings
        WHERE calendly_event_uri = ${input.calendlyEventUri}
      `
    : { rows: [] as BookingRecord[] };

  if (existingByEvent.rows.length > 0) {
    return { booking: existingByEvent.rows[0], created: false };
  }

  const existingByInvitee = input.calendlyInviteeUri
    ? await sql<BookingRecord>`
        SELECT id, customer_id, package_id, calendly_event_uri, calendly_invitee_uri, calendly_event_type_uri, status
        FROM bookings
        WHERE calendly_invitee_uri = ${input.calendlyInviteeUri}
      `
    : { rows: [] as BookingRecord[] };

  if (existingByInvitee.rows.length > 0) {
    return { booking: existingByInvitee.rows[0], created: false };
  }

  const { rows } = await sql<BookingRecord>`
    INSERT INTO bookings (
      customer_id,
      package_id,
      calendly_event_uri,
      calendly_invitee_uri,
      calendly_event_type_uri,
      scheduled_at,
      status,
      raw_payload
    )
    VALUES (
      ${input.customerId},
      ${input.packageId},
      ${input.calendlyEventUri},
      ${input.calendlyInviteeUri},
      ${input.calendlyEventTypeUri},
      ${input.scheduledAt},
      'pending',
      ${JSON.stringify(input.rawPayload)}
    )
    RETURNING id, customer_id, package_id, calendly_event_uri, calendly_invitee_uri, calendly_event_type_uri, status
  `;

  return { booking: rows[0], created: true };
}

export async function upsertBillingIntent(input: {
  bookingId: number;
  packageId: BillingPackageId;
  billingMode: BillingMode;
  amountCents: number;
  status: BillingStatus;
  checkoutSessionId?: string | null;
  paymentLinkUrl?: string | null;
  stripePaymentIntentId?: string | null;
  stripeInvoiceId?: string | null;
  lastError?: string | null;
}): Promise<void> {
  await sql`
    INSERT INTO billing_intents (
      booking_id,
      package_id,
      billing_mode,
      amount_cents,
      currency,
      status,
      stripe_checkout_session_id,
      stripe_payment_intent_id,
      stripe_invoice_id,
      payment_link_url,
      last_error
    )
    VALUES (
      ${input.bookingId},
      ${input.packageId},
      ${input.billingMode},
      ${input.amountCents},
      'usd',
      ${input.status},
      ${input.checkoutSessionId ?? null},
      ${input.stripePaymentIntentId ?? null},
      ${input.stripeInvoiceId ?? null},
      ${input.paymentLinkUrl ?? null},
      ${input.lastError ?? null}
    )
    ON CONFLICT (booking_id)
    DO UPDATE SET
      status = EXCLUDED.status,
      stripe_checkout_session_id = COALESCE(EXCLUDED.stripe_checkout_session_id, billing_intents.stripe_checkout_session_id),
      stripe_payment_intent_id = COALESCE(EXCLUDED.stripe_payment_intent_id, billing_intents.stripe_payment_intent_id),
      stripe_invoice_id = COALESCE(EXCLUDED.stripe_invoice_id, billing_intents.stripe_invoice_id),
      payment_link_url = COALESCE(EXCLUDED.payment_link_url, billing_intents.payment_link_url),
      last_error = EXCLUDED.last_error,
      updated_at = NOW()
  `;
}

export async function updateBookingStatus(bookingId: number, status: BillingStatus): Promise<void> {
  await sql`
    UPDATE bookings
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${bookingId}
  `;
}

export async function markEventProcessed(input: {
  provider: "calendly" | "stripe";
  eventId: string;
  eventType: string;
  payload: unknown;
  status?: "processed" | "ignored" | "failed";
  error?: string | null;
}): Promise<boolean> {
  try {
    await sql`
      INSERT INTO payment_events (provider, provider_event_id, event_type, payload, status, error)
      VALUES (
        ${input.provider},
        ${input.eventId},
        ${input.eventType},
        ${JSON.stringify(input.payload)},
        ${input.status || "processed"},
        ${input.error ?? null}
      )
    `;
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return false;
    }
    throw error;
  }
}

export async function findCustomerByEmail(email: string): Promise<CustomerRecord | null> {
  const { rows } = await sql<CustomerRecord>`
    SELECT id, email, name, phone, language, stripe_customer_id
    FROM customers
    WHERE email = ${email}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function findCustomerByStripeCustomerId(stripeCustomerId: string): Promise<CustomerRecord | null> {
  const { rows } = await sql<CustomerRecord>`
    SELECT id, email, name, phone, language, stripe_customer_id
    FROM customers
    WHERE stripe_customer_id = ${stripeCustomerId}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function updateBillingIntentByCheckoutSession(input: {
  checkoutSessionId: string;
  status: BillingStatus;
  stripePaymentIntentId?: string | null;
  stripeInvoiceId?: string | null;
  lastError?: string | null;
}): Promise<void> {
  await sql`
    UPDATE billing_intents
    SET
      status = ${input.status},
      stripe_payment_intent_id = COALESCE(${input.stripePaymentIntentId ?? null}, stripe_payment_intent_id),
      stripe_invoice_id = COALESCE(${input.stripeInvoiceId ?? null}, stripe_invoice_id),
      last_error = ${input.lastError ?? null},
      updated_at = NOW()
    WHERE stripe_checkout_session_id = ${input.checkoutSessionId}
  `;
}

export async function updateBillingIntentByInvoiceId(input: {
  invoiceId: string;
  status: BillingStatus;
  lastError?: string | null;
}): Promise<void> {
  await sql`
    UPDATE billing_intents
    SET
      status = ${input.status},
      last_error = ${input.lastError ?? null},
      updated_at = NOW()
    WHERE stripe_invoice_id = ${input.invoiceId}
  `;
}

export async function updateBillingIntentBySubscriptionId(input: {
  subscriptionId: string;
  status: BillingStatus;
  lastError?: string | null;
}): Promise<void> {
  await sql`
    UPDATE billing_intents bi
    SET
      status = ${input.status},
      last_error = ${input.lastError ?? null},
      updated_at = NOW()
    FROM subscriptions s
    WHERE s.stripe_subscription_id = ${input.subscriptionId}
      AND bi.booking_id = s.booking_id
  `;
}

export async function findBookingIdByCheckoutSession(checkoutSessionId: string): Promise<number | null> {
  const { rows } = await sql<{ booking_id: number }>`
    SELECT booking_id
    FROM billing_intents
    WHERE stripe_checkout_session_id = ${checkoutSessionId}
    LIMIT 1
  `;
  return rows[0]?.booking_id ?? null;
}

export async function upsertSubscription(input: {
  bookingId?: number | null;
  stripeSubscriptionId: string;
  stripeCustomerId?: string | null;
  packageId: BillingPackageId;
  status: string;
  totalIterations: number;
  paidIterations: number;
  cancelAtPeriodEnd?: boolean;
  currentPeriodEnd?: Date | null;
}): Promise<void> {
  await sql`
    INSERT INTO subscriptions (
      booking_id,
      stripe_subscription_id,
      stripe_customer_id,
      package_id,
      status,
      total_iterations,
      paid_iterations,
      cancel_at_period_end,
      current_period_end
    )
    VALUES (
      ${input.bookingId ?? null},
      ${input.stripeSubscriptionId},
      ${input.stripeCustomerId ?? null},
      ${input.packageId},
      ${input.status},
      ${input.totalIterations},
      ${input.paidIterations},
      ${input.cancelAtPeriodEnd ?? false},
      ${input.currentPeriodEnd?.toISOString() ?? null}
    )
    ON CONFLICT (stripe_subscription_id)
    DO UPDATE SET
      status = EXCLUDED.status,
      total_iterations = EXCLUDED.total_iterations,
      paid_iterations = EXCLUDED.paid_iterations,
      cancel_at_period_end = EXCLUDED.cancel_at_period_end,
      current_period_end = EXCLUDED.current_period_end,
      updated_at = NOW()
  `;
}

export async function getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<{
  stripe_subscription_id: string;
  paid_iterations: number;
  total_iterations: number;
  booking_id?: number | null;
}> {
  const { rows } = await sql<{
    stripe_subscription_id: string;
    paid_iterations: number;
    total_iterations: number;
    booking_id: number | null;
  }>`
    SELECT stripe_subscription_id, paid_iterations, total_iterations, booking_id
    FROM subscriptions
    WHERE stripe_subscription_id = ${stripeSubscriptionId}
    LIMIT 1
  `;

  return rows[0] || {
    stripe_subscription_id: stripeSubscriptionId,
    paid_iterations: 0,
    total_iterations: 0,
    booking_id: null,
  };
}

export async function trackAnalyticsEvent(eventName: string, source: string, payload: unknown): Promise<void> {
  await sql`
    INSERT INTO analytics_events (event_name, source, payload)
    VALUES (${eventName}, ${source}, ${JSON.stringify(payload)})
  `;
}
