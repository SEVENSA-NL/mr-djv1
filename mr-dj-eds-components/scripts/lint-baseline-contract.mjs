import { createHash } from 'node:crypto';
import path from 'node:path';

export const BASELINE_SCHEMA_VERSION = 1;
export const EXPECTED_DEFAULT_BRANCH_COUNTS = Object.freeze({
  errors: 237,
  warnings: 18,
});
export const REQUIRED_PROVENANCE = Object.freeze({
  baseline_id: 'MRDJ-327-ESLINT-D27CA2B5',
  issue: 'https://github.com/SEVENSA-NL/mr-djv1/issues/327',
  source_commit: 'd27ca2b551a4269fb2a54c10bb8de15cf1ff5393',
});

function canonicalJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map(canonicalJson).join(',')}]`;
  }
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

export function findingsDigest(findings) {
  return createHash('sha256').update(canonicalJson(findings)).digest('hex');
}

export function bytesDigest(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

export function normalizeLintResults(results, projectRoot) {
  const findings = [];
  for (const result of results) {
    const relativePath = path.relative(projectRoot, result.filePath).replaceAll('\\', '/');
    for (const message of result.messages) {
      if (message.severity < 1) {
        continue;
      }
      findings.push({
        column: message.column ?? null,
        end_column: message.endColumn ?? null,
        end_line: message.endLine ?? null,
        file: relativePath,
        line: message.line ?? null,
        message: message.message,
        message_id: message.messageId ?? null,
        rule_id: message.ruleId ?? null,
        severity: message.severity,
      });
    }
  }
  return findings.sort((left, right) =>
    canonicalJson(left).localeCompare(canonicalJson(right), 'en'),
  );
}

export function createBaselineDocument(findings, eslintVersion, eslintConfigSha256) {
  return {
    schema_version: BASELINE_SCHEMA_VERSION,
    ...REQUIRED_PROVENANCE,
    eslint_version: eslintVersion,
    eslint_config_sha256: eslintConfigSha256,
    error_count: findings.filter((finding) => finding.severity === 2).length,
    warning_count: findings.filter((finding) => finding.severity === 1).length,
    findings_sha256: findingsDigest(findings),
    findings,
  };
}

export function validateBaselineDocument(
  baseline,
  currentFindings,
  { eslintVersion, eslintConfigSha256 },
) {
  const failures = [];
  if (!baseline || typeof baseline !== 'object' || Array.isArray(baseline)) {
    return ['LINT_BASELINE_NOT_OBJECT'];
  }
  if (baseline.schema_version !== BASELINE_SCHEMA_VERSION) {
    failures.push('LINT_BASELINE_SCHEMA_UNSUPPORTED');
  }
  for (const [field, expected] of Object.entries(REQUIRED_PROVENANCE)) {
    if (baseline[field] !== expected) {
      failures.push(`LINT_BASELINE_PROVENANCE_MISMATCH:${field}`);
    }
  }
  if (!Array.isArray(baseline.findings)) {
    failures.push('LINT_BASELINE_FINDINGS_MISSING');
    return failures;
  }

  const storedErrors = baseline.findings.filter((finding) => finding.severity === 2).length;
  const storedWarnings = baseline.findings.filter((finding) => finding.severity === 1).length;
  if (
    baseline.error_count !== storedErrors
    || baseline.warning_count !== storedWarnings
    || baseline.findings_sha256 !== findingsDigest(baseline.findings)
  ) {
    failures.push('LINT_BASELINE_INTEGRITY_MISMATCH');
  }
  if (
    baseline.error_count !== EXPECTED_DEFAULT_BRANCH_COUNTS.errors
    || baseline.warning_count !== EXPECTED_DEFAULT_BRANCH_COUNTS.warnings
  ) {
    failures.push('LINT_BASELINE_DEFAULT_BRANCH_COUNT_MISMATCH');
  }
  if (
    baseline.eslint_version !== eslintVersion
    || baseline.eslint_config_sha256 !== eslintConfigSha256
  ) {
    failures.push('LINT_BASELINE_TOOLCHAIN_MISMATCH');
  }
  if (findingsDigest(currentFindings) !== findingsDigest(baseline.findings)) {
    failures.push('LINT_BASELINE_STALE_OR_CHANGED');
  }
  return failures;
}
