import type { Metadata } from "next";
import Link from "next/link";
import { SINYAL_LAMBASI_KOD_SERIES, SINYAL_LAMBASI_KOD_TOTAL } from "@/data/autonics-kuyruk-sinyal-lambasi_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = SINYAL_LAMBASI_KOD_TOTAL.toLocaleString("tr-TR");
const GROUPS = [...new Set(SINYAL_LAMBASI_KOD_SERIES.map((s) => s.cat))];

export const metadata: Metadata = {
  title: "Autonics Sinyal Lambası, Kule Işığı ve İkaz Lambası Kodları | Ankara",
  description: `Autonics ampul/LED tip sinyal (kule) lambası, döner ikaz (beacon) lambası ve küçük tip LED gösterge lambası sipariş kodları: ${TOTAL} kod, ${SINYAL_LAMBASI_KOD_SERIES.length} seri (MT4B, MT5C, PL4G, PLD, PME, ASG, AVG, MLG ve diğerleri). Her kod için teklif. ${REGION_LINE}`,
  keywords: [
    "Autonics sinyal lambası",
    "Autonics kule ışığı",
    "Autonics tower light",
    "Autonics döner ikaz lambası",
    "Autonics beacon",
    "Autonics MT4B",
    "Autonics PME",
    "Autonics ASG",
    "sinyal lambası fiyat",
  ],
  alternates: { canonical: "/magaza/sinyal-lambasi-kodlari", languages: hreflangAlternates("/magaza/sinyal-lambasi-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/sinyal-lambasi-kodlari",
    siteName: "AOM",
    title: "Autonics sinyal lambası, kule ışığı ve ikaz lambası kodları",
    description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function SinyalLambasiKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics sinyal lambası, kule ışığı ve ikaz lambası kodları",
      url: `${SITE}/magaza/sinyal-lambasi-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: SINYAL_LAMBASI_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key} sipariş kodları`, url: `${SITE}/magaza/sinyal-lambasi-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Sinyal lambası kodları", path: "/magaza/sinyal-lambasi-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Sinyal lambası kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Sinyal lambaları · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics sinyal lambası, kule ışığı ve ikaz lambası kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Mağazada ürün olarak yer almayan Autonics ampul/LED tip sinyal (kule) lambası, döner ikaz (beacon) lambası ve küçük tip LED gösterge lambası
          ailelerinin {TOTAL} sipariş kodu aşağıdaki seri sayfalarında listelenir. Listedeki her kod için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = SINYAL_LAMBASI_KOD_SERIES.filter((s) => s.cat === g);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {g} <span className="store-count">{ss.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/magaza/sinyal-lambasi-kodlari/${s.slug}`} className="dpu-group">
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
