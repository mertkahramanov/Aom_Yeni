# AOM Web Sitesi v2 – Slider görsel üretim komutları (03-10-2026)

Ana sayfa slider'ı için 12 görsel. Komutlar İngilizce, çünkü görsel araçları İngilizce komutla daha tutarlı sonuç veriyor. Her komutun başına **ortak stil bloğunu** ekleyin; görseller böylece aynı ışık, renk ve kamera dilinde çıkar.

## Nasıl kullanılır

1. Ortak stil bloğunu kopyalayın, ardından ilgili görselin komutunu ekleyin.
2. Aracınız "negative prompt" alanı sunuyorsa ortak yasaklar listesini oraya yapıştırın. Sunmuyorsa komutun sonuna "Avoid: ..." diye ekleyin.
3. Belirtilen en-boy oranında üretin. Her görselden 3–4 varyasyon alıp en iyisini seçin.
4. Seçtiğiniz görselleri Claude'a gönderin; kırpma, temizleme ve yerleştirme Claude'da.

## Kontrol listesi (üretilen görseli kabul etmeden önce)

- [ ] Görselde hiç yazı, logo, filigran, alt şerit yok.
- [ ] Ekranlarda okunur gibi duran ama anlamsız yazı yok (ekranlar soyut grafik olmalı).
- [ ] Robot kolunda AOM ya da başka bir marka logosu yok.
- [ ] Makine, slaytın anlattığı işi yapıyor (kaynak slaytında kaynak, pres slaytında korunmuş pres).
- [ ] Güvenlik ekipmanı doğru yerde: çit, ışık perdesi, koruyucu.
- [ ] Kablolar, bağlantılar ve mekanik detaylar mantıklı (havada duran parça, eriyen geometri yok).

---

## Ortak stil bloğu (her komutun başına)

```
Photorealistic industrial product photograph, shot in a clean, modern Turkish machine-building workshop. Soft, even daylight from high windows plus neutral LED high-bay lighting, no harsh shadows. Light grey epoxy floor with subtle yellow safety-line markings, light grey insulated-panel walls, background softly out of focus. Camera: full-frame, 35 mm lens, eye level slightly above the machine, three-quarter view, sharp focus on the machine. Colour palette: machine bodies in off-white RAL 9016, accents and guards in deep industrial red (#8E1B20), bases and frames in dark anthracite (#1E1F22), brushed steel and aluminium details. Realistic engineering detail: correct cable routing in cable chains, labelled-looking but text-free terminal blocks, pneumatic tubing with push-in fittings, bolts, ground wires. Clean, calm, professional, high-end catalogue look, 8K detail, true-to-life materials.
```

## Ortak yasaklar (negative prompt)

```
text, letters, words, numbers, logos, brand names, watermarks, signatures, captions, labels, grey bar at the bottom, banner, border, frame, collage, people looking at camera, cartoon, illustration, CGI plastic look, oversaturated colours, neon, lens flare, motion blur, warped or melted geometry, floating parts, extra robot arms, impossible joints, messy cables on the floor, dirty or rusty workshop, sci-fi, futuristic, hologram
```

---

## Slider ana slaytları (sağdaki büyük görsel)

Ekranda yaklaşık 4:3 yatay alana yerleşiyor. **4:3 yatay** üretin (ör. 2048×1536).

### 1. Robotik kaynak

Şu anki görsel paletleme gösteriyor, slayt ise kaynağı anlatıyor. Bu görsel o uyumsuzluğu giderir.

```
A robotic MIG/MAG welding cell. A white six-axis industrial welding robot without any brand markings, with a welding torch and hose package along the arm, is welding a structural steel frame. The workpiece is clamped on a two-axis tilt-and-rotate positioner with a red (#8E1B20) rotating table and an anthracite base. A small, realistic welding arc with a few sparks at the torch tip. Wire feeder mounted on the robot's upper arm, torch cleaning station beside the robot base. The cell is enclosed by anthracite mesh safety fencing with red posts, a translucent dark welding arc screen panel on one side, and a fume extraction arm above the workpiece. An industrial control cabinet in off-white with a small stack light (green lit) outside the fence. Three-quarter view from outside the fence corner, looking into the cell.
```

### 2. Pres güvenliği ve otomatik besleme

Şu anki görselde kalıp bölgesi açık, ışık perdesi yok. Slaytın satmaya çalıştığı şey güvenlik.

