// Yaskawa Genel Amaçlı Endüstriyel AC Sürücüler (GA500, GA700) ve Öncü AC Sürücüler/kompakt grubu
// (A1000, V1000, J1000, L1000V) — 20-10-2026.
// Kaynak: yaskawa.com.tr'nin canlı ___products AJAX uç noktası, Mert'in bilgisayarındaki Claude masaüstü
// tarayıcısı üzerinden (bulut sandbox'tan doğrudan ağ erişimi engellendiği için) sorgulanarak elde edildi.
// `filterValues[ProductName]=<seri>&path=/Global Objects/Products/AC Drives/` sorgusu, ilgili serinin TÜM
// sipariş kodu kartlarını döndürdü; her kart satırından model kodu, "Anma Çıkış Akımı" ve "Maks.
// Uygulanabilir Motor Çıkışı" (ND veya HD, kart hangisini gösteriyorsa) okundu. Toplam bulunan kod sayısı:
// GA500 97, GA700 65, A1000 44, V1000 28, J1000 19, L1000V 20 = 273 kod (Claude Project'teki
// urun-verisi/yaskawa-ac-drives-findings_18-10-2026.md dosyasındaki 18-10-2026 taramasında 96/64/44/27/19/20
// = 270 bulunmuştu; GA500, GA700 ve V1000'de birer kod daha fazla çıktı — muhtemelen sitenin kataloğu bu
// birkaç günde güncellendi, kopya kayıt bulunmadı, her model kodu benzersiz).
// Gerilim sınıfı (200 V / 400 V), kart verisinde doğrudan yer almadığı için model kodundaki sabit konumdaki
// harf/rakamdan (ör. GA50C[2|4|B]..., CIMR-AC[2|4]A...) çözüldü; bu harf Yaskawa'nın kendi kod yapısında
// voltaj sınıfını gösterir ve örnek kodlarla (findings dosyasındaki temsili tablo) doğrulandı. V1000
// serisinde 6 kodun model yapısı (CIMR-VCBA...) bu sabit konuma uymadığından gerilimi "Belirtilmemiş"
// bırakıldı (uydurma yok).
// Gövde/ebat/ağırlık bilgisi ürün kartlarında yer almadığından ve 273 ürün detay sayfasının tek tek
// taranması bu görevin kapsamı dışında olduğundan bu alanlar boş bırakıldı.
// Sipariş kodu başına fiyat Yaskawa'nın sitesinde yayınlanmıyor; fiyat yok, "Teklif isteyin" gösterilir.
// AOM, Yaskawa'nın yetkili satıcısı/distribütörü olduğunu iddia etmez; bu doğrulanmamıştır.
import type { Product } from "./magaza";
import raw from "./yaskawa-ac-genel-kompakt_20-10-2026.json";

export type AcGenelSeries = {
  key: string;
  slug: string;
  title: string;
  note: string;
  category: string;
  categoryUrl: string;
  cols: string[];
  codes: (string | number)[][]; // [model, güç (kW), akım (A), duty (ND/HD), gerilim]
  specs: [string, string][];
  rep: { model: string; rows: [string, string][] };
  img: string;
  imgSize: [number, number];
};

export const AC_GENEL_SERIES = (raw as unknown as { series: AcGenelSeries[] }).series;
export const AC_GENEL_TOTAL = AC_GENEL_SERIES.reduce((n, s) => n + s.codes.length, 0);
export const acGenelSeries = (slug: string) => AC_GENEL_SERIES.find((s) => s.slug === slug);

// Mağazadaki kategori grupları (iki kategori: Genel Amaçlı Endüstriyel AC Sürücüler, Öncü AC Sürücüler)
export const AC_GENEL_GROUPS = (() => {
  const order: Record<string, number> = { "Genel Amaçlı Endüstriyel AC Sürücüler": 10, "Öncü AC Sürücüler": 20 };
  const m = new Map<string, { id: string; title: string; order: number; series: AcGenelSeries[] }>();
  for (const s of AC_GENEL_SERIES) {
    if (!m.has(s.category)) m.set(s.category, { id: s.category, title: s.category, order: order[s.category] ?? 99, series: [] });
    m.get(s.category)!.series.push(s);
  }
  return [...m.values()].sort((a, b) => a.order - b.order);
})();

