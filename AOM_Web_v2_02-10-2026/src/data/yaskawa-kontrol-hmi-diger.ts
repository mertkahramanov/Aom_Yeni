// Yaskawa/VIPA kontrol ürünleri — HMI, Profichip Gömülü Çözümler, Sistemler (20-10-2026).
// Kaynak: Web Sitesi projesi, urun-verisi/yaskawa-control-systems-findings_18-10-2026.md
// (yaskawa.com.tr "Kontrol" ve "Sistemler" bölümleri, canlı taramayla derlendi; Faz 4 — PLC serileri ayrı dosyada ele alınacak).
//
// Marka notu: HMI (Panel PC, Line Displays, smartPanels) ve Profichip ürünleri VIPA markalıdır
// (Yaskawa, VIPA'yı satın almıştır; bu ürünler Yaskawa/VIPA kontrol markası altında satılır — Yaskawa'nın
// kendi Drive/Robot/Servo hatlarından ayrıdır). `brand` alanı mağaza tutarlılığı için "Yaskawa" olarak
// bırakıldı (brandLogo da Yaskawa logosu); VIPA ayrımı `summary`/`specNote` içinde açıkça belirtilir.
// Sistemler (Sistem Mühendisliği) bölümündeki çözüm paketleri MOTOMAN robotları üzerine kuruludur — bunlar
// saf Yaskawa markalıdır, VIPA notu eklenmemiştir.
//
// Sipariş kodu/fiyat: Panel PC modellerinde "order code" sütunu var (findings'te var) ama liste fiyatı hiçbir
// modelde yayınlanmıyor; Line Displays, smartPanels, Profichip ve Sistemler'de sipariş kodu da yok.
// Bu yüzden hiçbir kayıtta `price` alanı set edilmedi — mağaza "Teklif isteyin" gösterir.
//
// Görsel: HMI grubunun 11 ürünü (Panel PC ×6, Line Displays ×2, smartPanels ×3) için orijinal ürün görselleri
// 20-10-2026 tarihinde yaskawa.com.tr'nin kendi ürün sayfalarından (Mert'in bilgisayarındaki Claude Browser
// üzerinden) indirildi ve public/magaza/yaskawa-hmi-*_20-10-2026.png olarak eklendi; her görsel görsel olarak
// doğrulandı (gerçek ürün fotoğrafı/render'ı, teknik çizim değil). Bkz. claude/YASKAWA_KONTROL_HMI_DIGER_VERI_20-10-2026.md.
// Profichip (9 kayıt) ve Sistemler (7 kayıt) için görsel ayrıca indirilmedi — bu görev kapsamı dışındaydı;
// `image` alanı o kayıtlarda boş kalır, StoreCard bileşeni marka logosunu (Yaskawa) gösterir.
//
// Profichip kapsam notu (uydurma yok, kaynak metniyle birebir): findings dosyasında Profichip bölümü toplam
// "~12 named entries" olarak özetlenir ama bu sayı yinelenen/takma ad (alias) kayıtları da içerir:
//  - "Real-Time Ethernet" alt bölümü ANTAIOS'un takma adı (alias) bir listesidir, ayrı ürün değildir — atlandı.
//  - "SliceBus Technology" alt bölümünde ANTAIOS (zaten Industrial Processors'ta var) + "NOTOS" adlı bir slave
//    kontrolcü + 1 adsız kart listelenir; NOTOS için findings'te hiçbir spesifikasyon/URL yoktur (sadece isim
//    geçer), bu yüzden ürün kaydı oluşturulmadı (uydurma yok ilkesi).
//  - "proficonn" hem Fieldbus hem Components alt bölümünde listelenir (findings'te aynı parça, iki yerde
//    anılıyor); burada tek kayıt olarak (Fieldbus grubunda) tutuldu, tekrar oluşturulmadı.
//  - "ANTAIOS Evaluation Kit" findings'te CMS'te iki kez (duplicate) listelenmiş aynı kit; tek kayıt yapıldı.
// Sonuç: bu dosyada 9 benzersiz Profichip kaydı var (2 Industrial Processors + 5 Fieldbus + 1 Evaluation Kit
// + 1 Components [EasyConn PB]), görev talimatındaki "~12" rakamı yinelenen/isimsiz kayıtları da saydığı için
// daha yüksektir — bkz. claude/YASKAWA_KONTROL_HMI_DIGER_VERI_20-10-2026.md.
//
// Sistemler kapsam notu: findings'teki 4 alt bölümden yalnızca isimli çözüm paketi olan ikisi (Standart Ark
// Kaynağı: 5 paket, Pres Besleme: 2 paket = 7 paket) kayda alındı. "Spot Welding Systems" ve "Pallet Repair
// Systems" alt bölümlerinde hiç isimli paket yok, yalnızca birer genel açıklama metni var — atlandı.
//
// AOM, Yaskawa'nın yetkili satıcısı/distribütörü olduğunu iddia etmez; bu doğrulanmamıştır. Metinler yalnızca
// AOM'un kendi otomasyon/entegrasyon hizmetine dayanır.
import type { Product } from "./magaza";

