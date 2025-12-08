# Quick Start Guide - Mr. DJ Frontend i18n

## Installation

```bash
cd /srv/apps/mr-djv1/frontend-nextjs
npm install
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:3000`

## Access Your Application

- Dutch (default): `http://localhost:3000/nl`
- English: `http://localhost:3000/en`

## Key Files

### Configuration
- `i18n.config.ts` - Locale configuration (nl, en)
- `middleware.ts` - Automatic locale detection and routing
- `next.config.ts` - Next.js configuration with i18n plugin

### Pages
- `app/[locale]/page.tsx` - Home page
- `app/[locale]/layout.tsx` - Locale-specific layout

### Components
- `components/LocaleSwitcher.tsx` - Language switcher dropdown

### Translations
- `messages/nl.json` - Dutch translations
- `messages/en.json` - English translations

## Using Translations in Components

### Client Component
```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();
  return <h1>{t('hero.title')}</h1>;
}
```

### Server Component
```typescript
import { getMessages } from 'next-intl/server';

export default async function MyComponent() {
  const t = await getMessages();
  return <h1>{t('hero.title')}</h1>;
}
```

## Adding New Pages

Create files in `app/[locale]/` directory:

```
app/[locale]/services/page.tsx
```

Automatically available at:
- `/nl/services`
- `/en/services`

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

Copy and configure `.env.local.example`:
```bash
cp .env.local.example .env.local
```

Edit variables as needed.

## Locale Switcher

The language switcher is a client component that:
- Displays dropdown with language options
- Maintains current page URL structure
- Persists user's choice
- Shows loading state during transition

```typescript
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

export default function Header() {
  return <LocaleSwitcher />;
}
```

## Translation Structure

Translations are organized by feature:
- `app.*` - Application metadata
- `hero.*` - Hero section content
- `eventTypes.*` - Event type options
- `testimonials.*` - Customer testimonials
- `language.*` - Language switcher labels
- `pricing.*` - Pricing information

## URL Structure

### Dutch
- `/nl` - Home
- `/nl/diensten` - Services
- `/nl/boeken` - Booking

### English
- `/en` - Home
- `/en/services` - Services
- `/en/booking` - Booking

Default locale (Dutch) URLs can also be accessed without locale prefix internally.

## Common Tasks

### Add a new translation key
1. Add to `messages/nl.json` and `messages/en.json`
2. Use in component: `t('section.key')`

### Switch languages
Use the `LocaleSwitcher` component or navigate to different locale URLs

### Check current locale
```typescript
import { useLocale } from 'next-intl';
const locale = useLocale(); // 'nl' or 'en'
```

### Validate locale in code
```typescript
import { isValidLocale } from '@/i18n.config';
if (isValidLocale(locale)) {
  // Safe to use
}
```

## For More Information

See `I18N_SETUP.md` for comprehensive documentation.
