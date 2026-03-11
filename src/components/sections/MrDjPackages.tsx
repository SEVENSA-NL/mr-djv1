"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/src/hooks/useInView";
import { Tooltip } from "@/src/components/ui/Tooltip";
import { trackPackageView } from "@/src/utils/tracking";
import { BrochureModal } from "@/src/components/ui/BrochureModal";

interface PackageCard {
  name: string;
  badge: string;
  priceFrom: string;
  priceNote: string;
  features: string[];
  featured?: boolean;
  color: string;
}

interface AddOn {
  name: string;
  price: string;
  description: string;
  image?: string;
}

const featureTooltips: Record<string, string> = {
  "Sparkulars": "Spectaculaire vonkenregen-effecten die een wow-moment creeren, ideaal voor openingsdans of hoogtepunt van de avond.",
  "Uplights (sfeerverlichting)": "LED-spots die muren en plafond in kleur zetten. Keuze uit elke kleur, afgestemd op jullie thema.",
  "Laser": "Professionele lasershow die de dansvloer extra energie geeft met kleurrijke patronen.",
  "Professionele lichtshow": "Bewegende koppen, stroboscoop en effectverlichting voor een echte club-ervaring.",
  "Photobooth of LED-dansvloer": "Keuze uit een fotohokje met props en prints, of een verlichte dansvloer voor extra wow-factor.",
};

const packageNameColors: Record<string, string> = {
  Silver: "text-gray-300",
  Gold: "text-yellow-400",
  Diamond: "text-yellow-400",
  Platinum: "text-yellow-400",
};

const defaultPackages: PackageCard[] = [
  {
    name: "Silver",
    badge: "Basis",
    priceFrom: "\u20AC950,-",
    priceNote: "incl. BTW",
    color: "silver",
    features: [
      "Bruiloft DJ",
      "Kennismaking",
      "5 aaneengesloten uren",
      "DJ Booth met LED verlichting",
      "Professioneel geluidsset",
      "8 LED spots op statief",
      "2 Verlichte LED zuilen",
      "Op- en afbouwen van de show",
    ],
  },
  {
    name: "Gold",
    badge: "Meest gekozen",
    priceFrom: "\u20AC1.250,-",
    priceNote: "incl. BTW",
    color: "gold",
    features: [
      "Bruiloft DJ",
      "Kennismaking",
      "5 aaneengesloten uren",
      "DJ Booth met LED verlichting",
      "Professioneel geluidsset",
      "8 LED spots aan lichtbrug",
      "2 Verlichte LED zuilen",
      "Lichtbrug van 5 meter",
      "Sterrendoek van 5 meter",
      "Nevelmachine (lichte rook)",
      "Op- en afbouwen van de show",
    ],
    featured: true,
  },
  {
    name: "Diamond",
    badge: "Premium",
    priceFrom: "\u20AC1.450,-",
    priceNote: "incl. BTW",
    color: "diamond",
    features: [
      "Bruiloft DJ",
      "Kennismaking",
      "5 aaneengesloten uren",
      "DJ Booth met LED verlichting",
      "Professioneel geluidsset",
      "8 LED spots aan lichtbrug",
      "2 Verlichte LED zuilen",
      "Lichtbrug van 5 meter",
      "Sterrendoek van 5 meter",
      "Nevelmachine (lichte rook)",
      "Bewegende lichtshow met 4 movingheads",
      "Op- en afbouwen van de show",
    ],
  },
  {
    name: "Platinum",
    badge: "All-inclusive",
    priceFrom: "\u20AC1.750,-",
    priceNote: "incl. BTW",
    color: "platinum",
    features: [
      "Bruiloft DJ",
      "Kennismaking",
      "5 aaneengesloten uren",
      "DJ Booth met LED verlichting",
      "Professioneel geluidsset",
      "8 LED spots aan lichtbrug",
      "2 Verlichte LED zuilen",
      "Lichtbrug van 5 meter",
      "Sterrendoek van 5 meter",
      "Nevelmachine (lichte rook)",
      "Bewegende lichtshow met 4 movingheads",
      "Lasershow",
      "2 verticale rookmachines",
      "2 Sparkulars (koud vuurwerk)",
      "Op- en afbouwen van de show",
    ],
  },
];

const addOns: AddOn[] = [
  { name: "PhotoBooth met props", price: "\u20AC400,-", description: "Fotostrips, digitale galerij en props", image: "/images/gallery/addon-photobooth.jpg" },
  { name: "LED dansvloer (3x4m)", price: "\u20AC500,-", description: "Verlichte dansvloer, vanaf 12 M\u00B2", image: "/images/gallery/addon-led-dansvloer.jpg" },
  { name: "Openingsdans mix", price: "\u20AC75,-", description: "Gepersonaliseerde mix van meerdere nummers" },
  { name: "Live muziek", price: "Op aanvraag", description: "Saxofonist, vocalist of pianist", image: "/images/gallery/addon-live-muziek.jpg" },
  { name: "Partyfotograaf", price: "\u20AC500,-", description: "120 feestfoto\u2019s op USB" },
  { name: "Sparkulars FX", price: "\u20AC250,-", description: "Koud vuurwerk, veilig voor binnen", image: "/images/gallery/addon-sparkulars.jpg" },
  { name: "LED uplights (4x)", price: "\u20AC100,-", description: "Sfeerverlichting in elke kleur" },
  { name: "Lasershow", price: "\u20AC120,-", description: "Kleurrijke lichtstralen op de muziek", image: "/images/gallery/addon-lasershow.jpg" },
  { name: "TV scherm 50\"", price: "\u20AC100,-", description: "50 inch TV op statief incl. HDMI" },
];

