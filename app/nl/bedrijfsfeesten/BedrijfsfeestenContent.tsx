"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { MrDjTestimonials } from "@/src/components/sections/MrDjTestimonials";
import { MrDjContact } from "@/src/components/sections/MrDjContact";
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import { IntroCallForm } from "@/src/components/forms/IntroCallForm";
import { sanitizeFormData } from "@/src/utils/sanitize";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";
import type { IntroCallRequest } from "@/src/forms/IntroCallRequest";

interface FaqItemProps {
  question: string;
  answer: string;
}

const bedrijfsfeestenFaq: FaqItemProps[] = [
  {
    question: "Hoeveel gasten kunnen jullie aan?",
    answer:
      "Wij hebben ervaring met bedrijfsfeesten van 30 tot 300 personen. De geluids- en lichtinstallatie wordt altijd afgestemd op de grootte van de ruimte en het aantal gasten.",
  },
  {
    question: "Kunnen jullie ook overdag draaien?",
    answer:
      "Jazeker! Of het nu een lunchborrel, een middagevenement of een avondfeest is — wij passen de muziek en sfeer aan op het moment van de dag en het type event.",
  },
  {
    question: "Is het mogelijk om een themafeest te organiseren?",
    answer:
      "Absoluut! Van een jaren 80/90 party tot een foute party of bedrijfsfestival — wij denken mee in het thema en zorgen voor passende muziek, verlichting en eventueel aankleding.",
  },
  {
    question: "Hoe zit het met de facturatie voor bedrijven?",
    answer:
      "Wij factureren op naam van het bedrijf, inclusief BTW-specificatie. Betaling op factuur is mogelijk met een betalingstermijn van 14 dagen. Bij boeking ontvangen jullie een duidelijke offerte.",
  },
  {
    question: "Komen jullie ook buiten Brabant?",
    answer:
      "Ja, wij komen door heel Nederland. Voor locaties buiten een straal van 50 km kunnen aanvullende reiskosten van toepassing zijn. Dit wordt altijd vooraf in de offerte vermeld.",
  },
  {
    question: "Kunnen we de DJ van tevoren ontmoeten?",
    answer:
      "Natuurlijk! Wij plannen altijd een vrijblijvend kennismakingsgesprek in. Dit kan op locatie, bij jullie op kantoor of via videobellen. Zo bespreken we samen de wensen en sfeer.",
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

export default function BedrijfsfeestenContent() {
  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    const sanitized = sanitizeFormData(values as unknown as Record<string, unknown>) as unknown as AvailabilityRequest;
    if (process.env.NODE_ENV === "development") {
      console.log("[BEDRIJFSFEEST] Availability request", sanitized);
    }
  };
  const handleIntroCallSubmit = async (values: IntroCallRequest) => {
    const sanitized = sanitizeFormData(values as unknown as Record<string, unknown>) as unknown as IntroCallRequest;
    if (process.env.NODE_ENV === "development") {
      console.log("[BEDRIJFSFEEST] Intro call request", sanitized);
    }
  };

  return (
    <MrDjLayout>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.06),_transparent_50%)]" />
      <Breadcrumbs />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">Bedrijfsfeesten &amp; events</p>
        <h1 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl">
          Bij een succesvol bedrijf hoort een succesvol feest
        </h1>
        <p className="max-w-2xl text-sm text-gray-700 md:text-base">
          Of het nu gaat om een personeelsfeest, jubileum of netwerkborrel &ndash; Mister DJ
          verzorgt een professioneel feest met een nette en representatieve uitstraling die past
          bij jullie organisatie.
        </p>
      </section>

      {/* Image + body */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <Image
              src="/images/services/bedrijfsfeesten.jpg"
              alt="Mister DJ op een bedrijfsfeest met professionele lichtshow"
              width={800}
              height={533}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
              Nette en representatieve uitstraling
            </h2>
            <p className="mb-3 text-sm text-gray-700 md:text-base">
              Wij denken mee in ieder mogelijk thema, van aankleding tot muziek. Of jullie nu een
              formele bedrijfsborrel organiseren of een losser personeelsfeest &ndash; de show wordt
              volledig afgestemd op de sfeer die jullie voor ogen hebben.
            </p>
            <p className="mb-3 text-sm text-gray-700 md:text-base">
              Met ervaring in groepen van 30 tot 300 personen weten we precies hoe we de energie
              opbouwen en de dansvloer vol krijgen. Professioneel, maar altijd met een vleugje
              Brabantse gezelligheid.
            </p>

            <h3 className="mb-2 mt-6 text-base font-semibold text-gray-900">Wat we verzorgen</h3>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Personeelsfeesten &amp; teamuitjes
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Jubilea &amp; mijlpaalvieringen
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Netwerkborrels &amp; recepties
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Themafeesten (jaren 80/90, foute party, bedrijfsfestival)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                Capaciteit: 30 tot 300 personen
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">Check beschikbaarheid</h2>
            <p className="mb-3 text-sm text-gray-700">
              Vul hieronder de basisgegevens van jullie evenement in. Je ontvangt een voorstel
              dat past bij jullie wensen en budget.
            </p>
            <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
          </div>
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">Plan een kennismakingscall</h2>
            <p className="mb-3 text-sm text-gray-700">
              Liever eerst even sparren over het programma of de opzet van het feest?
              Plan een korte kennismakingscall in.
            </p>
            <IntroCallForm onSubmit={handleIntroCallSubmit} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 md:pb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">
          Veelgestelde vragen
        </p>
        <h2 className="mb-6 text-2xl font-semibold text-gray-900 md:text-3xl">
          FAQ over bedrijfsfeesten
        </h2>
        <div className="space-y-3">
          {bedrijfsfeestenFaq.map((faq) => (
            <FaqAccordion key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      <MrDjTestimonials maxItems={6} />

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-10 text-center md:px-6 md:py-12">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 md:text-2xl">
          100% dansgarantie op jullie bedrijfsfeest?
        </h2>
        <p className="mb-5 text-sm text-gray-700 md:text-base">
          Neem vrijblijvend contact op en we bespreken samen de mogelijkheden.
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
          <Link href="/nl#mr-dj-packages" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">DJ Pakketten &amp; Prijzen</span>
            Bekijk onze pakketten van Silver tot Platinum, inclusief alle opties.
          </Link>
          <Link href="/nl/verhuur" className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 transition hover:bg-gray-100">
            <span className="block font-semibold text-yellow-600 mb-1">Verhuur</span>
            Professionele licht- en geluidsapparatuur huren in Brabant.
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
