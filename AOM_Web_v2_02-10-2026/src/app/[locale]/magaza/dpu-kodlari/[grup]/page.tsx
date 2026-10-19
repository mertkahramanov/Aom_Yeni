import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DPU_GROUPS, DPU_OPTION, dpuGroup } from "@/data/dpuCodes";
import { products } from "@/data/magaza";
import { breadcrumbJsonLd, hreflangAlternates, ORG, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, CODE_LISTS_UI, codeCount } from "@/i18n/pages/magaza";
import { PRICE_WORD } from "@/i18n/pages/magaza-brands";
import { KODLARI_UI, DPU_OPTION_TR, dpuGroupLabel, kodlariDetailMetaTitle } from "@/i18n/pages/magaza-kodlari";

const WA = ORG.telephone.replace(/\D/g, "");

export function generateStaticParams() {
  return DPU_GROUPS.map((g) => ({ grup: g.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; grup: string }> }): Promise<Metadata> {
  const { locale, grup } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const g = dpuGroup(grup);
  if (!g) return {};
  const url = `/${loc}/magaza/dpu-kodlari/${g.id}`;
  const label = dpuGroupLabel(g.phase as 1 | 3, g.voltage, loc);
  const title = kodlariDetailMetaTitle(g.prefix, g.codes.length, loc);
  const description = `Autonics ${g.prefix} (${label}): ${codeCount(g.codes.length, loc)}, 25–600 A, ${g.codes[0].code} … ${g.codes[g.codes.length - 1].code}. ${REGION_LINE[loc]}`;
  return {
    title,
    description,
    keywords: [`Autonics ${g.prefix}`, `${g.prefix} ${PRICE_WORD[loc]}`, ...g.codes.filter((c) => !c.suffixA).slice(0, 12).map((c) => c.code)],
    alternates: { canonical: url, languages: hreflangAlternates(`/magaza/dpu-kodlari/${g.id}`) },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title, description },
  };
}

export default async function LocaleDpuGrupPage({ params }: { params: Promise<{ locale: string; grup: string }> }) {
  const { locale, grup } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const g = dpuGroup(grup);
  if (!g) notFound();
  const u = MAGAZA_UI[loc];
  const cu = CODE_LISTS_UI[loc];
  const ku = KODLARI_UI[loc];
  const label = dpuGroupLabel(g.phase as 1 | 3, g.voltage, loc);
  const productBy = new Map(products.map((p) => [p.model, p.slug]));
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Autonics ${g.prefix}`,
      url: `${SITE}/${loc}/magaza/dpu-kodlari/${g.id}`,
      inLanguage: loc,
      isPartOf: { "@id": `${SITE}/#org` },
      about: { "@type": "Thing", name: `Autonics ${g.prefix}` },
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: cu.dpu.label, path: `/${loc}/magaza/dpu-kodlari` },
      { name: g.prefix, path: `/${loc}/magaza/dpu-kodlari/${g.id}` },
    ]),
  ];
  const others = DPU_GROUPS.filter((x) => x.id !== g.id);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={u.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{u.crumbHome}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza`}>{u.crumbStore}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza/dpu-kodlari`}>{cu.dpu.label}</Link> <span aria-hidden="true">/</span> <span>{g.prefix}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Autonics DPU · {label}</div>
        <h1 style={{ fontWeight: 800, fontSize: 38, lineHeight: 1.08 }}>
          Autonics {g.prefix}: {label}
        </h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          {g.prefix}: {codeCount(g.codes.length, loc)}, {label}, 25–600 A, A / B / C / D {ku.body.toLowerCase()}.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE[loc]}</p>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="spec-table series-table dpu-table">
          <thead>
            <tr>
              <th scope="col">{ku.modelCode}</th>
              <th scope="col">{ku.amp}</th>
              <th scope="col">{ku.body}</th>
              <th scope="col">{ku.option}</th>
              <th scope="col">{ku.quote}</th>
            </tr>
          </thead>
          <tbody>
            {g.codes.map((c) => {
              const slug = productBy.get(c.code);
              const subject = encodeURIComponent(ku.requestForCode(c.code));
              const wa = encodeURIComponent(ku.waMessage(c.code));
              return (
                <tr key={c.code} id={c.code}>
                  <th scope="row">{slug ? <Link href={`/${loc}/magaza/${slug}`}>{c.code}</Link> : c.code}</th>
                  <td>{c.current} A</td>
                  <td>{c.body}</td>
                  <td>
                    {DPU_OPTION_TR[loc][c.option]}
                    {c.suffixA ? " (-A)" : ""}
                  </td>
                  <td className="dpu-actions">
                    {slug ? (
                      <Link href={`/${loc}/magaza/${slug}`}>{ku.productPage}</Link>
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
      <nav aria-label={ku.otherGroupsLabel} className="store-nav">
        <span className="store-nav-cat" style={{ minWidth: 0 }}>
          {ku.otherGroupsLabel}
        </span>
        {others.map((o) => (
          <Link key={o.id} href={`/${loc}/magaza/dpu-kodlari/${o.id}`} className="store-chip">
            {o.prefix} · {dpuGroupLabel(o.phase as 1 | 3, o.voltage, loc)}
          </Link>
        ))}
      </nav>
    </section>
  );
}
