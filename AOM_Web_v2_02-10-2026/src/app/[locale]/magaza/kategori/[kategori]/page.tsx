import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoreCard from "@/components/StoreCard";
import { categoryBySlug, fullName, seriesSlug, storeCategories } from "@/data/magaza";
import { ENC_TOTAL } from "@/data/enkoder";
import { KONTROL_KOD_TOTAL } from "@/data/kontrol";
import { breadcrumbJsonLd, hreflangAlternates, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { ANKARA_REGION_SHORT, REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, CATEGORY_PAGE_UI, CODE_LISTS_UI, modelCount, seriesCount, codeCount, seeAllModelsLabel } from "@/i18n/pages/magaza";
import { translateCategoryTitle } from "@/i18n/pages/magaza-categories";
// Autonics yeni kod-tablosu kategorileri (23-10-2026, Mert onayı — bkz. claude/AUTONICS_FIYAT_LISTESI_YENI_KATEGORILER_23-10-2026.md)
// Not: bu yeni listelerin label/text metinleri henüz CODE_LISTS_UI'ye eklenmedi; diğer seriye özel
// içerik gibi (Option A kapsamı) şimdilik Türkçe gösterilir.
import { KONTROL_SINYAL_KOD_TOTAL } from "@/data/autonics-kontrol-sinyal_23-10-2026";
import { SINYAL_LAMBASI_KOD_TOTAL } from "@/data/autonics-kuyruk-sinyal-lambasi_23-10-2026";
import { BASINC_SENSOR_KOD_TOTAL } from "@/data/autonics-basinc-sensor_23-10-2026";
import { YAKINLIK_SENSOR_KOD_TOTAL } from "@/data/autonics-yakinlik-sensor_23-10-2026";
import { FOTOELEKTRIK_SENSOR_KOD_TOTAL } from "@/data/autonics-fotoelektrik-sensor_23-10-2026";
import { VISION_SENSOR_KOD_TOTAL } from "@/data/autonics-vision-sensor_23-10-2026";
import { GUVENLIK_SWITCH_KOD_TOTAL } from "@/data/autonics-guvenlik-switch_23-10-2026";
import { STEP_MOTOR_KOD_TOTAL } from "@/data/autonics-step-motor_23-10-2026";
import { AI_MOTOR_KOD_TOTAL } from "@/data/autonics-kuyruk-ai-motor_23-10-2026";
import { SINYAL_DONUSTURUCU_KOD_TOTAL } from "@/data/autonics-sinyal-donusturucu_23-10-2026";

// /magaza/kategori/[kategori] sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
// Kapsam kararı (Mert, bu oturumda): arayüz + kategori adları çevrildi. Kategoriye özel uzun SEO
// metni (src/data/magaza.ts CATEGORY_INFO — 15 elle yazılmış + ~52 şablonla üretilen kategori)
// henüz çevrilmedi; bunun yerine kategori başlığından türeyen kısa, genel bir açıklama kullanılır
// (bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md). Ürün kartları (StoreCard) TR ürün verisini
// olduğu gibi gösterir — ürün adı/özellik/fiyat metni henüz çevrilmedi.
type CodeListEntry = { href: string; label: string; total: number; text: string };

// 23-10-2026 eklendi (Mert onayı): yeni kategorilerin Türkçe label/text metni (henüz CODE_LISTS_UI'ye
// eklenmedi, bkz. yukarıdaki import notu).
const NEW_CODE_LISTS: Record<string, { href: string; label: string; total: number; text: string }[]> = {
  "sensor-kontrol-cihazlari": [
    { href: "/magaza/basinc-sensoru-kodlari", label: "Basınç sensörü model kodları", total: BASINC_SENSOR_KOD_TOTAL, text: "Autonics basınç sensörü/transmitteri ailelerinin sipariş kodları." },
    { href: "/magaza/sinyal-donusturucu-kodlari", label: "Sinyal dönüştürücü kodları", total: SINYAL_DONUSTURUCU_KOD_TOTAL, text: "HART sinyal transmitteri ve analog sinyal izolatörü sipariş kodları." },
  ],
  "svic-sensor-ve-butonlar": [
    { href: "/magaza/yakinlik-sensoru-kodlari", label: "Yakınlık (endüktif) sensörü kodları", total: YAKINLIK_SENSOR_KOD_TOTAL, text: "Endüktif yakınlık sensörü ailelerinin sipariş kodları." },
    { href: "/magaza/fotoelektrik-sensor-kodlari", label: "Fotoelektrik sensör kodları", total: FOTOELEKTRIK_SENSOR_KOD_TOTAL, text: "Fotoelektrik sensör ailelerinin sipariş kodları." },
    { href: "/magaza/vision-sensor-kodlari", label: "Vision sensör kodları", total: VISION_SENSOR_KOD_TOTAL, text: "Vision sensörü/kamera ailelerinin sipariş kodları." },
    { href: "/magaza/guvenlik-switch-kodlari", label: "Güvenlik switch kodları", total: GUVENLIK_SWITCH_KOD_TOTAL, text: "Güvenlik switchi ailelerinin sipariş kodları." },
  ],
  "step-ve-servo-motorlar-suruculer": [
    { href: "/magaza/step-motor-kodlari", label: "Step motor model kodları", total: STEP_MOTOR_KOD_TOTAL, text: "Açık çevrim Autonics step motor ailelerinin sipariş kodları." },
    { href: "/magaza/kapali-cevrim-adim-motor-kodlari", label: "Kapalı çevrim adım motoru kodları", total: AI_MOTOR_KOD_TOTAL, text: "Ai serisi kapalı çevrim (closed-loop) adım motoru + sürücü sipariş kodları." },
  ],
};

function codeListsFor(id: string, loc: Locale): CodeListEntry[] {
  const u = CODE_LISTS_UI[loc];
  const out: CodeListEntry[] = [];
  if (id === "tristorlu-guc-kontrol") out.push({ href: `/${loc}/magaza/dpu-kodlari`, total: 840, ...u.dpu });
  if (id === "sicaklik-kontrol-cihazlari" || id === "dijital-panel-metreler") out.push({ href: `/${loc}/magaza/kontrol-kodlari`, total: KONTROL_KOD_TOTAL, ...u.kontrol });
  if (id === "sicaklik-kontrol-cihazlari") {
    out.push({ href: `/${loc}/magaza/kontrol-sinyal-kodlari`, total: KONTROL_SINYAL_KOD_TOTAL, label: "Buton, anahtar ve sinyal lambası kodları", text: "Ürün olarak eklenmeyen buton, seçici anahtar, acil durdurma ve pilot lamba sipariş kodları." });
    out.push({ href: `/${loc}/magaza/sinyal-lambasi-kodlari`, total: SINYAL_LAMBASI_KOD_TOTAL, label: "Sinyal lambası / kule ışığı kodları", text: "Kule ışığı, döner ikaz (beacon) ve LED gösterge lambası sipariş kodları." });
  }
  if (id === "enkoderler") out.push({ href: `/${loc}/magaza/enkoder-kodlari`, total: ENC_TOTAL, ...u.enkoder });
  for (const entry of NEW_CODE_LISTS[id] ?? []) out.push({ ...entry, href: `/${loc}${entry.href}` });
  return out;
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
    alternates: { canonical: url, languages: hreflangAlternates(`/magaza/kategori/${c.id}`) },
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
  const codeLists = codeListsFor(c.id, loc);
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
      {codeLists.map((codeList) => (
        <div key={codeList.href} className="cat-codes-box">
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
      ))}
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
              <Link href={`/${loc}/magaza/seri/${seriesSlug(g.items[0].series)}`} className="store-cat-link">
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
                <StoreCard p={p} locale={loc} />
              </li>
            ))}
          </ul>
          {g.items.length > 9 && g.items[0].series && (
            <Link href={`/${loc}/magaza/seri/${seriesSlug(g.items[0].series)}`} className="btn btn-outline" style={{ alignSelf: "flex-start" }}>
              {seeAllModelsLabel(g.title.replace(/^Autonics /, "").split(" · ")[0], g.items.length, loc)}
            </Link>
          )}
        </div>
      ))}
    </section>
  );
}
