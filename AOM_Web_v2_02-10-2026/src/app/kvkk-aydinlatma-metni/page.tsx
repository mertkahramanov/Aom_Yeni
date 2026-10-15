import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, SITE } from "@/lib/seo";

// KVKK Aydınlatma Metni (15-10-2026) — kaynak: claude/KVKK_AYDINLATMA_TASLAK_15-10-2026.md (Web Sitesi projesi).
// Mert'in açık talimatıyla ([...] alanları için hukuki danışman beklenmeden) yayınlandı. Doldurulan
// alanlarda somut, doğrulanabilir bilgi (tarih, sitede zaten yayımlı unvan/adres) veya gerçekte uygulanan
// işleyişi yansıtan genel ifadeler kullanıldı; MERSİS numarası elimde olmadığı için uydurulmadı — bu sayfaya
// ayrıca eklenmedi, Mert eklemek isterse kolayca eklenebilir. Bu metin hukuki danışmanlık değildir.

const url = `${SITE}/kvkk-aydinlatma-metni`;

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "6698 sayılı KVKK uyarınca AOM'un www.aomtechnology.tr sitesi ziyaretçilerine yönelik aydınlatma metni.",
  alternates: { canonical: url },
  robots: { index: true, follow: true },
};

const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse", fontSize: 14 };
const thStyle: React.CSSProperties = { textAlign: "left", padding: "8px 10px", borderBottom: "2px solid var(--line)", background: "var(--surface-raised)" };
const tdStyle: React.CSSProperties = { padding: "8px 10px", borderBottom: "1px solid var(--line)", verticalAlign: "top" };

