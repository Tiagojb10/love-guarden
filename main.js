// ── Particles canvas ─────────────────────────────────────────
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let W, H, particles = [];

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function Particle() {
  this.reset = function () {
    this.x = Math.random() * W;
    this.y = H + 20;
    this.size = 0.6 + Math.random() * 1.4;
    this.speedY = 0.3 + Math.random() * 0.7;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.opacity = 0;
    this.maxOpacity = 0.15 + Math.random() * 0.25;
    this.life = 0;
    this.maxLife = 120 + Math.random() * 180;
    this.symbol = ["✦", "✿", "·", "°", "·"][Math.floor(Math.random() * 5)];
    this.fontSize = 8 + Math.random() * 8;
    this.isText = Math.random() > 0.6;
  };
  this.reset();
  this.y = Math.random() * H;
  this.life = Math.random() * this.maxLife;
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 55; i++) particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach((p) => {
    p.life++;
    p.x += p.speedX;
    p.y -= p.speedY;
    const progress = p.life / p.maxLife;
    p.opacity = progress < 0.1
      ? (progress / 0.1) * p.maxOpacity
      : progress > 0.85
        ? ((1 - progress) / 0.15) * p.maxOpacity
        : p.maxOpacity;
    ctx.globalAlpha = p.opacity;
    if (p.isText) {
      ctx.font = `${p.fontSize}px serif`;
      ctx.fillStyle = "#f8d7ea";
      ctx.fillText(p.symbol, p.x, p.y);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "#f8d7ea";
      ctx.fill();
    }
    if (p.life >= p.maxLife) p.reset();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => { resizeCanvas(); initParticles(); });
resizeCanvas();
initParticles();
animateParticles();


// ── Intro ─────────────────────────────────────────────────────
const intro = document.getElementById("intro");
const gardenScene = document.getElementById("gardenScene");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
  intro.classList.add("fade-out");
  setTimeout(() => {
    intro.style.display = "none";
    gardenScene.classList.add("visible");
    buildGarden();
  }, 900);
});


