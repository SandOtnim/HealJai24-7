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

> อัปเดต 2026-06-02 (เทียบโค้ดจริง + มติประชุม 25/05+01/06). Deadline เว็บเสร็จ **14 มิ.ย. 2026**.

### ✅ เสร็จแล้ว (อย่าทำซ้ำ)
**โดยทีม (committed แล้ว):** หลวงพ่อโสธรแก้คำ "จะแก้บนอย่างไร" + choice บน/ไหว้ · เพิ่มเทพ กวนอิม/ทับทิม/เวสสุวรรณ (มีรูป+อยู่ในหน้า) · พิพิธภัณฑ์เปลี่ยนเป็น horizontal slide
**รอบล่าสุด (push แล้ว 3 มิ.ย.):** พาทัวร์หน้าแรก + ดีไซน์พรีเมียม + ปุ่ม "พาทัวร์" · อินโทรเล่นครั้งเดียวต่อ session · เพลงเล่นต่อเนื่องข้ามหน้า + AJAX navigation ทุกห้อง (`nav.js`) · จุดเช็คใจรายวัน save + กราฟแนวโน้ม · เปลี่ยนชื่อเกาะ+ห้องเป็นธีม "ใจ" (เกาะฮีลใจ/ศาลฮีลใจ/พิพิธภัณฑ์จัดแสดงใจ/บ้านพักใจ/สวนหย่อนใจ/คาเฟ่รวมใจ)
**4 มิ.ย. (ยังไม่ push):** ปรับชื่อตาม WORKING SHEET — ห้องนอนพักใจ→**บ้านพักใจ** (Resting Home), ลานสบายใจ→**สวนหย่อนใจ** (Chill Garden) · ร้านไว้ใจ preview เปลี่ยนเป็น "กำลังก่อสร้าง / Under construction" · **บ้านพักใจ 4 ฟีเจอร์:** สมาธิหรี่จอ+ระฆังตอนจบ · journal date stamp+โหมดขอบคุณ+อ่านย้อนหลัง · แมวหิวตามเวลาจริง · แมวเดินในห้อง+สวิตช์ไฟ

### 🔴 ยังไม่เสร็จ — เรียงตามความสำคัญก่อน launch

**Mobile (สำคัญสุด — คนเปิดมือถือเป็นหลัก)**
- Horizontal overflow ทั้งหน้า (ยังไม่แก้)
- หน้าแรกมือถือ: คำหั่น / cursor ต้องเตะ 2 ที / font แข็งตอนเปิด

**Art — re-gen เป็น 3D clay**
- แมว 7 ภาพ (ยังเป็น watercolor) · 3 เทพใหม่ (กวนอิม/ทับทิม/เวสสุวรรณ) ให้ match สไตล์ 5 องค์เดิม · room-museum.jpg + bedroom-cozy.jpg

**ห้องคำติดผนัง / พิพิธภัณฑ์จัดแสดงใจ**
- ✅ 5 มิ.ย. **แกลเลอรีเดินชมขึ้นหน้าจริงแล้ว** (owner เคาะ) — กด 📦 ใน museum.html = เข้าแกลเลอรี (แทน slide เดิม) · 2 ภาษาครบ · pinch ได้ · ผนัง 3 ด้าน 18 ช่อง · โหมดทั้งหมดอยู่บน `.mg-room` ไม่แตะ body (กัน class ค้างข้าม AJAX nav) · JS อยู่ท้าย museum.js, CSS อยู่ท้าย styles.css (prefix `.mg-room`)
- `museum-gallery-concept.html` = ไฟล์ต้นแบบเดิม เก็บไว้อ้างอิง (อย่าแก้ต่อ — ของจริงอยู่ใน museum.html แล้ว)
- ยังเหลือ: เทสมือถือจริง (pinch) · ต่อ exhibits เข้าหลังบ้าน Google Sheet (รอ Sheet ID)
- ฟอร์มฝากคำ: เก็บแค่ "อาชีพ + อายุ" (ตอนนี้ยังมี title/ชื่อ field) — ฝั่ง Google (owner ทำ manual), ฝั่งเว็บ Claude ต่อโค้ดอ่านได้
- ระบบอัปโหลดรูป user → ขึ้นเว็บแบบอนุมัติก่อน (Google Form/Sheet → CSV → เว็บ)
- เปลี่ยนชื่อหัวข้อภาพให้เข้าใจง่าย ("ของที่แค่เห็นก็ฮีลใจ")
- รูป "พิพิธภัณฑ์ธารใส" จะเอามาลง (รอ asset)

**ไหว้พระ / ศาลฮีลใจ — เซียมซี**
- เพิ่ม: หลวงพ่อบ้านแหลม, ไร่ขิง, ทันใจ, เจ้าแม่ทับทิม (placeholder)
- คำเซียมซี rewrite ให้โอบกอดตัวเอง + (มติประชุม) ยาวขึ้น เป็นกลอน 8 เกิน 20 ใบ มีคำทำนาย ใบเซียมซีจริงมีเซนส์ — เนื้อหารอ "แท้งค์"
- ไพ่ทาโร่: ภาพจริง ธีม HealJai ออกแบบเอง
- ~~**ระบบหลังบ้านให้ทีมเช็ค/แก้คำเซียมซี + ไพ่ได้**~~ ✅ เสร็จ 4 มิ.ย. — Google Sheet เป็นหลังบ้าน (content-sheet.js + healjai-content-template.xlsx) เหลือ: owner เอา template เข้า Google Sheets แล้วเอา Sheet ID มาใส่ใน content-sheet.js

**ห้องนอน / บ้านพักใจ**
- เหลือแค่: ไฟล์เสียงธรรมชาติจริง (owner ขอจากเพื่อน) — UI ปุ่มเสียงมีแล้ว
- ~~สมาธิหรี่จอ+countdown+เสียงจบ · journal date stamp+gratitude · แมวหิว timer · แมวเดิน+เปิดปิดไฟ~~ ✅ เสร็จ 4 มิ.ย.

**ห้องกิจกรรม / สวนหย่อนใจ**
- เพิ่ม default list ชวนออกไปใช้ชีวิตจริง (extrovert) · ถ่ายรูปแชร์หลังทำกิจกรรม

**แบบทดสอบ** — ทำให้เด่นเป็น hero feature

**เกาะแห่งเวลา** — เพิ่ม background สื่อ "เวลา" (owner ไป work กับ "เนม" ต่อ)

**ห้องระบาย (scream)** — ปิดปรับปรุง (status=soon) ยังไม่ตัดสินใจว่าทำอะไรแทน

### ❌ ตัดออก / อย่าทำ
- ห้องคุยกัน (chat) · หนัง/ซีรีย์แนะนำ · Login/signup · Backend/database (ใช้ Google Form + Drive/CSV แทน)

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

*Updated: 2026-06-02 — เพิ่มพาทัวร์/AJAX เพลงไร้รอย/จุดเช็คใจ-กราฟ/เปลี่ยนชื่อธีมใจ (รอ push). รายละเอียดการแก้รอบนี้อยู่ใน TEAM-UPDATES.md*
