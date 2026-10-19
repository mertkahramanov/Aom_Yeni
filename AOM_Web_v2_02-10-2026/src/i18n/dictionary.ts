// Çok dilli sözlük modülü (18-10-2026). Türkçe (kök dizin) bu dosyayı KULLANMAZ — mevcut
// bileşenler (Header.tsx, Footer.tsx, HeroSlider.tsx, ...) hiç değişmeden Türkçe metni
// doğrudan içlerinde barındırmaya devam eder. Bu sözlük yalnızca src/app/[locale]/* ağacındaki
// Locale* bileşenleri ve [locale]/page.tsx tarafından kullanılır (en, ru, ar).
//
// Kapsam notu (18-10-2026, Mert onayı): ana sayfa + ortak arayüz (menü, footer, WhatsApp,
// arama kutusu, 7 adım süreç, teklif formu, çerez bandı, hero slider, OEM şeridi) bu sözlükle
// çevrildi. 19-10-2026 güncellemesi: 5 hizmet sayfası (robotik-kaynak, pres-guvenligi,
// cnc-tezgah, plc-scada, tristorlu-guc-kontrol) ve /otomasyon da çevrildi; menü/footer/ana
// sayfa kartlarındaki bağlantılar artık bu sayfaların /en, /ru, /ar karşılıklarına işaret eder
// (bkz. solutionHref, p("/otomasyon...")). Henüz çevrilmemiş /magaza ve çerez/KVKK metin
// sayfaları için bağlantılar hâlâ Türkçe sürüme işaret eder — bu sayfalar çevrilince
// güncellenecek (bkz. proje görev listesi #29–#30).

import type { Locale } from "./locales";

export type HeroArea = { icon: "fabrika" | "kod" | "disli" | "ekran" | "deney" | "gaz" | "steril" | "kabin"; title: string; text: string; imageAlt: string };
export type HeroSlide = {
  key: "otomasyon" | "kaynak" | "pres" | "cnc" | "tristor" | "medikal";
  short: string;
  eyebrow: string;
  title: string;
  lead: string;
  spec: string;
  cta: string;
  areas?: HeroArea[];
  imageAlt?: string;
  caption?: string;
};

export type Dictionary = {
  nav: {
    ariaLogo: string;
    items: { href: string; label: string }[];
    store: string;
    cta: string;
  };
  footer: {
    legalName: string;
    addressSuffix: string;
    solutionsTitle: string;
    solutions: { href: string; label: string }[];
    cerez: string;
    kvkk: string;
    settings: string;
  };
  whatsapp: { message: string; ariaLabel: string; label: string };
  search: { placeholder: string; ariaLabel: string; loading: string; empty: string };
  process: { eyebrow: string; title: string; lead: string; steps: string[] };
  teklif: {
    title: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    messageSuffix: (item: string) => string;
    kvkkPre: string;
    kvkkLink: string;
    kvkkPost: string;
    submit: string;
    submitting: string;
    cancel: string;
    thanks: string;
    thanksBody: string;
    errorDefault: string;
    errorConnection: string;
  };
  cookie: {
    regionAria: string;
    barText: string;
    policyLink: string;
    settingsBtn: string;
    reject: string;
    acceptAll: string;
    panelAria: string;
    panelTitle: string;
    panelIntro: string;
    kvkkLink: string;
    necessaryTitle: string;
    necessaryDesc: string;
    necessaryAria: string;
    analyticsTitle: string;
    analyticsDesc: string;
    analyticsAria: string;
    adsTitle: string;
    adsDesc: string;
    adsAria: string;
    rejectAll: string;
    save: string;
  };
  oem: { heading: string; ariaSuffix: string };
  hero: {
    ariaLabel: string;
    tabsAria: string;
    prevAria: string;
    nextAria: string;
    startProject: string;
    slides: HeroSlide[];
  };
  home: {
    metaTitle: string;
    metaDescription: string;
    searchEyebrow: string;
    automation: {
      eyebrow: string;
      h2: string;
      lead: string;
      more: string;
      cards: { href: string; title: string; text: string }[];
    };
    solutions: {
      eyebrow: string;
      h2: string;
      cards: { href: string; title: string; text: string }[];
    };
    services: {
      eyebrow: string;
      h2: string;
      lead: string;
      items: { title: string; text: string }[];
    };
    references: {
      eyebrow: string;
      lead: string;
    };
    contact: {
      h2: string;
      lead: string;
      inputs: string[];
      cardTitle: string;
      addressSuffix: string;
    };
  };
};

const solutionHrefTr = {
  kaynak: "/robotik-kaynak",
  pres: "/pres-guvenligi",
  cnc: "/cnc-tezgah",
  plc: "/plc-scada",
  tristor: "/tristorlu-guc-kontrol",
};

