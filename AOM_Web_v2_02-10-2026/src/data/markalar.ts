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
};
