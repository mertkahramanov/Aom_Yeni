import { locales as i18nLocales } from "@/i18n/locales";

// Ortak SEO verileri (03-10-2026). Firma bilgileri sitede yayımlanan iletişim bilgilerinden alınmıştır.
// Açılış saatleri, posta kodu ve koordinat bilinmediği için eklenmedi [TEYİT]; Google İşletme Profili ile aynı olmalı.
// www birliği (14-10-2026, claude/SITE_TRAFIK_DURUM_14-10-2026.md Bulgu 2): Vercel'de asıl (primary)
// domain www.aomtechnology.tr olduğu için kanonik adresler buna göre birleştirildi. Vercel › Domains'te
// www'siz aomtechnology.tr'nin buraya yönlendirdiğinden ayrıca emin olunmalı (bu kod seviyesinde değil,
// platform ayarıdır).
export const SITE = "https://www.aomtechnology.tr";

export const ORG = {
  name: "AOM",
  legalName: "Angora Endüstriyel Makine Tekno. Otomas. San. ve Tic. Ltd. Şti.",
  email: "info@aomtechnology.tr",
  telephone: "+90 544 624 75 14",
  street: "1147. Cad. No: 8",
  district: "Yenimahalle",
  city: "Ankara",
  country: "TR",
};

export const REGION_LINE = "Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.";

const address = {
  "@type": "PostalAddress",
  streetAddress: ORG.street,
  addressLocality: ORG.district,
  addressRegion: ORG.city,
  addressCountry: ORG.country,
};

const areaServed = [
  { "@type": "City", name: "Ankara" },
  { "@type": "Country", name: "Türkiye" },
];

// Site geneli: kuruluş + yerel işletme (adres Ankara, hizmet alanı Türkiye)
export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#org`,
        name: ORG.name,
        legalName: ORG.legalName,
        url: SITE,
        logo: `${SITE}/icon.png`,
        email: ORG.email,
        telephone: ORG.telephone,
        address,
        areaServed,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE}/#isletme`,
        name: `${ORG.name} – Angora Endüstriyel Makine`,
        url: SITE,
        image: `${SITE}/icon.png`,
        email: ORG.email,
        telephone: ORG.telephone,
        address,
        areaServed,
        parentOrganization: { "@id": `${SITE}/#org` },
        knowsAbout: [
          "endüstriyel otomasyon",
          "makine otomasyonu",
          "PLC",
          "servo motor",
          "motion kontrol",
          "robotik kaynak",
          "pres güvenliği",
          "CNC tezgâh",
          "tristörlü güç kontrol",
          "solid state röle (SSR)",
        ],
      },
    ],
  };
}

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE}${it.path}` })),
});

// Çok dilli sayfalar için hreflang (Metadata.alternates.languages) üretir (19-10-2026,
// bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md ve src/app/sitemap.ts). path: TR sayfanın
// SITE'den sonraki yolu (örn. "/magaza/seri/xyz"; anasayfa için ""). Yalnızca [locale]
// ağacında karşılığı olan sayfalarda kullanılır: anasayfa, /otomasyon, 5 hizmet sayfası ve
// mağazanın tüm 9 rota tipi. /cerez-politikasi ve /kvkk-aydinlatma-metni'nin çok dilli
// karşılığı olmadığı için orada kullanılmaz.
export function hreflangAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {
    tr: `${SITE}${path}`,
    "x-default": `${SITE}${path}`,
  };
  for (const loc of i18nLocales) languages[loc] = `${SITE}/${loc}${path}`;
  return languages;
}

export const sellerRef = { "@type": "Organization", "@id": `${SITE}/#org`, name: ORG.name, url: SITE };
export const eligibleRegion = { "@type": "Country", name: "TR" };

// Hizmet sayfaları için FAQPage şeması (16-10-2026, bkz. claude/HIZMET_SAYFALARI_TASLAK_15-10-2026.md)
export const faqJsonLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
});

// Hizmet sayfaları için Service şeması (16-10-2026)
export const serviceJsonLd = (opts: { name: string; url: string; serviceType: string; description: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  serviceType: opts.serviceType,
  url: opts.url,
  provider: { "@type": "Organization", "@id": `${SITE}/#org`, name: ORG.name },
  areaServed: [
    { "@type": "City", name: "Ankara" },
    { "@type": "Country", name: "Türkiye" },
  ],
  description: opts.description,
});
