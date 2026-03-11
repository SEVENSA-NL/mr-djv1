/**
 * Programmatic SEO: Event Type × City combinations
 *
 * Generates 21 long-tail landing pages targeting searches like:
 * "DJ bruiloft Eindhoven", "DJ bedrijfsfeest Tilburg", etc.
 */

import { cities } from "./cities";

export interface SEOPage {
  slug: string;
  eventType: "bruiloft" | "bedrijfsfeest" | "feest";
  eventLabel: string;
  citySlug: string;
  cityName: string;
  region: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  bulletPoints: string[];
  relatedPages: string[];
}

const eventTypes = [
  {
    type: "bruiloft" as const,
    label: "Bruiloft",
    plural: "bruiloften",
    introTemplate: (city: string) =>
      `Op zoek naar een bruilofts-DJ in ${city}? Mister DJ maakt van jullie trouwdag een onvergetelijk feest. Met meer dan 15 jaar ervaring en 2500+ feesten weten we precies hoe we de perfecte sfeer creëren — van de ceremonie tot het slotfeest.`,
    bullets: [
      "Persoonlijke kennismaking en muziekvragenlijst",
      "Professioneel geluid afgestemd op de locatie",
      "Sfeervolle lichtshow inclusief uplights",
      "Naadloze begeleiding van ceremonie tot feest",
      "Openingsdans-mix op maat mogelijk",
      "100% dansgarantie — gegarandeerd volle dansvloer",
    ],
  },
  {
    type: "bedrijfsfeest" as const,
    label: "Bedrijfsfeest",
    plural: "bedrijfsfeesten",
    introTemplate: (city: string) =>
      `Zoek je een DJ voor een bedrijfsfeest in ${city}? Van personeelsfeest tot jubileum, van borrel tot gala — Mister DJ levert professioneel entertainment dat past bij jullie bedrijfscultuur. Ervaren, betrouwbaar en altijd op maat.`,
    bullets: [
      "Professionele uitstraling die past bij jullie bedrijf",
      "Muziek voor alle leeftijden en smaken",
      "Geluidsinstallatie geschikt voor 50 tot 500+ gasten",
      "Optionele extra's: photobooth, saxofonist, LED-dansvloer",
      "Factuur op bedrijfsnaam mogelijk",
      "Op- en afbouw zonder gedoe",
    ],
  },
  {
    type: "feest" as const,
    label: "Feest",
    plural: "feesten",
    introTemplate: (city: string) =>
      `Een feest organiseren in ${city}? Mister DJ maakt van elk feest een succes! Verjaardag, jubileum, familiefeest of gewoon een knalfeest — wij zorgen voor de perfecte muziek, het mooiste licht en een onvergetelijke sfeer.`,
    bullets: [
      "Geschikt voor elk type feest en locatie",
      "Alle muziekgenres van oldies tot de nieuwste hits",
      "Compleet geluid- en lichtpakket inbegrepen",
      "Flexibele pakketten vanaf €950",
      "Extra uur bijboeken voor slechts €75",
      "Persoonlijke voorbereiding met muziekwensen",
    ],
  },
];

export function generateSEOPages(): SEOPage[] {
  const pages: SEOPage[] = [];

  for (const event of eventTypes) {
    for (const city of cities) {
      const slug = `dj-${event.type}-${city.slug}`;
      pages.push({
        slug,
        eventType: event.type,
        eventLabel: event.label,
        citySlug: city.slug,
        cityName: city.name,
        region: city.region,
        h1: `DJ ${event.label} in ${city.name}`,
        metaTitle: `DJ ${event.label} ${city.name} - Mister DJ | 100% Dansgarantie`,
        metaDescription: `${event.label}s-DJ in ${city.name} nodig? Mister DJ verzorgt ${event.plural} in ${city.name} en omgeving. 15+ jaar ervaring, 9.8 gemiddeld beoordeeld. Vraag beschikbaarheid aan.`,
        intro: event.introTemplate(city.name),
        bulletPoints: event.bullets,
        relatedPages: [
          `/nl/dj-${city.slug}`,
          `/nl/${event.plural}`,
          ...city.nearby.slice(0, 2).map((n) => `/nl/dj-${event.type}-${n}`),
        ],
      });
    }
  }

  return pages;
}

export const seoPages = generateSEOPages();

export function getSEOPageBySlug(slug: string): SEOPage | undefined {
  return seoPages.find((p) => p.slug === slug);
}
