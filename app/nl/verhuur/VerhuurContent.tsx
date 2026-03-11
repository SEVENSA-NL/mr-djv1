"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { MrDjTestimonials } from "@/src/components/sections/MrDjTestimonials";
import { MrDjContact } from "@/src/components/sections/MrDjContact";
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { sanitizeFormData } from "@/src/utils/sanitize";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";

const djEquipment = [
  "Draaitafels",
  "DJ booth",
  "Rookmachine",
  "Lichtgevende dansvloer",
  "Discoballen",
];

const soundEquipment = [
  "Speakers en boxen",
  "Versterkers",
  "Subwoofers",
  "Alle kabels",
  "Speakerstandaarden",
  "Microfoons",
  "Mixers",
];

const lightEquipment = [
  "Complete lasershows",
  "Losse lasers",
  "Lichtinstallaties inclusief bevestigingsmaterialen",
  "LED podium lampen",
];

interface FaqItemProps {
  question: string;
  answer: string;
}

const verhuurFaq: FaqItemProps[] = [
  {
    question: "Wat kost het om apparatuur te huren?",
    answer:
      "Onze prijzen zijn afhankelijk van het type apparatuur, de hoeveelheid en de duur van de huurperiode. Neem contact op voor een vrijblijvende offerte op maat. We denken graag mee over een pakket dat past bij jullie budget.",
  },
  {
    question: "Kan ik de apparatuur zelf ophalen?",
    answer:
      "Ja, dat kan! Onze loods bevindt zich aan de Kapteijnlaan 17 in Veldhoven. We helpen je graag met het inladen en geven uitleg over de bediening van de apparatuur.",
  },
  {
    question: "Wordt de apparatuur bezorgd en opgebouwd?",
    answer:
      "Binnen een straal van 40 kilometer rondom Veldhoven bezorgen, bouwen we op en breken we af \u2014 alles inbegrepen in de huurprijs. Buiten 40 km rekenen we \u20AC0,50 per extra kilometer.",
  },
  {
    question: "Wat als er iets kapot gaat?",
    answer:
      "Bij het huren van apparatuur vragen wij een borg, afhankelijk van de gehuurde items. Bij normaal gebruik hoef je je geen zorgen te maken. Mocht er onverhoopt iets beschadigd raken, dan bespreken we dit altijd eerst persoonlijk.",
  },
  {
    question: "Hoe ver van tevoren moet ik reserveren?",
    answer:
      "We raden aan om minimaal 2 weken van tevoren te reserveren, vooral in het seizoen (mei t/m september). Voor populaire weekenden adviseren we zelfs eerder. Last-minute is soms ook mogelijk \u2014 vraag naar de beschikbaarheid.",
  },
  {
    question: "Verhuren jullie ook zonder DJ?",
    answer:
      "Jazeker! Je kunt onze apparatuur los huren zonder DJ. Wel geven we altijd uitleg over de bediening, zodat je er probleemloos mee aan de slag kunt. Wil je toch een DJ erbij? Bekijk dan onze pakketten vanaf \u20AC950.",
  },
];

