import type { Metadata } from "next";
import Link from "next/link";
import { SV_S7MOTOR_SERIES, SV_S7MOTOR_TOTAL } from "@/data/yaskawa-servo-sigma7-motor";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = SV_S7MOTOR_TOTAL.toLocaleString("tr-TR");

export const metadata: Metadata = {
  title: `Yaskawa Sigma-7 Servo Motor Model Kodları: ${TOTAL} Kayıt | Ankara`,
  description: `Yaskawa Sigma-7 rotary servo motor model kodları: ${TOTAL} kayıt, 3 seri (SGM7A, SGM7G, SGM7J). Anma torku, anma hızı, gerilim, enkoder tipi ve flanş çapı bilgisiyle. Her kod için teklif. ${REGION_LINE}`,
  keywords: ["Yaskawa SGM7A", "Yaskawa SGM7G", "Yaskawa SGM7J", "Yaskawa Sigma-7", "Yaskawa servo motor model kodu", "Yaskawa servo motor fiyat", "Sigma-7 rotary servomotor"],
  alternates: { canonical: "/magaza/servo-sigma7-motor-kodlari", languages: hreflangAlternates("/magaza/servo-sigma7-motor-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/servo-sigma7-motor-kodlari",
    siteName: "AOM",
    title: "Yaskawa Sigma-7 servo motor model kodları",
    description: `${TOTAL} kayıt için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function ServoSigma7MotorKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Yaskawa Sigma-7 servo motor model kodları",
      url: `${SITE}/magaza/servo-sigma7-motor-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: SV_S7MOTOR_SERIES.map((s) => ({ "@type": "WebPage", name: `Yaskawa ${s.key} model kodları`, url: `${SITE}/magaza/servo-sigma7-motor-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Servo motor model kodları (Sigma-7)", path: "/magaza/servo-sigma7-motor-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Servo motor model kodları (Sigma-7)</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Servo Motorlar · Yaskawa Sigma-7 · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Yaskawa Sigma-7 rotary servo motor model kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Yaskawa&apos;nın Sigma-7 rotary servo motor ailesine ait 3 serinin (SGM7A, SGM7G, SGM7J) toplam {TOTAL} sipariş kodu aşağıdaki seri
          sayfalarında listelenir. Her kodun yanında anma torku, anma hızı, gerilim, anma çıkış gücü, enkoder tipi, mil ucu, seçenek (fren/keçe)
          ve flanş çapı bilgisi yer alır; listedeki her kod için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>
          Sigma-7 Rotary Servomotors <span className="store-count">{TOTAL} kayıt</span>
        </h2>
        <ul className="enc-series-list">
          {SV_S7MOTOR_SERIES.map((s) => (
            <li key={s.slug}>
              <Link href={`/magaza/servo-sigma7-motor-kodlari/${s.slug}`} className="dpu-group">
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
          Veriler Yaskawa Türkiye&apos;nin resmi ürün sayfalarından (yaskawa.com.tr) okunarak derlenmiştir (20-10-2026). Gerilim, enkoder tipi,
          mil ucu ve seçenek bilgisi sipariş kodunun kendisinden çözülmüştür; anma torku, anma çıkış gücü ve flanş çapı üreticinin ürün detay
          sayfalarıyla doğrulanmıştır. Her serinin kendi sayfasında, üreticinin ürün ızgarasında tespit edilen tekil veri tutarsızlıkları ayrıca
          not edilmiştir. Sipariş kodu üreticinin sitesinde fiyatla birlikte yayınlanmadığından fiyat için teklif isteyin.
        </p>
      </div>
    </section>
  );
}
