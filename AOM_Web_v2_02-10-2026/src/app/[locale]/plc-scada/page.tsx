import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LocaleProcessSteps from "@/components/LocaleProcessSteps";
import LocaleTeklifForm from "@/components/LocaleTeklifForm";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd, SITE } from "@/lib/seo";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { REGION_LINE, SERVICE_UI } from "@/i18n/pages/common";
import { plcScadaContent } from "@/i18n/pages/plc-scada";

// /plc-scada sayfasının çok dilli karşılığı (19-10-2026). Türkçe sayfa değişmedi.
const slugPath = "/plc-scada";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const loc = locale as Locale;
  const c = plcScadaContent[loc];
  const url = `${SITE}/${loc}${slugPath}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: ogLocale[loc], url, siteName: "AOM", title: c.metaTitle, description: c.metaDescription },
  };
}

export default async function LocalePlcScadaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const dict = getDictionary(loc);
  const c = plcScadaContent[loc];
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

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>
          {c.productSide.h2}
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          {c.productSide.prefix} <Link href={`/${loc}/otomasyon`}>{c.productSide.link1Text}</Link> {c.productSide.mid}{" "}
          <Link href="/magaza">{c.productSide.link2Text}</Link>
          {c.productSide.suffix}
        </p>
      </div>

      <LocaleProcessSteps dict={dict} />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          {c.whoWeWorkedWith.title}
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          {c.whoWeWorkedWith.text} <Link href={`/${loc}#referanslar`}>{c.whoWeWorkedWith.linkText}</Link>.
        </p>
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
        <LocaleTeklifForm formName={`plc_scada_page_form_${loc}`} itemName={c.contact.itemName} embedded dict={dict} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>
          {ui.relatedTitle}
        </h2>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 10 }}>
          {c.related.map((r) => (
            <li key={r.href}>
              <Link href={`/${loc}${r.href}`} className="store-chip">
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
