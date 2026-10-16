import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import OemMarquee from "@/components/OemMarquee";
import ProcessSteps from "@/components/ProcessSteps";
import SearchBox from "@/components/SearchBox";
import TeklifForm from "@/components/TeklifForm";

// Canonical etiketi (15-10-2026): ana sayfada eksikti (bkz. claude/SITE_GOOGLE_DURUM_09-10-2026.md).
// "/" metadataBase (https://www.aomtechnology.tr) ile birleşip https://www.aomtechnology.tr/ olur.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Endüstriyel otomasyon bölümü (14-10-2026): Ankara'da PLC, servo motor ve motion kontrol
// aramalarında görünürlük için — ürün satışı + teknik danışmanlık çerçevesi (Mert onayı).
// Her kart /otomasyon sayfasındaki ilgili bölüme veya mağazadaki ilgili ana kategoriye bağlanır.
const automation = [
  {
    href: "/otomasyon#plc",
    title: "PLC / SCADA uyumlu ürünler",
    text: "Sıcaklık kontrol cihazı, sayıcı, zamanlayıcı, panel metre, HMI ve dijital ekran birimleri; PLC veya SCADA sistemine bağlanarak izlenebilir ve kumanda edilebilir.",
  },
  {
    href: "/otomasyon#servo",
    title: "Servo motor ve motor sürücüler",
    text: "AC/DC motor sürücüler, soft starter ve step/servo motor sürücüleri; seçim, tedarik ve pano entegrasyonu desteği.",
  },
  {
    href: "/otomasyon#motion",
    title: "Motion kontrol / enkoderler",
    text: "34 seri, 8.644 sipariş koduyla artımlı ve mutlak enkoderler; konum ve hız geri beslemesi gerektiren motion uygulamaları.",
  },
  {
    href: "/otomasyon",
    title: "Otomasyon projelerinde teknik destek",
    text: "Robotik kaynak, CNC ve pres hücrelerinin elektrik-kontrol aşamasında ürün seçimi, pano entegrasyonu ve devreye alma desteği.",
  },
];

// Çözümler (16-10-2026): artık ana sayfa bölümlerine değil, kendi URL'si ve içeriği olan
// hizmet sayfalarına yönlendiriyor (bkz. claude/HIZMET_SAYFALARI_TASLAK_15-10-2026.md).
// 5. kart (PLC/SCADA) eklendi — /otomasyon ürün odaklı kaldığı için proje/hizmet odaklı
// karşılığı burada ayrıca listelenir.
const solutions = [
  {
    href: "/robotik-kaynak",
    title: "Robotik kaynak ve harici sistemler",
    text: "Kaynak hücreleri, pozisyonerler, harici eksenler, kolon-bom, rotatör, fit-up hatları ve dairesel kaynak sistemleri.",
  },
  {
    href: "/pres-guvenligi",
    title: "Pres güvenliği ve otomatik besleme",
    text: "Işık perdesi, kavrama-fren dönüşümü, kafes ve kilitli kapı çözümleri; servo NC besleme.",
  },
  {
    href: "/cnc-tezgah",
    title: "CNC tezgâhlar",
    text: "Kompakt CNC işleme merkezleri; Siemens, Fanuc veya Mitsubishi Electric kontrol, robotlu hücre seçeneği.",
  },
  {
    href: "/plc-scada",
    title: "PLC, SCADA ve makine otomasyonu",
    text: "PLC/HMI programlama, SCADA ve veri toplama, özel makine otomasyonu, pano tasarımı ve devreye alma.",
  },
  {
    href: "/tristorlu-guc-kontrol",
    title: "Tristörlü güç kontrol",
    text: "Faz açısı ve sıfır geçiş kontrolü, RS485 Modbus RTU haberleşme.",
  },
];

const services = [
  { title: "Proje öncesi simülasyon", text: "Erişim, çarpışma ve çevrim süresi doğrulaması" },
  { title: "Ücretsiz robot eğitimi", text: "Robot satışı sonrasında, pendant dahil" },
  { title: "Fikstür ve tutucu tasarımı", text: "3-2-1 konumlama, sensörlü kıskaç sırası" },
  { title: "Mekanik dönüşümler", text: "Örn. kamalı preste pnömatik kavrama-fren" },
];

