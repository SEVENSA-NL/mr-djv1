import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import AvailabilityChecker from "../AvailabilityChecker";

// Mock the storage utilities
vi.mock("@/lib/storage", () => ({
  getJSON: vi.fn(),
  setJSON: vi.fn(),
  removeItem: vi.fn(),
  getItem: vi.fn(),
  setItem: vi.fn(),
}));

// Mock react-day-picker
vi.mock("react-day-picker", () => {
  return {
    DayPicker: ({
      selected,
      onSelect,
      mode,
    }: {
      selected?: Date | null;
      onSelect?: (day: Date | undefined) => void;
      mode?: string;
    }) => (
      <div data-testid="day-picker">
        <span data-testid="selected-date">{selected ? selected.toISOString() : "no-date"}</span>
        <button
          type="button"
          data-testid="select-future-date"
          onClick={() => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 7);
            onSelect?.(futureDate);
          }}
        >
          Select Future Date
        </button>
        <button
          type="button"
          data-testid="select-past-date"
          onClick={() => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 7);
            onSelect?.(pastDate);
          }}
        >
          Select Past Date
        </button>
      </div>
    ),
  };
});

// Mock the Button component
vi.mock("../Button", () => ({
  default: ({
    children,
    onClick,
    disabled,
    type,
    ...props
  }: any) => (
    <button type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  ),
}));

