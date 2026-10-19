"use client";

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";
import { OPEN_COOKIE_SETTINGS_EVENT } from "./CookieBanner";

// Footer.tsx'in çok dilli karşılığı (18-10-2026). Çözümler bağlantıları henüz çevrilmemiş
// hizmet sayfalarına (Türkçe) işaret eder — bu sayfalar çevrilince güncellenecek (görev #28).
export default function LocaleFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="container inner">
        <div>
          {dict.footer.legalName}
          <br />
          1147. Cad. No: 8, Yenimahalle / Ankara — {dict.footer.addressSuffix}
        </div>
        <nav aria-label={dict.footer.solutionsTitle} className="footer-solutions">
          <span className="footer-col-title">{dict.footer.solutionsTitle}</span>
          {dict.footer.solutions.map((s) => (
            <Link key={s.href} href={s.href}>
              {s.label}
            </Link>
          ))}
        </nav>
        <nav aria-label={dict.footer.cerez} className="footer-legal">
          <a href="/cerez-politikasi">{dict.footer.cerez}</a>
          <a href="/kvkk-aydinlatma-metni">{dict.footer.kvkk}</a>
          <button
            type="button"
            className="footer-legal-btn"
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT))}
          >
            {dict.footer.settings}
          </button>
        </nav>
        <div className="web">aomtechnology.tr/{locale}</div>
      </div>
    </footer>
  );
}
