/* global React, Nav, Hero, SectionHeader, EssayCard, PodcastRow, BookCover, NewsletterCTA, Footer, Icon */

const HomeScreen = ({ onNav }) => (
  <div className="site">
    <Nav current="home" onNav={onNav} />
    <Hero onRead={() => onNav("essay")} />

    {/* ----- Últimos ensayos ----- */}
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="ESCRITOS · ENSAYOS RECIENTES"
          title="Lo último que he escrito."
          cta="Ver archivo"
        />
        <div className="essays">
          <EssayCard
            num="32"
            kind="ENSAYO"
            date="12 DE MARZO"
            cover=""
            title="Lo pequeño que sostiene lo grande."
            excerpt="Un texto sobre los hábitos que nadie ve y, sin embargo, son lo que de verdad nos forma con los años."
            onClick={() => onNav("essay")}
          />
          <EssayCard
            num="31"
            kind="SERIES · PROFETAS"
            date="03 DE MARZO"
            cover="essay__cover--terra"
            title="Cuando Dios calla, ¿quién habla?"
            excerpt="Una meditación pastoral sobre los silencios largos: lo que hacen con nosotros y lo que nos enseñan a oír."
          />
          <EssayCard
            num="30"
            kind="CARTA AL LECTOR"
            date="24 DE FEBRERO"
            cover="essay__cover--mist"
            title="No tienes que ser interesante."
            excerpt="Una palabra de descanso para quien siente que su vida no da para post. Hay una libertad escondida en lo ordinario."
          />
        </div>
      </div>
    </section>

    {/* ----- Podcast ----- */}
    <section className="section section--dark">
      <div className="container">
        <SectionHeader
          eyebrow="PODCAST · CONVERSACIONES PAUSADAS"
          title="Una hora, una conversación."
          cta="Suscribirse"
          dark
        />
        <div className="podcast-list">
          <PodcastRow num="14" label="EPISODIO · CON ANDREA RESTREPO"
            title="Cuando orar se vuelve difícil." duration="38 min · 5 de marzo" />
          <PodcastRow num="13" label="EPISODIO · CON DANIEL BARRERA"
            title="Pastores que no se cuidan a sí mismos." duration="52 min · 19 de febrero" />
          <PodcastRow num="12" label="EPISODIO · SOLO"
            title="Lo que aprendí en mi primer año de ministerio." duration="44 min · 5 de febrero" />
          <PodcastRow num="11" label="EPISODIO · CON LUIS Y CAMILA"
            title="Matrimonio: el largo arte de quedarse." duration="61 min · 22 de enero" />
        </div>
      </div>
    </section>

    {/* ----- Libros ----- */}
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="LIBROS · OBRA PUBLICADA"
          title="Lo que he puesto en papel."
          cta="Tienda"
        />
        <div className="books">
          <BookCover
            variant=""
            eyebrow="ENSAYO PASTORAL"
            title="El descanso es un acto de fe"
            meta="LIBRO · 2024"
            status="Disponible en tapa blanda y e-book"
          />
          <BookCover
            variant="book__cover--crema"
            eyebrow="CONSEJERÍA BÍBLICA"
            title="Cuando el matrimonio se queda en silencio"
            meta="LIBRO · 2022"
            status="2.ª edición · prólogo de Sugel Michelén"
          />
          <BookCover
            variant="book__cover--terra"
            eyebrow="MEDITACIONES"
            title="Pequeñas liturgias para los lunes"
            meta="PRÓXIMO · 2026"
            status="Pre-orden abierto"
          />
        </div>
      </div>
    </section>

    {/* ----- Boletín ----- */}
    <NewsletterCTA onSubmit={() => onNav("subscribe")} />

    <Footer />
  </div>
);

