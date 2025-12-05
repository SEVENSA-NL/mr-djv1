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
export function getNestedValue(
  obj: Record<string, any>,
  path: string
): any {
  return path
    .split('.')
    .reduce((current, prop) => current?.[prop], obj);
}
