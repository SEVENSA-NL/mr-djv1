# Mr. DJ Design Status (Dec 2025)

## Current live experience (mr-dj.sevensa.nl)
- Hero rebuilt with framer-motion, proof badge, stats, dual CTA + WhatsApp.
- Sticky navigation added (brand tag, services/pakketten/steden links, WhatsApp + CTA).
- Highlights section (signature sax+DJ, production, event manager).
- Pricing preview (existing component), city coverage grid (12+ cities badge), social proof.
- Footer with contact CTA and email/WhatsApp.
- Brand styling: Space Grotesk, deep navy/teal/gold palette, gradient background, glassmorphism cards.

## Outstanding design items (from roadmap Phase B)
- Services detail pages `/diensten/*`: add persona snippets, proof bars, FAQs per service.
- Pricing page `/pakketten`: strengthen package visual hierarchy and WhatsApp/phone tracking.
- Add gallery/video testimonial embed + FAQ accordion with tracking.
- Enhance breadcrumbs/ARIA on inner pages; ensure EN/NL copy parity on new sections.

## Technical notes
- Navigation, highlights, cities, footer now wired into `app/[locale]/page.tsx`.
- Translations updated (`messages/en.json`, `messages/nl.json`) for all new sections.
- ACME/ingress: mr-dj isolated on Traefik (default namespace only) with dedicated resolver.

## Next design pass (suggested)
1) Service pages: persona cards, structured data per service, FAQ accordion with a11y+tracking.
2) Pricing: add comparison table hero + “call us now” micro CTA (WhatsApp + tel) per tier.
3) Gallery/testimonials: carousel with video thumbnail, capture click/scroll depth events.
