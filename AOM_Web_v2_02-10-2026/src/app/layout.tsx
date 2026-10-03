import type { Metadata } from "next";
import { Saira, IBM_Plex_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { orgJsonLd } from "@/lib/seo";
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
  metadataBase: new URL("https://aomtechnology.tr"),
  title: {
    default: "AOM | Robotik kaynak, pres güvenliği, CNC ve otomasyon",
    template: "%s | AOM",
  },
  description:
    "Angora Endüstriyel Makine: robotik kaynak hücreleri, pozisyonerler, pres güvenliği, CNC tezgâhlar ve tristörlü güç kontrol. Tasarım, imalat ve devreye alma tek çatı altında, Ankara.",
  openGraph: { type: "website", locale: "tr_TR", siteName: "AOM" },
  other: { "geo.region": "TR-06", "geo.placename": "Ankara" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${saira.variable} ${plex.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
