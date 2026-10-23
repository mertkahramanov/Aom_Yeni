// Autonics "Ai" serisi kapalı çevrim (closed-loop) adım motoru ve sürücüleri — 23-10-2026.
//
// KAPSAM: Bu dosya, mağazada ÜRÜN olarak yer ALMAYAN, yalnızca Mert'in sağladığı Autonics 2023 USD
// fiyat listesindeki "kuyruk" kümesinde (cluster7_kuyruk_diger.json) bulunan Ai-serisi kodları kapsar.
// Bu aile, sitede zaten yer alan Autonics "A"/"AH" (açık çevrim/open-loop) adım motor ürün ailesinden
// AYRIDIR — Ai serisi, dahili enkoderli KAPALI ÇEVRİM (closed-loop) adım motorudur ve ayrı bir ürün
// kategorisidir (kuyruk kümesinin ana oturumdaki "motorlar" kümesi yalnızca "A"/"AH" kodlarını
// kapsadığından bu aile daha önce değerlendirilmemişti).
//
// DOĞRULAMA: Aşağıdaki 7 alt-seri, Autonics'in resmi distribütör/bayi sayfaları üzerinden doğrulandı
// (23-10-2026 itibarıyla erişildi):
//   - AiS, AiS-D (24 VDC, küçük/orta gövde): https://www.tequipment.net/autonics/series_ais-series
//     https://www.tequipment.net/Autonics/series_autonics-ais-d-series/
//   - AiC, AiC-D (24 VDC): https://assets.testequity.com/te1/Documents/pdf/autonics/Autonics_AiC-D-Series_Datasheet_0424.pdf
//   - Ai-M (yalnız motor, PROSTEPPER, "-B" ekli kodlar dahili frenli):
//     https://baoanjsc.com.vn/products/2-phase-closed-loop-stepper-motors-with-built-in-brakes-autonics-ai-m-b-series_815701_en.aspx
//   - AiCA, AiCA-D (tek faz 200-240 VAC, büyük gövde 60-86mm): fiyat listesindeki desc alanı
//     ("200-240VAC^SET", "200-240VAC^DRIVER") ve AiC/AiS ailesiyle birebir aynı kod yapısı (boyut-gövde
//     kodu + SET/sürücü ayrımı) üzerinden, aynı Ai ürün ailesinin AC beslemeli büyük gövde varyantı
//     olarak doğrulandı.
//
// SÜTUNLAR: "Gerilim" ve "Tip (set/sürücü)" sütunları, fiyat listesindeki "desc" alanının "^" işaretine
// göre bölünmesiyle elde edilmiştir (ör. "24VDC^SET" → Gerilim="24VDC", Tip="SET"); yorum/tahmin YOK.
// Ai-M serisinde "^" işareti bulunmadığından (desc: "AI SERVO MOTOR^PROSTEPPER(VER.A)" tek parça)
// bu seri için tek "Açıklama" sütunu kullanılmıştır. Üretim durumu fiyat listesinde yer almadığından
// tüm kodlar "Üretimde" varsayılmıştır.
//
// FİYAT: Mert onayı (23-10-2026) — 2023 USD liste fiyatı üzerinden %40 iskonto, diğer Autonics kod
// sayfalarıyla AYNI şekilde kamuya açık gösterim (bkz. @/data/magaza priceInfo()). 242 kodun TAMAMI
// için fiyat mevcuttur.
import raw from "./autonics-kuyruk-ai-motor-kodlari_23-10-2026.json";
import rawPrices from "./autonics-kuyruk-ai-motor-fiyat-ham_23-10-2026.json";

export type AiMotorKodSeries = {
  sn: number;
  slug: string;
  key: string;
  title: string;
  cat: string;
  desc: string;
  common: [string, string][];
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1), ...cols değerleri, Fiyat listesi açıklaması]
  img: string | null;
};

type RawPrices = Record<string, number>;

export const AI_MOTOR_KOD_SERIES: AiMotorKodSeries[] = (raw as unknown as { series: AiMotorKodSeries[] }).series.sort((a, b) =>
  a.key.localeCompare(b.key, "tr"),
);

export const AI_MOTOR_KOD_TOTAL = AI_MOTOR_KOD_SERIES.reduce((n, s) => n + s.codes.length, 0);

export const aiMotorKodSeries = (slug: string) => AI_MOTOR_KOD_SERIES.find((s) => s.slug === slug);

export const aiMotorSlug = (code: string) => `autonics-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export const AI_MOTOR_SUPPORT = "AOM, kapalı çevrim adım motoru / sürücü seçimi ve mevcut açık çevrim adım motor sistemlerinden geçiş konusunda destek verir.";

// Fiyat: 2023 USD liste fiyatı, %40 iskonto (Mert onayı, 23-10-2026), diğer Autonics kod sayfalarıyla aynı gösterim.
export const AI_MOTOR_PRICES: Record<string, { list: number; currency: "USD"; discountPct: 40 }> = Object.fromEntries(
  Object.entries(rawPrices as RawPrices).map(([code, usd]) => [code, { list: usd, currency: "USD" as const, discountPct: 40 as const }]),
);
