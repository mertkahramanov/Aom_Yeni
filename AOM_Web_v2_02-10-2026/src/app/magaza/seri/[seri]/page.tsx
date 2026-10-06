import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoreCard from "@/components/StoreCard";
import { fullName, priceInfo, storeSeries } from "@/data/magaza";
import { breadcrumbJsonLd, REGION_LINE, SITE } from "@/lib/seo";

const find = (slug: string) => storeSeries().find((s) => s.slug === slug);
const kind = (cat: string, k?: string) => k ?? (cat.startsWith("Solid") ? "Solid State Röle (SSR)" : "Tristörlü Güç Kontrol Ünitesi");

export function generateStaticParams() {
  return storeSeries().map((s) => ({ seri: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ seri: string }> }): Promise<Metadata> {
  const s = find((await params).seri);
  if (!s) return {};
  const url = `/magaza/seri/${s.slug}`;
  const amps = s.items.map((p) => p.current ?? 0);
  const k = kind(s.category, s.items[0].kindLabel);
  const title = `${s.title} ${k} Modelleri | Ankara`;
  const description = s.items[0].kindLabel
    ? `${s.title} serisi ${k.toLocaleLowerCase("tr-TR")}: ${s.items.length} model. Teknik özellikler ve teklif. ${REGION_LINE}`
    : `${s.title} serisi ${s.category.startsWith("Solid") ? "solid state röle (SSR)" : "tristörlü güç kontrol ünitesi"}: ${s.items.length} model, ${Math.min(...amps)}–${Math.max(...amps)} A. Teknik özellikler ve fiyatlar (KDV hariç). ${REGION_LINE}`;
  return {
    title,
    description,
    keywords: [s.title, `${s.title} fiyat`, k, `${k} Ankara`, ...s.items.slice(0, 10).map((p) => p.model)],
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description },
  };
}

export default async function SeriPage({ params }: { params: Promise<{ seri: string }> }) {
  const s = find((await params).seri);
  if (!s) notFound();
  const first = s.items[0];
  const hasAmp = s.items.some((p) => p.current !== undefined);
  const url = `${SITE}/magaza/seri/${s.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${s.title} ${kind(s.category, first.kindLabel)}`,
      url,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: s.items.length,
        itemListElement: s.items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/magaza/${p.slug}`, name: fullName(p) })),
      },
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: s.category, path: `/magaza/kategori/${s.categoryId}` },
      { name: s.title, path: `/magaza/seri/${s.slug}` },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <Link href={`/magaza/kategori/${s.categoryId}`}>{s.category}</Link> <span aria-hidden="true">/</span> <span>{s.title}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <div className="eyebrow">{s.category}</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>
          {s.title} {kind(s.category, first.kindLabel)}
        </h1>
        {first.seriesIntro && <p style={{ margin: 0, color: "var(--ink-muted)" }}>{first.seriesIntro}</p>}
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE} Fiyatlar KDV hariçtir; %20 KDV eklenir.</p>
        {s.slug === "autonics-dpu3" && (
          <p style={{ margin: 0 }}>
            Bu sayfada fiyatıyla satılan modeller var. DPU serisinin 840 sipariş kodunun tamamı için: <Link href="/magaza/dpu-kodlari">DPU model kodları</Link>
          </p>
        )}
      </div>
      {s.items.length > 48 && first.image && (
        <div className="store-visual" style={{ maxWidth: 360, borderRadius: 8, border: "1px solid var(--line)" }}>
          <Image src={first.image.src} alt={first.image.alt} fill sizes="360px" style={{ objectFit: "contain" }} />
        </div>
      )}
      <div style={{ overflowX: "auto" }}>
        <table className="spec-table series-table">
          <thead>
            <tr>
              <th scope="col">Model</th>
              {hasAmp && <th scope="col">Akım</th>}
              <th scope="col">{first.bodyLabel ?? "Gövde"}</th>
              <th scope="col">{first.optionLabel ?? "Seçenek"}</th>
              <th scope="col">Fiyat</th>
            </tr>
          </thead>
          <tbody>
            {s.items.map((p) => {
              const pr = priceInfo(p);
              return (
                <tr key={p.slug}>
                  <th scope="row">
                    <Link href={`/magaza/${p.slug}`}>{p.model}</Link>
                  </th>
                  {hasAmp && <td>{p.current} A</td>}
                  <td>{p.bodySize}</td>
                  <td>{p.option}</td>
                  <td>{pr ? `${pr.net} + KDV` : "Teklif isteyin"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {s.items.length <= 48 && (
      <ul className="store-grid">
        {s.items.map((p) => (
          <li key={p.slug}>
            <StoreCard p={p} />
          </li>
        ))}
      </ul>
      )}
    </section>
  );
}
