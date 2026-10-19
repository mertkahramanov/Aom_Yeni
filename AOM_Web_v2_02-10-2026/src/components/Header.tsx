import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

// 19-10-2026 güncellemesi (Mert onayı, bölüm yeniden yapılandırması): menü 5 öğeye indi.
// "Otomasyon" artık ayrı menü öğesi değil (içeriği Hakkımızda + Çözümlerimiz'e taşındı; /otomasyon
// sayfası silinmedi, yalnızca menüden kalktı). "Hizmetler" ve "Süreç" artık Çözümlerimiz'in
// alt blokları (bkz. src/app/page.tsx).
const menu = [
  { href: "/#hakkimizda", label: "Hakkımızda" },
  { href: "/#cozumler", label: "Çözümlerimiz" },
  { href: "/#oem", label: "OEM Partnerlerimiz" },
  { href: "/#referanslar", label: "Referanslarımız" },
  { href: "/#iletisim", label: "İletişim" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container inner">
        <Link href="/" aria-label="AOM ana sayfa" style={{ display: "flex" }}>
          <Image src="/aom-wordmark.png" alt="AOM" width={181} height={40} priority />
        </Link>
        <nav aria-label="Ana menü" className="site-nav">
          {menu.map((m) => (
            <Link key={m.href} href={m.href}>
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher current="tr" />
          <Link href="/magaza" className="btn btn-store">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20 8H6.2" />
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="17" cy="20" r="1.4" />
            </svg>
            Mağaza
          </Link>
          <Link href="/#iletisim" className="btn btn-primary">
            Proje başlatın
          </Link>
        </div>
      </div>
    </header>
  );
}
