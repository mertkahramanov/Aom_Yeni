// VIPA (Yaskawa) PLC/IO kontrol sistemleri — Faz 4 (20-10-2026). Kaynak: Web Sitesi projesi,
// urun-verisi/yaskawa-control-systems-findings_18-10-2026.md (Micro PLC'nin 12 modeli) ve
// yaskawa.com.tr SLIO / 300S+ seri sayfalarının canlı /___products AJAX ızgarası (Claude'un dahili
// tarayıcısıyla okundu, 20-10-2026). Toplam 212 model/varyant: Micro PLC 12, SLIO 117, 300S+ 83
// (hedefle birebir örtüşüyor).
//
// ÖNEMLİ MARKA NOTU: Micro PLC, SLIO ve 300S+ serileri VIPA markalıdır; Yaskawa bu markayı satın
// almıştır. Bu ürünler "Yaskawa" diye tek başına satılmaz — her üründe marka "VIPA (Yaskawa'nın
// satın aldığı marka)" olarak belirtilir. AOM'un Yaskawa'nın yetkili satıcısı/distribütörü olduğu
// iddia edilmez (doğrulanmamıştır); metinler AOM'un kendi tedarik ve entegrasyon hizmetine dayanır.
//
// Sipariş kodu yapısı: Micro PLC, SLIO ve 300S+'ta Autonics'teki gibi parametrik bir kod formülü
// yoktur — her model zaten kendi ayrık sipariş koduna (ör. "021-1BH00") sahiptir. Bu yüzden kod
// sayfalarında "Durum" (üretimden kalktı) sütunu yoktur; Yaskawa'nın sitesi böyle bir işaret vermez.
// Fiyat yok: "Teklif isteyin".
import type { Product } from "./magaza";
import raw from "./yaskawa-kontrol-plc_20-10-2026.json";

export type PlcGroup = {
  key: string;
  slug: string;
  title: string;
  note: string;
  group: [string, string, number];
  cols: string[];
  codes: (string | number)[][]; // [sipariş kodu, üretimden kalktı (her zaman 0), model adı, teknik özet]
  specs: { label: string; value: string }[];
  rep: { model: string | null; rows: [string, string][] };
  img: string | null;
  imgSize: [number, number] | null;
};

export const KN_PLC_SERIES = (raw as unknown as { groups: PlcGroup[] }).groups;
// KN_PLC_TOTAL: yalnızca kod sayfası olan SLIO + 300S+ modelleri (117 + 83 = 200). Micro PLC'nin 12
// modeli doğrudan ürün olarak listelenir, kod sayfası gerekmez (ayrı bir "Micro PLC" sayısı olarak
// MICRO_PLC_TOTAL'de tutulur; ikisinin toplamı 212 eder).
export const KN_PLC_TOTAL = KN_PLC_SERIES.reduce((n, g) => n + g.codes.length, 0);
export const plcGroup = (slug: string) => KN_PLC_SERIES.find((g) => g.slug === slug);

export const KN_PLC_GROUPS = (() => {
  const m = new Map<string, { id: string; title: string; order: number; series: PlcGroup[] }>();
  for (const g of KN_PLC_SERIES) {
    const [id, title, order] = g.group;
    if (!m.has(id)) m.set(id, { id, title, order, series: [] });
    m.get(id)!.series.push(g);
  }
  return [...m.values()].sort((a, b) => a.order - b.order);
})();

const VIPA_BRAND = "VIPA (Yaskawa)";
const VIPA_MARKA_NOTU =
  "VIPA, Yaskawa'nın satın aldığı bir kontrol sistemleri markasıdır; Micro PLC, SLIO ve 300S+ serileri SPEED7 tabanlı VIPA PLC/IO sistemleridir ve bu üründe \"VIPA (Yaskawa)\" olarak belirtilir.";
