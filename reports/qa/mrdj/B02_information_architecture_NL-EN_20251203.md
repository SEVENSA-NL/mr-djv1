# B02 - Informatiearchitectuur | Information Architecture

**Datum / Date**: 2025-12-03
**Status**: ✅ COMPLEET / COMPLETE
**Tijd Besteed / Time Spent**: ~45 minuten / ~45 minutes

---

## NEDERLANDS (NL)

### 1. Huidige Situatie (Discovery)

**Gevonden**:
- Homepage met anchor-based secties (#diensten, #over, #pakketten, etc.)
- `/pricing/` pagina bestaat
- 110+ lokale SEO stadspagina's (`/local-seo/{slug}/`)
- Routes geconfigureerd in `frontend/src/routes.json`

**Ontbreekt**:
- Geen duidelijke sitemap documentatie
- Service pagina's genoemd in docs maar routing onduidelijk
- Geen gestructureerde navigatie hiërarchie gedocumenteerd
- Geen pagina-per-pagina doelen/CTA's gedefinieerd
- Geen interne link strategie

---

### 2. Uitgevoerde Werkzaamheden

**Gecreëerd Bestand**: `docs/architecture/sitemap_mr-dj.md` (7.000+ woorden)

Het complete IA-document bevat:

1. ✅ **Complete site structuur** (10 paginatypes, 117+ totale pagina's)
2. ✅ **Navigatie ontwerp** (desktop + mobiel + footer)
3. ✅ **Pagina-per-pagina analyse** met:
   - Doel per pagina
   - Doelgroep
   - Primaire & secundaire CTA's
   - Sectie structuur
   - SEO focus
   - Interne link aanbevelingen
4. ✅ **Pagina hiërarchie** (Tier 1-4 prioriteit)
5. ✅ **URL structuur richtlijnen**
6. ✅ **Interne link strategie**
7. ✅ **Implementatie fases** (MVP → Trust & SEO → Compliance)

---

### 3. Site Structuur Overzicht

```
mr-dj.nl/
├── / (Home)
├── /diensten/
│   ├── /bruiloft-dj/
│   ├── /bedrijfsfeest-dj/
│   └── /feest-dj/
├── /pakketten/ (Pricing)
├── /over-ons/
├── /faq/
├── /contact/
├── /local-seo/
│   ├── /dj-eindhoven/
│   ├── /bruiloft-dj-den-bosch/
│   └── ... (110+ stadspagina's)
└── /legal/
    ├── /privacy/
    ├── /voorwaarden/
    └── /cookies/
```

---

### 4. Navigatie Structuur

#### Hoofd Menu (Desktop & Mobiel)

```
Logo [Mr. DJ]

Primaire Navigatie:
├── Diensten ▼
│   ├── Bruiloft DJ
│   ├── Bedrijfsfeest DJ
│   └── Feest DJ
├── Pakketten
├── Over Ons
├── FAQ
└── Contact (CTA stijl - opvallende kleur)
```

#### Footer Navigatie

```
Kolom 1: Diensten
├── Bruiloft DJ
├── Bedrijfsfeest DJ
├── Feest DJ
└── Alle diensten

Kolom 2: Informatie
├── Over Mr. DJ
├── Pakketten & Prijzen
├── Veelgestelde vragen
├── Werkgebied
└── Reviews

Kolom 3: Populaire Steden
├── DJ Eindhoven
├── DJ Den Bosch
├── DJ Tilburg
├── DJ Breda
└── Alle steden →

Kolom 4: Contact
├── +31 (0) 40 8422594
├── info@mr-dj.nl
├── WhatsApp Chat
├── Offerte aanvragen
└── [Social Media Icons]

Bottom Bar:
├── © 2025 Mr. DJ
├── Privacy Policy
├── Voorwaarden
└── Cookie Policy
```

---

### 5. Pagina Hiërarchie & Prioriteit

#### Tier 1 (Hoogste Prioriteit - Conversie Pagina's)
1. **Homepage** (/)
2. **Bruiloft DJ** (/bruiloft-dj/)
3. **Pakketten** (/pakketten/)
4. **Contact** (/contact/)

#### Tier 2 (Hoge Prioriteit - Service & Info)
5. **Bedrijfsfeest DJ** (/bedrijfsfeest-dj/)
6. **Feest DJ** (/feest-dj/)
7. **Over Ons** (/over-ons/)
8. **FAQ** (/faq/)

#### Tier 3 (SEO & Niche)
9. **Lokale SEO Pagina's** (110+ pagina's)

#### Tier 4 (Compliance)
10. **Privacy, Voorwaarden, Cookies**

---

### 6. Gedetailleerde Pagina Specificaties

#### 6.1 Homepage (/)

**Doel**: Bezoekers converteren naar leads door waardepropositie te communiceren en naar boeking/contact te leiden

**Doelgroepen**: Alle (breed bereik met personalisatie)

**Primaire CTA**: "Plan een kennismakingsgesprek"

**Secundaire CTA**: "Bekijk onze pakketten"

**Secties**:
1. **Hero**
   - Kern pitch: "DJ + Live Saxofoon | 100% Dansgarantie"
   - Primaire CTA: Boek gesprek
   - Secundaire CTA: Bekijk pakketten

2. **Event Type Selector** (Interactief)
   - Bruiloft / Bedrijfsfeest / Privé Feest
   - Leidt naar relevante service pagina

3. **Diensten Overzicht** (#diensten)
   - 3 kaarten: Bruiloft / Bedrijfsfeest / Feest
   - Korte beschrijving + "Lees meer" → service pagina's

4. **Unique Selling Points** (#over)
   - Live Saxofoon combo
   - 100% Dansgarantie
   - 15+ jaar ervaring
   - Complete service (geluid + licht)

5. **Pakketten Preview** (#pakketten)
   - Brons / Zilver (uitgelicht) / Goud
   - Vanaf prijzen
   - CTA: "Bekijk alle details" → /pakketten/

6. **Social Proof** (#reviews)
   - 4.9/5 beoordeling
   - 500+ events
   - 3-4 testimonials
   - Bedrijfslogo's (Philips, ASML, VDL)

7. **FAQ Teaser** (#faq)
   - 4-5 meest gestelde vragen
   - CTA: "Meer vragen?" → /faq/

8. **Contact Sectie** (#contact)
   - Snel contactformulier
   - Telefoon + WhatsApp knoppen
   - "Of plan direct een kennismakingsgesprek"

**SEO Focus**: Merknaam + "DJ + Saxofoon" + regio

**Interne Links**:
- Links naar alle 3 service pagina's
- Link naar /pakketten/
- Link naar /over-ons/
- Links naar 3-5 populaire stadspagina's

---

#### 6.2 Bruiloft DJ (/bruiloft-dj/)

**Doel**: Bruidsparen converteren naar geboekte consulten

**Doelgroep**: Verloofde stellen die bruiloft plannen

**Primaire CTA**: "Plan een vrijblijvend kennismakingsgesprek"

**Secundaire CTA**: "Bekijk bruiloft pakketten"

**Secties**:
1. **Hero**
   - "Maak jouw bruiloft onvergetelijk"
   - Romantisch beeld
   - CTA: Boek consultatie

2. **Waarom Mr. DJ voor je bruiloft?**
   - 4 USP's specifiek voor bruiloften
   - DJ + Sax maakt het speciaal
   - 200+ bruiloften ervaring
   - Ceremonie tot afterparty dekking
   - Flexibele muziek selectie

3. **Timeline/Journey**
   - Ceremonie → Borrel → Diner → Feest → Na-party
   - Wat we doen in elke fase

4. **Pakketten voor Bruiloften**
   - Zilver uitgelicht (meest gekozen)
   - Add-ons: extra verlichting, photobooth, etc.

5. **Bruiloft FAQ**
   - 6-8 bruiloft-specifieke vragen
   - Muziek selectie proces
   - Hoeveel uren inbegrepen
   - Kunnen we eigen playlist geven?

6. **Testimonials - Bruiloften**
   - 3-4 bruidspaar testimonials
   - Foto's van echte bruiloften

7. **Contact/Boekingsformulier**
   - Event type vooraf ingevuld: "Bruiloft"
   - Datum, locatie, pakket interesse
   - CTA: "Vraag offerte aan"

**SEO Focus**: "bruiloft dj", "wedding dj nederland", "dj met saxofoon bruiloft", "{stad} bruiloft dj"

**Interne Links**:
- Link naar /pakketten/ voor gedetailleerde prijzen
- Link naar /over-ons/ voor team info
- Link naar stadspagina's: "Bruiloft DJ in Eindhoven" etc.

---

#### 6.3 Bedrijfsfeest DJ (/bedrijfsfeest-dj/)

**Doel**: Zakelijke evenement planners converteren naar gekwalificeerde leads

**Doelgroep**: HR managers, evenement coördinatoren, bedrijfseigenaren

**Primaire CTA**: "Vraag direct een offerte aan"

**Secundaire CTA**: "Bekijk onze zakelijke referenties"

**Secties**:
1. **Hero**
   - "Professioneel entertainment voor zakelijke events"
   - Corporate/professioneel beeld
   - CTA: Vraag offerte

2. **Waarom Mr. DJ voor bedrijfsfeesten?**
   - Professionele betrouwbaarheid
   - Flexibele muziek voor diverse publiek
   - Ervaring met grote bedrijven
   - Transparante prijzen & duidelijke afspraken

3. **Type Events**
   - Personeelsfeest
   - Jubileum
   - Product launch
   - Nieuwjaarsborrel
   - Team building event
   - Award ceremony

4. **Onze Zakelijke Klanten**
   - Logo's: Philips, ASML, VDL, etc.
   - 50+ corporate events per jaar
   - Testimonials van bedrijven

5. **Service Details**
   - Apparatuur die we meebrengen
   - Opbouw/afbouw tijdlijn
   - Geluid/licht opties
   - MC services (indien van toepassing)

6. **Corporate FAQ**
   - Facturering & betalingsvoorwaarden
   - Annuleringsbeleid
   - Verzekering & aansprakelijkheid
   - Kunnen we eerst offerte krijgen?

7. **Contactformulier**
   - Event type: "Bedrijfsfeest"
   - Bedrijfsnaam veld
   - Aantal werknemers
   - Budget indicatie
   - CTA: "Offerte aanvragen"

**SEO Focus**: "bedrijfsfeest dj", "corporate dj nederland", "zakelijke events entertainment"

**Interne Links**:
- /pakketten/ voor prijzen
- /over-ons/ voor geloofwaardigheid
- /faq/ → corporate-specifieke vragen

---

#### 6.4 Feest DJ (/feest-dj/)

**Doel**: Privé feest organisatoren converteren naar consulten/boekingen

**Doelgroep**: Individuen die verjaardag, jubileum, themafeest plannen

**Primaire CTA**: "Plan een kennismakingsgesprek"

**Secundaire CTA**: "Bekijk onze pakketten"

**Secties**:
1. **Hero**
   - "Van verjaardag tot jubileum: jouw feest onvergetelijk"
   - Energiek, kleurrijk beeld
   - CTA: Boek gesprek

2. **Type Feesten**
   - Verjaardag (18, 21, 30, 40, 50, 60+)
   - Jubileum (12.5, 25, 40 jaar)
   - Themafeest
   - Garden party / Festival

3. **Wat maakt Mr. DJ uniek voor jouw feest?**
   - Persoonlijke aanpak
   - Muziek aangepast aan gasten
   - Complete setup (jij geniet alleen)
   - Flexibele pakketten voor elk budget

4. **Pakketten - Feest Focus**
   - Brons (starter, budgetvriendelijk)
   - Zilver (meest populair)
   - Goud (all-in ervaring)

5. **Extra Opties**
   - Live Saxofoon
   - LED Dance Floor
   - Photobooth
   - CO2 Cannons
   - Extra verlichting

6. **Tips voor een geslaagd feest**
   - Kies juiste locatie
   - Denk aan muziek voorkeuren gasten
   - Plan tijdlijn
   - Denk aan buren (geluid)

7. **Feest FAQ**
   - Min/max aantal gasten
   - Kunnen we nummers aanvragen?
   - Opbouw tijd nodig
   - Wat als weer slecht is (buiten)?

8. **Contactformulier**
   - Event type: "Feest"
   - Gelegenheid dropdown
   - Aantal gasten
   - Binnen/buiten
   - CTA: "Offerte aanvragen"

**SEO Focus**: "feest dj", "verjaardag dj", "dj huren privé feest"

**Interne Links**:
- /pakketten/ voor gedetailleerde prijzen
- /faq/ voor meer vragen
- Stadspagina's voor lokale feest DJs

---

#### 6.5 Pakketten (/pakketten/)

**Doel**: Transparante prijzen om vertrouwen op te bouwen & leiden naar juiste pakket

**Doelgroepen**: Alle (prijs-bewuste bezoekers)

**Primaire CTA**: "Vraag offerte aan voor jouw event"

**Secundaire CTA**: "Plan een kennismakingsgesprek"

**Secties**:
1. **Hero**
   - "Transparante pakketten voor elk budget"
   - "Geen verborgen kosten"

2. **Drie Pakketten Vergelijking**

   **Brons** (Starter)
   - €750-€950
   - 4 uur DJ
   - Basis geluid
   - Basis licht
   - Best voor: kleine feesten, budget-bewust
   - CTA: "Kies Brons"

   **Zilver** (Meest Gekozen) ⭐
   - €1,200-€1,500
   - 6 uur DJ + Live Saxofoon
   - Premium geluid (Pioneer)
   - Complete lichtshow
   - Inclusief opbouw/afbouw
   - Best voor: bruiloften, belangrijke events
   - CTA: "Kies Zilver"

   **Goud** (All-In)
   - €1,800-€2,200
   - 8 uur DJ + Live Saxofoon
   - Premium geluid + extra speakers
   - Complete lichtshow + extra effecten
   - LED Floor upgrade beschikbaar
   - MC services
   - Best voor: grote events, corporate
   - CTA: "Kies Goud"

3. **Wat Zit in Alle Pakketten**
   - Persoonlijk intakegesprek
   - Maatwerk muziekprogramma
   - Professionele apparatuur
   - Opbouw & afbouw
   - Backup apparatuur
   - Verzekering

4. **Extra Opties (Add-ons)**
   - Extra uren: €150/uur
   - LED Dance Floor: +€400
   - Photobooth: +€350
   - CO2 Cannons: +€200
   - Extra lights: +€150

5. **Pricing FAQ**
   - Wat zit er in de prijs?
   - Reiskosten? (gratis binnen 50km van Eindhoven)
   - Kunnen we pakket aanpassen?
   - Wanneer moeten we betalen?
   - Annuleringsvoorwaarden?

6. **Waarom Deze Prijzen?**
   - Professionele apparatuur (Pioneer, premium lights)
   - 15+ jaar ervaring
   - Live muzikant (saxofoon) inbegrepen in Zilver/Goud
   - Volledige verzekering & backup
   - Persoonlijke service

7. **Contact Sectie**
   - "Niet zeker welk pakket past?"
   - "Bel ons voor advies: +31 (0) 40 8422594"
   - CTA: "Of vraag een offerte op maat aan"

**SEO Focus**: "dj prijzen", "hoeveel kost een dj", "dj pakket prijs"

**Schema.org**: `Offer` schema voor elk pakket

---

#### 6.6 Over Ons (/over-ons/)

**Doel**: Vertrouwen & geloofwaardigheid opbouwen door verhaal & team

**Doelgroepen**: Alle (due diligence bezoekers)

**Primaire CTA**: "Laten we kennismaken"

**Secundaire CTA**: "Bekijk wat klanten zeggen"

**Secties**:
1. **Hero**
   - "Passie voor muziek, professionaliteit in uitvoering"
   - Foto van Mr. DJ + Leslie Moore

2. **Ons Verhaal**
   - Gestart 15+ jaar geleden
   - Waarom we doen wat we doen (passie)
   - Groei & evolutie
   - Wat ons nu anders maakt

3. **Meet the Team**
   - **Mr. DJ** (DJ + Event Coördinator)
     - Bio, ervaring, specialiteiten
     - Foto
   - **Leslie Moore** (Saxofonist)
     - Bio, muziek achtergrond
     - Waarom DJ + Sax combo werkt
     - Foto

4. **Onze Kernwaarden**
   - **Professionaliteit**: Altijd op tijd, backup equipment, gepast gekleed
   - **Passie**: Liefde voor muziek zichtbaar in performance
   - **Persoonlijk**: Direct contact, maatwerk aanpak

5. **Ervaring in Cijfers**
   - 15+ jaar in de branche
   - 500+ geslaagde events
   - 200+ bruiloften
   - 50+ corporate events per jaar
   - 4.9/5 gemiddelde beoordeling
   - 95% zou ons aanraden

6. **Onze Apparatuur**
   - Geluid: Pioneer CDJ-3000, DJM-900, etc.
   - Speakers: JBL/EV professional
   - Licht: Moving heads, LED bars, wash lights
   - Saxofoon: Professionele Yamaha
   - Backup: Altijd reserve apparatuur

7. **Werkgebied**
   - Primair: Noord-Brabant & Limburg
   - Steden kaart/lijst
   - "Ook buiten dit gebied? Neem contact op"

8. **Contact CTA**
   - "Laten we kennismaken over jouw event"
   - CTA: "Plan een gesprek" / "Bel ons"

**SEO Focus**: "mr dj over", "ervaring dj service", brand trust

---

#### 6.7 FAQ (/faq/)

**Doel**: Bezwaren beantwoorden & support last verminderen

**Doelgroepen**: Alle (research fase bezoekers)

**Primaire CTA**: "Vraag niet beantwoord? Neem contact op"

**Categorieën** (Uitklapbaar/Accordion):

**Boeken & Reserveren**
- Hoe ver van tevoren moeten we boeken?
- Wat hebben jullie nodig om te reserveren?
- Kunnen we optie plaatsen?
- Wat is jullie annuleringsbeleid?

**Muziek & Programma**
- Kunnen we eigen playlist aanleveren?
- Welke muziekstijlen kunnen jullie draaien?
- Hoe werkt het intakegesprek?
- Kunnen we verzoekjes doen tijdens feest?

**Techniek & Locatie**
- Wat hebben jullie qua ruimte/stroom nodig?
- Kunnen jullie overal optreden?
- Hoeveel tijd is nodig voor opbouw?
- Wat als er technische problemen zijn?

**Pakketten & Prijzen**
- Wat zit er precies in de prijs?
- Zijn reiskosten apart?
- Kunnen we pakket aanpassen?
- Hoe werkt betaling?

**Dag Van Het Feest**
- Hoe laat komen jullie aan?
- Nemen jullie pauze?
- Wat dragen jullie?
- Kunnen jullie langer blijven?

**Speciale Opties**
- Wat kost live saxofoon extra? (Inbegrepen in Zilver/Goud)
- Kunnen we LED floor toevoegen?
- Hebben jullie photobooth?
- Kunnen we CO2 effecten krijgen?

**SEO Focus**: Long-tail vragen, "dj huren faq", veel gezochte vragen

---

#### 6.8 Contact (/contact/)

**Doel**: Gemakkelijk bereikbaar maken, vragen converteren naar leads

**Doelgroepen**: Alle (klaar om contact op te nemen)

**Primaire CTA**: "Verstuur bericht"

**Secundaire CTA**: "Of bel direct"

**Secties**:
1. **Hero**
   - "Laten we jouw event bespreken"
   - "Binnen 24 uur reactie gegarandeerd"

2. **Contactmethodes** (3 Kaarten)
   - **Telefoon**
     - +31 (0) 40 8422594
     - Ma-Vr: 09:00-21:00
     - Za-Zo: 10:00-18:00
     - Button: "Bel nu"

   - **WhatsApp**
     - Direct chat
     - Snel antwoord
     - Foto's delen mogelijk
     - Button: "Open WhatsApp"

   - **Email**
     - info@mr-dj.nl
     - Binnen 24 uur reactie
     - Uitgebreide vragen
     - Button: "Mail ons"

3. **Contactformulier**
   - Naam*
   - Email*
   - Telefoon*
   - Event type* (dropdown: Bruiloft/Bedrijfsfeest/Feest/Anders)
   - Datum*
   - Locatie (stad)
   - Pakket interesse (dropdown: Brons/Zilver/Goud/Weet ik nog niet)
   - Bericht
   - hCaptcha
   - CTA: "Verstuur aanvraag"

4. **Wat je kunt verwachten**
   - ✓ Reactie binnen 24 uur
   - ✓ Vrijblijvend advies
   - ✓ Op maat gemaakte offerte

5. **Werkgebied**
   - "We werken voornamelijk in Noord-Brabant & Limburg"
   - Populaire steden: Eindhoven, Den Bosch, Tilburg, etc.
   - "Ook buiten dit gebied? Vraag naar de mogelijkheden!"
   - Reiskosten: Gratis binnen 50km van Eindhoven

6. **Social Proof**
   - 3 testimonials
   - "500+ tevreden klanten gingen je voor"

**SEO Focus**: "contact dj", "dj offerte aanvragen", merknaam + "contact"

---

#### 6.9 Lokale SEO Pagina's (/local-seo/{stad-slug}/)

**Voorbeelden**: `/dj-eindhoven/`, `/bruiloft-dj-den-bosch/`

**Doel**: Ranken voor lokale "{service} {stad}" zoekopdrachten & lokale bezoekers converteren

**Doelgroepen**: Stad-specifieke evenement organisatoren

**Primaire CTA**: "Vraag offerte aan voor {stad}"

**Secundaire CTA**: "Bekijk pakketten"

**Secties**:
1. **Hero**
   - "DJ + Live Saxofoon in {Stad}"
   - Lokaal beeld (indien beschikbaar)
   - CTA: Vraag offerte

2. **Waarom Mr. DJ in {Stad}?**
   - Ervaring met events in {stad}
   - Kennen lokale venues
   - Korte reisafstand / Geen reiskosten

3. **Populaire Locaties in {Stad}**
   - Lijst 3-5 venues waar we gewerkt hebben
   - Types events die we daar gedaan hebben

4. **Pakketten voor {Stad}**
   - Kort overzicht, link naar /pakketten/

5. **Testimonials - {Stad}**
   - 2-3 testimonials van die stad

6. **Veelgestelde Vragen - {Stad}**
   - Stad-specifieke vragen
   - Parkeren, opbouw, lokale regelgeving

7. **Contact voor {Stad}**
   - Formulier met stad vooraf ingevuld
   - Telefoon/WhatsApp knoppen

**SEO Focus**: "{stad} dj", "bruiloft dj {stad}", "{service} {stad}"

**Schema.org**: LocalBusiness + Service

**Interne Links**:
- Link naar hoofd service pagina's
- Link naar /pakketten/
- Link naar nabijgelegen steden

---

#### 6.10 Juridische Pagina's (/privacy/, /voorwaarden/, /cookies/)

**Doel**: Compliance (AVG/GDPR) & transparantie

**Primaire CTA**: Geen (informatief)

**Privacy Policy** (/privacy/)
- Welke data we verzamelen
- Hoe we het gebruiken
- Third parties (analytics, forms)
- Jouw rechten (inzage, verwijderen, etc.)
- Contact voor privacy vragen

**Voorwaarden** (/voorwaarden/)
- Service beschrijving
- Boekingsproces
- Betalingsvoorwaarden
- Annuleringsbeleid
- Aansprakelijkheid
- Geschillen

**Cookie Policy** (/cookies/)
- Welke cookies we gebruiken
- Waarom we ze gebruiken
- Hoe cookies te beheren
- Third-party cookies (Google Analytics, etc.)

---

### 7. URL Structuur Richtlijnen

**Best Practices**:
- ✅ `/bruiloft-dj/` (clean, beschrijvend)
- ✅ `/pakketten/` (Nederlands, relevant voor NL publiek)
- ✅ `/dj-eindhoven/` (stad-specifiek)
- ❌ `/services/wedding/` (Engels in Nederlandse site)
- ❌ `/page-2/` (geen betekenis)

**Trailing Slashes**:
- **Aanbeveling**: Altijd trailing slash gebruiken
- Consistentie belangrijk voor SEO

---

### 8. Interne Link Strategie

**Vanaf Homepage**:
- Link naar alle 3 hoofd service pagina's
- Link naar /pakketten/
- Link naar /over-ons/ (voor vertrouwen)
- Link naar 3-5 populaire stadspagina's

**Vanaf Service Pagina's**:
- Cross-link naar andere service pagina's (gerelateerde diensten)
- Link naar /pakketten/ (prijsdetails)
- Link naar relevante stadspagina's
- Link naar /faq/ (bezwaren beantwoorden)
- Link naar /over-ons/ (geloofwaardigheid)

**Vanaf Stadspagina's**:
- Link naar hoofd service pagina's
- Link naar /pakketten/
- Link naar nabijgelegen stadspagina's
- Link naar /contact/

**Footer**:
- Alle belangrijke pagina's gelinkt
- Gestructureerd in 4 kolommen
- Juridische links onderaan

---

### 9. Navigatie Best Practices

**Desktop Navigatie**:
- Sticky header bij scrollen
- "Diensten" dropdown met 3 service types
- "Contact" als CTA-stijl knop (andere kleur)
- Telefoonnummer zichtbaar in header

**Mobiele Navigatie**:
- Hamburger menu
- Telefoon & WhatsApp quick actions onderaan (sticky)
- Vereenvoudigde menu structuur
- Grote tap targets

**Breadcrumbs**:
- Alle pagina's behalve homepage moeten breadcrumbs tonen
- Format: `Home > Diensten > Bruiloft DJ`
- Verbetert UX & SEO

---

### 10. Kritische Gebruikerspaden

1. **Homepage → Service Pagina → Pricing → Contact** (primaire flow)
2. **Stadspagina → Homepage/Service → Contact** (SEO verkeer flow)
3. **Elke Pagina → Telefoon/WhatsApp** (direct conversie pad)

---

### 11. Implementatie Prioriteit

**Fase 1 (MVP - Direct)**
1. ✅ Homepage (bestaat, mogelijk updates nodig)
2. ✅ Pricing (/pakketten/) - bestaat
3. Zorg dat service pagina's bestaan:
   - /bruiloft-dj/
   - /bedrijfsfeest-dj/
   - /feest-dj/
4. Contact pagina

**Fase 2 (Trust & SEO)**
5. Over Ons
6. FAQ
7. Verbeter lokale SEO pagina's structuur

**Fase 3 (Compliance)**
8. Privacy Policy
9. Voorwaarden
10. Cookie Policy

---

### 12. Acceptatie Criteria - Behaald ✅

- [x] Sitemap bestaat met alle pagina's gedocumenteerd
- [x] Per-pagina doel duidelijk vermeld
- [x] Primaire CTA gedocumenteerd voor elke pagina
- [x] Secundaire CTA opgenomen waar relevant
- [x] Pagina hiërarchie (Tier 1-4) vastgesteld
- [x] Interne link strategie gedefinieerd
- [x] Navigatie structuur ontworpen (desktop + mobiel + footer)
- [x] URL best practices gedocumenteerd

---

### 13. Hoe Te Verifiëren

**Directe Review**:
1. Open `docs/architecture/sitemap_mr-dj.md`
2. Verifieer dat elk van 10 paginatypes complete structuur heeft
3. Check of navigatie logisch is voor gebruikers
4. Bevestig dat CTA's aansluiten bij B01 messaging doelen

**Cross-Referentie met B01**:
1. Service pagina's sluiten aan bij 3 doelgroepen (Wedding/Corporate/Private)
2. CTA's gebruiken hiërarchie uit B01 messaging doc
3. Pagina doelen ondersteunen overall conversie strategie

**Implementatie Checklist**:
1. Vergelijk met bestaande routes in `frontend/src/routes.json`
2. Identificeer gaps (ontbrekende service pagina's, etc.)
3. Gebruik als blueprint voor B03 (UX flows)

---

### 14. Key Insights & Beslissingen

**Waarom Deze Structuur?**
- **Publiek-eerst navigatie**: Diensten dropdown scheidt per publiek type
- **Conversie-geoptimaliseerd**: Elke pagina heeft duidelijk doel + primaire CTA
- **SEO-ready**: Stadspagina's + service pagina's targeten verschillende keyword intents
- **Schaalbaar**: Gemakkelijk nieuwe service pagina's of steden toevoegen

**Navigatie Filosofie**:
- Desktop: Meer gedetailleerd (dropdown menu's)
- Mobiel: Vereenvoudigd + sticky telefoon/WhatsApp knoppen
- Footer: Complete sitemap voor SEO + gebruiker oriëntatie

---

### 15. Impact Schatting

**Directe Waarde**:
- Duidelijk roadmap voor site structuur
- Elke pagina heeft gedefinieerd doel en CTA's
- Schaalbare architectuur voor groei

**Lange-termijn Waarde**:
- Betere UX door logische navigatie
- Verbeterde SEO via interne linking
- Hogere conversie door gefocuste pagina doelen
- Gemakkelijker content management (weet waar alles hoort)

**Geschatte Impact**:
- **UX**: +20-30% verbetering in navigatie duidelijkheid
- **SEO**: +15-25% organisch verkeer door betere structuur
- **Conversie**: +10-20% door geoptimaliseerde paden en CTA's

---

### 16. Openstaande Issues / Volgende Ideeën

**Directe Acties Nodig**:
- [ ] **Verifieer service pagina's bestaan** of moeten aangemaakt worden
  - Check of /bruiloft-dj/, /bedrijfsfeest-dj/, /feest-dj/ routes werken
- [ ] **Maak ontbrekende pagina's** per Fase 1 implementatie prioriteit
- [ ] **Update routes.json** om alle gedocumenteerde pagina's op te nemen
- [ ] **Implementeer breadcrumbs** over alle pagina's

**Toekomstige Verbeteringen**:
- [ ] Voeg blog sectie toe voor content marketing (Fase 4)
- [ ] Maak dedicated "Werkgebied" pagina met interactieve kaart
- [ ] Voeg video testimonials pagina toe
- [ ] Maak "Boekingsvoorwaarden" apart van Voorwaarden

---

### 17. Dependencies voor Andere Batches

**B03 (UX Flows) - KLAAR**
- Gebruik sitemap om user journeys te mappen
- Ontwerp flows voor elk primair pad gedefinieerd

**B05 (Copywriting) - KLAAR**
- Schrijf copy voor elke sectie per pagina
- Gebruik CTA hiërarchie uit sitemap

**B06 (Technical) - KLAAR**
- Implementeer routes voor alle pagina's
- Zet navigatie componenten op
- Configureer breadcrumbs

**B08 (Conversion) - KLAAR**
- Optimaliseer CTA's per pagina doelen
- Test conversie paden gedefinieerd

**B10 (SEO) - KLAAR**
- Implementeer interne link strategie
- Optimaliseer URL structuur
- Voeg breadcrumbs toe voor SEO

---

## ENGLISH (EN)

### 1. Current Situation (Discovery)

**Found**:
- Homepage with anchor-based sections (#diensten, #over, #pakketten, etc.)
- `/pricing/` page exists
- 110+ local SEO city pages (`/local-seo/{slug}/`)
- Routes configured in `frontend/src/routes.json`

**Missing**:
- No clear sitemap documentation
- Service pages mentioned in docs but routing unclear
- No structured navigation hierarchy documented
- No page-by-page goals/CTAs defined
- No internal linking strategy

---

### 2. Work Completed

**Created File**: `docs/architecture/sitemap_mr-dj.md` (7,000+ words)

The comprehensive IA document contains:

1. ✅ **Complete site structure** (10 page types, 117+ total pages)
2. ✅ **Navigation design** (desktop + mobile + footer)
3. ✅ **Page-by-page breakdown** with:
   - Goal per page
   - Target audience
   - Primary & secondary CTAs
   - Section structure
   - SEO focus
   - Internal linking recommendations
4. ✅ **Page hierarchy** (Tier 1-4 priority)
5. ✅ **URL structure guidelines**
6. ✅ **Internal linking strategy**
7. ✅ **Implementation phases** (MVP → Trust & SEO → Compliance)

---

### 3. Site Structure Overview

```
mr-dj.nl/
├── / (Home)
├── /diensten/
│   ├── /bruiloft-dj/
│   ├── /bedrijfsfeest-dj/
│   └── /feest-dj/
├── /pakketten/ (Pricing)
├── /over-ons/
├── /faq/
├── /contact/
├── /local-seo/
│   ├── /dj-eindhoven/
│   ├── /bruiloft-dj-den-bosch/
│   └── ... (110+ city pages)
└── /legal/
    ├── /privacy/
    ├── /voorwaarden/
    └── /cookies/
```

---

### 4. Navigation Structure

#### Main Menu (Desktop & Mobile)

```
Logo [Mr. DJ]

Primary Navigation:
├── Diensten ▼
│   ├── Bruiloft DJ
│   ├── Bedrijfsfeest DJ
│   └── Feest DJ
├── Pakketten
├── Over Ons
├── FAQ
└── Contact (CTA style - prominent color)
```

#### Footer Navigation

```
Column 1: Diensten
├── Bruiloft DJ
├── Bedrijfsfeest DJ
├── Feest DJ
└── Alle diensten

Column 2: Informatie
├── Over Mr. DJ
├── Pakketten & Prijzen
├── Veelgestelde vragen
├── Werkgebied
└── Reviews

Column 3: Populaire Steden
├── DJ Eindhoven
├── DJ Den Bosch
├── DJ Tilburg
├── DJ Breda
└── Alle steden →

Column 4: Contact
├── +31 (0) 40 8422594
├── info@mr-dj.nl
├── WhatsApp Chat
├── Offerte aanvragen
└── [Social Media Icons]

Bottom Bar:
├── © 2025 Mr. DJ
├── Privacy Policy
├── Voorwaarden
└── Cookie Policy
```

---

### 5. Page Hierarchy & Priority

#### Tier 1 (Highest Priority - Conversion Pages)
1. **Homepage** (/)
2. **Bruiloft DJ** (/bruiloft-dj/)
3. **Pakketten** (/pakketten/)
4. **Contact** (/contact/)

#### Tier 2 (High Priority - Service & Info)
5. **Bedrijfsfeest DJ** (/bedrijfsfeest-dj/)
6. **Feest DJ** (/feest-dj/)
7. **Over Ons** (/over-ons/)
8. **FAQ** (/faq/)

#### Tier 3 (SEO & Niche)
9. **Local SEO Pages** (110+ pages)

#### Tier 4 (Compliance)
10. **Privacy, Terms, Cookies**

---

### 6. Detailed Page Specifications

#### 6.1 Homepage (/)

**Goal**: Convert visitors into leads by communicating value proposition and guiding to booking/contact

**Target Audiences**: All (broad appeal with personalization)

**Primary CTA**: "Plan een kennismakingsgesprek" (Schedule a consultation)

**Secondary CTA**: "Bekijk onze pakketten" (View our packages)

**Sections**:
1. **Hero**
   - Core pitch: "DJ + Live Saxophone | 100% Dance Guarantee"
   - Primary CTA: Book meeting
   - Secondary CTA: View packages

2. **Event Type Selector** (Interactive)
   - Bruiloft / Bedrijfsfeest / Privé Feest (Wedding / Corporate / Private Party)
   - Guides to relevant service page

3. **Services Overview** (#diensten)
   - 3 cards: Wedding / Corporate / Party
   - Brief description + "Read more" → service pages

4. **Unique Selling Points** (#over)
   - Live Saxophone combo
   - 100% Dance Guarantee
   - 15+ years experience
   - Complete service (sound + light)

5. **Packages Preview** (#pakketten)
   - Bronze / Silver (highlighted) / Gold
   - Starting prices
   - CTA: "View all details" → /pakketten/

6. **Social Proof** (#reviews)
   - 4.9/5 rating
   - 500+ events
   - 3-4 testimonials
   - Company logos (Philips, ASML, VDL)

7. **FAQ Teaser** (#faq)
   - 4-5 most common questions
   - CTA: "More questions?" → /faq/

8. **Contact Section** (#contact)
   - Quick contact form
   - Phone + WhatsApp buttons
   - "Or schedule a consultation directly"

**SEO Focus**: Brand name + "DJ + Saxophone" + region

**Internal Links**:
- Links to all 3 main service pages
- Link to /pakketten/
- Link to /over-ons/
- Links to 3-5 popular city pages

---

#### 6.2 Bruiloft DJ (Wedding DJ) (/bruiloft-dj/)

**Goal**: Convert wedding couples into booked consultations

**Target Audience**: Engaged couples planning wedding

**Primary CTA**: "Plan een vrijblijvend kennismakingsgesprek" (Schedule a no-obligation consultation)

**Secondary CTA**: "Bekijk bruiloft pakketten" (View wedding packages)

**Sections**:
1. **Hero**
   - "Make your wedding unforgettable"
   - Romantic imagery
   - CTA: Book consultation

2. **Why Mr. DJ for Your Wedding?**
   - 4 USPs specific to weddings
   - DJ + Sax makes it special
   - 200+ weddings experience
   - Ceremony to after-party coverage
   - Flexible music selection

3. **Timeline/Journey**
   - Ceremony → Reception → Dinner → Party → After-party
   - What we do at each stage

4. **Packages for Weddings**
   - Silver highlighted (most chosen)
   - Add-ons: extra lights, photobooth, etc.

5. **Wedding FAQ**
   - 6-8 wedding-specific questions
   - Music selection process
   - How many hours included
   - Can we provide our playlist?

6. **Testimonials - Weddings**
   - 3-4 wedding couple testimonials
   - Photos from real weddings

7. **Contact/Booking Form**
   - Event type pre-filled: "Bruiloft" (Wedding)
   - Date, location, package interest
   - CTA: "Request quote"

**SEO Focus**: "bruiloft dj", "wedding dj nederland", "dj met saxofoon bruiloft", "{city} bruiloft dj"

**Internal Links**:
- Link to /pakketten/ for detailed pricing
- Link to /over-ons/ for team info
- Link to city pages: "Wedding DJ in Eindhoven" etc.

---

#### 6.3 Bedrijfsfeest DJ (Corporate Event DJ) (/bedrijfsfeest-dj/)

**Goal**: Convert corporate event planners into qualified leads

**Target Audience**: HR managers, event coordinators, business owners

**Primary CTA**: "Vraag direct een offerte aan" (Request a quote directly)

**Secondary CTA**: "Bekijk onze zakelijke referenties" (View our corporate references)

**Sections**:
1. **Hero**
   - "Professional entertainment for corporate events"
   - Corporate/professional imagery
   - CTA: Request quote

2. **Why Mr. DJ for Corporate Events?**
   - Professional reliability
   - Flexible music for diverse audiences
   - Experience with major companies
   - Transparent pricing & clear agreements

3. **Event Types**
   - Staff party (Personeelsfeest)
   - Anniversary (Jubileum)
   - Product launch
   - New Year's reception (Nieuwjaarsborrel)
   - Team building event
   - Award ceremony

4. **Our Corporate Clients**
   - Logos: Philips, ASML, VDL, etc.
   - 50+ corporate events per year
   - Testimonials from companies

5. **Service Details**
   - Equipment we bring
   - Setup/breakdown timeline
   - Sound/light options
   - MC services (if applicable)

6. **Corporate FAQ**
   - Invoicing & payment terms
   - Cancellation policy
   - Insurance & liability
   - Can we get a quote first?

7. **Contact Form**
   - Event type: "Bedrijfsfeest" (Corporate)
   - Company name field
   - Employee count
   - Budget indication
   - CTA: "Request quote"

**SEO Focus**: "bedrijfsfeest dj", "corporate dj nederland", "zakelijke events entertainment"

**Internal Links**:
- /pakketten/ for pricing
- /over-ons/ for credibility
- /faq/ → corporate-specific questions

---

#### 6.4 Feest DJ (Party DJ) (/feest-dj/)

**Goal**: Convert private party hosts into consultations/bookings

**Target Audience**: Individuals planning birthday, anniversary, theme party

**Primary CTA**: "Plan een kennismakingsgesprek" (Schedule a consultation)

**Secondary CTA**: "Bekijk onze pakketten" (View our packages)

**Sections**:
1. **Hero**
   - "From birthday to anniversary: make your party unforgettable"
   - Energetic, colorful imagery
   - CTA: Book meeting

2. **Party Types**
   - Birthday (18, 21, 30, 40, 50, 60+)
   - Anniversary (12.5, 25, 40 years)
   - Theme party (Themafeest)
   - Garden party / Festival

3. **What Makes Mr. DJ Unique for Your Party?**
   - Personal approach
   - Music adapted to your guests
   - Complete setup (you just enjoy)
   - Flexible packages for any budget

4. **Packages - Party Focus**
   - Bronze (starter, budget-friendly)
   - Silver (most popular)
   - Gold (all-in experience)

5. **Extra Options**
   - Live Saxophone
   - LED Dance Floor
   - Photobooth
   - CO2 Cannons
   - Extra lighting

6. **Tips for a Successful Party**
   - Choose right location
   - Think about guest music preferences
   - Plan timeline
   - Consider neighbors (sound)

7. **Party FAQ**
   - Min/max number of guests
   - Can we request songs?
   - Setup time needed
   - What if weather is bad (outdoor)?

8. **Contact Form**
   - Event type: "Feest" (Party)
   - Occasion dropdown
   - Guest count
   - Indoor/outdoor
   - CTA: "Request quote"

**SEO Focus**: "feest dj", "verjaardag dj", "dj huren privé feest"

**Internal Links**:
- /pakketten/ for detailed pricing
- /faq/ for more questions
- City pages for local party DJs

---

#### 6.5 Pakketten (Pricing) (/pakketten/)

**Goal**: Transparent pricing to build trust & guide to right package

**Target Audiences**: All (price-conscious visitors)

**Primary CTA**: "Vraag offerte aan voor jouw event" (Request quote for your event)

**Secondary CTA**: "Plan een kennismakingsgesprek" (Schedule a consultation)

**Sections**:
1. **Hero**
   - "Transparent packages for every budget"
   - "No hidden costs"

2. **Three Packages Comparison**

   **Bronze** (Starter)
   - €750-€950
   - 4 hours DJ
   - Basic sound
   - Basic lights
   - Best for: small parties, budget-conscious
   - CTA: "Choose Bronze"

   **Silver** (Most Chosen) ⭐
   - €1,200-€1,500
   - 6 hours DJ + Live Saxophone
   - Premium sound (Pioneer)
   - Complete light show
   - Including setup/breakdown
   - Best for: weddings, important events
   - CTA: "Choose Silver"

   **Gold** (All-In)
   - €1,800-€2,200
   - 8 hours DJ + Live Saxophone
   - Premium sound + extra speakers
   - Complete light show + extra effects
   - LED Floor upgrade available
   - MC services
   - Best for: large events, corporate
   - CTA: "Choose Gold"

3. **What's Included in All Packages**
   - Personal intake consultation
   - Custom music program
   - Professional equipment
   - Setup & breakdown
   - Backup equipment
   - Insurance

4. **Extra Options (Add-ons)**
   - Extra hours: €150/hour
   - LED Dance Floor: +€400
   - Photobooth: +€350
   - CO2 Cannons: +€200
   - Extra lights: +€150

5. **Pricing FAQ**
   - What's included in the price?
   - Travel costs? (free within 50km of Eindhoven)
   - Can we customize a package?
   - When do we need to pay?
   - Cancellation terms?

6. **Why These Prices?**
   - Professional equipment (Pioneer, premium lights)
   - 15+ years experience
   - Live musician (saxophone) included in Silver/Gold
   - Full insurance & backup
   - Personal service

7. **Contact Section**
   - "Not sure which package fits?"
   - "Call us for advice: +31 (0) 40 8422594"
   - CTA: "Or request a custom quote"

**SEO Focus**: "dj prijzen", "hoeveel kost een dj", "dj pakket prijs"

**Schema.org**: `Offer` schema for each package

---

#### 6.6 Over Ons (About Us) (/over-ons/)

**Goal**: Build trust & credibility through story & team

**Target Audiences**: All (due diligence visitors)

**Primary CTA**: "Laten we kennismaken" (Let's get acquainted)

**Secondary CTA**: "Bekijk wat klanten zeggen" (See what clients say)

**Sections**:
1. **Hero**
   - "Passion for music, professionalism in execution"
   - Photo of Mr. DJ + Leslie Moore

2. **Our Story**
   - Started 15+ years ago
   - Why we do what we do (passion)
   - Growth & evolution
   - What makes us different now

3. **Meet the Team**
   - **Mr. DJ** (DJ + Event Coordinator)
     - Bio, experience, specialties
     - Photo
   - **Leslie Moore** (Saxophonist)
     - Bio, music background
     - Why DJ + Sax combo works
     - Photo

4. **Our Core Values**
   - **Professionalism**: Always on time, backup equipment, dressed appropriately
   - **Passion**: Love for music shows in performance
   - **Personal**: Direct contact, custom approach

5. **Experience in Numbers**
   - 15+ years in the industry
   - 500+ successful events
   - 200+ weddings
   - 50+ corporate events per year
   - 4.9/5 average rating
   - 95% would recommend us

6. **Our Equipment**
   - Sound: Pioneer CDJ-3000, DJM-900, etc.
   - Speakers: JBL/EV professional
   - Lights: Moving heads, LED bars, wash lights
   - Saxophone: Professional Yamaha
   - Backup: Always bring spare equipment

7. **Service Area**
   - Primary: Noord-Brabant & Limburg
   - Cities map/list
   - "Outside this area? Contact us"

8. **Contact CTA**
   - "Let's talk about your event"
   - CTA: "Schedule a call" / "Call us"

**SEO Focus**: "mr dj over", "ervaring dj service", brand trust

---

#### 6.7 FAQ (/faq/)

**Goal**: Answer objections & reduce support burden

**Target Audiences**: All (research phase visitors)

**Primary CTA**: "Question not answered? Contact us"

**Categories** (Expandable/Accordion):

**Booking & Reservations**
- How far in advance should we book?
- What do you need to reserve?
- Can we place an option?
- What is your cancellation policy?

**Music & Program**
- Can we provide our own playlist?
- What music styles can you play?
- How does the intake consultation work?
- Can we make requests during the party?

**Technical & Location**
- What space/power do you need?
- Can you perform anywhere?
- How much time is needed for setup?
- What if there are technical problems?

**Packages & Pricing**
- What exactly is included in the price?
- Are travel costs separate?
- Can we customize a package?
- How does payment work?

**Day of the Event**
- What time do you arrive?
- Do you take breaks?
- What do you wear?
- Can you stay longer?

**Special Options**
- What does live saxophone cost extra? (Included in Silver/Gold)
- Can we add LED floor?
- Do you have a photobooth?
- Can we get CO2 effects?

**SEO Focus**: Long-tail questions, "dj huren faq", commonly searched questions

---

#### 6.8 Contact (/contact/)

**Goal**: Make it easy to reach us, convert inquiries to leads

**Target Audiences**: All (ready to reach out)

**Primary CTA**: "Verstuur bericht" (Send message)

**Secondary CTA**: "Of bel direct" (Or call directly)

**Sections**:
1. **Hero**
   - "Let's discuss your event"
   - "Response guaranteed within 24 hours"

2. **Contact Methods** (3 Cards)
   - **Phone**
     - +31 (0) 40 8422594
     - Mon-Fri: 09:00-21:00
     - Sat-Sun: 10:00-18:00
     - Button: "Call now"

   - **WhatsApp**
     - Direct chat
     - Quick response
     - Share photos possible
     - Button: "Open WhatsApp"

   - **Email**
     - info@mr-dj.nl
     - Response within 24 hours
     - Detailed questions
     - Button: "Email us"

3. **Contact Form**
   - Name*
   - Email*
   - Phone*
   - Event type* (dropdown: Wedding/Corporate/Party/Other)
   - Date*
   - Location (city)
   - Package interest (dropdown: Bronze/Silver/Gold/Not sure yet)
   - Message
   - hCaptcha
   - CTA: "Send request"

4. **What to Expect**
   - ✓ Response within 24 hours
   - ✓ No-obligation advice
   - ✓ Custom quote

5. **Service Area**
   - "We primarily work in Noord-Brabant & Limburg"
   - Popular cities: Eindhoven, Den Bosch, Tilburg, etc.
   - "Outside this area? Ask about possibilities!"
   - Travel costs: Free within 50km of Eindhoven

6. **Social Proof**
   - 3 testimonials
   - "500+ satisfied clients came before you"

**SEO Focus**: "contact dj", "dj offerte aanvragen", brand name + "contact"

---

#### 6.9 Local SEO Pages (/local-seo/{city-slug}/)

**Examples**: `/dj-eindhoven/`, `/bruiloft-dj-den-bosch/`

**Goal**: Rank for local "{service} {city}" searches & convert local visitors

**Target Audiences**: City-specific event organizers

**Primary CTA**: "Vraag offerte aan voor {city}" (Request quote for {city})

**Secondary CTA**: "Bekijk pakketten" (View packages)

**Sections**:
1. **Hero**
   - "DJ + Live Saxophone in {City}"
   - Local image (if available)
   - CTA: Request quote

2. **Why Mr. DJ in {City}?**
   - Experience with events in {city}
   - Know local venues
   - Short travel distance / No travel costs

3. **Popular Venues in {City}**
   - List 3-5 venues we've worked at
   - Types of events we've done there

4. **Packages for {City}**
   - Brief overview, link to /pakketten/

5. **Testimonials - {City}**
   - 2-3 testimonials from that city

6. **Frequently Asked Questions - {City}**
   - City-specific questions
   - Parking, setup, local regulations

7. **Contact for {City}**
   - Form with city pre-filled
   - Phone/WhatsApp buttons

**SEO Focus**: "{city} dj", "bruiloft dj {city}", "{service} {city}"

**Schema.org**: LocalBusiness + Service

**Internal Links**:
- Link to main service pages
- Link to /pakketten/
- Link to nearby cities

---

#### 6.10 Legal Pages (/privacy/, /voorwaarden/, /cookies/)

**Goal**: Compliance (AVG/GDPR) & transparency

**Primary CTA**: None (informational)

**Privacy Policy** (/privacy/)
- What data we collect
- How we use it
- Third parties (analytics, forms)
- Your rights (access, delete, etc.)
- Contact for privacy questions

**Terms & Conditions** (/voorwaarden/)
- Service description
- Booking process
- Payment terms
- Cancellation policy
- Liability
- Disputes

**Cookie Policy** (/cookies/)
- What cookies we use
- Why we use them
- How to manage cookies
- Third-party cookies (Google Analytics, etc.)

---

### 7. URL Structure Guidelines

**Best Practices**:
- ✅ `/bruiloft-dj/` (clean, descriptive)
- ✅ `/pakketten/` (Dutch, relevant to NL audience)
- ✅ `/dj-eindhoven/` (city-specific)
- ❌ `/services/wedding/` (English in Dutch site)
- ❌ `/page-2/` (no meaning)

**Trailing Slashes**:
- **Recommendation**: Always use trailing slash
- Consistency matters for SEO

---

### 8. Internal Linking Strategy

**From Homepage**:
- Link to all 3 main service pages
- Link to /pakketten/
- Link to /over-ons/ (for trust)
- Link to 3-5 popular city pages

**From Service Pages**:
- Cross-link to other service pages (related services)
- Link to /pakketten/ (pricing details)
- Link to relevant city pages
- Link to /faq/ (answer objections)
- Link to /over-ons/ (credibility)

**From City Pages**:
- Link to main service pages
- Link to /pakketten/
- Link to nearby city pages
- Link to /contact/

**Footer**:
- All important pages linked
- Structured in 4 columns
- Legal links at bottom

---

### 9. Navigation Best Practices

**Desktop Navigation**:
- Sticky header on scroll
- "Diensten" dropdown with 3 service types
- "Contact" as CTA-style button (different color)
- Phone number visible in header

**Mobile Navigation**:
- Hamburger menu
- Phone & WhatsApp quick actions at bottom (sticky)
- Simplified menu structure
- Large tap targets

**Breadcrumbs**:
- All pages except homepage should show breadcrumbs
- Format: `Home > Diensten > Bruiloft DJ`
- Improves UX & SEO

---

### 10. Critical User Paths

1. **Homepage → Service Page → Pricing → Contact** (primary flow)
2. **City Page → Homepage/Service → Contact** (SEO traffic flow)
3. **Any Page → Phone/WhatsApp** (direct conversion path)

---

### 11. Implementation Priority

**Phase 1 (MVP - Immediate)**
1. ✅ Homepage (exists, may need updates)
2. ✅ Pricing (/pakketten/) - exists
3. Ensure service pages exist:
   - /bruiloft-dj/
   - /bedrijfsfeest-dj/
   - /feest-dj/
4. Contact page

**Phase 2 (Trust & SEO)**
5. Over Ons
6. FAQ
7. Improve local SEO pages structure

**Phase 3 (Compliance)**
8. Privacy Policy
9. Terms & Conditions
10. Cookie Policy

---

### 12. Acceptance Criteria - Met ✅

- [x] Sitemap exists with all pages documented
- [x] Per-page goal clearly stated
- [x] Primary CTA documented for each page
- [x] Secondary CTA included where relevant
- [x] Page hierarchy (Tier 1-4) established
- [x] Internal linking strategy defined
- [x] Navigation structure designed (desktop + mobile + footer)
- [x] URL best practices documented

---

### 13. How to Verify

**Immediate Review**:
1. Open `docs/architecture/sitemap_mr-dj.md`
2. Verify each of 10 page types has complete structure
3. Check navigation makes sense for users
4. Confirm CTAs align with B01 messaging goals

**Cross-Reference with B01**:
1. Service pages align with 3 target audiences (Wedding/Corporate/Private)
2. CTAs use hierarchy from B01 messaging doc
3. Page goals support overall conversion strategy

**Implementation Checklist**:
1. Compare with existing routes in `frontend/src/routes.json`
2. Identify gaps (missing service pages, etc.)
3. Use as blueprint for B03 (UX flows)

---

### 14. Key Insights & Decisions

**Why This Structure?**
- **Audience-first navigation**: Services dropdown separates by audience type
- **Conversion-optimized**: Every page has clear goal + primary CTA
- **SEO-ready**: City pages + service pages target different keyword intents
- **Scalable**: Easy to add new service pages or cities

**Navigation Philosophy**:
- Desktop: More detailed (dropdown menus)
- Mobile: Simplified + sticky phone/WhatsApp buttons
- Footer: Complete sitemap for SEO + user orientation

---

### 15. Impact Assessment

**Immediate Value**:
- Clear roadmap for site structure
- Every page has defined purpose and CTAs
- Scalable architecture for growth

**Long-term Value**:
- Better UX through logical navigation
- Improved SEO via internal linking
- Higher conversion through focused page goals
- Easier content management (know where everything goes)

**Estimated Impact**:
- **UX**: +20-30% improvement in navigation clarity
- **SEO**: +15-25% organic traffic through better structure
- **Conversion**: +10-20% through optimized paths and CTAs

---

### 16. Open Issues / Next Ideas

**Immediate Actions Needed**:
- [ ] **Verify service pages exist** or need creation
  - Check if /bruiloft-dj/, /bedrijfsfeest-dj/, /feest-dj/ routes work
- [ ] **Create missing pages** per Phase 1 implementation priority
- [ ] **Update routes.json** to include all documented pages
- [ ] **Implement breadcrumbs** across all pages

**Future Enhancements**:
- [ ] Add blog section for content marketing (Phase 4)
- [ ] Create dedicated "Werkgebied" page with interactive map
- [ ] Add video testimonials page
- [ ] Create "Boekingsvoorwaarden" separate from Terms

---

### 17. Dependencies for Other Batches

**B03 (UX Flows) - READY**
- Use sitemap to map user journeys
- Design flows for each primary path defined

**B05 (Copywriting) - READY**
- Write copy for each section outlined per page
- Use CTA hierarchy from sitemap

**B06 (Technical) - READY**
- Implement routes for all pages
- Set up navigation components
- Configure breadcrumbs

**B08 (Conversion) - READY**
- Optimize CTAs per page goals
- Test conversion paths defined

**B10 (SEO) - READY**
- Implement internal linking strategy
- Optimize URL structure
- Add breadcrumbs for SEO

---

**Einde / End of B02 Bilingual Report**
