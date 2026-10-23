import type { Metadata } from "next";
import Link from "next/link";
import { YAKINLIK_SENSOR_KOD_SERIES, YAKINLIK_SENSOR_KOD_TOTAL } from "@/data/autonics-yakinlik-sensor_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = YAKINLIK_SENSOR_KOD_TOTAL.toLocaleString("tr-TR");
const GROUPS = [...new Set(YAKINLIK_SENSOR_KOD_SERIES.map((s) => s.cat))];

export const metadata: Metadata = {
  title: "Autonics Endüktif Yakınlık Sensörü Kodları | Ankara",
  description: `Autonics PR ailesi endüktif (indüktif) yakınlık sensörü sipariş kodları: ${TOTAL} kod, ${YAKINLIK_SENSOR_KOD_SERIES.length} seri (PR, PRW, PRD, PRCM, PRL ve diğer gövde/bağlantı varyantları). Her kod için teklif. ${REGION_LINE}`,
  keywords: [
    "Autonics yakınlık sensörü",
    "Autonics proximity sensor",
    "Autonics PR serisi",
    "Autonics PRW",
    "Autonics PRCM",
    "endüktif yakınlık sensörü fiyat",
  ],
  alternates: { canonical: "/magaza/yakinlik-sensoru-kodlari", languages: hreflangAlternates("/magaza/yakinlik-sensoru-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/yakinlik-sensoru-kodlari",
    siteName: "AOM",
    title: "Autonics endüktif yakınlık sensörü kodları",
    description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function YakinlikSensoruKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics endüktif yakınlık sensörü kodları",
      url: `${SITE}/magaza/yakinlik-sensoru-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: YAKINLIK_SENSOR_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key} sipariş kodları`, url: `${SITE}/magaza/yakinlik-sensoru-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Endüktif yakınlık sensörü kodları", path: "/magaza/yakinlik-sensoru-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Endüktif yakınlık sensörü kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Sensörler · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics endüktif yakınlık sensörü kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Mağazada ürün olarak yer almayan Autonics PR ailesi endüktif (indüktif) yakınlık sensörlerinin {TOTAL} sipariş kodu, {YAKINLIK_SENSOR_KOD_SERIES.length}{" "}
          gövde/bağlantı varyantı (seri) halinde aşağıda listelenir. Bu sensörler metal cisimleri temassız algılar. Listedeki her kod için teklif verir ve
          tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = YAKINLIK_SENSOR_KOD_SERIES.filter((s) => s.cat === g);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {g} <span className="store-count">{ss.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/magaza/yakinlik-sensoru-kodlari/${s.slug}`} className="dpu-group">
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
