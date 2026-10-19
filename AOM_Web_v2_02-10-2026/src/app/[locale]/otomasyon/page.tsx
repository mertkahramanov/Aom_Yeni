import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LocaleSearchBox from "@/components/LocaleSearchBox";
import LocaleTeklifForm from "@/components/LocaleTeklifForm";
import { breadcrumbJsonLd, hreflangAlternates, serviceJsonLd, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { REGION_LINE } from "@/i18n/pages/common";
import { otomasyonContent } from "@/i18n/pages/otomasyon";

// /otomasyon sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
// Görsel/video dosyaları ve boyutları Türkçe sayfadakiyle birebir aynı; yalnızca alt/caption
// metinleri src/i18n/pages/otomasyon.ts içinden dil bazlı alınır.
const slugPath = "/otomasyon";

const galeriGorselDosyalari = [
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-01_19-10-2026.webp", w: 1000, h: 1250 },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-02_19-10-2026.webp", w: 1000, h: 1250 },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-03_19-10-2026.webp", w: 1000, h: 1250 },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-04_19-10-2026.webp", w: 1000, h: 1250 },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-05_19-10-2026.webp", w: 1000, h: 1250 },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-06_19-10-2026.webp", w: 1000, h: 1250 },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-07_19-10-2026.webp", w: 1000, h: 1250 },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-08_19-10-2026.webp", w: 1000, h: 1250 },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-09_19-10-2026.webp", w: 1000, h: 1250 },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-10_19-10-2026.webp", w: 1000, h: 1250 },
];

const galeriVideoDosyalari = [
  { src: "/hizmetler/otomasyon/otomasyon-pano-video-01_19-10-2026.mp4", poster: "/hizmetler/otomasyon/otomasyon-pano-video-01_19-10-2026-poster.webp" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-video-02_19-10-2026.mp4", poster: "/hizmetler/otomasyon/otomasyon-pano-video-02_19-10-2026-poster.webp" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-video-03_19-10-2026.mp4", poster: "/hizmetler/otomasyon/otomasyon-pano-video-03_19-10-2026-poster.webp" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-video-04_19-10-2026.mp4", poster: "/hizmetler/otomasyon/otomasyon-pano-video-04_19-10-2026-poster.webp" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const c = otomasyonContent[loc];
  const url = `${SITE}/${loc}${slugPath}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: { canonical: url, languages: hreflangAlternates(slugPath) },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title: c.metaTitle, description: c.metaDescription },
  };
}

export default async function LocaleOtomasyonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const dict = getDictionary(loc);
  const c = otomasyonContent[loc];
  const url = `${SITE}/${loc}${slugPath}`;

  const jsonLd = [
    serviceJsonLd({ name: c.jsonLdName, url, serviceType: c.serviceType, description: c.metaDescription }),
    breadcrumbJsonLd([
      { name: loc === "en" ? "Home" : loc === "ru" ? "Главная" : "الرئيسية", path: `/${loc}` },
      { name: c.crumbCurrent, path: `${slugPath}` },
    ]),
  ];

  const groups = [c.groups.plc, c.groups.servo, c.groups.motion];
  const groupIds = ["plc", "servo", "motion"];
  const groupHrefs = ["/magaza#kontrol-cihazlari", "/magaza#motor-suruculer", "/magaza#enkoderler-grup"];

  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label={loc === "en" ? "Breadcrumb" : loc === "ru" ? "Навигационная цепочка" : "مسار التنقل"} className="store-crumbs">
        <Link href={`/${loc}`}>{loc === "en" ? "Home" : loc === "ru" ? "Главная" : "الرئيسية"}</Link>{" "}
        <span aria-hidden="true">/</span> <span>{c.crumbCurrent}</span>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <div className="eyebrow">{c.eyebrow}</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>{c.h1}</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 16 }}>
          {c.intro} {REGION_LINE[loc]}
        </p>
        <LocaleSearchBox dict={dict} />
      </div>

      {groups.map((g, i) => (
        <div key={groupIds[i]} id={groupIds[i]} style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860, scrollMarginTop: 96 }}>
          <h2 className="h2" style={{ fontSize: 26 }}>
            {g.title}
          </h2>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{g.text}</p>
          <div>
            <Link href={groupHrefs[i]} className="btn btn-outline">
              {g.linkLabel}
            </Link>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          {c.support.h2}
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{c.support.text1}</p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          {c.support.text2Prefix}
          <Link href={`/${loc}/plc-scada`}>{c.support.text2LinkText}</Link>
          {c.support.text2Suffix}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
          <div className="eyebrow">{c.gallery.eyebrow}</div>
          <h2 className="h2" style={{ fontSize: 26 }}>
            {c.gallery.h2}
          </h2>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{c.gallery.intro}</p>
        </div>

        <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>
          {galeriGorselDosyalari.map((g, i) => (
            <figure key={g.src} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <Image
                src={g.src}
                alt={c.gallery.images[i].alt}
                width={g.w}
                height={g.h}
                style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
              />
              <figcaption className="caption">{c.gallery.images[i].caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>
          {galeriVideoDosyalari.map((v, i) => (
            <figure key={v.src} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                src={v.src}
                poster={v.poster}
                controls
                playsInline
                preload="metadata"
                style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)", background: "#000" }}
              />
              <figcaption className="caption">{c.gallery.videos[i].caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="card contact-card" style={{ maxWidth: 520, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>{c.contact.title}</div>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>{c.contact.text}</p>
        <a className="big" href="mailto:info@aomtechnology.tr">
          info@aomtechnology.tr
        </a>
        <a className="big" href="tel:+905446247514">
          +90 544 624 75 14
        </a>
        <LocaleTeklifForm formName={`otomasyon_page_form_${loc}`} itemName={c.contact.itemName} embedded dict={dict} />
      </div>
    </section>
  );
}