const SPEC_NOTE =
  "Teknik veriler Yaskawa Türkiye'nin resmi ürün sayfasından (yaskawa.com.tr) alınmıştır. Sipariş kodu üreticinin sitesinde yayınlanmamaktadır (yalnız model/parça numarası gösterilir); güncel teslim süresi ve fiyat için teklif isteyin.";

const CATEGORY_PLC = "Kontrol Sistemleri (PLC)";

// ---- Micro PLC: 12 model, doğrudan ürün olarak (kod sayfasına gerek yok) ----
// Kaynak: urun-verisi/yaskawa-control-systems-findings_18-10-2026.md (tam liste orada zaten var).
type MicroModel = { raw: string; type: string; specs: string; url: string; order: number };

const MICRO_MODELS: MicroModel[] = [
  {
    raw: "CPU M13C - M13-CCF0001",
    type: "CPU",
    specs: "SPEED7 · 64...128KB · PROFINET · DI 16xDC 24V, DO 12xDC 24V 0.5A, AI 2x12Bit U/I",
    url: "https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/productdetail/product/cpu-m13c---m13-ccf0001_964",
    order: 10,
  },
  {
    raw: "PS M07 - Power Supply - M07-2BA00",
    type: "Güç Kaynağı",
    specs: "Input AC 120-240V · Output DC 24V 1.5A",
    url: "https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/productdetail/product/ps-m07---power-supply---m07-2ba00_6803",
    order: 20,
  },
  {
    raw: "SM M21 - Digital Input - M21-1BH00",
    type: "Signal Modules Digital",
    specs: "DI 16xDC 24V",
    url: "https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/productdetail/product/sm-m21---digital-input---m21-1bh00_13687",
    order: 30,
  },
  {
    raw: "SM M22 - Digital Output - M22-1BH00",
    type: "Signal Modules Digital",
    specs: "DO 16xDC 24V 0.5A",
    url: "https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/productdetail/product/sm-m22---digital-output---m22-1bh00_6698",
    order: 40,
  },
  {
    raw: "SM M22 - Digital Output - M22-1HF10",
    type: "Signal Modules Digital",
    specs: "DO 8xRelay",
    url: "https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/productdetail/product/sm-m22---digital-output---m22-1hf10_6820",
    order: 50,
  },
  {
    raw: "SM M23 - Digital In-/Output - M23-1BH00",
    type: "Signal Modules Digital",
    specs: "DI 8xDC 24V · DO 8xDC 24V 0.5A",
    url: "https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/productdetail/product/sm-m23---digital-in--output---m23-1bh00_13688",
    order: 60,
  },
  {
    raw: "SM M31 - Analog Input - M31-1CD50",
    type: "Signal Modules Analog",
    specs: "AI 4x16Bit U, I, RTD, TC",
    url: "https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/productdetail/product/sm-m31---analog-input---m31-1cd50_13685",
    order: 70,
  },
  {
    raw: "SM M32 - Analog Output - M32-1BD70",
    type: "Signal Modules Analog",
    specs: "AO 4x12Bit U",
    url: "https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/productdetail/product/sm-m32---analog-output---m32-1bd70_6798",
    order: 80,
  },
  {
    raw: "SM M32 - Analog Output - M32-1BD40",
    type: "Signal Modules Analog",
    specs: "AO 4x12Bit 0/4...20mA",
    url: "https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/productdetail/product/sm-m32---analog-output---m32-1bd40_6821",
    order: 90,
  },
  {
    raw: "MICRO Extension - M09-0CB00",
    type: "Extension",
    specs: "RS422/RS485 · RS485",
    url: "https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/productdetail/product/micro-extension---m09-0cb00_6802",
    order: 100,
  },
  {
    raw: "VIPASetCard (VSC)",
    type: "Accessories",
    specs: "64KB · PROFIBUS slave",
    url: "https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/productdetail/product/vipasetcard-vsc-_14271",
    order: 110,
  },
  {
    raw: "VIPA SD-Card (VSD)",
    type: "Accessories",
    specs: "Belirtilmemiş",
    url: "https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/productdetail/product/vipa-sd-card-vsd-_14269",
    order: 120,
  },
];

