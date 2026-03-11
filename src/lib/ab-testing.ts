/**
 * A/B Testing Framework for Mr. DJ Frontend
 *
 * Cookie-based variant assignment with DataLayer conversion tracking.
 * No database required — results stored in /tmp and tracked via GA4 events.
 */

export interface Experiment {
  id: string;
  name: string;
  variants: Variant[];
  /** Traffic percentage allocated to this experiment (0-100) */
  trafficPercent: number;
  /** Whether the experiment is active */
  active: boolean;
}

export interface Variant {
  id: string;
  name: string;
  /** Weight for random assignment (higher = more traffic) */
  weight: number;
}

/* ------------------------------------------------------------------ */
/*  Experiment Definitions                                             */
/* ------------------------------------------------------------------ */

export const experiments: Experiment[] = [
  {
    id: "hero_cta_text",
    name: "Hero CTA tekst",
    active: true,
    trafficPercent: 100,
    variants: [
      { id: "control", name: "Check beschikbaarheid", weight: 50 },
      { id: "variant_a", name: "Vraag vrijblijvend aan", weight: 25 },
      { id: "variant_b", name: "Plan jullie feest", weight: 25 },
    ],
  },
  {
    id: "social_proof_position",
    name: "Social proof positie",
    active: true,
    trafficPercent: 100,
    variants: [
      { id: "control", name: "Onder hero", weight: 50 },
      { id: "variant_a", name: "Boven hero", weight: 50 },
    ],
  },
  {
    id: "pricing_display",
    name: "Prijsweergave",
    active: true,
    trafficPercent: 100,
    variants: [
      { id: "control", name: "Vanaf prijs", weight: 50 },
      { id: "variant_a", name: "Per uur prijs", weight: 50 },
    ],
  },
  {
    id: "contact_form_steps",
    name: "Contact formulier stappen",
    active: false,
    trafficPercent: 50,
    variants: [
      { id: "control", name: "3-staps wizard", weight: 50 },
      { id: "variant_a", name: "Single page", weight: 50 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Cookie helpers                                                      */
/* ------------------------------------------------------------------ */

export const AB_COOKIE_PREFIX = "mrdj_ab_";
export const AB_SESSION_COOKIE = "mrdj_ab_session";

/**
 * Weighted random variant selection.
 * Deterministic when given a seed (hash of session ID + experiment ID).
 */
export function pickVariant(experiment: Experiment, seed?: number): Variant {
  const total = experiment.variants.reduce((sum, v) => sum + v.weight, 0);
  const rand = seed !== undefined ? (seed % total) : Math.floor(Math.random() * total);
  let cumulative = 0;
  for (const variant of experiment.variants) {
    cumulative += variant.weight;
    if (rand < cumulative) return variant;
  }
  return experiment.variants[0];
}

/**
 * Simple string hash for deterministic variant assignment.
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Get active experiments only.
 */
export function getActiveExperiments(): Experiment[] {
  return experiments.filter((e) => e.active);
}

/**
 * Get experiment by ID.
 */
export function getExperiment(id: string): Experiment | undefined {
  return experiments.find((e) => e.id === id);
}

/* ------------------------------------------------------------------ */
/*  Client-side helpers                                                 */
/* ------------------------------------------------------------------ */

/**
 * Read variant assignment from cookie (client-side).
 */
export function getClientVariant(experimentId: string): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";").map((c) => c.trim());
  const prefix = `${AB_COOKIE_PREFIX}${experimentId}=`;
  const cookie = cookies.find((c) => c.startsWith(prefix));
  return cookie ? cookie.slice(prefix.length) : null;
}

/**
 * Track A/B test conversion event via DataLayer.
 */
export function trackABConversion(
  experimentId: string,
  variantId: string,
  conversionType: string,
): void {
  try {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "ab_conversion",
        ab_experiment: experimentId,
        ab_variant: variantId,
        ab_conversion_type: conversionType,
      });
    }
  } catch {
    // fail silently
  }
}

/**
 * Track A/B test impression (variant seen by user).
 */
export function trackABImpression(
  experimentId: string,
  variantId: string,
): void {
  try {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "ab_impression",
        ab_experiment: experimentId,
        ab_variant: variantId,
      });
    }
  } catch {
    // fail silently
  }
}
