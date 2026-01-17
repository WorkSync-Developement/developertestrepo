---
name: theme-css-variables
description: All theme colors MUST use CSS variables. Never hardcode hex values. This ensures admin color controls work across all themes.
---

# Theme CSS Variables (Hard Constraints)

## Critical Rule

**ALL colors in theme components MUST use CSS variables.**

```tsx
// ✅ CORRECT
<div className="bg-primary text-primary-foreground">
<h1 style={{ color: 'var(--color-text-primary)' }}>Title</h1>

// ❌ WRONG - NEVER DO THIS
<div style={{ backgroundColor: '#1e3a5f' }}>
<h1 style={{ color: '#ffffff' }}>Title</h1>
```

## Available CSS Variables

### Primary Colors
- `--color-primary` — Main brand color
- `--color-primary-foreground` — Text on primary

### Accent Colors (CTAs, highlights)
- `--color-accent` — CTA/button color
- `--color-accent-foreground` — Text on accent

### Secondary Colors (badges, subtle)
- `--color-secondary` — Badges, icons
- `--color-secondary-foreground` — Text on secondary

### Backgrounds
- `--color-background` — Section backgrounds
- `--color-background-alt` — Card/content backgrounds

### Text
- `--color-text-primary` — Headings
- `--color-text-body` — Body text
- `--color-text-muted` — Captions, hints

### Dividers
- `--divider-color`
- `--divider-thickness`
- `--divider-style`

### Typography
- `--font-heading`
- `--font-body`
- `--font-accent`
- `--heading-weight`
- `--body-weight`

### Navbar
- `--navbar-bg-color`
- `--navbar-bg-opacity`
- `--navbar-text-color`
- `--navbar-text-hover-color`

### CTA Buttons
- `--cta-bg-color`
- `--cta-text-color`
- `--cta-hover-bg-color`
- `--cta-border-radius`

### Cards
- `--color-card-bg`
- `--color-card-border`
- `--color-card-text-primary`
- `--color-card-text-secondary`

### Footer
- `--footer-bg`
- `--footer-text`
- `--footer-text-secondary`

### Location/Policies Section
- `--loc-section-bg`
- `--loc-badge-bg`
- `--loc-badge-text`
- `--loc-heading`
- `--loc-card-bg`
- `--loc-button-bg`
- `--loc-button-text`

## Tailwind Classes Mapped to CSS Variables

| Class | Maps To |
|-------|---------|
| `bg-primary` | `var(--color-primary)` |
| `text-primary` | `var(--color-primary)` |
| `bg-accent` | `var(--color-accent)` |
| `text-accent` | `var(--color-accent)` |
| `bg-secondary` | `var(--color-secondary)` |
| `bg-theme-bg` | `var(--color-background)` |
| `bg-theme-bg-alt` | `var(--color-background-alt)` |
| `text-theme-text` | `var(--color-text-primary)` |
| `text-theme-body` | `var(--color-text-body)` |
| `text-theme-muted` | `var(--color-text-muted)` |

## Theme Flow

1. Database → `client_theme_settings` table
2. Server → `getThemeSettings()` fetches theme
3. Transform → `themeToCssVars()` converts to CSS properties
4. Inject → `ThemeProvider` applies to `:root`
5. Components → Use CSS vars via Tailwind or inline styles

## Fallback Behavior

If a CSS variable is not set in database, it falls back to defaults in `lib/theme/defaults.ts`.

## Rules

1. NEVER hardcode hex color values in theme components
2. ALWAYS use CSS variables or mapped Tailwind classes
3. Test with different color schemes to verify variables work
4. Check that theme changes in admin UI reflect in components
