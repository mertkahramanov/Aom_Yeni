import type { MetadataRoute } from "next";
import { products, storeCategories, storeSeries } from "@/data/magaza";
import { DPU_GROUPS } from "@/data/dpuCodes";
import { ENC_SERIES } from "@/data/enkoder";
import { KONTROL_KOD_SERIES } from "@/data/kontrol";
import { BRANDS } from "@/data/markalar";
import { SITE, hasLocaleVersion } from "@/lib/seo";
import { locales } from "@/i18n/locales";
// Autonics yeni kod-tablosu kategorileri (23-10-2026, Mert onayı — bkz. claude/AUTONICS_FIYAT_LISTESI_YENI_KATEGORILER_23-10-2026.md)
import { KONTROL_SINYAL_KOD_SERIES } from "@/data/autonics-kontrol-sinyal_23-10-2026";
import { SINYAL_LAMBASI_KOD_SERIES } from "@/data/autonics-kuyruk-sinyal-lambasi_23-10-2026";
import { BASINC_SENSOR_KOD_SERIES } from "@/data/autonics-basinc-sensor_23-10-2026";
import { YAKINLIK_SENSOR_KOD_SERIES } from "@/data/autonics-yakinlik-sensor_23-10-2026";
import { FOTOELEKTRIK_SENSOR_KOD_SERIES } from "@/data/autonics-fotoelektrik-sensor_23-10-2026";
import { VISION_SENSOR_KOD_SERIES } from "@/data/autonics-vision-sensor_23-10-2026";
import { GUVENLIK_SWITCH_KOD_SERIES } from "@/data/autonics-guvenlik-switch_23-10-2026";
import { STEP_MOTOR_KOD_SERIES } from "@/data/autonics-step-motor_23-10-2026";
import { AI_MOTOR_KOD_SERIES } from "@/data/autonics-kuyruk-ai-motor_23-10-2026";
import { KABLO_AKSESUAR_KOD_SERIES } from "@/data/autonics-kablo-aksesuar_23-10-2026";
import { SINYAL_DONUSTURUCU_KOD_SERIES } from "@/data/autonics-sinyal-donusturucu_23-10-2026";
// Yaskawa sipariş kodu sayfaları (16-11-2026: önceden sitemap'te hiç yoktu; şimdilik yalnızca TR)
import { AC_GENEL_SERIES } from "@/data/yaskawa-ac-genel-kompakt";
import { AC_OZEL_SERIES } from "@/data/yaskawa-ac-ozel-uygulama";
import { AC_REJENERATIF_SERIES } from "@/data/yaskawa-ac-rejeneratif";
import { KN_PLC_SERIES } from "@/data/yaskawa-kontrol-plc";
import { SV_DD_SERIES } from "@/data/yaskawa-servo-dogrudan-tahrik";
import { SV_LINEER_SGX_SERIES } from "@/data/yaskawa-servo-lineer-sigmax-surucu";
import { SV_S7MOTOR_SERIES } from "@/data/yaskawa-servo-sigma7-motor";
import { SV_S7SURUCU_SERIES } from "@/data/yaskawa-servo-sigma7-surucu";
import { SV_SXMOTOR_SERIES } from "@/data/yaskawa-servo-sigmax-motor";

// Çok dilli sitemap (19-10-2026). Türkçe sayfalar hâlâ kök dizinde (önek yok); /en, /ru, /ar
// altındaki [locale] ağacı artık otomasyon sayfası, 5 hizmet sayfası ve mağazanın tüm 9 rota
// tipini (ana liste, kategori, marka, seri, dpu/enkoder/kontrol kod listeleri + detay, ürün
// detay) kapsıyor — bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md. Bu dosya her rota için
// hem TR hem de 3 dil versiyonunu ayrı sitemap girdisi olarak listeler ve her girdiye
// alternates.languages (hreflang) ekler. /cerez-politikasi ve /kvkk-aydinlatma-metni'nin
// çok dilli karşılığı yok; TR tek girdi olarak kalır.

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

