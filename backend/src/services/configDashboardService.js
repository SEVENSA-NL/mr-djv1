const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const config = require('../config');
const managedEnv = require('../lib/managedEnv');

/**
 * @typedef {Object} DashboardEntry
 * @property {string} name
 * @property {boolean} hasValue
 * @property {string|null} preview
 */

/**
 * @typedef {Object} DashboardGroup
 * @property {string} id
 * @property {string} label
 * @property {string} [description]
 * @property {DashboardEntry[]} entries
 */

/**
 * @typedef {Object} DashboardState
 * @property {string[]} managedKeys
 * @property {DashboardEntry[]} entries
 * @property {DashboardGroup[]} groups
 * @property {{ storePath: string, lastModified: string|null }} metadata
 */

/**
 * Replaces sensitive values with a masked representation.
 *
 * @param {string|null|undefined} value
 * @returns {string|null}
 */
function maskValue(value) {
  if (!value) {
    return null;
  }

  if (value.length <= 4) {
    return '*'.repeat(value.length);
  }

  const visible = value.slice(-4);
  return `${'*'.repeat(value.length - 4)}${visible}`;
}

/**
 * Normalizes user supplied values to strings for storage.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function normalizeValue(value) {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value !== 'string') {
    return String(value);
  }

  return value;
}

function relativeStorePath(storePath) {
  return path.relative(process.cwd(), storePath).split(path.sep).join('/');
}

function getRolesStorePath() {
  if (process.env.CONFIG_DASHBOARD_ROLES_PATH) {
    return path.resolve(process.cwd(), process.env.CONFIG_DASHBOARD_ROLES_PATH);
  }
  return path.join(path.dirname(managedEnv.getStorePath()), 'dashboard-roles.json');
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 64);
}

function normalizePermissions(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return [...new Set(value.filter((item) => typeof item === 'string').map((item) => item.trim()).filter(Boolean))];
}

function normalizeRole(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const id = slugify(value.id || value.name);
  const name = typeof value.name === 'string' ? value.name.trim() : '';
  if (!id || !name) {
    return null;
  }
  return {
    id,
    name,
    description: typeof value.description === 'string' ? value.description.trim() : '',
    permissions: normalizePermissions(value.permissions)
  };
}

function sanitizeAssignments(value, roles) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }
  const allowed = new Set(roles.map((role) => role.id));
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, ids]) => [
        key,
        Array.isArray(ids)
          ? [...new Set(ids.filter((id) => typeof id === 'string' && allowed.has(id)))].sort()
          : []
      ])
      .filter(([, ids]) => ids.length)
  );
}

function loadRolesStore() {
  const storePath = getRolesStorePath();
  if (!fs.existsSync(storePath)) {
    return { roles: [], assignments: {} };
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(storePath, 'utf8'));
    const roles = Array.isArray(parsed.roles)
      ? parsed.roles.map(normalizeRole).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name))
      : [];
    return { roles, assignments: sanitizeAssignments(parsed.assignments, roles) };
  } catch (error) {
    console.warn('[configDashboardService] Failed to read roles store:', error.message);
    return { roles: [], assignments: {} };
  }
}

async function writeRolesStore(store) {
  const storePath = getRolesStorePath();
  const storeDirectory = path.dirname(storePath);
  const temporaryPath = path.join(
    storeDirectory,
    `.${path.basename(storePath)}.${process.pid}.${randomUUID()}.tmp`
  );
  await fs.promises.mkdir(storeDirectory, { recursive: true });
  try {
    await fs.promises.writeFile(temporaryPath, `${JSON.stringify(store, null, 2)}\n`, {
      mode: 0o600,
      flag: 'wx'
    });
    await fs.promises.rename(temporaryPath, storePath);
  } catch (error) {
    try {
      await fs.promises.unlink(temporaryPath);
    } catch (cleanupError) {
      if (cleanupError.code !== 'ENOENT') {
        console.warn('[configDashboardService] Failed to clean temporary roles store:', cleanupError.message);
      }
    }
    throw error;
  }
  return loadRolesStore();
}

async function updateRoleAssignments(assignments) {
  const store = loadRolesStore();
  if (assignments === undefined) {
    return store;
  }
  store.assignments = sanitizeAssignments(assignments, store.roles);
  return writeRolesStore(store);
}

/**
 * Loads the managed environment file.
 *
 * @returns {Object<string, string>}
 */
function getCurrentValues() {
  const fileValues = managedEnv.loadFromDiskSync();
  return { ...fileValues };
}

/**
 * Builds the dashboard view model for the provided configuration values.
 *
 * @param {Object<string, string>} values
 * @returns {DashboardState}
 */
