// /magaza ana liste sayfasının çok dilli arayüz metinleri (19-10-2026). Mert kararı: mağaza
// arayüzü (başlık, buton, filtre, kategori/grup adları) EN/RU/AR'a çevrilir; ürün detay
// sayfalarındaki (isim, özellik tablosu, SEO metni) teknik içerik şimdilik Türkçe kalır —
// bkz. proje notu claude/COK_DILLI_SITE_ASAMA3 (bu dosyanın yazıldığı oturumda eklenecek).
// Kategori/grup adı çevirileri ayrı dosyada: src/i18n/pages/magaza-categories.ts
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

// ---- Sayı + birim çevirisi (ürün/grup/sipariş kodu sayaçları) ----
// Intl.PluralRules ile doğru çoğul formu seçilir (RU: one/few/many, AR: zero/one/two/few/many/other).
// Rakamlar her dilde Batı rakamlarıyla (toLocaleString("en-US")) gösterilir — bu, Arapça teknik/
// e-ticaret sitelerinde de yaygın tercihtir (Doğu Arap rakamları karışıklığı önlenir).
const pluralLocaleTag: Record<Locale, string> = { en: "en", ru: "ru", ar: "ar" };
const prCache: Partial<Record<Locale, Intl.PluralRules>> = {};
function pluralCategory(n: number, locale: Locale): Intl.LDMLPluralRule {
  const pr = (prCache[locale] ??= new Intl.PluralRules(pluralLocaleTag[locale]));
  return pr.select(n);
}
type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>>;
function word(n: number, locale: Locale, forms: PluralForms): string {
  const cat = pluralCategory(n, locale);
  return forms[cat] ?? forms.other ?? forms.many ?? forms.few ?? forms.one ?? "";
}
export function countLabel(n: number, locale: Locale, forms: PluralForms): string {
  return `${n.toLocaleString("en-US")} ${word(n, locale, forms)}`;
}

export const PRODUCT_WORD: Record<Locale, PluralForms> = {
  en: { one: "product", other: "products" },
  ru: { one: "товар", few: "товара", many: "товаров", other: "товара" },
  ar: { zero: "منتج", one: "منتج واحد", two: "منتجان", few: "منتجات", many: "منتجًا", other: "منتج" },
};
export const GROUP_WORD: Record<Locale, PluralForms> = {
  en: { one: "group", other: "groups" },
  ru: { one: "группа", few: "группы", many: "групп", other: "группы" },
  ar: { zero: "مجموعة", one: "مجموعة واحدة", two: "مجموعتان", few: "مجموعات", many: "مجموعة", other: "مجموعة" },
};
export const ORDER_CODE_WORD: Record<Locale, PluralForms> = {
  en: { one: "order code", other: "order codes" },
  ru: { one: "код заказа", few: "кода заказа", many: "кодов заказа", other: "кода заказа" },
  ar: { zero: "رمز طلب", one: "رمز طلب واحد", two: "رمزا طلب", few: "رموز طلب", many: "رمز طلب", other: "رمز طلب" },
};

export const productCount = (n: number, locale: Locale) => countLabel(n, locale, PRODUCT_WORD[locale]);
export const groupCount = (n: number, locale: Locale) => countLabel(n, locale, GROUP_WORD[locale]);
export const orderCodeCount = (n: number, locale: Locale) => countLabel(n, locale, ORDER_CODE_WORD[locale]);
// Yalnızca birim kelimesi (sayı ayrı bir <span>'de zaten gösteriliyorsa, ör. kategori kutularındaki büyük sayı)
export const orderCodeWord = (n: number, locale: Locale) => word(n, locale, ORDER_CODE_WORD[locale]);

