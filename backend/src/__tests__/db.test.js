const { buildRequiredEnv } = require('../testUtils/env');

const ORIGINAL_ENV = { ...process.env };
function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}

describe('database helper', () => {
  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('returns null when external database I/O is disabled in tests', async () => {
    process.env = buildRequiredEnv({ MRDJ_TEST_EXTERNAL_IO: 'false' });
    const db = require('../lib/db');

    expect(db.isConfigured()).toBe(false);
    expect(db.getPool()).toBeNull();
    await expect(db.runQuery('SELECT 1')).resolves.toBeNull();
  });

  it('creates a pool and tracks connectivity status', async () => {
    jest.resetModules();
    process.env = buildRequiredEnv({
      DATABASE_URL: 'postgres://example',
      MRDJ_TEST_EXTERNAL_IO: 'true'
    });

    const release = jest.fn();
    const query = jest.fn().mockResolvedValue({ rows: [{ value: 1 }] });
    const connect = jest.fn().mockResolvedValue({ release });
    const handlers = {};
    const on = jest.fn((event, handler) => {
      handlers[event] = handler;
    });

    jest.doMock('pg', () => ({
      Pool: jest.fn(() => ({ query, connect, on }))
    }));

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const db = require('../lib/db');
    await flushPromises();
    warnSpy.mockClear();

    expect(db.isConfigured()).toBe(true);
    expect(db.getPool()).toBeDefined();
    expect(connect).toHaveBeenCalledTimes(1);

    const result = await db.runQuery('SELECT 1');
    expect(query).toHaveBeenCalledWith('SELECT 1', []);
    expect(result.rows[0].value).toBe(1);
    expect(db.getStatus().connected).toBe(true);

    const failure = new Error('boom');
    query.mockRejectedValueOnce(failure);

    await expect(db.runQuery('SELECT * FROM fail')).rejects.toThrow('boom');
    expect(db.getStatus().connected).toBe(false);
    expect(db.getStatus().lastError).toBe('boom');

    handlers.error(new Error('unexpected failure'));
    expect(errorSpy).toHaveBeenCalledWith('[db] Unexpected database error:', expect.any(Error));

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('logs an initial connection failure gracefully', async () => {
    jest.resetModules();
    process.env = buildRequiredEnv({
      DATABASE_URL: 'postgres://example',
      MRDJ_TEST_EXTERNAL_IO: 'true'
    });

    const connectError = new Error('initial failure');
    const connect = jest.fn().mockRejectedValue(connectError);
    const query = jest.fn().mockResolvedValue({ rows: [] });
    const on = jest.fn();

    jest.doMock('pg', () => ({
      Pool: jest.fn(() => ({ query, connect, on }))
    }));

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const db = require('../lib/db');
    warnSpy.mockClear();
    db.getPool();
    await flushPromises();

    expect(warnSpy).toHaveBeenCalledWith('[db] Initial database connection failed:', 'initial failure');
  });

  it('disposes the pool when configuration is removed', async () => {
    jest.resetModules();
    process.env = buildRequiredEnv({
      DATABASE_URL: 'postgres://initial',
      MRDJ_TEST_EXTERNAL_IO: 'true'
    });

    const poolInstances = [];
    jest.doMock('pg', () => ({
      Pool: jest.fn(() => {
        const instance = {
          query: jest.fn().mockResolvedValue({ rows: [] }),
          connect: jest.fn().mockResolvedValue({ release: jest.fn() }),
          on: jest.fn(),
          end: jest.fn().mockResolvedValue()
        };
        poolInstances.push(instance);
        return instance;
      })
    }));

    const db = require('../lib/db');
    db.getPool();
    await flushPromises();

    process.env.MRDJ_TEST_EXTERNAL_IO = 'false';
    const config = require('../config');
    config.reload();

    db.isConfigured();
    await flushPromises();

    expect(poolInstances[0].end).toHaveBeenCalledTimes(1);
    expect(db.isConfigured()).toBe(false);
    expect(db.getPool()).toBeNull();
  });

  it('recreates the pool when the connection string changes', async () => {
    jest.resetModules();
    process.env = buildRequiredEnv({
      DATABASE_URL: 'postgres://initial',
      MRDJ_TEST_EXTERNAL_IO: 'true'
    });

    const poolInstances = [];
    jest.doMock('pg', () => ({
      Pool: jest.fn(() => {
        const instance = {
          query: jest.fn().mockResolvedValue({ rows: [] }),
          connect: jest.fn().mockResolvedValue({ release: jest.fn() }),
          on: jest.fn(),
          end: jest.fn().mockResolvedValue()
        };
        poolInstances.push(instance);
        return instance;
      })
    }));

    const db = require('../lib/db');
    db.getPool();
    await flushPromises();

    process.env = buildRequiredEnv({
      DATABASE_URL: 'postgres://next',
      MRDJ_TEST_EXTERNAL_IO: 'true'
    });
    const config = require('../config');
    config.reload();

    const pool = db.getPool();
    await flushPromises();

    expect(poolInstances[0].end).toHaveBeenCalledTimes(1);
    expect(poolInstances).toHaveLength(2);
    expect(pool).toBe(poolInstances[1]);
  });
});
