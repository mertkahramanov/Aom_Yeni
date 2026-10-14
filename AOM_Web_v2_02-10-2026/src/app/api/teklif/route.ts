import { NextRequest, NextResponse } from "next/server";

// Teklif formu — sunucu tarafı gönderim (14-10-2026).
// E-posta sağlayıcı: Resend (https://resend.com), HTTP API doğrudan fetch ile çağrılıyor —
// ek bir npm paketi gerekmiyor (bu oturumda npm install çalıştıramadığım için bilinçli tercih).
//
// Kurulum (Mert tarafından yapılmalı):
//  1. resend.com'da ücretsiz hesap aç, bir API anahtarı oluştur.
//  2. Vercel › Project › Settings › Environment Variables (Production) altına RESEND_API_KEY ekle.
//  3. (Opsiyonel ama önerilir) aomtechnology.tr alan adını Resend'de doğrula, sonra
//     RESEND_FROM = "AOM Web <teklif@aomtechnology.tr>" ekle. Doğrulanmadan önce varsayılan
//     onboarding@resend.dev adresinden gönderilir (Resend'in test modu) — bu da çalışır ama
//     bazı gelen kutularında spam'e düşebilir.
//  4. Alıcı adresini değiştirmek isterse TEKLIF_TO_EMAIL env değişkeniyle override edilebilir
//     (yoksa varsayılan info@aomtechnology.tr kullanılır).

export const runtime = "nodejs";

const TO_EMAIL = process.env.TEKLIF_TO_EMAIL || "info@aomtechnology.tr";
const FROM_EMAIL = process.env.RESEND_FROM || "AOM Web <onboarding@resend.dev>";

function isValidEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const productName = typeof body.productName === "string" ? body.productName.trim() : "";
  const pagePath = typeof body.pagePath === "string" ? body.pagePath.trim() : "";
  // Honeypot: gizli alan, gerçek kullanıcılar doldurmaz. Doluysa botu sessizce "başarılı" say (gerçek e-posta gitmez).
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }
  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Lütfen adınızı girin." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Lütfen geçerli bir e-posta adresi girin." }, { status: 400 });
  }
  if (message.length < 3) {
    return NextResponse.json({ ok: false, error: "Lütfen kısa bir mesaj/ihtiyaç bilgisi girin." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY tanımlı değil — teklif e-postası gönderilemedi.");
    return NextResponse.json(
      { ok: false, error: "Form şu an gönderilemiyor, lütfen bizi telefon veya e-posta ile arayın." },
      { status: 500 },
    );
  }

  const subject = productName ? `Teklif talebi: ${productName}` : "Web sitesinden teklif talebi";
  const text = [
    `Ad Soyad: ${name}`,
    `E-posta: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    productName ? `Ürün: ${productName}` : null,
    pagePath ? `Sayfa: ${pagePath}` : null,
    "",
    "Mesaj:",
    message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend hata:", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "E-posta gönderilemedi, lütfen bizi telefon veya e-posta ile arayın." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Teklif formu beklenmeyen hata:", err);
    return NextResponse.json({ ok: false, error: "Beklenmeyen bir hata oluştu." }, { status: 500 });
  }
}