export default function KvkkAydinlatmaPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Ana sayfa", path: "/" },
    { name: "KVKK Aydınlatma Metni", path: "/kvkk-aydinlatma-metni" },
  ]);
  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 820 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <span>KVKK Aydınlatma Metni</span>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="eyebrow">Yasal</div>
        <h1 style={{ fontWeight: 800, fontSize: 34, lineHeight: 1.1 }}>Kişisel Verilerin Korunması Hakkında Aydınlatma Metni</h1>
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink-subtle)" }}>Son güncelleme: 15.10.2026</p>
      </div>

      <p style={{ margin: 0, color: "var(--ink-muted)" }}>
        6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, <strong>www.aomtechnology.tr</strong>{" "}
        internet sitesini ziyaret eden ve sitedeki formlar veya iletişim kanalları aracılığıyla bizimle iletişime
        geçen kişilerin kişisel verilerinin işlenmesine ilişkin sizi bilgilendirmek isteriz.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>1. Veri sorumlusu</h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Angora Endüstriyel Makine Tekno. Otomas. San. ve Tic. Ltd. Şti.
          <br />
          Adres: İvedik OSB, Serhat Mah. 1147. Cad. No: 8, 06378 Yenimahalle / Ankara
          <br />
          E-posta: <a href="mailto:info@aomtechnology.tr">info@aomtechnology.tr</a> · Telefon:{" "}
          <a href="tel:+905446247514">+90 544 624 75 14</a>
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>2. İşlenen kişisel veriler</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Kategori</th>
              <th style={thStyle}>Veriler</th>
              <th style={thStyle}>Kaynak</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>Kimlik</td>
              <td style={tdStyle}>Ad, soyad</td>
              <td style={tdStyle}>Teklif/iletişim formu</td>
            </tr>
            <tr>
              <td style={tdStyle}>İletişim</td>
              <td style={tdStyle}>E-posta adresi, telefon numarası (isteğe bağlı)</td>
              <td style={tdStyle}>Teklif/iletişim formu, e-posta, telefon, WhatsApp</td>
            </tr>
            <tr>
              <td style={tdStyle}>Müşteri işlem</td>
              <td style={tdStyle}>Şirket adı, talep ve mesaj içeriği, ilgilenilen ürün, gönderdiğiniz teknik dosyalar</td>
              <td style={tdStyle}>Teklif/iletişim formu, e-posta</td>
            </tr>
            <tr>
              <td style={tdStyle}>İşlem güvenliği</td>
              <td style={tdStyle}>IP adresi, tarih-saat, tarayıcı bilgisi (sunucu kayıtları)</td>
              <td style={tdStyle}>Site altyapısı</td>
            </tr>
            <tr>
              <td style={tdStyle}>Pazarlama / analitik (yalnızca onayınızla)</td>
              <td style={tdStyle}>Çevrimiçi tanımlayıcılar, site kullanım verileri</td>
              <td style={tdStyle}>
                Çerezler (bkz. <Link href="/cerez-politikasi">Çerez Politikası</Link>)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>3. İşleme amaçları ve hukuki sebepler</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Amaç</th>
              <th style={thStyle}>Hukuki sebep (KVKK m.5)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>Teklif ve bilgi taleplerinize yanıt vermek, sizinle iletişime geçmek</td>
              <td style={tdStyle}>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (m.5/2-c)</td>
            </tr>
            <tr>
              <td style={tdStyle}>Satış, sipariş, teslimat ve satış sonrası destek süreçlerini yürütmek</td>
              <td style={tdStyle}>Sözleşmenin kurulması/ifası (m.5/2-c)</td>
            </tr>
            <tr>
              <td style={tdStyle}>Yasal yükümlülükleri yerine getirmek (fatura, kayıt saklama vb.)</td>
              <td style={tdStyle}>Hukuki yükümlülük (m.5/2-ç)</td>
            </tr>
            <tr>
              <td style={tdStyle}>Site güvenliğini sağlamak, kötüye kullanımı önlemek</td>
              <td style={tdStyle}>Meşru menfaat (m.5/2-f)</td>
            </tr>
            <tr>
              <td style={tdStyle}>Site kullanımını ölçmek ve reklamlarımızın etkisini görmek</td>
              <td style={tdStyle}>
                Açık rıza (m.5/1) — çerez bandı üzerinden; dilediğiniz an geri alınabilir
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>4. Aktarım</h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Kişisel verileriniz, yukarıdaki amaçlarla sınırlı olarak hizmet sağlayıcılarımıza (site barındırma: Vercel
          Inc.; e-posta iletimi: Resend; alan adı ve kurumsal e-posta hizmeti sağlayıcımız; analitik ve reklam
          ölçümü: Google LLC / Google Ireland Ltd. — yalnızca onayınız varsa) ve hukuki yükümlülük kapsamında talep
          edilmesi hâlinde yetkili kamu kurum ve kuruluşlarına aktarılabilir.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          <strong>Yurt dışına aktarım:</strong> Vercel, Resend ve Google&apos;ın sunucuları yurt dışında (ör. ABD,
          Japonya, AB) bulunabilir. Google&apos;a yapılan aktarımlar çerez bandı üzerinden verdiğiniz açık rızaya
          (KVKK m.9) dayanır; Vercel ve Resend&apos;e yapılan aktarımlar ise sitenin ve teklif/iletişim
          taleplerinizin yanıtlanması hizmetinin sunulabilmesi için bu hizmet sağlayıcıların veri işleyen sıfatıyla
          gerçekleştirdiği, hizmetin ifası için zorunlu aktarımlardır.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>5. Saklama süresi</h2>
        <ul style={{ margin: 0, paddingLeft: 20, color: "var(--ink-muted)", display: "flex", flexDirection: "column", gap: 4 }}>
          <li>Teklif ve iletişim talepleri: talebin sonuçlanmasından itibaren 2 yıl; satışa dönüşen kayıtlar ilgili mevzuattaki süre boyunca (10 yıl).</li>
          <li>Sunucu kayıtları: güvenlik ve teknik sorun giderme amacıyla makul bir süre boyunca saklanır ve düzenli olarak temizlenir.</li>
          <li>
            Çerez verileri: <Link href="/cerez-politikasi">Çerez Politikası</Link>&apos;ndaki süreler.
          </li>
        </ul>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>Süre sonunda veriler silinir, yok edilir veya anonim hâle getirilir.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>6. Haklarınız (KVKK m.11)</h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, amacına uygun kullanılıp
          kullanılmadığını öğrenme, aktarıldığı üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini, KVKK
          m.7 şartlarıyla silinmesini/yok edilmesini ve bu işlemlerin aktarılan üçüncü kişilere bildirilmesini
          isteme, otomatik sistemlerle analiz sonucu aleyhinize bir sonuç çıkmasına itiraz etme ve kanuna aykırı
          işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>7. Başvuru</h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ&apos;e uygun olarak{" "}
          <a href="mailto:info@aomtechnology.tr">info@aomtechnology.tr</a> adresine sistemimizde kayıtlı e-posta
          adresinizden ya da yukarıdaki adresimize ıslak imzalı dilekçe ile iletebilirsiniz. Başvurularınız en geç
          30 gün içinde ücretsiz olarak sonuçlandırılır.
        </p>
      </div>
    </section>
  );
}