export const MODEL_WORD: Record<Locale, PluralForms> = {
  en: { one: "model", other: "models" },
  ru: { one: "модель", few: "модели", many: "моделей", other: "модели" },
  ar: { zero: "موديل", one: "موديل واحد", two: "موديلان", few: "موديلات", many: "موديلًا", other: "موديل" },
};
export const SERIES_WORD: Record<Locale, PluralForms> = {
  en: { one: "series", other: "series" },
  ru: { one: "серия", few: "серии", many: "серий", other: "серии" },
  ar: { zero: "سلسلة", one: "سلسلة واحدة", two: "سلسلتان", few: "سلاسل", many: "سلسلة", other: "سلسلة" },
};
export const CODE_WORD: Record<Locale, PluralForms> = {
  en: { one: "code", other: "codes" },
  ru: { one: "код", few: "кода", many: "кодов", other: "кода" },
  ar: { zero: "رمز", one: "رمز واحد", two: "رمزان", few: "رموز", many: "رمزًا", other: "رمز" },
};
export const modelCount = (n: number, locale: Locale) => countLabel(n, locale, MODEL_WORD[locale]);
export const seriesCount = (n: number, locale: Locale) => countLabel(n, locale, SERIES_WORD[locale]);
export const codeCount = (n: number, locale: Locale) => countLabel(n, locale, CODE_WORD[locale]);

// ---- Kategori detay sayfası (src/app/[locale]/magaza/kategori/[kategori]/page.tsx) ----
export type CategoryPageUi = {
  vatCaption: string;
  codeListTitle: string;
  seeAllPrefix: string; // "{label}: " öncesi/sonrası biçim için — bkz. seeAllModelsLabel
  genericIntro: (title: string) => string;
};
export const CATEGORY_PAGE_UI: Record<Locale, CategoryPageUi> = {
  en: {
    vatCaption: "Prices exclude VAT; 20% VAT is added. For products without a listed price, request a quote.",
    codeListTitle: "Order code list",
    seeAllPrefix: "",
    genericIntro: (title) => `${title} products from AOM, listed by series below.`,
  },
  ru: {
    vatCaption: "Цены без НДС; добавляется НДС 20%. Для товаров без указанной цены запросите предложение.",
    codeListTitle: "Список кодов заказа",
    seeAllPrefix: "",
    genericIntro: (title) => `Товары категории «${title}» от AOM — ниже сгруппированы по сериям.`,
  },
  ar: {
    vatCaption: "الأسعار غير شاملة الضريبة؛ تُضاف ضريبة 20%. للمنتجات التي لا يظهر سعرها، اطلب عرض سعر.",
    codeListTitle: "قائمة رموز الطلب",
    seeAllPrefix: "",
    genericIntro: (title) => `منتجات ${title} من AOM، مُدرجة أدناه حسب السلسلة.`,
  },
};

/** "{label}: {n} modelin tamamını gör" karşılığı — label dizi/seri adı, n model sayısı. */
export function seeAllModelsLabel(label: string, n: number, locale: Locale): string {
  const count = modelCount(n, locale);
  if (locale === "ru") return `${label}: смотреть все ${count}`;
  if (locale === "ar") return `${label}: عرض كل ${count}`;
  return `${label}: see all ${count}`;
}

export type CodeListEntry = { href: string; label: string; total: number; text: string };
export const CODE_LISTS_UI: Record<Locale, { dpu: Omit<CodeListEntry, "href" | "total">; kontrol: Omit<CodeListEntry, "href" | "total">; enkoder: Omit<CodeListEntry, "href" | "total"> }> = {
  en: {
    dpu: { label: "DPU model codes", text: "All order codes of the Autonics DPU series: single-phase and three-phase, 110–480 V." },
    kontrol: { label: "Control device model codes", text: "Order codes for temperature control and panel meter series not added as individual products." },
    enkoder: { label: "Encoder model codes", text: "All order codes of the 34 series, by resolution, output, supply and connection." },
  },
  ru: {
    dpu: { label: "Коды моделей DPU", text: "Все коды заказа серии Autonics DPU: однофазные и трёхфазные, 110–480 В." },
    kontrol: { label: "Коды моделей устройств управления", text: "Коды заказа серий регуляторов температуры и щитовых измерителей, не добавленных как отдельные товары." },
    enkoder: { label: "Коды моделей энкодеров", text: "Все коды заказа 34 серий — по разрешению, выходу, питанию и подключению." },
  },
  ar: {
    dpu: { label: "رموز موديلات DPU", text: "جميع رموز طلب سلسلة Autonics DPU: أحادية وثلاثية الطور، 110–480 فولت." },
    kontrol: { label: "رموز موديلات أجهزة التحكم", text: "رموز طلب سلاسل التحكم بالحرارة وموازين اللوحة غير المضافة كمنتجات فردية." },
    enkoder: { label: "رموز موديلات المشفرات", text: "جميع رموز طلب الـ34 سلسلة، حسب الدقة والخرج والتغذية والتوصيل." },
  },
};

