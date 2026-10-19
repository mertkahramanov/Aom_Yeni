// Mağaza kategori/grup adı çevirileri (19-10-2026). Ürün verisindeki (src/data/*) Türkçe
// kategori string'leri burada tek yerden EN/RU/AR'a çevrilir; ürünlerin kendisi (isim, özellik
// tablosu, SEO metni) Mert'in kararıyla şimdilik Türkçe kalıyor (bkz. claude/COK_DILLI_SITE_ASAMA3
// notu). Bu dosya yalnızca NAVİGASYON/BAŞLIK seviyesindeki kategori adlarını çevirir.
//
// Kullanım: translateCategoryTitle(trTitle, locale) — p.category alanındaki tam TR string'i
// alır, eşleşen çeviriyi döner; eşleşme yoksa (yeni bir kategori eklenirse) TR metni olduğu gibi
// döner (sessiz başarısızlık yerine güvenli geri düşüş).
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

// "2. El · " önekinin kendisi (ör. "2. El · Fanlar" -> "Used · Fans")
export const IKINCI_EL_PREFIX_LABEL: L3 = {
  en: "Used",
  ru: "Б/у",
  ar: "مستعمل",
};

// Ana (2. el olmayan) kategori adları — src/data/yedek-parca.ts (CAT_TEXT, 34),
// src/data/kontrol.ts (catTr, 10), src/data/magaza.ts / spr.ts (Tristörlü güç kontrol),
// src/data/ssr.ts, src/data/enkoder.ts, src/data/gefran.ts (CAT), OTHER_CATEGORY.
export const CATEGORY_TITLES: Record<string, L3> = {
  // --- yedek-parca.ts CAT_TEXT (34) ---
  "CNC yedek parçaları": { en: "CNC spare parts", ru: "Запчасти для станков с ЧПУ", ar: "قطع غيار CNC" },
  "Fanlar": { en: "Fans", ru: "Вентиляторы", ar: "مراوح" },
  "Fan telleri ve filtreleri": { en: "Fan guards and filters", ru: "Защитные решётки и фильтры вентиляторов", ar: "شبكات ومرشحات المراوح" },
  "Röleler ve röle soketleri": { en: "Relays and relay sockets", ru: "Реле и колодки реле", ar: "المرحلات (الريلاي) وقواعدها" },
  "Solid state röleler (SSR)": { en: "Solid state relays (SSR)", ru: "Твердотельные реле (SSR)", ar: "المرحلات الحالة الصلبة (SSR)" },
  "Sigortalar ve termostatlar": { en: "Fuses and thermostats", ru: "Предохранители и термостаты", ar: "الصمامات والثرموستات" },
  "Potansiyometreler ve reostalar": { en: "Potentiometers and rheostats", ru: "Потенциометры и реостаты", ar: "مقاومات متغيرة (بوتنشيومتر) وريوستات" },
  "Diyotlar": { en: "Diodes", ru: "Диоды", ar: "الصمامات الثنائية (الدايودات)" },
  "Sviç, sensör ve butonlar": { en: "Switches, sensors and buttons", ru: "Выключатели, датчики и кнопки", ar: "المفاتيح والحساسات والأزرار" },
  "El çarkları (MPG)": { en: "Handwheels (MPG)", ru: "Маховики ручного импульсного генератора (MPG)", ar: "عجلات يدوية (MPG)" },
  "Servo ve iş mili enkoderleri": { en: "Servo and spindle encoders", ru: "Энкодеры сервомоторов и шпинделя", ar: "مشفرات السيرفو والمغزل" },
  "Takım bağlama ve ATC parçaları": { en: "Tool holding and ATC parts", ru: "Детали зажима инструмента и ATC", ar: "قطع تثبيت الأداة ونظام ATC" },
  "Rulmanlar, kilit somunları ve yaylar": { en: "Bearings, lock nuts and springs", ru: "Подшипники, стопорные гайки и пружины", ar: "المحامل (البلي) وصواميل القفل والنوابض" },
  "Ölçme ve kalibrasyon": { en: "Measurement and calibration", ru: "Измерение и калибровка", ar: "القياس والمعايرة" },
  "Veri aktarımı": { en: "Data transfer", ru: "Передача данных", ar: "نقل البيانات" },
  "Makine lambaları": { en: "Machine lamps", ru: "Станочные светильники", ar: "مصابيح الماكينة" },
  "Sarf malzemeleri": { en: "Consumables", ru: "Расходные материалы", ar: "المواد الاستهلاكية" },
  "Güç kaynakları ve trafolar": { en: "Power supplies and transformers", ru: "Блоки питания и трансформаторы", ar: "مزودات الطاقة والمحولات" },
  "Hız kontrol cihazları (AC sürücüler)": { en: "Variable speed drives (AC drives)", ru: "Преобразователи частоты (приводы переменного тока)", ar: "أجهزة التحكم بالسرعة (سائقات التيار المتردد)" },
  "Yumuşak yol vericiler (soft starter)": { en: "Soft starters", ru: "Устройства плавного пуска (софт-стартеры)", ar: "مُشغّلات التشغيل الناعم (سوفت ستارتر)" },
  "Fren üniteleri ve dirençleri": { en: "Brake units and resistors", ru: "Тормозные блоки и резисторы", ar: "وحدات الفرملة ومقاوماتها" },
  "Güvenlik röleleri": { en: "Safety relays", ru: "Реле безопасности", ar: "مرحلات السلامة" },
  "DC motor sürücüler": { en: "DC motor drives", ru: "Приводы двигателей постоянного тока", ar: "سائقات محركات التيار المستمر" },
  "Spindle motorlar": { en: "Spindle motors", ru: "Шпиндельные двигатели", ar: "محركات المغزل" },
  "Step ve servo motorlar, sürücüler": { en: "Step and servo motors, drives", ru: "Шаговые и серводвигатели, приводы", ar: "محركات الخطوة والسيرفو وسائقاتها" },
  "Şalt ürünleri": { en: "Switchgear products", ru: "Коммутационная аппаратура", ar: "منتجات المفاتيح الكهربائية (الشالت)" },
  "Enkoderler": { en: "Encoders", ru: "Энкодеры", ar: "المشفرات (الإنكودر)" },
  "CNC kontrol kartları ve panelleri": { en: "CNC control boards and panels", ru: "Платы и панели управления ЧПУ", ar: "لوحات ووحدات تحكم CNC" },
  "Vakum ve toz emme": { en: "Vacuum and dust extraction", ru: "Вакуум и пылеудаление", ar: "الشفط والتفريغ وإزالة الغبار" },
  "Lineer hareket sistemleri": { en: "Linear motion systems", ru: "Системы линейного перемещения", ar: "أنظمة الحركة الخطية" },
  "Güç aktarma: kasnak, dişli ve redüktör": { en: "Power transmission: pulleys, gears and gearboxes", ru: "Передача мощности: шкивы, шестерни и редукторы", ar: "نقل الحركة: البكرات والتروس والمخفضات" },
  "Torna aynaları, pens ve takım tutucular": { en: "Lathe chucks, collets and tool holders", ru: "Токарные патроны, цанги и держатели инструмента", ar: "ظرف المخرطة والكولت وحوامل الأدوات" },
  "Yağlama sistemleri": { en: "Lubrication systems", ru: "Системы смазки", ar: "أنظمة التشحيم" },
  "Sigma profiller": { en: "Sigma profiles", ru: "Сигма-профили", ar: "بروفايلات سيجما" },

  // --- kontrol.ts catTr (10) ---
  "Sıcaklık kontrol cihazları": { en: "Temperature controllers", ru: "Регуляторы температуры", ar: "أجهزة التحكم بدرجة الحرارة" },
  "Dijital panel metreler": { en: "Digital panel meters", ru: "Цифровые щитовые измерители", ar: "موازين اللوحة الرقمية" },
  "Sayıcılar": { en: "Counters", ru: "Счётчики", ar: "العدّادات" },
  "Zamanlayıcılar": { en: "Timers", ru: "Таймеры", ar: "المؤقتات" },
  "Kayıt cihazları": { en: "Recorders", ru: "Регистраторы", ar: "أجهزة التسجيل" },
  "Göstergeler": { en: "Indicators", ru: "Индикаторы", ar: "أجهزة العرض (المؤشرات)" },
  "Dijital ekran birimleri": { en: "Digital display units", ru: "Цифровые дисплейные блоки", ar: "وحدات العرض الرقمية" },
  "Sensör kontrol cihazları": { en: "Sensor controllers", ru: "Контроллеры датчиков", ar: "أجهزة التحكم بالحساسات" },
  "Grafik paneller (HMI)": { en: "Graphic panels (HMI)", ru: "Графические панели (HMI)", ar: "اللوحات الرسومية (HMI)" },
  "Endüstriyel bilgisayarlar": { en: "Industrial computers", ru: "Промышленные компьютеры", ar: "الحواسيب الصناعية" },

  // --- magaza.ts / spr.ts / ssr.ts / enkoder.ts / gefran.ts ---
  "Tristörlü güç kontrol": { en: "Thyristor power control", ru: "Тиристорное управление мощностью", ar: "التحكم بالطاقة بالثايرستور" },
  "Motor yol vericiler (motor starter)": { en: "Motor starters", ru: "Устройства пуска двигателей (стартеры)", ar: "مشغّلات بدء تشغيل المحركات (موتور ستارتر)" },

  // --- OTHER_CATEGORY ---
  "Diğer ürünler": { en: "Other products", ru: "Прочая продукция", ar: "منتجات أخرى" },
};

