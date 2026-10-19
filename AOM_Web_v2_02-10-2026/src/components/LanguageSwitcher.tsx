"use client";

import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/locales";

// Header dil değiştirici (19-10-2026). Hem Header.tsx (Türkçe, kök) hem LocaleHeader.tsx
// (/en, /ru, /ar) içine eklenir. Yol öneki birebir eşlenir: aynı sayfanın karşılığına gider
// (ör. /robotik-kaynak <-> /en/robotik-kaynak). Karşılık sayfa henüz yoksa (örn. bir sonraki
// çeviri aşaması bitmeden önce), ilgili dilin ana sayfasına düşer — 404 yerine güvenli bir yol.
// Mevcut hiçbir bileşen/CSS kuralı değiştirilmedi, yalnızca eklendi.
//
// 19-10-2026 (3) düzeltmesi — ÇİFT HEADER HATASI: Next.js'in kök layout'u (src/app/layout.tsx)
// Türkçe Header/Footer'ı middleware'in eklediği "x-is-intl" isteği başlığına bakarak atlıyor
// (bkz. root layout üstündeki yorum). Bu kontrol yalnızca GERÇEK bir HTTP isteğinde çalışır.
// Next.js <Link> ile yapılan istemci-taraflı (client-side) yönlendirmede ise App Router, kök
// layout'un daha önce render edilmiş çıktısını isteğe bağlı olarak ÖNBELLEKTEN kullanabilir ve
// bu "x-is-intl" kontrolünü tazelemeyebilir — sonuç: TR sayfasından dil değiştirip /en, /ru veya
// /ar'a geçince eski Türkçe Header/Footer, yeni İngilizce/Rusça/Arapça Header ile ÜST ÜSTE
// görünebiliyor (kullanıcı ekran görüntüsüyle bildirdi). Düz bir <a> etiketi ise TARAYICIYA tam
// bir sayfa yüklemesi yaptırır; bu da middleware'i ve kök layout'un başlık kontrolünü her dil
// değişiminde yeniden ve doğru çalıştırır. Bu yüzden burada bilerek next/link DEĞİL, düz <a>
// kullanılıyor — SPA geçiş hızından burada ödün veriliyor ama çift header hatası tamamen ortadan
// kalkıyor. (Not: KVKK/çerez politikası linkleri de projede zaten hep düz <a> ile yapılmış, aynı
// sebepten; bu bileşen o deseni dil değiştirici için de uyguluyor.)

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
            <a href={hrefFor(opt)} className="lang-switcher-link">
              {LABELS[opt]}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