// ---- Genel sayfa metinleri ----
export type MagazaUi = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  crumbHome: string;
  crumbStore: string;
  locationAria: string;
  eyebrow: string;
  h1: string;
  lead: string;
  searchPlaceholder: string;
  fullListByCode: string; // "Model koduna göre tam liste"
  usedEmptyText: string; // "2. el ürünler yakında burada listelenecek..."
  usedEmptyLinkText: string; // "bize yazın"
  usedEmptyMailSubject: string; // mailto subject
  orderCodeLabels: { dpu: string; kontrol: string; enkoder: string };
};

export const MAGAZA_UI: Record<Locale, MagazaUi> = {
  en: {
    metaTitle: "Store: Autonics, Gefran – Control, Encoders, SSR, Thyristor | Ankara",
    metaDescription:
      "Autonics temperature controllers, counters, timers, panel meters, HMI, encoders, solid state relays (SSR), DPU and SPR thyristor power control units; Gefran power control, SSR and motor starters. Prices exclude VAT. Sales and quotes from Ankara-based AOM, nationwide across Turkey.",
    keywords: [
      "Autonics dealer Ankara", "temperature controller", "timer", "counter", "HMI", "encoder", "incremental encoder",
      "absolute encoder", "solid state relay", "SSR", "thyristor power control unit", "SCR power controller",
      "automation parts Ankara", "Autonics price list", "Gefran sales point", "Gefran technical support", "Gefran power control",
    ],
    ogTitle: "AOM Store: Autonics Encoders, SSR and Thyristor Power Control",
    ogDescription: "Autonics encoders, SSR and thyristor power control units from Ankara-based AOM, nationwide across Turkey.",
    crumbHome: "Home",
    crumbStore: "Store",
    locationAria: "Breadcrumb",
    eyebrow: "Store",
    h1: "AOM Store",
    lead:
      "Gefran (sales point and technical support) and Autonics thyristor power control units, solid state relays (SSR), Gefran motor starters, Autonics encoders and control devices; NCR relays and relay sockets, CNC spare parts and industrial electronics. Select a category to browse products. Prices exclude VAT.",
    searchPlaceholder: "Search by product code or model (e.g. DPU34D-500A, E40S6-1000)",
    fullListByCode: "Full list by model code",
    usedEmptyText: "Used products will be listed here soon. If you're looking for a specific used product, ",
    usedEmptyLinkText: "write to us",
    usedEmptyMailSubject: "Used product request",
    orderCodeLabels: {
      dpu: "Autonics DPU order codes",
      kontrol: "Autonics control device order codes",
      enkoder: "Autonics encoder order codes",
    },
  },
  ru: {
    metaTitle: "Магазин: Autonics, Gefran – управление, энкодеры, SSR, тиристоры | Анкара",
    metaDescription:
      "Терморегуляторы, счётчики, таймеры, щитовые измерители, HMI, энкодеры, твердотельные реле (SSR), тиристорные силовые блоки DPU и SPR от Autonics; силовое управление, SSR и пускатели двигателей от Gefran. Цены без НДС. Продажи и предложения от компании AOM (Анкара) по всей Турции.",
    keywords: [
      "дилер Autonics Анкара", "регулятор температуры", "таймер", "счётчик", "HMI", "энкодер", "инкрементальный энкодер",
      "абсолютный энкодер", "твердотельное реле", "SSR", "тиристорный блок управления мощностью", "SCR регулятор мощности",
      "материалы автоматизации Анкара", "прайс-лист Autonics", "точка продаж Gefran", "техническая поддержка Gefran", "силовое управление Gefran",
    ],
    ogTitle: "Магазин AOM: энкодеры Autonics, SSR и тиристорное управление мощностью",
    ogDescription: "Энкодеры Autonics, SSR и тиристорные блоки управления мощностью от AOM (Анкара) по всей Турции.",
    crumbHome: "Главная",
    crumbStore: "Магазин",
    locationAria: "Навигационная цепочка",
    eyebrow: "Магазин",
    h1: "Магазин AOM",
    lead:
      "Тиристорные блоки управления мощностью, твердотельные реле (SSR) и пускатели двигателей Gefran (точка продаж и техническая поддержка) и Autonics, энкодеры и устройства управления Autonics; реле и колодки реле NCR, запчасти для станков с ЧПУ и промышленная электроника. Выберите категорию, чтобы перейти к товарам. Цены без НДС.",
    searchPlaceholder: "Поиск по коду товара или модели (напр. DPU34D-500A, E40S6-1000)",
    fullListByCode: "Полный список по коду модели",
    usedEmptyText: "Товары б/у скоро появятся здесь. Если вам нужен конкретный товар б/у, ",
    usedEmptyLinkText: "напишите нам",
    usedEmptyMailSubject: "Запрос на товар б/у",
    orderCodeLabels: {
      dpu: "Коды заказа Autonics DPU",
      kontrol: "Коды заказа устройств управления Autonics",
      enkoder: "Коды заказа энкодеров Autonics",
    },
  },
  ar: {
    metaTitle: "المتجر: Autonics، Gefran – تحكم، مشفرات، SSR، ثايرستور | أنقرة",
    metaDescription:
      "أجهزة تحكم بالحرارة وعدادات ومؤقتات وموازين لوحة و HMI ومشفرات ومرحلات حالة صلبة (SSR) ووحدات تحكم بالطاقة بالثايرستور DPU وSPR من Autonics؛ تحكم بالطاقة وSSR ومشغّلات بدء تشغيل المحركات من Gefran. الأسعار غير شاملة الضريبة. مبيعات وعروض أسعار من AOM ومقرها أنقرة، إلى جميع أنحاء تركيا.",
    keywords: [
      "وكيل Autonics أنقرة", "جهاز تحكم بالحرارة", "مؤقت", "عداد", "HMI", "مشفر", "مشفر تزايدي",
      "مشفر مطلق", "مرحل حالة صلبة", "SSR", "وحدة تحكم بالطاقة بالثايرستور", "منظم طاقة SCR",
      "مواد أتمتة أنقرة", "قائمة أسعار Autonics", "نقطة بيع Gefran", "دعم فني Gefran", "تحكم بالطاقة Gefran",
    ],
    ogTitle: "متجر AOM: مشفرات Autonics وSSR والتحكم بالطاقة بالثايرستور",
    ogDescription: "مشفرات Autonics وSSR ووحدات تحكم بالطاقة بالثايرستور من AOM ومقرها أنقرة إلى جميع أنحاء تركيا.",
    crumbHome: "الرئيسية",
    crumbStore: "المتجر",
    locationAria: "مسار التنقل",
    eyebrow: "المتجر",
    h1: "متجر AOM",
    lead:
      "وحدات تحكم بالطاقة بالثايرستور ومرحلات حالة صلبة (SSR) ومشغّلات بدء تشغيل المحركات من Gefran (نقطة بيع ودعم فني) وAutonics، ومشفرات وأجهزة تحكم من Autonics؛ مرحلات وقواعد مرحلات من NCR، وقطع غيار CNC ومنتجات إلكترونية صناعية. اختر فئة للوصول إلى المنتجات. الأسعار غير شاملة الضريبة.",
    searchPlaceholder: "ابحث برمز المنتج أو الموديل (مثال: DPU34D-500A، E40S6-1000)",
    fullListByCode: "القائمة الكاملة حسب رمز الموديل",
    usedEmptyText: "ستُدرج المنتجات المستعملة هنا قريبًا. إذا كنت تبحث عن منتج مستعمل معين، ",
    usedEmptyLinkText: "راسلنا",
    usedEmptyMailSubject: "طلب منتج مستعمل",
    orderCodeLabels: {
      dpu: "رموز طلب Autonics DPU",
      kontrol: "رموز طلب أجهزة تحكم Autonics",
      enkoder: "رموز طلب مشفرات Autonics",
    },
  },
};

