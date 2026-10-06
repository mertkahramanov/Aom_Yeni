// Autonics kontrol cihazları (04-10-2026, Mert kararı):
// - Ürün: TK, TM, TMH serileri, TCN4S-24R, MX4W ve sayıcı, zamanlayıcı, kayıt cihazı, gösterge, ekran birimi,
//   sensör kontrol cihazı, grafik panel (HMI), endüstriyel bilgisayar serilerinin tamamı (981 model).
// - Kod sayfası: diğer sıcaklık kontrol serileri ve MX dışındaki panel metreler (26 seri, 1.309 kod), bkz. KONTROL_KOD_SERIES.
// Kaynak: Autonics Türkiye model sayfaları (her modelin tam teknik tablosu) ve model listeleri; Mert'in Chrome'u ile okundu.
// Fiyat yok: "Teklif isteyin".
import type { Product } from "./magaza";
import raw from "./autonics-kontrol_03-10-2026.json";
import rawCodes from "./autonics-kontrol-kodlari_03-10-2026.json";

type Series = {
  key: string;
  raw: string;
  title: string;
  single: string;
  cat: string;
  catTr: string;
  kind: string;
  order: number;
  desc: string;
  feats: string[];
};
type Raw = {
  series: Record<string, Series>;
  products: { m: string; sn: number; rows: [string, string][]; img: string | null; bl: string | null; bv: string | null; ol: string | null; ov: string | null; disc: number }[];
};
export type KodSeries = {
  sn: number;
  slug: string;
  key: string;
  title: string;
  cat: string;
  desc: string;
  common: [string, string][];
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1), ...sütunlar]
  img: string | null;
};

const data = raw as unknown as Raw;
export const KONTROL_SERIES = data.series;
export const KONTROL_KOD_SERIES = (rawCodes as unknown as { series: KodSeries[] }).series.sort(
  (a, b) => (a.cat === b.cat ? a.key.localeCompare(b.key, "tr") : a.cat.localeCompare(b.cat, "tr")) * 1,
);
export const KONTROL_KOD_TOTAL = KONTROL_KOD_SERIES.reduce((n, s) => n + s.codes.length, 0);
export const kontrolKodSeries = (slug: string) => KONTROL_KOD_SERIES.find((s) => s.slug === slug);

export const kontrolSlug = (model: string) => `autonics-${model.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

// Kategoriye göre AOM destek cümlesi (iddia içermez)
const SUPPORT: Record<string, string> = {
  "Temperature-controllers":
    "AOM, sıcaklık kontrol cihazını SSR veya tristörlü güç kontrol ünitesiyle birlikte ısıtma panosunda seçer, bağlar ve devreye alır.",
  "Panel-meters": "AOM, panel metre seçimi, ölçüm girişi bağlantısı ve pano uygulaması konusunda destek verir.",
  Counters: "AOM, sayıcı seçimi ile sensör / enkoder bağlantısı ve pano uygulaması konusunda destek verir.",
  Timers: "AOM, zamanlayıcı seçimi, soket ve pano uygulaması konusunda destek verir.",
  Recorders: "AOM, kayıt cihazı seçimi, giriş kanalları ve haberleşme bağlantısı konusunda destek verir.",
  Indicators: "AOM, gösterge seçimi ve pano uygulaması konusunda destek verir.",
  "Display-units": "AOM, ekran birimi seçimi ve PLC bağlantısı konusunda destek verir.",
  "Sensor-controllers": "AOM, sensör kontrol cihazı seçimi ve sensör bağlantısı konusunda destek verir.",
  HMIs: "AOM, grafik panel (HMI) seçimi, ekran tasarımı ve PLC haberleşmesi konusunda destek verir.",
  "Industrial-PC": "AOM, panel bilgisayar seçimi ve saha uygulaması konusunda destek verir.",
};

// Kategori içinde seri sırası: model sayısı çok olan önce (ör. TK, TMH, TM, TCN)
const seriesOrder = (() => {
  const cnt = new Map<string, number>();
  data.products.forEach((p) => cnt.set(String(p.sn), (cnt.get(String(p.sn)) ?? 0) + 1));
  const m = new Map<string, number>();
  [...cnt.entries()].sort((a, b) => b[1] - a[1]).forEach(([sn], i) => m.set(sn, i));
  return m;
})();

const lc = (t: string) => (/^[A-ZÇĞİÖŞÜ][a-zçğıöşü]/.test(t) ? t[0].toLocaleLowerCase("tr-TR") + t.slice(1) : t);

function build(p: Raw["products"][number]): Product {
  const s = data.series[String(p.sn)];
  const name = `${s.single}${p.bv && p.bl ? `, ${p.bv}` : ""}`.slice(0, 160);
  const specs = p.rows.map(([label, value]) => ({ label, value }));
  const facts = specs
    .filter((r) => /^(Besleme|Kontrol çıkışı|Ebat|Gösterim yöntemi|Giriş türü|Monitör ebadı|Çıkış|Ayar aralığı)/.test(r.label) && r.value.length <= 90)
    .slice(0, 3)
    .map((r) => `${r.label.toLocaleLowerCase("tr-TR")}: ${r.value}`);
  return {
    slug: kontrolSlug(p.m),
    brand: "Autonics",
    brandLogo: { src: "/oem/autonics_03-10-2026.png", w: 746, h: 160 },
    model: p.m,
    name,
    category: s.catTr,
    summary: `${s.single}.${facts.length ? " " + facts.join("; ") + "." : ""}`,
    image: p.img ? { src: `/magaza/${p.img}`, alt: `Autonics ${p.m} ${lc(s.single)}` } : undefined,
    specs,
    source: { label: "Autonics ürün sayfası", url: `https://www.autonics.com/tr/model/${encodeURIComponent(p.m)}` },
    series: `Autonics ${s.key}`,
    groupTitle: `Autonics ${s.key} · ${lc(s.title)}`,
    groupOrder: s.order + (seriesOrder.get(String(p.sn)) ?? 0) / 100,
    bodySize: p.bv ?? undefined,
    bodyLabel: p.bl ?? undefined,
    option: p.ov ?? undefined,
    optionLabel: p.ol ?? (p.ov ? "Seçenek" : undefined),
    kindLabel: s.kind,
    seriesIntro: s.desc,
    seoTitle: `Autonics ${p.m} ${s.kind}`,
    metaDescription: `Autonics ${p.m}: ${lc(s.single)}.${facts.length ? " " + facts.slice(0, 2).join("; ") + "." : ""}`.slice(0, 280),
    seoText: [
      `Autonics ${p.m}, ${s.key} serisi ${lc(s.single)}.${facts.length ? " " + facts.join("; ") + "." : ""}`,
      s.desc,
      ...(s.feats.length ? [`Seri özellikleri: ${s.feats.join("; ")}.`] : []),
      SUPPORT[s.cat] ?? "",
    ].filter(Boolean),
    keywords: [p.m, `Autonics ${p.m}`, `Autonics ${s.key}`, s.kind.toLocaleLowerCase("tr-TR"), `${s.kind.toLocaleLowerCase("tr-TR")} fiyat`, "Autonics"],
  };
}

export const kontrolProducts: Product[] = data.products.map(build);
