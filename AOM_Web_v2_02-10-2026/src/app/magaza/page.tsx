import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "@/components/SearchBox";
import StoreSlider, { type StoreSlide } from "@/components/StoreSlider";
import { isUsedCategory, products, storeCategories } from "@/data/magaza";
import { ENC_TOTAL } from "@/data/enkoder";
import { KONTROL_KOD_TOTAL } from "@/data/kontrol";
import { breadcrumbJsonLd, REGION_LINE, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mağaza: Autonics, Gefran – Kontrol, Enkoder, SSR, Tristör | Ankara",
  description:
    "Autonics sıcaklık kontrol cihazları, sayıcı, zamanlayıcı, panel metre, HMI, enkoderler, solid state röle (SSR), DPU ve SPR tristörlü güç kontrol üniteleri; Gefran güç kontrol, SSR ve motor yol vericiler. Fiyatlar KDV hariç. Ankara merkezli AOM'dan Türkiye geneline satış ve teklif.",
  keywords: ["Autonics bayi Ankara", "sıcaklık kontrol cihazı", "zamanlayıcı", "sayıcı", "HMI", "enkoder", "encoder", "artımlı enkoder", "mutlak enkoder", "solid state röle", "SSR", "katı hal rölesi", "tristörlü güç kontrol ünitesi", "SCR güç kontrolörü", "otomasyon malzemeleri Ankara", "Autonics fiyat listesi", "Gefran satış noktası", "Gefran teknik destek", "Gefran güç kontrol"],
  alternates: { canonical: "/magaza" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/magaza",
    siteName: "AOM",
    title: "AOM Mağaza: Autonics Enkoder, SSR ve Tristörlü Güç Kontrol",
    description: "Ankara merkezli AOM'dan Türkiye geneline Autonics enkoderler, SSR ve tristörlü güç kontrol üniteleri.",
  },
};

// Ana kategoriler (06-10-2026): mağaza ilk sayfasında başlık + kare alt kategori kutuları.
// ids: null = listede olmayan tüm kategoriler (yeni eklenen kategoriler buraya düşer; "Diğer ürünler" ayrıca en sonda).
// codes: o ana kategoriye ait sipariş kodu listeleri (kare kutu olarak alt kategorilerin yanında gösterilir).
type CodeList = { href: string; title: string; total: number };
const MAIN_GROUPS: { id: string; title: string; ids: string[] | null; codes?: CodeList[] }[] = [
  {
    id: "guc-kontrol",
    title: "Güç kontrol",
    ids: ["tristorlu-guc-kontrol", "solid-state-roleler-ssr", "motor-starter"],
    codes: [{ href: "/magaza/dpu-kodlari", title: "Autonics DPU sipariş kodları", total: 840 }],
  },
  {
    id: "kontrol-cihazlari",
    title: "Kontrol cihazları",
    ids: ["sicaklik-kontrol-cihazlari", "sayicilar", "zamanlayicilar", "dijital-panel-metreler", "kayit-cihazlari", "gostergeler", "dijital-ekran-birimleri", "sensor-kontrol-cihazlari"],
    codes: [{ href: "/magaza/kontrol-kodlari", title: "Autonics kontrol cihazı sipariş kodları", total: KONTROL_KOD_TOTAL }],
  },
  {
    id: "enkoderler-grup",
    title: "Enkoderler",
    ids: ["enkoderler"],
    codes: [{ href: "/magaza/enkoder-kodlari", title: "Autonics enkoder sipariş kodları", total: ENC_TOTAL }],
  },
  { id: "operator-panelleri", title: "Operatör panelleri ve endüstriyel bilgisayarlar", ids: ["grafik-paneller-hmi", "endustriyel-bilgisayarlar"] },
  { id: "roleler", title: "Röleler", ids: ["roleler-ve-role-soketleri"] },
  { id: "motor-suruculer", title: "Motor sürücüler ve yol vericiler", ids: ["hiz-kontrol-cihazlari-ac-suruculer", "dc-motor-suruculer", "yumusak-yol-vericiler-soft-starter", "fren-uniteleri-ve-direncleri"] },
  { id: "cnc-elektronik", title: "CNC yedek parça ve elektronik", ids: null },
  { id: "ikinci-el", title: "2. El ürünler", ids: [] }, // kategoriler isUsedCategory ile otomatik eklenir
  { id: "diger", title: "Diğer", ids: ["diger-urunler"] },
];
const KNOWN = new Set(MAIN_GROUPS.flatMap((m) => m.ids ?? []));

