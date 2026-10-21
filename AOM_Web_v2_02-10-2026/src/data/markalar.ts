import { GEFRAN_BRAND } from "./gefran";

// Marka sayfaları (/magaza/marka/<slug>). Gefran (07-10-2026, 14-10-2026'da "satış noktası ve teknik
// destek" olarak güncellendi) için bu ilişki önceden doğrulanmıştı. Diğer markalar (11-10-2026), ana
// sayfadaki "OEM partnerlikleri" bölümünde zaten yer alan, sözleşmeli/kullanım onaylı OEM partnerleridir;
// bunlar için "yetkili satıcı/distribütör" gibi doğrulanmamış bir ilişki iddia edilmez — sayfa metni
// yalnız OEM partnerliği ve (varsa) mağaza kataloğundaki gerçek ürün varlığına dayanır. Ürünü olmayan
// markalarda sayfa tanıtım + teklif çağrısı içerir.
export const BRANDS: Record<
  string,
  { name: string; country: string; site: string; seoTitle: string; description: string; intro: string[]; eyebrow?: string; keyword?: string }
> = {
  gefran: {
    name: GEFRAN_BRAND.name,
    country: GEFRAN_BRAND.country,
    site: GEFRAN_BRAND.manufacturer_url,
    seoTitle: "Gefran Satış Noktası ve Teknik Destek – Güç Kontrol, SSR, Motor Starter | Ankara",
    description:
      "AOM, Gefran satış noktası ve teknik destek: GRC, GPC, GRM, GFX4, GFX tristörlü güç kontrol üniteleri; GRS, GRP, GRZ, GQ solid state röleler; G-Start motor yol verici. Ankara'dan Türkiye geneline teklif.",
    eyebrow: "Satış noktası ve teknik destek · Ankara ve Türkiye geneli",
    keyword: "satış noktası ve teknik destek",
    intro: [
      GEFRAN_BRAND.brand_page_intro,
      "Gefran, İtalya merkezli endüstriyel otomasyon üreticisidir. Aşağıda Gefran güç kontrol serileri kategorilerine göre listelenir; her serinin teknik özellikleri ve Gefran ürün sayfası bağlantısı ürün sayfasında yer alır. Fiyat için teklif isteyin.",
    ],
  },
  fanuc: {
    name: "Fanuc",
    country: "Japonya",
    site: "https://www.fanuc.com",
    seoTitle: "Fanuc OEM Partneri – CNC Kontrol ve Yedek Parça | Ankara",
    description:
      "AOM'un OEM partnerlerinden Fanuc; CNC işleme merkezlerinde Fanuc kontrol seçeneği sunulur, mağazada Fanuc yedek parçaları bulunur. Ankara'dan Türkiye geneline teklif.",
    intro: [
      "Fanuc, AOM'un OEM partnerlerinden biridir. Kompakt CNC işleme merkezi projelerinde Fanuc kontrol seçeneği sunulur.",
      "Aşağıda AOM mağazasındaki Fanuc yedek parçaları kategorilerine göre listelenir. Fiyat için teklif isteyin.",
    ],
  },
  siemens: {
    name: "Siemens",
    country: "Almanya",
    site: "https://www.siemens.com",
    seoTitle: "Siemens OEM Partneri – CNC Kontrol ve Yedek Parça | Ankara",
    description:
      "AOM'un OEM partnerlerinden Siemens; CNC işleme merkezlerinde Siemens kontrol seçeneği sunulur, mağazada Siemens V20 invertör, şalt ürünleri ve yedek parçalar bulunur. Ankara'dan Türkiye geneline teklif.",
    intro: [
      "Siemens, AOM'un OEM partnerlerinden biridir. Kompakt CNC işleme merkezi projelerinde Siemens kontrol seçeneği sunulur.",
      "Aşağıda AOM mağazasındaki Siemens ürünleri (invertör, şalt ürünleri, kontrol kartları, yedek parça) kategorilerine göre listelenir. Fiyat için teklif isteyin.",
    ],
  },
  "mitsubishi-electric": {
    name: "Mitsubishi Electric",
    country: "Japonya",
    site: "https://www.mitsubishielectric.com/fa/",
    seoTitle: "Mitsubishi Electric OEM Partneri – CNC Kontrol ve Yedek Parça | Ankara",
    description:
      "AOM'un OEM partnerlerinden Mitsubishi Electric; CNC işleme merkezlerinde Mitsubishi Electric kontrol seçeneği sunulur, mağazada yedek parçaları bulunur. Ankara'dan Türkiye geneline teklif.",
    intro: [
      "Mitsubishi Electric, AOM'un OEM partnerlerinden biridir. Kompakt CNC işleme merkezi projelerinde Mitsubishi Electric kontrol seçeneği sunulur.",
      "Aşağıda AOM mağazasındaki Mitsubishi Electric yedek parçaları kategorilerine göre listelenir. Fiyat için teklif isteyin.",
    ],
  },
  delta: {
    name: "Delta",
    country: "Tayvan",
    site: "https://www.deltaww.com",
    seoTitle: "Delta Ürünleri – İnvertör ve Yedek Parça | Ankara",
    description:
      "AOM mağazasında Delta VFD-E/EL/EL-W invertör serisi ve Delta yedek parçaları bulunur. Ankara'dan Türkiye geneline teklif.",
    intro: [
      "Delta, AOM'un OEM partnerlerinden biridir.",
      "Aşağıda AOM mağazasındaki Delta ürünleri (invertör serileri ve yedek parça) kategorilerine göre listelenir. Fiyat için teklif isteyin.",
    ],
  },
  omron: {
    name: "Omron",
    country: "Japonya",
    site: "https://www.omron.com",
    seoTitle: "Omron Ürünleri – Yedek Parça | Ankara",
    description: "AOM mağazasında Omron yedek parçaları bulunur. Ankara'dan Türkiye geneline teklif.",
    intro: [
      "Omron, AOM'un OEM partnerlerinden biridir.",
      "Aşağıda AOM mağazasındaki Omron yedek parçaları kategorilerine göre listelenir. Fiyat için teklif isteyin.",
    ],
  },
  panasonic: {
    name: "Panasonic",
    country: "Japonya",
    site: "https://industrial.panasonic.com",
    seoTitle: "Panasonic Ürünleri – Yedek Parça | Ankara",
    description: "AOM mağazasında Panasonic yedek parçaları bulunur. Ankara'dan Türkiye geneline teklif.",
    intro: [
      "Panasonic, AOM'un OEM partnerlerinden biridir.",
      "Aşağıda AOM mağazasındaki Panasonic yedek parçaları kategorilerine göre listelenir. Fiyat için teklif isteyin.",
    ],
  },
  autonics: {
    name: "Autonics",
    country: "Güney Kore",
    site: "https://www.autonics.com",
    seoTitle: "Autonics Ürünleri – Güç Kontrol, SSR, Enkoder, Kontrol Cihazı | Ankara",
    description:
      "AOM mağazasında Autonics'in tristörlü güç kontrol (DPU, SPR), solid state röle (SSR), enkoder ve kontrol cihazı (sıcaklık kontrol, sayıcı, zamanlayıcı, panel metre vb.) serileri geniş kapsamda yer alır. Ankara'dan Türkiye geneline teklif.",
    intro: [
      "Autonics, AOM'un OEM partnerlerinden biridir ve mağazada en kapsamlı ürün ailesine sahiptir.",
      "Aşağıda AOM mağazasındaki Autonics ürünleri (tristörlü güç kontrol, SSR, enkoder, kontrol cihazları) kategorilerine göre listelenir; büyük serilerde sipariş kodu listesi sayfaları da ayrıca bulunur. Fiyat için teklif isteyin.",
    ],
  },
  abb: {
    name: "ABB",
    country: "İsviçre",
    site: "https://www.abb.com",
    seoTitle: "ABB OEM Partneri | AOM Ankara",
    description: "ABB, AOM'un OEM partnerlerinden biridir. Ürün seçimi ve teklif için AOM ile iletişime geçin.",
    intro: ["ABB, AOM'un OEM partnerlerinden biridir. Projenize uygun ABB ürünleri için bizimle iletişime geçin."],
  },
  pilz: {
    name: "Pilz",
    country: "Almanya",
    site: "https://www.pilz.com",
    seoTitle: "Pilz OEM Partneri – Pres Güvenliği | Ankara",
    description:
      "Pilz, AOM'un OEM partnerlerinden biridir; pres güvenliği çözümlerinde (ışık perdesi, kilitli kapı, güvenlik rölesi) kullanılır.",
    intro: [
      "Pilz, AOM'un OEM partnerlerinden biridir. AOM'un pres güvenliği ve otomatik besleme çözümlerinde (ışık perdesi, kavrama-fren dönüşümü, kafes ve kilitli kapı çözümleri) kullanılan markalardan biridir.",
      "Projenize uygun Pilz ürünleri için bizimle iletişime geçin.",
    ],
  },
  leuze: {
    name: "Leuze",
    country: "Almanya",
    site: "https://www.leuze.com",
    seoTitle: "Leuze OEM Partneri – Endüstriyel Sensör | Ankara",
    description: "Leuze, AOM'un OEM partnerlerinden biridir; endüstriyel sensör ve güvenlik çözümlerinde kullanılır.",
    intro: [
      "Leuze, AOM'un OEM partnerlerinden biridir. Endüstriyel sensör ve güvenlik çözümlerinde kullanılan markalardan biridir.",
      "Projenize uygun Leuze ürünleri için bizimle iletişime geçin.",
    ],
  },
  // 21-10-2026 eklendi (Mert talebi): Balluff, Pilz/Leuze/Banner ile aynı kalıpta (yalnız OEM partnerliği,
  // doğrulanmamış "yetkili satıcı/distribütör" iddiası yok); aksi halde /magaza/marka/balluff 404 verirdi.
  balluff: {
    name: "Balluff",
    country: "Almanya",
    site: "https://www.balluff.com",
    seoTitle: "Balluff OEM Partneri – Endüstriyel Sensör | Ankara",
    description: "Balluff, AOM'un OEM partnerlerinden biridir; endüstriyel sensör ve otomasyon çözümlerinde kullanılır.",
    intro: [
      "Balluff, AOM'un OEM partnerlerinden biridir. Endüstriyel sensör ve otomasyon çözümlerinde kullanılan markalardan biridir.",
      "Projenize uygun Balluff ürünleri için bizimle iletişime geçin.",
    ],
  },
  banner: {
    name: "Banner",
    country: "ABD",
    site: "https://www.bannerengineering.com",
    seoTitle: "Banner OEM Partneri – Endüstriyel Sensör | Ankara",
    description: "Banner, AOM'un OEM partnerlerinden biridir; endüstriyel sensör ve güvenlik çözümlerinde kullanılır.",
    intro: [
      "Banner, AOM'un OEM partnerlerinden biridir. Endüstriyel sensör ve güvenlik çözümlerinde kullanılan markalardan biridir.",
      "Projenize uygun Banner ürünleri için bizimle iletişime geçin.",
    ],
  },
  "schneider-electric": {
    name: "Schneider Electric",
    country: "Fransa",
    site: "https://www.se.com",
    seoTitle: "Schneider Electric OEM Partneri | AOM Ankara",
    description: "Schneider Electric, AOM'un OEM partnerlerinden biridir; pano/şalt ürünleri ve otomasyon bileşenlerinde kullanılır.",
    intro: [
      "Schneider Electric, AOM'un OEM partnerlerinden biridir. Pano/şalt ürünleri ve otomasyon bileşenlerinde kullanılan markalardan biridir.",
      "Projenize uygun Schneider Electric ürünleri için bizimle iletişime geçin.",
    ],
  },
  // 19-10-2026 eklendi (Mert talebi, OEM partnerlikleri ızgarasına yeni logo): diğer salt-OEM-partneri
  // markalar (ABB, Pilz, Leuze, Banner) ile aynı kalıp — mağaza kataloğunda ürünü yok, sayfa yalnızca
  // tanıtım + teklif çağrısı içerir, doğrulanmamış rakam/iddia yok.
  lenze: {
    name: "Lenze",
    country: "Almanya",
    site: "https://www.lenze.com",
    seoTitle: "Lenze OEM Partneri | AOM Ankara",
    description: "Lenze, AOM'un OEM partnerlerinden biridir; motor sürücü ve tahrik teknolojileri alanında kullanılır.",
    intro: [
      "Lenze, AOM'un OEM partnerlerinden biridir. Motor sürücü ve tahrik teknolojileri alanında kullanılan markalardan biridir.",
      "Projenize uygun Lenze ürünleri için bizimle iletişime geçin.",
    ],
  },
  inovance: {
    name: "Inovance",
    country: "Çin",
    site: "https://www.inovance.com",
    seoTitle: "Inovance OEM Partneri | AOM Ankara",
    description: "Inovance, AOM'un OEM partnerlerinden biridir; servo motor, motor sürücü ve otomasyon bileşenlerinde kullanılır.",
    intro: [
      "Inovance, AOM'un OEM partnerlerinden biridir. Servo motor, motor sürücü ve otomasyon bileşenlerinde kullanılan markalardan biridir.",
      "Projenize uygun Inovance ürünleri için bizimle iletişime geçin.",
    ],
  },
  // 21-10-2026 eklendi (Mert talebi, OEM ızgarası sağa 2 sütun/3 satır genişletildi) — bkz.
  // claude/OEM_LOGO_WEIDMULLER_TELEMECANIQUE_LSELECTRIC_KEYENCE_21-10-2026.md
  weidmuller: {
    name: "Weidmüller",
    country: "Almanya",
    site: "https://www.weidmueller.com",
    seoTitle: "Weidmüller OEM Partneri – Endüstriyel Bağlantı Teknolojileri | Ankara",
    description: "Weidmüller, AOM'un OEM partnerlerinden biridir; endüstriyel bağlantı, klemens ve arayüz teknolojilerinde kullanılır.",
    intro: [
      "Weidmüller, AOM'un OEM partnerlerinden biridir. Endüstriyel bağlantı, klemens ve arayüz teknolojilerinde kullanılan markalardan biridir.",
      "Projenize uygun Weidmüller ürünleri için bizimle iletişime geçin.",
    ],
  },
  "telemecanique-sensors": {
    name: "Telemecanique Sensors",
    country: "Fransa",
    site: "https://www.telemecaniquesensors.com",
    seoTitle: "Telemecanique Sensors OEM Partneri – Endüstriyel Sensör | Ankara",
    description: "Telemecanique Sensors, AOM'un OEM partnerlerinden biridir; endüstriyel sensör çözümlerinde kullanılır.",
    intro: [
      "Telemecanique Sensors, AOM'un OEM partnerlerinden biridir. Endüstriyel sensör çözümlerinde kullanılan markalardan biridir.",
      "Projenize uygun Telemecanique Sensors ürünleri için bizimle iletişime geçin.",
    ],
  },
  "ls-electric": {
    name: "LS Electric",
    country: "Güney Kore",
    site: "https://www.lselectric.com",
    seoTitle: "LS Electric OEM Partneri – Endüstriyel Otomasyon | Ankara",
    description: "LS Electric, AOM'un OEM partnerlerinden biridir; endüstriyel otomasyon ve güç elektroniği ürünlerinde kullanılır.",
    intro: [
      "LS Electric, AOM'un OEM partnerlerinden biridir. Endüstriyel otomasyon ve güç elektroniği ürünlerinde kullanılan markalardan biridir.",
      "Projenize uygun LS Electric ürünleri için bizimle iletişime geçin.",
    ],
  },
  keyence: {
    name: "Keyence",
    country: "Japonya",
    site: "https://www.keyence.com.tr",
    seoTitle: "Keyence OEM Partneri – Endüstriyel Sensör ve Görüntüleme | Ankara",
    description: "Keyence, AOM'un OEM partnerlerinden biridir; endüstriyel sensör, ölçüm ve görüntüleme sistemlerinde kullanılır.",
    intro: [
      "Keyence, AOM'un OEM partnerlerinden biridir. Endüstriyel sensör, ölçüm ve görüntüleme sistemlerinde kullanılan markalardan biridir.",
      "Projenize uygun Keyence ürünleri için bizimle iletişime geçin.",
    ],
  },
  // 20-10-2026 eklendi (Mert talebi, Yaskawa robot kataloğu mağazaya işlendi): Yaskawa zaten ana sayfadaki
  // OEM partnerlikleri ızgarasında yer alıyordu; mağazada artık gerçek ürün kataloğu (88 robot modeli) de
  // bulunduğundan sayfa, diğer salt-tanıtım OEM markalarından farklı olarak ürün kategorisine bağlanır.
  // "Yetkili satıcı/distribütör" gibi doğrulanmamış bir ilişki iddia edilmez; AOM'un kendi robotik otomasyon
  // ve entegrasyon hizmetine dayanan bir metin kullanılır (Gefran/Autonics'teki "satış noktası" ifadesinden farklı).
  yaskawa: {
    name: "Yaskawa",
    country: "Japonya",
    site: "https://www.yaskawa.com.tr",
    seoTitle: "Yaskawa MOTOMAN Robot, AC Sürücü, Servo ve VIPA PLC | Ankara",
    description:
      "AOM'un OEM partnerlerinden Yaskawa; mağazada MOTOMAN robot serileri (17 seri, 88 model), AC sürücüler (GA500/GA700/A1000/V1000/D1000/U1000 ve diğerleri, 13 seri), Sigma-7/Sigma-X servo motor ve sürücüler (20 seri), VIPA markalı Micro PLC/SLIO/300S+ PLC sistemleri (212 model) ve HMI/Panel PC ürünleri yer alır. Ankara'dan Türkiye geneline teklif.",
    eyebrow: "Robotik otomasyon, AC sürücü, servo, kontrol sistemleri ve entegrasyon · Ankara ve Türkiye geneli",
    intro: [
      "Yaskawa, AOM'un OEM partnerlerinden biridir. AOM, robotik otomasyon, AC sürücü/servo sistem seçimi ve kaynak projelerinde Yaskawa ürünlerini entegre eder; model seçimi, hücre tasarımı ve devreye alma desteği sunar.",
      "Aşağıda AOM mağazasındaki Yaskawa MOTOMAN robot serileri (taşıma, kolaboratif, kaynak, boyama, paletleme, paketleme), AC sürücüler (genel amaçlı, özel uygulama ve rejeneratif) ve Sigma-7/Sigma-X servo motor ve sürücüler listelenir; teknik veriler Yaskawa'nın resmi ürün sayfalarından alınmıştır. Mağazada ayrıca Yaskawa'nın satın aldığı VIPA markalı Micro PLC, SLIO ve 300S+ SPEED7 tabanlı PLC/IO kontrol sistemleri (212 model) ile HMI/Panel PC ürünleri yer alır — PLC ve HMI/Panel PC ürünleri \"VIPA (Yaskawa)\" olarak, Yaskawa diye tek başına değil, doğru markasıyla listelenir. Fiyat ve teslim süresi için teklif isteyin.",
    ],
  },
};
