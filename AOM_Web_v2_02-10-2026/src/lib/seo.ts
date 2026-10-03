// Ortak SEO verileri (03-10-2026). Firma bilgileri sitede yayımlanan iletişim bilgilerinden alınmıştır.
// Açılış saatleri, posta kodu ve koordinat bilinmediği için eklenmedi [TEYİT]; Google İşletme Profili ile aynı olmalı.
export const SITE = "https://aomtechnology.tr";

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

export const sellerRef = { "@type": "Organization", "@id": `${SITE}/#org`, name: ORG.name, url: SITE };
export const eligibleRegion = { "@type": "Country", name: "TR" };
