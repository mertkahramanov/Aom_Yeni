// Autonics basınç sensörleri / basınç şalterleri / basınç transmiterleri — 23-10-2026.
//
// KAPSAM: Bu dosya, mağazada ÜRÜN olarak yer ALMAYAN, yalnızca Mert'in sağladığı Autonics 2023 USD
// fiyat listesinde (2026_fiyat_listesi.xlsx, "basınç sensörleri" kümesi, 1.735 kod) bulunan kodları
// kapsar. Bu küme sitede satılan Autonics ürünlerinden ve ana oturumun ayrıca işlediği diğer
// kümelerden (SSR, SPR, enkoder, DPU tristör, sıcaklık kontrol / panel metre, buton/sinyal cihazları)
// AYRIDIR.
//
// DOĞRULAMA: Fiyat listesindeki "basınç sensörleri" kümesi 9 kod-öneki içeriyordu: TPS (828),
// PTE (462), PSAN (154), PT (61), PTM (61), PTD (55), KT (44), PTF (42), PSQ (28) — toplam 1.735 kod.
// Her önek Autonics'in resmi dağıtıcı/model sayfaları üzerinden TEK TEK doğrulandı. SONUÇ: önekerin
// SADECE 6'sı gerçekten basınç ürünüdür; PTE / PTM / PTD önekleri ("...-RYG" gibi 3 renkli kod sonekleri)
// Autonics'in SİNYAL (TOWER) IŞIĞI serileridir, PT öneki ise bir SENSÖR DAĞITIM KUTUSUDUR — basınç
// sensörü/şalteri DEĞİLDİR; bu üçü ve PT AŞAĞIDA "HARİÇ TUTULANLAR" bölümünde ayrıntılıdır ve bu
// kataloğa alınMADI. KT öneki de kendi içinde ikiye ayrılır: KT-302H (basınç) dahil edildi, KT-502H
// (sıcaklık) hariç tutuldu.
//
// Dahil edilen 6 alt-aile (prefiks) ve kaynaklar (23-10-2026 itibarıyla erişildi):
//   - TPS20 (90 kod, göstergesiz basınç transmiteri, PF3/8, 0,2-350 kgf/cm² / Bar / PSI aralıkları):
//     https://www.wolfautomation.com/content/autonics-tps20-series-pressure-transmitter-datasheet.pdf
//     https://baoanjsc.com.vn/TaiLieu/Non-indicating-pressure-transmitters-AUTONICS-TPS20-series-MANUAL-3749.pdf
//     https://www.tequipment.net/autonics/series_autonics-tps20-series/
//   - TPS30 (738 kod, paslanmaz çelik gövdeli basınç transmiteri, -0,1 ilâ 60 MPa, 1-5V/4-20mA çıkış,
//     G1/4, G3/8, N1/4, R1/2 bağlantı):
//     https://baoanjsc.com.vn/products/the-pressure-transmitter-autonics-tps30-series-TPS30-G27AN4-00_150941_en.aspx
//     https://www.friedrichshafen.allaboutautomation.de/en/news/tps30-series-stainless-steel-pressure-transmitters-65894/
//     https://www.tequipment.net/autonics/series_autonics-tps30-series/
//   - PTF30 (41 kod + 1 aksesuar [HARİÇ, aşağıya bkz.], göstergeli basınç transmiteri, PF3/8,
//     -760 mmHg ilâ 350 kgf/cm²):
//     https://baoanjsc.com.vn/products/display-type-pressure-transmitters-autonics-ptf30-series_847596_en.aspx
//     https://baa.vn/document/ptf30-series-autonics-cam-bien-ap-suat-loai-hien-thi-8194-catalog.pdf
//   - KT-302H (37 kod, HART haberleşme protokollü basınç transmiteri, PF3/8, -760 mmHg ilâ 350 kgf/cm²):
//     https://www.tequipment.net/Autonics/series_autonics-kt-302h-series/
//     https://baoanjsc.com.vn/TaiLieu/Bo-chuyen-doi-ap-suat-Autonics-KT-302H-Series-Manual_18042020040235.pdf
//     https://www.suryasarana.com/en/PRODUK/Sensor/Sensors/Autonics-Pressure-Sensors-KT-302H-Series.html
//   - PSAN (154 kod, dijital göstergeli basınç sensörü, hava/sıvı tipi, 12-24VDC, -100 kPa ilâ 1 MPa):
//     https://www.controldesign.com/directory/product/11355591/autonics-fluid-air-type-psan-series-pressure-sensors
//     https://www.wolfautomation.com/content/autonics-psan-series-catalog.pdf
//     https://www.newequipment.com/product-directory/automation/sensors/sensors/product/55102561/24601-digital-pressure-sensor
//   - PSQ (28 kod, çiftli dijital göstergeli basınç şalteri, 12-24VDC, -100 ilâ +1000 kPa):
//     https://baoanjsc.com.vn/products/dual-digital-display-pressure-sensors-autonics-psq-series_78698_en.aspx
//     https://testequity.com/product/10283409-PSQ-C1C-RC1-8
//
// HARİÇ TUTULANLAR [doğrulandı, basınç sensörü/şalteri DEĞİL — bu kataloğa alınmadı]:
//   - PTE (462 kod), PTM (61 kod), PTD (55 kod): Autonics sinyal (tower) lambası serileri (Ø60/Ø56/Ø56 mm,
//     "RYG" = kırmızı-sarı-yeşil 3 renkli LED/döner lamba kodu soneki). Örnek doğrulama: "D56mm LED 3
//     colors in 1 tower light AUTONICS PTM series" ve "D56mm LED dome head tower light AUTONICS PTD
//     series" (baoanjsc.com.vn); "Đèn tháp tròn 3 tầng Ø60 Autonics PTE-APV-302-RYG" (tatmart.com);
//     suryasarana.com ürünü "Autonics Tower Light PTD Series" olarak Sensor/Signal-Light kategorisinde
//     listeler. Bu kodlar basınç ailesiyle İLGİSİZDİR; muhtemelen kaynak kümeleme "PT" harfleriyle
//     başlayan tüm kodları basınca dahil ettiği için yanlışlıkla bu kümeye girmiştir.
//   - PT (61 kod, "PT4-3DN5", "PT8-S3DP5" gibi): Autonics SENSÖR DAĞITIM KUTUSU (I/O modülü) serisidir,
//     basınç sensörü değildir. Doğrulama: "Simplify Sensor Wiring With Autonics PT Series Sensor
//     Distribution Boxes" (control.com); "Sensor I/O module PT series" (directindustry.com);
//     "Autonics Spring Terminal Type Pt Series M12 Sensor Distribution Box" (indiamart.com).
//   - KT-502H (7 kod, fiyat listesi açıklamaları "DPt100", "K, -200 to 1350", "PT,0-600°C" gibi):
//     bunlar SICAKLIK transmiteri girişleridir (RTD/termokupl), basınç DEĞİLDİR; KT-302H ile aynı
//     fiziksel gövdeyi paylaşan ayrı bir ölçüm tipi olduğu için KT önekinin basınç alt kümesinden (KT-302H)
//     ayrıştırılarak dışarıda bırakıldı.
//   - "PTF30 BRACKET" (1 kod, fiyat listesinde açıklaması boş): PTF30 serisi için ayrı satılan bir montaj
//     braketi / aksesuar satırıdır, bağımsız bir sipariş kodu (model) değildir; bu nedenle PTF30 seri
//     tablosuna DAHİL EDİLMEDİ.
//
// SÜTUNLAR: "Ölçüm aralığı" ve "Bağlantı tipi" sütunları, fiyat listesindeki "desc" alanından (ve PSAN/
// PSQ için kod içindeki bağlantı sonekinden) yalnızca literal örüntü eşleşmesiyle çıkarılmıştır — yorum/
// tahmin YOK. Ayrıştırılamayan veya belirsiz kalan birkaç satırda (ör. "TPS20-G1ZF8-00" ailesindeki Z
// kodlu / seçime bağlı aralık satırları) ölçüm aralığı sütunu eksik/kısmi kalabilir; bu durumda doğru
// değer son sütundaki "Fiyat listesi açıklaması" alanında (fiyat listesindeki ham metin, aynen) görülebilir.
// "Braket" sütunu (PTF30, KT-302H), fiyat listesi açıklamasında "Braket" kelimesi geçip geçmediğine göre
// dolduruldu. Üretim durumu (üretimde/üretimden kalktı) bu fiyat listesinde yer almadığından TÜM kodlar
// "Üretimde" varsayılmıştır [TEYİT: Mert'in listesi Autonics'in güncel (2023) kataloğu olduğundan ve
// kodların tamamı hâlâ resmi distribütör sayfalarında satışta göründüğünden, aksi belirtilmediği sürece
// güncel kabul edilmiştir].
//
// FİYAT: Mert onayı (23-10-2026) — 2023 USD liste fiyatı üzerinden %40 iskonto, DPU3 ürünleriyle AYNI
// şekilde kamuya açık gösterim (liste fiyatı üstü çizili + net fiyat + "%40 indirim" rozeti; bkz.
// @/data/magaza priceInfo()). 1.088 kodun TAMAMI için fiyat mevcuttur (bu küme zaten yalnızca Mert'in
// fiyat listesinden geliyor).
import raw from "./autonics-basinc-sensor-kodlari_23-10-2026.json";
import rawPrices from "./autonics-basinc-sensor-fiyat-ham_23-10-2026.json";

