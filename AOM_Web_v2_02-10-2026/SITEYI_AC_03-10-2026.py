"""
AOM Web Sitesi v2 - tek tıkla yerelde aç (03-10-2026)

Çift tıkla: gerekiyorsa paketleri kurar, siteyi başlatır, tarayıcıda açar.
Siteyi kapatmak için bu pencereyi kapat (veya Ctrl + C).

Gerekli: Python 3 ve Node.js 20+ (https://nodejs.org)
"""

import os
import shutil
import socket
import subprocess
import sys
import time
import webbrowser

PORT = 3003
URL = f"http://localhost:{PORT}"
KLASOR = os.path.dirname(os.path.abspath(__file__))
WINDOWS = os.name == "nt"


def bekle_ve_cik(kod: int = 1) -> None:
    input("\nKapatmak için Enter'a basın...")
    sys.exit(kod)


def port_acik_mi() -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        return s.connect_ex(("127.0.0.1", PORT)) == 0


def npm_calistir(*args: str, **kw) -> subprocess.Popen:
    # Windows'ta npm bir .cmd dosyası; shell=True ile çağrılmalı.
    return subprocess.Popen(["npm", *args], cwd=KLASOR, shell=WINDOWS, **kw)


def main() -> None:
    if WINDOWS:
        os.system("title AOM Web Sitesi - localhost:3003")
    print("=" * 56)
    print("  AOM Web Sitesi v2")
    print("=" * 56)

    # Site zaten açıksa yalnızca tarayıcıyı aç
    if port_acik_mi():
        print(f"\nSite zaten çalışıyor, tarayıcı açılıyor: {URL}")
        webbrowser.open(URL)
        time.sleep(2)
        return

    # Node.js / npm kontrolü
    if not shutil.which("node") or not shutil.which("npm"):
        print("\nHATA: Node.js bulunamadı.")
        print("https://nodejs.org adresinden LTS sürümünü kurun,")
        print("sonra bu dosyayı yeniden çalıştırın.")
        bekle_ve_cik()

    surum = subprocess.run(["node", "-v"], capture_output=True, text=True, shell=WINDOWS).stdout.strip()
    print(f"\nNode.js {surum} bulundu.")

    # İlk seferde paketleri kur
    if not os.path.isdir(os.path.join(KLASOR, "node_modules", "next")):
        print("\nPaketler kuruluyor (ilk sefer, 1-2 dakika sürebilir)...\n")
        if npm_calistir("install").wait() != 0:
            print("\nHATA: 'npm install' başarısız oldu. İnternet bağlantısını kontrol edin.")
            bekle_ve_cik()

    # Sunucuyu başlat
    print(f"\nSite başlatılıyor: {URL}")
    print("Kapatmak için bu pencereyi kapatın (veya Ctrl + C).\n")
    sunucu = npm_calistir("run", "dev")

    # Hazır olunca tarayıcıyı aç
    for _ in range(120):
        if sunucu.poll() is not None:
            print("\nHATA: Site başlatılamadı. Yukarıdaki mesajları kontrol edin.")
            bekle_ve_cik()
        if port_acik_mi():
            webbrowser.open(URL)
            break
        time.sleep(1)
    else:
        print(f"\nSite 2 dakikada açılmadı. Tarayıcıda elle deneyin: {URL}")

    try:
        sunucu.wait()
    except KeyboardInterrupt:
        print("\nSite kapatılıyor...")
        sunucu.terminate()


if __name__ == "__main__":
    try:
        main()
    except Exception as hata:  # Pencere kapanmadan hatayı göster
        print(f"\nBeklenmeyen hata: {hata}")
        bekle_ve_cik()
