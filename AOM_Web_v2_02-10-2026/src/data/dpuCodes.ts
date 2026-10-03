// Autonics DPU serisi: tüm sipariş kodları (840). Ürün olarak eklenmez; indekslenebilir kod sayfalarında listelenir.
// Kaynak: Autonics Türkiye seri sayfası model listesi (03-10-2026). Aşağıdaki şemayla üretilen 840 kod,
// Autonics listesiyle birebir karşılaştırıldı (eksik / fazla yok).
// "-A" soneki: yalnız trifazede; Autonics teknik tablosunda -A'lı ve -A'sız model arasında fark görünmüyor [TEYİT].

export type DpuCode = {
  code: string;
  phase: 1 | 3;
  voltage: number; // V
  body: "A" | "B" | "C" | "D";
  current: number; // A
  option: "A" | "D" | "N" | "R";
  suffixA: boolean;
};

export const DPU_VOLTAGE: Record<string, number> = { "1": 110, "2": 220, "3": 380, "4": 440, "5": 480 };
export const DPU_OPTION: Record<string, string> = {
  A: "Harici gösterge + RS485",
  D: "Harici gösterge",
  R: "RS485 haberleşme",
  N: "Seçeneksiz",
};

const BODY3: [DpuCode["body"], number][] = [
  ["A", 25], ["A", 40], ["A", 50],
  ["B", 70], ["B", 80], ["B", 100], ["B", 120], ["B", 150], ["B", 180], ["B", 200],
  ["C", 250], ["C", 350],
  ["D", 400], ["D", 500], ["D", 600],
];
const BODY1: [DpuCode["body"], number][] = [
  ["A", 25], ["A", 40], ["A", 50], ["A", 70],
  ["B", 80], ["B", 100], ["B", 120], ["B", 150], ["B", 180], ["B", 200],
  ["C", 250], ["C", 350],
  ["D", 400], ["D", 500], ["D", 600],
];

function build(): DpuCode[] {
  const out: DpuCode[] = [];
  const opts = ["A", "D", "N", "R"] as const;
  for (const v of ["1", "2", "3", "4", "5"])
    for (const [body, current] of BODY3)
      for (const option of opts)
        for (const suffixA of [false, true])
          out.push({ code: `DPU3${v}${body}-${String(current).padStart(3, "0")}${option}${suffixA ? "-A" : ""}`, phase: 3, voltage: DPU_VOLTAGE[v], body, current, option, suffixA });
  for (const v of ["1", "2", "3", "4"])
    for (const [body, current] of BODY1)
      for (const option of opts)
        out.push({ code: `DPU1${v}${body}-${String(current).padStart(3, "0")}${option}`, phase: 1, voltage: DPU_VOLTAGE[v], body, current, option, suffixA: false });
  return out;
}

export const DPU_CODES = build();

// Kod grubu = DPU + faz + gerilim (ör. DPU34 = 3 faz 440 V). Her grup ayrı sayfa.
export const DPU_GROUPS = ["DPU31", "DPU32", "DPU33", "DPU34", "DPU35", "DPU11", "DPU12", "DPU13", "DPU14"].map((g) => {
  const codes = DPU_CODES.filter((c) => c.code.startsWith(g));
  const phase = g[3] === "3" ? 3 : 1;
  const voltage = DPU_VOLTAGE[g[4]];
  return {
    id: g.toLowerCase(),
    prefix: g,
    phase,
    voltage,
    label: `${phase === 3 ? "3 faz (trifaze)" : "Tek faz (monofaze)"} ${voltage} V`,
    codes,
  };
});

export const dpuGroup = (id: string) => DPU_GROUPS.find((g) => g.id === id);
