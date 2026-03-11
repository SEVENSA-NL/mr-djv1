"use client";

import React from "react";
import Link from "next/link";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { MrDjPackages } from "@/src/components/sections/MrDjPackages";
import { MrDjTestimonials } from "@/src/components/sections/MrDjTestimonials";
import { MrDjContact } from "@/src/components/sections/MrDjContact";
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import { sanitizeFormData } from "@/src/utils/sanitize";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";
import type { CityData } from "@/src/data/cities";
import { cities } from "@/src/data/cities";

interface CityContentProps {
  city: CityData;
}

export default function CityContent({ city }: CityContentProps) {
  const nearbyCities = city.nearby
    .map((slug) => cities.find((c) => c.slug === slug))
    .filter(Boolean) as CityData[];

  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    const sanitized = sanitizeFormData(values as unknown as Record<string, unknown>) as unknown as AvailabilityRequest;
    if (process.env.NODE_ENV === "development") {
      console.log(`[CITY:${city.slug.toUpperCase()}] Availability request`, sanitized);
    }
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch (err) {
      console.error("[FORM] Network error", err);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Mister DJ",
    description: city.metaDescription,
    url: `https://mr-dj.nl/nl/dj-${city.slug}`,
    telephone: "+31408422594",
    email: "info@mr-dj.nl",
    image: "https://mr-dj.nl/images/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kapteijnlaan 17",
      addressLocality: "Veldhoven",
      postalCode: "5505 AV",
      addressRegion: "Noord-Brabant",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.latitude,
      longitude: city.longitude,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.latitude,
        longitude: city.longitude,
      },
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "9.8",
      bestRating: "10",
      ratingCount: "76",
    },
  };

  return (
    <MrDjLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">DJ in {city.name}</p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Jouw DJ in {city.name} &mdash; 100% dansgarantie
        </h1>
        <p className="mb-1 text-xs text-gray-400">Regio {city.region}</p>
        <p className="max-w-3xl text-sm text-gray-700 md:text-base">{city.description}</p>
      </section>

      {/* Venues */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Populaire locaties in {city.name}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {city.venues.map((venue) => (
            <div key={venue} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="text-sm font-semibold text-yellow-600">{venue}</h3>
              <p className="mt-1 text-xs text-gray-500">{city.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Wat Mister DJ biedt in {city.name}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/nl/bruiloften" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:bg-gray-100">
            <h3 className="mb-1 text-sm font-semibold text-yellow-600">Bruiloften</h3>
            <p className="text-xs text-gray-600">Van ceremonie tot slotfeest in {city.name}.</p>
          </Link>
          <Link href="/nl/bedrijfsfeesten" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:bg-gray-100">
            <h3 className="mb-1 text-sm font-semibold text-yellow-600">Bedrijfsfeesten</h3>
            <p className="text-xs text-gray-600">Entertainment voor zakelijke evenementen in {city.name}.</p>
          </Link>
          <Link href="/nl/feesten-overig" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:bg-gray-100">
            <h3 className="mb-1 text-sm font-semibold text-yellow-600">Overige feesten</h3>
            <p className="text-xs text-gray-600">Verjaardag, jubileum of ander feest in {city.name}.</p>
          </Link>
        </div>
      </section>

      <MrDjPackages />
      <MrDjTestimonials />

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-10 text-center md:px-6 md:py-12">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 md:text-2xl">DJ nodig in {city.name}?</h2>
        <p className="mb-5 text-sm text-gray-700 md:text-base">
          Neem vrijblijvend contact op. Reactie binnen 24 uur.
        </p>
        <Link href="/nl/contact" className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300">
          Check beschikbaarheid
        </Link>
      </section>

      {/* Nearby cities */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Bekijk ook:</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {nearbyCities.map((nearby) => (
            <Link key={nearby.slug} href={`/nl/dj-${nearby.slug}`} className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
              <span className="mb-1 block font-semibold text-yellow-600">DJ in {nearby.name}</span>
              Bekijk onze DJ-services in {nearby.name}.
            </Link>
          ))}
        </div>
      </section>

      <MrDjContact>
        <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
      </MrDjContact>
    </MrDjLayout>
  );
}
