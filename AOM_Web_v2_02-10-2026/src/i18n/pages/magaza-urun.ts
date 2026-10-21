// /magaza/[slug] ürün detay sayfasının çok dilli arayüz metinleri (19-10-2026). Türkçe sayfa değişmedi.
// Kapsam (Option A): sayfa çevresi (breadcrumb, "2. el" rozeti ve alan etiketleri, fiyat/KDV notu,
// buton metinleri, bölüm başlıkları) çevrildi. Ürünün KENDİ içeriği — isim (p.name), özet (p.summary),
// özellik tablosu DEĞERLERİ (p.specs), SEO metni (p.seoText), kaynak notu (p.source.label), seri/model
// adları — manifaktürden alınan teknik veridir ve Türkçe kalır; bkz. claude/COK_DILLI_SITE_ASAMA3.
import type { Locale } from "../locales";

type L3 = Record<Locale, string>;

export const USED_BADGE: L3 = { en: "Used item", ru: "Товар б/у", ar: "منتج مستعمل" };

export type UsedFieldLabels = { condition: string; tested: string; warranty: string; stock: string; note: string; qtyUnit: string };
export const USED_FIELD_LABELS: Record<Locale, UsedFieldLabels> = {
  en: { condition: "Condition", tested: "Tested", warranty: "Warranty", stock: "Stock", note: "Note", qtyUnit: "pcs" },
  ru: { condition: "Состояние", tested: "Проверено", warranty: "Гарантия", stock: "В наличии", note: "Примечание", qtyUnit: "шт." },
  ar: { condition: "الحالة", tested: "تم الاختبار", warranty: "الضمان", stock: "المخزون", note: "ملاحظة", qtyUnit: "قطعة" },
};

export type UrunPageUi = {
  requestQuotePrice: string; // "Fiyat için teklif isteyin"
  vatCaption: (pct: number) => string; // "Fiyatlar KDV hariçtir; %{n} KDV eklenir."
  seeOrderCodes: (count: number) => string; // "{n} sipariş kodunu gör"
  allBrandProducts: (brand: string) => string; // "Tüm {brand} ürünleri"
  teklifTitleWithPrice: string; // "Sipariş / teklif isteyin"
  aboutProductHeading: string; // "Ürün hakkında"
  specsHeading: (model: string) => string; // "{model} teknik özellikleri"
  defaultSpecNote: string;
  starNote: string;
  samePhotoNote: string;
  seeManufacturerNote: string;
  repTableHeading: (model: string) => string; // "Örnek model: {model}"
  repTableCaption: string;
  codePageHeading: (model: string) => string; // "{model} sipariş kodları"
  codePageText: (name: string, count: number, discontinued: number) => string;
  codePageButton: (model: string, count: number) => string;
  seriesLabel: (series: string) => string; // "{series} serisi"
  nearbyModels: (total: number) => string;
  otherModels: string;
  colModel: string;
  colAmp: string;
  colBody: string;
  colOption: string;
  colPrice: string;
  priceVatSuffix: string;
  requestQuoteCell: string;
  leadTimeLabel: (leadTime: string) => string; // "Tedarik: {leadTime}"
  eurVatNote: (pct: number) => string; // EUR fiyatlı ürünlerde (ör. Schneider) KDV + faturalama notu
  tryApproxLine: (tryAmount: string, date: string) => string; // "{tryAmount} + VAT (TCMB EUR selling rate, {date})"
};

