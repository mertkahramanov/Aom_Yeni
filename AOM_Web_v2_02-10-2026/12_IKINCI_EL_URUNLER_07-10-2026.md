# 12 · 2. el ürünler (07-10-2026)

Kaynak: Mert'in stok listesi "Panel Hattı Parça Listesi" (1.330 satır).

## Ne yapıldı
- Aynı marka + kod + özellik satırları birleştirildi, adetler toplandı. Etikette koda eklenmiş lot / tarih / seri numaraları (ör. Airtac sensörlerde "21AV", HIWIN arabalarında "17082P-50400") koddan ayrıldı.
- **Depo konumu (sandık / palet no) sitede yayınlanmaz**; yalnız stok adedi gösterilir.
- Sitede **809 ürün**, 18 "2. El · …" kategorisinde. Kod olmayan **133 satır** (mil, menteşe, takoz, stoper vb.) sitede yok, aşağıda listelendi.
- Teknik tablo kategori şablonuna göre sabit satırlı; değerler yalnız üreticinin kod açılımından veya listedeki özellikten yazıldı, bilinmeyen alan boş.
- Kod güveni: Yüksek 121, Orta 390, Düşük 298. "Düşük" ürünlerde marka/kod etiketle teyit edilmeli [TEYİT].
- Görsel: 215 üründe üretici görseli (Siemens, Mitsubishi Electric, Schneider Electric, Airtac, SMC, HIWIN, Autonics, Shihlin). Diğerleri marka adıyla gösterilir.
- Fiyat yok: "Teklif isteyin". Durum / test / garanti alanı boş (bilgi gelince eklenir: src/data/ikinci-el.ts).

## Kategoriler
- Pnömatik ve vakum: 132
- Rulmanlar ve lineer hareket: 105
- Sigortalar: 101
- Terminal bloklar ve klemensler: 76
- PLC ve PLC modülleri: 60
- Servo motorlar ve sürücüler: 56
- Şalt ürünleri: 47
- Sensörler ve enkoderler: 46
- Butonlar, anahtarlar ve sinyal lambaları: 39
- Motorlar ve redüktörler: 36
- Güç kaynakları ve trafolar: 26
- Röleler ve röle soketleri: 21
- Hız kontrol cihazları (inverter): 18
- Güç aktarma: kasnak ve dişli: 15
- Operatör panelleri, ekranlar ve kontrol cihazları: 13
- Fanlar: 9
- Konveyör ve mekanik parçalar: 5
- Endüstriyel haberleşme: 4

## Teyit edilmesi gerekenler (örnekler)
- JSCC "A025 D21M05Y020CN" vb. inverter satırları: etiketteki seri numarası yazılmış, model kodu yok.
- Omron 25X20C2 / 05Z6CX2 / 16Z20C3, Weidmüller SACK: etiket/lot kodu; gerçek ürün kodu teyit edilmeli.
- Mitsubishi FX3U-64M: kodun sonu eksik (MR/ES-A veya MT/ES-A).
- HIWIN muadili CHNDS / SHAC ve markasız HG arabaları: marka teyidi.
- Eaton "GB/T14048.3": yalnız standart numarası yazılmış.

