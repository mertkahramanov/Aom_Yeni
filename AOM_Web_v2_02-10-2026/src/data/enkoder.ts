// Autonics enkoderler: 34 seri ürün olarak, 8.644 sipariş kodu kod sayfalarında.
// Kaynak: Autonics Türkiye seri ve model sayfaları, Mert'in Chrome'u ile okundu (03-10-2026).
// Kod sütunları (çıkış fazı, kontrol çıkışı, besleme, bağlantı, çıkış kodu, dönme yönü) sipariş kodundan çözüldü ve
// her seride Autonics arama filtresindeki model sayılarıyla birebir karşılaştırıldı (fark yok). Çözünürlük ve mil çapı
// Autonics model listesinden alındı. Durum: Autonics listesinde "Discontinued" işaretli kodlar "Üretimden kalktı".
// Fiyat yok: "Teklif isteyin".
import type { Product } from "./magaza";
import raw from "./autonics-enkoder_03-10-2026.json";

export type EncSeries = {
  key: string;
  slug: string;
  title: string;
  note: string;
  group: [string, string, number];
  autonicsTitle: string;
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1), ...sütun değerleri]
  specs: [string, string][];
  rep: { model: string | null; rows: [string, string][] };
  img: string | null;
  imgSize: [number, number] | null;
};

export const ENC_SERIES = (raw as unknown as { series: EncSeries[] }).series;
export const ENC_TOTAL = ENC_SERIES.reduce((n, s) => n + s.codes.length, 0);
export const encSeries = (slug: string) => ENC_SERIES.find((s) => s.slug === slug);
// Başlığı cümle içinde kullanmak için: yalnız ilk harf büyükse küçültür (Ø ile başlayanlar olduğu gibi kalır)
export const lcFirst = (t: string) => (/^[A-ZÇĞİÖŞÜ][a-zçğıöşü]/.test(t) ? t[0].toLocaleLowerCase("tr-TR") + t.slice(1) : t);
export const encLabel = (s: EncSeries) => s.key.replace("(Sine Wave)", " sinüs");
export const encProductSlug = (s: EncSeries) => (s.key === "ERB" ? "autonics-erb-enkoder-kaplini" : `autonics-${s.slug}-enkoder`);

// Kod sayfası grupları (mağazadaki gruplarla aynı)
export const ENC_GROUPS = (() => {
  const m = new Map<string, { id: string; title: string; order: number; series: EncSeries[] }>();
  for (const s of ENC_SERIES) {
    const [id, title, order] = s.group;
    if (!m.has(id)) m.set(id, { id, title, order, series: [] });
    m.get(id)!.series.push(s);
  }
  return [...m.values()].sort((a, b) => a.order - b.order);
})();

const TYPE_SHORT: Record<string, string> = {
  "artimli-milli": "Artımlı Enkoder",
  "artimli-oyuk": "Artımlı Enkoder (Oyuk Mil)",
  ozel: "Enkoder",
  "mutlak-optik": "Mutlak Enkoder",
  "mutlak-manyetik": "Manyetik Mutlak Enkoder",
  kaplin: "Enkoder Kaplini",
};

const GROUP_TEXT: Record<string, string> = {
  "artimli-milli":
    "Milli artımlı enkoder, makine miline kaplinle bağlanır ve devir başına seçilen çözünürlükte pals üretir. A ve B fazları arasındaki 90° faz farkı dönüş yönünü, Z fazı her turda bir referans palsini verir. Totem pole ve gerilim çıkışlı modeller PLC ve sayıcı girişlerine, NPN açık kolektör modeller harici çekme direnciyle, line driver modeller uzun kablo mesafelerinde gürültüye dayanıklı fark sinyaliyle kullanılır.",
  "artimli-oyuk":
    "Oyuk (kör delik) ve delik milli artımlı enkoderler kaplin gerektirmeden doğrudan motor veya makine miline takılır; gövde, yay plakası veya braketle sabitlenir. Bu yapı montaj boyunu kısaltır ve kaplin kaynaklı hizalama hatalarını ortadan kaldırır. Çıkış fazı, kontrol çıkışı ve besleme seçenekleri milli modellerle aynı mantıktadır.",
  ozel:
    "Tekerlekli enkoderler hareket eden malzemenin uzunluğunu veya hızını doğrudan ölçmek, el çarkı enkoderler ise CNC ve freze tezgâhlarında eksenleri elle hareket ettirmek (manuel pals üreteci, MPG) için kullanılır.",
  "mutlak-optik":
    "Mutlak enkoder her mil konumu için ayrı bir dijital kod verir; enerji kesilip geldiğinde referans aramaya gerek kalmadan konum okunur. Tek turlu modeller bir tur içindeki konumu, çok turlu modeller ayrıca tur sayısını verir. Çıkış kodu BCD, Binary veya Gray; çok turlu modellerde paralel NPN veya SSI seçilebilir.",
  "mutlak-manyetik":
    "Manyetik mutlak enkoderler optik disk yerine manyetik algılama kullanır; nem, titreşim ve darbenin olduğu zorlu ortamlarda tercih edilir. Konum bilgisi BCD, Binary, Gray paralel veya SSI çıkışla okunur.",
  kaplin:
    "Enkoder kaplini, enkoder mili ile makine mili arasındaki eksen kaçıklığını ve açısal hatayı karşılayarak enkoder yataklarını korur. Doğru iç çap kombinasyonu ve bağlantı yöntemi (kelepçe veya ayar vidası) enkoder ömrünü doğrudan etkiler.",
};