// Mağaza slider (17-10-2026, Mert isteği): sayfanın en üstünde öne çıkan ana kategoriler arasında
// gezinme. Başlık/açıklama metinleri dışında (kısa, doğrulanmış tanıtım cümleleri) tüm veriler
// (ürün sayısı, görsel yoksa) aşağıdaki catIds ile aynı kategori verisinden (storeCategories())
// hesaplanır; ayrı bir sayı uydurulmadı. catIds, MAIN_GROUPS'taki bir grubun tüm alt kategorileri
// olabilir (ör. "guc-kontrol") veya tek bir alt kategori olabilir (ör. "Servo motorlar" slaytı,
// "cnc-elektronik" grubunun içindeki "step-ve-servo-motorlar-suruculer" alt kategorisini hedefler —
// kendi grubu olmadığı için href doğrudan kategori sayfasına gider, sayfa içi çapaya değil).
// image: Mert'in slider için ayrıca verdiği kategori görseli (17-10-2026, "Mağaza Slider" klasörü,
// public/magaza-slider/ altına optimize edilip kopyalandı). Yoksa (Güç kontrol, 2. El ürünler)
// kategorideki ilk ürün fotoğrafına düşülüyor (aşağıdaki `f.image ?? items.find(...)`).
const SLIDER_FEATURE: { id: string; short: string; eyebrow: string; title: string; lead: string; href: string; catIds: string[]; image?: { src: string; alt: string } }[] = [
  {
    id: "guc-kontrol",
    short: "Güç kontrol",
    eyebrow: "Güç kontrol",
    title: "Tristörlü güç kontrol ve SSR",
    lead: "Autonics ve Gefran tristörlü güç kontrol üniteleri (DPU, SPR) ve solid state röleler (SSR); ısıl proseslerde hassas güç kontrolü.",
    href: "#guc-kontrol",
    catIds: ["tristorlu-guc-kontrol", "solid-state-roleler-ssr", "motor-starter"],
    // Not (17-10-2026): Mert'in verdiği görsel aslında 3 adet frekans invertörü/VFD gösteriyor
    // ("VARIABLE FREQUENCY DRIVE", VFD-1K serisi) — bu kategorideki ürünler (tristörlü güç kontrol,
    // SSR, motor starter) değil, sürücü/invertör. Kategori uyuşmazlığı Mert'e sohbette bildirildi;
    // Mert "yine de bu slaytta kullan" diye onayladı, bu yüzden genel/temsili bir güç elektroniği
    // görseli olarak kullanıldı. Güncelleme: görseldeki marka yazıları bulanıklaştırılarak
    // denenmişti, ama Mert bu işin görünümünü beğenmedi ("berbat görünüyor") ve eski (bulanıklaştırma
    // öncesi, marka yazıları görünür) haline döndürülmesini istedi — görsel orijinaline geri alındı.
    image: { src: "/magaza-slider/guc-kontrol-slider_17-10-2026.webp", alt: "Güç elektroniği üniteleri" },
  },
  {
    id: "kontrol-cihazlari",
    short: "Kontrol cihazları",
    eyebrow: "Kontrol cihazları",
    title: "Sıcaklık kontrol, sayıcı, zamanlayıcı ve HMI",
    lead: "Autonics sıcaklık kontrol cihazı, sayıcı, zamanlayıcı, dijital panel metre, kayıt cihazı, gösterge, ekran birimi ve HMI serileri.",
    href: "#kontrol-cihazlari",
    catIds: ["sicaklik-kontrol-cihazlari", "sayicilar", "zamanlayicilar", "dijital-panel-metreler", "kayit-cihazlari", "gostergeler", "dijital-ekran-birimleri", "sensor-kontrol-cihazlari"],
    // Not: Mert'in verdiği görsel Omron E5CC/E5EC/E5AC gösteriyor; bu kategorideki ürünlerin
    // tamamı Autonics. Genel/temsili bir "sıcaklık kontrol cihazı" görseli olarak kullanıldı —
    // marka uyuşmazlığı aşağıdaki sohbet mesajında Mert'e ayrıca bildirildi.
    // Güncelleme (17-10-2026): Mert bu görseli, Mitsubishi Electric GOT3000 serisi HMI panellerini
    // gösteren yeni bir fotoğrafla değiştirmemizi istedi ("kontrol cihazları resmini bununla
    // değiştir"). Bu kategoride (sıcaklık kontrol, sayıcı, zamanlayıcı, panel metre, kayıt cihazı,
    // gösterge, ekran birimi, sensör kontrol cihazı) sadece Autonics ürünleri var; kataloğumuzda hiç
    // Mitsubishi HMI yok — hem marka hem ürün tipi (küçük kontrol cihazı yerine büyük dokunmatik
    // panel) uyuşmuyor. Mert bu HMI görselini onayladı. "Mitsubishi Electric" ve "GOT3000" marka
    // yazıları bulanıklaştırılarak kaldırılmıştı, ama Mert bu işin görünümünü beğenmedi ("berbat
    // görünüyor") ve eski (bulanıklaştırma öncesi, marka yazıları görünür) haline döndürülmesini
    // istedi — görsel orijinaline geri alındı.
    image: { src: "/magaza-slider/kontrol-cihazlari-slider_17-10-2026.webp", alt: "HMI dokunmatik operatör panelleri" },
  },
  {
    id: "enkoderler-grup",
    short: "Enkoderler",
    eyebrow: "Enkoderler",
    title: "Artımlı ve mutlak enkoderler",
    lead: "Autonics enkoderler: 34 seri, çözünürlük ve çıkış tipine göre 8.644 sipariş kodu.",
    href: "#enkoderler-grup",
    catIds: ["enkoderler"],
    // Güncelleme (17-10-2026): Mert'in gönderdiği enkoder çeşitleri (çeşitli gövde tiplerinde artımlı/
    // mutlak enkoderler) görseli kullanıldı. De-branding talimatı gereği görsel incelendi; okunabilir
    // marka logosu/yazısı bulunmadı (sadece genel uyarı etiketleri), bu yüzden bulanıklaştırma
    // uygulanmadı.
    image: { src: "/magaza-slider/enkoderler-slider_17-10-2026.webp", alt: "Çeşitli enkoder tipleri" },
  },
  {
    id: "motor-suruculer",
    short: "Motor sürücüler",
    eyebrow: "Motor sürücüler ve yol vericiler",
    title: "AC/DC motor sürücü ve yol vericiler",
    lead: "AC hız kontrol cihazları (invertör), DC motor sürücüler, yumuşak yol vericiler ve fren üniteleri.",
    href: "#motor-suruculer",
    catIds: ["hiz-kontrol-cihazlari-ac-suruculer", "dc-motor-suruculer", "yumusak-yol-vericiler-soft-starter", "fren-uniteleri-ve-direncleri"],
    image: { src: "/magaza-slider/motor-suruculer-slider_17-10-2026.webp", alt: "Yaskawa AC motor sürücü (GA500)" },
  },
  {
    // Mert isteği (17-10-2026): "Servo motorlar" diye bir slayt eklendi. Gerçek kategori adı
    // "Step ve servo motorlar, sürücüler" (step ve servo motor + sürücü birlikte, CNC yedek parça
    // ve elektronik grubunun altında); sekme/eyebrow kısa olsun diye "Servo motorlar" kullanıldı,
    // başlık ve açıklama gerçek kategori adını ve mevcut onaylı metnini (src/data/yedek-parca.ts
    // CAT_TEXT) koruyor — step motorları da kapsadığını gizlemiyor.
    id: "servo-motorlar",
    short: "Servo motorlar",
    eyebrow: "Servo motorlar",
    title: "Step ve servo motorlar, sürücüler",
    lead: "Step motorlar ve sürücüleri CNC eksenlerinde konumlamayı açık veya kapalı çevrimle (enkoderli) sağlar; flanş ölçüsü (NEMA), tutma torku ve faz akımına göre seçilir.",
    href: "/magaza/kategori/step-ve-servo-motorlar-suruculer",
    catIds: ["step-ve-servo-motorlar-suruculer"],
    image: { src: "/magaza-slider/servo-motorlar-slider_17-10-2026.webp", alt: "Yaskawa Sigma servo motor ve sürücü" },
  },
  {
    // Mert isteği (17-10-2026): "Sensörler" diye bir slayt eklendi. Gerçek kategori adı
    // "Sviç, sensör ve butonlar" (CNC yedek parça ve elektronik grubunun altında) — limit sviç,
    // endüktif yaklaşım sensörü, dijital kodlu mod anahtarı ve buton/pedalları kapsıyor (44 ürün,
    // 11'inde gerçek fotoğraf var); sekme/eyebrow kısa olsun diye "Sensörler" kullanıldı, başlık ve
    // açıklama gerçek kapsamı (sviç + buton da var) gizlemiyor. Lead metni src/data/yedek-parca.ts
    // CAT_TEXT'teki mevcut onaylı açıklamadan alındı. Görsel: kategorideki gerçek bir üründen
    // (Balluff BES 516-300-S205-D-PU endüktif sensör) — ilk sıradaki otomatik görsele bırakılmadı,
    // çünkü sırada önce limit sviç fotoğrafı geliyor; "Sensörler" başlığıyla en örtüşen gerçek ürün
    // fotoğrafı elle seçildi.
    id: "sensorler",
    short: "Sensörler",
    eyebrow: "Sensörler ve switchler",
    title: "Limit sviç, endüktif sensör ve butonlar",
    lead: "Limit sviçler, endüktif sensörler, mod anahtarları ve butonlar CNC tezgâhlarında konum algılama, eksen referansı ve operatör kumandası için kullanılır.",
    href: "/magaza/kategori/svic-sensor-ve-butonlar",
    catIds: ["svic-sensor-ve-butonlar"],
    image: { src: "/magaza/assets-fcdfa49c_06-10-2026.jpg", alt: "Balluff endüktif yaklaşım sensörü" },
  },
];

