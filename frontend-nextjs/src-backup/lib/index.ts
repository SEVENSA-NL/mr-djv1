export function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: Date, locale: string = 'nl-NL'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency,
  }).format(amount);
}
