// ============================================================================
// posts-data.js — Posts existentes en oscarimorales.com/blog
// ----------------------------------------------------------------------------
// 51 posts, ordenados del más reciente al más antiguo.
// Estructura compatible con la respuesta de WP REST API.
//
// CUANDO ESTÉ LISTO EL ENDPOINT (Opción B):
//   const res = await fetch('https://oscarimorales.com/wp-json/wp/v2/posts?per_page=100&_embed');
//   const wpPosts = await res.json();
//   const posts = wpPosts.map((p, i) => ({
//     n: wpPosts.length - i,
//     title: p.title.rendered,
//     date: p.date.slice(0, 10),
//     cats: p._embedded['wp:term'][0].map(t => t.name),
//     url: p.link,
//     excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, '').trim(),
//   }));
// ============================================================================

window.POSTS = [
  { n: 51, title: "El Miedo y Romanos 8", date: "2021-03-02", cats: ["Caminar Cristiano", "Meditaciones"], url: "https://oscarimorales.com/2021/03/02/el-miedo-y-romanos-8/", image: "https://oscarimorales.com/wp-content/uploads/2021/03/viurs.jpg", excerpt: "Cómo Romanos 8 reordena el miedo cuando la fe no logra hacerlo desaparecer por completo.", quote: "El miedo no nulifica nuestra fe — es una oportunidad, en la gracia de Dios, de quitar nuestra vista de este mundo y anclarla en el único que puede ofrecernos paz que sobrepasa todo entendimiento." },
  { n: 50, title: "La Pena de Muerte y la Biblia", date: "2021-02-26", cats: ["Cultura y Actualidad"], url: "https://oscarimorales.com/2021/02/26/pena-de-muerte-y-la-biblia/", image: "https://oscarimorales.com/wp-content/uploads/2021/02/Vida.jpg", excerpt: "Qué enseña la Escritura sobre la pena capital, la justicia y el valor de la vida.", featured: true },
  { n: 49, title: "Requisitos Bíblicos para Ministros de Alabanza", date: "2021-02-23", cats: ["Alabanza", "Iglesia", "Ministerio"], url: "https://oscarimorales.com/2021/02/23/requisitos-biblicos-de-un-ministro-de-alabanza/", image: "https://oscarimorales.com/wp-content/uploads/2019/10/Alabanza.jpg", excerpt: "El carácter y el llamado que la Biblia pide a quien dirige la adoración del pueblo.", featured: true },
  { n: 48, title: "¿Qué es el Creacionismo Histórico?", date: "2021-01-13", cats: ["Apologética", "Creacionismo"], url: "https://oscarimorales.com/2021/01/13/que-es-el-creacionismo-historico/", image: "https://oscarimorales.com/wp-content/uploads/2021/02/Creacionismo.jpg", excerpt: "Una introducción clara a la postura del creacionismo histórico y lo que afirma.", featured: true },
  { n: 47, title: "¿Qué es la Teoría de la Brecha?", date: "2020-12-14", cats: ["Apologética", "Creacionismo"], url: "https://oscarimorales.com/2020/12/14/que-es-la-teoria-de-la-brecha/", image: "https://oscarimorales.com/wp-content/uploads/2021/02/Brecha.jpg", excerpt: "Qué propone la teoría de la brecha sobre Génesis 1 y cómo evaluarla bíblicamente.", featured: true },
  { n: 46, title: "¿Se puede usar música secular en la Iglesia?", date: "2020-11-19", cats: ["Alabanza", "Iglesia", "Ministerio"], url: "https://oscarimorales.com/2020/11/19/podemos-tocar-musica-mundana-en-la-iglesia/", image: "https://oscarimorales.com/wp-content/uploads/2021/02/Secular.jpg", featured: true },
  { n: 45, title: "El Discurso del Monte de los Olivos", date: "2019-10-04", cats: ["Escatología", "Iglesia"], url: "https://oscarimorales.com/2019/10/04/el-discurso-del-monte-de-los-olivos/", image: "https://oscarimorales.com/wp-content/uploads/2019/10/Apocalip-1400x700.jpg" },
  { n: 44, title: "¿Es el Suicidio Imperdonable?", date: "2019-09-12", cats: ["Caminar Cristiano"], url: "https://oscarimorales.com/2019/09/12/es-el-suicidio-imperdonable/", image: "https://oscarimorales.com/wp-content/uploads/2019/09/Suicidio-biblia-.jpg" },
  { n: 43, title: "El Propósito de la Disciplina de los Hijos", date: "2018-11-22", cats: ["Caminar Cristiano", "Familia"], url: "https://oscarimorales.com/2018/11/22/el-proposito-de-la-disciplina-de-los-hijos/", image: "https://oscarimorales.com/wp-content/uploads/2018/11/tantrum_kids.jpg" },
  { n: 42, title: "El Dualismo en la Iglesia", date: "2018-10-11", cats: ["Caminar Cristiano", "Iglesia"], url: "https://oscarimorales.com/2018/10/11/el-dualismo-en-la-iglesia/", image: "https://oscarimorales.com/wp-content/uploads/2018/10/jesus_devil.jpg" },
  { n: 41, title: "Libertad de Religión y Pensamiento en Guatemala", date: "2018-09-25", cats: ["Cultura y Actualidad"], url: "https://oscarimorales.com/2018/09/25/libertad-de-religion-y-pensamiento-en-guatemala/", image: "https://oscarimorales.com/wp-content/uploads/2018/09/satanic_group.jpg" },
  { n: 40, title: "Cosmovisión Cristiana", date: "2018-09-07", cats: ["Cultura y Actualidad", "Familia"], url: "https://oscarimorales.com/2018/09/07/cosmovision-cristiana/", image: "https://oscarimorales.com/wp-content/uploads/2018/09/cosmovision.jpg" },
  { n: 39, title: "El Teléfono y Nuestra Identidad", date: "2018-07-25", cats: ["Cultura y Actualidad"], url: "https://oscarimorales.com/2018/07/25/el-telefono-y-nuestra-identidad/", image: "https://oscarimorales.com/wp-content/uploads/2018/07/Selfie_post.jpg" },
  { n: 38, title: "Un Balance en la Crianza de Tus Hijos", date: "2018-07-11", cats: ["Familia"], url: "https://oscarimorales.com/2018/07/11/un-balance-en-la-crianza-de-tus-hijos/", image: "https://oscarimorales.com/wp-content/uploads/2018/07/Parenting-1.jpg" },
  { n: 37, title: "¿Importa la Cuaresma?", date: "2018-02-14", cats: ["Caminar Cristiano", "Cultura y Actualidad", "Iglesia"], url: "https://oscarimorales.com/2018/02/14/importa-la-cuaresma/", image: "https://oscarimorales.com/wp-content/uploads/2018/02/Cuaresma.jpg" },
  { n: 36, title: "¿Quién Fue San Valentín?", date: "2018-02-09", cats: ["Cultura y Actualidad"], url: "https://oscarimorales.com/2018/02/09/quien-fue-san-valentin/", image: "https://oscarimorales.com/wp-content/uploads/2018/02/Sn_Val.jpg" },
  { n: 35, title: "Navidad — Iconos, Símbolos y Tradiciones II", date: "2017-12-23", cats: ["Apologética", "Cultura y Actualidad"], url: "https://oscarimorales.com/2017/12/23/navidad-iconos-simbolos-tradiciones-ii/", image: "https://oscarimorales.com/wp-content/uploads/2017/12/Nacimiento.jpg" },
  { n: 34, title: "Navidad — Iconos, Símbolos y Tradiciones I", date: "2017-12-23", cats: ["Apologética", "Cultura y Actualidad"], url: "https://oscarimorales.com/2017/12/23/navidad-iconos-simbolos-tradiciones-i/", image: "https://oscarimorales.com/wp-content/uploads/2017/12/Lutero_Arbol.jpg" },
  { n: 33, title: "Navidad — El Invierno en Israel", date: "2017-12-21", cats: ["Apologética", "Cultura y Actualidad"], url: "https://oscarimorales.com/2017/12/21/navidad-invierno-israel/", image: "https://oscarimorales.com/wp-content/uploads/2017/12/Pastor_Turquia.jpg" },
  { n: 32, title: "Navidad — El Neo-Gnosticismo", date: "2017-12-03", cats: ["Apologética", "Cultura y Actualidad"], url: "https://oscarimorales.com/2017/12/03/navidad-neo-gnosticismo/", image: "https://oscarimorales.com/wp-content/uploads/2017/12/Gnosticim.jpg" },
  { n: 31, title: "Navidad — Y los Primeros Cristianos", date: "2017-11-07", cats: ["Apologética", "Cultura y Actualidad"], url: "https://oscarimorales.com/2017/11/07/navidad-los-primeros-cristianos/", image: "https://oscarimorales.com/wp-content/uploads/2017/12/Christmas.jpg" },
  { n: 30, title: "Navidad — Su Supuesto Origen Pagano", date: "2017-11-03", cats: ["Apologética", "Cultura y Actualidad"], url: "https://oscarimorales.com/2017/11/03/navidad-supuesto-origen-pagano/", image: "https://oscarimorales.com/wp-content/uploads/2017/12/Chi_Rho.jpg" },
  { n: 29, title: "Halloween y La Famosa Reforma", date: "2017-10-31", cats: ["Caminar Cristiano", "Cultura y Actualidad"], url: "https://oscarimorales.com/2017/10/31/halloween-la-famosa-reforma/", image: "https://oscarimorales.com/wp-content/uploads/2017/10/halloreformation.png" },
  { n: 28, title: "Patriotismo, Civismo y el Evangelio", date: "2017-09-15", cats: ["Cultura y Actualidad"], url: "https://oscarimorales.com/2017/09/15/patriotismo-civismo-evangelio/", image: "https://oscarimorales.com/wp-content/uploads/2017/09/Guatemala-1.png" },
  { n: 27, title: "La División de Corinto y Guatemala", date: "2017-09-07", cats: ["Cultura y Actualidad", "Iglesia"], url: "https://oscarimorales.com/2017/09/07/la-division-de-corinto-y-guatemala/", image: "https://oscarimorales.com/wp-content/uploads/2017/09/split.png" },
  { n: 26, title: "Cristianos y Política — Dominionismo", date: "2017-05-05", cats: ["Cultura y Actualidad", "Iglesia"], url: "https://oscarimorales.com/2017/05/05/cristianos-politica-dominionismo/", image: "https://oscarimorales.com/wp-content/uploads/2017/05/cruzadas.png" },
  { n: 25, title: "¿Existe la Verdad Absoluta?", date: "2017-03-16", cats: ["Apologética", "Cultura y Actualidad"], url: "https://oscarimorales.com/2017/03/16/existe-la-verdad-absoluta/", image: "https://oscarimorales.com/wp-content/uploads/2017/03/la_verdad_absoluta.png" },
  { n: 24, title: "¿Qué es eso de Sola Scriptura?", date: "2017-03-13", cats: ["Caminar Cristiano"], url: "https://oscarimorales.com/2017/03/13/que-es-eso-de-sola-scriptura/", image: "https://oscarimorales.com/wp-content/uploads/2017/03/sola_scriptura.png" },
  { n: 23, title: "La Iglesia y las Tragedias", date: "2017-03-09", cats: ["Cultura y Actualidad", "Iglesia"], url: "https://oscarimorales.com/2017/03/09/la-iglesia-y-las-tragedias/", image: "https://oscarimorales.com/wp-content/uploads/2017/03/hogar_seguro_gt.png" },
  { n: 22, title: "El Aborto NO es Cuestión de Política", date: "2017-02-28", cats: ["Cultura y Actualidad"], url: "https://oscarimorales.com/2017/02/28/el-aborto-no-es-cuestion-de-politica/", image: "https://oscarimorales.com/wp-content/uploads/2017/02/aborto_portad.png" },
  { n: 21, title: "El Evangelio vs. La Religión", date: "2017-02-21", cats: ["Caminar Cristiano"], url: "https://oscarimorales.com/2017/02/21/el-evangelio-vs-la-religion/", image: "https://oscarimorales.com/wp-content/uploads/2017/02/fariseos.jpg" },
  { n: 20, title: "La Duda Como Esencia de la Fe", date: "2017-02-09", cats: ["Caminar Cristiano"], url: "https://oscarimorales.com/2017/02/09/la-duda-como-esencia-de-la-fe/", image: "https://oscarimorales.com/wp-content/uploads/2017/02/blog.png" },
  { n: 19, title: "El «Dilema» de Epícuro", date: "2017-01-11", cats: ["Apologética"], url: "https://oscarimorales.com/2017/01/11/el-dilema-de-epicuro/", image: "https://oscarimorales.com/wp-content/uploads/2017/01/blog-1.jpg" },
  { n: 18, title: "Este Año Quiero Buscar a Dios", date: "2017-01-02", cats: ["Caminar Cristiano"], url: "https://oscarimorales.com/2017/01/02/este-ano-quiero-buscar-a-dios/", image: "https://oscarimorales.com/wp-content/uploads/2017/01/blog.jpg" },
  { n: 17, title: "Dios Odia a Las Mujeres", date: "2016-12-21", cats: ["Apologética", "Cultura y Actualidad"], url: "https://oscarimorales.com/2016/12/21/dios-odia-las-mujeres/", image: "https://oscarimorales.com/wp-content/uploads/2017/03/dios_odia_mujer.png" },
  { n: 16, title: "Jesús No Existió", date: "2016-12-16", cats: ["Apologética"], url: "https://oscarimorales.com/2016/12/16/jesus-no-existio/", image: "https://oscarimorales.com/wp-content/uploads/2017/03/Jesus_historico.png" },
  { n: 15, title: "¿Estuvo Casado Jesús?", date: "2016-12-01", cats: ["Apologética"], url: "https://oscarimorales.com/2016/12/01/estuvo-casado-jesus/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/jesusmary_1500.png" },
  { n: 14, title: "Dios Nos Ama A Pesar De Nosotros", date: "2016-11-10", cats: ["Meditaciones"], url: "https://oscarimorales.com/2016/11/10/dios-nos-ama-a-pesar-de-nosotros/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/maxresdefault_1500.png" },
  { n: 13, title: "El Peor Error Al Evangelizar", date: "2016-11-10", cats: ["Ministerio"], url: "https://oscarimorales.com/2016/11/10/el-peor-error-al-evangelizar/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/church-wallpaper-1500.png" },
  { n: 12, title: "Enojarme Sin Pecar", date: "2016-11-10", cats: ["Caminar Cristiano"], url: "https://oscarimorales.com/2016/11/10/enojarme-sin-pecar/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/anger_1500.png" },
  { n: 11, title: "Hacer Discípulos, No Destruírlos", date: "2016-11-10", cats: ["Ministerio"], url: "https://oscarimorales.com/2016/11/10/hacer-discipulos-no-destruirlos/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/legos11_1500x750.png" },
  { n: 10, title: "El Principio Del Fin De Un Ministerio", date: "2016-11-10", cats: ["Ministerio"], url: "https://oscarimorales.com/2016/11/10/el-principio-del-fin-de-un-ministerio/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/pastor_1500.png", featured: true },
  { n: 9, title: "Pastores Que No Pastorean", date: "2016-11-10", cats: ["Iglesia"], url: "https://oscarimorales.com/2016/11/10/pastores-que-no-pastorean/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/ovejas000_1500.png" },
  { n: 8, title: "Dios No Quiere Que Lo Impresiones", date: "2016-11-10", cats: ["Caminar Cristiano"], url: "https://oscarimorales.com/2016/11/10/dios-no-quiere-que-lo-impresiones/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/Impresive_1500.png" },
  { n: 7, title: "Cinco Consejos Para Armar Un Listado de Alabanza", date: "2016-11-10", cats: ["Alabanza"], url: "https://oscarimorales.com/2016/11/10/cinco-consejos-para-armar-un-listado-de-alabanza/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/guitarra_1500.png" },
  { n: 6, title: "Estoy Bien, Tengo Paz ¡Gloria a Dios!", date: "2016-11-10", cats: ["Meditaciones"], url: "https://oscarimorales.com/2016/11/10/estoy-bien-tengo-paz-gloria-a-dios/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/wave_lighthouse_1500x750.png" },
  { n: 5, title: "Jesús Nos Deja Sufrir", date: "2016-11-10", cats: ["Meditaciones"], url: "https://oscarimorales.com/2016/11/10/jesus-nos-deja-sufrir/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/suffering_1500.png", featured: true },
  { n: 4, title: "Errores y Contradicciones en la Biblia", date: "2016-11-10", cats: ["Apologética"], url: "https://oscarimorales.com/2016/11/10/errores-y-contradicciones-en-la-biblia/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/bible_cup_1500.png" },
  { n: 3, title: "Los Padres No Salvamos a los Hijos", date: "2016-11-10", cats: ["Familia"], url: "https://oscarimorales.com/2016/11/10/los-padres-no-salvamos-a-los-hijos/", image: "https://oscarimorales.com/wp-content/uploads/2016/11/Parenting.png" },
  { n: 2, title: "La Iglesia y el Movimiento LGBTQ", date: "2016-10-30", cats: ["Cultura y Actualidad", "Iglesia"], url: "https://oscarimorales.com/2016/10/30/la-iglesia-movimiento-lgbtq/", image: "https://oscarimorales.com/wp-content/uploads/2017/03/1Juan_4_7.png" },
  { n: 1, title: "Deísmo Terapéutico Moralista", date: "2014-07-10", cats: ["Caminar Cristiano", "Iglesia"], url: "https://oscarimorales.com/2014/07/10/deismo-terapeutico-moralista/", image: "https://oscarimorales.com/wp-content/uploads/2017/11/Deismo.png" },
];

// Mapa de descripciones cortas por categoría (para "Por tema")
window.CATEGORY_DESCS = {
  "Apologética":          "Defender la fe con respeto y razón.",
  "Caminar Cristiano":    "La vida diaria del creyente.",
  "Cultura y Actualidad": "Pensar bíblicamente lo que pasa hoy.",
  "Familia":              "Matrimonio, crianza, hogar.",
  "Iglesia":              "Vida y gobierno de la iglesia local.",
  "Meditaciones":         "Pausas breves para el alma.",
  "Ministerio":           "Para los que sirven en la iglesia.",
  "Alabanza":             "Música, adoración y liturgia.",
  "Creacionismo":         "Génesis y los orígenes.",
  "Escatología":          "Las últimas cosas, sin pánico.",
};
