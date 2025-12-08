'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { PACKAGES } from '@/lib/data/pricing';
import { PricingCard } from '@/components/pricing/PricingCard';
import Button from '@/components/shared/Button';

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export function HomePricingPreview() {
  const locale = useLocale();
  const t = useTranslations('pricing');

  const formatter = new Intl.NumberFormat(locale === 'nl' ? 'nl-NL' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });

  const sharedFeatures = [
    t('features.allIn.title'),
    t('features.liveSax.title'),
    t('features.guarantee.title'),
  ];

  const previewPackages = PACKAGES.map((pkg) => {
    const translationKey = `packages.${pkg.id}` as const;
    const name = t(`${translationKey}.name`);
    const subtitle = t(`${translationKey}.subtitle`);
    return {
      name,
      subtitle,
      price: formatter.format(pkg.basePrice),
      features: sharedFeatures,
      isFeatured: pkg.isFeatured,
      buttonText: locale === 'nl' ? 'Plan intake' : 'Book intake',
    };
  });

  return (
    <section className="bg-neutral-gray-100 py-spacing-3xl">
      <div className="container mx-auto max-w-6xl px-spacing-md">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-spacing-2xl text-center"
        >
          <p className="mb-spacing-sm inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-subtle ring-1 ring-primary/10">
            {locale === 'nl' ? 'Pakketten' : 'Packages'}
          </p>
          <h2 className="heading-2 text-neutral-dark mb-spacing-xs">
            {locale === 'nl'
              ? 'Transparante pakketten voor elk event'
              : 'Transparent packages for every event'}
          </h2>
          <p className="body-lg text-neutral-600">
            {locale === 'nl'
              ? 'Kies het pakket dat past bij je feest. Altijd inclusief geluid, licht en persoonlijk draaiboek.'
              : 'Pick the package that fits your party. Always includes sound, lighting, and a personal runbook.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-spacing-xl md:grid-cols-3">
          {previewPackages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <PricingCard pkg={pkg} />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-spacing-2xl flex flex-col items-center gap-spacing-md text-center"
        >
          <p className="body-lg text-neutral-700">
            {locale === 'nl'
              ? 'Wil je exact weten wat jouw feest kost? Bekijk alle pakketten en extra’s.'
              : 'Want an exact estimate? Explore all packages and add-ons.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href={`/${locale}/pakketten`}>
              <Button size="lg">{locale === 'nl' ? 'Bekijk pakketten' : 'See packages'}</Button>
            </Link>
            <Link href={`/${locale}/diensten`}>
              <Button variant="secondary" size="lg">
                {locale === 'nl' ? 'Zie alle diensten' : 'See all services'}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HomePricingPreview;
