import type { Metadata } from "next";
import FeestenOverigContent from "./FeestenOverigContent";

export const metadata: Metadata = {
  title: "Verjaardagen & Overige Feesten - Mister DJ | 100% Dansgarantie",
  description:
    "Mister DJ voor verjaardagen, jubilea, familiedagen en alle andere feesten. Altijd met volle dansvloer.",
  alternates: { canonical: "https://mr-dj.nl/nl/feesten-overig" },
  openGraph: {
    title: "Verjaardagen & Overige Feesten - Mister DJ | 100% Dansgarantie",
    description:
      "Mister DJ voor verjaardagen, jubilea, familiedagen en alle andere feesten. Altijd met volle dansvloer.",
    url: "https://mr-dj.nl/nl/feesten-overig",
    type: "website",
    images: ["/images/og-default.jpg"],
  },
};

export default function FeestenOverigPage() {
  return <FeestenOverigContent />;
}
