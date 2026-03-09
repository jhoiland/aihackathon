import { useCallback, useEffect, useState } from 'react';
import en from './translations/en.json';
import no from './translations/no.json';

type Translation = typeof en;

const TRANSLATIONS: Record<string, Translation> = {
  en,
  no,
};

type NestedKeys<T> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? `${string & K}.${string & NestedKeys<T[K]>}`
    : `${string & K}`;
}[keyof T];

/**
 * Hook for accessing translations
 * Automatically detects user's browser language
 * Supports: English (en), Norwegian (no)
 * Falls back to English if browser language not supported
 */
export function useTranslation() {
  const [locale, setLocale] = useState<'en' | 'no'>('en');

  useEffect(() => {
    // Detect browser language on client side only
    const browserLang = navigator.language.split('-')[0];
    const supportedLang = browserLang === 'no' ? 'no' : 'en';
    setLocale(supportedLang);

    // Also check localStorage for saved preference
    const savedLocale = localStorage.getItem('locale') as 'en' | 'no' | null;
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  const t = useCallback(
    (key: string, defaultValue?: string): string => {
      const keys = key.split('.');
      let value: any = TRANSLATIONS[locale];

      for (const k of keys) {
        value = value?.[k];
      }

      if (!value && locale !== 'en') {
        // Fallback to English if translation not found
        value = TRANSLATIONS['en'];
        for (const k of keys) {
          value = value?.[k];
        }
      }

      return value || defaultValue || key;
    },
    [locale]
  );

  /**
   * Translate with interpolation support
   * Example: t('home.destinationsFound', { count: 5 })
   * Input: "{count} destination found"
   * Output: "5 destination found"
   */
  const tWithVars = useCallback(
    (key: string, vars?: Record<string, string | number>, defaultValue?: string): string => {
      let text = t(key, defaultValue);

      if (vars) {
        Object.entries(vars).forEach(([varKey, value]) => {
          text = text.replace(`{${varKey}}`, String(value));
        });
      }

      return text;
    },
    [t]
  );

  /**
   * Change locale and save preference
   */
  const setLanguage = useCallback((lang: 'en' | 'no') => {
    setLocale(lang);
    localStorage.setItem('locale', lang);
  }, []);

  /**
   * Get all translations for a nested object
   * Example: getSection('filters.interestOptions')
   */
  const getSection = useCallback(
    (path: string): Record<string, string> => {
      const keys = path.split('.');
      let value: any = TRANSLATIONS[locale];

      for (const k of keys) {
        value = value?.[k];
      }

      return value || {};
    },
    [locale]
  );

  return {
    t,
    tWithVars,
    setLanguage,
    getSection,
    locale,
  };
}
