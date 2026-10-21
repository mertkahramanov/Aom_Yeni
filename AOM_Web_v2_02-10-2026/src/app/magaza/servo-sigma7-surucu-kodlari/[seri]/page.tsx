import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeFilter from "@/components/CodeFilter";
import { SV_S7SURUCU_SERIES, svS7SurucuSeries } from "@/data/yaskawa-servo-sigma7-surucu";
import { breadcrumbJsonLd, hreflangAlternates, ORG, REGION_LINE, SITE } from "@/lib/seo";

const WA = ORG.telephone.replace(/\D/g, "");

export function generateStaticParams() {
  return SV_S7SURUCU_SERIES.map((s) => ({ seri: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ seri: string }> }): Promise<Metadata> {
  const s = svS7SurucuSeries((await params).seri);
  if (!s) return {};
  const url = `/magaza/servo-sigma7-surucu-kodlari/${s.slug}`;
  const title = `Yaskawa ${s.key} Model Kodları (${s.codes.length} Model) | Ankara`;
  const description = `Yaskawa ${s.key}: ${s.codes.length} model. ${s.note} Her model için teklif. ${REGION_LINE}`;
  return {
    title,
    description,
    keywords: [`Yaskawa ${s.key}`, `${s.key} fiyat`, `${s.key} servo sürücü`, ...s.codes.slice(0, 12).map((c) => String(c[0]))],
    alternates: { canonical: url, languages: hreflangAlternates(url) },
    openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description, images: s.img ? [{ url: `/magaza/${s.img}` }] : undefined },
  };
}

export default async function ServoSigma7SurucuSeriKodPage({ params }: { params: Promise<{ seri: string }> }) {
  const s = svS7SurucuSeries((await params).seri);
  if (!s) notFound();
  const disc = s.codes.filter((c) => c[1] === 1).length;
  const tableId = `kodlar-${s.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Yaskawa ${s.key} model kodları`,
      url: `${SITE}/magaza/servo-sigma7-surucu-kodlari/${s.slug}`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      about: { "@type": "Product", name: `Yaskawa ${s.key}`, brand: { "@type": "Brand", name: "Yaskawa" }, url: `${SITE}/magaza/servo-sigma7-surucu-kodlari/${s.slug}` },
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Sigma-7 servo sürücü model kodları", path: "/magaza/servo-sigma7-surucu-kodlari" },
      { name: s.key, path: `/magaza/servo-sigma7-surucu-kodlari/${s.slug}` },
    ]),
  ];
  const others = SV_S7SURUCU_SERIES.filter((x) => x.slug !== s.slug);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/magaza/servo-sigma7-surucu-kodlari">Sigma-7 servo sürücü model kodları</Link> <span aria-hidden="true">/</span> <span>{s.key}</span>
      </nav>
      <div className="product-layout" style={{ alignItems: "start" }}>
        {s.img && s.imgSize && (
          <div className="store-visual product-visual">
            <Image src={`/magaza/${s.img}`} alt={`Yaskawa ${s.key} (temsili görsel)`} fill sizes="560px" style={{ objectFit: "contain" }} priority />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="eyebrow">Yaskawa Servo Sistemler</div>
          <h1 style={{ fontWeight: 800, fontSize: 36, lineHeight: 1.08 }}>Yaskawa {s.key} model kodları</h1>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            {s.note} Bu sayfada serinin {s.codes.length} modelinin tamamı listelenir
            {disc ? `; ${disc} model üretimden kalkmış olarak işaretlidir (muadil için bize danışın)` : ""}. Listedeki her model için teklif verir ve tedarik
            ederiz; modelin yanındaki bağlantıdan e-posta veya WhatsApp ile talep gönderebilirsiniz.
          </p>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>
          {s.codes.length} model
        </h2>
        {s.codes.length > 20 && <CodeFilter tableId={tableId} total={s.codes.length} />}
        <div style={{ overflowX: "auto" }}>
          <table id={tableId} className="spec-table series-table dpu-table enc-table">
            <thead>
              <tr>
                <th scope="col">Model kodu</th>
                {s.cols.map((c) => (
                  <th key={c} scope="col">{c}</th>
                ))}
                <th scope="col">Durum</th>
                <th scope="col">Teklif</th>
              </tr>
            </thead>
            <tbody>
              {s.codes.map((row, idx) => {
                const code = String(row[0]);
                const off = row[1] === 1;
                const subject = encodeURIComponent(`Teklif talebi: Yaskawa ${code}`);
                const wa = encodeURIComponent(`Merhaba, Yaskawa ${code} için teklif almak istiyorum.`);
                return (
                  <tr key={`${code}-${idx}`} id={`${code.replace(/[^A-Za-z0-9-]/g, "")}-${idx}`}>
                    <th scope="row">{code}</th>
                    {row.slice(2).map((v, i) => (
                      <td key={s.cols[i]}>{String(v)}</td>
                    ))}
                    <td className={off ? "enc-status-off" : undefined}>{off ? "Üretimden kalktı" : "Üretimde"}</td>
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
          Model kodları ve teknik değerler Yaskawa Türkiye sitesinden (yaskawa.com.tr) alınmıştır (20-10-2026). Güncel değerler için üretici sayfasına
          bakınız.
        </p>
      </div>

      {others.length > 0 && (
        <nav aria-label="Diğer seriler" className="store-nav">
          <span className="store-nav-cat" style={{ minWidth: 0 }}>Diğer seriler:</span>
          {others.map((o) => (
            <Link key={o.slug} href={`/magaza/servo-sigma7-surucu-kodlari/${o.slug}`} className="store-chip">
              {o.key} <span>{o.codes.length}</span>
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
