# Service Pro Variant

> **Scope:** This variant applies to the **Home Page only**. Other pages (About, FAQ, Policies, Locations, etc.) use the default template components.

A bold, conversion-focused variant designed for insurance agencies with emphasis on trust signals and prominent call-to-action elements.

## Variant Scope

| Page | Uses This Variant? |
|------|-------------------|
| Home Page (`/`) | ✅ Yes |
| Location Pages (`/locations/[slug]`) | ❌ No (uses default) |
| About Page | ❌ No (uses default) |
| FAQ Page | ❌ No (uses default) |
| Policy Pages | ❌ No (uses default) |
| Contact Page | ❌ No (uses default) |

## Design Philosophy

- **Bold & Professional**: High contrast, strong typography
- **Conversion-Focused**: Prominent phone CTAs, floating mobile call button
- **Trust-First**: Badges, certifications, years in business prominently displayed
- **Mobile-Optimized**: Thumb-friendly tap targets, sticky call button on mobile

## Components

### Layout (Shared)
- `Header.tsx` - Bold navigation with prominent phone CTA
- `Footer.tsx` - Service-focused footer with trust signals

### Home Page (Variant-Specific)
- `HeroSection.tsx` - Full-width hero with bold CTA buttons
- `IntroSection.tsx` - Trust-focused introduction
- `LocationPoliciesSection.tsx` - Service/policy grid cards
- `Testimonials.tsx` - Review cards with star ratings
- `HomeCTA.tsx` - Conversion-focused call-to-action section
- `FAQPreview.tsx` - FAQ accordion preview
- `FloatingCTA.tsx` - Mobile sticky call button

### Policies (Default Template)
- Uses default `PolicyPageTemplate.tsx` from base template

## CSS Variables Used

All colors use CSS variables for theme compatibility:
- `--color-primary` / `--color-primary-foreground`
- `--color-accent` / `--color-accent-foreground`
- `--color-secondary` / `--color-secondary-foreground`
- `--color-background` / `--color-background-alt`
- `--color-text-primary` / `--color-text-body` / `--color-text-muted`

## Animations

Minimal CSS transitions only:
- Hover states (opacity, scale, color)
- Page scroll effects (sticky header)
- Button interactions

No heavy JavaScript animations or libraries required.
