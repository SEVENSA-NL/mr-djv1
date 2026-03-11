"use client";

import React, { useState } from "react";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";

interface FormData {
  naam: string;
  nummer: string;
  bericht: string;
}

export default function VerzoeknummersContent() {
  const [form, setForm] = useState<FormData>({ naam: "", nummer: "", bericht: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.naam.trim() || !form.nummer.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/verzoeknummers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submit failed");
      setStatus("success");
      setForm({ naam: "", nummer: "", bericht: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <MrDjLayout>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-lg px-4 md:px-6">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
              <svg className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V4.846a2.25 2.25 0 00-1.632-2.163L7.99 2.06a1.803 1.803 0 10-.99 3.467l2.31.66A2.25 2.25 0 0010.95 8.35V13.5" />
              </svg>
            </div>
            <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Doe een verzoekje!
            </h1>
            <p className="text-sm text-gray-600 md:text-base">
              Welk nummer willen jullie graag horen op het feest? Laat het ons weten en wij doen ons best!
            </p>
          </div>

          {status === "success" ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="mb-1 text-lg font-semibold text-green-800">Verzoek ontvangen!</h2>
              <p className="text-sm text-green-700">Bedankt! We nemen jullie verzoek mee in de playlist.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-sm font-medium text-green-700 underline hover:text-green-900"
              >
                Nog een verzoek doen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="vz-naam" className="mb-1 block text-sm font-medium text-gray-900">
                  Naam <span className="text-red-500">*</span>
                </label>
                <input
                  id="vz-naam"
                  type="text"
                  required
                  maxLength={100}
                  value={form.naam}
                  onChange={(e) => setForm((f) => ({ ...f, naam: e.target.value }))}
                  placeholder="Jullie naam"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
                />
              </div>

              <div>
                <label htmlFor="vz-nummer" className="mb-1 block text-sm font-medium text-gray-900">
                  Nummer / artiest <span className="text-red-500">*</span>
                </label>
                <input
                  id="vz-nummer"
                  type="text"
                  required
                  maxLength={200}
                  value={form.nummer}
                  onChange={(e) => setForm((f) => ({ ...f, nummer: e.target.value }))}
                  placeholder="bijv. Bohemian Rhapsody - Queen"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
                />
              </div>

              <div>
                <label htmlFor="vz-bericht" className="mb-1 block text-sm font-medium text-gray-900">
                  Bericht <span className="text-xs text-gray-400">(optioneel)</span>
                </label>
                <textarea
                  id="vz-bericht"
                  rows={3}
                  maxLength={500}
                  value={form.bericht}
                  onChange={(e) => setForm((f) => ({ ...f, bericht: e.target.value }))}
                  placeholder="Een speciaal moment of reden?"
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-600">Er ging iets mis. Probeer het opnieuw.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full min-h-[48px] items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-60"
              >
                {status === "loading" ? "Versturen..." : "Verstuur verzoek"}
              </button>
            </form>
          )}
        </div>
      </section>
    </MrDjLayout>
  );
}
