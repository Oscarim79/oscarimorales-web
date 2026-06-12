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
      if (email) email.setAttribute('name', 'email');
      if (name) name.setAttribute('name', 'metadata__nombre');
      form.addEventListener('submit', function (e) {
        // Envío en segundo plano (sin popups ni salir de la página); el mensaje
        // de éxito se muestra aquí mismo y la confirmación llega por correo.
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"], button:not([type])');
        if (btn) btn.disabled = true;
        // application/x-www-form-urlencoded: el mismo formato que el envío
        // nativo de un <form>, que es lo que espera el endpoint de Buttondown.
        var data = new URLSearchParams();
        new FormData(form).forEach(function (v, k) { data.append(k, v); });
        fetch(ACTION, { method: 'POST', body: data, mode: 'no-cors' })
          .then(function () {
            showMsg(form, opts.success ||
              '¡Gracias! Te envié un correo para confirmar tu suscripción. Revísalo (y la carpeta de spam).', true);
            try { form.reset(); } catch (err) {}
          })
          .catch(function () {
            showMsg(form, 'No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.', false);
          })
          .finally(function () { if (btn) btn.disabled = false; });
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
