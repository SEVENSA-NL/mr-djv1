import type { Metadata } from "next";
import ImpressiesContent from "./ImpressiesContent";

export const metadata: Metadata = {
  title: "Impressies - Mister DJ | Sfeerbeelden van feesten en events",
  description:
    "Bekijk sfeerbeelden van bruiloften, bedrijfsfeesten en events verzorgd door Mister DJ.",
  alternates: { canonical: "https://mr-dj.nl/nl/impressies" },
  openGraph: {
    title: "Impressies - Mister DJ | Sfeerbeelden van feesten en events",
    description:
      "Bekijk sfeerbeelden van bruiloften, bedrijfsfeesten en events verzorgd door Mister DJ.",
    url: "https://mr-dj.nl/nl/impressies",
    type: "website",
    images: ["/images/og-default.jpg"],
  },
};

export default function ImpressiesPage() {
  return <ImpressiesContent />;
}
