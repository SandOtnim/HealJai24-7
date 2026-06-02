# HealJai 24/7 — AI Collaboration Brief

> อ่านไฟล์นี้ก่อนเริ่มทำงาน. ถ้าคุณเป็น AI assistant ที่ถูก clone repo นี้มา — ทุกอย่างที่จำเป็นอยู่ที่นี่.

---

## 1. โปรเจคนี้คืออะไร

**HealJai 24/7 (ฮีลใจ 24/7)** — เว็บไซต์ฮีลใจสำหรับคนไทย. รูปแบบ virtual exhibition ที่ผู้ใช้เข้าไปสำรวจห้องต่างๆ.

- **Launch target**: 16 มิถุนายน 2026
- **Audience**: คนไทยที่อยากผ่อนคลายใจ ไม่จำกัดอายุ
- **Vibe**: อุ่น เบา โอบกอดตัวเอง (think เขื่อน ดนัย voice)

**สิ่งสำคัญ**: ไม่ใช่ challenge / TikTok energy — ทุก feature ต้องรู้สึก **ฮีลใจ**.

---

## 2. Tech stack

- **Multi-page static HTML site** — 7 หน้าหลัก + shared CSS + per-page JS
- HTML5 + CSS3 + vanilla JavaScript เท่านั้น
- **NO frameworks. NO build step. NO npm.**
- External CDN: Google Fonts (IBM Plex Sans Thai + Serif)
- Persistence: `localStorage` (key prefix `healjai_*`)
- Audio: HTML5 `<audio>` + Web Audio API (cat sounds synthesized)

**Hosting**: ตอนนี้ยังเป็น static — deploy ได้ทุกที่ (GitHub Pages / Netlify / Vercel). มี Cloudflare Analytics block เตรียมไว้ใน `<head>` ของทุกหน้า (commented out รอ token).

---

## 3. โครงสร้างไฟล์

```
HealJai24-7/
├── index.html          ← หน้าแรก (intro + heart map)
├── alone.html          ← ห้อง "อยู่กับตัวเอง" (bedroom + cat + coloring)
├── community.html      ← ชุมชน (LO-Fi + fortune + quiz + tarot)
├── island.html         ← เกาะแห่งเวลา (Death island map)
├── museum.html         ← พิพิธภัณฑ์ฮีลใจ (exhibits + words on wall)
├── sacred.html         ← ไหว้พระ (8 องค์เทพ + เซียมซี)
├── travel.html         ← ออกไปข้างนอก (wheel + activities)
│
├── AI_BRIEF.md         ← ไฟล์นี้
├── README.md           ← หน้าแรกของ repo บน GitHub
├── .gitignore
│
└── assets/
    ├── css/styles.css  ← CSS รวมทุกหน้า (5,400+ บรรทัด)
    ├── js/
    │   ├── common.js   ← ★ Utility กลาง (toast, share, bookmark, music, lang)
    │   ├── home.js     ← logic ของ index.html
    │   ├── alone.js
    │   ├── community.js
    │   ├── island.js
    │   ├── museum.js
    │   ├── sacred.js
    │   └── travel.js
    ├── images/         ← ภาพห้อง / เทพ / แมว / exhibits
    ├── audio/          ← music tracks + ambient sounds
    └── Video/          ← heart-map.mp4, death-island.mp4
```

**กฎเหล็ก**: ทุกหน้าโหลด `common.js` ก่อน แล้วโหลด JS ของหน้านั้น. `<body data-page="...">` บอกว่าอยู่หน้าไหน.

---

## 4. ระบบ Reusable ที่ `common.js` มีให้แล้ว (ห้ามสร้างใหม่)

### Toast
```js
window.showToast('ข้อความ');           // 2.2 วิ default
window.showToast('นานหน่อย', 3000);    // ระบุ ms
```

### Share button (ติด class `.share-btn`)
```html
<button class="share-btn" data-share-type="wheel">📤 แชร์</button>
```
Types ที่รองรับ: `wheel`, `fortune`, `mu`, `release`, `coloring`, `tarot`, `shop`
ก่อนแชร์ต้อง set global: `window._wheelLastWin = '...'` หรือ `window._fortuneLastText = '...'` ฯลฯ (ดู common.js บรรทัด ~306-330)

### Bookmark button (ติด class `.bookmark-btn`)
```html
<button class="bookmark-btn" data-bookmark-type="mu-fortune">🔖 บันทึก</button>
```
Types ที่รองรับ: `mu-fortune`, `mu-blessing`, `wheel`, `community-fortune`, `release`, `coloring`, `tarot`, `shop`
ก่อน bookmark ต้อง set global ตามที่ `getBookmarkText()` คาดหวัง (common.js บรรทัด ~178-188)

