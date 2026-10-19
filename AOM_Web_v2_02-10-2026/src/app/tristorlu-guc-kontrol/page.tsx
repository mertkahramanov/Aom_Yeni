import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProcessSteps from "@/components/ProcessSteps";
import TeklifForm from "@/components/TeklifForm";
import { breadcrumbJsonLd, faqJsonLd, hreflangAlternates, REGION_LINE, serviceJsonLd, SITE } from "@/lib/seo";

// Hizmet sayfası (16-10-2026): claude/HIZMET_SAYFALARI_TASLAK_15-10-2026.md taslağı,
// AOM_Tristorlu_Guc_Kontrol_Brosuru.pdf içeriğiyle dolduruldu. Bu broşür, 5 hizmet sayfası
// içinde isimli/somut tek gerçek referansı içeriyor: Baykar · Kompozit otoklav ısıtma kontrolü
// (broşürün kendisinde de adıyla geçiyor: "Referans proje: Baykar · Kompozit otoklav"). Mert'in
// onayıyla (16-10-2026) isim açıkça kullanıldı; saha fotoğrafı da broşürden alındı. "%40+
// ölçülmüş enerji tasarrufu" rakamı broşürdeki "AOM projelerinde ölçülen en düşük tasarruf
// %40'tır" notuyla birlikte kullanıldı (kesin oranın prosese göre değiştiği belirtilerek).
const url = `${SITE}/tristorlu-guc-kontrol`;
const title = "Tristörlü Güç Kontrol Panoları | Ankara | AOM";
const description =
  "Isıl proseslerde hassas güç kontrolü için tristörlü güç kontrol panoları. Faz açısı ve sıfır geçiş kontrolü, RS485 Modbus RTU, kanal başına 600 A. Gefran yetkili satış.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "tristörlü güç kontrol panosu",
    "tristör pano",
    "ısıl proses güç kontrolü",
    "faz açısı kontrolü",
    "sıfır geçiş kontrolü",
    "gefran tristör",
  ],
  alternates: { canonical: url, languages: hreflangAlternates("/tristorlu-guc-kontrol") },
  openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description },
};

const highlights = [
  "Kanal başına 600 A'e kadar oransal güç",
  "4–10 kanal/pano, tek üniteden 132 kanala kadar",
  "Faz açısı ve sıfır geçiş çevrim kontrolü, RMS geri besleme",
  "RS485 Modbus RTU ile PLC/SCADA'dan izleme ve ayar",
  "AOM projelerinde ölçülen en düşük %40+ enerji tasarrufu*",
];

const services = [
  {
    title: "Tristörlü güç kontrol panosu tasarım ve üretimi",
    text: "Kanal başına 600 A'e kadar oransal güç; pano başına 4–10 kanal, tek üniteden toplam 132 kanala kadar. Yarı iletken sigortalarla tristör koruması, fanlı soğutma, dijital gösterge.",
  },
  {
    title: "Kontrol yöntemi seçimi",
    text: "Düşük ısıl kütleli ve ani akım çeken ısıtıcılar için faz açısı kontrolü; yüksek ısıl kütleli fırın ve kalıplarda daha düşük harmonik/EMI için sıfır geçiş çevrim kontrolü.",
  },
  {
    title: "Kapalı çevrim PID entegrasyonu",
    text: "Termokupl/PT100 sıcaklık sensörü, PID kontrolör veya PLC ve tristör ünitesinin RMS geri beslemesiyle kapalı çevrim: sapma anında düzeltilir, set değeri korunur.",
  },
  {
    title: "PLC/SCADA entegrasyonu",
    text: "RS485 Modbus RTU ile her kanalın akım, gerilim ve gücü PLC ya da SCADA'ya okunur; tüketim hat bazında izlenir.",
  },
  {
    title: "Mevcut sistemlerin tristörlü kontrole dönüştürülmesi",
    text: "Kontaktörlü aç-kapa kontrolü veya elektrikli kızgın yağ ısıtma sistemini AOM tristörlü panosuyla sürülecek şekilde dönüştürürüz; sıcaklık daha kararlı, ısıtıcı elemanlar daha uzun ömürlü olur.",
  },
];

