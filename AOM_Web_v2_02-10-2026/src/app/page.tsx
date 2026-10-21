import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import OemMarquee from "@/components/OemMarquee";
import SearchBox from "@/components/SearchBox";
import TeklifForm from "@/components/TeklifForm";
import { hreflangAlternates } from "@/lib/seo";

// Canonical etiketi (15-10-2026): ana sayfada eksikti (bkz. claude/SITE_GOOGLE_DURUM_09-10-2026.md).
// "/" metadataBase (https://www.aomtechnology.tr) ile birleşip https://www.aomtechnology.tr/ olur.
export const metadata: Metadata = {
  alternates: { canonical: "/", languages: hreflangAlternates("") },
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

// Süreç adımları (19-10-2026): src/components/ProcessSteps.tsx ile BİREBİR AYNI içerik.
// O bileşen diğer 5 hizmet sayfasında (robotik-kaynak, pres-guvenligi, cnc-tezgah, plc-scada,
// tristorlu-guc-kontrol) tam bölüm olarak kullanılmaya devam ediyor; ana sayfada artık bu adımlar
// Çözümlerimiz bölümünün bir alt bloğu olarak satır içi (inline) render edilir (bkz. aşağıda).
const processSteps = [
  "İhtiyaç ve parça analizi",
  "Proje öncesi simülasyon",
  "Mekanik tasarım",
  "İmalat ve montaj, kendi atölyemizde",
  "Elektrik ve kontrol",
  "Kalibrasyon ve programlama",
  "Devreye alma ve eğitim",
];

// OEM partnerliği logoları: hepsi sözleşmeli partner, kullanım onaylı.
// Dosyalar /public/oem/ altında (OemMarquee ile aynı kaynak).
// Her logo kendi marka sayfasına (/magaza/marka/<slug>) bağlanır (11-10-2026).
// `cert: true` olan kayıtlar bir firma/partner değil, bir sertifikasyon/uyarı işaretidir (örn. ATEX);
// bunlar marka sayfasına bağlanmaz, "ürünleri" denmez, yalnızca rozet olarak gösterilir (21-10-2026).
const oem: { name: string; slug?: string; src: string; w: number; h: number; text?: boolean; cert?: boolean; certLabel?: string }[] = [
  { name: "Yaskawa", slug: "yaskawa", src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 },
  { name: "Fanuc", slug: "fanuc", src: "/oem/fanuc_03-10-2026.png", w: 947, h: 160 },
  // 21-10-2026 (Mert talebi): Mert'in yeniden gönderdiği güncel ABB logosuyla değiştirildi (zaten
  // şeffaf zeminliydi, yalnız kırpıldı); eski abb_20-10-2026.png artık referanssız.
  { name: "ABB", slug: "abb", src: "/oem/abb_21-10-2026.png", w: 1352, h: 580 },
  { name: "Siemens", slug: "siemens", src: "/oem/siemens_03-10-2026.png", w: 376, h: 60 },
  { name: "Mitsubishi Electric", slug: "mitsubishi-electric", src: "/oem/mitsubishi-electric_03-10-2026.png", w: 548, h: 160 },
  { name: "Omron", slug: "omron", src: "/oem/omron_03-10-2026.png", w: 509, h: 99 },
  { name: "Pilz", slug: "pilz", src: "/oem/pilz_03-10-2026.png", w: 396, h: 149 },
  { name: "Leuze", slug: "leuze", src: "/oem/leuze_03-10-2026.png", w: 381, h: 115 },
  // 21-10-2026 eklendi (Mert talebi): Mert'in verdiği Balluff logosu; arka planı (baskılı dama deseni)
  // temizlenip gerçek şeffaf PNG olarak işlendi (bkz. claude/OEM_LOGO_ABB_GUNCELLEME_BALLUFF_EKLEME_21-10-2026.md).
  // markalar.ts'e de kısa bir marka kaydı eklendi, aksi halde /magaza/marka/balluff 404 verirdi.
  { name: "Balluff", slug: "balluff", src: "/oem/balluff_21-10-2026.png", w: 908, h: 216 },
  { name: "Gefran", slug: "gefran", src: "/oem/gefran_11-10-2026.svg", w: 160, h: 37 },
  // 19-10-2026 eklendi (Mert talebi): bu 5 marka OemMarquee'de (kayan şerit) zaten vardı/ekleniyor
  // ama bu statik "OEM partnerlikleri" ızgarasında eksikti. Delta/Schneider Electric/Autonics için
  // OemMarquee ile aynı, zaten mevcut 03-10-2026 tarihli dosyalar kullanıldı. Lenze ve Inovance site
  // için yeni eklenen markalar — src/data/markalar.ts'e de (diğer salt-OEM-partneri markalar ABB/Pilz/
  // Leuze/Banner ile aynı kalıpta) kısa bir marka kaydı eklendi, aksi halde /magaza/marka/lenze ve
  // /magaza/marka/inovance 404 verirdi.
  { name: "Delta", slug: "delta", src: "/oem/delta_03-10-2026.png", w: 520, h: 160 },
  { name: "Schneider Electric", slug: "schneider-electric", src: "/oem/schneider-electric_03-10-2026.png", w: 388, h: 160 },
  { name: "Autonics", slug: "autonics", src: "/oem/autonics_03-10-2026.png", w: 746, h: 160 },
  { name: "Lenze", slug: "lenze", src: "/oem/lenze_19-10-2026.jpg", w: 184, h: 184 },
  // 20-10-2026 düzeltme (Mert talebi): inovance_19-10-2026.svg dosyasındaki "VANCE" kısmı neredeyse
  // beyaz (#f9fbfc) bir "plaka" şekli olarak çizilmiş olduğundan beyaz kart zemininde görünmüyordu
  // (bu yüzden 19-10-2026'da text:true düz metne düşürülmüştü). Inovance'ın resmi global sitesinden
  // (inovance.com/global) temiz, transparan zeminli, yüksek çözünürlüklü (2858×431) resmi logo
  // indirildi; artık diğer markalar gibi gerçek görseliyle gösteriliyor.
  { name: "Inovance", slug: "inovance", src: "/oem/inovance_20-10-2026.png", w: 2858, h: 431 },
  // 21-10-2026 eklendi (Mert talebi: ızgara sağa 2 sütun × 3 satır genişletildi, 15→21 logo = 5→7 sütun).
  // Weidmüller/Telemecanique Sensors/LS Electric/Keyence için markalar.ts'e kısa marka kaydı eklendi
  // (diğer salt-OEM-partneri markalarla aynı kalıpta). Panasonic için markalar.ts'de zaten gerçek
  // mağaza kataloğu olan bir kayıt var (bkz. "panasonic"), burada yalnız ızgaraya eklendi.
  // LS Electric kaynağı düşük çözünürlüktü (177×28) — 4× büyütülüp netleştirildi; daha yüksek
  // çözünürlüklü/vektör bir logo bulunursa değiştirilmeli.
  { name: "Weidmüller", slug: "weidmuller", src: "/oem/weidmuller_21-10-2026.png", w: 703, h: 158 },
  { name: "Telemecanique Sensors", slug: "telemecanique-sensors", src: "/oem/telemecanique-sensors_21-10-2026.png", w: 580, h: 196 },
  { name: "LS Electric", slug: "ls-electric", src: "/oem/ls-electric_21-10-2026.png", w: 788, h: 192 },
  { name: "Panasonic", slug: "panasonic", src: "/oem/panasonic_21-10-2026.png", w: 868, h: 211 },
  { name: "Keyence", slug: "keyence", src: "/oem/keyence_21-10-2026.svg", w: 91, h: 16 },
  // ATEX: bir firma/partner değil, patlayıcı ortam ekipmanları için sertifikasyon/uyarı işareti.
  // Mert onayı: ızgaraya 6. kare olarak eklensin ama marka sayfasına bağlanmasın, "partner" denmesin.
  { name: "ATEX", src: "/oem/atex-ex_21-10-2026.png", w: 887, h: 780, cert: true, certLabel: "ATEX sertifikası" },
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
  // 21-10-2026 eklendi (Mert talebi, 3. satır) — bkz. claude/REFERANS_LOGOLARI_3_SATIR_21-10-2026.md
  // Hepsi beyaz/açık zemin kaldırılıp şeffaflaştırıldı (ADNOC, Atasam, Uralshina, İlim, Taşkent
  // Kislorod); Eni'nin resmi sarı zemini markanın parçası olduğu için korundu; Oxy Turan ise
  // Mert'in gönderdiği koyu zeminli "sunum mockup" görselinden amblem+yazı ayıklanarak şeffaf
  // zemine aktarıldı.
  { name: "ADNOC (Abu Dhabi National Oil Company)", src: "/referanslar/adnoc_21-10-2026.png", w: 254, h: 387 },
  { name: "Atasam", src: "/referanslar/atasam_21-10-2026.png", w: 469, h: 146 },
  { name: "Uralshina", src: "/referanslar/uralshina_21-10-2026.png", w: 698, h: 298 },
  { name: "Oxy Turan", src: "/referanslar/oxy-turan_21-10-2026.png", w: 553, h: 729 },
  { name: "Ilim", src: "/referanslar/ilim_21-10-2026.png", w: 183, h: 64 },
  { name: "Eni", src: "/referanslar/eni_21-10-2026.png", w: 225, h: 225 },
  { name: "Taşkent Kislorod", src: "/referanslar/taskent-kislorod_21-10-2026.png", w: 472, h: 473 },
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

      {/* Hakkımızda (19-10-2026, Mert onayı: eski "Otomasyon" bölümünün yerine, aynı konumda.
          Otomasyon'un 4 kartı içerik kaybı olmadan aşağıdaki Çözümlerimiz bölümünün "Ürünler"
          alt bloğuna taşındı — bkz. claude/ANASAYFA_BOLUM_YENIDEN_YAPILANDIRMA_19-10-2026.md). */}
      <section id="hakkimizda" className="container section" style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 820 }}>
        <div className="eyebrow">Hakkımızda</div>
        <h2 className="h2">Ankara merkezli, uçtan uca endüstriyel otomasyon ortağı</h2>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 16 }}>
          AOM (Angora Endüstriyel Makine), Ankara merkezli bir endüstriyel otomasyon ve makine otomasyonu
          firmasıdır. Robotik kaynak hücrelerinden CNC işleme merkezlerine, pres güvenliği sistemlerinden
          PLC/SCADA tabanlı makine otomasyonuna kadar projelerin tasarım, imalat, devreye alma ve eğitim
          aşamalarını tek elden yürütür.
        </p>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 16 }}>
          Mekanik tasarım, imalat ve montaj kendi atölyemizde yapılır; devreye almadan sonra ücretsiz robot
          ve pendant eğitimi veririz.
        </p>
      </section>

      {/* OEM partnerlikleri: kayan logo şeridi */}
      <OemMarquee />

      {/* Çözümlerimiz (19-10-2026, Mert onayı: tek bölüm altında 4 alt blok — Çözümler, Ürünler
          [eski Otomasyon kartları], Hizmetler, Süreç. Hiçbir kart/metin silinmedi, yalnızca
          yeniden gruplandı. ProcessSteps bileşeni kasıtlı olarak burada KULLANILMADI: o bileşen
          robotik-kaynak/pres-guvenligi/cnc-tezgah/plc-scada/tristorlu-guc-kontrol sayfalarında
          tam bölüm olarak hâlâ kullanılıyor (dokunulmadı); burada aynı 7 adım içerik bir alt blok
          olarak satır içi (inline) render edilir. */}
      <section id="cozumler" className="container section" style={{ display: "flex", flexDirection: "column", gap: 64 }}>
        {/* Alt blok 1: Çözümler */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
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
        </div>

        {/* Alt blok 2: Ürünler (eski "Otomasyon" bölümü, 19-10-2026'da buraya taşındı) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 760 }}>
            <div className="eyebrow">Ürünler</div>
            <h2 className="h2">Ankara&apos;dan Türkiye geneline otomasyon ürünleri ve teknik destek</h2>
            <p style={{ margin: 0, color: "var(--ink-muted)" }}>
              PLC/SCADA uyumlu kontrol cihazları, servo motor ve motor sürücüler, motion kontrol için enkoderler
              mağazamızda ürün olarak satılır; robotik kaynak, CNC ve pres otomasyonu projelerimizin
              elektrik-kontrol aşamasında da aynı ürün ailelerini kullanır, seçim ve devreye alma desteği veririz.
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
        </div>

        {/* Alt blok 3: Hizmetler */}
        <div className="services">
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
        </div>

        {/* Alt blok 4: Sürecimiz (eski ProcessSteps içeriğiyle birebir aynı metin, satır içi) */}
        <div className="process" style={{ borderRadius: 16, padding: "40px 32px", display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
            <div className="eyebrow">Tasarımdan devreye alma</div>
            <h2 className="h2">Yedi adım, tek sorumlu</h2>
            <p style={{ margin: 0 }}>Her proje, erişim, çarpışma ve çevrim süresi doğrulanan bir simülasyonla başlar.</p>
          </div>
          <ol className="steps">
            {processSteps.map((s, i) => (
              <li key={s}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 15 }}>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* OEM partnerlikleri */}
      <section id="oem" style={{ background: "var(--surface-raised)", borderTop: "1px solid var(--line)" }}>
        <div className="container" style={{ paddingTop: 64, paddingBottom: 64, display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="eyebrow">OEM partnerlikleri</div>
          <ul className="logo-grid logo-grid--oem">
            {oem.map((b) => {
              const logo = b.text ? (
                <span style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 15, color: "var(--ink-muted)" }}>
                  {b.name}
                </span>
              ) : b.src.endsWith(".svg") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={b.src}
                  alt={b.cert ? (b.certLabel ?? b.name) : b.name}
                  width={b.w}
                  height={b.h}
                  style={{ width: "auto", height: "auto", maxWidth: "85%", maxHeight: "70%", objectFit: "contain" }}
                />
              ) : (
                <Image
                  src={b.src}
                  alt={b.cert ? (b.certLabel ?? b.name) : b.name}
                  width={b.w}
                  height={b.h}
                  style={{ width: "auto", height: "auto", maxWidth: "85%", maxHeight: "70%", objectFit: "contain" }}
                />
              );
              return (
                <li key={b.name}>
                  {b.cert ? (
                    // Sertifikasyon/uyarı işareti: OEM partneri değil, marka sayfasına bağlanmaz.
                    <div role="img" aria-label={b.certLabel ?? b.name} title={b.certLabel ?? b.name} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                      {logo}
                    </div>
                  ) : (
                    <Link href={`/magaza/marka/${b.slug}`} aria-label={`${b.name} ürünleri`}>
                      {logo}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Referanslar */}
      <section id="referanslar" className="container" style={{ paddingTop: 64, paddingBottom: 64, display: "flex", flexDirection: "column", gap: 24 }}>
        <div className="eyebrow">Başlıca referanslar</div>
        <p style={{ margin: 0, fontSize: 15, color: "var(--ink-muted)", maxWidth: 720 }}>
          Savunma, havacılık, enerji, sağlık, ağır sanayi ve üretim alanında çalıştığımız kuruluşlardan
          bazıları. Proje ayrıntıları gizlilik anlaşmaları kapsamındadır.
        </p>
        <ul className="logo-grid logo-grid--refs">
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
