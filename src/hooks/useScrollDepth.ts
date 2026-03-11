"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/src/utils/tracking";

const THRESHOLDS = [25, 50, 75, 100] as const;

/**
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%).
 * Each threshold fires exactly once per page load.
 */
export function useScrollDepth(): void {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold);
          trackEvent("scroll_depth", { depth: `${threshold}%` });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
