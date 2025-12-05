import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const submitMock = vi.fn();
const resetMock = vi.fn();
const recordBookingCtaMock = vi.hoisted(() => vi.fn());

vi.mock("../hooks/useBooking", () => ({
  __esModule: true,
  default: () => ({
    submit: submitMock,
    status: "idle",
    error: null,
    reset: resetMock,
  }),
}));

vi.mock("../lib/ctaTracking", () => ({
  __esModule: true,
  recordBookingCta: recordBookingCtaMock,
}));

import ExitIntentPopup from "../components/Generated/MKT4_1_20251016_062601";

describe("ExitIntentPopup", () => {
  beforeEach(() => {
    localStorage.clear();
    submitMock.mockReset();
    resetMock.mockReset();
    recordBookingCtaMock.mockReset();
    recordBookingCtaMock.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows popup when mouse leaves viewport', async () => {
    render(<ExitIntentPopup />);

    act(() => {
      const event = new MouseEvent("mouseleave", { clientY: 0, bubbles: true });
      document.dispatchEvent(event);
    });

    await waitFor(() => {
      expect(screen.getByText(/special offer/i)).toBeInTheDocument();
    });
  });

  it('submits booking form with valid data', async () => {
    submitMock.mockResolvedValueOnce({ success: true, message: 'Top!' })

    render(<ExitIntentPopup />);

    act(() => {
      const event = new MouseEvent("mouseleave", { clientY: 0, bubbles: true });
      document.dispatchEvent(event);
    });

    const form = await waitFor(() => screen.getByTestId('exit-booking-form'))
    const formUtils = within(form)

    await userEvent.type(formUtils.getByLabelText(/naam/i), 'Lead User')
    await userEvent.type(formUtils.getByLabelText(/e-mail/i), 'lead@example.com')
    await userEvent.type(formUtils.getByLabelText(/telefoonnummer/i), '+31699999999')
    await userEvent.selectOptions(formUtils.getByLabelText(/type evenement/i), 'feest')

    const submitButton = formUtils.getByRole('button', { name: /verstuur aanvraag/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Lead User',
          email: 'lead@example.com',
          phone: '+31699999999',
          eventType: 'feest',
          origin: 'exit-intent-popup',
        })
      );
    });
  });
});
