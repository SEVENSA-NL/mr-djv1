import fs from 'node:fs';
import path from 'node:path';

export type MrDjFaqItem = { id: string; question: string; answer: string };

const FAQ_BANK_PATH = path.join(process.cwd(), 'docs', 'faq-content-bank-2026-08-21.md');

function slugify(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function readFaqBank(): MrDjFaqItem[] {
  const markdown = fs.readFileSync(FAQ_BANK_PATH, 'utf8');
  const items: MrDjFaqItem[] = [];
  const pattern = /^### (\d+)\. (.+)\r?\n\r?\n([\s\S]*?)(?=\r?\n### |\r?\n## |\r?\n---|$)/gm;
  for (const match of markdown.matchAll(pattern)) {
    items.push({ id: `faq-${match[1]}-${slugify(match[2])}`, question: match[2].trim(), answer: match[3].trim() });
  }
  if (items.length !== 30) throw new Error(`Expected 30 Mister DJ FAQ items, found ${items.length}`);
  return items;
}

export const MR_DJ_FAQ = readFaqBank();

export function createMrDjFaqStructuredData(items: MrDjFaqItem[] = MR_DJ_FAQ) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  };
}
