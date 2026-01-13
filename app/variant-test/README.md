# Modern Variant Test Page

This page showcases the **modern variant** design directly, bypassing the variant resolver system.

## Access

Visit: **http://localhost:3000/variant-test**

## What's Displayed

This page includes all modern variant components:

1. **HeroSection** - Hero section with background media
2. **IntroSection** - Introduction section with image and content
3. **LocationPoliciesSection** - Policies/locations display
4. **Testimonials** - Customer reviews carousel
5. **HomeCTA** - Call-to-action section
6. **FAQPreview** - FAQ preview with accordion
7. **CareersSection** - Careers/jobs section

## How It Works

The page directly imports components from `components/variants/modern/` instead of using the variant resolver, so it will always show the modern variant regardless of database settings.

## Note

- Header and Footer will use the default variant (loaded via HeaderShell/FooterShell)
- Only the main content sections use the modern variant on this test page
- To use modern variant globally, set `template_variant = 'modern'` in the database
