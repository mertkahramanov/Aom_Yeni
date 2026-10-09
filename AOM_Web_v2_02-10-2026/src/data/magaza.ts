// Mağaza ürünleri. Yeni ürün eklemek için bu listeye bir kayıt ekleyin.
// Teknik veriler üretici kataloğundan alınır; teyit edilmemiş değerler [TEYİT] ile işaretlenir.
// Fiyat: liste fiyatı + indirim oranı girilir, indirimli fiyat otomatik hesaplanır.
// KDV KURALI (Mert, 03-10-2026): Girilen tüm fiyatlar KDV HARİÇTİR. KDV oranı %20.
// Fiyatlar sitede her zaman "+ KDV" ile gösterilir; KDV dahil tutar bilgi olarak ayrıca hesaplanır.
// Fiyat bilgisi yoksa sayfada "Teklif isteyin" gösterilir.

export type Product = {
  slug: string;
  brand: string;
  brandLogo?: { src: string; w: number; h: number }; // yoksa marka adı yazıyla gösterilir
  model: string;
  name: string;
  category: string;
  summary: string;
  image?: { src: string; alt: string };
  specs: { label: string; value: string }[];
  source?: { label: string; url: string };
  specNote?: string; // teknik tablo altındaki kaynak notu (yoksa Autonics notu)
  imageNote?: string; // görsel notu (ör. seri görseli)
  price?: { list: number; currency: "USD" | "EUR" | "TRY"; discountPct?: number };
  series?: string; // aynı serideki modelleri birbirine bağlar
  current?: number; // A, seri tablosunda sıralama için
  bodySize?: string;
  seoText?: string[]; // ürün sayfasındaki açıklayıcı paragraflar
  keywords?: string[];
  seoTitle?: string; // arama sonucu başlığı (en fazla ~55 karakter, sonuna " | AOM" eklenir)
  option?: string; // seri tablosunda gösterilen seçenek (ör. "A: gösterge + RS485")
  optionLabel?: string; // seri tablosunda seçenek sütun başlığı (varsayılan "Seçenek")
  bodyLabel?: string; // seri tablosunda bodySize sütun başlığı (varsayılan "Gövde")
  groupTitle?: string; // mağaza listesinde grup başlığı (yoksa seri + gövde)
  groupOrder?: number; // mağaza listesinde grup sırası
  metaDescription?: string; // arama sonucu açıklaması
  seriesIntro?: string; // seri sayfasındaki tanıtım metni
  kindLabel?: string; // seri sayfası başlığındaki ürün türü (ör. "Sıcaklık Kontrol Cihazı")
  repTable?: { model: string; rows: { label: string; value: string }[] }; // seri ürünlerinde örnek modelin tam teknik tablosu
  codePage?: { href: string; count: number; discontinued: number }; // seri ürünlerinde sipariş kodu sayfası
  used?: import("./ikinci-el").UsedInfo; // 2. el ürünlerde durum bilgisi
};

import { ssrProducts } from "./ssr";
import { sprProducts } from "./spr";
import { encProducts } from "./enkoder";
import { kontrolProducts } from "./kontrol";
import { YEDEK_CAT_TEXT, yedekParcaProducts } from "./yedek-parca";
import { IKINCI_EL_PREFIX, ikinciElProducts } from "./ikinci-el";
import { gefranProducts } from "./gefran";

// ---- Autonics DPU3 serisi (3 faz, 440 V) ----
// Kaynak: Autonics ürün sayfası (DPU34D-500A teknik tablosu, Mert 03-10-2026) ve DPU1/DPU3 kataloğu.
// Seri genelindeki özellikler aşağıda; gövdeye bağlı olanlar (ölçü, ağırlık) modele göre eklenir.
const DPU3_SOURCE = "https://www.autonics.com/tr/model/";
// Gövde fotoğrafı: aynı gövdedeki modeller aynı dış görünüşe sahip; doğrulanan modelin fotoğrafı gövde fotoğrafı olarak kullanılır.
// Ağırlık ve ebat: üretici sayfası (aynı gövdedeki tüm modellerde aynı).
const DPU3_BODIES: Record<string, { range: string; dims: string; weight: string; image: string }> = {
  B: { range: "B (80–200 A)", dims: "213 × 365 × 217 mm", weight: "≈ 11,5 kg (paketli ≈ 13,0 kg)", image: "/magaza/autonics-dpu34b-150a_03-10-2026.jpg" },
  C: { range: "C (250–350 A)", dims: "278 × 450 × 227,5 mm", weight: "≈ 20,0 kg (paketli ≈ 21,1 kg)", image: "/magaza/autonics-dpu34c-250a_03-10-2026.jpg" },
  D: { range: "D (400–600 A)", dims: "427 × 528 × 275,5 mm", weight: "≈ 30,8 kg (paketli ≈ 35,7 kg)", image: "/magaza/autonics-dpu34d-500a_03-10-2026.jpg" },
};

