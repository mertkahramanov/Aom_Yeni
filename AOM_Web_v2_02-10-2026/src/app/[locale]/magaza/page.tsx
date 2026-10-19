import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import LocaleSearchBox from "@/components/LocaleSearchBox";
import StoreSlider, { type StoreSlide } from "@/components/StoreSlider";
import { isUsedCategory, products, storeCategories } from "@/data/magaza";
import { ENC_TOTAL } from "@/data/enkoder";
import { KONTROL_KOD_TOTAL } from "@/data/kontrol";
import { breadcrumbJsonLd, hreflangAlternates, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { REGION_LINE } from "@/i18n/pages/common";
import { MAGAZA_UI, SLIDER_TEXT, productCount, groupCount, orderCodeWord } from "@/i18n/pages/magaza";
import { IKINCI_EL_CATEGORY_TITLES, IKINCI_EL_PREFIX_LABEL, translateCategoryTitle, translateMainGroupTitle } from "@/i18n/pages/magaza-categories";

// /magaza ana liste sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
// Mert kararı: arayüz + kategori/grup adları çevrildi; ürün detay sayfaları (henüz çevrilmedi)
// şimdilik Türkçe kalıyor, bu yüzden kategori kutuları ve "tam liste" bağlantıları TR sayfalara
// gider (bkz. claude/COK_DILLI_SITE_ASAMA3 notu).
const slugPath = "/magaza";

type CodeList = { href: string; title: string; total: number };
const MAIN_GROUPS: { id: string; trTitle: string; ids: string[] | null; codes?: (loc: Locale) => CodeList[] }[] = [
  {
    id: "guc-kontrol",
    trTitle: "Güç kontrol",
    ids: ["tristorlu-guc-kontrol", "solid-state-roleler-ssr", "motor-starter"],
    codes: (loc) => [{ href: `/${loc}/magaza/dpu-kodlari`, title: MAGAZA_UI[loc].orderCodeLabels.dpu, total: 840 }],
  },
  {
    id: "kontrol-cihazlari",
    trTitle: "Kontrol cihazları",
    ids: ["sicaklik-kontrol-cihazlari", "sayicilar", "zamanlayicilar", "dijital-panel-metreler", "kayit-cihazlari", "gostergeler", "dijital-ekran-birimleri", "sensor-kontrol-cihazlari"],
    codes: (loc) => [{ href: `/${loc}/magaza/kontrol-kodlari`, title: MAGAZA_UI[loc].orderCodeLabels.kontrol, total: KONTROL_KOD_TOTAL }],
  },
  {
    id: "enkoderler-grup",
    trTitle: "Enkoderler",
    ids: ["enkoderler"],
    codes: (loc) => [{ href: `/${loc}/magaza/enkoder-kodlari`, title: MAGAZA_UI[loc].orderCodeLabels.enkoder, total: ENC_TOTAL }],
  },
  { id: "operator-panelleri", trTitle: "Operatör panelleri ve endüstriyel bilgisayarlar", ids: ["grafik-paneller-hmi", "endustriyel-bilgisayarlar"] },
  { id: "roleler", trTitle: "Röleler", ids: ["roleler-ve-role-soketleri"] },
  { id: "motor-suruculer", trTitle: "Motor sürücüler ve yol vericiler", ids: ["hiz-kontrol-cihazlari-ac-suruculer", "dc-motor-suruculer", "yumusak-yol-vericiler-soft-starter", "fren-uniteleri-ve-direncleri"] },
  { id: "cnc-elektronik", trTitle: "CNC yedek parça ve elektronik", ids: null },
  { id: "ikinci-el", trTitle: "2. El ürünler", ids: [] },
  { id: "diger", trTitle: "Diğer", ids: ["diger-urunler"] },
];
const KNOWN = new Set(MAIN_GROUPS.flatMap((m) => m.ids ?? []));

const SLIDER_FEATURE: { id: string; href: string; hrefIsCategory?: boolean; catIds: string[]; image?: { src: string; alt: string } }[] = [
  { id: "guc-kontrol", href: "#guc-kontrol", catIds: ["tristorlu-guc-kontrol", "solid-state-roleler-ssr", "motor-starter"], image: { src: "/magaza-slider/guc-kontrol-slider_17-10-2026.webp", alt: "Power electronics units" } },
  { id: "kontrol-cihazlari", href: "#kontrol-cihazlari", catIds: ["sicaklik-kontrol-cihazlari", "sayicilar", "zamanlayicilar", "dijital-panel-metreler", "kayit-cihazlari", "gostergeler", "dijital-ekran-birimleri", "sensor-kontrol-cihazlari"], image: { src: "/magaza-slider/kontrol-cihazlari-slider_17-10-2026.webp", alt: "HMI touch operator panels" } },
  { id: "enkoderler-grup", href: "#enkoderler-grup", catIds: ["enkoderler"], image: { src: "/magaza-slider/enkoderler-slider_17-10-2026.webp", alt: "Various encoder types" } },
  { id: "motor-suruculer", href: "#motor-suruculer", catIds: ["hiz-kontrol-cihazlari-ac-suruculer", "dc-motor-suruculer", "yumusak-yol-vericiler-soft-starter", "fren-uniteleri-ve-direncleri"], image: { src: "/magaza-slider/motor-suruculer-slider_17-10-2026.webp", alt: "Yaskawa AC motor drive (GA500)" } },
  { id: "servo-motorlar", href: "/magaza/kategori/step-ve-servo-motorlar-suruculer", hrefIsCategory: true, catIds: ["step-ve-servo-motorlar-suruculer"], image: { src: "/magaza-slider/servo-motorlar-slider_17-10-2026.webp", alt: "Yaskawa Sigma servo motor and drive" } },
  { id: "sensorler", href: "/magaza/kategori/svic-sensor-ve-butonlar", hrefIsCategory: true, catIds: ["svic-sensor-ve-butonlar"], image: { src: "/magaza/assets-fcdfa49c_06-10-2026.jpg", alt: "Balluff inductive proximity sensor" } },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const u = MAGAZA_UI[loc];
  const url = `${SITE}/${loc}${slugPath}`;
  return {
    title: u.metaTitle,
    description: u.metaDescription,
    keywords: u.keywords,
    alternates: { canonical: url, languages: hreflangAlternates(slugPath) },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title: u.ogTitle, description: u.ogDescription },
  };
}

