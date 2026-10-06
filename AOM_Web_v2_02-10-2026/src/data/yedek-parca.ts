// CNC yedek parçaları ve elektronik / mekanik ürünler (06-10-2026).
// Liste ankaracncmarket.com.tr ürün yelpazesinden çıkarıldı; o sitenin kodları, metinleri ve fotoğrafları KULLANILMADI.
// Her ürünün orijinal üreticisi ve parça numarası üretici siteleri, katalogları ve veri sayfalarıyla araştırıldı
// (ayrıntı ve doğrulama durumu: 10_ANKARACNCMARKET_DUZELTILMIS_KODLAR_06-10-2026.md / .csv).
// Doğrulanamayan kodlar sitede gösterilmez; ürün tanımıyla listelenir. Görseller yalnız üreticinin kendi sitesinden.
// Fiyat yok: "Teklif isteyin".
import type { Product } from "./magaza";
import raw from "./yedek-parca_06-10-2026.json";

type Raw = {
  slug: string;
  brand: string;
  model: string;
  name: string;
  category: string;
  group: string;
  gorder: number;
  specs: [string, string][];
  source: string;
  img: { file: string; scope: "model" | "seri" } | null;
};

const LOGOS: Record<string, { src: string; w: number; h: number }> = {
  Fanuc: { src: "/oem/fanuc_03-10-2026.png", w: 947, h: 160 },
  "Mitsubishi Electric": { src: "/oem/mitsubishi-electric_03-10-2026.png", w: 548, h: 160 },
  Omron: { src: "/oem/omron_03-10-2026.png", w: 509, h: 99 },
  Panasonic: { src: "/oem/panasonic_03-10-2026.png", w: 776, h: 119 },
};

// Kategori açıklaması (ürün sayfasındaki ikinci paragraf); iddia içermez.
const CAT_TEXT: Record<string, string> = {
  "CNC yedek parçaları":
    "CNC tezgâhlarında servo / iş mili sürücüleri, ana kartlar, G/Ç kartları, LCD ekranlar, tuş takımları, kablolar, konnektörler ve sistem pilleri arızada tezgâhın durmasına yol açar; doğru parça numarasıyla tedarik, değişimi hızlandırır.",
  Fanlar:
    "Fanlar pano, sürücü ve motor soğutmasında kullanılır. Seçimde dış ölçü, kalınlık, besleme gerilimi (DC veya AC), akım, devir ve yatak tipi (kaymalı, hidrolik veya rulmanlı) birlikte değerlendirilmelidir.",
  "Fan telleri ve filtreleri": "Fan telleri ve filtreleri fan kanadını korur, pano içine toz girişini azaltır; fan ölçüsüne göre seçilir.",
  "Röleler ve röle soketleri":
    "Röleler kumanda devrelerinde düşük güçlü bir sinyalle yükü anahtarlar. Seçimde bobin gerilimi (AC / DC), kontak sayısı ve akımı ile soket tipi birlikte değerlendirilmelidir.",
  "Solid state röleler (SSR)":
    "Solid state röleler (SSR) yükü mekanik kontak olmadan yarı iletkenle anahtarlar; ısıtıcı kontrolü gibi sık anahtarlama gereken uygulamalarda kullanılır. Kontrol gerilimi, yük gerilimi ve akımı ile soğutucu ihtiyacı birlikte değerlendirilmelidir.",
  "Sigortalar ve termostatlar":
    "Resetlenebilir termik sigortalar aşırı akımda devreyi açar, soğuduktan sonra butonla yeniden kurulur. Pano termostatları ve higrostatları pano içi ısıtıcı ve fanları sıcaklığa veya neme göre devreye alır.",
  "Potansiyometreler ve reostalar":
    "Potansiyometreler hız, sıcaklık veya gerilim ayarında kullanılır. Seçimde direnç değeri, güç, tur sayısı (tek, çok veya sonsuz turlu), mil tipi ve gövde ölçüsü birlikte değerlendirilmelidir.",
  Diyotlar: "Diyotlar ve köprü diyotlar AC gerilimi doğrultmak ve akım yönünü belirlemek için kullanılır; akım, ters gerilim ve gövde tipine (eksenel, tarak, kare, vidalı, modül) göre seçilir.",
  "Sviç, sensör ve butonlar":
    "Limit sviçler, endüktif sensörler, mod anahtarları ve butonlar CNC tezgâhlarında konum algılama, eksen referansı ve operatör kumandası için kullanılır.",
  "El çarkları (MPG)": "El çarkları (manuel pals üreteci, MPG) CNC tezgâhlarında eksenleri elle hassas hareket ettirmek için kullanılır; eksen sayısı, besleme gerilimi ve devir başına pals sayısına göre seçilir.",
  "Servo ve iş mili enkoderleri": "Servo motor ve iş mili enkoderleri motorun konum ve hız bilgisini sürücüye iletir; motor ve sürücü tipine uygun parça numarasıyla değiştirilmelidir.",
  "Takım bağlama ve ATC parçaları": "İş mili collet'leri (gripper), clamp / unclamp pistonları ve ATC parçaları takım bağlama ve otomatik takım değiştirme sisteminin güvenli çalışması için düzenli kontrol edilip yenilenir.",
  "Rulmanlar, kilit somunları ve yaylar": "Bilyalı vida destek rulmanları, hassas kilit somunları ve çanak yaylar iş mili ve eksen mekaniğinde ön yük ve hassasiyeti sağlar.",
  "Ölçme ve kalibrasyon": "Granit pleytler, test barları, ATC kalibrasyon mastarları ve çekme kuvveti test aparatları tezgâh hassasiyetini ve takım bağlama kuvvetini kontrol etmek için kullanılır.",
  "Veri aktarımı": "Kart okuyucular, CF / SD kartlar ve veri aktarım cihazları CNC tezgâhına program yüklemek ve yedek almak için kullanılır.",
  "Makine lambaları": "Makine aydınlatma lambaları ve üç katlı tepe lambaları tezgâh içini aydınlatır ve çalışma durumunu gösterir.",
  "Sarf malzemeleri": "Bakım ve onarımda kullanılan yapıştırıcı, gres, temizleme aparatı ve benzeri sarf malzemeleri.",
  "Güç kaynakları": "Anahtarlamalı güç kaynakları pano içindeki 24 V DC kumanda, sensör ve kontrol devrelerini besler.",
};

