// Delirium OS 1.9 — cuando un cliente entra, mientras se produce, atención, retención, cierre ordenado, panel de Dirección y exportaciones.
(function (D) {
  const esc = D.esc;
  const canW = (k) => (D.meta.modules.find(m => m.key === k) || {}).level === 'W';
  const canR = (k) => !!D.meta.modules.find(m => m.key === k);
  const isClient = () => ['cliente', 'cliente_eq'].includes(D.me.rol);
  const dir = () => ['founder', 'coo'].includes(D.me.rol);
  const meter = (mod, despues, campos) => { const fs = (D.SCHEMA[mod] || {}).fields; if (!fs) return; let i = fs.findIndex(f => f.key === despues); for (const c of campos) { if (fs.some(f => f.key === c.key)) continue; fs.splice(i >= 0 ? ++i : fs.length, 0, c); } };
  const ref = (k) => () => ((D.refs && D.refs[k]) || []).map(r => ({ value: r.id, label: r.nombre }));
  const copiar = async (t, msg = 'Copiado.') => { try { await navigator.clipboard.writeText(t); D.toast(msg); } catch (e) { D.toast('No se pudo copiar. Selecciona el texto y cópialo a mano.', 'error'); } };
  const bajar = (texto, nombre, tipo = 'application/json') => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([texto], { type: tipo })); a.download = nombre; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000); };
  const kpi = (l, v, cls = '', sub = '') => `<div class="kpi ${cls}"><div class="label">${esc(l)}</div><div class="v">${v}</div>${sub ? `<div class="small muted">${sub}</div>` : ''}</div>`;
  const nota = (html, cls = '') => `<div class="note ${cls}" style="margin-bottom:10px">${html}</div>`;

  // ═════════════════════ campos y estados nuevos ═════════════════════
  const scCli = D.SCHEMA.clientes || {};
  for (const arr of [scCli.filtro && scCli.filtro.values, scCli.board && scCli.board.values, ((scCli.fields || []).find(f => f.key === 'estado') || {}).options]) if (Array.isArray(arr) && !arr.includes('Antiguo cliente')) arr.push('Antiguo cliente');
  meter('clientes', 'idioma', [
    { key: 'aprobar_guion', label: 'El cliente aprueba el guion antes de editar', type: 'checkbox', hint: 'Las piezas nuevas pasan primero por "Guion para aprobar" y el cliente aprueba o comenta desde su portal.' },
    { key: 'marca_colores', label: 'Kit de marca · colores', placeholder: 'Ej.: #0B0B0D negro, #C9A227 dorado' },
    { key: 'marca_tipografias', label: 'Kit de marca · tipografías', placeholder: 'Ej.: Sora para títulos, Inter para textos' },
    { key: 'marca_logos', label: 'Kit de marca · logos (enlace de Drive)', full: true },
    { key: 'marca_tono', label: 'Kit de marca · tono de voz' },
    { key: 'marca_ejemplos', label: 'Kit de marca · ejemplos aprobados (enlaces)', type: 'textarea' },
    { key: 'marca_prohibiciones', label: 'Kit de marca · prohibiciones', type: 'textarea', hint: 'Lo que nunca se hace con esta marca. Lo ve todo el que trabaja en el cliente.' },
  ]);
  const scPz = D.SCHEMA.piezas || {}; const estPz = scPz.board && scPz.board.values; if (Array.isArray(estPz) && !estPz.includes('Guion para aprobar')) estPz.unshift('Guion para aprobar');
  if (scPz.filtro && scPz.filtro.values !== estPz && Array.isArray(scPz.filtro.values) && !scPz.filtro.values.includes('Guion para aprobar')) scPz.filtro.values.unshift('Guion para aprobar');
  meter('piezas', 'descripcion', [{ key: 'guion', label: 'Guion o idea', type: 'textarea', full: true, hint: 'Si el cliente aprueba guiones, lo lee en su portal antes de editar.' }]);
  meter('planes', 'monto', [
    { key: 'piezas_mes', label: 'Piezas al mes', type: 'number', default: 12, hint: 'Al renovarse el plan, la app crea estas piezas con fechas repartidas y responsables según la carga.' },
    { key: 'tipo_pieza', label: 'Tipo de pieza', default: 'Reel' },
    { key: 'costo_pieza', label: 'Costo de producción por pieza', type: 'money' },
    { key: 'piezas_auto', label: 'Crear las piezas solas al renovar', type: 'checkbox', default: true },
  ]);

  D.SCHEMA.ideas = {
    singular: 'idea', plural: 'ideas', nuevo: 'Nueva idea', help: 'Ideas de reels, tendencias, referencias y carpetas de material en bruto de cada cliente. Con un clic una idea se vuelve pieza.',
    vacio: ['Sin ideas todavía', 'Guarda aquí cada idea o tendencia que veas para un cliente, con el enlace de referencia y la carpeta del material.'],
    filtro: { key: 'estado', values: ['Nueva', 'Aprobada', 'Usada', 'Descartada'] },
    columns: [{ key: 'titulo', label: 'Idea', render: r => `${esc(r.titulo)}<span class="sub">${esc(r._cliente || '')}${(r.etiquetas || []).length ? ' · ' + (r.etiquetas || []).map(t => '#' + esc(t)).join(' ') : ''}</span>` }, { key: 'tipo', label: 'Tipo' }, { key: 'estado', label: 'Estado', render: r => D.badge(r.estado || 'Nueva') }],
    fields: [
      { key: 'titulo', label: 'Idea', required: true, full: true, placeholder: 'Ej.: Trend "antes y después" con la barra' },
      { key: 'client_id', label: 'Cliente', type: 'select', options: ref('clientes'), required: true },
      { key: 'tipo', label: 'Tipo', type: 'select', options: ['Video', 'Imagen', 'Carrusel', 'Story'], default: 'Video' },
      { key: 'estado', label: 'Estado', type: 'select', options: ['Nueva', 'Aprobada', 'Usada', 'Descartada'], default: 'Nueva' },
      { key: 'etiquetas', label: 'Etiquetas', type: 'multi', options: ['trend', 'reel', 'humor', 'producto', 'testimonio', 'detrás de cámaras', 'oferta', 'temporada'] },
      { key: 'referencia', label: 'Enlace de referencia', full: true, placeholder: 'https://www.tiktok.com/…' },
      { key: 'material', label: 'Carpeta del material en bruto (Drive)', full: true },
      { key: 'descripcion', label: 'Cómo sería', type: 'textarea' },
    ],
  };
  D.ACTIONS.ideas = (r) => !r.pieza_id && canW('ideas') && canW('piezas') ? '<button class="btn violet" data-act="ideaAPieza">Convertir en pieza</button>' : r.pieza_id ? '<button class="btn" data-act="verPiezaIdea">Ver la pieza</button>' : '';
  D.HANDLERS.ideaAPieza = async (r) => { const z = await D.try(() => D.call('ideaAPieza', r.id), 'Idea convertida en pieza.'); if (z) { D.closeAll(); D.openRecord('piezas', z.id); } };
  D.HANDLERS.verPiezaIdea = (r) => { D.closeAll(); D.openRecord('piezas', r.pieza_id); };

  D.SCHEMA.respuestas = {
    singular: 'respuesta', plural: 'respuestas', nuevo: 'Nueva respuesta', help: 'Textos frecuentes para el equipo, en español e inglés. Variables: {contacto}, {cliente}, {pieza}, {version}, {factura}, {monto}, {fecha}, {yo}, {estudio}. Se copian y se envían a mano.',
    vacio: ['Sin respuestas guardadas', 'Crea las base ("Ya estamos en ello", "Aquí está la versión 2", "Recordatorio de pago") con un clic.'],
    filtro: { key: 'idioma', values: ['es', 'en'] },
    columns: [{ key: 'titulo', label: 'Respuesta', render: r => `${esc(r.titulo)}<span class="sub">${esc(r.categoria || '')} · ${r.idioma === 'en' ? 'English' : 'Español'}</span>` }, { key: 'usos', label: 'Usos', num: true, render: r => String(r.usos || 0) }],
    fields: [
      { key: 'titulo', label: 'Nombre', required: true, full: true },
      { key: 'idioma', label: 'Idioma', type: 'select', options: [{ value: 'es', label: 'Español' }, { value: 'en', label: 'English' }], default: 'es' },
      { key: 'categoria', label: 'Categoría', type: 'select', options: ['Seguimiento', 'Entregas', 'Cobros', 'Bienvenida', 'Otro'], default: 'Seguimiento' },
      { key: 'texto', label: 'Texto', type: 'textarea', required: true, full: true, hint: 'Usa las variables entre llaves: {contacto}, {pieza}, {version}…' },
    ],
  };
  D.ACTIONS.respuestas = () => '<button class="btn violet" data-act="usarRespuesta">Copiar</button>';
  D.HANDLERS.usarRespuesta = async (r) => { const x = await D.try(() => D.call('aplicarRespuesta', r.id, {})); if (x) copiar(x.texto, x.faltan.length ? `Copiado. Completa: ${x.faltan.join(', ')}.` : 'Copiado.'); };
  const prevPAr = D.PAGE_ACTIONS.respuestas;
  D.PAGE_ACTIONS.respuestas = () => `${prevPAr ? prevPAr() : ''}${canW('respuestas') ? '<button class="btn" data-page-act="respuestasBase">Crear las básicas</button>' : ''}`;
  D.PAGE_HANDLERS.respuestasBase = async () => { const x = await D.try(() => D.call('crearRespuestasBase')); if (x) { D.toast(x.creadas ? `${x.creadas} respuestas creadas (español e inglés).` : 'Ya las tenías.'); D.rerender(); } };
  // elegir una respuesta con las variables de un caso concreto
  D.elegirRespuesta = async (vars = {}) => {
    const lista = await D.try(() => D.call('list', 'respuestas')); if (!lista) return null;
    if (!lista.length) { D.toast('Todavía no hay respuestas guardadas: créalas en Comercial → Respuestas guardadas.'); return null; }
    const id = await D.modal({ title: 'Respuestas guardadas', wide: true, body: `<div class="list">${lista.map(r => `<div class="item" data-r="${esc(r.id)}" style="cursor:pointer"><div class="t"><b>${esc(r.titulo)}</b><span>${esc(String(r.texto).slice(0, 110))}…</span></div>${D.badge(r.idioma === 'en' ? 'EN' : 'ES', 'info')}</div>`).join('')}</div>`, buttons: [{ label: 'Cerrar' }],
      onMount: (m, close) => m.querySelectorAll('[data-r]').forEach(x => x.onclick = () => close(x.dataset.r)) });
    if (!id) return null; const x = await D.try(() => D.call('aplicarRespuesta', id, vars)); return x ? x.texto : null;
  };
  // en las solicitudes: botón para usar una respuesta guardada en la caja de texto
  const prevMSop = D.MOUNT.soporte;
  D.MOUNT.soporte = (root, r) => { if (prevMSop) prevMSop(root, r); if (isClient() || !canR('respuestas')) return; const ta = root.querySelector('textarea'); if (!ta) return;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'btn sm'; b.style.margin = '6px 0'; b.textContent = 'Usar respuesta guardada';
    b.onclick = async () => { const t = await D.elegirRespuesta({ client_id: r.client_id }); if (t) { ta.value = t; ta.dispatchEvent(new Event('input')); ta.focus(); } };
    ta.insertAdjacentElement('beforebegin', b); };

  // ═════════════════════ ficha del cliente: bienvenida, acceso como socio, kit, cierre ═════════════════════
  const prevDetC = D.DETAIL.clientes;
  D.DETAIL.clientes = (r) => { const b = prevDetC ? prevDetC(r) : {}; const base = typeof b === 'string' ? { top: b } : b; if (isClient()) return base;
    const pct = r.bienvenida_pct || 0; const soc = (r.acceso_socio || {}).estado || 'Pendiente'; const out = [];
    if (r.estado === 'Antiguo cliente') out.push(nota(`<b>Antiguo cliente</b>${r.baja ? ` desde el ${D.date(r.baja.fecha)} · motivo: ${esc(r.baja.motivo)}` : ''}.`, 'warn'));
    if (r.servicio_pausado) out.push(nota(`<b>Servicio pausado</b> desde el ${D.date(r.servicio_pausado)}: no se crean piezas nuevas.`, 'warn'));
    if (r.estado === 'Actual' || r.bienvenida) out.push(`<div class="grid g3" style="margin-bottom:14px">${kpi('Bienvenida', `${pct}%`, pct < 100 ? 'alert' : '', pct < 100 ? 'Faltan datos del formulario' : 'Completa')}${kpi('Acceso como socio en Meta', esc(soc), soc === 'Listo' ? '' : 'alert')}${kpi('Aprueba guiones', r.aprobar_guion ? 'Sí' : 'No')}</div>`);
    return { ...base, top: out.join('') + (base.top || '') }; };
  const prevActC = D.ACTIONS.clientes;
  const opcionesCliente = (r) => { const b = [['verBienvenida', 'Formulario de bienvenida', 'Lo que el cliente nos contó de su marca'], ['kitCliente', 'Kit de marca', 'Colores, tipografías, logos y prohibiciones']];
    if (canW('clientes')) b.push(['accesoSocio', 'Acceso como socio en Meta', 'Pendiente, el cliente dice listo o verificado']);
    if (canR('metricas')) b.push(['casoExito', 'Caso de éxito', 'Página o PDF con antes y después, con o sin su nombre']);
    if (dir()) { if (r.servicio_pausado) b.push(['reanudarServicio', 'Reactivar el servicio', 'Vuelven a crearse sus piezas']); else if (r.estado === 'Actual') b.push(['pausarServicio', 'Pausar el servicio', 'Cuando no paga: no se crean piezas nuevas']);
      if (r.estado === 'Antiguo cliente') b.push(['reactivarCliente', 'Vuelve a ser cliente', 'Reabre su portal']); else if (r.estado === 'Actual') b.push(['cerrarCliente', 'Cerrar cliente', 'Archivos, accesos, facturas, motivo y despedida']);
      b.push(['exportarCliente', 'Exportar sus datos', 'Un archivo para entregarle si lo pide']); }
    else if (D.me.rol === 'ventas' && r.estado === 'Antiguo cliente') b.push(['reactivarCliente', 'Vuelve a ser cliente', 'Reabre su portal']);
    return b; };
  D.ACTIONS.clientes = (r) => { const p = prevActC ? prevActC(r) : ''; if (isClient()) return p; return `${p}<button class="btn violet" data-act="gestionCliente">Gestión del cliente</button>`; };
  D.HANDLERS.gestionCliente = async (r) => { const ops = opcionesCliente(r);
    const k = await D.modal({ title: r.nombre, body: `<div class="list">${ops.map(([a, t, d]) => `<div class="item" data-op="${a}" style="cursor:pointer" tabindex="0"><div class="t"><b class="${a === 'cerrarCliente' ? 'txt-danger' : ''}">${esc(t)}</b><span>${esc(d)}</span></div><span class="muted">›</span></div>`).join('')}</div>`, buttons: [{ label: 'Cerrar' }],
      onMount: (m, close) => m.querySelectorAll('[data-op]').forEach(x => { x.onclick = () => close(x.dataset.op); x.onkeydown = (e) => { if (e.key === 'Enter') close(x.dataset.op); }; }) });
    if (k && D.HANDLERS[k]) D.HANDLERS[k](r); };
  D.HANDLERS.verBienvenida = async (r) => {
    const cl = await D.try(() => D.call('get', 'clientes', r.id)); if (!cl) return; const bw = cl.bienvenida || {};
    const L = [['marca', 'Su marca'], ['tono', 'Tono'], ['publico', 'Público'], ['competidores', 'Competidores'], ['horarios', 'Horarios del negocio'], ['fotos', 'Fotos y material'], ['colores', 'Colores'], ['no_quiere', 'Lo que NO quiere ver'], ['accesos', 'Accesos']];
    const v = await D.modal({ title: `Bienvenida de ${r.nombre}`, wide: true, body: `<p class="small muted" style="margin-top:0">El cliente lo llena una vez desde su portal. ${bw.actualizada ? `Última edición: ${D.datetime(bw.actualizada)} por ${esc(bw.por || '')}.` : 'Todavía no lo llena.'}</p>
      <div class="form">${L.map(([k, l]) => D.fieldHtml({ key: k, label: l, type: 'textarea', full: true }, bw)).join('')}</div>`, buttons: canW('clientes') ? [{ label: 'Cerrar' }, { label: 'Guardar', kind: 'primary', value: (m) => D.readForm(m) }] : [{ label: 'Cerrar' }] });
    if (v && typeof v === 'object') { const x = await D.try(() => D.call('guardarBienvenida', v, r.id), 'Bienvenida guardada.'); if (x) { D.closeAll(); D.openRecord('clientes', r.id); } }
  };
  D.verKit = async (p) => {
    const k = await D.try(() => D.call('kitMarca', p)); if (!k) return; const fila = (l, v, link) => v ? `<dt>${l}</dt><dd>${link && /^https?:/.test(v) ? `<a href="#" data-ext="${esc(v)}">${esc(v)}</a>` : `<span style="white-space:pre-wrap">${esc(v)}</span>`}</dd>` : '';
    await D.modal({ title: `Kit de marca · ${k.cliente}`, wide: true, body: `${[k.colores, k.tipografias, k.logos, k.tono, k.ejemplos, k.prohibiciones, k.no_quiere].some(Boolean) ? `<dl class="kv">${fila('Colores', k.colores)}${fila('Tipografías', k.tipografias)}${fila('Logos', k.logos, true)}${fila('Tono', k.tono)}${fila('Ejemplos aprobados', k.ejemplos)}${fila('Prohibiciones', k.prohibiciones)}${fila('El cliente NO quiere ver', k.no_quiere)}</dl>${k.colores ? `<div style="display:flex;gap:8px;margin-top:12px">${(k.colores.match(/#[0-9a-f]{3,8}\b/gi) || []).map(c => `<span title="${esc(c)}" style="width:38px;height:38px;border-radius:10px;border:1px solid var(--line);background:${esc(c)}"></span>`).join('')}</div>` : ''}` : D.empty('Kit vacío', 'Pídele a Ventas o al PM que llene el kit de marca en la ficha del cliente.')}`, buttons: [{ label: 'Cerrar' }],
      onMount: (m) => m.querySelectorAll('[data-ext]').forEach(a => a.onclick = (e) => { e.preventDefault(); window.dos.openExternal(a.dataset.ext); }) });
  };
  D.HANDLERS.kitCliente = (r) => D.verKit({ client_id: r.id });
  D.HANDLERS.accesoSocio = async (r) => {
    const v = await D.prompt('Acceso como socio en Meta Business Suite', `<p class="small muted full" style="margin-top:0">El cliente agrega al estudio como socio (sin compartir contraseñas) siguiendo la guía de su portal. Cuando lo veas en Meta Business Suite → Configuración → Socios, márcalo como listo.</p>${D.fieldHtml({ key: 'estado', label: 'Estado', type: 'select', options: ['Pendiente', 'Cliente dice listo', 'Listo'], full: true }, { estado: (r.acceso_socio || {}).estado || 'Pendiente' })}`);
    if (v && await D.try(() => D.call('marcarAccesoSocio', v.estado, r.id), 'Estado guardado.')) { D.closeAll(); D.openRecord('clientes', r.id); }
  };
  D.HANDLERS.pausarServicio = async (r) => { if (!(await D.confirm('Pausar el servicio', `Los planes de <b>${esc(r.nombre)}</b> quedan en pausa y no se crean piezas nuevas hasta que lo reactives. Úsalo cuando el cliente no paga.`, 'Pausar'))) return; if (await D.try(() => D.call('pausarServicio', r.id, true), 'Servicio pausado.')) { D.closeAll(); D.rerender(); } };
  D.HANDLERS.reanudarServicio = async (r) => { if (await D.try(() => D.call('pausarServicio', r.id, false), 'Servicio reactivado.')) { D.closeAll(); D.rerender(); } };
  D.HANDLERS.reactivarCliente = async (r) => { if (await D.try(() => D.call('reactivarCliente', r.id), `${r.nombre} vuelve a ser cliente.`)) { D.closeAll(); D.rerender(); } };
  D.HANDLERS.exportarCliente = async (r) => { const x = await D.try(() => D.call('exportarCliente', r.id)); if (x) { bajar(JSON.stringify(x, null, 1), `datos-${String(r.nombre).replace(/[^\w-]+/g, '-')}-${D.today()}.json`); D.toast('Archivo listo. Sin costos internos ni notas internas: se le puede entregar al cliente.'); } };
  D.HANDLERS.cerrarCliente = async (r) => {
    const c = await D.try(() => D.call('prepararCierre', r.id)); if (!c) return;
    const lista = (t, items, fmt) => `<h3 style="margin:14px 0 6px">${t}</h3>${items.length ? `<ul class="pasos19">${items.map(x => `<li><label><input type="checkbox"> ${fmt(x)}</label></li>`).join('')}</ul>` : '<p class="small muted" style="margin:0">Nada pendiente.</p>'}`;
    const v = await D.modal({ title: `Cerrar a ${r.nombre}`, wide: true, body: `<p class="small muted" style="margin-top:0">Marca cada paso a medida que lo haces. Al final el cliente pasa a "Antiguo cliente" y puede volver cuando quiera.</p>
      ${lista('1 · Entregar los archivos finales', c.archivos, x => `${esc(x.titulo)}${x.enlace ? ` <span class="small muted">${esc(x.enlace)}</span>` : ''}`)}
      ${lista('2 · Quitar accesos', [...c.cuentas.map(x => `Meta / ${x.red}: ${x.nombre} (quitar al estudio como socio o desconectar)`), ...c.boveda.map(x => `Bóveda: ${x.nombre} (cambiar o borrar)`), ...c.usuarios.map(x => `Portal: ${x.nombre} · ${x.email}`)], x => esc(x))}
      ${lista('3 · Cerrar facturas pendientes', c.facturas, x => `${esc(x.codigo)} · saldo ${D.money(x.saldo)}`)}
      <h3 style="margin:14px 0 6px">4 · Mensaje de despedida</h3><textarea class="input" rows="4" data-desp style="width:100%">${esc(c.despedida)}</textarea><button class="btn sm" type="button" data-copiar-desp style="margin-top:6px">Copiar mensaje</button>
      <div class="form" style="margin-top:12px">${D.fieldHtml({ key: 'motivo', label: '5 · Motivo de la baja', type: 'select', options: ['', ...c.motivos], required: true })}${D.fieldHtml({ key: 'dias_portal', label: 'Días que el portal queda abierto para descargar', type: 'number' }, { dias_portal: 7 })}${D.fieldHtml({ key: 'nota', label: 'Nota interna', type: 'textarea', full: true })}${D.fieldHtml({ key: 'desconectar_redes', label: 'Desconectar sus redes de Delirium OS', type: 'checkbox' }, { desconectar_redes: true })}</div>`,
      buttons: [{ label: 'Cancelar' }, { label: 'Cerrar cliente', kind: 'danger', value: (m) => D.readForm(m) }],
      onMount: (m) => { m.querySelector('[data-copiar-desp]').onclick = () => copiar(m.querySelector('[data-desp]').value, 'Mensaje copiado. Envíalo tú por WhatsApp o correo.'); } });
    if (!v || typeof v !== 'object') return;
    if (await D.try(() => D.call('cerrarCliente', r.id, { ...v, dias_portal: Number(v.dias_portal || 0) }), `${r.nombre} pasó a "Antiguo cliente".`)) { D.closeAll(); D.rerender(); }
  };
  // caso de éxito (página o PDF)
  D.HANDLERS.casoExito = async (r) => {
    const v = await D.prompt('Caso de éxito', `${D.fieldHtml({ key: 'anonimo', label: 'Sin el nombre del cliente', type: 'checkbox', full: true })}<p class="small muted full" style="margin:0">Incluye métricas antes y después, las piezas destacadas y una frase del cliente solo si la aprobó en la encuesta.</p>`, 'Generar');
    if (!v) return; const d = await D.try(() => D.call('casoExito', r.id, { anonimo: !!v.anonimo })); if (!d) return;
    const fila = (l, a, b) => `<tr><td>${l}</td><td style="text-align:right">${a ?? '—'}</td><td style="text-align:right"><b>${b ?? '—'}</b></td></tr>`;
    const tabla = d.antes && d.despues ? `<table style="width:100%;border-collapse:collapse;margin:10px 0"><thead><tr><th style="text-align:left">Métrica</th><th style="text-align:right">Primer mes</th><th style="text-align:right">Últimos 30 días</th></tr></thead><tbody>${fila('Seguidores', D.num(d.antes.seguidores), D.num(d.despues.seguidores))}${fila('Alcance', D.num(d.antes.alcance), D.num(d.despues.alcance))}${fila('Interacciones', D.num(d.antes.interacciones), D.num(d.despues.interacciones))}${fila('Publicaciones', d.antes.publicaciones, d.despues.publicaciones)}</tbody></table>` : '<p class="small muted">Este cliente todavía no tiene redes conectadas: el caso sale sin métricas.</p>';
    const cuerpo = `<h2 style="margin:0 0 4px">${esc(d.nombre)}</h2>${tabla}${d.mejores.length ? `<h3>Publicaciones destacadas</h3><ul>${d.mejores.map(x => `<li>${esc(x.red)} · ${esc(x.texto || 'Publicación')} — ${D.num(x.interacciones)} interacciones</li>`).join('')}</ul>` : ''}${d.piezas.length ? `<h3>Piezas</h3><ul>${d.piezas.map(x => `<li>${esc(x.titulo)}</li>`).join('')}</ul>` : ''}${d.cita ? `<blockquote style="border-left:3px solid #7d39eb;margin:14px 0;padding:6px 14px;font-style:italic">“${esc(d.cita)}”</blockquote>` : ''}`;
    const ok = await D.modal({ title: 'Caso de éxito', wide: true, body: cuerpo, buttons: [{ label: 'Cerrar' }, { label: 'Descargar PDF', kind: 'primary', value: () => true }] });
    if (ok === true) { const a = await D._pdf.loadAssets(); const html = D._pdf.shell(a, { tipo: 'Caso de éxito', codigo: d.anonimo ? 'Anónimo' : d.nombre, fecha: D.today() }, cuerpo); await D.try(() => window.dos.pdf(html, `Caso de exito - ${d.nombre}`).then(x => { if (x.error) throw new Error(x.error); return x.data; })); }
  };

  // ═════════════════════ piezas: guion, lista de revisión y kit ═════════════════════
  const prevDetPz = D.DETAIL.piezas;
  D.DETAIL.piezas = (r) => { const b = prevDetPz ? prevDetPz(r) : {}; const base = typeof b === 'string' ? { top: b } : b; const top = [];
    if (r.estado === 'Guion para aprobar') top.push(nota(isClient() ? `<b>Tu aprobación:</b> lee el guion y apruébalo o pide cambios antes de que empecemos a editar.${r.guion ? `<div style="white-space:pre-wrap;margin-top:8px">${esc(r.guion)}</div>` : ''}` : '<b>Esperando que el cliente apruebe el guion</b> desde su portal.', 'warn'));
    let bottom = base.bottom || '';
    if (!isClient() && D.CHECK && !['Aprobada'].includes(r.estado)) { const items = (D.CHECK[r.tipo] || D.CHECK.Video || []); const hechos = r.checklist || {}; const n = items.filter(i => hechos[i]).length;
      bottom += `<div class="section"><h3>Lista de revisión antes de enviar al cliente · ${n}/${items.length}</h3><ul class="pasos19" data-checklist>${items.map(i => `<li><label><input type="checkbox" data-ck="${esc(i)}" ${hechos[i] ? 'checked' : ''} ${canW('piezas') ? '' : 'disabled'}> ${esc(i)}${hechos[i] ? ` <span class="small muted">· ${esc(hechos[i].por)}</span>` : ''}</label></li>`).join('')}</ul>${n < items.length && D.settings.checklist_obligatoria !== false ? '<p class="small muted" style="margin:6px 0 0">Sin la lista completa la pieza no pasa a "Revisión del cliente".</p>' : ''}</div>`; }
    return { ...base, top: top.join('') + (base.top || ''), bottom }; };
  const prevActPz = D.ACTIONS.piezas;
  D.ACTIONS.piezas = (r) => { const p = prevActPz ? prevActPz(r) : ''; let x = '';
    if (r.estado === 'Guion para aprobar' && (isClient() || canW('piezas'))) x += `${isClient() ? '' : ''}<button class="btn" data-act="guionCambios">Pedir cambios al guion</button><button class="btn violet" data-act="guionAprobar">Aprobar guion</button>`;
    if (!isClient()) x += '<button class="btn" data-act="kitPieza">Kit de marca</button>';
    return p + x; };
  D.HANDLERS.kitPieza = (r) => D.verKit({ piece_id: r.id });
  D.HANDLERS.guionAprobar = async (r) => { if (await D.try(() => D.call('decidirGuion', r.id, true, ''), 'Guion aprobado: pasa a producción.')) { D.closeAll(); D.rerender(); } };
  D.HANDLERS.guionCambios = async (r) => { const v = await D.prompt('Cambios al guion', D.fieldHtml({ key: 'nota', label: '¿Qué cambiarías?', type: 'textarea', required: true, full: true }), 'Enviar'); if (v && await D.try(() => D.call('decidirGuion', r.id, false, v.nota), 'Comentario enviado.')) { D.closeAll(); D.rerender(); } };
  const prevMPz = D.MOUNT.piezas;
  D.MOUNT.piezas = (root, r) => { if (prevMPz) prevMPz(root, r); root.querySelectorAll('[data-ck]').forEach(i => i.onchange = async () => { const x = await D.try(() => D.call('marcarChecklist', r.id, i.dataset.ck, i.checked)); if (!x) { i.checked = !i.checked; return; } if (x.completa) D.toast('Lista completa: ya puedes enviarla al cliente.'); }); };
  const prevActPr = D.ACTIONS.proyectos;
  D.ACTIONS.proyectos = (r) => `${prevActPr ? prevActPr(r) : ''}${isClient() ? '' : '<button class="btn" data-act="kitProyecto">Kit de marca</button>'}`;
  D.HANDLERS.kitProyecto = (r) => D.verKit({ project_id: r.id });
  // planes: crear las piezas del mes a mano (normalmente se crean solas al renovar)
  const prevActPl = D.ACTIONS.planes;
  D.ACTIONS.planes = (r) => `${prevActPl ? prevActPl(r) : ''}${!isClient() && canW('piezas') && r.estado === 'Activo' && !/marca blanca/i.test(r.tipo || '') ? '<button class="btn" data-act="piezasMes">Crear piezas del mes</button>' : ''}`;
  D.HANDLERS.piezasMes = async (r) => { const v = await D.prompt('Crear las piezas del mes', `${D.fieldHtml({ key: 'mes', label: 'Mes (AAAA-MM)', required: true }, { mes: D.today().slice(0, 7) })}<p class="small muted full" style="margin:0">${r.piezas_mes || 12} piezas con fechas repartidas en el mes y responsables según la carga del equipo.</p>`, 'Crear'); if (!v) return;
    const x = await D.try(() => D.call('generarPiezasPlan', r.id, v.mes)); if (x) { D.toast(`${x.creadas} piezas creadas.`); D.closeAll(); D.go('piezas'); } };

  // ═════════════════════ vistas nuevas ═════════════════════
  D.views.riesgo = async (el) => {
    const l = await D.try(() => D.call('riesgoClientes')); if (!l) return;
    el.innerHTML = `<div class="page">${D.pageHead('Clientes en riesgo', 'Puntaje por cliente según pagos atrasados, rondas de cambios agotadas, aprobaciones lentas, mensajes sin contestar, caída de interacciones y la encuesta. Solo lo ve Dirección; el cliente nunca lo ve.')}
      <div class="card">${l.length ? D.table([{ key: 'cliente', label: 'Cliente', render: x => `<a href="#" data-o="${esc(x.client_id)}">${esc(x.cliente)}</a>` }, { key: 'puntaje', label: 'Riesgo', num: true, render: x => `${x.puntaje} ${D.badge(x.nivel)}` }, { key: 'motivos', label: 'Por qué', render: x => x.motivos.map(esc).join('<br>') }, { key: 'accion', label: 'Qué hacer', render: x => `<b>${esc(x.accion)}</b>` }], l) : D.empty('Ningún cliente en riesgo', 'Todos al día: pagos, aprobaciones y mensajes.')}</div></div>`;
    el.querySelectorAll('[data-o]').forEach(a => a.onclick = (e) => { e.preventDefault(); D.openRecord('clientes', a.dataset.o); });
  };
  D.views.encuestas = async (el) => {
    const d = await D.try(() => D.call('resultadosEncuesta')); if (!d) return;
    el.innerHTML = `<div class="page">${D.pageHead('Encuestas (del 1 al 10)', 'Una pregunta al mes en el portal: "Del 1 al 10, ¿nos recomendarías?". Los que ponen 9 o 10 van a la lista para pedir referidos; 6 o menos avisa a Dirección.')}
      <div class="grid g3" style="margin-bottom:16px">${kpi('NPS', d.nps === null ? '—' : d.nps)}${kpi('Para pedir referidos', d.promotores.length)}${kpi('Con alerta (6 o menos)', d.detractores.length, d.detractores.length ? 'alert' : '')}</div>
      <div class="grid g2"><div class="card"><h2>Pedir referidos</h2>${d.promotores.length ? `<div class="list">${d.promotores.map(s => `<div class="item"><div class="t"><b>${esc(s.cliente)}</b><span>${s.puntaje}/10${s.comentario ? ' · ' + esc(s.comentario) : ''}</span></div><button class="btn sm" data-ref="${esc(s.cliente)}">Copiar mensaje</button></div>`).join('')}</div>` : '<p class="muted" style="margin:0">Todavía no hay promotores este mes.</p>'}</div>
      <div class="card"><h2>Todas las respuestas</h2>${D.table([{ key: 'cliente', label: 'Cliente' }, { key: 'puntaje', label: 'Nota', num: true, render: s => `<b>${s.puntaje}</b>` }, { key: 'comentario', label: 'Comentario', render: s => esc(s.comentario || '—') }, { key: 'mes', label: 'Mes' }], d.lista, { empty: '<p class="muted" style="margin:0">Sin respuestas todavía.</p>' })}</div></div></div>`;
    el.querySelectorAll('[data-ref]').forEach(b => b.onclick = () => copiar(`¡Hola! Nos alegra mucho que estés contento con el trabajo. ¿Conoces a otro negocio que pueda necesitar reels? Si nos recomiendas, te lo agradecemos con un beneficio en tu próximo mes. 🙌`, 'Mensaje copiado. Envíalo tú.'));
  };
  D.views.cobranza = async (el) => {
    const d = await D.try(() => D.call('cobranza')); if (!d) return;
    el.innerHTML = `<div class="page">${D.pageHead('Renovaciones y cobranza', 'Aviso 5 días antes de renovar, factura automática y recordatorios el día del vencimiento, a los 3 y a los 7 días con el mensaje listo para copiar. Los mensajes los envías tú (nada se manda solo).')}
      <div class="grid g3" style="margin-bottom:16px">${kpi('Planes que renuevan en 5 días', d.renovar.length)}${kpi('Recordatorios por enviar', d.recordatorios.length, d.recordatorios.length ? 'alert' : '')}${kpi('Se pueden pausar', d.recordatorios.filter(x => x.puede_pausar).length)}</div>
      <div class="card" style="margin-bottom:16px"><h2>Recordatorios de pago</h2>${d.recordatorios.length ? d.recordatorios.map(x => `<div class="card" style="margin:10px 0;padding:12px"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><div><b>${esc(x.cliente)}</b> · ${esc(x.codigo)} · ${D.money(x.saldo)} ${D.badge(x.etapa)}</div><div class="actions"><button class="btn sm" data-cp="${esc(x.factura_id)}">Copiar mensaje</button>${x.telefono ? `<button class="btn sm" data-wa="${esc(x.factura_id)}">WhatsApp</button>` : ''}${x.puede_pausar && dir() ? `<button class="btn sm danger" data-pausa="${esc(x.client_id)}">Pausar servicio</button>` : ''}</div></div><p class="small" style="margin:8px 0 0;white-space:pre-wrap">${esc(x.mensaje)}</p></div>`).join('') : D.empty('Nada por cobrar', 'Ninguna factura vence hoy ni está atrasada.')}</div>
      <div class="card"><h2>Renuevan pronto</h2>${D.table([{ key: 'nombre', label: 'Plan' }, { key: 'cliente', label: 'Cliente' }, { key: 'proximo_cobro', label: 'Renueva', render: x => D.date(x.proximo_cobro) }, { key: 'monto', label: 'Monto', num: true, render: x => D.money(x.monto) }], d.renovar, { empty: '<p class="muted" style="margin:0">Ningún plan renueva en los próximos 5 días.</p>' })}</div></div>`;
    const por = (id) => d.recordatorios.find(x => x.factura_id === id);
    el.querySelectorAll('[data-cp]').forEach(b => b.onclick = () => copiar(por(b.dataset.cp).mensaje, 'Mensaje copiado. Envíalo tú.'));
    el.querySelectorAll('[data-wa]').forEach(b => b.onclick = () => { const x = por(b.dataset.wa); window.dos.openExternal(`https://wa.me/${String(x.telefono).replace(/[^\d]/g, '')}?text=${encodeURIComponent(x.mensaje)}`); });
    el.querySelectorAll('[data-pausa]').forEach(b => b.onclick = () => D.HANDLERS.pausarServicio({ id: b.dataset.pausa, nombre: d.recordatorios.find(x => x.client_id === b.dataset.pausa).cliente }).then(() => D.views.cobranza(el)));
  };
  let PM = D.today().slice(0, 7);
  D.views.panel_meta = async (el) => {
    const d = await D.try(() => D.call('panelMeta', { mes: PM })); if (!d) return;
    const meses = Array.from({ length: 12 }, (_, i) => { const x = new Date(); x.setDate(1); x.setMonth(x.getMonth() - i); return D.ymd(x).slice(0, 7); });
    const maxL = Math.max(1, ...d.lineas.map(l => l.monto));
    el.innerHTML = `<div class="page">${D.pageHead('Panel de la meta', `Ingreso recurrente, lo que falta para la meta de ${D.money(d.meta)} al mes, ingresos por línea, cuentas por cobrar, margen y caja. Solo lo ven el CEO, el COO y Finanzas.`, `<select class="input" data-pm style="width:auto">${meses.map(m => `<option ${m === PM ? 'selected' : ''}>${m}</option>`).join('')}</select>`)}
      <div class="card" style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px"><h2 style="margin:0">Ingreso recurrente mensual</h2><span class="muted">${D.money(d.mrr)} de ${D.money(d.meta)} · faltan <b>${D.money(d.falta_mrr)}</b></span></div>
        <div class="meta-barra" style="margin-top:12px"><span style="width:${Math.min(100, d.avance_mrr)}%"></span></div><p class="small muted" style="margin:8px 0 0">${d.avance_mrr}% de la meta con los planes activos. Cobrado este mes: ${D.money(d.cobrado)} (faltan ${D.money(d.falta_mes)}).</p></div>
      <div class="grid g4" style="margin-bottom:16px">${kpi('Cobrado en el mes', D.money(d.cobrado))}${kpi('Por cobrar', D.money(d.por_cobrar), d.por_cobrar ? 'alert' : '')}${kpi('Salidas del mes', D.money(d.caja.salidas), '', `Gastos ${D.money(d.caja.gastos)} · nómina ${D.money(d.caja.nomina)} · freelancers ${D.money(d.caja.freelance)} · comisiones ${D.money(d.caja.comisiones)}`)}${kpi('Caja del mes', D.money(d.caja.neto), d.caja.neto < 0 ? 'alert' : '')}</div>
      <div class="grid g2"><div class="card"><h2>Ingresos por línea</h2>${d.lineas.map(l => `<div style="margin:10px 0"><div style="display:flex;justify-content:space-between"><span>${esc(l.linea)}</span><b>${D.money(l.monto)}</b></div><div class="meta-barra fina"><span style="width:${Math.round(l.monto / maxL * 100)}%"></span></div></div>`).join('')}</div>
      <div class="card"><h2>Margen por cliente</h2>${D.table([{ key: 'cliente', label: 'Cliente' }, { key: 'cobrado', label: 'Cobrado', num: true, render: x => D.money(x.cobrado) }, { key: 'margen', label: 'Margen', num: true, render: x => `${D.money(x.margen)}${x.margen_pct !== null ? ` <span class="small muted">${x.margen_pct}%</span>` : ''}` }], d.margen, { empty: '<p class="muted" style="margin:0">Sin cobros este mes.</p>' })}</div></div>
      ${d.riesgo.length ? `<div class="card" style="margin-top:16px"><h2>Clientes en riesgo</h2>${d.riesgo.map(x => `<div style="padding:6px 0">${D.badge(x.nivel)} <b>${esc(x.cliente)}</b> — ${esc(x.accion)}</div>`).join('')}</div>` : ''}</div>`;
    el.querySelector('[data-pm]').onchange = (e) => { PM = e.target.value; D.views.panel_meta(el); };
  };

  // ═════════════════════ carga: esta semana y la próxima, capacidad ═════════════════════
  const prevCarga = D.views.carga;
  D.views.carga = async (el) => { await prevCarga(el); const pg = el.querySelector('.page'); if (!pg) return; const d = await D.call('cargaSemanas').catch(() => null); if (!d || !d.personas) return;
    const celda = (s) => `<span class="${s.pasado ? 'txt-danger' : ''}">${s.piezas} pz · ${s.horas} h</span><span class="sub">tope ${s.tope_piezas} pz / ${s.horas_semana} h</span>`;
    pg.insertAdjacentHTML('beforeend', `<div class="card" style="margin-top:16px" data-semanas><h2>Esta semana y la próxima</h2>
      ${d.alertas.length ? nota(`⚠️ Pasan su capacidad: <b>${d.alertas.map(esc).join(', ')}</b>. Reparte piezas o mueve fechas.`, 'warn') : ''}
      ${d.capacidad ? nota(d.capacidad.caben > 0 ? `El equipo de producción tiene <b>${d.capacidad.horas_libres} h libres</b> en 4 semanas: caben <b>${d.capacidad.caben} cliente(s) más</b> (a ${d.capacidad.horas_por_cliente} h por cliente) antes de venderlos.` : `<b>El equipo está lleno:</b> antes de vender otro cliente, suma a alguien o libera horas.${d.capacidad.saturados.length ? ` Saturados: ${d.capacidad.saturados.map(esc).join(', ')}.` : ''}`, d.capacidad.caben > 0 ? '' : 'warn') : ''}
      ${D.table([{ key: 'nombre', label: 'Persona' }, { key: 's0', label: 'Esta semana', render: x => celda(x.semanas[0]) }, { key: 's1', label: 'Próxima semana', render: x => celda(x.semanas[1]) }], d.personas)}</div>`); };

  // ═════════════════════ Inicio ═════════════════════
  const prevInicio = D.views.inicio;
  D.views.inicio = async (el) => { await prevInicio(el); const d = D._dash || await D.call('dashboard').catch(() => null); if (!d) return; const head = el.querySelector('.page-head'); if (!head) return;
    if (isClient()) return D.portal19(el, head, d.portal19);
    const notas = [];
    if ((d.sin_respuesta || []).length) notas.push(nota(`💬 <b>${d.sin_respuesta.length} mensaje(s) de clientes llevan más de 24 h hábiles sin respuesta:</b> ${d.sin_respuesta.slice(0, 3).map(x => `${esc(x.cliente || '')} (${x.horas} h)`).join(', ')}. <a href="#/soporte">Responder</a>`, 'warn'));
    if ((d.riesgo || []).length) notas.push(nota(`📉 Clientes en riesgo: ${d.riesgo.map(x => `<b>${esc(x.cliente)}</b> — ${esc(x.accion.toLowerCase())}`).join('; ')}. <a href="#/riesgo">Ver</a>`, 'warn'));
    if (d.cobranza && (d.cobranza.recordatorios || d.cobranza.renovar)) notas.push(nota(`💳 ${d.cobranza.recordatorios ? `${d.cobranza.recordatorios} recordatorio(s) de pago por enviar` : ''}${d.cobranza.recordatorios && d.cobranza.renovar ? ' · ' : ''}${d.cobranza.renovar ? `${d.cobranza.renovar} plan(es) renuevan en 5 días` : ''}. <a href="#/cobranza">Ver</a>`));
    if ((d.bienvenida_incompleta || []).length) notas.push(nota(`📝 Bienvenida incompleta: ${d.bienvenida_incompleta.slice(0, 4).map(x => `<b>${esc(x.nombre)}</b> (${x.pct}%)`).join(', ')}. Recuérdales llenarla en su portal.`));
    if (d.guiones_esperando) notas.push(nota(`✍️ ${d.guiones_esperando} guion(es) esperando la aprobación del cliente. <a href="#/piezas">Ver</a>`));
    if (notas.length) head.insertAdjacentHTML('afterend', `<div data-avisos19>${notas.join('')}</div>`);
  };
  // portal del cliente: bienvenida, acceso como socio, guiones y encuesta
  D.portal19 = (el, head, p) => { if (!p) return; const en = D.me.idioma_cliente === 'en'; const out = [];
    if (p.encuesta) out.push(`<div class="card attention" style="margin-bottom:16px" data-encuesta><h2>Del 1 al 10, ¿nos recomendarías?</h2><div class="nps" style="display:flex;gap:6px;flex-wrap:wrap;margin:10px 0">${Array.from({ length: 10 }, (_, i) => `<button class="btn sm" data-nps="${i + 1}" style="min-width:38px">${i + 1}</button>`).join('')}</div>
      <textarea class="input" rows="2" data-nps-com placeholder="¿Algo que quieras contarnos? (opcional)" style="width:100%"></textarea><label class="small" style="display:block;margin:8px 0"><input type="checkbox" data-nps-cita> Pueden usar mi comentario como testimonio</label><button class="btn primary" data-nps-enviar disabled>Enviar</button></div>`);
    if (p.guiones.length) out.push(`<div class="card attention" style="margin-bottom:16px"><h2>Guiones para aprobar · ${p.guiones.length}</h2><div class="list">${p.guiones.map(g => `<div class="item" data-guion="${esc(g.id)}" style="cursor:pointer"><div class="t"><b>${esc(g.titulo)}</b><span>${esc(String(g.guion || '').slice(0, 90))}${g.fecha_limite ? ' · para el ' + D.date(g.fecha_limite) : ''}</span></div>${D.badge('Guion para aprobar')}</div>`).join('')}</div></div>`);
    if (p.pct < 100) out.push(`<div class="card" style="margin-bottom:16px" data-bienvenida><h2>Bienvenido a ${esc(p.estudio)} · cuéntanos de tu marca</h2><p class="muted" style="margin-top:0">Se llena una vez y nos ayuda a que cada reel suene a ti. Llevas ${p.pct}%. Nunca escribas contraseñas aquí.</p>
      <div class="meta-barra" style="margin-bottom:12px"><span style="width:${p.pct}%"></span></div><button class="btn primary" data-bw-abrir>${p.pct ? 'Seguir llenando' : 'Llenar el formulario'}</button> <span class="small muted">9 preguntas · unos 5 minutos</span></div>`);
    if (p.acceso_socio !== 'Listo') out.push(`<div class="card" style="margin-bottom:16px" data-socio><h2>Danos acceso sin compartir contraseñas</h2><p class="muted" style="margin-top:0">Estado: ${D.badge(p.acceso_socio)}</p><ol class="guide">
      <li class="guide-step"><span class="n">1</span><div>Entra a <strong>business.facebook.com</strong> con la cuenta dueña de tu página e Instagram.</div></li>
      <li class="guide-step"><span class="n">2</span><div>Ve a <strong>Configuración</strong> → <strong>Usuarios</strong> → <strong>Socios</strong> → <strong>Agregar</strong> → <strong>Dar acceso a un socio</strong>.</div></li>
      <li class="guide-step"><span class="n">3</span><div>Escribe el ID del negocio de ${esc(p.estudio)}: <strong class="mono">${esc(p.meta_business_id || 'te lo enviamos por WhatsApp')}</strong>${p.meta_business_id ? ` <button class="btn sm" data-copiar-bm>Copiar</button>` : ''}.</div></li>
      <li class="guide-step"><span class="n">4</span><div>Marca tu <strong>Página</strong> y tu <strong>cuenta de Instagram</strong> con permiso de contenido, mensajes y estadísticas. No hace falta darnos control total ni pagos.</div></li>
      <li class="guide-step"><span class="n">5</span><div>Pulsa <strong>Guardar</strong> y avísanos aquí:</div></li></ol>${p.acceso_socio === 'Pendiente' ? '<button class="btn violet" data-socio-listo>Ya los agregué como socio</button>' : '<p class="small muted" style="margin:0">Gracias. Lo estamos verificando.</p>'}</div>`);
    if (!out.length) return; head.insertAdjacentHTML('afterend', `<div data-portal19>${out.join('')}</div>`);
    let nps = 0; el.querySelectorAll('[data-nps]').forEach(b => b.onclick = () => { nps = Number(b.dataset.nps); el.querySelectorAll('[data-nps]').forEach(x => x.classList.toggle('primary', x === b)); el.querySelector('[data-nps-enviar]').disabled = false; });
    const ne = el.querySelector('[data-nps-enviar]'); if (ne) ne.onclick = async () => { if (await D.try(() => D.call('responderEncuesta', nps, el.querySelector('[data-nps-com]').value, el.querySelector('[data-nps-cita]').checked), en ? 'Thank you!' : '¡Gracias por responder!')) { D._dash = null; D.rerender(); } };
    el.querySelectorAll('[data-guion]').forEach(a => a.onclick = () => D.openRecord('piezas', a.dataset.guion));
    const bg = el.querySelector('[data-bw-abrir]'); if (bg) bg.onclick = async () => {
      const v = await D.modal({ title: 'Cuéntanos de tu marca', wide: true, body: `<p class="small muted" style="margin-top:0">Puedes guardar y seguir después. Nunca escribas contraseñas: para darnos acceso usa la guía de socio de Meta.</p><div class="form bw19">${p.campos.map(c => D.fieldHtml({ key: c.key, label: c.label, type: 'textarea' }, { [c.key]: c.valor })).join('')}</div>`,
        buttons: [{ label: 'Cancelar' }, { label: 'Guardar', kind: 'primary', value: (m) => D.readForm(m) }], onMount: (m) => m.querySelectorAll('textarea').forEach(t => { t.rows = 2; }) });
      if (!v || typeof v !== 'object') return; const x = await D.try(() => D.call('guardarBienvenida', v)); if (x) { D.toast(x.pct === 100 ? '¡Listo! Gracias por contarnos de tu marca.' : `Guardado (${x.pct}%).`); D._dash = null; D.rerender(); } };
    const sl = el.querySelector('[data-socio-listo]'); if (sl) sl.onclick = async () => { if (await D.try(() => D.call('marcarAccesoSocio'), 'Gracias: lo verificamos y te confirmamos.')) { D._dash = null; D.rerender(); } };
    const cb = el.querySelector('[data-copiar-bm]'); if (cb) cb.onclick = () => copiar(p.meta_business_id);
  };

  // ═════════════════════ avisos al celular (web push) ═════════════════════
  const b64aU8 = (s) => { const p = '='.repeat((4 - s.length % 4) % 4); const r = atob((s + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(r, c => c.charCodeAt(0)); };
  D.configurarAvisos = async () => {
    const prefs = await D.try(() => D.call('prefsAvisos')); if (!prefs) return;
    const web = !!(window.dos && window.dos.web); const soporta = web && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
    const ios = /iPhone|iPad/.test(navigator.userAgent); const instalada = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
    const OP = [['aprobaciones', 'Aprobaciones (piezas, guiones, publicaciones)'], ['pagos', 'Pagos y cobros'], ['mensajes', 'Mensajes y solicitudes de clientes'], ['bugs', 'Bugs y errores'], ['redes', 'Redes y bandeja']];
    const v = await D.modal({ title: 'Avisos al celular', body: `<p class="small muted" style="margin-top:0">Te llegan aunque la app esté cerrada. Elige cuáles quieres.</p>${OP.map(([k, l]) => `<label style="display:block;margin:6px 0"><input type="checkbox" data-pref="${k}" ${prefs.includes(k) ? 'checked' : ''}> ${l}</label>`).join('')}
      ${!web ? nota('En la app de escritorio los avisos salen en Windows mientras está abierta. Para recibirlos en el celular, abre la versión web desde el teléfono y actívalos ahí.') : !soporta ? nota(ios && !instalada ? 'En iPhone primero instala la app: en Safari toca <b>Compartir → Agregar a inicio</b>, ábrela desde el ícono y vuelve aquí.' : 'Este navegador no permite avisos. Prueba con Chrome en Android o la app instalada en iPhone.', 'warn') : ''}`,
      buttons: [{ label: 'Cancelar' }, ...(soporta ? [{ label: 'Activar en este celular', kind: 'violet', value: () => 'activar' }] : []), { label: 'Guardar', kind: 'primary', value: () => 'guardar' }],
      onMount: (m) => { D._prefsM = m; } });
    if (!v) return; const sel = [...D._prefsM.querySelectorAll('[data-pref]:checked')].map(i => i.dataset.pref); await D.try(() => D.call('prefsAvisos', sel));
    if (v !== 'activar') return D.toast('Preferencias guardadas.');
    try {
      if ((await Notification.requestPermission()) !== 'granted') return D.toast('No diste permiso para avisos. Puedes activarlo en los ajustes del navegador.', 'error');
      const clave = await D.call('clavePush'); const reg = await navigator.serviceWorker.ready;
      const sub = (await reg.pushManager.getSubscription()) || await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64aU8(clave.publica) });
      await D.call('guardarSuscripcionPush', { endpoint: sub.endpoint }); const t = await D.call('probarPush'); D.toast(t.enviados ? 'Listo: te enviamos un aviso de prueba.' : 'Activado. Si no ves el aviso de prueba, revisa los permisos del navegador.');
    } catch (e) { D.toast(`No se pudo activar: ${e.message}`, 'error'); }
  };

  // ═════════════════════ Ajustes → Atención y producción; exportar todo ═════════════════════
  D.atencionTab = (body, F) => {
    const s = D.settings; const ck = s.checklist_revision || D.CHECK || {}; const h = s.horario_atencion || { dias: [1, 2, 3, 4, 5], desde: 9, hasta: 18 };
    body.innerHTML = `<div class="grid g2"><div class="card"><h2>Meta y capacidad</h2><form class="form" data-s>${F('meta_mensual', 'Meta de ingresos al mes', 'money')}${F('horas_por_cliente', 'Horas de producción por cliente al mes', 'number')}${F('capacidad_piezas_semana', 'Piezas por persona a la semana (tope)', 'number')}${F('reels_plan_mensual', 'Piezas por plan mensual (por defecto)', 'number')}${D.fieldHtml({ key: 'facturar_auto', label: 'Facturar los planes solos al renovar', type: 'checkbox' }, s)}${D.fieldHtml({ key: 'checklist_obligatoria', label: 'Lista de revisión obligatoria antes de enviar al cliente', type: 'checkbox' }, s)}</form></div>
      <div class="card"><h2>Atención al cliente</h2><form class="form" data-s>${F('meta_business_id', 'ID del negocio del estudio en Meta Business Suite', 'text', { hint: 'Lo ven tus clientes en la guía para agregarlos como socio. No es secreto.' })}</form>
        <p class="small muted">Horario de atención (hora de Venezuela) para contar las 24 h sin respuesta:</p><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap" data-hor>${['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((x, i) => `<label class="small"><input type="checkbox" data-dia="${i}" ${h.dias.includes(i) ? 'checked' : ''}> ${x}</label>`).join('')}<input class="input" type="number" min="0" max="23" data-desde value="${h.desde}" style="width:70px"> a <input class="input" type="number" min="1" max="24" data-hasta value="${h.hasta}" style="width:70px"> h</div>
        <button class="btn sm" data-guardar-hor style="margin-top:10px">Guardar horario</button></div></div>
      <div class="card" style="margin-top:16px"><h2>Lista de revisión por tipo de pieza</h2><p class="small muted" style="margin-top:0">Un punto por línea. Sin la lista completa la pieza no pasa a "Revisión del cliente".</p><div class="grid g2">${Object.entries(ck).map(([t, l]) => `<div class="field"><label>${esc(t)}</label><textarea class="input" rows="7" data-ck-tipo="${esc(t)}">${esc(l.join('\n'))}</textarea></div>`).join('')}</div><button class="btn primary" data-guardar-ck>Guardar listas</button></div>`;
    body.querySelector('[data-guardar-hor]').onclick = async () => { const dias = [...body.querySelectorAll('[data-dia]:checked')].map(i => Number(i.dataset.dia)); const v = { dias, desde: Number(body.querySelector('[data-desde]').value), hasta: Number(body.querySelector('[data-hasta]').value) }; if (!(v.hasta > v.desde) || !dias.length) return D.toast('Revisa los días y las horas.', 'error'); if (await D.try(() => D.call('action', 'ajustes.guardar', { horario_atencion: v }), 'Horario guardado.')) D.settings = await D.call('settings'); };
    body.querySelector('[data-guardar-ck]').onclick = async () => { const out = {}; body.querySelectorAll('[data-ck-tipo]').forEach(t => { out[t.dataset.ckTipo] = t.value.split('\n').map(x => x.trim()).filter(Boolean); }); if (await D.try(() => D.call('action', 'ajustes.guardar', { checklist_revision: out }), 'Listas guardadas.')) { D.settings = await D.call('settings'); D.CHECK = D.settings.checklist_revision || D.CHECK; } };
  };
  D.exportarCard = (body) => { if (D.me.rol !== 'founder') return;
    body.insertAdjacentHTML('beforeend', `<div class="card" style="margin-top:16px"><h2>Exportar todos los datos</h2><p class="muted" style="margin-top:0">Un solo archivo con toda la base de datos, la lista de archivos guardados y todos los enlaces (Drive, referencias, contratos). Para tenerlo aparte o mudarte. Guárdalo en un lugar seguro: incluye datos de clientes y del equipo.</p><button class="btn violet" data-exportar-todo>Exportar todo</button> <span class="small muted">Para un solo cliente: ábrelo y pulsa "Exportar sus datos".</span></div>`);
    body.querySelector('[data-exportar-todo]').onclick = async (e) => { e.target.disabled = true; const t = await D.try(() => D.call('exportarTodo')); e.target.disabled = false; if (t) { bajar(t, `delirium-os-todo-${D.today()}.json`); D.toast('Exportación lista.'); } };
  };

  // la lista de revisión llega con los ajustes
  const base = { Video: ['Formato vertical 9:16', 'Duración correcta', 'Subtítulos', 'Música con licencia registrada', 'Logo correcto', 'Ortografía revisada', 'Portada'], Imagen: ['Medidas correctas', 'Logo correcto', 'Ortografía revisada', 'Colores de la marca'] };
  D.CHECK = base; const prevStart = D._start; if (prevStart) D._start = async (...a) => { const r = await prevStart(...a); if (D.settings && D.settings.checklist_revision) D.CHECK = D.settings.checklist_revision; return r; };
  setTimeout(() => { if (D.settings && D.settings.checklist_revision) D.CHECK = D.settings.checklist_revision; }, 1500);
})(window.DOS);
