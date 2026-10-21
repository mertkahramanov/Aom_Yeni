// Yaskawa AC Sürücü — Rejeneratif Çözümler (D1000, U1000, U1000 Panel), 20-10-2026.
// "Yaskawa'nın tüm ürünlerini siteye ekle" talimatının Faz 2'si (Faz 1 — Robotlar — bkz. yaskawa-robotlar.ts).
// Kaynak: https://www.yaskawa.com.tr/ac-surucu/ac-surucu/rejeneratif-surucu — canlı sitenin kendi
// ___products AJAX uç noktasından (filterValues[ProductName]=D1000 / U1000, path=/Global Objects/Products/AC Drives/)
// tarayıcı içinde fetch() ile çekilen kart verisi (model, Anma Çıkış Akımı (ND), Maks. Uygulanabilir Motor
// Çıkışı (ND)). Gerilim sınıfı (200 V / 400 V) sipariş kodundaki harf+rakam örüntüsünden (ör. "DC2A" = 200 V,
// "DC4A" = 400 V) okunur; bu örüntü Yaskawa'nın kendi ürün detay sayfalarındaki "Giriş Güç Kaynağı" alanıyla
// doğrulanmıştır (bkz. rep.rows). Toplam: D1000 20, U1000 61, U1000 Panel 11 = 92 sipariş kodu — Claude
// Project'teki urun-verisi/yaskawa-ac-drives-findings_18-10-2026.md dosyasındaki per-seri sayılarla birebir
// aynıdır (200 V/400 V dağılımı da dahil).
// Fiyat yok: "Teklif isteyin". AOM, Yaskawa'nın yetkili bayisi/distribütörü olduğunu iddia etmez.
import type { Product } from "./magaza";
import raw from "./yaskawa-ac-rejeneratif_20-10-2026.json";

export const CATEGORY_AC_SURUCU = "AC Sürücüler";

export type AcRejSeries = {
  key: string;
  slug: string;
  title: string;
  note: string;
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1), güç (ND, kW), akım (ND, A), gerilim sınıfı]
  specs: [string, string][];
  rep: { model: string; rows: [string, string][] };
  img: string;
  imgSize: [number, number];
};

export const AC_REJENERATIF_SERIES = (raw as unknown as { series: AcRejSeries[] }).series;
export const AC_REJENERATIF_TOTAL = AC_REJENERATIF_SERIES.reduce((n, s) => n + s.codes.length, 0);
export const acRejSeries = (slug: string) => AC_REJENERATIF_SERIES.find((s) => s.slug === slug);
export const acRejProductSlug = (s: AcRejSeries) => `yaskawa-${s.slug}-rejeneratif`;

function build(s: AcRejSeries): Product {
  const n = s.codes.length;
  const powers = s.codes.map((c) => Number(c[2]));
  const currents = s.codes.map((c) => Number(c[3]));
  const minP = Math.min(...powers).toLocaleString("tr-TR");
  const maxP = Math.max(...powers).toLocaleString("tr-TR");
  const minA = Math.min(...currents).toLocaleString("tr-TR");
  const maxA = Math.max(...currents).toLocaleString("tr-TR");
  return {
    slug: acRejProductSlug(s),
    brand: "Yaskawa",
    brandLogo: { src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 },
    model: s.key,
    name: s.title,
    category: CATEGORY_AC_SURUCU,
    summary: `${s.note} Seride ${n} sipariş kodu vardır; güç ${minP}–${maxP} kW (ND), akım ${minA}–${maxA} A (ND).`,
    image: { src: `/magaza/${s.img}`, alt: `Yaskawa ${s.key} ${s.title}` },
    imageNote: `Görsel Yaskawa'nın resmi ürün görselidir (yaskawa.com.tr) ve ${s.key} serisinin temsili görselidir.`,
    specs: s.specs.map(([label, value]) => ({ label, value })),
    source: { label: "Yaskawa ürün sayfası", url: "https://www.yaskawa.com.tr/ac-surucu/ac-surucu/rejeneratif-surucu" },
    specNote: "Teknik veriler Yaskawa'nın resmi Türkiye sitesinden (yaskawa.com.tr) canlı olarak alınmıştır. Fiyat yayınlanmamaktadır; güncel fiyat ve teslim süresi için teklif isteyin.",
    groupTitle: "Rejeneratif Çözümler",
    groupOrder: 10,
    option: `${n} sipariş kodu`,
    optionLabel: "Sipariş kodu",
    seriesIntro: s.note,
    kindLabel: "AC Sürücü (Rejeneratif)",
    repTable: { model: s.rep.model, rows: s.rep.rows.map(([label, value]) => ({ label, value })) },
    codePage: { href: `/magaza/ac-surucu-rejeneratif-kodlari/${s.slug}`, count: n, discontinued: 0 },
    seoTitle: `Yaskawa ${s.key} ${s.title}`,
    metaDescription: `Yaskawa ${s.key}: ${s.note.split(".")[0]}. ${n} sipariş kodu; güç ${minP}–${maxP} kW, akım ${minA}–${maxA} A. Teklif için AOM ile iletişime geçin.`.slice(0, 300),
    seoText: [
      `Yaskawa ${s.key}, ${s.title.toLocaleLowerCase("tr-TR")}. ${s.note}`,
      `Bu serinin ${n} sipariş kodunun tamamı kod sayfasında listelenir; aradığınız kod için teklif isteyebilirsiniz. AOM, Yaskawa AC sürücü seçimi, enerji geri kazanımlı (rejeneratif) sistem tasarımı ve devreye alma konusunda destek verir. Ankara'dan Türkiye'nin her şehrine gönderim yapılır.`,
    ],
    keywords: [s.key, `Yaskawa ${s.key}`, "Yaskawa rejeneratif sürücü", "Yaskawa AC sürücü", "rejeneratif konvertör", "matris konvertör", "Yaskawa AC sürücü fiyat", ...s.codes.slice(0, 5).map((c) => String(c[0]))],
  };
}

export const acRejProducts: Product[] = AC_REJENERATIF_SERIES.map(build);
