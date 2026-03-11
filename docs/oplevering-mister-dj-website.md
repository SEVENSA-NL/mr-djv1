# Oplevering Website Mister DJ

**Opdrachtgever:** Bart van de Weijer — Mister DJ
**Opleverdatum:** Maart 2026
**Uitgevoerd door:** Sevensa
**Website:** https://mr-dj.nl

---

## 1. Samenvatting

We hebben voor Mister DJ een compleet nieuwe, professionele marketing-website ontwikkeld. De website is gebouwd op moderne technologie (Next.js 14), volledig responsive, SEO-geoptimaliseerd en gericht op conversie. Met meer dan 80 unieke pagina's, geautomatiseerde formulierverwerking en een uitgebreide contentstrategie is de website klaar om structureel leads te genereren.

### Resultaat in cijfers

| Onderdeel | Aantal |
|-----------|--------|
| Unieke pagina's | 80+ |
| Stadspagina's (lokale SEO) | 21 |
| Venue-pagina's | 32 |
| Blogartikelen | 23 (5 live + 18 ingepland) |
| Reviews op de website | 22 |
| FAQ-vragen | 22 |
| Formulieren | 5 |
| API-koppelingen | 9 |
| Geschreven content | ~30.000 woorden |
| Gallery foto's | 31 (15 origineel + 16 brochure) |
| Componenten | 59 |

---

## 2. Wat is er gebouwd

### 2.1 Pagina's & Content

**Servicepagina's**
- Homepage met hero, pakketten, reviews, galerij, werkwijze en contactformulier
- Bruiloften — uitgebreide pagina met categorie-specifieke reviews en openingsdans-formulier
- Bedrijfsfeesten — met zakelijke FAQ en eigen tone of voice
- Verhuur — apparatuurverhuur met 3 categorieeen, FAQ en offerteformulier
- Overige feesten — verjaardagen, jubilea, kerstfeesten, carnaval, eindexamenfeesten (5 event-pagina's)
- Impressies — foto- en videogalerij met lightbox

**Lokale SEO-pagina's (21 pagina's)**
- 7 steden (Eindhoven, Tilburg, Den Bosch, Breda, Helmond, Weert, Veldhoven)
- 3 event-types per stad (bruiloft, bedrijfsfeest, feest)
- Elk met unieke content, USP-bullets, FAQ-schema en prijsinformatie
- Voorbeeld: "DJ huren bruiloft Eindhoven — 100% dansgarantie"

**Venue-pagina's (32 pagina's)**
- Locaties zoals De Mispelhoef, Kasteel Henkenshage, Boscafe de Molenvelden, etc.
- Elk met locatie-specifieke beschrijving, DJ-tips per venue en contactformulier
- Interne links naar gerelateerde services en stadspagina's

**Blog (23 artikelen, ~13.400 woorden)**
- 5 artikelen live bij lancering (bruiloftsmuziek, DJ vs Spotify, kosten DJ, openingsdans, bedrijfsfeest)
- 18 artikelen met toekomstige publicatiedatums (automatische wekelijkse publicatie via cron job)
- Categorieën: bruiloften, tips, prijzen, bedrijfsfeesten, lokaal, entertainment
- Automatisch publicatiesysteem: wekelijkse rebuild op willekeurig tijdstip (09:00-19:00)

**Informatieve pagina's**
- Over Mister DJ — met "Waarom Mister DJ" sectie (3 stats-cards: 100% dansgarantie, 10/10 score, 2.500+ feesten)
- Veelgestelde vragen — 22 vragen in 6 categorieen
- Contact — met beschikbaarheidsformulier, Google Maps, click-to-call
- Trouwbeurzen overzicht
- Vacatures
- Privacyverklaring
- Algemene voorwaarden

### 2.2 Formulieren & Lead Generation

**5 formulieren:**

| Formulier | Functie | Bijzonderheden |
|-----------|---------|----------------|
| Beschikbaarheidsformulier | Hoofdformulier op elke pagina | 3-staps wizard met progress bar, autosave, inline validatie |
| Brochure/Feestgids download | Lead capture via feestgids PDF | E-mail gate, automatische PDF-link |
| Bruiloft-intake | Uitgebreid intakeformulier | Voor bruiloften met ceremonie-details |
| Openingsdans aanvraag | Specifiek voor openingsdans-mix | Nummer + stijl selectie |
| Offerte-wizard | Interactieve pakketkeuze | Visuele pakket-selectie met add-ons |

**Automatische e-mail bevestiging:**
Na elk formulier ontvangt de bezoeker direct een professionele bevestigingsmail met:
- Persoonlijke aanhef
- Bevestiging van de aanvraag
- "Wat nu?" — volgende stappen per formuliertype
- Contactgegevens en CTA-button
- Branded template in Mister DJ huisstijl

