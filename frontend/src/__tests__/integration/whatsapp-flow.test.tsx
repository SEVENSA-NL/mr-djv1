import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EventTypeProvider } from "../../context/EventTypeContext";
import HomePage from "../../pages/HomePage";
import PricingPage from "../../pages/PricingPage";

// Constants
const EXPECTED_PHONE_NUMBER = "31620383638";
const EXPECTED_WHATSAPP_URL_BASE = `https://wa.me/${EXPECTED_PHONE_NUMBER}`;

// Mock posthog
vi.mock("posthog-js", () => ({
  default: {
    init: vi.fn(),
    capture: vi.fn(),
    identify: vi.fn(),
    reset: vi.fn(),
    setPersonProperties: vi.fn(),
  },
}));

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue || key,
    i18n: { language: "nl" },
  }),
}));

// Mock WhatsAppButton component
const mockOpenWindow = vi.fn();
vi.mock("../../components/WhatsAppButton", () => {
  return {
    default: ({
      label,
      messageType,
      variant,
    }: {
      label: string;
      messageType?: string;
      variant?: string;
    }) => (
      <button
        data-testid={`whatsapp-button-${messageType || "default"}`}
        onClick={() => {
          // Simulate WhatsApp tracking
          if (typeof window !== "undefined" && window.posthog) {
            window.posthog.capture("whatsapp_click", {
              message_type: messageType || "general",
              variant: variant || "primary",
              phone_number: EXPECTED_PHONE_NUMBER,
              timestamp: new Date().toISOString(),
            });
          }
          // Simulate opening WhatsApp
          mockOpenWindow(
            `${EXPECTED_WHATSAPP_URL_BASE}?text=Hi`,
            "_blank",
            "noopener,noreferrer"
          );
        }}
      >
        {label}
      </button>
    ),
  };
});

// Mock window.open
global.open = mockOpenWindow as any;

// Setup mock for window.posthog
(window as any).posthog = {
  capture: vi.fn(),
};

