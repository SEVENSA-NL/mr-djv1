# Z03–Z06 status – Mister DJ Next.js brochure-integratie

- **Build:** OK (`pnpm build` geslaagd op `frontend-nextjs`)
- **Lint:** OK (`pnpm lint` – enkel bestaande warnings in `components/sections/VideoTestimonials.tsx`)

## Routes gecontroleerd (nieuwe NL-brochurepaden)

- `/` → nieuwe Mister DJ home in brochurestijl (MrDjLayout + hero, services, pakketten, testimonials, gallery, contact + AvailabilityForm).
- `/bruiloften` → bruiloft-pagina met services, pakketten, WeddingIntakeForm, OpeningDanceMixForm, testimonials en contact/AvailabilityForm.
- `/bedrijfsfeesten` → bedrijfsfeest-pagina met services, pakketten, AvailabilityForm + IntroCallForm en contact/AvailabilityForm.
- `/feesten-overig` → overige-feesten-pagina met services, AvailabilityForm en testimonials/contact.
- `/impressies` → impressies-pagina met gallery-sectie.
- `/mister-dj` → over-pagina met biografie- en portretblok (placeholder-copy).
- `/veelgestelde-vragen` → FAQ-pagina met accordion-structuur en placeholder-antwoorden.
- `/contact` → contactpagina met contact-intro en AvailabilityForm in MrDjContact-sectie.

> Bestaande meertalige routes onder `/[locale]/**` blijven ongewijzigd en renderen zoals vóór deze Z03–Z06-run. De nieuwe NL-brochurepaden zijn aanvullend en veroorzaken geen build- of type-conflicten.

## Openstaande punten (volgende batches)

- **Formulieren / API-koppeling**
  - Z03-formulieren (Availability, IntroCall, WeddingIntake, FairOffer, OpeningDanceMix) loggen nu waarden via `console.log`.
  - Nog te koppelen aan definitieve API-/mailer-endpoints (`app/api/mr-dj/**` of bestaande backend) + GA4-events.

- **Content**
  - Diverse TODO-comments in de NL-pagina's verwijzen naar bruiloft-/bedrijfsfeest-brochures en bestaande sitecontent.
  - Volledige lijst en prioriteiten staan in `docs/mr-dj-content-TODOs.md`.

- **SEO / structured data**
  - Nieuwe brochurepagina's hebben nog geen specifieke JSON-LD of meta-config; integratie volgt in een aparte SEO-sprint.

- **E2E / regressietests**
  - Huidige Playwright-smoke-tests dekken de `/[locale]/**`-routes.
  - Aanvullende smoke voor de nieuwe `/`, `/bruiloften`, `/bedrijfsfeesten`, `/feesten-overig`, `/mister-dj` en `/contact` routes kan in een volgende batch worden toegevoegd.

