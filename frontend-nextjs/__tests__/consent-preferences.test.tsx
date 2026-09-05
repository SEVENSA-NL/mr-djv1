import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ConsentPreferences from '@/components/analytics/ConsentPreferences';
import { hasStatisticsConsent } from '@/lib/analytics/consent';

vi.mock('next-intl', () => ({
  useLocale: () => 'nl',
}));

describe('ConsentPreferences', () => {
  let stored: string | null;
  let getItem: ReturnType<typeof vi.spyOn>;
  let setItem: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    stored = '{"statistics":false,"marketing":true,"updatedAt":"2026-01-01T00:00:00.000Z"}';
    getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => stored);
    setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation((_, value) => {
      stored = value;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('grants, reopens, revokes, and preserves a valid marketing preference', async () => {
    render(<ConsentPreferences />);

    const trigger = screen.getByRole('button', { name: 'Cookie-instellingen' });
    fireEvent.click(trigger);
    expect(screen.getByRole('region', { name: 'Cookie-instellingen' })).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Statistieken toestaan' })).toHaveFocus()
    );

    fireEvent.click(screen.getByRole('button', { name: 'Statistieken toestaan' }));
    expect(JSON.parse(stored!)).toMatchObject({ statistics: true, marketing: true });

    fireEvent.click(screen.getByRole('button', { name: 'Statistieken intrekken' }));
    expect(JSON.parse(stored!)).toMatchObject({ statistics: false, marketing: true });

    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(trigger).toHaveFocus());
    fireEvent.click(trigger);
    expect(screen.getByText('Statistieken zijn uitgeschakeld.')).toBeInTheDocument();
  });

  it('keeps statistics disabled when saving fails', () => {
    setItem.mockImplementation(() => {
      throw new Error('storage unavailable');
    });
    render(<ConsentPreferences />);

    fireEvent.click(screen.getByRole('button', { name: 'Cookie-instellingen' }));
    fireEvent.click(screen.getByRole('button', { name: 'Statistieken toestaan' }));

    expect(screen.getByText('Instellingen konden niet worden opgeslagen. Statistieken blijven uit.')).toBeVisible();
    expect(hasStatisticsConsent()).toBe(false);
  });
});
