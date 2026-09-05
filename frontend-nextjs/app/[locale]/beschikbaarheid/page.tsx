import type { Metadata } from 'next';
import ScrollDepthTracker from '@/components/analytics/ScrollDepthTracker';
import AvailabilityForm from '@/components/booking/AvailabilityForm';

type AvailabilityPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AvailabilityPageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === 'en' ? 'en' : 'nl';
  const isNL = resolvedLocale === 'nl';

  return {
    title: isNL ? 'Beschikbaarheid aanvragen | Mister DJ' : 'Request availability | Mister DJ',
    description: isNL
      ? 'Deel je datum en eventtype met Mister DJ. We nemen binnen 24 uur contact met je op.'
      : 'Share your date and event type with Mister DJ. We will be in touch within 24 hours.',
    alternates: {
      canonical: `/${resolvedLocale}/beschikbaarheid`,
      languages: {
        nl: '/nl/beschikbaarheid',
        en: '/en/beschikbaarheid',
      },
    },
  };
}

export default async function AvailabilityPage({ params }: AvailabilityPageProps) {
  const { locale } = await params;
  const resolvedLocale = locale === 'en' ? 'en' : 'nl';
  const isNL = resolvedLocale === 'nl';

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
              ? 'Vul je datum en eventtype in. We nemen binnen 24 uur contact met je op om de mogelijkheden te bespreken.'
              : 'Share your date and event type. We will be in touch within 24 hours to discuss the options.'}
          </p>
          <div className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur">
            <AvailabilityForm locale={resolvedLocale} />
          </div>
        </div>
      </section>
    </main>
  );
}
