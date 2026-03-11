"use client";

import React from "react";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { useInView } from "@/src/hooks/useInView";
import { useScrollDepth } from "@/src/hooks/useScrollDepth";
import { SmartCTA } from "@/src/components/ui/SmartCTA";
import type { VenueData } from "@/src/data/venues";

interface VenueContentProps {
  venue: VenueData;
}

export const VenueContent: React.FC<VenueContentProps> = ({ venue }) => {
  useScrollDepth();
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: tipsRef, isInView: tipsVisible } = useInView();

  // Type values are now capitalized in venue data; use as-is for display
  const typeLabel = venue.type;

  return (
    <MrDjLayout>
      <Breadcrumbs />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,181,55,0.05),_transparent_55%)]" />
        <div
          ref={heroRef}
          className={`relative mx-auto max-w-4xl px-4 text-center transition-opacity md:px-6 ${heroVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">
              {typeLabel} &middot; {venue.city}
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-semibold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
            DJ voor {venue.name}
            <span className="block text-lg font-normal text-gray-500 md:text-xl">
              {venue.city}, {venue.region}
            </span>
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-sm text-gray-700 md:text-base">
            {venue.description}
          </p>
          <p className="mb-4 text-xs text-gray-400">
            Capaciteit: {venue.capacity}
          </p>
          {venue.website && (
            <p className="mb-6">
              <a
                href={venue.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-yellow-600 underline decoration-yellow-300 underline-offset-2 transition hover:text-yellow-700"
              >
                Bekijk de website van {venue.name} &rarr;
              </a>
            </p>
          )}
          <SmartCTA />
        </div>
      </section>

      {/* Tips */}
      <section className="py-10 md:py-14">
        <div
          ref={tipsRef}
          className={`mx-auto max-w-3xl px-4 transition-opacity md:px-6 ${tipsVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="mb-6 text-center text-xl font-semibold text-gray-900 md:text-2xl">
            Tips van Mister DJ voor {venue.name}
          </h2>
          <div className="space-y-3">
            {venue.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-600">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 md:text-2xl">
            Feest bij {venue.name}?
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Wij kennen {venue.name} en zorgen voor het perfecte geluid en licht.
            Neem contact op voor een vrijblijvende offerte.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/nl/contact"
              className="inline-flex min-h-[44px] items-center rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-yellow-300"
            >
              Offerte aanvragen
            </a>
            <a
              href={`/nl/dj-${venue.citySlug}`}
              className="inline-flex min-h-[44px] items-center rounded-full border border-gray-300 bg-gray-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-700 transition hover:border-yellow-500 hover:text-yellow-600"
            >
              Meer over DJ {venue.city}
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `DJ voor ${venue.name}`,
            provider: {
              "@type": "LocalBusiness",
              name: "Mister DJ",
              telephone: "+31408422594",
              url: "https://mr-dj.nl",
            },
            serviceArea: {
              "@type": "Place",
              name: venue.name,
              address: {
                "@type": "PostalAddress",
                addressLocality: venue.city,
                addressRegion: venue.region,
                addressCountry: "NL",
              },
            },
          }),
        }}
      />
    </MrDjLayout>
  );
};
