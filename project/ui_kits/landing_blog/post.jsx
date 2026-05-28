/* global React, POSTS, POST_BODIES */
const { useState, useEffect, useMemo, useRef } = React;

// ----------------------------------------------------------------------------
// Helpers (compartidos con landing)
// ----------------------------------------------------------------------------
const MONTHS = ["enero","febrero","marzo","abril","mayo","junio",
                "julio","agosto","septiembre","octubre","noviembre","diciembre"];
const MONTHS_SHORT = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

function fmtDateLong(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
}
function fmtDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_SHORT[m - 1]} ${y}`;
}
function getYear(iso) { return Number(iso.split("-")[0]); }

// ----------------------------------------------------------------------------
// NAV (con barra de progreso de lectura)
// ----------------------------------------------------------------------------
const Nav = ({ progress }) => (
  <nav className="nav">
    <div className="nav__inner">
      <a className="nav__brand" href="index.html">
        <img src="../../assets/logo-icon.png" alt="OM" />
        <span className="nav__brand-text">
          <span className="nav__wordmark">OSCAR I. MORALES</span>
          <span className="nav__tagline">Secundum Fidem Meam</span>
        </span>
      </a>
      <div className="nav__links">
        <a className="nav__link" href="index.html">Inicio</a>
        <a className="nav__link nav__link--active" href="index.html#archivo">Blog</a>
        <button className="nav__cta">Suscribirme</button>
      </div>
    </div>
    <div className="nav__progress" aria-hidden="true">
      <div className="nav__progress-fill" style={{ transform: `scaleX(${progress})` }}></div>
    </div>
  </nav>
);

// ----------------------------------------------------------------------------
// ARTICLE COVER — portada estilo revista: foto a sangre + título encima
// ----------------------------------------------------------------------------
const ArticleCover = ({ post, readMinutes }) => {
  const [src, setSrc] = useState(post.image || makeCover(post));
  return (
    <header className="acover">
      <div className="acover__bg" aria-hidden="true">
        <img
          src={src}
          alt=""
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          onError={() => setSrc(makeCover(post))}
        />
        <div className="acover__scrim"></div>
      </div>

      <div className="wrap acover__top">
        <div className="acover__crumbs">
          <a href="index.html">Inicio</a>
          <span className="acover__crumbs-sep">/</span>
          <a href="index.html#archivo">Blog</a>
          <span className="acover__crumbs-sep">/</span>
          <span className="acover__crumbs-current">{post.cats[0]}</span>
        </div>
        <span className="acover__num"><sup>N.&deg;</sup>{post.n}</span>
      </div>

      <div className="wrap acover__bottom">
        <div className="acover__cats">
          {post.cats.map(c => (
            <a key={c} className="acover__cat" href="index.html#archivo">{c}</a>
          ))}
        </div>
        <h1 className="acover__title">{post.title}</h1>
        <div className="acover__meta">
          <span className="acover__byline">
            <span className="acover__byline-lbl">Por</span>
            <span className="acover__byline-name">Oscar I. Morales</span>
          </span>
          <span className="acover__dot" aria-hidden="true"></span>
          <span className="acover__date">{fmtDateLong(post.date)}</span>
          <span className="acover__dot" aria-hidden="true"></span>
          <span className="acover__read">{readMinutes} min de lectura</span>
        </div>
      </div>
    </header>
  );
};

// ----------------------------------------------------------------------------
// ARTICLE BODY — renderiza los bloques estructurados
// ----------------------------------------------------------------------------
const Block = ({ block }) => {
  switch (block.type) {
    case "lead":
      return <p className="prose__lead">{block.text}</p>;
    case "p":
      return <p className="prose__p">{block.text}</p>;
    case "h2":
      return (
        <h2 className="prose__h2">
          <span className="prose__h2-rule" aria-hidden="true"></span>
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote className="prose__quote">
          <p>&ldquo;{block.text}&rdquo;</p>
        </blockquote>
      );
    case "scripture":
      return (
        <aside className="prose__scripture">
          <p className="prose__scripture-text">&ldquo;{block.text}&rdquo;</p>
          <cite className="prose__scripture-ref">{block.ref}</cite>
        </aside>
      );
    default:
      return null;
  }
};

const ArticleBody = ({ blocks }) => (
  <article className="prose">
    <div className="wrap wrap--narrow">
      {blocks.map((b, i) => <Block key={i} block={b} />)}
    </div>
  </article>
);

// ----------------------------------------------------------------------------
// ARTICLE FOOTER — compartir + tags + navegación entre posts
// ----------------------------------------------------------------------------
const ArticleFooter = ({ post, prev, next }) => {
  const shareUrl = encodeURIComponent(post.url);
  const shareText = encodeURIComponent(`"${post.title}" — Secundum Fidem Meam`);
  const [copied, setCopied] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const linkRef = useRef(null);

  const copyLink = () => {
    setShowLink(true);
    let ok = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(post.url);
        ok = true;
      }
    } catch (e) {}
    requestAnimationFrame(() => {
      const el = linkRef.current;
      if (el) {
        el.focus();
        el.select();
        try { if (document.execCommand("copy")) ok = true; } catch (e) {}
      }
      setCopied(ok);
      window.setTimeout(() => setCopied(false), 2600);
    });
  };

  return (
    <section className="afoot">
      <div className="wrap wrap--narrow">
        <div className="afoot__share">
          <span className="afoot__share-lbl">Compartir este escrito</span>
          <div className="afoot__share-row">
            <a className="afoot__share-btn" target="_blank" rel="noopener noreferrer"
               href={`https://wa.me/?text=${shareText}%20${shareUrl}`}>WhatsApp</a>
            <a className="afoot__share-btn" target="_blank" rel="noopener noreferrer"
               href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}>Facebook</a>
            <a className="afoot__share-btn" target="_blank" rel="noopener noreferrer"
               href={`https://x.com/intent/post?text=${shareText}&url=${shareUrl}`}>X</a>
            <button type="button" className="afoot__share-btn afoot__share-btn--copy" onClick={copyLink}>
              {copied ? "¡Copiado!" : "Copiar enlace"}
            </button>
          </div>
          {showLink
            ? <div className="afoot__share-link-wrap">
                <input
                  ref={linkRef}
                  className="afoot__share-link"
                  readOnly
                  value={post.url}
                  onFocus={(e) => e.target.select()}
                  aria-label="Enlace del escrito"
                />
                <span className="afoot__share-hint">
                  {copied ? "Copiado. Si no, selecci\u00f3nalo y copia (Ctrl/Cmd + C)." : "Selecci\u00f3nalo y copia (Ctrl/Cmd + C)."}
                </span>
              </div>
            : null}
        </div>

        <div className="afoot__tags">
          <span className="afoot__tags-lbl">Temas</span>
          <div className="afoot__tags-row">
            {post.cats.map(c => (
              <a key={c} className="afoot__tag" href="index.html#archivo">{c}</a>
            ))}
          </div>
        </div>

        <div className="afoot__signature">
          <img className="afoot__signature-logo"
            src="../../assets/logo-icon.png" alt="Oscar I. Morales" />
          <span className="afoot__signature-name">Oscar I. Morales</span>
          <span className="afoot__signature-tag">Secundum Fidem Meam</span>
        </div>

        <div className="afoot__nav">
          {prev
            ? <a className="afoot__nav-card afoot__nav-card--prev" href="post.html">
                <span className="afoot__nav-lbl">&larr; Anterior</span>
                <span className="afoot__nav-title">{prev.title}</span>
                <span className="afoot__nav-num"><sup>N.&deg;</sup>{prev.n}</span>
              </a>
            : <a className="afoot__nav-card afoot__nav-card--prev afoot__nav-card--empty" href="index.html#archivo">
                <span className="afoot__nav-lbl">&larr; Archivo</span>
                <span className="afoot__nav-title">Ver todos los escritos</span>
                <span className="afoot__nav-num">desde 2014</span>
              </a>}
          {next
            ? <a className="afoot__nav-card afoot__nav-card--next" href="post.html">
                <span className="afoot__nav-lbl">Siguiente &rarr;</span>
                <span className="afoot__nav-title">{next.title}</span>
                <span className="afoot__nav-num"><sup>N.&deg;</sup>{next.n}</span>
              </a>
            : <a className="afoot__nav-card afoot__nav-card--next afoot__nav-card--empty" href="index.html">
                <span className="afoot__nav-lbl">Inicio &rarr;</span>
                <span className="afoot__nav-title">Volver al inicio</span>
                <span className="afoot__nav-num">Secundum Fidem Meam</span>
              </a>}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------------
