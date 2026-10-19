"use client";

// HeroSlider.tsx'in çok dilli karşılığı (18-10-2026). Carousel mantığı, SVG ikonlar/görseller ve
// fotoğraf dosya yolları (locale'den bağımsız) AYNI kalır; yalnızca metinler dict.hero üzerinden
// gelir (bkz. src/i18n/dictionary.ts: HeroSlide tipi). Türkçe HeroSlider.tsx değişmedi.

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

const INTERVAL_MS = 6000;

// Fotoğraf/konum bilgisi dilden bağımsızdır — orijinal HeroSlider.tsx ile birebir aynı kaynaklar.
const SIMPLE_IMAGE: Record<"kaynak" | "pres" | "cnc" | "tristor", { src: string; position: string }> = {
  kaynak: { src: "/aom-robotik-kaynak-hucresi_03-10-2026.jpg", position: "50% 55%" },
  pres: { src: "/aom-eksantrik-pres-guvenlik_03-10-2026.jpg", position: "40% 50%" },
  cnc: { src: "/aom-cnc-isleme-merkezi_03-10-2026.jpg", position: "50% 55%" },
  tristor: { src: "/aom-tristor-pano_03-10-2026.jpg", position: "45% 50%" },
};

const AREA_IMAGES: Record<"otomasyon" | "medikal", { src: string; position: string }[]> = {
  otomasyon: [
    { src: "/aom-otomasyon-montaj-istasyonu_03-10-2026.jpg", position: "50% 30%" },
    { src: "/aom-yazilim-muhendislik_03-10-2026.jpg", position: "45% 45%" },
    { src: "/aom-ekstruder-makinesi_03-10-2026.jpg", position: "55% 55%" },
    { src: "/aom-scada-kontrol-odasi_03-10-2026.jpg", position: "62% 45%" },
  ],
  medikal: [
    { src: "/aom-medikal-laboratuvar-cihazlari_03-10-2026.jpg", position: "48% 55%" },
    { src: "/aom-medikal-gaz-jeneratoru_03-10-2026.jpg", position: "55% 55%" },
    { src: "/aom-medikal-sterilizasyon-kabini_03-10-2026.jpg", position: "45% 50%" },
    { src: "/aom-medikal-biyoguvenlik-kabini_03-10-2026.jpg", position: "58% 50%" },
  ],
};

function Visual({ kind }: { kind: "kaynak" | "pres" | "cnc" | "tristor" }) {
  const common = { width: 340, height: 250, viewBox: "0 0 320 240", fill: "none", stroke: "var(--steel)", strokeWidth: 3, "aria-hidden": true } as const;
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

export default function LocaleHeroSlider({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const slides = dict.hero.slides;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce) return;
    timer.current = setInterval(() => setIdx((i) => (i + 1) % slides.length), INTERVAL_MS);
  }, [paused, slides.length]);

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
      aria-label={dict.hero.ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container slider-inner">
        <div className="slider-stage">
          <div className="slider-text-stack">
            {slides.map((sl) => (
              <div key={`ghost-${sl.key}`} className="slider-text slider-text-ghost" aria-hidden="true">
                <div className="slider-counter">
                  <div className="rule" />
                  <span>{counter}</span>
                </div>
                <div className="eyebrow">{sl.eyebrow}</div>
                <div className="slider-h1-ghost">{sl.title}</div>
                <p className="slider-lead">{sl.lead}</p>
                <div className="slider-spec">{sl.spec}</div>
                <div className="slider-ctas">
                  <span className="btn btn-primary">{sl.cta}</span>
                  <span className="btn btn-outline-light">{dict.hero.startProject}</span>
                </div>
              </div>
            ))}
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
                <Link href={`/${locale}#cozumler`} className="btn btn-primary">
                  {cur.cta}
                </Link>
                <Link href={`/${locale}#iletisim`} className="btn btn-outline-light">
                  {dict.hero.startProject}
                </Link>
              </div>
            </div>
          </div>
          <figure className="slider-figure" key={`${cur.key}-fig`}>
            {cur.areas ? (
              <ul className="slider-areas">
                {cur.areas.map((a, i) => {
                  const img = AREA_IMAGES[cur.key as "otomasyon" | "medikal"][i];
                  return (
                    <li key={a.title} className="has-image">
                      <span className="slider-area-image">
                        <Image src={img.src} alt={a.imageAlt} fill sizes="300px" style={{ objectFit: "cover", objectPosition: img.position }} />
                      </span>
                      <strong className="slider-area-title">{a.title}</strong>
                      <span className="slider-area-text">{a.text}</span>
                    </li>
                  );
                })}
              </ul>
            ) : cur.imageAlt ? (
              <div className="slider-visual slider-visual-photo">
                <Image
                  src={SIMPLE_IMAGE[cur.key as "kaynak" | "pres" | "cnc" | "tristor"].src}
                  alt={cur.imageAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 600px"
                  style={{ objectFit: "cover", objectPosition: SIMPLE_IMAGE[cur.key as "kaynak" | "pres" | "cnc" | "tristor"].position }}
                />
              </div>
            ) : (
              <div className="slider-visual">
                <Visual kind={cur.key as "kaynak" | "pres" | "cnc" | "tristor"} />
              </div>
            )}
            <figcaption className="caption slider-figcaption">{!cur.areas && cur.caption ? cur.caption : " "}</figcaption>
          </figure>
        </div>
        <div className="slider-controls">
          <div role="tablist" aria-label={dict.hero.tabsAria} className="slider-tabs">
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
            <button type="button" aria-label={dict.hero.prevAria} onClick={() => go(-1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M15 5 L8 12 L15 19" />
              </svg>
            </button>
            <button type="button" aria-label={dict.hero.nextAria} onClick={() => go(1)}>
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
