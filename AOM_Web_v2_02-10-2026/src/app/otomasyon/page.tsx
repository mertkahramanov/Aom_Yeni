import type { Metadata } from "next";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import TeklifForm from "@/components/TeklifForm";
import { breadcrumbJsonLd, ORG, REGION_LINE, SITE } from "@/lib/seo";

// Endüstriyel otomasyon sayfası (14-10-2026): Ankara'da "endüstriyel otomasyon", "makine otomasyonu",
// "PLC", "servo motor", "motion" aramalarında görünürlük için (Mert'in isteği). Çerçeve: ürün satışı +
// teknik ürün danışmanlığı; robotik kaynak/CNC/pres projelerindeki elektrik-kontrol yetkinliği zaten
// ana sayfadaki 7 adımlık süreçte ("Elektrik ve kontrol") yer alıyor, burada aynı yetkinlik PLC/servo/
// motion bağlamında yeniden ifade ediliyor — yeni, doğrulanmamış bir hizmet iddiası eklenmedi.
const url = `${SITE}/otomasyon`;

export const metadata: Metadata = {
  title: "Endüstriyel Otomasyon, PLC, Servo Motor, Motion Kontrol | Ankara",
  description:
    "AOM, Ankara merkezli endüstriyel otomasyon ve makine otomasyonu: PLC/SCADA uyumlu kontrol cihazları ve HMI, servo motor ve motor sürücüler, enkoderli motion kontrol. Robotik kaynak, CNC ve pres otomasyonu projelerinde ürün seçimi, pano entegrasyonu ve devreye alma desteği. Türkiye geneline teklif.",
  keywords: [
    "Ankara endüstriyel otomasyon",
    "makine otomasyonu Ankara",
    "PLC Ankara",
    "PLC uyumlu ürünler",
    "SCADA uyumlu ürünler",
    "servo motor Ankara",
    "servo sürücü",
    "motor sürücü Ankara",
    "motion kontrol",
    "otomasyon firması Ankara",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url,
    siteName: "AOM",
    title: "Endüstriyel Otomasyon, PLC, Servo Motor, Motion Kontrol | Ankara",
    description:
      "Ankara merkezli AOM'dan PLC/SCADA uyumlu kontrol cihazları, servo motor ve motor sürücüler, enkoderli motion kontrol; otomasyon projelerinde teknik destek.",
  },
};

const groups = [
  {
    id: "plc",
    title: "PLC / SCADA uyumlu ürünler",
    href: "/magaza#kontrol-cihazlari",
    linkLabel: "Kontrol cihazlarını incele",
    text: "Mağazamızda Autonics sıcaklık kontrol cihazı, sayıcı, zamanlayıcı, dijital panel metre, dijital ekran birimi ve grafik panel (HMI) serileri yer alır; bu ürünlerin tamamı RS485 (Modbus RTU) veya benzeri haberleşme seçenekleriyle PLC ya da SCADA sistemine bağlanarak izlenebilir ve kumanda edilebilir. Ürün seçimi ve PLC/SCADA bağlantısı konusunda teknik danışmanlık veriyoruz.",
  },
  {
    id: "servo",
    title: "Servo motor ve motor sürücüler",
    href: "/magaza#motor-suruculer",
    linkLabel: "Motor sürücüleri incele",
    text: "AC hız kontrol cihazları (invertör), DC motor sürücüler, yumuşak yol vericiler (soft starter) ve fren üniteleri mağazamızda ürün olarak bulunur; CNC ve otomasyon hücrelerinde kullanılan step ve servo motor sürücüleri de tedarik kapsamımızdadır. Uygulamaya uygun motor ve sürücü seçiminde destek veriyoruz.",
  },
  {
    id: "motion",
    title: "Motion kontrol / enkoderler",
    href: "/magaza#enkoderler-grup",
    linkLabel: "Enkoderleri incele",
    text: "Motion kontrol uygulamalarının temel geri besleme bileşeni enkoderdir. Mağazamızda Autonics'in artımlı (inkremental) ve mutlak enkoderleri 34 seri ve 8.644 sipariş koduyla, çözünürlük, çıkış tipi ve bağlantıya göre tam listelenir; kaplin, montaj ve PLC/sayıcı bağlantısı konusunda destek veririz.",
  },
];

export default function OtomasyonPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Endüstriyel otomasyon ürünleri ve teknik danışmanlık",
      name: "AOM Endüstriyel Otomasyon",
      url,
      provider: { "@type": "Organization", "@id": `${SITE}/#org`, name: ORG.name },
      areaServed: [
        { "@type": "City", name: "Ankara" },
        { "@type": "Country", name: "Türkiye" },
      ],
      description:
        "PLC/SCADA uyumlu kontrol cihazları, servo motor ve motor sürücüler, enkoderli motion kontrol ürünleri; otomasyon projelerinde ürün seçimi, pano entegrasyonu ve devreye alma desteği.",
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Endüstriyel Otomasyon", path: "/otomasyon" },
    ]),
  ];

  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span> <span>Endüstriyel Otomasyon</span>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <div className="eyebrow">Endüstriyel otomasyon · Ankara ve Türkiye geneli</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>
          Endüstriyel otomasyon, PLC, servo motor ve motion kontrol
        </h1>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 16 }}>
          AOM, Ankara merkezli bir endüstriyel otomasyon ve makine otomasyonu firmasıdır. PLC/SCADA uyumlu kontrol
          cihazları, servo motor ve motor sürücüler ile motion kontrol için enkoderleri mağazamızda ürün olarak
          satar, seçim ve tedarik konusunda teknik danışmanlık veririz. Robotik kaynak hücreleri, CNC tezgâhlar ve
          pres otomasyonu projelerimizin elektrik-kontrol aşamasında da aynı ürün ailelerini kullanır, pano
          entegrasyonu ve devreye alma desteği sağlarız. {REGION_LINE}
        </p>
        <SearchBox placeholder="Ürün kodu veya model ile arayın (ör. DPU34D-500A, E40S6-1000)" />
      </div>

      {groups.map((g) => (
        <div key={g.id} id={g.id} style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860, scrollMarginTop: 96 }}>
          <h2 className="h2" style={{ fontSize: 26 }}>
            {g.title}
          </h2>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>{g.text}</p>
          <div>
            <Link href={g.href} className="btn btn-outline">
              {g.linkLabel}
            </Link>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Otomasyon projelerinde teknik destek
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Robotik kaynak, CNC işleme ve pres güvenliği projelerimizin her biri; ihtiyaç analizi, proje öncesi
          simülasyon, mekanik tasarım, imalat ve montajın ardından elektrik ve kontrol aşamasını içerir. Bu
          aşamada PLC/SCADA uyumlu kontrol cihazları, servo motor ve sürücüler ile enkoderli motion kontrol
          bileşenlerini seçer, pano entegrasyonunu kurar ve devreye alırız.
        </p>
      </div>

      {/* Otomasyon sayfası teklif formu (14-10-2026) */}
      <div className="card contact-card" style={{ maxWidth: 520, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>Otomasyon ürünleri için teklif isteyin</div>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>
          Ürün seçimi, fiyat, stok ve teslim süresi için bize ulaşın; Ankara&apos;dan Türkiye&apos;nin her şehrine
          gönderim yapılır.
        </p>
        <a className="big" href="mailto:info@aomtechnology.tr">
          info@aomtechnology.tr
        </a>
        <a className="big" href="tel:+905446247514">
          0544 624 75 14
        </a>
        <TeklifForm formName="otomasyon_page_form" itemName="Endüstriyel otomasyon ürünleri" embedded />
      </div>
    </section>
  );
}
