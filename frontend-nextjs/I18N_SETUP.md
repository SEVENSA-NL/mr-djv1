# Mr. DJ Frontend - Internationalization (i18n) Setup

This document provides comprehensive information about the i18n configuration for the Mr. DJ Next.js frontend.

## Overview

The Next.js frontend uses **next-intl** for server-side and client-side internationalization. It supports Dutch (nl) and English (en) with Dutch as the default locale.

## Configuration Files

### 1. `i18n.config.ts`
Core configuration file that defines:
- **Supported locales**: `['nl', 'en']`
- **Default locale**: `'nl'` (Dutch)
- **Locale metadata**: Language labels, text direction, hreflang tags
- **Type-safe utilities**: Functions to validate and normalize locale values

**Usage in code:**
```typescript
import { locales, defaultLocale, isValidLocale } from '@/i18n.config';
```

### 2. `middleware.ts`
Handles all locale detection and routing logic:
- **Automatic locale detection**: From URL, headers, or cookies
- **Locale persistence**: Remembers user's language preference in cookies
- **SEO-friendly routing**: Always includes locale prefix (`/nl/...`, `/en/...`)
- **Static asset exclusion**: Prevents processing of images, fonts, etc.

**Matcher pattern:**
- Includes all paths except static files and Next.js internals
- Specifically includes API routes for proper handling

### 3. `next.config.ts`
Next.js configuration with:
- **next-intl plugin**: Initializes i18n in Next.js
- **Image optimization**: Ready for remote images
- **SEO headers**: Locale information in response headers
- **Root redirect**: `/` redirects to `/nl` (default locale)

### 4. `tsconfig.json`
TypeScript configuration with:
- **Path aliases**: `@/` for root, `@/components/`, `@/lib/`, etc.
- **Strict mode**: Enabled for type safety
- **Module resolution**: Bundler mode for modern tooling

## Directory Structure

```
frontend-nextjs/
├── app/
│   ├── layout.tsx              # Root layout (serves all locales)
│   └── [locale]/
│       ├── layout.tsx          # Locale-specific layout with i18n metadata
│       ├── page.tsx            # Home page
│       ├── diensten/           # Services page (Dutch URL)
│       │   └── page.tsx
│       └── boeken/             # Booking page (Dutch URL)
│           └── page.tsx
├── components/
│   └── LocaleSwitcher.tsx      # Language switcher component
├── lib/
│   └── getMessages.ts          # Translation utilities
├── messages/
│   ├── en.json                 # English translations
│   └── nl.json                 # Dutch translations
├── middleware.ts               # Locale routing middleware
├── i18n.config.ts             # i18n configuration
├── next.config.ts             # Next.js configuration
└── package.json               # Dependencies
```

## Translation Files

### Structure
Both `messages/nl.json` and `messages/en.json` follow the same structure:

```json
{
  "app": {
    "title": "...",
    "subtitle": "..."
  },
  "hero": {
    "title": "...",
    "ctaPrimaryText": "..."
  },
  "pricing": {
    "packages": { ... }
  }
}
```

### Supported Keys

#### App Section
- `app.title`: Application title
- `app.subtitle`: Application subtitle
- `app.bookingSectionLabel`: Booking section label

#### Event Types
- `eventTypes.title`: Section title
- `eventTypes.options.bruiloft.label`: "Wedding" / "Bruiloft"
- `eventTypes.options.bedrijfsfeest.*`: Corporate event translations
- `eventTypes.options.verjaardag.*`: Birthday translations
- `eventTypes.options.festival.*`: Festival translations

#### Hero Section
- `hero.title`: Main hero title
- `hero.subtitle`: Hero subtitle
- `hero.badge`: Review badge
- `hero.ctaPrimaryText`: Primary CTA button text
- `hero.ctaSecondaryText`: Secondary CTA button text

#### Testimonials
- `testimonials.title`: Section title
- `testimonials.items[]`: Array of testimonial objects

#### Language Switcher
- `language.label`: "Language" / "Taal"
- `language.options.nl`: "Dutch" / "Nederlands"
- `language.options.en`: "English" / "Engels"

