const os = require('os');
const path = require('path');

const REQUIRED_ENV = Object.freeze({
  NODE_ENV: 'test',
  MRDJ_TEST_EXTERNAL_IO: 'false',
  DATABASE_URL: 'postgres://fixture-user:fixture-password@127.0.0.1:5432/mrdj_test',
  REDIS_URL: 'redis://127.0.0.1:6379/15',
  MAIL_PROVIDER: 'postmark',
  MAIL_API_KEY: 'fixture-mail-api-key',
  MAIL_FROM_ADDRESS: 'noreply@fixture.invalid',
  MAIL_REPLY_TO: 'support@fixture.invalid',
  MAIL_TEMPLATES_CONTACT: 'fixture-contact-template',
  MAIL_TEMPLATES_BOOKING: 'fixture-booking-template',
  RENTGUY_API_BASE_URL: 'https://rentguy.fixture.invalid/api',
  RENTGUY_API_KEY: 'fixture-rentguy-api-key',
  RENTGUY_WORKSPACE_ID: 'fixture-workspace',
  SEVENSA_SUBMIT_URL: 'https://sevensa.fixture.invalid/submit',
  N8N_PERSONALIZATION_WEBHOOK_URL: 'https://n8n.fixture.invalid/personalization',
  N8N_SURVEY_WEBHOOK_URL: 'https://n8n.fixture.invalid/surveys',
  SURVEY_RESPONSE_BASE_URL: 'https://feedback.fixture.invalid/respond',
  SEO_AUTOMATION_API_URL: 'https://seo.fixture.invalid/api',
  SEO_AUTOMATION_API_KEY: 'fixture-seo-api-key',
  SEO_AUTOMATION_KEYWORDSET_ID: 'fixture-keywordset',
  SEO_AUTOMATION_REGION: 'Noord-Brabant',
  SEO_AUTOMATION_APPROVAL_EMAIL: 'marketing@fixture.invalid',
  CITY_AUTOMATION_LLM_PROVIDER: 'fixture-provider',
  CITY_AUTOMATION_LLM_MODEL: 'fixture-model',
  CITY_AUTOMATION_LLM_API_KEY: 'fixture-city-automation-api-key',
  CITY_AUTOMATION_DRY_RUN: 'false'
});

const SAFE_HOST_ENV_KEYS = Object.freeze([
  'CI',
  'PATH',
  'Path',
  'SYSTEMROOT',
  'SystemRoot',
  'TEMP',
  'TMP'
]);

function buildRequiredEnv(overrides = {}) {
  return { ...REQUIRED_ENV, ...overrides };
}

function buildIsolatedEnv(overrides = {}) {
  const hostEnv = {};
  for (const key of SAFE_HOST_ENV_KEYS) {
    if (process.env[key] !== undefined) {
      hostEnv[key] = process.env[key];
    }
  }

  return buildRequiredEnv({
    ...hostEnv,
    CONFIG_DASHBOARD_STORE_PATH: path.join(
      os.tmpdir(),
      `mr-dj-jest-managed-env-${process.pid}.env`
    ),
    ...overrides
  });
}

module.exports = {
  REQUIRED_ENV,
  buildRequiredEnv,
  buildIsolatedEnv
};