// Kategori ataması (20-10-2026, ana oturum entegrasyonu, Mert onayıyla):
// Panel PC ve HMI (Line Displays, smartPanels) ürünleri, sitede zaten var olan Autonics
// "Grafik paneller (HMI)" / "Endüstriyel bilgisayarlar" kategorileriyle AYNI kategori string'lerini
// kullanır (src/data/autonics-kontrol_03-10-2026.json içindeki catTr alanlarıyla birebir eşleşir),
// böylece yeni kategori açılmaz, ürünler mevcut kategoriye markaya bakılmaksızın eklenir.
// Profichip (OEM/entegratör gömülü çip) ve Sistemler (MOTOMAN çözüm paketi) sitede karşılığı
// olmayan gerçekten yeni ürün türleri olduğu için kendi kategorilerinde kalır.
export const CATEGORY_PANEL_PC = "Endüstriyel bilgisayarlar";
export const CATEGORY_HMI = "Grafik paneller (HMI)";
export const CATEGORY_PROFICHIP = "Gömülü haberleşme çözümleri";
export const CATEGORY_SISTEMLER = "Robotik otomasyon çözüm paketleri";

const YASKAWA_LOGO = { src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 };

const VIPA_NOTE =
  "VIPA (Yaskawa), teknik veriler Yaskawa'nın resmi Türkiye ürün sayfasından (yaskawa.com.tr) alınmıştır. Sipariş kodu/fiyat sitede yayınlanmıyor; güncel teslim süresi ve fiyat için teklif isteyin.";

const SISTEM_NOTE =
  "Bu bir mühendislik çözüm paketidir, stoktan satılan bir ürün değildir; MOTOMAN endüstriyel robotu üzerine kurulu, projeye göre yapılandırılan bir iş hücresidir. Teknik veriler Yaskawa'nın resmi Türkiye sayfasından (yaskawa.com.tr) alınmıştır; kapsam, robot modeli ve fiyat için teklif isteyin.";

const AOM_HMI_PARA =
  "AOM, VIPA (Yaskawa) tabanlı HMI ve panel bilgisayar seçimi, görselleştirme (Movicon) uygulaması ve PLC/kontrolör haberleşmesi konusunda destek verir. Güncel fiyat ve teslim süresi teklif üzerine bildirilir; Ankara'dan Türkiye'nin her şehrine gönderim yapılır.";

const AOM_PROFICHIP_PARA =
  "Bu gömülü haberleşme çipi/SoC, son kullanıcıya değil OEM/makine üreticisi ve sistem entegratörüne yöneliktir; kendi kontrol kartı veya cihaz tasarımına entegre edilir. AOM, OEM/entegratör müşterilerine Profichip tedariki ve teknik danışmanlık konusunda destek verir; güncel fiyat ve teslim süresi için teklif isteyin.";

const AOM_SISTEM_PARA =
  "AOM, robotik otomasyon projelerinde MOTOMAN tabanlı bu tür çözüm paketlerinin uygulama ve entegrasyon desteğini verir. Kapsam, robot modeli, pano ve devreye alma dahil güncel teklif için iletişime geçin; Ankara'dan Türkiye'nin her şehrine hizmet verilir.";

