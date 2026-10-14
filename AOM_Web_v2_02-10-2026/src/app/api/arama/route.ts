import { NextRequest, NextResponse } from "next/server";
import { fullName, products } from "@/data/magaza";
import { DPU_GROUPS } from "@/data/dpuCodes";
import { ENC_SERIES, encLabel } from "@/data/enkoder";
import { KONTROL_KOD_SERIES } from "@/data/kontrol";

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
};

function buildIndex(): Hit[] {
  const idx: Hit[] = [];

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

  return idx;
}

const INDEX = buildIndex();

const up = (s: string) => s.toLocaleUpperCase("tr-TR");

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").trim();
  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }
  const qU = up(q);

  type Scored = Hit & { score: number };
  const matches: Scored[] = [];
  for (const h of INDEX) {
    const codeU = up(h.code);
    let score: number;
    if (codeU === qU) score = 0; // birebir kod eşleşmesi
    else if (codeU.startsWith(qU)) score = 1;
    else if (codeU.includes(qU)) score = 2;
    else if (up(h.label).includes(qU)) score = 3;
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
        href: m.group,
      });
    } else {
      out.push({ code: m.code, label: m.label, href: m.href });
      // Aynı sayfadaki diğer birkaç eşleşme (≤ COLLAPSE_AT) ayrı satır olarak kalsın,
      // yalnız tekrarını önlemek için grup setine ekleme — bilerek atlanıyor.
    }
  }

  return NextResponse.json({ results: out });
}
