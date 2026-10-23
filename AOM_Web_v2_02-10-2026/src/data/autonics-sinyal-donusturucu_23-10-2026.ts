// Autonics sinyal dönüştürücü / transmitter kodları — 23-10-2026.
//
// KAPSAM: Bu dosya, mağazada ÜRÜN olarak yer ALMAYAN, yalnızca Mert'in sağladığı Autonics 2023 USD
// fiyat listesinde bulunan "CN-" önekli 29 kodu kapsar. Bu kodlar ilk etapta kablo/konnektör
// (CH/CNE/CID/C prefiksleri) kümesiyle birlikte Agent 6'ya verilmişti; Agent 6'nın araştırması bu 29
// kodun kablo/konnektör AİLESİNE AİT OLMADIĞINI, Autonics'in ayrı bir "Sinyal Dönüştürücü /
// Transmitter" ürün grubu olduğunu ortaya çıkardı ve bu yüzden kablo-aksesuar dosyasına eklenmedi;
// ana oturuma ayrı bir kategori kararı için raporlandı. Mert onayıyla (23-10-2026, AskUserQuestion)
// ayrı bu küçük kategori olarak eklendi.
//
// DOĞRULAMA: tequipment.net "Signal Transmitters/Converters/Preamps" kategorisi (Autonics CN serisi
// bu kategoride listeleniyor); CN-502H için ayrıca Vietnamca distribütör kaynağında "Bộ chuyển đổi
// nhiệt độ" (= sıcaklık dönüştürücü) ibaresi geçiyor. CN-6100/6101/6400/6401 ailesinin tam iç mantığı
// (kanal tipi/besleme farkının kesin anlamı) bağımsız üretici kataloğuyla doğrulanamadı; bu yüzden
// sayfada yalnızca fiyat listesindeki açıklama birebir gösterilir, yorum eklenmez (bkz. JSON dosyasındaki
// `desc` alanları).
//
// Model kodları ve açıklamalar doğrudan Mert'in 2026_fiyat_listesi.xlsx dosyasından (Sayfa1) alınmıştır;
// uydurma değer yoktur.
//
// FİYAT: Mert onayı (23-10-2026) — 2023 USD liste fiyatı üzerinden %40 iskonto, diğer Autonics
// kategorileriyle aynı şekilde kamuya açık gösterim (liste fiyatı üstü çizili + net fiyat + "%40
// indirim" rozeti; bkz. @/data/magaza priceInfo()). 29 kodun TAMAMI için fiyat mevcuttur.
import raw from "./autonics-sinyal-donusturucu-kodlari_23-10-2026.json";
import rawPrices from "./autonics-sinyal-donusturucu-fiyat-ham_23-10-2026.json";

export type SinyalDonusturucuKodSeries = {
  sn: number;
  slug: string;
  key: string;
  title: string;
  cat: string;
  desc: string;
  common: [string, string][];
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1, bu kümede hep 0), ...cols sırasıyla]
  img: string | null;
};

type RawPrices = Record<string, number>;

export const SINYAL_DONUSTURUCU_KOD_SERIES: SinyalDonusturucuKodSeries[] = (
  raw as unknown as { series: SinyalDonusturucuKodSeries[] }
).series.sort((a, b) => a.sn - b.sn);

export const SINYAL_DONUSTURUCU_KOD_TOTAL = SINYAL_DONUSTURUCU_KOD_SERIES.reduce((n, s) => n + s.codes.length, 0);

export const sinyalDonusturucuKodSeries = (slug: string) => SINYAL_DONUSTURUCU_KOD_SERIES.find((s) => s.slug === slug);

export const sinyalDonusturucuSlug = (code: string) => `autonics-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export const SINYAL_DONUSTURUCU_SUPPORT: Record<string, string> = {
  "HART Sinyal Transmitteri": "AOM, HART haberleşmeli sinyal transmitteri seçimi ve mevcut proses kontrol sisteminize entegrasyonunda destek verir.",
  "Analog Sinyal İzolatörü / Çeviricisi": "AOM, akım/gerilim/alarm sinyali izolasyonu gereken uygulamalarda doğru kanal sayısı ve tipini birlikte teyit eder.",
};

// Fiyat: 2023 USD liste fiyatı, %40 iskonto (Mert onayı, 23-10-2026), diğer Autonics kategorileriyle aynı kamuya açık gösterim.
export const SINYAL_DONUSTURUCU_PRICES: Record<string, { list: number; currency: "USD"; discountPct: 40 }> = Object.fromEntries(
  Object.entries(rawPrices as RawPrices).map(([code, usd]) => [code, { list: usd, currency: "USD" as const, discountPct: 40 as const }]),
);
