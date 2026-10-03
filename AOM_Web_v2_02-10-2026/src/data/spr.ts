// Autonics güç kontrol cihazları: SPR1, SPR3, SPRM, SPRS (417 model).
// Kaynak: Autonics Türkiye ürün sayfaları; her modelin teknik tablosu Mert'in Chrome'u ile okundu (03-10-2026).
// Tablolar autonics-spr_03-10-2026.json içinde (üretici sırasıyla, model başına tam tablo).
// Fiyat yok: "Teklif isteyin". Fiyat listesi gelince PRICES tablosuna liste fiyatı + indirim girilir.
import type { Product } from "./magaza";
import raw from "./autonics-spr_03-10-2026.json";

type Raw = { models: Record<string, { rows: [string, string][]; img: string }> };
const data = raw as unknown as Raw;

const SERIES: Record<string, { title: string; short: string; order: number; text: string }> = {
  SPR1: {
    title: "Monofaze ince güç kontrol cihazı",
    short: "Monofaze · ince tip",
    order: 10,
    text: "SPR1 serisi, monofaze yükler için ince tip tristörlü (SCR) güç kontrol cihazıdır. 4–20 mA, 1–5 VDC veya ON/OFF girişle kumanda edilir; faz kontrolü, döngü (sabit / değişken) kontrolü ve ON/OFF kontrol modları vardır. Geri beslemeli modellerde statik akım, gerilim ve güç kontrolü, T seçenekli modellerde RS485 (Modbus RTU) haberleşme bulunur.",
  },
  SPR3: {
    title: "Trifaze ince güç kontrol cihazı",
    short: "Trifaze · ince tip",
    order: 11,
    text: "SPR3 serisi, üç fazlı yükler için ince tip tristörlü (SCR) güç kontrol cihazıdır. 4–20 mA, 1–5 VDC veya ON/OFF girişle kumanda edilir; faz kontrolü, döngü kontrolü ve ON/OFF kontrol modları vardır. Geri beslemeli modellerde statik akım, gerilim ve güç kontrolü, T seçenekli modellerde RS485 (Modbus RTU) haberleşme bulunur.",
  },
  SPRM: {
    title: "Çok kanallı güç kontrol cihazı",
    short: "Çok kanallı",
    order: 12,
    text: "SPRM serisi, tek fazlı 3 kanal veya 3 fazlı kullanılabilen çok kanallı güç kontrol cihazıdır; serbest gerilim 220–440 VAC. R modelleri RS485, EC modelleri RS485 + EtherCAT haberleşme sunar.",
  },
  SPRS: {
    title: "Modüler çok kanallı güç kontrol",
    short: "Modüler sistem",
    order: 13,
    text: "SPRS serisi, güç modülleri (25–600 A) ve haberleşme modüllerinden oluşan modüler çok kanallı güç kontrol sistemidir. Tek fazlı, tek fazlı çift ve 3 fazlı kontrol yapılır; haberleşme modülleri RS485 ile birlikte EtherNet/IP, EtherCAT, PROFINET veya CC-Link sunar.",
  },
};

const PRICES: Record<string, { list: number; currency: "USD" | "EUR" | "TRY"; discountPct?: number }> = {};

const IMAGE_ALT: Record<string, string> = {
  SPR1: "Autonics SPR1 monofaze güç kontrol cihazı",
  SPR3: "Autonics SPR3 trifaze güç kontrol cihazı",
  SPRM: "Autonics SPRM çok kanallı güç kontrol cihazı",
  SPRS: "Autonics SPRS modüler güç kontrol",
};

const clean = (s: string) =>
  s
    .replace(/ᆞ/g, "•")
    .replace(/VAC~/g, "VAC")
    .replace(/\s+/g, " ")
    .replace(/^• ?/, "")
    .replace(/(\d)(VAC|VDC|VA|A|W|kg)\b/g, "$1 $2")
    .trim();

const COMM: Record<string, string> = { R: "RS485", EC: "RS485 + EtherCAT", EI: "RS485 + EtherNet/IP", PN: "RS485 + PROFINET", CL: "RS485 + CC-Link" };

