import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DPU_CODES, DPU_GROUPS, DPU_OPTION } from "@/data/dpuCodes";
import { breadcrumbJsonLd, hreflangAlternates, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, CODE_LISTS_UI, codeCount } from "@/i18n/pages/magaza";
import { translateCategoryTitle } from "@/i18n/pages/magaza-categories";
import { PRICE_WORD } from "@/i18n/pages/magaza-brands";
import { SUPPLY_WORD, KODLARI_UI, DPU_OPTION_TR, DPU_LEGEND } from "@/i18n/pages/magaza-kodlari";

// /magaza/dpu-kodlari sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
// bkz. src/i18n/pages/magaza-kodlari.ts ve claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md.

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const u = CODE_LISTS_UI[loc];
  const n = DPU_CODES.length;
  const url = `/${loc}/magaza/dpu-kodlari`;
  const title = `Autonics DPU ${u.dpu.label} | AOM`;
  const description = `${u.dpu.text} ${codeCount(n, loc)}. ${REGION_LINE[loc]}`;
  return {
    title,
    description,
    keywords: ["Autonics DPU", `DPU ${PRICE_WORD[loc]}`, "DPU34", "DPU32", "DPU14", "DPU12"],
    alternates: { canonical: url, languages: hreflangAlternates("/magaza/dpu-kodlari") },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title, description },
  };
}

export default async function LocaleDpuKodlariPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const u = MAGAZA_UI[loc];
  const cu = CODE_LISTS_UI[loc];
  const ku = KODLARI_UI[loc];
  const categoryTitle = translateCategoryTitle("Tristörlü güç kontrol", loc);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Autonics DPU ${cu.dpu.label}`,
      url: `${SITE}/${loc}/magaza/dpu-kodlari`,
      inLanguage: loc,
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: DPU_GROUPS.map((g) => ({ "@type": "WebPage", name: `Autonics ${g.prefix}`, url: `${SITE}/magaza/dpu-kodlari/${g.id}` })),
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: categoryTitle, path: `/${loc}/magaza/kategori/tristorlu-guc-kontrol` },
      { name: cu.dpu.label, path: `/${loc}/magaza/dpu-kodlari` },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={u.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{u.crumbHome}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza`}>{u.crumbStore}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza/kategori/tristorlu-guc-kontrol`}>{categoryTitle}</Link> <span aria-hidden="true">/</span> <span>{cu.dpu.label}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <div className="eyebrow">
          {categoryTitle} · {SUPPLY_WORD[loc]}
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics {cu.dpu.label}</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{cu.dpu.text}</p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE[loc]}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          {ku.byCodeGroupsHeading}
        </h2>
        <ul className="dpu-groups">
          {DPU_GROUPS.map((g) => (
            <li key={g.id}>
              <Link href={`/${loc}/magaza/dpu-kodlari/${g.id}`} className="dpu-group">
                <strong>{g.prefix}</strong>
                <span>{g.label}</span>
                <span className="store-count" style={{ marginLeft: 0 }}>
                  {codeCount(g.codes.length, loc)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 900 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          {ku.howToReadHeading("")}
        </h2>
        <p style={{ margin: 0 }}>
          <code className="dpu-code-sample">DPU 3 4 B - 150 R (-A)</code>
        </p>
        <table className="spec-table">
          <tbody>
            {DPU_LEGEND[loc].map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">{ku.option}</th>
              <td>{Object.entries(DPU_OPTION).map(([k]) => `${k} = ${DPU_OPTION_TR[loc][k]}`).join(" · ")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
