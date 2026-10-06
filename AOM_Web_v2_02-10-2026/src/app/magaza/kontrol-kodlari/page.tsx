import type { Metadata } from "next";
import Link from "next/link";
import { KONTROL_KOD_SERIES, KONTROL_KOD_TOTAL } from "@/data/kontrol";
import { breadcrumbJsonLd, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = KONTROL_KOD_TOTAL.toLocaleString("tr-TR");
const GROUPS = [...new Set(KONTROL_KOD_SERIES.map((s) => s.cat))].sort((a, b) => b.localeCompare(a, "tr"));

export const metadata: Metadata = {
  title: "Autonics Sıcaklık Kontrol ve Panel Metre Kodları | Ankara",
  description: `Autonics sıcaklık kontrol cihazı ve dijital panel metre sipariş kodları: ${TOTAL} kod, ${KONTROL_KOD_SERIES.length} seri (TN, TX, TC, TCN, TA, T3/T4, KPN, MT4W, MT4N, M4 serisi ve diğerleri). Her kod için teklif. ${REGION_LINE}`,
  keywords: ["Autonics sıcaklık kontrol kodu", "Autonics TX", "Autonics TC4S", "Autonics TCN4S", "Autonics TA", "Autonics MT4W", "Autonics M4W", "panel metre kodu", "sıcaklık kontrol cihazı fiyat"],
  alternates: { canonical: "/magaza/kontrol-kodlari" },
  openGraph: { type: "website", locale: "tr_TR", url: "/magaza/kontrol-kodlari", siteName: "AOM", title: "Autonics kontrol cihazı model kodları", description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}` },
};

export default function KontrolKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics kontrol cihazı model kodları",
      url: `${SITE}/magaza/kontrol-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: KONTROL_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key} sipariş kodları`, url: `${SITE}/magaza/kontrol-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Kontrol cihazı model kodları", path: "/magaza/kontrol-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span> <span>Kontrol cihazı model kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Kontrol cihazları · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics sıcaklık kontrol ve panel metre kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Mağazada ürün olarak yer almayan Autonics sıcaklık kontrol cihazı ve dijital panel metre serilerinin {TOTAL} sipariş kodu aşağıdaki seri sayfalarında
          listelenir. Listedeki her kod için teklif verir ve tedarik ederiz. Ürün olarak satılan TK, TM, TMH serileri ve TCN4S-24R için{" "}
          <Link href="/magaza/kategori/sicaklik-kontrol-cihazlari">sıcaklık kontrol cihazları</Link>, MX4W için{" "}
          <Link href="/magaza/kategori/dijital-panel-metreler">dijital panel metreler</Link> kategorisine bakın.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = KONTROL_KOD_SERIES.filter((s) => s.cat === g);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {g} <span className="store-count">{ss.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/magaza/kontrol-kodlari/${s.slug}`} className="dpu-group">
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
