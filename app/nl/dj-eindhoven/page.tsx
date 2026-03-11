import type { Metadata } from "next";
import CityContent from "@/src/components/pages/CityContent";
import { cities } from "@/src/data/cities";

const city = cities.find((c) => c.slug === "eindhoven")!;

export const metadata: Metadata = {
  title: city.metaTitle,
  description: city.metaDescription,
  alternates: { canonical: `https://mr-dj.nl/nl/dj-${city.slug}` },
  openGraph: {
    title: city.metaTitle,
    description: city.metaDescription,
    url: `https://mr-dj.nl/nl/dj-${city.slug}`,
    type: "website",
    images: ["/images/og-default.jpg"],
  },
};

export default function Page() {
  return <CityContent city={city} />;
}