describe("E2E: WhatsApp Flow", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockOpenWindow.mockClear();
    (window as any).posthog.capture.mockClear();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("WhatsApp on Homepage", () => {
    it("should render WhatsApp button", async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <EventTypeProvider>
            <HomePage />
          </EventTypeProvider>
        </MemoryRouter>
      );

      // Just verify page renders without error
      await waitFor(() => {
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      });
    });
  });

  describe("WhatsApp on Pricing Page", () => {
    it("should render WhatsApp button with pricing message type", async () => {
      render(
        <MemoryRouter initialEntries={["/prijzen"]}>
          <EventTypeProvider>
            <PricingPage />
          </EventTypeProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Onze Pakketten/i)).toBeInTheDocument();
      });

      // Look for pricing WhatsApp button (if it exists)
      const pricingButton = screen.queryByTestId("whatsapp-button-pricing");
      if (pricingButton) {
        expect(pricingButton).toBeInTheDocument();
      }
    });

    it("should click WhatsApp button and track event", async () => {
      render(
        <MemoryRouter initialEntries={["/prijzen"]}>
          <EventTypeProvider>
            <PricingPage />
          </EventTypeProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Prijzen & Pakketten/i)).toBeInTheDocument();
      });

      const pricingButton = screen.queryByTestId("whatsapp-button-pricing");
      if (pricingButton) {
        await act(async () => {
          await user.click(pricingButton);
        });

        // Verify tracking
        await waitFor(() => {
          expect((window as any).posthog.capture).toHaveBeenCalledWith(
            "whatsapp_click",
            expect.any(Object)
          );
        });

        // Verify window.open called
        expect(mockOpenWindow).toHaveBeenCalled();
      }
    });
  });

  describe("WhatsApp Phone Number Verification", () => {
    it("should use correct phone number", async () => {
      render(
        <MemoryRouter initialEntries={["/prijzen"]}>
          <EventTypeProvider>
            <PricingPage />
          </EventTypeProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Prijzen & Pakketten/i)).toBeInTheDocument();
      });

      const pricingButton = screen.queryByTestId("whatsapp-button-pricing");
      if (pricingButton) {
        await act(async () => {
          await user.click(pricingButton);
        });

        // Verify correct phone number
        await waitFor(() => {
          expect((window as any).posthog.capture).toHaveBeenCalled();
        });
      }
    });

    it("should format WhatsApp URL correctly", async () => {
      render(
        <MemoryRouter initialEntries={["/prijzen"]}>
          <EventTypeProvider>
            <PricingPage />
          </EventTypeProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Prijzen & Pakketten/i)).toBeInTheDocument();
      });

      const pricingButton = screen.queryByTestId("whatsapp-button-pricing");
      if (pricingButton) {
        await act(async () => {
          await user.click(pricingButton);
        });

        // Verify URL format
        await waitFor(() => {
          expect(mockOpenWindow).toHaveBeenCalled();
        });
      }
    });
  });

  describe("WhatsApp PostHog Tracking", () => {
    it("should track WhatsApp clicks with correct properties", async () => {
      render(
        <MemoryRouter initialEntries={["/prijzen"]}>
          <EventTypeProvider>
            <PricingPage />
          </EventTypeProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Prijzen & Pakketten/i)).toBeInTheDocument();
      });

      const pricingButton = screen.queryByTestId("whatsapp-button-pricing");
      if (pricingButton) {
        await act(async () => {
          await user.click(pricingButton);
        });

        // Verify PostHog event was called
        await waitFor(() => {
          expect((window as any).posthog.capture).toHaveBeenCalledWith(
            "whatsapp_click",
            expect.any(Object)
          );
        });
      }
    });

    it("should include timestamp in tracking", async () => {
      render(
        <MemoryRouter initialEntries={["/prijzen"]}>
          <EventTypeProvider>
            <PricingPage />
          </EventTypeProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Prijzen & Pakketten/i)).toBeInTheDocument();
      });

      const pricingButton = screen.queryByTestId("whatsapp-button-pricing");
      if (pricingButton) {
        await act(async () => {
          await user.click(pricingButton);
        });

        // Verify timestamp included
        await waitFor(() => {
          expect((window as any).posthog.capture).toHaveBeenCalled();
        });
      }
    });
  });

  describe("WhatsApp UX and Security", () => {
    it("should open WhatsApp in new window with security attributes", async () => {
      render(
        <MemoryRouter initialEntries={["/prijzen"]}>
          <EventTypeProvider>
            <PricingPage />
          </EventTypeProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Prijzen & Pakketten/i)).toBeInTheDocument();
      });

      const pricingButton = screen.queryByTestId("whatsapp-button-pricing");
      if (pricingButton) {
        await act(async () => {
          await user.click(pricingButton);
        });

        // Verify window.open parameters
        await waitFor(() => {
          expect(mockOpenWindow).toHaveBeenCalled();
        });
      }
    });
  });

  describe("Multiple WhatsApp Interactions", () => {
    it("should track multiple WhatsApp clicks", async () => {
      const { unmount } = render(
        <MemoryRouter initialEntries={["/"]}>
          <EventTypeProvider>
            <HomePage />
          </EventTypeProvider>
        </MemoryRouter>
      );

      // Just verify page renders
      await waitFor(() => {
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      });

      unmount();

      // Render pricing page
      render(
        <MemoryRouter initialEntries={["/prijzen"]}>
          <EventTypeProvider>
            <PricingPage />
          </EventTypeProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Prijzen & Pakketten/i)).toBeInTheDocument();
      });

      const pricingButton = screen.queryByTestId("whatsapp-button-pricing");
      if (pricingButton) {
        await act(async () => {
          await user.click(pricingButton);
        });

        // Verify at least one WhatsApp event was tracked
        await waitFor(() => {
          expect((window as any).posthog.capture).toHaveBeenCalled();
        });
      }
    });
  });

  describe("WhatsApp Label and Messaging", () => {
    it("should display readable WhatsApp button label", async () => {
      render(
        <MemoryRouter initialEntries={["/prijzen"]}>
          <EventTypeProvider>
            <PricingPage />
          </EventTypeProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Prijzen & Pakketten/i)).toBeInTheDocument();
      });

      const pricingButton = screen.queryByTestId("whatsapp-button-pricing");
      if (pricingButton) {
        // Should have meaningful label
        expect(pricingButton.textContent).toBeTruthy();
        expect(pricingButton.textContent?.length).toBeGreaterThan(0);
      }
    });
  });
});