function parseModel(raw: string): { name: string; code: string } {
  const parts = raw.split(" - ").map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const code = parts[parts.length - 1];
    const name = parts.slice(0, -1).join(" - ");
    if (/\d/.test(code) && code.length <= 24) return { name, code };
  }
  return { name: raw, code: raw };
}

const slugifyCode = (s: string) => s.toLocaleLowerCase("tr-TR").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const MICRO_IMG = { src: "/magaza/yaskawa-kontrol-micro-plc_20-10-2026.png", w: 480, h: 532 };

const microPlcProducts: Product[] = MICRO_MODELS.map((m): Product => {
  const { name, code } = parseModel(m.raw);
  const specsList = m.specs === "Belirtilmemiş" ? [] : m.specs.split(" · ");
  return {
    slug: `vipa-micro-plc-${slugifyCode(code)}`,
    brand: VIPA_BRAND,
    model: m.raw,
    name: `VIPA Micro PLC ${m.type.toLocaleLowerCase("tr-TR")}: ${name}`,
    category: CATEGORY_PLC,
    summary: `VIPA Micro PLC serisinde ${m.type.toLocaleLowerCase("tr-TR")} tipinde ${name} (${code}) modülü. ${m.specs === "Belirtilmemiş" ? "Teknik özet Yaskawa sitesinde belirtilmemiş." : m.specs.replace(/ · /g, ", ") + "."}`,
    image: { src: MICRO_IMG.src, alt: "VIPA Micro PLC serisi (temsili görsel, CPU M13C)" },
    imageNote: "Görsel, Micro PLC serisinin CPU modelinin (M13C) temsili görselidir; seri içindeki diğer modüller farklı gövdelerde olabilir.",
    specs: [
      { label: "Marka", value: VIPA_BRAND },
      { label: "Seri", value: "VIPA Micro PLC" },
      { label: "Tip", value: m.type },
      { label: "Sipariş kodu / parça no", value: code },
      ...(specsList.length ? [{ label: "Teknik özet", value: m.specs }] : [{ label: "Teknik özet", value: "Belirtilmemiş" }]),
    ],
    source: { label: "Yaskawa ürün sayfası", url: m.url },
    specNote: `${SPEC_NOTE} ${VIPA_MARKA_NOTU}`,
    series: "VIPA Micro PLC",
    current: m.order,
    groupOrder: 5,
    kindLabel: "Kontrol Sistemi (PLC)",
    seriesIntro:
      "VIPA Micro PLC, SPEED7 tabanlı CPU, güç kaynağı, dijital/analog sinyal modülleri ve genişleme ünitesinden oluşan kompakt bir PLC sistemidir. VIPA, Yaskawa'nın satın aldığı bir kontrol sistemleri markasıdır.",
    seoText: [
      `VIPA Micro PLC ${name} (${code}), ${m.type.toLocaleLowerCase("tr-TR")} tipinde bir modüldür. ${m.specs === "Belirtilmemiş" ? "" : m.specs.replace(/ · /g, ", ") + "."} VIPA, Yaskawa'nın satın aldığı bir kontrol sistemleri markasıdır; bu ürün Yaskawa diye değil, VIPA (Yaskawa) markasıyla satılır.`,
      `AOM, PLC seçimi, pano entegrasyonu ve devreye alma projelerinde VIPA Micro PLC modüllerinin tedarikini sağlar. Fiyat ve teslim süresi için teklif isteyin; Ankara'dan Türkiye'nin her şehrine gönderim yapılır.`,
    ],
    keywords: [code, m.raw, "VIPA Micro PLC", "VIPA PLC", "Yaskawa VIPA PLC", m.type, "SPEED7 PLC", "VIPA PLC fiyat"],
    seoTitle: `VIPA Micro PLC ${name} (${code})`,
    metaDescription: `VIPA Micro PLC ${name} (${code}): ${m.type}. ${m.specs === "Belirtilmemiş" ? "" : m.specs}. Teklif için Ankara merkezli AOM ile iletişime geçin.`.slice(0, 300),
  };
});

