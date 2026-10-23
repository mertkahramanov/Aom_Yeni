import type { Metadata } from "next";
import Link from "next/link";
import { SINYAL_DONUSTURUCU_KOD_SERIES, SINYAL_DONUSTURUCU_KOD_TOTAL } from "@/data/autonics-sinyal-donusturucu_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = SINYAL_DONUSTURUCU_KOD_TOTAL.toLocaleString("tr-TR");
const GROUPS = [...new Set(SINYAL_DONUSTURUCU_KOD_SERIES.map((s) => s.cat))];

export const metadata: Metadata = {
  title: "Autonics Sinyal Dönüştürücü (CN Serisi) Kodları | Ankara",
  description: `Autonics CN serisi sinyal dönüştürücü/transmitter sipariş kodları: ${TOTAL} kod (CN-502H HART sinyal transmitteri, CN-6100/6101/6400/6401 analog sinyal izolatörü). Her kod için teklif. ${REGION_LINE}`,
  keywords: ["Autonics CN-502H", "Autonics sinyal dönüştürücü", "Autonics sinyal transmitteri", "Autonics CN-6100", "Autonics CN-6400", "HART sinyal transmitteri"],
  alternates: { canonical: "/magaza/sinyal-donusturucu-kodlari", languages: hreflangAlternates("/magaza/sinyal-donusturucu-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/sinyal-donusturucu-kodlari",
    siteName: "AOM",
    title: "Autonics sinyal dönüştürücü (CN serisi) kodları",
    description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function SinyalDonusturucuKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics sinyal dönüştürücü (CN serisi) kodları",
      url: `${SITE}/magaza/sinyal-donusturucu-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: SINYAL_DONUSTURUCU_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key} sipariş kodları`, url: `${SITE}/magaza/sinyal-donusturucu-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Sinyal dönüştürücü kodları", path: "/magaza/sinyal-donusturucu-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Sinyal dönüştürücü kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Sinyal dönüştürücüler · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics sinyal dönüştürücü (CN serisi) kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Mağazada ürün olarak yer almayan Autonics CN serisi sinyal dönüştürücü/transmitter ailesinin {TOTAL} sipariş kodu aşağıdaki seri sayfalarında
          listelenir. Listedeki her kod için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = SINYAL_DONUSTURUCU_KOD_SERIES.filter((s) => s.cat === g);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {g} <span className="store-count">{ss.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/magaza/sinyal-donusturucu-kodlari/${s.slug}`} className="dpu-group">
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
