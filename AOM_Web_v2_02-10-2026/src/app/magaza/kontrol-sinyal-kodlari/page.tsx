import type { Metadata } from "next";
import Link from "next/link";
import { KONTROL_SINYAL_KOD_SERIES, KONTROL_SINYAL_KOD_TOTAL } from "@/data/autonics-kontrol-sinyal_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = KONTROL_SINYAL_KOD_TOTAL.toLocaleString("tr-TR");
const GROUPS = [...new Set(KONTROL_SINYAL_KOD_SERIES.map((s) => s.cat))];

export const metadata: Metadata = {
  title: "Autonics Buton, Seçici Anahtar ve Sinyal Lambası Kodları | Ankara",
  description: `Autonics buton, seçici anahtar, anahtarlı seçici, acil durdurma, mantar başlı buton, sinyal (pilot) lambası, LED gösterge ve kontak bloğu sipariş kodları: ${TOTAL} kod, ${KONTROL_SINYAL_KOD_SERIES.length} seri (S2PR, S2SR, S3SF, S16PR, S2KR, L2RR, SA ve diğerleri). Her kod için teklif. ${REGION_LINE}`,
  keywords: [
    "Autonics buton",
    "Autonics seçici anahtar",
    "Autonics acil durdurma butonu",
    "Autonics sinyal lambası",
    "Autonics pilot lamba",
    "Autonics kontak bloğu",
    "Autonics S2PR",
    "Autonics S2SR",
    "Autonics S3SF",
    "buton fiyat",
  ],
  alternates: { canonical: "/magaza/kontrol-sinyal-kodlari", languages: hreflangAlternates("/magaza/kontrol-sinyal-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/kontrol-sinyal-kodlari",
    siteName: "AOM",
    title: "Autonics buton, seçici anahtar ve sinyal lambası kodları",
    description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function KontrolSinyalKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics buton, seçici anahtar ve sinyal lambası kodları",
      url: `${SITE}/magaza/kontrol-sinyal-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: KONTROL_SINYAL_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key} sipariş kodları`, url: `${SITE}/magaza/kontrol-sinyal-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Kontrol ve sinyal cihazı kodları", path: "/magaza/kontrol-sinyal-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Kontrol ve sinyal cihazı kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Kontrol ve sinyal cihazları · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics buton, seçici anahtar ve sinyal lambası kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Mağazada ürün olarak yer almayan Autonics buton, seçici anahtar, anahtarlı (kilitli) seçici, acil durdurma şalteri, mantar başlı buton, sinyal
          (pilot) lambası, düz tip LED gösterge lambası ve kontak bloğu ailelerinin {TOTAL} sipariş kodu aşağıdaki seri sayfalarında listelenir. Listedeki
          her kod için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = KONTROL_SINYAL_KOD_SERIES.filter((s) => s.cat === g);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {g} <span className="store-count">{ss.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/magaza/kontrol-sinyal-kodlari/${s.slug}`} className="dpu-group">
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
