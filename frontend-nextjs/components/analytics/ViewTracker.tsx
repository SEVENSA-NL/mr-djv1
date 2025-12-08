'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics/trackEvent';

type ViewTrackerProps = {
  event: string;
  payload?: Record<string, unknown>;
  children: React.ReactNode;
};

export default function ViewTracker({ event, payload = {}, children }: ViewTrackerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const hasFired = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!hasFired.current && entry.isIntersecting) {
            hasFired.current = true;
            trackEvent(event, payload);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [event, payload]);

  return <div ref={ref}>{children}</div>;
}
