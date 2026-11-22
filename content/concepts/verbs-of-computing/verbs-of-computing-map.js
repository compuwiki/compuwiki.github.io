"use strict";
// Verbs of Computing map. Data lives in verbs.json; this file is the UI (render, card, i18n, theme).

const WIKI_ROOT = "../../"; // this file lives in content/concepts/verbs-of-computing/

const T = {
  es: {
    title:"Verbos de la Máquina",
    logos:"«En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.»", logosRef:"Juan 1:1",
    wiki:"En la wiki",
    intro:"Diccionario de verbos de la computación. Con puertas lógicas construyes <em>comparar</em> y <em>sumar</em>; con ellos, <em>leer</em> y <em>escribir</em>; y así hasta <em>compilar</em> o <em>desplegar</em>. Cada verbo trae quién hace de cliente y de servidor, qué API los une y cómo se escribe en Bash y PowerShell.",
    fractal:"El mismo patrón se repite a cada escala, como en un cuerpo: células que forman tejidos, tejidos que forman órganos, órganos que forman sistemas. Una máquina digital es un organismo con la misma estructura fractal.",
    fracM:["Máquina","puerta lógica","circuito","componente (CPU, disco)","equipo","red de equipos"],
    fracB:["Cuerpo","célula","tejido","órgano","organismo","sociedad"],
    eqTitle:"La red es el sistema circulatorio",
    eq:[["cable, fibra","vasos sanguíneos"],["paquete","glóbulo con su carga"],["router, switch","bifurcaciones y válvulas"],["ancho de banda","calibre del vaso, caudal"],["latencia","tiempo de circulación"],["congestión","atasco, trombo"],["pérdida de paquetes","hemorragia"],["firewall","sistema inmune en la frontera"],["servidor central","corazón que bombea"],["DNS","receptores que dicen a qué órgano va cada hormona"]],
    group:"Agrupar", layers:"Capas", families:"Familias", lens:"Lente", machine:"Máquina", body:"Cuerpo",
    search:"Buscar verbo…", export:"Exportar JSON", expTitle:"Diccionario en JSON", expHint:"Para ampliar el mapa, edita verbs.json.",
    copyJson:"Copiar JSON", close:"Cerrar", copied:"Copiado.", copyFail:"Texto seleccionado: cópialo con el menú del sistema.",
    lgBuilt:"se construye con", lgChain:"cadena hasta las puertas", lgUsed:"sirve para construir",
    level:"nivel", gates:"puertas", terminal:"Terminal", copy:"Copiar",
    who:"Quién hace qué", client:"Cliente", server:"Servidor", api:"API", bodyRole:"Cuerpo",
    builtFrom:"Se construye con", usedFor:"Sirve para construir", chainTitle:"Cadena hasta las puertas",
    noBase:"Nada: sale directamente de puertas lógicas.", noDeps:"Todavía ningún verbo del mapa.", level0:"Nivel 0: sale directamente de puertas lógicas.",
    psVerb:"Verbo de PowerShell", psNone:"sin verbo propio en PowerShell",
    empty:"Toca un verbo del mapa para ver su comando, de qué verbos se construye y quién hace de cliente, servidor y API.",
    themeDark:"Tema oscuro activado. Cambiar a claro", themeLight:"Tema claro activado. Cambiar a oscuro",
    foot:(v,n,c,f) => `Versión ${v} · ${n} verbos · ${c} capas · ${f} familias · lente máquina y cuerpo`
  },
  en: {
    title:"Machine Verbs",
    logos:"“In the beginning was the Word, and the Word was with God, and the Word was God.”", logosRef:"John 1:1",
    wiki:"In the wiki",
    intro:"A dictionary of computing verbs. From logic gates you build <em>compare</em> and <em>add</em>; from those, <em>read</em> and <em>write</em>; and so on up to <em>compile</em> and <em>deploy</em>. Each verb shows who acts as client and server, which API connects them, and how to write it in Bash and PowerShell.",
    fractal:"The same pattern repeats at every scale, like a body: cells form tissues, tissues form organs, organs form systems. A digital machine is an organism with the same fractal structure.",
    fracM:["Machine","logic gate","circuit","component (CPU, disk)","computer","network of computers"],
    fracB:["Body","cell","tissue","organ","organism","society"],
    eqTitle:"The network is the circulatory system",
    eq:[["cable, fiber","blood vessels"],["packet","blood cell with its cargo"],["router, switch","branches and valves"],["bandwidth","vessel width, flow"],["latency","circulation time"],["congestion","jam, clot"],["packet loss","bleeding"],["firewall","immune system at the border"],["central server","the pumping heart"],["DNS","receptors that tell each hormone which organ it is for"]],
    group:"Group by", layers:"Layers", families:"Families", lens:"Lens", machine:"Machine", body:"Body",
    search:"Search verb…", export:"Export JSON", expTitle:"Dictionary as JSON", expHint:"To grow the map, edit verbs.json.",
    copyJson:"Copy JSON", close:"Close", copied:"Copied.", copyFail:"Text selected: copy it with your system menu.",
    lgBuilt:"built from", lgChain:"chain down to the gates", lgUsed:"used to build",
    level:"level", gates:"gates", terminal:"Terminal", copy:"Copy",
    who:"Who does what", client:"Client", server:"Server", api:"API", bodyRole:"Body",
    builtFrom:"Built from", usedFor:"Used to build", chainTitle:"Chain down to the gates",
    noBase:"Nothing: it comes straight from logic gates.", noDeps:"No verb on the map uses it yet.", level0:"Level 0: comes straight from logic gates.",
    psVerb:"PowerShell verb", psNone:"no dedicated PowerShell verb",
    empty:"Tap a verb on the map to see its command, which verbs it is built from, and who acts as client, server and API.",
    themeDark:"Dark theme on. Switch to light", themeLight:"Light theme on. Switch to dark",
    foot:(v,n,c,f) => `Version ${v} · ${n} verbs · ${c} layers · ${f} families · machine and body lens`
  }
};

