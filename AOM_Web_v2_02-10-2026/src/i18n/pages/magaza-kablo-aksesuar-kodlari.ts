// /magaza/kablo-aksesuar-kodlari ve /magaza/kablo-aksesuar-kodlari/[seri] sayfalarının çok dilli
// arayüz metinleri (23-10-2026). Türkçe sayfalar değişmedi.
//
// Bu dosya, src/data/autonics-kablo-aksesuar_23-10-2026.ts verisine özeldir ve src/i18n/pages/magaza-kodlari.ts
// dosyasına (başka ajanlar eşzamanlı yazıyor olabileceği için) DOKUNMADAN, ondan yalnızca genel/ortak
// alanları (modelCode, quote, price, priceOnRequest, email, whatsapp, productPage, requestForCode,
// waMessage, otherSeriesSameCategoryAria, commonToAllCodes) salt okunur olarak import edip kullanır.
// Kapsam (Option A sınırı, diğer kod sayfalarıyla tutarlı): sayfa çevresi çevrilir; s.desc, s.common ve
// s.cols seriye özel teknik içerik olarak Türkçe kalır (bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md).
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

export const KABLO_AKSESUAR_PAGE_UI: Record<
  Locale,
  {
    label: string;
    text: string;
    eyebrow: string;
    sourceCaption: string;
  }
> = {
  en: {
    label: "Connection Cable & Connector Codes",
    text:
      "Autonics PLC/servo connection cables (CH series), sensor & encoder connection cables (CID series and related families), sensor connectors (CNE series), Ethernet cables for vision sensors/cameras, and GP/LP touch panel (HMI) communication cables are not listed as products in the store. All 1,049 order codes from these families are listed on the series pages below.",
    eyebrow: "Cables, connectors & connection accessories · supply",
    sourceCaption:
      "Codes, connector/length details and prices are taken from Autonics' official distributor model pages and Mert's 2023 Autonics price list. See the manufacturer page for current technical values.",
  },
  ru: {
    label: "Коды соединительных кабелей и разъёмов",
    text:
      "Соединительные кабели PLC/сервопривода Autonics (серия CH), соединительные кабели датчиков и энкодеров (серия CID и родственные семейства), разъёмы для датчиков (серия CNE), Ethernet-кабели для vision-датчиков/камер и кабели связи сенсорных панелей (HMI) GP/LP не представлены в магазине как отдельные товары. Все 1 049 кодов заказа этих серий перечислены на страницах серий ниже.",
    eyebrow: "Кабели, разъёмы и аксессуары подключения · поставка",
    sourceCaption:
      "Коды, сведения о разъёмах/длине и цены взяты с официальных страниц дистрибьюторов Autonics и из прайс-листа Autonics 2023 года (предоставлен Мертом). Актуальные технические значения см. на странице производителя.",
  },
  ar: {
    label: "رموز كابلات التوصيل والموصلات",
    text:
      "كابلات توصيل PLC/السيرفو من Autonics (سلسلة CH)، وكابلات توصيل الحساسات والمشفرات (سلسلة CID والعائلات المشابهة)، وموصلات الحساسات (سلسلة CNE)، وكابلات Ethernet لحساسات/كاميرات الرؤية، وكابلات اتصال لوحة اللمس (HMI) من سلسلة GP/LP غير مدرجة كمنتجات في المتجر. جميع رموز الطلب البالغة 1,049 من هذه العائلات مدرجة في صفحات السلسلة أدناه.",
    eyebrow: "الكابلات والموصلات وملحقات التوصيل · التوريد",
    sourceCaption:
      "الرموز وتفاصيل الموصل/الطول والأسعار مأخوذة من صفحات موديلات موزعي Autonics الرسميين وقائمة أسعار Autonics 2023 التي قدمها مرت. للقيم الفنية الحالية راجع صفحة الشركة المصنعة.",
  },
};

// Kategori adları (src/data/autonics-kablo-aksesuar_23-10-2026.ts'teki 5 "cat" değeri, bounded set).
export const KABLO_AKSESUAR_CATEGORY_TITLES: Record<string, L3> = {
  "PLC/Servo Bağlantı Kabloları": { en: "PLC/servo connection cables", ru: "Соединительные кабели PLC/сервопривода", ar: "كابلات توصيل PLC/السيرفو" },
  "Sensör Konnektörleri": { en: "Sensor connectors", ru: "Разъёмы для датчиков", ar: "موصلات الحساسات" },
  "Sensör Bağlantı Kabloları": { en: "Sensor connection cables", ru: "Соединительные кабели датчиков", ar: "كابلات توصيل الحساسات" },
  "Görüntü (Vision) ve Ethernet Kabloları": { en: "Vision & Ethernet cables", ru: "Кабели для vision-датчиков и Ethernet", ar: "كابلات الرؤية وEthernet" },
  "HMI Bağlantı Kabloları (GP/LP)": { en: "HMI connection cables (GP/LP)", ru: "Кабели подключения HMI (GP/LP)", ar: "كابلات توصيل HMI (GP/LP)" },
};

export function translateKabloAksesuarCategoryTitle(trTitle: string, locale: Locale): string {
  return KABLO_AKSESUAR_CATEGORY_TITLES[trTitle]?.[locale] ?? trTitle;
}
