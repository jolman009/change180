# Change 180 - Phased Implementation Timeline

> Based on the Website Improvement Plan, cross-referenced with a full codebase audit.
> Items already completed are marked with checkmarks. Remaining work is prioritized by impact.

---

## Phase 1: Critical Fixes (Week 1-2)

Quick wins that fix broken functionality and core SEO issues.

| # | Task | Status | Effort | Impact |
|---|------|--------|--------|--------|
| 1.1 | Add missing `quiz.cta.*` translation keys to en.json & es.json | TODO | 1 hr | HIGH - QuizCTA renders broken text |
| 1.2 | Add `<link rel="canonical">` tag to index.html | TODO | 15 min | HIGH - SEO duplicate content risk |
| 1.3 | Delete leftover PNG source files (4 files, ~5.3 MB total) | TODO | 15 min | MEDIUM - Bloats repo/deploy |
| 1.4 | Verify all headings render correctly (no raw i18n keys visible) | TODO | 1 hr | HIGH - User-facing broken text |
| 1.5 | ~~Compress images to WebP~~ | DONE | - | Already using WebP |
| 1.6 | ~~Add alt text to all images~~ | DONE | - | All images have localized alt text |
| 1.7 | ~~Optimize render-blocking scripts~~ | DONE | - | Fonts async, scripts deferred |

**Estimated effort: ~2.5 hours**

---

## Phase 2: SEO & Accessibility (Week 2-4)

Structural improvements for search visibility and inclusivity.

| # | Task | Status | Effort | Impact |
|---|------|--------|--------|--------|
| 2.1 | Add JSON-LD structured data (`Organization`, `LocalBusiness`, `Person` schema) to index.html | TODO | 2 hrs | HIGH - Rich search results |
| 2.2 | Add `Service` schema for each coaching package | TODO | 1 hr | MEDIUM - Enhanced search listings |
| 2.3 | Audit and fix WCAG contrast ratios (especially peach text on cream backgrounds) | TODO | 2 hrs | MEDIUM - Accessibility compliance |
| 2.4 | Add star ratings to Testimonials component | TODO | 1 hr | MEDIUM - Social proof + review schema |
| 2.5 | Add `AggregateRating` / `Review` schema for testimonials | TODO | 1 hr | MEDIUM - Star ratings in search |
| 2.6 | ~~Create dedicated pages (Blog, Resources, Quiz)~~ | DONE | - | Already separate routes |
| 2.7 | ~~Navigation with proper routing~~ | DONE | - | Section scrolling + page routes |
| 2.8 | ~~Implement prefers-reduced-motion~~ | DONE | - | CSS media query in place |

**Estimated effort: ~7 hours**

---

## Phase 3: Content & Conversion (Week 4-8)

Content strategy and lead generation improvements.

| # | Task | Status | Effort | Impact |
|---|------|--------|--------|--------|
| 3.1 | Establish consistent blog publishing schedule (2-4 posts/month on parenting, personal growth, faith coaching) | TODO | Ongoing | HIGH - SEO long-tail keywords |
| 3.2 | Integrate newsletter with email service (Mailchimp/ConvertKit/Resend) | TODO | 3 hrs | HIGH - Lead capture is currently simulated |
| 3.3 | Deploy downloadable lead magnets (workbooks, guides) with email gate | TODO | 4 hrs | HIGH - Email list growth |
| 3.4 | Increase EN/ES toggle visibility and audit Spanish translation completeness | TODO | 2 hrs | MEDIUM - Bilingual audience reach |
| 3.5 | Add transparent pricing examples or ranges to coaching packages | TODO | 1 hr | MEDIUM - Reduces buyer friction |
| 3.6 | ~~Blog and Resources pages~~ | DONE | - | Both exist with content |
| 3.7 | ~~Pricing packages displayed~~ | DONE | - | 5 packages with details |

**Estimated effort: ~10 hours + ongoing content creation**

---

## Phase 4: Growth & Engagement (Week 8-16)

Long-term engagement, analytics, and multimedia.

| # | Task | Status | Effort | Impact |
|---|------|--------|--------|--------|
| 4.1 | Build email drip sequences for quiz completions and resource downloads | TODO | 6 hrs | HIGH - Automated lead nurturing |
| 4.2 | Collect and add more client testimonials (with permission and star ratings) | TODO | Ongoing | HIGH - Social proof |
| 4.3 | Produce professional video content (intro/success stories) | TODO | Variable | MEDIUM - Trust and engagement |
| 4.4 | Set up GA4 custom events and conversion tracking (quiz completions, bookings, downloads) | TODO | 3 hrs | HIGH - Data-driven decisions |
| 4.5 | Implement A/B testing on CTAs and hero section | TODO | 4 hrs | MEDIUM - Conversion optimization |
| 4.6 | Consider separate Services and Testimonials pages for deeper SEO | TODO | 4 hrs | LOW - Current structure works |
| 4.7 | Redesign logo image to use "Change180" (uppercase) and match peach/sage color palette | TODO | Variable | MEDIUM - Brand consistency (current logo uses lowercase "change180" with teal/purple colors) |

**Estimated effort: ~17 hours + ongoing content**

---

## Summary

| Phase | Timeline | Items TODO | Items DONE | Est. Effort |
|-------|----------|-----------|------------|-------------|
| **Phase 1** - Critical Fixes | Week 1-2 | 4 | 3 | ~2.5 hrs |
| **Phase 2** - SEO & Accessibility | Week 2-4 | 5 | 3 | ~7 hrs |
| **Phase 3** - Content & Conversion | Week 4-8 | 5 | 2 | ~10 hrs + ongoing |
| **Phase 4** - Growth & Engagement | Week 8-16 | 6 | 0 | ~17 hrs + ongoing |
| **Total** | | **20 items** | **8 already done** | **~36.5 hrs** |

### What's Already Done (8 of 28 items - 29%)

The codebase is in solid shape. These items from the improvement plan are already complete:
- WebP image optimization with proper compression
- Descriptive alt text on all images (localized EN/ES)
- Multi-page architecture with dedicated routes
- Proper navigation with routing and section scrolling
- Blog and resources pages with content
- Reduced motion accessibility support
- Script optimization (lazy loading, async fonts, code splitting)
- Pricing packages clearly displayed

### Highest-Impact Next Steps (do these first)

1. **Fix broken quiz.cta.* translations** - Users see raw keys
2. **Add canonical URL** - Quick SEO win
3. **Add JSON-LD structured data** - Rich search results
4. **Connect newsletter to real email service** - Capture leads for real
5. **Start consistent blog publishing** - Long-tail SEO growth
