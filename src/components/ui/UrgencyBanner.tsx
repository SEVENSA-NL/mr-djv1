"use client";

import React from "react";

export const UrgencyBanner: React.FC = () => (
  <div className="mx-auto max-w-7xl px-4 md:px-6">
    <div className="flex items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-center text-xs font-medium text-amber-200 animate-pulse md:text-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-amber-400" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>Let op: populaire data in juni en september zijn snel volgeboekt!</span>
    </div>
  </div>
);
