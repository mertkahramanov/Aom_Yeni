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
