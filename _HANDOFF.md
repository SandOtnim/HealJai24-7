# _HANDOFF — HealJai24-7
> อัปเดต: 5 มิ.ย. 2026 (รอบ 2) · Resume phrase ในแชทใหม่: **"ทำต่อโปรเจค ฮีลใจ 24/7"**
> แชทใหม่: อ่านไฟล์นี้ + `AI_BRIEF.md` (canon backlog §8) + `TEAM-UPDATES.md` (ค้างส่งทีม) ก่อนเริ่ม

## กำลังทำอะไรอยู่
- Deadline เว็บเสร็จ **14 มิ.ย. 2026** · launch 16 มิ.ย.
- รอบนี้จบใหญ่: **พิพิธภัณฑ์เสร็จทั้ง 2 โซนแล้ว** owner ชอบมาก ✅ — เหลือทีมเทสมือถือจริง

## สถานะ git (สำคัญ)
- ค้าง push **6 commits**: f863349 (แกลเลอรีขึ้นจริง) · 2dddd36 (ลบต้นแบบ) · e04f325 (คำพูดเป็นแกลเลอรี) · 457b8a5 (โพสต์อิทใส่อาชีพ·อายุ) + ก้อนโพสต์อิท + ก้อน handoff นี้
- **push จากเครื่อง owner เท่านั้น** (sandbox ไม่มีรหัส GitHub) → GitHub Desktop หรือ `git push`
- ⚠️ git บน Seagate ชอบทิ้ง `.git/index.lock` / `HEAD.lock` ค้าง → แก้: `find .git -maxdepth 1 -name "*.lock" -delete` (sandbox ลบได้แล้วหลังขอสิทธิ์ allow_cowork_file_delete) · commit ต้องใส่ `-c user.name="SandOtnim" -c user.email="SandOtnim.Jako@gmail.com"`

## การตัดสินใจล่าสุด (5 มิ.ย.)
- พิพิธภัณฑ์ 📦 ภาพ = แกลเลอรีเดินชม (กรอบไม้+โคม+ป้าย+เรื่องคลี่) · 💌 คำพูด = **โพสต์อิทพาสเทล 5 สี** เอียง+เทป+มุมพับซ้าย ไม่มีป้ายแยก แต่มี **อาชีพ·อายุตัวเล็กมุมล่างขวาบนกระดาษ**
- ทางเข้าห้อง = ภาพห้อง + hotspot 2 จุดแบบเดิม (ตัดจอมืด "เปิดประตู" ทิ้ง)
- จุดเปลี่ยนผนัง = pagination dots (ไม่มีเลขหน้า/ปุ่ม ‹ ›) · มีปุ่ม "← ทางเข้า"
- `museum-gallery-concept.html` ถูกลบแล้ว (อยู่ในประวัติ git ที่ f863349)
- เสนอ owner แล้วยังไม่ตอบ: ฟอนต์ลายมือ (เช่น Mali) บนโพสต์อิท — ถ้าเอาต้องเพิ่ม Google Font (ถามก่อนตามกฎ AI_BRIEF)

## เทคนิคแกลเลอรี (ของจริงใน museum.html แล้ว)
- เครื่องยนต์เดียว 2 ชุดข้อมูล: `openGallery('objects'|'words')` ท้าย `assets/js/museum.js` · CSS ท้าย `styles.css` scope `.mg-room`
- โหมด overview/walk/pinching อยู่บน `.mg-room` (ห้ามย้ายไป body — กัน class ค้างข้าม AJAX nav)
- ผนัง 3 ด้าน 18 ช่อง (objects: 6 จริง+12 เปล่า · words: 15+3) · กล้อง translate+scale บน .hall-inner, t∈[0,1] ขับทุกอย่าง
- pane/subroom เดิมของพิพิธภัณฑ์ถูกถอดหมด · ฟอร์มส่งของ (submitModal) + Google Form ฝากคำ ต่ออยู่ที่ end-wall
- เทสด้วย jsdom ผ่านครบ (สคริปต์อยู่ /tmp ของ sandbox — เขียนใหม่ได้ง่าย)

## งานค้างเรียงลำดับ (ดู AI_BRIEF §8 เป็น canon)
1. **Owner: push 6 commits** + ส่งข้อความอัปเดตทีม (ร่างไว้ให้แล้วในแชทก่อน — เพิ่มบรรทัดโพสต์อิท) → แล้วบอก AI ให้ย้าย TEAM-UPDATES ไป "ส่งทีมแล้ว"
2. ทีมเทสพิพิธภัณฑ์บนมือถือจริง (pinch สองนิ้ว iPhone Safari)
3. รอ owner: Google Sheet ID (import healjai-content-template.xlsx แล้วใส่ใน content-sheet.js) · ไฟล์เสียงธรรมชาติจากเพื่อน
4. รอแท้งค์: คำเซียมซีกลอน 8 → วางแท็บ mu
5. สวนหย่อนใจ: default list วงล้อ + ถ่ายรูปแชร์ · แบบทดสอบเป็น hero · เกาะแห่งเวลา bg (รอเนม)
6. Mobile overflow ทั้งเว็บ (owner จะคุยทีมก่อน) · Art re-gen 3D clay (แมว 7, เทพ 3, ห้อง 2)

## กฎทีม (จาก memory)
AI_BRIEF คือ canon — อัปเดต+push เสมอ · ทุก edit ลง TEAM-UPDATES จนกว่า owner บอก "ส่งทีมแล้ว" · ไม่เขียน commit message เว้นแต่ขอ · ถามตัวเลือกเป็นข้อความธรรมดา ไม่ใช้ widget · owner ไม่เขียนโค้ด อธิบายง่ายๆ · เรียกแทนตัวเอง "ฉัน/เธอ" ได้
