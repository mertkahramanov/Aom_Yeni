// CNC yedek parçaları ve elektronik / mekanik ürünler (06-10-2026).
// Liste ankaracncmarket.com.tr ve cncdunyasi.com ürün yelpazesinden çıkarıldı; bu sitelerin kodları, metinleri ve fotoğrafları KULLANILMADI.
// Teknik tablo DPU / Autonics şablonu gibi kategoriye göre sabit satırlıdır (marka, orijinal kod, seri, ürün tipi, kategori satırları,
// ölçüler, ağırlık); bilinmeyen değerler boş bırakılır (Mert, 06-10-2026). Kaynak listeler: 10_ ve 11_ dosyaları.
// Her ürünün orijinal üreticisi ve parça numarası üretici siteleri, katalogları ve veri sayfalarıyla araştırıldı
// (ayrıntı ve doğrulama durumu: 10_ANKARACNCMARKET_DUZELTILMIS_KODLAR_06-10-2026.md / .csv).
// Doğrulanamayan kodlar sitede gösterilmez; ürün tanımıyla listelenir. Görseller yalnız üreticinin kendi sitesinden.
// Fiyat yok: "Teklif isteyin".
import type { Product } from "./magaza";
import raw from "./yedek-parca_06-10-2026.json";
// AC / DC sürücüler, yumuşak yol vericiler, fren üniteleri (11-10-2026): kod listesi Endelkon ve Hareket Otomasyon kategorilerinden;
// yalnız kodlar alındı, değerler üretici kod yapısından çözüldü, bilinmeyen alan boş. Ayrıntı: 14_SURUCU_INDEKS_11-10-2026.md
import raw2 from "./surucu_11-10-2026.json";
// Autonics panel/sayıcı ön lastikleri (23-10-2026): Mert'in 2026_fiyat_listesi.xlsx dosyasındaki
// "kablo/konnektör/aksesuar" kümesinde bulunan, bağımsız kaynakla model eşleşmesi doğrulanamayan ama
// liste fiyatının kendi açıklamasında ("CT FRONT RUBBER" / "MP5Y FRONT RUBBER") ürün tipi ve uyumlu
// seri açıkça yazan 2 kod. Ayrıntı: claude/AUTONICS_FIYAT_LISTESI_YENI_KATEGORILER_23-10-2026.md
import raw3 from "./autonics-yedek-parca-on-lastik_23-10-2026.json";

type Raw = {
  slug: string;
  brand: string;
  model: string;
  name: string;
  category: string;
  group: string;
  gorder: number;
  specs: [string, string][];
  source: string;
  img: { file: string; scope: "model" | "seri" } | null;
  series: string;
  opt: [string, string] | null;
  body: [string, string] | null;
};

const LOGOS: Record<string, { src: string; w: number; h: number }> = {
  Fanuc: { src: "/oem/fanuc_03-10-2026.png", w: 947, h: 160 },
  "Mitsubishi Electric": { src: "/oem/mitsubishi-electric_03-10-2026.png", w: 548, h: 160 },
  Omron: { src: "/oem/omron_03-10-2026.png", w: 509, h: 99 },
  Panasonic: { src: "/oem/panasonic_03-10-2026.png", w: 776, h: 119 },
};

