import type { Metadata } from "next";
import Link from "next/link";
import { BASINC_SENSOR_KOD_SERIES, BASINC_SENSOR_KOD_TOTAL } from "@/data/autonics-basinc-sensor_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = BASINC_SENSOR_KOD_TOTAL.toLocaleString("tr-TR");
const GROUPS = [...new Set(BASINC_SENSOR_KOD_SERIES.map((s) => s.cat))];

export const metadata: Metadata = {
  title: "Autonics Basınç Sensörü ve Transmiteri Kodları | Ankara",
  description: `Autonics basınç transmiteri (TPS20, TPS30, PTF30, KT-302H) ve dijital basınç şalteri (PSAN, PSQ) sipariş kodları: ${TOTAL} kod, ${BASINC_SENSOR_KOD_SERIES.length} seri. Her kod için teklif. ${REGION_LINE}`,
  keywords: [
    "Autonics basınç sensörü",
    "Autonics basınç transmiteri",
    "Autonics basınç şalteri",
    "Autonics TPS30",
    "Autonics TPS20",
    "Autonics PSAN",
    "Autonics PSQ",
    "Autonics KT-302H",
    "Autonics PTF30",
    "basınç sensörü fiyat",
  ],
  alternates: { canonical: "/magaza/basinc-sensoru-kodlari", languages: hreflangAlternates("/magaza/basinc-sensoru-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/basinc-sensoru-kodlari",
    siteName: "AOM",
    title: "Autonics basınç sensörü ve transmiteri kodları",
    description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function BasincSensoruKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics basınç sensörü ve transmiteri kodları",
      url: `${SITE}/magaza/basinc-sensoru-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: BASINC_SENSOR_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key} sipariş kodları`, url: `${SITE}/magaza/basinc-sensoru-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Basınç sensörü ve transmiteri kodları", path: "/magaza/basinc-sensoru-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Basınç sensörü ve transmiteri kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Basınç sensörleri · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics basınç sensörü ve transmiteri kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Mağazada ürün olarak yer almayan Autonics basınç transmiteri (göstergesiz TPS20, paslanmaz çelik gövdeli TPS30, göstergeli PTF30, HART protokollü
          KT-302H) ve dijital basınç şalteri (PSAN, PSQ) ailelerinin {TOTAL} sipariş kodu aşağıdaki seri sayfalarında listelenir. Listedeki her kod için
          teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = BASINC_SENSOR_KOD_SERIES.filter((s) => s.cat === g);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {g} <span className="store-count">{ss.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/magaza/basinc-sensoru-kodlari/${s.slug}`} className="dpu-group">
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
