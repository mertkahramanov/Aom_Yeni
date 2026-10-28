import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProcessSteps from "@/components/ProcessSteps";
import TeklifForm from "@/components/TeklifForm";
import { breadcrumbJsonLd, faqJsonLd, hreflangAlternates, REGION_LINE, serviceJsonLd, SITE } from "@/lib/seo";

// Hizmet sayfası (27-10-2026): Mert'in yüklediği bir üretici VPSA oksijen jeneratörü broşürü
// (OGV_VPSA_Brochure.pdf) baz alınarak yazıldı. ÖNEMLİ — marka kullanım kararı: bu broşür belirli
// bir üretici markasının kendi telif hakkı olan, marka adı/logosu ve tescilli teknolojileriyle
// (ör. kendi kontrolör ve uzaktan izleme markaları) dolu resmi ürün dokümanıydı. Mert'e soruldu:
// marka adıyla mı kullanılsın (AOM o markanın bayisi/temsilcisi gibi), yoksa marka adı verilmeden
// genel teknik bilgi olarak mı? Mert "genel teknik bilgi olarak kullan, AOM kendi hizmeti gibi sun,
// rakip marka adı verilmesin" dedi (aom-kurumsal-kimlik becerisindeki "rakip marka adı verme"
// kuralıyla da uyumlu). Bu yüzden:
// - Üretici markası, model adları/kodları, marka tescilli kontrolör/uzaktan izleme isimleri YOK.
// - Broşürdeki görseller (üreticinin kendi markalı fotoğrafları) KULLANILMADI; bunun yerine sitede
//   zaten var olan ve homepage'de (HeroSlider, "medikal" bölümü, "Gaz Jeneratörleri" alanı) aynı
//   amaçla kullanılan jenerik/marka-nötr 3B render görseli (aom-medikal-gaz-jeneratoru_03-10-2026.jpg)
//   tekrar kullanıldı.
// - Teknik tablo, broşürdeki 5 spesifik modelin (ve onlara özgü ölçü/ağırlıklarının) birebir kopyası
//   DEĞİL; VPSA teknolojisi sınıfının genel/tipik performans aralığı (debi, saflık, basınç) olarak
//   sunuldu — bunlar fizik/proses temelli, markaya özgü olmayan parametreler. Üreticiye özgü fiziksel
//   tasarım ölçüleri (boy/en/yükseklik, ağırlık) bilerek dışarıda bırakıldı.
// - AOM'un bu sistemlerdeki rolü, 03-10-2026 tarihli HeroSlider yorumunda [TEYİT] olarak işaretliydi
//   (üretim mi, otomasyon mu, tedarik mi netleşecekti). Bu sayfada güvenle doğrulanabilecek, AOM'un
//   bilinen ana iş alanıyla (endüstriyel otomasyon, pano, PLC/SCADA, devreye alma) tutarlı bir rol
//   tarifi kullanıldı: boyutlandırma/tasarım, kontrol-otomasyon ve pano entegrasyonu, devreye alma,
//   saha desteği. Adsorpsiyon kolonlarının AOM tarafından imal edildiği iddia EDİLMEDİ (henüz teyit
//   edilmemiş bir üretim iddiası olurdu) — bu nokta hâlâ Mert'in netleştirmesi gereken açık bir soru
//   (bkz. claude/OKSIJEN_JENERATORU_SAYFASI_27-10-2026.md).
const url = `${SITE}/oksijen-jeneratoru`;
const title = "Endüstriyel Oksijen Jeneratörü (VPSA/PSA) | Ankara";
const description =
  "Yerinde (on-site) oksijen üretimi: VPSA/PSA teknolojili oksijen jeneratörü sistemlerinde boyutlandırma, kontrol-otomasyon ve pano entegrasyonu, devreye alma. Tüp/tanker tedarikine bağımlılığı kaldırın.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "oksijen jeneratörü",
    "endüstriyel oksijen üretimi",
    "VPSA oksijen",
    "PSA oksijen jeneratörü",
    "yerinde oksijen üretimi",
    "oksijen jeneratörü Ankara",
    "sıvı oksijen alternatifi",
  ],
  alternates: { canonical: url, languages: hreflangAlternates("/oksijen-jeneratoru") },
  openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description },
};

const highlights = [
  "Yerinde (on-site) üretim — tüp veya tanker nakliyesine bağımlılık yok",
  "%80 – %94,5 saflık aralığında oksijen, ihtiyaca göre boyutlandırma",
  "Yağsız (oil-free) hava besleme ve entegre kurutma katmanı",
  "Değişken debiyle geniş turndown oranı — düşük yükte de düşük enerji tüketimi",
  "600–800 mbar çıkış basıncı; opsiyonel booster ile 10 bar'a kadar",
];

