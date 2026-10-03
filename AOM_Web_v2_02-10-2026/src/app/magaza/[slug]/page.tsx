import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, priceInfo, products } from "@/data/magaza";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: `${p.brand} ${p.model}`, description: p.summary } : {};
}

export default async function UrunPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const pr = priceInfo(p);
  const mail = `mailto:info@aomtechnology.tr?subject=${encodeURIComponent(`Teklif talebi: ${p.brand} ${p.model}`)}`;
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span> <span>{p.model}</span>
      </nav>
      <div className="product-layout">
        <div className="store-visual product-visual">
          {p.image ? (
            <Image src={p.image.src} alt={p.image.alt} fill sizes="560px" style={{ objectFit: "contain" }} />
          ) : (
            <div className="store-visual-empty">
              <Image src={p.brandLogo.src} alt={p.brand} width={p.brandLogo.w} height={p.brandLogo.h} style={{ width: 160, height: "auto" }} />
              <span>{p.model}</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span className="eyebrow">{p.category}</span>
          <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.05 }}>
            {p.brand} {p.model}
          </h1>
          <p className="lead" style={{ fontSize: 17 }}>{p.name}</p>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{p.summary}</p>
          {pr ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="store-price-wrap">
                {pr.discount && <s className="store-price-list" style={{ fontSize: 16 }}>{pr.list}</s>}
                <span className="store-price" style={{ fontSize: 28, marginTop: 0 }}>{pr.net}</span>
                {pr.discount && <span className="store-discount">{pr.discount}</span>}
              </span>
              {pr.note && <span className="caption">{pr.note}</span>}
            </div>
          ) : (
            <div className="store-price" style={{ fontSize: 18 }}>Fiyat ve teslim süresi için teklif isteyin</div>
          )}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={mail} className="btn btn-primary">{pr ? "Sipariş / teklif isteyin" : "Teklif isteyin"}</a>
            <a href={p.source.url} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
              {p.source.label}
            </a>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>Teknik özellikler</h2>
        <table className="spec-table">
          <tbody>
            {p.specs.map((s) => (
              <tr key={s.label}>
                <th scope="row">{s.label}</th>
                <td>{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="caption">Teknik veriler Autonics ürün sayfasından alınmıştır; * işaretli değerler DPU serisi kataloğundandır. Güncel değerler için üretici sayfasına bakınız.</p>
      </div>
    </section>
  );
}
