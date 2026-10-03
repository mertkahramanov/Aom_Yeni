// Autonics solid state röleler (SSR). Kaynak: Autonics ürün sayfaları (Türkçe), Mert'in Chrome'u ile okundu (03-10-2026).
// Model başına teknik tablo autonics-ssr_03-10-2026.json dosyasında; burada mağaza ürününe dönüştürülür.
// Fiyat bilgisi yok: "Teklif isteyin" gösterilir. Fiyat listesi gelince PRICES tablosuna liste fiyatı + indirim girilir.
import type { Product } from "./magaza";
import raw from "./autonics-ssr_03-10-2026.json";

type Raw = Record<string, { rows: [string, string][] }>;

const SERIES: Record<string, { title: string; short: string; phase: 1 | 3; text: string }> = {
  SR1: {
    title: "Tek fazlı solid state röle, sökülebilir soğutuculu",
    short: "Tek faz · sökülebilir soğutucu",
    phase: 1,
    text: "SR1 serisi, sökülebilir soğutuculu, küçük ve evrensel tasarımlı tek fazlı solid state röledir. Sıfır geçişli ve rastgele açma modelleriyle çeşitli yük koşullarında kararlı çalışır.",
  },
  SRH1: {
    title: "Tek fazlı solid state röle, entegre soğutuculu",
    short: "Tek faz · entegre soğutucu",
    phase: 1,
    text: "SRH1 serisi, entegre soğutuculu tek fazlı solid state röledir; DIN rayına veya panele monte edilir. Gerilim girişli modellerde sıfır geçişli ve rastgele açma, 4–20 mA akım girişli SRH1-A modellerinde faz kontrolü (eşit faz / eşit güç bölme) ve çevrim kontrolü (sabit / değişken) seçenekleri vardır.",
  },
  SRHL1: {
    title: "Tek fazlı solid state röle, entegre soğutuculu, aşırı ısınma önlemeli",
    short: "Tek faz · aşırı ısınma önleme",
    phase: 1,
    text: "SRHL1 serisi, entegre soğutuculu ve aşırı ısınma önleme işlevli tek fazlı solid state röledir: aşırı ısınmada yük çıkışını keser, kırmızı LED ile alarm verir (40 A modellerde alarm çıkışı). DIN rayına veya panele monte edilir.",
  },
  SRC1: {
    title: "Tek fazlı solid state röle, ince tip (22,5 mm)",
    short: "Tek faz · ince 22,5 mm",
    phase: 1,
    text: "SRC1 serisi, 22,5 mm genişliğinde ince, sökülebilir soğutuculu tek fazlı solid state röledir; dar panellerde esnek montaj sağlar. Sıfır geçişli ve rastgele açma modelleri vardır.",
  },
  SRS1: {
    title: "Tek fazlı solid state röle, soketli",
    short: "Tek faz · soketli",
    phase: 1,
    text: "SRS1 serisi, soketli tek fazlı solid state röledir: SRS1-A Autonics SK-G05 soketle, SRS1-B üniversal LY2 soketle, SRS1-C üniversal MY4 soketle kullanılır. AC, DC ve AC/DC yük modelleri ile sıfır geçişli ve rastgele açma seçenekleri vardır.",
  },
  SR3: {
    title: "Üç fazlı solid state röle, sökülebilir soğutuculu",
    short: "3 faz · sökülebilir soğutucu",
    phase: 3,
    text: "SR3 serisi, sökülebilir soğutuculu üç fazlı solid state röledir; büyük motorlar, yüksek güçlü ısıtıcılar ve endüstriyel ekipmanlarda yüksek güçlü yükleri kontrol eder. İki tip montaj deliği farklı soğutuculara kolay montaj sağlar.",
  },
  SRH3: {
    title: "Üç fazlı solid state röle, entegre soğutuculu",
    short: "3 faz · entegre soğutucu",
    phase: 3,
    text: "SRH3 serisi, entegre soğutuculu üç fazlı solid state röledir; DIN rayına veya panele monte edilir. Yüksek güçlü ısıtıcı, motor ve endüstriyel yüklerde sıfır geçişli ve rastgele açma modelleriyle kararlı çalışır.",
  },
  SRHL3: {
    title: "Üç fazlı solid state röle, entegre soğutuculu, aşırı ısınma önlemeli",
    short: "3 faz · aşırı ısınma önleme",
    phase: 3,
    text: "SRHL3 serisi, entegre soğutuculu ve aşırı ısınma önleme işlevli üç fazlı solid state röledir: uyarı çıkışı, kırmızı LED alarm göstergesi ve alarm çıkışı sunar. DIN rayına veya panele monte edilir.",
  },
};

// Seri sırası (mağazada gruplar bu sırayla, tek faz önce)
export const SSR_SERIES_ORDER = ["SR1", "SRC1", "SRH1", "SRHL1", "SRS1", "SR3", "SRH3", "SRHL3"];

// Liste fiyatı (KDV hariç) + indirim. Boş: "Teklif isteyin".
const PRICES: Record<string, { list: number; currency: "USD" | "EUR" | "TRY"; discountPct?: number }> = {};

const LABELS: Record<string, string> = {
  "Kontrol fazı": "Faz sayısı",
  "Anma giriş gerilimi": "Giriş (kontrol) gerilimi",
  "Anma giriş akımı": "Giriş (kontrol) akımı",
  "Anma yük gerilimi": "Yük gerilimi",
  "Anma yük akımı": "Yük akımı",
  "İşlev": "Açma tipi",
  "Ünite ağırlığı (paket ağırlığı)": "Ağırlık",
};

