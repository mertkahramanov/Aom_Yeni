// Yaskawa Servo Sistemler — Faz 3 (20-10-2026): lineer servo motorlar (SGLFW2, SGLG) ve
// Sigma-X servo sürücüleri (SGDXS, SGDXW, SGDXT) + MP3000iec Serisi makina kontrolörü.
// Kaynak: Web Sitesi projesi, urun-verisi/yaskawa-servo-findings_18-10-2026.md (yaskawa.com.tr,
// canlı taramayla derlendi) — SGLFW2 (10), SGLG (11), SGDXW (3), SGDXT (2) ve MP3000iec (1) için
// bu dosyada seride yer alan TÜM kayıtlar listelenir (findings dosyasında zaten tam liste vardı).
// SGDXS (58) için tam liste findings'te yalnızca 6 temsili örnekle verilmişti; bu Faz 3 görevinde
// yaskawa.com.tr'nin canlı sitesinden (built-in browser, /___products arka plan API'siyle dolan
// ürün ızgarası) TÜM 58 kayıt tek tek okunup doğrulandı (20-10-2026).
// Sipariş kodu/fiyat Yaskawa'nın sitesinde yayınlanmıyor; "Teklif isteyin" gösterilir.
// AOM, Yaskawa'nın yetkili satıcısı/distribütörü olduğunu iddia etmez; bu doğrulanmamıştır.
import type { Product } from "./magaza";
import raw from "./yaskawa-servo-lineer-sigmax-surucu_20-10-2026.json";

export type SvGroup = {
  key: string;
  slug: string;
  title: string;
  note: string;
  cols: string[];
  codes: (string | number)[][]; // [kod, üretimden kalktı (0/1), ...sütun değerleri]
  specs: [string, string][];
  rep: { model: string | null; rows: [string, string][] };
  img: string | null;
  imgSize: [number, number] | null;
};

export const SV_LINEER_SGX_SERIES = (raw as unknown as { groups: SvGroup[] }).groups;
export const SV_LINEER_SGX_TOTAL = SV_LINEER_SGX_SERIES.reduce((n, g) => n + g.codes.length, 0);
export const svGroup = (slug: string) => SV_LINEER_SGX_SERIES.find((g) => g.slug === slug);

// Kod sayfası (tam liste) yalnızca büyük seriler için anlamlıdır; küçük seriler ürün sayfasında
// repTable ile doğrudan gösterilir (bkz. build()).
const CODE_PAGE_THRESHOLD = 20;

// Kategori ve kısa açıklama, grup anahtarına göre (JSON'da tutulmuyor; bu dosyaya özgü).
type GroupMeta = { category: string; brandSuffix: string; kindLabel: string; seriesIntro: string; productSlug: string };
const META: Record<string, GroupMeta> = {
  SGLFW2: {
    category: "Servo Motor ve Sürücüler",
    brandSuffix: "lineer-servo-motor",
    kindLabel: "Lineer Servo Motor",
    seriesIntro:
      "SGLFW2, Yaskawa'nın Moving Coil (hareketli bobin) tipi lineer servo motor serisidir; sabit mıknatıslı manyetik yol (magnetic way) üzerinde doğrudan doğrusal hareket üretir, dişli veya kayış-kasnak gibi mekanik aktarma elemanlarına ihtiyaç duymaz. Yüksek hız, yüksek ivme ve yüksek konumlama hassasiyeti gerektiren otomasyon uygulamaları için tasarlanmıştır.",
    productSlug: "yaskawa-sglfw2-lineer-servo-motor",
  },
  SGLG: {
    category: "Servo Motor ve Sürücüler",
    brandSuffix: "lineer-servo-motor",
    kindLabel: "Lineer Servo Motor",
    seriesIntro:
      "SGLG, Yaskawa'nın Moving Coil tipi lineer servo motor serisidir; sabit mıknatıslı manyetik yol ile birlikte kullanılır. SGLFW2'ye göre daha küçük kuvvet ve ölçü aralığında, kompakt otomasyon uygulamaları için tasarlanmıştır.",
    productSlug: "yaskawa-sglg-lineer-servo-motor",
  },
  SGDXS: {
    category: "Servo Motor ve Sürücüler",
    brandSuffix: "servo-surucu",
    kindLabel: "Sigma-X Tek Eksenli Servo Sürücü",
    seriesIntro:
      "SGDXS, Yaskawa'nın iCube Mechatronics konseptinin parçası olan Sigma-X tek eksenli (single-axis) servo sürücüsüdür. 3,5 kHz bant genişliği, dünya çapında titreşim bastırma, dalgalanma ve sürtünme telafisi, gelişmiş otomatik ayar ve ayarsız devreye alma sunar; Yaskawa'nın rotary, lineer ve doğrudan tahrik servo motorlarının tamamını destekler.",
    productSlug: "yaskawa-sgdxs-sigma-x-tek-eksenli-servo-surucu",
  },
  SGDXW: {
    category: "Servo Motor ve Sürücüler",
    brandSuffix: "servo-surucu",
    kindLabel: "Sigma-X Çift Eksenli Servo Sürücü",
    seriesIntro:
      "SGDXW, Sigma-X çift eksenli (double-axis) servo sürücüsüdür; tek gövdede iki ekseni sürerek pano içinde yer kazandırır. Yalnızca EtherCAT haberleşmesiyle sunulur.",
    productSlug: "yaskawa-sgdxw-sigma-x-cift-eksenli-servo-surucu",
  },
  SGDXT: {
    category: "Servo Motor ve Sürücüler",
    brandSuffix: "servo-surucu",
    kindLabel: "Sigma-X Üç Eksenli Servo Sürücü",
    seriesIntro:
      "SGDXT, Sigma-X üç eksenli (triple-axis) servo sürücüsüdür; tek gövdede üç ekseni sürerek pano içinde daha da fazla yer kazandırır. Yalnızca EtherCAT haberleşmesiyle sunulur.",
    productSlug: "yaskawa-sgdxt-sigma-x-uc-eksenli-servo-surucu",
  },
  MP3000iec: {
    category: "Servo Motor ve Sürücüler",
    brandSuffix: "makina-kontroloru",
    kindLabel: "Makina Kontrolörü",
    seriesIntro:
      "MP3000iec Serisi, geniş uygulama yelpazesinde kullanım ve performansı artıran bir makina (motion) kontrolörüdür. Üretici sitesinde kontrol edilebilir eksen sayısı 4, 8, 20, 32 veya 62 olan varyantlarla tek bir katalog kaydı olarak listelenir; 52 MB'a kadar kullanıcı belleği ve 1 GHz'e kadar CPU hızı sunar.",
    productSlug: "yaskawa-mp3000iec-makina-kontroloru",
  },
};

