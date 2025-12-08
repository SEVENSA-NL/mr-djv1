import type { Metadata } from 'next';
import { useLocale } from 'next-intl';
import ScrollDepthTracker from '@/components/analytics/ScrollDepthTracker';
import AvailabilityForm from '@/components/booking/AvailabilityForm';

export const metadata: Metadata = {
  title: 'Beschikbaarheid controleren | Mister DJ',
  description: 'Check direct of Mister DJ beschikbaar is voor jouw datum. Binnen 24 uur reactie.',
};

export default function AvailabilityPage() {
  const locale = useLocale();
  const isNL = locale === 'nl';

  return (
    <main className="bg-neutral-dark text-neutral-light min-h-screen">
      <ScrollDepthTracker page="availability" />
      <section className="relative overflow-hidden px-6 py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-8 top-20 h-72 w-72 rounded-full bg-secondary/20 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-4xl space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-secondary">
            {isNL ? 'Beschikbaarheid' : 'Availability'}
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">
            {isNL
              ? 'Controleer onze beschikbaarheid'
              : 'Check if we’re available for your date'}
          </h1>
          <p className="max-w-2xl text-sm text-neutral-gray-200">
            {isNL
              ? 'Vul je datum en event type in. We reageren binnen 24 uur met bevestiging en een voorstel op maat.'
              : 'Share your date and event type. We’ll respond within 24 hours with availability and a tailored proposal.'}
          </p>
          <div className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur">
            <AvailabilityForm locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
