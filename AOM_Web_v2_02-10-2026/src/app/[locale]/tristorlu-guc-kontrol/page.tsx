import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LocaleProcessSteps from "@/components/LocaleProcessSteps";
import LocaleTeklifForm from "@/components/LocaleTeklifForm";
import { breadcrumbJsonLd, faqJsonLd, hreflangAlternates, serviceJsonLd, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { REGION_LINE, SERVICE_UI } from "@/i18n/pages/common";
import { tristorluGucKontrolContent } from "@/i18n/pages/tristorlu-guc-kontrol";

// /tristorlu-guc-kontrol sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
const slugPath = "/tristorlu-guc-kontrol";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const c = tristorluGucKontrolContent[loc];
  const url = `${SITE}/${loc}${slugPath}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: { canonical: url, languages: hreflangAlternates(slugPath) },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title: c.metaTitle, description: c.metaDescription },
  };
}

export default async function LocaleTristorluGucKontrolPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const dict = getDictionary(loc);
  const c = tristorluGucKontrolContent[loc];
  const ui = SERVICE_UI[loc];
  const url = `${SITE}/${loc}${slugPath}`;

  const jsonLd = [
    serviceJsonLd({ name: c.jsonLdName, url, serviceType: c.serviceType, description: c.metaDescription }),
    breadcrumbJsonLd([
      { name: ui.crumbHome, path: `/${loc}` },
      { name: ui.crumbSolutions, path: `/${loc}#cozumler` },
      { name: c.crumbCurrent, path: `${slugPath}` },
    ]),
    faqJsonLd(c.faqs),
  ];

  return (
    <section className="container hizmet-section" style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label={ui.locationAria} className="store-crumbs">
        <Link href={`/${loc}`}>{ui.crumbHome}</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/${loc}#cozumler`}>{ui.crumbSolutions}</Link> <span aria-hidden="true">/</span> <span>{c.crumbCurrent}</span>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 860 }}>
        <div className="eyebrow">{c.eyebrow}</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>{c.h1}</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 16 }}>
          {c.intro} {REGION_LINE[loc]}
        </p>
      </div>

      <ul className="service-list" style={{ maxWidth: 980 }}>
        {c.highlights.map((h) => (
          <li key={h} className="card">
            <span style={{ fontSize: 15 }}>{h}</span>
          </li>
        ))}
      </ul>
      <p className="caption" style={{ marginTop: -36 }}>
        {c.asteriskNote}
      </p>

      <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        <Image
          src="/hizmetler/tristorlu-guc-kontrol/tristorlu-guc-kontrol-pano_16-10-2026.webp"
          alt={c.heroImageAlt}
          width={1600}
          height={747}
          style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
        />
      </figure>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          {ui.whatWeDo}
        </h2>
      </div>
      <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
        {c.services.map((s) => (
          <div key={s.title} className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 8 }}>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 17 }}>{s.title}</strong>
            <p style={{ margin: 0, fontSize: 14.5, color: "var(--ink-muted)" }}>{s.text}</p>
          </div>
        ))}
      </div>

      <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8, maxWidth: 760 }}>
        <Image
          src="/hizmetler/tristorlu-guc-kontrol/tristorlu-guc-kontrol-hmi_16-10-2026.webp"
          alt={c.hmiImageAlt}
          width={1600}
          height={854}
          style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
        />
        <figcaption className="caption">{c.hmiCaption}</figcaption>
      </figure>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          {c.applicationsTitle}
        </h2>
      </div>
      <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
        {c.applications.map((a) => (
          <div key={a.title} className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 15 }}>{a.title}</strong>
            <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-muted)" }}>{a.text}</p>
          </div>
        ))}
      </div>

      <LocaleProcessSteps dict={dict} />

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          {c.caseStudy.h2}
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{c.caseStudy.intro}</p>
        <div className="grid-auto" style={{ gridTemplateColumns: "minmax(0, 360px) 1fr", alignItems: "start" }}>
          <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            <Image
              src="/hizmetler/tristorlu-guc-kontrol/tristorlu-guc-kontrol-baykar-referans_16-10-2026.webp"
              alt={c.caseStudy.imageAlt}
              width={723}
              height={1051}
              style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
            />
            <figcaption className="caption">{c.caseStudy.imageCaption}</figcaption>
          </figure>
          <div className="card" style={{ padding: 24 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              {c.caseStudy.badge}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, marginBottom: 4 }}>{c.caseStudy.name}</div>
            <p style={{ margin: "0 0 16px", color: "var(--ink-muted)" }}>{c.caseStudy.subtitle}</p>
            <table className="spec-table">
              <tbody>
                {c.caseStudy.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    <td>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          {ui.faqTitle}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {c.faqs.map((f) => (
            <div key={f.q} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>{f.q}</strong>
              <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>{f.a}</p>
            </div>
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
        <LocaleTeklifForm formName={`tristorlu_guc_kontrol_page_form_${loc}`} itemName={c.contact.itemName} embedded dict={dict} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>
          {ui.relatedTitle}
        </h2>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 10 }}>
          {c.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="store-chip">
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
