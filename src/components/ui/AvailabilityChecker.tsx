"use client";

import React, { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/src/utils/tracking";

interface AlternativeDate {
  date: string;
  formatted: string;
}

interface AvailabilityResult {
  available: boolean;
  message: string;
  dateFormatted?: string;
  alternatives?: AlternativeDate[];
}

export function AvailabilityChecker() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<AvailabilityResult | null>(null);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const checkDate = async (checkDateStr: string) => {
    if (!checkDateStr) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/availability?date=${checkDateStr}`);
      const data = await res.json();
      setResult(data);
      trackEvent("availability_check", { date: checkDateStr, available: String(data.available) });
    } catch {
      setResult({ available: false, message: "Er ging iets mis. Probeer het opnieuw." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        <h3 className="text-base font-semibold text-gray-900">Check beschikbaarheid</h3>
      </div>
      <p className="mb-4 text-xs text-gray-500">Direct zekerheid over jouw datum</p>
      <div className="flex gap-2">
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => { setDate(e.target.value); setResult(null); }}
          style={{ colorScheme: "dark" }}
          className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2.5 text-xs text-gray-900 outline-none transition focus:ring-2 focus:ring-yellow-500/70"
          aria-label="Kies een datum"
        />
        <button
          onClick={() => checkDate(date)}
          disabled={!date || loading}
          className="inline-flex shrink-0 items-center rounded-md bg-yellow-400 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black transition hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : "Check"}
        </button>
      </div>
      {result && (
        <div className={`mt-4 rounded-xl border p-4 ${result.available ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"}`}>
          <div className="flex items-start gap-2">
            {result.available ? (
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900">{result.message}</p>
              {result.available && (
                <Link href="/nl/contact" className="mt-3 inline-flex items-center rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black transition hover:bg-yellow-300">
                  Vraag direct een offerte aan
                </Link>
              )}
              {!result.available && result.alternatives && result.alternatives.length > 0 && (
                <div className="mt-3">
                  <p className="mb-2 text-xs text-gray-500">Beschikbare datums in de buurt:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.alternatives.map((alt) => (
                      <button
                        key={alt.date}
                        onClick={() => { setDate(alt.date); checkDate(alt.date); }}
                        className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 transition hover:border-yellow-500/40 hover:text-yellow-600"
                      >
                        {alt.formatted}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
