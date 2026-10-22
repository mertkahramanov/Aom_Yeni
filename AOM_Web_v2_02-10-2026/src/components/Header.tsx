import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

// 19-10-2026 güncellemesi (Mert onayı, bölüm yeniden yapılandırması): menü 5 öğeye indi.
// "Otomasyon" artık ayrı menü öğesi değil (içeriği Hakkımızda + Çözümlerimiz'e taşındı; /otomasyon
// sayfası silinmedi, yalnızca menüden kalktı). "Hizmetler" ve "Süreç" artık Çözümlerimiz'in
// alt blokları (bkz. src/app/page.tsx).
// 21-10-2026 güncellemesi (Mert onayı): "Çözümlerimiz" üzerine gelince açılan alt menü eklendi
// (bkz. globals.css .nav-dropdown). /otomasyon sayfası bu alt menüye eklenerek Çözümlerimiz
// kapsamına dahil edildi — sayfa taşınmadı/silinmedi, yalnızca header seviyesinde ilişkilendirildi.
// Ayrıca HeroSlider.tsx'teki "Otomasyon" slaytının CTA'sı artık #cozumler yerine /otomasyon'a gider.
const menu = [
  { href: "/#hakkimizda", label: "Hakkımızda" },
  { href: "/#cozumler", label: "Çözümlerimiz" },
  { href: "/#oem", label: "OEM Partnerlerimiz" },
  { href: "/#referanslar", label: "Referanslarımız" },
  { href: "/#iletisim", label: "İletişim" },
];

// Çözümlerimiz alt menüsü: Footer.tsx'teki "solutions" listesiyle birebir aynı 5 hizmet sayfası,
// artı /otomasyon (saha projeleri galerisi — video ve pano fotoğrafları).
const solutionsMenu = [
  { href: "/robotik-kaynak", label: "Robotik kaynak" },
  { href: "/pres-guvenligi", label: "Pres güvenliği" },
  { href: "/cnc-tezgah", label: "CNC tezgâh" },
  { href: "/plc-scada", label: "PLC, SCADA" },
  { href: "/tristorlu-guc-kontrol", label: "Tristörlü güç kontrol" },
  { href: "/otomasyon", label: "Otomasyon (saha projeleri)" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container inner">
        <Link href="/" aria-label="AOM ana sayfa" style={{ display: "flex" }}>
          <Image src="/aom-wordmark.png" alt="AOM" width={181} height={40} priority />
        </Link>
        <nav aria-label="Ana menü" className="site-nav">
          {menu.map((m) =>
            m.href === "/#cozumler" ? (
              <div key={m.href} className="nav-dropdown">
                <Link href={m.href} aria-haspopup="true">
                  {m.label}
                </Link>
                <div className="nav-dropdown-panel" role="menu" aria-label="Çözümlerimiz alt menüsü">
                  {solutionsMenu.map((s) => (
                    <Link key={s.href} href={s.href} role="menuitem">
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={m.href} href={m.href}>
                {m.label}
              </Link>
            )
          )}
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
