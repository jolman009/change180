# Change 180 Life Coaching - Project Documentation

## Overview

**Change 180** is a professional single-page application (SPA) website for Change 180 Life Coaching, founded by Myra Z. Guzman, M.Ed. The platform offers faith-centered life coaching services for individuals, families, and organizations, with bilingual support (English & Spanish).

The brand name "Change 180" symbolizes a complete 180-degree turn—choosing a new direction with intentional growth aligned with faith and personal values.

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 18.3.1 |
| **Language** | TypeScript | 5.8.3 |
| **Build Tool** | Vite | 5.4.19 |
| **Styling** | Tailwind CSS | 3.4.17 |
| **UI Components** | shadcn/ui + Radix UI | Latest |
| **Routing** | React Router DOM | 6.30.1 |
| **Animation** | Framer Motion | 12.27.5 |
| **Forms** | React Hook Form | 7.61.1 |
| **Email Service** | EmailJS | 4.4.1 |
| **Error Handling** | react-error-boundary | 6.1.0 |
| **Data Fetching** | TanStack React Query | 5.83.0 |
| **Validation** | Zod | 3.25.76 |
| **Notifications** | Sonner | 1.7.4 |
| **Icons** | Lucide React | 0.462.0 |
| **Testing** | Vitest + React Testing Library | 3.2.4 |
| **Deployment** | Vercel | - |
| **CI/CD** | GitHub Actions | - |
| **Analytics** | Google Analytics 4 | G-7FZ4YD0V4Q |
| **Domain** | IONOS | change180.org |

---

## Project Structure

```
change180/
├── .github/
│   └── workflows/
│       └── ci.yml                  # CI/CD pipeline (lint + build)
├── src/
│   ├── i18n/
│   │   ├── en.json                 # English translations
│   │   ├── es.json                 # Spanish translations
│   │   └── index.ts                # Translation helper functions
│   ├── contexts/
│   │   └── LanguageContext.tsx     # Language provider & useLanguage hook
│   ├── components/
│   │   ├── ui/                     # shadcn/ui reusable components (45+ files)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── card.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   └── ... (40+ more)
│   │   ├── Logo.tsx                # Custom bridge icon + branding
│   │   ├── Navigation.tsx          # Fixed header with Calendly booking & language toggle
│   │   ├── Hero.tsx                # Hero section with Calendly CTA
│   │   ├── About.tsx               # Founder bio with credentials
│   │   ├── WhoWeHelp.tsx           # Target audience sections
│   │   ├── Services.tsx            # Service offerings
│   │   ├── Packages.tsx            # Pricing packages
│   │   ├── Testimonials.tsx        # Client testimonials
│   │   ├── Contact.tsx             # Contact form with EmailJS
│   │   ├── ErrorPage.tsx           # Global error boundary UI
│   │   ├── Footer.tsx              # Footer with legal disclaimer
│   │   └── NavLink.tsx             # Navigation link helper
│   ├── pages/
│   │   ├── Index.tsx               # Main landing page composition
│   │   └── NotFound.tsx            # 404 page
│   ├── hooks/
│   │   ├── use-mobile.tsx          # Mobile responsiveness hook
│   │   └── use-toast.ts            # Toast notification hook
│   ├── lib/
│   │   └── utils.ts                # Utility functions (cn helper)
│   ├── test/
│   │   ├── example.test.ts         # Test example
│   │   └── setup.ts                # Vitest configuration
│   ├── App.tsx                     # Main app with routing
│   ├── App.css                     # Component-specific styles
│   ├── index.css                   # Global styles & CSS variables
│   └── main.tsx                    # React entry point with ErrorBoundary
├── public/
│   ├── images/
│   │   ├── portrait-headshot.jpeg  # Founder photo
│   │   ├── coaching-session-*.jpeg # Coaching scene photos
│   │   └── logo.png                # Logo asset
│   ├── sitemap.xml                 # SEO sitemap
│   ├── favicon.ico
│   └── robots.txt
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── vitest.config.ts                # Testing configuration
├── eslint.config.js                # Linting configuration
├── vercel.json                     # Vercel deployment config (SPA rewrites)
├── components.json                 # shadcn/ui configuration
└── index.html                      # HTML entry point
```

---

## Main Features

### 1. Navigation
- Fixed header with semi-transparent backdrop blur
- Custom logo component with gradient bridge icon
- Responsive hamburger menu on mobile
- Smooth scroll navigation to sections
- **Language toggle (EN | ES)** for bilingual support
- **"Book a Session" button** links directly to Calendly (`https://calendly.com/change180lifecoach`)

### 2. Hero Section
- Headline: "Change Your Direction. Transform Your Life."
- Animated floating decorative elements
- **"Start Your Journey" button** opens Calendly for booking
- "Explore Services" button scrolls to services section

### 3. About Section
- Founder biography (Myra Z. Guzman, M.Ed.)
- Credentials grid: M.Ed., LPC-Intern, 17+ Years Experience, Bilingual
- Professional photo with decorative background

