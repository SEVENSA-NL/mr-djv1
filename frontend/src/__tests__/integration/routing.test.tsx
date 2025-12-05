import { render, screen, cleanup } from "@testing-library/react";
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

// Mock PostHog and analytics components
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

// Mock components that may have dependencies
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

// Test app wrapper
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
            {/* Catch-all for 404 testing */}
            <Route path="*" element={<div data-testid="not-found">404 - Page not found</div>} />
          </Routes>
        </Layout>
      </EventTypeProvider>
    </I18nextProvider>
  </MemoryRouter>
);

describe("Route Configuration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("HomePage", () => {
    it("renders HomePage at root path /", () => {
      render(<TestApp initialRoute="/" />);

      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
      expect(screen.getByTestId("event-type-selector")).toBeInTheDocument();
    });

    it("renders Layout components on HomePage", () => {
      render(<TestApp initialRoute="/" />);

      // Check header
      expect(screen.getByRole("heading", { level: 1, name: /Mr. DJ/ })).toBeInTheDocument();

      // Check navigation (may appear in header and footer)
      expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Beschikbaarheid/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Prijzen/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Over Ons/i).length).toBeGreaterThan(0);

      // Check footer
      const footer = document.querySelector(".app-footer");
      expect(footer).toBeInTheDocument();
    });
  });

  describe("AvailabilityPage", () => {
    it("renders AvailabilityPage at /beschikbaarheid", () => {
      render(<TestApp initialRoute="/beschikbaarheid" />);

      const heading = screen.getByText(/Check Beschikbaarheid/i);
      expect(heading).toBeInTheDocument();
      expect(screen.getByTestId("availability-checker")).toBeInTheDocument();
    });

    it("renders correct title on AvailabilityPage", () => {
      render(<TestApp initialRoute="/beschikbaarheid" />);

      expect(screen.getByText(/Check Beschikbaarheid/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Controleer direct of je gewenste datum nog vrij is/i
        )
      ).toBeInTheDocument();
    });

    it("displays layout on AvailabilityPage", () => {
      render(<TestApp initialRoute="/beschikbaarheid" />);

      expect(screen.getByRole("heading", { level: 1, name: /Mr. DJ/ })).toBeInTheDocument();
      expect(document.querySelector(".app-footer")).toBeInTheDocument();
    });
  });

  describe("PricingPage", () => {
    it("renders PricingPage at /prijzen", () => {
      render(<TestApp initialRoute="/prijzen" />);

      // i18n defaults to English
      expect(
        screen.getByText(/Pricing & Packages/i)
      ).toBeInTheDocument();
      expect(screen.getByTestId("pricing-tables")).toBeInTheDocument();
    });

    it("renders price calculator on PricingPage", () => {
      render(<TestApp initialRoute="/prijzen" />);

      expect(screen.getByTestId("price-calculator")).toBeInTheDocument();
    });

    it("displays pricing subtitle correctly", () => {
      render(<TestApp initialRoute="/prijzen" />);

      // i18n defaults to English
      expect(
        screen.getByText(/Choose the package that suits your event/i)
      ).toBeInTheDocument();
    });
  });

  describe("AboutPage", () => {
    it("renders AboutPage at /over-ons", () => {
      render(<TestApp initialRoute="/over-ons" />);

      // Use getAllByText and check for the main heading (first element in page content)
      const headings = screen.getAllByText(/Over Ons/i);
      expect(headings.length).toBeGreaterThan(0);
      // Find the h1 heading specifically
      expect(screen.getByRole("heading", { level: 1, name: /Over Ons/i })).toBeInTheDocument();
      expect(screen.getByText(/Ons Verhaal/i)).toBeInTheDocument();
    });

    it("displays experience section on AboutPage", () => {
      render(<TestApp initialRoute="/over-ons" />);

      expect(screen.getByText(/Onze Ervaring/i)).toBeInTheDocument();
      // Check for the experience stats
      expect(screen.getAllByText(/500\+/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/15\+/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/4\.9/).length).toBeGreaterThan(0);
    });

    it("displays values section on AboutPage", () => {
      render(<TestApp initialRoute="/over-ons" />);

      expect(screen.getByText(/Onze Waarden/i)).toBeInTheDocument();
      expect(screen.getByText(/Professionaliteit:/)).toBeInTheDocument();
      expect(screen.getByText(/100% Dansgarantie:/)).toBeInTheDocument();
    });

    it("displays CTA buttons on AboutPage", () => {
      render(<TestApp initialRoute="/over-ons" />);

      const buttons = screen.getAllByText(/Check Beschikbaarheid|Bekijk Pakketten/i);
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe("404 Handling", () => {
    it("renders 404 page for unknown routes", () => {
      render(<TestApp initialRoute="/unknown-route" />);

      expect(screen.getByTestId("not-found")).toBeInTheDocument();
      expect(screen.getByText(/404 - Page not found/i)).toBeInTheDocument();
    });

    it("renders 404 for /contact route (not implemented)", () => {
      render(<TestApp initialRoute="/contact" />);

      expect(screen.getByTestId("not-found")).toBeInTheDocument();
    });

    it("still renders header and footer on 404 page", () => {
      render(<TestApp initialRoute="/nonexistent" />);

      expect(screen.getByRole("heading", { level: 1, name: /Mr. DJ/ })).toBeInTheDocument();
      expect(document.querySelector(".app-footer")).toBeInTheDocument();
    });

    it("maintains layout consistency with 404", () => {
      render(<TestApp initialRoute="/invalid-path" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      const footer = document.querySelector(".app-footer");
      expect(footer).toBeInTheDocument();
    });
  });

  describe("Route Rendering Consistency", () => {
    const routes = [
      { path: "/", pageName: "home" },
      { path: "/beschikbaarheid", pageName: "availability" },
      { path: "/prijzen", pageName: "pricing" },
      { path: "/over-ons", pageName: "about" },
    ];

    it.each(routes)(
      "renders Layout on route $path",
      ({ path }) => {
        render(<TestApp initialRoute={path} />);

        // All routes should have header
        expect(screen.getByRole("heading", { level: 1, name: /Mr. DJ/ })).toBeInTheDocument();

        // All routes should have footer
        expect(document.querySelector(".app-footer")).toBeInTheDocument();
      }
    );

    it.each(routes)(
      "renders navigation on route $path",
      ({ path }) => {
        render(<TestApp initialRoute={path} />);

        const navLinks = screen.getAllByRole("link");
        // Should have multiple navigation links
        expect(navLinks.length).toBeGreaterThan(0);
      }
    );
  });

  describe("Route Parameter Verification", () => {
    it("confirms all main routes are accessible", () => {
      const mainRoutes = ["/", "/beschikbaarheid", "/prijzen", "/over-ons"];

      mainRoutes.forEach((route) => {
        const { unmount } = render(<TestApp initialRoute={route} />);
        // Should not throw and page should be renderable
        expect(screen.queryByTestId("not-found")).not.toBeInTheDocument();
        unmount();
      });
    });

    it("distinguishes between valid and invalid routes", () => {
      const validRoute = "/prijzen";
      const invalidRoute = "/prijzen-invalid";

      // Valid route should render content (i18n defaults to English)
      const { unmount: unmountValid } = render(<TestApp initialRoute={validRoute} />);
      const validText = screen.queryByText(/Pricing & Packages/i);
      expect(validText).not.toBeNull();
      unmountValid();

      // Invalid route should render 404
      const { unmount: unmountInvalid } = render(<TestApp initialRoute={invalidRoute} />);
      expect(screen.getByTestId("not-found")).toBeInTheDocument();
      unmountInvalid();
    });
  });
});
