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

  /* ================================================================
     OUTILS COMMUNS
     ================================================================ */
  const M_ = D.meta || {};
  const STATUTS = ["Réalisée", "En cours", "En retard", "À lancer"];
  const STATUT_COULEUR = { "Réalisée": "#2F7D4F", "En cours": "#3F6FB5", "En retard": "#E4572E", "À lancer": "#C3CAD8" };
  const esc = (t) => String(t == null ? "" : t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const dateFR = (d) => d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const moisFR = (d) => d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const lancement = M_.lancement ? new Date(M_.lancement + "T00:00:00") : null;
  const addMonths = (d, m) => { const x = new Date(d); x.setMonth(x.getMonth() + m); return x; };
  const echeance = (f) => lancement ? moisFR(addMonths(lancement, f.fin)) : `Mois ${f.fin} après le lancement`;
  const statutReel = (f) => {
    if (f.statut === "Réalisée") return "Réalisée";
    if (lancement && new Date() > addMonths(lancement, f.fin)) return "En retard";
    return f.statut || "À lancer";
  };
  const budget = (f) => (f.budget == null ? "Non estimé" : `${Number(f.budget).toLocaleString("fr-FR")} TND`);
  const tag = (statut, texte) => `<span class="tag ${statut}">${texte}</span>`;
  const STATUT_DONNEE = { declare: "Déclaré", constate: "Constaté", mesure: "Mesuré" };
  const valeur = (v, statut) => (v == null || v === "" ? tag("todo", "À mesurer") : `${esc(v)} ${statut ? tag(statut, STATUT_DONNEE[statut]) : ""}`);
  const updateDate = M_.miseAJour ? dateFR(new Date(M_.miseAJour + "T00:00:00")) : "non renseignée";

  /* ================================================================
     TABLEAU DE BORD
     ================================================================ */
  const actions = D.feuille.map((f) => ({ ...f, s: statutReel(f) }));
  const count = (arr, fn) => arr.filter(fn).length;
  const kpiRef = count(D.kpi, (k) => k.ref != null);
  const kpiMes = count(D.kpi, (k) => k.actuel != null);
  const moy = D.domaines.reduce((a, d) => a + d.score, 0) / D.domaines.length;

  document.getElementById("stats").innerHTML = [
    { v: `${fmt(moy.toFixed(1))}<small>/5</small>`, l: "Maturité RSO globale", n: "Diagnostic initial (mémoire)" },
    { v: D.kpi.length, l: "Indicateurs suivis", n: `${kpiRef} avec une valeur de référence, ${kpiMes} déjà mesurés` },
    { v: `${count(actions, (a) => a.s === "Réalisée")}<small>/${actions.length}</small>`, l: "Actions réalisées", n: `${count(actions, (a) => a.s === "En cours")} en cours, ${count(actions, (a) => a.s === "En retard")} en retard, ${count(actions, (a) => a.s === "À lancer")} à lancer` },
    { v: lancement ? dateFR(lancement) : "À fixer", l: "Lancement de la démarche", n: lancement ? "Point de départ des échéances" : "Les échéances sont exprimées en mois" },
  ].map((c) => `<div class="stat"><p class="stat-v">${c.v}</p><p class="stat-l">${c.l}</p><p class="stat-n">${c.n}</p></div>`).join("");
  document.getElementById("updated").textContent = `Dernière mise à jour des données : ${updateDate}.`;
  document.getElementById("footer-update").textContent = `Données mises à jour le ${updateDate}.`;

  const stacked = (target, rows, keys, colors) => {
    document.getElementById(target).innerHTML = rows.map((r) => {
      const total = keys.reduce((a, k) => a + r.v[k], 0) || 1;
      const segs = keys.filter((k) => r.v[k]).map((k) => `<span style="flex:${r.v[k]};background:${colors[k]}" title="${k} : ${r.v[k]}">${r.v[k]}</span>`).join("");
      return `<div class="hbar-row"><span class="hbar-label" style="--c:${r.c}">${esc(r.label)}</span><span class="hbar-track" role="img" aria-label="${esc(r.label)} : ${keys.map((k) => `${k} ${r.v[k]}`).join(", ")}">${segs}</span><span class="hbar-total">${total}</span></div>`;
    }).join("");
  };
  const legendHTML = (keys, colors) => keys.map((k) => `<span><i style="background:${colors[k]}"></i>${k}</span>`).join("");

  stacked("chart-actions", D.axes.map((a) => ({ label: `Axe ${a.n} : ${a.court}`, c: a.couleur, v: Object.fromEntries(STATUTS.map((s) => [s, count(actions, (x) => x.axe === a.n && x.s === s)])) })), STATUTS, STATUT_COULEUR);
  document.getElementById("status-legend").innerHTML = legendHTML(STATUTS, STATUT_COULEUR);

  const DK = ["Mesurée", "Référence disponible", "À mesurer"];
  const DC = { "Mesurée": "#2F7D4F", "Référence disponible": "#16264A", "À mesurer": "#C3CAD8" };
  stacked("chart-data", D.axes.map((a) => {
    const ks = D.kpi.filter((k) => k.axe === a.n);
    return { label: `Axe ${a.n} : ${a.court}`, c: a.couleur, v: { "Mesurée": count(ks, (k) => k.actuel != null), "Référence disponible": count(ks, (k) => k.actuel == null && k.ref != null), "À mesurer": count(ks, (k) => k.actuel == null && k.ref == null) } };
  }), DK, DC);
  document.getElementById("data-legend").innerHTML = legendHTML(DK, DC);

  // Évolution : indicateurs disposant d'au moins deux points dans « historique »
  const evo = D.kpi.filter((k) => Array.isArray(k.historique) && k.historique.length >= 2);
  const evoBox = document.getElementById("evolution");
  if (!evo.length) {
    evoBox.innerHTML = `<p class="empty">Aucune évolution à afficher pour l'instant : la démarche n'a pas encore été lancée. Les courbes apparaîtront dès que deux mesures d'un même indicateur seront saisies dans <code>data.js</code> (champ <code>historique</code>), par exemple après la première revue trimestrielle du comité de pilotage.</p>`;
  } else {
    evoBox.innerHTML = `<div class="spark-grid">${evo.map((k) => {
      const vals = k.historique.map((h) => h.valeur), mn = Math.min(...vals), mx = Math.max(...vals), span = mx - mn || 1;
      const pts = k.historique.map((h, i) => `${(i / (vals.length - 1)) * 200},${50 - ((h.valeur - mn) / span) * 44}`).join(" ");
      const first = k.historique[0], last = k.historique[k.historique.length - 1];
      return `<div class="spark"><p class="spark-name">${esc(k.nom)}</p><svg viewBox="-4 0 208 56" role="img" aria-label="${esc(k.nom)} : de ${first.valeur} à ${last.valeur}"><polyline points="${pts}" fill="none" stroke="${axeColor(k.axe)}" stroke-width="2.5"/></svg><p class="spark-v">${fmt(first.valeur)} (${first.date}) → <strong>${fmt(last.valeur)}</strong> (${last.date})</p></div>`;
    }).join("")}</div>`;
  }

  const SUIVI = {
    1: "Décisions et réunions du comité de pilotage, rapport annuel, reporting aux partenaires",
    2: "Formations et sensibilisations, satisfaction des équipes, bénévolat, protection de l'enfance",
    3: "Énergie, surfaces cultivées, consommation, émissions de CO₂ dès que les données existent",
    4: "Bénéficiaires, résultats par projet, satisfaction, emplois et retours des parties prenantes",
  };
  document.getElementById("axis-track").innerHTML = D.axes.map((a) => {
    const ks = D.kpi.filter((k) => k.axe === a.n), acts = actions.filter((x) => x.axe === a.n);
    return `<div class="track" style="--c:${a.couleur}"><h4>Axe ${a.n} : ${a.court}</h4><p>${SUIVI[a.n]}</p><p class="track-n">${ks.length} indicateurs, ${acts.length} actions</p></div>`;
  }).join("");

  /* ================================================================
     FEUILLE DE ROUTE INTERACTIVE
     ================================================================ */
  const gantt = document.getElementById("gantt");
  const detail = document.getElementById("road-detail");
  const roadState = { axe: 0, statut: "Tous" };
  const showDetail = (i) => {
    const f = actions[i], a = D.axes.find((x) => x.n === f.axe);
    [...gantt.querySelectorAll(".g-row")].forEach((r) => r.classList.toggle("active", Number(r.dataset.i) === i));
    detail.innerHTML = `<p class="detail-axe" style="--c:${a.couleur}">Axe ${a.n} : ${esc(a.nom)}</p>
      <h3>${esc(f.action)}</h3>
      <dl>
        <div><dt>Statut</dt><dd><span class="pill" style="--c:${STATUT_COULEUR[f.s]}">${f.s}</span></dd></div>
        <div><dt>Responsable</dt><dd>${esc(f.responsable)}</dd></div>
        <div><dt>Période</dt><dd>${lancement ? `${moisFR(addMonths(lancement, f.debut))} → ${moisFR(addMonths(lancement, f.fin))}` : `Mois ${f.debut} à ${f.fin} après le lancement`}</dd></div>
        <div><dt>Échéance</dt><dd>${echeance(f)}</dd></div>
        <div><dt>Budget estimé</dt><dd>${budget(f)}</dd></div>
        <div><dt>Indicateur de réalisation</dt><dd>${esc(f.indicateur)}</dd></div>
      </dl>`;
  };
  const renderRoad = () => {
    const ticks = [0, 3, 6, 9, 12, 15, 18];
    let html = `<div class="g-row g-head" aria-hidden="true"><div class="g-label">Action (en mois après le lancement)</div><div class="g-track">${ticks.map((m) => `<span class="g-tick" style="left:${(m / 18) * 100}%">${m === 0 ? "Début" : "M" + m}</span>`).join("")}</div></div>`;
    const visible = actions.map((f, i) => ({ f, i })).filter(({ f }) => (!roadState.axe || f.axe === roadState.axe) && (roadState.statut === "Tous" || f.s === roadState.statut));
    html += visible.map(({ f, i }) => `<button type="button" class="g-row" role="listitem" data-i="${i}" aria-label="${esc(f.action)}, ${f.s}, échéance ${echeance(f)}">
        <span class="g-label"><span class="pill small" style="--c:${STATUT_COULEUR[f.s]}">${f.s}</span>${esc(f.action)}</span>
        <span class="g-track"><span class="year1"></span><span class="g-bar" style="--c:${axeColor(f.axe)};left:${(f.debut / 18) * 100}%;width:${((f.fin - f.debut) / 18) * 100}%"></span></span>
      </button>`).join("");
    if (!visible.length) html += `<p class="empty">Aucune action ne correspond à ces filtres.</p>`;
    gantt.innerHTML = html;
    gantt.querySelectorAll("button.g-row").forEach((b) => b.addEventListener("click", () => showDetail(Number(b.dataset.i))));
    if (visible.length) showDetail(visible[0].i); else detail.innerHTML = "";
  };
  const filterGroup = (id, opts, key, onChange) => {
    const box = document.getElementById(id);
    box.innerHTML = opts.map((o) => `<button type="button" data-v="${o.v}" aria-pressed="false">${o.label}</button>`).join("");
    const set = (v) => { box.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === String(v)))); onChange(v); };
    box.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => set(b.dataset.v)));
    set(opts[0].v);
  };
  const axisOpts = [{ v: 0, label: "Tous les axes" }, ...D.axes.map((a) => ({ v: a.n, label: `Axe ${a.n} : ${a.court}` }))];
  filterGroup("road-axes", axisOpts, "axe", (v) => { roadState.axe = Number(v); renderRoad(); });
  filterGroup("road-status", [{ v: "Tous", label: "Tous les statuts" }, ...STATUTS.map((s) => ({ v: s, label: s }))], "statut", (v) => { roadState.statut = v; renderRoad(); });

  /* ================================================================
     INDICATEURS
     ================================================================ */
  const kbody = document.getElementById("kpi-body");
  const kState = { axe: 0, q: "" };
  const kpiVisible = () => D.kpi.filter((k) => (!kState.axe || k.axe === kState.axe) && k.nom.toLowerCase().includes(kState.q));
  const renderKpi = () => {
    const rows = kpiVisible();
    kbody.innerHTML = rows.map((k) => `<tr style="--c:${axeColor(k.axe)}">
      <td data-l="Indicateur"><span class="k-name">${esc(k.nom)}</span><span class="k-unit">Axe ${k.axe} · ${esc(k.unite)}</span>${k.note ? `<span class="k-note">${esc(k.note)}</span>` : ""}</td>
      <td data-l="Référence">${valeur(k.ref, k.refStatut)}</td>
      <td data-l="Cible année 1">${esc(k.cible)}</td>
      <td data-l="Dernière valeur">${valeur(k.actuel, k.actuelStatut || "mesure")}</td>
      <td data-l="Fréquence">${esc(k.frequence)}</td>
      <td data-l="Source">${esc(k.source)}</td>
      <td data-l="Responsable">${esc(k.responsable)}</td></tr>`).join("") || `<tr><td colspan="7" class="empty">Aucun indicateur ne correspond à cette recherche.</td></tr>`;
    document.getElementById("kpi-count").textContent = `${rows.length} indicateur${rows.length > 1 ? "s" : ""} affiché${rows.length > 1 ? "s" : ""} sur ${D.kpi.length}.`;
  };
  filterGroup("kpi-filters", axisOpts, "axe", (v) => { kState.axe = Number(v); renderKpi(); });
  document.getElementById("kpi-search").addEventListener("input", (e) => { kState.q = e.target.value.trim().toLowerCase(); renderKpi(); });

  // Export Excel : CSV séparé par des points-virgules, avec BOM pour les accents
  document.getElementById("export-csv").addEventListener("click", () => {
    const head = ["Axe", "Indicateur", "Unité", "Référence", "Statut de la référence", "Cible année 1", "Dernière valeur", "Fréquence", "Source", "Responsable"];
    const lines = kpiVisible().map((k) => [k.axe, k.nom, k.unite, k.ref ?? "À mesurer", k.ref == null ? "" : STATUT_DONNEE[k.refStatut] || "", k.cible, k.actuel ?? "À mesurer", k.frequence, k.source, k.responsable]);
    const csv = [head, ...lines].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `indicateurs-rso-wallah-we-can-${M_.miseAJour || "export"}.csv` });
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  });
  // Export PDF : impression de la seule section des indicateurs
  const printOnly = (id) => {
    document.body.dataset.print = id;
    const done = () => { delete document.body.dataset.print; window.removeEventListener("afterprint", done); };
    window.addEventListener("afterprint", done);
    window.print();
  };
  document.getElementById("export-pdf").addEventListener("click", () => printOnly("indicateurs"));

  /* ================================================================
     GÉNÉRATEUR DE RAPPORT
     ================================================================ */
  const now = new Date();
  document.getElementById("r-periode").value = `${["Premier", "Deuxième", "Troisième", "Quatrième"][Math.floor(now.getMonth() / 3)]} trimestre ${now.getFullYear()}`;
  document.getElementById("r-axes").innerHTML = D.axes.map((a) => `<label class="check"><input type="checkbox" value="${a.n}" checked> Axe ${a.n} : ${esc(a.court)}</label>`).join("");

  document.getElementById("report-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const periode = document.getElementById("r-periode").value.trim();
    const dest = document.getElementById("r-dest").value;
    const reco = document.getElementById("r-reco").value.trim();
    const axesSel = [...document.querySelectorAll("#r-axes input:checked")].map((i) => Number(i.value));
    const box = document.getElementById("report");
    if (!axesSel.length) { box.hidden = false; box.innerHTML = `<p class="empty">Sélectionnez au moins un axe pour générer le rapport.</p>`; return; }

    const acts = actions.filter((a) => axesSel.includes(a.axe));
    const ks = D.kpi.filter((k) => axesSel.includes(k.axe));
    const correct = acts.filter((a) => a.s === "En retard");
    const aMesurer = ks.filter((k) => k.ref == null && k.actuel == null);

    const sectionAxe = (a) => {
      const aa = acts.filter((x) => x.axe === a.n), kk = ks.filter((k) => k.axe === a.n);
      return `<section class="r-axe"><h3 style="--c:${a.couleur}">Axe ${a.n} : ${esc(a.nom)}</h3>
        <p><strong>Objectif :</strong> ${esc(a.objectif)}</p>
        <p><strong>Actions :</strong> ${STATUTS.map((s) => `${count(aa, (x) => x.s === s)} ${s.toLowerCase()}`).join(", ")}.</p>
        <table class="r-table"><thead><tr><th>Indicateur</th><th>Référence</th><th>Cible</th><th>Dernière valeur</th><th>Écart</th></tr></thead><tbody>
        ${kk.map((k) => `<tr><td>${esc(k.nom)}</td><td>${k.ref ?? "À mesurer"}</td><td>${esc(k.cible)}</td><td>${k.actuel ?? "À mesurer"}</td><td>${k.actuel == null ? "Non évaluable" : "À analyser par le comité"}</td></tr>`).join("")}
        </tbody></table></section>`;
    };

    box.hidden = false;
    box.innerHTML = `
      <div class="r-head">
        <img src="assets/logo-wwc.png" alt="Wallah We Can" width="150" height="18">
        <div><h2>Rapport de suivi RSO</h2><p>${esc(periode)}, à l'attention de : ${esc(dest)}</p></div>
      </div>
      <div class="r-meta">
        <p>Données mises à jour le ${updateDate}. Rapport généré le ${dateFR(now)}.</p>
        <p>Référentiel : ISO 26000. Statuts des données : constaté lors du diagnostic, déclaré par l'association ou mesuré.</p>
      </div>
      <section><h3>1. Synthèse</h3>
        <ul>
          <li>Maturité RSO initiale : <strong>${fmt(moy.toFixed(1))} / 5</strong> (diagnostic du mémoire).</li>
          <li>Actions couvertes : <strong>${acts.length}</strong>, dont ${count(acts, (a) => a.s === "Réalisée")} réalisées, ${count(acts, (a) => a.s === "En cours")} en cours, ${correct.length} en retard et ${count(acts, (a) => a.s === "À lancer")} à lancer.</li>
          <li>Indicateurs couverts : <strong>${ks.length}</strong>, dont ${count(ks, (k) => k.actuel != null)} mesurés et ${aMesurer.length} sans valeur de référence.</li>
        </ul></section>
      <section><h3>2. Résultats par axe</h3>${D.axes.filter((a) => axesSel.includes(a.n)).map(sectionAxe).join("")}</section>
      <section><h3>3. Actions correctives</h3>
        ${correct.length ? `<ul>${correct.map((a) => `<li><strong>${esc(a.action)}</strong> (échéance ${echeance(a)}, ${esc(a.responsable)}) : à replanifier.</li>`).join("")}</ul>` : "<p>Aucune action en retard sur la période.</p>"}
        ${aMesurer.length ? `<p>Valeurs de référence à établir en priorité : ${aMesurer.map((k) => esc(k.nom)).join(" ; ")}.</p>` : ""}
      </section>
      <section><h3>4. Recommandations</h3>${reco ? reco.split(/\n+/).map((l) => `<p>${esc(l)}</p>`).join("") : "<p>À compléter par le comité de pilotage RSO.</p>"}</section>
      <div class="r-actions no-print"><button class="btn btn-primary" type="button" id="r-print">Enregistrer en PDF</button></div>`;
    document.getElementById("r-print").addEventListener("click", () => printOnly("rapport"));
    box.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ================================================================
     CRÉDITS, NAVIGATION ACTIVE, MENU MOBILE, RETOUR EN HAUT
     ================================================================ */
  const C = M_.credits || {};
  document.getElementById("credits").innerHTML = `Mémoire réalisé par <strong>${esc(C.auteur)}</strong>, Master Professionnel en Management de la Performance et Responsabilité Sociétale des Organisations, ISCAE, année universitaire 2025-2026.<br><br>
    Encadrement académique : ${esc(C.encadrant)}. Maître de stage : ${esc(C.maitreStage)}.<br><br>
    Plateforme conçue en collaboration avec une équipe de développeurs (${esc(C.developpeurs)}) afin de digitaliser les résultats du mémoire et d'en faciliter le suivi par l'association et ses partenaires.`;

  const links = [...document.querySelectorAll("#nav a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => s && io.observe(s));

  const menuBtn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
  menuBtn.addEventListener("click", () => { const o = menuBtn.getAttribute("aria-expanded") === "true"; menuBtn.setAttribute("aria-expanded", String(!o)); nav.classList.toggle("open", !o); });
  links.forEach((l) => l.addEventListener("click", () => { menuBtn.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); }));

  const toTop = document.getElementById("to-top");
  window.addEventListener("scroll", () => { toTop.hidden = window.scrollY < 900; }, { passive: true });
})();