// ---------------------------------------------------------------------------
// 1) HMI — Panel PC (6), Line Displays (2), smartPanels (3) — toplam 11 kayıt
// ---------------------------------------------------------------------------

type PanelPc = { model: string; code: string; screen: string; ram: string; storage: string; os: string; url: string; image: string };
const PANEL_PC: PanelPc[] = [
  { model: "Panel PC PPC010 CE – Movicon 11.5 Runtime", code: "67K-RRJ0-EB", screen: "10,1\"", ram: "2 GB", storage: "2 GB CFast", os: "Windows Embedded Compact 7", url: "https://www.yaskawa.com.tr/kontrol/hmi/productdetail/product/panel-pc-ppc010-ce---movicon-11.5-runtime_1359", image: "/magaza/yaskawa-hmi-ppc010-ce_20-10-2026.png" },
  { model: "Panel PC PPC010 IE – Movicon 11.6 Runtime", code: "67K-RTP0-KB", screen: "10,1\"", ram: "8 GB", storage: "64 GB CFast", os: "Windows 10 IoT Enterprise", url: "https://www.yaskawa.com.tr/kontrol/hmi/productdetail/product/panel-pc-ppc010-ie--movicon-11.6-runtime_16315", image: "/magaza/yaskawa-hmi-ppc010-ie_20-10-2026.png" },
  { model: "Panel PC PPC015 CE", code: "67P-RRJ0-EB", screen: "15,6\"", ram: "2 GB", storage: "2 GB CFast", os: "Windows Embedded Compact 7", url: "https://www.yaskawa.com.tr/kontrol/hmi/productdetail/product/panel-pc-ppc015-ce---movicon-11.5-runtime_1361", image: "/magaza/yaskawa-hmi-ppc015-ce_20-10-2026.png" },
  { model: "Panel PC PPC015 IE", code: "67P-RTP0-KB", screen: "15,6\"", ram: "8 GB", storage: "64 GB CFast", os: "Windows 10 IoT Enterprise", url: "https://www.yaskawa.com.tr/kontrol/hmi/productdetail/product/panel-pc-ppc015-ie---movicon-11.6-runtime_16316", image: "/magaza/yaskawa-hmi-ppc015-ie_20-10-2026.png" },
  { model: "Panel PC PPC021 CE", code: "67S-RRJ0-EB", screen: "21,5\"", ram: "2 GB", storage: "2 GB CFast", os: "Windows Embedded Compact 7", url: "https://www.yaskawa.com.tr/kontrol/hmi/productdetail/product/panel-pc-ppc021-ce---movicon-11.5-runtime_16336", image: "/magaza/yaskawa-hmi-ppc021-ce_20-10-2026.png" },
  { model: "Panel PC PPC021 IE", code: "67S-RTP0-KB", screen: "21,5\"", ram: "8 GB", storage: "64 GB CFast", os: "Windows 10 IoT Enterprise", url: "https://www.yaskawa.com.tr/kontrol/hmi/productdetail/product/panel-pc-ppc021-ie---movicon-11.6-runtime_16317", image: "/magaza/yaskawa-hmi-ppc021-ie_20-10-2026.png" },
];