interface MrDjPackagesProps {
  packages?: PackageCard[];
}

function FeatureItem({ feature }: { feature: string }) {
  const tooltip = featureTooltips[feature];
  return (
    <li className="flex gap-2">
      <svg className="mt-[0.15rem] h-4 w-4 flex-shrink-0 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
      {tooltip ? (
        <Tooltip text={tooltip}>
          <span>{feature}</span>
        </Tooltip>
      ) : (
        <span>{feature}</span>
      )}
    </li>
  );
}

export const MrDjPackages: React.FC<MrDjPackagesProps> = ({
  packages = defaultPackages,
}) => {
  const { ref, isInView } = useInView();
  const [brochureOpen, setBrochureOpen] = useState(false);

  return (
    <section className="section-dark py-14 md:py-20 lg:py-24">
      <div ref={ref} className={`mx-auto max-w-7xl px-4 md:px-6 transition-opacity ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Section header */}
        <div className="mb-10 max-w-2xl text-center md:mx-auto">
          <p className="mb-1 font-script text-2xl text-yellow-400 md:text-3xl">
            Onze pakketten
          </p>
          <h2 className="mb-3 text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
            Professioneel tot in de puntjes
          </h2>
          <p className="text-sm text-gray-300 md:text-base">
            Iedere locatie kunnen we omtoveren tot een spetterende feestlocatie.
            Alle prijzen zijn inclusief BTW.
          </p>
        </div>

        {/* Package cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col rounded-2xl border-2 p-5 shadow-xl ${
                pkg.featured
                  ? "border-yellow-400 bg-mrdj-navy-light"
                  : "border-yellow-400/30 bg-mrdj-navy-light/80"
              }`}
            >
              {/* "Meest gekozen" ribbon */}
              {pkg.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-4 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-mrdj-navy-dark shadow-lg">
                  Meest gekozen
                </div>
              )}

              <div className="mb-4 mt-1">
                <h3 className={`text-lg font-bold md:text-xl ${packageNameColors[pkg.name] || "text-yellow-400"}`}>
                  Drive-in show {pkg.name}
                </h3>
              </div>

              <ul className="mb-5 flex-1 space-y-2 text-xs text-gray-200 md:text-sm">
                {pkg.features.map((feature) => (
                  <FeatureItem key={feature} feature={feature} />
                ))}
              </ul>

              <div className="mt-auto border-t border-white/10 pt-4">
                <div className="mb-3 text-right">
                  <span className="text-2xl font-bold text-yellow-400">{pkg.priceFrom}</span>
                  <span className="ml-1 text-[0.6rem] text-gray-400">({pkg.priceNote})</span>
                </div>
                <Link
                  href="/nl/contact"
                  onClick={() => trackPackageView(pkg.name)}
                  className="flex items-center justify-center min-h-[44px] rounded-full bg-yellow-400 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mrdj-navy-dark transition hover:bg-yellow-300"
                >
                  Vrijblijvende offerte
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-[0.65rem] text-gray-400">
          <span>* Benodigde ruimte: 3.5 x 2 meter (Silver) tot 6 x 2 meter (Platinum)</span>
          <span>* Extra uren DJ + &euro;75,- per uur</span>
          <span>* Kilometervergoeding tot 40km inbegrepen, daarna &euro;0,50/km</span>
        </div>

        {/* Add-ons section */}
        <div className="mt-16">
          <p className="mb-1 text-center font-script text-2xl text-yellow-400 md:text-3xl">
            Extra opties
          </p>
          <p className="mx-auto mb-8 max-w-lg text-center text-sm text-gray-300">
            Maak jullie feest nog completer met deze toevoegingen
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="overflow-hidden rounded-xl border border-yellow-400/20 bg-mrdj-navy-light/60"
              >
                {addon.image && (
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <Image
                      src={addon.image}
                      alt={addon.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="flex items-start gap-3 p-4">
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-yellow-400">{addon.name}</span>
                    <p className="mt-0.5 text-xs text-gray-400">{addon.description}</p>
                  </div>
                  <span className="whitespace-nowrap text-sm font-bold text-white">{addon.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brochure CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setBrochureOpen(true)}
            className="inline-flex items-center justify-center min-h-[44px] rounded-full border-2 border-yellow-400/40 px-6 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-yellow-400 transition hover:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-yellow-500/30"
          >
            Download onze feestgids
          </button>
          <p className="mt-2 text-[0.65rem] text-gray-500">Gratis en vrijblijvend</p>
        </div>
        <BrochureModal isOpen={brochureOpen} onClose={() => setBrochureOpen(false)} />
      </div>
    </section>
  );
};
