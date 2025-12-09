import { createServiceStructuredData } from '@/lib/seo/structuredData';

describe('Structured Data utilities', () => {
  it('creates service structured data with provider info', () => {
    const data = createServiceStructuredData(
      'Test Service',
      'Test description for structured data'
    );

    expect(data['@type']).toBe('Service');
    expect(data.name).toBe('Test Service');
    expect(data.description).toBe('Test description for structured data');
    expect(data.provider?.name).toBe('Mister DJ');
  });
});
