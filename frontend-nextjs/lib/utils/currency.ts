/**
 * Currency formatting utilities for consistent price display
 */

export function formatCurrency(
  amount: number,
  options: {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {},
): string {
  const {
    locale = 'nl-NL',
    currency = 'EUR',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

export function formatCompactCurrency(amount: number): string {
  return formatCurrency(amount, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function formatPriceRange(minPrice: number, maxPrice: number): string {
  const min = formatCompactCurrency(minPrice);
  const max = formatCompactCurrency(maxPrice);
  return `${min} - ${max}`;
}

export function formatFromPrice(amount: number): string {
  return `Vanaf ${formatCompactCurrency(amount)}`;
}

export function parseCurrency(currencyString: string): number {
  const cleaned = currencyString
    .replace(/[€$£¥\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  return parseFloat(cleaned) || 0;
}

export function addVAT(amount: number, vatRate: number = 0.21): number {
  return Math.round(amount * (1 + vatRate));
}

export function calculateVAT(amount: number, vatRate: number = 0.21): number {
  return Math.round(amount * vatRate);
}

