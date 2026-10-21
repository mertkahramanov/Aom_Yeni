import type { Metadata } from "next";
import Link from "next/link";
import { SV_S7SURUCU_SERIES, SV_S7SURUCU_TOTAL } from "@/data/yaskawa-servo-sigma7-surucu";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = SV_S7SURUCU_TOTAL.toLocaleString("tr-TR");

export const metadata: Metadata = {
  title: "Yaskawa Sigma-7 Servo Sürücü Model Kodları | Ankara",
  description: `Yaskawa Sigma-7 servo sürücüleri (SGD7S, SGD7W, SGD7C) ve 400V opsiyon modülünün ${TOTAL} model kodu. Azami motor kapasitesi, haberleşme ve gerilim bilgisiyle; her kod için teklif. ${REGION_LINE}`,
  keywords: ["Yaskawa SGD7S", "Yaskawa SGD7W", "Yaskawa SGD7C", "Yaskawa Sigma-7 servo sürücü", "Yaskawa servopack", "Yaskawa servo fiyat", "Yaskawa Advanced Safety Module"],
  alternates: { canonical: "/magaza/servo-sigma7-surucu-kodlari", languages: hreflangAlternates("/magaza/servo-sigma7-surucu-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/servo-sigma7-surucu-kodlari",
    siteName: "AOM",
    title: "Yaskawa Sigma-7 servo sürücü model kodları",
    description: `${TOTAL} model kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function ServoSigma7SurucuKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Yaskawa Sigma-7 servo sürücü model kodları",
      url: `${SITE}/magaza/servo-sigma7-surucu-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: SV_S7SURUCU_SERIES.map((s) => ({ "@type": "WebPage", name: `Yaskawa ${s.key} model kodları`, url: `${SITE}/magaza/servo-sigma7-surucu-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Sigma-7 servo sürücü model kodları", path: "/magaza/servo-sigma7-surucu-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Sigma-7 servo sürücü model kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Yaskawa Servo Sistemler · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Yaskawa Sigma-7 servo sürücü model kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Yaskawa'nın Sigma-7 tek eksenli (SGD7S), çift eksenli (SGD7W) ve dahili kontrolörlü (SGD7C) servo sürücülerine (servopack) ve Sigma-7 400V opsiyon
          modülüne ait toplam {TOTAL} model kodu aşağıdaki seri sayfalarında listelenir. Sipariş kodu Yaskawa'nın sitesinde yayınlanmadığı için azami motor
          kapasitesi, haberleşme tipi ve gerilim bilgisiyle birlikte her model için teklif isteyebilirsiniz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ul className="enc-series-list">
          {SV_S7SURUCU_SERIES.map((s) => (
            <li key={s.slug}>
              <Link href={`/magaza/servo-sigma7-surucu-kodlari/${s.slug}`} className="dpu-group">
                <strong>{s.key}</strong>
                <span>{s.title}</span>
                <span className="store-count" style={{ marginLeft: 0 }}>{s.codes.length.toLocaleString("tr-TR")} model</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="caption" style={{ margin: 0, maxWidth: 860 }}>
        Model kodları ve teknik değerler Yaskawa Türkiye sitesinden (yaskawa.com.tr) alınmıştır (20-10-2026). SGD7W serisindeki 6 model, üretici sitesinde
        "SGD7W-xxxAxxAxxx" şeklinde eksik (placeholder) model adıyla listelenmiştir; bu kayıtlar olduğu gibi aktarılmıştır.
      </p>
    </section>
  );
}
