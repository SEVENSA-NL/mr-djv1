// Mister DJ – NL page skeleton
// Onderdeel van dev-kit Z05–Z06 (all-in-one met Z03–Z04).
// Gebruik dit als basis voor app/(nl)/.../page.tsx.
// Agent-taken:
// - imports aanpassen op jouw alias-structuur (@/ vs ../..)
// - content uit www.mr-dj.nl + brochures invullen
// - Z03-formulieren koppelen aan API/mail/CRM

"use client";

import React from "react";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";

interface FaqItem {
  question: string;
  answer: string;
}

const placeholderFaq: FaqItem[] = [
  {
    question: "Hoe lang draait Mister DJ op een gemiddelde avond?",
    answer:
      "TODO: Vul in op basis van FAQ-teksten op de huidige website. Bijvoorbeeld: standaard x uur draaien, in overleg uit te breiden.",
  },
  {
    question: "Draai je op elke locatie in Nederland?",
    answer:
      "TODO: Beschrijf werkgebied (bijv. regio Brabant & omstreken) en mogelijkheden daarbuiten.",
  },
  {
    question: "Kunnen we een wensenlijst met muziek doorgeven?",
    answer:
      "TODO: Leg uit hoe je omgaat met wensenlijsten, do / don't lists en verzoeknummers.",
  },
];

const VeelgesteldeVragenPageSkeleton: React.FC = () => {
  return (
    <MrDjLayout>
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
          Veelgestelde vragen
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
          Antwoorden op de meest gestelde vragen.
        </h1>
        <p className="mb-6 max-w-2xl text-sm text-white/80 md:text-base">
          {/* TODO: Intro afstemmen op bestaande FAQ-pagina. */}
          Vind je hieronder niet wat je zoekt? Neem gerust contact op, we denken graag mee.
        </p>

        <div className="space-y-3">
          {placeholderFaq.map((item) => (
            <details
              key={item.question}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-white">
                {item.question}
              </summary>
              <div className="mt-2 text-xs text-white/80 md:text-sm">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </MrDjLayout>
  );
};

export default VeelgesteldeVragenPageSkeleton;
