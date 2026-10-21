import type { Metadata } from "next";
import Link from "next/link";
import { AC_OZEL_SERIES, AC_OZEL_TOTAL } from "@/data/yaskawa-ac-ozel-uygulama";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = AC_OZEL_TOTAL.toLocaleString("tr-TR");

export const metadata: Metadata = {
  title: "Yaskawa Özel Uygulama AC Sürücü Model Kodları: CR700, L1000A, HV600, LA500 | Ankara",
  description: `Yaskawa özel uygulama AC sürücü sipariş kodları: ${TOTAL} kod, 4 seri. CR700 (vinç), L1000A (asansör), HV600 (HVAC), LA500 (asansör); güç, akım ve gerilim sınıfı bilgisiyle. Her kod için teklif. ${REGION_LINE}`,
  keywords: ["Yaskawa CR700", "Yaskawa L1000A", "Yaskawa HV600", "Yaskawa LA500", "Yaskawa asansör sürücüsü", "Yaskawa vinç sürücüsü", "Yaskawa HVAC sürücüsü", "AC sürücü sipariş kodu"],
  alternates: { canonical: "/magaza/ac-surucu-ozel-kodlari", languages: hreflangAlternates("/magaza/ac-surucu-ozel-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/ac-surucu-ozel-kodlari",
    siteName: "AOM",
    title: "Yaskawa özel uygulama AC sürücü model kodları",
    description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function AcSurucuOzelKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Yaskawa özel uygulama AC sürücü model kodları",
      url: `${SITE}/magaza/ac-surucu-ozel-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: AC_OZEL_SERIES.map((s) => ({ "@type": "WebPage", name: `Yaskawa ${s.key} sipariş kodları`, url: `${SITE}/magaza/ac-surucu-ozel-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Özel uygulama AC sürücü model kodları", path: "/magaza/ac-surucu-ozel-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Özel uygulama AC sürücü model kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Özel uygulama AC sürücüleri · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Yaskawa özel uygulama AC sürücü model kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Yaskawa&apos;nın vinç (CR700), asansör (L1000A, LA500) ve HVAC/iklimlendirme (HV600) uygulamalarına özel dört AC sürücü serisine ait {TOTAL}{" "}
          sipariş kodunun tamamı aşağıdaki seri sayfalarında listelenir. Her kodun yanında güç (kW), akım (A) ve gerilim sınıfı (200 V / 400 V) bilgisi yer
          alır; listedeki her kod için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>
          Özel Uygulama AC Sürücüleri <span className="store-count">{TOTAL} kod</span>
        </h2>
        <ul className="enc-series-list">
          {AC_OZEL_SERIES.map((s) => (
            <li key={s.slug}>
              <Link href={`/magaza/ac-surucu-ozel-kodlari/${s.slug}`} className="dpu-group">
                <strong>{s.key}</strong>
                <span>{s.note}</span>
                <span className="store-count" style={{ marginLeft: 0 }}>
                  {s.codes.length.toLocaleString("tr-TR")} kod
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 920 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Güç, akım ve gerilim değerleri nasıl okunur?
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Dört seride de güç ve akım, Yaskawa&apos;nın kendi ürün sayfalarında gösterdiği tek duty (yük) bazındadır: CR700, L1000A ve LA500 için Heavy Duty
          (HD, ağır yük/kalkış torku öncelikli), HV600 için Normal Duty (ND, standart yük). Gerilim sınıfı 200 V veya 400 V&apos;dir; CR700 serisinin tamamı
          yalnızca 400 V&apos;dir.
        </p>
        <p className="caption" style={{ margin: 0 }}>
          Kodlar ve teknik değerler Yaskawa Türkiye&apos;nin resmi sitesinden (yaskawa.com.tr, Özel Uygulama AC Sürücüleri kategorisi) alınmıştır
          (20-10-2026). Güncel teknik değerler için üretici sayfasına bakınız.
        </p>
      </div>
    </section>
  );
}
