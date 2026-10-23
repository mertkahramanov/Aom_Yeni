// /magaza/dpu-kodlari, /magaza/enkoder-kodlari, /magaza/kontrol-kodlari ve bunların alt sayfalarının
// (grup/seri) ortak çok dilli arayüz metinleri (19-10-2026). Türkçe sayfalar değişmedi.
// Kapsam (Option A sınırı burada da uygulanır): sayfa çevresi (breadcrumb, tablo başlıkları, buton,
// durum etiketi, "tedarik" ibaresi, DPU seçenek kodları — DPU_OPTION, 4 değer — ve DPU grup etiketi
// gibi küçük/bounded setler) çevrildi. Seriye özel açıklama metni (s.note, s.desc, s.common, enkoder
// LEGEND tabloları, s.cols dinamik sütun başlıkları) ÜRÜNE ÖZEL teknik içerik sayılır ve Türkçe kalır
// — bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md.
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

export const SUPPLY_WORD: L3 = { en: "supply", ru: "поставка", ar: "التوريد" };

export const KODLARI_UI: Record<
  Locale,
  {
    modelCode: string;
    amp: string;
    body: string;
    option: string;
    quote: string;
    price: string;
    priceOnRequest: string;
    status: string;
    inProduction: string;
    discontinued: string;
    email: string;
    whatsapp: string;
    productPage: string;
    requestForCode: (code: string) => string; // mailto konusu
    waMessage: (code: string) => string; // WhatsApp mesajı
    otherGroupsLabel: string; // "Diğer gruplar:"
    otherSeriesSameGroupAria: string;
    otherSeriesSameCategoryAria: string;
    byCodeGroupsHeading: string;
    howToReadHeading: (label: string) => string; // "{label} kodu nasıl okunur?"
    incrementalHowToRead: string; // "Artımlı enkoder kodu nasıl okunur?"
    absoluteHowToRead: string; // "Mutlak enkoder kodu nasıl okunur?"
    sourceCaption: string; // kodlar listesi kaynağı notu
    seriesAndSpecTable: (label: string) => string; // "{label} serisi ve teknik tablo" buton metni
    commonToAllCodes: string; // "Serideki tüm kodlarda ortak"
  }
> = {
  en: {
    modelCode: "Model code",
    amp: "Current",
    body: "Body",
    option: "Option",
    quote: "Quote",
    price: "Price",
    priceOnRequest: "Request a quote",
    status: "Status",
    inProduction: "In production",
    discontinued: "Discontinued",
    email: "Email",
    whatsapp: "WhatsApp",
    productPage: "Product page",
    requestForCode: (code) => `Quote request: Autonics ${code}`,
    waMessage: (code) => `Hello, I'd like a quote for Autonics ${code}.`,
    otherGroupsLabel: "Other groups:",
    otherSeriesSameGroupAria: "Other series in this group",
    otherSeriesSameCategoryAria: "Other series in this category",
    byCodeGroupsHeading: "By code group",
    howToReadHeading: (label) => (label ? `How to read a ${label} code` : "How to read a model code"),
    incrementalHowToRead: "How to read an incremental encoder code",
    absoluteHowToRead: "How to read an absolute encoder code",
    sourceCaption: "Codes and status are taken from the Autonics Turkey model list. See the manufacturer page for current technical values.",
    seriesAndSpecTable: (label) => `${label} series & spec table`,
    commonToAllCodes: "Common to all codes in this series",
  },
  ru: {
    modelCode: "Код модели",
    amp: "Ток",
    body: "Корпус",
    option: "Опция",
    quote: "Запрос",
    price: "Цена",
    priceOnRequest: "Запросить предложение",
    status: "Статус",
    inProduction: "В производстве",
    discontinued: "Снят с производства",
    email: "Эл. почта",
    whatsapp: "WhatsApp",
    productPage: "Страница товара",
    requestForCode: (code) => `Запрос предложения: Autonics ${code}`,
    waMessage: (code) => `Здравствуйте, хочу получить предложение по Autonics ${code}.`,
    otherGroupsLabel: "Другие группы:",
    otherSeriesSameGroupAria: "Другие серии этой группы",
    otherSeriesSameCategoryAria: "Другие серии этой категории",
    byCodeGroupsHeading: "По группам кодов",
    howToReadHeading: (label) => (label ? `Как читать код ${label}` : "Как читать код модели"),
    incrementalHowToRead: "Как читать код инкрементального энкодера",
    absoluteHowToRead: "Как читать код абсолютного энкодера",
    sourceCaption: "Коды и статус взяты из модельного списка Autonics Turkey. Актуальные технические значения см. на странице производителя.",
    seriesAndSpecTable: (label) => `${label}: серия и техническая таблица`,
    commonToAllCodes: "Общее для всех кодов серии",
  },
  ar: {
    modelCode: "رمز الموديل",
    amp: "التيار",
    body: "الهيكل",
    option: "خيار",
    quote: "طلب عرض",
    price: "السعر",
    priceOnRequest: "اطلب عرض سعر",
    status: "الحالة",
    inProduction: "قيد الإنتاج",
    discontinued: "متوقف عن الإنتاج",
    email: "البريد الإلكتروني",
    whatsapp: "واتساب",
    productPage: "صفحة المنتج",
    requestForCode: (code) => `طلب عرض سعر: Autonics ${code}`,
    waMessage: (code) => `مرحبًا، أرغب في الحصول على عرض سعر لـ Autonics ${code}.`,
    otherGroupsLabel: "مجموعات أخرى:",
    otherSeriesSameGroupAria: "سلاسل أخرى في هذه المجموعة",
    otherSeriesSameCategoryAria: "سلاسل أخرى في هذه الفئة",
    byCodeGroupsHeading: "حسب مجموعات الرموز",
    howToReadHeading: (label) => (label ? `كيف تُقرأ شفرة ${label}` : "كيف تُقرأ شفرة الموديل"),
    incrementalHowToRead: "كيف تُقرأ شفرة الإنكودر التزايدي",
    absoluteHowToRead: "كيف تُقرأ شفرة الإنكودر المطلق",
    sourceCaption: "الرموز وحالة الإنتاج مأخوذة من قائمة موديلات Autonics تركيا. للقيم الفنية الحالية راجع صفحة الشركة المصنعة.",
    seriesAndSpecTable: (label) => `سلسلة ${label} والجدول الفني`,
    commonToAllCodes: "مشترك بين جميع رموز السلسلة",
  },
};

