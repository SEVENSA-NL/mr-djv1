import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ViewTracker from '@/components/analytics/ViewTracker';
import { trackEvent } from '@/lib/analytics/trackEvent';
import { trackMediaEngagement } from '@/lib/analytics/media';

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

type Props = {
  items: Testimonial[];
};

export default function TestimonialCarousel({ items }: Props) {
  const t = useTranslations('testimonials');
  if (!items?.length) return null;

  return (
    <ViewTracker event="testimonial_carousel_view" payload={{ location: 'pricing' }}>
      <section className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-secondary">{t('eyebrow')}</p>
          <h3 className="text-2xl font-semibold text-neutral-light sm:text-3xl">{t('title')}</h3>
            <p className="text-sm text-neutral-gray-200">{t('subtitle')}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.slice(0, 3).map((item, idx) => (
          <motion.article
            key={item.quote}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.25 + idx * 0.05, ease: 'easeOut' }}
            className="flex h-full flex-col justify-between rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur"
            onViewportEnter={() => {
              trackEvent('testimonial_impression', { quote: item.quote });
              trackMediaEngagement('carousel', 'testimonial-carousel', 'view');
            }}
          >
            <p className="text-sm text-neutral-gray-100">“{item.quote}”</p>
            <div className="mt-4 text-xs font-semibold text-neutral-light">
              {item.author}
              {item.role ? <span className="text-neutral-gray-300"> — {item.role}</span> : null}
            </div>
          </motion.article>
        ))}
      </div>
      </section>
    </ViewTracker>
  );
}
