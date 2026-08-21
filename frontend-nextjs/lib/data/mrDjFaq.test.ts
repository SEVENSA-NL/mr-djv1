import { describe, expect, it } from 'vitest';
import { createMrDjFaqStructuredData, MR_DJ_FAQ } from './mrDjFaq';

describe('Mister DJ FAQ bank', () => {
  it('loads the complete reviewed bank with stable unique IDs', () => {
    expect(MR_DJ_FAQ).toHaveLength(30);
    expect(new Set(MR_DJ_FAQ.map((item) => item.id)).size).toBe(30);
    expect(MR_DJ_FAQ.every((item) => item.question && item.answer)).toBe(true);
  });

  it('generates schema from exactly the visible FAQ source', () => {
    const schema = createMrDjFaqStructuredData();
    expect(schema.mainEntity).toHaveLength(MR_DJ_FAQ.length);
    expect(schema.mainEntity.map((item) => item.name)).toEqual(MR_DJ_FAQ.map((item) => item.question));
    expect(schema.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(MR_DJ_FAQ.map((item) => item.answer));
  });
});
