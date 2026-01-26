import en from './en.json';
import es from './es.json';

export type Language = 'en' | 'es';

export const translations = {
  en,
  es,
} as const;

type TranslationValue = string | string[] | Record<string, unknown>;

/**
 * Get a nested value from an object using dot notation
 * Example: getNestedValue(translations.en, 'hero.headline1') => "Change Your Direction."
 */
function getNestedValue(obj: Record<string, unknown>, path: string): TranslationValue | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return current as TranslationValue;
}

/**
 * Get translation for a given key
 * Falls back to English if translation not found
 */
export function getTranslation(language: Language, key: string): string {
  const translation = getNestedValue(translations[language], key);

  if (typeof translation === 'string') {
    return translation;
  }

  // Fallback to English if Spanish translation not found
  if (language !== 'en') {
    const fallback = getNestedValue(translations.en, key);
    if (typeof fallback === 'string') {
      return fallback;
    }
  }

  // Return the key if translation not found
  console.warn(`Translation not found for key: ${key}`);
  return key;
}

/**
 * Get translation array for a given key
 */
export function getTranslationArray(language: Language, key: string): string[] {
  const translation = getNestedValue(translations[language], key);

  if (Array.isArray(translation)) {
    return translation as string[];
  }

  // Fallback to English
  if (language !== 'en') {
    const fallback = getNestedValue(translations.en, key);
    if (Array.isArray(fallback)) {
      return fallback as string[];
    }
  }

  console.warn(`Translation array not found for key: ${key}`);
  return [];
}

/**
 * Get browser's preferred language
 */
export function getBrowserLanguage(): Language {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('es')) {
    return 'es';
  }
  return 'en';
}

/**
 * Get saved language preference from localStorage
 */
export function getSavedLanguage(): Language | null {
  const saved = localStorage.getItem('language');
  if (saved === 'en' || saved === 'es') {
    return saved;
  }
  return null;
}

/**
 * Save language preference to localStorage
 */
export function saveLanguage(language: Language): void {
  localStorage.setItem('language', language);
}
