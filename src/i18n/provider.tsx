"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { defaultLocale, getTranslations, type Locale } from "./index";

const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({
  locale: defaultLocale,
  setLocale: () => undefined,
});

export function LocaleProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState(initialLocale);
  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
  };
  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() { return useContext(LocaleContext); }
export function useTranslations() { return getTranslations(useLocale().locale); }
