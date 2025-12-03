"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbsProps {
  /**
   * Optional custom breadcrumb items.
   * If not provided, breadcrumbs will be auto-generated from the URL path.
   */
  items?: BreadcrumbItem[];
  /**
   * Optional custom labels for specific path segments.
   * Example: { "bruiloft-dj": "Bruiloft DJ", "bedrijfsfeest-dj": "Bedrijfsfeest DJ" }
   */
  customLabels?: Record<string, string>;
}

/**
 * Breadcrumb navigation component with SEO-friendly markup.
 *
 * Features:
 * - Auto-generates breadcrumbs from URL path
 * - Supports custom labels via customLabels prop
 * - Includes JSON-LD structured data for SEO
 * - Accessible with ARIA labels
 *
 * @example
 * ```tsx
 * // Auto-generated breadcrumbs from URL
 * <Breadcrumbs />
 *
 * // Custom labels for specific paths
 * <Breadcrumbs customLabels={{
 *   "bruiloft-dj": "Bruiloft DJ",
 *   "eindhoven": "Eindhoven"
 * }} />
 *
 * // Fully custom breadcrumbs
 * <Breadcrumbs items={[
 *   { label: "Home", href: "/" },
 *   { label: "Diensten", href: "/diensten" },
 *   { label: "Bruiloft DJ", href: "/diensten/bruiloft-dj" }
 * ]} />
 * ```
 */
export function Breadcrumbs({ items, customLabels = {} }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if items not provided
  const breadcrumbs: BreadcrumbItem[] = items || generateBreadcrumbs(pathname, customLabels);

  // Don't show breadcrumbs on homepage
  if (pathname === "/" || breadcrumbs.length <= 1) {
    return null;
  }

  // Generate JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://mr-dj.sevensa.nl${item.href}`,
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 && (
                  <svg
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                {isLast ? (
                  <span className="font-medium text-slate-900" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-amber-600 hover:underline transition"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/**
 * Generate breadcrumbs from a URL pathname
 */
function generateBreadcrumbs(
  pathname: string,
  customLabels: Record<string, string>
): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);

  // Always start with Home
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
  ];

  // Build breadcrumbs from path segments
  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = customLabels[segment] || formatSegmentLabel(segment);
    breadcrumbs.push({
      label,
      href: currentPath,
    });
  }

  return breadcrumbs;
}

/**
 * Format a URL segment into a human-readable label
 */
function formatSegmentLabel(segment: string): string {
  // Common Dutch labels
  const commonLabels: Record<string, string> = {
    "diensten": "Diensten",
    "pakketten": "Pakketten",
    "contact": "Contact",
    "regio": "Regio",
    "bruiloft-dj": "Bruiloft DJ",
    "bedrijfsfeest-dj": "Bedrijfsfeest DJ",
    "feest-dj": "Feest DJ",
    "over-ons": "Over Ons",
    "faq": "Veelgestelde Vragen",
  };

  if (commonLabels[segment]) {
    return commonLabels[segment];
  }

  // Capitalize first letter and replace hyphens with spaces
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default Breadcrumbs;