// 21-11-2026: lastModified kaldırıldı. Önceden her build'de "şimdi" yazılıyordu; Google her
// sayfanın her gün değiştiğini görüp bu alana güvenmemeye başlar. Gerçek değişiklik tarihi
// sayfa bazında tutulmadığı için alanı hiç vermemek daha doğru.
function entriesFor(
  path: string,
  opts: { changeFrequency: ChangeFreq; priority: number }
): MetadataRoute.Sitemap {
  const { changeFrequency, priority } = opts;
  // 16-11-2026: [locale] karşılığı olmayan yollar (bkz. seo.ts TR_ONLY_PATHS) tek TR girdisi olur;
  // önceden /en, /ru, /ar sürümleri de listeleniyordu ve bunlar 404 veriyordu.
  if (!hasLocaleVersion(path)) return [{ url: `${SITE}${path}`, changeFrequency, priority }];
  const languages: Record<string, string> = {
    tr: `${SITE}${path}`,
    "x-default": `${SITE}${path}`,
  };
  for (const loc of locales) languages[loc] = `${SITE}/${loc}${path}`;
  const base = { changeFrequency, priority, alternates: { languages } };
  return [{ url: `${SITE}${path}`, ...base }, ...locales.map((loc) => ({ url: `${SITE}/${loc}${path}`, ...base }))];
}

const w = (path: string, priority: number, changeFrequency: ChangeFreq = "monthly") =>
  entriesFor(path, { changeFrequency, priority });

// 21-11-2026: sitemap ikiye bölündü (tek dosya ~16 MB idi). /sitemap/0.xml: sayfalar, kategoriler,
// markalar, seriler ve kod listeleri; /sitemap/1.xml: ürün detay sayfaları. /sitemap.xml ise bu
// ikisini listeleyen sitemap index'tir (src/app/sitemap.xml/route.ts) — Search Console'daki
// mevcut kayıt değişmeden çalışır.
const SITEMAP_IDS = [0, 1] as const;

export async function generateSitemaps() {
  return SITEMAP_IDS.map((id) => ({ id }));
}

export default async function sitemap({ id }: { id: number | Promise<number> }): Promise<MetadataRoute.Sitemap> {
  const n = Number(await id);
  if (n === 1) return productEntries();
  return pageEntries();
}

function productEntries(): MetadataRoute.Sitemap {
  // 16-11-2026: model alanı boş kayıtlardan üretilen anlamsız slug'lar ("", "-2", "fanuc" vb.)
  // sitemap'e alınmaz; veri temizliği yapılınca bu filtre gereksiz kalır.
  return products.filter((p) => p.slug && /^[a-z0-9]/.test(p.slug) && p.model?.trim()).flatMap((p) => w(`/magaza/${p.slug}`, 0.7));
}

