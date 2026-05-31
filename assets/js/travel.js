(() => {
  if (!document.querySelector('[data-page="travel"]')) return;
  const body = document.body;
  // ============================================================
  // WHEEL of activities (ออกไปข้างนอก) — Default list + Custom
  // ============================================================
  (function initWheel() {
    const disc = document.getElementById('wheelDisc');
    const spinBtn = document.getElementById('wheelSpin');
    const result = document.getElementById('wheelResult');
    const resultTitle = document.getElementById('wheelResultTitle');
    const againBtn = document.getElementById('wheelAgain');
    const modeBtns = document.querySelectorAll('.wheel-mode-btn');
    const customEditor = document.getElementById('wheelCustomEditor');
    const customTextarea = document.getElementById('wheelCustomList');
    const customSaveBtn = document.getElementById('wheelCustomSave');
    if (!disc || !spinBtn) return;

    const DEFAULT_ACTIVITIES = [
      'เดินรอบบ้าน 5 นาที',
      'มองท้องฟ้า 1 นาที',
      'หาต้นไม้เขียวเพ่งดู',
      'ไปคาเฟ่ใหม่',
      'ถ่ายรูป 3 อย่างที่สวย',
      'ปั่นจักรยานเล่น',
      'เดินซูเปอร์เปลี่ยนทาง',
      'ซื้อไอติมให้ตัวเอง',
      'โทรหาเพื่อนเก่า',
      'ไปสวนสาธารณะใกล้ๆ',
      'กินข้าวร้านใหม่',
      'ไปร้านหนังสือมือสอง',
    ];
    const WHEEL_COLORS = ['#f4b6a6','#e8a87c','#c1a07a','#a8c4a2','#cce0bc','#a8c4d8','#d8b4d8','#f4d6a6'];
    let activities = DEFAULT_ACTIVITIES.slice();
    let currentRotation = 0;
    let spinning = false;

    function getCustom() {
      try { return JSON.parse(localStorage.getItem('wheelCustom') || '[]'); }
      catch (_) { return []; }
    }
    function saveCustom(arr) {
      localStorage.setItem('wheelCustom', JSON.stringify(arr));
    }

    function drawWheel() {
      disc.innerHTML = '';
      const n = activities.length;
      if (n === 0) {
        disc.innerHTML = '<circle cx="200" cy="200" r="195" fill="#fefcf9" stroke="#c19a6c" stroke-width="2"/><text x="200" y="205" text-anchor="middle" fill="#8b6f47" font-size="16">ยังไม่มีรายการ</text>';
        return;
      }
      const sliceAngle = 360 / n;
      const cx = 200, cy = 200, r = 195;
      for (let i = 0; i < n; i++) {
        const startA = (i * sliceAngle - 90) * Math.PI / 180;
        const endA = ((i + 1) * sliceAngle - 90) * Math.PI / 180;
        const x1 = cx + r * Math.cos(startA);
        const y1 = cy + r * Math.sin(startA);
        const x2 = cx + r * Math.cos(endA);
        const y2 = cy + r * Math.sin(endA);
        const largeArc = sliceAngle > 180 ? 1 : 0;
        const path = `M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
        const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        slice.setAttribute('d', path);
        slice.setAttribute('fill', WHEEL_COLORS[i % WHEEL_COLORS.length]);
        slice.setAttribute('stroke', '#fff');
        slice.setAttribute('stroke-width', '2');
        disc.appendChild(slice);

        // Label — radial text reading from near-center toward outer edge.
        // Always start from center (uniform position across all slices) and rotate
        // so the text "spokes out" along the slice's midline.
        const midAngleDeg = i * sliceAngle + sliceAngle/2 - 90;
        const midAngleRad = midAngleDeg * Math.PI / 180;
        const innerR = 32;
        const lx = cx + innerR * Math.cos(midAngleRad);
        const ly = cy + innerR * Math.sin(midAngleRad);
        // Auto-fit font size: try to fit text within available radial length (~155px)
        const raw = activities[i];
        const maxLen = 155;
        // Approx Thai char ≈ 0.55 × fontSize, so size = maxLen / (chars * 0.55)
        let fontSize = Math.min(14, Math.max(8, Math.floor(maxLen / (raw.length * 0.6))));
        if (n > 10 && fontSize > 11) fontSize = 11;
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', lx);
        text.setAttribute('y', ly);
        text.setAttribute('fill', '#4a2f1a');
        text.setAttribute('font-size', fontSize);
        text.setAttribute('font-weight', '600');
        text.setAttribute('text-anchor', 'start');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('transform', `rotate(${midAngleDeg} ${lx} ${ly})`);
        text.textContent = raw;
        disc.appendChild(text);
      }
      // Center pivot
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', 20);
      c.setAttribute('fill', '#fff');
      c.setAttribute('stroke', '#c19a6c');
      c.setAttribute('stroke-width', '2');
      disc.appendChild(c);
    }

    function spin() {
      if (spinning || activities.length === 0) return;
      spinning = true;
      result.hidden = true;
      const n = activities.length;
      const winnerIdx = Math.floor(Math.random() * n);
      // Target rotation: pointer at top, so we rotate so winner slice midpoint is at top
      const sliceAngle = 360 / n;
      const targetDeg = 360 - (winnerIdx * sliceAngle + sliceAngle/2);
      // Add multiple full turns
      const turns = 5 + Math.random() * 2;
      currentRotation += turns * 360 + (targetDeg - (currentRotation % 360));
      disc.style.transform = `rotate(${currentRotation}deg)`;

      setTimeout(() => {
        resultTitle.textContent = activities[winnerIdx];
        result.hidden = false;
        spinning = false;
        // Save the picked activity for sharing
        window._wheelLastWin = activities[winnerIdx];
      }, 4600);
    }

    modeBtns.forEach(b => {
      b.addEventListener('click', () => {
        modeBtns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const mode = b.dataset.wheelMode;
        if (mode === 'custom') {
          customEditor.hidden = false;
          customTextarea.value = getCustom().join('\n');
        } else {
          customEditor.hidden = true;
          activities = DEFAULT_ACTIVITIES.slice();
          drawWheel();
        }
      });
    });

    customSaveBtn && customSaveBtn.addEventListener('click', () => {
      const lines = customTextarea.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (lines.length < 2) {
        alert('ใส่อย่างน้อย 2 กิจกรรมเลยนะ');
        return;
      }
      saveCustom(lines);
      activities = lines;
      drawWheel();
      customEditor.hidden = true;
    });

    spinBtn.addEventListener('click', spin);
    againBtn && againBtn.addEventListener('click', () => {
      result.hidden = true;
    });

    // Initial draw
    drawWheel();
  })();

  // ============================================================
  // SHOPPING mini-game (in #room-travel) — tap items into basket
  // ============================================================
  (function initShop() {
    const setup = document.getElementById('shopSetup');
    const play = document.getElementById('shopPlay');
    const result = document.getElementById('shopResult');
    const arena = document.getElementById('shopArena');
    const startBtn = document.getElementById('shopStart');
    const againBtn = document.getElementById('shopAgain');
    const timerEl = document.getElementById('shopTimer');
    const countEl = document.getElementById('shopCount');
    const statEl = document.getElementById('shopResultStat');
    const moodEl = document.getElementById('shopResultMood');
    if (!setup || !play || !result || !arena) return;

    const ZONE_ITEMS = {
      cosmetics: ['💄','💅','💋','🧴','🪞','💍','👛','🕶','🎀','💎'],
      snacks:    ['🍪','🍩','🧁','🍰','🍫','🍬','🍭','🍡','🍮','🥐'],
      plants:    ['🪴','🌱','🌿','🌵','🍀','🌷','🌸','🌻','🌹','🪻'],
    };
    const ZONE_LABEL_TH = { cosmetics:'เครื่องสำอาง', snacks:'ขนม', plants:'ต้นไม้' };

    let zone = 'cosmetics';
    let duration = 30;
    let collected = 0;
    let timerId = null;
    let spawnId = null;
    let timeLeft = 0;

    document.querySelectorAll('.shop-zone').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.shop-zone').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        zone = b.dataset.zone;
      });
    });
    document.querySelectorAll('.shop-dur').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.shop-dur').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        duration = parseInt(b.dataset.dur, 10);
      });
    });

    function spawnItem() {
      const items = ZONE_ITEMS[zone];
      const it = document.createElement('div');
      it.className = 'shop-item';
      it.textContent = items[Math.floor(Math.random() * items.length)];
      const arenaW = arena.clientWidth;
      const arenaH = arena.clientHeight;
      it.style.left = (Math.random() * (arenaW - 40)) + 'px';
      it.style.top  = (Math.random() * (arenaH - 40)) + 'px';
      it.addEventListener('click', () => {
        if (it.classList.contains('taken')) return;
        it.classList.add('taken');
        collected++;
        countEl.textContent = collected;
        // remove after animation
        setTimeout(() => it.remove(), 500);
      });
      arena.appendChild(it);
      // auto-remove uncollected items after 4s to avoid clutter
      setTimeout(() => { if (!it.classList.contains('taken')) it.remove(); }, 4200);
    }

    function startGame() {
      collected = 0;
      timeLeft = duration;
      countEl.textContent = '0';
      timerEl.textContent = duration;
      arena.innerHTML = '';
      setup.hidden = true;
      result.hidden = true;
      play.hidden = false;

      // Initial burst
      for (let i = 0; i < 5; i++) spawnItem();
      // Steady spawn — every ~700ms
      spawnId = setInterval(spawnItem, 700);
      timerId = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) endGame();
      }, 1000);
    }

    function endGame() {
      clearInterval(timerId);
      clearInterval(spawnId);
      timerId = null; spawnId = null;
      play.hidden = true;
      // Stat + mood
      const zLabel = ZONE_LABEL_TH[zone] || zone;
      statEl.textContent = 'ช้อป ' + zLabel + ' ไป ' + collected + ' ชิ้น ใน ' + duration + ' วินาที';
      let mood;
      if (collected === 0) mood = 'ครั้งหน้าลองดูใหม่นะ — ไม่ต้องรีบ 🌿';
      else if (collected < 5) mood = 'ค่อยๆ เลือก — ก็โอเคนะ 🌸';
      else if (collected < 15) mood = 'ใจฟูขึ้นมาบ้างไหม? 💗';
      else mood = 'ตะกร้าเต็มเลย! ใจอิ่มสุดๆ ✨';
      moodEl.textContent = mood;
      // Set share/bookmark payload
      window._shopLastResult = 'ช้อป ' + zLabel + ' ' + collected + ' ชิ้น ใน ' + duration + 'วิ ในห้องช้อปสบายใจของฮีลใจ 24/7 — ' + mood;
      result.hidden = false;
    }

    startBtn.addEventListener('click', startGame);
    againBtn.addEventListener('click', () => {
      setup.hidden = false;
      result.hidden = true;
      play.hidden = true;
    });

    // Reset when room closes
    window.resetShop = function() {
      clearInterval(timerId);
      clearInterval(spawnId);
      timerId = null; spawnId = null;
      arena.innerHTML = '';
      setup.hidden = false;
      play.hidden = true;
      result.hidden = true;
    };
  })();

  // ============================================================

  const gardenBg = document.getElementById('gardenBg'); if (gardenBg) gardenBg.style.backgroundImage = 'url("assets/images/garden.jpg")';
})();