const EssayScreen = ({ onNav }) => (
  <div className="site">
    <Nav current="home" onNav={onNav} />
    <article className="reading">
      <div className="container container--reading">
        <button className="reading__back" onClick={() => onNav("home")}>
          <Icon name="arrow-left" size={14} /> VOLVER A ESCRITOS
        </button>
        <p className="reading__eyebrow">ENSAYO · № 32 · 12 DE MARZO</p>
        <h1 className="reading__title">Lo pequeño que sostiene lo grande.</h1>
        <p className="reading__lead">
          Un texto sobre los hábitos que nadie ve y, sin embargo, son lo que de
          verdad nos forma con los años.
        </p>
        <div className="reading__meta">
          <strong>8 min de lectura</strong>
          <span className="reading__meta-sep" />
          <span>Series · Vida común</span>
          <span className="reading__meta-sep" />
          <span>Archivar para después</span>
        </div>

        <div className="reading__body">
          <p>
            Hay una mentira muy elegante que nos enseñaron sin proponérselo:
            que la vida cristiana es, sobre todo, una sucesión de grandes
            momentos. Decisiones de altar. Conferencias que cambian la vida.
            Pruebas que nos doblan la rodilla. Y, claro, hay algo de verdad en
            eso. Pero la mayor parte del cristianismo —la parte que pesa— no
            ocurre ahí.
          </p>
          <p>
            Ocurre el martes a las seis y media de la mañana, cuando uno se
            sienta a leer un capítulo del evangelio que ya conoce. Ocurre
            cuando, al cruzar la cocina, uno se detiene un segundo a darle
            gracias por el café. Ocurre cuando uno escoge —otra vez— no
            responderle mal a su esposa, aunque tenga razón.
          </p>
          <blockquote className="reading__quote">
            «El alma, dijo un viejo pastor, no se forma a golpes; se forma a
            goteo. Y ese goteo dura toda la vida.»
          </blockquote>
          <p>
            Pablo lo entendía. Por eso, antes de hablar de coronas, hablaba de
            correr con paciencia. Antes de hablar de victoria, hablaba de
            cuidarse para no quedar él mismo descalificado. La metáfora favorita
            del apóstol no era la batalla puntual, sino la caminata larga.
          </p>
          <p>
            Y caminar es, en esencia, un asunto de pasos pequeños. Uno detrás
            de otro. Sin público. Sin aplausos. Confiando en que el camino,
            aunque no se vea, conduce a casa.
          </p>
        </div>

        <div className="reading__sig">
          <img src="../../assets/logo-icon.png" alt="" />
          <div className="reading__sig-block">
            <span className="reading__sig-name">Oscar I. Morales</span>
            <span className="reading__sig-role">PASTOR · AUTOR · CONSEJERO BÍBLICO</span>
          </div>
        </div>
      </div>
    </article>
    <NewsletterCTA onSubmit={() => onNav("subscribe")} />
    <Footer />
  </div>
);

const SubscribeScreen = ({ onNav }) => (
  <div className="site">
    <Nav current="home" onNav={onNav} />
    <section className="subscribe">
      <div className="container">
        <div className="subscribe__inner">
          <div className="subscribe__seal">
            <img src="../../assets/logo-icon.png" alt=""
              style={{ filter: "brightness(0) saturate(100%) invert(60%) sepia(34%) saturate(454%) hue-rotate(338deg) brightness(91%) contrast(85%)" }} />
          </div>
          <p className="subscribe__eyebrow">RECIBIDO · CONFIRMACIÓN</p>
          <h1 className="subscribe__title">Bienvenido. <em style={{fontStyle:"italic", color:"var(--terracota-600)", fontWeight:500, fontFamily:"var(--font-serif)", letterSpacing:"-0.012em"}}>Aquí caminamos despacio.</em></h1>
          <p className="subscribe__lead">
            Tu correo está dentro. El primer envío te llegará el miércoles que
            viene, con un ensayo breve y una lectura recomendada. Sin prisa.
          </p>
          <div className="subscribe__details">
            <div className="subscribe__detail">
              <h5>FRECUENCIA</h5>
              <p>Una sola carta los miércoles. Nunca dos en la misma semana.</p>
            </div>
            <div className="subscribe__detail">
              <h5>CONTENIDO</h5>
              <p>Un ensayo pastoral, una cita y un libro o sermón sugerido.</p>
            </div>
            <div className="subscribe__detail">
              <h5>SALIDA</h5>
              <p>Hay un enlace para darte de baja al pie de cada correo.</p>
            </div>
          </div>
          <button className="btn btn--ghost" onClick={() => onNav("home")} style={{marginTop: 32}}>
            Volver al inicio
          </button>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

Object.assign(window, { HomeScreen, EssayScreen, SubscribeScreen });
