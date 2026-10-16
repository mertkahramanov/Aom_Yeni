// Ortak "7 adım" süreç bileşeni (16-10-2026). Önceden src/app/page.tsx içine gömülüydü;
// hizmet sayfalarında (robotik-kaynak, pres-guvenligi, cnc-tezgah, plc-scada,
// tristorlu-guc-kontrol) da aynı süreç anlatıldığı için tekrar yazmak yerine buraya taşındı.
// Ana sayfa da bu bileşeni kullanır (içerik hiçbir şekilde değişmedi, bkz. claude/HIZMET_SAYFALARI_TASLAK_15-10-2026.md).
const steps = [
  "İhtiyaç ve parça analizi",
  "Proje öncesi simülasyon",
  "Mekanik tasarım",
  "İmalat ve montaj, kendi atölyemizde",
  "Elektrik ve kontrol",
  "Kalibrasyon ve programlama",
  "Devreye alma ve eğitim",
];

type Props = {
  /** Varsayılan: "Yedi adım, tek sorumlu" */
  title?: string;
  /** Varsayılan: ana sayfadaki aynı açıklama cümlesi */
  lead?: string;
};

export default function ProcessSteps({
  title = "Yedi adım, tek sorumlu",
  lead = "Her proje, erişim, çarpışma ve çevrim süresi doğrulanan bir simülasyonla başlar.",
}: Props) {
  return (
    <section id="surec" className="process">
      <div className="container section" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
          <div className="eyebrow">Tasarımdan devreye alma</div>
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
