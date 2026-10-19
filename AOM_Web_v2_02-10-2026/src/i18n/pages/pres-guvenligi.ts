// /pres-guvenligi sayfasının EN/RU/AR içeriği (19-10-2026). Türkçe sayfa değişmedi.
import type { Locale } from "../locales";

type ServiceItem = { code?: string; title: string; text: string };
type StandardRow = { group: string; items: string };

export type PresGuvenligiContent = {
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
  services: ServiceItem[];
  heroImageAlt: string;
  solutionBadge: string; // "Solution" (used with code, e.g. "Solution A")
  beforeAfter: { h2: string; text: string; imageAlt: string };
  servoNc: { h2: string; text: string; imageAlt: string };
  standardsIntro: { h2: string; text: string };
  standards: StandardRow[];
  whoWeWorkedWith: { title: string; text: string; linkText: string };
  faqs: { q: string; a: string }[];
  contact: { title: string; text: string; itemName: string };
  related: { label: string; href: string }[];
};

export const presGuvenligiContent: Record<Locale, PresGuvenligiContent> = {
  en: {
    metaTitle: "Press Safety, Light Curtains & Servo Feeding | Ankara | AOM",
    metaDescription:
      "Light curtains, clutch-to-brake conversion, guarding and interlocked doors for eccentric presses; servo NC feeding. Conversions done in our own workshop in Ankara.",
    keywords: [
      "press safety",
      "press light curtain",
      "eccentric press clutch brake conversion",
      "press servo feeding",
      "NC feeding",
      "mechanical press safety",
    ],
    jsonLdName: "AOM Press Safety and Automatic Feeding",
    serviceType: "Eccentric press safety guarding and servo automatic feeding conversion",
    crumbCurrent: "Press Safety",
    eyebrow: "Press safety · Ankara",
    h1: "Press safety and automatic feeding",
    intro:
      "We make your eccentric and mechanical presses safe and automatic. We design light curtains, clutch-to-brake conversion, guard fencing and interlocked door solutions together with servo NC feeding systems, and carry out the conversions in our own mechanical workshop in Ankara.",
    highlights: [
      "Type 4 (IEC 61496) safety light curtain",
      "Stopping time and safety distance measured per EN ISO 13855",
      "EN ISO 16092-2 mechanical press safety requirements",
      "Servo NC feeding, 0–500 mm material width, 10 µm (0.01 mm) step accuracy",
    ],
    services: [
      {
        code: "A",
        title: "Safety light curtain integration",
        text: "Type 4 (IEC 61496) light curtain for presses that can stop mid-stroke; distance calculated per EN ISO 13855.",
      },
      {
        code: "B",
        title: "Clutch-to-brake conversion + light curtain",
        text: "Pneumatic clutch-to-brake conversion (with a dual safety valve) on mechanical presses, followed by a light curtain; used in fast, hand-fed production.",
      },
      {
        code: "C",
        title: "Guard fencing and interlocked sliding door",
        text: "Perimeter fencing and an interlocked sliding door on automatically fed mechanical presses; physically blocks access to the die.",
      },
      {
        code: "D",
        title: "Interlocked door, single stroke",
        text: "Interlocked door and single-stroke mechanism on hand-fed mechanical presses; the stroke cannot start until the door is closed.",
      },
      {
        title: "Servo NC automatic feeding",
        text: "A line of a decoiler, straightener and servo NC feeder; feeding only happens while the die is open, and the press and feeder run on the same crank angle. 0–500 mm material width, 10 µm step accuracy.",
      },
      {
        title: "Safety circuit and protective panel manufacturing",
        text: "Safety relay or safety PLC (EN ISO 13849-1), emergency stop, mode selection and stroke-monitoring circuit; guards and panels are built in our own workshop and installed on site.",
      },
      {
        title: "After-sales service and periodic inspection",
        text: "Periodic measurement of stopping time, safety function tests, periodic inspection support, spare parts and valve/contactor lifetime tracking (by cycle count).",
      },
    ],
    heroImageAlt:
      "Diagram of an eccentric press fitted with a light curtain, clutch-to-brake conversion, servo feeder and safety control unit",
    solutionBadge: "Solution",
    beforeAfter: {
      h2: "Same press, a different workplace",
      text: "You don't need to replace your press. AOM adds a safety system and automatic feeding to your existing eccentric press; the operator moves away from the die and to the control panel.",
      imageAlt:
        "Comparison of a press before conversion, with the operator's hand near the die area, and after conversion, with a locked door and operation from the control panel",
    },
    servoNc: {
      h2: "Servo NC feeding: the same step on every stroke",
      text: "The servo NC feeding line takes the strip from the decoiler, straightens it, and feeds it into the die by the step length entered on the HMI on every stroke. Feeding only happens while the die is open; the press and feeder run on the same crank angle.",
      imageAlt: "Diagram of an automatic feeding line made up of a decoiler, straightener, servo NC feeder and press/die",
    },
    standardsIntro: {
      h2: "Standards framework",
      text: "Press safety is defined by legal regulations, international Type A, B and C standards, and national rules. AOM designs, implements and documents its guarding solutions within this framework.",
    },
    standards: [
      { group: "Type A · fundamental", items: "ISO 12100 risk assessment and risk reduction" },
      {
        group: "Type B · safety-related",
        items:
          "ISO 13849-1 · IEC 62061 safety functions · ISO 13855 safety distance · ISO 13857 access · ISO 14119 interlocking · ISO 14120 guards · ISO 13851 two-hand control · ISO 13850 emergency stop · IEC 61496 light curtain",
      },
      { group: "Type C · press-specific", items: "EN ISO 16092-1 general · EN ISO 16092-2 mechanical presses" },
      {
        group: "Regulation (TR/EU)",
        items: "Machinery Safety Directive (2006/42/EC) · Use of Work Equipment Directive (2009/104/EC)",
      },
    ],
    whoWeWorkedWith: {
      title: "Who we've worked with",
      text: "We don't share a specific case study, as project details are covered by confidentiality agreements; you can see",
      linkText: "our main references on the home page",
    },
    faqs: [
      {
        q: "Can a light curtain be fitted to an older full-revolution mechanical press?",
        a: "On full-revolution mechanical presses, a light curtain alone is not considered sufficient protection; AOM applies the light curtain together with a pneumatic clutch-to-brake conversion first (Solution B), or installs an interlocked door with a single-stroke mechanism (Solution D).",
      },
      {
        q: "What material widths does the servo feeder handle?",
        a: "It handles 0–500 mm material width at 10 µm (0.01 mm) step accuracy; feeding only happens while the die is open and advances in sync with the press.",
      },
      {
        q: "Do you issue a certificate of regulatory compliance?",
        a: "AOM is not a notified body and does not issue an official conformity certificate. We carry out the project with an ISO 12100 risk assessment, stopping time and safety distance measurement per EN ISO 13855, and safety function tests; we deliver with a commissioning report, instructions for use and test records. The legally required periodic inspections specified in the regulation are carried out by an authorized inspection body, with AOM's support.",
      },
      {
        q: "What tonnage of presses do you work with?",
        a: "Protection is determined not by tonnage but by clutch type, feeding method, stopping time, bed size and number of operators. We apply a suitable solution within the same standards framework for every class, from small (e.g. ≤40 t) to large tonnage (e.g. >160 t); the final choice is made with an on-site risk analysis and stopping-time measurement.",
      },
    ],
    contact: {
      title: "Let's plan a site survey for your press",
      text: "Send us your press's tonnage, clutch type and feeding method; we'll work out the right solution together.",
      itemName: "Press safety and automatic feeding",
    },
    related: [
      { label: "Robotic welding systems", href: "/robotik-kaynak" },
      { label: "CNC machining centers", href: "/cnc-tezgah" },
      { label: "PLC, SCADA and machine automation", href: "/plc-scada" },
    ],
  },
  ru: {
    metaTitle: "Безопасность прессов, световые завесы и сервоподача | Анкара | AOM",
    metaDescription:
      "Световые завесы, переоборудование муфта-тормоз, ограждения и блокируемые двери для эксцентриковых прессов; сервоподача NC. Переоборудование — на нашем собственном участке в Анкаре.",
    keywords: [
      "безопасность прессов",
      "световая завеса пресса",
      "переоборудование муфта-тормоз эксцентрикового пресса",
      "сервоподача пресса",
      "NC подача",
      "безопасность кривошипного пресса",
    ],
    jsonLdName: "Безопасность прессов и автоматическая подача AOM",
    serviceType: "Защитное ограждение эксцентриковых прессов и переоборудование на сервоавтоматическую подачу",
    crumbCurrent: "Безопасность прессов",
    eyebrow: "Безопасность прессов · Анкара",
    h1: "Безопасность прессов и автоматическая подача",
    intro:
      "Мы делаем ваши эксцентриковые и кривошипные прессы безопасными и автоматическими. Проектируем световые завесы, переоборудование муфта-тормоз, защитные ограждения и блокируемые двери вместе с системами сервоподачи NC, а переоборудование выполняем на собственном механическом участке в Анкаре.",
    highlights: [
      "Световая завеса безопасности Типа 4 (IEC 61496)",
      "Время останова и безопасное расстояние измеряются по EN ISO 13855",
      "Требования безопасности механических прессов EN ISO 16092-2",
      "Сервоподача NC, ширина материала 0–500 мм, точность шага 10 мкм (0,01 мм)",
    ],
    services: [
      {
        code: "A",
        title: "Интеграция световой завесы безопасности",
        text: "Световая завеса Типа 4 (IEC 61496) для прессов, способных остановиться в середине хода; расстояние рассчитывается по EN ISO 13855.",
      },
      {
        code: "B",
        title: "Переоборудование муфта-тормоз + световая завеса",
        text: "Пневматическое переоборудование муфта-тормоз (с дублирующим предохранительным клапаном) на кривошипном прессе с последующей световой завесой; применяется при быстром ручном производстве.",
      },
      {
        code: "C",
        title: "Ограждение и блокируемая раздвижная дверь",
        text: "Периметральное ограждение и блокируемая раздвижная дверь на кривошипных прессах с автоматической подачей; физически перекрывает доступ к штампу.",
      },
      {
        code: "D",
        title: "Блокируемая дверь, одиночный ход",
        text: "Блокируемая дверь и механизм одиночного хода на кривошипных прессах с ручной подачей; ход не начинается, пока дверь не закрыта.",
      },
      {
        title: "Сервоподача NC",
        text: "Линия из разматывателя, правильного устройства и сервоподатчика NC; подача выполняется только при открытом штампе, пресс и податчик работают по одному углу кривошипа. Ширина материала 0–500 мм, точность шага 10 мкм.",
      },
      {
        title: "Изготовление цепи безопасности и защитного шкафа",
        text: "Реле безопасности или безопасный ПЛК (EN ISO 13849-1), аварийная остановка, выбор режима и контроль хода; ограждения и шкафы изготавливаются на собственном участке и монтируются на объекте.",
      },
      {
        title: "Послепродажное обслуживание и периодический контроль",
        text: "Периодическое измерение времени останова, испытания функций безопасности, поддержка периодического контроля, запчасти и отслеживание ресурса клапанов/контакторов (по числу циклов).",
      },
    ],
    heroImageAlt:
      "Схема эксцентрикового пресса, оснащённого световой завесой, переоборудованием муфта-тормоз, сервоподатчиком и блоком управления безопасностью",
    solutionBadge: "Решение",
    beforeAfter: {
      h2: "Тот же пресс, совсем другое рабочее место",
      text: "Менять пресс не нужно. AOM добавляет систему безопасности и автоматическую подачу к вашему существующему эксцентриковому прессу; оператор отходит от штампа и встаёт у панели управления.",
      imageAlt:
        "Сравнение пресса до переоборудования, когда рука оператора находится в зоне штампа, и после переоборудования, с заблокированной дверью и управлением с панели",
    },
    servoNc: {
      h2: "Сервоподача NC: одинаковый шаг на каждом ходе",
      text: "Линия сервоподачи NC забирает ленту с разматывателя, выпрямляет её и подаёт в штамп на каждом ходе на длину шага, заданную на HMI. Подача выполняется только при открытом штампе; пресс и податчик работают по одному углу кривошипа.",
      imageAlt: "Схема линии автоматической подачи из разматывателя, правильного устройства, сервоподатчика NC и пресса/штампа",
    },
    standardsIntro: {
      h2: "Нормативная база",
      text: "Безопасность прессов определяется законодательством, международными стандартами типов A, B и C и национальными правилами. AOM проектирует, внедряет и документирует свои защитные решения в рамках этой базы.",
    },
    standards: [
      { group: "Тип A · базовый", items: "Оценка и снижение риска по ISO 12100" },
      {
        group: "Тип B · вопросы безопасности",
        items:
          "ISO 13849-1 · функции безопасности IEC 62061 · безопасное расстояние ISO 13855 · доступ ISO 13857 · блокировка ISO 14119 · ограждения ISO 14120 · двуручное управление ISO 13851 · аварийный останов ISO 13850 · световая завеса IEC 61496",
      },
      { group: "Тип C · специфика прессов", items: "EN ISO 16092-1 общие требования · EN ISO 16092-2 механические прессы" },
      {
        group: "Нормативы (Турция/ЕС)",
        items: "Директива по безопасности машин (2006/42/EC) · Директива по использованию рабочего оборудования (2009/104/EC)",
      },
    ],
    whoWeWorkedWith: {
      title: "С кем мы работали",
      text: "Мы не публикуем конкретный кейс, так как детали проектов защищены соглашениями о конфиденциальности; вы можете увидеть",
      linkText: "наши основные референсы на главной странице",
    },
    faqs: [
      {
        q: "Можно ли установить световую завесу на старый кривошипный пресс полного оборота?",
        a: "На прессах полного оборота световая завеса сама по себе не считается достаточной защитой; AOM применяет световую завесу вместе с пневматическим переоборудованием муфта-тормоз (решение B) или устанавливает блокируемую дверь с механизмом одиночного хода (решение D).",
      },
      {
        q: "В каком диапазоне ширины материала работает сервоподача?",
        a: "В диапазоне 0–500 мм ширины материала с точностью шага 10 мкм (0,01 мм); подача выполняется только при открытом штампе и синхронизирована с прессом.",
      },
      {
        q: "Выдаёте ли вы сертификат соответствия нормативам?",
        a: "AOM не является нотифицированным органом и не выдаёт официальный сертификат соответствия. Мы выполняем проект с оценкой риска по ISO 12100, измерением времени останова и безопасного расстояния по EN ISO 13855, испытаниями функций безопасности; передаём заказчику отчёт о вводе в эксплуатацию, инструкцию по эксплуатации и протоколы испытаний. Законодательно установленный периодический контроль выполняется уполномоченным органом контроля при поддержке AOM.",
      },
      {
        q: "С прессами какого тоннажа вы работаете?",
        a: "Защиту определяет не тоннаж, а тип муфты, способ подачи, время останова, размер стола и число операторов. Мы применяем подходящее решение в рамках одной и той же нормативной базы для любого класса — от малого (например, ≤40 т) до большого тоннажа (например, >160 т); окончательный выбор делается на основе анализа риска на месте и измерения времени останова.",
      },
    ],
    contact: {
      title: "Запланируем обследование вашего пресса",
      text: "Пришлите тоннаж пресса, тип муфты и способ подачи; вместе определим подходящее решение.",
      itemName: "Безопасность прессов и автоматическая подача",
    },
    related: [
      { label: "Роботизированные сварочные системы", href: "/robotik-kaynak" },
      { label: "Обрабатывающие центры с ЧПУ", href: "/cnc-tezgah" },
      { label: "ПЛК, SCADA и автоматизация машин", href: "/plc-scada" },
    ],
  },
  ar: {
    metaTitle: "سلامة المكابس وستائر ضوئية وتغذية سيرفو | أنقرة | AOM",
    metaDescription:
      "ستائر ضوئية وتحويل القابض-الفرامل وأقفاص وأبواب مقفلة للمكابس اللامركزية؛ تغذية سيرفو NC. التحويلات في ورشتنا الخاصة في أنقرة.",
    keywords: [
      "سلامة المكابس",
      "ستارة ضوئية للمكبس",
      "تحويل القابض الفرامل للمكبس اللامركزي",
      "تغذية سيرفو للمكبس",
      "تغذية NC",
      "سلامة المكبس الميكانيكي",
    ],
    jsonLdName: "سلامة المكابس والتغذية الأوتوماتيكية من AOM",
    serviceType: "حواجز سلامة للمكابس اللامركزية وتحويل إلى تغذية سيرفو أوتوماتيكية",
    crumbCurrent: "سلامة المكابس",
    eyebrow: "سلامة المكابس · أنقرة",
    h1: "سلامة المكابس والتغذية الأوتوماتيكية",
    intro:
      "نجعل مكابسكم اللامركزية والميكانيكية آمنة وأوتوماتيكية. نصمم الستائر الضوئية وتحويل القابض-الفرامل وأقفاص الحماية والأبواب المقفلة إلى جانب أنظمة تغذية السيرفو NC، ونُجري التحويلات في ورشتنا الميكانيكية الخاصة في أنقرة.",
    highlights: [
      "ستارة ضوئية أمان من النوع 4 (IEC 61496)",
      "زمن التوقف ومسافة الأمان يُقاسان وفق EN ISO 13855",
      "متطلبات سلامة المكابس الميكانيكية EN ISO 16092-2",
      "تغذية سيرفو NC، عرض مادة 0–500 مم، دقة خطوة 10 ميكرون (0.01 مم)",
    ],
    services: [
      {
        code: "A",
        title: "دمج ستارة ضوئية للأمان",
        text: "ستارة ضوئية من النوع 4 (IEC 61496) للمكابس القادرة على التوقف منتصف الشوط؛ تُحسب المسافة وفق EN ISO 13855.",
      },
      {
        code: "B",
        title: "تحويل القابض-الفرامل + ستارة ضوئية",
        text: "تحويل هوائي للقابض-الفرامل (بصمام أمان مزدوج) في المكبس الميكانيكي يتبعه ستارة ضوئية؛ يُستخدم في الإنتاج السريع بالتغذية اليدوية.",
      },
      {
        code: "C",
        title: "قفص حماية وباب انزلاقي مقفل",
        text: "سياج محيطي وباب انزلاقي مقفل على المكابس الميكانيكية ذات التغذية الأوتوماتيكية؛ يمنع الوصول إلى القالب فعليًا.",
      },
      {
        code: "D",
        title: "باب مقفل، شوطة واحدة",
        text: "باب مقفل وآلية شوطة واحدة على المكابس الميكانيكية ذات التغذية اليدوية؛ لا تبدأ الشوطة قبل إغلاق الباب.",
      },
      {
        title: "تغذية سيرفو NC أوتوماتيكية",
        text: "خط يتكون من فاك لفة ومُقوّم ومغذي سيرفو NC؛ تتم التغذية فقط عندما يكون القالب مفتوحًا، ويعمل المكبس والمغذي وفق نفس زاوية العمود المرفقي. عرض مادة 0–500 مم، دقة خطوة 10 ميكرون.",
      },
      {
        title: "تصنيع دائرة الأمان ولوحة الحماية",
        text: "مرحل أمان أو PLC أمان (EN ISO 13849-1)، إيقاف طارئ، اختيار وضع ومراقبة الشوط؛ يتم تصنيع الحواجز واللوحات في ورشتنا الخاصة وتركيبها في الموقع.",
      },
      {
        title: "الخدمة بعد البيع والفحص الدوري",
        text: "قياس دوري لزمن التوقف، اختبارات وظائف الأمان، دعم الفحص الدوري، قطع غيار ومتابعة عمر الصمامات/المتصلات (وفق عدد الدورات).",
      },
    ],
    heroImageAlt: "مخطط لمكبس لامركزي مزود بستارة ضوئية وتحويل قابض-فرامل ومغذي سيرفو ووحدة تحكم أمان",
    solutionBadge: "الحل",
    beforeAfter: {
      h2: "نفس المكبس، مكان عمل مختلف تمامًا",
      text: "لا تحتاجون لاستبدال مكبسكم. تضيف AOM نظام أمان وتغذية أوتوماتيكية إلى مكبسكم اللامركزي الحالي؛ يبتعد المشغل عن منطقة القالب وينتقل إلى لوحة التحكم.",
      imageAlt:
        "مقارنة بين المكبس قبل التحويل، حيث تكون يد المشغل قرب منطقة القالب، وبعد التحويل، بباب مقفل وتشغيل من لوحة التحكم",
    },
    servoNc: {
      h2: "تغذية سيرفو NC: نفس الخطوة في كل شوط",
      text: "يأخذ خط تغذية السيرفو NC الشريط من فاك اللفة، يُقوّمه، ويغذيه إلى القالب في كل شوط بطول الخطوة المُدخل من HMI. تتم التغذية فقط عندما يكون القالب مفتوحًا؛ يعمل المكبس والمغذي وفق نفس زاوية العمود المرفقي.",
      imageAlt: "مخطط لخط تغذية أوتوماتيكي يتكون من فاك لفة ومُقوّم ومغذي سيرفو NC والمكبس/القالب",
    },
    standardsIntro: {
      h2: "الإطار المعياري",
      text: "تُحدَّد سلامة المكابس بالتشريعات القانونية والمعايير الدولية من النوع A وB وC والقواعد الوطنية. تصمم AOM حلول الحماية وتطبقها وتوثقها ضمن هذا الإطار.",
    },
    standards: [
      { group: "النوع A · أساسي", items: "تقييم المخاطر وتقليلها وفق ISO 12100" },
      {
        group: "النوع B · مواضيع السلامة",
        items:
          "ISO 13849-1 · وظائف السلامة IEC 62061 · مسافة الأمان ISO 13855 · الوصول ISO 13857 · القفل ISO 14119 · الحواجز ISO 14120 · التحكم بيدين ISO 13851 · الإيقاف الطارئ ISO 13850 · الستارة الضوئية IEC 61496",
      },
      { group: "النوع C · خاص بالمكابس", items: "EN ISO 16092-1 عام · EN ISO 16092-2 مكابس ميكانيكية" },
      {
        group: "التشريعات (تركيا/الاتحاد الأوروبي)",
        items: "لائحة سلامة الآلات (2006/42/AT) · لائحة استخدام معدات العمل (2009/104/AT)",
      },
    ],
    whoWeWorkedWith: {
      title: "مع من عملنا",
      text: "لا نشارك دراسة حالة محددة لأن تفاصيل المشاريع مشمولة باتفاقيات السرية؛ يمكنكم الاطلاع على",
      linkText: "مراجعنا الرئيسية في الصفحة الرئيسية",
    },
    faqs: [
      {
        q: "هل يمكن تركيب ستارة ضوئية على مكبس ميكانيكي قديم كامل الدورة؟",
        a: "في المكابس كاملة الدورة، لا تُعتبر الستارة الضوئية وحدها حماية كافية؛ تطبق AOM الستارة الضوئية مع تحويل القابض-الفرامل الهوائي أولًا (الحل B)، أو تركّب بابًا مقفلًا بآلية شوطة واحدة (الحل D).",
      },
      {
        q: "ما نطاق عرض المادة الذي تعمل ضمنه تغذية السيرفو؟",
        a: "تعمل ضمن عرض مادة 0–500 مم بدقة خطوة 10 ميكرون (0.01 مم)؛ تتم التغذية فقط عندما يكون القالب مفتوحًا وتتزامن مع المكبس.",
      },
      {
        q: "هل تصدرون شهادة مطابقة للتشريعات؟",
        a: "AOM ليست جهة مُخطرة ولا تصدر شهادة مطابقة رسمية. ننفذ المشروع بتقييم مخاطر وفق ISO 12100، وقياس زمن التوقف ومسافة الأمان وفق EN ISO 13855، واختبارات وظائف الأمان؛ ونسلّم تقرير تشغيل وتعليمات استخدام وسجلات اختبار. تُجرى الفحوصات الدورية القانونية المنصوص عليها من قبل جهة فحص معتمدة، بدعم من AOM.",
      },
      {
        q: "مع أي حمولة طنية من المكابس تعملون؟",
        a: "الحماية لا يحددها الوزن الطني بل نوع القابض وطريقة التغذية وزمن التوقف وحجم الطاولة وعدد المشغلين. نطبق الحل المناسب ضمن نفس الإطار المعياري لكل فئة، من الصغيرة (مثلًا ≤40 طن) إلى الكبيرة (مثلًا >160 طن)؛ يتم الاختيار النهائي عبر تحليل مخاطر ميداني وقياس زمن التوقف.",
      },
    ],
    contact: {
      title: "لنخطط لمعاينة ميدانية لمكبسكم",
      text: "أرسلوا لنا الحمولة الطنية لمكبسكم ونوع القابض وطريقة التغذية؛ لنحدد معًا الحل المناسب.",
      itemName: "سلامة المكابس والتغذية الأوتوماتيكية",
    },
    related: [
      { label: "أنظمة اللحام الروبوتي", href: "/robotik-kaynak" },
      { label: "مراكز تشغيل CNC", href: "/cnc-tezgah" },
      { label: "PLC وSCADA وأتمتة الآلات", href: "/plc-scada" },
    ],
  },
};
