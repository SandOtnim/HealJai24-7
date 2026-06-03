(() => {
  if (!document.querySelector('[data-page="home"]')) return;
  const body = document.body;
  const intro = document.getElementById('intro'); const main = document.getElementById('main'); const skipBtn = document.getElementById('skipBtn');
  const phrasesByLang = { th: [...document.querySelectorAll('.phrase[data-th]')], en: [...document.querySelectorAll('.phrase[data-en]')] };
  const TIMING = { fadeIn: 1000, hold: 2000, fadeOut: 800, brandHold: 3200 }; let introTimers = [];
  function clearIntroTimers() { introTimers.forEach(clearTimeout); introTimers = []; }
  function runIntro() { if (!intro || !main) return; const phrases = phrasesByLang[body.dataset.lang || 'th'] || []; phrases.forEach(p => p.classList.remove('show')); setTimeout(() => { const m = document.getElementById('bgMusic'); const tg = document.getElementById('musicToggle'); if (m && m.paused) m.play().then(() => tg && tg.classList.add('playing')).catch(() => {}); }, 900); let cursor = 0; phrases.forEach(p => { const isBrand = p.classList.contains('brand'); const hold = isBrand ? TIMING.brandHold : TIMING.hold; const cycle = TIMING.fadeIn + hold + TIMING.fadeOut; introTimers.push(setTimeout(() => p.classList.add('show'), cursor)); introTimers.push(setTimeout(() => p.classList.remove('show'), cursor + TIMING.fadeIn + hold)); cursor += cycle - 200; }); introTimers.push(setTimeout(finishIntro, cursor + 600)); }
  const INTRO_KEY = 'healjai_intro_v1';
  function markIntroSeen() { try { sessionStorage.setItem(INTRO_KEY, '1'); } catch (e) {} }
  function finishIntro() { if (!intro || !main) return; clearIntroTimers(); markIntroSeen(); intro.classList.add('done'); setTimeout(() => { intro.style.display = 'none'; main.classList.add('visible'); if (window.__maybeStartTour) window.__maybeStartTour(); }, 1200); }
  // Returning from a room → skip the intro and show the map straight away.
  function showMapInstant() { markIntroSeen(); if (intro) { intro.classList.add('done'); intro.style.display = 'none'; } if (main) main.classList.add('visible'); if (window.__maybeStartTour) window.__maybeStartTour(); }
  if (skipBtn) skipBtn.addEventListener('click', finishIntro);
  const ROOM_URLS = { mu: 'sacred.html', travel: 'travel.html', museum: 'museum.html', alone: 'alone.html', community: 'community.html', island: 'island.html' }; function navigateToRoom(room) { const url = ROOM_URLS[room]; if (!url) return; if (window.__healNav) window.__healNav(url); else window.location.href = url; }
  // ============ COMING SOON ============
  const SOON_INFO = {
    scream: {
      th: { title: 'ห้องระบาย', msg: 'พื้นที่ระบายของในใจกำลังปรับปรุง — เรากำลังหาวิธีที่ฮีลใจกว่าให้นะ 🌱' },
      en: { title: 'Release Room', msg: 'The release space is being reworked — we\'re crafting a gentler way to let it out 🌱' },
    },
    sponsor: {
      th: { title: 'ร้านไว้ใจ', msg: 'พื้นที่สนับสนุนโครงการกำลังถูกเตรียม — รอเปิดในเร็วๆ นี้ 🌱' },
      en: { title: 'Trust Store', msg: 'The supporters\' corner is being set up — opening soon 🌱' },
    },
  };
  const soonModal = document.getElementById('soonModal');
  const soonTitle = document.getElementById('soonTitle');
  const soonMsg = document.getElementById('soonMsg');
  function openSoon(roomKey) {
    const lang = body.dataset.lang;
    const info = SOON_INFO[roomKey][lang];
    soonTitle.textContent = info.title;
    soonMsg.textContent = info.msg;
    soonModal.classList.add('active');
    body.style.overflow = 'hidden';
  }
  function closeSoon() {
    soonModal.classList.remove('active');
    body.style.overflow = '';
  }
  document.querySelectorAll('[data-soon-close]').forEach(b => b.addEventListener('click', closeSoon));
  soonModal.addEventListener('click', e => { if (e.target === soonModal) closeSoon(); });

  // ============ PINS — click + mobile long-press preview ============
  // ===== Pin preview portal — float above map clipping =====
  let portalEl = null;
  let portalCurrentPin = null;
  function ensurePortal() {
    if (portalEl) return portalEl;
    portalEl = document.createElement('div');
    portalEl.className = 'pin-preview-portal';
    document.body.appendChild(portalEl);
    return portalEl;
  }
  function showPortalPreview(pin) {
    if (portalCurrentPin === pin) return;
    portalCurrentPin = pin;
    const src = pin.querySelector('.pin-preview');
    if (!src) return;
    const p = ensurePortal();
    p.innerHTML = src.innerHTML;
    // Measure pin position
    const pinRect = pin.getBoundingClientRect();
    const portalWidth = 170;
    // Default: place above pin
    let top = pinRect.top - 10;
    let left = pinRect.left + pinRect.width / 2 - portalWidth / 2;
    let arrowClass = 'arrow-down';
    // Clamp horizontally within viewport (8px margin)
    const margin = 8;
    if (left < margin) left = margin;
    if (left + portalWidth > window.innerWidth - margin) {
      left = window.innerWidth - portalWidth - margin;
    }
    // If preview would go above viewport top, flip to below pin
    p.style.left = left + 'px';
    p.style.top = top + 'px';
    p.classList.remove('arrow-up', 'arrow-down');
    p.classList.add(arrowClass);
    // After layout, measure portal height to decide flip
    requestAnimationFrame(() => {
      const ph = p.offsetHeight;
      if (top - ph < 10) {
        // Flip below
        p.style.top = (pinRect.bottom + 16) + 'px';
        p.classList.remove('arrow-down');
        p.classList.add('arrow-up');
      } else {
        p.style.top = (top - ph) + 'px';
      }
      // Position arrow at pin's horizontal center relative to portal
      const arrowLeft = pinRect.left + pinRect.width / 2 - parseFloat(p.style.left);
      p.style.setProperty('--arrow-left', arrowLeft + 'px');
    });
    p.classList.add('show');
  }
  function hidePortalPreview() {
    portalCurrentPin = null;
    if (portalEl) portalEl.classList.remove('show');
  }
  // Hide portal on scroll/resize/swipe (pin position changes)
  window.addEventListener('scroll', hidePortalPreview, { passive: true });
  window.addEventListener('resize', hidePortalPreview);

  const LONGPRESS_MS = 380;
  document.querySelectorAll('.pin').forEach(pin => {
    let lpTimer = null;
    let suppressClick = false;
    let touchStartXY = null;

    function endPreview(delay) {
      if (delay) {
        setTimeout(() => {
          pin.classList.remove('previewing');
          if (portalCurrentPin === pin) hidePortalPreview();
        }, delay);
      } else {
        pin.classList.remove('previewing');
        if (portalCurrentPin === pin) hidePortalPreview();
      }
    }

    // Desktop hover → portal preview
    pin.addEventListener('mouseenter', () => showPortalPreview(pin));
    pin.addEventListener('mouseleave', () => hidePortalPreview());

    // Long-press start
    pin.addEventListener('touchstart', e => {
      if (!e.touches || !e.touches[0]) return;
      touchStartXY = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      suppressClick = false;
      lpTimer = setTimeout(() => {
        suppressClick = true;
        pin.classList.add('previewing');
        showPortalPreview(pin);
      }, LONGPRESS_MS);
    }, { passive: true });

    // If finger moves more than ~10px, cancel long-press
    pin.addEventListener('touchmove', e => {
      if (!touchStartXY || !e.touches[0]) return;
      const dx = e.touches[0].clientX - touchStartXY.x;
      const dy = e.touches[0].clientY - touchStartXY.y;
      if (Math.hypot(dx, dy) > 10) {
        clearTimeout(lpTimer);
        endPreview();
      }
    }, { passive: true });

    pin.addEventListener('touchend', () => {
      clearTimeout(lpTimer);
      // If long-press was triggered, keep preview shown briefly then hide
      if (pin.classList.contains('previewing')) endPreview(1500);
    }, { passive: true });

    pin.addEventListener('touchcancel', () => {
      clearTimeout(lpTimer);
      endPreview();
      suppressClick = false;
    });

    // Click handler — skip if just long-pressed (preview shown)
    pin.addEventListener('click', e => {
      if (suppressClick) {
        suppressClick = false;
        e.preventDefault();
        return;
      }
      const status = pin.dataset.status;
      const room = pin.dataset.room;
      if (status === 'live') {
        e.preventDefault();
        navigateToRoom(room);
      } else {
        openSoon(room);
      }
    });
  });

  // ============ ROOMS ============
  // ============ MAP scrolling — JS-driven, axis-locked, iPhone-like momentum ============
  // Why JS instead of native scroll? On iOS, native horizontal scroll on a wide
  // element fights with vertical page scroll — slight wobble locks to one axis.
  // With JS we can *cleanly release* a touch session if the user moves vertically,
  // letting the page scroll naturally. Drag (mouse + finger) and signpost both work.
  (function initMapScroll() {
    const wrapper = document.querySelector('.map-wrapper');
    const canvas = document.getElementById('mapCanvas');
    const islandSection = document.querySelector('.map-section-island');
    const islandVid = document.getElementById('islandMapVideo');
    const signpost = document.getElementById('signpost');
    const signpostBack = document.getElementById('signpostBack');
    if (!wrapper || !canvas || !islandSection) return;

    let pos = 0;          // current translateX in px (negative = scrolled right)
    let minPos = 0;       // most-negative allowed (scrollWidth - viewWidth)
    let velocity = 0;     // px/ms
    let momentumId = null;
    let dragging = false;
    let activePointerId = null;
    let startX = 0, startY = 0;
    let lastX = 0, lastTime = 0;
    let axis = null;      // null | 'x' | 'y'
    const AXIS_THRESHOLD = 7;

    function clamp(v) { return Math.max(minPos, Math.min(0, v)); }
    function setPos(v) {
      pos = clamp(v);
      canvas.style.transform = `translate3d(${pos}px, 0, 0)`;
      updateSignpostVisibility();
    }
    function recompute() {
      const total = canvas.scrollWidth;
      minPos = -(total - wrapper.clientWidth);
      if (minPos > 0) minPos = 0;
      setPos(pos); // re-clamp
    }
    // Recompute after layout settles + on resize + after island video loads
    requestAnimationFrame(() => requestAnimationFrame(recompute));
    window.addEventListener('resize', recompute);
    if (islandVid) islandVid.addEventListener('loadedmetadata', recompute);

    // ----- Lazy-load + play island video when scrolled near island -----
    function checkIslandVisible() {
      const islandLeft = islandSection.offsetLeft + pos; // pos is negative
      const islandRight = islandLeft + islandSection.offsetWidth;
      const wrapperW = wrapper.clientWidth;
      // Visible if any part of island intersects viewport
      const visible = islandRight > 0 && islandLeft < wrapperW;
      if (islandVid) {
        if (visible && islandVid.paused) {
          islandVid.load(); islandVid.play().catch(() => {});
        } else if (!visible && !islandVid.paused) {
          islandVid.pause();
        }
      }
      return visible;
    }

    function updateSignpostVisibility() {
      const islandLeft = islandSection.offsetLeft + pos;
      const wrapperW = wrapper.clientWidth;
      // "On island side" = island center is past the halfway of viewport
      const onIslandSide = islandLeft < wrapperW * 0.5;
      if (signpost) signpost.classList.toggle('gone', onIslandSide);
      if (signpostBack) signpostBack.classList.toggle('gone', !onIslandSide);
      checkIslandVisible();
    }

    // ----- Momentum -----
    function cancelMomentum() {
      if (momentumId) cancelAnimationFrame(momentumId);
      momentumId = null;
    }
    function applyMomentum() {
      if (Math.abs(velocity) < 0.04) { momentumId = null; return; }
      setPos(pos + velocity * 16);
      // Bounce-back resistance at edges
      if (pos <= minPos || pos >= 0) velocity *= 0.7;
      else velocity *= 0.94;
      momentumId = requestAnimationFrame(applyMomentum);
    }

    // ----- Pointer (covers mouse + touch + pen) -----
    wrapper.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.pin') || e.target.closest('.signpost')) return;
      cancelMomentum();
      dragging = true;
      activePointerId = e.pointerId;
      axis = null;
      startX = lastX = e.clientX;
      startY = e.clientY;
      lastTime = performance.now();
      velocity = 0;
      // For mouse only — capture so we get events outside the wrapper
      if (e.pointerType === 'mouse') {
        try { wrapper.setPointerCapture(e.pointerId); } catch (_) {}
      }
    });

    wrapper.addEventListener('pointermove', (e) => {
      if (!dragging || e.pointerId !== activePointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // First-move axis decision
      if (!axis) {
        if (Math.abs(dy) > AXIS_THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
          // VERTICAL dominant → release the touch so the page can scroll naturally
          dragging = false;
          axis = 'y';
          activePointerId = null;
          wrapper.classList.remove('is-dragging');
          if (e.pointerType === 'mouse') {
            try { wrapper.releasePointerCapture(e.pointerId); } catch (_) {}
          }
          return;
        }
        if (Math.abs(dx) > AXIS_THRESHOLD) {
          axis = 'x';
          wrapper.classList.add('is-dragging');
        } else {
          return; // not enough movement yet
        }
      }

      if (axis === 'x') {
        e.preventDefault();
        const moveX = e.clientX - lastX;
        const now = performance.now();
        const dt = Math.max(1, now - lastTime);
        velocity = velocity * 0.4 + (moveX / dt) * 0.6;
        setPos(pos + moveX);
        lastX = e.clientX;
        lastTime = now;
      }
    });

    function endDrag(e) {
      if (!dragging || (e && e.pointerId !== activePointerId)) return;
      dragging = false;
      activePointerId = null;
      wrapper.classList.remove('is-dragging');
      if (axis === 'x' && Math.abs(velocity) > 0.05) {
        cancelMomentum();
        momentumId = requestAnimationFrame(applyMomentum);
      }
      axis = null;
    }
    wrapper.addEventListener('pointerup', endDrag);
    wrapper.addEventListener('pointercancel', endDrag);

    // ----- Signpost click → smooth glide to island -----
    function smoothScrollTo(target, duration = 700) {
      cancelMomentum();
      const start = pos;
      const change = target - start;
      const t0 = performance.now();
      function step(now) {
        const t = Math.min(1, (now - t0) / duration);
        // ease-in-out cubic
        const eased = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
        setPos(start + change * eased);
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (signpost) {
      signpost.addEventListener('click', (e) => {
        e.preventDefault();
        // Pan so the island is roughly centered
        const target = -(islandSection.offsetLeft + islandSection.offsetWidth/2 - wrapper.clientWidth/2);
        smoothScrollTo(clamp(target));
      });
    }
    if (signpostBack) {
      signpostBack.addEventListener('click', (e) => {
        e.preventDefault();
        // Back to heart island = scroll to position 0
        smoothScrollTo(0);
      });
    }
    // Tour hook: snap the map back to the heart island instantly
    window.__mapHome = () => setPos(0);
  })();


  // ============ GUIDED TOUR / DIRECTORY ============
  (function initTour() {
    const tour = document.getElementById('tour');
    if (!tour) return;
    const holeRect = document.getElementById('tourHoleRect');
    const ring = document.getElementById('tourRing');
    const card = document.getElementById('tourCard');
    const emojiEl = document.getElementById('tourEmoji');
    const titleEl = document.getElementById('tourTitle');
    const textEl = document.getElementById('tourText');
    const dotsEl = document.getElementById('tourDots');
    const tourSkip = document.getElementById('tourSkip');
    const tourNext = document.getElementById('tourNext');
    const openBtn = document.getElementById('tourOpen');
    const TOUR_KEY = 'healjai_tour_v1';

    const STEPS = [
      { emoji: '🏝️',
        th_t: 'ยินดีต้อนรับสู่ เกาะฮีลใจ', en_t: 'Welcome to Heal Island',
        th: 'ที่นี่คือ “เกาะฮีลใจ” — เกาะที่มีหลายห้องให้แวะพักใจ เลือกห้องตามความรู้สึกตอนนี้ได้เลย ไม่ต้องรีบ',
        en: 'This is “Heal Island” — an island of little rooms to rest your heart. Choose whatever feels right now, no rush.' },
      { target: '.pin-1', emoji: '🙏',
        th_t: 'อยากขอพร ใจสงบ?', en_t: 'Need calm or a little blessing?',
        th: 'แวะ “ศาลฮีลใจ” — ไหว้พระ จุดธูป ขอพร เสี่ยงเซียมซี ให้ใจเบาขึ้น',
        en: 'Visit the “Heal Shrine” — pray, light incense, make a wish, draw a fortune stick.' },
      { target: '.pin-4', emoji: '🌙',
        th_t: 'อยากอยู่เงียบๆ คนเดียว?', en_t: 'Want a quiet moment alone?',
        th: '“ห้องนอนพักใจ” มีเตียงนอน นั่งสมาธิ เช็คใจ และสมุดให้เขียนระบายความรู้สึก',
        en: 'The “Resting Bedroom” — a bed, meditation, mood check-in, and a journal to let feelings out.' },
      { target: '.pin-5', emoji: '🎧',
        th_t: 'อยากผ่อนคลายเบาๆ?', en_t: 'Want to unwind gently?',
        th: '“คาเฟ่รวมใจ” มีเพลง LO-Fi ดูดวง และแบบทดสอบสนุกๆ ให้เล่น',
        en: 'The “Heart Café” — LO-Fi music, fortunes, and gentle little quizzes.' },
      { target: '.pin-3', emoji: '🖼️',
        th_t: 'อยากดูเรื่องราวของคนอื่น?', en_t: 'Curious about others’ stories?',
        th: '“พิพิธภัณฑ์จัดแสดงใจ” รวมของและคำพูดที่เคยช่วยให้ใครสักคนเดินต่อไหว',
        en: 'The “Heart Museum” — things and words that once helped someone keep going.' },
      { target: '.pin-2', emoji: '🌳',
        th_t: 'อยากลุกไปใช้ชีวิตข้างนอก?', en_t: 'Ready to step outside?',
        th: '“ลานสบายใจ” ชวนเธอเดินเล่น มองท้องฟ้า เติมพลังจากโลกจริง',
        en: 'The “Easy Yard” — take a walk, look at the sky, recharge in the real world.' },
      { emoji: '🪧',
        th_t: 'ยังมีอีกเกาะให้สำรวจ', en_t: 'There’s another island too',
        th: 'ทางขวาของเกาะมีป้าย “เกาะแห่งเวลา” กดเพื่อข้ามไป — พื้นที่ให้หยุดคิด และเห็นค่าของวันนี้',
        en: 'On the right edge, a sign leads to “Time Island” — a space to pause and feel today’s worth.' },
      { target: '.header-actions', emoji: '🎵',
        th_t: 'เครื่องมือเล็กๆ ของเธอ', en_t: 'Your little tools',
        th: 'เปลี่ยนเพลง 🎵 เก็บคำดีๆ ในกล่อง 🔖 สลับ ไทย/EN และกด ❓ เพื่อดูทัวร์นี้ซ้ำได้',
        en: 'Switch music 🎵, save favorites 🔖, toggle TH/EN, and tap ❓ to replay this tour.' },
      { emoji: '💛',
        th_t: 'พร้อมแล้ว', en_t: 'You’re all set',
        th: 'เริ่มจากห้องไหนก็ได้ที่ใจอยากแวะ เราอยู่ตรงนี้ 24 ชม. ไม่ต้องรีบนะ',
        en: 'Start wherever your heart wants to go. We’re here 24/7 — no rush.' },
    ];

    let idx = 0, active = false, curTarget = null;

    function buildDots() {
      dotsEl.innerHTML = STEPS.map((_, i) => `<span class="${i === idx ? 'on' : ''}"></span>`).join('');
    }
    function clearSpot() {
      ring.hidden = true;
      holeRect.setAttribute('x', -300);
      holeRect.setAttribute('y', -300);
      holeRect.setAttribute('width', 0);
      holeRect.setAttribute('height', 0);
    }
    function centerCard() {
      card.style.left = '50%';
      card.style.top = '50%';
      card.style.transform = 'translate(-50%, -50%)';
    }
    // Position spotlight + card around the current target (relative to viewport).
    // Only scrolls the WINDOW vertically — never touches the map's horizontal pan.
    function position() {
      if (!curTarget) { clearSpot(); centerCard(); return; }
      let r = curTarget.getBoundingClientRect();
      if (!r.width || !r.height) { clearSpot(); centerCard(); return; }
      const vhPre = window.innerHeight;
      // If the target sits outside the comfortable band, scroll the page
      // vertically to centre it (vertical only — horizontal pan untouched).
      if (r.height < vhPre - 140 && (r.top < 70 || r.bottom > vhPre - 70)) {
        const absY = window.scrollY + r.top + r.height / 2;
        window.scrollTo({ top: Math.max(0, absY - vhPre / 2), behavior: 'auto' });
        r = curTarget.getBoundingClientRect();
      }
      const pad = 12;
      const x = r.left - pad, y = r.top - pad;
      const w = r.width + pad * 2, h = r.height + pad * 2;
      const radius = Math.min(w, h) / 2;
      holeRect.setAttribute('x', x);
      holeRect.setAttribute('y', y);
      holeRect.setAttribute('width', w);
      holeRect.setAttribute('height', h);
      holeRect.setAttribute('rx', radius);
      ring.hidden = false;
      ring.style.left = x + 'px';
      ring.style.top = y + 'px';
      ring.style.width = w + 'px';
      ring.style.height = h + 'px';
      ring.style.borderRadius = radius + 'px';
      const cardH = card.offsetHeight || 230;
      const vh = window.innerHeight;
      card.style.left = '50%';
      card.style.transform = 'translate(-50%, 0)';
      if (y + h + 18 + cardH < vh) {
        card.style.top = (y + h + 18) + 'px';
      } else if (y - 18 - cardH > 0) {
        card.style.top = (y - 18 - cardH) + 'px';
      } else {
        centerCard();
      }
    }
    function render() {
      const s = STEPS[idx];
      emojiEl.textContent = s.emoji;
      titleEl.innerHTML = `<span data-th>${s.th_t}</span><span data-en>${s.en_t}</span>`;
      textEl.innerHTML = `<span data-th>${s.th}</span><span data-en>${s.en}</span>`;
      buildDots();
      tourNext.innerHTML = (idx === STEPS.length - 1)
        ? '<span data-th>เริ่มสำรวจ</span><span data-en>Start</span>'
        : '<span data-th>ถัดไป</span><span data-en>Next</span>';
      // Re-trigger the gentle content fade-in for this step
      card.classList.remove('anim'); void card.offsetWidth; card.classList.add('anim');
      curTarget = s.target ? document.querySelector(s.target) : null;
      // Measure on the next frame so the spotlight lands correctly.
      if (curTarget) {
        requestAnimationFrame(() => requestAnimationFrame(position));
      } else {
        clearSpot(); centerCard();
      }
    }
    function openTour() {
      idx = 0; active = true;
      // Snap map back to the heart island + go to the top so steps line up.
      if (window.__mapHome) { try { window.__mapHome(); } catch (e) {} }
      window.scrollTo({ top: 0, behavior: 'auto' });
      tour.hidden = false;
      requestAnimationFrame(() => { tour.classList.add('show'); render(); });
    }
    function closeTour() {
      active = false;
      tour.classList.remove('show');
      try { localStorage.setItem(TOUR_KEY, '1'); } catch (e) {}
      // Leave the visitor at the top of the heart island, looking at the whole map.
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTimeout(() => { tour.hidden = true; clearSpot(); }, 450);
    }
    function nextStep() {
      if (idx >= STEPS.length - 1) { closeTour(); return; }
      idx++; render();
    }
    tourNext.addEventListener('click', nextStep);
    tourSkip.addEventListener('click', closeTour);
    if (openBtn) openBtn.addEventListener('click', openTour);
    window.addEventListener('keydown', e => { if (active && e.key === 'Escape') closeTour(); });
    let rt; window.addEventListener('resize', () => { if (active) { clearTimeout(rt); rt = setTimeout(position, 120); } });
    window.addEventListener('scroll', () => { if (active) position(); }, { passive: true });

    window.__maybeStartTour = function () {
      let seen = false;
      try { seen = localStorage.getItem(TOUR_KEY) === '1'; } catch (e) {}
      if (!seen) setTimeout(openTour, 500);
    };
  })();


  // Play the intro only once per browsing session. Coming back from a room
  // (same tab) skips it and lands straight on the map / island.
  let introSeen = false;
  try { introSeen = sessionStorage.getItem(INTRO_KEY) === '1'; } catch (e) {}
  if (introSeen) showMapInstant();
  else runIntro();
})();
