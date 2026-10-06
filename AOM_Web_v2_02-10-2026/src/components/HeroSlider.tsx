"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = {
  key: "otomasyon" | "kaynak" | "pres" | "cnc" | "tristor" | "medikal";
  short: string;
  eyebrow: string;
  title: string;
  lead: string;
  spec: string;
  cta: string;
  href: string;
  visual: string;
  image?: { src: string; alt: string; caption?: string; position?: string };
  areas?: { icon: AreaIcon; title: string; text: string; image?: { src: string; alt: string; position?: string } }[];
};

type AreaIcon = "fabrika" | "kod" | "disli" | "ekran" | "deney" | "gaz" | "steril" | "kabin";

// Rakamlar: AOM_Web_Sitesi_Icerik_Ozeti_02-10-2026.md
const slides: Slide[] = [
  {
    key: "otomasyon",
    short: "Otomasyon",
    eyebrow: "Endüstriyel otomasyon",
    title: "Sahadan SCADA’ya, otomasyonun her katmanı.",
    lead: "Endüstriyel otomasyon, yazılım, makine otomasyonu ve SCADA projelerini tasarımdan devreye almaya kadar tek ekip olarak yürütüyoruz.",
    spec: "Tek muhatap, tek sorumluluk",
    cta: "Otomasyon çözümlerini inceleyin",
    href: "#cozumler",
    visual: "",
    areas: [
      {
        icon: "fabrika",
        title: "Endüstriyel Otomasyon",
        text: "Üretim hatları ve proses kontrolü",
        image: {
          src: "/aom-otomasyon-montaj-istasyonu_03-10-2026.jpg",
          alt: "Otomatik montaj istasyonu: portal eksende pnömatik tutucu, döner tabla, kablo zinciri ve pano",
          position: "50% 30%",
        },
      },
      {
        icon: "kod",
        title: "Yazılım",
        text: "PLC, HMI ve robot programlama",
        image: {
          src: "/aom-yazilim-muhendislik_03-10-2026.jpg",
          alt: "Mühendislik masası: PLC programlama ve HMI tasarım ekranları, dizüstü bilgisayara bağlı PLC ve dokunmatik panel",
          position: "45% 45%",
        },
      },
      {
        icon: "disli",
        title: "Makine Otomasyonu",
        text: "Özel makine ve dönüşüm projeleri",
        image: {
          src: "/aom-ekstruder-makinesi_03-10-2026.jpg",
          alt: "Ekstrüder makinesi: kırmızı kapaklı ekstrüder, besleme hunisi, kalıp kafası, soğutma havuzu ve kumanda panosu",
          position: "55% 55%",
        },
      },
      {
        icon: "ekran",
        title: "SCADA",
        text: "İzleme, raporlama ve veri toplama",
        image: {
          src: "/aom-scada-kontrol-odasi_03-10-2026.jpg",
          alt: "SCADA kontrol odası: duvar ekranında tesis akış şeması, operatör masasında izleme ekranları, camın ardında atölye",
          position: "62% 45%",
        },
      },
    ],
  },
  {
    key: "kaynak",
    short: "Robotik kaynak",
    eyebrow: "Robotik kaynak ve harici sistemler",
    title: "Kaynak robotundan pozisyonere, tek elden.",
    lead: "Mekanik tasarım, imalat, elektrik, robot entegrasyonu ve devreye alma tek çatı altında. Kendi mekanik atölyemizde üretir, sahada devreye alırız.",
    spec: "500 kg'a kadar taşıma · 6 m'ye kadar mesafe",
    cta: "Kaynak sistemlerini inceleyin",
    href: "#cozumler",
    visual: "[GÖRSEL: Robotlu kaynak hücresi + pozisyoner]",
    image: {
      src: "/aom-robotik-kaynak-hucresi_03-10-2026.jpg",
      alt: "Robotik kaynak hücresi: kaynak robotu, iki eksenli pozisyonerde çelik çerçeve, güvenlik çiti ve duman emiş kolu",
      caption: "AOM robotik kaynak hücresi",
      position: "50% 55%",
    },
  },
  {
    key: "pres",
    short: "Pres güvenliği",
    eyebrow: "Pres güvenliği ve otomatik besleme",
    title: "Eksantrik preste güvenlik ve servo besleme.",
    lead: "Işık perdesi, kavrama-fren dönüşümü, kafes ve kilitli kapı çözümleri. Dönüşümleri kendi mekanik atölyemizde yapıyoruz.",
    spec: "0–500 mm malzeme genişliği · 10 µm adım hassasiyeti",
    cta: "Pres çözümlerini inceleyin",
    href: "#cozumler",
    visual: "[GÖRSEL: Işık perdeli pres + servo NC besleme]",
    image: {
      src: "/aom-eksantrik-pres-guvenlik_03-10-2026.jpg",
      alt: "Eksantrik pres: kalıp bölgesinde ışık perdesi ve koruyucular, iki el kumanda ünitesi, servo NC besleme ve rulo açıcı",
      caption: "AOM otomatik beslemeli eksantrik pres",
      position: "40% 50%",
    },
  },
  {
    key: "cnc",
    short: "CNC tezgâhlar",
    eyebrow: "Kompakt CNC işleme merkezleri",
    title: "Logoya değil, performansa yatırım yapın.",
    lead: "Kompakt CNC tezgâhları Ankara’da tasarlıyor, üretiyor ve devreye alıyoruz. Siemens, Fanuc veya Mitsubishi Electric kontrol; robotlu hücre seçeneği.",
    spec: "Ankara’dan servis ve yedek parça",
    cta: "CNC tezgâhları inceleyin",
    href: "#cozumler",
    visual: "[GÖRSEL: AOM kompakt CNC 3B render]",
    image: {
      src: "/aom-cnc-isleme-merkezi_03-10-2026.jpg",
      alt: "Dikey CNC işleme merkezi: kırmızı çerçeveli kapılar, mengeneli tabla, soğutma nozulları ve döner kollu kontrol paneli",
      caption: "AOM CNC işleme merkezi",
      position: "50% 55%",
    },
  },
  {
    key: "tristor",
    short: "Tristörlü panolar",
    eyebrow: "Tristörlü güç kontrol panoları",
    title: "Isıl proseste hassas güç kontrolü.",
    lead: "Faz açısı ve sıfır geçiş kontrolü, RS485 Modbus RTU haberleşme.",
    spec: "Kanal başına 600 A",
    cta: "Güç kontrolü inceleyin",
    href: "#cozumler",
    visual: "[GÖRSEL: Tristör güç kontrol modülü]",
    image: {
      src: "/aom-tristor-pano_03-10-2026.jpg",
      alt: "Tristörlü güç kontrol panosu: soğutuculu tristör modülleri, bakır baralar, ana kesici ve kapakta HMI dokunmatik ekran",
      caption: "AOM güç kontrol ünitesi ve HMI",
      position: "45% 50%",
    },
  },
  {
    // Mert, 03-10-2026. Kapsam metni [TEYİT]: AOM'un bu cihazlardaki rolü (üretim / otomasyon / tedarik) netleşecek.
    key: "medikal",
    short: "Medikal cihazlar",
    eyebrow: "Medikal ve laboratuvar cihazları",
    title: "Laboratuvar ve medikal cihazlarda güvenilir çözüm.",
    lead: "Başlıca laboratuvar cihazları, oksijen ve azot jeneratörleri, sterilizasyon kabinleri, çeker ocaklar ve biyogüvenlik kabinleri.",
    spec: "Laboratuvar · Gaz · Sterilizasyon · Biyogüvenlik",
    cta: "Medikal cihazları inceleyin",
    href: "#cozumler",
    visual: "",
    areas: [
      { icon: "deney", title: "Laboratuvar Cihazları", text: "Başlıca laboratuvar cihazları", image: { src: "/aom-medikal-laboratuvar-cihazlari_03-10-2026.jpg", alt: "Laboratuvar tezgâhında inkübatör ve etüv, santrifüj ve manyetik karıştırıcı", position: "48% 55%" } },
      { icon: "gaz", title: "Gaz Jeneratörleri", text: "Oksijen ve azot jeneratörleri", image: { src: "/aom-medikal-gaz-jeneratoru_03-10-2026.jpg", alt: "PSA oksijen ve azot jeneratörü: dokunmatik ekranlı kabin, paslanmaz adsorpsiyon kolonları, tampon tankı ve basınç göstergeli boru hattı", position: "55% 55%" } },
      { icon: "steril", title: "Sterilizasyon Kabinleri", text: "Medikal ve laboratuvar sterilizasyonu", image: { src: "/aom-medikal-sterilizasyon-kabini_03-10-2026.jpg", alt: "Duvara gömme buharlı sterilizatör (otoklav): açık paslanmaz kapak, yükleme rafı ve sepetli yükleme arabası", position: "45% 50%" } },
      { icon: "kabin", title: "Biyogüvenlik Kabinleri", text: "Çeker ocaklar ve biyogüvenlik kabinleri", image: { src: "/aom-medikal-biyoguvenlik-kabini_03-10-2026.jpg", alt: "Sınıf II biyogüvenlik kabini, arkada egzoz kanallı çeker ocak", position: "58% 50%" } },
    ],
  },
];

