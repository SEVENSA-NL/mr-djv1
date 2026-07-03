const { logger } = require('./logger');

async function startTelemetry() {
  logger.info('Telemetry disabled for recovery until OpenTelemetry dependencies are reintroduced safely');
}

async function shutdownTelemetry() {
  logger.info('Telemetry shutdown skipped; telemetry is disabled for recovery');
}

module.exports = {
  startTelemetry,
  shutdownTelemetry
};
