"use client";

import React from "react";
import Link from "next/link";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { HeadphonesIcon, SaxophoneIcon, SpotlightIcon, CameraIcon } from "@/src/components/icons";

const teamHighlights = [
  {
    Icon: HeadphonesIcon,
    color: "bg-yellow-100 text-yellow-700",
    title: "Ervaren DJ's",
    description: "Al onze DJ's zijn getraind volgens de Mister DJ-standaard: lezen van het publiek, naadloze overgangen en een persoonlijke aanpak.",
  },
  {
    Icon: SaxophoneIcon,
    color: "bg-amber-100 text-amber-700",
    title: "Live muzikanten",
    description: "Wij werken samen met professionele saxofonisten en andere muzikanten voor een unieke live-beleving op jullie feest.",
  },
  {
    Icon: SpotlightIcon,
    color: "bg-orange-100 text-orange-700",
    title: "Licht & special effects",
    description: "Van sfeervolle ambiance-verlichting tot spectaculaire effecten zoals CO2, sparkular en vlammen — wij brengen de wow-factor.",
  },
  {
    Icon: CameraIcon,
    color: "bg-yellow-100 text-yellow-600",
    title: "Fotografie & extra's",
    description: "Optioneel verzorgen we fotografie, photobooth en andere extra's zodat jullie alles uit één hand kunnen regelen.",
  },
];

const workProcess = [
  { step: "1", title: "Kennismakingsgesprek", description: "We leren elkaar kennen en bespreken jullie wensen en visie op het feest." },
  { step: "2", title: "Datum reserveren", description: "Is het klik? Dan reserveren we jullie datum en staat de afspraak vast." },
  { step: "3", title: "Wensen bespreken", description: "We gaan dieper in op de muziek, sfeer, bijzondere momenten en eventuele extra's." },
  { step: "4", title: "Offerte", description: "Jullie ontvangen een heldere offerte op maat, afgestemd op jullie wensen." },
  { step: "5", title: "Vragenlijst invullen", description: "Ongeveer 6 weken voor het feest vullen jullie een persoonlijke vragenlijst in. Zo stemmen we alles tot in de puntjes af." },
];

export default function MisterDjContent() {
  return (
    <MrDjLayout>
      <Breadcrumbs />
      {/* Hero + about */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">Mister DJ</p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Over Mister DJ
        </h1>
        <div className="max-w-3xl">
          <p className="mb-3 text-sm text-gray-700 md:text-base">
            Bij Mister DJ hebben we gezamenlijk meer dan 30 jaar ervaring in het realiseren van
            geweldige partijen en weten we als geen ander hoe we jouw of jullie feest nog
            persoonlijker maken: het draait tenslotte om gezellig samen zijn, muziek die jij graag
            hoort en dans. Daar houden we wel van!
          </p>
          <p className="mb-3 text-sm text-gray-700 md:text-base">
            Een romantische ceremonie, een bedrijfsborrel of een jubileum, Mr. DJ is van alle
            markten thuis en helpt graag met passend advies voor een perfecte en onvergetelijke dag.
          </p>
        </div>
      </section>

      {/* Waarom Mister DJ */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">Waarom Mister DJ?</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-yellow-200/50 bg-gradient-to-br from-yellow-50 to-amber-50 p-5">
            <p className="mb-1 text-2xl font-bold text-yellow-600">100%</p>
            <p className="text-sm font-semibold text-gray-900">Dansgarantie</p>
            <p className="mt-1 text-xs text-gray-600">Onze DJ&apos;s lezen de zaal en zorgen dat iedereen — van jong tot oud — de dansvloer op gaat.</p>
          </div>
          <div className="rounded-2xl border border-yellow-200/50 bg-gradient-to-br from-yellow-50 to-amber-50 p-5">
            <p className="mb-1 text-2xl font-bold text-yellow-600">10/10</p>
            <p className="text-sm font-semibold text-gray-900">Klantscore</p>
            <p className="mt-1 text-xs text-gray-600">Beoordeeld met een 10/10 op ThePerfectWedding.nl op basis van 76 reviews.</p>
          </div>
          <div className="rounded-2xl border border-yellow-200/50 bg-gradient-to-br from-yellow-50 to-amber-50 p-5">
            <p className="mb-1 text-2xl font-bold text-yellow-600">2.500+</p>
            <p className="text-sm font-semibold text-gray-900">Succesvolle feesten</p>
            <p className="mt-1 text-xs text-gray-600">Van bruiloften en bedrijfsfeesten tot jubilea — wij kennen elk type feest.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">Ons team van professionals</h2>
        <p className="mb-6 max-w-3xl text-sm text-gray-700 md:text-base">
          Mister DJ is opgericht door Bart van de Weijer en uitgegroeid tot een hecht team van professionals.
          Elke DJ in ons team is zorgvuldig geselecteerd en getraind op de Mister DJ-standaard:
          persoonlijke aandacht, het lezen van het publiek en het neerzetten van een onvergetelijk feest.
          Wij koppelen altijd de best passende DJ aan jullie evenement.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamHighlights.map((item) => (
            <div
              key={item.title}
              className="card-elevated"
            >
              <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full ${item.color}`}>
                <item.Icon className="h-7 w-7" />
              </div>
              <h3 className="mb-1.5 text-base font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work process */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-6 text-lg font-semibold text-gray-900 md:text-xl">Onze werkwijze</h2>
        <div className="relative space-y-8">
          {workProcess.map((item, index) => (
            <div key={item.step} className="relative flex gap-6">
              {/* Timeline spine */}
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-base font-bold text-black shadow-md ring-4 ring-white">
                  {item.step}
                </div>
                {index < workProcess.length - 1 && (
                  <div className="mt-2 w-0.5 flex-1 bg-yellow-200" />
                )}
              </div>
              {/* Content card */}
              <div className={`flex-1 rounded-2xl border p-5 shadow-sm ${
                index === 0
                  ? "border-yellow-200/50 bg-gradient-to-br from-yellow-50 to-amber-50"
                  : "border-gray-200 bg-white"
              }`}>
                <h3 className="mb-1 text-base font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bekijk ook */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Bekijk ook:</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/nl/bruiloften" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Bruiloften</span>
            De complete bruiloftshow met persoonlijk contact en muziek op maat.
          </Link>
          <Link href="/nl/impressies" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Impressies</span>
            Bekijk sfeerbeelden van feesten en events verzorgd door Mister DJ.
          </Link>
          <Link href="/nl/contact" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Contact</span>
            Neem vrijblijvend contact op of check direct de beschikbaarheid.
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-10 text-center md:px-6 md:py-12">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 md:text-2xl">
          100% dansgarantie op jouw feest
        </h2>
        <p className="mb-5 text-sm text-gray-700 md:text-base">
          Benieuwd wat Mister DJ voor jullie kan betekenen? Neem vrijblijvend contact op!
        </p>
        <Link
          href="/nl/contact"
          className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300"
        >
          Neem contact op
        </Link>
      </section>
    </MrDjLayout>
  );
}
