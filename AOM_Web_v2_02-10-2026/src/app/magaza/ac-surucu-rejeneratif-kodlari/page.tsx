import type { Metadata } from "next";
import Link from "next/link";
import { AC_REJENERATIF_SERIES, AC_REJENERATIF_TOTAL } from "@/data/yaskawa-ac-rejeneratif";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = AC_REJENERATIF_TOTAL.toLocaleString("tr-TR");

export const metadata: Metadata = {
  title: "Yaskawa Rejeneratif AC Sürücü Kodları: D1000, U1000, U1000 Panel | Ankara",
  description: `Yaskawa rejeneratif AC sürücü sipariş kodları: ${TOTAL} kod, 3 seri (D1000, U1000, U1000 Panel). Düşük harmonikli rejeneratif konvertör ve matris konvertör; güç, akım ve gerilim sınıfı bilgisiyle. Her kod için teklif. ${REGION_LINE}`,
  keywords: ["Yaskawa D1000", "Yaskawa U1000", "Yaskawa U1000 Panel", "rejeneratif konvertör", "matris konvertör", "Yaskawa rejeneratif AC sürücü", "Yaskawa AC sürücü fiyat"],
  alternates: { canonical: "/magaza/ac-surucu-rejeneratif-kodlari", languages: hreflangAlternates("/magaza/ac-surucu-rejeneratif-kodlari") },
  openGraph: { type: "website", locale: "tr_TR", url: "/magaza/ac-surucu-rejeneratif-kodlari", siteName: "AOM", title: "Yaskawa rejeneratif AC sürücü model kodları", description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}` },
};

export default function AcRejeneratifKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Yaskawa rejeneratif AC sürücü model kodları",
      url: `${SITE}/magaza/ac-surucu-rejeneratif-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: AC_REJENERATIF_SERIES.map((s) => ({ "@type": "WebPage", name: `Yaskawa ${s.key} sipariş kodları`, url: `${SITE}/magaza/ac-surucu-rejeneratif-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "AC sürücü model kodları — Rejeneratif", path: "/magaza/ac-surucu-rejeneratif-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>AC sürücü model kodları — Rejeneratif</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Rejeneratif Çözümler · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Yaskawa rejeneratif AC sürücü model kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Yaskawa&apos;nın rejeneratif AC sürücü ailesindeki D1000, U1000 ve U1000 Panel serilerine ait {TOTAL} sipariş kodunun tamamı aşağıdaki seri
          sayfalarında listelenir. Her kodun yanında güç (ND, kW), akım (ND, A) ve gerilim sınıfı bilgisi yer alır; listedeki her kod için teklif verir ve
          tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>
          Rejeneratif Çözümler <span className="store-count">{TOTAL} kod</span>
        </h2>
        <ul className="enc-series-list">
          {AC_REJENERATIF_SERIES.map((s) => (
            <li key={s.slug}>
              <Link href={`/magaza/ac-surucu-rejeneratif-kodlari/${s.slug}`} className="dpu-group">
                <strong>{s.key}</strong>
                <span>{s.title}</span>
                <span className="store-count" style={{ marginLeft: 0 }}>{s.codes.length.toLocaleString("tr-TR")} kod</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 920 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>Rejeneratif AC sürücü nedir?</h2>
        <p style={{ margin: 0 }}>
          Rejeneratif AC sürücüler, motor frenlemesi sırasında ortaya çıkan enerjiyi dirençte ısıya dönüştürmek yerine şebekeye veya sistemdeki diğer
          sürücülere geri kazandırır. D1000, AC sürücü/servo/robot sistemlerine sinüzoidal giriş akımıyla DC güç kaynağı sağlayan bir konvertör ünitesidir;
          U1000 ve U1000 Panel ise matris konvertör teknolojisiyle DC bara kondansatörü olmadan dahili güç rejenerasyonu sunan sürücülerdir.
        </p>
        <p className="caption" style={{ margin: 0 }}>
          Kod, güç, akım ve gerilim sınıfı bilgileri Yaskawa Türkiye sitesinden (yaskawa.com.tr) canlı olarak alınmıştır (20-10-2026). Güncel teknik değerler
          için üretici sayfasına bakınız.
        </p>
      </div>
    </section>
  );
}
