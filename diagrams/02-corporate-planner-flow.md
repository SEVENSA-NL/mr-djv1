# Corporate Planner User Journey | Bedrijfsfeest Planner User Journey

**Source**: B03 - UX Flows & User Journeys
**Persona**: Corporate Planner (30-50 jaar, HR Manager, ROI-gericht)
**Conversion Goal**: lead_submitted event (persona_type: corporate)

## Flow Diagram

```mermaid
graph TD
    A[Google Search: bedrijfsfeest dj eindhoven] --> B{Entry Point}
    B -->|Organic| C[Homepage]
    B -->|Paid| D[Bedrijfsfeest DJ Landing Page]
    B -->|Referral| E[Direct naar Bedrijfsfeest page]

    C --> F[Event Type Selector: BEDRIJFSFEEST]
    D --> F
    E --> F

    F --> G[Bedrijfsfeest DJ Service Page]

    G --> H{Decision Point 1: Corporate ervaring?}
    H -->|Not Clear| I[Scroll to Corporate Clients]
    H -->|Clear| J[CTA: Vraag Offerte Aan]

    I --> K[See Logos: Philips, ASML, VDL]
    K --> L{Decision Point 2: Professioneel genoeg?}
    L -->|Not Yet| M[Check testimonials + Over Ons]
    L -->|Yes| J

    M --> N[Corporate testimonials: HR testimonial]
    N --> J

    J --> O{Decision Point 3: Prijs check?}
    O -->|Yes, check first| P[Navigate to Pakketten]
    O -->|No, direct quote| Q[Contact Form]

    P --> R[Pakketten Page]
    R --> S{Decision Point 4: Budget fit?}
    S -->|Basic need| T[Zilver pakket]
    S -->|Premium| U[Goud pakket - Corporate favorite]

    T --> Q
    U --> Q

    Q --> V[Fill Corporate Contact Form]
    V --> W[Form Fields:<br/>- Bedrijfsnaam*<br/>- Contactpersoon*<br/>- Email*<br/>- Telefoon*<br/>- Event type: Bedrijfsfeest<br/>- Datum*<br/>- Aantal werknemers<br/>- Budget indicatie<br/>- Factuur adres nodig?]
    W --> X[Submit Form]
    X --> Y[GA4: lead_submitted, persona_type: corporate]

    Y --> Z[Thank You Page]
    Z --> AA[Offerte binnen 24u via email]

    style Y fill:#00AEEF,stroke:#1A2C4B,stroke-width:3px
    style U fill:#D4AF37,stroke:#1A2C4B,stroke-width:2px
    style H fill:#FFE5E5,stroke:#FF6B6B,stroke-width:2px
    style L fill:#FFE5E5,stroke:#FF6B6B,stroke-width:2px
    style O fill:#FFE5E5,stroke:#FF6B6B,stroke-width:2px
    style S fill:#FFE5E5,stroke:#FF6B6B,stroke-width:2px
```

## Decision Points

1. **Corporate ervaring?** - B2B client logos, case studies
2. **Professioneel genoeg?** - Certifications, insurance, HR testimonials
3. **Prijs check?** - Transparent pricing vs. custom quote
4. **Budget fit?** - Package selection (Goud most popular for corporate)

## Success Metrics

| Metric | Target |
|--------|--------|
| Overall Conversion Rate | >12% |
| Goud Package Selection | >60% |
| Avg. Time to Conversion | <10 min |
| Contact Form Submit Rate | >80% |

## Optimization Opportunities

- Display logos of major corporate clients (Philips, ASML, VDL)
- HR Manager testimonials with photos
- "Offerte binnen 24u" guarantee
- Professional tone and business-focused copy
- Include factuur + payment terms information
