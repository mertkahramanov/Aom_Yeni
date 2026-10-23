// /robotik-kaynak sayfasının EN/RU/AR içeriği (19-10-2026). Türkçe src/app/robotik-kaynak/page.tsx
// değişmedi; bu dosya yalnızca src/app/[locale]/robotik-kaynak/page.tsx tarafından kullanılır.
// Görsel dosya yolları ve boyutları (src/w/h) değişmez, yalnızca alt/caption metinleri çevrilir.
import type { Locale } from "../locales";

export type RobotikKaynakContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  jsonLdName: string;
  serviceType: string;
  crumbCurrent: string;
  eyebrow: string;
  h1: string;
  subH1: string;
  intro: string;
  highlights: string[];
  services: { title: string; text: string }[];
  softwareTitle: string;
  softwareIntro: string;
  software: { alt: string; title: string; text: string }[];
  images: {
    cellAlt: string;
    externalAxis: { alt: string; caption: string };
    circular: { alt: string; caption: string };
  };
  whoWeWorkedWith: { title: string; prefix: string; linkText: string; suffix: string };
  faqs: { q: string; a: string }[];
  contact: { title: string; text: string; itemName: string };
  related: { label: string; href: string }[];
};

export const robotikKaynakContent: Record<Locale, RobotikKaynakContent> = {
  en: {
    metaTitle: "Robots - Robotic Automation | Robotic Welding Systems | Ankara | AOM",
    metaDescription:
      "Robotic welding cells, positioners, column-and-boom manipulators and external axes in Ankara. Design, in-house manufacturing, robot integration and commissioning under one roof.",
    keywords: [
      "robotic welding Ankara",
      "welding robot cell",
      "robotic welding system",
      "welding positioner",
      "column boom welding",
      "circular welding system",
      "welding fixture design",
    ],
    jsonLdName: "AOM Robots - Robotic Automation",
    serviceType: "Robotic welding cell and external system design, manufacturing and commissioning",
    crumbCurrent: "Robots - Robotic Automation",
    eyebrow: "Robots - Robotic Automation · Ankara",
    h1: "Robots - Robotic Automation",
    subH1: "Robotic welding systems and welding cells",
    intro:
      "AOM designs, builds in its own mechanical workshop, and commissions robotic welding cells and external systems in Ankara — positioners, linear axes, column-and-boom manipulators, rotators, fit-up lines, circular welding systems and fixtures — all under one roof. Every project starts with a simulation that verifies reach, collisions and cycle time.",
    highlights: [
      "Positioner and boom-tip handling capacity up to 500 kg",
      "External axis and boom reach up to 6 m",
      "Manufactured in our own mechanical workshop",
      "Free robot and teach-pendant training after robot sales",
    ],
    services: [
      {
        title: "Turnkey robotic welding cells",
        text: "MIG/MAG, TIG, spot, submerged-arc and plasma welding and cutting processes; cell design, manufacturing, robot integration and commissioning.",
      },
      {
        title: "Welding positioners",
        text: "Single-axis turntables, two-axis (tilt + rotate), pivot-type, hydraulic-lift and headstock-tailstock positioners; up to 500 kg, 1–3 axes.",
      },
      {
        title: "External axes",
        text: "Floor-mounted linear track, gantry, column-and-arm and conveyor tracking; up to 6 m travel, up to 500 kg payload. Works coordinated with the robot as a single program, single motion.",
      },
      {
        title: "Column-boom and rotator systems",
        text: "Column-and-boom manipulators and conveyor-type, self-weight or custom rotators for large cylindrical parts such as tanks, pipes and towers.",
      },
      {
        title: "Fit-up (pre-assembly) lines",
        text: "Rail-mounted or fixed fit-up stations with hydraulic alignment and fit-up heads; align pipe and shell sections ready for welding.",
      },
      {
        title: "Circular welding systems",
        text: "Circular MIG/MAG, circular submerged-arc, circular TIG and multi-torch (optional) systems; up to 6 m part length and 500 kg part weight for shaft, flange and cylinder seams.",
      },
      {
        title: "Welding fixture and holder design",
        text: "3-2-1 locating and sensor-fed clamping for cartesian fixtures, rotary fixtures, quick-change plates and robot grippers; manufactured in our own workshop.",
      },
      {
        title: "Programming for existing robots",
        text: "We also work without building a new cell: part and fixture design plus new part programs or program optimization for your existing robots.",
      },
    ],
    softwareTitle: "Engineering and simulation software we use",
    softwareIntro:
      "We verify a robot cell virtually before it's ever built on the shop floor: from mechanical and electrical design to offline robot programming, PLC testing and line simulation — a few frames from the engineering software we use.",
    software: [
      {
        alt: "SOLIDWORKS Electrical 3D: cable routing and wiring design inside an electrical cabinet",
        title: "SOLIDWORKS Electrical 3D",
        text: "Cable routing, harness and wiring design inside the cabinet.",
      },
      {
        alt: "Siemens NX and Teamcenter: 3D mechanical design and revision management of a centrifugal pump assembly",
        title: "Siemens NX / Teamcenter",
        text: "3D mechanical design and revision/document management.",
      },
      {
        alt: "Fanuc ROBOGUIDE: offline robot simulation of a material-handling cell with a conveyor",
        title: "Fanuc ROBOGUIDE",
        text: "Offline verification of robot placement, reach and cycle time before on-site installation.",
      },
      {
        alt: "Siemens Tecnomatix Plant Simulation: material-flow simulation of a palletizing/depalletizing line",
        title: "Siemens Tecnomatix Plant Simulation",
        text: "Material flow, bottleneck and capacity analysis across a line layout.",
      },
      {
        alt: "Siemens TIA Portal and Factory I/O: testing a PLC program against an automated warehouse (stacker crane) simulation",
        title: "Siemens TIA Portal + Factory I/O",
        text: "Testing the PLC program on a virtual cell before it ever reaches site.",
      },
      {
        alt: "DELMIA V5: tool-changer motion simulation on a robot cell",
        title: "DELMIA V5",
        text: "Tool-changer motion and collision-checking simulation on a robot cell.",
      },
      {
        alt: "Fanuc ROBOGUIDE and teach pendant: commissioning checklist for a washing cell",
        title: "Fanuc ROBOGUIDE + teach pendant",
        text: "Pre-commissioning checklist and on-site programming with the teach pendant.",
      },
    ],
    images: {
      cellAlt: "Diagram of an AOM welding cell made up of a welding robot, positioner and external systems",
      externalAxis: {
        alt: "Diagram of an external axis where the robot travels on a linear rail (7th axis) between two stations",
        caption: "External axis types.",
      },
      circular: {
        alt: "Diagram of a circular welding system rotating shaft, flange and cylinder parts for welding",
        caption: "Circular welding system.",
      },
    },
    whoWeWorkedWith: {
      title: "Who we've worked with",
      prefix:
        "We work with organizations in defense, aerospace and heavy industry that demand the highest precision and repeatability. Project details are covered by confidentiality agreements; you can see",
      linkText: "our main references on the home page",
      suffix: ".",
    },
    faqs: [
      {
        q: "What do I need before setting up a robotic welding cell?",
        a: "Part drawings or samples, annual volume and target cycle time are enough. We run a simulation with these and verify reach and cycle time before the project starts.",
      },
      {
        q: "Do you design the fixture yourselves?",
        a: "Yes. We design the welding fixture and holder in-house using 3-2-1 locating and sensor-fed clamping, and manufacture it in our own workshop.",
      },
      {
        q: "Do you provide training after commissioning?",
        a: "Yes. After a robot sale we provide free training on the robot and teach pendant, so your team can teach new parts themselves.",
      },
      {
        q: "Can I get only programming or fixture services without a full cell?",
        a: "Yes. We also work without building a cell; we offer part and fixture design plus robot programming as a separate service for your existing robots.",
      },
      {
        q: "How is operator safety ensured in a welding cell?",
        a: "Robot movement is contained by a fence and an interlocked gate, a light curtain or area scanner is used at the loading station, safety functions are evaluated per ISO 13849-1, and extraction equipment is installed for welding fume. A layout-specific risk assessment is carried out for every cell.",
      },
    ],
    contact: {
      title: "Request a quote for your robotic welding project",
      text: "Send us your 3D model or technical drawing, part weight and dimensions, seam list, annual volume and target cycle time.",
      itemName: "Robotic welding system",
    },
    related: [
      { label: "Press safety and automatic feeding", href: "/pres-guvenligi" },
      { label: "CNC machining centers", href: "/cnc-tezgah" },
      { label: "PLC, SCADA and machine automation", href: "/plc-scada" },
      { label: "Industrial automation products", href: "/otomasyon" },
    ],
  },
  ru: {
    metaTitle: "Роботы - Робототехническая автоматизация | Роботизированные сварочные системы | Анкара | AOM",
    metaDescription:
      "Роботизированные сварочные ячейки, позиционеры, колонно-консольные манипуляторы и внешние оси в Анкаре. Проектирование, собственное производство, интеграция робота и ввод в эксплуатацию — всё в одном месте.",
    keywords: [
      "роботизированная сварка Анкара",
      "ячейка сварочного робота",
      "роботизированная сварочная система",
      "сварочный позиционер",
      "колонно-консольная сварка",
      "система кругового шва",
      "проектирование сварочной оснастки",
    ],
    jsonLdName: "AOM Роботы - Робототехническая автоматизация",
    serviceType: "Проектирование, изготовление и ввод в эксплуатацию сварочных ячеек и внешних систем",
    crumbCurrent: "Роботы - Робототехническая автоматизация",
    eyebrow: "Роботы - Робототехническая автоматизация · Анкара",
    h1: "Роботы - Робототехническая автоматизация",
    subH1: "Роботизированные сварочные системы и сварочные ячейки",
    intro:
      "AOM проектирует, изготавливает на собственном механическом участке и вводит в эксплуатацию роботизированные сварочные ячейки и внешние системы в Анкаре — позиционеры, линейные оси, колонно-консольные манипуляторы, ротаторы, линии прихватки, системы кругового шва и оснастку — всё из одних рук. Каждый проект начинается с симуляции, проверяющей досягаемость, столкновения и время цикла.",
    highlights: [
      "Грузоподъёмность позиционера и консоли до 500 кг",
      "Ход внешней оси и консоли до 6 м",
      "Изготовление на собственном механическом участке",
      "Бесплатное обучение работе с роботом и пультом обучения после продажи робота",
    ],
    services: [
      {
        title: "Сварочные ячейки под ключ",
        text: "Процессы сварки и резки MIG/MAG, TIG, точечной, дуговой под флюсом и плазменной сварки; проектирование ячейки, изготовление, интеграция робота и ввод в эксплуатацию.",
      },
      {
        title: "Сварочные позиционеры",
        text: "Одноосевые поворотные столы, двухосевые (наклон + поворот), поворотного типа, с гидравлическим подъёмом и центровые позиционеры; до 500 кг, 1–3 оси.",
      },
      {
        title: "Внешние оси",
        text: "Напольный линейный рельс, портальная (гантри) конструкция, колонно-рычажная система и слежение за конвейером; ход до 6 м, нагрузка до 500 кг. Работает согласованно с роботом как единая программа, единое движение.",
      },
      {
        title: "Колонно-консольные системы и ротаторы",
        text: "Колонно-консольные манипуляторы и конвейерные, с собственным весом или специальные ротаторы для крупных цилиндрических деталей — резервуаров, труб и башен.",
      },
      {
        title: "Линии прихватки (предварительной сборки)",
        text: "Рельсовые или стационарные станции прихватки с гидравлическим выравниванием и прихваточными головками; выравнивают трубные и корпусные секции перед сваркой.",
      },
      {
        title: "Системы кругового шва",
        text: "Круговая сварка MIG/MAG, круговая сварка под флюсом, круговая TIG и многогорелочные (опционально) системы; до 6 м длины и 500 кг веса детали для швов валов, фланцев и цилиндров.",
      },
      {
        title: "Проектирование сварочной оснастки и держателей",
        text: "Базирование по схеме 3-2-1 и зажимы с датчиками для картезианской оснастки, поворотной оснастки, быстросменных плит и захватов робота; изготовление на собственном участке.",
      },
      {
        title: "Программирование для существующих роботов",
        text: "Работаем и без монтажа новой ячейки: проектируем деталь и оснастку, пишем новые программы или оптимизируем существующие для ваших роботов.",
      },
    ],
    softwareTitle: "Инженерное и симуляционное ПО, которое мы используем",
    softwareIntro:
      "Мы проверяем ячейку робота в виртуальной среде ещё до монтажа в цеху: от механического и электрического проектирования до офлайн-программирования робота, тестирования ПЛК и симуляции линии — несколько кадров из инженерного ПО, которое мы используем.",
    software: [
      {
        alt: "SOLIDWORKS Electrical 3D: трассировка кабелей и электропроводка внутри электрошкафа",
        title: "SOLIDWORKS Electrical 3D",
        text: "Трассировка кабелей, жгутов и электропроводки внутри шкафа.",
      },
      {
        alt: "Siemens NX и Teamcenter: 3D-проектирование и управление версиями узла центробежного насоса",
        title: "Siemens NX / Teamcenter",
        text: "3D-механическое проектирование и управление версиями/документацией.",
      },
      {
        alt: "Fanuc ROBOGUIDE: офлайн-симуляция робота в ячейке перемещения с конвейером",
        title: "Fanuc ROBOGUIDE",
        text: "Офлайн-проверка расположения робота, досягаемости и времени цикла до монтажа на площадке.",
      },
      {
        alt: "Siemens Tecnomatix Plant Simulation: симуляция потока материалов на линии паллетирования/депаллетирования",
        title: "Siemens Tecnomatix Plant Simulation",
        text: "Анализ потока материалов, узких мест и производительности линии.",
      },
      {
        alt: "Siemens TIA Portal и Factory I/O: тестирование программы ПЛК на симуляции автоматического склада (штабелирующий кран)",
        title: "Siemens TIA Portal + Factory I/O",
        text: "Тестирование программы ПЛК на виртуальной ячейке до выезда на площадку.",
      },
      {
        alt: "DELMIA V5: симуляция движения смены инструмента на ячейке робота",
        title: "DELMIA V5",
        text: "Симуляция движения смены инструмента и проверка столкновений на ячейке робота.",
      },
      {
        alt: "Fanuc ROBOGUIDE и пульт обучения: контрольный список ввода в эксплуатацию моечной ячейки",
        title: "Fanuc ROBOGUIDE + пульт обучения",
        text: "Контрольный список перед вводом в эксплуатацию и программирование на площадке с пульта обучения.",
      },
    ],
    images: {
      cellAlt: "Схема сварочной ячейки AOM, состоящей из сварочного робота, позиционера и внешних систем",
      externalAxis: {
        alt: "Схема внешней оси, по которой робот перемещается по линейному рельсу (7-я ось) между двумя станциями",
        caption: "Типы внешних осей.",
      },
      circular: {
        alt: "Схема системы кругового шва для сварки валов, фланцев и цилиндрических деталей вращением",
        caption: "Система кругового шва.",
      },
    },
    whoWeWorkedWith: {
      title: "С кем мы работали",
      prefix:
        "Мы работаем с организациями в оборонной, авиакосмической и тяжёлой промышленности, предъявляющими самые высокие требования к точности и повторяемости. Детали проектов защищены соглашениями о конфиденциальности; вы можете увидеть",
      linkText: "наши основные референсы на главной странице",
      suffix: ".",
    },
    faqs: [
      {
        q: "Что нужно перед монтажом роботизированной сварочной ячейки?",
        a: "Достаточно чертежей или образцов деталей, годового объёма и целевого времени цикла. На их основе мы проводим симуляцию и проверяем досягаемость и время цикла до начала проекта.",
      },
      {
        q: "Вы сами проектируете оснастку?",
        a: "Да. Мы проектируем сварочную оснастку и держатели собственными силами, используя базирование 3-2-1 и зажимы с датчиками, и изготавливаем её на собственном участке.",
      },
      {
        q: "Проводите ли вы обучение после ввода в эксплуатацию?",
        a: "Да. После продажи робота мы бесплатно обучаем работе с роботом и пультом обучения, чтобы ваша команда могла сама обучать робота новым деталям.",
      },
      {
        q: "Могу ли я получить только услуги программирования или оснастки без полной ячейки?",
        a: "Да. Мы работаем и без монтажа ячейки; проектирование детали и оснастки, а также программирование робота предлагаем как отдельную услугу для ваших существующих роботов.",
      },
      {
        q: "Как обеспечивается безопасность оператора в сварочной ячейке?",
        a: "Движение робота ограничено ограждением и блокируемой дверью, на станции загрузки используется световой барьер или сканер зоны, функции безопасности оцениваются по ISO 13849-1, устанавливается оборудование для удаления сварочного дыма. Для каждой ячейки проводится индивидуальная оценка рисков с учётом компоновки.",
      },
    ],
    contact: {
      title: "Запросите предложение для вашего проекта роботизированной сварки",
      text: "Пришлите нам 3D-модель или чертёж, вес и размеры детали, список швов, годовой объём и целевое время цикла.",
      itemName: "Роботизированная сварочная система",
    },
    related: [
      { label: "Безопасность прессов и автоматическая подача", href: "/pres-guvenligi" },
      { label: "Обрабатывающие центры с ЧПУ", href: "/cnc-tezgah" },
      { label: "ПЛК, SCADA и автоматизация машин", href: "/plc-scada" },
      { label: "Продукция промышленной автоматизации", href: "/otomasyon" },
    ],
  },
  ar: {
    metaTitle: "الروبوتات - الأتمتة الروبوتية | أنظمة اللحام الروبوتي | أنقرة | AOM",
    metaDescription:
      "خلايا لحام روبوتية وأجهزة تموضع وأذرع عمودية (كولون-بوم) ومحاور خارجية في أنقرة. التصميم والتصنيع في ورشتنا الخاصة ودمج الروبوت والتشغيل، كل ذلك من جهة واحدة.",
    keywords: [
      "اللحام الروبوتي أنقرة",
      "خلية روبوت لحام",
      "نظام لحام روبوتي",
      "جهاز تموضع اللحام",
      "لحام بالذراع العمودي",
      "نظام لحام دائري",
      "تصميم تثبيتات اللحام",
    ],
    jsonLdName: "AOM الروبوتات - الأتمتة الروبوتية",
    serviceType: "تصميم خلايا اللحام الروبوتي والأنظمة الخارجية وتصنيعها وتشغيلها",
    crumbCurrent: "الروبوتات - الأتمتة الروبوتية",
    eyebrow: "الروبوتات - الأتمتة الروبوتية · أنقرة",
    h1: "الروبوتات - الأتمتة الروبوتية",
    subH1: "أنظمة اللحام الروبوتي وخلايا اللحام",
    intro:
      "تقوم AOM بتصميم خلايا اللحام الروبوتي والأنظمة الخارجية في أنقرة — أجهزة التموضع، المحاور الخطية، الأذرع العمودية، أجهزة التدوير، خطوط التجميع المسبق، أنظمة اللحام الدائري والتثبيتات — وتصنّعها في ورشتها الميكانيكية الخاصة وتشغّلها، كل ذلك من جهة واحدة. يبدأ كل مشروع بمحاكاة يتم من خلالها التحقق من مدى الوصول والتصادمات وزمن الدورة.",
    highlights: [
      "سعة حمل لجهاز التموضع وطرف الذراع تصل إلى 500 كجم",
      "مدى وصول المحور الخارجي والذراع يصل إلى 6 أمتار",
      "التصنيع في ورشتنا الميكانيكية الخاصة",
      "تدريب مجاني على الروبوت ولوحة التعليم بعد بيع الروبوت",
    ],
    services: [
      {
        title: "خلايا لحام روبوتية جاهزة بالكامل",
        text: "عمليات لحام وقطع MIG/MAG وTIG والنقطي والقوس المغمور والبلازما؛ تصميم الخلية والتصنيع ودمج الروبوت والتشغيل.",
      },
      {
        title: "أجهزة تموضع اللحام",
        text: "طاولات دوارة أحادية المحور، ثنائية المحور (إمالة + دوران)، من النوع المحوري، برفع هيدروليكي وأجهزة تموضع بين قائمتين؛ حتى 500 كجم، من 1 إلى 3 محاور.",
      },
      {
        title: "المحاور الخارجية",
        text: "سكة خطية أرضية، بوابية (gantry)، عمودية-ذراعية وتتبع للناقل؛ شوط حتى 6 أمتار وحمل حتى 500 كجم. تعمل بتناسق مع الروبوت كبرنامج واحد وحركة واحدة.",
      },
      {
        title: "أنظمة الذراع العمودي وأجهزة التدوير",
        text: "أذرع عمودية وأجهزة تدوير ناقلة أو ذاتية الوزن أو مخصصة للأجزاء الأسطوانية الكبيرة مثل الخزانات والأنابيب والأبراج.",
      },
      {
        title: "خطوط التجميع المسبق (fit-up)",
        text: "محطات تجميع مسبق على سكة أو ثابتة مع محاذاة هيدروليكية ورؤوس تجميع؛ تقوم بمحاذاة أقسام الأنابيب والهياكل جاهزة للحام.",
      },
      {
        title: "أنظمة اللحام الدائري",
        text: "أنظمة لحام دائري MIG/MAG ولحام دائري بالقوس المغمور وTIG دائري وأنظمة متعددة الشعلات (اختياري)؛ حتى 6 أمتار طول القطعة و500 كجم وزنها لدرزات الأعمدة والشفّة والأسطوانات.",
      },
      {
        title: "تصميم تثبيتات ومساكات اللحام",
        text: "تموضع بنظام 3-2-1 وقوابض مزودة بحساسات للتثبيتات الديكارتية والدوارة وألواح التبديل السريع ومساكات الروبوت؛ التصنيع في ورشتنا الخاصة.",
      },
      {
        title: "البرمجة للروبوتات الحالية",
        text: "نعمل أيضًا دون إنشاء خلية جديدة: تصميم القطعة والتثبيت وبرامج جديدة أو تحسين البرامج لروبوتاتكم الحالية.",
      },
    ],
    softwareTitle: "برمجيات الهندسة والمحاكاة التي نستخدمها",
    softwareIntro:
      "نتحقق من خلية الروبوت افتراضيًا قبل تركيبها في الورشة: من التصميم الميكانيكي والكهربائي إلى برمجة الروبوت دون اتصال، واختبار PLC ومحاكاة الخط — بضع لقطات من برمجيات الهندسة التي نستخدمها.",
    software: [
      {
        alt: "SOLIDWORKS Electrical 3D: تمديد الكابلات وتصميم التوصيلات داخل خزانة كهربائية",
        title: "SOLIDWORKS Electrical 3D",
        text: "تمديد الكابلات وتصميم الحزم والتوصيلات داخل الخزانة.",
      },
      {
        alt: "Siemens NX وTeamcenter: التصميم الميكانيكي ثلاثي الأبعاد وإدارة الإصدارات لمجموعة مضخة طاردة مركزية",
        title: "Siemens NX / Teamcenter",
        text: "التصميم الميكانيكي ثلاثي الأبعاد وإدارة الإصدارات/المستندات.",
      },
      {
        alt: "Fanuc ROBOGUIDE: محاكاة روبوت دون اتصال في خلية نقل مزودة بناقل",
        title: "Fanuc ROBOGUIDE",
        text: "التحقق دون اتصال من موضع الروبوت ومدى الوصول وزمن الدورة قبل التركيب في الموقع.",
      },
      {
        alt: "Siemens Tecnomatix Plant Simulation: محاكاة تدفق المواد لخط تحميل/تفريغ المنصات",
        title: "Siemens Tecnomatix Plant Simulation",
        text: "تحليل تدفق المواد ونقاط الاختناق والطاقة الإنتاجية عبر تخطيط الخط.",
      },
      {
        alt: "Siemens TIA Portal وFactory I/O: اختبار برنامج PLC على محاكاة مستودع آلي (رافعة تكديس)",
        title: "Siemens TIA Portal + Factory I/O",
        text: "اختبار برنامج PLC على خلية افتراضية قبل الوصول إلى الموقع.",
      },
      {
        alt: "DELMIA V5: محاكاة حركة تبديل الأداة على خلية روبوت",
        title: "DELMIA V5",
        text: "محاكاة حركة تبديل الأداة والتحقق من التصادمات على خلية روبوت.",
      },
      {
        alt: "Fanuc ROBOGUIDE ولوحة التعليم: قائمة تحقق قبل التشغيل لخلية غسيل",
        title: "Fanuc ROBOGUIDE + لوحة التعليم",
        text: "قائمة تحقق قبل التشغيل وبرمجة ميدانية بلوحة التعليم.",
      },
    ],
    images: {
      cellAlt: "مخطط لخلية لحام من AOM تتكون من روبوت لحام وجهاز تموضع وأنظمة خارجية",
      externalAxis: {
        alt: "مخطط لمحور خارجي يتحرك فيه الروبوت على سكة خطية (المحور السابع) بين محطتين",
        caption: "أنواع المحاور الخارجية.",
      },
      circular: {
        alt: "مخطط لنظام لحام دائري يقوم بتدوير الأعمدة والشفّات والأسطوانات للحام",
        caption: "نظام اللحام الدائري.",
      },
    },
    whoWeWorkedWith: {
      title: "مع من عملنا",
      prefix:
        "نعمل مع مؤسسات في قطاعات الدفاع والطيران والصناعة الثقيلة التي تتطلب أعلى مستويات الدقة والتكرارية. تفاصيل المشاريع مشمولة باتفاقيات السرية؛ يمكنكم الاطلاع على",
      linkText: "مراجعنا الرئيسية في الصفحة الرئيسية",
      suffix: ".",
    },
    faqs: [
      {
        q: "ما الذي أحتاجه قبل إنشاء خلية لحام روبوتية؟",
        a: "تكفي رسومات أو عينات القطعة والعدد السنوي وزمن الدورة المستهدف. نجري محاكاة بهذه المعطيات ونتحقق من مدى الوصول وزمن الدورة قبل بدء المشروع.",
      },
      {
        q: "هل تصممون التثبيت بأنفسكم؟",
        a: "نعم. نصمم تثبيت ومسكة اللحام بأنفسنا باستخدام تموضع 3-2-1 وقوابض مزودة بحساسات، ونصنّعه في ورشتنا الخاصة.",
      },
      {
        q: "هل تقدمون تدريبًا بعد التشغيل؟",
        a: "نعم. بعد بيع الروبوت نقدم تدريبًا مجانيًا على استخدام الروبوت ولوحة التعليم، ليتمكن فريقكم من تعليم قطع جديدة بأنفسهم.",
      },
      {
        q: "هل يمكنني الحصول على خدمة البرمجة أو التثبيت فقط دون خلية كاملة؟",
        a: "نعم. نعمل أيضًا دون إنشاء خلية؛ نقدم تصميم القطعة والتثبيت وبرمجة الروبوت كخدمة منفصلة لروبوتاتكم الحالية.",
      },
      {
        q: "كيف يتم ضمان سلامة المشغل في خلية اللحام؟",
        a: "تتم إحاطة حركة الروبوت بسياج وباب مزود بقفل تأميني، ويُستخدم ستار ضوئي أو ماسح منطقة عند محطة التحميل، ويتم تقييم وظائف السلامة وفق ISO 13849-1، وتُركّب معدات شفط لدخان اللحام. يتم إجراء تقييم مخاطر خاص بكل تخطيط خلية.",
      },
    ],
    contact: {
      title: "اطلبوا عرض سعر لمشروع اللحام الروبوتي الخاص بكم",
      text: "أرسلوا لنا النموذج ثلاثي الأبعاد أو الرسم الفني ووزن القطعة وأبعادها وقائمة الدرزات والعدد السنوي وزمن الدورة المستهدف.",
      itemName: "نظام لحام روبوتي",
    },
    related: [
      { label: "سلامة المكابس والتغذية الأوتوماتيكية", href: "/pres-guvenligi" },
      { label: "مراكز تشغيل CNC", href: "/cnc-tezgah" },
      { label: "PLC وSCADA وأتمتة الآلات", href: "/plc-scada" },
      { label: "منتجات الأتمتة الصناعية", href: "/otomasyon" },
    ],
  },
};
