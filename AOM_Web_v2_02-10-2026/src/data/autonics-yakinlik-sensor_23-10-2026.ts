// Autonics endüktif (indüktif) yakınlık sensörleri — PR ailesi (standart silindirik gövde,
// çok sayıda gövde/bağlantı/çıkış varyantı) — 23-10-2026.
//
// KAPSAM: Bu dosya, mağazada ÜRÜN olarak yer ALMAYAN, yalnızca Mert'in sağladığı Autonics 2023 USD
// fiyat listesinde bulunan PR ailesine ait 730 kodu kapsar. Kaynak küme: 2026_fiyat_listesi.xlsx
// içindeki "yakınlık sensörü + fotoelektrik sensör + vision sensör" olarak gruplanan 2.177 kodluk
// kümenin (cluster3_yakinlik_fotoelektrik_vision.json) PR/PRD/PRDW/PRWT/PRDT/PRCM/PRL/PRDCM/PRT/
// PRWL/PRCMT/PRDLT/PRDCMT/PRDL/PRCML/PRDCML/PRW alt kısmı.
//
// DOĞRULAMA (23-10-2026 itibarıyla erişildi): "PR" ön eki, görevde ilk varsayımın aksine FOTOELEKTRİK
// değil, Autonics'in ENDÜKTİF YAKINLIK SENSÖRÜ ailesidir — resmi distribütör sayfaları bunu açıkça
// "Inductive ... Type PR/PRW Series" olarak sınıflandırır:
//   https://www.instrumart.com/products/18460/autonics-pr-series-proximity-sensors
//   https://www.suryasarana.com/en/PRODUK/Sensor/Sensors/Autonics-Proximity-Sensors-Inductive-Standard-Type-PR-Series.html
//   https://www.suryasarana.com/en/PRODUK/Sensor/Sensors/Autonics-Proximity-Sensors-Inductive-Standard-Type-PRW-Series.html
//   https://www.wolfautomation.com/pr08-2dn2-inductive-proximity-sensor-o8mm-2mm-range
//   https://www.wolfautomation.com/prcm30-15dn-inductive-proximity-sensor-15mm-sen (PRCM)
//   https://www.wolfautomation.com/prl18-5dp-inductive-proximity-sensor-5mm-sensin (PRL)
//   https://www.tequipment.net/Autonics/PRDWT08-4DC/Photoelectric/Proximity/Fiber-Optic-Sensors/ (PRDW/PRWT ailesi)
//   https://www.tequipment.net/Autonics/series_autonics-prcmt08-series (PRCMT)
//   https://www.tequipment.net/Autonics/PRDCMT08-2DO/Photoelectric-/-Proximity-/-Fiber-Optic-Sensors/ (PRDCMT)
//   https://www.tequipment.net/Autonics/PRDCML12-4DP/Photoelectric-/-Proximity-/-Fiber-Optic-Sensors/ (PRDCML)
// 17 alt ön ekin TAMAMI, Autonics distribütörlerinin model sayfalarında "Autonics PR<ek> ... inductive
// proximity sensor" olarak listelenen gerçek kodlarla (ör. PRD08-2DN2, PRDW08-2DN2, PRWT08-1.5DC,
// PRDT08-2DC, PRCM08-1.5DN, PRL08-1.5DN, PRDCM08-2DN, PRT08-1.5DC, PRWL08-1.5DN, PRCMT08-1.5DC,
// PRDLT12-4DC, PRDCMT08-2DC, PRDL12-4DN, PRCML18-5DN, PRDCML12-4DN, PRW08-1.5DN) birebir eşleşerek
// doğrulanmıştır — her ek, aynı PR ailesinin bir gövde/bağlantı/kılıf varyantıdır. Her harfin TEK TEK
// ne anlama geldiği (ör. hangi harf "çift mesafe", hangisi "kimyasala dayanıklı" vb.) bağımsız bir
// kaynaktan doğrulanamadığından bu dosyada İDDİA EDİLMEMİŞTİR; yalnızca "PR ailesinin bir gövde/
// bağlantı varyantı" olarak anılmıştır.
//
// HARİÇ TUTULAN (bu fiyat listesi kümesindeki diğer ön ekler, AYRI dosyalarda/kategorilerde veya tamamen
// dışarıda): BJ/BJR/BW/BS/BRQP/BRQM/BRQT/BRQPS → fotoelektrik sensör (bkz. autonics-fotoelektrik-sensor_23-10-2026.ts),
// VG → vision sensör (bkz. autonics-vision-sensor_23-10-2026.ts). MS/MSP/MSGS/MW/ML/MP/MAL (791 kod) görevde
// "yakınlık sensörü" varsayılmıştı; araştırma bunların Autonics SİNYAL/TOWER IŞIĞI (signal light / tower
// light / revolving warning light) ailesi olduğunu gösterdi — SENSÖR DEĞİL, bu nedenle hiçbir sensör
// kategorisine eklenmedi: https://www.suryasarana.com/en/PRODUK/Sensor/Signal-Light/Autonics-Tower-Light-ML8-Series.html ,
// .../Autonics-Tower-Light-MP8-Series.html , .../Autonics-Signal-Light-MW86T-Series.html ,
// .../Autonics-Tower-Light-MSGS-Series.html , https://baoanjsc.com.vn/products/ø115mm-xenon-lamp-signal-lights-autonics-ms115s-series_79897_en.aspx .
// LQ (30 kod) → kare tip PİLOT LAMBA (sensör değil): https://tequipment.net/Autonics/LQ3RF-L4RD/Work-Lighting-and-String-Lighting .
// ASL (25 kod) → SSR terminal bloğu aksesuarı (sensör değil): https://baoanjsc.com.vn/products/ssr-terminal-block-screwless-type-autonics-ASL-L01MP0-NY_130209_en.aspx .
// CO (100 kod) → PLC/servo sürücü I/O bağlantı kablosu (sensör değil): https://baa.vn/document/co-series-autonics-cap-ket-noi-i-o-6258-catalog1.pdf .
// ARIO + ARD (99 kod) → görevde "vision sensör" varsayılmıştı; araştırma bunların Autonics ARIO ince
// tip UZAKTAN I/O (remote I/O / distributed I/O) sistemi ve bu sistemin I/O genişletme modülleri
// olduğunu gösterdi — vision sensör DEĞİL: https://www.hamburg.allaboutautomation.de/en/products/ario-series-slim-remote-io-308307/ ,
// https://control.com/news/autonics-ario-packing-i-o-capability-into-a-small-form-factor/ ,
// https://www.directindustry.com/prod/autonics/product-23164-588441.html (ARD-D Network I/O module).
// Bu 1.045 kod (791+30+25+100+99) hiçbir yeni sensör kategorisine EKLENMEDİ.
//
// SÜTUN: "Fiyat listesi açıklaması" sütunu, fiyat listesindeki "desc" alanının temizlenmiş (anlamsız
// "0"/"."/boş değerleri boşaltılmış) birebir halidir; yorum/tahmin YOK. Üretim durumu bu fiyat
// listesinde yer almadığından TÜM kodlar "Üretimde" varsayılmıştır [TEYİT: kodların tamamı hâlâ resmi
// distribütör sayfalarında satışta görünmektedir].
//
// FİYAT: Mert onayı (23-10-2026) — 2023 USD liste fiyatı üzerinden %40 iskonto, DPU3/kontrol-sinyal
// ile AYNI kamuya açık gösterim (liste fiyatı üstü çizili + net fiyat + "%40 indirim" rozeti; bkz.
// @/data/magaza priceInfo()). 730 kodun TAMAMI için fiyat mevcuttur.
import raw from "./autonics-yakinlik-sensor-kodlari_23-10-2026.json";
import rawPrices from "./autonics-yakinlik-sensor-fiyat-ham_23-10-2026.json";

export type YakinlikSensorKodSeries = {
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

export const YAKINLIK_SENSOR_KOD_SERIES: YakinlikSensorKodSeries[] = (raw as unknown as { series: YakinlikSensorKodSeries[] }).series.sort((a, b) =>
  a.key.localeCompare(b.key, "tr"),
);

export const YAKINLIK_SENSOR_KOD_TOTAL = YAKINLIK_SENSOR_KOD_SERIES.reduce((n, s) => n + s.codes.length, 0);

export const yakinlikSensorKodSeries = (slug: string) => YAKINLIK_SENSOR_KOD_SERIES.find((s) => s.slug === slug);

export const yakinlikSensorSlug = (code: string) => `autonics-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

// Fiyat: 2023 USD liste fiyatı, %40 iskonto (Mert onayı, 23-10-2026), DPU3/kontrol-sinyal ile aynı gösterim.
export const YAKINLIK_SENSOR_PRICES: Record<string, { list: number; currency: "USD"; discountPct: 40 }> = Object.fromEntries(
  Object.entries(rawPrices as RawPrices).map(([code, usd]) => [code, { list: usd, currency: "USD" as const, discountPct: 40 as const }]),
);
