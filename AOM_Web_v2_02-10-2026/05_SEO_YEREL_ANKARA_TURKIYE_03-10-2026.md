# Mağaza SEO: Ankara ve Türkiye geneli (03-10-2026)

Amaç: "solid state röle Ankara", "Autonics SSR fiyat", "tristörlü güç kontrol ünitesi", "SCR güç kontrol İstanbul / İzmir / Bursa…" gibi aramalarda mağaza sayfalarının görünmesi.

## Sitede yapılanlar

| Konu | Ne yapıldı | Dosya |
|---|---|---|
| Firma bilgisi (yapılandırılmış veri) | Her sayfada `Organization` + `LocalBusiness` JSON-LD: unvan, adres (1147. Cad. No: 8, Yenimahalle / Ankara), telefon, e-posta, hizmet alanı **Ankara + Türkiye** | `src/lib/seo.ts`, `src/app/layout.tsx` |
| Bölge etiketleri | `geo.region = TR-06`, `geo.placename = Ankara`, Open Graph `tr_TR` | `src/app/layout.tsx` |
| Kategori sayfaları | `/magaza/kategori/solid-state-roleler-ssr`, `/magaza/kategori/tristorlu-guc-kontrol`: Türkçe başlık, açıklama, tanıtım metni, `CollectionPage` + `ItemList` + `BreadcrumbList` | `src/app/magaza/kategori/[kategori]/page.tsx`, `CATEGORY_INFO` (`src/data/magaza.ts`) |
| Seri sayfaları | Her seri için sayfa (ör. `/magaza/seri/autonics-srh1`): seri tanıtımı, model tablosu, kartlar, yapılandırılmış veri | `src/app/magaza/seri/[seri]/page.tsx` |
| Ürün sayfaları | Açıklamada "Ankara merkezli AOM'dan Türkiye geneline satış ve teklif"; `Offer` içinde `eligibleRegion: TR`, satıcı = AOM kuruluşu; içerik yolu Mağaza → Kategori → Seri → Ürün | `src/app/magaza/[slug]/page.tsx` |
| Mağaza ana sayfası | Başlık "Mağaza: Autonics SSR ve Tristörlü Güç Kontrol \| Ankara", kategori metinleri, kategori / seri bağlantıları | `src/app/magaza/page.tsx` |
| Site haritası | Kategori (2) ve seri (9) sayfaları eklendi; toplam 246 adres | `src/app/sitemap.ts` |
| Anahtar kelimeler | Türkçe eş anlamlılar metinlerde doğal olarak geçiyor: solid state röle, SSR, katı hal rölesi, tristörlü güç kontrol ünitesi, SCR güç kontrolörü, tristör sürücü | kategori ve ürün metinleri |

**Bilinçli olarak yapılmayanlar:** Her şehir için ayrı "SSR İstanbul", "SSR İzmir" sayfaları açılmadı. Google bunları içerik tekrarı (doorway) sayar ve sıralamayı düşürür. Türkiye geneli görünürlük; hizmet alanı verisi, Türkiye geneli satış ifadesi ve kaliteli ürün sayfalarıyla sağlanır. Sahte yorum / puan verisi eklenmedi.

## Site dışında yapılması gerekenler (Mert)

Yerel aramada (Ankara) sıralamayı en çok bunlar etkiler:

1. **Google İşletme Profili**: "AOM – Angora Endüstriyel Makine" adına Ankara adresiyle profil açın veya mevcut profili güncelleyin. Kategori: "Endüstriyel ekipman tedarikçisi" + "Otomasyon şirketi". Hizmet bölgesine "Türkiye" ekleyin. Web sitesi: `https://aomtechnology.tr/magaza`. Ürünler bölümüne SSR ve tristör kategorilerini ekleyin.
2. **Ad / adres / telefon birliği**: Sitedeki adres ve telefon (+90 544 624 75 14) Google profili, LinkedIn, firma rehberleri ve faturalarla birebir aynı yazılmalı. Sabit hat varsa siteye ekleyelim [TEYİT].
3. **Google Search Console**: `aomtechnology.tr` alan adını doğrulayın, `https://aomtechnology.tr/sitemap.xml` adresini gönderin. Bing Webmaster Tools için de aynısı.
4. **Gerçek müşteri yorumları**: Google profilinde müşterilerden yorum isteyin.
5. **Autonics bayi listesi**: AOM yetkili bayi ise Autonics Türkiye'nin bayi / distribütör sayfasında siteye bağlantı istenebilir [TEYİT].
6. **Eski sitenin adresleri**: Yeni site yayına alınırken eski URL'lerden 301 yönlendirme tablosu (indekste açık karar olarak duruyor).

## Teyit bekleyenler

- Çalışma saatleri, posta kodu ve konum (enlem / boylam): Google profiliyle aynı olacak şekilde eklenecek.
- Kargo / teslim koşulları: belli olunca ürün verisine `shippingDetails` eklenebilir (Google alışveriş sonuçları için).
