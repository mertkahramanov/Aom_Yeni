import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ENC_GROUPS, ENC_SERIES, ENC_TOTAL, encLabel } from "@/data/enkoder";
import { breadcrumbJsonLd, hreflangAlternates, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, CODE_LISTS_UI, codeCount, seriesCount } from "@/i18n/pages/magaza";
import { translateCategoryTitle } from "@/i18n/pages/magaza-categories";
import { PRICE_WORD } from "@/i18n/pages/magaza-brands";
import { SUPPLY_WORD, KODLARI_UI, translateEncGroupTitle, ENC_INCREMENTAL_LEGEND, ENC_ABSOLUTE_LEGEND } from "@/i18n/pages/magaza-kodlari";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const u = CODE_LISTS_UI[loc];
  const url = `/${loc}/magaza/enkoder-kodlari`;
  const title = `Autonics ${u.enkoder.label} | AOM`;
  const description = `${u.enkoder.text} ${codeCount(ENC_TOTAL, loc)}, ${seriesCount(34, loc)}. ${REGION_LINE[loc]}`;
  return {
    title,
    description,
    keywords: ["Autonics encoder", `encoder ${PRICE_WORD[loc]}`, "Autonics E40S", "Autonics E50S", "Autonics E58", "Autonics EP50S"],
    alternates: { canonical: url, languages: hreflangAlternates("/magaza/enkoder-kodlari") },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title, description },
  };
}

export default async function LocaleEnkoderKodlariPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const u = MAGAZA_UI[loc];
  const cu = CODE_LISTS_UI[loc];
  const ku = KODLARI_UI[loc];
  const categoryTitle = translateCategoryTitle("Enkoderler", loc);
  const inc = ENC_INCREMENTAL_LEGEND[loc];
  const abs = ENC_ABSOLUTE_LEGEND[loc];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Autonics ${cu.enkoder.label}`,
      url: `${SITE}/${loc}/magaza/enkoder-kodlari`,
      inLanguage: loc,
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: ENC_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${encLabel(s)}`, url: `${SITE}/magaza/enkoder-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: categoryTitle, path: `/${loc}/magaza/kategori/enkoderler` },
      { name: cu.enkoder.label, path: `/${loc}/magaza/enkoder-kodlari` },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={u.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{u.crumbHome}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza`}>{u.crumbStore}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza/kategori/enkoderler`}>{categoryTitle}</Link> <span aria-hidden="true">/</span> <span>{cu.enkoder.label}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">
          {categoryTitle} · {SUPPLY_WORD[loc]}
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics {cu.enkoder.label}</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          {cu.enkoder.text}{" "}
          <Link href={`/${loc}/magaza/kategori/enkoderler`}>{categoryTitle}</Link>.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE[loc]}</p>
      </div>

      {ENC_GROUPS.map((g) => (
        <div key={g.id} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 className="h2" style={{ fontSize: 24 }}>
            {translateEncGroupTitle(g.id, g.title, loc)} <span className="store-count">{codeCount(g.series.reduce((n, s) => n + s.codes.length, 0), loc)}</span>
          </h2>
          <ul className="enc-series-list">
            {g.series.map((s) => (
              <li key={s.slug}>
                <Link href={`/${loc}/magaza/enkoder-kodlari/${s.slug}`} className="dpu-group">
                  <strong>{encLabel(s)}</strong>
                  <span>{s.title}</span>
                  <span className="store-count" style={{ marginLeft: 0 }}>
                    {codeCount(s.codes.length, loc)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 920 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          {ku.incrementalHowToRead}
        </h2>
        <p style={{ margin: 0 }}>
          <code className="dpu-code-sample">{inc.sample}</code>
        </p>
        <table className="spec-table">
          <tbody>
            {inc.rows.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="h2" style={{ fontSize: 26, marginTop: 12 }}>
          {ku.absoluteHowToRead}
        </h2>
        <p style={{ margin: 0 }}>
          <code className="dpu-code-sample">{abs.sample}</code>
        </p>
        <table className="spec-table">
          <tbody>
            {abs.rows.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="caption" style={{ margin: 0 }}>{ku.sourceCaption}</p>
      </div>
    </section>
  );
}
