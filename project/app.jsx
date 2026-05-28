/* global React, POSTS, CATEGORY_DESCS */
const { useState, useMemo } = React;

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------
const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
"julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const MONTHS_SHORT = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function fmtDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_SHORT[m - 1]} ${y}`;
}
function fmtDateLong(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
}
function getYear(iso) {return Number(iso.split("-")[0]);}

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
const Nav = () =>
<nav className="nav">
    <div className="nav__inner">
      <button className="nav__brand">
        <img src="../../assets/logo-icon.png" alt="OM" />
        <span className="nav__brand-text">
          <span className="nav__wordmark">OSCAR I. MORALES</span>
          <span className="nav__tagline">Secundum Fidem</span>
        </span>
      </button>
      <div className="nav__links">
        <button className="nav__link nav__link--active">Inicio</button>
        <button className="nav__link">Blog</button>
        <button className="nav__cta">Suscribirme</button>
      </div>
    </div>
  </nav>;


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
    <section className="stage" data-screen-label="Stage \u00b7 Secundum Fidem" ref={stageRef}>
      {/* Foto ambiental a sangre completa (parallax lento) */}
      <div className="stage__bg" aria-hidden="true">
        <img src="../../assets/oscar-stage.png" alt="" />
        <img src="../../assets/oscar-stage.png" alt="" className="stage__bg-focus" />
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
      <div className="stage__title-wrap" style={{ opacity: "1", fontFamily: "\"Proxima Nova\"", fontWeight: "100", fontSize: "6px" }}>
        <div className="wrap stage__title-inner" style={{ fontSize: "176px" }}>
          <h1 className="stage__title" aria-label="Secundum Fidem">
            <span className="stage__title-line stage__title-line--outline">Secundum</span>
            <span className="stage__title-line stage__title-line--solid">Fidem</span>
          </h1>
          <span className="stage__subline" style={{ fontSize: "20px", textAlign: "right", letterSpacing: "49.2px", width: "666px" }}>
            <span className="stage__subline-rule" aria-hidden="true"></span>
            Seg&uacute;n mi fe
          </span>
        </div>
      </div>

      {/* Riel inferior */}
      <div className="stage__footrail">
        <div className="wrap stage__footrail-inner">
          <a className="stage__cta" href="#archivo">
            Entrar al archivo
            <span aria-hidden="true">&darr;</span>
          </a>
          <span className="stage__counter">
            <span className="stage__counter-num">N.&deg;01</span>
            <span className="stage__counter-lbl">Tomo I &middot; MMXXVI</span>
          </span>
        </div>
      </div>

      {/* Indicador de scroll removido a petición del usuario */}
    </section>);

};

// ----------------------------------------------------------------------------
// HERO
// ----------------------------------------------------------------------------
const Hero = ({ totalPosts, totalThemes, firstYear }) =>
<section className="hero">
    <div className="wrap">
      <h1 className="hero__title">
        Notas sobre la fe, la familia y la <em>vida común</em>.
      </h1>
      <div className="hero__row">
        <p className="hero__lead">
          Un archivo de ensayos, meditaciones y apologética &mdash; para los que
          quieren pensar el evangelio despacio.
        </p>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">{totalPosts}</span>
            <span className="hero__stat-lbl">Escritos</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">{totalThemes}</span>
            <span className="hero__stat-lbl">Temas</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">{new Date().getFullYear() - firstYear}</span>
            <span className="hero__stat-lbl">Años escribiendo</span>
          </div>
        </div>
      </div>
    </div>
  </section>;


