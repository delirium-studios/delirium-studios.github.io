// Delirium OS — pantallas: módulos genéricos (lista + panel), inicio, calendario, reportes, mapa, ajustes y actividad.
(function (D) {
  const esc = D.esc;
  D.views = {};
  D.refs = {}; D.refsFull = {};
  const state = {};
  const modLabel = (k) => (D.meta.modules.find(m => m.key === k) || {}).label || k;
  const canW = (k) => (D.meta.modules.find(m => m.key === k) || {}).level === 'W';
  const colOf = (k) => (D.meta.modules.find(m => m.key === k) || {}).col;
  const pageHead = (title, help, actions = '') => `<div class="page-head"><div class="titles"><h1>${esc(title)}</h1>${help ? `<p>${help}</p>` : ''}</div><div class="actions">${actions}</div></div>`;
  D.pageHead = (...a) => pageHead(...a);
  const btnNew = (k) => canW(k) && D.SCHEMA[k] ? `<button class="btn primary" data-new="${k}">${D.icon('plus')} ${esc(D.SCHEMA[k].nuevo)}</button>` : '';
  const shown = (k, f, rec, isNew) => {
    if (f.show && !f.show()) return false;
    if (f.onlyNew && !isNew) return false;
    const hidden = (D.meta.hidden[colOf(k)] || []);
    if (hidden.includes(f.key) && !(rec && f.key in rec)) return false;
    if (k === 'equipo' && f.key === 'client_id') return true;
    return true;
  };

  D.refreshRefs = async () => {
    const want = ['clientes', 'proyectos', 'productos', 'proveedores', 'catalogo', 'piezas', 'juegos'];
    for (const m of want) D.refs[m] = (await D.try(() => D.call('options', m))) || [];
    D.servicesCache = D.refs.catalogo;
    D.refsFull.clientes = D.canRead('clientes') ? ((await D.try(() => D.call('list', 'clientes'))) || []) : [];
  };

  // ───────────── módulo genérico ─────────────
  D.views.module = async (key, el) => {
    const sc = D.SCHEMA[key];
    const st = state[key] = state[key] || { q: '', filter: '', mine: false, sortKey: null, sortDir: 1, view: (() => { try { return localStorage.getItem('vista:' + key) || 'lista'; } catch (e) { return 'lista'; } })() };
    const boardOk = !!sc.board && !isClient();
    const rows = (await D.try(() => D.call('list', key))) || [];
    const extra = D.PAGE_ACTIONS[key] ? D.PAGE_ACTIONS[key]() : '';
    const filtered = rows.filter(r => {
      if (st.filter && sc.filtro) { if (sc.filtro.fn ? !sc.filtro.fn(r, st.filter) : r[sc.filtro.key] !== st.filter) return false; }
      if (st.mine && sc.mine && r[sc.mine] !== D.me.id) return false;
      if (st.q) { const hay = Object.values(r).filter(v => typeof v === 'string' || typeof v === 'number').join(' ').toLowerCase(); if (!hay.includes(st.q.toLowerCase())) return false; }
      return true;
    });
    const emptyAll = D.empty(sc.vacio[0], sc.vacio[1], btnNew(key));
    const emptyFilter = D.empty('Nada coincide', 'Prueba con otra búsqueda o quita los filtros.', '<button class="btn" data-clear>Quitar filtros</button>');
    const isBoard = boardOk && st.view === 'tablero';
    const counts = sc.filtro ? Object.fromEntries(sc.filtro.values.map(v => [v, rows.filter(r => sc.filtro.fn ? sc.filtro.fn(r, v) : r[sc.filtro.key] === v).length])) : {};
    const plural = sc.plural || (sc.singular + (/[nlr]$/.test(sc.singular) ? 'es' : 's'));
    const viewToggle = boardOk && rows.length ? `<div class="seg" role="group" aria-label="Vista"><button class="${!isBoard ? 'on' : ''}" data-view="lista" title="Ver como lista">${D.icon('list')} Lista</button><button class="${isBoard ? 'on' : ''}" data-view="tablero" title="Ver como tablero: arrastra las tarjetas para cambiar el estado">${D.icon('board')} Tablero</button></div>` : '';
    el.innerHTML = `<div class="page">${pageHead(modLabel(key), sc.help, extra + btnNew(key))}
      ${rows.length ? `<div class="toolbar"><input class="input" type="search" placeholder="Buscar en ${esc(modLabel(key).toLowerCase())}…" value="${esc(st.q)}" data-q aria-label="Buscar">
        ${sc.filtro && !isBoard ? `<div class="chips" role="group" aria-label="Filtrar">${sc.filtro.values.map(v => `<button class="chip ${st.filter === v ? 'on' : ''}" data-f="${esc(v)}">${esc(v)}${counts[v] ? ` <span class="n">${counts[v]}</span>` : ''}</button>`).join('')}</div>` : ''}
        ${sc.mine ? `<label class="check small"><input type="checkbox" data-mine ${st.mine ? 'checked' : ''}> Solo las mías</label>` : ''}${viewToggle}</div>` : ''}
      <div data-table>${!rows.length ? emptyAll : isBoard ? board(key, sc, rows.filter(r => !st.q || Object.values(r).filter(v => typeof v === 'string' || typeof v === 'number').join(' ').toLowerCase().includes(st.q.toLowerCase())).filter(r => !(st.mine && sc.mine && r[sc.mine] !== D.me.id))) : D.table(sc.columns, filtered, { sortKey: st.sortKey, sortDir: st.sortDir, empty: emptyFilter })}</div>
      ${rows.length && !isBoard ? `<div class="count-line">${filtered.length} de ${rows.length} ${rows.length === 1 ? sc.singular : plural}</div>` : ''}${isBoard && canW(key) ? '<div class="count-line">Arrastra una tarjeta a otra columna para cambiar su estado. Haz clic para abrirla.</div>' : ''}</div>`;
    const rerender = () => D.views.module(key, el);
    const q = el.querySelector('[data-q]'); if (q) { q.oninput = () => { st.q = q.value; clearTimeout(st.t); st.t = setTimeout(() => { rerender().then(() => { const n = el.querySelector('[data-q]'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }); }, 220); }; }
    el.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { st.filter = st.filter === b.dataset.f ? '' : b.dataset.f; rerender(); });
    const mine = el.querySelector('[data-mine]'); if (mine) mine.onchange = () => { st.mine = mine.checked; rerender(); };
    const clear = el.querySelector('[data-clear]'); if (clear) clear.onclick = () => { st.q = ''; st.filter = ''; st.mine = false; rerender(); };
    el.querySelectorAll('th[data-sort]').forEach(th => th.onclick = () => { const k = th.dataset.sort; st.sortDir = st.sortKey === k ? -st.sortDir : 1; st.sortKey = k; rerender(); });
    el.querySelectorAll('tbody tr[data-id]').forEach(tr => tr.onclick = (e) => { if (e.target.closest('input,button,a')) return; D.openRecord(key, tr.dataset.id); });
    el.querySelectorAll('[data-view]').forEach(b => b.onclick = () => { st.view = b.dataset.view; try { localStorage.setItem('vista:' + key, st.view); } catch (e) {} rerender(); });
    if (isBoard) bindBoard(key, sc, el, rerender);
    el.querySelectorAll('[data-done]').forEach(cb => cb.onchange = async () => { await D.try(() => D.call('action', 'recordatorio.hecho', { id: cb.dataset.done, hecho: cb.checked }), cb.checked ? 'Marcado como hecho.' : 'Marcado como pendiente.'); rerender(); D.updateBadges(); });
    D.bindPage(el);
  };
  const board = (key, sc, rows) => {
    const b = sc.board; const title = (r) => r.codigo ? `<span class="mono small muted">${esc(r.codigo)}</span> ${esc(r.titulo || r.nombre || r.asunto || r.comprador || '')}` : esc(r.titulo || r.nombre || r.asunto || r.comprador || '');
    const drag = canW(key);
    return `<div class="board" style="--cols:${b.values.length}">${b.values.map(v => { const list = rows.filter(r => r[b.key] === v); return `<section class="bcol" data-v="${esc(v)}" aria-label="${esc(v)}"><header>${D.badge(v)}<span class="n">${list.length}</span></header><div class="bcards">${list.map(r => `<article class="bcard" data-id="${esc(r.id)}" ${drag ? 'draggable="true"' : ''} tabindex="0"><b>${title(r)}</b>${b.sub ? `<div class="s">${b.sub(r)}</div>` : ''}</article>`).join('') || '<p class="bempty">Vacío</p>'}</div></section>`; }).join('')}</div>`;
  };
  const bindBoard = (key, sc, el, rerender) => {
    let dragId = null;
    el.querySelectorAll('.bcard').forEach(c => {
      c.onclick = () => D.openRecord(key, c.dataset.id);
      c.onkeydown = (e) => { if (e.key === 'Enter') c.click(); };
      c.ondragstart = (e) => { dragId = c.dataset.id; c.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; };
      c.ondragend = () => { c.classList.remove('dragging'); el.querySelectorAll('.bcol').forEach(x => x.classList.remove('over')); };
    });
    el.querySelectorAll('.bcol').forEach(col => {
      col.ondragover = (e) => { if (!dragId) return; e.preventDefault(); col.classList.add('over'); };
      col.ondragleave = () => col.classList.remove('over');
      col.ondrop = async (e) => {
        e.preventDefault(); col.classList.remove('over'); if (!dragId) return;
        const id = dragId; dragId = null; const v = col.dataset.v;
        if (await D.try(() => (D.guardar ? D.guardar(key, { id, [sc.board.key]: v }) : D.call('save', key, { id, [sc.board.key]: v })), `Movido a "${v}".`)) { D.updateBadges(); rerender(); }
        else rerender();
      };
    });
  };
  D.bindPage = (el) => {
    el.querySelectorAll('[data-new]').forEach(b => b.onclick = () => D.openForm(b.dataset.new));
    el.querySelectorAll('[data-page-act]').forEach(b => b.onclick = () => D.PAGE_HANDLERS[b.dataset.pageAct]());
  };

  // ───────────── panel de detalle ─────────────
  const display = (f, r) => {
    const v = r[f.key];
    if (f.type === 'lines') return null;
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)) return null;
    switch (f.type) {
      case 'money': return D.money(v); case 'pct': return Number(v) ? `${v}%` : null; case 'date': return `${D.date(v)} <span class="muted small">(${D.rel(v)})</span>`; case 'datetime': return D.datetime(v);
      case 'checkbox': return v ? 'Sí' : 'No'; case 'users': return esc((r['_' + f.key] || []).join(', '));
      case 'multi': { const op = typeof f.options === 'function' ? f.options() : (f.options || []); const lab = (x) => { const o = op.find(o => (o && o.value !== undefined ? o.value : o) === x); return o && o.label ? o.label : x; }; return Array.isArray(v) ? v.map(x => `<span class="badge">${esc(lab(x))}</span>`).join(' ') : esc(v); }
      case 'file': return D.fileChip(v) || null;
      case 'textarea': return `<div style="white-space:pre-wrap">${esc(v)}</div>`;
      case 'select': {
        if (f.key === 'client_id') return esc(r._cliente); if (f.key === 'project_id') return esc(r._proyecto); if (f.key === 'supplier_id') return esc(r._proveedor);
        if (f.key === 'product_id') return esc(r._producto); if (['pm','asignado','usuario_id','responsable'].includes(f.key)) return esc(r['_' + f.key]);
        if (f.key === 'game_id') return esc(r._juego); if (f.key === 'piece_id') return esc(r._pieza);
        if (f.key === 'rol') return esc(D.meta.roles[v]?.label || v);
        if (typeof f.options === 'function') { const o = (f.options() || []).find(o => o && o.value === v); if (o && o.label) return esc(o.label); }
        return D.tone(v) ? D.badge(v) : esc(v);
      }
      default: return /^https?:\/\//.test(String(v)) ? `<a href="#" data-ext="${esc(v)}">${esc(v)}</a>` : esc(v);
    }
  };
  D.openRecord = async (key, id) => {
    const r = await D.try(() => D.call('get', key, id)); if (!r) return;
    const sc = D.SCHEMA[key];
    const kv = sc.fields.filter(f => shown(key, f, r, false) && f.type !== 'password' && !f.group && !f.hideInDetail).map(f => { const v = display(f, r); return v === null ? '' : `<dt>${esc(typeof f.label === 'function' ? f.label() : f.label)}</dt><dd>${v}</dd>`; }).join('');
    const title = r.codigo ? `${r.codigo} · ${r.nombre || r.titulo || r.asunto || r.comprador || r.concepto || r._cliente || ''}` : (r.nombre || r.titulo || r.creador || r.concepto || r._usuario_id || r._producto || (key === 'llaves' ? `Llave de ${r._juego || ''}` : sc.singular));
    const extraBody = D.DETAIL[key] ? D.DETAIL[key](r) : '';
    const acts = D.ACTIONS[key] ? D.ACTIONS[key](r) : '';
    const editable = canW(key) && key !== 'movimientos' && !isClient();
    const footer = `${editable ? `<button class="btn danger left" data-del>${D.icon('trash')} ${key === 'equipo' ? '' : 'Borrar'}</button>` : ''}${acts}${editable ? `<button class="btn primary" data-edit>${D.icon('edit')} Editar</button>` : ''}`;
    const root = D.drawer({ title, subtitle: esc(sc.singular[0].toUpperCase() + sc.singular.slice(1)) + (r.creado ? ` · ${D.date(r.creado)}${r._creado_por ? ' · por ' + esc(r._creado_por) : ''}` : ''), body: `${extraBody.top || ''}<dl class="kv">${kv}</dl>${extraBody.bottom || ''}`, footer });
    const del = root.querySelector('[data-del]');
    if (del && key === 'equipo') del.remove();
    if (del) del.onclick = async () => {
      if (!(await D.confirm(`¿Borrar ${sc.singular}?`, `Vas a borrar <b>${esc(title)}</b>. Esta acción no se puede deshacer.`, 'Sí, borrar'))) return;
      if (await D.try(() => D.call('remove', key, id), 'Borrado.') !== undefined) { D.closeAll(); D.refreshRefs(); D.rerender(); }
    };
    const ed = root.querySelector('[data-edit]'); if (ed) ed.onclick = () => D.openForm(key, r);
    root.querySelectorAll('[data-ext]').forEach(a => a.onclick = (e) => { e.preventDefault(); window.dos.openExternal(a.dataset.ext); });
    root.querySelectorAll('[data-act]').forEach(b => b.onclick = () => D.HANDLERS[b.dataset.act](r, b));
    D.bindFileChips(root);
    root.querySelectorAll('[data-open]').forEach(a => a.onclick = (e) => { e.preventDefault(); const [m, i] = a.dataset.open.split(':'); D.openRecord(m, i); });
    if (D.MOUNT[key]) D.MOUNT[key](root, r);
  };

  // ───────────── formulario de creación / edición ─────────────
  D.openForm = (key, rec = null, preset = {}) => {
    const sc = D.SCHEMA[key]; const isNew = !rec; const data = rec || preset;
    const fields = sc.fields.filter(f => shown(key, f, rec, isNew));
    const totals = fields.some(f => f.type === 'lines') ? `<div class="totals" data-totals></div>` : '';
    const root = D.drawer({
      title: isNew ? sc.nuevo : `Editar ${sc.singular}`, subtitle: isNew ? 'Los campos con <span style="color:var(--danger)">*</span> son obligatorios.' : esc(rec.codigo || rec.nombre || rec.titulo || ''),
      body: `<form class="form" novalidate>${fields.map(f => D.fieldHtml(f, data)).join('')}${totals}</form>`,
      footer: `<button class="btn" data-close-form>Cancelar</button><button class="btn primary" data-save>${D.icon('check')} ${isNew ? 'Guardar' : 'Guardar cambios'}</button>`,
    });
    const form = root.querySelector('form');
    const upd = () => { const t = root.querySelector('[data-totals]'); if (!t) return; const lines = D.readLines(root.querySelector('[data-lines]')); const g = (n) => Number((form.querySelector(`[name=${n}]`) || {}).value || 0); const x = D.linesTotal(lines, g('descuento_pct'), g('impuesto_pct'));
      t.innerHTML = `<span class="muted">Subtotal</span><span>${D.money(x.sub)}</span>${x.d ? `<span class="muted">Descuento</span><span>− ${D.money(x.d)}</span>` : ''}${x.i ? `<span class="muted">${esc(D.settings.impuesto_nombre || 'Impuesto')}</span><span>${D.money(x.i)}</span>` : ''}<span class="big">Total</span><span class="big">${D.money(x.total)}</span>`; };
    D.bindLines(root, upd); form.addEventListener('input', upd); upd(); D.bindFiles(root);
    const rolSel = form.querySelector('[name=rol]'); const cliSel = form.querySelector('[name=client_id]');
    if (key === 'equipo' && rolSel && cliSel) { const sync = () => { const isC = ['cliente','cliente_eq'].includes(rolSel.value); cliSel.closest('.field').classList.toggle('hidden', !isC); cliSel.required = isC; }; rolSel.onchange = sync; sync(); }
    const save = async () => {
      const vals = D.readForm(form); if (!vals) return;
      if (!isNew) vals.id = rec.id;
      if (key === 'equipo' && !isNew) delete vals.password;
      const btn = root.querySelector('[data-save]'); btn.disabled = true;
      const out = await D.try(() => (D.guardar ? D.guardar(key, vals) : D.call('save', key, vals)), isNew ? `${sc.singular[0].toUpperCase() + sc.singular.slice(1)} ${/a$|ión$/.test(sc.singular) && sc.singular !== 'tema' ? 'guardada' : 'guardado'}.` : 'Cambios guardados.');
      btn.disabled = false;
      if (out) { D.closeAll(); await D.refreshRefs(); if (key === 'equipo') D.directory = await D.call('directory'); D.rerender(); D.updateBadges(); if (D.AFTER_SAVE[key]) D.AFTER_SAVE[key](out, isNew); else D.openRecord(key, out.id); }
    };
    root.querySelector('[data-save]').onclick = save;
    form.onsubmit = (e) => { e.preventDefault(); save(); };
    root.querySelector('[data-close-form]').onclick = () => rec ? D.openRecord(key, rec.id) : D.closeAll();
    root.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') save(); });
  };

  // ───────────── detalles y acciones por módulo ─────────────
  const linesView = (r) => `<div class="section"><h3>Detalle</h3><div class="table-wrap"><table><thead><tr><th>Descripción</th><th class="num">Cant.</th><th class="num">Precio</th><th class="num">Subtotal</th></tr></thead><tbody>
      ${(r.lineas || []).map(l => `<tr><td>${esc(l.descripcion)}</td><td class="num">${l.cantidad}</td><td class="num">${D.money(l.precio)}</td><td class="num">${D.money(l.cantidad * l.precio)}</td></tr>`).join('') || '<tr><td colspan="4" class="muted">Sin líneas</td></tr>'}</tbody></table></div>
      <div class="totals"><span class="muted">Subtotal</span><span>${D.money(r._subtotal)}</span>${r._descuento ? `<span class="muted">Descuento (${r.descuento_pct}%)</span><span>− ${D.money(r._descuento)}</span>` : ''}${r._impuesto ? `<span class="muted">${esc(D.settings.impuesto_nombre)} (${r.impuesto_pct}%)</span><span>${D.money(r._impuesto)}</span>` : ''}<span class="big">Total</span><span class="big">${D.money(r._total)}</span></div></div>`;
  const isClient = () => ['cliente', 'cliente_eq'].includes(D.me.rol);

  D.DETAIL = {
    clientes: (r) => ({ top: `<div class="note" style="margin-bottom:16px">${D.badge(r.estado)} &nbsp;${r.ultimo_contacto ? `Último contacto: <b>${D.date(r.ultimo_contacto)}</b> (${D.rel(r.ultimo_contacto)})` : 'Todavía no hay contactos registrados.'}</div><div data-ficha360><p class="muted small">Cargando todo lo de este cliente…</p></div>`,
      bottom: `<div class="section"><h3>Historial ${canW('clientes') ? `<button class="btn sm" data-act="hist">${D.icon('plus')} Anotar contacto</button>` : ''}</h3>
        ${(r.historial || []).length ? `<div class="timeline">${r.historial.map(h => `<div class="ev"><b>${esc(h.tipo)}</b> — ${esc(h.nota)}<span>${D.datetime(h.fecha)} · ${esc(h.por)}</span></div>`).join('')}</div>` : '<p class="muted">Sin llamadas, mensajes ni reuniones anotadas.</p>'}</div>
        <div class="section"><h3>Kit de marca</h3>${r.marca_colores || r.marca_tipografias || r.marca_logos || r.marca_tono || r.link_bio ? `<dl class="kv">
          ${r.marca_colores ? `<dt>Colores</dt><dd>${esc(r.marca_colores)}<div class="swatches">${(r.marca_colores.match(/#[0-9a-fA-F]{6}\b/g) || []).map(c => `<i style="background:${c}" title="${c}"></i>`).join('')}</div></dd>` : ''}
          ${r.marca_tipografias ? `<dt>Tipografías</dt><dd>${esc(r.marca_tipografias)}</dd>` : ''}${r.marca_logos ? `<dt>Logos y archivos</dt><dd>${/^https?:/.test(r.marca_logos) ? `<a href="#" data-ext="${esc(r.marca_logos)}">${esc(r.marca_logos)}</a>` : esc(r.marca_logos)}</dd>` : ''}
          ${r.marca_tono ? `<dt>Tono de voz</dt><dd style="white-space:pre-wrap">${esc(r.marca_tono)}</dd>` : ''}${r.link_bio ? `<dt>Link in bio</dt><dd>${esc(r.link_bio)}</dd>` : ''}</dl>` : '<p class="muted">Sin kit de marca. Edita el cliente para agregar colores, tipografías, logos y tono.</p>'}</div>` }),
    proyectos: (r) => {
      const over = Number(r.rondas_usadas || 0) > Number(r.rondas_incluidas || 0); const full = Number(r.rondas_usadas || 0) >= Number(r.rondas_incluidas || 0);
      return { top: `<div class="grid g3" style="margin-bottom:16px">
          <div class="kpi"><div class="label">Avance</div><div class="v">${r._progreso}%</div><div class="progress"><i style="width:${r._progreso}%"></i></div><div class="s">${r._tareas_hechas} de ${r._tareas} tareas hechas</div></div>
          <div class="kpi ${full ? 'alert' : ''}"><div class="label">Rondas de cambios</div><div class="v">${r.rondas_usadas || 0} / ${r.rondas_incluidas ?? 0}</div><div class="s">${over ? 'Fuera de contrato: se cobran aparte' : full ? 'Ya no quedan rondas incluidas' : `Quedan ${r._rondas_restantes}`}</div></div>
          <div class="kpi"><div class="label">Entrega</div><div class="v" style="font-size:20px">${D.date(r.entrega)}</div><div class="s">${D.rel(r.entrega) || 'Sin fecha'}</div></div></div>
          ${r.aprobado_cliente ? `<div class="note" style="margin-bottom:14px">✔ Entrega aprobada por <b>${esc(r.aprobado_por)}</b> el ${D.datetime(r.aprobado_cliente)}.</div>` : ''}`,
        bottom: `${!isClient() ? `<div class="section"><h3>Tareas ${canW('tareas') ? `<button class="btn sm" data-act="newtask">${D.icon('plus')} Nueva tarea</button>` : ''}</h3><div data-tasks class="list"><span class="muted">Cargando…</span></div></div>` : ''}
          <div class="section"><h3>Rondas de cambios ${canW('proyectos') ? `<button class="btn sm" data-act="ronda">${D.icon('plus')} Registrar ronda</button>` : ''}</h3>
          ${(r.rondas_log || []).length ? `<div class="timeline">${r.rondas_log.map(x => `<div class="ev"><b>Ronda #${x.n}</b>${Number(x.n) > Number(r.rondas_incluidas) ? ' <span class="badge danger">Extra</span>' : ''} — ${esc(x.nota || 'Sin nota')}<span>${D.datetime(x.fecha)} · ${esc(x.por)}</span></div>`).join('')}</div>` : '<p class="muted">Todavía no hay rondas registradas.</p>'}</div>
          ${(r.ordenes_cambio || []).length ? `<div class="section"><h3>Órdenes de cambio (fuera de contrato)</h3>${r.ordenes_cambio.map(o => `<div class="note danger" style="margin-bottom:8px"><b>Ronda #${o.ronda}</b> · ${D.money(o.costo)} · ${D.badge(o.estado)}<br><span class="small">${esc(o.nota || '')} · ${D.datetime(o.fecha)}</span></div>`).join('')}</div>` : ''}` };
    },
    cotizaciones: (r) => ({ top: `<div class="note" style="margin-bottom:16px">${D.badge(r.estado)} &nbsp;Total: <b>${D.money(r._total)}</b>${r.vence ? ` · válida hasta ${D.date(r.vence)}` : ''}${r.project_id ? ' · ya tiene proyecto' : ''}</div>`, bottom: linesView(r) }),
    facturas: (r) => ({ top: `<div class="grid g3" style="margin-bottom:16px"><div class="kpi"><div class="label">Total</div><div class="v">${D.money(r._total)}</div></div><div class="kpi"><div class="label">Pagado (verificado)</div><div class="v">${D.money(r._pagado)}</div></div><div class="kpi ${r._saldo > 0 ? 'alert' : ''}"><div class="label">Saldo</div><div class="v">${D.money(r._saldo)}</div><div class="s">${D.badge(r._estado)}</div></div></div>`,
      bottom: `${linesView(r)}<div class="section"><h3>Pagos</h3>${(r.pagos || []).length ? `<div class="table-wrap"><table><thead><tr><th>Fecha</th><th>Método</th><th class="num">Monto</th><th>Estado</th><th></th></tr></thead><tbody>${r.pagos.map(p => `<tr><td>${D.date(p.fecha)}</td><td>${esc(p.metodo)}${p.referencia ? `<span class="sub">Ref. ${esc(p.referencia)}</span>` : ''}<span class="sub">Reportó: ${esc(p.reportado_por || '—')}</span></td><td class="num">${D.money(p.monto)}</td><td>${D.badge(p.estado)}</td>
        <td>${p.estado === 'Por verificar' && canW('facturas') ? `<button class="btn sm violet" data-act="verificar" data-pago="${p.id}">Verificar</button> <button class="btn sm" data-act="rechazar" data-pago="${p.id}">Rechazar</button>` : ''}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">Sin pagos registrados.</p>'}</div>` }),
    productos: (r) => ({ top: `<div class="grid g3" style="margin-bottom:16px"><div class="kpi ${r._stock_bajo ? 'alert' : ''}"><div class="label">Stock</div><div class="v">${D.num(r.stock)}</div><div class="s">${r._stock_bajo ? `Bajo (avisar en ${r.stock_minimo})` : `Avisar en ${r.stock_minimo}`}</div></div><div class="kpi"><div class="label">Precio</div><div class="v">${D.money(r.precio)}</div></div><div class="kpi"><div class="label">Margen por unidad</div><div class="v">${r.costo ? D.money(Number(r.precio || 0) - Number(r.costo)) : '—'}</div></div></div>` }),
    gastos: (r) => ({ top: `<div class="note" style="margin-bottom:16px">${D.badge(r.estado)} &nbsp;${D.money(r.monto)} · ${esc(r._usuario_id || '')}${r.decidido_por ? ` · decidido por ${esc(r.decidido_por)}` : ''}</div>` }),
    ausencias: (r) => ({ top: `<div class="note" style="margin-bottom:16px">${D.badge(r.estado)} &nbsp;${D.days(r.desde, r.hasta)} días · ${esc(r._usuario_id || '')}${r.decidido_por ? ` · decidido por ${esc(r.decidido_por)}` : ''}</div>` }),
  };
  const thread = (items, opts = {}) => (items || []).length ? `<div class="thread">${items.map(m => `<div class="msg ${m.cliente ? 'client' : 'team'} ${m.interno ? 'internal' : ''}"><div class="who"><b>${esc(m.por || '')}</b>${m.interno ? ' <span class="badge warn">Nota interna</span>' : ''}${m.momento ? ` <span class="badge info mono">${esc(m.momento)}</span>` : ''}${m.version ? ` <span class="muted small">v${m.version}</span>` : ''}<span class="muted small"> · ${D.datetime(m.fecha)}</span></div><div class="txt">${esc(m.texto)}</div>${m.registrado_por ? `<div class="muted small">Registrado por ${esc(m.registrado_por)}</div>` : ''}</div>`).join('')}</div>` : `<p class="muted">${opts.empty || 'Sin mensajes todavía.'}</p>`;
  const steps = (values, cur) => `<ol class="steps">${values.map((v, i) => { const ci = values.indexOf(cur); return `<li class="${i < ci ? 'done' : i === ci ? 'now' : ''}"><span>${i + 1}</span>${esc(v)}</li>`; }).join('')}</ol>`;
  const GAME_CHECK = {
    1: ['Idea y pilares','GDD','Arte conceptual','Prototipo jugable','Pitch para publishers'],
    2: ['Sprints e hitos definidos','Control de versiones (Git LFS)','Arte y animación','Niveles','Música y sonido'],
    3: ['QA interno','Playtest con jugadores','Bugs al día','Métricas (GameAnalytics)','Reporte de fallos (Sentry)'],
    4: ['Página de tienda y wishlists','Trailer','Demo','Festival (Steam Next Fest)','Press kit','Llaves para creadores','Clasificación por edad (IARC)'],
    5: ['Build final y certificación','Precio y descuento de lanzamiento','Stream y comunicación de lanzamiento','Discord listo'],
    6: ['Parches','Contenido nuevo (DLC)','Traducciones','Responder reseñas','Merch del juego','Métricas de retención'],
  };
  Object.assign(D.DETAIL, {
    soporte: (r) => ({ top: `<div class="note" style="margin-bottom:14px">${D.badge(r.estado)} ${D.badge(r.prioridad)} &nbsp;${esc(r.tipo || '')}${r.primera_respuesta ? ` · primera respuesta ${D.datetime(r.primera_respuesta)}` : ''}</div>`,
      bottom: `<div class="section"><h3>Conversación</h3>${thread(r.respuestas, { empty: 'Todavía no hay mensajes.' })}
        ${r.estado !== 'Cerrado' && (canW('soporte') || isClient()) ? `<div class="reply" data-reply><textarea class="input" rows="3" placeholder="${isClient() ? 'Escribe tu mensaje al equipo…' : 'Escribe tu respuesta al cliente…'}" aria-label="Mensaje"></textarea>
          <div class="reply-actions">${!isClient() ? `<label class="check small"><input type="checkbox" data-internal> Nota interna (el cliente no la ve)</label><select class="input sm" data-next aria-label="Estado después de responder"><option value="">Estado: dejar igual</option>${['En atención','Esperando cliente','Resuelto','Cerrado'].map(x => `<option>${x}</option>`).join('')}</select>` : ''}<button class="btn primary" data-send>${D.icon('send')} Enviar</button></div></div>` : ''}</div>` }),
    piezas: (r) => {
      const flow = ['En producción','Revisión interna','Revisión del cliente','Aprobada'];
      const cur = r.estado === 'Cambios pedidos' ? 'En producción' : r.estado;
      return { top: `${steps(flow, cur)}${r.estado === 'Cambios pedidos' ? '<div class="note danger" style="margin:10px 0">Se pidieron cambios: sube una nueva versión cuando esté lista.</div>' : ''}
        <div class="preview" data-preview>${r.archivo ? `<div class="muted small">Cargando vista previa…</div>` : ''}${r.enlace ? `<a href="#" class="btn sm" data-ext="${esc(r.enlace)}">${D.icon('eye')} Abrir enlace</a>` : ''}${D.fileChip(r.archivo)}${!r.archivo && !r.enlace ? '<span class="muted small">Sin archivo ni enlace todavía.</span>' : ''}</div>
        <div class="grid g3" style="margin:14px 0"><div class="kpi"><div class="label">Versión</div><div class="v">v${r.version || 1}</div></div><div class="kpi"><div class="label">Cambios pedidos por el cliente</div><div class="v">${r.rondas_cliente || 0}</div></div><div class="kpi"><div class="label">Fecha límite</div><div class="v" style="font-size:20px">${D.date(r.fecha_limite)}</div><div class="s">${D.rel(r.fecha_limite)}</div></div></div>`,
        bottom: `<div class="section"><h3>Comentarios ${(canW('piezas') || isClient()) ? `<button class="btn sm" data-act="pzcomentar">${D.icon('plus')} Comentar</button>` : ''}</h3>${thread([...(r.comentarios || [])].reverse(), { empty: 'Sin comentarios.' })}</div>
          ${(r.versiones || []).length ? `<div class="section"><h3>Versiones anteriores</h3><div class="list">${r.versiones.map(v => `<div class="item"><div class="t"><b>v${v.version}</b><span>${D.datetime(v.fecha)}</span></div>${v.enlace ? `<a href="#" data-ext="${esc(v.enlace)}">Abrir</a>` : ''}${D.fileChip(v.archivo)}</div>`).join('')}</div></div>` : ''}` };
    },
    redes: (r) => ({ top: `${steps(['Idea','En diseño','Por aprobar','Aprobado','Programado','Publicado'], r.estado)}
      <div class="post-preview"><div class="ph">${(r.redes || []).map(x => `<span class="badge">${esc(x)}</span>`).join(' ')} <span class="muted small">${esc(r.formato || '')} · ${D.datetime(r.fecha)}</span></div>${r.copy ? `<p style="white-space:pre-wrap;margin:8px 0 0">${esc(r.copy)}</p>` : '<p class="muted" style="margin:8px 0 0">Sin copy todavía.</p>'}${r.hashtags ? `<p class="accent-text small" style="margin:6px 0 0">${esc(r.hashtags)}</p>` : ''}${r.piece_id ? `<p class="small" style="margin:8px 0 0">Pieza: <a href="#" data-open="piezas:${r.piece_id}">${esc(r._pieza || 'ver pieza')}</a></p>` : ''}</div>`,
      bottom: (r.comentarios || []).length ? `<div class="section"><h3>Comentarios del cliente</h3>${thread([...r.comentarios].reverse())}</div>` : '' }),
    anuncios: (r) => ({ top: `<div class="grid g3" style="margin-bottom:16px"><div class="kpi ${r._uso_pct >= 80 ? 'alert' : ''}"><div class="label">Presupuesto usado</div><div class="v">${r._uso_pct}%</div><div class="progress ${r._uso_pct >= 100 ? 'over' : r._uso_pct >= 80 ? 'near' : ''}"><i style="width:${Math.min(100, r._uso_pct)}%"></i></div><div class="s">${D.money(r.gastado)} de ${D.money(r.presupuesto)}</div></div>
      <div class="kpi"><div class="label">Resultados</div><div class="v">${D.num(r.resultados)}</div><div class="s">${esc(r.tipo_resultado || '')}</div></div><div class="kpi"><div class="label">Costo por resultado</div><div class="v">${r._cpr !== null && r._cpr !== undefined ? D.money(r._cpr) : '—'}</div><div class="s">${r.clics ? `${D.num(r.clics)} clics · ${D.num(r.alcance)} de alcance` : ''}</div></div></div>
      ${r._uso_pct >= 100 ? '<div class="note danger" style="margin-bottom:14px">Esta campaña ya gastó todo su presupuesto. Revísala o páusala en el administrador de anuncios.</div>' : r._alerta ? '<div class="note" style="margin-bottom:14px">Esta campaña ya usó el 80% de su presupuesto.</div>' : ''}` }),
    juegos: (r) => {
      const n = r._etapa_n || 1; const ck = r.checklist || {};
      return { top: `<ol class="steps game">${D.meta.gameStages.map((st, i) => `<li class="${i + 1 < n ? 'done' : i + 1 === n ? 'now' : ''}"><span>${i + 1}</span>${esc(st.replace(/^\d\. /, ''))}</li>`).join('')}</ol>
        <div class="grid g3" style="margin:14px 0"><div class="kpi"><div class="label">Próximo hito</div><div class="v" style="font-size:18px">${esc(r.hito || '—')}</div><div class="s">${r.fecha_hito ? `${D.date(r.fecha_hito)} · ${D.rel(r.fecha_hito)}` : ''}</div></div>
        <div class="kpi ${r._bugs_abiertos ? 'alert' : ''}" data-go="bugs" role="button" tabindex="0"><div class="label">Bugs abiertos</div><div class="v">${r._bugs_abiertos}</div><div class="s">Ver en Bugs y QA</div></div>
        <div class="kpi" data-go="llaves" role="button" tabindex="0"><div class="label">Llaves</div><div class="v">${r._llaves.total}</div><div class="s">${r._llaves.disponibles} disponibles · ${r._llaves.cubiertas} con contenido</div></div></div>`,
        bottom: `<div class="section"><h3>Pendientes de la etapa ${n} · ${esc((D.meta.gameStages[n - 1] || '').replace(/^\d\. /, ''))}</h3><div class="checklist">${(GAME_CHECK[n] || []).map(item => `<label class="check"><input type="checkbox" data-check="${esc(item)}" ${ck[item] ? 'checked' : ''} ${canW('juegos') ? '' : 'disabled'}> ${esc(item)}</label>`).join('')}</div>
          <p class="small muted" style="margin:8px 0 0">Cuando termines la etapa, edita el juego y pásalo a la siguiente.</p></div>
          ${r.project_id && !isClient() ? `<div class="section"><h3>Tareas del proyecto por disciplina</h3><div data-gtasks class="list"><span class="muted">Cargando…</span></div></div>` : ''}` };
    },
    planes: (r) => ({ top: `<div class="note" style="margin-bottom:16px">${D.badge(r.estado)} &nbsp;${D.money(r.monto)} ${esc((r.frecuencia || 'Mensual').toLowerCase())} · próximo cobro <b>${D.date(r.proximo_cobro)}</b> (${D.rel(r.proximo_cobro)})${r.ultima_factura ? ` · última factura ${esc(r.ultima_factura)}` : ''}</div>${r._por_devolver ? `<div class="note danger" style="margin-bottom:14px">Este alquiler termina el ${D.date(r.fin)}: coordina la devolución o la renovación.</div>` : ''}` }),
    pedidos: (r) => ({ top: `<div class="note" style="margin-bottom:16px">${D.badge(r.estado)} &nbsp;Total <b>${D.money(r._total)}</b> · ${r.stock_aplicado ? 'el stock ya se descontó' : 'el stock se descontará al marcarlo como Pagado'}</div>`, bottom: linesView(r) }),
    manuales: (r) => ({ top: `<article class="doc-body">${esc(r.contenido || '').replace(/\n/g, '<br>')}</article>` }),
    llaves: (r) => ({ top: r.llave ? `<div class="keybox"><span class="mono">${esc(r.llave)}</span><button class="btn sm" data-act="copiar">Copiar</button></div>` : '' }),
  });
  D.ACTIONS = {
    cotizaciones: (r) => `<button class="btn" data-act="pdfq">${D.icon('pdf')} PDF</button>
      ${canW('cotizaciones') && r.estado === 'Borrador' ? '<button class="btn violet" data-act="enviada">Marcar como enviada</button>' : ''}
      ${r.estado === 'Enviada' && (canW('cotizaciones') || D.me.rol === 'cliente') ? '<button class="btn" data-act="rechazada">Rechazar</button><button class="btn violet" data-act="aceptada">Aceptar</button>' : ''}
      ${canW('cotizaciones') && r.estado === 'Aceptada' && !r.project_id ? '<button class="btn violet" data-act="convertir">Crear proyecto / factura</button>' : ''}`,
    facturas: (r) => `<button class="btn" data-act="pdff">${D.icon('pdf')} PDF</button>${r._saldo > 0 && !r.anulada && (canW('facturas') || D.me.rol === 'cliente') ? `<button class="btn violet" data-act="pago">${canW('facturas') ? 'Registrar pago' : 'Reportar pago'}</button>` : ''}`,
    proyectos: (r) => D.me.rol === 'cliente' && !r.aprobado_cliente ? '<button class="btn violet" data-act="aprobar">Aprobar entrega</button>' : '',
    gastos: (r) => r.estado === 'Pendiente' && D.meta.canApprove.gastos ? '<button class="btn" data-act="gno">Rechazar</button><button class="btn violet" data-act="gsi">Aprobar</button>' : '',
    ausencias: (r) => r.estado === 'Pendiente' && D.meta.canApprove.ausencias ? '<button class="btn" data-act="ano">Rechazar</button><button class="btn violet" data-act="asi">Aprobar</button>' : '',
    productos: (r) => canW('movimientos') ? '<button class="btn" data-act="salida">Salida</button><button class="btn violet" data-act="entrada">Entrada</button>' : '',
    nomina: (r) => `<button class="btn" data-act="pdfr">${D.icon('pdf')} Recibo PDF</button>`,
    equipo: (r) => canW('equipo') ? '<button class="btn" data-act="pass">Restablecer contraseña</button>' : '',
    piezas: (r) => {
      const out = [];
      if (canW('piezas') && !isClient()) {
        if (['En producción','Cambios pedidos'].includes(r.estado)) { if (r.estado === 'Cambios pedidos' || r.version > 1 || r.archivo || r.enlace) out.push('<button class="btn" data-act="pzversion">Subir nueva versión</button>'); out.push('<button class="btn violet" data-act="pzinterna">Enviar a revisión interna</button>'); }
        if (r.estado === 'Revisión interna' && D.meta.canApprove.piezas) out.push('<button class="btn" data-act="pzno">Pedir cambios</button><button class="btn violet" data-act="pzsi">Aprobar y enviar al cliente</button>');
        if (r.estado === 'Aprobada' || r.estado === 'Revisión del cliente') out.push('<button class="btn" data-act="pzversion">Subir nueva versión</button>');
      }
      if (r.estado === 'Revisión del cliente' && D.me.rol === 'cliente') out.push('<button class="btn" data-act="pzno">Pedir cambios</button><button class="btn violet" data-act="pzsi">Aprobar</button>');
      return out.join('');
    },
    redes: (r) => r.estado === 'Por aprobar' && D.me.rol === 'cliente' ? '<button class="btn" data-act="postno">Pedir cambios</button><button class="btn violet" data-act="postsi">Aprobar publicación</button>'
      : canW('redes') && !isClient() && ['Idea','En diseño'].includes(r.estado) ? '<button class="btn violet" data-act="postenviar">Enviar al cliente para aprobar</button>' : '',
    llaves: (r) => canW('llaves') && r.estado === 'Disponible' ? '<button class="btn violet" data-act="asignar">Asignar a un creador</button>' : '',
    pedidos: (r) => canW('pedidos') ? (r.estado === 'Nuevo' ? '<button class="btn violet" data-act="pedpagado">Marcar como pagado</button>' : r.estado === 'Pagado' ? '<button class="btn violet" data-act="pedentregado">Marcar como entregado</button>' : '') : '',
  };
  const reopen = (key, id) => { D.rerender(); D.openRecord(key, id); };
  D.HANDLERS = {
    hist: async (r) => { const v = await D.prompt('Anotar contacto', D.fieldHtml({ key: 'tipo', label: 'Tipo', type: 'select', required: true, options: ['Llamada','Mensaje','Reunión','Correo','Nota'] }, { tipo: 'Llamada' }) + D.fieldHtml({ key: 'nota', label: 'Qué pasó', type: 'textarea', required: true })); if (v && await D.try(() => D.call('action', 'cliente.historial', { id: r.id, ...v }), 'Anotado en el historial.')) reopen('clientes', r.id); },
    ronda: async (r) => {
      const left = Number(r.rondas_incluidas || 0) - Number(r.rondas_usadas || 0);
      const warn = left <= 0 ? `<div class="note danger" style="grid-column:1/-1">Este proyecto ya usó sus ${r.rondas_incluidas} rondas incluidas. Esta ronda generará una <b>orden de cambio</b> con costo extra${r.costo_ronda_extra ? ` de <b>${D.money(r.costo_ronda_extra)}</b>` : ''}.</div>` : `<div class="note" style="grid-column:1/-1">Quedan ${left} rondas incluidas en el contrato.</div>`;
      const v = await D.prompt('Registrar ronda de cambios', warn + D.fieldHtml({ key: 'nota', label: '¿Qué cambios pidió el cliente?', type: 'textarea', required: true }), 'Registrar ronda');
      if (!v) return; const out = await D.try(() => D.call('action', 'proyecto.ronda', { id: r.id, nota: v.nota }));
      if (out) { D.toast(out.extra ? 'Ronda extra registrada: se creó una orden de cambio por cobrar.' : 'Ronda registrada.', out.extra ? 'warn' : 'ok'); reopen('proyectos', r.id); }
    },
    aprobar: async (r) => { if (await D.confirm('Aprobar entrega', `¿Confirmas que apruebas la entrega de <b>${esc(r.nombre)}</b>?`, 'Sí, aprobar', 'violet') && await D.try(() => D.call('action', 'proyecto.aprobar', { id: r.id }), '¡Gracias! Entrega aprobada.')) reopen('proyectos', r.id); },
    newtask: (r) => D.openForm('tareas', null, { project_id: r.id }),
    pdfq: (r) => D.pdfCotizacion(r), pdff: (r) => D.pdfFactura(r), pdfr: (r) => D.pdfRecibo(r),
    enviada: async (r) => { if (await D.try(() => D.call('action', 'cotizacion.estado', { id: r.id, estado: 'Enviada' }), 'Marcada como enviada.')) reopen('cotizaciones', r.id); },
    aceptada: async (r) => { if (await D.confirm('Aceptar cotización', `¿Aceptar la cotización <b>${esc(r.codigo)}</b> por <b>${D.money(r._total)}</b>?`, 'Sí, aceptar', 'violet') && await D.try(() => D.call('action', 'cotizacion.estado', { id: r.id, estado: 'Aceptada' }), 'Cotización aceptada.')) reopen('cotizaciones', r.id); },
    rechazada: async (r) => { if (await D.confirm('Rechazar cotización', `¿Rechazar la cotización <b>${esc(r.codigo)}</b>?`, 'Sí, rechazar') && await D.try(() => D.call('action', 'cotizacion.estado', { id: r.id, estado: 'Rechazada' }), 'Cotización rechazada.')) reopen('cotizaciones', r.id); },
    convertir: async (r) => {
      const v = await D.prompt('Crear a partir de la cotización', `<label class="check field full"><input type="checkbox" name="proyecto" checked> Crear el proyecto (con ${r.rondas_incluidas ?? '—'} rondas incluidas)</label>${canW('facturas') ? '<label class="check field full"><input type="checkbox" name="factura" checked> Crear la factura con las mismas líneas</label>' : ''}`, 'Crear');
      if (!v) return; const out = await D.try(() => D.call('action', 'cotizacion.convertir', { id: r.id, ...v }), 'Listo.');
      if (out) { await D.refreshRefs(); if (out.proyecto) { D.go('proyectos'); setTimeout(() => D.openRecord('proyectos', out.proyecto.id), 200); } else D.rerender(); }
    },
    pago: async (r) => {
      const staff = canW('facturas');
      const v = await D.prompt(staff ? 'Registrar pago' : 'Reportar pago',
        `${!staff ? '<div class="note" style="grid-column:1/-1">Tu pago quedará <b>por verificar</b> hasta que el equipo de Finanzas lo confirme.</div>' : ''}` +
        D.fieldHtml({ key: 'monto', label: 'Monto', type: 'money', required: true }, { monto: r._saldo }) + D.fieldHtml({ key: 'fecha', label: 'Fecha', type: 'date', required: true }, { fecha: D.today() }) +
        D.fieldHtml({ key: 'metodo', label: 'Método', type: 'select', required: true, options: D.settings.metodos_pago }, { metodo: 'Pago Móvil' }) + D.fieldHtml({ key: 'referencia', label: 'N° de referencia' }) +
        (staff ? D.fieldHtml({ key: 'verificado', label: 'Ya verifiqué que el dinero llegó', type: 'checkbox' }, { verificado: true }) : ''), staff ? 'Registrar' : 'Reportar pago');
      if (v && await D.try(() => D.call('action', 'factura.pago', { id: r.id, ...v }), staff ? 'Pago registrado.' : 'Pago reportado. Te avisaremos cuando lo verifiquen.')) reopen('facturas', r.id);
    },
    verificar: async (r, b) => { if (await D.try(() => D.call('action', 'factura.verificar', { id: r.id, pago_id: b.dataset.pago }), 'Pago verificado.')) reopen('facturas', r.id); },
    rechazar: async (r, b) => { if (await D.confirm('Rechazar pago', '¿El dinero no llegó o la referencia no coincide? El pago quedará como rechazado.', 'Sí, rechazar') && await D.try(() => D.call('action', 'factura.verificar', { id: r.id, pago_id: b.dataset.pago, rechazar: true }), 'Pago rechazado.')) reopen('facturas', r.id); },
    gsi: async (r) => { if (await D.try(() => D.call('action', 'gasto.decidir', { id: r.id, aprobar: true }), 'Gasto aprobado.')) reopen('gastos', r.id); },
    gno: async (r) => { if (await D.try(() => D.call('action', 'gasto.decidir', { id: r.id, aprobar: false }), 'Gasto rechazado.')) reopen('gastos', r.id); },
    asi: async (r) => { if (await D.try(() => D.call('action', 'ausencia.decidir', { id: r.id, aprobar: true }), 'Ausencia aprobada.')) reopen('ausencias', r.id); },
    ano: async (r) => { if (await D.try(() => D.call('action', 'ausencia.decidir', { id: r.id, aprobar: false }), 'Ausencia rechazada.')) reopen('ausencias', r.id); },
    entrada: (r) => D.openForm('movimientos', null, { product_id: r.id, tipo: 'Entrada' }),
    salida: (r) => D.openForm('movimientos', null, { product_id: r.id, tipo: 'Salida', motivo: 'Venta' }),
    pzinterna: async (r) => { if (await D.try(() => D.call('action', 'pieza.enviar', { id: r.id, a: 'interna' }), 'Enviada a revisión interna.')) reopen('piezas', r.id); },
    pzsi: async (r) => {
      const cli = D.me.rol === 'cliente';
      const v = await D.prompt(cli ? 'Aprobar pieza' : 'Aprobar y enviar al cliente', `<div class="note" style="grid-column:1/-1">${cli ? `¿Apruebas <b>${esc(r.titulo)}</b> (v${r.version})?` : 'El cliente verá esta versión en su portal para aprobarla.'}</div>` + D.fieldHtml({ key: 'nota', label: 'Comentario (opcional)', type: 'textarea' }), cli ? 'Sí, aprobar' : 'Aprobar y enviar');
      if (!v) return; const out = await D.try(() => D.call('action', 'pieza.decidir', { id: r.id, aprobar: true, nota: v.nota }), cli ? '¡Gracias! Pieza aprobada.' : 'Enviada al cliente.'); if (out) { D.updateBadges(); reopen('piezas', r.id); }
    },
    pzno: async (r) => {
      const cli = D.me.rol === 'cliente'; let warn = '';
      if (cli || r.estado === 'Revisión del cliente') { const pr = (await D.try(() => D.call('get', 'proyectos', r.project_id))) || {}; const left = Number(pr.rondas_incluidas || 0) - Number(pr.rondas_usadas || 0);
        warn = left > 0 ? `<div class="note" style="grid-column:1/-1">Esto usa una ronda de cambios del proyecto. Quedan <b>${left}</b> incluidas.</div>` : `<div class="note danger" style="grid-column:1/-1">Ya se usaron las rondas incluidas en el contrato. Esta ronda tendrá un costo adicional${pr.costo_ronda_extra ? ` de <b>${D.money(pr.costo_ronda_extra)}</b>` : ''}.</div>`; }
      else warn = '<div class="note" style="grid-column:1/-1">Cambios internos: no cuentan como ronda del cliente.</div>';
      const v = await D.prompt('Pedir cambios', warn + D.fieldHtml({ key: 'nota', label: '¿Qué hay que cambiar?', type: 'textarea', required: true, placeholder: 'Sé lo más específico posible.' }) + (r.tipo === 'Video' || r.tipo === 'Animación' || r.tipo === 'Audio' ? D.fieldHtml({ key: 'momento', label: 'Segundo exacto (opcional)', placeholder: 'Ej.: 00:42' }) : ''), 'Pedir cambios');
      if (!v) return; const out = await D.try(() => D.call('action', 'pieza.decidir', { id: r.id, aprobar: false, nota: v.nota, momento: v.momento || '' }));
      if (out) { D.toast(out.extra ? 'Cambios pedidos. Esta ronda está fuera de las incluidas y se registró como orden de cambio.' : 'Cambios pedidos.', out.extra ? 'warn' : 'ok'); D.updateBadges(); reopen('piezas', r.id); }
    },
    pzcomentar: async (r) => {
      const v = await D.prompt('Comentar', D.fieldHtml({ key: 'texto', label: 'Comentario', type: 'textarea', required: true }) + (['Video','Animación','Audio'].includes(r.tipo) ? D.fieldHtml({ key: 'momento', label: 'Segundo exacto (opcional)', placeholder: 'Ej.: 00:42' }) : '') + (!isClient() ? D.fieldHtml({ key: 'interno', label: 'Nota interna (el cliente no la ve)', type: 'checkbox' }, { interno: r.estado !== 'Revisión del cliente' && r.estado !== 'Aprobada' }) : ''), 'Comentar');
      if (v && await D.try(() => D.call('action', 'pieza.comentar', { id: r.id, ...v }), 'Comentario agregado.')) reopen('piezas', r.id);
    },
    pzversion: async (r) => {
      const v = await D.prompt(`Subir versión ${(r.version || 1) + 1}`, '<div class="note" style="grid-column:1/-1">La nueva versión vuelve a revisión interna. La anterior queda guardada en el historial.</div>' + D.fieldHtml({ key: 'archivo', label: 'Archivo', type: 'file' }) + D.fieldHtml({ key: 'enlace', label: 'O enlace', full: true }, { enlace: r.enlace }) + D.fieldHtml({ key: 'nota', label: 'Qué cambió', type: 'textarea' }), 'Subir versión');
      if (v && await D.try(() => D.call('action', 'pieza.version', { id: r.id, ...v }), 'Nueva versión subida.')) reopen('piezas', r.id);
    },
    postsi: async (r) => { if (await D.confirm('Aprobar publicación', `¿Apruebas <b>${esc(r.titulo)}</b> para publicarse el ${D.datetime(r.fecha)}?`, 'Sí, aprobar', 'violet') && await D.try(() => D.call('action', 'post.decidir', { id: r.id, aprobar: true }), '¡Gracias! Publicación aprobada.')) { D.updateBadges(); reopen('redes', r.id); } },
    postno: async (r) => { const v = await D.prompt('Pedir cambios', D.fieldHtml({ key: 'nota', label: '¿Qué hay que cambiar?', type: 'textarea', required: true }), 'Enviar'); if (v && await D.try(() => D.call('action', 'post.decidir', { id: r.id, aprobar: false, nota: v.nota }), 'Le avisamos al equipo.')) { D.updateBadges(); reopen('redes', r.id); } },
    postenviar: async (r) => { if (await D.try(() => D.call('save', 'redes', { id: r.id, estado: 'Por aprobar' }), 'El cliente ya la ve en su portal para aprobarla.')) reopen('redes', r.id); },
    asignar: async (r) => { const v = await D.prompt('Asignar llave', D.fieldHtml({ key: 'creador', label: 'Creador o medio', required: true }) + D.fieldHtml({ key: 'red', label: 'Red', type: 'select', options: ['YouTube','Twitch','TikTok','Kick','Instagram','Prensa','Otra'] }, { red: 'YouTube' }) + D.fieldHtml({ key: 'canal', label: 'Enlace al canal' }) + D.fieldHtml({ key: 'seguidores', label: 'Seguidores', type: 'number' }), 'Asignar');
      if (v && await D.try(() => D.call('save', 'llaves', { id: r.id, ...v, estado: 'Enviada', fecha_envio: D.today() }), 'Llave asignada. Recuerda enviársela al creador.')) reopen('llaves', r.id); },
    copiar: (r) => { navigator.clipboard.writeText(r.llave).then(() => D.toast('Llave copiada.')); },
    pedpagado: async (r) => { if (await D.try(() => D.call('save', 'pedidos', { id: r.id, estado: 'Pagado' }), 'Pedido pagado: stock descontado.')) reopen('pedidos', r.id); },
    pedentregado: async (r) => { if (await D.try(() => D.call('save', 'pedidos', { id: r.id, estado: 'Entregado' }), 'Pedido entregado.')) reopen('pedidos', r.id); },
    pass: async (r) => { const v = await D.prompt(`Nueva contraseña para ${r.nombre}`, D.fieldHtml({ key: 'password', label: 'Nueva contraseña', type: 'password', required: true, hint: 'Mínimo 8 caracteres. Compártela por un canal privado.' })); if (v) await D.try(() => D.call('action', 'usuario.password', { id: r.id, password: v.password }), 'Contraseña restablecida.'); },
  };
  D.MOUNT = {
    soporte: (root, r) => {
      const box = root.querySelector('[data-reply]'); if (!box) return;
      box.querySelector('[data-send]').onclick = async () => {
        const texto = box.querySelector('textarea').value.trim(); if (!texto) return D.toast('Escribe un mensaje.', 'error');
        const interno = !!(box.querySelector('[data-internal]') || {}).checked; const estado = (box.querySelector('[data-next]') || {}).value || '';
        if (await D.try(() => D.call('action', 'ticket.responder', { id: r.id, texto, interno, estado }), interno ? 'Nota interna guardada.' : 'Mensaje enviado.')) { D.updateBadges(); reopen('soporte', r.id); }
      };
    },
    piezas: async (root, r) => {
      const box = root.querySelector('[data-preview]'); if (!box || !r.archivo) return;
      const res = await window.dos.previewFile(r.archivo.ruta); const wait = box.querySelector('.muted'); if (wait) wait.remove();
      if (res && res.data) box.insertAdjacentHTML('afterbegin', `<img src="${res.data}" alt="Vista previa de ${esc(r.titulo)}">`);
    },
    juegos: async (root, r) => {
      root.querySelectorAll('[data-check]').forEach(cb => cb.onchange = async () => { await D.try(() => D.call('action', 'juego.check', { id: r.id, item: cb.dataset.check, hecho: cb.checked })); });
      root.querySelectorAll('[data-go]').forEach(k => k.onclick = () => { D.closeAll(); D.go(k.dataset.go); });
      const box = root.querySelector('[data-gtasks]'); if (!box) return;
      const tasks = ((await D.try(() => D.call('list', 'tareas'))) || []).filter(t => t.project_id === r.project_id);
      const by = {}; tasks.forEach(t => (by[t.disciplina || 'Sin disciplina'] = by[t.disciplina || 'Sin disciplina'] || []).push(t));
      box.innerHTML = tasks.length ? Object.entries(by).map(([d, list]) => `<div class="label" style="margin:8px 0 4px">${esc(d)} · ${list.filter(t => t.estado === 'Hecha').length}/${list.length}</div>${list.map(t => `<div class="item" data-open="tareas:${t.id}"><div class="t"><b>${esc(t.titulo)}</b><span>${esc(t._asignado || 'Sin responsable')} · ${t.vence ? D.rel(t.vence) : 'sin fecha'}</span></div>${D.badge(t.estado)}</div>`).join('')}`).join('') : '<p class="muted">Sin tareas en el proyecto.</p>';
      box.querySelectorAll('[data-open]').forEach(a => a.onclick = () => { const [m, i] = a.dataset.open.split(':'); D.openRecord(m, i); });
    },
    proyectos: async (root, r) => {
      const box = root.querySelector('[data-tasks]'); if (!box) return;
      const tasks = ((await D.try(() => D.call('list', 'tareas'))) || []).filter(t => t.project_id === r.id);
      box.innerHTML = tasks.length ? tasks.map(t => `<div class="item" data-open="tareas:${t.id}"><div class="t"><b>${esc(t.titulo)}</b><span>${esc(t._asignado || 'Sin responsable')} · vence ${D.date(t.vence)}</span></div>${D.badge(t.estado)}</div>`).join('') : '<p class="muted">Sin tareas todavía.</p>';
      box.querySelectorAll('[data-open]').forEach(a => a.onclick = () => { const [m, i] = a.dataset.open.split(':'); D.openRecord(m, i); });
    },
  };
  D.AFTER_SAVE = { movimientos: () => { D.toast('Stock actualizado.'); } };
  D.PAGE_ACTIONS = {
    nomina: () => canW('nomina') ? `<button class="btn violet" data-page-act="nomina">Generar nómina del período</button>` : '',
    planes: () => canW('planes') && canW('facturas') ? `<button class="btn violet" data-page-act="facturarplanes">Facturar los que vencen</button>` : '',
    llaves: () => canW('llaves') ? `<button class="btn violet" data-page-act="cargarllaves">Cargar varias llaves</button>` : '',
    proyectos: () => '',
  };
  D.PAGE_HANDLERS = {
    facturarplanes: async () => {
      if (!(await D.confirm('Facturar planes', 'Se creará una factura para cada plan activo cuyo cobro vence en los próximos 3 días (o ya venció), y su próximo cobro avanzará al siguiente período.', 'Crear facturas', 'violet'))) return;
      const out = await D.try(() => D.call('action', 'planes.facturar', {})); if (out) { D.toast(out.length ? `${D.pl(out.length, 'factura creada', 'facturas creadas')}: ${out.join(', ')}.` : 'No hay planes por facturar ahora.'); D.rerender(); }
    },
    cargarllaves: async () => {
      const v = await D.prompt('Cargar llaves', D.fieldHtml({ key: 'game_id', label: 'Juego', type: 'select', required: true, options: () => (D.refs.juegos || []).map(g => ({ value: g.id, label: g.nombre })) }) + D.fieldHtml({ key: 'plataforma', label: 'Tienda', type: 'select', options: ['Steam','itch.io','Nintendo Switch','PlayStation','Xbox','Epic','Otra'] }, { plataforma: 'Steam' }) + D.fieldHtml({ key: 'llaves', label: 'Llaves (una por línea)', type: 'textarea', required: true, rows: 8, hint: 'Pega la lista que te da Steamworks. Las repetidas se ignoran.' }), 'Cargar');
      if (!v) return; const out = await D.try(() => D.call('action', 'llaves.cargar', v)); if (out) { D.toast(`${D.pl(out.creadas, 'llave cargada', 'llaves cargadas')}${out.repetidas ? ` · ${out.repetidas} repetidas ignoradas` : ''}.`); D.rerender(); }
    },
    nomina: async () => {
      const d = new Date(); const q = d.getDate() <= 15 ? '1ra quincena' : '2da quincena';
      const v = await D.prompt('Generar nómina', `<div class="note" style="grid-column:1/-1">Se crea un recibo en borrador para cada persona con salario en su ficha. Después puedes ajustar bonos y deducciones.</div>` + D.fieldHtml({ key: 'periodo', label: 'Período', required: true, full: true }, { periodo: `${D.ymd(d).slice(0, 7)} · ${q}` }), 'Generar');
      if (!v) return; const out = await D.try(() => D.call('action', 'nomina.generar', v)); if (out) { D.toast(out.length ? `${out.length} recibos creados.` : 'Esa nómina ya estaba generada.'); D.rerender(); }
    },
  };

  // ───────────── inicio ─────────────
  const greet = () => { const h = new Date().getHours(); return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'; };
  const firstName = () => D.me.nombre.replace(/\(.*?\)/g, '').trim().split(' ')[0];
  D.views.inicio = async (el) => {
    const d = await D.try(() => D.call('dashboard')); if (!d) return; D._dash = d;
    if (d.cliente) return clientHome(el, d);
    const today = new Date(); const fecha = `${today.getDate()} de ${D.MESES_LARGOS[today.getMonth()]} de ${today.getFullYear()}`;
    const kpis = [];
    kpis.push({ l: 'Mis tareas pendientes', v: d.mis_tareas.length, s: d.atrasadas ? `${D.pl(d.atrasadas, 'tarea atrasada', 'tareas atrasadas')} en tus proyectos` : 'Nada atrasado', go: 'tareas', alert: d.atrasadas > 0 });
    kpis.push({ l: 'Entregas en 7 días', v: d.entregas_semana.length, s: 'Proyectos y tareas', go: 'calendario' });
    if (d.por_cobrar !== undefined) kpis.push({ l: 'Por cobrar', v: D.money(d.por_cobrar), s: d.pagos_por_verificar ? D.pl(d.pagos_por_verificar, 'pago por verificar', 'pagos por verificar') : 'Facturas abiertas', go: 'facturas', alert: d.pagos_por_verificar > 0 });
    if (d.clientes) kpis.push({ l: 'Clientes actuales', v: d.clientes.actuales, s: `${d.clientes.por_contactar} por contactar · ${d.clientes.total} en total`, go: 'clientes' });
    else kpis.push({ l: 'Proyectos activos', v: d.proyectos_activos.length, s: 'Donde participas', go: 'proyectos' });
    const alerts = [];
    if (d.atrasadas) alerts.push({ k: 'danger', t: D.pl(d.atrasadas, 'tarea atrasada', 'tareas atrasadas'), s: 'Revisa fechas o reasigna.', go: 'tareas' });
    for (const p of d.rondas_alerta || []) alerts.push({ k: Number(p.rondas_usadas) > Number(p.rondas_incluidas) ? 'danger' : '', t: `${p.nombre}: ${p.rondas_usadas}/${p.rondas_incluidas} rondas`, s: Number(p.rondas_usadas) > Number(p.rondas_incluidas) ? 'Fuera de contrato: cobrar orden de cambio.' : 'Siguiente ronda se cobra aparte.', open: `proyectos:${p.id}` });
    if (d.pagos_por_verificar) alerts.push({ k: 'info', t: D.pl(d.pagos_por_verificar, 'pago por verificar', 'pagos por verificar'), s: 'Un cliente reportó un pago: confirma que llegó.', go: 'facturas' });
    if (d.ausencias_pendientes) alerts.push({ k: 'info', t: D.pl(d.ausencias_pendientes, 'solicitud de ausencia', 'solicitudes de ausencia'), s: 'Esperan aprobación.', go: 'ausencias' });
    if (d.gastos_pendientes) alerts.push({ k: 'info', t: D.pl(d.gastos_pendientes, 'gasto por aprobar', 'gastos por aprobar'), s: 'Esperan aprobación.', go: 'gastos' });
    for (const p of d.stock_bajo || []) alerts.push({ k: '', t: `Stock bajo: ${p.nombre}`, s: `Quedan ${p.stock}.`, open: `productos:${p.id}` });
    for (const l of d.licencias_vencen || []) alerts.push({ k: '', t: `Licencia por vencer: ${l.nombre}`, s: `Vence ${D.date(l.vence)} (${D.rel(l.vence)}).`, open: `licencias:${l.id}` });
    for (const q of (d.cotizaciones_enviadas || []).slice(0, 3)) alerts.push({ k: 'info', t: `${q.codigo} espera respuesta`, s: `${q._cliente} · ${D.money(q._total)}`, open: `cotizaciones:${q.id}` });
    if (d.soporte_esperando) alerts.unshift({ k: 'danger', t: D.pl(d.soporte_esperando, 'solicitud espera respuesta', 'solicitudes esperan respuesta'), s: 'Clientes escribieron y nadie ha respondido.', go: 'soporte' });
    for (const b of d.bugs_bloqueantes || []) alerts.unshift({ k: 'danger', t: `Bug bloqueante: ${b.titulo}`, s: `${b._juego || b._proyecto || ''} · ${b.estado}`, open: `bugs:${b.id}` });
    if ((d.piezas_internas || []).length) alerts.push({ k: 'info', t: D.pl(d.piezas_internas.length, 'pieza espera tu revisión', 'piezas esperan tu revisión'), s: 'Revisión interna antes de enviarlas al cliente.', go: 'piezas' });
    if ((d.piezas_cambios || []).length) alerts.push({ k: '', t: D.pl(d.piezas_cambios.length, 'pieza con cambios pedidos', 'piezas con cambios pedidos'), s: 'Sube la nueva versión cuando esté lista.', go: 'piezas' });
    for (const c of d.campanas_alerta || []) alerts.push({ k: c._uso_pct >= 100 ? 'danger' : '', t: `${c.nombre}: ${c._uso_pct}% del presupuesto`, s: `${c._cliente} · ${D.money(c.gastado)} de ${D.money(c.presupuesto)}`, open: `anuncios:${c.id}` });
    if (d.planes_por_facturar) alerts.push({ k: 'info', t: D.pl(d.planes_por_facturar, 'plan por facturar', 'planes por facturar'), s: 'Cobros recurrentes que vencen en los próximos días.', go: 'planes' });
    for (const a of d.alquileres_devolver || []) alerts.push({ k: '', t: `Alquiler por terminar: ${a.nombre}`, s: `${a._cliente} · ${D.date(a.fin)}`, open: `planes:${a.id}` });
    if ((d.posts_hoy || []).length) alerts.push({ k: 'info', t: D.pl(d.posts_hoy.length, 'publicación sale hoy', 'publicaciones salen hoy'), s: d.posts_hoy.map(p => p.titulo).slice(0, 2).join(' · '), go: 'redes' });
    if (d.pedidos_pendientes) alerts.push({ k: '', t: D.pl(d.pedidos_pendientes, 'pedido de merch por despachar', 'pedidos de merch por despachar'), s: 'Nuevos o pagados sin entregar.', go: 'pedidos' });
    if (d.bandeja_nuevos) alerts.push({ k: 'info', t: D.pl(d.bandeja_nuevos, 'comentario o mensaje sin responder', 'comentarios y mensajes sin responder'), s: 'Instagram y Facebook de tus clientes.', go: 'bandeja' });
    for (const g of (d.metas_atrasadas || []).slice(0, 4)) alerts.push({ k: '', t: `Meta atrasada: ${g.titulo}`, s: `${g._cliente} · ${g._avance}% hecho con ${g._esperado}% del tiempo (cierra ${D.date(g.hasta)})`, open: `metas:${g.id}` });
    if (d.carga && d.carga.saturados.length) alerts.push({ k: 'danger', t: `${D.pl(d.carga.saturados.length, 'persona saturada', 'personas saturadas')} en las próximas 2 semanas`, s: d.carga.saturados.map(x => `${x.nombre.replace(' (ejemplo)', '')} ${x.pct}%`).slice(0, 3).join(' · ') + (d.carga.libres ? ` · ${D.pl(d.carga.libres, 'persona libre', 'personas libres')} para reasignar` : ''), go: 'carga' });
    if (d.reportes_mes) alerts.push({ k: 'info', t: 'Inicio de mes: reportes para clientes', s: 'Genera los PDF del mes pasado de todos tus clientes en un paso.', go: 'informes' });
    if (d.candidatos_nuevos) alerts.push({ k: 'info', t: D.pl(d.candidatos_nuevos, 'candidato nuevo', 'candidatos nuevos'), s: 'Revisa su portafolio.', go: 'candidatos' });
    const pp = d.primeros_pasos; let ppHide = false; try { ppHide = localStorage.getItem('primeros-pasos') === 'oculto'; } catch (e) {}
    const ppItems = pp ? [['ajustes', 'Completa los datos del estudio', 'ajustes', 'Salen en cotizaciones y facturas.'], ['catalogo', 'Agrega tus servicios con precio', 'catalogo', 'Para cotizar en segundos.'], ['equipo', 'Crea las cuentas de tu equipo', 'equipo', 'Cada rol ve solo lo suyo.'], ['clientes', 'Agrega tu primer cliente', 'clientes', 'O tus prospectos por contactar.'], ['proyectos', 'Crea tu primer proyecto', 'proyectos', 'Con equipo, fechas y rondas.']] : [];
    const ppDone = ppItems.filter(([k]) => pp[k]).length;
    const ppCard = pp && !ppHide && ppDone < ppItems.length ? `<div class="card onboarding" style="margin-bottom:16px"><h2>Primeros pasos <span class="muted small" style="font-weight:500">${ppDone} de ${ppItems.length}</span><button class="btn sm" data-pp-hide>Ocultar</button></h2><div class="progress" style="margin:6px 0 12px"><i style="width:${ppDone / ppItems.length * 100}%"></i></div>
      <div class="pp">${ppItems.map(([k, t, go, sub]) => `<button class="pp-item ${pp[k] ? 'done' : ''}" data-go="${go}"><span class="tick">${pp[k] ? D.icon('check') : ''}</span><span><b>${esc(t)}</b><span class="small muted">${esc(sub)}</span></span></button>`).join('')}</div></div>` : '';
    el.innerHTML = `<div class="page">${pageHead(`${greet()}, ${firstName()}`, `${fecha} · Esto es lo importante para ti hoy.`)}${ppCard}
      <div class="grid g4">${kpis.map(k => `<div class="kpi ${k.alert ? 'alert' : ''}" data-go="${k.go}" tabindex="0" role="button"><div class="label">${esc(k.l)}</div><div class="v">${k.v}</div><div class="s">${esc(k.s)}</div></div>`).join('')}</div>
      <div class="grid g2" style="margin-top:16px">
        <div class="card"><h2>Mis tareas ${canW('tareas') ? `<button class="btn sm" data-new="tareas">${D.icon('plus')} Nueva</button>` : ''}</h2>
          ${d.mis_tareas.length ? `<div class="list">${d.mis_tareas.slice(0, 8).map(t => `<div class="item" data-open="tareas:${t.id}"><div class="t"><b>${esc(t.titulo)}</b><span>${esc(t._proyecto || 'Sin proyecto')} · ${t.vence ? `vence ${D.rel(t.vence)}` : 'sin fecha'}</span></div>${D.badge(t.prioridad)}</div>`).join('')}</div>` : D.empty('¡Nada pendiente!', 'No tienes tareas abiertas. Spiro está orgulloso.')}</div>
        <div class="grid">
          <div class="card"><h2>Alertas${alerts.length > 8 ? ` <span class="muted small" style="font-weight:500">${alerts.length}</span>` : ''}</h2>${alerts.length ? alerts.map((a, i) => `<div class="alert-row ${a.k} ${i >= 8 ? 'hidden' : ''}" ${i >= 8 ? 'data-alert-mas' : ''} ${a.go ? `data-go="${a.go}"` : `data-open="${a.open}"`} tabindex="0" role="button"><div>${D.icon('alert')}</div><div><b>${esc(a.t)}</b><span class="small">${esc(a.s)}</span></div></div>`).join('') + (alerts.length > 8 ? `<button class="btn sm ghost" data-ver-alertas style="margin-top:6px">Ver ${alerts.length - 8} alertas más</button>` : '') : '<p class="muted" style="margin:0">Todo en orden. Sin alertas.</p>'}</div>
          <div class="card"><h2>Recordatorios de hoy ${canW('recordatorios') ? `<button class="btn sm" data-new="recordatorios">${D.icon('plus')} Nuevo</button>` : ''}</h2>${d.recordatorios_hoy.length ? `<div class="list">${d.recordatorios_hoy.map(r => `<div class="item" data-open="recordatorios:${r.id}"><div class="t"><b>${esc(r.titulo)}</b><span>${D.datetime(r.fecha)}${r._cliente ? ' · ' + esc(r._cliente) : ''}</span></div></div>`).join('')}</div>` : '<p class="muted" style="margin:0">No tienes recordatorios para hoy.</p>'}</div>
        </div></div>
      ${d.entregas_semana.length ? `<div class="card" style="margin-top:16px"><h2>Entregas de los próximos 7 días</h2><div class="list">${d.entregas_semana.map(x => `<div class="item" data-open="${x.codigo ? 'proyectos' : 'tareas'}:${x.id}"><div class="t"><b>${esc(x.nombre || x.titulo)}</b><span>${x.codigo ? 'Entrega de proyecto' : 'Tarea'} · ${D.date(x.entrega || x.vence)} (${D.rel(x.entrega || x.vence)})</span></div>${D.badge(x.estado)}</div>`).join('')}</div></div>` : ''}</div>`;
    bindHome(el);
    const hide = el.querySelector('[data-pp-hide]'); if (hide) hide.onclick = (e) => { e.stopPropagation(); try { localStorage.setItem('primeros-pasos', 'oculto'); } catch (x) {} D.views.inicio(el); };
  };
  const bindHome = (el) => {
    el.querySelectorAll('[data-go]').forEach(k => { k.onclick = () => D.go(k.dataset.go); k.onkeydown = (e) => { if (e.key === 'Enter') D.go(k.dataset.go); }; });
    const va = el.querySelector('[data-ver-alertas]'); if (va) va.onclick = () => { el.querySelectorAll('[data-alert-mas]').forEach(x => x.classList.remove('hidden')); va.remove(); };
    el.querySelectorAll('[data-open]').forEach(a => { a.onclick = () => { const [m, i] = a.dataset.open.split(':'); D.openRecord(m, i); }; a.onkeydown = (e) => { if (e.key === 'Enter') a.click(); }; });
    D.bindPage(el);
  };
  async function clientHome(el, d) {
    const projects = d.proyectos_activos;
    const quotes = (await D.try(() => D.call('list', 'cotizaciones'))) || [];
    const invoices = D.canRead('facturas') ? ((await D.try(() => D.call('list', 'facturas'))) || []) : [];
    const s = D.settings;
    const pend = [...(d.piezas_cliente || []).map(p => ({ t: p.titulo, s: `Pieza · v${p.version || 1} · ${esc(p._proyecto || '')}`, open: `piezas:${p.id}`, b: 'Revisar' })), ...(d.posts_por_aprobar || []).map(p => ({ t: p.titulo, s: `Publicación · ${D.datetime(p.fecha)} · ${(p.redes || []).join(', ')}`, open: `redes:${p.id}`, b: 'Aprobar' })), ...quotes.filter(q => q.estado === 'Enviada').map(q => ({ t: `${q.codigo} · ${q.titulo || 'Cotización'}`, s: `Cotización · ${D.money(q._total)}`, open: `cotizaciones:${q.id}`, b: 'Ver' }))];
    const tickets = d.mis_solicitudes || [];
    el.innerHTML = `<div class="page">${pageHead(`Hola, ${firstName()}`, 'Bienvenido a tu portal de Delirium Studios: aquí ves el avance de tus proyectos, apruebas piezas y publicaciones, y reportas pagos.', D.canRead('soporte') ? `<button class="btn primary" data-new="soporte">${D.icon('plus')} Pedir algo al equipo</button>` : '')}
      ${pend.length ? `<div class="card attention" style="margin-bottom:16px"><h2>Esperan tu respuesta <span class="badge warn">${pend.length}</span></h2><div class="list">${pend.map(x => `<div class="item" data-open="${x.open}"><div class="t"><b>${esc(x.t)}</b><span>${x.s}</span></div><span class="btn sm violet">${x.b}</span></div>`).join('')}</div></div>` : ''}
      <h2 style="margin:6px 0 12px">Tus proyectos</h2>
      ${projects.length ? `<div class="grid g2">${projects.map(p => `<div class="card" data-open="proyectos:${p.id}" style="cursor:pointer"><h3>${esc(p.nombre)}</h3><p class="muted small" style="margin:4px 0 12px">${D.badge(p.estado)} · Entrega ${D.date(p.entrega)} (${D.rel(p.entrega) || 'sin fecha'})</p>
        <div class="label">Avance ${p._progreso}%</div><div class="progress" style="margin:6px 0 12px"><i style="width:${p._progreso}%"></i></div>
        <div class="small">Rondas de cambios: <b style="${Number(p.rondas_usadas) > Number(p.rondas_incluidas) ? 'color:var(--danger)' : ''}">${p.rondas_usadas || 0} de ${p.rondas_incluidas ?? 0}</b> usadas${p._rondas_restantes > 0 ? ` · te quedan ${p._rondas_restantes}` : ' · las siguientes tienen costo adicional'}</div></div>`).join('')}</div>` : '<div class="card muted">No tienes proyectos activos en este momento.</div>'}
      <div class="grid g2" style="margin-top:16px">
        <div class="card"><h2>Cotizaciones</h2>${quotes.length ? `<div class="list">${quotes.map(q => `<div class="item" data-open="cotizaciones:${q.id}"><div class="t"><b>${esc(q.codigo)} · ${esc(q.titulo || '')}</b><span>${D.money(q._total)} · válida hasta ${D.date(q.vence)}</span></div>${D.badge(q.estado === 'Enviada' ? 'Por revisar' : q.estado, q.estado === 'Enviada' ? 'warn' : undefined)}</div>`).join('')}</div>` : '<p class="muted" style="margin:0">No hay cotizaciones.</p>'}</div>
        <div class="card"><h2>Facturas y pagos</h2>${invoices.length ? `<div class="list">${invoices.map(f => `<div class="item" data-open="facturas:${f.id}"><div class="t"><b>${esc(f.codigo)} · ${esc(f.concepto || '')}</b><span>Saldo ${D.money(f._saldo)}${f._por_verificar ? ` · ${D.money(f._por_verificar)} por verificar` : ''}</span></div>${D.badge(f._estado)}</div>`).join('')}</div>` : '<p class="muted" style="margin:0">No hay facturas.</p>'}</div>
      </div>
      ${D.canRead('soporte') ? `<div class="card" style="margin-top:16px"><h2>Tus solicitudes <button class="btn sm" data-new="soporte">${D.icon('plus')} Nueva</button></h2>${tickets.length ? `<div class="list">${tickets.map(t => `<div class="item" data-open="soporte:${t.id}"><div class="t"><b>${esc(t.codigo)} · ${esc(t.asunto)}</b><span>${t._respuestas} mensajes · ${D.rel(t.creado)}</span></div>${D.badge(t.estado === 'Esperando cliente' ? 'Te respondimos' : t.estado, t.estado === 'Esperando cliente' ? 'ok' : undefined)}</div>`).join('')}</div>` : '<p class="muted" style="margin:0">No tienes solicitudes abiertas. Si necesitas un cambio, una duda o algo nuevo, pídelo aquí.</p>'}</div>` : ''}
      <div class="card" style="margin-top:16px"><h2>¿Necesitas algo?</h2><p style="margin:0">Escríbenos a <a href="#" data-mail="${esc(s.correo_soporte)}">${esc(s.correo_soporte)}</a> o a <a href="#" data-mail="${esc(s.correo_general)}">${esc(s.correo_general)}</a>. ${s.redes ? ` Síguenos en <b>${esc(s.redes)}</b>.` : ''} Stay delirious. ✦</p></div></div>`;
    el.querySelectorAll('[data-mail]').forEach(a => a.onclick = (e) => { e.preventDefault(); window.dos.openExternal('mailto:' + a.dataset.mail); });
    bindHome(el);
  }

  // ───────────── calendario ─────────────
  const cal = { y: new Date().getFullYear(), m: new Date().getMonth() };
  D.views.calendario = async (el) => {
    const first = new Date(cal.y, cal.m, 1); const start = new Date(first); start.setDate(1 - ((first.getDay() + 6) % 7));
    const days = Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
    const items = (await D.try(() => D.call('calendar', D.ymd(days[0]), D.ymd(days[41])))) || [];
    const by = {}; for (const it of items) { const s = it.fecha.slice(0, 10); const e = it.hasta || s; for (const d of days) { const k = D.ymd(d); if (k >= s && k <= e) (by[k] = by[k] || []).push(it); } }
    const t = D.today();
    el.innerHTML = `<div class="page">${pageHead('Calendario', D.SCHEMA.calendario.help, `<button class="btn" data-m="-1" aria-label="Mes anterior">${D.icon('left')}</button><button class="btn" data-m="0">Hoy</button><button class="btn" data-m="1" aria-label="Mes siguiente">${D.icon('right')}</button>${btnNew('calendario')}`)}
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px;flex-wrap:wrap"><h2 style="text-transform:capitalize">${D.MESES_LARGOS[cal.m]} ${cal.y}</h2>
      <div class="legend"><span><i style="background:var(--accent)"></i>Evento</span><span><i style="background:var(--info)"></i>Tarea</span><span><i style="background:var(--danger)"></i>Entrega</span><span><i style="background:var(--warn)"></i>Recordatorio</span><span><i style="background:var(--ok)"></i>Ausencia</span><span><i style="background:var(--lime)"></i>Publicación</span><span><i style="background:var(--text-2)"></i>Pieza / hito / cobro</span></div></div>
      <div class="cal">${['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d => `<div class="dow">${d}</div>`).join('')}
      ${days.map(d => { const k = D.ymd(d); const list = by[k] || []; return `<div class="day ${d.getMonth() !== cal.m ? 'out' : ''} ${k === t ? 'today' : ''}"><span class="n">${d.getDate()}</span>${list.slice(0, 4).map(it => `<div class="ev ${it.tipo}" data-open="${it.modulo}:${it.id}" title="${esc(it.tipo)}: ${esc(it.titulo)}${it.quien ? ' · ' + esc(it.quien) : ''}">${it.fecha.length > 10 && it.tipo !== 'Ausencia' ? `<span class="mono">${it.fecha.slice(11, 16)}</span> ` : ''}${esc(it.titulo)}</div>`).join('')}${list.length > 4 ? `<span class="small muted">+${list.length - 4} más</span>` : ''}</div>`; }).join('')}</div></div>`;
    el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { const v = Number(b.dataset.m); if (!v) { cal.y = new Date().getFullYear(); cal.m = new Date().getMonth(); } else { cal.m += v; if (cal.m < 0) { cal.m = 11; cal.y--; } if (cal.m > 11) { cal.m = 0; cal.y++; } } D.views.calendario(el); });
    bindHome(el);
  };

  // ───────────── reportes ─────────────
  let repYear = new Date().getFullYear();
  D.views.reportes = async (el) => {
    const r = await D.try(() => D.call('report', repYear)); if (!r) return;
    const max = Math.max(1, ...r.months.map(m => Math.max(m.ingresos + m.merch, m.gastos + m.nomina)));
    const M = ['E','F','M','A','M','J','J','A','S','O','N','D'];
    el.innerHTML = `<div class="page">${pageHead('Reportes', 'Ingresos cobrados (pagos verificados), ventas de merch pagadas, gastos aprobados, nómina pagada y rentabilidad por proyecto.', `<button class="btn" data-y="-1">${D.icon('left')}</button><b class="mono" style="padding:0 6px">${r.year}</b><button class="btn" data-y="1">${D.icon('right')}</button>`)}
      <div class="grid g5"><div class="kpi"><div class="label">Ingresos por servicios</div><div class="v">${D.money(r.totales.ingresos)}</div></div><div class="kpi"><div class="label">Ventas de merch</div><div class="v">${D.money(r.totales.merch)}</div></div><div class="kpi"><div class="label">Gastos</div><div class="v">${D.money(r.totales.gastos)}</div></div><div class="kpi"><div class="label">Nómina pagada</div><div class="v">${D.money(r.totales.nomina)}</div></div><div class="kpi ${r.totales.resultado < 0 ? 'alert' : ''}"><div class="label">Resultado</div><div class="v">${D.money(r.totales.resultado)}</div></div></div>
      <div class="card" style="margin-top:16px"><h2>Mes a mes</h2><div class="legend"><span><i style="background:var(--accent)"></i>Ingresos + merch</span><span><i style="background:var(--warn)"></i>Gastos + nómina</span></div>
        <div class="bars">${r.months.map((m, i) => `<div class="b" title="${D.MESES_LARGOS[i]}: ingresos ${D.money(m.ingresos)} · gastos ${D.money(m.gastos + m.nomina)}"><div class="pair"><i class="in" style="height:${(m.ingresos + m.merch) / max * 100}%"></i><i class="out" style="height:${(m.gastos + m.nomina) / max * 100}%"></i></div><span class="m">${M[i]}</span></div>`).join('')}</div>
        <div class="table-wrap" style="margin-top:14px"><table><thead><tr><th>Mes</th><th class="num">Ingresos</th><th class="num">Merch</th><th class="num">Gastos</th><th class="num">Nómina</th><th class="num">Resultado</th></tr></thead><tbody>${r.months.map((m, i) => `<tr><td style="text-transform:capitalize">${D.MESES_LARGOS[i]}</td><td class="num">${D.money(m.ingresos)}</td><td class="num">${D.money(m.merch)}</td><td class="num">${D.money(m.gastos)}</td><td class="num">${D.money(m.nomina)}</td><td class="num" style="${m.resultado < 0 ? 'color:var(--danger)' : ''}"><b>${D.money(m.resultado)}</b></td></tr>`).join('')}</tbody></table></div></div>
      <div class="card" style="margin-top:16px"><h2>Rentabilidad por proyecto</h2>${r.proyectos.length ? D.table([
        { key: 'nombre', label: 'Proyecto', render: p => `${esc(p.nombre)}<span class="sub">${esc(p.codigo)} · ${esc(p.cliente)}</span>` }, { key: 'precio', label: 'Precio', num: true, render: p => D.money(p.precio) },
        { key: 'cobrado', label: 'Cobrado', num: true, render: p => D.money(p.cobrado) }, { key: 'gastos', label: 'Gastos', num: true, render: p => D.money(p.gastos) },
        { key: 'horas', label: 'Horas', num: true, render: p => `${p.horas} h<span class="sub">${D.money(p.costo_horas)}</span>` }, { key: 'margen', label: 'Margen', num: true, render: p => `<b style="${p.margen < 0 ? 'color:var(--danger)' : ''}">${D.money(p.margen)}</b>` }], r.proyectos) : '<p class="muted">Sin proyectos.</p>'}</div></div>`;
    el.querySelectorAll('[data-y]').forEach(b => b.onclick = () => { repYear += Number(b.dataset.y); D.views.reportes(el); });
    el.querySelectorAll('tbody tr[data-id]').forEach(tr => tr.onclick = () => D.openRecord('proyectos', tr.dataset.id));
  };

  // ───────────── mapa de herramientas ─────────────
  const MAPA = [
    { area: 'Ya funciona en Delirium OS', estado: 'Activo', tone: 'ok', items: [
      ['Clientes (CRM) y prospección', 'Por contactar / contactados / actuales, temperatura (caliente, tibio, frío), tipo de cliente, tablero de ventas e historial', 'Zoho CRM, HubSpot Sales Hub, Pipedrive, Smartlead (clasificación)'],
      ['Kit de marca por cliente', 'Colores, tipografías, logos, tono de voz y link in bio en la ficha del cliente', 'Brandfolder, Frontify, WorkDrive'],
      ['Recordatorios', 'Notificaciones para no olvidar llamar, escribir o responder', 'Notificaciones para vendedores'],
      ['Catálogo y cotizaciones', 'Cotizaciones con PDF y conversión a proyecto y factura', 'Salesforce CPQ, Zoho Books, PandaDoc'],
      ['Soporte y solicitudes', 'El cliente pide desde su portal; el equipo responde, con notas internas y tiempos de respuesta', 'Zoho Desk, Odoo Helpdesk, HubSpot Service Hub'],
      ['Proyectos y tareas', 'Equipo, avance, disciplinas, tablero y rondas de cambios con órdenes de cambio', 'Zoho Projects, Monday, Pipedrive Projects, Codecks, HacknPlan (tareas)'],
      ['Piezas y aprobaciones', 'Versiones, revisión interna, aprobación del cliente, comentarios por segundo y contador de rondas', 'Frame.io, Filestage, Ziflow'],
      ['Calendario por persona', 'Eventos, tareas, entregas, publicaciones, hitos, cobros y ausencias', 'Zoho Calendar / ToDo'],
      ['Registro de horas y cronómetro', 'Horas por proyecto con cronómetro para medir rentabilidad', 'Tracker de tiempo, Zoho People (horas)'],
      ['Calendario de redes', 'Publicaciones por cliente con aprobación del cliente y resultados', 'Zoho Social, Metricool, Planable'],
      ['Campañas de anuncios', 'Presupuesto, gasto, resultados y alerta al 80% del presupuesto', 'Zoho Campaigns, Madgicx (alertas)'],
      ['Juegos', '6 etapas con pendientes, hitos, wishlists y tareas por disciplina', 'Codecks, HacknPlan'],
      ['Bugs y QA', 'Errores con gravedad, pasos, origen (Discord, Steam, playtest) y votos', 'Zoho BugTracker, HacknPlan QA'],
      ['Llaves y creadores', 'Carga masiva de llaves, asignación a streamers y seguimiento de cobertura', 'Keymailer, Lurkit (seguimiento)'],
      ['Facturas y portal de pagos', 'El cliente reporta Pago Móvil / Zelle y Finanzas verifica', 'Zoho Billing, Odoo Facturación, portal de pago Odoo'],
      ['Planes recurrentes y alquileres', 'Cobros mensuales y alquileres de bots o sistemas, facturados con un clic', 'Zoho Billing, Odoo Suscripciones, Odoo Alquiler'],
      ['Gastos con aprobación', 'Cada persona sube sus gastos; Finanzas aprueba', 'Odoo Gastos'],
      ['Reportes', 'Ingresos, merch, gastos, nómina y margen por proyecto', 'Zoho Analytics, control de equipos'],
      ['Merch: pedidos, stock y proveedores', 'Pedidos que descuentan stock al pagarse, alertas de stock bajo', 'Zoho Inventory, Odoo Compras, Shopify (pedidos)'],
      ['Personal, ausencias, nómina y reclutamiento', 'Fichas, vacaciones con aprobación, recibos y candidatos por etapa', 'Zoho People, Payroll, Recruit, Odoo RR.HH.'],
      ['Contratos, permisos y licencias', 'Contratos, autorizaciones de imagen y locación, permisos UGC, registros de marca y licencias con vencimiento', 'Zoho Contracts, Easy Release (registro), registro de licencias'],
      ['Manuales y procesos', 'Protocolos, plantillas legales y guías; algunos visibles para clientes', 'Zoho Learn, Odoo Conocimiento'],
      ['Roles y portal del cliente', '15 roles con permisos; el cliente ve y aprueba solo lo suyo', 'Accesos por capas, Zoho Directory'],
      ['Copias de seguridad', 'Copia diaria automática y exportación manual', '—'],
    ] },
    { area: 'Ya funciona · En línea y conexiones (se activan en Ajustes)', estado: 'Activo', tone: 'ok', items: [
      ['Trabajo en línea y tiempo real', 'Todo el equipo y los clientes desde cualquier PC, con los cambios al instante (Supabase gratis, sin dominio)', 'Servidores propios, Zoho One en la nube'],
      ['Archivos en la nube', 'Adjuntos guardados en Supabase Storage, con permisos por rol', 'Zoho WorkDrive (adjuntos)'],
      ['Actualizaciones automáticas', 'Cada PC se actualiza sola desde GitHub Releases, con verificación SHA-256', 'Instalar a mano cada versión'],
      ['Avisos en Discord', 'Solicitudes, aprobaciones, pagos y fallos llegan al canal del equipo', 'Zoho Cliq, Slack (avisos)'],
      ['Bugs desde Discord', 'Los reportes de la comunidad entran solos a Bugs y QA con sus votos', 'Codecks (Decky), MEE6'],
      ['Reportes de fallos propios', 'Los juegos y la app envían sus errores; se agrupan, cuentan y se reabren si vuelven', 'Sentry'],
      ['Meta Ads conectado', 'Gasto, alcance y resultados de las campañas de cada cliente, cada 3 horas', 'Zoho Social / Campaigns (anuncios), Madgicx (lectura)'],
      ['Formulario web', 'Formulario de contacto que crea clientes "Por contactar" y avisa al equipo', 'Zoho Forms, HubSpot Forms'],
    ] },
    { area: 'Nuevo en la 1.3', estado: 'Activo', tone: 'ok', items: [
      ['Firma electrónica', 'Contratos y cotizaciones firmados en la app o en el portal del cliente, con huella del documento y constancia en PDF', 'Zoho Sign, Easy Release, DocuSign'],
      ['Reporte mensual al cliente', 'PDF con proyectos, piezas aprobadas, publicaciones, anuncios y pagos del mes', 'Zoho Analytics (reportes a clientes), AgencyAnalytics'],
      ['Evaluaciones de desempeño', 'Puntaje por área, comentarios y respuesta de la persona', 'Zoho People (desempeño), Lattice'],
      ['Órdenes de compra', 'Pedidos a proveedores sugeridos por stock bajo; al recibir suben el stock y se registra el gasto', 'Zoho Inventory, Odoo Compras'],
      ['Bóveda de contraseñas', 'Accesos de clientes y del estudio cifrados con una clave maestra; ni la nube puede leerlos', '1Password, Bitwarden, Zoho Vault'],
      ['Tienda de merch online', 'Página pública gratis en GitHub Pages; los pedidos entran a Pedidos con precio y stock reales', 'Shopify, Zoho Commerce'],
      ['Métricas de jugadores', 'Jugadores por día, retención D1/D7, niveles donde se atascan, compras y eventos propios', 'GameAnalytics'],
      ['App en el celular y el navegador', 'Delirium OS en el teléfono o cualquier PC, instalable en la pantalla de inicio', 'Apps móviles de Zoho y HubSpot'],
      ['Copia diaria de la nube', 'La PC de Dirección guarda cada día una copia de todo lo que hay en Supabase', 'Respaldos de pago de Supabase'],
    ] },
    { area: 'Nuevo en la 1.4', estado: 'Activo', tone: 'ok', items: [
      ['Publicar en redes', 'Instagram, Facebook y TikTok publican solos a la hora programada, con reintentos y aviso si algo falla', 'Zoho Social, Metricool, Planable'],
      ['Métricas de redes', 'Alcance, vistas, interacciones, engagement, seguidores, audiencia y mejores publicaciones de la cuenta completa de cada cliente, cada 6 horas', 'Metricool, Zoho Social (reportes), AgencyAnalytics'],
      ['Vista completa del cliente', 'En la ficha del cliente: sus servicios, planes, redes y métricas, proyectos, calendario, anuncios, piezas, cobros, contratos y solicitudes', 'Zoho CRM (vista 360), HubSpot'],
      ['Servicios por cliente', 'Cada cliente marca los servicios del catálogo que tiene; el catálogo muestra quién tiene cada uno', 'Zoho CRM (productos por cuenta)'],
    ] },
    { area: 'Nuevo en la 1.5', estado: 'Activo', tone: 'ok', items: [
      ['Recorrido de bienvenida', 'La primera vez que alguien entra, un recorrido le muestra dónde está cada cosa según su rol', 'Capacitaciones en persona, WalkMe'],
      ['Guía y tutoriales', 'Qué hace cada sección, cómo se usa y videos cortos grabados del programa; botón ? en cada pantalla', 'Zoho Learn, Loom'],
    ] },
    { area: 'Nuevo en la 1.6', estado: 'Activo', tone: 'ok', items: [
      ['Reportes para clientes', 'PDF de resultados con todo lo del cliente, por período, con vista previa y todos los clientes de una vez', 'Metricool, Agency Analytics, Looker Studio'],
      ['Metas por cliente', 'Objetivos en redes con avance, ritmo y proyección calculados solos', 'Hojas de cálculo, Notion'],
      ['Mejor hora para publicar', 'Mapa de día y hora según cómo rindieron las publicaciones y cuándo están conectados los seguidores', 'Metricool, Later'],
      ['Bandeja de redes', 'Comentarios y mensajes de Instagram y Facebook de todos los clientes en un lugar, con respuesta directa', 'Meta Business Suite, Hootsuite Inbox'],
      ['Carga del equipo', 'Horas de trabajo de cada persona frente a su capacidad, con ausencias', 'Float, Resource Guru'],
      ['Varias monedas', 'Equivalentes en bolívares, euros, pesos, USDT y las que agregues, con tasas del día', 'Calculadoras de cambio'],
      ['Verificación en dos pasos', 'Código del teléfono al entrar, con códigos de respaldo; Dirección puede exigirla', 'Google Authenticator'],
    ] },
    { area: 'Nuevo en la 1.7', estado: 'Activo', tone: 'ok', items: [
      ['Hoy · prospección', 'Mensajes del día con meta diaria, plantillas para copiar, seguimientos a 3 y 7 días automáticos y embudo semanal', 'HubSpot Sales, Pipedrive'],
      ['Importar prospectos', 'CSV o Excel con mapeo de columnas, vista previa y duplicados por Instagram, teléfono, correo o nombre + ciudad', 'Importadores de CRM'],
      ['Bandeja de TikTok', 'Comentarios de TikTok junto a Instagram y Facebook, con respuesta y ocultar; alerta de comentarios negativos', 'Hootsuite Inbox, Sprout Social'],
      ['Horarios flexibles', 'Cada persona arma su horario de lunes a viernes en hora de Venezuela; quién trabaja ahora', 'Deputy, Homebase'],
      ['Invitaciones sin correo', 'Enlace de un solo uso para mandar por WhatsApp y restablecer contraseñas', 'Correos de invitación'],
      ['Plan gratis bajo control', 'Medidor de base de datos, archivos y tráfico, respaldo diario en la nube y anti-pausa', 'Panel de Supabase'],
      ['Reportar problema', 'Botón en cada pantalla que manda a Discord la pantalla, la versión y una captura sin datos privados', 'Sentry, Jam'],
      ['Competencia', 'Seguidores, interacciones y frecuencia de los competidores de cada cliente en Instagram', 'Metricool, Not Just Analytics'],
    ] },
    { area: 'Nuevo en la 1.8', estado: 'Activo', tone: 'ok', items: [
      ['Cobros internacionales', 'USD por defecto fuera de Venezuela; PayPal, Payoneer, Zelle, Binance y Pago Móvil con datos e instrucciones en la factura y el portal', 'PayPal Invoicing, Wave'],
      ['Sin pago, no se empieza', 'Un proyecto no pasa a "En curso" sin el adelanto verificado; solo el CEO puede saltarlo y queda registrado', 'Reglas manuales'],
      ['Prueba → plan mensual', 'Proyecto Prueba de 7 días; el día 5 avisa y genera la cotización del plan con la opción de 3 meses -10%', 'Plantillas de cotización'],
      ['Marca blanca por pieza', 'Planes por reel entregado, factura según lo entregado y portal/PDF sin la marca Delirium', 'Hojas de cálculo'],
      ['Zona horaria e idioma por cliente', 'Calendario y avisos en la hora del cliente (y la de Caracas); portal y documentos en español o inglés', 'Metricool, traducción manual'],
      ['Pagos por pieza, comisiones y margen', 'Pago al freelancer al aprobar (se habilita cuando el cliente paga), comisiones automáticas y margen por cliente', 'Excel, Gusto'],
      ['Seguridad del equipo', '2FA obligatoria para CEO, COO y Finanzas; alta y baja de freelancers con la lista de contraseñas a cambiar', 'Okta, 1Password'],
    ] },
    { area: 'Nuevo en la 1.10', estado: 'Activo', tone: 'ok', items: [
      ['Idiomas', 'La app del equipo en español, English y Português; cada persona elige el suyo y Dirección pone el del equipo', 'Traducción manual'],
      ['Instalador de Delirium', 'Ventana propia con el idioma de la PC, carpeta, accesos directos y progreso real', 'Instaladores genéricos'],
      ['App solo para el equipo', 'Los clientes usan su portal en la página web; la app de escritorio no los deja entrar', 'Accesos mezclados'],
    ] },
    { area: 'Nuevo en la 1.9', estado: 'Activo', tone: 'ok', items: [
      ['Bienvenida y acceso como socio', 'Formulario de marca en el portal (una vez) y guía para que el cliente nos agregue como socio en Meta, sin contraseñas', 'Typeform, Google Forms'],
      ['Kit de marca', 'Colores, tipografías, logos, ejemplos y prohibiciones de cada cliente, a un clic desde el proyecto o la pieza', 'Frontify, Notion'],
      ['Plan que se crea solo', 'Al renovar: factura automática y las piezas del mes con fechas y responsables por carga', 'Asana, ClickUp'],
      ['Guion para aprobar y lista de revisión', 'El cliente aprueba el guion antes de editar; sin la lista (9:16, subtítulos, música, logo…) no se envía al cliente', 'Frame.io, Filestage'],
      ['Banco de ideas', 'Ideas, tendencias, referencias y material por cliente; una idea se vuelve pieza con un clic', 'Notion, Milanote'],
      ['Atención en 24 h y respuestas guardadas', 'Aviso al responsable y a Dirección si un cliente espera más de 24 h hábiles; textos frecuentes ES/EN con variables', 'Front, Help Scout'],
      ['Avisos al celular', 'Web push gratis para aprobaciones, pagos, mensajes y bugs; cada persona elige los suyos', 'OneSignal, Pusher'],
      ['Retención', 'Cobranza escalonada con mensajes listos, pausa del servicio, clientes en riesgo, encuesta del 1 al 10 y caso de éxito', 'Baremetrics, Delighted'],
      ['Cierre ordenado y exportaciones', 'Baja con archivos, accesos, facturas y despedida; exportación completa o de un cliente', 'Checklists manuales'],
      ['Panel de la meta', 'Ingreso recurrente, falta para la meta, ingresos por línea, por cobrar, margen y caja (CEO, COO y Finanzas)', 'ProfitWell, Excel'],
    ] },
    { area: 'Todavía no está, y por qué', estado: 'Pendiente', tone: 'warn', items: [
      ['Correos automáticos', 'Invitaciones, recuperar contraseña y avisos por correo. Falta el dominio @staydelirious.com para enviar sin caer en spam', 'Zoho Mail, Campaigns'],
      ['TikTok Ads y Google Ads', 'Gasto y resultados como con Meta. Piden cuentas de anunciante aprobadas y, en Google, un proyecto de Google Cloud', 'TikTok Ads Manager, Google Ads'],
      ['YouTube', 'Programado pero apagado: Google Cloud no acepta Venezuela para crear el proyecto', 'YouTube Studio, Metricool'],
      ['Mensajes directos de TikTok', 'La API de TikTok para empresas solo da comentarios; los mensajes directos se responden desde su app', 'TikTok Business Center'],
      ['WhatsApp y chat web', 'Fuera por decisión del estudio por ahora', 'Zoho SalesIQ, WATI'],
    ] },
  ];
  D.views.mapa = async (el) => {
    el.innerHTML = `<div class="page">${pageHead('Mapa de herramientas', 'Qué partes del mapa de herramientas de Delirium ya funcionan aquí, y qué viene después. Cada módulo reemplaza apps que antes había que pagar por separado.')}
      ${MAPA.map(a => `<div class="tool-area"><h2 style="margin-bottom:10px">${esc(a.area)}</h2><div class="tool-grid">${a.items.map(([n, d, r]) => `<div class="tool"><b>${esc(n)}</b><span>${esc(d)}</span><div class="small muted" style="margin-top:6px">Reemplaza: ${esc(r)}</div>${D.badge(a.estado, a.tone)}</div>`).join('')}</div></div>`).join('')}</div>`;
  };

  // ───────────── actividad ─────────────
  let audQ = '';
  D.views.actividad = async (el) => {
    const rows = (await D.try(() => D.call('auditList'))) || [];
    const f = rows.filter(r => !audQ || `${r.usuario} ${r.accion} ${r.modulo} ${r.detalle}`.toLowerCase().includes(audQ.toLowerCase()));
    el.innerHTML = `<div class="page">${pageHead('Registro de actividad', 'Quién hizo qué y cuándo: entradas al sistema, creaciones, cambios, aprobaciones y borrados. Solo lo ve Dirección.')}
      <div class="toolbar"><input class="input" type="search" placeholder="Buscar por persona, módulo o detalle…" value="${esc(audQ)}" data-q></div>
      ${D.table([{ key: 'fecha', label: 'Fecha', render: r => D.datetime(r.fecha.replace('Z', '')) }, { key: 'usuario', label: 'Persona' }, { key: 'accion', label: 'Acción', render: r => D.badge(r.accion[0].toUpperCase() + r.accion.slice(1), r.accion === 'borrar' ? 'danger' : r.accion === 'crear' ? 'ok' : r.accion === 'aprobar' ? 'accent' : '') }, { key: 'modulo', label: 'Módulo', render: r => esc(modLabel(r.modulo) || r.modulo) }, { key: 'detalle', label: 'Detalle' }], f.slice(0, 400), { empty: D.empty('Sin actividad', 'Todavía no hay movimientos registrados.') })}
      <div class="count-line">Mostrando ${Math.min(400, f.length)} de ${rows.length} eventos</div></div>`;
    const q = el.querySelector('[data-q]'); q.oninput = () => { audQ = q.value; clearTimeout(q.t); q.t = setTimeout(() => D.views.actividad(el).then(() => { const n = el.querySelector('[data-q]'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }), 220); };
  };

  // ───────────── ajustes ─────────────
  D.views.ajustes = async (el) => {
    const s = D.settings; const info = (await window.dos.info()).data;
    const F = (key, label, type = 'text', extra = {}) => D.fieldHtml({ key, label, type, ...extra }, s);
    el.innerHTML = `<div class="page">${pageHead('Ajustes', 'Datos del estudio que salen en cotizaciones y facturas, valores por defecto y copias de seguridad.', `<button class="btn primary" data-save-s>${D.icon('check')} Guardar ajustes</button>`)}
      <div class="grid g2">
        <div class="card"><h2>Delirium Studios</h2><form class="form" data-s>${F('empresa', 'Nombre del estudio', 'text', { required: true })}${F('web', 'Web')}${F('redes', 'Usuario en redes')}${F('rif', 'RIF / ID fiscal')}${F('telefono', 'Teléfono', 'tel')}${F('direccion', 'Dirección', 'text', { full: true })}
          ${F('correo_general', 'Correo general', 'email')}${F('correo_soporte', 'Correo de soporte', 'email')}${F('correo_ventas', 'Correo de ventas', 'email')}${F('correo_prensa', 'Correo de prensa', 'email')}</form></div>
        <div class="card"><h2>Valores por defecto</h2><form class="form" data-s>${F('moneda', 'Moneda (código)')}${F('simbolo', 'Símbolo')}${F('impuesto_nombre', 'Nombre del impuesto')}${F('impuesto_pct', 'Impuesto por defecto (%)', 'pct')}
          ${F('rondas_incluidas_defecto', 'Rondas incluidas por defecto', 'number')}${F('costo_ronda_extra_defecto', 'Costo por ronda extra', 'money')}${F('stock_minimo_defecto', 'Aviso de stock mínimo', 'number')}
          <div class="field full"><label for="f_metodos">Métodos de pago (separados por coma)</label><input class="input" id="f_metodos" name="metodos_pago_txt" value="${esc((s.metodos_pago || []).join(', '))}"></div></form></div>
      </div>
      <div class="grid g2" style="margin-top:16px">
        <div class="card"><h2>Copias de seguridad</h2><p class="muted" style="margin-top:0">Delirium OS guarda una copia automática cada día (se conservan 30 días). También puedes exportar una copia completa para guardarla en otro lugar.</p>
          <div class="actions"><button class="btn" data-exp>${D.icon('download')} Exportar copia</button><button class="btn" data-imp>${D.icon('upload')} Restaurar copia</button><button class="btn ghost" data-folder>${D.icon('folder')} Abrir carpeta de datos</button></div></div>
        <div class="card"><h2>Acerca de</h2><dl class="kv"><dt>Programa</dt><dd>Delirium OS ${esc(info.version)}</dd><dt>Datos guardados en</dt><dd class="small mono">${esc(info.datos)}</dd><dt>Actualizaciones</dt><dd>Se activan cuando <b>staydelirious.com</b> esté en línea. Por ahora, instala la nueva versión encima de la actual: tus datos se conservan.</dd><dt>Contacto</dt><dd>${esc(s.correo_general)} · ${esc(s.web)}${s.redes ? ' · ' + esc(s.redes) : ''}</dd></dl></div>
      </div></div>`;
    el.querySelector('[data-save-s]').onclick = async () => {
      const vals = {}; for (const f of el.querySelectorAll('form[data-s]')) { const v = D.readForm(f); if (!v) return; Object.assign(vals, v); }
      vals.metodos_pago = String(vals.metodos_pago_txt || '').split(',').map(x => x.trim()).filter(Boolean); delete vals.metodos_pago_txt;
      const out = await D.try(() => D.call('action', 'ajustes.guardar', vals), 'Ajustes guardados.'); if (out) D.settings = out;
    };
    el.querySelector('[data-exp]').onclick = async () => { const r = await window.dos.exportBackup(); if (r.error) D.toast(r.error, 'error'); else if (r.data) D.toast('Copia exportada.'); };
    el.querySelector('[data-imp]').onclick = async () => { const r = await window.dos.importBackup(); if (r.error) D.toast(r.error, 'error'); else if (r.data) { D.toast('Copia restaurada. Vuelve a entrar.'); setTimeout(() => location.reload(), 900); } };
    el.querySelector('[data-folder]').onclick = () => window.dos.openData();
  };
})(window.DOS);
