import type { Metadata } from "next";
import VeelgesteldeVragenContent from "./VeelgesteldeVragenContent";

export const metadata: Metadata = {
  title: "Veelgestelde vragen - Mister DJ | FAQ",
  description:
    "Antwoorden op de meest gestelde vragen over Mister DJ, shows, muziek en boekingen.",
  alternates: { canonical: "https://mr-dj.nl/nl/veelgestelde-vragen" },
  openGraph: {
    title: "Veelgestelde vragen - Mister DJ | FAQ",
    description:
      "Antwoorden op de meest gestelde vragen over Mister DJ, shows, muziek en boekingen.",
    url: "https://mr-dj.nl/nl/veelgestelde-vragen",
    type: "website",
    images: ["/images/og-default.jpg"],
  },
};

export default function VeelgesteldeVragenPage() {
  return <VeelgesteldeVragenContent />;
}
