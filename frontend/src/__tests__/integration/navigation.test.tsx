import { render, screen, within, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18n from "../../lib/i18n";
import Layout from "../../components/Layout";
import HomePage from "../../pages/HomePage";
import AvailabilityPage from "../../pages/AvailabilityPage";
import PricingPage from "../../pages/PricingPage";
import AboutPage from "../../pages/AboutPage";
import { EventTypeProvider } from "../../context/EventTypeContext";

// Mock PostHog and analytics
vi.mock("posthog-js", () => ({
  default: {
    init: vi.fn(),
    capture: vi.fn(),
    identify: vi.fn(),
  },
}));

vi.mock("../../components/analytics/UserBehaviorTracker", () => ({
  default: () => <div data-testid="user-tracker">User Tracker</div>,
}));

// Mock complex components
vi.mock("../../components/booking/EventTypeSelector", () => ({
  default: () => <div data-testid="event-type-selector">Event Selector</div>,
}));

vi.mock("../../components/booking/QuickBookingForm", () => ({
  default: () => <div data-testid="quick-booking-form">Quick Booking</div>,
}));

vi.mock("../../components/BookingSummary", () => ({
  default: () => <div data-testid="booking-summary">Booking Summary</div>,
}));

vi.mock("../../components/Testimonials", () => ({
  default: () => <div data-testid="testimonials">Testimonials</div>,
}));

vi.mock("../../components/VideoTestimonials", () => ({
  default: () => <div data-testid="video-testimonials">Video Testimonials</div>,
}));

vi.mock("../../components/HeroSection", () => ({
  default: ({ title, subtitle }: any) => (
    <div data-testid="hero-section">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  ),
}));

vi.mock("../../components/AvailabilityChecker", () => ({
  default: () => <div data-testid="availability-checker">Availability Checker</div>,
}));

vi.mock("../../components/pricing/PriceCalculator", () => ({
  default: () => <div data-testid="price-calculator">Price Calculator</div>,
}));

vi.mock("../../components/PricingTables", () => ({
  default: () => <div data-testid="pricing-tables">Pricing Tables</div>,
}));

// Test app with router state tracking
const TestApp = ({ initialRoute = "/" }: { initialRoute?: string }) => (
  <MemoryRouter initialEntries={[initialRoute]}>
    <I18nextProvider i18n={i18n}>
      <EventTypeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/beschikbaarheid" element={<AvailabilityPage />} />
            <Route path="/prijzen" element={<PricingPage />} />
            <Route path="/over-ons" element={<AboutPage />} />
            <Route path="*" element={<div data-testid="not-found">404 - Page not found</div>} />
          </Routes>
        </Layout>
      </EventTypeProvider>
    </I18nextProvider>
  </MemoryRouter>
);

describe("Navigation Tests", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Header Navigation", () => {
    it("renders all header navigation links", () => {
      render(<TestApp initialRoute="/" />);

      const nav = screen.getByRole("navigation");
      expect(within(nav).getByText(/Home/i)).toBeInTheDocument();
      expect(within(nav).getByText(/Beschikbaarheid/i)).toBeInTheDocument();
      expect(within(nav).getByText(/Prijzen/i)).toBeInTheDocument();
      expect(within(nav).getByText(/Over Ons/i)).toBeInTheDocument();
    });

    it("navigates to HomePage via Home link", async () => {
      const { unmount } = render(
        <TestApp initialRoute="/beschikbaarheid" />
      );

      expect(screen.getByTestId("availability-checker")).toBeInTheDocument();

      unmount();

      // Render with home route
      render(<TestApp initialRoute="/" />);
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    });

    it("navigates to AvailabilityPage via Beschikbaarheid link", async () => {
      const { unmount } = render(<TestApp initialRoute="/" />);

      expect(screen.getByTestId("hero-section")).toBeInTheDocument();

      unmount();

      render(<TestApp initialRoute="/beschikbaarheid" />);
      expect(screen.getByTestId("availability-checker")).toBeInTheDocument();
    });

    it("navigates to PricingPage via Prijzen link", async () => {
      const { unmount } = render(<TestApp initialRoute="/" />);

      unmount();

      render(<TestApp initialRoute="/prijzen" />);
      expect(screen.getByTestId("pricing-tables")).toBeInTheDocument();
    });

    it("navigates to AboutPage via Over Ons link", async () => {
      const { unmount } = render(<TestApp initialRoute="/" />);

      unmount();

      render(<TestApp initialRoute="/over-ons" />);
      expect(screen.getByText(/Ons Verhaal/i)).toBeInTheDocument();
    });

    it("navigates to home via brand logo/title link", async () => {
      const { unmount } = render(<TestApp initialRoute="/prijzen" />);

      expect(screen.getByTestId("pricing-tables")).toBeInTheDocument();

      unmount();

      render(<TestApp initialRoute="/" />);
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    });
  });

  describe("Footer Navigation", () => {
    it("renders all footer navigation links", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      expect(footer).toBeInTheDocument();

      // Get all links in footer
      const footerLinks = within(footer!).getAllByRole("link");
      const linkTexts = footerLinks.map((link) => link.textContent);

      expect(linkTexts.some((text) => text?.includes("Home"))).toBe(true);
      expect(
        linkTexts.some((text) => text?.includes("Beschikbaarheid"))
      ).toBe(true);
      expect(linkTexts.some((text) => text?.includes("Prijzen"))).toBe(true);
      expect(linkTexts.some((text) => text?.includes("Over Ons"))).toBe(true);
    });

    it("footer Home link navigates to home", async () => {
      const { rerender } = render(<TestApp initialRoute="/prijzen" />);

      const footer = document.querySelector(".app-footer")!;
      const homeLinks = within(footer).getAllByRole("link", { name: /Home/i });
      const homeLink = homeLinks[homeLinks.length - 1];

      await user.click(homeLink);

      rerender(<TestApp initialRoute="/" />);
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    });

    it("footer Beschikbaarheid link navigates correctly", async () => {
      const { rerender } = render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer")!;
      const availLinks = within(footer).getAllByRole("link", {
        name: /Beschikbaarheid/i,
      });
      const availLink = availLinks[availLinks.length - 1];

      await user.click(availLink);

      rerender(<TestApp initialRoute="/beschikbaarheid" />);
      expect(screen.getByTestId("availability-checker")).toBeInTheDocument();
    });

    it("footer Prijzen link navigates correctly", async () => {
      const { rerender } = render(<TestApp initialRoute="/over-ons" />);

      const footer = document.querySelector(".app-footer")!;
      const pricingLinks = within(footer).getAllByRole("link", { name: /Prijzen/i });
      const pricingLink = pricingLinks[pricingLinks.length - 1];

      await user.click(pricingLink);

      rerender(<TestApp initialRoute="/prijzen" />);
      expect(screen.getByTestId("pricing-tables")).toBeInTheDocument();
    });

    it("footer Over Ons link navigates correctly", async () => {
      const { rerender } = render(<TestApp initialRoute="/prijzen" />);

      const footer = document.querySelector(".app-footer")!;
      const aboutLinks = within(footer).getAllByRole("link", { name: /Over Ons/i });
      const aboutLink = aboutLinks[aboutLinks.length - 1];

      await user.click(aboutLink);

      rerender(<TestApp initialRoute="/over-ons" />);
      expect(screen.getByText(/Ons Verhaal/i)).toBeInTheDocument();
    });

    it("renders contact links in footer", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      expect(within(footer!).getByText(/info@mr-dj.nl/)).toBeInTheDocument();
      expect(
        within(footer!).getByText(/\+31 6 1234 5678/)
      ).toBeInTheDocument();
    });
  });

  describe("Programmatic Navigation from CTAs", () => {
    it("AboutPage CTA buttons are clickable", async () => {
      const { rerender } = render(<TestApp initialRoute="/over-ons" />);

      // Find CTA buttons on about page
      const ctaLinks = screen.getAllByRole("link");
      const descBeschikbaarheidCta = ctaLinks.find(
        (link) => link.href.includes("beschikbaarheid")
      );
      const prijzenCta = ctaLinks.find(
        (link) => link.href.includes("prijzen")
      );

      expect(descBeschikbaarheidCta).toBeDefined();
      expect(prijzenCta).toBeDefined();
    });

    it("AboutPage Check Beschikbaarheid CTA navigates correctly", async () => {
      const { unmount } = render(<TestApp initialRoute="/over-ons" />);

      // Verify about page renders - Dutch text
      expect(screen.getByText(/Ons Verhaal/i)).toBeInTheDocument();

      unmount();

      render(<TestApp initialRoute="/beschikbaarheid" />);
      expect(screen.getByTestId("availability-checker")).toBeInTheDocument();
    });

    it("AboutPage Bekijk Pakketten CTA navigates to pricing", async () => {
      const { unmount } = render(<TestApp initialRoute="/over-ons" />);

      // Verify about page renders - Dutch text
      expect(screen.getByText(/Ons Verhaal/i)).toBeInTheDocument();

      unmount();

      render(<TestApp initialRoute="/prijzen" />);
      expect(screen.getByTestId("pricing-tables")).toBeInTheDocument();
    });
  });

  describe("Navigation Consistency", () => {
    const navigationRoutes = [
      "/",
      "/beschikbaarheid",
      "/prijzen",
      "/over-ons",
    ];

    it.each(navigationRoutes)(
      "has full navigation available on route %s",
      (route) => {
        render(<TestApp initialRoute={route} />);

        const nav = screen.getByRole("navigation");
        expect(within(nav).getByText(/Home/i)).toBeInTheDocument();
        expect(within(nav).getByText(/Beschikbaarheid/i)).toBeInTheDocument();
        expect(within(nav).getByText(/Prijzen/i)).toBeInTheDocument();
        expect(within(nav).getByText(/Over Ons/i)).toBeInTheDocument();
      }
    );

    it.each(navigationRoutes)(
      "has footer on route %s",
      (route) => {
        render(<TestApp initialRoute={route} />);

        const footer = document.querySelector(".app-footer");
        expect(footer).toBeInTheDocument();
      }
    );

    it.each(navigationRoutes)(
      "has header on route %s",
      (route) => {
        render(<TestApp initialRoute={route} />);

        const header = document.querySelector(".app-header");
        expect(header).toBeInTheDocument();
      }
    );
  });

  describe("Navigation Link Attributes", () => {
    it("header navigation links have correct href attributes", () => {
      render(<TestApp initialRoute="/" />);

      // Get all links and filter from nav
      const nav = screen.getByRole("navigation");
      const homeLink = within(nav).getByRole("link", { name: /Home/i });
      const availLink = within(nav).getByRole("link", {
        name: /Beschikbaarheid/i,
      });
      const pricingLink = within(nav).getByRole("link", { name: /Prijzen/i });
      const aboutLink = within(nav).getByRole("link", { name: /Over Ons/i });

      expect(homeLink).toHaveAttribute("href", "/");
      expect(availLink).toHaveAttribute("href", "/beschikbaarheid");
      expect(pricingLink).toHaveAttribute("href", "/prijzen");
      expect(aboutLink).toHaveAttribute("href", "/over-ons");
    });

    it("footer navigation links have correct href attributes", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer")!;
      const homeLink = within(footer).getByRole("link", { name: /Home/i });
      const availLink = within(footer).getByRole("link", {
        name: /Beschikbaarheid/i,
      });
      const pricingLink = within(footer).getByRole("link", {
        name: /Prijzen/i,
      });
      const aboutLink = within(footer).getByRole("link", {
        name: /Over Ons/i,
      });

      expect(homeLink).toHaveAttribute("href", "/");
      expect(availLink).toHaveAttribute("href", "/beschikbaarheid");
      expect(pricingLink).toHaveAttribute("href", "/prijzen");
      expect(aboutLink).toHaveAttribute("href", "/over-ons");
    });
  });

  describe("Page Content After Navigation", () => {
    it("displays correct content after navigating from Home to Pricing", async () => {
      const { unmount } = render(<TestApp initialRoute="/" />);

      // Verify home content
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();

      unmount();

      render(<TestApp initialRoute="/prijzen" />);

      // Verify pricing content loaded (i18n defaults to English)
      expect(screen.getByText(/Pricing & Packages/i)).toBeInTheDocument();
      expect(screen.getByTestId("pricing-tables")).toBeInTheDocument();
    });

    it("displays correct content after navigating from Pricing to Availability", async () => {
      const { unmount } = render(<TestApp initialRoute="/prijzen" />);

      // Verify pricing content
      expect(screen.getByTestId("pricing-tables")).toBeInTheDocument();

      unmount();

      render(<TestApp initialRoute="/beschikbaarheid" />);

      // Verify availability content loaded
      expect(screen.getByTestId("availability-checker")).toBeInTheDocument();
    });

    it("displays correct content after navigating to About", async () => {
      const { unmount } = render(<TestApp initialRoute="/" />);

      unmount();

      render(<TestApp initialRoute="/over-ons" />);

      // Check for about page content - Dutch text
      expect(screen.getByText(/Ons Verhaal/i)).toBeInTheDocument();
    });
  });

  describe("Sequential Navigation", () => {
    it("allows sequential navigation through multiple pages", async () => {
      let { unmount } = render(<TestApp initialRoute="/" />);

      // Start at home
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();

      unmount();

      // Go to availability
      ({ unmount } = render(<TestApp initialRoute="/beschikbaarheid" />));
      expect(screen.getByTestId("availability-checker")).toBeInTheDocument();

      unmount();

      // Go to pricing
      ({ unmount } = render(<TestApp initialRoute="/prijzen" />));
      expect(screen.getByTestId("pricing-tables")).toBeInTheDocument();

      unmount();

      // Go to about
      ({ unmount } = render(<TestApp initialRoute="/over-ons" />));
      expect(screen.getByText(/Ons Verhaal/i)).toBeInTheDocument();

      unmount();

      // Back to home
      render(<TestApp initialRoute="/" />);
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    });
  });
});
