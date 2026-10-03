import type { Metadata } from "next";
import Link from "next/link";
import { DPU_CODES, DPU_GROUPS, DPU_OPTION } from "@/data/dpuCodes";
import { breadcrumbJsonLd, REGION_LINE, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Autonics DPU Model Kodları: Tüm Tristörlü Güç Kontrol Üniteleri | Ankara",
  description: `Autonics DPU serisi ${DPU_CODES.length} sipariş kodu: monofaze ve trifaze, 110–480 V, 25–600 A, RS485 ve harici gösterge seçenekleri. Her kod için teklif ve tedarik. ${REGION_LINE}`,
  keywords: ["Autonics DPU", "DPU model kodu", "DPU fiyat", "tristörlü güç kontrol ünitesi", "SCR güç kontrolörü", "DPU34", "DPU32", "DPU14", "DPU12"],
  alternates: { canonical: "/magaza/dpu-kodlari" },
  openGraph: { type: "website", locale: "tr_TR", url: "/magaza/dpu-kodlari", siteName: "AOM", title: "Autonics DPU model kodları", description: `${DPU_CODES.length} sipariş kodu için teklif ve tedarik. ${REGION_LINE}` },
};

export default function DpuKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics DPU model kodları",
      url: `${SITE}/magaza/dpu-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: DPU_GROUPS.map((g) => ({ "@type": "WebPage", name: `Autonics ${g.prefix} kodları`, url: `${SITE}/magaza/dpu-kodlari/${g.id}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Tristörlü güç kontrol", path: "/magaza/kategori/tristorlu-guc-kontrol" },
      { name: "DPU model kodları", path: "/magaza/dpu-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/magaza/kategori/tristorlu-guc-kontrol">Tristörlü güç kontrol</Link> <span aria-hidden="true">/</span> <span>DPU model kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <div className="eyebrow">Tristörlü güç kontrol · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics DPU model kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Autonics DPU dijital tristörlü (SCR) güç kontrol ünitelerinin {DPU_CODES.length} sipariş kodunun tamamı aşağıdaki sayfalarda listelenir: monofaze
          ve trifaze, 110–480 V, 25–600 A. Listede olan her kod için teklif verir ve tedarik ederiz. Mağazada fiyatıyla satılan DPU modelleri için{" "}
          <Link href="/magaza/seri/autonics-dpu3">DPU3 seri sayfasına</Link> bakın.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>Kod gruplarına göre</h2>
        <ul className="dpu-groups">
          {DPU_GROUPS.map((g) => (
            <li key={g.id}>
              <Link href={`/magaza/dpu-kodlari/${g.id}`} className="dpu-group">
                <strong>{g.prefix}</strong>
                <span>{g.label}</span>
                <span className="store-count" style={{ marginLeft: 0 }}>{g.codes.length} kod</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 900 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>Model kodu nasıl okunur?</h2>
        <p style={{ margin: 0 }}>
          <code className="dpu-code-sample">DPU 3 4 B - 150 R (-A)</code>
        </p>
        <table className="spec-table">
          <tbody>
            <tr><th scope="row">Faz</th><td>1 = tek faz (monofaze), 3 = 3 faz (trifaze)</td></tr>
            <tr><th scope="row">Gerilim</th><td>1 = 110 V, 2 = 220 V, 3 = 380 V, 4 = 440 V, 5 = 480 V (480 V yalnız trifaze)</td></tr>
            <tr><th scope="row">Gövde ve akım (trifaze)</th><td>A: 25 / 40 / 50 A · B: 70 / 80 / 100 / 120 / 150 / 180 / 200 A · C: 250 / 350 A · D: 400 / 500 / 600 A</td></tr>
            <tr><th scope="row">Gövde ve akım (monofaze)</th><td>A: 25 / 40 / 50 / 70 A · B: 80 / 100 / 120 / 150 / 180 / 200 A · C: 250 / 350 A · D: 400 / 500 / 600 A</td></tr>
            <tr><th scope="row">Seçenek</th><td>{Object.entries(DPU_OPTION).map(([k, v]) => `${k} = ${v}`).join(" · ")}</td></tr>
            <tr><th scope="row">-A soneki</th><td>Trifaze modellerde ayrı sipariş kodu olarak bulunur.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
