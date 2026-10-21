// Yaskawa Özel Uygulama AC Sürücüleri (Special Applications Drives): CR (CR700, vinç), L1000A (asansör),
// HV600 (HVAC/iklimlendirme), LA500 (asansör) — 20-10-2026.
// Kaynak: yaskawa.com.tr'nin canlı ___products AJAX uç noktası, Mert'in bilgisayarındaki Claude masaüstü
// tarayıcısı üzerinden sorgulandı (bulut sandbox'tan www.yaskawa.com.tr'ye doğrudan ağ erişimi agent-proxy
// tarafından engellendiği için). `filterValues[ProductName]=<seri>&path=/Global Objects/Products/AC Drives/`
// sorgusu her seri için TÜM sipariş kodu kartlarını döndürdü (CR 25, L1000A 32, HV600 55, LA500 26 = 138 kod);
// bu sayılar Claude Project'teki urun-verisi/yaskawa-ac-drives-findings_18-10-2026.md dosyasındaki 18-10-2026
// taramasıyla birebir eşleşiyor. Her karttan model kodu, "Anma Çıkış Akımı" ve "Maks. Uygulanabilir Motor
// Çıkışı" (seriye göre ND veya HD bazında) okundu.
// Gerilim sınıfı (200 V / 400 V) kart verisinde doğrudan yer almadığından model kodundaki sabit konumdaki
// harf/rakamdan çözüldü (ör. CR70C4..., LC4F.../LC2A..., HV60C4.../HV60C2.../HV60A4.../HV60A2..., LA50C4.../
// LA50C2...); bu harf Yaskawa'nın kendi kod yapısında voltaj sınıfını gösterir. Seri başına 200 V/400 V
// dağılımı (CR: 0/25, L1000A: 16/16, HV600: 23/32, LA500: 12/14) findings dosyasındaki sayılarla birebir
// uyuşuyor; tüm 138 kod benzersiz, uydurma veri yok.
// Her serinin temsil görseli ve bir örnek modelin tam "Teknik Detaylar" tablosu da aynı tarayıcı oturumunda
// ilgili ürün sayfasından okundu.
// Sipariş kodu başına fiyat Yaskawa'nın sitesinde yayınlanmıyor; fiyat yok, "Teklif isteyin" gösterilir.
// AOM, Yaskawa'nın yetkili satıcısı/distribütörü olduğunu iddia etmez; bu doğrulanmamıştır.
import type { Product } from "./magaza";
import raw from "./yaskawa-ac-ozel-uygulama_20-10-2026.json";

export type AcOzelSeries = {
  key: string;
  slug: string;
  title: string;
  note: string;
  cols: string[];
  codes: (string | number)[][]; // [model, güç (kW), akım (A), gerilim]
  specs: [string, string][];
  rep: { model: string; rows: [string, string][] };
  img: string;
  imgSize: [number, number];
};

export const AC_OZEL_SERIES = (raw as unknown as { series: AcOzelSeries[] }).series;
export const AC_OZEL_TOTAL = AC_OZEL_SERIES.reduce((n, s) => n + s.codes.length, 0);
export const acOzelSeries = (slug: string) => AC_OZEL_SERIES.find((s) => s.slug === slug);

// 20-10-2026 (ana oturum entegrasyonu): tüm Yaskawa AC sürücü alt aileleri (genel/kompakt, özel uygulama,
// rejeneratif) tek "AC Sürücüler" kategorisinde toplanır (bkz. yaskawa-ac-rejeneratif.ts CATEGORY_AC_SURUCU);
// alt aile ayrımı seri/grup başlıklarında (series/groupTitle) korunur.
const CATEGORY = "AC Sürücüler";
const GROUP_TITLE = "Özel Uygulama AC Sürücüleri"; // mağaza kategori sayfasında alt grup başlığı (category'den ayrı tutulur)
const CATEGORY_URL = "https://www.yaskawa.com.tr/ac-surucu/ac-surucu/%C3%96zel%20Uygulama%20AC%20S%C3%BCr%C3%BCc%C3%BCleri";

function build(s: AcOzelSeries): Product {
  const n = s.codes.length;
  const voltCounts = new Map<string, number>();
  for (const row of s.codes) {
    const v = String(row[3]);
    voltCounts.set(v, (voltCounts.get(v) ?? 0) + 1);
  }
  const voltSummary = [...voltCounts.entries()].map(([v, c]) => `${v} (${c} kod)`).join(", ");
  return {
    slug: `yaskawa-${s.slug}-ac-surucu`,
    brand: "Yaskawa",
    brandLogo: { src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 },
    model: s.title.replace(/ Serisi.*$/, ""),
    name: `${s.title}: AC sürücü`,
    category: CATEGORY,
    summary: `${s.note} Seride ${n} sipariş kodu vardır.`,
    image: { src: `/magaza/${s.img}`, alt: `Yaskawa ${s.key} AC sürücü (temsili görsel)` },
    imageNote: "Görsel Yaskawa'nın resmi ürün görselidir ve serinin temsili görselidir; seri içindeki modeller arasında gövde/ebat farkı olabilir.",
    specs: s.specs.map(([label, value]) => ({ label, value })),
    source: { label: "Yaskawa seri sayfası (Özel Uygulama AC Sürücüleri)", url: CATEGORY_URL },
    specNote:
      "Teknik veriler Yaskawa'nın resmi Türkiye sitesinden (yaskawa.com.tr) alınmıştır. Sipariş kodu üreticinin sitesinde fiyatla birlikte yayınlanmamaktadır; güncel fiyat ve teslim süresi için teklif isteyin.",
    groupTitle: GROUP_TITLE,
    groupOrder: 30,
    option: `${n} sipariş kodu`,
    optionLabel: "Sipariş kodu",
    seoTitle: `Yaskawa ${s.key} AC Sürücü Sipariş Kodları`,
    metaDescription: `Yaskawa ${s.key}: ${n} sipariş kodu, gerilim sınıfları ${voltSummary}. Teklif için Ankara merkezli AOM ile iletişime geçin.`.slice(0, 300),
    seriesIntro: s.note,
    kindLabel: "AC Sürücü",
    seoText: [
      s.note,
      `Yaskawa ${s.key} serisinin ${n} sipariş kodunun tamamı kod sayfasında listelenir (güç, akım ve gerilim sınıfı bilgisiyle; gerilim sınıfları: ${voltSummary}). AOM, AC sürücü seçimi, panoya entegrasyon ve devreye alma konusunda destek verir; aradığınız kod için teklif isteyebilirsiniz.`,
    ],
    keywords: [
      s.key,
      `Yaskawa ${s.key}`,
      `${s.key} AC sürücü`,
      `${s.key} sürücü fiyat`,
      "Yaskawa AC sürücü",
      "AC drive",
      "frekans konvertörü",
      ...s.codes.slice(0, 5).map((c) => String(c[0])),
    ],
    repTable: { model: s.rep.model, rows: s.rep.rows.map(([label, value]) => ({ label, value })) },
    codePage: { href: `/magaza/ac-surucu-ozel-kodlari/${s.slug}`, count: n, discontinued: 0 },
  };
}

export const acOzelUygulamaProducts: Product[] = AC_OZEL_SERIES.map(build);
