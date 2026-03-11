import { MetadataRoute } from 'next';
import { blogPosts } from '@/src/data/blog-posts';
import { seoPages } from '@/src/data/seo-pages';
import { venues } from '@/src/data/venues';
import { cities } from '@/src/data/cities';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mr-dj.nl';
  const today = new Date('2026-03-11');

  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/nl/dj-${city.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/nl/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // Programmatic SEO: event + city combos (21 pages)
  const servicePages = seoPages.map((page) => ({
    url: `${baseUrl}/nl/dj-service/${page.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Venue pages (30+ pages)
  const venuePages = venues.map((venue) => ({
    url: `${baseUrl}/nl/locaties/${venue.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    { url: baseUrl, lastModified: today, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/nl`, lastModified: today, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/nl/bruiloften`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/nl/bedrijfsfeesten`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/nl/feesten-overig`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/nl/verjaardag`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/nl/eindexamenfeest`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/nl/jubileum`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/nl/kerstfeest`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/nl/carnaval`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/nl/mister-dj`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/nl/impressies`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/nl/contact`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/nl/veelgestelde-vragen`, lastModified: today, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/nl/privacyverklaring`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/nl/algemene-voorwaarden`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/nl/blog`, lastModified: today, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/nl/trouwbeurzen`, lastModified: today, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/nl/vacatures`, lastModified: today, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/nl/verhuur`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    ...cityPages,
    ...blogPages,
    ...servicePages,
    ...venuePages,
  ];
}
