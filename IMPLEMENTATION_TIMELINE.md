# Change 180 - Phased Implementation Timeline

> Based on the Website Improvement Plan, cross-referenced with a full codebase audit.
> Items already completed are marked with ✅. Remaining work is marked with ⬜.

---

## Phase 1: Critical Fixes (Week 1-2) ✅ COMPLETE

Quick wins that fix broken functionality and core SEO issues.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Add missing `quiz.cta.*` and `quiz.progress.*` translation keys | ✅ DONE | EN & ES |
| 1.2 | Add `<link rel="canonical">` tag to index.html | ✅ DONE | Points to change180.org |
| 1.3 | Delete leftover PNG source files (4 files, ~5.3 MB) | ✅ DONE | Repo cleaned |
| 1.4 | Verify all headings render correctly (no raw i18n keys) | ✅ DONE | All keys present |
| 1.5 | Compress images to WebP | ✅ DONE | Already using WebP |
| 1.6 | Add alt text to all images | ✅ DONE | Localized EN/ES |
| 1.7 | Optimize render-blocking scripts | ✅ DONE | Fonts async, scripts deferred |

---

## Phase 2: SEO & Accessibility (Week 2-4) — 4 of 5 DONE

Structural improvements for search visibility and inclusivity.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Add JSON-LD structured data (Organization, LocalBusiness, Person) | ✅ DONE | Includes address, geo, areaServed |
| 2.2 | Add Service schema for coaching services | ✅ DONE | 8 services: Life, Accountability, Habit, Goal Setting, Personal Development, Performance, Decision, Family |
| 2.3 | Audit and fix WCAG contrast ratios | ✅ DONE | Primary darkened from 48% to 43% lightness |
| 2.4 | Add star ratings to Testimonials component | ✅ DONE | 5 filled stars per testimonial |
| 2.5 | Add `AggregateRating` / `Review` schema for testimonials | ⬜ TODO | Needs real reviews with structured data |
| 2.6 | Create dedicated pages (Blog, Resources, Quiz) | ✅ DONE | Already separate routes |
| 2.7 | Navigation with proper routing | ✅ DONE | Section scrolling + page routes |
| 2.8 | Implement prefers-reduced-motion | ✅ DONE | CSS media query in place |

---

## Phase 3: Content & Conversion (Week 4-8) — 3 of 5 DONE

Content strategy and lead generation improvements.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Establish consistent blog publishing schedule (2-4 posts/month) | ⬜ TODO | Ongoing, needs content creation |
| 3.2 | Integrate newsletter with Mailchimp | ✅ DONE | JSONP approach, env var configurable |
| 3.3 | Deploy downloadable lead magnets with email gate | ⬜ TODO | Needs Mailchimp fully configured first |
| 3.4 | Increase EN/ES toggle visibility | ✅ DONE | Globe icon, pill button, glow-pulse animation |
| 3.5 | Add pricing info to coaching packages | ✅ DONE | "Contact for pricing" on all packages |
| 3.6 | Blog and Resources pages | ✅ DONE | Both exist with content |
| 3.7 | Pricing packages displayed | ✅ DONE | 5 packages with details |

---

## Phase 4: Growth & Engagement (Week 8-16) — 0 of 7 DONE

Long-term engagement, analytics, and multimedia.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Build email drip sequences for quiz completions and resource downloads | ⬜ TODO | Needs Mailchimp automation setup |
| 4.2 | Collect and add more client testimonials (with permission) | ⬜ TODO | Ongoing, needs client content |
| 4.3 | Produce professional video content (intro/success stories) | ⬜ TODO | Needs video production |
| 4.4 | Set up GA4 custom events and conversion tracking | ⬜ TODO | Ready to implement in code — quiz completions, bookings, downloads, newsletter signups |
| 4.5 | Implement A/B testing on CTAs and hero section | ⬜ TODO | Needs analytics baseline first |
| 4.6 | Consider separate Services and Testimonials pages for deeper SEO | ⬜ TODO | Low priority — current structure works |
| 4.7 | Redesign logo image to match brand guidelines | ⬜ TODO | Current logo uses lowercase "change180" with teal/purple colors; needs uppercase "Change180" with peach/sage palette |

---

## Additional Completed Work (Beyond Original Plan)

| Task | Status | Notes |
|------|--------|-------|
| Uppercase brand "Change180" across all components and i18n | ✅ DONE | Fixed renderTextWithBrand() in 4 components + i18n files |
| Nav breakpoint for tablets (xl / 1280px) | ✅ DONE | Hamburger menu below 1280px |
| GBP keyword integration (meta, JSON-LD, services, FAQ) | ✅ DONE | 7 service labels, keyword-enriched content, 4 new FAQ entries |
| Brownsville, TX local SEO | ✅ DONE | Meta tags, JSON-LD address/geo/areaServed, contact location, about, footer, FAQ |
| Replace coaching session images (3 photos) | ✅ DONE | PNG to WebP conversion |
| Coaching images cleanup (delete source PNGs) | ✅ DONE | ~5.3 MB saved |

---

## Summary

| Phase | Status | Done | Remaining |
|-------|--------|------|-----------|
| **Phase 1** - Critical Fixes | ✅ COMPLETE | 7/7 | 0 |
| **Phase 2** - SEO & Accessibility | 🟡 4 of 5 | 7/8 | 1 (review schema) |
| **Phase 3** - Content & Conversion | 🟡 3 of 5 | 5/7 | 2 (blog schedule, lead magnets) |
| **Phase 4** - Growth & Engagement | ⬜ NOT STARTED | 0/7 | 7 |
| **Additional Work** | ✅ COMPLETE | 6/6 | 0 |
| **Total** | | **25 of 35** (~71%) | **10 remaining** |

### Next Code Task Ready to Implement

- **4.4**: GA4 custom events — quiz completions, Calendly bookings, resource downloads, newsletter signups

### Remaining Items That Need Content/External Tools

- **2.5**: AggregateRating schema (needs real structured reviews)
- **3.1**: Blog publishing schedule (needs content creation)
- **3.3**: Lead magnets with email gate (needs Mailchimp configured)
- **4.1**: Email drip sequences (needs Mailchimp automation)
- **4.2**: More testimonials (needs client content)
- **4.3**: Video content (needs production)
- **4.5**: A/B testing (needs analytics baseline)
- **4.6**: Separate pages (low priority)
- **4.7**: Logo redesign (needs design tool)
