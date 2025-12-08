'use client';

import HomeHero from '@/components/sections/HomeHero';
import HomePricingPreview from '@/components/sections/HomePricingPreview';
import HomeSocialProof from '@/components/sections/HomeSocialProof';
import HomeNavigation from '@/components/sections/HomeNavigation';
import HomeHighlights from '@/components/sections/HomeHighlights';
import HomeCityCoverage from '@/components/sections/HomeCityCoverage';
import HomeFooter from '@/components/sections/HomeFooter';
import VideoTestimonials from '@/components/sections/VideoTestimonials';
import ScrollDepthTracker from '@/components/analytics/ScrollDepthTracker';

export default function HomePage() {
  return (
    <>
      <ScrollDepthTracker page="home" />
      <HomeNavigation />
      <main className="bg-neutral-dark text-neutral-light">
        <HomeHero />
        <HomeHighlights />
        <HomePricingPreview />
        <HomeCityCoverage />
        <VideoTestimonials />
        <HomeSocialProof />
      </main>
      <HomeFooter />
    </>
  );
}
