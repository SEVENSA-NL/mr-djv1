/**
 * Spam Protection Utilities
 * Multiple layers of spam detection for booking forms
 */

/**
 * Honeypot Field Detector
 * Checks if the honeypot field has been filled (indicating a bot)
 */
export function checkHoneypot(honeypotValue: string): boolean {
  return honeypotValue !== undefined && honeypotValue.length > 0;
}

/**
 * Submission Time Validator
 * Checks if form was submitted too quickly (indicating a bot)
 */
export class SubmissionTimeValidator {
  private startTime: number;
  private minSubmissionTime: number; // milliseconds

  constructor(minSubmissionTime: number = 3000) {
    this.startTime = Date.now();
    this.minSubmissionTime = minSubmissionTime;
  }

  /**
   * Check if enough time has passed since form initialization
   */
  isValid(): boolean {
    const elapsed = Date.now() - this.startTime;
    return elapsed >= this.minSubmissionTime;
  }

  /**
   * Get elapsed time in seconds
   */
  getElapsedTime(): number {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }
}

/**
 * Email Domain Validator
 * Checks for disposable/temporary email domains
 */
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'mailinator.com',
  'throwaway.email',
  'temp-mail.org',
  'fakeinbox.com',
  'yopmail.com',
  'trashmail.com',
  'maildrop.cc',
];

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  return DISPOSABLE_EMAIL_DOMAINS.some((disposableDomain) =>
    domain.includes(disposableDomain)
  );
}

/**
 * Suspicious Pattern Detector
 * Checks for common spam patterns in text
 */
const SPAM_PATTERNS = [
  /viagra/gi,
  /cialis/gi,
  /casino/gi,
  /lottery/gi,
  /crypto/gi,
  /bitcoin/gi,
  /\$\$\$/g,
  /click here/gi,
  /buy now/gi,
  /limited offer/gi,
  /act now/gi,
  /http[s]?:\/\//gi, // URLs in messages
];

export function containsSpamPatterns(text: string): boolean {
  return SPAM_PATTERNS.some((pattern) => pattern.test(text));
}

/**
 * Form Field Validator
 * Checks for suspicious patterns across all form fields
 */
export function validateFormFields(data: Record<string, unknown>): {
  isValid: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  // Check for duplicate values across fields
  const values = Object.values(data).filter((v) => typeof v === 'string') as string[];
  const uniqueValues = new Set(values);
  if (values.length > 0 && uniqueValues.size === 1) {
    reasons.push('All fields contain identical values');
  }

  // Check for excessive capitalization
  const textFields = values.filter((v) => v.length > 10);
  const allCaps = textFields.some((text) => {
    const letters = text.replace(/[^a-zA-Z]/g, '');
    const capitals = text.replace(/[^A-Z]/g, '');
    return letters.length > 0 && capitals.length / letters.length > 0.7;
  });
  if (allCaps) {
    reasons.push('Excessive capitalization detected');
  }

  // Check for spam patterns in text fields
  const hasSpam = textFields.some(containsSpamPatterns);
  if (hasSpam) {
    reasons.push('Spam keywords detected');
  }

  // Check email if present
  if (typeof data.email === 'string' && isDisposableEmail(data.email)) {
    reasons.push('Disposable email address detected');
  }

  return {
    isValid: reasons.length === 0,
    reasons,
  };
}

/**
 * Browser Fingerprint Validator
 * Basic client-side fingerprinting
 */
export function getBrowserFingerprint(): string {
  if (typeof window === 'undefined') return 'server';

  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${window.screen.width}x${window.screen.height}`,
    colorDepth: window.screen.colorDepth,
  };

  // Simple hash function
  const str = JSON.stringify(fingerprint);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash.toString(36);
}

/**
 * Comprehensive Spam Check
 * Combines all spam detection methods
 */
export interface SpamCheckResult {
  isSpam: boolean;
  confidence: number; // 0-100
  reasons: string[];
  fingerprint: string;
}

export function performSpamCheck(
  formData: Record<string, unknown>,
  submissionTimeValidator?: SubmissionTimeValidator
): SpamCheckResult {
  const reasons: string[] = [];
  let spamScore = 0;

  // Check honeypot
  if (typeof formData.website === 'string' && checkHoneypot(formData.website)) {
    reasons.push('Honeypot field filled');
    spamScore += 100; // Instant spam
  }

  // Check submission time
  if (submissionTimeValidator && !submissionTimeValidator.isValid()) {
    reasons.push(
      `Submitted too quickly (${submissionTimeValidator.getElapsedTime()}s)`
    );
    spamScore += 50;
  }

  // Check form fields
  const fieldValidation = validateFormFields(formData);
  if (!fieldValidation.isValid) {
    reasons.push(...fieldValidation.reasons);
    spamScore += fieldValidation.reasons.length * 25;
  }

  // Get fingerprint
  const fingerprint = getBrowserFingerprint();

  return {
    isSpam: spamScore >= 50,
    confidence: Math.min(100, spamScore),
    reasons,
    fingerprint,
  };
}

export default {
  checkHoneypot,
  SubmissionTimeValidator,
  isDisposableEmail,
  containsSpamPatterns,
  validateFormFields,
  getBrowserFingerprint,
  performSpamCheck,
};
