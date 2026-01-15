# Professional Variant

A professional, modern variant designed specifically for insurance agencies with multiple office locations.

## Overview

This variant is optimized for multi-location insurance agencies, providing clear navigation between locations while maintaining a cohesive brand experience. The design emphasizes trust, professionalism, and accessibility.

## Design Philosophy

- **Location-Centric**: Highlights multiple locations with prominent location cards and dropdowns
- **Professional**: Clean, trustworthy design suitable for insurance businesses
- **Conversion-Focused**: Strategic CTAs throughout the user journey
- **Mobile-First**: Fully responsive across all device sizes
- **Theme-Aware**: All colors driven by CSS variables from theme settings

## Component Features

### Layout Components

#### Header

- Sticky navigation for easy access
- Locations dropdown in desktop view
- Mobile-friendly hamburger menu
- Prominent phone CTA
- Logo and agency name display
- Conditional navigation based on feature flags

#### Footer

- Multi-column layout with agency info, quick links, and locations
- Social media icons
- Contact information with click-to-call and email
- Dynamic copyright year
- Location list for multi-location agencies

### Home Page Components

#### HeroSection

- Full-width hero with image or video background
- Customizable overlay with opacity control
- Title, subtitle, and description
- Integrated CTA button
- Decorative bottom wave transition

#### IntroSection

- Two-column layout (image + content)
- Image with overlay tag
- Tagline badge
- Multiple content paragraphs
- Configurable aspect ratio for image

#### LocationPoliciesSection

- **Multi-location mode**: Displays location cards with city/state
- **Single-location mode**: Displays policy cards
- Hover effects with elevation
- Icon-based design
- Links to location or policy pages

#### Testimonials

- Grid layout (1-3 columns based on screen size)
- Star ratings
- Quote icon
- Avatar or initial circle
- Author name and title

#### HomeCTA

- **Multi-location mode**: Cards for each location with contact links
- **Single-location mode**: Single centered CTA
- Background image or gradient support
- Phone numbers per location
- Clear call-to-action buttons

#### FAQPreview

- Shows top 5 FAQs from database
- Category tags
- "View All FAQs" button
- Clean card-based design

#### CareersSection

- Two-column layout (content + feature icons)
- Benefits list with checkmarks
- Feature cards with icons
- "View Open Positions" CTA

### Policy Components

#### PolicyPageTemplate

- Hero section with policy name and summary
- Two-column layout (main content + sidebar)
- Rich HTML content rendering
- Features list with checkmarks
- FAQ accordion
- Related policies sidebar
- Sticky CTA card with phone and contact buttons
- Location-aware URLs

### Location Components

#### LocationFeaturedPolicies

- Grid of policy cards (1-3 columns)
- Icon-based design
- Hover effects
- Links to location-specific policy pages
- "View All Policies" button

## CSS Variables Used

This variant uses all standard CSS variables from the theme system:

### Colors

- `--color-primary` - Main brand color (nav, footers, headings)
- `--color-primary-foreground` - Text on primary color
- `--color-accent` - CTAs, highlights, links
- `--color-accent-foreground` - Text on accent color
- `--color-secondary` - Badges, subtle backgrounds
- `--color-secondary-foreground` - Text on secondary
- `--color-background` - Page/section backgrounds
- `--color-background-alt` - Card backgrounds
- `--color-text-primary` - Headings
- `--color-text-body` - Body text
- `--color-text-muted` - Captions, hints
- `--divider-color` - Divider lines

### Typography

- `--font-heading` - Heading font family
- `--font-body` - Body font family
- `--heading-weight` - Heading font weight
- `--body-weight` - Body font weight

### Component-Specific

- `--navbar-bg-color` - Header background
- `--navbar-text-color` - Header text
- `--cta-bg-color` - CTA button background
- `--cta-text-color` - CTA button text
- `--intro-section-aspect-ratio` - Intro image aspect ratio

## Multi-Location Features

This variant excels at handling multiple locations:

1. **Location Dropdown**: Desktop header includes a locations dropdown
2. **Location Cards**: Homepage displays location cards instead of policies
3. **Location-Specific CTAs**: CTA section shows cards for each location
4. **Footer Location List**: All locations listed in footer
5. **Location Prefix Routing**: All links properly use `locationPrefix` prop

## URL Structure

The variant properly handles both routing modes:

### Single-Location

- `/` - Home
- `/policies` - Policies list
- `/policies/{slug}` - Policy detail
- `/contact` - Contact

### Multi-Location

- `/locations/{slug}` - Location home
- `/locations/{slug}/policies` - Location policies
- `/locations/{slug}/policies/{policy-slug}` - Location policy detail
- `/locations/{slug}/contact` - Location contact

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari iOS 12+
- Chrome Android (latest)

## Performance Considerations

- Server-side rendering for all data fetching
- Minimal client-side JavaScript (only Header for mobile menu)
- Optimized images with proper sizing
- CSS variables for instant theme switching

## Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast meets WCAG AA standards
- Focus states on all interactive elements

## Customization

All visual styling is controlled through the `client_theme_settings` table. No hardcoded colors are used except as fallbacks. To customize:

1. Update theme settings in database
2. Changes apply immediately via CSS variables
3. No code changes required

## Testing Checklist

- [ ] Header displays correctly on desktop and mobile
- [ ] Locations dropdown works (multi-location mode)
- [ ] Footer shows all locations (multi-location mode)
- [ ] Hero section displays with correct background
- [ ] LocationPoliciesSection shows locations (multi-location) or policies (single)
- [ ] Testimonials render in grid
- [ ] HomeCTA shows location cards (multi-location) or single CTA
- [ ] Policy pages render correctly
- [ ] All CSS variables applied properly
- [ ] All links use correct locationPrefix

## Notes

- This variant is designed for **multi-location agencies** but gracefully handles single-location mode
- All data fetching happens server-side for optimal performance
- Components follow the exact contracts specified in `TEMPLATE_VARIANT_SPECIFICATION.md`
- No authentication is required or implemented