// OEM partnerliği logoları: hepsi sözleşmeli partner, kullanım onaylı.
// Dosyalar /public/oem/ altında (OemMarquee ile aynı kaynak).
// Her logo kendi marka sayfasına (/magaza/marka/<slug>) bağlanır (11-10-2026).
const oem = [
  { name: "Yaskawa", slug: "yaskawa", src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 },
  { name: "Fanuc", slug: "fanuc", src: "/oem/fanuc_03-10-2026.png", w: 947, h: 160 },
  { name: "ABB", slug: "abb", src: "/oem/abb_03-10-2026.png", w: 319, h: 129 },
  { name: "Siemens", slug: "siemens", src: "/oem/siemens_03-10-2026.png", w: 376, h: 60 },
  { name: "Mitsubishi Electric", slug: "mitsubishi-electric", src: "/oem/mitsubishi-electric_03-10-2026.png", w: 548, h: 160 },
  { name: "Omron", slug: "omron", src: "/oem/omron_03-10-2026.png", w: 509, h: 99 },
  { name: "Pilz", slug: "pilz", src: "/oem/pilz_03-10-2026.png", w: 396, h: 149 },
  { name: "Leuze", slug: "leuze", src: "/oem/leuze_03-10-2026.png", w: 381, h: 115 },
  { name: "Gefran", slug: "gefran", src: "/oem/gefran_11-10-2026.svg", w: 160, h: 37 },
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
  // 15-10-2026 eklendi — bkz. claude/REFERANS_LOGOLARI_EKLEME_15-10-2026.md
  // (15-10-2026, düzeltme: sabit 480×240 tuval + içine gömülü boşluk, kare/portre logolarda CSS'in
  // maxWidth/maxHeight sınırıyla üst üste küçülüyor, logolar diğer 8 logoya göre çok küçük görünüyordu.
  // Artık diğer logolar gibi içeriğe sıkı kırpılmış gerçek piksel boyutları kullanılıyor.)
  { name: "ArmAda", src: "/referanslar/armada_15-10-2026.webp", w: 418, h: 480 },
  { name: "TSE (Türk Standardları Enstitüsü)", src: "/referanslar/tse_15-10-2026.webp", w: 736, h: 429 },
  { name: "MKE (Makina ve Kimya Endüstrisi)", src: "/referanslar/mke_15-10-2026.webp", w: 500, h: 500 },
  { name: "SpaceX", src: "/referanslar/spacex_15-10-2026.webp", w: 501, h: 54 },
  { name: "Tunatek", src: "/referanslar/tunatek_15-10-2026.webp", w: 480, h: 480 },
  { name: "Orbant Plastik", src: "/referanslar/orbant-plastik_15-10-2026.webp", w: 432, h: 432 },
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

      {/* Ürün kodu / model arama (14-10-2026) */}
      <section className="container" style={{ paddingTop: 32, paddingBottom: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div className="eyebrow">Ürün kodu ile hızlı arama</div>
        <SearchBox />
      </section>

      {/* Endüstriyel otomasyon (14-10-2026): Ankara'da PLC, servo motor, motion kontrol görünürlüğü için */}
      <section id="otomasyon" className="container section" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 760 }}>
          <div className="eyebrow">Endüstriyel otomasyon</div>
          <h2 className="h2">Ankara&apos;dan Türkiye geneline otomasyon ürünleri ve teknik destek</h2>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            AOM, Ankara merkezli bir endüstriyel otomasyon ve makine otomasyonu firmasıdır. PLC/SCADA uyumlu kontrol
            cihazları, servo motor ve motor sürücüler, motion kontrol için enkoderler mağazamızda ürün olarak
            satılır; robotik kaynak, CNC ve pres otomasyonu projelerimizin elektrik-kontrol aşamasında da aynı
            ürün ailelerini kullanır, seçim ve devreye alma desteği veririz.
          </p>
        </div>
        <div className="grid-auto solutions">
          {automation.map((a) => (
            <Link key={a.title} href={a.href} className="card solution">
              <div className="rule" />
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <span className="more">İncele →</span>
            </Link>
          ))}
        </div>
      </section>

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
      <ProcessSteps />

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
                <Link href={`/magaza/marka/${b.slug}`} aria-label={`${b.name} ürünleri`}>
                  {b.src.endsWith(".svg") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={b.src}
                      alt={b.name}
                      width={b.w}
                      height={b.h}
                      style={{ width: "auto", height: "auto", maxWidth: "85%", maxHeight: "70%", objectFit: "contain" }}
                    />
                  ) : (
                    <Image
                      src={b.src}
                      alt={b.name}
                      width={b.w}
                      height={b.h}
                      style={{ width: "auto", height: "auto", maxWidth: "85%", maxHeight: "70%", objectFit: "contain" }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Referanslar */}
      <section id="referanslar" className="container" style={{ paddingTop: 64, paddingBottom: 64, display: "flex", flexDirection: "column", gap: 24 }}>
        <div className="eyebrow">Başlıca referanslar</div>
        <p style={{ margin: 0, fontSize: 15, color: "var(--ink-muted)", maxWidth: 720 }}>
          Savunma, havacılık, ağır sanayi ve üretim alanında çalıştığımız kuruluşlardan bazıları. Proje
          ayrıntıları gizlilik anlaşmaları kapsamındadır.
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
          <div className="card contact-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>İletişim</div>
            <a className="big" href="mailto:info@aomtechnology.tr">
              info@aomtechnology.tr
            </a>
            <a className="big" href="tel:+905446247514">
              0544 624 75 14
            </a>
            <div style={{ fontSize: 15, color: "var(--ink-muted)" }}>1147. Cad. No: 8, Yenimahalle / Ankara</div>
            <TeklifForm formName="homepage_contact_form" embedded />
          </div>
        </div>
      </section>
    </>
  );
}
