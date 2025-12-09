import { render, screen, fireEvent } from '@testing-library/react';
import { PriceCalculator } from '@/components/pricing/PriceCalculator';
import { PACKAGES } from '@/lib/data/pricing';

describe('PriceCalculator', () => {
  it('renders calculator headings and package options', () => {
    render(<PriceCalculator locale="nl" />);

    expect(screen.getByText(/Prijs Calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/Kies je pakket/i)).toBeInTheDocument();

    const headings = screen.getAllByText(/Pakket/i);
    expect(headings.length).toBeGreaterThan(0);
  });

  it('updates guest count on slider change', () => {
    render(<PriceCalculator locale="nl" />);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '150' } });

    expect(screen.getByText(/Aantal gasten:/i).textContent).toContain('150');
  });
});
