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
import { MrDjGallery } from "@/src/components/sections/MrDjGallery";

const ImpressiesPageSkeleton: React.FC = () => {
  return (
    <MrDjLayout>
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
          Impressies
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
          Een sfeerimpressie van feesten met Mister DJ.
        </h1>
        <p className="max-w-2xl text-sm text-white/80 md:text-base">
          {/* TODO: Korte introductietekst + link naar social media / reels. */}
          Hieronder zie je een selectie van foto's en momenten. In de praktijk stemmen we de show
          uiteraard altijd af op jullie locatie, gasten en wensen.
        </p>
      </section>
      <MrDjGallery />
    </MrDjLayout>
  );
};

export default ImpressiesPageSkeleton;
