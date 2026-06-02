/* ============================================================
   Seamless in-site navigation  —  PROOF OF CONCEPT
   Scope (for now): index.html  <->  museum.html

   Why: each room is a separate HTML page, so a normal click reloads
   the whole page and the background music restarts. This swaps only
   the page content (keeping the header + <audio> alive) so music
   plays continuously with no gap.

   Progressive enhancement: if anything is unsupported or off-scope,
   we fall back to a normal full page load. Nothing breaks.
   ============================================================ */
(() => {
  if (!window.fetch || !window.history.pushState || !window.DOMParser) return;

  // Pages wired for seamless navigation. Anything not listed loads normally.
  const ENABLED = new Set([
    'index.html', 'museum.html', 'sacred.html', 'travel.html',
    'alone.html', 'community.html', 'island.html',
  ]);
  // Live nodes kept across a swap (never destroyed → music never restarts).
  const PERSIST = ['header', '#bgMusic', '#bookmarkModal'];
  const PAGE_SCRIPTS = ['home.js', 'museum.js', 'sacred.js', 'travel.js', 'alone.js', 'community.js', 'island.js'];

  function fileOf(href) {
    try {
      const u = new URL(href, location.href);
      if (u.origin !== location.origin) return null;
      return (u.pathname.split('/').pop() || 'index.html');
    } catch (e) { return null; }
  }

  // Re-run only the page-specific script (NOT common.js / nav.js — those persist).
  function runPageScript(doc) {
    const srcs = [...doc.querySelectorAll('script[src]')].map(s => s.getAttribute('src'));
    const pageSrc = srcs.find(s => s && !s.includes('common.js') && !s.includes('nav.js')
      && PAGE_SCRIPTS.some(p => s.endsWith(p)));
    if (!pageSrc) return;
    const s = document.createElement('script');
    s.src = pageSrc + (pageSrc.includes('?') ? '&' : '?') + '_n=' + Date.now();
    document.body.appendChild(s);
  }

  let navigating = false;
  async function navigate(href, push) {
    const file = fileOf(href);
    if (!file || !ENABLED.has(file)) { window.location.href = href; return; }
    if (navigating) return;
    navigating = true;

    let html;
    try { const r = await fetch(href); html = await r.text(); }
    catch (e) { window.location.href = href; return; }

    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Grab the live nodes BEFORE swapping. A detached <audio> keeps playing,
    // so holding this reference is what makes the music gapless.
    const live = {};
    PERSIST.forEach(sel => { live[sel] = document.querySelector(sel); });

    document.body.innerHTML = doc.body.innerHTML;
    [...doc.body.attributes].forEach(a => document.body.setAttribute(a.name, a.value));

    // Put the live (already-bound, still-playing) nodes back in place of the
    // fresh page's placeholders.
    PERSIST.forEach(sel => {
      const node = live[sel];
      const ph = document.querySelector(sel);
      if (node && ph && ph !== node) ph.replaceWith(node);
    });

    document.title = doc.title || document.title;
    if (push) history.pushState({ healNav: 1 }, '', href);
    window.scrollTo(0, 0);
    if (window.syncPlaceholders) { try { window.syncPlaceholders(); } catch (e) {} }
    runPageScript(doc);
    navigating = false;
  }

  // Let home.js (and others) route through us instead of location.href
  window.__healNav = (href) => navigate(href, true);

  // Catch plain links (e.g. a room's "back to map") that nothing else handles.
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href || href[0] === '#' || /^(https?:|mailto:|tel:)/.test(href)) return;
    const file = fileOf(href);
    if (!file || !ENABLED.has(file)) return;   // off-scope → normal browser load
    e.preventDefault();
    navigate(href, true);
  });

  window.addEventListener('popstate', () => navigate(location.href, false));
})();