export const URUN_UI: Record<Locale, UrunPageUi> = {
  en: {
    requestQuotePrice: "Request a quote for pricing",
    vatCaption: (pct) => `Prices exclude VAT; ${pct}% VAT is added.`,
    seeOrderCodes: (count) => `See ${count.toLocaleString("en-US")} order codes`,
    allBrandProducts: (brand) => `All ${brand} products`,
    teklifTitleWithPrice: "Order / request a quote",
    aboutProductHeading: "About this product",
    specsHeading: (model) => `${model} technical specifications`,
    defaultSpecNote: "Technical data is taken from the Autonics product page.",
    starNote: " Values marked * are from the manufacturer catalog.",
    samePhotoNote: " The photo is of a model with the same body.",
    seeManufacturerNote: " See the manufacturer page for current values.",
    repTableHeading: (model) => `Example model: ${model}`,
    repTableCaption: "Manufacturer technical table for one model in the series. Other codes' values vary by resolution, output, and connection option.",
    codePageHeading: (model) => `${model} order codes`,
    codePageText: (name, count, discontinued) =>
      `All ${count.toLocaleString("en-US")} order codes of the ${name} series, with resolution, output, supply and connection details, are listed on the code page${
        discontinued ? `; ${discontinued} are marked discontinued` : ""
      }. You can request a quote for any code listed.`,
    codePageButton: (model, count) => `${model}: ${count.toLocaleString("en-US")} order codes`,
    seriesLabel: (series) => `${series} series`,
    nearbyModels: (total) => `nearby models (all ${total.toLocaleString("en-US")} on the series page)`,
    otherModels: "other models",
    colModel: "Model",
    colAmp: "Current",
    colBody: "Body",
    colOption: "Option",
    colPrice: "Price",
    priceVatSuffix: " + VAT",
    requestQuoteCell: "Request a quote",
    leadTimeLabel: (leadTime) => `Lead time: ${leadTime}`,
    eurVatNote: (pct) => `Prices exclude VAT; ${pct}% VAT is added. Invoicing in EUR, or in TRY at the invoice-date exchange rate.`,
    tryApproxLine: (tryAmount, date) => `${tryAmount} + VAT (TCMB EUR selling rate, ${date})`,
  },
  ru: {
    requestQuotePrice: "Запросите цену",
    vatCaption: (pct) => `Цены без НДС; добавляется НДС ${pct}%.`,
    seeOrderCodes: (count) => `Смотреть ${count.toLocaleString("en-US")} кодов заказа`,
    allBrandProducts: (brand) => `Вся продукция ${brand}`,
    teklifTitleWithPrice: "Заказать / запросить предложение",
    aboutProductHeading: "Об этом товаре",
    specsHeading: (model) => `Технические характеристики ${model}`,
    defaultSpecNote: "Технические данные взяты со страницы товара Autonics.",
    starNote: " Значения, отмеченные *, взяты из каталога производителя.",
    samePhotoNote: " Фото относится к модели с таким же корпусом.",
    seeManufacturerNote: " Актуальные значения см. на странице производителя.",
    repTableHeading: (model) => `Пример модели: ${model}`,
    repTableCaption: "Техническая таблица производителя для одной модели серии. Значения других кодов зависят от разрешения, выхода и варианта подключения.",
    codePageHeading: (model) => `Коды заказа ${model}`,
    codePageText: (name, count, discontinued) =>
      `Все ${count.toLocaleString("en-US")} кодов заказа серии ${name}, с данными о разрешении, выходе, питании и подключении, перечислены на странице кодов${
        discontinued ? `; ${discontinued} отмечены как снятые с производства` : ""
      }. Вы можете запросить предложение по любому коду из списка.`,
    codePageButton: (model, count) => `${model}: ${count.toLocaleString("en-US")} кодов заказа`,
    seriesLabel: (series) => `Серия ${series}`,
    nearbyModels: (total) => `ближайшие модели (все ${total.toLocaleString("en-US")} — на странице серии)`,
    otherModels: "другие модели",
    colModel: "Модель",
    colAmp: "Ток",
    colBody: "Корпус",
    colOption: "Опция",
    colPrice: "Цена",
    priceVatSuffix: " + НДС",
    requestQuoteCell: "Запросить предложение",
    leadTimeLabel: (leadTime) => `Срок поставки: ${leadTime}`,
    eurVatNote: (pct) => `Цены без НДС; добавляется НДС ${pct}%. Счёт в EUR или в TRY по курсу на дату счёта.`,
    tryApproxLine: (tryAmount, date) => `${tryAmount} + НДС (курс продажи EUR ЦБ Турции, ${date})`,
  },
  ar: {
    requestQuotePrice: "اطلب عرض سعر",
    vatCaption: (pct) => `الأسعار غير شاملة الضريبة؛ تُضاف ضريبة ${pct}%.`,
    seeOrderCodes: (count) => `عرض ${count.toLocaleString("en-US")} رمز طلب`,
    allBrandProducts: (brand) => `جميع منتجات ${brand}`,
    teklifTitleWithPrice: "اطلب / اطلب عرض سعر",
    aboutProductHeading: "عن هذا المنتج",
    specsHeading: (model) => `المواصفات الفنية لـ ${model}`,
    defaultSpecNote: "البيانات الفنية مأخوذة من صفحة منتج Autonics.",
    starNote: " القيم المميزة بـ * مأخوذة من كتالوج الشركة المصنعة.",
    samePhotoNote: " الصورة لموديل بنفس الهيكل.",
    seeManufacturerNote: " للقيم الحالية راجع صفحة الشركة المصنعة.",
    repTableHeading: (model) => `موديل مثال: ${model}`,
    repTableCaption: "جدول فني من الشركة المصنعة لأحد موديلات السلسلة. قيم الرموز الأخرى تختلف حسب الدقة والخرج وخيار التوصيل.",
    codePageHeading: (model) => `رموز طلب ${model}`,
    codePageText: (name, count, discontinued) =>
      `جميع رموز الطلب الـ${count.toLocaleString("en-US")} لسلسلة ${name}، مع تفاصيل الدقة والخرج والتغذية والتوصيل، مُدرجة في صفحة الرموز${
        discontinued ? `؛ ${discontinued} منها مُعلَّم كمتوقف عن الإنتاج` : ""
      }. يمكنك طلب عرض سعر لأي رمز مُدرج.`,
    codePageButton: (model, count) => `${model}: ${count.toLocaleString("en-US")} رمز طلب`,
    seriesLabel: (series) => `سلسلة ${series}`,
    nearbyModels: (total) => `موديلات قريبة (جميع الـ${total.toLocaleString("en-US")} في صفحة السلسلة)`,
    otherModels: "موديلات أخرى",
    colModel: "الموديل",
    colAmp: "التيار",
    colBody: "الهيكل",
    colOption: "خيار",
    colPrice: "السعر",
    priceVatSuffix: " + ضريبة",
    requestQuoteCell: "اطلب عرض سعر",
    leadTimeLabel: (leadTime) => `مدة التوريد: ${leadTime}`,
    eurVatNote: (pct) => `الأسعار غير شاملة الضريبة؛ تُضاف ضريبة ${pct}%. الفوترة باليورو أو بالليرة التركية بسعر صرف تاريخ الفاتورة.`,
    tryApproxLine: (tryAmount, date) => `${tryAmount} + ضريبة (سعر بيع اليورو لدى البنك المركزي التركي، ${date})`,
  },
};
