import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LocaleTeklifForm from "@/components/LocaleTeklifForm";
import { fullName, getProduct, KDV_ORANI, priceInfo, products, seriesOf, seriesSlug, slugify } from "@/data/magaza";
import { BRANDS } from "@/data/markalar";
import { eligibleRegion, hreflangAlternates, sellerRef, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, type MagazaUi } from "@/i18n/pages/magaza";
import { translateCategoryTitle } from "@/i18n/pages/magaza-categories";
import { USED_BADGE, USED_FIELD_LABELS, URUN_UI } from "@/i18n/pages/magaza-urun";

// /magaza/[slug] ürün detay sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
// Kapsam: sayfa çevresi (breadcrumb, 2.el rozeti/alanları, fiyat-KDV notu, buton ve başlık metinleri)
// çevrildi. Ürünün kendi içeriği (isim, özet, özellik DEĞERLERİ, SEO metni, kaynak etiketi) ÜRÜNE ÖZEL
// teknik veri olduğundan Türkçe kalır — bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md. Not: ürün
// sayfaları henüz TR kategori/seri/marka sayfalarına (kategori/seri adlarını Türkçe göstermek üzere)
// değil, kendi locale eşdeğerlerine bağlanır.

const catSlug = (c: string) => slugify(c);

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const p = getProduct(slug);
  if (!p) return {};
  const pr = priceInfo(p);
  const title = p.seoTitle ?? fullName(p);
  const u = URUN_UI[loc];
  const comm = p.specs.find((s) => s.label.startsWith("Haberleşme"))?.value;
  const description = `${p.metaDescription ?? `${fullName(p)}: ${p.name}.`}${pr ? ` ${pr.net}${u.priceVatSuffix}.` : ` ${u.requestQuotePrice}.`} ${REGION_LINE[loc]}`;
  const url = `/${loc}/magaza/${p.slug}`;
  return {
    title,
    description,
    keywords: p.keywords,
    alternates: { canonical: url, languages: hreflangAlternates(`/magaza/${p.slug}`) },
    openGraph: {
      type: "website",
      locale: ogLocale[loc],
      url,
      siteName: "AOM",
      title,
      description,
      images: p.image ? [{ url: p.image.src, alt: p.image.alt }] : undefined,
    },
  };
}

function jsonLd(p: NonNullable<ReturnType<typeof getProduct>>, loc: Locale, u: MagazaUi) {
  const url = `${SITE}/${loc}/magaza/${p.slug}`;
  const offerPrice = p.price ? Math.round(p.price.list * (100 - (p.price.discountPct ?? 0))) / 100 : undefined;
  const categoryTitle = translateCategoryTitle(p.category, loc);
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
    additionalProperty: p.specs.filter((s) => s.value).map((s) => ({ "@type": "PropertyValue", name: s.label.replace(/\*$/, ""), value: s.value })),
  };
  if (offerPrice !== undefined && p.price) {
    product.offers = {
      "@type": "Offer",
      url,
      priceCurrency: p.price.currency,
      price: offerPrice.toFixed(2),
      itemCondition: "https://schema.org/NewCondition",
      priceSpecification: { "@type": "UnitPriceSpecification", price: offerPrice.toFixed(2), priceCurrency: p.price.currency, valueAddedTaxIncluded: false },
      eligibleRegion,
      areaServed: eligibleRegion,
      seller: sellerRef,
    };
  }
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: u.crumbHome, item: `${SITE}/${loc}` },
      { "@type": "ListItem", position: 2, name: u.crumbStore, item: `${SITE}/${loc}/magaza` },
      { "@type": "ListItem", position: 3, name: categoryTitle, item: `${SITE}/${loc}/magaza/kategori/${catSlug(p.category)}` },
      ...(p.series ? [{ "@type": "ListItem", position: 4, name: p.series, item: `${SITE}/${loc}/magaza/seri/${seriesSlug(p.series)}` }] : []),
      { "@type": "ListItem", position: p.series ? 5 : 4, name: fullName(p), item: url },
    ],
  };
  return [product, breadcrumb];
}

