const config = require('../config');
const { logger } = require('../lib/logger');
const managedEnv = require('../lib/managedEnv');

function normalizeIp(value) {
  if (!value) {
    return '';
  }

  return value.startsWith('::ffff:') ? value.slice(7) : value;
}

function forbidden(res) {
  res.status(403).json({ error: 'Forbidden' });
}

function unauthorized(res) {
  res.set('WWW-Authenticate', 'Basic realm="Config Dashboard"');
  res.status(401).json({ error: 'Unauthorized' });
}

function parseList(value) {
  if (!value) {
    return [];
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function getManagedValue(values, key) {
  return values && Object.prototype.hasOwnProperty.call(values, key) ? values[key] : undefined;
}

function resolveDashboardSettings() {
  const managedValues = managedEnv.loadFromDiskSync();
  const enabledOverride =
    process.env.CONFIG_DASHBOARD_ENABLED ??
    getManagedValue(managedValues, 'CONFIG_DASHBOARD_ENABLED');
  const username =
    process.env.CONFIG_DASHBOARD_USER ??
    getManagedValue(managedValues, 'CONFIG_DASHBOARD_USER') ??
    config.dashboard.username;
  const password =
    process.env.CONFIG_DASHBOARD_PASS ??
    getManagedValue(managedValues, 'CONFIG_DASHBOARD_PASS') ??
    config.dashboard.password;
  const allowedIps =
    parseList(process.env.CONFIG_DASHBOARD_ALLOWED_IPS).length
      ? parseList(process.env.CONFIG_DASHBOARD_ALLOWED_IPS)
      : parseList(getManagedValue(managedValues, 'CONFIG_DASHBOARD_ALLOWED_IPS')).length
        ? parseList(getManagedValue(managedValues, 'CONFIG_DASHBOARD_ALLOWED_IPS'))
        : config.dashboard.allowedIps || [];

  const enabled =
    enabledOverride === 'false'
      ? false
      : enabledOverride === 'true'
        ? Boolean(username && password)
        : Boolean(config.dashboard.enabled);

  return {
    enabled,
    username,
    password,
    allowedIps
  };
}

function dashboardAuth(req, res, next) {
  const dashboardSettings = resolveDashboardSettings();
  const requestLogger = logger.child({
    middleware: 'dashboardAuth',
    method: req.method,
    path: req.originalUrl
  });

  requestLogger.debug('Validating dashboard request');

  if (!dashboardSettings.enabled) {
    requestLogger.info('Dashboard requested while disabled');
    res.status(404).json({ error: 'Config dashboard disabled' });
    return;
  }

  const { authorization } = req.headers || {};

  if (!authorization || !authorization.startsWith('Basic ')) {
    requestLogger.warn('Dashboard authorization header missing');
    unauthorized(res);
    return;
  }

  const base64Credentials = authorization.replace(/^Basic\s+/i, '').trim();

  let decoded = '';
  try {
    decoded = Buffer.from(base64Credentials, 'base64').toString('utf8');
  } catch (_error) {
    requestLogger.warn('Dashboard authorization header not valid base64');
    unauthorized(res);
    return;
  }

  const separatorIndex = decoded.indexOf(':');

  if (separatorIndex === -1) {
    requestLogger.warn('Dashboard authorization header missing separator');
    unauthorized(res);
    return;
  }

  const username = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  if (username !== dashboardSettings.username || password !== dashboardSettings.password) {
    requestLogger.warn('Dashboard authentication failed');
    unauthorized(res);
    return;
  }

  if (dashboardSettings.allowedIps.length) {
    const requestIp = normalizeIp(req.ip || req.connection?.remoteAddress);
    const allowedIps = dashboardSettings.allowedIps.map(normalizeIp);
    if (!allowedIps.includes(requestIp)) {
      requestLogger.warn('Dashboard access denied due to IP restriction', { requestIp });
      forbidden(res);
      return;
    }
  }

  requestLogger.debug('Dashboard authentication succeeded');
  next();
}

module.exports = dashboardAuth;
