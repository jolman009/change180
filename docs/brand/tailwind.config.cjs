/* ============================================================================
   Change180 Learning Lab — Tailwind v3 config (REFERENCE)
   ----------------------------------------------------------------------------
   Reference only. This site already integrates these values into the real
   `tailwind.config.ts` (re-expressed to fit the existing shadcn/ui HSL token
   architecture). Do NOT import this file — it would collide with the shadcn
   semantic tokens (`primary`, `secondary`, `accent`, `ring`, `destructive`).
   Kept here as the canonical hex source for the Tailwind v3 path.
   ========================================================================== */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f1fa", 100: "#ece5f5", 200: "#d9c8ec", 300: "#bfa3dc",
          400: "#9d78c3", 500: "#7d56a9", 600: "#6b4c9a", 700: "#553c7e",
        },
        primary: { DEFAULT: "#6b4c9a", deep: "#553c7e", fg: "#fbf9ff" },
        gold: {
          50: "#fdf8ec", 100: "#f6eccf", 200: "#eed79a", 300: "#e6c264",
          400: "#dca72e", 500: "#c2901f", 600: "#9a7411",
        },
        teal: {
          50: "#eef4f6", 100: "#d6e6ea", 200: "#a9cad2", 300: "#6fa3b0",
          400: "#44808f", 500: "#2f6b7c", 600: "#255663",
        },
        sage: {
          50: "#f1f6f3", 100: "#e1ece6", 200: "#c5dccf", 300: "#a3c4b3",
          400: "#7fa894", 500: "#5f8a76",
        },
        /* Pillars — categorical only (one per context) */
        learn: "#2f6b7c", grow: "#ea8e7b", thrive: "#dca72e", together: "#6e8fce",
        coral: { DEFAULT: "#ea8e7b", soft: "#fbe6df", deep: "#c46a57" },
        sky: { DEFAULT: "#6e8fce", soft: "#e4eaf6", deep: "#4f6fab" },
        sun: "#f4c84a",
        /* Semantic */
        canvas: "#faf8fc", surface: "#ffffff", cloud: "#f1f5fc", cream: "#f7f2ea",
        ink: "#2b2535", muted: "#6b6478", heading: "#2f6b7c",
        accent: "#e1ece6", secondary: "#efeaf3", line: "#e7e1ef",
        ring: "#6b4c9a", destructive: "#c84f43",
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Playfair Display"', "Georgia", "serif"],
        script: ['"Mea Culpa"', "cursive"],
      },
      borderRadius: { lg: "0.75rem", xl: "1rem", "2xl": "1.5rem", "3xl": "1.75rem" },
      boxShadow: {
        soft: "0 4px 20px -4px hsl(262 18% 18% / 0.07)",
        card: "0 8px 32px -8px hsl(262 18% 18% / 0.10)",
        elevated: "0 16px 48px -12px hsl(262 22% 18% / 0.16)",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(150deg, #faf6fc 0%, #f1f6fb 55%, #f6f0f9 100%)",
        "gradient-cta": "linear-gradient(135deg, #6b4c9a 0%, #553c7e 100%)",
      },
      transitionTimingFunction: { brand: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};
