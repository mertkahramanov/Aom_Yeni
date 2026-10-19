// /cnc-tezgah sayfasının EN/RU/AR içeriği (19-10-2026). Türkçe sayfa değişmedi.
import type { Locale } from "../locales";

type Pair = { title: string; text: string };
type CompareRow = { k: string; a: string; b: string };
type Stat = { value: string; text: string };

export type CncTezgahContent = {
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
  heroImageAlt: string;
  compareH2: string;
  compareHeaders: [string, string, string];
  compareRows: CompareRow[];
  tenX: { h2: string; text: string; stats: Stat[] };
  control: {
    h2: string;
    text: string;
    option1: Pair;
    option2: Pair;
    recipeImageAlt: string;
    recipeCaption: string;
  };
  custom: { h2: string; text: string };
  specialPurpose: Pair[];
  fixture: { h2: string; text: string };
  fixtureSectors: Pair[];
  robotCell: { h2: string; text: string; imageAlt: string };
  whoWeWorkedWith: { title: string; text: string; linkText: string };
  faqs: { q: string; a: string }[];
  contact: { title: string; text: string; itemName: string };
  related: { label: string; href: string }[];
};

export const cncTezgahContent: Record<Locale, CncTezgahContent> = {
  en: {
    metaTitle: "Compact CNC Machining Centers | Manufactured in Ankara | AOM",
    metaDescription:
      "Compact CNC machining centers designed and built in Ankara. Siemens, Fanuc or Mitsubishi Electric control, optional robotic cell, service and spare parts from Ankara.",
    keywords: [
      "cnc machine ankara",
      "compact cnc machining center",
      "domestically made cnc machine",
      "robotic cnc cell",
      "cnc machine manufacturer",
    ],
    jsonLdName: "AOM Compact CNC Machining Centers",
    serviceType: "Design, manufacturing and commissioning of compact CNC machining centers",
    crumbCurrent: "CNC Machining",
    eyebrow: "CNC machining center · Ankara",
    h1: "Invest in performance, not a logo",
    intro:
      "We design, build and commission compact CNC machines in Ankara. Instead of paying a hefty brand premium, you get the capacity your work actually needs and engineering support right next door. Choose the control unit that fits your needs — Siemens, Fanuc or Mitsubishi Electric — and set the machine up as part of a robotic cell.",
    highlights: [
      "Siemens, Fanuc or Mitsubishi Electric control options",
      "PLC-based AOM recipe system: production without CNC knowledge",
      "Optional robotic loading/unloading cell",
      "Direct service and spare parts from Ankara",
    ],
    heroImageAlt:
      "Render of an AOM compact CNC machine with linear guides, AC servo motors, electrospindle, status light tower and T-slot table labeled",
    compareH2: "Imported premium brand, or AOM?",
    compareHeaders: ["", "Imported premium brand", "AOM"],
    compareRows: [
      { k: "Investment", a: "Brand premium, FX-indexed pricing", b: "A machine sized to your actual need" },
      { k: "Service & spare parts", a: "Authorized-service queue, imported parts", b: "Direct service from Ankara" },
      { k: "Customization", a: "Standard catalog models", b: "Work envelope, spindle and control built around you" },
      { k: "Point of contact", a: "Distributor / dealer", b: "The engineering team that designed your machine" },
      { k: "Line integration", a: "An add-on package or a third party", b: "Robot loading and automation under one roof" },
    ],
    tenX: {
      h2: "10 AOMs instead of one large machine",
      text: "Most of the work a large machine does can be done with compact machines. Instead of one large machine, you can install 10 AOM machines in the same footprint and multiply production at a much lower investment (for production where parts fit the compact machine's work envelope and the machines run in parallel).",
      stats: [
        { value: "10×", text: "spindles, on the same floor space — 10 parts or 10 different jobs machined at once." },
        { value: "50%+", text: "lower investment — at least 50% versus one large machine; the exact figure is in your quote." },
        { value: "0 m²", text: "extra workshop space — grow capacity without moving to a bigger workshop and higher rent." },
      ],
    },
    control: {
      h2: "Even an operator who doesn't know the machine can produce",
      text: "We offer two control options: a world-brand CNC control unit, or the PLC-based AOM recipe system built around the parts you produce. In the recipe system, G-code is embedded in the system; the operator just selects the part and starts it.",
      option1: {
        title: "Option 1 · For teams that know CNC",
        text: "Full G-code programming and editing, program transfer from CAM software, and the brand's global service and spare-parts network. Brand options: Siemens, Fanuc, Mitsubishi Electric.",
      },
      option2: {
        title: "Option 2 · For serial production",
        text: "AOM recipe system (PLC): your parts' G-code is embedded in the system, the operator selects the part and starts it, new parts are added on request.",
      },
      recipeImageAlt: "Example AOM recipe system screen: part selection from a library, material and clamping information, start button",
      recipeCaption: "Example screen; the interface is built around your part list.",
    },
    custom: {
      h2: "A machine built for your work, a perfect fit for your work",
      text: "If you have a repetitive process, instead of fitting it to a general-purpose machine we design the machine around your process. PLC-based control, recipe-driven operation and integration with the robots, conveyors and other machines on your line — all under one roof.",
    },
    specialPurpose: [
      {
        title: "Cutting tool sharpening",
        text: "Sharpening drills, end mills and special tools; tool geometry is stored in a recipe, the operator just selects the tool.",
      },
      {
        title: "Saw blade sharpening",
        text: "Automatic sharpening of circular saw teeth; tooth count and angle are chosen from the recipe, indexing is automatic.",
      },
      {
        title: "Plastics industry",
        text: "Deflashing, cutting and drilling for thermoformed and injection-molded parts; fast clamping with a vacuum table.",
      },
      {
        title: "Solar panels",
        text: "Drilling, cutting and machining stations matched to panel and frame production lines; multi-head design.",
      },
      {
        title: "Composites and defense",
        text: "Cutting and trimming carbon and glass-fiber composite parts; tilting head, dust extraction and part-specific fixtures.",
      },
    ],
    fixture: {
      h2: "Your machine grows with your business",
      text: "We design fixtures tailored to every sector, and add a 4th or 5th axis to the machine when the need arises. Part-clamping time is reduced and more surfaces are machined in a single setup.",
    },
    fixtureSectors: [
      {
        title: "Automotive supply",
        text: "Pneumatic multi-part clamping; six parts in a single setup, with clamps controlled from the PLC.",
      },
      { title: "Medical", text: "Multi-jaw block; 12-station serial clamping for titanium implants and pins." },
      { title: "Electronics", text: "Vacuum fixture; clamps thin-walled aluminum enclosures without leaving marks." },
      { title: "Mold and tooling", text: "Zero-point clamping; the pallet is prepared off the machine and sits in the same position on it." },
    ],
    robotCell: {
      h2: "The robot loads, the machine never stops",
      text: "A robot on a linear rail in front of the machines loads raw parts and removes finished ones. Shift changes, breaks or night hours make no difference — the cell produces continuously. We select the right robot for your cell, from a cartesian robot up to a 6-axis industrial robot; as a Yaskawa OEM partner we offer brand assurance, and we can also source a lower-cost robot if you prefer.",
      imageAlt: "Diagram of a robotic cell where a 6-axis robot on a linear rail loads parts into multiple CNC machines",
    },
    whoWeWorkedWith: {
      title: "Who we've worked with",
      text: "We work with organizations in defense, aerospace and heavy industry that expect high precision; project details are covered by confidentiality agreements.",
      linkText: "our main references on the home page",
    },
    faqs: [
      {
        q: "What's the difference between buying an imported premium brand and an AOM machine?",
        a: "Instead of a brand premium and FX-indexed pricing, you get a machine sized to your actual needs; service is provided directly from Ankara, the work envelope/spindle/control are customized for you, your point of contact is the engineering team that designed the machine, and robot loading and automation integration are handled under one roof.",
      },
      {
        q: "How is the control unit chosen?",
        a: "We offer two options: a world-brand control (Siemens, Fanuc or Mitsubishi Electric) with full G-code programming for teams that know CNC, or the PLC-based AOM recipe system for serial production, where G-code is embedded in the system and the operator simply selects and starts the part.",
      },
      {
        q: "Can a robot be integrated into an existing machine?",
        a: "Yes. We select and integrate the right robot for your cell, from a cartesian robot up to a 6-axis industrial robot; as a Yaskawa OEM partner we offer brand assurance, and we can also source a lower-cost robot if you prefer.",
      },
      {
        q: "Can you build a machine for a special process that isn't in the standard models?",
        a: "Yes. If you have a repetitive process, instead of fitting it to a general-purpose model we design the machine around your process; we have examples in cutting-tool sharpening, saw-blade sharpening, plastics, solar panel and composite/defense sectors — and for anything not on the list, just describe your process.",
      },
    ],
    contact: {
      title: "Request a quote for your CNC machining project",
      text: "Send us your work envelope, part drawings and quantity/cycle time; we'll work out control unit and robot integration options together.",
      itemName: "CNC machining center",
    },
    related: [
      { label: "Robotic welding systems", href: "/robotik-kaynak" },
      { label: "Press safety and automatic feeding", href: "/pres-guvenligi" },
      { label: "PLC, SCADA and machine automation", href: "/plc-scada" },
    ],
  },
  ru: {
    metaTitle: "Компактные обрабатывающие центры с ЧПУ | Производство в Анкаре | AOM",
    metaDescription:
      "Компактные обрабатывающие центры с ЧПУ, проектируемые и изготавливаемые в Анкаре. Управление Siemens, Fanuc или Mitsubishi Electric, опциональная роботизированная ячейка, сервис и запчасти из Анкары.",
    keywords: [
      "станок с чпу анкара",
      "компактный обрабатывающий центр с чпу",
      "отечественный станок с чпу",
      "роботизированная ячейка чпу",
      "производитель станков с чпу",
    ],
    jsonLdName: "Компактные обрабатывающие центры с ЧПУ AOM",
    serviceType: "Проектирование, изготовление и ввод в эксплуатацию компактных обрабатывающих центров с ЧПУ",
    crumbCurrent: "Станки с ЧПУ",
    eyebrow: "Обрабатывающий центр с ЧПУ · Анкара",
    h1: "Инвестируйте в производительность, а не в бренд",
    intro:
      "Мы проектируем, изготавливаем и вводим в эксплуатацию компактные станки с ЧПУ в Анкаре. Вместо высокой наценки за бренд вы получаете мощность, реально нужную вашему производству, и инженерную поддержку рядом с собой. Блок управления выбирается под ваши задачи — Siemens, Fanuc или Mitsubishi Electric, а станок можно встроить в роботизированную ячейку.",
    highlights: [
      "Варианты управления Siemens, Fanuc или Mitsubishi Electric",
      "Система рецептов AOM на базе ПЛК: производство без знания ЧПУ",
      "Опциональная роботизированная ячейка загрузки-выгрузки",
      "Прямой сервис и запчасти из Анкары",
    ],
    heroImageAlt:
      "Рендер компактного станка с ЧПУ AOM с линейными направляющими, AC-сервоприводами, электрошпинделем, световой колонной состояния и Т-образным столом с подписями",
    compareH2: "Импортный премиальный бренд или AOM?",
    compareHeaders: ["", "Импортный премиальный бренд", "AOM"],
    compareRows: [
      { k: "Инвестиции", a: "Наценка за бренд, цена в валюте", b: "Станок, рассчитанный под реальную потребность" },
      { k: "Сервис и запчасти", a: "Очередь авторизованного сервиса, импортные детали", b: "Прямой сервис из Анкары" },
      { k: "Индивидуализация", a: "Стандартные модели по каталогу", b: "Рабочая зона, шпиндель и управление под вас" },
      { k: "Контактное лицо", a: "Дистрибьютор / дилер", b: "Инженерная команда, спроектировавшая станок" },
      { k: "Интеграция в линию", a: "Дополнительный пакет или третья сторона", b: "Загрузка роботом и автоматизация из одних рук" },
    ],
    tenX: {
      h2: "10 станков AOM вместо одного большого",
      text: "Большую часть работы, которую выполняет большой станок, можно сделать компактными станками. На месте одного большого станка можно установить 10 AOM и умножить производство при значительно меньших вложениях (для производства, где детали помещаются в рабочую зону компактного станка, а станки работают параллельно).",
      stats: [
        { value: "10×", text: "шпинделей на той же площади — 10 деталей или 10 разных задач обрабатываются одновременно." },
        { value: "50%+", text: "меньше инвестиций — как минимум на 50% по сравнению с одним большим станком; точная цифра — в вашем предложении." },
        { value: "0 м²", text: "дополнительной площади цеха — наращивайте мощность без перехода в больший цех и более высокой аренды." },
      ],
    },
    control: {
      h2: "Произведёт даже оператор, не знающий станок",
      text: "Мы предлагаем два варианта управления: блок ЧПУ мирового бренда или систему рецептов AOM на базе ПЛК, построенную под ваши детали. В системе рецептов G-код встроен в систему; оператор лишь выбирает деталь и запускает её.",
      option1: {
        title: "Вариант 1 · Для команд, знающих ЧПУ",
        text: "Полное программирование и редактирование G-кода, передача программ из CAM-систем, глобальная сервисная сеть и запчасти бренда. Варианты брендов: Siemens, Fanuc, Mitsubishi Electric.",
      },
      option2: {
        title: "Вариант 2 · Для серийного производства",
        text: "Система рецептов AOM (ПЛК): G-код ваших деталей встроен в систему, оператор выбирает деталь и запускает её, новые детали добавляются по запросу.",
      },
      recipeImageAlt: "Пример экрана системы рецептов AOM: выбор детали из библиотеки, информация о материале и закреплении, кнопка пуска",
      recipeCaption: "Пример экрана; интерфейс строится под ваш список деталей.",
    },
    custom: {
      h2: "Станок под ваше производство, полное соответствие вашей задаче",
      text: "Если у вас повторяющийся процесс, вместо подгонки под станок общего назначения мы проектируем станок под ваш процесс. Управление на базе ПЛК, работа по рецептам и интеграция с роботами, конвейерами и другими станками на вашей линии — всё из одних рук.",
    },
    specialPurpose: [
      {
        title: "Заточка режущего инструмента",
        text: "Заточка свёрл, концевых фрез и специальных инструментов; геометрия инструмента хранится в рецепте, оператор лишь выбирает инструмент.",
      },
      {
        title: "Заточка пильных полотен",
        text: "Автоматическая заточка зубьев дисковых пил; число зубьев и угол выбираются из рецепта, индексация автоматическая.",
      },
      {
        title: "Пластиковая промышленность",
        text: "Снятие облоя, резка и сверление термоформованных и литьевых деталей; быстрое закрепление на вакуумном столе.",
      },
      {
        title: "Солнечные панели",
        text: "Станции сверления, резки и обработки под линии производства панелей и рам; многоголовочная конструкция.",
      },
      {
        title: "Композиты и оборонная промышленность",
        text: "Резка и обрезка деталей из углеродных и стеклопластиковых композитов; наклонная головка, пылеудаление и фиксатор под деталь.",
      },
    ],
    fixture: {
      h2: "Ваш станок растёт вместе с вашим бизнесом",
      text: "Мы проектируем оснастку под каждую отрасль и добавляем 4-ю и 5-ю оси станку по мере необходимости. Время закрепления детали сокращается, за одну установку обрабатывается больше поверхностей.",
    },
    fixtureSectors: [
      {
        title: "Автомобильная промышленность (поставщики)",
        text: "Пневматическое многоместное зажимное приспособление; шесть деталей в одной установке, зажимы управляются от ПЛК.",
      },
      { title: "Медицина", text: "Блок с несколькими кулачками; 12-позиционное серийное закрепление для титановых имплантатов и штифтов." },
      { title: "Электроника", text: "Вакуумная оснастка; закрепляет тонкостенные алюминиевые корпуса без следов зажима." },
      { title: "Пресс-формы и инструмент", text: "Зажим с нулевой точкой; паллета готовится вне станка и встаёт на станке в то же положение." },
    ],
    robotCell: {
      h2: "Робот загружает, станок не останавливается",
      text: "Робот на линейном рельсе перед станками загружает заготовки и забирает готовые детали. Смена, перерыв или ночное время не имеют значения — ячейка работает непрерывно. Мы подбираем подходящего робота для вашей ячейки — от картезианского робота до 6-осевого промышленного робота; как OEM-партнёр Yaskawa мы гарантируем качество бренда, при желании можем поставить и более бюджетного робота.",
      imageAlt: "Схема роботизированной ячейки, где 6-осевой робот на линейном рельсе загружает детали в несколько станков с ЧПУ",
    },
    whoWeWorkedWith: {
      title: "С кем мы работали",
      text: "Мы работаем с организациями в оборонной, авиакосмической и тяжёлой промышленности, предъявляющими высокие требования к точности; детали проектов защищены соглашениями о конфиденциальности.",
      linkText: "наши основные референсы на главной странице",
    },
    faqs: [
      {
        q: "В чём разница между покупкой импортного премиального бренда и станка AOM?",
        a: "Вместо наценки за бренд и цены в валюте вы получаете станок, рассчитанный под ваши реальные нужды; сервис предоставляется напрямую из Анкары, рабочая зона/шпиндель/управление настраиваются под вас, вашим контактным лицом является инженерная команда, спроектировавшая станок, а загрузка роботом и интеграция автоматизации выполняются из одних рук.",
      },
      {
        q: "Как выбирается блок управления?",
        a: "Мы предлагаем два варианта: управление мирового бренда (Siemens, Fanuc или Mitsubishi Electric) с полным программированием G-кодом для команд, знающих ЧПУ, либо система рецептов AOM на базе ПЛК для серийного производства, где G-код встроен в систему, а оператор лишь выбирает деталь и запускает её.",
      },
      {
        q: "Можно ли интегрировать робота в существующий станок?",
        a: "Да. Мы подбираем и интегрируем подходящего робота для вашей ячейки — от картезианского робота до 6-осевого промышленного робота; как OEM-партнёр Yaskawa мы гарантируем качество бренда, при желании можем поставить и более бюджетного робота.",
      },
      {
        q: "Можно ли заказать станок под специальный процесс, которого нет в стандартных моделях?",
        a: "Да. Если у вас повторяющийся процесс, вместо подгонки под станок общего назначения мы проектируем станок под ваш процесс; у нас есть примеры в заточке режущего инструмента, заточке пил, пластиковой промышленности, солнечных панелях и композитах/оборонной отрасли — а для процесса, которого нет в списке, достаточно его описать.",
      },
    ],
    contact: {
      title: "Запросите предложение для вашего проекта обработки с ЧПУ",
      text: "Пришлите рабочую зону, чертежи деталей и объём/время цикла; вместе определим опции блока управления и интеграции робота.",
      itemName: "Обрабатывающий центр с ЧПУ",
    },
    related: [
      { label: "Роботизированные сварочные системы", href: "/robotik-kaynak" },
      { label: "Безопасность прессов и автоматическая подача", href: "/pres-guvenligi" },
      { label: "ПЛК, SCADA и автоматизация машин", href: "/plc-scada" },
    ],
  },
  ar: {
    metaTitle: "مراكز تشغيل CNC مدمجة | تصنيع في أنقرة | AOM",
    metaDescription:
      "مراكز تشغيل CNC مدمجة تُصمَّم وتُصنَّع في أنقرة. تحكم Siemens أو Fanuc أو Mitsubishi Electric، خيار خلية روبوتية، خدمة وقطع غيار من أنقرة.",
    keywords: [
      "ماكينة cnc أنقرة",
      "مركز تشغيل cnc مدمج",
      "ماكينة cnc محلية الصنع",
      "خلية cnc روبوتية",
      "مصنّع ماكينات cnc",
    ],
    jsonLdName: "مراكز تشغيل CNC المدمجة من AOM",
    serviceType: "تصميم مراكز تشغيل CNC المدمجة وتصنيعها وتشغيلها",
    crumbCurrent: "ماكينات CNC",
    eyebrow: "مركز تشغيل CNC · أنقرة",
    h1: "استثمروا في الأداء، لا في الشعار",
    intro:
      "نصمم ونصنّع ونشغّل ماكينات CNC المدمجة في أنقرة. بدلًا من دفع علاوة سعر باهظة لعلامة تجارية، تحصلون على السعة التي يحتاجها عملكم فعلًا ودعم هندسي قريب منكم. يمكن اختيار وحدة التحكم وفق احتياجكم من بين Siemens أو Fanuc أو Mitsubishi Electric، وتركيب الماكينة كجزء من خلية روبوتية.",
    highlights: [
      "خيارات تحكم Siemens أو Fanuc أو Mitsubishi Electric",
      "نظام وصفات AOM القائم على PLC: إنتاج دون الحاجة لمعرفة CNC",
      "خيار خلية تحميل وتفريغ روبوتية",
      "خدمة وقطع غيار مباشرة من أنقرة",
    ],
    heroImageAlt:
      "تصور لماكينة CNC مدمجة من AOM موضّح عليها الأدلة الخطية ومحركات السيرفو AC والمغزل الكهربائي وبرج الإضاءة الدال على الحالة والطاولة ذات القنوات T",
    compareH2: "علامة تجارية مستوردة فاخرة، أم AOM؟",
    compareHeaders: ["", "علامة تجارية مستوردة فاخرة", "AOM"],
    compareRows: [
      { k: "الاستثمار", a: "علاوة العلامة التجارية، تسعير بالعملة الأجنبية", b: "ماكينة مُحجَّمة وفق احتياجكم الفعلي" },
      { k: "الخدمة وقطع الغيار", a: "دور انتظار الخدمة المعتمدة، قطع مستوردة", b: "خدمة مباشرة من أنقرة" },
      { k: "التخصيص", a: "موديلات قياسية من الكتالوج", b: "منطقة العمل والمغزل والتحكم مصممة لكم" },
      { k: "جهة الاتصال", a: "موزّع / وكيل", b: "الفريق الهندسي الذي صمم الماكينة" },
      { k: "تكامل الخط", a: "حزمة إضافية أو طرف ثالث", b: "تحميل روبوتي وأتمتة من جهة واحدة" },
    ],
    tenX: {
      h2: "10 ماكينات AOM بدلًا من ماكينة كبيرة واحدة",
      text: "يمكن إنجاز معظم الأعمال التي تقوم بها الماكينة الكبيرة بماكينات مدمجة. بدلًا من ماكينة كبيرة واحدة، يمكنكم تركيب 10 ماكينات AOM في نفس المساحة ومضاعفة الإنتاج باستثمار أقل بكثير (للإنتاج الذي تتناسب فيه القطع مع منطقة عمل الماكينة المدمجة وتعمل فيه الماكينات بالتوازي).",
      stats: [
        { value: "×10", text: "مغازل على نفس الأرضية — تُشغَّل 10 قطع أو 10 أعمال مختلفة في آن واحد." },
        { value: "+50%", text: "استثمار أقل — بنسبة 50% على الأقل مقارنة بماكينة كبيرة واحدة؛ الرقم الدقيق في عرض السعر." },
        { value: "0 م²", text: "مساحة ورشة إضافية — تنمو السعة دون الانتقال إلى ورشة أكبر وإيجار أعلى." },
      ],
    },
    control: {
      h2: "حتى المشغل غير الملمّ بالماكينة يستطيع الإنتاج",
      text: "نقدم خيارين للتحكم: وحدة تحكم CNC من علامة عالمية، أو نظام وصفات AOM القائم على PLC المصمم وفق قطعكم. في نظام الوصفات، يكون G-code مضمّنًا في النظام؛ ويكتفي المشغل باختيار القطعة وتشغيلها.",
      option1: {
        title: "الخيار 1 · للفرق التي تعرف CNC",
        text: "برمجة وتحرير G-code كاملة، نقل البرامج من برامج CAM، وشبكة الخدمة وقطع الغيار العالمية للعلامة التجارية. خيارات العلامات: Siemens وFanuc وMitsubishi Electric.",
      },
      option2: {
        title: "الخيار 2 · للإنتاج التسلسلي",
        text: "نظام وصفات AOM (PLC): يكون G-code لقطعكم مضمّنًا في النظام، يختار المشغل القطعة ويشغّلها، وتُضاف القطع الجديدة حسب الطلب.",
      },
      recipeImageAlt: "مثال لشاشة نظام وصفات AOM: اختيار من مكتبة القطع، معلومات المادة والتثبيت، زر التشغيل",
      recipeCaption: "شاشة توضيحية؛ تُبنى الواجهة وفق قائمة قطعكم.",
    },
    custom: {
      h2: "ماكينة مخصصة لعملكم، توافق تام مع عملكم",
      text: "إذا كانت لديكم عملية متكررة، بدلًا من تكييفها مع ماكينة عامة الغرض، نصمم الماكينة وفق عمليتكم. تحكم قائم على PLC، تشغيل بالوصفات، وتكامل مع الروبوتات والناقلات والماكينات الأخرى في خطكم — كل ذلك من جهة واحدة.",
    },
    specialPurpose: [
      {
        title: "شحذ أدوات القطع",
        text: "شحذ المثاقب والفريزات الإصبعية والأدوات الخاصة؛ هندسة الأداة مسجلة في الوصفة، والمشغل يختار الأداة فقط.",
      },
      {
        title: "شحذ شفرات المناشير",
        text: "شحذ أوتوماتيكي لأسنان المنشار الدائري؛ يُختار عدد الأسنان والزاوية من الوصفة، والفهرسة أوتوماتيكية.",
      },
      {
        title: "قطاع البلاستيك",
        text: "إزالة الزوائد والقطع والثقب لقطع التشكيل الحراري والحقن؛ تثبيت سريع بطاولة شفط.",
      },
      {
        title: "الألواح الشمسية",
        text: "محطات ثقب وقطع وتشغيل متوافقة مع خطوط إنتاج الألواح والإطارات؛ تصميم متعدد الرؤوس.",
      },
      {
        title: "المركبات والدفاع",
        text: "قطع وتشذيب قطع مركبة من ألياف الكربون والزجاج؛ رأس مائل، شفط غبار وتثبيت مخصص للقطعة.",
      },
    ],
    fixture: {
      h2: "ماكينتكم تنمو مع عملكم",
      text: "نصمم تثبيتات مخصصة لكل قطاع، ونضيف المحور الرابع والخامس للماكينة عند الحاجة. يقل زمن تثبيت القطعة وتُشغَّل أسطح أكثر في تثبيت واحد.",
    },
    fixtureSectors: [
      {
        title: "الصناعات المساندة للسيارات",
        text: "تثبيت متعدد القطع هوائيًا؛ ست قطع في تثبيت واحد، تُدار الملاقط بواسطة PLC.",
      },
      { title: "المجال الطبي", text: "كتلة فكوك متعددة؛ تثبيت تسلسلي بـ12 محطة للزرعات التيتانيوم والدبابيس." },
      { title: "الإلكترونيات", text: "تثبيت بالشفط؛ يثبّت علب الألمنيوم رقيقة الجدار دون ترك أثر شد." },
      { title: "القوالب والعدد", text: "تثبيت نقطة الصفر؛ تُجهَّز المنصة خارج الماكينة وتستقر في نفس الموضع عليها." },
    ],
    robotCell: {
      h2: "الروبوت يحمّل، والماكينة لا تتوقف",
      text: "يقوم روبوت على سكة خطية أمام الماكينات بتحميل القطع الخام وإزالة القطع الجاهزة. لا فرق بين الورديات أو الاستراحات أو الليل؛ تنتج الخلية دون توقف. نختار الروبوت المناسب لخليتكم، من روبوت ديكارتي حتى روبوت صناعي بـ6 محاور؛ وبصفتنا شريك OEM لشركة Yaskawa نوفر ضمان العلامة التجارية، ويمكننا أيضًا توريد روبوت أقل تكلفة إن رغبتم.",
      imageAlt: "مخطط لخلية روبوتية حيث يقوم روبوت بـ6 محاور على سكة خطية بتحميل القطع في عدة ماكينات CNC",
    },
    whoWeWorkedWith: {
      title: "مع من عملنا",
      text: "نعمل مع مؤسسات في الدفاع والطيران والصناعة الثقيلة تتوقع دقة عالية؛ تفاصيل المشاريع مشمولة باتفاقيات السرية.",
      linkText: "مراجعنا الرئيسية في الصفحة الرئيسية",
    },
    faqs: [
      {
        q: "ما الفرق بين شراء علامة تجارية مستوردة فاخرة وماكينة AOM؟",
        a: "بدلًا من علاوة العلامة التجارية والتسعير بالعملة الأجنبية، تحصلون على ماكينة مُحجَّمة وفق احتياجكم الفعلي؛ تُقدَّم الخدمة مباشرة من أنقرة، ويُخصَّص لكم منطقة العمل والمغزل والتحكم، وجهة اتصالكم هي الفريق الهندسي الذي صمم الماكينة، ويتم التحميل الروبوتي وتكامل الأتمتة من جهة واحدة.",
      },
      {
        q: "كيف يتم اختيار وحدة التحكم؟",
        a: "نقدم خيارين: وحدة تحكم من علامة عالمية (Siemens أو Fanuc أو Mitsubishi Electric) ببرمجة G-code كاملة للفرق التي تعرف CNC، أو نظام وصفات AOM القائم على PLC للإنتاج التسلسلي، حيث يكون G-code مضمّنًا في النظام ويكتفي المشغل باختيار القطعة وتشغيلها.",
      },
      {
        q: "هل يمكن دمج روبوت في ماكينة قائمة؟",
        a: "نعم. نختار وندمج الروبوت المناسب لخليتكم، من روبوت ديكارتي حتى روبوت صناعي بـ6 محاور؛ وبصفتنا شريك OEM لشركة Yaskawa نوفر ضمان العلامة التجارية، ويمكننا أيضًا توريد روبوت أقل تكلفة إن رغبتم.",
      },
      {
        q: "هل يمكنكم تصنيع ماكينة لعملية خاصة غير موجودة في الموديلات القياسية؟",
        a: "نعم. إذا كانت لديكم عملية متكررة، بدلًا من تكييفها مع موديل عام الغرض، نصمم الماكينة وفق عمليتكم؛ لدينا أمثلة في شحذ أدوات القطع وشحذ المناشير والبلاستيك والألواح الشمسية وقطاعي المركبات والدفاع — وبالنسبة لعمل غير مدرج في القائمة، يكفي أن تشرحوا عمليتكم.",
      },
    ],
    contact: {
      title: "اطلبوا عرض سعر لمشروع التشغيل بـCNC الخاص بكم",
      text: "أرسلوا لنا منطقة العمل ورسومات القطعة والعدد/زمن الدورة؛ لنحدد معًا خيارات وحدة التحكم ودمج الروبوت.",
      itemName: "مركز تشغيل CNC",
    },
    related: [
      { label: "أنظمة اللحام الروبوتي", href: "/robotik-kaynak" },
      { label: "سلامة المكابس والتغذية الأوتوماتيكية", href: "/pres-guvenligi" },
      { label: "PLC وSCADA وأتمتة الآلات", href: "/plc-scada" },
    ],
  },
};
