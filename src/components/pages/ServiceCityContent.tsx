"use client";

import React from "react";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { useInView } from "@/src/hooks/useInView";
import { useScrollDepth } from "@/src/hooks/useScrollDepth";
import { SmartCTA } from "@/src/components/ui/SmartCTA";
import type { SEOPage } from "@/src/data/seo-pages";

interface ServiceCityContentProps {
  page: SEOPage;
}

export const ServiceCityContent: React.FC<ServiceCityContentProps> = ({ page }) => {
  useScrollDepth();
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: bulletRef, isInView: bulletVisible } = useInView();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.intro,
    provider: {
      "@type": "LocalBusiness",
      name: "Mister DJ",
      url: "https://mr-dj.nl",
    },
    areaServed: {
      "@type": "City",
      name: page.cityName,
    },
    serviceType: "DJ Entertainment",
  };

  return (
    <MrDjLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Breadcrumbs />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,181,55,0.05),_transparent_55%)]" />
        <div
          ref={heroRef}
          className={`relative mx-auto max-w-4xl px-4 text-center transition-opacity md:px-6 ${heroVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">
            Mister DJ &middot; {page.eventLabel} DJ &middot; {page.cityName}
          </p>
          <h1 className="mb-4 text-3xl font-semibold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
            {page.h1}
            <span className="block text-yellow-600">100% dansgarantie</span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-gray-700 md:text-base">
            {page.intro}
          </p>
          <SmartCTA />
        </div>
      </section>

      {/* USP bullets */}
      <section className="py-10 md:py-14">
        <div
          ref={bulletRef}
          className={`mx-auto max-w-3xl px-4 transition-opacity md:px-6 ${bulletVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="mb-6 text-center text-xl font-semibold text-gray-900 md:text-2xl">
            Waarom Mister DJ voor jullie {page.eventLabel.toLowerCase()} in {page.cityName}?
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {page.bulletPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-[0.65rem] font-bold text-yellow-600">
                  &#10003;
                </span>
                <span className="text-sm text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 md:text-2xl">
            Wat kost een {page.eventLabel.toLowerCase()}-DJ in {page.cityName}?
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Onze pakketten beginnen vanaf <span className="font-semibold text-yellow-600">&euro;950</span> inclusief
            professioneel geluid en licht. Bekijk alle pakketten of vraag een offerte op maat.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/nl#packages"
              className="inline-flex min-h-[44px] items-center rounded-full border border-gray-300 bg-gray-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-700 transition hover:border-yellow-500 hover:text-yellow-600"
            >
              Bekijk pakketten
            </a>
            <a
              href="/nl/contact"
              className="inline-flex min-h-[44px] items-center rounded-full bg-yellow-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-yellow-300"
            >
              Offerte aanvragen
            </a>
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="border-t border-gray-200 py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            Bekijk ook
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {page.relatedPages.map((href) => {
              const label = href.split("/").pop()?.replace(/^dj-/, "DJ ").replace(/-/g, " ") || href;
              return (
                <a
                  key={href}
                  href={href}
                  className="rounded-full border border-gray-300 px-4 py-2 text-xs text-gray-600 transition hover:border-yellow-500 hover:text-yellow-600"
                >
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.h1,
            provider: {
              "@type": "LocalBusiness",
              name: "Mister DJ",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kapteijnlaan 17",
                addressLocality: "Veldhoven",
                postalCode: "5505 AV",
                addressCountry: "NL",
              },
              telephone: "+31408422594",
              url: "https://mr-dj.nl",
            },
            areaServed: {
              "@type": "City",
              name: page.cityName,
            },
            description: page.intro,
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              price: "950",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "EUR",
                price: "950",
                description: "Vanaf prijs Silver pakket",
              },
            },
          }),
        }}
      />
      {/* JSON-LD: FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `Wat kost een ${page.eventLabel.toLowerCase()}-DJ in ${page.cityName}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Onze pakketten voor een ${page.eventLabel.toLowerCase()}-DJ in ${page.cityName} beginnen vanaf €950 inclusief professioneel geluid en licht. Bekijk alle pakketten op mr-dj.nl of vraag een offerte op maat.`,
                },
              },
              {
                "@type": "Question",
                name: `Komt Mister DJ ook naar ${page.cityName}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Ja! Mister DJ is gevestigd in Veldhoven en komt regelmatig in ${page.cityName} en omgeving. Voor locaties buiten een straal van 50 kilometer kunnen aanvullende reiskosten van toepassing zijn.`,
                },
              },
              {
                "@type": "Question",
                name: "Wat houdt de 100% dansgarantie in?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Met onze 100% dansgarantie beloven we dat de dansvloer gevuld wordt. Onze DJ's lezen de zaal, passen de muziek realtime aan en zorgen dat iedereen — van jong tot oud — de dansvloer op gaat.",
                },
              },
            ],
          }),
        }}
      />
    </MrDjLayout>
  );
};