export default function MagazaPage() {
  const cats = storeCategories();

  const sliderSlides: StoreSlide[] = SLIDER_FEATURE.map((f) => {
    const subs = f.catIds.map((id) => cats.find((c) => c.id === id)).filter((c): c is (typeof cats)[number] => !!c);
    const items = subs.flatMap((c) => c.groups.flatMap((g) => g.items));
    const image = f.image ?? items.find((p) => p.image)?.image;
    return {
      id: f.id,
      short: f.short,
      eyebrow: f.eyebrow,
      title: f.title,
      lead: f.lead,
      spec: `${items.length.toLocaleString("tr-TR")} ürün`,
      cta: `${f.eyebrow} kategorisine git`,
      href: f.href,
      image,
    };
  }).filter((s) => s.spec !== "0 ürün");

  // 2. El ürünler: ayrı bir filtre mantığı (isUsedCategory) kullandığı için yukarıdaki döngüye dahil
  // edilmedi; MAIN_GROUPS'taki "ikinci-el" bölümüyle aynı hesaplama.
  const usedCats = cats.filter((c) => isUsedCategory(c.title));
  const usedItems = usedCats.flatMap((c) => c.groups.flatMap((g) => g.items));
  if (usedItems.length) {
    sliderSlides.push({
      id: "ikinci-el",
      short: "2. El ürünler",
      eyebrow: "İkinci el yedek parça",
      // Mert isteği (17-10-2026): açıklamalarda "ikinci el yedek parça" ifadesi kullanıldı.
      title: "İkinci el yedek parça, test edilmiş ve garantili",
      lead: "Rulman, lineer hareket, sürücü, kontrol cihazı ve CNC yedek parçalarında ikinci el stok; durum, test ve garanti bilgisiyle listelenir.",
      spec: `${usedItems.length.toLocaleString("tr-TR")} ürün`,
      cta: "İkinci el yedek parçalara git",
      href: "#ikinci-el",
      // Not: Mert'in bu slayt için verdiği "İkinci Yedek Parça.jpg" kullanılmadı — bir üçüncü taraf
      // sitesinden alınmış Fanuc tanıtım görseli (üstte FANUC logosu, altta "TÜM ÜRÜNLER" düğmesi
      // gömülü) ve gerçek ikinci el stoğumuzda (809 üründe) hiç Fanuc ürünü yok; görsel gerçek
      // envanteri yansıtmıyor. Sohbette Mert'e ayrıca soruldu.
      // Güncelleme (17-10-2026): Mert bu slayt için ELCO Industrial Automation marka geniş bir ürün
      // kolajı (endüstriyel I/O modülleri, sensörler, kablolar, güvenlik röleleri vb.) gönderdi.
      // Gerçek 2. el stoğumuzda (809 üründe) ELCO markalı ürün sayısı sadece 1 — bu görsel de gerçek
      // envanteri birebir yansıtmıyor (Fanuc görselindeki duruma benzer), ama Mert'in genel "gönderdiğim
      // tüm görselleri işleyip slider'a yerleştir" talimatı ve kategori uyuşmazlıklarının onaylandığı
      // önceki örnekler (güç kontrol, kontrol cihazları) doğrultusunda kullanıldı; bu uyuşmazlık burada
      // da açıkça not düşülüyor. Görseldeki "ELCO" marka logoları/yazıları önce tek tek
      // bulanıklaştırılarak kaldırılmıştı, ama Mert bu işin görünümünü beğenmedi ("berbat görünüyor")
      // ve eski (bulanıklaştırma öncesi, marka yazıları görünür) haline döndürülmesini istedi — görsel
      // orijinaline geri alındı.
      image: { src: "/magaza-slider/ikinci-el-slider_17-10-2026.webp", alt: "Endüstriyel otomasyon ürün çeşitliliği" },
    });
  }
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "AOM Mağaza",
      url: `${SITE}/magaza`,
      inLanguage: "tr-TR",
      about: cats.map((c) => c.title),
      isPartOf: { "@id": `${SITE}/#org` },
      numberOfItems: products.length,
    },
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: "/" },
      { name: "Mağaza", path: "/magaza" },
    ]),
  ];
  return (
    <>
      <StoreSlider slides={sliderSlides} />
      <section className="container section" style={{ display: "flex", flexDirection: "column", gap: 32, paddingTop: 40 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 820 }}>
        <div className="rule" />
        <div className="eyebrow">Mağaza</div>
        <h1 style={{ fontWeight: 800, fontSize: 44, lineHeight: 1.05 }}>AOM Mağaza</h1>
        <p className="lead">
          Gefran (satış noktası ve teknik destek) ve Autonics tristörlü güç kontrol üniteleri, solid state röleler (SSR), Gefran motor yol vericiler, Autonics enkoderler ve kontrol cihazları; NCR röleler ve röle soketleri, CNC yedek parçaları ve endüstriyel elektronik ürünler. Kategoriyi seçerek ürünlere ulaşın. Fiyatlar KDV hariçtir. {REGION_LINE}
        </p>
        <SearchBox placeholder="Ürün kodu veya model ile arayın (ör. DPU34D-500A, E40S6-1000)" />
      </div>
      {MAIN_GROUPS.map((m) => {
        if (m.id === "ikinci-el") {
          const used = cats.filter((c) => isUsedCategory(c.title));
          const n = used.reduce((k, c) => k + c.groups.reduce((j, g) => j + g.items.length, 0), 0);
          return (
            <section key={m.id} id={m.id} className="cat-main" aria-labelledby={`${m.id}-baslik`}>
              <h2 id={`${m.id}-baslik`} className="h2" style={{ fontSize: 28 }}>
                {m.title} {n > 0 && <span className="store-count">{n.toLocaleString("tr-TR")} ürün</span>}
              </h2>
              {used.length ? (
                <ul className="cat-tiles">
                  {used.map((c) => {
                    const items = c.groups.flatMap((g) => g.items);
                    const img = items.find((p) => p.image)?.image;
                    return (
                      <li key={c.id}>
                        <Link href={`/magaza/kategori/${c.id}`} className="cat-tile cat-tile-used">
                          <span className="cat-tile-visual">
                            {img ? <Image src={img.src} alt="" fill sizes="(max-width: 640px) 50vw, 280px" style={{ objectFit: "contain" }} /> : <span className="cat-tile-count" aria-hidden="true">{items.length}</span>}
                          </span>
                          <span className="cat-tile-body">
                            <strong>{c.title.replace(/^2\. El · /, "")}</strong>
                            <span>{items.length.toLocaleString("tr-TR")} ürün · 2. el</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="cat-codes-box">
                  <p>
                    2. el ürünler yakında burada listelenecek. Aradığınız 2. el bir ürün varsa{" "}
                    <a href="mailto:info@aomtechnology.tr?subject=2.%20el%20%C3%BCr%C3%BCn%20talebi">bize yazın</a>.
                  </p>
                </div>
              )}
            </section>
          );
        }
        const subs = m.ids === null ? cats.filter((c) => !KNOWN.has(c.id) && !isUsedCategory(c.title)) : m.ids.map((id) => cats.find((c) => c.id === id)).filter((c): c is (typeof cats)[number] => !!c);
        if (!subs.length) return null;
        const total = subs.reduce((n, c) => n + c.groups.reduce((k, g) => k + g.items.length, 0), 0);
        return (
          <section key={m.id} id={m.id} className="cat-main" aria-labelledby={`${m.id}-baslik`}>
            <h2 id={`${m.id}-baslik`} className="h2" style={{ fontSize: 28 }}>
              {m.title} <span className="store-count">{total.toLocaleString("tr-TR")} ürün</span>
            </h2>
            <ul className="cat-tiles">
              {subs.map((c) => {
                const items = c.groups.flatMap((g) => g.items);
                const img = items.find((p) => p.image)?.image;
                return (
                  <li key={c.id}>
                    <Link href={`/magaza/kategori/${c.id}`} className="cat-tile">
                      <span className="cat-tile-visual">
                        {img ? (
                          <Image src={img.src} alt="" fill sizes="(max-width: 640px) 50vw, 280px" style={{ objectFit: "contain" }} />
                        ) : (
                          <span className="cat-tile-count" aria-hidden="true">{items.length}</span>
                        )}
                      </span>
                      <span className="cat-tile-body">
                        <strong>{c.title}</strong>
                        <span>
                          {items.length.toLocaleString("tr-TR")} ürün · {c.groups.length} grup
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
              {m.codes?.map((k) => (
                <li key={k.href}>
                  <Link href={k.href} className="cat-tile cat-tile-codes">
                    <span className="cat-tile-visual">
                      <span className="cat-tile-codes-label" aria-hidden="true">
                        <span className="cat-tile-count">{k.total.toLocaleString("tr-TR")}</span>
                        <span>sipariş kodu</span>
                      </span>
                    </span>
                    <span className="cat-tile-body">
                      <strong>{k.title}</strong>
                      <span>Model koduna göre tam liste</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      </section>
    </>
  );
}
