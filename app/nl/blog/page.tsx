import { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog | Mister DJ — Tips, inspiratie en advies",
  description: "Tips, inspiratie en advies van Mister DJ. Lees onze artikelen over bruiloftsmuziek, bedrijfsfeesten, prijzen en meer.",
  alternates: { canonical: "https://mr-dj.nl/nl/blog" },
};

export default function Page() {
  return <BlogContent />;
}