// Model kodunun son harfi seçenektir (Autonics ürün sayfası): A = harici gösterge + RS485, R = RS485 haberleşme, N = seçenek yok.
type Dpu3Opt = "A" | "R" | "N";
const DPU3_OPTS: Record<Dpu3Opt, { spec: string; short: string; comm: boolean; summary: string; seo: string }> = {
  A: {
    spec: "Harici gösterge ekranı + RS485 haberleşme (A)",
    short: "A: harici gösterge + RS485",
    comm: true,
    summary: "Harici gösterge ekranı ve RS485 haberleşme seçeneğiyle.",
    seo: `"A" seçeneğiyle harici gösterge ekranı ve RS485 (Modbus RTU) haberleşmesi birlikte gelir; ünite PLC veya SCADA sistemine bağlanarak izlenebilir ve kumanda edilebilir.`,
  },
  R: {
    spec: "RS485 haberleşme (R)",
    short: "R: RS485",
    comm: true,
    summary: "RS485 haberleşme seçeneğiyle.",
    seo: `"R" seçeneğiyle RS485 (Modbus RTU) haberleşmesi gelir; ünite PLC veya SCADA sistemine bağlanarak izlenebilir ve kumanda edilebilir.`,
  },
  N: {
    spec: "Seçenek yok, haberleşmesiz (N)",
    short: "N: standart",
    comm: false,
    summary: "Haberleşmesiz standart model.",
    seo: `"N" seçeneği haberleşmesiz standart modeldir; ünite analog sinyal, kontak girişi veya potansiyometre ile kumanda edilir. Haberleşme gerekiyorsa aynı akım değerinde "R" veya "A" seçeneği tercih edilmelidir.`,
  },
};

function dpu3(current: number, body: "B" | "C" | "D", extra: Partial<Product> = {}, opt: Dpu3Opt = "A"): Product {
  const model = `DPU34${body}-${String(current).padStart(3, "0")}${opt}`;
  const b = DPU3_BODIES[body];
  const o = DPU3_OPTS[opt];
  return {
    slug: `autonics-${model.toLowerCase()}`,
    brand: "Autonics",
    brandLogo: { src: "/oem/autonics_03-10-2026.png", w: 746, h: 160 },
    model,
    name: `Dijital tristörlü güç kontrol ünitesi, 3 faz, 440 V, ${current} A`,
    category: "Tristörlü güç kontrol",
    summary: `Isıtıcı ve endüstriyel yük kontrolü için 3 fazlı, ${current} A dijital tristör (SCR) güç kontrol ünitesi. Faz açısı, çevrim ve ON/OFF kontrol; analog, kontak${o.comm ? " veya RS485" : ""} üzerinden kumanda. ${o.summary}`,
    image: { src: b.image, alt: `Autonics DPU3 serisi ${body} gövde tristörlü güç kontrol ünitesi (${model} ile aynı gövde)` },
    option: o.short,
    series: "Autonics DPU3",
    current,
    bodySize: body,
    specs: [
      { label: "Faz sayısı", value: "3 faz (trifaze)" },
      { label: "Besleme", value: "440 V" },
      { label: "Akım kapasitesi", value: `${current} A` },
      { label: "Gövde*", value: b.range },
      { label: "Seçenek", value: o.spec },
      { label: "Kontrol girişi", value: `Otomatik: 4–20 mA, 0–20 mA, 0–5 VDC, 1–5 VDC, 0–10 VDC, gerilim palsi (0/12 VDC), kontak girişi (ON/OFF)${o.comm ? ", haberleşme girişi (RS485)" : ""}. Elle: dahili 10 kΩ potansiyometre, harici 3–10 kΩ potansiyometre (en az 2 W)` },
      { label: "Kontrol yöntemi", value: "Faz kontrolü: normal (geri beslemesiz), sabit gerilim / akım / güç (geri beslemeli). Çevrim kontrolü (sıfır geçiş): sabit çevrim. ON/OFF (sıfır geçiş)" },
      { label: "Yük", value: "Faz kontrolü: rezistif ve endüktif yükler. ON/OFF ve çevrim kontrolü: rezistif yük" },
      { label: "Çıkış aralığı", value: "Faz kontrolü %0–98; çevrim ve ON/OFF kontrolü %0–100" },
      { label: "Gösterge", value: "R, S, T göstergesi (yeşil); çalıştırma / manuel kontrol göstergesi (yeşil); DI, alarm, ünite (V, A) göstergesi (kırmızı)" },
      { label: "Haberleşme*", value: o.comm ? "RS485, Modbus RTU" : "Yok" },
      { label: "Alarmlar*", value: "Aşırı akım, aşırı gerilim, sigorta atması, soğutucu aşırı sıcaklık, eleman arızası, ısıtıcı kopması" },
      { label: "Soğutma*", value: "Fanlı" },
      { label: "Ortam sıcaklığı", value: "−10…50 °C; depolama −20…80 °C (donma ve yoğuşma olmadan)" },
      { label: "Ortam nemi", value: "%5–90 RH; depolama %5–90 RH (donma ve yoğuşma olmadan)" },
      { label: "Ölçüler (G × Y × D)*", value: b.dims },
      { label: "Ağırlık*", value: b.weight },
    ],
    seoText: [
      `Autonics ${model}, 440 V üç fazlı şebekede ${current} A'e kadar yükleri kontrol eden dijital tristörlü (SCR) güç kontrol ünitesidir. Faz açısı kontrolünde rezistif ve endüktif yükleri, çevrim ve ON/OFF kontrolünde rezistif yükleri sürer; fırın, ısıl işlem ve proses ısıtıcılarında sıcaklık kontrol cihazının 4–20 mA veya 0–10 V çıkışıyla doğrudan kumanda edilir.`,
      `Sabit gerilim, sabit akım ve sabit güç geri beslemeli kontrol modları, şebeke ve yük değişimlerinde çıkışı kararlı tutar. ${o.seo}`,
      `AOM, tristörlü güç kontrol panolarında ünite seçimi, pano entegrasyonu ve devreye alma desteği verir. Uygulamanıza uygun model için bizimle iletişime geçin.`,
    ],
    seoTitle: `Autonics ${model} Tristör Güç Kontrol Ünitesi ${current} A`,
    keywords: [model, "Autonics DPU3", "tristör güç kontrol ünitesi", "SCR güç kontrolörü", "thyristor power controller", `${current} A tristör`, "3 faz güç kontrol", "fırın ısıtıcı kontrolü"],
    source: { label: "Autonics ürün sayfası", url: `${DPU3_SOURCE}${model}` },
    seriesIntro:
      "Autonics DPU3 serisi, 3 faz 440 V şebekede çalışan dijital tristörlü (SCR) güç kontrol ünitesidir. B gövde 80–200 A, C gövde 250–350 A, D gövde 400–600 A aralığındadır. Faz açısı kontrolü (normal; sabit gerilim, akım ve güç geri beslemeli), çevrim ve ON/OFF kontrol modları vardır. Model kodunun son harfi seçeneği gösterir: A = harici gösterge ekranı + RS485, R = RS485 haberleşme, N = seçeneksiz.",
    ...extra,
  };
}

