import Image from "next/image";
import Link from "next/link";
import { fullName, priceInfo, type Product } from "@/data/magaza";

export function Price({ p }: { p: Product }) {
  const pr = priceInfo(p);
  if (!pr) return <span className="store-price">Teklif isteyin</span>;
  return (
    <span className="store-price-wrap">
      {pr.discount && <s className="store-price-list">{pr.list}</s>}
      <span className="store-price">{pr.net}</span>
      <span className="store-vat">{pr.vatLabel}</span>
      {pr.discount && <span className="store-discount">{pr.discount}</span>}
    </span>
  );
}

export default function StoreCard({ p }: { p: Product }) {
  return (
    <Link href={`/magaza/${p.slug}`} className="store-card">
      <div className="store-visual">
        {p.image ? (
          <Image src={p.image.src} alt={p.image.alt} fill sizes="360px" style={{ objectFit: "contain" }} />
        ) : (
          <div className="store-visual-empty">
            {p.brandLogo ? (
              <Image src={p.brandLogo.src} alt={p.brand} width={p.brandLogo.w} height={p.brandLogo.h} style={{ width: 120, height: "auto" }} />
            ) : (
              p.brand && <strong className="store-visual-brand">{p.brand}</strong>
            )}
            <span>{p.model}</span>
          </div>
        )}
      </div>
      <div className="store-body">
        <span className="store-cat">{p.category}</span>
        <strong className="store-model">{fullName(p)}</strong>
        <span className="store-name">{p.name}</span>
        {p.option && <span className="store-opt">{p.optionLabel ? p.option : `Seçenek ${p.option}`}</span>}
        <Price p={p} />
      </div>
    </Link>
  );
}
