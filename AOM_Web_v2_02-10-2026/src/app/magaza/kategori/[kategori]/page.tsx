import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoreCard from "@/components/StoreCard";
import { CATEGORY_INFO, categoryBySlug, seriesSlug, storeCategories } from "@/data/magaza";
import { ENC_TOTAL } from "@/data/enkoder";
import { breadcrumbJsonLd, REGION_LINE, SITE } from "@/lib/seo";

export function generateStaticParams() {
  return storeCategories().map((c) => ({ kategori: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ kategori: string }> }): Promise<Metadata> {
  const c = categoryBySlug((await params).kategori);
  if (!c) return {};
  const info = CATEGORY_INFO[c.id];
  const url = `/magaza/kategori/${c.id}`;
  const title = info?.seoTitle ?? c.title;
  const description = info?.description ?? `${c.title}. ${REGION_LINE}`;
  return {
    title,
    description,
    keywords: info?.keywords,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description },
  };
}

export default async function KategoriPage({ params }: { params: Promise<{ kategori: string }> }) {
  const c = categoryBySlug((await params).kategori);
  if (!c) notFound();
  const info = CATEGORY_INFO[c.id];
  const items = c.groups.flatMap((g) => g.items);
  const url = `${SITE}/magaza/kategori/${c.id}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: c.title,
      url,
      inLanguage: "tr-TR",
      description: info?.description,
      isPartOf: { "@id": `${SITE}/#org` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: items.length,
        itemListElement: items.slice(0, 100).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/magaza/${p.slug}`, name: `${p.brand} ${p.model}` })),
      },
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: c.title, path: `/magaza/kategori/${c.id}` },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>{c.title}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <div className="eyebrow">Mağaza · Ankara ve Türkiye geneli</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>{info?.seoTitle.replace(/ \| Ankara$/, "") ?? c.title}</h1>
        {(info?.intro ?? [REGION_LINE]).map((t) => (
          <p key={t.slice(0, 24)} style={{ margin: 0, color: "var(--ink-muted)" }}>
            {t}
          </p>
        ))}
        {c.id === "tristorlu-guc-kontrol" && (
          <p style={{ margin: 0 }}>
            Autonics DPU serisinin 840 sipariş kodunun tamamı (monofaze ve trifaze, 110–480 V):{" "}
            <Link href="/magaza/dpu-kodlari">DPU model kodları</Link>
          </p>
        )}
        {c.id === "enkoderler" && (
          <p style={{ margin: 0 }}>
            34 serinin {ENC_TOTAL.toLocaleString("tr-TR")} sipariş kodunun tamamı (çözünürlük, çıkış, besleme ve bağlantıya göre):{" "}
            <Link href="/magaza/enkoder-kodlari">Enkoder model kodları</Link>
          </p>
        )}
        <p className="caption" style={{ margin: 0 }}>
          Fiyatlar KDV hariçtir; %20 KDV eklenir. Fiyatı gösterilmeyen ürünler için teklif isteyin.
        </p>
      </div>
      <nav aria-label="Seriler" className="store-nav">
        {c.groups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="store-chip">
            {g.title.replace(/^Autonics /, "")} <span>{g.items.length}</span>
          </a>
        ))}
      </nav>
      {c.groups.map((g) => (
        <div key={g.id} id={g.id} className="store-group">
          <h2 className="store-group-title">
            {g.items[0].series ? (
              <Link href={`/magaza/seri/${seriesSlug(g.items[0].series)}`} className="store-cat-link">
                {g.title}
              </Link>
            ) : (
              g.title
            )}{" "}
            <span className="store-count">{g.items.length} {g.items[0].codePage ? "seri" : "model"}</span>
          </h2>
          <ul className="store-grid">
            {(g.items[0].series ? g.items.slice(0, 9) : g.items).map((p) => (
              <li key={p.slug}>
                <StoreCard p={p} />
              </li>

              ))}
          </ul>
          {g.items.length > 9 && g.items[0].series && (
            <Link href={`/magaza/seri/${seriesSlug(g.items[0].series)}`} className="btn btn-outline" style={{ alignSelf: "flex-start" }}>
              {g.title.replace(/^Autonics /, "").split(" · ")[0]}: {g.items.length} modelin tamamını gör
            </Link>
          )}
        </div>
      ))}
    </section>
  );
}
