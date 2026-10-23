import type { Metadata } from "next";
import Link from "next/link";
import { STEP_MOTOR_KOD_SERIES, STEP_MOTOR_KOD_TOTAL } from "@/data/autonics-step-motor_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = STEP_MOTOR_KOD_TOTAL.toLocaleString("tr-TR");
const GROUPS = [...new Set(STEP_MOTOR_KOD_SERIES.map((s) => s.cat))];

export const metadata: Metadata = {
  title: "Autonics Step Motor ve Redüktörlü Step Motor Kodları | Ankara",
  description: `Autonics step motor (5 fazlı ve 2 fazlı), redüktörlü (dişli kutulu) ve aktüatörlü step motor sipariş kodları: ${TOTAL} kod, ${STEP_MOTOR_KOD_SERIES.length} seri (AK, AK-B, AHK, AK-G, AK-R ve 2 fazlı AK ailesi). Her kod için teklif. ${REGION_LINE}`,
  keywords: [
    "Autonics step motor",
    "Autonics redüktörlü step motor",
    "Autonics AK serisi",
    "Autonics AHK",
    "Autonics AK-G",
    "Autonics AK-R",
    "Autonics 5 fazlı step motor",
    "Autonics 2 fazlı step motor",
    "step motor fiyat",
  ],
  alternates: { canonical: "/magaza/step-motor-kodlari", languages: hreflangAlternates("/magaza/step-motor-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/step-motor-kodlari",
    siteName: "AOM",
    title: "Autonics step motor ve redüktörlü step motor kodları",
    description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function StepMotorKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics step motor ve redüktörlü step motor kodları",
      url: `${SITE}/magaza/step-motor-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: STEP_MOTOR_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key} sipariş kodları`, url: `${SITE}/magaza/step-motor-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Step motor kodları", path: "/magaza/step-motor-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Step motor kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Step motorlar · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics step motor ve redüktörlü step motor kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Mağazada ürün olarak yer almayan Autonics step motor ailelerinin {TOTAL} sipariş kodu aşağıdaki seri sayfalarında listelenir: 5 fazlı standart
          (AK), entegre frenli (AK-B), oyuk/hollow milli (AHK), entegre dişli kutulu/redüktörlü (AK-G), entegre döner aktüatörlü (AK-R) ve 2 fazlı step
          motor aileleri. Listedeki her kod için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = STEP_MOTOR_KOD_SERIES.filter((s) => s.cat === g);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {g} <span className="store-count">{ss.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/magaza/step-motor-kodlari/${s.slug}`} className="dpu-group">
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
