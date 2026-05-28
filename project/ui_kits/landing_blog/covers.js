/* ============================================================================
   covers.js — Portadas editoriales tipográficas (on-brand) por post
   Lee el TÍTULO y la categoría del post y compone una portada específica:
   título en serif (Playfair), eyebrow de categoría, motivo simbólico según el
   tema, sobre la paleta de marca. Determinista por post.n. Devuelve data URL.
   Expone window.makeCover(post).
   ============================================================================ */
window.makeCover = (function () {
  const cache = {};

  const PAL = {
    noche900: "#060D17",
    noche800: "#0D1B2A",
    noche700: "#15293F",
    noche600: "#1E3B57",
    terracota: "#C47E5A",
    terracota300: "#DFAA94",
    dorado: "#B89A6A",
    dorado400: "#CBB287",
    niebla: "#8A9AAA",
    niebla300: "#C0CAD3",
    crema: "#F5F0E8",
    crema50: "#FBF8F3",
  };

  // Intentar precargar Playfair para el canvas (no bloquea)
  try {
    if (document.fonts && document.fonts.load) {
      document.fonts.load('600 64px "Playfair Display"');
      document.fonts.load('italic 500 40px "Playfair Display"');
    }
  } catch (e) {}

  function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  function accentFor(cat) {
    const map = {
      "Apologética": PAL.dorado, "Creacionismo": PAL.dorado, "Familia": PAL.dorado,
      "Alabanza": PAL.terracota, "Ministerio": PAL.terracota, "Iglesia": PAL.terracota,
      "Caminar Cristiano": PAL.terracota,
      "Meditaciones": PAL.niebla, "Escatología": PAL.niebla, "Cultura y Actualidad": PAL.niebla,
    };
    return map[cat] || PAL.terracota;
  }

  function rng(seed) {
    let s = (seed * 2654435761) % 4294967296;
    return function () {
      s = (s * 1664525 + 1013904223) % 4294967296;
      return s / 4294967296;
    };
  }

  // Motivo simbólico simple (solo formas básicas) según la categoría
  function drawMotif(ctx, cat, accent, W, H, r) {
    ctx.save();
    const cx = W * 0.72, cy = H * 0.40;
    ctx.strokeStyle = hexA(accent, 0.5);
    ctx.fillStyle = hexA(accent, 0.5);
    ctx.lineWidth = 2.5;
    const k = cat || "";

    if (k === "Alabanza" || k === "Ministerio") {
      // barras tipo "alabanza / voz"
      ctx.globalAlpha = 0.85;
      const n = 7, bw = 16, gap = 26;
      for (let i = 0; i < n; i++) {
        const h = 40 + Math.abs(Math.sin(i * 1.3 + r() * 3)) * 150;
        ctx.fillRect(cx - (n * gap) / 2 + i * gap, cy - h / 2, bw, h);
      }
    } else if (k === "Creacionismo" || k === "Escatología") {
      // órbitas / cosmos
      ctx.globalAlpha = 0.8;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, 60 * i, 30 * i, Math.PI / 5, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill();
    } else if (k === "Familia") {
      // círculos entrelazados
      ctx.globalAlpha = 0.8;
      [-50, 0, 50].forEach((dx, i) => {
        ctx.beginPath(); ctx.arc(cx + dx, cy + (i === 1 ? 30 : 0), 48, 0, Math.PI * 2); ctx.stroke();
      });
    } else if (k === "Meditaciones" || k === "Caminar Cristiano") {
      // horizonte sereno + sol
      ctx.globalAlpha = 0.8;
      ctx.beginPath(); ctx.arc(cx, cy, 52, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 150, cy + 90); ctx.lineTo(cx + 150, cy + 90); ctx.stroke();
    } else if (k === "Cultura y Actualidad") {
      // cruz de ejes / diálogo
      ctx.globalAlpha = 0.75;
      ctx.beginPath(); ctx.moveTo(cx - 90, cy); ctx.lineTo(cx + 90, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - 90); ctx.lineTo(cx, cy + 90); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, 90, 0, Math.PI * 2); ctx.stroke();
    } else {
      // por defecto: arcos concéntricos (Apologética, Iglesia…)
      ctx.globalAlpha = 0.75;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath(); ctx.arc(cx, cy, i * 34, -Math.PI * 0.15, Math.PI * 1.15); ctx.stroke();
      }
    }
    ctx.restore();
  }

  function wrapLines(ctx, text, maxW, maxLines) {
    const words = text.split(/\s+/);
    const lines = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? cur + " " + w : w;
      if (ctx.measureText(test).width > maxW && cur) {
        lines.push(cur); cur = w;
        if (lines.length === maxLines - 1) break;
      } else {
        cur = test;
      }
    }
    // resto
    let rest = words.slice(lines.join(" ").split(/\s+/).filter(Boolean).length).join(" ");
    if (lines.length < maxLines) {
      if (cur && lines.length < maxLines) { lines.push(cur); rest = ""; }
    }
    if (rest) {
      let last = lines[maxLines - 1] || "";
      while (last && ctx.measureText(last + "…").width > maxW) last = last.replace(/\s*\S+$/, "");
      lines[maxLines - 1] = (last || lines[maxLines - 1] || "") + "…";
    }
    return lines.slice(0, maxLines);
  }

  return function makeCover(post) {
    const key = post.n;
    if (cache[key]) return cache[key];

    const W = 1200, H = 800;
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    const r = rng(post.n + 11);
    const cat = (post.cats && post.cats[0]) || "";
    const accent = accentFor(cat);

    // Base: degradado de noche
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, PAL.noche700);
    g.addColorStop(1, PAL.noche900);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    // Resplandor de acento
    const gx = W * (0.55 + 0.3 * r()), gy = H * (0.18 + 0.25 * r());
    const rg = ctx.createRadialGradient(gx, gy, 0, gx, gy, W * 0.62);
    rg.addColorStop(0, hexA(accent, 0.34));
    rg.addColorStop(0.5, hexA(accent, 0.10));
    rg.addColorStop(1, hexA(accent, 0));
    ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);

    // Trama diagonal sutil
    ctx.save();
    ctx.globalAlpha = 0.04; ctx.strokeStyle = PAL.crema; ctx.lineWidth = 1;
    for (let x = -H; x < W; x += 13) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + H, H); ctx.stroke(); }
    ctx.restore();

    // Motivo simbólico según tema
    drawMotif(ctx, cat, accent, W, H, r);

    // Viñeta para legibilidad del texto (inferior-izquierda)
    const vg = ctx.createLinearGradient(0, 0, 0, H);
    vg.addColorStop(0, hexA(PAL.noche900, 0.1));
    vg.addColorStop(0.55, hexA(PAL.noche900, 0.35));
    vg.addColorStop(1, hexA(PAL.noche900, 0.86));
    ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);

    const padX = 70;
    const maxTextW = W - padX * 2;

    // Título en serif (Playfair → Georgia fallback): calcular bloque primero
    ctx.fillStyle = PAL.crema50;
    const titleSize = post.title.length > 46 ? 58 : (post.title.length > 28 ? 70 : 82);
    ctx.font = '600 ' + titleSize + 'px "Playfair Display", Georgia, "Times New Roman", serif';
    const lines = wrapLines(ctx, post.title, maxTextW, 3);
    const lh = titleSize * 1.1;
    const lastBaseline = H - 92;
    const firstBaseline = lastBaseline - (lines.length - 1) * lh;
    const titleTop = firstBaseline - titleSize;

    // Regla + eyebrow de categoría, situados sobre el bloque de título
    const eyeY = titleTop - 30;
    ctx.save();
    ctx.strokeStyle = hexA(accent, 0.9); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(padX, eyeY); ctx.lineTo(padX + 44, eyeY); ctx.stroke();
    ctx.fillStyle = (accent === PAL.niebla ? PAL.niebla300 : (accent === PAL.dorado ? PAL.dorado400 : PAL.terracota300));
    ctx.font = '800 18px Montserrat, system-ui, sans-serif';
    ctx.textBaseline = "middle";
    const eyebrow = (cat || "Escrito").toUpperCase();
    let ex = padX + 60;
    for (const ch of eyebrow.split("")) { ctx.fillText(ch, ex, eyeY); ex += ctx.measureText(ch).width + 3.2; }
    ctx.restore();

    // Dibujar título
    ctx.save();
    ctx.fillStyle = PAL.crema50;
    ctx.textBaseline = "alphabetic";
    ctx.font = '600 ' + titleSize + 'px "Playfair Display", Georgia, "Times New Roman", serif';
    let ty = firstBaseline;
    for (const ln of lines) { ctx.fillText(ln, padX, ty); ty += lh; }
    ctx.restore();

    const url = cv.toDataURL("image/jpeg", 0.86);
    cache[key] = url;
    return url;
  };
})();
