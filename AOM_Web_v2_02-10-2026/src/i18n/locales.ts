// Çok dilli site desteği (18-10-2026). Türkçe hâlâ kök dizinde (önek yok, hiç değişmedi).
// Bu dosya /en, /ru, /ar altındaki yeni [locale] ağacı için ortak tipleri tanımlar.
export const locales = ["en", "ru", "ar"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const rtlLocales: readonly Locale[] = ["ar"];
export function isRtl(locale: Locale): boolean {
  return (rtlLocales as readonly string[]).includes(locale);
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  ar: "العربية",
};

// next/font ile uyumlu HTML lang kodları.
export const htmlLang: Record<Locale, string> = {
  en: "en",
  ru: "ru",
  ar: "ar",
};

// og:locale değerleri (SEO metadata için).
export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  ar: "ar_SA",
};
