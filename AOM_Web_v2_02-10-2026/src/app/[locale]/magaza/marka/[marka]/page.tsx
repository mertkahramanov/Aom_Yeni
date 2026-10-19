import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoreCard from "@/components/StoreCard";
import { fullName, products, slugify } from "@/data/magaza";
import { BRANDS } from "@/data/markalar";
import { breadcrumbJsonLd, hreflangAlternates, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { MAGAZA_UI, seriesCount } from "@/i18n/pages/magaza";
import { translateCategoryTitle } from "@/i18n/pages/magaza-categories";
import { BRAND_CONTENT, BRAND_PAGE_UI, TURKEY_WORD, PRICE_WORD } from "@/i18n/pages/magaza-brands";

// /magaza/marka/[marka] sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
// Kapsam kararı (Mert, bu oturumda — Option A): marka tanıtım metni (seoTitle/description/eyebrow/intro)
// az sayıda ve kısa olduğundan (13 marka x 1-2 cümle) doğrudan çevrildi; bkz. src/i18n/pages/magaza-brands.ts
// ve claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md. Marka adı/ülke adı/harici site linki değişmez.
// Kategori linkleri translateCategoryTitle ile çevrilir ve /${loc}/magaza/kategori/... adresine gider.

export function generateStaticParams() {
  return Object.keys(BRANDS).map((marka) => ({ marka }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; marka: string }> }): Promise<Metadata> {
  const { locale, marka } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const b = BRANDS[marka];
  if (!b) return {};
  const bc = BRAND_CONTENT[marka]?.[loc];
  if (!bc) return {};
  const url = `/${loc}/magaza/marka/${marka}`;
  return {
    title: bc.seoTitle,
    description: bc.description,
    keywords: [`${b.name} ${bc.keywordWord}`, `${b.name} ${TURKEY_WORD[loc]}`, `${b.name} Ankara`, `${b.name} ${PRICE_WORD[loc]}`],
    alternates: { canonical: url, languages: hreflangAlternates(`/magaza/marka/${marka}`) },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title: bc.seoTitle, description: bc.description },
  };
}

export default async function LocaleMarkaPage({ params }: { params: Promise<{ locale: string; marka: string }> }) {
  const { locale, marka: id } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const b = BRANDS[id];
  if (!b) notFound();
  const bc = BRAND_CONTENT[id]?.[loc];
  if (!bc) notFound();
  const u = MAGAZA_UI[loc];
  const bu = BRAND_PAGE_UI[loc];

  const items = products.filter((p) => p.brand === b.name && !p.used);
  const cats: { title: string; items: typeof items }[] = [];
  for (const p of items) {
    let c = cats.find((x) => x.title === p.category);
    if (!c) cats.push((c = { title: p.category, items: [] }));
    c.items.push(p);
  }
  const url = `${SITE}/${loc}/magaza/marka/${id}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: bu.productsTitle(b.name),
      url,
      inLanguage: loc,
      description: bc.description,
      about: { "@type": "Brand", name: b.name, url: b.site },
      isPartOf: { "@id": `${SITE}/#org` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: items.length,
        itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/magaza/${p.slug}`, name: fullName(p) })),
      },
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: b.name, path: `/${loc}/magaza/marka/${id}` },
    ]),
  ];

  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={u.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{u.crumbHome}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza`}>{u.crumbStore}</Link> <span aria-hidden="true">/</span> <span>{b.name}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <div className="eyebrow">{bc.eyebrow}</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>{bu.productsTitle(b.name)}</h1>
        {bc.intro.map((t) => (
          <p key={t.slice(0, 24)} style={{ margin: 0, color: "var(--ink-muted)" }}>
            {t}
          </p>
        ))}
        <div>
          <a href={b.site} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
            {bu.siteLinkLabel(b.name)}
          </a>
        </div>
      </div>
      {cats.length > 0 ? (
        cats.map((c) => {
          const title = translateCategoryTitle(c.title, loc);
          return (
            <div key={c.title} className="store-group">
              <h2 className="store-group-title">
                <Link href={`/${loc}/magaza/kategori/${slugify(c.title)}`} className="store-cat-link">
                  {title}
                </Link>{" "}
                <span className="store-count">{seriesCount(c.items.length, loc)}</span>
              </h2>
              <ul className="store-grid">
                {c.items.map((p) => (
                  <li key={p.slug}>
                    <StoreCard p={p} locale={loc} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      ) : (
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{bu.emptyText(b.name)}</p>
      )}

      {/* Marka sayfası iletişim/teklif çağrısı (19-10-2026, TR 11-10-2026 karşılığı) */}
      <div className="card contact-card" style={{ maxWidth: 520 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>{bu.ctaTitle(b.name)}</div>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>{bu.ctaText}</p>
        <a className="big" href="mailto:info@aomtechnology.tr">
          info@aomtechnology.tr
        </a>
        <a className="big" href="tel:+905446247514">
          0544 624 75 14
        </a>
        <a
          href={`mailto:info@aomtechnology.tr?subject=${encodeURIComponent(bu.mailSubject(b.name))}`}
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
        >
          {bu.ctaButton}
        </a>
      </div>
    </section>
  );
}
