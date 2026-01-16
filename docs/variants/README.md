# Template Variants Overview

Complete documentation for all 3 template variants.

## 📚 Variant Documentation

- [Coastal Variant](./coastal.md) - Default/original template (⭐ default) - [Screenshot](./screenshots-variants/coastal-variant.png)
- [Modern Variant](./modern.md) - Contemporary design - [Screenshot](./screenshots-variants/modern-variant.png)
- [Minimal Variant](./minimal.md) - Minimalist aesthetic - [Screenshot](./screenshots-variants/minimal-variant.png)

## 📊 Quick Comparison

| Variant | Implementation | Style | Best For |
|---------|---------------|-------|----------|
| **Coastal** | 14 components | Ocean-inspired, balanced | Default choice, coastal agencies |
| **Modern** | 14 components | Clean, contemporary | Forward-thinking brands |
| **Minimal** | 14 components | Ultra-minimalist | Sophisticated clients |

## 🚀 Usage

See [VARIANT_USAGE_GUIDE.md](../VARIANT_USAGE_GUIDE.md) for complete implementation details.

### Quick Start

```typescript
import { getVariantComponent } from '@/lib/variants';

const Header = await getVariantComponent('Header');
return <Header {...props} />;
```

### Switch Variants

```sql
UPDATE client_theme_settings 
SET template_variant = 'modern'  -- or 'coastal', 'minimal'
WHERE client_id = 'your-client-id';
```

## 📁 File Structure

```
components/variants/
├── coastal/      # 14 files - Full implementation (DEFAULT)
├── modern/       # 14 files - Full implementation
└── minimal/      # 14 files - Full implementation

docs/variants/
├── README.md     # This file
├── coastal.md    # Coastal variant docs
├── modern.md     # Modern variant docs
└── minimal.md    # Minimal variant docs
```

## 🔧 System Files

- **Variant Resolver**: `/lib/variants/index.ts`
- **Usage Guide**: `/docs/VARIANT_USAGE_GUIDE.md`
- **Spec**: `/docs/TEMPLATE_VARIANT_SPECIFICATION.md`
- **Examples**: `/docs/VARIANT_IMPLEMENTATION_EXAMPLES.md`

## Version

v1.0.0 - Complete 5-variant system
