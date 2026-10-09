import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { isUsedCategory, products, storeCategories } from "@/data/magaza";
import { ENC_TOTAL } from "@/data/enkoder";
import { KONTROL_KOD_TOTAL } from "@/data/kontrol";
import { breadcrumbJsonLd, REGION_LINE, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mağaza: Autonics, Gefran – Kontrol, Enkoder, SSR, Tristör | Ankara",
  description:
    "Autonics sıcaklık kontrol cihazları, sayıcı, zamanlayıcı, panel metre, HMI, enkoderler, solid state röle (SSR), DPU ve SPR tristörlü güç kontrol üniteleri; Gefran güç kontrol, SSR ve motor yol vericiler. Fiyatlar KDV hariç. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
  keywords: ["Autonics bayi Ankara", "sıcaklık kontrol cihazı", "zamanlayıcı", "sayıcı", "HMI", "enkoder", "encoder", "artımlı enkoder", "mutlak enkoder", "solid state röle", "SSR", "katı hal rölesi", "tristörlü güç kontrol ünitesi", "SCR güç kontrolörü", "otomasyon malzemeleri Ankara", "Autonics fiyat listesi", "Gefran yetkili satıcı", "Gefran güç kontrol"],
  alternates: { canonical: "/magaza" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza",
    siteName: "AOM",
    title: "AOM Mağaza: Autonics Enkoder, SSR ve Tristörlü Güç Kontrol",
    description: "Ankara merkezli AOM'dan Türkiye geneline Autonics enkoderler, SSR ve tristörlü güç kontrol üniteleri.",
  },
};

// Ana kategoriler (06-10-2026): mağaza ilk sayfasında başlık + kare alt kategori kutuları.
// ids: null = listede olmayan tüm kategoriler (yeni eklenen kategoriler buraya düşer; "Diğer ürünler" ayrıca en sonda).
// codes: o ana kategoriye ait sipariş kodu listeleri (kare kutu olarak alt kategorilerin yanında gösterilir).
type CodeList = { href: string; title: string; total: number };
const MAIN_GROUPS: { id: string; title: string; ids: string[] | null; codes?: CodeList[] }[] = [
  {
    id: "guc-kontrol",
    title: "Güç kontrol",
    ids: ["tristorlu-guc-kontrol", "solid-state-roleler-ssr", "motor-starter"],
    codes: [{ href: "/magaza/dpu-kodlari", title: "Autonics DPU sipariş kodları", total: 840 }],
  },
  {
    id: "kontrol-cihazlari",
    title: "Kontrol cihazları",
    ids: ["sicaklik-kontrol-cihazlari", "sayicilar", "zamanlayicilar", "dijital-panel-metreler", "kayit-cihazlari", "gostergeler", "dijital-ekran-birimleri", "sensor-kontrol-cihazlari"],
    codes: [{ href: "/magaza/kontrol-kodlari", title: "Autonics kontrol cihazı sipariş kodları", total: KONTROL_KOD_TOTAL }],
  },
  {
    id: "enkoderler-grup",
    title: "Enkoderler",
    ids: ["enkoderler"],
    codes: [{ href: "/magaza/enkoder-kodlari", title: "Autonics enkoder sipariş kodları", total: ENC_TOTAL }],
  },
  { id: "operator-panelleri", title: "Operatör panelleri ve endüstriyel bilgisayarlar", ids: ["grafik-paneller-hmi", "endustriyel-bilgisayarlar"] },
  { id: "roleler", title: "Röleler", ids: ["roleler-ve-role-soketleri"] },
  { id: "cnc-elektronik", title: "CNC yedek parça ve elektronik", ids: null },
  { id: "ikinci-el", title: "2. El ürünler", ids: [] }, // kategoriler isUsedCategory ile otomatik eklenir
  { id: "diger", title: "Diğer", ids: ["diger-urunler"] },
];
const KNOWN = new Set(MAIN_GROUPS.flatMap((m) => m.ids ?? []));

