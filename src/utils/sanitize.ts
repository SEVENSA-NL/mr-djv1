/**
 * Simple HTML sanitizer that strips script tags and dangerous attributes
 * from user input before processing.
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";

  let sanitized = input;

  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // Remove event handler attributes (onclick, onerror, onload, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, "");

  // Remove javascript: protocol URLs
  sanitized = sanitized.replace(/javascript\s*:/gi, "");

  // Remove data: protocol URLs (potential XSS vector)
  sanitized = sanitized.replace(/data\s*:\s*text\/html/gi, "");

  // Remove remaining HTML tags
  sanitized = sanitized.replace(/<\/?[^>]+(>|$)/g, "");

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

/**
 * Sanitize all string values in a form data object.
 */
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized = { ...data };

  for (const key of Object.keys(sanitized)) {
    const value = sanitized[key];
    if (typeof value === "string") {
      (sanitized as Record<string, unknown>)[key] = sanitizeInput(value);
    }
  }

  return sanitized;
}