### Bookmark drawer
- ปุ่มเปิด: `<button id="bookmarkOpen">` + badge `<span id="bookmarkBadge">`
- Modal: `<div id="bookmarkModal" hidden>`
- Close ผ่าน: `data-close-bookmark` attribute / Esc key / `window.__closeBookmarkModal()`
- LocalStorage key: `healjai_bookmarks_v1`

### Music player
```js
window.playMusic();
window.pauseMusic();
window.switchTrack('assets/audio/rain.mp3');
```
HTML ต้องมี: `<audio id="bgMusic">`, `<button id="musicToggle">`, `<div id="musicMenu">`, ปุ่ม track `<button class="track-btn" data-src="...">`

### Language toggle
- HTML: ใช้ `<span data-th>...</span><span data-en>...</span>` คู่กัน
- Placeholder: `<input data-th-placeholder="..." data-en-placeholder="...">`
- Button: `<button id="langToggle">`
- Hook: ถ้า page ต้อง update content เมื่อสลับภาษา → set `window.__onLanguageChange = (lang) => { ... }`

### Privacy modal
- เปิด: ปุ่มใส่ `data-open-privacy`
- ปิด: ปุ่มใส่ `data-close-privacy` (หรือคลิก backdrop)
- Modal: `<div id="privacyModal">`

---

## 5. Tone & Copy (ภาษาไทย)

| ใช้ | หลีกเลี่ยง |
|---|---|
| "ไม่เป็นไรนะ ที่วันนี้เหนื่อย" | "พังมันไปเลย!" |
| "เรา / เธอ" (อบอุ่น) | "คุณ" (ทางการ) |
| โอบกอดตัวเอง | สั่งสอน / เร่งเร้า |
| ภาษาเขื่อน ดนัย (compassionate) | TikTok challenge energy |

ทุก string มี 2 ภาษา: TH (`data-th`) + EN (`data-en`).

---

## 6. Art direction (สำคัญ — ตกลงกันแล้ว)

**Anchor style: 3D Clay/Plasticine, warm pastel, isometric/figurine, white background**

| Zone | สไตล์ | ตัวอย่าง |
|---|---|---|
| โลก / สถานที่ | 3D clay isometric | heart-map, bedroom, garden, community, lofi rooms |
| ตัวละคร / สิ่งศักดิ์สิทธิ์ | 3D chibi figurine | deity-* ทั้ง 8 องค์ |
| ของจริง (museum exhibits) | Photograph | exhibit-ring, exhibit-watch ฯลฯ — **เก็บไว้เป็นความตั้งใจ** เพราะเป็น "ของจริง" |
| แมว/หมา (TODO re-gen) | 3D clay (ตอนนี้ยังเป็น watercolor — ต้องแก้) | cat-*.jpg → ต้อง re-gen |

**กฎ**: ทุกภาพ gen ใหม่ต้องเป็น **3D clay** (ยกเว้น exhibit photos = ภาพถ่ายจริง).

---

## 7. Mobile-first — กฎเหล็ก

โปรเจคนี้คน **เปิดจากมือถือเป็นหลัก**. ต้องเทสบน iPhone Safari จริง.

1. **ห้ามใช้** `overflow-clip-margin` — พังบนมือถือ
2. ปุ่มบนมือถือ default `min-height: 40px` → ถ้าทำ round indicator (จุดกลมๆ) **ต้อง** override `min-height: 0 !important`
3. ใส่ `max-width: 100vw` กับ container ใหม่ทุกตัว
4. ห้าม horizontal scroll ของทั้งหน้า
5. Font size อย่าน้อยกว่า 14px บนมือถือ

**Known issue**: หน้าแรก mobile อาจมี horizontal overflow บาง phone — ยังไม่ resolved.

---

## 8. งานค้าง (pick ก่อนเริ่ม — อย่าทับกัน — ถาม owner ก่อน)

**Mobile / overall**
- Horizontal page overflow บนมือถือ (UNRESOLVED)
- หน้าแรกบนมือถือคำหั่น / cursor ต้องเตะ 2 ที
- Font แข็งตอนเปิดบน mobile

**ห้องคำติดผนัง (museum)**
- ฟอร์มฝากคำพูด: เก็บแค่ "อาชีพ + อายุ" (ตัด field อื่น)
- ระบบเก็บภาพ user upload → ผ่าน Google Form + Drive

