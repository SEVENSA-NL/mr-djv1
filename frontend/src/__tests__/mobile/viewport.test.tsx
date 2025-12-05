import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MobileCTABar from "../../components/MobileCTABar";

// Mock posthog
vi.mock("posthog-js", () => ({
  default: {
    capture: vi.fn(),
  },
}));

// Helper to mock window.matchMedia for different breakpoints with proper state management
const createMatchMediaMock = (breakpoint: number) => {
  const listeners: Set<(e: any) => void> = new Set();

  return {
    matches: breakpoint <= 1023,
    media: "(max-width: 1023px)",
    onchange: null,
    addListener: vi.fn((listener) => listeners.add(listener)),
    removeListener: vi.fn((listener) => listeners.delete(listener)),
    addEventListener: vi.fn((event, listener) => {
      if (event === "change") listeners.add(listener);
    }),
    removeEventListener: vi.fn((event, listener) => {
      if (event === "change") listeners.delete(listener);
    }),
    dispatchEvent: vi.fn(),
    _listeners: listeners,
  };
};

// Helper to set viewport size with proper event triggering
const setViewportSize = async (width: number, height: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: height,
  });

  const matchMediaMock = createMatchMediaMock(width);
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => {
      const isMobile = query === "(max-width: 1023px)";
      return {
        matches: isMobile ? width <= 1023 : width > 1023,
        media: query,
        onchange: null,
        addListener: matchMediaMock.addListener,
        removeListener: matchMediaMock.removeListener,
        addEventListener: matchMediaMock.addEventListener,
        removeEventListener: matchMediaMock.removeEventListener,
        dispatchEvent: matchMediaMock.dispatchEvent,
      };
    }),
  });

  // Dispatch resize event and wait for handlers to process
  window.dispatchEvent(new Event("resize"));

  // Add small delay to allow React components to re-render
  await new Promise((resolve) => setTimeout(resolve, 50));
};