// DPU seçenek kodları (src/data/dpuCodes.ts DPU_OPTION, 4 değer — bounded)
export const DPU_OPTION_TR: Record<Locale, Record<string, string>> = {
  en: {
    A: "External display + RS485",
    D: "External display",
    R: "RS485 communication",
    N: "No option",
  },
  ru: {
    A: "Внешний дисплей + RS485",
    D: "Внешний дисплей",
    R: "Связь RS485",
    N: "Без опции",
  },
  ar: {
    A: "شاشة خارجية + RS485",
    D: "شاشة خارجية",
    R: "اتصال RS485",
    N: "بدون خيار",
  },
};

/** DPU grup etiketi: "3 faz (trifaze) 440 V" / "Tek faz (monofaze) 440 V" karşılığı. */
export function dpuGroupLabel(phase: 1 | 3, voltage: number, locale: Locale): string {
  if (locale === "ru") return `${phase === 3 ? "3-фазный" : "Однофазный"} ${voltage} В`;
  if (locale === "ar") return `${phase === 3 ? "ثلاثي الطور" : "أحادي الطور"} ${voltage} فولت`;
  return `${phase === 3 ? "3-Phase" : "Single-Phase"} ${voltage} V`;
}

/** dpu-kodlari/[grup] ve enkoder/kontrol [seri] sayfalarının meta title'ı: "Autonics {prefix} Kodları (N Kod) | Ankara" */
export function kodlariDetailMetaTitle(prefix: string, count: number, locale: Locale): string {
  if (locale === "ru") return `Autonics ${prefix} — коды заказа (${count}) | Анкара`;
  if (locale === "ar") return `رموز طلب Autonics ${prefix} (${count} رمز) | أنقرة`;
  return `Autonics ${prefix} Order Codes (${count}) | Ankara`;
}

