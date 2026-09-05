import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ContactPage, { generateMetadata } from '@/app/[locale]/contact/page';
import { generateMetadata as generateAvailabilityMetadata } from '@/app/[locale]/beschikbaarheid/page';

describe('localized contact page', () => {
  it('renders the existing availability journey and verified direct contact routes', async () => {
    const { container } = render(await ContactPage({ params: Promise.resolve({ locale: 'nl' }) }));

    expect(screen.getByRole('heading', { name: 'Vertel ons over je event' })).toBeVisible();
    expect(container.querySelector('form')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Bel 040-8422594' })).toHaveAttribute('href', 'tel:+31408422594');
    expect(screen.getByRole('link', { name: 'Mail info@mr-dj.nl' })).toHaveAttribute('href', 'mailto:info@mr-dj.nl');
    expect(screen.getByRole('link', { name: 'Terug naar home' })).toHaveAttribute('href', '/nl');
  });

  it('sets locale-specific canonical and hreflang alternates', async () => {
    await expect(generateMetadata({ params: Promise.resolve({ locale: 'nl' }) })).resolves.toMatchObject({
      alternates: {
        canonical: '/nl/contact',
        languages: { nl: '/nl/contact', en: '/en/contact' },
      },
    });
    await expect(generateMetadata({ params: Promise.resolve({ locale: 'en' }) })).resolves.toMatchObject({
      alternates: {
        canonical: '/en/contact',
        languages: { nl: '/nl/contact', en: '/en/contact' },
      },
    });
  });

  it('uses the same localized, response-only metadata for availability', async () => {
    await expect(
      generateAvailabilityMetadata({ params: Promise.resolve({ locale: 'en' }) })
    ).resolves.toMatchObject({
      title: 'Request availability | Mister DJ',
      description: 'Share your date and event type with Mister DJ. We will be in touch within 24 hours.',
      alternates: {
        canonical: '/en/beschikbaarheid',
        languages: { nl: '/nl/beschikbaarheid', en: '/en/beschikbaarheid' },
      },
    });
  });
});
