'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ADD_ONS, PACKAGES, type Package } from '@/lib/data/pricing';

export interface PriceCalculatorProps {
  locale: string;
}

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ locale }) => {
  const [selectedPackage, setSelectedPackage] = useState<Package['id']>('zilver');
  const [guestCount, setGuestCount] = useState<number>(100);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const pkg = PACKAGES.find((p) => p.id === selectedPackage);
    const pkgPrice = pkg?.basePrice || 0;

    const addOnsPrice = Array.from(selectedAddOns).reduce((sum, addOnId) => {
      const addOn = ADD_ONS.find((a) => a.id === addOnId);
      return sum + (addOn?.price || 0);
    }, 0);

    setTotal(pkgPrice + addOnsPrice);
  }, [selectedPackage, selectedAddOns]);

  const handleAddOnToggle = (addOnId: string) => {
    const newAddOns = new Set(selectedAddOns);
    if (newAddOns.has(addOnId)) {
      newAddOns.delete(addOnId);
    } else {
      newAddOns.add(addOnId);
    }
    setSelectedAddOns(newAddOns);

    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('price_calculator_addon_toggle', {
        addon_id: addOnId,
        action: newAddOns.has(addOnId) ? 'added' : 'removed',
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handlePackageChange = (pkgId: Package['id']) => {
    setSelectedPackage(pkgId);

    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('price_calculator_package_change', {
        package_id: pkgId,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const getRecommendedPackage = useCallback((): Package['id'] => {
    if (guestCount < 80) return 'brons';
    if (guestCount >= 150) return 'goud';
    return 'zilver';
  }, [guestCount]);

  useEffect(() => {
    const recommended = getRecommendedPackage();
    if (recommended !== selectedPackage) {
      // Reservation for future UX nudges
    }
  }, [getRecommendedPackage, selectedPackage]);

  const handleGetQuote = () => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('price_calculator_get_quote', {
        package_id: selectedPackage,
        guest_count: guestCount,
        addons: Array.from(selectedAddOns),
        total_price: total,
        timestamp: new Date().toISOString(),
      });
    }

    const pkg = PACKAGES.find((p) => p.id === selectedPackage);
    const queryParams = new URLSearchParams({
      package: pkg?.name || '',
      guests: guestCount.toString(),
      total: total.toString(),
    });

    window.location.href = `/${locale}/contact?${queryParams.toString()}`;
  };

  return (
    <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-lg sm:p-10">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">💰 Prijs Calculator</h2>
        <p className="text-sm text-slate-600">
          Bereken direct wat jouw feest ongeveer gaat kosten. Je ontvangt altijd een persoonlijke
          offerte op maat.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-8">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Aantal gasten: <strong>{guestCount}</strong>
            </label>
            <input
              type="range"
              min={20}
              max={300}
              step={10}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-amber-500"
            />
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>20</span>
              <span>150</span>
              <span>300+</span>
            </div>
            {getRecommendedPackage() !== selectedPackage && (
              <p className="mt-2 text-sm text-amber-700">
                💡 Tip: Voor {guestCount} gasten raden we het{' '}
                <strong>
                  {PACKAGES.find((p) => p.id === getRecommendedPackage())?.name}
                </strong>{' '}
                aan.
              </p>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Kies je pakket
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => handlePackageChange(pkg.id)}
                  className={`flex flex-col rounded-xl border p-4 text-left transition ${
                    selectedPackage === pkg.id
                      ? 'border-amber-500 bg-amber-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-amber-300'
                  }`}
                >
                  {pkg.recommended && (
                    <span className="mb-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                      ⭐ Meest gekozen
                    </span>
                  )}
                  <h4 className="text-base font-semibold text-slate-900">{pkg.name}</h4>
                  <p className="mt-1 text-xs text-slate-600">{pkg.subtitle}</p>
                  <p className="mt-3 text-lg font-bold text-slate-900">€{pkg.basePrice}</p>
                  <p className="mt-1 text-xs text-slate-500">{pkg.duration}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Extra&apos;s toevoegen
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {ADD_ONS.map((addOn) => (
                <label
                  key={addOn.id}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 hover:border-amber-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedAddOns.has(addOn.id)}
                    onChange={() => handleAddOnToggle(addOn.id)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                  />
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900">
                        {addOn.name}
                        {addOn.popular && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                            🔥 Populair
                          </span>
                        )}
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        +€{addOn.price}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">{addOn.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Samenvatting
          </h3>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex justify-between">
              <span>Pakket</span>
              <span>{PACKAGES.find((p) => p.id === selectedPackage)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Basisprijs</span>
              <span>€{PACKAGES.find((p) => p.id === selectedPackage)?.basePrice}</span>
            </div>
            {Array.from(selectedAddOns).map((addOnId) => {
              const addOn = ADD_ONS.find((a) => a.id === addOnId);
              if (!addOn) return null;
              return (
                <div key={addOnId} className="flex justify-between text-xs">
                  <span>{addOn.name}</span>
                  <span>+€{addOn.price}</span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-200 pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-slate-900">Totaal (excl. BTW)</span>
              <span className="text-2xl font-bold text-slate-900">€{total}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Exacte prijs wordt bevestigd in je persoonlijke offerte.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGetQuote}
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-amber-400 hover:shadow-lg"
          >
            ✨ Offerte aanvragen voor €{total}
          </button>
        </aside>
      </div>
    </div>
  );
};

export default PriceCalculator;