const INTERVAL_MS = 6000;

function AreaIconSvg({ name }: { name: AreaIcon }) {
  const p = { width: 36, height: 36, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
  switch (name) {
    case "fabrika":
      return (
        <svg {...p}>
          <path d="M3 21V10l5 3V10l5 3V10l5 3V5h3v16H3z" />
          <path d="M7 17h2M11 17h2M15 17h2" />
        </svg>
      );
    case "kod":
      return (
        <svg {...p}>
          <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
        </svg>
      );
    case "disli":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1" />
          <circle cx="12" cy="12" r="7" />
        </svg>
      );
    case "ekran":
      return (
        <svg {...p}>
          <rect x="2" y="4" width="20" height="13" rx="1" />
          <path d="M8 21h8M12 17v4M6 13l3-3 3 2 5-5" />
        </svg>
      );
    case "deney":
      return (
        <svg {...p}>
          <path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3" />
          <path d="M7 15h10" />
        </svg>
      );
    case "gaz":
      return (
        <svg {...p}>
          <rect x="7" y="6" width="10" height="16" rx="3" />
          <path d="M10 6V3h4v3M10 2h4" />
          <path d="M10 13h4M12 11v4" />
        </svg>
      );
    case "steril":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M3 8h18" />
          <path d="M8 12c1 1 1 2 0 3s-1 2 0 3M12 12c1 1 1 2 0 3s-1 2 0 3M16 12c1 1 1 2 0 3s-1 2 0 3" />
        </svg>
      );
    case "kabin":
      return (
        <svg {...p}>
          <path d="M3 21V3h18v18" />
          <path d="M3 13h18M7 13v-3M17 13v-3" />
          <path d="M6 6h12M8 8.5h8" />
          <path d="M2 21h20" />
        </svg>
      );
  }
}

