import type { Metadata } from "next";
import AlgemeneVoorwaardenContent from "./AlgemeneVoorwaardenContent";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden - Mister DJ",
  description:
    "Algemene voorwaarden van Mister DJ voor DJ-diensten bij bruiloften, bedrijfsfeesten en overige evenementen.",
  openGraph: {
    title: "Algemene Voorwaarden - Mister DJ",
    description:
      "Algemene voorwaarden van Mister DJ voor DJ-diensten bij bruiloften, bedrijfsfeesten en overige evenementen.",
    images: ["/images/og-default.jpg"],
  },
};

export default function AlgemeneVoorwaardenPage() {
  return <AlgemeneVoorwaardenContent />;
}
