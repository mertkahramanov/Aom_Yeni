import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProcessSteps from "@/components/ProcessSteps";
import TeklifForm from "@/components/TeklifForm";
import { breadcrumbJsonLd, faqJsonLd, hreflangAlternates, REGION_LINE, serviceJsonLd, SITE } from "@/lib/seo";

// Hizmet sayfası (16-10-2026): claude/HIZMET_SAYFALARI_TASLAK_15-10-2026.md taslağı,
// AOM_Eksantrik_Pres_Guvenlik_ve_Otomatik_Besleme_Brosuru.pdf içeriğiyle dolduruldu.
// Mevzuat/standart iddiaları broşürdeki gerçek standart kodlarıyla (EN ISO 16092-1/2,
// ISO 13849-1, IEC 62061, ISO 13855/13857/14119/14120/13851/13850, IEC 61496, ISO 12100,
// Makine Emniyeti Yönetmeliği 2006/42/AT, İş Ekipmanları Yönetmeliği 2009/104/AT) birebir
// eşleşiyor; AOM'un bir "uygunluk belgesi" düzenleyen onaylanmış kuruluş olduğu iddia
// EDİLMEDİ — broşürdeki gerçek çerçeveye göre "risk değerlendirmesi, ölçüm, test ve
// dokümantasyonla teslim" ifadesi kullanıldı (taslaktaki [Mert — dikkat: yanlış iddia
// yasal risk taşır] notu burada dikkate alındı). "Dönüşüm ne kadar sürer?" ve "pres kontrol
// panosu yenileme" gibi broşürde doğrulanmayan iddialar eklenmedi/dar kapsamda tutuldu.
// Broşürün referans bölümü genel/gizli olduğu için somut vaka uydurulmadı.
const url = `${SITE}/pres-guvenligi`;
const title = "Pres Güvenliği, Işık Perdesi ve Servo Besleme | Ankara";
const description =
  "Eksantrik preslerde ışık perdesi, kavrama-fren dönüşümü, kafes ve kilitli kapı çözümleri; servo NC besleme. Dönüşümler Ankara'daki kendi atölyemizde.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "pres güvenliği",
    "pres ışık perdesi",
    "eksantrik pres kavrama fren dönüşümü",
    "pres servo besleme",
    "NC besleme",
    "kamalı pres güvenliği",
  ],
  alternates: { canonical: url, languages: hreflangAlternates("/pres-guvenligi") },
  openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description },
};

const highlights = [
  "Tip 4 (IEC 61496) güvenlik ışık perdesi",
  "EN ISO 13855'e göre ölçülen durma süresi ve güvenlik mesafesi",
  "EN ISO 16092-2 mekanik pres güvenlik gereksinimleri",
  "0–500 mm malzeme genişliği, 10 µm (0,01 mm) adım hassasiyetinde servo NC besleme",
];

const services: { code?: string; title: string; text: string }[] = [
  {
    code: "A",
    title: "Güvenlik ışık perdesi entegrasyonu",
    text: "Strok ortasında durabilen preslerde Tip 4 (IEC 61496) ışık perdesi; mesafe EN ISO 13855'e göre hesaplanır.",
  },
  {
    code: "B",
    title: "Kavrama-fren dönüşümü + ışık perdesi",
    text: "Kamalı preste pnömatik kavrama-fren dönüşümü (emniyet çift valfli) ve ardından ışık perdesi; elle beslemeli hızlı üretimde kullanılır.",
  },
  {
    code: "C",
    title: "Kafes ve kilitli kayar kapı",
    text: "Otomatik beslemeli kamalı preslerde çevre kafesi ve kilitli kayar kapı; kalıba erişim fiziksel olarak kapatılır.",
  },
  {
    code: "D",
    title: "Kilitli kapı, tek strok",
    text: "Elle beslemeli kamalı preslerde kilitli kapı ve tek strok mekanizması; kapı kapanmadan strok başlamaz.",
  },
  {
    title: "Servo NC otomatik besleme",
    text: "Rulo açıcı, doğrultma ve servo NC besleyiciden oluşan hat; besleme yalnızca kalıp açıkken yapılır, pres ve besleyici aynı krank açısına göre çalışır. 0–500 mm malzeme genişliği, 10 µm adım hassasiyeti.",
  },
  {
    title: "Güvenlik devresi ve koruyucu pano imalatı",
    text: "Güvenlik rölesi veya güvenlik PLC'si (EN ISO 13849-1), acil stop, mod seçimi ve strok izleme devresi; koruyucular ve panolar kendi atölyemizde hazırlanıp sahada kurulur.",
  },
  {
    title: "Satış sonrası servis ve periyodik kontrol",
    text: "Durma süresinin periyodik ölçümü, güvenlik fonksiyonu testleri, periyodik kontrol desteği, yedek parça ve valf/kontaktör ömür takibi (çevrim sayısına göre).",
  },
];

