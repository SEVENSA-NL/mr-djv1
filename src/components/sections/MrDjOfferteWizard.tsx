"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/src/hooks/useInView";
import { trackEvent } from "@/src/utils/tracking";

interface Package {
  name: string;
  price: number;
  included: string[];
  description: string;
  popular?: boolean;
}

interface AddOn {
  name: string;
  price: number | null;
  key: string;
}

const eventTypes = [
  { key: "bruiloft", label: "Bruiloft", icon: "heart", image: "/images/services/bruiloften.jpg" },
  { key: "bedrijfsfeest", label: "Bedrijfsfeest", icon: "building", image: "/images/services/bedrijfsfeesten.jpg" },
  { key: "verjaardag", label: "Verjaardag", icon: "cake", image: "/images/services/verjaardag.jpg" },
  { key: "eindexamen", label: "Eindexamenfeest", icon: "graduation", image: "/images/services/eindexamenfeest.jpg" },
  { key: "jubileum", label: "Jubileum", icon: "trophy", image: "/images/services/jubileum.jpg" },
  { key: "kerstfeest", label: "Kerstfeest", icon: "snowflake", image: "/images/services/kerstfeest.jpg" },
] as const;

const packages: Package[] = [
  { name: "Silver", price: 950, included: [], description: "DJ met professioneel geluid" },
  { name: "Gold", price: 1250, included: ["lichtshow"], description: "DJ + sfeervolle lichtshow", popular: true },
  { name: "Diamond", price: 1450, included: ["lichtshow", "uplights", "sparkulars", "laser"], description: "Complete beleving met effecten" },
  { name: "Platinum", price: 1750, included: ["lichtshow", "uplights", "sparkulars", "laser", "photobooth"], description: "All-in premium pakket" },
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

function EventIcon({ type, className }: { type: string; className?: string }) {
  const cls = className || "h-8 w-8";
  switch (type) {
    case "heart":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;
    case "building":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>;
    case "cake":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m18-4.5a23.72 23.72 0 00-4.5-.528m4.5.528V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-5.992M6 13.608v-.513m12 .513v-.513" /></svg>;
    case "graduation":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>;
    case "trophy":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.996.178-1.768.563-2.152 1.025a.993.993 0 00-.182.506 1.02 1.02 0 00.297.77c.741.758 2.766 1.456 5.323 1.77m0 0a63.135 63.135 0 016.929 0m-6.929 0a63.228 63.228 0 00-.452 3.443m7.381-3.443a63.228 63.228 0 01.452 3.443m-7.833 0a63.953 63.953 0 007.834 0" /></svg>;
    case "snowflake":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-3 3m3-3l3 3m-3 15l-3-3m3 3l3-3M3 12h18m-18 0l3-3m-3 3l3 3m15-3l-3-3m3 3l-3 3" /></svg>;
    default:
      return null;
  }
}

export const MrDjOfferteWizard: React.FC = () => {
  const { ref, isInView } = useInView();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedPkg, setSelectedPkg] = useState(-1);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [extraHours, setExtraHours] = useState(0);
  const [distance, setDistance] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const pkg = selectedPkg >= 0 ? packages[selectedPkg] : null;

  const total = useMemo(() => {
    if (!pkg) return 0;
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

  const goTo = useCallback((target: number) => {
    setDirection(target > step ? "left" : "right");
    setStep(target);
  }, [step]);

  const toggleAddOn = (key: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const queryParams = pkg
    ? `?pakket=${pkg.name.toLowerCase()}&type=${selectedType}${selectedAddOns.size ? `&addons=${Array.from(selectedAddOns).join(",")}` : ""}${extraHours ? `&extra_uren=${extraHours}` : ""}`
    : "";

  return (
    <section className="py-14 md:py-20 lg:py-24">
      <div ref={ref} className={`mx-auto max-w-4xl px-4 md:px-6 transition-opacity ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-600">Offerte Wizard</p>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl lg:text-4xl">Stel je offerte samen</h2>
          <p className="text-sm text-gray-600 md:text-base">In 4 stappen naar jouw persoonlijke offerte.</p>
        </div>

        {/* Progress bar */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <React.Fragment key={s}>
              <button
                onClick={() => {
                  if (s < step) goTo(s);
                }}
                disabled={s > step}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  s === step
                    ? "bg-yellow-400 text-black scale-110 shadow-md"
                    : s < step
                    ? "bg-yellow-100 text-yellow-700 cursor-pointer hover:bg-yellow-200"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {s < step ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                ) : (
                  s
                )}
              </button>
              {s < 4 && <div className={`h-0.5 w-8 rounded transition-colors ${s < step ? "bg-yellow-400" : "bg-gray-200"}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Steps container */}
        <div className="relative overflow-hidden">
          <div
            className={`transition-all duration-300 ease-in-out ${
              direction === "left" ? "animate-slide-in-left" : "animate-slide-in-right"
            }`}
            key={step}
          >
            {/* Step 1: Event type */}
            {step === 1 && (
              <div>
                <h3 className="mb-6 text-center text-lg font-semibold text-gray-900">Wat voor feest wordt het?</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {eventTypes.map((et) => (
                    <button
                      key={et.key}
                      onClick={() => {
                        setSelectedType(et.key);
                        trackEvent("wizard_event_type", { type: et.key });
                        goTo(2);
                      }}
                      className={`group relative overflow-hidden rounded-2xl border transition-all hover:border-yellow-400 hover:shadow-md ${
                        selectedType === et.key ? "border-yellow-400 ring-2 ring-yellow-400/40" : "border-gray-200"
                      }`}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image src={et.image} alt={et.label} fill className="object-cover brightness-90 transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-white/80 mb-1">
                          <EventIcon type={et.icon} className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-semibold text-white">{et.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Package selection */}
            {step === 2 && (
              <div>
                <h3 className="mb-6 text-center text-lg font-semibold text-gray-900">Kies je basispakket</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {packages.map((p, i) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        setSelectedPkg(i);
                        trackEvent("wizard_package", { package: p.name });
                        goTo(3);
                      }}
                      className={`relative rounded-2xl border p-5 text-left transition-all hover:border-yellow-400 hover:shadow-md ${
                        i === selectedPkg ? "border-yellow-400 bg-yellow-50 ring-2 ring-yellow-400/40" : "border-gray-200 bg-white"
                      }`}
                    >
                      {p.popular && (
                        <span className="absolute -top-2.5 right-4 rounded-full bg-yellow-400 px-3 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-black">
                          Meest gekozen
                        </span>
                      )}
                      <div className="text-lg font-bold text-gray-900">{p.name}</div>
                      <div className="text-2xl font-bold text-yellow-600">{formatPrice(p.price)}</div>
                      <p className="mt-1 text-xs text-gray-500">{p.description}</p>
                      {p.included.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {p.included.map((inc) => {
                            const addon = addOns.find((a) => a.key === inc);
                            return (
                              <span key={inc} className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[0.6rem] font-medium text-green-700">
                                <svg className="mr-0.5 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                {addon?.name || inc}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-start">
                  <button onClick={() => goTo(1)} className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">&larr; Terug</button>
                </div>
              </div>
            )}

            {/* Step 3: Add-ons */}
            {step === 3 && pkg && (
              <div>
                <h3 className="mb-6 text-center text-lg font-semibold text-gray-900">Extra&apos;s toevoegen</h3>

                <div className="mb-6 flex flex-wrap gap-2 justify-center">
                  {addOns.map((addon) => {
                    const isIncluded = pkg.included.includes(addon.key);
                    const isSelected = selectedAddOns.has(addon.key);
                    return (
                      <button
                        key={addon.key}
                        onClick={() => !isIncluded && addon.price !== null && toggleAddOn(addon.key)}
                        disabled={isIncluded || addon.price === null}
                        className={`rounded-full border px-4 py-2.5 text-xs font-medium transition-all ${
                          isIncluded
                            ? "border-green-300 bg-green-50 text-green-600 cursor-default"
                            : isSelected
                            ? "border-yellow-400 bg-yellow-50 text-yellow-700 shadow-sm"
                            : addon.price === null
                            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-default"
                            : "border-gray-200 bg-white text-gray-600 hover:border-yellow-400"
                        }`}
                      >
                        {(isIncluded || isSelected) && <span className="mr-1">&#10003;</span>}
                        {addon.name}
                        {isIncluded ? " (inbegrepen)" : addon.price !== null ? ` ${formatPrice(addon.price)}` : " (op aanvraag)"}
                      </button>
                    );
                  })}
                </div>

                {/* Extra hours + distance */}
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 bg-white p-5">
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
                      <span className="text-xs text-gray-500">&times; &euro;75/uur</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <label htmlFor="wizard-distance" className="mb-2 block text-sm font-medium text-gray-900">Afstand tot Veldhoven (km)</label>
                    <input
                      id="wizard-distance"
                      type="number"
                      min={0}
                      max={300}
                      value={distance || ""}
                      onChange={(e) => setDistance(Number(e.target.value) || 0)}
                      placeholder="bijv. 60"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:ring-2 focus:ring-yellow-500/70"
                    />
                    <p className="mt-1 text-xs text-gray-400">Eerste 40km gratis, daarna &euro;0,50/km</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button onClick={() => goTo(2)} className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">&larr; Terug</button>
                  <button
                    onClick={() => { trackEvent("wizard_addons_done"); goTo(4); }}
                    className="inline-flex min-h-[44px] items-center rounded-full bg-yellow-400 px-6 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300"
                  >
                    Bekijk samenvatting &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Summary */}
            {step === 4 && pkg && (
              <div>
                <h3 className="mb-6 text-center text-lg font-semibold text-gray-900">Jouw samenvatting</h3>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
                  {/* Event type */}
                  <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Type feest:</span>
                    {eventTypes.find((e) => e.key === selectedType)?.label || "Niet gekozen"}
                  </div>

                  {/* Package */}
                  <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{pkg.name} pakket</span>
                      <span className="ml-2 text-xs text-gray-500">{pkg.description}</span>
                    </div>
                    <span className="font-bold text-gray-900">{formatPrice(pkg.price)}</span>
                  </div>

                  {/* Add-ons */}
                  {selectedAddOns.size > 0 && (
                    <div className="mb-4 space-y-2 border-b border-gray-100 pb-4">
                      {Array.from(selectedAddOns).map((key) => {
                        const addon = addOns.find((a) => a.key === key);
                        if (!addon || pkg.included.includes(key)) return null;
                        return (
                          <div key={key} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">+ {addon.name}</span>
                            <span className="text-gray-900">{addon.price ? formatPrice(addon.price) : "Op aanvraag"}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Extra hours */}
                  {extraHours > 0 && (
                    <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4 text-sm">
                      <span className="text-gray-600">+ {extraHours} extra {extraHours === 1 ? "uur" : "uren"}</span>
                      <span className="text-gray-900">{formatPrice(extraHours * 75)}</span>
                    </div>
                  )}

                  {/* Distance */}
                  {distance > 40 && (
                    <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4 text-sm">
                      <span className="text-gray-600">+ Reiskosten ({distance} km)</span>
                      <span className="text-gray-900">{formatPrice((distance - 40) * 0.5)}</span>
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-gray-900">Totaal</span>
                    <span className="text-2xl font-bold text-yellow-600">{formatPrice(total)}</span>
                  </div>
                  <p className="mt-1 text-right text-xs text-gray-400">Alle prijzen excl. BTW</p>

                  {/* CTA buttons */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                      href={`/nl/contact${queryParams}`}
                      onClick={() => trackEvent("wizard_request_quote", { package: pkg.name, total: String(total) })}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-yellow-400 px-8 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-300 hover:shadow-md"
                    >
                      Vraag deze offerte aan
                    </Link>
                    <a
                      href="/downloads/mister-dj-feestgids.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
                    >
                      Download feestgids
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex justify-start">
                  <button onClick={() => goTo(3)} className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">&larr; Terug</button>
                </div>
                <p className="mt-4 text-center text-xs text-gray-400">
                  Prijzen zijn indicatief. Neem contact op voor een offerte op maat.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Running total (visible on steps 2-3) */}
        {(step === 2 || step === 3) && total > 0 && (
          <div className="fixed bottom-20 right-4 z-40 rounded-2xl border border-yellow-400/30 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm md:bottom-24 md:right-8">
            <p className="text-[0.6rem] font-medium uppercase tracking-wider text-gray-500">Geschat totaal</p>
            <p className="text-lg font-bold text-yellow-600">{formatPrice(total)}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};
