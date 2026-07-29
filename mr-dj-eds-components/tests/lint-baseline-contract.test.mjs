import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { validateBaselineDocument } from '../scripts/lint-baseline-contract.mjs';

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const baseline = JSON.parse(
  fs.readFileSync(path.join(testDirectory, 'fixtures', 'eslint-baseline.json'), 'utf8'),
);
const runtime = Object.freeze({
  eslintConfigSha256: baseline.eslint_config_sha256,
  eslintVersion: baseline.eslint_version,
});

test('an exact lint baseline is accepted', () => {
  assert.deepEqual(validateBaselineDocument(baseline, baseline.findings, runtime), []);
});

test('a new or shifted finding makes the baseline stale', () => {
  const changedFindings = baseline.findings.map((finding, index) =>
    index === 0 ? { ...finding, line: finding.line + 1 } : finding,
  );

  assert.deepEqual(
    validateBaselineDocument(baseline, changedFindings, runtime),
    ['LINT_BASELINE_STALE_OR_CHANGED'],
  );
});

test('baseline content cannot change without a matching integrity digest', () => {
  const changedBaseline = structuredClone(baseline);
  changedBaseline.findings[0].line += 1;

  assert.deepEqual(
    validateBaselineDocument(changedBaseline, changedBaseline.findings, runtime),
    ['LINT_BASELINE_INTEGRITY_MISMATCH'],
  );
});

test('a changed ESLint version or config invalidates the baseline', () => {
  assert.deepEqual(
    validateBaselineDocument(baseline, baseline.findings, {
      eslintConfigSha256: '0'.repeat(64),
      eslintVersion: '0.0.0',
    }),
    ['LINT_BASELINE_TOOLCHAIN_MISMATCH'],
  );
});
