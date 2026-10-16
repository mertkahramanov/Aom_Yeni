import type { Metadata } from "next";
import Link from "next/link";
import ProcessSteps from "@/components/ProcessSteps";
import TeklifForm from "@/components/TeklifForm";
import { breadcrumbJsonLd, faqJsonLd, REGION_LINE, serviceJsonLd, SITE } from "@/lib/seo";

// Hizmet sayfası (16-10-2026): claude/HIZMET_SAYFALARI_TASLAK_15-10-2026.md taslağı temel
// alındı. Bu hizmet için ayrı bir broşür yok; taslaktaki [Mert onayı] bekleyen maddeler,
// diğer 4 broşürün "OEM partnerliklerimiz" bölümlerinde tekrarlanan, doğrulanmış PLC/HMI
// marka bilgisiyle (Siemens, Mitsubishi Electric, Omron, Schneider Electric, Delta — hepsi
// "PLC" etiketiyle en az bir broşürde geçiyor) ve "pano imalatı/sahada kurulum" ile "devreye
// alma, eğitim" gibi tüm broşürlerde tekrarlanan gerçek iş kalemleriyle dolduruldu. "Uzaktan
// destek" gibi hiçbir broşürde AOM'un kendi hizmeti olarak net geçmeyen bir ifade kullanılmadı
// (yalnızca oksijen/azot broşüründe, kapsam dışı bir üründe geçiyordu).
const url = `${SITE}/plc-scada`;
const title = "PLC Programlama, SCADA ve Makine Otomasyonu | Ankara | AOM";
const description =
  "Ankara'da PLC ve HMI programlama, SCADA, izleme ve raporlama, özel makine otomasyonu ve pano projeleri. Tasarımdan devreye almaya tek ekip, tek muhatap.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "plc programlama ankara",
    "scada yazılımı",
    "otomasyon firması ankara",
    "makine otomasyonu",
    "pano tasarımı",
    "retrofit otomasyon",
  ],
  alternates: { canonical: url },
  openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description },
};

const highlights = [
  "Siemens, Mitsubishi Electric, Omron, Schneider Electric, Delta PLC/HMI platformlarıyla çalışma deneyimi",
  "RS485 Modbus RTU haberleşme ile PLC/SCADA entegrasyonu",
  "Pano tasarımı ve imalatı kendi atölyemizde",
  "Devreye alma ve operatör eğitimi",
];

const services = [
  {
    title: "PLC ve HMI programlama",
    text: "Siemens, Mitsubishi Electric, Omron, Schneider Electric ve Delta platformlarında PLC ve HMI programlama.",
  },
  {
    title: "SCADA, izleme, raporlama ve veri toplama",
    text: "Üretim verilerinin tek ekrandan izlenmesi, reçete/profil yönetimi, alarm ve olay kaydı; RS485 Modbus RTU ile saha cihazlarından veri toplama.",
  },
  {
    title: "Özel makine otomasyonu ve retrofit",
    text: "Yeni özel makinelerin otomasyonu ve mevcut makinelerin PLC/HMI dönüşümü (retrofit); robotik kaynak, CNC ve pres projelerimizde kullandığımız aynı yaklaşımla.",
  },
  {
    title: "Elektrik proje ve pano tasarımı",
    text: "Elektrik proje çizimi, pano tasarımı ve imalatı kendi atölyemizde yapılır, sahada kurulur.",
  },
  {
    title: "Servo ve motion kontrol uygulamaları",
    text: "Servo motor/sürücü seçimi ve enkoderli motion kontrol entegrasyonu (bkz. mağazamızdaki ürün ailesi).",
  },
  {
    title: "Devreye alma ve operatör eğitimi",
    text: "Sahada devreye alma, fonksiyon testleri ve operatör eğitimi; Ankara'dan yerinde teknik destek.",
  },
];

const faqs = [
  {
    q: "Hangi PLC ve HMI markalarıyla çalışıyorsunuz?",
    a: "Siemens, Mitsubishi Electric, Omron, Schneider Electric ve Delta platformlarında proje yürütüyoruz; fabrikanızda hangi marka standartsa o markayla kurarız.",
  },
  {
    q: "Mevcut bir makineyi otomasyona dönüştürebilir misiniz (retrofit)?",
    a: "Evet. Eski kontrol sistemini PLC/HMI ile yeniliyor, gerekiyorsa SCADA'ya veri aktarımı ekliyoruz; robotik kaynak, CNC ve pres projelerimizde kullandığımız aynı mühendislik yaklaşımını uyguluyoruz.",
  },
  {
    q: "Pano tasarımı ve imalatını da siz mi yapıyorsunuz?",
    a: "Evet, elektrik proje ve pano tasarımını kendi ekibimiz yapar, imalatı kendi atölyemizde gerçekleştirir ve sahada kurarız.",
  },
  {
    q: "/otomasyon sayfasındaki ürünlerle bu sayfanın farkı ne?",
    a: "/otomasyon sayfamızda PLC/SCADA uyumlu kontrol cihazı, servo sürücü ve enkoder gibi ürünleri satın alabilirsiniz. Bu sayfa ise projeyi uçtan uca üstlendiğimiz PLC, SCADA ve makine otomasyonu hizmetini anlatır; aynı ürün ailelerini kendi projelerimizde de kullanırız.",
  },
];

