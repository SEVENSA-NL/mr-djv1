import { useEffect } from "react";
import { initializePostHog, trackPageView as trackPostHogPageView } from "../../lib/analytics/posthog";
import { trackPageView as trackGA4PageView } from "../../lib/analytics/ga4";

type AnalyticsProviderProps = {
  children: React.ReactNode;
};

/**
 * AnalyticsProvider component
 *
 * Initializes both PostHog and GA4 analytics on mount
 * Tracks page views on route changes
 *
 * Should be placed at the root of the app, wrapping all content
 *
 * @example
 * ```tsx
 * <AnalyticsProvider>
 *   <App />
 * </AnalyticsProvider>
 * ```
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialize PostHog on component mount
    initializePostHog();

    // Track initial page view
    const pageName = document.title || window.location.pathname;
    trackPostHogPageView(pageName);
    trackGA4PageView(pageName);

    // Listen for URL changes
    const handlePopState = () => {
      const newPageName = document.title || window.location.pathname;
      trackPostHogPageView(newPageName);
      trackGA4PageView(newPageName);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return <>{children}</>;
}

export default AnalyticsProvider;
