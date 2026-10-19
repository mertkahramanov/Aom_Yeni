import type { Metadata } from "next";
import { Saira, IBM_Plex_Sans } from "next/font/google";
import { headers } from "next/headers";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { orgJsonLd, SITE } from "@/lib/seo";
import "./globals.css";

const saira = Saira({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "AOM | Endüstriyel Otomasyon, PLC, Servo Motor, Robotik Kaynak | Ankara",
    template: "%s | AOM",
  },
  description:
    "Angora Endüstriyel Makine: Ankara merkezli endüstriyel otomasyon ve makine otomasyonu; PLC/SCADA uyumlu ürünler, servo motor ve motor sürücüler, motion kontrol (enkoder), robotik kaynak hücreleri, pres güvenliği, CNC tezgâhlar ve tristörlü güç kontrol. Tasarım, imalat ve devreye alma tek çatı altında.",
  openGraph: { type: "website", locale: "tr_TR", siteName: "AOM" },
  other: { "geo.region": "TR-06", "geo.placename": "Ankara" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Çok dilli destek (18-10-2026): /en, /ru, /ar sayfaları kendi Locale* header/footer/WhatsApp/
  // çerez bandı bileşenlerini src/app/[locale]/layout.tsx içinde render eder. Bu Türkçe Header/
  // Footer/WhatsAppButton/CookieBanner'ın orada TEKRAR render edilmesini önlemek için middleware.ts'in
  // eklediği x-is-intl başlığına bakılır. Başlık yoksa (Türkçe sayfalar) davranış hiç değişmedi —
  // bu, mevcut TR sitesine sıfır risk garantisi verir.
  const hdrs = await headers();
  const isIntl = hdrs.get("x-is-intl") === "1";

  return (
    <html lang="tr" className={`${saira.variable} ${plex.variable}`}>
      <body>
        {/* Analytics, Suspense ile sarmalanmıyor (15-10-2026 düzeltmesi) — bkz. Analytics.tsx üst
            yorumu: consent default script'inin ilk render'a garanti girmesi için Suspense'in
            yalnızca component içindeki PageviewTracker'ı sarması gerekiyor. */}
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }} />
        {!isIntl && <Header />}
        <main>{children}</main>
        {!isIntl && (
          <>
            <Footer />
            <WhatsAppButton />
            <CookieBanner />
          </>
        )}
      </body>
    </html>
  );
}
