"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { MrDjTestimonials } from "@/src/components/sections/MrDjTestimonials";
import { MrDjContact } from "@/src/components/sections/MrDjContact";
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import { sanitizeFormData } from "@/src/utils/sanitize";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";

export default function FeestenOverigContent() {
  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    const sanitized = sanitizeFormData(values as unknown as Record<string, unknown>) as unknown as AvailabilityRequest;
    if (process.env.NODE_ENV === "development") {
      console.log("[FEESTEN-OVERIG] Availability request", sanitized);
    }
  };

  return (
    <MrDjLayout>
      <Breadcrumbs />
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">Overige feesten</p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Een bedrijfsfeest voor de deur? Net geslaagd voor je eindexamen, een bijzondere
          verjaardag of iets anders te vieren? Mister DJ helpt er een succes van te maken!
        </h1>
      </section>

      {/* Image + body */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <Image
              src="/images/services/overige-feesten.jpg"
              alt="Mister DJ op een feest met dansende gasten"
              width={800}
              height={533}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <div>
            <p className="mb-3 text-sm text-gray-700 md:text-base">
              Een goed feest is pas compleet met een echte DJ die weet wat het publiek wil en de
              dansvloer met gemak vol krijgt. Of het nu gaat om een verjaardag, jubileum,
              geslaagd-feest of familiedag &ndash; Mister DJ zorgt voor de perfecte muzikale
              begeleiding.
            </p>

            <h2 className="mb-2 mt-6 text-base font-semibold text-gray-900">Feesten die we verzorgen</h2>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Verjaardagen (van 30 tot 300 gasten)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Jubilea &amp; huwelijksjubilea
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Geslaagd-feesten &amp; diploma-uitreikingen
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Familiedagen &amp; reünies
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Themafeesten &amp; speciale gelegenheden
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Availability form */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">Check direct of jullie datum nog vrij is</h2>
        <p className="mb-3 text-sm text-gray-700">
          Vul het formulier in en je krijgt zo snel mogelijk reactie met een passend voorstel.
        </p>
        <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
      </section>

      <MrDjTestimonials />

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-10 text-center md:px-6 md:py-12">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 md:text-2xl">
          100% dansgarantie op jouw feest?
        </h2>
        <p className="mb-5 text-sm text-gray-700 md:text-base">
          Neem vrijblijvend contact op en we maken er samen een onvergetelijk feest van.
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
          <Link href="/nl/bruiloften" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Bruiloften</span>
            De complete bruiloftshow met persoonlijk contact en muziek op maat.
          </Link>
          <Link href="/nl/bedrijfsfeesten" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Bedrijfsfeesten</span>
            Professionele DJ voor personeelsfeesten, jubilea en zakelijke events.
          </Link>
          <Link href="/nl/impressies" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Impressies</span>
            Bekijk sfeerbeelden van feesten en events verzorgd door Mister DJ.
          </Link>
        </div>
      </section>

      <MrDjContact>
        <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
      </MrDjContact>
    </MrDjLayout>
  );
}
