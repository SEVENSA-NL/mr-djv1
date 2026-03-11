import { Metadata } from "next";
import VacaturesContent from "./VacaturesContent";

export const metadata: Metadata = {
  title: "Vacatures | Mister DJ — Werk bij ons team",
  description:
    "Wil jij als DJ of eventspecialist werken bij Mister DJ? Bekijk onze vacatures en stuur een open sollicitatie.",
  alternates: { canonical: "https://mr-dj.nl/nl/vacatures" },
};

export default function Page() {
  return <VacaturesContent />;
}