function build(model: string): Product {
  const series = model.split("-")[0].replace(/^SPRM3$/, "SPRM");
  const meta = SERIES[series];
  const m = data.models[model];
  const rows = m.rows;
  const specs = rows
    .filter(([l, v]) => l && v && v !== "-")
    .map(([l, v]) => ({ label: l.replace(/\s*_\s*/g, " – "), value: clean(v) }));
  const get = (l: string) => rows.find((r) => r[0] === l)?.[1] ?? "";
  const amps = Number((get("Anma yük akımı").match(/\d+/) || ["0"])[0]);
  const load = clean(get("Anma yük gerilimi")).replace(" 50 / 60 Hz", "").replace(" 50/60 Hz", "");
  let name = "";
  let option = "";
  let body = load;
  if (series === "SPR1" || series === "SPR3") {
    const code = model.slice(-3);
    const comm = code[0] === "T" ? "RS485" : "haberleşmesiz";
    const ctrl = code[1] === "F" ? "geri beslemeli" : "normal kontrol";
    option = `${comm} · ${ctrl} · kod sonu ${code[2]}`;
    name = `${meta.title} (SCR), ${load}, ${amps} A`;
  } else if (series === "SPRM") {
    const c = model.replace(/^SPRM3-F\d+/, "");
    option = COMM[c] ?? c;
    name = `${meta.title}, ${amps} A, ${COMM[c] ?? c}`;
    body = "220–440 VAC";
  } else {
    if (model.startsWith("SPRS-CM-")) {
      const c = model.replace("SPRS-CM-", "");
      option = `Haberleşme modülü: ${COMM[c] ?? c}`;
      name = `${meta.title}, haberleşme modülü (${COMM[c] ?? c})`;
      body = "–";
    } else {
      option = "Güç modülü";
      name = `${meta.title}, güç modülü ${amps} A`;
      body = "220–490 VAC";
    }
  }
  const slug = `autonics-${model.toLowerCase()}`;
  const imgKey = m.img;
  return {
    slug,
    brand: "Autonics",
    brandLogo: { src: "/oem/autonics_03-10-2026.png", w: 746, h: 160 },
    model,
    name,
    category: "Tristörlü güç kontrol",
    summary: `${meta.title}${amps ? `, ${amps} A` : ""}${body && body !== "–" ? `, yük ${body}` : ""}. ${option}.`,
    image: imgKey ? { src: `/magaza/autonics-${imgKey}_03-10-2026.jpg`, alt: `${IMAGE_ALT[series]} (seri görseli)` } : undefined,
    specs,
    source: { label: "Autonics ürün sayfası", url: `https://www.autonics.com/tr/model/${model}` },
    price: PRICES[model],
    series: `Autonics ${series}`,
    groupTitle: `Autonics ${series} · ${meta.short}`,
    groupOrder: meta.order,
    current: amps,
    bodySize: body,
    bodyLabel: "Yük gerilimi",
    option,
    optionLabel: "Seçenek",
    seriesIntro: meta.text,
    seoText: [
      `Autonics ${model}, ${meta.title.toLocaleLowerCase("tr-TR")}${amps ? ` (${amps} A${body && body !== "–" ? `, ${body}` : ""})` : ""}. ${option}.`,
      meta.text,
      "Ankara merkezli AOM, tristörlü güç kontrol panolarında cihaz seçimi, pano entegrasyonu ve devreye alma desteği verir; Türkiye'nin her şehrinden teklif ve sipariş taleplerinizi iletebilirsiniz.",
    ],
    seoTitle: `Autonics ${model} ${series === "SPRS" ? "Modüler Güç Kontrol" : "Güç Kontrol Cihazı"}${amps ? ` ${amps} A` : ""}`,
    metaDescription: `Autonics ${model}: ${name}. ${option}.`,
    keywords: [model, `Autonics ${series}`, "tristörlü güç kontrol", "SCR güç kontrolörü", "güç kontrol cihazı", ...(amps ? [`${amps} A güç kontrol`] : [])],
  };
}

export const sprProducts: Product[] = Object.keys(data.models).map(build);