### 4. Who We Help
- Target audience cards
- Coaching philosophy and core beliefs

### 5. Services
- Individual Life Coaching
- Parent & Family Coaching
- Group Programs & Workshops
- Digital Resources (coming soon)

### 6. Packages
| Package | Price | Duration |
|---------|-------|----------|
| Discovery Session | $55 | 60 minutes |
| Clarity Package | $360 | 4 weeks |
| Rooted & Renewed | $720 | 8 weeks (Popular) |
| Flourish Forward | $1,080 | 12 weeks |
| Family & Parent Coaching | $110/session | Add-on |

### 7. Testimonials
- Client testimonials with quotes
- "What Clients Can Expect" badges

### 8. Contact
- **Functional contact form** powered by EmailJS
- Form fields: Name, Email, Phone (optional), Message
- Sends emails directly to the business
- Toast notifications for success/error feedback
- Contact information display
- Virtual & In-Person availability
- Organization services (Churches, Schools, Nonprofits)

### 9. Footer
- Brand information
- Quick links and services navigation
- Legal disclaimer about coaching (non-clinical)

### 10. Global Error Handling
- React Error Boundary wraps the entire application
- User-friendly error page with "Try Again" button
- Development mode shows error details for debugging

### 11. Bilingual Support (English/Spanish)
- Language toggle in navigation (desktop and mobile)
- All UI text translated to Spanish
- Language preference persisted in localStorage
- Auto-detects browser language on first visit
- Brand name "change180" remains consistent across languages

---

## Integrations

### Google Analytics 4
- **Measurement ID**: `G-7FZ4YD0V4Q`
- **Tracking**:
  - Page views and navigation
  - Scroll depth
  - Outbound link clicks
  - Session duration and engagement
  - User demographics and devices

### Calendly (Online Booking)
- **URL**: `https://calendly.com/change180lifecoach`
- **Integration Points**:
  - Navigation "Book a Session" button
  - Hero "Start Your Journey" button
- Opens in new tab for seamless booking experience

### EmailJS (Contact Form)
- **Service**: Configured with EmailJS credentials
- **Template**: Maps form fields to email template
- **Features**:
  - Async email sending with loading state
  - Success/error toast notifications
  - Form reset on successful submission
  - Graceful fallback for demo mode

---

## CI/CD Pipeline

### GitHub Actions Workflow (`.github/workflows/ci.yml`)

Triggers on:
- Push to `main` branch
- Pull requests to `main` branch

Jobs:
1. **Checkout** code
2. **Setup Node.js 20** with npm caching
3. **Install dependencies** (`npm ci`)
4. **Lint** code (`npm run lint`)
5. **Build** production bundle (`npm run build`)

---

## Deployment

### Vercel Configuration (`vercel.json`)
- SPA routing with rewrites
- All routes redirect to `/index.html` for client-side routing
- Automatic deployments from GitHub

### SEO Assets
- `sitemap.xml` - Lists main URL for search engines
- `robots.txt` - Search engine crawling rules

---

## Design System

### Color Palette
| Element | Color | Description |
|---------|-------|-------------|
| Primary | Soft Peach | Main action color, warm, nurturing |
| Secondary | Warm Taupe | Secondary actions |
| Accent | Soft Sage | Calming complement |
| Background | Warm Stone | Main background, welcoming |
| Foreground | Warm Charcoal | Text color |

### Typography
- **Headings**: Cormorant Garamond (serif)
- **Body**: Inter (sans-serif)
- **Display**: Playfair Display (serif)
- **Accent**: Mea Culpa (cursive)

---

## Available Scripts

```bash
npm run dev        # Start development server (port 8080)
npm run build      # Production build
npm run build:dev  # Development build
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run test       # Run tests
npm run test:watch # Run tests in watch mode
```

---

## Recommended Additional Features

### High Priority

#### 1. Payment Integration
**Description**: Enable direct package purchases and session payments online.
- Accept credit/debit cards
- Support recurring payments for coaching packages
- Generate receipts and invoices
- Handle refunds and cancellations

**Technologies**: Stripe, PayPal, or Square integration

#### 2. Blog/Resources Section
**Description**: Add a content section for articles, tips, and coaching resources.
- Faith-centered life coaching articles
- Parenting tips and family resources
- Personal growth and transformation stories
- SEO benefits for organic traffic

**Technologies**: Markdown-based blog, headless CMS (Contentful, Sanity, Strapi)

#### 3. Email Newsletter Integration
**Description**: Capture leads and nurture potential clients with email marketing.
- Newsletter signup form
- Lead magnets (free guides, worksheets)
- Automated welcome sequences
- Updates about new programs and workshops

**Technologies**: Mailchimp, ConvertKit, or Resend

#### 4. Embedded Calendly Widget
**Description**: Enhance the current Calendly integration with embedded scheduling.
- Embed Calendly directly on the website instead of opening new tab
- Show availability inline on the Packages page
- Pre-fill client information from contact form