// ---- Slider (sayfa üstü öne çıkan kategoriler) ----
export type SliderItem = { id: string; short: string; eyebrow: string; title: string; lead: string; cta: string };

export const SLIDER_TEXT: Record<Locale, Record<string, SliderItem>> = {
  en: {
    "guc-kontrol": { id: "guc-kontrol", short: "Power control", eyebrow: "Power control", title: "Thyristor power control and SSR", lead: "Autonics and Gefran thyristor power control units (DPU, SPR) and solid state relays (SSR); precise power control in thermal processes.", cta: "Go to Power control" },
    "kontrol-cihazlari": { id: "kontrol-cihazlari", short: "Control devices", eyebrow: "Control devices", title: "Temperature control, counters, timers and HMI", lead: "Autonics temperature controllers, counters, timers, digital panel meters, recorders, indicators, display units and HMI series.", cta: "Go to Control devices" },
    "enkoderler-grup": { id: "enkoderler-grup", short: "Encoders", eyebrow: "Encoders", title: "Incremental and absolute encoders", lead: "Autonics encoders: 34 series, 8,644 order codes by resolution and output type.", cta: "Go to Encoders" },
    "motor-suruculer": { id: "motor-suruculer", short: "Motor drives", eyebrow: "Motor drives and starters", title: "AC/DC motor drives and starters", lead: "AC variable speed drives (inverters), DC motor drives, soft starters and brake units.", cta: "Go to Motor drives and starters" },
    "servo-motorlar": { id: "servo-motorlar", short: "Servo motors", eyebrow: "Servo motors", title: "Step and servo motors, drives", lead: "Step motors and their drives provide open- or closed-loop (encoder-based) positioning on CNC axes; selected by flange size (NEMA), holding torque and phase current.", cta: "Go to Servo motors" },
    "sensorler": { id: "sensorler", short: "Sensors", eyebrow: "Sensors and switches", title: "Limit switches, inductive sensors and buttons", lead: "Limit switches, inductive sensors, mode switches and buttons are used for position sensing, axis referencing and operator control on CNC machines.", cta: "Go to Sensors" },
    "ikinci-el": { id: "ikinci-el", short: "Used products", eyebrow: "Used spare parts", title: "Used spare parts, tested and warrantied", lead: "Used stock in bearings, linear motion, drives, control devices and CNC spare parts; listed with condition, test and warranty information.", cta: "Go to used spare parts" },
  },
  ru: {
    "guc-kontrol": { id: "guc-kontrol", short: "Управление мощностью", eyebrow: "Управление мощностью", title: "Тиристорное управление мощностью и SSR", lead: "Тиристорные блоки управления мощностью Autonics и Gefran (DPU, SPR) и твердотельные реле (SSR); точное управление мощностью в тепловых процессах.", cta: "Перейти в «Управление мощностью»" },
    "kontrol-cihazlari": { id: "kontrol-cihazlari", short: "Устройства управления", eyebrow: "Устройства управления", title: "Терморегуляторы, счётчики, таймеры и HMI", lead: "Терморегуляторы, счётчики, таймеры, цифровые щитовые измерители, регистраторы, индикаторы, дисплейные блоки и серии HMI от Autonics.", cta: "Перейти в «Устройства управления»" },
    "enkoderler-grup": { id: "enkoderler-grup", short: "Энкодеры", eyebrow: "Энкодеры", title: "Инкрементальные и абсолютные энкодеры", lead: "Энкодеры Autonics: 34 серии, 8644 кода заказа по разрешению и типу выхода.", cta: "Перейти в «Энкодеры»" },
    "motor-suruculer": { id: "motor-suruculer", short: "Приводы двигателей", eyebrow: "Приводы двигателей и устройства пуска", title: "Приводы и пускатели двигателей AC/DC", lead: "Преобразователи частоты переменного тока (инверторы), приводы постоянного тока, устройства плавного пуска и тормозные блоки.", cta: "Перейти в «Приводы двигателей и устройства пуска»" },
    "servo-motorlar": { id: "servo-motorlar", short: "Сервомоторы", eyebrow: "Сервомоторы", title: "Шаговые и серводвигатели, приводы", lead: "Шаговые двигатели и их приводы обеспечивают позиционирование по осям ЧПУ в разомкнутом или замкнутом контуре (с энкодером); подбираются по размеру фланца (NEMA), удерживающему моменту и фазному току.", cta: "Перейти в «Сервомоторы»" },
    "sensorler": { id: "sensorler", short: "Датчики", eyebrow: "Датчики и переключатели", title: "Концевые выключатели, индуктивные датчики и кнопки", lead: "Концевые выключатели, индуктивные датчики, переключатели режимов и кнопки используются для определения положения, привязки осей и управления оператором на станках с ЧПУ.", cta: "Перейти в «Датчики»" },
    "ikinci-el": { id: "ikinci-el", short: "Товары б/у", eyebrow: "Запчасти б/у", title: "Запчасти б/у, проверенные и с гарантией", lead: "Складской запас б/у по подшипникам, линейному перемещению, приводам, устройствам управления и запчастям для ЧПУ; указаны состояние, результат проверки и гарантия.", cta: "Перейти к запчастям б/у" },
  },
  ar: {
    "guc-kontrol": { id: "guc-kontrol", short: "التحكم بالطاقة", eyebrow: "التحكم بالطاقة", title: "التحكم بالطاقة بالثايرستور وSSR", lead: "وحدات تحكم بالطاقة بالثايرستور من Autonics وGefran (DPU، SPR) ومرحلات حالة صلبة (SSR)؛ تحكم دقيق بالطاقة في العمليات الحرارية.", cta: "الانتقال إلى التحكم بالطاقة" },
    "kontrol-cihazlari": { id: "kontrol-cihazlari", short: "أجهزة التحكم", eyebrow: "أجهزة التحكم", title: "التحكم بالحرارة والعدادات والمؤقتات وHMI", lead: "أجهزة تحكم بالحرارة وعدادات ومؤقتات وموازين لوحة رقمية وأجهزة تسجيل ومؤشرات ووحدات عرض وسلاسل HMI من Autonics.", cta: "الانتقال إلى أجهزة التحكم" },
    "enkoderler-grup": { id: "enkoderler-grup", short: "المشفرات", eyebrow: "المشفرات", title: "مشفرات تزايدية ومطلقة", lead: "مشفرات Autonics: 34 سلسلة، و8,644 رمز طلب حسب الدقة ونوع الخرج.", cta: "الانتقال إلى المشفرات" },
    "motor-suruculer": { id: "motor-suruculer", short: "سائقات المحركات", eyebrow: "سائقات المحركات ومشغّلات بدء التشغيل", title: "سائقات ومشغّلات محركات AC/DC", lead: "سائقات سرعة متغيرة للتيار المتردد (إنفرتر)، وسائقات محركات التيار المستمر، ومُشغّلات تشغيل ناعم، ووحدات فرملة.", cta: "الانتقال إلى سائقات المحركات ومشغّلات بدء التشغيل" },
    "servo-motorlar": { id: "servo-motorlar", short: "محركات السيرفو", eyebrow: "محركات السيرفو", title: "محركات الخطوة والسيرفو وسائقاتها", lead: "توفر محركات الخطوة وسائقاتها تموضعًا بحلقة مفتوحة أو مغلقة (بالمشفر) على محاور CNC؛ يتم اختيارها حسب مقاس الفلنجة (NEMA) وعزم التثبيت وتيار الطور.", cta: "الانتقال إلى محركات السيرفو" },
    "sensorler": { id: "sensorler", short: "الحساسات", eyebrow: "الحساسات والمفاتيح", title: "مفاتيح الحد، الحساسات الحثية والأزرار", lead: "تُستخدم مفاتيح الحد والحساسات الحثية ومفاتيح الأوضاع والأزرار لاستشعار الموضع ومرجعية المحور وتحكم المشغّل في آلات CNC.", cta: "الانتقال إلى الحساسات" },
    "ikinci-el": { id: "ikinci-el", short: "منتجات مستعملة", eyebrow: "قطع غيار مستعملة", title: "قطع غيار مستعملة، مُختبرة وبضمان", lead: "مخزون مستعمل من المحامل والحركة الخطية والسائقات وأجهزة التحكم وقطع غيار CNC؛ مُدرج مع معلومات الحالة والاختبار والضمان.", cta: "الانتقال إلى قطع الغيار المستعملة" },
  },
};
