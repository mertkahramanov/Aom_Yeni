import type { MetadataRoute } from "next";
import { products, storeCategories, storeSeries } from "@/data/magaza";
import { DPU_GROUPS } from "@/data/dpuCodes";
import { ENC_SERIES } from "@/data/enkoder";
import { KONTROL_KOD_SERIES } from "@/data/kontrol";
import { BRANDS } from "@/data/markalar";
import { SITE } from "@/lib/seo";
import { locales } from "@/i18n/locales";

// Çok dilli sitemap (19-10-2026). Türkçe sayfalar hâlâ kök dizinde (önek yok); /en, /ru, /ar
// altındaki [locale] ağacı artık otomasyon sayfası, 5 hizmet sayfası ve mağazanın tüm 9 rota
// tipini (ana liste, kategori, marka, seri, dpu/enkoder/kontrol kod listeleri + detay, ürün
// detay) kapsıyor — bkz. claude/COK_DILLI_SITE_ASAMA3_19-10-2026.md. Bu dosya her rota için
// hem TR hem de 3 dil versiyonunu ayrı sitemap girdisi olarak listeler ve her girdiye
// alternates.languages (hreflang) ekler. /cerez-politikasi ve /kvkk-aydinlatma-metni'nin
// çok dilli karşılığı yok; TR tek girdi olarak kalır.

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

function entriesFor(
  path: string,
  opts: { changeFrequency: ChangeFreq; priority: number; lastModified: Date }
): MetadataRoute.Sitemap {
  const { changeFrequency, priority, lastModified } = opts;
  const languages: Record<string, string> = {
    tr: `${SITE}${path}`,
    "x-default": `${SITE}${path}`,
  };
  for (const loc of locales) languages[loc] = `${SITE}/${loc}${path}`;
  const base = { lastModified, changeFrequency, priority, alternates: { languages } };
  return [{ url: `${SITE}${path}`, ...base }, ...locales.map((loc) => ({ url: `${SITE}/${loc}${path}`, ...base }))];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const w = (path: string, priority: number, changeFrequency: ChangeFreq = "monthly") =>
    entriesFor(path, { changeFrequency, priority, lastModified: now });

  return [
    ...w("", 1),
    ...w("/otomasyon", 0.9),
    // Hizmet sayfaları (16-10-2026, bkz. claude/HIZMET_SAYFALARI_TASLAK_15-10-2026.md)
    ...w("/robotik-kaynak", 0.9),
    ...w("/pres-guvenligi", 0.9),
    ...w("/cnc-tezgah", 0.9),
    ...w("/plc-scada", 0.9),
    ...w("/tristorlu-guc-kontrol", 0.9),
    ...w("/magaza", 0.8, "weekly"),
    // Çok dilli karşılığı olmayan yasal/KVKK sayfaları — tek (TR) girdi
    { url: `${SITE}/cerez-politikasi`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/kvkk-aydinlatma-metni`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...storeCategories().flatMap((c) => w(`/magaza/kategori/${c.id}`, 0.8, "weekly")),
    ...Object.keys(BRANDS).flatMap((b) => w(`/magaza/marka/${b}`, 0.75)),
    ...storeSeries().flatMap((s) => w(`/magaza/seri/${s.slug}`, 0.75, "weekly")),
    ...w("/magaza/dpu-kodlari", 0.7),
    ...DPU_GROUPS.flatMap((g) => w(`/magaza/dpu-kodlari/${g.id}`, 0.6)),
    ...w("/magaza/enkoder-kodlari", 0.7),
    ...ENC_SERIES.flatMap((s) => w(`/magaza/enkoder-kodlari/${s.slug}`, 0.6)),
    ...w("/magaza/kontrol-kodlari", 0.7),
    ...KONTROL_KOD_SERIES.flatMap((s) => w(`/magaza/kontrol-kodlari/${s.slug}`, 0.6)),
    ...products.flatMap((p) => w(`/magaza/${p.slug}`, 0.7)),
  ];
}
