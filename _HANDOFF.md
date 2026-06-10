# _HANDOFF — HealJai24-7
> อัปเดต: 6 มิ.ย. 2026 · Resume phrase ในแชทใหม่: **"ทำต่อโปรเจค ฮีลใจ 24/7"**
> แชทใหม่: อ่านไฟล์นี้ + `AI_BRIEF.md` (canon) + `TEAM-UPDATES.md` (ค้างส่งทีม) ก่อนเริ่ม

## กำลังทำอะไรอยู่
- Deadline เว็บเสร็จ **14 มิ.ย. 2026** · launch 16 มิ.ย.
- รอบนี้โฟกัส 2 เรื่อง: (1) คำเซียมซีกลอน 8 (2) ยกระดับ "ภาพ/ดีไซน์" ให้ว้าว — owner เป็นผู้กำกับซีรีส์ บาร์ภาพสูงมาก

## สถานะ git
- ก่อนหน้านี้ push ครบแล้ว (origin = main) · รอบนี้ยังไม่ได้ commit งานใหม่ (เซียมซี/ภาพ/team)
- **push จากเครื่อง owner เท่านั้น** (sandbox ไม่มีรหัส GitHub) · commit ใส่ `-c user.name="SandOtnim" -c user.email="SandOtnim.Jako@gmail.com"`
- ถ้า `.git/*.lock` ค้างบน Seagate: `find .git -maxdepth 1 -name "*.lock" -delete`

## การตัดสินใจ/ผลงานรอบนี้ (6 มิ.ย.)
1. **เซียมซี** — มี research จริง 6 สำนัก `research-siamsi.md` + ร่าง AI 24 ใบ `siamsi-heal-draft.md` (กลอน 8 ใบละ 8 วรรค ดีเลิศ5/ดี10/กลาง9 ไม่มีใบร้าย โครง "ใบที่X→อุปมา→ถาม..ว่า..→เอย") · สร้าง skill `siamsi-writing` (owner เซฟเองแล้ว) · **รอแท้งค์ขัด** แล้วแปล EN ครบ → วางแท็บ `mu` Google Sheet
2. **Art Direction ล็อก** = 3D ดินปั้น พาสเทล (ดู AI_BRIEF หัวข้อ 🎨) · workflow: Pinterest→Higgsfield(Auto+Unlimited God Mode)→คัท PNG โปร่ง
3. **สวนหย่อนใจ** — ปั่นวงล้อ clay ใหม่ → คัทโปร่ง `assets/images/garden-wheel.png` · เดโม `team/bakeoff/garden-wheel-demo.html` (หมุนเนียน หยุดถูกช่อง) — **owner ยังไม่ชอบ พักไว้** ยังไม่เข้า travel.html
4. **Head 2 คน** — `team/HEAD-A-สายลุย.md` vs `team/HEAD-B-สายปรึกษา.md` + ผลประชัน `team/bakeoff/` (report-A/B + garden-demo คนละเวอร์ชัน) — **owner เลือกอยู่ว่าจะใช้ใคร/ทั้งคู่**
5. **กำลังคุยค้าง: SVG/Recraft** — Higgsfield มี Recraft 4.1 ปั่น SVG ได้ · ตกลงว่า SVG เหมาะกับ ไอคอน/ลายเส้น/มาสคอต flat (ดินปั้นยังเป็น PNG) · **ค้างที่จะเทส**: ปั่น SVG จริง + ลองดึงโค้ด SVG (เป็น text) เข้าโปรเจกต์ตรงๆ — owner ให้เลือกของลอง: (1) ไอคอน 6 กิจกรรม (2) มาสคอตก้อนขาวลายเส้น (3) ลายเส้นตกแต่ง

## ข้อจำกัดเทคนิคที่เพิ่งเจอ (สำคัญ)
- ดึงไฟล์รูป/URL จาก Higgsfield เข้า sandbox **ไม่ได้** (ระบบบล็อก base64+URL) → owner ต้อง Download เองแล้วเซฟเข้าโฟลเดอร์ asset · SVG เป็น text อาจเลี่ยงได้ (รอเทส)
- Chrome อัตโนมัติเปิด `file://` ไม่ได้ (สิทธิ์ไฟล์โลคัล) → เทสหน้าเว็บโลคัลทำใน sandbox (PIL/node) แทน
- หน้า Higgsfield เป็น SPA สตรีม → screenshot ค้างบ่อย ระหว่างปั่น; รีโหลดแล้วดู History

## งานค้างเรียงลำดับ (ดู AI_BRIEF §8 เป็น canon)
1. เซียมซี: รอแท้งค์ขัดกลอน → แปล EN → วาง Sheet แท็บ mu
2. SVG/Recraft: เทสปั่น + ดึงเข้าโปรเจกต์ (owner เลือกของลอง)
3. สวนหย่อนใจ: คิดทิศใหม่ที่ owner ชอบ (เดโมเดิม pause)
4. owner เลือก Head A/B/ทั้งคู่
5. รอ owner: Google Sheet ID (เซียมซี/ไพ่/exhibits) · ไฟล์เสียงธรรมชาติ
6. ทีมเทสพิพิธภัณฑ์มือถือจริง (pinch) · Mobile overflow ทั้งเว็บ · Art re-gen 3D clay (แมว/เทพ/ห้อง)

## กฎทีม (canon)
AI_BRIEF = canon อัปเดต+push เสมอ · ทุก edit ลง TEAM-UPDATES จนกว่า owner บอก "ส่งทีมแล้ว" · ไม่เขียน commit message เว้นแต่ขอ · ถามตัวเลือกเป็นข้อความธรรมดา ไม่ใช้ widget · owner ไม่เขียนโค้ด อธิบายง่ายๆ · เรียก "ฉัน/เธอ" · **บาร์ภาพระดับว้าว (owner ผู้กำกับ)** · ภาพ Higgsfield ผ่าน God Mode (Auto+Unlimited)
