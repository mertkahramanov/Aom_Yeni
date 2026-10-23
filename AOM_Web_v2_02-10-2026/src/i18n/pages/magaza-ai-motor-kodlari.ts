// /magaza/kapali-cevrim-adim-motor-kodlari ve /magaza/kapali-cevrim-adim-motor-kodlari/[seri]
// sayfalarının çok dilli arayüz metinleri (23-10-2026). Türkçe sayfalar değişmedi.
//
// Bu dosya, src/data/autonics-kuyruk-ai-motor_23-10-2026.ts verisine özeldir ve
// src/i18n/pages/magaza-kodlari.ts dosyasına (başka ajanlar eşzamanlı yazıyor olabileceği için)
// DOKUNMADAN, ondan yalnızca genel/ortak alanları salt okunur olarak import edip kullanır. Kapsam
// (Option A sınırı): sayfa çevresi çevrilir; s.desc ve s.common seriye özel teknik içerik olarak
// Türkçe kalır (diğer kod sayfalarıyla tutarlı).
import type { Locale } from "../locales";

export const AI_MOTOR_PAGE_UI: Record<
  Locale,
  {
    label: string;
    text: string;
    eyebrow: string;
    sourceCaption: string;
    support: string;
  }
> = {
  en: {
    label: "Ai Series Closed-Loop Stepper Motor Codes",
    text:
      "Autonics Ai series (AiS, AiC, AiCA, Ai-M) closed-loop stepper motors and drivers, with a built-in encoder, are not listed as products in the store. All 242 order codes from these families are listed on the series pages below.",
    eyebrow: "Stepper motors · supply",
    sourceCaption:
      "Codes, voltages and types are taken from Autonics' official distributor model pages and Mert's 2023 Autonics price list. See the manufacturer page for current technical values.",
    support: "AOM provides support in choosing a closed-loop stepper motor/driver and in migrating from an existing open-loop stepper system.",
  },
  ru: {
    label: "Коды замкнутых (closed-loop) шаговых двигателей серии Ai",
    text:
      "Шаговые двигатели и драйверы Autonics серии Ai (AiS, AiC, AiCA, Ai-M) с замкнутым контуром (closed-loop) и встроенным энкодером не представлены в магазине как отдельные товары. Все 242 кода заказа этих серий перечислены на страницах серий ниже.",
    eyebrow: "Шаговые двигатели · поставка",
    sourceCaption:
      "Коды, напряжения и типы взяты с официальных страниц дистрибьюторов Autonics и из прайс-листа Autonics 2023 года (предоставлен Мертом). Актуальные технические значения см. на странице производителя.",
    support: "AOM оказывает поддержку в выборе двигателя/драйвера с замкнутым контуром и при переходе с существующей разомкнутой (open-loop) системы.",
  },
  ar: {
    label: "رموز محركات الخطوة ذات الحلقة المغلقة من سلسلة Ai",
    text:
      "محركات الخطوة ذات الحلقة المغلقة (closed-loop) من سلسلة Ai من Autonics (AiS، AiC، AiCA، Ai-M) ومشغلاتها، المزودة بمشفر مدمج، غير مدرجة كمنتجات في المتجر. جميع رموز الطلب البالغة 242 من هذه العائلات مدرجة في صفحات السلسلة أدناه.",
    eyebrow: "محركات الخطوة · التوريد",
    sourceCaption:
      "الرموز والجهود والأنواع مأخوذة من صفحات موديلات موزعي Autonics الرسميين وقائمة أسعار Autonics 2023 التي قدمها مرت. للقيم الفنية الحالية راجع صفحة الشركة المصنعة.",
    support: "تقدم AOM الدعم في اختيار محرك/مشغل ذو حلقة مغلقة والانتقال من نظام الحلقة المفتوحة الحالي.",
  },
};
