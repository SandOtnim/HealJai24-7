(() => {
  if (!document.querySelector('[data-page="home"]')) return;
  const body = document.body;
  const intro = document.getElementById('intro'); const main = document.getElementById('main'); const skipBtn = document.getElementById('skipBtn');
  const phrasesByLang = { th: [...document.querySelectorAll('.phrase[data-th]')], en: [...document.querySelectorAll('.phrase[data-en]')] };
  const TIMING = { fadeIn: 1000, hold: 2000, fadeOut: 800, brandHold: 3200 }; let introTimers = [];
  function clearIntroTimers() { introTimers.forEach(clearTimeout); introTimers = []; }
  function runIntro() { if (!intro || !main) return; const phrases = phrasesByLang[body.dataset.lang || 'th'] || []; phrases.forEach(p => p.classList.remove('show')); setTimeout(() => { const m = document.getElementById('bgMusic'); const tg = document.getElementById('musicToggle'); if (m && m.paused) m.play().then(() => tg && tg.classList.add('playing')).catch(() => {}); }, 900); let cursor = 0; phrases.forEach(p => { const isBrand = p.classList.contains('brand'); const hold = isBrand ? TIMING.brandHold : TIMING.hold; const cycle = TIMING.fadeIn + hold + TIMING.fadeOut; introTimers.push(setTimeout(() => p.classList.add('show'), cursor)); introTimers.push(setTimeout(() => p.classList.remove('show'), cursor + TIMING.fadeIn + hold)); cursor += cycle - 200; }); introTimers.push(setTimeout(finishIntro, cursor + 600)); }
  function finishIntro() { if (!intro || !main) return; clearIntroTimers(); intro.classList.add('done'); setTimeout(() => { intro.style.display = 'none'; main.classList.add('visible'); }, 1200); }
  if (skipBtn) skipBtn.addEventListener('click', finishIntro);
  const ROOM_URLS = { mu: 'sacred.html', travel: 'travel.html', museum: 'museum.html', alone: 'alone.html', community: 'community.html', island: 'island.html' }; function navigateToRoom(room) { const url = ROOM_URLS[room]; if (url) window.location.href = url; }
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
  })();


  runIntro();
})();
