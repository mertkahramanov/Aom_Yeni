import type { Metadata } from "next";
import Link from "next/link";
import { AI_MOTOR_KOD_SERIES, AI_MOTOR_KOD_TOTAL } from "@/data/autonics-kuyruk-ai-motor_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = AI_MOTOR_KOD_TOTAL.toLocaleString("tr-TR");

export const metadata: Metadata = {
  title: "Autonics Ai Serisi Kapalı Çevrim Adım Motoru Kodları | Ankara",
  description: `Autonics Ai serisi (AiS, AiC, AiCA, Ai-M) kapalı çevrim (closed-loop) adım motoru ve sürücüsü sipariş kodları: ${TOTAL} kod, ${AI_MOTOR_KOD_SERIES.length} seri. Her kod için teklif. ${REGION_LINE}`,
  keywords: [
    "Autonics Ai serisi",
    "Autonics AiS",
    "Autonics AiC",
    "Autonics AiCA",
    "kapalı çevrim adım motoru",
    "closed loop stepper motor",
    "Autonics adım motor sürücü",
  ],
  alternates: { canonical: "/magaza/kapali-cevrim-adim-motor-kodlari", languages: hreflangAlternates("/magaza/kapali-cevrim-adim-motor-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/kapali-cevrim-adim-motor-kodlari",
    siteName: "AOM",
    title: "Autonics Ai serisi kapalı çevrim adım motoru kodları",
    description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function AiMotorKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics Ai serisi kapalı çevrim adım motoru kodları",
      url: `${SITE}/magaza/kapali-cevrim-adim-motor-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: AI_MOTOR_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key} sipariş kodları`, url: `${SITE}/magaza/kapali-cevrim-adim-motor-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Kapalı çevrim adım motoru kodları", path: "/magaza/kapali-cevrim-adim-motor-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Kapalı çevrim adım motoru kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Adım motorları · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics Ai serisi kapalı çevrim adım motoru kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Mağazada ürün olarak yer almayan Autonics Ai serisi (AiS, AiC, AiCA, Ai-M) dahili enkoderli kapalı çevrim (closed-loop) adım motoru ve
          sürücülerinin {TOTAL} sipariş kodu aşağıdaki seri sayfalarında listelenir. Listedeki her kod için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>
          {AI_MOTOR_KOD_SERIES[0]?.cat} <span className="store-count">{TOTAL} kod</span>
        </h2>
        <ul className="enc-series-list">
          {AI_MOTOR_KOD_SERIES.map((s) => (
            <li key={s.slug}>
              <Link href={`/magaza/kapali-cevrim-adim-motor-kodlari/${s.slug}`} className="dpu-group">
                <strong>{s.key}</strong>
                <span>{s.title}</span>
                <span className="store-count" style={{ marginLeft: 0 }}>{s.codes.length.toLocaleString("tr-TR")} kod</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
