"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";

// Mobil menü kabuğu (16-11-2026). Header.tsx ve LocaleHeader.tsx içeriklerini (logo, menü, butonlar)
// sunucu bileşeni olarak bu kabuğa children olarak verir; kabuk yalnızca aç/kapa durumunu tutar.
// ≤900px'de menü ve butonlar gizlenir, "Menü" butonuyla açılır (bkz. globals.css .nav-toggle).
// Masaüstünde (>900px) buton gizlidir ve görünüm eskisiyle birebir aynıdır.
// Menü; bir bağlantıya tıklanınca, sayfa değişince veya Esc'ye basılınca kapanır.
export default function HeaderShell({
  children,
  openLabel,
  closeLabel,
}: {
  children: ReactNode;
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Menüdeki herhangi bir bağlantıya tıklanınca kapat (aynı sayfadaki #hash bağlantıları dahil).
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  };

  return (
    <header className={`site-header${open ? " is-open" : ""}`}>
      <div className="container inner" onClick={onClick}>
        {children}
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? closeLabel : openLabel}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bars" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
