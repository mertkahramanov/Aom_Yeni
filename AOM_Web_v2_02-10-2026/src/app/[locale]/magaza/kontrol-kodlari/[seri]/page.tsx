import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeFilter from "@/components/CodeFilter";
import { KONTROL_KOD_SERIES, kontrolKodSeries, kontrolSlug } from "@/data/kontrol";
import { products } from "@/data/magaza";
import { breadcrumbJsonLd, hreflangAlternates, ORG, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, CODE_LISTS_UI, orderCodeCount } from "@/i18n/pages/magaza";
import { translateCategoryTitle } from "@/i18n/pages/magaza-categories";
import { PRICE_WORD } from "@/i18n/pages/magaza-brands";
import { KODLARI_UI, kodlariDetailMetaTitle } from "@/i18n/pages/magaza-kodlari";

const lc = (t: string) => (/^[A-ZÇĞİÖŞÜ][a-zçğıöşü]/.test(t) ? t[0].toLocaleLowerCase("tr-TR") + t.slice(1) : t);
const WA = ORG.telephone.replace(/\D/g, "");

// kontrol-kodlari/[seri] sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
// Kapsam: sayfa çevresi çevrilir; s.desc, s.common ve s.cols seriye özel teknik içerik olarak
// Türkçe kalır — bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md.

export function generateStaticParams() {
  return KONTROL_KOD_SERIES.map((s) => ({ seri: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; seri: string }> }): Promise<Metadata> {
  const { locale, seri } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const s = kontrolKodSeries(seri);
  if (!s) return {};
  const url = `/${loc}/magaza/kontrol-kodlari/${s.slug}`;
  const title = kodlariDetailMetaTitle(s.key, s.codes.length, loc);
  const description = `Autonics ${s.key}: ${lc(s.title)}. ${orderCodeCount(s.codes.length, loc)}, ${s.codes[0][0]} … ${s.codes[s.codes.length - 1][0]}. ${REGION_LINE[loc]}`;
  return {
    title,
    description,
    keywords: [`Autonics ${s.key}`, `${s.key} ${PRICE_WORD[loc]}`, ...s.codes.filter((c) => c[1] === 0).slice(0, 12).map((c) => String(c[0]))],
    alternates: { canonical: url, languages: hreflangAlternates(`/magaza/kontrol-kodlari/${s.slug}`) },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title, description, images: s.img ? [{ url: `/magaza/${s.img}` }] : undefined },
  };
}

export default async function LocaleKontrolKodSeriPage({ params }: { params: Promise<{ locale: string; seri: string }> }) {
  const { locale, seri } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const s = kontrolKodSeries(seri);
  if (!s) notFound();
  const u = MAGAZA_UI[loc];
  const cu = CODE_LISTS_UI[loc];
  const ku = KODLARI_UI[loc];
  const categoryTitle = translateCategoryTitle(s.cat, loc);
  const productSlugs = new Set(products.map((p) => p.slug));
  const disc = s.codes.filter((c) => c[1] === 1).length;
  const tableId = `kodlar-${s.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Autonics ${s.key}`,
      url: `${SITE}/${loc}/magaza/kontrol-kodlari/${s.slug}`,
      inLanguage: loc,
      isPartOf: { "@id": `${SITE}/#org` },
      about: { "@type": "Thing", name: `Autonics ${s.key} ${s.title}` },
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: cu.kontrol.label, path: `/${loc}/magaza/kontrol-kodlari` },
      { name: s.key, path: `/${loc}/magaza/kontrol-kodlari/${s.slug}` },
    ]),
  ];
  const others = KONTROL_KOD_SERIES.filter((x) => x.cat === s.cat && x.slug !== s.slug);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={u.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{u.crumbHome}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza`}>{u.crumbStore}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza/kontrol-kodlari`}>{cu.kontrol.label}</Link> <span aria-hidden="true">/</span> <span>{s.key}</span>
      </nav>
      <div className={s.img ? "product-layout" : undefined} style={{ alignItems: "start" }}>
        {s.img && (
          <div className="store-visual product-visual">
            <Image src={`/magaza/${s.img}`} alt={`Autonics ${s.key} ${lc(s.title)}`} fill sizes="560px" style={{ objectFit: "contain" }} priority />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
          <div className="eyebrow">{categoryTitle}</div>
          <h1 style={{ fontWeight: 800, fontSize: 36, lineHeight: 1.08 }}>Autonics {s.key}</h1>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{s.desc}</p>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            {orderCodeCount(s.codes.length, loc)}
            {disc ? ` (${disc} ${ku.discontinued.toLowerCase()})` : ""}.
          </p>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE[loc]}</p>
        </div>
      </div>
      {s.common.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 900 }}>
          <h2 className="h2" style={{ fontSize: 22 }}>
            {ku.commonToAllCodes}
          </h2>
          <table className="spec-table">
            <tbody>
              {s.common.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>
          {orderCodeCount(s.codes.length, loc)}
        </h2>
        {s.codes.length > 20 && <CodeFilter tableId={tableId} total={s.codes.length} />}
        <div style={{ overflowX: "auto" }}>
          <table id={tableId} className="spec-table series-table dpu-table enc-table">
            <thead>
              <tr>
                <th scope="col">{ku.modelCode}</th>
                {s.cols.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
                <th scope="col">{ku.status}</th>
                <th scope="col">{ku.quote}</th>
              </tr>
            </thead>
            <tbody>
              {s.codes.map((row) => {
                const code = String(row[0]);
                const off = row[1] === 1;
                const ps = kontrolSlug(code);
                const isProduct = productSlugs.has(ps);
                const subject = encodeURIComponent(ku.requestForCode(code));
                const wa = encodeURIComponent(ku.waMessage(code));
                return (
                  <tr key={code} id={code}>
                    <th scope="row">{isProduct ? <Link href={`/${loc}/magaza/${ps}`}>{code}</Link> : code}</th>
                    {row.slice(2).map((v, i) => (
                      <td key={s.cols[i]}>{String(v)}</td>
                    ))}
                    <td className={off ? "enc-status-off" : undefined}>{off ? ku.discontinued : ku.inProduction}</td>
                    <td className="dpu-actions">
                      {isProduct ? (
                        <Link href={`/${loc}/magaza/${ps}`}>{ku.productPage}</Link>
                      ) : (
                        <>
                          <a href={`mailto:${ORG.email}?subject=${subject}`}>{ku.email}</a> ·{" "}
                          <a href={`https://wa.me/${WA}?text=${wa}`} target="_blank" rel="noopener noreferrer">
                            {ku.whatsapp}
                          </a>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="caption" style={{ margin: 0 }}>
          {ku.sourceCaption}
        </p>
      </div>
      {others.length > 0 && (
        <nav aria-label={ku.otherSeriesSameCategoryAria} className="store-nav">
          <span className="store-nav-cat" style={{ minWidth: 0 }}>
            {categoryTitle}:
          </span>
          {others.map((o) => (
            <Link key={o.slug} href={`/${loc}/magaza/kontrol-kodlari/${o.slug}`} className="store-chip">
              {o.key} <span>{o.codes.length}</span>
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
