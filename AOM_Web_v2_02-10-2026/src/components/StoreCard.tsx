import Image from "next/image";
import Link from "next/link";
import { fullName, priceInfo, type Product } from "@/data/magaza";
import type { Locale } from "@/i18n/locales";
import { translateCategoryTitle } from "@/i18n/pages/magaza-categories";
import { URUN_UI, USED_BADGE } from "@/i18n/pages/magaza-urun";

// locale: verilirse (çok dilli mağaza sayfalarından çağrıldığında, 19-10-2026) ürün linki
// /{locale}/magaza/{slug}'a gider ve "Teklif isteyin"/"2. el"/kategori/"Seçenek" etiketleri çevrilir;
// verilmezse (TR sayfalardan çağrıldığında) eski davranış aynen korunur. Ürünün kendi verisi
// (isim, model, kategori adı hariç) Türkçe kalır — bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md.
export function Price({ p, locale }: { p: Product; locale?: Locale }) {
  const pr = priceInfo(p);
  if (!pr) return <span className="store-price">{locale ? URUN_UI[locale].requestQuoteCell : "Teklif isteyin"}</span>;
  return (
    <span className="store-price-wrap">
      {pr.discount && <s className="store-price-list">{pr.list}</s>}
      <span className="store-price">{pr.net}</span>
      <span className="store-vat">{pr.vatLabel}</span>
      {pr.discount && <span className="store-discount">{pr.discount}</span>}
    </span>
  );
}

export default function StoreCard({ p, locale }: { p: Product; locale?: Locale }) {
  const href = locale ? `/${locale}/magaza/${p.slug}` : `/magaza/${p.slug}`;
  const category = locale ? translateCategoryTitle(p.category, locale) : p.category;
  const optionLabel = p.option
    ? p.optionLabel
      ? p.option
      : locale
      ? `${URUN_UI[locale].colOption} ${p.option}`
      : `Seçenek ${p.option}`
    : undefined;
  return (
    <Link href={href} className="store-card">
      <div className="store-visual">
        {p.used && <span className="used-badge used-badge-card">{locale ? USED_BADGE[locale] : "2. el"}</span>}
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
        <span className="store-cat">{category}</span>
        <strong className="store-model">{fullName(p)}</strong>
        <span className="store-name">{p.name}</span>
        {optionLabel && <span className="store-opt">{optionLabel}</span>}
        <Price p={p} locale={locale} />
      </div>
    </Link>
  );
}
