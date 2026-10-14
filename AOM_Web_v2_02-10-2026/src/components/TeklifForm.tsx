"use client";

// Teklif formu (14-10-2026) — /api/teklif'e POST eder; sunucu 200 (ok:true) dönerse
// generate_lead GA4 event'i burada, gerçek gönderim başarısına bağlı olarak tetiklenir
// (bkz. src/components/Analytics.tsx — talimattaki "sunucu yanıtı OK" tanımına burada tam uyulur).

import { useState, type FormEvent } from "react";
import { track } from "./Analytics";

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
  /** generate_lead param: form_name */
  formName: string;
  /** generate_lead param: item_name (ör. ürün adı) */
  itemName?: string;
  /** Formun üstündeki başlık; embedded=true ise görünmez (dış kart kendi başlığını kullanır) */
  title?: string;
  /** true ise kendi "card" sarmalayıcısını çizmez — mevcut bir kartın içine gömülür */
  embedded?: boolean;
};

export default function TeklifForm({ formName, itemName, title = "Teklif isteyin", embedded }: Props) {
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
      company: String(data.get("company") || ""), // honeypot
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
        setErrorMsg(json.error || "Gönderilemedi, lütfen tekrar deneyin.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Bağlantı hatası, lütfen tekrar deneyin veya bizi telefonla arayın.");
    }
  }

  if (status === "ok") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>Teşekkürler!</div>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15 }}>
          Mesajınız alındı, en kısa sürede size dönüş yapacağız.
        </p>
      </div>
    );
  }

  const fields = (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {!embedded && (
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{title}</div>
      )}
      {/* Honeypot: görsel olarak ve ekran okuyuculardan gizli; botlar genelde doldurur */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
      />
      <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14 }}>
        Ad Soyad
        <input name="name" required minLength={2} style={inputStyle} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14 }}>
        E-posta
        <input name="email" type="email" required style={inputStyle} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14 }}>
        Telefon (opsiyonel)
        <input name="phone" type="tel" style={inputStyle} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14 }}>
        Mesaj{itemName ? ` (${itemName} için)` : ""}
        <textarea name="message" required minLength={3} rows={4} style={inputStyle} />
      </label>
      {status === "error" && (
        <p role="alert" style={{ margin: 0, color: "#b42318", fontSize: 14 }}>
          {errorMsg}
        </p>
      )}
      <button type="submit" className="btn btn-primary" disabled={status === "sending"} style={{ alignSelf: "flex-start" }}>
        {status === "sending" ? "Gönderiliyor…" : "Teklif isteyin"}
      </button>
    </form>
  );

  if (embedded) return fields;
  return (
    <div className="card contact-card" style={{ maxWidth: 520 }}>
      {fields}
    </div>
  );
}
