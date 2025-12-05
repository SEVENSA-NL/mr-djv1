import type { MetadataRoute } from "next";
import regions from "@/content/regions.json";

type RegionCity = {
  slug: string;
};

type RegionData = {
  cities: RegionCity[];
};

const regionData = regions as RegionData;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mr-dj.sevensa.nl";
  const lastModified = new Date();

  // Core pages
  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${base}/diensten`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${base}/pakketten`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${base}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    },
  ];

  // Service pages (HIGH PRIORITY - newly optimized with video & images)
  const serviceEntries: MetadataRoute.Sitemap = [
    {
      url: `${base}/diensten/bruiloft-dj`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/diensten/bedrijfsfeest-dj`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/diensten/feest-dj`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];

  // Regional SEO pages (100 cities)
  const regionEntries: MetadataRoute.Sitemap = regionData.cities.map((city) => ({
    url: `${base}/regio/${city.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...baseEntries, ...serviceEntries, ...regionEntries];
}
