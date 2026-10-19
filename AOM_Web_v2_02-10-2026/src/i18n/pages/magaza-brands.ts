// /magaza/marka/[marka] sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
// Kapsam: marka sayfaları src/data/markalar.ts'deki BRANDS objesinden gelir (13 marka, her biri
// 1-2 kısa cümlelik tanıtım metni). Kategori sayfalarının aksine bu içerik hem az sayıda hem de
// kısa olduğundan (binlerce ürün cümlesi değil, 13 marka x 1-2 cümle) CATEGORY_INFO'daki gibi genel
// bir şablona düşmek yerine doğrudan çevrildi — bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md.
// Marka adı, ülke adı ve harici site linki (b.name, b.country, b.site) her zaman olduğu gibi kalır.
import type { Locale } from "../locales";
import { ANKARA_REGION_SHORT } from "./common";

export type BrandContent = {
  seoTitle: string;
  description: string;
  eyebrow: string;
  keywordWord: string; // "satış noktası ve teknik destek" / "OEM partneri" karşılığı (meta keywords için)
  intro: string[];
};

const OEM_PARTNER_WORD: Record<Locale, string> = {
  en: "OEM partner",
  ru: "OEM-партнёр",
  ar: "شريك OEM",
};

const SALES_SUPPORT_WORD: Record<Locale, string> = {
  en: "Sales point and technical support",
  ru: "Точка продаж и техническая поддержка",
  ar: "نقطة بيع ودعم فني",
};

export const TURKEY_WORD: Record<Locale, string> = {
  en: "Turkey",
  ru: "Турция",
  ar: "تركيا",
};

export const PRICE_WORD: Record<Locale, string> = {
  en: "price",
  ru: "цена",
  ar: "سعر",
};

function defaultEyebrow(loc: Locale): string {
  return `${OEM_PARTNER_WORD[loc]} · ${ANKARA_REGION_SHORT[loc]}`;
}

function salesSupportEyebrow(loc: Locale): string {
  return `${SALES_SUPPORT_WORD[loc]} · ${ANKARA_REGION_SHORT[loc]}`;
}

const SALES_SUPPORT_KEYWORD: Record<Locale, string> = {
  en: "sales point and technical support",
  ru: "точка продаж и техническая поддержка",
  ar: "نقطة بيع ودعم فني",
};

