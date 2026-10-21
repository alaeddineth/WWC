(function () {
  const D = window.RSO;
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const axeColor = (n) => D.axes.find((a) => a.n === n).couleur;
  const fmt = (x) => String(x).replace(".", ",");

  /* ------------------------------------------------ radar de maturité */
  const radar = document.getElementById("radar");
  const readout = document.getElementById("readout");
  const cx = 210, cy = 195, R = 140, N = D.domaines.length;
  const ang = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / N;
  const pt = (i, v) => [cx + Math.cos(ang(i)) * (R * v) / 5, cy + Math.sin(ang(i)) * (R * v) / 5];

  for (let lvl = 1; lvl <= 5; lvl++) {
    const pts = D.domaines.map((_, i) => pt(i, lvl).join(",")).join(" ");
    el("polygon", { points: pts, fill: lvl === 4 ? "rgba(47,125,79,0.06)" : "none", stroke: "#DCE1EA", "stroke-width": lvl === 4 ? 1.4 : 1 }, radar);
  }
  D.domaines.forEach((_, i) => { const [x, y] = pt(i, 5); el("line", { x1: cx, y1: cy, x2: x, y2: y, stroke: "#DCE1EA" }, radar); });
  const shape = D.domaines.map((d, i) => pt(i, d.score).join(",")).join(" ");
  el("polygon", { points: shape, fill: "rgba(22,38,74,0.14)", stroke: "#16264A", "stroke-width": 2.2, "stroke-linejoin": "round" }, radar);

  const labels = [], dots = [];
  D.domaines.forEach((d, i) => {
    const [lx, ly] = pt(i, 5.95);
    const anchor = Math.abs(lx - cx) < 12 ? "middle" : lx > cx ? "start" : "end";
    const t = el("text", { x: lx, y: ly + 4, "text-anchor": anchor, class: "axis-label" }, radar);
    t.textContent = d.court;
    labels.push(t);
    const [px, py] = pt(i, d.score);
    const c = el("circle", { cx: px, cy: py, r: 6.5, fill: d.score <= 3 ? "#E4572E" : "#16264A", stroke: "#fff", "stroke-width": 2, class: "pt", tabindex: 0, role: "button", "aria-label": `${d.nom} : ${d.score} sur 5` }, radar);
    dots.push(c);
    const show = () => {
      labels.forEach((l) => l.classList.remove("active")); dots.forEach((x) => x.classList.remove("active"));
      t.classList.add("active"); c.classList.add("active");
      readout.innerHTML = `<p class="readout-score"><strong>${d.score}</strong> / 5, niveau ${D.niveaux[d.score].toLowerCase()}</p><p class="readout-note"><strong>${d.nom}.</strong> ${d.note}</p>`;
    };
    [c, t].forEach((n) => { n.addEventListener("mouseenter", show); n.addEventListener("click", show); });
    c.addEventListener("focus", show);
  });

  /* ------------------------------------------------ barres */
  const bars = document.getElementById("bars");
  D.domaines.forEach((d) => {
    const li = document.createElement("li");
    li.className = "bar-row" + (d.score <= 3 ? " low" : "");
    const segs = [1, 2, 3, 4, 5].map((k) => `<span class="${k <= d.score ? "on" : ""}"></span>`).join("");
    li.innerHTML = `<div class="bar-name">${d.nom}<small>${d.note}</small></div>
      <div class="segments" aria-hidden="true">${segs}</div>
      <div class="bar-level"><strong>${d.score}/5</strong>${D.niveaux[d.score]}</div>`;
    bars.appendChild(li);
  });

  /* ------------------------------------------------ matrice de matérialité */
  const M = document.getElementById("matrix");
  const L = 62, T = 20, W = 430, H = 360, min = 2, max = 5;
  const sx = (v) => L + ((v - min) / (max - min)) * W;
  const sy = (v) => T + H - ((v - min) / (max - min)) * H;
  el("rect", { x: sx(3.5), y: T, width: sx(5) - sx(3.5), height: sy(3.5) - T, fill: "rgba(228,87,46,0.07)" }, M);
  for (let v = 2; v <= 5; v += 0.5) {
    el("line", { x1: L, x2: L + W, y1: sy(v), y2: sy(v), stroke: "#EEF1F5" }, M);
    el("line", { y1: T, y2: T + H, x1: sx(v), x2: sx(v), stroke: "#EEF1F5" }, M);
    const a = el("text", { x: sx(v), y: T + H + 20, "text-anchor": "middle", "font-size": 11, fill: "#5B6680" }, M); a.textContent = fmt(v);
    const b = el("text", { x: L - 10, y: sy(v) + 4, "text-anchor": "end", "font-size": 11, fill: "#5B6680" }, M); b.textContent = fmt(v);
  }
  el("line", { x1: sx(3.5), x2: sx(3.5), y1: T, y2: T + H, stroke: "#8A94A8", "stroke-dasharray": "5 4" }, M);
  el("line", { x1: L, x2: L + W, y1: sy(3.5), y2: sy(3.5), stroke: "#8A94A8", "stroke-dasharray": "5 4" }, M);
  el("line", { x1: L, x2: L + W, y1: T + H, y2: T + H, stroke: "#16264A" }, M);
  el("line", { x1: L, x2: L, y1: T, y2: T + H, stroke: "#16264A" }, M);
  const xt = el("text", { x: L + W / 2, y: T + H + 44, "text-anchor": "middle", "font-size": 13, fill: "#16264A" }, M);
  xt.textContent = "Importance pour la mission de Wallah We Can";
  const yt = el("text", { x: 16, y: T + H / 2, "text-anchor": "middle", "font-size": 13, fill: "#16264A", transform: `rotate(-90 16 ${T + H / 2})` }, M);
  yt.textContent = "Importance pour les parties prenantes";
  const zt = el("text", { x: sx(3.5) + 10, y: T + 18, "text-anchor": "start", "font-size": 12.5, "font-weight": 700, fill: "#B4401E" }, M);
  zt.textContent = "Zone prioritaire";

  const list = document.getElementById("enjeux-list");
  const items = {};
  const sorted = [...D.enjeux].sort((a, b) => (b.pp + b.mission) - (a.pp + a.mission));
  const offsets = { E8: [-32, -4], E4: [12, 14], E12: [-34, 4], E5: [-28, 4], E3: [-30, -4] };
  D.enjeux.forEach((e) => {
    const prio = e.pp >= 3.5 && e.mission >= 3.5;
    const g = el("g", { class: "dot", tabindex: 0, role: "button", "aria-label": `${e.code} : ${e.nom}` }, M);
    el("circle", { cx: sx(e.mission), cy: sy(e.pp), r: 9, fill: prio ? axeColor(e.axe) : "#A6AEBF", stroke: "#fff", "stroke-width": 2 }, g);
    const [dx, dy] = offsets[e.code] || [12, 4];
    const t = el("text", { x: sx(e.mission) + dx, y: sy(e.pp) + dy, "font-size": 12, "font-weight": 700, fill: "#16264A" }, g);
    t.textContent = e.code;
    items[e.code] = { g };
  });
  sorted.forEach((e) => {
    const prio = e.pp >= 3.5 && e.mission >= 3.5;
    const li = document.createElement("li");
    li.innerHTML = `<span class="code" style="color:${prio ? axeColor(e.axe) : "#8A94A8"}">${e.code}</span><span>${e.nom}</span><span class="prio ${prio ? "" : "watch"}">${prio ? "Axe " + e.axe : "À surveiller"}</span>`;
    list.appendChild(li);
    items[e.code].li = li;
  });
  const activate = (code) => {
    Object.values(items).forEach((x) => { x.g.classList.remove("active"); x.li.classList.remove("active"); });
    if (code) { items[code].g.classList.add("active"); items[code].li.classList.add("active"); }
  };
  Object.entries(items).forEach(([code, x]) => {
    [x.g, x.li].forEach((n) => { n.addEventListener("mouseenter", () => activate(code)); n.addEventListener("mouseleave", () => activate(null)); });
    x.g.addEventListener("focus", () => activate(code)); x.g.addEventListener("blur", () => activate(null));
  });

  /* ------------------------------------------------ axes stratégiques */
  const axes = document.getElementById("axes");
  D.axes.forEach((a, i) => {
    const d = document.createElement("details");
    d.className = "axe"; d.style.setProperty("--c", a.couleur);
    if (i === 0) d.open = true;
    const enj = D.enjeux.filter((e) => e.axe === a.n).map((e) => e.code).join(", ");
    d.innerHTML = `<summary><span class="axe-n">${a.n}</span><span class="axe-title">${a.nom}<span class="axe-meta">Enjeux ${enj} · ISO 26000 ${a.iso} · ODD ${a.odd}</span></span><span class="axe-toggle" aria-hidden="true"></span></summary>
      <div class="axe-body"><p><strong>Objectif :</strong> ${a.objectif}</p><ul>${a.actions.map((x) => `<li>${x}</li>`).join("")}</ul></div>`;
    axes.appendChild(d);
  });

  /* ------------------------------------------------ feuille de route */
  const legend = document.getElementById("legend");
  D.axes.forEach((a) => { const s = document.createElement("span"); s.style.setProperty("--c", a.couleur); s.textContent = `Axe ${a.n} · ${a.nom}`; legend.appendChild(s); });
  const gantt = document.getElementById("gantt");
  const head = document.createElement("div");
  head.className = "g-row g-head"; head.setAttribute("role", "row");
  head.innerHTML = `<div class="g-label" role="columnheader">Action</div><div class="g-track" role="columnheader">${[0, 3, 6, 9, 12, 15, 18].map((m) => `<span class="g-tick" style="left:${(m / 18) * 100}%">${m === 0 ? "Lancement" : "Mois " + m}</span>`).join("")}</div>`;
  gantt.appendChild(head);
  D.feuille.forEach((f) => {
    const row = document.createElement("div");
    row.className = "g-row"; row.setAttribute("role", "row");
    row.innerHTML = `<div class="g-label" role="cell">${f.action}</div><div class="g-track" role="cell" aria-label="du mois ${f.debut} au mois ${f.fin}"><span class="year1"></span><span class="g-bar" style="--c:${axeColor(f.axe)};left:${(f.debut / 18) * 100}%;width:${((f.fin - f.debut) / 18) * 100}%"></span></div>`;
    gantt.appendChild(row);
  });

  /* ------------------------------------------------ indicateurs */
  const filters = document.getElementById("filters");
  const body = document.getElementById("kpi-body");
  const opts = [{ n: 0, label: "Tous les axes" }, ...D.axes.map((a) => ({ n: a.n, label: `Axe ${a.n} : ${a.court}` }))];
  const render = (n) => {
    body.innerHTML = D.kpi.filter((k) => !n || k[0] === n)
      .map((k) => `<tr style="--c:${axeColor(k[0])}"><td>${k[1]}</td><td>${k[2]}</td><td>${k[3]}</td><td>${k[4]}</td></tr>`).join("");
    [...filters.children].forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.n) === n)));
  };
  opts.forEach((o) => {
    const b = document.createElement("button");
    b.type = "button"; b.dataset.n = o.n; b.textContent = o.label;
    b.addEventListener("click", () => render(o.n));
    filters.appendChild(b);
  });
  render(0);
})();
