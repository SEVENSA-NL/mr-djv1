/**
 * Client-side Rate Limiter
 * Prevents excessive form submissions from the same client
 */

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  storageKey: string;
}

interface RateLimitRecord {
  attempts: number;
  resetAt: number;
}

/**
 * Rate Limiter Class
 */
export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: Partial<RateLimitConfig> = {}) {
    this.config = {
      maxAttempts: config.maxAttempts || 3,
      windowMs: config.windowMs || 60000, // 1 minute
      storageKey: config.storageKey || 'booking_rate_limit',
    };
  }

  /**
   * Check if action is allowed
   */
  isAllowed(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      return true; // Allow if localStorage not available
    }

    const now = Date.now();
    const record = this.getRecord();

    // Reset if window has passed
    if (now > record.resetAt) {
      this.reset();
      return true;
    }

    // Check if under limit
    return record.attempts < this.config.maxAttempts;
  }

  /**
   * Record an attempt
   */
  recordAttempt(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    const now = Date.now();
    const record = this.getRecord();

    // Reset if window has passed
    if (now > record.resetAt) {
      this.setRecord({
        attempts: 1,
        resetAt: now + this.config.windowMs,
      });
    } else {
      // Increment attempts
      this.setRecord({
        attempts: record.attempts + 1,
        resetAt: record.resetAt,
      });
    }
  }

  /**
   * Get remaining attempts
   */
  getRemainingAttempts(): number {
    if (typeof window === 'undefined' || !window.localStorage) {
      return this.config.maxAttempts;
    }

    const now = Date.now();
    const record = this.getRecord();

    // Reset if window has passed
    if (now > record.resetAt) {
      return this.config.maxAttempts;
    }

    return Math.max(0, this.config.maxAttempts - record.attempts);
  }

  /**
   * Get time until reset (in seconds)
   */
  getTimeUntilReset(): number {
    if (typeof window === 'undefined' || !window.localStorage) {
      return 0;
    }

    const now = Date.now();
    const record = this.getRecord();

    if (now > record.resetAt) {
      return 0;
    }

    return Math.ceil((record.resetAt - now) / 1000);
  }

  /**
   * Reset the rate limiter
   */
  reset(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    window.localStorage.removeItem(this.config.storageKey);
  }

  /**
   * Get stored record
   */
  private getRecord(): RateLimitRecord {
    if (typeof window === 'undefined' || !window.localStorage) {
      return { attempts: 0, resetAt: Date.now() + this.config.windowMs };
    }

    try {
      const stored = window.localStorage.getItem(this.config.storageKey);
      if (!stored) {
        return { attempts: 0, resetAt: Date.now() + this.config.windowMs };
      }

      return JSON.parse(stored);
    } catch (error) {
      console.error('Error reading rate limit record:', error);
      return { attempts: 0, resetAt: Date.now() + this.config.windowMs };
    }
  }

  /**
   * Store record
   */
  private setRecord(record: RateLimitRecord): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      window.localStorage.setItem(this.config.storageKey, JSON.stringify(record));
    } catch (error) {
      console.error('Error storing rate limit record:', error);
    }
  }
}

/**
 * Default rate limiter instance for booking forms
 */
export const bookingRateLimiter = new RateLimiter({
  maxAttempts: 3,
  windowMs: 60000, // 1 minute
  storageKey: 'booking_rate_limit',
});

export default RateLimiter;
