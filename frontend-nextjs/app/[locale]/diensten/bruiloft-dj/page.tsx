import type { Metadata } from 'next';
import Image from 'next/image';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { createServiceStructuredData } from '@/lib/seo/structuredData';

export const metadata: Metadata = {
  title: 'Bruiloft DJ - Professionele DJ voor je trouwfeest | Mister DJ',
  description:
    'Mister DJ maakt je bruiloft onvergetelijk. Van ceremonie tot late-night party met DJ + Live Saxofoon. 15+ jaar ervaring, 300+ bruidsparen geholpen. Vraag offerte.',
  keywords: ['bruiloft dj', 'trouw dj', 'wedding dj', 'bruiloft entertainment', 'live saxofoon bruiloft'],
  openGraph: {
    title: 'Bruiloft DJ | Professionele DJ voor je trouwfeest',
    description:
      'DJ + Live Saxofoon voor je bruiloft. Van eerste dans tot afterparty. 100% dansgarantie, 15+ jaar ervaring. Favoriete keuze van 300+ bruidsparen.',
    images: ['/assets/marketing-images/weddingDJ/weddingDJ-01.webp'],
  },
};

interface Props {
  params: {
    locale: string;
  };
}

export default function BruiloftDJPage({ params: { locale } }: Props) {
  const structuredData = createServiceStructuredData(
    'Bruiloft DJ',
    'Professionele bruiloft DJ voor je trouwfeest. Van ceremonie tot afterparty met DJ, live saxofoon, geluid en verlichting.',
    'bruiloft'
  );

  const images = [
    { src: '/assets/marketing-images/weddingDJ/weddingDJ-02.webp', alt: 'DJ mixing at luxurious wedding met bruidspaar dansend' },
    { src: '/assets/marketing-images/weddingDJ/weddingDJ-03.webp', alt: 'Volle dansvloer op bruiloft met professionele DJ booth' },
    { src: '/assets/marketing-images/weddingDJ/weddingDJ-05.webp', alt: 'Eerste dans op bruiloft met romantische verlichting' },
    { src: '/assets/marketing-images/weddingDJ/weddingDJ-07.webp', alt: 'Outdoor bruiloft bij zonsondergang met DJ booth' },
    { src: '/assets/marketing-images/weddingDJ/weddingDJ-08.webp', alt: 'Bruiloftsgasten vieren op dansvloer' },
    { src: '/assets/marketing-images/weddingDJ/weddingDJ-10.webp', alt: 'Elegante cocktail hour met DJ setup' },
  ];

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Hero Image Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src="/assets/marketing-images/weddingDJ/weddingDJ-01.webp"
          alt="Professionele bruiloft DJ setup met elegante verlichting"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-400">
              Bruiloft Entertainment
            </p>
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Professionele Bruiloft DJ
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">
              Maak je trouwdag onvergetelijk met de perfecte soundtrack. Van ceremonie tot late-night
              afterparty - wij zorgen voor muziek, sfeer en een volle dansvloer.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        <Breadcrumbs customLabels={{ 'bruiloft-dj': 'Bruiloft DJ' }} />

        <div className="mb-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">💒</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Ceremonie Muziek</h2>
            <p className="text-sm text-slate-600">
              Professionele audio voor je ceremonie. Van binnenkomst tot eerste dans - wij zorgen voor de
              perfecte muzikale begeleiding.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">🎷</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">DJ + Live Saxofoon</h2>
            <p className="text-sm text-slate-600">
              Het verschil tussen leuk en legendarisch. Live saxofonist speelt mee tijdens je eerste dans en
              party highlights.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 text-3xl">💯</div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">100% Dansgarantie</h2>
            <p className="text-sm text-slate-600">
              Volle dansvloer of je geld terug. In 300+ bruiloften hebben we deze belofte altijd
              waargemaakt.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Hoe verloopt een bruiloft met Mister DJ?
          </h2>
          <div className="space-y-6">
            {[
              {
                number: 1,
                title: 'Persoonlijk intakegesprek',
                description:
                  'We plannen een videocall of ontmoeting om je wensen te bespreken. Wat is jullie muziekstijl? Zijn er speciale nummers? Wat is de sfeer die je wilt creëren? We luisteren naar jullie verhaal.',
              },
              {
                number: 2,
                title: 'Planning & Afstemming met locatie',
                description:
                  'We nemen contact op met jullie trouwlocatie voor de technische planning. Opbouwtijden, stroomvoorziening, ruimte-indeling - alles wordt vooraf geregeld zodat jullie je nergens zorgen over hoeven te maken.',
              },
              {
                number: 3,
                title: 'De grote dag - Ceremonie tot afterparty',
                description:
                  'We zijn er ruim voor aanvang om alles op te bouwen. Van ceremoniemuziek tot borrel-achtergrondmuziek, van first dance tot late-night party - wij zorgen voor de perfecte soundtrack van jullie dag. Met backup apparatuur voor 100% zekerheid.',
              },
              {
                number: 4,
                title: 'Nabespreking & Feedback',
                description:
                  'Na jullie bruiloft ontvangen we graag feedback. Wat vonden jullie en de gasten van de muziek? Dit helpt ons om nóg beter te worden. Veel bruidsparen bevelen ons aan bij vrienden!',
              },
            ].map((step) => (
              <div key={step.number} className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
                  {step.number}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-0">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Onze bruiloften in beeld</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Van intieme ceremonies tot spectaculaire feesten - bekijk hoe wij jullie droombruiloft
              werkelijkheid maken
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <div key={index} className="group relative h-64 overflow-hidden rounded-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-0">
          <h2 className="mb-4 text-3xl font-bold">Klaar om je bruiloft onvergetelijk te maken?</h2>
          <p className="mb-8 text-lg text-amber-50">
            Ontvang binnen 24 uur een offerte op maat voor jullie trouwdag. Vrijblijvend kennismaken en
            sparren over jullie wensen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`/${locale}/pakketten`}
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-sm font-semibold text-amber-600 shadow-lg transition hover:bg-amber-50"
            >
              Bekijk bruiloft pakketten
            </a>
            <WhatsAppButton variant="secondary" messageType="wedding" label="Chat via WhatsApp" />
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-amber-600"
            >
              Vraag offerte aan
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Veelgestelde vragen over bruiloft DJ's
          </h2>
          <div className="space-y-4">
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Hoever van tevoren moeten we een bruiloft DJ boeken?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                We adviseren 6-12 maanden van tevoren, vooral voor populaire datums (zaterdag in het
                hoogseizoen mei-september). Maar neem gerust contact op - soms hebben we ook last-minute
                beschikbaarheid!
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Kunnen we zelf onze muziekwensen doorgeven?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Absoluut! We vinden het juist fijn als jullie muziekwensen delen. Spotify playlists, must-play
                nummers, do-not-play lijsten - het helpt ons om jullie perfecte dag te creëren. Onze DJ mixt
                jullie wensen met zijn ervaring.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Wat kost de live saxofonist erbij?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                De live saxofonist kan bij pakket Brons en Zilver worden toegevoegd voor €400 extra. Bij
                pakket Goud (Premium All-Inclusive) is deze al inbegrepen! Perfect voor jullie eerste dans en
                party highlights.
              </p>
            </details>
            <details className="rounded-lg border border-slate-200 p-5">
              <summary className="cursor-pointer font-medium text-slate-900">
                Wat als de DJ ziek wordt op onze trouwdag?
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                We hebben een netwerk van ervaren backup DJ's. In het onverhoopte geval dat je DJ ziek wordt,
                regelen we direct een vervanger met dezelfde kwaliteit. Dit is onderdeel van onze 100%
                zekerheidsgarantie - jullie trouwdag gaat altijd door!
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
