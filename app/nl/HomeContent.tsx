"use client";

import React from "react";
import dynamic from "next/dynamic";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { MrDjHero } from "@/src/components/sections/MrDjHero";
import { MrDjServices } from "@/src/components/sections/MrDjServices";
import { MrDjStappen } from "@/src/components/sections/MrDjStappen";
import { MrDjSocialProof } from "@/src/components/sections/MrDjSocialProof";
import { MrDjContact } from "@/src/components/sections/MrDjContact";
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import { sanitizeFormData } from "@/src/utils/sanitize";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";
import { useScrollDepth } from "@/src/hooks/useScrollDepth";
import { AvailabilityChecker } from "@/src/components/ui/AvailabilityChecker";
import { TrustBadges } from "@/src/components/sections/TrustBadges";
import { DarkCTA } from "@/src/components/sections/DarkCTA";
import { VenuePartners } from "@/src/components/sections/VenuePartners";
import { StatsStrip } from "@/src/components/sections/StatsStrip";

const MrDjOfferteWizard = dynamic(
  () => import("@/src/components/sections/MrDjOfferteWizard").then((mod) => ({ default: mod.MrDjOfferteWizard })),
  { loading: () => <div className="py-20" /> }
);

const MrDjPackages = dynamic(
  () => import("@/src/components/sections/MrDjPackages").then((mod) => ({ default: mod.MrDjPackages })),
  { loading: () => <div className="py-20" /> }
);

const MrDjTestimonials = dynamic(
  () => import("@/src/components/sections/MrDjTestimonials").then((mod) => ({ default: mod.MrDjTestimonials })),
  { loading: () => <div className="py-20" /> }
);

const MrDjGallery = dynamic(
  () => import("@/src/components/sections/MrDjGallery").then((mod) => ({ default: mod.MrDjGallery })),
  { loading: () => <div className="py-20" /> }
);

export default function HomeContent() {
  useScrollDepth();

  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    const sanitized = sanitizeFormData(values as unknown as Record<string, unknown>) as unknown as AvailabilityRequest;
    if (process.env.NODE_ENV === "development") {
      console.log("[HOME] Availability request", sanitized);
    }
  };

  return (
    <MrDjLayout>
      {/* 1. Hero */}
      <MrDjHero onCheckAvailabilityHref="#mr-dj-contact" onIntroCallHref="https://meetings.hubspot.com/info879" />

      {/* 2. Trust badges strip */}
      <TrustBadges />

      {/* 3. Availability checker */}
      <section className="mx-auto max-w-2xl px-4 py-8 relative z-10">
        <AvailabilityChecker />
      </section>

      {/* 4. Social proof — dark section */}
      <MrDjSocialProof />

      {/* 4b. Venue partners strip */}
      <VenuePartners />

      {/* 5. Services — white */}
      <MrDjServices />

      {/* 6. Stappen — surface bg */}
      <div className="bg-mrdj-surface">
        <MrDjStappen variant="compact" />
      </div>

      {/* 7. Packages — white */}
      <MrDjPackages />

      {/* 8. Offerte Wizard — surface bg */}
      <div className="bg-mrdj-surface">
        <MrDjOfferteWizard />
      </div>

      {/* 9. Testimonials — gold soft */}
      <div className="bg-mrdj-gold-soft">
        <MrDjTestimonials />
      </div>

      {/* 10. Stats strip — brochure style */}
      <StatsStrip />

      {/* 11. Gallery — white */}
      <MrDjGallery />

      {/* 11. Dark CTA */}
      <DarkCTA />

      {/* 12. Contact form */}
      <div id="mr-dj-contact">
        <MrDjContact>
          <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
        </MrDjContact>
      </div>
    </MrDjLayout>
  );
}
