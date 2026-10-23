import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AI_MOTOR_KOD_SERIES, AI_MOTOR_KOD_TOTAL } from "@/data/autonics-kuyruk-ai-motor_23-10-2026";
import { breadcrumbJsonLd, hreflangAlternates, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, codeCount } from "@/i18n/pages/magaza";
import { AI_MOTOR_PAGE_UI } from "@/i18n/pages/magaza-ai-motor-kodlari";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const u = AI_MOTOR_PAGE_UI[loc];
  const url = `/${loc}/magaza/kapali-cevrim-adim-motor-kodlari`;
  const title = `Autonics ${u.label} | AOM`;
  const description = `${u.text} ${codeCount(AI_MOTOR_KOD_TOTAL, loc)}. ${REGION_LINE[loc]}`;
  return {
    title,
    description,
    keywords: ["Autonics AiS", "Autonics AiC", "Autonics AiCA", "closed loop stepper motor", "Autonics Ai series"],
    alternates: { canonical: url, languages: hreflangAlternates("/magaza/kapali-cevrim-adim-motor-kodlari") },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title, description },
  };
}

export default async function LocaleAiMotorKodlariPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const u = MAGAZA_UI[loc];
  const pu = AI_MOTOR_PAGE_UI[loc];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Autonics ${pu.label}`,
      url: `${SITE}/${loc}/magaza/kapali-cevrim-adim-motor-kodlari`,
      inLanguage: loc,
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: AI_MOTOR_KOD_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${s.key}`, url: `${SITE}/magaza/kapali-cevrim-adim-motor-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: pu.label, path: `/${loc}/magaza/kapali-cevrim-adim-motor-kodlari` },
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
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>
          {AI_MOTOR_KOD_SERIES[0]?.cat} <span className="store-count">{codeCount(AI_MOTOR_KOD_TOTAL, loc)}</span>
        </h2>
        <ul className="enc-series-list">
          {AI_MOTOR_KOD_SERIES.map((s) => (
            <li key={s.slug}>
              <Link href={`/${loc}/magaza/kapali-cevrim-adim-motor-kodlari/${s.slug}`} className="dpu-group">
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
    </section>
  );
}