// Runs before the data loads, so the page never flashes the wrong theme or header.
const narrow = () => matchMedia("(max-width:900px)").matches;
// Embedded in a same-site page (or ?embed): hide the header. Quartz strips "?" from iframe src, hence frameElement.
const EMBED = new URLSearchParams(location.search).has("embed") || (() => { try { return !!window.frameElement; } catch(e){ return false; } })();
if (EMBED) document.documentElement.classList.add("embed");
// Theme is shared with Quartz through localStorage "theme".
const quartzTheme = () => { try { return localStorage.getItem("theme"); } catch(e){ return null; } };
const INITIAL_LIGHT = quartzTheme() ? quartzTheme() === "light" : matchMedia("(prefers-color-scheme: light)").matches;
document.documentElement.classList.toggle("light", INITIAL_LIGHT);

fetch("verbs.json")
  .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
  .then(start)
  .catch(err => {
    console.error(err);
    document.documentElement.classList.add("ready");
    const card = document.querySelector("#card");
    if (card) card.innerHTML = '<p class="def">Could not load <code>verbs.json</code>. Open this page through a web server (the wiki, <code>pnpm serve</code>), not straight from disk.</p>';
  });

function start(DATA){
  const WIKI_TITLES = DATA.wikiTitles;
  const $ = s => document.querySelector(s);
  const byId = Object.fromEntries(DATA.palabras.map(p => [p.id, p]));
  const deps = {}; DATA.palabras.forEach(p => deps[p.id] = []);
  DATA.palabras.forEach(p => p.base.forEach(b => deps[b] && deps[b].push(p.id)));
  const capaById = Object.fromEntries(DATA.capas.map(c => [c.id, c]));
  const famById = Object.fromEntries(DATA.familias.map(c => [c.id, c]));
  const depthMemo = {};
  const depth = id => depthMemo[id] ?? (depthMemo[id] = byId[id].base.length ? 1 + Math.max(...byId[id].base.map(depth)) : 0);
  const ancestors = id => { const out = new Set(), stack = [...byId[id].base]; while (stack.length){ const b = stack.pop(); if (!out.has(b)){ out.add(b); stack.push(...byId[b].base); } } return out; };

  const st = { group:"capa", lens:"maquina", lang:"en", sel:narrow() ? null : "compilar", q:"",
    light: INITIAL_LIGHT };
  try { const s = JSON.parse(localStorage.getItem("vdm-ui-5")||"null"); if (s){ st.group=s.group||st.group; st.lens=s.lens||st.lens; st.lang=s.lang||st.lang; } } catch(e){}
  { const h = decodeURIComponent(location.hash.slice(1)); if (byId[h]) st.sel = h; }
  const save = () => { try { localStorage.setItem("vdm-ui-5", JSON.stringify({group:st.group, lens:st.lens, lang:st.lang})); } catch(e){} };

  const t = k => T[st.lang][k];
  const L = o => o[st.lang];            // texto bilingüe {es,en}
  const vb = p => p[st.lang];           // nombre del verbo en el idioma activo
  const gName = g => st.lens === "cuerpo" ? L(g.cuerpo) : g[st.lang];
  const gDesc = g => st.lens === "cuerpo" ? L(g.cuerpoDesc) : L(g.desc);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

  const NS = "http://www.w3.org/2000/svg";
  const mk = (tag, a={}) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); return e; };
  const cv = document.createElement("canvas").getContext("2d");
  const tw = (s, f) => { cv.font = f; return cv.measureText(s).width; };
  let pos = {};

  function render(){
    const svg = $("#g"), W = Math.max(300, svg.clientWidth || 600);
    const groups = st.group === "capa" ? DATA.capas : DATA.familias;
    const key = st.group === "capa" ? "capa" : "fam";
    const bandsG = $("#bands"), nodesG = $("#nodes");
    bandsG.innerHTML = ""; nodesG.innerHTML = ""; pos = {};
    const pad = 10, gap = 8, h = 30;
    let y = 0;
    groups.forEach(g => {
      const top = y; y += 40; let x = pad, rowH = 0;
      const items = DATA.palabras.filter(p => p[key] === g.id);
      items.forEach(p => {
        const w = Math.ceil(tw(vb(p), '500 13.5px "IBM Plex Sans", sans-serif')) + 22;
        if (x + w > W - pad && x > pad){ x = pad; y += rowH + gap; rowH = 0; }
        pos[p.id] = {x, y, w, h};
        x += w + gap; rowH = h;
      });
      y += rowH + 12;
      bandsG.append(mk("rect", {x:0, y:top, width:W, height:y-top, rx:6, class:"band-bg"}));
      const tt = mk("text", {x:pad, y:top+16, class:"band-t"}); tt.textContent = gName(g); bandsG.append(tt);
      const d = mk("text", {x:pad, y:top+31, class:"band-d"});
      const full = gDesc(g); let ds = full; while (ds.length > 8 && tw(ds, '400 11.5px "IBM Plex Sans"') > W - pad*2) ds = ds.slice(0, -2);
      d.textContent = ds === full ? ds : ds.trimEnd() + "…"; bandsG.append(d);
      items.forEach(p => {
        const P = pos[p.id];
        const ng = mk("g", {class:"node", tabindex:"0", role:"button", "data-id":p.id, "aria-label":vb(p)});
        ng.append(mk("rect", {x:P.x, y:P.y, width:P.w, height:P.h, rx:5}));
        const tx = mk("text", {x:P.x + 11, y:P.y + 19.5}); tx.textContent = vb(p); ng.append(tx);
        ng.addEventListener("click", () => select(p.id));
        ng.addEventListener("keydown", e => { if (e.key==="Enter"||e.key===" "){ e.preventDefault(); select(p.id); } });
        nodesG.append(ng);
      });
      y += 6;
    });
    svg.setAttribute("viewBox", `0 0 ${W} ${y}`);
    svg.setAttribute("height", y);
    drawEdges(); paint();
  }

  function edgePath(a, b){
    const A = pos[a], B = pos[b];
    const ax = A.x + A.w/2, bx = B.x + B.w/2;
    if (A.y + A.h <= B.y){ const y1 = A.y + A.h, y2 = B.y - 1, m = (y2-y1)/2; return `M${ax},${y1} C${ax},${y1+m} ${bx},${y2-m} ${bx},${y2}`; }
    if (B.y + B.h <= A.y){ const y1 = A.y, y2 = B.y + B.h + 1, m = (y1-y2)/2; return `M${ax},${y1} C${ax},${y1-m} ${bx},${y2+m} ${bx},${y2}`; }
    const y1 = A.y, lift = 22; return `M${ax},${y1} C${ax},${y1-lift} ${bx},${B.y-lift} ${bx},${B.y-1}`;
  }
  function drawEdges(){
    const eg = $("#edges"); eg.innerHTML = "";
    DATA.palabras.forEach(p => p.base.forEach(b => {
      if (pos[b] && pos[p.id]) eg.append(mk("path", {d:edgePath(b, p.id), class:"edge", "data-from":b, "data-to":p.id}));
    }));
  }
  function paint(){
    const s = st.sel, q = st.q.trim().toLowerCase();
    const bases = s ? new Set(byId[s].base) : new Set(), ds = s ? new Set(deps[s]) : new Set();
    const anc = s ? ancestors(s) : new Set();
    document.querySelectorAll(".node").forEach(n => {
      const id = n.dataset.id, p = byId[id];
      const match = !q || [p.es, p.en, p.def.es, p.def.en, p.cuerpo.es, p.cuerpo.en, p.bash, p.pwsh, p.ps||""].join(" ").toLowerCase().includes(q);
      n.classList.toggle("sel", id === s);
      n.classList.toggle("isbase", bases.has(id));
      n.classList.toggle("isanc", anc.has(id) && !bases.has(id));
      n.classList.toggle("isdep", ds.has(id));
      n.classList.toggle("dim", q ? !match : (s && id !== s && !anc.has(id) && !ds.has(id)));
    });
    document.querySelectorAll(".edge").forEach(e => {
      const f = e.dataset.from, to = e.dataset.to;
      const inn = s && to === s, out = s && f === s, chain = s && anc.has(f) && anc.has(to);
      e.setAttribute("class", "edge" + (inn ? " in" : out ? " out" : chain ? " anc" : s ? " hide" : ""));
      if (inn) e.setAttribute("marker-end","url(#arrIn)"); else if (out) e.setAttribute("marker-end","url(#arrOut)"); else e.removeAttribute("marker-end");
    });
  }

  function chainHtml(p){
    const anc = [...ancestors(p.id)];
    if (!anc.length) return `<div class="sec"><h3>${t("chainTitle")}</h3><span class="none">${t("level0")}</span></div>`;
    const byLv = {}; anc.forEach(a => (byLv[depth(a)] ||= []).push(a));
    const rows = Object.keys(byLv).map(Number).sort((a,b) => b-a).map(lv =>
      `<div class="lv"><span>${t("level")} ${lv}</span><div class="chips">${byLv[lv].map(i => `<button class="chip" data-go="${i}">${esc(vb(byId[i]))}</button>`).join("")}</div></div>`).join("");
    return `<div class="sec"><h3>${t("chainTitle")}</h3><div class="chain-l">${rows}<div class="lv"><span>${t("gates")}</span><div class="none">AND · OR · NOT</div></div></div></div>`;
  }
  function card(){
    const el = $("#card"), p = byId[st.sel];
    document.body.classList.toggle("has-sheet", !!p && narrow());
    if (!p){ el.hidden = narrow(); el.innerHTML = `<p class="def">${t("empty")}</p>`; return; }
    el.hidden = false;
    const role = (cls, name, r) => `<div class="role ${cls}"><span class="r">${name}</span><p>${esc(L(r))}</p><code>${esc(r.ej)}</code></div>`;
    const chips = (ids, cls, none) => ids.length ? `<div class="chips">${ids.map(i => `<button class="chip ${cls}" data-go="${i}">${esc(vb(byId[i]))}</button>`).join("")}</div>` : `<span class="none">${none}</span>`;
    const cmd = (name, code) => `<div class="cmd"><div class="cmd-h"><span class="lbl">${name}</span><button data-copy="${esc(code)}">${t("copy")}</button></div><pre><code>${esc(code)}</code></pre></div>`;
    el.innerHTML = `
      <button class="btn sheet-close" id="closeCard">${t("close")}</button>
      <div>
        <div class="kick"><span>${esc(gName(capaById[p.capa]))}</span><span>·</span><span>${esc(gName(famById[p.fam]))}</span><span class="lvl">${t("level")} ${depth(p.id)}</span></div>
        <h2>${esc(vb(p))}</h2>
        <div class="pstag">${t("psVerb")}: ${p.ps ? `<b>${esc(p.ps)}</b>` : `<span>${t("psNone")}</span>`}</div>
      </div>
      <p class="def">${esc(L(p.def))}</p>
      <div class="sec"><h3>${t("terminal")}</h3>${cmd("Bash", p.bash)}${cmd("PowerShell", p.pwsh)}</div>
      <div class="sec"><h3>${t("who")}</h3>
        ${role("c", t("client"), p.cliente)}${role("s", t("server"), p.servidor)}${role("a", t("api"), p.api)}
        <div class="role o"><span class="r">${t("bodyRole")}</span><p>${esc(L(p.cuerpo))}</p><code>${esc(L(capaById[p.capa].cuerpo))} · ${esc(L(famById[p.fam].cuerpo))}</code></div>
      </div>
      <div class="sec"><h3>${t("builtFrom")}</h3>${chips(p.base, "b", t("noBase"))}</div>
      <div class="sec"><h3>${t("usedFor")}</h3>${chips(deps[p.id], "d", t("noDeps"))}</div>
      ${chainHtml(p)}
      ${p.wiki ? `<div class="sec"><h3>${t("wiki")}</h3><div class="wiki">${p.wiki.map(w => `<a href="${WIKI_ROOT}${w}" target="_top">${esc(WIKI_TITLES[w] || w)}</a>`).join("")}</div></div>` : ""}`;
    el.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => select(b.dataset.go)));
    el.querySelectorAll("[data-copy]").forEach(b => b.addEventListener("click", () => {
      navigator.clipboard.writeText(b.dataset.copy).then(() => { b.textContent = t("copied"); setTimeout(() => b.textContent = t("copy"), 1400); })
        .catch(() => { const r = document.createRange(); r.selectNodeContents(b.closest(".cmd").querySelector("code")); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); });
    }));
    const c = $("#closeCard"); if (c) c.addEventListener("click", () => { st.sel = null; paint(); card(); });
    el.scrollTop = 0;
  }
  function select(id){ st.sel = id; try { history.replaceState(null, "", "#" + id); } catch(e){} paint(); card(); }

  function i18n(){
    document.documentElement.lang = st.lang;
    document.title = t("title");
    document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = t(e.dataset.i18n));
    document.querySelectorAll("[data-i18n-html]").forEach(e => e.innerHTML = t(e.dataset.i18nHtml));
    $("#q").placeholder = t("search"); $("#q").setAttribute("aria-label", t("search"));
    $("#chain").innerHTML = `<b>AND·OR·NOT</b>` + ["comparar","leer","traducir","compilar","desplegar"].map(i => `<i>→</i><b>${esc(vb(byId[i]))}</b>`).join("");
    const fm = t("fracM"), fb = t("fracB");
    $("#frac").innerHTML = `<span class="h">${fm[0]}</span>` + fm.slice(1).map(x => `<span class="c">${esc(x)}</span>`).join("") +
                           `<span class="h">${fb[0]}</span>` + fb.slice(1).map(x => `<span class="c b">${esc(x)}</span>`).join("");
    $("#eq").innerHTML = t("eq").map(([a,b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("");
    $("#foot").textContent = T[st.lang].foot(DATA.version, DATA.palabras.length, DATA.capas.length, DATA.familias.length);
  }
  function syncCtl(){
    $("#gCapas").setAttribute("aria-pressed", st.group==="capa");
    $("#gFam").setAttribute("aria-pressed", st.group==="fam");
    $("#lM").setAttribute("aria-pressed", st.lens==="maquina");
    $("#lC").setAttribute("aria-pressed", st.lens==="cuerpo");
    $("#lang-es").setAttribute("aria-pressed", st.lang==="es");
    $("#lang-en").setAttribute("aria-pressed", st.lang==="en");
    document.documentElement.classList.toggle("light", st.light);
    $("#theme").setAttribute("aria-checked", String(!st.light));
    $("#theme").setAttribute("aria-label", st.light ? t("themeLight") : t("themeDark"));
  }
  const refresh = () => { save(); syncCtl(); i18n(); render(); card(); };
  $("#gCapas").onclick = () => { st.group="capa"; refresh(); };
  $("#gFam").onclick = () => { st.group="fam"; refresh(); };
  $("#lM").onclick = () => { st.lens="maquina"; refresh(); };
  $("#lC").onclick = () => { st.lens="cuerpo"; refresh(); };
  $("#lang-es").onclick = () => { st.lang="es"; refresh(); };
  $("#lang-en").onclick = () => { st.lang="en"; refresh(); };
  $("#theme").onclick = () => { st.light = !st.light; try { localStorage.setItem("theme", st.light ? "light" : "dark"); } catch(e){} syncCtl(); };
  // Seguir el tema de la wiki: otras pestañas (evento storage) y la página que nos incrusta (atributo saved-theme)
  const followTheme = v => { if (v === "light" || v === "dark"){ st.light = v === "light"; syncCtl(); } };
  addEventListener("storage", e => { if (e.key === "theme") followTheme(e.newValue); });
  try {
    const root = window.parent !== window && window.parent.document.documentElement;
    if (root){ followTheme(root.getAttribute("saved-theme"));
      new MutationObserver(() => followTheme(root.getAttribute("saved-theme"))).observe(root, {attributes:true, attributeFilter:["saved-theme"]}); }
  } catch(e){}
  $("#q").addEventListener("input", e => { st.q = e.target.value; paint(); });
  $("#expBtn").onclick = () => { $("#expTxt").value = JSON.stringify(DATA, null, 2); $("#exp").hidden = false; $("#copyMsg").textContent = ""; };
  $("#expClose").onclick = () => { $("#exp").hidden = true; };
  $("#copyBtn").onclick = () => {
    const ta = $("#expTxt");
    navigator.clipboard.writeText(ta.value).then(() => { $("#copyMsg").textContent = t("copied"); })
      .catch(() => { ta.focus(); ta.select(); $("#copyMsg").textContent = t("copyFail"); });
  };
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { render(); card(); }, 120); });

  syncCtl(); i18n(); render(); card();
  document.documentElement.classList.add("ready");
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
}
