import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, KDV_ORANI, priceInfo, products, seriesOf, seriesSlug } from "@/data/magaza";
import { eligibleRegion, REGION_LINE, sellerRef, SITE } from "@/lib/seo";

const catSlug = (c: string) => (c.startsWith("Solid") ? "solid-state-roleler-ssr" : "tristorlu-guc-kontrol");

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const pr = priceInfo(p);
  const title = p.seoTitle ?? `${p.brand} ${p.model}`;
  const comm = p.specs.find((s) => s.label.startsWith("Haberleşme"))?.value;
  const description = `${p.metaDescription ?? `${p.brand} ${p.model}: ${p.name}. Faz, çevrim ve ON/OFF kontrol${comm && comm !== "Yok" ? ", RS485 Modbus RTU" : ""}.`}${
    pr ? ` ${pr.net} + KDV.` : " Fiyat için teklif isteyin."
  } ${REGION_LINE}`;
  const url = `/magaza/${p.slug}`;
  return {
    title,
    description,
    keywords: p.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      siteName: "AOM",
      title,
      description,
      images: p.image ? [{ url: p.image.src, alt: p.image.alt }] : undefined,
    },
  };
}

function jsonLd(p: NonNullable<ReturnType<typeof getProduct>>) {
  const url = `${SITE}/magaza/${p.slug}`;
  const offerPrice = p.price
    ? Math.round(p.price.list * (100 - (p.price.discountPct ?? 0))) / 100
    : undefined;
  const product: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.brand} ${p.model}`,
    description: p.summary,
    sku: p.model,
    mpn: p.model,
    brand: { "@type": "Brand", name: p.brand },
    category: p.category,
    url,
    image: p.image ? `${SITE}${p.image.src}` : undefined,
    additionalProperty: p.specs.map((s) => ({
      "@type": "PropertyValue",
      name: s.label.replace(/\*$/, ""),
      value: s.value,
    })),
  };
  if (offerPrice !== undefined && p.price) {
    product.offers = {
      "@type": "Offer",
      url,
      priceCurrency: p.price.currency,
      price: offerPrice.toFixed(2),
      itemCondition: "https://schema.org/NewCondition",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: offerPrice.toFixed(2),
        priceCurrency: p.price.currency,
        valueAddedTaxIncluded: false,
      },
      eligibleRegion,
      areaServed: eligibleRegion,
      seller: sellerRef,
    };
  }
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana sayfa", item: SITE },
      { "@type": "ListItem", position: 2, name: "Mağaza", item: `${SITE}/magaza` },
      { "@type": "ListItem", position: 3, name: p.category, item: `${SITE}/magaza/kategori/${catSlug(p.category)}` },
      ...(p.series ? [{ "@type": "ListItem", position: 4, name: p.series, item: `${SITE}/magaza/seri/${seriesSlug(p.series)}` }] : []),
      { "@type": "ListItem", position: p.series ? 5 : 4, name: `${p.brand} ${p.model}`, item: url },
    ],
  };
  return [product, breadcrumb];
}

export default async function UrunPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const pr = priceInfo(p);
  const siblings = seriesOf(p);
  const mail = `mailto:info@aomtechnology.tr?subject=${encodeURIComponent(`Teklif talebi: ${p.brand} ${p.model}`)}`;
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(p)) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link>{" "}
        <span aria-hidden="true">/</span> <Link href={`/magaza/kategori/${catSlug(p.category)}`}>{p.category}</Link>{" "}
        {p.series && (
          <>
            <span aria-hidden="true">/</span> <Link href={`/magaza/seri/${seriesSlug(p.series)}`}>{p.series.replace(/^Autonics /, "")}</Link>{" "}
          </>
        )}
        <span aria-hidden="true">/</span> <span>{p.model}</span>
      </nav>
      <div className="product-layout">
        <div className="store-visual product-visual">
          {p.image ? (
            <Image src={p.image.src} alt={p.image.alt} fill sizes="560px" style={{ objectFit: "contain" }} priority />
          ) : (
            <div className="store-visual-empty">
              <Image src={p.brandLogo.src} alt={p.brand} width={p.brandLogo.w} height={p.brandLogo.h} style={{ width: 160, height: "auto" }} />
              <span>{p.model}</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span className="eyebrow">{p.category}</span>
          <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.05 }}>
            {p.brand} {p.model}
          </h1>
          <p className="lead" style={{ fontSize: 17 }}>{p.name}</p>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{p.summary}</p>
          {pr ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="store-price-wrap">
                {pr.discount && <s className="store-price-list" style={{ fontSize: 16 }}>{pr.list}</s>}
                <span className="store-price" style={{ fontSize: 28, marginTop: 0 }}>{pr.net}</span>
                <span className="store-vat" style={{ fontSize: 16 }}>{pr.vatLabel}</span>
                {pr.discount && <span className="store-discount">{pr.discount}</span>}
              </span>
              <span className="caption">{pr.vatNote}</span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div className="store-price" style={{ fontSize: 18 }}>Fiyat için teklif isteyin</div>
              <span className="caption">Fiyatlar KDV hariçtir; %{KDV_ORANI} KDV eklenir.</span>
            </div>
          )}
          <p className="caption" style={{ margin: 0 }}>{REGION_LINE}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={mail} className="btn btn-primary">{pr ? "Sipariş / teklif isteyin" : "Teklif isteyin"}</a>
            <a href={p.source.url} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
              {p.source.label}
            </a>
          </div>
        </div>
      </div>

      {p.seoText && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
          <h2 className="h2" style={{ fontSize: 26 }}>Ürün hakkında</h2>
          {p.seoText.map((t) => (
            <p key={t.slice(0, 24)} style={{ margin: 0, color: "var(--ink-muted)" }}>{t}</p>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>{p.model} teknik özellikleri</h2>
        <table className="spec-table">
          <tbody>
            {p.specs.map((s, i) => (
              <tr key={`${s.label}-${i}`}>
                <th scope="row">{s.label}</th>
                <td>{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="caption">
          Teknik veriler Autonics ürün sayfasından alınmıştır.{p.specs.some((s) => s.label.endsWith("*")) ? " * işaretli değerler üretici kataloğundandır." : ""}{p.image && !p.image.src.includes(p.slug) ? " Fotoğraf aynı gövdeli modele aittir." : ""} Güncel değerler için üretici sayfasına bakınız.
        </p>
      </div>

      {siblings.length > 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 className="h2" style={{ fontSize: 26 }}>
            <Link href={`/magaza/seri/${seriesSlug(p.series!)}`} className="store-cat-link">{p.series} serisi</Link>: diğer modeller
          </h2>
          <table className="spec-table series-table">
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col">Akım</th>
                <th scope="col">{p.bodyLabel ?? "Gövde"}</th>
                <th scope="col">{p.optionLabel ?? "Seçenek"}</th>
                <th scope="col">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {siblings.map((s) => {
                const sp = priceInfo(s);
                const current = s.slug === p.slug;
                return (
                  <tr key={s.slug} aria-current={current ? "page" : undefined} className={current ? "is-current" : undefined}>
                    <th scope="row">{current ? s.model : <Link href={`/magaza/${s.slug}`}>{s.model}</Link>}</th>
                    <td>{s.current} A</td>
                    <td>{s.bodySize}</td>
                    <td>{s.option}</td>
                    <td>{sp ? `${sp.net} + KDV` : "Teklif isteyin"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
