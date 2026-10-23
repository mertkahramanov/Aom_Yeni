// Autonics fotoelektrik sensörleri — kompakt (küp tip)/fotomikro gövdeli, alan (area) ve silindirik
// gövdeli aileler — 23-10-2026.
//
// KAPSAM: Bu dosya, mağazada ÜRÜN olarak yer ALMAYAN, yalnızca Mert'in sağladığı Autonics 2023 USD
// fiyat listesinde bulunan BJ/BJR/BS/BW/BRQP/BRQM/BRQT/BRQPS ailelerine ait 378 kodu kapsar. Kaynak
// küme: 2026_fiyat_listesi.xlsx içindeki "yakınlık sensörü + fotoelektrik sensör + vision sensör"
// olarak gruplanan 2.177 kodluk kümenin (cluster3_yakinlik_fotoelektrik_vision.json) fotoelektrik alt
// kısmı.
//
// DOĞRULAMA (23-10-2026 itibarıyla erişildi), resmi distribütör model/katalog sayfaları üzerinden:
//   - BJ (kompakt/küp tip, entegre amplifikatörlü fotoelektrik sensör):
//     https://www.controldesign.com/directory/product/11355597/autonics-industrial-sensors-autonics-bj-series-photoelectric-sensors
//     https://www.suryasarana.com/en/PRODUK/Sensor/Sensors/Autonics-Photoelectric-Sensors-Compact-Type-BJ-Series.html
//   - BJR (BJ ailesinin yağa/suya dayanıklı gövdeli varyantı):
//     https://www.tequipment.net/Autonics/series_bjr-series/
//     https://baa.vn/document/bjr-series-autonics-cam-bien-quang-dien-chong-dau-chiu-dau-124-catalog1.pdf
//       ("cảm biến quang điện chống dầu chịu dầu" = yağa dayanıklı fotoelektrik sensör)
//   - BS (fotomikro / ultra kompakt gövdeli fotoelektrik sensör):
//     https://www.suryasarana.com/en/PRODUK/Sensor/Sensors/Autonics-Photoelectric-Sensors-Photomicro-Type-BS5-Series.html
//     https://directindustry.com/prod/autonics/product-23164-2382443.html
//   - BW (alan/area sensörü — karşılıklı gövdeler arasındaki optik eksen dizisiyle algılama):
//     https://assets.testequity.com/te1/Documents/pdf/autonics/Autonics_BW-Series_Datasheet_0424.pdf
//     https://baoanjsc.com.vn/products/autonics-area-sensor-bw--series-_62654_en.aspx
//   - BRQP / BRQM / BRQT / BRQPS (silindirik gövdeli fotoelektrik sensör ailesi, "BRQ Series"):
//     https://www.tequipment.net/Autonics/series_brq-series/
//     https://baoanjsc.com.vn/products/cylindrical-photoelectric-sensors-new-autonics_76392_en.aspx (BRQM)
//     https://www.wolfautomation.com/brqp100-ddta-photoelectric-diffuse-reflective-se (BRQP)
// Not: Görevde BRQP/BRQM/BRQT/BRQPS için "alan/hat sensörü" varsayılmıştı; doğrulama bunların aslında
// BRQ ailesinin SİLİNDİRİK gövdeli fotoelektrik sensörleri olduğunu, alan (area) sensörünün ise ayrı
// bir aile olan BW serisi olduğunu gösterdi — bu dosyada gerçek doğrulanmış sınıflandırma kullanılmıştır.
//
// HARİÇ TUTULAN (bu fiyat listesi kümesindeki diğer ön ekler): PR ailesi (17 alt ön ek) → endüktif
// yakınlık sensörü (bkz. autonics-yakinlik-sensor_23-10-2026.ts), VG → vision sensör (bkz.
// autonics-vision-sensor_23-10-2026.ts). MS/MSP/MSGS/MW/ML/MP/MAL, LQ, ASL, CO, ARIO, ARD (toplam 1.045
// kod) sensör AİLESİ olmadığı için (sırasıyla: sinyal/tower ışığı, pilot lamba, SSR terminal bloğu,
// PLC/servo I/O kablosu, ARIO uzaktan I/O sistemi ve I/O modülleri) hiçbir sensör kategorisine
// eklenmedi — kaynaklar autonics-yakinlik-sensor_23-10-2026.ts dosyasının başlığında listelenmiştir.
//
// SÜTUN: "Fiyat listesi açıklaması" sütunu, fiyat listesindeki "desc" alanının temizlenmiş (anlamsız
// "0"/"."/boş değerleri boşaltılmış) birebir halidir; yorum/tahmin YOK. Üretim durumu bu fiyat
// listesinde yer almadığından TÜM kodlar "Üretimde" varsayılmıştır.
//
// FİYAT: Mert onayı (23-10-2026) — 2023 USD liste fiyatı üzerinden %40 iskonto, DPU3/kontrol-sinyal ile
// AYNI kamuya açık gösterim (liste fiyatı üstü çizili + net fiyat + "%40 indirim" rozeti; bkz.
// @/data/magaza priceInfo()). 378 kodun TAMAMI için fiyat mevcuttur.
import raw from "./autonics-fotoelektrik-sensor-kodlari_23-10-2026.json";
import rawPrices from "./autonics-fotoelektrik-sensor-fiyat-ham_23-10-2026.json";

export type FotoelektrikSensorKodSeries = {
  sn: number;
  slug: string;
  key: string;
  title: string;
  cat: string;
  desc: string;
  common: [string, string][];
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1), Fiyat listesi açıklaması]
  img: string | null;
};

type RawPrices = Record<string, number>;

export const FOTOELEKTRIK_SENSOR_KOD_SERIES: FotoelektrikSensorKodSeries[] = (
  raw as unknown as { series: FotoelektrikSensorKodSeries[] }
).series.sort((a, b) => (a.cat === b.cat ? a.key.localeCompare(b.key, "tr") : a.cat.localeCompare(b.cat, "tr")));

export const FOTOELEKTRIK_SENSOR_KOD_TOTAL = FOTOELEKTRIK_SENSOR_KOD_SERIES.reduce((n, s) => n + s.codes.length, 0);

export const fotoelektrikSensorKodSeries = (slug: string) => FOTOELEKTRIK_SENSOR_KOD_SERIES.find((s) => s.slug === slug);

export const fotoelektrikSensorSlug = (code: string) => `autonics-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

// Fiyat: 2023 USD liste fiyatı, %40 iskonto (Mert onayı, 23-10-2026), DPU3/kontrol-sinyal ile aynı gösterim.
export const FOTOELEKTRIK_SENSOR_PRICES: Record<string, { list: number; currency: "USD"; discountPct: 40 }> = Object.fromEntries(
  Object.entries(rawPrices as RawPrices).map(([code, usd]) => [code, { list: usd, currency: "USD" as const, discountPct: 40 as const }]),
);
