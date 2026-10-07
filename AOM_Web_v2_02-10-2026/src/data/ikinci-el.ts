// 2. el ürünler (Mert, 06-10-2026). Mert'in gönderdiği ürünler buraya eklenir.
// Kurallar:
// - Kategori adı "2. El · <kategori>" biçimindedir (ör. "2. El · Servo sürücüler"); mağazada "2. El ürünler" başlığı altında toplanır.
// - Durum, test ve garanti bilgisi Mert'in verdiği bilgiden yazılır; bilinmeyen alan boş bırakılır, tahmin yazılmaz.
// - Görsel: Mert'in gönderdiği gerçek ürün fotoğrafı (başka bir siteden alınan görsel kullanılmaz).
// - Fiyat KDV hariç girilir; yoksa "Teklif isteyin" gösterilir.
import type { Product } from "./magaza";

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
  category: string; // "2. El · " öneki olmadan, ör. "Servo sürücüler"
  group?: string; // kategori içindeki grup (yoksa marka)
  specs?: [string, string][];
  image?: string; // /magaza/ikinci-el/... yolu
  used: UsedInfo;
  price?: Product["price"];
};

const RAW: Raw[] = [
  // Ürünler Mert'ten gelince buraya eklenecek.
];

export const ikinciElProducts: Product[] = RAW.map((r) => ({
  slug: r.slug,
  brand: r.brand,
  model: r.model,
  name: r.name,
  category: IKINCI_EL_PREFIX + r.category,
  summary: [r.used.condition, r.used.tested, r.used.warranty].filter(Boolean).join(" · ") || "2. el ürün. Durum bilgisi için bizimle iletişime geçin.",
  image: r.image ? { src: r.image, alt: `${r.brand} ${r.model} 2. el` } : undefined,
  specs: [
    ...(r.brand ? [{ label: "Marka", value: r.brand }] : []),
    { label: "Model / kod", value: r.model },
    ...(r.specs ?? []).map(([label, value]) => ({ label, value })),
  ],
  specNote: "2. el üründür. Teknik veriler üretici bilgisine dayanır; ürünün durumu yukarıda belirtilmiştir.",
  groupTitle: r.group ?? (r.brand || "Diğer"),
  price: r.price,
  used: r.used,
}));
