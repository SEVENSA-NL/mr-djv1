"use client";

import React, { useState, useEffect } from "react";

export const StickyCTA: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur md:hidden">
      {/* Trust badges row */}
      <div className="flex items-center justify-center gap-3 border-b border-gray-100 px-4 py-1.5 text-[0.6rem] text-gray-500">
        <span className="flex items-center gap-1">
          <span className="text-yellow-400">&#9733;</span>
          <span className="font-semibold text-gray-700">9.8/10</span>
          <span>· 129 reviews</span>
        </span>
        <span className="text-gray-300">|</span>
        <span>100% dansgarantie</span>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <a
          href="tel:+31408422594"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-800 transition hover:border-gray-400"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span>040-8422594</span>
        </a>
        <a
          href="/nl/contact"
          className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-black transition hover:bg-yellow-300"
        >
          Check beschikbaarheid
        </a>
      </div>
    </div>
  );
};