function Visual({ kind }: { kind: Slide["key"] }) {
  const common = {
    width: 340,
    height: 250,
    viewBox: "0 0 320 240",
    fill: "none",
    stroke: "var(--steel)",
    strokeWidth: 3,
    "aria-hidden": true,
  } as const;
  switch (kind) {
    case "kaynak":
      return (
        <svg {...common}>
          <rect x="30" y="200" width="260" height="14" />
          <rect x="60" y="170" width="70" height="30" />
          <path d="M95 170 L95 120 L165 70 L225 95" />
          <circle cx="95" cy="120" r="10" />
          <circle cx="165" cy="70" r="10" />
          <path d="M225 95 L240 120" stroke="var(--aom-red-on-dark)" />
          <circle cx="242" cy="124" r="4" fill="var(--vurgu-sari)" stroke="none" />
          <rect x="190" y="150" width="90" height="20" />
          <ellipse cx="235" cy="140" rx="40" ry="10" />
        </svg>
      );
    case "pres":
      return (
        <svg {...common}>
          <path d="M70 214 V30 H250 V214" />
          <rect x="40" y="200" width="240" height="14" />
          <rect x="110" y="60" width="100" height="40" />
          <rect x="125" y="100" width="70" height="30" />
          <rect x="110" y="170" width="100" height="30" />
          <path d="M90 60 V200 M230 60 V200" stroke="var(--aom-red-on-dark)" strokeDasharray="6 6" />
          <path d="M20 180 H110" stroke="#6fa3e0" />
        </svg>
      );
    case "cnc":
      return (
        <svg {...common}>
          <rect x="40" y="40" width="200" height="174" />
          <rect x="40" y="200" width="200" height="14" />
          <rect x="120" y="50" width="40" height="70" />
          <path d="M140 120 V140" stroke="var(--aom-red-on-dark)" />
          <rect x="80" y="160" width="120" height="16" />
          <rect x="105" y="146" width="50" height="14" />
          <rect x="250" y="70" width="40" height="70" />
          <circle cx="270" cy="40" r="6" fill="var(--vurgu-yesil)" stroke="none" />
          <path d="M270 46 V70" />
        </svg>
      );
    case "tristor":
      return (
        <svg {...common}>
          <rect x="40" y="60" width="70" height="120" />
          <rect x="125" y="60" width="70" height="120" />
          <rect x="210" y="60" width="70" height="120" />
          <path d="M50 190 V210 M65 190 V210 M80 190 V210 M95 190 V210 M135 190 V210 M150 190 V210 M165 190 V210 M180 190 V210 M220 190 V210 M235 190 V210 M250 190 V210 M265 190 V210" />
          <path d="M40 30 C 60 0, 80 0, 100 30 S 140 60, 160 30 S 200 0, 220 30 S 260 60, 280 30" stroke="var(--aom-red-on-dark)" />
          <circle cx="75" cy="85" r="5" fill="var(--vurgu-yesil)" stroke="none" />
          <circle cx="160" cy="85" r="5" fill="var(--vurgu-yesil)" stroke="none" />
          <circle cx="245" cy="85" r="5" fill="var(--vurgu-yesil)" stroke="none" />
        </svg>
      );
  }
}

