# _HANDOFF — HealJai24-7
> อัปเดต: 5 มิ.ย. 2026 · Resume phrase ในแชทใหม่: **"ทำต่อโปรเจค ฮีลใจ 24/7"**
> แชทใหม่: อ่านไฟล์นี้ + `AI_BRIEF.md` (canon backlog) + `TEAM-UPDATES.md` (ค้างส่งทีม) ก่อนเริ่ม

## กำลังทำอะไรอยู่
- Deadline เว็บเสร็จ **14 มิ.ย. 2026** (timeline ทีม: Update Website from Dev #2)
- รอบล่าสุดโฟกัส: ต้นแบบพิพิธภัณฑ์ใหม่ `museum-gallery-concept.html` — ทำเสร็จแล้ว รอ user เอาให้ทีมเคาะ

## ค้าง commit (สำคัญ — เตือน user ให้ push)
`TEAM-UPDATES.md` · `AI_BRIEF.md` · `assets/css/styles.css` · `assets/js/museum.js` · `museum-gallery-concept.html` (ใหม่)
(= งานแก้ UX พิพิธภัณฑ์ 3 จุด + ต้นแบบแกลเลอรี) — commit ก่อนหน้า 6afd924 push แล้ว
⚠️ ถ้า commit เจอ "lock file exists" → ให้ user รัน Terminal: `rm -f "/Volumes/Seagate/On Going/HealJai24-7/.git/index.lock"` (sandbox ลบเองไม่ได้)

## การตัดสินใจล่าสุด
- เปลี่ยนชื่อตาม WORKING SHEET: บ้านพักใจ (Resting Home) · สวนหย่อนใจ (Chill Garden) — EN ทีมเปลี่ยนได้
- ห้องระบาย+ร้านไว้ใจ = Under Construction ไปก่อน
- หลังบ้านเซียมซี/ไพ่ = Google Sheet (content-sheet.js + healjai-content-template.xlsx อยู่ root) — **รอ user import เข้า Google Sheets แล้วส่ง Sheet ID มาใส่ใน content-sheet.js**
- ไพ่ทาโร่ = พิธีกรรมการหยิบ (คำมาจากหมวด cafe) — ทีมยังต้องเคาะว่าจะให้ไพ่มีความหมายเองไหม
- Art 3D clay + Mobile overflow = user ขอข้ามไว้ คุยกับทีมก่อน

## ต้นแบบพิพิธภัณฑ์ (สรุปเทคนิค)
ฉากเดียวกล้องเดียว (translate+scale บน .hall-inner, origin 0 0) · t∈[0,1] ขับทุกอย่าง (กล้อง+ภาพบิน+ไฟ dim+เรื่องคลี่) ผ่าน applyCam(t,L,target) · pinch=นิ้วคุม t, ปุ่ม=animateCam easeInOutCubic 1.15s · ผนัง 3 ด้าน WALL_SIZE=6 (ช่อง 7-18 placeholder มีเลข) · ลำแสง conic-gradient จุดกำเนิดเหนือจอ (มือถือ -12% / desktop -35%, มุม ±28°)

## งานค้างเรียงลำดับ (ดู AI_BRIEF §8 เป็น canon)
1. ทีมเคาะต้นแบบพิพิธภัณฑ์ → ถ้าผ่าน ย้ายเข้า museum.html จริง (2 ภาษา + ต่อ Google Sheet)
2. รอ user: Google Sheet ID (หลังบ้าน) · ไฟล์เสียงธรรมชาติจากเพื่อน (บ้านพักใจ UI พร้อมแล้ว)
3. รอแท้งค์: คำเซียมซีกลอน 8 → วางลงชีทแท็บ mu ได้เลย
4. สวนหย่อนใจ: default list วงล้อ + ถ่ายรูปแชร์ · แบบทดสอบเป็น hero · เกาะแห่งเวลา bg (รอเนม)
5. Mobile overflow ทั้งเว็บ (user จะคุยทีมก่อน)

## กฎทีม (จาก memory)
AI_BRIEF คือ canon — อัปเดต+push เสมอ · ทุก edit ลง TEAM-UPDATES จนกว่า user บอก "ส่งทีมแล้ว" (แล้วย้ายไป Archived) · ไม่เขียน commit message เว้นแต่ขอ · ถามตัวเลือกเป็นข้อความธรรมดา ไม่ใช้ widget · user ไม่เขียนโค้ด อธิบายง่ายๆ เรียกแทนตัวเองว่า "ฉัน/เธอ" ได้