const applications = [
  { title: "Plastik & ekstrüzyon", text: "Kovan ve kalıp ısıtma bölgeleri." },
  { title: "Isıl işlem fırınları", text: "Temperleme, tavlama, sertleştirme." },
  { title: "Kurutma & pişirme", text: "Boya, toz boya ve gıda fırınları." },
  { title: "Cam & seramik", text: "Şekillendirme ve tav fırınları." },
  { title: "Kızılötesi ısıtma", text: "Termoform, kurutma tünelleri." },
  { title: "Kompozit kürleme", text: "Otoklav ısıtma kontrolü (bkz. Baykar referans projesi aşağıda)." },
];

const faqs = [
  {
    q: "Tristörlü kontrol kontaktörlü kontrole göre ne kazandırır?",
    a: "Kontaktörlü aç-kapa kontrolde ısıtıcı tam güçle çalışıp set değerini aşar, kapanır ve soğumayı bekler; tristörlü kontrol gücü %0–100 arasında sürekli ve oransal ayarlar. AOM projelerinde ölçülen en düşük enerji tasarrufu %40'tır; kesin oran prosese, ısıtıcı tipine ve mevcut kontrol yöntemine göre değişir. Ayrıca aşınan kontak olmadığı için bakım maliyeti düşer.",
  },
  {
    q: "Faz açısı mı, sıfır geçiş kontrolü mü seçmeliyim?",
    a: "Düşük ısıl kütleli ve ani akım çeken ısıtıcılarda (ör. kızılötesi lamba) faz açısı kontrolü; ısıl kütlesi yüksek fırın ve kalıplarda, şebekeye daha düşük harmonik ve EMI yansıtan sıfır geçiş çevrim kontrolü uygundur. Nihai seçimi prosesinize göre birlikte yaparız.",
  },
  {
    q: "Mevcut panomu tristörlü kontrole dönüştürebilir misiniz?",
    a: "Evet. Kontaktörlü aç-kapa panoyu veya elektrikli kızgın yağ ısıtma sisteminizi AOM tristörlü panosuyla sürülecek şekilde dönüştürüyoruz.",
  },
  {
    q: "PLC veya SCADA sistemime entegre edebilir miyim?",
    a: "Evet. Panolarımız RS485 Modbus RTU ile haberleşir; her kanalın akım, gerilim ve gücünü PLC veya SCADA'nızdan okuyabilirsiniz.",
  },
  {
    q: "Gefran tristör ürünlerini de satıyor musunuz?",
    a: "Evet, AOM Gefran'ın tristörlü güç kontrol ürün grubunda satış noktası ve teknik destek sağlayıcısıdır. Ürünleri mağazamızdaki Gefran güç kontrol kategorisinden inceleyebilirsiniz.",
  },
];

