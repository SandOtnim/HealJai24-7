(() => {
  if (!document.querySelector('[data-page="community"]')) return;
  const body = document.body;
  // ============ MOVIES — by mood ============
  (function initMovies() {
    const grid = document.getElementById('movieMoodGrid');
    const results = document.getElementById('movieResults');
    if (!grid) return;

    const MOODS = [
      { id: 'comedy',  icon: '😆', label_th: 'อยากหัวเราะ', label_en: 'Need a laugh',
        sub_th: 'comedy เบาๆ',  sub_en: 'easy comedy' },
      { id: 'cry',     icon: '😢', label_th: 'อยากร้องไห้', label_en: 'Want to cry',
        sub_th: 'drama ซึ้งๆ',  sub_en: 'tender drama' },
      { id: 'calm',    icon: '🌿', label_th: 'อยากสงบ',     label_en: 'Want calm',
        sub_th: 'อนิเมะ slice-of-life', sub_en: 'slice-of-life anime' },
      { id: 'thrill',  icon: '🕵', label_th: 'อยากระบาย',   label_en: 'Want distraction',
        sub_th: 'thriller / mystery',   sub_en: 'thriller / mystery' },
      { id: 'romance', icon: '💗', label_th: 'อยากใจฟู',     label_en: 'Want butterflies',
        sub_th: 'romcom',                sub_en: 'romcom' },
      { id: 'cozy',    icon: '🍵', label_th: 'อยากอุ่นๆ',    label_en: 'Want cozy',
        sub_th: 'feel-good',             sub_en: 'feel-good' },
    ];
    const FILMS = {
      comedy: [
        { title: 'Brooklyn Nine-Nine', meta: 'ซีรี่ส์ · 8 ซีซั่น · Netflix',
          why_th: 'ตำรวจตลก ใจดีให้กันทุกตอน ดูปุ๊บใจฟูปั๊บ',
          why_en: 'Goofy cops who actually care — instant mood lift.' },
        { title: 'รันนิ่งแมน (Running Man)', meta: 'รายการเกาหลี · ดูตอนไหนก็ได้',
          why_th: '"รันนิ่งแมนคือรายการแรกที่จะกดดู" — จาก user คนหนึ่ง',
          why_en: '"Running Man is the first thing I open" — quote from one of our respondents.' },
        { title: 'Schitt\'s Creek', meta: 'ซีรี่ส์ · 6 ซีซั่น',
          why_th: 'ครอบครัวงงๆ ที่ค่อยๆ น่ารักขึ้น',
          why_en: 'A clueless family that slowly becomes lovely.' },
      ],
      cry: [
        { title: 'Your Name. (Kimi no Na wa)', meta: 'อนิเมะ · 1 ชม. 47 นาที',
          why_th: 'ร้องไห้แล้วสบายขึ้น',
          why_en: 'Cry, then feel lighter.' },
        { title: 'Inside Out 2', meta: 'แอนิเมชั่น · Pixar',
          why_th: 'เข้าใจอารมณ์ตัวเองโดยไม่รู้ตัว',
          why_en: 'Understand your own emotions without realizing.' },
        { title: 'When Life Gives You Tangerines', meta: 'ซีรี่ส์เกาหลี · Netflix',
          why_th: 'ชีวิตทั้งหนัก ทั้งสวยงาม',
          why_en: 'Heavy and beautiful at once.' },
      ],
      calm: [
        { title: 'Aggretsuko', meta: 'อนิเมะ · 4 ซีซั่น',
          why_th: 'แพนด้าออฟฟิศที่ระเบิดอารมณ์ด้วย metal — relatable',
          why_en: 'Office panda who screams metal — relatable.' },
        { title: 'My Neighbor Totoro', meta: 'Studio Ghibli · 1 ชม. 26 นาที',
          why_th: 'ฟังเสียงลม ดูสายฝน รู้สึกเป็นเด็กอีกครั้ง',
          why_en: 'Listen to wind, watch rain, feel like a child again.' },
        { title: 'Mushishi', meta: 'อนิเมะ slice-of-life',
          why_th: 'ตอนละหนึ่งเรื่อง สงบเหมือนนั่งสมาธิ',
          why_en: 'One story per episode — calming like meditation.' },
      ],
      thrill: [
        { title: 'Knives Out', meta: 'ภาพยนตร์ · 2 ชม. 10 นาที',
          why_th: '"หนังแนวสอบสวน ช่วยให้โฟกัสดีมาก ลืมเวลาไปเลย" — quote จาก survey',
          why_en: '"Detective films help me focus, I lose track of time" — survey quote.' },
        { title: 'Sherlock', meta: 'ซีรี่ส์ BBC · 4 ซีซั่น',
          why_th: 'สมองหมุนตามจนลืมเรื่องของตัวเอง',
          why_en: 'Your brain spins along until you forget your own problems.' },
        { title: 'The Glory', meta: 'ซีรี่ส์เกาหลี · Netflix',
          why_th: 'แค้น เข้มข้น ระบายได้',
          why_en: 'Revenge, intense, cathartic.' },
      ],
      romance: [
        { title: 'Past Lives', meta: 'ภาพยนตร์ · 1 ชม. 46 นาที',
          why_th: 'รักที่ไม่ได้ครอบครอง แต่ยังเป็นรัก',
          why_en: 'Love unfulfilled — still love.' },
        { title: 'About Time', meta: 'ภาพยนตร์ · 2 ชม. 3 นาที',
          why_th: 'ทำให้รักวันธรรมดามากขึ้น',
          why_en: 'Makes you love ordinary days more.' },
        { title: '20th Century Girl', meta: 'ภาพยนตร์เกาหลี · Netflix',
          why_th: 'รักวัยมัธยมที่ทำให้คิดถึง',
          why_en: 'A teen love that makes you miss your own.' },
      ],
      cozy: [
        { title: 'Midnight Diner', meta: 'ซีรี่ส์ญี่ปุ่น · Netflix',
          why_th: 'ร้านอาหารกลางคืน เรื่องเล็กๆ ของคนแปลกหน้า',
          why_en: 'Late-night diner, small stories from strangers.' },
        { title: 'Howl\'s Moving Castle', meta: 'Studio Ghibli',
          why_th: 'บ้านลึกลับ ใจอบอุ่น',
          why_en: 'Mysterious home, warm heart.' },
        { title: 'Heartstopper', meta: 'ซีรี่ส์อังกฤษ · Netflix',
          why_th: 'รักนุ่มๆ ของเด็กนักเรียน',
          why_en: 'Gentle teen love.' },
      ],
    };

    function render() {
      grid.innerHTML = '';
      const lang = body.dataset.lang || 'th';
      MOODS.forEach(m => {
        const card = document.createElement('button');
        card.className = 'movie-mood-card';
        card.dataset.mood = m.id;
        card.innerHTML = `
          <div class="movie-mood-icon">${m.icon}</div>
          <div class="movie-mood-label">${lang === 'th' ? m.label_th : m.label_en}</div>
          <div class="movie-mood-sub">${lang === 'th' ? m.sub_th : m.sub_en}</div>
        `;
        card.addEventListener('click', () => showMood(m.id));
        grid.appendChild(card);
      });
    }

    function showMood(moodId) {
      const films = FILMS[moodId] || [];
      const mood = MOODS.find(m => m.id === moodId);
      const lang = body.dataset.lang || 'th';
      results.hidden = false;
      results.innerHTML = `
        <h4>${mood.icon} ${lang === 'th' ? mood.label_th : mood.label_en}</h4>
        ${films.map(f => `
          <div class="movie-item">
            <div class="movie-item-title">${f.title}</div>
            <div class="movie-item-meta">${f.meta}</div>
            <div class="movie-item-why">${lang === 'th' ? f.why_th : f.why_en}</div>
          </div>
        `).join('')}
      `;
      results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    render();
  })();

  // ============ ARTICLES — basic mental health knowledge ============
  (function initArticles() {
    const list = document.getElementById('articleList');
    if (!list) return;

    const ARTICLES = [
      {
        tag_th: 'อารมณ์ 101', tag_en: 'Emotions 101',
        title_th: 'ทำไมเศร้าโดยไม่มีเหตุผล?',
        title_en: 'Why do I feel sad for no reason?',
        body_th: `<p>ความเศร้า "โดยไม่มีเหตุผล" — จริงๆ แล้วมีเหตุผลเสมอ แค่เหตุผลนั้นอาจไม่ได้อยู่บนผิว</p>
                  <p><strong>สาเหตุที่พบบ่อย:</strong></p>
                  <p>• <strong>นอนน้อย / hormone ผันผวน</strong> — ร่างกายเหนื่อยก็ส่งสัญญาณมาเป็นความรู้สึกเศร้า</p>
                  <p>• <strong>Emotional residue</strong> — เรื่องเล็กๆ ที่สะสมมาทั้งสัปดาห์ ระเบิดออกเป็นเศร้าก้อนเดียว</p>
                  <p>• <strong>Anniversary effect</strong> — ร่างกายจำวันสำคัญในอดีตได้ ก่อนสมองจะรู้ตัว</p>
                  <p><strong>สิ่งที่ทำได้:</strong> ยอมรับว่ามีเศร้าก่อน · ไม่ต้องหาเหตุผลทันที · เขียนสิ่งที่รู้สึก · ถ้าเศร้าเกิน 2 อาทิตย์ติด → ขอความช่วยเหลือผู้เชี่ยวชาญ</p>`,
        body_en: `<p>"Sadness for no reason" — usually has a reason, just not on the surface.</p>
                  <p><strong>Common causes:</strong></p>
                  <p>• <strong>Sleep debt / hormone shifts</strong> — your body's "tired" signal often surfaces as sadness.</p>
                  <p>• <strong>Emotional residue</strong> — small things stacking up all week, releasing as one big sad.</p>
                  <p>• <strong>Anniversary effect</strong> — the body remembers important dates before the mind does.</p>
                  <p><strong>What to do:</strong> Accept the sadness first · don't rush to explain · write what you feel · if it lasts 2+ weeks, see a professional.</p>`,
      },
      {
        tag_th: 'การฝึก', tag_en: 'Practice',
        title_th: 'หายใจ 4-7-8 — สงบใจใน 2 นาที',
        title_en: '4-7-8 Breathing — calm in 2 minutes',
        body_th: `<p>เทคนิคของ Dr. Andrew Weil — ใช้ได้ทันทีตอนตื่นเต้น/วิตกกังวล</p>
                  <p><strong>วิธีทำ:</strong></p>
                  <p>1. หายใจเข้าทางจมูก นับ <strong>4</strong> วินาที</p>
                  <p>2. กลั้นหายใจ นับ <strong>7</strong> วินาที</p>
                  <p>3. หายใจออกทางปาก นับ <strong>8</strong> วินาที (ทำเสียง "ฟู่")</p>
                  <p>4. ทำซ้ำ 4 รอบ</p>
                  <p><strong>ทำไมได้ผล:</strong> การหายใจออกยาวกว่าหายใจเข้า ไปกระตุ้น parasympathetic nervous system ที่ทำให้หัวใจช้าลง</p>`,
        body_en: `<p>Dr. Andrew Weil's technique — works instantly for anxiety/panic.</p>
                  <p><strong>How:</strong></p>
                  <p>1. Inhale through nose for <strong>4</strong> seconds</p>
                  <p>2. Hold for <strong>7</strong> seconds</p>
                  <p>3. Exhale through mouth for <strong>8</strong> seconds (make a "whoosh" sound)</p>
                  <p>4. Repeat 4 times</p>
                  <p><strong>Why it works:</strong> longer exhale activates parasympathetic nervous system → heart slows down.</p>`,
      },
      {
        tag_th: 'มายาคติ', tag_en: 'Myth',
        title_th: '"แค่คิดบวก" ไม่ได้ช่วยทุกอย่าง',
        title_en: '"Just think positive" doesn\'t fix everything',
        body_th: `<p><strong>Toxic positivity</strong> = การบังคับให้รู้สึกดีตลอดเวลา → ทำให้เรา "เก็บกด" อารมณ์จริง</p>
                  <p>การปฏิเสธความรู้สึกลบ (เศร้า โกรธ กลัว) ไม่ทำให้มันหายไป — แต่ทำให้สะสมจนระเบิด</p>
                  <p><strong>แทนที่จะคิดบวก ลอง "คิดอย่างมีเมตตา":</strong></p>
                  <p>• แทน "ฉันต้องเข้มแข็ง" → "ฉันมีสิทธิ์เหนื่อย"</p>
                  <p>• แทน "อย่าคิดมาก" → "อะไรทำให้ฉันคิดมากนะ?"</p>
                  <p>• แทน "ใครๆ ก็เจอ" → "เจอแบบนี้คงไม่ง่ายสำหรับฉันเหมือนกัน"</p>
                  <p>การยอมรับว่าเจ็บ คือก้าวแรกที่ทำให้หายจริงๆ</p>`,
        body_en: `<p><strong>Toxic positivity</strong> = forcing yourself to feel good always → suppresses real emotions.</p>
                  <p>Denying negative feelings doesn't make them disappear — they pile up until they explode.</p>
                  <p><strong>Instead of "positive thinking," try "compassionate thinking":</strong></p>
                  <p>• Instead of "I must be strong" → "I'm allowed to be tired"</p>
                  <p>• Instead of "Stop overthinking" → "What's making me overthink?"</p>
                  <p>• Instead of "Everyone goes through this" → "This probably isn't easy for me either"</p>
                  <p>Acknowledging hurt is the first step to healing.</p>`,
      },
      {
        tag_th: 'ความสัมพันธ์', tag_en: 'Boundaries',
        title_th: 'ขีดเส้นแบ่งใจ (Boundaries) ไม่ใช่การใจร้าย',
        title_en: 'Boundaries are not unkindness',
        body_th: `<p>คนไทยมักโตมากับ "ต้องเกรงใจ" "ห้ามทำให้คนอื่นไม่สบายใจ" — แต่ boundary คือการดูแลใจตัวเอง ไม่ใช่การทำร้ายคนอื่น</p>
                  <p><strong>สัญญาณว่าควรขีดเส้น:</strong></p>
                  <p>• หลังเจอคนนี้แล้วเหนื่อยทุกครั้ง</p>
                  <p>• รู้สึกผิดเวลาบอกว่า "ไม่"</p>
                  <p>• ให้มากกว่าที่ได้รับเป็นเรื่องปกติ</p>
                  <p><strong>ประโยคที่ใช้ได้:</strong></p>
                  <p>• "ตอนนี้ฉันยังไม่พร้อมคุยเรื่องนี้"</p>
                  <p>• "ขอเวลาคิดก่อนนะ"</p>
                  <p>• "ฉันรักคุณ แต่ทำสิ่งนั้นให้ไม่ได้"</p>`,
        body_en: `<p>Thai culture often teaches "เกรงใจ" — never make others uncomfortable. But boundaries protect YOUR heart, they don't hurt others.</p>
                  <p><strong>Signs you need a boundary:</strong></p>
                  <p>• You feel exhausted after every encounter with this person</p>
                  <p>• Saying "no" feels guilt-laden</p>
                  <p>• Giving more than receiving feels normal</p>
                  <p><strong>Useful phrases:</strong></p>
                  <p>• "I'm not ready to talk about this yet"</p>
                  <p>• "Let me think first"</p>
                  <p>• "I love you, but I can't do that"</p>`,
      },
      {
        tag_th: 'เมื่อไหร่หาผู้เชี่ยวชาญ', tag_en: 'When to seek help',
        title_th: 'รู้ได้ยังไงว่าควรไปหาจิตแพทย์?',
        title_en: 'How do I know when to see a therapist?',
        body_th: `<p>การไปหาผู้เชี่ยวชาญ <strong>ไม่ได้แปลว่าเรา "บ้า" หรือ "อ่อนแอ"</strong> — เหมือนไปหาหมอตอนเจ็บหัวเข่า ใจก็เจ็บได้</p>
                  <p><strong>ควรพิจารณาไปหา เมื่อ:</strong></p>
                  <p>• เศร้า / วิตกกังวลติดต่อกัน <strong>มากกว่า 2 อาทิตย์</strong></p>
                  <p>• กระทบการทำงาน / การกิน / การนอน</p>
                  <p>• คิดทำร้ายตัวเอง หรือไม่อยากมีชีวิตอยู่</p>
                  <p>• ใช้แอลกอฮอล์/สิ่งเสพติด มากกว่าเดิม</p>
                  <p>• รู้สึกตัดขาดจากคนรอบข้าง</p>
                  <p><strong>ช่องทางในไทย:</strong></p>
                  <p>• <strong>1323</strong> สายด่วนสุขภาพจิต (24 ชม. ฟรี)</p>
                  <p>• <strong>1667</strong> สะมาริตันส์</p>
                  <p>• ปรึกษานักจิตวิทยาผ่านแอป Ooca, MorDee (~700-1500 บาท/ครั้ง)</p>
                  <p>• รพ.รัฐ มีคลินิกจิตเวช ใช้สิทธิ์บัตรทอง/ประกันสังคมได้</p>`,
        body_en: `<p>Seeing a therapist <strong>doesn't mean you're "crazy" or "weak"</strong> — like seeing a doctor for a sore knee, hearts can hurt too.</p>
                  <p><strong>Consider seeking help when:</strong></p>
                  <p>• Sadness/anxiety lasts <strong>more than 2 weeks</strong></p>
                  <p>• Affects work / eating / sleeping</p>
                  <p>• Thoughts of self-harm or not wanting to live</p>
                  <p>• Increased alcohol/substance use</p>
                  <p>• Feeling disconnected from people around you</p>
                  <p><strong>Channels in Thailand:</strong></p>
                  <p>• <strong>1323</strong> Mental Health Hotline (24/7, free)</p>
                  <p>• <strong>1667</strong> Samaritans</p>
                  <p>• Apps: Ooca, MorDee (~700–1500 THB/session)</p>
                  <p>• Public hospitals have psychiatric clinics covered by Universal/Social Security insurance</p>`,
      },
    ];

    function render() {
      list.innerHTML = '';
      const lang = body.dataset.lang || 'th';
      ARTICLES.forEach((a, i) => {
        const el = document.createElement('div');
        el.className = 'article-item';
        el.innerHTML = `
          <div class="article-tag">${lang === 'th' ? a.tag_th : a.tag_en}</div>
          <div class="article-title">${lang === 'th' ? a.title_th : a.title_en}</div>
          <div class="article-preview">${(lang === 'th' ? a.body_th : a.body_en).replace(/<[^>]+>/g, '').substring(0, 100)}…</div>
          <div class="article-body">${lang === 'th' ? a.body_th : a.body_en}</div>
        `;
        el.addEventListener('click', () => el.classList.toggle('expanded'));
        list.appendChild(el);
      });
    }

    render();
  })();


  // Tab switching for Community room (3 panes)
  document.querySelectorAll('.alone-tab[data-cpane]').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.cpane;
      document.querySelectorAll('.alone-tab[data-cpane]').forEach(t =>
        t.classList.toggle('active', t.dataset.cpane === target));
      document.querySelectorAll('#room-community .alone-pane').forEach(p =>
        p.classList.toggle('active', p.id === 'cpane-' + target));
    });
  });

  // LO-Fi vibe buttons (visual only for now — no bg image swap yet)
  document.querySelectorAll('.vibe-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.vibe-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  });

  // ============================================================
  // LO-Fi work timer — multi-mode (Flow / Pomodoro / Ultradian)
  // ============================================================
  (function initLofiTimer() {
    const lofiDisp   = document.getElementById('lofiTimer');
    const lofiPhase  = document.getElementById('lofiPhase');
    const lofiCycle  = document.getElementById('lofiCycle');
    const startBtn   = document.getElementById('lofiStart');
    const stopBtn    = document.getElementById('lofiStop');
    const modeBtns   = document.querySelectorAll('.timer-mode');

    let timer = null;
    let mode = 'flow';
    let workMin = 0;
    let breakMin = 0;
    let phase = 'idle';   // 'idle' | 'work' | 'break'
    let secondsLeft = 0;
    let secondsElapsed = 0;
    let cycle = 0;

    function fmt(s) {
      const m = Math.floor(s/60).toString().padStart(2,'0');
      const sec = (s%60).toString().padStart(2,'0');
      return m + ':' + sec;
    }
    function setPhaseLabel(p) {
      lofiPhase.classList.remove('work','break');
      const isTH = body.dataset.lang === 'th';
      if (p === 'work') {
        lofiPhase.classList.add('work');
        lofiPhase.innerHTML = isTH
          ? '<span data-th>กำลังโฟกัส…</span><span data-en>Focusing…</span>'
          : '<span data-th>กำลังโฟกัส…</span><span data-en>Focusing…</span>';
      } else if (p === 'break') {
        lofiPhase.classList.add('break');
        lofiPhase.innerHTML = '<span data-th>พักหายใจ ☕</span><span data-en>Take a breather ☕</span>';
      } else {
        lofiPhase.innerHTML = '<span data-th>พร้อมเริ่มแล้ว</span><span data-en>Ready</span>';
      }
    }
    function setCycleText() {
      if (mode === 'flow' || cycle === 0) {
        lofiCycle.textContent = '';
      } else {
        const isTH = body.dataset.lang === 'th';
        lofiCycle.textContent = isTH
          ? `รอบที่ ${cycle}`
          : `Cycle ${cycle}`;
      }
    }
    function reset() {
      if (timer) { clearInterval(timer); timer = null; }
      phase = 'idle';
      secondsLeft = workMin * 60;
      secondsElapsed = 0;
      cycle = 0;
      lofiDisp.textContent = mode === 'flow' ? '00:00' : fmt(secondsLeft);
      setPhaseLabel('idle');
      setCycleText();
    }
    function tick() {
      if (mode === 'flow') {
        secondsElapsed++;
        lofiDisp.textContent = fmt(secondsElapsed);
        return;
      }
      secondsLeft--;
      if (secondsLeft <= 0) {
        // Phase complete → switch
        if (phase === 'work') {
          phase = 'break';
          secondsLeft = breakMin * 60;
          setPhaseLabel('break');
          // soft chime via vibration on mobile
          if (navigator.vibrate) navigator.vibrate([80,40,80]);
        } else {
          // break done → next work cycle
          cycle++;
          phase = 'work';
          secondsLeft = workMin * 60;
          setPhaseLabel('work');
          if (navigator.vibrate) navigator.vibrate(100);
        }
        setCycleText();
      }
      lofiDisp.textContent = fmt(secondsLeft);
    }
    function start() {
      if (timer) return;
      if (mode === 'flow') {
        phase = 'work';
        setPhaseLabel('work');
      } else if (phase === 'idle') {
        cycle = 1;
        phase = 'work';
        secondsLeft = workMin * 60;
        setPhaseLabel('work');
        setCycleText();
        lofiDisp.textContent = fmt(secondsLeft);
      } else {
        // resume
        setPhaseLabel(phase);
      }
      timer = setInterval(tick, 1000);
    }
    function pause() {
      if (timer) { clearInterval(timer); timer = null; }
      if (mode === 'flow' && secondsElapsed > 0) {
        // Stop = reset for flow
        reset();
      }
      // For pomo/ultra, first click = pause; second click = full reset
      else if (phase !== 'idle') {
        reset();
      }
    }

    modeBtns.forEach(b => {
      b.addEventListener('click', () => {
        modeBtns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        mode = b.dataset.mode;
        workMin = parseInt(b.dataset.work, 10);
        breakMin = parseInt(b.dataset.break, 10);
        reset();
      });
    });

    startBtn.addEventListener('click', start);
    stopBtn.addEventListener('click', pause);

    // initial state
    reset();

    // expose for room reset
    window.resetLofi = reset;
  })();

  // ============================================================
  // ห้องชุมชน — LO-Fi vibe bg + Fortune + Quiz
  // ============================================================

  // LO-Fi vibe → swap community bg
  const VIBE_BG = {
    cafe:  'assets/images/community.jpg',
    rain:  'assets/images/lofi-rain.jpg',
    night: 'assets/images/lofi-night.jpg',
  };
  document.querySelectorAll('.vibe-btn').forEach(b => {
    b.addEventListener('click', () => {
      const vibe = b.dataset.vibe;
      const bg = document.getElementById('communityBg');
      if (bg && VIBE_BG[vibe]) bg.style.backgroundImage = 'url("' + VIBE_BG[vibe] + '")';
    });
  });

  // ============ FORTUNE (เซียมซี) ============
  const FORTUNES = {
    love: [
      { num:1, head_th:'ใจรอ ใจได้',  head_en:'Wait, receive', th:'ความรักของคุณกำลังเดินทางมา ใจที่อดทนจะได้รางวัลในเวลาที่ถูกต้อง', en:'Love is on its way. A patient heart is rewarded at the right time.' },
      { num:2, head_th:'ปล่อยก่อน',   head_en:'Release first', th:'สิ่งที่ปล่อยจากใจ จะกลับมาในรูปแบบที่ดีกว่า', en:'What you release returns in a better form.' },
      { num:3, head_th:'ใกล้แล้ว',    head_en:'Coming close', th:'คนที่ใช่อยู่ใกล้กว่าที่คิด ลองเปิดใจอีกหน่อย', en:'The right person is closer than you think. Open up a little more.' },
      { num:4, head_th:'ใส่ใจตัวเอง', head_en:'Care for self', th:'รักตัวเองให้เต็มก่อน — ความรักจะเข้ามาในเวลาที่ใจคุณพร้อม', en:'Love yourself fully first — love comes when your heart is ready.' },
      { num:5, head_th:'อย่าเร่ง',    head_en:"Don't rush",    th:'ไม่ต้องรีบหรือเปรียบเทียบกับใคร ทุกหัวใจมีจังหวะของตัวเอง', en:"No rush, no comparison. Every heart has its own pace." },
    ],
    work: [
      { num:1, head_th:'จังหวะดี',     head_en:'Good timing',  th:'งานกำลังเข้าจังหวะ ตั้งใจทำต่อไป โอกาสจะเปิดเอง', en:'Work is finding rhythm. Keep going — opportunity opens itself.' },
      { num:2, head_th:'พักก่อน',     head_en:'Rest first',   th:'การพักไม่ใช่ความขี้เกียจ ใจที่เหนื่อยทำงานออกมาไม่ดี', en:'Rest is not laziness. A tired heart cannot create well.' },
      { num:3, head_th:'อย่ายอม',     head_en:"Don't settle", th:'อย่ารับงานที่ทำให้ใจหด — มีงานที่ดีกว่ารออยู่', en:'Refuse what shrinks your spirit. Better work is waiting.' },
      { num:4, head_th:'ขอความช่วยเหลือ', head_en:'Ask for help', th:'คุณไม่ต้องทำคนเดียว ถามคนรอบข้าง คำตอบจะเข้ามา', en:'You don\'t have to do it alone. Ask — answers will come.' },
      { num:5, head_th:'เชื่อตัวเอง', head_en:'Trust yourself', th:'ความรู้ที่คุณมี เพียงพอแล้ว เริ่มก่อน ที่เหลือจะตามมา', en:'You already know enough. Start. The rest follows.' },
    ],
    money: [
      { num:1, head_th:'ใช้อย่างรู้คุณค่า',  head_en:'Spend mindfully', th:'เงินจะอยู่กับคนที่เคารพคุณค่าของมัน', en:'Money stays with those who respect its value.' },
      { num:2, head_th:'รอจังหวะ',          head_en:'Wait the moment',  th:'ตอนนี้ยังไม่ใช่จังหวะลงทุนใหญ่ — เก็บไว้ก่อน', en:'Not the moment for big investment. Save first.' },
      { num:3, head_th:'โชคเข้ามา',         head_en:'Luck arriving',    th:'มีโอกาสทางการเงินเข้ามาจากที่ไม่คาดคิด', en:'Unexpected financial opportunity is on the way.' },
      { num:4, head_th:'แบ่งปัน',           head_en:'Share',            th:'ให้บางส่วนคืน จะเปิดทางให้สิ่งที่ใหญ่กว่าเข้ามา', en:'Give a little back — it opens the way to receive more.' },
      { num:5, head_th:'ไม่กังวลเกินไป',    head_en:"Don't worry",      th:'เงินไม่ใช่ทุกอย่าง ดูแลใจดีกว่าดูแลกระเป๋า', en:'Money isn\'t everything. Care for the heart over the wallet.' },
    ],
    health: [
      { num:1, head_th:'ฟังร่างกาย', head_en:'Listen body',   th:'ร่างกายกำลังบอกอะไรอยู่ — หยุดและฟังสักครู่', en:'Your body is telling you something. Pause and listen.' },
      { num:2, head_th:'นอนให้พอ',  head_en:'Rest enough',   th:'ทุกการนอนคือยา ทุกการพักคือการรักตัวเอง', en:'Every sleep is medicine. Every rest is self-love.' },
      { num:3, head_th:'เคลื่อนไหว', head_en:'Move',          th:'ขยับให้เลือดเดิน — เดิน 10 นาทีก็พอเริ่มได้', en:'Get moving. A 10-minute walk is a great start.' },
      { num:4, head_th:'อาหารเรียบง่าย', head_en:'Simple meals', th:'กินสิ่งที่ปรุงเอง — ใจและร่างกายจะขอบคุณ', en:'Eat home-cooked. Your body and heart will thank you.' },
      { num:5, head_th:'ดูแลใจด้วย',head_en:'Heart too',     th:'สุขภาพไม่ใช่แค่ร่างกาย — ใจที่ดีคือพื้นฐาน', en:"Health isn't only physical. A good heart is the foundation." },
    ],
    heart: [
      { num:1, head_th:'ใจกำลังเรียน', head_en:'Heart learns', th:'ใจที่อ่อนแอวันนี้ คือใจที่กำลังเรียนรู้ที่จะแข็งแรง', en:'A weak heart today is one learning to be strong.' },
      { num:2, head_th:'ปล่อยวาง',   head_en:'Let go',         th:'สิ่งที่ปล่อย คือพื้นที่ให้สิ่งใหม่เข้ามา', en:'What you let go makes space for the new.' },
      { num:3, head_th:'ขอบคุณตัวเอง', head_en:'Thank yourself', th:'ขอบคุณที่อยู่กับตัวเองมาถึงวันนี้ ไม่ง่ายเลย', en:'Thank yourself for staying through today. It wasn\'t easy.' },
      { num:4, head_th:'ไม่เหงาคนเดียว', head_en:'Not alone', th:'มีคนคิดถึงคุณอยู่ตอนนี้ แม้คุณไม่รู้', en:'Someone is thinking of you right now, even if you don\'t know.' },
      { num:5, head_th:'ใจดีกับใจ',  head_en:'Be kind to heart', th:'ใจของคุณทำงานหนักมากแล้ววันนี้ — ใจดีกับมันหน่อย', en:'Your heart worked hard today. Be kind to it.' },
    ],
  };

  // ============ TAROT DECK (24 cards face-down → flip on draw) ============
  // 24 visually-distinct symbols + Thai keywords (like real Major Arcana)
  const TAROT_CARDS = [
    { sym:'🌙', name_th:'จันทร์',     name_en:'Moon' },
    { sym:'☀️', name_th:'อาทิตย์',    name_en:'Sun' },
    { sym:'⭐', name_th:'ดาว',         name_en:'Star' },
    { sym:'💫', name_th:'พลังใจ',     name_en:'Spirit' },
    { sym:'🔥', name_th:'ไฟ',          name_en:'Fire' },
    { sym:'💧', name_th:'หยดน้ำ',     name_en:'Drop' },
    { sym:'🌊', name_th:'คลื่น',       name_en:'Wave' },
    { sym:'🌈', name_th:'รุ้ง',        name_en:'Rainbow' },
    { sym:'☁️', name_th:'เมฆ',         name_en:'Cloud' },
    { sym:'⛰️', name_th:'ภูเขา',       name_en:'Mountain' },
    { sym:'🌸', name_th:'ดอกไม้',     name_en:'Blossom' },
    { sym:'🍀', name_th:'โคลเวอร์',   name_en:'Clover' },
    { sym:'🦋', name_th:'ผีเสื้อ',     name_en:'Butterfly' },
    { sym:'🐚', name_th:'หอย',         name_en:'Shell' },
    { sym:'🌿', name_th:'ใบไม้',      name_en:'Leaf' },
    { sym:'🌳', name_th:'ต้นไม้',      name_en:'Tree' },
    { sym:'🌹', name_th:'กุหลาบ',     name_en:'Rose' },
    { sym:'🪷', name_th:'บัว',          name_en:'Lotus' },
    { sym:'🕊️', name_th:'นกพิราบ',     name_en:'Dove' },
    { sym:'🦢', name_th:'หงส์',        name_en:'Swan' },
    { sym:'🦄', name_th:'ยูนิคอร์น',   name_en:'Unicorn' },
    { sym:'❤️', name_th:'หัวใจ',        name_en:'Heart' },
    { sym:'🍇', name_th:'องุ่น',       name_en:'Vine' },
    { sym:'🌻', name_th:'ทานตะวัน',  name_en:'Sunflower' },
  ];
  const tarotDeckEl = document.getElementById('tarotDeck');
  // เมื่อข้อมูลหลังบ้านมาถึง → สร้างสำรับใหม่ (ถ้ายังไม่ได้จั่ว)
  document.addEventListener('healsheet:ready', () => {
    if (!tarotDrawn && tarotDeckEl) buildTarotDeck();
  });
  let fortuneTopic = null;
  let tarotDrawn = false;
  // Shuffle the deck so the order is random each time but every card stays unique
  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildTarotDeck() {
    tarotDeckEl.innerHTML = '';
    // ใช้ไพ่จาก Google Sheet (หลังบ้าน) ถ้ามี — ไม่มีก็ใช้ชุดในโค้ด
    const SHEET_TAROT = (window.HealSheet && window.HealSheet.tarot) || TAROT_CARDS;
    const order = shuffled(SHEET_TAROT);
    for (let i = 0; i < order.length; i++) {
      const c = order[i];
      const card = document.createElement('div');
      card.className = 'tarot-card';
      card.dataset.idx = i;
      const visual = c.image
        ? `<img class="tf-img" src="assets/images/tarot/${c.image}" alt="${c.name_th}" loading="lazy">`
        : `<div class="tf-symbol">${c.sym}</div>`;
      card.innerHTML = `
        <div class="tarot-back"></div>
        <div class="tarot-face">
          ${visual}
          <div class="tf-name"><span data-th>${c.name_th}</span><span data-en>${c.name_en}</span></div>
          <div class="tf-num">${(i+1).toString().padStart(2,'0')}</div>
        </div>
      `;
      card.addEventListener('click', () => drawCard(card));
      tarotDeckEl.appendChild(card);
    }
    // re-apply current language visibility for newly built cards
    const lang = body.dataset.lang || 'th';
    tarotDeckEl.querySelectorAll('[data-th]').forEach(s => s.style.display = lang === 'th' ? '' : 'none');
    tarotDeckEl.querySelectorAll('[data-en]').forEach(s => s.style.display = lang === 'en' ? '' : 'none');
  }
  function drawCard(card) {
    if (!fortuneTopic || tarotDrawn) return;
    tarotDrawn = true;
    // pick a random fortune from the topic list (Google Sheet override ถ้ามี)
    const SHEET_F = (window.HealSheet && window.HealSheet.cafe) || {};
    const list = SHEET_F[fortuneTopic] || FORTUNES[fortuneTopic];
    const f = list[Math.floor(Math.random() * list.length)];
    // flip this card
    card.classList.add('flipped');
    // fade the others
    document.querySelectorAll('.tarot-card').forEach(c => {
      if (c !== card) c.classList.add('faded');
    });
    // reveal result after flip
    setTimeout(() => {
      document.getElementById('fortuneNumRoom').textContent = '#' + f.num;
      document.getElementById('fortuneHeadline').innerHTML =
        '<span data-th>' + f.head_th + '</span><span data-en>' + f.head_en + '</span>';
      document.getElementById('fortuneMsgRoom').innerHTML =
        '<span data-th>' + f.th + '</span><span data-en>' + f.en + '</span>';
      document.getElementById('fortuneResultRoom').classList.add('show');
      // Save for share button
      window._fortuneLastText = '✦ ' + f.head_th + '\n' + f.th;
    }, 650);
  }
  function resetFortune() {
    fortuneTopic = null;
    tarotDrawn = false;
    document.querySelectorAll('.fortune-topic').forEach(b => b.classList.remove('active'));
    const fr = document.getElementById('fortuneResultRoom');
    if (fr) fr.classList.remove('show');
    if (tarotDeckEl) tarotDeckEl.classList.add('disabled');
    const fi = document.getElementById('fortuneInstr');
    if (fi) fi.innerHTML = '<span data-th>เลือกหัวข้อก่อน แล้วหยิบไพ่ใบที่ใช่</span><span data-en>Pick a topic first, then choose your card</span>';
    // re-shuffle (rebuild) the deck so it feels fresh each time
    buildTarotDeck();
  }
  document.querySelectorAll('.fortune-topic').forEach(b => {
    b.addEventListener('click', () => {
      // if already drawn, treat new topic as a fresh reading
      if (tarotDrawn) {
        document.getElementById('fortuneResultRoom').classList.remove('show');
        tarotDrawn = false;
        buildTarotDeck();
      }
      document.querySelectorAll('.fortune-topic').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      fortuneTopic = b.dataset.topic;
      tarotDeckEl.classList.remove('disabled');
      document.getElementById('fortuneInstr').innerHTML =
        '<span data-th>หยิบไพ่ใบที่ใจคุณเรียก ✦</span><span data-en>Pick the card your heart calls ✦</span>';
    });
  });

  document.getElementById('fortuneAgain').addEventListener('click', () => {
    document.getElementById('fortuneResultRoom').classList.remove('show');
    tarotDrawn = false;
    buildTarotDeck();
    // keep topic active — user can draw again immediately
    if (fortuneTopic) tarotDeckEl.classList.remove('disabled');
    document.getElementById('fortuneInstr').innerHTML =
      '<span data-th>หยิบไพ่ใบที่ใจคุณเรียก ✦</span><span data-en>Pick the card your heart calls ✦</span>';
  });

  // initial build
  buildTarotDeck();

  // ============ QUIZ (ใจคุณเป็นแบบไหน) ============
  const ARCHETYPES = {
    tender:    { icon: '🌸', title_th:'ใจอ่อนโยน',   title_en:'Tender heart',
                 desc_th:'คุณรับรู้ความรู้สึกของคนรอบข้างได้ดี ความอ่อนโยนคือพลัง ไม่ใช่จุดอ่อน — ดูแลใจตัวเองให้เหมือนที่คุณดูแลคนอื่น',
                 desc_en:'You sense others deeply. Tenderness is power, not weakness — care for yourself the way you care for others.' },
    brave:     { icon: '🔥', title_th:'ใจกล้าแกร่ง', title_en:'Brave heart',
                 desc_th:'คุณมีพลังและความตั้งใจสูง พร้อมเดินหน้าต่อแม้เจอปัญหา — แต่อย่าลืมว่าการพักก็คือชัยชนะ',
                 desc_en:'You carry fire and resolve — but remember that rest is also a victory.' },
    deep:      { icon: '🌊', title_th:'ใจที่ลึกซึ้ง', title_en:'Deep heart',
                 desc_th:'คุณมองทุกอย่างลึกกว่าผิว ใช้เวลาทำความเข้าใจตัวเองและโลก — โลกต้องการคนที่คิดแบบคุณ',
                 desc_en:'You see beyond the surface. The world needs minds that think like yours.' },
    wandering: { icon: '☁️', title_th:'ใจพเนจร',     title_en:'Wandering heart',
                 desc_th:'คุณรักการสำรวจ ไม่กลัวความเปลี่ยนแปลง พร้อมพบสิ่งใหม่ๆ — ความไม่แน่นอนคือบ้านของคุณ',
                 desc_en:"You love exploration, unafraid of change. Uncertainty is your home." },
  };

  const QUIZ_QUESTIONS = [
    {
      th: 'เวลาเหนื่อยใจ คุณอยากทำอะไรก่อน?',
      en: 'When your heart is tired, what do you want to do first?',
      choices: [
        { th:'คุยกับเพื่อน',    en:'Talk to a friend',     icon:'💬', a:'tender' },
        { th:'ออกไปเที่ยวให้หาย', en:'Travel it out',        icon:'✈️', a:'wandering' },
        { th:'คิดทบทวนเงียบๆ',  en:'Reflect quietly',       icon:'🤔', a:'deep' },
        { th:'ลุยทำต่อ ฮึดสู้',  en:'Push on, fight',        icon:'💪', a:'brave' },
      ],
    },
    {
      th: 'เพลงที่เหมาะกับใจคุณตอนนี้?',
      en: "What music fits your heart right now?",
      choices: [
        { th:'เพลงเศร้านุ่ม',           en:'Soft sad song',         icon:'🎵', a:'tender' },
        { th:'เพลงเร็วฮึกเหิม',         en:'Fast pumped-up song',   icon:'🎸', a:'brave' },
        { th:'Instrumental ลึกๆ',       en:'Deep instrumental',     icon:'🎻', a:'deep' },
        { th:'เพลงใหม่ที่ไม่เคยฟัง',    en:'A song you\'ve never heard', icon:'🎧', a:'wandering' },
      ],
    },
    {
      th: 'วันที่ดีที่สุดคือ...',
      en: 'The best day is...',
      choices: [
        { th:'ได้กอดคนสำคัญ',          en:'Hugging someone you love', icon:'🤗', a:'tender' },
        { th:'ได้พิชิตความท้าทาย',     en:'Conquering a challenge',    icon:'🏔', a:'brave' },
        { th:'ได้คิดอะไรลึกๆ',         en:'Thinking deeply',           icon:'📚', a:'deep' },
        { th:'ได้ไปที่ที่ไม่เคยไป',     en:'Going somewhere new',       icon:'🗺',  a:'wandering' },
      ],
    },
    {
      th: 'ถ้าเลือกได้ อยากเป็น...',
      en: 'If you could be...',
      choices: [
        { th:'ดอกไม้ที่ใครเดินผ่านก็ยิ้ม', en:'A flower that makes people smile', icon:'🌸', a:'tender' },
        { th:'ภูเขาที่มั่นคง',            en:'A steadfast mountain',              icon:'⛰',  a:'brave' },
        { th:'ทะเลที่ลึก',                en:'A deep ocean',                       icon:'🌊', a:'deep' },
        { th:'เมฆที่ลอยไปทุกที่',         en:'A cloud that drifts everywhere',     icon:'☁️', a:'wandering' },
      ],
    },
    {
      th: 'ตอนนี้คุณต้องการ...',
      en: 'Right now you need...',
      choices: [
        { th:'คนที่ฟังคุณจริงๆ',     en:'Someone who really listens', icon:'👂', a:'tender' },
        { th:'ความท้าทายใหม่',       en:'A new challenge',             icon:'⚡', a:'brave' },
        { th:'เวลาคิดคนเดียว',       en:'Time alone to think',         icon:'🕯', a:'deep' },
        { th:'การเปลี่ยนแปลง',       en:'Change',                       icon:'🔄', a:'wandering' },
      ],
    },
  ];

  const quizState = { idx: 0, scores: { tender:0, brave:0, deep:0, wandering:0 } };

  function showQuizScreen(id) {
    document.querySelectorAll('#cpane-quiz .quiz-screen').forEach(s =>
      s.classList.toggle('active', s.id === id));
  }

  function renderQuizQuestion() {
    const q = QUIZ_QUESTIONS[quizState.idx];
    document.getElementById('quizQText').innerHTML =
      '<span data-th>' + q.th + '</span><span data-en>' + q.en + '</span>';
    const cont = document.getElementById('quizChoices');
    cont.innerHTML = q.choices.map(c =>
      '<button class="quiz-choice" data-archetype="' + c.a + '">' +
      '<span class="choice-icon">' + c.icon + '</span>' +
      '<span data-th>' + c.th + '</span><span data-en>' + c.en + '</span>' +
      '</button>'
    ).join('');
    cont.querySelectorAll('.quiz-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        quizState.scores[btn.dataset.archetype]++;
        quizState.idx++;
        if (quizState.idx >= QUIZ_QUESTIONS.length) showQuizResult();
        else { renderQuizQuestion(); updateQuizProgress(); }
      });
    });
  }

  function updateQuizProgress() {
    const pct = (quizState.idx / QUIZ_QUESTIONS.length) * 100;
    document.getElementById('quizProgressFill').style.width = pct + '%';
    document.getElementById('quizProgressText').textContent =
      (quizState.idx + 1) + ' / ' + QUIZ_QUESTIONS.length;
  }

  function showQuizResult() {
    let winner = 'tender', max = 0;
    Object.keys(quizState.scores).forEach(k => {
      if (quizState.scores[k] > max) { max = quizState.scores[k]; winner = k; }
    });
    const arc = ARCHETYPES[winner];
    document.getElementById('quizResultIcon').textContent = arc.icon;
    document.getElementById('quizResultTitle').innerHTML =
      '<span data-th>' + arc.title_th + '</span><span data-en>' + arc.title_en + '</span>';
    document.getElementById('quizResultDesc').innerHTML =
      '<span data-th>' + arc.desc_th + '</span><span data-en>' + arc.desc_en + '</span>';
    showQuizScreen('quizResult');
  }

  function resetQuiz() {
    quizState.idx = 0;
    quizState.scores = { tender:0, brave:0, deep:0, wandering:0 };
    document.getElementById('quizProgressFill').style.width = '0%';
    document.getElementById('quizProgressText').textContent = '1 / ' + QUIZ_QUESTIONS.length;
    showQuizScreen('quizIntro');
  }

  document.getElementById('quizStart').addEventListener('click', () => {
    renderQuizQuestion();
    updateQuizProgress();
    showQuizScreen('quizQuestions');
  });
  document.getElementById('quizRetry').addEventListener('click', resetQuiz);


  if (typeof resetQuiz === 'function') resetQuiz(); if (typeof resetFortune === 'function') resetFortune();
})();