// DPU sayfasının genel kod açıklama tablosu (statik, sayfa düzeyinde referans — tamamen çevrildi).
export const DPU_LEGEND: Record<Locale, CodeLegendRow[]> = {
  en: [
    ["Phase", "1 = single-phase, 3 = 3-phase"],
    ["Voltage", "1 = 110 V, 2 = 220 V, 3 = 380 V, 4 = 440 V, 5 = 480 V (480 V, 3-phase only)"],
    ["Body & current (3-phase)", "A: 25 / 40 / 50 A · B: 70 / 80 / 100 / 120 / 150 / 180 / 200 A · C: 250 / 350 A · D: 400 / 500 / 600 A"],
    ["Body & current (single-phase)", "A: 25 / 40 / 50 / 70 A · B: 80 / 100 / 120 / 150 / 180 / 200 A · C: 250 / 350 A · D: 400 / 500 / 600 A"],
    ["-A suffix", "Found as a separate order code on 3-phase models."],
  ],
  ru: [
    ["Фаза", "1 = однофазный, 3 = трёхфазный"],
    ["Напряжение", "1 = 110 В, 2 = 220 В, 3 = 380 В, 4 = 440 В, 5 = 480 В (480 В только для трёхфазных)"],
    ["Корпус и ток (3-фазные)", "A: 25 / 40 / 50 А · B: 70 / 80 / 100 / 120 / 150 / 180 / 200 А · C: 250 / 350 А · D: 400 / 500 / 600 А"],
    ["Корпус и ток (однофазные)", "A: 25 / 40 / 50 / 70 А · B: 80 / 100 / 120 / 150 / 180 / 200 А · C: 250 / 350 А · D: 400 / 500 / 600 А"],
    ["Суффикс -A", "Отдельный код заказа у трёхфазных моделей."],
  ],
  ar: [
    ["الطور", "1 = أحادي الطور، 3 = ثلاثي الطور"],
    ["الجهد", "1 = 110 فولت، 2 = 220 فولت، 3 = 380 فولت، 4 = 440 فولت، 5 = 480 فولت (480 فولت للثلاثي الطور فقط)"],
    ["الهيكل والتيار (ثلاثي الطور)", "A: 25 / 40 / 50 أمبير · B: 70 / 80 / 100 / 120 / 150 / 180 / 200 أمبير · C: 250 / 350 أمبير · D: 400 / 500 / 600 أمبير"],
    ["الهيكل والتيار (أحادي الطور)", "A: 25 / 40 / 50 / 70 أمبير · B: 80 / 100 / 120 / 150 / 180 / 200 أمبير · C: 250 / 350 أمبير · D: 400 / 500 / 600 أمبير"],
    ["اللاحقة -A", "تُوجد كرمز طلب منفصل في الموديلات ثلاثية الطور."],
  ],
};

// src/data/enkoder.ts ENC_GROUPS grup başlıkları (group[1], 6 değer — bounded)
export const ENC_GROUP_TITLES: Record<string, L3> = {
  "artimli-milli": { en: "Incremental encoders · shaft", ru: "Инкрементальные энкодеры · валовые", ar: "إنكودر تزايدي · عمود" },
  "artimli-oyuk": {
    en: "Incremental encoders · hollow/through-bore shaft",
    ru: "Инкрементальные энкодеры · полый вал",
    ar: "إنكودر تزايدي · عمود مجوف",
  },
  ozel: { en: "Wheel and handwheel encoders", ru: "Колёсные энкодеры и энкодеры маховика", ar: "إنكودر العجلة وعجلة اليد" },
  "mutlak-optik": { en: "Absolute encoders · optical", ru: "Абсолютные энкодеры · оптические", ar: "إنكودر مطلق · بصري" },
  "mutlak-manyetik": { en: "Absolute encoders · magnetic", ru: "Абсолютные энкодеры · магнитные", ar: "إنكودر مطلق · مغناطيسي" },
  kaplin: { en: "Encoder couplings", ru: "Муфты для энкодеров", ar: "وصلات (كوبلنج) الإنكودر" },
};
export function translateEncGroupTitle(groupId: string, trTitle: string, locale: Locale): string {
  return ENC_GROUP_TITLES[groupId]?.[locale] ?? trTitle;
}