export const products: Product[] = [
  // Mert, 03-10-2026: liste fiyatı 5.227,00 USD, %40 indirim.
  dpu3(500, "D", { price: { list: 5227, currency: "USD", discountPct: 40 } }),
  // Mert, 03-10-2026: liste fiyatları, %40 indirim (KDV hariç)
  dpu3(600, "D", { price: { list: 5383.3, currency: "USD", discountPct: 40 } }),
  dpu3(400, "D", { price: { list: 4934.4, currency: "USD", discountPct: 40 } }),
  dpu3(250, "C", { price: { list: 3271.8, currency: "USD", discountPct: 40 } }),
  dpu3(150, "B", { price: { list: 2020.6, currency: "USD", discountPct: 40 } }),
  // Mert, 03-10-2026: bayi listesi fiyatları; %40 indirim diğer DPU3 modelleriyle aynı uygulandı [TEYİT]
  dpu3(350, "C", { price: { list: 3323.6, currency: "USD", discountPct: 40 } }, "R"),
  dpu3(200, "B", { price: { list: 2088.0, currency: "USD", discountPct: 40 } }, "R"),
  dpu3(200, "B", { price: { list: 1970.6, currency: "USD", discountPct: 40 } }, "N"),
  dpu3(120, "B", { price: { list: 1803.4, currency: "USD", discountPct: 40 } }, "R"),
  // Autonics güç kontrol cihazları SPR1, SPR3, SPRM, SPRS (417 model): src/data/spr.ts
  ...sprProducts,
  // Autonics solid state röleler (SSR), 8 seri: src/data/ssr.ts
  ...ssrProducts,
  ...encProducts,
  ...kontrolProducts,
  ...yedekParcaProducts,
  // Gefran güç kontrol, SSR ve motor yol verici serileri (07-10-2026): src/data/gefran.ts
  ...gefranProducts,
  ...ikinciElProducts,
];

// Üretici sayfasındaki teknik tablo ile doğrulanan modeller.
// 500A, 250A, 150A: Mert'in ekran görüntüleri; 600A, 400A, 350R, 200R, 200N, 120R: Autonics ürün sayfası, Chrome ile okundu (03-10-2026).
// Hepsinde tablo aynı: güç tüketimi ≤ 60 W, onaylar CE/UKCA/cULus/RoHS/EAC, ebat ve ünite (paket) ağırlığı gövdeye göre.
// Doğrulanan modelde gövde ve ağırlık * işaretinden çıkar; ölçüler üretici sayfasında olmadığı için katalogdan (*) kalır.
// image: modelin kendi fotoğrafı; yoksa gövde fotoğrafı kullanılır (Autonics da aynı gövdeye aynı görseli kullanıyor).
const VERIFIED: Record<string, { image?: { src: string; alt: string } }> = {
  "DPU34D-600A": {},
  "DPU34D-500A": {
    image: { src: "/magaza/autonics-dpu34d-500a_03-10-2026.jpg", alt: "Autonics DPU34D-500A tristörlü güç kontrol ünitesi, ön panelde dijital gösterge" },
  },
  "DPU34D-400A": {},
  "DPU34C-350R": {},
  "DPU34C-250A": {
    image: { src: "/magaza/autonics-dpu34c-250a_03-10-2026.jpg", alt: "Autonics DPU34C-250A tristörlü güç kontrol ünitesi, C gövde, ön panelde dijital gösterge" },
  },
  "DPU34B-200R": {},
  "DPU34B-200N": {},
  "DPU34B-150A": {
    image: { src: "/magaza/autonics-dpu34b-150a_03-10-2026.jpg", alt: "Autonics DPU34B-150A tristörlü güç kontrol ünitesi, B gövde, ön panelde dijital gösterge" },
  },
  "DPU34B-120R": {},
};
for (const p of products) {
  const v = VERIFIED[p.model];
  if (!v) continue;
  if (v.image) p.image = v.image;
  const at = (l: string) => p.specs.findIndex((s) => s.label === l);
  p.specs[at("Gövde*")].label = "Gövde";
  p.specs[at("Ağırlık*")].label = "Ağırlık";
  p.specs.splice(at("Haberleşme*"), 0, { label: "Güç tüketimi", value: "≤ 60 W (güç kontrolü)" });
  p.specs.push({ label: "Onaylar", value: "CE, UKCA, cULus, RoHS, EAC" });
}

export const seriesOf = (p: Product) =>
  products
    .filter((x) => x.series && x.series === p.series)
    .sort((a, b) => (b.current ?? 0) - (a.current ?? 0) || a.model.localeCompare(b.model));


