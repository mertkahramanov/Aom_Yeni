import { SITE } from "@/lib/seo";

// Sitemap index (21-11-2026). Asıl girdiler src/app/sitemap.ts'teki generateSitemaps ile
// /sitemap/0.xml ve /sitemap/1.xml olarak üretilir; bu adres (Search Console'a kayıtlı olan)
// ikisini listeler. Yeni bir parça eklenirse buradaki listeye de eklenmeli.
const IDS = [0, 1];

export const dynamic = "force-static";

export function GET() {
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    IDS.map((id) => `  <sitemap><loc>${SITE}/sitemap/${id}.xml</loc></sitemap>`).join("\n") +
    `\n</sitemapindex>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
