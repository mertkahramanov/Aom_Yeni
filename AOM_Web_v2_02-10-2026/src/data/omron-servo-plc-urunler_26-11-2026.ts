// Omron 1S serisi servo sürücü/motor + NX1 serisi PLC — AOM'un elinde bulunan atıl stok ürünleri
// (26-11-2026, Mert talebi: "Bu ürünlerin orjinal resimlerini bul yandaki fiyatlarını euroya çevir
// ve web sitesinde uygun kategoriye ürün olarak ekle" + "Buradaki atıl ürünleri de satalım").
// Kaynak: Mert'in paylaştığı 4 satırlık teklif/sipariş tablosu görseli (Omron parça no + TL birim
// fiyat) ve Omron'un resmi industrial.omron.eu ürün sayfaları / PDF kataloğu (teknik veriler, 26-11-2026).
// Görseller: industrial.omron.eu ürün sayfalarındaki orijinal fotoğraflar (tinifycdn CDN, 400×400,
// Claude in Chrome ile sayfadan indirilip AOM'un Downloads klasörüne, oradan da projeye taşındı).
// Fiyat: Mert'in teklif tablosundaki TL birim fiyatları 1 EUR = 55,61394091 TL kuruyla (XE, 25-11-2026
// gece yarısına yakın orta kur) EUR'a çevrildi. Bu ürünler AOM'un fiziken elinde bulunan atıl/durgun
// stoktur (Mert'in onayı, 26-11-2026) — bu yüzden diğer Omron/Yaskawa kataloğu girişlerinin aksine
// "Teklif isteyin" değil, stokta/hızlı teslim olarak işaretlendi.
import type { Product } from "./magaza";

const CATEGORY_SERVO = "Servo Motor ve Sürücüler";
const CATEGORY_PLC = "Kontrol Sistemleri (PLC)";
const SPEC_NOTE_1S =
  "Teknik veriler Omron'un resmi 1S serisi EtherCAT servo sürücü/motor kataloğundan (Cat. No. SysCat_I188E / I189E) ve industrial.omron.eu ürün sayfasından alınmıştır.";
const STOK_NOTU = "AOM stoklarında hazır bulunur; hızlı teslimat.";