// RELATED — 3 posts relacionados (misma categoría o featured)
// ----------------------------------------------------------------------------
const RelatedCard = ({ post }) => {
  const [src, setSrc] = useState(post.image || makeCover(post));
  return (
    <a className="rel-card"
       href={post.url} target="_blank" rel="noopener noreferrer">
      <div className="rel-card__media">
        <img src={src} alt={post.title}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          onError={() => setSrc(makeCover(post))} />
      </div>
      <h3 className="rel-card__title">{post.title}</h3>
      <div className="rel-card__meta">
        <span>{post.cats[0]}</span>
        <span className="rel-card__meta-sep">·</span>
        <span>{fmtDate(post.date)}</span>
      </div>
    </a>
  );
};

const Related = ({ posts }) => (
  <section className="related">
    <div className="wrap">
      <div className="related__head">
        <span className="related__eb">Sigue leyendo</span>
        <h2 className="related__title">Otros escritos del mismo camino.</h2>
      </div>
      <div className="related__grid">
        {posts.map(p => <RelatedCard key={p.n} post={p} />)}
      </div>
    </div>
  </section>
);

// ----------------------------------------------------------------------------
// NEWS + FOOTER (copia del landing para que el post sea self-contained)
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
          <form className="news__form"
            onSubmit={(e) => { e.preventDefault(); alert("Gracias por suscribirte."); }}>
            <div className="news__field">
              <label htmlFor="news-name">TU NOMBRE</label>
              <input id="news-name" type="text" placeholder="Cómo te llaman en casa" />
            </div>
            <div className="news__field">
              <label htmlFor="news-email">TU CORREO</label>
              <input id="news-email" type="email"
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
            Notas sobre la fe, la familia y la vida común &mdash; un blog
            escrito desde Guatemala, desde 2014.
          </p>
        </div>
        <div className="footer__col">
          <h4>Sitio</h4>
          <ul>
            <li><a href="index.html">Inicio</a></li>
            <li><a href="index.html#archivo">Blog · Archivo</a></li>
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
        <span>© {new Date().getFullYear()} Oscar I. Morales · Secundum Fidem Meam</span>
        <span>Guatemala</span>
      </div>
    </div>
  </footer>
);