**พิพิธภัณฑ์**
- เปลี่ยน scroll เป็น slide + auto-play (mobile UX)
- เปลี่ยนชื่อหัวข้อภาพให้เข้าใจง่าย ("ของที่แค่เห็นก็ฮีลใจ")

**ห้องกิจกรรม (travel — กงล้อ)**
- เพิ่ม default list ที่ชวนออกไปใช้ชีวิตจริง (extrovert-friendly)
- ถ่ายรูปแชร์หลังทำกิจกรรม

**ห้องระบาย (scream)**
- ปัจจุบัน **ปิดปรับปรุง** (status=soon) — ไอเดียขว้างปาถูก cancel

**ไหว้พระ (sacred) / เซียมซี**
- เพิ่มพระ/เทพ: หลวงพ่อบ้านแหลม, ไร่ขิง, ทันใจ + ท้าวเวสสุวรรณ, เจ้าแม่ทับทิม, เจ้าแม่กวนอิม (placeholder art แล้ว — รอ regen ให้ match style)
- หลวงพ่อโสธร: เปลี่ยน "จะมาแก้บนยังไง" → "จะแก้บนอย่างไร" + ให้ choice บน/ไหว้
- คำเซียมซี: rewrite ให้เป็นโอบกอดตัวเอง

**ห้องนอน (alone)**
- เพิ่มเสียงธรรมชาติ + เพลงหลับลึก
- สมาธิหรี่หน้าจอ + countdown มีเสียงตอนจบ
- ห้องจดบันทึก: เพิ่ม date stamp + gratitude journal
- น้องแมว: ฟังก์ชั่น "หิว" (timer-based)
- โต๊ะทำงาน: เพิ่มแมวเดิน + เปิดปิดไฟ

**ใหม่ — ต้องสร้าง**
- จุดเช็คใจรายวัน → สรุปเป็นกราฟ

**แบบทดสอบ**
- ทำให้เด่นกว่านี้ — เป็น hero feature

**Art**
- Re-gen cat-* 7 ภาพ → 3D clay
- Re-gen 3 deities ใหม่ (guanyin, thapthim, vessuwan) → match style 5 เดิม
- Re-gen room-museum.jpg + bedroom-cozy.jpg → 3D clay

**ที่ตัดออก / อย่าทำ**
- ❌ ห้องคุยกัน (chat feature) — ทีมตัดสินใจตัดออก
- ❌ Login / signup system
- ❌ Backend / database (ใช้ Google Form + Drive แทน)

---

## 9. Workflow แนะนำสำหรับ AI

ก่อนแก้ code:
```
1. อ่าน AI_BRIEF.md (ไฟล์นี้)
2. ระบุห้อง / page ที่จะแก้ → เปิด <ห้อง>.html + assets/js/<ห้อง>.js
3. เช็คก่อนว่า function ที่ต้องใช้มีใน common.js หรือยัง (ห้าม duplicate)
4. แก้ HTML / JS / CSS — minimal change
5. Test mobile (chrome devtools mobile + ส่งให้ owner เทสจริง)
6. Commit ระบุห้อง: "[museum] เพิ่ม X" / "[mobile] fix Y"
```

---

## 10. ห้ามทำ

- ❌ รวม HTML กลับเป็นไฟล์เดียว
- ❌ เพิ่ม npm / build step
- ❌ Tailwind / Bootstrap / React / Vue
- ❌ External API call โดยไม่ถาม owner
- ❌ Tracking / analytics (Cloudflare commented out รอ owner เปิด)
- ❌ TikTok-style copy ("กรี๊ดดดด!!" "พังเลยยย!")
- ❌ Login system / accounts
- ❌ Backend database
- ❌ Duplicate ระบบที่ common.js มีให้แล้ว (toast / share / bookmark / music / lang)
- ❌ Hardcode สีโดยไม่ใช้ CSS variables

---

## 11. ติดต่อ owner

**SandOtnim** (project lead)
- Email: sandotnim.jako@gmail.com
- GitHub: SandOtnim

ถามก่อนถ้าจะ:
- เปลี่ยน brand colors / fonts
- ลบห้องเดิม
- เพิ่ม paid service / API
- เปลี่ยน domain / hosting
- รื้อระบบ reusable ใน common.js
- เปลี่ยน art direction

---

*Updated: หลัง refactor multi-page (เพื่อน pud12345 push 31 พ.ค. 2026)*
