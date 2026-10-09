// Gefran güç kontrol ürünleri (07-10-2026). AOM, Gefran yetkili satış noktasıdır.
// Kaynak: Web Sitesi projesi, urun-verisi/gefran-urunleri_07-10-2026.json (Gefran ürün sayfalarından derlendi).
// 18 seri: tristörlü güç kontrol (10), solid state röle (7), motor yol verici (1). Fiyat yok: "Fiyat için teklif isteyin".
// Görseller Gefran ürün sayfalarındaki resmi görsellerdir (public/magaza/gefran-<seri>_07-10-2026.jpg).
import type { Product } from "./magaza";
import data from "./gefran_07-10-2026.json";

type Raw = {
  slug: string;
  series: string;
  name: string;
  subtitle: string;
  category_slug: string;
  short_description: string;
  about: string;
  applications: string[];
  specs: { name: string; value: string }[];
  manufacturer_url: string;
  image: string;
  source_note: string;
  seo_title: string;
  seo_description: string;
};

export const GEFRAN_BRAND = data.brand;

const CAT: Record<string, { title: string; group: string; order: number; kind: string }> = {
  "tristorlu-guc-kontrol": { title: "Tristörlü güç kontrol", group: "Gefran güç kontrol üniteleri", order: 100, kind: "güç kontrol" },
  "solid-state-roleler-ssr": { title: "Solid state röleler (SSR)", group: "Gefran solid state röleler", order: 100, kind: "solid state röle" },
  "motor-starter": { title: "Motor yol vericiler (motor starter)", group: "Gefran motor yol vericiler", order: 100, kind: "motor yol verici" },
};
export const GEFRAN_MOTOR_STARTER_CATEGORY = CAT["motor-starter"].title;

export const gefranProducts: Product[] = (data.products as Raw[]).map((r) => {
  const c = CAT[r.category_slug];
  return {
    slug: r.slug,
    brand: "Gefran",
    model: r.series,
    name: r.subtitle,
    category: c.title,
    summary: r.short_description,
    image: { src: r.image, alt: `Gefran ${r.series} ${r.subtitle.split(",")[0].toLocaleLowerCase("tr-TR")}` },
    imageNote: "Görsel Gefran'a aittir; AOM Gefran yetkili satış noktasıdır.",
    specs: [{ label: "Marka", value: "Gefran" }, { label: "Seri", value: r.series }, ...r.specs.map((s) => ({ label: s.name, value: s.value }))],
    source: { label: "Gefran ürün sayfası", url: r.manufacturer_url },
    specNote: r.source_note,
    seoText: [
      r.about,
      `Uygulamalar: ${r.applications.join(", ")}.`,
      `AOM, Gefran yetkili satış noktası olarak ${r.series} serisinde model ve sipariş kodu seçimi, pano entegrasyonu ve devreye alma desteği verir. Fiyat ve teslim süresi için teklif isteyin; Ankara'dan Türkiye'nin her şehrine gönderim yapılır.`,
    ],
    keywords: [`Gefran ${r.series}`, `${r.series} ${c.kind}`, `Gefran ${c.kind}`, `Gefran ${c.kind} fiyat`, `Gefran Ankara`, `Gefran yetkili satıcı`],
    seoTitle: r.seo_title.replace(/ \| AOM$/, ""),
    metaDescription: r.short_description, // seo_description kırpılmış short_description + "Ankara AOM'dan teklif."; sayfa zaten "Fiyat için teklif isteyin" + bölge satırı ekliyor
    groupTitle: c.group,
    groupOrder: c.order,
  };
});
