'use client';

import { useEffect, useState } from 'react';
import posthog from 'posthog-js';

/**
 * Hook to check PostHog feature flags for A/B testing
 *
 * @param flagKey - The feature flag key in PostHog
 * @param defaultValue - Default value if flag is not available
 * @returns The feature flag value (boolean, string, or any)
 */
export function useFeatureFlag<T = boolean>(
  flagKey: string,
  defaultValue: T
): T {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    // Check if PostHog is initialized
    if (!posthog || !posthog.__loaded) {
      // Wait for PostHog to load
      const checkInterval = setInterval(() => {
        if (posthog && posthog.__loaded) {
          clearInterval(checkInterval);
          loadFeatureFlag();
        }
      }, 100);

      // Timeout after 3 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        setIsLoading(false);
      }, 3000);

      return () => clearInterval(checkInterval);
    }

    loadFeatureFlag();

    function loadFeatureFlag() {
      try {
        const flagValue = posthog.getFeatureFlag(flagKey);

        if (flagValue !== undefined && flagValue !== null) {
          setValue(flagValue as T);
        }

        // Track that user saw this variant
        posthog.capture('feature_flag_evaluated', {
          flag_key: flagKey,
          flag_value: flagValue,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.warn(`Failed to load feature flag: ${flagKey}`, error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [flagKey, defaultValue]);

  return value;
}

/**
 * Hook for multivariate testing (multiple variants)
 *
 * @param flagKey - The feature flag key
 * @param variants - Array of variant identifiers
 * @param defaultVariant - Default variant if flag is not available
 * @returns Current variant identifier
 */
export function useMultivariateTest(
  flagKey: string,
  variants: string[],
  defaultVariant: string
): string {
  const flagValue = useFeatureFlag<string>(flagKey, defaultVariant);

  // Ensure returned value is one of the valid variants
  return variants.includes(flagValue) ? flagValue : defaultVariant;
}

/**
 * Track conversion for A/B test analysis
 *
 * @param conversionEvent - Name of the conversion event
 * @param metadata - Additional metadata about the conversion
 */
export function trackConversion(
  conversionEvent: string,
  metadata?: Record<string, any>
) {
  if (typeof window === 'undefined' || !posthog) {
    return;
  }

  posthog.capture(conversionEvent, {
    ...metadata,
    timestamp: new Date().toISOString(),
  });
}
