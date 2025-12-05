import { useTranslation } from "react-i18next";
import HeroSection from "../components/HeroSection";
import EventTypeSelector from "../components/booking/EventTypeSelector";
import QuickBookingForm from "../components/booking/QuickBookingForm";
import BookingSummary from "../components/BookingSummary";
import Testimonials from "../components/Testimonials";
import VideoTestimonials from "../components/VideoTestimonials";

type HeroContent = {
  title: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaSecondaryText?: string;
};

export default function HomePage() {
  const { t } = useTranslation();
  const heroContent = t("hero", { returnObjects: true }) as HeroContent;

  return (
    <>
      <HeroSection
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        ctaPrimaryText={heroContent.ctaPrimaryText}
        ctaSecondaryText={heroContent.ctaSecondaryText}
      />

      <EventTypeSelector />

      <section className="booking-grid" aria-label={t("app.bookingSectionLabel") ?? "Boekingsflow"}>
        <QuickBookingForm origin="landing-page" autoFocus />
        <BookingSummary />
      </section>

      <VideoTestimonials showControls={true} />

      <Testimonials />
    </>
  );
}
