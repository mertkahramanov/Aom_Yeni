import { NextRequest, NextResponse } from "next/server";
import { fullName, products } from "@/data/magaza";
import { DPU_GROUPS } from "@/data/dpuCodes";
import { ENC_SERIES, encLabel } from "@/data/enkoder";
import { KONTROL_KOD_SERIES } from "@/data/kontrol";
import { hasLocaleVersion } from "@/lib/seo";
import { isLocale } from "@/i18n/locales";
// 21-11-2026: Autonics 23-10 kod setleri ve Yaskawa sipariş kodları da aranabilir oldu
// (önceden yalnızca ürünler, DPU, enkoder ve kontrol kodları indekslenmişti).
import { KONTROL_SINYAL_KOD_SERIES } from "@/data/autonics-kontrol-sinyal_23-10-2026";
import { SINYAL_LAMBASI_KOD_SERIES } from "@/data/autonics-kuyruk-sinyal-lambasi_23-10-2026";
import { BASINC_SENSOR_KOD_SERIES } from "@/data/autonics-basinc-sensor_23-10-2026";
import { YAKINLIK_SENSOR_KOD_SERIES } from "@/data/autonics-yakinlik-sensor_23-10-2026";
import { FOTOELEKTRIK_SENSOR_KOD_SERIES } from "@/data/autonics-fotoelektrik-sensor_23-10-2026";
import { VISION_SENSOR_KOD_SERIES } from "@/data/autonics-vision-sensor_23-10-2026";
import { GUVENLIK_SWITCH_KOD_SERIES } from "@/data/autonics-guvenlik-switch_23-10-2026";
import { STEP_MOTOR_KOD_SERIES } from "@/data/autonics-step-motor_23-10-2026";
import { AI_MOTOR_KOD_SERIES } from "@/data/autonics-kuyruk-ai-motor_23-10-2026";
import { KABLO_AKSESUAR_KOD_SERIES } from "@/data/autonics-kablo-aksesuar_23-10-2026";
import { SINYAL_DONUSTURUCU_KOD_SERIES } from "@/data/autonics-sinyal-donusturucu_23-10-2026";
import { AC_GENEL_SERIES } from "@/data/yaskawa-ac-genel-kompakt";
import { AC_OZEL_SERIES } from "@/data/yaskawa-ac-ozel-uygulama";
import { AC_REJENERATIF_SERIES } from "@/data/yaskawa-ac-rejeneratif";
import { KN_PLC_SERIES } from "@/data/yaskawa-kontrol-plc";
import { SV_DD_SERIES } from "@/data/yaskawa-servo-dogrudan-tahrik";
import { SV_LINEER_SGX_SERIES } from "@/data/yaskawa-servo-lineer-sigmax-surucu";
import { SV_S7MOTOR_SERIES } from "@/data/yaskawa-servo-sigma7-motor";
import { SV_S7SURUCU_SERIES } from "@/data/yaskawa-servo-sigma7-surucu";
import { SV_SXMOTOR_SERIES } from "@/data/yaskawa-servo-sigmax-motor";

// Site içi arama (14-10-2026): ürün kodu / model adıyla arama, eşleşen sayfaya (ve kod
// sayfalarında doğrudan ilgili satıra #kod çapa bağlantısıyla) yönlendirir.
//
// İndeks, modül yüklenirken (soğuk başlatmada) BİR KEZ kurulur — ~12 bin sipariş kodu +
// tüm mağaza ürünleri (~birkaç bin kayıt) RAM'de küçük bir dizi olarak tutulur, her istek
// bunun üzerinde basit bir string taraması yapar (veritabanı gerekmez, bu veri hacminde
// birkaç milisaniye sürer).

type Hit = {
  code: string; // eşleşen kod/model metni
  label: string; // gösterilecek açıklama
  href: string; // /magaza/... (kod sayfalarında #kod çapalı)
  group: string; // aynı sayfaya düşen çok sayıda kodu tek satırda toplamak için anahtar
  groupLabel: string; // toplu satırda gösterilecek grup adı
  codeU: string; // büyük harfe çevrilmiş kod (indekste bir kez hesaplanır)
  labelU: string; // büyük harfe çevrilmiş etiket
};

