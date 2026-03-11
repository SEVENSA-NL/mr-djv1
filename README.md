# Mister DJ Frontend

Marketing website voor [Mister DJ](https://mr-dj.nl) — de feestspecialist van het Zuiden. Gebouwd met Next.js 14, React 18, TypeScript en Tailwind CSS.

## Tech Stack

| Technologie | Versie | Doel |
|------------|--------|------|
| Next.js | 14.2 | App Router, SSG, API routes |
| React | 18.3 | UI componenten |
| TypeScript | 5.4 | Type safety |
| Tailwind CSS | 3.4 | Styling (brand gold `#f9b537`) |
| Nodemailer | 8.x | E-mail (formulieren + autoresponder) |
| Playwright | 1.58 | E2E tests |

## Project Structuur

```
app/
  nl/                      # Nederlandse pagina's
    page.tsx               # Homepage
    bruiloften/            # Bruiloften servicepagina
    bedrijfsfeesten/       # Bedrijfsfeesten servicepagina
    verhuur/               # Apparatuur verhuur
    blog/                  # Blog (5 posts live)
      [slug]/              # Dynamische blogartikelen
    contact/               # Contact + beschikbaarheidsformulier
    mister-dj/             # Over ons + "Waarom Mister DJ"
    veelgestelde-vragen/   # FAQ (18+ vragen, FAQPage schema)
    impressies/            # Foto- en videogalerij
    dj-eindhoven/          # Stadspagina (10+ steden)
    dj-tilburg/
    dj-den-bosch/
    dj-breda/
    ...
    locaties/[slug]/       # 30+ venue-pagina's
    algemene-voorwaarden/
    privacyverklaring/
  api/
    contact/               # Formulier submit + autoresponder
    brochure-download/     # Feestgids PDF download + autoresponder
    wedding-intake/        # Bruiloft intake + autoresponder
    opening-dance/         # Openingsdans aanvraag + autoresponder

src/
  components/
    layout/                # MrDjLayout (header, footer, nav)
    sections/              # Paginasecties (Hero, Packages, Gallery, etc.)
    forms/                 # AvailabilityForm, WeddingIntakeForm, etc.
    ui/                    # StickyCTA, BrochureModal, ExitIntentPopup, etc.
    icons/                 # 13 SVG icon componenten (Heroicons-stijl)
    pages/                 # ServiceCityContent, EventTypeContent, etc.
    analytics/             # GA4, Clarity, cookie consent
  data/                    # Statische data (testimonials, blog, venues, stats)
  hooks/                   # useInView, useFormValidation, useScrollDepth
  lib/                     # email.ts (Nodemailer + autoresponder), ab-testing
  forms/                   # TypeScript form interfaces
  design/                  # Theme configuratie
  utils/                   # Tracking, sanitize

docs/                      # Strategie & audit documenten
  1000-improvements.md     # Backlog met 1000 verbeterpunten
  conversion-audit.md      # 130-variabelen conversie audit (score: 8.7/10)
  quality-and-marketing-score-check.md  # Uitgebreide kwaliteitsaudit
  strategy/
    competitor-analysis.md # SWOT + 5 concurrenten
    content-calendar.md    # 12-maanden content plan
    customer-personas.md   # 4 doelgroep persona's
    kpi-framework.md       # KPI targets + tooling
    review-strategy.md     # Review generatie plan (76→150 reviews)
    sales-funnel.md        # 6-staps funnel optimalisatie

public/
  images/gallery/          # Event foto's
  downloads/               # mister-dj-feestgids.pdf (9 pagina's)
```

## Belangrijkste Features

- **Multi-step formulier** met progress bar, autosave (localStorage) en inline validatie
- **E-mail autoresponder** met branded template en per-formtype next-steps CTA
- **Feestgids PDF** (9 pagina's) als lead magnet via BrochureModal + ExitIntentPopup
- **TPW trust badge** in header (10/10 score, 76 reviews)
- **Social proof strip** met gecombineerd review count (TPW + Google + Facebook)
- **Sticky mobile CTA** met trust badges (9.8/10 · 129 reviews · 100% dansgarantie)
- **6-stappen werkwijze** (compact + expanded variant)
- **Blog** met 23 SEO-gerichte artikelen (5 live + 18 auto-gepubliceerd) + JSON-LD Article schema
- **Auto-publish cron** — wekelijkse rebuild publiceert ingeplande posts op willekeurig tijdstip (09:00-19:00)
- **10+ stadspagina's** met lokale SEO + FAQ schema
- **30+ venue-pagina's** met locatie-specifieke content
- **A/B testing** framework (ABTestVariant component)
- **Cookie consent** + privacy/AV pagina's
- **Brand gold** (#f9b537) consistent via Tailwind palette override

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Production build
npm run test         # Playwright E2E tests
```

### Environment Variables

```env
SMTP_HOST=           # SMTP server (optioneel, zonder = console logging)
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@mr-dj.nl
```

## Deployment

Docker multi-stage build → push naar lokaal registry → Kubernetes rollout:

```bash
docker build -t localhost:5000/mr-dj-frontend:latest .
docker push localhost:5000/mr-dj-frontend:latest
kubectl rollout restart deployment/mr-dj-frontend
```

De applicatie draait als standalone Next.js server op port 3000.

## Documentatie

Zie `/docs/` voor uitgebreide strategie- en auditdocumenten:

| Document | Inhoud |
|----------|--------|
| `conversion-audit.md` | 130-variabelen audit met scores per categorie |
| `quality-and-marketing-score-check.md` | Webdesign, copy, marketing & SEO audit |
| `1000-improvements.md` | Complete backlog met prioriteiten |
| `strategy/competitor-analysis.md` | SWOT-analyse + 5 concurrenten |
| `strategy/content-calendar.md` | 12-maanden publicatieplan |
| `strategy/customer-personas.md` | 4 gedetailleerde doelgroep-persona's |
| `strategy/kpi-framework.md` | KPI targets en meetplan |
| `strategy/review-strategy.md` | Plan voor review groei (76→150) |
| `strategy/sales-funnel.md` | 6-staps funnel met gaps en verbeterpunten |
