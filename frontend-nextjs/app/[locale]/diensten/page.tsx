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

export default function DienstenPage() {
  const structuredData = createServiceStructuredData(
    'DJ & Entertainment Diensten',
    'Professionele DJ diensten voor bruiloften, bedrijfsfeesten en private events met volledige ontzorging',
    'general'
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
            Wat we doen
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            DJ & Entertainment voor elk event
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Van intieme bruiloften tot grote bedrijfsfeesten - wij creëren onvergetelijke momenten met
            professioneel geluid, sfeervolle verlichting en optioneel live muzikanten. Volledige ontzorging
            van A tot Z.
          </p>
        </div>

        <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">Extra diensten</h2>
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
            Wat maakt Mister DJ anders?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="text-2xl">⭐</span>
                15+ jaar ervaring
              </h3>
              <p className="text-sm text-slate-600">
                Meer dan 500 geslaagde events voor particulieren en bedrijven zoals Philips, ASML en VDL. We
                weten precies hoe we elke dansvloer vol krijgen.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="text-2xl">💯</span>
                100% Dansgarantie
              </h3>
              <p className="text-sm text-slate-600">
                We garanderen een volle dansvloer of je geld terug. In al die jaren hebben we deze belofte
                altijd waar kunnen maken. Dat is ons track record.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="text-2xl">📍</span>
                Lokale specialist
              </h3>
              <p className="text-sm text-slate-600">
                Gevestigd in Eindhoven, actief in heel Brabant & Limburg. We kennen alle venues en locaties.
                Geen reiskosten binnen de regio.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="text-2xl">✨</span>
                Volledige ontzorging
              </h3>
              <p className="text-sm text-slate-600">
                Van intake tot afbouw: wij regelen alles. Afstemming met locatie, muziekwensen, planning,
                opbouw - jij hoeft alleen maar te genieten.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-0">
          <h2 className="mb-4 text-3xl font-bold">Klaar voor een onvergetelijk event?</h2>
          <p className="mb-8 text-lg text-amber-50">
            Ontvang binnen 24 uur een offerte op maat. Vrijblijvend kennismaken en sparren over je event.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/pakketten"
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-sm font-semibold text-amber-600 shadow-lg transition hover:bg-amber-50"
            >
              Bekijk pakketten & prijzen
            </a>
            <WhatsAppButton variant="secondary" messageType="general" label="Chat via WhatsApp" />
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-amber-600"
            >
              Vraag offerte aan
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">Veelgestelde vragen</h2>
          <div className="space-y-4">
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Hoeveel kost een DJ voor mijn event?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Onze pakketten starten vanaf €495 voor 4 uur (pakket Brons), tot €1295 voor een complete
                8-uur show met live saxofonist (pakket Goud). Bekijk de volledige prijslijst op onze{' '}
                <a href="/pakketten" className="text-amber-600 underline">
                  pakketten pagina
                </a>
                .
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Kunnen jullie ook ceremonies en speeches verzorgen?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Ja, absoluut! Alle pakketten inclusief professionele draadloze microfoons voor speeches,
                ceremonies en presentaties. We zorgen voor heldere audio zodat iedereen alles kan verstaan.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Hoe ver van tevoren moet ik boeken?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Voor bruiloften adviseren we 6-12 maanden van tevoren (vooral voor populaire datums in het
                weekend). Voor bedrijfsfeesten en private events kan het soms ook met kortere doorlooptijd.
                Check altijd even onze beschikbaarheid!
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Wat voor muziekstijlen kunnen jullie draaien?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Onze DJ's beheersen alle genres: van 80s/90s hits tot moderne Top 40, van dance/house tot
                R&B, van Latin tot Nederlands. We stemmen de muziek altijd af op jouw wensen en de vibe van je
                gasten.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