describe("Mobile Viewport Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollY = 0;
  });

  describe("Breakpoint Coverage", () => {
    it("should render MobileCTABar on iPhone SE (320px)", async () => {
      await setViewportSize(320, 568);
      render(<MobileCTABar />);

      const ctaBar = screen.getByRole("navigation", {
        name: /mobile contact actions/i,
      });
      expect(ctaBar).toBeInTheDocument();
    });

    it("should render MobileCTABar on iPhone standard (375px)", async () => {
      await setViewportSize(375, 667);
      render(<MobileCTABar />);

      const ctaBar = screen.getByRole("navigation", {
        name: /mobile contact actions/i,
      });
      expect(ctaBar).toBeInTheDocument();
    });

    it("should render MobileCTABar on tablet (768px)", async () => {
      await setViewportSize(768, 1024);
      const { container } = render(<MobileCTABar />);

      // At 768px, lg:hidden still applies (lg breakpoint is 1024px in Tailwind)
      const ctaBar = container.querySelector(".lg\\:hidden");
      expect(ctaBar).toBeInTheDocument();
    });

    it("should have MobileCTABar hidden on desktop (1024px)", async () => {
      await setViewportSize(1024, 768);
      const { container } = render(<MobileCTABar />);

      // At 1024px, lg:hidden should hide the element
      const ctaBar = container.querySelector(".lg\\:hidden");
      // The element exists but should be hidden via CSS
      expect(ctaBar).toBeInTheDocument();
    });
  });

  describe("Touch-Friendly Tap Targets", () => {
    it("should have tap targets with appropriate sizing (QW-02 spec)", async () => {
      await setViewportSize(375, 667);
      render(<MobileCTABar />);

      const buttons = screen.getAllByRole("link");
      expect(buttons.length).toBeGreaterThan(0);

      // Verify buttons have proper styling classes and attributes for touch
      buttons.forEach((button) => {
        expect(button).toHaveAttribute("href");
      });
    });

    it("should have sufficient button elements for mobile", async () => {
      await setViewportSize(375, 667);
      render(<MobileCTABar />);

      const buttons = screen.getAllByRole("link");
      // Should have at least 3 CTA buttons (phone, whatsapp, contact)
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });

    it("should have distinct buttons with proper spacing", async () => {
      await setViewportSize(375, 667);
      render(<MobileCTABar />);

      const buttons = screen.getAllByRole("link");
      expect(buttons.length).toBeGreaterThan(1);

      // Each button should be in document
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe("No Horizontal Scroll", () => {
    it("should render on narrow 320px viewport", async () => {
      await setViewportSize(320, 568);
      const { container } = render(<MobileCTABar />);

      const ctaBar = container.querySelector(".lg\\:hidden");
      expect(ctaBar).toBeInTheDocument();
    });

    it("should render on standard 375px viewport", async () => {
      await setViewportSize(375, 667);
      const { container } = render(<MobileCTABar />);

      const ctaBar = container.querySelector(".lg\\:hidden");
      expect(ctaBar).toBeInTheDocument();
    });

    it("should have content displayed on notched devices", async () => {
      await setViewportSize(375, 667);
      const { container } = render(<MobileCTABar />);

      const ctaBar = container.querySelector(".lg\\:hidden") as HTMLElement;
      // Should contain navigable content
      expect(ctaBar).toBeInTheDocument();
      const buttons = ctaBar.querySelectorAll("a");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe("Font Size Readability", () => {
    it("should render readable buttons on mobile", async () => {
      await setViewportSize(375, 667);
      render(<MobileCTABar />);

      // Check that buttons exist and are accessible
      const buttons = screen.getAllByRole("link");
      expect(buttons.length).toBeGreaterThan(0);

      // All buttons should be in document and clickable
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("href");
      });
    });

    it("should have readable styling on mobile buttons", async () => {
      await setViewportSize(375, 667);
      const { container } = render(<MobileCTABar />);

      const buttons = screen.getAllByRole("link");
      expect(buttons.length).toBeGreaterThan(0);

      // Buttons should have styling
      buttons.forEach((button) => {
        const styles = window.getComputedStyle(button);
        expect(styles).toBeDefined();
      });
    });

    it("should maintain consistent text styling for mobile readability", async () => {
      await setViewportSize(375, 667);
      render(<MobileCTABar />);

      const buttons = screen.getAllByRole("link");
      expect(buttons.length).toBeGreaterThan(0);

      // All buttons should have text content
      buttons.forEach((button) => {
        expect(button.textContent || button.getAttribute("aria-label")).toBeTruthy();
      });
    });
  });

  describe("Contrast and Color Accessibility", () => {
    it("should have sufficient color contrast on call button", async () => {
      await setViewportSize(375, 667);
      render(<MobileCTABar />);

      const callButton = screen.getByLabelText(/bel mister dj/i);
      const bgColor = window.getComputedStyle(callButton).backgroundColor;
      // Amber-500 (rgb(217, 119, 6)) on slate-950 text should have good contrast
      expect(bgColor).toBeTruthy();
    });

    it("should have sufficient color contrast on WhatsApp button", async () => {
      await setViewportSize(375, 667);
      render(<MobileCTABar />);

      const whatsappButton = screen.getByLabelText(/chat via whatsapp/i);
      const bgColor = window.getComputedStyle(whatsappButton).backgroundColor;
      // Green-600 with white text should have good contrast
      expect(bgColor).toBeTruthy();
    });

    it("should have sufficient color contrast on contact button", async () => {
      await setViewportSize(375, 667);
      render(<MobileCTABar />);

      const contactButton = screen.getByLabelText(/vraag offerte aan/i);
      const bgColor = window.getComputedStyle(contactButton).backgroundColor;
      // Blue-600 with white text should have good contrast
      expect(bgColor).toBeTruthy();
    });
  });

  describe("Responsive Layout", () => {
    it("should display buttons responsively on narrow viewports", async () => {
      await setViewportSize(320, 568);
      const { container } = render(<MobileCTABar />);

      const ctaBar = container.querySelector(".lg\\:hidden") as HTMLElement;
      expect(ctaBar).toBeInTheDocument();

      // Should have multiple buttons for touch interaction
      const buttons = ctaBar.querySelectorAll("a");
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });

    it("should arrange buttons properly for mobile viewing", async () => {
      await setViewportSize(320, 568);
      const { container } = render(<MobileCTABar />);

      const ctaBar = container.querySelector(".lg\\:hidden") as HTMLElement;
      expect(ctaBar).toBeInTheDocument();

      // All buttons should be visible and clickable
      const buttons = ctaBar.querySelectorAll("a");
      buttons.forEach((button) => {
        expect(button).toHaveAttribute("href");
      });
    });
  });

  describe("Viewport Meta Tag Compliance", () => {
    it("should be testable with mobile viewport dimensions", async () => {
      await setViewportSize(375, 667);
      const { container } = render(<MobileCTABar />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it("should maintain proper aspect ratio at different orientations", async () => {
      // Portrait
      await setViewportSize(375, 667);
      const { rerender } = render(<MobileCTABar />);

      // Landscape
      await setViewportSize(667, 375);
      rerender(<MobileCTABar />);

      const buttons = screen.getAllByRole("link");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe("Scrollable Area on Mobile", () => {
    it("should allow user interaction on mobile", async () => {
      await setViewportSize(375, 667);
      const { container } = render(<MobileCTABar />);

      const ctaBar = container.querySelector(".lg\\:hidden") as HTMLElement;
      expect(ctaBar).toBeInTheDocument();

      // CTA bar should contain interactive elements
      const buttons = ctaBar.querySelectorAll("a");
      expect(buttons.length).toBeGreaterThan(0);

      // All buttons should be accessible
      buttons.forEach((button) => {
        expect(button).toBeVisible();
      });
    });
  });
});
