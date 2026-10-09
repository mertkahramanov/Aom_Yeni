import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoreCard from "@/components/StoreCard";
import { fullName, products, slugify } from "@/data/magaza";
import { BRANDS } from "@/data/markalar";
import { breadcrumbJsonLd, SITE } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(BRANDS).map((marka) => ({ marka }));
}

export async function generateMetadata({ params }: { params: Promise<{ marka: string }> }): Promise<Metadata> {
  const b = BRANDS[(await params).marka];
  if (!b) return {};
  const url = `/magaza/marka/${(await params).marka}`;
  return {
    title: b.seoTitle,
    description: b.description,
    keywords: [`${b.name} yetkili satıcı`, `${b.name} Türkiye`, `${b.name} Ankara`, `${b.name} fiyat`],
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title: b.seoTitle, description: b.description },
  };
}

export default async function MarkaPage({ params }: { params: Promise<{ marka: string }> }) {
  const id = (await params).marka;
  const b = BRANDS[id];
  if (!b) notFound();
  const items = products.filter((p) => p.brand === b.name && !p.used);
  const cats: { title: string; items: typeof items }[] = [];
  for (const p of items) {
    let c = cats.find((x) => x.title === p.category);
    if (!c) cats.push((c = { title: p.category, items: [] }));
    c.items.push(p);
  }
  const url = `${SITE}/magaza/marka/${id}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${b.name} ürünleri`,
      url,
      inLanguage: "tr-TR",
      description: b.description,
      about: { "@type": "Brand", name: b.name, url: b.site },
      isPartOf: { "@id": `${SITE}/#org` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: items.length,
        itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/magaza/${p.slug}`, name: fullName(p) })),
      },
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: b.name, path: `/magaza/marka/${id}` },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span> <span>{b.name}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <div className="eyebrow">Yetkili satış noktası · Ankara ve Türkiye geneli</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>{b.name} ürünleri</h1>
        {b.intro.map((t) => (
          <p key={t.slice(0, 24)} style={{ margin: 0, color: "var(--ink-muted)" }}>
            {t}
          </p>
        ))}
        <div>
          <a href={b.site} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
            {b.name} web sitesi
          </a>
        </div>
      </div>
      {cats.map((c) => (
        <div key={c.title} className="store-group">
          <h2 className="store-group-title">
            <Link href={`/magaza/kategori/${slugify(c.title)}`} className="store-cat-link">
              {c.title}
            </Link>{" "}
            <span className="store-count">{c.items.length} seri</span>
          </h2>
          <ul className="store-grid">
            {c.items.map((p) => (
              <li key={p.slug}>
                <StoreCard p={p} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
