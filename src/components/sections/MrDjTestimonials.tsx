"use client";

import React from "react";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { useInView } from "@/src/hooks/useInView";
import { allTestimonials, type Testimonial } from "@/src/data/testimonials";

const platformLabels: Record<Testimonial["platform"], string> = {
  tpw: "via ThePerfectWedding.nl",
  google: "via Google",
  facebook: "via Facebook",
  own: "eigen review",
};

function StarRating() {
  return (
    <div className="mb-2 flex gap-0.5" role="img" aria-label="5 sterren beoordeling">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

interface MrDjTestimonialsProps {
  testimonials?: Testimonial[];
  category?: string;
  maxItems?: number;
}

export const MrDjTestimonials: React.FC<MrDjTestimonialsProps> = ({
  testimonials,
  category,
  maxItems = 6,
}) => {
  const { ref, isInView } = useInView();

  let items = testimonials ?? allTestimonials;

  if (category) {
    items = items.filter((t) => t.category === category);
  }

  items = items.slice(0, maxItems);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Mister DJ",
    url: "https://mr-dj.nl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kapteijnlaan 17",
      addressLocality: "Veldhoven",
      postalCode: "5505 AV",
      addressRegion: "Noord-Brabant",
      addressCountry: "NL",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "9.8",
      bestRating: "10",
      worstRating: "1",
      ratingCount: "76",
    },
    review: items.map((item) => ({
      "@type": "Review",
      author: { "@type": "Person", name: item.name },
      datePublished: `${item.date}-01`,
      reviewBody: item.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(item.rating),
        bestRating: "10",
      },
      ...(item.location ? { about: { "@type": "Event", name: item.eventType, location: { "@type": "Place", name: item.location } } } : {}),
    })),
  };

  if (items.length === 0) return <EmptyState message="Binnenkort meer reviews..." />;

  return (
    <section className="py-14 md:py-20 lg:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <div ref={ref} className={`mx-auto max-w-6xl px-4 md:px-6 transition-opacity ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="mb-8 max-w-lg">
          <p className="mb-1 font-script text-2xl text-yellow-600 md:text-3xl">
            Reviews
          </p>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900 md:text-3xl lg:text-4xl">
            Wat andere feestgevers over Mister DJ zeggen.
          </h2>
          <p className="text-sm text-gray-600 md:text-base">
            Jullie avond gebeurt maar een keer. Daarom is het fijn om te lezen
            hoe andere bruidsparen, families en bedrijven het hebben ervaren.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item.name + item.eventType}
              className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-4 text-gray-900 shadow-lg"
            >
              <StarRating />
              <blockquote className="mb-3 text-sm text-gray-700 md:text-base">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto text-xs text-gray-600 md:text-sm">
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-500">
                  {item.eventType}
                  {item.location ? ` \u00B7 ${item.location}` : null}
                </div>
                <div className="mt-1 text-[10px] text-gray-500">
                  {platformLabels[item.platform]}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
