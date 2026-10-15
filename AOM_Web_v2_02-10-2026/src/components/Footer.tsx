"use client";

// Çerez Ayarları bağlantısı (15-10-2026): onay bandı kapandıktan sonra tercihi değiştirebilmek için
// CookieBanner.tsx'in dinlediği özel olayı tetikler (bkz. claude/CEREZ_BANDI_TALIMATI_15-10-2026.md).
import { OPEN_COOKIE_SETTINGS_EVENT } from "./CookieBanner";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container inner">
        <div>
          ANGORA ENDÜSTRİYEL MAKİNE TEKNO. OTOMAS. SAN. VE TİC. LTD. ŞTİ.
          <br />
          1147. Cad. No: 8, Yenimahalle / Ankara
        </div>
        <nav aria-label="Yasal bağlantılar" className="footer-legal">
          <a href="/cerez-politikasi">Çerez Politikası</a>
          <a href="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</a>
          <button
            type="button"
            className="footer-legal-btn"
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT))}
          >
            Çerez Ayarları
          </button>
        </nav>
        <div className="web">aomtechnology.tr</div>
      </div>
    </footer>
  );
}
