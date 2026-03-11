"use client";

import React from "react";
import Link from "next/link";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";

interface Fair {
  name: string;
  date: string;
  location: string;
  venue: string;
  description: string;
  url?: string;
}

const upcomingFairs: Fair[] = [
  {
    name: "Wedding Event Ketelhuis",
    date: "15 maart 2026",
    location: "Eindhoven",
    venue: "Ketelhuis Eindhoven (Landgoed de Grote Beek)",
    description:
      "Ontmoet Mister DJ op deze sfeervolle trouwbeurs in het industriële Ketelhuis. Bekijk onze apparatuur en bespreek jullie wensen.",
    url: "https://www.weddingevent.nl/wedding-event-ketelhuis/",
  },
  {
    name: "Wedding Event Ketelhuis",
    date: "25 oktober 2026",
    location: "Eindhoven",
    venue: "Ketelhuis Eindhoven (Landgoed de Grote Beek)",
    description:
      "De najaarseditie van Wedding Event in het Ketelhuis. Ideaal om jullie bruiloftsplannen voor 2027 te bespreken.",
    url: "https://www.weddingevent.nl/wedding-event-ketelhuis/",
  },
  {
    name: "Always Forever Kasteel Henkenshage",
    date: "7 april 2027",
    location: "Sint Oedenrode",
    venue: "Kasteel Henkenshage",
    description:
      "Een sprookjesachtige setting voor deze trouwbeurs. Kom langs en ervaar wat Mister DJ voor jullie kan betekenen.",
    url: "https://www.alwaysforever.nu/trouwbeurs/kasteel-henkenshage",
  },
];

const pastFairs: Fair[] = [
  {
    name: "Always Forever Vresselse Hut",
    date: "22 februari 2026",
    location: "Sint Oedenrode",
    venue: "De Vresselse Hut",
    description: "Gezellige trouwbeurs in de Vresselse Hut.",
    url: "https://www.alwaysforever.nu/trouwbeurs/de-vresselse-hut",
  },
  {
    name: "Always Forever Koe & Kroonluchter",
    date: "8 maart 2026",
    location: "Diessen",
    venue: "Tussen Koe & Kroonluchter",
    description: "Unieke trouwbeurs op een sfeervolle boerderijlocatie in Diessen.",
    url: "https://www.alwaysforever.nu/trouwbeurs/tussen-koe-kroonluchter",
  },
];

const benefits = [
  {
    title: "Live demo",
    description:
      "Bekijk en beluister onze apparatuur live. Van lichtshow tot sparkulars — het moet je zien en horen.",
  },
  {
    title: "Persoonlijk gesprek",
    description:
      "Maak kennis met ons team. Bespreek jullie wensen zonder verplichtingen.",
  },
  {
    title: "Exclusieve beurs-korting",
    description:
      "Boek op de beurs en ontvang een exclusieve korting op alle pakketten. Alleen geldig op de beursdag.",
  },
  {
    title: "Direct beschikbaarheid checken",
    description:
      "We checken ter plekke of Mister DJ beschikbaar is op jullie trouwdatum.",
  },
];

export default function TrouwbeurzenContent() {
  return (
    <MrDjLayout>
      <Breadcrumbs />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">
          Trouwbeurzen
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Ontmoet Mister DJ op een trouwbeurs
        </h1>
        <p className="max-w-2xl text-sm text-gray-700 md:text-base">
          Wil je eerst kennismaken voordat je boekt? Bezoek ons op een van de
          trouwbeurzen in de regio. Bekijk onze apparatuur, luister naar een live
          demo en bespreek vrijblijvend jullie wensen.
        </p>
      </section>

      {/* Upcoming fairs */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-6 text-lg font-semibold text-gray-900 md:text-xl">
          Aankomende beurzen
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {upcomingFairs.map((fair) => (
            <div
              key={fair.name}
              className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-5"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-base font-semibold text-yellow-600">
                  {fair.name}
                </h3>
                <span className="rounded-full bg-yellow-400/15 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-yellow-600">
                  {fair.date}
                </span>
              </div>
              <p className="mb-1 text-xs text-gray-500">
                {fair.venue}, {fair.location}
              </p>
              <p className="mb-4 flex-1 text-sm text-gray-700">
                {fair.description}
              </p>
              <div className="flex gap-2">
                {fair.url && (
                  <a
                    href={fair.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-gray-300 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gray-700 transition hover:bg-gray-100"
                  >
                    Meer info
                  </a>
                )}
                <Link
                  href="/nl/contact"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-yellow-400 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300"
                >
                  Kom langs!
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-6 text-lg font-semibold text-gray-900 md:text-xl">
          Waarom ons bezoeken op een beurs?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
            >
              <h3 className="mb-2 text-sm font-semibold text-yellow-600">
                {b.title}
              </h3>
              <p className="text-xs text-gray-700">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent past fairs */}
      {pastFairs.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-6 md:px-6 md:pb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
            Recent bezochte beurzen
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {pastFairs.map((fair) => (
              <div
                key={fair.name + fair.date}
                className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-5 opacity-80"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-600">
                    {fair.name}
                  </h3>
                  <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gray-500">
                    {fair.date}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {fair.venue}, {fair.location}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Historical past fairs */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
          Eerdere beurzen
        </h2>
        <p className="mb-3 text-sm text-gray-700 md:text-base">
          Naast bovenstaande beurzen hebben we in het verleden deelgenomen aan diverse Trouwbeleving beurzen, waaronder:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>Koekbouw Veghel</li>
          <li>Koepelhal Tilburg</li>
          <li>Fletcher Deurne</li>
          <li>Weddingfair Den Bosch</li>
        </ul>
        <p className="mt-3 text-sm text-gray-700 md:text-base">
          We hebben honderden bruidsparen mogen ontmoeten en adviseren. Veel van
          hen hebben uiteindelijk gekozen voor Mister DJ — en dat maakt ons trots.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-10 text-center md:px-6 md:py-12">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 md:text-2xl">
          Kun je niet wachten? Neem nu contact op
        </h2>
        <p className="mb-5 text-sm text-gray-700 md:text-base">
          Je hoeft niet te wachten op de volgende beurs. Neem vrijblijvend
          contact met ons op en we plannen een persoonlijk gesprek.
        </p>
        <Link
          href="/nl/contact"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300"
        >
          Neem contact op
        </Link>
      </section>

      {/* Bekijk ook */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
          Bekijk ook:
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/nl/bruiloften"
            className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            <span className="mb-1 block font-semibold text-yellow-600">
              Bruiloften
            </span>
            Alles over onze bruilofts-DJ services.
          </Link>
          <Link
            href="/nl/impressies"
            className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            <span className="mb-1 block font-semibold text-yellow-600">
              Impressies
            </span>
            Sfeerbeelden van eerdere feesten en events.
          </Link>
          <Link
            href="/nl/veelgestelde-vragen"
            className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            <span className="mb-1 block font-semibold text-yellow-600">
              FAQ
            </span>
            Antwoorden op veelgestelde vragen.
          </Link>
        </div>
      </section>
    </MrDjLayout>
  );
}
