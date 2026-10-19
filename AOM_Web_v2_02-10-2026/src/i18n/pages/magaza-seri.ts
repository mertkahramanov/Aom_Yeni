// /magaza/seri/[seri] sayfasının çok dilli yardımcıları (19-10-2026). Türkçe sayfa değişmedi.
// Kapsam: seri sayfası başlığındaki "tür" etiketi (kindLabel — ör. "Sıcaklık Kontrol Cihazı",
// "Hız Kontrol Cihazı") kontrol.ts (10 değer) ve yedek-parca.ts (20 değer) kaynaklı, bounded bir
// settir (kategori adlarıyla aynı statüde) — bu yüzden çevrildi. Seri adı (s.title — ör. "DPU3",
// "TK4S") ve tablodaki model/akım/gövde/seçenek DEĞERLERİ (ürüne özel teknik veri) Türkçe kalır;
// yalnızca tablo başlıkları ve sayfa çevresi (breadcrumb, eyebrow, buton, KDV notu) çevrildi.
// Bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md.
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

// Varsayılan iki "tür" (first.kindLabel yoksa, kategoriye göre seçilir)
export const DEFAULT_KIND_THYRISTOR: L3 = {
  en: "Thyristor Power Control Unit",
  ru: "Тиристорный регулятор мощности",
  ar: "وحدة تحكم الطاقة الثايرستورية",
};
export const DEFAULT_KIND_SSR: L3 = {
  en: "Solid State Relay (SSR)",
  ru: "Твердотельное реле (SSR)",
  ar: "مرحل الحالة الصلبة (SSR)",
};

// kontrol.ts (Autonics kontrol cihazları serilerinin tekil "kind" alanı, 10 değer) + yedek-parca.ts
// KIND map'i (20 değer). Anahtarlar TR kaynak metinle birebir eşleşir.
export const SERIES_KIND_TITLES: Record<string, L3> = {
  // kontrol.ts — autonics-kontrol_03-10-2026.json "series[].kind"
  "Dijital Ekran Birimi": { en: "Digital Display Unit", ru: "Цифровой дисплейный блок", ar: "وحدة عرض رقمية" },
  "Dijital Panel Metre": { en: "Digital Panel Meter", ru: "Цифровой панельный измеритель", ar: "جهاز قياس رقمي للوحة" },
  "Grafik Panel (HMI)": { en: "Graphic Panel (HMI)", ru: "Графическая панель (HMI)", ar: "لوحة رسومية (HMI)" },
  Gösterge: { en: "Display", ru: "Индикатор", ar: "شاشة عرض" },
  "Kayıt Cihazı": { en: "Recorder", ru: "Регистратор", ar: "جهاز تسجيل" },
  "Panel PC": { en: "Panel PC", ru: "Панельный компьютер", ar: "حاسوب لوحي صناعي (Panel PC)" },
  Sayıcı: { en: "Counter", ru: "Счётчик", ar: "عداد" },
  "Sensör Kontrol Cihazı": { en: "Sensor Controller", ru: "Контроллер датчика", ar: "جهاز تحكم بالحساس" },
  "Sıcaklık Kontrol Cihazı": { en: "Temperature Controller", ru: "Регулятор температуры", ar: "متحكم حرارة" },
  Zamanlayıcı: { en: "Timer", ru: "Таймер", ar: "مؤقت" },
  // yedek-parca.ts KIND map
  "Hız Kontrol Cihazı": { en: "Speed Controller", ru: "Регулятор скорости", ar: "جهاز تحكم بالسرعة" },
  "Yumuşak Yol Verici": { en: "Soft Starter", ru: "Устройство плавного пуска", ar: "بادئ تشغيل ناعم" },
  "Fren Ünitesi": { en: "Brake Unit", ru: "Тормозной блок", ar: "وحدة الفرملة" },
  "Güvenlik Rölesi": { en: "Safety Relay", ru: "Реле безопасности", ar: "مرحل سلامة" },
  "DC Motor Sürücü": { en: "DC Motor Drive", ru: "Привод двигателя постоянного тока", ar: "مشغل محرك تيار مستمر" },
  "Spindle Motor": { en: "Spindle Motor", ru: "Шпиндельный двигатель", ar: "محرك المغزل (Spindle)" },
  "Step Motor ve Sürücü": { en: "Stepper Motor & Drive", ru: "Шаговый двигатель и привод", ar: "محرك خطوي ووحدة تشغيله" },
  "Şalt Ürünü": { en: "Switchgear Product", ru: "Коммутационное изделие", ar: "منتج تحويل كهربائي" },
  "Güç Kaynağı": { en: "Power Supply", ru: "Источник питания", ar: "مزود طاقة" },
  Enkoder: { en: "Encoder", ru: "Энкодер", ar: "إنكودر" },
  "CNC Kontrol Ünitesi": { en: "CNC Control Unit", ru: "Блок управления ЧПУ", ar: "وحدة تحكم CNC" },
  "Lineer Hareket Elemanı": { en: "Linear Motion Component", ru: "Элемент линейного перемещения", ar: "عنصر حركة خطية" },
  "Güç Aktarma Elemanı": { en: "Power Transmission Component", ru: "Элемент передачи мощности", ar: "عنصر نقل الحركة" },
  "Torna Aynası / Pens": { en: "Lathe Chuck / Collet", ru: "Токарный патрон / цанга", ar: "ظرف خراطة / بنسة تثبيت" },
  Röle: { en: "Relay", ru: "Реле", ar: "مرحل" },
  "Solid State Röle (SSR)": DEFAULT_KIND_SSR,
  Fan: { en: "Fan", ru: "Вентилятор", ar: "مروحة" },
  Rulman: { en: "Bearing", ru: "Подшипник", ar: "محمل (بيرينغ)" },
  "Vakum / Toz Emme Ürünü": { en: "Vacuum / Dust Extraction Product", ru: "Вакуумное/пылеотсасывающее изделие", ar: "منتج تفريغ/شفط غبار" },
  "Sigma Profil": { en: "Sigma Profile", ru: "Sigma-профиль", ar: "بروفايل Sigma" },
};