const standards = [
  { group: "A tipi · temel", items: "ISO 12100 risk değerlendirmesi ve risk azaltma" },
  {
    group: "B tipi · güvenlik konuları",
    items: "ISO 13849-1 · IEC 62061 güvenlik fonksiyonları · ISO 13855 güvenlik mesafesi · ISO 13857 erişim · ISO 14119 kilitleme · ISO 14120 koruyucular · ISO 13851 çift el · ISO 13850 acil stop · IEC 61496 ışık perdesi",
  },
  { group: "C tipi · prese özel", items: "EN ISO 16092-1 genel · EN ISO 16092-2 mekanik presler" },
  {
    group: "Mevzuat (TR/AB)",
    items: "Makine Emniyeti Yönetmeliği (2006/42/AT) · İş Ekipmanları Yönetmeliği (2009/104/AT)",
  },
];

const faqs = [
  {
    q: "Eski kamalı (tam devirli) preslere ışık perdesi takılabilir mi?",
    a: "Tam devirli kamalı preslerde ışık perdesi tek başına yeterli koruma sayılmaz; AOM bu preslerde ışık perdesini önce pnömatik kavrama-fren dönüşümüyle (B çözümü) birlikte uygular veya kilitli kapı ile tek strok mekanizması kurar (D çözümü).",
  },
  {
    q: "Servo besleme hangi malzeme genişliklerinde çalışır?",
    a: "0–500 mm malzeme genişliği, 10 µm (0,01 mm) adım hassasiyetinde çalışır; besleme yalnızca kalıp açıkken yapılır ve presle senkron ilerler.",
  },
  {
    q: "Mevzuata uygunluk belgesi veriyor musunuz?",
    a: "AOM onaylanmış kuruluş değildir ve resmi uygunluk belgesi düzenlemez. Projeyi ISO 12100 risk değerlendirmesi, EN ISO 13855'e göre durma süresi ve güvenlik mesafesi ölçümü, güvenlik fonksiyonu testleri ile yürütür; devreye alma raporu, kullanım talimatı ve test kayıtlarıyla teslim ederiz. Yönetmelikte belirtilen yasal periyodik kontroller yetkili kontrol kuruluşu tarafından, AOM desteğiyle yapılır.",
  },
  {
    q: "Hangi tonajdaki preslerle çalışıyorsunuz?",
    a: "Korumayı tonaj değil; kavrama tipi, besleme şekli, durma süresi, tabla ölçüsü ve operatör sayısı belirler. Küçükten (ör. ≤40 t) büyük tonaja (ör. >160 t) kadar her sınıf için aynı standart çerçevesinde uygun çözümü uygularız; nihai seçim yerinde risk analizi ve durma süresi ölçümüyle yapılır.",
  },
];

