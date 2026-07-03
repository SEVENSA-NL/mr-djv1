describe('telemetry bootstrap', () => {
  const loadTelemetry = () => {
    const logger = { info: jest.fn(), error: jest.fn() };
    jest.doMock('../lib/logger', () => ({ logger }));

    const telemetry = require('../lib/telemetry');
    return { telemetry, logger };
  };

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('keeps telemetry disabled during recovery', async () => {
    const { telemetry, logger } = loadTelemetry();

    await telemetry.startTelemetry();

    expect(logger.info).toHaveBeenCalledWith(
      'Telemetry disabled for recovery until OpenTelemetry dependencies are reintroduced safely'
    );
  });

  it('shutdown is a safe no-op', async () => {
    const { telemetry, logger } = loadTelemetry();

    await telemetry.shutdownTelemetry();

    expect(logger.info).toHaveBeenCalledWith('Telemetry shutdown skipped; telemetry is disabled for recovery');
  });
});
