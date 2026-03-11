import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact - Mister DJ | Plan een vrijblijvend gesprek",
  description:
    "Neem contact op met Mister DJ of check direct de beschikbaarheid voor jullie feest.",
  alternates: { canonical: "https://mr-dj.nl/nl/contact" },
  openGraph: {
    title: "Contact - Mister DJ | Plan een vrijblijvend gesprek",
    description:
      "Neem contact op met Mister DJ of check direct de beschikbaarheid voor jullie feest.",
    url: "https://mr-dj.nl/nl/contact",
    type: "website",
    images: ["/images/og-default.jpg"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