// ── Build realistic lily SVG ──────────────────────────────────
function buildFlowerSVG(color) {
  const palette = {
    pink:     { light:"#ffd6ec", mid:"#f472b6", dark:"#be185d", shade:"#9d174d", center:"#fef08a", stamen:"#f59e0b", spots:"#be185d", vein:"rgba(255,255,255,0.55)" },
    lavender: { light:"#ede9fe", mid:"#a78bfa", dark:"#7c3aed", shade:"#5b21b6", center:"#fef08a", stamen:"#d97706", spots:"#7c3aed", vein:"rgba(255,255,255,0.5)"  },
    white:    { light:"#ffffff", mid:"#fce7f3", dark:"#f9a8d4", shade:"#ec4899", center:"#fef08a", stamen:"#f59e0b", spots:"#f9a8d4", vein:"rgba(236,72,153,0.3)"   },
    red:      { light:"#fecaca", mid:"#f87171", dark:"#dc2626", shade:"#991b1b", center:"#fef08a", stamen:"#92400e", spots:"#991b1b", vein:"rgba(255,220,220,0.5)"  },
    gold:     { light:"#fef9c3", mid:"#fde047", dark:"#ca8a04", shade:"#92400e", center:"#ffffff", stamen:"#92400e", spots:"#b45309", vein:"rgba(255,255,200,0.6)"   },
    blue:     { light:"#dbeafe", mid:"#60a5fa", dark:"#1d4ed8", shade:"#1e3a8a", center:"#fef08a", stamen:"#d97706", spots:"#1d4ed8", vein:"rgba(219,234,254,0.6)"   },
  };
  const p = palette[color] || palette.pink;
  const ns = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "-65 -65 130 130");
  svg.setAttribute("xmlns", ns);
  svg.classList.add("lily-svg");

  const defs = document.createElementNS(ns, "defs");

  function linGrad(id, x1, y1, x2, y2, stops) {
    const g = document.createElementNS(ns, "linearGradient");
    g.setAttribute("id", id); g.setAttribute("x1", x1); g.setAttribute("y1", y1);
    g.setAttribute("x2", x2); g.setAttribute("y2", y2);
    stops.forEach(([off, col, op]) => {
      const s = document.createElementNS(ns, "stop");
      s.setAttribute("offset", off); s.setAttribute("stop-color", col);
      if (op !== undefined) s.setAttribute("stop-opacity", op);
      g.appendChild(s);
    });
    return g;
  }

  function radGrad(id, cx, cy, r, stops) {
    const g = document.createElementNS(ns, "radialGradient");
    g.setAttribute("id", id); g.setAttribute("cx", cx); g.setAttribute("cy", cy); g.setAttribute("r", r);
    stops.forEach(([off, col, op]) => {
      const s = document.createElementNS(ns, "stop");
      s.setAttribute("offset", off); s.setAttribute("stop-color", col);
      if (op !== undefined) s.setAttribute("stop-opacity", op);
      g.appendChild(s);
    });
    return g;
  }

  defs.appendChild(linGrad(`pb-${color}`, "0%","0%","0%","100%", [["0%",p.light],["45%",p.mid],["100%",p.dark]]));
  defs.appendChild(linGrad(`ps-${color}`, "0%","0%","100%","0%", [["0%",p.shade,0.5],["35%",p.shade,0.0],["65%",p.shade,0.0],["100%",p.shade,0.4]]));
  defs.appendChild(linGrad(`ph-${color}`, "0%","0%","0%","100%", [["0%","#ffffff",0.6],["40%","#ffffff",0.1],["100%","#ffffff",0.0]]));
  defs.appendChild(radGrad(`cg-${color}`, "40%","35%","65%", [["0%","#fffde7"],["50%",p.center],["100%",p.stamen]]));
  defs.appendChild(radGrad(`cs-${color}`, "50%","50%","50%", [["60%",p.dark,0.0],["100%",p.dark,0.4]]));
  svg.appendChild(defs);

  // Realistic lily petal — curved sides, pointed tip
  const petalPath = "M0,0 C-11,-6 -17,-26 -13,-43 C-9,-55 -3,-62 0,-64 C3,-62 9,-55 13,-43 C17,-26 11,-6 0,0 Z";

  function makePetal(angle, opacity) {
    const g = document.createElementNS(ns, "g");
    g.setAttribute("transform", `rotate(${angle})`);

    const base = document.createElementNS(ns, "path");
    base.setAttribute("d", petalPath);
    base.setAttribute("fill", `url(#pb-${color})`);
    base.setAttribute("opacity", opacity);

    const shade = document.createElementNS(ns, "path");
    shade.setAttribute("d", petalPath);
    shade.setAttribute("fill", `url(#ps-${color})`);

    const shine = document.createElementNS(ns, "path");
    shine.setAttribute("d", petalPath);
    shine.setAttribute("fill", `url(#ph-${color})`);

    // mid vein
    const vein = document.createElementNS(ns, "line");
    vein.setAttribute("x1","0"); vein.setAttribute("y1","-5");
    vein.setAttribute("x2","0"); vein.setAttribute("y2","-59");
    vein.setAttribute("stroke", p.vein); vein.setAttribute("stroke-width","1.0");
    vein.setAttribute("stroke-linecap","round");

    // side veins
    [[-5,-18,-13,-36],[5,-18,13,-36],[-4,-32,-9,-48],[4,-32,9,-48]].forEach(([x1,y1,x2,y2]) => {
      const sv = document.createElementNS(ns, "line");
      sv.setAttribute("x1",x1); sv.setAttribute("y1",y1);
      sv.setAttribute("x2",x2); sv.setAttribute("y2",y2);
      sv.setAttribute("stroke", p.vein); sv.setAttribute("stroke-width","0.55");
      sv.setAttribute("stroke-linecap","round"); sv.setAttribute("opacity","0.65");
      g.appendChild(sv);
    });

    // freckle spots (characteristic of lilies)
    [[-4,-26],[4,-30],[-3,-38],[3,-42],[1,-34],[-5,-46],[4,-20],[-2,-50]].forEach(([sx,sy]) => {
      const dot = document.createElementNS(ns, "circle");
      dot.setAttribute("cx", sx); dot.setAttribute("cy", sy);
      dot.setAttribute("r","1.3"); dot.setAttribute("fill", p.spots);
      dot.setAttribute("opacity","0.38");
      g.appendChild(dot);
    });

    g.appendChild(base); g.appendChild(shade); g.appendChild(shine); g.appendChild(vein);
    return g;
  }

  // 3 back petals (rotated 60° offset, slightly faded)
  for (let i = 0; i < 3; i++) svg.appendChild(makePetal((360/3)*i + 60, "0.7"));
  // 3 front petals
  for (let i = 0; i < 3; i++) svg.appendChild(makePetal((360/3)*i, "1"));

  // ── Stamens ──
  for (let i = 0; i < 6; i++) {
    const angle = (360 / 6) * i;
    const rad = (angle * Math.PI) / 180;
    const len = 17 + (i % 2) * 5;
    const ex = Math.sin(rad) * len;
    const ey = -Math.cos(rad) * len;

    const fil = document.createElementNS(ns, "line");
    fil.setAttribute("x1","0"); fil.setAttribute("y1","0");
    fil.setAttribute("x2", ex); fil.setAttribute("y2", ey);
    fil.setAttribute("stroke", p.stamen); fil.setAttribute("stroke-width","0.9");
    fil.setAttribute("stroke-linecap","round"); fil.setAttribute("opacity","0.88");
    svg.appendChild(fil);

    const anther = document.createElementNS(ns, "ellipse");
    anther.setAttribute("cx", ex); anther.setAttribute("cy", ey);
    anther.setAttribute("rx","2.5"); anther.setAttribute("ry","1.2");
    anther.setAttribute("transform", `rotate(${angle}, ${ex}, ${ey})`);
    anther.setAttribute("fill", p.stamen); anther.setAttribute("opacity","0.95");
    svg.appendChild(anther);
  }

  // ── Center ──
  const cBase = document.createElementNS(ns, "circle");
  cBase.setAttribute("cx","0"); cBase.setAttribute("cy","0");
  cBase.setAttribute("r","9"); cBase.setAttribute("fill", `url(#cg-${color})`);
  svg.appendChild(cBase);

  const cRing = document.createElementNS(ns, "circle");
  cRing.setAttribute("cx","0"); cRing.setAttribute("cy","0");
  cRing.setAttribute("r","9"); cRing.setAttribute("fill", `url(#cs-${color})`);
  svg.appendChild(cRing);

  const cTip = document.createElementNS(ns, "circle");
  cTip.setAttribute("cx","0"); cTip.setAttribute("cy","0");
  cTip.setAttribute("r","3.2"); cTip.setAttribute("fill", p.stamen);
  cTip.setAttribute("opacity","0.9");
  svg.appendChild(cTip);

  return svg;
}


