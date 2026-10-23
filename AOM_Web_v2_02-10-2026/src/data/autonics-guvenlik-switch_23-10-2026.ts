// Autonics güvenlik switch'leri (güvenlik kapı switch'i, güvenlik kapı kilit switch'i, güvenlik
// anahtarlı seçici switch, güvenlik acil durdurma switch'i) — 23-10-2026.
//
// KAPSAM: Bu dosya, mağazada ÜRÜN olarak yer ALMAYAN, yalnızca Mert'in sağladığı Autonics 2023 USD
// fiyat listesinde (2026_fiyat_listesi.xlsx, "güvenlik anahtarları/switchleri" kümesi, cluster4_guvenlik_switchleri.json,
// 936 kod) bulunan kodları kapsar. Kaynak kümede 5 prefiks vardı: SFDL (484), SF (272 — alt kırılımda
// SF2KR 248 + SF2ER 24), SFLA (76), SFL (62), SFD (42).
//
// DOĞRULAMA (23-10-2026 itibarıyla erişildi, Autonics resmi distribütör/model sayfaları ve haber kaynağı):
//   - SFDL → GÜVENLİK KAPI KİLİT SWITCH'İ (door lock switch): kapı izleme + elektrikli/mekanik kilitleme.
//     https://control.com/news/autonics-introduces-door-lock-switches-to-boost-machine-safety/
//     https://baoanjsc.com.vn/products/safety-door-lock-switch-autonics-SFDL-S5A-M20_149152_en.aspx
//     https://shop.bibus.my/mechatronics/safety/lsc-series-safety-sensor/autonics-safety-curtains-controllers-switches/sfdl-series-safety-door-lock-switches
//     Kod açıklamalarındaki "Door:xNCyNO+Lock:xNCyNO" deseni, baoanjsc'nin SFDL-S5A-M20 sayfasındaki
//     "Door monitor: 2NC/1NO" + "Lock monitor: 1NC/1NO" ayrımıyla BAĞIMSIZ olarak doğrulandı.
//   - SFD → GÜVENLİK KAPI SWITCH'İ (kilitsiz, interlock only): anahtar tahrikli, SADECE kapı izleme,
//     kilitleme fonksiyonu YOK — SFDL'den FARKLI bir ürün (SFDL ile aynı ailenin kilitsiz alt tipi değil,
//     ayrı bir switch tipi; ikisi de "operation key" ile tahrik edilir ama SFD'de kilit kontağı/mandalı yok).
//     https://wolfautomation.com/content/autonics-sfd-series-safety-door-switch-instruction-manual.pdf
//     https://baoanjsc.com.vn/products/safety-door-switches-autonics-sfd-series_83635_en.aspx
//     https://baoanjsc.com.vn/TaiLieu/operation-key-autonics-SFD-K-series-CATALOG1-8186.pdf (SFD-K* = ayrı satılan anahtar aksesuarları)
//   - SF (kaynak kümede tek prefiks gibi görünüyordu; incelemede İKİ AYRI alt aileye ayrıldığı görüldü):
//     • SF2KR → GÜVENLİK ANAHTARLI SEÇİCİ SWITCH (safety key selector switch): güvenlik bariyeri/kapısına
//       monte, anahtarla makineye çalışma izni verir. SFDL/SFD'den TAMAMEN FARKLI bir ürün tipi (kilitleme
//       değil, anahtarla seçim/izin fonksiyonu).
//       https://www.directindustry.com/prod/autonics/product-23164-2524096.html ("Safety key selector switches
//       are mounted in safety fences or on industrial equipment doors. They control whether machines can run...")
//       https://shop.bibus.my/mechatronics/sensors/lsc-series-safety-sensor/autonics-safety-curtains-controllers-switches/sf2kr-series-safety-key-selector-switches
//       https://baa.vn/document/sf2kr-series-autonics-cong-tac-khoa-an-toan-6963-manual.pdf ("safety lock switch")
//     • SF2ER → GÜVENLİK ACİL DURDURMA SWITCH'İ (safety emergency stop switch), Ø22-25: standart S2ER
//       (kontrol/sinyal ailesindeki genel amaçlı acil durdurma, bkz. autonics-kontrol-sinyal dosyası)
//       İLE AYNI AİLE DEĞİL — SF2ER ayrı bir model serisi olup EN ISO 13850 (acil durdurma standardı) ve
//       TÜV sertifikasıyla listelenir, bu nedenle güvenlik switch kategorisine dahil edildi.
//       https://baoanjsc.com.vn/products/d22-25-emergency-stop-button-switches-autonics-SF2ER-E1RB_148958_en.aspx
//       ("Representative standard: TÜV, cUL, CE, CCC, S-mark"; "Features: EN 60947-5-1, EN ISO 13850, UL 508, S-Mark")
//
// HARİÇ TUTULANLAR — DOĞRULANDI AMA FARKLI ÜRÜN TİPİ (switch DEĞİL), bu nedenle "güvenlik switch"
// kategorisine EKLENMEDİ:
//   - SFL (62 kod) ve SFLA (76 kod) → GÜVENLİK IŞIK PERDESİ (safety light curtain): optik/fotoelektrik bir
//     güvenlik SENSÖRÜ'dür, mekanik bir switch DEĞİLDİR. Bağımsız doğrulama:
//     https://baoanjsc.com.vn/products/safety-light-curtains-standard-type-autonics-SFL20-44_83347_en.aspx
//       ("Safety light curtains (standard type) AUTONICS SFL20-44")
//     https://baoanjsc.com.vn/products/finger-hand-body-detection-safety-light-curtanins-autonics_97623_en.aspx
//       (SFLA serisi, parmak/el/gövde algılamalı güvenlik ışık perdesi)
//     Bu 138 kod (SFL+SFLA) görevin tanımladığı "güvenlik anahtarları/switchleri" kapsamına GİRMEZ; ayrı bir
//     ışık perdesi kategorisi gerektirir ve bu dosyanın/görevinin dışındadır.
//
// SÜTUNLAR: Kontak yapısı (NC/NO sayıları), kilit/gövde tipi gibi sütunlar YALNIZCA fiyat listesindeki
// "desc" alanından ve kod yapısından, yukarıdaki bağımsız kaynaklarla doğrulanan desenlerle (örn. SFD'de
// "B2"→2NC, "A2B"→1NO+2NC eşlemesi baoanjsc SFD sayfasındaki "2B: 2NC / A2B: 2NC/1NO" bilgisiyle
// doğrulandı) çözülmüştür. Çözülemeyen hücreler (ör. SF2ER'deki E1/E2 serbest bırakma tipi farkı, SFD'deki
// "C" bağlantısının tam konektör tipi) BOŞ bırakılmış, ham "Fiyat listesi açıklaması" sütununda olduğu
// gibi gösterilmiştir — yorum/tahmin YOK. Aksesuar kodları (SFD-K* anahtarlar, SF2KR-*NP* isim plakaları,
// SF2ER-B* uyarı plakaları, SFDL-CND10-* kablolar, SFDL-SDK slide key unit) switch gövdesi değildir; ilgili
// sütunları boş bırakılmış, "desc" sütununda ne oldukları görülebilir. Üretim durumu (üretimde/üretimden
// kalktı) bu fiyat listesinde yer almadığından TÜM kodlar "Üretimde" varsayılmıştır [TEYİT: Mert'in listesi
// Autonics'in güncel (2023) kataloğu olduğundan ve kodların tamamı hâlâ resmi distribütör sayfalarında
// satışta göründüğünden, aksi belirtilmediği sürece güncel kabul edilmiştir].
//
// FİYAT: Mert onayı (23-10-2026) — 2023 USD liste fiyatı üzerinden %40 iskonto, diğer Autonics kod
// kataloglarıyla (DPU3, kontrol-sinyal) AYNI şekilde kamuya açık gösterim (liste fiyatı üstü çizili + net
// fiyat + "%40 indirim" rozeti; bkz. @/data/magaza priceInfo()). Kapsanan 798 kodun TAMAMI için fiyat
// mevcuttur (bu küme zaten yalnızca Mert'in fiyat listesinden geliyor).
import raw from "./autonics-guvenlik-switch-kodlari_23-10-2026.json";
import rawPrices from "./autonics-guvenlik-switch-fiyat-ham_23-10-2026.json";