#### Pricing
- `pricing.hero.*`: Pricing hero section
- `pricing.packages.*`: Package definitions
- `pricing.calculator.*`: Price calculator translations
- `pricing.includes.*`: Feature descriptions

## Using Translations

### In Server Components
```typescript
import { getMessages } from 'next-intl/server';

export default async function Page() {
  const t = await getMessages();
  return <h1>{t('hero.title')}</h1>;
}
```

### In Client Components
```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations();
  return <h1>{t('hero.title')}</h1>;
}
```

### Accessing Locale Info
```typescript
import { useLocale } from 'next-intl';

export default function Component() {
  const locale = useLocale(); // 'nl' or 'en'
  return <div>Current locale: {locale}</div>;
}
```

## URL Structure

### Dutch (Default)
- `/nl` - Home page
- `/nl/diensten` - Services page
- `/nl/boeken` - Booking page
- `/nl/pricing` - Pricing page

### English
- `/en` - Home page
- `/en/services` - Services page (would require separate page)
- `/en/booking` - Booking page (would require separate page)
- `/en/pricing` - Pricing page

## Locale Switching

The `LocaleSwitcher` component provides a dropdown to change languages. Features:
- Maintains current page structure in new locale
- Shows loading state during transition
- Persists user's choice via cookies
- Type-safe locale handling

**Usage:**
```typescript
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

export default function Header() {
  return (
    <header>
      <LocaleSwitcher />
    </header>
  );
}
```

## Adding New Routes

To add a new page with locale support:

1. Create the page file in `app/[locale]/` directory:
   ```
   app/[locale]/new-page/page.tsx
   ```

2. The page will automatically be available at:
   - `/nl/new-page`
   - `/en/new-page`

3. Use translations in the page:
   ```typescript
   'use client';
   import { useTranslations } from 'next-intl';

   export default function NewPage() {
     const t = useTranslations('newSection');
     return <h1>{t('title')}</h1>;
   }
   ```

## Adding New Translations

1. Add keys to both `messages/en.json` and `messages/nl.json`:
   ```json
   {
     "newSection": {
       "title": "English Title",
       "description": "English Description"
     }
   }
   ```

2. Use in components:
   ```typescript
   const t = useTranslations();
   t('newSection.title')
   ```

## SEO Considerations

### Canonical URLs
Each page has a canonical URL in its locale:
```html
<link rel="canonical" href="https://mister-dj.com/nl/page" />
```

### Alternate Links
Pages include alternate language links:
```html
<link rel="alternate" hreflang="nl" href="https://mister-dj.com/nl/page" />
<link rel="alternate" hreflang="en" href="https://mister-dj.com/en/page" />
```

### HTML Language Attribute
Each page sets the correct language:
```html
<html lang="nl">
</html>
```

## Deployment

### Environment Variables
Copy `.env.local.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_APP_NAME=Mister DJ
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

### Build
```bash
npm run build
```

### Start
```bash
npm start
```

## Type Safety

The setup is fully type-safe:
- Locale validation with `isValidLocale()`
- Translation key autocomplete in IDEs
- Route type safety with Next.js App Router
- TypeScript strict mode enabled

## Performance

- Static generation for all locale pages
- Middleware for efficient routing
- Minimal bundle size with next-intl
- Zero JavaScript translation loading (server-rendered)

## Migration from Vite

This setup replaces the previous Vite-based frontend. Key changes:

| Aspect | Vite | Next.js |
|--------|------|---------|
| Build tool | Vite | Next.js (Turbopack) |
| i18n library | react-i18next | next-intl |
| Routing | React Router | Next.js App Router |
| SSR | Manual | Built-in |
| Translation keys | Same structure | Same structure |

Translation keys remain compatible for easier migration.

## Troubleshooting

### Locale not detected correctly
- Check browser language settings
- Clear cookies for the domain
- Verify middleware configuration

### Translations not showing
- Verify translation key exists in both JSON files
- Check component is using correct scope with `useTranslations()`
- Ensure JSON syntax is valid

### Page not found for locale
- Verify locale is in `locales` array in `i18n.config.ts`
- Check page exists in `app/[locale]/` directory
- Restart dev server

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n-routing)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Web Internationalization Standards](https://www.w3.org/International/questions/qa-what-is-encoding)