function FaqAccordion({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-700">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-gray-900"
        aria-expanded={open}
      >
        <span>{question}</span>
        <svg
          className={`ml-3 h-4 w-4 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-gray-100 px-4 pb-4">
          <p className="pt-2 text-xs text-gray-700 md:text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function VerhuurContent() {
  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    const sanitized = sanitizeFormData(
      values as unknown as Record<string, unknown>,
    ) as unknown as AvailabilityRequest;
    if (process.env.NODE_ENV === "development") {
      console.log("[VERHUUR] Availability request", sanitized);
    }
  };

  return (
    <MrDjLayout>
      <Breadcrumbs />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">
          Verhuur
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Licht en geluid verhuur in Brabant
        </h1>
        <p className="max-w-3xl text-sm text-gray-700 md:text-base">
          Ook al kun je nog zo lekker draaien, als je boxen kraken en de microfoon
          iedere keer begint te piepen als je het publiek toespreekt, wordt het nooit
          wat. Onze licht en geluid verhuur in Brabant biedt dan uitkomst. Wij maken
          zelf ook gebruik van deze apparatuur bij onze professionele drive-in shows.
          Tegen een kleine vergoeding (en als je alles heel laat) mag je onze
          apparatuur gebruiken voor je eigen feest of je eigen show. Wij verhuren
          zowel zakelijk als aan particulieren in Veldhoven, Eindhoven, Tilburg,
          Den Bosch en heel Noord-Brabant.
        </p>
      </section>

      {/* 3 categories with images */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          {/* DJ & Feest */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="relative h-44 w-full">
              <Image
                src="/images/gallery/gallery-01.jpg"
                alt="DJ booth met draaitafels en lichtshow op een feest"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                </svg>
              </div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Feest &amp; DJ apparatuur
              </h2>
              <p className="mb-4 text-sm text-gray-700">
                Of je nu een feestje geeft in je garage, je kelder of een heel caf&eacute;
                aan het dansen wil krijgen, met onze professionele DJ- en
                feestapparatuur verandert iedere ruimte in een dampende feesttent.
              </p>
              <ul className="space-y-1.5">
                {djEquipment.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Geluid */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="relative h-44 w-full">
              <Image
                src="/images/gallery/gallery-05.jpg"
                alt="Professionele geluidsinstallatie met speakers en versterkers"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Geluidsinstallatie verhuur
              </h2>
              <p className="mb-4 text-sm text-gray-700">
                Wij hebben geluidsinstallaties op voorraad waarmee je feesten van 5
                tot 500 man van kraakhelder geluid kunt voorzien.
              </p>
              <ul className="space-y-1.5">
                {soundEquipment.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Licht & Laser */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="relative h-44 w-full">
              <Image
                src="/images/gallery/gallery-09.jpg"
                alt="Lasershow en lichtinstallatie op een evenement"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Lichtinstallatie &amp; lasershow verhuur
              </h2>
              <p className="mb-4 text-sm text-gray-700">
                Ook onze lichtinstallaties zijn geschikt voor zowel tuinfeesten met
                pakweg 20 gasten tot grote feesten in een hoge zaal met tot wel 500
                bezoekers.
              </p>
              <ul className="space-y-1.5">
                {lightEquipment.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing note */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Prijzen &amp; voorwaarden
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
              Prijzen op aanvraag &mdash; afhankelijk van apparatuur en duur
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
              Inclusief levering, opbouw en afbouw binnen 40km van Veldhoven
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
              Buiten 40km: &euro;0,50 per kilometer extra
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
              Borg op basis van de gehuurde apparatuur
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
              Zelf ophalen in onze loods in Veldhoven is ook mogelijk
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">
          Veelgestelde vragen
        </p>
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 md:text-3xl">
          FAQ over onze verhuur
        </h2>
        <div className="space-y-3">
          {verhuurFaq.map((faq) => (
            <FaqAccordion key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Upsell */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-400/5 p-6 text-center">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Combineer met een DJ
          </h2>
          <p className="mb-4 text-sm text-gray-700">
            Liever het hele pakket? Combineer de verhuur met een van onze
            professionele DJ&apos;s en geniet van een zorgeloos feest. Bekijk
            onze pakketten vanaf &euro;950.
          </p>
          <Link
            href="/nl/bruiloften"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-yellow-400 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300"
          >
            Bekijk pakketten
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <MrDjTestimonials maxItems={3} />

      {/* Bekijk ook */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
          Bekijk ook:
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/nl/bedrijfsfeesten"
            className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            <span className="mb-1 block font-semibold text-yellow-600">
              Bedrijfsfeesten
            </span>
            DJ en entertainment voor zakelijke evenementen.
          </Link>
          <Link
            href="/nl/impressies"
            className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            <span className="mb-1 block font-semibold text-yellow-600">
              Impressies
            </span>
            Sfeerbeelden van onze feesten en events.
          </Link>
          <Link
            href="/nl/contact"
            className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            <span className="mb-1 block font-semibold text-yellow-600">
              Contact
            </span>
            Neem vrijblijvend contact op.
          </Link>
        </div>
      </section>

      {/* Contact form */}
      <MrDjContact>
        <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
      </MrDjContact>
    </MrDjLayout>
  );
}
