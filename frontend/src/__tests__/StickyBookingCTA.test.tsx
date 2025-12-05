import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import StickyBookingCTA from "../components/Generated/D3_1_20251016_060618";

const submitMock = vi.fn();
const resetMock = vi.fn();
const setEventTypeMock = vi.hoisted(() => vi.fn());
const useOptionalEventTypeMock = vi.hoisted(() => vi.fn());

vi.mock("../hooks/useBooking", () => ({
  __esModule: true,
  default: () => ({
    submit: submitMock,
    status: "idle",
    error: null,
    reset: resetMock,
  }),
}));

vi.mock("../context/EventTypeContext", () => ({
  __esModule: true,
  useOptionalEventType: (...args: unknown[]) => useOptionalEventTypeMock(...args),
}));

describe("StickyBookingCTA", () => {
  beforeEach(() => {
    submitMock.mockReset();
    resetMock.mockReset();
    setEventTypeMock.mockReset();
    useOptionalEventTypeMock.mockReset();
    useOptionalEventTypeMock.mockImplementation(() => undefined);
  });

  it("shows booking button initially", async () => {
    render(<StickyBookingCTA />);

    // Simulate scroll to trigger visibility
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 400, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /boek direct een dj/i })).toBeInTheDocument();
    });
  });

  it("opens form when button is clicked", async () => {
    render(<StickyBookingCTA />);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 400, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    const openButton = await screen.findByRole("button", { name: /boek direct een dj/i });
    await userEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/naam/i)).toBeInTheDocument();
    });
  });

  it("calls submit when form is submitted with valid data", async () => {
    submitMock.mockResolvedValueOnce({ success: true, message: "Bedankt voor je aanvraag!" });

    render(<StickyBookingCTA />);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 400, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    const openButton = await screen.findByRole("button", { name: /boek direct een dj/i });
    await userEvent.click(openButton);

    const nameField = await screen.findByLabelText(/naam/i);
    await userEvent.type(nameField, "Jane Doe");
    await userEvent.type(screen.getByLabelText(/e-mail/i), "jane@example.com");
    await userEvent.type(screen.getByLabelText(/telefoonnummer/i), "+31600000000");
    await userEvent.selectOptions(screen.getByLabelText(/type evenement/i), "bedrijfsfeest");

    const submitButton = screen.getByRole("button", { name: /verstuur aanvraag/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Jane Doe",
          email: "jane@example.com",
          phone: "+31600000000",
          eventType: "bedrijfsfeest",
          origin: "sticky-cta",
        })
      );
    });
  });
});
