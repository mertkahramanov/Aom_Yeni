import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, ogLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import { hreflangAlternates, SITE } from "@/lib/seo";
import LocaleHeroSlider from "@/components/LocaleHeroSlider";
import LocaleOemMarquee from "@/components/LocaleOemMarquee";
import LocaleProcessSteps from "@/components/LocaleProcessSteps";
import LocaleSearchBox from "@/components/LocaleSearchBox";
import LocaleTeklifForm from "@/components/LocaleTeklifForm";

// [locale] ana sayfası (18-10-2026). Türkçe src/app/page.tsx ile aynı bölüm/yapı ve aynı CSS
// sınıfları kullanılır; metin ve bağlantılar dict üzerinden gelir. OEM ve referans logoları,
// marka adları ve e-posta/telefon gibi özel adlar çevrilmez (orijinaliyle aynı).

const oem = [
  { name: "Yaskawa", slug: "yaskawa", src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 },
  { name: "Fanuc", slug: "fanuc", src: "/oem/fanuc_03-10-2026.png", w: 947, h: 160 },
  { name: "ABB", slug: "abb", src: "/oem/abb_03-10-2026.png", w: 319, h: 129 },
  { name: "Siemens", slug: "siemens", src: "/oem/siemens_03-10-2026.png", w: 376, h: 60 },
  { name: "Mitsubishi Electric", slug: "mitsubishi-electric", src: "/oem/mitsubishi-electric_03-10-2026.png", w: 548, h: 160 },
  { name: "Omron", slug: "omron", src: "/oem/omron_03-10-2026.png", w: 509, h: 99 },
  { name: "Pilz", slug: "pilz", src: "/oem/pilz_03-10-2026.png", w: 396, h: 149 },
  { name: "Leuze", slug: "leuze", src: "/oem/leuze_03-10-2026.png", w: 381, h: 115 },
  { name: "Gefran", slug: "gefran", src: "/oem/gefran_11-10-2026.svg", w: 160, h: 37 },
];

