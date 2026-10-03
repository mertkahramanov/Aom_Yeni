import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { priceInfo, products } from "@/data/magaza";

export const metadata: Metadata = {
  title: "Mağaza",
  description: "AOM mağazası: endüstriyel otomasyon ürünleri ve güç kontrol üniteleri.",
};

function Price({ p }: { p: (typeof products)[number] }) {
  const pr = priceInfo(p);
  if (!pr) return <span className="store-price">Teklif isteyin</span>;
  return (
    <span className="store-price-wrap">
      {pr.discount && <s className="store-price-list">{pr.list}</s>}
      <span className="store-price">{pr.net}</span>
      {pr.discount && <span className="store-discount">{pr.discount}</span>}
    </span>
  );
}

export default function MagazaPage() {
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 760 }}>
        <div className="rule" />
        <div className="eyebrow">Mağaza</div>
        <h1 style={{ fontWeight: 800, fontSize: 44, lineHeight: 1.05 }}>AOM Mağaza</h1>
        <p className="lead">Otomasyon ürünleri ve güç kontrol üniteleri. Fiyat ve teslim süresi için teklif isteyin.</p>
      </div>
      <ul className="store-grid">
        {products.map((p) => (
          <li key={p.slug}>
            <Link href={`/magaza/${p.slug}`} className="store-card">
              <div className="store-visual">
                {p.image ? (
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="360px" style={{ objectFit: "contain" }} />
                ) : (
                  <div className="store-visual-empty">
                    <Image src={p.brandLogo.src} alt={p.brand} width={p.brandLogo.w} height={p.brandLogo.h} style={{ width: 120, height: "auto" }} />
                    <span>{p.model}</span>
                  </div>
                )}
              </div>
              <div className="store-body">
                <span className="store-cat">{p.category}</span>
                <strong className="store-model">{p.brand} {p.model}</strong>
                <span className="store-name">{p.name}</span>
                <Price p={p} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
