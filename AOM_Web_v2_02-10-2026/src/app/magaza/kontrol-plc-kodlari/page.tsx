import type { Metadata } from "next";
import Link from "next/link";
import { KN_PLC_GROUPS, KN_PLC_TOTAL, MICRO_PLC_TOTAL } from "@/data/yaskawa-kontrol-plc";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = KN_PLC_TOTAL.toLocaleString("tr-TR");
const GRAND_TOTAL = (KN_PLC_TOTAL + MICRO_PLC_TOTAL).toLocaleString("tr-TR");

export const metadata: Metadata = {
  title: "VIPA (Yaskawa) PLC Model Kodları: SLIO ve 300S+ Tüm Modüller | Ankara",
  description: `VIPA SLIO ve 300S+ PLC/IO sistemi sipariş kodları: ${TOTAL} model (CPU, arayüz, güç kaynağı, iletişim işlemcisi, fonksiyon ve sinyal modülleri). VIPA, Yaskawa'nın satın aldığı marka. Her kod için teklif. ${REGION_LINE}`,
  keywords: ["VIPA PLC kodu", "VIPA SLIO", "VIPA 300S+", "Yaskawa VIPA PLC", "SPEED7 PLC", "VIPA SLIO modül", "VIPA 300S CPU", "VIPA PLC fiyat"],
  alternates: { canonical: "/magaza/kontrol-plc-kodlari", languages: hreflangAlternates("/magaza/kontrol-plc-kodlari") },
  openGraph: { type: "website", locale: "tr_TR", url: "/magaza/kontrol-plc-kodlari", siteName: "AOM", title: "VIPA (Yaskawa) PLC model kodları", description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}` },
};

export default function KontrolPlcKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "VIPA (Yaskawa) PLC model kodları",
      url: `${SITE}/magaza/kontrol-plc-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: KN_PLC_GROUPS.flatMap((g) => g.series).map((s) => ({ "@type": "WebPage", name: s.title, url: `${SITE}/magaza/kontrol-plc-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Kontrol Sistemleri (PLC)", path: "/magaza/kategori/kontrol-sistemleri-plc" },
      { name: "PLC model kodları", path: "/magaza/kontrol-plc-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/magaza/kategori/kontrol-sistemleri-plc">Kontrol Sistemleri (PLC)</Link> <span aria-hidden="true">/</span> <span>PLC model kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 900 }}>
        <div className="eyebrow">Kontrol Sistemleri (PLC) · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>VIPA (Yaskawa) PLC model kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          VIPA SLIO ve 300S+ PLC/IO sistemlerinin {TOTAL} modelinin tamamı, tip gruplarına (CPU, arayüz modülü, güç kaynağı, iletişim işlemcisi, fonksiyon
          modülü, analog/dijital sinyal modülü, aksesuar) ayrılmış olarak aşağıdaki sayfalarda listelenir. VIPA, Yaskawa&apos;nın satın aldığı bir kontrol
          sistemleri markasıdır; SPEED7 tabanlı Micro PLC&apos;nin {MICRO_PLC_TOTAL} modeli ise doğrudan ürün olarak{" "}
          <Link href="/magaza/kategori/kontrol-sistemleri-plc">Kontrol Sistemleri (PLC) kategorisinde</Link> yer alır (toplam {GRAND_TOTAL} model/varyant).
          Listedeki her model için teklif verir ve tedarik ederiz.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>

      {KN_PLC_GROUPS.map((g) => (
        <div key={g.id} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 className="h2" style={{ fontSize: 24 }}>
            {g.title} <span className="store-count">{g.series.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} model</span>
          </h2>
          <ul className="enc-series-list">
            {g.series.map((s) => (
              <li key={s.slug}>
                <Link href={`/magaza/kontrol-plc-kodlari/${s.slug}`} className="dpu-group">
                  <strong>{s.title.startsWith(`${g.title} `) ? s.title.slice(g.title.length + 1) : s.title}</strong>
                  <span>{s.codes.length} model</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 900 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>Sipariş kodu nasıl okunur?</h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          VIPA&apos;da Autonics&apos;teki gibi parametrik bir kod formülü yoktur: her model, tip grubu ve ayrıştırıcı bir parça numarasından oluşan kendi
          ayrık sipariş koduna sahiptir (ör. SLIO&apos;da <code className="dpu-code-sample">021-1BH00</code> bir dijital giriş modülüdür, 300S+&apos;ta{" "}
          <code className="dpu-code-sample">322-1HH00</code> bir dijital çıkış modülüdür). Model adının içindeki tip ve seri öneki (ör. &quot;SM 021&quot;,
          &quot;CPU 317PN&quot;, &quot;PS 307&quot;) modülün ailesini ve işlevini gösterir; sondaki harf-rakam kombinasyonu ise giriş/çıkış sayısı, gerilim,
          besleme veya haberleşme seçeneğine göre değişir.
        </p>
        <p className="caption" style={{ margin: 0 }}>
          Kodlar ve teknik özetler Yaskawa Türkiye&apos;nin resmi seri sayfalarından (20-10-2026) alınmıştır. VIPA, Yaskawa&apos;nın satın aldığı bir kontrol
          sistemleri markasıdır.
        </p>
      </div>
    </section>
  );
}
