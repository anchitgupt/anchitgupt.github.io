/* ═══════════════════════════════════════════════════════════════
   ANCHIT GUPTA — OPERATOR CONSOLE
   Boot · live DAG · scramble · palette · terminal · motion
   ═══════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const EMAIL = 'anchitgupt2012@gmail.com';
  const RESUME = 'files/Anchit_Gupta_SCE.pdf';

  /* ── THEME ───────────────────────────────────────────────── */
  const root = document.documentElement;

  const setTheme = t => {
    root.setAttribute('data-theme', t);
    $('#themeToggle')?.setAttribute('aria-label', `Switch to ${t === 'dark' ? 'light' : 'dark'} theme`);
    try { localStorage.setItem('theme', t); } catch (e) { /* private mode */ }
  };

  const toggleTheme = () =>
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');

  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  } catch (e) { /* ignore */ }

  setTheme(root.getAttribute('data-theme') || 'dark');
  $('#themeToggle')?.addEventListener('click', toggleTheme);

  /* ── BOOT SEQUENCE ───────────────────────────────────────── */
  const boot = $('#boot');
  const bootLog = $('#bootLog');
  const bootBar = $('#bootBar');
  let booted = false;

  const BOOT_LINES = [
    'mounting <b>/dev/anchit</b> …',
    'delta lake <b>bronze → silver → gold</b>',
    'mlflow registry <b>online</b> · 3 models staged',
    'rag index <b>warm</b> · retriever ready',
    'all systems <b>nominal</b>'
  ];

  function endBoot() {
    if (booted) return;
    booted = true;
    boot?.classList.add('done');
    document.body.classList.remove('locked');
    setTimeout(() => boot?.remove(), 600);
    startHero();
  }

  function runBoot() {
    let seen = false;
    try { seen = sessionStorage.getItem('booted') === '1'; } catch (e) { /* ignore */ }

    if (seen || reduced || !boot) { endBoot(); return; }

    try { sessionStorage.setItem('booted', '1'); } catch (e) { /* ignore */ }
    boot.classList.add('active');
    document.body.classList.add('locked');

    let i = 0;
    const step = () => {
      if (booted) return;
      if (i < BOOT_LINES.length) {
        bootLog.insertAdjacentHTML('beforeend', `<div>› ${BOOT_LINES[i]}</div>`);
        i++;
        if (bootBar) bootBar.style.width = (i / BOOT_LINES.length) * 100 + '%';
        setTimeout(step, 190);
      } else {
        setTimeout(endBoot, 260);
      }
    };
    setTimeout(step, 120);

    addEventListener('keydown', endBoot, { once: true });
    boot.addEventListener('click', endBoot, { once: true });
    setTimeout(endBoot, 4000); // hard failsafe
  }

  /* ── REVEAL ON SCROLL ────────────────────────────────────── */
  const revealIO = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  function startHero() {
    $$('.hero .reveal').forEach(el => el.classList.add('in'));
    $$('.reveal:not(.in)').forEach(el => revealIO.observe(el));
    startDag();
  }

  /* ── TEXT SCRAMBLE ───────────────────────────────────────── */
  const GLYPHS = '▚▞░▒█/\\|<>_-=+*#%$&@01';

  function scrambleTo(el, text, dur = 750) {
    if (reduced) { el.textContent = text; return Promise.resolve(); }
    const from = el.textContent;
    const len = Math.max(from.length, text.length);
    const queue = [];
    for (let i = 0; i < len; i++) {
      queue.push({
        a: from[i] || '',
        b: text[i] || '',
        s: Math.floor(Math.random() * 22),
        e: Math.floor(Math.random() * 22) + 14
      });
    }
    return new Promise(res => {
      let frame = 0;
      const tick = () => {
        let out = '', done = 0;
        for (const q of queue) {
          if (frame >= q.e) { done++; out += q.b; }
          else if (frame >= q.s) {
            if (!q.c || Math.random() < 0.3) q.c = GLYPHS[(Math.random() * GLYPHS.length) | 0];
            out += q.c;
          } else out += q.a;
        }
        el.textContent = out;
        if (done === queue.length) { res(); return; }
        frame++;
        requestAnimationFrame(tick);
      };
      tick();
    });
  }

  // Section titles scramble once on entry
  const titleIO = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      scrambleTo(e.target, e.target.textContent);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.6 });
  $$('[data-scramble]').forEach(el => titleIO.observe(el));

  // Hero role cycles
  const role = $('#roleScramble');
  if (role) {
    const words = role.dataset.words.split('|');
    let idx = 0;
    const cycle = async () => {
      idx = (idx + 1) % words.length;
      await scrambleTo(role, words[idx]);
      setTimeout(cycle, 3200);
    };
    if (!reduced) setTimeout(cycle, 3200);
  }

  /* ── COUNT-UP + METERS ───────────────────────────────────── */
  function countUp(el) {
    const to = parseFloat(el.dataset.to);
    const suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = to + suffix; return; }
    const dur = 1300, t0 = performance.now();
    const tick = now => {
      const p = clamp((now - t0) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const numIO = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countUp(e.target);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  const postCount = $$('#postGrid .post').length;
  const statPosts = $('#statPosts');
  if (statPosts && postCount) statPosts.dataset.to = String(postCount);

  $$('.num').forEach(el => numIO.observe(el));

  const meterIO = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const pct = el.dataset.level || el.dataset.value;
      const fill = $('.bar b', el) || $('.meter i', el);
      if (fill) setTimeout(() => { fill.style.width = pct + '%'; }, 120);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  $$('.stack-list li, .metric').forEach(el => meterIO.observe(el));

  /* ── LIVE DAG ────────────────────────────────────────────── */
  const NW = 62, NH = 24;
  const NODES = [
    { id: 'kafka',    x: 46,  y: 58,  label: 'kafka' },
    { id: 's3',       x: 46,  y: 150, label: 's3.raw' },
    { id: 'postgres', x: 46,  y: 242, label: 'postgres' },
    { id: 'ingest',   x: 140, y: 150, label: 'ingest' },
    { id: 'bronze',   x: 232, y: 150, label: 'bronze', tone: 'bronze' },
    { id: 'silver',   x: 322, y: 150, label: 'silver', tone: 'silver' },
    { id: 'gold',     x: 412, y: 150, label: 'gold',   tone: 'gold' },
    { id: 'mlops',    x: 506, y: 62,  label: 'mlops',  tone: 'mlops' },
    { id: 'bi',       x: 506, y: 150, label: 'bi.serve' },
    { id: 'rag',      x: 506, y: 238, label: 'rag.index', tone: 'ai' }
  ];
  const EDGES = [
    ['kafka', 'ingest'], ['s3', 'ingest'], ['postgres', 'ingest'],
    ['ingest', 'bronze'], ['bronze', 'silver'], ['silver', 'gold'],
    ['gold', 'mlops'], ['gold', 'bi'], ['gold', 'rag']
  ];
  const WAVES = [
    ['kafka', 's3', 'postgres'],
    ['ingest'], ['bronze'], ['silver'], ['gold'],
    ['mlops', 'bi', 'rag']
  ];

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, attrs) => {
    const el = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  };

  const byId = id => NODES.find(n => n.id === id);
  const edgeKey = (a, b) => a + '>' + b;

  function edgePath(a, b) {
    const x1 = a.x + NW / 2, y1 = a.y, x2 = b.x - NW / 2, y2 = b.y;
    const dx = (x2 - x1) * 0.55;
    return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
  }

  const dagEl = $('#dag');
  const dagLog = $('#dagLog');
  const dagBadge = $('#dagBadge');
  const paths = {}, nodeEls = {};
  let dagTimer = null, dagVisible = false, dagBuilt = false;

  const TONES = { bronze: '--bronze', silver: '--silver', gold: '--gold',
                  mlops: '--c-mlops', ai: '--c-ai' };

  const SVG_CSS = `
    .dg-edge{fill:none;stroke:var(--line-2);stroke-width:1;
      transition:stroke .35s ease,stroke-width .35s ease}
    .dg-edge.hot{stroke:var(--tone,var(--signal));stroke-width:1.4}
    .dg-node rect.bx{fill:var(--surface);stroke:var(--line-2);stroke-width:1;
      transition:stroke .3s ease,fill .3s ease}
    .dg-node text{font-family:var(--f-mono);font-size:8.5px;letter-spacing:.05em;
      fill:var(--dim);transition:fill .3s ease}
    .dg-node.on rect.bx{stroke:var(--tone,var(--signal));
      fill:color-mix(in srgb, var(--tone,var(--signal)) 14%, transparent)}
    .dg-node.on text{fill:var(--tone,var(--signal))}
    .dg-halo{fill:none;stroke:var(--tone,var(--signal));stroke-width:1;opacity:0;
      transform-box:fill-box;transform-origin:center}
    .dg-node.on .dg-halo{animation:dgHalo .9s ease-out}
    @keyframes dgHalo{from{opacity:.65;transform:scale(1)}to{opacity:0;transform:scale(1.22)}}
    .dg-pkt{fill:var(--tone,var(--signal))}
    .dg-pkt-glow{fill:var(--tone,var(--signal));opacity:.22}
    @media (prefers-reduced-motion: reduce){.dg-node.on .dg-halo{animation:none}}
  `;

  function buildDag() {
    if (!dagEl || dagBuilt) return;
    dagBuilt = true;
    dagEl.setAttribute('viewBox', '0 0 560 300');
    dagEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    const style = document.createElementNS(SVG_NS, 'style');
    style.textContent = SVG_CSS;
    dagEl.appendChild(style);

    const gEdges = mk('g', {}), gNodes = mk('g', {}), gPkts = mk('g', {});

    EDGES.forEach(([a, b]) => {
      const p = mk('path', { class: 'dg-edge', d: edgePath(byId(a), byId(b)) });
      gEdges.appendChild(p);
      paths[edgeKey(a, b)] = p;
    });

    NODES.forEach(n => {
      const g = mk('g', { class: 'dg-node' });
      if (n.tone) g.style.setProperty('--tone', `var(${TONES[n.tone]})`);
      g.appendChild(mk('rect', {
        class: 'dg-halo', x: n.x - NW / 2 - 3, y: n.y - NH / 2 - 3,
        width: NW + 6, height: NH + 6, rx: 7
      }));
      g.appendChild(mk('rect', {
        class: 'bx', x: n.x - NW / 2, y: n.y - NH / 2,
        width: NW, height: NH, rx: 5
      }));
      const t = mk('text', {
        x: n.x, y: n.y, 'text-anchor': 'middle', 'dominant-baseline': 'central'
      });
      t.textContent = n.label;
      g.appendChild(t);
      gNodes.appendChild(g);
      nodeEls[n.id] = g;
    });

    dagEl.append(gEdges, gNodes, gPkts);
    return gPkts;
  }

  function sendPacket(layer, a, b, dur = 620) {
    const path = paths[edgeKey(a, b)];
    if (!path) return;
    const len = path.getTotalLength();
    const tone = byId(b)?.tone;
    const glow = mk('circle', { class: 'dg-pkt-glow', r: 6 });
    const dot = mk('circle', { class: 'dg-pkt', r: 2.4 });
    if (tone) {
      const v = `var(${TONES[tone]})`;
      glow.style.setProperty('--tone', v);
      dot.style.setProperty('--tone', v);
      path.style.setProperty('--tone', v);
    }
    layer.append(glow, dot);
    path.classList.add('hot');

    const t0 = performance.now();
    const tick = now => {
      const p = clamp((now - t0) / dur, 0, 1);
      const pt = path.getPointAtLength(p * len);
      glow.setAttribute('cx', pt.x); glow.setAttribute('cy', pt.y);
      dot.setAttribute('cx', pt.x);  dot.setAttribute('cy', pt.y);
      if (p < 1) { requestAnimationFrame(tick); return; }
      glow.remove(); dot.remove();
      path.classList.remove('hot');
    };
    requestAnimationFrame(tick);
  }

  function stamp() {
    const d = new Date();
    return [d.getHours(), d.getMinutes(), d.getSeconds()]
      .map(n => String(n).padStart(2, '0')).join(':');
  }

  function log(node) {
    if (!dagLog) return;
    const ms = (0.4 + Math.random() * 1.6).toFixed(1);
    dagLog.insertAdjacentHTML('beforeend',
      `<p><span class="ts">${stamp()}</span> <span class="ok">✓</span> ` +
      `<span class="name">${node}</span> succeeded in ${ms}s</p>`);
    while (dagLog.children.length > 5) dagLog.firstElementChild.remove();
  }

  function runWave(layer) {
    let delay = 0;
    WAVES.forEach((wave, i) => {
      setTimeout(() => {
        if (!dagVisible) return;
        wave.forEach(id => {
          nodeEls[id]?.classList.add('on');
          log(byId(id)?.label || id);
          setTimeout(() => nodeEls[id]?.classList.remove('on'), 1100);
          if (i + 1 < WAVES.length) {
            EDGES.filter(([a]) => a === id).forEach(([a, b]) => sendPacket(layer, a, b));
          }
        });
      }, delay);
      delay += 780;
    });
    return delay;
  }

  function startDag() {
    if (!dagEl) return;
    const layer = buildDag();
    if (!layer) return;

    if (reduced) {
      // Static but alive: light the whole graph once and seed the log.
      Object.values(nodeEls).forEach(n => n.classList.add('on'));
      ['ingest', 'bronze', 'silver', 'gold'].forEach(log);
      if (dagBadge) dagBadge.textContent = 'idle';
      return;
    }

    const loop = () => {
      const span = runWave(layer);
      dagTimer = setTimeout(loop, span + 900);
    };

    const io = new IntersectionObserver(entries => {
      dagVisible = entries[0].isIntersecting;
      if (dagBadge) dagBadge.textContent = dagVisible ? 'running' : 'paused';
      if (dagVisible && !dagTimer) loop();
      if (!dagVisible && dagTimer) { clearTimeout(dagTimer); dagTimer = null; }
    }, { threshold: 0.15 });
    io.observe(dagEl);
  }

  /* ── FILTERS ─────────────────────────────────────────────── */
  $$('.filters').forEach(bar => {
    const grid = document.getElementById(bar.dataset.for);
    const empty = bar.dataset.empty ? document.getElementById(bar.dataset.empty) : null;
    if (!grid) return;
    const cards = [...grid.children];

    bar.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      const want = chip.dataset.f;

      $$('.chip', bar).forEach(c => {
        const on = c === chip;
        c.classList.toggle('on', on);
        c.setAttribute('aria-pressed', String(on));
      });

      let shown = 0;
      cards.forEach(card => {
        const tags = (card.dataset.f || '').split(/\s+/).filter(Boolean);
        const show = want === 'all' || tags.includes(want);
        card.hidden = !show;
        // a card revealed by filtering may never have crossed the observer
        if (show) { card.classList.add('in'); shown++; }
      });
      if (empty) empty.hidden = shown > 0;
    });
  });

  /* ── NAV · SCROLL · RAIL ─────────────────────────────────── */
  const nav = $('#nav');
  const scrollBar = $('#scrollBar');
  const railFill = $('#railFill');
  const toTop = $('#toTop');
  const railItems = $$('.rail-stages li');
  const navLinks = $$('.nav-links a');
  const sections = [$('#top'), ...$$('main section[id]')].filter(Boolean);
  let ticking = false;

  function onScroll() {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? (y / max) * 100 : 0;

    nav?.classList.toggle('stuck', y > 24);
    if (scrollBar) scrollBar.style.width = pct + '%';
    if (railFill) railFill.style.height = pct + '%';
    toTop?.classList.toggle('show', y > 700);

    // Active section
    let current = 'top';
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= innerHeight * 0.35) current = s.id;
    }
    navLinks.forEach(a => {
      const active = a.getAttribute('href') === '#' + current;
      a.classList.toggle('on', active);
      if (active) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    railItems.forEach(li => li.classList.toggle('on', li.dataset.target === current));

    ticking = false;
  }

  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });
  onScroll();

  toTop?.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  railItems.forEach(li => li.addEventListener('click', () => {
    $('#' + li.dataset.target)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }));

  /* ── MOBILE NAV ──────────────────────────────────────────── */
  const burger = $('#burger');
  const links = $('#navLinks');
  burger?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navLinks.forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    burger?.classList.remove('on');
    burger?.setAttribute('aria-expanded', 'false');
    burger?.setAttribute('aria-label', 'Open menu');
  }));

  /* ── SPOTLIGHT · MAGNETIC · CARD GLOW ────────────────────── */
  if (!reduced && matchMedia('(pointer: fine)').matches) {
    const spot = $('#spotlight');
    let sx = 0, sy = 0, tx = 0, ty = 0, raf = null;

    addEventListener('pointermove', e => {
      tx = e.clientX; ty = e.clientY;
      if (spot) spot.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(follow);
    }, { passive: true });

    function follow() {
      sx += (tx - sx) * 0.12;
      sy += (ty - sy) * 0.12;
      if (spot) spot.style.translate = `calc(${sx}px - 50%) calc(${sy}px - 50%)`;
      raf = Math.abs(tx - sx) > 0.5 || Math.abs(ty - sy) > 0.5
        ? requestAnimationFrame(follow) : null;
    }

    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const mx = (e.clientX - r.left - r.width / 2) * 0.22;
        const my = (e.clientY - r.top - r.height / 2) * 0.32;
        el.style.transform = `translate(${mx}px, ${my}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });

    $$('.spot').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ── COPY EMAIL ──────────────────────────────────────────── */
  async function copyEmail(btn) {
    try {
      await navigator.clipboard.writeText(EMAIL);
      $('#actionStatus').textContent = 'Email address copied to clipboard.';
      if (!btn) return true;
      const span = $('span', btn), icon = $('i', btn), was = span.textContent;
      span.textContent = 'Copied to clipboard';
      icon.className = 'fas fa-check';
      setTimeout(() => { span.textContent = was; icon.className = 'fas fa-copy'; }, 1900);
      return true;
    } catch (e) {
      $('#actionStatus').textContent = `Could not copy automatically. Email: ${EMAIL}`;
      if (btn) $('span', btn).textContent = 'Select address above to copy';
      return false;
    }
  }
  $('#copyEmail')?.addEventListener('click', e => copyEmail(e.currentTarget));

  /* ── COMMAND PALETTE ─────────────────────────────────────── */
  const pal = $('#palette');
  const palInput = $('#paletteInput');
  const palList = $('#paletteList');
  let palItems = [], palSel = 0, lastFocus = null;

  const go = id => () => {
    closePalette();
    $('#' + id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  const open = url => () => { window.open(url, '_blank', 'noopener'); closePalette(); };

  const COMMANDS = [
    { g: 'Navigate', n: 'About',        i: 'fa-user',            h: '01', run: go('about') },
    { g: 'Navigate', n: 'Systems — lakehouse, MLOps, RAG', i: 'fa-diagram-project', h: '02', run: go('systems') },
    { g: 'Navigate', n: 'Experience',   i: 'fa-timeline',        h: '03', run: go('experience') },
    { g: 'Navigate', n: 'Impact',       i: 'fa-chart-simple',    h: '04', run: go('impact') },
    { g: 'Navigate', n: 'Projects',     i: 'fa-cube',            h: '05', run: go('projects') },
    { g: 'Navigate', n: 'Writing',      i: 'fa-feather',         h: '06', run: go('writing') },
    { g: 'Navigate', n: 'Credentials',  i: 'fa-graduation-cap',  h: '07', run: go('credentials') },
    { g: 'Navigate', n: 'Contact',      i: 'fa-envelope',        h: '08', run: go('contact') },

    { g: 'Actions', n: 'Copy email address', i: 'fa-copy',        h: EMAIL, run: () => { copyEmail(); closePalette(); } },
    { g: 'Actions', n: 'Download résumé',    i: 'fa-file-arrow-down', h: 'pdf', run: open(RESUME) },
    { g: 'Actions', n: 'Send an email',      i: 'fa-paper-plane', h: 'mailto', run: () => { location.href = 'mailto:' + EMAIL; closePalette(); } },
    { g: 'Actions', n: 'Toggle light / dark', i: 'fa-circle-half-stroke', h: 'theme', run: () => { toggleTheme(); closePalette(); } },
    { g: 'Actions', n: 'Open the terminal',  i: 'fa-terminal',    h: 'shell', run: () => { closePalette(); openTerm(); } },

    { g: 'Elsewhere', n: 'GitHub',   i: 'fa-github',   b: 1, h: '@anchitgupt',      run: open('https://github.com/anchitgupt') },
    { g: 'Elsewhere', n: 'LinkedIn', i: 'fa-linkedin', b: 1, h: '/in/anchitgupt',   run: open('https://www.linkedin.com/in/anchitgupt') },
    { g: 'Elsewhere', n: 'Medium',   i: 'fa-medium',   b: 1, h: 'articles',         run: open('https://medium.com/@anchitgupt') },
    { g: 'Elsewhere', n: 'Twitter',  i: 'fa-x-twitter', b: 1, h: '@Anchit_Gupt',    run: open('https://twitter.com/Anchit_Gupt') }
  ];

  function renderPalette(q = '') {
    const query = q.trim().toLowerCase();
    const hits = query
      ? COMMANDS.filter(c => (c.n + ' ' + c.g + ' ' + c.h).toLowerCase().includes(query))
      : COMMANDS;

    palItems = hits;
    palSel = 0;
    palInput.removeAttribute('aria-activedescendant');

    if (!hits.length) {
      palList.innerHTML = `<li class="pal-empty">no match for “${esc(q)}”</li>`;
      return;
    }

    let html = '', group = '';
    hits.forEach((c, i) => {
      if (c.g !== group) { group = c.g; html += `<li class="pal-group" role="presentation">${group}</li>`; }
      html += `<li class="pal-item${i === 0 ? ' sel' : ''}" role="option" id="pal-option-${i}" aria-selected="${i === 0}" data-i="${i}">
        <i class="ico ${c.b ? 'fab' : 'fas'} ${c.i}"></i>
        <span class="nm">${esc(c.n)}</span>
        <span class="hint">${esc(c.h)}</span></li>`;
    });
    palList.innerHTML = html;
    syncSelection();
  }

  function syncSelection() {
    $$('.pal-item', palList).forEach((node, i) => {
      node.classList.toggle('sel', i === palSel);
      node.setAttribute('aria-selected', String(i === palSel));
      if (i === palSel) palInput.setAttribute('aria-activedescendant', node.id);
    });
  }

  // Preserve any pre-existing inert state while a modal is open.
  const backgroundState = new Map();
  function lockBackground() {
    [...document.body.children].forEach(el => {
      if (el === pal || el.id === 'actionStatus' || el.tagName === 'SCRIPT') return;
      backgroundState.set(el, el.inert);
      el.inert = true;
    });
  }
  function unlockBackground() {
    backgroundState.forEach((wasInert, el) => { el.inert = wasInert; });
    backgroundState.clear();
  }

  function moveSel(d) {
    const nodes = $$('.pal-item', palList);
    if (!nodes.length) return;
    palSel = (palSel + d + nodes.length) % nodes.length;
    syncSelection();
    nodes[palSel].scrollIntoView({ block: 'nearest' });
  }

  function openPalette() {
    if (!pal.hidden) return;
    lastFocus = document.activeElement;
    pal.hidden = false;
    lockBackground();
    palInput.setAttribute("aria-expanded", "true");
    document.body.classList.add('locked');
    palInput.value = '';
    renderPalette();
    palInput.focus();
  }

  function closePalette() {
    if (pal.hidden) return;
    pal.hidden = true;
    unlockBackground();
    palInput.setAttribute("aria-expanded", "false");
    document.body.classList.remove('locked');
    lastFocus?.focus?.();
  }

  palInput?.addEventListener('input', e => renderPalette(e.target.value));

  palList?.addEventListener('click', e => {
    const li = e.target.closest('.pal-item');
    if (li) palItems[+li.dataset.i]?.run();
  });
  palList?.addEventListener('pointermove', e => {
    const li = e.target.closest('.pal-item');
    if (!li) return;
    palSel = +li.dataset.i;
    syncSelection();
  });

  $('#paletteClose')?.addEventListener('click', closePalette);
  $('.palette-scrim')?.addEventListener('click', closePalette);
  $('#paletteTrigger')?.addEventListener('click', openPalette);
  $('#heroPalette')?.addEventListener('click', openPalette);
  $('#footerPalette')?.addEventListener('click', openPalette);

  /* ── TERMINAL ────────────────────────────────────────────── */
  const term = $('#term');
  const termBody = $('#termBody');
  const termInput = $('#termInput');
  let termLastFocus = null;
  const cmdHistory = [];
  let hIdx = -1;

  const BANNER =
    `<span class="ok">anchit@portfolio</span> — interactive shell\n` +
    `type <span class="key">help</span> for commands, <span class="key">exit</span> to close.\n`;

  const NEOFETCH =
`<span class="ok">       ▄▄▄▄▄▄    </span>  <span class="key">anchit@portfolio</span>
<span class="ok">      █  ▄  █   </span>  ────────────────
<span class="ok">      █ ███ █   </span>  <span class="key">role</span>     Senior Data Engineer
<span class="ok">      █▄▄▄▄▄█   </span>  <span class="key">at</span>       Sevaro Health · Pune, IN
<span class="ok">      █ █ █ █   </span>  <span class="key">edu</span>      M.Tech, IIIT Delhi
<span class="ok">      ▀     ▀   </span>  <span class="key">builds</span>   lakehouse · mlops · rag
                   <span class="key">stack</span>    PySpark · Databricks · LangChain
                   <span class="key">records</span>  50,000,000+
                   <span class="key">uptime</span>   5+ years
                   <span class="key">theme</span>    ink / acid-lime`;

  const CMDS = {
    help: () =>
`<span class="key">whoami</span>     who is this guy
<span class="key">neofetch</span>   the good stuff
<span class="key">systems</span>    the three things I build
<span class="key">stack</span>      technologies I use daily
<span class="key">exp</span>        work history
<span class="key">projects</span>   what I've built
<span class="key">writing</span>    published articles
<span class="key">impact</span>     numbers I can defend
<span class="key">contact</span>    how to reach me
<span class="key">resume</span>     download the PDF
<span class="key">theme</span>      toggle light / dark
<span class="key">clear</span>      clear the screen
<span class="key">exit</span>       close the terminal`,

    whoami: () =>
`Anchit Gupta — Senior Data Engineer @ Sevaro Health, Pune.
5+ years across healthcare, gaming and enterprise. I build lakehouses,
the MLOps that ships models off them, and the RAG that makes them answerable.
M.Tech from IIIT Delhi (GATE 98.14 percentile).
<span class="warn">status:</span> open to opportunities.`,

    neofetch: () => NEOFETCH,

    systems: () =>
`<span class="ok">01 · LAKEHOUSE</span>   bronze → silver → gold
   Delta Lake on Databricks, Unity Catalog scoped grants, SCD2 dimensions,
   partitioning + liquid clustering. Freshness and anomaly checks gate
   every promotion between layers.

<span class="key">02 · MLOPS</span>       features → train → registry → serve → monitor
   Models start from the Gold layer, so a training feature is provably the
   production feature. MLflow tracking + registry, GitHub Actions CI/CD,
   A/B harness and dynamic recommenders.

<span class="warn">03 · AI / RAG</span>    chunk → embed → index → retrieve → generate → evaluate
   An LLM is only as honest as its retriever. Grounded in governed tables,
   cites the chunk, evaluated for groundedness. LangChain over LLaMA and
   hosted models; PII tagged upstream so retrieval can't leak.`,

    stack: () =>
`<span class="key">programming</span>    Python (advanced) · SQL · Bash · C/C++ · JavaScript
<span class="key">data platform</span>  PySpark · Delta Lake · Databricks · Airflow · dbt
<span class="key">cloud</span>          AWS (S3, Redshift, Lambda) · Snowflake · MongoDB · Docker
<span class="key">genai &amp; ml</span>     LangChain · HuggingFace · MLflow · LLaMA · spaCy
<span class="key">etl &amp; mdm</span>      Talend · canonical models · MDM · golden record logic
<span class="key">governance</span>     Unity Catalog · OpenMetadata · RBAC · PII tagging
<span class="key">observability</span>  alerting frameworks · anomaly detection · SLA monitoring
<span class="key">bi</span>             Tableau · Power BI · KPI dashboards`,

    exp: () =>
`<span class="ok">2025-10 → now</span>      Senior Data Engineer      Sevaro Health   Pune
<span class="ok">2022-10 → 2025-10</span>  Data Engineer I → III     Junglee Games   India
<span class="ok">2021-07 → 2022-09</span>  Data Analyst → Associate  Axtria          India

run <span class="key">impact</span> for the numbers.`,

    projects: () =>
`<span class="warn">work</span>   GenAI Medical Summarisation   RAG over clinical docs
       LLaMA Rummy Bot               plays and explains a hand
       A/B &amp; Recommendation MLOps    experiments + retraining
       Pharma MDM Pipeline           50M+ records, 87% match

<span class="ok">open</span>   data-dbt          11 models, 56 tests, CI/CD
       data-builder      visual ETL, CDC → S3
       datalearn         SQL practice on DuckDB-WASM
       learn_llm_code    an LLM from scratch, DPO-aligned
       pytq              KV-cache quantization for PyTorch
       r-llm             Python vs Rust, honestly benchmarked
       open-desktop-gpt  your LLM compiles the wiki
       papers-code       Evolution Strategies at Hyperscale
       easy-pdf          client-side PDF tools

→ <a href="https://github.com/anchitgupt" target="_blank" rel="noopener">github.com/anchitgupt</a> · <a href="https://github.com/ez-biz" target="_blank" rel="noopener">github.com/ez-biz</a>`,

    writing: () =>
`Series on Medallion architecture, MLOps and AI × Data Engineering.
Latest: <span class="key">Fact or Dimension?</span> · <span class="key">Building a Streaming Medallion</span>
→ <a href="https://medium.com/@anchitgupt" target="_blank" rel="noopener">medium.com/@anchitgupt</a>`,

    impact: () =>
`<span class="ok">+40%</span>  ETL performance      EMR → Databricks migration
<span class="ok">-30%</span>  compute cost         cluster right-sizing + audits
<span class="ok">-50%</span>  DQ incidents         freshness + anomaly detection
<span class="ok">-70%</span>  alert dev effort     reusable alerting framework
<span class="ok">-80%</span>  SLA delays           rebuilt KPI pipelines
<span class="ok"> 87%</span>  match accuracy       NLP entity resolution, 50M+ records
<span class="ok">3.5h</span>  saved/analyst/day    LangChain summarisation agent`,

    contact: () =>
`email     <a href="mailto:${EMAIL}">${EMAIL}</a>
github    <a href="https://github.com/anchitgupt" target="_blank" rel="noopener">github.com/anchitgupt</a>
linkedin  <a href="https://www.linkedin.com/in/anchitgupt" target="_blank" rel="noopener">linkedin.com/in/anchitgupt</a>
medium    <a href="https://medium.com/@anchitgupt" target="_blank" rel="noopener">medium.com/@anchitgupt</a>`,

    resume: () => { window.open(RESUME, '_blank', 'noopener'); return 'opening <span class="key">Anchit_Gupta_SCE.pdf</span> …'; },
    theme:  () => { toggleTheme(); return `theme → <span class="key">${root.getAttribute('data-theme')}</span>`; },
    clear:  () => { termBody.innerHTML = ''; return ''; },
    exit:   () => { closeTerm(); return ''; },
    sudo:   () => `<span class="warn">anchit is not in the sudoers file. This incident has been reported.</span>`,
    ls:     () => `about/  systems/  experience/  impact/  projects/  writing/  credentials/  contact/`,
    pwd:    () => `/home/anchit/portfolio`,
    date:   () => new Date().toString()
  };

  function termPrint(html) {
    if (html === '') return;
    termBody.insertAdjacentHTML('beforeend', `<div>${html}\n</div>`);
    termBody.scrollTop = termBody.scrollHeight;
  }

  function termRun(raw) {
    const cmd = raw.trim();
    termBody.insertAdjacentHTML('beforeend',
      `<div class="cmd"><span class="p">anchit@portfolio:~$</span> ${esc(cmd)}</div>`);
    if (!cmd) { termBody.scrollTop = termBody.scrollHeight; return; }

    cmdHistory.push(cmd);
    hIdx = cmdHistory.length;

    const key = cmd.split(/\s+/)[0].toLowerCase();
    const fn = Object.hasOwn(CMDS, key) ? CMDS[key] : null;
    termPrint(fn ? fn() : `<span class="warn">zsh: command not found: ${esc(key)}</span>\ntry <span class="key">help</span>`);
    termBody.scrollTop = termBody.scrollHeight;
  }

  function openTerm() {
    if (!term || !term.hidden) return;
    termLastFocus = document.activeElement;
    term.hidden = false;
    if (!termBody.children.length) termPrint(BANNER);
    termInput.focus();
  }

  function closeTerm() {
    if (!term) return;
    term.hidden = true;
    termLastFocus?.focus?.();
  }

  $('#termForm')?.addEventListener('submit', e => {
    e.preventDefault();
    termRun(termInput.value);
    termInput.value = '';
  });

  termInput?.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp')   { e.preventDefault(); hIdx = Math.max(0, hIdx - 1); termInput.value = cmdHistory[hIdx] || ''; }
    if (e.key === 'ArrowDown') { e.preventDefault(); hIdx = Math.min(cmdHistory.length, hIdx + 1); termInput.value = cmdHistory[hIdx] || ''; }
  });

  $('#termClose')?.addEventListener('click', closeTerm);
  $('[data-close-term]')?.addEventListener('click', closeTerm);
  termBody?.addEventListener('click', e => {
    if (e.target.tagName !== 'A') termInput.focus();
  });

  // Draggable window
  (() => {
    const head = $('#termHead');
    if (!head) return;
    let dx = 0, dy = 0, dragging = false;

    head.addEventListener('pointerdown', e => {
      if (e.target.closest('button, .dag-dots')) return;
      const r = term.getBoundingClientRect();
      dx = e.clientX - r.left; dy = e.clientY - r.top;
      dragging = true;
      head.setPointerCapture(e.pointerId);
    });

    head.addEventListener('pointermove', e => {
      if (!dragging) return;
      const x = clamp(e.clientX - dx, 0, innerWidth - term.offsetWidth);
      const y = clamp(e.clientY - dy, 0, innerHeight - term.offsetHeight);
      term.style.left = x + 'px';
      term.style.top = y + 'px';
      term.style.translate = '0 0';
    });

    head.addEventListener('pointerup', e => {
      dragging = false;
      head.releasePointerCapture(e.pointerId);
    });
  })();

  /* ── GLOBAL KEYS ─────────────────────────────────────────── */
  addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName);

    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      pal.hidden ? openPalette() : closePalette();
      return;
    }

    if (e.key === 'Escape') {
      if (!pal.hidden) { closePalette(); return; }
      if (term && !term.hidden) { closeTerm(); return; }
      if (links.classList.contains('open')) { burger.click(); burger.focus(); return; }
    }

    if (!pal.hidden) {
      if (e.key === 'Tab') {
        e.preventDefault();
        (document.activeElement === palInput ? $('#paletteClose') : palInput).focus();
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); moveSel(1); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); moveSel(-1); }
      if (e.key === 'Enter' && document.activeElement === palInput) { e.preventDefault(); palItems[palSel]?.run(); }
      return;
    }

    if (typing) return;
    if (e.key === '`' || e.key === '~') { e.preventDefault(); openTerm(); }
    if (e.key === '/') { e.preventDefault(); openPalette(); }
  });

  /* ── MISC ────────────────────────────────────────────────── */
  const year = $('#footerYear');
  if (year) year.textContent = new Date().getFullYear();

  $('#emailOut')?.addEventListener('click', () => copyEmail());

  // Anchor links -> smooth scroll (respects reduced motion)
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const t = id && document.getElementById(id);
      if (!t) return;
      e.preventDefault();
      history.pushState(null, '', '#' + id);
      if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
      t.focus({ preventScroll: true });
      t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  root.classList.add('motion-ready');
  runBoot();

  console.log(
    '%c anchit@portfolio ',
    'background:#c9f24e;color:#0a0c06;font-weight:700;border-radius:3px',
    '\nPress ⌘K for the command palette, or ` for a real shell.'
  );
})();
