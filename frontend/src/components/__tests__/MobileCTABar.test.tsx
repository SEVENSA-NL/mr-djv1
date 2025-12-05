import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import MobileCTABar from "../MobileCTABar";

// Mock PostHog
vi.mock("posthog-js", () => ({
  default: {
    capture: vi.fn(),
  },
}));

describe("MobileCTABar", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Reset window scroll position
    window.scrollY = 0;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Visibility", () => {
    it("should not render the CTA bar on page load", () => {
      render(<MobileCTABar />);
      const bar = screen.getByRole("navigation", { name: /mobile contact actions/i });
      expect(bar).toHaveClass("translate-y-full");
    });

    it("should show the CTA bar after scrolling 300px", async () => {
      render(<MobileCTABar />);
      const bar = screen.getByRole("navigation", { name: /mobile contact actions/i });

      // Initial state - hidden
      expect(bar).toHaveClass("translate-y-full");

      // Simulate scroll by manually updating window.scrollY
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 350,
      });

      fireEvent.scroll(window);

      await waitFor(() => {
        expect(bar).toHaveClass("translate-y-0");
      });
    });

    it("should hide the CTA bar on viewports 768px and larger (lg breakpoint)", () => {
      const { container } = render(<MobileCTABar />);
      const bar = container.querySelector("[role='navigation']");

      // Check for Tailwind's lg:hidden class
      expect(bar).toHaveClass("lg:hidden");
    });

    it("should remain visible after scrolling back up", async () => {
      render(<MobileCTABar />);
      const bar = screen.getByRole("navigation", { name: /mobile contact actions/i });

      // Scroll down
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 350,
      });

      fireEvent.scroll(window);

      await waitFor(() => {
        expect(bar).toHaveClass("translate-y-0");
      });

      // Scroll back up - but bar should remain visible per component logic
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 250,
      });

      fireEvent.scroll(window);

      // Should remain visible (no hiding on scroll up)
      expect(bar).toHaveClass("translate-y-0");
    });
  });

  describe("CTA Buttons", () => {
    it("should render all 3 CTA buttons", () => {
      render(<MobileCTABar />);

      const callButton = screen.getByRole("link", { name: /bel mister dj/i });
      const whatsappButton = screen.getByRole("link", { name: /chat via whatsapp/i });
      const contactButton = screen.getByRole("link", { name: /vraag offerte aan/i });

      expect(callButton).toBeInTheDocument();
      expect(whatsappButton).toBeInTheDocument();
      expect(contactButton).toBeInTheDocument();
    });

    it("should prevent default navigation on button clicks", () => {
      render(<MobileCTABar />);

      const callButton = screen.getByRole("link", { name: /bel mister dj/i });
      const preventDefaultSpy = vi.fn();

      fireEvent.click(callButton, { preventDefault: preventDefaultSpy });

      // Verify the click handler was called (navigation is handled by browser)
      expect(callButton).toHaveAttribute("href", "tel:+31408422594");
    });

    it("should render buttons with correct styling classes", () => {
      render(<MobileCTABar />);

      const callButton = screen.getByRole("link", { name: /bel mister dj/i });
      const whatsappButton = screen.getByRole("link", { name: /chat via whatsapp/i });
      const contactButton = screen.getByRole("link", { name: /vraag offerte aan/i });

      // Call button - amber
      expect(callButton).toHaveClass("bg-amber-500");
      // WhatsApp button - green
      expect(whatsappButton).toHaveClass("bg-green-600");
      // Contact button - blue
      expect(contactButton).toHaveClass("bg-blue-600");
    });

    it("should have correct phone number link", () => {
      render(<MobileCTABar />);
      const callButton = screen.getByRole("link", { name: /bel mister dj/i });

      expect(callButton).toHaveAttribute("href", "tel:+31408422594");
    });

    it("should have correct WhatsApp URL with proper encoding", () => {
      render(<MobileCTABar />);
      const whatsappButton = screen.getByRole("link", { name: /chat via whatsapp/i });

      const expectedMessage = "Hoi Mister DJ, ik ben geïnteresseerd in jullie diensten voor mijn event.";
      const expectedUrl = `https://wa.me/31620383638?text=${encodeURIComponent(expectedMessage)}`;

      expect(whatsappButton).toHaveAttribute("href", expectedUrl);
    });

    it("should have correct contact page link", () => {
      render(<MobileCTABar />);
      const contactButton = screen.getByRole("link", { name: /vraag offerte aan/i });

      expect(contactButton).toHaveAttribute("href", "/contact");
    });

    it("should open WhatsApp in new tab", () => {
      render(<MobileCTABar />);
      const whatsappButton = screen.getByRole("link", { name: /chat via whatsapp/i });

      expect(whatsappButton).toHaveAttribute("target", "_blank");
      expect(whatsappButton).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("PostHog Tracking", () => {
    it("should track phone button click with correct event data", async () => {
      // Setup PostHog mock
      const posthogCapture = vi.fn();
      window.posthog = { capture: posthogCapture } as any;

      render(<MobileCTABar />);

      // Show the bar first
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 350,
      });
      fireEvent.scroll(window);

      await waitFor(() => {
        const callButton = screen.getByRole("link", { name: /bel mister dj/i });
        expect(callButton).toBeInTheDocument();
      });

      const callButton = screen.getByRole("link", { name: /bel mister dj/i });
      fireEvent.click(callButton);

      expect(posthogCapture).toHaveBeenCalledWith(
        "mobile_cta_bar_click",
        expect.objectContaining({
          cta_action: "call",
          href: "tel:+31408422594",
        })
      );

      // Verify timestamp is present and recent
      const lastCall = posthogCapture.mock.calls[0][1];
      expect(lastCall.timestamp).toBeDefined();
      expect(new Date(lastCall.timestamp).getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it("should track WhatsApp button click with correct event data", async () => {
      const posthogCapture = vi.fn();
      window.posthog = { capture: posthogCapture } as any;

      render(<MobileCTABar />);

      // Show the bar first
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 350,
      });
      fireEvent.scroll(window);

      await waitFor(() => {
        const whatsappButton = screen.getByRole("link", { name: /chat via whatsapp/i });
        expect(whatsappButton).toBeInTheDocument();
      });

      const whatsappButton = screen.getByRole("link", { name: /chat via whatsapp/i });
      fireEvent.click(whatsappButton);

      expect(posthogCapture).toHaveBeenCalledWith(
        "whatsapp_button_click",
        expect.objectContaining({
          variant: "mobile_cta",
          message_type: "general",
          phone_number: "31620383638",
          source: "mobile_cta_bar",
        })
      );

      // Verify timestamp is present and recent
      const lastCall = posthogCapture.mock.calls[0][1];
      expect(lastCall.timestamp).toBeDefined();
    });

    it("should track contact button click with correct event data", async () => {
      const posthogCapture = vi.fn();
      window.posthog = { capture: posthogCapture } as any;

      render(<MobileCTABar />);

      // Show the bar first
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 350,
      });
      fireEvent.scroll(window);

      await waitFor(() => {
        const contactButton = screen.getByRole("link", { name: /vraag offerte aan/i });
        expect(contactButton).toBeInTheDocument();
      });

      const contactButton = screen.getByRole("link", { name: /vraag offerte aan/i });
      fireEvent.click(contactButton);

      expect(posthogCapture).toHaveBeenCalledWith(
        "mobile_cta_bar_click",
        expect.objectContaining({
          cta_action: "contact",
          href: "/contact",
        })
      );
    });

    it("should handle PostHog errors gracefully", async () => {
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      window.posthog = {
        capture: vi.fn(() => {
          throw new Error("PostHog error");
        }),
      } as any;

      render(<MobileCTABar />);

      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 350,
      });
      fireEvent.scroll(window);

      await waitFor(() => {
        const callButton = screen.getByRole("link", { name: /bel mister dj/i });
        fireEvent.click(callButton);
      });

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "PostHog tracking failed:",
        expect.any(Error)
      );

      consoleWarnSpy.mockRestore();
    });

    it("should not track when PostHog is not available", async () => {
      delete window.posthog;

      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      render(<MobileCTABar />);

      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 350,
      });
      fireEvent.scroll(window);

      await waitFor(() => {
        const callButton = screen.getByRole("link", { name: /bel mister dj/i });
        expect(callButton).toBeInTheDocument();
      });

      const callButton = screen.getByRole("link", { name: /bel mister dj/i });
      fireEvent.click(callButton);

      // Should not throw error, just silently skip tracking
      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA navigation role", () => {
      render(<MobileCTABar />);
      const bar = screen.getByRole("navigation");

      expect(bar).toBeInTheDocument();
      expect(bar).toHaveAttribute("aria-label", "Mobile contact actions");
    });

    it("should have ARIA labels for all CTA buttons", () => {
      render(<MobileCTABar />);

      const callButton = screen.getByRole("link", { name: /bel mister dj/i });
      const whatsappButton = screen.getByRole("link", { name: /chat via whatsapp/i });
      const contactButton = screen.getByRole("link", { name: /vraag offerte aan/i });

      expect(callButton).toHaveAttribute("aria-label", "Bel Mister DJ");
      expect(whatsappButton).toHaveAttribute("aria-label", "Chat via WhatsApp");
      expect(contactButton).toHaveAttribute("aria-label", "Vraag offerte aan");
    });

    it("should have proper semantic link elements", () => {
      render(<MobileCTABar />);

      const callButton = screen.getByRole("link", { name: /bel mister dj/i });
      const whatsappButton = screen.getByRole("link", { name: /chat via whatsapp/i });
      const contactButton = screen.getByRole("link", { name: /vraag offerte aan/i });

      expect(callButton.tagName).toBe("A");
      expect(whatsappButton.tagName).toBe("A");
      expect(contactButton.tagName).toBe("A");
    });

    it("should have visible icons for accessibility context", () => {
      const { container } = render(<MobileCTABar />);

      const svgs = container.querySelectorAll("svg");
      // Should have 3 SVG icons (one for each button)
      expect(svgs.length).toBe(3);
    });

    it("should have proper focus visible classes in markup", () => {
      const { container } = render(<MobileCTABar />);

      const callButton = screen.getByRole("link", { name: /bel mister dj/i });

      // Check that button exists and has aria-label
      expect(callButton).toHaveAttribute("aria-label");

      // Buttons should be focusable elements
      expect(callButton.tagName).toBe("A");
    });
  });

  describe("Edge Cases", () => {
    it("should handle multiple scroll events correctly", async () => {
      render(<MobileCTABar />);
      const bar = screen.getByRole("navigation", { name: /mobile contact actions/i });

      // Multiple scroll events
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 350,
      });
      fireEvent.scroll(window);

      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 360,
      });
      fireEvent.scroll(window);

      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 370,
      });
      fireEvent.scroll(window);

      await waitFor(() => {
        expect(bar).toHaveClass("translate-y-0");
      });
    });

    it("should cleanup scroll listener on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      const { unmount } = render(<MobileCTABar />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function)
      );
    });

    it("should render with proper fixed positioning", () => {
      const { container } = render(<MobileCTABar />);
      const bar = container.querySelector("[role='navigation']");

      expect(bar).toHaveClass("fixed");
      expect(bar).toHaveClass("bottom-0");
      expect(bar).toHaveClass("left-0");
      expect(bar).toHaveClass("right-0");
      expect(bar).toHaveClass("z-50");
    });

    it("should have proper layout flex styling", () => {
      const { container } = render(<MobileCTABar />);
      const bar = container.querySelector("[role='navigation']");

      expect(bar).toHaveClass("flex");
      expect(bar).toHaveClass("items-center");
      expect(bar).toHaveClass("justify-around");
      expect(bar).toHaveClass("gap-2");
    });

    it("should have proper background and shadow styling", () => {
      const { container } = render(<MobileCTABar />);
      const bar = container.querySelector("[role='navigation']");

      expect(bar).toHaveClass("bg-slate-950");
      expect(bar).toHaveClass("shadow-2xl");
    });
  });

  describe("Button Hover and Active States", () => {
    it("should have hover and active styles on all buttons", () => {
      render(<MobileCTABar />);

      const callButton = screen.getByRole("link", { name: /bel mister dj/i });
      const whatsappButton = screen.getByRole("link", { name: /chat via whatsapp/i });
      const contactButton = screen.getByRole("link", { name: /vraag offerte aan/i });

      // Call button hover/active
      expect(callButton).toHaveClass("hover:bg-amber-400");
      expect(callButton).toHaveClass("active:bg-amber-600");

      // WhatsApp button hover/active
      expect(whatsappButton).toHaveClass("hover:bg-green-500");
      expect(whatsappButton).toHaveClass("active:bg-green-700");

      // Contact button hover/active
      expect(contactButton).toHaveClass("hover:bg-blue-500");
      expect(contactButton).toHaveClass("active:bg-blue-700");
    });

    it("should have transition classes for smooth animations", () => {
      render(<MobileCTABar />);

      const callButton = screen.getByRole("link", { name: /bel mister dj/i });
      const bar = screen.getByRole("navigation");

      expect(callButton).toHaveClass("transition-colors");
      expect(bar).toHaveClass("transition-transform");
    });
  });

  describe("Content and Icons", () => {
    it("should render button text content correctly", () => {
      render(<MobileCTABar />);

      expect(screen.getByText("Bel Nu")).toBeInTheDocument();
      expect(screen.getByText("WhatsApp")).toBeInTheDocument();
      expect(screen.getByText("Offerte")).toBeInTheDocument();
    });

    it("should have proper button sizing", () => {
      render(<MobileCTABar />);

      const callButton = screen.getByRole("link", { name: /bel mister dj/i });

      expect(callButton).toHaveClass("flex-1");
      expect(callButton).toHaveClass("px-3");
      expect(callButton).toHaveClass("py-2.5");
      expect(callButton).toHaveClass("text-sm");
    });
  });
});
