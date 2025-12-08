import type { Metadata } from 'next';
import { Briefcase, Palette, ShieldCheck, Sparkles, MonitorPlay } from 'lucide-react';
import VideoTestimonials from '@/components/sections/VideoTestimonials';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { createServiceStructuredData } from '@/lib/seo/structuredData';
import ScrollDepthTracker from '@/components/analytics/ScrollDepthTracker';
import ParallaxHeroMedia from '@/components/sections/ParallaxHeroMedia';

export const metadata: Metadata = {
  title: 'Bedrijfsfeest DJ - Professionele DJ voor corporate events | Mister DJ',
  description: 'Mister DJ verzorgt bedrijfsfeesten, teamuitjes en corporate events. Met DJ, verlichting, branding visuals en volledige ontzorging. Philips, ASML, VDL vertrouwen op ons.',
  openGraph: {
    title: 'Bedrijfsfeest DJ | Professionele entertainment voor corporate events',
    description: 'DJ + Entertainment voor bedrijfsfeesten. Van teamuitje tot gala. Inclusief branding, verlichting en volledige ontzorging. 15+ jaar corporate ervaring.',
    images: ['/assets/marketing-images/corporateEvent/corporateEvent-01.webp'],
  },
};

export default function BedrijfsfeestDJPage({ params }: { params: { locale: string } }) {
  const isNL = params.locale === 'nl';
  const structuredData = createServiceStructuredData(
    isNL ? 'Bedrijfsfeest DJ' : 'Corporate Event DJ',
    isNL
      ? 'Professionele DJ voor bedrijfsfeesten, teamuitjes en corporate events met branding en complete ontzorging.'
      : 'Professional DJ for corporate events, offsites and galas with branding-ready visuals and full-service delivery.',
    params.locale
  );
  const faqItems = isNL
    ? [
        {
          question: 'Hoe snel krijg ik een bevestiging voor onze eventdatum?',
          answer: 'Binnen één werkdag. Bij hot dates sturen we direct een backup-crew mee voor zekerheid.',
        },
        {
          question: 'Kunnen jullie schakelen met ons venue en AV-partner?',
          answer:
            'Ja. Wij delen onze tech rider, stemmen load-in/load-out, en kunnen logo/brandkleuren in verlichting en visuals meenemen.',
        },
        {
          question: 'Hoe zit het met facturatie en compliance?',
          answer:
            'We leveren offerte, contract en factuur met BTW, zijn verzekerd en kunnen NDA/PO-procedures volgen.',
        },
        {
          question: 'Kunnen jullie branding meenemen in licht en visuals?',
          answer:
            'Ja, we matchen kleuren, tonen logo’s en kunnen korte intro visuals draaien bij aanvang of awards.',
        },
        {
          question: 'Werken jullie met vendor onboarding/veiligheid?',
          answer:
            'We vullen vendor forms, leveren VOG/verzekeringen en stemmen site rules af met facility/security.',
        },
        {
          question: 'Kunnen we meerdere ruimtes tegelijk bespelen?',
          answer:
            'Ja, we zetten een extra set voor borrel/foyer en een hoofdset voor het feest. Sync op cue.',
        },
        {
          question: 'Hoe borgen jullie geluidslimieten (db-meters)?',
          answer:
            'We meten live en stemmen met de locatie. Voor strikte db-limieten passen we set en opstelling aan.',
        },
      ]
    : [
        {
          question: 'How fast do we get date confirmation?',
          answer: 'Within one business day. For high-demand dates we propose a backup crew for certainty.',
        },
        {
          question: 'Can you align with our venue and AV partner?',
          answer:
            'Yes. We share the tech rider, schedule load-in/out, and can match lighting/visuals to your brand colors and logo.',
        },
        {
          question: 'How about invoicing and compliance?',
          answer:
            'Quote, contract and invoice with VAT; insured, and we can work with NDAs/POs as required by procurement.',
        },
        {
          question: 'Can you brand lighting and visuals?',
          answer: 'Yes—brand colors, logo loops, and short intro visuals for openings or awards.',
        },
        {
          question: 'Do you handle vendor onboarding and safety requirements?',
          answer:
            'We complete vendor forms, provide insurance/VOG equivalents, and align with facility/security rules.',
        },
        {
          question: 'Can you support multiple rooms at once?',
          answer: 'Yes, a secondary setup for reception/foyer and a main rig for the party, cued together.',
        },
        {
          question: 'How do you respect sound limits (db meters)?',
          answer:
            'We monitor levels live and coordinate with the venue; for strict limits we adapt rig and placement.',
        },
      ];

  return (
    <main className="bg-white">
      <ScrollDepthTracker page="bedrijfsfeest-dj" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <ParallaxHeroMedia
          src="/assets/marketing-images/corporateEvent/corporateEvent-01.webp"
          alt="Professionele DJ op bedrijfsfeest met zakelijke sfeer"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-400">
              {isNL ? 'Corporate Entertainment' : 'Corporate DJ Services'}
            </p>
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {isNL ? 'Professionele Bedrijfsfeest DJ' : 'Professional Corporate Event DJ'}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">
              {isNL
                ? 'Maak je bedrijfsfeest of teamuitje onvergetelijk met professionele entertainment. Van netwerkborrel tot gala-avond - wij zorgen voor de perfecte sfeer.'
                : 'Make your corporate event unforgettable: from networking mixers to gala nights, we deliver the right mood, sound, and branded visuals.'}
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-0">
        <Breadcrumbs customLabels={{ 'bedrijfsfeest-dj': 'Bedrijfsfeest DJ' }} />
        <div className="mb-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 card"><div className="mb-3 text-primary"><Briefcase className="h-6 w-6" /></div><h2 className="mb-2 text-lg font-semibold text-slate-900">{isNL ? 'Corporate ervaring' : 'Enterprise experience'}</h2><p className="text-sm text-slate-600">{isNL ? '15+ jaar ervaring met bedrijfsfeesten voor Philips, ASML, VDL en honderden MKB bedrijven.' : '15+ years with Philips, ASML and hundreds of mid-market clients; compliant with corporate procurement.'}</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 card"><div className="mb-3 text-primary"><Palette className="h-6 w-6" /></div><h2 className="mb-2 text-lg font-semibold text-slate-900">{isNL ? 'Branding & Visuals' : 'Branding & visuals'}</h2><p className="text-sm text-slate-600">{isNL ? 'Projectie van je bedrijfslogo, huisstijlkleuren in de verlichting en visual content op maat.' : 'Your logo, brand colors and tailored visuals across lighting and screens for full brand presence.'}</p></div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 card"><div className="mb-3 text-primary"><ShieldCheck className="h-6 w-6" /></div><h2 className="mb-2 text-lg font-semibold text-slate-900">{isNL ? 'Professionele Afhandeling' : 'Professional delivery'}</h2><p className="text-sm text-slate-600">{isNL ? 'Offerte, contract, factuur, BTW - alles zakelijk correct.' : 'Quote, contract, invoice, VAT—handled professionally with clear SLAs.'}</p></div>
        </div>
      </section>
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            {isNL ? 'Voor welke bedrijfsevents?' : 'For which corporate events?'}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-6 card"><div className="mb-3 text-primary"><Sparkles className="h-6 w-6" /></div><h3 className="mb-2 text-lg font-semibold text-slate-900">Teamuitjes & Personeelsfeesten</h3><p className="text-sm text-slate-600">Zomer BBQ, kerstborrel, jubileumfeest - wij zorgen voor de muziek en sfeer die je team samenbrengt.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 card"><div className="mb-3 text-primary"><MonitorPlay className="h-6 w-6" /></div><h3 className="mb-2 text-lg font-semibold text-slate-900">Gala&apos;s & Award Shows</h3><p className="text-sm text-slate-600">Professionele muzikale begeleiding voor galadiner, prijsuitreikingen en netwerkevenementen.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 card"><div className="mb-3 text-primary"><Palette className="h-6 w-6" /></div><h3 className="mb-2 text-lg font-semibold text-slate-900">Product Launches & Openings</h3><p className="text-sm text-slate-600">Maak je product launch of opening onvergetelijk. Muziek, verlichting en visuals volledig afgestemd op je brand identity.</p></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 card"><div className="mb-3 text-primary"><Briefcase className="h-6 w-6" /></div><h3 className="mb-2 text-lg font-semibold text-slate-900">Relatie Events & Netwerkborrels</h3><p className="text-sm text-slate-600">Sfeervolle achtergrondmuziek voor netwerkmoment, overgaand naar uptempo muziek voor het feestgedeelte.</p></div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-0">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-900">
            {isNL ? 'FAQ voor event leads & procurement' : 'FAQ for event leads & procurement'}
          </h2>
          <p className="mb-8 text-center text-base text-slate-600">
            {isNL
              ? 'Snel duidelijkheid over beschikbaarheid, technische afstemming en compliance.'
              : 'Fast clarity on availability, technical alignment, and procurement needs.'}
          </p>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {faqItems.map((item) => (
              <details key={item.question} className="p-6">
                <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <VideoTestimonials eventType="bedrijfsfeest" />
      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-0">
          <h2 className="mb-4 text-3xl font-bold">Klaar voor een geslaagd bedrijfsfeest?</h2>
          <p className="mb-8 text-lg text-amber-50">Ontvang binnen 24 uur een offerte op maat voor je corporate event. Inclusief branding, planning en technische specificaties.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`/${params.locale}/pakketten`}
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-sm font-semibold text-amber-600 shadow-lg transition hover:bg-amber-50"
            >
              {isNL ? 'Bekijk corporate pakketten' : 'See corporate packages'}
            </a>
            <WhatsAppButton
              variant="secondary"
              messageType="corporate"
              label={isNL ? 'Plan call met event lead' : 'Plan call with event lead'}
            />
            <a
              href={`/${params.locale}/contact`}
              className="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-amber-600"
            >
              {isNL ? 'Vraag zakelijke offerte' : 'Request corporate quote'}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