// Mağaza listesi: kategori → grup (seri + gövde) → ürün. Yeni kategori veya seri eklendiğinde otomatik ayrılır.
// Sabit kategori adresleri (ör. Gefran talimatı: /magaza/kategori/motor-starter)
const SLUG_OVERRIDE: Record<string, string> = { "Motor yol vericiler (motor starter)": "motor-starter" };
export const slugify = (t: string) =>
  SLUG_OVERRIDE[t] ??
  t.toLocaleLowerCase("tr-TR").replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const groupLabel = (p: Product) => {
  if (p.groupTitle) return p.groupTitle;
  if (p.series && p.bodySize) {
    const body = p.specs.find((s) => s.label.startsWith("Gövde"))?.value ?? p.bodySize;
    return `${p.series} · ${body.replace(/^([A-Z]) /, "$1 gövde ")}`;
  }
  return p.series ?? "Diğer";
};
// Görseli olmayan ürünler (06-10-2026, Mert kararı): kendi kategorilerinden ayrılıp "Diğer ürünler" kategorisinde,
// eski kategori adıyla gruplanarak listelenir. Görsel eklendiğinde ürün otomatik olarak kendi kategorisine döner.
export const OTHER_CATEGORY = "Diğer ürünler";
const catOrder = new Map<string, number>();
for (const p of products) if (!catOrder.has(p.category)) catOrder.set(p.category, catOrder.size);
for (const p of products) {
  if (p.image || p.used) continue; // 2. el ürünler kendi bölümünde kalır
  const from = p.category;
  p.groupTitle = from;
  p.groupOrder = catOrder.get(from) ?? 99;
  p.category = OTHER_CATEGORY;
}

export function storeCategories() {
  const cats: { id: string; title: string; groups: { id: string; title: string; items: Product[] }[] }[] = [];
  for (const p of products) {
    let c = cats.find((x) => x.title === p.category);
    if (!c) cats.push((c = { id: slugify(p.category), title: p.category, groups: [] }));
    const gl = groupLabel(p);
    let g = c.groups.find((x) => x.title === gl);
    if (!g) c.groups.push((g = { id: slugify(gl), title: gl, items: [] }));
    g.items.push(p);
  }
  for (const c of cats) {
    c.groups.sort((a, b) => (a.items[0].groupOrder ?? 0) - (b.items[0].groupOrder ?? 0) || (a.items[0].current ?? 0) - (b.items[0].current ?? 0));
    for (const g of c.groups) g.items.sort((a, b) => (a.current ?? 0) - (b.current ?? 0) || a.model.localeCompare(b.model));
  }
  // "Diğer ürünler" her zaman en sonda, 2. el kategorileri ondan önce
  const rank = (t: string) => (t === OTHER_CATEGORY ? 2 : t.startsWith(IKINCI_EL_PREFIX) ? 1 : 0);
  return cats.sort((a, b) => rank(a.title) - rank(b.title));
}

export const isUsedCategory = (title: string) => title.startsWith(IKINCI_EL_PREFIX);
export { IKINCI_EL_PREFIX };

export const fullName = (p: Product) => (p.brand ? `${p.brand} ${p.model}` : p.model);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

const fmt = (v: number, c: string) =>
  new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v) + " " + c;

export const KDV_ORANI = 20; // %

export function priceInfo(p: Product) {
  if (!p.price) return null;
  const { list, currency, discountPct } = p.price;
  const net = discountPct ? Math.round(list * (100 - discountPct)) / 100 : list;
  const withVat = Math.round(net * (100 + KDV_ORANI)) / 100;
  return {
    list: fmt(list, currency),
    net: fmt(net, currency),
    vatLabel: "+ KDV",
    vatNote: `Fiyatlar KDV hariçtir. %${KDV_ORANI} KDV dahil: ${fmt(withVat, currency)}`,
    discount: discountPct ? `%${discountPct} indirim` : null,
  };
}

// ---- Kategori ve seri sayfaları (SEO, 03-10-2026) ----
export const seriesSlug = (series: string) => slugify(series);

