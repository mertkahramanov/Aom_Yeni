// Yaskawa Doğrudan Tahrik (Direct Drive) Motorları — SGM7D, SGM7E, SGM7F: 3 seri, 368 kayıt.
// Kaynak: yaskawa.com.tr "Servo Sistemler" > "Doğrudan Tahrik Motorları" kategorisi
// (https://www.yaskawa.com.tr/servo-motor-ve-surucu/direct-drive-motors), Claude'un bağlı tarayıcısıyla
// canlı taranarak derlendi (20-10-2026). Her serinin ___products arama widget'ı üzerinden tüm model kartları
// (145 + 87 + 136 = 368, findings dosyasındaki sayılarla birebir) çekildi; anma torku ve enkoder tipi kart
// üzerinden, dış çap ise sitenin "Dış Çap" filtre dilimindeki ayrık değerlerine göre (filterValues[OuterDiameter]
// tam aralıkla sorgulanarak) her modele eşlendi. Temsili modellerin tam teknik tablosu (gerilim, anma torku,
// anlık azami torku, dış çap, flanş, boyut, ağırlık) kendi ürün sayfalarından ayrı okundu.
// Faz 1'de eklenen Yaskawa robotları (yaskawa-robotlar.ts) ile aynı yöntem ve üslup izlenmiştir.
//
// Bilinen site hatası (düzeltilmeden, olduğu gibi aktarıldı):
//  - SGM7E serisinde bir kayıt (ürün id 11734, 7 Nm / 135 mm / Artımlı) model adını boş gösteriyor; sıra
//    numarasına göre muhtemelen eksik bir bağlantı seçeneği varyantı olsa da teyit edilemediğinden model adı
//    "Belirtilmemiş" olarak bırakılmıştır (bkz. ilgili serinin "Not" alanı).
//  Üretici sitesinde "üretimden kalktı" bilgisi yayınlanmadığından codes dizisindeki ikinci eleman
//  (discontinued) her kayıtta 0'dır. AOM, Yaskawa'nın yetkili satıcısı/distribütörü olduğunu iddia etmez;
//  sipariş kodu sitede yayınlanmadığından fiyat/kod yok, "Teklif isteyin" gösterilir.
import type { Product } from "./magaza";
import raw from "./yaskawa-servo-dogrudan-tahrik_20-10-2026.json";

export type SvDdSeries = {
  key: string;
  slug: string;
  title: string;
  note: string;
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1), ...cols değerleri]
  specs: [string, string][];
  rep: { model: string | null; rows: [string, string][] };
  img: string | null;
  imgSize: [number, number] | null;
};

export const SV_DD_SERIES = (raw as unknown as { series: SvDdSeries[] }).series;
export const SV_DD_TOTAL = SV_DD_SERIES.reduce((n, s) => n + s.codes.length, 0);
export const svDdSeries = (slug: string) => SV_DD_SERIES.find((s) => s.slug === slug);

const CATEGORY_DD = "Servo Motor ve Sürücüler"; // 20-10-2026: tüm Yaskawa servo alt aileleri tek kategoride
const GROUP_TITLE = "Yaskawa Doğrudan Tahrik Motorları (Direct Drive)";
const GROUP_ORDER = 310;

const SERIES_URL: Record<string, string> = {
  SGM7D: "https://www.yaskawa.com.tr/servo-motor-ve-surucu/direct-drive-motors/seriesdetail/serie/sgm7d_6784",
  SGM7E: "https://www.yaskawa.com.tr/servo-motor-ve-surucu/direct-drive-motors/seriesdetail/serie/sgm7e_11660",
  SGM7F: "https://www.yaskawa.com.tr/servo-motor-ve-surucu/direct-drive-motors/seriesdetail/serie/sgm7f_11661",
};

function build(s: SvDdSeries): Product {
  const n = s.codes.length;
  const spec = (l: string) => s.specs.find((x) => x[0] === l)?.[1];
  const facts = ["Anma torku aralığı", "Dış çap aralığı", "Enkoder tipi", "Gerilim"]
    .map((l) => (spec(l) ? `${l.toLocaleLowerCase("tr-TR")}: ${spec(l)}` : ""))
    .filter(Boolean);
  return {
    slug: `yaskawa-${s.slug}-servo-motor`,
    brand: "Yaskawa",
    brandLogo: { src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 },
    model: s.key,
    name: s.title,
    category: CATEGORY_DD,
    summary: `${s.note} Seride ${n} model kaydı vardır.`,
    image: s.img ? { src: `/magaza/${s.img}`, alt: `Yaskawa ${s.key} doğrudan tahrik servo motor (temsili görsel)` } : undefined,
    imageNote: "Görsel Yaskawa'nın resmi ürün görselidir ve serinin temsili görselidir; seride modeller arasında ölçü ve gövde farkı olabilir.",
    specs: s.specs.filter(([l]) => l !== "Not").map(([label, value]) => ({ label, value })),
    source: { label: "Yaskawa seri sayfası", url: SERIES_URL[s.key] ?? "https://www.yaskawa.com.tr" },
    specNote:
      "Teknik veriler Yaskawa'nın resmi ürün sayfasından (yaskawa.com.tr) alınmıştır. Sipariş kodu üreticinin sitesinde yayınlanmamaktadır; güncel kod, teslim süresi ve fiyat için teklif isteyin.",
    groupTitle: GROUP_TITLE,
    groupOrder: GROUP_ORDER,
    option: `${n} model`,
    optionLabel: "Model",
    seoTitle: `Yaskawa ${s.key} Doğrudan Tahrik Servo Motor`,
    metaDescription: `Yaskawa ${s.key}: ${s.title}. ${n} model${facts.length ? "; " + facts.slice(0, 3).join("; ") : ""}.`.slice(0, 300),
    seoText: [
      `Yaskawa ${s.key}, ${s.title.toLocaleLowerCase("tr-TR")}. ${s.note}`,
      "Doğrudan tahrik (direct drive) motorlar, dişli, kayış veya redüktör gibi mekanik aktarma elemanlarını ortadan kaldırarak yükü doğrudan tahrik eder; bu da boşluğu (backlash) ve mekanik bileşen sayısını azaltır, yüksek hız ve konumlama hassasiyeti gerektiren uygulamalarda sert (rijit) bir mekanik sistem sağlar. SGM7D, SGM7E ve SGM7F serileri rotor yapısı (dış/iç rotor, nüveli/nüvesiz) ve tork-çap aralığına göre farklı uygulama sınıflarını kapsar.",
      `Bu serinin ${n} modelinin tamamı kod sayfasında listelenir; aradığınız model için teklif isteyebilirsiniz. AOM, servo motor seçimi, sürücü eşleştirme ve devreye alma konusunda destek verir.`,
    ],
    keywords: [s.key, `Yaskawa ${s.key}`, `${s.key} servo motor`, "Yaskawa doğrudan tahrik", "Yaskawa direct drive", "doğrudan tahrik servo motor fiyat", ...s.codes.slice(0, 6).map((c) => String(c[0]))],
    repTable: s.rep.model && s.rep.rows.length ? { model: s.rep.model, rows: s.rep.rows.map(([label, value]) => ({ label, value })) } : undefined,
    codePage: { href: `/magaza/servo-dogrudan-tahrik-kodlari/${s.slug}`, count: n, discontinued: 0 },
  };
}

export const svDdProducts: Product[] = SV_DD_SERIES.map(build);
