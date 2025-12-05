import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { PriceCalculator } from '../PriceCalculator';
import { PACKAGES, ADD_ONS } from '../../../data/pricing';

// Mock window.location
delete (window as any).location;
window.location = { href: '' } as any;

// Mock PostHog
const mockPostHog = {
  capture: vi.fn(),
};

describe('PriceCalculator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPostHog.capture.mockClear();
    (window as any).posthog = mockPostHog;
  });

  afterEach(() => {
    delete (window as any).posthog;
  });

  describe('Renders correctly', () => {
    it('should render the component with default state', () => {
      render(<PriceCalculator />);

      expect(screen.getByText(/Prijs Calculator/i)).toBeInTheDocument();
      expect(screen.getByText(/Bereken direct wat jouw feest gaat kosten/i)).toBeInTheDocument();
    });

    it('should display default guest count of 100', () => {
      render(<PriceCalculator />);

      const guestCountLabel = screen.getByText(/Aantal Gasten:/i);
      expect(guestCountLabel).toHaveTextContent('100');
    });

    it('should display all package options', () => {
      render(<PriceCalculator />);

      PACKAGES.forEach((pkg) => {
        expect(screen.getByText(pkg.name)).toBeInTheDocument();
        expect(screen.getAllByText(new RegExp(`€${pkg.basePrice}`))).toBeTruthy();
      });
    });

    it('should display all add-on options', () => {
      render(<PriceCalculator />);

      ADD_ONS.forEach((addon) => {
        expect(screen.getByText(addon.name)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(`\\+€${addon.price}`))).toBeInTheDocument();
      });
    });

    it('should have the default package selected (Zilver)', () => {
      render(<PriceCalculator />);

      const zilverButton = Array.from(screen.getAllByRole('button')).find(
        (btn) => btn.textContent?.includes('Zilver Pakket')
      );

      expect(zilverButton?.className).toContain('packageSelected');
    });

    it('should match the snapshot', () => {
      const { container } = render(<PriceCalculator />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Guest count slider functionality', () => {
    it('should update guest count when slider changes', async () => {
      render(<PriceCalculator />);

      const slider = screen.getByRole('slider') as HTMLInputElement;
      expect(slider).toHaveValue('100');

      fireEvent.change(slider, { target: { value: '150' } });

      await waitFor(() => {
        expect(slider).toHaveValue('150');
        const guestCountLabel = screen.getByText(/Aantal Gasten:/i);
        expect(guestCountLabel).toHaveTextContent('150');
      });
    });

    it('should respect min value of 20', async () => {
      render(<PriceCalculator />);

      const slider = screen.getByRole('slider') as HTMLInputElement;
      expect(slider).toHaveAttribute('min', '20');
    });

    it('should respect max value of 300', async () => {
      render(<PriceCalculator />);

      const slider = screen.getByRole('slider') as HTMLInputElement;
      expect(slider).toHaveAttribute('max', '300');
    });

    it('should have step of 10', async () => {
      render(<PriceCalculator />);

      const slider = screen.getByRole('slider') as HTMLInputElement;
      expect(slider).toHaveAttribute('step', '10');
    });

    it('should display recommendations based on guest count', async () => {
      render(<PriceCalculator />);

      const slider = screen.getByRole('slider');

      // For 60 guests (less than 80), should recommend Brons
      fireEvent.change(slider, { target: { value: '60' } });

      await waitFor(() => {
        // Check that recommendation paragraph contains both "Brons Pakket" and "aan"
        const recommendations = screen.queryAllByText(/Tip:/i);
        const bronsRecommendation = recommendations.find(
          (el) => el.textContent?.includes('Brons Pakket') && el.textContent?.includes('aan')
        );
        expect(bronsRecommendation).toBeInTheDocument();
      });

      // For 120 guests (80-150), should recommend Zilver (but already selected)
      fireEvent.change(slider, { target: { value: '120' } });

      // For 200 guests (more than 150), should recommend Goud
      fireEvent.change(slider, { target: { value: '200' } });

      await waitFor(() => {
        // Check that recommendation paragraph contains both "Goud Pakket" and "aan"
        const recommendations = screen.queryAllByText(/Tip:/i);
        const goudRecommendation = recommendations.find(
          (el) => el.textContent?.includes('Goud Pakket') && el.textContent?.includes('aan')
        );
        expect(goudRecommendation).toBeInTheDocument();
      });
    });
  });

  describe('Package selection', () => {
    it('should select different packages', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      // Find and click Brons package
      const buttons = screen.getAllByRole('button');
      const bronsButton = buttons.find((btn) => btn.textContent?.includes('Brons Pakket'));

      await user.click(bronsButton!);

      expect(bronsButton?.className).toContain('packageSelected');

      // Verify PostHog tracking
      expect(mockPostHog.capture).toHaveBeenCalledWith('price_calculator_package_change', {
        package_id: 'brons',
        timestamp: expect.any(String),
      });
    });

    it('should update total price when package changes', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      // Initial total should be Zilver price (1350)
      expect(screen.getAllByText(new RegExp('€1350'))).toBeTruthy();

      // Click Brons (850)
      const buttons = screen.getAllByRole('button');
      const bronsButton = buttons.find((btn) => btn.textContent?.includes('Brons Pakket'));
      await user.click(bronsButton!);

      await waitFor(() => {
        expect(screen.getAllByText(new RegExp('€850'))).toBeTruthy();
      });

      // Click Goud (2000)
      const goudButton = buttons.find((btn) => btn.textContent?.includes('Goud Pakket'));
      await user.click(goudButton!);

      await waitFor(() => {
        expect(screen.getAllByText(new RegExp('€2000'))).toBeTruthy();
      });
    });

    it('should show recommended badge on Zilver package', () => {
      render(<PriceCalculator />);

      expect(screen.getAllByText(/POPULAIR/)).toBeTruthy();
    });
  });

  describe('Add-on selection and price calculation', () => {
    it('should toggle add-ons', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      const checkboxes = screen.getAllByRole('checkbox');
      const ledFloorCheckbox = checkboxes[0];

      expect(ledFloorCheckbox).not.toBeChecked();

      await user.click(ledFloorCheckbox);

      await waitFor(() => {
        expect(ledFloorCheckbox).toBeChecked();
      });

      await user.click(ledFloorCheckbox);

      await waitFor(() => {
        expect(ledFloorCheckbox).not.toBeChecked();
      });
    });

    it('should track add-on toggle in PostHog', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      const checkboxes = screen.getAllByRole('checkbox');
      const ledFloorCheckbox = checkboxes[0];

      await user.click(ledFloorCheckbox);

      await waitFor(() => {
        expect(mockPostHog.capture).toHaveBeenCalledWith('price_calculator_addon_toggle', {
          addon_id: 'led-floor',
          action: 'added',
          timestamp: expect.any(String),
        });
      });

      await user.click(ledFloorCheckbox);

      await waitFor(() => {
        expect(mockPostHog.capture).toHaveBeenCalledWith('price_calculator_addon_toggle', {
          addon_id: 'led-floor',
          action: 'removed',
          timestamp: expect.any(String),
        });
      });
    });

    it('should update total price when add-ons are selected', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      const basePrice = 1350; // Zilver package
      expect(screen.getAllByText(new RegExp(`€${basePrice}`))).toBeTruthy();

      // Select LED floor (+450)
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);

      await waitFor(() => {
        expect(screen.getByText(`€${basePrice + 450}`)).toBeInTheDocument();
      });

      // Select Photobooth (+350)
      await user.click(checkboxes[1]);

      await waitFor(() => {
        expect(screen.getByText(`€${basePrice + 450 + 350}`)).toBeInTheDocument();
      });

      // Deselect LED floor
      await user.click(checkboxes[0]);

      await waitFor(() => {
        expect(screen.getByText(`€${basePrice + 350}`)).toBeInTheDocument();
      });
    });

    it('should calculate correct total with multiple add-ons', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      // Select all add-ons
      const checkboxes = screen.getAllByRole('checkbox');
      for (const checkbox of checkboxes) {
        await user.click(checkbox);
      }

      const totalAddonPrice = ADD_ONS.reduce((sum, addon) => sum + addon.price, 0);
      const expectedTotal = 1350 + totalAddonPrice; // Zilver + all add-ons

      await waitFor(() => {
        expect(screen.getByText(`€${expectedTotal}`)).toBeInTheDocument();
      });
    });

    it('should show popular badge on popular add-ons', () => {
      render(<PriceCalculator />);

      const popularBadges = screen.getAllByText(/POPULAIR/);
      // 1 for Zilver package + popular add-ons
      expect(popularBadges.length).toBeGreaterThan(1);
    });
  });

  describe('Total price display and breakdown', () => {
    it('should display package price in breakdown', () => {
      render(<PriceCalculator />);

      const breakdownText = screen.getByText(/Pakket.*Zilver Pakket/);
      expect(breakdownText).toBeInTheDocument();
      expect(screen.getAllByText(new RegExp('€1350'))).toBeTruthy();
    });

    it('should show breakdown lines for selected add-ons', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]); // LED floor

      await waitFor(() => {
        expect(screen.getAllByText('LED Dansvloer')).toBeTruthy();
      });
    });

    it('should display total in main total line', () => {
      render(<PriceCalculator />);

      expect(screen.getByText(/Totaal:/)).toBeInTheDocument();
      expect(screen.getAllByText(new RegExp('€1350'))).toBeTruthy();
    });

    it('should display disclaimer text', () => {
      render(<PriceCalculator />);

      expect(
        screen.getByText(/Prijzen zijn indicatief en exclusief BTW/i)
      ).toBeInTheDocument();
    });
  });

  describe('CTA button and navigation', () => {
    it('should display get quote button', () => {
      render(<PriceCalculator />);

      expect(screen.getByText(/Offerte Aanvragen voor €/i)).toBeInTheDocument();
    });

    it('should navigate to contact page with query params on get quote', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      const button = screen.getByText(/Offerte Aanvragen voor €/i);
      await user.click(button);

      expect(mockPostHog.capture).toHaveBeenCalledWith('price_calculator_get_quote', {
        package_id: 'zilver',
        guest_count: 100,
        addons: [],
        total_price: 1350,
        timestamp: expect.any(String),
      });

      // Check navigation parameters - use + or %20 for space
      expect(window.location.href).toContain('/contact?');
      expect(window.location.href).toMatch(/package=Zilver[\+%20]Pakket/);
      expect(window.location.href).toContain('guests=100');
      expect(window.location.href).toContain('total=1350');
    });

    it('should include selected package and add-ons in quote navigation', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      // Select Brons package
      const buttons = screen.getAllByRole('button');
      const bronsButton = buttons.find((btn) => btn.textContent?.includes('Brons Pakket'));
      await user.click(bronsButton!);

      // Select LED floor
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]);

      // Change guest count
      const slider = screen.getByRole('slider') as HTMLInputElement;
      fireEvent.change(slider, { target: { value: '150' } });

      // Get quote
      const button = screen.getByText(/Offerte Aanvragen voor €/i);
      await user.click(button);

      expect(mockPostHog.capture).toHaveBeenCalledWith('price_calculator_get_quote', {
        package_id: 'brons',
        guest_count: 150,
        addons: ['led-floor'],
        total_price: 1300, // 850 + 450
        timestamp: expect.any(String),
      });

      expect(window.location.href).toMatch(/package=Brons[\+%20]Pakket/);
      expect(window.location.href).toContain('guests=150');
      expect(window.location.href).toContain('total=1300');
    });
  });

  describe('PostHog event tracking', () => {
    it('should track package change event', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      const buttons = screen.getAllByRole('button');
      const goudButton = buttons.find((btn) => btn.textContent?.includes('Goud Pakket'));
      await user.click(goudButton!);

      expect(mockPostHog.capture).toHaveBeenCalledWith('price_calculator_package_change', {
        package_id: 'goud',
        timestamp: expect.any(String),
      });
    });

    it('should track add-on toggle events with correct action', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      const checkboxes = screen.getAllByRole('checkbox');

      // Add action
      await user.click(checkboxes[0]);
      expect(mockPostHog.capture).toHaveBeenCalledWith('price_calculator_addon_toggle', {
        addon_id: 'led-floor',
        action: 'added',
        timestamp: expect.any(String),
      });

      // Remove action
      await user.click(checkboxes[0]);
      expect(mockPostHog.capture).toHaveBeenCalledWith('price_calculator_addon_toggle', {
        addon_id: 'led-floor',
        action: 'removed',
        timestamp: expect.any(String),
      });
    });

    it('should track quote request with all data', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      // Set up specific scenario
      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '80' } });

      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]); // LED floor
      await user.click(checkboxes[1]); // Photobooth

      const button = screen.getByText(/Offerte Aanvragen voor €/i);
      await user.click(button);

      expect(mockPostHog.capture).toHaveBeenCalledWith('price_calculator_get_quote', {
        package_id: 'zilver',
        guest_count: 80,
        addons: ['led-floor', 'photobooth'],
        total_price: 2150, // 1350 + 450 + 350
        timestamp: expect.any(String),
      });
    });

    it('should not throw error when PostHog is not available', async () => {
      const user = userEvent.setup();
      delete (window as any).posthog;

      render(<PriceCalculator />);

      const buttons = screen.getAllByRole('button');
      const bronsButton = buttons.find((btn) => btn.textContent?.includes('Brons Pakket'));

      expect(() => user.click(bronsButton!)).not.toThrow();
    });
  });

  describe('Mobile responsive layout', () => {
    it('should render slider control with proper styling', () => {
      const { container } = render(<PriceCalculator />);

      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();

      // Check that slider has a parent section element
      expect(slider.closest('div')).toBeInTheDocument();
    });

    it('should display slider labels', () => {
      render(<PriceCalculator />);

      expect(screen.getByText('20')).toBeInTheDocument();
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText('300+')).toBeInTheDocument();
    });

    it('should have all sections rendered', () => {
      render(<PriceCalculator />);

      // Check section titles
      expect(screen.getByText(/Aantal Gasten:/i)).toBeInTheDocument();
      expect(screen.getByText(/Kies je pakket:/i)).toBeInTheDocument();
      expect(screen.getByText(/Extra's toevoegen:/i)).toBeInTheDocument();
    });

    it('should render CTA button with proper accessibility', () => {
      render(<PriceCalculator />);

      const ctaButton = screen.getByRole('button', {
        name: /Offerte Aanvragen voor €/i,
      });

      expect(ctaButton).toHaveAttribute('type', 'button');
      expect(ctaButton?.className).toContain('ctaButton');
    });
  });

  describe('Edge cases and state management', () => {
    it('should handle rapid package changes', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      const buttons = screen.getAllByRole('button');
      const bronsButton = buttons.find((btn) => btn.textContent?.includes('Brons Pakket'));
      const goudButton = buttons.find((btn) => btn.textContent?.includes('Goud Pakket'));

      await user.click(bronsButton!);
      await user.click(goudButton!);
      await user.click(bronsButton!);

      await waitFor(() => {
        expect(bronsButton?.className).toContain('packageSelected');
      });
    });

    it('should maintain add-on state when changing packages', async () => {
      const user = userEvent.setup();
      render(<PriceCalculator />);

      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[0]); // Select LED floor

      await waitFor(() => {
        expect(checkboxes[0]).toBeChecked();
      });

      // Change package
      const buttons = screen.getAllByRole('button');
      const goudButton = buttons.find((btn) => btn.textContent?.includes('Goud Pakket'));
      await user.click(goudButton!);

      // Add-on should still be selected
      expect(checkboxes[0]).toBeChecked();
    });

    it('should calculate price correctly with no add-ons', () => {
      render(<PriceCalculator />);

      expect(screen.getAllByText(new RegExp('€1350'))).toBeTruthy();
    });

    it('should handle maximum guest count', async () => {
      render(<PriceCalculator />);

      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '300' } });

      await waitFor(() => {
        expect(slider).toHaveValue('300');
      });
    });

    it('should handle minimum guest count', async () => {
      render(<PriceCalculator />);

      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '20' } });

      await waitFor(() => {
        expect(slider).toHaveValue('20');
      });
    });
  });
});
