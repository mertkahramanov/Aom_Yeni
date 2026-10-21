import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeFilter from "@/components/CodeFilter";
import { SV_SXMOTOR_SERIES, sxMotorSeries } from "@/data/yaskawa-servo-sigmax-motor";
import { breadcrumbJsonLd, hreflangAlternates, ORG, REGION_LINE, SITE } from "@/lib/seo";

const WA = ORG.telephone.replace(/\D/g, "");

export function generateStaticParams() {
  return SV_SXMOTOR_SERIES.map((s) => ({ seri: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ seri: string }> }): Promise<Metadata> {
  const s = sxMotorSeries((await params).seri);
  if (!s) return {};
  const url = `/magaza/servo-sigmax-motor-kodlari/${s.slug}`;
  const first = String(s.codes[0][0]);
  const last = String(s.codes[s.codes.length - 1][0]);
  const title = `Yaskawa ${s.key} Model Kodları (${s.codes.length} Kayıt) | Ankara`;
  const description = `Yaskawa ${s.key} ${s.title}: ${s.codes.length} model kaydı, ${first} … ${last}. Anma torku, anma hızı, gerilim, enkoder tipi ve flanş çapı bilgisiyle; her kod için teklif. ${REGION_LINE}`;
  return {
    title,
    description,
    keywords: [`Yaskawa ${s.key}`, `${s.key} servo motor`, `${s.key} fiyat`, "Yaskawa Sigma-X", ...s.codes.slice(0, 12).map((c) => String(c[0]))],
    alternates: { canonical: url, languages: hreflangAlternates(url) },
    openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description, images: s.img ? [{ url: `/magaza/${s.img}` }] : undefined },
  };
}

export default async function ServoSigmaXMotorSeriKodPage({ params }: { params: Promise<{ seri: string }> }) {
  const s = sxMotorSeries((await params).seri);
  if (!s) notFound();
  const productHref = `/magaza/${`yaskawa-${s.slug}-servo-motor`}`;
  const noteSpec = s.specs.find(([label]) => label === "Not");
  const summarySpecs = s.specs.filter(([label]) => label !== "Not" && label !== "Kayıt sayısı" && label !== "Seri");
  const tableId = `kodlar-${s.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Yaskawa ${s.key} model kodları`,
      url: `${SITE}/magaza/servo-sigmax-motor-kodlari/${s.slug}`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      about: { "@type": "Product", name: `Yaskawa ${s.key}`, brand: { "@type": "Brand", name: "Yaskawa" }, url: `${SITE}${productHref}` },
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Servo motor model kodları", path: "/magaza/servo-sigmax-motor-kodlari" },
      { name: s.key, path: `/magaza/servo-sigmax-motor-kodlari/${s.slug}` },
    ]),
  ];
  const others = SV_SXMOTOR_SERIES.filter((x) => x.slug !== s.slug);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/magaza/servo-sigmax-motor-kodlari">Servo motor model kodları</Link> <span aria-hidden="true">/</span> <span>{s.key}</span>
      </nav>
      <div className="product-layout" style={{ alignItems: "start" }}>
        {s.img && s.imgSize && (
          <div className="store-visual product-visual">
            <Image src={`/magaza/${s.img}`} alt={`Yaskawa ${s.key} Sigma-X rotary servo motor`} fill sizes="560px" style={{ objectFit: "contain" }} priority />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="eyebrow">Sigma-X Rotary Servomotors</div>
          <h1 style={{ fontWeight: 800, fontSize: 36, lineHeight: 1.08 }}>Yaskawa {s.key} model kodları</h1>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            {s.note} Bu sayfada serinin {s.codes.length} model kaydının tamamı listelenir. Listedeki her kod için teklif verir ve tedarik ederiz;
            kodun yanındaki bağlantıdan e-posta veya WhatsApp ile talep gönderebilirsiniz.
          </p>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={productHref} className="btn btn-primary">
              {s.key} serisi ve teknik tablo
            </Link>
          </div>
        </div>
      </div>

      {summarySpecs.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 900 }}>
          <h2 className="h2" style={{ fontSize: 24 }}>{s.key} seri özeti</h2>
          <table className="spec-table">
            <tbody>
              {summarySpecs.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {noteSpec && (
            <p className="caption" style={{ margin: 0 }}>
              {noteSpec[1]}
            </p>
          )}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>
          {s.codes.length} model kaydı
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
                <th scope="col">Teklif</th>
              </tr>
            </thead>
            <tbody>
              {s.codes.map((row) => {
                const code = String(row[0]);
                const subject = encodeURIComponent(`Teklif talebi: Yaskawa ${code}`);
                const wa = encodeURIComponent(`Merhaba, Yaskawa ${code} için teklif almak istiyorum.`);
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
          Kodlar ve teknik değerler Yaskawa Türkiye&apos;nin resmi ürün sayfalarından, her model için ayrı ayrı okunarak alınmıştır (20-10-2026).
          Güncel teknik değerler için üretici sayfasına bakınız; sipariş kodu üreticinin sitesinde yayınlanmadığından fiyat için teklif isteyin.
        </p>
      </div>

      {others.length > 0 && (
        <nav aria-label="Diğer Sigma-X serileri" className="store-nav">
          <span className="store-nav-cat" style={{ minWidth: 0 }}>Sigma-X Rotary Servomotors:</span>
          {others.map((o) => (
            <Link key={o.slug} href={`/magaza/servo-sigmax-motor-kodlari/${o.slug}`} className="store-chip">
              {o.key} <span>{o.codes.length}</span>
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
