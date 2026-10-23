// Autonics sinyal (pilot) lambaları, kule (tower) ışıkları, döner ikaz (beacon) lambaları ve küçük tip
// LED gösterge lambaları — 23-10-2026.
//
// KAPSAM: Bu dosya, mağazada ÜRÜN olarak yer ALMAYAN, yalnızca Mert'in sağladığı Autonics 2023 USD
// fiyat listesindeki "kuyruk" kümesinde (cluster7_kuyruk_diger.json, diğer kümelere uymayan 3.272 kod)
// bulunan kodları kapsar. Bu aileler daha önce siteye eklenen Autonics kontrol-sinyal kümesindeki
// S/SQ/L/H/SA (buton, seçici anahtar, L-serisi pilot lamba) ailelerinden TAMAMEN AYRIDIR — farklı bir
// model numaralandırması (MT/PL/PLD/PME/ASG/AVG/MLG/MQVX/M0xP/M0xR) kullanır ve o kümenin regex'i
// tarafından yakalanmamıştır.
//
// DOĞRULAMA: Aşağıdaki 28 alt-seri, Autonics'in resmi (autonics.com) model sayfaları ve resmi
// distribütör sayfaları üzerinden TEK TEK doğrulanarak eklendi (23-10-2026 itibarıyla erişildi):
//   - MT4B, MT5B, MT8B (sabit), MT5C, MT8C (sabit/flaşör/sesli) — ampul tip sinyal (kule) lambası:
//     https://baoanjsc.com.vn/products/ø45-mm-bulb-tower-lamp--steady-only---autonics-mt4b-series_86165_en.aspx
//     https://www.wolfautomation.com/mt8b3cl-ryg-light-tower-85mm-diameter-steady (Ø85mm MT8B teyidi)
//     https://baoanjsc.com.vn/products/bulb-tower-lamp-steady-flashing-buzzer-autonics-MT5C-1ALP-R_95907_en.aspx
//     https://baoanjsc.com.vn/products/bulb-tower-lamp-steady-flashing-buzzer-autonics-MT8C-1CLG-R_96089_en.aspx
//   - PL4G — "PL4 serisi" Ø45mm kule lambası: https://suryasarana.com/en/PRODUK/Sensor/Signal-Light/Autonics-Tower-Light-PL4-Series.html
//   - PLDS, PLDM, PLDL — Ø25mm alüminyum gövdeli ince tip kule lambası (PLD serisi):
//     https://baoanjsc.com.vn/products/ø25mm-aluminum-body-tower-lamp-autonics-PLDS-102-R_86756_en.aspx (ve PLDM/PLDL kardeş sayfaları)
//     https://suryasarana.com/en/PRODUK/Sensor/Signal-Light/Autonics-Tower-Light-PLD-Series.html
//   - PMEP, PMEG, PMEGF — Ø45mm LED kule lambası (PME serisi), RESMİ autonics.com model sayfaları:
//     https://www.autonics.com/glb/model/PMEG-102-R ("D45mm LED Tower Light")
//     https://www.autonics.com/tr/model/PMEP-102-B ("45mm Çoklu Tip LED Kule Işığı")
//   - ASG, ASGF — Ø86mm döner ikaz (beacon) lambası: https://www.autonics.com/glb/model/ASGF-01-B ("D86mm Bulb Revolving Warning Signal Light")
//     https://www.wolfautomation.com/beacon-o86mm-rotating-12vac-dc-blue
//   - ASGB — Ø86mm döner ikaz lambası, sesli (buzzer) uyarılı: https://wolfautomation.com/beacon-o86mm-rotating-w-buzzer-24vac-dc-red
//   - AVG, AVGB — Ø135mm döner ikaz (beacon) lambası: https://baoanjsc.com.vn/products/d135mm-bulb-type-rotation-warning-light-autonics-avg-series_79936_en.aspx
//   - MLG, MLGF — Ø66mm döner ikaz (beacon) lambası: https://baoanjsc.com.vn/products/ø66mm-bulb-revolving-warning-signal-light-autonics-MLG-02-Y_80148_en.aspx
//   - MQVX — ikaz (uyarı) lambası: https://baa.vn/document/mqvx-series-autonics-den-canh-bao-4519-catalog1.pdf ("đèn cảnh báo" = uyarı lambası)
//   - M06P/M08P/M10P/M12P (çıkıntılı/protrude lens), M06R/M08R/M10R/M12R/M16R (yuvarlak/round lens) —
//     küçük panel tipi LED gösterge (pilot) lambası: https://baoanjsc.com.vn/products/led-indicators-autonics-M10P-12G_394016_en.aspx
//     (ve M06P/M08P/M06R/M08R kardeş sayfaları, "Led indicators AUTONICS" başlığıyla)
//
// HARİÇ TUTULANLAR [TEYİT EDİLEMEDİ veya BAŞKA ÜRÜN]: Fiyat listesinin aynı kuyruk kümesinde görünen
// şu kodlar bu kataloğa EKLENMEDİ:
//   - PRGB (18 kod), PRPZ (14 kod), MSGT (18 kod), PLG (19 kod), PLP (17 kod): isim deseni diğer
//     ailelerle (PME/PL4G vb.) tutarlı görünse de, bağımsız bir distribütör/üretici sayfasıyla TEK TEK
//     doğrulanamadı; "muhtemelen aynı sinyal lambası ailesi" varsayımıyla eklenmedi.
//   - MT4-C/-G, MT5-B/-C/-Y (toplam 5 kod, "GLOBE Ø45/Ø56 H=…mm" açıklamalı): MT4/MT5 kule lambalarının
//     YEDEK cam/lens kapağı (aksesuar) kodlarıdır, bağımsız ürün değildir.
//   - MT4W-C, MT4Y-AA-47 (2 kod): bunlar kule lambası DEĞİL, Autonics MT4W/MT4Y dijital panel metre
//     ailesindendir — bu aile zaten sitede "Dijital Panel Metre" kod sayfalarında (autonics-kontrol-kodlari)
//     ayrı olarak yer alıyor; mükerrer eklenmedi.
//   - MAB-T, MAM, MAP, MD5-H, MWEB, MWEF, MPZ-56, MN-, MPLN- gibi diğer "M*" alt-kodlar (toplam ~60 kod):
//     ürün tipi bağımsız kaynakla doğrulanamadı (bazıları lamba/ampul yedek parçası olabilir).
//
// SÜTUNLAR: "Gerilim / açıklama" ve "Açıklama" sütunları, fiyat listesindeki "desc" alanının
// temizlenmiş (anlamsız "0"/"." değerleri boşaltılmış) birebir halidir — yorum/tahmin YOK. Renk bilgisi
// çoğunlukla kodun kendi son harfinde (R/G/Y/B/C/W) yer aldığından ve her kombinasyon (çoklu kat/stack
// renk kombinasyonları dahil) için güvenilir bir harf-renk eşlemesi kurulamadığından ayrı bir "Renk"
// sütunu OLUŞTURULMADI (uydurma yok). Üretim durumu bu fiyat listesinde yer almadığından tüm kodlar
// "Üretimde" varsayılmıştır [TEYİT: kodların tamamı hâlâ resmi distribütör sayfalarında satışta görünüyor].
//
// FİYAT: Mert onayı (23-10-2026) — 2023 USD liste fiyatı üzerinden %40 iskonto, diğer Autonics kod
// sayfalarıyla AYNI şekilde kamuya açık gösterim (liste fiyatı üstü çizili + net fiyat + "%40 indirim"
// rozeti; bkz. @/data/magaza priceInfo()). 670 kodun TAMAMI için fiyat mevcuttur.
import raw from "./autonics-kuyruk-sinyal-lambasi-kodlari_23-10-2026.json";
import rawPrices from "./autonics-kuyruk-sinyal-lambasi-fiyat-ham_23-10-2026.json";

