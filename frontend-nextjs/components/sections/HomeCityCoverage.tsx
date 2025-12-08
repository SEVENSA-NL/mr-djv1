import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function HomeCityCoverage() {
  const t = useTranslations('cities');
  const cities = (t.raw('list') as Array<{ name: string; highlight: string }>) || [];

  if (!cities.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-secondary">{t('eyebrow')}</p>
          <h2 className="text-3xl font-bold text-neutral-light sm:text-4xl">{t('title')}</h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-gray-200">{t('subtitle')}</p>
        </div>
        <div className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-neutral-gray-100 ring-1 ring-white/10 backdrop-blur">
          {t('badge')}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <motion.div
            key={city.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur"
          >
            <div className="text-lg font-semibold text-neutral-light">{city.name}</div>
            <div className="text-xs text-neutral-gray-200">{city.highlight}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
