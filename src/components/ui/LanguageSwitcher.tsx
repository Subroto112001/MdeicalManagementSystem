"use client";
import { useLocale, useTranslations } from "@/i18n/provider";
import type { Locale } from "@/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();
  return <label className="inline-flex items-center gap-2 text-sm"><span>{t.common.language}</span><select aria-label={t.common.language} value={locale} onChange={(event) => setLocale(event.target.value as Locale)} className="rounded-lg border border-border bg-white px-3 py-2"><option value="en">{t.common.english}</option><option value="bn">{t.common.bangla}</option></select></label>;
}
