# Autonics Güç Elektronikleri – ürün indeksi (03-10-2026)

Kaynak: Autonics Türkiye sitesi, **Ürün → Güç Elektronikleri** (3 kategori, 15 seri). Model listeleri Autonics'in seri sayfalarındaki model listesinden alındı (Mert'in Chrome'u ile, 03-10-2026). Sayılar Autonics sitesindeki "Model (n)" değeriyle birebir aynı. Sitede listelenmiş durdurulmuş (üretimden kalkmış) model yok.

Tam model listesi: `04_AUTONICS_GUC_ELEKTRONIGI_MODELLER_03-10-2026.csv` (1.509 satır; Excel ile açılır, `;` ayraçlı). Satışa sunulacak seriler / modeller bu dosyada **"Satışa sunulsun (E/H)"** sütununa işaretlenip fiyatlarla birlikte Claude'a verildiğinde mağazaya eklenir.

## Özet

| Kategori | Seri | Tanım | Model | Sitemizde |
|---|---|---|---|---|
| Anahtarlamalı güç kaynakları (SMPS) | SPA | Genel amaçlı SMPS, 30–400 W, 5 / 12 / 24 VDC | 13 | – |
| Anahtarlamalı güç kaynakları (SMPS) | SPB-A | DIN ray SMPS, 15–480 W, 5 / 12 / 24 / 48 VDC | 15 | – |
| Güç kontrol cihazları | DPU | Dijital tristörlü güç kontrol, monofaze ve trifaze, 110–480 V, 25–600 A | 840 | 9 ürün + 840 kodun tamamı kod sayfalarında |
| Güç kontrol cihazları | SPR1 | Monofaze ince güç kontrol, 110–440 VAC, 25–150 A | 192 | tamamı mağazada |
| Güç kontrol cihazları | SPR3 | Trifaze ince güç kontrol, 110–440 VAC, 25–150 A | 192 | tamamı mağazada |
| Güç kontrol cihazları | SPRM | Çok kanallı güç kontrol (tek faz 3 kanal veya 3 faz), 25–160 A | 14 | tamamı mağazada |
| Güç kontrol cihazları | SPRS | Modüler çok kanallı güç kontrol: güç modülleri 25–600 A + haberleşme modülleri | 19 | tamamı mağazada |
| Solid state röleler (SSR) | SR1, SRC1, SRH1, SRHL1, SRS1, SR3, SRH3, SRHL3 | Tek ve üç fazlı SSR, 1–75 A | 224 | 224 model (tamamı) |
| **Toplam** | **15 seri** | | **1.509** | **650 ürün + 831 DPU kodu** |

SSR serilerinin ayrıntılı indeksi: `03_AUTONICS_SSR_INDEKS_03-10-2026.md`.

---

## 1. Anahtarlamalı güç kaynakları (SMPS)

### SPA – Genel amaçlı SMPS (13 model)

Aşırı akım, çıkış kısa devre, aşırı ısınma ve aşırı gerilim koruması (Autonics kategori açıklaması).

| Model | Güç | Çıkış | Çıkış akımı | Giriş |
|---|---|---|---|---|
| SPA-030-05 | 30 W | 5 VDC | 6 A | 100–240 VAC |
| SPA-030-12 | 30 W | 12 VDC | 2,5 A | 100–240 VAC |
| SPA-030-24 | 30 W | 24 VDC | 1,5 A | 100–240 VAC |
| SPA-050-05 | 50 W | 5 VDC | 10 A | 100–240 VAC |
| SPA-050-12 | 50 W | 12 VDC | 4,2 A | 100–240 VAC |
| SPA-050-24 | 50 W | 24 VDC | 2,1 A | 100–240 VAC |
| SPA-075-05 | 75 W | 5 VDC | 15 A | 100–120 / 200–240 VAC |
| SPA-075-12 | 75 W | 12 VDC | 6,3 A | 100–120 / 200–240 VAC |
| SPA-075-24 | 75 W | 24 VDC | 3,2 A | 100–120 / 200–240 VAC |
| SPA-100-05 | 100 W | 5 VDC | 20 A | 100–120 / 200–240 VAC |
| SPA-100-12 | 100 W | 12 VDC | 8,5 A | 100–120 / 200–240 VAC |
| SPA-100-24 | 100 W | 24 VDC | 4,2 A | 100–120 / 200–240 VAC |
| SPA-400-24 | 400,8 W | 24 VDC | 16,7 A | 200–240 VAC |

### SPB-A – DIN ray SMPS (15 model)

Giriş 100–240 VAC / 90–350 VDC (kabul edilen 85–264 VAC). Model kodu: `SPB-A[güç W]-[çıkış V]`.

| Güç | 5 VDC | 12 VDC | 24 VDC | 48 VDC |
|---|---|---|---|---|
| 15 W | SPB-A015-05 | SPB-A015-12 | SPB-A015-24 | – |
| 30 W | SPB-A030-05 | SPB-A030-12 | SPB-A030-24 | – |
| 60 W | – | SPB-A060-12 | SPB-A060-24 | – |
| 120 W | – | SPB-A120-12 | SPB-A120-24 | – |
| 240 W | – | SPB-A240-12 | SPB-A240-24 | SPB-A240-48 |
| 480 W | – | – | SPB-A480-24 | SPB-A480-48 |

---

## 2. Güç kontrol cihazları

### DPU – Dijital tristörlü güç kontrol (840 model)

Model kodu: `DPU[faz][gerilim][gövde]-[akım][seçenek](-A)`

