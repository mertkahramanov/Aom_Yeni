import type { Metadata } from "next";
import Link from "next/link";
import { GUVENLIK_SWITCH_KOD_SERIES, GUVENLIK_SWITCH_KOD_TOTAL } from "@/data/autonics-guvenlik-switch_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = GUVENLIK_SWITCH_KOD_TOTAL.toLocaleString("tr-TR");
const GROUPS = [...new Set(GUVENLIK_SWITCH_KOD_SERIES.map((s) => s.cat))];

export const metadata: Metadata = {
  title: "Autonics Güvenlik Switch Kodları | Ankara",
  description: `Autonics güvenlik kapı switch'i, güvenlik kapı kilit switch'i, güvenlik anahtarlı seçici switch ve güvenlik acil durdurma switch'i sipariş kodları: ${TOTAL} kod, ${GUVENLIK_SWITCH_KOD_SERIES.length} seri (SFDL, SFD, SF2KR, SF2ER). Her kod için teklif. ${REGION_LINE}`,
  keywords: [
    "Autonics güvenlik switch",
    "Autonics güvenlik kapı switch",
    "Autonics SFDL",
    "Autonics SFD",
    "Autonics SF2KR",
    "Autonics SF2ER",
    "Autonics güvenlik kapı kilit switch",
    "Autonics güvenlik anahtarlı seçici",
    "Autonics acil durdurma switch",
    "güvenlik switch fiyat",
  ],
  alternates: { canonical: "/magaza/guvenlik-switch-kodlari", languages: hreflangAlternates("/magaza/guvenlik-switch-kodlari") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza/guvenlik-switch-kodlari",
    siteName: "AOM",
    title: "Autonics güvenlik switch kodları",
    description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}`,
  },
};

export default function GuvenlikSwitchKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics güvenlik switch kodları",
      url: `${SITE}/magaza/guvenlik-switch-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: GUVENLIK_SWITCH_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key} sipariş kodları`, url: `${SITE}/magaza/guvenlik-switch-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Güvenlik switch kodları", path: "/magaza/guvenlik-switch-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>Güvenlik switch kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Güvenlik switch'leri · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics güvenlik switch kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Mağazada ürün olarak yer almayan Autonics güvenlik kapı switch'i, güvenlik kapı kilit switch'i, güvenlik anahtarlı seçici switch ve güvenlik acil
          durdurma switch'i ailelerinin {TOTAL} sipariş kodu aşağıdaki seri sayfalarında listelenir. Listedeki her kod için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Not: Autonics'in SFL ve SFLA serileri güvenlik ışık perdesidir (optik sensör, mekanik switch değildir) ve bu sayfanın kapsamı dışındadır.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = GUVENLIK_SWITCH_KOD_SERIES.filter((s) => s.cat === g);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {g} <span className="store-count">{ss.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/magaza/guvenlik-switch-kodlari/${s.slug}`} className="dpu-group">
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
