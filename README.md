# Change180 — Website

A modern, professional website for Change180, founded by Myra Z. Guzman, M.Ed. The site focuses on faith-centered, bilingual coaching & learning for families, mental health, and overall wellness. Tagline: **"Learn. Grow. Thrive. Together."**

## About Change180

Change180 provides bilingual (English & Spanish) life coaching services including:
- Individual Life Coaching
- Parent & Family Coaching
- Group Programs & Workshops
- Digital Resources

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Fonts**: Cormorant Garamond (headings), Inter (body)

## Color Palette

The site uses the Change180 violet brand system:
- **Primary**: Brand Violet (`#6b4c9a`) — the load-bearing brand & action color
- **Accent / Gold**: Warm Gold (`#dca72e`) — sunrise warmth; also the "Most Popular" flag
- **Ink / Headings**: Deep Teal (`#2f6b7c`)
- **Background**: Soft Violet Canvas (`#faf8fc`) — welcoming and clean
- **Pillars** (categorical, one per context): Learn `#2f6b7c` · Grow `#ea8e7b` · Thrive `#dca72e` · Together `#6e8fce`

> Full token reference, component sources, and the original handoff bundle live in [`docs/brand/`](docs/brand/).

## Project Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui components
│   ├── About.tsx    # About section with credentials
│   ├── Contact.tsx  # Contact form and info
│   ├── Footer.tsx   # Site footer
│   ├── Hero.tsx     # Hero/intro section
│   ├── Logo.tsx     # Brand logo component
│   ├── Navigation.tsx
│   ├── Packages.tsx # Pricing packages
│   ├── Services.tsx # Services offered
│   ├── Testimonials.tsx
│   └── WhoWeHelp.tsx
├── App.tsx
├── index.css        # Global styles & CSS variables
└── main.tsx
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

The site uses CSS custom properties for theming, defined in `src/index.css` (shadcn HSL semantic tokens). The Tailwind configuration extends these with the brand color families (`brand`/`peach` violet, `gold`, `teal`, `sage`) and the categorical pillars (`learn`/`grow`/`thrive`/`together`). See [`docs/brand/`](docs/brand/) for the full token reference.

### Key Files
- `tailwind.config.ts` - Tailwind configuration with custom colors and animations
- `src/index.css` - CSS variables, gradients, and shadows
- `src/components/Logo.tsx` - Brand logo component

## Billing Integration

Stripe receivables integration is implemented with Vercel serverless routes:
- `POST /api/webhooks/calendly`
- `POST /api/webhooks/stripe`
- `POST /api/billing/portal-link`

Operational procedures are documented in:
- `docs/STRIPE_RECEIVABLES_RUNBOOK.md`

Copy `.env.example` values into `.env` or Vercel project environment variables before enabling webhook traffic.

## License

Private - All rights reserved.
