// /magaza/step-motor-kodlari ve /magaza/step-motor-kodlari/[seri] sayfalarının çok dilli arayüz
// metinleri (23-10-2026). Türkçe sayfalar değişmedi.
//
// Bu dosya, src/data/autonics-step-motor_23-10-2026.ts verisine özeldir ve src/i18n/pages/magaza-kodlari.ts
// dosyasına (başka ajanlar eşzamanlı yazıyor olabileceği için) DOKUNMADAN, ondan yalnızca genel/ortak
// alanları (modelCode, quote, price, priceOnRequest, email, whatsapp, productPage, requestForCode,
// waMessage, otherSeriesSameCategoryAria, commonToAllCodes) salt okunur olarak import edip kullanır.
// Kapsam (Option A sınırı, diğer kod sayfalarıyla tutarlı): sayfa çevresi çevrilir; s.desc, s.common ve
// s.cols seriye özel teknik içerik olarak Türkçe kalır (bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md).
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

export const STEP_MOTOR_PAGE_UI: Record<
  Locale,
  {
    label: string; // "Step motor codes" vb.
    text: string; // index sayfası giriş paragrafı
    eyebrow: string; // "Step motors · supply"
    sourceCaption: string;
  }
> = {
  en: {
    label: "Step Motor Codes",
    text:
      "Autonics step motors — 5-phase standard (AK), built-in brake (AK-B), hollow-shaft (AHK), built-in gear/reduction (AK-G), built-in rotary actuator (AK-R) and 2-phase (AK) families — are not listed as products in the store. All 182 order codes from these families are listed on the series pages below.",
    eyebrow: "Step motors · supply",
    sourceCaption:
      "Codes and technical values are taken from Autonics' official distributor model pages and Mert's 2023 Autonics price list. See the manufacturer page for current technical values.",
  },
  ru: {
    label: "Коды шаговых двигателей",
    text:
      "Шаговые двигатели Autonics — 5-фазные стандартные (AK), со встроенным тормозом (AK-B), с полым валом (AHK), со встроенным редуктором (AK-G), со встроенным поворотным приводом (AK-R) и 2-фазные (AK) — не представлены в магазине как отдельные товары. Все 182 кода заказа этих серий перечислены на страницах серий ниже.",
    eyebrow: "Шаговые двигатели · поставка",
    sourceCaption:
      "Коды и технические значения взяты с официальных страниц дистрибьюторов Autonics и из прайс-листа Autonics 2023 года (предоставлен Мертом). Актуальные технические значения см. на странице производителя.",
  },
  ar: {
    label: "رموز المحركات الخطوية",
    text:
      "المحركات الخطوية من Autonics — خماسية الطور القياسية (AK)، ذات الفرامل المدمجة (AK-B)، ذات العمود المجوف (AHK)، ذات ناقل الحركة المدمج (AK-G)، ذات المشغل الدوار المدمج (AK-R)، وثنائية الطور (AK) — غير مدرجة كمنتجات في المتجر. جميع رموز الطلب البالغة 182 من هذه العائلات مدرجة في صفحات السلسلة أدناه.",
    eyebrow: "المحركات الخطوية · التوريد",
    sourceCaption:
      "الرموز والقيم الفنية مأخوذة من صفحات موديلات موزعي Autonics الرسميين وقائمة أسعار Autonics 2023 التي قدمها مرت. للقيم الفنية الحالية راجع صفحة الشركة المصنعة.",
  },
};

// Kategori adları (src/data/autonics-step-motor_23-10-2026.ts'teki 3 "cat" değeri, bounded set).
export const STEP_MOTOR_CATEGORY_TITLES: Record<string, L3> = {
  "5 fazlı step motorlar": { en: "5-phase step motors", ru: "5-фазные шаговые двигатели", ar: "محركات خطوية خماسية الطور" },
  "Redüktörlü / aktüatörlü step motorlar": {
    en: "Geared / actuator step motors",
    ru: "Редукторные / приводные шаговые двигатели",
    ar: "محركات خطوية بناقل حركة / مشغل",
  },
  "2 fazlı step motorlar": { en: "2-phase step motors", ru: "2-фазные шаговые двигатели", ar: "محركات خطوية ثنائية الطور" },
};

export function translateStepMotorCategoryTitle(trTitle: string, locale: Locale): string {
  return STEP_MOTOR_CATEGORY_TITLES[trTitle]?.[locale] ?? trTitle;
}
