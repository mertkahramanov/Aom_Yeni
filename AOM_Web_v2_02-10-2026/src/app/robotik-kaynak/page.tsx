import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProcessSteps from "@/components/ProcessSteps";
import TeklifForm from "@/components/TeklifForm";
import { breadcrumbJsonLd, faqJsonLd, hreflangAlternates, REGION_LINE, serviceJsonLd, SITE } from "@/lib/seo";

// Hizmet sayfası (16-10-2026): claude/HIZMET_SAYFALARI_TASLAK_15-10-2026.md taslağı,
// AOM_Robotik_Kaynak_ve_Harici_Sistemler_Brosuru.pdf içeriğiyle dolduruldu (Mert'in kendi
// onaylı broşürü). Broşürün "Başlıca Referanslarımız" bölümünde isimli/somut bir proje yok
// (gizlilik anlaşmaları kapsamında genel sektör ifadesi) — bu yüzden somut bir [REF] vaka
// çalışması UYDURULMADI; onun yerine ana sayfadaki gerçek, onaylı referans logoları (Aselsan,
// Roketsan, TUSAŞ, Baykar, Havelsan, TEİ, FNSS, ASFAT, TSE, SpaceX...) kullanım onaylı olduğu
// için "Kimlerle çalıştık" bloğunda gösteriliyor. Taslaktaki [Mert: hangi robot markalarıyla
// çalışılıyor?] ve "Türkiye genelinde kurulum" soruları broşürde doğrulanmadığı için SSS'ye
// alınmadı (ürün satışında "Türkiye geneli" zaten doğru ve yayında — REGION_LINE — ama saha
// kurulumu için ayrı bir iddia broşürde yok).
const url = `${SITE}/robotik-kaynak`;
const title = "Robotik Kaynak Sistemleri ve Kaynak Hücreleri | Ankara | AOM";
const description =
  "Ankara'da robotik kaynak hücresi, pozisyoner, kolon-bom ve harici eksen çözümleri. Tasarım, kendi atölyemizde imalat, robot entegrasyonu ve devreye alma tek elden.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "robotik kaynak Ankara",
    "kaynak robotu hücresi",
    "robotlu kaynak sistemi",
    "kaynak pozisyoneri",
    "kolon bom kaynak",
    "dairesel kaynak sistemi",
    "kaynak fikstürü tasarımı",
  ],
  alternates: { canonical: url, languages: hreflangAlternates("/robotik-kaynak") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url,
    siteName: "AOM",
    title,
    description,
  },
};

const highlights = [
  "500 kg'a kadar pozisyoner ve bom ucu taşıma kapasitesi",
  "6 m'ye kadar harici eksen ve bom erişimi",
  "Kendi mekanik atölyemizde imalat",
  "Robot satışı sonrası ücretsiz robot ve pendant eğitimi",
];

const services = [
  {
    title: "Robotlu kaynak hücreleri (anahtar teslim)",
    text: "MIG/MAG, TIG, punta, tozaltı ve plazma kaynak ve kesme prosesleri; hücre tasarımı, imalat, robot entegrasyonu ve devreye alma.",
  },
  {
    title: "Kaynak pozisyonerleri",
    text: "Tek eksenli döner tabla, iki eksenli (eğme + döndürme), pivot tipi, hidrolik yükseltmeli ve başlık-karşılık pozisyonerler; 500 kg'a kadar, 1–3 eksen.",
  },
  {
    title: "Harici eksenler",
    text: "Taban lineer rayı, portal (gantry), kolon-kol ve konveyör takibi; 6 m'ye kadar kurs, 500 kg'a kadar yük. Robotla tek program, tek hareket olarak koordineli çalışır.",
  },
  {
    title: "Kolon-bom ve rotatör sistemleri",
    text: "Tank, boru ve kule gibi büyük silindirik parçalar için kolon-bom manipülatörü ve konveyörsel, kendi ağırlıklı veya özel tip rotatörler.",
  },
  {
    title: "Fit-up (ön montaj) hatları",
    text: "Ray üzerinde veya sabit fit-up istasyonları, hidrolik hizalama ve fit-up kafalı hatlar; boru ve gövde parçalarını kaynağa hazır hizalar.",
  },
  {
    title: "Dairesel kaynak sistemleri",
    text: "Dairesel MIG/MAG, dairesel tozaltı, dairesel TIG ve çok torçlu (opsiyon) sistemler; mil, flanş ve silindir dikişlerinde 6 m'ye kadar parça uzunluğu, 500 kg'a kadar parça ağırlığı.",
  },
  {
    title: "Kaynak fikstürü ve tutucu tasarımı",
    text: "3-2-1 konumlama ve sensörlü kıskaç sırasıyla kartezyen fikstür, döner fikstür, hızlı değişim plakası ve robot tutucu tasarımı; imalatı kendi atölyemizde yapılır.",
  },
  {
    title: "Mevcut robotlar için programlama",
    text: "Hücre kurmadan da çalışırız: parça ve fikstür tasarımı ile mevcut robotlarınıza yeni parça programı ve program iyileştirme hizmeti veririz.",
  },
];

