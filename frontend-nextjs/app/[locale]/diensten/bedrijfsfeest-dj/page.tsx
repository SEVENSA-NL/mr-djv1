import type { Metadata } from 'next';
import Image from 'next/image';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { createServiceStructuredData } from '@/lib/seo/structuredData';

export const metadata: Metadata = {
  title: 'Bedrijfsfeest DJ - Professionele DJ voor corporate events | Mister DJ',
  description: 'Mister DJ verzorgt bedrijfsfeesten, teamuitjes en corporate events. Met DJ, verlichting, branding visuals en volledige ontzorging. Philips, ASML, VDL vertrouwen op ons.',
  openGraph: {
    title: 'Bedrijfsfeest DJ | Professionele entertainment voor corporate events',
    description: 'DJ + Entertainment voor bedrijfsfeesten. Van teamuitje tot gala. Inclusief branding, verlichting en volledige ontzorging. 15+ jaar corporate ervaring.',
    images: ['/assets/marketing-images/corporateEvent/corporateEvent-01.webp'],
  },
};

export default function BedrijfsfeestDJPage() {
  const structuredData = createServiceStructuredData('Bedrijfsfeest DJ', 'Professionele DJ voor bedrijfsfeesten, teamuitjes en corporate events met branding en complete ontzorging.', 'bedrijfsfeest');

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image src="/assets/marketing-images/corporateEvent/corporateEvent-01.webp" alt="Professionele DJ op bedrijfsfeest met zakelijke sfeer" fill className="object-cover" priority sizes="100vw" quality={90} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-400">Corporate Entertainment</p>
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">Professionele Bedrijfsfeest DJ</h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">Maak je bedrijfsfeest of teamuitje onvergetelijk met professionele entertainment. Van netwerkborrel tot gala-avond - wij zorgen voor de perfecte sfeer.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        <Breadcrumbs customLabels={{ 'bedrijfsfeest-dj': 'Bedrijfsfeest DJ' }} />
        <div className="mb-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6"><div className="mb-3 text-3xl">🏢</div><h2 className="mb-2 text-lg font-semibold text-slate-900">Corporate ervaring</h2><p className="text-sm text-slate-600">15+ jaar ervaring met bedrijfsfeesten voor Philips, ASML, VDL en honderden MKB bedrijven.</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6"><div className="mb-3 text-3xl">🎨</div><h2 className="mb-2 text-lg font-semibold text-slate-900">Branding & Visuals</h2><p className="text-sm text-slate-600">Projectie van je bedrijfslogo, huisstijlkleuren in de verlichting en visual content op maat.</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6"><div className="mb-3 text-3xl">💼</div><h2 className="mb-2 text-lg font-semibold text-slate-900">Professionele Afhandeling</h2><p className="text-sm text-slate-600">Offerte, contract, factuur, BTW - alles zakelijk correct.</p></div>
        </div>
      </section>
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">Voor welke bedrijfsevents?</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-6"><div className="mb-3 text-3xl">🎉</div><h3 className="mb-2 text-lg font-semibold text-slate-900">Teamuitjes & Personeelsfeesten</h3><p className="text-sm text-slate-600">Zomer BBQ, kerstborrel, jubileumfeest - wij zorgen voor de muziek en sfeer die je team samenbrengt.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6"><div className="mb-3 text-3xl">🏆</div><h3 className="mb-2 text-lg font-semibold text-slate-900">Gala's & Award Shows</h3><p className="text-sm text-slate-600">Professionele muzikale begeleiding voor galadiner, prijsuitreikingen en netwerkevenementen.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6"><div className="mb-3 text-3xl">🚀</div><h3 className="mb-2 text-lg font-semibold text-slate-900">Product Launches & Openings</h3><p className="text-sm text-slate-600">Maak je product launch of opening onvergetelijk. Muziek, verlichting en visuals volledig afgestemd op je brand identity.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6"><div className="mb-3 text-3xl">🤝</div><h3 className="mb-2 text-lg font-semibold text-slate-900">Relatie Events & Netwerkborrels</h3><p className="text-sm text-slate-600">Sfeervolle achtergrondmuziek voor netwerkmoment, overgaand naar uptempo muziek voor het feestgedeelte.</p></div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-0">
          <h2 className="mb-4 text-3xl font-bold">Klaar voor een geslaagd bedrijfsfeest?</h2>
          <p className="mb-8 text-lg text-amber-50">Ontvang binnen 24 uur een offerte op maat voor je corporate event. Inclusief branding, planning en technische specificaties.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/pakketten" className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-sm font-semibold text-amber-600 shadow-lg transition hover:bg-amber-50">Bekijk corporate pakketten</a>
            <WhatsAppButton variant="secondary" messageType="corporate" label="Chat via WhatsApp" />
            <a href="/contact" className="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-amber-600">Vraag zakelijke offerte</a>
          </div>
        </div>
      </section>
    </main>
  );
}
