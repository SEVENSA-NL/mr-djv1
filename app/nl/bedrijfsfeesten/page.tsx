import type { Metadata } from "next";
import BedrijfsfeestenContent from "./BedrijfsfeestenContent";

export const metadata: Metadata = {
  title: "Bedrijfsfeest DJ - Mister DJ | Professionele DJ voor zakelijke events",
  description:
    "Mister DJ verzorgt bedrijfsfeesten, jubilea en personeelsborrels met een professionele show die past bij jullie organisatie.",
  alternates: { canonical: "https://mr-dj.nl/nl/bedrijfsfeesten" },
  openGraph: {
    title: "Bedrijfsfeest DJ - Mister DJ | Professionele DJ voor zakelijke events",
    description:
      "Mister DJ verzorgt bedrijfsfeesten, jubilea en personeelsborrels met een professionele show.",
    url: "https://mr-dj.nl/nl/bedrijfsfeesten",
    type: "website",
    images: ["/images/og-default.jpg"],
  },
};

export default function BedrijfsfeestenPage() {
  return <BedrijfsfeestenContent />;
}
