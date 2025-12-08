import { getMessages as getMessagesBase } from 'next-intl/server';

/**
 * Get messages for the current locale
 * Used in server components to access translations
 */
export async function getMessages() {
  return await getMessagesBase();
}

/**
 * Type-safe way to access nested translation keys
 */
export type TranslationKey = string;

/**
 * Helper function to safely access nested translation values
 */
export function getNestedValue<T = unknown>(obj: Record<string, unknown>, path: string): T | undefined {
  return path
    .split('.')
    .reduce<unknown>((current, prop) => {
      if (current && typeof current === 'object' && prop in current) {
        return (current as Record<string, unknown>)[prop];
      }
      return undefined;
    }, obj) as T | undefined;
}
