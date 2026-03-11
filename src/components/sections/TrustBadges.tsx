"use client";

import React from "react";
import { useInView } from "@/src/hooks/useInView";
import { companyStats as stats } from "@/src/data/company-stats";

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function CertificateIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const badges: { icon: React.ReactNode; text: string }[] = [
  { icon: <span className="text-[0.5rem] font-bold">✓</span>, text: "100% Dansgarantie" },
  { icon: <span className="text-[0.5rem] font-bold">✓</span>, text: `${stats.yearsExperience}+ jaar ervaring` },
  { icon: <span className="text-[0.5rem] font-bold">✓</span>, text: `${stats.totalEvents}+ feesten` },
  { icon: <span className="text-[0.5rem] font-bold">✓</span>, text: "Reserve DJ inbegrepen" },
  { icon: <span className="text-[0.5rem] font-bold">✓</span>, text: "All-in prijs, geen verborgen kosten" },
];

const keurmerken: { icon: React.ReactNode; text: string }[] = [
  { icon: <ShieldIcon className="h-3.5 w-3.5 text-yellow-600" />, text: "KvK Geregistreerd" },
  { icon: <CertificateIcon className="h-3.5 w-3.5 text-yellow-600" />, text: "Verzekerd & Gecertificeerd" },
  { icon: <StarIcon className="h-3.5 w-3.5 text-yellow-500" />, text: `${stats.averageRating} Gemiddelde beoordeling` },
];

export const TrustBadges: React.FC = () => {
  const { ref, isInView } = useInView();

  return (
    <section className="border-y border-gray-100 bg-gray-50 py-4">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 md:px-6 transition-opacity ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Main trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {badges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-1.5 text-xs text-gray-600"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-black">
                {badge.icon}
              </span>
              <span className="font-medium">{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Keurmerk badges */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-gray-200 pt-3">
          {keurmerken.map((k) => (
            <div
              key={k.text}
              className="flex items-center gap-1.5 text-xs text-gray-500"
            >
              {k.icon}
              <span className="font-medium">{k.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
