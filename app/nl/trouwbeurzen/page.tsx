import { Metadata } from "next";
import TrouwbeurzenContent from "./TrouwbeurzenContent";

export const metadata: Metadata = {
  title: "Trouwbeurzen | Mister DJ — Ontmoet ons op een bruiloftsbeurs",
  description:
    "Bezoek Mister DJ op een trouwbeurs in Brabant. Persoonlijk kennismaken, live demo bekijken en exclusieve beurs-korting ontvangen.",
  alternates: { canonical: "https://mr-dj.nl/nl/trouwbeurzen" },
};

export default function Page() {
  return <TrouwbeurzenContent />;
}
