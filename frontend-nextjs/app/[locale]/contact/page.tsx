import type { Metadata } from 'next';
import Link from 'next/link';
import AvailabilityForm from '@/components/booking/AvailabilityForm';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ guests?: string | string[] }>;
};

const defaultGuests = 100;

function parseInitialGuests(value: unknown): number {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) {
    return defaultGuests;
  }

  const guests = Number(value);
  return Number.isSafeInteger(guests) && guests >= 20 && guests <= 300 ? guests : defaultGuests;
}

const contactCopy = {
  nl: {
    title: 'Contact opnemen',
    description: 'Bespreek je datum, locatie en wensen met Mister DJ.',
    eyebrow: 'Contact',
    heading: 'Vertel ons over je event',
    introduction:
      'Vul je gegevens en eventdetails in. We nemen binnen 24 uur contact met je op om de mogelijkheden te bespreken.',
    directContact: 'Direct contact',
    phone: 'Bel 040-8422594',
    email: 'Mail info@mr-dj.nl',
    back: 'Terug naar home',
  },
  en: {
    title: 'Contact Mister DJ',
    description: 'Discuss your date, venue and wishes with Mister DJ.',
    eyebrow: 'Contact',
    heading: 'Tell us about your event',
    introduction:
      'Share your details and event plans. We will be in touch within 24 hours to discuss the options.',
    directContact: 'Direct contact',
    phone: 'Call +31 40 842 2594',
    email: 'Email info@mr-dj.nl',
    back: 'Back to home',
  },
} as const;

export async function generateMetadata({ params }: Pick<ContactPageProps, 'params'>): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === 'en' ? 'en' : 'nl';
  const copy = contactCopy[resolvedLocale];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/${resolvedLocale}/contact`,
      languages: {
        nl: '/nl/contact',
        en: '/en/contact',
      },
    },
  };
}

export default async function ContactPage({ params, searchParams: rawSearchParams }: ContactPageProps) {
  const [{ locale }, searchParams] = await Promise.all([params, rawSearchParams]);
  const resolvedLocale = locale === 'en' ? 'en' : 'nl';
  const copy = contactCopy[resolvedLocale];
  const initialGuests = parseInitialGuests(searchParams.guests);

  return (
    <main className="min-h-screen bg-neutral-dark px-6 py-12 text-neutral-light sm:py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link
          href={`/${resolvedLocale}`}
          className="inline-flex rounded-md text-sm font-semibold text-secondary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          {copy.back}
        </Link>

        <section aria-labelledby="contact-heading" className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-secondary">{copy.eyebrow}</p>
          <h1 id="contact-heading" className="text-4xl font-bold sm:text-5xl">
            {copy.heading}
          </h1>
          <p className="max-w-2xl text-neutral-gray-200">{copy.introduction}</p>
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <section className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur">
            <AvailabilityForm locale={resolvedLocale} initialGuests={initialGuests} />
          </section>
          <aside className="rounded-2xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold">{copy.directContact}</h2>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href="tel:+31408422594"
                className="block text-secondary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                {copy.phone}
              </a>
              <a
                href="mailto:info@mr-dj.nl"
                className="block text-secondary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                {copy.email}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
