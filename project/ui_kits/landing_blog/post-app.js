(function () {
  'use strict';

  var POSTS  = window.POSTS || [];
  var BODIES = window.POST_BODIES || {};   // cuerpos curados (estructurados) — p.ej. N.º 51
  var HTML   = window.POST_HTML || {};     // cuerpos HTML importados de WordPress (los 51)

  var MONTHS = ['enero','febrero','marzo','abril','mayo','junio',
                'julio','agosto','septiembre','octubre','noviembre','diciembre'];
  var MONTHS_SHORT = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

  // Imagen por defecto para compartir (posts con portada tipográfica automática,
  // que no tienen una imagen real con URL). Se usa en Open Graph / Twitter.
  var SITE_DEFAULT_IMAGE =
    'https://oscarim79.github.io/oscarimorales-web/project/assets/oscar-stage.png';

  // ------------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------------
  function fmtDateLong(iso) {
    var p = iso.split('-').map(Number);
    return p[2] + ' de ' + MONTHS[p[1] - 1] + ' de ' + p[0];
  }
  function fmtDate(iso) {
    var p = iso.split('-').map(Number);
    return p[2] + ' ' + MONTHS_SHORT[p[1] - 1] + ' ' + p[0];
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function cover(post) {
    if (post.image) return post.image;
    return (typeof window.makeCover === 'function') ? window.makeCover(post) : '';
  }

  function makeImg(post, alt) {
    var img = el('img');
    img.src = cover(post);
    img.alt = alt || '';
    img.referrerPolicy = 'no-referrer';
    img.loading = 'eager';
    img.decoding = 'async';
    img.addEventListener('error', function () {
      if (typeof window.makeCover === 'function') img.src = window.makeCover(post);
    });
    return img;
  }

  // Which post? Las páginas estáticas (post-<n>.html) inyectan window.POST_N;
  // si no, se lee ?n= de la URL (post.html?n=…). Por defecto, 51.
  function currentN() {
    var n;
    if (typeof window.POST_N === 'number') {
      n = window.POST_N;
    } else {
      var m = window.location.search.match(/[?&]n=(\d+)/);
      n = m ? Number(m[1]) : 51;
    }
    return POSTS.some(function (p) { return p.n === n; }) ? n : 51;
  }

  // URL de la página (estática) de un post — para enlaces internos.
  function postPage(n) { return 'post-' + n + '.html'; }

  // ------------------------------------------------------------------------
  // NAV (with reading-progress bar)
  // ------------------------------------------------------------------------
  function buildNav() {
    var nav = el('nav', 'nav');
    nav.innerHTML =
      '<div class="nav__inner">' +
        '<a class="nav__brand" href="index.html">' +
          '<img src="project/assets/logo-icon.png" alt="OM" width="36" height="36" />' +
          '<span class="nav__brand-text">' +
            '<span class="nav__wordmark">OSCAR I. MORALES</span>' +
            '<span class="nav__tagline">Secundum Fidem</span>' +
          '</span>' +
        '</a>' +
        '<div class="nav__links">' +
          '<a class="nav__link" href="index.html">Inicio</a>' +
          '<a class="nav__link nav__link--active" href="index.html#archivo">Blog</a>' +
          '<a class="nav__cta" href="index.html#suscribir">Suscribirme</a>' +
        '</div>' +
      '</div>' +
      '<div class="nav__progress" aria-hidden="true">' +
        '<div class="nav__progress-fill" id="js-progress"></div>' +
      '</div>';
    return nav;
  }

  function initProgress() {
    var fill = document.getElementById('js-progress');
    if (!fill) return;
    var raf = 0;
    function update() {
      raf = 0;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      fill.style.transform = 'scaleX(' + p + ')';
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(update); }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  // ------------------------------------------------------------------------
  // ARTICLE COVER
  // ------------------------------------------------------------------------
  function buildCover(post, readMinutes) {
    var header = el('header', 'acover');

    var bg = el('div', 'acover__bg');
    bg.setAttribute('aria-hidden', 'true');
    bg.appendChild(makeImg(post, ''));
    bg.appendChild(el('div', 'acover__scrim'));
    header.appendChild(bg);

    var top = el('div', 'wrap acover__top');
    var crumbs = el('div', 'acover__crumbs');
    var cHome = el('a', null, 'Inicio'); cHome.href = 'index.html';
    var cBlog = el('a', null, 'Blog');   cBlog.href = 'index.html#archivo';
    crumbs.appendChild(cHome);
    crumbs.appendChild(el('span', 'acover__crumbs-sep', '/'));
    crumbs.appendChild(cBlog);
    crumbs.appendChild(el('span', 'acover__crumbs-sep', '/'));
    crumbs.appendChild(el('span', 'acover__crumbs-current', post.cats[0]));
    top.appendChild(crumbs);
    var num = el('span', 'acover__num');
    num.innerHTML = '<sup>N.&deg;</sup>';
    num.appendChild(document.createTextNode(String(post.n)));
    top.appendChild(num);
    header.appendChild(top);

    var bottom = el('div', 'wrap acover__bottom');
    var cats = el('div', 'acover__cats');
    post.cats.forEach(function (c) {
      var a = el('a', 'acover__cat', c);
      a.href = 'index.html#archivo';
      cats.appendChild(a);
    });
    bottom.appendChild(cats);
    bottom.appendChild(el('h1', 'acover__title', post.title));

    var meta = el('div', 'acover__meta');
    var byline = el('span', 'acover__byline');
    byline.appendChild(el('span', 'acover__byline-lbl', 'Por'));
    byline.appendChild(el('span', 'acover__byline-name', 'Oscar I. Morales'));
    meta.appendChild(byline);
    meta.appendChild(el('span', 'acover__dot'));
    meta.appendChild(el('span', 'acover__date', fmtDateLong(post.date)));
    if (readMinutes) {
      meta.appendChild(el('span', 'acover__dot'));
      meta.appendChild(el('span', 'acover__read', readMinutes + ' min de lectura'));
    }
    bottom.appendChild(meta);
    header.appendChild(bottom);

    return header;
  }

  // ------------------------------------------------------------------------
  // ARTICLE BODY
  // ------------------------------------------------------------------------
  function buildBlock(block) {
    switch (block.type) {
      case 'lead':
        return el('p', 'prose__lead', block.text);
      case 'p':
        return el('p', 'prose__p', block.text);
      case 'h2': {
        var h = el('h2', 'prose__h2');
        h.appendChild(el('span', 'prose__h2-rule'));
        h.appendChild(document.createTextNode(block.text));
        return h;
      }
      case 'quote': {
        var bq = el('blockquote', 'prose__quote');
        bq.appendChild(el('p', null, '“' + block.text + '”'));
        return bq;
      }
      case 'scripture': {
        var aside = el('aside', 'prose__scripture');
        aside.appendChild(el('p', 'prose__scripture-text', '“' + block.text + '”'));
        aside.appendChild(el('cite', 'prose__scripture-ref', block.ref));
        return aside;
      }
      default:
        return null;
    }
  }

  function buildBody(post, blocks, html) {
    var article = el('article', 'prose');
    var wrap = el('div', 'wrap wrap--narrow');

    if (blocks && blocks.length) {
      // Cuerpo curado a mano (bloques estructurados).
      blocks.forEach(function (b) {
        var node = buildBlock(b);
        if (node) wrap.appendChild(node);
      });
    } else if (html) {
      // Cuerpo HTML importado de WordPress, con estilo editorial heredado.
      var holder = el('div', 'prose__html');
      holder.innerHTML = html;
      wrap.appendChild(holder);
    } else {
      // Último recurso: el escrito aún no tiene cuerpo dentro del sitio.
      if (post.excerpt) wrap.appendChild(el('p', 'prose__lead', post.excerpt));
      var box = el('div', 'prose__fallback');
      box.appendChild(el('span', 'prose__fallback-lbl', 'Escrito completo'));
      box.appendChild(el('p', 'prose__p',
        'Este escrito todavía no se ha publicado dentro del sitio. ' +
        'Puedes leerlo completo en su publicación original.'));
      var btn = el('a', 'prose__fallback-btn', 'Leer el escrito completo →');
      btn.href = post.url;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
      box.appendChild(btn);
      wrap.appendChild(box);
    }

    article.appendChild(wrap);
    return article;
  }

  // Cuenta de palabras a partir de HTML (para el tiempo de lectura).
  function wordsFromHtml(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    var t = (tmp.textContent || '').trim();
    return t ? t.split(/\s+/).filter(Boolean).length : 0;
  }

  // ------------------------------------------------------------------------
  // ARTICLE FOOTER (share + tags + signature + prev/next)
  // ------------------------------------------------------------------------
  function buildFooter(post, prev, next) {
    var shareUrl = encodeURIComponent(post.url);
    // Formato del texto al compartir: Título — Por: Ps. Oscar I. Morales — #SecundumFidem
    var shareText = encodeURIComponent(
      post.title + ' — Por: Ps. Oscar I. Morales — #SecundumFidem');

    var section = el('section', 'afoot');
    var wrap = el('div', 'wrap wrap--narrow');

    // Share
    var share = el('div', 'afoot__share');
    share.appendChild(el('span', 'afoot__share-lbl', 'Compartir este escrito'));
    var row = el('div', 'afoot__share-row');

    var wa = el('a', 'afoot__share-btn', 'WhatsApp');
    wa.href = 'https://wa.me/?text=' + shareText + '%20' + shareUrl;
    var fb = el('a', 'afoot__share-btn', 'Facebook');
    // Facebook ignora el texto prellenado (política suya); solo respeta el hashtag.
    fb.href = 'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl +
              '&hashtag=%23SecundumFidem&quote=' + shareText;
    var tw = el('a', 'afoot__share-btn', 'X');
    tw.href = 'https://x.com/intent/post?text=' + shareText + '&url=' + shareUrl;
    [wa, fb, tw].forEach(function (a) {
      a.target = '_blank'; a.rel = 'noopener noreferrer';
      row.appendChild(a);
    });

    var copyBtn = el('button', 'afoot__share-btn afoot__share-btn--copy', 'Copiar enlace');
    copyBtn.type = 'button';
    row.appendChild(copyBtn);
    share.appendChild(row);

    var linkWrap = el('div', 'afoot__share-link-wrap');
    linkWrap.style.display = 'none';
    var linkInput = el('input', 'afoot__share-link');
    linkInput.readOnly = true;
    linkInput.value = post.url;
    linkInput.setAttribute('aria-label', 'Enlace del escrito');
    linkInput.addEventListener('focus', function () { linkInput.select(); });
    var hint = el('span', 'afoot__share-hint',
      'Selecciónalo y copia (Ctrl/Cmd + C).');
    linkWrap.appendChild(linkInput);
    linkWrap.appendChild(hint);
    share.appendChild(linkWrap);

    var copyTimer = 0;
    copyBtn.addEventListener('click', function () {
      linkWrap.style.display = 'flex';
      var ok = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(post.url);
          ok = true;
        }
      } catch (e) {}
      requestAnimationFrame(function () {
        linkInput.focus();
        linkInput.select();
        try { if (document.execCommand('copy')) ok = true; } catch (e) {}
        copyBtn.textContent = ok ? '¡Copiado!' : 'Copiar enlace';
        hint.textContent = ok
          ? 'Copiado. Si no, selecciónalo y copia (Ctrl/Cmd + C).'
          : 'Selecciónalo y copia (Ctrl/Cmd + C).';
        if (copyTimer) clearTimeout(copyTimer);
        copyTimer = setTimeout(function () {
          copyBtn.textContent = 'Copiar enlace';
        }, 2600);
      });
    });
    wrap.appendChild(share);

    // Tags
    var tags = el('div', 'afoot__tags');
    tags.appendChild(el('span', 'afoot__tags-lbl', 'Temas'));
    var tagsRow = el('div', 'afoot__tags-row');
    post.cats.forEach(function (c) {
      var a = el('a', 'afoot__tag', c);
      a.href = 'index.html#archivo';
      tagsRow.appendChild(a);
    });
    tags.appendChild(tagsRow);
    wrap.appendChild(tags);

    // Signature
    var sig = el('div', 'afoot__signature');
    var sigLogo = el('img', 'afoot__signature-logo');
    sigLogo.src = 'project/assets/logo-icon.png';
    sigLogo.alt = 'Oscar I. Morales';
    sig.appendChild(sigLogo);
    sig.appendChild(el('span', 'afoot__signature-name', 'OSCAR I. MORALES'));
    sig.appendChild(el('span', 'afoot__signature-tag', 'Secundum Fidem'));
    wrap.appendChild(sig);

    // Prev / Next
    var navGrid = el('div', 'afoot__nav');
    navGrid.appendChild(buildNavCard('prev', prev));
    navGrid.appendChild(buildNavCard('next', next));
    wrap.appendChild(navGrid);

    section.appendChild(wrap);
    return section;
  }

  function buildNavCard(dir, post) {
    var isPrev = dir === 'prev';
    if (post) {
      var a = el('a', 'afoot__nav-card afoot__nav-card--' + dir);
      a.href = postPage(post.n);
      a.appendChild(el('span', 'afoot__nav-lbl', isPrev ? '← Anterior' : 'Siguiente →'));
      a.appendChild(el('span', 'afoot__nav-title', post.title));
      var num = el('span', 'afoot__nav-num');
      num.innerHTML = '<sup>N.&deg;</sup>';
      num.appendChild(document.createTextNode(String(post.n)));
      a.appendChild(num);
      return a;
    }
    // Empty edge cards
    var c = el('a', 'afoot__nav-card afoot__nav-card--' + dir + ' afoot__nav-card--empty');
    if (isPrev) {
      c.href = 'index.html#archivo';
      c.appendChild(el('span', 'afoot__nav-lbl', '← Archivo'));
      c.appendChild(el('span', 'afoot__nav-title', 'Ver todos los escritos'));
      c.appendChild(el('span', 'afoot__nav-num', 'desde 2014'));
    } else {
      c.href = 'index.html';
      c.appendChild(el('span', 'afoot__nav-lbl', 'Inicio →'));
      c.appendChild(el('span', 'afoot__nav-title', 'Volver al inicio'));
      c.appendChild(el('span', 'afoot__nav-num', 'Secundum Fidem'));
    }
    return c;
  }

  // ------------------------------------------------------------------------
  // RELATED
  // ------------------------------------------------------------------------
  function relatedPosts(post) {
    var cats = {};
    post.cats.forEach(function (c) { cats[c] = true; });
    var sameCat = POSTS.filter(function (p) {
      return p.n !== post.n && p.cats.some(function (c) { return cats[c]; });
    });
    var seen = {}, pick = [];
    function add(arr) {
      for (var i = 0; i < arr.length && pick.length < 3; i++) {
        var p = arr[i];
        if (!seen[p.n]) { seen[p.n] = true; pick.push(p); }
      }
    }
    add(sameCat.filter(function (p) { return p.image; }));
    add(POSTS.filter(function (p) { return p.n !== post.n && p.image; }));
    add(sameCat);
    return pick.slice(0, 3);
  }

  function buildRelated(posts) {
    var section = el('section', 'related');
    var wrap = el('div', 'wrap');
    var head = el('div', 'related__head');
    head.appendChild(el('span', 'related__eb', 'Sigue leyendo'));
    head.appendChild(el('h2', 'related__title', 'Otros escritos del mismo camino.'));
    wrap.appendChild(head);

    var grid = el('div', 'related__grid');
    posts.forEach(function (p) {
      var card = el('a', 'rel-card');
      card.href = postPage(p.n);
      var media = el('div', 'rel-card__media');
      media.appendChild(makeImg(p, p.title));
      card.appendChild(media);
      card.appendChild(el('h3', 'rel-card__title', p.title));
      var meta = el('div', 'rel-card__meta');
      meta.appendChild(el('span', null, p.cats[0]));
      meta.appendChild(el('span', 'rel-card__meta-sep', '·'));
      meta.appendChild(el('span', null, fmtDate(p.date)));
      card.appendChild(meta);
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    section.appendChild(wrap);
    return section;
  }

  // ------------------------------------------------------------------------
  // NEWS + FOOTER (self-contained, mirrors the landing)
  // ------------------------------------------------------------------------
  function buildNews() {
    var section = el('section', 'news');
    section.id = 'suscribir';
    section.innerHTML =
      '<div class="wrap"><div class="news__inner">' +
        '<div class="news__left">' +
          '<h2 class="news__title">Un correo cuando hay <em>algo nuevo</em>.</h2>' +
          '<p class="news__sub">Sin agenda fija. Cuando publico, te aviso — con la entrada y una ' +
          'línea de contexto. Te puedes ir cuando quieras.</p>' +
        '</div>' +
        '<form class="news__form" id="js-news-form">' +
          '<div class="news__field"><label for="news-name">TU NOMBRE</label>' +
            '<input id="news-name" type="text" placeholder="Cómo te llaman en casa" /></div>' +
          '<div class="news__field"><label for="news-email">TU CORREO</label>' +
            '<input id="news-email" type="email" placeholder="tucorreo@ejemplo.com" required /></div>' +
          '<button type="submit" class="news__submit">Recibir avisos →</button>' +
          '<p class="news__fine">Sin publicidad. Sin compartir tu correo. Sólo nuevos escritos.</p>' +
        '</form>' +
      '</div></div>';
    return section;
  }

  function buildSiteFooter() {
    var footer = el('footer', 'footer');
    var year = new Date().getFullYear();
    footer.innerHTML =
      '<div class="wrap"><div class="footer__grid">' +
        '<div class="footer__brand">' +
          '<div class="footer__brand-row">' +
            '<img src="project/assets/logo-icon.png" alt="" ' +
              'style="filter:brightness(0) saturate(100%) invert(60%) sepia(34%) saturate(454%) hue-rotate(338deg) brightness(91%) contrast(85%)" />' +
            '<span class="footer__brand-stack">' +
              '<span class="footer__brand-name">Oscar I. Morales</span>' +
              '<span class="footer__brand-tagline">Secundum Fidem</span>' +
            '</span>' +
          '</div>' +
          '<p class="footer__tagline">Notas sobre la fe, la familia y la vida común — un blog ' +
          'escrito desde Guatemala, desde 2014.</p>' +
        '</div>' +
        '<div class="footer__col"><h4>Sitio</h4><ul>' +
          '<li><a href="index.html">Inicio</a></li>' +
          '<li><a href="index.html#archivo">Blog &middot; Archivo</a></li>' +
          '<li><a href="index.html#suscribir">Suscribirme</a></li>' +
        '</ul></div>' +
        '<div class="footer__col"><h4>Redes</h4><ul>' +
          '<li><a href="https://www.facebook.com/oscarimoraless" target="_blank" rel="noopener">Facebook</a></li>' +
          '<li><a href="https://twitter.com/oscarimoraless" target="_blank" rel="noopener">X &middot; Twitter</a></li>' +
          '<li><a href="https://www.instagram.com/oscarimorales" target="_blank" rel="noopener">Instagram</a></li>' +
          '<li><a href="mailto:me@oscarimorales.com">Correo</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="footer__bottom">' +
        '<span>© ' + year + ' Oscar I. Morales · Secundum Fidem</span>' +
        '<span>Guatemala</span>' +
      '</div></div>';
    return footer;
  }

  // ------------------------------------------------------------------------
  // SEO — metadatos por artículo (Open Graph, Twitter, canonical, JSON-LD)
  // ------------------------------------------------------------------------
  function metaText(s, max) {
    s = String(s || '').replace(/\s+/g, ' ').trim();
    if (s.length <= max) return s;
    var cut = s.slice(0, max);
    var sp = cut.lastIndexOf(' ');
    return (sp > 40 ? cut.slice(0, sp) : cut).replace(/[\s,;:.]+$/, '') + '…';
  }

  function describePost(post, html, blocks) {
    if (post.excerpt) return metaText(post.excerpt, 175);
    var text = '';
    if (blocks && blocks.length) {
      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].type === 'lead' || blocks[i].type === 'p') { text = blocks[i].text; break; }
      }
    } else if (html) {
      var tmp = document.createElement('div');
      tmp.innerHTML = html;
      text = tmp.textContent || '';
    }
    return metaText(text, 175) ||
      'Un escrito de Oscar I. Morales · Secundum Fidem.';
  }

  function setMeta(selector, content) {
    var m = document.head.querySelector(selector);
    if (m) m.setAttribute('content', content);
  }

  function applySeo(post, html, blocks) {
    // La URL canónica/compartible es siempre la página estática del post.
    var url = post.url;
    var desc = describePost(post, html, blocks);
    var img = post.image || (SITE_DEFAULT_IMAGE);

    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', post.title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', post.title);
    setMeta('meta[name="twitter:description"]', desc);
    if (img) {
      setMeta('meta[property="og:image"]', img);
      setMeta('meta[name="twitter:image"]', img);
      var alt = post.title + ' — Oscar I. Morales';
      setMeta('meta[property="og:image:alt"]', alt);
      setMeta('meta[name="twitter:image:alt"]', alt);
    }
    var canon = document.getElementById('js-canonical');
    if (canon) canon.setAttribute('href', url);

    // article:published_time + section (se crean si no existen)
    ensureMeta('property', 'article:published_time').setAttribute('content', post.date);
    ensureMeta('property', 'article:author').setAttribute('content', 'Oscar I. Morales');
    if (post.cats && post.cats[0]) {
      ensureMeta('property', 'article:section').setAttribute('content', post.cats[0]);
    }

    // JSON-LD BlogPosting
    var ld = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: desc,
      datePublished: post.date,
      inLanguage: 'es',
      url: url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      author: { '@type': 'Person', name: 'Oscar I. Morales' },
      publisher: {
        '@type': 'Person',
        name: 'Oscar I. Morales',
        logo: { '@type': 'ImageObject',
          url: 'https://oscarim79.github.io/oscarimorales-web/project/assets/logo-icon.png' }
      }
    };
    if (img) ld.image = img;
    if (post.cats) ld.keywords = post.cats.join(', ');
    var holder = document.getElementById('js-jsonld');
    if (holder) holder.textContent = JSON.stringify(ld);
  }

  function ensureMeta(attr, key) {
    var m = document.head.querySelector('meta[' + attr + '="' + key + '"]');
    if (!m) {
      m = document.createElement('meta');
      m.setAttribute(attr, key);
      document.head.appendChild(m);
    }
    return m;
  }

  // ------------------------------------------------------------------------
  // SELECCIONA PARA COMPARTIR — barra flotante sobre el texto resaltado
  // ------------------------------------------------------------------------
  function initSelectionShare(post) {
    var article = document.querySelector('.prose');
    if (!article) return;
    var url = post.url;
    var SIG = ' — Por: Ps. Oscar I. Morales — #SecundumFidem';

    var bar = el('div', 'selshare');
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'Compartir la frase seleccionada');
    var copyBtn = el('button', 'selshare__btn selshare__btn--copy', 'Copiar');
    copyBtn.type = 'button';
    var waBtn = el('a', 'selshare__btn', 'WhatsApp');
    var xBtn  = el('a', 'selshare__btn', 'X');
    var fbBtn = el('a', 'selshare__btn', 'Facebook');
    [copyBtn, waBtn, xBtn, fbBtn].forEach(function (b) { bar.appendChild(b); });
    document.body.appendChild(bar);

    var current = '';

    function quoted(text) { return '“' + text + '”' + SIG; }
    function hide() { bar.classList.remove('selshare--on'); }

    function selText() {
      var sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) return '';
      if (!sel.anchorNode || !article.contains(sel.anchorNode)) return '';
      return sel.toString().replace(/\s+/g, ' ').trim();
    }

    function place(sel) {
      var rect = sel.getRangeAt(0).getBoundingClientRect();
      if (!rect || (!rect.width && !rect.height)) return false;
      bar.style.top = (window.scrollY + rect.top - 10) + 'px';
      // Centrar sobre la selección, pero sin que la barra se salga de la pantalla
      // (la barra usa translateX(-50%), así que limitamos su centro).
      var vw = document.documentElement.clientWidth;
      var half = (bar.offsetWidth || 220) / 2;
      var margin = 8;
      var cx = rect.left + rect.width / 2;
      cx = Math.max(half + margin, Math.min(vw - half - margin, cx));
      bar.style.left = (window.scrollX + cx) + 'px';
      return true;
    }

    function update() {
      var text = selText();
      if (!text) { hide(); return; }
      current = text;
      var t = quoted(text);
      waBtn.href = 'https://wa.me/?text=' + encodeURIComponent(t + ' ' + url);
      xBtn.href  = 'https://x.com/intent/post?text=' + encodeURIComponent(t) +
                   '&url=' + encodeURIComponent(url);
      fbBtn.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) +
                   '&hashtag=%23SecundumFidem&quote=' + encodeURIComponent(t);
      [waBtn, xBtn, fbBtn].forEach(function (a) {
        a.target = '_blank'; a.rel = 'noopener noreferrer';
      });
      if (place(window.getSelection())) bar.classList.add('selshare--on');
    }

    copyBtn.addEventListener('click', function () {
      var payload = quoted(current) + '\n' + url;
      var ok = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(payload); ok = true;
        }
      } catch (e) {}
      copyBtn.textContent = ok ? '¡Copiado!' : 'Copiar';
      copyBtn.classList.toggle('is-done', ok);
      setTimeout(function () {
        copyBtn.textContent = 'Copiar';
        copyBtn.classList.remove('is-done');
      }, 1800);
    });

    // Mantener la selección al pulsar la barra.
    bar.addEventListener('mousedown', function (e) { e.preventDefault(); });

    document.addEventListener('mouseup', function () { setTimeout(update, 10); });
    document.addEventListener('selectionchange', function () { if (!selText()) hide(); });
    document.addEventListener('scroll', function () {
      if (!bar.classList.contains('selshare--on')) return;
      var sel = window.getSelection();
      if (sel && selText()) place(sel); else hide();
    }, { passive: true });
  }

  // ------------------------------------------------------------------------
  // NOTITA DE LECTURA — aparece al entrar al cuerpo del artículo
  // ------------------------------------------------------------------------
  function initReadNote() {
    try { if (sessionStorage.getItem('readnote-closed') === '1') return; } catch (e) {}
    var article = document.querySelector('.prose');
    if (!article) return;

    var note = el('div', 'readnote');
    note.appendChild(el('p', 'readnote__text',
      'Puedes copiar cualquier frase del texto para compartirla o copiarla.'));
    var close = el('button', 'readnote__close', '×');
    close.type = 'button';
    close.setAttribute('aria-label', 'Cerrar');
    note.appendChild(close);
    document.body.appendChild(note);

    close.addEventListener('click', function () {
      note.classList.remove('readnote--on');
      try { sessionStorage.setItem('readnote-closed', '1'); } catch (e) {}
      setTimeout(function () { if (note.parentNode) note.parentNode.removeChild(note); }, 300);
    });

    function show() { note.classList.add('readnote--on'); }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { show(); io.disconnect(); }
        });
      }, { rootMargin: '0px 0px -40% 0px' });
      io.observe(article);
    } else {
      setTimeout(show, 1200);
    }
  }

  // ------------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------------
  function render() {
    var app = document.getElementById('app');
    if (!POSTS.length) {
      app.appendChild(el('div', null, 'No se pudieron cargar los escritos.'));
      return;
    }

    var n = currentN();
    var idx = POSTS.findIndex(function (p) { return p.n === n; });
    var post = POSTS[idx];
    var prev = POSTS[idx + 1]; // POSTS ordered newest -> oldest
    var next = POSTS[idx - 1];
    var blocks = BODIES[n] || [];
    var html = (!blocks.length) ? (HTML[n] || '') : '';

    // Reading-time estimate (~220 wpm) — desde bloques o desde el HTML importado.
    var wc = blocks.reduce(function (a, b) {
      return a + ((b.text || '').split(/\s+/).filter(Boolean).length);
    }, 0);
    if (!wc && html) wc = wordsFromHtml(html);
    var readMinutes = wc ? Math.max(1, Math.round(wc / 220)) : 0;

    // Título + metadatos SEO (Open Graph, Twitter, canonical, JSON-LD)
    document.title = post.title + ' · Oscar I. Morales';
    applySeo(post, html, blocks);

    var site = el('div', 'site site--post');
    site.appendChild(buildNav());
    site.appendChild(buildCover(post, readMinutes));
    site.appendChild(buildBody(post, blocks, html));
    site.appendChild(buildFooter(post, prev, next));
    site.appendChild(buildRelated(relatedPosts(post)));
    site.appendChild(buildNews());
    site.appendChild(buildSiteFooter());
    app.appendChild(site);

    initProgress();
    initSelectionShare(post);
    initReadNote();

    if (typeof window.wireSubscribe === 'function') {
      window.wireSubscribe(document.getElementById('js-news-form'), {
        success: '¡Gracias! Confirma en el correo que te acabo de enviar para empezar a recibir los escritos.'
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