type CodeSeries = { slug: string; title?: string; key?: string; codes: (string | number)[][] };

// Kod sayfası dizini + marka + seri listesi (sayfa yolu /magaza/<dir>/<slug>#<kod>)
const CODE_SETS: [string, string, CodeSeries[]][] = [
  ["kontrol-sinyal-kodlari", "Autonics", KONTROL_SINYAL_KOD_SERIES],
  ["sinyal-lambasi-kodlari", "Autonics", SINYAL_LAMBASI_KOD_SERIES],
  ["basinc-sensoru-kodlari", "Autonics", BASINC_SENSOR_KOD_SERIES],
  ["yakinlik-sensoru-kodlari", "Autonics", YAKINLIK_SENSOR_KOD_SERIES],
  ["fotoelektrik-sensor-kodlari", "Autonics", FOTOELEKTRIK_SENSOR_KOD_SERIES],
  ["vision-sensor-kodlari", "Autonics", VISION_SENSOR_KOD_SERIES],
  ["guvenlik-switch-kodlari", "Autonics", GUVENLIK_SWITCH_KOD_SERIES],
  ["step-motor-kodlari", "Autonics", STEP_MOTOR_KOD_SERIES],
  ["kapali-cevrim-adim-motor-kodlari", "Autonics", AI_MOTOR_KOD_SERIES],
  ["kablo-aksesuar-kodlari", "Autonics", KABLO_AKSESUAR_KOD_SERIES],
  ["sinyal-donusturucu-kodlari", "Autonics", SINYAL_DONUSTURUCU_KOD_SERIES],
  ["ac-surucu-genel-kodlari", "Yaskawa", AC_GENEL_SERIES],
  ["ac-surucu-ozel-kodlari", "Yaskawa", AC_OZEL_SERIES],
  ["ac-surucu-rejeneratif-kodlari", "Yaskawa", AC_REJENERATIF_SERIES],
  ["kontrol-plc-kodlari", "Yaskawa", KN_PLC_SERIES],
  ["servo-dogrudan-tahrik-kodlari", "Yaskawa", SV_DD_SERIES],
  ["servo-lineer-sigmax-kodlari", "Yaskawa", SV_LINEER_SGX_SERIES],
  ["servo-sigma7-motor-kodlari", "Yaskawa", SV_S7MOTOR_SERIES],
  ["servo-sigma7-surucu-kodlari", "Yaskawa", SV_S7SURUCU_SERIES],
  ["servo-sigmax-motor-kodlari", "Yaskawa", SV_SXMOTOR_SERIES],
];

const up = (s: string) => s.toLocaleUpperCase("tr-TR");

type RawHit = Omit<Hit, "codeU" | "labelU">;

