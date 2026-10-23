import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoreCard from "@/components/StoreCard";
import { CATEGORY_INFO, categoryBySlug, fullName, seriesSlug, storeCategories } from "@/data/magaza";
import { ENC_TOTAL } from "@/data/enkoder";
import { KONTROL_KOD_TOTAL } from "@/data/kontrol";
import { breadcrumbJsonLd, hreflangAlternates, REGION_LINE, SITE } from "@/lib/seo";
// Autonics yeni kod-tablosu kategorileri (23-10-2026, Mert onayı — bkz. claude/AUTONICS_FIYAT_LISTESI_YENI_KATEGORILER_23-10-2026.md)
import { KONTROL_SINYAL_KOD_TOTAL } from "@/data/autonics-kontrol-sinyal_23-10-2026";
import { SINYAL_LAMBASI_KOD_TOTAL } from "@/data/autonics-kuyruk-sinyal-lambasi_23-10-2026";
import { BASINC_SENSOR_KOD_TOTAL } from "@/data/autonics-basinc-sensor_23-10-2026";
import { YAKINLIK_SENSOR_KOD_TOTAL } from "@/data/autonics-yakinlik-sensor_23-10-2026";
import { FOTOELEKTRIK_SENSOR_KOD_TOTAL } from "@/data/autonics-fotoelektrik-sensor_23-10-2026";
import { VISION_SENSOR_KOD_TOTAL } from "@/data/autonics-vision-sensor_23-10-2026";
import { GUVENLIK_SWITCH_KOD_TOTAL } from "@/data/autonics-guvenlik-switch_23-10-2026";
import { STEP_MOTOR_KOD_TOTAL } from "@/data/autonics-step-motor_23-10-2026";
import { AI_MOTOR_KOD_TOTAL } from "@/data/autonics-kuyruk-ai-motor_23-10-2026";
import { KABLO_AKSESUAR_KOD_TOTAL } from "@/data/autonics-kablo-aksesuar_23-10-2026";
import { SINYAL_DONUSTURUCU_KOD_TOTAL } from "@/data/autonics-sinyal-donusturucu_23-10-2026";

