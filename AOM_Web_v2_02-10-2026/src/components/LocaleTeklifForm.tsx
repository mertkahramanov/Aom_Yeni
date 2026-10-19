"use client";

// TeklifForm.tsx'in çok dilli karşılığı (18-10-2026). /api/teklif'e POST eden mantık ve
// generate_lead GA4 event'i AYNI kalır — yalnızca etiketler/metinler dict.teklif üzerinden gelir.

import { useState, type FormEvent } from "react";
import { track } from "./Analytics";
import type { Dictionary } from "@/i18n/dictionary";

const inputStyle: React.CSSProperties = {
  padding: "9px 11px",
  borderRadius: 8,
  border: "1px solid var(--line)",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  background: "var(--surface, #fff)",
  color: "inherit",
};

type Props = {
  formName: string;
  itemName?: string;
  dict: Dictionary;
  embedded?: boolean;
};

export default function LocaleTeklifForm({ formName, itemName, dict, embedded }: Props) {
  const t = dict.teklif;
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const pagePath = typeof window !== "undefined" ? window.location.pathname : undefined;
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      message: String(data.get("message") || ""),
      company: String(data.get("company") || ""),
      productName: itemName,
      pagePath,
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/teklif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (res.ok && json.ok) {
        setStatus("ok");
        track("generate_lead", {
          form_name: formName,
          page_path: pagePath,
          ...(itemName ? { item_name: itemName } : {}),
        });
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.error || t.errorDefault);
      }
    } catch {
      setStatus("error");
      setErrorMsg(t.errorConnection);
    }
  }

  if (!revealed) {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setRevealed(true)}
        style={embedded ? { alignSelf: "flex-start" } : undefined}
      >
        {t.title}
      </button>
    );
  }

  if (status === "ok") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{t.thanks}</div>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>{t.thanksBody}</p>
      </div>
    );
  }

  const fields = (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {!embedded && <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{t.title}</div>}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
      />
      <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14 }}>
        {t.name}
        <input name="name" required minLength={2} style={inputStyle} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14 }}>
        {t.email}
        <input name="email" type="email" required style={inputStyle} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14 }}>
        {t.phone}
        <input name="phone" type="tel" style={inputStyle} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14 }}>
        {t.message}
        {itemName ? t.messageSuffix(itemName) : ""}
        <textarea name="message" required minLength={3} rows={4} style={inputStyle} />
      </label>
      {status === "error" && (
        <p role="alert" style={{ margin: 0, color: "#b42318", fontSize: 14 }}>
          {errorMsg}
        </p>
      )}
      <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-muted)" }}>
        {t.kvkkPre}
        <a href="/kvkk-aydinlatma-metni">{t.kvkkLink}</a>
        {t.kvkkPost}
      </p>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? t.submitting : t.submit}
        </button>
        {status !== "sending" && (
          <button
            type="button"
            onClick={() => setRevealed(false)}
            style={{ background: "none", border: "none", padding: 0, color: "var(--ink-muted)", fontSize: 14, cursor: "pointer", textDecoration: "underline" }}
          >
            {t.cancel}
          </button>
        )}
      </div>
    </form>
  );

  if (embedded) return fields;
  return (
    <div className="card contact-card" style={{ maxWidth: 520 }}>
      {fields}
    </div>
  );
}
