(() => {
  if (!document.querySelector('[data-page="alone"]')) return;
  const body = document.body;
  // ============================================================
  // Breathing patterns config (cycle in seconds + phases with labels)
  const PATTERNS = {
    natural: {
      cycle: 8,
      phases: [
        { until: 4, th: 'หายใจเข้า ✨', en: 'Breathe in ✨' },
        { until: 8, th: 'หายใจออก',     en: 'Breathe out' },
      ],
    },
    b478: {
      cycle: 19,
      phases: [
        { until: 4,  th: 'หายใจเข้า ✨', en: 'Breathe in ✨' },
        { until: 11, th: 'กลั้น',         en: 'Hold' },
        { until: 19, th: 'หายใจออก',     en: 'Breathe out' },
      ],
    },
    box: {
      cycle: 16,
      phases: [
        { until: 4,  th: 'หายใจเข้า ✨', en: 'Breathe in ✨' },
        { until: 8,  th: 'กลั้น',         en: 'Hold' },
        { until: 12, th: 'หายใจออก',     en: 'Breathe out' },
        { until: 16, th: 'พัก',           en: 'Pause' },
      ],
    },
    coherent: {
      cycle: 10,
      phases: [
        { until: 5,  th: 'หายใจเข้า ✨', en: 'Breathe in ✨' },
        { until: 10, th: 'หายใจออก',     en: 'Breathe out' },
      ],
    },
  };

  let sitTimer = null;
  let breathTimer = null;
  let sitRemaining = 60;
  let sitElapsed = 0;
  let currentPattern = 'natural';
  const sitSetup = document.getElementById('sitSetup');
  const sitStage = document.getElementById('sitStage');
  const sitDoneEl = document.getElementById('sitDone');
  const timerDisplay = document.getElementById('timerDisplay');
  const breathCircle = document.getElementById('breathCircle');
  const breathLabel = document.getElementById('breathLabel');

  document.querySelectorAll('.duration-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.duration-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  });
  document.querySelectorAll('.pattern-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.pattern-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  });

  function fmtTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return m + ':' + sec;
  }

  function getPhase(patternKey, elapsed) {
    const p = PATTERNS[patternKey];
    const t = elapsed % p.cycle;
    for (const ph of p.phases) {
      if (t < ph.until) return ph;
    }
    return p.phases[0];
  }

  function updateBreathLabel() {
    const phase = getPhase(currentPattern, sitElapsed);
    const lang = body.dataset.lang;
    breathLabel.innerHTML =
      '<span data-th>' + phase.th + '</span>' +
      '<span data-en>' + phase.en + '</span>';
  }

  function startSit() {
    const minBtn = document.querySelector('.duration-btn.active');
    const patBtn = document.querySelector('.pattern-btn.active');
    const minutes = parseInt(minBtn.dataset.min, 10);
    currentPattern = patBtn.dataset.pattern;
    sitRemaining = minutes * 60;
    sitElapsed = 0;
    timerDisplay.textContent = fmtTime(sitRemaining);
    // Apply pattern animation to breath circle
    breathCircle.classList.remove('natural', 'b478', 'box', 'coherent');
    // small reflow trick to restart animation
    void breathCircle.offsetWidth;
    breathCircle.classList.add(currentPattern);
    updateBreathLabel();
    sitSetup.style.display = 'none';
    sitDoneEl.style.display = 'none';
    sitStage.classList.add('active');
    // Tick every second
    sitTimer = setInterval(() => {
      sitRemaining--;
      sitElapsed++;
      timerDisplay.textContent = fmtTime(sitRemaining);
      updateBreathLabel();
      if (sitRemaining <= 0) finishSit();
    }, 1000);
  }
  function finishSit() {
    clearInterval(sitTimer);
    sitStage.classList.remove('active');
    sitDoneEl.style.display = '';
    breathCircle.classList.remove('natural', 'b478', 'box', 'coherent');
  }
  function resetSit() {
    clearInterval(sitTimer);
    sitStage.classList.remove('active');
    sitDoneEl.style.display = 'none';
    sitSetup.style.display = '';
    breathCircle.classList.remove('natural', 'b478', 'box', 'coherent');
  }

  document.getElementById('sitStart').addEventListener('click', startSit);
  document.getElementById('sitStop').addEventListener('click', finishSit);
  document.getElementById('sitAgain').addEventListener('click', resetSit);


  // ============ ALONE ROOM — Sub-room mode (each pane becomes fullscreen) ============
  const aloneContent = document.querySelector('#room-alone .alone-content');
  function switchAlonePane(target, enterSubroom = true) {
    document.querySelectorAll('.alone-tab[data-pane]').forEach(t =>
      t.classList.toggle('active', t.dataset.pane === target));
    document.querySelectorAll('#room-alone .alone-pane').forEach(p =>
      p.classList.toggle('active', p.id === 'apane-' + target));
    document.querySelectorAll('#room-alone .hotspot[data-pane]').forEach(h =>
      h.classList.toggle('active', h.dataset.pane === target));
    if (enterSubroom && aloneContent) {
      aloneContent.classList.add('subroom-active');
      const overlay = document.getElementById('room-alone');
      if (overlay) overlay.scrollTop = 0;
    }
  }
  function exitAloneSubroom() {
    if (aloneContent) aloneContent.classList.remove('subroom-active');
    const overlay = document.getElementById('room-alone');
    if (overlay) overlay.scrollTop = 0;
  }
  document.querySelectorAll('.alone-tab[data-pane]').forEach(tab => {
    tab.addEventListener('click', () => switchAlonePane(tab.dataset.pane, true));
  });
  document.querySelectorAll('#room-alone .hotspot[data-pane]').forEach(h => {
    h.addEventListener('click', () => switchAlonePane(h.dataset.pane, true));
  });


  document.querySelectorAll('[data-subroom-back]').forEach(btn => { btn.addEventListener('click', () => { if (btn.closest('#room-alone')) exitAloneSubroom(); }); });

  // ============ COLORING (paint-by-click mandala) ============
  (function initColoring() {
    const canvas = document.getElementById('colorCanvas');
    const palette = document.getElementById('colorPalette');
    const resetBtn = document.getElementById('colorReset');
    const saveBtn = document.getElementById('colorSave');
    if (!canvas || !palette) return;

    let currentColor = '#f4b6a6'; // default peach

    // Pick color
    palette.querySelectorAll('.color-swatch').forEach(s => {
      s.addEventListener('click', () => {
        palette.querySelectorAll('.color-swatch').forEach(x => x.classList.remove('active'));
        s.classList.add('active');
        currentColor = s.dataset.color;
      });
    });

    // ---- Mandala SVG content per difficulty ----
    function petalPath(d, rotate) {
      return '<path class="cz" d="' + d + '" fill="#ffffff" stroke="#8b6f47" stroke-width="1.5" transform="rotate(' + rotate + ' 200 200)"/>';
    }
    function buildEasy() {
      // 8 zones total — chunky simple flower
      let svg = '<circle class="cz" cx="200" cy="200" r="195" fill="#ffffff" stroke="#c19a6c" stroke-width="2"/>';
      // 5 large petals
      const petalD = 'M200 35 C 250 90, 250 150, 200 175 C 150 150, 150 90, 200 35 Z';
      for (let i = 0; i < 5; i++) svg += petalPath(petalD, i * 72);
      svg += '<circle class="cz" cx="200" cy="200" r="40" fill="#ffffff" stroke="#8b6f47" stroke-width="1.5"/>';
      svg += '<circle class="cz" cx="200" cy="200" r="18" fill="#ffffff" stroke="#8b6f47" stroke-width="1.5"/>';
      return svg;
    }
    function buildMedium() {
      // ~19 zones — original
      let svg = '<circle class="cz" cx="200" cy="200" r="195" fill="#ffffff" stroke="#c19a6c" stroke-width="2"/>';
      const outerD = 'M200 30 C 230 60, 230 110, 200 130 C 170 110, 170 60, 200 30 Z';
      for (let i = 0; i < 8; i++) svg += petalPath(outerD, i * 45);
      const innerD = 'M200 130 C 220 150, 220 180, 200 195 C 180 180, 180 150, 200 130 Z';
      for (let i = 0; i < 8; i++) svg += petalPath(innerD, 22.5 + i * 45);
      svg += '<circle class="cz" cx="200" cy="200" r="42" fill="#ffffff" stroke="#8b6f47" stroke-width="1.5"/>';
      svg += '<circle class="cz" cx="200" cy="200" r="18" fill="#ffffff" stroke="#8b6f47" stroke-width="1.5"/>';
      return svg;
    }
    function buildHard() {
      // ~45 zones — intricate, pixel-density feel
      let svg = '<circle class="cz" cx="200" cy="200" r="195" fill="#ffffff" stroke="#c19a6c" stroke-width="2"/>';
      // 12 outer slim petals
      const outerD = 'M200 25 C 218 60, 218 110, 200 125 C 182 110, 182 60, 200 25 Z';
      for (let i = 0; i < 12; i++) svg += petalPath(outerD, i * 30);
      // 12 mid petals
      const midD = 'M200 110 C 215 130, 215 160, 200 178 C 185 160, 185 130, 200 110 Z';
      for (let i = 0; i < 12; i++) svg += petalPath(midD, 15 + i * 30);
      // 8 inner small petals
      const innerD = 'M200 155 C 210 168, 210 185, 200 193 C 190 185, 190 168, 200 155 Z';
      for (let i = 0; i < 8; i++) svg += petalPath(innerD, i * 45);
      // 8 dots around center as detail rings
      for (let i = 0; i < 8; i++) {
        const a = (i * 45) * Math.PI / 180;
        const cx = 200 + Math.cos(a) * 78;
        const cy = 200 + Math.sin(a) * 78;
        svg += '<circle class="cz" cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="7" fill="#ffffff" stroke="#8b6f47" stroke-width="1.2"/>';
      }
      svg += '<circle class="cz" cx="200" cy="200" r="36" fill="#ffffff" stroke="#8b6f47" stroke-width="1.5"/>';
      svg += '<circle class="cz" cx="200" cy="200" r="22" fill="#ffffff" stroke="#8b6f47" stroke-width="1.5"/>';
      svg += '<circle class="cz" cx="200" cy="200" r="10" fill="#ffffff" stroke="#8b6f47" stroke-width="1.5"/>';
      return svg;
    }
    const BUILDERS = { easy: buildEasy, medium: buildMedium, hard: buildHard };

    function bindClicks() {
      canvas.querySelectorAll('.cz').forEach(el => {
        el.addEventListener('click', () => {
          el.setAttribute('fill', currentColor);
          // Track for share/bookmark — count filled regions
          const all = canvas.querySelectorAll('.cz');
          let filled = 0;
          all.forEach(c => { if (c.getAttribute('fill') !== '#ffffff') filled++; });
          window._coloringLastDesc =
            'ฉันระบายดอกไม้ในห้องนอนของฮีลใจ 24/7 (' + filled + '/' + all.length + ' ส่วน) — ใจสงบดีจัง 🌸';
        });
      });
    }

    function setLevel(level) {
      const fn = BUILDERS[level] || BUILDERS.medium;
      canvas.innerHTML = fn();
      bindClicks();
      document.querySelectorAll('.color-level-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.level === level);
      });
    }
    document.querySelectorAll('.color-level-btn').forEach(b => {
      b.addEventListener('click', () => setLevel(b.dataset.level));
    });
    // Initial bind on existing HTML mandala
    bindClicks();

    // Reset — restore all to white
    resetBtn.addEventListener('click', () => {
      canvas.querySelectorAll('.cz').forEach(el => el.setAttribute('fill', '#ffffff'));
    });

    // Save — export SVG → PNG → download
    saveBtn.addEventListener('click', () => {
      try {
        const svgData = new XMLSerializer().serializeToString(canvas);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = 800; c.height = 800;
          const ctx = c.getContext('2d');
          ctx.fillStyle = '#fefcf9';
          ctx.fillRect(0, 0, 800, 800);
          ctx.drawImage(img, 0, 0, 800, 800);
          c.toBlob(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'healjai-flower-' + Date.now() + '.png';
            a.click();
            URL.revokeObjectURL(a.href);
          }, 'image/png');
          URL.revokeObjectURL(url);
        };
        img.src = url;
      } catch (e) {
        alert('Save failed — ลองคลิกขวาที่ภาพแล้ว Save image แทน');
      }
    });
  })();


  // ============ AESTHETIC TOGGLE (Cozy / Loft) ============
  // Persisted in localStorage → user comes back to same vibe.
  (function initAesthetic() {
    const bedroomImg = document.getElementById('bedroomImg');
    const stage = bedroomImg ? bedroomImg.closest('.room-stage') : null;
    if (!bedroomImg) return;

    function applyAesthetic(aest, animate = true) {
      document.querySelectorAll('.aest-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.aest === aest));
      if (stage) stage.dataset.aest = aest;   // CSS reads this for hotspot positions
      if (animate && stage) {
        stage.classList.add('swapping');
        setTimeout(() => {
          bedroomImg.src = 'assets/images/bedroom-' + aest + '.jpg';
          bedroomImg.onload = () => stage.classList.remove('swapping');
        }, 250);
      } else {
        bedroomImg.src = 'assets/images/bedroom-' + aest + '.jpg';
      }
    }

    // Load saved choice on init
    const saved = localStorage.getItem('bedroomAesthetic') || 'cozy';
    applyAesthetic(saved, false);

    // Toggle on click
    document.querySelectorAll('.aest-btn').forEach(b => {
      b.addEventListener('click', () => {
        const aest = b.dataset.aest;
        localStorage.setItem('bedroomAesthetic', aest);
        applyAesthetic(aest, true);
      });
    });
  })();

  // ============ CAT companion — particles + breathing + soft purr ============
  (function initCat() {
    const catImg = document.getElementById('catImg');
    const catMsg = document.getElementById('catMessage');
    if (!catImg || !catMsg) return;
    const catStage = catImg.closest('.cat-stage');

    const CAT_STATES = {
      pet:   { img: 'cat-belly.jpg', particle: '🤍', count: 6, sound: 'purr',
               th: '🤍 เพื่อนตัวน้อยตัวนิ่ม สุขใจมาก — เธอด้วยนะ',
               en: '🤍 Soft little friend, happy and loved — you too.' },
      feed:  { img: 'cat-eat.jpg', particle: '🐟', count: 4, sound: 'crunch',
               th: '🍽 อิ่มท้องแล้ว ไปหาคุณข้าวให้ตัวเองด้วยนะ',
               en: '🍽 Belly full. Don\'t forget to feed yourself too.' },
      play:  { img: 'cat-play.jpg', particle: '🎵', count: 5, sound: 'jingle',
               th: '🧶 เล่นกับใครสักคนทำให้ใจเบาขึ้น แม้แค่ 5 นาที',
               en: '🧶 Even 5 minutes of play lightens the heart.' },
      watch: { img: 'cat-sleep.jpg', particle: '💤', count: 3, sound: 'purr',
               th: '😴 นั่งเงียบๆ มองมัน — เป็นช่วงเวลาที่ดีของวัน',
               en: '😴 Just watching it sleep — one of the day\'s good moments.' },
    };

    function setLangSpan(html_th, html_en) {
      catMsg.innerHTML = '<span data-th>' + html_th + '</span><span data-en>' + html_en + '</span>';
      const lang = body.dataset.lang || 'th';
      catMsg.querySelectorAll('[data-th]').forEach(s => s.style.display = lang === 'th' ? '' : 'none');
      catMsg.querySelectorAll('[data-en]').forEach(s => s.style.display = lang === 'en' ? '' : 'none');
    }

    // ----- Floating particles around the cat -----
    function spawnParticles(emoji, count) {
      if (!catStage) return;
      const imgRect = catImg.getBoundingClientRect();
      const stageRect = catStage.getBoundingClientRect();
      const baseX = imgRect.left - stageRect.left + imgRect.width / 2;
      const baseY = imgRect.top - stageRect.top + imgRect.height / 3;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'cat-particle';
        p.textContent = emoji;
        const offsetX = (Math.random() - 0.5) * 100;
        const driftX = (Math.random() - 0.5) * 80;
        p.style.left = (baseX + offsetX - 12) + 'px';
        p.style.top  = baseY + 'px';
        p.style.setProperty('--drift', driftX + 'px');
        p.style.animationDelay = (i * 0.08) + 's';
        p.style.fontSize = (18 + Math.random() * 10) + 'px';
        catStage.appendChild(p);
        setTimeout(() => p.remove(), 2200);
      }
    }

    // ----- Soft purr generated via Web Audio API (no audio file needed) -----
    let audioCtx = null;
    let purrTimeoutId = null;
    function ensureAudioCtx() {
      if (!audioCtx) {
        try {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (_) { audioCtx = null; }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    }
    function playPurr(durationMs = 2200) {
      const ctx = ensureAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Filtered noise for rumble
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 90;
      filter.Q.value = 1.2;

      // Slow LFO for purr rhythm (~25 Hz = soft trill)
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 26;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.6;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.12, now + 0.25);
      masterGain.gain.setValueAtTime(0.12, now + (durationMs / 1000) - 0.3);
      masterGain.gain.linearRampToValueAtTime(0, now + (durationMs / 1000));

      lfo.connect(lfoGain);
      lfoGain.connect(masterGain.gain);
      noise.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      noise.start(now);
      lfo.start(now);
      noise.stop(now + (durationMs / 1000) + 0.1);
      lfo.stop(now + (durationMs / 1000) + 0.1);

      if (purrTimeoutId) clearTimeout(purrTimeoutId);
      purrTimeoutId = setTimeout(() => { purrTimeoutId = null; }, durationMs);
    }

    // ----- Crunch (feed) — short bursts of filtered noise -----
    function playCrunch() {
      const ctx = ensureAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      for (let k = 0; k < 4; k++) {
        const t0 = now + k * 0.18;
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const filt = ctx.createBiquadFilter();
        filt.type = 'bandpass';
        filt.frequency.value = 1800 + Math.random() * 600;
        filt.Q.value = 1.4;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(0.08, t0 + 0.005);
        g.gain.linearRampToValueAtTime(0, t0 + 0.08);
        src.connect(filt); filt.connect(g); g.connect(ctx.destination);
        src.start(t0);
        src.stop(t0 + 0.1);
      }
    }

    // ----- Jingle (play) — soft bell-like chime -----
    function playJingle() {
      const ctx = ensureAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [880, 1175, 988];
      notes.forEach((freq, k) => {
        const t0 = now + k * 0.12;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(0.10, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.5);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + 0.55);
      });
    }

    // ----- Trigger an action (button click) — sets new base pose -----
    function triggerAction(action) {
      const state = CAT_STATES[action];
      if (!state) return;

      // Cancel any pending "return to base" timer — new base is being set
      if (reactionTimeoutId) {
        clearTimeout(reactionTimeoutId);
        reactionTimeoutId = null;
      }
      basePose = state.img;

      document.querySelectorAll('.cat-action').forEach(b => {
        b.classList.toggle('active', b.dataset.catAction === action);
      });

      spawnParticles(state.particle, state.count);
      if (state.sound === 'purr')   playPurr(2000);
      if (state.sound === 'crunch') playCrunch();
      if (state.sound === 'jingle') playJingle();
      // Subtle wiggle reaction on every action
      catImg.classList.remove('wiggle');
      // force reflow so animation restarts
      void catImg.offsetWidth;
      catImg.classList.add('wiggle');

      catImg.classList.add('swapping');
      catMsg.classList.add('swapping');
      setTimeout(() => {
        catImg.src = 'assets/images/' + state.img;
        setLangSpan(state.th, state.en);
        const finish = () => {
          catImg.classList.remove('swapping');
          catMsg.classList.remove('swapping');
        };
        if (catImg.complete) finish();
        else catImg.onload = finish;
      }, 280);
    }

    document.querySelectorAll('.cat-action').forEach(btn => {
      btn.addEventListener('click', () => triggerAction(btn.dataset.catAction));
    });

    // ----- Spawn hand emoji at click point — petting motion -----
    function spawnHand(clientX, clientY) {
      if (!catStage) return;
      const stageRect = catStage.getBoundingClientRect();
      const hand = document.createElement('div');
      hand.className = 'cat-hand';
      hand.textContent = '✋';
      hand.style.left = (clientX - stageRect.left) + 'px';
      hand.style.top  = (clientY - stageRect.top) + 'px';
      catStage.appendChild(hand);
      setTimeout(() => hand.remove(), 1300);
    }

    // ----- Touch zones: click on the cat triggers a temporary reaction -----
    // Top 40% = head → look up
    // Middle 40-75% = body/back → look back
    // Bottom 75-100% = belly/legs → wiggle only
    // After 2.4s, return to the "base" pose (whichever the last action button set).
    let basePose = 'cat-sit.jpg';
    let reactionTimeoutId = null;

    function swapCatImg(src, onDone) {
      catImg.classList.add('swapping');
      setTimeout(() => {
        catImg.src = 'assets/images/' + src;
        const finish = () => {
          catImg.classList.remove('swapping');
          if (onDone) onDone();
        };
        if (catImg.complete) finish();
        else catImg.onload = finish;
      }, 220);
    }

    function reactAndReturn(reactionImg, particleEmoji, particleCount, sound) {
      if (reactionTimeoutId) {
        clearTimeout(reactionTimeoutId);
        reactionTimeoutId = null;
      }
      swapCatImg(reactionImg);
      spawnParticles(particleEmoji, particleCount);
      if (sound === 'purr') playPurr(2000);
      reactionTimeoutId = setTimeout(() => {
        swapCatImg(basePose);
        reactionTimeoutId = null;
      }, 2400);
    }

    catImg.addEventListener('click', (e) => {
      const rect = catImg.getBoundingClientRect();
      const yRatio = (e.clientY - rect.top) / rect.height;

      spawnHand(e.clientX, e.clientY);

      if (yRatio < 0.4) {
        // HEAD — cat looks up adoringly
        reactAndReturn('cat-look-up.jpg', '🤍', 5, 'purr');
      } else if (yRatio < 0.75) {
        // BACK/BODY — cat turns to look back
        reactAndReturn('cat-look-back.jpg', '🤍', 4, 'purr');
      } else {
        // BELLY/LEGS — wiggle only, no pose change
        catImg.classList.remove('wiggle');
        void catImg.offsetWidth;
        catImg.classList.add('wiggle');
        spawnParticles('🤍', 4);
        playPurr(1400);
      }
    });

    // ----- Reset when entering room -----
    window.resetCat = function() {
      if (reactionTimeoutId) { clearTimeout(reactionTimeoutId); reactionTimeoutId = null; }
      basePose = 'cat-sit.jpg';
      document.querySelectorAll('.cat-action').forEach(b => b.classList.remove('active'));
      catImg.classList.remove('swapping', 'wiggle');
      catMsg.classList.remove('swapping');
      catImg.src = 'assets/images/cat-sit.jpg';
      setLangSpan(
        'เพื่อนตัวน้อยรอเธออยู่ — ลองลูบหัว ลูบหลัง หรือจิ้มพุงดูสิ',
        'Your little companion is here — try petting head, back, or belly'
      );
    };
  })();


  // Mood check-in
  const MOOD_RESPONSE = {
    1: { th: 'วันนี้ใจหนักจังนะ — ขอบคุณที่ยังเช็คใจตัวเอง  ลองไปห้องนอน เปิดเพลงและฟังฝนสักพัก', en: 'Heavy heart today — thank yourself for checking in. Try the bedroom, play some music and rain.' },
    2: { th: 'อึนๆ คือใจที่ยังหาคำตอบไม่เจอ  ลองเขียนถึงตัวเองดู คำตอบอาจอยู่ระหว่างบรรทัด', en: 'Stuck means your heart hasn\'t found the answer yet. Try writing to yourself — answers hide between lines.' },
    3: { th: 'กลางๆ ก็เป็นความรู้สึก ไม่ต้องบังคับให้ดีกว่านี้', en: '"Meh" is also a feeling. No need to force it to be better.' },
    4: { th: 'ดีจัง — เก็บความรู้สึกนี้ไว้ในกระเป๋าใจ', en: 'Lovely — tuck this feeling away in your heart\'s pocket.' },
    5: { th: 'ขอบคุณที่ดูแลตัวเองมาถึงวันนี้ ✨', en: 'Thank you for taking care of yourself today ✨' },
  };
  const MOOD_META = {
    1: { th: 'หนัก', en: 'Heavy', c: '#9B8FB5' },
    2: { th: 'อึน',  en: 'Stuck', c: '#B59C86' },
    3: { th: 'กลางๆ', en: 'Meh',  c: '#C7BBA6' },
    4: { th: 'พอไหว', en: 'Okay', c: '#E6BE8C' },
    5: { th: 'ดีนะ',  en: 'Good', c: '#C9A961' },
  };
  const MOOD_KEY = 'healjai_mood_v1';
  let moodSel = null;
  let moodRange = 7;

  function moodToday() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function moodLoad() { try { return JSON.parse(localStorage.getItem(MOOD_KEY) || '[]'); } catch (e) { return []; } }
  function moodStore(a) { try { localStorage.setItem(MOOD_KEY, JSON.stringify(a)); } catch (e) {} }
  function moodGet(date) { return moodLoad().find(x => x.date === date); }
  function moodUpsert(mood, note) {
    const all = moodLoad(); const t = moodToday();
    const entry = { date: t, mood: +mood, note: (note || '').trim() };
    const i = all.findIndex(x => x.date === t);
    if (i >= 0) all[i] = entry; else all.push(entry);
    moodStore(all);
  }

  function showMoodResponse(mood) {
    const res = MOOD_RESPONSE[mood];
    const r = document.getElementById('moodResponse');
    if (res && r) { r.innerHTML = '<span data-th>' + res.th + '</span><span data-en>' + res.en + '</span>'; r.classList.add('show'); }
  }

  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      moodSel = btn.dataset.mood;
      showMoodResponse(moodSel);
      const wrap = document.getElementById('moodNoteWrap');
      if (wrap) wrap.hidden = false;
      const saved = document.getElementById('moodSavedNote');
      if (saved) saved.hidden = true;
    });
  });

  const moodSaveBtn = document.getElementById('moodSave');
  if (moodSaveBtn) {
    moodSaveBtn.addEventListener('click', () => {
      if (!moodSel) return;
      const note = (document.getElementById('moodNote') || {}).value || '';
      moodUpsert(moodSel, note);
      const saved = document.getElementById('moodSavedNote');
      if (saved) saved.hidden = false;
      renderMoodTrend();
    });
  }

  document.querySelectorAll('.mood-range-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mood-range-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      moodRange = +btn.dataset.range || 7;
      renderMoodTrend();
    });
  });

  function renderMoodTrend() {
    const chart = document.getElementById('moodChart');
    const trend = document.getElementById('moodTrend');
    if (!chart || !trend) return;
    trend.hidden = false;
    const all = moodLoad();
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const days = [];
    for (let i = moodRange - 1; i >= 0; i--) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      const e = all.find(x => x.date === key);
      days.push({ d, key, mood: e ? e.mood : 0 });
    }
    const W = moodRange === 7 ? 280 : 320, H = 116, pad = 16;
    const slot = (W - pad * 2) / days.length;
    const bw = Math.min(slot * 0.62, 22);
    let bars = '';
    days.forEach((day, idx) => {
      const cx = pad + slot * (idx + 0.5);
      const x = cx - bw / 2;
      if (day.mood) {
        const h = (day.mood / 5) * (H - pad * 2);
        const y = H - pad - h;
        const label = MOOD_META[day.mood];
        bars += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="' + Math.min(bw / 2, 5) + '" fill="' + label.c + '"><title>' + day.key + ' · ' + label.th + '</title></rect>';
      } else {
        bars += '<rect x="' + x.toFixed(1) + '" y="' + (H - pad - 3) + '" width="' + bw.toFixed(1) + '" height="3" rx="1.5" fill="var(--beige)" opacity="0.6"/>';
      }
    });
    chart.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" height="' + H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="กราฟแนวโน้มอารมณ์">' + bars + '</svg>';

    const filled = days.filter(x => x.mood);
    const sum = document.getElementById('moodSummary');
    if (!sum) return;
    if (!filled.length) {
      sum.innerHTML = '<span data-th>ยังไม่มีบันทึกในช่วงนี้ — เริ่มเช็คใจวันนี้ได้เลยนะ</span><span data-en>No check-ins yet in this range — start with today.</span>';
      return;
    }
    const avg = filled.reduce((s, x) => s + x.mood, 0) / filled.length;
    const n = filled.length;
    let th, en;
    if (avg < 2.5) { th = 'ช่วงนี้ใจเธอหนักอยู่บ้าง ขอบคุณที่ยังดูแลตัวเองนะ'; en = 'It\'s been a heavy stretch — thank you for still caring for yourself.'; }
    else if (avg <= 3.5) { th = 'ใจเธอมีขึ้นมีลง เป็นเรื่องธรรมดา เธอทำได้ดีแล้ว'; en = 'Ups and downs are normal — you\'re doing okay.'; }
    else { th = 'ช่วงนี้ใจเธอค่อนข้างโอเคเลยนะ ดีจัง 💛'; en = 'Your heart\'s been doing alright lately 💛'; }
    sum.innerHTML = '<span data-th>' + th + ' · เช็คใจไป ' + n + ' วัน</span>' +
      '<span data-en>' + en + ' · ' + n + ' check-in' + (n > 1 ? 's' : '') + '</span>';
  }

  // Prefill today's entry + draw the trend on load
  (function initMoodCheckin() {
    const t = moodGet(moodToday());
    if (t) {
      const btn = document.querySelector('.mood-btn[data-mood="' + t.mood + '"]');
      if (btn) { btn.classList.add('selected'); moodSel = String(t.mood); showMoodResponse(t.mood); }
      const wrap = document.getElementById('moodNoteWrap');
      if (wrap) wrap.hidden = false;
      const noteEl = document.getElementById('moodNote');
      if (noteEl) noteEl.value = t.note || '';
    }
    renderMoodTrend();
  })();

  // Letter to self
  const letterText = document.getElementById('letterText');
  const letterSave = document.getElementById('letterSave');
  const letterSuccess = document.getElementById('letterSuccess');
  document.querySelectorAll('.letter-mode-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.letter-mode-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  });
  letterText.addEventListener('input', () => {
    letterSave.disabled = letterText.value.trim().length < 3;
    letterSuccess.classList.remove('show');
  });
  letterSave.addEventListener('click', () => {
    if (letterSave.disabled) return;
    // Visual mockup — production: persist to backend
    letterSuccess.classList.add('show');
    letterText.value = '';
    letterSave.disabled = true;
    // Update writing streak
    if (typeof window.recordWritingDay === 'function') window.recordWritingDay();
  });

  // ============ Daily writing streak — localStorage based, intrinsic motivation ============
  (function initWritingStreak() {
    const STREAK_KEY = 'writingDays';   // array of YYYY-MM-DD strings
    const MEDALS_KEY = 'writingMedalsSeen';   // array of milestone numbers user has already celebrated
    const badge = document.getElementById('streakBadge');
    const history = document.getElementById('streakHistory');
    const medalRow = document.getElementById('medalRow');
    const totalTH = document.getElementById('streakTotal');
    const totalEN = document.getElementById('streakTotalEn');
    if (!badge || !history) return;

    // Milestone medals — symbolic only, no extrinsic rewards
    const MILESTONES = [
      { days: 3,  icon: '🌱', label_th: 'แรกผลิ',     label_en: 'Sprout',   sub_th: '3 วัน',  sub_en: '3 days' },
      { days: 5,  icon: '🌿', label_th: 'แตกใบ',     label_en: 'Growing',  sub_th: '5 วัน',  sub_en: '5 days' },
      { days: 10, icon: '🌳', label_th: 'หยั่งราก',   label_en: 'Rooted',   sub_th: '10 วัน', sub_en: '10 days' },
      { days: 15, icon: '🌸', label_th: 'ผลิดอก',    label_en: 'Blossom',  sub_th: '15 วัน', sub_en: '15 days' },
      { days: 21, icon: '🌟', label_th: 'นิสัยใหม่', label_en: 'New habit', sub_th: '21 วัน · ครบ!', sub_en: '21 days · complete' },
    ];

    function getMedalsSeen() {
      try { return JSON.parse(localStorage.getItem(MEDALS_KEY) || '[]'); }
      catch (_) { return []; }
    }
    function saveMedalsSeen(arr) {
      localStorage.setItem(MEDALS_KEY, JSON.stringify(arr));
    }

    function getDays() {
      try { return JSON.parse(localStorage.getItem(STREAK_KEY) || '[]'); }
      catch (_) { return []; }
    }
    function saveDays(days) {
      localStorage.setItem(STREAK_KEY, JSON.stringify(days));
    }
    function todayStr() {
      const d = new Date();
      return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
    }
    function calcStreak(days) {
      if (!days.length) return 0;
      const sorted = days.slice().sort().reverse(); // newest first
      let streak = 0;
      const oneDay = 86400000;
      let cursor = new Date(todayStr());
      for (const ds of sorted) {
        const d = new Date(ds);
        const diff = Math.round((cursor - d) / oneDay);
        if (diff === 0) { streak++; cursor = new Date(cursor.getTime() - oneDay); }
        else if (diff === 1) { streak++; cursor = new Date(cursor.getTime() - oneDay); }
        else break;
      }
      return streak;
    }
    function renderMedals(totalDays, justUnlocked) {
      if (!medalRow) return;
      medalRow.innerHTML = '';
      const lang = body.dataset.lang || 'th';
      MILESTONES.forEach(m => {
        const el = document.createElement('div');
        const unlocked = totalDays >= m.days;
        el.className = 'medal' + (unlocked ? ' unlocked' : '') + (justUnlocked === m.days ? ' just-unlocked' : '');
        el.innerHTML = `
          <div class="medal-icon">${m.icon}</div>
          <div class="medal-label">${lang === 'th' ? m.label_th : m.label_en}</div>
          <div class="medal-sub">${lang === 'th' ? m.sub_th : m.sub_en}</div>
        `;
        medalRow.appendChild(el);
      });
    }

    function checkNewMedal(total) {
      const seen = getMedalsSeen();
      for (const m of MILESTONES) {
        if (total >= m.days && !seen.includes(m.days)) {
          seen.push(m.days);
          saveMedalsSeen(seen);
          return m.days; // just unlocked this one
        }
      }
      return null;
    }

    function renderStreak(justUnlockedMilestone) {
      const days = getDays();
      const total = days.length;
      const streak = calcStreak(days);

      // Always render medals (locked + unlocked) — visual goal
      renderMedals(total, justUnlockedMilestone);

      if (total === 0) {
        badge.hidden = true;
        history.hidden = true;
        return;
      }
      history.hidden = false;
      if (totalTH) totalTH.textContent = total;
      if (totalEN) totalEN.textContent = total;

      // Show streak badge only if streak >= 2 (so it doesn't show on first write)
      if (streak >= 2) {
        badge.hidden = false;
        const txt = badge.querySelector('.streak-text');
        const lang = body.dataset.lang || 'th';
        if (lang === 'th') {
          txt.innerHTML = 'เขียนมา <strong>' + streak + ' วันติด</strong> · ใจน่ากอดมาก 💗';
        } else {
          txt.innerHTML = '<strong>' + streak + '-day streak</strong> · your heart is showing up 💗';
        }
      } else {
        badge.hidden = true;
      }
    }

    // Expose for letter save handler
    window.recordWritingDay = function() {
      const days = getDays();
      const t = todayStr();
      if (!days.includes(t)) {
        days.push(t);
        saveDays(days);
      }
      const justUnlocked = checkNewMedal(days.length);
      renderStreak(justUnlocked);
    };

    // Initial render
    renderStreak();
  })();


  // Bedroom — rain toggle (with fade in/out) + track switcher
  const rainOverlay = document.getElementById('rainOverlay');
  const rainToggle = document.getElementById('rainToggle');
  const rainAudio = document.getElementById('rainAudio');
  const rainState = document.getElementById('rainToggleState');
  const RAIN_TARGET_VOL = 0.35;
  const RAIN_FADE_MS = 1500;
  rainAudio.volume = 0;

  let rainFadeTimer = null;
  function fadeAudio(audio, fromV, toV, durationMs, onDone) {
    if (rainFadeTimer) { clearInterval(rainFadeTimer); rainFadeTimer = null; }
    audio.volume = Math.max(0, Math.min(1, fromV));
    const startTime = Date.now();
    rainFadeTimer = setInterval(() => {
      const t = Math.min((Date.now() - startTime) / durationMs, 1);
      // ease-in-out
      const eased = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
      audio.volume = Math.max(0, Math.min(1, fromV + (toV - fromV) * eased));
      if (t >= 1) {
        clearInterval(rainFadeTimer);
        rainFadeTimer = null;
        if (onDone) onDone();
      }
    }, 40);
  }

  rainAudio.addEventListener('error', () => {
    // file missing — keep visual rain but no audio
  });

  // ============ AMBIENT picker — Rain / Ocean / Garden / Birds / Off ============
  // Only the chosen ambient plays at a time. Files missing = pill is disabled but UI still shows.
  document.querySelectorAll('.ambient-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const choice = pill.dataset.ambient;
      const src = pill.dataset.src;

      document.querySelectorAll('.ambient-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      if (choice === 'off' || !src) {
        // Fade out + pause
        rainOverlay.classList.remove('show');
        fadeAudio(rainAudio, rainAudio.volume, 0, RAIN_FADE_MS, () => rainAudio.pause());
        return;
      }

      // Switch source if different
      if (!rainAudio.src.endsWith(src)) {
        rainAudio.src = src;
        rainAudio.load();
      }
      // Visual rain overlay only for 'rain'
      if (choice === 'rain') rainOverlay.classList.add('show');
      else rainOverlay.classList.remove('show');

      rainAudio.volume = 0;
      rainAudio.play()
        .then(() => fadeAudio(rainAudio, 0, RAIN_TARGET_VOL, RAIN_FADE_MS))
        .catch(() => {/* file missing or autoplay blocked → silently fail */});
    });
  });

  // If audio file errors (e.g. ocean.mp3 not uploaded yet), gray out that pill
  rainAudio.addEventListener('error', () => {
    const active = document.querySelector('.ambient-pill.active');
    if (active && active.dataset.ambient !== 'off') {
      active.classList.add('disabled');
      active.title = 'ไฟล์เสียงยังไม่ได้อัพโหลด';
    }
  });


  const aloneRoot = document.querySelector('#room-alone .alone-content'); if (aloneRoot) aloneRoot.classList.remove('subroom-active'); if (typeof resetSit === 'function') resetSit();
})();
