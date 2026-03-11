import { Metadata } from "next";
import { notFound } from "next/navigation";
import { seoPages, getSEOPageBySlug } from "@/src/data/seo-pages";
import { ServiceCityContent } from "@/src/components/pages/ServiceCityContent";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return seoPages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getSEOPageBySlug(params.slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `https://mr-dj.nl/nl/dj-service/${page.slug}`,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://mr-dj.nl/nl/dj-service/${page.slug}`,
      siteName: "Mister DJ",
      locale: "nl_NL",
      type: "website",
    },
  };
}

export default function SEOPage({ params }: PageProps) {
  const page = getSEOPageBySlug(params.slug);
  if (!page) notFound();

  return <ServiceCityContent page={page} />;
}
