// Delirium OS — arranque, entrada, menú lateral, navegación y buscador global.
(function (D) {
  const esc = D.esc;
  const root = document.getElementById('root');
  const CUSTOM = ['inicio', 'calendario', 'reportes', 'mapa', 'actividad', 'ajustes'];
  D.isAdmin = () => !!(D.me && D.meta && D.meta.roles[D.me.rol] && D.meta.roles[D.me.rol].admin);
  D.canRead = (k) => !!(D.meta && D.meta.modules.some(m => m.key === k));
  const setTheme = (t) => document.documentElement.dataset.theme = t === 'claro' ? 'claro' : 'oscuro';

  // ───────────── entrada ─────────────
  async function boot() {
    D.info = (await window.dos.info()).data;
    let has;
    try { has = await D.call('hasUsers'); }
    catch (e) { if (D.info.modo === 'nube') return sinNube(e.message); throw e; }
    const me = await D.call('me');
    if (me) return start(me);
    if (!has) return setupScreen();
    return loginScreen();
  }
  const enLinea = () => D.info && D.info.modo === 'nube' ? '<p class="small" style="margin:0"><span class="badge ok">En línea</span> Conectado a la nube del estudio.</p>' : '<button type="button" class="link-btn" data-conectar>¿Tu estudio ya trabaja en línea? Conectar a la nube de mi estudio</button>';
  const bindConectar = () => { const b = root.querySelector('[data-conectar]'); if (b) b.onclick = () => D.conectarConCodigo(); };
  function sinNube(msg) {
    root.innerHTML = `<div class="auth">${art}<div class="panel"><div style="width:min(440px,100%);display:flex;flex-direction:column;gap:14px"><span class="label">Sin conexión</span><h1>No pudimos llegar a la nube del estudio</h1>
      <p class="sub">${esc(msg)}</p><button class="btn primary" data-retry>Intentar de nuevo</button><button class="btn" data-local>Usar los datos de este equipo</button></div></div></div>`;
    root.querySelector('[data-retry]').onclick = () => boot();
    root.querySelector('[data-local]').onclick = async () => { if (await D.confirm('Usar datos de este equipo', 'La app se reiniciará sin la nube. Podrás volver a conectarte desde Ajustes.', 'Usar este equipo', 'violet')) window.dos.nube.desconectar(); };
  }
  const art = `<div class="art"><img src="spiro.png" alt="Spiro, la mascota de Delirium"><div class="tag">FOLLOW THE GLOW · STAY DELIRIOUS</div></div>`;
  function setupScreen() {
    root.innerHTML = `<div class="auth">${art}<div class="panel"><form novalidate>
      <div><span class="label">Primera vez</span><h1>Bienvenido a Delirium OS</h1></div>
      <p class="sub">Crea la cuenta principal (Founder / CEO). Con ella podrás crear las cuentas del equipo y de los clientes.</p>
      ${D.fieldHtml({ key: 'nombre', label: 'Tu nombre', required: true })}
      ${D.fieldHtml({ key: 'email', label: 'Tu correo', type: 'email', required: true, placeholder: 'nombre@staydelirious.com' })}
      ${D.fieldHtml({ key: 'password', label: 'Contraseña', type: 'password', required: true, hint: 'Mínimo 8 caracteres.' })}
      ${D.fieldHtml({ key: 'password2', label: 'Repite la contraseña', type: 'password', required: true })}
      ${D.fieldHtml({ key: 'demo', label: 'Cargar datos de ejemplo para explorar (se pueden borrar)', type: 'checkbox' }, { demo: true })}
      <div class="err" role="alert"></div>
      <button class="btn primary" type="submit">Crear cuenta y entrar</button>${enLinea()}</form></div></div>`;
    bindConectar();
    const f = root.querySelector('form');
    f.onsubmit = async (e) => {
      e.preventDefault(); const v = D.readForm(f); if (!v) return;
      const err = f.querySelector('.err');
      if (v.password !== v.password2) { err.textContent = 'Las contraseñas no coinciden.'; return; }
      try { const me = await D.call('setup', v); start(me); } catch (ex) { err.textContent = ex.message; }
    };
  }
  async function loginScreen() {
    const demo = await D.call('demoAccounts');
    root.innerHTML = `<div class="auth">${art}<div class="panel"><form novalidate>
      <div><span class="label">Delirium Studios</span><h1>Entrar a Delirium OS</h1></div>
      <p class="sub">Usa el correo y la contraseña que te dio Dirección.</p>
      ${D.fieldHtml({ key: 'email', label: 'Correo', type: 'email', required: true, placeholder: 'nombre@staydelirious.com' })}
      ${D.fieldHtml({ key: 'password', label: 'Contraseña', type: 'password', required: true })}
      <div class="err" role="alert"></div>
      <button class="btn primary" type="submit">Entrar</button>
      <p class="small muted" style="margin:0">¿Olvidaste tu contraseña? Pídele a Dirección que la restablezca desde Usuarios y roles.</p>${enLinea()}
      ${demo ? `<div class="demo-box"><b>Cuentas de ejemplo</b> · contraseña: <span class="mono">${esc(demo.password)}</span><br><span class="muted">Entra con cada rol para ver qué ve cada persona:</span>${demo.cuentas.map(c => `<button type="button" data-demo="${esc(c.email)}">${esc(c.rol)} — ${esc(c.email)}</button>`).join('')}</div>` : ''}
      </form></div></div>`;
    const f = root.querySelector('form'); bindConectar();
    f.querySelector('[name=password]').setAttribute('autocomplete', 'current-password');
    f.querySelectorAll('[data-demo]').forEach(b => b.onclick = () => { f.querySelector('[name=email]').value = b.dataset.demo; f.querySelector('[name=password]').value = demo.password; f.querySelector('[name=password]').focus(); });
    f.onsubmit = async (e) => {
      e.preventDefault(); const v = D.readForm(f); if (!v) return;
      try { const me = await D.call('login', v.email, v.password); start(me); } catch (ex) { f.querySelector('.err').textContent = ex.message; }
    };
    setTimeout(() => f.querySelector('[name=email]').focus(), 50);
  }

  // ───────────── sesión ─────────────
  async function start(me) {
    D.me = me; setTheme(me.tema);
    D.meta = await D.call('meta');
    D.settings = await D.call('settings');
    D.directory = await D.call('directory');
    await D.refreshRefs();
    renderShell();
    if (!location.hash || location.hash === '#') location.hash = '#/inicio'; else route();
    setTimeout(() => D.buscarActualizacion && D.buscarActualizacion(false), 8000);
  }
  const navClosed = () => { try { const v = JSON.parse(localStorage.getItem('menu-cerrado:' + D.me.id) || 'null'); return v; } catch (e) { return null; } };
  const saveClosed = (arr) => { try { localStorage.setItem('menu-cerrado:' + D.me.id, JSON.stringify(arr)); } catch (e) {} };
  function renderShell() {
    const groups = [];
    for (const m of D.meta.modules) { let g = groups.find(x => x.name === m.group); if (!g) groups.push(g = { name: m.group, items: [] }); g.items.push(m); }
    const role = D.meta.roles[D.me.rol];
    let closed = navClosed();
    if (!closed) { closed = D.meta.modules.length > 16 ? groups.filter(g => g.name && !['Comercial', 'Operación'].includes(g.name)).map(g => g.name) : []; saveClosed(closed); }
    const creatable = D.meta.modules.filter(m => m.level === 'W' && D.SCHEMA[m.key] && !['movimientos', 'equipo'].includes(m.key));
    const canTimer = D.meta.modules.some(m => m.key === 'horas' && m.level === 'W');
    root.innerHTML = `<div class="app"><aside class="sidebar">
        <div class="brand"><span class="logo"><img src="spiro.png" alt=""></span><div><b>Delirium OS</b><span>${esc(D.settings.web || 'staydelirious.com')}</span></div></div>
        <div class="side-tools"><button class="search-btn" data-palette title="Buscar (Ctrl + K)">${D.icon('search')} Buscar</button>${creatable.length ? `<button class="create-btn" data-create title="Crear algo nuevo" aria-label="Crear algo nuevo">${D.icon('plus')} Crear</button>` : ''}</div>
        <nav class="nav" aria-label="Menú principal">${groups.map(g => { const isClosed = g.name && closed.includes(g.name); return `${g.name ? `<button class="group" data-group="${esc(g.name)}" aria-expanded="${!isClosed}"><span class="label">${esc(g.name)}</span><span class="gcount hidden" data-gcount="${esc(g.name)}"></span>${D.icon('chevron')}</button>` : ''}<div class="gitems ${isClosed ? 'closed' : ''}" data-gitems="${esc(g.name)}">${g.items.map(m => `<a href="#/${m.key}" data-nav="${m.key}">${D.icon(m.key)}<span>${esc(m.key === 'inicio' && !role.staff ? 'Mi portal' : m.label)}</span><span class="count hidden" data-count="${m.key}"></span></a>`).join('')}</div>`; }).join('')}</nav>
        ${canTimer ? '<div class="timer" data-timer></div>' : ''}
        <div class="me"><div class="avatar" aria-hidden="true">${esc(D.initials(D.me.nombre))}</div><div class="who"><b title="${esc(D.me.nombre)}">${esc(D.me.nombre)}</b><span>${esc(role.label)}</span></div>
          <div class="me-actions"><button class="icon-btn" data-theme title="Cambiar a tema ${D.me.tema === 'claro' ? 'oscuro' : 'claro'}" aria-label="Cambiar tema">${D.icon(D.me.tema === 'claro' ? 'moon' : 'sun')}</button>
          <button class="icon-btn" data-account title="Mi cuenta" aria-label="Mi cuenta">${D.icon('user')}</button>
          <button class="icon-btn" data-logout title="Cerrar sesión" aria-label="Cerrar sesión">${D.icon('logout')}</button></div></div>
      </aside><div class="side-scrim" data-side-scrim></div><div class="mobile-top"><button class="icon-btn" data-menu aria-label="Abrir menú">${D.icon('menu')}</button><span class="logo"><img src="spiro.png" alt=""></span><b>Delirium OS</b><button class="icon-btn" data-palette-m aria-label="Buscar" style="margin-left:auto">${D.icon('search')}</button></div><main class="main" id="view" tabindex="-1"></main></div>`;
    const appEl = root.querySelector('.app'); const toggleSide = (v) => appEl.classList.toggle('side-open', v);
    root.querySelector('[data-menu]').onclick = () => toggleSide(true); root.querySelector('[data-side-scrim]').onclick = () => toggleSide(false);
    root.querySelector('[data-palette-m]').onclick = () => palette();
    root.querySelectorAll('.sidebar a[data-nav]').forEach(a => a.addEventListener('click', () => toggleSide(false)));
    root.querySelector('[data-palette]').onclick = palette;
    root.querySelector('[data-logout]').onclick = async () => { await D.call('logout'); D.closeAll(); document.querySelectorAll('.update-bar, .fresh-pill').forEach(x => x.remove()); location.hash = ''; loginScreen(); };
    root.querySelector('[data-theme]').onclick = async () => { const t = await D.call('setTheme', D.me.tema === 'claro' ? 'oscuro' : 'claro'); D.me.tema = t; setTheme(t); renderShell(); route(); };
    root.querySelector('[data-account]').onclick = account;
    root.querySelectorAll('[data-group]').forEach(b => b.onclick = () => {
      const name = b.dataset.group; const box = root.querySelector(`[data-gitems="${CSS.escape(name)}"]`); const nowClosed = !box.classList.contains('closed');
      box.classList.toggle('closed', nowClosed); b.setAttribute('aria-expanded', String(!nowClosed));
      const c = new Set(navClosed() || []); nowClosed ? c.add(name) : c.delete(name); saveClosed([...c]);
    });
    const cb = root.querySelector('[data-create]'); if (cb) cb.onclick = () => quickCreate(creatable);
    drawTimer();
    D.updateBadges();
  }
  // ───────────── crear rápido ─────────────
  async function quickCreate(mods) {
    const groups = {}; mods.forEach(m => (groups[m.group || 'General'] = groups[m.group || 'General'] || []).push(m));
    await D.modal({ title: '¿Qué quieres crear?', wide: true, body: `<div class="qc">${Object.entries(groups).map(([g, list]) => `<div><div class="label" style="margin:6px 0">${esc(g)}</div>${list.map(m => `<button class="qc-item" data-qc="${m.key}">${D.icon(m.key)}<span>${esc(D.SCHEMA[m.key].nuevo)}</span></button>`).join('')}</div>`).join('')}</div>`,
      onMount: (m, close) => m.querySelectorAll('[data-qc]').forEach(b => b.onclick = () => { close(); D.openForm(b.dataset.qc); }) });
  }
  // ───────────── cronómetro ─────────────
  const TKEY = () => 'cronometro:' + D.me.id;
  const getTimer = () => { try { return JSON.parse(localStorage.getItem(TKEY()) || 'null'); } catch (e) { return null; } };
  const fmt = (ms) => { const t = Math.floor(ms / 1000); return [Math.floor(t / 3600), Math.floor(t / 60) % 60, t % 60].map(n => String(n).padStart(2, '0')).join(':'); };
  let tickT = null;
  function drawTimer() {
    const box = document.querySelector('[data-timer]'); if (!box) return; clearInterval(tickT);
    const t = getTimer();
    if (!t) { box.innerHTML = `<button class="timer-start" data-tstart title="Mide el tiempo que trabajas en un proyecto">${D.icon('timer')} Iniciar cronómetro</button>`; box.querySelector('[data-tstart]').onclick = startTimer; return; }
    box.innerHTML = `<div class="timer-run"><span class="dot" aria-hidden="true"></span><div class="tt"><b class="mono" data-tclock>${fmt(Date.now() - t.inicio)}</b><span title="${esc(t.nombre)}">${esc(t.nombre)}</span></div><button class="btn sm" data-tstop>${D.icon('stop')} Detener</button></div>`;
    box.querySelector('[data-tstop]').onclick = stopTimer;
    tickT = setInterval(() => { const c = document.querySelector('[data-tclock]'); if (c) c.textContent = fmt(Date.now() - t.inicio); }, 1000);
  }
  async function startTimer() {
    const v = await D.prompt('Iniciar cronómetro', D.fieldHtml({ key: 'project_id', label: '¿En qué proyecto vas a trabajar?', type: 'select', options: () => (D.refs.proyectos || []).map(p => ({ value: p.id, label: p.nombre })) }) + D.fieldHtml({ key: 'nota', label: '¿Qué vas a hacer?', placeholder: 'Ej.: Diseñar posts de la semana' }), 'Iniciar');
    if (!v) return; const p = (D.refs.proyectos || []).find(x => x.id === v.project_id);
    localStorage.setItem(TKEY(), JSON.stringify({ project_id: v.project_id || '', nombre: p ? p.nombre : (v.nota || 'Trabajo general'), nota: v.nota || '', inicio: Date.now() }));
    D.toast('Cronómetro iniciado. Puedes cerrar la app: sigue contando.'); drawTimer();
  }
  async function stopTimer() {
    const t = getTimer(); if (!t) return;
    const horas = Math.max(0.25, Math.round((Date.now() - t.inicio) / 36e5 * 4) / 4);
    const v = await D.prompt('Guardar horas', `<div class="note" style="grid-column:1/-1">Tiempo medido: <b class="mono">${fmt(Date.now() - t.inicio)}</b>. Puedes ajustar las horas antes de guardar.</div>` +
      D.fieldHtml({ key: 'horas', label: 'Horas', type: 'number', decimals: true, required: true }, { horas }) + D.fieldHtml({ key: 'fecha', label: 'Fecha', type: 'date', required: true }, { fecha: D.today() }) +
      D.fieldHtml({ key: 'project_id', label: 'Proyecto', type: 'select', options: () => (D.refs.proyectos || []).map(p => ({ value: p.id, label: p.nombre })) }, { project_id: t.project_id }) + D.fieldHtml({ key: 'nota', label: 'Qué se hizo', type: 'textarea' }, { nota: t.nota }), 'Guardar horas');
    if (!v) { if (await D.confirm('¿Descartar el tiempo?', 'Si no lo guardas, el cronómetro sigue corriendo. ¿Quieres descartarlo?', 'Descartar tiempo')) { localStorage.removeItem(TKEY()); drawTimer(); } return; }
    if (await D.try(() => D.call('save', 'horas', v), 'Horas guardadas.')) { localStorage.removeItem(TKEY()); drawTimer(); if (location.hash === '#/horas') D.rerender(); }
  }
  D.updateBadges = async () => {
    const d = await D.try(() => D.call('dashboard')); if (!d) return;
    const set = (k, n) => { const el = document.querySelector(`[data-count="${k}"]`); if (!el) return; el.textContent = n; el.classList.toggle('hidden', !n); };
    set('recordatorios', (d.recordatorios_hoy || []).length);
    set('tareas', d.mis_tareas ? d.mis_tareas.filter(t => t.vence && t.vence <= D.today()).length : 0);
    set('facturas', d.pagos_por_verificar || 0);
    set('ausencias', d.ausencias_pendientes || 0);
    set('gastos', d.gastos_pendientes || 0);
    set('soporte', d.cliente ? (d.mis_solicitudes || []).filter(t => t.estado === 'Esperando cliente').length : (d.soporte_esperando || 0));
    set('piezas', d.cliente ? (d.piezas_cliente || []).length : (d.piezas_internas || []).length + (d.piezas_cambios || []).length);
    set('redes', d.cliente ? (d.posts_por_aprobar || []).length : 0);
    set('anuncios', d.cliente ? 0 : (d.campanas_alerta || []).length);
    set('planes', d.cliente ? 0 : (d.planes_por_facturar || 0));
    set('bugs', (d.bugs_bloqueantes || []).length);
    set('pedidos', d.pedidos_pendientes || 0);
    document.querySelectorAll('[data-gcount]').forEach(g => { const box = document.querySelector(`[data-gitems="${CSS.escape(g.dataset.gcount)}"]`); const n = [...box.querySelectorAll('.count:not(.hidden)')].reduce((a, x) => a + Number(x.textContent || 0), 0); g.textContent = n; g.classList.toggle('hidden', !n); });
  };

  // ───────────── navegación ─────────────
  let current = 'inicio';
  D.go = (k) => { if (location.hash === `#/${k}`) route(); else location.hash = `#/${k}`; };
  D.rerender = () => route(true);
  async function route(keepOverlay) {
    if (!D.me) return;
    const key = (location.hash.replace('#/', '') || 'inicio').split('/')[0];
    if (!D.canRead(key)) { location.hash = '#/inicio'; return; }
    if (!keepOverlay) D.closeAll();
    current = key;
    document.querySelectorAll('[data-nav]').forEach(a => { a.classList.toggle('active', a.dataset.nav === key); a.setAttribute('aria-current', a.dataset.nav === key ? 'page' : 'false'); });
    const act = document.querySelector(`[data-nav="${key}"]`); const gi = act && act.closest('.gitems.closed'); if (gi) { gi.classList.remove('closed'); const gb = document.querySelector(`[data-group="${CSS.escape(gi.dataset.gitems)}"]`); if (gb) gb.setAttribute('aria-expanded', 'true'); }
    const view = document.getElementById('view'); if (!view) return;
    if (CUSTOM.includes(key)) await D.views[key](view); else await D.views.module(key, view);
    if (!keepOverlay) view.scrollTop = 0;
  }
  window.addEventListener('hashchange', () => route());
  window.dos.onGoto((k) => D.go(k));

  // ───────────── buscador global (Ctrl+K) ─────────────
  async function palette() {
    let sel = 0, results = [];
    const mods = () => D.meta.modules.map(m => ({ modulo: m.key, titulo: m.label, modulo_label: 'Ir a', go: true }));
    await D.modal({ wide: true, body: `<div class="palette"><input class="input" placeholder="Busca clientes, proyectos, facturas, tareas… o escribe el nombre de una sección" aria-label="Buscar" data-pq><div class="results" data-res></div><p class="small muted" style="margin:10px 0 0">↑ ↓ para moverte · Enter para abrir · Esc para cerrar</p></div>`,
      onMount: (m, close) => {
        const inp = m.querySelector('[data-pq]'); const box = m.querySelector('[data-res]');
        const draw = () => { box.innerHTML = results.map((r, i) => `<div class="r ${i === sel ? 'sel' : ''}" data-i="${i}"><span class="badge accent">${esc(r.modulo_label)}</span><span>${esc(r.titulo)}</span></div>`).join('') || '<p class="muted" style="padding:8px">Sin resultados.</p>'; box.querySelectorAll('[data-i]').forEach(x => x.onclick = () => pick(Number(x.dataset.i))); };
        const pick = (i) => { const r = results[i]; if (!r) return; close(); if (r.go) D.go(r.modulo); else { D.go(r.modulo); setTimeout(() => D.openRecord(r.modulo, r.id), 250); } };
        let t; inp.oninput = () => { clearTimeout(t); t = setTimeout(async () => { const q = inp.value.trim().toLowerCase(); const nav = mods().filter(x => q && x.titulo.toLowerCase().includes(q)); results = [...nav, ...(q.length >= 2 ? (await D.try(() => D.call('search', q))) || [] : [])]; if (!q) results = mods(); sel = 0; draw(); }, 140); };
        inp.onkeydown = (e) => { if (e.key === 'ArrowDown') { sel = Math.min(results.length - 1, sel + 1); draw(); e.preventDefault(); } if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); draw(); e.preventDefault(); } if (e.key === 'Enter') { pick(sel); e.preventDefault(); } };
        results = mods(); draw();
      } });
  }
  document.addEventListener('keydown', (e) => {
    if (!D.me) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') { e.preventDefault(); if (D.SCHEMA[current] && D.meta.modules.find(m => m.key === current && m.level === 'W')) D.openForm(current); else { const b = document.querySelector('[data-create]'); if (b) b.click(); } }
  });

  // ───────────── mi cuenta ─────────────
  async function account() {
    const role = D.meta.roles[D.me.rol];
    const v = await D.modal({ title: 'Mi cuenta', body: `<dl class="kv" style="margin-bottom:16px"><dt>Nombre</dt><dd>${esc(D.me.nombre)}</dd><dt>Correo</dt><dd>${esc(D.me.email)}</dd><dt>Rol</dt><dd>${esc(role.label)}</dd></dl>
      <h3 style="margin-bottom:10px">Cambiar contraseña</h3><div class="form">${D.fieldHtml({ key: 'actual', label: 'Contraseña actual', type: 'password', required: true, full: true })}${D.fieldHtml({ key: 'nueva', label: 'Nueva contraseña', type: 'password', required: true })}${D.fieldHtml({ key: 'nueva2', label: 'Repite la nueva', type: 'password', required: true })}</div>`,
      buttons: [{ label: 'Cerrar' }, { label: 'Cambiar contraseña', kind: 'primary', value: (m) => D.readForm(m) }] });
    if (!v || typeof v !== 'object') return;
    if (v.nueva !== v.nueva2) return D.toast('Las contraseñas nuevas no coinciden.', 'error');
    await D.try(() => D.call('changeOwnPassword', v.actual, v.nueva), 'Contraseña actualizada.');
  }

  // ───────────── ganchos para pruebas automáticas ─────────────
  window.__test = {
    login: async (email, pw) => { try { await D.call('logout'); } catch (e) {} const me = await D.call('login', email, pw); location.hash = '#/inicio'; await start(me); },
    go: (k) => { const [m, id] = k.split(':'); D.go(m); if (id) setTimeout(() => D.openRecord(m, id === 'first' ? document.querySelector('tbody tr[data-id]')?.dataset.id : id), 500); },
    theme: (t) => { setTheme(t); },
    create: () => document.querySelector('[data-create]').click(),
    timer: (mins) => { localStorage.setItem(TKEY(), JSON.stringify({ project_id: (D.refs.proyectos[0] || {}).id || '', nombre: (D.refs.proyectos[0] || {}).nombre || 'Trabajo', nota: 'Prueba', inicio: Date.now() - mins * 60000 })); drawTimer(); },
    openAll: () => { localStorage.removeItem('menu-cerrado:' + D.me.id); renderShell(); },
  };

  boot().catch(e => { root.innerHTML = `<div class="page"><h1>No se pudo iniciar Delirium OS</h1><p class="muted">${esc(e.message)}</p></div>`; });
})(window.DOS);
