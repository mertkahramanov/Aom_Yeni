import Image from "next/image";

// OEM markaları: AOM_Web_Sitesi_Icerik_Ozeti_02-10-2026.md, bölüm 7.
// Logolar: AOM Media/Marka Logoları (Siemens: eski site). Hepsi kırpılmış, şeffaf zeminli PNG.
// dw/dh: ekrandaki boyut. Oran korunur; her logo aynı görsel ağırlıkta olacak şekilde
// eşit alana göre ölçeklenir (en fazla 136 x 44 px).
// Logo kullanım izinleri yayın öncesi teyit edilecek.
type Brand = { name: string; src: string; w: number; h: number; dw: number; dh: number };

const brands: Brand[] = [
  { name: "Yaskawa", src: "/oem/yaskawa_03-10-2026.png", w: 626, h: 160, dw: 125, dh: 32 },
  { name: "Fanuc", src: "/oem/fanuc_03-10-2026.png", w: 947, h: 160, dw: 136, dh: 23 },
  { name: "ABB", src: "/oem/abb_03-10-2026.png", w: 319, h: 129, dw: 99, dh: 40 },
  { name: "Siemens", src: "/oem/siemens_03-10-2026.png", w: 376, h: 60, dw: 136, dh: 22 },
  { name: "Mitsubishi Electric", src: "/oem/mitsubishi-electric_03-10-2026.png", w: 548, h: 160, dw: 117, dh: 34 },
  { name: "Omron", src: "/oem/omron_03-10-2026.png", w: 509, h: 99, dw: 136, dh: 26 },
  { name: "Pilz", src: "/oem/pilz_03-10-2026.png", w: 396, h: 149, dw: 103, dh: 39 },
  { name: "Leuze", src: "/oem/leuze_03-10-2026.png", w: 381, h: 115, dw: 115, dh: 35 },
  { name: "Banner", src: "/oem/banner_03-10-2026.png", w: 283, h: 61, dw: 136, dh: 29 },
  { name: "Autonics", src: "/oem/autonics_03-10-2026.png", w: 746, h: 160, dw: 136, dh: 29 },
  { name: "Schneider Electric", src: "/oem/schneider-electric_03-10-2026.png", w: 388, h: 160, dw: 98, dh: 41 },
  { name: "Delta", src: "/oem/delta_03-10-2026.png", w: 520, h: 160, dw: 114, dh: 35 },
  { name: "Panasonic", src: "/oem/panasonic_03-10-2026.png", w: 776, h: 119, dw: 136, dh: 21 },
];

function Group({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {brands.map((b) => (
        <li key={b.name} className="logo-tile">
          <Image src={b.src} alt={hidden ? "" : b.name} width={b.w} height={b.h} style={{ width: b.dw, height: b.dh }} />
        </li>
      ))}
    </ul>
  );
}

export default function OemMarquee() {
  return (
    <section className="oem-strip" aria-labelledby="oem-markalar-baslik">
      <div className="container oem-strip-head">
        <h2 id="oem-markalar-baslik" className="eyebrow">OEM Markalarımız</h2>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          <Group />
          <Group hidden />
        </div>
      </div>
    </section>
  );
}
