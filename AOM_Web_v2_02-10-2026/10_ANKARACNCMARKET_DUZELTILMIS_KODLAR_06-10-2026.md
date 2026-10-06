# Ankara CNC Market ürünleri: orijinal kodlara göre düzeltme (06-10-2026)

Kaynak liste: `09_ANKARACNCMARKET_URUNLER_06-10-2026.csv` (858 ürün). Her ürünün orijinal üreticisi ve parça numarası (MPN) üretici siteleri, katalogları ve veri sayfalarıyla araştırıldı. Ankaracncmarket'in fotoğrafları ve metinleri kullanılmadı; görseller yalnız üreticinin kendi sitesinden alınacak. Doğrulanamayan her bilgi CSV'de **[TEYİT]** ile ve "Güven" sütununda işaretli.

## Özet

- Ürün: **858**; benzersiz marka + kod: 826 (çift kayıtlar aşağıda).
- Resmi görsel bulunamadı: 276
- Marka belirsiz (jenerik): 275
- Üretici görseli var: 183
- Üretici görsel yayınlamıyor: 124
- Güven: Orta 488, Düşük 197, Yüksek 173
- Kaydında hata veya tutarsızlık bulunan ürün: 455

## AOM kategorileri

| Kategori | Ürün | Üretici görseli |
|---|---|---|
| Fanlar | 264 | 40 |
| Röleler ve röle soketleri | 101 | 93 |
| CNC yedek parçaları | 100 | 0 |
| Potansiyometreler ve reostalar | 67 | 9 |
| Rulmanlar, kilit somunları ve yaylar | 50 | 3 |
| Sigortalar ve termostatlar | 49 | 1 |
| Sviç, sensör ve butonlar | 39 | 16 |
| Takım bağlama ve ATC parçaları | 38 | 4 |
| Diyotlar | 33 | 0 |
| Servo ve iş mili enkoderleri | 32 | 0 |
| El çarkları (MPG) | 18 | 0 |
| Solid State Röleler (SSR) | 17 | 17 |
| Ölçme ve kalibrasyon | 17 | 0 |
| Fan telleri ve filtreleri | 10 | 0 |
| Veri aktarımı | 8 | 0 |
| Makine lambaları | 7 | 0 |
| Sarf malzemeleri | 6 | 0 |
| Güç kaynakları | 2 | 0 |

## Markalar

| Marka | Ürün | Üretici görseli | Not |
|---|---|---|---|
| (markasız) | 273 | 0 |  |
| NCR | 106 | 106 | Nicerelay, Hong Kong (ncr.hk); ürünlerin üzerinde "NCR-CLION" yazıyor |
| Fanuc | 79 | 0 | Fanuc yedek parça görseli yayınlamıyor |
| Kaku | 73 | 0 | Resmi site (kaku.com.tw) sertifika hatası veriyor; Chrome ile tekrar denenecek |
| Lüfter | 69 | 0 | Resmi üretici sitesi yok; Türk ithalatçı markası |
| Mitsubishi Electric | 38 | 0 | Yedek parça görseli yayınlamıyor |
| Runda | 32 | 29 | Shenzhen Runda (szrunda.com); seri görselleri |
| Demex | 21 | 0 | Resmi site yok |
| Future Life | 14 | 0 |  |
| Sanyo Denki | 13 | 2 | Fanuc'a özel numaralar katalogda yok |
| NMB | 12 | 0 | nmbtc.com parça sayfalarında fotoğraf yok |
| Wiikool | 12 | 0 | Resmi site yok |
| Acrow | 12 | 0 |  |
| Dossy | 9 | 8 |  |
| INK | 8 | 0 | Resmi site yok; muhtemelen ithalatçı etiketi [TEYİT] |
| Balluff | 7 | 7 |  |
| Omron | 5 | 5 |  |
| Clion | 5 | 4 |  |
| Vishay | 5 | 5 |  |
| Daito | 4 | 1 |  |
| Panasonic | 4 | 0 |  |
| Hinaka | 4 | 2 |  |
| Frizlen | 4 | 4 |  |
| Bochen | 4 | 0 |  |
| Sharp | 3 | 0 |  |
| Melco Technorex | 3 | 0 |  |
| Azbil | 3 | 3 |  |
| E-T-A | 3 | 0 |  |
| NSK | 3 | 3 |  |
| C-TEK | 2 | 0 |  |
| Toshiba | 2 | 0 |  |
| Mean Well | 2 | 0 | Site otomatik erişimi engelliyor; Chrome ile alınacak |
| Kwangwoo | 2 | 0 |  |
| Sunflow | 2 | 0 |  |
| AB Elektronik | 2 | 0 |  |
| Bright | 2 | 2 |  |
| Doosan | 2 | 0 |  |
| Hartford | 2 | 0 |  |
| Talons | 2 | 0 |  |
| Honda Tsushin | 1 | 0 |  |
| FDK | 1 | 0 |  |
| Tosoku | 1 | 0 |  |
| Duracell | 1 | 0 |  |
| Euchner | 1 | 1 |  |
| U-Chain | 1 | 0 |  |
| Savior | 1 | 0 |  |
| Longflow | 1 | 1 |  |
| Huntsman | 1 | 0 |  |
| Klüber | 1 | 0 |  |