const panelPcProducts: Product[] = PANEL_PC.map((p, i): Product => {
  const slug = `yaskawa-panel-pc-${p.model.match(/ppc\d{3}\s?(ce|ie)/i)![0].replace(/\s+/g, "-").toLowerCase()}`;
  return {
    slug,
    brand: "Yaskawa",
    brandLogo: YASKAWA_LOGO,
    model: p.model,
    name: `${p.model}, ${p.screen} dokunmatik ekran`,
    category: CATEGORY_PANEL_PC,
    summary: `VIPA (Yaskawa) endüstriyel dokunmatik panel bilgisayar — ${p.screen} ekran, Intel Celeron J1900 dört çekirdekli işlemci, ${p.os}, Movicon görselleştirme runtime'ı ile birlikte gelir.`,
    specs: [
      { label: "Marka", value: "VIPA (Yaskawa)" },
      { label: "Sipariş kodu", value: p.code },
      { label: "Ekran", value: `${p.screen} dokunmatik (touch)` },
      { label: "İşlemci", value: "Intel Celeron J1900, dört çekirdekli" },
      { label: "RAM", value: p.ram },
      { label: "Depolama", value: p.storage },
      { label: "İşletim sistemi", value: p.os },
      { label: "Görselleştirme", value: p.os === "Windows 10 IoT Enterprise" ? "Movicon 11.6 Runtime" : "Movicon 11.5 Runtime" },
    ],
    source: { label: "Yaskawa ürün sayfası", url: p.url },
    image: { src: p.image, alt: `VIPA (Yaskawa) ${p.model} endüstriyel dokunmatik panel bilgisayar (gerçek ürün görseli)` },
    specNote: VIPA_NOTE,
    series: "Panel PC",
    groupOrder: 10 + i,
    seriesIntro: "VIPA (Yaskawa) Panel PC serisi, Intel Celeron J1900 işlemcili, Movicon görselleştirme runtime'ı önceden kurulu endüstriyel dokunmatik panel bilgisayarlardır; 10,1\", 15,6\" ve 21,5\" ekran ölçülerinde, WinCE7 (CE) veya Windows 10 IoT Enterprise (IE) işletim sistemi seçenekleriyle sunulur.",
    kindLabel: "Endüstriyel Panel Bilgisayar",
    seoText: [
      `VIPA (Yaskawa) ${p.model}, ${p.screen} dokunmatik ekranlı, ${p.ram} RAM ve ${p.storage} depolama alanına sahip endüstriyel panel bilgisayardır. ${p.os} işletim sistemi ile çalışır ve Movicon görselleştirme yazılımını destekler.`,
      AOM_HMI_PARA,
    ],
    keywords: [`Yaskawa ${p.model}`, "VIPA Panel PC", "endüstriyel panel bilgisayar", "Movicon HMI", "VIPA Panel PC Ankara", "panel PC fiyat"],
    seoTitle: `VIPA (Yaskawa) ${p.model}`,
    metaDescription: `VIPA (Yaskawa) ${p.model}: ${p.screen} ekran, ${p.ram} RAM, ${p.os}. Teklif için Ankara merkezli AOM ile iletişime geçin.`,
  };
});

type LineDisplay = { model: string; display: string; notes: string; url: string; image: string };
const LINE_DISPLAYS: LineDisplay[] = [
  { model: "OP 03 – Operator Panel", display: "2×20 karakter", notes: "256 KB bellek, bir CPU'ya bağlı en fazla 7 OP", url: "https://www.yaskawa.com.tr/kontrol/hmi/productdetail/product/satir-gostergeleri_1338", image: "/magaza/yaskawa-hmi-op03_20-10-2026.png" },
  { model: "TD 03 – Text Display", display: "2×20 karakter", notes: "Arka aydınlatmalı LCD, membran tuşlar", url: "https://www.yaskawa.com.tr/kontrol/hmi/productdetail/product/satir-gostergeleri_1340", image: "/magaza/yaskawa-hmi-td03_20-10-2026.png" },
];