export type GuvenlikSwitchKodSeries = {
  sn: number;
  slug: string;
  key: string;
  title: string;
  cat: string;
  desc: string;
  common: [string, string][];
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1), ...cols sırasıyla]
  img: string | null;
};

type RawPrices = Record<string, number>;

export const GUVENLIK_SWITCH_KOD_SERIES: GuvenlikSwitchKodSeries[] = (
  raw as unknown as { series: GuvenlikSwitchKodSeries[] }
).series.sort((a, b) => (a.cat === b.cat ? a.key.localeCompare(b.key, "tr") : a.cat.localeCompare(b.cat, "tr")));

export const GUVENLIK_SWITCH_KOD_TOTAL = GUVENLIK_SWITCH_KOD_SERIES.reduce((n, s) => n + s.codes.length, 0);

export const guvenlikSwitchKodSeries = (slug: string) => GUVENLIK_SWITCH_KOD_SERIES.find((s) => s.slug === slug);

export const guvenlikSwitchSlug = (code: string) => `autonics-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

// Kategoriye göre kısa AOM destek cümlesi (iddia içermez)
export const GUVENLIK_SWITCH_SUPPORT: Record<string, string> = {
  "Güvenlik kapı kilit switch'leri": "AOM, güvenlik kapı kilit switch'i seçimi, kontak konfigürasyonu ve devre entegrasyonu konusunda destek verir.",
  "Güvenlik kapı switch'leri": "AOM, güvenlik kapı switch'i seçimi ve güvenlik devresi entegrasyonu konusunda destek verir.",
  "Güvenlik anahtarlı seçiciler": "AOM, güvenlik anahtarlı seçici switch seçimi ve pano/bariyer entegrasyonu konusunda destek verir.",
  "Güvenlik acil durdurma switch'leri": "AOM, acil durdurma devresi tasarımı ve switch seçimi konusunda destek verir.",
};

// Fiyat: 2023 USD liste fiyatı, %40 iskonto (Mert onayı, 23-10-2026), diğer Autonics kod katalogları ile aynı gösterim.
export const GUVENLIK_SWITCH_PRICES: Record<string, { list: number; currency: "USD"; discountPct: 40 }> = Object.fromEntries(
  Object.entries(rawPrices as RawPrices).map(([code, usd]) => [code, { list: usd, currency: "USD" as const, discountPct: 40 as const }]),
);
