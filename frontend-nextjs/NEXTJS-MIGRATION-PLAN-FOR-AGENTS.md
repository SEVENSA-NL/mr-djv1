# Next.js Migratie Plan - Instructies voor Agents

## Huidige Staat: BUILD FAILS

De huidige Next.js codebase compileert **NIET**. Er zijn kritieke structurele fouten.

---

## FASE 1: FIX TSCONFIG (KRITIEK - MOET EERST)

### Probleem
`tsconfig.json` verwijst naar `./src/*` maar de app bestanden staan in de root (`./app/`, `./components/`, `./lib/`).

### Taak 1.1: Fix tsconfig.json paths
**Bestand:** `/srv/apps/mr-djv1/frontend-nextjs/tsconfig.json`

Vervang de "paths" sectie met:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/app/*": ["./app/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/types/*": ["./types/*"],
      "@/styles/*": ["./styles/*"]
    }
  },
  "include": [".", "next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", ".next"]
}
```

---

## FASE 2: MAAK ONTBREKENDE COMPONENTEN

### Taak 2.1: Maak Breadcrumbs component
**Bestand:** `/srv/apps/mr-djv1/frontend-nextjs/components/shared/Breadcrumbs.tsx`

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbsProps {
  customLabels?: Record<string, string>;
}

export default function Breadcrumbs({ customLabels = {} }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Remove locale prefix
  const pathWithoutLocale = pathname.replace(/^\/(nl|en)/, '');
  const segments = pathWithoutLocale.split('/').filter(Boolean);

  const defaultLabels: Record<string, string> = {
    'diensten': 'Diensten',
    'pakketten': 'Pakketten',
    'steden': 'Steden',
    'contact': 'Contact',
    'bruiloft-dj': 'Bruiloft DJ',
    'bedrijfsfeest-dj': 'Bedrijfsfeest DJ',
    'feest-dj': 'Feest DJ',
    ...customLabels,
  };

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <li>
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          const label = defaultLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

          return (
            <li key={href} className="flex items-center gap-2">
              <span className="text-slate-400">/</span>
              {isLast ? (
                <span className="font-medium text-slate-900">{label}</span>
              ) : (
                <Link href={href} className="hover:text-amber-600 transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

### Taak 2.2: Verplaats structuredData naar juiste locatie
**Bestand:** `/srv/apps/mr-djv1/frontend-nextjs/lib/seo/structuredData.ts` bestaat al.
Controleer of dit bestand correct is en exporteert `createServiceStructuredData`.

---

## FASE 3: VERWIJDER DUPLICATE SRC DIRECTORY

De `src/` directory conflicteert met de root-level `app/` directory.

### Taak 3.1: Verwijder of integreer src/
```bash
# Backup eerst
cp -r /srv/apps/mr-djv1/frontend-nextjs/src /srv/apps/mr-djv1/frontend-nextjs/src-backup

# Controleer wat in src/ zit en integreer in root als nodig
# Verwijder daarna src/
rm -rf /srv/apps/mr-djv1/frontend-nextjs/src
```

---

## FASE 4: VOEG ONTBREKENDE COMPONENTEN TOE UIT VITE PROJECT

### Referentie bestanden in Vite frontend:
- `/srv/apps/mr-djv1/frontend/src/components/` - alle originele componenten
- `/srv/apps/mr-djv1/frontend/src/lib/` - utilities
- `/srv/apps/mr-djv1/frontend/src/config/` - configuratie

### Taak 4.1: Migreer WhatsAppButton
Het bestand bestaat al in `/srv/apps/mr-djv1/frontend-nextjs/components/shared/WhatsAppButton.tsx`
Controleer of alle props correct werken (variant, messageType, label).

### Taak 4.2: Kopieer ontbrekende UI componenten
Kopieer de volgende componenten van Vite naar Next.js en pas imports aan:
- Header/Navigation
- Footer
- ContactForm
- PricingCards
- TestimonialCards
- ImageGallery

---

## FASE 5: FIX NEXT.JS CONFIG

### Taak 5.1: Fix next.config.ts
**Bestand:** `/srv/apps/mr-djv1/frontend-nextjs/next.config.ts`

```typescript
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.config.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mr-dj.sevensa.nl',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
};

export default withNextIntl(nextConfig);
```

---

## FASE 6: VOEG STYLING TOE

### Taak 6.1: Maak globals.css
**Bestand:** `/srv/apps/mr-djv1/frontend-nextjs/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-amber: #f59e0b;
  --primary-amber-dark: #d97706;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
}
```

### Taak 6.2: Update app/layout.tsx om globals.css te importeren
```tsx
import './globals.css';
```

---

## FASE 7: TEST BUILD

Na elke fase:
```bash
cd /srv/apps/mr-djv1/frontend-nextjs
npm run build
```

Noteer alle errors en fix ze systematisch.

---

## VERIFICATIE CHECKLIST

- [ ] `npm run build` slaagt zonder errors
- [ ] Alle pages laden correct
- [ ] Breadcrumbs werken op service pages
- [ ] WhatsAppButton functioneert
- [ ] Images laden via next/image
- [ ] i18n werkt (Nederlands/Engels)
- [ ] Mobile responsive layout werkt

---

## PRIORITEIT VOLGORDE

1. **KRITIEK**: Fix tsconfig.json paths (FASE 1)
2. **KRITIEK**: Maak Breadcrumbs component (FASE 2)
3. **KRITIEK**: Verwijder src/ conflict (FASE 3)
4. **MEDIUM**: Migreer componenten (FASE 4)
5. **MEDIUM**: Fix config (FASE 5)
6. **LOW**: Styling (FASE 6)

---

## NOTES VOOR AGENTS

- Lees ALTIJD het bestand voordat je het wijzigt
- Test na elke wijziging met `npm run build`
- Als een import faalt, controleer het exacte pad
- Next.js App Router gebruikt 'use client' directive voor client components
- Alle page.tsx bestanden zijn standaard Server Components
