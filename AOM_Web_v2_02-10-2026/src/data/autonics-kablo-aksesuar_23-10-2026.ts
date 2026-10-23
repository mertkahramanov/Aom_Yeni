// Autonics bağlantı kabloları ve sensör konnektörleri (kablo / konnektör / bağlantı aksesuarı
// ailesi) — 23-10-2026.
//
// KAPSAM: Bu dosya, mağazada ÜRÜN olarak yer ALMAYAN, yalnızca Mert'in sağladığı Autonics 2023 USD
// fiyat listesinde bulunan ve "kablo/konnektör/bağlantı aksesuarı" kümesine (cluster6_kablo_konnektor_aksesuar.json,
// 1.080 kod; CH / CNE / CN / CID / C prefiksleri) ait kodları kapsar. Bu küme, sitede satılan Autonics
// SSR, SPR, enkoder, DPU tristör, sıcaklık kontrol / panel metre ve kontrol-sinyal (buton/anahtar) ürünlerinden
// AYRIDIR (onlar ana oturum ve 23-10-2026 tarihli kontrol-sinyal dosyası tarafından ayrıca ele alınmıştır).
//
// DOĞRULAMA (23-10-2026 itibarıyla erişildi, WebSearch/WebFetch ile):
//   - CH serisi (834 kod; CH20/CH26/CH37/CH40/CH50, toplam 5 alt-aile): PLC/servo sürücü I/O
//     konnektöründen terminal bloğuna bağlantı kablosu. Kod yapısı CH<pin>-<KonnektörKodu><UzunlukKodu>-<varyant>
//     resmi Autonics kataloğuyla birebir doğrulandı (HP=Hirose fiş, FP=Fujitsu fiş, DP=D-Sub fiş,
//     DS=D-Sub soket, MP=3M fiş/mandallı, MQ=3M fiş/cıvatalı; uzunluk kodu/10 = metre).
//     Kaynak: https://baa.vn/document/ch-series-autonics-cap-io-6350-catalog1.pdf
//   - CNE serisi (42 kod; CNE-B/CNE-P03/CNE-P04/CNE-S03/CNE-S04): sensör kablosu ucuna sıkıştırılan
//     (pressure-welding/crimp) fiş, soket ve bunları karşılayan PCB (board mount) soket ailesi.
//     Kaynak: https://assets.testequity.com/te1/Documents/pdf/autonics/Autonics_CNE-Series-Sensor-Connector_Datasheet_0424.pdf
//     ve https://www.tequipment.net/Autonics/CNE-B03/Misc-Connectors/Adapters
//   - CID serisi (56 kod; CID-VG/CID13P/CID13S/CID2/CID3/CID4/CID408/CID5/CID6P/CID6S/CID7S/CID8/CID9S):
//     sensör/enkoder bağlantı (uzatma) kablosu. Autonics'in resmi "sensors-cables" kataloğunda ve
//     distribütör sayfalarında (TME, tequipment, baa.vn) standart satış kalemi olarak doğrulandı.
//     Kaynak: https://www.tme.com/ca/en/katalog/cable-assemblies_100687/p,autonics_1361/ ,
//     https://www.wolfautomation.com/content/autonics-connector-cables-manual.pdf
//   - C1A4/C1D4/C2A4/C2D4/C3A4/C3D4/C4A4/C4D4, C1D14M/C1D14MB/C1DF14M/C1DF14MB/C1D5/C1D8/C1DH4/C2DH4
//     (73 kod, fiyat listesindeki "C" prefiksinin bir alt kümesi): AYNI "sensors-cables" kataloğunda
//     CID ailesiyle birlikte listelenen AC/DC sensör bağlantı kabloları (düz/L-tipi konnektör varyantları).
//     Kaynak: TME "sensors-cables/autonics" kataloğu (ör. c1a4-2, c2dh4-5eb, cidh4-2 aynı kategoride).
//   - C18/C1M8/C48/C4M8 (24 kod): Autonics görüntü (vision) sensörü/kamera grubu için I-TYPE / L-TYPE
//     Ethernet bağlantı kablosu ("Vision Accessories" kategorisi). "-A" sonekli kodlar Phoenix Contact
//     konnektörlü, soneksiz kodlar HATECH konnektörlü varyanttır (fiyat listesi "desc" alanından).
//     Kaynak: https://admin.appliedautomation.com/part/autonics/c18-5pr/4671462 ("Autonics Vision Accessories")
//   - C3M5P / C3.5M5P (20 kod): Autonics GP/LP dokunmatik panel (HMI) serisi için haberleşme/bağlantı
//     kablosu ailesi ("GP/LP Conn. Cable"); GP/LP serisinin varlığı ve haberleşme kablosu kavramı
//     doğrulandı, ancak her bir varyant (00-15) kodunun hangi üçüncü taraf cihaza karşılık geldiği
//     bağımsız kaynakla doğrulanamadı — bu yüzden sayfada yalnız iki ucun konnektör kodu (ör. D9F0-M6M0)
//     olduğu gibi gösterilir, üçüncü taraf marka/model eşleşmesi İDDİA EDİLMEZ.
//     Kaynak: https://assets.testequity.com/te1/Documents/pdf/autonics/Autonics_GP-LP-Series_Datasheet_0424.pdf
//
// EK (23-10-2026, ana oturum): Agent 6'nın orijinal taraması "CND5-SFN" (DISTRIBUTION^LOOP CONNECTOR,
// 34,40 USD) kodunu atlamıştı — orijinal Excel'de (2026_fiyat_listesi.xlsx) CN prefiksi altında ama CN-502H
// ve CN-6xxx ailesinden farklı, gerçek bir dağıtım/loop konnektörü. "Sensör Konnektörleri" grubuna 46.
// seri olarak eklendi (sn 46, slug cnd5-sfn); toplam seri sayısı 45→46, toplam kod 1.049→1.050.
//
// HARİÇ TUTULANLAR [TEYİT EDİLEMEDİ / KAPSAM DIŞI — bu dosyaya EKLENMEDİ, ana oturuma raporlandı]:
//   - CN prefiksi (29 kod, CN-502H ve CN-6100/CN-6400 ailesi): Araştırma sonucunda bunların kablo/konnektör
//     DEĞİL, Autonics "Sinyal Dönüştürücü / Sıcaklık Transmitteri" (Signal Transmitter/Converter, HART
//     iletişimli) ürünleri olduğu anlaşıldı (tequipment.net "Signal Transmitters / Converters / Preamps"
//     kategorisi; CN-502H için ayrıca "Bo chuyen doi nhiet do" = sıcaklık dönüştürücü). Kablo/konnektör
//     aksesuarı AİLESİNE AİT DEĞİL; bu dosyaya eklenmedi — bağımsız bir ürün kategorisi kararı gerektirir.
//   - C03D40057AB, C08D40091AB ("FRONT RUBBER", 2 kod): hangi cihaza ait oldukları ve bağımsız satılabilir
//     bir "ürün" olup olmadıkları doğrulanamadı; küçük yedek parça niteliğinde görünüyor. Eklenmedi.
//
// SÜTUNLAR: "Bağlantı/pin tipi" ve "Uzunluk" sütunları, fiyat listesindeki "desc" alanından ve/veya kod
// yapısından (ör. CH<pin>-<konnektör><uzunluk>, <aile>-<uzunlukMetre>) literal/yapısal çıkarımla
// doldurulmuştur — yorum/tahmin YOK. "Fiyat listesi açıklaması" sütunu, "desc" alanının temizlenmiş
// (anlamsız '' / '' - '' dolgu değerleri boşaltılmış) halidir. Üretim durumu bu fiyat listesinde yer
// almadığından tüm kodlar "Üretimde" kabul edilmiştir (bkz. autonics-kontrol-sinyal_23-10-2026.ts'teki
// aynı varsayım notu).
//
// FİYAT: Mert onayı (23-10-2026) — 2023 USD liste fiyatı üzerinden %40 iskonto, DPU3/kontrol-sinyal ile
// AYNI şekilde kamuya açık gösterim (liste fiyatı üstü çizili + net fiyat + "%40 indirim" rozeti; bkz.
// @/data/magaza priceInfo()). 1.049 kodun TAMAMI için fiyat mevcuttur.
import raw from "./autonics-kablo-aksesuar-kodlari_23-10-2026.json";
import rawPrices from "./autonics-kablo-aksesuar-fiyat-ham_23-10-2026.json";

