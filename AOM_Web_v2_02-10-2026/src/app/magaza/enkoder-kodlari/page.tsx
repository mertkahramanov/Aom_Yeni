import type { Metadata } from "next";
import Link from "next/link";
import { ENC_GROUPS, ENC_SERIES, ENC_TOTAL, encLabel } from "@/data/enkoder";
import { breadcrumbJsonLd, REGION_LINE, SITE } from "@/lib/seo";

const TOTAL = ENC_TOTAL.toLocaleString("tr-TR");

export const metadata: Metadata = {
  title: "Autonics Enkoder Model Kodları: 34 Seri, Tüm Sipariş Kodları | Ankara",
  description: `Autonics enkoder sipariş kodları: ${TOTAL} kod, 34 seri. Artımlı ve mutlak enkoderler, E40S, E50S, E58, E40H, EP50S, MGA50S ve diğerleri; çözünürlük, çıkış, besleme ve bağlantı bilgisiyle. Her kod için teklif. ${REGION_LINE}`,
  keywords: ["Autonics enkoder kodu", "enkoder model kodu", "encoder sipariş kodu", "Autonics E40S", "Autonics E50S", "Autonics E58", "Autonics EP50S", "enkoder fiyat", "artımlı enkoder", "mutlak enkoder"],
  alternates: { canonical: "/magaza/enkoder-kodlari" },
  openGraph: { type: "website", locale: "tr_TR", url: "/magaza/enkoder-kodlari", siteName: "AOM", title: "Autonics enkoder model kodları", description: `${TOTAL} sipariş kodu için teklif ve tedarik. ${REGION_LINE}` },
};

export default function EnkoderKodlariPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Autonics enkoder model kodları",
      url: `${SITE}/magaza/enkoder-kodlari`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      hasPart: ENC_SERIES.map((s) => ({ "@type": "WebPage", name: `Autonics ${encLabel(s)} sipariş kodları`, url: `${SITE}/magaza/enkoder-kodlari/${s.slug}` })),
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Enkoderler", path: "/magaza/kategori/enkoderler" },
      { name: "Enkoder model kodları", path: "/magaza/enkoder-kodlari" },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/magaza/kategori/enkoderler">Enkoderler</Link> <span aria-hidden="true">/</span> <span>Enkoder model kodları</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 880 }}>
        <div className="eyebrow">Enkoderler · tedarik</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Autonics enkoder model kodları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Autonics enkoderlerinin 34 serisine ait {TOTAL} sipariş kodunun tamamı aşağıdaki seri sayfalarında listelenir. Her kodun yanında çözünürlük, çıkış
          fazı veya çıkış kodu, kontrol çıkışı, besleme ve bağlantı bilgisi yer alır; listedeki her kod için teklif verir ve tedarik ederiz. Seri tanıtımı ve
          teknik tablo için <Link href="/magaza/kategori/enkoderler">enkoder kategorisine</Link> bakın.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
      </div>

      {ENC_GROUPS.map((g) => (
        <div key={g.id} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 className="h2" style={{ fontSize: 24 }}>
            {g.title} <span className="store-count">{g.series.reduce((n, s) => n + s.codes.length, 0).toLocaleString("tr-TR")} kod</span>
          </h2>
          <ul className="enc-series-list">
            {g.series.map((s) => (
              <li key={s.slug}>
                <Link href={`/magaza/enkoder-kodlari/${s.slug}`} className="dpu-group">
                  <strong>{encLabel(s)}</strong>
                  <span>{s.title}</span>
                  <span className="store-count" style={{ marginLeft: 0 }}>{s.codes.length.toLocaleString("tr-TR")} kod</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 920 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>Artımlı enkoder kodu nasıl okunur?</h2>
        <p style={{ margin: 0 }}>
          <code className="dpu-code-sample">E40S 6 - 1000 - 3 - T - 24 (- C)</code>
        </p>
        <table className="spec-table">
          <tbody>
            <tr><th scope="row">Seri ve mil</th><td>E40S6 = E40S serisi, Ø6 mm mil (oyuk / delik milli serilerde mil deliği çapı)</td></tr>
            <tr><th scope="row">Çözünürlük</th><td>Devir başına pals (P/R), ör. 1000</td></tr>
            <tr><th scope="row">Çıkış fazı</th><td>1 = A · 2 = A, B · 3 = A, B, Z · 4 = A, A̅, B, B̅ · 6 = A, A̅, B, B̅, Z, Z̅</td></tr>
            <tr><th scope="row">Kontrol çıkışı</th><td>T = Totem pole · N = NPN açık kolektör · V = Gerilim çıkışı · L = Line driver</td></tr>
            <tr><th scope="row">Besleme</th><td>5 = 5 VDC · 12 = 12 VDC · 24 = 12–24 VDC (E40HB ve E50S serilerinde 1 = 5–24 VDC)</td></tr>
            <tr><th scope="row">Bağlantı</th><td>Boş = kablolu · C = kablo + konnektör · CR = arkadan konnektörlü · CS = yandan konnektörlü (E18S, E20 serilerinde R = arkadan, S = yandan kablo)</td></tr>
          </tbody>
        </table>
        <h2 className="h2" style={{ fontSize: 26, marginTop: 12 }}>Mutlak enkoder kodu nasıl okunur?</h2>
        <p style={{ margin: 0 }}>
          <code className="dpu-code-sample">EP50S 8 - 1024 - 3 F - N - 24</code>
        </p>
        <table className="spec-table">
          <tbody>
            <tr><th scope="row">Çözünürlük</th><td>Bir turdaki bölüm sayısı, ör. 1024 (10 bit)</td></tr>
            <tr><th scope="row">Çıkış kodu</th><td>1 = BCD · 2 = Binary · 3 = Gray</td></tr>
            <tr><th scope="row">Dönme yönü</th><td>F = saat yönünde (CW) artan · R = saat yönünün tersinde (CCW) artan</td></tr>
            <tr><th scope="row">Kontrol çıkışı</th><td>N = NPN açık kolektör · P = PNP açık kolektör</td></tr>
            <tr><th scope="row">Besleme</th><td>5 = 5 VDC · 24 = 12–24 VDC</td></tr>
          </tbody>
        </table>
        <p className="caption" style={{ margin: 0 }}>
          Kod açıklamaları, Autonics model listesindeki seçeneklerle seri seri karşılaştırılarak doğrulanmıştır. Seriye özel kodlar (ENC, ENH, ENP, EPM50S,
          MGAM50S, EWLS50, ERB) kendi sayfalarında açıklanmıştır.
        </p>
      </div>
    </section>
  );
}