| Hane | Değerler |
|---|---|
| Faz | 1 = monofaze, 3 = trifaze |
| Gerilim | 1 = 110 V, 2 = 220 V, 3 = 380 V, 4 = 440 V, 5 = 480 V (480 V yalnız trifaze) |
| Gövde – akım (trifaze) | A: 25 / 40 / 50 A · B: 70 / 80 / 100 / 120 / 150 / 180 / 200 A · C: 250 / 350 A · D: 400 / 500 / 600 A |
| Gövde – akım (monofaze) | A: 25 / 40 / 50 / 70 A · B: 80 / 100 / 120 / 150 / 180 / 200 A · C: 250 / 350 A · D: 400 / 500 / 600 A |
| Seçenek | A = harici gösterge + RS485, D = harici gösterge, R = RS485, N = seçeneksiz |
| `-A` soneki | Yalnız trifazede, her seçenekte ayrı model olarak var; Autonics teknik tablosunda `-A`'lı ve `-A`'sız model arasında fark görünmüyor **[TEYİT]** |

| Grup | Model kodu | Model sayısı |
|---|---|---|
| Trifaze 110 / 220 / 380 / 440 / 480 V | DPU31, DPU32, DPU33, DPU34, DPU35 | 5 × 15 akım × 8 seçenek = 600 |
| Monofaze 110 / 220 / 380 / 440 V | DPU11, DPU12, DPU13, DPU14 | 4 × 15 akım × 4 seçenek = 240 |

Güç tüketimi: trifaze ≤ 60 W, monofaze ≤ 40 W (güç kontrolü). Sitemizde şu an DPU34 (440 V, trifaze) serisinden 9 model satışta.

### SPR1 – Monofaze ince güç kontrol (192 model) · SPR3 – Trifaze ince güç kontrol (192 model)

Kontrol girişi: 4–20 mA DC, 1–5 VDC, ON/OFF; besleme 100–240 VAC 50/60 Hz. Model kodu: `SPR1-[gerilim][akım][1][2][3]` (SPR3 aynı).

| Hane | Değerler |
|---|---|
| Gerilim | 1 = 110 VAC, 2 = 220 VAC, 3 = 380 VAC, 4 = 440 VAC |
| Akım | 25, 35, 50, 70, 100, 150 A |
| 1. seçenek | N = haberleşmesiz, T = RS485 haberleşme |
| 2. seçenek | N = normal kontrol, F = geri beslemeli kontrol (statik akım / gerilim / güç) |
| 3. seçenek | N / F – Autonics teknik tablosunda fark görünmüyor **[TEYİT]** |

Her seride 4 gerilim × 6 akım × 8 seçenek = 192 model (tamamı CSV'de).

### SPRM – Çok kanallı güç kontrol (14 model)

Tek faz 3 kanal veya 3 faz; serbest gerilim 220–440 VAC 50/60 Hz.

| Akım | RS485 | RS485 + EtherCAT |
|---|---|---|
| 25 A | SPRM3-F25R | SPRM3-F25EC |
| 40 A | SPRM3-F40R | SPRM3-F40EC |
| 55 A | SPRM3-F55R | SPRM3-F55EC |
| 70 A | SPRM3-F70R | SPRM3-F70EC |
| 90 A | SPRM3-F90R | SPRM3-F90EC |
| 110 A | SPRM3-F110R | SPRM3-F110EC |
| 160 A | SPRM3-F160R | SPRM3-F160EC |

### SPRS – Modüler çok kanallı güç kontrol (19 model)

Tek fazlı, tek fazlı çift ve 3 fazlı kontrol; güç modülleri serbest gerilim 220–490 VAC; gösterge 5 haneli 11 segment LCD. Sistem = güç modülü(leri) + haberleşme modülü.

- Güç modülleri (14): SPRS-F25, F40, F55, F70, F90, F110, F150, F180, F200, F250, F350, F400, F500, F600 (sayı = akım, A)
- Haberleşme modülleri (5): SPRS-CM-R (RS485), SPRS-CM-EI (RS485 + EtherNet/IP), SPRS-CM-EC (RS485 + EtherCAT), SPRS-CM-PN (RS485 + PROFINET), SPRS-CM-CL (RS485 + CC-Link)

---

## 3. Solid state röleler (SSR) – 224 model, tamamı sitemizde

SR1 (40), SRC1 (9), SRH1 (42), SRHL1 (25), SRS1 (24), SR3 (28), SRH3 (28), SRHL3 (28). Ayrıntı: `03_AUTONICS_SSR_INDEKS_03-10-2026.md`.

---

## Sonraki adım

1. Satışa sunulacak serileri seç (ör. "SPA ve SPB-A tamamı, SPR1 yalnız 220 V").
2. Fiyatları ver (bayi listesi ekran görüntüsü veya CSV'deki fiyat sütunları).
3. Claude seçilen seriler için her modelin teknik tablosunu ve görselini Autonics sayfasından okuyup mağazaya ekler (SSR'de yapıldığı gibi).

## Güncelleme (03-10-2026)

- SPR1, SPR3, SPRM, SPRS: 417 modelin tamamı mağazaya ürün olarak eklendi (Autonics teknik tabloları, gövde görselleri).
- DPU: kalan modeller ürün olarak eklenmedi; 840 kodun tamamı `/magaza/dpu-kodlari` altındaki 9 grup sayfasında aranabilir şekilde listelendi. Müşteri herhangi bir kodu Google'da aradığında bu sayfaya ulaşabilir; kodun yanında e-posta ve WhatsApp teklif bağlantısı var.
- SMPS (SPA, SPB-A) henüz sitede değil.
