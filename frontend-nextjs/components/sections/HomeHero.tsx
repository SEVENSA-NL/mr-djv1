'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Button from '@/components/shared/Button';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import ViewTracker from '@/components/analytics/ViewTracker';
import { trackEvent } from '@/lib/analytics/trackEvent';

type HeroStat = {
  label: string;
  value: string;
};

type HeroTestimonial = {
  quote: string;
  author: string;
};

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function HomeHero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const rawStats = t.raw('stats') as unknown;
  const stats: HeroStat[] = Array.isArray(rawStats) ? (rawStats as HeroStat[]) : [];

  const rawTestimonial = t.raw('testimonial') as unknown;
  const testimonial = (rawTestimonial || {}) as Partial<HeroTestimonial>;

  const primaryCta = locale === 'nl' ? 'Plan je intake' : 'Book your intake';
  const secondaryCta = locale === 'nl' ? 'Bekijk pakketten' : 'View packages';
  const testimonialLabel =
    locale === 'nl' ? 'Wat bruidsparen zeggen' : 'What wedding couples say';

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-dark via-[#0f172a] to-black text-neutral-light">
      <div className="absolute inset-0">
        <motion.div
          className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
          animate={{ y: [-6, 6, -6], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-10 top-20 h-80 w-80 rounded-full bg-secondary/20 blur-[110px]"
          animate={{ y: [8, -4, 8], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="mb-10 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-gray-300">Mister DJ</span>
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-gray-500">
            {t('badge')}
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <motion.p
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-secondary shadow-subtle ring-1 ring-white/10 backdrop-blur"
            >
              {t('badge')}
            </motion.p>

            <motion.h1
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="text-balance text-4xl font-extrabold leading-tight text-neutral-light sm:text-5xl lg:text-6xl"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="text-balance text-lg text-neutral-gray-100 sm:text-xl"
            >
              {t('subtitle')}
            </motion.p>

            <motion.p
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="max-w-xl text-sm text-neutral-gray-300"
            >
              {t('supportingCopy')}
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
              <Link href={`/${locale}/diensten/bruiloft-dj`} prefetch={false}>
                <Button
                  size="lg"
                  className="min-w-[180px]"
                  onClick={() => trackEvent('cta_click', { location: 'hero', target: 'bruiloft-dj', page: 'home' })}
                >
                  {primaryCta}
                </Button>
              </Link>

              <Link href={`/${locale}/pakketten`} prefetch={false}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="min-w-[190px]"
                  onClick={() => trackEvent('cta_click', { location: 'hero', target: 'pakketten', page: 'home' })}
                >
                  {secondaryCta}
                </Button>
              </Link>

              <div className="w-full md:w-auto">
                <WhatsAppButton
                  variant="secondary"
                  messageType="general"
                  className="w-full justify-center md:w-auto"
                  label={locale === 'nl' ? 'Chat via WhatsApp' : 'Chat via WhatsApp'}
                />
              </div>
            </motion.div>

            {stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, ease: 'easeOut', staggerChildren: 0.1 }}
                className="mt-8 grid gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur sm:grid-cols-3"
              >
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="rounded-lg bg-neutral-light/5 p-4 shadow-subtle ring-1 ring-white/5"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="text-xl font-bold text-secondary">{stat.value}</div>
                    <div className="text-xs text-neutral-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {testimonial.quote && testimonial.author && (
            <ViewTracker event="testimonial_view" payload={{ page: 'home', source: 'hero' }}>
              <motion.aside
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-2xl bg-white/10 p-8 text-left shadow-strong ring-1 ring-white/10 backdrop-blur"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10" />
                <div className="relative space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
                    {testimonialLabel}
                  </p>
                  <p className="text-base italic text-neutral-gray-100">“{testimonial.quote}”</p>
                  <p className="text-xs font-semibold text-neutral-gray-200">{testimonial.author}</p>
                </div>
              </motion.aside>
            </ViewTracker>
          )}
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
