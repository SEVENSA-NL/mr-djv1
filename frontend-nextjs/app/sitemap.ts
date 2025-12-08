import { MetadataRoute } from 'next';
import { getAllCitySlugs } from '../lib/cities';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mr-dj.sevensa.nl';
  const locales = ['nl', 'en'];
  const citySlugs = getAllCitySlugs();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/nl`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // City overview pages
  const cityOverviewPages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/steden`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const citySlug of citySlugs) {
      cityPages.push({
        url: `${baseUrl}/${locale}/${citySlug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return [...staticPages, ...cityOverviewPages, ...cityPages];
}
