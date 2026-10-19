// Hizmet sayfaları ortak çeviri parçaları (19-10-2026). Her hizmet sayfasında tekrar eden
// arayüz metinleri (breadcrumb, bölüm başlıkları) burada tek yerden yönetilir; sayfaya özel
// metinler (başlık, açıklama, hizmet listeleri, SSS) her sayfanın kendi dosyasındadır
// (src/i18n/pages/<sayfa>.ts). Türkçe sayfalar bu dosyadan etkilenmez.
import type { Locale } from "../locales";

export const REGION_LINE: Record<Locale, string> = {
  en: "Sales and quotes from Ankara-based AOM, nationwide across Turkey.",
  ru: "Продажи и предложения от компании AOM (Анкара) по всей Турции.",
  ar: "مبيعات وعروض أسعار من AOM ومقرها أنقرة، إلى جميع أنحاء تركيا.",
};

export type ServiceUi = {
  crumbHome: string;
  crumbSolutions: string;
  locationAria: string;
  whatWeDo: string;
  faqTitle: string;
  relatedTitle: string;
};

export const SERVICE_UI: Record<Locale, ServiceUi> = {
  en: {
    crumbHome: "Home",
    crumbSolutions: "Solutions",
    locationAria: "Breadcrumb",
    whatWeDo: "What we do",
    faqTitle: "Frequently asked questions",
    relatedTitle: "Related",
  },
  ru: {
    crumbHome: "Главная",
    crumbSolutions: "Решения",
    locationAria: "Навигационная цепочка",
    whatWeDo: "Что мы делаем",
    faqTitle: "Часто задаваемые вопросы",
    relatedTitle: "См. также",
  },
  ar: {
    crumbHome: "الرئيسية",
    crumbSolutions: "الحلول",
    locationAria: "مسار التنقل",
    whatWeDo: "ماذا نقدّم",
    faqTitle: "الأسئلة الشائعة",
    relatedTitle: "ذات صلة",
  },
};