export type KabloAksesuarKodSeries = {
  sn: number;
  slug: string;
  key: string;
  title: string;
  cat: string;
  desc: string;
  common: [string, string][];
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1, bu dosyada hep 0), ...cols sırasıyla]
  img: string | null;
};

type RawPrices = Record<string, number>;

export const KABLO_AKSESUAR_KOD_SERIES: KabloAksesuarKodSeries[] = (raw as unknown as { series: KabloAksesuarKodSeries[] }).series.sort((a, b) =>
  a.cat === b.cat ? a.key.localeCompare(b.key, "tr") : a.cat.localeCompare(b.cat, "tr"),
);

export const KABLO_AKSESUAR_KOD_TOTAL = KABLO_AKSESUAR_KOD_SERIES.reduce((n, s) => n + s.codes.length, 0);

export const kabloAksesuarKodSeries = (slug: string) => KABLO_AKSESUAR_KOD_SERIES.find((s) => s.slug === slug);

export const kabloAksesuarSlug = (code: string) => `autonics-${code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

// Kategoriye göre kısa AOM destek cümlesi (iddia içermez)
export const KABLO_AKSESUAR_SUPPORT: Record<string, string> = {
  "PLC/Servo Bağlantı Kabloları": "AOM, PLC veya servo sürücünüzün I/O konnektörüne uygun kablo ve uzunluk seçiminde destek verir.",
  "Sensör Konnektörleri": "AOM, mevcut sensör kablonuza uygun fiş/soket/PCB soket seçiminde destek verir.",
  "Sensör Bağlantı Kabloları": "AOM, sensörünüzün konnektör tipine ve ihtiyacınız olan uzunluğa uygun bağlantı kablosu seçiminde destek verir.",
  "Görüntü (Vision) ve Ethernet Kabloları": "AOM, vision sensörü/kamera kurulumunuzda doğru Ethernet kablosu ve konnektör seçiminde destek verir.",
  "HMI Bağlantı Kabloları (GP/LP)": "AOM, Autonics GP/LP dokunmatik panelinizi bağlayacağınız cihaza uygun kablo seçiminde destek verir; uç konnektör kodlarını birlikte teyit ederiz.",
};

// Fiyat: 2023 USD liste fiyatı, %40 iskonto (Mert onayı, 23-10-2026), kontrol-sinyal ile aynı kamuya açık gösterim.
export const KABLO_AKSESUAR_PRICES: Record<string, { list: number; currency: "USD"; discountPct: 40 }> = Object.fromEntries(
  Object.entries(rawPrices as RawPrices).map(([code, usd]) => [code, { list: usd, currency: "USD" as const, discountPct: 40 as const }]),
);
