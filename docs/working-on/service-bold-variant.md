# Service Bold Variant Plan

## Feature Summary
- **New variant name**: `service-bold`
- **Target**: Service-based businesses (insurance, landscaping, contractors, etc.)
- **Design inspiration**: Rhinamic Landscape Design + react-bits components
- **Scope**: Home page only (like service-pro)
- **Key features**: Bold hero with video/image background, animated service cards, testimonial carousel, gallery section, "Why Choose Us" section with credentials, contact CTA section

## Ownership Decision
**Touched: YES**
- **Owner**: `template-coverage-creatives` (developertestrepo)
- **Reason**: This is a variant layout for the template system, not coverage-nextjs admin functionality

## Touchpoints Inventory
**Touched: YES**

| Area | Items |
|------|-------|
| Routes/Handlers | None - variant components only |
| Types | Existing interfaces (HeroSection, IntroSection, etc.) |
| Auth Path | None - public pages only |
| Tables/Columns | Reads existing: `client_home_page`, `client_theme_settings`, `client_policy_pages`, `client_faqs` |
| Schema Changes | **NO** - uses existing schema |

## Auth & Permissions
**Touched: NO**
- No auth required - public-facing variant components
- Data fetched server-side using existing patterns

## Supabase Access Pattern
**Touched: YES**
- Uses existing `supabase` client from `@/lib/supabase`
- Server-side data fetching in async components
- No new client patterns needed

## Schema Trace End-to-End
**Touched: NO**
- No schema changes
- All data sources already exist and are used by other variants

## Files to Read
- `C:\Users\Andrew\Desktop\New Websites and Apps\rhinamic-nextjs\components\sections\*` - Design inspiration ✅
- `C:\Users\Andrew\Desktop\Site Code and Programs\react-bits\src\content\*` - Animation components ✅
- `components\variants\service-pro\*` - Existing variant structure ✅
- `components\home-page\*` - Base component contracts ✅

## Files to Create
```
components/variants/service-bold/
├── index.ts                          # Exports
├── README.md                         # Documentation
├── layout/
│   ├── Header.tsx                    # Dark/bold header with glass effect
│   └── Footer.tsx                    # Modern footer with credentials
├── home/
│   ├── HeroSection.tsx               # Full-screen hero with video bg, animated text
│   ├── ServicesSection.tsx           # Animated service cards with icons + details
│   ├── WhyChooseUsSection.tsx        # Benefits grid + credentials (from rhinamic)
│   ├── GallerySection.tsx            # Image gallery with hover effects
│   ├── TestimonialsSection.tsx       # Carousel testimonials with avatar
│   ├── ContactCTA.tsx                # Bold contact section
│   └── FloatingCTA.tsx               # Mobile sticky button
└── policies/
    └── PolicyPageTemplate.tsx        # (optional - may use default)
```

## Routes Affected
**Touched: YES**
- `/` (home page) - when variant is wired up
- No new routes created

## Types Reused / Created
**Touched: YES**
- **Reused**: All existing prop interfaces from Shell components
- **Created**: None - follows existing contracts

## Tables Touched / Columns Touched
**Touched: NO**
- Read-only access to existing tables
- No modifications

## Backend Artifacts Staging
**Touched: NO**
- No migrations needed
- No edge functions needed
- No assistant instructions needed

## Design Approach

### Color Palette (configurable via database)
- **Primary**: Deep purple/navy (`#6B46C1` or `#1e3a5f`)
- **Accent**: Lavender/gold (`#9F7AEA` or `#d4a853`)
- **Background**: Light cream/white with subtle gradients
- **Text**: High contrast dark on light

### Key Design Elements (from Rhinamic)
1. **Hero Section**
   - Full-screen with background image/video
   - Glassmorphism badge ("Since 2010" style)
   - Bold multi-line headline
   - Dual CTA buttons (primary + phone)
   - Trust indicators bar at bottom

2. **Services Section**
   - 6-card grid with icons
   - Each card has: icon, title, description, bullet details
   - Hover effects with shadow/lift
   - "Learn More" links per service
   - Bottom CTA button

3. **Why Choose Us Section**
   - Dark background (primary color)
   - 4 benefit cards (white on dark)
   - Credentials/certifications row
   - "Commitment to Excellence" feature box with CTA

4. **Gallery Section**
   - Masonry or grid layout
   - Hover overlay with project info
   - "View Full Gallery" CTA

5. **Testimonials Section**
   - Carousel with auto-rotate
   - Split layout (avatar left, quote right)
   - Navigation dots + arrows

6. **Contact CTA Section**
   - Gradient or solid color background
   - Bold headline + description
   - Phone + form CTA buttons

### Animations (from react-bits inspiration)
- **AnimatedContent**: Fade-in on scroll for sections
- **GlareHover**: Subtle shine effect on cards
- **Counter**: Animated stats (years, clients, etc.)
- CSS transitions for hover states

## Tests & Commands
```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build
npm run build

# Dev server
npm run dev
```

### Manual Testing Checklist
- [ ] Header renders with nav and phone CTA
- [ ] Hero displays with background media
- [ ] Services grid shows 6 cards with icons
- [ ] Why Choose Us section has benefits + credentials
- [ ] Gallery shows images with hover effects
- [ ] Testimonials carousel auto-rotates
- [ ] Contact CTA has working buttons
- [ ] Mobile menu works
- [ ] Floating CTA appears on mobile
- [ ] Responsive at 320px, 768px, 1024px, 1440px

## Risks / Open Questions

1. **Animation library**: Should we install framer-motion or use CSS-only?
   - **Recommendation**: CSS-only for simplicity, matching service-pro approach

2. **Gallery data source**: Where do gallery images come from?
   - **Option A**: Use existing `client_home_page` gallery section
   - **Option B**: Static placeholder images
   - **Recommendation**: Option A if data exists, fallback to B

3. **Video background**: Does hero support video?
   - **Answer**: Yes, existing `hero_section` schema supports `background_media_type: 'video'`

## Checklist (Approval Gate)

### Pre-Implementation
- [ ] Plan reviewed and approved by user
- [ ] Design direction confirmed (rhinamic-inspired)
- [ ] Animation approach confirmed (CSS-only vs library)

### Implementation
- [ ] Create variant folder structure
- [ ] Implement Header component
- [ ] Implement Footer component
- [ ] Implement HeroSection
- [ ] Implement ServicesSection
- [ ] Implement WhyChooseUsSection
- [ ] Implement GallerySection
- [ ] Implement TestimonialsSection
- [ ] Implement ContactCTA
- [ ] Implement FloatingCTA
- [ ] Create README.md
- [ ] Create index.ts exports

### Verification
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` succeeds
- [ ] Manual testing checklist complete

---

## Decisions Confirmed ✅

1. **Variant name**: `service-bold` ✅
2. **Animation approach**: Framer-motion for bold animations ✅
3. **Gallery**: Use existing database data ✅
4. **Color scheme**: Lehmann Agency inspired
   - **Primary**: Slate blue `#506A7E`
   - **Accent**: White `#FFFFFF`
   - **CTA Accent**: Warm gold `#C9A962` (for buttons/highlights)
   - **Dark variant**: `#3D5466`
   - **Light background**: `#F5F7F9`

## Implementation Status

- [x] Plan approved
- [ ] Install framer-motion
- [ ] Create folder structure
- [ ] Implement components
- [ ] Wire up and test
