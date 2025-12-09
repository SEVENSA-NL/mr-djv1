// src/components/sections/MrDjServices.tsx
//
// Overzicht van de belangrijkste diensten (bruiloften, bedrijfsfeesten, etc.).

import React from "react";
import { mrDjTheme } from "../../design/mr-dj-theme";

interface ServiceCard {
  slug: string;
  title: string;
  description: string;
  badge?: string;
}

const defaultServices: ServiceCard[] = [
  {
    slug: "/nl/bruiloften",
    title: "Bruiloft DJ",
    description:
      "Van ceremonie tot laatste knaller: één DJ die jullie verhaal kent en de dansvloer vol houdt.",
    badge: "100% dansgarantie",
  },
  {
    slug: "/nl/bedrijfsfeesten",
    title: "Bedrijfsfeesten & events",
    description:
      "Van bedrijfsborrel tot jubileum: professionele show die past bij jullie organisatie en gasten.",
  },
  {
    slug: "/nl/feesten-overig",
    title: "Verjaardagen & overige feesten",
    description:
      "Jarig, geslaagd of zomaar zin in een feestje? We bouwen graag mee aan jullie avond.",
  },
  {
    slug: "/nl/bruiloften",
    title: "DJ + Live Sax",
    description:
      "Voor dat extra wow-effect op de dansvloer: DJ en saxofonist die perfect op elkaar ingespeeld zijn.",
    badge: "Populair",
  },
];

interface MrDjServicesProps {
  services?: ServiceCard[];
}

export const MrDjServices: React.FC<MrDjServicesProps> = ({
  services = defaultServices,
}) => {
  return (
    <section
      style={{
        paddingTop: mrDjTheme.layout.sectionPaddingY.mobile,
        paddingBottom: mrDjTheme.layout.sectionPaddingY.mobile,
      }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 max-w-lg">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
            Voor elk feest het juiste plan
          </p>
          <h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
            Jullie avond, jullie muziek – Mister DJ regelt de rest.
          </h2>
          <p className="text-sm text-white/75 md:text-base">
            Of het nu gaat om een intieme bruiloft, groot bedrijfsfeest of knallende verjaardag,
            de show wordt volledig afgestemd op jullie wensen, locatie en gasten.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <a
              key={service.slug}
              href={service.slug}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-lg transition hover:border-yellow-300/70 hover:bg-white/10"
            >
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-sm font-semibold md:text-base">
                    {service.title}
                  </h3>
                  {service.badge && (
                    <span className="rounded-full bg-yellow-400/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-yellow-300">
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/75 md:text-sm">
                  {service.description}
                </p>
              </div>
              <div className="mt-4 flex items-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-yellow-300">
                <span>Meer over {service.title.toLowerCase()}</span>
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
