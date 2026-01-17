---
name: theme-component-contracts
description: Required component interfaces and props for theme implementations. Every theme must implement these exact contracts.
---

# Theme Component Contracts (Hard Constraints)

## Required Components

Every theme MUST export these components from `index.ts`:

| Component | Path | Type |
|-----------|------|------|
| Header | `layout/Header.tsx` | Server or Client |
| Footer | `layout/Footer.tsx` | Server or Client |
| HeroSection | `home/HeroSection.tsx` | Async Server |
| IntroSection | `home/IntroSection.tsx` | Async Server |
| LocationPoliciesSection | `home/LocationPoliciesSection.tsx` | Async Server |
| Testimonials | `home/Testimonials.tsx` | Async Server |
| HomeCTA | `home/HomeCTA.tsx` | Async Server |
| FAQPreview | `home/FAQPreview.tsx` | Async Server |
| CareersSection | `home/CareersSection.tsx` | Async Server |
| PolicyPageTemplate | `policies/PolicyPageTemplate.tsx` | Server or Client |

## Optional Location Components

| Component | Path | Purpose |
|-----------|------|---------|
| LocationFeaturedPolicies | `location/LocationFeaturedPolicies.tsx` | Location page policies |
| LocationCareersSection | `location/LocationCareersSection.tsx` | Location careers |
| LocationFAQSection | `location/LocationFAQSection.tsx` | Location FAQ accordion |
| FloatingCTA | `home/FloatingCTA.tsx` | Mobile floating call button |

## Header Props Contract

```typescript
interface HeaderProps {
  websiteName?: string;
  phone?: string;
  logoUrl?: string | null;
  showSiteName?: boolean;
  locationPrefix?: string;
  features?: {
    show_blog?: boolean;
    show_glossary?: boolean;
    show_faq_page?: boolean;
    show_careers_page?: boolean;
    multi_location?: boolean;
  };
  navbarSettings?: NavbarSettings;
  ctaSettings?: CtaSettings;
  locations?: Array<{ id: string; location_slug: string; city: string; state: string }>;
}
```

**Required nav items**: Home, About, Policies, Contact (always)
**Conditional nav items**: Blog, FAQ, Glossary, Careers (based on features)

## Footer Props Contract

```typescript
interface FooterProps {
  agencyName?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
  address?: string;
  locationPrefix?: string;
  locationName?: string;
  socialLinks?: { facebook?: string; instagram?: string; linkedin?: string; youtube?: string };
  badges?: Array<{ name: string; icon_class: string }>;
  tagline?: string;
  isMultiLocation?: boolean;
  footerLogoUrl?: string | null;
  allLocations?: Array<LocationData>;
  socialLinksModalData?: SocialLinksModalData;
}
```

## Home Page Components

All home page components are **async server components** that fetch their own data:

```typescript
export default async function HeroSection(): Promise<JSX.Element | null>;
export default async function IntroSection(): Promise<JSX.Element | null>;
export default async function LocationPoliciesSection(): Promise<JSX.Element | null>;
export default async function Testimonials(): Promise<JSX.Element | null>;
export default async function HomeCTA(): Promise<JSX.Element | null>;
export default async function FAQPreview(): Promise<JSX.Element | null>;
export default async function CareersSection(): Promise<JSX.Element | null>;
```

## PolicyPageTemplate Props

```typescript
interface PolicyPageTemplateProps {
  policy: {
    title: string;
    slug: string;
    meta_title?: string;
    meta_description?: string;
    hero_section?: object;
    content_sections?: object;
    faqs?: Array<{ question: string; answer: string }>;
    related_policies?: Array<{ title: string; slug: string }>;
    youtube_url?: string;
    ldjson?: object;
  };
  locationSlug?: string;
}
```

## Rules

1. Component names MUST match exactly (case-sensitive)
2. Props interfaces MUST be compatible with Shell components
3. Return `null` if data is missing (graceful degradation)
4. Use CSS variables for ALL colors (see theme-css-variables skill)
5. Use locationPrefix for ALL navigation links (see theme-routing-patterns skill)
