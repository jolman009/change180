import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Brand colors - Change180 Learning Lab violet system
        // `peach` retained as an alias of the brand violet scale for back-compat
        peach: {
          50: "#f5f1fa",
          100: "#ece5f5",
          200: "#d9c8ec",
          300: "#bfa3dc",
          400: "#9d78c3",
          500: "#7d56a9",
          600: "#6b4c9a",
          700: "#553c7e",
        },
        brand: {
          50: "#f5f1fa",
          100: "#ece5f5",
          200: "#d9c8ec",
          300: "#bfa3dc",
          400: "#9d78c3",
          500: "#7d56a9",
          600: "#6b4c9a",
          700: "#553c7e",
        },
        sage: {
          50: "#f1f6f3",
          100: "#e1ece6",
          200: "#c5dccf",
          300: "#a3c4b3",
          400: "#7fa894",
          500: "#5f8a76",
        },
        teal: {
          50: "#eef4f6",
          100: "#d6e6ea",
          200: "#a9cad2",
          300: "#6fa3b0",
          400: "#44808f",
          500: "#2f6b7c",
          600: "#255663",
        },
        cream: {
          50: "#fdfcfa",
          100: "#f7f2ea",
          200: "#f1ebe0",
          300: "#e7ddcd",
        },
        warm: {
          DEFAULT: "hsl(263 18% 18%)",
          light: "hsl(263 9% 43%)",
          dark: "hsl(263 18% 18%)",
        },
        // Gold — warmth accent (sunrise arch & sun); also the "Most Popular" flag
        gold: {
          50: "#fdf8ec",
          100: "#f6eccf",
          200: "#eed79a",
          300: "#e6c264",
          400: "#dca72e",
          500: "#c2901f",
          600: "#9a7411",
          soft: "#eed79a",
          muted: "#f6eccf",
        },
        sun: "#f4c84a",
        // Pillar petals — categorical only (one pillar per context)
        learn: "#2f6b7c",
        grow: "#ea8e7b",
        thrive: "#dca72e",
        together: "#6e8fce",
        coral: { DEFAULT: "#ea8e7b", soft: "#fbe6df", deep: "#c46a57" },
        sky: { DEFAULT: "#6e8fce", soft: "#e4eaf6", deep: "#4f6fab" },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        script: ['Mea Culpa', 'cursive'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 4px 0 hsl(264 34% 45% / 0.15)" },
          "50%": { boxShadow: "0 0 12px 3px hsl(264 34% 45% / 0.35)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