const faqs = [
  {
    q: "Robotik kaynak hücresi kurmadan önce ne gerekiyor?",
    a: "Parça çizimleri veya numuneler, yıllık adet ve hedef çevrim süresi yeterli. Bunlarla simülasyon yapar, erişimi ve çevrim süresini proje öncesinde doğrularız.",
  },
  {
    q: "Fikstürü siz mi tasarlıyorsunuz?",
    a: "Evet. Kaynak fikstürü ve tutucu tasarımını 3-2-1 konumlama ve sensörlü kıskaç sırasıyla kendi mühendisliğimizle yapar, imalatını kendi atölyemizde gerçekleştiririz.",
  },
  {
    q: "Devreye alma sonrası eğitim veriyor musunuz?",
    a: "Evet. Robot satışı sonrasında robot ve öğretme ünitesi (teach pendant) kullanımı eğitimini ücretsiz veriyoruz; ekibiniz yeni parçaları kendisi öğretebilir.",
  },
  {
    q: "Hücre kurmadan sadece programlama veya fikstür hizmeti alabilir miyim?",
    a: "Evet. Hücre kurmadan da çalışırız; mevcut robotlarınız için parça ve fikstür tasarımı ile robot programlamayı ayrı hizmet olarak sunuyoruz.",
  },
  {
    q: "Kaynak hücresinde operatör güvenliği nasıl sağlanıyor?",
    a: "Robot hareketi çit ve kilitli kapı ile sınırlanır, yükleme istasyonunda ışık perdesi veya alan tarayıcı kullanılır, güvenlik fonksiyonları ISO 13849-1'e göre değerlendirilir ve kaynak dumanı için emiş ekipmanı kurulur. Her hücrede yerleşime özel risk değerlendirmesi yapılır.",
  },
];

export default function RobotikKaynakPage() {
  const jsonLd = [
    serviceJsonLd({
      name: "AOM Robotik Kaynak Sistemleri",
      url,
      serviceType: "Robotik kaynak hücresi ve harici sistem tasarımı, imalatı, devreye alma",
      description,
    }),
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Çözümler", path: "/#cozumler" },
      { name: "Robotik Kaynak", path: "/robotik-kaynak" },
    ]),
    faqJsonLd(faqs),
  ];

  return (
    <section className="container hizmet-section" style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/#cozumler">Çözümler</Link> <span aria-hidden="true">/</span> <span>Robotik Kaynak</span>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 860 }}>
        <div className="eyebrow">Robotik kaynak · Ankara</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>
          Robotik kaynak sistemleri ve kaynak hücreleri
        </h1>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 16 }}>
          AOM, Ankara&apos;da kaynak robotu hücrelerini ve harici sistemlerini &mdash; pozisyoner, lineer eksen,
          kolon-bom, rotatör, fit-up hattı, dairesel kaynak sistemi ve fikstürü &mdash; tek elden tasarlar, kendi
          mekanik atölyesinde üretir ve devreye alır. Her proje, erişim, çarpışma ve çevrim süresinin doğrulandığı
          bir simülasyonla başlar. {REGION_LINE}
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
          src="/hizmetler/robotik-kaynak/robotik-kaynak-hucresi_16-10-2026.webp"
          alt="Kaynak robotu, pozisyoner ve harici sistemlerden oluşan bir AOM kaynak hücresi şeması"
          width={1600}
          height={537}
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
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 17 }}>{s.title}</strong>
            <p style={{ margin: 0, fontSize: 14.5, color: "var(--ink-muted)" }}>{s.text}</p>
          </div>
        ))}
      </div>

      <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))" }}>
        <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          <Image
            src="/hizmetler/robotik-kaynak/robotik-kaynak-harici-eksen_16-10-2026.webp"
            alt="Robotun lineer ray (7. eksen) üzerinde iki istasyon arasında hareket ettiği harici eksen şeması"
            width={1600}
            height={552}
            style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
          />
          <figcaption className="caption">Harici eksen tipleri.</figcaption>
        </figure>
        <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          <Image
            src="/hizmetler/robotik-kaynak/robotik-kaynak-dairesel-sistem_16-10-2026.webp"
            alt="Mil, flanş ve silindir parçaların döndürülerek kaynaklandığı dairesel kaynak sistemi şeması"
            width={1600}
            height={552}
            style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
          />
          <figcaption className="caption">Dairesel kaynak sistemi.</figcaption>
        </figure>
      </div>

      <ProcessSteps />

      {/* Referans: broşürde isimli/somut bir proje yok (gizlilik anlaşmaları kapsamında genel
          sektör ifadesi). Uydurma bir vaka çalışması eklemek yerine ana sayfadaki gerçek, kullanım
          onaylı referans logolarına yönlendiriyoruz. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Kimlerle çalıştık
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Savunma, havacılık ve ağır sanayide hassasiyet ve tekrarlanabilirlik beklentisi en yüksek
          kuruluşlarla çalışıyoruz. Proje ayrıntıları gizlilik anlaşmaları kapsamındadır;{" "}
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
          Robotik kaynak projeniz için teklif isteyin
        </div>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>
          3B model veya teknik resim, parça ağırlığı ve ölçüleri, dikiş listesi, yıllık adet ve hedef çevrim
          süresi ile bize ulaşın.
        </p>
        <a className="big" href="mailto:info@aomtechnology.tr">
          info@aomtechnology.tr
        </a>
        <a className="big" href={`tel:+905446247514`}>
          0544 624 75 14
        </a>
        <TeklifForm formName="robotik_kaynak_page_form" itemName="Robotik kaynak sistemi" embedded />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>
          İlgili
        </h2>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 10 }}>
          <li><Link href="/pres-guvenligi" className="store-chip">Pres güvenliği ve otomatik besleme</Link></li>
          <li><Link href="/cnc-tezgah" className="store-chip">CNC işleme merkezleri</Link></li>
          <li><Link href="/plc-scada" className="store-chip">PLC, SCADA ve makine otomasyonu</Link></li>
          <li><Link href="/otomasyon" className="store-chip">Endüstriyel otomasyon ürünleri</Link></li>
        </ul>
      </div>
    </section>
  );
}
