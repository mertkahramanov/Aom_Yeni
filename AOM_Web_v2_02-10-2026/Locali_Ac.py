#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Locali Ac.py — AOM web sitesini bilgisayarinda calistirir ve tarayicida acar.

Kullanim: Bu dosyaya cift tikla (Python kurulu olmali). Bir terminal penceresi
acilir, sunucu baslar, birkac saniye icinde tarayicinda otomatik olarak
http://localhost:3003/otomasyon adresi acilir.

Sunucuyu durdurmak icin acilan terminal penceresinde bir tusa bas (herhangi
bir tus) veya pencereyi kapat.
"""

import os
import subprocess
import sys
import time
import webbrowser
import urllib.request
import urllib.error

# --- Ayarlar -----------------------------------------------------------
PROJE_KLASORU = r"C:\Users\MertKahraman\OneDrive\Masaüstü\Aom\aomtechnology.tr\Aom_Yeni\AOM_Web_v2_02-10-2026"
PORT = 3003
ACILACAK_SAYFA = f"http://localhost:{PORT}/otomasyon"
MAX_BEKLEME_SANIYE = 60
# ------------------------------------------------------------------------


def hata_ve_cik(mesaj: str) -> None:
    print("\n" + "=" * 60)
    print("HATA: " + mesaj)
    print("=" * 60)
    input("\nKapatmak icin Enter'a bas...")
    sys.exit(1)


def sunucu_hazir_mi() -> bool:
    try:
        urllib.request.urlopen(ACILACAK_SAYFA, timeout=1.5)
        return True
    except urllib.error.HTTPError:
        # Sunucu ayakta, sayfa hata dondurse bile sunucu calisiyor demektir.
        return True
    except Exception:
        return False


def main() -> None:
    print("=" * 60)
    print("AOM Web Sitesi - Yerel Onizleme Baslatiliyor")
    print("=" * 60)

    if not os.path.isdir(PROJE_KLASORU):
        hata_ve_cik(
            "Proje klasoru bulunamadi:\n  " + PROJE_KLASORU +
            "\n\nBu dosyayi tasidiysan, PROJE_KLASORU satirini guncelle."
        )

    os.chdir(PROJE_KLASORU)
    print(f"Proje klasoru: {PROJE_KLASORU}")

    npm_cmd = "npm.cmd" if sys.platform.startswith("win") else "npm"

    print("\nSunucu baslatiliyor (npm run dev)... Bu ilk seferde biraz surebilir.\n")
    try:
        # Yeni bir terminal penceresinde degil, bu pencerede calistir;
        # cikti asagida gorunecek. Cift tiklayinca Windows zaten kendi
        # terminal penceresini acar.
        proc = subprocess.Popen(
            [npm_cmd, "run", "dev"],
            cwd=PROJE_KLASORU,
        )
    except FileNotFoundError:
        hata_ve_cik(
            "npm bulunamadi. Node.js kurulu oldugundan ve PATH'e eklendiginden emin ol."
        )
        return

    print("Sunucunun hazir olmasi bekleniyor...")
    basladi_mi = False
    for _ in range(MAX_BEKLEME_SANIYE):
        if proc.poll() is not None:
            hata_ve_cik("Sunucu beklenmedik sekilde kapandi. Yukaridaki hatayi kontrol et.")
            return
        if sunucu_hazir_mi():
            basladi_mi = True
            break
        time.sleep(1)

    if not basladi_mi:
        print(
            f"\n{MAX_BEKLEME_SANIYE} saniyede sunucu hazir olmadi, yine de tarayici aciliyor "
            "(sayfa birkac saniye daha gecikebilir)."
        )

    print(f"\nTarayicida aciliyor: {ACILACAK_SAYFA}\n")
    webbrowser.open(ACILACAK_SAYFA)

    print("=" * 60)
    print("Sunucu calisiyor. Degisiklikleri gormek icin sayfayi yenile (F5).")
    print("Sunucuyu durdurmak icin bu pencereyi kapat veya Ctrl+C'ye bas.")
    print("=" * 60)

    try:
        proc.wait()
    except KeyboardInterrupt:
        print("\nSunucu durduruluyor...")
        proc.terminate()


if __name__ == "__main__":
    main()
