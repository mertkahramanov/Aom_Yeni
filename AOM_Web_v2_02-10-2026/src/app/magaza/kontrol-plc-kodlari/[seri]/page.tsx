import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeFilter from "@/components/CodeFilter";
import { getProduct } from "@/data/magaza";
import { KN_PLC_SERIES, plcGroup } from "@/data/yaskawa-kontrol-plc";
import { breadcrumbJsonLd, hreflangAlternates, ORG, REGION_LINE, SITE } from "@/lib/seo";

const WA = ORG.telephone.replace(/\D/g, "");

export function generateStaticParams() {
  return KN_PLC_SERIES.map((s) => ({ seri: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ seri: string }> }): Promise<Metadata> {
  const s = plcGroup((await params).seri);
  if (!s) return {};
  const url = `/magaza/kontrol-plc-kodlari/${s.slug}`;
  const first = String(s.codes[0][0]);
  const last = String(s.codes[s.codes.length - 1][0]);
  const title = `${s.title} Sipariş Kodları (${s.codes.length} Model) | Ankara`;
  const description = `${s.title}: ${s.codes.length} sipariş kodu, ${first} … ${last}. VIPA (Yaskawa'nın satın aldığı marka) PLC/IO modülleri; model adı ve teknik özetiyle. Her kod için teklif. ${REGION_LINE}`;
  return {
    title,
    description,
    keywords: [s.title, `${s.group[1]} modül`, "VIPA PLC", "Yaskawa VIPA PLC", ...s.codes.slice(0, 12).map((c) => String(c[0]))],
    alternates: { canonical: url, languages: hreflangAlternates(url) },
    openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description, images: s.img ? [{ url: `/magaza/${s.img}` }] : undefined },
  };
}

export default async function KontrolPlcSeriKodPage({ params }: { params: Promise<{ seri: string }> }) {
  const s = plcGroup((await params).seri);
  if (!s) notFound();
  const productSlug = `vipa-${s.key}`;
  const product = getProduct(productSlug);
  const tableId = `kodlar-${s.slug}`;
  const typeLabel = s.title.startsWith(`${s.group[1]} `) ? s.title.slice(s.group[1].length + 1) : s.title;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${s.title} sipariş kodları`,
      url: `${SITE}/magaza/kontrol-plc-kodlari/${s.slug}`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      about: { "@type": "Product", name: s.title, brand: { "@type": "Brand", name: "VIPA" }, url: product ? `${SITE}/magaza/${product.slug}` : undefined },
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "PLC model kodları", path: "/magaza/kontrol-plc-kodlari" },
      { name: s.title, path: `/magaza/kontrol-plc-kodlari/${s.slug}` },
    ]),
  ];
  const others = KN_PLC_SERIES.filter((x) => x.group[0] === s.group[0] && x.slug !== s.slug);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/magaza/kontrol-plc-kodlari">PLC model kodları</Link> <span aria-hidden="true">/</span> <span>{typeLabel}</span>
      </nav>
      <div className="product-layout" style={{ alignItems: "start" }}>
        {s.img && s.imgSize && (
          <div className="store-visual product-visual">
            <Image src={`/magaza/${s.img}`} alt={`${s.group[1]} serisi (temsili görsel)`} fill sizes="560px" style={{ objectFit: "contain" }} priority />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="eyebrow">{s.group[1]}</div>
          <h1 style={{ fontWeight: 800, fontSize: 36, lineHeight: 1.08 }}>{s.title} sipariş kodları</h1>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            {s.note} Bu sayfada grubun {s.codes.length} sipariş kodunun tamamı listelenir. Listedeki her kod için teklif verir ve tedarik ederiz; kodun
            yanındaki bağlantıdan e-posta veya WhatsApp ile talep gönderebilirsiniz.
          </p>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
          {product && (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={`/magaza/${product.slug}`} className="btn btn-primary">
                {typeLabel} grubu ve teknik tablo
              </Link>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>
          {s.codes.length} sipariş kodu
        </h2>
        {s.codes.length > 20 && <CodeFilter tableId={tableId} total={s.codes.length} />}
        <div style={{ overflowX: "auto" }}>
          <table id={tableId} className="spec-table series-table dpu-table enc-table">
            <thead>
              <tr>
                <th scope="col">Sipariş kodu</th>
                {s.cols.map((c) => (
                  <th key={c} scope="col">{c}</th>
                ))}
                <th scope="col">Teklif</th>
              </tr>
            </thead>
            <tbody>
              {s.codes.map((row) => {
                const code = String(row[0]);
                const subject = encodeURIComponent(`Teklif talebi: VIPA ${code}`);
                const wa = encodeURIComponent(`Merhaba, VIPA ${code} için teklif almak istiyorum.`);
                return (
                  <tr key={code} id={code}>
                    <th scope="row">{code}</th>
                    {row.slice(2).map((v, i) => (
                      <td key={s.cols[i]}>{String(v)}</td>
                    ))}
                    <td className="dpu-actions">
                      <a href={`mailto:${ORG.email}?subject=${subject}`}>E-posta</a> ·{" "}
                      <a href={`https://wa.me/${WA}?text=${wa}`} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="caption" style={{ margin: 0 }}>
          Kodlar ve teknik özetler Yaskawa Türkiye&apos;nin resmi seri sayfasından alınmıştır (20-10-2026). VIPA, Yaskawa&apos;nın satın aldığı bir kontrol
          sistemleri markasıdır; güncel teknik değerler için üretici sayfasına bakınız.
        </p>
      </div>

      {others.length > 0 && (
        <nav aria-label="Aynı seri içindeki diğer gruplar" className="store-nav">
          <span className="store-nav-cat" style={{ minWidth: 0 }}>{s.group[1]}:</span>
          {others.map((o) => {
            const oLabel = o.title.startsWith(`${o.group[1]} `) ? o.title.slice(o.group[1].length + 1) : o.title;
            return (
              <Link key={o.slug} href={`/magaza/kontrol-plc-kodlari/${o.slug}`} className="store-chip">
                {oLabel} <span>{o.codes.length}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </section>
  );
}
