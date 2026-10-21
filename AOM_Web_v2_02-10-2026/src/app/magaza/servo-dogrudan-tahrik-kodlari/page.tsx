import type { Metadata } from "next";
import Link from "next/link";
import { SV_DD_SERIES, SV_DD_TOTAL } from "@/data/yaskawa-servo-dogrudan-tahrik";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = SV_DD_TOTAL.toLocaleString("tr-TR");

export const metadata: Metadata = {
  title: `Yaskawa Doğrudan Tahrik Servo Motor Model Kodları: ${TOTAL} Kayıt | Ankara`,
  description: `Yaskawa doğrudan tahrik (direct drive) servo motor model kodları: ${TOTAL} kayıt, 3 seri (SGM7D, SGM7E, SGM7F). Anma torku, dış çap, enkoder tipi ve gerilim bilgisiyle. Her kod için teklif. ${REGION_LINE}`,
  keywords: ["Yaskawa SGM7D", "Yaskawa SGM7E", "Yaskawa SGM7F", "Yaskawa doğrudan tahrik", "Yaskawa direct drive motor", "Yaskawa servo motor model kodu", "doğrudan tahrik servo motor fiyat"],
  alternates: { canonical: "/magaza/servo-dogrudan-tahrik-kodlari", languages: hreflangAlternates("/magaza/servo-dogrudan-tahrik-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/servo-dogrudan-tahrik-kodlari",
    siteName: "AOM",
    title: "Yaskawa doğrudan tahrik servo motor model kodları",
    description: `${TOTAL} model kaydı için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function ServoDogrudanTahrikKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Yaskawa doğrudan tahrik servo motor model kodları",
      url: `${SITE}/magaza/servo-dogrudan-tahrik-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: SV_DD_SERIES.map((s) => ({ "@type": "WebPage", name: `Yaskawa ${s.key} model kodları`, url: `${SITE}/magaza/servo-dogrudan-tahrik-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Servo motor model kodları", path: "/magaza/servo-dogrudan-tahrik-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Servo motor model kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Servo Motorlar · Yaskawa Doğrudan Tahrik · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Yaskawa doğrudan tahrik servo motor model kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Yaskawa&apos;nın doğrudan tahrik (direct drive) servo motor ailesine ait 3 serinin (SGM7D, SGM7E, SGM7F) toplam {TOTAL} model kaydı
          aşağıdaki seri sayfalarında listelenir. Her kodun yanında anma torku, dış çap, enkoder tipi ve gerilim bilgisi yer alır; listedeki her
          kod için teklif verir ve tedarik ederiz. Doğrudan tahrik motorlar, redüktör, kayış veya dişli gibi aktarma elemanı kullanmadan yükü
          doğrudan döndürür; boşluğu ortadan kaldırır ve konumlama hassasiyetini artırır.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>
          Doğrudan Tahrik Motorları <span className="store-count">{TOTAL} kayıt</span>
        </h2>
        <ul className="enc-series-list">
          {SV_DD_SERIES.map((s) => (
            <li key={s.slug}>
              <Link href={`/magaza/servo-dogrudan-tahrik-kodlari/${s.slug}`} className="dpu-group">
                <strong>{s.key}</strong>
                <span>{s.title}</span>
                <span className="store-count" style={{ marginLeft: 0 }}>{s.codes.length.toLocaleString("tr-TR")} kayıt</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 920 }}>
        <p className="caption" style={{ margin: 0 }}>
          Veriler Yaskawa Türkiye&apos;nin resmi ürün sayfalarından (yaskawa.com.tr) derlenmiştir (20-10-2026). Üretici sitesi SGM7E serisinde bir
          kaydın model adını boş göstermektedir; bu durum ilgili seri sayfasında belirtilmiştir. Sipariş kodu üreticinin sitesinde
          yayınlanmadığından fiyat için teklif isteyin.
        </p>
      </div>
    </section>
  );
}
