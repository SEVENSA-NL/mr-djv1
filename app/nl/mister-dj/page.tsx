import type { Metadata } from "next";
import MisterDjContent from "./MisterDjContent";

export const metadata: Metadata = {
  title: "Over Mister DJ | D\u00e9 feestspecialist van het Zuiden",
  description:
    "Leer meer over Mister DJ: met meer dan 15 jaar ervaring en 2500+ feesten op de teller.",
  alternates: { canonical: "https://mr-dj.nl/nl/mister-dj" },
  openGraph: {
    title: "Over Mister DJ | D\u00e9 feestspecialist van het Zuiden",
    description:
      "Leer meer over Mister DJ: met meer dan 15 jaar ervaring en 2500+ feesten op de teller.",
    url: "https://mr-dj.nl/nl/mister-dj",
    type: "website",
    images: ["/images/og-default.jpg"],
  },
};

export default function MisterDjPage() {
  return <MisterDjContent />;
}
