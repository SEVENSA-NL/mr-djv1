/**
 * Template-based content generation for programmatic SEO.
 *
 * Uses simple template interpolation to generate unique content
 * for each page variant (city × event type × venue).
 */

interface ContentTemplate {
  id: string;
  template: string;
  variables: string[];
}

const templates: ContentTemplate[] = [
  {
    id: "city_intro",
    template: "Op zoek naar een DJ in {{city}}? Mister DJ is de meest ervaren {{eventType}}-DJ in de regio {{region}}. Met meer dan 15 jaar ervaring en een 9.8 gemiddelde beoordeling zorgen wij voor een onvergetelijk feest in {{city}} en omgeving.",
    variables: ["city", "eventType", "region"],
  },
  {
    id: "venue_intro",
    template: "{{venue}} in {{city}} is een van onze favoriete locaties. We hebben hier al {{count}}+ feesten verzorgd en kennen de zaal, de akoestiek en het team. Daardoor kunnen wij het geluid en de sfeer perfect afstemmen.",
    variables: ["venue", "city", "count"],
  },
  {
    id: "pricing_section",
    template: "De kosten voor een {{eventType}} DJ in {{city}} variëren op basis van het gekozen pakket. Onze pakketten starten vanaf €{{basePrice}} en zijn inclusief professioneel geluid, sfeerverlichting en persoonlijke voorbereiding.",
    variables: ["eventType", "city", "basePrice"],
  },
  {
    id: "faq_answer",
    template: "Jazeker! Mister DJ is regelmatig te boeken voor {{eventType}}en in {{city}}. We rijden vanuit Veldhoven en de reiskosten naar {{city}} zijn {{travelCost}}.",
    variables: ["eventType", "city", "travelCost"],
  },
  {
    id: "testimonial_prompt",
    template: "\"Mister DJ heeft ons {{eventType}} in {{venue}} perfect verzorgd. De dansvloer was de hele avond vol!\"",
    variables: ["eventType", "venue"],
  },
  {
    id: "meta_description",
    template: "{{eventType}} DJ in {{city}} nodig? Mister DJ: 15+ jaar ervaring, 9.8 beoordeling, {{packageCount}} pakketten vanaf €{{basePrice}}. Vraag beschikbaarheid aan.",
    variables: ["eventType", "city", "packageCount", "basePrice"],
  },
];

/**
 * Interpolate a content template with given variables.
 */
export function generateContent(
  templateId: string,
  vars: Record<string, string | number>,
): string {
  const tmpl = templates.find((t) => t.id === templateId);
  if (!tmpl) return "";

  let result = tmpl.template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), String(value));
  }
  return result;
}

/**
 * Generate a full content block combining multiple templates.
 */
export function generatePageContent(
  vars: Record<string, string | number>,
  templateIds: string[],
): string[] {
  return templateIds.map((id) => generateContent(id, vars)).filter(Boolean);
}

/**
 * Calculate travel cost based on city.
 * First 40km free, €0.50/km after.
 */
export function calculateTravelCost(citySlug: string): string {
  const distances: Record<string, number> = {
    veldhoven: 0,
    eindhoven: 8,
    helmond: 25,
    tilburg: 35,
    "den-bosch": 45,
    breda: 60,
    weert: 40,
  };
  const km = distances[citySlug] || 50;
  if (km <= 40) return "gratis (binnen 40km)";
  const cost = (km - 40) * 0.5;
  return `€${cost.toFixed(2)} (${km}km)`;
}

/**
 * Generate a unique content hash to detect duplicate content.
 */
export function contentHash(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}
