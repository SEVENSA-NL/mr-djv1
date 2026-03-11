import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacyverklaring - Mister DJ",
  description:
    "Privacyverklaring van Mister DJ. Lees hoe wij omgaan met je persoonsgegevens conform de AVG/GDPR.",
  openGraph: {
    title: "Privacyverklaring - Mister DJ",
    description:
      "Privacyverklaring van Mister DJ. Lees hoe wij omgaan met je persoonsgegevens conform de AVG/GDPR.",
    images: ["/images/og-default.jpg"],
  },
};

export default function PrivacyverklaringPage() {
  return <PrivacyContent />;
}
