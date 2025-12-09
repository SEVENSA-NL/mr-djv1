import type { Metadata } from 'next';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { ServiceCard } from '@/components/service/ServiceCard';
import { serviceCards, additionalServices } from '@/data/services';
import { createServiceStructuredData } from '@/lib/seo/structuredData';

export const metadata: Metadata = {
  title: 'Diensten - Professionele DJ & Entertainment voor elk event',
  description:
    'Mister DJ verzorgt bruiloften, bedrijfsfeesten, privé events en corporate shows. Met DJ, live saxofoon, geluid, verlichting en complete ontzorging.',
  openGraph: {
    title: 'Diensten | Mister DJ - DJ voor elk event',
    description:
      'Professionele DJ + Live Saxofoon voor bruiloften, bedrijfsfeesten en events in Brabant & Limburg. 15+ jaar ervaring, 500+ geslaagde events.',
    images: ['/assets/og-image-services.jpg'],
  },
};

interface Props {
  params: {
    locale: string;
  };
}

export default function DienstenPage({ params: { locale } }: Props) {
  const isNL = locale === 'nl';
  const structuredData = createServiceStructuredData(
    isNL ? 'DJ & Entertainment Diensten' : 'DJ & Entertainment Services',
    isNL
      ? 'Professionele DJ-diensten voor bruiloften, bedrijfsfeesten en private events met volledige ontzorging.'
      : 'Professional DJ services for weddings, corporate events and private parties with full-service support.',
    locale
  );

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        <Breadcrumbs />

        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-500">
            {isNL ? 'Wat we doen' : 'What we do'}
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {isNL ? 'DJ & Entertainment voor elk event' : 'DJ & Entertainment for every event'}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            {isNL
              ? 'Van intieme bruiloften tot grote bedrijfsfeesten – wij creëren onvergetelijke momenten met professioneel geluid, sfeervolle verlichting en optioneel live muzikanten. Volledige ontzorging van A tot Z.'
              : 'From intimate weddings to large corporate parties – we create unforgettable moments with premium sound, atmospheric lighting and optional live musicians. Full-service support from first intake to last track.'}
          </p>
        </div>

        <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
            {isNL ? 'Extra diensten' : 'Additional services'}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {additionalServices.map((service) => (
              <ServiceCard key={service.slug} service={service} variant="static" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            {isNL ? 'Wat maakt Mister DJ anders?' : 'What makes Mister DJ different?'}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="text-2xl">⭐</span>
                {isNL ? '15+ jaar ervaring' : '15+ years of experience'}
              </h3>
              <p className="text-sm text-slate-600">
                {isNL
                  ? 'Meer dan 500 geslaagde events voor particulieren en bedrijven zoals Philips, ASML en VDL. We weten precies hoe we elke dansvloer vol krijgen.'
                  : 'Over 500 successful events for private clients and brands like Philips, ASML and VDL. We know exactly how to keep every dance floor full.'}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="text-2xl">💯</span>
                {isNL ? '100% Dansgarantie' : '100% Dance floor guarantee'}
              </h3>
              <p className="text-sm text-slate-600">
                {isNL
                  ? 'We garanderen een volle dansvloer of je geld terug. In al die jaren hebben we deze belofte altijd waar kunnen maken. Dat is ons track record.'
                  : 'We guarantee a packed dance floor or your money back. In all those years we have never had to break that promise.'}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="text-2xl">📍</span>
                {isNL ? 'Lokale specialist' : 'Local specialist'}
              </h3>
              <p className="text-sm text-slate-600">
                {isNL
                  ? 'Gevestigd in Eindhoven, actief in heel Brabant & Limburg. We kennen alle venues en locaties. Geen reiskosten binnen de regio.'
                  : 'Based in Eindhoven, active across Brabant & Limburg. We know the venues, crews and sound limits – with no travel costs inside the region.'}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="text-2xl">✨</span>
                {isNL ? 'Volledige ontzorging' : 'Full-service support'}
              </h3>
              <p className="text-sm text-slate-600">
                {isNL
                  ? 'Van intake tot afbouw: wij regelen alles. Afstemming met locatie, muziekwensen, planning, opbouw – jij hoeft alleen maar te genieten.'
                  : 'From intake to breakdown: we handle everything. Venue coordination, music briefing, planning and setup – you just enjoy the night.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-0">
          <h2 className="mb-4 text-3xl font-bold">
            {isNL ? 'Klaar voor een onvergetelijk event?' : 'Ready for an unforgettable event?'}
          </h2>
          <p className="mb-8 text-lg text-amber-50">
            {isNL
              ? 'Ontvang binnen 24 uur een offerte op maat. Vrijblijvend kennismaken en sparren over je event.'
              : 'Get a tailored quote within 24 hours. No‑obligation intro call to shape the perfect night for your crowd.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`/${locale}/pakketten`}
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-sm font-semibold text-amber-600 shadow-lg transition hover:bg-amber-50"
            >
              {isNL ? 'Bekijk pakketten & prijzen' : 'View packages & pricing'}
            </a>
            <WhatsAppButton
              variant="secondary"
              messageType="general"
              label={isNL ? 'Chat via WhatsApp' : 'Chat via WhatsApp'}
            />
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-amber-600"
            >
              {isNL ? 'Vraag offerte aan' : 'Request a quote'}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            {isNL ? 'Veelgestelde vragen' : 'Frequently asked questions'}
          </h2>
          <div className="space-y-4">
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                {isNL ? 'Hoeveel kost een DJ voor mijn event?' : 'How much does a DJ cost for my event?'}
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                {isNL ? (
                  <>
                    Onze pakketten starten vanaf €495 voor 4 uur (pakket Brons), tot €1295 voor een complete
                    8-uur show met live saxofonist (pakket Goud). Bekijk de volledige prijslijst op onze{' '}
                    <a href={`/${locale}/pakketten`} className="text-amber-600 underline">
                      pakketten pagina
                    </a>
                    .
                  </>
                ) : (
                  <>
                    Packages start at €495 for 4 hours (Bronze) up to €1295 for a full 8‑hour show with live
                    sax (Gold). See all details on our{' '}
                    <a href={`/${locale}/pakketten`} className="text-amber-600 underline">
                      packages page
                    </a>
                    .
                  </>
                )}
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                {isNL ? 'Kunnen jullie ook ceremonies en speeches verzorgen?' : 'Do you also handle ceremonies and speeches?'}
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                {isNL
                  ? 'Ja, absoluut! Alle pakketten zijn inclusief professionele draadloze microfoons voor speeches, ceremonies en presentaties. We zorgen voor heldere audio zodat iedereen alles kan verstaan.'
                  : 'Absolutely. All packages include professional wireless microphones for speeches, ceremonies and presentations, with clear audio so every guest can follow along.'}
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                {isNL ? 'Hoe ver van tevoren moet ik boeken?' : 'How far in advance should we book?'}
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                {isNL
                  ? 'Voor bruiloften adviseren we 6–12 maanden van tevoren (vooral voor populaire weekenden). Voor bedrijfsfeesten en private events kan het vaak met minder doorlooptijd. Check altijd even onze beschikbaarheid.'
                  : 'For weddings we recommend booking 6–12 months ahead (especially popular weekends). Corporate and private events can often be booked on a shorter timeline – always check our availability first.'}
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                {isNL ? 'Wat voor muziekstijlen kunnen jullie draaien?' : 'What music styles can you play?'}
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                {isNL
                  ? "Onze DJ's beheersen alle genres: van 80s/90s hits tot moderne Top 40, van dance/house tot R&B, van Latin tot Nederlands. We stemmen de muziek altijd af op jouw wensen en de vibe van je gasten."
                  : 'Our DJs cover all genres: from 80s/90s hits to modern Top 40, from dance/house to R&B and Latin. We always tune the playlist to your brief and the energy on the floor.'}
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
