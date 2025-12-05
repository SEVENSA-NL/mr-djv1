# Translation Key Reference

Complete reference of all available translation keys in the Mr. DJ frontend.

## Quick Reference

| Key | Purpose | Example |
|-----|---------|---------|
| `app.title` | App title | "Mr. DJ boekingshub" |
| `hero.title` | Hero title | "DJ + Sax..." |
| `language.label` | Language selector label | "Language" |

## Complete Translation Keys

### App Section
```
app.title                    Application title
app.subtitle                 Application subtitle  
app.bookingSectionLabel      Booking section label
```

### Hero Section
```
hero.badge                   Review badge (e.g., "4.9/5 from 180+ reviews")
hero.title                   Main headline
hero.subtitle                Subheadline text
hero.supportingCopy          Supporting paragraph
hero.ctaPrimaryText          Primary CTA button text
hero.ctaSecondaryText        Secondary CTA button text
hero.stats[0].label          First stat label (e.g., "Average rating")
hero.stats[0].value          First stat value (e.g., "4.9/5")
hero.stats[1].label          Second stat label
hero.stats[1].value          Second stat value
hero.stats[2].label          Third stat label
hero.stats[2].value          Third stat value
hero.testimonial.quote       Testimonial quote
hero.testimonial.author      Testimonial author
```

### Event Types Section
```
eventTypes.title             Section title
eventTypes.subtitle          Section subtitle
eventTypes.selectedBadge     "Selected" badge text

eventTypes.options.bruiloft.label              "Wedding" / "Bruiloft"
eventTypes.options.bruiloft.description        Wedding description

eventTypes.options.bedrijfsfeest.label         "Corporate event" / "Bedrijfsfeest"
eventTypes.options.bedrijfsfeest.description   Corporate event description

eventTypes.options.verjaardag.label            "Birthday" / "Verjaardag"
eventTypes.options.verjaardag.description      Birthday description

eventTypes.options.festival.label              "Festival" / "Festival"
eventTypes.options.festival.description        Festival description
```

### Testimonials Section
```
testimonials.title                 Section title

testimonials.items[0].quote        First testimonial quote
testimonials.items[0].author       First testimonial author
testimonials.items[0].source       First testimonial source
testimonials.items[0].rating       First testimonial rating

testimonials.items[1].quote        Second testimonial quote
testimonials.items[1].author       Second testimonial author
testimonials.items[1].source       Second testimonial source
testimonials.items[1].rating       Second testimonial rating

testimonials.items[2].quote        Third testimonial quote
testimonials.items[2].author       Third testimonial author
testimonials.items[2].source       Third testimonial source
testimonials.items[2].rating       Third testimonial rating
```

### Language Section
```
language.label                 Language selector label
language.options.nl            Dutch option
language.options.en            English option
```

### Pricing Section

#### Hero
```
pricing.hero.badge             Pricing section badge
pricing.hero.title             Pricing section title
pricing.hero.subtitle          Pricing section subtitle
```

#### Features
```
pricing.features.allIn.icon            Icon for all-inclusive
pricing.features.allIn.title           "All-inclusive packages" title
pricing.features.allIn.description     Description

pricing.features.liveSax.icon          Icon for live sax
pricing.features.liveSax.title         "Live Saxophone" title
pricing.features.liveSax.description   Description

pricing.features.guarantee.icon        Icon for guarantee
pricing.features.guarantee.title       "100% Dance Guarantee" title
pricing.features.guarantee.description Description
```

#### Stats
```
pricing.stats.rating           Rating text (e.g., "4.9/5 stars")
pricing.stats.events           Events text (e.g., "500+ successful events")
pricing.stats.guarantee        Guarantee text
pricing.stats.experience       Experience text
```

#### Packages
```
pricing.packages.title                 Packages section title

pricing.packages.brons.name            Bronze package name
pricing.packages.brons.subtitle        Bronze package subtitle
pricing.packages.brons.description     Bronze package description

pricing.packages.zilver.name           Silver package name
pricing.packages.zilver.subtitle       Silver package subtitle
pricing.packages.zilver.description    Silver package description

pricing.packages.goud.name             Gold package name
pricing.packages.goud.subtitle         Gold package subtitle
pricing.packages.goud.description      Gold package description
```

#### Calculator
```
pricing.calculator.title               Calculator title
pricing.calculator.subtitle            Calculator subtitle
pricing.calculator.guestCount          Guest count label
pricing.calculator.choosePackage       Choose package label
pricing.calculator.addExtras           Add extras label
pricing.calculator.total               Total label
pricing.calculator.getQuote            Get quote button text
pricing.calculator.disclaimer          Price disclaimer
pricing.calculator.recommendation      Recommendation text template
pricing.calculator.popularBadge        Popular badge text
pricing.calculator.popularAddon        Popular addon text
```