function buildState(values, roleState = loadRolesStore()) {
  const entryMap = new Map();
  const entries = config.dashboard.managedKeys.map((key) => {
    const existing = values[key];
    const effective = existing ?? process.env[key] ?? null;

    const entry = {
      name: key,
      hasValue: Boolean(effective),
      preview: effective ? maskValue(String(effective)) : null
    };

    entryMap.set(key, entry);
    return entry;
  });

  const groups = (config.dashboard.sections || []).map((section) => ({
    id: section.id,
    label: section.label,
    description: section.description,
    entries: section.keys.map((key) => entryMap.get(key)).filter(Boolean)
  }));

  let lastModified = null;
  const storePath = managedEnv.getStorePath();
  try {
    const stats = fs.statSync(storePath);
    lastModified = stats.mtime.toISOString();
  } catch (_error) {
    lastModified = null;
  }

  return {
    managedKeys: [...config.dashboard.managedKeys],
    entries,
    groups,
    metadata: {
      storePath: relativeStorePath(storePath),
      lastModified
    },
    roles: roleState.roles,
    roleAssignments: roleState.assignments
  };
}

/**
 * Persists submitted dashboard changes and reloads runtime config.
 *
 * @param {Object<string, *>} payload
 * @returns {Promise<DashboardState>}
 */
async function updateValues(payload, { assignments } = {}) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('Invalid payload');
  }

  const currentValues = getCurrentValues();
  const nextValues = { ...currentValues };

  for (const key of config.dashboard.managedKeys) {
    if (!(key in payload)) {
      continue;
    }

    const rawValue = normalizeValue(payload[key]);

    if (rawValue === null) {
      continue;
    }

    if (rawValue === '') {
      delete nextValues[key];
      delete process.env[key];
      continue;
    }

    nextValues[key] = rawValue;
    process.env[key] = rawValue;
  }

  await managedEnv.write(nextValues);
  config.reload();

  const roleState = await updateRoleAssignments(assignments);
  return buildState(nextValues, roleState);
}

/**
 * Returns the current dashboard state for rendering.
 *
 * @returns {DashboardState}
 */
function getState() {
  const values = getCurrentValues();
  return buildState(values);
}

function listRoles() {
  return loadRolesStore();
}

async function createRole(payload) {
  const role = normalizeRole(payload);
  if (!role) {
    throw new Error(payload && typeof payload === 'object' ? 'Role name is required' : 'Invalid role payload');
  }
  const store = loadRolesStore();
  if (store.roles.some((entry) => entry.id === role.id)) {
    throw new Error('Role already exists');
  }
  store.roles.push(role);
  store.roles.sort((a, b) => a.name.localeCompare(b.name));
  const updated = await writeRolesStore(store);
  return { role, roles: updated.roles, assignments: updated.assignments };
}

async function updateRole(roleId, payload) {
  const id = slugify(roleId);
  if (!id) {
    throw new Error('Role identifier is required');
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('Invalid role payload');
  }
  const store = loadRolesStore();
  const existing = store.roles.find((role) => role.id === id);
  if (!existing) {
    throw new Error('Role not found');
  }
  if (payload.name !== undefined) {
    if (typeof payload.name !== 'string' || !payload.name.trim()) {
      throw new Error('Role name is required');
    }
    existing.name = payload.name.trim();
  }
  if (payload.description !== undefined) {
    existing.description = typeof payload.description === 'string' ? payload.description.trim() : '';
  }
  if (payload.permissions !== undefined) {
    existing.permissions = normalizePermissions(payload.permissions);
  }
  store.roles.sort((a, b) => a.name.localeCompare(b.name));
  const updated = await writeRolesStore(store);
  return { role: existing, roles: updated.roles, assignments: updated.assignments };
}

async function deleteRole(roleId) {
  const id = slugify(roleId);
  if (!id) {
    throw new Error('Role identifier is required');
  }
  const store = loadRolesStore();
  const index = store.roles.findIndex((role) => role.id === id);
  if (index === -1) {
    throw new Error('Role not found');
  }
  const [role] = store.roles.splice(index, 1);
  store.assignments = Object.fromEntries(
    Object.entries(store.assignments)
      .map(([key, ids]) => [key, ids.filter((entry) => entry !== id)])
      .filter(([, ids]) => ids.length)
  );
  const updated = await writeRolesStore(store);
  return { role, roles: updated.roles, assignments: updated.assignments };
}

function ping() {
  return {
    ok: true,
    enabled: Boolean(config.dashboard.enabled),
    managedKeyCount: config.dashboard.managedKeys.length,
    storePath: relativeStorePath(config.dashboard.storePath)
  };
}

module.exports = {
  getState,
  updateValues,
  listRoles,
  createRole,
  updateRole,
  deleteRole,
  ping
};