const lineDisplayProducts: Product[] = LINE_DISPLAYS.map((p, i): Product => {
  const slug = `yaskawa-${p.model.split(" ")[0].toLowerCase()}-${p.model.split(" ")[1].toLowerCase()}`;
  return {
    slug,
    brand: "Yaskawa",
    brandLogo: YASKAWA_LOGO,
    model: p.model,
    name: `${p.model}, ${p.display} satır göstergesi`,
    category: CATEGORY_HMI,
    summary: `VIPA (Yaskawa) ${p.model.includes("Operator") ? "operatör paneli" : "metin ekranı"} — ${p.display} LCD satır göstergesi. ${p.notes}.`,
    specs: [
      { label: "Marka", value: "VIPA (Yaskawa)" },
      { label: "Tür", value: p.model.includes("Operator") ? "Operatör paneli (Line Display)" : "Metin ekranı (Line Display)" },
      { label: "Ekran", value: `${p.display} LCD` },
      { label: "Notlar", value: p.notes },
    ],
    source: { label: "Yaskawa ürün sayfası", url: p.url },
    image: { src: p.image, alt: `VIPA (Yaskawa) ${p.model} (gerçek ürün görseli)` },
    specNote: VIPA_NOTE,
    series: "Line Displays (Satır Göstergeleri)",
    groupOrder: 20 + i,
    seriesIntro: "VIPA (Yaskawa) Line Displays (Satır Göstergeleri), basit metin/durum gösterimi gereken uygulamalar için 2×20 karakterlik LCD ekranlı küçük operatör paneli ve metin ekranı modelleridir.",
    kindLabel: "Operatör Paneli / Metin Ekranı",
    seoText: [
      `VIPA (Yaskawa) ${p.model}, ${p.display} LCD ekranlı, basit metin ve durum gösterimi için geliştirilmiş küçük bir satır göstergesidir. ${p.notes}.`,
      AOM_HMI_PARA,
    ],
    keywords: [`Yaskawa ${p.model}`, "VIPA satır göstergesi", "VIPA operatör paneli", "metin ekranı PLC", "VIPA HMI Ankara"],
    seoTitle: `VIPA (Yaskawa) ${p.model}`,
    metaDescription: `VIPA (Yaskawa) ${p.model}: ${p.display} LCD satır göstergesi. Teklif için Ankara merkezli AOM ile iletişime geçin.`,
  };
});

type SmartPanel = { model: string; screen: string; url: string; image: string };
const SMART_PANELS: SmartPanel[] = [
  { model: "smartPanel TP304-SM", screen: "4,3\"", url: "https://www.yaskawa.com.tr/kontrol/hmi/productdetail/product/smartpanel-tp304-sm_1173", image: "/magaza/yaskawa-hmi-smartpanel-tp304_20-10-2026.png" },
  { model: "smartPanel TP307-SM", screen: "7\"", url: "https://www.yaskawa.com.tr/kontrol/hmi/productdetail/product/smartpanel-tp307-sm_1256", image: "/magaza/yaskawa-hmi-smartpanel-tp307_20-10-2026.png" },
  { model: "smartPanel TP310-SM", screen: "10,1\"", url: "https://www.yaskawa.com.tr/kontrol/hmi/productdetail/product/smartpanel-tp310-sm_1257", image: "/magaza/yaskawa-hmi-smartpanel-tp310_20-10-2026.png" },
];

const smartPanelProducts: Product[] = SMART_PANELS.map((p, i): Product => {
  const slug = `yaskawa-smartpanel-${p.model.split(" ")[1].toLowerCase()}`;
  return {
    slug,
    brand: "Yaskawa",
    brandLogo: YASKAWA_LOGO,
    model: p.model,
    name: `${p.model}, ${p.screen} dokunmatik operatör paneli`,
    category: CATEGORY_HMI,
    summary: `VIPA (Yaskawa) smartPanel — ${p.screen} dokunmatik ekranlı operatör paneli, ARM Cortex-A8 1 GHz işlemci, Windows Embedded Compact 7, Movicon CE görselleştirme, 65k renk.`,
    specs: [
      { label: "Marka", value: "VIPA (Yaskawa)" },
      { label: "Ekran", value: `${p.screen} dokunmatik (touch), 65k renk` },
      { label: "İşlemci", value: "ARM Cortex-A8, 1 GHz" },
      { label: "İşletim sistemi", value: "Windows Embedded Compact 7" },
      { label: "Görselleştirme", value: "Movicon CE" },
    ],
    source: { label: "Yaskawa ürün sayfası", url: p.url },
    image: { src: p.image, alt: `VIPA (Yaskawa) ${p.model} dokunmatik operatör paneli (gerçek ürün görseli)` },
    specNote: VIPA_NOTE,
    series: "smartPanels",
    groupOrder: 30 + i,
    seriesIntro: "VIPA (Yaskawa) smartPanels serisi, ARM Cortex-A8 1 GHz işlemcili, WinCE7 ve Movicon CE görselleştirmeli, kompakt dokunmatik operatör panelleridir; 4,3\", 7\" ve 10,1\" ekran ölçülerinde sunulur.",
    kindLabel: "Dokunmatik Operatör Paneli (smartPanel)",
    seoText: [
      `VIPA (Yaskawa) ${p.model}, ${p.screen} dokunmatik ekranlı, ARM Cortex-A8 1 GHz işlemcili ve Movicon CE görselleştirmeli kompakt bir operatör panelidir.`,
      AOM_HMI_PARA,
    ],
    keywords: [`Yaskawa ${p.model}`, "VIPA smartPanel", "dokunmatik operatör paneli", "Movicon CE", "VIPA smartPanel Ankara"],
    seoTitle: `VIPA (Yaskawa) ${p.model}`,
    metaDescription: `VIPA (Yaskawa) ${p.model}: ${p.screen} dokunmatik ekran, Movicon CE. Teklif için Ankara merkezli AOM ile iletişime geçin.`,
  };
});

