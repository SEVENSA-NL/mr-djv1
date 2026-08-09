const net = require('net');
const { buildIsolatedEnv } = require('./src/testUtils/env');

process.env = buildIsolatedEnv();

const LOOPBACK_HOSTS = new Set(['127.0.0.1', '::1', 'localhost']);

function resolveHost(args) {
  const first = args[0];

  if (typeof first === 'object' && first !== null) {
    return first.host || first.hostname || 'localhost';
  }

  if (typeof args[1] === 'string') {
    return args[1];
  }

  return 'localhost';
}

function guardConnection(original) {
  return function guardedConnection(...args) {
    const host = resolveHost(args);
    if (!LOOPBACK_HOSTS.has(host)) {
      throw new Error(`External network disabled in Jest: ${host}`);
    }

    return original.apply(this, args);
  };
}

net.connect = guardConnection(net.connect);
net.createConnection = guardConnection(net.createConnection);

if (typeof global.fetch === 'function') {
  const originalFetch = global.fetch;
  global.fetch = function guardedFetch(input, init) {
    const value = typeof input === 'string' || input instanceof URL ? input : input.url;
    const url = new URL(value);
    if (!LOOPBACK_HOSTS.has(url.hostname)) {
      return Promise.reject(new Error(`External network disabled in Jest: ${url.hostname}`));
    }

    return originalFetch.call(this, input, init);
  };
}
