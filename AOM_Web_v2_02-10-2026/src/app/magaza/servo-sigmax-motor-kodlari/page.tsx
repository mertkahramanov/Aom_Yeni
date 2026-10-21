import type { Metadata } from "next";
import Link from "next/link";
import { SV_SXMOTOR_SERIES, SV_SXMOTOR_TOTAL } from "@/data/yaskawa-servo-sigmax-motor";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = SV_SXMOTOR_TOTAL.toLocaleString("tr-TR");

export const metadata: Metadata = {
  title: `Yaskawa Sigma-X Servo Motor Model Kodları: ${TOTAL} Kayıt | Ankara`,
  description: `Yaskawa Sigma-X rotary servo motor model kodları: ${TOTAL} kayıt, 3 seri (SGMXG, SGMXJ, SGMXA). Anma torku, anma hızı, gerilim, enkoder tipi ve flanş çapı bilgisiyle. Her kod için teklif. ${REGION_LINE}`,
  keywords: ["Yaskawa SGMXG", "Yaskawa SGMXJ", "Yaskawa SGMXA", "Yaskawa Sigma-X", "Yaskawa servo motor model kodu", "Yaskawa servo motor fiyat", "Sigma-X rotary servomotor"],
  alternates: { canonical: "/magaza/servo-sigmax-motor-kodlari", languages: hreflangAlternates("/magaza/servo-sigmax-motor-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/servo-sigmax-motor-kodlari",
    siteName: "AOM",
    title: "Yaskawa Sigma-X servo motor model kodları",
    description: `${TOTAL} model kaydı için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function ServoSigmaXMotorKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Yaskawa Sigma-X servo motor model kodları",
      url: `${SITE}/magaza/servo-sigmax-motor-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: SV_SXMOTOR_SERIES.map((s) => ({ "@type": "WebPage", name: `Yaskawa ${s.key} model kodları`, url: `${SITE}/magaza/servo-sigmax-motor-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Servo motor model kodları", path: "/magaza/servo-sigmax-motor-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Servo motor model kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Servo Motorlar · Yaskawa Sigma-X · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Yaskawa Sigma-X rotary servo motor model kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Yaskawa&apos;nın Sigma-X rotary servo motor ailesine ait 3 serinin (SGMXG, SGMXJ, SGMXA) toplam {TOTAL} model kaydı aşağıdaki seri
          sayfalarında listelenir. Her kodun yanında anma torku, anma hızı, gerilim, anma çıkış gücü, enkoder tipi ve flanş çapı bilgisi yer alır;
          listedeki her kod için teklif verir ve tedarik ederiz. Sigma-X, Yaskawa&apos;nın Sigma-7 ailesinin yanında yer alan daha yeni nesil rotary
          servo motor hattıdır.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>
          Sigma-X Rotary Servomotors <span className="store-count">{TOTAL} kayıt</span>
        </h2>
        <ul className="enc-series-list">
          {SV_SXMOTOR_SERIES.map((s) => (
            <li key={s.slug}>
              <Link href={`/magaza/servo-sigmax-motor-kodlari/${s.slug}`} className="dpu-group">
                <strong>{s.key}</strong>
                <span>{s.title}</span>
                <span className="store-count" style={{ marginLeft: 0 }}>{s.codes.length.toLocaleString("tr-TR")} kayıt</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 920 }}>
        <p className="caption" style={{ margin: 0 }}>
          Veriler Yaskawa Türkiye&apos;nin resmi ürün sayfalarından (yaskawa.com.tr) her model için ayrı ayrı okunarak derlenmiştir (20-10-2026).
          Üretici sitesi bazı kodlarda anma hızı veya anma çıkış gücü alanını eksik haneyle görüntülemektedir; bu durumlar ilgili seri sayfasında
          belirtilmiştir ve değerler düzeltilmeden aktarılmıştır. Sipariş kodu üreticinin sitesinde yayınlanmadığından fiyat için teklif isteyin.
        </p>
      </div>
    </section>
  );
}