// ---------------------------------------------------------------------------
// 2) Profichip Gömülü Çözümler — 9 benzersiz kayıt (bkz. dosya başındaki not)
// ---------------------------------------------------------------------------

type Chip = { slug: string; model: string; group: string; kind: string; desc: string; url: string; order: number };
const CHIPS: Chip[] = [
  {
    slug: "yaskawa-vipa-triton",
    model: "TRITON",
    group: "Industrial Processors",
    kind: "Endüstriyel İşlemci SoC",
    desc: "Gigabit Ethernet + PLC + backplane master + motion kontrolcüsü birleşik SoC; 3× ARM Cortex-A17 (1,26 GHz'e kadar); PROFINET RT/IRT, EtherCAT, Mechatrolink-III/IV destekler, TSN'ye hazırdır.",
    url: "https://www.yaskawa.com.tr/kontrol/profichip/productdetail/product/triton_9946",
    order: 100,
  },
  {
    slug: "yaskawa-vipa-antaios",
    model: "ANTAIOS",
    group: "Industrial Processors",
    kind: "Gerçek Zamanlı Ethernet SoC",
    desc: "Gerçek zamanlı Ethernet SoC; ARM Cortex-A5 (288 MHz); PROFINET, EtherCAT, EtherNet/IP, Modbus-TCP, Mechatrolink III/IV protokollerini destekler.",
    url: "https://www.yaskawa.com.tr/kontrol/profichip/productdetail/product/antaios_9947",
    order: 101,
  },
  { slug: "yaskawa-vipa-mpi12x", model: "MPI12x", group: "Fieldbus", kind: "Fieldbus Haberleşme Çipi", desc: "MPI (Multi Point Interface) protokol haberleşme çipi/kontrolcüsü.", url: "https://www.yaskawa.com.tr/kontrol/profichip", order: 110 },
  { slug: "yaskawa-vipa-vpc3-c", model: "VPC3+C", group: "Fieldbus", kind: "PROFIBUS Haberleşme Çipi", desc: "PROFIBUS protokol kontrolcü çipi (VPC3+ ailesi, C varyantı).", url: "https://www.yaskawa.com.tr/kontrol/profichip", order: 111 },
  { slug: "yaskawa-vipa-vpc3-s", model: "VPC3+S", group: "Fieldbus", kind: "PROFIBUS Haberleşme Çipi", desc: "PROFIBUS protokol kontrolcü çipi (VPC3+ ailesi, S varyantı).", url: "https://www.yaskawa.com.tr/kontrol/profichip", order: 112 },
  { slug: "yaskawa-vipa-vpcls2", model: "VPCLS2", group: "Fieldbus", kind: "PROFIBUS Haberleşme Çipi", desc: "PROFIBUS protokol kontrolcü çipi (VPC ailesi, LS2 varyantı).", url: "https://www.yaskawa.com.tr/kontrol/profichip", order: 113 },
  { slug: "yaskawa-vipa-proficonn", model: "proficonn", group: "Fieldbus", kind: "PROFIBUS Konnektör/Arayüz Bileşeni", desc: "PROFIBUS bağlantı/arayüz bileşeni; findings kaynağında hem Fieldbus hem Components (Bileşenler) alt bölümünde listelenmiştir.", url: "https://www.yaskawa.com.tr/kontrol/profichip", order: 114 },
  {
    slug: "yaskawa-vipa-antaios-evaluation-kit",
    model: "ANTAIOS Evaluation Kit",
    group: "Evaluation Kit",
    kind: "Değerlendirme Kiti",
    desc: "ANTAIOS SoC için geliştirici/değerlendirme kiti (sipariş kodu: PAAE1000/1001).",
    url: "https://www.yaskawa.com.tr/kontrol/profichip",
    order: 120,
  },
  { slug: "yaskawa-vipa-easyconn-pb", model: "EasyConn PB", group: "Components", kind: "PROFIBUS Bağlantı Bileşeni", desc: "PROFIBUS hat bağlantısı için konnektör/bileşen.", url: "https://www.yaskawa.com.tr/kontrol/profichip", order: 130 },
];