// Kategori açıklamaları: kategori sayfasında ve mağaza listesinde görünür. İddia içermeyen, ürün bilgisine dayalı metin.
export const CATEGORY_INFO: Record<string, { seoTitle: string; description: string; intro: string[]; keywords: string[] }> = {
  "tristorlu-guc-kontrol": {
    seoTitle: "Tristörlü Güç Kontrol Ünitesi (SCR) – Gefran, Autonics | Ankara",
    description:
      "Gefran ve Autonics tristörlü (SCR) güç kontrol üniteleri: Gefran GRC, GPC, GRM, GFX4, GFX; Autonics DPU3, SPR1, SPR3, SPRM, SPRS; 25–600 A. Fiyatlar KDV hariç. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: [
      "Tristörlü (SCR) güç kontrol üniteleri fırın, ısıl işlem ve proses ısıtıcılarında yük gücünü sıcaklık kontrol cihazının 4–20 mA veya 0–10 V sinyaline göre ayarlar. Mağazada Autonics DPU3 (3 faz 440 V, 120–600 A), SPR1 monofaze ve SPR3 trifaze ince tip (110–440 VAC, 25–150 A), SPRM çok kanallı (25–160 A) ve SPRS modüler (25–600 A güç modülleri ve EtherCAT, PROFINET, EtherNet/IP, CC-Link haberleşme modülleri) serileri bulunur. DPU serisinin 840 sipariş kodunun tamamı ayrıca DPU model kodları sayfasında listelenir.",
      "AOM, Gefran yetkili satış noktasıdır. Gefran tarafında kompakt GRC (1/2/3 faz, 25–150 A), gelişmiş GPC (40–600 A, 690 Vac'a kadar), IO-Link'li tek fazlı GRM ve GRM-H (10–120 A), 4 PID çevrimli GFX4 ve SWIR lambalar için GFX4-IR, çok kanallı IR-12/IR-24, tek çevrim PID'li GFX ve GFX Multifunzione ile akıllı yük yöneticisi GSLM listelenir. Gefran ürünlerinde fiyat için teklif isteyin.",
      "Ankara merkezli AOM, tristörlü güç kontrol panolarında ünite seçimi, pano entegrasyonu ve devreye alma desteği verir. Türkiye'nin her şehrinden teklif ve sipariş taleplerinizi iletebilirsiniz.",
    ],
    keywords: ["tristörlü güç kontrol ünitesi", "SCR güç kontrolörü", "tristör sürücü", "thyristor power controller", "Autonics DPU", "Autonics SPR1", "Autonics SPR3", "Autonics SPRM", "Autonics SPRS", "güç kontrol ünitesi Ankara", "tristör fiyat", "Gefran güç kontrol", "Gefran GRC", "Gefran GPC", "Gefran GFX4", "Gefran tristör"],
  },
  "solid-state-roleler-ssr": {
    seoTitle: "Solid State Röle (SSR) – Gefran, Autonics, NCR | Ankara",
    description:
      "Gefran, Autonics ve NCR solid state röleler (SSR, katı hal rölesi): tek ve üç fazlı, 1–120 A; Gefran GRS, GRP, GRZ ve GQ serileri, Autonics 8 seri 224 model, NCR HHG1, HHG1D, HHG1-3, HHG2 ve potansiyometreyle sürülen HHT1. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: [
      "Solid state röleler (SSR, katı hal rölesi) yükü mekanik kontak olmadan yarı iletkenle anahtarlar; sessiz, hızlı ve uzun ömürlüdür. Isıtıcı kontrolü, fırınlar, ambalaj ve plastik makineleri gibi sık anahtarlama gereken uygulamalarda kullanılır. Autonics SSR ailesi tek fazlı ve üç fazlı, 1 A'den 75 A'e kadar, sıfır geçişli ve rastgele açma modellerinden oluşur.",
      "Gefran tarafında (AOM yetkili satış noktası) tek fazlı GRS ve entegre soğutuculu GRS-H (15–120 A), IO-Link ve gelişmiş diyagnostikli GRP ve GRP-H (15–120 A), üç fazlı GRZ ve GRZ-H (10–75 A) ile 90 A'e kadar GQ serileri listelenir. Gefran ürünlerinde fiyat için teklif isteyin.",
      "Mağazada ayrıca NCR (Nicerelay) HHG1 masa tipi, HHG1D tarak tipi, HHG1-3 üç fazlı, HHG2 tek fazlı ve potansiyometreyle sürülen HHT1 SSR'ler yer alır. Autonics serileri: sökülebilir soğutuculu SR1 ve SR3, ince tip SRC1, entegre soğutuculu SRH1 ve SRH3, aşırı ısınma önlemeli SRHL1 ve SRHL3, soketli SRS1. Ankara merkezli AOM, SSR seçimi, soğutucu ve pano uygulaması konusunda destek verir; Türkiye'nin her şehrinden teklif ve sipariş taleplerinizi iletebilirsiniz.",
    ],
    keywords: ["solid state röle", "SSR", "katı hal rölesi", "SSR röle fiyatları", "Autonics SSR", "üç fazlı SSR", "SSR Ankara", "Gefran SSR", "Gefran GRS", "Gefran GRZ", "Gefran GQ"],
  },
  enkoderler: {
    seoTitle: "Enkoder (Encoder) – Autonics Artımlı ve Mutlak Enkoder | Ankara",
    description:
      "Autonics enkoderler: artımlı (inkremental) ve mutlak enkoderler, milli ve oyuk milli, Ø18–Ø100 mm; tekerlekli ve el çarkı enkoderler, enkoder kaplinleri. 34 seri, 8.644 sipariş kodu. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: [
      "Enkoderler (encoder) mil dönüşünü elektrik sinyaline çevirerek açı, konum, devir ve hız ölçer. Artımlı (inkremental) enkoderler devir başına belirli sayıda pals üretir (A, B, Z fazları); mutlak enkoderler her mil konumu için ayrı bir kod (BCD, Binary, Gray veya SSI) verir ve enerji kesilip geldiğinde konumu kaybetmez. Mağazada Autonics'in Ø18 mm'den Ø100 mm'ye kadar milli, oyuk milli ve delik milli artımlı enkoderleri, optik ve manyetik mutlak enkoderleri, tekerlekli ve el çarkı enkoderleri ile enkoder kaplinleri seri olarak listelenir.",
      "Her serinin tüm sipariş kodları (8.644 kod) çözünürlük, çıkış fazı, kontrol çıkışı (totem pole, NPN açık kolektör, gerilim çıkışı, line driver), besleme ve bağlantı bilgileriyle enkoder model kodları sayfalarında listelenir. Ankara merkezli AOM, enkoder seçimi, kaplin ve montaj ile PLC / sayıcı bağlantısı konusunda destek verir; Türkiye'nin her şehrinden teklif ve sipariş taleplerinizi iletebilirsiniz.",
    ],
    keywords: ["enkoder", "encoder", "artımlı enkoder", "inkremental enkoder", "mutlak enkoder", "absolute encoder", "Autonics enkoder", "Autonics E40S", "Autonics E50S", "enkoder fiyat", "enkoder Ankara", "rotary encoder"],
  },
  "sicaklik-kontrol-cihazlari": {
    seoTitle: "Sıcaklık Kontrol Cihazı – Autonics TK, TM, TMH, TCN | Ankara",
    description: "Autonics PID sıcaklık kontrol cihazları: TK serisi (509 model), TM ve TMH modüler çok kanallı, TCN4S-24R. SSR, akım ve röle çıkışlı. Diğer serilerin kodları kod sayfalarında. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: ["Sıcaklık kontrol cihazları (termostat, PID kontrolör) termokupl veya RTD girişinden ölçtüğü sıcaklığı ayar değerine göre röle, SSR sürücü veya 4–20 mA çıkışla kontrol eder. Mağazada Autonics TK serisi yüksek performanslı PID kontrol cihazları (48×24 mm'den 96×96 mm'ye 7 gövde), TM ve TMH modüler çok kanallı kontrol cihazları ve TCN4S-24R çift ekranlı ekonomik model ürün olarak yer alır.", "TN, TX, TC, TCN, TA, TR1D, TH4M, T3/T4, TC3YF, TF3 ve KPN serilerinin tüm sipariş kodları kontrol cihazı kod sayfalarında listelenir. AOM, sıcaklık kontrol cihazını mağazadaki SSR ve tristörlü güç kontrol üniteleriyle birlikte ısıtma panosunda uygular; Türkiye'nin her şehrinden teklif taleplerinizi iletebilirsiniz."],
    keywords: ["sıcaklık kontrol cihazı", "PID kontrol cihazı", "termostat", "Autonics TK", "TK4S", "TK4M", "Autonics TM", "Autonics TMH", "TCN4S-24R", "sıcaklık kontrol cihazı Ankara"],
  },
  "dijital-panel-metreler": {
    seoTitle: "Dijital Panel Metre – Autonics MX4W ve Tüm Kodlar | Ankara",
    description: "Autonics dijital panel metreler: MX4W LCD panel metre ürün olarak; MT4Y/MT4W, MT4N, M4 voltmetre, ampermetre, wattmetre, takometre ve pals metre kodları kod sayfalarında. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: ["Dijital panel metreler gerilim, akım, güç, devir veya proses sinyalini (4–20 mA, 0–10 V) panoda sayısal olarak gösterir; alarm, karşılaştırma ve aktarım çıkışlı modelleri vardır. Mağazada Autonics MX4W LCD ekranlı panel metreler ürün olarak yer alır.", "MT4Y/MT4W, MT4N, M4N, M4NN, M4V, M4Y/M5W/M4W/M4M (voltmetre, ampermetre, wattmetre, takometre, ölçekli), M4NS/M4YS, LR5N-B, MP5S/MP5Y/MP5W ve MP5M serilerinin tüm sipariş kodları kod sayfalarında listelenir."],
    keywords: ["dijital panel metre", "panel metre", "voltmetre", "ampermetre", "Autonics MX4W", "Autonics MT4W", "pals metre", "takometre"],
  },
  "sayicilar": {
    seoTitle: "Sayıcı (Sayaç) – Autonics CT, CX, FX, LA8N | Ankara",
    description: "Autonics dijital sayıcılar ve sayıcı/zamanlayıcılar: CT, CX, LA8N, FXY, FXS, FXM/FXH, FS, FM ve CM6M serileri, 93 model. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: ["Sayıcılar sensör, enkoder veya kontaktan gelen palsleri sayar, ayar değerine ulaşınca çıkış verir. Mağazada Autonics programlanabilir sayıcı/zamanlayıcılar (CT, CX), LCD sayıcılar (LA8N), standart ve küçük dijital sayıcılar (FX serisi, FS), ölçüm sayıcıları (FM) ve 30 kanallı CM6M yer alır.", "AOM, sayıcı seçimi, sensör / enkoder bağlantısı ve pano uygulaması konusunda destek verir; Türkiye'nin her şehrinden teklif taleplerinizi iletebilirsiniz."],
    keywords: ["sayıcı", "dijital sayıcı", "sayaç", "Autonics CT", "Autonics CX", "Autonics FX", "LA8N", "sayıcı zamanlayıcı"],
  },
  "zamanlayicilar": {
    seoTitle: "Zamanlayıcı (Timer) – Autonics ATM, ATS, ATN, LE | Ankara",
    description: "Autonics analog ve dijital zamanlayıcılar: ATM, ATS, ATN, ATE8, yıldız-üçgen, güç kesilme gecikmeli, LE serisi dijital ve haftalık zamanlayıcılar, 112 model. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: ["Zamanlayıcılar (zaman rölesi) ayarlanan süreye göre çıkış kontağını açar veya kapar. Mağazada Autonics minyatür ve çok işlevli analog zamanlayıcılar (ATM, ATS, ATN, ATE8), yıldız-üçgen (ATS8SD-4, AT8SDN), güç kesilme gecikmeli (ATS8P, AT8PSN/AT8PMN), ikiz zamanlayıcılar ve LE serisi dijital / haftalık zamanlayıcılar yer alır.", "AOM, zamanlayıcı seçimi, soket ve pano uygulaması konusunda destek verir."],
    keywords: ["zamanlayıcı", "zaman rölesi", "timer", "yıldız üçgen zaman rölesi", "Autonics ATS", "Autonics ATN", "Autonics ATM", "LE4S"],
  },
  "kayit-cihazlari": {
    seoTitle: "Kayıt Cihazı (Recorder) – Autonics KRN | Ankara",
    description: "Autonics kağıtlı ve kağıtsız kayıt cihazları: KRN50, KRN100, KRN1000 serileri, 78 model. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: ["Kayıt cihazları sıcaklık, basınç, seviye gibi proses değerlerini zaman içinde kaydeder ve alarm çıkışı verir. Mağazada Autonics KRN50 küçük hibrit, KRN100 kağıtlı / kağıtsız ve KRN1000 dokunmatik ekranlı kağıtsız kayıt cihazları yer alır.", "AOM, kayıt cihazı seçimi, giriş kanalları ve haberleşme bağlantısı konusunda destek verir."],
    keywords: ["kayıt cihazı", "recorder", "kağıtsız kayıt cihazı", "Autonics KRN100", "Autonics KRN1000", "KRN50"],
  },
  "gostergeler": {
    seoTitle: "Proses Göstergesi – Autonics KN-1000B, KN-2000W | Ankara",
    description: "Autonics çubuk grafik ve tek kanallı proses göstergeleri: KN-1000B ve KN-2000W serileri, 36 model. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: ["Proses göstergeleri termokupl, RTD ve analog girişlerden gelen değeri gösterir; alarm ve aktarım çıkışlı modelleri vardır. Mağazada Autonics KN-1000B çubuk grafik ve KN-2000W tek kanallı göstergeler yer alır.", "AOM, gösterge seçimi ve pano uygulaması konusunda destek verir."],
    keywords: ["proses göstergesi", "dijital gösterge", "Autonics KN-1000B", "Autonics KN-2000W"],
  },
  "dijital-ekran-birimleri": {
    seoTitle: "Dijital Ekran Birimi – Autonics D1, D5, DS/DA | Ankara",
    description: "Autonics 7 ve 16 bölmeli dijital ekran birimleri ve akıllı gösterge birimleri: D1AA, D1SA, D1SC-N, D5Y/D5W, DS/DA, 68 model. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: ["Dijital ekran birimleri PLC veya kontrol cihazından gelen veriyi panoda rakam ve karakter olarak gösterir. Mağazada Autonics D1 serisi 7 / 16 bölmeli birimler, pano montajlı D5Y/D5W ve seri, paralel veya RS485 girişli DS/DA akıllı gösterge birimleri yer alır.", "AOM, ekran birimi seçimi ve PLC bağlantısı konusunda destek verir."],
    keywords: ["dijital ekran birimi", "7 segment gösterge", "Autonics DS", "Autonics DA", "D1SA"],
  },
  "sensor-kontrol-cihazlari": {
    seoTitle: "Sensör Kontrol Cihazı – Autonics PA10, PA-12 | Ankara",
    description: "Autonics sensör kontrol cihazları: PA10 ve PA-12 serileri, 8 model. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: ["Sensör kontrol cihazları sensörlere besleme verir, sensör sinyalini işleyip röle veya transistör çıkışına çevirir. Mağazada Autonics PA10 yüksek performanslı ve PA-12 8 pinli sensör kontrol cihazları yer alır.", "AOM, sensör kontrol cihazı seçimi ve sensör bağlantısı konusunda destek verir."],
    keywords: ["sensör kontrol cihazı", "Autonics PA10", "Autonics PA-12"],
  },
  "grafik-paneller-hmi": {
    seoTitle: "Grafik Panel (HMI) – Autonics TP, iTP, GP-A, LP-A | Ankara",
    description: "Autonics dokunmatik grafik paneller (HMI) ve logic paneller: TP, iTP, GP-A, LP-A serileri, 29 model. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: ["Grafik paneller (HMI) makine ve proses kontrolünde operatör arayüzüdür; PLC ile haberleşerek ekranda izleme ve kumanda sağlar. Mağazada Autonics TP ve GP-A standart, iTP gelişmiş grafik paneller ile dahili G/Ç'li LP-A logic paneller yer alır.", "AOM, HMI seçimi, ekran tasarımı ve PLC haberleşmesi konusunda destek verir."],
    keywords: ["HMI", "operatör paneli", "dokunmatik panel", "Autonics HMI", "Autonics iTP", "Autonics GP-A", "logic panel"],
  },
  "endustriyel-bilgisayarlar": {
    seoTitle: "Endüstriyel Panel PC – Autonics APC | Ankara",
    description: "Autonics APC serisi 10,1 inç endüstriyel panel bilgisayar. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: ["Endüstriyel panel bilgisayarlar saha ortamında ekran, işlem ve haberleşmeyi tek gövdede sunar. Mağazada Autonics APC serisi 10,1 inç panel bilgisayarlar yer alır.", "AOM, panel bilgisayar seçimi ve saha uygulaması konusunda destek verir."],
    keywords: ["panel PC", "endüstriyel bilgisayar", "Autonics APC"],
  },
};

