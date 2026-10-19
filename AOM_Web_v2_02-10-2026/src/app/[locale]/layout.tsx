import { notFound } from "next/navigation";
import { locales, isLocale, htmlLang, isRtl, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionary";
import LocaleHeader from "@/components/LocaleHeader";
import LocaleFooter from "@/components/LocaleFooter";
import LocaleWhatsAppButton from "@/components/LocaleWhatsAppButton";
import LocaleCookieBanner from "@/components/LocaleCookieBanner";
import "../intl.css";

// Çok dilli site desteği (18-10-2026). Bu, src/app/layout.tsx'in İÇİNDE render edilen ek bir
// layout'tur — kök <html>/<body> etiketlerini TEKRAR TANIMLAYAMAZ (Next.js kısıtı), bu yüzden
// yalnızca lang/dir bilgisini taşıyan bir <div> ile sarmalar. Kök <html lang="tr"> öznitelik
// olarak teknik açıdan "yanlış" kalır (bilinen, kabul edilmiş küçük bir SEO/erişilebilirlik notu,
// bkz. proje görev #31). Türkçe sayfalar bu dosyadan tamamen etkilenmez.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const dict = getDictionary(loc);

  return (
    <div lang={htmlLang[loc]} dir={isRtl(loc) ? "rtl" : "ltr"} className="intl-root">
      <LocaleHeader locale={loc} dict={dict} />
      <main>{children}</main>
      <LocaleFooter locale={loc} dict={dict} />
      <LocaleWhatsAppButton dict={dict} />
      <LocaleCookieBanner dict={dict} />
    </div>
  );
}
