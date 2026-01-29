# Quiz Feature Integration Guide

## Overview

This guide explains how to integrate the Self-Assessment Quiz feature into the Change 180 Life Coaching website.

---

## Files Created

```
src/
├── types/
│   └── quiz.ts                      # TypeScript interfaces
├── data/
│   └── quizQuestions.ts             # Questions, scoring logic, package details
├── components/
│   ├── Quiz/
│   │   ├── index.ts                 # Export barrel
│   │   ├── QuizContainer.tsx        # Main orchestration component
│   │   ├── QuizIntro.tsx            # Landing/intro screen
│   │   ├── QuizProgress.tsx         # Progress indicator
│   │   ├── QuizQuestion.tsx         # Individual question display
│   │   ├── QuizEmailCapture.tsx     # Email form before results
│   │   └── QuizResults.tsx          # Results with recommendations
│   └── QuizCTA.tsx                  # Homepage section component
├── pages/
│   └── Quiz.tsx                     # Dedicated quiz page
└── i18n/
    ├── quiz-en.json                 # English translations
    └── quiz-es.json                 # Spanish translations
```

---

## Integration Steps

### Step 1: Copy Files

Copy all the created files to their respective locations in your `src/` directory.

### Step 2: Update App.tsx

Add the Quiz route to your router:

```tsx
// src/App.tsx
import Quiz from "./pages/Quiz";

// Inside <Routes>:
<Route path="/quiz" element={<Quiz />} />
```

**Full updated App.tsx:**

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import Quiz from "./pages/Quiz";  // ADD THIS
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/quiz" element={<Quiz />} />  {/* ADD THIS */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
```

### Step 3: Add QuizCTA to Homepage

Update `src/pages/Index.tsx` to include the QuizCTA section:

```tsx
// src/pages/Index.tsx
import QuizCTA from "@/components/QuizCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <WhoWeHelp />
      <QuizCTA />        {/* ADD THIS - positioned before Services */}
      <Services />
      <Packages />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};
```

### Step 4: Add Quiz Link to Navigation

Update `src/components/Navigation.tsx` to include a quiz link:

**In the desktop navigation links array:**

```tsx
const navLinks = [
  { href: "#about", label: t("nav.about") },
  { href: "#services", label: t("nav.services") },
  { href: "#packages", label: t("nav.packages") },
  { href: "#contact", label: t("nav.contact") },
];

// After the navLinks.map() and Blog link, add:
<Link
  to="/quiz"
  className="text-primary hover:text-primary/80 transition-colors font-medium text-sm tracking-wide"
>
  {t("nav.quiz")}
</Link>
```

**In the mobile navigation:**

```tsx
<Link
  to="/quiz"
  className="block py-3 text-primary font-medium"
  onClick={() => setIsOpen(false)}
>
  {t("nav.quiz")}
</Link>
```

### Step 5: Merge Translation Files

Add the quiz translations to your existing i18n files.

**For English (`src/i18n/en.json`):**

1. Open `quiz-en.json`
2. Copy the entire `"quiz": { ... }` object
3. Paste it into `en.json` at the root level
4. Also add to the `nav` object: `"quiz": "Find Your Path"`
5. Also add to the `packages` object: `"family": { "name": "Family & Parent Coaching", "tagline": "Support for the whole family", "duration": "per session" }`

**For Spanish (`src/i18n/es.json`):**

1. Open `quiz-es.json`
2. Copy the entire `"quiz": { ... }` object  
3. Paste it into `es.json` at the root level
4. Also add to the `nav` object: `"quiz": "Encuentra Tu Camino"`
5. Also add the family package translations

### Step 6: Update sitemap.xml (Optional)

Add the quiz page to your sitemap:

```xml
<url>
  <loc>https://change180.org/quiz</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## Testing Checklist

- [ ] Quiz page loads at `/quiz`
- [ ] Quiz CTA appears on homepage
- [ ] Navigation link works (desktop & mobile)
- [ ] All 6 questions display correctly
- [ ] Progress bar updates
- [ ] Back/Next navigation works
- [ ] Email validation works
- [ ] Results show correct package recommendation
- [ ] Calendly popup opens from results
- [ ] PDF download works
- [ ] Language toggle switches all quiz text
- [ ] Mobile responsive layout works

---

## Future Enhancements

### Phase 2: Enhanced Email Integration

Replace the basic email capture with EmailJS or newsletter service:

```tsx
// In QuizEmailCapture.tsx or QuizContainer.tsx
const handleEmailSubmit = async (email: string, firstName: string) => {
  // Send to EmailJS
  await emailjs.send(
    SERVICE_ID,
    QUIZ_TEMPLATE_ID,
    {
      to_email: email,
      first_name: firstName,
      recommendation: result.primaryRecommendation.packageId,
      match_score: result.primaryRecommendation.matchPercentage,
    },
    PUBLIC_KEY
  );
};
```

### Phase 3: Real PDF Generation

Install a PDF library and create proper PDFs:

```bash
npm install @react-pdf/renderer
```

Then create a PDF component with branded layout.

### Phase 4: Analytics Tracking

Add detailed quiz analytics:

```tsx
// Track each question answer
gtag('event', 'quiz_question_answered', {
  question_id: questionId,
  answer_id: optionId,
  question_number: currentIndex + 1,
});

// Track email capture
gtag('event', 'quiz_email_captured', {
  recommendation: result.primaryRecommendation.packageId,
});
```

### Phase 5: A/B Testing

Test different quiz flows:
- Question order variations
- Different CTA copy
- Email capture before vs. after results

---

## Component Props Reference

### QuizContainer

```tsx
interface QuizContainerProps {
  onComplete?: (userData: QuizUserData) => void;  // Called when quiz is finished
  isModal?: boolean;                               // Render as modal vs. page
  onClose?: () => void;                            // Close handler for modal mode
}
```

### QuizCTA

No props - uses translation context internally.

---

## Scoring Algorithm

The quiz uses a weighted scoring system:

1. Each answer option has scores for all 5 packages (0-5 points each)
2. Scores are summed across all answers
3. Match percentage = (total score / max possible score) × 100
4. Primary recommendation = highest scoring package
5. Secondary recommendation = second highest (if score > 0)

Package recommendation is influenced by:
- **Life Stage**: Parents score higher for Family package
- **Challenge**: Parenting issues heavily weight Family; career weighs Clarity
- **Goals**: Family harmony weights Family; faith alignment weights Flourish
- **Commitment**: Higher commitment levels weight longer programs
- **Faith Importance**: Central faith weights Rooted/Flourish
- **Urgency**: Crisis weights longer support; curious weights Discovery

---

## Troubleshooting

**Quiz page shows 404:**
- Ensure the route is added to App.tsx above the catch-all `*` route

**Translations not showing:**
- Verify quiz translations are merged into en.json and es.json
- Check for JSON syntax errors
- Clear browser cache

**Calendly popup not working:**
- Ensure `react-calendly` is installed
- Verify the root element exists: `document.getElementById('root')`

**Styles look wrong:**
- Ensure Tailwind is processing the new component files
- Check that color classes match your theme (primary, accent, etc.)

---

*Integration guide for Change 180 Quiz Feature*
*Created: January 2025*
