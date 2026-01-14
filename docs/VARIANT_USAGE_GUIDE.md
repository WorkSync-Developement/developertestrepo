# Dynamic Variant Usage Guide

Complete guide on how to use template variants dynamically in your Next.js application.

## 🎯 Quick Start

### 1. Set Variant in Database

```sql
-- Switch to any variant: 'coastal', 'modern', 'minimal', 'bold', 'classic'
UPDATE client_theme_settings 
SET template_variant = 'modern'
WHERE client_id = 'your-client-id';
```

### 2. The Variant Automatically Loads!

That's it! The system automatically:
- ✅ Reads the `template_variant` from database
- ✅ Dynamically imports the correct variant components
- ✅ Falls back to 'coastal' if variant not found
- ✅ Caches the result per request for performance

---

## 📚 How It Works

### Architecture

```
┌─────────────────────────────────────┐
│  Database (client_theme_settings)   │
│  template_variant = 'modern'        │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│  lib/variants/index.ts              │
│  getTemplateVariant() → 'modern'    │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│  getVariantComponent('Header')      │
│  Dynamically imports:               │
│  @/components/variants/modern/      │
│  layout/Header                      │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│  Component renders with props       │
└─────────────────────────────────────┘
```

### Key Functions

#### `getTemplateVariant()`
Fetches the current variant from database (cached per request).

```typescript
import { getTemplateVariant } from '@/lib/variants';

const variant = await getTemplateVariant();
// Returns: 'coastal' | 'modern' | 'minimal' | 'bold' | 'classic'
```

#### `getVariantComponent(componentName)`
Dynamically imports a component from the active variant.

```typescript
import { getVariantComponent } from '@/lib/variants';

const Header = await getVariantComponent('Header');
return <Header {...props} />;
```

---

## 🔨 Implementation Examples

### Example 1: Update HeaderShell (Recommended)

Update `components/layout/HeaderShell.tsx` to use variants:

```typescript
import { getVariantComponent } from '@/lib/variants';
import { getClientData } from '@/lib/client';
import { getFeatures, isMultiLocation, getAllWebsites } from '@/lib/website';
import { getThemeSettings } from '@/lib/theme';

interface HeaderShellProps {
  locationPrefix?: string;
}

export default async function HeaderShell({ locationPrefix }: HeaderShellProps) {
  // Dynamically get the Header component based on variant
  const Header = await getVariantComponent('Header');
  
  const slug = locationPrefix?.startsWith('/locations/') 
    ? locationPrefix.replace('/locations/', '') 
    : undefined;

  const [clientData, features, theme, isMultiLoc, locations] = await Promise.all([
    getClientData(),
    getFeatures(slug),
    getThemeSettings(),
    isMultiLocation(),
    getAllWebsites()
  ]);

  const websiteName = clientData?.agency_name;
  const mergedFeatures = features 
    ? { ...features, multi_location: isMultiLoc }
    : { multi_location: isMultiLoc };

  return (
    <Header
      websiteName={websiteName}
      phone={clientData?.phone}
      locationPrefix={locationPrefix}
      logoUrl={theme?.fav_icon_url}
      showSiteName={theme?.show_client_site_name ?? true}
      features={mergedFeatures}
      navbarSettings={theme?.navbar_settings}
      ctaSettings={theme?.cta_settings}
      locations={isMultiLoc ? locations : undefined}
    />
  );
}
```

### Example 2: Use in Home Page

Update `app/(home)/page.tsx`:

```typescript
import { getVariantComponent } from '@/lib/variants';

export default async function HomePage() {
  // Dynamically load all variant components
  const HeroSection = await getVariantComponent('HeroSection');
  const IntroSection = await getVariantComponent('IntroSection');
  const LocationPoliciesSection = await getVariantComponent('LocationPoliciesSection');
  const Testimonials = await getVariantComponent('Testimonials');
  const HomeCTA = await getVariantComponent('HomeCTA');
  const FAQPreview = await getVariantComponent('FAQPreview');
  const CareersSection = await getVariantComponent('CareersSection');

  return (
    <>
      <HeroSection />
      <IntroSection />
      <LocationPoliciesSection />
      <Testimonials />
      <HomeCTA />
      <FAQPreview />
      <CareersSection />
    </>
  );
}
```

### Example 3: Use in Policy Page

```typescript
import { getVariantComponent } from '@/lib/variants';
import { getPolicyBySlug } from '@/lib/policies';

export default async function PolicyPage({ params }: { params: { slug: string } }) {
  const PolicyPageTemplate = await getVariantComponent('PolicyPageTemplate');
  const policy = await getPolicyBySlug(params.slug);

  if (!policy) {
    return <div>Policy not found</div>;
  }

  return <PolicyPageTemplate policy={policy} />;
}
```

### Example 4: Wrapper Pattern with Variant

For components that need data fetching before rendering:

```typescript
import { getVariantComponent } from '@/lib/variants';
import { getTestimonialsData } from '@/lib/data';

export default async function TestimonialsWrapper() {
  // Load variant component
  const Testimonials = await getVariantComponent('Testimonials');
  
  // Fetch data
  const data = await getTestimonialsData();
  
  if (!data) return null;
  
  // Render variant with data
  return <Testimonials data={data} />;
}
```

---

## 🎨 Available Components

All variants support these components:

| Component Name | Usage | Location |
|----------------|-------|----------|
| `Header` | Navigation header | Layout |
| `Footer` | Site footer | Layout |
| `HeroSection` | Hero banner | Home |
| `IntroSection` | About section | Home |
| `LocationPoliciesSection` | Locations/Policies grid | Home |
| `Testimonials` | Customer reviews | Home |
| `HomeCTA` | Call-to-action | Home |
| `FAQPreview` | FAQ preview | Home |
| `CareersSection` | Careers section | Home |
| `PolicyPageTemplate` | Policy detail page | Policies |