**Technologies**: Calendly embed widget, react-calendly

### Medium Priority

#### 5. Client Portal / Dashboard
**Description**: A secure area for existing clients to access their coaching journey.
- Session notes and action items
- Progress tracking
- Resource library access
- Messaging with coach
- Invoice and payment history

**Technologies**: Custom React dashboard with authentication (Auth0, Clerk, Supabase Auth)

#### 6. Spanish Language Toggle - COMPLETED
**Description**: Full bilingual support with language switching.
- [x] Complete site translation to Spanish
- [x] Language toggle in navigation
- [x] Persistent language preference (localStorage)
- [x] Browser language auto-detection
- [ ] URL-based routing (/es, /en) - future enhancement
- [ ] SEO hreflang tags - future enhancement

**Technologies**: Custom React Context + JSON translations

#### 7. Testimonial Video Integration
**Description**: Add video testimonials for more impactful social proof.
- Embedded video player
- Video gallery or carousel
- YouTube/Vimeo integration
- Lazy loading for performance

**Technologies**: react-player, embedded YouTube/Vimeo

#### 8. FAQ Section
**Description**: Address common questions to reduce friction and support requests.
- Accordion-style FAQ component
- Categories (Pricing, Sessions, What to Expect)
- Search functionality
- Schema markup for SEO

**Technologies**: Already have accordion components available

#### 9. Digital Products Store
**Description**: Expand the "Digital Resources (coming soon)" section.
- E-books and guides
- Worksheets and workbooks
- Audio meditations or devotionals
- Self-paced mini-courses

**Technologies**: Gumroad integration, Teachable, or custom with Stripe

### Lower Priority (Nice to Have)

#### 10. Live Chat / Chatbot
**Description**: Provide instant support and answer common questions.
- Live chat during business hours
- AI chatbot for off-hours
- Lead capture from chat conversations

**Technologies**: Intercom, Crisp, Tidio, or custom with OpenAI

#### 11. Social Proof Feed
**Description**: Display live social media feed and reviews.
- Instagram feed integration
- Google Reviews display
- Facebook reviews aggregation

**Technologies**: Instagram Basic Display API, embedded widgets

#### 12. Analytics Dashboard - PARTIALLY COMPLETED
**Description**: Track website performance and user behavior.
- [x] Page views and session tracking (GA4)
- [x] User demographics and devices (GA4)
- [ ] Conversion tracking (form submissions, bookings)
- [ ] User journey analysis
- [ ] A/B testing capability

**Technologies**: Google Analytics 4 (implemented)

#### 13. Accessibility Enhancements
**Description**: Improve accessibility beyond current Radix UI implementation.
- Skip to content link
- High contrast mode
- Font size adjustments
- Screen reader optimizations
- WCAG 2.1 AA compliance audit

#### 14. SEO Enhancements
**Description**: Further optimize for search engines.
- Structured data (JSON-LD) for local business
- Service schema markup
- Dynamic sitemap generation
- Meta tag management per route
- Image optimization with next-gen formats

**Technologies**: Consider migrating to Next.js for SSR/SSG benefits

#### 15. Group Session Registration
**Description**: Enable registration for workshops and group programs.
- Event listing page
- Registration with capacity limits
- Waitlist functionality
- Calendar download (.ics)

**Technologies**: Custom event system or Eventbrite integration

---

## Implementation Recommendations

### Phase 1 (Foundation) - COMPLETED
- [x] Contact form email delivery (EmailJS)
- [x] Online booking integration (Calendly)
- [x] CI/CD pipeline (GitHub Actions)
- [x] Vercel deployment configuration
- [x] Global error handling
- [x] SEO sitemap
- [x] Custom domain setup (change180.org via IONOS)
- [x] Bilingual support (English/Spanish) - moved up from Phase 3

### Phase 2 (Revenue) - IN PROGRESS
- [x] Add basic analytics (GA4)
- [ ] Integrate Stripe for payments
- [ ] Embed Calendly widget on-site
- [ ] Implement email capture with newsletter

### Phase 3 (Growth)
- [x] Implement Spanish language support (completed in Phase 1)
- [ ] Add blog/resources section
- [ ] Create FAQ section
- [ ] Add video testimonials

### Phase 4 (Scale)
- [ ] Client portal with authentication
- [ ] Digital products store
- [ ] Advanced analytics and A/B testing

---

## Environment Variables

For production deployment, ensure these EmailJS credentials are configured:

```env
# EmailJS Configuration (currently hardcoded in Contact.tsx)
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxx
```

**Note**: Consider moving hardcoded EmailJS credentials to environment variables for better security.

---

## Notes

- The contact form is fully functional using EmailJS integration.
- Online booking is available via Calendly external links.
- The site is deployed on Vercel with automatic CI/CD from GitHub.
- Global error boundary catches and displays runtime errors gracefully.
- Radix UI provides a solid accessibility foundation.
- The design system is cohesive and well-documented in CSS variables.

---

*Last updated: January 25, 2025*
