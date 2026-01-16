# Service Bold Variant - State Snapshot (Jan 15, 2026)

This documents the working state before enhancements. Use for revert reference if needed.

## Working Components

### Home Page Sections (all database-driven)
- `HeroSectionWrapper.tsx` - Fetches from `client_home_page.hero_section`
- `ServicesSectionWrapper.tsx` - Fetches from `client_policy_pages` (published=true)
- `WhyChooseUsSectionWrapper.tsx` - Fetches from `client_home_page.intro_section`
- `TestimonialsSectionWrapper.tsx` - Fetches from `client_home_page.testimonials_section.reviews.items`
- `ContactCTAWrapper.tsx` - Fetches from `clients` table
- `FloatingCTAWrapper.tsx` - Fetches from `clients`/`client_websites`

### Layout
- `Header.tsx` - Solid slate blue background (#506A7E)
- `Footer.tsx` - Credentials strip, quick links

## Key Fixes Applied
1. `ServicesSectionWrapper` - Changed `is_active` to `published`, `display_order` to `created_at`
2. `WhyChooseUsSectionWrapper` - Fixed nested path `title.content`
3. `TestimonialsSectionWrapper` - Fixed path `reviews.items` instead of `testimonials`
4. `HeroSection` - Removed wave divider SVG
5. `Header` - Changed from transparent to solid background

## Color Palette
```
primary: '#506A7E' (slate blue)
dark: '#3D5466'
accent: '#C9A962' (warm gold)
light: '#F5F7F9'
white: '#FFFFFF'
```

## ServicesSection Current Hover State (before enhancement)
```tsx
// Card hover - line ~115
whileHover={{ y: -8, transition: { duration: 0.3 } }}
className="... shadow-lg hover:shadow-xl ..."
```

## Files in Variant
```
components/variants/service-bold/
├── home/
│   ├── ContactCTA.tsx
│   ├── ContactCTAWrapper.tsx
│   ├── FloatingCTA.tsx
│   ├── FloatingCTAWrapper.tsx
│   ├── GallerySection.tsx (disconnected)
│   ├── HeroSection.tsx
│   ├── HeroSectionWrapper.tsx
│   ├── ServicesSection.tsx
│   ├── ServicesSectionWrapper.tsx
│   ├── TestimonialsSection.tsx
│   ├── TestimonialsSectionWrapper.tsx
│   ├── WhyChooseUsSection.tsx
│   └── WhyChooseUsSectionWrapper.tsx
├── layout/
│   ├── Footer.tsx
│   └── Header.tsx
├── index.ts
├── README.md
└── REMOVED_FEATURES.md
```
