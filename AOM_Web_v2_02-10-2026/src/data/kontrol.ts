// Autonics kontrol cihazları (04-10-2026, Mert kararı):
// - Ürün: TK, TM, TMH serileri, TCN4S-24R, MX4W ve sayıcı, zamanlayıcı, kayıt cihazı, gösterge, ekran birimi,
//   sensör kontrol cihazı, grafik panel (HMI), endüstriyel bilgisayar serilerinin tamamı (981 model).
// - Kod sayfası: diğer sıcaklık kontrol serileri ve MX dışındaki panel metreler (26 seri, 1.309 kod), bkz. KONTROL_KOD_SERIES.
// Kaynak: Autonics Türkiye model sayfaları (her modelin tam teknik tablosu) ve model listeleri; Mert'in Chrome'u ile okundu.
// Fiyat: Mert'in sağladığı Autonics fiyat listesiyle eşleşen kodlar için KONTROL_PRICES / KONTROL_KOD_PRICES'tan
// geliyor (23-10-2026, %40 iskonto, DPU3 ile aynı kamuya açık gösterim). Eşleşmeyen kodlarda "Teklif isteyin".
import type { Product } from "./magaza";
import raw from "./autonics-kontrol_03-10-2026.json";
import rawCodes from "./autonics-kontrol-kodlari_03-10-2026.json";
import { KONTROL_PRICES, KONTROL_KOD_PRICES } from "./autonics-fiyat-eslesen_23-10-2026";

export { KONTROL_KOD_PRICES };

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

// Muadil çapraz bağlantı (27-10-2026, Mert kararı): bu Autonics modelinin, AOM'un sattığı hangi
// rakip marka modellerine muadil olduğu (bkz. muadil-kontrol-urunler_27-10-2026.ts). "Rakip ürün"
// diye bir ayrım yoktur; sadece arama yapan kullanıcı iki markadan birini bulduğunda diğerine de ulaşsın diye.
export const KONTROL_MUADIL: Record<string, { brand: string; model: string; slug: string }[]> = {
  "ATE8-41": [{ brand: "Omron", model: "H3BAN8", slug: "muadil-omron-h3ban8" }],
  "ATM4-260S": [{ brand: "Omron", model: "H3Y", slug: "muadil-omron-h3y" }],
  "ATS8-21": [{ brand: "Omron", model: "H3CR-H8L COIL: AC/DC24V - 50/60Hz ,0.05~12s (S series)", slug: "muadil-omron-h3cr-h8l-coil-ac-dc24v-50-60hz-0-05-12s-s-series" }],
  "ATS8-23": [{ brand: "Omron", model: "H3CR-A8E COIL: 24-48VAC/24-48VDC ,50/60Hz", slug: "muadil-omron-h3cr-a8e-coil-24-48vac-24-48vdc-50-60hz" }],
  "ATS8-41": [{ brand: "Omron", model: "H3CR-H8L COIL: AC200/220/240V - 50/60Hz ,0.05~12s (S series)", slug: "muadil-omron-h3cr-h8l-coil-ac200-220-240v-50-60hz-0-05-12s-s-series" }],
  "ATS8-43": [{ brand: "Omron", model: "H3BA N8 230VAC", slug: "muadil-omron-h3ba-n8-230vac" }, { brand: "Omron", model: "H3CR-A8 COIL: 100-240VAC/100-125VDC ,50/60Hz", slug: "muadil-omron-h3cr-a8-coil-100-240vac-100-125vdc-50-60hz" }],
  "CT4S-2P4": [{ brand: "Selec", model: "XT5042", slug: "muadil-selec-xt5042" }, { brand: "Selec", model: "XT543-2P4", slug: "muadil-selec-xt543-2p4" }],
  "CT6M-2P4": [{ brand: "Selec", model: "XC22B-4-230", slug: "muadil-selec-xc22b-4-230" }],
  "CT6Y-2P4": [{ brand: "Selec", model: "XC1200", slug: "muadil-selec-xc1200" }],
  "FS4E-1P4": [{ brand: "Omron", model: "H5CN-Xbn", slug: "muadil-omron-h5cn-xbn" }],
  "KRN1000-0811-0S": [{ brand: "Hanyoung Nux", model: "GR200-8NO", slug: "muadil-hanyoung-nux-gr200-8no" }, { brand: "Radix", model: "SCM201", slug: "muadil-radix-scm201" }],
  "TCN4S-24R": [{ brand: "Delta", model: "DTK4848", slug: "muadil-delta-dtk4848" }],
  "TK4H-14RR": [{ brand: "Selec", model: "PID 110-0-0-01 V2", slug: "muadil-selec-pid-110-0-0-01-v2" }],
  "TK4L-14CR": [{ brand: "Selec", model: "TC244", slug: "muadil-selec-tc244" }],
  "TK4M-14RR": [{ brand: "Radix", model: "X72A", slug: "muadil-radix-x72a" }],
  "TK4M-24CR": [{ brand: "Hanyoung Nux", model: "AX7-2A", slug: "muadil-hanyoung-nux-ax7-2a" }],
  "TK4S-12RN": [{ brand: "Misbus", model: "LC5248-U2-R", slug: "muadil-misbus-lc5248-u2-r" }],
  "TK4S-14CN": [{ brand: "Nippon", model: "FY400-201000", slug: "muadil-nippon-fy400-201000" }],
  "TK4S-14CR": [{ brand: "Selec", model: "TC544", slug: "muadil-selec-tc544" }],
  "TK4S-24CN": [{ brand: "Shimaden", model: "SR1-8P-1W", slug: "muadil-shimaden-sr1-8p-1w" }],
  "TK4S-24RN": [{ brand: "Omron", model: "E5CC-RX2ASM-800", slug: "muadil-omron-e5cc-rx2asm-800" }],
  "TK4S-24SN": [{ brand: "Omron", model: "E5CC-QX2ASM-800", slug: "muadil-omron-e5cc-qx2asm-800" }],
  "TK4S-B4CN": [{ brand: "Selec", model: "PID500-2-0-04", slug: "muadil-selec-pid500-2-0-04" }],
};

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
    price: KONTROL_PRICES[p.m],
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
    equivalents: KONTROL_MUADIL[p.m],
  };
}

export const kontrolProducts: Product[] = data.products.map(build);