export default async function LocaleMagazaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const u = MAGAZA_UI[loc];
  const dict = getDictionary(loc);
  const cats = storeCategories();

  const ikinciElBareTitle = (trTitle: string) => {
    const rest = trTitle.replace(/^2\. El · /, "");
    return IKINCI_EL_CATEGORY_TITLES[rest]?.[loc] ?? rest;
  };

  const sliderSlides: StoreSlide[] = SLIDER_FEATURE.map((f) => {
    const subs = f.catIds.map((id) => cats.find((c) => c.id === id)).filter((c): c is (typeof cats)[number] => !!c);
    const items = subs.flatMap((c) => c.groups.flatMap((g) => g.items));
    const image = f.image ?? items.find((p) => p.image)?.image;
    const t = SLIDER_TEXT[loc][f.id];
    return {
      id: f.id,
      short: t.short,
      eyebrow: t.eyebrow,
      title: t.title,
      lead: t.lead,
      spec: productCount(items.length, loc),
      cta: t.cta,
      href: f.hrefIsCategory ? `/${loc}${f.href}` : f.href,
      image,
    };
  }).filter((s) => s.spec !== productCount(0, loc));

  const usedCats = cats.filter((c) => isUsedCategory(c.title));
  const usedItems = usedCats.flatMap((c) => c.groups.flatMap((g) => g.items));
  if (usedItems.length) {
    const t = SLIDER_TEXT[loc]["ikinci-el"];
    sliderSlides.push({
      id: "ikinci-el",
      short: t.short,
      eyebrow: t.eyebrow,
      title: t.title,
      lead: t.lead,
      spec: productCount(usedItems.length, loc),
      cta: t.cta,
      href: "#ikinci-el",
      image: { src: "/magaza-slider/ikinci-el-slider_17-10-2026.webp", alt: "Range of industrial automation products" },
    });
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `AOM ${u.eyebrow}`,
      url: `${SITE}/${loc}${slugPath}`,
      inLanguage: loc,
      about: cats.map((c) => translateCategoryTitle(c.title, loc)),
      isPartOf: { "@id": `${SITE}/#org` },
      numberOfItems: products.length,
    },
    breadcrumbJsonLd([
      { name: u.crumbHome, path: `/${loc}` },
      { name: u.crumbStore, path: `/${loc}${slugPath}` },
    ]),
  ];

  return (
    <>
      <StoreSlider slides={sliderSlides} />
      <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 32, paddingTop: 40 }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 820 }}>
          <div className="rule" />
          <div className="eyebrow">{u.eyebrow}</div>
          <h1 style={{ fontWeight: 800, fontSize: 44, lineHeight: 1.05 }}>{u.h1}</h1>
          <p className="lead">
            {u.lead} {REGION_LINE[loc]}
          </p>
          <LocaleSearchBox dict={dict} />
        </div>
        {MAIN_GROUPS.map((m) => {
          const title = translateMainGroupTitle(m.trTitle, loc);
          if (m.id === "ikinci-el") {
            const used = cats.filter((c) => isUsedCategory(c.title));
            const n = used.reduce((k, c) => k + c.groups.reduce((j, g) => j + g.items.length, 0), 0);
            return (
              <section key={m.id} id={m.id} className="cat-main" aria-labelledby={`${m.id}-baslik`}>
                <h2 id={`${m.id}-baslik`} className="h2" style={{ fontSize: 28 }}>
                  {title} {n > 0 && <span className="store-count">{productCount(n, loc)}</span>}
                </h2>
                {used.length ? (
                  <ul className="cat-tiles">
                    {used.map((c) => {
                      const items = c.groups.flatMap((g) => g.items);
                      const img = items.find((p) => p.image)?.image;
                      return (
                        <li key={c.id}>
                          <Link href={`/${loc}/magaza/kategori/${c.id}`} className="cat-tile cat-tile-used">
                            <span className="cat-tile-visual">
                              {img ? <Image src={img.src} alt="" fill sizes="(max-width: 640px) 50vw, 280px" style={{ objectFit: "contain" }} /> : <span className="cat-tile-count" aria-hidden="true">{items.length}</span>}
                            </span>
                            <span className="cat-tile-body">
                              <strong>{ikinciElBareTitle(c.title)}</strong>
                              <span>
                                {productCount(items.length, loc)} · {IKINCI_EL_PREFIX_LABEL[loc]}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="cat-codes-box">
                    <p>
                      {u.usedEmptyText}
                      <a href={`mailto:info@aomtechnology.tr?subject=${encodeURIComponent(u.usedEmptyMailSubject)}`}>{u.usedEmptyLinkText}</a>.
                    </p>
                  </div>
                )}
              </section>
            );
          }
          const subs = m.ids === null ? cats.filter((c) => !KNOWN.has(c.id) && !isUsedCategory(c.title)) : m.ids.map((id) => cats.find((c) => c.id === id)).filter((c): c is (typeof cats)[number] => !!c);
          if (!subs.length) return null;
          const total = subs.reduce((n, c) => n + c.groups.reduce((k, g) => k + g.items.length, 0), 0);
          const codes = m.codes?.(loc);
          return (
            <section key={m.id} id={m.id} className="cat-main" aria-labelledby={`${m.id}-baslik`}>
              <h2 id={`${m.id}-baslik`} className="h2" style={{ fontSize: 28 }}>
                {title} <span className="store-count">{productCount(total, loc)}</span>
              </h2>
              <ul className="cat-tiles">
                {subs.map((c) => {
                  const items = c.groups.flatMap((g) => g.items);
                  const img = items.find((p) => p.image)?.image;
                  return (
                    <li key={c.id}>
                      <Link href={`/${loc}/magaza/kategori/${c.id}`} className="cat-tile">
                        <span className="cat-tile-visual">
                          {img ? (
                            <Image src={img.src} alt="" fill sizes="(max-width: 640px) 50vw, 280px" style={{ objectFit: "contain" }} />
                          ) : (
                            <span className="cat-tile-count" aria-hidden="true">{items.length}</span>
                          )}
                        </span>
                        <span className="cat-tile-body">
                          <strong>{translateCategoryTitle(c.title, loc)}</strong>
                          <span>
                            {productCount(items.length, loc)} · {groupCount(c.groups.length, loc)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
                {codes?.map((k) => (
                  <li key={k.href}>
                    <Link href={k.href} className="cat-tile cat-tile-codes">
                      <span className="cat-tile-visual">
                        <span className="cat-tile-codes-label" aria-hidden="true">
                          <span className="cat-tile-count">{k.total.toLocaleString("en-US")}</span>
                          <span>{orderCodeWord(k.total, loc)}</span>
                        </span>
                      </span>
                      <span className="cat-tile-body">
                        <strong>{k.title}</strong>
                        <span>{u.fullListByCode}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </section>
    </>
  );
}
