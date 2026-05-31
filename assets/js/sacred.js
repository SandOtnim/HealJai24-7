(() => {
  if (!document.querySelector('[data-page="sacred"]')) return;
  const body = document.body;
  // ============================================================
  // Per-deity research data — incense count, ritual, mantra etc.
  const DEITIES = {
    sothon: {
      img: 'assets/images/deity-sothon.jpg',
      name: { th: 'หลวงพ่อโสธร', en: 'Luang Pho Sothon' },
      power: { th: 'ความสำเร็จ · ร่ำรวย', en: 'Success & wealth' },
      offering: 'egg',
      incense: 3,
      ritualEmoji: '🥚',
      ritual: {
        th: 'ขอพรเรื่องสำคัญ — ถ้าได้สมหวัง อย่าลืมมาแก้บนตามที่สัญญาไว้',
        en: 'Make a serious wish — if granted, return with boiled eggs (the number you vowed)',
      },
      placeholder: {
        th: 'ขออะไรกับหลวงพ่อ... และถ้าสมหวัง จะแก้บนอย่างไร',
        en: 'What you wish for, and how you\'ll return to fulfill the vow',
      },
    },
    trimurti: {
      img: 'assets/images/deity-trimurti.jpg',
      name: { th: 'พระตรีมูรติ', en: 'Trimurti' },
      power: { th: 'เรื่องความรัก', en: 'Love & relationships' },
      offering: 'rose',
      incense: 9,
      ritualEmoji: '💌',
      ritual: {
        th: 'วันมงคล: พฤหัสบดี เวลา 21:30 — เขียนชื่อคนรัก/คนที่อยากเจอ ใส่ในกระเป๋าตังค์',
        en: 'Auspicious: Thursday 21:30 — write the name of someone you love/want to meet, keep in wallet',
      },
      placeholder: {
        th: 'เขียนชื่อคนที่อยากให้พบ และความรู้สึกของคุณ...',
        en: 'Write the name of someone you wish to meet, and how you feel...',
      },
    },
    brahma: {
      img: 'assets/images/deity-brahma.jpg',
      name: { th: 'พระพรหม', en: 'Brahma' },
      power: { th: 'โชค · สติปัญญา', en: 'Wisdom & fortune' },
      offering: 'jasmine',
      incense: 16,
      ritualEmoji: '🧭',
      ritual: {
        th: '4 หน้า ดูแลคนละเรื่อง — ตะวันออก: การงาน · ตะวันตก: ความรัก · ใต้: เงิน · เหนือ: สุขภาพ. ไหว้ครบ 4 หน้า เดินตามเข็มนาฬิกา',
        en: '4 faces, each blessing — East: career · West: love · South: wealth · North: health. Bow to all 4 walking clockwise',
      },
      placeholder: {
        th: 'ด้านไหนของชีวิตที่คุณอยากให้ท่านดูแลมากที่สุด...',
        en: 'Which direction of your life needs the most blessing...',
      },
    },
    ganesha: {
      img: 'assets/images/deity-ganesha.jpg',
      name: { th: 'พระพิฆเนศ', en: 'Ganesha' },
      power: { th: 'ผ่านอุปสรรค · ขอความรู้', en: 'Removing obstacles · wisdom' },
      offering: 'sweets',
      incense: 9,
      ritualEmoji: '🐭',
      ritual: {
        th: 'พิเศษ: กระซิบความปรารถนาที่หูของน้องหนู (มูสิกา) — น้องหนูจะนำสารไปบอกพระพิฆเนศ',
        en: 'Special: whisper your wish into the mouse (Mushika)\'s ear — the mouse delivers your message to Ganesha',
      },
      placeholder: {
        th: 'กระซิบให้น้องหนู — อุปสรรคไหนที่อยากให้หายไป...',
        en: 'Whisper to the mouse — what obstacle you want removed...',
      },
    },
    lakshmi: {
      img: 'assets/images/deity-lakshmi.jpg',
      name: { th: 'พระแม่ลักษมี', en: 'Lakshmi' },
      power: { th: 'ความอุดมสมบูรณ์', en: 'Abundance & prosperity' },
      offering: 'lotus',
      incense: 9,
      ritualEmoji: '💰',
      ritual: {
        th: 'พิเศษ: วางเหรียญที่แท่นบูชา — เพื่อเชิญทรัพย์เข้ามา',
        en: 'Special: place a coin at the altar — to invite prosperity to flow in',
      },
      placeholder: {
        th: 'อยากเชิญความอุดมสมบูรณ์เข้ามาในเรื่องไหน...',
        en: 'Where in your life you wish abundance to flow...',
      },
    },
    vessuwan: {
      img: 'assets/images/deity-vessuwan.jpg',
      name: { th: 'ท้าวเวสสุวรรณ', en: 'Tao Vessuwan' },
      power: { th: 'ปกป้อง · ขจัดภัย', en: 'Protection · ward off evil' },
      offering: 'water',
      incense: 9,
      ritualEmoji: '🛡',
      ritual: {
        th: 'พิเศษ: บอกความกลัวออกมา — ขอท้าวเวสสุวรรณช่วยปกป้องจากภัยร้าย เจ้ากรรมนายเวร',
        en: 'Special: speak out what scares you — ask Tao Vessuwan to protect you from harm',
      },
      placeholder: {
        th: 'สิ่งที่คุณกลัว หรืออยากให้ปกป้องตัวเองจาก...',
        en: 'What you fear, or what you want protection from...',
      },
    },
    guanyin: {
      img: 'assets/images/deity-guanyin.jpg',
      name: { th: 'เจ้าแม่กวนอิม', en: 'Guan Yin' },
      power: { th: 'เมตตา · ปัญญา · ลูก', en: 'Compassion · wisdom · children' },
      offering: 'lotus',
      incense: 9,
      ritualEmoji: '💗',
      ritual: {
        th: 'พิเศษ: กราบ 9 ครั้ง พร้อมขอความเมตตาให้ตัวเองและคนรอบข้าง',
        en: 'Special: bow 9 times, asking for compassion for yourself and others',
      },
      placeholder: {
        th: 'อยากให้ใครได้รับความเมตตา — ตัวเองก็ได้นะ...',
        en: 'Who needs compassion today — including yourself...',
      },
    },
    thapthim: {
      img: 'assets/images/deity-thapthim.jpg',
      name: { th: 'เจ้าแม่ทับทิม', en: 'Chao Mae Thapthim' },
      power: { th: 'การเดินทาง · ค้าขาย · ลูกหลาน', en: 'Travel · trade · family' },
      offering: 'fruit',
      incense: 5,
      ritualEmoji: '🍎',
      ritual: {
        th: 'พิเศษ: วางผลไม้สีแดง (ทับทิม/แอปเปิ้ล) ที่แท่น — ขอเรื่องเดินทาง การค้า หรือครอบครัว',
        en: 'Special: place red fruit at altar — ask for safe travels, trade, or family',
      },
      placeholder: {
        th: 'เรื่องเดินทาง / ครอบครัว / กิจการ ที่อยากให้คุ้มครอง...',
        en: 'Travel / family / business you wish protected...',
      },
    },
  };

  // Special prayer schedules — when each deity's "ไหว้แบบพิเศษ" unlocks
  // Day: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
  const SPECIAL_SCHEDULE = {
    sothon:   { days: [0, 3], dayLabelTh: 'อาทิตย์ / พุธ', dayLabelEn: 'Sun / Wed' },
    trimurti: { days: [4], minHour: 21, minMinute: 30, dayLabelTh: 'พฤหัสบดี หลัง 21:30 น.', dayLabelEn: 'Thu after 21:30' },
    brahma:   { days: [0, 2], dayLabelTh: 'อาทิตย์ / อังคาร', dayLabelEn: 'Sun / Tue' },
    ganesha:  { days: [2], dayLabelTh: 'อังคาร', dayLabelEn: 'Tuesday' },
    lakshmi:  { days: [5], dayLabelTh: 'ศุกร์', dayLabelEn: 'Friday' },
    vessuwan: { days: [2, 6], dayLabelTh: 'อังคาร / เสาร์', dayLabelEn: 'Tue / Sat' },
    guanyin:  { days: [3, 4], dayLabelTh: 'พุธ / พฤหัสบดี', dayLabelEn: 'Wed / Thu' },
    thapthim: { days: [5, 6], dayLabelTh: 'ศุกร์ / เสาร์', dayLabelEn: 'Fri / Sat' },
  };

  function isSpecialAvailable(deityKey) {
    const s = SPECIAL_SCHEDULE[deityKey];
    if (!s) return false;
    const now = new Date();
    if (!s.days.includes(now.getDay())) return false;
    if (s.minHour !== undefined) {
      const h = now.getHours(), m = now.getMinutes();
      if (h < s.minHour) return false;
      if (h === s.minHour && m < (s.minMinute || 0)) return false;
    }
    return true;
  }

  const game = {
    deity: null,
    deityKey: null,
    correctOffer: null,
    incenseLit: 0,
    incenseTarget: 3,
    prayer: '',
    fortuneIdx: -1,
    prayerType: null, // 'regular' or 'special'
  };

  function resetGame() {
    game.deity = null;
    game.deityKey = null;
    game.correctOffer = null;
    game.incenseLit = 0;
    game.incenseTarget = 3;
    game.prayer = '';
    game.fortuneIdx = -1;
    game.prayerType = null;
    document.getElementById('prayerTypeStage').classList.remove('show');
    // Reset UI
    document.querySelectorAll('.deity-card').forEach(c => c.classList.remove('selected'));
    const offeringImg = document.getElementById('offeringDeity');
    offeringImg.src = '';
    offeringImg.hidden = true;
    document.querySelectorAll('.offering-btn').forEach(b => {
      b.classList.remove('correct', 'wrong');
      b.disabled = false;
    });
    // Clear deity bg + info
    const bg = document.getElementById('deityBgOverlay');
    bg.classList.remove('show');
    bg.style.backgroundImage = '';
    document.getElementById('deityInfo').classList.remove('show');
    // Reset incense
    document.getElementById('incenseRow').innerHTML = '';
    document.getElementById('incenseCount').innerHTML =
      '<span data-th>จุดแล้ว 0/3</span><span data-en>Lit 0/3</span>';
    // Reset prayer
    const pt = document.getElementById('prayerText');
    pt.value = '';
    pt.disabled = false;
    pt.placeholder = '';
    document.getElementById('prayerReleased').classList.remove('float');
    document.getElementById('prayerReleased').textContent = '';
    // Reset ritual banner
    document.getElementById('ritualBanner').classList.add('hidden');
    // Reset fortune
    document.getElementById('fortuneResult').classList.remove('show');
    document.querySelectorAll('.step-next').forEach(b => b.disabled = true);
    document.getElementById('releaseBtn').disabled = true;
    goToStep(1);
  }

  function buildIncense(count) {
    const row = document.getElementById('incenseRow');
    row.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const stick = document.createElement('div');
      stick.className = 'incense';
      stick.dataset.i = i;
      stick.innerHTML = '<div class="smoke"></div><div class="tip"></div><div class="stick"></div>';
      stick.addEventListener('click', () => {
        if (stick.classList.contains('lit')) return;
        stick.classList.add('lit');
        game.incenseLit++;
        const inc = document.getElementById('incenseCount');
        inc.innerHTML =
          '<span data-th>จุดแล้ว ' + game.incenseLit + '/' + count + '</span>' +
          '<span data-en>Lit ' + game.incenseLit + '/' + count + '</span>';
        if (game.incenseLit >= count) {
          document.querySelector('[data-step="3"] .step-next').disabled = false;
        }
      });
      row.appendChild(stick);
    }
  }

  function goToStep(n) {
    document.querySelectorAll('.game-step').forEach(s => s.classList.remove('active'));
    const step = document.querySelector(`.game-step[data-step="${n}"]`);
    if (step) step.classList.add('active');
    // Update progress dots
    const dots = document.querySelectorAll('.game-dot');
    dots.forEach((d, i) => {
      d.classList.remove('active', 'done');
      if (i < n - 1) d.classList.add('done');
      else if (i === n - 1) d.classList.add('active');
    });
    // Show deity info banner on steps 2-5 (after deity is picked)
    const info = document.getElementById('deityInfo');
    if (n >= 2 && n <= 5 && game.deityKey) info.classList.add('show');
    else info.classList.remove('show');
    // Build incense when entering step 3
    if (n === 3 && game.incenseTarget) {
      game.incenseLit = 0;
      buildIncense(game.incenseTarget);
      document.getElementById('incenseCount').innerHTML =
        '<span data-th>จุดแล้ว 0/' + game.incenseTarget + '</span>' +
        '<span data-en>Lit 0/' + game.incenseTarget + '</span>';
      document.querySelector('[data-step="3"] .step-next').disabled = true;
    }
    // Show ritual banner + mini-quest on step 4 ONLY when special prayer was chosen
    const banner = document.getElementById('ritualBanner');
    const prayerCard = document.getElementById('prayerCard');
    const releaseBtn = document.getElementById('releaseBtn');
    document.querySelectorAll('.mini-quest').forEach(q => q.classList.remove('active'));

    if (n === 4 && game.deityKey && game.prayerType === 'special') {
      banner.classList.remove('hidden');
      const quest = document.getElementById('quest-' + game.deityKey);
      if (quest) {
        // Has a unique mini-quest — show it, hide prayer card
        quest.classList.add('active');
        prayerCard.style.display = 'none';
        resetMiniQuests();
        releaseBtn.innerHTML = '<span data-th>เสร็จพิธี → ไปต่อ</span><span data-en>Ritual complete → Next</span> ✨';
        releaseBtn.disabled = true;
      } else {
        // No unique mini-quest (new deity) — fall back to prayer card with ritual banner shown
        prayerCard.style.display = '';
        releaseBtn.innerHTML = '<span data-th>เสร็จพิธี → ไปต่อ</span><span data-en>Ritual complete → Next</span> ✨';
      }
    } else if (n === 4) {
      banner.classList.add('hidden');
      prayerCard.style.display = '';
      releaseBtn.innerHTML = '<span data-th>ปล่อยลอยขึ้นฟ้า</span><span data-en>Release to the sky</span> ✨';
    } else {
      banner.classList.add('hidden');
      prayerCard.style.display = '';
    }
    // Scroll to top of overlay
    document.getElementById('room-mu').scrollTop = 0;
  }

  document.querySelectorAll('[data-go-step]').forEach(btn =>
    btn.addEventListener('click', () => {
      const target = parseInt(btn.dataset.goStep, 10);
      // If going back to step 1 from step 6 (Pray again), reset the game state
      if (btn.id === 'prayAgainBtn' || (target === 1 && btn.classList.contains('next'))) {
        resetGame();
      } else {
        goToStep(target);
      }
    })
  );

  // STEP 1: pick deity → reveals prayer-type choice
  document.querySelectorAll('.deity-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.deity-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const key = card.dataset.deity;
      game.deity = key;
      game.deityKey = key;
      const data = DEITIES[key];
      game.correctOffer = data.offering;

      // Update offering stage with selected deity image (or placeholder)
      const offeringImg = document.getElementById('offeringDeity');
      if (data.img) {
        offeringImg.src = data.img;
        offeringImg.style.display = '';
      } else {
        // Use SVG data-URI with emoji as fallback for placeholder deities
        const phEmoji = data.placeholderEmoji || '🙏';
        offeringImg.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#c1a07a"/><text x="100" y="135" font-size="120" text-anchor="middle">${phEmoji}</text></svg>`
        );
      }
      offeringImg.alt = data.name.th;
      offeringImg.hidden = false;

      // Set deity background overlay
      const bg = document.getElementById('deityBgOverlay');
      if (data.img) {
        bg.style.backgroundImage = 'url(' + data.img + ')';
      } else {
        bg.style.backgroundImage = data.placeholderBg || 'linear-gradient(180deg, var(--cream), var(--beige))';
      }
      bg.classList.add('show');

      // Populate deity info banner
      const infoImg = document.getElementById('deityInfoImg');
      if (data.img) {
        infoImg.src = data.img;
      } else {
        infoImg.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#c1a07a"/><text x="100" y="135" font-size="120" text-anchor="middle">${data.placeholderEmoji || '🙏'}</text></svg>`
        );
      }
      const lang = body.dataset.lang;
      document.getElementById('deityInfoName').textContent = data.name[lang];
      document.getElementById('deityInfoPower').textContent = data.power[lang];

      // Populate ritual banner content (shown later if special chosen)
      document.getElementById('ritualEmoji').textContent = data.ritualEmoji;
      document.getElementById('ritualText').textContent = data.ritual[lang];

      // Update prayer placeholder
      const pt = document.getElementById('prayerText');
      pt.placeholder = data.placeholder[lang];
      pt.dataset.thPlaceholder = data.placeholder.th;
      pt.dataset.enPlaceholder = data.placeholder.en;

      // Show prayer-type stage and update special availability
      const stage = document.getElementById('prayerTypeStage');
      stage.classList.add('show');
      updateSpecialAvailability(key);

      // Smooth scroll to prayer-type stage
      stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  function updateSpecialAvailability(deityKey) {
    const specialBtn = document.getElementById('specialBtn');
    const sub = document.getElementById('specialSub');
    const lang = body.dataset.lang;
    const sched = SPECIAL_SCHEDULE[deityKey];
    const available = isSpecialAvailable(deityKey);
    if (available) {
      specialBtn.disabled = false;
      specialBtn.classList.remove('locked');
      specialBtn.classList.add('special');
      sub.innerHTML =
        '<span data-th>พิธีครบ · ธูป ' + DEITIES[deityKey].incense + ' ดอก · มีกิมมิกพิเศษ</span>' +
        '<span data-en>Full ritual · ' + DEITIES[deityKey].incense + ' incense · special gimmick</span>';
    } else {
      specialBtn.disabled = true;
      specialBtn.classList.add('locked');
      specialBtn.classList.remove('special');
      sub.innerHTML =
        '<span data-th>เปิดเฉพาะวัน ' + sched.dayLabelTh + '</span>' +
        '<span data-en>Opens only ' + sched.dayLabelEn + '</span>';
    }
  }

  // Prayer-type buttons
  document.querySelectorAll('.prayer-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      const type = btn.dataset.type;
      game.prayerType = type;
      // Decide incense count based on type
      if (type === 'regular') {
        game.incenseTarget = 3;
      } else {
        game.incenseTarget = DEITIES[game.deityKey].incense;
      }
      goToStep(2);
    });
  });

  // STEP 2: offering match
  document.querySelectorAll('.offering-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!game.correctOffer) return;
      const choice = btn.dataset.offer;
      if (choice === game.correctOffer) {
        btn.classList.add('correct');
        document.querySelectorAll('.offering-btn').forEach(b => b.disabled = true);
        document.querySelector('[data-step="2"] .step-next').disabled = false;
      } else {
        btn.classList.add('wrong');
        setTimeout(() => btn.classList.remove('wrong'), 600);
      }
    });
  });

  // STEP 3: incense sticks are built dynamically by buildIncense() in goToStep

  // STEP 4: prayer release
  const prayerText = document.getElementById('prayerText');
  const prayerReleased = document.getElementById('prayerReleased');
  const releaseBtn = document.getElementById('releaseBtn');

  prayerText.addEventListener('input', () => {
    releaseBtn.disabled = prayerText.value.trim().length < 3;
  });

  releaseBtn.addEventListener('click', () => {
    if (releaseBtn.disabled) return;
    // SPECIAL mode: just advance (mini-quest already done)
    if (game.prayerType === 'special') {
      releaseBtn.disabled = true;
      goToStep(5);
      return;
    }
    // REGULAR mode: prayer release animation
    game.prayer = prayerText.value.trim();
    prayerReleased.textContent = game.prayer;
    prayerReleased.classList.add('float');
    prayerText.value = '';
    prayerText.disabled = true;
    releaseBtn.disabled = true;
    setTimeout(() => {
      prayerReleased.classList.remove('float');
      prayerText.disabled = false;
      goToStep(5);
    }, 4200);
  });

  // ============================================================
  // MINI-QUESTS (special prayer interactions per deity)
  // ============================================================
  function markQuestDone() {
    document.getElementById('releaseBtn').disabled = false;
  }

  function resetMiniQuests() {
    // Sothon
    document.querySelectorAll('input[name="vow"]').forEach(r => r.checked = false);
    document.getElementById('vowStamp').classList.remove('show');
    document.getElementById('vowSign').disabled = true;
    document.getElementById('vowSign').style.display = '';
    // Reset vow choice → show choice screen first
    const vChoice = document.getElementById('vowChoice');
    const vContract = document.getElementById('vowContract');
    if (vChoice) vChoice.hidden = false;
    if (vContract) vContract.hidden = true;
    // Trimurti
    document.getElementById('trimurtiName').value = '';
    document.getElementById('trimurtiName').disabled = false;
    document.getElementById('foldPaper').classList.remove('folded');
    document.getElementById('foldBtn').disabled = true;
    document.getElementById('foldBtn').style.display = '';
    // Brahma
    document.querySelectorAll('.compass-direction').forEach(d => d.classList.remove('lit'));
    game.brahmaOrder = [];
    // Ganesha
    document.getElementById('whisperText').value = '';
    document.getElementById('whisperText').disabled = false;
    document.getElementById('whisperBtn').disabled = true;
    document.getElementById('whisperBtn').style.display = '';
    document.getElementById('whisperSent').classList.remove('show');
    // Lakshmi
    const altar = document.getElementById('altar');
    altar.classList.remove('placed');
    document.getElementById('coinSource').classList.remove('placed');
    game.lakshmiCoinPicked = false;
  }

  // Sothon: pick path (simple bow vs vow) then optionally contract
  document.querySelectorAll('.vow-path-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const path = btn.dataset.vowPath;
      const vChoice = document.getElementById('vowChoice');
      const vContract = document.getElementById('vowContract');
      vChoice.hidden = true;
      if (path === 'vow') {
        vContract.hidden = false;
      } else {
        // Simple bow — just mark as done immediately
        vContract.hidden = true;
        setTimeout(markQuestDone, 400);
      }
    });
  });
  // Sothon: vow contract
  document.querySelectorAll('input[name="vow"]').forEach(r => {
    r.addEventListener('change', () => {
      document.getElementById('vowSign').disabled = false;
    });
  });
  document.getElementById('vowSign').addEventListener('click', () => {
    const stamp = document.getElementById('vowStamp');
    const now = new Date();
    const dateTh = now.toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const dateEn = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    document.getElementById('vowDate').textContent = dateTh;
    document.getElementById('vowDateEn').textContent = dateEn;
    stamp.classList.add('show');
    document.getElementById('vowSign').style.display = 'none';
    setTimeout(markQuestDone, 600);
  });

  // Trimurti: fold paper
  document.getElementById('trimurtiName').addEventListener('input', e => {
    document.getElementById('foldBtn').disabled = e.target.value.trim().length < 1;
  });
  document.getElementById('foldBtn').addEventListener('click', () => {
    document.getElementById('foldPaper').classList.add('folded');
    document.getElementById('trimurtiName').disabled = true;
    document.getElementById('foldBtn').style.display = 'none';
    setTimeout(markQuestDone, 1000);
  });

  // Brahma: 4 directions in clockwise order (E:1 → S:2 → W:3 → N:4)
  document.querySelectorAll('.compass-direction').forEach(d => {
    d.addEventListener('click', () => {
      if (d.classList.contains('lit')) return;
      const order = parseInt(d.dataset.order, 10);
      if (!game.brahmaOrder) game.brahmaOrder = [];
      const expected = game.brahmaOrder.length + 1;
      if (order !== expected) {
        // Wrong order — flash shake on the entire compass
        d.animate(
          [{ transform: 'translate(-50%,-50%) scale(1)' }, { transform: 'translate(-50%,-50%) scale(0.96)' }, { transform: 'translate(-50%,-50%) scale(1)' }],
          { duration: 300 }
        );
        return;
      }
      d.classList.add('lit');
      game.brahmaOrder.push(order);
      if (game.brahmaOrder.length === 4) setTimeout(markQuestDone, 400);
    });
  });

  // Ganesha: whisper to mouse
  document.getElementById('whisperText').addEventListener('input', e => {
    document.getElementById('whisperBtn').disabled = e.target.value.trim().length < 3;
  });
  document.getElementById('whisperBtn').addEventListener('click', () => {
    document.getElementById('whisperBtn').style.display = 'none';
    document.getElementById('whisperText').disabled = true;
    document.getElementById('whisperSent').classList.add('show');
    setTimeout(markQuestDone, 800);
  });

  // Lakshmi: pick coin → place at altar
  const coinSource = document.getElementById('coinSource');
  const altar = document.getElementById('altar');
  coinSource.addEventListener('click', () => {
    game.lakshmiCoinPicked = true;
    coinSource.style.transform = 'translateX(-50%) scale(1.15)';
    document.getElementById('coinInstructions').innerHTML =
      '<span data-th>กดที่แท่นบูชาด้านบน</span><span data-en>Tap the altar above</span>';
    altar.classList.add('over');
  });
  altar.addEventListener('click', () => {
    if (!game.lakshmiCoinPicked || altar.classList.contains('placed')) return;
    altar.classList.remove('over');
    altar.classList.add('placed');
    coinSource.classList.add('placed');
    // Sparkle effect
    const positions = [{x:-40,y:-40},{x:40,y:-30},{x:-30,y:40},{x:30,y:40},{x:0,y:-50}];
    positions.forEach((p, i) => {
      const s = document.createElement('span');
      s.className = 'sparkle';
      s.textContent = '✨';
      s.style.setProperty('--sx', p.x + 'px');
      s.style.setProperty('--sy', p.y + 'px');
      s.style.left = '50%';
      s.style.top = '50%';
      s.style.animationDelay = (i * 0.1) + 's';
      altar.appendChild(s);
      setTimeout(() => s.remove(), 1700);
    });
    document.getElementById('coinInstructions').innerHTML =
      '<span data-th>ทรัพย์กำลังเดินทางมา ✨</span><span data-en>Prosperity is on its way ✨</span>';
    setTimeout(markQuestDone, 1200);
  });

  // ============================================================

  // STEP 5: fortune (ห้องมู — เซียมซีง่ายๆ)
  const MU_FORTUNES = {
    th: [
      'ทุกอย่างกำลังเดินทางมาดูแลคุณ',
      'วันนี้ใจคุณจะเบาขึ้น',
      'สิ่งที่กังวลอยู่ จะไม่ใหญ่อย่างที่คิด',
      'คนที่รักคุณกำลังคิดถึงคุณ',
      'การรอ ไม่ใช่การเสียเวลา',
      'คุณเก่งแล้ว ไม่ต้องเก่งกว่านี้ก็ได้',
      'พรุ่งนี้จะเป็นวันที่ดีกว่า',
      'ใจที่คุณดูแลตัวเอง คือใจที่ใครๆ จะรัก',
    ],
    en: [
      'Everything is on its way to take care of you',
      'Your heart will feel lighter today',
      'What you fear is smaller than it seems',
      'Someone who loves you is thinking of you now',
      'Waiting is not wasted time',
      'You are already enough — no need to be more',
      'Tomorrow will be a kinder day',
      'A heart that takes care of itself is one others love',
    ],
  };

  const fortuneCup = document.getElementById('fortuneCup');
  const fortuneResult = document.getElementById('fortuneResult');
  const fortuneNum = document.getElementById('fortuneNum');
  const fortuneMsg = document.getElementById('fortuneMsg');

  fortuneCup.addEventListener('click', () => {
    if (game.fortuneIdx !== -1) return;
    fortuneCup.classList.add('shake');
    setTimeout(() => {
      fortuneCup.classList.remove('shake');
      const idx = Math.floor(Math.random() * MU_FORTUNES.th.length);
      game.fortuneIdx = idx;
      const lang = body.dataset.lang;
      fortuneNum.textContent = '#' + (idx + 1);
      fortuneMsg.textContent = MU_FORTUNES[lang][idx];
      fortuneResult.classList.add('show');
      // Store for share + bookmark
      const fortuneText = (lang === 'th'
        ? 'เซียมซี #' + (idx + 1) + ' จากห้องมู — ' + MU_FORTUNES.th[idx]
        : 'Fortune #' + (idx + 1) + ' from the Mu room — ' + MU_FORTUNES.en[idx]);
      window._muLastBlessing = fortuneText;
      window._muLastFortuneIdx = idx;
      document.querySelector('[data-step="5"] .step-next').disabled = false;
    }, 700);
  });

  // ============================================================

  window.__onLanguageChange = function(lang) { if (!game.deityKey) return; const data = DEITIES[game.deityKey]; if (!data) return; const name = document.getElementById('deityInfoName'); const power = document.getElementById('deityInfoPower'); const ritual = document.getElementById('ritualText'); const pt = document.getElementById('prayerText'); if (name) name.textContent = data.name[lang]; if (power) power.textContent = data.power[lang]; if (ritual) ritual.textContent = data.ritual[lang]; if (pt) pt.placeholder = data.placeholder[lang]; };
  resetGame();
})();
