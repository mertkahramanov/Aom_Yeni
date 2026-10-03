// Mağaza ürünleri. Yeni ürün eklemek için bu listeye bir kayıt ekleyin.
// Teknik veriler üretici kataloğundan alınır; teyit edilmemiş değerler [TEYİT] ile işaretlenir.
// Fiyat: liste fiyatı + indirim oranı girilir, indirimli fiyat otomatik hesaplanır.
// Fiyat bilgisi yoksa sayfada "Teklif isteyin" gösterilir.

export type Product = {
  slug: string;
  brand: string;
  brandLogo: { src: string; w: number; h: number };
  model: string;
  name: string;
  category: string;
  summary: string;
  image?: { src: string; alt: string };
  specs: { label: string; value: string }[];
  source: { label: string; url: string };
  price?: { list: number; currency: "USD" | "EUR" | "TRY"; discountPct?: number; note?: string };
};

export const products: Product[] = [
  {
    slug: "autonics-dpu34d-500a",
    brand: "Autonics",
    brandLogo: { src: "/oem/autonics_03-10-2026.png", w: 746, h: 160 },
    model: "DPU34D-500A",
    name: "Dijital tristörlü güç kontrol ünitesi, 3 faz, 440 V, 500 A",
    category: "Tristörlü güç kontrol",
    summary:
      "Isıtıcı ve endüstriyel yük kontrolü için 3 fazlı dijital tristör güç kontrol ünitesi. Faz açısı, çevrim ve ON/OFF kontrol; analog, kontak veya RS485 üzerinden kumanda. Harici gösterge ekranı ve RS485 haberleşme seçeneğiyle.",
    image: { src: "/magaza/autonics-dpu34d-500a_03-10-2026.jpg", alt: "Autonics DPU34D-500A tristörlü güç kontrol ünitesi, ön panelde dijital gösterge" },
    // Kaynak: Autonics ürün sayfası teknik tablosu (Mert, 03-10-2026); * işaretliler DPU serisi kataloğundan.
    specs: [
      { label: "Faz sayısı", value: "3 faz (trifaze)" },
      { label: "Besleme", value: "440 V" },
      { label: "Akım kapasitesi", value: "500 A" },
      { label: "Gövde", value: "D (400–600 A)" },
      { label: "Seçenek", value: "Harici gösterge ekranı + RS485 haberleşme" },
      { label: "Kontrol girişi", value: "Otomatik: 4–20 mA, 0–20 mA, 0–5 VDC, 1–5 VDC, 0–10 VDC, gerilim palsi (0/12 VDC), kontak girişi (ON/OFF), haberleşme girişi (RS485). Elle: dahili 10 kΩ potansiyometre, harici 3–10 kΩ potansiyometre (en az 2 W)" },
      { label: "Kontrol yöntemi", value: "Faz kontrolü: normal (geri beslemesiz), sabit gerilim / akım / güç (geri beslemeli). Çevrim kontrolü (sıfır geçiş): sabit çevrim. ON/OFF (sıfır geçiş)" },
      { label: "Yük", value: "Faz kontrolü: rezistif ve endüktif yükler. ON/OFF ve çevrim kontrolü: rezistif yük" },
      { label: "Çıkış aralığı", value: "Faz kontrolü %0–98; çevrim ve ON/OFF kontrolü %0–100" },
      { label: "Gösterge", value: "R, S, T göstergesi (yeşil); çalıştırma / manuel kontrol göstergesi (yeşil); DI, alarm, ünite (V, A) göstergesi (kırmızı)" },
      { label: "Güç tüketimi", value: "≤ 60 W (güç kontrolü)" },
      { label: "Haberleşme*", value: "RS485, Modbus RTU" },
      { label: "Alarmlar*", value: "Aşırı akım, aşırı gerilim, sigorta atması, soğutucu aşırı sıcaklık, eleman arızası, ısıtıcı kopması" },
      { label: "Soğutma*", value: "Fanlı" },
      { label: "Ortam sıcaklığı", value: "−10…50 °C; depolama −20…80 °C (donma ve yoğuşma olmadan)" },
      { label: "Ortam nemi", value: "%5–90 RH; depolama %5–90 RH (donma ve yoğuşma olmadan)" },
      { label: "Ölçüler (G × Y × D)*", value: "427 × 528 × 275,5 mm" },
      { label: "Ağırlık", value: "≈ 30,8 kg (paketli ≈ 35,7 kg)" },
      { label: "Onaylar", value: "CE, UKCA, cULus, RoHS, EAC" },
    ],
    source: { label: "Autonics ürün sayfası", url: "https://www.autonics.com/tr/model/DPU34D-500A" },
    // Mert, 03-10-2026: liste fiyatı 5.227,00 USD, %40 indirim
    price: { list: 5227, currency: "USD", discountPct: 40, note: "[TEYİT: KDV durumu]" },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

const fmt = (v: number, c: string) =>
  new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v) + " " + c;

export function priceInfo(p: Product) {
  if (!p.price) return null;
  const { list, currency, discountPct, note } = p.price;
  const net = discountPct ? Math.round(list * (100 - discountPct)) / 100 : list;
  return {
    list: fmt(list, currency),
    net: fmt(net, currency),
    discount: discountPct ? `%${discountPct} indirim` : null,
    note: note ?? null,
  };
}
