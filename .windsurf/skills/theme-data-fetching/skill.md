---
name: theme-data-fetching
description: Data fetching patterns for theme components. Use existing fetchers. Server components fetch their own data.
---

# Theme Data Fetching Patterns (Hard Constraints)

## Server Components (Recommended)

Most theme components should be async server components that fetch their own data:

```typescript
import { supabase } from '@/lib/supabase';

export default async function MySection() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  
  const { data, error } = await supabase
    .from('table_name')
    .select('*')
    .eq('client_id', clientId)
    .maybeSingle();
    
  if (!data) return null;
  
  return <section>...</section>;
}
```

## Existing Data Fetchers (USE THESE)

Import from `/lib/`:

```typescript
import { getClientData } from '@/lib/client';
import { isMultiLocation, getWebsiteData } from '@/lib/website';
import { getThemeSettings } from '@/lib/theme';
```

## Shell + Variant Pattern

**Shell components** (server) handle:
- Data fetching from Supabase
- Passing standardized props to theme components

**Theme components** (can be client or server) handle:
- Visual layout and styling
- Animations and interactions
- Responsive design

## Wrapper Pattern

For complex data needs, use Wrapper pattern:

```typescript
// FAQPreviewWrapper.tsx (Server Component)
export default async function FAQPreviewWrapper() {
  const content = await getCommonQuestionsSection();
  if (!content) return null;
  return <FAQPreview faqContent={content} />;
}

// FAQPreview.tsx (Presentation Component)
export function FAQPreview({ faqContent }: FAQPreviewProps) {
  // Render UI with faqContent
}
```

## Client Components

If you need interactivity, mark with `'use client'` and receive data via props:

```typescript
'use client';

interface MyComponentProps {
  data: SomeType;
}

export default function MyComponent({ data }: MyComponentProps) {
  const [state, setState] = useState();
  // ...
}
```

## Key Tables

| Table | Purpose |
|-------|---------|
| `client_theme_settings` | Theme colors, fonts, settings |
| `client_home_page` | Hero, intro, CTA section content |
| `client_websites` | Feature flags, website config |
| `client_policy_pages` | Policy page content |
| `client_locations` | Location data |
| `client_location_page` | Location-specific page content |

## Rules

1. Use existing data fetchers from `/lib/` when available
2. Server components fetch their own data
3. Client components receive data via props
4. Return `null` if data is missing (graceful degradation)
5. Use `maybeSingle()` for optional single records
6. Always filter by `client_id` from `process.env.NEXT_PUBLIC_CLIENT_ID`
