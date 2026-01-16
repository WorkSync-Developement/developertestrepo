# Service Business Variant Plan

> **Variant Name**: `service-pro`  
> **Target**: Service-based businesses (HVAC, plumbing, electrical, landscaping, cleaning, etc.)  
> **Style**: Bold, trust-focused, conversion-optimized with prominent CTAs and service showcases

---

## 1. Feature Summary

- Create a new variant `service-pro` targeting service-based local businesses
- Bold, high-contrast design with prominent phone CTAs and "Book Now" buttons
- Service grid/card layout optimized for showcasing multiple service offerings
- Trust signals prominently displayed (licenses, certifications, reviews, years in business)
- Mobile-first with thumb-friendly tap targets for service calls
- Emergency/24-7 service badge support in hero section

---

## 2. Ownership Decision

**Owner**: `template-coverage-creatives` (developertestrepo for variant development)

**Rationale**: This is purely UI presentation - a new visual variant. No business logic, no API changes, no database schema changes. All data contracts remain identical to existing variants.

**Touched**: YES  
**Proof**: New variant folder created under `components/variants/service-pro/`

---

## 3. Touchpoints Inventory

| Area | Touched | Details |
|------|---------|---------|
| Routes/handlers | NO | Routes unchanged - variants don't modify routing |
| Types | NO | Using existing prop interfaces from spec |
| Auth path | NO | No auth in template repo |
| Tables/columns | NO | No schema changes |
| Schema changes | NO | Variant is UI-only |

---

## 4. Auth & Permissions

**Touched**: NO  
**Proof**: `template-coverage-creatives` has no authentication. All pages are public. Per spec: "No user authentication, No login/logout flows, No protected routes."

---

## 5. Supabase Access Pattern

**Touched**: NO  
**Proof**: Variants do not perform data fetching. Shell components handle all Supabase queries and pass standardized props to variant components.

---

## 6. Schema Trace End-to-End

**Touched**: NO  
**Proof**: No database changes. Variant consumes existing props from shell components. All data contracts defined in `TEMPLATE_VARIANT_SPECIFICATION.md` remain unchanged.

---

## 7. Files to Read / Files to Edit

### Files to Read (for reference patterns)
- `components/variants/coastal/` - existing variant structure
- `components/layout/HeaderShell.tsx` - shell prop contract
- `components/layout/FooterShell.tsx` - shell prop contract
- `lib/theme/defaults.ts` - CSS variable fallbacks
- `tailwind.config.ts` - theme class mappings

### Files to Create
```
components/variants/service-pro/
├── index.ts
├── README.md
├── layout/
│   ├── Header.tsx
│   └── Footer.tsx
├── home/
│   ├── HeroSection.tsx
│   ├── IntroSection.tsx
│   ├── ServiceGrid.tsx (maps to LocationPoliciesSection)
│   ├── Testimonials.tsx
│   ├── HomeCTA.tsx
│   ├── FAQPreview.tsx
│   └── TrustBadges.tsx
└── policies/
    └── PolicyPageTemplate.tsx
```

---

## 8. Routes Affected

**Touched**: NO  
**Proof**: Variants do not modify routes. The variant is selected via `template_variant` in `client_theme_settings` and dynamically loaded by the variant resolver.

---

## 9. Types Reused / Created

### Types Reused (from spec)
- `HeaderProps`
- `FooterProps`
- `HeroSectionProps`
- `IntroSectionProps`
- `LocationPoliciesSectionProps`
- `TestimonialsProps`
- `HomeCTAProps`
- `FAQPreviewProps`
- `PolicyPageTemplateProps`

### Types Created
- None - all prop interfaces defined in spec

---

## 10. Tables Touched / Columns Touched

**Touched**: NO  
**Proof**: UI-only variant. No database modifications.

---

## 11. Backend Artifacts Staging

**Touched**: NO  
**Proof**: No migrations, edge functions, or assistant instructions required for a UI variant.

---

## 12. Design Approach

### Visual Style
- **Color Usage**: High contrast, bold primary colors for CTAs
- **Typography**: Strong, readable headings (suggest: Montserrat or similar sans-serif)
- **Layout**: Card-based service grid, prominent phone numbers
- **Trust Elements**: Badges for licensing, insurance, reviews, years in business

### Key Differentiators from Insurance Variants
| Element | Insurance (coastal) | Service Business (service-pro) |
|---------|---------------------|-------------------------------|
| Hero CTA | "Get a Quote" | "Call Now" / "Book Service" |
| Service Display | Policy categories | Service cards with icons |
| Trust Signals | Licensed agent badges | BBB, Home Advisor, licensed/insured |
| Urgency | Subtle | Emergency service badges, 24/7 availability |
| Phone Display | Header only | Header + Hero + Floating mobile button |

### Component Libraries to Source
- **Icons**: Lucide React (already in stack)
- **Animations**: Framer Motion (optional, for subtle interactions)
- **UI Patterns**: Inspiration from shadcn/ui card patterns

---

## 13. Tests & Commands

```bash
# Development
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build verification
npm run build
```

