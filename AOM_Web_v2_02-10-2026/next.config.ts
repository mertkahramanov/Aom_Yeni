import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
