// Herramientas comunes de las escenas de los videos cortos.
// scripts/reel-render.mjs inyecta TIEMPOS y FIN antes de que cargue la página.
const T = window.TIEMPOS, FIN = window.FIN;
const $ = id => document.getElementById(id);
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const pr = (t, a, d) => cl((t - a) / d);
const sm = x => x * x * (3 - 2 * x);
const eo = x => 1 - Math.pow(1 - x, 3);
const rebote = x => { const c = 1.70158; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const azar = (i, s = 1) => { const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453; return v - Math.floor(v); };

const E = Object.fromEntries(T.escenas.map(e => [e.id, e]));
// Segundo en que se dice una palabra de una escena (n = la enésima vez que aparece)
const W = (id, inicio, n = 0) => {
  const l = T.palabras.filter(p => p.escena === id && p.texto.startsWith(inicio));
  if (!l[n]) throw new Error(`No encuentro «${inicio}» en ${id}`);
  return l[n].ini;
};

// Muestra un elemento entre a y b con una transición suave
function ver(el, t, a, b, d = .4) {
  const o = eo(pr(t, a - d / 2, d)) * (1 - pr(t, b - d / 2, d));
  el.style.display = o > 0 ? '' : 'none';
  el.style.opacity = o;
  return o;
}
// Entrada con rebote a partir de a
function entra(el, t, a, mover = 34, d = .45) {
  const k = pr(t, a, d);
  el.style.opacity = eo(cl(k * 2));
  el.style.transform = `translateY(${(1 - rebote(k)) * mover}px)`;
}

const ctxB = $('brasas').getContext('2d');
function brasas(t, fuerza) {
  ctxB.clearRect(0, 0, 1080, 1920);
  if (!fuerza) return;
  for (let i = 0; i < 46; i++) {
    const v = 45 + azar(i, 21) * 90, f = (t * v / 2100 + azar(i, 23)) % 1;
    const y = 1900 - f * 1950, x = azar(i, 25) * 1080 + Math.sin(t * .9 + i) * 34;
    const r = 2 + azar(i, 27) * 4.5, a = Math.sin(f * Math.PI) * fuerza * (.45 + .55 * Math.sin(t * 3 + i * 2) ** 2);
    ctxB.fillStyle = `rgba(247,184,100,${a.toFixed(3)})`;
    ctxB.beginPath(); ctxB.arc(x, y, r, 0, Math.PI * 2); ctxB.fill();
  }
}

// Subtítulos por bloques; `desde` deja fuera lo que en pantalla ya sale de otra forma
function crearSubtitulos(hasta = Infinity) {
  const BLOQUES = [];
  let b = null;
  const conVoz = T.palabras.filter(p => p.ini < hasta);
  conVoz.forEach((p, i) => {
    if (!b) { b = { ps: [], ini: p.ini }; BLOQUES.push(b); }
    b.ps.push(p);
    const largo = b.ps.reduce((s, q) => s + q.texto.length + 1, 0);
    const sig = conVoz[i + 1];
    if (!sig || largo > 21 || b.ps.length >= 5 || (/[.?!:;,]$/.test(p.texto) && b.ps.length >= 2) || sig.ini - p.fin > .45) {
      b.fin = sig && sig.ini - p.fin < .45 ? sig.ini : p.fin + .3;
      b = null;
    }
  });
  let previo = '';
  return t => {
    const x = BLOQUES.find(q => t >= q.ini && t < q.fin);
    const html = x ? `<span class="bloque">${x.ps.map(p => (t >= p.ini && t < p.fin + .06 ? `<em>${p.texto}</em>` : p.texto)).join(' ')}</span>` : '';
    if (html !== previo) { $('sub').innerHTML = html; previo = html; }
  };
}
