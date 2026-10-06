import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products, storeCategories } from "@/data/magaza";
import { ENC_TOTAL } from "@/data/enkoder";
import { KONTROL_KOD_TOTAL } from "@/data/kontrol";
import { breadcrumbJsonLd, REGION_LINE, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mağaza: Autonics Sıcaklık Kontrol, Enkoder, SSR, Tristör | Ankara",
  description:
    "Autonics sıcaklık kontrol cihazları, sayıcı, zamanlayıcı, panel metre, HMI, enkoderler, solid state röle (SSR), DPU ve SPR tristörlü güç kontrol üniteleri. Fiyatlar KDV hariç. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
  keywords: ["Autonics bayi Ankara", "sıcaklık kontrol cihazı", "zamanlayıcı", "sayıcı", "HMI", "enkoder", "encoder", "artımlı enkoder", "mutlak enkoder", "solid state röle", "SSR", "katı hal rölesi", "tristörlü güç kontrol ünitesi", "SCR güç kontrolörü", "otomasyon malzemeleri Ankara", "Autonics fiyat listesi"],
  alternates: { canonical: "/magaza" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza",
    siteName: "AOM",
    title: "AOM Mağaza: Autonics Enkoder, SSR ve Tristörlü Güç Kontrol",
    description: "Ankara merkezli AOM'dan Türkiye geneline Autonics enkoderler, SSR ve tristörlü güç kontrol üniteleri.",
  },
};

export default function MagazaPage() {
  const cats = storeCategories();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "AOM Mağaza",
      url: `${SITE}/magaza`,
      inLanguage: "tr-TR",
      about: cats.map((c) => c.title),
      isPartOf: { "@id": `${SITE}/#org` },
      numberOfItems: products.length,
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 820 }}>
        <div className="rule" />
        <div className="eyebrow">Mağaza</div>
        <h1 style={{ fontWeight: 800, fontSize: 44, lineHeight: 1.05 }}>AOM Mağaza</h1>
        <p className="lead">
          Autonics tristörlü güç kontrol üniteleri, solid state röleler (SSR), enkoderler ve kontrol cihazları; NCR röleler ve röle soketleri, CNC yedek parçaları ve endüstriyel elektronik ürünler. Kategoriyi seçerek ürünlere ulaşın. Fiyatlar KDV hariçtir. {REGION_LINE}
        </p>
      </div>
      <nav aria-label="Ürün kategorileri">
        <ul className="cat-tiles">
          {cats.map((c) => {
            const items = c.groups.flatMap((g) => g.items);
            const img = items.find((p) => p.image)?.image;
            return (
              <li key={c.id}>
                <Link href={`/magaza/kategori/${c.id}`} className="cat-tile">
                  <span className="cat-tile-visual">
                    {img ? (
                      <Image src={img.src} alt="" fill sizes="(max-width: 640px) 50vw, 280px" style={{ objectFit: "contain" }} />
                    ) : (
                      <span className="cat-tile-count" aria-hidden="true">{items.length}</span>
                    )}
                  </span>
                  <span className="cat-tile-body">
                    <strong>{c.title}</strong>
                    <span>
                      {items.length.toLocaleString("tr-TR")} ürün · {c.groups.length} grup
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>Sipariş kodu listeleri</h2>
        <ul className="cat-code-links">
          <li>
            <Link href="/magaza/dpu-kodlari">Autonics DPU model kodları</Link> <span className="store-count">840 kod</span>
          </li>
          <li>
            <Link href="/magaza/enkoder-kodlari">Autonics enkoder model kodları</Link> <span className="store-count">{ENC_TOTAL.toLocaleString("tr-TR")} kod</span>
          </li>
          <li>
            <Link href="/magaza/kontrol-kodlari">Autonics kontrol cihazı model kodları</Link> <span className="store-count">{KONTROL_KOD_TOTAL.toLocaleString("tr-TR")} kod</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
