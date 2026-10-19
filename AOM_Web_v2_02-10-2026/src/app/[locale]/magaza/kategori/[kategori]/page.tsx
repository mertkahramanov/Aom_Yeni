import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoreCard from "@/components/StoreCard";
import { categoryBySlug, fullName, seriesSlug, storeCategories } from "@/data/magaza";
import { ENC_TOTAL } from "@/data/enkoder";
import { KONTROL_KOD_TOTAL } from "@/data/kontrol";
import { breadcrumbJsonLd, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { ANKARA_REGION_SHORT, REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, CATEGORY_PAGE_UI, CODE_LISTS_UI, modelCount, seriesCount, codeCount, seeAllModelsLabel } from "@/i18n/pages/magaza";
import { translateCategoryTitle } from "@/i18n/pages/magaza-categories";

// /magaza/kategori/[kategori] sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
// Kapsam kararı (Mert, bu oturumda): arayüz + kategori adları çevrildi. Kategoriye özel uzun SEO
// metni (src/data/magaza.ts CATEGORY_INFO — 15 elle yazılmış + ~52 şablonla üretilen kategori)
// henüz çevrilmedi; bunun yerine kategori başlığından türeyen kısa, genel bir açıklama kullanılır
// (bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md). Ürün kartları (StoreCard) TR ürün verisini
// olduğu gibi gösterir — ürün adı/özellik/fiyat metni henüz çevrilmedi.
type CodeListEntry = { href: string; label: string; total: number; text: string };

function codeListFor(id: string, loc: Locale): CodeListEntry | undefined {
  const u = CODE_LISTS_UI[loc];
  if (id === "tristorlu-guc-kontrol") return { href: "/magaza/dpu-kodlari", total: 840, ...u.dpu };
  if (id === "sicaklik-kontrol-cihazlari" || id === "dijital-panel-metreler") return { href: "/magaza/kontrol-kodlari", total: KONTROL_KOD_TOTAL, ...u.kontrol };
  if (id === "enkoderler") return { href: "/magaza/enkoder-kodlari", total: ENC_TOTAL, ...u.enkoder };
  return undefined;
}

export function generateStaticParams() {
  return storeCategories().map((c) => ({ kategori: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; kategori: string }> }): Promise<Metadata> {
  const { locale, kategori } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const c = categoryBySlug(kategori);
  if (!c) return {};
  const title = translateCategoryTitle(c.title, loc);
  const description = `${CATEGORY_PAGE_UI[loc].genericIntro(title)} ${REGION_LINE[loc]}`;
  const url = `${SITE}/${loc}/magaza/kategori/${c.id}`;
  return {
    title: `${title} | AOM`,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title: `${title} | AOM`, description },
  };
}

export default async function LocaleKategoriPage({ params }: { params: Promise<{ locale: string; kategori: string }> }) {
  const { locale, kategori } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const c = categoryBySlug(kategori);
  if (!c) notFound();
  const u = MAGAZA_UI[loc];
  const cp = CATEGORY_PAGE_UI[loc];
  const title = translateCategoryTitle(c.title, loc);
  const codeList = codeListFor(c.id, loc);
  const items = c.groups.flatMap((g) => g.items);
  const url = `${SITE}/${loc}/magaza/kategori/${c.id}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      url,
      inLanguage: loc,
      description: cp.genericIntro(title),
      isPartOf: { "@id": `${SITE}/#org` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: items.length,
        itemListElement: items.slice(0, 100).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/magaza/${p.slug}`, name: fullName(p) })),
      },
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}/magaza` },
      { name: title, path: `/${loc}/magaza/kategori/${c.id}` },
    ]),
  ];

  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={u.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{u.crumbHome}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}/magaza`}>{u.crumbStore}</Link> <span aria-hidden="true">/</span> <span>{title}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <div className="eyebrow">
          {u.crumbStore} · {ANKARA_REGION_SHORT[loc]}
        </div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>{title}</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          {cp.genericIntro(title)} {REGION_LINE[loc]}
        </p>
        <p className="caption" style={{ margin: 0 }}>
          {cp.vatCaption}
        </p>
      </div>
      {codeList && (
        <div className="cat-codes-box">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <strong style={{ fontFamily: "var(--font-display), sans-serif", fontSize: 20 }}>
              {cp.codeListTitle} <span className="store-count">{codeCount(codeList.total, loc)}</span>
            </strong>
            <p style={{ color: "var(--ink-muted)" }}>{codeList.text}</p>
          </div>
          <Link href={codeList.href} className="btn btn-outline">
            {codeList.label}
          </Link>
        </div>
      )}
      <nav aria-label={title} className="store-nav">
        {c.groups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="store-chip">
            {g.title.replace(/^Autonics /, "")} <span>{g.items.length}</span>
          </a>
        ))}
      </nav>
      {c.groups.map((g) => (
        <div key={g.id} id={g.id} className="store-group">
          <h2 className="store-group-title">
            {g.items[0].series ? (
              <Link href={`/magaza/seri/${seriesSlug(g.items[0].series)}`} className="store-cat-link">
                {g.title}
              </Link>
            ) : (
              g.title
            )}{" "}
            <span className="store-count">{g.items[0].codePage ? seriesCount(g.items.length, loc) : modelCount(g.items.length, loc)}</span>
          </h2>
          <ul className="store-grid">
            {(g.items[0].series ? g.items.slice(0, 9) : g.items).map((p) => (
              <li key={p.slug}>
                <StoreCard p={p} />
              </li>
            ))}
          </ul>
          {g.items.length > 9 && g.items[0].series && (
            <Link href={`/magaza/seri/${seriesSlug(g.items[0].series)}`} className="btn btn-outline" style={{ alignSelf: "flex-start" }}>
              {seeAllModelsLabel(g.title.replace(/^Autonics /, "").split(" · ")[0], g.items.length, loc)}
            </Link>
          )}
        </div>
      ))}
    </section>
  );
}
