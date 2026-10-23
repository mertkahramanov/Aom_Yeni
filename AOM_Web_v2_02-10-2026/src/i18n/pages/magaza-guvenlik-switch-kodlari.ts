// /magaza/guvenlik-switch-kodlari ve /magaza/guvenlik-switch-kodlari/[seri] sayfalarının çok dilli
// arayüz metinleri (23-10-2026). Türkçe sayfalar değişmedi.
//
// Bu dosya, src/data/autonics-guvenlik-switch_23-10-2026.ts verisine özeldir ve src/i18n/pages/magaza-kodlari.ts
// dosyasına (başka ajanlar eşzamanlı yazıyor olabileceği için) DOKUNMADAN, ondan yalnızca genel/ortak
// alanları (modelCode, quote, price, priceOnRequest, otherSeriesSameCategoryAria, commonToAllCodes)
// salt okunur olarak import edip kullanır. Aynı şekilde src/i18n/pages/magaza-categories.ts dosyasına da
// dokunulmadı (orada "Güvenlik" ana grubu yok); bu dosyadaki eyebrow metni kendi L3 sözlüğüyle verilir.
// Kapsam (Option A sınırı): sayfa çevresi çevrilir; s.desc, s.common ve s.cols seriye özel teknik içerik
// olarak Türkçe kalır (diğer kod sayfalarıyla tutarlı, bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md).
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

export const GUVENLIK_SWITCH_PAGE_UI: Record<
  Locale,
  {
    label: string; // "Safety Switch Codes" vb.
    text: string; // index sayfası giriş paragrafı
    eyebrow: string; // "Safety switches · supply"
    note: string; // SFL/SFLA'nın ışık perdesi olduğuna dair kapsam notu
    sourceCaption: string;
  }
> = {
  en: {
    label: "Safety Switch Codes",
    text:
      "Autonics safety door switches, safety door lock switches, safety key selector switches and safety emergency stop switches are not listed as products in the store. All 798 order codes from these families are listed on the series pages below.",
    eyebrow: "Safety switches · supply",
    note: "Note: Autonics' SFL and SFLA series are safety light curtains (an optical sensor, not a mechanical switch) and are outside the scope of this page.",
    sourceCaption:
      "Codes and technical columns are taken from Autonics' official distributor model pages and Mert's 2023 Autonics price list. See the manufacturer page for current technical values.",
  },
  ru: {
    label: "Коды предохранительных выключателей",
    text:
      "Предохранительные дверные выключатели, предохранительные дверные выключатели с блокировкой, предохранительные ключ-переключатели и предохранительные кнопки аварийной остановки Autonics не представлены в магазине как отдельные товары. Все 798 кодов заказа этих серий перечислены на страницах серий ниже.",
    eyebrow: "Предохранительные выключатели · поставка",
    note: "Примечание: серии SFL и SFLA Autonics — это предохранительные световые завесы (оптический датчик, а не механический выключатель) и не входят в объём этой страницы.",
    sourceCaption:
      "Коды и технические столбцы взяты с официальных страниц дистрибьюторов Autonics и из прайс-листа Autonics 2023 года (предоставлен Мертом). Актуальные технические значения см. на странице производителя.",
  },
  ar: {
    label: "رموز مفاتيح السلامة",
    text:
      "مفاتيح أبواب السلامة ومفاتيح أقفال أبواب السلامة ومفاتيح الاختيار ذات المفتاح الخاصة بالسلامة وأزرار التوقف الطارئ الخاصة بالسلامة من Autonics غير مدرجة كمنتجات في المتجر. جميع رموز الطلب البالغة 798 من هذه العائلات مدرجة في صفحات السلسلة أدناه.",
    eyebrow: "مفاتيح السلامة · التوريد",
    note: "ملاحظة: سلسلتا SFL وSFLA من Autonics هما ستائر ضوئية للسلامة (حساس بصري، وليس مفتاحًا ميكانيكيًا) وهما خارج نطاق هذه الصفحة.",
    sourceCaption:
      "الرموز والأعمدة الفنية مأخوذة من صفحات موديلات موزعي Autonics الرسميين وقائمة أسعار Autonics 2023 التي قدمها مرت. للقيم الفنية الحالية راجع صفحة الشركة المصنعة.",
  },
};

// Kategori adları (src/data/autonics-guvenlik-switch_23-10-2026.ts'teki 4 "cat" değeri, bounded set).
export const GUVENLIK_SWITCH_CATEGORY_TITLES: Record<string, L3> = {
  "Güvenlik kapı kilit switch'leri": { en: "Safety door lock switches", ru: "Предохранительные дверные выключатели с блокировкой", ar: "مفاتيح أقفال أبواب السلامة" },
  "Güvenlik kapı switch'leri": { en: "Safety door switches", ru: "Предохранительные дверные выключатели", ar: "مفاتيح أبواب السلامة" },
  "Güvenlik anahtarlı seçiciler": { en: "Safety key selector switches", ru: "Предохранительные ключ-переключатели", ar: "مفاتيح الاختيار ذات المفتاح للسلامة" },
  "Güvenlik acil durdurma switch'leri": { en: "Safety emergency stop switches", ru: "Предохранительные кнопки аварийной остановки", ar: "أزرار التوقف الطارئ للسلامة" },
};

export function translateGuvenlikSwitchCategoryTitle(trTitle: string, locale: Locale): string {
  return GUVENLIK_SWITCH_CATEGORY_TITLES[trTitle]?.[locale] ?? trTitle;
}
