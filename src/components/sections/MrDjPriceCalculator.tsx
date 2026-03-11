"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useInView } from "@/src/hooks/useInView";
import { trackEvent } from "@/src/utils/tracking";

interface Package {
  name: string;
  price: number;
  included: string[];
}

interface AddOn {
  name: string;
  price: number | null;
  key: string;
}

const packages: Package[] = [
  { name: "Silver", price: 950, included: [] },
  { name: "Gold", price: 1250, included: ["lichtshow"] },
  { name: "Diamond", price: 1450, included: ["lichtshow", "uplights", "sparkulars", "laser"] },
  { name: "Platinum", price: 1750, included: ["lichtshow", "uplights", "sparkulars", "laser", "photobooth"] },
];

const addOns: AddOn[] = [
  { name: "Photobooth", price: 400, key: "photobooth" },
  { name: "LED-dansvloer", price: 500, key: "led-dansvloer" },
  { name: "Sparkulars", price: 250, key: "sparkulars" },
  { name: "Uplights", price: 100, key: "uplights" },
  { name: "Laser", price: 120, key: "laser" },
  { name: "TV-scherm", price: 100, key: "tv-scherm" },
  { name: "Openingsdans-mix", price: 75, key: "openingsdans" },
  { name: "Partyfotograaf", price: 500, key: "partyfotograaf" },
  { name: "DJ + Saxofonist", price: null, key: "saxofonist" },
];

function formatPrice(n: number): string {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(n);
}

export const MrDjPriceCalculator: React.FC = () => {
  const { ref, isInView } = useInView();
  const [selectedPkg, setSelectedPkg] = useState(1); // Gold default
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [extraHours, setExtraHours] = useState(0);
  const [distance, setDistance] = useState(0);

  const pkg = packages[selectedPkg];

  const total = useMemo(() => {
    let t = pkg.price;
    t += extraHours * 75;
    if (distance > 40) t += (distance - 40) * 0.5;
    selectedAddOns.forEach((key) => {
      if (pkg.included.includes(key)) return;
      const addon = addOns.find((a) => a.key === key);
      if (addon?.price) t += addon.price;
    });
    return t;
  }, [pkg, selectedAddOns, extraHours, distance]);

  const toggleAddOn = (key: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      trackEvent("calculator_addon_toggle", { addon: key });
      return next;
    });
  };

  return (
    <section className="py-14 md:py-20 lg:py-24">
      <div ref={ref} className={`mx-auto max-w-7xl px-4 md:px-6 transition-opacity ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
        <div className="mb-10 max-w-2xl text-center md:mx-auto">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">Prijscalculator</p>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl lg:text-4xl">Stel je pakket samen</h2>
          <p className="text-sm text-gray-600 md:text-base">
            Selecteer een basispakket, voeg extra&apos;s toe en zie direct een indicatieve prijs.
          </p>
        </div>

        {/* Package selector */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {packages.map((p, i) => (
            <button
              key={p.name}
              onClick={() => { setSelectedPkg(i); trackEvent("calculator_package", { package: p.name }); }}
              className={`rounded-2xl border p-4 text-left transition ${
                i === selectedPkg
                  ? "border-yellow-400 ring-2 ring-yellow-400/40 bg-gray-100"
                  : "border-gray-200 bg-gray-50 hover:bg-white/8"
              }`}
            >
              <div className="text-base font-semibold text-gray-900">{p.name}</div>
              <div className="text-lg font-bold text-yellow-600">{formatPrice(p.price)}</div>
            </button>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mb-8">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Extra&apos;s toevoegen</h3>
          <div className="flex flex-wrap gap-2">
            {addOns.map((addon) => {
              const isIncluded = pkg.included.includes(addon.key);
              const isSelected = selectedAddOns.has(addon.key);
              return (
                <button
                  key={addon.key}
                  onClick={() => !isIncluded && addon.price !== null && toggleAddOn(addon.key)}
                  disabled={isIncluded || addon.price === null}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                    isIncluded
                      ? "border-green-500/30 bg-green-500/10 text-green-300 cursor-default"
                      : isSelected
                      ? "border-yellow-400 bg-yellow-400/15 text-yellow-600"
                      : addon.price === null
                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-default"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-yellow-500/40"
                  }`}
                >
                  {isIncluded && <span className="mr-1">&#10003;</span>}
                  {isSelected && !isIncluded && <span className="mr-1">&#10003;</span>}
                  {addon.name}
                  {isIncluded ? " (inbegrepen)" : addon.price !== null ? ` ${formatPrice(addon.price)}` : " (op aanvraag)"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Extra hours + distance */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <label className="mb-2 block text-sm font-medium text-gray-900">Extra uren</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExtraHours((h) => Math.max(0, h - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition hover:border-yellow-500"
              >-</button>
              <span className="w-8 text-center text-lg font-bold text-yellow-600">{extraHours}</span>
              <button
                onClick={() => setExtraHours((h) => Math.min(4, h + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition hover:border-yellow-500"
              >+</button>
              <span className="text-xs text-gray-500">x &euro;75/uur</span>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <label htmlFor="calc-distance" className="mb-2 block text-sm font-medium text-gray-900">Afstand tot Veldhoven (km)</label>
            <input
              id="calc-distance"
              type="number"
              min={0}
              max={300}
              value={distance || ""}
              onChange={(e) => setDistance(Number(e.target.value) || 0)}
              placeholder="bijv. 60"
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:ring-2 focus:ring-yellow-500/70"
            />
            <p className="mt-1 text-xs text-gray-400">Eerste 40km gratis, daarna &euro;0,50/km</p>
          </div>
        </div>

        {/* Total */}
        <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-6 text-center">
          <p className="text-sm text-gray-600">Geschatte prijs</p>
          <p className="text-3xl font-bold text-yellow-600">{formatPrice(total)}</p>
          <p className="mb-4 text-xs text-gray-400">Alle prijzen zijn exclusief BTW</p>
          <Link
            href="/nl/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-yellow-400 px-6 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300"
          >
            Vraag deze offerte aan
          </Link>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Prijzen zijn indicatief. Neem contact op voor een offerte op maat.
        </p>
      </div>
    </section>
  );
};
