import { NextResponse, type NextRequest } from "next/server";

// Çok dilli site desteği (18-10-2026). /en, /ru, /ar altındaki istekler için isteğin
// header'ına "x-is-intl: 1" ekler; src/app/layout.tsx bu başlığa bakarak Türkçe
// Header/Footer/WhatsAppButton/CookieBanner bileşenlerini ikinci kez render etmez
// (çünkü src/app/[locale]/layout.tsx kendi Locale* bileşenlerini zaten render eder).
// Türkçe (önek yok) istekler bu middleware'den hiçbir şekilde etkilenmez.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isIntl = /^\/(en|ru|ar)(\/|$)/.test(pathname);
  if (!isIntl) return NextResponse.next();

  const headers = new Headers(request.headers);
  headers.set("x-is-intl", "1");
  return NextResponse.next({ request: { headers } });
}

// _next statikleri, api rotaları ve dosya uzantılı public varlıklar (resim, css vb.) hariç tutulur.
export const config = {
  matcher: ["/((?!_next/|api/|.*\\.[\\w]+$).*)"],
};
