import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fullName, getProduct, KDV_ORANI, priceInfo, products, seriesOf, seriesSlug, slugify } from "@/data/magaza";
import { eligibleRegion, REGION_LINE, sellerRef, SITE } from "@/lib/seo";

const catSlug = (c: string) => slugify(c);

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const pr = priceInfo(p);
  const title = p.seoTitle ?? fullName(p);
  const comm = p.specs.find((s) => s.label.startsWith("Haberleşme"))?.value;
  const description = `${p.metaDescription ?? `${fullName(p)}: ${p.name}. Faz, çevrim ve ON/OFF kontrol${comm && comm !== "Yok" ? ", RS485 Modbus RTU" : ""}.`}${
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
    name: fullName(p),
    description: p.summary,
    sku: p.model,
    mpn: p.specs.find((s) => s.label === "Orijinal kod")?.value ?? (p.brandLogo?.src.includes("autonics") ? p.model : undefined),
    brand: p.brand ? { "@type": "Brand", name: p.brand } : undefined,
    category: p.category,
    url,
    image: p.image ? `${SITE}${p.image.src}` : undefined,
    additionalProperty: p.specs.filter((s) => s.value).map((s) => ({
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
      { "@type": "ListItem", position: p.series ? 5 : 4, name: fullName(p), item: url },
    ],
  };
  return [product, breadcrumb];
}

export default async function UrunPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const pr = priceInfo(p);
  const allSiblings = seriesOf(p);
  // Büyük serilerde (ör. TK 509 model) ürün sayfasında yalnız yakın modeller gösterilir; tamamı seri sayfasında
  const idx = allSiblings.findIndex((x) => x.slug === p.slug);
  const siblings = allSiblings.length > 40 ? allSiblings.slice(Math.max(0, idx - 12), Math.max(0, idx - 12) + 25) : allSiblings;
  const sibAmp = siblings.some((x) => x.current !== undefined);
  const mail = `mailto:info@aomtechnology.tr?subject=${encodeURIComponent(`Teklif talebi: ${fullName(p)}`)}`;
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
              {p.brandLogo ? (
                <Image src={p.brandLogo.src} alt={p.brand} width={p.brandLogo.w} height={p.brandLogo.h} style={{ width: 160, height: "auto" }} />
              ) : (
                p.brand && <strong className="store-visual-brand">{p.brand}</strong>
              )}
              <span>{p.model}</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span className="eyebrow">{p.category}</span>
          {p.used && (
            <dl className="used-box">
              <span className="used-badge">2. el ürün</span>
              {p.used.condition && (<><dt>Durum</dt><dd>{p.used.condition}</dd></>)}
              {p.used.tested && (<><dt>Test</dt><dd>{p.used.tested}</dd></>)}
              {p.used.warranty && (<><dt>Garanti</dt><dd>{p.used.warranty}</dd></>)}
              {p.used.qty !== undefined && (<><dt>Stok</dt><dd>{p.used.qty} adet</dd></>)}
              {p.used.note && (<><dt>Not</dt><dd>{p.used.note}</dd></>)}
            </dl>
          )}
          <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.05 }}>{fullName(p)}</h1>
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
            {p.codePage && (
              <Link href={p.codePage.href} className="btn btn-outline">
                {p.codePage.count} sipariş kodunu gör
              </Link>
            )}
            {p.source && (
              <a href={p.source.url} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                {p.source.label}
              </a>
            )}
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
          {p.specNote ?? "Teknik veriler Autonics ürün sayfasından alınmıştır."}{p.imageNote ? ` ${p.imageNote}` : ""}{p.specs.some((s) => s.label.endsWith("*")) ? " * işaretli değerler üretici kataloğundandır." : ""}{p.image && !p.codePage && !p.imageNote && !p.specNote && !p.image.src.includes(p.slug) ? " Fotoğraf aynı gövdeli modele aittir." : ""}{p.specNote ? "" : " Güncel değerler için üretici sayfasına bakınız."}
        </p>
      </div>

      {p.repTable && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 className="h2" style={{ fontSize: 26 }}>Örnek model: {p.repTable.model}</h2>
          <table className="spec-table">
            <tbody>
              {p.repTable.rows.map((s, i) => (
                <tr key={`${s.label}-${i}`}>
                  <th scope="row">{s.label}</th>
                  <td>{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="caption">Serideki bir modelin üretici teknik tablosu. Diğer kodların değerleri çözünürlük, çıkış ve bağlantı seçeneğine göre değişir.</p>
        </div>
      )}

      {p.codePage && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
          <h2 className="h2" style={{ fontSize: 26 }}>{p.model} sipariş kodları</h2>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            {fullName(p)} serisinin {p.codePage.count} sipariş kodunun tamamı çözünürlük, çıkış, besleme ve bağlantı bilgileriyle kod sayfasında listelenir
            {p.codePage.discontinued ? `; ${p.codePage.discontinued} kod üretimden kalkmış olarak işaretlidir` : ""}. Listedeki her kod için teklif isteyebilirsiniz.
          </p>
          <Link href={p.codePage.href} className="btn btn-outline" style={{ alignSelf: "flex-start" }}>
            {p.model}: {p.codePage.count} sipariş kodu
          </Link>
        </div>
      )}

      {siblings.length > 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 className="h2" style={{ fontSize: 26 }}>
            <Link href={`/magaza/seri/${seriesSlug(p.series!)}`} className="store-cat-link">{p.series} serisi</Link>: {allSiblings.length > siblings.length ? `yakın modeller (${allSiblings.length} modelin tamamı seri sayfasında)` : "diğer modeller"}
          </h2>
          <table className="spec-table series-table">
            <thead>
              <tr>
                <th scope="col">Model</th>
                {sibAmp && <th scope="col">Akım</th>}
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
                    {sibAmp && <td>{s.current} A</td>}
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
