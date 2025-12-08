'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

type TestimonialItem = {
  quote: string;
  author: string;
  source?: string;
  rating?: number;
};

const brandPartners = [
  'Loetje Events',
  'Van der Valk',
  'Kasteel De Haar',
  'Beachclub Bloomingdale',
  'Hilton',
  'Het Sieraad',
  'Hotel New York',
];

export function HomeSocialProof() {
  const locale = useLocale();
  const t = useTranslations('testimonials');
  const rawItems = t.raw('items') as unknown;
  const testimonials: TestimonialItem[] = Array.isArray(rawItems)
    ? (rawItems as TestimonialItem[])
    : [];

  const marqueeItems = [...brandPartners, ...brandPartners];

  return (
    <section className="bg-neutral-light py-spacing-3xl">
      <div className="container mx-auto max-w-6xl px-spacing-md">
        <div className="mb-spacing-xl space-y-spacing-md text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {locale === 'nl' ? 'Vertrouwd door event planners & venues' : 'Trusted by planners & venues'}
          </p>
          <h2 className="heading-2 text-neutral-dark">{t('title')}</h2>
          <p className="body-lg text-neutral-600">
            {locale === 'nl'
              ? `4.9/5 gemiddeld • ${brandPartners.length}+ vaste partners • 500+ succesvolle events`
              : `4.9/5 average • ${brandPartners.length}+ recurring partners • 500+ successful events`}
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-gray-100 bg-white shadow-subtle">
          <motion.div
            className="flex gap-10 px-6 py-4 text-neutral-500"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          >
            {marqueeItems.map((brand, index) => (
              <span key={`${brand}-${index}`} className="whitespace-nowrap text-sm font-semibold">
                {brand}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="mt-spacing-2xl grid gap-spacing-lg md:grid-cols-3">
          {testimonials.map((item) => (
            <motion.article
              key={`${item.author}-${item.source}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative flex flex-col rounded-2xl bg-neutral-gray-100 p-spacing-lg shadow-subtle ring-1 ring-neutral-gray-200"
            >
              <div className="mb-3 flex items-center gap-1 text-amber-500">
                {Array.from({ length: item.rating ?? 5 }).map((_, starIndex) => (
                  <span key={starIndex}>★</span>
                ))}
              </div>
              <p className="body-md text-neutral-800 italic">“{item.quote}”</p>
              <div className="mt-auto pt-spacing-md text-sm font-semibold text-neutral-700">
                {item.author}
              </div>
              {item.source ? (
                <div className="text-xs text-neutral-500">{item.source}</div>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeSocialProof;