export function categoryBySlug(slug: string) {
  return storeCategories().find((c) => c.id === slug);
}

export function storeSeries() {
  const map = new Map<string, { slug: string; title: string; category: string; categoryId: string; items: Product[] }>();
  for (const p of products) {
    if (!p.series) continue;
    const slug = seriesSlug(p.series);
    if (!map.has(slug)) map.set(slug, { slug, title: p.series, category: p.category, categoryId: slugify(p.category), items: [] });
    map.get(slug)!.items.push(p);
  }
  for (const s of map.values()) s.items.sort((a, b) => (a.current ?? 0) - (b.current ?? 0) || a.model.localeCompare(b.model));
  return [...map.values()];
}

// Yedek parça ve elektronik / mekanik ürün kategorileri (06-10-2026): açıklamalar src/data/yedek-parca.ts
for (const [cat, text] of Object.entries(YEDEK_CAT_TEXT)) {
  const id = slugify(cat);
  if (CATEGORY_INFO[id]) continue;
  const items = yedekParcaProducts.filter((p) => p.category === cat);
  const cnt = new Map<string, number>();
  for (const p of items) if (p.brand) cnt.set(p.brand, (cnt.get(p.brand) ?? 0) + 1);
  const brands = [...cnt.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([b]) => b);
  CATEGORY_INFO[id] = {
    seoTitle: `${cat}${brands.length ? ` – ${brands.join(", ")}` : ""} | Ankara`,
    description: `${cat}: ${items.length} ürün${brands.length ? ` (${brands.join(", ")} ve diğerleri)` : ""}. ${text.split(". ")[0].replace(/\.$/, "")}. Ankara merkezli AOM'dan Türkiye geneline teklif ve tedarik.`,
    intro: [
      text,
      "Ürünler orijinal üretici parça numarasıyla listelenir. Ankara merkezli AOM, parça numarasına göre tedarik ve muadil araştırmasında destek verir; Türkiye'nin her şehrinden teklif taleplerinizi iletebilirsiniz.",
    ],
    keywords: [cat.toLocaleLowerCase("tr-TR"), `${cat.toLocaleLowerCase("tr-TR")} fiyat`, ...brands, `${cat.toLocaleLowerCase("tr-TR")} Ankara`],
  };
}

