"use client";

// SearchBox.tsx'in çok dilli karşılığı (18-10-2026). /api/arama uç noktası ve davranışı
// AYNI kalır — yalnızca görünen metinler dict üzerinden gelir. Arama sonuçları (ürün
// kodu/model) ürün verisinden geldiği için şu an yine Türkçe dönebilir (katalog çevirisi
// ayrı bir aşama, bkz. görev #30); kod/model zaten dilden bağımsızdır.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionary";

type Result = { code: string; label: string; href: string };

export default function LocaleSearchBox({ dict }: { dict: Dictionary }) {
  const s = dict.search;
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [focused, setFocused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    const query = q.trim();
    if (query.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/arama?q=${encodeURIComponent(query)}`);
        const json = await res.json().catch(() => ({ results: [] }));
        setResults(json.results ?? []);
        setOpen(true);
        setActiveIdx(-1);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [q]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      const r = results[activeIdx];
      window.location.href = r.href;
    }
  }

  return (
    <div ref={boxRef} className="search-box" style={{ position: "relative", maxWidth: 480, width: "100%" }}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--aom-red)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.2" y2="16.2" />
      </svg>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => {
          setFocused(true);
          if (q.trim().length >= 2) setOpen(true);
        }}
        onBlur={() => setFocused(false)}
        onKeyDown={onKeyDown}
        placeholder={s.placeholder}
        autoComplete="off"
        aria-label={s.ariaLabel}
        style={{
          width: "100%",
          padding: "11px 14px 11px 42px",
          borderRadius: 10,
          border: `2px solid var(--aom-red)`,
          boxShadow: focused ? "0 0 0 3px rgba(142, 27, 32, 0.18)" : undefined,
          fontFamily: "var(--font-body)",
          fontSize: 15,
          background: "var(--surface-raised, #fff)",
          color: "inherit",
          outline: "none",
        }}
      />
      {open && q.trim().length >= 2 && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 30,
            background: "var(--surface, #fff)",
            border: "1px solid var(--line)",
            borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            maxHeight: 360,
            overflowY: "auto",
          }}
        >
          {loading && <div style={{ padding: "12px 14px", fontSize: 14, color: "var(--ink-muted)" }}>{s.loading}</div>}
          {!loading && results.length === 0 && (
            <div style={{ padding: "12px 14px", fontSize: 14, color: "var(--ink-muted)" }}>{s.empty}</div>
          )}
          {!loading &&
            results.map((r, i) => (
              <Link
                key={`${r.href}-${i}`}
                href={r.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  padding: "10px 14px",
                  textDecoration: "none",
                  color: "inherit",
                  background: i === activeIdx ? "var(--surface-raised, #f5f5f5)" : "transparent",
                  borderBottom: i < results.length - 1 ? "1px solid var(--line)" : undefined,
                }}
              >
                <strong style={{ fontSize: 14 }}>{r.code}</strong>
                <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>{r.label}</span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
