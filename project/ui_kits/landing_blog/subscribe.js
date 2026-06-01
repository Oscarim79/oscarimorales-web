// ============================================================================
// subscribe.js — Conecta los formularios de suscripción con Buttondown.
// ----------------------------------------------------------------------------
// Usa window.SITE_CONFIG.buttondownUser. Expone window.wireSubscribe(form, opts).
// Si no hay usuario configurado, los formularios quedan en "modo seguro" (no
// envían a ningún lado y muestran un aviso solo para ti).
// ============================================================================
(function () {
  'use strict';

  var USER = (window.SITE_CONFIG && window.SITE_CONFIG.buttondownUser) || '';
  var CONFIGURED = USER && USER !== 'TU_USUARIO_BUTTONDOWN';
  var ACTION = 'https://buttondown.com/api/emails/embed-subscribe/' + encodeURIComponent(USER);
  var POPUP = 'https://buttondown.com/' + encodeURIComponent(USER);

  function showMsg(form, text, ok) {
    var prev = form.parentNode.querySelector('.subscribe-msg');
    if (prev) prev.remove();
    var p = document.createElement('p');
    p.className = 'subscribe-msg';
    p.textContent = text;
    p.style.cssText = 'margin:14px 0 0;font-family:var(--font-descriptor),sans-serif;' +
      'font-size:13px;line-height:1.5;' +
      (ok ? 'color:var(--dorado-700,#8a6d3b);' : 'color:var(--terracota-600,#b5532f);');
    form.parentNode.insertBefore(p, form.nextSibling);
  }

  // form: el <form>; opts.success: mensaje tras enviar.
  window.wireSubscribe = function (form, opts) {
    if (!form) return;
    opts = opts || {};
    var email = form.querySelector('input[type="email"]');
    var name = form.querySelector('input[type="text"]');

    if (CONFIGURED) {
      form.setAttribute('action', ACTION);
      form.setAttribute('method', 'post');
      form.setAttribute('target', 'popupwindow');
      if (email) email.setAttribute('name', 'email');
      if (name) name.setAttribute('name', 'metadata__nombre');
      form.addEventListener('submit', function () {
        // Abre la confirmación de Buttondown en una ventana emergente; el envío
        // nativo del formulario va dirigido a esa ventana (no recarga la página).
        window.open(POPUP, 'popupwindow');
        showMsg(form, opts.success ||
          '¡Gracias! Te envié un correo para confirmar tu suscripción. Revísalo (y la carpeta de spam).', true);
        setTimeout(function () { try { form.reset(); } catch (e) {} }, 300);
      });
    } else {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        showMsg(form,
          'Suscripción aún no activada: falta tu usuario de Buttondown en site-config.js.', false);
      });
    }
  };
})();
