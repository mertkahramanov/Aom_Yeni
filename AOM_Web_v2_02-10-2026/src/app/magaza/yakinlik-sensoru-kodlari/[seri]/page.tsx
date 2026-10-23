import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeFilter from "@/components/CodeFilter";
import { YAKINLIK_SENSOR_KOD_SERIES, YAKINLIK_SENSOR_PRICES, yakinlikSensorKodSeries, yakinlikSensorSlug } from "@/data/autonics-yakinlik-sensor_23-10-2026";

const lc = (t: string) => (/^[A-ZÇĞİÖŞÜ][a-zçğıöşü]/.test(t) ? t[0].toLocaleLowerCase("tr-TR") + t.slice(1) : t);
import { priceInfo, products, type Product } from "@/data/magaza";
import { breadcrumbJsonLd, hreflangAlternates, ORG, REGION_LINE, SITE } from "@/lib/seo";

const WA = ORG.telephone.replace(/\D/g, "");

export function generateStaticParams() {
  return YAKINLIK_SENSOR_KOD_SERIES.map((s) => ({ seri: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ seri: string }> }): Promise<Metadata> {
  const s = yakinlikSensorKodSeries((await params).seri);
  if (!s) return {};
  const url = `/magaza/yakinlik-sensoru-kodlari/${s.slug}`;
  const title = `Autonics ${s.key} Sipariş Kodları (${s.codes.length} Kod) | Ankara`;
  const description = `Autonics ${s.key}: ${lc(s.title)}. ${s.codes.length} sipariş kodu, ${s.codes[0][0]} … ${s.codes[s.codes.length - 1][0]}; her kod için teklif. ${REGION_LINE}`;
  return {
    title,
    description,
    keywords: [`Autonics ${s.key}`, `${s.key} fiyat`, ...s.codes.slice(0, 12).map((c) => String(c[0]))],
    alternates: { canonical: url, languages: hreflangAlternates(url) },
    openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description },
  };
}

export default async function YakinlikSensorKodSeriPage({ params }: { params: Promise<{ seri: string }> }) {
  const s = yakinlikSensorKodSeries((await params).seri);
  if (!s) notFound();
  const productSlugs = new Set(products.map((p) => p.slug));
  const tableId = `kodlar-${s.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Autonics ${s.key} sipariş kodları`,
      url: `${SITE}/magaza/yakinlik-sensoru-kodlari/${s.slug}`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      about: { "@type": "Thing", name: `Autonics ${s.key} ${s.title}` },
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Endüktif yakınlık sensörü kodları", path: "/magaza/yakinlik-sensoru-kodlari" },
      { name: s.key, path: `/magaza/yakinlik-sensoru-kodlari/${s.slug}` },
    ]),
  ];
  const others = YAKINLIK_SENSOR_KOD_SERIES.filter((x) => x.cat === s.cat && x.slug !== s.slug);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/magaza/yakinlik-sensoru-kodlari">Endüktif yakınlık sensörü kodları</Link> <span aria-hidden="true">/</span> <span>{s.key}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">{s.cat}</div>
        <h1 style={{ fontWeight: 800, fontSize: 36, lineHeight: 1.08 }}>Autonics {s.key} sipariş kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{s.desc}</p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Bu sayfada {lc(s.title)} serisinin {s.codes.length} sipariş kodunun tamamı listelenir. Listedeki her kod için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      {s.common.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 900 }}>
          <h2 className="h2" style={{ fontSize: 22 }}>Serideki tüm kodlarda ortak</h2>
          <table className="spec-table">
            <tbody>
              {s.common.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>{s.codes.length} sipariş kodu</h2>
        {s.codes.length > 20 && <CodeFilter tableId={tableId} total={s.codes.length} />}
        <div style={{ overflowX: "auto" }}>
          <table id={tableId} className="spec-table series-table dpu-table enc-table">
            <thead>
              <tr>
                <th scope="col">Model kodu</th>
                {s.cols.map((c) => (
                  <th key={c} scope="col">{c}</th>
                ))}
                <th scope="col">Fiyat</th>
                <th scope="col">Teklif</th>
              </tr>
            </thead>
            <tbody>
              {s.codes.map((row) => {
                const code = String(row[0]);
                const ps = yakinlikSensorSlug(code);
                const isProduct = productSlugs.has(ps);
                const subject = encodeURIComponent(`Teklif talebi: Autonics ${code}`);
                const wa = encodeURIComponent(`Merhaba, Autonics ${code} için teklif almak istiyorum.`);
                const pi = YAKINLIK_SENSOR_PRICES[code] ? priceInfo({ price: YAKINLIK_SENSOR_PRICES[code] } as Product) : null;
                return (
                  <tr key={code} id={code}>
                    <th scope="row">{isProduct ? <Link href={`/magaza/${ps}`}>{code}</Link> : code}</th>
                    {row.slice(2).map((v, i) => (
                      <td key={s.cols[i]}>{String(v)}</td>
                    ))}
                    <td className="store-price-wrap" style={{ margin: 0 }}>
                      {pi ? (
                        <>
                          {pi.discount && <s className="store-price-list">{pi.list}</s>}
                          <span className="store-price" style={{ marginTop: 0 }}>{pi.net}</span>
                          {pi.discount && <span className="store-discount">{pi.discount}</span>}
                        </>
                      ) : (
                        "Teklif isteyin"
                      )}
                    </td>
                    <td className="dpu-actions">
                      {isProduct ? (
                        <Link href={`/magaza/${ps}`}>Ürün sayfası</Link>
                      ) : (
                        <>
                          <a href={`mailto:${ORG.email}?subject=${subject}`}>E-posta</a> ·{" "}
                          <a href={`https://wa.me/${WA}?text=${wa}`} target="_blank" rel="noopener noreferrer">
                            WhatsApp
                          </a>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="caption" style={{ margin: 0 }}>
          Kodlar ve açıklamalar Autonics&apos;in resmi distribütör model sayfalarından ve Mert&apos;in sağladığı Autonics 2023 fiyat listesinden alınmıştır.
          Güncel teknik değerler için üretici sayfasına bakınız.
        </p>
      </div>
      {others.length > 0 && (
        <nav aria-label="Aynı kategorideki seriler" className="store-nav">
          <span className="store-nav-cat" style={{ minWidth: 0 }}>{s.cat}:</span>
          {others.map((o) => (
            <Link key={o.slug} href={`/magaza/yakinlik-sensoru-kodlari/${o.slug}`} className="store-chip">
              {o.key} <span>{o.codes.length}</span>
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