// Kategoriye ait sipariş kodu listeleri (mağaza ilk sayfasından buraya taşındı, 06-10-2026).
type CodeListInfo = { href: string; label: string; total: number; text: string };
const DPU_LIST: CodeListInfo = { href: "/magaza/dpu-kodlari", label: "DPU model kodları", total: 840, text: "Autonics DPU serisinin tüm sipariş kodları: monofaze ve trifaze, 110–480 V." };
const KONTROL_LIST: CodeListInfo = { href: "/magaza/kontrol-kodlari", label: "Kontrol cihazı model kodları", total: KONTROL_KOD_TOTAL, text: "Ürün olarak eklenmeyen sıcaklık kontrol ve panel metre serilerinin sipariş kodları." };
const ENKODER_LIST: CodeListInfo = { href: "/magaza/enkoder-kodlari", label: "Enkoder model kodları", total: ENC_TOTAL, text: "34 serinin tüm sipariş kodları: çözünürlük, çıkış, besleme ve bağlantıya göre." };
// 23-10-2026 eklendi (Mert onayı):
const KONTROL_SINYAL_LIST: CodeListInfo = { href: "/magaza/kontrol-sinyal-kodlari", label: "Buton, anahtar ve sinyal lambası kodları", total: KONTROL_SINYAL_KOD_TOTAL, text: "Ürün olarak eklenmeyen buton, seçici anahtar, acil durdurma ve pilot lamba sipariş kodları." };
const SINYAL_LAMBASI_LIST: CodeListInfo = { href: "/magaza/sinyal-lambasi-kodlari", label: "Sinyal lambası / kule ışığı kodları", total: SINYAL_LAMBASI_KOD_TOTAL, text: "Kule ışığı, döner ikaz (beacon) ve LED gösterge lambası sipariş kodları." };
const BASINC_SENSOR_LIST: CodeListInfo = { href: "/magaza/basinc-sensoru-kodlari", label: "Basınç sensörü model kodları", total: BASINC_SENSOR_KOD_TOTAL, text: "Autonics basınç sensörü/transmitteri ailelerinin sipariş kodları." };
const SINYAL_DONUSTURUCU_LIST: CodeListInfo = { href: "/magaza/sinyal-donusturucu-kodlari", label: "Sinyal dönüştürücü kodları", total: SINYAL_DONUSTURUCU_KOD_TOTAL, text: "HART sinyal transmitteri ve analog sinyal izolatörü sipariş kodları." };
const YAKINLIK_SENSOR_LIST: CodeListInfo = { href: "/magaza/yakinlik-sensoru-kodlari", label: "Yakınlık (endüktif) sensörü kodları", total: YAKINLIK_SENSOR_KOD_TOTAL, text: "Endüktif yakınlık sensörü ailelerinin sipariş kodları." };
const FOTOELEKTRIK_SENSOR_LIST: CodeListInfo = { href: "/magaza/fotoelektrik-sensor-kodlari", label: "Fotoelektrik sensör kodları", total: FOTOELEKTRIK_SENSOR_KOD_TOTAL, text: "Fotoelektrik sensör ailelerinin sipariş kodları." };
const VISION_SENSOR_LIST: CodeListInfo = { href: "/magaza/vision-sensor-kodlari", label: "Vision sensör kodları", total: VISION_SENSOR_KOD_TOTAL, text: "Vision sensörü/kamera ailelerinin sipariş kodları." };
const GUVENLIK_SWITCH_LIST: CodeListInfo = { href: "/magaza/guvenlik-switch-kodlari", label: "Güvenlik switch kodları", total: GUVENLIK_SWITCH_KOD_TOTAL, text: "Güvenlik switchi ailelerinin sipariş kodları." };
const STEP_MOTOR_LIST: CodeListInfo = { href: "/magaza/step-motor-kodlari", label: "Step motor model kodları", total: STEP_MOTOR_KOD_TOTAL, text: "Açık çevrim Autonics step motor ailelerinin sipariş kodları." };
const AI_MOTOR_LIST: CodeListInfo = { href: "/magaza/kapali-cevrim-adim-motor-kodlari", label: "Kapalı çevrim adım motoru kodları", total: AI_MOTOR_KOD_TOTAL, text: "Ai serisi kapalı çevrim (closed-loop) adım motoru + sürücü sipariş kodları." };
// KABLO_AKSESUAR_KOD_TOTAL burada hiçbir mevcut ürün kategorisine iliştirilmedi (yedek-parca.ts'te
// doğrudan karşılığı yok); mağaza ana sayfasındaki "CNC yedek parça ve elektronik" grubundan erişilir.
void KABLO_AKSESUAR_KOD_TOTAL;

const CODE_LISTS: Record<string, CodeListInfo[]> = {
  "tristorlu-guc-kontrol": [DPU_LIST],
  "sicaklik-kontrol-cihazlari": [KONTROL_LIST, KONTROL_SINYAL_LIST, SINYAL_LAMBASI_LIST],
  "dijital-panel-metreler": [KONTROL_LIST],
  enkoderler: [ENKODER_LIST],
  // 23-10-2026 eklendi (Mert onayı): mevcut ürün kategorisiyle aynı konudaki yeni kod-tablosu aileleri.
  "sensor-kontrol-cihazlari": [BASINC_SENSOR_LIST, SINYAL_DONUSTURUCU_LIST],
  "svic-sensor-ve-butonlar": [YAKINLIK_SENSOR_LIST, FOTOELEKTRIK_SENSOR_LIST, VISION_SENSOR_LIST, GUVENLIK_SWITCH_LIST],
  "step-ve-servo-motorlar-suruculer": [STEP_MOTOR_LIST, AI_MOTOR_LIST],
};

