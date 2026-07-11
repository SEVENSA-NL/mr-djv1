'use client';

import { useEffect, useState } from 'react';
import { applyConsent, readConsent, syncGoogleConsent, type ConsentState } from '@/lib/analytics/consent';

type ConsentManagerProps = {
  locale: string;
  gtmId?: string;
};

function loadGtm(gtmId?: string): void {
  if (!gtmId || typeof document === 'undefined' || document.querySelector('script[data-mrdj-gtm]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.dataset.mrdjGtm = gtmId;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.appendChild(script);
}

export default function ConsentManager({ locale, gtmId }: ConsentManagerProps) {
  const [consent, setConsent] = useState<ConsentState | null | undefined>(undefined);
  const isNL = locale === 'nl';

  useEffect(() => {
    const current = readConsent();
    setConsent(current);
    if (current) {
      syncGoogleConsent(current);
      if (current.analytics || current.marketing) loadGtm(gtmId);
    }
  }, [gtmId]);

  const decide = (analytics: boolean, marketing: boolean) => {
    const next = applyConsent(analytics, marketing);
    setConsent(next);
    if (analytics || marketing) loadGtm(gtmId);
  };

  if (consent !== null) return null;

  return (
    <aside
      aria-label={isNL ? 'Cookievoorkeuren' : 'Cookie preferences'}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/20 bg-neutral-950 p-4 text-white shadow-2xl"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-neutral-200">
          {isNL
            ? 'We gebruiken analytics alleen met jouw toestemming. Formulieren blijven werken als je weigert.'
            : 'We use analytics only with your consent. Forms continue to work if you decline.'}
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            className="border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            onClick={() => decide(false, false)}
          >
            {isNL ? 'Weigeren' : 'Decline'}
          </button>
          <button
            type="button"
            className="bg-secondary px-4 py-2 text-sm font-semibold text-neutral-950 hover:bg-secondary/90"
            onClick={() => decide(true, true)}
          >
            {isNL ? 'Accepteren' : 'Accept'}
          </button>
        </div>
      </div>
    </aside>
  );
}
