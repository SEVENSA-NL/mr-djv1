import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workflowRoot = path.join(repoRoot, '.github', 'workflows');
const allowUntrackedCandidates = process.env.ALLOW_UNTRACKED_LOCK_CANDIDATES === '1';

const workspaces = [
  { directory: 'backend', lock: 'backend/package-lock.json', manager: 'npm' },
  { directory: 'frontend', lock: 'frontend/package-lock.json', manager: 'npm' },
  {
    directory: 'frontend-nextjs',
    lock: 'frontend-nextjs/pnpm-lock.yaml',
    manager: 'pnpm',
  },
  {
    directory: 'mr-dj-eds-components',
    lock: 'mr-dj-eds-components/pnpm-lock.yaml',
    manager: 'pnpm',
  },
];

function fail(code, detail = '') {
  throw new Error(`${code}${detail ? `:${detail}` : ''}`);
}

function git(...args) {
  return execFileSync('git', args, {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function isTracked(relativePath) {
  try {
    git('ls-files', '--error-unmatch', '--', relativePath);
    return true;
  } catch {
    return false;
  }
}

function isIgnored(relativePath) {
  try {
    execFileSync('git', ['check-ignore', '--quiet', '--', relativePath], {
      cwd: repoRoot,
      stdio: 'ignore',
    });
    return true;
  } catch {
    return false;
  }
}

function sameObject(left, right) {
  return JSON.stringify(left ?? {}) === JSON.stringify(right ?? {});
}

function validateNpmLock(contract) {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(repoRoot, contract.directory, 'package.json'), 'utf8'),
  );
  const lock = JSON.parse(fs.readFileSync(path.join(repoRoot, contract.lock), 'utf8'));
  const rootPackage = lock.packages?.[''];
  if (lock.lockfileVersion !== 3 || !rootPackage) {
    fail('NPM_LOCK_SCHEMA_INVALID', contract.lock);
  }
  for (const field of ['name', 'version']) {
    if (rootPackage[field] !== manifest[field] || lock[field] !== manifest[field]) {
      fail('NPM_LOCK_MANIFEST_MISMATCH', `${contract.lock}:${field}`);
    }
  }
  for (const field of ['dependencies', 'devDependencies', 'engines']) {
    if (!sameObject(rootPackage[field], manifest[field])) {
      fail('NPM_LOCK_MANIFEST_MISMATCH', `${contract.lock}:${field}`);
    }
  }
}

function setupNodeBlocks(source) {
  const lines = source.split(/\r?\n/);
  const blocks = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].includes('uses: actions/setup-node@')) continue;
    const indent = lines[index].search(/\S/);
    const stepIndent = Math.max(0, indent - 2);
    let end = index + 1;
    while (
      end < lines.length
      && !new RegExp(`^\\s{${stepIndent}}-\\s+(?:name|uses):`).test(lines[end])
    ) {
      end += 1;
    }
    blocks.push(lines.slice(index, end));
  }
  return blocks;
}

function cachePaths(block) {
  const paths = [];
  for (let index = 0; index < block.length; index += 1) {
    const match = block[index].match(/^(\s*)cache-dependency-path:\s*(.*)$/);
    if (!match) continue;
    const inline = match[2].trim().replace(/^['"]|['"]$/g, '');
    if (inline && inline !== '|') {
      paths.push(inline);
      continue;
    }
    const indent = match[1].length;
    for (let next = index + 1; next < block.length; next += 1) {
      const value = block[next];
      if (!value.trim()) continue;
      if (value.search(/\S/) <= indent) break;
      paths.push(value.trim().replace(/^['"]|['"]$/g, ''));
    }
  }
  return paths;
}

if (fs.existsSync(path.join(repoRoot, 'package-lock.json'))) {
  fail('ROOT_PACKAGE_LOCK_FORBIDDEN');
}

for (const contract of workspaces) {
  const lockPath = path.join(repoRoot, contract.lock);
  if (!fs.existsSync(lockPath) || !fs.statSync(lockPath).isFile()) {
    fail('WORKSPACE_LOCK_MISSING', contract.lock);
  }
  if (isIgnored(contract.lock)) {
    fail('WORKSPACE_LOCK_IGNORED', contract.lock);
  }
  if (!isTracked(contract.lock) && !allowUntrackedCandidates) {
    fail('WORKSPACE_LOCK_NOT_TRACKED', contract.lock);
  }
  if (contract.manager === 'npm') validateNpmLock(contract);
}

const workflowFiles = fs
  .readdirSync(workflowRoot)
  .filter((name) => /\.ya?ml$/i.test(name))
  .sort();
let setupNodeCount = 0;
let cachedSetupNodeCount = 0;
for (const name of workflowFiles) {
  const relativePath = `.github/workflows/${name}`;
  const source = fs.readFileSync(path.join(workflowRoot, name), 'utf8');
  if (/(^|\s)npm install(?:\s|$)/m.test(source)) {
    fail('NON_FROZEN_NPM_INSTALL', relativePath);
  }
  for (const line of source.split(/\r?\n/)) {
    if (line.includes('pnpm') && /\binstall\b/.test(line) && !line.includes('--frozen-lockfile')) {
      fail('NON_FROZEN_PNPM_INSTALL', relativePath);
    }
  }
  for (const block of setupNodeBlocks(source)) {
    setupNodeCount += 1;
    const cacheLine = block.find((line) => /^\s*cache:\s*/.test(line));
    if (!cacheLine) continue;
    cachedSetupNodeCount += 1;
    const manager = cacheLine.split(':').slice(1).join(':').trim().replace(/['"]/g, '');
    const paths = cachePaths(block);
    if (!paths.length) fail('CACHE_DEPENDENCY_PATH_MISSING', relativePath);
    for (const dependencyPath of paths) {
      if (
        path.isAbsolute(dependencyPath)
        || dependencyPath.includes('*')
        || dependencyPath.includes('${{')
      ) {
        fail('CACHE_DEPENDENCY_PATH_DYNAMIC', `${relativePath}:${dependencyPath}`);
      }
      const expectedName =
        manager === 'npm' ? 'package-lock.json' : manager === 'pnpm' ? 'pnpm-lock.yaml' : '';
      if (!expectedName || path.basename(dependencyPath) !== expectedName) {
        fail('CACHE_MANAGER_LOCK_MISMATCH', `${relativePath}:${dependencyPath}`);
      }
      if (!fs.existsSync(path.join(repoRoot, dependencyPath))) {
        fail('CACHE_DEPENDENCY_PATH_MISSING', `${relativePath}:${dependencyPath}`);
      }
      if (!isTracked(dependencyPath) && !allowUntrackedCandidates) {
        fail('CACHE_DEPENDENCY_PATH_NOT_TRACKED', `${relativePath}:${dependencyPath}`);
      }
    }
  }
}

process.stdout.write(
  `${JSON.stringify({
    cached_setup_node_steps: cachedSetupNodeCount,
    setup_node_steps: setupNodeCount,
    status: 'PASS',
    workspaces: workspaces.length,
    workflows: workflowFiles.length,
  })}\n`,
);
