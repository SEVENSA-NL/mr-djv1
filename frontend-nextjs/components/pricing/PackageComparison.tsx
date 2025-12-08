'use client';

import { PACKAGES } from '@/lib/data/pricing';

export function PackageComparison() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-slate-900">
          Vergelijk onze pakketten
        </h2>

        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b border-slate-200 py-3 pr-4 text-left text-slate-500">
                  Kenmerk
                </th>
                {PACKAGES.map((pkg) => (
                  <th
                    key={pkg.id}
                    className="border-b border-slate-200 px-4 py-3 text-left text-slate-900"
                  >
                    {pkg.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-slate-100 py-3 pr-4 text-slate-600">Prijs</td>
                {PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="border-b border-slate-100 px-4 py-3 font-semibold">
                    €{pkg.basePrice}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border-b border-slate-100 py-3 pr-4 text-slate-600">Duur</td>
                {PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="border-b border-slate-100 px-4 py-3">
                    {pkg.duration}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border-b border-slate-100 py-3 pr-4 text-slate-600">
                  Aantal gasten
                </td>
                {PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="border-b border-slate-100 px-4 py-3">
                    {pkg.guestCapacity}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border-b border-slate-100 py-3 pr-4 text-slate-600">
                  Inclusieve features
                </td>
                {PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="border-b border-slate-100 px-4 py-3 align-top">
                    <ul className="list-disc space-y-1 pl-4 text-xs text-slate-700">
                      {pkg.features.slice(0, 4).map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-4 md:hidden">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{pkg.name}</h3>
                {pkg.recommended && (
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                    ⭐ Meest gekozen
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600">{pkg.subtitle}</p>
              <p className="mt-3 text-xl font-bold text-slate-900">€{pkg.basePrice}</p>
              <p className="mt-1 text-xs text-slate-600">
                {pkg.duration} • {pkg.guestCapacity}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-slate-700">
                {pkg.features.slice(0, 4).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PackageComparison;
