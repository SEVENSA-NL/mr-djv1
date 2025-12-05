/**
 * Structured Data (JSON-LD) Utilities
 * Generates schema.org markup for SEO
 */

import { ServiceStructuredData } from '@/lib/types/service';

export function createServiceStructuredData(
  serviceName: string,
  serviceDescription: string,
  _eventType: string
): ServiceStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'Organization',
      name: 'Mister DJ',
      image: 'https://mr-dj.sevensa.nl/assets/logo.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Eindhoven',
        addressRegion: 'Noord-Brabant',
        addressCountry: 'NL',
      },
    },
    areaServed: [
      {
        '@type': 'Place',
        name: 'Noord-Brabant',
      },
      {
        '@type': 'Place',
        name: 'Limburg',
      },
    ],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceRange: '€495 - €1295',
      // eventType reserved for future extensions
    },
  };
}

export function createBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mister DJ',
    alternateName: 'Mr. DJ',
    url: 'https://mr-dj.sevensa.nl',
    logo: 'https://mr-dj.sevensa.nl/assets/logo.png',
    description: 'Professionele DJ en entertainment voor bruiloften, bedrijfsfeesten en private events in Brabant en Limburg.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Eindhoven',
      addressRegion: 'Noord-Brabant',
      addressCountry: 'NL',
    },
    telephone: '+31-6-20383638',
    areaServed: ['Noord-Brabant', 'Limburg'],
    priceRange: '€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '300',
    },
  };
}
