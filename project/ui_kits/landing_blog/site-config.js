// ============================================================================
// site-config.js — Configuración del sitio (editable a mano).
// ============================================================================
window.SITE_CONFIG = {
  // Tu usuario de Buttondown. Lo obtienes al crear tu cuenta gratis en
  // https://buttondown.com — si tu página queda en buttondown.com/oscarimorales,
  // entonces aquí va "oscarimorales".
  //
  // Mientras diga "TU_USUARIO_BUTTONDOWN", los formularios no envían a ningún
  // lado (modo seguro). Cámbialo por tu usuario real para activarlos.
  buttondownUser: "oscarim",

  // --------------------------------------------------------------------------
  // Sermones en YouTube (sección "Para ver y escuchar" de la portada).
  //
  // - id:    el código del video (lo que va después de "watch?v=" en el enlace).
  // - start: segundo donde empieza el sermón (opcional; 0 = desde el inicio).
  // - title: título a mostrar. Si lo dejas en "", el sitio intenta leerlo de
  //          YouTube automáticamente; si no puede, muestra un texto genérico.
  //          Para un texto fijo y seguro, escríbelo aquí a mano.
  //
  // El PRIMERO de la lista es el sermón destacado (el grande).
  sermons: [
    { id: "XwWc0xvbq8U", start: 340, title: "" },
    { id: "z5C94eNDQ3I", start: 0,   title: "" },
    { id: "0qKsGt0YeoA", start: 0,   title: "" },
    { id: "1cvuDr7bSPI", start: 522, title: "" },
    { id: "KQpqhTn-4YI", start: 0,   title: "" },
  ],

  // Enlace a tu canal de YouTube (p. ej. "https://www.youtube.com/@tucanal").
  // Si lo dejas en "", el botón "Ver más en YouTube" no se muestra.
  youtubeChannel: "",
};
