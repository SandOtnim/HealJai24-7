(() => {
  const body = document.body;

  function syncPlaceholders() {
    document.querySelectorAll('[data-th-placeholder]').forEach(el => {
      const lang = body.dataset.lang || 'th';
      el.placeholder = el.dataset[lang + 'Placeholder'] || '';
    });
  }
  window.syncPlaceholders = syncPlaceholders;

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      body.dataset.lang = body.dataset.lang === 'th' ? 'en' : 'th';
      document.documentElement.lang = body.dataset.lang;
      syncPlaceholders();
      if (typeof window.__onLanguageChange === 'function') {
        window.__onLanguageChange(body.dataset.lang);
      }
    });
  }
  syncPlaceholders();

  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicMenu = document.getElementById('musicMenu');
  const pauseTrackBtn = document.getElementById('pauseTrack');

  function playMusic() {
    if (!bgMusic) return Promise.resolve();
    return bgMusic.play()
      .then(() => musicToggle && musicToggle.classList.add('playing'))
      .catch(() => {});
  }

  function pauseMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    if (musicToggle) musicToggle.classList.remove('playing');
  }

  function switchTrack(src) {
    if (!bgMusic || !src) return;
    const wasPlaying = !bgMusic.paused;
    bgMusic.src = src;
    bgMusic.load();
    if (wasPlaying) playMusic();
    document.querySelectorAll('.track-btn[data-src]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.src === src);
    });
  }

  window.playMusic = playMusic;
  window.pauseMusic = pauseMusic;
  window.switchTrack = switchTrack;
  if (bgMusic) bgMusic.volume = 0.4;

  document.querySelectorAll('.track-btn[data-src]').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTrack(btn.dataset.src);
      playMusic();
      if (musicMenu) musicMenu.classList.remove('show');
    });
  });

  if (pauseTrackBtn) {
    pauseTrackBtn.addEventListener('click', () => {
      pauseMusic();
      if (musicMenu) musicMenu.classList.remove('show');
    });
  }

  if (bgMusic) {
    bgMusic.addEventListener('error', () => {
      const cur = bgMusic.src;
      document.querySelectorAll('.track-btn[data-src]').forEach(btn => {
        if (cur.endsWith(btn.dataset.src.replace(/^.*\//, ''))) {
          btn.classList.add('disabled');
          btn.title = 'Audio file is missing';
        }
      });
    });
  }

  if (musicToggle && musicMenu) {
    musicToggle.addEventListener('click', e => {
      e.stopPropagation();
      musicMenu.classList.toggle('show');
    });
    document.addEventListener('click', e => {
      if (!musicMenu.contains(e.target) && e.target !== musicToggle) {
        musicMenu.classList.remove('show');
      }
    });
  }

  function firstInteractionStart() {
    if (bgMusic && bgMusic.paused) playMusic();
    document.removeEventListener('click', firstInteractionStart, true);
    document.removeEventListener('keydown', firstInteractionStart, true);
  }
  document.addEventListener('click', firstInteractionStart, true);
  document.addEventListener('keydown', firstInteractionStart, true);

  document.addEventListener('click', e => {
    const btn = e.target.closest('.bedroom-track[data-bd-src]');
    if (!btn) return;
    switchTrack(btn.dataset.bdSrc);
    playMusic();
    const group = btn.parentElement;
    if (group) {
      group.querySelectorAll('.bedroom-track').forEach(item => item.classList.remove('active'));
    }
    btn.classList.add('active');
  });
  // ============ Toast notification (used by share + bookmark) ============
  let _toastEl = null;
  let _toastTimer = null;
  function showToast(msg, ms) {
    if (!_toastEl) {
      _toastEl = document.createElement('div');
      _toastEl.className = 'toast';
      document.body.appendChild(_toastEl);
    }
    _toastEl.textContent = msg;
    _toastEl.classList.add('show');
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => _toastEl.classList.remove('show'), ms || 2200);
  }

  // ============ Generic share button (Web Share API + clipboard fallback) ============
  function shareContent(title, text) {
    const url = window.location.href.split('#')[0];
    const fullText = text + '\n\n— จากเว็บ ฮีลใจ 24/7\n' + url;
    if (navigator.share) {
      navigator.share({ title, text: fullText, url }).then(() => {
        showToast('แชร์เรียบร้อย 💗');
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText).then(() => {
        showToast('คัดลอกไปคลิปบอร์ดแล้ว 💗 ไปแปะแชร์ได้เลย', 3000);
      }).catch(() => {
        prompt('คัดลอกข้อความนี้ไปแชร์:', fullText);
      });
    } else {
      prompt('คัดลอกข้อความนี้ไปแชร์:', fullText);
    }
  }

  // ============ Bookmark / Save system ============
  const BOOKMARK_KEY = 'healjai_bookmarks_v1';
  function loadBookmarks() {
    try { return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]'); }
    catch { return []; }
  }
  function saveBookmarks(arr) {
    try { localStorage.setItem(BOOKMARK_KEY, JSON.stringify(arr)); } catch {}
  }
  function addBookmark(type, text, meta) {
    const all = loadBookmarks();
    const item = {
      id: Date.now() + '_' + Math.random().toString(36).slice(2,7),
      type: type,
      text: text,
      meta: meta || '',
      ts: new Date().toISOString(),
    };
    all.unshift(item);
    if (all.length > 100) all.length = 100; // cap
    saveBookmarks(all);
    return item;
  }
  function removeBookmark(id) {
    const all = loadBookmarks().filter(x => x.id !== id);
    saveBookmarks(all);
  }
  function getBookmarkText(type) {
    if (type === 'mu-fortune') return window._muLastBlessing || '';
    if (type === 'mu-blessing') return window._muLastBlessing || 'พรจากห้องมู';
    if (type === 'wheel') return window._wheelLastWin ? ('กิจกรรมจากวงล้อ: ' + window._wheelLastWin) : '';
    if (type === 'community-fortune') return window._fortuneLastText || '';
    if (type === 'release') return window._releaseLastResult || '';
    if (type === 'coloring') return window._coloringLastDesc || 'งานระบายสีที่ฉันทำในห้องนอน';
    if (type === 'tarot') return window._tarotLastDesc || 'ไพ่ที่ฉันเปิดในห้องชุมชน';
    if (type === 'shop') return window._shopLastResult || '';
    return '';
  }
  document.addEventListener('click', (e) => {
    const bk = e.target.closest('.bookmark-btn');
    if (!bk) return;
    e.preventDefault();
    const type = bk.dataset.bookmarkType;
    const text = getBookmarkText(type);
    if (!text) { showToast('ยังไม่มีข้อความให้บันทึก'); return; }
    addBookmark(type, text);
    bk.classList.add('saved');
    bk.querySelectorAll('[data-th]').forEach(s => s.textContent = '✓ บันทึกแล้ว');
    bk.querySelectorAll('[data-en]').forEach(s => s.textContent = '✓ Saved');
    showToast('บันทึกในกล่องของฉันแล้ว 🔖');
    updateBookmarkBadge();
    setTimeout(() => {
      bk.classList.remove('saved');
      bk.querySelectorAll('[data-th]').forEach(s => s.textContent = '🔖 บันทึก');
      bk.querySelectorAll('[data-en]').forEach(s => s.textContent = '🔖 Save');
    }, 3500);
  });

  // Bookmark drawer — open / render / delete / share
  function typeLabel(t) {
    return ({
      'mu-fortune': 'เซียมซีห้องมู',
      'mu-blessing': 'พรห้องมู',
      'wheel': 'วงล้อกิจกรรม',
      'community-fortune': 'ไพ่ห้องชุมชน',
      'release': 'ห้องระบาย',
      'coloring': 'ระบายดอกไม้',
      'tarot': 'ไพ่ทาโรต์',
    })[t] || 'บันทึก';
  }
  function renderBookmarkList() {
    const ul = document.getElementById('bookmarkList');
    const empty = document.getElementById('bookmarkEmpty');
    if (!ul || !empty) return;
    const items = loadBookmarks();
    ul.innerHTML = '';
    if (!items.length) {
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    items.forEach(it => {
      const li = document.createElement('li');
      li.className = 'bookmark-item';
      const date = new Date(it.ts);
      const dateStr = date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
      li.innerHTML =
        '<div class="bookmark-item-meta">' + typeLabel(it.type) + ' · ' + dateStr + '</div>' +
        '<div class="bookmark-item-text"></div>' +
        '<div class="bookmark-item-actions">' +
          '<button data-bm-share="' + it.id + '">📤 แชร์</button>' +
          '<button data-bm-del="' + it.id + '">🗑 ลบ</button>' +
        '</div>';
      li.querySelector('.bookmark-item-text').textContent = it.text;
      ul.appendChild(li);
    });
  }
  function updateBookmarkBadge() {
    const badge = document.getElementById('bookmarkBadge');
    if (!badge) return;
    const n = loadBookmarks().length;
    if (n === 0) { badge.hidden = true; return; }
    badge.hidden = false;
    badge.textContent = n > 99 ? '99+' : String(n);
  }
  const bmModal = document.getElementById('bookmarkModal');
  const bmOpen = document.getElementById('bookmarkOpen');
  function closeBookmarkModal() {
    if (!bmModal) return;
    bmModal.classList.remove('show');
    setTimeout(() => { bmModal.hidden = true; }, 350);
    body.style.overflow = '';
  }
  // Expose globally so inline onclick attributes can call it (defensive fallback)
  window.__closeBookmarkModal = closeBookmarkModal;
  if (bmOpen && bmModal) {
    bmOpen.addEventListener('click', () => {
      renderBookmarkList();
      bmModal.hidden = false;
      requestAnimationFrame(() => bmModal.classList.add('show'));
      body.style.overflow = 'hidden';
    });
    // Delegated handler for all clicks inside bookmark modal — close + delete + share
    bmModal.addEventListener('click', (e) => {
      if (e.target.closest('[data-close-bookmark]')) {
        closeBookmarkModal();
        return;
      }
      const del = e.target.closest('[data-bm-del]');
      const sh = e.target.closest('[data-bm-share]');
      if (del) {
        removeBookmark(del.dataset.bmDel);
        renderBookmarkList();
        updateBookmarkBadge();
        showToast('ลบแล้ว');
      } else if (sh) {
        const item = loadBookmarks().find(x => x.id === sh.dataset.bmShare);
        if (item) shareContent('จากกล่องของฉัน · ฮีลใจ 24/7', item.text);
      }
    });
    // Escape key also closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !bmModal.hidden && bmModal.classList.contains('show')) {
        closeBookmarkModal();
      }
    });
  }
  updateBookmarkBadge();
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.share-btn');
    if (!btn) return;
    e.preventDefault();
    const type = btn.dataset.shareType;
    let title = 'ฮีลใจ 24/7';
    let text = '';
    if (type === 'wheel') {
      text = 'วงล้อสุ่มกิจกรรมให้ฉัน: ' + (window._wheelLastWin || 'ออกไปข้างนอกกันเถอะ');
      title = 'วันนี้ออกไปทำอะไรดี?';
    } else if (type === 'fortune') {
      text = window._fortuneLastText || 'มาดูดวงในเว็บฮีลใจ 24/7 กันเถอะ';
      title = 'คำใบ้จากเซียมซีวันนี้';
    } else if (type === 'mu') {
      text = window._muLastBlessing || 'ไหว้พระสบายใจ ฮีลใจ 24/7';
      title = 'พรจากห้องมู';
    } else if (type === 'release') {
      text = window._releaseLastResult || 'ฉันระบายของไปที่ห้องระบายของฮีลใจ 24/7 — ใจเบาขึ้นเยอะ 🤍';
      title = 'ผลห้องระบาย';
    } else if (type === 'coloring') {
      text = window._coloringLastDesc || 'ฉันเพิ่งระบายดอกไม้ในห้องนอนของฮีลใจ 24/7 ใจสงบดีจัง 🌸';
      title = 'งานระบายสีของฉัน';
    } else if (type === 'tarot') {
      text = window._tarotLastDesc || 'ไพ่ที่ฉันเปิดในห้องชุมชน — ฮีลใจ 24/7';
      title = 'ไพ่ของฉันวันนี้';
    } else if (type === 'shop') {
      text = window._shopLastResult || 'ฉันช้อปในห้องช้อปสบายใจของฮีลใจ 24/7 ใจฟู 🛍✨';
      title = 'ช้อปสบายใจ';
    } else {
      text = 'ฮีลใจ 24/7 — เว็บฮีลใจสำหรับคนเมือง';
    }
    shareContent(title, text);
  });

  // ============ Privacy Policy modal ============
  const privacyModal = document.getElementById('privacyModal');
  document.querySelectorAll('[data-open-privacy]').forEach(b => {
    b.addEventListener('click', () => {
      if (privacyModal) {
        privacyModal.classList.add('show');
        body.style.overflow = 'hidden';
      }
    });
  });
  document.querySelectorAll('[data-close-privacy]').forEach(b => {
    b.addEventListener('click', () => {
      if (privacyModal) {
        privacyModal.classList.remove('show');
        body.style.overflow = '';
      }
    });
  });
  if (privacyModal) {
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) {
        privacyModal.classList.remove('show');
        body.style.overflow = '';
      }
    });
  }


})();