export default function TristorluGucKontrolPage() {
  const jsonLd = [
    serviceJsonLd({
      name: "AOM Tristörlü Güç Kontrol Panoları",
      url,
      serviceType: "Tristörlü güç kontrol panosu tasarımı, üretimi ve devreye alınması",
      description,
    }),
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Çözümler", path: "/#cozumler" },
      { name: "Tristörlü Güç Kontrol", path: "/tristorlu-guc-kontrol" },
    ]),
    faqJsonLd(faqs),
  ];

  return (
    <section className="container hizmet-section" style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/#cozumler">Çözümler</Link> <span aria-hidden="true">/</span> <span>Tristörlü Güç Kontrol</span>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 860 }}>
        <div className="eyebrow">Tristörlü güç kontrol · Ankara</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Tristörlü güç kontrol panoları</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 16 }}>
          Fırın, ısıtıcı ve ısıl proseslerde hassas güç kontrolü için tristörlü güç kontrol panoları
          tasarlıyor ve üretiyoruz. Faz açısı ve sıfır geçiş kontrolü, RS485 Modbus RTU haberleşme ve kanal
          başına 600 A&apos;e kadar akımla, panoyu prosesinize göre boyutlandırıyoruz. {REGION_LINE}
        </p>
      </div>

      <ul className="service-list" style={{ maxWidth: 980 }}>
        {highlights.map((h) => (
          <li key={h} className="card">
            <span style={{ fontSize: 15 }}>{h}</span>
          </li>
        ))}
      </ul>
      <p className="caption" style={{ marginTop: -36 }}>
        * AOM projelerinde ölçülen en düşük tasarruf %40&apos;tır; kesin oran prosese, ısıtıcı tipine ve mevcut
        kontrol yöntemine göre değişir.
      </p>

      <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        <Image
          src="/hizmetler/tristorlu-guc-kontrol/tristorlu-guc-kontrol-pano_16-10-2026.webp"
          alt="Ana şalter, tristör güç ünitesi, dijital gösterge, fanlı soğutma ve klemens bloğu etiketlenmiş AOM tristörlü güç kontrol panosu render'ı"
          width={1600}
          height={747}
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

      <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8, maxWidth: 760 }}>
        <Image
          src="/hizmetler/tristorlu-guc-kontrol/tristorlu-guc-kontrol-hmi_16-10-2026.webp"
          alt="8 kanallı tristör panosunun sıcaklık, çıkış gücü ve akım değerlerini tek ekranda gösteren operatör arayüzü örneği"
          width={1600}
          height={854}
          style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
        />
        <figcaption className="caption">Örnek ekran; arayüz projeye göre uyarlanır.</figcaption>
      </figure>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Uygulama alanları
        </h2>
      </div>
      <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
        {applications.map((a) => (
          <div key={a.title} className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 15 }}>{a.title}</strong>
            <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-muted)" }}>{a.text}</p>
          </div>
        ))}
      </div>

      <ProcessSteps />

      {/* Referans proje: Baykar — broşürde adıyla geçiyor, Mert onayıyla (16-10-2026) kullanıldı */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Kâğıtta değil, sahada çalışıyor
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          AOM&apos;un tasarlayıp ürettiği tristörlü güç kontrol panoları, savunma sanayiinin en hassas ısıl
          proseslerinden birinde, kompozit parçaların otoklavda kürlenmesinde görev yapıyor.
        </p>
        <div className="grid-auto" style={{ gridTemplateColumns: "minmax(0, 360px) 1fr", alignItems: "start" }}>
          <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            <Image
              src="/hizmetler/tristorlu-guc-kontrol/tristorlu-guc-kontrol-baykar-referans_16-10-2026.webp"
              alt="Baykar tesisinde kurulu AOM tristörlü güç kontrol panosunun saha fotoğrafı"
              width={723}
              height={1051}
              style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
            />
            <figcaption className="caption">AOM tristörlü güç kontrol panosu, saha fotoğrafı.</figcaption>
          </figure>
          <div className="card" style={{ padding: 24 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Referans proje</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, marginBottom: 4 }}>Baykar</div>
            <p style={{ margin: "0 0 16px", color: "var(--ink-muted)" }}>Kompozit otoklav ısıtma kontrolü</p>
            <table className="spec-table">
              <tbody>
                <tr><th scope="row">Uygulama</th><td>Kompozit parça kürleme otoklavı</td></tr>
                <tr><th scope="row">Kanal sayısı</th><td>8 kanal</td></tr>
                <tr><th scope="row">Toplam yük</th><td>380 V · 1600 A</td></tr>
                <tr><th scope="row">Maks. sıcaklık</th><td>1000 °C</td></tr>
                <tr><th scope="row">Kapsam</th><td>Pano tasarımı, üretim, devreye alma</td></tr>
              </tbody>
            </table>
          </div>
        </div>
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
          Prosesinizi anlatın, panonuzu birlikte boyutlandıralım
        </div>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>
          Yük tipi, kanal sayısı, gerilim/akım ve hedef sıcaklık bilgisiyle bize ulaşın.
        </p>
        <a className="big" href="mailto:info@aomtechnology.tr">
          info@aomtechnology.tr
        </a>
        <a className="big" href={`tel:+905446247514`}>
          0544 624 75 14
        </a>
        <TeklifForm formName="tristorlu_guc_kontrol_page_form" itemName="Tristörlü güç kontrol panosu" embedded />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>
          İlgili
        </h2>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 10 }}>
          <li><Link href="/magaza/kategori/tristorlu-guc-kontrol" className="store-chip">Mağaza · Tristörlü güç kontrol (Gefran)</Link></li>
          <li><Link href="/magaza/marka/gefran" className="store-chip">Mağaza · Gefran</Link></li>
          <li><Link href="/plc-scada" className="store-chip">PLC, SCADA ve makine otomasyonu</Link></li>
        </ul>
      </div>
    </section>
  );
}
