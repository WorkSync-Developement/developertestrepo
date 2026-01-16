# Service Bold Variant

> **Scope:** This variant applies to the **Home Page only**. Other pages use default template components.

A bold, animated variant inspired by Rhinamic Landscape Design with the Lehmann Agency color palette.

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Slate Blue) | `#506A7E` | Headers, backgrounds, text |
| Dark Variant | `#3D5466` | Hover states, darker sections |
| CTA Accent (Gold) | `#C9A962` | Buttons, highlights, accents |
| Light Background | `#F5F7F9` | Section backgrounds |
| White | `#FFFFFF` | Text on dark, cards |

## Design Philosophy

- **Bold & Animated**: Framer-motion powered animations
- **Service-Focused**: Detailed service cards with bullet points
- **Trust-Building**: Credentials, certifications, "Why Choose Us" section
- **Visual Gallery**: Project/work showcase with hover effects
- **Testimonial Carousel**: Auto-rotating client reviews

## Components

### Layout
- `Header.tsx` - Glass-effect header with scroll animations
- `Footer.tsx` - Modern footer with credentials strip

### Home Page Sections
- `HeroSection.tsx` - Full-screen hero with video/image bg, animated text
- `ServicesSection.tsx` - 6-card grid with icons, descriptions, details
- `WhyChooseUsSection.tsx` - Benefits + credentials on dark background
- `GallerySection.tsx` - Image grid with hover overlays
- `TestimonialsSection.tsx` - Carousel with auto-rotate
- `ContactCTA.tsx` - Bold contact section
- `FloatingCTA.tsx` - Mobile sticky call button

## Animations (Framer Motion)

- **Fade In Up**: Sections animate in on scroll
- **Stagger Children**: Cards animate in sequence
- **Hover Scale**: Cards lift on hover
- **Carousel**: Smooth testimonial transitions

## Variant Scope

| Page | Uses This Variant? |
|------|-------------------|
| Home Page (`/`) | ✅ Yes |
| Other Pages | ❌ No (uses default) |
