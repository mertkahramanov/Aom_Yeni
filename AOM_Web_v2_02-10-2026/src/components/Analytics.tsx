"use client";

// Google Analytics 4 kurulumu — bkz. proje notu: claude/GA4_KURULUM_TALIMATI_14-10-2026.md (14-10-2026).
// @next/third-parties paketi bu oturumda kuruluma (npm install) erişimim olmadığı için eklenemedi;
// bunun yerine next/script + manuel gtag.js kullanıldı (talimatta belirtilen alternatif yöntem).
//
// Üç event, talimatta istenen isim ve parametrelerle birebir:
//  - whatsapp_click  { link_url, page_path, button_location }  → href wa.me / api.whatsapp.com içeren her linkte
//  - phone_click     { link_url, page_path, button_location }  → href "tel:" ile başlayan her linkte
//  - generate_lead   { form_name, page_path, item_name? }      → sitede gerçek <form> olmadığından, info@aomtechnology.tr
//                                                                 adresine giden her "teklif isteyin" mailto linkine tıklanınca
//  - email_click     { link_url, page_path, button_location }  → her mailto linkinde (opsiyonel event, talimatta da opsiyonel)
//
// Tek, global (document seviyesi) click dinleyicisi kullanılır; talimatın önerdiği yöntem budur ve
// projede tüm "teklif isteyin" / iletişim aksiyonlarının mailto:info@aomtechnology.tr olması sayesinde
// her sayfaya ayrı ayrı event kodu eklemeye gerek kalmaz.
//
// Google Consent Mode v2: KVKK/çerez bandı kararı kullanıcı tarafından ayrıca değerlendirilecek (talimatta
// açıkça belirtiliyor, bu kararı ben vermiyorum). Bu yüzden varsayılan durum "reddedilmiş" (denied) olarak
// ayarlanmıştır; ileride bir çerez bandı eklendiğinde gtag('consent','update',{...}) çağrısıyla kullanıcı
// onayına göre güncellenmesi gerekir. "Denied" durumunda GA4, çerezsiz (cookieless) ping'lerle sınırlı event
// ölçümü yapabilir; tam ölçüm (oturum/kullanıcı bazlı raporlar) için ileride onay akışı şarttır.

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-0L3GMR93MW";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

function formContext(pathname: string): { form_name: string; item_name?: string } {
  if (pathname.startsWith("/magaza/marka/")) {
    return { form_name: "brand_page_cta", item_name: pathname.split("/")[3] };
  }
  if (pathname.startsWith("/magaza/")) {
    return { form_name: "product_page_cta", item_name: pathname.split("/")[2] };
  }
  if (pathname === "/") {
    return { form_name: "homepage_contact" };
  }
  return { form_name: "contact_cta" };
}

function buttonLocation(el: HTMLElement): string {
  if (el.closest(".wa-button")) return "floating_whatsapp_button";
  if (el.closest(".contact-card")) return "contact_card";
  if (el.closest(".site-header")) return "header";
  if (el.closest(".site-footer")) return "footer";
  if (el.closest(".btn")) return "cta_button";
  return "inline_link";
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    const qs = searchParams?.toString();
    const pagePath = qs ? `${pathname}?${qs}` : pathname;
    // Next.js App Router istemci tarafı yönlendirme yapar; gtag.js'in otomatik sayfa görüntüleme
    // ölçümü bunu yakalamaz, bu yüzden her rota değişiminde manuel "config" çağrısı ile bildirilir.
    window.gtag("config", GA_ID, { page_path: pagePath });
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const hrefLower = href.toLowerCase();
      const pagePath = window.location.pathname;
      const location = buttonLocation(anchor);

      if (hrefLower.includes("wa.me") || hrefLower.includes("api.whatsapp.com")) {
        track("whatsapp_click", { link_url: href, page_path: pagePath, button_location: location });
        return;
      }
      if (hrefLower.startsWith("tel:")) {
        track("phone_click", { link_url: href, page_path: pagePath, button_location: location });
        return;
      }
      if (hrefLower.startsWith("mailto:")) {
        track("email_click", { link_url: href, page_path: pagePath, button_location: location });
        if (hrefLower.includes("info@aomtechnology.tr")) {
          const { form_name, item_name } = formContext(pagePath);
          track("generate_lead", item_name ? { form_name, page_path: pagePath, item_name } : { form_name, page_path: pagePath });
        }
      }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          // send_page_view: false — ilk sayfa görüntüleme dahil tüm page_view'lar
          // PageviewTracker tarafından (App Router istemci-taraf yönlendirmelerini
          // de kapsayacak şekilde) tek noktadan gönderilir; burada otomatik
          // gönderim kapatılmazsa ilk yüklemede çift page_view oluşur.
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <PageviewTracker />
    </>
  );
}
