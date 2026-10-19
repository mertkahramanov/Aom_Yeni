import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeFilter from "@/components/CodeFilter";
import { ENC_SERIES, encLabel, encProductSlug, encSeries, lcFirst } from "@/data/enkoder";
import { breadcrumbJsonLd, hreflangAlternates, ORG, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, CODE_LISTS_UI, orderCodeCount } from "@/i18n/pages/magaza";
import { PRICE_WORD } from "@/i18n/pages/magaza-brands";
import { KODLARI_UI, kodlariDetailMetaTitle } from "@/i18n/pages/magaza-kodlari";

// enkoder-kodlari/[seri] sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
// Kapsam: sayfa çevresi (breadcrumb, tablo başlıkları, buton, durum) çevrilir; seriye özel LEGEND
// (7 seri, kod şeması açıklaması), s.note ve s.cols dinamik sütun başlıkları ÜRÜNE ÖZEL teknik
// içerik sayılır ve Türkçe kalır — bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md.

const WA = ORG.telephone.replace(/\D/g, "");

export function generateStaticParams() {
  return ENC_SERIES.map((s) => ({ seri: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; seri: string }> }): Promise<Metadata> {
  const { locale, seri } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const s = encSeries(seri);
  if (!s) return {};
  const label = encLabel(s);
  const url = `/${loc}/magaza/enkoder-kodlari/${s.slug}`;
  const first = String(s.codes[0][0]);
  const last = String(s.codes[s.codes.length - 1][0]);
  const title = kodlariDetailMetaTitle(label, s.codes.length, loc);
  const description = `Autonics ${label}: ${orderCodeCount(s.codes.length, loc)}, ${first} … ${last}. ${REGION_LINE[loc]}`;
  return {
    title,
    description,
    keywords: [`Autonics ${s.key}`, `${s.key} encoder`, `${s.key} ${PRICE_WORD[loc]}`, ...s.codes.filter((c) => c[1] === 0).slice(0, 12).map((c) => String(c[0]))],
    alternates: { canonical: url, languages: hreflangAlternates(`/magaza/enkoder-kodlari/${s.slug}`) },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title, description, images: s.img ? [{ url: `/magaza/${s.img}` }] : undefined },
  };
}

export default async function LocaleEnkoderSeriKodPage({ params }: { params: Promise<{ locale: string; seri: string }> }) {
  const { locale, seri } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const s = encSeries(seri);
  if (!s) notFound();
  const u = MAGAZA_UI[loc];
  const cu = CODE_LISTS_UI[loc];
  const ku = KODLARI_UI[loc];
  const label = encLabel(s);
  const productHref = `/magaza/${encProductSlug(s)}`;
  const disc = s.codes.filter((c) => c[1] === 1).length;
  const tableId = `kodlar-${s.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Autonics ${label}`,
      url: `${SITE}/${loc}/magaza/enkoder-kodlari/${s.slug}`,
      inLanguage: loc,
      isPartOf: { "@id": `${SITE}/#org` },
      about: { "@type": "Product", name: `Autonics ${label}`, brand: { "@type": "Brand", name: "Autonics" }, url: `${SITE}${productHref}` },
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: cu.enkoder.label, path: `/${loc}/magaza/enkoder-kodlari` },
      { name: label, path: `/${loc}/magaza/enkoder-kodlari/${s.slug}` },
    ]),
  ];
  const others = ENC_SERIES.filter((x) => x.group[0] === s.group[0] && x.slug !== s.slug);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={u.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{u.crumbHome}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza`}>{u.crumbStore}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza/enkoder-kodlari`}>{cu.enkoder.label}</Link> <span aria-hidden="true">/</span> <span>{label}</span>
      </nav>
      <div className="product-layout" style={{ alignItems: "start" }}>
        {s.img && s.imgSize && (
          <div className="store-visual product-visual">
            <Image src={`/magaza/${s.img}`} alt={`Autonics ${label} ${lcFirst(s.title)}`} fill sizes="560px" style={{ objectFit: "contain" }} priority />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="eyebrow">{s.group[1]}</div>
          <h1 style={{ fontWeight: 800, fontSize: 36, lineHeight: 1.08 }}>Autonics {label}</h1>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            {s.note} {orderCodeCount(s.codes.length, loc)}
            {disc ? ` (${disc} ${ku.discontinued.toLowerCase()})` : ""}.
          </p>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE[loc]}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={productHref} className="btn btn-primary">
              {ku.seriesAndSpecTable(label)}
            </Link>
          </div>
        </div>
      </div>

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
                const subject = encodeURIComponent(ku.requestForCode(code));
                const wa = encodeURIComponent(ku.waMessage(code));
                return (
                  <tr key={code} id={code}>
                    <th scope="row">{code}</th>
                    {row.slice(2).map((v, i) => (
                      <td key={s.cols[i]}>{String(v)}</td>
                    ))}
                    <td className={off ? "enc-status-off" : undefined}>{off ? ku.discontinued : ku.inProduction}</td>
                    <td className="dpu-actions">
                      <a href={`mailto:${ORG.email}?subject=${subject}`}>{ku.email}</a> ·{" "}
                      <a href={`https://wa.me/${WA}?text=${wa}`} target="_blank" rel="noopener noreferrer">
                        {ku.whatsapp}
                      </a>
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
        <nav aria-label={ku.otherSeriesSameGroupAria} className="store-nav">
          <span className="store-nav-cat" style={{ minWidth: 0 }}>
            {s.group[1]}:
          </span>
          {others.map((o) => (
            <Link key={o.slug} href={`/${loc}/magaza/enkoder-kodlari/${o.slug}`} className="store-chip">
              {encLabel(o)} <span>{o.codes.length}</span>
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