// Kategori açıklaması (ürün sayfasındaki ikinci paragraf); iddia içermez.
const CAT_TEXT: Record<string, string> = {
  "CNC yedek parçaları":
    "CNC tezgâhlarında servo / iş mili sürücüleri, ana kartlar, G/Ç kartları, LCD ekranlar, tuş takımları, kablolar, konnektörler ve sistem pilleri arızada tezgâhın durmasına yol açar; doğru parça numarasıyla tedarik, değişimi hızlandırır.",
  Fanlar:
    "Fanlar pano, sürücü ve motor soğutmasında kullanılır. Seçimde dış ölçü, kalınlık, besleme gerilimi (DC veya AC), akım, devir ve yatak tipi (kaymalı, hidrolik veya rulmanlı) birlikte değerlendirilmelidir.",
  "Fan telleri ve filtreleri": "Fan telleri ve filtreleri fan kanadını korur, pano içine toz girişini azaltır; fan ölçüsüne göre seçilir.",
  "Röleler ve röle soketleri":
    "Röleler kumanda devrelerinde düşük güçlü bir sinyalle yükü anahtarlar. Seçimde bobin gerilimi (AC / DC), kontak sayısı ve akımı ile soket tipi birlikte değerlendirilmelidir.",
  "Solid state röleler (SSR)":
    "Solid state röleler (SSR) yükü mekanik kontak olmadan yarı iletkenle anahtarlar; ısıtıcı kontrolü gibi sık anahtarlama gereken uygulamalarda kullanılır. Kontrol gerilimi, yük gerilimi ve akımı ile soğutucu ihtiyacı birlikte değerlendirilmelidir.",
  "Sigortalar ve termostatlar":
    "Resetlenebilir termik sigortalar aşırı akımda devreyi açar, soğuduktan sonra butonla yeniden kurulur. Pano termostatları ve higrostatları pano içi ısıtıcı ve fanları sıcaklığa veya neme göre devreye alır.",
  "Potansiyometreler ve reostalar":
    "Potansiyometreler hız, sıcaklık veya gerilim ayarında kullanılır. Seçimde direnç değeri, güç, tur sayısı (tek, çok veya sonsuz turlu), mil tipi ve gövde ölçüsü birlikte değerlendirilmelidir.",
  Diyotlar: "Diyotlar ve köprü diyotlar AC gerilimi doğrultmak ve akım yönünü belirlemek için kullanılır; akım, ters gerilim ve gövde tipine (eksenel, tarak, kare, vidalı, modül) göre seçilir.",
  "Sviç, sensör ve butonlar":
    "Limit sviçler, endüktif sensörler, mod anahtarları ve butonlar CNC tezgâhlarında konum algılama, eksen referansı ve operatör kumandası için kullanılır.",
  "El çarkları (MPG)": "El çarkları (manuel pals üreteci, MPG) CNC tezgâhlarında eksenleri elle hassas hareket ettirmek için kullanılır; eksen sayısı, besleme gerilimi ve devir başına pals sayısına göre seçilir.",
  "Servo ve iş mili enkoderleri": "Servo motor ve iş mili enkoderleri motorun konum ve hız bilgisini sürücüye iletir; motor ve sürücü tipine uygun parça numarasıyla değiştirilmelidir.",
  "Takım bağlama ve ATC parçaları": "İş mili collet'leri (gripper), clamp / unclamp pistonları ve ATC parçaları takım bağlama ve otomatik takım değiştirme sisteminin güvenli çalışması için düzenli kontrol edilip yenilenir.",
  "Rulmanlar, kilit somunları ve yaylar": "Bilyalı vida destek rulmanları, hassas kilit somunları ve çanak yaylar iş mili ve eksen mekaniğinde ön yük ve hassasiyeti sağlar.",
  "Ölçme ve kalibrasyon": "Granit pleytler, test barları, ATC kalibrasyon mastarları ve çekme kuvveti test aparatları tezgâh hassasiyetini ve takım bağlama kuvvetini kontrol etmek için kullanılır.",
  "Veri aktarımı": "Kart okuyucular, CF / SD kartlar ve veri aktarım cihazları CNC tezgâhına program yüklemek ve yedek almak için kullanılır.",
  "Makine lambaları": "Makine aydınlatma lambaları ve üç katlı tepe lambaları tezgâh içini aydınlatır ve çalışma durumunu gösterir.",
  "Sarf malzemeleri": "Bakım ve onarımda kullanılan yapıştırıcı, gres, temizleme aparatı ve benzeri sarf malzemeleri.",
  "Güç kaynakları ve trafolar": "Anahtarlamalı DC güç kaynakları pano içindeki kumanda, sensör ve kontrol devrelerini; AC trafolar step motor sürücüleri ve kumanda devrelerini besler. Seçimde giriş / çıkış gerilimi, çıkış akımı ve güç birlikte değerlendirilmelidir.",
  "Hız kontrol cihazları (AC sürücüler)": "Hız kontrol cihazları (AC motor sürücü, inverter) asenkron motorun hızını frekansı değiştirerek ayarlar. Seçimde motor gücü, besleme gerilimi ve faz sayısı, nominal çıkış akımı ve kontrol yöntemi birlikte değerlendirilmelidir.",
  "Yumuşak yol vericiler (soft starter)": "Yumuşak yol vericiler (soft starter) asenkron motorun kalkış ve duruşunda gerilimi kademeli değiştirerek kalkış akımını ve mekanik darbeyi azaltır. Seçimde motor gücü, nominal akım, şebeke gerilimi ve kalkış sıklığı birlikte değerlendirilmelidir.",
  "Fren üniteleri ve dirençleri": "Fren üniteleri, motor yavaşlarken sürücünün DC barasında oluşan enerjiyi fren direncine aktararak aşırı gerilim hatasını önler. Seçimde sürücünün gerilim sınıfı, motor gücü ve fren çevrimi birlikte değerlendirilmelidir.",
  "Güvenlik röleleri": "Güvenlik röleleri acil stop, kapı sviçi ve ışık perdesi gibi güvenlik elemanlarını izleyerek makineyi güvenli şekilde durdurur; kategori / PL seviyesi, kontak sayısı ve besleme gerilimine göre seçilir.",
  "DC motor sürücüler": "DC motor sürücüleri DC motorun armatür gerilimini tristörlerle kontrol ederek hız ve tork ayarlar. 4 bölgeli (rejeneratif) sürücüler motoru iki yönde sürer ve frenleme enerjisini şebekeye geri verir.",
  "Spindle motorlar": "Spindle (iş mili) motorları CNC router ve işleme makinelerinde kesici takımı döndürür. Seçimde güç, maksimum devir, takım bağlama (ER pens, ISO / HSK konik), soğutma tipi ve takım değiştirme ihtiyacı birlikte değerlendirilmelidir.",
  "Step ve servo motorlar, sürücüler": "Step motorlar ve sürücüleri CNC eksenlerinde konumlamayı açık veya kapalı çevrimle (enkoderli) sağlar. Seçimde flanş ölçüsü (NEMA), tutma torku, faz akımı ve sürücünün gerilim / akım aralığı birlikte değerlendirilmelidir.",
  "Şalt ürünleri": "Kontaktörler, motor koruma şalterleri, termik röleler, otomatik sigortalar ve pako şalterler motor ve kumanda devrelerini anahtarlar ve korur. Seçimde anma akımı, motor gücü, bobin gerilimi ve ayar aralığı birlikte değerlendirilmelidir.",
  Enkoderler: "Enkoderler mil dönüşünü elektrik sinyaline çevirerek açı, konum ve hız ölçer; çözünürlük, çıkış fazı, kontrol çıkışı ve besleme gerilimine göre seçilir.",
  "CNC kontrol kartları ve panelleri": "CNC kontrol kartları ve panelleri step / servo sürücülere pals ve yön sinyali üreterek eksenleri yönetir. Seçimde eksen sayısı, arayüz (USB, Ethernet, bağımsız), giriş / çıkış sayısı ve desteklenen yazılım birlikte değerlendirilmelidir.",
  "Vakum ve toz emme": "Vakum pompaları ve toz emme hortumları CNC router tablalarında parça tutma ve talaş / toz emişi için kullanılır; güç, debi, vakum değeri ve hortum çapına göre seçilir.",
  "Lineer hareket sistemleri": "Lineer raylar ve arabalar, vidalı miller ve somunlar, uç yatakları, kaplinler, kremayer ve pinyon dişliler CNC eksenlerinde doğrusal hareketi taşır ve iletir. Seçimde boyut, mil çapı, hatve, modül ve hassasiyet birlikte değerlendirilmelidir.",
  "Güç aktarma: kasnak, dişli ve redüktör": "Triger dişli kasnaklar ve planet redüktörler motor gücünü eksenlere ve mile iletir; profil, diş sayısı, kayış genişliği, delik çapı ve çevrim oranına göre seçilir.",
  "Torna aynaları, pens ve takım tutucular": "Torna aynaları iş parçasını, ER pensler ve takım tutucular kesici takımı bağlar. Seçimde ayna çapı ve ayak sayısı, pens standardı ve bağlama aralığı birlikte değerlendirilmelidir.",
  "Yağlama sistemleri": "Merkezi yağlama pompaları kızak, vidalı mil ve rulmanları düzenli yağlayarak ömürlerini uzatır; tank hacmi, besleme gerilimi ve çalışma tipine göre seçilir.",
  "Sigma profiller": "Alüminyum sigma profiller makine gövdesi, koruma kabini ve fikstür yapımında kullanılır; kanal ölçüsü, kesit ve seriye göre seçilir.",
  // Autonics ön lastikleri (23-10-2026)
  "Autonics panel / sayıcı yedek parçaları": "Autonics CT serisi sayıcı ve MP5Y serisi panel metre gövdelerinin ön lastiği (panel contası); gösterge camının önüne takılan koruyucu lastik parçadır.",
};

