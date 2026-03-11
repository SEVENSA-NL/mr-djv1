import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/src/components/analytics/Analytics";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", weight: ["400", "700"], style: ["italic"], variable: "--font-script" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mr-dj.nl"),
  title: "Mister DJ - 100% Dansgarantie",
  description: "Van zinderende bruiloften tot uitbundige bedrijfsfeesten - Mister DJ verzorgt al jaren feesten in Brabant en ver daarbuiten.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Mister DJ - 100% Dansgarantie",
    description: "Van zinderende bruiloften tot uitbundige bedrijfsfeesten - Mister DJ verzorgt al jaren feesten in Brabant en ver daarbuiten.",
    images: ["/images/og-default.jpg"],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mister DJ - 100% Dansgarantie",
    description: "Van zinderende bruiloften tot uitbundige bedrijfsfeesten - Mister DJ verzorgt al jaren feesten in Brabant en ver daarbuiten.",
    images: ["/images/og-default.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mister DJ" />
        {/* Geo meta tags */}
        <meta name="geo.region" content="NL-NB" />
        <meta name="geo.placename" content="Veldhoven, Noord-Brabant" />
        <meta name="geo.position" content="51.4200;5.3850" />
        <meta name="ICBM" content="51.4200, 5.3850" />
        {/* hreflang */}
        <link rel="alternate" hrefLang="nl" href="https://mr-dj.nl" />
        <link rel="alternate" hrefLang="x-default" href="https://mr-dj.nl" />
        <link rel="preload" href="/images/logo.png" as="image" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://meetings.hubspot.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Mister DJ",
              "description": "Dé feestspecialist van het Zuiden. Mister DJ verzorgt bruiloften, bedrijfsfeesten en events met 100% dansgarantie. Professionele DJ-show met optioneel live saxofonist.",
              "url": "https://mr-dj.nl",
              "image": "https://mr-dj.nl/images/logo.png",
              "logo": "https://mr-dj.nl/images/logo.png",
              "telephone": "040-8422594",
              "email": "info@mr-dj.nl",
              "areaServed": "Zuid-Nederland",
              "priceRange": "€€",
              "sameAs": ["https://www.facebook.com/mrdj.nl/", "https://www.instagram.com/mr_dj.nl/"],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 51.4200,
                "longitude": 5.3850
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                "opens": "09:00",
                "closes": "17:00"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kapteijnlaan 17",
                "addressLocality": "Veldhoven",
                "postalCode": "5505 AV",
                "addressRegion": "Noord-Brabant",
                "addressCountry": "NL"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "9.8",
                "bestRating": "10",
                "worstRating": "1",
                "ratingCount": "76",
                "reviewCount": "76"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "DJ Pakketten",
                "itemListElement": [
                  { "@type": "Offer", "name": "Silver", "price": "950", "priceCurrency": "EUR", "description": "DJ-booth, geluid, sfeerverlichting" },
                  { "@type": "Offer", "name": "Gold", "price": "1250", "priceCurrency": "EUR", "description": "Alles van Silver + lichtshow + extra uur" },
                  { "@type": "Offer", "name": "Diamond", "price": "1450", "priceCurrency": "EUR", "description": "Alles van Gold + uplights, sparkulars, laser" },
                  { "@type": "Offer", "name": "Platinum", "price": "1750", "priceCurrency": "EUR", "description": "All-inclusive met photobooth of LED-dansvloer" }
                ]
              }
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${playfair.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