function build(s: AcGenelSeries): Product {
  const n = s.codes.length;
  const voltCounts = new Map<string, number>();
  for (const row of s.codes) {
    const v = String(row[4]);
    voltCounts.set(v, (voltCounts.get(v) ?? 0) + 1);
  }
  const voltSummary = [...voltCounts.entries()].map(([v, c]) => `${v} (${c} kod)`).join(", ");
  const dutyCounts = new Map<string, number>();
  for (const row of s.codes) {
    const d = String(row[3]);
    dutyCounts.set(d, (dutyCounts.get(d) ?? 0) + 1);
  }
  const dominantDuty = [...dutyCounts.entries()].sort((a, b) => b[1] - a[1])[0][0];
  return {
    slug: `yaskawa-${s.slug}-ac-surucu`,
    brand: "Yaskawa",
    brandLogo: { src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 },
    model: s.title.replace(" Serisi", ""),
    name: `${s.title}: AC sürücü`,
    // 20-10-2026 (ana oturum entegrasyonu): tüm Yaskawa AC sürücü alt aileleri tek "AC Sürücüler"
    // kategorisinde toplanır; JSON'daki s.category ("Genel Amaçlı.../Öncü...") alt aile ayrımı seri
    // başlığında ve grupOrder'da korunur, üst kategori olarak kullanılmaz.
    category: "AC Sürücüler",
    summary: `${s.note} Seride ${n} sipariş kodu vardır.`,
    image: { src: `/magaza/${s.img}`, alt: `Yaskawa ${s.title} AC sürücü (temsili görsel)` },
    imageNote: `Görsel Yaskawa'nın resmi ürün görselidir ve serinin temsili görselidir; seri içindeki modeller arasında gövde/ebat farkı olabilir.`,
    specs: s.specs.map(([label, value]) => ({ label, value })),
    source: { label: "Yaskawa seri sayfası", url: s.categoryUrl },
    specNote: "Teknik veriler Yaskawa'nın resmi Türkiye sitesinden (yaskawa.com.tr) alınmıştır. Sipariş kodu üreticinin sitesinde fiyatla birlikte yayınlanmamaktadır; güncel fiyat ve teslim süresi için teklif isteyin.",
    groupTitle: s.category,
    groupOrder: s.category === "Genel Amaçlı Endüstriyel AC Sürücüler" ? 10 : 20,
    option: `${n} sipariş kodu`,
    optionLabel: "Sipariş kodu",
    seoTitle: `Yaskawa ${s.title} AC Sürücü Sipariş Kodları`,
    metaDescription: `Yaskawa ${s.title}: ${n} sipariş kodu, gerilim sınıfları ${voltSummary}. Teklif için Ankara merkezli AOM ile iletişime geçin.`.slice(0, 300),
    seriesIntro: s.note,
    kindLabel: "AC Sürücü",
    seoText: [
      s.note,
      `Yaskawa ${s.title} serisinin ${n} sipariş kodunun tamamı kod sayfasında listelenir (${dominantDuty} bazında güç ve akım değerleriyle, gerilim sınıfları: ${voltSummary}). AOM, AC sürücü seçimi, panoya entegrasyon ve devreye alma konusunda destek verir; aradığınız kod için teklif isteyebilirsiniz.`,
    ],
    keywords: [s.key, `Yaskawa ${s.key}`, `${s.key} AC sürücü`, `${s.key} sürücü fiyat`, "Yaskawa AC sürücü", "AC drive", "frekans konvertörü", ...s.codes.slice(0, 5).map((c) => String(c[0]))],
    repTable: { model: s.rep.model, rows: s.rep.rows.map(([label, value]) => ({ label, value })) },
    codePage: { href: `/magaza/ac-surucu-genel-kodlari/${s.slug}`, count: n, discontinued: 0 },
  };
}

export const acGenelKompaktProducts: Product[] = AC_GENEL_SERIES.map(build);

