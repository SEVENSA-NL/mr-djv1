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
import { MrDjContact } from "@/src/components/sections/MrDjContact";
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";

const ContactPageSkeleton: React.FC = () => {
  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    console.log("[CONTACT] Availability request", values);
  };

  return (
    <MrDjLayout>
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
          Contact
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
          Neem contact op of check direct de beschikbaarheid.
        </h1>
        <p className="max-w-2xl text-sm text-white/80 md:text-base">
          {/* TODO: Intro afstemmen op huidige contactpagina. */}
          Vul het formulier in om te checken of Mister DJ nog beschikbaar is op jullie datum,
          of stel gerust je vragen. Je krijgt altijd persoonlijk bericht terug.
        </p>
      </section>
      <MrDjContact>
        <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
      </MrDjContact>
    </MrDjLayout>
  );
};

export default ContactPageSkeleton;
