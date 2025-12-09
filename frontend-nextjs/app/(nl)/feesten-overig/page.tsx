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
import { MrDjServices } from "@/src/components/sections/MrDjServices";
import { MrDjTestimonials } from "@/src/components/sections/MrDjTestimonials";
import { MrDjContact } from "@/src/components/sections/MrDjContact";
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";

const FeestenOverigPageSkeleton: React.FC = () => {
  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    console.log("[FEESTEN-OVERIG] Availability request", values);
  };

  return (
    <MrDjLayout>
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
          Verjaardagen, jubilea & overige feesten
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
          Elk feest een eigen verhaal – maar altijd met volle dansvloer.
        </h1>
        <p className="max-w-2xl text-sm text-white/80 md:text-base">
          {/* TODO: Content over overige feesten invullen op basis van bestaande teksten. */}
          Of het nu gaat om een verjaardag, jubileum, familiedag of andere reden voor een feestje,
          Mister DJ zorgt voor de juiste muziek op het juiste moment.
        </p>
      </section>

      <MrDjServices />

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">
          Check direct of jullie datum nog vrij is
        </h2>
        <p className="mb-3 text-sm text-white/80">
          Vul het formulier in en je krijgt zo snel mogelijk reactie met een passend voorstel.
        </p>
        <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
      </section>

      <MrDjTestimonials />

      <MrDjContact>
        <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
      </MrDjContact>
    </MrDjLayout>
  );
};

export default FeestenOverigPageSkeleton;
