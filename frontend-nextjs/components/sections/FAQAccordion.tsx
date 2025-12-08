import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { trackEvent } from '@/lib/analytics/trackEvent';

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQAccordion() {
  const t = useTranslations('faq');
  const items = (t.raw('items') as FAQItem[]) || [];
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null);

  if (!items.length) return null;

  return (
    <section className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-2">
        <p className="eyebrow text-secondary">{t('eyebrow')}</p>
        <h3 className="text-2xl font-semibold text-neutral-light sm:text-3xl">{t('title')}</h3>
        <p className="body-secondary text-neutral-gray-200">{t('subtitle')}</p>
      </div>
      <div className="mt-6 divide-y divide-white/10">
        {items.map((item) => {
          const isOpen = open === item.question;
          return (
            <button
              key={item.question}
              onClick={() => {
                const nextState = isOpen ? null : item.question;
                setOpen(nextState);
                trackEvent('faq_toggle', {
                  question: item.question,
                  action: nextState ? 'open' : 'close',
                });
              }}
              className="w-full py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 sm:py-6"
              aria-expanded={isOpen}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-semibold text-neutral-light">{item.question}</span>
                <span className="text-secondary">{isOpen ? '−' : '+'}</span>
              </div>
              {isOpen && (
                <p className="mt-3 text-sm text-neutral-gray-200 body-secondary" role="region">
                  {item.answer}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
