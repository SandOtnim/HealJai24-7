/* ============================================================
   HEALJAI CONTENT SHEET — หลังบ้านผ่าน Google Sheet
   ------------------------------------------------------------
   ทีมแก้คำเซียมซี/ไพ่ใน Google Sheet ได้เอง โดยไม่ต้องแตะโค้ด
   เว็บจะดึงข้อมูลจากชีทตอนเปิดหน้า — ถ้าดึงไม่สำเร็จ (ยังไม่ใส่
   SHEET_ID / เน็ตล่ม / ชีทพัง) เว็บใช้คำชุดเดิมในโค้ดเหมือนเดิม

   วิธีเปิดใช้:
   1) เปิดไฟล์แม่แบบ healjai-content-template.xlsx แล้ว import
      เข้า Google Sheets (File → Import)
   2) ตั้งค่าแชร์: Anyone with the link → Viewer
   3) คัดลอก "Sheet ID" จาก URL ของชีท:
      docs.google.com/spreadsheets/d/【ส่วนนี้คือ ID】/edit
   4) วาง ID ลงในบรรทัด SHEET_ID ข้างล่าง
   ============================================================ */
(() => {
  // ====== วาง Google Sheet ID ระหว่างเครื่องหมายคำพูดตรงนี้ ======
  const SHEET_ID = '';
  // ===============================================================

  window.HealSheet = window.HealSheet || {};
  if (!SHEET_ID) return;

  const base = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID +
    '/gviz/tq?tqx=out:csv&sheet=';

  // ---- tiny CSV parser (handles quoted fields + commas + newlines) ----
  function parseCSV(text) {
    const rows = [];
    let row = [], field = '', inQ = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inQ) {
        if (ch === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else inQ = false;
        } else field += ch;
      } else if (ch === '"') inQ = true;
      else if (ch === ',') { row.push(field); field = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(field); field = '';
        if (row.length > 1 || row[0] !== '') rows.push(row);
        row = [];
      } else field += ch;
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    if (!rows.length) return [];
    // first row = headers (lowercased)
    const head = rows[0].map(h => h.trim().toLowerCase());
    return rows.slice(1).map(r => {
      const o = {};
      head.forEach((h, i) => { o[h] = (r[i] || '').trim(); });
      return o;
    });
  }

  function fetchTab(name) {
    return fetch(base + encodeURIComponent(name), { cache: 'no-store' })
      .then(r => { if (!r.ok) throw new Error(name); return r.text(); })
      .then(parseCSV);
  }

  Promise.allSettled([fetchTab('mu'), fetchTab('cafe'), fetchTab('tarot')])
    .then(([mu, cafe, tarot]) => {
      try {
        // ---- mu: เซียมซีศาลฮีลใจ — columns: num, th, en ----
        if (mu.status === 'fulfilled') {
          const th = [], en = [];
          mu.value.forEach(r => {
            if (r.th) { th.push(r.th); en.push(r.en || r.th); }
          });
          if (th.length >= 3) window.HealSheet.mu = { th, en };
        }
        // ---- cafe: เซียมซีคาเฟ่ — columns: category, num, head_th, head_en, th, en ----
        if (cafe.status === 'fulfilled') {
          const byCat = {};
          cafe.value.forEach(r => {
            const cat = (r.category || '').toLowerCase();
            if (!cat || !r.th || !r.head_th) return;
            (byCat[cat] = byCat[cat] || []).push({
              num: parseInt(r.num, 10) || (byCat[cat].length + 1),
              head_th: r.head_th, head_en: r.head_en || r.head_th,
              th: r.th, en: r.en || r.th,
            });
          });
          const out = {};
          Object.keys(byCat).forEach(c => { if (byCat[c].length >= 3) out[c] = byCat[c]; });
          if (Object.keys(out).length) window.HealSheet.cafe = out;
        }
        // ---- tarot: ไพ่ — columns: num, sym, name_th, name_en, image ----
        if (tarot.status === 'fulfilled') {
          const cards = tarot.value
            .filter(r => r.name_th && (r.sym || r.image))
            .map(r => ({
              sym: r.sym || '✦',
              name_th: r.name_th,
              name_en: r.name_en || r.name_th,
              image: r.image || '',
            }));
          if (cards.length >= 8) window.HealSheet.tarot = cards;
        }
      } catch (e) { /* malformed sheet → keep fallback content */ }
      document.dispatchEvent(new CustomEvent('healsheet:ready'));
    });
})();
