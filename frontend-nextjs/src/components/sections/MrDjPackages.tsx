// src/components/sections/MrDjPackages.tsx
//
// Pakkettenoverzicht in brochurestijl.

import React from "react";
import { mrDjTheme } from "../../design/mr-dj-theme";

interface PackageCard {
  name: string;
  label?: string;
  priceFrom: string;
  description: string;
  features: string[];
}

const defaultPackages: PackageCard[] = [
  {
    name: "Feestshow Basic",
    label: "Perfect voor verjaardagen",
    priceFrom: "Vanaf € 895,-",
    description:
      "Alles wat je nodig hebt voor een geslaagd feest met volle dansvloer.",
    features: [
      "Professionele DJ-show (licht & geluid)",
      "Voorbespreking per telefoon of videocall",
      "Muziek op maat voor jullie gasten",
      "Opbouw en afbouw in overleg met locatie",
    ],
  },
  {
    name: "Bruiloftshow Deluxe",
    label: "Meest gekozen",
    priceFrom: "Vanaf € 1.295,-",
    description:
      "De complete bruiloftshow van openingsdans tot laatste knaller.",
    features: [
      "Uitgebreide licht- en geluidsset",
      "Kennismakingsgesprek + intake",
      "Openingsdans in overleg voorbereid",
      "Persoonlijke wensenlijst voor muziek",
    ],
  },
  {
    name: "XL Show met DJ + Sax",
    label: "Voor echte eyecatchers",
    priceFrom: "Vanaf € 1.795,-",
    description:
      "De energie van een live saxofonist gecombineerd met een ervaren DJ.",
    features: [
      "Bruiloftshow Deluxe inclusief",
      "Live sax set(s) op de dansvloer",
      "Strakke afstemming tussen DJ en sax",
      "Extra lichtaccenten voor nog meer beleving",
    ],
  },
];

interface MrDjPackagesProps {
  packages?: PackageCard[];
}

export const MrDjPackages: React.FC<MrDjPackagesProps> = ({
  packages = defaultPackages,
}) => {
  return (
    <section
      style={{
        paddingTop: mrDjTheme.layout.sectionPaddingY.mobile,
        paddingBottom: mrDjTheme.layout.sectionPaddingY.mobile,
      }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 max-w-lg text-center md:mx-auto">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
            Pakketten
          </p>
          <h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
            Heldere pakketten, geen kleine lettertjes.
          </h2>
          <p className="text-sm text-white/75 md:text-base">
            Iedere locatie en ieder feest is anders, maar met deze pakketten
            heb je meteen een duidelijk beeld van wat er mogelijk is.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-xl"
            >
              <div className="mb-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold md:text-base">
                    {pkg.name}
                  </h3>
                  {pkg.label && (
                    <span className="rounded-full bg-yellow-400/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-yellow-300">
                      {pkg.label}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  {pkg.priceFrom}
                </div>
              </div>
              <p className="mb-3 text-xs text-white/75 md:text-sm">
                {pkg.description}
              </p>
              <ul className="mb-4 flex-1 space-y-1.5 text-xs text-white/75 md:text-sm">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-[0.25rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-auto inline-flex items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300"
              >
                Vraag dit pakket aan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