export function generateStaticParams() {
  return storeCategories().map((c) => ({ kategori: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ kategori: string }> }): Promise<Metadata> {
  const c = categoryBySlug((await params).kategori);
  if (!c) return {};
  const info = CATEGORY_INFO[c.id];
  const url = `/magaza/kategori/${c.id}`;
  const title = info?.seoTitle ?? c.title;
  const description = info?.description ?? `${c.title}. ${REGION_LINE}`;
  return {
    title,
    description,
    keywords: info?.keywords,
    alternates: { canonical: url, languages: hreflangAlternates(url) },
    openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description },
  };
}

export default async function KategoriPage({ params }: { params: Promise<{ kategori: string }> }) {
  const c = categoryBySlug((await params).kategori);
  if (!c) notFound();
  const info = CATEGORY_INFO[c.id];
  const codeLists = CODE_LISTS[c.id] ?? [];
  const items = c.groups.flatMap((g) => g.items);
  const url = `${SITE}/magaza/kategori/${c.id}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: c.title,
      url,
      inLanguage: "tr-TR",
      description: info?.description,
      isPartOf: { "@id": `${SITE}/#org` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: items.length,
        itemListElement: items.slice(0, 100).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/magaza/${p.slug}`, name: fullName(p) })),
      },
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
      { name: c.title, path: `/magaza/kategori/${c.id}` },
    ]),
  ];
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <Link href="/magaza">Mağaza</Link> <span aria-hidden="true">/</span>{" "}
        <span>{c.title}</span>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <div className="eyebrow">Mağaza · Ankara ve Türkiye geneli</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>{info?.seoTitle.replace(/ \| Ankara$/, "") ?? c.title}</h1>
        {(info?.intro ?? [REGION_LINE]).map((t) => (
          <p key={t.slice(0, 24)} style={{ margin: 0, color: "var(--ink-muted)" }}>
            {t}
          </p>
        ))}
        <p className="caption" style={{ margin: 0 }}>
          Fiyatlar KDV hariçtir; %20 KDV eklenir. Fiyatı gösterilmeyen ürünler için teklif isteyin.
        </p>
      </div>
      {codeLists.map((codeList) => (
        <div key={codeList.href} className="cat-codes-box">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <strong style={{ fontFamily: "var(--font-display), sans-serif", fontSize: 20 }}>
              Sipariş kodu listesi <span className="store-count">{codeList.total.toLocaleString("tr-TR")} kod</span>
            </strong>
            <p style={{ color: "var(--ink-muted)" }}>{codeList.text}</p>
          </div>
          <Link href={codeList.href} className="btn btn-outline">
            {codeList.label}
          </Link>
        </div>
      ))}
      <nav aria-label="Seriler" className="store-nav">
        {c.groups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="store-chip">
            {g.title.replace(/^Autonics /, "")} <span>{g.items.length}</span>
          </a>
        ))}
      </nav>
      {c.groups.map((g) => (
        <div key={g.id} id={g.id} className="store-group">
          <h2 className="store-group-title">
            {g.items[0].series ? (
              <Link href={`/magaza/seri/${seriesSlug(g.items[0].series)}`} className="store-cat-link">
                {g.title}
              </Link>
            ) : (
              g.title
            )}{" "}
            <span className="store-count">{g.items.length} {g.items[0].codePage ? "seri" : "model"}</span>
          </h2>
          <ul className="store-grid">
            {(g.items[0].series ? g.items.slice(0, 9) : g.items).map((p) => (
              <li key={p.slug}>
                <StoreCard p={p} />
              </li>

              ))}
          </ul>
          {g.items.length > 9 && g.items[0].series && (
            <Link href={`/magaza/seri/${seriesSlug(g.items[0].series)}`} className="btn btn-outline" style={{ alignSelf: "flex-start" }}>
              {g.title.replace(/^Autonics /, "").split(" · ")[0]}: {g.items.length} modelin tamamını gör
            </Link>
          )}
        </div>
      ))}
    </section>
  );
}
