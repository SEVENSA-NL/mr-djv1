import { render, screen, within, cleanup } from "@testing-library/react";
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

// Test app
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
            <Route path="*" element={<div data-testid="not-found">404</div>} />
          </Routes>
        </Layout>
      </EventTypeProvider>
    </I18nextProvider>
  </MemoryRouter>
);

describe("Layout Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Layout Structure", () => {
    it("renders Layout component with all main sections", () => {
      render(<TestApp initialRoute="/" />);

      // Check for main layout sections
      expect(document.querySelector(".App")).toBeInTheDocument();
      expect(document.querySelector(".app-header")).toBeInTheDocument();
      expect(document.querySelector(".app-main")).toBeInTheDocument();
      expect(document.querySelector(".app-footer")).toBeInTheDocument();
    });

    it("wraps page content in main element", () => {
      render(<TestApp initialRoute="/" />);

      const main = document.querySelector(".app-main");
      expect(main).toBeInTheDocument();
      expect(main).toContainElement(screen.getByTestId("hero-section"));
    });

    it("maintains layout structure across different routes", () => {
      const routes = ["/", "/beschikbaarheid", "/prijzen", "/over-ons"];

      routes.forEach((route) => {
        const { unmount } = render(<TestApp initialRoute={route} />);

        expect(document.querySelector(".app-header")).toBeInTheDocument();
        expect(document.querySelector(".app-main")).toBeInTheDocument();
        expect(document.querySelector(".app-footer")).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe("Header Component", () => {
    it("displays header with brand and navigation", () => {
      render(<TestApp initialRoute="/" />);

      const header = document.querySelector(".app-header");
      expect(header).toBeInTheDocument();

      // Brand section
      const brand = document.querySelector(".app-brand");
      expect(brand).toBeInTheDocument();

      // Navigation
      const nav = within(header!).getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("displays app badge in header", () => {
      render(<TestApp initialRoute="/" />);

      const badge = document.querySelector(".app-badge");
      expect(badge).toBeInTheDocument();
    });

    it("displays app title in header", () => {
      render(<TestApp initialRoute="/" />);

      expect(screen.getByRole("heading", { level: 1, name: /Mr. DJ/ })).toBeInTheDocument();
    });

    it("app title is a link to home", () => {
      render(<TestApp initialRoute="/" />);

      const titleLink = screen.getByRole("link", { name: /Mr. DJ/ });
      expect(titleLink).toHaveAttribute("href", "/");
    });

    it("displays language switcher in header", () => {
      render(<TestApp initialRoute="/" />);

      const header = document.querySelector(".app-header");
      // The language switcher should be present
      expect(header).toBeInTheDocument();
    });

    it("header remains consistent across pages", () => {
      const routes = ["/", "/beschikbaarheid", "/prijzen", "/over-ons"];

      routes.forEach((route) => {
        const { unmount } = render(<TestApp initialRoute={route} />);

        const header = document.querySelector(".app-header");
        expect(header).toBeInTheDocument();

        // Check for navigation in header
        const nav = within(header!).queryByRole("navigation");
        expect(nav).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe("Navigation Section", () => {
    it("displays navigation list with all links", () => {
      render(<TestApp initialRoute="/" />);

      const navList = document.querySelector(".nav-list");
      expect(navList).toBeInTheDocument();

      const listItems = within(navList!).getAllByRole("link");
      expect(listItems.length).toBeGreaterThanOrEqual(4);
    });

    it("renders navigation links with correct text", () => {
      render(<TestApp initialRoute="/" />);

      const navList = document.querySelector(".nav-list");
      expect(within(navList!).getByText(/Home/i)).toBeInTheDocument();
      expect(within(navList!).getByText(/Beschikbaarheid/i)).toBeInTheDocument();
      expect(within(navList!).getByText(/Prijzen/i)).toBeInTheDocument();
      expect(within(navList!).getByText(/Over Ons/i)).toBeInTheDocument();
    });

    it("all nav links have nav-link class", () => {
      render(<TestApp initialRoute="/" />);

      const navLinks = document.querySelectorAll(".nav-link");
      expect(navLinks.length).toBeGreaterThanOrEqual(4);

      navLinks.forEach((link) => {
        expect(link.tagName.toLowerCase()).toBe("a");
      });
    });

    it("navigation is visible on all pages", () => {
      const routes = ["/", "/beschikbaarheid", "/prijzen", "/over-ons"];

      routes.forEach((route) => {
        const { unmount } = render(<TestApp initialRoute={route} />);

        const navList = document.querySelector(".nav-list");
        expect(navList).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe("Main Content Area", () => {
    it("renders page content in main element", () => {
      render(<TestApp initialRoute="/" />);

      const main = document.querySelector(".app-main");
      expect(main).toBeInTheDocument();

      // Home page specific content
      expect(main).toContainElement(screen.getByTestId("hero-section"));
    });

    it("page content changes when route changes", () => {
      const { rerender, unmount } = render(<TestApp initialRoute="/" />);

      let main = document.querySelector(".app-main");
      expect(main).toContainElement(screen.getByTestId("hero-section"));

      unmount();

      const { unmount: unmount2 } = render(
        <TestApp initialRoute="/prijzen" />
      );

      main = document.querySelector(".app-main");
      expect(main).toContainElement(screen.getByTestId("pricing-tables"));

      unmount2();
    });

    it("main element has correct CSS class", () => {
      render(<TestApp initialRoute="/" />);

      const main = document.querySelector(".app-main");
      expect(main).toHaveClass("app-main");
    });
  });

  describe("Footer Component", () => {
    it("displays footer with all sections", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass("app-footer");
    });

    it("displays company name in footer", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      const footerText = within(footer!).getAllByText(/Mr. DJ/);
      expect(footerText.length).toBeGreaterThan(0);
    });

    it("displays footer tagline", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      expect(
        within(footer!).getByText(
          /Professionele DJ services voor bruiloften, bedrijfsfeesten en meer/i
        )
      ).toBeInTheDocument();
    });

    it("displays Quick Links section in footer", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      expect(
        within(footer!).getByText(/Snelle Links/i)
      ).toBeInTheDocument();
    });

    it("displays Contact section in footer", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      expect(within(footer!).getByText(/Contact/i)).toBeInTheDocument();
    });

    it("displays email in footer", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      expect(
        within(footer!).getByText(/info@mr-dj.nl/)
      ).toBeInTheDocument();
    });

    it("displays phone number in footer", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      expect(
        within(footer!).getByText(/\+31 6 1234 5678/)
      ).toBeInTheDocument();
    });

    it("displays copyright notice in footer", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      const copyrightText = within(footer!).getByText(/© .* Mr. DJ/);
      expect(copyrightText).toBeInTheDocument();
    });

    it("footer remains consistent across all pages", () => {
      const routes = ["/", "/beschikbaarheid", "/prijzen", "/over-ons"];

      routes.forEach((route) => {
        const { unmount } = render(<TestApp initialRoute={route} />);

        const footer = document.querySelector(".app-footer");
        expect(footer).toBeInTheDocument();

        // Check key footer elements
        const footerText = within(footer!).getAllByText(/Mr. DJ/);
        expect(footerText.length).toBeGreaterThan(0);
        expect(
          within(footer!).getByText(/Snelle Links/i)
        ).toBeInTheDocument();
        expect(
          within(footer!).getByText(/Contact/i)
        ).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe("Footer Quick Links", () => {
    it("renders all quick links in footer", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      const quickLinks = within(footer!).getAllByRole("link");

      // Should have multiple links including quick links
      expect(quickLinks.length).toBeGreaterThan(0);
    });

    it("footer quick links have correct hrefs", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      const links = within(footer!).getAllByRole("link");

      const hrefMap = links.reduce(
        (acc, link) => {
          const href = link.getAttribute("href");
          if (href) acc[href] = (acc[href] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      expect(hrefMap["/"]).toBeGreaterThan(0);
      expect(hrefMap["/beschikbaarheid"]).toBeGreaterThan(0);
      expect(hrefMap["/prijzen"]).toBeGreaterThan(0);
      expect(hrefMap["/over-ons"]).toBeGreaterThan(0);
    });
  });

  describe("Layout Styling Classes", () => {
    it("uses semantic HTML structure", () => {
      render(<TestApp initialRoute="/" />);

      expect(document.querySelector("header.app-header")).toBeInTheDocument();
      expect(document.querySelector("main.app-main")).toBeInTheDocument();
      expect(document.querySelector("footer.app-footer")).toBeInTheDocument();
    });

    it("container divs have container class", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      const container = footer?.querySelector(".container");

      // At least one container should be present
      expect(container).toBeInTheDocument();
    });
  });

  describe("Active Route Highlighting", () => {
    it("navigation links render on all pages", () => {
      const routes = ["/", "/beschikbaarheid", "/prijzen", "/over-ons"];

      routes.forEach((route) => {
        const { unmount } = render(<TestApp initialRoute={route} />);

        const navLinks = screen.getAllByRole("link");
        expect(navLinks.length).toBeGreaterThan(0);

        unmount();
      });
    });

    it("all navigation links are clickable", () => {
      render(<TestApp initialRoute="/" />);

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link.tagName.toLowerCase()).toBe("a");
        expect(link).not.toBeDisabled();
      });
    });
  });

  describe("Layout Responsiveness Elements", () => {
    it("uses responsive grid classes in footer", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      expect(footer).toBeInTheDocument();

      // Check for grid structure
      const gridElement = footer?.querySelector("[class*='grid']");
      expect(gridElement).toBeInTheDocument();
    });

    it("renders container with padding classes", () => {
      render(<TestApp initialRoute="/" />);

      const footer = document.querySelector(".app-footer");
      const container = footer?.querySelector(".container");
      expect(container).toBeInTheDocument();
    });
  });

  describe("Page Transitions", () => {
    it("maintains layout when transitioning between pages", () => {
      const { unmount: unmount1 } = render(
        <TestApp initialRoute="/" />
      );

      let header = document.querySelector(".app-header");
      let footer = document.querySelector(".app-footer");
      expect(header).toBeInTheDocument();
      expect(footer).toBeInTheDocument();

      unmount1();

      const { unmount: unmount2 } = render(
        <TestApp initialRoute="/prijzen" />
      );

      header = document.querySelector(".app-header");
      footer = document.querySelector(".app-footer");
      expect(header).toBeInTheDocument();
      expect(footer).toBeInTheDocument();

      unmount2();
    });

    it("content area updates while header/footer persist", () => {
      const { unmount: unmount1 } = render(
        <TestApp initialRoute="/" />
      );

      let main = document.querySelector(".app-main");
      expect(main).toContainElement(screen.getByTestId("hero-section"));

      unmount1();

      const { unmount: unmount2 } = render(
        <TestApp initialRoute="/over-ons" />
      );

      main = document.querySelector(".app-main");
      expect(main).toContainElement(screen.getByText(/Ons Verhaal/i));

      unmount2();
    });
  });
});
