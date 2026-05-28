/* global React, POSTS, CATEGORY_DESCS */
const { useState, useMemo } = React;

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------
const MONTHS = ["enero","febrero","marzo","abril","mayo","junio",
                "julio","agosto","septiembre","octubre","noviembre","diciembre"];
const MONTHS_SHORT = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

function fmtDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_SHORT[m - 1]} ${y}`;
}
function fmtDateLong(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
}
function getYear(iso) { return Number(iso.split("-")[0]); }

// Posts que ya tienen su template interno listo (linkean a post.html en lugar
// de a la página original en oscarimorales.com)
const INTERNAL_TEMPLATE_NS = new Set([51]);
function postHref(post) {
  return INTERNAL_TEMPLATE_NS.has(post.n) ? "post.html" : post.url;
}
function postTarget(post) {
  return INTERNAL_TEMPLATE_NS.has(post.n) ? "_self" : "_blank";
}

// Category color helpers (variety without inventing colors)
const CAT_CLASSES = ["cat", "cat cat--alt", "cat cat--mist"];
function catClass(name, i = 0) {
  // Stable assignment per category
  const idx = (name.length + i) % CAT_CLASSES.length;
  return CAT_CLASSES[idx];
}

// ----------------------------------------------------------------------------
// NAV
// ----------------------------------------------------------------------------
const scrollToSection = (id) => {
  const el = id ? document.getElementById(id) : null;
  const target = el
    ? Math.max(0, el.getBoundingClientRect().top + window.scrollY - 72)
    : 0;
  const start = window.scrollY;
  const dist = target - start;
  if (Math.abs(dist) < 2) return;
  const dur = Math.min(900, Math.max(350, Math.abs(dist) * 0.5));
  const t0 = performance.now();
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, start + dist * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const Nav = () => (
  <nav className="nav">
    <div className="nav__inner">
      <button className="nav__brand" onClick={() => scrollToSection(null)}>
        <img src="../../assets/logo-icon.png" alt="OM" />
        <span className="nav__brand-text">
          <span className="nav__wordmark">OSCAR I. MORALES</span>
          <span className="nav__tagline">Secundum Fidem Meam</span>
        </span>
      </button>
      <div className="nav__links">
        <button className="nav__link nav__link--active" onClick={() => scrollToSection(null)}>Inicio</button>
        <button className="nav__link" onClick={() => scrollToSection("archivo")}>Blog</button>
        <button className="nav__cta" onClick={() => scrollToSection("suscribir")}>Suscribirme</button>
      </div>
    </div>
  </nav>
);

// ----------------------------------------------------------------------------
// STAGE — Hero estilo Rottner: foto ambiental + texto masivo apilado
// ----------------------------------------------------------------------------
const Stage = () => {
  const stageRef = React.useRef(null);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    // Activar la cascada de entrada despu\u00e9s del primer frame.
    // Fallback: a los 2.4s removemos la clase para que, si el timeline
    // no progres\u00f3 (iframes pausados, etc.), los textos queden visibles
    // con el estilo por defecto.
    let animTimer = 0;
    const onFrame = requestAnimationFrame(() => {
      el.classList.add("js-anim");
      animTimer = window.setTimeout(() => {
        el.classList.remove("js-anim");
      }, 2400);
    });

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const h = rect.height || 1;
      const p = Math.min(Math.max(-rect.top / h, 0), 1.2);
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--p-fade", String(Math.max(0, 1 - p * 1.6).toFixed(4)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(onFrame);
      if (animTimer) clearTimeout(animTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="stage" data-screen-label="Stage \u00b7 Secundum Fidem Meam" ref={stageRef}>
      {/* Foto ambiental a sangre completa (parallax lento) */}
      <div className="stage__bg" aria-hidden="true">
        <img src="../../assets/oscar-stage.png" alt="" />
        <div className="stage__bg-grade"></div>
        <div className="stage__bg-vignette"></div>
      </div>

      {/* Topbar */}
      <div className="stage__topbar">
        <div className="wrap stage__topbar-inner">
          <span className="stage__eyebrow">
            <span className="stage__eyebrow-dot" aria-hidden="true"></span>
            El blog de Oscar I. Morales
          </span>
          <span className="stage__lede">
            Notas desde 2014 &middot; Guatemala
          </span>
        </div>
      </div>

      {/* T\u00edtulo masivo apilado (parallax r\u00e1pido) */}
      <div className="stage__title-wrap">
        <div className="wrap stage__title-inner">
          <div className="stage__panel">
            <span className="stage__kicker">Pastor &middot; Autor &middot; Guatemala</span>
            <h1 className="stage__title" aria-label="Secundum Fidem Meam">
              <span className="stage__title-line">Secundum</span>
              <span className="stage__title-line">Fidem</span>
              <span className="stage__title-line">Meam</span>
            </h1>
            <span className="stage__translation">&laquo;Seg&uacute;n mi fe&raquo;</span>
            <p className="stage__value">
              Ensayos y meditaciones para pensar el evangelio despacio.
              Suscr&iacute;bete y recibe <em>una lectura para empezar</em> &mdash;
              y un aviso cuando hay algo nuevo.
            </p>
            <form
              className="stage__capture"
              onSubmit={(e) => { e.preventDefault(); alert("Gracias. Te env\u00edo una lectura para empezar a tu correo."); }}
            >
              <input
                type="email"
                className="stage__capture-input"
                placeholder="tucorreo@ejemplo.com"
                aria-label="Tu correo"
                required
              />
              <button type="submit" className="stage__capture-btn">Recibir &rarr;</button>
            </form>
            <div className="stage__capture-foot">
              <span className="stage__capture-fine">Sin spam. Solo escritos. Te puedes ir cuando quieras.</span>
              <a className="stage__secondary" href="#empezar">o mira d&oacute;nde empezar &darr;</a>
            </div>
          </div>
        </div>
      </div>

      {/* Riel inferior — puente a la sección "Empieza aquí" */}
      <div className="stage__footrail">
        <div className="wrap stage__footrail-inner">
          <span className="stage__footrail-note">
            Notas sobre la fe, la familia y la vida com&uacute;n &mdash; desde 2014.
          </span>
          <a className="stage__footrail-link" href="#empezar">
            Empieza aqu&iacute;
            <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </div>

      {/* Indicador de scroll removido a petición del usuario */}
    </section>
  );
};

// ----------------------------------------------------------------------------
// EMPIEZA AQUÍ — puerta de entrada (discovery + serie de libros + suscripción)
// ----------------------------------------------------------------------------
const StartHere = ({ firstYear }) => {
  const years = new Date().getFullYear() - firstYear;
  return (
    <section className="start" id="empezar">
      <div className="wrap">
        <div className="start__head">
          <span className="start__eb">Empieza aqu&iacute;</span>
          <h2 className="start__title">
            Tres maneras de <em>entrar</em>.
          </h2>
          <p className="start__lead">
            {years} a&ntilde;os escribiendo sobre la fe, la familia y la vida com&uacute;n.
            No tienes que leerlo todo &mdash; entra por una puerta.
          </p>
        </div>
        <div className="start__grid">
          <a className="start__door" href="#populares">
            <span className="start__door-num">01</span>
            <h3 className="start__door-title">&iquest;Primera vez aqu&iacute;?</h3>
            <p className="start__door-desc">
              Empieza por lo m&aacute;s le&iacute;do &mdash; los escritos por los que
              la mayor&iacute;a llega y se queda.
            </p>
            <span className="start__door-cta">Ver los esenciales &rarr;</span>
          </a>
          <a className="start__door start__door--feature" href="#suscribir">
            <div className="start__door-toprow">
              <span className="start__door-num">02</span>
              <span className="start__door-tag">Pronto</span>
            </div>
            <h3 className="start__door-title">La serie de libros</h3>
            <p className="start__door-desc">
              Estoy escribiendo una serie sobre <span className="start__edit">[tema de la serie]</span>.
              Los suscriptores ser&aacute;n los primeros en saber &mdash; y en leer
              los primeros cap&iacute;tulos.
            </p>
            <span className="start__door-cta">Av&iacute;same primero &rarr;</span>
          </a>
          <a className="start__door" href="#suscribir">
            <span className="start__door-num">03</span>
            <h3 className="start__door-title">Recibe los nuevos</h3>
            <p className="start__door-desc">
              Un correo cuando publico, con una l&iacute;nea de contexto. Sin agenda
              fija, sin ruido.
            </p>
            <span className="start__door-cta">Suscribirme &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------------
// FEATURED — último publicado (carrusel de los más recientes)
// ----------------------------------------------------------------------------
const Featured = ({ posts }) => {
  const n = posts.length;
  const [i, setI] = React.useState(0);
  const [src, setSrc] = React.useState(() => posts[0].image || makeCover(posts[0]));
  const [entered, setEntered] = React.useState(true);
  const hoverRef = React.useRef(false);
  const post = posts[i];

  React.useEffect(() => { setSrc(posts[i].image || makeCover(posts[i])); }, [i]);

  // Fundido de entrada dirigido por JS (rAF + respaldo por timeout) para que la
  // visibilidad NO dependa de que el timeline de @keyframes avance en el preview.
  React.useEffect(() => {
    setEntered(false);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(() => setEntered(true)); });
    const t = setTimeout(() => setEntered(true), 140);
    return () => { cancelAnimationFrame(raf1); if (raf2) cancelAnimationFrame(raf2); clearTimeout(t); };
  }, [i]);

  const go = (dir) => setI((prev) => (prev + dir + n) % n);

  React.useEffect(() => {
    if (n < 2) return;
    const id = setInterval(() => {
      if (!hoverRef.current) setI((prev) => (prev + 1) % n);
    }, 4500);
    return () => clearInterval(id);
  }, [n]);

  const excerpt = post.excerpt || post.quote || "";

  return (
    <section
      className="featured"
      id="ultimo"
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={() => { hoverRef.current = false; }}
    >
      <div className="wrap">
        <div className="featured__head">
          <span className="featured__eb">Último publicado</span>
        </div>

        <div className="slider">
          <div className="slider__stage">
            <a
              key={i}
              className={"slider__slide " + (entered ? "is-in" : "is-pre")}
              href={postHref(post)}
              target={postTarget(post)}
              rel="noopener noreferrer"
            >
              <img
                className="slider__img"
                src={src}
                alt={post.title}
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                onError={() => setSrc(makeCover(post))}
              />
              <div className="slider__scrim" aria-hidden="true"></div>
              <div className="slider__caption">
                <div className="slider__cats">
                  {post.cats.map((c, idx) => (
                    <span key={c} className={catClass(c, idx)}>{c}</span>
                  ))}
                </div>
                <h2 className="slider__title">{post.title}</h2>
                <div className="slider__meta">
                  <span className="slider__metaitem">
                    <svg className="slider__ico" viewBox="0 0 16 16" aria-hidden="true">
                      <rect x="2" y="3" width="12" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                      <line x1="2" y1="6.5" x2="14" y2="6.5" stroke="currentColor" strokeWidth="1.3" />
                      <line x1="5" y1="1.4" x2="5" y2="4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      <line x1="11" y1="1.4" x2="11" y2="4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    {fmtDateLong(post.date)}
                  </span>
                  <span className="slider__metaitem">
                    <svg className="slider__ico" viewBox="0 0 16 16" aria-hidden="true">
                      <circle cx="8" cy="5" r="3" fill="none" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M2.6 14c0-3 2.4-5 5.4-5s5.4 2 5.4 5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    Oscar I. Morales
                  </span>
                </div>
                <span className="slider__read">Leer ensayo completo &rarr;</span>
              </div>
            </a>

            <button className="slider__arrow slider__arrow--prev" onClick={() => go(-1)} aria-label="Anterior">&lsaquo;</button>
            <button className="slider__arrow slider__arrow--next" onClick={() => go(1)} aria-label="Siguiente">&rsaquo;</button>

            <div className="slider__thumbs" role="tablist" aria-label="Posts recientes">
              {posts.map((p, idx) => (
                <button
                  key={p.n}
                  className={"slider__thumb" + (idx === i ? " is-active" : "")}
                  style={{ backgroundImage: `url("${p.image || makeCover(p)}")` }}
                  onClick={() => setI(idx)}
                  aria-label={`Ver "${p.title}"`}
                  aria-selected={idx === i}
                ></button>
              ))}
            </div>
          </div>

          {excerpt
            ? <div key={"x" + i} className={"slider__excerpt " + (entered ? "is-in" : "is-pre")}>
                <p>{excerpt}</p>
                <a className="slider__excerpt-link" href={postHref(post)} target={postTarget(post)} rel="noopener noreferrer">
                  Seguir leyendo &rarr;
                </a>
              </div>
            : null}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------------
// POPULAR — más leídos (6-up, sobre fondo Noche)
// ----------------------------------------------------------------------------
const PostCard = ({ post }) => {
  const [src, setSrc] = React.useState(post.image || makeCover(post));
  const [y, m, d] = post.date.split("-").map(Number);
  return (
    <a className="popcard"
       href={postHref(post)} target={postTarget(post)} rel="noopener noreferrer">
      <div className="popcard__media">
        <img
          src={src}
          alt={post.title}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          onError={() => setSrc(makeCover(post))}
        />
        <div className="popcard__date" aria-hidden="true">
          <span className="popcard__date-m">{MONTHS_SHORT[m - 1].toUpperCase()}</span>
          <span className="popcard__date-d">{d}</span>
        </div>
      </div>
      <h3 className="popcard__title">{post.title}</h3>
      <div className="popcard__meta">
        <span className="popcard__cats">{post.cats.join(", ")}</span>
        <span className="popcard__meta-sep">·</span>
        <span className="popcard__author">Por Oscar I. Morales</span>
        <span className="popcard__meta-sep">·</span>
        <span className="popcard__date-long">{d} {MONTHS[m - 1]}, {y}</span>
      </div>
    </a>
  );
};

const Popular = ({ posts }) => (
  <section className="popular" id="populares">
    <div className="wrap">
      <div className="popular__head">
        <div>
          <span className="popular__eb">Más leídos</span>
          <h2 className="popular__title">Los que más han caminado.</h2>
        </div>
      </div>
      <div className="popular__grid">
        {posts.map(p => <PostCard key={p.n} post={p} />)}
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// THEMES — por tema (dark)
// ----------------------------------------------------------------------------
const ThemeCard = ({ name, count, desc }) => (
  <a className="theme" href="#archivo">
    <div className="theme__top">
      <span className="theme__count">{String(count).padStart(2, "0")}</span>
      <span className="theme__count-lbl">Escritos</span>
    </div>
    <h3 className="theme__name">{name}</h3>
    <p className="theme__desc">{desc}</p>
  </a>
);

const Themes = ({ themes }) => (
  <section className="themes">
    <div className="wrap">
      <div className="themes__head">
        <div>
          <span className="themes__eb">Por tema</span>
          <h2 className="themes__title">Entrar por una puerta.</h2>
        </div>
        <p className="themes__sub">
          Cada tema reúne lo que se ha escrito al respecto, desde 2014.
        </p>
      </div>
      <div className="themes__grid">
        {themes.map(t => (
          <ThemeCard key={t.name} name={t.name} count={t.count} desc={t.desc} />
        ))}
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// ARCHIVE — lista cronológica agrupada por año
// ----------------------------------------------------------------------------
const ArchiveEntry = ({ post }) => (
  <a className="archive__entry" href={postHref(post)} target={postTarget(post)} rel="noopener noreferrer">
    <span className="archive__entry-num"><sup>N.º</sup>{post.n}</span>
    <div className="archive__entry-body">
      <h4 className="archive__entry-title">{post.title}</h4>
      <div className="archive__entry-cats">
        {post.cats.map(c => <span key={c}>{c}</span>)}
      </div>
    </div>
    <span className="archive__entry-date">{fmtDate(post.date).toUpperCase()}</span>
  </a>
);

const Archive = ({ posts, activeFilter, onFilter, allCats }) => {
  // Group filtered posts by year
  const filtered = activeFilter === "Todos"
    ? posts
    : posts.filter(p => p.cats.includes(activeFilter));

  const grouped = {};
  filtered.forEach(p => {
    const y = getYear(p.date);
    (grouped[y] = grouped[y] || []).push(p);
  });
  const years = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  return (
    <section className="archive" id="archivo">
      <div className="wrap">
        <div className="archive__head">
          <div>
            <span className="archive__eb">Archivo completo</span>
            <h2 className="archive__title">Todo, ordenado por año.</h2>
          </div>
          <div className="archive__filter-wrap">
            <label className="archive__filter-lbl" htmlFor="theme-filter">Filtrar por tema</label>
            <div className="archive__select">
              <select
                id="theme-filter"
                value={activeFilter}
                onChange={(e) => onFilter(e.target.value)}
              >
                <option value="Todos">Todos los temas &middot; {posts.length}</option>
                {allCats.map(c => (
                  <option key={c.name} value={c.name}>{c.name} &middot; {c.count}</option>
                ))}
              </select>
              <span className="archive__select-caret" aria-hidden="true">▾</span>
            </div>
          </div>
        </div>
        {years.map(year => (
          <div key={year} className="archive__year">
            <div>
              <div className="archive__year-num">{year}</div>
              <span className="archive__year-count">{grouped[year].length} escritos</span>
            </div>
            <div className="archive__list">
              {grouped[year].map(p => <ArchiveEntry key={p.n} post={p} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------------
// NEWSLETTER + FOOTER (compartidos del kit anterior pero simplificados)
// ----------------------------------------------------------------------------
const News = () => {
  const [email, setEmail] = useState("");
  return (
    <section className="news" id="suscribir">
      <div className="wrap">
        <div className="news__inner">
          <div className="news__left">
            <span className="news__eb">La lista de correo</span>
            <h2 className="news__title">Recibe una <em>lectura para empezar</em>.</h2>
            <p className="news__sub">
              Al suscribirte te llega un escrito escogido para comenzar. Despu&eacute;s,
              solo un correo cuando publico algo nuevo &mdash; con una l&iacute;nea
              de contexto. Te puedes ir cuando quieras.
            </p>
            <ul className="news__list">
              <li>Una lectura escogida, apenas te suscribes.</li>
              <li>Aviso de cada nuevo ensayo o meditaci&oacute;n.</li>
              <li>Acceso anticipado a la serie de libros que viene.</li>
            </ul>
          </div>
          <form className="news__form" onSubmit={(e) => { e.preventDefault(); alert("Gracias por suscribirte."); }}>
            <div className="news__field">
              <label htmlFor="news-name">TU NOMBRE</label>
              <input id="news-name" type="text" placeholder="Cómo te llaman en casa" />
            </div>
            <div className="news__field">
              <label htmlFor="news-email">TU CORREO</label>
              <input
                id="news-email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="news__submit">Recibir mi lectura →</button>
            <p className="news__fine">
              Sin publicidad. Sin compartir tu correo. Sólo nuevos escritos.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="wrap">
      <div className="footer__grid">
        <div className="footer__brand">
          <div className="footer__brand-row">
            <img src="../../assets/logo-icon.png" alt=""
              style={{ filter: "brightness(0) saturate(100%) invert(60%) sepia(34%) saturate(454%) hue-rotate(338deg) brightness(91%) contrast(85%)" }} />
            <span className="footer__brand-stack">
              <span className="footer__brand-name">Oscar I. Morales</span>
              <span className="footer__brand-tagline">Secundum Fidem Meam</span>
            </span>
          </div>
          <p className="footer__tagline">
            Notas sobre la fe, la familia y la vida común.
          </p>
        </div>
        <div className="footer__col">
          <h4>Sitio</h4>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#archivo">Blog · Archivo</a></li>
            <li><a href="#suscribir">Suscribirme</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Redes</h4>
          <ul>
            <li><a href="https://www.facebook.com/oscarimoraless" target="_blank" rel="noopener">Facebook</a></li>
            <li><a href="https://twitter.com/oscarimoraless" target="_blank" rel="noopener">X · Twitter</a></li>
            <li><a href="https://www.instagram.com/oscarimorales" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="mailto:me@oscarimorales.com">Correo</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Oscar I. Morales · Secundum Fidem Meam</span>
        <span>Guatemala</span>
      </div>
    </div>
  </footer>
);

// ----------------------------------------------------------------------------
// APP
// ----------------------------------------------------------------------------
const BODY_FONTS = {
  Spectral: '"Spectral", Georgia, serif',
  Lora: '"Lora", Georgia, serif',
  Merriweather: '"Merriweather", Georgia, serif',
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bodyFont": "Spectral",
  "leading": 1.68
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [filter, setFilter] = useState("Todos");

  // Compute categories with counts
  const allCats = useMemo(() => {
    const map = new Map();
    POSTS.forEach(p => p.cats.forEach(c => map.set(c, (map.get(c) || 0) + 1)));
    return [...map.entries()]
      .map(([name, count]) => ({ name, count, desc: CATEGORY_DESCS[name] || "" }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const featured = POSTS[0]; // most recent
  const popular = useMemo(() => {
    // Priorizar SIEMPRE los posts que tienen imagen, para que la cuadrícula
    // lidere con imágenes reales y los numerales (posts sin imagen) queden al final.
    const withImg = POSTS.filter(p => p.image);
    const featNoImg = POSTS.filter(p => !p.image && p.featured);
    const seen = new Set();
    const pick = [];
    for (const p of [...withImg, ...featNoImg, ...POSTS]) {
      if (pick.length >= 9) break;
      if (!seen.has(p.n)) { seen.add(p.n); pick.push(p); }
    }
    return pick;
  }, []);
  const firstYear = Math.min(...POSTS.map(p => getYear(p.date)));

  const siteStyle = {
    "--font-body": BODY_FONTS[t.bodyFont] || BODY_FONTS.Spectral,
    "--body-leading": t.leading,
  };

  return (
    <div className="site" style={siteStyle}>
      <Nav />
      <Stage />
      <StartHere firstYear={firstYear} />
      <Featured posts={POSTS.slice(0, 5)} />
      <Popular posts={popular} />
      <Archive posts={POSTS} activeFilter={filter} onFilter={setFilter} allCats={allCats.slice(0, 10)} />
      <News />
      <Footer />
      <TweaksPanel>
        <TweakSection label="Tipograf\u00eda" />
        <TweakRadio
          label="Fuente de cuerpo"
          value={t.bodyFont}
          options={["Spectral", "Lora", "Merriweather"]}
          onChange={(v) => setTweak("bodyFont", v)}
        />
        <TweakSlider
          label="Interlineado"
          value={t.leading}
          min={1.5}
          max={1.8}
          step={0.02}
          onChange={(v) => setTweak("leading", v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
