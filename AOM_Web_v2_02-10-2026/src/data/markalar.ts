import { GEFRAN_BRAND } from "./gefran";

// Yetkili satıcısı olunan marka sayfaları (07-10-2026: Gefran).
export const BRANDS: Record<string, { name: string; country: string; site: string; seoTitle: string; description: string; intro: string[] }> = {
  gefran: {
    name: GEFRAN_BRAND.name,
    country: GEFRAN_BRAND.country,
    site: GEFRAN_BRAND.manufacturer_url,
    seoTitle: "Gefran Yetkili Satıcı – Güç Kontrol, SSR, Motor Starter | Ankara",
    description:
      "AOM, Gefran yetkili satış noktası: GRC, GPC, GRM, GFX4, GFX tristörlü güç kontrol üniteleri; GRS, GRP, GRZ, GQ solid state röleler; G-Start motor yol verici. Ankara'dan Türkiye geneline teklif.",
    intro: [
      GEFRAN_BRAND.brand_page_intro,
      "Gefran, İtalya merkezli endüstriyel otomasyon üreticisidir. Aşağıda Gefran güç kontrol serileri kategorilerine göre listelenir; her serinin teknik özellikleri ve Gefran ürün sayfası bağlantısı ürün sayfasında yer alır. Fiyat için teklif isteyin.",
    ],
  },
};
