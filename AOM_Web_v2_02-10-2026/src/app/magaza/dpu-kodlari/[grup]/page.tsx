import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DPU_GROUPS, DPU_OPTION, dpuGroup } from "@/data/dpuCodes";
import { products } from "@/data/magaza";
import { breadcrumbJsonLd, ORG, REGION_LINE, SITE } from "@/lib/seo";

const WA = ORG.telephone.replace(/\D/g, "");

export function generateStaticParams() {
  return DPU_GROUPS.map((g) => ({ grup: g.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ grup: string }> }): Promise<Metadata> {
  const g = dpuGroup((await params).grup);
  if (!g) return {};
  const url = `/magaza/dpu-kodlari/${g.id}`;
  const title = `Autonics ${g.prefix} Kodları – ${g.phase === 3 ? "3 Faz" : "Tek Faz"} ${g.voltage} V Tristör Güç Kontrol | Ankara`;
  const description = `Autonics ${g.prefix} (${g.label}) tristörlü güç kontrol ünitesi sipariş kodları: ${g.codes.length} kod, 25–600 A, ${g.codes[0].code} … ${g.codes[g.codes.length - 1].code}. Her kod için teklif ve tedarik. ${REGION_LINE}`;
  return {
    title,
    description,
    keywords: [`Autonics ${g.prefix}`, `${g.prefix} fiyat`, ...g.codes.filter((c) => !c.suffixA).slice(0, 12).map((c) => c.code)],
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description },
  };
}

export default async function DpuGrupPage({ params }: { params: Promise<{ grup: string }> }) {
  const g = dpuGroup((await params).grup);
  if (!g) notFound();
  const productBy = new Map(products.map((p) => [p.model, p.slug]));
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Autonics ${g.prefix} model kodları`,
      url: `${SITE}/magaza/dpu-kodlari/${g.id}`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      about: { "@type": "Thing", name: `Autonics ${g.prefix} tristörlü güç kontrol ünitesi` },
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "DPU model kodları", path: "/magaza/dpu-kodlari" },
      { name: g.prefix, path: `/magaza/dpu-kodlari/${g.id}` },
    ]),
  ];
  const others = DPU_GROUPS.filter((x) => x.id !== g.id);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/magaza/dpu-kodlari">DPU model kodları</Link> <span aria-hidden="true">/</span> <span>{g.prefix}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Autonics DPU · {g.label}</div>
        <h1 style={{ fontWeight: 800, fontSize: 38, lineHeight: 1.08 }}>
          Autonics {g.prefix} model kodları: {g.phase === 3 ? "3 faz" : "tek faz"} {g.voltage} V tristörlü güç kontrol
        </h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          {g.prefix} grubunda {g.codes.length} sipariş kodu vardır: {g.phase === 3 ? "trifaze" : "monofaze"} {g.voltage} V şebeke, 25–600 A, A / B / C / D gövde.
          Listedeki her kod için teklif verir ve tedarik ederiz; kodun yanındaki bağlantıdan e-posta veya WhatsApp ile talep gönderebilirsiniz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="spec-table series-table dpu-table">
          <thead>
            <tr>
              <th scope="col">Model kodu</th>
              <th scope="col">Akım</th>
              <th scope="col">Gövde</th>
              <th scope="col">Seçenek</th>
              <th scope="col">Teklif</th>
            </tr>
          </thead>
          <tbody>
            {g.codes.map((c) => {
              const slug = productBy.get(c.code);
              const subject = encodeURIComponent(`Teklif talebi: Autonics ${c.code}`);
              const wa = encodeURIComponent(`Merhaba, Autonics ${c.code} için teklif almak istiyorum.`);
              return (
                <tr key={c.code} id={c.code}>
                  <th scope="row">{slug ? <Link href={`/magaza/${slug}`}>{c.code}</Link> : c.code}</th>
                  <td>{c.current} A</td>
                  <td>{c.body}</td>
                  <td>
                    {DPU_OPTION[c.option]}
                    {c.suffixA ? " (-A)" : ""}
                  </td>
                  <td className="dpu-actions">
                    {slug ? (
                      <Link href={`/magaza/${slug}`}>Ürün sayfası</Link>
                    ) : (
                      <>
                        <a href={`mailto:${ORG.email}?subject=${subject}`}>E-posta</a> · <a href={`https://wa.me/${WA}?text=${wa}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav aria-label="Diğer DPU kod grupları" className="store-nav">
        <span className="store-nav-cat" style={{ minWidth: 0 }}>Diğer gruplar:</span>
        {others.map((o) => (
          <Link key={o.id} href={`/magaza/dpu-kodlari/${o.id}`} className="store-chip">
            {o.prefix} · {o.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
