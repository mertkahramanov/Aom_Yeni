import type { MetadataRoute } from "next";
import { products, storeCategories, storeSeries } from "@/data/magaza";
import { DPU_GROUPS } from "@/data/dpuCodes";
import { ENC_SERIES } from "@/data/enkoder";
import { KONTROL_KOD_SERIES } from "@/data/kontrol";

const SITE = "https://aomtechnology.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/magaza`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...storeCategories().map((c) => ({ url: `${SITE}/magaza/kategori/${c.id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...storeSeries().map((s) => ({ url: `${SITE}/magaza/seri/${s.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.75 })),
    { url: `${SITE}/magaza/dpu-kodlari`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    ...DPU_GROUPS.map((g) => ({ url: `${SITE}/magaza/dpu-kodlari/${g.id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${SITE}/magaza/enkoder-kodlari`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    ...ENC_SERIES.map((s) => ({ url: `${SITE}/magaza/enkoder-kodlari/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${SITE}/magaza/kontrol-kodlari`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    ...KONTROL_KOD_SERIES.map((s) => ({ url: `${SITE}/magaza/kontrol-kodlari/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...products.map((p) => ({
      url: `${SITE}/magaza/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
