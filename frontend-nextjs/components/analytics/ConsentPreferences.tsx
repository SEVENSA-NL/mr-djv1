'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import {
  readConsentPreferences,
  saveStatisticsConsent,
  type ConsentPreferences as ConsentPreferencesState,
} from '@/lib/analytics/consent';

const deniedPreferences: ConsentPreferencesState = { statistics: false, marketing: false };

export default function ConsentPreferences() {
  const locale = useLocale();
  const isNL = locale === 'nl';
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferencesState>(deniedPreferences);
  const [saveError, setSaveError] = useState(false);
  const firstActionRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const copy = isNL
    ? {
        close: 'Sluiten',
        deny: 'Statistieken weigeren',
        error: 'Instellingen konden niet worden opgeslagen. Statistieken blijven uit.',
        grant: 'Statistieken toestaan',
        heading: 'Cookie-instellingen',
        revoke: 'Statistieken intrekken',
        statusGranted: 'Statistieken zijn ingeschakeld.',
        statusDenied: 'Statistieken zijn uitgeschakeld.',
        trigger: 'Cookie-instellingen',
      }
    : {
        close: 'Close',
        deny: 'Decline statistics',
        error: 'Settings could not be saved. Statistics remain disabled.',
        grant: 'Allow statistics',
        heading: 'Cookie settings',
        revoke: 'Revoke statistics',
        statusGranted: 'Statistics are enabled.',
        statusDenied: 'Statistics are disabled.',
        trigger: 'Cookie settings',
      };

  useEffect(() => {
    setPreferences(readConsentPreferences());
  }, []);

  useEffect(() => {
    if (isOpen) firstActionRef.current?.focus();
  }, [isOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSaveError(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close, isOpen]);

  const save = (statistics: boolean) => {
    const next = saveStatisticsConsent(statistics);
    if (!next) {
      setPreferences(deniedPreferences);
      setSaveError(true);
      return;
    }

    setPreferences(next);
    setSaveError(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)] text-sm">
      {isOpen ? (
        <section
          id="cookie-preferences"
          aria-labelledby="cookie-preferences-heading"
          className="mb-2 w-80 max-w-full rounded-xl border border-white/15 bg-neutral-dark p-4 text-neutral-light shadow-strong"
        >
          <h2 id="cookie-preferences-heading" className="text-base font-semibold">
            {copy.heading}
          </h2>
          <p className="mt-2 text-neutral-gray-100" role="status" aria-live="polite">
            {preferences.statistics ? copy.statusGranted : copy.statusDenied}
          </p>
          {saveError ? (
            <p className="mt-2 text-sm text-amber-200" role="status">
              {copy.error}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              ref={firstActionRef}
              type="button"
              onClick={() => save(true)}
              className="rounded-md bg-primary px-3 py-2 font-semibold text-neutral-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              {copy.grant}
            </button>
            <button
              type="button"
              onClick={() => save(false)}
              className="rounded-md border border-white/20 px-3 py-2 font-semibold text-neutral-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              {preferences.statistics ? copy.revoke : copy.deny}
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded-md px-3 py-2 font-semibold text-neutral-gray-100 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              {copy.close}
            </button>
          </div>
        </section>
      ) : null}
      <button
        ref={triggerRef}
        type="button"
        aria-controls="cookie-preferences"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="rounded-full bg-neutral-dark px-4 py-3 font-semibold text-neutral-light shadow-strong ring-1 ring-white/15 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      >
        {copy.trigger}
      </button>
    </div>
  );
}