// Seri sayfası başlığındaki ürün türü
const KIND: Record<string, string> = {
  "Hız kontrol cihazları (AC sürücüler)": "Hız Kontrol Cihazı",
  "Yumuşak yol vericiler (soft starter)": "Yumuşak Yol Verici",
  "Fren üniteleri ve dirençleri": "Fren Ünitesi",
  "Güvenlik röleleri": "Güvenlik Rölesi",
  "DC motor sürücüler": "DC Motor Sürücü",
  "Spindle motorlar": "Spindle Motor",
  "Step ve servo motorlar, sürücüler": "Step Motor ve Sürücü",
  "Şalt ürünleri": "Şalt Ürünü",
  "Güç kaynakları ve trafolar": "Güç Kaynağı",
  Enkoderler: "Enkoder",
  "CNC kontrol kartları ve panelleri": "CNC Kontrol Ünitesi",
  "Lineer hareket sistemleri": "Lineer Hareket Elemanı",
  "Güç aktarma: kasnak, dişli ve redüktör": "Güç Aktarma Elemanı",
  "Torna aynaları, pens ve takım tutucular": "Torna Aynası / Pens",
  "Röleler ve röle soketleri": "Röle",
  "Solid state röleler (SSR)": "Solid State Röle (SSR)",
  Fanlar: "Fan",
  "Rulmanlar, kilit somunları ve yaylar": "Rulman",
  "Vakum ve toz emme": "Vakum / Toz Emme Ürünü",
  "Sigma profiller": "Sigma Profil",
  "Autonics panel / sayıcı yedek parçaları": "Ön Lastik",
};