export const BRAND_CONTENT: Record<string, Record<Locale, BrandContent>> = {
  gefran: {
    en: {
      seoTitle: "Gefran Sales Point & Technical Support – Power Control, SSR, Motor Starters | Ankara",
      description:
        "AOM is the Gefran sales point and technical support partner: GRC, GPC, GRM, GFX4, GFX thyristor power control units; GRS, GRP, GRZ, GQ solid state relays; G-Start motor starters. Quotes from Ankara, nationwide across Turkey.",
      eyebrow: salesSupportEyebrow("en"),
      keywordWord: SALES_SUPPORT_KEYWORD.en,
      intro: [
        "AOM is the sales point and technical support provider for Gefran power control units, solid state relays, and motor starters. We support product selection, panel integration, and commissioning.",
        "Gefran is an Italy-based industrial automation manufacturer. Below, Gefran power control series are listed by category; each series' technical specifications and Gefran product page link are on its product page. Request a quote for pricing.",
      ],
    },
    ru: {
      seoTitle: "Gefran — точка продаж и техподдержка: регуляторы мощности, SSR, пускатели | Анкара",
      description:
        "AOM — точка продаж и техподдержки Gefran: тиристорные регуляторы мощности GRC, GPC, GRM, GFX4, GFX; твердотельные реле GRS, GRP, GRZ, GQ; пускатель G-Start. Предложения из Анкары по всей Турции.",
      eyebrow: salesSupportEyebrow("ru"),
      keywordWord: SALES_SUPPORT_KEYWORD.ru,
      intro: [
        "AOM — точка продаж и технической поддержки для силовых регуляторов Gefran, твердотельных реле и устройств плавного пуска. Мы помогаем с выбором продукции, интеграцией в шкаф и вводом в эксплуатацию.",
        "Gefran — итальянский производитель промышленной автоматизации. Ниже серии силовых регуляторов Gefran перечислены по категориям; технические характеристики каждой серии и ссылка на страницу продукта Gefran указаны на странице товара. Запросите предложение по цене.",
      ],
    },
    ar: {
      seoTitle: "Gefran نقطة بيع ودعم فني – تحكم بالطاقة، SSR، بادئات تشغيل | أنقرة",
      description:
        "AOM نقطة بيع ودعم فني لـ Gefran: وحدات تحكم الطاقة الثايرستورية GRC وGPC وGRM وGFX4 وGFX؛ مرحلات الحالة الصلبة GRS وGRP وGRZ وGQ؛ بادئ تشغيل المحرك G-Start. عروض أسعار من أنقرة إلى جميع أنحاء تركيا.",
      eyebrow: salesSupportEyebrow("ar"),
      keywordWord: SALES_SUPPORT_KEYWORD.ar,
      intro: [
        "AOM هي نقطة البيع والدعم الفني لوحدات التحكم بالطاقة من Gefran والمرحلات الحالة الصلبة وبادئات تشغيل المحركات. نقدم الدعم في اختيار المنتج وتكامل اللوحة والتشغيل.",
        "Gefran هي شركة إيطالية لتصنيع أنظمة الأتمتة الصناعية. أدناه يتم إدراج سلسلات التحكم بالطاقة من Gefran حسب الفئة؛ تتوفر المواصفات الفنية لكل سلسلة ورابط صفحة المنتج الخاصة بـ Gefran في صفحة المنتج. يرجى طلب عرض سعر.",
      ],
    },
  },
  fanuc: {
    en: {
      seoTitle: "Fanuc OEM Partner – CNC Control & Spare Parts | Ankara",
      description:
        "Fanuc is one of AOM's OEM partners; Fanuc control is offered as an option on CNC machining centers, and Fanuc spare parts are available in the store. Quotes from Ankara, nationwide across Turkey.",
      eyebrow: defaultEyebrow("en"),
      keywordWord: OEM_PARTNER_WORD.en,
      intro: [
        "Fanuc is one of AOM's OEM partners. Fanuc control is offered as an option in compact CNC machining center projects.",
        "Below, Fanuc spare parts in the AOM store are listed by category. Request a quote for pricing.",
      ],
    },
    ru: {
      seoTitle: "Fanuc — OEM-партнёр: ЧПУ-управление и запчасти | Анкара",
      description:
        "Fanuc — один из OEM-партнёров AOM; на обрабатывающих центрах с ЧПУ предлагается опция управления Fanuc, в магазине есть запчасти Fanuc. Предложения из Анкары по всей Турции.",
      eyebrow: defaultEyebrow("ru"),
      keywordWord: OEM_PARTNER_WORD.ru,
      intro: [
        "Fanuc — один из OEM-партнёров AOM. В проектах компактных обрабатывающих центров с ЧПУ предлагается опция управления Fanuc.",
        "Ниже запчасти Fanuc из магазина AOM перечислены по категориям. Запросите предложение по цене.",
      ],
    },
    ar: {
      seoTitle: "Fanuc شريك OEM – تحكم CNC وقطع غيار | أنقرة",
      description:
        "Fanuc أحد شركاء OEM لدى AOM؛ يُقدَّم خيار تحكم Fanuc في مراكز التشغيل CNC، وتتوفر قطع غيار Fanuc في المتجر. عروض أسعار من أنقرة إلى جميع أنحاء تركيا.",
      eyebrow: defaultEyebrow("ar"),
      keywordWord: OEM_PARTNER_WORD.ar,
      intro: [
        "Fanuc أحد شركاء OEM لدى AOM. يُقدَّم خيار تحكم Fanuc في مشاريع مراكز التشغيل CNC المدمجة.",
        "أدناه يتم إدراج قطع غيار Fanuc في متجر AOM حسب الفئة. يرجى طلب عرض سعر.",
      ],
    },
  },
  siemens: {
    en: {
      seoTitle: "Siemens OEM Partner – CNC Control & Spare Parts | Ankara",
      description:
        "Siemens is one of AOM's OEM partners; Siemens control is offered as an option on CNC machining centers, and the store carries Siemens V20 drives, switchgear products, and spare parts. Quotes from Ankara, nationwide across Turkey.",
      eyebrow: defaultEyebrow("en"),
      keywordWord: OEM_PARTNER_WORD.en,
      intro: [
        "Siemens is one of AOM's OEM partners. Siemens control is offered as an option in compact CNC machining center projects.",
        "Below, Siemens products in the AOM store (drives, switchgear products, control boards, spare parts) are listed by category. Request a quote for pricing.",
      ],
    },
    ru: {
      seoTitle: "Siemens — OEM-партнёр: ЧПУ-управление и запчасти | Анкара",
      description:
        "Siemens — один из OEM-партнёров AOM; на обрабатывающих центрах с ЧПУ предлагается опция управления Siemens, в магазине есть приводы Siemens V20, коммутационная продукция и запчасти. Предложения из Анкары по всей Турции.",
      eyebrow: defaultEyebrow("ru"),
      keywordWord: OEM_PARTNER_WORD.ru,
      intro: [
        "Siemens — один из OEM-партнёров AOM. В проектах компактных обрабатывающих центров с ЧПУ предлагается опция управления Siemens.",
        "Ниже продукция Siemens из магазина AOM (приводы, коммутационная продукция, платы управления, запчасти) перечислена по категориям. Запросите предложение по цене.",
      ],
    },
    ar: {
      seoTitle: "Siemens شريك OEM – تحكم CNC وقطع غيار | أنقرة",
      description:
        "Siemens أحد شركاء OEM لدى AOM؛ يُقدَّم خيار تحكم Siemens في مراكز التشغيل CNC، ويتوفر في المتجر محولات Siemens V20 ومنتجات التحويل وقطع الغيار. عروض أسعار من أنقرة إلى جميع أنحاء تركيا.",
      eyebrow: defaultEyebrow("ar"),
      keywordWord: OEM_PARTNER_WORD.ar,
      intro: [
        "Siemens أحد شركاء OEM لدى AOM. يُقدَّم خيار تحكم Siemens في مشاريع مراكز التشغيل CNC المدمجة.",
        "أدناه يتم إدراج منتجات Siemens في متجر AOM (المحولات، منتجات التحويل، لوحات التحكم، قطع الغيار) حسب الفئة. يرجى طلب عرض سعر.",
      ],
    },
  },
  "mitsubishi-electric": {
    en: {
      seoTitle: "Mitsubishi Electric OEM Partner – CNC Control & Spare Parts | Ankara",
      description:
        "Mitsubishi Electric is one of AOM's OEM partners; Mitsubishi Electric control is offered as an option on CNC machining centers, and its spare parts are available in the store. Quotes from Ankara, nationwide across Turkey.",
      eyebrow: defaultEyebrow("en"),
      keywordWord: OEM_PARTNER_WORD.en,
      intro: [
        "Mitsubishi Electric is one of AOM's OEM partners. Mitsubishi Electric control is offered as an option in compact CNC machining center projects.",
        "Below, Mitsubishi Electric spare parts in the AOM store are listed by category. Request a quote for pricing.",
      ],
    },
    ru: {
      seoTitle: "Mitsubishi Electric — OEM-партнёр: ЧПУ-управление и запчасти | Анкара",
      description:
        "Mitsubishi Electric — один из OEM-партнёров AOM; на обрабатывающих центрах с ЧПУ предлагается опция управления Mitsubishi Electric, в магазине есть соответствующие запчасти. Предложения из Анкары по всей Турции.",
      eyebrow: defaultEyebrow("ru"),
      keywordWord: OEM_PARTNER_WORD.ru,
      intro: [
        "Mitsubishi Electric — один из OEM-партнёров AOM. В проектах компактных обрабатывающих центров с ЧПУ предлагается опция управления Mitsubishi Electric.",
        "Ниже запчасти Mitsubishi Electric из магазина AOM перечислены по категориям. Запросите предложение по цене.",
      ],
    },
    ar: {
      seoTitle: "Mitsubishi Electric شريك OEM – تحكم CNC وقطع غيار | أنقرة",
      description:
        "Mitsubishi Electric أحد شركاء OEM لدى AOM؛ يُقدَّم خيار تحكم Mitsubishi Electric في مراكز التشغيل CNC، وتتوفر قطع غيارها في المتجر. عروض أسعار من أنقرة إلى جميع أنحاء تركيا.",
      eyebrow: defaultEyebrow("ar"),
      keywordWord: OEM_PARTNER_WORD.ar,
      intro: [
        "Mitsubishi Electric أحد شركاء OEM لدى AOM. يُقدَّم خيار تحكم Mitsubishi Electric في مشاريع مراكز التشغيل CNC المدمجة.",
        "أدناه يتم إدراج قطع غيار Mitsubishi Electric في متجر AOM حسب الفئة. يرجى طلب عرض سعر.",
      ],
    },
  },
  delta: {
    en: {
      seoTitle: "Delta Products – Drives & Spare Parts | Ankara",
      description: "The AOM store carries the Delta VFD-E/EL/EL-W drive series and Delta spare parts. Quotes from Ankara, nationwide across Turkey.",
      eyebrow: defaultEyebrow("en"),
      keywordWord: OEM_PARTNER_WORD.en,
      intro: [
        "Delta is one of AOM's OEM partners.",
        "Below, Delta products in the AOM store (drive series and spare parts) are listed by category. Request a quote for pricing.",
      ],
    },
    ru: {
      seoTitle: "Продукция Delta — приводы и запчасти | Анкара",
      description: "В магазине AOM есть серия приводов Delta VFD-E/EL/EL-W и запчасти Delta. Предложения из Анкары по всей Турции.",
      eyebrow: defaultEyebrow("ru"),
      keywordWord: OEM_PARTNER_WORD.ru,
      intro: [
        "Delta — один из OEM-партнёров AOM.",
        "Ниже продукция Delta из магазина AOM (серии приводов и запчасти) перечислена по категориям. Запросите предложение по цене.",
      ],
    },
    ar: {
      seoTitle: "منتجات Delta – محولات وقطع غيار | أنقرة",
      description: "يتوفر في متجر AOM سلسلة محولات Delta VFD-E/EL/EL-W وقطع غيار Delta. عروض أسعار من أنقرة إلى جميع أنحاء تركيا.",
      eyebrow: defaultEyebrow("ar"),
      keywordWord: OEM_PARTNER_WORD.ar,
      intro: [
        "Delta أحد شركاء OEM لدى AOM.",
        "أدناه يتم إدراج منتجات Delta في متجر AOM (سلسلات المحولات وقطع الغيار) حسب الفئة. يرجى طلب عرض سعر.",
      ],
    },
  },
  omron: {
    en: {
      seoTitle: "Omron Products – Spare Parts | Ankara",
      description: "The AOM store carries Omron spare parts. Quotes from Ankara, nationwide across Turkey.",
      eyebrow: defaultEyebrow("en"),
      keywordWord: OEM_PARTNER_WORD.en,
      intro: ["Omron is one of AOM's OEM partners.", "Below, Omron spare parts in the AOM store are listed by category. Request a quote for pricing."],
    },
    ru: {
      seoTitle: "Продукция Omron — запчасти | Анкара",
      description: "В магазине AOM есть запчасти Omron. Предложения из Анкары по всей Турции.",
      eyebrow: defaultEyebrow("ru"),
      keywordWord: OEM_PARTNER_WORD.ru,
      intro: ["Omron — один из OEM-партнёров AOM.", "Ниже запчасти Omron из магазина AOM перечислены по категориям. Запросите предложение по цене."],
    },
    ar: {
      seoTitle: "منتجات Omron – قطع غيار | أنقرة",
      description: "تتوفر قطع غيار Omron في متجر AOM. عروض أسعار من أنقرة إلى جميع أنحاء تركيا.",
      eyebrow: defaultEyebrow("ar"),
      keywordWord: OEM_PARTNER_WORD.ar,
      intro: ["Omron أحد شركاء OEM لدى AOM.", "أدناه يتم إدراج قطع غيار Omron في متجر AOM حسب الفئة. يرجى طلب عرض سعر."],
    },
  },
  panasonic: {
    en: {
      seoTitle: "Panasonic Products – Spare Parts | Ankara",
      description: "The AOM store carries Panasonic spare parts. Quotes from Ankara, nationwide across Turkey.",
      eyebrow: defaultEyebrow("en"),
      keywordWord: OEM_PARTNER_WORD.en,
      intro: ["Panasonic is one of AOM's OEM partners.", "Below, Panasonic spare parts in the AOM store are listed by category. Request a quote for pricing."],
    },
    ru: {
      seoTitle: "Продукция Panasonic — запчасти | Анкара",
      description: "В магазине AOM есть запчасти Panasonic. Предложения из Анкары по всей Турции.",
      eyebrow: defaultEyebrow("ru"),
      keywordWord: OEM_PARTNER_WORD.ru,
      intro: ["Panasonic — один из OEM-партнёров AOM.", "Ниже запчасти Panasonic из магазина AOM перечислены по категориям. Запросите предложение по цене."],
    },
    ar: {
      seoTitle: "منتجات Panasonic – قطع غيار | أنقرة",
      description: "تتوفر قطع غيار Panasonic في متجر AOM. عروض أسعار من أنقرة إلى جميع أنحاء تركيا.",
      eyebrow: defaultEyebrow("ar"),
      keywordWord: OEM_PARTNER_WORD.ar,
      intro: ["Panasonic أحد شركاء OEM لدى AOM.", "أدناه يتم إدراج قطع غيار Panasonic في متجر AOM حسب الفئة. يرجى طلب عرض سعر."],
    },
  },
  autonics: {
    en: {
      seoTitle: "Autonics Products – Power Control, SSR, Encoders, Control Devices | Ankara",
      description:
        "The AOM store carries a broad range of Autonics thyristor power control (DPU, SPR), solid state relay (SSR), encoder, and control device series (temperature controllers, counters, timers, panel meters, etc.). Quotes from Ankara, nationwide across Turkey.",
      eyebrow: defaultEyebrow("en"),
      keywordWord: OEM_PARTNER_WORD.en,
      intro: [
        "Autonics is one of AOM's OEM partners and has the broadest product family in the store.",
        "Below, Autonics products in the AOM store (thyristor power control, SSR, encoders, control devices) are listed by category; large series also have separate order code list pages. Request a quote for pricing.",
      ],
    },
    ru: {
      seoTitle: "Продукция Autonics — регуляторы мощности, SSR, энкодеры, контроллеры | Анкара",
      description:
        "В магазине AOM представлен широкий ассортимент продукции Autonics: тиристорные регуляторы мощности (DPU, SPR), твердотельные реле (SSR), энкодеры и серии контрольных приборов (температурные регуляторы, счётчики, таймеры, панельные измерители и др.). Предложения из Анкары по всей Турции.",
      eyebrow: defaultEyebrow("ru"),
      keywordWord: OEM_PARTNER_WORD.ru,
      intro: [
        "Autonics — один из OEM-партнёров AOM с самым широким семейством продукции в магазине.",
        "Ниже продукция Autonics из магазина AOM (тиристорные регуляторы мощности, SSR, энкодеры, контрольные приборы) перечислена по категориям; для крупных серий также есть отдельные страницы со списками кодов заказа. Запросите предложение по цене.",
      ],
    },
    ar: {
      seoTitle: "منتجات Autonics – تحكم بالطاقة، SSR، إنكودر، أجهزة تحكم | أنقرة",
      description:
        "يتوفر في متجر AOM مجموعة واسعة من منتجات Autonics: وحدات تحكم الطاقة الثايرستورية (DPU، SPR)، مرحلات الحالة الصلبة (SSR)، الإنكودر، وأجهزة التحكم (متحكمات الحرارة، العدادات، المؤقتات، أجهزة القياس اللوحية وغيرها). عروض أسعار من أنقرة إلى جميع أنحاء تركيا.",
      eyebrow: defaultEyebrow("ar"),
      keywordWord: OEM_PARTNER_WORD.ar,
      intro: [
        "Autonics أحد شركاء OEM لدى AOM ولديها أوسع عائلة منتجات في المتجر.",
        "أدناه يتم إدراج منتجات Autonics في متجر AOM (التحكم بالطاقة الثايرستوري، SSR، الإنكودر، أجهزة التحكم) حسب الفئة؛ تتوفر أيضًا صفحات منفصلة لقوائم رموز الطلب للسلاسل الكبيرة. يرجى طلب عرض سعر.",
      ],
    },
  },
  abb: {
    en: {
      seoTitle: "ABB OEM Partner | AOM Ankara",
      description: "ABB is one of AOM's OEM partners. Contact AOM for product selection and quotes.",
      eyebrow: defaultEyebrow("en"),
      keywordWord: OEM_PARTNER_WORD.en,
      intro: ["ABB is one of AOM's OEM partners. Contact us for ABB products suited to your project."],
    },
    ru: {
      seoTitle: "ABB — OEM-партнёр | AOM Анкара",
      description: "ABB — один из OEM-партнёров AOM. Свяжитесь с AOM для выбора продукции и получения предложения.",
      eyebrow: defaultEyebrow("ru"),
      keywordWord: OEM_PARTNER_WORD.ru,
      intro: ["ABB — один из OEM-партнёров AOM. Свяжитесь с нами, чтобы подобрать продукцию ABB для вашего проекта."],
    },
    ar: {
      seoTitle: "ABB شريك OEM | AOM أنقرة",
      description: "ABB أحد شركاء OEM لدى AOM. تواصل مع AOM لاختيار المنتج والحصول على عرض سعر.",
      eyebrow: defaultEyebrow("ar"),
      keywordWord: OEM_PARTNER_WORD.ar,
      intro: ["ABB أحد شركاء OEM لدى AOM. تواصل معنا للحصول على منتجات ABB المناسبة لمشروعك."],
    },
  },
  pilz: {
    en: {
      seoTitle: "Pilz OEM Partner – Press Safety | Ankara",
      description: "Pilz is one of AOM's OEM partners, used in press safety solutions (light curtains, interlocked guard doors, safety relays).",
      eyebrow: defaultEyebrow("en"),
      keywordWord: OEM_PARTNER_WORD.en,
      intro: [
        "Pilz is one of AOM's OEM partners. It is one of the brands used in AOM's press safety and automatic feeding solutions (light curtains, clutch-brake conversions, cage and interlocked guard door solutions).",
        "Contact us for Pilz products suited to your project.",
      ],
    },
    ru: {
      seoTitle: "Pilz — OEM-партнёр: безопасность прессов | Анкара",
      description:
        "Pilz — один из OEM-партнёров AOM, используется в решениях по безопасности прессов (световые завесы, блокируемые ограждающие двери, реле безопасности).",
      eyebrow: defaultEyebrow("ru"),
      keywordWord: OEM_PARTNER_WORD.ru,
      intro: [
        "Pilz — один из OEM-партнёров AOM. Это один из брендов, используемых в решениях AOM по безопасности прессов и автоматической подаче (световые завесы, переоборудование муфта-тормоз, защитные ограждения и блокируемые двери).",
        "Свяжитесь с нами, чтобы подобрать продукцию Pilz для вашего проекта.",
      ],
    },
    ar: {
      seoTitle: "Pilz شريك OEM – سلامة المكابس | أنقرة",
      description: "Pilz أحد شركاء OEM لدى AOM، ويُستخدم في حلول سلامة المكابس (الستائر الضوئية، أبواب الحماية المترابطة، مرحلات السلامة).",
      eyebrow: defaultEyebrow("ar"),
      keywordWord: OEM_PARTNER_WORD.ar,
      intro: [
        "Pilz أحد شركاء OEM لدى AOM. وهو أحد العلامات التجارية المستخدمة في حلول سلامة المكابس والتغذية الآلية لدى AOM (الستائر الضوئية، تحويل القابض-الفرملة، حلول الأقفاص وأبواب الحماية المترابطة).",
        "تواصل معنا للحصول على منتجات Pilz المناسبة لمشروعك.",
      ],
    },
  },
  leuze: {
    en: {
      seoTitle: "Leuze OEM Partner – Industrial Sensors | Ankara",
      description: "Leuze is one of AOM's OEM partners, used in industrial sensor and safety solutions.",
      eyebrow: defaultEyebrow("en"),
      keywordWord: OEM_PARTNER_WORD.en,
      intro: [
        "Leuze is one of AOM's OEM partners. It is one of the brands used in industrial sensor and safety solutions.",
        "Contact us for Leuze products suited to your project.",
      ],
    },
    ru: {
      seoTitle: "Leuze — OEM-партнёр: промышленные датчики | Анкара",
      description: "Leuze — один из OEM-партнёров AOM, используется в решениях промышленных датчиков и безопасности.",
      eyebrow: defaultEyebrow("ru"),
      keywordWord: OEM_PARTNER_WORD.ru,
      intro: [
        "Leuze — один из OEM-партнёров AOM. Это один из брендов, используемых в решениях промышленных датчиков и безопасности.",
        "Свяжитесь с нами, чтобы подобрать продукцию Leuze для вашего проекта.",
      ],
    },
    ar: {
      seoTitle: "Leuze شريك OEM – حساسات صناعية | أنقرة",
      description: "Leuze أحد شركاء OEM لدى AOM، ويُستخدم في حلول الحساسات الصناعية والسلامة.",
      eyebrow: defaultEyebrow("ar"),
      keywordWord: OEM_PARTNER_WORD.ar,
      intro: [
        "Leuze أحد شركاء OEM لدى AOM. وهو أحد العلامات التجارية المستخدمة في حلول الحساسات الصناعية والسلامة.",
        "تواصل معنا للحصول على منتجات Leuze المناسبة لمشروعك.",
      ],
    },
  },
  banner: {
    en: {
      seoTitle: "Banner OEM Partner – Industrial Sensors | Ankara",
      description: "Banner is one of AOM's OEM partners, used in industrial sensor and safety solutions.",
      eyebrow: defaultEyebrow("en"),
      keywordWord: OEM_PARTNER_WORD.en,
      intro: [
        "Banner is one of AOM's OEM partners. It is one of the brands used in industrial sensor and safety solutions.",
        "Contact us for Banner products suited to your project.",
      ],
    },
    ru: {
      seoTitle: "Banner — OEM-партнёр: промышленные датчики | Анкара",
      description: "Banner — один из OEM-партнёров AOM, используется в решениях промышленных датчиков и безопасности.",
      eyebrow: defaultEyebrow("ru"),
      keywordWord: OEM_PARTNER_WORD.ru,
      intro: [
        "Banner — один из OEM-партнёров AOM. Это один из брендов, используемых в решениях промышленных датчиков и безопасности.",
        "Свяжитесь с нами, чтобы подобрать продукцию Banner для вашего проекта.",
      ],
    },
    ar: {
      seoTitle: "Banner شريك OEM – حساسات صناعية | أنقرة",
      description: "Banner أحد شركاء OEM لدى AOM، ويُستخدم في حلول الحساسات الصناعية والسلامة.",
      eyebrow: defaultEyebrow("ar"),
      keywordWord: OEM_PARTNER_WORD.ar,
      intro: [
        "Banner أحد شركاء OEM لدى AOM. وهو أحد العلامات التجارية المستخدمة في حلول الحساسات الصناعية والسلامة.",
        "تواصل معنا للحصول على منتجات Banner المناسبة لمشروعك.",
      ],
    },
  },
  "schneider-electric": {
    en: {
      seoTitle: "Schneider Electric OEM Partner | AOM Ankara",
      description: "Schneider Electric is one of AOM's OEM partners, used in panel/switchgear products and automation components.",
      eyebrow: defaultEyebrow("en"),
      keywordWord: OEM_PARTNER_WORD.en,
      intro: [
        "Schneider Electric is one of AOM's OEM partners. It is one of the brands used in panel/switchgear products and automation components.",
        "Contact us for Schneider Electric products suited to your project.",
      ],
    },
    ru: {
      seoTitle: "Schneider Electric — OEM-партнёр | AOM Анкара",
      description: "Schneider Electric — один из OEM-партнёров AOM, используется в шкафной/коммутационной продукции и компонентах автоматизации.",
      eyebrow: defaultEyebrow("ru"),
      keywordWord: OEM_PARTNER_WORD.ru,
      intro: [
        "Schneider Electric — один из OEM-партнёров AOM. Это один из брендов, используемых в шкафной/коммутационной продукции и компонентах автоматизации.",
        "Свяжитесь с нами, чтобы подобрать продукцию Schneider Electric для вашего проекта.",
      ],
    },
    ar: {
      seoTitle: "Schneider Electric شريك OEM | AOM أنقرة",
      description: "Schneider Electric أحد شركاء OEM لدى AOM، ويُستخدم في منتجات اللوحات/التحويل ومكونات الأتمتة.",
      eyebrow: defaultEyebrow("ar"),
      keywordWord: OEM_PARTNER_WORD.ar,
      intro: [
        "Schneider Electric أحد شركاء OEM لدى AOM. وهو أحد العلامات التجارية المستخدمة في منتجات اللوحات/التحويل ومكونات الأتمتة.",
        "تواصل معنا للحصول على منتجات Schneider Electric المناسبة لمشروعك.",
      ],
    },
  },
};

