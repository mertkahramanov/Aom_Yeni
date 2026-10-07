import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import OemMarquee from "@/components/OemMarquee";

const solutions = [
  {
    href: "#robotik-kaynak",
    title: "Robotik kaynak ve harici sistemler",
    text: "Kaynak hücreleri, pozisyonerler, harici eksenler, kolon-bom, rotatör, fit-up hatları ve dairesel kaynak sistemleri.",
  },
  {
    href: "#pres",
    title: "Pres güvenliği ve otomatik besleme",
    text: "Işık perdesi, kavrama-fren dönüşümü, kafes ve kilitli kapı çözümleri; servo NC besleme.",
  },
  {
    href: "#cnc",
    title: "CNC tezgâhlar",
    text: "Kompakt CNC işleme merkezleri; Siemens, Fanuc veya Mitsubishi Electric kontrol, robotlu hücre seçeneği.",
  },
  {
    href: "#tristor",
    title: "Tristörlü güç kontrol",
    text: "Faz açısı ve sıfır geçiş kontrolü, RS485 Modbus RTU haberleşme.",
  },
];

const steps = [
  "İhtiyaç ve parça analizi",
  "Proje öncesi simülasyon",
  "Mekanik tasarım",
  "İmalat ve montaj, kendi atölyemizde",
  "Elektrik ve kontrol",
  "Kalibrasyon ve programlama",
  "Devreye alma ve eğitim",
];

const services = [
  { title: "Proje öncesi simülasyon", text: "Erişim, çarpışma ve çevrim süresi doğrulaması" },
  { title: "Ücretsiz robot eğitimi", text: "Robot satışı sonrasında, pendant dahil" },
  { title: "Fikstür ve tutucu tasarımı", text: "3-2-1 konumlama, sensörlü kıskaç sırası" },
  { title: "Mekanik dönüşümler", text: "Örn. kamalı preste pnömatik kavrama-fren" },
];

// OEM partnerliği logoları: hepsi sözleşmeli partner, kullanım onaylı.
// Dosyalar /public/oem/ altında (OemMarquee ile aynı kaynak).
const oem = [
  { name: "Yaskawa", src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 },
  { name: "Fanuc", src: "/oem/fanuc_03-10-2026.png", w: 947, h: 160 },
  { name: "ABB", src: "/oem/abb_03-10-2026.png", w: 319, h: 129 },
  { name: "Siemens", src: "/oem/siemens_03-10-2026.png", w: 376, h: 60 },
  { name: "Mitsubishi Electric", src: "/oem/mitsubishi-electric_03-10-2026.png", w: 548, h: 160 },
  { name: "Omron", src: "/oem/omron_03-10-2026.png", w: 509, h: 99 },
  { name: "Pilz", src: "/oem/pilz_03-10-2026.png", w: 396, h: 149 },
  { name: "Leuze", src: "/oem/leuze_03-10-2026.png", w: 381, h: 115 },
];

// Referans/müşteri logoları: AOM Media / Referanslarımız klasöründeki resmi
// logolardan alınmıştır, kullanım onaylı. Dosyalar /public/referanslar/ altında.
const references = [
  { name: "Aselsan", src: "/referanslar/aselsan_06-10-2026.png", w: 400, h: 171 },
  { name: "Roketsan", src: "/referanslar/roketsan_06-10-2026.png", w: 800, h: 182 },
  { name: "TUSAŞ", src: "/referanslar/tusas_06-10-2026.png", w: 2748, h: 1426 },
  { name: "Baykar", src: "/referanslar/baykar_06-10-2026.jpg", w: 739, h: 415 },
  { name: "Havelsan", src: "/referanslar/havelsan_06-10-2026.png", w: 2362, h: 778 },
  { name: "TEI", src: "/referanslar/tei_06-10-2026.png", w: 800, h: 343 },
  { name: "FNSS", src: "/referanslar/fnss_06-10-2026.png", w: 738, h: 195 },
  { name: "ASFAT", src: "/referanslar/asfat_06-10-2026.png", w: 300, h: 126 },
];

