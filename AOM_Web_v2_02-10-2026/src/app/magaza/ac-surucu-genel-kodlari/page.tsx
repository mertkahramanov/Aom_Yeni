import type { Metadata } from "next";
import Link from "next/link";
import { AC_GENEL_GROUPS, AC_GENEL_SERIES, AC_GENEL_TOTAL } from "@/data/yaskawa-ac-genel-kompakt";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = AC_GENEL_TOTAL.toLocaleString("tr-TR");

export const metadata: Metadata = {
  title: "Yaskawa AC Sürücü Model Kodları: GA500, GA700, A1000, V1000, J1000, L1000V | Ankara",
  description: `Yaskawa AC sürücü sipariş kodları: ${TOTAL} kod, 6 seri. GA500, GA700, A1000, V1000, J1000, L1000V; güç, akım ve gerilim sınıfı bilgisiyle. Her kod için teklif. ${REGION_LINE}`,
  keywords: ["Yaskawa AC sürücü kodu", "Yaskawa GA500", "Yaskawa GA700", "Yaskawa A1000", "Yaskawa V1000", "Yaskawa J1000", "Yaskawa L1000V", "AC sürücü sipariş kodu", "frekans konvertörü fiyat"],
  alternates: { canonical: "/magaza/ac-surucu-genel-kodlari", languages: hreflangAlternates("/magaza/ac-surucu-genel-kodlari") },
  openGraph: { type: "website", locale: "tr_TR", url: "/magaza/ac-surucu-genel-kodlari", siteName: "AOM", title: "Yaskawa AC sürücü model kodları", description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}` },
};

export default function AcSurucuGenelKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Yaskawa AC sürücü model kodları",
      url: `${SITE}/magaza/ac-surucu-genel-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: AC_GENEL_SERIES.map((s) => ({ "@type": "WebPage", name: `Yaskawa ${s.title} sipariş kodları`, url: `${SITE}/magaza/ac-surucu-genel-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "AC sürücü model kodları", path: "/magaza/ac-surucu-genel-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>AC sürücü model kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">AC sürücüler · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Yaskawa AC sürücü model kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Yaskawa&apos;nın GA500, GA700, A1000, V1000, J1000 ve L1000V serilerine ait {TOTAL} sipariş kodunun tamamı aşağıdaki seri sayfalarında listelenir.
          Her kodun yanında güç (kW), akım (A) ve gerilim sınıfı (200 V / 400 V) bilgisi yer alır; listedeki her kod için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>

      {AC_GENEL_GROUPS.map((g) => (
        <div key={g.id} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 className="h2" style={{ fontSize: 24 }}>
            {g.title} <span className="store-count">{g.series.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
          </h2>
          <ul className="enc-series-list">
            {g.series.map((s) => (
              <li key={s.slug}>
                <Link href={`/magaza/ac-surucu-genel-kodlari/${s.slug}`} className="dpu-group">
                  <strong>{s.title}</strong>
                  <span>{s.note}</span>
                  <span className="store-count" style={{ marginLeft: 0 }}>{s.codes.length.toLocaleString("tr-TR")} kod</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 920 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>Güç ve akım değerleri nasıl okunur?</h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Yaskawa, çoğu AC sürücü serisinde güç ve akımı Normal Duty (ND, standart yük) bazında gösterir. L1000V serisi ve bazı tekil modeller ise yalnızca
          Heavy Duty (HD, ağır yük) değerini gösterir; kod tablolarında bu fark &quot;Duty&quot; sütununda belirtilir. Gerilim sınıfı 200 V veya 400 V&apos;dir;
          sitede sınıfı belirtilmeyen birkaç V1000 kodu için &quot;Belirtilmemiş&quot; yazılmıştır.
        </p>
        <p className="caption" style={{ margin: 0 }}>
          Kodlar ve teknik değerler Yaskawa Türkiye&apos;nin resmi sitesinden (yaskawa.com.tr) alınmıştır (20-10-2026). Güncel teknik değerler için üretici
          sayfasına bakınız.
        </p>
      </div>
    </section>
  );
}
