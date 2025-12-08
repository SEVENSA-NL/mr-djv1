'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics/trackEvent';

type ScrollDepthTrackerProps = {
  page: string;
  thresholds?: number[];
};

export default function ScrollDepthTracker({ page, thresholds = [25, 50, 75, 100] }: ScrollDepthTrackerProps) {
  useEffect(() => {
    const seen = new Set<number>();

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

      thresholds.forEach((threshold) => {
        if (!seen.has(threshold) && progress >= threshold) {
          seen.add(threshold);
          trackEvent('scroll_depth', { page, depth: threshold });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [page, thresholds]);

  return null;
}