function build(g: SvGroup): Product {
  const n = g.codes.length;
  const disc = g.codes.filter((c) => c[1] === 1).length;
  const meta = META[g.key];
  const useCodePage = n > CODE_PAGE_THRESHOLD;
  const image = g.img ? { src: `/magaza/${g.img}`, alt: `Yaskawa ${g.key} ${meta.kindLabel.toLocaleLowerCase("tr-TR")} (temsili görsel)` } : undefined;
  const repTable = useCodePage
    ? g.rep.model && g.rep.rows.length
      ? { model: g.rep.model, rows: g.rep.rows.map(([label, value]) => ({ label, value })) }
      : undefined
    : {
        // Küçük seriler: kod sayfası yerine serinin TAMAMI doğrudan ürün sayfasında.
        model: `${g.key} serisi — ${n} model`,
        rows: g.codes.map((row) => ({
          label: String(row[0]),
          value: row
            .slice(2)
            .map((v, i) => `${g.cols[i]}: ${v}`)
            .join(" · "),
        })),
      };
  return {
    slug: meta.productSlug,
    brand: "Yaskawa",
    brandLogo: { src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160 },
    model: g.key,
    name: `${meta.kindLabel}${n > 1 ? `, ${n} model` : ""}`,
    category: meta.category,
    summary: `${g.note} Seride ${n} model vardır${disc ? ` (${disc} model üretimden kalkmış)` : ""}.`,
    image,
    specs: g.specs.map(([label, value]) => ({ label, value })),
    source: { label: "Yaskawa ürün sayfası", url: "https://www.yaskawa.com.tr/servo-motor-ve-surucu" },
    specNote: "Teknik veriler Yaskawa'nın resmi Türkiye ürün sayfasından (yaskawa.com.tr) alınmıştır. Sipariş kodu üreticinin sitesinde yayınlanmamaktadır; güncel kod, teslim süresi ve fiyat için teklif isteyin.",
    seriesIntro: meta.seriesIntro,
    kindLabel: meta.kindLabel,
    // 20-10-2026 (ana oturum): kategori sayfasında anlamlı grup başlığı (category'den ayrı tutulur)
    groupTitle:
      meta.brandSuffix === "lineer-servo-motor" ? "Lineer Servo Motor" : meta.brandSuffix === "makina-kontroloru" ? "Makina Kontrolörü (MP3000iec)" : "Sigma-X Servo Sürücü",
    groupOrder: meta.brandSuffix === "lineer-servo-motor" ? 50 : meta.brandSuffix === "makina-kontroloru" ? 70 : 60,
    repTable,
    codePage: useCodePage ? { href: `/magaza/servo-lineer-sigmax-kodlari/${g.slug}`, count: n, discontinued: disc } : undefined,
    seoText: [
      meta.seriesIntro,
      `AOM, servo motor ve sürücü seçimi, devreye alma ve entegrasyon desteği verir. ${g.key} için güncel fiyat ve teslim süresi teklif üzerine bildirilir; Ankara'dan Türkiye'nin her şehrine gönderim yapılır.`,
    ],
    keywords: [`Yaskawa ${g.key}`, "Yaskawa servo", meta.category, "Yaskawa Türkiye", "servo motor fiyat", "Yaskawa servo Ankara"],
    seoTitle: `Yaskawa ${g.key} ${meta.kindLabel}`,
    metaDescription: `Yaskawa ${g.key}: ${meta.kindLabel.toLocaleLowerCase("tr-TR")}, ${n} model. Teklif için Ankara merkezli AOM ile iletişime geçin.`,
  };
}

export const yaskawaServoLineerSigmaxProducts: Product[] = SV_LINEER_SGX_SERIES.map(build);
