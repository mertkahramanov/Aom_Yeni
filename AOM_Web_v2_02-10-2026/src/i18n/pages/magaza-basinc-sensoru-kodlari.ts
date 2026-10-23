// /magaza/basinc-sensoru-kodlari ve /magaza/basinc-sensoru-kodlari/[seri] sayfalarının çok dilli
// arayüz metinleri (23-10-2026). Türkçe sayfalar değişmedi.
//
// Bu dosya, src/data/autonics-basinc-sensor_23-10-2026.ts verisine özeldir ve src/i18n/pages/magaza-kodlari.ts
// dosyasına (başka ajanlar eşzamanlı yazıyor olabileceği için) DOKUNMADAN, ondan yalnızca genel/ortak
// alanları (modelCode, quote, price, priceOnRequest, email, whatsapp, productPage, requestForCode,
// waMessage, otherSeriesSameCategoryAria, commonToAllCodes) salt okunur olarak import edip kullanır.
// Kapsam (Option A sınırı): sayfa çevresi çevrilir; s.desc, s.common ve s.cols seriye özel teknik
// içerik olarak Türkçe kalır (diğer kod sayfalarıyla tutarlı, bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md).
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

export const BASINC_SENSOR_PAGE_UI: Record<
  Locale,
  {
    label: string; // "Pressure Sensor & Switch Codes" vb.
    text: string; // index sayfası giriş paragrafı
    eyebrow: string; // "Pressure sensors · supply"
    sourceCaption: string;
  }
> = {
  en: {
    label: "Pressure Sensor & Transmitter Codes",
    text:
      "Autonics pressure transmitters, display-type pressure transmitters, HART pressure transmitters and digital pressure switches are not listed as products in the store. All 1,088 order codes from these families are listed on the series pages below.",
    eyebrow: "Pressure sensors · supply",
    sourceCaption:
      "Codes, measuring ranges and connection types are taken from Autonics' official distributor model pages and Mert's 2023 Autonics price list. See the manufacturer page for current technical values.",
  },
  ru: {
    label: "Коды датчиков и преобразователей давления",
    text:
      "Преобразователи давления, преобразователи давления с индикацией, преобразователи давления HART и цифровые реле давления Autonics не представлены в магазине как отдельные товары. Все 1 088 кодов заказа этих серий перечислены на страницах серий ниже.",
    eyebrow: "Датчики давления · поставка",
    sourceCaption:
      "Коды, диапазоны измерения и типы присоединения взяты с официальных страниц дистрибьюторов Autonics и из прайс-листа Autonics 2023 года (предоставлен Мертом). Актуальные технические значения см. на странице производителя.",
  },
  ar: {
    label: "رموز أجهزة استشعار ومرسلات الضغط",
    text:
      "مرسلات الضغط، ومرسلات الضغط ذات الشاشة، ومرسلات الضغط بتقنية HART، ومفاتيح الضغط الرقمية من Autonics غير مدرجة كمنتجات في المتجر. جميع رموز الطلب البالغة 1,088 من هذه العائلات مدرجة في صفحات السلسلة أدناه.",
    eyebrow: "أجهزة استشعار الضغط · التوريد",
    sourceCaption:
      "الرموز ونطاقات القياس وأنواع التوصيل مأخوذة من صفحات موديلات موزعي Autonics الرسميين وقائمة أسعار Autonics 2023 التي قدمها مرت. للقيم الفنية الحالية راجع صفحة الشركة المصنعة.",
  },
};

// Kategori adları (src/data/autonics-basinc-sensor_23-10-2026.ts'teki 2 "cat" değeri, bounded set).
export const BASINC_SENSOR_CATEGORY_TITLES: Record<string, L3> = {
  "Basınç transmiterleri": { en: "Pressure transmitters", ru: "Преобразователи давления", ar: "مرسلات الضغط" },
  "Dijital basınç şalterleri": { en: "Digital pressure switches", ru: "Цифровые реле давления", ar: "مفاتيح الضغط الرقمية" },
};

export function translateBasincSensorCategoryTitle(trTitle: string, locale: Locale): string {
  return BASINC_SENSOR_CATEGORY_TITLES[trTitle]?.[locale] ?? trTitle;
}
