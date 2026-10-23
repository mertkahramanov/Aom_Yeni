import type { Metadata } from "next";
import Link from "next/link";
import { FOTOELEKTRIK_SENSOR_KOD_SERIES, FOTOELEKTRIK_SENSOR_KOD_TOTAL } from "@/data/autonics-fotoelektrik-sensor_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = FOTOELEKTRIK_SENSOR_KOD_TOTAL.toLocaleString("tr-TR");
const GROUPS = [...new Set(FOTOELEKTRIK_SENSOR_KOD_SERIES.map((s) => s.cat))];

export const metadata: Metadata = {
  title: "Autonics Fotoelektrik Sensör Kodları | Ankara",
  description: `Autonics kompakt (küp tip), fotomikro, alan (area) ve silindirik fotoelektrik sensör sipariş kodları: ${TOTAL} kod, ${FOTOELEKTRIK_SENSOR_KOD_SERIES.length} seri (BJ, BJR, BS, BW, BRQP, BRQM, BRQT, BRQPS). Her kod için teklif. ${REGION_LINE}`,
  keywords: [
    "Autonics fotoelektrik sensör",
    "Autonics photoelectric sensor",
    "Autonics BJ serisi",
    "Autonics BW alan sensörü",
    "Autonics BRQ serisi",
    "fotoelektrik sensör fiyat",
  ],
  alternates: { canonical: "/magaza/fotoelektrik-sensor-kodlari", languages: hreflangAlternates("/magaza/fotoelektrik-sensor-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/fotoelektrik-sensor-kodlari",
    siteName: "AOM",
    title: "Autonics fotoelektrik sensör kodları",
    description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function FotoelektrikSensorKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics fotoelektrik sensör kodları",
      url: `${SITE}/magaza/fotoelektrik-sensor-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: FOTOELEKTRIK_SENSOR_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key} sipariş kodları`, url: `${SITE}/magaza/fotoelektrik-sensor-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Fotoelektrik sensör kodları", path: "/magaza/fotoelektrik-sensor-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Fotoelektrik sensör kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Sensörler · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics fotoelektrik sensör kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Mağazada ürün olarak yer almayan Autonics kompakt (küp tip, BJ/BJR), fotomikro (BS), alan/area (BW) ve silindirik (BRQP/BRQM/BRQT/BRQPS)
          fotoelektrik sensör ailelerinin {TOTAL} sipariş kodu aşağıdaki seri sayfalarında listelenir. Listedeki her kod için teklif verir ve tedarik
          ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = FOTOELEKTRIK_SENSOR_KOD_SERIES.filter((s) => s.cat === g);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {g} <span className="store-count">{ss.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/magaza/fotoelektrik-sensor-kodlari/${s.slug}`} className="dpu-group">
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