// Sipariş kodu başına bireysel ürün sayfası (27-10-2026, Mert kararı):
// "CIMR-VCBA0018BAA bu ürün bizim sitede yok mu?" sorusu üzerine — bu kod daha önce sadece kod tablosunda
// (ac-surucu-genel-kodlari/[seri]) satır olarak vardı, kendi URL'si/başlığı/meta açıklaması olan bir sayfası
// yoktu, bu yüzden Google'da aratıldığında çıkmıyordu. Mert: "Bu ürünleri de fotoğraflı ürün haline
// getirmeliyiz. Çünkü googleda çıkmıyor." — kapsam: Yaskawa AC sürücü genel kompakt serilerinin TAMAMI
// (GA500, GA700, A1000, V1000, J1000, L1000V = 273 kod).
// Fotoğraf: kod bazında gövde/ebat bilgisi üreticinin kart verisinde yok (bkz. dosya başındaki not), bu
// yüzden serinin zaten sitede kullanılan tek gerçek ürün görseli (s.img) tüm kodlarda temsili görsel olarak
// kullanılır — tıpkı Autonics DPU3 serisinde aynı gövdedeki modellerin aynı fotoğrafı paylaşması gibi.
// Üstteki 6 "seri özeti" ürünü (acGenelKompaktProducts, kod tablosu sayfasına yönlendirir) silinmedi; bu yeni
// 273 ürün onlara ek olarak eklendi, böylece hem genel "V1000 serisi" araması hem de tam kod araması
// ("CIMR-VCBA0018BAA") için ayrı ayrı indekslenebilir sayfa var.
function buildKod(s: AcGenelSeries, row: (string | number)[]): Product {
  const [model, guc, akim, duty, gerilim] = row as [string, number, number, string, string];
  const slug = `yaskawa-${model.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  const dutyLabel = duty === "HD" ? "HD (ağır hizmet)" : duty === "ND" ? "ND (normal hizmet)" : duty;
  const gerilimBilinmiyor = gerilim === "Belirtilmemiş";
  return {
    slug,
    brand: "Yaskawa",
    brandLogo: { src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 },
    model,
    name: `${s.title}: AC sürücü, ${guc} kW`,
    category: "AC Sürücüler",
    summary: `Yaskawa ${s.key} serisi AC sürücü sipariş kodu. Güç: ${guc} kW, akım: ${akim} A (${dutyLabel})${gerilimBilinmiyor ? "" : `, gerilim sınıfı: ${gerilim}`}.`,
    image: { src: `/magaza/${s.img}`, alt: `Yaskawa ${s.key} serisi AC sürücü (temsili görsel)` },
    imageNote: `Görsel Yaskawa'nın resmi ${s.key} serisi ürün görselidir ve serinin temsili görselidir; seri içindeki kodlar arasında gövde/ebat farkı olabilir.`,
    specs: [
      { label: "Model / sipariş kodu", value: model },
      { label: "Güç", value: `${guc} kW (${duty})` },
      { label: "Akım", value: `${akim} A (${duty})` },
      { label: "Gerilim sınıfı", value: gerilimBilinmiyor ? "Belirtilmemiş (üretici kart verisinde yer almıyor)" : gerilim },
      ...s.specs
        .filter(([label]) => !["Marka", "Seri", "Kategori", "Sipariş kodu sayısı", "Güç aralığı", "Akım aralığı", "Gerilim sınıfları"].includes(label))
        .map(([label, value]) => ({ label, value })),
    ],
    source: { label: "Yaskawa seri sayfası", url: s.categoryUrl },
    specNote: "Teknik veriler Yaskawa'nın resmi Türkiye sitesinden (yaskawa.com.tr) alınmıştır. Sipariş kodu üreticinin sitesinde fiyatla birlikte yayınlanmamaktadır; güncel fiyat ve teslim süresi için teklif isteyin.",
    series: `Yaskawa ${s.key}`,
    current: akim,
    groupTitle: `Yaskawa ${s.key} serisi`,
    groupOrder: AC_GENEL_SERIES.indexOf(s),
    kindLabel: "AC Sürücü",
    seoTitle: `Yaskawa ${model} AC Sürücü Sipariş Kodu`,
    metaDescription: `Yaskawa ${model}: ${s.key} serisi AC sürücü, ${guc} kW, ${akim} A (${dutyLabel})${gerilimBilinmiyor ? "" : `, ${gerilim}`}. Teklif için Ankara merkezli AOM ile iletişime geçin.`.slice(0, 300),
    seoText: [
      `Yaskawa ${model}, ${s.key} serisi bir AC sürücü sipariş kodudur. ${s.note}`,
      `Bu koda ait temel değerler: ${guc} kW güç, ${akim} A akım (${dutyLabel})${gerilimBilinmiyor ? "" : `, ${gerilim} gerilim sınıfı`}. AOM, AC sürücü seçimi, panoya entegrasyon ve devreye alma konusunda destek verir; bu kod için teklif isteyebilirsiniz.`,
    ],
    keywords: [model, `Yaskawa ${model}`, s.key, `Yaskawa ${s.key}`, `${s.key} AC sürücü`, "Yaskawa AC sürücü", "AC drive", "frekans konvertörü"],
  };
}

// Çakışma kontrolü: src/data/surucu_11-10-2026.json (yedek-parça modülü, 11-10-2026) bu 273 koddan 2'sini
// zaten ayrı bir ürün olarak içeriyor (CIMR-VC4A0011BAA, CIMR-VC4A0004BAA) — aynı slug üretilirdi. O sayfalar
// zaten canlı olduğundan burada tekrar üretilmiyor (çakışma yok, veri kaybı yok).
const YEDEK_PARCA_COD_CAKISMA = new Set(["CIMR-VC4A0011BAA", "CIMR-VC4A0004BAA"]);

export const acGenelKompaktKodUrunleri: Product[] = AC_GENEL_SERIES.flatMap((s) =>
  s.codes.filter((row) => !YEDEK_PARCA_COD_CAKISMA.has(String(row[0]))).map((row) => buildKod(s, row)),
);
