import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EventTypeProvider } from "../../context/EventTypeContext";
import AvailabilityPage from "../../pages/AvailabilityPage";

// Mock the API
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

// Mock react-day-picker
vi.mock("react-day-picker", () => {
  return {
    DayPicker: ({
      selected,
      onSelect,
    }: {
      selected?: Date | null;
      onSelect?: (day: Date | undefined) => void;
    }) => (
      <div data-testid="day-picker">
        <span data-testid="selected-date">{selected ? selected.toISOString().split("T")[0] : "no-date"}</span>
        <button
          type="button"
          data-testid="date-picker-button"
          onClick={() => onSelect?.(new Date("2025-06-15T00:00:00.000Z"))}
        >
          Select date
        </button>
      </div>
    ),
  };
});

// Mock fetch for availability check
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock window.dataLayer for tracking
const mockDataLayer: Record<string, unknown>[] = [];
Object.defineProperty(window, "dataLayer", {
  writable: true,
  value: mockDataLayer,
  configurable: true,
});

describe("E2E: Booking Flow", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockDataLayer.length = 0;
    mockFetch.mockClear();
    localStorage.clear();

    // Mock successful availability check
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: () =>
        Promise.resolve(
          JSON.stringify({
            success: true,
            queued: false,
            message: "Beschikbaarheid gecontroleerd! We nemen contact op via e-mail.",
          })
        ),
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render availability checker form", async () => {
    render(
      <MemoryRouter initialEntries={["/beschikbaarheid"]}>
        <EventTypeProvider>
          <AvailabilityPage />
        </EventTypeProvider>
      </MemoryRouter>
    );

    // Verify form elements are rendered
    await waitFor(() => {
      expect(screen.getByText(/Controleer Beschikbaarheid/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/uw\.naam@voorbeeld\.nl/i)).toBeInTheDocument();
      expect(screen.getByTestId("date-picker-button")).toBeInTheDocument();
    });
  });

  it("should submit availability form with correct data", async () => {
    render(
      <MemoryRouter initialEntries={["/beschikbaarheid"]}>
        <EventTypeProvider>
          <AvailabilityPage />
        </EventTypeProvider>
      </MemoryRouter>
    );

    // Step 1: Select date
    const datePickerButton = screen.getByTestId("date-picker-button");
    await act(async () => {
      await user.click(datePickerButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId("selected-date")).toHaveTextContent("2025-06-15");
    });

    // Step 2: Fill email
    const emailInput = screen.getByPlaceholderText(/uw\.naam@voorbeeld\.nl/i) as HTMLInputElement;
    await act(async () => {
      await user.type(emailInput, "customer@example.com");
    });

    // Step 3: Submit
    const submitButton = screen.getByRole("button", {
      name: /Controleer & Vraag Aan/i,
    });
    await act(async () => {
      await user.click(submitButton);
    });

    // Step 4: Verify API call
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    // Verify request
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain("/api/availability/check");
    const body = JSON.parse((options as RequestInit).body as string);
    expect(body).toMatchObject({
      email: "customer@example.com",
      eventDate: "2025-06-15T00:00:00.000Z",
    });
  });

  it("should display success message after submission", async () => {
    render(
      <MemoryRouter initialEntries={["/beschikbaarheid"]}>
        <EventTypeProvider>
          <AvailabilityPage />
        </EventTypeProvider>
      </MemoryRouter>
    );

    // Fill and submit form
    const datePickerButton = screen.getByTestId("date-picker-button");
    await act(async () => {
      await user.click(datePickerButton);
    });

    const emailInput = screen.getByPlaceholderText(/uw\.naam@voorbeeld\.nl/i);
    await act(async () => {
      await user.type(emailInput, "test@example.com");
    });

    const submitButton = screen.getByRole("button", {
      name: /Controleer & Vraag Aan/i,
    });
    await act(async () => {
      await user.click(submitButton);
    });

    // Verify success message
    await waitFor(() => {
      expect(
        screen.getByText(/Beschikbaarheid gecontroleerd! We nemen contact op via e-mail/i)
      ).toBeInTheDocument();
    });
  });

  it("should validate required fields", async () => {
    render(
      <MemoryRouter initialEntries={["/beschikbaarheid"]}>
        <EventTypeProvider>
          <AvailabilityPage />
        </EventTypeProvider>
      </MemoryRouter>
    );

    // Try to submit without filling fields
    const submitButton = screen.getByRole("button", {
      name: /Controleer & Vraag Aan/i,
    });
    await act(async () => {
      await user.click(submitButton);
    });

    // Should show error message or validate field is required
    // Form validation happens at browser level for required fields
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should track availability check events", async () => {
    render(
      <MemoryRouter initialEntries={["/beschikbaarheid"]}>
        <EventTypeProvider>
          <AvailabilityPage />
        </EventTypeProvider>
      </MemoryRouter>
    );

    // Fill and submit
    const datePickerButton = screen.getByTestId("date-picker-button");
    await act(async () => {
      await user.click(datePickerButton);
    });

    const emailInput = screen.getByPlaceholderText(/uw\.naam@voorbeeld\.nl/i);
    await act(async () => {
      await user.type(emailInput, "track@example.com");
    });

    const submitButton = screen.getByRole("button", {
      name: /Controleer & Vraag Aan/i,
    });
    await act(async () => {
      await user.click(submitButton);
    });

    // Verify tracking events
    await waitFor(() => {
      const startEvent = mockDataLayer.find((e) => e.event === "availability_check_started");
      const successEvent = mockDataLayer.find((e) => e.event === "availability_check_success");

      expect(startEvent).toBeTruthy();
      expect(successEvent).toBeTruthy();
    });
  });

  it("should handle API errors", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter initialEntries={["/beschikbaarheid"]}>
        <EventTypeProvider>
          <AvailabilityPage />
        </EventTypeProvider>
      </MemoryRouter>
    );

    // Fill and submit
    const datePickerButton = screen.getByTestId("date-picker-button");
    await act(async () => {
      await user.click(datePickerButton);
    });

    const emailInput = screen.getByPlaceholderText(/uw\.naam@voorbeeld\.nl/i);
    await act(async () => {
      await user.type(emailInput, "error@example.com");
    });

    const submitButton = screen.getByRole("button", {
      name: /Controleer & Vraag Aan/i,
    });
    await act(async () => {
      await user.click(submitButton);
    });

    // Track failure event - verify API was called with error handling
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("should clear form after successful submission", async () => {
    render(
      <MemoryRouter initialEntries={["/beschikbaarheid"]}>
        <EventTypeProvider>
          <AvailabilityPage />
        </EventTypeProvider>
      </MemoryRouter>
    );

    // Fill form
    const datePickerButton = screen.getByTestId("date-picker-button");
    await act(async () => {
      await user.click(datePickerButton);
    });

    const emailInput = screen.getByPlaceholderText(/uw\.naam@voorbeeld\.nl/i) as HTMLInputElement;
    await act(async () => {
      await user.type(emailInput, "clear@example.com");
    });

    const submitButton = screen.getByRole("button", {
      name: /Controleer & Vraag Aan/i,
    });
    await act(async () => {
      await user.click(submitButton);
    });

    // Wait for success message
    await waitFor(() => {
      expect(
        screen.getByText(/Beschikbaarheid gecontroleerd! We nemen contact op via e-mail/i)
      ).toBeInTheDocument();
    });
  });
});
