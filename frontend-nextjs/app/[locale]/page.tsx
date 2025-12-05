import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Button from '@/components/shared/Button';

type HeroStat = {
  label: string;
  value: string;
};

type HeroTestimonial = {
  quote: string;
  author: string;
};

export default function HomePage() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const rawStats = t.raw('stats') as unknown;
  const stats: HeroStat[] = Array.isArray(rawStats) ? (rawStats as HeroStat[]) : [];

  const rawTestimonial = t.raw('testimonial') as unknown;
  const testimonial = (rawTestimonial || {}) as Partial<HeroTestimonial>;

  return (
    <main className="bg-neutral-dark text-neutral-light">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-dark via-neutral-dark to-black/80" />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-20 pt-12 lg:flex-row lg:items-center lg:pb-24 lg:pt-16">
          <header className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-gray-300">Mister DJ</span>
            <LocaleSwitcher />
          </header>

          <div className="mt-6 flex-1 space-y-6">
            <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-secondary shadow-subtle ring-1 ring-white/10 backdrop-blur">
              {t('badge')}
            </p>

            <h1 className="text-balance text-4xl font-extrabold leading-tight text-neutral-light sm:text-5xl lg:text-6xl">
              {t('title')}
            </h1>

            <p className="text-balance text-lg text-neutral-gray-100 sm:text-xl">
              {t('subtitle')}
            </p>

            <p className="max-w-xl text-sm text-neutral-gray-300">{t('supportingCopy')}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href={`/${locale}/diensten/bruiloft-dj`}>
                <Button size="lg" className="min-w-[180px]">
                  {t('ctaPrimaryText')}
                </Button>
              </Link>

              <Link href={`/${locale}/pakketten`}>
                <Button variant="secondary" size="lg" className="min-w-[190px]">
                  {t('ctaSecondaryText')}
                </Button>
              </Link>

              <div className="w-full md:w-auto">
                <WhatsAppButton
                  variant="secondary"
                  messageType="general"
                  className="w-full justify-center md:w-auto"
                  label="Chat via WhatsApp"
                />
              </div>
            </div>

            {stats.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-card bg-neutral-light/5 p-4 shadow-subtle ring-1 ring-white/10"
                  >
                    <div className="text-xl font-bold text-secondary">{stat.value}</div>
                    <div className="text-xs text-neutral-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {testimonial.quote && testimonial.author && (
            <aside className="flex-1 rounded-2xl bg-white/5 p-6 text-left shadow-strong ring-1 ring-white/10 backdrop-blur">
              <p className="mb-4 text-sm font-medium uppercase tracking-wide text-secondary">
                {locale === 'nl' ? 'Wat bruidsparen zeggen' : 'What couples say'}
              </p>
              <p className="mb-4 text-base italic text-neutral-gray-100">“{testimonial.quote}”</p>
              <p className="text-xs font-semibold text-neutral-gray-300">{testimonial.author}</p>
            </aside>
          )}
        </div>
      </section>
    </main>
  );
}