function pageEntries(): MetadataRoute.Sitemap {
  return [
    ...w("", 1),
    ...w("/otomasyon", 0.9),
    // Hizmet sayfaları (16-10-2026, bkz. claude/HIZMET_SAYFALARI_TASLAK_15-10-2026.md)
    ...w("/robotik-kaynak", 0.9),
    ...w("/pres-guvenligi", 0.9),
    ...w("/cnc-tezgah", 0.9),
    ...w("/plc-scada", 0.9),
    ...w("/tristorlu-guc-kontrol", 0.9),
    ...w("/oksijen-jeneratoru", 0.9),
    ...w("/magaza", 0.8, "weekly"),
    // Çok dilli karşılığı olmayan yasal/KVKK sayfaları — tek (TR) girdi
    { url: `${SITE}/cerez-politikasi`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/kvkk-aydinlatma-metni`, changeFrequency: "yearly", priority: 0.3 },
    ...storeCategories().flatMap((c) => w(`/magaza/kategori/${c.id}`, 0.8, "weekly")),
    ...Object.keys(BRANDS).flatMap((b) => w(`/magaza/marka/${b}`, 0.75)),
    ...storeSeries().flatMap((s) => w(`/magaza/seri/${s.slug}`, 0.75, "weekly")),
    ...w("/magaza/dpu-kodlari", 0.7),
    ...DPU_GROUPS.flatMap((g) => w(`/magaza/dpu-kodlari/${g.id}`, 0.6)),
    ...w("/magaza/enkoder-kodlari", 0.7),
    ...ENC_SERIES.flatMap((s) => w(`/magaza/enkoder-kodlari/${s.slug}`, 0.6)),
    ...w("/magaza/kontrol-kodlari", 0.7),
    ...KONTROL_KOD_SERIES.flatMap((s) => w(`/magaza/kontrol-kodlari/${s.slug}`, 0.6)),
    // Autonics yeni kod-tablosu kategorileri (23-10-2026)
    ...w("/magaza/kontrol-sinyal-kodlari", 0.7),
    ...KONTROL_SINYAL_KOD_SERIES.flatMap((s) => w(`/magaza/kontrol-sinyal-kodlari/${s.slug}`, 0.6)),
    ...w("/magaza/sinyal-lambasi-kodlari", 0.7),
    ...SINYAL_LAMBASI_KOD_SERIES.flatMap((s) => w(`/magaza/sinyal-lambasi-kodlari/${s.slug}`, 0.6)),
    ...w("/magaza/basinc-sensoru-kodlari", 0.7),
    ...BASINC_SENSOR_KOD_SERIES.flatMap((s) => w(`/magaza/basinc-sensoru-kodlari/${s.slug}`, 0.6)),
    ...w("/magaza/yakinlik-sensoru-kodlari", 0.7),
    ...YAKINLIK_SENSOR_KOD_SERIES.flatMap((s) => w(`/magaza/yakinlik-sensoru-kodlari/${s.slug}`, 0.6)),
    ...w("/magaza/fotoelektrik-sensor-kodlari", 0.7),
    ...FOTOELEKTRIK_SENSOR_KOD_SERIES.flatMap((s) => w(`/magaza/fotoelektrik-sensor-kodlari/${s.slug}`, 0.6)),
    ...w("/magaza/vision-sensor-kodlari", 0.7),
    ...VISION_SENSOR_KOD_SERIES.flatMap((s) => w(`/magaza/vision-sensor-kodlari/${s.slug}`, 0.6)),
    ...w("/magaza/guvenlik-switch-kodlari", 0.7),
    ...GUVENLIK_SWITCH_KOD_SERIES.flatMap((s) => w(`/magaza/guvenlik-switch-kodlari/${s.slug}`, 0.6)),
    ...w("/magaza/step-motor-kodlari", 0.7),
    ...STEP_MOTOR_KOD_SERIES.flatMap((s) => w(`/magaza/step-motor-kodlari/${s.slug}`, 0.6)),
    ...w("/magaza/kapali-cevrim-adim-motor-kodlari", 0.7),
    ...AI_MOTOR_KOD_SERIES.flatMap((s) => w(`/magaza/kapali-cevrim-adim-motor-kodlari/${s.slug}`, 0.6)),
    ...w("/magaza/kablo-aksesuar-kodlari", 0.7),
    ...KABLO_AKSESUAR_KOD_SERIES.flatMap((s) => w(`/magaza/kablo-aksesuar-kodlari/${s.slug}`, 0.6)),
    ...w("/magaza/sinyal-donusturucu-kodlari", 0.7),
    ...SINYAL_DONUSTURUCU_KOD_SERIES.flatMap((s) => w(`/magaza/sinyal-donusturucu-kodlari/${s.slug}`, 0.6)),
    // Yaskawa sipariş kodu sayfaları (yalnızca TR)
    ...([
      ["ac-surucu-genel-kodlari", AC_GENEL_SERIES],
      ["ac-surucu-ozel-kodlari", AC_OZEL_SERIES],
      ["ac-surucu-rejeneratif-kodlari", AC_REJENERATIF_SERIES],
      ["kontrol-plc-kodlari", KN_PLC_SERIES],
      ["servo-dogrudan-tahrik-kodlari", SV_DD_SERIES],
      ["servo-lineer-sigmax-kodlari", SV_LINEER_SGX_SERIES],
      ["servo-sigma7-motor-kodlari", SV_S7MOTOR_SERIES],
      ["servo-sigma7-surucu-kodlari", SV_S7SURUCU_SERIES],
      ["servo-sigmax-motor-kodlari", SV_SXMOTOR_SERIES],
    ] as [string, { slug: string }[]][]).flatMap(([dir, series]) => [
      ...w(`/magaza/${dir}`, 0.7),
      ...series.flatMap((s) => w(`/magaza/${dir}/${s.slug}`, 0.6)),
    ]),
  ];
}
