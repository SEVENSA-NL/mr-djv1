# Mr. DJ - Mermaid Diagrams

This folder contains standalone Mermaid diagram files for the Mr. DJ project.

## User Journey Flows

These diagrams map the 3 primary user journeys through the Mr. DJ website, based on the **B03 - UX Flows & User Journeys** report.

### 1. Wedding Couple Flow
**File**: `01-wedding-couple-flow.md`

- **Persona**: Bruidspaar (25-35 jaar, emotioneel, perfectie-gericht)
- **Entry Points**: Google search (bruiloft dj brabant), paid ads, city SEO pages
- **Key Decision Points**:
  - Is deze DJ geschikt?
  - Trustworthy?
  - Welk pakket?
  - Beschikbaar op datum?
- **Primary Package**: Zilver (€1200-1500) - 50%+ selection target
- **Conversion Target**: >8%

### 2. Corporate Planner Flow
**File**: `02-corporate-planner-flow.md`

- **Persona**: HR Manager / Event Coördinator (30-50 jaar, ROI-gericht)
- **Entry Points**: Google search (bedrijfsfeest dj), paid ads, referrals
- **Key Decision Points**:
  - Corporate ervaring?
  - Professioneel genoeg?
  - Prijs check?
  - Budget fit?
- **Primary Package**: Goud (€1800-2200) - 60%+ selection target
- **Conversion Target**: >12%

### 3. Private Party Flow
**File**: `03-private-party-flow.md`

- **Persona**: Private Party Host (25-60 jaar, verjaardag/jubileum)
- **Entry Points**: Google search (dj huren verjaardag), paid ads, referrals
- **Key Decision Points**:
  - Type feest match?
  - Flexibel genoeg?
  - Budget concerns?
  - Add-ons?
- **Primary Package**: Zilver (45%) or Brons (40%)
- **Conversion Target**: >6%

## How to View

These diagrams use Mermaid.js syntax and can be viewed in:

1. **GitHub**: Automatically renders Mermaid diagrams in .md files
2. **VS Code**: Install "Markdown Preview Mermaid Support" extension
3. **Online**: Copy code to [mermaid.live](https://mermaid.live/)
4. **Obsidian**: Native Mermaid support

## Diagram Legend

- **Blue nodes** (🔵): Conversion events (GA4 tracked)
- **Gold nodes** (🟡): Recommended packages
- **Red nodes** (🔴): Decision points (optimization opportunities)
- **Diamond shapes** (◇): Decision/choice points
- **Rectangle shapes** (▭): Actions/pages

## GA4 Event Tracking

All user journeys culminate in the `lead_submitted` event with custom parameters:

```javascript
{
  event: 'lead_submitted',
  persona_type: 'bruiloft' | 'corporate' | 'feest',
  package_interest: 'brons' | 'zilver' | 'goud',
  event_date: '2025-06-15',
  guest_count: 120,
  flow_source: 'organic' | 'paid' | 'referral'
}
```

## Related Documentation

- `/root/mr-djv1/reports/qa/mrdj/B03_ux_flows_user_journeys_NL-EN_20251203.md` - Full bilingual UX flows report
- `/root/mr-djv1/reports/qa/mrdj/B01_messaging_20251203T153000Z.md` - Persona definitions
- `/root/mr-djv1/reports/qa/mrdj/B08_conversion_optimization_NL-EN_20251203.md` - CRO strategy
- `/root/mr-djv1/reports/qa/mrdj/B11_analytics_tracking_NL-EN_20251203.md` - GA4 implementation

## Updates

- **2025-12-03**: Initial creation of 3 user journey flow diagrams from B03 report
