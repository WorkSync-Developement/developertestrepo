---
name: theme-routing-patterns
description: Navigation and routing rules for theme components. Always use locationPrefix. Never hardcode routes.
---

# Theme Routing Patterns (Hard Constraints)

## Critical Rule

**NEVER hardcode routes. ALWAYS use the locationPrefix prop.**

```typescript
// ✅ CORRECT
<Link href={`${locationPrefix}/policies`}>Policies</Link>
<Link href={locationPrefix ? locationPrefix : '/'}>Home</Link>

// ❌ WRONG
<Link href="/policies">Policies</Link>  // Breaks on location pages
<Link href="/locations/houston/policies">Policies</Link>  // Hardcoded
```

## locationPrefix Behavior

- **Home/single-location**: `locationPrefix = undefined` or `""`
- **Multi-location pages**: `locationPrefix = "/locations/houston"`

## Navigation Link Patterns

| Link | Pattern |
|------|---------|
| Home | `locationPrefix ? locationPrefix : '/'` |
| About | `${locationPrefix \|\| ''}/about` |
| Policies | `${locationPrefix \|\| ''}/policies` |
| Contact | `${locationPrefix \|\| ''}/contact` |
| Blog | `${locationPrefix \|\| ''}/blog` |
| FAQ | `${locationPrefix \|\| ''}/faq` |
| Glossary | `${locationPrefix \|\| ''}/glossary` |
| Careers | `${locationPrefix \|\| ''}/apply` |

## Policy Detail Links

```typescript
// Single location or home:
`/policies/${policyType}/${policySlug}`
// e.g., /policies/personal-insurance/auto-insurance

// Multi-location:
`/locations/${locationSlug}/policies/${policySlug}`
// e.g., /locations/houston/policies/auto-insurance
```

## Route Structure (Fixed — Do NOT Modify)

### Home Routes
| Route | Components |
|-------|------------|
| `/` | HeroSection, IntroSection, LocationPoliciesSection, Testimonials, HomeCTA, FAQPreview, CareersSection |
| `/about` | (shared) |
| `/contact` | (shared) |
| `/policies` | (shared) |
| `/policies/[type]/[slug]` | PolicyPageTemplate |
| `/blog` | (shared, if enabled) |
| `/faq` | (shared, if enabled) |
| `/glossary` | (shared, if enabled) |
| `/apply` | (shared, if enabled) |

### Multi-Location Routes
| Route | Components |
|-------|------------|
| `/locations/[slug]` | LocationFeaturedPolicies, LocationCareersSection, LocationFAQSection |
| `/locations/[slug]/about` | (shared) |
| `/locations/[slug]/contact` | (shared) |
| `/locations/[slug]/policies` | (shared) |
| `/locations/[slug]/policies/[policy-slug]` | PolicyPageTemplate |

## Rules

1. Routes are defined in `/app/` — themes do NOT modify routes
2. Themes only provide components that render on these routes
3. Header and Footer receive `locationPrefix` prop — use it for ALL links
4. Check `isMultiLocation()` to determine which mode to render
5. Policy links must include the correct policy type in the path