export type SinyalLambasiKodSeries = {
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

export const SINYAL_LAMBASI_KOD_SERIES: SinyalLambasiKodSeries[] = (raw as unknown as { series: SinyalLambasiKodSeries[] }).series.sort(
  (a, b) => (a.cat === b.cat ? a.key.localeCompare(b.key, "tr") : a.cat.localeCompare(b.cat, "tr")),
);

export const SINYAL_LAMBASI_KOD_TOTAL = SINYAL_LAMBASI_KOD_SERIES.reduce((n, s) => n + s.codes.length, 0);

export const sinyalLambasiKodSeries = (slug: string) => SINYAL_LAMBASI_KOD_SERIES.find((s) => s.slug === slug);

export const sinyalLambasiSlug = (code: string) => `autonics-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

// Kategoriye göre kısa AOM destek cümlesi (iddia içermez)
export const SINYAL_LAMBASI_SUPPORT: Record<string, string> = {
  "Ampul tip sinyal (kule) lambaları": "AOM, kule lambası gövde/kat (tier) seçimi ve pano/makine montajı konusunda destek verir.",
  "LED tip sinyal (kule) lambaları": "AOM, LED kule lambası gövde/kat seçimi ve pano/makine montajı konusunda destek verir.",
  "Döner ikaz (beacon) lambaları": "AOM, döner ikaz lambası (beacon) seçimi ve makine üstü montajı konusunda destek verir.",
  "Küçük tip LED gösterge lambaları": "AOM, küçük LED gösterge lambası seçimi ve pano montajı konusunda destek verir.",
};

// Fiyat: 2023 USD liste fiyatı, %40 iskonto (Mert onayı, 23-10-2026), diğer Autonics kod sayfalarıyla aynı gösterim.
export const SINYAL_LAMBASI_PRICES: Record<string, { list: number; currency: "USD"; discountPct: 40 }> = Object.fromEntries(
  Object.entries(rawPrices as RawPrices).map(([code, usd]) => [code, { list: usd, currency: "USD" as const, discountPct: 40 as const }]),
);
