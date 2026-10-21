// Yaskawa Sigma-X Rotary Servomotors (SGMXG, SGMXJ, SGMXA): 3 seri, 376 kayıt.
// Kaynak: yaskawa.com.tr "Servo Sistemler" > "Sigma-X Rotary servomotors" kategorisi
// (https://www.yaskawa.com.tr/servo-motor-ve-surucu/sx-rotary-servomotors), Claude'un bağlı tarayıcısıyla
// canlı taranarak derlendi (20-10-2026). Her serinin ___products arama widget'ı üzerinden tüm model kartları
// (148 + 72 + 156 = 376, findings dosyasındaki sayılarla birebir) ve her modelin kendi ürün sayfasındaki tam
// teknik tablo (gerilim, anma torku, anma hızı, enkoder tipi, flanş çapı, çıkış gücü vb.) ayrı ayrı okundu.
// Faz 1'de eklenen Yaskawa robotları (yaskawa-robotlar.ts) ile aynı yöntem ve üslup izlenmiştir.
//
// Bilinen site hataları (düzeltilmeden, olduğu gibi aktarıldı):
//  - Bazı kodlarda "Anma hızı" / "Maksimum motor hızı" alanı eksik haneyle görüntüleniyor
//    (ör. "1000 1/min" yerine "1 1/min"). Etkilenen kod sayısı her serinin "specs" alanındaki "Not" satırında belirtilir.
//  - SGMXG serisinde bazı kodların "Anma çıkış gücü" alanında ondalık nokta düşmüş görünüyor
//    (ör. "0.45 kW" yerine "450 kW"). Aynı şekilde olduğu gibi aktarılmıştır.
//  Her iki hata da kod tablosunda ham haliyle görünür; seri özeti (specs) aralık hesaplarında bu hatalı
//  kayıtlar dışarıda tutulmuştur (bkz. üretim scripti). Üretici sitesinde "üretimden kalktı" bilgisi
//  yayınlanmadığından codes dizisindeki ikinci eleman (discontinued) her kayıtta 0'dır.
//  AOM, Yaskawa'nın yetkili satıcısı/distribütörü olduğunu iddia etmez; sipariş kodu sitede yayınlanmadığından
//  fiyat/kod yok, "Teklif isteyin" gösterilir.
import type { Product } from "./magaza";
import raw from "./yaskawa-servo-sigmax-motor_20-10-2026.json";

export type SxMotorSeries = {
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

export const SV_SXMOTOR_SERIES = (raw as unknown as { series: SxMotorSeries[] }).series;
export const SV_SXMOTOR_TOTAL = SV_SXMOTOR_SERIES.reduce((n, s) => n + s.codes.length, 0);
export const sxMotorSeries = (slug: string) => SV_SXMOTOR_SERIES.find((s) => s.slug === slug);

const CATEGORY_SXMOTOR = "Servo Motor ve Sürücüler"; // 20-10-2026: tüm Yaskawa servo alt aileleri tek kategoride
const GROUP_TITLE = "Yaskawa Sigma-X Rotary Servomotors";
const GROUP_ORDER = 300;

const SERIES_URL: Record<string, string> = {
  SGMXG: "https://www.yaskawa.com.tr/servo-motor-ve-surucu/sx-rotary-servomotors/seriesdetail/serie/sgmxg_21029",
  SGMXJ: "https://www.yaskawa.com.tr/servo-motor-ve-surucu/sx-rotary-servomotors/seriesdetail/serie/sgmxj_21030",
  SGMXA: "https://www.yaskawa.com.tr/servo-motor-ve-surucu/sx-rotary-servomotors/seriesdetail/serie/sgmxa_21028",
};

function build(s: SxMotorSeries): Product {
  const n = s.codes.length;
  const spec = (l: string) => s.specs.find((x) => x[0] === l)?.[1];
  const facts = ["Anma torku aralığı", "Gerilim", "Anma çıkış gücü aralığı", "Flanş çapı aralığı (LA)", "Enkoder tipi"]
    .map((l) => (spec(l) ? `${l.toLocaleLowerCase("tr-TR")}: ${spec(l)}` : ""))
    .filter(Boolean);
  return {
    slug: `yaskawa-${s.slug}-servo-motor`,
    brand: "Yaskawa",
    brandLogo: { src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 },
    model: s.key,
    name: s.title,
    category: CATEGORY_SXMOTOR,
    summary: `${s.note} Seride ${n} model kaydı vardır.`,
    image: s.img ? { src: `/magaza/${s.img}`, alt: `Yaskawa ${s.key} Sigma-X rotary servo motor (temsili görsel)` } : undefined,
    imageNote: "Görsel Yaskawa'nın resmi ürün görselidir ve serinin temsili görselidir; seride modeller arasında ölçü ve gövde farkı olabilir.",
    specs: s.specs.filter(([l]) => l !== "Kayıt sayısı" && l !== "Not").map(([label, value]) => ({ label, value })),
    source: { label: "Yaskawa seri sayfası", url: SERIES_URL[s.key] ?? `https://www.yaskawa.com.tr` },
    specNote:
      "Teknik veriler Yaskawa'nın resmi ürün sayfasından (yaskawa.com.tr) her model için ayrı ayrı okunarak alınmıştır. Sipariş kodu üreticinin sitesinde yayınlanmamaktadır; güncel kod, teslim süresi ve fiyat için teklif isteyin.",
    groupTitle: GROUP_TITLE,
    groupOrder: GROUP_ORDER,
    option: `${n} model`,
    optionLabel: "Model",
    seoTitle: `Yaskawa ${s.key} Sigma-X Rotary Servo Motor`,
    metaDescription: `Yaskawa ${s.key}: ${s.title}. ${n} model${facts.length ? "; " + facts.slice(0, 3).join("; ") : ""}.`.slice(0, 300),
    seoText: [
      `Yaskawa ${s.key}, ${s.title.toLocaleLowerCase("tr-TR")}. ${s.note}`,
      "Sigma-X, Yaskawa'nın Sigma-7 ailesinin yanında yer alan daha yeni nesil rotary servo motor hattıdır; SGMXG, SGMXJ ve SGMXA serileri tork, hız ve gövde ölçüsüne göre farklı uygulama sınıflarını kapsar.",
      `Bu serinin ${n} modelinin tamamı kod sayfasında listelenir; aradığınız model için teklif isteyebilirsiniz. AOM, servo motor seçimi, sürücü eşleştirme ve devreye alma konusunda destek verir.`,
    ],
    keywords: [s.key, `Yaskawa ${s.key}`, `${s.key} servo motor`, "Yaskawa Sigma-X", "Yaskawa servo motor", "servo motor fiyat", ...s.codes.slice(0, 6).map((c) => String(c[0]))],
    repTable: s.rep.model && s.rep.rows.length ? { model: s.rep.model, rows: s.rep.rows.map(([label, value]) => ({ label, value })) } : undefined,
    codePage: { href: `/magaza/servo-sigmax-motor-kodlari/${s.slug}`, count: n, discontinued: 0 },
  };
}

export const sxMotorProducts: Product[] = SV_SXMOTOR_SERIES.map(build);
