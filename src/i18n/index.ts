import en from "./messages/en";
import bn from "./messages/bn";

export const locales = ["en", "bn"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const messages = { en, bn } as const;

export function getTranslations(locale: Locale = defaultLocale) {
  return messages[locale];
}

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}