// ----------------------------------------------------------------------------
// APP
// ----------------------------------------------------------------------------
function App() {
  // El template renderiza el post 51 ("El Miedo y Romanos 8") como ejemplo.
  // En producción esto vendría de la URL o de un router.
  const POST_N = 51;
  const post = useMemo(() => POSTS.find(p => p.n === POST_N), []);
  const idx = useMemo(() => POSTS.findIndex(p => p.n === POST_N), []);
  const prev = POSTS[idx + 1]; // POSTS está ordenado del más reciente al más antiguo
  const next = POSTS[idx - 1];
  const blocks = POST_BODIES[POST_N] || [];

  // Posts relacionados: priorizar SIEMPRE los que tienen su imagen correcta.
  // Orden: misma categoría con imagen → cualquiera con imagen → misma categoría
  // sin imagen (último recurso, sólo si no hay suficientes con imagen).
  const related = useMemo(() => {
    const cats = new Set(post.cats);
    const sameCat = POSTS.filter(p => p.n !== POST_N && p.cats.some(c => cats.has(c)));
    const seen = new Set();
    const pick = [];
    const add = (arr) => {
      for (const p of arr) {
        if (pick.length >= 3) break;
        if (!seen.has(p.n)) { seen.add(p.n); pick.push(p); }
      }
    };
    add(sameCat.filter(p => p.image));                          // misma categoría + imagen
    add(POSTS.filter(p => p.n !== POST_N && p.image));          // cualquiera con imagen
    add(sameCat);                                               // misma categoría sin imagen
    return pick.slice(0, 3);
  }, [post]);

  // Estimación del tiempo de lectura: ~220 palabras por minuto
  const readMinutes = useMemo(() => {
    const wc = blocks.reduce((n, b) => n + ((b.text || "").split(/\s+/).length), 0);
    return Math.max(1, Math.round(wc / 220));
  }, [blocks]);

  // Barra de progreso de lectura (porcentaje del scroll dentro del artículo)
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!post) {
    return <div style={{ padding: 80 }}>Post no encontrado.</div>;
  }

  return (
    <div className="site site--post">
      <Nav progress={progress} />
      <ArticleCover post={post} readMinutes={readMinutes} />
      <ArticleBody blocks={blocks} />
      <ArticleFooter post={post} prev={prev} next={next} />
      <Related posts={related} />
      <News />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
