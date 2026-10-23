// /magaza/sinyal-donusturucu-kodlari ve /magaza/sinyal-donusturucu-kodlari/[seri] sayfalarının çok
// dilli arayüz metinleri (23-10-2026). Türkçe sayfalar değişmedi.
//
// Bu dosya, src/data/autonics-sinyal-donusturucu_23-10-2026.ts verisine özeldir ve
// src/i18n/pages/magaza-kodlari.ts dosyasına DOKUNMADAN, ondan yalnızca genel/ortak alanları
// (modelCode, quote, price, priceOnRequest, email, whatsapp, productPage, requestForCode, waMessage,
// otherSeriesSameCategoryAria, commonToAllCodes) salt okunur olarak import edip kullanır. Kapsam
// (Option A sınırı): sayfa çevresi çevrilir; s.desc, s.common ve s.cols seriye özel teknik içerik
// olarak Türkçe kalır (diğer kod sayfalarıyla tutarlı).
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

export const SINYAL_DONUSTURUCU_PAGE_UI: Record<
  Locale,
  {
    label: string;
    text: string;
    eyebrow: string;
    sourceCaption: string;
  }
> = {
  en: {
    label: "Signal Converter Codes",
    text:
      "Autonics CN signal transmitters/converters are not listed as products in the store. All 29 order codes from this family (HART signal transmitter and analog signal isolator) are listed on the series pages below.",
    eyebrow: "Signal converters · supply",
    sourceCaption:
      "Codes, descriptions and prices are taken as-is from Mert's 2023 Autonics price list; the exact meaning of some CN-6100/6101/6400/6401 code suffixes could not be confirmed with an independent manufacturer catalog. See the manufacturer page for current technical values.",
  },
  ru: {
    label: "Коды преобразователей сигнала",
    text:
      "Сигнальные передатчики/преобразователи Autonics серии CN не представлены в магазине как отдельные товары. Все 29 кодов заказа этого семейства (HART-передатчик сигнала и аналоговый изолятор сигнала) перечислены на страницах серий ниже.",
    eyebrow: "Преобразователи сигнала · поставка",
    sourceCaption:
      "Коды, описания и цены взяты без изменений из прайс-листа Autonics 2023 года (предоставлен Мертом); точное значение некоторых суффиксов кодов CN-6100/6101/6400/6401 не удалось подтвердить по независимому каталогу производителя. Актуальные технические значения см. на странице производителя.",
  },
  ar: {
    label: "رموز محولات الإشارة",
    text:
      "أجهزة إرسال/تحويل الإشارة من طراز CN من Autonics غير مدرجة كمنتجات في المتجر. جميع رموز الطلب الـ 29 من هذه العائلة (جهاز إرسال إشارة HART وعازل إشارة تناظري) مدرجة في صفحات السلسلة أدناه.",
    eyebrow: "محولات الإشارة · التوريد",
    sourceCaption:
      "الرموز والأوصاف والأسعار مأخوذة كما هي من قائمة أسعار Autonics 2023 التي قدمها مرت؛ لم يتم تأكيد المعنى الدقيق لبعض لواحق رموز CN-6100/6101/6400/6401 من كتالوج مصنّع مستقل. للقيم الفنية الحالية راجع صفحة الشركة المصنعة.",
  },
};

// Kategori adları (src/data/autonics-sinyal-donusturucu_23-10-2026.ts'teki 2 "cat" değeri, bounded set).
export const SINYAL_DONUSTURUCU_CATEGORY_TITLES: Record<string, L3> = {
  "HART Sinyal Transmitteri": { en: "HART signal transmitter", ru: "HART-передатчик сигнала", ar: "جهاز إرسال إشارة HART" },
  "Analog Sinyal İzolatörü / Çeviricisi": {
    en: "Analog signal isolator / converter",
    ru: "Аналоговый изолятор/преобразователь сигнала",
    ar: "عازل/محول إشارة تناظرية",
  },
};

export function translateSinyalDonusturucuCategoryTitle(trTitle: string, locale: Locale): string {
  return SINYAL_DONUSTURUCU_CATEGORY_TITLES[trTitle]?.[locale] ?? trTitle;
}
