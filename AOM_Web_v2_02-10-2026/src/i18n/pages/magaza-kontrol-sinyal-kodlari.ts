// /magaza/kontrol-sinyal-kodlari ve /magaza/kontrol-sinyal-kodlari/[seri] sayfalarının çok dilli
// arayüz metinleri (23-10-2026). Türkçe sayfalar değişmedi.
//
// Bu dosya, src/data/autonics-kontrol-sinyal_23-10-2026.ts verisine özeldir ve src/i18n/pages/magaza-kodlari.ts
// dosyasına (başka ajanlar eşzamanlı yazıyor olabileceği için) DOKUNMADAN, ondan yalnızca genel/ortak
// alanları (modelCode, quote, price, priceOnRequest, status, inProduction, discontinued, email, whatsapp,
// productPage, requestForCode, waMessage, otherSeriesSameCategoryAria, commonToAllCodes) salt okunur
// olarak import edip kullanır. Kapsam (Option A sınırı): sayfa çevresi çevrilir; s.desc, s.common ve
// s.cols seriye özel teknik içerik olarak Türkçe kalır (diğer kod sayfalarıyla tutarlı).
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

export const KONTROL_SINYAL_PAGE_UI: Record<
  Locale,
  {
    label: string; // "Control & signal device codes" vb.
    text: string; // index sayfası giriş paragrafı
    eyebrow: string; // "Control devices · supply"
    sourceCaption: string;
  }
> = {
  en: {
    label: "Control & Signal Device Codes",
    text:
      "Autonics pushbuttons, selector switches, key switches, emergency stop and mushroom-head buttons, pilot lights, flat LED indicators and contact blocks are not listed as products in the store. All 8,497 order codes from these families are listed on the series pages below.",
    eyebrow: "Control & signal devices · supply",
    sourceCaption:
      "Codes, colors/voltages and prices are taken from Autonics' official distributor model pages and Mert's 2023 Autonics price list. See the manufacturer page for current technical values.",
  },
  ru: {
    label: "Коды устройств управления и сигнализации",
    text:
      "Кнопки, переключатели, ключ-переключатели, кнопки аварийной остановки и грибовидные кнопки, сигнальные (индикаторные) лампы, плоские светодиодные индикаторы и контактные блоки Autonics не представлены в магазине как отдельные товары. Все 8 497 кодов заказа этих серий перечислены на страницах серий ниже.",
    eyebrow: "Устройства управления и сигнализации · поставка",
    sourceCaption:
      "Коды, цвета/напряжения и цены взяты с официальных страниц дистрибьюторов Autonics и из прайс-листа Autonics 2023 года (предоставлен Мертом). Актуальные технические значения см. на странице производителя.",
  },
  ar: {
    label: "رموز أجهزة التحكم والإشارة",
    text:
      "أزرار الضغط ومفاتيح الاختيار والمفاتيح ذات القفل وأزرار التوقف الطارئ وأزرار الرأس الفطري ومصابيح الإشارة (البيلوت) ومؤشرات LED المسطحة وكتل التلامس من Autonics غير مدرجة كمنتجات في المتجر. جميع رموز الطلب البالغة 8,497 من هذه العائلات مدرجة في صفحات السلسلة أدناه.",
    eyebrow: "أجهزة التحكم والإشارة · التوريد",
    sourceCaption:
      "الرموز والألوان/الجهود والأسعار مأخوذة من صفحات موديلات موزعي Autonics الرسميين وقائمة أسعار Autonics 2023 التي قدمها مرت. للقيم الفنية الحالية راجع صفحة الشركة المصنعة.",
  },
};

// Kategori adları (src/data/autonics-kontrol-sinyal_23-10-2026.ts'teki 7 "cat" değeri, bounded set).
export const KONTROL_SINYAL_CATEGORY_TITLES: Record<string, L3> = {
  "Seçici anahtarlar": { en: "Selector switches", ru: "Переключатели (селекторные)", ar: "مفاتيح الاختيار" },
  "Anahtarlı (kilit) seçiciler": { en: "Key selector switches", ru: "Ключ-переключатели", ar: "مفاتيح اختيار بقفل" },
  Butonlar: { en: "Pushbuttons", ru: "Кнопки", ar: "أزرار الضغط" },
  "Acil durdurma ve mantar başlı butonlar": {
    en: "Emergency stop & mushroom-head buttons",
    ru: "Кнопки аварийной остановки и грибовидные кнопки",
    ar: "أزرار التوقف الطارئ والرأس الفطري",
  },
  "Sinyal lambaları (pilot lamba)": { en: "Pilot lights", ru: "Сигнальные (индикаторные) лампы", ar: "مصابيح الإشارة (بيلوت)" },
  "LED gösterge lambaları (düz tip)": { en: "Flat LED indicators", ru: "Плоские светодиодные индикаторы", ar: "مؤشرات LED مسطحة" },
  "Kontak blokları ve aksesuarlar": { en: "Contact blocks & accessories", ru: "Контактные блоки и аксессуары", ar: "كتل التلامس والملحقات" },
};

export function translateKontrolSinyalCategoryTitle(trTitle: string, locale: Locale): string {
  return KONTROL_SINYAL_CATEGORY_TITLES[trTitle]?.[locale] ?? trTitle;
}
