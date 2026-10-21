// TCMB günlük EUR döviz satış kuru (ForexSelling) — 20-10-2026.
// Kullanım: Schneider gibi EUR fiyatlı ürünlerde ürün sayfasında "≈ ₺xx.xxx" TL karşılığı satırı.
// Kaynak: https://www.tcmb.gov.tr/kurlar/today.xml (TCMB'nin resmi günlük kur bülteni).
// Kur alınamazsa (ağ hatası, beklenmeyen format) null döner; çağıran taraf TL satırını tamamen
// gizlemelidir — asla uydurma/sabit bir kur gösterilmez (Mert, 17-10-2026, SCHNEIDER_FIYATLANDIRMA_PLANI).
export type EurRate = { rate: number; date: string }; // date: TCMB formatı GG.AA.YYYY

export async function getEurSellingRate(): Promise<EurRate | null> {
  try {
    const res = await fetch("https://www.tcmb.gov.tr/kurlar/today.xml", {
      next: { revalidate: 86400 }, // günde bir kez yenile
    });
    if (!res.ok) return null;
    const xml = await res.text();

    const dateMatch = xml.match(/Tarih_Date[^>]*\bTarih="(\d{2}\.\d{2}\.\d{4})"/);
    const eurBlockMatch = xml.match(/<Currency[^>]*\bKod="EUR"[^>]*>([\s\S]*?)<\/Currency>/);
    if (!eurBlockMatch) return null;

    const sellMatch = eurBlockMatch[1].match(/<ForexSelling>\s*([\d.,]+)\s*<\/ForexSelling>/);
    if (!sellMatch) return null;

    // TCMB today.xml ondalık ayracı nokta kullanır (ör. 55.6191); yine de virgüllü gelirse normalize et.
    const raw = sellMatch[1].trim();
    const normalized = raw.includes(",") && !raw.includes(".") ? raw.replace(",", ".") : raw.replace(/,/g, "");
    const rate = parseFloat(normalized);
    if (!rate || Number.isNaN(rate) || rate <= 0) return null;

    return { rate, date: dateMatch?.[1] ?? "" };
  } catch {
    return null;
  }
}

// EUR tutarını, verilen kurla TL'ye çevirip Türkçe para biçiminde döndürür (kuruş yok, tam sayıya yuvarlanır).
export function formatTryApprox(eur: number, rate: number): string {
  const try_ = eur * rate;
  return (
    "≈ " +
    new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(try_) +
    " ₺"
  );
}
