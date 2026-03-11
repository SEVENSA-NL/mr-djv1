import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Mister DJ \u2013 D\u00e9 feestspecialist van het Zuiden | 100% Dansgarantie",
  description:
    "Van zinderende bruiloften tot uitbundige bedrijfsfeesten - Mister DJ verzorgt al jaren feesten in Brabant en ver daarbuiten. Met professionele show en persoonlijk contact.",
  alternates: { canonical: "https://mr-dj.nl/nl" },
  openGraph: {
    title: "Mister DJ \u2013 D\u00e9 feestspecialist van het Zuiden | 100% Dansgarantie",
    description:
      "Professionele DJ voor bruiloften, bedrijfsfeesten en events in Brabant en omstreken.",
    url: "https://mr-dj.nl/nl",
    type: "website",
    images: ["/images/og-default.jpg"],
  },
};

export default function HomeNlPage() {
  return <HomeContent />;
}
