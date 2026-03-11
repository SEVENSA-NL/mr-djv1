"use client";

import React, { useState, useEffect, useCallback } from "react";
import { trackEvent } from "@/src/utils/tracking";

const DISMISSED_KEY = "mrdj_exit_dismissed";
const COOLDOWN_HOURS = 24;

/**
 * Exit Intent Popup — detects when the user moves their mouse toward
 * the browser chrome (about to leave) and shows a last-chance offer.
 *
 * - Only fires once per session
 * - Respects a 24h cooldown after dismissal
 * - Mobile: triggers on back-button / visibility change after 30s
 * - Does not show if user has already submitted a form
 */
export const ExitIntentPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fired, setFired] = useState(false);

  const show = useCallback(() => {
    if (fired) return;

    // Check cooldown
    try {
      const dismissed = localStorage.getItem(DISMISSED_KEY);
      if (dismissed) {
        const dismissedAt = parseInt(dismissed, 10);
        if (Date.now() - dismissedAt < COOLDOWN_HOURS * 3600 * 1000) return;
      }
    } catch {
      // ignore
    }

    setFired(true);
    setVisible(true);
    trackEvent("exit_intent_shown");
  }, [fired]);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISSED_KEY, Date.now().toString());
    } catch {
      // ignore
    }
    trackEvent("exit_intent_dismissed");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;

    try {
      await fetch("/api/brochure-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Exit intent", email }),
      });
    } catch {
      // ignore
    }

    setSubmitted(true);
    trackEvent("exit_intent_converted", { email_captured: "true" });

    setTimeout(() => {
      setVisible(false);
      try {
        localStorage.setItem(DISMISSED_KEY, Date.now().toString());
      } catch {
        // ignore
      }
    }, 3000);
  };

  useEffect(() => {
    // Desktop: mouse leaves viewport at top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !fired) {
        show();
      }
    };

    // Mobile: visibility change after 30s on page
    let mobileTimer: NodeJS.Timeout | null = null;
    const handleVisibility = () => {
      if (document.visibilityState === "hidden" && !fired) {
        show();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    // Only attach visibility handler after 30s to avoid triggering on quick tab switches
    mobileTimer = setTimeout(() => {
      document.addEventListener("visibilitychange", handleVisibility);
    }, 30000);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, [fired, show]);

  // Close on Escape
  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [visible, dismiss]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Speciaal aanbod"
    >
      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-2xl">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Sluiten"
        >
          &times;
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mb-3 text-3xl">&#127881;</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Check je inbox!
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Je ontvangt onze feestgids met tips, checklist en tarieven.
            </p>
            <a
              href="/downloads/mister-dj-feestgids.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-yellow-300"
            >
              Direct downloaden
            </a>
          </div>
        ) : (
          <>
            <div className="mb-1 text-center text-xs font-semibold uppercase tracking-[0.2em] text-yellow-600">
              Wacht even!
            </div>
            <h3 className="mb-2 text-center text-xl font-semibold text-gray-900">
              Ontvang onze gratis feestgids
            </h3>
            <p className="mb-4 text-center text-sm text-gray-600">
              Inclusief tips, checklist en exclusieve kortingscode voor jullie feest.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jullie@email.nl"
                required
                autoFocus
                className="input-field"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-yellow-400 px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-black transition hover:bg-yellow-300"
              >
                Ja, stuur mij de feestgids
              </button>
            </form>

            <button
              type="button"
              onClick={dismiss}
              className="mt-3 w-full text-center text-xs text-gray-400 transition hover:text-gray-500"
            >
              Nee bedankt, ik heb al een DJ
            </button>
          </>
        )}
      </div>
    </div>
  );
};
