# Stripe Receivables Runbook

## Overview
- Booking starts in Calendly.
- Calendly webhook (`/api/webhooks/calendly`) creates or updates customer + booking records.
- The webhook creates a Stripe Checkout Session and emails the payment link via Resend.
- Stripe webhook (`/api/webhooks/stripe`) keeps billing/subscription status in sync.
- Clients request a self-service billing link from `/api/billing/portal-link`.

## Package Billing Rules
- `discovery`: one-time `$75`.
- `family`: one-time `$110`.
- `clarity`: weekly subscription `$75` for `4` installments.
- `rooted`: weekly subscription `$75` for `8` installments.
- `flourish`: weekly subscription `$100` for `12` installments.

## Required Setup Checklist
1. Configure Stripe products and (optionally) recurring/one-time prices.
2. Enable Stripe customer portal in Stripe Dashboard.
3. Create Stripe webhook endpoint for:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Configure Calendly webhook for invitee events to `/api/webhooks/calendly`.
5. Configure Resend sender domain and `BILLING_FROM_EMAIL`.
6. Provision Postgres and run `db/migrations/001_stripe_receivables.sql`.

## Common Operations
### Refund a one-time payment
1. Open Stripe Dashboard -> Payments.
2. Locate payment by customer email.
3. Issue full or partial refund.
4. Confirm `payment_failed`/status updates if follow-up invoices were affected.

### Pause or cancel an active program subscription
1. Open Stripe Dashboard -> Subscriptions.
2. Locate subscription using customer email.
3. Set `cancel_at_period_end` (recommended) or cancel immediately.
4. Confirm latest webhook event updates `subscriptions` and `billing_intents`.

### Resend billing portal access
1. Use the site billing portal form in Contact section, or call `POST /api/billing/portal-link`.
2. Body:
```json
{
  "email": "client@example.com",
  "language": "en"
}
```

## Manual Overrides
### Mark a booking manually after Stripe dashboard action
Run SQL update when dashboard actions happen outside webhook flow:
```sql
UPDATE billing_intents
SET status = 'payment_succeeded', updated_at = NOW()
WHERE stripe_checkout_session_id = '<checkout_session_id>';
```

### Force subscription iteration count correction
```sql
UPDATE subscriptions
SET paid_iterations = <new_count>, updated_at = NOW()
WHERE stripe_subscription_id = '<subscription_id>';
```

## Failure Handling
### Invalid webhook signature
- Confirm correct `STRIPE_WEBHOOK_SECRET` / `CALENDLY_WEBHOOK_SIGNING_KEY`.
- Verify proxy/CDN is not rewriting request body.

### Duplicate webhook deliveries
- Expected behavior: handled via unique `payment_events.provider_event_id`.
- If duplicate processing occurs, inspect DB unique constraints and event IDs.

### Payment link email not delivered
- Check Resend sender domain verification.
- Review Resend logs for suppression/bounce.
- Retry by re-triggering from billing portal request or manual resend script.

## Observability
- `payment_events` stores provider event IDs for idempotency + audit.
- `analytics_events` stores:
  - `booking_completed`
  - `payment_link_sent`
  - `checkout_completed`
  - `subscription_started`
  - `payment_failed`