/** kindLabel varsa çevirir (bulunamazsa TR'yi olduğu gibi döner); yoksa kategoriye göre varsayılan döner. */
export function translateSeriesKind(kindLabel: string | undefined, category: string, locale: Locale): string {
  if (kindLabel) return SERIES_KIND_TITLES[kindLabel]?.[locale] ?? kindLabel;
  return category.startsWith("Solid") ? DEFAULT_KIND_SSR[locale] : DEFAULT_KIND_THYRISTOR[locale];
}

export type SeriesPageUi = {
  colModel: string;
  colAmp: string;
  colBody: string;
  colOption: string;
  colPrice: string;
  priceVatSuffix: string; // "+ KDV" karşılığı, fiyatın yanına eklenir
  requestQuoteCell: string; // fiyatsız modellerde hücre metni
  dpuNote: string; // autonics-dpu3 serisi özel notu (link ayrıca render edilir)
};

export const SERIES_PAGE_UI: Record<Locale, SeriesPageUi> = {
  en: {
    colModel: "Model",
    colAmp: "Current",
    colBody: "Body",
    colOption: "Option",
    colPrice: "Price",
    priceVatSuffix: " + VAT",
    requestQuoteCell: "Request a quote",
    dpuNote: "This page lists models sold with price. For all 840 order codes of the DPU series:",
  },
  ru: {
    colModel: "Модель",
    colAmp: "Ток",
    colBody: "Корпус",
    colOption: "Опция",
    colPrice: "Цена",
    priceVatSuffix: " + НДС",
    requestQuoteCell: "Запросить предложение",
    dpuNote: "На этой странице перечислены модели с указанной ценой. Для всех 840 кодов заказа серии DPU:",
  },
  ar: {
    colModel: "الموديل",
    colAmp: "التيار",
    colBody: "الهيكل",
    colOption: "خيار",
    colPrice: "السعر",
    priceVatSuffix: " + ضريبة",
    requestQuoteCell: "اطلب عرض سعر",
    dpuNote: "تحتوي هذه الصفحة على الموديلات المعروضة بسعرها. لجميع رموز الطلب الـ840 لسلسلة DPU:",
  },
};

/** generateMetadata başlığı: "{title} {kind} Modelleri | Ankara" karşılığı. */
export function seriesMetaTitle(title: string, kind: string, locale: Locale): string {
  if (locale === "ru") return `${title} ${kind} — модели | Анкара`;
  if (locale === "ar") return `موديلات ${title} ${kind} | أنقرة`;
  return `${title} ${kind} Models | Ankara`;
}

/** generateMetadata açıklaması. hasKindLabel true ise "A" aralığı yerine kind kullanılır. */
export function seriesMetaDescription(
  locale: Locale,
  opts: { title: string; kind: string; count: number; hasKindLabel: boolean; minAmp: number; maxAmp: number; regionLine: string }
): string {
  const { title, kind, count, hasKindLabel, minAmp, maxAmp, regionLine } = opts;
  if (locale === "ru") {
    return hasKindLabel
      ? `Серия ${title}, ${kind.toLocaleLowerCase("ru-RU")}: ${count} моделей. Технические характеристики и предложение. ${regionLine}`
      : `Серия ${title}, ${kind.toLocaleLowerCase("ru-RU")}: ${count} моделей, ${minAmp}–${maxAmp} А. Технические характеристики и цены (без НДС). ${regionLine}`;
  }
  if (locale === "ar") {
    return hasKindLabel
      ? `سلسلة ${title} ${kind}: ${count} موديل. المواصفات الفنية وطلب عرض سعر. ${regionLine}`
      : `سلسلة ${title} ${kind}: ${count} موديل، ${minAmp}–${maxAmp} أمبير. المواصفات الفنية والأسعار (غير شاملة الضريبة). ${regionLine}`;
  }
  return hasKindLabel
    ? `${title} series ${kind.toLocaleLowerCase("en-US")}: ${count} models. Technical specifications and quotes. ${regionLine}`
    : `${title} series ${kind.toLocaleLowerCase("en-US")}: ${count} models, ${minAmp}–${maxAmp} A. Technical specifications and prices (excl. VAT). ${regionLine}`;
}
