import type { Metadata } from "next";
import BruiloftenContent from "./BruiloftenContent";

export const metadata: Metadata = {
  title: "Bruiloft DJ - Mister DJ | 100% Dansgarantie op jullie bruiloft",
  description:
    "De complete bruiloftshow met persoonlijk contact, muziek op maat en optioneel live sax. Vraag nu de beschikbaarheid aan.",
  alternates: { canonical: "https://mr-dj.nl/nl/bruiloften" },
  openGraph: {
    title: "Bruiloft DJ - Mister DJ | 100% Dansgarantie op jullie bruiloft",
    description:
      "De complete bruiloftshow met persoonlijk contact, muziek op maat en optioneel live sax.",
    url: "https://mr-dj.nl/nl/bruiloften",
    type: "website",
    images: ["/images/og-default.jpg"],
  },
};

export default function BruiloftenPage() {
  return <BruiloftenContent />;
}