const SUPPORT =
  "AOM, parça numarasına göre tedarik ve muadil araştırmasında, pano ve tezgâh uygulamasında destek verir. Türkiye'nin her şehrinden teklif taleplerinizi iletebilirsiniz.";

const lc = (t: string) => (/^[A-ZÇĞİÖŞÜ][a-zçğıöşü]/.test(t) ? t[0].toLocaleLowerCase("tr-TR") + t.slice(1) : t);

function build(r: Raw): Product {
  const code = r.specs.find(([l]) => l === "Orijinal kod")?.[1];
  const full = r.brand ? `${r.brand} ${r.model}` : r.model;
  const facts = r.specs.filter(([l]) => !["Marka", "Orijinal kod", "Kod", "Diğer geçerli kodlar"].includes(l)).slice(0, 3);
  const factLine = facts.map(([l, v]) => `${l.toLocaleLowerCase("tr-TR")}: ${v}`).join("; ");
  const alts = r.specs.find(([l]) => l === "Diğer geçerli kodlar")?.[1];
  const logo = LOGOS[r.brand];
  // Ürün sayfasında başlığın (marka + kod) altındaki satır: ad başlığı tekrar ediyorsa yalnız tanım kısmı
  let lead = r.name;
  for (const pre of [full, r.model]) if (pre && lead.toLocaleLowerCase("tr-TR").startsWith(pre.toLocaleLowerCase("tr-TR"))) lead = lead.slice(pre.length).replace(/^[\s,;:–-]+/, "");
  if (!lead) lead = r.group && r.group !== "Diğer" ? `${r.category} · ${r.group}` : r.category;
  lead = lead[0].toLocaleUpperCase("tr-TR") + lead.slice(1);
  return {
    slug: r.slug,
    brand: r.brand,
    brandLogo: logo,
    model: r.model,
    name: lead,
    category: r.category,
    summary: [factLine ? `Özellikler: ${factLine}.` : "", alts ? `Diğer geçerli kodlar: ${alts}.` : "", !factLine && !alts ? "Parça numarası veya ürün etiketi bilgisiyle teklif isteyebilirsiniz." : ""].filter(Boolean).join(" "),
    image: r.img ? { src: `/magaza/${r.img.file}`, alt: r.name } : undefined,
    imageNote: r.img?.scope === "seri" ? "Fotoğraf, üreticinin bu seri için yayınladığı görseldir." : undefined,
    specs: r.specs.map(([label, value]) => ({ label, value })),
    source: r.source ? { label: "Üretici sayfası", url: r.source } : undefined,
    specNote: "Teknik bilgiler üretici katalog ve veri sayfalarından ve ürün kodundan derlenmiştir; sipariş öncesi kodu ürün etiketiyle birlikte teyit ederiz.",
    groupTitle: r.group,
    groupOrder: 1000 + r.gorder,
    seoTitle: full.length > 52 ? full.slice(0, 52).replace(/[ ,;(]+[^ ,;(]*$/, "") : full,
    metaDescription: `${r.name}.${factLine ? " " + factLine + "." : ""}`.slice(0, 260),
    seoText: [`${r.name}.${factLine ? ` Özellikler: ${factLine}.` : ""}`, CAT_TEXT[r.category] ?? "", SUPPORT].filter(Boolean),
    keywords: [
      ...(code ? [code, r.brand ? `${r.brand} ${code}` : code, `${code} fiyat`] : [r.model]),
      ...(alts ? alts.split(", ") : []),
      lc(r.category),
      ...(r.brand ? [r.brand] : []),
    ],
  };
}

export const yedekParcaProducts: Product[] = (raw as unknown as Raw[]).map(build);
export const YEDEK_CAT_TEXT = CAT_TEXT;