const references = [
  { name: "Aselsan", src: "/referanslar/aselsan_06-10-2026.png", w: 400, h: 171 },
  { name: "Roketsan", src: "/referanslar/roketsan_06-10-2026.png", w: 800, h: 182 },
  { name: "TUSAŞ", src: "/referanslar/tusas_06-10-2026.png", w: 2748, h: 1426 },
  { name: "Baykar", src: "/referanslar/baykar_06-10-2026.jpg", w: 739, h: 415 },
  { name: "Havelsan", src: "/referanslar/havelsan_06-10-2026.png", w: 2362, h: 778 },
  { name: "TEI", src: "/referanslar/tei_06-10-2026.png", w: 800, h: 343 },
  { name: "FNSS", src: "/referanslar/fnss_06-10-2026.png", w: 738, h: 195 },
  { name: "ASFAT", src: "/referanslar/asfat_06-10-2026.png", w: 300, h: 126 },
  { name: "ArmAda", src: "/referanslar/armada_15-10-2026.webp", w: 418, h: 480 },
  { name: "TSE (Türk Standardları Enstitüsü)", src: "/referanslar/tse_15-10-2026.webp", w: 736, h: 429 },
  { name: "MKE (Makina ve Kimya Endüstrisi)", src: "/referanslar/mke_15-10-2026.webp", w: 500, h: 500 },
  { name: "SpaceX", src: "/referanslar/spacex_15-10-2026.webp", w: 501, h: 54 },
  { name: "Tunatek", src: "/referanslar/tunatek_15-10-2026.webp", w: 480, h: 480 },
  { name: "Orbant Plastik", src: "/referanslar/orbant-plastik_15-10-2026.webp", w: 432, h: 432 },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
    alternates: {
      canonical: `${SITE}/${locale}`,
      languages: hreflangAlternates(""),
    },
    openGraph: { type: "website", locale: ogLocale[locale as Locale], siteName: "AOM" },
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const dict = getDictionary(loc);
  const h = dict.home;

  return (
    <>
      <LocaleHeroSlider locale={loc} dict={dict} />

      <section className="container" style={{ paddingTop: 32, paddingBottom: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div className="eyebrow">{h.searchEyebrow}</div>
        <LocaleSearchBox dict={dict} />
      </section>

      <section id="otomasyon" className="container section" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 760 }}>
          <div className="eyebrow">{h.automation.eyebrow}</div>
          <h2 className="h2">{h.automation.h2}</h2>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{h.automation.lead}</p>
        </div>
        <div className="grid-auto solutions">
          {h.automation.cards.map((a) => (
            <Link key={a.title} href={a.href} className="card solution">
              <div className="rule" />
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <span className="more">{h.automation.more}</span>
            </Link>
          ))}
        </div>
      </section>

      <LocaleOemMarquee dict={dict} />

      <section id="cozumler" className="container section" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
          <div className="eyebrow">{h.solutions.eyebrow}</div>
          <h2 className="h2">{h.solutions.h2}</h2>
        </div>
        <div className="grid-auto solutions">
          {h.solutions.cards.map((s) => (
            <Link key={s.title} href={s.href} className="card solution">
              <div className="rule" />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="more">{h.automation.more}</span>
            </Link>
          ))}
        </div>
      </section>

      <LocaleProcessSteps dict={dict} />

      <section id="hizmetler" className="container section services">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="eyebrow">{h.services.eyebrow}</div>
          <h2 className="h2">{h.services.h2}</h2>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{h.services.lead}</p>
        </div>
        <ul className="service-list">
          {h.services.items.map((s) => (
            <li key={s.title} className="card">
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="oem" style={{ background: "var(--surface-raised)", borderTop: "1px solid var(--line)" }}>
        <div className="container" style={{ paddingTop: 64, paddingBottom: 64, display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="eyebrow">{dict.oem.heading}</div>
          <ul className="logo-grid">
            {oem.map((b) => (
              <li key={b.name}>
                <Link href={`/${loc}/magaza/marka/${b.slug}`} aria-label={`${b.name} ${dict.oem.ariaSuffix}`}>
                  {b.src.endsWith(".svg") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={b.src}
                      alt={b.name}
                      width={b.w}
                      height={b.h}
                      style={{ width: "auto", height: "auto", maxWidth: "85%", maxHeight: "70%", objectFit: "contain" }}
                    />
                  ) : (
                    <Image
                      src={b.src}
                      alt={b.name}
                      width={b.w}
                      height={b.h}
                      style={{ width: "auto", height: "auto", maxWidth: "85%", maxHeight: "70%", objectFit: "contain" }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="referanslar" className="container" style={{ paddingTop: 64, paddingBottom: 64, display: "flex", flexDirection: "column", gap: 24 }}>
        <div className="eyebrow">{h.references.eyebrow}</div>
        <p style={{ margin: 0, fontSize: 15, color: "var(--ink-muted)", maxWidth: 720 }}>{h.references.lead}</p>
        <ul className="logo-grid">
          {references.map((r) => (
            <li key={r.name}>
              <Image
                src={r.src}
                alt={r.name}
                width={r.w}
                height={r.h}
                style={{ width: "auto", height: "auto", maxWidth: "85%", maxHeight: "70%", objectFit: "contain" }}
              />
            </li>
          ))}
        </ul>
      </section>

      <section id="iletisim" className="contact">
        <div className="container inner" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2">{h.contact.h2}</h2>
            <p style={{ margin: 0, color: "var(--ink-muted)" }}>{h.contact.lead}</p>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, display: "flex", flexDirection: "column", gap: 4 }}>
              {h.contact.inputs.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="card contact-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>{h.contact.cardTitle}</div>
            <a className="big" href="mailto:info@aomtechnology.tr">
              info@aomtechnology.tr
            </a>
            <a className="big" href="tel:+905446247514">
              +90 544 624 75 14
            </a>
            <div style={{ fontSize: 15, color: "var(--ink-muted)" }}>1147. Cad. No: 8, Yenimahalle / Ankara — {h.contact.addressSuffix}</div>
            <LocaleTeklifForm formName={`homepage_contact_form_${loc}`} embedded dict={dict} />
          </div>
        </div>
      </section>
    </>
  );
}
