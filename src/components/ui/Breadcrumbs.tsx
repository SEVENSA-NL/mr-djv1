"use client";

import React from "react";
import { usePathname } from "next/navigation";

const pathLabels: Record<string, string> = {
  nl: "Home",
  bruiloften: "Bruiloften",
  bedrijfsfeesten: "Bedrijfsfeesten",
  "feesten-overig": "Overige feesten",
  verjaardag: "Verjaardag",
  eindexamenfeest: "Eindexamenfeest",
  jubileum: "Jubileum",
  kerstfeest: "Kerstfeest",
  carnaval: "Carnaval",
  impressies: "Impressies",
  "mister-dj": "Mister DJ",
  "veelgestelde-vragen": "Veelgestelde vragen",
  contact: "Contact",
  blog: "Blog",
  trouwbeurzen: "Trouwbeurzen",
  vacatures: "Vacatures",
  verhuur: "Verhuur",
  "dj-eindhoven": "DJ Eindhoven",
  "dj-tilburg": "DJ Tilburg",
  "dj-den-bosch": "DJ Den Bosch",
  "dj-breda": "DJ Breda",
  "dj-helmond": "DJ Helmond",
  "dj-weert": "DJ Weert",
  "dj-veldhoven": "DJ Veldhoven",
  "dj-service": "DJ Services",
  locaties: "Locaties",
};

export const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Don't show on homepage
  if (segments.length <= 1) return null;

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = pathLabels[segment] || segment;
    const isLast = index === segments.length - 1;
    return { href, label, isLast };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `https://mr-dj.nl${crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-4 md:px-6">
        <ol className="flex flex-wrap items-center gap-1 text-xs">
          {crumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-1">
              {index > 0 && (
                <span className="text-gray-300" aria-hidden="true">
                  &#8250;
                </span>
              )}
              {crumb.isLast ? (
                <span className="text-gray-700" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <a
                  href={crumb.href}
                  className="text-gray-400 transition-colors hover:text-yellow-600"
                >
                  {crumb.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};