// ----------------------------------------------------------------------------
// FEATURED — último publicado
// ----------------------------------------------------------------------------
const Featured = ({ post }) => {
  const [imgOk, setImgOk] = React.useState(!!post.image);
  return (
    <section className="featured">
      <div className="wrap">
        <div className="featured__head">
          <span className="featured__eb">Último publicado</span>
          <span className="featured__date">{fmtDateLong(post.date).toUpperCase()}</span>
        </div>
        <a className={"featured__main" + (imgOk ? "" : " featured__main--no-image")}
        href={postHref(post)} target={postTarget(post)} rel="noopener noreferrer">
          <div className="featured__media">
            {post.image && imgOk ?
            <img
              src={post.image}
              alt={post.title}
              referrerPolicy="no-referrer"
              onError={() => setImgOk(false)} /> :

            <div className="featured__num-fallback">
                  <sup>N.º</sup>{post.n}
                </div>}
            {imgOk ?
            <span className="featured__num-stamp"><sup>N.º</sup>{post.n}</span> :
            null}
          </div>
          <div className="featured__body">
            <div className="featured__cats">
              {post.cats.map((c, i) =>
              <span key={c} className={catClass(c, i)}>{c}</span>
              )}
            </div>
            <h2 className="featured__title">{post.title}</h2>
            <span className="featured__read">Leer ensayo completo →</span>
          </div>
        </a>
        {post.quote &&
        <blockquote className="featured__quote">
            <p>&ldquo;{post.quote}&rdquo;</p>
            <footer className="featured__quote-from">
              De <em>{post.title}</em>
            </footer>
          </blockquote>
        }
      </div>
    </section>);

};

// ----------------------------------------------------------------------------
// POPULAR — más leídos (6-up, sobre fondo Noche)
// ----------------------------------------------------------------------------
const PostCard = ({ post }) => {
  const [imgOk, setImgOk] = React.useState(!!post.image);
  const [y, m, d] = post.date.split("-").map(Number);
  return (
    <a className={"popcard" + (imgOk ? "" : " popcard--no-image")}
    href={postHref(post)} target={postTarget(post)} rel="noopener noreferrer">
      <div className="popcard__media">
        {post.image && imgOk ?
        <img
          src={post.image}
          alt={post.title}
          referrerPolicy="no-referrer"
          onError={() => setImgOk(false)} /> :

        <div className="popcard__num-fallback">
              <sup>N.º</sup>{post.n}
            </div>}
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
    </a>);

};

const Popular = ({ posts }) =>
<section className="popular">
    <div className="wrap">
      <div className="popular__head">
        <div>
          <span className="popular__eb">Más leídos</span>
          <h2 className="popular__title">Los que más han caminado.</h2>
        </div>
      </div>
      <div className="popular__grid">
        {posts.map((p) => <PostCard key={p.n} post={p} />)}
      </div>
    </div>
  </section>;


// ----------------------------------------------------------------------------
// THEMES — por tema (dark)
// ----------------------------------------------------------------------------
const ThemeCard = ({ name, count, desc }) =>
<a className="theme" href="#archivo">
    <div className="theme__top">
      <span className="theme__count">{String(count).padStart(2, "0")}</span>
      <span className="theme__count-lbl">Escritos</span>
    </div>
    <h3 className="theme__name">{name}</h3>
    <p className="theme__desc">{desc}</p>
  </a>;


const Themes = ({ themes }) =>
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
        {themes.map((t) =>
      <ThemeCard key={t.name} name={t.name} count={t.count} desc={t.desc} />
      )}
      </div>
    </div>
  </section>;


// ----------------------------------------------------------------------------
// ARCHIVE — lista cronológica agrupada por año
// ----------------------------------------------------------------------------
const ArchiveEntry = ({ post }) =>
<a className="archive__entry" href={postHref(post)} target={postTarget(post)} rel="noopener noreferrer">
    <span className="archive__entry-num"><sup>N.º</sup>{post.n}</span>
    <div className="archive__entry-body">
      <h4 className="archive__entry-title">{post.title}</h4>
      <div className="archive__entry-cats">
        {post.cats.map((c) => <span key={c}>{c}</span>)}
      </div>
    </div>
    <span className="archive__entry-date">{fmtDate(post.date).toUpperCase()}</span>
  </a>;


