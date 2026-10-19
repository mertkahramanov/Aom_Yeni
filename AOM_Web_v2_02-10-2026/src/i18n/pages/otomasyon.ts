// /otomasyon sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
// Saha fotoğrafları ve videoları aynı dosyalar (src/w/h sayfa bileşeninde sabit) — burada yalnızca
// alt metni ve başlık (caption) çevirileri tutulur.
import type { Locale } from "../locales";

export type GroupItem = {
  title: string;
  linkLabel: string;
  text: string;
};

export type GalleryImage = { alt: string; caption: string };
export type GalleryVideo = { caption: string };

export type OtomasyonContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  jsonLdName: string;
  serviceType: string;
  crumbCurrent: string;
  eyebrow: string;
  h1: string;
  intro: string;
  searchPlaceholder: string;
  groups: {
    plc: GroupItem;
    servo: GroupItem;
    motion: GroupItem;
  };
  support: {
    h2: string;
    text1: string;
    text2Prefix: string;
    text2LinkText: string;
    text2Suffix: string;
  };
  gallery: {
    eyebrow: string;
    h2: string;
    intro: string;
    images: GalleryImage[];
    videos: GalleryVideo[];
  };
  contact: {
    title: string;
    text: string;
    itemName: string;
  };
};

export const otomasyonContent: Record<Locale, OtomasyonContent> = {
  en: {
    metaTitle: "Industrial Automation, PLC, Servo Motors, Motion Control | Ankara",
    metaDescription:
      "AOM is an Ankara-based industrial and machine automation company: PLC/SCADA-compatible control devices and HMIs, servo motors and motor drives, encoder-based motion control. Product selection, panel integration and commissioning support for robotic welding, CNC and press automation projects. Quotes nationwide across Turkey.",
    keywords: [
      "industrial automation Ankara",
      "machine automation Ankara",
      "PLC Ankara",
      "PLC-compatible products",
      "SCADA-compatible products",
      "servo motor Ankara",
      "servo drive",
      "motor drive Ankara",
      "motion control",
      "automation company Ankara",
    ],
    jsonLdName: "AOM Industrial Automation",
    serviceType: "Industrial automation products and technical consulting",
    crumbCurrent: "Industrial Automation",
    eyebrow: "Industrial automation · Ankara and nationwide Turkey",
    h1: "Industrial automation, PLC, servo motors and motion control",
    intro:
      "AOM is an Ankara-based industrial automation and machine automation company. We sell PLC/SCADA-compatible control devices, servo motors and motor drives, and encoders for motion control in our store, and we provide technical consulting on selection and supply. Our robotic welding cells, CNC machine tools and press automation projects also use the same product families in their electrical-control stage, where we provide panel integration and commissioning support.",
    searchPlaceholder: "Search by product code or model (e.g. DPU34D-500A, E40S6-1000)",
    groups: {
      plc: {
        title: "PLC / SCADA-compatible products",
        linkLabel: "Browse control devices",
        text: "Our store carries Autonics temperature controllers, counters, timers, digital panel meters, digital display units and graphic panels (HMI); all of these can be connected to a PLC or SCADA system via RS485 (Modbus RTU) or similar communication options for monitoring and control. We provide technical consulting on product selection and PLC/SCADA connection.",
      },
      servo: {
        title: "Servo motors and motor drives",
        linkLabel: "Browse motor drives",
        text: "AC variable speed drives (inverters), DC motor drives, soft starters and brake units are available in our store; step and servo motor drives used in CNC and automation cells are also within our supply scope. We support you in choosing the right motor and drive for your application.",
      },
      motion: {
        title: "Motion control / encoders",
        linkLabel: "Browse encoders",
        text: "The encoder is the core feedback component of motion control applications. Our store lists Autonics incremental and absolute encoders in full — 34 series and 8,644 order codes — by resolution, output type and connection; we support you with coupling, mounting and PLC/counter connection.",
      },
    },
    support: {
      h2: "Technical support in automation projects",
      text1:
        "Each of our robotic welding, CNC machining and press safety projects includes a needs analysis, pre-project simulation, mechanical design, manufacturing and assembly, followed by an electrical and control stage. At this stage we select PLC/SCADA-compatible control devices, servo motors and drives, and encoder-based motion control components, build the panel integration and commission the system.",
      text2Prefix: "If you'd like PLC programming, SCADA, custom machine automation and panel projects as an end-to-end service, see our ",
      text2LinkText: "PLC, SCADA and machine automation page",
      text2Suffix: ".",
    },
    gallery: {
      eyebrow: "Our field work",
      h2: "Sample projects",
      intro:
        "A few examples of our PLC/SCADA-compatible control panels and motor drive integrations, including projects we delivered to Russia, Kazakhstan and Azerbaijan. Since project and customer details are covered by confidentiality agreements, only panel images are shared here.",
      images: [
        { alt: "Control panel with PLC and drive modules prepared by AOM", caption: "Control panel with PLC and drive integration" },
        { alt: "Open control panel with dense terminal block wiring, PLC and relay groups", caption: "Control panel with dense terminal block wiring" },
        { alt: "Control panel with motor drive, ready for shipment to site", caption: "Panel ready for shipment" },
        { alt: "Control panel made up of PLC modules, power supply and terminal block groups", caption: "PLC and power distribution modules" },
        { alt: "Control panel prepared in compact dimensions", caption: "Compact control panel" },
        { alt: "Open control panel made up of drive and PLC sections", caption: "Panel with drive and PLC sections" },
        { alt: "Narrow-body control panel with multi-tier layout", caption: "Panel with multi-tier layout" },
        { alt: "Panel interior layout design and component plan", caption: "Panel interior layout design" },
        { alt: "Control panels made up of phase protection relays, circuit breakers, time relays and interposing relay groups", caption: "Control panels with phase protection and time relays" },
        { alt: "Power control panel integrating four fan-cooled digital thyristor power units", caption: "Digital thyristor power unit panel" },
      ],
      videos: [
        { caption: "Russia project — short clip from panel manufacturing" },
        { caption: "Russia project — short clip from panel manufacturing" },
        { caption: "Kazakhstan project — short clip from panel manufacturing" },
        { caption: "Azerbaijan project — short clip from panel manufacturing" },
      ],
    },
    contact: {
      title: "Request a quote for automation products",
      text: "Contact us for product selection, pricing, stock and delivery time; we ship from Ankara to every city in Turkey.",
      itemName: "Industrial automation products",
    },
  },
  ru: {
    metaTitle: "Промышленная автоматизация, ПЛК, сервоприводы, управление движением | Анкара",
    metaDescription:
      "AOM — промышленная и станочная автоматизационная компания из Анкары: PLC/SCADA-совместимые устройства управления и HMI, сервомоторы и приводы, управление движением на энкодерах. Поддержка по выбору продукции, интеграции щитов и вводу в эксплуатацию для проектов роботизированной сварки, ЧПУ и автоматизации прессов. Предложения по всей Турции.",
    keywords: [
      "промышленная автоматизация Анкара",
      "автоматизация станков Анкара",
      "ПЛК Анкара",
      "продукты совместимые с PLC",
      "продукты совместимые с SCADA",
      "сервомотор Анкара",
      "сервопривод",
      "приводы двигателей Анкара",
      "управление движением",
      "компания автоматизации Анкара",
    ],
    jsonLdName: "AOM Промышленная автоматизация",
    serviceType: "Продукция для промышленной автоматизации и техническая консультация",
    crumbCurrent: "Промышленная автоматизация",
    eyebrow: "Промышленная автоматизация · Анкара и вся Турция",
    h1: "Промышленная автоматизация, ПЛК, сервоприводы и управление движением",
    intro:
      "AOM — промышленная автоматизационная компания из Анкары, специализирующаяся на автоматизации станков и оборудования. В нашем магазине продаются PLC/SCADA-совместимые устройства управления, сервомоторы и приводы, а также энкодеры для управления движением; мы оказываем техническую консультацию по выбору и поставке. На этапе электрики и управления в наших проектах роботизированной сварки, ЧПУ-станков и автоматизации прессов используются те же продуктовые линейки — мы обеспечиваем интеграцию щитов и ввод в эксплуатацию.",
    searchPlaceholder: "Поиск по коду товара или модели (напр. DPU34D-500A, E40S6-1000)",
    groups: {
      plc: {
        title: "Продукты, совместимые с PLC/SCADA",
        linkLabel: "Посмотреть устройства управления",
        text: "В нашем магазине представлены терморегуляторы, счётчики, таймеры, цифровые щитовые измерители, цифровые дисплейные блоки и графические панели (HMI) Autonics; все эти изделия можно подключить к ПЛК или системе SCADA через RS485 (Modbus RTU) или аналогичные протоколы для мониторинга и управления. Мы оказываем техническую консультацию по выбору продукции и подключению к PLC/SCADA.",
      },
      servo: {
        title: "Сервомоторы и приводы",
        linkLabel: "Посмотреть приводы",
        text: "В нашем магазине представлены преобразователи частоты переменного тока (инверторы), приводы постоянного тока, устройства плавного пуска (софт-стартеры) и тормозные блоки; в объём наших поставок также входят шаговые и серводвигательные приводы, применяемые в ЧПУ-станках и автоматизированных ячейках. Мы помогаем подобрать двигатель и привод, соответствующие вашей задаче.",
      },
      motion: {
        title: "Управление движением / энкодеры",
        linkLabel: "Посмотреть энкодеры",
        text: "Энкодер — ключевой компонент обратной связи в задачах управления движением. В нашем магазине представлены инкрементальные и абсолютные энкодеры Autonics в полном объёме — 34 серии и 8644 кода заказа — с разбивкой по разрешению, типу выхода и подключению; мы оказываем поддержку по муфтам, монтажу и подключению к ПЛК/счётчику.",
      },
    },
    support: {
      h2: "Техническая поддержка в проектах автоматизации",
      text1:
        "Каждый из наших проектов по роботизированной сварке, обработке на станках с ЧПУ и безопасности прессов включает анализ потребностей, предпроектное моделирование, механическое проектирование, изготовление и монтаж, а затем этап электрики и управления. На этом этапе мы подбираем PLC/SCADA-совместимые устройства управления, сервомоторы и приводы, а также компоненты управления движением на энкодерах, выполняем интеграцию щита и ввод в эксплуатацию.",
      text2Prefix: "Если вы хотите получить программирование PLC, SCADA, автоматизацию специальных станков и проекты щитов как комплексную услугу, посмотрите нашу ",
      text2LinkText: "страницу PLC, SCADA и автоматизации станков",
      text2Suffix: ".",
    },
    gallery: {
      eyebrow: "Наши проекты на объектах",
      h2: "Примеры проектов",
      intro:
        "Несколько примеров наших PLC/SCADA-совместимых щитов управления и интеграций приводов, включая проекты, поставленные в Россию, Казахстан и Азербайджан. Поскольку детали проектов и клиентов защищены соглашениями о конфиденциальности, здесь публикуются только изображения щитов.",
      images: [
        { alt: "Щит управления с модулями PLC и привода, изготовленный AOM", caption: "Щит управления с интеграцией PLC и привода" },
        { alt: "Открытый щит управления с плотной клеммной разводкой, группами PLC и реле", caption: "Щит управления с плотной клеммной разводкой" },
        { alt: "Щит управления с приводом двигателя, готовый к отгрузке на объект", caption: "Щит, готовый к отгрузке" },
        { alt: "Щит управления из модулей PLC, блока питания и клеммных групп", caption: "Модули PLC и распределения питания" },
        { alt: "Щит управления компактных размеров", caption: "Компактный щит управления" },
        { alt: "Открытый щит управления с секциями привода и PLC", caption: "Щит с секциями привода и PLC" },
        { alt: "Узкий щит управления с многоярусной компоновкой", caption: "Щит с многоярусной компоновкой" },
        { alt: "Внутренняя компоновка щита и план компонентов", caption: "Внутренняя компоновка щита" },
        { alt: "Пульты управления из реле защиты фазы, автоматических выключателей, реле времени и промежуточных реле", caption: "Пульты с реле защиты фазы и реле времени" },
        { alt: "Щит силового управления с интеграцией четырёх вентилируемых цифровых тиристорных силовых блоков", caption: "Щит с цифровыми тиристорными силовыми блоками" },
      ],
      videos: [
        { caption: "Проект в России — короткий ролик с производства щита" },
        { caption: "Проект в России — короткий ролик с производства щита" },
        { caption: "Проект в Казахстане — короткий ролик с производства щита" },
        { caption: "Проект в Азербайджане — короткий ролик с производства щита" },
      ],
    },
    contact: {
      title: "Запросите коммерческое предложение на продукцию для автоматизации",
      text: "Свяжитесь с нами по вопросам выбора продукции, цены, наличия и сроков поставки; отправляем из Анкары в любой город Турции.",
      itemName: "Продукция для промышленной автоматизации",
    },
  },
  ar: {
    metaTitle: "الأتمتة الصناعية، PLC، محركات السيرفو، التحكم بالحركة | أنقرة",
    metaDescription:
      "AOM شركة أتمتة صناعية وأتمتة آلات مقرها أنقرة: أجهزة تحكم متوافقة مع PLC/SCADA وشاشات HMI، ومحركات سيرفو وسائقات محركات، وتحكم بالحركة يعمل بالمشفرات. دعم في اختيار المنتج وتكامل اللوحات والتشغيل لمشاريع اللحام الروبوتي وCNC وأتمتة المكابس. عروض أسعار لجميع أنحاء تركيا.",
    keywords: [
      "الأتمتة الصناعية أنقرة",
      "أتمتة الآلات أنقرة",
      "PLC أنقرة",
      "منتجات متوافقة مع PLC",
      "منتجات متوافقة مع SCADA",
      "محرك سيرفو أنقرة",
      "سائق سيرفو",
      "سائق محرك أنقرة",
      "التحكم بالحركة",
      "شركة أتمتة أنقرة",
    ],
    jsonLdName: "AOM الأتمتة الصناعية",
    serviceType: "منتجات الأتمتة الصناعية والاستشارات الفنية",
    crumbCurrent: "الأتمتة الصناعية",
    eyebrow: "الأتمتة الصناعية · أنقرة وعموم تركيا",
    h1: "الأتمتة الصناعية، PLC، محركات السيرفو والتحكم بالحركة",
    intro:
      "AOM شركة أتمتة صناعية مقرها أنقرة، متخصصة في أتمتة الآلات. نبيع في متجرنا أجهزة تحكم متوافقة مع PLC/SCADA، ومحركات سيرفو وسائقات محركات، ومشفرات (إنكودر) للتحكم بالحركة، ونقدم استشارات فنية حول الاختيار والتوريد. تستخدم مشاريعنا في اللحام الروبوتي وآلات CNC وأتمتة المكابس نفس عائلات المنتجات في مرحلة الكهرباء والتحكم، حيث نوفر دعم تكامل اللوحات والتشغيل.",
    searchPlaceholder: "ابحث برمز المنتج أو الموديل (مثال: DPU34D-500A، E40S6-1000)",
    groups: {
      plc: {
        title: "منتجات متوافقة مع PLC / SCADA",
        linkLabel: "تصفح أجهزة التحكم",
        text: "يضم متجرنا أجهزة تحكم بالحرارة وعدادات ومؤقتات وموازين لوحة رقمية ووحدات عرض رقمية ولوحات رسومية (HMI) من Autonics؛ يمكن توصيل جميع هذه المنتجات بنظام PLC أو SCADA عبر RS485 (Modbus RTU) أو خيارات اتصال مماثلة للمراقبة والتحكم. نقدم استشارات فنية حول اختيار المنتج والاتصال بـ PLC/SCADA.",
      },
      servo: {
        title: "محركات السيرفو وسائقات المحركات",
        linkLabel: "تصفح سائقات المحركات",
        text: "تتوفر في متجرنا سائقات سرعة متغيرة للتيار المتردد (إنفرتر)، وسائقات محركات التيار المستمر، ومُشغّلات التشغيل الناعم (سوفت ستارتر)، ووحدات الفرملة؛ كما تدخل سائقات المحركات الخطوية والسيرفو المستخدمة في آلات CNC وخلايا الأتمتة ضمن نطاق توريدنا. نقدم الدعم في اختيار المحرك والسائق المناسبين لتطبيقكم.",
      },
      motion: {
        title: "التحكم بالحركة / المشفرات (الإنكودر)",
        linkLabel: "تصفح المشفرات",
        text: "المشفر (الإنكودر) هو عنصر التغذية الراجعة الأساسي في تطبيقات التحكم بالحركة. يعرض متجرنا مشفرات Autonics التزايدية والمطلقة بالكامل — 34 سلسلة و8,644 رمز طلب — مصنّفة حسب الدقة ونوع الخرج والتوصيل؛ نقدم الدعم في القارنات (الكوبلنج) والتركيب والتوصيل بـ PLC/العداد.",
      },
    },
    support: {
      h2: "الدعم الفني في مشاريع الأتمتة",
      text1:
        "يتضمن كل مشروع من مشاريعنا في اللحام الروبوتي وتشغيل آلات CNC وسلامة المكابس تحليل الاحتياجات، والمحاكاة قبل المشروع، والتصميم الميكانيكي، والتصنيع والتركيب، ثم مرحلة الكهرباء والتحكم. في هذه المرحلة نختار أجهزة تحكم متوافقة مع PLC/SCADA ومحركات وسائقات سيرفو ومكونات تحكم بالحركة تعمل بالمشفرات، وننفذ تكامل اللوحة ونقوم بالتشغيل.",
      text2Prefix: "إذا كنت ترغب في الحصول على برمجة PLC وSCADA وأتمتة الآلات الخاصة ومشاريع اللوحات كخدمة متكاملة من البداية للنهاية، يمكنك زيارة ",
      text2LinkText: "صفحة PLC وSCADA وأتمتة الآلات",
      text2Suffix: ".",
    },
    gallery: {
      eyebrow: "أعمالنا الميدانية",
      h2: "نماذج من مشاريعنا",
      intro:
        "بعض الأمثلة على لوحات التحكم المتوافقة مع PLC/SCADA وتكاملات سائقات المحركات لدينا، بما في ذلك مشاريع قمنا بتسليمها إلى روسيا وكازاخستان وأذربيجان. نظرًا لأن تفاصيل المشاريع والعملاء مشمولة باتفاقيات سرية، يتم هنا مشاركة صور اللوحات فقط.",
      images: [
        { alt: "لوحة تحكم بوحدات PLC وسائق محرك من إعداد AOM", caption: "لوحة تحكم بتكامل PLC وسائق المحرك" },
        { alt: "لوحة تحكم مفتوحة بتوصيلات طرفية كثيفة، ومجموعات PLC وريلاي", caption: "لوحة تحكم بتوصيلات طرفية كثيفة" },
        { alt: "لوحة تحكم بسائق محرك، جاهزة للشحن إلى الموقع", caption: "لوحة جاهزة للشحن" },
        { alt: "لوحة تحكم مكوّنة من وحدات PLC ومزود طاقة ومجموعات طرفية", caption: "وحدات PLC وتوزيع الطاقة" },
        { alt: "لوحة تحكم بأبعاد مدمجة", caption: "لوحة تحكم مدمجة" },
        { alt: "لوحة تحكم مفتوحة مكوّنة من أقسام السائق وPLC", caption: "لوحة بأقسام السائق وPLC" },
        { alt: "لوحة تحكم ضيقة الهيكل بتخطيط متعدد الطبقات", caption: "لوحة بتخطيط متعدد الطبقات" },
        { alt: "تصميم التخطيط الداخلي للوحة ومخطط المكونات", caption: "تصميم التخطيط الداخلي للوحة" },
        { alt: "لوحات تحكم مكوّنة من مرحلات حماية الطور، وقواطع تلقائية، ومرحلات زمنية، ومجموعات مرحلات وسيطة", caption: "لوحات تحكم بمرحلات حماية الطور والمرحلات الزمنية" },
        { alt: "لوحة تحكم بالطاقة تدمج أربع وحدات طاقة ثايرستور رقمية مبردة بمراوح", caption: "لوحة وحدات طاقة ثايرستور رقمية" },
      ],
      videos: [
        { caption: "مشروع روسيا — مقطع قصير من تصنيع اللوحة" },
        { caption: "مشروع روسيا — مقطع قصير من تصنيع اللوحة" },
        { caption: "مشروع كازاخستان — مقطع قصير من تصنيع اللوحة" },
        { caption: "مشروع أذربيجان — مقطع قصير من تصنيع اللوحة" },
      ],
    },
    contact: {
      title: "اطلب عرض سعر لمنتجات الأتمتة",
      text: "تواصل معنا لاختيار المنتج والسعر والمخزون ومدة التسليم؛ نقوم بالشحن من أنقرة إلى جميع مدن تركيا.",
      itemName: "منتجات الأتمتة الصناعية",
    },
  },
};
