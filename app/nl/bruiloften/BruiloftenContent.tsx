"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { MrDjStappen } from "@/src/components/sections/MrDjStappen";
import { EventTimeline } from "@/src/components/ui/EventTimeline";
import { MrDjTestimonials } from "@/src/components/sections/MrDjTestimonials";
import { MrDjContact } from "@/src/components/sections/MrDjContact";
import { WeddingIntakeForm } from "@/src/components/forms/WeddingIntakeForm";
import { OpeningDanceMixForm } from "@/src/components/forms/OpeningDanceMixForm";
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import { sanitizeFormData } from "@/src/utils/sanitize";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import type { WeddingIntake } from "@/src/forms/WeddingIntake";
import type { OpeningDanceMixRequest } from "@/src/forms/OpeningDanceMixRequest";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";

export default function BruiloftenContent() {
  const handleWeddingIntakeSubmit = async (values: WeddingIntake) => {
    const sanitized = sanitizeFormData(values as unknown as Record<string, unknown>) as unknown as WeddingIntake;
    if (process.env.NODE_ENV === "development") {
      console.log("[BRUILOFT] Wedding intake", sanitized);
    }
  };
  const handleOpeningDanceSubmit = async (values: OpeningDanceMixRequest) => {
    const sanitized = sanitizeFormData(values as unknown as Record<string, unknown>) as unknown as OpeningDanceMixRequest;
    if (process.env.NODE_ENV === "development") {
      console.log("[BRUILOFT] Opening dance mix request", sanitized);
    }
  };
  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    const sanitized = sanitizeFormData(values as unknown as Record<string, unknown>) as unknown as AvailabilityRequest;
    if (process.env.NODE_ENV === "development") {
      console.log("[BRUILOFT] Availability request", sanitized);
    }
  };

  return (
    <MrDjLayout>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(236,72,153,0.06),_transparent_50%)]" />
      <Breadcrumbs />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">Bruiloften</p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Een romantische ceremonie, een deftige receptie en als afsluiter een knalfeest!
        </h1>
        <p className="max-w-2xl text-sm text-gray-700 md:text-base">
          Met meer dan 15 jaar ervaring met bruiloften weet Mister DJ precies hoe we van jullie
          trouwdag een onvergetelijk feest maken. Want het draait om j&uacute;llie: jullie verhaal,
          jullie muziek, jullie gasten. En natuurlijk een volle dansvloer.
        </p>
      </section>

      {/* Image + body */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <Image
              src="/images/services/bruiloften.jpg"
              alt="Mister DJ op een bruiloft met volle dansvloer en lichtshow"
              width={800}
              height={533}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
              Persoonlijk, tot in de kleinste details
            </h2>
            <p className="mb-3 text-sm text-gray-700 md:text-base">
              Elke bruiloft is uniek, en dat geldt ook voor de muziek. Daarom nemen we ruim de tijd
              om jullie wensen te bespreken. Ongeveer 6 weken voor het feest ontvangen jullie een
              persoonlijke vragenlijst waarmee we alles tot in de puntjes afstemmen: van de ceremonie
              en het diner tot de openingsdans en het avondfeest.
            </p>
            <p className="mb-3 text-sm text-gray-700 md:text-base">
              Tijdens een persoonlijk kennismakingsgesprek leren we elkaar kennen en bespreken we
              jullie visie op de dag. Zo weten we precies welke sfeer jullie voor ogen hebben.
            </p>

            <h3 className="mb-2 mt-6 text-base font-semibold text-gray-900">Wat we verzorgen</h3>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Professionele DJ-booth met state-of-the-art apparatuur
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Compleet geluidssysteem, afgestemd op jullie locatie
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Sfeervolle lichtshow die past bij het moment
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Optioneel: saxofonist (R&amp;B, Dance, Pop, Rock)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Zangers en zangeressen voor live-optredens
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Artists */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Artiesten &amp; live muziek</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="mb-1 text-base font-semibold text-yellow-600">Saxofonist</h3>
            <p className="text-sm text-gray-700">
              Onze saxofonist speelt naadloos samen met de DJ en brengt een extra dimensie op de dansvloer.
              Van R&amp;B en Dance tot Pop en Rock &ndash; hij leest het publiek en speelt daar perfect op in.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="mb-1 text-base font-semibold text-yellow-600">Zangers &amp; zangeressen</h3>
            <p className="text-sm text-gray-700">
              Wil je de ceremonie of het diner extra bijzonder maken? Onze zangers en zangeressen
              zorgen voor kippenvel op precies het juiste moment.
            </p>
          </div>
        </div>
      </section>

      {/* Practical tips */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Praktische tips voor jullie locatie</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center">
            <p className="mb-1 text-2xl font-bold text-yellow-600">Zaalcapaciteit</p>
            <p className="text-sm text-gray-700">
              Zorg dat de zaal voldoende ruimte biedt voor een dansvloer naast de tafels.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center">
            <p className="mb-1 text-2xl font-bold text-yellow-600">Min. 3 meter</p>
            <p className="text-sm text-gray-700">
              Voor een optimale lichtshow is minimaal 3 meter plafondhoogte ideaal.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center">
            <p className="mb-1 text-2xl font-bold text-yellow-600">Zitplaatsen</p>
            <p className="text-sm text-gray-700">
              Denk na over de zitplaatsverdeling zodat gasten makkelijk naar de dansvloer kunnen.
            </p>
          </div>
        </div>
      </section>

      <EventTimeline />
      <MrDjStappen variant="expanded" />

      {/* Intake forms */}
      <BruiloftenForms
        onWeddingIntakeSubmit={handleWeddingIntakeSubmit}
        onOpeningDanceSubmit={handleOpeningDanceSubmit}
      />

      <MrDjTestimonials category="bruiloft" />

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-10 text-center md:px-6 md:py-12">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 md:text-2xl">
          Ook 100% dansgarantie op jullie bruiloft?
        </h2>
        <p className="mb-5 text-sm text-gray-700 md:text-base">
          Neem vrijblijvend contact op en we bespreken samen hoe we jullie dag onvergetelijk maken.
        </p>
        <Link
          href="/nl/contact"
          className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300"
        >
          Neem contact op
        </Link>
      </section>

      {/* Bekijk ook */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Bekijk ook:</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/nl/veelgestelde-vragen" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Veelgestelde vragen</span>
            Antwoorden op de meest gestelde vragen over shows, muziek en boekingen.
          </Link>
          <Link href="/nl/impressies" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Impressies</span>
            Bekijk sfeerbeelden van bruiloften en events verzorgd door Mister DJ.
          </Link>
          <Link href="/nl/contact" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Contact</span>
            Neem vrijblijvend contact op of check direct de beschikbaarheid.
          </Link>
        </div>
      </section>

      <MrDjContact>
        <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
      </MrDjContact>
    </MrDjLayout>
  );
}

function BruiloftenForms({
  onWeddingIntakeSubmit,
  onOpeningDanceSubmit,
}: {
  onWeddingIntakeSubmit: (values: WeddingIntake) => Promise<void> | void;
  onOpeningDanceSubmit: (values: OpeningDanceMixRequest) => Promise<void> | void;
}) {
  const [openAccordion, setOpenAccordion] = useState<"intake" | "dance" | null>("intake");

  const toggle = (section: "intake" | "dance") => {
    setOpenAccordion((prev) => (prev === section ? null : section));
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
      <div className="mb-6 rounded-2xl border border-yellow-200/50 bg-gradient-to-br from-yellow-50 to-amber-50 p-5">
        <h2 className="mb-1 text-lg font-semibold text-gray-900 md:text-xl">Formulieren voor jullie bruiloft</h2>
        <p className="text-sm text-gray-700">
          Vul de bruiloft-intake in om de muziek en sfeer af te stemmen, of gebruik het openingsdans-formulier om jullie favoriete nummers door te geven.
        </p>
      </div>

      <div className="space-y-4">
        {/* Intake accordion */}
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <button
            onClick={() => toggle("intake")}
            className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gray-50"
          >
            <div>
              <h3 className="text-base font-semibold text-gray-900">Jullie bruiloft-intake</h3>
              <p className="text-sm text-gray-500">Muziek, sfeer en bijzondere momenten afstemmen</p>
            </div>
            <svg
              className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${openAccordion === "intake" ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {openAccordion === "intake" && (
            <div className="border-t border-gray-100 p-5">
              <WeddingIntakeForm onSubmit={onWeddingIntakeSubmit} />
            </div>
          )}
        </div>

        {/* Opening dance accordion */}
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <button
            onClick={() => toggle("dance")}
            className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gray-50"
          >
            <div>
              <h3 className="text-base font-semibold text-gray-900">Openingsdans-mix</h3>
              <p className="text-sm text-gray-500">Favoriete nummers en fragmenten combineren</p>
            </div>
            <svg
              className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${openAccordion === "dance" ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {openAccordion === "dance" && (
            <div className="border-t border-gray-100 p-5">
              <OpeningDanceMixForm onSubmit={onOpeningDanceSubmit} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
