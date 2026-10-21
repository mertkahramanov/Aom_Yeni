// Yaskawa Sigma-7 Rotary Servomotors (SGM7A, SGM7G, SGM7J): 3 seri, 1.087 kayıt.
// Kaynak: yaskawa.com.tr "Servo Sistemler" > "Sigma-7 Rotary servomotors" kategorisi
// (https://www.yaskawa.com.tr/servo-motor-ve-surucu/Sigma-7/rotary-servomotors), Claude'un bağlı tarayıcısıyla
// canlı taranarak derlendi (20-10-2026). Her serinin ___products arama widget'ı üzerinden tüm model kartları
// (418 + 500 + 169 = 1.087, findings dosyasındaki ve Yaskawa'nın kendi filtre sayılarıyla birebir) tek seferde
// okundu; gerilim, enkoder tipi, mil ucu ve seçenek (fren/keçe) sipariş kodunun kendisinden (DPU/Enkoder kod
// mantığıyla aynı yöntemle) çözüldü ve kapasite kodu başına bir temsili ürün sayfası (toplam 32 sayfa) okunarak
// anma torku, anma çıkış gücü ve flanş çapı doğrulandı. Faz 1'de eklenen Yaskawa robotları (yaskawa-robotlar.ts)
// ile aynı yöntem ve üslup izlenmiştir.
//
// Bilinen site hatası (düzeltilerek aktarıldı, bkz. her serinin specs alanındaki "Not" satırı):
//  - Yaskawa'nın ___products API'si, her kapasite kodu grubunda (ör. SGM7A "15" kodu = 1,5 kW gövde) tek bir
//    kayıtta "Anma torku" alanını yanlış gösteriyor (başka bir kapasite kodunun değerini basıyor). Bu, SGM7A'da
//    8, SGM7G'de 7, SGM7J'de 1 kayıtta görüldü (toplam 1.087 kaydın ~%1,5'i). Her durumda doğru değer, aynı
//    kapasite kodundaki diğer onlarca kayıtla VE üreticinin ilgili modelin kendi ürün detay sayfasıyla çapraz
//    kontrol edilerek doğrulanmıştır; uydurma değer kullanılmamıştır.
//  Sipariş kodu sitede "üretimden kalktı" bilgisiyle yayınlanmadığından codes dizisindeki ikinci eleman
//  (discontinued) her kayıtta 0'dır. AOM, Yaskawa'nın yetkili satıcısı/distribütörü olduğunu iddia etmez;
//  sipariş kodu üreticinin sitesinde fiyatla birlikte yayınlanmadığından fiyat/kod yoksa "Teklif isteyin" gösterilir.
import type { Product } from "./magaza";
import raw from "./yaskawa-servo-sigma7-motor_20-10-2026.json";

export type S7MotorSeries = {
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

export const SV_S7MOTOR_SERIES = (raw as unknown as { series: S7MotorSeries[] }).series;
export const SV_S7MOTOR_TOTAL = SV_S7MOTOR_SERIES.reduce((n, s) => n + s.codes.length, 0);
export const s7MotorSeries = (slug: string) => SV_S7MOTOR_SERIES.find((s) => s.slug === slug);

const CATEGORY_S7MOTOR = "Servo Motor ve Sürücüler"; // 20-10-2026: tüm Yaskawa servo alt aileleri tek kategoride
const GROUP_TITLE = "Yaskawa Sigma-7 Rotary Servomotors";
const GROUP_ORDER = 290;

const SERIES_URL: Record<string, string> = {
  SGM7A: "https://www.yaskawa.com.tr/servo-motor-ve-surucu/Sigma-7/rotary-servomotors/seriesdetail/serie/sgm7a_5938",
  SGM7G: "https://www.yaskawa.com.tr/servo-motor-ve-surucu/Sigma-7/rotary-servomotors/seriesdetail/serie/sgm7g_5648",
  SGM7J: "https://www.yaskawa.com.tr/servo-motor-ve-surucu/Sigma-7/rotary-servomotors/seriesdetail/serie/sgm7j_1783",
};

function build(s: S7MotorSeries): Product {
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
    category: CATEGORY_S7MOTOR,
    summary: `${s.note} Seride ${n} kayıt vardır.`,
    image: s.img ? { src: `/magaza/${s.img}`, alt: `Yaskawa ${s.key} Sigma-7 rotary servo motor (temsili görsel)` } : undefined,
    imageNote: "Görsel Yaskawa'nın resmi ürün görselidir ve serinin temsili görselidir; seride modeller arasında ölçü ve gövde farkı olabilir.",
    specs: s.specs.filter(([l]) => l !== "Kayıt sayısı" && l !== "Not").map(([label, value]) => ({ label, value })),
    source: { label: "Yaskawa seri sayfası", url: SERIES_URL[s.key] ?? "https://www.yaskawa.com.tr" },
    specNote:
      "Teknik veriler Yaskawa'nın resmi ürün sayfasından (yaskawa.com.tr) okunarak alınmıştır. Sipariş kodu üreticinin sitesinde yayınlanmamaktadır; güncel kod, teslim süresi ve fiyat için teklif isteyin.",
    groupTitle: GROUP_TITLE,
    groupOrder: GROUP_ORDER,
    option: `${n} kayıt`,
    optionLabel: "Kayıt",
    seoTitle: `Yaskawa ${s.key} Sigma-7 Rotary Servo Motor`,
    metaDescription: `Yaskawa ${s.key}: ${s.title}. ${n} kayıt${facts.length ? "; " + facts.slice(0, 3).join("; ") : ""}.`.slice(0, 300),
    seoText: [
      `Yaskawa ${s.key}, ${s.title.toLocaleLowerCase("tr-TR")}. ${s.note}`,
      "Sigma-7, Yaskawa'nın geniş kullanılan rotary servo motor ailesidir; SGM7A, SGM7G ve SGM7J serileri atalet sınıfı, anma hızı ve tork aralığına göre farklı uygulama sınıflarını kapsar. Sigma-5 motorlar bu site üzerinde ayrı bir seri olarak yayınlanmaz; yalnızca Sigma-7 motor açıklamalarında \"Sigma-5 ile uyumlu flanş\" notu geçer.",
      `Bu serinin ${n} sipariş kodunun tamamı kod sayfasında listelenir; aradığınız kod için teklif isteyebilirsiniz. AOM, servo motor seçimi, sürücü eşleştirme ve devreye alma konusunda destek verir.`,
    ],
    keywords: [s.key, `Yaskawa ${s.key}`, `${s.key} servo motor`, "Yaskawa Sigma-7", "Yaskawa servo motor", "servo motor fiyat", ...s.codes.slice(0, 6).map((c) => String(c[0]))],
    repTable: s.rep.model && s.rep.rows.length ? { model: s.rep.model, rows: s.rep.rows.map(([label, value]) => ({ label, value })) } : undefined,
    codePage: { href: `/magaza/servo-sigma7-motor-kodlari/${s.slug}`, count: n, discontinued: 0 },
  };
}

export const s7MotorProducts: Product[] = SV_S7MOTOR_SERIES.map(build);
