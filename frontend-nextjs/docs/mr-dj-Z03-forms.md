# Z03 – Mister DJ formulieren & datamodellen

In deze kit zijn de belangrijkste lead- en intakeformulieren voor Mister DJ uitgewerkt:

- AvailabilityForm + AvailabilityRequest
- IntroCallForm + IntroCallRequest
- WeddingIntakeForm + WeddingIntake
- FairOfferForm + FairOfferRequest
- OpeningDanceMixForm + OpeningDanceMixRequest

Richtlijnen:

- Houd de forms technisch simpel (geen externe UI-lib vereist).
- `onSubmit` wordt via props aangereikt; de agent kan dit koppelen aan:
  - Next.js route handlers (`app/api/...`),
  - bestaande backend-endpoints,
  - of een mailer/CRM-integratie.
- De velden zijn afgeleid van de bestaande papieren/PDF-formulieren en de huidige site,
  maar zijn bewust compact gehouden voor web.

Integratiepunten:

- Homepage: AvailabilityForm in MrDjContact.
- Bruiloften: WeddingIntakeForm + OpeningDanceMixForm.
- Bedrijfsfeesten: AvailabilityForm + IntroCallForm.
- Beurs-/actiepagina: FairOfferForm.