### Manual Testing Checklist
- [ ] Header renders with all nav items based on features
- [ ] Footer renders with contact info and social links
- [ ] Hero section displays with CTA buttons
- [ ] Service grid shows policy/service cards
- [ ] Testimonials carousel/grid works
- [ ] Mobile menu opens/closes
- [ ] Phone click-to-call works
- [ ] All CSS variables respected (no hardcoded colors)
- [ ] Responsive at 320px, 768px, 1024px, 1440px

---

## 14. Risks / Open Questions

### Questions for Approval

1. **Variant Name**: Is `service-pro` acceptable, or prefer something else (e.g., `contractor`, `trades`, `local-service`)?

2. **Icon Set**: Should I use Lucide icons throughout, or source a specific icon pack for service industries?

3. **Animation Level**: 
   - Minimal (CSS transitions only)
   - Moderate (Framer Motion for hero/cards)
   - None (static)

4. **Mobile Floating CTA**: Should I include a sticky "Call Now" button on mobile that persists during scroll?

5. **Emergency Badge**: Include an optional "24/7 Emergency Service" badge in hero? (Would use existing `hero_divider_settings.badges` structure)

---

## 15. Checklist (Approval Gate)

### Phase 1: Core Layout
- [ ] Create `components/variants/service-pro/` folder structure
- [ ] Create `index.ts` with all exports
- [ ] Create `README.md` documenting the variant
- [ ] Implement `Header.tsx` with bold nav + prominent phone CTA
- [ ] Implement `Footer.tsx` with service-focused layout

### Phase 2: Home Page Sections
- [ ] Implement `HeroSection.tsx` with bold CTA buttons
- [ ] Implement `IntroSection.tsx` with trust messaging
- [ ] Implement `ServiceGrid.tsx` (LocationPoliciesSection) with card layout
- [ ] Implement `Testimonials.tsx` with review cards
- [ ] Implement `HomeCTA.tsx` with conversion-focused design
- [ ] Implement `FAQPreview.tsx`

### Phase 3: Policy/Service Pages
- [ ] Implement `PolicyPageTemplate.tsx` adapted for service descriptions

### Phase 4: Polish & Verification
- [ ] Verify all CSS variables used (no hardcoded colors)
- [ ] Test responsive breakpoints
- [ ] Test with different theme colors
- [ ] Run `npm run build` successfully
- [ ] Run `npx tsc --noEmit` with no errors

---

## [DECISION REQUIRED]

**Please confirm:**

1. Proceed with variant name `service-pro`?
2. Animation preference (minimal/moderate/none)?
3. Include mobile floating CTA button?
4. Any specific service industry to optimize for (HVAC, plumbing, general contractor, etc.) or keep generic?
5. Approve the checklist above to begin implementation?

---

---

## Final Report

### Status: ✅ COMPLETE

### Files Created
```
components/variants/service-pro/
├── index.ts                          # Exports all variant components
├── README.md                         # Variant documentation
├── layout/
│   ├── Header.tsx                    # Bold nav with prominent phone CTA
│   └── Footer.tsx                    # Trust badges strip + service-focused layout
├── home/
│   ├── HeroSection.tsx               # Full-width hero with bold CTAs + trust indicators
│   ├── IntroSection.tsx              # Feature grid + trust messaging
│   ├── LocationPoliciesSection.tsx   # Policy/location cards with icons
│   ├── Testimonials.tsx              # Review cards + trust stats
│   ├── HomeCTA.tsx                   # Gradient CTA section (single/multi-location)
│   ├── FAQPreview.tsx                # Accordion FAQ preview
│   └── FloatingCTA.tsx               # Mobile sticky call button
└── policies/
    └── PolicyPageTemplate.tsx        # Policy detail page with sidebar
```

### Key Features Implemented
- **Header**: Fixed position, scroll-aware styling, mobile menu, location dropdown
- **Footer**: Trust badges strip, 4-column layout, multi-location support
- **Hero**: Wave divider, trust indicators, gradient fallback
- **Intro**: Feature grid (4 items), floating image badge, decorative elements
- **Policies Grid**: Icon mapping by policy type, hover animations
- **Testimonials**: Star ratings, avatar fallback, trust stats section
- **CTA**: Multi-location cards OR single-location gradient CTA
- **FAQ**: Native `<details>` accordion, no JS required
- **Floating CTA**: Mobile-only, dismissible, pulse animation

### Verification
- `npx tsc --noEmit` → ✅ No errors
- `npm run build` → ✅ Success (62 pages generated)

### CSS Variables Used (no hardcoded colors)
- `--color-primary`, `--color-primary-foreground`
- `--color-accent`, `--color-accent-foreground`
- `--color-secondary`, `--color-secondary-foreground`
- `--color-background`, `--color-background-alt`
- `--color-text-primary`, `--color-text-body`, `--color-text-muted`

### Animations (minimal CSS transitions)
- Hover: `scale`, `opacity`, `translate`, `color`
- Scroll: Header background change
- Interactive: Accordion chevron rotation, button press feedback

### Branch
- `andrewlongron` on `developertestrepo`

### Next Steps (if needed)
1. Wire up variant resolver to load `service-pro` based on `template_variant` setting
2. Add `template_variant = 'service-pro'` to test client's `client_theme_settings`
3. Test with `npm run dev`
