import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: "/:locale(en|nl)(.*)",
        headers: [
          {
            key: "x-locale",
            value: ":locale",
          },
        ],
      },
    ];
  },

  // Redirects for root path to default locale
  async redirects() {
    return [
      {
        source: "/",
        destination: "/nl",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