// Autonics ön lastik fiyatları (23-10-2026): Mert'in 2026_fiyat_listesi.xlsx dosyasından, %40 iskonto diğer
// Autonics kodlarıyla aynı şekilde uygulandı.
const ON_LASTIK_PRICES: Record<string, { list: number; currency: "USD"; discountPct: 40 }> = {
  C03D40057AB: { list: 2.2, currency: "USD", discountPct: 40 },
  C08D40091AB: { list: 2.2, currency: "USD", discountPct: 40 },
};

const SUPPORT =
  "AOM, parça numarasına göre tedarik ve muadil araştırmasında, pano ve tezgâh uygulamasında destek verir. Türkiye'nin her şehrinden teklif taleplerinizi iletebilirsiniz.";

// Schneider Electric fiyatlandırması (17-10-2026, Mert onayı: "Evet, uygula").
// Kaynak: se.com/tr liste fiyatları (EUR, 17-10-2026) ve claude/SCHNEIDER_FIYATLANDIRMA_PLANI_17-10-2026.md.
// İskonto: Altivar ATV310/ATV320/ATV340 sürücüler %45, ATS01/ATS22 yumuşak yol vericiler %55 (Mert kararı).
// ÖNEMLİ: listEur ve discountPct yalnız dahili kayıt/doğrulama amaçlıdır — sitede YALNIZ netEur (KDV hariç
// net satış fiyatı) gösterilir; bu yüzden build() aşağıda Product.price'a discountPct YAZMAZ (yalnız
// { list: netEur, currency: "EUR" }), çünkü mevcut priceInfo()/StoreCard, discountPct set edilirse liste
// fiyatını ve indirim yüzdesini de kamuya açık gösterir (ör. Autonics DPU3'te olduğu gibi) — Mert'in
// "Liste fiyatı ve iskonto oranı sitede gösterilmesin, yalnız net satış fiyatı" kararına aykırı olurdu.
const SCHNEIDER_PRICE_DATE = "17-10-2026";
const SCHNEIDER_PRICES: Record<string, { listEur: number; discountPct: number; netEur: number; leadTime: string }> = {
  ATS22D32Q: { listEur: 1169.0, discountPct: 55, netEur: 526.05, leadTime: "3-5 iş günü" },
  ATS22D17Q: { listEur: 1072.0, discountPct: 55, netEur: 482.4, leadTime: "3-5 iş günü" },
  ATS22D47Q: { listEur: 1231.0, discountPct: 55, netEur: 553.95, leadTime: "3-5 iş günü" },
  ATS22D62Q: { listEur: 1602.0, discountPct: 55, netEur: 720.9, leadTime: "3-5 iş günü" },
  ATS22D75Q: { listEur: 1659.0, discountPct: 55, netEur: 746.55, leadTime: "3-5 iş günü" },
  ATS22D88Q: { listEur: 1801.0, discountPct: 55, netEur: 810.45, leadTime: "3-5 iş günü" },
  ATS22C11Q: { listEur: 2440.0, discountPct: 55, netEur: 1098.0, leadTime: "3-5 iş günü" },
  ATS22C14Q: { listEur: 3023.0, discountPct: 55, netEur: 1360.35, leadTime: "3-5 iş günü" },
  ATS01N222QN: { listEur: 345.0, discountPct: 55, netEur: 155.25, leadTime: "3-5 iş günü" },
  ATS01N232QN: { listEur: 432.0, discountPct: 55, netEur: 194.4, leadTime: "3-5 iş günü" },
  ATV310H075N4E: { listEur: 476.0, discountPct: 45, netEur: 261.8, leadTime: "3-5 iş günü" },
  ATV310HU55N4E: { listEur: 855.0, discountPct: 45, netEur: 470.25, leadTime: "3-5 iş günü" },
  ATV310HU75N4E: { listEur: 1043.0, discountPct: 45, netEur: 573.65, leadTime: "3-5 iş günü" },
  ATV310HD11N4E: { listEur: 1287.0, discountPct: 45, netEur: 707.85, leadTime: "3-5 iş günü" },
  ATV320U06N4B: { listEur: 830.0, discountPct: 45, netEur: 456.5, leadTime: "3-5 iş günü" },
  ATV320U07N4B: { listEur: 867.0, discountPct: 45, netEur: 476.85, leadTime: "3-5 iş günü" },
  ATV320U15M2C: { listEur: 664.0, discountPct: 45, netEur: 365.2, leadTime: "3-5 iş günü" },
  ATV320U30N4B: { listEur: 1131.0, discountPct: 45, netEur: 622.05, leadTime: "3-5 iş günü" },
  ATV320D11N4B: { listEur: 2277.0, discountPct: 45, netEur: 1252.35, leadTime: "3-5 iş günü" },
  ATV320D15N4B: { listEur: 2848.0, discountPct: 45, netEur: 1566.4, leadTime: "3-5 iş günü" },
  ATV340U55N4: { listEur: 1626.0, discountPct: 45, netEur: 894.3, leadTime: "3-5 iş günü" },
  ATV340D18N4E: { listEur: 4176.0, discountPct: 45, netEur: 2296.8, leadTime: "3-5 iş günü" },
};