export default function PlcScadaPage() {
  const jsonLd = [
    serviceJsonLd({
      name: "AOM PLC, SCADA ve Makine Otomasyonu",
      url,
      serviceType: "PLC/HMI programlama, SCADA, özel makine otomasyonu ve pano projeleri",
      description,
    }),
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Çözümler", path: "/#cozumler" },
      { name: "PLC, SCADA ve Makine Otomasyonu", path: "/plc-scada" },
    ]),
    faqJsonLd(faqs),
  ];

  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/#cozumler">Çözümler</Link> <span aria-hidden="true">/</span> <span>PLC, SCADA ve Makine Otomasyonu</span>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 860 }}>
        <div className="eyebrow">PLC · SCADA · makine otomasyonu · Ankara</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>PLC, SCADA ve makine otomasyonu</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 16 }}>
          Sahadan SCADA&apos;ya, otomasyonun her katmanında çalışıyoruz. Üretim hatları ve proses kontrolü,
          PLC/HMI programlama, özel makine ve dönüşüm (retrofit) projeleri ile izleme, raporlama ve veri
          toplama sistemlerini tasarımdan devreye almaya kadar tek ekip olarak yürütüyoruz. {REGION_LINE}
        </p>
      </div>

      <ul className="service-list" style={{ maxWidth: 980 }}>
        {highlights.map((h) => (
          <li key={h} className="card">
            <span style={{ fontSize: 15 }}>{h}</span>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Neler yapıyoruz
        </h2>
      </div>
      <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
        {services.map((s) => (
          <div key={s.title} className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 8 }}>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 17 }}>{s.title}</strong>
            <p style={{ margin: 0, fontSize: 14.5, color: "var(--ink-muted)" }}>{s.text}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>
          Ürün tarafı: /otomasyon
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          PLC/SCADA uyumlu kontrol cihazı, servo motor/sürücü ve enkoder gibi ürünleri doğrudan satın almak
          isterseniz <Link href="/otomasyon">endüstriyel otomasyon ürünleri sayfamıza</Link> veya{" "}
          <Link href="/magaza">mağazamıza</Link> bakabilirsiniz; bu sayfadaki proje hizmetinde de aynı ürün
          ailelerini kullanırız.
        </p>
      </div>

      <ProcessSteps />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Kimlerle çalıştık
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Robotik kaynak, CNC ve pres otomasyonu projelerimizin elektrik-kontrol aşamasında çalıştığımız
          kuruluşlarla aynı disiplini uyguluyoruz; proje ayrıntıları gizlilik anlaşmaları kapsamındadır.{" "}
          <Link href="/#referanslar">Başlıca referanslarımızı ana sayfada</Link> görebilirsiniz.
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
          Otomasyon projeniz için teklif isteyin
        </div>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>
          Mevcut makineniz veya yeni projeniz hakkında kısaca bilgi verin; uygun PLC/SCADA çözümünü birlikte
          belirleyelim.
        </p>
        <a className="big" href="mailto:info@aomtechnology.tr">
          info@aomtechnology.tr
        </a>
        <a className="big" href={`tel:+905446247514`}>
          0544 624 75 14
        </a>
        <TeklifForm formName="plc_scada_page_form" itemName="PLC, SCADA ve makine otomasyonu" embedded />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>
          İlgili
        </h2>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 10 }}>
          <li><Link href="/otomasyon" className="store-chip">Endüstriyel otomasyon ürünleri</Link></li>
          <li><Link href="/tristorlu-guc-kontrol" className="store-chip">Tristörlü güç kontrol</Link></li>
          <li><Link href="/cnc-tezgah" className="store-chip">CNC işleme merkezleri</Link></li>
          <li><Link href="/robotik-kaynak" className="store-chip">Robotik kaynak sistemleri</Link></li>
        </ul>
      </div>
    </section>
  );
}
