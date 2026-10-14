# Depo Stoğu → AOM Web Sitesi Mağazası Karşılaştırması (14-10-2026)

Bu dosya, Mert'in isteği üzerine ("son yaptığın işlemleri çıktı olarak ver, başka bir oturuma taşıyacağım") bu Claude oturumunda yapılan analizin ve **henüz tamamlanmamış** "depo stoğunu siteye ürün olarak ekle" görevinin durumunun özetidir. Görev bu oturumda **uygulanmadı** — aşağıda nedeni ve devam planı var.

## 1) Bu oturumda yapılanlar (sırayla)

1. **AOM Sipariş Panosu günlük yedeği**: Artifact'ın `orders` koleksiyonundaki 18 kaydın tamamı okunup `siparis-panosu-yedek-2026-10-13.json` olarak dışa aktarıldı ve kullanıcıya gönderildi.
2. **Depo stok dosyası analizi**: `Stoktaki_Urunler_14-10-2026.xlsx` (BizimHesap çıktısı, 642 ürün; sütunlar: Sıra No, Ürün Adı, Ürün Kodu, Marka, Kategori, Stok Miktarı, Birim, Satış Fiyatı, Para Birimi, Fotoğraf Linki) okundu ve o anki 18 siparişin kalemleriyle (156 kalem) karşılaştırıldı → **8 eşleşme** bulundu (Provar panel metreler, Sigma şalterler, Eltra enkoderler).
3. **Gerçek web sitesi keşfedildi**: Mert, bilgisayarındaki `AOM_Web_v2_02-10-2026` klasörünü bu oturuma bağladı. Bu, "siteye ekle" ifadesindeki gerçek hedefin bir Next.js projesi (yerel kaynak kodu, henüz Vercel'e / canlıya push edilmemiş — bkz. aşağıdaki not) olduğu ortaya çıktı; Claude Artifact'leri (Sipariş Panosu, Web Sitesi Ana Sayfa tuvali vb.) bu projeden ayrı.
4. **Site mimarisi okundu**: `00_INDEKS_02-10-2026.md` ve `src/data/magaza.ts` (ürün şablonu — `Product` type) incelendi.
5. **Depo stoğu (642 ürün) ile sitedeki MEVCUT ürünler karşılaştırıldı** (bkz. bölüm 3) — bu, kullanıcının "ürün sitede varsa ekleme" talebinin ön-analizidir, henüz siteye hiçbir yazma/silme işlemi yapılmadı.

## 2) Web sitesi: ne, nerede, nasıl

- **Konum**: `AOM_Web_v2_02-10-2026` klasörü, Mert'in bilgisayarına bağlı (OneDrive, `Aom\Site\Web Sitesi\` altında). Next.js 15.5.27 + React 19 + TypeScript projesi.
- **Mağaza ("magaza") sayfaları**: `src/app/magaza/**` — liste, kategori, marka, seri ve "kod sayfası" (sipariş kodu indeksleri) rotaları.
- **"Ürün şablonu" = `src/data/magaza.ts` içindeki `Product` tipi** (slug, brand, model, name, category, summary, image, specs[], price?, series?, seoText[], keywords[], ...). Yeni ürünler bu tipte nesneler olarak ya doğrudan `products` dizisine ya da marka/kategoriye özel bir veri dosyasına (`yedek-parca.ts`, `ikinci-el.ts`, `gefran.ts`, `surucu` vb. gibi) eklenir; büyük setler önce ham JSON (`src/data/*.json`), sonra bu JSON'u `Product[]`'a çeviren bir `.ts` dosyasıyla işlenir.
- **Kategori mantığı**: Her ürünün `category` alanı otomatik olarak mağaza listesinde bir kategori kutusuna düşer (`storeCategories()`); görseli olmayan ürünler otomatik "Diğer ürünler" kategorisine ayrılır ve görsel eklenince kendi kategorisine geri döner. Yani **görselsiz de eklenebilir**, ama site kuralı görselsiz ürünleri "Diğer ürünler"e sürüklüyor.
- **Şu an sitede toplam ~6.700+ ürün kaydı** (DPU3 9, SPR/SPRM/SPRS 417, SSR 224, enkoder serisi 34 + 8.644 sipariş kodu, kontrol cihazı 981 + 1.309 kod, yedek parça/CNC 1.476, 2. el 809, sürücü/yol verici 261+, Gefran 18 seri) ve site haritasında 3.367+ adres (`00_INDEKS` değişiklik kaydına göre).
- **Önemli kurallar (00_INDEKS'ten, zaten Mert tarafından belirlenmiş)**:
  - Görsellerde "Temsili görseldir" / "Temsili 3B görsel değildir" yazısı veya gri bant **olmayacak**; varsa temizlenecek.
  - Fiyatlar KDV hariç girilir, sitede "+ KDV" ile gösterilir (KDV %20).
  - **Üretici görsellerinin kullanım izni** birçok yerde "[TEYİT]" / açık karar olarak işaretli (örn. Autonics DPU3, SSR, enkoder görselleri için "bayi sözleşmesinden teyit edilecek" notu var). Yani görsel kullanımı bu projede zaten hassas ve çözülmemiş bir konu — depo ürünleri için de aynı dikkat gerekiyor.
  - Marka sayfalarında yalnız **doğrulanmış** ifadeler kullanılıyor (örn. sadece Gefran için "yetkili satış noktası" yazıyor, diğerlerinde uydurma bayilik iddiası yok, sadece "OEM partneri").
- **Bu oturumda `device_bash` (uzak kabuk) aracı mevcut değildi** — yalnızca dosya listeleme / okuma / cihaza dosya gönderme (`device_commit_files`) yapılabildi. Next.js'i çalıştırmak, `npm run build`, git/commit/push gibi işlemler bu oturumdan **yapılamaz**; bunlar Mert'in kendi bilgisayarında kalıyor (zaten 14-10-2026 GA4 notunda da benzer bir sınırlama var: "bu oturumda cihazda git/komut satırı erişimim olmadığı için kod yalnız proje klasörüne yazıldı").

## 3) Depo stoğu (642 ürün) → Sitede zaten var mı?

**Yöntem**: Sitenin ürün koduna sahip tüm veri dosyaları (`magaza.ts`, `yedek-parca.ts/json`, `ikinci-el.ts/json`, `ssr.ts/json`, `spr.ts/json`, `kontrol.ts/json`, `enkoder.ts/json`, `gefran.ts/json`, `surucu.json`, `dpuCodes.ts`) taranarak ~3.215 benzersiz ürün kodu çıkarıldı; depo dosyasındaki 642 ürünün kodu / adı bu kodlarla (boşluk, tire gibi farklar normalize edilerek) karşılaştırıldı.

**Not**: Bu otomatik bir kod taraması; kontrol cihazı serilerindeki bazı kod sayfaları (örn. sıcaklık kontrol / panel metre 1.309 kodu) sitede programatik olarak üretiliyor ve ham veride tek tek yazılı değil, o yüzden taramaya girmedi. Dolayısıyla eşleşme sayısı muhtemelen **gerçek sayının biraz altında** (yani sitede olup da burada "yeni" görünen birkaç ürün olabilir) — kesinleştirmek için sitenin kendi arama/kod sayfalarından elle teyit gerekir.

### Sonuç: 37 ürün muhtemelen zaten sitede, 605 ürün sitede görünmüyor

**Zaten sitede olduğu düşünülen 37 ürün** → `15_eslesen.csv` (depo sıra no, ürün adı/kodu, hangi site veri dosyasında bulundu). Örnekler: Autonics E50S8 enkoder kodları (5), Delta güç kaynağı/HMI modelleri (4), Inovance/Delta invertörler (5), Siemens kontaktör/şalter modelleri (7), Omron röle (2), servo motor/sürücü (3), Autonics SSR (2). Bunlardan **2 kaydın eşleşmesi şüpheli** (568 "NXPF0630 01600" ve 596 "SA-CBM" — kısa sayısal/parça eşleşmesi, elle teyit gerekir).

**Sitede bulunamayan 605 ürün** → `15_yeni_adaylar.csv` — bunlar "yeni eklenebilir" adaylar. Depo kategorisine göre dağılım (en kalabalık 15):

| Depo kategorisi | Adet |
|---|---|
| (kategori yok) | 228 |
| Diğer | 73 |
| Aksesuar | 44 |
| PLC MODÜLÜ | 22 |
| Sensör | 18 |
| Kablo | 15 |
| Bağlantı Kutusu | 12 |
| Klemens | 11 |
| Role | 10 |
| Otomat | 9 |
| PLC | 9 |
| Buton | 8 |
| Güç Kaynağı | 8 |
| Sıcaklık Kontrol Cihazı | 8 |
| Sigorta | 8 |

## 4) Neden bu oturumda siteye yazma/silme yapılmadı

Mert'in talebi dört ayrı adım içeriyor: (a) depo ürünlerini **siteye ekle**, (b) **sitede zaten varsa ekleme**, (c) **zaten eklenmiş yinelenenleri sil**, (d) eklenecek ürünlerin **orijinal görsellerini bul** ve **kategoriye göre** şablona uygun ekle. Üç soruluk netleştirmede Mert ikinci ve üçüncü soruyu "fark etmez" / "çıktısını ver, başka oturuma taşıyacağım" şeklinde yanıtladı — yani şu an **uygulamaya geçmek değil, bu özet çıktısını almak** istendiği anlaşıldı. Ayrıca aşağıdaki noktalar tek oturumda güvenle bitirilecek kadar küçük değil:

- **605 "yeni" ürünün çoğu genel elektrik/otomasyon malzemesi** (kablo bağı, buat, topraklama barası, klemens, buton, PLC modülü vb.) — Autonics/Gefran/CNC yedek parça eksenli mevcut ~16 kategoriden hiçbirine net oturmuyor; "(kategori yok)" ve "Diğer" tek başına 301 ürün. Her biri için doğru kategori / yeni kategori kararı gerekiyor (sitenin kendi geçmişinde de her yeni ürün grubu için ayrı "Mert kararı" ile kategori açılmış).
- **"Orijinal görsel" bulmak + kullanım izni**: Site, üretici görsellerinin kullanım iznini halihazırda birçok üründe "[TEYİT]" olarak **çözülmemiş** işaretlemiş. 605 ürün çoğu küçük/jenerik marka (GWEST, TP Electric, SARF vb.) olduğundan web'den "orijinal" üretici görseli bulmak — ve bunu meşru biçimde kullanmak — ürün ürün araştırma ve Mert'in onayı gerektiriyor; toptan/otomatik yapılamaz.
- **Kod bazlı "zaten var mı" taraması %100 kesin değil** (bkz. bölüm 3 notu) — siteye yazmadan önce şüpheli 2 kayıt ve büyük JSON'daki programatik kod sayfaları elle/ayrıca teyit edilmeli.
- **Bu oturumda `device_bash` yok**: kod dosyalarını (`magaza.ts` türevleri) güvenle düzenlemek için dosyaları tek tek okuyup / staging ile indirip / `device_commit_files` ile geri yazmak gerekiyor — büyük ölçekte (605 ürün) hataya açık, adım adım ve muhtemelen bu oturumdan farklı bir oturumda (Mert'in belirttiği gibi) yapılması daha güvenli.

## 5) Önerilen devam planı (sıradaki oturum için)

1. `15_yeni_adaylar.csv`'deki 605 ürünü Mert ile birlikte **kategoriye göre gruplar halinde** gözden geçir (en büyük gruplar: Aksesuar, PLC modülü, Sensör, Kablo, Bağlantı kutusu, Klemens, Röle, Otomat/Sigorta/Pako şalter).
2. Her grup için: (a) yeni kategori mi açılacak yoksa mevcut bir kategoriye mi (örn. "Diğer ürünler") düşecek, (b) görsel kaynağı ve kullanım izni netleşsin (üretici sitesi mi, Mert'in kendi çektiği fotoğraf mı — BizimHesap'taki "Fotoğraf Linki" sütunu bazı kalemlerde zaten var, önce o kontrol edilebilir).
3. `15_eslesen.csv`'deki 37 kaydı (özellikle şüpheli 2 kayıt) siteyle elle teyit et; gerçekten yinelenen varsa hangi dosyadan silineceği belirlensin.
4. Uygulamaya, küçük ve geri alınabilir parçalar halinde (örn. tek bir kategori / 10-20 ürün) başlanması, her adımda `magaza.ts`'teki mevcut `dpu3()` benzeri şablon fonksiyonu örneğini takip etmesi önerilir.

## 6) Ekli dosyalar

- `15_eslesen.csv` — Depodaki, sitede muhtemelen zaten var olan 37 ürün.
- `15_yeni_adaylar.csv` — Depodaki, sitede bulunamayan 605 ürün (eklenebilir adaylar).
- `siparis-panosu-yedek-2026-10-13.json` — (önceki adımda gönderildi) AOM Sipariş Panosu günlük yedeği.