// 2. el kategorileri (06-10-2026): ürün geldikçe otomatik açıklama
for (const cat of new Set(ikinciElProducts.map((p) => p.category))) {
  const id = slugify(cat);
  const name = cat.slice(IKINCI_EL_PREFIX.length);
  const n = ikinciElProducts.filter((p) => p.category === cat).length;
  CATEGORY_INFO[id] = {
    seoTitle: `2. El ${name} | Ankara`,
    description: `2. el ${name.toLocaleLowerCase("tr-TR")}: ${n} ürün. Her ürünün durum, test ve garanti bilgisi ürün sayfasında yazılıdır. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.`,
    intro: [
      `2. el ${name.toLocaleLowerCase("tr-TR")}. Her ürünün durumu, test bilgisi ve garanti koşulu ürün sayfasında belirtilir; fotoğraflar satıştaki ürüne aittir.`,
      "Stok adedi sınırlıdır. Ürünü ayırtmak veya ayrıntılı bilgi almak için teklif isteyin.",
    ],
    keywords: [`2. el ${name.toLocaleLowerCase("tr-TR")}`, `ikinci el ${name.toLocaleLowerCase("tr-TR")}`, "2. el otomasyon malzemesi"],
  };
}

// Gefran motor yol vericiler (07-10-2026)
CATEGORY_INFO["motor-starter"] = {
  seoTitle: "Motor Yol Verici (Motor Starter) | Ankara",
  description: "Gefran G-Start motor yol verici (motor starter): 3 kW / 7 A, doğrudan yol verme ve ters dönüş, PL e / SIL 3 acil stop. AOM Gefran yetkili satış noktası; Ankara'dan Türkiye geneline teklif.",
  intro: [
    "Küçük ve orta güçlü motorlar için doğrudan yol verme, yön değiştirme ve koruma fonksiyonlu kompakt motor starter modülleri.",
    "AOM, Gefran yetkili satış noktasıdır. Konveyör, pompa, fan ve helezon motorları için motor yol verici seçimi, pano entegrasyonu ve devreye alma desteği verir; Türkiye'nin her şehrinden teklif taleplerinizi iletebilirsiniz.",
  ],
  keywords: ["motor yol verici", "motor starter", "Gefran G-Start", "ters dönüşlü motor starter", "motor yol verici fiyat", "motor starter Ankara"],
};

