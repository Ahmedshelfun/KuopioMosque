import { Language } from "./types";

// Format date according to language
export function formatDate(date: Date, language: Language): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const locales: Record<Language, string> = {
    en: 'en-US',
    fi: 'fi-FI',
    ar: 'ar-SA',
  };
  
  return date.toLocaleDateString(locales[language], options);
}

// Get document direction based on language
export function getDirection(language: Language): 'ltr' | 'rtl' {
  return language === 'ar' ? 'rtl' : 'ltr';
}

// Get font family based on language
export function getFontFamily(language: Language): string {
  return language === 'ar' ? 'font-arabic' : 'font-sans';
}
