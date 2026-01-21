# Change 180 - Life Coaching Website

A modern, professional website for Change 180 Life Coaching, founded by Myra Z. Guzman, M.Ed. The site focuses on faith-centered life coaching for families, mental health, and overall wellness.

## About Change 180

Change 180 provides bilingual (English & Spanish) life coaching services including:
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

The site uses an approachable, professional color scheme:
- **Primary**: Soft Peach (`hsl(20 38% 58%)`) - warm, nurturing, approachable
- **Accent**: Soft Sage (`hsl(155 18% 88%)`) - calming complement
- **Background**: Warm Stone (`hsl(35 18% 97%)`) - welcoming and clean
- **Text**: Warm Charcoal (`hsl(215 15% 22%)`) - soft and readable

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

The site uses CSS custom properties for theming, defined in `src/index.css`. The Tailwind configuration extends these with custom color families (`peach`, `sage`, `cream`, `warm`).

### Key Files
- `tailwind.config.ts` - Tailwind configuration with custom colors and animations
- `src/index.css` - CSS variables, gradients, and shadows
- `src/components/Logo.tsx` - Brand logo component

## License

Private - All rights reserved.
