const CONSENT_STORAGE_KEY = 'mr-dj-consent-preferences';
let storageWriteFailed = false;

export type ConsentPreferences = {
  statistics: boolean;
  marketing: boolean;
};

const deniedPreferences: ConsentPreferences = {
  statistics: false,
  marketing: false,
};

function readStoredConsentPreferences(): ConsentPreferences {
  if (typeof window === 'undefined') return deniedPreferences;

  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return deniedPreferences;

    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== 'object' || parsed === null) return deniedPreferences;

    const preferences = parsed as Record<string, unknown>;
    return {
      statistics: preferences.statistics === true,
      marketing: preferences.marketing === true,
    };
  } catch {
    return deniedPreferences;
  }
}

export function readConsentPreferences(): ConsentPreferences {
  return storageWriteFailed ? deniedPreferences : readStoredConsentPreferences();
}

export function hasStatisticsConsent(): boolean {
  return readConsentPreferences().statistics;
}

export function saveStatisticsConsent(statistics: boolean): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;

  try {
    const current = readStoredConsentPreferences();
    const next = {
      statistics,
      marketing: current.marketing,
      updatedAt: new Date().toISOString(),
    };
    const serialized = JSON.stringify(next);

    window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
    if (window.localStorage.getItem(CONSENT_STORAGE_KEY) !== serialized) {
      storageWriteFailed = true;
      return null;
    }

    storageWriteFailed = false;
    return { statistics: next.statistics, marketing: next.marketing };
  } catch {
    storageWriteFailed = true;
    return null;
  }
}