function build(locale: Locale): Dictionary {
  const p = (hash: string) => `/${locale}${hash}`;

  const nav = {
    en: [
      { href: p("/otomasyon"), label: "Automation" },
      { href: p("#cozumler"), label: "Solutions" },
      { href: p("#hizmetler"), label: "Services" },
      { href: p("#surec"), label: "Process" },
      { href: p("#oem"), label: "OEM partnerships" },
      { href: p("#referanslar"), label: "References" },
    ],
    ru: [
      { href: p("/otomasyon"), label: "Автоматизация" },
      { href: p("#cozumler"), label: "Решения" },
      { href: p("#hizmetler"), label: "Услуги" },
      { href: p("#surec"), label: "Процесс" },
      { href: p("#oem"), label: "OEM-партнёрства" },
      { href: p("#referanslar"), label: "Референсы" },
    ],
    ar: [
      { href: p("/otomasyon"), label: "الأتمتة" },
      { href: p("#cozumler"), label: "الحلول" },
      { href: p("#hizmetler"), label: "الخدمات" },
      { href: p("#surec"), label: "العملية" },
      { href: p("#oem"), label: "شراكات المصنّعين (OEM)" },
      { href: p("#referanslar"), label: "المراجع" },
    ],
  }[locale];

  const solutionHref = {
    kaynak: p(solutionHrefTr.kaynak),
    pres: p(solutionHrefTr.pres),
    cnc: p(solutionHrefTr.cnc),
    plc: p(solutionHrefTr.plc),
    tristor: p(solutionHrefTr.tristor),
  };

  const solutionsFooter = {
    en: [
      { href: solutionHref.kaynak, label: "Robotic welding" },
      { href: solutionHref.pres, label: "Press safety" },
      { href: solutionHref.cnc, label: "CNC machines" },
      { href: solutionHref.plc, label: "PLC, SCADA" },
      { href: solutionHref.tristor, label: "Thyristor power control" },
    ],
    ru: [
      { href: solutionHref.kaynak, label: "Роботизированная сварка" },
      { href: solutionHref.pres, label: "Безопасность прессов" },
      { href: solutionHref.cnc, label: "Станки с ЧПУ" },
      { href: solutionHref.plc, label: "ПЛК, SCADA" },
      { href: solutionHref.tristor, label: "Тиристорное управление мощностью" },
    ],
    ar: [
      { href: solutionHref.kaynak, label: "اللحام الروبوتي" },
      { href: solutionHref.pres, label: "سلامة المكابس" },
      { href: solutionHref.cnc, label: "مكائن CNC" },
      { href: solutionHref.plc, label: "PLC، SCADA" },
      { href: solutionHref.tristor, label: "التحكم بالطاقة بالثايرستور" },
    ],
  }[locale];

  const common = {
    en: {
      ariaLogo: "AOM home page",
      store: "Store",
      cta: "Start a project",
      addressSuffix: "Ankara, Türkiye",
      cerez: "Cookie Policy",
      kvkk: "Privacy Notice (KVKK)",
      settings: "Cookie Settings",
      waMessage: "Hello, I'm contacting you from the AOM website.",
      waAria: "Message us on WhatsApp: +90 544 624 75 14",
      waLabel: "WhatsApp",
      searchPlaceholder: "Search by product code or model (e.g. DPU34D-500A)",
      searchAria: "Search by product code or model",
      searchLoading: "Searching…",
      searchEmpty: "No results found. Check the model/code or contact us.",
      processEyebrow: "From design to commissioning",
      processTitle: "Seven steps, one point of contact",
      processLead: "Every project starts with a simulation that verifies reach, collision and cycle time.",
      steps: [
        "Needs and part analysis",
        "Pre-project simulation",
        "Mechanical design",
        "Manufacturing and assembly, in our own workshop",
        "Electrical and control",
        "Calibration and programming",
        "Commissioning and training",
      ],
      teklifTitle: "Request a quote",
      fName: "Full name",
      fEmail: "Email",
      fPhone: "Phone (optional)",
      fMessage: "Message",
      messageSuffix: (item: string) => ` (for ${item})`,
      kvkkPre: "Your personal data is processed under our ",
      kvkkLink: "Privacy Notice (KVKK)",
      kvkkPost: " in order to respond to your request.",
      submit: "Send",
      submitting: "Sending…",
      cancel: "Cancel",
      thanks: "Thank you!",
      thanksBody: "Your message has been received, we will get back to you shortly.",
      errorDefault: "Could not be sent, please try again.",
      errorConnection: "Connection error, please try again or call us.",
      cookieRegionAria: "Cookie notice",
      cookieBar:
        "In addition to essential cookies, we use analytics and advertising cookies with your consent to measure visits and the effectiveness of our ads. Details: ",
      cookiePolicyLink: "Cookie Policy",
      cookieSettingsBtn: "Settings",
      cookieReject: "Reject",
      cookieAcceptAll: "Accept all",
      cookiePanelAria: "Cookie settings",
      cookiePanelTitle: "Cookie settings",
      cookiePanelIntroA:
        "Choose which cookie categories to allow. You can change your preference anytime from the “Cookie Settings” link in the footer. Details: ",
      cookiePanelIntroMid: " · ",
      cookieKvkkLink: "Privacy Notice (KVKK)",
      necessaryTitle: "Necessary cookies",
      necessaryDesc: "Required for the site to function and to remember your cookie preference. Cannot be disabled.",
      necessaryAria: "Necessary cookies, always on",
      analyticsTitle: "Analytics cookies",
      analyticsDesc: "Lets us measure pages visited and site usage (Google Analytics 4).",
      analyticsAria: "Allow analytics cookies",
      adsTitle: "Advertising cookies",
      adsDesc: "Used to measure the effectiveness of our Google ads.",
      adsAria: "Allow advertising cookies",
      rejectAll: "Reject all",
      save: "Save",
      oemHeading: "Our OEM Brands",
      oemAriaSuffix: "products",
      heroAria: "Featured solutions",
      heroTabsAria: "Slide selection",
      heroPrevAria: "Previous slide",
      heroNextAria: "Next slide",
      more: "Explore →",
      metaTitle: "AOM | Industrial Automation, PLC, Servo Motors, Robotic Welding | Ankara, Türkiye",
      metaDescription:
        "Angora Industrial Machinery: Ankara-based industrial and machine automation; PLC/SCADA-compatible products, servo motors and motor drives, motion control (encoders), robotic welding cells, press safety, CNC machines and thyristor power control. Design, manufacturing and commissioning under one roof.",
      searchEyebrow: "Quick search by product code",
    },
    ru: {
      ariaLogo: "Главная страница AOM",
      store: "Магазин",
      cta: "Начать проект",
      addressSuffix: "Анкара, Турция",
      cerez: "Политика использования файлов cookie",
      kvkk: "Уведомление о защите данных (KVKK)",
      settings: "Настройки cookie",
      waMessage: "Здравствуйте, обращаюсь с сайта AOM.",
      waAria: "Написать в WhatsApp: +90 544 624 75 14",
      waLabel: "WhatsApp",
      searchPlaceholder: "Поиск по коду или модели (напр. DPU34D-500A)",
      searchAria: "Поиск по коду или модели товара",
      searchLoading: "Поиск…",
      searchEmpty: "Ничего не найдено. Проверьте модель/код или свяжитесь с нами.",
      processEyebrow: "От проектирования до ввода в эксплуатацию",
      processTitle: "Семь этапов, один ответственный",
      processLead: "Каждый проект начинается с симуляции, проверяющей досягаемость, столкновения и время цикла.",
      steps: [
        "Анализ потребностей и детали",
        "Предпроектная симуляция",
        "Механическое проектирование",
        "Изготовление и сборка в собственном цехе",
        "Электрика и управление",
        "Калибровка и программирование",
        "Ввод в эксплуатацию и обучение",
      ],
      teklifTitle: "Запросить предложение",
      fName: "Имя и фамилия",
      fEmail: "Эл. почта",
      fPhone: "Телефон (необязательно)",
      fMessage: "Сообщение",
      messageSuffix: (item: string) => ` (по товару ${item})`,
      kvkkPre: "Ваши персональные данные обрабатываются в соответствии с ",
      kvkkLink: "Уведомлением о защите данных (KVKK)",
      kvkkPost: " с целью ответа на ваш запрос.",
      submit: "Отправить",
      submitting: "Отправка…",
      cancel: "Отмена",
      thanks: "Спасибо!",
      thanksBody: "Ваше сообщение получено, мы свяжемся с вами в ближайшее время.",
      errorDefault: "Не удалось отправить, попробуйте снова.",
      errorConnection: "Ошибка соединения, попробуйте снова или позвоните нам.",
      cookieRegionAria: "Уведомление о cookie",
      cookieBar:
        "Помимо обязательных файлов cookie, с вашего согласия мы используем аналитические и рекламные cookie для измерения посещаемости и эффективности рекламы. Подробности: ",
      cookiePolicyLink: "Политика cookie",
      cookieSettingsBtn: "Настройки",
      cookieReject: "Отклонить",
      cookieAcceptAll: "Принять все",
      cookiePanelAria: "Настройки файлов cookie",
      cookiePanelTitle: "Настройки файлов cookie",
      cookiePanelIntroA:
        "Выберите, какие категории файлов cookie разрешить. Вы можете изменить выбор в любое время по ссылке «Настройки cookie» внизу страницы. Подробности: ",
      cookiePanelIntroMid: " · ",
      cookieKvkkLink: "Уведомление о защите данных (KVKK)",
      necessaryTitle: "Обязательные файлы cookie",
      necessaryDesc: "Необходимы для работы сайта и запоминания ваших настроек cookie. Невозможно отключить.",
      necessaryAria: "Обязательные cookie, всегда включены",
      analyticsTitle: "Аналитические файлы cookie",
      analyticsDesc: "Позволяют нам измерять посещённые страницы и использование сайта (Google Analytics 4).",
      analyticsAria: "Разрешить аналитические cookie",
      adsTitle: "Рекламные файлы cookie",
      adsDesc: "Используются для измерения эффективности нашей рекламы в Google.",
      adsAria: "Разрешить рекламные cookie",
      rejectAll: "Отклонить все",
      save: "Сохранить",
      oemHeading: "Наши OEM-бренды",
      oemAriaSuffix: "продукция",
      heroAria: "Избранные решения",
      heroTabsAria: "Выбор слайда",
      heroPrevAria: "Предыдущий слайд",
      heroNextAria: "Следующий слайд",
      more: "Подробнее →",
      metaTitle: "AOM | Промышленная автоматизация, ПЛК, сервоприводы, роботизированная сварка | Анкара",
      metaDescription:
        "Angora Industrial Machinery: промышленная и машинная автоматизация из Анкары; совместимые с ПЛК/SCADA устройства, сервоприводы и приводы двигателей, управление движением (энкодеры), ячейки роботизированной сварки, безопасность прессов, станки с ЧПУ и тиристорное управление мощностью. Проектирование, производство и ввод в эксплуатацию под одной крышей.",
      searchEyebrow: "Быстрый поиск по коду товара",
    },
    ar: {
      ariaLogo: "الصفحة الرئيسية لشركة AOM",
      store: "المتجر",
      cta: "ابدأ مشروعًا",
      addressSuffix: "أنقرة، تركيا",
      cerez: "سياسة ملفات تعريف الارتباط",
      kvkk: "إشعار حماية البيانات (KVKK)",
      settings: "إعدادات ملفات تعريف الارتباط",
      waMessage: "مرحبًا، أتواصل معكم من خلال موقع AOM الإلكتروني.",
      waAria: "راسلنا عبر واتساب: ‎+90 544 624 75 14",
      waLabel: "WhatsApp",
      searchPlaceholder: "ابحث برمز المنتج أو الموديل (مثال: DPU34D-500A)",
      searchAria: "البحث برمز المنتج أو الموديل",
      searchLoading: "جارٍ البحث…",
      searchEmpty: "لم يتم العثور على نتائج. تحقق من الموديل/الرمز أو تواصل معنا.",
      processEyebrow: "من التصميم إلى التشغيل",
      processTitle: "سبع خطوات، جهة مسؤولة واحدة",
      processLead: "يبدأ كل مشروع بمحاكاة تتحقق من مدى الوصول والتصادمات وزمن الدورة.",
      steps: [
        "تحليل الاحتياجات والقطعة",
        "محاكاة ما قبل المشروع",
        "التصميم الميكانيكي",
        "التصنيع والتجميع في ورشتنا الخاصة",
        "الكهرباء والتحكم",
        "المعايرة والبرمجة",
        "التشغيل والتدريب",
      ],
      teklifTitle: "اطلب عرض سعر",
      fName: "الاسم الكامل",
      fEmail: "البريد الإلكتروني",
      fPhone: "الهاتف (اختياري)",
      fMessage: "الرسالة",
      messageSuffix: (item: string) => ` (بخصوص ${item})`,
      kvkkPre: "تتم معالجة بياناتك الشخصية بموجب ",
      kvkkLink: "إشعار حماية البيانات (KVKK)",
      kvkkPost: " بهدف الرد على طلبك.",
      submit: "إرسال",
      submitting: "جارٍ الإرسال…",
      cancel: "إلغاء",
      thanks: "شكرًا لك!",
      thanksBody: "تم استلام رسالتك، وسنتواصل معك في أقرب وقت ممكن.",
      errorDefault: "تعذر الإرسال، يرجى المحاولة مرة أخرى.",
      errorConnection: "خطأ في الاتصال، يرجى المحاولة مرة أخرى أو الاتصال بنا هاتفيًا.",
      cookieRegionAria: "إشعار ملفات تعريف الارتباط",
      cookieBar:
        "بالإضافة إلى ملفات تعريف الارتباط الضرورية، نستخدم بموافقتك ملفات تعريف ارتباط تحليلية وإعلانية لقياس الزيارات وفعالية إعلاناتنا. التفاصيل: ",
      cookiePolicyLink: "سياسة ملفات تعريف الارتباط",
      cookieSettingsBtn: "الإعدادات",
      cookieReject: "رفض",
      cookieAcceptAll: "قبول الكل",
      cookiePanelAria: "إعدادات ملفات تعريف الارتباط",
      cookiePanelTitle: "إعدادات ملفات تعريف الارتباط",
      cookiePanelIntroA:
        "اختر فئات ملفات تعريف الارتباط التي تسمح بها. يمكنك تغيير تفضيلك في أي وقت من رابط «إعدادات ملفات تعريف الارتباط» أسفل الصفحة. التفاصيل: ",
      cookiePanelIntroMid: " · ",
      cookieKvkkLink: "إشعار حماية البيانات (KVKK)",
      necessaryTitle: "ملفات تعريف الارتباط الضرورية",
      necessaryDesc: "ضرورية لعمل الموقع ولتذكر تفضيلك بشأن ملفات تعريف الارتباط. لا يمكن إيقافها.",
      necessaryAria: "ملفات تعريف الارتباط الضرورية، مفعّلة دائمًا",
      analyticsTitle: "ملفات تعريف الارتباط التحليلية",
      analyticsDesc: "تتيح لنا قياس الصفحات التي تمت زيارتها واستخدام الموقع (Google Analytics 4).",
      analyticsAria: "السماح بملفات تعريف الارتباط التحليلية",
      adsTitle: "ملفات تعريف الارتباط الإعلانية",
      adsDesc: "تُستخدم لقياس فعالية إعلاناتنا على جوجل.",
      adsAria: "السماح بملفات تعريف الارتباط الإعلانية",
      rejectAll: "رفض الكل",
      save: "حفظ",
      oemHeading: "علاماتنا التجارية (OEM)",
      oemAriaSuffix: "منتجات",
      heroAria: "الحلول المميزة",
      heroTabsAria: "اختيار الشريحة",
      heroPrevAria: "الشريحة السابقة",
      heroNextAria: "الشريحة التالية",
      more: "استكشف ←",
      metaTitle: "AOM | الأتمتة الصناعية، PLC، محركات السيرفو، اللحام الروبوتي | أنقرة، تركيا",
      metaDescription:
        "أنجورا للآلات الصناعية: شركة أتمتة صناعية وأتمتة آلات مقرها أنقرة؛ منتجات متوافقة مع PLC/SCADA، محركات سيرفو ومشغلات محركات، التحكم بالحركة (أجهزة ترميز)، خلايا لحام روبوتية، سلامة المكابس، مكائن CNC والتحكم بالطاقة بالثايرستور. التصميم والتصنيع والتشغيل تحت سقف واحد.",
      searchEyebrow: "بحث سريع برمز المنتج",
    },
  }[locale];

  // Record<Locale, HeroSlide[]> ile açıkça tiplendi (19-10-2026 derleme düzeltmesi): bu
  // tip belirtilmeden nesne hazır bilgisine (object literal) bırakılırsa, TypeScript her
  // dizideki "key"/"icon" alanlarını union literal yerine genel string'e genişletiyor
  // (contextual typing yok) ve }[locale] ile HeroSlide[]'a atama sırasında derleme hatası
  // veriyordu (Vercel build hatası, 19-10-2026). Diğer sözlükler (nav, footer, home.* vb.)
  // yalnızca düz string alanlar kullandığı için bu sorunu yaşamıyor; yalnızca HeroSlide/HeroArea
  // gibi literal union alanı olan tipler bu açık Record<Locale, T> kalıbını gerektirir.
  const heroSlidesByLocale: Record<Locale, HeroSlide[]> = {
    en: [
      {
        key: "otomasyon",
        short: "Automation",
        eyebrow: "Industrial automation",
        title: "From the shop floor to SCADA, every layer of automation.",
        lead: "We run industrial automation, software, machine automation and SCADA projects as one team, from design to commissioning.",
        spec: "One point of contact, one responsibility",
        cta: "Explore automation solutions",
        areas: [
          { icon: "fabrika", title: "Industrial Automation", text: "Production lines and process control", imageAlt: "Automatic assembly station: pneumatic gripper on a gantry axis, rotary table, cable chain and control cabinet" },
          { icon: "kod", title: "Software", text: "PLC, HMI and robot programming", imageAlt: "Engineering desk: PLC programming and HMI design screens, laptop connected to a PLC and touch panel" },
          { icon: "disli", title: "Machine Automation", text: "Custom machines and retrofit projects", imageAlt: "Extruder machine: red-hooded extruder, feed hopper, die head, cooling trough and control cabinet" },
          { icon: "ekran", title: "SCADA", text: "Monitoring, reporting and data acquisition", imageAlt: "SCADA control room: plant flow diagram on the wall screen, monitoring screens at the operator desk, workshop visible through the glass" },
        ],
      },
      {
        key: "kaynak",
        short: "Robotic welding",
        eyebrow: "Robotic welding and external systems",
        title: "From welding robot to positioner, all from one source.",
        lead: "Mechanical design, manufacturing, electrical work, robot integration and commissioning under one roof. We build in our own mechanical workshop and commission on site.",
        spec: "Up to 500 kg payload · up to 6 m reach",
        cta: "Explore welding systems",
        imageAlt: "Robotic welding cell: welding robot, steel frame on a two-axis positioner, safety fencing and fume extraction arm",
        caption: "AOM robotic welding cell",
      },
      {
        key: "pres",
        short: "Press safety",
        eyebrow: "Press safety and automatic feeding",
        title: "Safety and servo feeding for eccentric presses.",
        lead: "Light curtains, clutch-brake retrofits, cage and interlocked-door solutions. We carry out the retrofits in our own mechanical workshop.",
        spec: "0–500 mm material width · 10 µm step accuracy",
        cta: "Explore press solutions",
        imageAlt: "Eccentric press: light curtain and guards around the die area, two-hand control unit, servo NC feed and coil uncoiler",
        caption: "AOM eccentric press with automatic feeding",
      },
      {
        key: "cnc",
        short: "CNC machines",
        eyebrow: "Compact CNC machining centers",
        title: "Invest in performance, not a logo.",
        lead: "We design, build and commission compact CNC machines in Ankara. Siemens, Fanuc or Mitsubishi Electric control; robotic cell option available.",
        spec: "Service and spare parts from Ankara",
        cta: "Explore CNC machines",
        imageAlt: "Vertical CNC machining center: red-framed doors, vise-equipped table, coolant nozzles and swing-arm control panel",
        caption: "AOM CNC machining center",
      },
      {
        key: "tristor",
        short: "Thyristor panels",
        eyebrow: "Thyristor power control panels",
        title: "Precise power control for thermal processes.",
        lead: "Phase-angle and zero-crossing control, RS485 Modbus RTU communication.",
        spec: "600 A per channel",
        cta: "Explore power control",
        imageAlt: "Thyristor power control panel: heatsink-mounted thyristor modules, copper busbars, main breaker and an HMI touchscreen on the door",
        caption: "AOM power control unit and HMI",
      },
      {
        key: "medikal",
        short: "Medical devices",
        eyebrow: "Medical and laboratory devices",
        title: "Reliable solutions in laboratory and medical equipment.",
        lead: "Major laboratory equipment, oxygen and nitrogen generators, sterilization cabinets, fume hoods and biosafety cabinets.",
        spec: "Laboratory · Gas · Sterilization · Biosafety",
        cta: "Explore medical devices",
        areas: [
          { icon: "deney", title: "Laboratory Equipment", text: "Major laboratory equipment", imageAlt: "Laboratory bench with an incubator and drying oven, a centrifuge and a magnetic stirrer" },
          { icon: "gaz", title: "Gas Generators", text: "Oxygen and nitrogen generators", imageAlt: "PSA oxygen and nitrogen generator: touchscreen cabinet, stainless adsorption columns, buffer tank and piping with pressure gauges" },
          { icon: "steril", title: "Sterilization Cabinets", text: "Medical and laboratory sterilization", imageAlt: "Wall-mounted steam sterilizer (autoclave): open stainless door, loading rack and basket cart" },
          { icon: "kabin", title: "Biosafety Cabinets", text: "Fume hoods and biosafety cabinets", imageAlt: "Class II biosafety cabinet, with a fume hood and exhaust ducting visible behind it" },
        ],
      },
    ],
    ru: [
      {
        key: "otomasyon",
        short: "Автоматизация",
        eyebrow: "Промышленная автоматизация",
        title: "От цеха до SCADA — все уровни автоматизации.",
        lead: "Мы реализуем проекты промышленной автоматизации, ПО, автоматизации машин и SCADA одной командой — от проектирования до ввода в эксплуатацию.",
        spec: "Один контакт, одна ответственность",
        cta: "Посмотреть решения по автоматизации",
        areas: [
          { icon: "fabrika", title: "Промышленная автоматизация", text: "Производственные линии и контроль процессов", imageAlt: "Автоматическая сборочная станция: пневматический захват на портальной оси, поворотный стол, кабельная цепь и шкаф управления" },
          { icon: "kod", title: "Программное обеспечение", text: "Программирование ПЛК, HMI и роботов", imageAlt: "Инженерный стол: экраны программирования ПЛК и дизайна HMI, ноутбук, подключённый к ПЛК и сенсорной панели" },
          { icon: "disli", title: "Автоматизация машин", text: "Специальные машины и проекты модернизации", imageAlt: "Экструдер: экструдер с красным кожухом, загрузочный бункер, фильера, охлаждающая ванна и шкаф управления" },
          { icon: "ekran", title: "SCADA", text: "Мониторинг, отчётность и сбор данных", imageAlt: "Диспетчерская SCADA: схема потока предприятия на настенном экране, мониторы на столе оператора, цех виден через стекло" },
        ],
      },
      {
        key: "kaynak",
        short: "Роботизированная сварка",
        eyebrow: "Роботизированная сварка и внешние системы",
        title: "От сварочного робота до позиционера — из одних рук.",
        lead: "Механическое проектирование, производство, электрика, интеграция робота и ввод в эксплуатацию — всё под одной крышей. Производим в собственном цехе, вводим в эксплуатацию на месте.",
        spec: "Грузоподъёмность до 500 кг · вылет до 6 м",
        cta: "Посмотреть сварочные системы",
        imageAlt: "Ячейка роботизированной сварки: сварочный робот, стальная рама на двухосевом позиционере, защитное ограждение и рукав дымоудаления",
        caption: "Роботизированная сварочная ячейка AOM",
      },
      {
        key: "pres",
        short: "Безопасность прессов",
        eyebrow: "Безопасность прессов и автоматическая подача",
        title: "Безопасность и сервоподача для эксцентриковых прессов.",
        lead: "Световые завесы, модернизация муфты-тормоза, защитные клетки и блокируемые двери. Модернизацию выполняем в собственном механическом цехе.",
        spec: "Ширина материала 0–500 мм · точность шага 10 мкм",
        cta: "Посмотреть решения для прессов",
        imageAlt: "Эксцентриковый пресс: световая завеса и ограждения в зоне штампа, пульт двуручного управления, серво NC подача и разматыватель рулона",
        caption: "Эксцентриковый пресс AOM с автоматической подачей",
      },
      {
        key: "cnc",
        short: "Станки с ЧПУ",
        eyebrow: "Компактные обрабатывающие центры с ЧПУ",
        title: "Инвестируйте в производительность, а не в бренд.",
        lead: "Мы проектируем, производим и вводим в эксплуатацию компактные станки с ЧПУ в Анкаре. Управление Siemens, Fanuc или Mitsubishi Electric; есть вариант с роботизированной ячейкой.",
        spec: "Сервис и запчасти из Анкары",
        cta: "Посмотреть станки с ЧПУ",
        imageAlt: "Вертикальный обрабатывающий центр с ЧПУ: двери с красной рамой, стол с тисками, форсунки СОЖ и панель управления на поворотном кронштейне",
        caption: "Обрабатывающий центр с ЧПУ AOM",
      },
      {
        key: "tristor",
        short: "Тиристорные панели",
        eyebrow: "Панели тиристорного управления мощностью",
        title: "Точное управление мощностью для тепловых процессов.",
        lead: "Фазовое и нулевое управление, связь по RS485 Modbus RTU.",
        spec: "600 А на канал",
        cta: "Посмотреть управление мощностью",
        imageAlt: "Панель тиристорного управления мощностью: тиристорные модули на радиаторах, медные шины, главный выключатель и сенсорный экран HMI на дверце",
        caption: "Блок управления мощностью AOM и HMI",
      },
      {
        key: "medikal",
        short: "Медицинское оборудование",
        eyebrow: "Медицинское и лабораторное оборудование",
        title: "Надёжные решения в лабораторном и медицинском оборудовании.",
        lead: "Основное лабораторное оборудование, генераторы кислорода и азота, стерилизационные шкафы, вытяжные шкафы и боксы биобезопасности.",
        spec: "Лаборатория · Газ · Стерилизация · Биобезопасность",
        cta: "Посмотреть медицинское оборудование",
        areas: [
          { icon: "deney", title: "Лабораторное оборудование", text: "Основное лабораторное оборудование", imageAlt: "Лабораторный стол с инкубатором и сушильным шкафом, центрифугой и магнитной мешалкой" },
          { icon: "gaz", title: "Газовые генераторы", text: "Генераторы кислорода и азота", imageAlt: "Генератор кислорода и азота PSA: шкаф с сенсорным экраном, адсорбционные колонны из нержавеющей стали, буферный резервуар и трубопровод с манометрами" },
          { icon: "steril", title: "Стерилизационные шкафы", text: "Медицинская и лабораторная стерилизация", imageAlt: "Настенный паровой стерилизатор (автоклав): открытая дверца из нержавеющей стали, загрузочная полка и тележка с корзинами" },
          { icon: "kabin", title: "Боксы биобезопасности", text: "Вытяжные шкафы и боксы биобезопасности", imageAlt: "Бокс биобезопасности класса II, за ним виден вытяжной шкаф с вытяжными каналами" },
        ],
      },
    ],
    ar: [
      {
        key: "otomasyon",
        short: "الأتمتة",
        eyebrow: "الأتمتة الصناعية",
        title: "من أرضية المصنع إلى SCADA، كل طبقات الأتمتة.",
        lead: "ننفّذ مشاريع الأتمتة الصناعية والبرمجيات وأتمتة الآلات وSCADA بفريق واحد، من التصميم إلى التشغيل.",
        spec: "جهة اتصال واحدة، مسؤولية واحدة",
        cta: "استكشف حلول الأتمتة",
        areas: [
          { icon: "fabrika", title: "الأتمتة الصناعية", text: "خطوط الإنتاج والتحكم بالعمليات", imageAlt: "محطة تجميع آلية: ماسكة هوائية على محور بوابي، طاولة دوّارة، سلسلة كابلات ولوحة تحكم" },
          { icon: "kod", title: "البرمجيات", text: "برمجة PLC وHMI والروبوتات", imageAlt: "مكتب هندسي: شاشات برمجة PLC وتصميم HMI، كمبيوتر محمول متصل بوحدة PLC ولوحة لمس" },
          { icon: "disli", title: "أتمتة الآلات", text: "مشاريع الآلات المخصّصة والتحديث", imageAlt: "ماكينة بثق: ماكينة بثق بغطاء أحمر، قمع تغذية، رأس القالب، حوض تبريد ولوحة تحكم" },
          { icon: "ekran", title: "SCADA", text: "المراقبة وإعداد التقارير وجمع البيانات", imageAlt: "غرفة تحكم SCADA: مخطط تدفق المصنع على الشاشة الجدارية، شاشات مراقبة على مكتب المشغّل، وتظهر الورشة خلف الزجاج" },
        ],
      },
      {
        key: "kaynak",
        short: "اللحام الروبوتي",
        eyebrow: "اللحام الروبوتي والأنظمة الخارجية",
        title: "من روبوت اللحام إلى المُحدِّد، من مصدر واحد.",
        lead: "التصميم الميكانيكي والتصنيع والكهرباء ودمج الروبوت والتشغيل، كلها تحت سقف واحد. نصنّع في ورشتنا الخاصة ونقوم بالتشغيل في الموقع.",
        spec: "حمولة تصل إلى 500 كجم · مدى وصول حتى 6 أمتار",
        cta: "استكشف أنظمة اللحام",
        imageAlt: "خلية لحام روبوتية: روبوت لحام، إطار فولاذي على محدِّد ثنائي المحور، سياج أمان وذراع شفط الدخان",
        caption: "خلية اللحام الروبوتية من AOM",
      },
      {
        key: "pres",
        short: "سلامة المكابس",
        eyebrow: "سلامة المكابس والتغذية الآلية",
        title: "السلامة والتغذية بالسيرفو للمكابس اللامركزية.",
        lead: "ستائر ضوئية، تحديث القابض-الفرامل، أقفاص وأبواب مترابطة. ننفّذ التحديثات في ورشتنا الميكانيكية الخاصة.",
        spec: "عرض مادة 0-500 مم · دقة خطوة 10 ميكرومتر",
        cta: "استكشف حلول المكابس",
        imageAlt: "مكبس لامركزي: ستارة ضوئية وحواجز حول منطقة القالب، وحدة تحكم بيدين، تغذية NC بالسيرفو وفاتحة لفة",
        caption: "مكبس لامركزي من AOM بتغذية آلية",
      },
      {
        key: "cnc",
        short: "مكائن CNC",
        eyebrow: "مراكز تشغيل CNC مدمجة",
        title: "استثمر في الأداء، لا في الشعار.",
        lead: "نصمم ونصنّع ونشغّل مكائن CNC المدمجة في أنقرة. تحكم Siemens أو Fanuc أو Mitsubishi Electric؛ مع خيار الخلية الروبوتية.",
        spec: "خدمة وقطع غيار من أنقرة",
        cta: "استكشف مكائن CNC",
        imageAlt: "مركز تشغيل CNC رأسي: أبواب بإطار أحمر، طاولة مزوّدة بمِلزمة، فوهات تبريد ولوحة تحكم على ذراع دوّار",
        caption: "مركز تشغيل CNC من AOM",
      },
      {
        key: "tristor",
        short: "لوحات الثايرستور",
        eyebrow: "لوحات التحكم بالطاقة بالثايرستور",
        title: "تحكم دقيق بالطاقة للعمليات الحرارية.",
        lead: "تحكم بزاوية الطور والعبور الصفري، اتصال RS485 Modbus RTU.",
        spec: "600 أمبير لكل قناة",
        cta: "استكشف التحكم بالطاقة",
        imageAlt: "لوحة تحكم بالطاقة بالثايرستور: وحدات ثايرستور مركّبة على مبدّدات حرارية، قضبان نحاسية، قاطع رئيسي وشاشة لمس HMI على الباب",
        caption: "وحدة التحكم بالطاقة من AOM وHMI",
      },
      {
        key: "medikal",
        short: "الأجهزة الطبية",
        eyebrow: "الأجهزة الطبية والمخبرية",
        title: "حلول موثوقة في الأجهزة المخبرية والطبية.",
        lead: "الأجهزة المخبرية الرئيسية، مولدات الأكسجين والنيتروجين، خزائن التعقيم، خزائن الشفط وخزائن السلامة الحيوية.",
        spec: "المختبر · الغاز · التعقيم · السلامة الحيوية",
        cta: "استكشف الأجهزة الطبية",
        areas: [
          { icon: "deney", title: "الأجهزة المخبرية", text: "الأجهزة المخبرية الرئيسية", imageAlt: "منضدة مخبرية عليها حاضنة وفرن تجفيف، جهاز طرد مركزي وخلاط مغناطيسي" },
          { icon: "gaz", title: "مولدات الغاز", text: "مولدات الأكسجين والنيتروجين", imageAlt: "مولد أكسجين ونيتروجين PSA: خزانة بشاشة لمس، أعمدة امتزاز من الفولاذ المقاوم للصدأ، خزان تخزين مؤقت وأنابيب بمقاييس ضغط" },
          { icon: "steril", title: "خزائن التعقيم", text: "التعقيم الطبي والمخبري", imageAlt: "معقم بخاري مثبت على الحائط (أوتوكلاف): باب مفتوح من الفولاذ المقاوم للصدأ، رف تحميل وعربة سلال" },
          { icon: "kabin", title: "خزائن السلامة الحيوية", text: "خزائن الشفط وخزائن السلامة الحيوية", imageAlt: "خزانة سلامة حيوية من الفئة الثانية، ويظهر خلفها خزانة شفط بقنوات عادم" },
        ],
      },
    ],
  };
  const heroSlides: HeroSlide[] = heroSlidesByLocale[locale];

  const homeAutomationCards = {
    en: [
      { href: p("/otomasyon#plc"), title: "PLC / SCADA-compatible products", text: "Temperature controllers, counters, timers, panel meters, HMI and digital display units; can be connected to a PLC or SCADA system for monitoring and control." },
      { href: p("/otomasyon#servo"), title: "Servo motors and motor drives", text: "AC/DC motor drives, soft starters and step/servo motor drives; support with selection, supply and panel integration." },
      { href: p("/otomasyon#motion"), title: "Motion control / encoders", text: "Incremental and absolute encoders across 34 series with 8,644 order codes; for motion applications that require position and speed feedback." },
      { href: p("/otomasyon"), title: "Technical support for automation projects", text: "Support with product selection, panel integration and commissioning in the electrical-control stage of robotic welding, CNC and press cells." },
    ],
    ru: [
      { href: p("/otomasyon#plc"), title: "Продукция, совместимая с ПЛК/SCADA", text: "Терморегуляторы, счётчики, таймеры, щитовые измерители, HMI и цифровые дисплейные блоки; подключаются к ПЛК или SCADA-системе для мониторинга и управления." },
      { href: p("/otomasyon#servo"), title: "Сервоприводы и приводы двигателей", text: "Приводы двигателей переменного/постоянного тока, устройства плавного пуска и приводы шаговых/сервоприводов; поддержка в выборе, поставке и интеграции в шкаф." },
      { href: p("/otomasyon#motion"), title: "Управление движением / энкодеры", text: "Инкрементальные и абсолютные энкодеры — 34 серии, 8 644 артикула; для задач управления движением с обратной связью по положению и скорости." },
      { href: p("/otomasyon"), title: "Техническая поддержка в проектах автоматизации", text: "Поддержка в выборе продукции, интеграции в шкаф и вводе в эксплуатацию на этапе электрики и управления в ячейках роботизированной сварки, ЧПУ и прессов." },
    ],
    ar: [
      { href: p("/otomasyon#plc"), title: "منتجات متوافقة مع PLC / SCADA", text: "أجهزة تحكم بدرجة الحرارة، عدّادات، مؤقتات، أجهزة قياس للوحات، وحدات HMI وشاشات رقمية؛ يمكن ربطها بنظام PLC أو SCADA للمراقبة والتحكم." },
      { href: p("/otomasyon#servo"), title: "محركات السيرفو ومشغلات المحركات", text: "مشغلات محركات AC/DC، أجهزة بدء تشغيل ناعم ومشغلات محركات الخطوة/السيرفو؛ دعم في الاختيار والتوريد والدمج في اللوحات." },
      { href: p("/otomasyon#motion"), title: "التحكم بالحركة / أجهزة الترميز", text: "أجهزة ترميز تزايدية ومطلقة ضمن 34 سلسلة و8,644 رمز طلب؛ لتطبيقات الحركة التي تتطلب تغذية راجعة للموضع والسرعة." },
      { href: p("/otomasyon"), title: "الدعم الفني لمشاريع الأتمتة", text: "دعم في اختيار المنتجات والدمج في اللوحات والتشغيل في مرحلة الكهرباء والتحكم لخلايا اللحام الروبوتي وCNC والمكابس." },
    ],
  }[locale];

  const solutionsCards = {
    en: [
      { href: solutionHref.kaynak, title: "Robotic welding and external systems", text: "Welding cells, positioners, external axes, column-and-boom, rotators, fit-up lines and circumferential welding systems." },
      { href: solutionHref.pres, title: "Press safety and automatic feeding", text: "Light curtains, clutch-brake retrofits, cage and interlocked-door solutions; servo NC feeding." },
      { href: solutionHref.cnc, title: "CNC machines", text: "Compact CNC machining centers; Siemens, Fanuc or Mitsubishi Electric control, robotic cell option." },
      { href: solutionHref.plc, title: "PLC, SCADA and machine automation", text: "PLC/HMI programming, SCADA and data acquisition, custom machine automation, panel design and commissioning." },
      { href: solutionHref.tristor, title: "Thyristor power control", text: "Phase-angle and zero-crossing control, RS485 Modbus RTU communication." },
    ],
    ru: [
      { href: solutionHref.kaynak, title: "Роботизированная сварка и внешние системы", text: "Сварочные ячейки, позиционеры, внешние оси, колонно-консольные системы, ротаторы, линии фит-ап и системы кольцевой сварки." },
      { href: solutionHref.pres, title: "Безопасность прессов и автоматическая подача", text: "Световые завесы, модернизация муфты-тормоза, защитные клетки и блокируемые двери; серво NC подача." },
      { href: solutionHref.cnc, title: "Станки с ЧПУ", text: "Компактные обрабатывающие центры с ЧПУ; управление Siemens, Fanuc или Mitsubishi Electric, вариант с роботизированной ячейкой." },
      { href: solutionHref.plc, title: "ПЛК, SCADA и автоматизация машин", text: "Программирование ПЛК/HMI, SCADA и сбор данных, автоматизация специальных машин, проектирование шкафов и ввод в эксплуатацию." },
      { href: solutionHref.tristor, title: "Тиристорное управление мощностью", text: "Фазовое и нулевое управление, связь RS485 Modbus RTU." },
    ],
    ar: [
      { href: solutionHref.kaynak, title: "اللحام الروبوتي والأنظمة الخارجية", text: "خلايا لحام، محدِّدات، محاور خارجية، أنظمة عمود-ذراع، أجهزة تدوير، خطوط تجميع وأنظمة لحام دائري." },
      { href: solutionHref.pres, title: "سلامة المكابس والتغذية الآلية", text: "ستائر ضوئية، تحديث القابض-الفرامل، حلول الأقفاص والأبواب المترابطة؛ تغذية NC بالسيرفو." },
      { href: solutionHref.cnc, title: "مكائن CNC", text: "مراكز تشغيل CNC مدمجة؛ تحكم Siemens أو Fanuc أو Mitsubishi Electric، مع خيار الخلية الروبوتية." },
      { href: solutionHref.plc, title: "PLC وSCADA وأتمتة الآلات", text: "برمجة PLC/HMI، SCADA وجمع البيانات، أتمتة آلات مخصّصة، تصميم اللوحات والتشغيل." },
      { href: solutionHref.tristor, title: "التحكم بالطاقة بالثايرستور", text: "تحكم بزاوية الطور والعبور الصفري، اتصال RS485 Modbus RTU." },
    ],
  }[locale];

  const serviceItems = {
    en: [
      { title: "Pre-project simulation", text: "Reach, collision and cycle-time verification" },
      { title: "Free robot training", text: "After robot sale, pendant included" },
      { title: "Fixture and gripper design", text: "3-2-1 locating, sensor-equipped gripper sequencing" },
      { title: "Mechanical retrofits", text: "E.g. pneumatic clutch-brake on a crank press" },
    ],
    ru: [
      { title: "Предпроектная симуляция", text: "Проверка досягаемости, столкновений и времени цикла" },
      { title: "Бесплатное обучение работе с роботом", text: "После продажи робота, включая пульт" },
      { title: "Проектирование оснастки и захватов", text: "Базирование 3-2-1, последовательность захватов с датчиками" },
      { title: "Механическая модернизация", text: "Например, пневматическая муфта-тормоз на кривошипном прессе" },
    ],
    ar: [
      { title: "محاكاة ما قبل المشروع", text: "التحقق من مدى الوصول والتصادمات وزمن الدورة" },
      { title: "تدريب مجاني على الروبوت", text: "بعد بيع الروبوت، شاملاً لوحة التحكم" },
      { title: "تصميم التثبيتات والقوابض", text: "تموضع 3-2-1، تسلسل قوابض مزوّدة بحساسات" },
      { title: "التحديثات الميكانيكية", text: "مثال: قابض-فرامل هوائي على مكبس كرنك" },
    ],
  }[locale];

  const projectInputs = {
    en: ["3D model or technical drawing", "Part weight and dimensions", "Weld seam list and process", "Annual volume and target cycle time", "Existing robot and welding machine, if any"],
    ru: ["3D-модель или технический чертёж", "Вес и размеры детали", "Перечень сварных швов и процесс", "Годовой объём и целевое время цикла", "Имеющийся робот и сварочный аппарат, если есть"],
    ar: ["نموذج ثلاثي الأبعاد أو رسم فني", "وزن القطعة وأبعادها", "قائمة لحامات اللحام والعملية", "الكمية السنوية وزمن الدورة المستهدف", "الروبوت وآلة اللحام الموجودة إن وجدت"],
  }[locale];

  return {
    nav: { ariaLogo: common.ariaLogo, items: nav, store: common.store, cta: common.cta },
    footer: {
      legalName: "ANGORA ENDÜSTRİYEL MAKİNE TEKNO. OTOMAS. SAN. VE TİC. LTD. ŞTİ.",
      addressSuffix: common.addressSuffix,
      solutionsTitle: { en: "Solutions", ru: "Решения", ar: "الحلول" }[locale],
      solutions: solutionsFooter,
      cerez: common.cerez,
      kvkk: common.kvkk,
      settings: common.settings,
    },
    whatsapp: { message: common.waMessage, ariaLabel: common.waAria, label: common.waLabel },
    search: { placeholder: common.searchPlaceholder, ariaLabel: common.searchAria, loading: common.searchLoading, empty: common.searchEmpty },
    process: { eyebrow: common.processEyebrow, title: common.processTitle, lead: common.processLead, steps: common.steps },
    teklif: {
      title: common.teklifTitle,
      name: common.fName,
      email: common.fEmail,
      phone: common.fPhone,
      message: common.fMessage,
      messageSuffix: common.messageSuffix,
      kvkkPre: common.kvkkPre,
      kvkkLink: common.kvkkLink,
      kvkkPost: common.kvkkPost,
      submit: common.submit,
      submitting: common.submitting,
      cancel: common.cancel,
      thanks: common.thanks,
      thanksBody: common.thanksBody,
      errorDefault: common.errorDefault,
      errorConnection: common.errorConnection,
    },
    cookie: {
      regionAria: common.cookieRegionAria,
      barText: common.cookieBar,
      policyLink: common.cookiePolicyLink,
      settingsBtn: common.cookieSettingsBtn,
      reject: common.cookieReject,
      acceptAll: common.cookieAcceptAll,
      panelAria: common.cookiePanelAria,
      panelTitle: common.cookiePanelTitle,
      panelIntro: common.cookiePanelIntroA,
      kvkkLink: common.cookieKvkkLink,
      necessaryTitle: common.necessaryTitle,
      necessaryDesc: common.necessaryDesc,
      necessaryAria: common.necessaryAria,
      analyticsTitle: common.analyticsTitle,
      analyticsDesc: common.analyticsDesc,
      analyticsAria: common.analyticsAria,
      adsTitle: common.adsTitle,
      adsDesc: common.adsDesc,
      adsAria: common.adsAria,
      rejectAll: common.rejectAll,
      save: common.save,
    },
    oem: { heading: common.oemHeading, ariaSuffix: common.oemAriaSuffix },
    hero: {
      ariaLabel: common.heroAria,
      tabsAria: common.heroTabsAria,
      prevAria: common.heroPrevAria,
      nextAria: common.heroNextAria,
      startProject: common.cta,
      slides: heroSlides,
    },
    home: {
      metaTitle: common.metaTitle,
      metaDescription: common.metaDescription,
      searchEyebrow: common.searchEyebrow,
      automation: {
        eyebrow: { en: "Industrial automation", ru: "Промышленная автоматизация", ar: "الأتمتة الصناعية" }[locale],
        h2: { en: "Automation products and technical support, from Ankara to all of Turkey", ru: "Продукция для автоматизации и техническая поддержка — из Анкары по всей Турции", ar: "منتجات الأتمتة والدعم الفني من أنقرة إلى جميع أنحاء تركيا" }[locale],
        lead: {
          en: "AOM is an Ankara-based industrial automation and machine automation company. PLC/SCADA-compatible control devices, servo motors and motor drives, and encoders for motion control are sold as products in our store; we also use the same product families in the electrical-control stage of our robotic welding, CNC and press automation projects, and provide selection and commissioning support.",
          ru: "AOM — компания по промышленной и машинной автоматизации, базирующаяся в Анкаре. Совместимые с ПЛК/SCADA устройства управления, сервоприводы и приводы двигателей, энкодеры для управления движением продаются в нашем магазине; те же семейства продукции мы используем на этапе электрики и управления в проектах роботизированной сварки, ЧПУ и автоматизации прессов, предоставляя поддержку в выборе и вводе в эксплуатацию.",
          ar: "AOM شركة أتمتة صناعية وأتمتة آلات مقرها أنقرة. تُباع في متجرنا أجهزة تحكم متوافقة مع PLC/SCADA، ومحركات سيرفو ومشغلات محركات، وأجهزة ترميز للتحكم بالحركة؛ كما نستخدم عائلات المنتجات نفسها في مرحلة الكهرباء والتحكم بمشاريع اللحام الروبوتي وCNC وأتمتة المكابس، ونقدم الدعم في الاختيار والتشغيل.",
        }[locale],
        more: common.more,
        cards: homeAutomationCards,
      },
      solutions: {
        eyebrow: { en: "Solutions", ru: "Решения", ar: "الحلول" }[locale],
        h2: { en: "From cell to line, exactly the system you need", ru: "От ячейки до линии — система под ваши нужды", ar: "من الخلية إلى الخط، النظام الذي تحتاجه بالضبط" }[locale],
        cards: solutionsCards,
      },
      services: {
        eyebrow: { en: "Services", ru: "Услуги", ar: "الخدمات" }[locale],
        h2: { en: "Engineering support beyond the robot", ru: "Инженерная поддержка — не только роботы", ar: "دعم هندسي يتجاوز الروبوت" }[locale],
        lead: {
          en: "After every robot sale, we provide free robot and pendant training. Programming, parts, and fixture/gripper design for your existing robots are also offered as separate services.",
          ru: "После продажи робота мы бесплатно обучаем работе с роботом и пультом. Программирование, изготовление деталей и проектирование оснастки/захватов для ваших существующих роботов также предлагаются как отдельные услуги.",
          ar: "بعد بيع الروبوت، نقدّم تدريبًا مجانيًا على الروبوت ولوحة التحكم. كما نقدّم البرمجة، والقطع، وتصميم التثبيتات والقوابض لروبوتاتكم الحالية كخدمات منفصلة.",
        }[locale],
        items: serviceItems,
      },
      references: {
        eyebrow: { en: "Key references", ru: "Основные референсы", ar: "أبرز المراجع" }[locale],
        lead: {
          en: "Some of the organizations we work with in defense, aerospace, heavy industry and manufacturing. Project details are covered by non-disclosure agreements.",
          ru: "Некоторые из организаций, с которыми мы работаем в сфере обороны, авиакосмической отрасли, тяжёлой промышленности и производства. Детали проектов защищены соглашениями о неразглашении.",
          ar: "بعض الجهات التي نعمل معها في مجالات الدفاع والطيران والصناعات الثقيلة والتصنيع. تفاصيل المشاريع مشمولة باتفاقيات عدم الإفصاح.",
        }[locale],
      },
      contact: {
        h2: { en: "Let's talk about your project", ru: "Обсудим ваш проект", ar: "لنتحدث عن مشروعكم" }[locale],
        lead: { en: "To prepare a quote, simply send us the following:", ru: "Чтобы подготовить предложение, достаточно отправить нам следующее:", ar: "لإعداد عرض السعر، يكفي أن ترسل لنا ما يلي:" }[locale],
        inputs: projectInputs,
        cardTitle: { en: "Contact", ru: "Контакты", ar: "تواصل معنا" }[locale],
        addressSuffix: common.addressSuffix,
      },
    },
  };
}

const cache = new Map<Locale, Dictionary>();

export function getDictionary(locale: Locale): Dictionary {
  const hit = cache.get(locale);
  if (hit) return hit;
  const built = build(locale);
  cache.set(locale, built);
  return built;
}
