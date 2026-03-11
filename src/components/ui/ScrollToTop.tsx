"use client";
import React, { useState, useEffect } from "react";

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      }}
      aria-label="Scroll naar boven"
      className="fixed bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg transition hover:bg-yellow-300"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 16V4M4 10l6-6 6 6"/></svg>
    </button>
  );
};
