# Mister DJ - Next.js Frontend

Next.js 14 migration van de Mister DJ frontend applicatie.

## Vereisten

- Node.js 20.x
- npm

## Aan de slag

### Installatie

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

### Build

```bash
npm run build
```

### Productie

```bash
npm start
```

## Projectstructuur

```
src/
├── app/                    # Next.js App Router paginas
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home pagina
│   ├── not-found.tsx      # 404 pagina
│   └── error.tsx          # Foutpagina
├── components/            # React componenten
│   ├── atoms/             # Kleine herbruikbare componenten
│   ├── molecules/         # Combinaties van componenten
│   └── organisms/         # Complexe componenten
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functies
├── types/                 # TypeScript definities
├── utils/                 # Algemene utilities
├── constants/             # Applicatie constanten
└── styles/                # Globale styles
public/                    # Statische bestanden
```

## Technologie Stack

- **Framework**: Next.js 14.2.0
- **Taal**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.14
- **Node**: 20.x

## Design Systeem

### Kleuren
- Primary: #00AEEF (Mister DJ Blauw)
- Primary Dark: #0096D6
- Secondary: #D4AF37 (Goud)
- Neutral Dark: #1A2C4B

### Typografie
- Sans: Montserrat, Inter
- Serif: Playfair Display

## Configuratie

### TypeScript
Strict mode is ingeschakeld.

### Environment Variabelen
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Production server
- `npm run lint` - ESLint
- `npm run type-check` - TypeScript check
- `npm run format` - Code formatting

## Best Practices

1. Kleine, gefocuste componenten
2. Proper TypeScript typing
3. Beschrijvende namen
4. Folderstructuur volgen
5. Next.js Image component gebruiken
6. SEO metadata toevoegen

## Migratie Opmerkingen

Dit is een migratie van Vite naar Next.js:
- Gebruikt App Router
- Built-in Image optimisatie
- Server Components standaard
- Geïntegreerde API routes
- Beter SEO out-of-the-box