// Enkoder sayfasının genel ("artımlı kodu nasıl okunur? / mutlak kodu nasıl okunur?") açıklama tabloları.
// Bu statik, sayfa düzeyinde bir referans olduğundan (seriye özel değil) tamamen çevrildi; seriye özel
// LEGEND (enkoder-kodlari/[seri] sayfasında, 7 seri) ve s.note/s.cols gibi veri kaynaklı alanlar Türkçe kalır.
export type CodeLegendRow = [string, string];
export const ENC_INCREMENTAL_LEGEND: Record<Locale, { sample: string; rows: CodeLegendRow[] }> = {
  en: {
    sample: "E40S 6 - 1000 - 3 - T - 24 (- C)",
    rows: [
      ["Series and shaft", "E40S6 = E40S series, Ø6 mm shaft (bore diameter for hollow/through-bore shaft series)"],
      ["Resolution", "Pulses per revolution (P/R), e.g. 1000"],
      ["Output phase", "1 = A · 2 = A, B · 3 = A, B, Z · 4 = A, A̅, B, B̅ · 6 = A, A̅, B, B̅, Z, Z̅"],
      ["Control output", "T = Totem pole · N = NPN open collector · V = Voltage output · L = Line driver"],
      ["Supply", "5 = 5 VDC · 12 = 12 VDC · 24 = 12–24 VDC (1 = 5–24 VDC on E40HB and E50S series)"],
      ["Connection", "Blank = cable · C = cable + connector · CR = rear connector · CS = side connector (R = rear, S = side cable on E18S, E20 series)"],
    ],
  },
  ru: {
    sample: "E40S 6 - 1000 - 3 - T - 24 (- C)",
    rows: [
      ["Серия и вал", "E40S6 = серия E40S, вал Ø6 мм (диаметр отверстия для серий с полым валом)"],
      ["Разрешение", "Импульсов на оборот (P/R), напр. 1000"],
      ["Фаза выхода", "1 = A · 2 = A, B · 3 = A, B, Z · 4 = A, A̅, B, B̅ · 6 = A, A̅, B, B̅, Z, Z̅"],
      ["Выход управления", "T = Totem pole · N = NPN с открытым коллектором · V = Выход по напряжению · L = Line driver"],
      ["Питание", "5 = 5 В · 12 = 12 В · 24 = 12–24 В (1 = 5–24 В у серий E40HB и E50S)"],
      ["Подключение", "Пусто = кабель · C = кабель + разъём · CR = разъём сзади · CS = разъём сбоку (R = сзади, S = сбоку у серий E18S, E20)"],
    ],
  },
  ar: {
    sample: "E40S 6 - 1000 - 3 - T - 24 (- C)",
    rows: [
      ["السلسلة والعمود", "E40S6 = سلسلة E40S، عمود Ø6 مم (قطر الثقب لسلاسل العمود المجوف)"],
      ["الدقة", "نبضة لكل دورة (P/R)، مثال 1000"],
      ["طور الخرج", "1 = A · 2 = A, B · 3 = A, B, Z · 4 = A, A̅, B, B̅ · 6 = A, A̅, B, B̅, Z, Z̅"],
      ["خرج التحكم", "T = Totem pole · N = NPN مجمع مفتوح · V = خرج جهد · L = Line driver"],
      ["التغذية", "5 = 5 فولت · 12 = 12 فولت · 24 = 12–24 فولت (1 = 5–24 فولت في سلسلتي E40HB وE50S)"],
      ["التوصيل", "فارغ = كابل · C = كابل + موصل · CR = موصل خلفي · CS = موصل جانبي (R = خلفي، S = جانبي في سلسلتي E18S وE20)"],
    ],
  },
};
export const ENC_ABSOLUTE_LEGEND: Record<Locale, { sample: string; rows: CodeLegendRow[] }> = {
  en: {
    sample: "EP50S 8 - 1024 - 3 F - N - 24",
    rows: [
      ["Resolution", "Divisions per revolution, e.g. 1024 (10-bit)"],
      ["Output code", "1 = BCD · 2 = Binary · 3 = Gray"],
      ["Direction of rotation", "F = increasing clockwise (CW) · R = increasing counter-clockwise (CCW)"],
      ["Control output", "N = NPN open collector · P = PNP open collector"],
      ["Supply", "5 = 5 VDC · 24 = 12–24 VDC"],
    ],
  },
  ru: {
    sample: "EP50S 8 - 1024 - 3 F - N - 24",
    rows: [
      ["Разрешение", "Делений на оборот, напр. 1024 (10 бит)"],
      ["Код выхода", "1 = BCD · 2 = Binary · 3 = Gray"],
      ["Направление вращения", "F = возрастание по часовой (CW) · R = возрастание против часовой (CCW)"],
      ["Выход управления", "N = NPN с открытым коллектором · P = PNP с открытым коллектором"],
      ["Питание", "5 = 5 В · 24 = 12–24 В"],
    ],
  },
  ar: {
    sample: "EP50S 8 - 1024 - 3 F - N - 24",
    rows: [
      ["الدقة", "تقسيمة لكل دورة، مثال 1024 (10 بت)"],
      ["رمز الخرج", "1 = BCD · 2 = Binary · 3 = Gray"],
      ["اتجاه الدوران", "F = متزايد مع عقارب الساعة (CW) · R = متزايد عكس عقارب الساعة (CCW)"],
      ["خرج التحكم", "N = NPN مجمع مفتوح · P = PNP مجمع مفتوح"],
      ["التغذية", "5 = 5 فولت · 24 = 12–24 فولت"],
    ],
  },
};
