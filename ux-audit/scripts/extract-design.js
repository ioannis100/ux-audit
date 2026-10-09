// UX audit extractor. Paste into a browser JS console / javascript tool, or
// Playwright: `await page.evaluate(fs.readFileSync(path, 'utf8'))`.
// Evaluates to a Promise of a JSON report of measured design facts for the
// current page at the current viewport. Run once per key screen and viewport.
// ponytail: contrast reads the solid colours painted under the text (hit-test stack, ::before
// fills, ancestors) — text over images or gradients is reported as `unknownBg`, verify those visually.
(async () => {
  const MAX = 6; // examples kept per finding
  if (!innerWidth || !innerHeight) return { error: 'Viewport is 0x0 (hidden tab or headless without size). Set a viewport, reload, rerun.' };
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity !== 0;
  };
  const sel = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) return s + '#' + el.id;
    const c = [...el.classList].slice(0, 2).join('.');
    return c ? s + '.' + c : s;
  };
  const txt = (el) => (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 60);
  const hist = (arr) => Object.entries(arr.reduce((m, v) => ((m[v] = (m[v] || 0) + 1), m), {})).sort((a, b) => b[1] - a[1]);
  const px = (v) => Math.round(parseFloat(v) * 10) / 10;

  // ---- color math (WCAG 2.x)
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const blend = (top, bot) => ({
    r: top.r * top.a + bot.r * (1 - top.a),
    g: top.g * top.a + bot.g * (1 - top.a),
    b: top.b * top.a + bot.b * (1 - top.a),
    a: 1,
  });
  const lum = ({ r, g, b }) => {
    const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
  };
  // What is painted under the text: walk the hit-test stack at the text's centre (catches fills on
  // a child or sibling layer and on ::before), else fall back to the ancestor chain (off-screen text).
  const pseudoFill = (n) => {
    const p = getComputedStyle(n, '::before');
    if (p.content === 'none' || p.backgroundImage !== 'none') return null;
    const c = parse(p.backgroundColor), b = n.getBoundingClientRect();
    return c && c.a > 0 && parseFloat(p.width) >= 0.8 * b.width && parseFloat(p.height) >= 0.8 * b.height ? c : null;
  };
  const stackOf = (el) => {
    const b = el.getBoundingClientRect(), x = b.left + b.width / 2, y = b.top + b.height / 2;
    if (!b.width || x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) return null;
    const st = document.elementsFromPoint(x, y), i = st.indexOf(el);
    return i < 0 ? null : st.slice(i);
  };
  const bgOf = (el) => {
    const layers = [], stack = stackOf(el);
    if (stack) {
      for (const n of stack) {
        const s = getComputedStyle(n);
        if (s.backgroundImage !== 'none') return null; // image/gradient: unknown
        for (const c of [pseudoFill(n), parse(s.backgroundColor)]) if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
        if (layers.at(-1)?.a >= 1) break;
      }
      let base = { r: 255, g: 255, b: 255, a: 1 };
      for (const l of layers.reverse()) base = blend(l, base);
      return base;
    }
    for (let n = el; n; n = n.parentElement) {
      const s = getComputedStyle(n);
      if (s.backgroundImage !== 'none') return null; // image/gradient: unknown
      const c = parse(s.backgroundColor);
      if (c && c.a > 0) {
        layers.push(c);
        if (c.a >= 1) break;
      }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 }; // canvas default
    for (const l of layers.reverse()) base = blend(l, base);
    return base;
  };

  // ---- text elements: elements with their own non-empty text node
  const all = [...document.body.querySelectorAll('*')].filter(vis);
  const textEls = all.filter((el) =>
    [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)
  );

  // Decorative art (mock-ups, illustrations) is aria-hidden: count it for contrast, not for the UI's type scale or tokens.
  const deco = (el) => !!el.closest('[aria-hidden="true"]');
  const fam = [], sizes = [], weights = [], colors = [];
  const tiny = [], contrastFail = [], unknownBg = [], looseTight = [], capsNoTrack = [];
  let contrastChecked = 0;
  for (const el of textEls) {
    const s = getComputedStyle(el);
    const fs = parseFloat(s.fontSize);
    fam.push(s.fontFamily.split(',')[0].replace(/["']/g, '').trim());
    if (!deco(el)) sizes.push(px(fs));
    weights.push(s.fontWeight);
    colors.push(s.color);
    if (fs < 12 && tiny.length < MAX) tiny.push({ el: sel(el), size: fs, text: txt(el) });
    if (s.textTransform === 'uppercase' && (parseFloat(s.letterSpacing) || 0) <= 0 && txt(el).length > 2 && capsNoTrack.length < MAX)
      capsNoTrack.push({ el: sel(el), text: txt(el) });

    // a labelled graphic (role="img" + aria-label, e.g. a €€€ price meter) carries its meaning in the label: not text to check
    if (el.closest('[role="img"][aria-label]')) continue;
    const fill = parse(s.webkitTextFillColor || '');
    const fg = fill && fill.a === 0 ? null : fill || parse(s.color); // transparent fill = gradient text
    const bg = bgOf(el);
    if (!fg || !bg) { if (unknownBg.length < MAX) unknownBg.push({ el: sel(el), text: txt(el) }); continue; }
    const r = ratio(fg.a < 1 ? blend(fg, bg) : fg, bg);
    // ~1:1 is almost always hidden/animating/clipped text, not a real failure: verify visually
    if (r < 1.1) { if (unknownBg.length < MAX) unknownBg.push({ el: sel(el), text: txt(el), note: 'same color as bg' }); continue; }
    contrastChecked++;
    const large = fs >= 24 || (fs >= 18.66 && +s.fontWeight >= 700);
    const need = large ? 3 : 4.5;
    if (r < need) contrastFail.push({ el: sel(el), ratio: +r.toFixed(2), need, size: fs, color: s.color, bg: `rgb(${bg.r|0}, ${bg.g|0}, ${bg.b|0})`, text: txt(el) });
  }

  // ---- paragraphs: line-height ratio and measure (chars per line)
  const paras = textEls.filter((el) => (el.innerText || '').length > 120 && /^(P|LI|DD|BLOCKQUOTE|DIV|SPAN|ARTICLE)$/.test(el.tagName));
  const measure = [];
  for (const el of paras.slice(0, 40)) {
    const s = getComputedStyle(el);
    const fs = parseFloat(s.fontSize);
    const lh = s.lineHeight === 'normal' ? 1.2 : parseFloat(s.lineHeight) / fs;
    const lines = Math.max(1, Math.round(el.getBoundingClientRect().height / (lh * fs)));
    const cpl = Math.round(el.innerText.length / lines);
    measure.push({ el: sel(el), lineHeight: +lh.toFixed(2), charsPerLine: lines > 1 ? cpl : null });
    if ((lh < 1.3 || lh > 1.9) && looseTight.length < MAX) looseTight.push({ el: sel(el), lineHeight: +lh.toFixed(2) });
  }
  const cpls = measure.map((m) => m.charsPerLine).filter(Boolean);

  // ---- spacing, radii, shadows
  const spacing = [], radii = [], shadows = [];
  for (const el of all.slice(0, 3000)) {
    const s = getComputedStyle(el);
    for (const p of ['marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'rowGap', 'columnGap']) {
      const v = parseFloat(s[p]);
      if (v > 0) spacing.push(Math.round(v));
    }
    if (deco(el)) continue;
    if (parseFloat(s.borderTopLeftRadius) > 0) radii.push(s.borderTopLeftRadius);
    if (s.boxShadow !== 'none') shadows.push(s.boxShadow);
  }
  const spacingHist = hist(spacing);
  const offGrid = spacingHist.filter(([v]) => v % 4 !== 0);

  // ---- interactive elements: targets, semantics, copy
  const interactive = all.filter((el) =>
    el.matches('a[href],button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=link],[role=tab],[role=checkbox],[role=switch],[onclick],[tabindex]:not([tabindex="-1"])')
  );
  const under24 = [], under44 = [];
  for (const el of interactive) {
    const r = el.getBoundingClientRect();
    const inline = el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.closest('p,li');
    if (inline) continue; // inline links in text are exempt from 2.5.8
    const t = { el: sel(el), w: Math.round(r.width), h: Math.round(r.height), text: txt(el) };
    if (r.width < 24 || r.height < 24) under24.push(t);
    else if (r.width < 44 || r.height < 44) under44.push(t);
  }
  const fakeButtons = all
    .filter((el) => !el.matches('a,button,input,select,textarea,summary,label,[role]') && (el.hasAttribute('onclick') || (getComputedStyle(el).cursor === 'pointer' && !el.closest('a,button,label,[role]'))))
    .slice(0, MAX).map((el) => ({ el: sel(el), text: txt(el) }));

  const labels = [...new Set(all.filter((el) => el.matches('button,[role=button],a[href],input[type=submit]')).map(txt).filter(Boolean))];
  const generic = labels.filter((l) => /^(ok|submit|click here|here|learn more|read more|more|yes|no|go|continue)$/i.test(l));

  const inputs = [...document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]),select,textarea')].filter(vis);
  const unlabeled = inputs.filter((i) => !(i.labels && i.labels.length) && !i.getAttribute('aria-label') && !i.getAttribute('aria-labelledby'))
    .slice(0, MAX).map((i) => ({ el: sel(i), placeholder: i.placeholder || null }));
  const typeHints = inputs.filter((i) => {
    const n = (i.name + ' ' + i.id + ' ' + (i.placeholder || '')).toLowerCase();
    return (/mail/.test(n) && i.type !== 'email') || (/phone|tel|mobile/.test(n) && i.type !== 'tel') || (/(zip|postal|otp|code|amount|qty)/.test(n) && !i.inputMode && i.type === 'text');
  }).slice(0, MAX).map((i) => ({ el: sel(i), type: i.type, name: i.name }));
  const noAutocomplete = inputs.filter((i) => /name|mail|phone|tel|address|zip|postal|city|country|card|cc-/i.test(i.name + i.id) && !i.autocomplete).length;

  const imgsNoAlt = [...document.images].filter((i) => vis(i) && !i.hasAttribute('alt')).slice(0, MAX).map((i) => i.src.split('/').pop().slice(0, 60));
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(vis).map((h) => +h.tagName[1]);
  const headingSkips = headings.filter((h, i) => i > 0 && h - headings[i - 1] > 1).length;

  // ---- motion
  const durs = [], eases = [], longAnim = [], linearMove = [];
  for (const el of all.slice(0, 3000)) {
    const s = getComputedStyle(el);
    const d = s.transitionDuration.split(',').map((v) => parseFloat(v) * (v.includes('ms') ? 1 : 1000));
    const props = s.transitionProperty.split(',').map((v) => v.trim());
    const tf = s.transitionTimingFunction.split(/,(?![^(]*\))/).map((v) => v.trim());
    d.forEach((ms, i) => {
      if (ms <= 0) return;
      durs.push(Math.round(ms));
      eases.push(tf[i % tf.length]);
      if (ms > 500 && longAnim.length < MAX) longAnim.push({ el: sel(el), ms, prop: props[i % props.length] });
      if (tf[i % tf.length] === 'linear' && /transform|all|left|top|translate/.test(props[i % props.length]) && linearMove.length < MAX) linearMove.push(sel(el));
    });
    const ad = parseFloat(s.animationDuration);
    if (s.animationName !== 'none' && ad > 0) durs.push(Math.round(ad * (s.animationDuration.includes('ms') ? 1 : 1000)));
  }

  // ---- stylesheet scan: reduced motion, focus removal, font-display
  let reducedMotion = false, darkScheme = false, outlineNone = 0, focusVisible = 0, unreadableSheets = 0;
  const fontDisplay = [];
  const walk = (rules) => {
    for (const r of rules) {
      const t = r.cssText || '';
      if (r.media && /prefers-reduced-motion/.test(r.media.mediaText)) reducedMotion = true;
      if (r.media && /prefers-color-scheme:\s*dark/.test(r.media.mediaText)) darkScheme = true;
      if (/:focus-visible/.test(t)) focusVisible++;
      if (/:focus\b[^{]*\{[^}]*outline:\s*(none|0)/.test(t)) outlineNone++;
      if (r.constructor.name === 'CSSFontFaceRule') fontDisplay.push((r.style.getPropertyValue('font-display') || 'auto(block)'));
      if (r.cssRules) walk(r.cssRules);
    }
  };
  for (const sh of document.styleSheets) { try { walk(sh.cssRules); } catch { unreadableSheets++; } }

  // ---- above-the-fold complexity: first-impression proxies (Tuch 2012, Reinecke 2013)
  const textSet = new Set(textEls);
  const hueOf = (c) => {
    const p = parse(c || '');
    if (!p || p.a < 0.5) return null;
    const r = p.r / 255, g = p.g / 255, b = p.b / 255, max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    if (d < 0.1 || max < 0.15 || min > 0.9) return null; // greys, near-black, near-white are neutral
    const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return Math.round(((h * 60 + 360) % 360) / 30) * 30; // 12 hue buckets
  };
  const foldHues = new Set(), foldSizes = new Set();
  let foldRegions = 0;
  for (const el of all) {
    const r = el.getBoundingClientRect();
    if (r.top >= innerHeight || r.bottom <= 0) continue;
    const s = getComputedStyle(el);
    for (const c of [s.color, s.backgroundColor, s.borderTopColor]) { const h = hueOf(c); if (h !== null) foldHues.add(h); }
    if (textSet.has(el)) foldSizes.add(px(parseFloat(s.fontSize)));
    const ownBg = (parse(s.backgroundColor) || { a: 0 }).a > 0 && s.backgroundColor !== getComputedStyle(el.parentElement || el).backgroundColor;
    const bounded = ownBg || (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none') || s.boxShadow !== 'none';
    if (bounded && r.width > 40 && r.height > 24) foldRegions++;
  }

  // ---- performance (what the page itself can see)
  const nav = performance.getEntriesByType('navigation')[0];
  const lcp = performance.getEntriesByType('largest-contentful-paint').pop();
  const cls = performance.getEntriesByType('layout-shift').filter((e) => !e.hadRecentInput).reduce((s, e) => s + e.value, 0);
  // Chrome emits no FCP/LCP/CLS for a tab that was hidden during load (every subagent tab in the built-in browser is). A 0 here would be a false pass.
  const paintsUnmeasured = document.hidden || !performance.getEntriesByName('first-contentful-paint').length;

  const fontsLoaded = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family.replace(/"/g, '')} ${f.weight}`);

  return {
    page: { url: location.href, title: document.title, viewport: `${innerWidth}x${innerHeight}`, horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1, colorScheme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' },
    typography: {
      families: hist(fam).slice(0, 8),
      sizesPx: hist(sizes).slice(0, 20),
      distinctSizes: new Set(sizes).size,
      weights: hist(weights),
      distinctTextColors: new Set(colors).size,
      tinyTextUnder12px: tiny,
      paragraphs: { sampled: measure.length, lineHeights: hist(measure.map((m) => m.lineHeight)).slice(0, 8), charsPerLine: { min: Math.min(...cpls), max: Math.max(...cpls), samples: cpls.slice(0, 10) }, outOfRangeLineHeight: looseTight },
      uppercaseWithoutTracking: capsNoTrack,
      fontsLoaded,
      fontDisplay: hist(fontDisplay),
    },
    color: { contrastChecked, contrastFailures: contrastFail.length, contrastExamples: contrastFail.sort((a, b) => a.ratio - b.ratio).slice(0, MAX), unknownBackground: unknownBg, hasDarkModeCSS: darkScheme },
    spacing: { distinctValues: spacingHist.length, top: spacingHist.slice(0, 15), offGrid4: offGrid.slice(0, 10), radii: hist(radii).slice(0, 8), shadowLevels: new Set(shadows).size },
    interaction: { interactiveCount: interactive.length, targetsUnder24px: { count: under24.length, examples: under24.slice(0, MAX) }, targetsUnder44px: { count: under44.length, examples: under44.slice(0, MAX) }, nonSemanticClickables: fakeButtons },
    fold: { distinctHues: foldHues.size, hues: [...foldHues].sort((a, b) => a - b), distinctTextSizes: foldSizes.size, boundedRegions: foldRegions, note: 'above-the-fold complexity proxies; low hues/sizes/regions + a conventional layout wins the 50ms impression — compare with the competitor' },
    copy: { labels: labels.slice(0, 60), genericLabels: generic },
    forms: { inputs: inputs.length, unlabeled, wrongTypeOrInputmode: typeHints, personalFieldsWithoutAutocomplete: noAutocomplete },
    semantics: { imagesMissingAlt: imgsNoAlt, h1Count: headings.filter((h) => h === 1).length, headingLevelSkips: headingSkips },
    motion: { durationsMs: hist(durs).slice(0, 12), easings: hist(eases).slice(0, 8), over500ms: longAnim, linearOnMovement: linearMove, hasReducedMotionCSS: reducedMotion },
    focus: { focusOutlineRemovedRules: outlineNone, focusVisibleRules: focusVisible, unreadableCrossOriginSheets: unreadableSheets },
    performance: { ttfbMs: nav && Math.round(nav.responseStart), domContentLoadedMs: nav && Math.round(nav.domContentLoadedEventEnd), loadMs: nav && Math.round(nav.loadEventEnd), lcpMs: lcp ? Math.round(lcp.startTime) : null, cls: paintsUnmeasured ? null : +cls.toFixed(3), note: paintsUnmeasured ? 'FCP/LCP/CLS unmeasured: tab was hidden during load. Use Lighthouse or PageSpeed Insights for vitals.' : 'lab, this load only; use PageSpeed/CrUX for field data' },
  };
})()
