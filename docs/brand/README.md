# Change180 — Brand Bundle (reference)

This folder is the **canonical source of truth** for the Change180
visual identity. The files here are *reference*, not build inputs — the values
are already integrated into the live app. Don't import these directly.

The brand is **Change180** (Myra Z. Guzman, M.Ed. — faith-centered,
bilingual coaching & learning). Tagline: **"Learn. Grow. Thrive. Together."**
Voice: warm, hopeful, optimistic. Never emoji.

## Files

| File | Purpose |
|------|---------|
| `tokens.reference.css` | Raw design tokens as CSS custom properties (hex). The framework-agnostic source of truth. |
| `change180.css` | The Tailwind **v4** drop-in (`@theme` + hex). For reference / a future v4 migration. |
| `tailwind.config.cjs` | The Tailwind **v3** config (hex). Reference for the value set. |
| `COMPONENTS.md` | Brand-styled `Button` / `Badge` / `IconWell` + `cn` sources. |

## How the bundle maps into this repo

This app runs **Tailwind v3.4.17 + shadcn/ui**, where colors are wired as
`hsl(var(--token))` and the whole UI library depends on the shadcn semantic
tokens. So the bundle's hex values were **re-expressed as HSL** rather than
imported:

- **`src/index.css`** — shadcn semantic tokens (`--primary`, `--background`,
  `--accent`, `--ring`, gradients, shadows, the `.dark` theme) re-pointed to the
  violet system. Adds `--primary-deep`, `--gold-accent`, `--teal-ink`, and the
  `.c180-wordmark` / `.c180-lockup` / `.c180-eyebrow` helper classes.
- **`tailwind.config.ts`** — `brand`/`peach` (violet), `gold`, `teal`, `sage`,
  `cream` scales, the categorical pillars (`learn`/`grow`/`thrive`/`together`,
  `coral`, `sky`, `sun`), and `heading`/`body`/`display`/`script` font families.
  `peach` is kept as an alias of the violet scale for back-compat with existing
  `peach-*` class usages.

> ⚠️ Do **not** drop `tailwind.config.cjs` into the build — its flat hex
> `primary`/`secondary`/`accent`/`ring`/`destructive` would collide with the
> shadcn semantic tokens those 45+ UI components rely on.

### Key values

- **Primary** violet `#6b4c9a` → `hsl(264 34% 45%)` (hover/deep `#553c7e`)
- **Gold** accent `#dca72e` · **Teal** ink/headings `#2f6b7c`
- **Canvas** `#faf8fc` · **Ink** `#2b2535`
- **Pillars** (one per context): Learn `#2f6b7c` · Grow `#ea8e7b` · Thrive `#dca72e` · Together `#6e8fce`

## Logo art

Place the logo image files in `public/images/`:

- `change180-logo.webp` (+ `.png` for og/JSON-LD) — full color logo: petals + arch
  + open book, "Change180" wordmark, "LIFE COACHING | LEARNING LAB | CONSULTING"
  descriptor, and the tagline. Opaque white background. Used by
  `src/components/Logo.tsx` and referenced in JSON-LD. **Light surfaces only.**
  Source art: Downloads bundle `Untitled design (3).png` / `change180_emblem.png`.
- On **dark** backgrounds (e.g. the footer), use the text wordmark in light
  colors — see `src/components/Footer.tsx` — not the opaque image.

## Brand essentials

- **Name & wordmark.** Always **Change180** (capital C, no space,
  "180" set apart). The "Change180" wordmark is the violet serif; "LEARNING LAB"
  sits beneath in wide-tracked teal. Lowercase only in emails/URLs
  (`change180life@gmail.com`, `change180.org`).
- **In running copy**, the "Change180" wordmark is used inline (rendered via
  `renderTextWithBrand()`, with "180" in `text-primary` violet). The full
  "Learning Lab" lockup appears in the logo, footer, and metadata/name fields.
- **Tagline.** "Learn. Grow. Thrive. Together." — when color-coded, map each word
  to its pillar (Learn→teal, Grow→coral, Thrive→gold, Together→sky).
- **Pillar rule.** One pillar per context (a service category, an icon well, a
  section) — never the whole spectrum at once. Keep working UI on `primary` +
  `gold`. Gold is also the "Most Popular" accent.