CATEGORY_INFO[slugify(OTHER_CATEGORY)] = {
  seoTitle: "Diğer Ürünler – CNC Yedek Parça, Fan, Sigorta, Potansiyometre | Ankara",
  description: "Henüz fotoğrafı eklenmemiş ürünler: Fanuc ve Mitsubishi CNC yedek parçaları, fanlar, sigortalar, potansiyometreler, diyotlar, mekanik parçalar ve daha fazlası. Orijinal parça numarasıyla teklif ve tedarik; Ankara merkezli AOM'dan Türkiye geneline.",
  intro: [
    "Bu bölümde fotoğrafı henüz eklenmemiş ürünler, ait oldukları kategori adıyla gruplanarak listelenir: CNC yedek parçaları, fanlar, sigortalar ve termostatlar, potansiyometreler, diyotlar, sviç ve sensörler, el çarkları, takım bağlama ve ATC parçaları, rulman ve kilit somunları, ölçme ve kalibrasyon ürünleri.",
    "Ürünler orijinal üretici parça numarasıyla listelenir. Aradığınız parça için kod veya ürün etiketi bilgisiyle teklif isteyebilirsiniz; Türkiye'nin her şehrinden taleplerinizi iletebilirsiniz.",
  ],
  keywords: ["CNC yedek parça", "Fanuc yedek parça", "Mitsubishi yedek parça", "fan", "termik sigorta", "potansiyometre", "köprü diyot", "pull stud collet", "rulman kilit somunu"],
};