export default function PresGuvenligiPage() {
  const jsonLd = [
    serviceJsonLd({
      name: "AOM Pres Güvenliği ve Otomatik Besleme",
      url,
      serviceType: "Eksantrik pres güvenlik bariyeri ve servo otomatik besleme dönüşümü",
      description,
    }),
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Çözümler", path: "/#cozumler" },
      { name: "Pres Güvenliği", path: "/pres-guvenligi" },
    ]),
    faqJsonLd(faqs),
  ];

  return (
    <section className="container hizmet-section" style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/#cozumler">Çözümler</Link> <span aria-hidden="true">/</span> <span>Pres Güvenliği</span>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 860 }}>
        <div className="eyebrow">Pres güvenliği · Ankara</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Pres güvenliği ve otomatik besleme</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 16 }}>
          Eksantrik ve kamalı preslerinizi güvenli ve otomatik hâle getiriyoruz. Işık perdesi, kavrama-fren
          dönüşümü, koruma kafesi ve kilitli kapı çözümlerini; servo NC besleme sistemleriyle birlikte
          tasarlıyor, dönüşümleri Ankara&apos;daki kendi mekanik atölyemizde yapıyoruz. {REGION_LINE}
        </p>
      </div>

      <ul className="service-list" style={{ maxWidth: 980 }}>
        {highlights.map((h) => (
          <li key={h} className="card">
            <span style={{ fontSize: 15 }}>{h}</span>
          </li>
        ))}
      </ul>

      <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        <Image
          src="/hizmetler/pres-guvenligi/pres-guvenligi-donusum_16-10-2026.webp"
          alt="Işık perdesi, kavrama-fren dönüşümü, servo besleyici ve güvenlik kontrol ünitesi ile donatılmış eksantrik pres şeması"
          width={1600}
          height={800}
          style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
        />
      </figure>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Neler yapıyoruz
        </h2>
      </div>
      <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
        {services.map((s) => (
          <div key={s.title} className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 8 }}>
            {s.code && (
              <span className="placeholder-badge" style={{ alignSelf: "flex-start" }}>
                Çözüm {s.code}
              </span>
            )}
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 17 }}>{s.title}</strong>
            <p style={{ margin: 0, fontSize: 14.5, color: "var(--ink-muted)" }}>{s.text}</p>
          </div>
        ))}
      </div>

      {/* Önce / sonra */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 980 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Aynı pres, bambaşka bir iş yeri
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Presinizi değiştirmeniz gerekmez. AOM mevcut eksantrik prese güvenlik sistemi ve otomatik besleme
          ekler; operatör kalıbın önünden kalkar, kontrol panelinin başına geçer.
        </p>
        <figure style={{ margin: 0 }}>
          <Image
            src="/hizmetler/pres-guvenligi/pres-guvenligi-once-sonra_16-10-2026.webp"
            alt="Dönüşümden önce operatörün elinin kalıp bölgesinde olduğu pres ile dönüşümden sonra kapısı kilitli, kontrol panelinden yönetilen pres karşılaştırması"
            width={1600}
            height={960}
            style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
          />
        </figure>
      </div>

      <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h2 className="h2" style={{ fontSize: 22 }}>
            Servo NC besleme: her strokta aynı adım
          </h2>
          <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>
            Servo NC besleme hattı bandı rulodan alır, doğrultur ve her strokta HMI&apos;dan girilen adım
            boyu kadar kalıba sürer. Besleme yalnızca kalıp açıkken yapılır; pres ve besleyici aynı krank
            açısına göre çalışır.
          </p>
        </div>
        <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          <Image
            src="/hizmetler/pres-guvenligi/pres-guvenligi-otomatik-besleme_16-10-2026.webp"
            alt="Rulo açıcı, doğrultma, servo NC besleyici ve pres/kalıptan oluşan otomatik besleme hattı şeması"
            width={1600}
            height={251}
            style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
          />
        </figure>
      </div>

      {/* Standartlar */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 980 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Standart çerçevesi
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Pres güvenliği yasal mevzuat, uluslararası A, B ve C tipi standartlar ve ülke kurallarıyla
          tanımlanır. AOM koruma çözümlerini bu çerçeveye göre tasarlar, uygular ve belgeler.
        </p>
        <table className="spec-table">
          <tbody>
            {standards.map((s) => (
              <tr key={s.group}>
                <th scope="row">{s.group}</th>
                <td>{s.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProcessSteps />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Kimlerle çalıştık
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Proje ayrıntıları gizlilik anlaşmaları kapsamında olduğu için somut bir vaka paylaşmıyoruz;{" "}
          <Link href="/#referanslar">başlıca referanslarımızı ana sayfada</Link> görebilirsiniz.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Sıkça sorulan sorular
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {faqs.map((f) => (
            <div key={f.q} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>{f.q}</strong>
              <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card contact-card" style={{ maxWidth: 520, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>
          Presiniz için keşif planlayalım
        </div>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>
          Presinizin tonajını, kavrama tipini ve besleme şeklini gönderin; uygun çözümü birlikte belirleyelim.
        </p>
        <a className="big" href="mailto:info@aomtechnology.tr">
          info@aomtechnology.tr
        </a>
        <a className="big" href={`tel:+905446247514`}>
          0544 624 75 14
        </a>
        <TeklifForm formName="pres_guvenligi_page_form" itemName="Pres güvenliği ve otomatik besleme" embedded />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>
          İlgili
        </h2>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 10 }}>
          <li><Link href="/robotik-kaynak" className="store-chip">Robot - Robotik Otomasyon</Link></li>
          <li><Link href="/cnc-tezgah" className="store-chip">CNC işleme merkezleri</Link></li>
          <li><Link href="/plc-scada" className="store-chip">PLC, SCADA ve makine otomasyonu</Link></li>
        </ul>
      </div>
    </section>
  );
}
