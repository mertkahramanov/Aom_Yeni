// Mağaza ürünleri. Yeni ürün eklemek için bu listeye bir kayıt ekleyin.
// Teknik veriler üretici kataloğundan alınır; teyit edilmemiş değerler [TEYİT] ile işaretlenir.
// Fiyat: liste fiyatı + indirim oranı girilir, indirimli fiyat otomatik hesaplanır.
// KDV KURALI (Mert, 03-10-2026): Girilen tüm fiyatlar KDV HARİÇTİR. KDV oranı %20.
// Fiyatlar sitede her zaman "+ KDV" ile gösterilir; KDV dahil tutar bilgi olarak ayrıca hesaplanır.
// Fiyat bilgisi yoksa sayfada "Teklif isteyin" gösterilir.

export type Product = {
  slug: string;
  brand: string;
  brandLogo: { src: string; w: number; h: number };
  model: string;
  name: string;
  category: string;
  summary: string;
  image?: { src: string; alt: string };
  specs: { label: string; value: string }[];
  source: { label: string; url: string };
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
};

import { ssrProducts } from "./ssr";
import { sprProducts } from "./spr";

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
const slugify = (t: string) =>
  t.toLocaleLowerCase("tr-TR").replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const groupLabel = (p: Product) => {
  if (p.groupTitle) return p.groupTitle;
  if (p.series && p.bodySize) {
    const body = p.specs.find((s) => s.label.startsWith("Gövde"))?.value ?? p.bodySize;
    return `${p.series} · ${body.replace(/^([A-Z]) /, "$1 gövde ")}`;
  }
  return p.series ?? "Diğer";
};
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
  return cats;
}

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
    seoTitle: "Tristörlü Güç Kontrol Ünitesi (SCR) – Autonics DPU, SPR | Ankara",
    description:
      "Autonics tristörlü (SCR) güç kontrol üniteleri: DPU3, SPR1 monofaze, SPR3 trifaze, SPRM çok kanallı, SPRS modüler; 25–600 A. Fiyatlar KDV hariç. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: [
      "Tristörlü (SCR) güç kontrol üniteleri fırın, ısıl işlem ve proses ısıtıcılarında yük gücünü sıcaklık kontrol cihazının 4–20 mA veya 0–10 V sinyaline göre ayarlar. Mağazada Autonics DPU3 (3 faz 440 V, 120–600 A), SPR1 monofaze ve SPR3 trifaze ince tip (110–440 VAC, 25–150 A), SPRM çok kanallı (25–160 A) ve SPRS modüler (25–600 A güç modülleri ve EtherCAT, PROFINET, EtherNet/IP, CC-Link haberleşme modülleri) serileri bulunur. DPU serisinin 840 sipariş kodunun tamamı ayrıca DPU model kodları sayfasında listelenir.",
      "Ankara merkezli AOM, tristörlü güç kontrol panolarında ünite seçimi, pano entegrasyonu ve devreye alma desteği verir. Türkiye'nin her şehrinden teklif ve sipariş taleplerinizi iletebilirsiniz.",
    ],
    keywords: ["tristörlü güç kontrol ünitesi", "SCR güç kontrolörü", "tristör sürücü", "thyristor power controller", "Autonics DPU", "Autonics SPR1", "Autonics SPR3", "Autonics SPRM", "Autonics SPRS", "güç kontrol ünitesi Ankara", "tristör fiyat"],
  },
  "solid-state-roleler-ssr": {
    seoTitle: "Solid State Röle (SSR) – Autonics Katı Hal Rölesi | Ankara",
    description:
      "Autonics solid state röleler (SSR, katı hal rölesi): tek ve üç fazlı, 1–75 A, sıfır geçişli ve rastgele açma. 8 seri, 224 model. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
    intro: [
      "Solid state röleler (SSR, katı hal rölesi) yükü mekanik kontak olmadan yarı iletkenle anahtarlar; sessiz, hızlı ve uzun ömürlüdür. Isıtıcı kontrolü, fırınlar, ambalaj ve plastik makineleri gibi sık anahtarlama gereken uygulamalarda kullanılır. Autonics SSR ailesi tek fazlı ve üç fazlı, 1 A'den 75 A'e kadar, sıfır geçişli ve rastgele açma modellerinden oluşur.",
      "Seriler: sökülebilir soğutuculu SR1 ve SR3, ince tip SRC1, entegre soğutuculu SRH1 ve SRH3, aşırı ısınma önlemeli SRHL1 ve SRHL3, soketli SRS1. Ankara merkezli AOM, SSR seçimi, soğutucu ve pano uygulaması konusunda destek verir; Türkiye'nin her şehrinden teklif ve sipariş taleplerinizi iletebilirsiniz.",
    ],
    keywords: ["solid state röle", "SSR", "katı hal rölesi", "SSR röle fiyatları", "Autonics SSR", "üç fazlı SSR", "SSR Ankara"],
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
