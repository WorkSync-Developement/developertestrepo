# Modern Variant

A clean, sleek, contemporary template variant for insurance agency websites.

## Design Philosophy

The Modern variant features:
- **Clean, minimalist design** with ample white space
- **Smooth animations** and transitions
- **Modern typography** with clear hierarchy
- **Professional aesthetics** suitable for insurance agencies
- **Fully responsive** design that works on all devices
- **Theme-aware** using CSS variables throughout

## Implementation Status

### ✅ Completed Components

- Header - Modern navigation with sticky behavior
- Footer - Clean footer with organized sections
- HeroSection - Full-width hero with video/image support

### 🚧 Remaining Components

The following components need to be created to complete the variant:

1. **IntroSection.tsx** - About/introduction section
2. **LocationPoliciesSection.tsx** - Policies/locations display
3. **Testimonials.tsx** - Customer reviews carousel
4. **HomeCTA.tsx** - Call-to-action section
5. **FAQPreview.tsx** - FAQ preview with accordion
6. **CareersSection.tsx** - Careers/jobs section
7. **PolicyPageTemplate.tsx** - Policy detail page layout
8. **LocationFeaturedPolicies.tsx** - Location page policies
9. **LocationCareersSection.tsx** - Location careers section
10. **LocationFAQSection.tsx** - Location FAQ accordion

## Usage

To use this variant, set the `template_variant` field in the `client_theme_settings` table to `'modern'`.

## CSS Variables

All components use CSS variables for theming:
- `--color-primary` - Primary brand color
- `--color-accent` - Accent/CTA color
- `--color-text-primary` - Heading text color
- `--color-text-body` - Body text color
- `--navbar-*` - Navbar styling variables
- `--cta-*` - CTA button styling variables
- And more...

## Notes

- All components follow the Template Variant Specification
- Components use existing data fetching patterns from `/lib`
- Responsive design follows mobile-first approach
- Animations respect `prefers-reduced-motion`
