# HeroSection - Quick Start Guide

## Installation Complete

The HeroSection component has been successfully migrated to Next.js and is ready to use!

## Basic Usage (30 seconds)

```tsx
import { HeroSection } from "@/components/sections/HeroSection";

export default function HomePage() {
  return (
    <HeroSection
      title="Boek de ultieme bruiloft DJ"
      subtitle="Laat uw gasten genieten van een onvergetelijke avond vol energie."
      ctaPrimaryText="Bekijk beschikbaarheid"
      ctaSecondaryText="Vraag offerte aan"
    />
  );
}
```

## With Background Image

```tsx
<HeroSection
  title="DJ + Sax die je dansvloer vult"
  subtitle="Live mashups en realtime setlists."
  ctaPrimaryText="Plan je intake"
  backgroundImage="/assets/marketing-images/weddingDJ/weddingDJ-01.webp"
  backgroundImageAlt="Professional DJ setup"
  titleColor="text-white"
  subtitleColor="text-white/90"
/>
```

## Available Images

Located in `/public/assets/marketing-images/`:
- `weddingDJ/weddingDJ-01.webp` to `weddingDJ-10.webp`
- All optimized and ready to use

## Import Paths

```tsx
// Named import (recommended)
import { HeroSection } from "@/components/sections/HeroSection";

// Or from barrel export
import { HeroSection } from "@/components/sections";

// TypeScript types
import type { HeroSectionProps } from "@/components/sections";
```

## Common Props

| Prop | Type | Required | Example |
|------|------|----------|---------|
| `title` | string | Yes | "Boek nu je DJ" |
| `subtitle` | string | Yes | "Professionele DJ services" |
| `ctaPrimaryText` | string | Yes | "Bekijk beschikbaarheid" |
| `ctaSecondaryText` | string | No | "Vraag offerte aan" |
| `backgroundImage` | string | No | "/assets/hero.webp" |

## More Examples

See `HeroSection.example.tsx` for 6 complete examples.

## Full Documentation

See `README.md` for complete documentation with all props and advanced usage.

## Testing

```bash
npm test components/sections/__tests__/HeroSection.test.tsx
```

## Questions?

Check these files:
1. `README.md` - Full documentation
2. `HeroSection.example.tsx` - Code examples
3. `HERO_SECTION_MIGRATION_SUMMARY.md` - Migration details
