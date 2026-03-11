"use client";

import React, { useState, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types & constants                                                  */
/* ------------------------------------------------------------------ */

interface CookieConsentState {
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = "mr-dj-cookie-consent";

function readConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentState;
  } catch {
    return null;
  }
}

function writeConsent(state: CookieConsentState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // fail silently
  }
}

/* ------------------------------------------------------------------ */
/*  useConsent hook                                                     */
/* ------------------------------------------------------------------ */

export function useConsent(): CookieConsentState | null {
  const [consent, setConsent] = useState<CookieConsentState | null>(null);

  useEffect(() => {
    setConsent(readConsent());

    // Listen for changes from the banner in the same tab
    const handler = () => setConsent(readConsent());
    window.addEventListener("mr-dj-consent-updated", handler);
    return () => window.removeEventListener("mr-dj-consent-updated", handler);
  }, []);

  return consent;
}

/* ------------------------------------------------------------------ */
/*  Banner component                                                   */
/* ------------------------------------------------------------------ */

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const save = useCallback(
    (a: boolean, m: boolean) => {
      writeConsent({
        analytics: a,
        marketing: m,
        timestamp: new Date().toISOString(),
      });
      setVisible(false);
      // Notify other components (Analytics loader, etc.)
      window.dispatchEvent(new Event("mr-dj-consent-updated"));
    },
    [],
  );

  const handleAcceptAll = () => save(true, true);
  const handleNecessaryOnly = () => save(false, false);
  const handleSaveSettings = () => save(analytics, marketing);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-5 backdrop-blur-md sm:px-6">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm text-gray-700">
          Wij gebruiken cookies om je ervaring te verbeteren.
        </p>

        {/* Toggles */}
        <div className="mb-4 flex flex-wrap gap-x-6 gap-y-3">
          {/* Noodzakelijk -- always on */}
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked
              disabled
              className="h-4 w-4 accent-yellow-400"
            />
            Noodzakelijk
          </label>

          {/* Analytics */}
          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => {
                setAnalytics(e.target.checked);
                setToggled(true);
              }}
              className="h-4 w-4 accent-yellow-400"
            />
            Analytics
          </label>

          {/* Marketing */}
          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => {
                setMarketing(e.target.checked);
                setToggled(true);
              }}
              className="h-4 w-4 accent-yellow-400"
            />
            Marketing
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="inline-flex min-h-[44px] items-center rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black shadow-lg transition hover:bg-yellow-300"
          >
            Alles accepteren
          </button>
          <button
            type="button"
            onClick={handleNecessaryOnly}
            className="inline-flex min-h-[44px] items-center rounded-full border border-gray-300 bg-gray-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-700 transition hover:border-yellow-500 hover:text-yellow-600"
          >
            Alleen noodzakelijk
          </button>
          {toggled && (
            <button
              type="button"
              onClick={handleSaveSettings}
              className="inline-flex min-h-[44px] items-center rounded-full border border-yellow-500/50 bg-yellow-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-600 transition hover:bg-yellow-100"
            >
              Instellingen opslaan
            </button>
          )}
        </div>

        {/* Privacy link */}
        <div className="mt-3">
          <a
            href="/nl/privacyverklaring"
            className="text-[0.65rem] text-gray-400 underline underline-offset-2 transition-colors hover:text-yellow-600"
          >
            Privacyverklaring
          </a>
        </div>
      </div>
    </div>
  );
}
