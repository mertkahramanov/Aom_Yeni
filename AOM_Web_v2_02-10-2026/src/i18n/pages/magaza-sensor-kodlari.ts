// /magaza/yakinlik-sensoru-kodlari, /magaza/fotoelektrik-sensor-kodlari, /magaza/vision-sensor-kodlari
// ve bunların [seri] alt sayfalarının çok dilli arayüz metinleri (23-10-2026). Türkçe sayfalar değişmedi.
//
// Bu dosya, src/data/autonics-yakinlik-sensor_23-10-2026.ts, autonics-fotoelektrik-sensor_23-10-2026.ts
// ve autonics-vision-sensor_23-10-2026.ts verilerine özeldir ve src/i18n/pages/magaza-kodlari.ts dosyasına
// (başka ajanlar eşzamanlı yazıyor olabileceği için) DOKUNMADAN, ondan yalnızca genel/ortak alanları
// (KODLARI_UI: modelCode, quote, price, priceOnRequest, email, whatsapp, productPage, requestForCode,
// waMessage, otherSeriesSameCategoryAria, commonToAllCodes) salt okunur olarak import edip kullanır.
// Kapsam (Option A sınırı): sayfa çevresi çevrilir; s.desc, s.common ve s.cols seriye özel teknik
// içerik olarak Türkçe kalır (diğer kod sayfalarıyla tutarlı, bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md).
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

type SensorPageUi = {
  label: string; // sayfa başlığı / breadcrumb etiketi
  text: string; // index sayfası giriş paragrafı
  eyebrow: string; // "Sensors · supply" vb.
  sourceCaption: string;
};

// ---- Endüktif yakınlık sensörü (PR ailesi, 730 kod) ----
export const YAKINLIK_SENSOR_PAGE_UI: Record<Locale, SensorPageUi> = {
  en: {
    label: "Inductive Proximity Sensor Codes",
    text:
      "Autonics PR-family inductive proximity sensors (cylindrical body, many body/connection variants) are not listed as products in the store. All 730 order codes from this family are listed on the series pages below.",
    eyebrow: "Sensors · supply",
    sourceCaption:
      "Codes and descriptions are taken from Autonics' official distributor model pages and Mert's 2023 Autonics price list. See the manufacturer page for current technical values.",
  },
  ru: {
    label: "Коды индуктивных датчиков приближения",
    text:
      "Индуктивные датчики приближения Autonics серии PR (цилиндрический корпус, множество вариантов корпуса/подключения) не представлены в магазине как отдельные товары. Все 730 кодов заказа этой серии перечислены на страницах серий ниже.",
    eyebrow: "Датчики · поставка",
    sourceCaption:
      "Коды и описания взяты с официальных страниц дистрибьюторов Autonics и из прайс-листа Autonics 2023 года (предоставлен Мертом). Актуальные технические значения см. на странице производителя.",
  },
  ar: {
    label: "رموز مستشعرات القرب الحثية",
    text:
      "مستشعرات القرب الحثية من Autonics بعائلة PR (هيكل أسطواني، وعدة أشكال هيكل/توصيل) غير مدرجة كمنتجات في المتجر. جميع رموز الطلب البالغة 730 من هذه العائلة مدرجة في صفحات السلسلة أدناه.",
    eyebrow: "المستشعرات · التوريد",
    sourceCaption:
      "الرموز والأوصاف مأخوذة من صفحات موديلات موزعي Autonics الرسميين وقائمة أسعار Autonics 2023 التي قدمها مرت. للقيم الفنية الحالية راجع صفحة الشركة المصنعة.",
  },
};

export const YAKINLIK_SENSOR_CATEGORY_TITLES: Record<string, L3> = {
  "Endüktif yakınlık sensörleri": { en: "Inductive proximity sensors", ru: "Индуктивные датчики приближения", ar: "مستشعرات القرب الحثية" },
};
export function translateYakinlikSensorCategoryTitle(trTitle: string, locale: Locale): string {
  return YAKINLIK_SENSOR_CATEGORY_TITLES[trTitle]?.[locale] ?? trTitle;
}

