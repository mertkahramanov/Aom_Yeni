import type { NextConfig } from "next";

// Güvenlik başlıkları (21-11-2026). Ziyaretçiye görünen hiçbir şeyi değiştirmez.
// - HSTS: tarayıcı siteyi her zaman HTTPS ile açar. includeSubDomains BİLEREK yok: alt alan
//   adlarında (ör. e-posta paneli) HTTPS olmayan bir servis varsa bozulmasın.
// - CSP yalnızca "Report-Only" modunda: hiçbir şeyi engellemez, sadece kurala uymayan kaynakları
//   tarayıcı konsoluna yazar. Birkaç hafta konsolda ihlal görülmezse "Content-Security-Policy"
//   olarak (engelleyen moda) çevrilebilir. Google Analytics (gtag) ve Vercel kaynakları izinli.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://vitals.vercel-insights.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Content-Security-Policy-Report-Only", value: CSP },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // 301 (kalıcı) yönlendirmeler — eski site adreslerinden gelen Google Search Console
  // tıklamalarının 404'e düşmesini önler. Kaynak: claude/SITE_TRAFIK_DURUM_14-10-2026.md.
  async redirects() {
    return [
      { source: "/kurumsal/hakkimizda", destination: "/", permanent: true },
      // 16-11-2026: Yaskawa marka sayfası artık var; eski adres doğrudan ona yönlenir.
      { source: "/markalarimiz/yaskawa", destination: "/magaza/marka/yaskawa", permanent: true },
      { source: "/iletisim", destination: "/#iletisim", permanent: true },
      { source: "/urunler", destination: "/magaza", permanent: true },
      { source: "/kurumsal/misyon-vizyon", destination: "/", permanent: true },
      { source: "/medikal-cihazlar", destination: "/", permanent: true },
      { source: "/referanslarimiz", destination: "/#referanslar", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
