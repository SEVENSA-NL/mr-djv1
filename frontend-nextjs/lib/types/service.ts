export type EventType = 'bruiloft' | 'bedrijfsfeest' | 'feest' | 'overig';

export interface ServiceImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface ServiceFeature {
  icon?: string;
  title: string;
  description: string;
}

export interface ServiceMetadata {
  slug: string;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface ServiceCard {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface ServiceStructuredDataProviderAddress {
  '@type': 'PostalAddress';
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
}

export interface ServiceStructuredDataOffer {
  '@type': 'Offer';
  availability: string;
  priceRange: string;
  category?: string;
}

export interface ServiceStructuredDataPlace {
  '@type': 'Place';
  name: string;
}

export interface ServiceStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
    image?: string;
    address: ServiceStructuredDataProviderAddress;
  };
  areaServed: ServiceStructuredDataPlace[];
  offers: ServiceStructuredDataOffer;
  // Allow extensions for additional schema.org fields
  [key: string]: unknown;
}
