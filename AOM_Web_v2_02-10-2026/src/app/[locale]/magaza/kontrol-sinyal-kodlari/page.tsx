import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KONTROL_SINYAL_KOD_SERIES, KONTROL_SINYAL_KOD_TOTAL } from "@/data/autonics-kontrol-sinyal_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, codeCount } from "@/i18n/pages/magaza";
import { translateMainGroupTitle } from "@/i18n/pages/magaza-categories";
import { SUPPLY_WORD } from "@/i18n/pages/magaza-kodlari";
import { KONTROL_SINYAL_PAGE_UI, translateKontrolSinyalCategoryTitle } from "@/i18n/pages/magaza-kontrol-sinyal-kodlari";

const GROUPS = [...new Set(KONTROL_SINYAL_KOD_SERIES.map((s) => s.cat))];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const u = KONTROL_SINYAL_PAGE_UI[loc];
  const url = `/${loc}/magaza/kontrol-sinyal-kodlari`;
  const title = `Autonics ${u.label} | AOM`;
  const description = `${u.text} ${codeCount(KONTROL_SINYAL_KOD_TOTAL, loc)}. ${REGION_LINE[loc]}`;
  return {
    title,
    description,
    keywords: ["Autonics S2PR", "Autonics S2SR", "Autonics S3SF", "Autonics pushbutton switch", "Autonics selector switch", "Autonics pilot light"],
    alternates: { canonical: url, languages: hreflangAlternates("/magaza/kontrol-sinyal-kodlari") },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title, description },
  };
}

export default async function LocaleKontrolSinyalKodlariPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const u = MAGAZA_UI[loc];
  const pu = KONTROL_SINYAL_PAGE_UI[loc];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Autonics ${pu.label}`,
      url: `${SITE}/${loc}/magaza/kontrol-sinyal-kodlari`,
      inLanguage: loc,
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: KONTROL_SINYAL_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key}`, url: `${SITE}/magaza/kontrol-sinyal-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: pu.label, path: `/${loc}/magaza/kontrol-sinyal-kodlari` },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={u.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{u.crumbHome}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza`}>{u.crumbStore}</Link> <span aria-hidden="true">/</span> <span>{pu.label}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">
          {translateMainGroupTitle("Kontrol cihazları", loc)} · {SUPPLY_WORD[loc]}
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics {pu.label}</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{pu.text}</p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE[loc]}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = KONTROL_SINYAL_KOD_SERIES.filter((s) => s.cat === g);
        const title = translateKontrolSinyalCategoryTitle(g, loc);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {title} <span className="store-count">{codeCount(ss.reduce((n, s) => n + s.codes.length, 0), loc)}</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${loc}/magaza/kontrol-sinyal-kodlari/${s.slug}`} className="dpu-group">
                    <strong>{s.key}</strong>
                    <span>{s.title}</span>
                    <span className="store-count" style={{ marginLeft: 0 }}>
                      {codeCount(s.codes.length, loc)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