const profichipProducts: Product[] = CHIPS.map((c): Product => ({
  slug: c.slug,
  brand: "Yaskawa",
  brandLogo: YASKAWA_LOGO,
  model: c.model,
  name: `${c.model} — VIPA (Yaskawa) ${c.kind.toLocaleLowerCase("tr-TR")}`,
  category: CATEGORY_PROFICHIP,
  summary: `VIPA (Yaskawa) ${c.kind.toLocaleLowerCase("tr-TR")} — ${c.desc} OEM/makine üreticisi ve sistem entegratörlerine yöneliktir, kendi kontrol kartı/cihaz tasarımına entegre edilir.`,
  specs: [
    { label: "Marka", value: "VIPA (Yaskawa) Profichip" },
    { label: "Ürün grubu", value: c.group },
    { label: "Tür", value: c.kind },
    { label: "Açıklama", value: c.desc },
    { label: "Hedef kullanıcı", value: "OEM / makine üreticisi / sistem entegratörü (son kullanıcıya yönelik değildir)" },
  ],
  source: { label: "Yaskawa Profichip sayfası", url: c.url },
  specNote: VIPA_NOTE,
  series: `Profichip – ${c.group}`,
  groupOrder: c.order,
  seriesIntro: "VIPA (Yaskawa) Profichip, PROFINET/PROFIBUS ve diğer endüstriyel Ethernet protokolleri için gömülü haberleşme çipleri (SoC) ve bileşenler üreten Yaskawa/VIPA markasıdır; ürünler son kullanıcıya değil OEM ve sistem entegratörlerine yöneliktir.",
  kindLabel: "Gömülü Haberleşme Çipi/SoC",
  seoText: [
    `VIPA (Yaskawa) ${c.model}, ${c.desc}`,
    AOM_PROFICHIP_PARA,
  ],
  keywords: [`Yaskawa ${c.model}`, "VIPA Profichip", "gömülü haberleşme çipi", "PROFINET SoC", "PROFIBUS kontrolcü çipi", "OEM haberleşme çipi"],
  seoTitle: `VIPA (Yaskawa) Profichip ${c.model}`,
  metaDescription: `VIPA (Yaskawa) Profichip ${c.model}: ${c.kind}. OEM/entegratör için teklif: Ankara merkezli AOM.`,
}));

// ---------------------------------------------------------------------------
// 3) Sistemler (Sistem Mühendisliği) — 7 adlandırılmış çözüm paketi
// ---------------------------------------------------------------------------

