import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KONTROL_KOD_SERIES, KONTROL_KOD_TOTAL } from "@/data/kontrol";
import { breadcrumbJsonLd, hreflangAlternates, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, CODE_LISTS_UI, codeCount } from "@/i18n/pages/magaza";
import { translateCategoryTitle, translateMainGroupTitle } from "@/i18n/pages/magaza-categories";
import { PRICE_WORD } from "@/i18n/pages/magaza-brands";
import { SUPPLY_WORD, KODLARI_UI } from "@/i18n/pages/magaza-kodlari";

const GROUPS = [...new Set(KONTROL_KOD_SERIES.map((s) => s.cat))].sort((a, b) => b.localeCompare(a, "tr"));

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const u = CODE_LISTS_UI[loc];
  const url = `/${loc}/magaza/kontrol-kodlari`;
  const title = `Autonics ${u.kontrol.label} | AOM`;
  const description = `${u.kontrol.text} ${codeCount(KONTROL_KOD_TOTAL, loc)}. ${REGION_LINE[loc]}`;
  return {
    title,
    description,
    keywords: ["Autonics TX", "Autonics TC4S", "Autonics TCN4S", "Autonics TA", "Autonics MT4W", `temperature controller ${PRICE_WORD[loc]}`],
    alternates: { canonical: url, languages: hreflangAlternates("/magaza/kontrol-kodlari") },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title, description },
  };
}

export default async function LocaleKontrolKodlariPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const u = MAGAZA_UI[loc];
  const cu = CODE_LISTS_UI[loc];
  const ku = KODLARI_UI[loc];
  const sicaklikTitle = translateCategoryTitle("Sıcaklık kontrol cihazları", loc);
  const panelMetreTitle = translateCategoryTitle("Dijital panel metreler", loc);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Autonics ${cu.kontrol.label}`,
      url: `${SITE}/${loc}/magaza/kontrol-kodlari`,
      inLanguage: loc,
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: KONTROL_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key}`, url: `${SITE}/magaza/kontrol-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: cu.kontrol.label, path: `/${loc}/magaza/kontrol-kodlari` },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={u.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{u.crumbHome}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza`}>{u.crumbStore}</Link> <span aria-hidden="true">/</span> <span>{cu.kontrol.label}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">
          {translateMainGroupTitle("Kontrol cihazları", loc)} · {SUPPLY_WORD[loc]}
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics {cu.kontrol.label}</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          {cu.kontrol.text} <Link href={`/${loc}/magaza/kategori/sicaklik-kontrol-cihazlari`}>{sicaklikTitle}</Link>,{" "}
          <Link href={`/${loc}/magaza/kategori/dijital-panel-metreler`}>{panelMetreTitle}</Link>.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE[loc]}</p>
      </div>
      {GROUPS.map((g) => {
        const ss = KONTROL_KOD_SERIES.filter((s) => s.cat === g);
        const title = translateCategoryTitle(g, loc);
        return (
          <div key={g} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 24 }}>
              {title} <span className="store-count">{codeCount(ss.reduce((n, s) => n + s.codes.length, 0), loc)}</span>
            </h2>
            <ul className="enc-series-list">
              {ss.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${loc}/magaza/kontrol-kodlari/${s.slug}`} className="dpu-group">
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
