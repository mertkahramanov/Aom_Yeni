// 2. el ürünler (Mert, 06-10-2026 / 07-10-2026).
// Kaynak: Mert'in stok listesi "Panel Hattı Parça Listesi" (1.330 satır). Aynı marka + kod + özellik satırları birleştirildi, adetler toplandı.
// Depo konumu (sandık / palet no) sitede YAYINLANMAZ; yalnız stok adedi gösterilir.
// Kodlar üretici koduna göre temizlendi (etiketteki lot / tarih / seri numaraları ayrıldı). Teknik tablo kategori şablonuna göre sabit
// satırlıdır; değer yalnız kodun üretici açılımından veya listedeki özellikten yazıldı, bilinmeyen alan boş bırakıldı.
// Görseller yalnız üreticinin kendi sitesinden; görseli olmayan ürün markasıyla gösterilir. Fiyat yok: "Teklif isteyin".
// Ayrıntı: 12_IKINCI_EL_URUNLER_07-10-2026.md / .csv
import type { Product } from "./magaza";
import raw from "./ikinci-el_07-10-2026.json";

export type UsedInfo = {
  condition?: string; // ör. "Çalışır durumda", "Yenilenmiş"
  tested?: string; // ör. "Test edildi (06-10-2026)"
  warranty?: string; // ör. "3 ay AOM garantisi"
  qty?: number; // stok adedi
  note?: string; // kozmetik durum, eksik parça vb.
};

export const IKINCI_EL_PREFIX = "2. El · ";

type Raw = {
  slug: string;
  brand: string;
  model: string;
  name: string;
  category: string; // "2. El · " öneki olmadan
  group: string;
  specs: [string, string][];
  qty: number | null;
  img: { file: string; scope: "model" | "seri" } | null;
  source: string;
};

const HIDE = ["Marka", "Orijinal kod", "Seri", "Ürün tipi"];
// İlk kelime kısaltma (AC, PLC, ISO, CC-Link…) değilse ilk harfi küçült
const lowerFirst = (t: string) => {
  const w = t.split(" ")[0];
  if (/[A-ZÇĞİÖŞÜ]/.test(w.slice(1))) return t;
  return t.charAt(0).toLocaleLowerCase("tr-TR") + t.slice(1);
};

export const ikinciElProducts: Product[] = (raw as Raw[]).map((r) => {
  const facts = r.specs.filter(([l, v]) => v && !HIDE.includes(l)).slice(0, 2);
  const type = r.specs.find(([l]) => l === "Ürün tipi")?.[1] ?? "";
  return {
    slug: r.slug,
    brand: r.brand,
    model: r.model,
    name: r.name,
    category: IKINCI_EL_PREFIX + r.category,
    summary: [type ? `2. el ${lowerFirst(type)}` : "2. el ürün", ...facts.map(([l, v]) => `${lowerFirst(l)}: ${v}`)].join("; ") + ". Durum bilgisi için teklif isteyin.",
    image: r.img ? { src: `/magaza/ikinci-el/${r.img.file}`, alt: r.name } : undefined,
    imageNote: r.img ? (r.img.scope === "seri" ? "Fotoğraf, üreticinin bu seri için yayınladığı görseldir; satıştaki ürün 2. eldir." : "Fotoğraf üreticiye aittir; satıştaki ürün 2. eldir.") : undefined,
    specs: r.specs.map(([label, value]) => ({ label, value })),
    specNote: "2. el üründür. Teknik değerler üretici kod açılımından alınmıştır; boş alanlar doğrulanmamıştır.",
    source: r.source ? { label: "Üretici sayfası", url: r.source } : undefined,
    groupTitle: r.group,
    used: { qty: r.qty ?? undefined },
  };
});