// Marka sayfası arayüz metinleri (başlık, buton, CTA kartı). Marka adı (b.name) parametre olarak geçilir.
export type BrandPageUi = {
  productsTitle: (name: string) => string;
  siteLinkLabel: (name: string) => string;
  emptyText: (name: string) => string;
  ctaTitle: (name: string) => string;
  ctaText: string;
  ctaButton: string;
  mailSubject: (name: string) => string;
};

export const BRAND_PAGE_UI: Record<Locale, BrandPageUi> = {
  en: {
    productsTitle: (name) => `${name} products`,
    siteLinkLabel: (name) => `${name} website`,
    emptyText: (name) => `Contact us for pricing, stock, and lead time information on ${name} products.`,
    ctaTitle: (name) => `Request a quote for ${name}`,
    ctaText: "Contact us for model selection, pricing, stock, and lead time; we ship from Ankara to every city in Turkey.",
    ctaButton: "Request a quote",
    mailSubject: (name) => `${name} quote request`,
  },
  ru: {
    productsTitle: (name) => `Продукция ${name}`,
    siteLinkLabel: (name) => `Сайт ${name}`,
    emptyText: (name) => `Свяжитесь с нами, чтобы узнать цену, наличие и сроки поставки продукции ${name}.`,
    ctaTitle: (name) => `Запросить предложение по ${name}`,
    ctaText: "Свяжитесь с нами по вопросам выбора модели, цены, наличия и сроков поставки; отправляем из Анкары в любой город Турции.",
    ctaButton: "Запросить предложение",
    mailSubject: (name) => `Запрос предложения ${name}`,
  },
  ar: {
    productsTitle: (name) => `منتجات ${name}`,
    siteLinkLabel: (name) => `موقع ${name} الإلكتروني`,
    emptyText: (name) => `تواصل معنا للحصول على معلومات السعر والمخزون ومدة التسليم لمنتجات ${name}.`,
    ctaTitle: (name) => `اطلب عرض سعر لـ ${name}`,
    ctaText: "تواصل معنا لاختيار الموديل والسعر والمخزون ومدة التسليم؛ نقوم بالشحن من أنقرة إلى جميع مدن تركيا.",
    ctaButton: "اطلب عرض سعر",
    mailSubject: (name) => `طلب عرض سعر لـ ${name}`,
  },
};
