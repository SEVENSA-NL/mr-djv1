import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';

import {
  bytesDigest,
  normalizeLintResults,
  validateBaselineDocument,
} from './lint-baseline-contract.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const baselinePath = path.join(projectRoot, 'tests', 'fixtures', 'eslint-baseline.json');
const eslintConfigPath = path.join(projectRoot, 'eslint.config.js');

async function main() {
  let baseline;
  try {
    baseline = JSON.parse(await fs.readFile(baselinePath, 'utf8'));
  } catch (error) {
    throw new Error(`LINT_BASELINE_UNREADABLE:${error.code ?? error.name}`);
  }

  const eslint = new ESLint({ cwd: projectRoot });
  const results = await eslint.lintFiles(['.']);
  const currentFindings = normalizeLintResults(results, projectRoot);
  const projectRequire = createRequire(path.join(projectRoot, 'package.json'));
  const eslintVersion = projectRequire('eslint/package.json').version;
  const eslintConfigSha256 = bytesDigest(await fs.readFile(eslintConfigPath));
  const failures = validateBaselineDocument(baseline, currentFindings, {
    eslintConfigSha256,
    eslintVersion,
  });
  if (failures.length) {
    throw new Error(failures.join('\n'));
  }

  process.stdout.write(
    `${JSON.stringify({
      baseline_id: baseline.baseline_id,
      errors: baseline.error_count,
      findings_sha256: baseline.findings_sha256,
      status: 'PASS',
      warnings: baseline.warning_count,
    })}\n`,
  );
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