const services = [
  {
    title: "İhtiyaç analizi ve sistem boyutlandırma",
    text: "Hedef debi (Nm³/h), saflık (%80–%94,5 arası) ve çıkış basıncı ihtiyacınıza göre VPSA/PSA oksijen jeneratörü sistemini boyutlandırırız.",
  },
  {
    title: "Kontrol ve otomasyon entegrasyonu",
    text: "Otomatik başlatma/durdurma, debiye göre düşük yükte enerji tasarrufu sağlayan kontrol mantığı, O2 saflık ölçümü ve PLC/SCADA'ya entegrasyon.",
  },
  {
    title: "Pano tasarımı ve üretimi",
    text: "Sistemin kontrol panosu, dokunmatik ekran (HMI) ve enstrümantasyonu AOM'un kendi pano altyapısıyla tasarlanır ve üretilir.",
  },
  {
    title: "Tampon tank, filtrasyon ve booster entegrasyonu",
    text: "O2 tampon tankı, toz/partikül filtrasyonu ve 600–800 mbar üzeri basınç gereken uygulamalar için yağsız oksijen booster entegrasyonu.",
  },
  {
    title: "Devreye alma ve saha desteği",
    text: "Kurulum sonrası devreye alma, saflık/debi doğrulaması ve saha desteği; mevcut sıvı oksijen tedarikinden yerinde üretime geçiş danışmanlığı.",
  },
];

const applications = [
  { title: "Su ürünleri yetiştiriciliği", text: "Balık çiftliklerinde suya oksijen enjeksiyonu; stok yoğunluğu arttıkça ölçeklenebilir." },
  { title: "Atıksu arıtma", text: "Aktif çamur prosesini hızlandırmak ve ozon üretimi için konsantre oksijen." },
  { title: "Altın/gümüş madenciliği", text: "Liç (leaching) prosesinde çözünmüş oksijen seviyesini artırarak verim kazancı." },
  { title: "Kağıt hamuru ağartma", text: "Delignifikasyonu hızlandırır, kireç fırını kapasitesini ve kimyasal tüketimini iyileştirir." },
  { title: "Biyogaz tesisleri", text: "Fermentörde H2S'in (hidrojen sülfür) oksidasyonla giderilmesi." },
  { title: "Oksi-yakma (oxy-combustion)", text: "Yakıta oksijen zenginleştirmesiyle yanma verimliliği ve yakıt tasarrufu." },
];

const faqs = [
  {
    q: "VPSA nedir, PSA'dan farkı nedir?",
    a: "İkisi de havadan azotu ayırıp oksijeni konsantre eden adsorpsiyon teknolojileridir. VPSA (Vacuum Pressure Swing Adsorption), adsorbentin rejenerasyonunda vakum kullanır; bu sayede PSA'ya göre genellikle daha düşük enerjiyle, daha büyük debilerde oksijen üretimine uygundur.",
  },
  {
    q: "Hangi saflıkta oksijen üretilebilir?",
    a: "Tipik olarak %80 ile %94,5 arasında oksijen saflığı elde edilir; hedef saflık, sistemin boyutlandırılmasını ve kolon tasarımını belirler.",
  },
  {
    q: "Uygulamam daha yüksek basınç gerektiriyorsa ne yapılır?",
    a: "Jeneratörün standart çıkışı 600–800 mbar aralığındadır. Daha yüksek basınç gereken uygulamalarda yağsız bir oksijen booster ile çıkış basıncı 10 bar'a kadar yükseltilebilir.",
  },
  {
    q: "Sıvı oksijen tüpü/tankeri yerine yerinde üretimin avantajı nedir?",
    a: "Tüp veya tanker tedariğinde nakliye maliyeti, teslim süresi riski ve taşıma kaynaklı CO2 emisyonu vardır; ayrıca oksijenin sıvılaştırılması da ayrıca enerji tüketir. Yerinde üretimde oksijen ihtiyaç anında, ihtiyaç kadar üretilir.",
  },
  {
    q: "Hangi sektörlerde kullanılır?",
    a: "Su ürünleri yetiştiriciliği, atıksu arıtma, madencilik (liç prosesi), kağıt hamuru ağartma, biyogaz tesisleri ve oksi-yakma gibi sürekli veya değişken oksijen ihtiyacı olan birçok endüstriyel uygulamada kullanılır.",
  },
  {
    q: "AOM bu projelerde hangi rolü üstleniyor?",
    a: "AOM; ihtiyaç analizi ve sistem boyutlandırma, kontrol/otomasyon ve pano entegrasyonu, devreye alma ve saha desteği sağlar. Projenizin kapsamına göre kesin iş bölümünü birlikte netleştiririz.",
  },
];

