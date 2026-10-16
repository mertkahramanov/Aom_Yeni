import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProcessSteps from "@/components/ProcessSteps";
import TeklifForm from "@/components/TeklifForm";
import { breadcrumbJsonLd, faqJsonLd, REGION_LINE, serviceJsonLd, SITE } from "@/lib/seo";

// Hizmet sayfası (16-10-2026): claude/HIZMET_SAYFALARI_TASLAK_15-10-2026.md taslağındaki
// metin çok dar olduğu için AOM_CNC_Tanitim_Brosuru.pdf'in çok daha zengin gerçek içeriğiyle
// (modüler/kompakt tezgah ölçeklenmesi, iki kontrol seçeneği, özel amaçlı tezgahlar, fikstür/
// eksen, robotlu yükleme) değiştirildi. Taslaktaki "[Mert: eksen stroku, iş mili devri, tabla
// ölçüsü, takım magazini]" teknik tablosu broşürde de sabit bir sayı olarak YOK — AOM tezgahı
// standart katalog modeli değil, çalışma alanı/iş mili/kontrolü ihtiyaca göre boyutlandırılan
// bir sistem olarak sunuyor; bu yüzden uydurma bir spec tablosu eklenmedi, broşürün kendi
// çerçevesi (özelleştirme ilkesi) kullanıldı. "Teslim süresi" ve "yerli/ithal" süre
// karşılaştırması gibi broşürde doğrulanmayan rakamlar da eklenmedi.
const url = `${SITE}/cnc-tezgah`;
const title = "Kompakt CNC İşleme Merkezleri | Ankara'da Üretim | AOM";
const description =
  "Ankara'da tasarlanan ve üretilen kompakt CNC işleme merkezleri. Siemens, Fanuc veya Mitsubishi Electric kontrol, robotlu hücre seçeneği, Ankara'dan servis ve yedek parça.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "cnc tezgah ankara",
    "kompakt cnc işleme merkezi",
    "yerli cnc tezgah",
    "robotlu cnc hücresi",
    "cnc tezgah üreticisi",
  ],
  alternates: { canonical: url },
  openGraph: { type: "website", locale: "tr_TR", url, siteName: "AOM", title, description },
};

const highlights = [
  "Siemens, Fanuc veya Mitsubishi Electric kontrol seçeneği",
  "PLC tabanlı AOM reçete sistemi: CNC bilgisi gerekmeden üretim",
  "Robotlu yükleme-boşaltma hücresi seçeneği",
  "Ankara'dan doğrudan servis ve yedek parça",
];

const compareRows = [
  { k: "Yatırım", a: "Marka primi, döviz bazlı fiyat", b: "İhtiyaca göre boyutlanmış tezgâh" },
  { k: "Servis & yedek parça", a: "Yetkili servis sırası, ithal parça", b: "Ankara'dan doğrudan servis" },
  { k: "Özelleştirme", a: "Katalogdaki standart modeller", b: "Çalışma alanı, iş mili ve kontrol size göre" },
  { k: "Muhatap", a: "Distribütör / bayi", b: "Tezgâhı tasarlayan mühendis ekip" },
  { k: "Hat entegrasyonu", a: "Ek paket ya da üçüncü taraf", b: "Robot yükleme ve otomasyon tek elden" },
];

const specialPurpose = [
  { title: "Kesici takım bileme", text: "Matkap, parmak freze ve özel takımların bilenmesi; takım geometrisi reçeteye kayıtlı, operatör takımı seçer." },
  { title: "Testere bileme", text: "Daire testere dişlerinin otomatik bilenmesi; diş sayısı ve açı reçeteden seçilir, indeksleme otomatik." },
  { title: "Plastik sektörü", text: "Termoform ve enjeksiyon parçalarında çapak alma, kesme ve delme; vakumlu tabla ile hızlı bağlama." },
  { title: "Solar panel", text: "Panel ve çerçeve üretim hatlarına uyumlu delme, kesme ve işleme istasyonları; çok kafalı yapı." },
  { title: "Kompozit ve savunma", text: "Karbon ve cam elyaf kompozit parçalarda kesme ve trim; eğimli kafa, toz emiş ve parçaya özel fikstür." },
];

