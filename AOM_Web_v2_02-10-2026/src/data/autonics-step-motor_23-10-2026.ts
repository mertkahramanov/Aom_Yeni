// Autonics step motor / redüktörlü (dişli kutulu) ve aktüatörlü step motor kodları — 23-10-2026.
//
// KAPSAM: Bu dosya, mağazada ÜRÜN olarak yer ALMAYAN, yalnızca Mert'in sağladığı Autonics 2023 USD
// fiyat listesinde (2026_fiyat_listesi.xlsx, "motorlar" kümesi, 191 kod) bulunan step motor / redüktörlü
// motor kodlarını kapsar. Aynı kümedeki 9 kod (1AD00012AA, 2CD00014AC, 2CD00152AB, 2CD00511AA,
// 2CD00512AA, 2CD00609AB, 2CD00730BA, "5PIE 5C SHIELD CABLE (BLACK)", "5PIE 8C SHIELD CABLE (BLACK)")
// step motor YEDEK PARÇASI / AKSESUARI (braket, kaplin, enkoder parçası, ekranlı kablo) olduğundan ve
// talimatın kapsadığı 02K-/04K-/A.../AH... önekleriyle eşleşmediğinden bu dosyaya DAHİL EDİLMEMİŞTİR.
//
// DOĞRULAMA (23-10-2026 itibarıyla erişildi): Fiyat listesindeki kod kökleri, Autonics'in resmi "Step
// Motors & Drivers" (step motor / sürücü) ürün ailesindeki şu 6 alt-seriyle eşleştirilip TEK TEK
// doğrulanmıştır:
//   - AK serisi (standart, dolu mil, redüktörsüz/frensiz; 02K-/04K- ve A1K.../A63K... kökleri dahildir):
//     https://www.wolfautomation.com/content/autonics-ak-motor-a2k-m243-catalog.pdf ("AK/AK-B Series"
//     katalogu; 24 mm gövdede "02K-S523(W), 04K-S525(W)" kodlarını — yani "A" ÖNEKİ OLMADAN — AK
//     serisinin bir parçası olarak listeler, bu da fiyat listesindeki 02K-/04K- köklerini doğrular)
//     https://testequity.com/product/10283134-A3K-S545 , https://testequity.com/product/10283133-A16K-M569
//   - AK-B serisi (AK ile aynı gövde/tork sınıfı + entegre elektromanyetik fren; kod sonu "-B"/"-SB"):
//     https://www.suryasarana.com/en/PRODUK/Motor-and-Drive/Stepping-Motor/Autonics-Stepping-Motor-AK-B-Series.html
//     https://baoanjsc.com.vn/TaiLieu/Dong-co-buoc-5-pha-voi-he-thong-phanh-tich-hop-(loai-truc)-Autonics-AK-B-Series-Catalogue.pdf
//   - AHK serisi (AK ile aynı tork sınıfları, mil ortasından delik geçen OYUK/HOLLOW mil; "AH" önekli
//     kodlar — AH1K.../AH63K...): https://assets.testequity.com/te1/Documents/pdf/autonics/Autonics_AHK-Series_Datasheet_0424.pdf
//     https://www.sustainablesupply.com/products/autonics-stepper-mtr-5-ph-34-fr-hollow-shaft-28a-ah63k-g5913-c1504894
//     ("Hollow Motor Shaft Design") — karşılaştırma için dolu millilerde aynı distribütör
//     "Solid Motor Shaft Design" ifadesini kullanır: https://www.sustainablesupply.com/products/autonics-stepper-mtr-5-ph-23-fr-shaft-type-28a-a16k-g569-c1504886
//     https://baa.vn/document/ahk-series-autonics-dong-co-buoc-5-pha-loai-truc-rong-5140-catalog1.pdf
//   - AK-G serisi (AK gövdesine entegre dişli kutusu/redüktör eklenmiş; kod sonu "-G5"/"-G7.2"/"-G10",
//     fren eklenmişse "-GB5" vb.): https://baoanjsc.com.vn/products/built-in-gear-type-5-phase-stepper-motor-autonics-ak-g-series_814622_en.aspx
//     https://baoanjsc.com.vn/products/built-in-gear-type-5-phase-stepper-motor-autonics-A10K-S545-G5_129753_en.aspx
//     (bu ürün sayfası "-G5" ekinin 1:5 dişli oranına karşılık geldiğini ve "Wire connection: Pentagon"
//     alanını doğrudan teyit eder)
//   - AK-R serisi (AK gövdesine entegre döner aktüatör/rotary actuator eklenmiş; kod sonu
//     "-R5"/"-R7.2"/"-R10", fren eklenmişse "-RB5" vb.):
//     https://baoanjsc.com.vn/products/built-in-rotary-actuator-type-5-phase-stepper-motor-autonics-ak-r-series_815700_en.aspx
//   - AK serisi 2 fazlı alt ailesi ("2 PHASE ... SQUARE" açıklamalı kodlar; A2K-M243, A3K-M244(W),
//     A4K-M245, A6K-G264(W), A9K-G265(W), A16K-G268):
//     https://baoanjsc.com.vn/products/2-phase-stepper-motor-autonics-ak-2-series_43570_en.aspx
//     https://baoanjsc.com.vn/products/2-phase-stepper-motor-autonics_129810_en.aspx (A2K-M243)
//     https://www.globaltestsupply.com/product/autonics-a04k-m245-2-phase-stepping-motor (A4K-M245'i
//     "2-Phase Stepping Motor" olarak doğrular)
//
// SÜTUN ÇIKARIMI (yorum/tahmin YOK, yalnızca fiyat listesindeki "desc" alanından literal çıkarım):
//   - Gövde boyutu (mm): desc'teki "<sayı>mm" veya 2 fazlı aile için "<sayı> SQUARE" değeri.
//   - Tutma torku (kgf-cm) / Akım (A/faz): desc'teki "<sayı> kgf-cm" ve "<sayı>A" değerleri birebir.
//   - Bağlantı tipi (Pentagon/Standard): desc'te literal olarak geçen "Pentagon" veya "Standard" sözcüğü
//     (Autonics'in A10K-S545-G5 ürün sayfasındaki "Wire connection: Pentagon" alanıyla doğrulanan, 5 fazlı
//     step motorlarda standart bir bağlantı/sargı tipi ayrımıdır).
//   - Çift mil: desc'te literal "Double Shaft" ifadesi geçiyorsa "Evet". 2 fazlı ailede desc bu bilgiyi
//     içermediğinden bu sütuna YER VERİLMEMİŞTİR (kod sonundaki "W" harfinden çift mil anlamı
//     ÇIKARILMAMIŞTIR çünkü bu alt ailede bağımsız/literal doğrulaması yoktur).
//   - Redüktör oranı / Aktüatör oranı: AK-G ve AK-R serilerinde, model kodunun SONUNDAKİ "-G<sayı>" /
//     "-GB<sayı>" / "-R<sayı>" / "-RB<sayı>" ekinden ("1/<sayı>" biçiminde) çıkarılmıştır (A10K-S545-G5
//     ürün sayfasıyla 1:5 oranı teyit edilmiştir).
//   - Entegre fren: desc'te literal "Brake" ifadesi geçiyorsa "Var".
//   - "Fiyat listesi açıklaması" sütunu, fiyat listesindeki "desc" alanının birebir (temizlenmemiş) halidir.
//
// BİLİNEN İSTİSNALAR [kaynak listesindeki açıklama birebir aktarılmıştır, DÜZELTİLMEMİŞTİR]:
//   - AH3K-S545: desc alanı "42SQ.HOLLOW SHAFT(OPTION)" biçiminde olup diğer AHK kodlarındaki
//     "<mm>mm-<tork>kgf-cm-<akım>A-Pentagon" kalıbını izlemez; bu nedenle gövde/tork/akım/bağlantı
//     sütunları bu satırda boştur, yalnızca literal açıklama gösterilir.
//   - A16K-M569HW: desc alanı "60-SQUARE HELICAL SHAFT" biçiminde olup aynı kalıbı izlemez; aynı şekilde
//     sayısal sütunlar boş bırakılmış, literal açıklama gösterilmiştir.
//   - AH4K-S564-S: kod sonunda "-S" eki olmasına rağmen desc alanı "Standard" değil "Pentagon" olarak
//     geçer (kaynak listesindeki muhtemel bir tutarsızlık); bu da DÜZELTİLMEMİŞ, birebir aktarılmıştır.
//   - "A16K-M569 (3M)" ve "A41K-G599 (3M)": kodun kendisinde parantezli "(3M)" eki fiyat listesinde
//     olduğu gibi korunmuştur (aynı temel modelin farklı fiyatlı bir varyantı); parantezin anlamı
//     bağımsız doğrulanamadığından YORUMLANMAMIŞ, yalnızca kod ve desc birebir gösterilmiştir.
//
// Üretim durumu (üretimde/üretimden kalktı) bu fiyat listesinde yer almadığından, KONTROL_SINYAL
// dosyasındaki yaklaşımla TUTARLI biçimde, TÜM kodlar "Üretimde" varsayılmıştır [TEYİT: Mert'in listesi
// Autonics'in güncel (2023) kataloğu olduğundan ve kodların tamamı hâlâ resmi distribütör sayfalarında
// satışta göründüğünden].
//
// FİYAT: Mert onayı (23-10-2026) — 2023 USD liste fiyatı üzerinden %40 iskonto, diğer Autonics kod
// kümeleriyle (KONTROL_SINYAL, DPU3 vb.) AYNI şekilde kamuya açık gösterim (liste fiyatı üstü çizili +
// net fiyat + "%40 indirim" rozeti; bkz. @/data/magaza priceInfo()). 182 kodun TAMAMI için fiyat mevcuttur.
import raw from "./autonics-step-motor-kodlari_23-10-2026.json";
import rawPrices from "./autonics-step-motor-fiyat-ham_23-10-2026.json";

