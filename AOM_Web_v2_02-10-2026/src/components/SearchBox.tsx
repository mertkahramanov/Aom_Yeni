"use client";

// Ürün kodu / model arama kutusu (14-10-2026). /api/arama'ya debounce'lu istek atar,
// eşleşen sayfayı (kod sayfalarında ilgili satıra #kod çapasıyla) önerir.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Result = { code: string; label: string; href: string };

export default function SearchBox({ placeholder = "Ürün kodu veya model ile arayın (ör. DPU34D-500A)" }: { placeholder?: string }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
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
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => q.trim().length >= 2 && setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        aria-label="Ürün kodu veya model arama"
        style={{
          width: "100%",
          padding: "11px 14px",
          borderRadius: 10,
          border: "1px solid var(--line)",
          fontFamily: "var(--font-body)",
          fontSize: 15,
          background: "var(--surface, #fff)",
          color: "inherit",
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
          {loading && (
            <div style={{ padding: "12px 14px", fontSize: 14, color: "var(--ink-muted)" }}>Aranıyor…</div>
          )}
          {!loading && results.length === 0 && (
            <div style={{ padding: "12px 14px", fontSize: 14, color: "var(--ink-muted)" }}>
              Sonuç bulunamadı. Model/kodu kontrol edin veya bizimle iletişime geçin.
            </div>
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
