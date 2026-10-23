import type { Metadata } from "next";
import Link from "next/link";
import { KABLO_AKSESUAR_KOD_SERIES, KABLO_AKSESUAR_KOD_TOTAL } from "@/data/autonics-kablo-aksesuar_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = KABLO_AKSESUAR_KOD_TOTAL.toLocaleString("tr-TR");
const GROUPS = [...new Set(KABLO_AKSESUAR_KOD_SERIES.map((s) => s.cat))];

export const metadata: Metadata = {
  title: "Autonics Bağlantı Kablosu ve Konnektör Kodları | Ankara",
  description: `Autonics PLC/servo bağlantı kabloları (CH serisi), sensör bağlantı kabloları (CID serisi ve benzerleri), sensör konnektörleri (CNE serisi), vision/Ethernet kabloları ve GP/LP HMI bağlantı kabloları sipariş kodları: ${TOTAL} kod, ${KABLO_AKSESUAR_KOD_SERIES.length} seri. Her kod için teklif. ${REGION_LINE}`,
  keywords: [
    "Autonics bağlantı kablosu",
    "Autonics CH serisi kablo",
    "Autonics CID kablo",
    "Autonics CNE konnektör",
    "Autonics sensör kablosu",
    "Autonics vision kablosu",
    "Autonics GP LP kablosu",
    "Autonics konnektör fiyat",
  ],
  alternates: { canonical: "/magaza/kablo-aksesuar-kodlari", languages: hreflangAlternates("/magaza/kablo-aksesuar-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/kablo-aksesuar-kodlari",
    siteName: "AOM",
    title: "Autonics bağlantı kablosu ve konnektör kodları",
    description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function KabloAksesuarKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics bağlantı kablosu ve konnektör kodları",
      url: `${SITE}/magaza/kablo-aksesuar-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: KABLO_AKSESUAR_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key} sipariş kodları`, url: `${SITE}/magaza/kablo-aksesuar-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Bağlantı kablosu ve konnektör kodları", path: "/magaza/kablo-aksesuar-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Bağlantı kablosu ve konnektör kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Kablo, konnektör ve bağlantı aksesuarları · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics bağlantı kablosu ve konnektör kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Mağazada ürün olarak yer almayan Autonics PLC/servo bağlantı kabloları (CH serisi), sensör ve enkoder bağlantı kabloları (CID serisi ve benzer
          aileler), sensör konnektörleri (CNE serisi), görüntü (vision) sensörü/kamera için Ethernet kabloları ve GP/LP dokunmatik panel (HMI) haberleşme
          kablolarının {TOTAL} sipariş kodu aşağıdaki seri sayfalarında listelenir. Listedeki her kod için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = KABLO_AKSESUAR_KOD_SERIES.filter((s) => s.cat === g);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {g} <span className="store-count">{ss.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/magaza/kablo-aksesuar-kodlari/${s.slug}`} className="dpu-group">
                    <strong>{s.key}</strong>
                    <span>{s.title}</span>
                    <span className="store-count" style={{ marginLeft: 0 }}>{s.codes.length.toLocaleString("tr-TR")} kod</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
