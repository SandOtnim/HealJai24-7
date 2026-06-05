(() => {
  if (!document.querySelector('[data-page="museum"]')) return;
  const body = document.body;
  // ============================================================
  // MUSEUM ROOM — Art Gallery (frames + plaques + detail modal)
  // ============================================================

  // === Exhibit data === (real photos generated, real-feeling stories)
  const EXHIBITS = [
    {
      id: 'watch',
      img: 'assets/images/exhibit-watch.jpg',
      title_th: 'นาฬิกาของแฟนเก่า',
      title_en: 'Watch from a former lover',
      author: 'S, 28 · กรุงเทพฯ',
      year: 'ฝาก 2026',
      tease_th: 'เก็บไว้ 3 ปี ดูทุกครั้งก็เจ็บ…',
      tease_en: 'Three years of looking at it. Three years of hurt.',
      story_th: 'เขาให้ผมก่อนแยกทาง บอกว่า "เก็บไว้ดูเวลาเสมอ" — เก็บไว้ 3 ปี ดูทุกครั้งก็เจ็บ ลังเลจะทิ้งหลายครั้ง พอได้เขียนเรื่องนี้แล้วฝากไว้ที่นี่ รู้สึกใจเบาขึ้นจริงๆ ขอบคุณช่วงเวลาที่เคยมี ขอบคุณบทเรียนที่ได้',
      story_en: 'He gave it to me before we parted ways — "to remember time," he said. Three years I kept it. Three years it hurt every glance. I almost threw it away so many times. Writing this and leaving it here, my heart finally feels lighter. Thank you for the time we had. Thank you for the lesson.',
    },
    {
      id: 'ring',
      img: 'assets/images/exhibit-ring.jpg',
      title_th: 'แหวนของแม่',
      title_en: "Mother's ring",
      author: 'M, 34 · เชียงใหม่',
      year: 'ฝาก 2026',
      tease_th: 'กลัวจะลืมแม่ ถ้าไม่เก็บแหวนวงนี้…',
      tease_en: "Afraid I'd forget her without this ring…",
      story_th: 'แม่ใส่แหวนวงนี้ทุกวัน วันที่แม่จากไปกะทันหัน แหวนวงนี้กลายเป็นทุกอย่างของแม่ในมือเรา ผ่านมาหกปี ฉันยังเปิดกล่องดูทุกครั้งที่คิดถึง วันนี้ฉันพร้อมแล้ว — แม่อยู่ในใจฉันตลอด ไม่ต้องอยู่ในกล่องนี้ก็ได้',
      story_en: "Mom wore this ring every day. The day she suddenly passed, this ring became everything she was. Six years on, I still open the box every time I miss her. Today I'm ready — she lives in my heart, she doesn't need to live in this box.",
    },
    {
      id: 'ticket',
      img: 'assets/images/exhibit-ticket.jpg',
      title_th: 'ตั๋ว Cinema Paradiso · Row G, Seat 14',
      title_en: 'A Cinema Paradiso ticket · Row G, Seat 14',
      author: 'A, 33 · Rome, Italy',
      year: 'Donated 2026',
      tease_th: 'เดทแรกของเรา — เราไม่ได้ไปต่อ แต่หนังเรื่องนั้นยังอยู่ในใจ',
      tease_en: 'Our first date. We didn\'t last. The film stayed.',
      story_th: 'เขาพาฉันไปดู Cinema Paradiso ในเดทแรก เราคุยกันเรื่อง Toto กับ Alfredo จนถึงเช้า ห้าปีต่อมาเราเลิกกัน ตั๋วนี้อยู่ในกระเป๋าฉันมาเก้าปี วันนี้ฉันรู้ว่าหนังเรื่องนั้นไม่ได้เป็นของเรา — มันเป็นของฉัน',
      story_en: "He took me to see Cinema Paradiso on our first date. We talked about Toto and Alfredo until morning. Five years later we broke up. This ticket lived in my wallet for nine years. Today I realize the film was never ours — it was mine.",
    },
    {
      id: 'backpack',
      img: 'assets/images/exhibit-backpack.jpg',
      title_th: 'กระเป๋าเก่ายุค 90s — "Save the Whales"',
      title_en: "Backpack from the '90s — \"Save the Whales\"",
      author: "J, 47 · Portland, OR",
      year: 'Donated 2026',
      tease_th: 'พามาตั้งแต่ไฮสคูล ปี \'94 — ผ่านทุกอย่าง ถึงเวลาให้มันได้พัก',
      tease_en: "Carried me since high school in '94. Time to let it rest.",
      story_th: 'พามาตั้งแต่ปี 1994 — ผ่านไฮสคูล มหาวิทยาลัย งานแรก ความรักสองครั้ง การย้ายเมืองสามรอบ Sticker "Save the Whales" ที่ติดไว้ตอน 16 ยังอยู่ตรงนั้น ผมเปลี่ยนไปเยอะ แต่ติดกระเป๋าใบเดิม วันนี้ขอบคุณกันและกัน — แล้วเริ่มใหม่',
      story_en: "Came with me since 1994 — through high school, college, my first job, two heartbreaks, three city moves. The \"Save the Whales\" sticker I put on at 16 is still there. I've changed so much, but I clung to the same bag. Today, we thank each other — and I start fresh.",
    },
    {
      id: 'photo',
      img: 'assets/images/exhibit-photo.jpg',
      title_th: 'ภาพคู่กับหมาที่จากไปแล้ว',
      title_en: 'A photo with a dog who is gone',
      author: 'N, 31 · ปทุมธานี',
      year: 'ฝาก 2026',
      tease_th: 'หมาตัวนั้นตายแล้ว แฟนคนนั้นก็ไม่ใช่แฟนแล้ว',
      tease_en: "The dog is gone. The lover, gone. The picture, doubled grief.",
      story_th: 'มันคือสุนัขตัวแรกของชีวิต — กับคนที่ฉันเคยคิดว่าจะอยู่ด้วยตลอด ทั้งสองเหลือแค่ภาพนี้ เก็บมา 4 ปี เปิดดูทุกครั้งคือเจ็บคู่ ขอบคุณช่วงเวลาที่ได้เป็นเจ้าของทั้งสองในเวลาเดียวกัน — แม้สั้นไป',
      story_en: "He was my first dog — with the person I once thought I'd stay with forever. Both gone, only this photo left. Four years of keeping it. Looking at it was double grief. Thank you for the time of having both, even if it was too short.",
    },
    {
      id: 'pants',
      img: 'assets/images/exhibit-pants.jpg',
      title_th: 'กางเกงตัวที่ใส่ตอนสอบติดแพทย์',
      title_en: "Pants from the day I got into med school",
      author: 'R, 26 · กรุงเทพฯ',
      year: 'ฝาก 2026',
      tease_th: 'ใส่ทุกครั้งที่ต้องสอบใหญ่ จนกางเกงพังแล้ว',
      tease_en: "Worn for every big exam — until they fell apart.",
      story_th: 'ตัวนี้ใส่วันสอบติดแพทย์ — แล้วใส่ทุกวันสอบใหญ่หลังจากนั้น เป็น "lucky charm" ของฉัน 8 ปี ผ่านมาแล้ว เข่ากางเกงขาดทั้งสองข้าง ฉันรู้ว่าโชคไม่ได้อยู่ที่กางเกงแล้ว — มันอยู่ที่ฉัน',
      story_en: "Wore them on the day I got into med school — and every big exam after. My lucky charm for 8 years. Both knees are torn through now. I know the luck doesn't live in the pants anymore — it lives in me.",
    },
  ];

  // === Words data — real quotes from survey responses (anonymized: occupation + age only) ===
  const WORDS = [
    {
      th: 'เหนื่อยนักก็พักนิ่งๆ ดูความรู้สึกของเราไปเรื่อยๆ',
      en: "When you're really tired, rest still — and just watch your feelings drift by.",
      author: '— ข้าราชการบำนาญ · 65',
    },
    {
      th: 'ทุกปัญหาแก้ได้ที่ตัวเรา — สิ่งศักดิ์สิทธิ์เป็นเพียงตัวช่วยให้สบายใจขึ้น',
      en: 'Every problem is solved within ourselves — the sacred just helps us feel better.',
      author: '— พนักงานเอกชน · 33',
    },
    {
      th: 'มันเป็นเช่นนั้นเอง! ทุกอย่างไม่แน่',
      en: 'It is what it is! Nothing is certain.',
      author: '— ว่างงาน · 62',
    },
    {
      th: 'ตั้งสติอยู่กับปัจจุบัน ในที่สุดจะเกิดปัญญาแก้ปัญหาต่างๆ ได้เอง',
      en: 'Stay present with yourself — wisdom to solve will arise on its own.',
      author: '— ข้าราชการบำนาญ · 65',
    },
    {
      th: 'โลกเปลี่ยนแปลงเร็ว วุ่นวาย ต้องรักตัวเองให้เป็น ให้กำลังใจตัวเองบ้าง',
      en: 'The world changes fast and gets chaotic — learn to love yourself, cheer yourself on.',
      author: '— Freelance · 52',
    },
    {
      th: 'ชีวิตมันสั้น ไปหาของอร่อยกินกันเถอะ!',
      en: "Life's short — let's go find something delicious to eat!",
      author: '— พนักงานบริษัท · 31',
    },
    {
      th: 'เชื่อว่าชีวิตเราจะมีสิ่งดีๆ เกิดขึ้นได้ ถึงวันนี้จะเป็น bad day แต่วันต่อไปมันจะต้องดีขึ้นจ้า',
      en: "I believe good things still come. Today might be a bad day — but tomorrow will be better.",
      author: '— พนักงานบริษัท · 31',
    },
    {
      th: 'ชีวิตจะมีทางออกของมันเสมอ วางใจได้เลย',
      en: 'Life always finds a way out. You can trust that.',
      author: '— เจ้าของกิจการ · 32',
    },
    {
      th: 'เราไม่มีทางรู้หรอกว่าเราเข้มแข็งได้แค่ไหน จนมันเป็นทางเลือกสุดท้ายที่เรามี — พวกเราเก่งนะ',
      en: "We never know how strong we are until being strong is the only choice. We're brave.",
      author: '— พนักงานเอกชน · 32',
    },
    {
      th: 'ในเวลาที่ยังหายใจอยู่ อย่างน้อยก็ต้องพยายามใช้ชีวิตให้ดี ให้มีความสุขนะ',
      en: "While we're still breathing, at least try to live well — to be happy.",
      author: '— พนง.ออฟฟิศ · 32',
    },
    {
      th: 'Manage expectation ตัวเองให้เป็น — หัดช่างแม่งบ่อยๆ',
      en: 'Learn to manage your own expectations — practice letting things go.',
      author: '— พนง.ออฟฟิศ · 32',
    },
    {
      th: 'บางวันอาจจะเหนื่อยหรือยากไปบ้าง แต่ก็อยากให้เธอยังอยู่ข้างตัวเอง ใจดีกับตัวเอง',
      en: 'Some days are heavy. I just hope you stay on your own side — be kind to yourself.',
      author: '— Subtitle editor · 32',
    },
    {
      th: 'รักตัวเองให้มากๆ โลกนี้ยังมีสิ่งน่ารักเต็มไปหมดให้เราได้พบเจอ :)',
      en: "Love yourself plenty — the world still has so many lovely things waiting :)",
      author: '— Freelance · 30',
    },
    {
      th: 'เดี๋ยวพรุ่งนี้มันก็ดีขึ้น ถ้าไม่ดีขึ้นก็รอวันต่อๆ ไป มันจะมีวันที่ดีเอง งุงิ คริคริ ⭐',
      en: 'Tomorrow will be better. If not, the day after. A good day will come ⭐',
      author: '— Video Editor · 32',
    },
    {
      th: 'กินข้าวให้อิ่ม ฟังเพลงที่ชอบ ดูเมะเรื่องโปรด รักตัวเองในแบบตัวเองนะ',
      en: 'Eat full, play your favorite songs, watch your favorite anime — love yourself, your way.',
      author: '— พนักงานบริษัท · 22',
    },
  ];

  // Submit modal
  const submitModal = document.getElementById('submitModal');
  const submitForm = document.getElementById('submitForm');
  const submitSuccess = document.getElementById('submitSuccess');
  const photoGroup = document.getElementById('photoGroup');
  const uploadZone = document.getElementById('uploadZone');
  const uploadText = document.getElementById('uploadText');
  const photoInput = document.getElementById('photoInput');
  const titleInput = document.getElementById('titleInput');
  const storyInput = document.getElementById('storyInput');
  const signInput = document.getElementById('signInput');
  const submitGo = document.getElementById('submitGo');
  const submitTitle = document.getElementById('submitTitle');

  function openSubmit(type) {
    // type: 'object' or 'word'
    submitForm.style.display = '';
    submitSuccess.classList.remove('show');
    // reset form
    photoInput.value = '';
    titleInput.value = '';
    storyInput.value = '';
    signInput.value = '';
    uploadZone.classList.remove('has-file');
    uploadText.innerHTML =
      '<span data-th>คลิกเพื่อเลือกรูป (jpg/png ไม่เกิน 5MB)</span>' +
      '<span data-en>Click to choose a photo (jpg/png, ≤ 5MB)</span>';
    if (type === 'word') {
      photoGroup.style.display = 'none';
      submitTitle.innerHTML = '<span data-th>ส่งคำของคุณ</span><span data-en>Submit your words</span>';
    } else {
      photoGroup.style.display = '';
      submitTitle.innerHTML = '<span data-th>ฝากของของคุณ</span><span data-en>Submit your item</span>';
    }
    submitModal.classList.add('active');
    body.style.overflow = 'hidden';
  }
  function closeSubmit() {
    submitModal.classList.remove('active');
    body.style.overflow = '';
  }

  document.querySelectorAll('[data-submit-type]').forEach(b =>
    b.addEventListener('click', () => openSubmit(b.dataset.submitType))
  );
  document.querySelectorAll('[data-submit-close]').forEach(b =>
    b.addEventListener('click', closeSubmit)
  );
  submitModal.addEventListener('click', e => {
    if (e.target === submitModal) closeSubmit();
  });

  uploadZone.addEventListener('click', () => photoInput.click());
  photoInput.addEventListener('change', () => {
    if (photoInput.files && photoInput.files[0]) {
      const f = photoInput.files[0];
      uploadZone.classList.add('has-file');
      uploadText.textContent = '✓ ' + f.name;
    }
  });

  submitGo.addEventListener('click', () => {
    // Visual mockup — in real version this would POST to backend
    submitForm.style.display = 'none';
    submitSuccess.classList.add('show');
  });


  // ============ MUSEUM — hotspots ============
  // ทั้ง 2 โซนเปิดแกลเลอรีเดินชมเดียวกัน: 📦 objects = ภาพของจริง · 💌 words = กรอบคำพูด
  document.querySelectorAll('#room-museum .hotspot[data-mpane]').forEach(h => {
    h.addEventListener('click', () => openGallery(h.dataset.mpane === 'words' ? 'words' : 'objects'));
  });


  /* ============================================================
     MUSEUM GALLERY — เดินชมแกลเลอรี (ฉากเดียวกล้องเดียว)
     ย้ายมาจาก museum-gallery-concept.html (ทีมเคาะ 5 มิ.ย. 2026)
     - overview: ภาพกระจายบนผนังแบบ salon wall, ผนัง 3 ด้าน 18 ช่อง
     - walk: เดินชมแถวยาว ไฟหรี่เหลือลำแสงโคม เรื่องคลี่ใต้ภาพ
     - กล้อง = translate+scale บน .hall-inner · t∈[0,1] ขับทุกอย่าง
     - pinch สองนิ้ว / trackpad pinch = นิ้วถือกล้องเอง
     โหมดทั้งหมดอยู่บน .mg-room (ไม่แตะ body — กัน class ค้างข้าม AJAX nav)
     ============================================================ */
  const mgRoom = document.getElementById('mgRoom');
  let openGallery = () => {};
  if (mgRoom) {

  // 2 ชุดข้อมูล ใช้เครื่องยนต์เดียวกัน: 'objects' = ภาพของจริง · 'words' = กรอบคำพูด
  // เติมช่องว่าง (placeholder) จนเต็มผนัง 3 ด้าน 18 ช่อง
  const WALL_SIZE = 6;
  const TOTAL_SLOTS = 18;
  function makeItems(type) {
    const items = type === 'words'
      ? WORDS.map(w => ({ word: true, th: w.th, en: w.en, author: w.author }))
      : EXHIBITS.slice();
    while (items.length < TOTAL_SLOTS) {
      items.push({ placeholder: true, num: String(items.length + 1).padStart(2, '0') });
    }
    return items;
  }
  let GALLERY = [];
  let currentType = null;
  let WALL_COUNT = TOTAL_SLOTS / WALL_SIZE;
  let currentWall = 0;
  let currentIdx = 0;
  let mode = 'overview'; // 'overview' | 'walk' | 'pinching'
  let camAnim = false;

  const hall = document.getElementById('mgHall');
  const inner = document.getElementById('mgHallInner');
  const endWall = document.getElementById('mgEndWall');
  const walkHint = document.getElementById('mgWalkHint');
  const walkDim = mgRoom.querySelector('.walk-dim');
  const ovBack = document.getElementById('mgOvBack');
  const hudCount = document.getElementById('mgHudCount');
  const hudBar = document.getElementById('mgHudBar');

  // ----- สร้างชิ้นงานตามชุดข้อมูล (สองภาษาด้วย data-th/data-en — สลับภาษาผ่าน CSS อัตโนมัติ) -----
  function buildPieces(type) {
    currentType = type;
    GALLERY = makeItems(type);
    WALL_COUNT = Math.ceil(GALLERY.length / WALL_SIZE);
    inner.querySelectorAll('.piece').forEach(p => p.remove());
    GALLERY.forEach((ex, i) => {
      const piece = document.createElement('div');
      piece.className = 'piece';
      piece.dataset.idx = i;
      if (type === 'words') {
        // โซนคำพูด = โพสต์อิทแปะผนัง (ไม่มีกรอบ/โคม/ป้าย — ไม่ระบุตัวตน)
        const note = ex.placeholder
          ? `<div class="note note-empty tilt${i % 3}"><span class="note-tape"></span>
               <div class="ph-num">${ex.num}</div>
               <div class="note-empty-text"><span data-th>ยังว่างอยู่ — รอคำของเธอ</span><span data-en>Still empty — waiting for your words</span></div></div>`
          : `<div class="note note-c${i % 5} tilt${i % 3}"><span class="note-tape"></span>
               <div class="note-text"><span data-th>${ex.th}</span><span data-en>${ex.en}</span></div></div>`;
        piece.innerHTML = `
          <div class="spot"></div>
          <div class="art">${note}</div>
        `;
      } else {
        let visual, title, meta, story = '';
        if (ex.placeholder) {
          visual = `<div class="ph-slot"><div class="ph-num">${ex.num}</div>
               <div class="ph-text"><span data-th>ยังว่างอยู่</span><span data-en>Still empty</span></div></div>`;
          title = `<span data-th>หมายเลข ${ex.num}</span><span data-en>No. ${ex.num}</span>`;
          meta = `<span data-th>ยังไม่มีภาพจัดแสดง · รอเรื่องของเธอ</span><span data-en>Nothing here yet · waiting for your story</span>`;
        } else {
          visual = `<img src="${ex.img}" alt="${ex.title_en}" loading="lazy">`;
          title = `<span data-th>${ex.title_th}</span><span data-en>${ex.title_en}</span>`;
          meta = `${ex.author} · ${ex.year}`;
          story = `<div class="plaque-story"><span data-th>${ex.story_th}</span><span data-en>${ex.story_en}</span></div>
           <div class="plaque-sig">— ${ex.author}</div>`;
        }
        piece.innerHTML = `
          <div class="spot"></div>
          <div class="art">
            <div class="lamp"></div>
            <div class="frame">
              <div class="mat">${visual}</div>
            </div>
            <div class="plaque">
              <div class="plaque-title">${title}</div>
              <div class="plaque-meta">${meta}</div>
              ${story}
            </div>
          </div>
        `;
      }
      const onTap = () => {
        if (camAnim || mode === 'pinching') return;
        if (mode === 'overview') zoomToPiece(i);
        // โหมดเดินชม: เรื่องโชว์เต็มอยู่แล้ว ไม่ต้องกดดู
      };
      piece.querySelector('.art').addEventListener('click', onTap);
      inner.insertBefore(piece, endWall);
    });
    buildDots();
  }

  /* ----- กล้อง: คณิตศาสตร์เดียว ใช้ทั้งสองมุม -----
     มุมกว้าง: กล้องเฉยๆ ภาพย้ายตัวเองไปตำแหน่งกระจาย
     มุมใกล้:  scale 1, translate = -scrollLeft ของภาพเป้าหมาย */
  function camOverview() { return 'translate(0px, 0px) scale(1)'; }
  function camCloseUp(scrollX) { return 'translate(' + (-scrollX) + 'px, 0px) scale(1)'; }

  // ตำแหน่งกระจายบนผนัง (สัดส่วนของจอ) + เอียงนิดๆ ให้มีชีวิต
  const SCATTER = [
    { x: 0.18, y: 0.34, r: -1.4 },
    { x: 0.50, y: 0.33, r:  1.0 },
    { x: 0.82, y: 0.34, r: -0.8 },
    { x: 0.18, y: 0.70, r:  1.2 },
    { x: 0.50, y: 0.71, r: -1.0 },
    { x: 0.82, y: 0.70, r:  1.4 },
  ];
  const SCATTER_MOBILE = [
    { x: 0.26, y: 0.23, r: -2.2 },
    { x: 0.74, y: 0.26, r:  1.6 },
    { x: 0.24, y: 0.51, r:  1.4 },
    { x: 0.76, y: 0.54, r: -1.6 },
    { x: 0.28, y: 0.79, r:  2.0 },
    { x: 0.72, y: 0.82, r: -1.4 },
  ];
  let scatterState = [];
  function computeScatter() {
    const V = hall.clientWidth, H = hall.clientHeight;
    if (!V) return scatterState; // ยังไม่ได้เปิด/ถูกซ่อนอยู่
    const mobile = V < 700;
    const layout = mobile ? SCATTER_MOBILE : SCATTER;
    const pieces = inner.querySelectorAll('.piece');
    const targetW = mobile ? V * 0.37 : Math.min(V * 0.21, 280);
    scatterState = [];
    pieces.forEach((p, i) => {
      const wall = Math.floor(i / WALL_SIZE);
      const spot = layout[i % WALL_SIZE % layout.length];
      let k = targetW / p.offsetWidth;
      if (!mobile) {
        // desktop: จำกัดความสูงด้วย — ภาพแนวตั้งไม่ทะลุไปทับหัวข้อ/จุดเปลี่ยนผนัง
        k = Math.min(k, (H * 0.28) / p.offsetHeight);
      }
      const naturalCX = p.offsetLeft + p.offsetWidth / 2;
      const naturalCY = H / 2;
      const wallShift = (wall - currentWall) * V * 1.45; // ผนังอื่นยืนรอนอกจอ
      scatterState.push({ dx: spot.x * V - naturalCX + wallShift, dy: spot.y * H - naturalCY, k, r: spot.r });
    });
    return scatterState;
  }
  function scatterPieces() {
    computeScatter();
    inner.querySelectorAll('.piece').forEach((p, i) => {
      const s = scatterState[i];
      if (!s) return;
      p.style.transform = 'translate(' + s.dx + 'px, ' + s.dy + 'px) scale(' + s.k + ') rotate(' + s.r + 'deg)';
    });
  }
  function targetScroll(i) {
    const p = inner.querySelectorAll('.piece')[i];
    const max = inner.scrollWidth - hall.clientWidth;
    return Math.max(0, Math.min(max, p.offsetLeft + p.offsetWidth / 2 - hall.clientWidth / 2));
  }

  // ----- ซูมเข้า/ออก -----
  function zoomToPiece(i) {
    if (mode !== 'overview' || camAnim) return;
    mode = 'pinching';
    computeScatter();
    const L = targetScroll(i);
    hall.scrollLeft = 0;
    animateCam(0, 1, L, i, 1150);
  }
  function zoomOut() {
    if (mode !== 'walk' || camAnim) return;
    mode = 'pinching';
    mgRoom.classList.remove('walk-mode'); // เปิดไฟกลับก่อนถอยกล้อง
    const L = hall.scrollLeft;
    currentWall = Math.floor(currentIdx / WALL_SIZE);
    setWall(currentWall);
    computeScatter();
    hall.scrollLeft = 0;
    inner.style.transform = camCloseUp(L);
    ovBack.classList.remove('show');
    animateCam(1, 0, L, currentIdx, 1150);
  }

  // ----- จุดบอกผนัง — กดจุดไหนกระโดดไปผนังนั้น (สร้างใหม่ตามจำนวนผนังของชุดข้อมูล) -----
  const wallNav = document.getElementById('mgWallNav');
  let wallDots = [];
  function buildDots() {
    wallNav.innerHTML = '';
    wallDots = [];
    for (let w = 0; w < WALL_COUNT; w++) {
      const d = document.createElement('button');
      d.className = 'wall-dot';
      d.setAttribute('aria-label', 'ผนังที่ ' + (w + 1));
      d.addEventListener('click', () => setWall(w));
      wallNav.appendChild(d);
      wallDots.push(d);
    }
    wallDots[0].classList.add('active');
  }
  function setWall(w) {
    currentWall = Math.max(0, Math.min(WALL_COUNT - 1, w));
    wallDots.forEach((d, i) => d.classList.toggle('active', i === currentWall));
    if (mode === 'overview') scatterPieces(); // .piece มี transition → ภาพไหลไปเอง
  }

  // ปัดซ้าย-ขวาในมุมกว้าง = เปลี่ยนผนัง
  let wallSwipe = null;
  hall.addEventListener('pointerdown', (e) => {
    if (mode !== 'overview' || camAnim) return;
    wallSwipe = { x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY };
  });
  window.addEventListener('pointermove', (e) => {
    if (wallSwipe) { wallSwipe.x = e.clientX; wallSwipe.y = e.clientY; }
  });
  function endWallSwipe() {
    if (!wallSwipe || mode !== 'overview') { wallSwipe = null; return; }
    const dx = wallSwipe.x - wallSwipe.x0;
    const dy = wallSwipe.y - wallSwipe.y0;
    wallSwipe = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      setWall(currentWall + (dx < 0 ? 1 : -1));
    }
  }
  window.addEventListener('pointerup', endWallSwipe);
  window.addEventListener('pointercancel', endWallSwipe);

  document.getElementById('mgOvWalkBtn').addEventListener('click', () => zoomToPiece(currentWall * WALL_SIZE));
  ovBack.addEventListener('click', zoomOut);
  document.getElementById('mgOvExit').addEventListener('click', closeGallery);

  /* ----- PINCH — นิ้วเป็นคนถือกล้อง: t = 0 มุมกว้าง · t = 1 มุมใกล้ ----- */
  function applyCam(t, L, target) {
    inner.style.transform = 'translate(' + (-L * t) + 'px, 0px) scale(1)';
    const pieces = inner.querySelectorAll('.piece');
    pieces.forEach((p, i) => {
      const s = scatterState[i];
      if (!s) return;
      const u = 1 - t;
      const k = s.k + (1 - s.k) * t;
      p.style.transform = 'translate(' + (s.dx * u) + 'px, ' + (s.dy * u) + 'px) scale(' + k + ') rotate(' + (s.r * u) + 'deg)';
      p.style.setProperty('--reveal', t); // เรื่องเต็มทุกภาพคลี่ตาม t พร้อมกัน
    });
    walkDim.style.opacity = t; // ไฟหรี่ตาม t เป๊ะ
  }
  function finalizePinch(t, L, target) {
    mgRoom.classList.remove('pinching');
    if (t >= 1) {
      mode = 'walk';
      mgRoom.classList.remove('overview-mode');
      mgRoom.classList.add('walk-mode');
      walkDim.style.opacity = 1;
      inner.querySelectorAll('.piece').forEach(p => { p.style.transform = ''; });
      inner.style.transform = '';
      hall.scrollLeft = L;
      ovBack.classList.add('show');
      setLit(target);
      update();
    } else {
      mode = 'overview';
      mgRoom.classList.remove('walk-mode');
      walkDim.style.opacity = 0;
      inner.querySelectorAll('.piece').forEach(p => p.style.setProperty('--reveal', 0));
      currentWall = Math.floor(target / WALL_SIZE);
      setWall(currentWall);
      mgRoom.classList.add('overview-mode');
      inner.style.transform = camOverview();
      scatterPieces();
      hall.scrollLeft = 0;
      ovBack.classList.remove('show');
    }
  }
  const easeInOutCubic = p => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  function animateCam(tFrom, goal, L, target, D) {
    camAnim = true;
    mgRoom.classList.add('pinching'); // ปิด CSS transition — เครื่องยนต์นี้คุมเองทุกเฟรม
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / D, 1);
      applyCam(tFrom + (goal - tFrom) * easeInOutCubic(p), L, target);
      if (p < 1) requestAnimationFrame(step);
      else { camAnim = false; finalizePinch(goal, L, target); }
    }
    requestAnimationFrame(step);
  }
  function settlePinch(tFrom, goal, L, target) {
    const D = 260 + 480 * Math.abs(goal - tFrom); // เหลือทางน้อย = ใช้เวลาน้อย
    animateCam(tFrom, goal, L, target, D);
  }

  let pinch = null;
  function pinchDist(e) { return Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); }
  function beginPinch(e) {
    if (camAnim) return;
    const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    computeScatter();
    let target, t0;
    if (mode === 'overview') {
      let bd = Infinity;
      inner.querySelectorAll('.piece .art').forEach((f, i) => {
        if (Math.floor(i / WALL_SIZE) !== currentWall) return; // เฉพาะผนังที่เห็นอยู่
        const r = f.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - midX, r.top + r.height / 2 - midY);
        if (d < bd) { bd = d; target = i; }
      });
      t0 = 0;
    } else {
      target = currentIdx;
      t0 = 1;
      mgRoom.classList.remove('walk-mode'); // pinch ออก = ไฟค่อยๆ กลับมา
    }
    const L = targetScroll(target);
    if (t0 === 1) {
      const L0 = hall.scrollLeft;
      hall.scrollLeft = 0;
      inner.style.transform = camCloseUp(L0);
    }
    mgRoom.classList.add('pinching');
    pinch = { d0: pinchDist(e), t0, t: t0, L, target };
    mode = 'pinching';
  }
  hall.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2 && (mode === 'overview' || mode === 'walk')) {
      e.preventDefault();
      beginPinch(e);
    }
  }, { passive: false });
  hall.addEventListener('touchmove', (e) => {
    if (!pinch || e.touches.length !== 2) return;
    e.preventDefault();
    const ratio = pinchDist(e) / pinch.d0;
    let t;
    if (pinch.t0 === 0) t = (ratio - 1) / 1.1;
    else t = 1 + (ratio - 1) / 0.5;
    pinch.t = Math.max(0, Math.min(1, t));
    applyCam(pinch.t, pinch.L, pinch.target);
  }, { passive: false });
  hall.addEventListener('touchend', () => {
    if (!pinch) return;
    const { t, t0, L, target } = pinch;
    pinch = null;
    // hysteresis: ต้องดึงเกินครึ่งทางถึงจะเปลี่ยนมุม
    const goal = t0 === 0 ? (t > 0.35 ? 1 : 0) : (t < 0.65 ? 0 : 1);
    settlePinch(t, goal, L, target);
  });

  // trackpad pinch (ctrl+scroll) สำหรับ desktop — ฟิสิกส์เดียวกัน
  let wheelPinch = null, wheelTimer = null;
  hall.addEventListener('wheel', (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    if (camAnim) return;
    if (!wheelPinch) {
      computeScatter();
      let target, t0;
      if (mode === 'overview') {
        let bd = Infinity;
        inner.querySelectorAll('.piece .art').forEach((f, i) => {
          const r = f.getBoundingClientRect();
          const d = Math.hypot(r.left + r.width / 2 - e.clientX, r.top + r.height / 2 - e.clientY);
          if (d < bd) { bd = d; target = i; }
        });
        t0 = 0;
      } else if (mode === 'walk') {
        target = currentIdx; t0 = 1;
        const L0 = hall.scrollLeft;
        hall.scrollLeft = 0;
        inner.style.transform = camCloseUp(L0);
      } else return;
      mgRoom.classList.add('pinching');
      wheelPinch = { t: t0, t0, L: targetScroll(target), target };
      mode = 'pinching';
    }
    wheelPinch.t = Math.max(0, Math.min(1, wheelPinch.t - e.deltaY * 0.012));
    applyCam(wheelPinch.t, wheelPinch.L, wheelPinch.target);
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      const { t, t0, L, target } = wheelPinch;
      wheelPinch = null;
      const goal = t0 === 0 ? (t > 0.35 ? 1 : 0) : (t < 0.65 ? 0 : 1);
      settlePinch(t, goal, L, target);
    }, 180);
  }, { passive: false });

  // เดินด้วยล้อเมาส์แนวตั้ง (เฉพาะมุมใกล้)
  hall.addEventListener('wheel', (e) => {
    if (mode !== 'walk') return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      hall.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

  // ----- ไฟส่อง + HUD (มุมใกล้) -----
  function setLit(idx) {
    currentIdx = idx;
    inner.querySelectorAll('.piece').forEach((p, i) => {
      p.classList.toggle('lit', i === idx);
    });
    const nounTh = currentType === 'words' ? 'คำที่' : 'ภาพที่';
    hudCount.innerHTML =
      '<span data-th>' + nounTh + ' ' + (idx + 1) + ' / ' + GALLERY.length + '</span>' +
      '<span data-en>Piece ' + (idx + 1) + ' / ' + GALLERY.length + '</span>';
  }
  let raf = null;
  function update() {
    raf = null;
    if (mode !== 'walk') return;
    const x = hall.scrollLeft;
    const center = x + hall.clientWidth / 2;
    const pieces = inner.querySelectorAll('.piece');
    let active = 0, bestD = Infinity;
    pieces.forEach((p, i) => {
      const c = p.offsetLeft + p.offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < bestD) { bestD = d; active = i; }
    });
    setLit(active);
    const max = hall.scrollWidth - hall.clientWidth;
    hudBar.style.width = (max > 0 ? (x / max) * 100 : 0) + '%';
    if (x > 60) walkHint.classList.add('gone');
  }
  hall.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  window.addEventListener('resize', () => {
    if (!document.body.contains(mgRoom) || mgRoom.hidden) return;
    if (mode === 'overview') { inner.style.transform = camOverview(); scatterPieces(); }
    else update();
  });

  // ----- ฝุ่นละอองในแสง (อยู่ใน mgRoom — โชว์เฉพาะตอนแกลเลอรีเปิด) -----
  for (let i = 0; i < 14; i++) {
    const m = document.createElement('div');
    m.className = 'mote';
    const s = 2 + Math.random() * 3;
    m.style.width = m.style.height = s + 'px';
    m.style.left = Math.random() * 100 + 'vw';
    m.style.bottom = (10 + Math.random() * 40) + 'vh';
    m.style.animationDuration = (9 + Math.random() * 10) + 's';
    m.style.animationDelay = (Math.random() * 9) + 's';
    mgRoom.appendChild(m);
  }

  // ----- เปิด/ปิดแกลเลอรี (เรียกจาก hotspot 📦/💌 / ปุ่ม ← ทางเข้า) -----
  openGallery = function (type) {
    type = type || 'objects';
    if (type !== currentType) buildPieces(type);
    // หัวข้อมุมกว้าง + การ์ดท้ายผนัง ตามชุดข้อมูล
    document.getElementById('mgOvTitle').innerHTML = type === 'words'
      ? '<span data-th>ผนังคำพูดทั้งหมดในวันนี้</span><span data-en>All the words on the walls today</span>'
      : '<span data-th>ผนังเรื่องราวทั้งหมดในวันนี้</span><span data-en>All the stories on the walls today</span>';
    document.getElementById('mgOvSub').innerHTML = type === 'words'
      ? '<span data-th>เลือกคำที่ใจเรียก — กล้องจะพาเธอเดินเข้าไปดูใกล้ๆ</span><span data-en>Pick the words that call you — the camera walks you in close</span>'
      : '<span data-th>เลือกภาพที่ใจเรียก — กล้องจะพาเธอเดินเข้าไปดูใกล้ๆ</span><span data-en>Pick the one that calls you — the camera walks you in close</span>';
    document.getElementById('mgEndCardObjects').hidden = type !== 'objects';
    document.getElementById('mgEndCardWords').hidden = type !== 'words';
    mgRoom.hidden = false;
    mode = 'overview';
    currentIdx = 0;
    setWall(0);
    mgRoom.classList.add('overview-mode');
    mgRoom.classList.remove('walk-mode', 'pinching');
    walkDim.style.opacity = 0;
    ovBack.classList.remove('show');
    walkHint.classList.remove('gone');
    inner.style.transform = camOverview();
    inner.querySelectorAll('.piece').forEach(p => { p.classList.remove('lit'); p.style.setProperty('--reveal', 0); });
    requestAnimationFrame(scatterPieces);
    setTimeout(scatterPieces, 350); // recompute หลังฟอนต์/ภาพโหลด
  };
  function closeGallery() {
    mgRoom.classList.remove('overview-mode', 'walk-mode', 'pinching');
    inner.querySelectorAll('.piece').forEach(p => { p.style.transform = ''; p.classList.remove('lit'); p.style.setProperty('--reveal', 0); });
    inner.style.transform = '';
    hall.scrollLeft = 0;
    ovBack.classList.remove('show');
    mode = 'overview';
    currentIdx = 0;
    mgRoom.hidden = true;
  }

  } // end if (mgRoom)
})();
