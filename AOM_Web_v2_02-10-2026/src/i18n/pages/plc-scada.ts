// /plc-scada sayfasının EN/RU/AR içeriği (19-10-2026). Türkçe sayfa değişmedi.
import type { Locale } from "../locales";

export type PlcScadaContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  jsonLdName: string;
  serviceType: string;
  crumbCurrent: string;
  eyebrow: string;
  h1: string;
  intro: string;
  highlights: string[];
  services: { title: string; text: string }[];
  productSide: { h2: string; prefix: string; link1Text: string; mid: string; link2Text: string; suffix: string };
  whoWeWorkedWith: { title: string; text: string; linkText: string };
  faqs: { q: string; a: string }[];
  contact: { title: string; text: string; itemName: string };
  related: { label: string; href: string }[];
};

export const plcScadaContent: Record<Locale, PlcScadaContent> = {
  en: {
    metaTitle: "PLC Programming, SCADA & Machine Automation | Ankara | AOM",
    metaDescription:
      "PLC and HMI programming, SCADA, monitoring and reporting, custom machine automation and panel projects in Ankara. One team, one point of contact, from design to commissioning.",
    keywords: [
      "plc programming ankara",
      "scada software",
      "automation company ankara",
      "machine automation",
      "panel design",
      "retrofit automation",
    ],
    jsonLdName: "AOM PLC, SCADA and Machine Automation",
    serviceType: "PLC/HMI programming, SCADA, custom machine automation and panel projects",
    crumbCurrent: "PLC, SCADA and Machine Automation",
    eyebrow: "PLC · SCADA · machine automation · Ankara",
    h1: "PLC, SCADA and machine automation",
    intro:
      "We work across every layer of automation, from the shop floor to SCADA. We run production lines and process control, PLC/HMI programming, custom machine and retrofit projects, and monitoring, reporting and data-collection systems as a single team, from design to commissioning.",
    highlights: [
      "Experience with Siemens, Mitsubishi Electric, Omron, Schneider Electric and Delta PLC/HMI platforms",
      "PLC/SCADA integration via RS485 Modbus RTU communication",
      "Panel design and manufacturing in our own workshop",
      "Commissioning and operator training",
    ],
    services: [
      {
        title: "PLC and HMI programming",
        text: "PLC and HMI programming on Siemens, Mitsubishi Electric, Omron, Schneider Electric and Delta platforms.",
      },
      {
        title: "SCADA, monitoring, reporting and data collection",
        text: "Single-screen monitoring of production data, recipe/profile management, alarm and event logging; data collection from field devices via RS485 Modbus RTU.",
      },
      {
        title: "Custom machine automation and retrofit",
        text: "Automation of new custom machines and PLC/HMI conversion (retrofit) of existing machines, using the same approach we apply in our robotic welding, CNC and press projects.",
      },
      {
        title: "Electrical design and panel engineering",
        text: "Electrical drawings and panel design and manufacturing are done in our own workshop and installed on site.",
      },
      {
        title: "Servo and motion control applications",
        text: "Servo motor/drive selection and encoder-based motion control integration (see the product family in our store).",
      },
      {
        title: "Commissioning and operator training",
        text: "On-site commissioning, function tests and operator training; on-site technical support from Ankara.",
      },
    ],
    productSide: {
      h2: "On the product side: /otomasyon",
      prefix:
        "If you'd like to buy PLC/SCADA-compatible control devices, servo motors/drives and encoders directly, you can visit our",
      link1Text: "industrial automation products page",
      mid: "or our",
      link2Text: "store",
      suffix: "; we use the same product families in the project service on this page.",
    },
    whoWeWorkedWith: {
      title: "Who we've worked with",
      text: "We apply the same discipline as the organizations we work with at the electrical-control stage of our robotic welding, CNC and press automation projects; project details are covered by confidentiality agreements.",
      linkText: "our main references on the home page",
    },
    faqs: [
      {
        q: "Which PLC and HMI brands do you work with?",
        a: "We run projects on Siemens, Mitsubishi Electric, Omron, Schneider Electric and Delta platforms; whichever brand is the standard at your plant, we build with it.",
      },
      {
        q: "Can you convert an existing machine to automation (retrofit)?",
        a: "Yes. We upgrade the old control system with PLC/HMI, adding data transfer to SCADA if needed; we apply the same engineering approach we use in our robotic welding, CNC and press projects.",
      },
      {
        q: "Do you also do the panel design and manufacturing?",
        a: "Yes, our own team does the electrical and panel design, manufactures it in our own workshop and installs it on site.",
      },
      {
        q: "What's the difference between this page and the products on the /otomasyon page?",
        a: "On our /otomasyon page you can buy products like PLC/SCADA-compatible control devices, servo drives and encoders. This page describes our PLC, SCADA and machine automation service, where we take on the project end to end; we use the same product families in our own projects too.",
      },
    ],
    contact: {
      title: "Request a quote for your automation project",
      text: "Tell us briefly about your existing machine or new project; we'll work out the right PLC/SCADA solution together.",
      itemName: "PLC, SCADA and machine automation",
    },
    related: [
      { label: "Industrial automation products", href: "/otomasyon" },
      { label: "Thyristor power control", href: "/tristorlu-guc-kontrol" },
      { label: "CNC machining centers", href: "/cnc-tezgah" },
      { label: "Robotic welding systems", href: "/robotik-kaynak" },
    ],
  },
  ru: {
    metaTitle: "Программирование ПЛК, SCADA и автоматизация машин | Анкара | AOM",
    metaDescription:
      "Программирование ПЛК и HMI, SCADA, мониторинг и отчётность, автоматизация специальных машин и проекты шкафов в Анкаре. Единая команда, единый контакт, от проектирования до ввода в эксплуатацию.",
    keywords: [
      "программирование плк анкара",
      "программное обеспечение scada",
      "компания автоматизации анкара",
      "автоматизация машин",
      "проектирование шкафов",
      "ретрофит автоматизации",
    ],
    jsonLdName: "ПЛК, SCADA и автоматизация машин AOM",
    serviceType: "Программирование ПЛК/HMI, SCADA, автоматизация специальных машин и проекты шкафов",
    crumbCurrent: "ПЛК, SCADA и автоматизация машин",
    eyebrow: "ПЛК · SCADA · автоматизация машин · Анкара",
    h1: "ПЛК, SCADA и автоматизация машин",
    intro:
      "Мы работаем на всех уровнях автоматизации — от цеха до SCADA. Производственные линии и управление процессами, программирование ПЛК/HMI, проекты специальных машин и переоборудования (ретрофит), а также системы мониторинга, отчётности и сбора данных мы ведём единой командой от проектирования до ввода в эксплуатацию.",
    highlights: [
      "Опыт работы с платформами ПЛК/HMI Siemens, Mitsubishi Electric, Omron, Schneider Electric, Delta",
      "Интеграция ПЛК/SCADA через связь RS485 Modbus RTU",
      "Проектирование и изготовление шкафов на собственном участке",
      "Ввод в эксплуатацию и обучение операторов",
    ],
    services: [
      {
        title: "Программирование ПЛК и HMI",
        text: "Программирование ПЛК и HMI на платформах Siemens, Mitsubishi Electric, Omron, Schneider Electric и Delta.",
      },
      {
        title: "SCADA, мониторинг, отчётность и сбор данных",
        text: "Мониторинг производственных данных на одном экране, управление рецептами/профилями, журнал аварий и событий; сбор данных с полевых устройств через RS485 Modbus RTU.",
      },
      {
        title: "Автоматизация специальных машин и ретрофит",
        text: "Автоматизация новых специальных машин и переоборудование (ретрофит) существующих машин на ПЛК/HMI — с тем же подходом, что и в наших проектах роботизированной сварки, ЧПУ и прессов.",
      },
      {
        title: "Электропроект и проектирование шкафов",
        text: "Чертежи электропроекта, проектирование и изготовление шкафов выполняются на собственном участке и монтируются на объекте.",
      },
      {
        title: "Применения сервопривода и motion-контроля",
        text: "Выбор сервомотора/привода и интеграция motion-контроля с энкодером (см. ассортимент в нашем магазине).",
      },
      {
        title: "Ввод в эксплуатацию и обучение операторов",
        text: "Ввод в эксплуатацию на объекте, функциональные испытания и обучение операторов; техническая поддержка на месте из Анкары.",
      },
    ],
    productSide: {
      h2: "Продуктовая сторона: /otomasyon",
      prefix:
        "Если вы хотите напрямую приобрести ПЛК/SCADA-совместимые устройства управления, сервомоторы/приводы и энкодеры, посетите нашу",
      link1Text: "страницу продукции промышленной автоматизации",
      mid: "или наш",
      link2Text: "магазин",
      suffix: "; в услуге на этой странице мы используем те же семейства продукции.",
    },
    whoWeWorkedWith: {
      title: "С кем мы работали",
      text: "Мы применяем ту же дисциплину, что и организации, с которыми мы работаем на этапе электрики и управления в наших проектах роботизированной сварки, ЧПУ и автоматизации прессов; детали проектов защищены соглашениями о конфиденциальности.",
      linkText: "наши основные референсы на главной странице",
    },
    faqs: [
      {
        q: "С какими брендами ПЛК и HMI вы работаете?",
        a: "Мы реализуем проекты на платформах Siemens, Mitsubishi Electric, Omron, Schneider Electric и Delta; какой бренд является стандартом на вашем предприятии, с тем и работаем.",
      },
      {
        q: "Можете ли вы перевести существующую машину на автоматизацию (ретрофит)?",
        a: "Да. Мы обновляем старую систему управления на ПЛК/HMI, при необходимости добавляя передачу данных в SCADA; применяем тот же инженерный подход, что и в проектах роботизированной сварки, ЧПУ и прессов.",
      },
      {
        q: "Вы также выполняете проектирование и изготовление шкафов?",
        a: "Да, наша команда сама проектирует электрическую часть и шкаф, изготавливает его на собственном участке и монтирует на объекте.",
      },
      {
        q: "В чём разница между этой страницей и продукцией на странице /otomasyon?",
        a: "На нашей странице /otomasyon вы можете купить такие продукты, как ПЛК/SCADA-совместимые устройства управления, сервоприводы и энкодеры. Эта страница описывает нашу услугу ПЛК, SCADA и автоматизации машин, где мы берём на себя проект от начала до конца; в собственных проектах мы используем те же семейства продукции.",
      },
    ],
    contact: {
      title: "Запросите предложение для вашего проекта автоматизации",
      text: "Кратко расскажите о существующей машине или новом проекте; вместе подберём подходящее решение ПЛК/SCADA.",
      itemName: "ПЛК, SCADA и автоматизация машин",
    },
    related: [
      { label: "Продукция промышленной автоматизации", href: "/otomasyon" },
      { label: "Тиристорное управление мощностью", href: "/tristorlu-guc-kontrol" },
      { label: "Обрабатывающие центры с ЧПУ", href: "/cnc-tezgah" },
      { label: "Роботизированные сварочные системы", href: "/robotik-kaynak" },
    ],
  },
  ar: {
    metaTitle: "برمجة PLC وSCADA وأتمتة الآلات | أنقرة | AOM",
    metaDescription:
      "برمجة PLC وHMI، وSCADA، والمراقبة والتقارير، وأتمتة الآلات الخاصة ومشاريع اللوحات في أنقرة. فريق واحد وجهة اتصال واحدة، من التصميم إلى التشغيل.",
    keywords: [
      "برمجة plc أنقرة",
      "برنامج scada",
      "شركة أتمتة أنقرة",
      "أتمتة الآلات",
      "تصميم اللوحات",
      "أتمتة التحديث retrofit",
    ],
    jsonLdName: "PLC وSCADA وأتمتة الآلات من AOM",
    serviceType: "برمجة PLC/HMI، وSCADA، وأتمتة الآلات الخاصة ومشاريع اللوحات",
    crumbCurrent: "PLC وSCADA وأتمتة الآلات",
    eyebrow: "PLC · SCADA · أتمتة الآلات · أنقرة",
    h1: "PLC وSCADA وأتمتة الآلات",
    intro:
      "نعمل في كل طبقات الأتمتة، من أرضية المصنع إلى SCADA. ننفذ خطوط الإنتاج والتحكم بالعمليات، وبرمجة PLC/HMI، ومشاريع الآلات الخاصة والتحديث (retrofit)، وأنظمة المراقبة والتقارير وجمع البيانات، كفريق واحد من التصميم حتى التشغيل.",
    highlights: [
      "خبرة في العمل مع منصات PLC/HMI من Siemens وMitsubishi Electric وOmron وSchneider Electric وDelta",
      "دمج PLC/SCADA عبر اتصال RS485 Modbus RTU",
      "تصميم اللوحات وتصنيعها في ورشتنا الخاصة",
      "التشغيل وتدريب المشغلين",
    ],
    services: [
      {
        title: "برمجة PLC وHMI",
        text: "برمجة PLC وHMI على منصات Siemens وMitsubishi Electric وOmron وSchneider Electric وDelta.",
      },
      {
        title: "SCADA والمراقبة والتقارير وجمع البيانات",
        text: "مراقبة بيانات الإنتاج من شاشة واحدة، وإدارة الوصفات/الملفات، وسجل الإنذارات والأحداث؛ جمع البيانات من أجهزة الميدان عبر RS485 Modbus RTU.",
      },
      {
        title: "أتمتة الآلات الخاصة والتحديث (retrofit)",
        text: "أتمتة الآلات الخاصة الجديدة وتحويل الآلات القائمة إلى PLC/HMI (retrofit)؛ بنفس النهج المستخدم في مشاريعنا للحام الروبوتي وCNC والمكابس.",
      },
      {
        title: "المشروع الكهربائي وتصميم اللوحات",
        text: "رسم المشروع الكهربائي وتصميم اللوحات وتصنيعها يتم في ورشتنا الخاصة وتُركَّب في الموقع.",
      },
      {
        title: "تطبيقات السيرفو والتحكم الحركي",
        text: "اختيار محرك/محرك سيرفو ودمج التحكم الحركي المزود بمشفر دوار (انظر عائلة المنتجات في متجرنا).",
      },
      {
        title: "التشغيل وتدريب المشغلين",
        text: "التشغيل الميداني واختبارات الوظائف وتدريب المشغلين؛ دعم فني ميداني من أنقرة.",
      },
    ],
    productSide: {
      h2: "الجانب المتعلق بالمنتجات: /otomasyon",
      prefix:
        "إذا رغبتم في شراء أجهزة تحكم متوافقة مع PLC/SCADA ومحركات/محركات سيرفو ومشفرات دوارة مباشرة، يمكنكم زيارة",
      link1Text: "صفحة منتجات الأتمتة الصناعية",
      mid: "أو",
      link2Text: "متجرنا",
      suffix: "؛ ونستخدم نفس عائلات المنتجات في خدمة المشروع في هذه الصفحة.",
    },
    whoWeWorkedWith: {
      title: "مع من عملنا",
      text: "نطبق نفس الانضباط الذي تتبعه المؤسسات التي نعمل معها في مرحلة الكهرباء والتحكم ضمن مشاريعنا للحام الروبوتي وCNC وأتمتة المكابس؛ تفاصيل المشاريع مشمولة باتفاقيات السرية.",
      linkText: "مراجعنا الرئيسية في الصفحة الرئيسية",
    },
    faqs: [
      {
        q: "مع أي علامات PLC وHMI تعملون؟",
        a: "ننفذ المشاريع على منصات Siemens وMitsubishi Electric وOmron وSchneider Electric وDelta؛ أيًا كانت العلامة المعتمدة في منشأتكم، نعمل بها.",
      },
      {
        q: "هل يمكنكم تحويل آلة قائمة إلى الأتمتة (retrofit)؟",
        a: "نعم. نقوم بتحديث نظام التحكم القديم بـPLC/HMI، مع إضافة نقل البيانات إلى SCADA عند الحاجة؛ ونطبق نفس النهج الهندسي المستخدم في مشاريعنا للحام الروبوتي وCNC والمكابس.",
      },
      {
        q: "هل تقومون أيضًا بتصميم اللوحات وتصنيعها؟",
        a: "نعم، يقوم فريقنا بتصميم الجزء الكهربائي واللوحة، ويصنّعها في ورشتنا الخاصة ويركّبها في الموقع.",
      },
      {
        q: "ما الفرق بين هذه الصفحة والمنتجات في صفحة /otomasyon؟",
        a: "في صفحتنا /otomasyon يمكنكم شراء منتجات مثل أجهزة التحكم المتوافقة مع PLC/SCADA ومحركات السيرفو والمشفرات الدوارة. أما هذه الصفحة فتصف خدمتنا في PLC وSCADA وأتمتة الآلات، حيث نتولى المشروع من الألف إلى الياء؛ ونستخدم نفس عائلات المنتجات في مشاريعنا الخاصة أيضًا.",
      },
    ],
    contact: {
      title: "اطلبوا عرض سعر لمشروع الأتمتة الخاص بكم",
      text: "أخبرونا بإيجاز عن آلتكم الحالية أو مشروعكم الجديد؛ لنحدد معًا حل PLC/SCADA المناسب.",
      itemName: "PLC وSCADA وأتمتة الآلات",
    },
    related: [
      { label: "منتجات الأتمتة الصناعية", href: "/otomasyon" },
      { label: "التحكم بالطاقة الثايرستور", href: "/tristorlu-guc-kontrol" },
      { label: "مراكز تشغيل CNC", href: "/cnc-tezgah" },
      { label: "أنظمة اللحام الروبوتي", href: "/robotik-kaynak" },
    ],
  },
};
