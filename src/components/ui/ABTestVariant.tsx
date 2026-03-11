"use client";

import React, { useEffect, useState } from "react";
import {
  getClientVariant,
  trackABImpression,
  getExperiment,
} from "@/src/lib/ab-testing";

interface ABTestVariantProps {
  experimentId: string;
  variants: Record<string, React.ReactNode>;
  /** Fallback content when variant can't be determined (SSR, etc.) */
  fallback?: React.ReactNode;
}

/**
 * Renders different content based on A/B test variant assignment.
 *
 * Usage:
 * ```tsx
 * <ABTestVariant
 *   experimentId="hero_cta_text"
 *   variants={{
 *     control: <button>Check beschikbaarheid</button>,
 *     variant_a: <button>Vraag vrijblijvend aan</button>,
 *     variant_b: <button>Plan jullie feest</button>,
 *   }}
 * />
 * ```
 */
export const ABTestVariant: React.FC<ABTestVariantProps> = ({
  experimentId,
  variants,
  fallback,
}) => {
  const [variantId, setVariantId] = useState<string | null>(null);

  useEffect(() => {
    const assigned = getClientVariant(experimentId);
    if (assigned) {
      setVariantId(assigned);
      trackABImpression(experimentId, assigned);
    }
  }, [experimentId]);

  // During SSR or before cookie is read, show fallback or control
  if (!variantId) {
    return <>{fallback ?? variants.control ?? null}</>;
  }

  // Show the assigned variant, fall back to control if variant doesn't exist
  return <>{variants[variantId] ?? variants.control ?? null}</>;
};

/**
 * Hook to get the current A/B test variant for an experiment.
 * Returns null during SSR, then the assigned variant ID on client.
 */
export function useABVariant(experimentId: string): string | null {
  const [variantId, setVariantId] = useState<string | null>(null);

  useEffect(() => {
    const assigned = getClientVariant(experimentId);
    if (assigned) {
      setVariantId(assigned);
      trackABImpression(experimentId, assigned);
    }
  }, [experimentId]);

  return variantId;
}
