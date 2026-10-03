import Image from "next/image";
import Link from "next/link";

const menu = [
  { href: "/#cozumler", label: "Çözümler" },
  { href: "/#hizmetler", label: "Hizmetler" },
  { href: "/#surec", label: "Süreç" },
  { href: "/#oem", label: "OEM partnerlikleri" },
  { href: "/#referanslar", label: "Referanslar" },
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
