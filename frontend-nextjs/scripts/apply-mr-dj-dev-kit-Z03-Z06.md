# Script: apply-mr-dj-dev-kit-Z03–Z06 (All-in-one prompt voor agentic AI)

Context (hard):
- Repo: /srv/apps/mr-dj-site (of vergelijkbare root)
- Frontend: Next.js app router (frontend-nextjs)
- Deze ZIP bevat:
  - Z03: formulieren + datamodellen (src/forms, src/components/forms)
  - Z04: design tokens, layout & sections (mr-dj-theme, MrDjLayout, MrDjHero, etc.)
  - Z05: NL-page skeletons (app/(nl)/.../page.skeleton.tsx)
  - Z06: integratiehooks van Z03-formulieren in deze pagina's

Doel:

1. De huidige Next.js marketing-site van Mister DJ visueel alignen met de Event DJ brochure.
2. Alle NL-pagina's (/nl, /nl/bruiloften, etc.) voorzien van goede skeletons met Z03-formulieren.
3. Formulieren koppelen aan echte submit-logica (API/mail/CRM) zonder regressies.
4. Basis QA-run uitvoeren (build + route-check).

## Stappen voor deze sessie

1) CWD & structuur valideren
   - cd naar de frontend-root (bijv. /srv/apps/mr-dj-site/frontend-nextjs).
   - Controleer dat de volgende bestanden bestaan (pad eventueel aanpassen naar jouw setup):
     - src/design/mr-dj-theme.ts
     - src/components/layout/MrDjLayout.tsx
     - src/components/sections/MrDjHero.tsx
     - src/components/forms/AvailabilityForm.tsx
     - src/forms/AvailabilityRequest.ts
     - app/(nl)/page.skeleton.tsx
   - Als alias `@/src` nog niet is geconfigureerd in tsconfig.json, pas imports in deze kit
     tijdelijk aan naar relatieve paden (bijv. ../../components/forms/...).

2) Z04 – Layout & sections integreren
   - Zorg dat MrDjLayout als basislayout wordt gebruikt voor de NL-site:
     - Integreer in app/(nl)/layout.tsx of equivalent.
   - Verifieer dat MrDjHero, MrDjServices, MrDjPackages, MrDjTestimonials, MrDjGallery,
     MrDjContact zonder TypeScript-fouten importeerbaar zijn.
   - Pas mr-dj-theme.ts desgewenst aan op de echte brandkleuren en fonts
     (gebruik de Event DJ brochure als referentie). Toon een compacte diff.

3) Z05 – NL-page skeletons mergen/hernoemen
   - Voor elke skeleton:
     - app/(nl)/page.skeleton.tsx
     - app/(nl)/bruiloften/page.skeleton.tsx
     - app/(nl)/bedrijfsfeesten/page.skeleton.tsx
     - app/(nl)/feesten-overig/page.skeleton.tsx
     - app/(nl)/impressies/page.skeleton.tsx
     - app/(nl)/mister-dj/page.skeleton.tsx
     - app/(nl)/veelgestelde-vragen/page.skeleton.tsx
     - app/(nl)/contact/page.skeleton.tsx
   - Als er nog géén page.tsx in de map bestaat:
       - Hernoem page.skeleton.tsx → page.tsx en fix imports (alias/relatief).
   - Als er al een page.tsx bestaat:
       - Merge de relevante layout/section/formulier-hooks in de bestaande file.
   - Houd altijd MrDjLayout als outer wrapper.

4) Z03 – Formulieren afmaken & koppelen
   - Controleer per formuliercomponent dat props/types kloppen:
     - AvailabilityForm ↔ AvailabilityRequest
     - IntroCallForm ↔ IntroCallRequest
     - WeddingIntakeForm ↔ WeddingIntake
     - FairOfferForm ↔ FairOfferRequest
     - OpeningDanceMixForm ↔ OpeningDanceMixRequest
   - Vervang de console.log-onSubmit handlers stap voor stap door echte logica, bij voorkeur:
     - Next.js route handlers in app/api/mr-dj/...
     - of bestaande backend/mail-bridge.
   - Begin met:
     - AvailabilityForm (homepage, contact, bruiloften, bedrijfsfeesten, feesten-overig),
     - IntroCallForm (bedrijfsfeesten),
     - WeddingIntakeForm + OpeningDanceMixForm (bruiloften).
   - Documenteer kort welke API-routes je hebt aangemaakt en welke velden worden doorgestuurd.

5) Content-TODO's markeren en evt. alvast invullen
   - In de skeletons staan TODO-comments voor bruiloft-/bedrijfsfeest-teksten, bio, FAQ, etc.
   - Laat TODO's staan, maar voeg waar mogelijk al neutrale, kloppende placeholdertekst toe
     op basis van de bestaande inhoud (zonder ongefundeerde claims).
   - Maak een kort rapport (bijv. docs/mr-dj-content-TODOs.md) met:
     - Pagina → lijst van benodigde content (herkomst: bestaande brochure, site, nieuwe teksten).

6) QA-run (build + route-check)
   - Voer een build uit, bijv.:
       - pnpm lint
       - pnpm build
   - Los TypeScript- en import-errors op die direct voortkomen uit deze kit
     (maar doe geen grote refactors buiten scope).
   - Controleer dat de volgende routes zonder fouten renderen:
     - /nl
     - /nl/bruiloften
     - /nl/bedrijfsfeesten
     - /nl/feesten-overig
     - /nl/impressies
     - /nl/mister-dj
     - /nl/veelgestelde-vragen
     - /nl/contact
   - Rapporteer kort in de console en/of een markdown-rapport (bijv. reports/qa/mrdj/Z03-Z06-status.md):
     - Buildstatus (ok / fout + kernoorzaken)
     - Welke pagina's succesvol gerenderd zijn
     - Resterende TODO's voor content/SEO.

## Regels

- Geen massale deletes of zware refactors buiten deze layout/forms/pages om.
- Toon alleen compacte diffs en relevante codefragmenten, geen volledige file dumps.
- Werk incrementieel: eerst imports/aliases fixen, dan layout/sections, dan formulieren, dan content, dan QA.
