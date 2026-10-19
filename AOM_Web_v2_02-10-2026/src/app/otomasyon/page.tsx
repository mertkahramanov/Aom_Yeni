import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import TeklifForm from "@/components/TeklifForm";
import { breadcrumbJsonLd, ORG, REGION_LINE, SITE } from "@/lib/seo";

// Endüstriyel otomasyon sayfası (14-10-2026): Ankara'da "endüstriyel otomasyon", "makine otomasyonu",
// "PLC", "servo motor", "motion" aramalarında görünürlük için (Mert'in isteği). Çerçeve: ürün satışı +
// teknik ürün danışmanlığı; robotik kaynak/CNC/pres projelerindeki elektrik-kontrol yetkinliği zaten
// ana sayfadaki 7 adımlık süreçte ("Elektrik ve kontrol") yer alıyor, burada aynı yetkinlik PLC/servo/
// motion bağlamında yeniden ifade ediliyor — yeni, doğrulanmamış bir hizmet iddiası eklenmedi.
//
// Örnek projeler galerisi (19-10-2026, Mert'in kendi saha fotoğrafları/videoları): PLC/SCADA uyumlu
// ürünler ve pano entegrasyonu iddialarını somutlaştırmak için eklendi. Fotoğraf/video başlıkları
// kasıtlı olarak genel tutuldu — görselde doğrulanamayan teknik rakam/iddia (akım, güç vb.) EKLENMEDİ
// (bkz. AOM kurumsal kimlik kuralı: "Rakam ve iddia uydurma; doğrulanmamışsa [YER TUTUCU] bırak").
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

// Saha fotoğrafları (19-10-2026, 19-10-2026 standardizasyon düzeltmesi). Dosyalar:
// public/hizmetler/otomasyon/. Sayfa simetrisi için 8 görsel de aynı 4:5 oranında (1000x1250),
// ortadan kırpılarak (cover-crop) standart boyuta getirildi — artık hepsi aynı kart ölçüsünde
// görünüyor. 03 numaralı görseldeki üst sarı şerit, sağ üstteki beyaz simge ve alttaki
// "softacsystems" yazılı mavi şerit kırpılarak tamamen kaldırıldı (panonun kendisinden hiçbir
// şey kaybedilmedi).
const galeriGorseller = [
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-01_19-10-2026.webp", w: 1000, h: 1250, alt: "AOM tarafından hazırlanan PLC ve sürücü modüllü kontrol panosu", caption: "PLC ve sürücü entegrasyonlu kontrol panosu" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-02_19-10-2026.webp", w: 1000, h: 1250, alt: "Yoğun klemens bağlantılı, PLC ve röle gruplu açık kontrol panosu", caption: "Yoğun klemens bağlantılı kontrol panosu" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-03_19-10-2026.webp", w: 1000, h: 1250, alt: "Motor sürücülü, sahaya sevke hazır kontrol panosu", caption: "Sevkiyata hazır kontrol panosu" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-04_19-10-2026.webp", w: 1000, h: 1250, alt: "PLC modülleri, güç kaynağı ve klemens gruplarından oluşan kontrol panosu", caption: "PLC ve güç dağıtım modülleri" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-05_19-10-2026.webp", w: 1000, h: 1250, alt: "Kompakt ölçülerde hazırlanmış kontrol panosu", caption: "Kompakt kontrol panosu" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-06_19-10-2026.webp", w: 1000, h: 1250, alt: "Sürücü ve PLC bölümlerinden oluşan açık kontrol panosu", caption: "Sürücü ve PLC bölümlü pano" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-07_19-10-2026.webp", w: 1000, h: 1250, alt: "Dar gövdeli, çok katlı yerleşimli kontrol panosu", caption: "Çok katlı yerleşimli kontrol panosu" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-08_19-10-2026.webp", w: 1000, h: 1250, alt: "Pano iç yerleşim tasarımı ve bileşen planı", caption: "Pano iç yerleşim tasarımı" },
  // 09–10 eklendi (19-10-2026, Mert'in gönderdiği iki saha fotoğrafı; aynı 4:5, 1000x1250 standardı)
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-09_19-10-2026.webp", w: 1000, h: 1250, alt: "Faz koruma röleleri, otomatik sigortalar, zaman röleleri ve ara röle gruplarından oluşan kumanda panoları", caption: "Faz koruma ve zaman röleli kumanda panoları" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-ornek-10_19-10-2026.webp", w: 1000, h: 1250, alt: "Dört adet fanlı dijital tristörlü güç ünitesinin entegre edildiği güç kontrol panosu", caption: "Dijital tristörlü güç ünitesi panosu" },
];

// Video açıklamaları (19-10-2026, Mert'in bilgisi): sırasıyla Rusya, Rusya, Kazakistan, Azerbaycan projeleri.
const galeriVideolar = [
  { src: "/hizmetler/otomasyon/otomasyon-pano-video-01_19-10-2026.mp4", poster: "/hizmetler/otomasyon/otomasyon-pano-video-01_19-10-2026-poster.webp", caption: "Rusya projesi — pano imalatından kısa görüntü" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-video-02_19-10-2026.mp4", poster: "/hizmetler/otomasyon/otomasyon-pano-video-02_19-10-2026-poster.webp", caption: "Rusya projesi — pano imalatından kısa görüntü" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-video-03_19-10-2026.mp4", poster: "/hizmetler/otomasyon/otomasyon-pano-video-03_19-10-2026-poster.webp", caption: "Kazakistan projesi — pano imalatından kısa görüntü" },
  { src: "/hizmetler/otomasyon/otomasyon-pano-video-04_19-10-2026.mp4", poster: "/hizmetler/otomasyon/otomasyon-pano-video-04_19-10-2026-poster.webp", caption: "Azerbaycan projesi — pano imalatından kısa görüntü" },
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
        {/* Çapraz bağlantı (16-10-2026): bu sayfa ürün odaklı kalır; proje/hizmet odaklı
            karşılığı için bkz. claude/HIZMET_SAYFALARI_TASLAK_15-10-2026.md */}
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          PLC programlama, SCADA, özel makine otomasyonu ve pano projelerini uçtan uca bir hizmet olarak
          almak isterseniz <Link href="/plc-scada">PLC, SCADA ve makine otomasyonu sayfamıza</Link> bakabilirsiniz.
        </p>
      </div>

      {/* Örnek projeler galerisi (19-10-2026) — Mert'in kendi saha fotoğraf/videoları */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
          <div className="eyebrow">Saha çalışmalarımız</div>
          <h2 className="h2" style={{ fontSize: 26 }}>
            Örnek projelerimiz
          </h2>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            PLC/SCADA uyumlu kontrol panoları ve motor sürücü entegrasyonlarımızdan birkaç örnek; Rusya, Kazakistan
            ve Azerbaycan&apos;a teslim ettiğimiz projeler dahil. Proje ve müşteri
            ayrıntıları gizlilik anlaşmaları kapsamında olduğundan burada yalnızca pano görselleri paylaşılıyor.
          </p>
        </div>

        <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>
          {galeriGorseller.map((g) => (
            <figure key={g.src} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <Image
                src={g.src}
                alt={g.alt}
                width={g.w}
                height={g.h}
                style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
              />
              <figcaption className="caption">{g.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>
          {galeriVideolar.map((v) => (
            <figure key={v.src} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                src={v.src}
                poster={v.poster}
                controls
                playsInline
                preload="metadata"
                style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)", background: "#000" }}
              />
              <figcaption className="caption">{v.caption}</figcaption>
            </figure>
          ))}
        </div>
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
