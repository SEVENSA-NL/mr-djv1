import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function HomeHighlights() {
  const t = useTranslations('highlights');
  const cards = (t.raw('cards') as Array<{ title: string; description: string; tag: string }>) || [];

  if (!cards.length) return null;

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-12 lg:py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-secondary">{t('eyebrow')}</p>
          <h2 className="text-3xl font-bold text-neutral-light sm:text-4xl">{t('title')}</h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-gray-200">{t('subtitle')}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-lg"
          >
            <div className="mb-3 inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary ring-1 ring-primary/30">
              {card.tag}
            </div>
            <h3 className="text-xl font-semibold text-neutral-light">{card.title}</h3>
            <p className="mt-2 text-sm text-neutral-gray-200">{card.description}</p>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
