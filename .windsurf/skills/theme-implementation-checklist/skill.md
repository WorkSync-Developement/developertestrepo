---
name: theme-implementation-checklist
description: Complete checklist for implementing a new theme. Use this to verify all requirements are met before submission.
---

# Theme Implementation Checklist

## Pre-Implementation

- [ ] Read all theme skills (component-contracts, css-variables, routing-patterns, data-fetching, folder-structure)
- [ ] Understand the Shell + Variant pattern
- [ ] Have test Supabase credentials and client ID
- [ ] Verify existing theme structure in `components/themes/`

---

## Structure Checklist

### Folder Structure
- [ ] Theme folder at `components/themes/{theme-name}/`
- [ ] `index.ts` exports all required components
- [ ] `layout/` folder with Header.tsx and Footer.tsx
- [ ] `home/` folder with all home page components
- [ ] `policies/` folder with PolicyPageTemplate.tsx
- [ ] `location/` folder (if implementing location components)
- [ ] `README.md` documenting the theme

### Required Components
- [ ] `Header.tsx` — Implements HeaderProps interface
- [ ] `Footer.tsx` — Implements FooterProps interface
- [ ] `HeroSection.tsx` — Async server component
- [ ] `IntroSection.tsx` — Async server component
- [ ] `LocationPoliciesSection.tsx` — Handles multi/single location modes
- [ ] `Testimonials.tsx` — Async server component
- [ ] `HomeCTA.tsx` — Handles multi/single location modes
- [ ] `FAQPreview.tsx` — Async server component
- [ ] `CareersSection.tsx` — Async server component
- [ ] `PolicyPageTemplate.tsx` — Implements PolicyPageTemplateProps

### Optional Components
- [ ] `FloatingCTA.tsx` — Mobile floating call button
- [ ] `LocationFeaturedPolicies.tsx` — Location page policies
- [ ] `LocationCareersSection.tsx` — Location page careers
- [ ] `LocationFAQSection.tsx` — Location page FAQ accordion

---

## Styling Checklist

### CSS Variables (CRITICAL)
- [ ] ALL colors use CSS variables (no hardcoded hex values)
- [ ] Primary colors: `--color-primary`, `--color-primary-foreground`
- [ ] Accent colors: `--color-accent`, `--color-accent-foreground`
- [ ] Secondary colors: `--color-secondary`, `--color-secondary-foreground`
- [ ] Background colors: `--color-background`, `--color-background-alt`
- [ ] Text colors: `--color-text-primary`, `--color-text-body`, `--color-text-muted`
- [ ] Navbar settings: `--navbar-bg-color`, `--navbar-text-color`, etc.
- [ ] CTA settings: `--cta-bg-color`, `--cta-text-color`, etc.
- [ ] Card settings: `--color-card-bg`, `--color-card-border`, etc.
- [ ] Footer settings: `--footer-bg`, `--footer-text`, etc.
- [ ] Location section: `--loc-section-bg`, `--loc-badge-bg`, etc.

### Responsive Design
- [ ] Mobile (< 768px) — All components render correctly
- [ ] Tablet (768px - 1024px) — All components render correctly
- [ ] Desktop (> 1024px) — All components render correctly
- [ ] Mobile menu works in Header
- [ ] Touch targets are appropriately sized

### Animations
- [ ] Animations are smooth
- [ ] Respects `prefers-reduced-motion`
- [ ] No janky transitions

---

## Functionality Checklist

### Navigation (Header)
- [ ] Home link works (uses locationPrefix)
- [ ] About link works
- [ ] Policies link works
- [ ] Contact link works
- [ ] Blog link works (conditional on features.show_blog)
- [ ] FAQ link works (conditional on features.show_faq_page)
- [ ] Glossary link works (conditional on features.show_glossary)
- [ ] Careers link works (conditional on features.show_careers_page)
- [ ] Phone number displays with click-to-call
- [ ] Logo displays correctly
- [ ] Mobile menu opens/closes
- [ ] Location picker works (if multi-location)

### Footer
- [ ] Agency name and tagline display
- [ ] Address displays correctly
- [ ] Phone number with click-to-call
- [ ] Social media links work
- [ ] Navigation links work
- [ ] Copyright with current year
- [ ] Location list/selector (if multi-location)

### Home Page Sections
- [ ] HeroSection — Background media (image/video), title, subtitle, CTA
- [ ] IntroSection — Image, tagline, title, paragraphs, divider
- [ ] LocationPoliciesSection — Shows locations (multi) or policies (single)
- [ ] Testimonials — Cards with author, content, ratings
- [ ] HomeCTA — Location cards (multi) or single CTA (single)
- [ ] FAQPreview — FAQ accordion with "View All" link
- [ ] CareersSection — Careers info with apply link

### Policy Pages
- [ ] PolicyPageTemplate renders all sections
- [ ] Hero section displays
- [ ] Content sections render
- [ ] FAQs display in accordion
- [ ] Related policies link correctly
- [ ] YouTube embed works (if present)

### Multi-Location
- [ ] LocationPoliciesSection shows location cards
- [ ] HomeCTA shows location contact cards
- [ ] Location picker in Header works
- [ ] All links use locationPrefix correctly
- [ ] Location landing page components work

---

## Data Fetching Checklist

- [ ] Uses existing data fetchers from `/lib/`
- [ ] Server components fetch their own data
- [ ] Client components receive data via props
- [ ] Returns `null` for missing data (graceful degradation)
- [ ] Filters by `client_id` from environment variable
- [ ] No hardcoded client IDs or data

---

## Code Quality Checklist

- [ ] TypeScript types are correct
- [ ] No `any` types
- [ ] ESLint passes with no errors
- [ ] Code is formatted consistently
- [ ] No console errors in browser
- [ ] No console warnings in browser
- [ ] Build succeeds (`npm run build`)

---

## Testing Checklist

### Pages to Test
- [ ] Home page (all sections)
- [ ] About page
- [ ] Policies list page
- [ ] Individual policy page
- [ ] Contact page
- [ ] FAQ page (if enabled)
- [ ] Blog page (if enabled)
- [ ] Glossary page (if enabled)
- [ ] Careers/Apply page (if enabled)

### Multi-Location Pages (if applicable)
- [ ] Location landing page (`/locations/[slug]`)
- [ ] Location policies page (`/locations/[slug]/policies`)
- [ ] Location policy detail (`/locations/[slug]/policies/[policy-slug]`)
- [ ] Location contact page (`/locations/[slug]/contact`)
- [ ] Location about page (`/locations/[slug]/about`)

### Theme System
- [ ] CSS variables are applied correctly
- [ ] Colors match theme settings from database
- [ ] Fonts load correctly
- [ ] Changing theme in admin reflects in components

### Feature Flags
- [ ] Components hide when feature is disabled
- [ ] Navigation items hide when feature is disabled

---

## Final Verification

```bash
# Run these commands before submission
npm run lint
npm run build
npm run dev  # Manual testing
```

- [ ] Lint passes
- [ ] Build succeeds
- [ ] All pages render correctly
- [ ] No console errors
- [ ] Theme changes in admin reflect in UI