const fixtureSectors = [
  { title: "Otomotiv yan sanayi", text: "Pnömatik çoklu bağlama; altı parça tek bağlamada, mandallar PLC'den kumanda edilir." },
  { title: "Medikal", text: "Çoklu pens bloğu; titanyum implant ve pim çubukları için 12 istasyonlu seri bağlama." },
  { title: "Elektronik", text: "Vakumlu fikstür; ince cidarlı alüminyum kutularda sıkma izi bırakmadan bağlama." },
  { title: "Kalıp ve takım", text: "Sıfır noktası bağlama; palet tezgâh dışında hazırlanır, tezgâhta aynı konuma oturur." },
];

const faqs = [
  {
    q: "İthal premium marka yerine AOM tezgahı almanın farkı ne?",
    a: "Marka primi ve döviz bazlı fiyat yerine ihtiyacınıza göre boyutlanmış bir tezgâh alırsınız; servis Ankara'dan doğrudan sağlanır, çalışma alanı/iş mili/kontrol size göre özelleştirilir, muhatabınız tezgâhı tasarlayan mühendis ekiptir ve robot yükleme ile otomasyon entegrasyonu tek elden yürür.",
  },
  {
    q: "Kontrol ünitesi seçimi nasıl yapılır?",
    a: "İki seçenek sunuyoruz: CNC bilen ekipler için tam G-kodu programlama imkânı olan dünya markası bir kontrol (Siemens, Fanuc veya Mitsubishi Electric), ya da seri üretim için G-kodun sisteme gömülü olduğu, operatörün yalnızca parçayı seçip başlattığı PLC tabanlı AOM reçete sistemi.",
  },
  {
    q: "Mevcut tezgâha robot entegrasyonu yapılabilir mi?",
    a: "Evet. Kartezyen robottan 6 eksenli endüstriyel robota kadar hücrenize uygun robotu seçip entegre ediyoruz; Yaskawa OEM partneri olarak marka güvencesi sunuyoruz, isterseniz daha düşük maliyetli robot da tedarik ediyoruz.",
  },
  {
    q: "Standart modellerde olmayan özel bir proses için tezgâh yaptırabilir miyim?",
    a: "Evet. Tekrarlı bir prosesiniz varsa tezgâhı genel amaçlı bir modele uydurmak yerine prosesinize göre tasarlıyoruz: kesici takım bileme, testere bileme, plastik, solar panel ve kompozit/savunma sektörlerinde örnekleri var; listede olmayan bir iş için de prosesinizi anlatmanız yeterli.",
  },
];

