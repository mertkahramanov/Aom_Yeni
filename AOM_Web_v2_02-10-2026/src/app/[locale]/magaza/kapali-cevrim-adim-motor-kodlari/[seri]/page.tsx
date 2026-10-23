import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeFilter from "@/components/CodeFilter";
import {
  AI_MOTOR_KOD_SERIES,
  AI_MOTOR_PRICES,
  aiMotorKodSeries,
  aiMotorSlug,
} from "@/data/autonics-kuyruk-ai-motor_23-10-2026";
import { priceInfo, products, type Product } from "@/data/magaza";
import { breadcrumbJsonLd, hreflangAlternates, ORG, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, orderCodeCount } from "@/i18n/pages/magaza";
import { PRICE_WORD } from "@/i18n/pages/magaza-brands";
import { KODLARI_UI, kodlariDetailMetaTitle } from "@/i18n/pages/magaza-kodlari";
import { AI_MOTOR_PAGE_UI } from "@/i18n/pages/magaza-ai-motor-kodlari";

const lc = (t: string) => (/^[A-ZÇĞİÖŞÜ][a-zçğıöşü]/.test(t) ? t[0].toLocaleLowerCase("tr-TR") + t.slice(1) : t);
const WA = ORG.telephone.replace(/\D/g, "");

// kapali-cevrim-adim-motor-kodlari/[seri] sayfasının çok dilli karşılığı (23-10-2026). Türkçe sayfa
// değişmedi. Kapsam: sayfa çevresi çevrilir; s.desc ve s.common seriye özel teknik içerik olarak
// Türkçe kalır (diğer kod sayfalarıyla tutarlı).

export function generateStaticParams() {
  return AI_MOTOR_KOD_SERIES.map((s) => ({ seri: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; seri: string }> }): Promise<Metadata> {
  const { locale, seri } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const s = aiMotorKodSeries(seri);
  if (!s) return {};
  const url = `/${loc}/magaza/kapali-cevrim-adim-motor-kodlari/${s.slug}`;
  const title = kodlariDetailMetaTitle(s.key, s.codes.length, loc);
  const description = `Autonics ${s.key}: ${lc(s.title)}. ${orderCodeCount(s.codes.length, loc)}, ${s.codes[0][0]} … ${s.codes[s.codes.length - 1][0]}. ${REGION_LINE[loc]}`;
  return {
    title,
    description,
    keywords: [`Autonics ${s.key}`, `${s.key} ${PRICE_WORD[loc]}`, ...s.codes.slice(0, 12).map((c) => String(c[0]))],
    alternates: { canonical: url, languages: hreflangAlternates(`/magaza/kapali-cevrim-adim-motor-kodlari/${s.slug}`) },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title, description },
  };
}

export default async function LocaleAiMotorKodSeriPage({ params }: { params: Promise<{ locale: string; seri: string }> }) {
  const { locale, seri } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const s = aiMotorKodSeries(seri);
  if (!s) notFound();
  const u = MAGAZA_UI[loc];
  const ku = KODLARI_UI[loc];
  const pu = AI_MOTOR_PAGE_UI[loc];
  const productSlugs = new Set(products.map((p) => p.slug));
  const tableId = `kodlar-${s.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Autonics ${s.key}`,
      url: `${SITE}/${loc}/magaza/kapali-cevrim-adim-motor-kodlari/${s.slug}`,
      inLanguage: loc,
      isPartOf: { "@id": `${SITE}/#org` },
      about: { "@type": "Thing", name: `Autonics ${s.key} ${s.title}` },
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: pu.label, path: `/${loc}/magaza/kapali-cevrim-adim-motor-kodlari` },
      { name: s.key, path: `/${loc}/magaza/kapali-cevrim-adim-motor-kodlari/${s.slug}` },
    ]),
  ];
  const others = AI_MOTOR_KOD_SERIES.filter((x) => x.slug !== s.slug);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={u.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{u.crumbHome}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza`}>{u.crumbStore}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza/kapali-cevrim-adim-motor-kodlari`}>{pu.label}</Link> <span aria-hidden="true">/</span> <span>{s.key}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">{s.cat}</div>
        <h1 style={{ fontWeight: 800, fontSize: 36, lineHeight: 1.08 }}>Autonics {s.key}</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{s.desc}</p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{orderCodeCount(s.codes.length, loc)}.</p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{pu.support}</p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE[loc]}</p>
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
                <th scope="col">{ku.price}</th>
                <th scope="col">{ku.quote}</th>
              </tr>
            </thead>
            <tbody>
              {s.codes.map((row) => {
                const code = String(row[0]);
                const ps = aiMotorSlug(code);
                const isProduct = productSlugs.has(ps);
                const subject = encodeURIComponent(ku.requestForCode(code));
                const wa = encodeURIComponent(ku.waMessage(code));
                const pi = AI_MOTOR_PRICES[code] ? priceInfo({ price: AI_MOTOR_PRICES[code] } as Product) : null;
                return (
                  <tr key={code} id={code}>
                    <th scope="row">{isProduct ? <Link href={`/${loc}/magaza/${ps}`}>{code}</Link> : code}</th>
                    {row.slice(2).map((v, i) => (
                      <td key={s.cols[i]}>{String(v)}</td>
                    ))}
                    <td className="store-price-wrap" style={{ margin: 0 }}>
                      {pi ? (
                        <>
                          {pi.discount && <s className="store-price-list">{pi.list}</s>}
                          <span className="store-price" style={{ marginTop: 0 }}>{pi.net}</span>
                          {pi.discount && <span className="store-discount">{pi.discount}</span>}
                        </>
                      ) : (
                        ku.priceOnRequest
                      )}
                    </td>
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
          {pu.sourceCaption}
        </p>
      </div>
      {others.length > 0 && (
        <nav aria-label={ku.otherSeriesSameCategoryAria} className="store-nav">
          <span className="store-nav-cat" style={{ minWidth: 0 }}>
            {s.cat}:
          </span>
          {others.map((o) => (
            <Link key={o.slug} href={`/${loc}/magaza/kapali-cevrim-adim-motor-kodlari/${o.slug}`} className="store-chip">
              {o.key} <span>{o.codes.length}</span>
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
