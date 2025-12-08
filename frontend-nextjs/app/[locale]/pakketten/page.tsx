import type { Metadata } from 'next';
import { PricingTables } from '@/components/pricing/PricingTables';
import { PriceCalculator } from '@/components/pricing/PriceCalculator';
import { PackageComparison } from '@/components/pricing/PackageComparison';
import { PACKAGES, PRICING_FEATURES, PACKAGE_INCLUDES, PRICING_FAQ } from '@/lib/data/pricing';
import {
  generateAggregateOfferStructuredData,
  generateServiceStructuredData,
  generatePricingFAQStructuredData,
  generateBreadcrumbStructuredData,
} from '@/lib/utils/structured-data';
import ScrollDepthTracker from '@/components/analytics/ScrollDepthTracker';

export const metadata: Metadata = {
  title: 'Pakketten & Prijzen - Transparante DJ Pakketten | Mister DJ',
  description:
    'Bekijk onze DJ pakketten voor bruiloften, bedrijfsfeesten en events. Van €495 (Brons) tot €1.295 (Goud). Transparante prijzen, 100% dansgarantie.',
  keywords: [
    'dj prijzen',
    'dj pakketten',
    'bruiloft dj kosten',
    'feest dj prijzen',
    'dj offerte',
    'dj boeken prijzen',
  ],
  openGraph: {
    title: 'Pakketten & Prijzen | Mister DJ',
    description:
      'Transparante DJ pakketten van €495 tot €1.295. Inclusief geluid, verlichting en optioneel live saxofoon. 100% dansgarantie.',
    type: 'website',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pakketten & Prijzen | Mister DJ',
    description: 'Transparante DJ pakketten van €495 tot €1.295. 100% dansgarantie.',
  },
};

interface Props {
  params: {
    locale: string;
  };
}

export const dynamic = 'force-dynamic';

export default function PakkettenPage({ params: { locale } }: Props) {
  const isNL = locale === 'nl';

  // Generate structured data
  const aggregateOfferData = generateAggregateOfferStructuredData(PACKAGES, locale);
  const serviceData = generateServiceStructuredData(locale);
  const faqData = generatePricingFAQStructuredData(PRICING_FAQ);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: `/${locale}` },
    { name: 'Pakketten', url: `/${locale}/pakketten` },
  ]);

  return (
    <>
      <ScrollDepthTracker page="pakketten" />
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateOfferData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-slate-600" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <a href={`/${locale}`} className="hover:text-amber-500 transition-colors">
                  Home
                </a>
              </li>
              <li>/</li>
              <li className="text-slate-900 font-semibold">Pakketten</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-500">
              {isNL ? 'Prijzen & Pakketten' : 'Pricing & Packages'}
            </p>
            <h1 className="mb-6 text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              {isNL ? 'Transparante DJ Pakketten' : 'Transparent DJ Packages'}
            </h1>
            <p className="mx-auto max-w-3xl text-lg lg:text-xl text-slate-600 leading-relaxed">
              {isNL
                ? 'Kies het pakket dat perfect past bij je event. Van intieme feesten tot grote bruiloften - wij hebben voor elke gelegenheid het juiste aanbod. Inclusief professioneel geluid, sfeerverlichting en optioneel live saxofoon.'
                : 'Pick the package that fits your event. From intimate parties to large weddings—we include pro sound, lighting and optional live saxophone.'}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {PRICING_FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border-2 border-slate-200 bg-slate-50 p-6 hover:border-amber-300 hover:shadow-md transition-all duration-300"
              >
                <div className="mb-3 text-4xl">{feature.icon}</div>
                <h2 className="mb-2 text-lg font-semibold text-slate-900">{feature.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Tables */}
        <PricingTables locale={locale} />

        {/* Package Comparison */}
        <PackageComparison />

        {/* Price Calculator */}
        <section className="bg-slate-50 py-16">
          <PriceCalculator locale={locale} />
        </section>

        {/* What's Included Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-8 lg:p-12">
            <h2 className="mb-8 text-3xl lg:text-4xl font-bold text-slate-900">
              Wat zit er in elk pakket?
            </h2>

            <div className="space-y-8">
              {PACKAGE_INCLUDES.map((section, idx) => (
                <div key={idx}>
                  <h3 className="mb-4 flex items-center gap-3 text-xl lg:text-2xl font-semibold text-slate-900">
                    <span className="text-3xl">{section.icon}</span>
                    {section.title}
                  </h3>
                  <ul className="ml-12 space-y-2 text-slate-700">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="mt-10 rounded-xl bg-white p-6 lg:p-8 shadow-lg">
              <p className="mb-2 text-lg font-semibold text-slate-900">
                💡 Weet je niet welk pakket past?
              </p>
              <p className="mb-6 text-slate-600 leading-relaxed">
                Vertel ons over je event en we adviseren je graag over het perfecte pakket voor
                jouw wensen en budget.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`/${locale}/contact`}
                  className="inline-flex items-center rounded-lg bg-amber-500 px-6 py-3 font-medium text-white transition hover:bg-amber-600 hover:shadow-lg"
                >
                  {isNL ? 'Vraag persoonlijk advies' : 'Request personal advice'}
                </a>
                <a
                  href="tel:+31408422594"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:border-amber-500 hover:shadow-md"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {isNL ? 'Bel direct' : 'Call us'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-slate-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center text-3xl lg:text-4xl font-bold text-slate-900">
              Veelgestelde vragen over onze pakketten
            </h2>
            <div className="space-y-4">
              {PRICING_FAQ.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl border-2 border-slate-200 bg-white p-6 hover:border-amber-300 transition-colors duration-300"
                >
                  <summary className="cursor-pointer font-semibold text-slate-900 flex justify-between items-center">
                    <span>{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <p className="mt-4 text-slate-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="mb-4 text-3xl lg:text-4xl font-bold text-white">
              Klaar om jouw feest onvergetelijk te maken?
            </h2>
            <p className="mb-8 text-lg text-slate-300">
              Boek nu en ontvang binnen 24 uur een persoonlijke offerte
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Vraag offerte aan
              </a>
              <a
                href="tel:+31408422594"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg bg-white text-slate-900 hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Bel ons nu
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
