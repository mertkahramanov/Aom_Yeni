import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeFilter from "@/components/CodeFilter";
import { ENC_SERIES, encLabel, encProductSlug, encSeries, lcFirst } from "@/data/enkoder";
import { breadcrumbJsonLd, ORG, REGION_LINE, SITE } from "@/lib/seo";

const WA = ORG.telephone.replace(/\D/g, "");

// Seriye özel kod yapıları (Autonics model sayfalarıyla doğrulandı, 03-10-2026)
const LEGEND: Record<string, { sample: string; rows: [string, string][] }> = {
  ENC: {
    sample: "ENC - 1 - 3 - T - 24 (- C)",
    rows: [
      ["Ölçüm birimi", "1 = 1 mm · 2 = 1 cm · 3 = 1 m · 4 = 0,01 yd · 5 = 0,1 yd · 6 = 1 yd"],
      ["Kontrol çıkışı", "T = Totem pole · N = NPN açık kolektör · V = Gerilim çıkışı"],
      ["Besleme", "5 = 5 VDC · 24 = 12–24 VDC"],
      ["Bağlantı", "Boş = arkadan kablolu · C = arkadan kablo + konnektör"],
    ],
  },
  ENH: {
    sample: "ENH - 100 - 1 - T - 24",
    rows: [
      ["Çözünürlük", "Devir başına pals (25 veya 100)"],
      ["Durma konumu", '1 = Normal "H" · 2 = Normal "L"'],
      ["Kontrol çıkışı", "T = Totem pole · V = Gerilim çıkışı · L = Line driver"],
      ["Besleme", "5 = 5 VDC · 24 = 12–24 VDC"],
    ],
  },
  ENHP: {
    sample: "ENHP - 100 - 1 - T - 24",
    rows: [
      ["Durma konumu", '1 = Normal "H" · 2 = Normal "L"'],
      ["Kontrol çıkışı", "T = Totem pole · L = Line driver"],
      ["Besleme", "5 = 5 VDC · 24 = 12–24 VDC"],
    ],
  },
  ENP: {
    sample: "ENP - 1 1 1 R - 360 - P",
    rows: [
      ["2. hane", "0 = NPN açık kolektör (negatif lojik) · 1 = PNP açık kolektör (pozitif lojik)"],
      ["3. hane", "0 = 5 VDC · 1 = 12–24 VDC"],
      ["Dönme yönü", "F = CW artan · R = CCW artan"],
      ["Çözünürlük", "006, 008, 012, 016, 024, 360"],
    ],
  },
  EPM50S: {
    sample: "EPM50S8 - 1013 - B - PN - 24 (- S)",
    rows: [
      ["Çözünürlük", "1013 = 10 bit tek tur (1024) + 13 bit tur sayısı (8192)"],
      ["Çıkış kodu", "B = Binary"],
      ["Kontrol çıkışı", "PN = Paralel NPN açık kolektör · S = SSI (line driver)"],
      ["Bağlantı", "Boş = arkadan kablolu · S = yandan kablolu"],
    ],
  },
  MGAM50S: {
    sample: "MGAM50S8 - 1013 - B - F - S - 24",
    rows: [
      ["Çözünürlük", "1013 = 10 bit tek tur (1024) + 13 bit tur sayısı (8192)"],
      ["Dönme yönü", "F = CW artan · R = CCW artan"],
      ["Kontrol çıkışı", "PN = Paralel NPN açık kolektör · S = SSI (line driver)"],
    ],
  },
  ERB: {
    sample: "ERB - A - 26 S - 06/10",
    rows: [
      ["Dış çap", "19 veya 26 mm"],
      ["Bağlantı yöntemi", "C = kelepçe · S = ayar vidası"],
      ["İç çap", "06/10 = bir tarafı Ø6 mm, diğer tarafı Ø10 mm"],
    ],
  },
};

export function generateStaticParams() {
  return ENC_SERIES.map((s) => ({ seri: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ seri: string }> }): Promise<Metadata> {
  const s = encSeries((await params).seri);
  if (!s) return {};
  const label = encLabel(s);
  const url = `/magaza/enkoder-kodlari/${s.slug}`;
  const first = String(s.codes[0][0]);
  const last = String(s.codes[s.codes.length - 1][0]);
  const title = `Autonics ${label} Sipariş Kodları (${s.codes.length} Kod) | Ankara`;
  const description = `Autonics ${label} ${lcFirst(s.title)}: ${s.codes.length} sipariş kodu, ${first} … ${last}. Çözünürlük, çıkış, besleme ve bağlantı bilgisi; her kod için teklif. ${REGION_LINE}`;
  return {
    title,
    description,
    keywords: [`Autonics ${s.key}`, `${s.key} enkoder`, `${s.key} fiyat`, ...s.codes.filter((c) => c[1] === 0).slice(0, 12).map((c) => String(c[0]))],
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description, images: s.img ? [{ url: `/magaza/${s.img}` }] : undefined },
  };
}

