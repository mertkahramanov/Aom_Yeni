"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/locales";

// Header dil değiştirici (19-10-2026). Hem Header.tsx (Türkçe, kök) hem LocaleHeader.tsx
// (/en, /ru, /ar) içine eklenir. Yol öneki birebir eşlenir: aynı sayfanın karşılığına gider
// (ör. /robotik-kaynak <-> /en/robotik-kaynak). Karşılık sayfa henüz yoksa (örn. bir sonraki
// çeviri aşaması bitmeden önce), ilgili dilin ana sayfasına düşer — 404 yerine güvenli bir yol.
// Mevcut hiçbir bileşen/CSS kuralı değiştirilmedi, yalnızca eklendi.

const LABELS: Record<"tr" | Locale, string> = { tr: "TR", en: "EN", ru: "RU", ar: "AR" };
const ORDER: ("tr" | Locale)[] = ["tr", "en", "ru", "ar"];

export default function LanguageSwitcher({ current }: { current: "tr" | Locale }) {
  const pathname = usePathname() || "/";

  let basePath = pathname;
  for (const loc of locales) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      basePath = pathname.slice(`/${loc}`.length) || "/";
      break;
    }
  }

  function hrefFor(target: "tr" | Locale): string {
    if (target === "tr") return basePath;
    return basePath === "/" ? `/${target}` : `/${target}${basePath}`;
  }

  return (
    <div className="lang-switcher" role="group" aria-label="Dil seçimi / Language">
      {ORDER.map((opt, i) => (
        <span key={opt} className="lang-switcher-item">
          {i > 0 && (
            <span className="lang-switcher-sep" aria-hidden="true">
              ·
            </span>
          )}
          {opt === current ? (
            <span className="lang-switcher-current" aria-current="true">
              {LABELS[opt]}
            </span>
          ) : (
            <Link href={hrefFor(opt)} className="lang-switcher-link">
              {LABELS[opt]}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
