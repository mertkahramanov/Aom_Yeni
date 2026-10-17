"use client";

// Mağaza slider (17-10-2026, Mert isteği): sayfanın en üstünde öne çıkan ana kategoriler arasında
// gezinme. Ana sayfadaki HeroSlider ile aynı .slider CSS ailesini kullanır (globals.css), tek
// görsel + metin düzeniyle (HeroSlider'daki "areas" kutulu düzen değil). Slayt içeriği (başlık,
// ürün sayısı, görsel) magaza/page.tsx içinde zaten hesaplanan kategori verisinden gelir — burada
// uydurma metin veya görsel yok.
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type StoreSlide = {
  id: string;
  short: string;
  eyebrow: string;
  title: string;
  lead: string;
  spec: string;
  cta: string;
  href: string;
  image?: { src: string; alt: string };
};

const INTERVAL_MS = 6000;

export default function StoreSlider({ slides }: { slides: StoreSlide[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce || slides.length < 2) return;
    timer.current = setInterval(() => setIdx((i) => (i + 1) % slides.length), INTERVAL_MS);
  }, [paused, slides.length]);

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [restart]);

  if (!slides.length) return null;

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
      className="slider"
      aria-roledescription="carousel"
      aria-label="Mağaza: öne çıkan kategoriler"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container slider-inner">
        <div className="slider-stage">
          <div className="slider-text-stack">
            {slides.map((sl) => (
              <div key={`ghost-${sl.id}`} className="slider-text slider-text-ghost" aria-hidden="true">
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
                </div>
              </div>
            ))}
            <div className="slider-text" aria-live="polite" key={cur.id}>
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
              </div>
            </div>
          </div>
          <figure className="slider-figure" key={`${cur.id}-fig`}>
            {cur.image ? (
              <div className="slider-visual slider-visual-photo">
                <Image src={cur.image.src} alt={cur.image.alt} fill sizes="(max-width: 760px) 100vw, 600px" style={{ objectFit: "contain", background: "#fff" }} />
              </div>
            ) : (
              <div className="slider-visual">
                <span className="placeholder-badge">{cur.spec}</span>
              </div>
            )}
            <figcaption className="caption slider-figcaption">&nbsp;</figcaption>
          </figure>
        </div>
        <div className="slider-controls">
          <div role="tablist" aria-label="Kategori seçimi" className="slider-tabs">
            {slides.map((s, i) => (
              <button
                key={s.id}
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
            <button type="button" aria-label="Önceki kategori" onClick={() => go(-1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M15 5 L8 12 L15 19" />
              </svg>
            </button>
            <button type="button" aria-label="Sonraki kategori" onClick={() => go(1)}>
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
