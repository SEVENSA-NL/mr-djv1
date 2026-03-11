import type { Metadata } from "next";
import VerzoeknummersContent from "./VerzoeknummersContent";

export const metadata: Metadata = {
  title: "Verzoeknummers | Mister DJ",
  description: "Doe een muziekverzoek voor het feest! Laat ons weten welk nummer jullie graag willen horen.",
  robots: { index: true, follow: true },
};

export default function VerzoeknummersPage() {
  return <VerzoeknummersContent />;
}
