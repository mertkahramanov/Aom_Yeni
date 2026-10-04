import type { Metadata } from "next";
import Link from "next/link";
import StoreCard from "@/components/StoreCard";
import { CATEGORY_INFO, products, seriesSlug, storeCategories } from "@/data/magaza";
import { ENC_TOTAL } from "@/data/enkoder";
import { breadcrumbJsonLd, REGION_LINE, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mağaza: Autonics Enkoder, SSR ve Tristörlü Güç Kontrol | Ankara",
  description:
    "Autonics enkoderler (artımlı ve mutlak), solid state röle (SSR), DPU ve SPR tristörlü güç kontrol üniteleri. Fiyatlar KDV hariç. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
  keywords: ["Autonics bayi Ankara", "enkoder", "encoder", "artımlı enkoder", "mutlak enkoder", "solid state röle", "SSR", "katı hal rölesi", "tristörlü güç kontrol ünitesi", "SCR güç kontrolörü", "otomasyon malzemeleri Ankara", "Autonics fiyat listesi"],
  alternates: { canonical: "/magaza" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza",
    siteName: "AOM",
    title: "AOM Mağaza: Autonics Enkoder, SSR ve Tristörlü Güç Kontrol",
    description: "Ankara merkezli AOM'dan Türkiye geneline Autonics enkoderler, SSR ve tristörlü güç kontrol üniteleri.",
  },
};

export default function MagazaPage() {
  const cats = storeCategories();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "AOM Mağaza",
      url: `${SITE}/magaza`,
      inLanguage: "tr-TR",
      about: cats.map((c) => c.title),
      isPartOf: { "@id": `${SITE}/#org` },
      numberOfItems: products.length,
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 820 }}>
        <div className="rule" />
        <div className="eyebrow">Mağaza</div>
        <h1 style={{ fontWeight: 800, fontSize: 44, lineHeight: 1.05 }}>AOM Mağaza</h1>
        <p className="lead">
          Autonics tristörlü güç kontrol üniteleri, solid state röleler (SSR) ve enkoderler. Fiyatlar KDV hariçtir. {REGION_LINE}
        </p>
      </div>
      {cats.length > 0 && (
        <nav aria-label="Ürün grupları" className="store-nav-wrap">
          {cats.map((c) => (
            <div key={c.id} className="store-nav">
              <Link href={`/magaza/kategori/${c.id}`} className="store-nav-cat">
                {c.title}
              </Link>
              {c.groups.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="store-chip">
                  {g.title.replace(/^Autonics /, "")} <span>{g.items.length}</span>
                </a>
              ))}
            </div>
          ))}
        </nav>
      )}
      {cats.map((c) => (
        <section key={c.id} id={c.id} className="store-cat-section" aria-labelledby={`${c.id}-baslik`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h2 id={`${c.id}-baslik`} className="h2" style={{ fontSize: 30 }}>
              <Link href={`/magaza/kategori/${c.id}`} className="store-cat-link">
                {c.title}
              </Link>{" "}
              <span className="store-count">{c.groups.reduce((n, g) => n + g.items.length, 0)} ürün</span>
            </h2>
            {CATEGORY_INFO[c.id] && <p style={{ margin: 0, color: "var(--ink-muted)", maxWidth: 860 }}>{CATEGORY_INFO[c.id].intro[0]}</p>}
            {c.id === "tristorlu-guc-kontrol" && (
              <p style={{ margin: 0 }}>
                Autonics DPU serisinin 840 sipariş kodu: <Link href="/magaza/dpu-kodlari">DPU model kodları</Link>
              </p>
            )}
            {c.id === "enkoderler" && (
              <p style={{ margin: 0 }}>
                34 enkoder serisinin {ENC_TOTAL.toLocaleString("tr-TR")} sipariş kodu: <Link href="/magaza/enkoder-kodlari">Enkoder model kodları</Link>
              </p>
            )}
          </div>
          {c.groups.map((g) => (
            <div key={g.id} id={g.id} className="store-group">
              <h3 className="store-group-title">
                {g.items[0].series ? (
                  <Link href={`/magaza/seri/${seriesSlug(g.items[0].series)}`} className="store-cat-link">
                    {g.title}
                  </Link>
                ) : (
                  g.title
                )}{" "}
                <span className="store-count">{g.items.length} {g.items[0].codePage ? "seri" : "model"}</span>
              </h3>
              <ul className="store-grid">
                {g.items.slice(0, 6).map((p) => (
                  <li key={p.slug}>
                    <StoreCard p={p} />
                  </li>

                  ))}
              </ul>
              {g.items.length > 6 && g.items[0].series && (
                <Link href={`/magaza/seri/${seriesSlug(g.items[0].series)}`} className="btn btn-outline" style={{ alignSelf: "flex-start" }}>
                  {g.title.replace(/^Autonics /, "").split(" · ")[0]}: {g.items.length} modelin tamamını gör
                </Link>
              )}
              {g.items.length > 6 && !g.items[0].series && (
                <Link href={`/magaza/kategori/${c.id}#${g.id}`} className="btn btn-outline" style={{ alignSelf: "flex-start" }}>
                  {g.title}: {g.items.length} serinin tamamını gör
                </Link>
              )}
            </div>
          ))}
        </section>
      ))}
    </section>
  );
}