// 2. el kategorileri — src/data/ikinci-el.ts (IKINCI_EL_PREFIX + bu adlar, 18 distinct).
// Anahtarlar "2. El · " ÖNEKİ OLMADAN, orijinal (raw) TR kategori adıdır.
export const IKINCI_EL_CATEGORY_TITLES: Record<string, L3> = {
  "Butonlar, anahtarlar ve sinyal lambaları": { en: "Buttons, switches and signal lamps", ru: "Кнопки, переключатели и сигнальные лампы", ar: "الأزرار والمفاتيح ومصابيح الإشارة" },
  "Endüstriyel haberleşme": { en: "Industrial communication", ru: "Промышленная связь", ar: "الاتصالات الصناعية" },
  "Fanlar": { en: "Fans", ru: "Вентиляторы", ar: "مراوح" },
  "Güç aktarma: kasnak ve dişli": { en: "Power transmission: pulleys and gears", ru: "Передача мощности: шкивы и шестерни", ar: "نقل الحركة: البكرات والتروس" },
  "Güç kaynakları ve trafolar": { en: "Power supplies and transformers", ru: "Блоки питания и трансформаторы", ar: "مزودات الطاقة والمحولات" },
  "Hız kontrol cihazları (inverter)": { en: "Variable speed drives (inverters)", ru: "Преобразователи частоты (инверторы)", ar: "أجهزة التحكم بالسرعة (إنفرتر)" },
  "Konveyör ve mekanik parçalar": { en: "Conveyor and mechanical parts", ru: "Конвейерные и механические детали", ar: "قطع الناقل (الكونفيور) والأجزاء الميكانيكية" },
  "Motorlar ve redüktörler": { en: "Motors and gearboxes", ru: "Двигатели и редукторы", ar: "المحركات والمخفضات" },
  "Operatör panelleri, ekranlar ve kontrol cihazları": { en: "Operator panels, displays and controllers", ru: "Операторские панели, экраны и контроллеры", ar: "لوحات المشغل والشاشات وأجهزة التحكم" },
  "PLC ve PLC modülleri": { en: "PLCs and PLC modules", ru: "ПЛК и модули ПЛК", ar: "أجهزة PLC ووحداتها" },
  "Pnömatik ve vakum": { en: "Pneumatics and vacuum", ru: "Пневматика и вакуум", ar: "الأنظمة الهوائية والتفريغ" },
  "Rulmanlar ve lineer hareket": { en: "Bearings and linear motion", ru: "Подшипники и линейное перемещение", ar: "المحامل والحركة الخطية" },
  "Röleler ve röle soketleri": { en: "Relays and relay sockets", ru: "Реле и колодки реле", ar: "المرحلات (الريلاي) وقواعدها" },
  "Sensörler ve enkoderler": { en: "Sensors and encoders", ru: "Датчики и энкодеры", ar: "الحساسات والمشفرات" },
  "Servo motorlar ve sürücüler": { en: "Servo motors and drives", ru: "Сервомоторы и приводы", ar: "محركات السيرفو وسائقاتها" },
  "Sigortalar": { en: "Fuses", ru: "Предохранители", ar: "الصمامات" },
  "Terminal bloklar ve klemensler": { en: "Terminal blocks and connectors", ru: "Клеммные блоки и соединители", ar: "الكتل الطرفية والموصلات" },
  "Şalt ürünleri": { en: "Switchgear products", ru: "Коммутационная аппаратура", ar: "منتجات المفاتيح الكهربائية (الشالت)" },
};

