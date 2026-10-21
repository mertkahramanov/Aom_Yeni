// Yaskawa Servo Sistemler — Faz 3 (20-10-2026): Sigma-7 Servopacks (SGD7S, SGD7W, SGD7C) ve
// Sigma-7 Option Modules 400V (Advanced Safety Module).
// Kaynak: yaskawa.com.tr canlı sitesi, built-in browser ile /___products arka plan API'si
// doğrudan okunarak (sayfalama yok, her seri tek istekte tam liste döndü): SGD7S 141, SGD7W 23,
// SGD7C 16, Option Modules 400V 1 kayıt — toplam 181, urun-verisi/yaskawa-servo-findings_18-10-2026.md
// dosyasındaki site-rendered sayılarla birebir eşleşiyor.
// Gerilim (200 V / 400 V) üretici ürün sayfalarındaki "Giriş Güç Kaynağı" alanından örneklerle
// doğrulanan model kodu kuralından türetildi: SGD7x-<kapasite kodu><A|D>... → A = 200 V, D = 400 V.
// SGD7W'de 6 kayıt Yaskawa'nın kendi sitesinde "SGD7W-xxxAxxAxxx" placeholder adıyla listeleniyor;
// bu kayıtlar olduğu gibi aktarıldı, gerilimleri üretici sitesinde de belirtilmediği için "Belirtilmemiş".
// Sipariş kodu/fiyat Yaskawa'nın sitesinde yayınlanmıyor; "Teklif isteyin" gösterilir.
// AOM, Yaskawa'nın yetkili satıcısı/distribütörü olduğunu iddia etmez; bu doğrulanmamıştır.
import type { Product } from "./magaza";
import raw from "./yaskawa-servo-sigma7-surucu_20-10-2026.json";

export type Sigma7SurucuSeries = {
  key: string;
  slug: string;
  title: string;
  note: string;
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1), ...sütun değerleri]
  specs: [string, string][];
  rep: { model: string | null; rows: [string, string][] };
  img: string | null;
  imgSize: [number, number] | null;
};

export const SV_S7SURUCU_SERIES = (raw as unknown as { series: Sigma7SurucuSeries[] }).series;
export const SV_S7SURUCU_TOTAL = SV_S7SURUCU_SERIES.reduce((n, s) => n + s.codes.length, 0);
export const svS7SurucuSeries = (slug: string) => SV_S7SURUCU_SERIES.find((s) => s.slug === slug);

// Kategori, kısa seri-tanıtımı ve ürün yuva adı, seri anahtarına göre (JSON'da tutulmuyor).
type SeriesMeta = { category: string; kindLabel: string; seriesIntro: string; productSlug: string };
const META: Record<string, SeriesMeta> = {
  SGD7S: {
    category: "Servo Motor ve Sürücüler",
    kindLabel: "Sigma-7 Tek Eksenli Servo Sürücü",
    seriesIntro:
      "SGD7S, Yaskawa'nın Sigma-7 ailesine ait tek eksenli (single-axis) servo sürücüsüdür (servopack). Analog gerilim/pals treni, MECHATROLINK-II, MECHATROLINK-III (standart veya RJ45 konnektörlü), EtherCAT, PROFINET, komut opsiyon modülü takılabilir tip ve dahili IEC kontrolörlü (Sigma-7Siec) seçenekleriyle, 0,05–15,00 kW azami motor kapasitesi ve 200 V / 400 V gerilim aralığında geniş bir model yelpazesi sunar.",
    productSlug: "yaskawa-sgd7s-sigma7-tek-eksenli-servo-surucu",
  },
  SGD7W: {
    category: "Servo Motor ve Sürücüler",
    kindLabel: "Sigma-7 Çift Eksenli Servo Sürücü",
    seriesIntro:
      "SGD7W, Sigma-7 ailesine ait çift eksenli (dual-axis) servo sürücüsüdür; tek gövdede iki ekseni sürerek pano içinde yer kazandırır. EtherCAT ve MECHATROLINK-III (standart veya RJ45 konnektörlü) haberleşmesini destekler.",
    productSlug: "yaskawa-sgd7w-sigma7-cift-eksenli-servo-surucu",
  },
  SGD7C: {
    category: "Servo Motor ve Sürücüler",
    kindLabel: "Dahili Kontrolörlü Sigma-7 Servo Sürücü",
    seriesIntro:
      "SGD7C, dahili hareket kontrolörüne sahip Sigma-7 çift eksenli servo sürücüsüdür. MECHATROLINK-III veya referans tabanlı bus bağlantısı (Bus Connection with References) ile çalışır, 0,20–1,00 kW azami motor kapasitesi aralığında yalnızca 200 V'ta sunulur.",
    productSlug: "yaskawa-sgd7c-dahili-kontrolorlu-servo-surucu",
  },
  "Option Modules 400V": {
    category: "Servo Motor ve Sürücüler",
    kindLabel: "Sigma-7 400V Opsiyon Modülü",
    seriesIntro:
      "Sigma-7 400V servo sürücülerinin işlevlerini genişleten opsiyon modülleri. Yaskawa'nın Türkiye sitesinde bu kategoride tek kayıt vardır: Advanced Safety Module (gelişmiş güvenlik opsiyon modülü).",
    productSlug: "yaskawa-sigma7-400v-opsiyon-modulu",
  },
};

