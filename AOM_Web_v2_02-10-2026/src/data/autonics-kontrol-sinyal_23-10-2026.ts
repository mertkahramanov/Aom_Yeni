// Autonics kontrol ve sinyal cihazları (buton, seçici anahtar, acil durdurma, mantar başlı buton,
// anahtarlı seçici, sinyal/pilot lambası, LED gösterge, kontak bloğu) — 23-10-2026.
//
// KAPSAM: Bu dosya, mağazada ÜRÜN olarak yer ALMAYAN, yalnızca Mert'in sağladığı Autonics 2023 USD
// fiyat listesinde (2026_fiyat_listesi.xlsx, "buton/anahtar/sinyal" kümesi, 8.522 kod) bulunan
// kodları kapsar. Bu küme sitede satılan Autonics SSR, SPR, enkoder, DPU tristör, sıcaklık kontrol /
// panel metre ürünlerinden AYRIDIR (onlar ana oturum tarafından ayrıca ele alınmıştır).
//
// DOĞRULAMA: Aşağıdaki 36 alt-aile (prefiks), Autonics'in resmi dağıtıcı/model sayfaları üzerinden
// TEK TEK doğrulanarak eklendi (ürün tipi: buton / seçici anahtar / acil durdurma / mantar başlı buton /
// anahtarlı seçici / sinyal lambası / LED gösterge / kontak bloğu). Kaynaklar (23-10-2026 itibarıyla erişildi):
//   - S2SRN, S2SR, S3SFN, S3SF (seçici anahtarlar, Ø22-25 ve Ø30):
//     https://assets.testequity.com/te1/Documents/pdf/autonics/Autonics_S3SF-Series_Brochure_0424.pdf
//     https://www.tequipment.net/Autonics/series_autonics-s2srn-l-series/
//     https://www.wolfautomation.com/s2sr-s3w-selector-switch-extended-head-only-o2
//   - S16SR / S16SRS / S16SRT (Ø16 seçici anahtar, 3 gövde varyantı):
//     https://www.tequipment.net/Autonics/series_autonics-s16srs-series/
//     https://www.tequipment.net/autonics/series_autonics-s16srt-series/
//   - S2KR, S3KF, S16KR / S16KRS / S16KRT (anahtarlı/kilitli seçiciler):
//     https://baoanjsc.com.vn/TaiLieu/Ø16-Key-selector-switches-AUTONICS-S16KR-series-4131-CATALOG.pdf
//     https://www.tequipment.net/Autonics/S2KR-2FK/Electrical-Switches/
//   - SQ3PFS, S2PR, S2PRS, S3PR, S3PF, S16PR / S16PRS / S16PRT, S2TR (butonlar):
//     https://www.tequipment.net/Autonics/series_sq3pfs-series/ ("Square Type Push Button Switches, Flush, Diameter 30")
//     https://assets.testequity.com/te1/Documents/pdf/autonics/Autonics_S16PR-Series_Datasheet_0424.pdf
//     https://baoanjsc.com.vn/products/ø22-25-mm-io-push-button-switches-autonics-s2tr-series_96843_en.aspx
//     https://baoanjsc.com.vn/products/ø30-push-button-switches-non-illuminated-autonics-S3PF-P1GB_97077_en.aspx
//   - S2ER, S16ER (acil durdurma), S2BR, S16BR (mantar başlı buton):
//     https://baoanjsc.com.vn/TaiLieu/16-Emergency-switches-AUTONICS-S16ER-series-CATALOG-4133.pdf
//     https://baoanjsc.com.vn/products/ø22-25-mushroom-head-push-button-switches-autonics-s2br-series_98150_en.aspx
//     https://baoanjsc.com.vn/products/ø16-mushroom-head-push-button-switches-autonics-s16br-series_97156_en.aspx
//   - L2RR, L3RF, L16RR / L16RRS (sinyal/pilot lambaları):
//     https://baoanjsc.com.vn/products/ø22-25-pilot-lights-autonics-L2RR-L1RD_88130_en.aspx
//     https://baoanjsc.com.vn/TaiLieu/D16-mm-pilot-lights-AUTONICS-L16RR-series-CATALOG-2084.pdf
//   - H06F, H08F, H10F, H12F, H16F (düz tip LED gösterge lambası, Ø6-Ø16):
//     https://baoanjsc.com.vn/products/led-indicators-autonics-H06F-03G_393974_en.aspx (ve aynı ailenin diğer çapları)
//   - SA, SA16 (kontak bloğu / LED lamba modülü aksesuarları):
//     https://baoanjsc.com.vn/document... "Contact blocks AUTONICS SA-CA/SA-CB"; "SA16-L series ... LED contact-light block for Ø16 switch"
//
// HARİÇ TUTULANLAR [TEYİT EDİLEMEDİ]: Fiyat listesindeki şu 25 kod, yukarıdaki doğrulama turunda
// gerçek ürün tipi bağımsız bir kaynakla doğrulanamadığı için bu kataloğa EKLENMEDİ:
//   - L16RRT (20 kod): L16RR / L16RRS doğrulandı, ancak "T" gövde varyantı için ayrı bir distribütör
//     kaydı bulunamadı; isim deseni diğer ailelerdeki (PR/PRS/PRT vb.) S/T varyantlarıyla tutarlı olsa da
//     bağımsız doğrulama yapılamadığı için dışarıda bırakıldı.
//   - L4BM (100-240VAC), L8A (12-24VAC/12-24VDC), L8B (100-240VAC) (3 kod): kod formatı fiyat
//     listesinde bozuk/parantezli göründüğü (gerilim bilgisi kod alanına karışmış) ve ürün tipi
//     (olası sinyal kulesi/buzzer) bağımsız kaynakla doğrulanamadığı için dışarıda bırakıldı.
//   - S08F (1 kod), S10D30066A (BPS COVER) (1 kod, görünüşe göre bir yedek parça/koruma kapağı): tek
//     başına, ailesi belirsiz kodlar; doğrulanamadı.
//
// SÜTUNLAR: Her serinin "Renk" ve "Gerilim" sütunları, fiyat listesindeki "desc" alanından yalnızca
// literal anahtar kelime eşleşmesiyle (BLUE/RED/GREEN/YELLOW/WHITE/BLACK ve "12V"/"24V"/"AC110V" gibi
// kalıplar) çıkarılmıştır — yorum/tahmin YOK. "Fiyat listesi açıklaması" sütunu, fiyat listesindeki
// "desc" alanının temizlenmiş (anlamsız "0"/"." değerleri boşaltılmış) birebir halidir. Üretim durumu
// (üretimde/üretimden kalktı) bu fiyat listesinde yer almadığından TÜM kodlar "Üretimde" varsayılmıştır
// [TEYİT: Mert'in listesi Autonics'in güncel (2023) kataloğu olduğundan ve kodların tamamı hâlâ resmi
// distribütör sayfalarında satışta göründüğünden, aksi belirtilmediği sürece güncel kabul edilmiştir].
//
// FİYAT: Mert onayı (23-10-2026) — 2023 USD liste fiyatı üzerinden %40 iskonto, DPU3 ürünleriyle AYNI
// şekilde kamuya açık gösterim (liste fiyatı üstü çizili + net fiyat + "%40 indirim" rozeti; bkz.
// @/data/magaza priceInfo()). 8.497 kodun TAMAMI için fiyat mevcuttur (bu küme zaten yalnızca Mert'in
// fiyat listesinden geliyor).
import raw from "./autonics-kontrol-sinyal-kodlari_23-10-2026.json";
import rawPrices from "./autonics-kontrol-sinyal-fiyat-ham_23-10-2026.json";

