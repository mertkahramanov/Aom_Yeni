import type { Metadata } from "next";
import Link from "next/link";
import { SV_LINEER_SGX_SERIES, SV_LINEER_SGX_TOTAL } from "@/data/yaskawa-servo-lineer-sigmax-surucu";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = SV_LINEER_SGX_TOTAL.toLocaleString("tr-TR");

export const metadata: Metadata = {
  title: "Yaskawa Lineer Servo Motor ve Sigma-X Sürücü Model Kodları | Ankara",
  description: `Yaskawa lineer servo motor (SGLFW2, SGLG) ve Sigma-X servo sürücü (SGDXS, SGDXW, SGDXT) ile MP3000iec Serisi makina kontrolörünün ${TOTAL} model kodu. Her kod için teklif. ${REGION_LINE}`,
  keywords: ["Yaskawa SGLFW2", "Yaskawa SGLG", "Yaskawa SGDXS", "Yaskawa SGDXW", "Yaskawa SGDXT", "Yaskawa MP3000iec", "Yaskawa lineer servo motor", "Yaskawa Sigma-X servo sürücü", "Yaskawa servo fiyat"],
  alternates: { canonical: "/magaza/servo-lineer-sigmax-kodlari", languages: hreflangAlternates("/magaza/servo-lineer-sigmax-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/servo-lineer-sigmax-kodlari",
    siteName: "AOM",
    title: "Yaskawa lineer servo motor ve Sigma-X sürücü model kodları",
    description: `${TOTAL} model kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function ServoLineerSigmaxKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Yaskawa lineer servo motor ve Sigma-X sürücü model kodları",
      url: `${SITE}/magaza/servo-lineer-sigmax-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: SV_LINEER_SGX_SERIES.map((g) => ({ "@type": "WebPage", name: `Yaskawa ${g.key} model kodları`, url: `${SITE}/magaza/servo-lineer-sigmax-kodlari/${g.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Servo lineer / Sigma-X model kodları", path: "/magaza/servo-lineer-sigmax-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Servo lineer / Sigma-X model kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Yaskawa Servo Sistemler · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Yaskawa lineer servo motor ve Sigma-X sürücü model kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Yaskawa'nın SGLFW2 ve SGLG lineer servo motorları, SGDXS / SGDXW / SGDXT Sigma-X servo sürücüleri ve MP3000iec Serisi makina kontrolörüne ait
          toplam {TOTAL} model kodu aşağıdaki seri sayfalarında listelenir. Sipariş kodu Yaskawa'nın sitesinde yayınlanmadığı için model kodu, teknik değer
          ve iletişim seçeneğiyle birlikte her model için teklif isteyebilirsiniz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ul className="enc-series-list">
          {SV_LINEER_SGX_SERIES.map((g) => (
            <li key={g.slug}>
              <Link href={`/magaza/servo-lineer-sigmax-kodlari/${g.slug}`} className="dpu-group">
                <strong>{g.key}</strong>
                <span>{g.title}</span>
                <span className="store-count" style={{ marginLeft: 0 }}>{g.codes.length.toLocaleString("tr-TR")} model</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="caption" style={{ margin: 0, maxWidth: 860 }}>
        SGDXS serisinde 58 model olduğu için ayrıca filtrelenebilir bir kod tablosu bulunur; diğer seriler model sayısı az olduğu için tüm listeyi doğrudan
        kendi ürün sayfalarında da görebilirsiniz. Kodlar ve teknik değerler Yaskawa Türkiye sitesinden (yaskawa.com.tr) alınmıştır (20-10-2026).
      </p>
    </section>
  );
}