export default async function EnkoderSeriKodPage({ params }: { params: Promise<{ seri: string }> }) {
  const s = encSeries((await params).seri);
  if (!s) notFound();
  const label = encLabel(s);
  const productHref = `/magaza/${encProductSlug(s)}`;
  const disc = s.codes.filter((c) => c[1] === 1).length;
  const legend = LEGEND[s.key];
  const tableId = `kodlar-${s.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Autonics ${label} sipariş kodları`,
      url: `${SITE}/magaza/enkoder-kodlari/${s.slug}`,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE}/#org` },
      about: { "@type": "Product", name: `Autonics ${label}`, brand: { "@type": "Brand", name: "Autonics" }, url: `${SITE}${productHref}` },
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: "Enkoder model kodları", path: "/magaza/enkoder-kodlari" },
      { name: label, path: `/magaza/enkoder-kodlari/${s.slug}` },
    ]),
  ];
  const others = ENC_SERIES.filter((x) => x.group[0] === s.group[0] && x.slug !== s.slug);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/magaza/enkoder-kodlari">Enkoder model kodları</Link> <span aria-hidden="true">/</span> <span>{label}</span>
      </nav>
      <div className="product-layout" style={{ alignItems: "start" }}>
        {s.img && s.imgSize && (
          <div className="store-visual product-visual">
            <Image src={`/magaza/${s.img}`} alt={`Autonics ${label} ${lcFirst(s.title)}`} fill sizes="560px" style={{ objectFit: "contain" }} priority />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="eyebrow">{s.group[1]}</div>
          <h1 style={{ fontWeight: 800, fontSize: 36, lineHeight: 1.08 }}>Autonics {label} sipariş kodları</h1>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            {s.note} Bu sayfada serinin {s.codes.length} sipariş kodunun tamamı listelenir
            {disc ? `; ${disc} kod Autonics listesinde üretimden kalkmış olarak işaretlidir (muadil için bize danışın)` : ""}. Listedeki her kod için teklif
            verir ve tedarik ederiz; kodun yanındaki bağlantıdan e-posta veya WhatsApp ile talep gönderebilirsiniz.
          </p>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{REGION_LINE}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={productHref} className="btn btn-primary">
              {label} serisi ve teknik tablo
            </Link>
          </div>
        </div>
      </div>

      {legend && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 900 }}>
          <h2 className="h2" style={{ fontSize: 24 }}>{label} kodu nasıl okunur?</h2>
          <p style={{ margin: 0 }}>
            <code className="dpu-code-sample">{legend.sample}</code>
          </p>
          <table className="spec-table">
            <tbody>
              {legend.rows.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="h2" style={{ fontSize: 24 }}>
          {s.codes.length} sipariş kodu
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
                <th scope="col">Durum</th>
                <th scope="col">Teklif</th>
              </tr>
            </thead>
            <tbody>
              {s.codes.map((row) => {
                const code = String(row[0]);
                const off = row[1] === 1;
                const subject = encodeURIComponent(`Teklif talebi: Autonics ${code}`);
                const wa = encodeURIComponent(`Merhaba, Autonics ${code} için teklif almak istiyorum.`);
                return (
                  <tr key={code} id={code}>
                    <th scope="row">{code}</th>
                    {row.slice(2).map((v, i) => (
                      <td key={s.cols[i]}>{String(v)}</td>
                    ))}
                    <td className={off ? "enc-status-off" : undefined}>{off ? "Üretimden kalktı" : "Üretimde"}</td>
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
          Kodlar ve durum bilgisi Autonics Türkiye model listesinden alınmıştır (03-10-2026). Güncel teknik değerler için üretici sayfasına bakınız.
        </p>
      </div>

      {others.length > 0 && (
        <nav aria-label="Aynı gruptaki seriler" className="store-nav">
          <span className="store-nav-cat" style={{ minWidth: 0 }}>{s.group[1]}:</span>
          {others.map((o) => (
            <Link key={o.slug} href={`/magaza/enkoder-kodlari/${o.slug}`} className="store-chip">
              {encLabel(o)} <span>{o.codes.length}</span>
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
