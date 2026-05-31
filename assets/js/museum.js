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

  // Render exhibits dynamically
  function renderExhibits() {
    const grid = document.getElementById('exhibitsGrid');
    grid.innerHTML = EXHIBITS.map(ex => `
      <div class="exhibit" data-exhibit-id="${ex.id}">
        <div class="exhibit-frame">
          <div class="exhibit-mat">
            <img class="exhibit-photo" src="${ex.img}" alt="${ex.title_en}" loading="lazy">
          </div>
        </div>
        <div class="exhibit-plaque">
          <div class="plaque-title">
            <span data-th>${ex.title_th}</span><span data-en>${ex.title_en}</span>
          </div>
          <div class="plaque-meta">
            ${ex.author} · ${ex.year}
          </div>
          <div class="plaque-tease">
            <span data-th>${ex.tease_th}</span><span data-en>${ex.tease_en}</span>
          </div>
          <span class="plaque-cta">
            <span data-th>อ่านเรื่องเต็ม →</span><span data-en>Read the story →</span>
          </span>
        </div>
      </div>
    `).join('');

    // Bind click → open detail modal
    grid.querySelectorAll('.exhibit').forEach(el => {
      el.addEventListener('click', () => openExhibit(el.dataset.exhibitId));
    });

    // Build dots indicator
    const dots = document.getElementById('exhibitDots');
    if (dots) {
      dots.innerHTML = '';
      EXHIBITS.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'exhibit-dot' + (i === 0 ? ' active' : '');
        d.dataset.idx = i;
        d.addEventListener('click', () => scrollToExhibit(i));
        dots.appendChild(d);
      });
    }
  }

  // ===== Exhibits horizontal slide nav + auto-advance =====
  let exhibitCurrentIdx = 0;
  let exhibitAutoTimer = null;
  let exhibitAutoOn = true;
  function scrollToExhibit(idx) {
    const grid = document.getElementById('exhibitsGrid');
    const items = grid.querySelectorAll('.exhibit');
    if (!items[idx]) return;
    exhibitCurrentIdx = idx;
    items[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    document.querySelectorAll('.exhibit-dot').forEach((d, i) =>
      d.classList.toggle('active', i === idx));
  }
  function nextExhibit() {
    const items = document.querySelectorAll('#exhibitsGrid .exhibit');
    if (!items.length) return;
    scrollToExhibit((exhibitCurrentIdx + 1) % items.length);
  }
  function prevExhibit() {
    const items = document.querySelectorAll('#exhibitsGrid .exhibit');
    if (!items.length) return;
    scrollToExhibit((exhibitCurrentIdx - 1 + items.length) % items.length);
  }
  function startExhibitAuto() {
    stopExhibitAuto();
    exhibitAutoTimer = setInterval(nextExhibit, 4500);
  }
  function stopExhibitAuto() {
    if (exhibitAutoTimer) clearInterval(exhibitAutoTimer);
    exhibitAutoTimer = null;
  }
  const ePrev = document.getElementById('exhibitPrev');
  const eNext = document.getElementById('exhibitNext');
  const eAuto = document.getElementById('exhibitAutoToggle');
  if (ePrev) ePrev.addEventListener('click', () => { prevExhibit(); if (exhibitAutoOn) startExhibitAuto(); });
  if (eNext) eNext.addEventListener('click', () => { nextExhibit(); if (exhibitAutoOn) startExhibitAuto(); });
  if (eAuto) eAuto.addEventListener('click', () => {
    exhibitAutoOn = !exhibitAutoOn;
    eAuto.classList.toggle('on', exhibitAutoOn);
    if (exhibitAutoOn) {
      eAuto.innerHTML = '<span data-th>⏸ หยุดเลื่อน</span><span data-en>⏸ Pause</span>';
      startExhibitAuto();
    } else {
      eAuto.innerHTML = '<span data-th>▶ เล่นต่อ</span><span data-en>▶ Play</span>';
      stopExhibitAuto();
    }
    // Re-apply lang
    const lang = body.dataset.lang || 'th';
    eAuto.querySelectorAll('[data-th]').forEach(s => s.style.display = lang === 'th' ? '' : 'none');
    eAuto.querySelectorAll('[data-en]').forEach(s => s.style.display = lang === 'en' ? '' : 'none');
  });
  // ===== Mac dock-style focus scaling =====
  function updateExhibitDock() {
    const grid = document.getElementById('exhibitsGrid');
    if (!grid) return;
    const items = grid.querySelectorAll('.exhibit');
    if (!items.length) return;
    const gridRect = grid.getBoundingClientRect();
    const center = gridRect.left + gridRect.width / 2;
    const reach = gridRect.width * 0.55;
    items.forEach(item => {
      const r = item.getBoundingClientRect();
      const itemCenter = r.left + r.width / 2;
      const dist = Math.abs(center - itemCenter);
      const norm = Math.min(dist / reach, 1);
      const scale = (1 - norm * 0.30).toFixed(3);
      const opacity = (1 - norm * 0.55).toFixed(2);
      item.style.setProperty('--dock-scale', scale);
      item.style.setProperty('--dock-opacity', opacity);
      item.style.zIndex = String(Math.round(40 - norm * 35));
    });
  }
  let dockRaf = null;
  function scheduleExhibitDock() {
    if (dockRaf) return;
    dockRaf = requestAnimationFrame(() => {
      updateExhibitDock();
      dockRaf = null;
    });
  }

  // Pause auto when user scrolls manually + recompute dock
  const exGrid = document.getElementById('exhibitsGrid');
  if (exGrid) {
    let scrollPauseTimer = null;
    exGrid.addEventListener('scroll', () => {
      scheduleExhibitDock();
      if (!exhibitAutoOn) return;
      stopExhibitAuto();
      clearTimeout(scrollPauseTimer);
      scrollPauseTimer = setTimeout(() => {
        if (exhibitAutoOn) startExhibitAuto();
      }, 3000);
    }, { passive: true });
  }
  window.addEventListener('resize', scheduleExhibitDock);
  // Initial layout pass after render
  setTimeout(updateExhibitDock, 300);
  setTimeout(updateExhibitDock, 900);

  // Auto-play now starts/stops based on museum subroom state
  // (see switchMuseumPane + exitMuseumSubroom below)

  // Render words gallery
  function renderWords() {
    const grid = document.getElementById('wordsGrid');
    grid.innerHTML = WORDS.map(w => `
      <div class="word-card-wall">
        <span class="quote-mark">"</span>
        <div class="word-quote">
          <span data-th>${w.th}</span><span data-en>${w.en}</span>
        </div>
        <div class="word-author">${w.author}</div>
      </div>
    `).join('');
  }

  renderExhibits();
  renderWords();

  // Tab switching
  document.querySelectorAll('.museum-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.pane;
      document.querySelectorAll('.museum-tab').forEach(t => t.classList.toggle('active', t.dataset.pane === target));
      document.querySelectorAll('.gallery-pane').forEach(p => p.classList.toggle('active', p.id === 'pane-' + target));
    });
  });

  // Exhibit detail modal
  const exhibitModal = document.getElementById('exhibitModal');
  function openExhibit(id) {
    const ex = EXHIBITS.find(e => e.id === id);
    if (!ex) return;
    document.getElementById('exhibitDetailPhoto').src = ex.img;
    document.getElementById('exhibitDetailEyebrow').textContent = ex.year;
    document.getElementById('exhibitDetailTitle').innerHTML =
      '<span data-th>' + ex.title_th + '</span>' +
      '<span data-en>' + ex.title_en + '</span>';
    document.getElementById('exhibitDetailMeta').textContent = ex.author;
    document.getElementById('exhibitDetailStory').innerHTML =
      '<span data-th>' + ex.story_th + '</span>' +
      '<span data-en>' + ex.story_en + '</span>';
    document.getElementById('exhibitDetailAuthor').textContent = '— ' + ex.author;
    exhibitModal.classList.add('active');
    body.style.overflow = 'hidden';
  }
  function closeExhibit() {
    exhibitModal.classList.remove('active');
    body.style.overflow = '';
  }
  document.querySelectorAll('[data-exhibit-close]').forEach(b => b.addEventListener('click', closeExhibit));
  exhibitModal.addEventListener('click', e => {
    if (e.target === exhibitModal) closeExhibit();
  });

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


  // ============ MUSEUM — Sub-room mode ============
  const museumInner = document.querySelector('#room-museum .museum-inner');
  function switchMuseumPane(target, enterSubroom = true) {
    document.querySelectorAll('.museum-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.pane === target));
    document.querySelectorAll('#room-museum .gallery-pane').forEach(p =>
      p.classList.toggle('active', p.id === 'pane-' + target));
    document.querySelectorAll('#room-museum .hotspot[data-mpane]').forEach(h =>
      h.classList.toggle('active', h.dataset.mpane === target));
    if (enterSubroom && museumInner) {
      museumInner.classList.add('subroom-active');
      const overlay = document.getElementById('room-museum');
      if (overlay) overlay.scrollTop = 0;
    }
    // Start auto-play only when on objects pane; stop otherwise
    if (target === 'objects') {
      // Reset to first item + recompute dock + start auto after layout
      setTimeout(() => {
        scrollToExhibit(0);
        updateExhibitDock();
        if (exhibitAutoOn) startExhibitAuto();
      }, 350);
    } else {
      stopExhibitAuto();
    }
  }
  function exitMuseumSubroom() {
    if (museumInner) museumInner.classList.remove('subroom-active');
    const overlay = document.getElementById('room-museum');
    if (overlay) overlay.scrollTop = 0;
    stopExhibitAuto();
  }
  document.querySelectorAll('.museum-tab').forEach(tab => {
    tab.addEventListener('click', () => switchMuseumPane(tab.dataset.pane, true));
  });
  document.querySelectorAll('#room-museum .hotspot[data-mpane]').forEach(h => {
    h.addEventListener('click', () => switchMuseumPane(h.dataset.mpane, true));
  });

  // Back buttons exit subroom
  document.querySelectorAll('[data-subroom-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.closest('#room-alone')) exitAloneSubroom();
      else if (btn.closest('#room-museum')) exitMuseumSubroom();
    });
  });


  const museumRoot = document.querySelector('#room-museum .museum-inner'); if (museumRoot) museumRoot.classList.remove('subroom-active');
})();
