import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

// Header.tsx'in çok dilli karşılığı (18-10-2026). Aynı CSS sınıflarını kullanır (site-header,
// site-nav, header-actions, btn vb.) — görsel stil globals.css'ten hiç değişmeden miras alınır.
// Türkçe Header.tsx bu dosyadan etkilenmez, ayrı ve değişmeden kalır.
export default function LocaleHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="site-header">
      <div className="container inner">
        <Link href={`/${locale}`} aria-label={dict.nav.ariaLogo} style={{ display: "flex" }}>
          <Image src="/aom-wordmark.png" alt="AOM" width={181} height={40} priority />
        </Link>
        <nav aria-label={dict.nav.items.length ? dict.nav.ariaLogo : undefined} className="site-nav">
          {dict.nav.items.map((m) => (
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
            {dict.nav.store}
          </Link>
          <Link href={`/${locale}#iletisim`} className="btn btn-primary">
            {dict.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