// ---- Fotoelektrik sensör (BJ/BJR/BS/BW/BRQ ailesi, 378 kod) ----
export const FOTOELEKTRIK_SENSOR_PAGE_UI: Record<Locale, SensorPageUi> = {
  en: {
    label: "Photoelectric Sensor Codes",
    text:
      "Autonics compact (cube-type), photomicro, area and cylindrical photoelectric sensors are not listed as products in the store. All 378 order codes from these families are listed on the series pages below.",
    eyebrow: "Sensors · supply",
    sourceCaption:
      "Codes and descriptions are taken from Autonics' official distributor model pages and Mert's 2023 Autonics price list. See the manufacturer page for current technical values.",
  },
  ru: {
    label: "Коды фотоэлектрических датчиков",
    text:
      "Компактные (кубического типа), фотомикро, зональные и цилиндрические фотоэлектрические датчики Autonics не представлены в магазине как отдельные товары. Все 378 кодов заказа этих серий перечислены на страницах серий ниже.",
    eyebrow: "Датчики · поставка",
    sourceCaption:
      "Коды и описания взяты с официальных страниц дистрибьюторов Autonics и из прайс-листа Autonics 2023 года (предоставлен Мертом). Актуальные технические значения см. на странице производителя.",
  },
  ar: {
    label: "رموز المستشعرات الكهروضوئية",
    text:
      "المستشعرات الكهروضوئية المدمجة (نوع المكعب)، والفوتومايكرو، ومستشعرات المنطقة، والأسطوانية من Autonics غير مدرجة كمنتجات في المتجر. جميع رموز الطلب البالغة 378 من هذه العائلات مدرجة في صفحات السلسلة أدناه.",
    eyebrow: "المستشعرات · التوريد",
    sourceCaption:
      "الرموز والأوصاف مأخوذة من صفحات موديلات موزعي Autonics الرسميين وقائمة أسعار Autonics 2023 التي قدمها مرت. للقيم الفنية الحالية راجع صفحة الشركة المصنعة.",
  },
};

export const FOTOELEKTRIK_SENSOR_CATEGORY_TITLES: Record<string, L3> = {
  "Kompakt fotoelektrik sensörler": { en: "Compact photoelectric sensors", ru: "Компактные фотоэлектрические датчики", ar: "مستشعرات كهروضوئية مدمجة" },
  "Alan (area) sensörleri": { en: "Area sensors", ru: "Зональные датчики (area sensor)", ar: "مستشعرات المنطقة" },
  "Silindirik fotoelektrik sensörler": { en: "Cylindrical photoelectric sensors", ru: "Цилиндрические фотоэлектрические датчики", ar: "مستشعرات كهروضوئية أسطوانية" },
};
export function translateFotoelektrikSensorCategoryTitle(trTitle: string, locale: Locale): string {
  return FOTOELEKTRIK_SENSOR_CATEGORY_TITLES[trTitle]?.[locale] ?? trTitle;
}

// ---- Vision (görüntü) sensör (VG serisi, 24 kod) ----
export const VISION_SENSOR_PAGE_UI: Record<Locale, SensorPageUi> = {
  en: {
    label: "Vision Sensor Codes",
    text:
      "Autonics VG-series color/monochrome vision sensors are not listed as products in the store. All 24 order codes from this series are listed on the series page below.",
    eyebrow: "Sensors · supply",
    sourceCaption:
      "Codes and descriptions are taken from Autonics' official distributor model pages and Mert's 2023 Autonics price list. See the manufacturer page for current technical values.",
  },
  ru: {
    label: "Коды vision-датчиков",
    text:
      "Цветные/монохромные vision-датчики Autonics серии VG не представлены в магазине как отдельные товары. Все 24 кода заказа этой серии перечислены на странице серии ниже.",
    eyebrow: "Датчики · поставка",
    sourceCaption:
      "Коды и описания взяты с официальных страниц дистрибьюторов Autonics и из прайс-листа Autonics 2023 года (предоставлен Мертом). Актуальные технические значения см. на странице производителя.",
  },
  ar: {
    label: "رموز مستشعرات الرؤية",
    text:
      "مستشعرات الرؤية (vision) الملونة/أحادية اللون من Autonics بسلسلة VG غير مدرجة كمنتجات في المتجر. جميع رموز الطلب البالغة 24 من هذه السلسلة مدرجة في صفحة السلسلة أدناه.",
    eyebrow: "المستشعرات · التوريد",
    sourceCaption:
      "الرموز والأوصاف مأخوذة من صفحات موديلات موزعي Autonics الرسميين وقائمة أسعار Autonics 2023 التي قدمها مرت. للقيم الفنية الحالية راجع صفحة الشركة المصنعة.",
  },
};

export const VISION_SENSOR_CATEGORY_TITLES: Record<string, L3> = {
  "Vision sensör kameraları": { en: "Vision sensor cameras", ru: "Камеры vision-датчиков", ar: "كاميرات مستشعرات الرؤية" },
};
export function translateVisionSensorCategoryTitle(trTitle: string, locale: Locale): string {
  return VISION_SENSOR_CATEGORY_TITLES[trTitle]?.[locale] ?? trTitle;
}
