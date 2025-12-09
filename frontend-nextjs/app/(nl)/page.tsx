// Mister DJ – NL page skeleton
// Onderdeel van dev-kit Z05–Z06 (all-in-one met Z03–Z04).
// Gebruik dit als basis voor app/(nl)/.../page.tsx.
// Agent-taken:
// - imports aanpassen op jouw alias-structuur (@/ vs ../..)
// - content uit www.mr-dj.nl + brochures invullen
// - Z03-formulieren koppelen aan API/mail/CRM

"use client";

import React from "react";
import { MrDjLayout } from "@/src/components/layout/MrDjLayout";
import { MrDjHero } from "@/src/components/sections/MrDjHero";
import { MrDjServices } from "@/src/components/sections/MrDjServices";
import { MrDjPackages } from "@/src/components/sections/MrDjPackages";
import { MrDjTestimonials } from "@/src/components/sections/MrDjTestimonials";
import { MrDjGallery } from "@/src/components/sections/MrDjGallery";
import { MrDjContact } from "@/src/components/sections/MrDjContact";
import { AvailabilityForm } from "@/src/components/forms/AvailabilityForm";
import type { AvailabilityRequest } from "@/src/forms/AvailabilityRequest";

const HomeNlPageSkeleton: React.FC = () => {
  const handleAvailabilitySubmit = async (values: AvailabilityRequest) => {
    // TODO: koppel deze handler aan een API-route, mailer of CRM.
    console.log("[HOME] Availability request", values);
  };

  return (
    <MrDjLayout>
      <MrDjHero onCheckAvailabilityHref="#mr-dj-contact" onIntroCallHref="/nl/contact" />
      <MrDjServices />
      <MrDjPackages />
      <MrDjTestimonials />
      <MrDjGallery />
      <div id="mr-dj-contact">
        <MrDjContact>
          <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
        </MrDjContact>
      </div>
    </MrDjLayout>
  );
};

export default HomeNlPageSkeleton;
