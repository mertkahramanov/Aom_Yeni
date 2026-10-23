// /magaza/sinyal-lambasi-kodlari ve /magaza/sinyal-lambasi-kodlari/[seri] sayfalarının çok dilli
// arayüz metinleri (23-10-2026). Türkçe sayfalar değişmedi.
//
// Bu dosya, src/data/autonics-kuyruk-sinyal-lambasi_23-10-2026.ts verisine özeldir ve
// src/i18n/pages/magaza-kodlari.ts dosyasına (başka ajanlar eşzamanlı yazıyor olabileceği için)
// DOKUNMADAN, ondan yalnızca genel/ortak alanları (modelCode, quote, price, priceOnRequest, status,
// inProduction, discontinued, email, whatsapp, productPage, requestForCode, waMessage,
// otherSeriesSameCategoryAria, commonToAllCodes) salt okunur olarak import edip kullanır. Kapsam
// (Option A sınırı): sayfa çevresi çevrilir; s.desc, s.common ve s.cols seriye özel teknik içerik
// olarak Türkçe kalır (diğer kod sayfalarıyla tutarlı).
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

export const SINYAL_LAMBASI_PAGE_UI: Record<
  Locale,
  {
    label: string;
    text: string;
    eyebrow: string;
    sourceCaption: string;
  }
> = {
  en: {
    label: "Signal Lamp, Tower Light & Beacon Codes",
    text:
      "Autonics bulb/LED-type signal (tower) lights, rotating warning (beacon) lights and small panel-mount LED indicator lamps are not listed as products in the store. All 670 order codes from these families are listed on the series pages below.",
    eyebrow: "Signal lamps · supply",
    sourceCaption:
      "Codes and voltages are taken from Autonics' official distributor model pages and Mert's 2023 Autonics price list. See the manufacturer page for current technical values.",
  },
  ru: {
    label: "Коды сигнальных ламп, маяков и индикаторов",
    text:
      "Сигнальные (маячковые) лампы Autonics с лампой накаливания или светодиодом, вращающиеся предупредительные маяки (beacon) и небольшие светодиодные индикаторы на панель не представлены в магазине как отдельные товары. Все 670 кодов заказа этих серий перечислены на страницах серий ниже.",
    eyebrow: "Сигнальные лампы · поставка",
    sourceCaption:
      "Коды и напряжения взяты с официальных страниц дистрибьюторов Autonics и из прайс-листа Autonics 2023 года (предоставлен Мертом). Актуальные технические значения см. на странице производителя.",
  },
  ar: {
    label: "رموز مصابيح الإشارة وأبراج الإضاءة ومصابيح الإنذار الدوارة",
    text:
      "مصابيح الإشارة (الأبراج) من Autonics بنوع المصباح المتوهج أو LED، ومصابيح الإنذار الدوارة (beacon)، ومؤشرات LED الصغيرة للوحة التحكم غير مدرجة كمنتجات في المتجر. جميع رموز الطلب البالغة 670 من هذه العائلات مدرجة في صفحات السلسلة أدناه.",
    eyebrow: "مصابيح الإشارة · التوريد",
    sourceCaption:
      "الرموز والجهود مأخوذة من صفحات موديلات موزعي Autonics الرسميين وقائمة أسعار Autonics 2023 التي قدمها مرت. للقيم الفنية الحالية راجع صفحة الشركة المصنعة.",
  },
};

// Kategori adları (src/data/autonics-kuyruk-sinyal-lambasi_23-10-2026.ts'teki 4 "cat" değeri, bounded set).
export const SINYAL_LAMBASI_CATEGORY_TITLES: Record<string, L3> = {
  "Ampul tip sinyal (kule) lambaları": { en: "Bulb-type signal (tower) lights", ru: "Ламповые сигнальные (маячковые) лампы", ar: "مصابيح الإشارة (الأبراج) بالمصباح المتوهج" },
  "LED tip sinyal (kule) lambaları": { en: "LED-type signal (tower) lights", ru: "Светодиодные сигнальные (маячковые) лампы", ar: "مصابيح الإشارة (الأبراج) LED" },
  "Döner ikaz (beacon) lambaları": { en: "Rotating warning (beacon) lights", ru: "Вращающиеся предупредительные маяки (beacon)", ar: "مصابيح الإنذار الدوارة (beacon)" },
  "Küçük tip LED gösterge lambaları": { en: "Small LED indicator lamps", ru: "Малые светодиодные индикаторы", ar: "مؤشرات LED الصغيرة" },
};

export function translateSinyalLambasiCategoryTitle(trTitle: string, locale: Locale): string {
  return SINYAL_LAMBASI_CATEGORY_TITLES[trTitle]?.[locale] ?? trTitle;
}
