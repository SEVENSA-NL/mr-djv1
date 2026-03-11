"use client";

import React, { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/src/utils/tracking";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputCls = "w-full rounded-md border border-white/20 bg-white/10 px-3 py-2.5 text-xs text-white placeholder:text-gray-500 outline-none transition focus:ring-2 focus:ring-yellow-500/70 md:text-sm";

export function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && nameRef.current) {
      nameRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Vul een geldig e-mailadres in.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/brochure-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setDownloadUrl(data.downloadUrl);
        trackEvent("brochure_download", { name, email });
      } else {
        setError(data.error || "Er ging iets mis.");
      }
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a12] p-6" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 transition hover:text-white"
          aria-label="Sluiten"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center">
            <svg className="mx-auto mb-3 h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mb-2 text-lg font-semibold text-white">Bedankt!</h3>
            <p className="mb-4 text-sm text-gray-300">Je download start automatisch.</p>
            <a
              href={downloadUrl}
              download
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-yellow-400 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300"
            >
              Download feestgids
            </a>
          </div>
        ) : (
          <>
            <h3 className="mb-2 text-lg font-semibold text-white">Download onze feestgids</h3>
            <p className="mb-4 text-sm text-gray-300">
              Ontvang onze complete feestgids met pakketten, prijzen, tips en checklist.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="brochure-name" className="mb-1 block text-xs font-medium text-gray-300">Naam</label>
                <input ref={nameRef} type="text" id="brochure-name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} autoComplete="name" />
              </div>
              <div>
                <label htmlFor="brochure-email" className="mb-1 block text-xs font-medium text-gray-300">E-mailadres *</label>
                <input type="email" id="brochure-email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} autoComplete="email" required />
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-yellow-400 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300 disabled:opacity-60"
              >
                {loading ? "Verzenden..." : "Download feestgids"}
              </button>
              <p className="text-center text-[0.6rem] text-gray-400">Geen spam, beloofd.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
