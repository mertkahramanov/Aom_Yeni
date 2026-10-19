import type { Dictionary } from "@/i18n/dictionary";

// ProcessSteps.tsx'in çok dilli karşılığı (18-10-2026). Aynı "process"/"steps" CSS sınıflarını
// kullanır; içerik (7 adım) dict.process üzerinden gelir.
export default function LocaleProcessSteps({ dict }: { dict: Dictionary }) {
  const { eyebrow, title, lead, steps } = dict.process;
  return (
    <section id="surec" className="process">
      <div className="container section" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="h2">{title}</h2>
          <p style={{ margin: 0 }}>{lead}</p>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: 15 }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
