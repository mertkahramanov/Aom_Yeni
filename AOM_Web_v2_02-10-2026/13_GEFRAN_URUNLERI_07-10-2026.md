# 13 · Gefran ürünleri (07-10-2026)

Kaynak: Web Sitesi projesi `urun-verisi/gefran-urunleri_07-10-2026.json` ve talimat `GEFRAN_URUNLERI_SITEYE_EKLEME_07-10-2026.md`. AOM Gefran yetkili satış noktasıdır; görseller Gefran ürün sayfalarındaki resmi görsellerdir.

## Dosyalar

- `src/data/gefran_07-10-2026.json`: ürün verisi (projeden olduğu gibi)
- `src/data/gefran.ts`: Product dönüşümü (marka Gefran, model = seri, ad = alt başlık, özet = kısa açıklama, "Ürün hakkında" = about + uygulamalar + AOM paragrafı)
- `src/data/markalar.ts` ve `src/app/magaza/marka/[marka]/page.tsx`: /magaza/marka/gefran
- `src/data/magaza.ts`: gefranProducts, motor-starter adresi (SLUG_OVERRIDE), kategori metinleri (tristör ve SSR metinlerine Gefran eklendi, motor-starter yeni)
- `src/app/magaza/page.tsx`: Güç kontrol grubuna motor-starter; mağaza başlık / açıklamasına Gefran
- `src/app/magaza/[slug]/page.tsx`: "Tüm Gefran ürünleri" düğmesi
- `src/app/sitemap.ts`: marka sayfası
- `public/magaza/gefran-<seri>_07-10-2026.jpg`: 18 resmi görsel

## Notlar

- Meta açıklama: JSON'daki seo_description, short_description'ın kırpılmış hâli + "Ankara AOM'dan teklif." olduğu için (bazıları cümle ortasında kesiliyor) tam short_description kullanıldı; sayfa zaten "Fiyat için teklif isteyin" ve bölge satırını ekliyor.
- Başlık: seo_title'dan " | AOM" çıkarıldı (site şablonu ekliyor).
- Hariç tutulan: GTF, GTF-Xtra (üretimden kalkıyor), aksesuar ve yazılımlar.
- Search Console: site haritasını yeniden gönderin; /magaza/kategori/motor-starter ve /magaza/marka/gefran için URL denetimi isteyin (Mert).

## Ürünler

| Kod | Seri | Kategori | Adres |
|---|---|---|---|
| GEF-PC-01 | GRC | Tristörlü güç kontrol | /magaza/gefran-grc |
| GEF-PC-02 | GPC | Tristörlü güç kontrol | /magaza/gefran-gpc |
| GEF-PC-03 | GRM | Tristörlü güç kontrol | /magaza/gefran-grm |
| GEF-PC-04 | GRM-H | Tristörlü güç kontrol | /magaza/gefran-grm-h |
| GEF-PC-05 | GFX4 | Tristörlü güç kontrol | /magaza/gefran-gfx4 |
| GEF-PC-06 | GFX4-IR | Tristörlü güç kontrol | /magaza/gefran-gfx4-ir |
| GEF-PC-07 | IR-12/IR-24 | Tristörlü güç kontrol | /magaza/gefran-ir-12-ir-24 |
| GEF-PC-08 | GFX | Tristörlü güç kontrol | /magaza/gefran-gfx |
| GEF-PC-09 | GFX Multifunzione | Tristörlü güç kontrol | /magaza/gefran-gfx-multifunzione |
| GEF-PC-10 | GSLM | Tristörlü güç kontrol | /magaza/gefran-gslm |
| GEF-SSR-01 | GRS | Solid state röleler (SSR) | /magaza/gefran-grs |
| GEF-SSR-02 | GRS-H | Solid state röleler (SSR) | /magaza/gefran-grs-h |
| GEF-SSR-03 | GRP | Solid state röleler (SSR) | /magaza/gefran-grp |
| GEF-SSR-04 | GRP-H | Solid state röleler (SSR) | /magaza/gefran-grp-h |
| GEF-SSR-05 | GRZ | Solid state röleler (SSR) | /magaza/gefran-grz |
| GEF-SSR-06 | GRZ-H | Solid state röleler (SSR) | /magaza/gefran-grz-h |
| GEF-SSR-07 | GQ | Solid state röleler (SSR) | /magaza/gefran-gq |
| GEF-MS-01 | G-Start | Motor yol vericiler (motor starter) | /magaza/gefran-g-start |
