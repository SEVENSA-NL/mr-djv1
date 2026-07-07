const fs = require('fs');
const path = require('path');
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
function relativeStorePath(filePath) {
  return path.relative(process.cwd(), filePath).split(path.sep).join('/');
}

function getRolesStorePath() {
  return `${managedEnv.getStorePath()}.roles.json`;
}

function normalizeRoleId(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeRolesStore(raw = {}) {
  const roles = Array.isArray(raw.roles)
    ? raw.roles
        .map((role) => {
          const id = normalizeRoleId(role.id || role.name);
          if (!id) {
            return null;
          }
          return {
            id,
            name: String(role.name || id).trim(),
            description: role.description ? String(role.description) : ''
          };
        })
        .filter(Boolean)
    : [];

  const roleIds = new Set(roles.map((role) => role.id));
  const assignments = {};
  const rawAssignments = raw.assignments && typeof raw.assignments === 'object' ? raw.assignments : {};

  for (const [key, value] of Object.entries(rawAssignments)) {
    if (!config.dashboard.managedKeys.includes(key)) {
      continue;
    }
    const assigned = Array.isArray(value)
      ? value.map(normalizeRoleId).filter((roleId) => roleIds.has(roleId))
      : [];
    assignments[key] = Array.from(new Set(assigned));
  }

  return { roles, assignments };
}

function loadRoleState() {
  try {
    const raw = fs.readFileSync(getRolesStorePath(), 'utf8');
    return normalizeRolesStore(JSON.parse(raw));
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn('[configDashboardService] Failed to load dashboard roles:', error.message);
    }
    return { roles: [], assignments: {} };
  }
}

async function writeRoleState(roleState) {
  const storePath = getRolesStorePath();
  await fs.promises.mkdir(path.dirname(storePath), { recursive: true });
  await fs.promises.writeFile(
    storePath,
    JSON.stringify(normalizeRolesStore(roleState), null, 2),
    'utf8'
  );
}

async function updateRoleAssignments(assignments) {
  const roleState = loadRoleState();
  if (assignments === undefined) {
    return roleState;
  }

  const next = normalizeRolesStore({
    roles: roleState.roles,
    assignments: assignments && typeof assignments === 'object' ? assignments : {}
  });
  await writeRoleState(next);
  return next;
}

function buildState(values, roleState = loadRoleState()) {
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
async function updateValues(payload, options = {}) {
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

  const roleState = await updateRoleAssignments(options.assignments);

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

function ping() {
  return {
    ok: true,
    enabled: Boolean(config.dashboard.enabled),
    managedKeyCount: config.dashboard.managedKeys.length,
    storePath: relativeStorePath(config.dashboard.storePath)
  };
}

function listRoles() {
  return loadRoleState();
}

async function createRole(payload = {}) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('Invalid role payload');
  }

  const id = normalizeRoleId(payload.id || payload.name);
  const name = String(payload.name || '').trim();
  if (!name) {
    throw new Error('Role name is required');
  }
  if (!id) {
    throw new Error('Unable to determine role identifier');
  }

  const roleState = loadRoleState();
  if (roleState.roles.some((role) => role.id === id)) {
    throw new Error('Role already exists');
  }

  const next = normalizeRolesStore({
    roles: roleState.roles.concat({
      id,
      name,
      description: payload.description ? String(payload.description) : ''
    }),
    assignments: roleState.assignments
  });
  await writeRoleState(next);
  return next;
}

async function updateRole(roleId, payload = {}) {
  const id = normalizeRoleId(roleId);
  if (!id) {
    throw new Error('Role identifier is required');
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('Invalid role payload');
  }
  const name = String(payload.name || '').trim();
  if (!name) {
    throw new Error('Role name is required');
  }

  const roleState = loadRoleState();
  let found = false;
  const roles = roleState.roles.map((role) => {
    if (role.id !== id) {
      return role;
    }
    found = true;
    return {
      ...role,
      name,
      description: payload.description ? String(payload.description) : ''
    };
  });

  if (!found) {
    throw new Error('Role not found');
  }

  const next = normalizeRolesStore({ roles, assignments: roleState.assignments });
  await writeRoleState(next);
  return next;
}

async function deleteRole(roleId) {
  const id = normalizeRoleId(roleId);
  if (!id) {
    throw new Error('Role identifier is required');
  }

  const roleState = loadRoleState();
  if (!roleState.roles.some((role) => role.id === id)) {
    throw new Error('Role not found');
  }

  const assignments = {};
  for (const [key, value] of Object.entries(roleState.assignments)) {
    assignments[key] = value.filter((roleIdValue) => roleIdValue !== id);
  }
  const next = normalizeRolesStore({
    roles: roleState.roles.filter((role) => role.id !== id),
    assignments
  });
  await writeRoleState(next);
  return next;
}

module.exports = {
  getState,
  updateValues,
  ping,
  listRoles,
  createRole,
  updateRole,
  deleteRole
};
