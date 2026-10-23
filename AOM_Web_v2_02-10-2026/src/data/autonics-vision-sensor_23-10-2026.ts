// Autonics vision (görüntü işleme) sensörleri — VG serisi — 23-10-2026.
//
// KAPSAM: Bu dosya, mağazada ÜRÜN olarak yer ALMAYAN, yalnızca Mert'in sağladığı Autonics 2023 USD
// fiyat listesinde bulunan VG serisine ait 24 kodu kapsar. Kaynak küme: 2026_fiyat_listesi.xlsx
// içindeki "yakınlık sensörü + fotoelektrik sensör + vision sensör" olarak gruplanan 2.177 kodluk
// kümenin (cluster3_yakinlik_fotoelektrik_vision.json) vision sensör alt kısmı.
//
// DOĞRULAMA (23-10-2026 itibarıyla erişildi):
//   https://baoanjsc.com.vn/products/autonics-vg-series-vision-sensor_74716_en.aspx ("Autonics VG series vision sensor")
//   https://control.com/news/autonics-vision-sensors-offer-compact-flexible-inspection/
//   https://motionworld.com/assets/VG-Series-Manual.pdf
//   https://www.chemnitz.allaboutautomation.de/en/products/vg2-series-03m-12m-color-monochrome-vision-sensors-303753/
//     ("VG2 Series 0.3M–1.2M Color/Monochrome Vision Sensors")
//
// ÖNEMLİ — GÖREVDE "VİZYON SENSÖR" VARSAYILAN ANCAK DOĞRULANAMAYAN/YANLIŞ ÇIKAN KODLAR: Görev
// tanımında ARIO ve ARD ön ekleri "ARIO Autonics'in bilinen akıllı vizyon sensörü serisidir" denilerek
// vision sensör ailesine dahil edilmesi istenmişti. Araştırma bunun YANLIŞ olduğunu gösterdi: ARIO,
// Autonics'in ince tip UZAKTAN I/O (slim remote I/O / distributed I/O) sistemidir — vision sensör
// DEĞİLDİR; ARD ise bu I/O sisteminin genişletme modülleridir (fiyat listesindeki ARIO-BASE/ARIO-BODY/
// ARIO-C (Coupler)/ARIO-P (Power Module)/ARIO-S (I/O Module) ve ARD-DI/ARD-DO/ARD-DX/ARD-AI/ARD-AO
// kodlarının "desc" alanları da bunu doğrular: BASE, BODY, Coupler(CC-Link/DeviceNet/EtherCAT/...),
// Power Module, NPN/PNP/Relay/SSR dijital I/O, analog I/O — hiçbiri kamera/görüntü sensörü tanımı
// taşımaz). Kaynaklar:
//   https://www.hamburg.allaboutautomation.de/en/products/ario-series-slim-remote-io-308307/ ("ARIO Series Slim Remote IO")
//   https://control.com/news/autonics-ario-packing-i-o-capability-into-a-small-form-factor/
//   https://www.directindustry.com/prod/autonics/product-23164-588441.html ("Network I/O module ARD-D series")
// Bu nedenle ARIO (75 kod) ve ARD (24 kod), toplam 99 kod, bu kataloğa EKLENMEDİ ve hiçbir sensör
// kategorisine dahil edilmedi (bkz. autonics-yakinlik-sensor_23-10-2026.ts dosya başlığındaki tam hariç
// tutma listesi).
//
// SÜTUN: "Fiyat listesi açıklaması" sütunu, fiyat listesindeki "desc" alanının temizlenmiş (anlamsız
// "0"/"."/boş değerleri boşaltılmış) birebir halidir; yorum/tahmin YOK. Üretim durumu bu fiyat
// listesinde yer almadığından TÜM kodlar "Üretimde" varsayılmıştır.
//
// FİYAT: Mert onayı (23-10-2026) — 2023 USD liste fiyatı üzerinden %40 iskonto, DPU3/kontrol-sinyal ile
// AYNI kamuya açık gösterim (liste fiyatı üstü çizili + net fiyat + "%40 indirim" rozeti; bkz.
// @/data/magaza priceInfo()). 24 kodun TAMAMI için fiyat mevcuttur.
import raw from "./autonics-vision-sensor-kodlari_23-10-2026.json";
import rawPrices from "./autonics-vision-sensor-fiyat-ham_23-10-2026.json";

export type VisionSensorKodSeries = {
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

export const VISION_SENSOR_KOD_SERIES: VisionSensorKodSeries[] = (raw as unknown as { series: VisionSensorKodSeries[] }).series.sort((a, b) =>
  a.key.localeCompare(b.key, "tr"),
);

export const VISION_SENSOR_KOD_TOTAL = VISION_SENSOR_KOD_SERIES.reduce((n, s) => n + s.codes.length, 0);

export const visionSensorKodSeries = (slug: string) => VISION_SENSOR_KOD_SERIES.find((s) => s.slug === slug);

export const visionSensorSlug = (code: string) => `autonics-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

// Fiyat: 2023 USD liste fiyatı, %40 iskonto (Mert onayı, 23-10-2026), DPU3/kontrol-sinyal ile aynı gösterim.
export const VISION_SENSOR_PRICES: Record<string, { list: number; currency: "USD"; discountPct: 40 }> = Object.fromEntries(
  Object.entries(rawPrices as RawPrices).map(([code, usd]) => [code, { list: usd, currency: "USD" as const, discountPct: 40 as const }]),
);
