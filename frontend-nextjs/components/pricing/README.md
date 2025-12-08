# Pricing Components

This directory contains all pricing-related components for the Mister DJ Next.js application.

## Components

### PricingCard
Individual pricing card component that displays a single DJ package.

**Features:**
- Displays package name, price, and features
- Highlighted "featured" variant for popular packages
- Click tracking with PostHog analytics
- Responsive design with hover effects
- Link to contact page with pre-filled package info

**Usage:**
```tsx
import { PricingCard } from '@/components/pricing';
import { PACKAGES } from '@/lib/data/pricing';

<PricingCard package={PACKAGES[0]} locale="nl" />
```

### PricingTables
Grid layout of all pricing packages with stats and CTA section.

**Features:**
- Displays all packages in a responsive grid
- Shows social proof stats (ratings, events, experience)
- Bottom CTA with contact buttons
- Customizable package list

**Usage:**
```tsx
import { PricingTables } from '@/components/pricing';

<PricingTables locale="nl" showStats={true} />
```

### PriceCalculator
Interactive calculator for estimating event costs.

**Features:**
- Guest count slider with package recommendations
- Package selection with visual feedback
- Add-ons selection with checkboxes
- Live price calculation and breakdown
- PostHog tracking for user interactions
- Redirects to contact page with pre-filled data

**Usage:**
```tsx
import { PriceCalculator } from '@/components/pricing';

<PriceCalculator locale="nl" />
```

### PackageComparison
Side-by-side comparison table of all packages.

**Features:**
- Desktop: Comparison table with all features
- Mobile: Accordion-style cards for each package
- Feature-by-feature comparison
- "Show more" functionality for additional features
- Direct package selection buttons

**Usage:**
```tsx
import { PackageComparison } from '@/components/pricing';

<PackageComparison />
```

## Data Files

### `/lib/data/pricing.ts`
Central data file containing:
- `PACKAGES`: Array of all DJ packages
- `ADD_ONS`: Array of available add-ons
- `PRICING_FEATURES`: Key features grid
- `PACKAGE_INCLUDES`: What's included in packages
- `PRICING_FAQ`: Frequently asked questions
- Helper functions for price calculations

### `/lib/utils/currency.ts`
Currency formatting utilities:
- `formatCurrency()`: Format numbers as EUR currency
- `formatCompactCurrency()`: Compact format (e.g., "€495")
- `formatPriceRange()`: Format price ranges
- `formatFromPrice()`: Format "from" prices
- VAT calculation helpers

### `/lib/utils/structured-data.ts`
SEO structured data generators:
- `generateOfferStructuredData()`: Individual package offers
- `generateAggregateOfferStructuredData()`: All packages aggregate
- `generateServiceStructuredData()`: Service information
- `generatePricingFAQStructuredData()`: FAQ schema
- `generateBreadcrumbStructuredData()`: Breadcrumb navigation

## Internationalization

Translation files are located in `/messages/`:
- `nl.json`: Dutch translations
- `en.json`: English translations

All pricing text, labels, and content are fully translatable.

## Analytics

All pricing components include PostHog tracking for:
- Package card clicks
- Calculator interactions (package changes, add-on toggles)
- Quote request conversions
- User behavior analysis

## Styling

Components use Tailwind CSS with:
- Responsive breakpoints (mobile-first)
- Hover effects and transitions
- Color scheme: Amber (primary), Slate (neutral)
- Consistent spacing and typography

## SEO Optimization

The pricing page (`/app/[locale]/pakketten/page.tsx`) includes:
- Meta tags (title, description, keywords)
- Open Graph tags
- Twitter Card tags
- Structured data (Offer, Service, FAQ, Breadcrumb)
- Semantic HTML structure

## Mobile Responsiveness

All components are fully responsive with:
- Mobile: Single column, stacked layouts
- Tablet: 2 columns where appropriate
- Desktop: 3 columns, full comparison tables

## Accessibility

- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

## Future Enhancements

Potential improvements:
- [ ] A/B testing variants
- [ ] Currency selector (EUR/USD/GBP)
- [ ] Package customization builder
- [ ] Real-time availability checking
- [ ] Discount code support
- [ ] Seasonal pricing adjustments
- [ ] Multi-step quote flow