export default function OksijenJeneratoruPage() {
  const jsonLd = [
    serviceJsonLd({
      name: "AOM Oksijen Jeneratörü Sistemleri",
      url,
      serviceType: "Endüstriyel oksijen jeneratörü (VPSA/PSA) boyutlandırma, kontrol-otomasyon entegrasyonu ve devreye alma",
      description,
    }),
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Çözümler", path: "/#cozumler" },
      { name: "Oksijen Jeneratörü", path: "/oksijen-jeneratoru" },
    ]),
    faqJsonLd(faqs),
  ];

  return (
    <section className="container hizmet-section" style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/#cozumler">Çözümler</Link> <span aria-hidden="true">/</span> <span>Oksijen Jeneratörü</span>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 860 }}>
        <div className="eyebrow">Oksijen jeneratörü · Ankara</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>Endüstriyel oksijen jeneratörü (VPSA/PSA)</h1>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 16 }}>
          Sıvı oksijen tüpü veya tankerine bağımlı kalmadan, ihtiyacınız olan oksijeni yerinde (on-site)
          üretin. VPSA/PSA teknolojili oksijen jeneratörü sistemlerinde ihtiyaç analizi, boyutlandırma,
          kontrol-otomasyon ve pano entegrasyonu ile devreye almayı birlikte yürütüyoruz. {REGION_LINE}
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
          src="/aom-medikal-gaz-jeneratoru_03-10-2026.jpg"
          alt="Oksijen jeneratörü kabini: dokunmatik ekranlı kontrol paneli, paslanmaz adsorpsiyon kolonları ve basınç göstergeli tampon tankı"
          width={1376}
          height={918}
          style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
        />
        <figcaption className="caption">Temsili 3B görseldir.</figcaption>
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

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Nasıl çalışır
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Besleme havası (yaklaşık %21 oksijen, geri kalanı azot ve eser gazlar) önce yağsız bir üfleyici
          (blower) ile basınçlandırılıp soğutulur. Hava, içinde zeolit adsorbent bulunan iki paralel kolondan
          geçirilir: kolonlardan biri havadaki nemi, CO2&apos;yi ve azotu tutarken geriye yüksek saflıkta
          oksijen kalır; bu sırada diğer kolon, vakumla emilerek (ekstraktör) tuttuğu azot ve nemden arındırılıp
          bir sonraki çevrime hazırlanır. Kolonlar dakikalar mertebesinde dönüşümlü çalışarak kesintisiz oksijen
          akışı sağlar. Üretilen oksijen bir tampon tankında toplanır, filtrelenir ve düşük basınçta (600–800
          mbar) veya opsiyonel bir booster ile yüksek basınçta (10 bar&apos;a kadar) tüketim noktasına iletilir.
        </p>
      </div>

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

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Tipik performans aralığı
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Aşağıdaki değerler, bu teknoloji sınıfı (VPSA oksijen jeneratörü) için tipik performans aralığıdır;
          kesin kapasite ve boyutlandırma, debi ve saflık ihtiyacınıza göre projelendirilir — sabit bir katalog
          ürünü değil, projeye özel mühendislik çözümüdür.
        </p>
        <table className="spec-table">
          <tbody>
            <tr><th scope="row">Kapasite aralığı</th><td>Yaklaşık 80 – 400 Nm³/h (ihtiyaca göre farklı ölçeklerde projelendirilebilir)</td></tr>
            <tr><th scope="row">Oksijen saflığı</th><td>%80 – %94,5 O2</td></tr>
            <tr><th scope="row">Çıkış basıncı</th><td>600 – 800 mbar; opsiyonel booster ile 10 bar&apos;a kadar</td></tr>
            <tr><th scope="row">Hava besleme</th><td>Yağsız (oil-free) blower</td></tr>
            <tr><th scope="row">Kurutma</th><td>Entegre kurutma katmanı — ayrı bir hava kurutucusu gerekmez</td></tr>
            <tr><th scope="row">Çalışma modu</th><td>Kesintisiz, otomatik başlatma/durdurma ve düşük yükte enerji tasarrufu</td></tr>
          </tbody>
        </table>
      </div>

      <ProcessSteps />

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
          Debi ve saflık ihtiyacınızı anlatın, sistemi birlikte boyutlandıralım
        </div>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>
          Hedef debi (Nm³/h), saflık ve basınç ihtiyacınızla bize ulaşın.
        </p>
        <a className="big" href="mailto:info@aomtechnology.tr">
          info@aomtechnology.tr
        </a>
        <a className="big" href={`tel:+905446247514`}>
          0544 624 75 14
        </a>
        <TeklifForm formName="oksijen_jeneratoru_page_form" itemName="Oksijen jeneratörü sistemi" embedded />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>
          İlgili
        </h2>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 10 }}>
          <li><Link href="/plc-scada" className="store-chip">PLC, SCADA ve makine otomasyonu</Link></li>
          <li><Link href="/tristorlu-guc-kontrol" className="store-chip">Tristörlü güç kontrol panoları</Link></li>
        </ul>
      </div>
    </section>
  );
}
