"use client";
import { useState } from "react";

// Uzun kod tablolarında sayfa içi arama: yazılan metni içermeyen satırları gizler.
export default function CodeFilter({ tableId, total }: { tableId: string; total: number }) {
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(total);
  function apply(v: string) {
    setQ(v);
    const t = v.trim().toLocaleUpperCase("tr-TR").split(/\s+/).filter(Boolean);
    const rows = document.querySelectorAll<HTMLTableRowElement>(`#${tableId} tbody tr`);
    let n = 0;
    rows.forEach((r) => {
      const txt = (r.textContent ?? "").toLocaleUpperCase("tr-TR");
      const ok = t.every((w) => txt.includes(w));
      r.hidden = !ok;
      if (ok) n++;
    });
    setShown(n);
  }
  return (
    <div className="code-filter">
      <label htmlFor={`${tableId}-q`}>Kodda ara</label>
      <input
        id={`${tableId}-q`}
        type="search"
        value={q}
        onChange={(e) => apply(e.target.value)}
        placeholder="ör. E40S6-1000 veya line driver"
        autoComplete="off"
      />
      <span className="caption" aria-live="polite">
        {shown} / {total} kod
      </span>
    </div>
  );
}
