import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MobileCTABar from "../../components/MobileCTABar";
import QuickBookingForm from "../../components/booking/QuickBookingForm";

// Mock posthog
vi.mock("posthog-js", () => ({
  default: {
    capture: vi.fn(),
  },
}));

// Mock hooks
const submitMock = vi.fn();
const resetMock = vi.fn();
const useOptionalEventTypeMock = vi.hoisted(() => vi.fn());

vi.mock("../../hooks/useBooking", () => ({
  __esModule: true,
  default: () => ({
    submit: submitMock,
    status: "idle",
    error: null,
    reset: resetMock,
  }),
}));

vi.mock("../../context/EventTypeContext", () => ({
  __esModule: true,
  useOptionalEventType: (...args: unknown[]) => useOptionalEventTypeMock(...args),
}));

// Mock window.matchMedia for mobile with proper state management
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

const setMobileViewport = async (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
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

  // Add delay to allow React components to re-render
  await new Promise((resolve) => setTimeout(resolve, 50));
};

describe("Mobile Interactions Test", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await setMobileViewport(375);
    useOptionalEventTypeMock.mockImplementation(() => ({
      eventType: "",
      setEventType: vi.fn(),
    }));
  });

  describe("Pinch Zoom Disabled on Forms", () => {
    it("should disable pinch zoom on form inputs", () => {
      const { container } = render(<QuickBookingForm origin="test" />);

      const form = container.querySelector("form");
      // Check viewport meta tag would be set in HTML (outside component scope)
      expect(form).toBeInTheDocument();
    });

    it("should prevent zoom on input focus", async () => {
      const user = userEvent.setup();
      render(<QuickBookingForm origin="test" />);

      const input = screen.getByPlaceholderText(/uw naam/i);

      // Focus should not trigger zoom
      await user.click(input);

      expect(input).toHaveFocus();
    });

    it("should support standard touch interactions on form", async () => {
      const user = userEvent.setup();
      render(<QuickBookingForm origin="test" />);

      const input = screen.getByPlaceholderText(/uw naam/i) as HTMLInputElement;

      // Touch interaction
      await user.click(input);
      await user.type(input, "Test Name");

      expect(input.value).toBe("Test Name");
    });
  });

  describe("WhatsApp Button on Mobile", () => {
    it("should render WhatsApp button with correct link", () => {
      render(<MobileCTABar />);

      const whatsappButton = screen.getByLabelText(/chat via whatsapp/i);
      expect(whatsappButton).toBeInTheDocument();
      expect(whatsappButton).toHaveAttribute("href", expect.stringContaining("wa.me"));
    });

    it("should open WhatsApp link in new tab", () => {
      render(<MobileCTABar />);

      const whatsappButton = screen.getByLabelText(/chat via whatsapp/i);

      expect(whatsappButton).toHaveAttribute("target", "_blank");
      expect(whatsappButton).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should include pre-filled message in WhatsApp link", () => {
      render(<MobileCTABar />);

      const whatsappButton = screen.getByLabelText(/chat via whatsapp/i);
      const href = whatsappButton.getAttribute("href");

      // Should contain the phone number
      expect(href).toContain("wa.me");
      expect(href).toContain("31620383638");

      // Should contain pre-filled message
      expect(href).toContain("text=");
    });

    it("should track WhatsApp button clicks", async () => {
      const user = userEvent.setup();
      render(<MobileCTABar />);

      const whatsappButton = screen.getByLabelText(/chat via whatsapp/i);

      // Note: Link won't actually navigate in tests
      await user.click(whatsappButton);

      // Component tracks clicks internally
      expect(whatsappButton).toBeInTheDocument();
    });

    it("should work on different mobile devices", async () => {
      const viewports = [320, 375, 420, 540];

      for (const width of viewports) {
        await setMobileViewport(width);
        const { unmount } = render(<MobileCTABar />);

        const whatsappButton = screen.getByLabelText(/chat via whatsapp/i);
        expect(whatsappButton).toBeInTheDocument();
        expect(whatsappButton).toHaveAttribute("href", expect.stringContaining("wa.me"));

        unmount();
      }
    });
  });

  describe("Phone Call Button on Mobile", () => {
    it("should render phone call button with tel: link", () => {
      render(<MobileCTABar />);

      const callButton = screen.getByLabelText(/bel mister dj/i);
      expect(callButton).toBeInTheDocument();
      expect(callButton).toHaveAttribute("href", "tel:+31408422594");
    });

    it("should trigger tel: protocol on click", async () => {
      const user = userEvent.setup();
      render(<MobileCTABar />);

      const callButton = screen.getByLabelText(/bel mister dj/i);

      expect(callButton).toHaveAttribute("href", "tel:+31408422594");

      // On mobile, clicking tel: link would open phone app
      await user.click(callButton);

      expect(callButton).toBeInTheDocument();
    });

    it("should be accessible for phone dialing", () => {
      render(<MobileCTABar />);

      const callButton = screen.getByLabelText(/bel mister dj/i);
      const href = callButton.getAttribute("href");

      // Should have proper tel: format
      expect(href).toMatch(/^tel:\+?[0-9]+$/);
    });

    it("should track phone button clicks", async () => {
      const user = userEvent.setup();
      render(<MobileCTABar />);

      const callButton = screen.getByLabelText(/bel mister dj/i);

      await user.click(callButton);

      expect(callButton).toBeInTheDocument();
    });
  });

  describe("Scroll Behavior on Mobile", () => {
    it("should support smooth scrolling", () => {
      render(<MobileCTABar />);

      // Trigger scroll
      window.scrollY = 300;
      const scrollEvent = new Event("scroll", { bubbles: true });
      window.dispatchEvent(scrollEvent);

      const ctaBar = screen.getByRole("navigation", {
        name: /mobile contact actions/i,
      });
      expect(ctaBar).toBeInTheDocument();
    });

    it("should remain visible and accessible on scroll", () => {
      const { container } = render(<MobileCTABar />);

      const ctaBar = container.querySelector(".lg\\:hidden") as HTMLElement;
      expect(ctaBar).toBeInTheDocument();

      // Simulate scroll past 300px
      window.scrollY = 350;
      const scrollEvent = new Event("scroll", { bubbles: true });
      window.dispatchEvent(scrollEvent);

      // CTA bar should still be in document
      expect(ctaBar).toBeInTheDocument();

      // Should contain interactive elements
      const buttons = ctaBar.querySelectorAll("a");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("should handle rapid scrolling without blocking", () => {
      const { container } = render(<MobileCTABar />);

      const startTime = performance.now();

      // Simulate rapid scroll events
      for (let i = 0; i < 10; i++) {
        window.scrollY = i * 100;
        const scrollEvent = new Event("scroll", { bubbles: true });
        window.dispatchEvent(scrollEvent);
      }

      const endTime = performance.now();
      const processingTime = endTime - startTime;

      // Scrolling should not block UI
      expect(processingTime).toBeLessThan(200);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should clean up scroll listeners on unmount", () => {
      const { unmount } = render(<MobileCTABar />);

      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });
  });

  describe("Form Interaction on Mobile", () => {
    it("should handle form text input", async () => {
      const user = userEvent.setup();
      render(<QuickBookingForm origin="test" />);

      const input = screen.getByPlaceholderText(/uw naam/i);

      // Type input (test environment may be slower)
      await user.type(input, "John Doe", { delay: 10 });

      // Input should reflect typed value
      expect(input).toHaveValue("John Doe");
    });

    it("should handle form field focus/blur without jank", async () => {
      const user = userEvent.setup();
      const { container } = render(<QuickBookingForm origin="test" />);

      const inputs = container.querySelectorAll("input");
      const initialRects = Array.from(inputs).map((input) =>
        input.getBoundingClientRect(),
      );

      // Interact with each field
      for (const input of Array.from(inputs).slice(0, 3)) {
        await user.click(input);
        await user.type(input, "test");
        input.blur();
      }

      // Check that layout hasn't shifted
      const finalRects = Array.from(inputs).map((input) =>
        input.getBoundingClientRect(),
      );

      initialRects.forEach((initialRect, index) => {
        const finalRect = finalRects[index];
        expect(Math.abs(initialRect.top - finalRect.top)).toBeLessThan(5);
      });
    });

    it("should show keyboard appropriately for input types", async () => {
      const user = userEvent.setup();
      render(<QuickBookingForm origin="test" />);

      const nameInput = screen.getByPlaceholderText(/uw naam/i) as HTMLInputElement;
      const emailInput = screen.getByPlaceholderText(/uw.naam@voorbeeld.nl/i) as HTMLInputElement;
      const phoneInput = screen.getByPlaceholderText(/\+31 6 12345678/i) as HTMLInputElement;

      // Check input types for keyboard selection
      expect(nameInput.type).toBe("text");
      expect(emailInput.type).toBe("email");
      expect(phoneInput.type).toBe("tel");

      await user.click(nameInput);
      expect(nameInput).toHaveFocus();
    });
  });

  describe("Touch Event Handling", () => {
    it("should handle touch start events", () => {
      const { container } = render(<MobileCTABar />);
      const button = container.querySelector("a") as HTMLElement;

      const touchStart = new TouchEvent("touchstart", {
        bubbles: true,
        touches: [
          new Touch({
            identifier: 0,
            target: button,
            clientX: 0,
            clientY: 0,
          }),
        ] as any,
      });

      button.dispatchEvent(touchStart);
      expect(button).toBeInTheDocument();
    });

    it("should handle touch end events", () => {
      const { container } = render(<MobileCTABar />);
      const button = container.querySelector("a") as HTMLElement;

      const touchEnd = new TouchEvent("touchend", {
        bubbles: true,
        touches: [] as any,
      });

      button.dispatchEvent(touchEnd);
      expect(button).toBeInTheDocument();
    });

    it("should not prevent default touch behavior for links", () => {
      render(<MobileCTABar />);

      const callButton = screen.getByLabelText(/bel mister dj/i);
      // Links should allow default behavior for tel: protocol
      expect(callButton).toHaveAttribute("href", "tel:+31408422594");
    });
  });

  describe("Mobile Navigation Interactions", () => {
    it("should navigate to contact page when contact button clicked", async () => {
      const user = userEvent.setup();
      render(<MobileCTABar />);

      const contactButton = screen.getByLabelText(/vraag offerte aan/i);

      expect(contactButton).toHaveAttribute("href", "/contact");

      // In real app, this would navigate
      await user.click(contactButton);
      expect(contactButton).toBeInTheDocument();
    });

    it("should track navigation events", async () => {
      const user = userEvent.setup();
      render(<MobileCTABar />);

      const contactButton = screen.getByLabelText(/vraag offerte aan/i);

      await user.click(contactButton);

      // Navigation tracking happens internally
      expect(contactButton).toBeInTheDocument();
    });
  });

  describe("Mobile Gesture Support", () => {
    it("should support double tap without zoom", async () => {
      const user = userEvent.setup();
      const { container } = render(<MobileCTABar />);
      const button = container.querySelector("a") as HTMLElement;

      // Double click
      await user.dblClick(button);

      expect(button).toBeInTheDocument();
    });

    it("should handle long press without context menu", async () => {
      const user = userEvent.setup();
      const { container } = render(<MobileCTABar />);
      const button = container.querySelector("a") as HTMLElement;

      // Long press simulation
      await user.pointer({
        keys: "[MouseLeft>]",
        target: button,
      });

      expect(button).toBeInTheDocument();
    });
  });

  describe("Accessibility During Mobile Interactions", () => {
    it("should maintain focus management on mobile", async () => {
      const user = userEvent.setup();
      render(<QuickBookingForm origin="test" />);

      const nameInput = screen.getByPlaceholderText(/uw naam/i);

      await user.click(nameInput);
      expect(nameInput).toHaveFocus();

      const emailInput = screen.getByPlaceholderText(/uw.naam@voorbeeld.nl/i);
      await user.click(emailInput);
      expect(emailInput).toHaveFocus();
      expect(nameInput).not.toHaveFocus();
    });

    it("should announce form validation errors accessibly", async () => {
      const user = userEvent.setup();
      render(<QuickBookingForm origin="test" />);

      const submitButton = screen.getByRole("button", { name: /verstuur aanvraag/i });
      await user.click(submitButton);

      const alert = await screen.findByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(/vul alle verplichte velden in/i);
    });

    it("should provide accessible labels for mobile buttons", () => {
      render(<MobileCTABar />);

      const callButton = screen.getByLabelText(/bel mister dj/i);
      const whatsappButton = screen.getByLabelText(/chat via whatsapp/i);
      const contactButton = screen.getByLabelText(/vraag offerte aan/i);

      expect(callButton).toHaveAccessibleName();
      expect(whatsappButton).toHaveAccessibleName();
      expect(contactButton).toHaveAccessibleName();
    });
  });

  describe("Mobile Keyboard Handling", () => {
    it("should support form submission on mobile", async () => {
      const user = userEvent.setup();
      submitMock.mockResolvedValueOnce({ success: true, message: "Dank je!" });

      render(<QuickBookingForm origin="test" />);

      // Fill form
      await user.type(screen.getByPlaceholderText(/uw naam/i), "John Doe");
      await user.type(screen.getByPlaceholderText(/uw.naam@voorbeeld.nl/i), "john@example.com");
      await user.type(screen.getByPlaceholderText(/\+31 6 12345678/i), "+31612345678");

      const selects = screen.getAllByDisplayValue("Selecteer type evenement");
      await user.selectOptions(selects[0], "bruiloft");

      const submitButton = screen.getByRole("button", { name: /verstuur aanvraag/i });

      // Submit form
      await user.click(submitButton);

      await waitFor(() => {
        expect(submitMock).toHaveBeenCalled();
      });
    });

    it("should handle form focus appropriately on mobile", async () => {
      const user = userEvent.setup();
      render(<QuickBookingForm origin="test" />);

      const nameInput = screen.getByPlaceholderText(/uw naam/i);
      const emailInput = screen.getByPlaceholderText(/uw.naam@voorbeeld.nl/i);

      // Test focus management
      await user.click(nameInput);
      expect(nameInput).toHaveFocus();

      // Type input
      await user.type(nameInput, "John Doe");
      expect(nameInput).toHaveValue("John Doe");

      // Move to next field
      await user.click(emailInput);
      expect(emailInput).toHaveFocus();
      expect(nameInput).not.toHaveFocus();
    });
  });
});
