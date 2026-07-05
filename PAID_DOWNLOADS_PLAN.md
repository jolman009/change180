# Paid Downloads — Implementation

One-time purchase per file. Buyer pays via Stripe Checkout → the existing Stripe webhook
records an entitlement in Postgres and emails a secure link → the buyer's clicks stream the
file out of **private Vercel Blob** through a gated serverless function. Files are never on a
public URL. Reuses the existing Postgres + Stripe + Resend infra. **No Supabase.**

## Locked decisions
- **First product:** Change180 Daily Growth Journal (PDF, 4.4 MB) — **$29**.
- **Redemption:** capped re-downloads (default **5**) + link expiry (default **30 days**).
- **Email capture:** Stripe Checkout collects it; webhook reads `session.customer_details.email`.
- **Refunds:** no auto-revoke in v1.

## Delivery mechanism (verified against Vercel docs)
Vercel Blob supports `access: 'private'`. Private files are delivered by
**streaming through your own function** after an auth check — `get(pathname, {access:'private'})`
returns `result.stream`, which we pipe back with `Content-Disposition: attachment`. There is no
public/redirect URL, so entitlement is enforced 100% server-side on every download.

---

## What was built (code complete)

**New files**
- `api/_lib/products.ts` — paid-file catalog (`fileId`, price, private blob pathname). Add future files here.
- `api/checkout/create-download.ts` — `POST {fileId}` → Stripe Checkout Session (`mode: payment`, `metadata.file_id`) → `{url}`.
- `api/download/[fileId].ts` — `GET ?token=…` → verify token+file, check expiry & redemption cap → stream private blob.
- `src/pages/DownloadThankYou.tsx` — post-purchase confirmation page (`/downloads/thank-you`).

**Edited files**
- `api/_lib/db.ts` — `paid_downloads` table in `ensureSchema()` + `recordPaidDownload` / `getPaidDownloadByToken` / `incrementDownloadCount`.
- `api/_lib/email.ts` — `sendDownloadLinkEmail`.
- `api/_lib/env.ts` — `DOWNLOAD_MAX_REDEMPTIONS`, `DOWNLOAD_LINK_TTL_DAYS`.
- `api/webhooks/stripe.ts` — `handlePaidDownloadPurchase()` called in `checkout.session.completed`; idempotent on session id.
- `src/pages/Resources.tsx` — "Premium Downloads" section with a Buy $29 button (bilingual).
- `src/App.tsx` — `/downloads/thank-you` route.
- `.env.example` — Blob token + tuning vars.
- `package.json` — added `@vercel/blob`.

**Data model**
```sql
paid_downloads(
  id, file_id, customer_email,
  stripe_checkout_session_id UNIQUE, stripe_payment_intent_id,
  download_token UNIQUE, download_count, amount_cents, created_at
)
```
`download_token` (32 random bytes, hex) is the bearer credential emailed to the buyer:
`/api/download/<fileId>?token=<token>`.

**Security spine:** files private in Blob · every download re-checks entitlement server-side ·
unguessable token bound to one paid session · redemption cap + TTL limit sharing.

---

## Go-live checklist (manual — needs your Vercel/Stripe access)

1. **Enable Vercel Blob** on the `change180` project (Storage tab → create Blob store).
   This injects `BLOB_READ_WRITE_TOKEN` into the project env.
2. **Upload the source PDF to the PRIVATE store** at the pathname in `products.ts`
   (`downloads/change180-daily-growth-journal.pdf`). Easiest:
   ```bash
   vercel blob put "C:\Users\Jolma\OneDrive\Desktop\Change180\Change180DailyGrowthJournal.pdf" \
     --access private --pathname downloads/change180-daily-growth-journal.pdf
   ```
   (or via the Vercel dashboard Blob UI). Verify the pathname matches `products.ts` exactly.
3. **Stripe webhook** — confirm the endpoint subscribes to `checkout.session.completed`
   (it already handles it for bookings, so this is likely already on). No new Stripe products
   needed — price is inline from `products.ts`.
4. **Set `SITE_BASE_URL`** in Vercel to `https://change180.org` (used for success + link URLs).
5. **Redeploy** (env changes require a fresh deploy).
6. **Test end-to-end** on a preview/prod deploy with a Stripe **test** card
   (`4242 4242 4242 4242`): buy → receive email → click link → PDF downloads → 5th+ click blocked.
   ⚠️ `npm run dev` (Vite) 404s `/api/*` — use `vercel dev` or a deploy.

## Adding more paid files later
Add an entry to `DOWNLOAD_PRODUCTS` in `api/_lib/products.ts`, upload its file to the private
Blob store at that pathname, and add a card to `paidResources` in `src/pages/Resources.tsx`.

## Deferred / optional
- Refund auto-revoke (`charge.refunded` webhook branch).
- Unit tests for the webhook `file_id` branch + token checks (mirror `api/test/stripe-webhook.test.ts`).
- Analytics event on download-purchase completion.