export const MICRO_PLC_TOTAL = microPlcProducts.length;

// ---- SLIO ve 300S+: her tip-grubu için temsili ürün + kod sayfası ----
function buildGroupProduct(g: PlcGroup): Product {
  const [, seriesTitle] = g.group;
  const typeLabel = g.title.replace(`VIPA ${seriesTitle} `, "");
  const n = g.codes.length;
  const img = g.img ? { src: `/magaza/${g.img}`, w: g.imgSize?.[0] ?? 480, h: g.imgSize?.[1] ?? 480 } : null;
  const repModel = g.rep.model ?? typeLabel;
  return {
    slug: `vipa-${g.key}`,
    brand: VIPA_BRAND,
    model: typeLabel,
    name: `${seriesTitle} ${typeLabel.toLocaleLowerCase("tr-TR")}`,
    category: CATEGORY_PLC,
    summary: `${g.note} Bu grupta ${n} sipariş kodu (model/varyant) vardır; tamamı kod sayfasında listelenir.`,
    image: img ? { src: img.src, alt: `VIPA ${seriesTitle} serisi (temsili görsel)` } : undefined,
    imageNote: `Görsel, VIPA ${seriesTitle} serisinin temsili görselidir (CPU modeli); bu gruptaki modüller farklı gövdelerde olabilir.`,
    specs: g.specs,
    source: { label: "Yaskawa seri sayfası", url: `https://www.yaskawa.com.tr/kontrol/plc-kontrol-sistemi/seriesdetail/serie/${g.group[0] === "slio" ? "slio_1447" : "300s-_1449"}` },
    specNote: `${SPEC_NOTE} ${VIPA_MARKA_NOTU}`,
    groupTitle: `VIPA ${seriesTitle}`,
    groupOrder: g.group[2],
    option: `${n} sipariş kodu`,
    optionLabel: "Sipariş kodu",
    seoTitle: `VIPA ${seriesTitle} ${typeLabel} (${n} Model)`,
    metaDescription: `VIPA ${seriesTitle} ${typeLabel.toLocaleLowerCase("tr-TR")}: ${n} sipariş kodu. Örnek model: ${repModel}. VIPA, Yaskawa'nın satın aldığı marka. Teklif için Ankara merkezli AOM ile iletişime geçin.`.slice(0, 300),
    seoText: [
      `${g.note}`,
      `Bu gruptaki ${n} sipariş kodunun tamamı (model adı ve teknik özetiyle) model kodları sayfasında listelenir. VIPA, Yaskawa'nın satın aldığı bir kontrol sistemleri markasıdır; bu ürün grubu Yaskawa diye değil, VIPA (Yaskawa) markasıyla satılır.`,
      `AOM, PLC/IO sistemi seçimi, pano entegrasyonu ve devreye alma projelerinde VIPA ${seriesTitle} modüllerinin tedarikini sağlar. Fiyat ve teslim süresi için teklif isteyin; Ankara'dan Türkiye'nin her şehrine gönderim yapılır.`,
    ],
    keywords: [`VIPA ${seriesTitle}`, `VIPA ${typeLabel}`, "VIPA PLC", "Yaskawa VIPA PLC", "SPEED7 PLC", typeLabel, repModel],
    repTable: g.rep.model ? { model: g.rep.model, rows: g.rep.rows.map(([label, value]) => ({ label, value })) } : undefined,
    codePage: { href: `/magaza/kontrol-plc-kodlari/${g.slug}`, count: n, discontinued: 0 },
  };
}

export const groupProducts: Product[] = KN_PLC_SERIES.map(buildGroupProduct);

export const yaskawaPlcProducts: Product[] = [...microPlcProducts, ...groupProducts];

export const PLC_CATEGORY = CATEGORY_PLC;
