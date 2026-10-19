// /tristorlu-guc-kontrol sayfasının EN/RU/AR içeriği (19-10-2026). Türkçe sayfa değişmedi.
import type { Locale } from "../locales";

type Pair = { title: string; text: string };
type Row = { label: string; value: string };

export type TristorluGucKontrolContent = {
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
  asteriskNote: string;
  services: Pair[];
  heroImageAlt: string;
  applicationsTitle: string;
  applications: Pair[];
  hmiImageAlt: string;
  hmiCaption: string;
  caseStudy: {
    h2: string;
    intro: string;
    badge: string;
    name: string;
    subtitle: string;
    imageAlt: string;
    imageCaption: string;
    rows: Row[];
  };
  faqs: { q: string; a: string }[];
  contact: { title: string; text: string; itemName: string };
  related: { label: string; href: string }[];
};

export const tristorluGucKontrolContent: Record<Locale, TristorluGucKontrolContent> = {
  en: {
    metaTitle: "Thyristor Power Control Panels | Ankara | AOM",
    metaDescription:
      "Thyristor power control panels for precise power control in thermal processes. Phase-angle and zero-crossing control, RS485 Modbus RTU, up to 600 A per channel. Authorized Gefran reseller.",
    keywords: [
      "thyristor power control panel",
      "thyristor panel",
      "thermal process power control",
      "phase angle control",
      "zero crossing control",
      "gefran thyristor",
    ],
    jsonLdName: "AOM Thyristor Power Control Panels",
    serviceType: "Design, manufacturing and commissioning of thyristor power control panels",
    crumbCurrent: "Thyristor Power Control",
    eyebrow: "Thyristor power control · Ankara",
    h1: "Thyristor power control panels",
    intro:
      "We design and build thyristor power control panels for precise power control in furnaces, heaters and thermal processes. With phase-angle and zero-crossing control, RS485 Modbus RTU communication and current up to 600 A per channel, we size the panel to your process.",
    highlights: [
      "Proportional power up to 600 A per channel",
      "4–10 channels per panel, up to 132 channels from a single unit",
      "Phase-angle and zero-crossing cycle control, RMS feedback",
      "Monitoring and adjustment from PLC/SCADA via RS485 Modbus RTU",
      "At least 40%+ energy savings measured in AOM projects*",
    ],
    asteriskNote:
      "* The lowest savings measured in AOM projects is 40%; the exact figure varies by process, heater type and existing control method.",
    services: [
      {
        title: "Thyristor power control panel design and manufacturing",
        text: "Proportional power up to 600 A per channel; 4–10 channels per panel, up to 132 channels total from a single unit. Thyristor protection with semiconductor fuses, fan cooling, digital display.",
      },
      {
        title: "Choosing the control method",
        text: "Phase-angle control for heaters with low thermal mass and sudden current draw; zero-crossing cycle control for lower harmonics/EMI in high-thermal-mass furnaces and molds.",
      },
      {
        title: "Closed-loop PID integration",
        text: "Closed loop with a thermocouple/PT100 temperature sensor, a PID controller or PLC, and the thyristor unit's RMS feedback: deviations are corrected instantly and the setpoint is held.",
      },
      {
        title: "PLC/SCADA integration",
        text: "Current, voltage and power of every channel are read into a PLC or SCADA via RS485 Modbus RTU; consumption is monitored per line.",
      },
      {
        title: "Converting existing systems to thyristor control",
        text: "We convert contactor on/off control or electric hot-oil heating systems to be driven by an AOM thyristor panel; temperature is more stable and heating elements last longer.",
      },
    ],
    heroImageAlt:
      "Render of an AOM thyristor power control panel labeled with main switch, thyristor power unit, digital display, fan cooling and terminal block",
    applicationsTitle: "Application areas",
    applications: [
      { title: "Plastics & extrusion", text: "Barrel and die heating zones." },
      { title: "Heat treatment furnaces", text: "Tempering, annealing, hardening." },
      { title: "Drying & baking", text: "Paint, powder coat and food ovens." },
      { title: "Glass & ceramics", text: "Forming and annealing furnaces." },
      { title: "Infrared heating", text: "Thermoforming, drying tunnels." },
      { title: "Composite curing", text: "Autoclave heating control (see the Baykar reference project below)." },
    ],
    hmiImageAlt: "Operator interface example showing the temperature, output power and current of an 8-channel thyristor panel on a single screen",
    hmiCaption: "Example screen; the interface is adapted to the project.",
    caseStudy: {
      h2: "Working in the field, not just on paper",
      intro:
        "The thyristor power control panels AOM designs and manufactures are in service in one of the defense industry's most demanding thermal processes: curing composite parts in an autoclave.",
      badge: "Reference project",
      name: "Baykar",
      subtitle: "Composite autoclave heating control",
      imageAlt: "Field photo of an AOM thyristor power control panel installed at a Baykar facility",
      imageCaption: "AOM thyristor power control panel, field photo.",
      rows: [
        { label: "Application", value: "Composite part curing autoclave" },
        { label: "Number of channels", value: "8 channels" },
        { label: "Total load", value: "380 V · 1600 A" },
        { label: "Max. temperature", value: "1000 °C" },
        { label: "Scope", value: "Panel design, manufacturing, commissioning" },
      ],
    },
    faqs: [
      {
        q: "What does thyristor control gain over contactor control?",
        a: "With contactor on/off control the heater runs at full power, overshoots the setpoint, switches off and waits to cool; thyristor control adjusts power continuously and proportionally between 0–100%. The lowest energy saving measured in AOM projects is 40%; the exact figure depends on the process, heater type and existing control method. There's also no wearing contact, so maintenance cost is lower.",
      },
      {
        q: "Should I choose phase-angle or zero-crossing control?",
        a: "Phase-angle control suits heaters with low thermal mass and sudden current draw (e.g. infrared lamps); zero-crossing cycle control, which reflects lower harmonics and EMI to the grid, suits high-thermal-mass furnaces and molds. We make the final choice together based on your process.",
      },
      {
        q: "Can you convert my existing panel to thyristor control?",
        a: "Yes. We convert your contactor on/off panel or electric hot-oil heating system to be driven by an AOM thyristor panel.",
      },
      {
        q: "Can I integrate it with my PLC or SCADA system?",
        a: "Yes. Our panels communicate via RS485 Modbus RTU; you can read the current, voltage and power of each channel from your PLC or SCADA.",
      },
      {
        q: "Do you also sell Gefran thyristor products?",
        a: "Yes, AOM is a point of sale and technical support provider for Gefran's thyristor power control product line. You can browse the products in the Gefran power control category in our store.",
      },
    ],
    contact: {
      title: "Tell us about your process, let's size your panel together",
      text: "Reach us with load type, number of channels, voltage/current and target temperature.",
      itemName: "Thyristor power control panel",
    },
    related: [
      { label: "Store · Thyristor power control (Gefran)", href: "/magaza/kategori/tristorlu-guc-kontrol" },
      { label: "Store · Gefran", href: "/magaza/marka/gefran" },
      { label: "PLC, SCADA and machine automation", href: "/plc-scada" },
    ],
  },
  ru: {
    metaTitle: "Тиристорные панели управления мощностью | Анкара | AOM",
    metaDescription:
      "Тиристорные панели управления мощностью для точного регулирования мощности в тепловых процессах. Управление по фазовому углу и переходу через ноль, RS485 Modbus RTU, до 600 А на канал. Официальная продажа Gefran.",
    keywords: [
      "тиристорная панель управления мощностью",
      "тиристорный шкаф",
      "управление мощностью теплового процесса",
      "фазовое управление",
      "управление переходом через ноль",
      "тиристор gefran",
    ],
    jsonLdName: "Тиристорные панели управления мощностью AOM",
    serviceType: "Проектирование, изготовление и ввод в эксплуатацию тиристорных панелей управления мощностью",
    crumbCurrent: "Тиристорное управление мощностью",
    eyebrow: "Тиристорное управление мощностью · Анкара",
    h1: "Тиристорные панели управления мощностью",
    intro:
      "Мы проектируем и изготавливаем тиристорные панели управления мощностью для точного регулирования мощности в печах, нагревателях и тепловых процессах. С управлением по фазовому углу и переходу через ноль, связью RS485 Modbus RTU и током до 600 А на канал мы подбираем размер панели под ваш процесс.",
    highlights: [
      "Пропорциональная мощность до 600 А на канал",
      "4–10 каналов на панель, до 132 каналов от одного блока",
      "Управление по фазовому углу и циклами перехода через ноль, обратная связь по RMS",
      "Мониторинг и настройка с ПЛК/SCADA через RS485 Modbus RTU",
      "Минимум 40%+ измеренной экономии энергии в проектах AOM*",
    ],
    asteriskNote:
      "* Минимальная экономия, измеренная в проектах AOM, составляет 40%; точная величина зависит от процесса, типа нагревателя и существующего способа управления.",
    services: [
      {
        title: "Проектирование и изготовление тиристорных панелей управления мощностью",
        text: "Пропорциональная мощность до 600 А на канал; 4–10 каналов на панель, до 132 каналов в сумме от одного блока. Защита тиристоров полупроводниковыми предохранителями, вентиляторное охлаждение, цифровой индикатор.",
      },
      {
        title: "Выбор метода управления",
        text: "Фазовое управление для нагревателей с низкой тепловой массой и резким потреблением тока; управление циклами перехода через ноль для более низких гармоник/EMI в печах и формах с высокой тепловой массой.",
      },
      {
        title: "Интеграция замкнутого контура PID",
        text: "Замкнутый контур с датчиком температуры термопара/PT100, ПИД-регулятором или ПЛК и обратной связью по RMS тиристорного блока: отклонения корректируются мгновенно, уставка удерживается.",
      },
      {
        title: "Интеграция с ПЛК/SCADA",
        text: "Ток, напряжение и мощность каждого канала считываются в ПЛК или SCADA через RS485 Modbus RTU; потребление отслеживается по линии.",
      },
      {
        title: "Перевод существующих систем на тиристорное управление",
        text: "Мы переводим контакторное управление вкл/выкл или электрическую систему нагрева горячим маслом на управление тиристорной панелью AOM; температура становится стабильнее, а нагревательные элементы служат дольше.",
      },
    ],
    heroImageAlt:
      "Рендер тиристорной панели управления мощностью AOM с подписанными главным выключателем, тиристорным силовым блоком, цифровым индикатором, вентиляторным охлаждением и клеммным блоком",
    applicationsTitle: "Области применения",
    applications: [
      { title: "Пластик и экструзия", text: "Зоны нагрева цилиндра и формы." },
      { title: "Печи термообработки", text: "Отпуск, отжиг, закалка." },
      { title: "Сушка и выпечка", text: "Печи для краски, порошкового покрытия и пищевой продукции." },
      { title: "Стекло и керамика", text: "Печи формования и отжига." },
      { title: "Инфракрасный нагрев", text: "Термоформование, сушильные туннели." },
      { title: "Отверждение композитов", text: "Управление нагревом автоклава (см. референс-проект Baykar ниже)." },
    ],
    hmiImageAlt: "Пример интерфейса оператора, показывающего температуру, выходную мощность и ток 8-канальной тиристорной панели на одном экране",
    hmiCaption: "Пример экрана; интерфейс адаптируется под проект.",
    caseStudy: {
      h2: "Работает не на бумаге, а на производстве",
      intro:
        "Тиристорные панели управления мощностью, спроектированные и изготовленные AOM, работают в одном из самых требовательных тепловых процессов оборонной промышленности — отверждении композитных деталей в автоклаве.",
      badge: "Референс-проект",
      name: "Baykar",
      subtitle: "Управление нагревом композитного автоклава",
      imageAlt: "Фото с объекта тиристорной панели управления мощностью AOM, установленной на предприятии Baykar",
      imageCaption: "Тиристорная панель управления мощностью AOM, фото с объекта.",
      rows: [
        { label: "Применение", value: "Отверждение композитных деталей в автоклаве" },
        { label: "Количество каналов", value: "8 каналов" },
        { label: "Общая нагрузка", value: "380 В · 1600 А" },
        { label: "Макс. температура", value: "1000 °C" },
        { label: "Объём работ", value: "Проектирование панели, изготовление, ввод в эксплуатацию" },
      ],
    },
    faqs: [
      {
        q: "Что даёт тиристорное управление по сравнению с контакторным?",
        a: "При контакторном управлении вкл/выкл нагреватель работает на полной мощности, превышает уставку, отключается и ждёт охлаждения; тиристорное управление непрерывно и пропорционально регулирует мощность в диапазоне 0–100%. Минимальная экономия энергии, измеренная в проектах AOM, составляет 40%; точная величина зависит от процесса, типа нагревателя и существующего метода управления. Кроме того, нет изнашивающегося контакта, поэтому затраты на обслуживание ниже.",
      },
      {
        q: "Что выбрать — фазовое управление или управление переходом через ноль?",
        a: "Фазовое управление подходит для нагревателей с низкой тепловой массой и резким потреблением тока (например, инфракрасных ламп); управление циклами перехода через ноль, дающее меньше гармоник и EMI в сеть, подходит для печей и форм с высокой тепловой массой. Окончательный выбор мы делаем вместе, исходя из вашего процесса.",
      },
      {
        q: "Можете ли вы перевести мою существующую панель на тиристорное управление?",
        a: "Да. Мы переводим вашу контакторную панель вкл/выкл или электрическую систему нагрева горячим маслом на управление тиристорной панелью AOM.",
      },
      {
        q: "Можно ли интегрировать её с моей системой ПЛК или SCADA?",
        a: "Да. Наши панели связываются через RS485 Modbus RTU; вы можете считывать ток, напряжение и мощность каждого канала с вашего ПЛК или SCADA.",
      },
      {
        q: "Продаёте ли вы также тиристорную продукцию Gefran?",
        a: "Да, AOM является точкой продаж и поставщиком технической поддержки для линейки тиристорных изделий управления мощностью Gefran. Продукцию можно посмотреть в категории силового управления Gefran в нашем магазине.",
      },
    ],
    contact: {
      title: "Расскажите о вашем процессе, вместе подберём размер панели",
      text: "Свяжитесь с нами, указав тип нагрузки, число каналов, напряжение/ток и целевую температуру.",
      itemName: "Тиристорная панель управления мощностью",
    },
    related: [
      { label: "Магазин · Тиристорное управление мощностью (Gefran)", href: "/magaza/kategori/tristorlu-guc-kontrol" },
      { label: "Магазин · Gefran", href: "/magaza/marka/gefran" },
      { label: "ПЛК, SCADA и автоматизация машин", href: "/plc-scada" },
    ],
  },
  ar: {
    metaTitle: "لوحات التحكم بالطاقة الثايرستورية | أنقرة | AOM",
    metaDescription:
      "لوحات تحكم بالطاقة ثايرستورية للتحكم الدقيق بالطاقة في العمليات الحرارية. تحكم بزاوية الطور وعبور الصفر، RS485 Modbus RTU، حتى 600 أمبير لكل قناة. بيع معتمد لـGefran.",
    keywords: [
      "لوحة تحكم طاقة ثايرستورية",
      "لوحة ثايرستور",
      "التحكم بالطاقة للعملية الحرارية",
      "التحكم بزاوية الطور",
      "التحكم بعبور الصفر",
      "ثايرستور غيفران",
    ],
    jsonLdName: "لوحات التحكم بالطاقة الثايرستورية من AOM",
    serviceType: "تصميم لوحات التحكم بالطاقة الثايرستورية وتصنيعها وتشغيلها",
    crumbCurrent: "التحكم بالطاقة الثايرستوري",
    eyebrow: "التحكم بالطاقة الثايرستوري · أنقرة",
    h1: "لوحات التحكم بالطاقة الثايرستورية",
    intro:
      "نصمم ونصنّع لوحات تحكم بالطاقة ثايرستورية للتحكم الدقيق بالطاقة في الأفران والسخانات والعمليات الحرارية. بتحكم بزاوية الطور وعبور الصفر، واتصال RS485 Modbus RTU، وتيار يصل حتى 600 أمبير لكل قناة، نُحجِّم اللوحة وفق عمليتكم.",
    highlights: [
      "طاقة تناسبية تصل حتى 600 أمبير لكل قناة",
      "4–10 قنوات لكل لوحة، حتى 132 قناة من وحدة واحدة",
      "تحكم بزاوية الطور وتحكم دوري بعبور الصفر، وتغذية راجعة RMS",
      "مراقبة وضبط من PLC/SCADA عبر RS485 Modbus RTU",
      "توفير طاقة لا يقل عن 40%+ مقاس في مشاريع AOM*",
    ],
    asteriskNote: "* أدنى توفير مقاس في مشاريع AOM هو 40%؛ تختلف النسبة الدقيقة حسب العملية ونوع السخان وطريقة التحكم الحالية.",
    services: [
      {
        title: "تصميم لوحات التحكم بالطاقة الثايرستورية وتصنيعها",
        text: "طاقة تناسبية تصل حتى 600 أمبير لكل قناة؛ 4–10 قنوات لكل لوحة، حتى 132 قناة إجمالًا من وحدة واحدة. حماية الثايرستور بمصاهر أشباه الموصلات، تبريد بمروحة، شاشة رقمية.",
      },
      {
        title: "اختيار طريقة التحكم",
        text: "التحكم بزاوية الطور للسخانات ذات الكتلة الحرارية المنخفضة والاستهلاك المفاجئ للتيار؛ التحكم الدوري بعبور الصفر لتقليل التوافقيات/التداخل الكهرومغناطيسي في الأفران والقوالب ذات الكتلة الحرارية العالية.",
      },
      {
        title: "دمج PID بحلقة مغلقة",
        text: "حلقة مغلقة بحساس حرارة من نوع ثرموكابل/PT100، ومتحكم PID أو PLC، وتغذية راجعة RMS من وحدة الثايرستور: يتم تصحيح الانحراف فورًا والحفاظ على القيمة المستهدفة.",
      },
      {
        title: "دمج PLC/SCADA",
        text: "تُقرأ قيم التيار والجهد والطاقة لكل قناة إلى PLC أو SCADA عبر RS485 Modbus RTU؛ تُراقب الاستهلاكات حسب الخط.",
      },
      {
        title: "تحويل الأنظمة القائمة إلى التحكم الثايرستوري",
        text: "نحوّل التحكم التلامسي (تشغيل/إيقاف) أو نظام التسخين بالزيت الساخن الكهربائي ليُدار بلوحة ثايرستور من AOM؛ تصبح درجة الحرارة أكثر استقرارًا وتطول عمر عناصر التسخين.",
      },
    ],
    heroImageAlt:
      "تصور للوحة تحكم بالطاقة ثايرستورية من AOM موضّح عليها المفتاح الرئيسي ووحدة الطاقة الثايرستورية والشاشة الرقمية والتبريد بالمروحة وكتلة الأطراف",
    applicationsTitle: "مجالات التطبيق",
    applications: [
      { title: "البلاستيك والبثق", text: "مناطق تسخين الأسطوانة والقالب." },
      { title: "أفران المعالجة الحرارية", text: "التطرية، التلدين، التصليد." },
      { title: "التجفيف والخبز", text: "أفران الدهان والطلاء المسحوقي والغذاء." },
      { title: "الزجاج والسيراميك", text: "أفران التشكيل والتلدين." },
      { title: "التسخين بالأشعة تحت الحمراء", text: "التشكيل الحراري، أنفاق التجفيف." },
      { title: "معالجة المركبات", text: "التحكم بتسخين الأوتوكلاف (انظر مشروع Baykar المرجعي أدناه)." },
    ],
    hmiImageAlt: "مثال لواجهة المشغل يعرض درجة الحرارة والطاقة الخارجة والتيار للوحة ثايرستور ذات 8 قنوات على شاشة واحدة",
    hmiCaption: "شاشة توضيحية؛ تُكيَّف الواجهة وفق المشروع.",
    caseStudy: {
      h2: "يعمل في الميدان، لا على الورق",
      intro:
        "لوحات التحكم بالطاقة الثايرستورية التي صممتها AOM وصنعتها تعمل في واحدة من أكثر العمليات الحرارية دقة في الصناعة الدفاعية: معالجة القطع المركبة في الأوتوكلاف.",
      badge: "مشروع مرجعي",
      name: "Baykar",
      subtitle: "التحكم بتسخين أوتوكلاف المركبات",
      imageAlt: "صورة ميدانية للوحة تحكم بالطاقة ثايرستورية من AOM مُركَّبة في منشأة Baykar",
      imageCaption: "لوحة تحكم بالطاقة ثايرستورية من AOM، صورة ميدانية.",
      rows: [
        { label: "التطبيق", value: "أوتوكلاف معالجة القطع المركبة" },
        { label: "عدد القنوات", value: "8 قنوات" },
        { label: "الحمل الإجمالي", value: "380 فولت · 1600 أمبير" },
        { label: "أقصى درجة حرارة", value: "1000 °م" },
        { label: "النطاق", value: "تصميم اللوحة، التصنيع، التشغيل" },
      ],
    },
    faqs: [
      {
        q: "ما الذي يضيفه التحكم الثايرستوري مقارنة بالتحكم التلامسي؟",
        a: "في التحكم التلامسي تشغيل/إيقاف، يعمل السخان بكامل طاقته ويتجاوز القيمة المستهدفة ثم يُطفأ وينتظر التبريد؛ أما التحكم الثايرستوري فيضبط الطاقة باستمرار وبشكل تناسبي بين 0–100%. أدنى توفير للطاقة مُقاس في مشاريع AOM هو 40%؛ وتختلف النسبة الدقيقة حسب العملية ونوع السخان وطريقة التحكم الحالية. كما لا توجد ملامسات تتآكل، فتنخفض تكلفة الصيانة.",
      },
      {
        q: "هل أختار التحكم بزاوية الطور أم التحكم بعبور الصفر؟",
        a: "التحكم بزاوية الطور مناسب للسخانات ذات الكتلة الحرارية المنخفضة والاستهلاك المفاجئ للتيار (مثل المصابيح تحت الحمراء)؛ أما التحكم الدوري بعبور الصفر، الذي يعكس توافقيات وتداخلًا كهرومغناطيسيًا أقل على الشبكة، فيناسب الأفران والقوالب ذات الكتلة الحرارية العالية. نحدد الاختيار النهائي معًا وفق عمليتكم.",
      },
      {
        q: "هل يمكنكم تحويل لوحتي القائمة إلى التحكم الثايرستوري؟",
        a: "نعم. نحوّل لوحتكم التلامسية (تشغيل/إيقاف) أو نظام التسخين بالزيت الساخن الكهربائي ليُدار بلوحة ثايرستور من AOM.",
      },
      {
        q: "هل يمكنني دمجها مع نظام PLC أو SCADA الخاص بي؟",
        a: "نعم. تتواصل لوحاتنا عبر RS485 Modbus RTU؛ يمكنكم قراءة التيار والجهد والطاقة لكل قناة من PLC أو SCADA الخاص بكم.",
      },
      {
        q: "هل تبيعون أيضًا منتجات Gefran الثايرستورية؟",
        a: "نعم، AOM هي نقطة بيع ومزود دعم فني لمجموعة منتجات التحكم بالطاقة الثايرستورية من Gefran. يمكنكم استعراض المنتجات ضمن فئة التحكم بالطاقة من Gefran في متجرنا.",
      },
    ],
    contact: {
      title: "اشرحوا لنا عمليتكم، ولنحدد معًا حجم لوحتكم",
      text: "تواصلوا معنا بنوع الحمل، عدد القنوات، الجهد/التيار، ودرجة الحرارة المستهدفة.",
      itemName: "لوحة تحكم بالطاقة ثايرستورية",
    },
    related: [
      { label: "المتجر · التحكم بالطاقة الثايرستوري (Gefran)", href: "/magaza/kategori/tristorlu-guc-kontrol" },
      { label: "المتجر · Gefran", href: "/magaza/marka/gefran" },
      { label: "PLC وSCADA وأتمتة الآلات", href: "/plc-scada" },
    ],
  },
};
