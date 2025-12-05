import type { Metadata } from 'next';
import Image from 'next/image';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { createServiceStructuredData } from '@/lib/seo/structuredData';

export const metadata: Metadata = {
  title: 'Feest DJ - Professionele DJ voor elk feest | Mister DJ',
  description: 'Mister DJ verzorgt verjaardagen, jubilea, themafeesten en private parties. Met DJ, verlichting en 100% dansgarantie. Van 30 tot 300 gasten.',
  openGraph: {
    title: 'Feest DJ | Professionele DJ voor verjaardagen & private parties',
    description: 'DJ voor elk feest: verjaardagen, jubilea, themafeesten. Met DJ + Live Saxofoon optie. 100% volle dansvloer gegarandeerd.',
    images: ['/assets/marketing-images/partyDJ/partyDJ-01.webp'],
  },
};

export default function FeestDJPage() {
  const structuredData = createServiceStructuredData('Feest DJ', 'Professionele DJ voor verjaardagen, jubilea, themafeesten en alle soorten private parties.', 'feest');

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image src="/assets/marketing-images/partyDJ/partyDJ-01.webp" alt="Energieke DJ op feest met dansende menigte" fill className="object-cover" priority sizes="100vw" quality={90} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-400">Private Party Entertainment</p>
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">Professionele Feest DJ</h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">Maak je verjaardag, jubileum of themafeest onvergetelijk met de perfecte party vibe. Wij zorgen voor muziek, sfeer en een volle dansvloer.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        <Breadcrumbs customLabels={{ 'feest-dj': 'Feest DJ' }} />
        <div className="mb-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6"><div className="mb-3 text-3xl">🎉</div><h2 className="mb-2 text-lg font-semibold text-slate-900">Voor elk feest</h2><p className="text-sm text-slate-600">Verjaardagen, jubilea, afscheidsfeesten, themafeesten - wij creëren de perfecte party sfeer.</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6"><div className="mb-3 text-3xl">🎶</div><h2 className="mb-2 text-lg font-semibold text-slate-900">Jouw muziekstijl</h2><p className="text-sm text-slate-600">Van 80s/90s tot Top 40, van house tot R&B - we draaien wat jij en je gasten willen horen.</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6"><div className="mb-3 text-3xl">💯</div><h2 className="mb-2 text-lg font-semibold text-slate-900">100% Dansgarantie</h2><p className="text-sm text-slate-600">Volle dansvloer of je geld terug. In 500+ events hebben we deze belofte altijd waargemaakt.</p></div>
        </div>
      </section>
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">Voor welke feesten?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-6"><div className="mb-3 text-3xl">🎂</div><h3 className="mb-2 text-lg font-semibold text-slate-900">Verjaardagen</h3><p className="text-sm text-slate-600">18, 30, 40, 50, 60+ - elk decennium verdient een onvergetelijk feest met de juiste muziek.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6"><div className="mb-3 text-3xl">🏆</div><h3 className="mb-2 text-lg font-semibold text-slate-900">Jubilea</h3><p className="text-sm text-slate-600">12,5 jaar getrouwd, 25 jaar in dienst - vier je mijlpaal met stijl en de beste muziek.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6"><div className="mb-3 text-3xl">🎭</div><h3 className="mb-2 text-lg font-semibold text-slate-900">Themafeesten</h3><p className="text-sm text-slate-600">80s/90s party, Summer festival, Ibiza night - wij passen muziek én verlichting aan op je thema.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6"><div className="mb-3 text-3xl">👋</div><h3 className="mb-2 text-lg font-semibold text-slate-900">Afscheidsfeesten</h3><p className="text-sm text-slate-600">Met pensioen, emigreren, nieuwe baan - vier je afscheid met een knallend feest.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6"><div className="mb-3 text-3xl">🌴</div><h3 className="mb-2 text-lg font-semibold text-slate-900">Tuinfeesten & BBQ's</h3><p className="text-sm text-slate-600">Summer vibes in je eigen tuin. Van loungy middag tot uptempo avond.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6"><div className="mb-3 text-3xl">🎊</div><h3 className="mb-2 text-lg font-semibold text-slate-900">Gewoon... een feestje!</h3><p className="text-sm text-slate-600">Je hebt niet altijd een reden nodig. Zomaar een feestje met vrienden en goede muziek!</p></div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-0">
          <h2 className="mb-4 text-3xl font-bold">Klaar voor een onvergetelijk feest?</h2>
          <p className="mb-8 text-lg text-amber-50">Ontvang binnen 24 uur een offerte op maat voor jouw feest. Vrijblijvend kennismaken en sparren over je wensen.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`/${params.locale}/pakketten`}
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-sm font-semibold text-amber-600 shadow-lg transition hover:bg-amber-50"
            >
              Bekijk feest pakketten
            </a>
            <WhatsAppButton variant="secondary" messageType="party" label="Chat via WhatsApp" />
            <a
              href={`/${params.locale}/contact`}
              className="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-amber-600"
            >
              Vraag offerte aan
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