const lc = (t: string) => (/^[A-ZÇĞİÖŞÜ][a-zçğıöşü]/.test(t) ? t[0].toLocaleLowerCase("tr-TR") + t.slice(1) : t);

function build(r: Raw): Product {
  const code = r.specs.find(([l]) => l === "Orijinal kod")?.[1];
  const full = r.brand ? `${r.brand} ${r.model}` : r.model;
  const facts = r.specs.filter(([l, v]) => v && !["Marka", "Orijinal kod", "Kod", "Diğer geçerli kodlar", "Seri", "Ürün tipi"].includes(l)).slice(0, 3);
  const factLine = facts.map(([l, v]) => `${l.toLocaleLowerCase("tr-TR")}: ${v}`).join("; ");
  const alts = r.specs.find(([l]) => l === "Diğer geçerli kodlar")?.[1] || undefined;
  const logo = LOGOS[r.brand];
  // Ürün sayfasında başlığın (marka + kod) altındaki satır: ad başlığı tekrar ediyorsa yalnız tanım kısmı
  let lead = r.name;
  for (const pre of [full, r.model]) if (pre && lead.toLocaleLowerCase("tr-TR").startsWith(pre.toLocaleLowerCase("tr-TR"))) lead = lead.slice(pre.length).replace(/^[\s,;:–-]+/, "");
  if (!lead) lead = r.group && r.group !== "Diğer" ? `${r.category} · ${r.group}` : r.category;
  lead = lead[0].toLocaleUpperCase("tr-TR") + lead.slice(1);
  const schn = r.brand === "Schneider Electric" ? SCHNEIDER_PRICES[r.model] : undefined;
  return {
    slug: r.slug,
    brand: r.brand,
    brandLogo: logo,
    model: r.model,
    name: lead,
    category: r.category,
    summary: [factLine ? `Özellikler: ${factLine}.` : "", alts ? `Diğer geçerli kodlar: ${alts}.` : "", !factLine && !alts ? "Parça numarası veya ürün etiketi bilgisiyle teklif isteyebilirsiniz." : ""].filter(Boolean).join(" "),
    price: schn ? { list: schn.netEur, currency: "EUR" } : ON_LASTIK_PRICES[r.model], // yalnız net fiyat (bkz. SCHNEIDER_PRICES yorumu); liste/iskonto kamuya kapalı
    leadTime: schn?.leadTime,
    image: r.img ? { src: `/magaza/${r.img.file}`, alt: r.name } : undefined,
    imageNote: r.img?.scope === "seri" ? "Fotoğraf, üreticinin bu seri için yayınladığı görseldir." : undefined,
    specs: r.specs.map(([label, value]) => ({ label, value })),
    source: r.source ? { label: "Üretici sayfası", url: r.source } : undefined,
    specNote: `Teknik bilgiler üretici katalog ve veri sayfalarından ve ürün kodundan derlenmiştir; sipariş öncesi kodu ürün etiketiyle birlikte teyit ederiz.${schn ? ` Fiyat kaynağı: se.com/tr (${SCHNEIDER_PRICE_DATE}).` : ""}`,
    groupTitle: r.group,
    series: r.series || undefined,
    kindLabel: KIND[r.category] ?? "Ürün",
    option: r.opt?.[1],
    optionLabel: r.opt?.[0],
    bodySize: r.body?.[1],
    bodyLabel: r.body?.[0],
    groupOrder: 1000 + r.gorder,
    seoTitle: full.length > 52 ? full.slice(0, 52).replace(/[ ,;(]+[^ ,;(]*$/, "") : full,
    metaDescription: `${r.name}.${factLine ? " " + factLine + "." : ""}`.slice(0, 260),
    seoText: [`${r.name}.${factLine ? ` Özellikler: ${factLine}.` : ""}`, CAT_TEXT[r.category] ?? "", SUPPORT].filter(Boolean),
    keywords: [
      ...(code ? [code, r.brand ? `${r.brand} ${code}` : code, `${code} fiyat`] : [r.model]),
      ...(alts ? alts.split(", ") : []),
      lc(r.category),
      ...(r.brand ? [r.brand] : []),
    ],
  };
}

export const yedekParcaProducts: Product[] = [...(raw as unknown as Raw[]), ...(raw2 as unknown as Raw[]), ...(raw3 as unknown as Raw[])].map(build);
export const YEDEK_CAT_TEXT = CAT_TEXT;