type Sistem = { slug: string; model: string; group: string; app: string; payload: string | null; desc: string; order: number };
const SISTEMLER: Sistem[] = [
  { slug: "yaskawa-motoman-arcworld-cs", model: "MOTOMAN ArcWorld CS", group: "Standart Ark Kaynağı", app: "Ark kaynağı", payload: null, desc: "MOTOMAN robotu üzerine kurulu, standart ark kaynağı uygulamaları için mühendislik çözüm paketi.", order: 200 },
  { slug: "yaskawa-motoman-arcworld-rs-hs-micro", model: "ArcWorld RS/HS Micro", group: "Standart Ark Kaynağı", app: "Ark kaynağı", payload: null, desc: "MOTOMAN robotu üzerine kurulu, küçük parça / kompakt hücre ark kaynağı mühendislik çözüm paketi (RS/HS Micro).", order: 201 },
  { slug: "yaskawa-motoman-weld4me", model: "Weld4Me", group: "Standart Ark Kaynağı", app: "Ark kaynağı", payload: null, desc: "MOTOMAN robotu üzerine kurulu, kolay devreye alınan ark kaynağı mühendislik çözüm paketi.", order: 202 },
  { slug: "yaskawa-motoman-arcsystem", model: "MOTOMAN ArcSystem", group: "Standart Ark Kaynağı", app: "Ark kaynağı", payload: null, desc: "MOTOMAN robotu üzerine kurulu, standart ark kaynağı sistemi mühendislik çözüm paketi.", order: 203 },
  { slug: "yaskawa-motoman-weld4me-ce", model: "Weld4Me CE", group: "Standart Ark Kaynağı", app: "Ark kaynağı", payload: null, desc: "Weld4Me ailesinin CE (Avrupa) uyumlu varyantı; MOTOMAN robotu üzerine kurulu ark kaynağı mühendislik çözüm paketi.", order: 204 },
  { slug: "yaskawa-motoman-abkant-mh50", model: "Abkant MH50", group: "Pres Besleme", app: "Pres (abkant) besleme", payload: "50 kg", desc: "50 kg taşıma kapasiteli MOTOMAN robotu üzerine kurulu, abkant/pres besleme mühendislik çözüm paketi.", order: 210 },
  { slug: "yaskawa-motoman-abkant-mh180", model: "Abkant MH180", group: "Pres Besleme", app: "Pres (abkant) besleme", payload: "180 kg", desc: "180 kg taşıma kapasiteli MOTOMAN robotu üzerine kurulu, abkant/pres besleme mühendislik çözüm paketi.", order: 211 },
];

const SISTEM_URL = "https://www.yaskawa.com.tr/sistemler/sistem-muhendisligi";

const sistemProducts: Product[] = SISTEMLER.map((s): Product => {
  const specs: { label: string; value: string }[] = [
    { label: "Marka", value: "Yaskawa (MOTOMAN)" },
    { label: "Tür", value: "Mühendislik çözüm paketi (proje bazlı iş hücresi)" },
    { label: "Temel platform", value: "MOTOMAN endüstriyel robot" },
    { label: "Uygulama", value: s.app },
  ];
  if (s.payload) specs.push({ label: "Robot taşıma kapasitesi", value: s.payload });
  return {
    slug: s.slug,
    brand: "Yaskawa",
    brandLogo: YASKAWA_LOGO,
    model: s.model,
    name: `${s.model} — MOTOMAN ${s.app.toLocaleLowerCase("tr-TR")} çözüm paketi`,
    category: CATEGORY_SISTEMLER,
    summary: `${s.desc}`,
    specs,
    source: { label: "Yaskawa Sistem Mühendisliği sayfası", url: SISTEM_URL },
    specNote: SISTEM_NOTE,
    series: `Sistem Mühendisliği – ${s.group}`,
    groupOrder: s.order,
    seriesIntro:
      s.group === "Standart Ark Kaynağı"
        ? "Standart Ark Kaynağı, MOTOMAN endüstriyel robotları üzerine kurulu, projeye göre yapılandırılan ark kaynağı iş hücresi çözüm paketleridir."
        : "Pres Besleme, MOTOMAN endüstriyel robotları üzerine kurulu, abkant/pres besleme uygulamaları için projeye göre yapılandırılan iş hücresi çözüm paketleridir.",
    kindLabel: "Robotik Otomasyon Çözüm Paketi",
    seoText: [s.desc, AOM_SISTEM_PARA],
    keywords: [`Yaskawa ${s.model}`, "MOTOMAN robotik çözüm", s.app, "robotik otomasyon çözümü", "MOTOMAN sistem entegrasyonu Ankara"],
    seoTitle: `Yaskawa MOTOMAN ${s.model}`,
    metaDescription: `Yaskawa MOTOMAN ${s.model}: ${s.app} için mühendislik çözüm paketi. Teklif için Ankara merkezli AOM ile iletişime geçin.`,
  };
});

export const yaskawaKontrolDigerProducts: Product[] = [
  ...panelPcProducts,
  ...lineDisplayProducts,
  ...smartPanelProducts,
  ...profichipProducts,
  ...sistemProducts,
];
