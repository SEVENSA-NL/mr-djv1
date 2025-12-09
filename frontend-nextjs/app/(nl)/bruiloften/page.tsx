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
import { MrDjPackages } from "@/src/components/sections/MrDjPackages";
import { MrDjTestimonials } from "@/src/components/sections/MrDjTestimonials";
import { MrDjContact } from "@/src/components/sections/MrDjContact";
import { WeddingIntakeForm } from "@/src/components/forms/WeddingIntakeForm";
import { OpeningDanceMixForm } from "@/src/components/forms/OpeningDanceMixForm";
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import type { WeddingIntake } from "@/src/forms/WeddingIntake";
import type { OpeningDanceMixRequest } from "@/src/forms/OpeningDanceMixRequest";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";

const BruiloftenPageSkeleton: React.FC = () => {
  const handleWeddingIntakeSubmit = async (values: WeddingIntake) => {
    console.log("[BRUILOFT] Wedding intake", values);
  };

  const handleOpeningDanceSubmit = async (values: OpeningDanceMixRequest) => {
    console.log("[BRUILOFT] Opening dance mix request", values);
  };

  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    console.log("[BRUILOFT] Availability request", values);
  };

  return (
    <MrDjLayout>
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
          Bruiloften
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
          Jullie bruiloft, jullie verhaal – met een volle dansvloer als sluitstuk.
        </h1>
        <p className="max-w-2xl text-sm text-white/80 md:text-base">
          {/* TODO: Vul deze tekst met de inhoud uit de bruiloft-brochure en www.mr-dj.nl/bruiloften. */}
          Mister DJ begeleidt jullie van eerste kennismaking tot laatste plaat. Hier leg je kort uit
          hoe je werkwijze is, wat jullie mogen verwachten en waarom zoveel bruidsparen voor Mister DJ kiezen.
        </p>
      </section>

      <MrDjServices
        services={[
          {
            slug: "/nl/bruiloften",
            title: "Complete bruiloftshow",
            description:
              "Van openingsdans tot laatste knaller, afgestemd op jullie gasten en locatie.",
            badge: "Meest gekozen",
          },
          {
            slug: "/nl/bruiloften",
            title: "Ceremonie & receptie",
            description:
              "Muzikale omlijsting van ceremonie en borrel voordat het feest losbarst.",
          },
          {
            slug: "/nl/bruiloften",
            title: "DJ + Live Sax",
            description:
              "Extra energie op de dansvloer met een saxofonist die perfect samenwerkt met de DJ.",
            badge: "Premium",
          },
        ]}
      />

      <MrDjPackages />

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">
              Jullie bruiloft-intake
            </h2>
            <p className="mb-3 text-sm text-white/80">
              {/* TODO: Tekst aansluiten op PDF-vragenlijst. */}
              Vooraf nemen we rustig de tijd om jullie wensen door te spreken. Via deze digitale
              vragenlijst krijgen we een goed beeld van de gasten, sfeer, muziekvoorkeuren en
              bijzondere momenten.
            </p>
            <WeddingIntakeForm onSubmit={handleWeddingIntakeSubmit} />
          </div>
          <div>
            <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">
              Openingsdans-mix
            </h2>
            <p className="mb-3 text-sm text-white/80">
              Willen jullie meerdere nummers combineren in één openingsdans? Met dit formulier
              kun je eenvoudig jullie favoriete nummers en fragmenten doorgeven.
            </p>
            <OpeningDanceMixForm onSubmit={handleOpeningDanceSubmit} />
          </div>
        </div>
      </section>

      <MrDjTestimonials />

      <MrDjContact>
        <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
      </MrDjContact>
    </MrDjLayout>
  );
};

export default BruiloftenPageSkeleton;