export default function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce) return;
    timer.current = setInterval(() => setIdx((i) => (i + 1) % slides.length), INTERVAL_MS);
  }, [paused]);

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [restart]);

  const go = (step: number) => {
    setIdx((i) => (i + step + slides.length) % slides.length);
    restart();
  };
  const pick = (i: number) => {
    setIdx(i);
    restart();
  };

  const cur = slides[idx];
  const counter = `${String(idx + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

  return (
    <section
      id="ust"
      className="slider"
      aria-roledescription="carousel"
      aria-label="Öne çıkan çözümler"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container slider-inner">
        <div className="slider-stage">
          {/* Tüm slaytların metni aynı hücrede üst üste durur; yükseklik en uzun metne göre sabitlenir, geçişte boyut değişmez */}
          <div className="slider-text-stack">
            {slides.map((sl) =>
              (
                <div key={`ghost-${sl.key}`} className="slider-text slider-text-ghost" aria-hidden="true">
                  <div className="slider-counter"><div className="rule" /><span>{counter}</span></div>
                  <div className="eyebrow">{sl.eyebrow}</div>
                  <div className="slider-h1-ghost">{sl.title}</div>
                  <p className="slider-lead">{sl.lead}</p>
                  <div className="slider-spec">{sl.spec}</div>
                  <div className="slider-ctas"><span className="btn btn-primary">{sl.cta}</span><span className="btn btn-outline-light">Proje başlatın</span></div>
                </div>
              ),
            )}
            <div className="slider-text" aria-live="polite" key={cur.key}>
            <div className="slider-counter">
              <div className="rule" />
              <span>{counter}</span>
            </div>
            <div className="eyebrow">{cur.eyebrow}</div>
            <h1>{cur.title}</h1>
            <p className="slider-lead">{cur.lead}</p>
            <div className="slider-spec">{cur.spec}</div>
            <div className="slider-ctas">
              <Link href={cur.href} className="btn btn-primary">
                {cur.cta}
              </Link>
              <Link href="#iletisim" className="btn btn-outline-light">
                Proje başlatın
              </Link>
            </div>
          </div>
          </div>
          <figure className="slider-figure" key={`${cur.key}-fig`}>
            {cur.areas ? (
              <ul className="slider-areas">
                {cur.areas.map((a) => (
                  <li key={a.title} className={a.image ? "has-image" : undefined}>
                    {a.image ? (
                      <span className="slider-area-image">
                        <Image src={a.image.src} alt={a.image.alt} fill sizes="300px" style={{ objectFit: "cover", objectPosition: a.image.position ?? "50% 50%" }} />
                      </span>
                    ) : (
                      <span className="slider-area-icon">
                        <AreaIconSvg name={a.icon} />
                      </span>
                    )}
                    <strong className="slider-area-title">{a.title}</strong>
                    <span className="slider-area-text">{a.text}</span>
                  </li>
                ))}
              </ul>
            ) : cur.image ? (
              <>
                <div className="slider-visual slider-visual-photo">
                  <Image src={cur.image.src} alt={cur.image.alt} fill sizes="(max-width: 760px) 100vw, 600px" style={{ objectFit: "cover", objectPosition: cur.image.position ?? "50% 55%" }} />
                </div>

              </>
            ) : (
              <>
                <div className="slider-visual">
                  <Visual kind={cur.key} />
                  <span className="placeholder-badge">{cur.visual}</span>
                </div>
              </>
            )}
            {/* Açıklama satırı her slaytta aynı yer kaplar (boşsa da) */}
            <figcaption className="caption slider-figcaption">{!cur.areas && cur.image?.caption ? cur.image.caption : "\u00a0"}</figcaption>
          </figure>
        </div>
        <div className="slider-controls">
          <div role="tablist" aria-label="Slayt seçimi" className="slider-tabs">
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={i === idx}
                className={i === idx ? "slider-tab active" : "slider-tab"}
                onClick={() => pick(i)}
              >
                {s.short}
              </button>
            ))}
          </div>
          <div className="slider-arrows">
            <button type="button" aria-label="Önceki slayt" onClick={() => go(-1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M15 5 L8 12 L15 19" />
              </svg>
            </button>
            <button type="button" aria-label="Sonraki slayt" onClick={() => go(1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M9 5 L16 12 L9 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
