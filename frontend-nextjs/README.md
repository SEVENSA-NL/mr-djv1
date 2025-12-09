# Mister DJ – Dev Kit Z03–Z06 (All-in-one)

Doel:
Eén ZIP met alles wat je nodig hebt om mr-dj.sevensa.nl om te bouwen naar een
brochure-consistente, lead-gedreven Next.js site:

- Z03 – Formulieren & datamodellen (Availability, IntroCall, WeddingIntake, FairOffer, OpeningDanceMix)
- Z04 – Design tokens, layout & brochure-sections (Hero, Services, Packages, Testimonials, Gallery, Contact)
- Z05 – NL-page skeletons (/nl, /nl/bruiloften, /nl/bedrijfsfeesten, etc.)
- Z06 – Integratiehooks voor Z03-formulieren in alle relevante pagina’s

Gebruik:
1. Plaats deze ZIP in je frontend-nextjs repo (bijv. /srv/apps/mr-dj-site/frontend-nextjs).
2. Pak hem uit in de root van het frontend-project.
3. Gebruik `scripts/apply-mr-dj-dev-kit-Z03-Z06.md` als superprompt voor je agent
   (Codex/Claude/…); die zorgt voor:
   - het aanpassen van imports naar jouw alias-structuur,
   - het mergen/hernoemen van page-skeletons,
   - het koppelen van formulieren aan API/mail/CRM,
   - en een basis QA-run.