// MAIN_GROUPS üst seviye başlıkları — src/app/magaza/page.tsx içinde sabit tanımlı (9).
// Bazıları yukarıdaki kategori adlarıyla aynı metni paylaşmaz (daha üst/geniş gruplama adıdır),
// bu yüzden ayrı tutulur.
export const MAIN_GROUP_TITLES: Record<string, L3> = {
  "Güç kontrol": { en: "Power control", ru: "Управление мощностью", ar: "التحكم بالطاقة" },
  "Kontrol cihazları": { en: "Control devices", ru: "Устройства управления", ar: "أجهزة التحكم" },
  "Enkoderler": { en: "Encoders", ru: "Энкодеры", ar: "المشفرات (الإنكودر)" },
  "Operatör panelleri ve endüstriyel bilgisayarlar": { en: "Operator panels and industrial computers", ru: "Операторские панели и промышленные компьютеры", ar: "لوحات المشغل والحواسيب الصناعية" },
  "Röleler": { en: "Relays", ru: "Реле", ar: "المرحلات (الريلاي)" },
  "Motor sürücüler ve yol vericiler": { en: "Motor drives and starters", ru: "Приводы двигателей и устройства пуска", ar: "سائقات المحركات ومشغّلات بدء التشغيل" },
  "CNC yedek parça ve elektronik": { en: "CNC spare parts and electronics", ru: "Запчасти и электроника для станков с ЧПУ", ar: "قطع غيار CNC والإلكترونيات" },
  "2. El ürünler": { en: "Used products", ru: "Товары б/у", ar: "منتجات مستعملة" },
  "Diğer": { en: "Other", ru: "Прочее", ar: "أخرى" },
};

/** p.category (ve gerekirse IKINCI_EL_PREFIX'li hali) için çeviri döner; eşleşme yoksa TR metni döner. */
export function translateCategoryTitle(trTitle: string, locale: Locale, ikinciElPrefix = "2. El · "): string {
  if (trTitle.startsWith(ikinciElPrefix)) {
    const rest = trTitle.slice(ikinciElPrefix.length);
    const restT = IKINCI_EL_CATEGORY_TITLES[rest]?.[locale] ?? CATEGORY_TITLES[rest]?.[locale] ?? rest;
    return `${IKINCI_EL_PREFIX_LABEL[locale]} · ${restT}`;
  }
  return CATEGORY_TITLES[trTitle]?.[locale] ?? trTitle;
}

/** MAIN_GROUPS başlığı için çeviri döner; eşleşme yoksa TR metni döner. */
export function translateMainGroupTitle(trTitle: string, locale: Locale): string {
  return MAIN_GROUP_TITLES[trTitle]?.[locale] ?? trTitle;
}