## Sitede olmayan (kodsuz) satırlar
| Satır | Parça | Marka | Özellik | Adet |
|---|---|---|---|---|
| 3 | MİL | - | İÇ ÇAP 10MM DIŞ ÇAP 40 MM BOY 370 MM | 108 |
| 4 | MİL | - | İÇ ÇAP 8 MM DIŞ ÇAP 30 MM BOY 250 MM | 4 |
| 5 | MİL | - | İÇ ÇAP 10 MM DIŞ ÇAP 40 MM BOY 500 MM | 4 |
| 6 | MİL | - | İÇ ÇAP 15 MM DIŞ ÇAP 25 MM BOY 320 MM | 4 |
| 58 | POLYAMID | - | İÇ ÇAP 20 MM DIŞ 70 MM BOY 80 MM | 144 |
| 64 | VANTUZ YATAĞI | - | YATAK ÇAPI 85MM DERİNLİK 32 MM | 12 |
| 91 | BASINÇ GÖSTERGESİ | AIRTAC | - | 4 |
| 93 | BASINÇ GÖSTERGESİ | - | - | 1 |
| 94 | BASINÇ GÖSTERGESİ VE AYARLAYICI | - | - | 1 |
| 124 | SOLENOİD VALF | - | - | 4 |
| 192 | SENSÖR | AUTONICS | - | 1 |
| 198 | MANYETİK SENSÖR | - | ÇAP 12 MM BOY 42 MM | 16 |
| 199 | MANYETİK SENSÖR | - | ÇAP 12 MM BOY 47 MM | 16 |
| 200 | MANYETİK SENSÖR | - | ÇAP 11 MM BOY 52 MM | 2 |
| 201 | MANYETİK SENSÖR | - | ÇAP 12 MM BOY 70 MM | 2 |
| 202 | MANYETİK SENSÖR | - | ÇAP 18 MM BOY 53 MM | 1 |
| 205 | BAĞLANTI KUTUSU | - | - | 10 |
| 206 | DİJİTAL SICAKLIK KONTROL PANELİ | FRİGO BLOCK | - | 2 |
| 215 | KUTULU BUTON | - | 2 BUTON | 5 |
| 218 | KUTULU BUTON | TAYEE | 4 BUTON | 2 |
| 220 | KUTULU BUTON | EATON | 1 BUTON | 55 |
| 243 | TRANSISTÖR KARTI | - | 8'Lİ | 1 |
| 244 | ELEKTRONİK DEVRE | - | - | 2 |
| 245 | TERMİNAL BLOK | - | 32'Lİ | 2 |
| 250 | TERMİNAL BLOK | - | 12'Lİ | 1 |
| 252 | VALF | METAL WORK | - | 1 |
| 259 | MANYETİK SENSÖR | - | ÇAP 10 MM BOY 55 MM | 2 |
| 260 | TRAFO | - | 220V-24V | 1 |
| 261 | BİLYALI TEKERLEK | - | - | 24 |
| 262 | POLYAMID PARÇALARI | - | - | 89 |
| 263 | MIKNATISLI KİLİT | - | - | 15 |
| 264 | MENTEŞE | - | - | 44 |
| 265 | DOLAP KİLİDİ | - | - | 2 |
| 266 | BORU KELEPÇESİ | - | - | 8 |
| 267 | KİLİTLEME KOLU | - | - | 5 |
| 272 | BÜYÜK STOPER | - | ÇAP 70 MM | 8 |
| 273 | TEKER STOPER | - | ÇAP 48 MM | 21 |
| 274 | KÜÇÜK STOPER | - | - | 25 |
| 275 | DESTEK TAKOZU | - | - | 19 |
| 276 | KARIŞIK KAUÇUK TAKOZ | - | - | 100 |
| 279 | MİL BİLEZİĞİ | - | İÇ ÇAP 40 MM DIŞ ÇAP 80 MM EN 23 MM | 33 |
| 280 | STOPER PARÇALARI | - | - | 27 |
| 353 | KABLOSUZ ROLLER | - | İÇ ÇAP 50 MM DIŞ ÇAP 64 MM BOY 600 MM | 4 |
| 354 | KABLOSUZ ROLLER | - | İÇ ÇAP 52 MM DIŞ ÇAP 64 MM BOY 835 MM | 6 |
| 358 | KABLOSUZ ROLLER | - | İÇ ÇAP 52 MM DIŞ ÇAP 64 MM BOY 1550 MM | 5 |
| 359 | KABLOSUZ ROLLER | - | İÇ ÇAP 52 MM DIŞ ÇAP 64 MM BOY 1490 MM | 1 |
| 360 | KABLOSUZ METAL ROLLER | - | İÇ ÇAP 52 MM DIŞ ÇAP 58 MM BOY 1480 MM | 11 |
| 361 | KABLOSUZ METAL ROLLER | - | İÇ ÇAP 52 MM DIŞ ÇAP 80 MM BOY 1480 MM | 9 |
| 362 | ROLLER | - | TAMBUR ÇAP 25 MM DIŞ ÇAP 90 MM BOY 1670 MM | 2 |
| 363 | ROLLER | - | TAMBUR ÇAP 35 MM DIŞ ÇAP 110 MM BOY 1750 MM | 3 |
| 364 | ROLLER | - | TAMBUR ÇAP 25 MM DIŞ ÇAP 100 MM  BOY 1670 MM | 3 |
| 365 | KONVEYÖR AYAĞI | - | ÇAP 99 MM | 223 |
| 366 | KONVEYÖR AYAĞI | - | ÇAP 79 MM | 17 |
| 367 | KİLİTLİ TEKER | - | 36X65 | 14 |
| 368 | SABİT TEKER | - | 33X75 | 4 |
| 369 | SABİT TEKER | - | 100X32 | 5 |
| 370 | SABİT TEKER | - | 80X30 | 3 |
| 371 | SABİT TEKER | - | 80X25 | 1 |
| 381 | DİŞLİ KASNAK | - | KAMA KANALI 3MM İÇ ÇAP 20 MM DIŞ ÇAP 70 MM BOY 30 MM | 5 |
| 382 | DİŞLİ KASNAK | - | KAMA KANALI 3MM İÇ ÇAP 20 MM DIŞ ÇAP 48 MM BOY 26 MM | 8 |
| 384 | DÜZ KASNAK | - | İÇ ÇAP 35 MM DIŞ ÇAP 65 MM BOY 36 MM | 156 |
| 386 | DİŞLİ KASNAK | - | KAMA KANALI 3 MM İÇ ÇAP 14 MM DIŞ ÇAP 27 MM BOY 40 MM | 1 |
| 387 | DİŞLİ KASNAK | - | İÇ ÇAP 18 MM DIŞ ÇAP 55 MM BOY 44 MM | 1 |
| 388 | DİŞLİ KASNAK | - | İÇ ÇAP 24 MM DIŞ ÇAP 45 MM BOY 58 MM | 1 |
| 420 | RULMAN | ŞAFT-RULMAN | RULMAN ÇAPI 90 MM | 8 |
| 502 | SPREY VALF | - | - | 1 |
| 503 | KÖŞE BAĞLANTI | - | 40X40X35MM3 | 359 |
| 504 | KÖŞE BAĞLANTI | ARİ | 40X40X25MM3 | 104 |
| 505 | KÖŞE BAĞLANTI | DOĞUŞ KALIP | 54X54X53MM3 | 8 |
| 506 | KÖŞE BAĞLANTI | - | 78X78X79MM3 | 27 |
| 507 | KÖŞE BAĞLANTI | - | 85X85X43MM3 | 6 |
| 508 | KÖŞE BAĞLANTI | - | 60X60X60MM3 | 2 |
| 509 | KÖŞE BAĞLANTI | - | 80X80X40MM3 | 1 |
| 510 | KÖŞE BAĞLANTI | - | 40X50X35MM3 | 2 |
| 511 | KÖŞE BAĞLANTI | - | 40X60X35MM3 | 1 |
| 512 | KÖŞE BAĞLANTI | - | 30X30X30MM3 | 1 |
| 513 | KÖŞE BAĞLANTI | - | 60X60X33MM3 135 DERECE | 48 |
| 518 | TERMOKUPL FİŞLERİ | PATENTED | AL CH | 236 |
| 519 | SOLDERİNG LEHİM UCU | - | - | 109 |
| 520 | POLYAMİD | - | - | 8 |
| 548 | KLEMENS | - | 3'LÜ | 21 |
| 549 | KLEMENS | - | 2'Lİ | 5 |
| 550 | KLEMENS | - | 4'LÜ | 1 |
| 551 | KLEMENS | - | 5'Lİ | 1 |
| 552 | KLEMENS | ONKA | 10'LU 400V | 1 |
| 553 | KLEMENS | - | 11'Lİ | 1 |
| 555 | KLEMENS | JST | 4'LÜ | 4 |
| 556 | KLEMENS | JST | 9'LU | 4 |
| 559 | KLEMENS | JST | 5'Lİ | 2 |
| 566 | VAKUM POMPASI PALETİ | - | - | 20 |
| 594 | SU GEÇİRMEZ SICAKLIK SENSÖRÜ | - | - | 1 |
| 597 | LED IŞIK | - | 220-240V 50Hz 21W | 1 |
| 598 | LED IŞIK | - | 6500K 220VAC 50HZ 36W | 1 |
| 603 | SABİT TEKER | - | 100X35 | 1 |
| 605 | RÖLE SOKETİ | - | 6A 250VAC | 1 |
| 612 | BATARYA | - | - | 1 |
| 616 | IŞIK KULESİ | EMAS | 24V | 1 |
| 623 | SERVO MOTOR KABLOLARI | - | - | 114 |
| 643 | RULMAN YATAĞI | AIRTAC | EN 30MM BOY 25MM UZUNLUK 1100 MM 8MM VİDA ÇAPI | 4 |
| 644 | RULMAN YATAĞI | AIRTAC | EN 30MM BOY 25MM UZUNLUK 860 MM 8MM VİDA ÇAPI | 4 |
| 646 | RULMAN YATAĞI | AIRTAC | EN 30MM BOY 25MM UZUNLUK 770 MM 8MM VİDA ÇAPI | 1 |
| 648 | RULMAN YATAĞI | AIRTAC | EN 30MM BOY 25MM UZUNLUK 620 MM 8MM VİDA ÇAPI | 4 |
| 649 | RULMAN YATAĞI | AIRTAC | EN 30MM BOY 25MM UZUNLUK 400 MM 8MM VİDA ÇAPI | 4 |
| 650 | RULMAN YATAĞI | AIRTAC | EN 30MM BOY 25MM UZUNLUK 360 MM 8MM VİDA ÇAPI | 8 |
| 652 | RULMAN YATAĞI | - | EN 25MM BOY 22MM UZUNLUK 270 MM 7MM VİDA ÇAPI | 11 |
| 653 | RULMAN YATAĞI | - | EN 25MM BOY 22MM UZUNLUK 340 MM 7MM VİDA ÇAPI | 8 |
| 654 | RULMAN YATAĞI | - | EN 25MM BOY 22MM UZUNLUK 400 MM 7MM VİDA ÇAPI | 8 |
| 657 | RULMAN YATAĞI | - | EN 20MM BOY 17MM UZUNLUK 557 MM 6 MM VİDA ÇAPI | 4 |
| 658 | RULMAN YATAĞI | - | EN 20MM BOY 17MM UZUNLUK 640 MM 6 MM VİDA ÇAPI | 2 |
| 659 | RULMAN YATAĞI | - | EN 20MM BOY 17MM UZUNLUK 600 MM 6 MM VİDA ÇAPI | 2 |
| 660 | RULMAN YATAĞI | - | EN 20MM BOY 18MM UZUNLUK 141 MM 6 MM VİDA ÇAPI | 1 |
| 661 | RULMAN YATAĞI | - | EN 20MM BOY 18MM UZUNLUK 272 MM 6 MM VİDA ÇAPI | 3 |
| 662 | RULMAN YATAĞI | - | EN 20MM BOY 18MM UZUNLUK 310 MM 6 MM VİDA ÇAPI | 6 |
| 663 | RULMAN YATAĞI | - | EN 20MM BOY 18MM UZUNLUK 390 MM 6MM VİDA ÇAPI | 6 |
| 667 | RULMAN YATAĞI | - | EN 20MM BOY 18MM UZUNLUK 700 MM 6 MM VİDA ÇAPI | 10 |
| 668 | RULMAN YATAĞI | - | EN 20MM BOY 18MM UZUNLUK 814 MM 6 MM VİDA ÇAPI | 11 |
| 671 | RULMAN YATAĞI | - | EN 20 MM BOY 18MM UZUNLUK 2540 MM 6 MM VİDA ÇAPI | 2 |
| 672 | RULMAN YATAĞI | - | EN 20MM BOY 18MM UZUNLUK 3000MM 6MM VİDA ÇAPI | 1 |
| 674 | RULMAN YATAĞI | - | EN 15MM BOY 13MM UZUNLUK 1400MM 5MM VİDA ÇAPI | 1 |
| 676 | RULMAN YATAĞI | - | EN 15MM BOY 15MM UZUNLUK 640MM 4MM VİDA ÇAPI | 4 |
| 677 | RULMAN YATAĞI | AIRTAC | EN 15MM BOY 15MM UZUNLUK 700MM 4MM VİDA ÇAPI | 4 |
| 678 | RULMAN YATAĞI | - | EN 15MM BOY 15MM UZUNLUK 1450MM 4 MM VİDA ÇAPI | 4 |
| 679 | RULMAN YATAĞI | - | EN 15MM BOY 15MM UZUNLUK 1500MM 4MM VİDA ÇAPI | 2 |
| 680 | RULMAN YATAĞI | - | EN 15MM BOY 15MM UZUNLUK 2660MM 4MM VİDA ÇAPI | 2 |
| 822 | PRİZ | PICC | 10-16A 250V | 1 |
| 1085 | KONVEYÖR BANT | - | UZUNLUK 2730 MM GENİŞLİK 180 MM EN 95 MM | 4 |
| 1204 | RÖLE SOKETİ | - | - | 5 |
| 1240 | TERMİNAL BLOK | WEİDMÜLLER | - | 182 |
| 1238 | RÖLE SOKETİ | - | - | 7 |
| 1246 | RÖLE SOKETİ | - | - | 9 |
| 1249 | TERMİNAL BLOK | WEİDMÜLLER | - | 340 |
| 1242 | RÖLE SOKETİ | - | - | 5 |
| 1250 | TERMİNAL BLOK | WEİDMÜLLER | - | 64 |

Tam liste: 12_IKINCI_EL_URUNLER_07-10-2026.csv
