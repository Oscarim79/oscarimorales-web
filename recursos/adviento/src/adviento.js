// Dibuja la corona de adviento en cada [data-corona="N"] (N = sesión 1 a 5).
// Las velas de las sesiones anteriores y la de hoy salen encendidas. Debajo, los nombres
// de las velas en texto, para que se lea igual en blanco y negro.
(function () {
  var NOMBRES = ['Esperanza', 'Paz', 'Gozo', 'Amor', 'Cristo'];
  // x, y de la base, alto, color de la vela (tres moradas, una rosa para el Gozo, blanca al centro)
  var VELAS = [
    { x: 92, y: 150, h: 70, c: '#6B4E7A' },
    { x: 128, y: 168, h: 70, c: '#6B4E7A' },
    { x: 172, y: 168, h: 70, c: '#C98BA0' },
    { x: 208, y: 150, h: 70, c: '#6B4E7A' },
    { x: 150, y: 140, h: 96, c: '#FFFFFF' },
  ];
  var ORDEN = [0, 3, 4, 1, 2]; // de atrás hacia adelante para que se superpongan bien

  function vela(v, encendida, hoy) {
    var w = 16, top = v.y - v.h, s = '';
    if (encendida) {
      s += '<ellipse cx="' + v.x + '" cy="' + (top - 16) + '" rx="' + (hoy ? 20 : 14) + '" ry="' + (hoy ? 24 : 18) + '" fill="#F3D9A4" opacity="0.55"/>';
      s += '<path d="M' + v.x + ' ' + (top - 27) + ' C ' + (v.x + 8) + ' ' + (top - 14) + ', ' + (v.x + 6) + ' ' + (top - 4) + ', ' + v.x + ' ' + (top - 2) +
           ' C ' + (v.x - 6) + ' ' + (top - 4) + ', ' + (v.x - 8) + ' ' + (top - 14) + ', ' + v.x + ' ' + (top - 27) + ' Z" fill="#E59A3A" stroke="#9C5F40" stroke-width="1"/>';
    }
    s += '<line x1="' + v.x + '" y1="' + top + '" x2="' + v.x + '" y2="' + (top - 5) + '" stroke="#0D1B2A" stroke-width="1.5"/>';
    s += '<rect x="' + (v.x - w / 2) + '" y="' + top + '" width="' + w + '" height="' + v.h + '" rx="3" fill="' + v.c + '" stroke="#0D1B2A" stroke-width="1.4"/>';
    return s;
  }

  function corona(n) {
    var s = '<svg class="corona" viewBox="0 0 300 200" role="img" aria-label="Corona de adviento, vela ' + NOMBRES[n - 1] + '">';
    s += '<ellipse cx="150" cy="166" rx="118" ry="30" fill="none" stroke="#5E7D5A" stroke-width="20"/>';
    for (var i = 0; i < 26; i++) { // hojas
      var a = (i / 26) * Math.PI * 2, x = 150 + Math.cos(a) * 118, y = 166 + Math.sin(a) * 30;
      s += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="13" ry="6" transform="rotate(' + ((a * 180 / Math.PI) + 60).toFixed(0) + ' ' + x.toFixed(1) + ' ' + y.toFixed(1) + ')" fill="#4C6B48" stroke="#2F4A2C" stroke-width="0.8"/>';
    }
    ORDEN.forEach(function (i) { s += vela(VELAS[i], i < n, i === n - 1); });
    s += '</svg><div class="corona__nombres">';
    NOMBRES.forEach(function (nom, i) { s += '<span class="' + (i === n - 1 ? 'on hoy' : i < n ? 'on' : '') + '">' + nom + '</span>'; });
    return s + '</div>';
  }

  document.querySelectorAll('[data-corona]').forEach(function (el) { el.innerHTML = corona(+el.dataset.corona); });
})();
