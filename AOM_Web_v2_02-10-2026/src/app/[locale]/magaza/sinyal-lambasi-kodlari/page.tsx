import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SINYAL_LAMBASI_KOD_SERIES, SINYAL_LAMBASI_KOD_TOTAL } from "@/data/autonics-kuyruk-sinyal-lambasi_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, codeCount } from "@/i18n/pages/magaza";
import { SINYAL_LAMBASI_PAGE_UI, translateSinyalLambasiCategoryTitle } from "@/i18n/pages/magaza-sinyal-lambasi-kodlari";

const GROUPS = [...new Set(SINYAL_LAMBASI_KOD_SERIES.map((s) => s.cat))];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const u = SINYAL_LAMBASI_PAGE_UI[loc];
  const url = `/${loc}/magaza/sinyal-lambasi-kodlari`;
  const title = `Autonics ${u.label} | AOM`;
  const description = `${u.text} ${codeCount(SINYAL_LAMBASI_KOD_TOTAL, loc)}. ${REGION_LINE[loc]}`;
  return {
    title,
    description,
    keywords: ["Autonics MT4B", "Autonics PME", "Autonics ASG", "Autonics tower light", "Autonics beacon", "Autonics signal lamp"],
    alternates: { canonical: url, languages: hreflangAlternates("/magaza/sinyal-lambasi-kodlari") },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title, description },
  };
}

export default async function LocaleSinyalLambasiKodlariPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const u = MAGAZA_UI[loc];
  const pu = SINYAL_LAMBASI_PAGE_UI[loc];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Autonics ${pu.label}`,
      url: `${SITE}/${loc}/magaza/sinyal-lambasi-kodlari`,
      inLanguage: loc,
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: SINYAL_LAMBASI_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key}`, url: `${SITE}/magaza/sinyal-lambasi-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: pu.label, path: `/${loc}/magaza/sinyal-lambasi-kodlari` },
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
        <div className="eyebrow">{pu.eyebrow}</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics {pu.label}</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{pu.text}</p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE[loc]}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = SINYAL_LAMBASI_KOD_SERIES.filter((s) => s.cat === g);
        const title = translateSinyalLambasiCategoryTitle(g, loc);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {title} <span className="store-count">{codeCount(ss.reduce((n, s) => n + s.codes.length, 0), loc)}</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${loc}/magaza/sinyal-lambasi-kodlari/${s.slug}`} className="dpu-group">
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