export type BasincSensorKodSeries = {
  sn: number;
  slug: string;
  key: string;
  title: string;
  cat: string;
  desc: string;
  common: [string, string][];
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1), ...cols sütunları, Fiyat listesi açıklaması]
  img: string | null;
};

type RawPrices = Record<string, number>;

export const BASINC_SENSOR_KOD_SERIES: BasincSensorKodSeries[] = (raw as unknown as { series: BasincSensorKodSeries[] }).series.sort(
  (a, b) => (a.cat === b.cat ? a.key.localeCompare(b.key, "tr") : a.cat.localeCompare(b.cat, "tr")),
);

export const BASINC_SENSOR_KOD_TOTAL = BASINC_SENSOR_KOD_SERIES.reduce((n, s) => n + s.codes.length, 0);

export const basincSensorKodSeries = (slug: string) => BASINC_SENSOR_KOD_SERIES.find((s) => s.slug === slug);

export const basincSensorSlug = (code: string) => `autonics-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

// Kategoriye göre kısa AOM destek cümlesi (iddia içermez)
export const BASINC_SENSOR_SUPPORT: Record<string, string> = {
  "Basınç transmiterleri": "AOM, basınç transmiteri seçimi, ölçüm aralığı ve proses bağlantısı konusunda destek verir.",
  "Dijital basınç şalterleri": "AOM, basınç şalteri/sensörü seçimi, ayar noktası (set point) ve proses bağlantısı konusunda destek verir.",
};

// Fiyat: 2023 USD liste fiyatı, %40 iskonto (Mert onayı, 23-10-2026), DPU3 ile aynı kamuya açık gösterim.
export const BASINC_SENSOR_PRICES: Record<string, { list: number; currency: "USD"; discountPct: 40 }> = Object.fromEntries(
  Object.entries(rawPrices as RawPrices).map(([code, usd]) => [code, { list: usd, currency: "USD" as const, discountPct: 40 as const }]),
);
