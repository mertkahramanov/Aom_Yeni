import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, SITE } from "@/lib/seo";

// Çerez Politikası (15-10-2026) — kaynak: claude/CEREZ_POLITIKASI_TASLAK_15-10-2026.md (Web Sitesi projesi).
// Mert'in talimatıyla, [...] alanları doldurularak yayınlandı (bkz. 00_INDEKS kaydı). Bu bir hukuki
// danışmanlık metni değildir; AOM'un kendi onayıyla yayına alınmıştır.

const url = `${SITE}/cerez-politikasi`;

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "AOM'un www.aomtechnology.tr sitesinde kullandığı çerezler ve benzeri teknolojiler hakkında bilgilendirme.",
  alternates: { canonical: url },
  robots: { index: true, follow: true },
};

const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse", fontSize: 14 };
const thStyle: React.CSSProperties = { textAlign: "left", padding: "8px 10px", borderBottom: "2px solid var(--line)", background: "var(--surface-raised)" };
const tdStyle: React.CSSProperties = { padding: "8px 10px", borderBottom: "1px solid var(--line)" };

export default function CerezPolitikasiPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Ana sayfa", path: "/" },
    { name: "Çerez Politikası", path: "/cerez-politikasi" },
  ]);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 820 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <span>Çerez Politikası</span>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="eyebrow">Yasal</div>
        <h1 style={{ fontWeight: 800, fontSize: 34, lineHeight: 1.1 }}>Çerez Politikası</h1>
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink-subtle)" }}>Son güncelleme: 15.10.2026</p>
      </div>

      <p style={{ margin: 0, color: "var(--ink-muted)" }}>
        Bu Çerez Politikası, Angora Endüstriyel Makine Tekno. Otomas. San. ve Tic. Ltd. Şti. (&quot;AOM&quot;, &quot;biz&quot;)
        tarafından işletilen <strong>www.aomtechnology.tr</strong> internet sitesinde kullanılan çerezleri ve benzeri
        teknolojileri açıklar.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>Çerez nedir?</h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Çerezler, bir internet sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Benzer
          amaçla tarayıcının yerel depolama alanı (localStorage) da kullanılabilir. Bu politikada hepsi &quot;çerez&quot;
          olarak anılmıştır.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>Hangi çerezleri, hangi amaçla kullanıyoruz?</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h3 style={{ fontSize: 17, margin: 0 }}>1. Zorunlu çerezler (onayınız gerekmez)</h3>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            Sitenin çalışması ve çerez tercihlerinizin hatırlanması için gereklidir. Kapatılamaz.
          </p>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Ad</th>
                <th style={thStyle}>Sağlayıcı</th>
                <th style={thStyle}>Amaç</th>
                <th style={thStyle}>Süre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>aom_consent (yerel depolama)</td>
                <td style={tdStyle}>AOM</td>
                <td style={tdStyle}>Çerez tercihinizi saklar</td>
                <td style={tdStyle}>12 ay</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h3 style={{ fontSize: 17, margin: 0 }}>2. Analitik çerezler (yalnızca onayınızla)</h3>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            Sitemizin nasıl kullanıldığını (ziyaret edilen sayfalar, ziyaretçi sayısı, trafik kaynağı, teklif formu ve
            iletişim butonlarının kullanımı) toplu olarak ölçmemizi sağlar.
          </p>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Ad</th>
                <th style={thStyle}>Sağlayıcı</th>
                <th style={thStyle}>Amaç</th>
                <th style={thStyle}>Süre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>_ga</td>
                <td style={tdStyle}>Google (Google Analytics 4)</td>
                <td style={tdStyle}>Ziyaretçileri ayırt etmek</td>
                <td style={tdStyle}>2 yıl</td>
              </tr>
              <tr>
                <td style={tdStyle}>_ga_0L3GMR93MW</td>
                <td style={tdStyle}>Google (Google Analytics 4)</td>
                <td style={tdStyle}>Oturum durumunu tutmak</td>
                <td style={tdStyle}>2 yıl</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h3 style={{ fontSize: 17, margin: 0 }}>3. Reklam çerezleri (yalnızca onayınızla)</h3>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            Google reklamlarımızın etkisini ölçmek (ör. bir reklamdan gelen ziyaretçinin teklif talebi gönderip
            göndermediği) ve ilgi alanınıza uygun reklam gösterebilmek için kullanılır.
          </p>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Ad</th>
                <th style={thStyle}>Sağlayıcı</th>
                <th style={thStyle}>Amaç</th>
                <th style={thStyle}>Süre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>_gcl_au</td>
                <td style={tdStyle}>Google (Google Ads)</td>
                <td style={tdStyle}>Reklam tıklaması ile dönüşümü eşleştirmek</td>
                <td style={tdStyle}>90 gün</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 14 }}>
          Onay vermediğiniz sürece analitik ve reklam çerezleri tarayıcınıza yerleştirilmez. Bu durumda Google&apos;a
          çerez içermeyen, kimliğinizi belirlemeye yönelik olmayan sınırlı sinyaller (ör. sayfanın görüntülendiği
          bilgisi) iletilebilir (Google Consent Mode).
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>Tercihlerinizi nasıl yönetirsiniz?</h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Siteye ilk girişinizde açılan bantta &quot;Tümünü kabul et&quot;, &quot;Reddet&quot; veya &quot;Ayarlar&quot;
          seçeneklerinden birini seçebilirsiniz. Tercihinizi istediğiniz zaman sayfanın altındaki &quot;Çerez
          Ayarları&quot; bağlantısından değiştirebilir veya onayınızı geri alabilirsiniz. Tarayıcınızın ayarlarından
          çerezleri silebilir veya engelleyebilirsiniz. Google Analytics&apos;i tüm sitelerde devre dışı bırakmak için
          Google&apos;ın tarayıcı eklentisini kullanabilirsiniz:{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            tools.google.com/dlpage/gaoptout
          </a>
          .
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>Yurt dışına aktarım</h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Google çerezleri aracılığıyla toplanan veriler Google LLC ve bağlı şirketlerinin yurt dışındaki
          sunucularında işlenebilir. Ayrıntılar için{" "}
          <Link href="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metnimize</Link> bakınız.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>Kişisel verileriniz ve haklarınız</h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Çerezler aracılığıyla işlenen kişisel verilerinize ilişkin ayrıntılar ve 6698 sayılı KVKK&apos;nın 11.
          maddesindeki haklarınız için <Link href="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</Link>&apos;ni
          inceleyebilirsiniz.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, color: "var(--ink-muted)" }}>
        <h2 className="h2" style={{ fontSize: 22 }}>İletişim</h2>
        <div>Angora Endüstriyel Makine Tekno. Otomas. San. ve Tic. Ltd. Şti.</div>
        <div>İvedik OSB, Serhat Mah. 1147. Cad. No: 8, 06378 Yenimahalle / Ankara</div>
        <div>
          E-posta: <a href="mailto:info@aomtechnology.tr">info@aomtechnology.tr</a> · Telefon:{" "}
          <a href="tel:+905446247514">+90 544 624 75 14</a>
        </div>
        <p style={{ margin: "8px 0 0" }}>
          Bu politikayı gerektiğinde güncelleyebiliriz; güncel sürüm her zaman bu sayfada yayımlanır.
        </p>
      </div>
    </section>
  );
}
