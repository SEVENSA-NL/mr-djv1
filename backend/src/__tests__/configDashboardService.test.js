const path = require('path');

jest.mock('fs', () => ({
  statSync: jest.fn(),
  existsSync: jest.fn(() => false),
  readFileSync: jest.fn(),
  promises: {
    mkdir: jest.fn(),
    writeFile: jest.fn(),
    rename: jest.fn(),
    unlink: jest.fn()
  }
}));

const mockManagedEnv = {
  loadFromDiskSync: jest.fn(),
  getStorePath: jest.fn(),
  write: jest.fn()
};

jest.mock('../lib/managedEnv', () => mockManagedEnv);

const mockDashboardConfig = {
  enabled: true,
  managedKeys: [],
  sections: [],
  storePath: '/tmp/config.env'
};

const mockReload = jest.fn();

jest.mock('../config', () => ({
  dashboard: mockDashboardConfig,
  reload: mockReload
}));

const fs = require('fs');
const config = require('../config');
const configDashboardService = require('../services/configDashboardService');

let rolesStoreContent;
let temporaryRolesContent;

describe('configDashboardService', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockManagedEnv.loadFromDiskSync.mockReturnValue({});
    mockManagedEnv.getStorePath.mockReturnValue(path.join(process.cwd(), 'config', '.env.managed'));
    mockManagedEnv.write.mockResolvedValue();

    rolesStoreContent = null;
    temporaryRolesContent = null;
    fs.existsSync.mockImplementation(
      (filePath) => String(filePath).endsWith('dashboard-roles.json') && rolesStoreContent !== null
    );
    fs.readFileSync.mockImplementation(() => rolesStoreContent);
    fs.promises.mkdir.mockResolvedValue();
    fs.promises.writeFile.mockImplementation(async (_filePath, contents) => {
      temporaryRolesContent = contents;
    });
    fs.promises.rename.mockImplementation(async (_temporaryPath, _storePath) => {
      rolesStoreContent = temporaryRolesContent;
      temporaryRolesContent = null;
    });
    fs.promises.unlink.mockImplementation(async () => {
      temporaryRolesContent = null;
    });

    fs.statSync.mockReturnValue({ mtime: new Date('2024-01-02T03:04:05Z') });

    config.dashboard.managedKeys = [];
    config.dashboard.sections = [];

  });

  afterEach(() => {
    delete process.env.SECRET;
    delete process.env.FALLBACK;
    delete process.env.SHORT;
    delete process.env.REMOVE;
    delete process.env.NUMERIC;
    delete process.env.CONFIG_DASHBOARD_ROLES_PATH;
    jest.restoreAllMocks();
  });

  it('masks values in getState and returns metadata', () => {
    config.dashboard.managedKeys = ['SECRET', 'FALLBACK', 'SHORT'];
    config.dashboard.sections = [
      { id: 'main', label: 'Main', description: 'Primary', keys: ['SECRET', 'FALLBACK', 'SHORT'] }
    ];

    mockManagedEnv.loadFromDiskSync.mockReturnValue({ SECRET: 'supersecret', SHORT: 'abc' });
    process.env.FALLBACK = 'fallback';

    const state = configDashboardService.getState();

    const entriesByName = Object.fromEntries(state.entries.map((entry) => [entry.name, entry]));

    expect(entriesByName.SECRET.preview).toBe('*******cret');
    expect(entriesByName.FALLBACK.preview).toBe('****back');
    expect(entriesByName.SHORT.preview).toBe('***');

    expect(entriesByName.SECRET.hasValue).toBe(true);
    expect(entriesByName.FALLBACK.hasValue).toBe(true);
    expect(entriesByName.SHORT.hasValue).toBe(true);

    expect(state.metadata.storePath).toBe('config/.env.managed');
    expect(state.metadata.lastModified).toBe('2024-01-02T03:04:05.000Z');

    expect(fs.statSync).toHaveBeenCalledWith(path.join(process.cwd(), 'config', '.env.managed'));
    expect(state.groups[0].entries).toHaveLength(3);
  });

  it('updateValues normalizes entries, removes blanks, and reloads config', async () => {
    config.dashboard.managedKeys = ['SECRET', 'REMOVE', 'NUMERIC'];

    mockManagedEnv.loadFromDiskSync.mockReturnValue({ SECRET: 'old-secret', REMOVE: 'keep-me' });

    process.env.SECRET = 'old-secret';
    process.env.REMOVE = 'keep-me';

    const state = await configDashboardService.updateValues({
      SECRET: 'newSecret',
      REMOVE: '',
      NUMERIC: 42,
      UNUSED: 'ignored'
    });

    expect(mockManagedEnv.write).toHaveBeenCalledWith({ SECRET: 'newSecret', NUMERIC: '42' });
    expect(config.reload).toHaveBeenCalledTimes(1);
    expect(process.env.SECRET).toBe('newSecret');
    expect(process.env.REMOVE).toBeUndefined();
    expect(process.env.NUMERIC).toBe('42');

    const entriesByName = Object.fromEntries(state.entries.map((entry) => [entry.name, entry]));

    expect(entriesByName.SECRET.preview).toBe('*****cret');
    expect(entriesByName.SECRET.hasValue).toBe(true);

    expect(entriesByName.REMOVE.preview).toBeNull();
    expect(entriesByName.REMOVE.hasValue).toBe(false);

    expect(entriesByName.NUMERIC.preview).toBe('**');
    expect(entriesByName.NUMERIC.hasValue).toBe(true);
  });

  it('throws an error when payload is not a plain object', async () => {
    await expect(configDashboardService.updateValues(null)).rejects.toThrow('Invalid payload');
    await expect(configDashboardService.updateValues('string')).rejects.toThrow('Invalid payload');
    await expect(configDashboardService.updateValues([])).rejects.toThrow('Invalid payload');
  });

  it('persists role CRUD and assignments through atomic same-directory replacement', async () => {
    config.dashboard.managedKeys = ['SECRET'];

    const created = await configDashboardService.createRole({
      name: 'Editor',
      description: 'May edit content',
      permissions: ['content.write', 'content.write', 'content.read']
    });

    expect(created.role).toEqual({
      id: 'editor',
      name: 'Editor',
      description: 'May edit content',
      permissions: ['content.write', 'content.read']
    });
    const [temporaryPath, storePath] = fs.promises.rename.mock.calls[0];
    expect(path.dirname(temporaryPath)).toBe(path.dirname(storePath));
    expect(path.basename(temporaryPath)).toMatch(/^\.dashboard-roles\.json\..+\.tmp$/);
    expect(path.basename(storePath)).toBe('dashboard-roles.json');
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      temporaryPath,
      expect.stringContaining('"id": "editor"'),
      { mode: 0o600, flag: 'wx' }
    );

    const assigned = await configDashboardService.updateValues(
      {},
      { assignments: { SECRET: ['missing', 'editor', 'editor'] } }
    );
    expect(assigned.roleAssignments).toEqual({ SECRET: ['editor'] });

    const updated = await configDashboardService.updateRole('editor', {
      name: 'Senior Editor',
      permissions: ['content.publish']
    });
    expect(updated.role).toEqual(
      expect.objectContaining({ id: 'editor', name: 'Senior Editor', permissions: ['content.publish'] })
    );
    expect(configDashboardService.listRoles().assignments).toEqual({ SECRET: ['editor'] });

    const deleted = await configDashboardService.deleteRole('editor');
    expect(deleted.role.id).toBe('editor');
    expect(deleted.roles).toEqual([]);
    expect(deleted.assignments).toEqual({});
  });

  it('fails closed on a corrupt role store and can replace it atomically', async () => {
    rolesStoreContent = '{not-json';
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    expect(configDashboardService.listRoles()).toEqual({ roles: [], assignments: {} });
    expect(warnSpy).toHaveBeenCalledWith(
      '[configDashboardService] Failed to read roles store:',
      expect.any(String)
    );

    await configDashboardService.createRole({ name: 'Recovery' });
    expect(configDashboardService.listRoles()).toEqual({
      roles: [expect.objectContaining({ id: 'recovery', name: 'Recovery' })],
      assignments: {}
    });
  });

  it('keeps the prior role store and cleans the temporary file when a write fails', async () => {
    rolesStoreContent = JSON.stringify({
      roles: [{ id: 'existing', name: 'Existing', description: '', permissions: [] }],
      assignments: {}
    });
    fs.promises.writeFile.mockRejectedValueOnce(new Error('disk full'));

    await expect(configDashboardService.createRole({ name: 'New role' })).rejects.toThrow('disk full');

    expect(fs.promises.rename).not.toHaveBeenCalled();
    expect(fs.promises.unlink).toHaveBeenCalledWith(expect.stringMatching(/\.tmp$/));
    expect(configDashboardService.listRoles().roles).toEqual([
      { id: 'existing', name: 'Existing', description: '', permissions: [] }
    ]);
  });
});
