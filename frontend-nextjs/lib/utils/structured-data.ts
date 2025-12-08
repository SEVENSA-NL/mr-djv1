import type { Package } from '@/lib/data/pricing';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export function generateOfferStructuredData(pkg: Package, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: pkg.name,
    description: pkg.description,
    price: pkg.basePrice,
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    category: 'DJService',
    url: `https://mr-dj.sevensa.nl/${locale}/pakketten`,
  };
}

export function generateAggregateOfferStructuredData(
  packages: Package[],
  locale: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    priceCurrency: 'EUR',
    lowPrice: Math.min(...packages.map((pkg) => pkg.basePrice)),
    highPrice: Math.max(...packages.map((pkg) => pkg.basePrice)),
    offerCount: packages.length,
    offers: packages.map((pkg) => generateOfferStructuredData(pkg, locale)),
  };
}

export function generateServiceStructuredData(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'DJ & Entertainment Pakketten',
    description:
      'Transparante DJ pakketten voor bruiloften, bedrijfsfeesten en private events in Brabant en Limburg.',
    provider: {
      '@type': 'Organization',
      name: 'Mister DJ',
      url: 'https://mr-dj.sevensa.nl',
      logo: 'https://mr-dj.sevensa.nl/assets/logo.png',
      areaServed: ['Noord-Brabant', 'Limburg'],
    },
    url: `https://mr-dj.sevensa.nl/${locale}/pakketten`,
  };
}

export function generatePricingFAQStructuredData(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://mr-dj.sevensa.nl${item.url}`,
    })),
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mister DJ',
    alternateName: 'Mr. DJ',
    url: 'https://mr-dj.sevensa.nl',
    logo: 'https://mr-dj.sevensa.nl/assets/logo.png',
  };
}