export default function CncTezgahPage() {
  const jsonLd = [
    serviceJsonLd({
      name: "AOM Kompakt CNC İşleme Merkezleri",
      url,
      serviceType: "Kompakt CNC işleme merkezi tasarımı, üretimi ve devreye alınması",
      description,
    }),
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Çözümler", path: "/#cozumler" },
      { name: "CNC Tezgâh", path: "/cnc-tezgah" },
    ]),
    faqJsonLd(faqs),
  ];

  return (
    <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Konum" className="store-crumbs">
        <Link href="/">Ana sayfa</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/#cozumler">Çözümler</Link> <span aria-hidden="true">/</span> <span>CNC Tezgâh</span>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 860 }}>
        <div className="eyebrow">CNC işleme merkezi · Ankara</div>
        <h1 style={{ fontWeight: 800, fontSize: 40, lineHeight: 1.08 }}>
          Logoya değil, performansa yatırım yapın
        </h1>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 16 }}>
          Kompakt CNC tezgâhlarını Ankara&apos;da tasarlıyor, üretiyor ve devreye alıyoruz. Pahalı bir marka
          primi ödemeden, işinizin gerçekten ihtiyaç duyduğu kapasiteye ve yanı başınızdaki mühendislik
          desteğine sahip olursunuz. Kontrol ünitesini ihtiyacınıza göre Siemens, Fanuc veya Mitsubishi
          Electric arasından seçebilir, tezgâhı robotlu bir hücrenin parçası olarak kurabilirsiniz. {REGION_LINE}
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
          src="/hizmetler/cnc-tezgah/cnc-tezgah-render_16-10-2026.webp"
          alt="Lineer kızak, AC servo motor, elektro-mil, durum ışık kulesi ve T-kanallı tablası etiketlenmiş AOM kompakt CNC tezgahı render'ı"
          width={1600}
          height={754}
          style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
        />
      </figure>

      {/* İthal premium marka mı, AOM mu */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 980 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          İthal premium marka mı, AOM mu?
        </h2>
        <table className="spec-table">
          <thead>
            <tr>
              <th></th>
              <th>İthal premium marka</th>
              <th>AOM</th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map((r) => (
              <tr key={r.k}>
                <th scope="row">{r.k}</th>
                <td>{r.a}</td>
                <td>{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alan/yatırım/kapasite */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 980 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Bir büyük tezgâhın yerine 10 AOM
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Büyük tezgâhların yaptığı işlerin çoğu kompakt tezgâhlarla yapılabilir. Tek bir büyük tezgâhın
          kapladığı alana 10 AOM kurup üretimi çok daha düşük yatırımla katlayabilirsiniz
          (parçaların kompakt tezgâhın çalışma alanına sığdığı, tezgâhların paralel çalıştığı üretim için).
        </p>
        <ul className="service-list">
          <li className="card"><strong>10×</strong><span>iş mili, aynı zeminde — 10 parça ya da 10 farklı iş aynı anda işlenir.</span></li>
          <li className="card"><strong>%50+</strong><span>daha düşük yatırım — tek büyük tezgâha göre en az %50; kesin rakam teklifinizde.</span></li>
          <li className="card"><strong>0 m²</strong><span>ek atölye alanı — kapasite büyürken daha büyük atölyeye ve daha yüksek kiraya geçmezsiniz.</span></li>
        </ul>
      </div>

      {/* Kontrol seçenekleri */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 980 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Tezgâhı bilmeyen operatör bile üretir
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          İki kontrol seçeneği sunuyoruz: dünya markası bir CNC kontrol ünitesi ya da ürettiğiniz
          parçalara özel, PLC tabanlı AOM reçete sistemi. Reçete sisteminde G-kodu sisteme gömülür;
          operatör yalnızca parçayı seçer ve başlatır.
        </p>
        <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 8 }}>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 17 }}>Seçenek 1 · CNC bilen ekipler için</strong>
            <p style={{ margin: 0, fontSize: 14.5, color: "var(--ink-muted)" }}>
              Tam G-kodu programlama ve düzenleme, CAM yazılımlarından program aktarımı, markanın küresel
              servis ve yedek parça ağı. Marka seçenekleri: Siemens, Fanuc, Mitsubishi Electric.
            </p>
          </div>
          <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 8 }}>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 17 }}>Seçenek 2 · Seri üretim için</strong>
            <p style={{ margin: 0, fontSize: 14.5, color: "var(--ink-muted)" }}>
              AOM reçete sistemi (PLC): parçalarınızın G-kodları sisteme gömülür, operatör parçayı seçer ve
              başlatır, yeni parçalar talebinize göre eklenir.
            </p>
          </div>
        </div>
        <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8, maxWidth: 640 }}>
          <Image
            src="/hizmetler/cnc-tezgah/cnc-tezgah-recete-hmi_16-10-2026.webp"
            alt="AOM reçete sistemi örnek ekranı: parça kütüphanesinden seçim, malzeme ve bağlama bilgisi, başlat düğmesi"
            width={1600}
            height={712}
            style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
          />
          <figcaption className="caption">Örnek ekran; arayüz parça listenize göre hazırlanır.</figcaption>
        </figure>
      </div>

      {/* Özel amaçlı tezgahlar */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          İşinize özel tezgâh, işinize tam uyum
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Tekrarlı bir prosesiniz varsa onu genel amaçlı bir tezgâha uydurmak yerine tezgâhı prosesinize
          göre tasarlıyoruz. PLC tabanlı kontrol, reçete ile kullanım ve hattınızdaki robot, konveyör ve
          diğer makinelerle entegrasyon tek elden.
        </p>
      </div>
      <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
        {specialPurpose.map((s) => (
          <div key={s.title} className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 6 }}>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 16 }}>{s.title}</strong>
            <p style={{ margin: 0, fontSize: 14, color: "var(--ink-muted)" }}>{s.text}</p>
          </div>
        ))}
      </div>

      {/* Fikstür/eksen */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Tezgâhınız işinizle birlikte büyür
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Her sektöre özel fikstür tasarlıyor, ihtiyaç doğduğunda tezgâha 4. ve 5. ekseni ekliyoruz. Parça
          bağlama süresi kısalır, tek bağlamada daha fazla yüzey işlenir.
        </p>
      </div>
      <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
        {fixtureSectors.map((s) => (
          <div key={s.title} className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 15 }}>{s.title}</strong>
            <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-muted)" }}>{s.text}</p>
          </div>
        ))}
      </div>

      {/* Robotlu hücre */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 980 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Robot yükler, tezgâh durmaz
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Tezgâhların önüne kurulan lineer ray üzerindeki robot ham parçayı tezgâha yerleştirir, biten
          parçayı alır. Vardiya, mola ya da gece fark etmez; hücre kesintisiz üretir. Kartezyen robottan
          6 eksenli endüstriyel robota kadar hücrenize uygun robotu seçiyoruz; Yaskawa OEM partneri
          olarak marka güvencesi sunuyoruz, isterseniz daha düşük maliyetli robot da tedarik ediyoruz.
        </p>
        <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          <Image
            src="/hizmetler/cnc-tezgah/cnc-tezgah-robotlu-hucre_16-10-2026.webp"
            alt="Lineer ray üzerindeki 6 eksenli robotun birden fazla CNC tezgahına parça yüklediği robotlu hücre şeması"
            width={1600}
            height={502}
            style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid var(--line)" }}
          />
        </figure>
      </div>

      <ProcessSteps />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        <h2 className="h2" style={{ fontSize: 26 }}>
          Kimlerle çalıştık
        </h2>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Savunma, havacılık ve ağır sanayide hassasiyet beklentisi yüksek kuruluşlarla çalışıyoruz; proje
          ayrıntıları gizlilik anlaşmaları kapsamındadır. <Link href="/#referanslar">Başlıca referanslarımızı ana sayfada</Link> görebilirsiniz.
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
          CNC tezgâh projeniz için teklif isteyin
        </div>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>
          Çalışma alanı, parça çizimleri ve adet/çevrim süresi ile bize ulaşın; kontrol ünitesi ve robot
          entegrasyonu seçeneklerini birlikte belirleyelim.
        </p>
        <a className="big" href="mailto:info@aomtechnology.tr">
          info@aomtechnology.tr
        </a>
        <a className="big" href={`tel:+905446247514`}>
          0544 624 75 14
        </a>
        <TeklifForm formName="cnc_tezgah_page_form" itemName="CNC işleme merkezi" embedded />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h2 className="h2" style={{ fontSize: 22 }}>
          İlgili
        </h2>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 10 }}>
          <li><Link href="/robotik-kaynak" className="store-chip">Robotik kaynak sistemleri</Link></li>
          <li><Link href="/pres-guvenligi" className="store-chip">Pres güvenliği ve otomatik besleme</Link></li>
          <li><Link href="/plc-scada" className="store-chip">PLC, SCADA ve makine otomasyonu</Link></li>
        </ul>
      </div>
    </section>
  );
}