const Archive = ({ posts, activeFilter, onFilter, allCats }) => {
  // Group filtered posts by year
  const filtered = activeFilter === "Todos" ?
  posts :
  posts.filter((p) => p.cats.includes(activeFilter));

  const grouped = {};
  filtered.forEach((p) => {
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
                onChange={(e) => onFilter(e.target.value)}>
                
                <option value="Todos">Todos los temas &middot; {posts.length}</option>
                {allCats.map((c) =>
                <option key={c.name} value={c.name}>{c.name} &middot; {c.count}</option>
                )}
              </select>
              <span className="archive__select-caret" aria-hidden="true">▾</span>
            </div>
          </div>
        </div>
        {years.map((year) =>
        <div key={year} className="archive__year">
            <div>
              <div className="archive__year-num">{year}</div>
              <span className="archive__year-count">{grouped[year].length} escritos</span>
            </div>
            <div className="archive__list">
              {grouped[year].map((p) => <ArchiveEntry key={p.n} post={p} />)}
            </div>
          </div>
        )}
      </div>
    </section>);

};

// ----------------------------------------------------------------------------
// NEWSLETTER + FOOTER (compartidos del kit anterior pero simplificados)
// ----------------------------------------------------------------------------
const News = () => {
  const [email, setEmail] = useState("");
  return (
    <section className="news">
      <div className="wrap">
        <div className="news__inner">
          <div className="news__left">
            <h2 className="news__title">Un correo cuando hay <em>algo nuevo</em>.</h2>
            <p className="news__sub">
              Sin agenda fija. Cuando publico, te aviso — con la entrada y una
              línea de contexto. Te puedes ir cuando quieras.
            </p>
          </div>
          <form className="news__form" onSubmit={(e) => {e.preventDefault();alert("Gracias por suscribirte.");}}>
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
                required />
              
            </div>
            <button type="submit" className="news__submit">Recibir avisos →</button>
            <p className="news__fine">
              Sin publicidad. Sin compartir tu correo. Sólo nuevos escritos.
            </p>
          </form>
        </div>
      </div>
    </section>);

};

const Footer = () =>
<footer className="footer">
    <div className="wrap">
      <div className="footer__grid">
        <div className="footer__brand">
          <div className="footer__brand-row">
            <img src="../../assets/logo-icon.png" alt=""
          style={{ filter: "brightness(0) saturate(100%) invert(60%) sepia(34%) saturate(454%) hue-rotate(338deg) brightness(91%) contrast(85%)" }} />
            <span className="footer__brand-stack">
              <span className="footer__brand-name">Oscar I. Morales</span>
              <span className="footer__brand-tagline">Secundum Fidem</span>
            </span>
          </div>
          <p className="footer__tagline">
            Notas sobre la fe, la familia y la vida común &mdash; un blog
            escrito desde Guatemala, desde 2014.
          </p>
        </div>
        <div className="footer__col">
          <h4>Sitio</h4>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#archivo">Blog · Archivo</a></li>
            <li><a href="#">Suscribirme</a></li>
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
        <span>© {new Date().getFullYear()} Oscar I. Morales · Secundum Fidem</span>
        <span>Guatemala</span>
      </div>
    </div>
  </footer>;


// ----------------------------------------------------------------------------
// APP
// ----------------------------------------------------------------------------
function App() {
  const [filter, setFilter] = useState("Todos");

  // Compute categories with counts
  const allCats = useMemo(() => {
    const map = new Map();
    POSTS.forEach((p) => p.cats.forEach((c) => map.set(c, (map.get(c) || 0) + 1)));
    return [...map.entries()].
    map(([name, count]) => ({ name, count, desc: CATEGORY_DESCS[name] || "" })).
    sort((a, b) => b.count - a.count);
  }, []);

  const featured = POSTS[0]; // most recent
  const popular = POSTS.filter((p) => p.featured).slice(0, 6);
  const firstYear = Math.min(...POSTS.map((p) => getYear(p.date)));

  return (
    <div className="site">
      <Nav />
      <Stage />
      <Hero
        totalPosts={POSTS.length}
        totalThemes={allCats.length}
        firstYear={firstYear} />
      
      <Featured post={featured} />
      <Popular posts={popular} />
      <Archive posts={POSTS} activeFilter={filter} onFilter={setFilter} allCats={allCats.slice(0, 10)} />
      <News />
      <Footer />
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);