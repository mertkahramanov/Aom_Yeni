import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoreCard from "@/components/StoreCard";
import { fullName, priceInfo, storeSeries } from "@/data/magaza";
import { breadcrumbJsonLd, hreflangAlternates, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, CATEGORY_PAGE_UI, CODE_LISTS_UI } from "@/i18n/pages/magaza";
import { translateCategoryTitle } from "@/i18n/pages/magaza-categories";
import { PRICE_WORD } from "@/i18n/pages/magaza-brands";
import { SERIES_PAGE_UI, translateSeriesKind, seriesMetaTitle, seriesMetaDescription } from "@/i18n/pages/magaza-seri";

// /magaza/seri/[seri] sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
// Kapsam: tablo başlıkları, breadcrumb, eyebrow (kategori adı) ve "tür" etiketi (kindLabel) çevrilir;
// seri adı (s.title), model kodları ve tablo DEĞERLERİ (akım, gövde, seçenek — ürüne özel teknik veri)
// Türkçe kalır. Bkz. src/i18n/pages/magaza-seri.ts ve claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md.

const find = (slug: string) => storeSeries().find((s) => s.slug === slug);

export function generateStaticParams() {
  return storeSeries().map((s) => ({ seri: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; seri: string }> }): Promise<Metadata> {
  const { locale, seri } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const s = find(seri);
  if (!s) return {};
  const url = `/${loc}/magaza/seri/${s.slug}`;
  const amps = s.items.map((p) => p.current ?? 0);
  const k = translateSeriesKind(s.items[0].kindLabel, s.category, loc);
  const title = seriesMetaTitle(s.title, k, loc);
  const description = seriesMetaDescription(loc, {
    title: s.title,
    kind: k,
    count: s.items.length,
    hasKindLabel: !!s.items[0].kindLabel,
    minAmp: Math.min(...amps),
    maxAmp: Math.max(...amps),
    regionLine: REGION_LINE[loc],
  });
  return {
    title,
    description,
    keywords: [s.title, `${s.title} ${PRICE_WORD[loc]}`, k, `${k} Ankara`, ...s.items.slice(0, 10).map((p) => p.model)],
    alternates: { canonical: url, languages: hreflangAlternates(`/magaza/seri/${s.slug}`) },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title, description },
  };
}

export default async function LocaleSeriPage({ params }: { params: Promise<{ locale: string; seri: string }> }) {
  const { locale, seri } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const s = find(seri);
  if (!s) notFound();
  const u = MAGAZA_UI[loc];
  const cp = CATEGORY_PAGE_UI[loc];
  const sp = SERIES_PAGE_UI[loc];
  const first = s.items[0];
  const hasAmp = s.items.some((p) => p.current !== undefined);
  const categoryTitle = translateCategoryTitle(s.category, loc);
  const kind = translateSeriesKind(first.kindLabel, s.category, loc);
  const url = `${SITE}/${loc}/magaza/seri/${s.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${s.title} ${kind}`,
      url,
      inLanguage: loc,
      isPartOf: { "@id": `${SITE}/#org` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: s.items.length,
        itemListElement: s.items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/magaza/${p.slug}`, name: fullName(p) })),
      },
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: categoryTitle, path: `/${loc}/magaza/kategori/${s.categoryId}` },
      { name: s.title, path: `/${loc}/magaza/seri/${s.slug}` },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={u.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{u.crumbHome}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza`}>{u.crumbStore}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza/kategori/${s.categoryId}`}>{categoryTitle}</Link> <span aria-hidden="true">/</span> <span>{s.title}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <div className="eyebrow">{categoryTitle}</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>
          {s.title} {kind}
        </h1>
        {first.seriesIntro && <p style={{ margin: 0, color: "var(--ink-muted)" }}>{first.seriesIntro}</p>}
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{cp.vatCaption}</p>
        {s.slug === "autonics-dpu3" && (
          <p style={{ margin: 0 }}>
            {sp.dpuNote} <Link href={`/${loc}/magaza/dpu-kodlari`}>{CODE_LISTS_UI[loc].dpu.label}</Link>
          </p>
        )}
      </div>
      {s.items.length > 48 && first.image && (
        <div className="store-visual" style={{ maxWidth: 360, borderRadius: 8, border: "1px solid var(--line)" }}>
          <Image src={first.image.src} alt={first.image.alt} fill sizes="360px" style={{ objectFit: "contain" }} />
        </div>
      )}
      <div style={{ overflowX: "auto" }}>
        <table className="spec-table series-table">
          <thead>
            <tr>
              <th scope="col">{sp.colModel}</th>
              {hasAmp && <th scope="col">{sp.colAmp}</th>}
              <th scope="col">{first.bodyLabel ?? sp.colBody}</th>
              <th scope="col">{first.optionLabel ?? sp.colOption}</th>
              <th scope="col">{sp.colPrice}</th>
            </tr>
          </thead>
          <tbody>
            {s.items.map((p) => {
              const pr = priceInfo(p);
              return (
                <tr key={p.slug}>
                  <th scope="row">
                    <Link href={`/${loc}/magaza/${p.slug}`}>{p.model}</Link>
                  </th>
                  {hasAmp && <td>{p.current} A</td>}
                  <td>{p.bodySize}</td>
                  <td>{p.option}</td>
                  <td>{pr ? `${pr.net}${sp.priceVatSuffix}` : sp.requestQuoteCell}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {s.items.length <= 48 && (
        <ul className="store-grid">
          {s.items.map((p) => (
            <li key={p.slug}>
              <StoreCard p={p} locale={loc} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
