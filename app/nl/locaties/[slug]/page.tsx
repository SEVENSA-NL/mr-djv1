import { Metadata } from "next";
import { notFound } from "next/navigation";
import { venues, getVenueBySlug } from "@/src/data/venues";
import { VenueContent } from "@/src/components/pages/VenueContent";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return venues.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const venue = getVenueBySlug(params.slug);
  if (!venue) return {};

  return {
    title: venue.metaTitle,
    description: venue.metaDescription,
    alternates: {
      canonical: `https://mr-dj.nl/nl/locaties/${venue.slug}`,
    },
    openGraph: {
      title: venue.metaTitle,
      description: venue.metaDescription,
      url: `https://mr-dj.nl/nl/locaties/${venue.slug}`,
      siteName: "Mister DJ",
      locale: "nl_NL",
      type: "website",
    },
  };
}

export default function VenuePage({ params }: PageProps) {
  const venue = getVenueBySlug(params.slug);
  if (!venue) notFound();

  return <VenueContent venue={venue} />;
}