const projectInputs = [
  "3B model veya teknik resim",
  "Parça ağırlığı ve ölçüleri",
  "Dikiş listesi ve proses",
  "Yıllık adet ve hedef çevrim süresi",
  "Varsa mevcut robot ve kaynak makinesi",
];

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* OEM partnerlikleri: kayan logo şeridi */}
      <OemMarquee />

      {/* Çözümler */}
      <section id="cozumler" className="container section" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
          <div className="eyebrow">Çözümler</div>
          <h2 className="h2">Hücreden hatta, ihtiyacın kadar sistem</h2>
        </div>
        <div className="grid-auto solutions">
          {solutions.map((s) => (
            <Link key={s.title} href={s.href} className="card solution">
              <div className="rule" />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="more">İncele →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Süreç */}
      <section id="surec" className="process">
        <div className="container section" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
            <div className="eyebrow">Tasarımdan devreye alma</div>
            <h2 className="h2">Yedi adım, tek sorumlu</h2>
            <p style={{ margin: 0 }}>
              Her proje, erişim, çarpışma ve çevrim süresi doğrulanan bir simülasyonla başlar.
            </p>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 15 }}>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Hizmetler */}
      <section id="hizmetler" className="container section services">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="eyebrow">Hizmetler</div>
          <h2 className="h2">Robotun ötesinde mühendislik desteği</h2>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            Robot satışı sonrasında ücretsiz robot ve pendant eğitimi veriyoruz. Mevcut robotlarınız için
            programlama, parça, fikstür ve tutucu tasarımı da ayrı hizmet olarak sunulur.
          </p>
        </div>
        <ul className="service-list">
          {services.map((s) => (
            <li key={s.title} className="card">
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* OEM partnerlikleri */}
      <section id="oem" style={{ background: "var(--surface-raised)", borderTop: "1px solid var(--line)" }}>
        <div className="container" style={{ paddingTop: 64, paddingBottom: 64, display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="eyebrow">OEM partnerlikleri</div>
          <ul className="logo-grid">
            {oem.map((b) => (
              <li key={b.name}>
                <Image
                  src={b.src}
                  alt={b.name}
                  width={b.w}
                  height={b.h}
                  style={{ width: "auto", height: "auto", maxWidth: "85%", maxHeight: "70%", objectFit: "contain" }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Referanslar */}
      <section id="referanslar" className="container" style={{ paddingTop: 64, paddingBottom: 64, display: "flex", flexDirection: "column", gap: 24 }}>
        <div className="eyebrow">Başlıca referanslar</div>
        <p style={{ margin: 0, fontSize: 15, color: "var(--ink-muted)", maxWidth: 720 }}>
          Savunma, havacılık ve ağır sanayide çalıştığımız kuruluşlardan bazıları. Proje ayrıntıları gizlilik
          anlaşmaları kapsamındadır.
        </p>
        <ul className="logo-grid">
          {references.map((r) => (
            <li key={r.name}>
              <Image
                src={r.src}
                alt={r.name}
                width={r.w}
                height={r.h}
                style={{ width: "auto", height: "auto", maxWidth: "85%", maxHeight: "70%", objectFit: "contain" }}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* İletişim */}
      <section id="iletisim" className="contact">
        <div className="container inner" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h2">Projenizi konuşalım</h2>
            <p style={{ margin: 0, color: "var(--ink-muted)" }}>Teklif hazırlamak için şunları göndermeniz yeterli:</p>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, display: "flex", flexDirection: "column", gap: 4 }}>
              {projectInputs.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="card contact-card">
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>İletişim</div>
            <a className="big" href="mailto:info@aomtechnology.tr">
              info@aomtechnology.tr
            </a>
            <a className="big" href="tel:+905446247514">
              0544 624 75 14
            </a>
            <div style={{ fontSize: 15, color: "var(--ink-muted)" }}>1147. Cad. No: 8, Yenimahalle / Ankara</div>
            <a href="mailto:info@aomtechnology.tr" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
              Proje dosyalarını gönderin
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
