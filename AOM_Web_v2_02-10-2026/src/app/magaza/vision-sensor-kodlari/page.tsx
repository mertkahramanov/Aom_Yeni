import type { Metadata } from "next";
import Link from "next/link";
import { VISION_SENSOR_KOD_SERIES, VISION_SENSOR_KOD_TOTAL } from "@/data/autonics-vision-sensor_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = VISION_SENSOR_KOD_TOTAL.toLocaleString("tr-TR");
const GROUPS = [...new Set(VISION_SENSOR_KOD_SERIES.map((s) => s.cat))];

export const metadata: Metadata = {
  title: "Autonics Vision Sensör Kodları | Ankara",
  description: `Autonics VG serisi renkli/monokrom vision (görüntü işleme) sensörü sipariş kodları: ${TOTAL} kod. Her kod için teklif. ${REGION_LINE}`,
  keywords: ["Autonics vision sensör", "Autonics VG serisi", "Autonics görüntü işleme sensörü", "vision sensör fiyat"],
  alternates: { canonical: "/magaza/vision-sensor-kodlari", languages: hreflangAlternates("/magaza/vision-sensor-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/vision-sensor-kodlari",
    siteName: "AOM",
    title: "Autonics vision sensör kodları",
    description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function VisionSensorKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics vision sensör kodları",
      url: `${SITE}/magaza/vision-sensor-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: VISION_SENSOR_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key} sipariş kodları`, url: `${SITE}/magaza/vision-sensor-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Vision sensör kodları", path: "/magaza/vision-sensor-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Vision sensör kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Sensörler · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics vision sensör kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Mağazada ürün olarak yer almayan Autonics VG serisi renkli/monokrom vision (görüntü işleme) sensörünün {TOTAL} sipariş kodu aşağıdaki seri
          sayfasında listelenir. Listedeki her kod için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = VISION_SENSOR_KOD_SERIES.filter((s) => s.cat === g);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {g} <span className="store-count">{ss.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/magaza/vision-sensor-kodlari/${s.slug}`} className="dpu-group">
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