function build(s: EncSeries): Product {
  const n = s.codes.length;
  const disc = s.codes.filter((c) => c[1] === 1).length;
  const spec = (l: string) => s.specs.find((x) => x[0] === l)?.[1];
  const facts = ["Çözünürlük", "Çıkış fazı", "Çıkış kodu", "Kontrol çıkışı", "Besleme", "Bağlantı"]
    .map((l) => (spec(l) ? `${l.toLocaleLowerCase("tr-TR")}: ${spec(l)!.replace(/ · /g, " / ")}` : ""))
    .filter(Boolean);
  const label = encLabel(s);
  const typeShort = TYPE_SHORT[s.group[0]];
  const source = s.key.includes("(Sine Wave)")
    ? { label: "Autonics ürün sayfası", url: `https://www.autonics.com/tr/model/${s.rep.model}` }
    : { label: "Autonics seri sayfası", url: `https://www.autonics.com/tr/series/${s.key}` };
  return {
    slug: encProductSlug(s),
    brand: "Autonics",
    brandLogo: { src: "/oem/autonics_03-10-2026.png", w: 746, h: 160 },
    model: label,
    name: s.title,
    category: "Enkoderler",
    summary: `${s.note} Seride ${n} sipariş kodu vardır${disc ? ` (${disc} kodu üretimden kalkmış)` : ""}.`,
    image: s.img ? { src: `/magaza/${s.img}`, alt: `Autonics ${label} ${lcFirst(s.title)}` } : undefined,
    specs: s.specs.map(([label, value]) => ({ label, value })),
    source,
    groupTitle: s.group[1],
    groupOrder: s.group[2],
    option: `${n} sipariş kodu`,
    optionLabel: "Sipariş kodu",
    seoTitle: `Autonics ${label} ${typeShort}`,
    metaDescription: `Autonics ${label}: ${lcFirst(s.title)}. ${n} sipariş kodu${facts.length ? "; " + facts.slice(0, 3).join("; ") : ""}.`.slice(0, 300),
    seoText: [
      `Autonics ${label}, ${lcFirst(s.title)}. ${s.note}${facts.length ? ` Seçenekler: ${facts.join("; ")}.` : ""}`,
      GROUP_TEXT[s.group[0]],
      `Bu serinin ${n} sipariş kodunun tamamı kod sayfasında listelenir; aradığınız kod için teklif isteyebilirsiniz. AOM, enkoder seçimi, kaplin ve montaj ile PLC, sayıcı veya sürücü bağlantısı konusunda destek verir.`,
    ],
    keywords: [s.key, `Autonics ${s.key}`, `${s.key} enkoder`, "enkoder", "encoder", typeShort.toLocaleLowerCase("tr-TR"), ...s.codes.slice(0, 6).map((c) => String(c[0]))],
    repTable: s.rep.model && s.rep.rows.length ? { model: s.rep.model, rows: s.rep.rows.map(([label, value]) => ({ label, value })) } : undefined,
    codePage: { href: `/magaza/enkoder-kodlari/${s.slug}`, count: n, discontinued: disc },
  };
}

export const encProducts: Product[] = ENC_SERIES.map(build);