function clean(label: string, v: string) {
  let s = v.replace(/@\(=\)/g, "").replace(/\s+/g, " ").trim(); // @(=): üretici sayfasında DC simgesi yer tutucusu
  s = s.replace(/\(The Anma yük Akım kapasite.*?\)/i, "(yük akımı kapasitesi ortam sıcaklığına göre değişir; üretici derating eğrisine bakınız)");
  s = s.replace(/~ ?\(50\/60Hz\)/g, " (50/60 Hz)").replace(/VAC~/g, "VAC").replace(/⎓/g, "").replace(/\s+\)/g, ")");
  if (label === "Ünite ağırlığı (paket ağırlığı)") s = s.replace(/\((≈[^)]*)\)/, "(paketli $1)");
  if (label === "Kontrol fazı") s = s === "Monofaze" ? "Tek faz (monofaze)" : s === "Trifaze" ? "3 faz (trifaze)" : s;
  return s.replace(/\s{2,}/g, " ").trim();
}

// Gövde fotoğrafı (Autonics ürün sayfasındaki görsel; aynı gövdedeki modellerde ortak, Chrome ile 520×520 alındı)
function bodyImage(model: string, series: string, amps: number) {
  let k = series.toLowerCase();
  if (series === "SRH1") k = model.startsWith("SRH1-A") ? (amps >= 60 ? "srh1-a60" : "srh1-a20") : amps <= 20 ? "srh1-15" : amps <= 40 ? "srh1-30" : "srh1-60";
  if (series === "SRHL1") k = amps >= 40 ? "srhl1-40" : "srhl1-15";
  if (series === "SRS1") k = model.startsWith("SRS1-A") ? (amps >= 5 ? "srs1-a5" : "srs1-a2") : model.startsWith("SRS1-B") ? "srs1-b" : "srs1-c";
  return `/magaza/autonics-ssr-${k}_03-10-2026.jpg`;
}

const num = (s?: string) => (s ? Number((s.match(/[\d,.]+/) || ["0"])[0].replace(",", ".")) : 0);

function build(model: string, rows: [string, string][]): Product {
  const series = model.split("-")[0];
  const meta = SERIES[series];
  const specs = rows.filter((r) => r[0] && r[1]).map(([l, v]) => ({ label: LABELS[l] ?? l, value: clean(l, v) }));
  const get = (l: string) => specs.find((s) => s.label === l)?.value ?? "";
  const amps = num(get("Yük akımı"));
  const load = get("Yük gerilimi");
  const input = get("Giriş (kontrol) gerilimi") || get("Giriş (kontrol) akımı");
  const turn = get("Açma tipi");
  const phase = meta.phase === 3 ? "3 fazlı" : "tek fazlı";
  const slug = `autonics-${model.toLowerCase()}`;
  return {
    slug,
    image: { src: bodyImage(model, series, amps), alt: `Autonics ${series} serisi ${phase} solid state röle (gövde görseli)` },
    brand: "Autonics",
    brandLogo: { src: "/oem/autonics_03-10-2026.png", w: 746, h: 160 },
    model,
    name: `Solid state röle (SSR), ${phase}, ${amps} A, yük ${load.replace(" (50/60 Hz)", "")}`,
    category: "Solid state röleler (SSR)",
    summary: `${meta.title}. Yük ${load.replace(" (50/60 Hz)", "")}, ${amps} A; kontrol girişi ${input}; ${turn.toLocaleLowerCase("tr-TR")} açma.`,
    specs,
    source: { label: "Autonics ürün sayfası", url: `https://www.autonics.com/tr/model/${model}` },
    price: PRICES[model],
    series: `Autonics ${series}`,
    groupTitle: `Autonics ${series} · ${meta.short}`,
    groupOrder: 100 + SSR_SERIES_ORDER.indexOf(series),
    current: amps,
    bodySize: load.replace(" (50/60 Hz)", ""),
    bodyLabel: "Yük gerilimi",
    option: `Giriş ${input} · ${turn}`,
    optionLabel: "Giriş · açma tipi",
    seoText: [
      `Autonics ${model}, ${load.replace(" (50/60 Hz)", "")} yük geriliminde ${amps} A'e kadar akım anahtarlayan ${phase} solid state röledir (SSR). Kontrol girişi ${input}; ${turn.toLocaleLowerCase("tr-TR")} açma tipindedir. Mekanik kontak olmadığı için sessiz, hızlı ve uzun ömürlü anahtarlama sağlar; ısıtıcı kontrolü, fırınlar, ambalaj ve plastik makineleri gibi sık anahtarlama gereken uygulamalarda kullanılır.`,
      meta.text,
      "AOM, solid state röle seçimi, soğutucu ve pano uygulaması ile devreye alma desteği verir. Uygulamanıza uygun model için bizimle iletişime geçin.",
    ],
    seoTitle: `Autonics ${model} Solid State Röle ${amps} A`,
    seriesIntro: meta.text,
    metaDescription: `Autonics ${model}: ${phase} solid state röle (SSR), ${amps} A, yük ${load.replace(" (50/60 Hz)", "")}, giriş ${input}, ${turn.toLocaleLowerCase("tr-TR")}.`,
    keywords: [model, `Autonics ${series}`, "solid state röle", "SSR", "katı hal rölesi", `${amps} A SSR`, phase === "3 fazlı" ? "3 faz SSR" : "tek faz SSR"],
  };
}

export const ssrProducts: Product[] = Object.entries(raw as unknown as Raw).map(([m, o]) => build(m, o.rows));