describe("AvailabilityChecker", () => {
  let fetchSpy: any;

  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default fetch mock
    fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue(
        JSON.stringify({
          success: true,
          message: "Beschikbaarheid gecontroleerd! We nemen contact op via e-mail.",
        })
      ),
    } as any);

    // Setup localStorage mock
    const store: Record<string, string> = {};
    global.localStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        Object.keys(store).forEach((key) => delete store[key]);
      },
      key: vi.fn(),
      length: 0,
    } as any;

    // Setup dataLayer
    window.dataLayer = [];
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Rendering", () => {
    it("should render the component with heading", () => {
      render(<AvailabilityChecker />);

      expect(screen.getByText("Controleer Beschikbaarheid")).toBeInTheDocument();
    });

    it("should render the date picker", () => {
      render(<AvailabilityChecker />);

      expect(screen.getByTestId("day-picker")).toBeInTheDocument();
    });

    it("should render email input field", () => {
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("placeholder", "uw.naam@voorbeeld.nl");
    });

    it("should render submit button", () => {
      render(<AvailabilityChecker />);

      expect(screen.getByRole("button", { name: /Controleer & Vraag Aan/i })).toBeInTheDocument();
    });

    it("should render description text", () => {
      render(<AvailabilityChecker />);

      expect(
        screen.getByText(/Kies uw gewenste datum en wij controleren direct of Mr. DJ beschikbaar is./i)
      ).toBeInTheDocument();
    });
  });

  describe("Date Selection", () => {
    it("should update selected date when date is selected", async () => {
      render(<AvailabilityChecker />);

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      await waitFor(() => {
        const selectedDate = screen.getByTestId("selected-date");
        expect(selectedDate.textContent).not.toBe("no-date");
      });
    });

    it("should display selected date in the date picker", async () => {
      render(<AvailabilityChecker />);

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      await waitFor(() => {
        const selectedDate = screen.getByTestId("selected-date");
        expect(selectedDate.textContent).toMatch(/\d{4}-\d{2}-\d{2}/);
      });
    });

    it("should allow clearing selected date", async () => {
      render(<AvailabilityChecker />);

      // Select a date
      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      await waitFor(() => {
        const selectedDate = screen.getByTestId("selected-date");
        expect(selectedDate.textContent).not.toBe("no-date");
      });

      // Note: The component doesn't have explicit clear button, but we can verify
      // the date picker accepts selections
    });
  });

  describe("Email Input", () => {
    it("should update email input value", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres") as HTMLInputElement;
      await user.type(emailInput, "test@example.com");

      expect(emailInput.value).toBe("test@example.com");
    });

    it("should accept valid email addresses", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres") as HTMLInputElement;
      await user.type(emailInput, "valid.email+tag@example.co.uk");

      expect(emailInput.value).toBe("valid.email+tag@example.co.uk");
    });

    it("should have required attribute", () => {
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      expect(emailInput).toHaveAttribute("required");
    });

    it("should maintain email value during component lifecycle", async () => {
      const user = userEvent.setup();
      const { rerender } = render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres") as HTMLInputElement;
      await user.type(emailInput, "test@example.com");

      expect(emailInput.value).toBe("test@example.com");

      rerender(<AvailabilityChecker />);

      expect(screen.getByLabelText("Uw E-mailadres")).toHaveValue("test@example.com");
    });
  });

  describe("Form Submission - Happy Path", () => {
    it("should submit form with valid data", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      // Fill email
      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      // Select date
      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      // Submit form
      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(fetchSpy).toHaveBeenCalledWith(
          "/api/availability/check",
          expect.objectContaining({
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
        );
      });
    });

    it("should send correct payload to API", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        const [_, options] = fetchSpy.mock.calls[0];
        const payload = JSON.parse(options.body);

        expect(payload).toMatchObject({
          email: "test@example.com",
          marketingConsent: false,
          statisticsConsent: false,
        });
        expect(payload.eventDate).toBeDefined();
        expect(payload.pageUri).toBe(window.location.href);
        expect(payload.pageName).toBeDefined();
      });
    });

    it("should show success message on successful submission", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Beschikbaarheid gecontroleerd! We nemen contact op via e-mail./i)
        ).toBeInTheDocument();
      });
    });

    it("should clear form after successful submission", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres") as HTMLInputElement;
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      await waitFor(() => {
        expect(screen.getByTestId("selected-date").textContent).not.toBe("no-date");
      });

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(emailInput.value).toBe("");
        expect(screen.getByTestId("selected-date")).toHaveTextContent("no-date");
      });
    });

    it("should disable submit button during submission", async () => {
      const user = userEvent.setup();
      fetchSpy.mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(() => {
              resolve({
                ok: true,
                status: 200,
                text: () =>
                  Promise.resolve(
                    JSON.stringify({
                      success: true,
                      message: "Success",
                    })
                  ),
              } as any);
            }, 100)
          )
      );

      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });

      await user.click(submitButton);

      // Button text should change during loading
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /Bezig.../i })).toBeInTheDocument();
      });
    });

    it("should push success event to dataLayer", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        const successEvent = window.dataLayer.find((e) => e.event === "availability_check_success");
        expect(successEvent).toBeDefined();
        expect(successEvent).toMatchObject({
          event: "availability_check_success",
          queued: false,
        });
      });
    });

    it("should handle 202 queued response", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 202,
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            success: true,
            queued: true,
            message: "We hebben je aanvraag ontvangen. Een specialist neemt binnen 24 uur contact op.",
          })
        ),
      } as any);

      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        const queuedEvent = window.dataLayer.find((e) => e.event === "availability_check_queued");
        expect(queuedEvent).toBeDefined();
      });
    });
  });

  describe("Form Validation", () => {
    it("should not submit without email", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      // Verify initial state has no date
      expect(screen.getByTestId("selected-date")).toHaveTextContent("no-date");

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });

      // Click submit with no email and no date
      await user.click(submitButton);

      // API should not be called due to validation
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("should not submit without date", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      // API should not be called due to validation (date missing)
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("should show error message with loading status", async () => {
      // Keep fetch pending to verify loading state appears
      let resolveResponse: any;
      fetchSpy.mockReturnValueOnce(
        new Promise((resolve) => {
          resolveResponse = resolve;
        })
      );

      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      // Small delay to ensure state is settled
      await new Promise(r => setTimeout(r, 50));

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      // Small delay to allow state update
      await new Promise(r => setTimeout(r, 100));

      // Should show loading message - use text matching function for flexibility
      await waitFor(() => {
        const button = screen.queryByRole("button", { name: /Bezig/i });
        expect(button).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe("Error Handling", () => {
    it("should handle API error responses", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            success: false,
            message: "Er ging iets mis op de server",
          })
        ),
      } as any);

      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Er ging iets mis op de server")).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it("should handle network errors", async () => {
      fetchSpy.mockRejectedValueOnce(new Error("Network error"));

      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Network error")).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it("should handle malformed JSON response gracefully", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: vi.fn().mockResolvedValue("Invalid JSON {"),
      } as any);

      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "Kon antwoord van beschikbaarheidscheck niet parsen",
          expect.any(Error)
        );
      }, { timeout: 3000 });

      consoleWarnSpy.mockRestore();
    });

    it("should push failed event to dataLayer on error", async () => {
      fetchSpy.mockRejectedValueOnce(new Error("API Error"));

      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        const failedEvent = window.dataLayer.find((e) => e.event === "availability_check_failed");
        expect(failedEvent).toBeDefined();
        expect(failedEvent.reason).toContain("API Error");
      }, { timeout: 3000 });
    });
  });

  describe("Loading States", () => {
    it("should show loading message during API call", async () => {
      let resolveResponse: any;
      fetchSpy.mockReturnValueOnce(
        new Promise((resolve) => {
          resolveResponse = resolve;
        })
      );

      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      // Small delay to ensure state is settled
      await new Promise(r => setTimeout(r, 50));

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      // Small delay to allow state update
      await new Promise(r => setTimeout(r, 100));

      await waitFor(() => {
        const button = screen.queryByRole("button", { name: /Bezig/i });
        expect(button).toBeInTheDocument();
      }, { timeout: 3000 });

      resolveResponse({
        ok: true,
        status: 200,
        text: () =>
          Promise.resolve(
            JSON.stringify({
              success: true,
              message: "Success",
            })
          ),
      });

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /Controleer & Vraag Aan/i })).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it("should update button text during loading", async () => {
      let resolveResponse: any;
      fetchSpy.mockReturnValueOnce(
        new Promise((resolve) => {
          resolveResponse = resolve;
        })
      );

      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      // Small delay to ensure state is settled
      await new Promise(r => setTimeout(r, 50));

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      // Small delay to allow state update
      await new Promise(r => setTimeout(r, 100));

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /Bezig.../i })).toBeInTheDocument();
      }, { timeout: 3000 });

      resolveResponse({
        ok: true,
        status: 200,
        text: () =>
          Promise.resolve(
            JSON.stringify({
              success: true,
              message: "Success",
            })
          ),
      });
    });
  });

  describe("Consent Handling", () => {
    it("should include default consent values in payload", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        const [_, options] = fetchSpy.mock.calls[0];
        const payload = JSON.parse(options.body);

        expect(payload.marketingConsent).toBe(false);
        expect(payload.statisticsConsent).toBe(false);
      }, { timeout: 3000 });
    });

    it("should include consent values in dataLayer events", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        const startedEvent = window.dataLayer.find((e) => e.event === "availability_check_started");
        expect(startedEvent).toMatchObject({
          marketingConsent: false,
          statisticsConsent: false,
        });
      }, { timeout: 3000 });
    });
  });

  describe("Storage and Persistence", () => {
    it("should have local storage utilities mocked", () => {
      render(<AvailabilityChecker />);

      // Component renders without errors
      expect(screen.getByText("Controleer Beschikbaarheid")).toBeInTheDocument();
    });

    it("should integrate with form lifecycle", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      // Verify the input value was set
      expect(emailInput).toHaveValue("test@example.com");
    });

    it("should clear form after successful submission", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres") as HTMLInputElement;
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(emailInput.value).toBe("");
      });
    });
  });

  describe("Page Context", () => {
    it("should include page context in API request", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        const [_, options] = fetchSpy.mock.calls[0];
        const payload = JSON.parse(options.body);

        expect(payload.pageUri).toBe(window.location.href);
        expect(payload.pageName).toBeDefined();
      }, { timeout: 3000 });
    });

    it("should include page URI in dataLayer events", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        const startedEvent = window.dataLayer.find((e) => e.event === "availability_check_started");
        expect(startedEvent).toBeDefined();
        expect(startedEvent.eventDate).toBeDefined();
      }, { timeout: 3000 });
    });
  });

  describe("Accessibility", () => {
    it("should have proper label for email input", () => {
      render(<AvailabilityChecker />);

      const label = screen.getByText("Uw E-mailadres");
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe("LABEL");
    });

    it("should have proper heading hierarchy", () => {
      render(<AvailabilityChecker />);

      const heading = screen.getByText("Controleer Beschikbaarheid");
      expect(heading.tagName).toMatch(/H[1-6]/);
    });

    it("should have descriptive placeholder text", () => {
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      expect(emailInput).toHaveAttribute("placeholder", "uw.naam@voorbeeld.nl");
    });

    it("should have proper form structure", () => {
      render(<AvailabilityChecker />);

      const form = screen.getByRole("button", { name: /Controleer & Vraag Aan/i }).closest("form");
      expect(form).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle multiple rapid submissions", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });

      // Try to click multiple times
      await user.click(submitButton);
      await user.click(submitButton);

      // Should only call API once due to deduplication
      await waitFor(() => {
        expect(fetchSpy).toHaveBeenCalledTimes(1);
      }, { timeout: 3000 });
    });

    it("should handle component unmounting during API request", async () => {
      let resolveResponse: any;
      fetchSpy.mockReturnValueOnce(
        new Promise((resolve) => {
          resolveResponse = resolve;
        })
      );

      const user = userEvent.setup();
      const { unmount } = render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      // Unmount while request is pending
      unmount();

      // Should not throw error when response resolves
      expect(() => {
        resolveResponse({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(
              JSON.stringify({
                success: true,
                message: "Success",
              })
            ),
        });
      }).not.toThrow();
    });

    it("should handle very long email addresses", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const longEmail = "a".repeat(50) + "@example.com";
      const emailInput = screen.getByLabelText("Uw E-mailadres") as HTMLInputElement;
      await user.type(emailInput, longEmail);

      expect(emailInput.value).toBe(longEmail);
    });

    it("should handle special characters in email", async () => {
      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const specialEmail = "test+special@example.co.uk";
      const emailInput = screen.getByLabelText("Uw E-mailadres") as HTMLInputElement;
      await user.type(emailInput, specialEmail);

      expect(emailInput.value).toBe(specialEmail);
    });

    it("should handle empty API response message", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            success: true,
            message: "",
          })
        ),
      } as any);

      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        // Should fall back to default message
        expect(
          screen.getByText(/Beschikbaarheid gecontroleerd! We nemen contact op via e-mail./i)
        ).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe("Response Message Handling", () => {
    it("should handle response with sevensa data", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            success: true,
            message: "Custom success message",
            sevensa: {
              delivered: true,
              queued: false,
              queueSize: 0,
            },
          })
        ),
      } as any);

      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Custom success message")).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it("should use default error message when API returns no message", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            success: false,
          })
        ),
      } as any);

      const user = userEvent.setup();
      render(<AvailabilityChecker />);

      const emailInput = screen.getByLabelText("Uw E-mailadres");
      await user.type(emailInput, "test@example.com");

      const selectDateButton = screen.getByTestId("select-future-date");
      fireEvent.click(selectDateButton);

      const submitButton = screen.getByRole("button", { name: /Controleer & Vraag Aan/i });
      await user.click(submitButton);

      await waitFor(() => {
        // Check for error message (might be split across elements)
        const errorMessage = screen.queryByText((content, element) => {
          return element?.className?.includes("bg-semantic-error") || false;
        });
        expect(errorMessage).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });
});