function build(s: Sigma7SurucuSeries): Product {
  const n = s.codes.length;
  const disc = s.codes.filter((c) => c[1] === 1).length;
  const meta = META[s.key];
  const image = s.img ? { src: `/magaza/${s.img}`, alt: `Yaskawa ${s.key} ${meta.kindLabel.toLocaleLowerCase("tr-TR")} (temsili görsel)` } : undefined;
  const repTable = s.rep.model && s.rep.rows.length ? { model: s.rep.model, rows: s.rep.rows.map(([label, value]) => ({ label, value })) } : undefined;
  return {
    slug: meta.productSlug,
    brand: "Yaskawa",
    brandLogo: { src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 },
    model: s.key,
    name: `${meta.kindLabel}${n > 1 ? `, ${n} model` : ""}`,
    category: meta.category,
    summary: `${s.note} Seride ${n} model vardır${disc ? ` (${disc} model üretimden kalkmış)` : ""}.`,
    image,
    specs: s.specs.map(([label, value]) => ({ label, value })),
    source: { label: "Yaskawa ürün sayfası", url: "https://www.yaskawa.com.tr/servo-motor-ve-surucu/Sigma-7/servopacks" },
    specNote: "Teknik veriler Yaskawa'nın resmi Türkiye ürün sayfasından (yaskawa.com.tr) alınmıştır. Sipariş kodu üreticinin sitesinde yayınlanmamaktadır; güncel kod, teslim süresi ve fiyat için teklif isteyin.",
    seriesIntro: meta.seriesIntro,
    kindLabel: meta.kindLabel,
    groupTitle: "Sigma-7 Servo Sürücü", // 20-10-2026 (ana oturum): kategori sayfasında ayrı, anlamlı grup başlığı
    groupOrder: 40,
    repTable,
    codePage: { href: `/magaza/servo-sigma7-surucu-kodlari/${s.slug}`, count: n, discontinued: disc },
    seoText: [
      meta.seriesIntro,
      `AOM, servo sürücü seçimi, devreye alma ve haberleşme entegrasyonu (EtherCAT, MECHATROLINK, PROFINET) konusunda destek verir. ${s.key} için güncel fiyat ve teslim süresi teklif üzerine bildirilir; Ankara'dan Türkiye'nin her şehrine gönderim yapılır.`,
    ],
    keywords: [`Yaskawa ${s.key}`, "Yaskawa servo sürücü", "Yaskawa servopack", meta.category, "Yaskawa Türkiye", "servo sürücü fiyat", "Yaskawa servo Ankara"],
    seoTitle: `Yaskawa ${s.key} ${meta.kindLabel}`,
    metaDescription: `Yaskawa ${s.key}: ${meta.kindLabel.toLocaleLowerCase("tr-TR")}, ${n} model. Teklif için Ankara merkezli AOM ile iletişime geçin.`,
  };
}

export const yaskawaServoSigma7SurucuProducts: Product[] = SV_S7SURUCU_SERIES.map(build);