export type KontrolSinyalKodSeries = {
  sn: number;
  slug: string;
  key: string;
  title: string;
  cat: string;
  desc: string;
  common: [string, string][];
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1), Renk, Gerilim, Fiyat listesi açıklaması]
  img: string | null;
};

type RawPrices = Record<string, number>;

export const KONTROL_SINYAL_KOD_SERIES: KontrolSinyalKodSeries[] = (raw as unknown as { series: KontrolSinyalKodSeries[] }).series.sort(
  (a, b) => (a.cat === b.cat ? a.key.localeCompare(b.key, "tr") : a.cat.localeCompare(b.cat, "tr")),
);

export const KONTROL_SINYAL_KOD_TOTAL = KONTROL_SINYAL_KOD_SERIES.reduce((n, s) => n + s.codes.length, 0);

export const kontrolSinyalKodSeries = (slug: string) => KONTROL_SINYAL_KOD_SERIES.find((s) => s.slug === slug);

export const kontrolSinyalSlug = (code: string) => `autonics-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

// Kategoriye göre kısa AOM destek cümlesi (iddia içermez)
export const KONTROL_SINYAL_SUPPORT: Record<string, string> = {
  "Seçici anahtarlar": "AOM, seçici anahtar seçimi ve pano montajı konusunda destek verir.",
  "Anahtarlı (kilit) seçiciler": "AOM, anahtarlı (kilitli) seçici seçimi ve pano montajı konusunda destek verir.",
  Butonlar: "AOM, buton seçimi, renk/gerilim kombinasyonu ve pano montajı konusunda destek verir.",
  "Acil durdurma ve mantar başlı butonlar": "AOM, acil durdurma devresi tasarımı ve mantar başlı buton seçimi konusunda destek verir.",
  "Sinyal lambaları (pilot lamba)": "AOM, sinyal lambası seçimi, renk/gerilim kombinasyonu ve pano montajı konusunda destek verir.",
  "LED gösterge lambaları (düz tip)": "AOM, LED gösterge lambası seçimi ve pano montajı konusunda destek verir.",
  "Kontak blokları ve aksesuarlar": "AOM, mevcut buton/anahtar gövdenize uygun kontak bloğu veya lamba modülü seçiminde destek verir.",
};

// Fiyat: 2023 USD liste fiyatı, %40 iskonto (Mert onayı, 23-10-2026), DPU3 ile aynı kamuya açık gösterim.
export const KONTROL_SINYAL_PRICES: Record<string, { list: number; currency: "USD"; discountPct: 40 }> = Object.fromEntries(
  Object.entries(rawPrices as RawPrices).map(([code, usd]) => [code, { list: usd, currency: "USD" as const, discountPct: 40 as const }]),
);
