(() => {
  if (!document.querySelector('[data-page="island"]')) return;
  const body = document.body;
  // ============================================================
  // เกาะแห่งเวลา (Memento mori) — reflection prompts
  // ============================================================
  (function initMemento() {
    const promptEl    = document.getElementById('mementoPrompt');
    const textareaEl  = document.getElementById('mementoAnswer');
    const cardEl      = document.getElementById('mementoCard');
    const takeawayEl  = document.getElementById('mementoTakeaway');
    const quoteEl     = document.getElementById('takeawayQuote');
    if (!promptEl) return;

    const PROMPTS = [
      { th: 'ถ้าวันนี้คือวันสุดท้าย — สิ่งหนึ่งที่คุณจะรีบทำคืออะไร?',
        en: 'If today were your last day, what is the one thing you would rush to do?' },
      { th: 'มีคำพูดอะไรที่คุณอยากบอกใครสักคน แต่ยังไม่ได้บอก?',
        en: 'What words do you wish to tell someone, but haven\'t yet?' },
      { th: 'ความเสียใจหนึ่งอย่างที่อยากปล่อยลง คืออะไร?',
        en: 'What is one regret you wish to release?' },
      { th: 'ถ้ามีเวลาเหลือเพียง 1 ปี คุณจะทำต่างไปยังไง?',
        en: 'If you had only one year left, what would you do differently?' },
      { th: 'สิ่งเล็กๆ ที่คุณ "ลืมขอบคุณ" บ่อยๆ คืออะไร?',
        en: 'What small thing do you often forget to feel grateful for?' },
      { th: 'ถ้าวันนี้เป็นภาพถ่าย คุณอยากให้มีอะไรอยู่ในภาพนั้น?',
        en: 'If today were a photograph, what would you want in the frame?' },
      { th: 'ใครที่คุณคิดถึงตอนนี้? ลองส่งใจไปหาเขาดู',
        en: 'Who are you thinking of right now? Try sending your heart to them.' },
      { th: 'ถ้าตัวคุณในอีก 10 ปีอยากบอกอะไรกับคุณวันนี้?',
        en: 'What would you-in-10-years want to tell you-today?' },
      { th: 'อะไรที่คุณกลัวจะไม่ได้ทำทันก่อนหมดเวลา?',
        en: 'What do you fear running out of time to do?' },
      { th: 'คนที่จากไปแล้ว — เขาน่าจะภูมิใจกับอะไรในตัวคุณวันนี้?',
        en: 'Someone who has passed — what about you today would make them proud?' },
    ];
    const TAKEAWAYS = [
      { th: 'เวลาที่มีอยู่ คือของขวัญที่ไม่มีใครรับประกันให้พรุ่งนี้',
        en: 'The time you have is a gift not promised to tomorrow.' },
      { th: 'ความตายไม่ได้มีไว้ให้กลัว — มีไว้ให้รักวันนี้ให้มากขึ้น',
        en: 'Mortality isn\'t for fearing — it\'s for loving today more deeply.' },
      { th: 'ทุกการพักหายใจ คือโอกาสที่จะเลือกใหม่',
        en: 'Every breath is a chance to choose again.' },
      { th: 'สิ่งที่สำคัญที่สุด อาจอยู่ตรงข้างหน้าคุณตอนนี้แล้ว',
        en: 'What matters most may already be right in front of you.' },
      { th: 'ความเงียบในเกาะนี้ — ขอให้พกกลับไปบ้านด้วย',
        en: 'The quiet of this island — carry it home with you.' },
      { th: 'จุดเทียนเล็กๆ ในใจไว้สักดวง แล้วเดินต่อ อย่างเบามือกับตัวเอง',
        en: 'Light a small candle inside, then walk on — gently, with yourself.' },
      { th: 'เธอไม่จำเป็นต้องตอบคำถามวันนี้ให้ครบ — แค่ได้หยุดคิด ก็พอแล้ว',
        en: 'You don\'t have to answer everything today — pausing is already enough.' },
    ];

    let lastPromptIdx = -1;
    let lastTakeawayIdx = -1;
    function pickRandom(arr, exclude) {
      let i;
      do { i = Math.floor(Math.random() * arr.length); }
      while (arr.length > 1 && i === exclude);
      return i;
    }
    function setLangContent(el, th, en) {
      el.innerHTML = '<span data-th>' + th + '</span><span data-en>' + en + '</span>';
      const lang = body.dataset.lang || 'th';
      el.querySelectorAll('[data-th]').forEach(s => s.style.display = lang === 'th' ? '' : 'none');
      el.querySelectorAll('[data-en]').forEach(s => s.style.display = lang === 'en' ? '' : 'none');
    }
    function newPrompt() {
      lastPromptIdx = pickRandom(PROMPTS, lastPromptIdx);
      const p = PROMPTS[lastPromptIdx];
      setLangContent(promptEl, p.th, p.en);
      textareaEl.value = '';
    }
    function showTakeaway() {
      lastTakeawayIdx = pickRandom(TAKEAWAYS, lastTakeawayIdx);
      const t = TAKEAWAYS[lastTakeawayIdx];
      setLangContent(quoteEl, t.th, t.en);
      cardEl.style.display = 'none';
      takeawayEl.classList.add('show');
    }
    function reset() {
      cardEl.style.display = '';
      takeawayEl.classList.remove('show');
      newPrompt();
    }
    document.getElementById('mementoNew').addEventListener('click', newPrompt);
    document.getElementById('mementoSave').addEventListener('click', showTakeaway);
    document.getElementById('mementoAgain').addEventListener('click', reset);

    // Initial prompt
    newPrompt();

    // Expose for room reset
    window.resetMemento = reset;
  })();


  const islandBgVideo = document.getElementById('islandBgVideo'); if (islandBgVideo) { islandBgVideo.load(); islandBgVideo.play().catch(() => {}); } if (typeof window.resetMemento === 'function') window.resetMemento();
})();