function buildIndex(): Hit[] {
  const idx: RawHit[] = [];

  for (const p of products) {
    idx.push({
      code: p.model,
      label: `${fullName(p)} — ${p.category}${p.used ? " · 2. el" : ""}`,
      href: `/magaza/${p.slug}`,
      group: `/magaza/${p.slug}`,
      groupLabel: fullName(p),
    });
  }

  for (const g of DPU_GROUPS) {
    const pageHref = `/magaza/dpu-kodlari/${g.id}`;
    for (const c of g.codes) {
      idx.push({
        code: c.code,
        label: `Autonics ${c.code} — ${g.label}`,
        href: `${pageHref}#${c.code}`,
        group: pageHref,
        groupLabel: `Autonics ${g.prefix} (${g.label})`,
      });
    }
  }

  for (const s of ENC_SERIES) {
    const pageHref = `/magaza/enkoder-kodlari/${s.slug}`;
    const label = encLabel(s);
    for (const row of s.codes) {
      const code = String(row[0]);
      idx.push({
        code,
        label: `Autonics ${code} — ${label} enkoder`,
        href: `${pageHref}#${code}`,
        group: pageHref,
        groupLabel: `Autonics ${label} enkoder`,
      });
    }
  }

  for (const s of KONTROL_KOD_SERIES) {
    const pageHref = `/magaza/kontrol-kodlari/${s.slug}`;
    for (const row of s.codes) {
      const code = String(row[0]);
      idx.push({
        code,
        label: `Autonics ${code} — ${s.key}`,
        href: `${pageHref}#${code}`,
        group: pageHref,
        groupLabel: `Autonics ${s.key}`,
      });
    }
  }

  for (const [dir, brand, seriesList] of CODE_SETS) {
    for (const s of seriesList) {
      const pageHref = `/magaza/${dir}/${s.slug}`;
      const name = s.title || s.key || s.slug;
      for (const row of s.codes) {
        const code = String(row[0]);
        idx.push({
          code,
          label: `${brand} ${code} — ${name}`,
          href: `${pageHref}#${code}`,
          group: pageHref,
          groupLabel: `${brand} ${name}`,
        });
      }
    }
  }

  // 21-11-2026: büyük harf dönüşümü her istekte tüm indeks için tekrarlanıyordu; artık bir kez yapılır.
  return idx.map((h) => ({ ...h, codeU: up(h.code), labelU: up(h.label) }));
}

const INDEX = buildIndex();

// Sorgu uzunluk sınırı (21-11-2026): ürün kodları kısa; çok uzun sorgular yalnızca CPU harcar.
const MAX_Q = 64;

// Çok dilli sayfalardan gelen aramada sonuç linki o dilin sayfasına gider (karşılığı varsa).
function localize(href: string, locale: string | null): string {
  if (!locale || !isLocale(locale)) return href;
  const path = href.split("#")[0];
  return hasLocaleVersion(path) ? `/${locale}${href}` : href;
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").trim().slice(0, MAX_Q);
  const locale = req.nextUrl.searchParams.get("locale");
  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }
  const qU = up(q);

  type Scored = Hit & { score: number };
  const matches: Scored[] = [];
  for (const h of INDEX) {
    const codeU = h.codeU;
    let score: number;
    if (codeU === qU) score = 0; // birebir kod eşleşmesi
    else if (codeU.startsWith(qU)) score = 1;
    else if (codeU.includes(qU)) score = 2;
    else if (h.labelU.includes(qU)) score = 3;
    else continue;
    matches.push({ ...h, score });
    if (matches.length >= 4000) break; // çok genel sorgularda taramayı sınırla
  }

  matches.sort((a, b) => a.score - b.score || a.code.localeCompare(b.code, "tr"));

  // Aynı sayfaya düşen çok sayıda kodu (ör. "DPU34" araması 90+ kod) tek satırda topla.
  const byGroup = new Map<string, Scored[]>();
  for (const m of matches) {
    const arr = byGroup.get(m.group) ?? [];
    arr.push(m);
    byGroup.set(m.group, arr);
  }

  const COLLAPSE_AT = 4;
  const out: { code: string; label: string; href: string }[] = [];
  const seenGroups = new Set<string>();
  for (const m of matches) {
    if (out.length >= 15) break;
    if (seenGroups.has(m.group)) continue;
    const groupHits = byGroup.get(m.group)!;
    if (groupHits.length > COLLAPSE_AT) {
      seenGroups.add(m.group);
      out.push({
        code: `${groupHits.length} kod`,
        label: `${m.groupLabel} — "${q}" ile eşleşen ${groupHits.length} kod`,
        href: localize(m.group, locale),
      });
    } else {
      out.push({ code: m.code, label: m.label, href: localize(m.href, locale) });
      // Aynı sayfadaki diğer birkaç eşleşme (≤ COLLAPSE_AT) ayrı satır olarak kalsın,
      // yalnız tekrarını önlemek için grup setine ekleme — bilerek atlanıyor.
    }
  }

  return NextResponse.json({ results: out });
}