export default function MagazaPage() {
  const cats = storeCategories();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "AOM Mağaza",
      url: `${SITE}/magaza`,
      inLanguage: "tr-TR",
      about: cats.map((c) => c.title),
      isPartOf: { "@id": `${SITE}/#org` },
      numberOfItems: products.length,
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 820 }}>
        <div className="rule" />
        <div className="eyebrow">Mağaza</div>
        <h1 style={{ fontWeight: 800, fontSize: 44, lineHeight: 1.05 }}>AOM Mağaza</h1>
        <p className="lead">
          Gefran (yetkili satış noktası) ve Autonics tristörlü güç kontrol üniteleri, solid state röleler (SSR), Gefran motor yol vericiler, Autonics enkoderler ve kontrol cihazları; NCR röleler ve röle soketleri, CNC yedek parçaları ve endüstriyel elektronik ürünler. Kategoriyi seçerek ürünlere ulaşın. Fiyatlar KDV hariçtir. {REGION_LINE}
        </p>
      </div>
      {MAIN_GROUPS.map((m) => {
        if (m.id === "ikinci-el") {
          const used = cats.filter((c) => isUsedCategory(c.title));
          const n = used.reduce((k, c) => k + c.groups.reduce((j, g) => j + g.items.length, 0), 0);
          return (
            <section key={m.id} id={m.id} className="cat-main" aria-labelledby={`${m.id}-baslik`}>
              <h2 id={`${m.id}-baslik`} className="h2" style={{ fontSize: 28 }}>
                {m.title} {n > 0 && <span className="store-count">{n.toLocaleString("tr-TR")} ürün</span>}
              </h2>
              {used.length ? (
                <ul className="cat-tiles">
                  {used.map((c) => {
                    const items = c.groups.flatMap((g) => g.items);
                    const img = items.find((p) => p.image)?.image;
                    return (
                      <li key={c.id}>
                        <Link href={`/magaza/kategori/${c.id}`} className="cat-tile cat-tile-used">
                          <span className="cat-tile-visual">
                            {img ? <Image src={img.src} alt="" fill sizes="(max-width: 640px) 50vw, 280px" style={{ objectFit: "contain" }} /> : <span className="cat-tile-count" aria-hidden="true">{items.length}</span>}
                          </span>
                          <span className="cat-tile-body">
                            <strong>{c.title.replace(/^2\. El · /, "")}</strong>
                            <span>{items.length.toLocaleString("tr-TR")} ürün · 2. el</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="cat-codes-box">
                  <p>
                    2. el ürünler yakında burada listelenecek. Aradığınız 2. el bir ürün varsa{" "}
                    <a href="mailto:info@aomtechnology.tr?subject=2.%20el%20%C3%BCr%C3%BCn%20talebi">bize yazın</a>.
                  </p>
                </div>
              )}
            </section>
          );
        }
        const subs = m.ids === null ? cats.filter((c) => !KNOWN.has(c.id) && !isUsedCategory(c.title)) : m.ids.map((id) => cats.find((c) => c.id === id)).filter((c): c is (typeof cats)[number] => !!c);
        if (!subs.length) return null;
        const total = subs.reduce((n, c) => n + c.groups.reduce((k, g) => k + g.items.length, 0), 0);
        return (
          <section key={m.id} id={m.id} className="cat-main" aria-labelledby={`${m.id}-baslik`}>
            <h2 id={`${m.id}-baslik`} className="h2" style={{ fontSize: 28 }}>
              {m.title} <span className="store-count">{total.toLocaleString("tr-TR")} ürün</span>
            </h2>
            <ul className="cat-tiles">
              {subs.map((c) => {
                const items = c.groups.flatMap((g) => g.items);
                const img = items.find((p) => p.image)?.image;
                return (
                  <li key={c.id}>
                    <Link href={`/magaza/kategori/${c.id}`} className="cat-tile">
                      <span className="cat-tile-visual">
                        {img ? (
                          <Image src={img.src} alt="" fill sizes="(max-width: 640px) 50vw, 280px" style={{ objectFit: "contain" }} />
                        ) : (
                          <span className="cat-tile-count" aria-hidden="true">{items.length}</span>
                        )}
                      </span>
                      <span className="cat-tile-body">
                        <strong>{c.title}</strong>
                        <span>
                          {items.length.toLocaleString("tr-TR")} ürün · {c.groups.length} grup
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
              {m.codes?.map((k) => (
                <li key={k.href}>
                  <Link href={k.href} className="cat-tile cat-tile-codes">
                    <span className="cat-tile-visual">
                      <span className="cat-tile-codes-label" aria-hidden="true">
                        <span className="cat-tile-count">{k.total.toLocaleString("tr-TR")}</span>
                        <span>sipariş kodu</span>
                      </span>
                    </span>
                    <span className="cat-tile-body">
                      <strong>{k.title}</strong>
                      <span>Model koduna göre tam liste</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </section>
  );
}