### 2.3 Conversie-optimalisatie

| Feature | Beschrijving |
|---------|-------------|
| Sticky mobile CTA | Vaste balk onderaan op mobiel met trust badges (9.8/10 score, 129 reviews, 100% dansgarantie) + bel-knop + CTA |
| Exit-intent popup | Verschijnt bij verlaten van de pagina — feestgids download als lead magnet |
| TPW trust badge | 10/10 score in de header, direct zichtbaar op elke pagina |
| Social proof strip | 3 beoordelingskaarten (ThePerfectWedding 10/10, Google 9.5/10, Facebook 100%) met totaal reviewaantal |
| Reactiegarantie badge | Groene badge boven elk formulier: "Reactiegarantie: antwoord binnen 24 uur" |
| Feestgids PDF | 9-pagina's gids met pakketten, prijzen, tips en checklist — als download na contactgegevens |

### 2.4 Design & Branding

- **Brochure-gebaseerd design:** Alle visuele elementen afgeleid van de officiële Mister DJ brochure
- **Huisstijlkleuren:** Brand gold (#f9b537) + navy blue (#1a2744) consistent door de hele website
- **Script font:** Playfair Display Italic voor sectie-labels (brochure-stijl)
- **6-stappen werkwijze:** Visuele weergave van het boekingsproces (kennismaking t/m jullie dag)
- **13 custom iconen:** In Heroicon-stijl, consistent over alle pagina's
- **Responsive design:** Geoptimaliseerd voor desktop, tablet en mobiel
- **Animaties:** Subtiele fade-in-up animaties bij scrollen (uitschakelbaar voor gebruikers met motion-gevoeligheid)
- **Dark mode secties:** Navy blue gradient achtergrond met brochure-foto's (DarkCTA, StatsStrip)
- **Brochure foto's:** 16 professionele eventfoto's uit de brochure geëxtraheerd en geoptimaliseerd
- **Add-on cards met afbeeldingen:** Packages sectie toont foto's bij photobooth, LED dansvloer, live muziek, sparkulars, lasershow
- **Gallery:** 31 foto's (15 origineel + 16 brochure) met lightbox

### 2.5 SEO & Vindbaarheid

| Onderdeel | Status |
|-----------|--------|
| Unieke meta titles per pagina | Alle pagina's |
| Meta descriptions | Alle pagina's |
| JSON-LD structured data | LocalBusiness (met geo, openingHours, logo), FAQPage, Service, AggregateRating, BlogPosting, BreadcrumbList |
| BlogPosting schema | Volledig: headline, description, wordCount, inLanguage, publisher logo, mainEntityOfPage |
| Service schema op SEO-pagina's | 21 service-stad pagina's met Service + areaServed (City) |
| LocalBusiness uitgebreid | Met GeoCoordinates, openingHoursSpecification, image, logo |
| Sitemap.xml | Dynamisch gegenereerd met alle routes |
| Canonical URLs | Op alle pagina's |
| Breadcrumbs | Op alle subpagina's |
| Open Graph images | Standaard + per blog (article type met publishedTime) |
| FAQ-schema op stadspagina's | Voor rich snippets in Google |

### 2.6 Performance & Speed Optimalisatie

| Onderdeel | Detail |
|-----------|--------|
| Image compressie | Alle afbeeldingen <500KB (van 15.7MB → 1.6MB totaal, 90% reductie) |
| WebP/AVIF | Automatische conversie via Next.js Image component |
| Cache headers | 1 jaar immutable op `/images/` en `/_next/static/` |
| Next.js Image config | deviceSizes, imageSizes, minimumCacheTTL (30 dagen) |
| Code splitting | Dynamic imports voor Packages, Testimonials, Gallery, OfferteWizard |
| Font optimalisatie | Inter + Playfair Display met `display: "swap"` |
| DNS prefetch | WhatsApp, Facebook, Instagram, HubSpot |

### 2.7 Mobile & PWA

| Onderdeel | Detail |
|-----------|--------|
| Responsive design | Tailwind breakpoints (sm/md/lg/xl) op alle componenten |
| Touch targets | Minimum 44px hoogte op alle interactieve elementen |
| Apple PWA meta tags | apple-mobile-web-app-capable, status-bar-style, title |
| PWA manifest | Standalone modus, 192/512px iconen |
| Viewport | device-width, initialScale 1, maximumScale 5 |
| Prefers-reduced-motion | Animaties uitgeschakeld bij motion-gevoeligheid |

### 2.8 Juridisch & Privacy

| Onderdeel | Status |
|-----------|--------|
| Privacyverklaring | Volledige pagina conform AVG |
| Algemene voorwaarden | Volledige pagina |
| Cookie consent banner | Met analytics opt-in/opt-out |
| KvK-nummer in footer | 68906277 |

---

## 3. Technische Specificaties

| Specificatie | Detail |
|-------------|--------|
| Framework | Next.js 14.2 (React 18) |
| Taal | TypeScript |
| Styling | Tailwind CSS 3.4 |
| E-mail | Nodemailer 8.x via SMTP |
| Testing | Playwright (E2E tests) |
| Hosting | Docker container op Kubernetes |
| Build | Multi-stage Docker (87 kB shared JS, pagina's 102-127 kB) |
| Performance | Static Site Generation (SSG) voor optimale laadtijd |

---

## 4. Kwaliteitsscores

Op basis van onze 130-variabelen audit scoort de website als volgt:

| Categorie | Score |
|-----------|-------|
| Technische performance | 9.2 / 10 |
| SEO & Structured Data | 9.5 / 10 |
| Content kwaliteit | 9.0 / 10 |
| UX Design | 8.5 / 10 |
| Mobile & PWA | 9.0 / 10 |
| Conversie-optimalisatie | 8.0 / 10 |
| Brand & Juridisch | 8.1 / 10 |
| **Totaalscore** | **8.9 / 10** |

---

## 5. Meegeleverde Documenten

Naast de website leveren we de volgende strategie-documenten op:

| Document | Inhoud |
|----------|--------|
| Conversie-audit (130 variabelen) | Gedetailleerde scoring per onderdeel met verbeterpunten |
| Kwaliteits- en marketing-audit | Webdesign, copy, marketing en SEO beoordeling |
| Verbeterlijst (1.000 items) | Geprioriteerde backlog voor doorontwikkeling |
| Concurrentieanalyse + SWOT | Vergelijking met DJ Diyo, The Wedding DJ, Artistic Productions, De Vriendelijke DJ's |
| Content kalender (12 maanden) | Blog, social media, e-mail en campagneplan per maand |
| Klantpersona's | 4 gedetailleerde doelgroepprofielen (bruidspaar, HR manager, jubilaris, eventplanner) |
| KPI Framework | Meetbare doelen voor conversie, SEO, reviews, omzet en content |
| Review-strategie | Plan om van 76 naar 150+ reviews te groeien in 12 maanden |
| Sales funnel optimalisatie | 6-staps funnel met gaps en verbeterkansen |

---

## 6. Wat nog niet live is (aanbevelingen)

De volgende onderdelen zijn niet onderdeel van deze oplevering maar worden aanbevolen als vervolgstappen:

### Hoge prioriteit
| # | Aanbeveling | Verwacht effect |
|---|-------------|-----------------|
| 1 | **Google Analytics 4 installeren** — Measurement ID invullen (code staat klaar) | Data-gedreven optimalisatie mogelijk |
| 2 | **Review-strategie activeren** — Post-event email flow opzetten | Van 76 naar 150+ reviews in 12 maanden |
| 3 | **Blog uitbreiden** — 2 artikelen per maand volgens content kalender | +1.000 organische bezoekers/maand |
| 4 | **Google Business Profile optimaliseren** — Foto's, posts, Q&A | Betere lokale vindbaarheid |

### Medium prioriteit
| # | Aanbeveling | Verwacht effect |
|---|-------------|-----------------|
| 5 | **Meta Pixel + Google Ads tag** — Retargeting campagnes starten | Websitebezoekers opnieuw bereiken |
| 6 | **Video testimonials** — 3-5 korte clips van bruidsparen | +25% conversie op bruiloftenpagina |
| 7 | **Instagram strategie** — 3x per week posten, behind-the-scenes | Bereik bij doelgroep Lisa & Thomas |
| 8 | **Team foto's** — Professionele fotoshoot voor Over Ons pagina | Persoonlijkheid en vertrouwen |

---

## 7. Beheer & Onderhoud

### Content aanpassen
- **Reviews toevoegen:** Bewerk `src/data/testimonials.ts`
- **Blog schrijven:** Voeg toe aan `src/data/blog-posts.ts`
- **Statistieken bijwerken:** Pas aan in `src/data/company-stats.ts` (reviews, score, aantal feesten)
- **Venues toevoegen:** Voeg toe aan `src/data/venues.ts`
- **FAQ bijwerken:** Bewerk `app/nl/veelgestelde-vragen/VeelgesteldeVragenContent.tsx`

### Deployment
Na wijzigingen opnieuw deployen via:
```
docker build -t localhost:5000/mr-dj-frontend:latest .
docker push localhost:5000/mr-dj-frontend:latest
kubectl rollout restart deployment/mr-dj-frontend
```

### Automatische blog-publicatie
Er is een wekelijkse cron job geconfigureerd die elke maandag de website opnieuw bouwt. Blogposts met een `publishedAt` datum in de toekomst worden pas zichtbaar na een rebuild op of na die datum. De cron job kiest een willekeurig tijdstip tussen 09:00 en 19:00 zodat publicaties er organisch uitzien.
- **Script:** `scripts/auto-publish.sh`
- **Cron:** `0 9 * * 1` (elke maandag om 09:00, script voegt willekeurige vertraging toe)
- **Log:** `/var/log/mr-dj-auto-publish.log`
- **Blogposts toevoegen:** Voeg toe aan `src/data/blog-posts.ts` met een toekomstige `publishedAt` datum

### E-mail configuratie
Voor het activeren van de autoresponder en formulier-notificaties, configureer de SMTP-instellingen:
```
SMTP_HOST=<jouw SMTP server>
SMTP_PORT=587
SMTP_USER=<gebruikersnaam>
SMTP_PASS=<wachtwoord>
SMTP_FROM=noreply@mr-dj.nl
```

---

## 8. Investering & Projectwaarde

Onderstaand overzicht toont de geschatte ontwikkelkosten op basis van marktconforme uurtarieven voor een Nederlands webbureau (senior full-stack developer, €110/uur). Dit geeft inzicht in de waarde van het opgeleverde product.

### Urenspecificatie

| Onderdeel | Omschrijving | Uren |
|-----------|-------------|------|
| **Frontend development** | 59 componenten, 80+ pagina's, multi-step formulieren, galerij met lightbox, offerte-wizard, animaties, responsive design | 280 |
| **Backend & API** | 9 API endpoints, e-mailsysteem met autoresponder, formuliervalidatie, rate limiting | 40 |
| **Content & Copywriting** | ~30.000 woorden totaal: 23 blogartikelen, 22 FAQ-items, 22 reviews, 32 venue-beschrijvingen met DJ-tips, pagina-copy voor 20+ pagina's, e-mail templates, feestgids PDF (9 pagina's) | 96 |
| **SEO & Structured Data** | JSON-LD schema (7 types incl. BlogPosting, Service), meta titles/descriptions voor 80+ pagina's, sitemap, canonical URLs, Open Graph per blog, FAQ-schema, GeoCoordinates, image compressie (90% reductie), WebP/AVIF config, cache headers | 40 |
| **Design & UX** | Brochure-gebaseerd design (navy+gold), Playfair Display script font, 16 brochure-foto's geëxtraheerd/geoptimaliseerd, 31 gallery items, add-on cards met afbeeldingen, achtergrondbeelden op CTA/stats, Tailwind theme, 13 custom iconen, WCAG AA, motion preferences | 48 |
| **Strategie-documenten** | 9 documenten: concurrentieanalyse, SWOT, 4 persona's, content kalender (12 mnd), KPI framework, review-strategie, sales funnel, conversie-audit (130 var.), 1.000-punten backlog | 80 |
| **DevOps & Hosting** | Docker multi-stage build, Kubernetes deployment, SMTP-configuratie, health checks | 12 |
| **Testing & QA** | Playwright E2E tests, cross-browser testing, responsive controle, formulier-validatie | 16 |
| **Projectmanagement** | Afstemming, iteraties, oplevering, documentatie | 24 |
| | | |
| **Totaal** | | **636 uur** |

### Waardeberekening

| | Uren | Uurtarief | Bedrag |
|---|---:|---:|---:|
| Frontend development | 280 | €110 | €30.800 |
| Backend & API | 40 | €110 | €4.400 |
| Content & Copywriting | 96 | €85 | €8.160 |
| SEO & Structured Data | 40 | €110 | €4.400 |
| Design & UX | 48 | €95 | €4.560 |
| Strategie-documenten | 80 | €95 | €7.600 |
| DevOps & Hosting | 12 | €110 | €1.320 |
| Testing & QA | 16 | €110 | €1.760 |
| Projectmanagement | 24 | €95 | €2.280 |
| | | | |
| **Totale projectwaarde** | **636** | | **€65.640** |

> **Ter vergelijking:** Een vergelijkbaar project bij een gevestigd Nederlands webbureau wordt doorgaans geoffreerd tussen de €45.000 en €85.000, afhankelijk van de scope. De bovenstaande raming is gebaseerd op gangbare tarieven voor senior developers en strategie-consultants in de Nederlandse markt (bron: Freelancermap.nl, Ziprecruiter NL, branchevereniging DDMA).

### Wat is inbegrepen

- Volledige broncode (eigendom opdrachtgever)
- 9 strategie- en auditdocumenten
- Feestgids PDF (9 pagina's)
- Deployment-ready Docker configuratie
- Geen doorlopende licentiekosten (open-source stack)

---

## 9. Contactgegevens

Voor vragen, ondersteuning of doorontwikkeling:

**Sevensa**
E-mail: info@klokkersconsultancy.nl

---

*Dit document is onderdeel van de oplevering van de Mister DJ website door Sevensa, maart 2026. Alle genoemde bedragen zijn exclusief BTW.*
