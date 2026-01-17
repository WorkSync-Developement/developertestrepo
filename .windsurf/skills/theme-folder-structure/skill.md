---
name: theme-folder-structure
description: Required folder structure and naming conventions for theme implementations.
---

# Theme Folder Structure (Hard Constraints)

## Required Structure

```
components/
├── themes/
│   ├── {theme-name}/              # e.g., "service-pro"
│   │   ├── index.ts               # Exports all theme components
│   │   ├── README.md              # Theme documentation
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── IntroSection.tsx
│   │   │   ├── LocationPoliciesSection.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── HomeCTA.tsx
│   │   │   ├── FAQPreview.tsx
│   │   │   ├── CareersSection.tsx
│   │   │   └── FloatingCTA.tsx    # Optional
│   │   ├── policies/
│   │   │   └── PolicyPageTemplate.tsx
│   │   └── location/              # Optional
│   │       ├── LocationFeaturedPolicies.tsx
│   │       ├── LocationCareersSection.tsx
│   │       └── LocationFAQSection.tsx
```

## Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Theme folder | lowercase, hyphenated | `service-pro`, `bold-dark` |
| Component files | PascalCase | `HeroSection.tsx` |
| Export names | PascalCase, match file | `export { default as HeroSection }` |

## Required index.ts

Every theme MUST have an `index.ts` that exports all components:

```typescript
// components/themes/{theme-name}/index.ts

export { default as Header } from './layout/Header';
export { default as Footer } from './layout/Footer';
export { default as HeroSection } from './home/HeroSection';
export { default as IntroSection } from './home/IntroSection';
export { default as LocationPoliciesSection } from './home/LocationPoliciesSection';
export { default as Testimonials } from './home/Testimonials';
export { default as HomeCTA } from './home/HomeCTA';
export { default as FAQPreview } from './home/FAQPreview';
export { default as CareersSection } from './home/CareersSection';
export { default as PolicyPageTemplate } from './policies/PolicyPageTemplate';

// Optional
export { default as FloatingCTA } from './home/FloatingCTA';
```

## Required README.md

Each theme should include documentation:

```markdown
# {Theme Name}

## Design Philosophy
[Describe the visual style]

## Key Features
- Feature 1
- Feature 2

## Screenshots
[Include screenshots of key pages]

## Dependencies
[List any additional npm packages needed]
```

## Theme Resolver

The theme resolver in `lib/themes/index.ts` dynamically imports components:

```typescript
// Dynamic import based on theme
switch (theme) {
  case 'service-pro':
    return import(`@/components/themes/service-pro/${path}`);
  case 'service-bold':
    return import(`@/components/themes/service-bold/${path}`);
  // ...
}
```

## Rules

1. Theme folder name MUST match the database value exactly
2. Component names MUST match the contracts (case-sensitive)
3. All required components MUST be exported from `index.ts`
4. Missing components will cause build/runtime errors
5. Use the theme resolver — never import theme components directly