```
A C-frame mechanical eccentric press, off-white body with red (#8E1B20) top crown and accents, anthracite base, fitted with a complete safety system: two vertical safety light curtain columns (slim grey aluminium profiles with a thin row of red LEDs) mounted at the front of the die area, fixed polycarbonate side guards with red frames around the die zone, and a hinged interlocked front guard. A servo NC roll feeder on the right side feeds a shiny steel strip from a decoiler/straightener into the die. A two-hand control station on a pedestal in front, a stack light (green lit) on top, and a control panel with a text-free touchscreen on a swing arm. Finished small stamped parts in a parts bin. Three-quarter front view showing the light curtain clearly between the camera and the die.
```

### 3. CNC tezgâhlar

Mevcut AOM Mini CNC görselini beğendiyseniz bu adımı atlayabilirsiniz. Yeniden üretilecekse:

```
A compact vertical CNC machining centre: off-white enclosure with red (#8E1B20) sliding front door frames and large clear windows, anthracite base on levelling feet. Through the window: the spindle with a tool holder above a T-slot table holding a vise with an aluminium workpiece, coolant nozzles, chip guards. A CNC control panel with a text-free screen and physical buttons mounted on the right side on a swivel arm, a red emergency stop button, a three-colour stack light (green lit) on top. A tool cabinet with tool holders in the softly blurred background. Three-quarter front view, slightly elevated.
```

### 4. Tristörlü güç kontrol panoları

Şu anki görselde bara renkleri eski sistemde (kırmızı-sarı-mavi). Komut güncel IEC renklerini kullanıyor.

```
A large industrial power control switchboard with three cabinet sections, off-white RAL 7035 enclosures on an anthracite plinth, the left and middle doors open. Inside: three thyristor power controller modules with black housings and large aluminium heatsinks with cooling fans, vertical copper busbars with phase colours brown, black and grey (IEC), a large moulded-case main circuit breaker with a rotary handle, neat grey cable ducts, DIN-rail mounted control components and terminal blocks, all wiring tidy and bundled. The right section has a closed door with a large industrial touchscreen HMI showing abstract, text-free bar charts and trend lines in red and grey, and a stack light on the roof. Three-quarter front view.
```

---

## Otomasyon slaytı kutuları (küçük görseller)

Kutularda yaklaşık 2:1 yatay alana kırpılıyor. **16:9 yatay** üretin (ör. 1920×1080), ana konuyu ortada tutun. Dört komut, ana slayt görselleriyle aynı atölye, ışık, kamera ve renk dilinde yazıldı (03-10-2026 güncellemesi). Ortak stil bloğu ve yasaklar her komutun içine eklendi; tek parça kopyalanabilir.

### 5. Endüstriyel Otomasyon

```
Photorealistic industrial product photograph in the same clean, modern machine-building workshop: soft daylight from high windows, neutral LED lighting, light grey epoxy floor with yellow safety lines, light grey panel walls, softly blurred background. Full-frame camera, 35 mm lens, three-quarter view, slightly above eye level. Colour palette: off-white RAL 9016 bodies, deep industrial red (#8E1B20) guards and accents, dark anthracite (#1E1F22) bases, brushed steel and aluminium. Subject: an automated assembly and test line made of three connected stations on aluminium-profile frames, enclosed by off-white and red guarding panels with large clear polycarbonate windows. A flat belt conveyor carries small metal parts between stations; through the windows, pneumatic pick-and-place units, linear axes, grippers, sensors and tidy blue pneumatic tubing are visible. An off-white control cabinet with a text-free touchscreen stands at the end of the line, and each station has a slim stack light with green lit. Realistic engineering detail, high-end catalogue look, 16:9 landscape. Avoid: text, letters, numbers, logos, brand names, watermarks, captions, grey bar at the bottom, borders, cartoon or CGI plastic look, oversaturated colours, warped geometry, floating parts, messy cables, dirty workshop, sci-fi.
```

### 6. Yazılım

```
Photorealistic industrial product photograph in the same clean, modern machine-building workshop: soft daylight from high windows, neutral LED lighting, light grey epoxy floor with yellow safety lines, light grey panel walls, softly blurred background. Full-frame camera, 35 mm lens, three-quarter view, slightly above eye level. Colour palette: off-white RAL 9016 bodies, deep industrial red (#8E1B20) guards and accents, dark anthracite (#1E1F22) bases, brushed steel and aluminium. Subject: an automation engineer commissioning a machine. On an anthracite mobile workbench, a laptop shows an abstract PLC programming view drawn as clean geometric ladder and function-block shapes with no readable text. An Ethernet cable runs from the laptop into an open off-white control cabinet beside the bench, revealing a compact PLC, I/O modules, a servo drive and terminal blocks neatly mounted on DIN rails with tidy wiring in grey cable ducts. The cabinet door carries a text-free touchscreen showing red and grey abstract widgets. Only the engineer's hands and forearms in a dark work jacket are visible on the keyboard, no face. A machine with red guarding is softly blurred in the background. Realistic engineering detail, high-end catalogue look, 16:9 landscape. Avoid: text, letters, numbers, logos, brand names, watermarks, captions, grey bar at the bottom, borders, readable code on screens, cartoon or CGI plastic look, oversaturated colours, warped geometry, messy cables, office setting, sci-fi.
```

