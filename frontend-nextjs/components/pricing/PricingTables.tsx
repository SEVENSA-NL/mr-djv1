'use client';

import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { PACKAGES } from '@/lib/data/pricing';
import { PricingCard, type PricingFeatureSet } from './PricingCard';

export interface PricingTablesProps {
  packages?: PricingFeatureSet[];
  locale?: string;
}

const formatCurrency = (locale?: string) =>
  new Intl.NumberFormat(locale === 'en' ? 'en-NL' : 'nl-NL', {
    style: 'currency',
    currency: 'EUR',
  });

const buildPackages = (locale?: string): PricingFeatureSet[] => {
  const fmt = formatCurrency(locale);
  return PACKAGES.map((pkg) => ({
    name: locale === 'en' ? pkg.nameEn : pkg.name,
    subtitle: locale === 'en' ? pkg.subtitleEn : pkg.subtitle,
    price: fmt.format(pkg.basePrice),
    features: (locale === 'en' ? pkg.featuresEn : pkg.features).slice(0, 6),
    isFeatured: pkg.isFeatured,
    buttonText:
      locale === 'en'
        ? pkg.id === 'zilver'
          ? 'Book your intake →'
          : pkg.id === 'goud'
            ? 'Request proposal →'
            : 'Check availability'
        : pkg.id === 'zilver'
          ? 'Plan je event →'
          : pkg.id === 'goud'
            ? 'Vraag vrijblijvende offerte →'
            : 'Bekijk beschikbaarheid',
  }));
};

export function PricingTables({ packages = [] }: PricingTablesProps) {
  const fallbackPackages = buildPackages(packages?.length ? undefined : 'nl');
  const data = packages.length ? packages : fallbackPackages;
  return (
    <section className="py-spacing-3xl bg-neutral-gray-100">
      <div className="container mx-auto px-spacing-md">
        <div className="mb-spacing-2xl text-center">
          <h2 className="heading-2 text-neutral-dark mb-spacing-md">Onze Pakketten</h2>
          <div className="flex flex-wrap justify-center gap-x-spacing-xl gap-y-spacing-xs text-sm text-neutral-600">
            <div className="flex items-center gap-spacing-xs">
              <span className="text-lg">⭐</span>
              <span className="font-medium">4.9/5 sterren</span>
            </div>
            <div className="flex items-center gap-spacing-xs">
              <span className="text-lg">🎉</span>
              <span className="font-medium">500+ geslaagde events</span>
            </div>
            <div className="flex items-center gap-spacing-xs">
              <span className="text-lg">💯</span>
              <span className="font-medium">100% dansgarantie</span>
            </div>
            <div className="flex items-center gap-spacing-xs">
              <span className="text-lg">⏱️</span>
              <span className="font-medium">15+ jaar ervaring</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-spacing-xl items-center">
          {data.map((pkg) => (
            <PricingCard key={pkg.name} pkg={pkg} />
          ))}
        </div>
        <div className="mt-spacing-2xl flex flex-col items-center gap-spacing-md text-center">
          <p className="body-lg text-neutral-dark max-w-2xl">
            Niet zeker welk pakket bij je past? Chat direct met ons via WhatsApp voor persoonlijk
            advies!
          </p>
          <WhatsAppButton
            variant="primary"
            messageType="pricing"
            label="Vraag advies via WhatsApp"
          />
        </div>
      </div>
    </section>
  );
}

export default PricingTables;
