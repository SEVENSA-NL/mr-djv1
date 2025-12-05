# HeroSection Component

## Overview

The `HeroSection` component is a Next.js Server Component designed for creating impactful hero sections with optional background images, customizable colors, and call-to-action buttons.

## Migration from Vite/React

This component has been migrated from the original Vite/React implementation (`/srv/apps/mr-djv1/frontend/src/components/HeroSection.tsx`) to a Next.js-compatible version with the following improvements:

### Key Changes

1. **Next.js Image Optimization**: Replaced standard `<img>` tags with Next.js `<Image>` component for automatic image optimization
2. **Server Component by Default**: No `'use client'` directive needed unless you add interactive features
3. **Background Image Support**: Added optional background image with overlay for better text readability
4. **Enhanced Props**: Added `backgroundImage`, `backgroundImageAlt`, `ctaPrimaryHref`, and `ctaSecondaryHref` props
5. **TypeScript**: Full type safety maintained with comprehensive prop interfaces

## Features

- Server-side rendering by default
- Optimized image loading with Next.js Image component
- Responsive design with Tailwind CSS
- Customizable background (solid color, gradient, or image)
- Optional background image with gradient overlay
- Two CTA buttons (primary and secondary)
- Support for children (additional content)
- Fully typed with TypeScript
- Accessible and SEO-friendly

## Usage

### Basic Example

```tsx
import { HeroSection } from "@/components/sections/HeroSection";

export default function HomePage() {
  return (
    <HeroSection
      title="Boek de ultieme bruiloft DJ"
      subtitle="Laat uw gasten genieten van een onvergetelijke avond."
      ctaPrimaryText="Bekijk beschikbaarheid"
      ctaSecondaryText="Vraag offerte aan"
    />
  );
}
```

### With Background Image

```tsx
<HeroSection
  title="DJ + Sax die je dansvloer binnen 2 tracks vult"
  subtitle="Live mashups en realtime setlists."
  ctaPrimaryText="Plan je intake"
  backgroundImage="/assets/marketing-images/hero.webp"
  backgroundImageAlt="Professional DJ at wedding event"
  titleColor="text-white"
  subtitleColor="text-white/90"
/>
```

### With Custom Background and Children

```tsx
<HeroSection
  title="Ervaar de ultieme avond"
  subtitle="Van ceremoniële momenten tot de laatste dans."
  ctaPrimaryText="Controleer beschikbaarheid"
  backgroundClass="bg-gradient-to-r from-primary to-secondary"
  titleColor="text-neutral-light"
  subtitleColor="text-neutral-light/80"
>
  <div className="flex gap-8 mt-8">
    <div>
      <p className="text-3xl font-bold">4.9/5</p>
      <p>Gem. reviewscore</p>
    </div>
  </div>
</HeroSection>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Main heading text |
| `subtitle` | `string` | **Required** | Subheading text |
| `ctaPrimaryText` | `string` | **Required** | Text for primary CTA button |
| `ctaPrimaryHref` | `string` | `"#"` | Link for primary CTA button |
| `ctaSecondaryText` | `string` | `undefined` | Text for secondary CTA button (optional) |
| `ctaSecondaryHref` | `string` | `"#"` | Link for secondary CTA button |
| `backgroundClass` | `string` | `"bg-neutral-dark"` | Tailwind classes for background |
| `backgroundImage` | `string` | `undefined` | Path to background image |
| `backgroundImageAlt` | `string` | `"Hero background"` | Alt text for background image |
| `titleColor` | `string` | `"text-secondary"` | Tailwind class for title color |
| `subtitleColor` | `string` | `"text-neutral-light"` | Tailwind class for subtitle color |
| `children` | `ReactNode` | `undefined` | Additional content below CTAs |

## Image Optimization

The component uses Next.js `<Image>` component with the following optimizations:

- **Priority loading**: Background images load with `priority` flag
- **Quality**: Set to 90 for high-quality images
- **Sizes**: Responsive sizing with `sizes="100vw"`
- **Object-fit**: Images use `object-cover` to fill the container
- **Automatic formats**: Next.js serves WebP/AVIF when supported

### Recommended Image Specifications

- **Format**: WebP or AVIF (Next.js will optimize)
- **Dimensions**: 1920x1080 or higher
- **Aspect Ratio**: 16:9 for best results
- **Location**: `/public/assets/` directory
- **Alt text**: Always provide descriptive alt text

## Testing

The component includes comprehensive tests:

```bash
npm test components/sections/__tests__/HeroSection.test.tsx
```

Tests cover:
- Rendering title, subtitle, and CTAs
- Conditional rendering of secondary CTA
- Children rendering
- Custom styling and colors
- Background image rendering
- Default values

## Accessibility

- Semantic HTML with `<section>` element
- Proper heading hierarchy (`<h1>`)
- Alt text for background images
- Keyboard-accessible buttons
- ARIA-compliant structure

## Performance

- **Server Component**: Rendered on the server, reducing JavaScript bundle size
- **Image Optimization**: Automatic image optimization via Next.js
- **CSS**: Tailwind CSS for minimal runtime overhead
- **No Client JS**: Unless you add interactive features

## Dependencies

- `next/image`: For optimized images
- `@/components/ui/Button`: Button component (client component for interactions)
- `react`: For React types and JSX

## Migration Notes

### Breaking Changes from Original

1. **Button behavior**: Buttons now need `onClick` handlers or should be wrapped in forms for actions
2. **Image paths**: Must be relative to `/public` directory
3. **Imports**: Updated to use Next.js `Image` component

### Compatible Props

All original props are maintained for backward compatibility:
- `title`, `subtitle`
- `ctaPrimaryText`, `ctaSecondaryText`
- `backgroundClass`, `titleColor`, `subtitleColor`
- `children`

### New Props

- `backgroundImage`: Optional background image path
- `backgroundImageAlt`: Alt text for background image
- `ctaPrimaryHref`: Link for primary button
- `ctaSecondaryHref`: Link for secondary button

## See Also

- [Button Component](../ui/Button.tsx)
- [Example Usage](./HeroSection.example.tsx)
- [Original Component](../../src/components/HeroSection.tsx)
