import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

function source(path: string) {
  return readFileSync(resolve(root, path), 'utf8');
}

describe('confirmed lead conversion ownership', () => {
  it('keeps browser forms diagnostic and backend routes authoritative', () => {
    for (const component of [
      'components/city/CityContact.tsx',
      'components/booking/AvailabilityForm.tsx',
    ]) {
      const text = source(component);
      expect(text).toContain("trackEvent('form_submit'");
      expect(text).not.toContain("trackEvent('generate_lead'");
    }

    for (const route of [
      'app/api/contact/route.ts',
      'app/api/availability/route.ts',
    ]) {
      expect(source(route)).toContain("'generate_lead'");
    }
  });
});