### Adding New Components

To add a new component to the variant system:

1. **Update type definition** in `lib/variants/index.ts`:
```typescript
export type VariantComponentName = 
  | 'Header'
  | 'Footer'
  | 'YourNewComponent' // Add here
  // ...
```

2. **Add path mapping**:
```typescript
const componentPaths: Record<VariantComponentName, string> = {
  // ...
  YourNewComponent: 'home/YourNewComponent',
};
```

3. **Create component in all variants**:
```
components/variants/
├── coastal/home/YourNewComponent.tsx
├── modern/home/YourNewComponent.tsx
├── minimal/home/YourNewComponent.tsx
└── ... (bold and classic extend modern)
```

4. **Export from variant index**:
```typescript
// components/variants/coastal/index.ts
export { default as YourNewComponent } from './home/YourNewComponent';
```

---

## ⚙️ Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_CLIENT_ID=your-client-uuid
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Database Setup

Ensure your `client_theme_settings` table has the variant field:

```sql
ALTER TABLE client_theme_settings 
ADD COLUMN IF NOT EXISTS template_variant VARCHAR(50) 
DEFAULT 'coastal' 
CHECK (template_variant IN ('coastal', 'modern', 'minimal', 'bold', 'classic'));
```

---

## 🔍 Testing Variants

### Test All Variants Locally

```typescript
// scripts/test-variants.ts
import { validateVariant } from '@/lib/variants';

async function testAllVariants() {
  const variants = ['coastal', 'modern', 'minimal', 'bold', 'classic'];
  
  for (const variant of variants) {
    const result = await validateVariant(variant as any);
    console.log(`${variant}: ${result.valid ? '✅' : '❌'}`);
    if (!result.valid) {
      console.log(`  Missing: ${result.missing.join(', ')}`);
    }
  }
}

testAllVariants();
```

### Switch Variants in Development

```bash
# Update database
psql $DATABASE_URL << EOF
UPDATE client_theme_settings 
SET template_variant = 'modern'
WHERE client_id = '$YOUR_CLIENT_ID';
EOF

# Restart dev server
npm run dev
```

---

## 🎯 Best Practices

### 1. Use Shell Components

Create "Shell" components that handle data fetching and pass to variants:

```typescript
// components/layout/HeaderShell.tsx
export default async function HeaderShell(props) {
  const Header = await getVariantComponent('Header');
  const data = await fetchData();
  return <Header {...data} {...props} />;
}
```

### 2. Type Safety

Always use the `VariantComponentName` type:

```typescript
import { getVariantComponent, type VariantComponentName } from '@/lib/variants';

async function loadComponent(name: VariantComponentName) {
  return await getVariantComponent(name);
}
```

### 3. Error Handling

The system automatically falls back to 'coastal' if a variant fails to load. Check logs for warnings:

```
[Variants] Component "Header" not found in variant "modern", falling back to "coastal"
```

### 4. Performance

- `getTemplateVariant()` is cached per request
- Components are code-split automatically
- Only the active variant is loaded

---

## 🐛 Troubleshooting

### Issue: Variant not loading

**Check:**
1. Database has correct variant name
2. NEXT_PUBLIC_CLIENT_ID is set
3. Component exists in variant folder
4. Component is exported from variant index.ts

```bash
# Verify variant in database
psql $DATABASE_URL -c "SELECT template_variant FROM client_theme_settings WHERE client_id = '$CLIENT_ID';"

# Check files exist
ls -la components/variants/modern/layout/Header.tsx
```

### Issue: "Component not found" error

**Solution:** The variant is missing that component. Either:
- Create the component in that variant
- Ensure it's exported from the variant's index.ts
- System will fall back to 'coastal' automatically

### Issue: Props mismatch

**Solution:** All variants must accept the same props interface. Check:
```typescript
// All Header components must accept HeaderProps
interface HeaderProps {
  websiteName?: string;
  phone?: string;
  // ... same props across all variants
}
```

---

## 📊 Performance Considerations

### Code Splitting

Each variant is automatically code-split:

```javascript
// Only the active variant is loaded
await import(`@/components/variants/${variant}/layout/Header`);
```

### Caching

```typescript
// Cached per request - only fetches once
export const getTemplateVariant = cache(async () => {
  // Database call cached here
});
```

### Bundle Size

- **Full variants** (coastal, modern, minimal): ~15 components each
- **Extending variants** (bold, classic): Reuse modern components (no duplication)

---

## 🚀 Deployment

### Build Time

```bash
# All variants are built and tree-shaken
npm run build

# Only used variants are included in final bundle
```

### Runtime

1. User requests page
2. Server fetches `template_variant` from database (cached)
3. Server dynamically imports variant component
4. Component renders and returns to client
5. Client receives fully rendered HTML

---

## 📖 Additional Resources

- **Specification**: See `/docs/TEMPLATE_VARIANT_SPECIFICATION.md`
- **Variant Details**: See `/components/variants/VARIANTS_SUMMARY.md`
- **Theme System**: See `/lib/theme/README.md`

---

## ✅ Checklist

Before deploying with variants:

- [ ] Database has `template_variant` column
- [ ] All variants have required components
- [ ] Components export correct prop interfaces
- [ ] Environment variables set
- [ ] HeaderShell/FooterShell use `getVariantComponent()`
- [ ] Pages use `getVariantComponent()` for variant components
- [ ] Test all 5 variants locally
- [ ] Run `npm run build` successfully

---

## 🎉 You're Ready!

The variant system is now fully configured and ready to use. Simply update the database to switch between variants instantly.

**No code changes needed** - just update `template_variant` in the database!