#### Comparison
```
pricing.comparison.title               Comparison title
pricing.comparison.subtitle            Comparison subtitle
pricing.comparison.features            Features label
pricing.comparison.choosePackage       Choose package button text
pricing.comparison.showMore            Show more link text
pricing.comparison.question            Question text
pricing.comparison.cta                 CTA text
```

#### Includes
```
pricing.includes.title                 "What's included" title

pricing.includes.sound.icon            Sound icon
pricing.includes.sound.title           "Professional sound" title
pricing.includes.sound.items[0]        Item 1
pricing.includes.sound.items[1]        Item 2
pricing.includes.sound.items[2]        Item 3
pricing.includes.sound.items[3]        Item 4

pricing.includes.lighting.icon         Lighting icon
pricing.includes.lighting.title        "Atmospheric lighting" title
pricing.includes.lighting.items[0]     Item 1
pricing.includes.lighting.items[1]     Item 2
pricing.includes.lighting.items[2]     Item 3
pricing.includes.lighting.items[3]     Item 4

pricing.includes.service.icon          Service icon
pricing.includes.service.title         "Complete peace of mind" title
pricing.includes.service.items[0]      Item 1
pricing.includes.service.items[1]      Item 2
pricing.includes.service.items[2]      Item 3
pricing.includes.service.items[3]      Item 4

pricing.includes.notSure.title         "Not sure?" title
pricing.includes.notSure.description   Description
pricing.includes.notSure.askAdvice     Ask advice button
pricing.includes.notSure.callDirect    Call direct button
```

#### FAQ
```
pricing.faq.title              FAQ title
```

#### CTA
```
pricing.cta.title              CTA title
pricing.cta.subtitle           CTA subtitle
pricing.cta.getQuote           Get quote button
pricing.cta.callNow            Call now button
pricing.cta.notSure            Not sure text
pricing.cta.whatsapp           WhatsApp CTA
```

#### Common
```
pricing.common.perEvent        "/ event" suffix
pricing.common.viewAvailability View availability text
pricing.common.exclVat         "Excl. VAT" text
pricing.common.from            "From" prefix
```

## Usage Examples

### Server Component
```typescript
import { getMessages } from 'next-intl/server';

export default async function PricingPage() {
  const t = await getMessages();
  
  return (
    <>
      <h1>{t.pricing.hero.title}</h1>
      <p>{t.pricing.hero.subtitle}</p>
    </>
  );
}
```

### Client Component
```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations();
  
  return (
    <>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{t('hero.ctaPrimaryText')}</button>
    </>
  );
}
```

### Accessing Nested Values
```typescript
const t = useTranslations();

// Access nested object
const eventOptions = t.eventTypes.options;
const weddingLabel = eventOptions.bruiloft.label;

// Or use dot notation
const weddingLabel = t('eventTypes.options.bruiloft.label');

// Access array items
const firstStat = t.hero.stats[0];
const firstStatLabel = firstStat.label;
```

### With Variables
```typescript
const t = useTranslations();

// Recommendation with variables
const recommendation = t('pricing.calculator.recommendation', {
  count: 100,
  package: 'Silver'
});
// "💡 Tip: For 100 guests we recommend the Silver"
```

## Language Variants

### Dutch (nl)
- Used in URLs: `/nl/...`
- Language tag: `nl`
- hreflang: `nl`

**Example translations**:
```
app.title: "Mr. DJ boekingshub"
hero.title: "DJ + Sax die je dansvloer binnen 2 tracks vult"
language.label: "Taal"
```

### English (en)
- Used in URLs: `/en/...`
- Language tag: `en`
- hreflang: `en`

**Example translations**:
```
app.title: "Mr. DJ booking hub"
hero.title: "DJ + Sax that packs your dance floor in two tracks"
language.label: "Language"
```

## Adding New Translation Keys

1. **Identify the section**: app, hero, pricing, etc.
2. **Create the key path**: `section.subsection.key`
3. **Add to both files**:
   - `messages/nl.json` - Dutch translation
   - `messages/en.json` - English translation

**Example**:
```json
{
  "newFeature": {
    "title": "Dutch Title",
    "description": "Dutch Description"
  }
}
```

Then use in components:
```typescript
t('newFeature.title')
t('newFeature.description')
```

## Key Naming Conventions

- Use camelCase for keys
- Use dot notation for nesting
- Use numbered arrays for lists: `items[0]`, `items[1]`
- Use descriptive names that indicate content

**Good**:
- `hero.ctaPrimaryText`
- `pricing.packages.brons.name`
- `testimonials.items[0].quote`

**Avoid**:
- `hero.button` (too vague)
- `pricing-packages.bronze-name` (wrong case)
- `testimonials.testimonial1.quote` (don't number parent keys)

## Maintenance

### Regular Tasks
1. Check both JSON files have matching keys
2. Validate JSON syntax
3. Review for untranslated content
4. Update documentation when adding keys

### Validation Script
```bash
# Check for missing translations
npm run validate-i18n
```

---

**Last Updated**: December 5, 2025
