"use client";

import React from "react";
import Link from "next/link";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";

interface Vacancy {
  title: string;
  type: string;
  description: string;
  requirements: string[];
}

const vacancies: Vacancy[] = [
  {
    title: "DJ / Entertainment Specialist",
    type: "Freelance",
    description:
      "Ben jij een ervaren DJ met passie voor bruiloften en feesten? Wij zoeken enthousiaste DJ's die ons team willen versterken. Je draait op feesten door heel Brabant en daarbuiten, met professionele apparatuur van Mister DJ.",
    requirements: [
      "Minimaal 2 jaar ervaring als DJ op feesten/bruiloften",
      "Eigen vervoer (rijbewijs B)",
      "Beschikbaar op vrijdag- en zaterdagavonden",
      "Klantgerichte en representatieve uitstraling",
      "Breed muziekkennis: van top 40 tot classics",
    ],
  },
  {
    title: "Stagiair(e) Eventmanagement",
    type: "Stage (HBO/MBO)",
    description:
      "Wil je leren hoe het er achter de schermen aan toe gaat bij een professioneel DJ-bedrijf? Als stagiair(e) help je mee met eventplanning, klantcontact, social media en logistiek.",
    requirements: [
      "HBO- of MBO-student Eventmanagement, Communicatie of vergelijkbaar",
      "Enthousiast en proactief",
      "Goede beheersing van de Nederlandse taal",
      "Affiniteit met muziek en entertainment",
      "Beschikbaar voor minimaal 4 maanden",
    ],
  },
];

const reasons = [
  "Werken met professionele Pioneer- en Denon-apparatuur",
  "Gevarieerde events: bruiloften, bedrijfsfeesten, festivals",
  "Hecht en gezellig team met meer dan 30 jaar ervaring",
  "Flexibele planning en eerlijke vergoeding",
  "Doorgroeimogelijkheden binnen het team",
];

export default function VacaturesContent() {
  return (
    <MrDjLayout>
      <Breadcrumbs />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">
          Vacatures
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Werk bij Mister DJ
        </h1>
        <p className="max-w-2xl text-sm text-gray-700 md:text-base">
          Mister DJ groeit en we zijn altijd op zoek naar getalenteerde mensen
          die ons team willen versterken. Of je nu een ervaren DJ bent of wilt
          leren in de eventbranche — bekijk onze openstaande posities.
        </p>
      </section>

      {/* Why work with us */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
          Waarom werken bij Mister DJ?
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {reasons.map((reason) => (
            <li key={reason} className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
              {reason}
            </li>
          ))}
        </ul>
      </section>

      {/* Openings */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-6 text-lg font-semibold text-gray-900 md:text-xl">
          Openstaande vacatures
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {vacancies.map((v) => (
            <div
              key={v.title}
              className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-semibold text-yellow-600">
                  {v.title}
                </h3>
                <span className="rounded-full bg-yellow-400/15 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-yellow-600">
                  {v.type}
                </span>
              </div>
              <p className="mb-3 text-sm text-gray-700">{v.description}</p>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Wat we vragen
              </h4>
              <ul className="mb-4 flex-1 space-y-1.5 text-xs text-gray-700">
                {v.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                    {req}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:info@mr-dj.nl?subject=Sollicitatie%20-%20DJ%20/%20Entertainment%20Specialist"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-yellow-400 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300"
              >
                Solliciteer nu
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Open application */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-400/5 p-6 text-center">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Open sollicitatie
          </h2>
          <p className="mb-4 text-sm text-gray-700">
            Staat jouw functie er niet bij? We staan altijd open voor
            getalenteerde mensen. Stuur je CV en een korte motivatie naar{" "}
            <a
              href="mailto:info@mr-dj.nl"
              className="text-yellow-600 transition hover:text-yellow-600"
            >
              info@mr-dj.nl
            </a>{" "}
            en wie weet spreken we elkaar binnenkort.
          </p>
          <a
            href="mailto:info@mr-dj.nl?subject=Open%20sollicitatie%20Mister%20DJ"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-yellow-400 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300"
          >
            Stuur je CV
          </a>
        </div>
      </section>

      {/* Bekijk ook */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
          Bekijk ook:
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/nl/mister-dj"
            className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            <span className="mb-1 block font-semibold text-yellow-600">
              Over Mister DJ
            </span>
            Leer ons team en onze filosofie kennen.
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
    </MrDjLayout>
  );
}
