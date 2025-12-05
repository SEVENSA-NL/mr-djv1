import { useEffect, useRef } from "react";
import { isValidPosthogKey, runtimeConfig } from "../../config/runtimeConfig";
import { trackCustomEvent } from "../../lib/analytics/posthog";
import * as GA4 from "../../lib/analytics/ga4";

const isBrowser = typeof window !== "undefined";

type ClickTarget = HTMLElement & { innerText?: string; id?: string };

type TrackingEvent = {
  type: "click" | "form_submit" | "scroll";
  payload: Record<string, unknown>;
};

/**
 * UserBehaviorTracker Component
 *
 * Automatically tracks user interactions:
 * - Button and link clicks
 * - Form submissions
 * - Scroll depth
 *
 * This component should be mounted once at the root of the app
 * and will automatically track events without any manual intervention.
 *
 * @example
 * ```tsx
 * <UserBehaviorTracker />
 * <App />
 * ```
 */
export function UserBehaviorTracker() {
  const scrollThrottleRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollPercentageRef = useRef<number>(0);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const { apiKey } = runtimeConfig.analytics.posthog;

    if (!isValidPosthogKey(apiKey)) {
      if (import.meta.env.MODE !== "production") {
        console.warn(
          "[UserBehaviorTracker] Initialization skipped: no valid API key found in runtime configuration."
        );
      }
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as ClickTarget | null;
      if (!target) {
        return;
      }

      const tagName = target.tagName?.toLowerCase();
      if (tagName === "button" || tagName === "a") {
        const buttonId = target.id || `${tagName}-${Date.now()}`;
        const buttonText = target.innerText ? target.innerText.trim().slice(0, 120) : undefined;

        // Track in both GA4 and PostHog
        GA4.trackButtonClick(buttonId, buttonText);
        trackCustomEvent("user_click", {
          element_type: tagName,
          element_id: buttonId,
          element_text: buttonText,
          url: window.location.href,
        });
      }
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) {
        return;
      }

      const formId = form.id || `form-${Date.now()}`;
      const formAction = form.getAttribute("action") || undefined;

      // Track in both GA4 and PostHog
      GA4.trackFormSubmission(formId, formAction);
      trackCustomEvent("form_submitted", {
        form_id: formId,
        form_action: formAction,
        url: window.location.href,
      });
    };

    const handleScroll = () => {
      // Throttle scroll events
      if (scrollThrottleRef.current) {
        return;
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        return;
      }

      const scrollPercentage = (window.scrollY / scrollableHeight) * 100;
      const roundedPercentage = Math.round(scrollPercentage);

      // Only track if percentage changed significantly
      if (Math.abs(roundedPercentage - lastScrollPercentageRef.current) >= 10) {
        lastScrollPercentageRef.current = roundedPercentage;

        // Track scroll milestone
        const milestone = Math.floor(roundedPercentage / 25) * 25;
        if (milestone > 0 && milestone % 25 === 0) {
          GA4.trackCustomEvent("scroll_milestone", {
            scroll_percentage: roundedPercentage,
            milestone,
          });

          trackCustomEvent("scroll_milestone", {
            scroll_percentage: roundedPercentage,
            milestone,
          });
        }
      }

      scrollThrottleRef.current = setTimeout(() => {
        scrollThrottleRef.current = null;
      }, 1000);
    };

    // Add event listeners
    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up event listeners
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
      window.removeEventListener("scroll", handleScroll);

      // Clean up throttle timer
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }
    };
  }, []);

  return null;
}

export default UserBehaviorTracker;
