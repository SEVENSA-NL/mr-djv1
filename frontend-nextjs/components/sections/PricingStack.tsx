import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Link from 'next/link';
import { PACKAGES } from '@/lib/data/pricing';
import TestimonialCarousel from './TestimonialCarousel';
import FAQAccordion from './FAQAccordion';
import { formatCurrency } from '@/lib/utils/currency';
import { trackEvent } from '@/lib/analytics/trackEvent';

type PricingTier = {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  highlighted?: boolean;
  cta?: string;
};

export default function PricingStack() {
  const t = useTranslations('pricing');
  const testimonialsT = useTranslations('testimonials');
  const locale = useLocale();
  const tiers: PricingTier[] = PACKAGES.map((pkg) => ({
    id: pkg.id,
    name: pkg.name,
    price: formatCurrency(pkg.basePrice, { locale }),
    subtitle: pkg.subtitle,
    features: pkg.features.slice(0, 6),
    highlighted: pkg.isFeatured || pkg.recommended,
    cta: locale === 'nl' ? 'Boek dit pakket' : 'Book this package',
  }));
  const testimonialItems = (testimonialsT.raw('items') as { quote: string; author: string; role?: string }[]) || [];

  return (
    <section className="bg-neutral-dark px-6 py-16 text-neutral-light lg:py-20" id="pricing">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-secondary">{t('eyebrow')}</p>
            <h2 className="text-3xl font-bold sm:text-4xl">{t('title')}</h2>
            <p className="mt-2 max-w-2xl text-sm text-neutral-gray-200">{t('subtitle')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton
              variant="primary"
              messageType="pricing"
              label={locale === 'nl' ? 'WhatsApp over pakketten' : 'WhatsApp about packages'}
            />
            <Link href={`/${locale}/diensten`}>
              <Button variant="secondary" size="sm">
                {t('ctaServices')}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.25 + idx * 0.05, ease: 'easeOut' }}
              className={`relative overflow-hidden rounded-2xl p-6 ring-1 ring-white/10 backdrop-blur ${
                tier.highlighted ? 'bg-gradient-to-br from-primary/15 to-secondary/15 shadow-lg shadow-primary/20' : 'bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                  <p className="text-sm text-neutral-gray-200">{tier.subtitle}</p>
                </div>
                {tier.highlighted && (
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/40">
                    {t('bestSeller')}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{tier.price}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-gray-300">{t('perEvent')}</span>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-neutral-gray-100">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-secondary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2">
                <Button
                  size="md"
                  className="w-full justify-center"
                  onClick={() => trackEvent('pricing_cta_click', { tier: tier.id })}
                >
                  {tier.cta || (locale === 'nl' ? 'Boek dit pakket' : 'Book this package')}
                </Button>
                <WhatsAppButton
                  variant="secondary"
                  messageType="pricing"
                  label={locale === 'nl' ? 'Stel vraag via WhatsApp' : 'Ask via WhatsApp'}
                  className="w-full justify-center"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <TestimonialCarousel items={testimonialItems} />
        <FAQAccordion />
      </div>
    </section>
  );
}
