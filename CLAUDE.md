# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server on localhost:8080
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Vitest (run once)
npm run test:watch   # Vitest (watch mode)
```

Tests use jsdom environment. Test files go in `src/**/*.{test,spec}.{ts,tsx}` or `api/**/*.{test,spec}.ts`. Setup file: `src/test/setup.ts`.

CI runs `npm run lint` + `npm run build` on push/PR to main (GitHub Actions).

## Architecture

**Stack**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui, deployed on Vercel.

**Path alias**: `@/*` → `./src/*`

### Frontend (SPA)

Single-page app with React Router. The homepage (`/`) renders all sections as a scrollable page. Other routes are code-split via `React.lazy()`:

- `/` — Index (Hero, About, WhoWeHelp, Services, Packages, Testimonials, FAQ, Newsletter, Contact)
- `/blog`, `/blog/:slug` — Blog listing + Markdown posts from `src/content/blog/`
- `/resources` — Downloadable resources
- `/quiz` — Coaching quiz with recommendations

### Bilingual System (EN/ES)

Custom i18n via `LanguageContext`. No third-party i18n library.

- Translation files: `src/i18n/en.json`, `src/i18n/es.json` (quiz: `quiz-en.json`, `quiz-es.json`)
- `t(key)` returns a string, `tArray(key)` returns `string[]`
- If a key is missing, `t()` returns the raw key string as fallback
- Brand text uses `<brand>Change180</brand>` tags in JSON, rendered via `renderTextWithBrand()` in components
- `renderTextWithBrand()` is hardcoded in each component that uses it (Hero, WhoWeHelp, Services, Newsletter, Footer) — it does NOT read the brand name from the i18n value

### Brand Guidelines

- **Brand name**: "Change180" (uppercase C, no space). Never "change180" in UI text.
- Exception: emails (`change180life@gmail.com`), URLs (`change180.org`), file paths stay lowercase
- "Change" renders in warm charcoal (foreground), "180" renders in primary peach

### Serverless API (`api/`)

Vercel serverless functions for Stripe billing integration:

- `api/webhooks/calendly.ts` — Calendly webhook → creates Stripe checkout
- `api/webhooks/stripe.ts` — Stripe webhook → updates DB, sends receipt emails
- `api/billing/portal-link.ts` — Sends Stripe billing portal link via email
- `api/_lib/` — Shared utilities (Stripe, Calendly, DB, email, env validation)

Uses `@vercel/postgres` for persistence and Resend for transactional email.

### Design System

- Primary: `hsl(20 42% 43%)` — peach (darkened for WCAG AA)
- Accent: `hsl(155 18% 88%)` — sage
- Background: `hsl(35 18% 97%)` — warm stone
- Fonts: Cormorant Garamond (headings), Inter (body)
- Nav breakpoint: `xl` (1280px) — hamburger menu below that
- CSS variables defined in `src/index.css`, extended in `tailwind.config.ts`

### External Services

- **Booking**: react-calendly (popup modal)
- **Contact form**: EmailJS (`@emailjs/browser`)
- **Newsletter**: EmailJS (separate template, `VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID`)
- **Analytics**: GA4 (`G-7FZ4YD0V4Q`)
- **Payments**: Stripe (server-side via `api/`)
- **Email**: Resend (billing receipts, server-side)

### Environment Variables

Client-side (prefixed `VITE_`): EmailJS service/template/public key.
Server-side: Stripe, Calendly, Resend, Postgres. See `.env.example` for full list.

## Domain

The site domain is `change180.org`. All canonical URLs, JSON-LD, and OG tags reference this domain.