export const omronServoPlcProducts: Product[] = [
  // ---- 1) R88D-1SN08H-ECT — 1S serisi servo sürücü, EtherCAT, 750 W ----
  {
    slug: "omron-r88d-1sn08h-ect",
    brand: "Omron",
    model: "R88D-1SN08H-ECT",
    name: "1S Serisi Servo Sürücü, EtherCAT, 750 W",
    category: CATEGORY_SERVO,
    summary:
      "Omron R88D-1SN08H-ECT, 1S serisi EtherCAT haberleşmeli AC servo sürücüsüdür. 750 W'a kadar (R88M-1M75030 serisi) servo motoru sürer; 200-240 VAC tek/üç fazlı beslemeyle çalışır, dahili STO (PLe/SIL3) güvenlik fonksiyonuna sahiptir.",
    image: {
      src: "/magaza/omron-r88d-1sn08h-ect_26-11-2026.jpg",
      alt: "Omron R88D-1SN08H-ECT 1S serisi EtherCAT servo sürücü",
    },
    imageNote:
      "Görsel, Omron'un ürün sayfasında bu model için kullandığı orijinal fotoğraftır; etikette aynı gövdeyi paylaşan 1 kW'lık R88D-1SN10H-ECT yazar — 08H modeliyle gövde, bağlantılar ve görünüm birebir aynıdır.",
    specs: [
      { label: "Seri", value: "Omron 1S Serisi (EtherCAT)" },
      { label: "Haberleşme", value: "EtherCAT (CoE), 125 µs çevrim; CN7'de PC bağlantısı için USB 2.0" },
      { label: "Azami uygulanabilir motor gücü", value: "750 W (3000 r/min, R88M-1M75030 serisi)" },
      { label: "Anma çıkış akımı / azami akım", value: "4,6 Arms / 16,9 Arms" },
      { label: "Ana güç girişi", value: "Tek fazlı 200-240 VAC (170-252 V), %47,5-63 Hz, anma giriş akımı 7,3 Arms" },
      { label: "Kontrol güç girişi", value: "24 VDC (21,6-26,4 V), ≈ 600 mA" },
      { label: "Enkoder arayüzü", value: "23-bit çözünürlüklü enkoder, A/B/Z line-driver çıkışı (RS422A, azami 4 Mpps)" },
      { label: "Güvenlik", value: "Dahili donanımsal STO (PLe/SIL3); FSoE ile STO/SS1/SLS opsiyonu" },
      { label: "Frenleme direnci", value: "Dahili regeneratif direnç (B2-B3 fabrika köprülü)" },
      { label: "Koruma sınıfı / montaj", value: "IP20 (IP54 pano içine monte); vida ile montaj (2× M4)" },
      { label: "Ortam sıcaklığı / titreşim", value: "0-55 °C; 5,88 m/s² (10-60 Hz)" },
      { label: "Ağırlık", value: "2,0 kg" },
    ],
    source: { label: "Omron ürün sayfası", url: "https://industrial.omron.eu/en/products/R88D-1SN08H-ECT" },
    specNote: `${SPEC_NOTE_1S} ${STOK_NOTU}`,
    price: { list: 292.82, currency: "EUR" },
    leadTime: "Stokta, hemen teslim",
    groupTitle: "Omron 1S Serisi Servo Sürücü",
    seoTitle: "Omron R88D-1SN08H-ECT 1S Serisi Servo Sürücü",
    metaDescription:
      "Omron R88D-1SN08H-ECT: 1S serisi EtherCAT servo sürücü, 750 W, 200-240 VAC. AOM stoklarında hazır, Ankara'dan Türkiye geneline hızlı teslim.",
    seoText: [
      "Omron R88D-1SN08H-ECT, 1S serisinin EtherCAT (CoE) haberleşmeli AC servo sürücüsüdür. 750 W'a kadar (R88M-1M75030 serisi) servo motoru 23-bit çözünürlüklü enkoder geri beslemesiyle sürer; dahili donanımsal STO (PLe/SIL3) ve FSoE üzerinden SS1/SLS güvenlik fonksiyonları sunar.",
      "Sürücü 200-240 VAC tek fazlı ana güç, 24 VDC kontrol güç girişiyle çalışır ve dahili regeneratif direnç sayesinde ek frenleme direnci gerektirmeden kurulabilir.",
      "Bu ürün AOM'un kendi stoklarında hazır bulunan bir birimdir; hızlı teslimat için bizimle iletişime geçin. AOM, servo sürücü seçimi, EtherCAT entegrasyonu ve devreye alma konusunda destek verir.",
    ],
    keywords: [
      "R88D-1SN08H-ECT",
      "Omron R88D-1SN08H-ECT",
      "Omron 1S servo sürücü",
      "Omron EtherCAT servo",
      "Omron servo sürücü fiyat",
      "750W servo sürücü",
    ],
  },

  // ---- 2) R88D-1SN04H-ECT — 1S serisi servo sürücü, EtherCAT, 400 W ----
  {
    slug: "omron-r88d-1sn04h-ect",
    brand: "Omron",
    model: "R88D-1SN04H-ECT",
    name: "1S Serisi Servo Sürücü, EtherCAT, 400 W",
    category: CATEGORY_SERVO,
    summary:
      "Omron R88D-1SN04H-ECT, 1S serisi EtherCAT haberleşmeli AC servo sürücüsüdür. 400 W'a kadar (R88M-1M40030 serisi) servo motoru sürer; 200-240 VAC tek/üç fazlı beslemeyle çalışır, dahili STO (PLe/SIL3) güvenlik fonksiyonuna sahiptir.",
    image: {
      src: "/magaza/omron-r88d-1sn04h-ect_26-11-2026.jpg",
      alt: "Omron R88D-1SN04H-ECT 1S serisi EtherCAT servo sürücü",
    },
    specs: [
      { label: "Seri", value: "Omron 1S Serisi (EtherCAT)" },
      { label: "Haberleşme", value: "EtherCAT (CoE), 125 µs çevrim; CN7'de PC bağlantısı için USB 2.0" },
      { label: "Azami uygulanabilir motor gücü", value: "400 W (3000 r/min, R88M-1M40030 serisi)" },
      { label: "Anma çıkış akımı / azami akım", value: "2,5 Arms / 9,1 Arms" },
      { label: "Ana güç girişi", value: "Tek/üç fazlı 200-240 VAC (170-252 V), %47,5-63 Hz, anma giriş akımı 4,6 Arms" },
      { label: "Kontrol güç girişi", value: "24 VDC (21,6-26,4 V), ≈ 600 mA" },
      { label: "Enkoder arayüzü", value: "23-bit çözünürlüklü enkoder, A/B/Z line-driver çıkışı (RS422A, azami 4 Mpps)" },
      { label: "Güvenlik", value: "Dahili donanımsal STO (PLe/SIL3); FSoE ile STO/SS1/SLS opsiyonu" },
      { label: "Frenleme direnci", value: "Dahili regeneratif direnç yok (100-400 W sınıfı için harici gerekir)" },
      { label: "Koruma sınıfı / montaj", value: "IP20 (IP54 pano içine monte); vida ile montaj (2× M4)" },
      { label: "Ortam sıcaklığı / titreşim", value: "0-55 °C; 5,88 m/s² (10-60 Hz)" },
      { label: "Ağırlık", value: "1,5 kg" },
    ],
    source: { label: "Omron ürün sayfası", url: "https://industrial.omron.eu/en/products/R88D-1SN04H-ECT" },
    specNote: `${SPEC_NOTE_1S} ${STOK_NOTU}`,
    price: { list: 269.04, currency: "EUR" },
    leadTime: "Stokta, hemen teslim",
    groupTitle: "Omron 1S Serisi Servo Sürücü",
    seoTitle: "Omron R88D-1SN04H-ECT 1S Serisi Servo Sürücü",
    metaDescription:
      "Omron R88D-1SN04H-ECT: 1S serisi EtherCAT servo sürücü, 400 W, 200-240 VAC. AOM stoklarında hazır, Ankara'dan Türkiye geneline hızlı teslim.",
    seoText: [
      "Omron R88D-1SN04H-ECT, 1S serisinin EtherCAT (CoE) haberleşmeli AC servo sürücüsüdür. 400 W'a kadar (R88M-1M40030 serisi) servo motoru 23-bit çözünürlüklü enkoder geri beslemesiyle sürer; dahili donanımsal STO (PLe/SIL3) ve FSoE üzerinden SS1/SLS güvenlik fonksiyonları sunar.",
      "Sürücü 200-240 VAC tek/üç fazlı ana güç, 24 VDC kontrol güç girişiyle çalışır; 400 W sınıfında dahili regeneratif direnç bulunmaz, ihtiyaç halinde harici direnç bağlanır.",
      "Bu ürün AOM'un kendi stoklarında hazır bulunan bir birimdir; hızlı teslimat için bizimle iletişime geçin. AOM, servo sürücü seçimi, EtherCAT entegrasyonu ve devreye alma konusunda destek verir.",
    ],
    keywords: [
      "R88D-1SN04H-ECT",
      "Omron R88D-1SN04H-ECT",
      "Omron 1S servo sürücü",
      "Omron EtherCAT servo",
      "Omron servo sürücü fiyat",
      "400W servo sürücü",
    ],
  },

  // ---- 3) R88M-1M40030T-S2 — 1S serisi AC servo motor, 400 W ----
  {
    slug: "omron-r88m-1m40030t-s2",
    brand: "Omron",
    model: "R88M-1M40030T-S2",
    name: "1S Serisi AC Servo Motor, 400 W, 3000 r/min",
    category: CATEGORY_SERVO,
    summary:
      "Omron R88M-1M40030T-S2, 1S serisi 400 W AC servo motordur. 230 VAC sınıfı, 3000 r/min anma hız, 23-bit pilsiz (battery-less) mutlak enkoder ve anahtarlı/tapalı düz mil (S2) ile; R88D-1SN04H-ECT servo sürücüsüyle çift olarak çalışır.",
    image: {
      src: "/magaza/omron-r88m-1m40030t-s2_26-11-2026.jpg",
      alt: "Omron R88M-1M40030T-S2 1S serisi AC servo motor",
    },
    imageNote:
      "Görsel, Omron'un ürün sayfasında bu modelin de içinde bulunduğu 60 mm gövde/flanş sınıfı için kullandığı orijinal temsili fotoğraftır; gövde, flanş ve bağlantı tipi modelle birebir aynıdır.",
    specs: [
      { label: "Seri", value: "Omron 1S Serisi" },
      { label: "Anma gücü", value: "400 W" },
      { label: "Anma tork / azami (tepe) tork", value: "1,27 Nm / 4,5 Nm" },
      { label: "Anma hız", value: "3000 r/min" },
      { label: "Anma akım / azami akım", value: "2,5 Arms / 9,1 Arms" },
      { label: "Rotor atalet momenti", value: "0,4452×10⁻⁴ kg·m² (frensiz)" },
      { label: "Enkoder", value: "23-bit pilsiz (battery-less) mutlak enkoder" },
      { label: "Mil tipi", value: "Anahtarlı ve tapalı düz mil (S2), Ø14 mm (0 / −0,011 mm)" },
      { label: "Flanş", value: "60 mm" },
      { label: "Koruma sınıfı", value: "IP67 (konnektörler takılıyken, mil geçişleri hariç)" },
      { label: "Yalıtım sınıfı", value: "F" },
      { label: "Ağırlık", value: "1,4 kg (frensiz)" },
      { label: "Gövde uzunluğu (LL)", value: "105,5 mm (frensiz)" },
      { label: "Uyumlu sürücü", value: "Omron R88D-1SN04H-ECT (1S serisi, EtherCAT)" },
    ],
    source: { label: "Omron ürün sayfası", url: "https://industrial.omron.eu/en/products/R88M-1M40030T-S2" },
    specNote: `${SPEC_NOTE_1S} ${STOK_NOTU}`,
    price: { list: 297.36, currency: "EUR" },
    leadTime: "Stokta, hemen teslim",
    groupTitle: "Omron 1S Serisi Servo Motor",
    seoTitle: "Omron R88M-1M40030T-S2 1S Serisi Servo Motor",
    metaDescription:
      "Omron R88M-1M40030T-S2: 1S serisi AC servo motor, 400 W, 3000 r/min, 23-bit mutlak enkoder. AOM stoklarında hazır, hızlı teslim.",
    seoText: [
      "Omron R88M-1M40030T-S2, 1S serisinin 400 W'lık AC servo motorudur. 3000 r/min anma hızda 1,27 Nm anma tork, 4,5 Nm'e kadar tepe tork üretir; 23-bit pilsiz (battery-less) mutlak enkoder sayesinde enerji kesilip geldiğinde referans aramaya gerek kalmadan konum okunur.",
      "IP67 koruma sınıfı ve F yalıtım sınıfıyla zorlu endüstriyel ortamlara uygundur; anahtarlı ve tapalı düz mil (S2) seçeneğiyle gelir. Omron R88D-1SN04H-ECT (1S serisi EtherCAT) servo sürücüsüyle çift olarak çalışır.",
      "Bu ürün AOM'un kendi stoklarında hazır bulunan bir birimdir; hızlı teslimat için bizimle iletişime geçin. AOM, servo motor seçimi, kaplin/mekanik montaj ve devreye alma konusunda destek verir.",
    ],
    keywords: [
      "R88M-1M40030T-S2",
      "Omron R88M-1M40030T-S2",
      "Omron 1S servo motor",
      "Omron AC servo motor",
      "Omron servo motor fiyat",
      "400W servo motor",
    ],
    equivalents: [{ brand: "Omron", model: "R88D-1SN04H-ECT", slug: "omron-r88d-1sn04h-ect" }],
  },

  // ---- 4) NX102-1200 — NX1 serisi Machine Automation Controller (PLC CPU) ----
  {
    slug: "omron-nx102-1200",
    brand: "Omron",
    model: "NX102-1200",
    name: "NX1 Serisi Machine Automation Controller (PLC CPU)",
    category: CATEGORY_PLC,
    summary:
      "Omron NX102-1200, NX1 serisi Machine Automation Controller (PLC CPU) ünitesidir. 5 MB program kapasitesi, 2× EtherNet/IP + 1× EtherCAT dahili port, azami 12 gerçek eksen ve 32 NX ünitesine kadar yerel genişleme desteği sunar.",
    image: {
      src: "/magaza/omron-nx102-1200_26-11-2026.jpg",
      alt: "Omron NX102-1200 NX1 serisi Machine Automation Controller",
    },
    specs: [
      { label: "Seri", value: "Omron NX1 (NX102)" },
      { label: "Program kapasitesi", value: "5 MB; azami 3.000 POU tanımı" },
      { label: "Değişken belleği", value: "Kalıcı (retained) 1,5 MB / 10.000 değişken; geçici 32 MB / 90.000 değişken" },
      { label: "İşlem hızı", value: "LD komutu 3,3 ns" },
      { label: "Gerçek eksen", value: "Azami 12; hareket kontrol ekseni 11; tek eksen pozisyon kontrolü 4" },
      { label: "Dahili portlar", value: "2× EtherNet/IP (RJ45, 10/100BASE-TX), 1× EtherCAT (RJ45, 100BASE-TX)" },
      { label: "EtherCAT kapasitesi", value: "Azami 64 slave; çevrim süresi 1.000-32.000 µs [katalog özeti]" },
      { label: "Besleme", value: "24 VDC (20,4-28,8 V); ünite tüketimi azami 5,80 W" },
      { label: "Genişleme", value: "NX bus üzerinde azami 32 yerel NX ünitesi" },
      { label: "Ölçüler (G×Y×D)", value: "72 × 100 × 90 mm" },
      { label: "Ağırlık", value: "Azami 390 g (uç kapak dahil)" },
      { label: "Ortam sıcaklığı", value: "0-55 °C" },
    ],
    source: { label: "Omron ürün sayfası", url: "https://industrial.omron.eu/en/products/NX102-1200" },
    specNote: `Teknik veriler Omron'un resmi NX1 serisi katalog PDF'inden (assets.omron.com) ve industrial.omron.eu ürün sayfasından alınmıştır; EtherCAT slave/çevrim süresi değerleri PDF'nin otomatik çıkarılan özetinden geldiği için katalogla teyit edilmesi önerilir. ${STOK_NOTU}`,
    price: { list: 746.4, currency: "EUR" },
    leadTime: "Stokta, hemen teslim",
    groupTitle: "Omron NX1 Serisi PLC",
    seoTitle: "Omron NX102-1200 NX1 Serisi PLC",
    metaDescription:
      "Omron NX102-1200: NX1 serisi Machine Automation Controller, 5 MB program, EtherCAT + EtherNet/IP. AOM stoklarında hazır, hızlı teslim.",
    seoText: [
      "Omron NX102-1200, NX1 serisinin Machine Automation Controller (PLC CPU) ünitesidir. 5 MB program kapasitesi, azami 3.000 POU tanımı ve 3,3 ns'lik LD komut hızıyla orta-büyük ölçekli makine otomasyonu uygulamalarında kullanılır.",
      "2 adet EtherNet/IP ve 1 adet EtherCAT dahili portuyla hem fabrika ağına hem de hareket kontrol ağına doğrudan bağlanır; azami 12 gerçek eksen (11 hareket kontrol, 4 tek eksen pozisyon kontrolü) ve 32 NX ünitesine kadar yerel genişleme destekler.",
      "Bu ürün AOM'un kendi stoklarında hazır bulunan bir birimdir; hızlı teslimat için bizimle iletişime geçin. AOM, PLC seçimi, pano entegrasyonu ve devreye alma projelerinde destek verir.",
    ],
    keywords: [
      "NX102-1200",
      "Omron NX102-1200",
      "Omron NX1 PLC",
      "Omron Machine Automation Controller",
      "Omron PLC fiyat",
      "EtherCAT PLC",
    ],
  },
];