## Kayıtlarda bulunan başlıca hatalar

- **Uydurma iç kodlar:** Fanuc, Mitsubishi ve mekanik ürünlerin neredeyse tamamında kod rastgele harf dizisi (ör. AEKLPUXY) ya da sıra numarası (240, RL 32, LFT 4, POT 26, DY 2, TS 25). Hepsi orijinal parça numarası ile değiştirildi.
- **Fanuc yazımı:** `#` yerine `/` kullanılmış (A90L-0001-0441/39 → A90L-0001-0441#39; spindle fanlarında /R, /F; A06B-6114-K220/S, /E). A06B-6093-H152 beta serisi (SVU 1-20), alfa değil. A16B-2200-0360 "1/4 eksen" değil, 3/4 eksen kartı. A98L-0005-0252 7 tuşlu; 12 tuşlu olan A98L-0005-0255. Kablo uzunluğu Fanuc biçiminde "#L10R03" gibi yazılır.
- **NMB:** "S5W" yazım hatası değil, Fanuc'a özel varyant (2406VL-S5W-B79 vb.).
- **Mitsubishi Q6BAT:** Hücre ER17335SE-R değil, CR17335SE-R (3,0 V) [TEYİT].
- **Balluff BES 516-300-S205-D-PU-01:** Balluff'ta "-PU-01" yok; -PU-03 (3 m) veya -PU-05 (5 m) — kablo boyu üründen okunmalı.
- **Röleler (NCR):** Başlıklardaki akımlar katalogla uyuşmuyor (HHC68A 10 A, NNC68BZL 5 A, NRP07 7/10 A, NRA07 80 A, NRA09 30/20 A). Katalogda olmayan bobin / akım seçenekleri var (HHC69A 220 V AC ve 48 V DC, NRP04 48 V DC, HHG1-1 3/4/5 A, HHG1D-1 5 A, HHG2-1 DC kontrol). Yanlış kategoriler: NRP07 ↔ NRP04, NRA04/07 "HHC67G" altında, HHG1-1 "HHG2" altında. PF083A 2C sokettir, 3C için PF113A.
- **Termostatlar:** STG-MFR012 higrostat (nem); STG-ZR011 ikili termostat. Orijinal Stego olduklarına kanıt yok.
- **Potansiyometreler:** "WHO162" doğrusu WH0162 (sıfır). 1M pot kodu 1K yazılmış. 5 W potlarda tip WX112 olmalı; değer kodları yanlış (220R→220K, 470R→470K, 50R→47K). WXD3-13 10 turludur, başlıkta 7 tur yazıyor. Vishay 534 tam numaraları 534-1-1-101/102/202/502/103.
- **Diyotlar:** 1N4148 sinyal diyodu, P600M tekli diyot (köprü değil). KBPC610 1000 V (başlıkta 100 V). MP5010 50 A (başlıkta 55 A). Vidalı diyotların doğru adı 25HF(R)120, 40HF(R)120, 70HF(R)120; kamçılı 150U160 / 150UR160.
- **Fanlar:** ölçü ile kategori uyuşmazlıkları (150×150 ürün 160×160 altında, 180 mm ürün 160×160 altında vb.), aynı kodun farklı gerilimde iki üründe kullanılması (WK4020HSL 12 V ve 24 V; INK-12025HSL / NK-12025HSL), Demex Y-Y8038H48B başlıkta 12 V. Kaku KA9225M2X başlıkta 12 V, kod 24 V.
- **Mekanik:** Hinaka BPT-10U5S45S13M Hinaka kataloğunda yok (BPT-10U5S45P13M var) [TEYİT]. Çanak yayların 5 ölçüsü DIN 2093 tablosunda yok. "Turcide" doğrusu Turcite.

## Aynı kodu taşıyan kayıtlar

Kablo uzunluğu, ikili fan, motor gücü gibi farkı olanlar sitede ayrı ürün olarak, gerçek çift kayıtlar tek ürün olarak eklenecek.

| Kod | Kayıt sayısı | Eski başlıklar |
|---|---|---|
| NMB 3610ML-05W-B49 | 2 | A90L-0001-0488 - NMB 3610ML-05W-B49 SİYAH SOKET FANUC SÜRÜCÜ FANI / FANUC 92X92X25 SÜRÜCÜ FANI 3610ML-05W-B49 |
| NMB 1608VL-S5W-B69 | 2 | A90L-0001-0575#A - NMB 1608VL-S5W-B69 FANUC SÜRÜCÜ FANI / A90L-0001-0575#B - NMB 1608VL-S5W-B69 FANUC SÜRÜCÜ FANI İKİLİ |
| Fanuc A98L-0001-0519 | 3 | A98L-0001-0519 FANUC SOFTKEY 19,2 CM / A98L-0001-0519 FANUC SOFTKEY 20CM / A98L-0001-0519 FANUC SOFTKEY İÇ BUTONLU FİLM |
| Fanuc A660-2005-T505 | 3 | FANUC ENCODER KABLOSU 10 METRE - A660-2005-T505#L-10M / FANUC ENCODER KABLOSU 5 METRE - A660-2005-T505#L-5M / FANUC ENCODER KABLOSU 7 METRE - A660-2005-T505#L-7M |
| Fanuc A660-2005-T506 | 5 | FANUC ENCODER KABLOSU 15 METRE - A660-2005-T506#L-15M / FANUC ENCODER KABLOSU 10 METRE - A660-2005-T506#L-10M / FANUC ENCODER KABLOSU 3 METRE - A660-2005-T506#L-3M / FANUC ENCODER KABLOSU 5 METRE - A660-2005-T506#L-5M / FANUC ENCODER KABLOSU 7 METRE - A660-2005-T506#L-7M |
| Toshiba ER6VC119A | 2 | ER6VC119A TOSHIBA 3.6V PİL / ER6VC119A TOSHIBA 3.6V PİL KAHVERENGİ SOKET |
| Mitsubishi Electric MBE205 | 2 | MITSUBISHI MAGNETIC RING MBE205 MBE205S2 ENCODER / MITSUBISHI MBE205 ENCODER |
| Mitsubishi Electric OSA105S5A | 2 | MITSUBISHI OSA105S5A ENCODER / MITSUBISHI OSA105S5A ENCODER (2.EL) |
| Mitsubishi Electric OSA18-130 | 2 | MITSUBISHI OSA18-130 ENCODER 1kw (HC-SFS102) / MITSUBISHI OSA18-130 ENCODER 3.5kw (HC-SFS352) |
| Runda RS1225S24VH | 2 | 120X120X25MM 24V 0.19A 2700RPM KARE FAN / 120X120X25MM-24VDC-0.19A |
| Kaku KU190AHA2BML | 2 | LTC Q190 - 220VAC / Q190-220VAC |
| Lüfter LTD1225M1S | 2 | 120X120X25mm 12VDC 0,50AMPER KARE FAN / 120X120X25MM-12VDC-0.50A |
| Lüfter LTD5015H2S | 2 | 50X50X15MM 24V DC KARE FAN (LTD5015H2S) / 50X50X15MM-24VDC-0.18A |
| Lüfter LTD9238M2S | 2 | 92X92X38MM 24VDC KARE FAN (LTD9238M2S) / 92X92X38MM-24VDC-0.75A |
| Lüfter LTA6030M2B | 2 | 60X60X30MM 220V AC KARE FAN (LTA6030M2B) / 60X60X32MM 220 VAC |
| Wiikool WK4020HSL | 2 | 40X40X20MM-12VDC-0.13A / 40X40X20MM-24VDC-0.09A |
| NCR HHC68B-2C-12VAC | 2 | NCR-CLİON RÖLE HHC68B - 2C - 12V AC / ROLE-MY2-12VAC-5A |
| NCR HHC68B-3C-12VAC | 2 | NCR-CLİON RÖLE HHC68B - 3C - 12V AC / ROLE-MY3-12VAC-5A |
| NCR HHC68B-3C-24VAC | 2 | NCR-CLİON RÖLE HHC68B - 3C - 24V AC / ROLE-MY3-24VAC-5A |
| NCR HHC68B-2C-48VAC | 2 | NCR-CLİON RÖLE HHC68B - 2C - 48V AC / ROLE-MY2-48VAC-5A |
| NCR HHC68B-3C-48VAC | 2 | NCR-CLİON RÖLE HHC68B - 3C - 48V AC / ROLE-MY3-48VAC-5A |
| NCR HHC70A-2C-12VAC | 2 | NCR-CLİON RÖLE HHC70 - 2C - 12V AC / ROLE-MK2P-12VAC-10A |
| NCR NNC69KTL-2Z-24VDC | 2 | NNC69KTL-2Z 24 DC / ROLE-PCB-24VDC-8A |
|  Resetli termik sigorta 12 A (L2 model) | 2 | RESETLİ TERMİK SİGORTA 12 AMPER (L2 MODEL) / SG-TERMIK-RESETLİ |
| NCR NRP04-C24DH | 2 | ROLE-TELEKOM-24VDC-1A / Telekom Röle - 24 VDC |
| NCR NRP04-C12DH | 2 | ROLE-TELEKOM-12VDC-1A / Telekom Röle - 12 VDC |
|  BT40 ATC potu | 2 | BT 40 ATC POTU / BT 40 ATC POTU |

## Açık kalanlar (en sona bırakılanlar)

1. **Görseller:** NCR'nin 35 görseli indirildi, temizlendi ve 106 kayda (sitede 97 ürün) eşlendi. Diğer üreticilerin görselleri (Runda 17, Dossy 7, Balluff 5, Azbil 3, Clion 2, Bright 2, Sanyo Denki, Euchner, Vishay, NSK, Hinaka, Longflow, Daito) Chrome indirmesi tamamlanınca eklenecek. Omron ve Frizlen sayfalarındaki görseller küçük simge boyutunda (36–55 px); bunlar için daha büyük üretici görseli aranacak. Kaku, Mean Well, Klüber, Araldite, Acrow ve Mitsubishi pil sayfaları Chrome ile tekrar denenecek.
2. **Görseli olmayan ürünler:** Fanuc / Mitsubishi parçaları, markasız ürünler ve resmi sitesi olmayan markalar (Lüfter, Demex, Wiikool, INK). Bunlar için ürünün kendi fotoğrafı çekilmeli; başka satıcıların görselleri kullanılmayacak.
3. **[TEYİT] işaretli kodlar:** Düşük güvenli kayıtlar ("Güven: Düşük") ürün etiketinden kontrol edilmeli: kod tanımı olmayan Fanuc / Mitsubishi soket ve kabloları, E-T-A sigortaların serisi, Kaku küçük DC fan kodları, Bochen 22 mm potlar, Hinaka BPT piston kodu.
4. **Fiyat:** Ankaracncmarket fiyatları CSV'de yalnız referans olarak duruyor; sitede fiyat yerine "Teklif isteyin" kullanılacak, AOM fiyatı belirlenince eklenir.

## Dosyalar

| Dosya | İçerik |
|---|---|
| `10_ANKARACNCMARKET_DUZELTILMIS_KODLAR_06-10-2026.md` | Bu belge |
| `10_ANKARACNCMARKET_DUZELTILMIS_KODLAR_06-10-2026.csv` | 858 ürün: AOM kategorisi, marka, orijinal kod, diğer kodlar, AOM ürün adı, teknik bilgiler, eski başlık/kod, referans fiyat, görsel durumu ve adresi, güven, kayıttaki hata, not (Excel, ; ayraçlı) |