export type StepMotorKodSeries = {
  sn: number;
  slug: string;
  key: string;
  title: string;
  cat: string;
  desc: string;
  common: [string, string][];
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1), ...cols sırasıyla..., Fiyat listesi açıklaması]
  img: string | null;
};

type RawPrices = Record<string, number>;

export const STEP_MOTOR_KOD_SERIES: StepMotorKodSeries[] = (raw as unknown as { series: StepMotorKodSeries[] }).series.sort(
  (a, b) => (a.cat === b.cat ? a.key.localeCompare(b.key, "tr") : a.cat.localeCompare(b.cat, "tr")),
);

export const STEP_MOTOR_KOD_TOTAL = STEP_MOTOR_KOD_SERIES.reduce((n, s) => n + s.codes.length, 0);

export const stepMotorKodSeries = (slug: string) => STEP_MOTOR_KOD_SERIES.find((s) => s.slug === slug);

export const stepMotorSlug = (code: string) => `autonics-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

// Kategoriye göre kısa AOM destek cümlesi (iddia içermez)
export const STEP_MOTOR_SUPPORT: Record<string, string> = {
  "5 fazlı step motorlar": "AOM, step motor gövde boyutu, tork ve bağlantı tipi (Pentagon/Standard) seçiminde destek verir.",
  "Redüktörlü / aktüatörlü step motorlar": "AOM, redüktörlü/aktüatörlü step motor seçiminde dişli oranı ve uygulama hızı/tork hesabı konusunda destek verir.",
  "2 fazlı step motorlar": "AOM, 2 fazlı step motor seçimi ve sürücü eşleştirmesi konusunda destek verir.",
};

// Fiyat: 2023 USD liste fiyatı, %40 iskonto (Mert onayı, 23-10-2026), diğer Autonics kodlarıyla aynı
// kamuya açık gösterim.
export const STEP_MOTOR_PRICES: Record<string, { list: number; currency: "USD"; discountPct: 40 }> = Object.fromEntries(
  Object.entries(rawPrices as RawPrices).map(([code, usd]) => [code, { list: usd, currency: "USD" as const, discountPct: 40 as const }]),
);
