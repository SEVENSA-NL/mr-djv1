import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import AvailabilityForm from '@/components/booking/AvailabilityForm';
import { trackEvent } from '@/lib/analytics/trackEvent';

vi.mock('@/lib/analytics/trackEvent', () => ({
  trackEvent: vi.fn(),
}));

describe('AvailabilityForm analytics payload', () => {
  let getItem: ReturnType<typeof vi.spyOn>;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    getItem = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('{"statistics":true}');
    fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    vi.mocked(trackEvent).mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('keeps granted analytics payloads whitelisted while delivering the full lead', async () => {
    const { container } = render(<AvailabilityForm locale="nl" />);

    expect(screen.getByLabelText('Naam')).toHaveAttribute('name', 'name');
    expect(screen.getByLabelText('E-mail')).toHaveAttribute('name', 'email');
    expect(screen.getByLabelText('Telefoon')).toHaveAttribute('type', 'tel');
    expect(screen.getByLabelText('Telefoon')).toHaveAttribute('autocomplete', 'tel');
    expect(screen.getByLabelText('Event datum')).toHaveAttribute('name', 'date');
    expect(screen.getByLabelText('Type event')).toHaveAttribute('name', 'eventType');
    expect(screen.getByLabelText('Aantal gasten')).toHaveAttribute('name', 'guests');

    fireEvent.change(container.querySelector('[name="name"]')!, { target: { value: 'Test Naam' } });
    fireEvent.change(container.querySelector('[name="email"]')!, { target: { value: 'test@example.test' } });
    fireEvent.change(container.querySelector('[name="phone"]')!, { target: { value: '+31600000000' } });
    fireEvent.change(container.querySelector('[name="date"]')!, { target: { value: '2030-01-01' } });
    fireEvent.change(container.querySelector('[name="eventType"]')!, { target: { value: 'bruiloft' } });
    fireEvent.click(screen.getByRole('button', { name: 'Check beschikbaarheid' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());

    expect(trackEvent).toHaveBeenCalledWith('availability_check_started', {
      locale: 'nl',
      eventType: 'bruiloft',
      guests: 100,
      ga4_event: 'availability_check_started',
    });
    expect(JSON.stringify(vi.mocked(trackEvent).mock.calls)).not.toContain('test@example.test');
    expect(JSON.stringify(vi.mocked(trackEvent).mock.calls)).not.toContain('+31600000000');
    expect(JSON.stringify(vi.mocked(trackEvent).mock.calls)).not.toContain('2030-01-01');

    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      name: 'Test Naam',
      email: 'test@example.test',
      phone: '+31600000000',
      date: '2030-01-01',
      analyticsConsent: true,
    });
    expect(screen.getByRole('status')).toHaveTextContent('We nemen binnen 24 uur contact met je op.');
  });

  it('announces a failed request as an alert', async () => {
    fetchMock.mockRejectedValueOnce(new Error('offline'));
    const { container } = render(<AvailabilityForm locale="en" />);

    fireEvent.change(container.querySelector('[name="name"]')!, { target: { value: 'Test Name' } });
    fireEvent.change(container.querySelector('[name="email"]')!, { target: { value: 'test@example.test' } });
    fireEvent.change(container.querySelector('[name="phone"]')!, { target: { value: '+31600000000' } });
    fireEvent.change(container.querySelector('[name="date"]')!, { target: { value: '2030-01-01' } });
    fireEvent.change(container.querySelector('[name="eventType"]')!, { target: { value: 'bruiloft' } });
    fireEvent.click(screen.getByRole('button', { name: 'Check availability' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong. Please try again.');
  });
});