### 7. Makine Otomasyonu

```
Photorealistic industrial product photograph in the same clean, modern machine-building workshop: soft daylight from high windows, neutral LED lighting, light grey epoxy floor with yellow safety lines, light grey panel walls, softly blurred background. Full-frame camera, 35 mm lens, three-quarter view, slightly above eye level. Colour palette: off-white RAL 9016 bodies, deep industrial red (#8E1B20) guards and accents, dark anthracite (#1E1F22) bases, brushed steel and aluminium. Subject: a special-purpose automated plastic extrusion machine. A single-screw extruder with an off-white and red barrel cover on an anthracite base, a stainless hopper with a vacuum loader on top, a large electric drive motor with a guarded coupling, and the extruded profile running from the die head into a stainless water cooling bath. A free-standing off-white control cabinet with a text-free touchscreen and a stack light (green lit) stands beside the machine. Focus on the extruder head and die. Realistic engineering detail, high-end catalogue look, 16:9 landscape. Avoid: text, letters, numbers, logos, brand names, watermarks, captions, grey bar at the bottom, borders, cartoon or CGI plastic look, oversaturated colours, warped geometry, floating parts, messy cables, scattered plastic waste, dirty workshop, sci-fi.
```

### 8. SCADA

```
Photorealistic industrial product photograph of a production control room attached to the same clean, modern machine-building workshop: a large glass wall overlooks the workshop floor, where machines with off-white bodies and deep red (#8E1B20) guards are softly blurred. Soft daylight plus neutral LED lighting, light grey walls, anthracite (#1E1F22) desk. Full-frame camera, 35 mm lens, three-quarter view, slightly above eye level. Subject: a large wall-mounted display shows an abstract plant overview, a clean process flow diagram with simple machine icons, connecting lines, red and green status blocks and trend charts, with absolutely no readable text. In front, an operator desk with three monitors showing abstract red and grey dashboards and a small keyboard. One operator seen from behind in a dark work jacket. Calm, organised, professional, high-end catalogue look, 16:9 landscape. Avoid: text, letters, numbers, logos, brand names, watermarks, captions, grey bar at the bottom, borders, readable text on screens, cartoon or CGI plastic look, neon, hologram, oversaturated colours, warped geometry, sci-fi.
```

---

## Medikal cihazlar slaytı kutuları (küçük görseller)

Otomasyon kutularıyla aynı ölçü: **16:9 yatay** üretin (ör. 1920×1080), ana konuyu ortada tutun. Ortam atölye değil, temiz laboratuvar; renk dili ve kamera ana slaytlarla aynı. Stil ve yasaklar her komutun içinde; Gemini'ye tek parça yapıştırılabilir (03-10-2026).

### 9. Laboratuvar Cihazları

```
Photorealistic product photograph in a clean, modern laboratory: soft, even daylight from large windows plus neutral white LED panel lighting, no harsh shadows. Light grey seamless epoxy floor, white and light grey walls, white laboratory benches with grey worktops, background softly out of focus. Full-frame camera, 35 mm lens, three-quarter view, slightly above eye level, sharp focus on the device. Colour palette: device bodies in off-white RAL 9016, accents and trims in deep industrial red (#8E1B20), bases and frames in dark anthracite (#1E1F22), brushed stainless steel and clear glass details. Calm, hygienic, professional, high-end catalogue look, 16:9 landscape. Subject: a row of laboratory equipment on a white lab bench: a benchtop laboratory incubator and a drying oven with off-white bodies, stainless steel interior visible through a glass inner door, slim red trim on the door frames, and small text-free digital control panels; beside them a compact centrifuge with a closed lid and a magnetic stirrer with a glass beaker of clear liquid. Everything neatly aligned, tidy power cables. Focus on the incubator in the centre. Avoid: text, letters, numbers, logos, brand names, watermarks, captions, labels, grey bar at the bottom, borders, readable text on screens, people's faces, cartoon or CGI plastic look, oversaturated colours, neon, hologram, warped geometry, floating parts, messy cables, dirty or cluttered lab, hospital patients, blood, sci-fi.
```

### 10. Gaz Jeneratörleri (oksijen ve azot)