// ── Build garden ──────────────────────────────────────────────
function buildGarden() {
  const grid = document.getElementById("flowersGrid");
  grid.innerHTML = "";

  flowers.forEach((f, idx) => {
    const item = document.createElement("div");
    item.className = "flower-item";
    item.style.setProperty("--delay", `${idx * 0.12}s`);

    const flowerWrap = document.createElement("div");
    flowerWrap.className = `flower-wrap color-${f.color}`;
    flowerWrap.setAttribute("role", "button");
    flowerWrap.setAttribute("aria-label", `Open flower: ${f.title}`);
    flowerWrap.tabIndex = 0;

    const svg = buildFlowerSVG(f.color);
    flowerWrap.appendChild(svg);

    const stemWrap = document.createElement("div");
    stemWrap.className = "stem-wrap";
    const stemHeight = 55 + (idx % 3) * 20;
    stemWrap.innerHTML = `
      <div class="leaf leaf-left"></div>
      <div class="stem" style="height:${stemHeight}px"></div>
      <div class="leaf leaf-right" style="margin-top:${Math.floor(stemHeight * 0.45)}px"></div>
    `;

    const label = document.createElement("div");
    label.className = "flower-label";
    label.textContent = f.label || f.title;

    item.appendChild(stemWrap);
    item.appendChild(flowerWrap);
    item.appendChild(label);
    grid.appendChild(item);

    function openThis() {
      flowerWrap.classList.add("bloomed");
      spawnBurst(flowerWrap);
      setTimeout(() => openModal(f), 300);
    }
    flowerWrap.addEventListener("click", openThis);
    flowerWrap.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openThis();
    });
  });
}


// ── Modal ─────────────────────────────────────────────────────
const backdrop = document.getElementById("modalBackdrop");
const modalCard = document.getElementById("modalCard");
const modalClose = document.getElementById("modalClose");

function openModal(f) {
  document.getElementById("modalIcon").textContent = f.icon;
  document.getElementById("modalLabel").textContent = f.label || (f.type === "poem" ? "a poem for you" : "a memory");
  document.getElementById("modalTitle").textContent = f.title;

  const body = document.getElementById("modalBody");
  body.innerHTML = "";

  if (f.type === "photo") {
    if (f.imageUrl) {
      const img = document.createElement("img");
      img.src = f.imageUrl;
      img.alt = f.title;
      img.className = "modal-photo";
      body.appendChild(img);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "photo-placeholder";
      placeholder.textContent = f.imageCaption || "📸 add your photo in flowers.js";
      body.appendChild(placeholder);
    }
  }

  if (f.content) {
    const poem = document.createElement("p");
    poem.className = "modal-poem";
    poem.textContent = f.content;
    body.appendChild(poem);
  }

  if (f.footer) {
    const foot = document.createElement("p");
    foot.className = "modal-footer-text";
    foot.textContent = f.footer;
    body.appendChild(foot);
  }

  backdrop.classList.add("active");
  requestAnimationFrame(() => modalCard.classList.add("active"));
}

function closeModal() {
  modalCard.classList.remove("active");
  setTimeout(() => backdrop.classList.remove("active"), 400);
}

modalClose.addEventListener("click", closeModal);
backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });


// ── Burst particles ───────────────────────────────────────────
function spawnBurst(el) {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const symbols = ["💕","💗","✨","🌸","💜","❤️","✿","·"];
  for (let i = 0; i < 14; i++) {
    const s = document.createElement("div");
    s.className = "burst-particle";
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const angle = Math.random() * 360;
    const dist = 60 + Math.random() * 80;
    const rad = (angle * Math.PI) / 180;
    s.style.left = cx + "px";
    s.style.top = cy + "px";
    s.style.setProperty("--tx", Math.cos(rad) * dist + "px");
    s.style.setProperty("--ty", Math.sin(rad) * dist + "px");
    s.style.animationDelay = Math.random() * 0.15 + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1200);
  }
}