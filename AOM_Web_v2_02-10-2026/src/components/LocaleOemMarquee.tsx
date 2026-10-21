import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionary";

// OemMarquee.tsx'in çok dilli karşılığı (18-10-2026). Marka listesi/logoları ve kayan şerit
// mantığı AYNI kalır; yalnızca başlık ve aria-label'lar çevrilir. Marka sayfaları
// (/magaza/marka/<slug>) henüz çevrilmedi, bağlantılar şimdilik Türkçe mağazaya işaret eder.
type Brand = { name: string; slug: string; src: string; w: number; h: number; dw: number; dh: number; svg?: boolean };

const brands: Brand[] = [
  { name: "Yaskawa", slug: "yaskawa", src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160, dw: 125, dh: 32 },
  { name: "Fanuc", slug: "fanuc", src: "/oem/fanuc_03-10-2026.png", w: 947, h: 160, dw: 136, dh: 23 },
  // 21-10-2026 (Mert talebi): Mert'in yeniden gönderdiği güncel ABB logosuyla değiştirildi.
  { name: "ABB", slug: "abb", src: "/oem/abb_21-10-2026.png", w: 1352, h: 580, dw: 94, dh: 40 },
  { name: "Siemens", slug: "siemens", src: "/oem/siemens_03-10-2026.png", w: 376, h: 60, dw: 136, dh: 22 },
  { name: "Mitsubishi Electric", slug: "mitsubishi-electric", src: "/oem/mitsubishi-electric_03-10-2026.png", w: 548, h: 160, dw: 117, dh: 34 },
  { name: "Omron", slug: "omron", src: "/oem/omron_03-10-2026.png", w: 509, h: 99, dw: 136, dh: 26 },
  { name: "Pilz", slug: "pilz", src: "/oem/pilz_03-10-2026.png", w: 396, h: 149, dw: 103, dh: 39 },
  { name: "Leuze", slug: "leuze", src: "/oem/leuze_03-10-2026.png", w: 381, h: 115, dw: 115, dh: 35 },
  // 21-10-2026 eklendi (Mert talebi): Balluff, arka planı temizlenmiş şeffaf PNG.
  { name: "Balluff", slug: "balluff", src: "/oem/balluff_21-10-2026.png", w: 908, h: 216, dw: 97, dh: 23 },
  { name: "Banner", slug: "banner", src: "/oem/banner_03-10-2026.png", w: 283, h: 61, dw: 136, dh: 29 },
  { name: "Autonics", slug: "autonics", src: "/oem/autonics_03-10-2026.png", w: 746, h: 160, dw: 136, dh: 29 },
  { name: "Schneider Electric", slug: "schneider-electric", src: "/oem/schneider-electric_03-10-2026.png", w: 388, h: 160, dw: 98, dh: 41 },
  { name: "Delta", slug: "delta", src: "/oem/delta_03-10-2026.png", w: 520, h: 160, dw: 114, dh: 35 },
  { name: "Panasonic", slug: "panasonic", src: "/oem/panasonic_03-10-2026.png", w: 776, h: 119, dw: 136, dh: 21 },
  { name: "Gefran", slug: "gefran", src: "/oem/gefran_11-10-2026.svg", w: 160, h: 37, dw: 112, dh: 26, svg: true },
];

function Logo({ b, hidden }: { b: Brand; hidden?: boolean }) {
  const alt = hidden ? "" : b.name;
  if (b.svg) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={b.src} alt={alt} width={b.w} height={b.h} style={{ width: b.dw, height: b.dh }} />;
  }
  return <Image src={b.src} alt={alt} width={b.w} height={b.h} style={{ width: b.dw, height: b.dh }} />;
}

function Group({ hidden, ariaSuffix }: { hidden?: boolean; ariaSuffix: string }) {
  return (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {brands.map((b) => (
        <li key={b.name} className="logo-tile">
          {hidden ? (
            <Logo b={b} hidden />
          ) : (
            <Link href={`/magaza/marka/${b.slug}`} aria-label={`${b.name} ${ariaSuffix}`}>
              <Logo b={b} />
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function LocaleOemMarquee({ dict }: { dict: Dictionary }) {
  return (
    <section className="oem-strip" aria-labelledby="oem-markalar-baslik">
      <div className="container oem-strip-head">
        <h2 id="oem-markalar-baslik" className="eyebrow">
          {dict.oem.heading}
        </h2>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          <Group ariaSuffix={dict.oem.ariaSuffix} />
          <Group hidden ariaSuffix={dict.oem.ariaSuffix} />
        </div>
      </div>
    </section>
  );
}