```
Photorealistic product photograph in a clean, modern laboratory: soft, even daylight from large windows plus neutral white LED panel lighting, no harsh shadows. Light grey seamless epoxy floor, white and light grey walls, white laboratory benches with grey worktops, background softly out of focus. Full-frame camera, 35 mm lens, three-quarter view, slightly above eye level, sharp focus on the device. Colour palette: device bodies in off-white RAL 9016, accents and trims in deep industrial red (#8E1B20), bases and frames in dark anthracite (#1E1F22), brushed stainless steel and clear glass details. Calm, hygienic, professional, high-end catalogue look, 16:9 landscape. Subject: an industrial PSA oxygen and nitrogen generator system in a clean technical room next to a laboratory: an off-white cabinet-type generator with red accent panels and an anthracite base, with two tall brushed-stainless adsorption columns beside it, a vertical stainless steel buffer tank, neat stainless and copper gas piping with pressure gauges whose dials have no readable numbers, ball valves, and a text-free touchscreen on the generator cabinet showing simple abstract red and grey bars. A green status light glows on the cabinet. Tidy pipe routing, clean floor. Avoid: text, letters, numbers, logos, brand names, watermarks, captions, labels, grey bar at the bottom, borders, readable text on screens, people's faces, cartoon or CGI plastic look, oversaturated colours, neon, hologram, warped geometry, floating parts, messy cables, dirty or cluttered lab, hospital patients, blood, sci-fi.
```

### 11. Sterilizasyon Kabinleri

```
Photorealistic product photograph in a clean, modern laboratory: soft, even daylight from large windows plus neutral white LED panel lighting, no harsh shadows. Light grey seamless epoxy floor, white and light grey walls, white laboratory benches with grey worktops, background softly out of focus. Full-frame camera, 35 mm lens, three-quarter view, slightly above eye level, sharp focus on the device. Colour palette: device bodies in off-white RAL 9016, accents and trims in deep industrial red (#8E1B20), bases and frames in dark anthracite (#1E1F22), brushed stainless steel and clear glass details. Calm, hygienic, professional, high-end catalogue look, 16:9 landscape. Subject: a large front-loading laboratory and medical steam sterilizer (autoclave) built into a clean white wall: brushed stainless steel square chamber door slightly open showing an empty stainless chamber with a loading rack and wire baskets of wrapped instrument trays on a stainless loading trolley in front, the surrounding cabinet in off-white with a deep red (#8E1B20) trim line, an anthracite plinth, and a text-free touchscreen control panel beside the door showing an abstract red cycle progress ring. A soft hint of steam near the chamber opening. Clean, hygienic sterile-processing room. Avoid: text, letters, numbers, logos, brand names, watermarks, captions, labels, grey bar at the bottom, borders, readable text on screens, people's faces, cartoon or CGI plastic look, oversaturated colours, neon, hologram, warped geometry, floating parts, messy cables, dirty or cluttered lab, hospital patients, blood, sci-fi.
```

### 12. Biyogüvenlik Kabinleri (çeker ocak ve biyogüvenlik)

```
Photorealistic product photograph in a clean, modern laboratory: soft, even daylight from large windows plus neutral white LED panel lighting, no harsh shadows. Light grey seamless epoxy floor, white and light grey walls, white laboratory benches with grey worktops, background softly out of focus. Full-frame camera, 35 mm lens, three-quarter view, slightly above eye level, sharp focus on the device. Colour palette: device bodies in off-white RAL 9016, accents and trims in deep industrial red (#8E1B20), bases and frames in dark anthracite (#1E1F22), brushed stainless steel and clear glass details. Calm, hygienic, professional, high-end catalogue look, 16:9 landscape. Subject: a Class II microbiological safety cabinet (biosafety cabinet) in a clean laboratory: off-white steel body, a deep red (#8E1B20) trim strip along the top filter housing, anthracite stand on levelling feet, a sloped clear glass front sash raised to working height, a brushed stainless steel work surface inside with a few sterile sample tubes in a rack, soft white interior light, and a small text-free control panel above the sash. To its right, partially in frame and slightly out of focus, a chemical fume hood with an off-white body, vertical glass sash and an exhaust duct going up into the ceiling. No people. Avoid: text, letters, numbers, logos, brand names, watermarks, captions, labels, grey bar at the bottom, borders, readable text on screens, people's faces, cartoon or CGI plastic look, oversaturated colours, neon, hologram, warped geometry, floating parts, messy cables, dirty or cluttered lab, hospital patients, blood, sci-fi.
```

---

## Görseller geldiğinde Claude ne yapacak

- Yazı, logo ve şerit kalıntılarını temizler (görsel kuralları: `00_INDEKS_02-10-2026.md`).
- Slider alanına göre kırpar ve boyutlandırır, dosya adlarına tarih ekler.
- Tuvali ve sitedeki asıl dosyaları birlikte günceller.
