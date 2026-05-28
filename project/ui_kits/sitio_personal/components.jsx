/* global React */
const { useState } = React;

// ----- Inline SVG icons (small set, lucide-style) ------------------------
const Icon = ({ name, size = 18, stroke = 1.6 }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "arrow-right":
      return <svg {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>;
    case "arrow-up-right":
      return <svg {...props}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="9 7 17 7 17 15" /></svg>;
    case "arrow-left":
      return <svg {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="11 18 5 12 11 6" /></svg>;
    case "play":
      return <svg {...props}><polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" /></svg>;
    case "menu":
      return <svg {...props}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="17" x2="20" y2="17" /></svg>;
    case "check":
      return <svg {...props} strokeWidth={2}><polyline points="5 12 10 17 19 7" /></svg>;
    default:
      return null;
  }
};

// ----- NAV ---------------------------------------------------------------
const Nav = ({ current, onNav }) => (
  <nav className="nav">
    <div className="nav__inner">
      <button className="nav__brand" onClick={() => onNav("home")}>
        <div className="brand-circle"><img src="../../assets/logo-icon.png" alt="OM" /></div>
        <div className="nav__wordmark">
          <span className="nav__name">OSCAR I. MORALES</span>
          <span className="nav__role">PASTOR · AUTOR · CONSEJERO</span>
        </div>
      </button>
      <div className="nav__links">
        <button className={"nav__link" + (current === "home" ? " nav__link--active" : "")} onClick={() => onNav("home")}>Escritos</button>
        <button className="nav__link">Sermones</button>
        <button className="nav__link">Consejería</button>
        <button className="nav__link">Sobre</button>
      </div>
      <button className="nav__cta" onClick={() => onNav("subscribe")}>Recibir el boletín</button>
    </div>
  </nav>
);

// ----- HERO --------------------------------------------------------------
const Hero = ({ onRead }) => (
  <section className="hero">
    <div className="container">
      <div className="hero__grid">
        <div className="hero__text">
          <span className="hero__eyebrow">CARTAS DE UN PASTOR</span>
          <h1 className="hero__title">Vivir despacio en un mundo que <em>corre</em>.</h1>
          <p className="hero__lead">
            Ensayos, sermones y conversaciones pausadas sobre cómo el evangelio
            forma una vida común, paciente y verdadera.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary btn--lg" onClick={onRead}>
              Leer el último ensayo <Icon name="arrow-right" size={16} />
            </button>
            <button className="btn btn--text">Sobre Oscar</button>
          </div>
        </div>
        <div className="hero__media">
          <div className="hero__media-frame" />
          <img className="hero__media-mono" src="../../assets/logo-icon.png" alt="" />
          <div className="hero__media-caption">
            <span>RETRATO · MEDELLÍN, 2025</span>
            <strong>«El descanso es un acto de fe.»</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ----- SECTION HEADER ----------------------------------------------------
const SectionHeader = ({ eyebrow, title, cta, dark }) => (
  <div className="section__head">
    <div className="section__head-l">
      <span className="section__eyebrow">{eyebrow}</span>
      <h2 className="section__title">{title}</h2>
    </div>
    {cta && <button className="section__cta">{cta}</button>}
  </div>
);

// ----- ESSAY CARD --------------------------------------------------------
const EssayCard = ({ num, kind, date, cover, title, excerpt, onClick }) => (
  <button className="essay" onClick={onClick}>
    <div className={"essay__cover " + (cover || "")}>
      <span className="essay__cover-num">№ {num}</span>
    </div>
    <div className="essay__meta"><strong>{kind}</strong><span>{date}</span></div>
    <h3 className="essay__title">{title}</h3>
    <p className="essay__excerpt">{excerpt}</p>
  </button>
);

// ----- PODCAST ROW -------------------------------------------------------
const PodcastRow = ({ num, label, title, duration }) => (
  <div className="podcast">
    <div className="podcast__num">{num}</div>
    <div className="podcast__body">
      <span className="podcast__meta">{label}</span>
      <h3 className="podcast__title">{title}</h3>
      <span className="podcast__duration">{duration}</span>
    </div>
    <button className="podcast__play" aria-label="Reproducir"><Icon name="play" size={16} /></button>
  </div>
);

// ----- BOOK COVER --------------------------------------------------------
const BookCover = ({ variant = "", eyebrow, title, status, meta }) => (
  <button className="book">
    <div className={"book__cover " + (variant)}>
      <span className="book__cover-eb">{eyebrow}</span>
      <h3 className="book__cover-ttl">{title}</h3>
      <span className="book__cover-author">OSCAR I. MORALES</span>
    </div>
    <div className="book__meta">
      <span className="book__meta-eb">{meta}</span>
      <h4 className="book__meta-ttl">{title}</h4>
      <span className="book__meta-status">{status}</span>
    </div>
  </button>
);

// ----- NEWSLETTER CTA ----------------------------------------------------
const NewsletterCTA = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const submit = (e) => { e.preventDefault(); onSubmit && onSubmit(email); };
  return (
    <section className="news">
      <div className="container">
        <div className="news__inner">
          <div>
            <h2 className="news__title">Una carta los <em>miércoles</em>.</h2>
            <p className="news__sub">
              Una sola lectura pausada por semana, escrita con cuidado.
              Sin contenido relleno. Sin urgencia. Te puedes ir cuando quieras.
            </p>
          </div>
          <form className="news__form" onSubmit={submit}>
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
            <button type="submit" className="btn btn--primary news__submit">
              Recibir el boletín <Icon name="arrow-right" size={16} />
            </button>
            <p className="news__fine">
              Te llegará el primer correo dentro de poco. Tu dirección no se
              comparte con nadie.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

// ----- FOOTER ------------------------------------------------------------
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__grid">
        <div className="footer__brand">
          <img src="../../assets/logo-icon.png" alt="OM"
            style={{ filter: "brightness(0) saturate(100%) invert(60%) sepia(34%) saturate(454%) hue-rotate(338deg) brightness(91%) contrast(85%)" }} />
          <p className="footer__tagline">
            Pastor, autor y consejero bíblico. Escribo para acompañar la vida
            común — la de cada lunes — con el evangelio.
          </p>
        </div>
        <div className="footer__col">
          <h4>Leer</h4>
          <ul>
            <li><a>Ensayos</a></li>
            <li><a>Sermones</a></li>
            <li><a>Series</a></li>
            <li><a>Archivo</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Escuchar</h4>
          <ul>
            <li><a>Podcast</a></li>
            <li><a>Conferencias</a></li>
            <li><a>Entrevistas</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Cercanía</h4>
          <ul>
            <li><a>Boletín</a></li>
            <li><a>Consejería</a></li>
            <li><a>Contacto</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Oscar I. Morales · Hecho con cuidado.</span>
        <span>Medellín, Colombia · Bautista Reformado</span>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Icon, Nav, Hero, SectionHeader, EssayCard, PodcastRow, BookCover, NewsletterCTA, Footer });
