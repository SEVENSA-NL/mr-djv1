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
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import { IntroCallForm } from "@/src/components/forms/IntroCallForm";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";
import type { IntroCallRequest } from "@/src/forms/IntroCallRequest";

const BedrijfsfeestenPageSkeleton: React.FC = () => {
  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    console.log("[BEDRIJFSFEEST] Availability request", values);
  };

  const handleIntroCallSubmit = async (values: IntroCallRequest) => {
    console.log("[BEDRIJFSFEEST] Intro call request", values);
  };

  return (
    <MrDjLayout>
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
          Bedrijfsfeesten & events
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
          Een bedrijfsfeest waar collega's het nog lang over hebben.
        </h1>
        <p className="max-w-2xl text-sm text-white/80 md:text-base">
          {/* TODO: Tekst baseren op bestaande content voor bedrijfsfeesten. */}
          Mister DJ verzorgt bedrijfsfeesten voor teams, afdelingen en complete organisaties.
          Met een professionele show, heldere communicatie en muziek die past bij jullie collega's.
        </p>
      </section>

      <MrDjServices
        services={[
          {
            slug: "/nl/bedrijfsfeesten",
            title: "Bedrijfsfeest op maat",
            description:
              "Samen met HR/organisatie stemmen we show, opbouw en planning af.",
            badge: "Zakelijk",
          },
          {
            slug: "/nl/bedrijfsfeesten",
            title: "Jubileum & personeelsborrel",
            description:
              "Van achtergrondmuziek tijdens de borrel tot volle dansvloer aan het einde.",
          },
          {
            slug: "/nl/bedrijfsfeesten",
            title: "Themafeesten",
            description:
              "Bijv. jaren 80/90, foute party of bedrijfsfestival: we denken mee over muziek en sfeer.",
          },
        ]}
      />

      <MrDjPackages />

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">
              Check beschikbaarheid
            </h2>
            <p className="mb-3 text-sm text-white/80">
              Vul hieronder de basisgegevens van jullie evenement in. Je ontvangt een voorstel
              dat past bij jullie wensen en budget.
            </p>
            <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
          </div>
          <div>
            <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">
              Plan een kennismakingscall
            </h2>
            <p className="mb-3 text-sm text-white/80">
              Liever eerst even sparren over het programma of de opzet van het feest?
              Plan een korte kennismakingscall in.
            </p>
            <IntroCallForm onSubmit={handleIntroCallSubmit} />
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

export default BedrijfsfeestenPageSkeleton;