export default async function LocaleUrunPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const p = getProduct(slug);
  if (!p) notFound();
  const dict = getDictionary(loc);
  const mu = MAGAZA_UI[loc];
  const uu = URUN_UI[loc];
  const usedF = USED_FIELD_LABELS[loc];
  const pr = priceInfo(p);
  const categoryTitle = translateCategoryTitle(p.category, loc);
  const allSiblings = seriesOf(p);
  const idx = allSiblings.findIndex((x) => x.slug === p.slug);
  const siblings = allSiblings.length > 40 ? allSiblings.slice(Math.max(0, idx - 12), Math.max(0, idx - 12) + 25) : allSiblings;
  const sibAmp = siblings.some((x) => x.current !== undefined);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(p, loc, mu)) }} />
      <nav aria-label={mu.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{mu.crumbHome}</Link> <span aria-hidden="true">/</span> <Link href={`/${loc}/magaza`}>{mu.crumbStore}</Link>{" "}
        <span aria-hidden="true">/</span> <Link href={`/${loc}/magaza/kategori/${catSlug(p.category)}`}>{categoryTitle}</Link>{" "}
        {p.series && (
          <>
            <span aria-hidden="true">/</span> <Link href={`/${loc}/magaza/seri/${seriesSlug(p.series)}`}>{p.series.replace(/^Autonics /, "")}</Link>{" "}
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
          <span className="eyebrow">{categoryTitle}</span>
          {p.used && (
            <dl className="used-box">
              <span className="used-badge">{USED_BADGE[loc]}</span>
              {p.used.condition && (
                <>
                  <dt>{usedF.condition}</dt>
                  <dd>{p.used.condition}</dd>
                </>
              )}
              {p.used.tested && (
                <>
                  <dt>{usedF.tested}</dt>
                  <dd>{p.used.tested}</dd>
                </>
              )}
              {p.used.warranty && (
                <>
                  <dt>{usedF.warranty}</dt>
                  <dd>{p.used.warranty}</dd>
                </>
              )}
              {p.used.qty !== undefined && (
                <>
                  <dt>{usedF.stock}</dt>
                  <dd>
                    {p.used.qty} {usedF.qtyUnit}
                  </dd>
                </>
              )}
              {p.used.note && (
                <>
                  <dt>{usedF.note}</dt>
                  <dd>{p.used.note}</dd>
                </>
              )}
            </dl>
          )}
          <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.05 }}>{fullName(p)}</h1>
          <p className="lead" style={{ fontSize: 17 }}>
            {p.name}
          </p>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{p.summary}</p>
          {pr ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="store-price-wrap">
                {pr.discount && (
                  <s className="store-price-list" style={{ fontSize: 16 }}>
                    {pr.list}
                  </s>
                )}
                <span className="store-price" style={{ fontSize: 28, marginTop: 0 }}>
                  {pr.net}
                </span>
                <span className="store-vat" style={{ fontSize: 16 }}>
                  {pr.vatLabel}
                </span>
                {pr.discount && <span className="store-discount">{pr.discount}</span>}
              </span>
              <span className="caption">{pr.vatNote}</span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div className="store-price" style={{ fontSize: 18 }}>
                {uu.requestQuotePrice}
              </div>
              <span className="caption">{uu.vatCaption(KDV_ORANI)}</span>
            </div>
          )}
          <p className="caption" style={{ margin: 0 }}>
            {REGION_LINE[loc]}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {p.codePage && (
              <Link href={p.codePage.href} className="btn btn-outline">
                {uu.seeOrderCodes(p.codePage.count)}
              </Link>
            )}
            {p.source && (
              <a href={p.source.url} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                {p.source.label}
              </a>
            )}
            {!p.used && p.brand && BRANDS[slugify(p.brand)] && (
              <Link href={`/${loc}/magaza/marka/${slugify(p.brand)}`} className="btn btn-outline">
                {uu.allBrandProducts(p.brand)}
              </Link>
            )}
          </div>
          <LocaleTeklifForm
            formName="product_page_form"
            itemName={fullName(p)}
            title={pr ? uu.teklifTitleWithPrice : undefined}
            dict={dict}
          />
        </div>
      </div>

      {p.seoText && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
          <h2 className="h2" style={{ fontSize: 26 }}>
            {uu.aboutProductHeading}
          </h2>
          {p.seoText.map((t) => (
            <p key={t.slice(0, 24)} style={{ margin: 0, color: "var(--ink-muted)" }}>
              {t}
            </p>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          {uu.specsHeading(p.model)}
        </h2>
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
          {p.specNote ?? uu.defaultSpecNote}
          {p.imageNote ? ` ${p.imageNote}` : ""}
          {p.specs.some((s) => s.label.endsWith("*")) ? uu.starNote : ""}
          {p.image && !p.codePage && !p.imageNote && !p.specNote && !p.image.src.includes(p.slug) ? uu.samePhotoNote : ""}
          {p.specNote ? "" : uu.seeManufacturerNote}
        </p>
      </div>

      {p.repTable && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 className="h2" style={{ fontSize: 26 }}>
            {uu.repTableHeading(p.repTable.model)}
          </h2>
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
          <p className="caption">{uu.repTableCaption}</p>
        </div>
      )}

      {p.codePage && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
          <h2 className="h2" style={{ fontSize: 26 }}>
            {uu.codePageHeading(p.model)}
          </h2>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{uu.codePageText(fullName(p), p.codePage.count, p.codePage.discontinued ?? 0)}</p>
          <Link href={p.codePage.href} className="btn btn-outline" style={{ alignSelf: "flex-start" }}>
            {uu.codePageButton(p.model, p.codePage.count)}
          </Link>
        </div>
      )}

      {siblings.length > 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 className="h2" style={{ fontSize: 26 }}>
            <Link href={`/${loc}/magaza/seri/${seriesSlug(p.series!)}`} className="store-cat-link">
              {uu.seriesLabel(p.series!)}
            </Link>
            : {allSiblings.length > siblings.length ? uu.nearbyModels(allSiblings.length) : uu.otherModels}
          </h2>
          <table className="spec-table series-table">
            <thead>
              <tr>
                <th scope="col">{uu.colModel}</th>
                {sibAmp && <th scope="col">{uu.colAmp}</th>}
                <th scope="col">{p.bodyLabel ?? uu.colBody}</th>
                <th scope="col">{p.optionLabel ?? uu.colOption}</th>
                <th scope="col">{uu.colPrice}</th>
              </tr>
            </thead>
            <tbody>
              {siblings.map((s) => {
                const sp = priceInfo(s);
                const current = s.slug === p.slug;
                return (
                  <tr key={s.slug} aria-current={current ? "page" : undefined} className={current ? "is-current" : undefined}>
                    <th scope="row">{current ? s.model : <Link href={`/${loc}/magaza/${s.slug}`}>{s.model}</Link>}</th>
                    {sibAmp && <td>{s.current} A</td>}
                    <td>{s.bodySize}</td>
                    <td>{s.option}</td>
                    <td>{sp ? `${sp.net}${uu.priceVatSuffix}` : uu.requestQuoteCell}</td>
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
