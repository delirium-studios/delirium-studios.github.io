// Delirium OS 1.8 — cobros (métodos con instrucciones, sin pago no se empieza, Prueba → plan, marca blanca por pieza),
// zona horaria e idioma por cliente, pagos por pieza, comisiones, margen, 2FA obligatoria y alta/baja de freelancers.
(function (D) {
  const esc = D.esc;
  const canW = (k) => (D.meta.modules.find(m => m.key === k) || {}).level === 'W';
  const isClient = () => ['cliente', 'cliente_eq'].includes(D.me.rol);
  const users = () => (D.directory || []).map(p => ({ value: p.id, label: `${p.nombre} · ${p.rol_label}` }));
  const meter = (mod, despues, campos) => { const fs = (D.SCHEMA[mod] || {}).fields; if (!fs) return; let i = fs.findIndex(f => f.key === despues); for (const c of campos) { if (fs.some(f => f.key === c.key)) continue; fs.splice(i >= 0 ? ++i : fs.length, 0, c); } };
  const cliente = (id) => ((D.refsFull && D.refsFull.clientes) || []).find(c => c.id === id) || {};
  const ZONAS = ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Panama', 'Europe/Madrid', 'America/Caracas', 'America/Bogota', 'America/Mexico_City'];
  const ciudadZona = (z) => ({ 'America/New_York': 'Nueva York / Miami', 'America/Chicago': 'Houston / Chicago', 'America/Denver': 'Denver', 'America/Los_Angeles': 'Los Ángeles', 'America/Panama': 'Panamá', 'Europe/Madrid': 'Madrid', 'America/Caracas': 'Caracas', 'America/Bogota': 'Bogotá', 'America/Mexico_City': 'Ciudad de México' }[z] || z);

  // ═════════════════════ campos nuevos ═════════════════════
  meter('clientes', 'moneda', [
    { key: 'idioma', label: 'Idioma del cliente', type: 'select', options: [{ value: 'es', label: 'Español' }, { value: 'en', label: 'English' }], default: 'es', hint: 'Su portal, cotizaciones, facturas, contratos y reportes salen en este idioma.' },
    { key: 'sin_marca', label: 'Marca blanca: su portal y sus PDF sin la marca Delirium', type: 'checkbox' },
    { key: 'traido_por_tipo', label: 'Traído por', type: 'select', options: ['', 'Vendedor', 'Socio que recomienda', 'Cliente que recomendó'] },
    { key: 'traido_por', label: 'Vendedor', type: 'select', options: users, hint: 'Si lo trajo alguien del equipo.' },
    { key: 'traido_por_nombre', label: 'Nombre del socio o cliente que recomendó' },
    { key: 'comision_pct', label: 'Comisión (%) si es distinta a la de Ajustes', type: 'number', decimals: true },
  ]);
  const fz = ((D.SCHEMA.clientes || {}).fields || []).find(f => f.key === 'zona_horaria'); if (fz) { fz.options = ZONAS.map(z => ({ value: z, label: `${ciudadZona(z)} (${z})` })); fz.hint = 'El calendario de publicaciones, las entregas y los avisos usan la hora del cliente y muestran también la de Caracas.'; }
  meter('proyectos', 'estado', [
    { key: 'tipo_proyecto', label: 'Tipo', type: 'select', options: ['Proyecto', 'Prueba', 'Plan mensual', 'Marca blanca'], default: 'Proyecto', hint: 'Prueba: 4 reels en 7 días; el día 5 la app avisa para proponer el plan mensual.' },
    { key: 'adelanto_monto', label: 'Adelanto requerido para empezar', type: 'money', hint: 'Si lo dejas vacío: 50% del precio (100% en Prueba y Plan mensual). Sin el adelanto verificado no pasa a "En curso".' },
  ]);
  meter('piezas', 'asignado', [{ key: 'costo_produccion', label: 'Costo de producción (pago al freelancer)', type: 'money', hint: 'Al aprobarse queda un pago pendiente al freelancer, que se habilita cuando el cliente pagó ese mes.' }]);
  const fpl = ((D.SCHEMA.planes || {}).fields || []).find(f => f.key === 'tipo'); if (fpl && Array.isArray(fpl.options) && !fpl.options.includes('Marca blanca (por pieza)')) fpl.options.push('Marca blanca (por pieza)');
  meter('planes', 'monto', [{ key: 'reels_mes', label: 'Reels al mes (marca blanca)', type: 'number' }, { key: 'precio_reel', label: 'Precio por reel', type: 'money', hint: 'Se factura según lo entregado (piezas aprobadas del mes).' }]);

  // guardar con la regla "sin pago, no se empieza" (el CEO puede saltarla y queda registrado)
  D.guardar = async (key, vals) => {
    try { return await D.call('save', key, vals); }
    catch (e) {
      if (key === 'proyectos' && /^Sin pago/.test(e.message) && D.me.rol === 'founder') {
        const v = await D.modal({ title: 'Sin pago, no se empieza', body: `<p style="margin-top:0">${esc(e.message)}</p><p class="small muted">Como CEO puedes empezar igual. Quedará en el Registro de actividad.</p>${D.fieldHtml({ key: 'motivo', label: 'Motivo', required: true, full: true, placeholder: 'Ej.: cliente recurrente, paga el viernes' })}`, buttons: [{ label: 'Esperar el pago' }, { label: 'Empezar igual', kind: 'danger', value: (m) => D.readForm(m) }] });
        if (v) return D.call('save', key, { ...vals, saltar_adelanto: v.motivo });
      }
      throw e;
    }
  };

  // ═════════════════════ métodos de pago en factura y portal ═════════════════════
  const comoPagar = (r) => (r._metodos || []).length ? `<div class="section"><h3>${isClient() && D.me.idioma_cliente === 'en' ? 'How to pay' : 'Cómo pagar'}</h3>${r._metodos.map(m => `<div style="padding:8px 0;border-bottom:1px solid var(--border)"><b>${esc(m.metodo)}</b>${m.datos ? `<div class="mono small" style="white-space:pre-wrap;margin-top:2px">${esc(m.datos)}</div>` : ''}${m.instrucciones ? `<span class="sub" style="display:block">${esc(m.instrucciones)}</span>` : ''}</div>`).join('')}</div>` : '';
  const prevDetF = D.DETAIL.facturas;
  D.DETAIL.facturas = (r) => { const b = prevDetF ? prevDetF(r) : {}; const base = typeof b === 'string' ? { top: b } : b; return { ...base, bottom: `${base.bottom || ''}${comoPagar(r)}` }; };
  // PDF: idioma y marca blanca del cliente
  const conCtx = (fn, idDe) => async (r, ...rest) => { const c = isClient() ? { idioma: D.me.idioma_cliente, sin_marca: D.me.sin_marca } : cliente(idDe(r)); D._pdfCtx = { lang: c.idioma === 'en' ? 'en' : 'es', sinMarca: !!c.sin_marca }; try { return await fn(r, ...rest); } finally { D._pdfCtx = null; } };
  for (const [k, idDe] of [['pdfCotizacion', r => r.client_id], ['pdfFactura', r => r.client_id], ['pdfConstancia', r => r.client_id], ['pdfInforme', d => d.cliente && d.cliente.id], ['pdfReporte', d => d.client_id]]) if (D[k]) D[k] = conCtx(D[k], idDe);
  const prevPdfF = D.pdfFactura;
  D.pdfFactura = async (r) => { const ms = r._metodos || []; if (!ms.length) return prevPdfF(r); const notas = `${r.notas ? r.notas + '\n\n' : ''}${ms.map(m => `${m.metodo}${m.datos ? ': ' + m.datos : ''}${m.instrucciones ? '\n  ' + m.instrucciones : ''}`).join('\n')}`; return prevPdfF({ ...r, notas }); };
  const prevHtmlInf = D.htmlInforme;
  if (prevHtmlInf) D.htmlInforme = async (d, o = {}) => { const c = cliente(d.cliente && d.cliente.id); const sm = isClient() ? D.me.sin_marca : c.sin_marca; const dd = sm ? { ...d, estudio: { empresa: D.settings.marca_blanca_nombre || 'Estudio de producción' } } : d; const lang = (isClient() ? D.me.idioma_cliente : c.idioma) === 'en' ? 'en' : 'es'; const prev = D._pdfCtx; D._pdfCtx = { lang, sinMarca: !!sm }; try { return await prevHtmlInf(dd, o); } finally { D._pdfCtx = prev; } };

  // ═════════════════════ traducción al inglés (PDF y portal del cliente) ═════════════════════
  const EN = {
    'Cotización': 'Quote', 'Factura': 'Invoice', 'Recibo de pago': 'Payment receipt', 'Constancia de firma': 'Signature record', 'Reporte de resultados': 'Results report', 'Reporte mensual': 'Monthly report',
    'Para': 'Bill to', 'Proyecto': 'Project', 'Válida hasta': 'Valid until', 'Rondas de cambios incluidas': 'Revision rounds included', 'Descripción': 'Description', 'Cant.': 'Qty', 'Precio': 'Price', 'Subtotal': 'Subtotal', 'Descuento': 'Discount', 'Total': 'Total',
    'Condiciones': 'Terms', 'Concepto': 'Concept', 'Vence': 'Due', 'Pagos recibidos': 'Payments received', 'Saldo pendiente': 'Balance due', 'Datos de pago y condiciones': 'Payment details and terms', 'CANCELADA': 'PAID', 'Documento': 'Document', 'Partes': 'Parties', 'Tipo': 'Type', 'Inicio': 'Start', 'Cláusulas': 'Clauses',
    'Reporte para': 'Report for', 'Período': 'Period', 'Seguidores': 'Followers', 'Alcance': 'Reach', 'Interacciones': 'Engagements', 'Engagement': 'Engagement', 'Publicaciones': 'Posts', 'Vistas': 'Views', 'Lo más importante': 'Key takeaways',
    'Cuentas y resultados por red': 'Accounts and results by network', 'Evolución día a día': 'Day by day', 'Mejores publicaciones': 'Top posts', 'Formatos que mejor funcionan': 'Best performing formats', 'Audiencia': 'Audience', 'Mejor hora para publicar': 'Best time to post', 'Metas': 'Goals',
    'Próximas publicaciones (30 días)': 'Upcoming posts (30 days)', 'Campañas de anuncios': 'Ad campaigns', 'Proyectos y piezas': 'Projects and deliverables', 'Servicios y planes': 'Services and plans', 'Facturación y pagos': 'Billing and payments', 'Solicitudes': 'Requests', 'Notas del equipo': 'Notes from the team',
    'Inversión': 'Spend', 'Resultados': 'Results', 'Costo por resultado': 'Cost per result', 'Pagado en el período': 'Paid this period', 'Por pagar': 'Due', 'Fecha': 'Date', 'Método': 'Method', 'Monto': 'Amount', 'Estado': 'Status', 'Cuenta': 'Account', 'Crecimiento': 'Growth', 'Publicación': 'Post', 'Formato': 'Format', 'Redes': 'Networks', 'Entrega': 'Delivery', 'Avance': 'Progress', 'Plan': 'Plan', 'Frecuencia': 'Frequency', 'Próximo cobro': 'Next charge',
    'Me gusta': 'Likes', 'Comentarios': 'Comments', 'Compartidos': 'Shares', 'Guardados': 'Saves', 'Visitas al perfil': 'Profile visits', 'Seguidores nuevos': 'New followers', 'Dejaron de seguir': 'Unfollows', 'Edad': 'Age', 'Género': 'Gender', 'Países': 'Countries', 'Ciudades': 'Cities', 'Mujeres': 'Women', 'Hombres': 'Men',
    // portal
    'Mi portal': 'My portal', 'Guía y tutoriales': 'Guide and tutorials', 'Soporte y solicitudes': 'Support and requests', 'Proyectos': 'Projects', 'Piezas y aprobaciones': 'Deliverables and approvals', 'Calendario de redes': 'Social calendar', 'Campañas de anuncios ': 'Ad campaigns', 'Métricas de redes': 'Social metrics', 'Mis metas': 'My goals', 'Mis reportes': 'My reports', 'Redes conectadas': 'Connected accounts',
    'Facturas y pagos': 'Invoices and payments', 'Planes y alquileres': 'Plans', 'Contratos y permisos': 'Contracts', 'Manuales y procesos': 'Help articles', 'Cotizaciones': 'Quotes', 'Buscar': 'Search', 'Crear': 'New', 'Cerrar': 'Close', 'Guardar': 'Save', 'Cancelar': 'Cancel', 'Editar': 'Edit',
    'Aprobar': 'Approve', 'Pedir cambios': 'Request changes', 'Reportar pago': 'Report payment', 'Cómo pagar': 'How to pay', 'Nueva solicitud': 'New request', 'Esperan tu respuesta': 'Waiting for you', 'Revisión del cliente': 'Client review', 'Aprobada': 'Approved', 'Cambios pedidos': 'Changes requested',
    'En curso': 'In progress', 'Entregado': 'Delivered', 'Por iniciar': 'Not started', 'Publicado': 'Published', 'Programado': 'Scheduled', 'Por aprobar': 'Awaiting approval', 'Por cancelar': 'Unpaid', 'Abono parcial': 'Partially paid', 'Cancelada ': 'Paid', 'Vencida': 'Overdue',
    'Tus proyectos': 'Your projects', 'Tus solicitudes': 'Your requests', 'Pedir algo al equipo': 'Ask the team', 'No hay cotizaciones.': 'No quotes.', 'No hay facturas.': 'No invoices.', '¿Necesitas algo?': 'Need anything?', 'No tienes proyectos activos en este momento.': 'You have no active projects right now.',
    'Rondas de cambios:': 'Revision rounds:', 'Cliente': 'Client', 'Detalle': 'Details', 'Pagos': 'Payments', 'Contrato · firma pendiente': 'Contract · signature pending', 'Nueva': 'New', 'Nuevo': 'New', 'Pieza': 'Deliverable', 'Hoy': 'Today', 'Tarea': 'Task', 'Evento': 'Event',
    'Revisar': 'Review', 'Ver': 'View', 'Responder': 'Reply', 'Enviar': 'Send', 'Comentario': 'Comment', 'Versión': 'Version', 'Mensajes': 'Messages', 'Archivos': 'Files', 'Fecha límite': 'Due date', 'Saldo': 'Balance', 'Pagado (verificado)': 'Paid (verified)',
    'Firmar': 'Sign', 'Descargar PDF': 'Download PDF', 'Vista previa': 'Preview', 'Ver video': 'Watch video', 'Abrir en Drive': 'Open in Drive', 'Cerrar sesión': 'Log out', 'Mi cuenta': 'My account', 'Mi reporte': 'My report',
  };
  const REGLAS = [[/^Hola, (.+)$/, 'Hi, $1'], [/^Bienvenido a tu portal de (.+?): aquí ves el avance de tus proyectos, apruebas piezas y publicaciones, y reportas pagos\.$/, 'Welcome to your $1 portal: track your projects, approve deliverables and posts, and report payments.'],
    [/^Entrega (.+)$/, 'Delivery $1'], [/^Avance (\d+%)$/, 'Progress $1'], [/^(\d+) de (\d+) usadas$/, '$1 of $2 used'], [/^Saldo (.+)$/, 'Balance $1'], [/^Publicación$/, 'Post']];
  const tr = (t) => { const k = t.trim(); if (EN[k]) return t.replace(k, EN[k]); for (const [re, en] of REGLAS) if (re.test(k)) return t.replace(k, k.replace(re, en)); return null; };
  D.traducirPdf = (html) => html.replace(/>([^<>]{1,60})</g, (m, t) => { const k = t.trim(); return EN[k] ? `>${t.replace(k, EN[k])}<` : m; });
  const traducirNodo = (root) => { const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const k = n.nodeValue.trim(); if (!k) continue; const t = tr(n.nodeValue); if (t !== null) n.nodeValue = t; } root.querySelectorAll && root.querySelectorAll('input[placeholder],textarea[placeholder],button[title]').forEach(e => { if (EN[e.placeholder]) e.placeholder = EN[e.placeholder]; if (EN[e.title]) e.title = EN[e.title]; }); };
  let obs = null;
  D.activarIdiomaPortal = () => {
    if (obs) { obs.disconnect(); obs = null; }
    if (!D.me || !isClient() || D.me.idioma_cliente !== 'en') { document.documentElement.lang = 'es'; return; }
    document.documentElement.lang = 'en'; traducirNodo(document.body);
    obs = new MutationObserver(ms => { for (const m of ms) for (const nd of m.addedNodes) { if (nd.nodeType === 1) traducirNodo(nd); else if (nd.nodeType === 3) { const t = tr(nd.nodeValue); if (t !== null) nd.nodeValue = t; } } });
    obs.observe(document.body, { childList: true, subtree: true });
  };
  // marca blanca en el portal
  D.aplicarMarcaBlanca = () => { const sm = D.me && isClient() && D.me.sin_marca; document.body.classList.toggle('marca-blanca', !!sm); if (sm) document.querySelectorAll('.brand b, .mobile-top b').forEach(b => { b.textContent = D.settings.marca_blanca_nombre || 'Portal'; }); };

  // ═════════════════════ zona horaria del cliente ═════════════════════
  const horaEn = (fecha, zonaOrigen, zonaDestino) => { // fecha "AAAA-MM-DDTHH:MM" de pared en zonaOrigen → texto en zonaDestino
    try { const guess = Date.parse(String(fecha).slice(0, 16) + ':00Z'); const p = (z) => Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: z, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).formatToParts(new Date(guess)).map(x => [x.type, x.value]));
      const o = p(zonaOrigen); const t = guess + (guess - Date.UTC(+o.year, +o.month - 1, +o.day, +o.hour % 24, +o.minute));
      return new Intl.DateTimeFormat('es-VE', { timeZone: zonaDestino, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(t)); } catch (e) { return ''; } };
  const prevDetR = D.DETAIL.redes;
  D.DETAIL.redes = (r) => { const b = prevDetR ? prevDetR(r) : {}; const base = typeof b === 'string' ? { top: b } : b; const z = (cliente(r.client_id) || {}).zona_horaria || (isClient() ? D.me.zona_cliente : '');
    if (!z || z === 'America/Caracas' || !r.fecha || String(r.fecha).length < 16) return base;
    return { ...base, top: `<div class="note" style="margin-bottom:12px">🕒 Sale a las <b>${esc(horaEn(r.fecha, z, z))}</b> hora de ${esc(ciudadZona(z))} · <b>${esc(horaEn(r.fecha, z, 'America/Caracas'))}</b> en Caracas.</div>${base.top || ''}` }; };
  const fr = ((D.SCHEMA.redes || {}).fields || []).find(f => f.key === 'fecha'); if (fr) fr.hint = 'En la hora del cliente si tiene zona horaria en su ficha (si no, hora de Caracas).';

  // ═════════════════════ proyecto: adelanto y prueba → plan ═════════════════════
  const prevDetP = D.DETAIL.proyectos;
  D.DETAIL.proyectos = (r) => { const b = prevDetP ? prevDetP(r) : {}; const base = typeof b === 'string' ? { top: b } : b; if (isClient()) return base;
    const extra = [];
    if (r.adelanto_saltado) extra.push(`<div class="note warn" style="margin-bottom:12px">Empezó sin adelanto verificado: lo decidió ${esc(r.adelanto_saltado.por)} el ${D.date(r.adelanto_saltado.fecha)}${r.adelanto_saltado.motivo ? ` (${esc(r.adelanto_saltado.motivo)})` : ''}.</div>`);
    if (r.tipo_proyecto === 'Prueba') extra.push(`<div class="note" style="margin-bottom:12px"><b>Prueba</b> · cierra el ${D.date(r.entrega)}. ${r.plan_propuesto ? `Plan propuesto: <b>${esc(r.plan_propuesto)}</b>.` : canW('cotizaciones') ? '<button class="btn sm violet" data-act="proponerPlan">Proponer plan mensual</button>' : ''}</div>`);
    return { ...base, top: extra.join('') + (base.top || '') }; };
  D.HANDLERS.proponerPlan = async (r) => { const q = await D.try(() => D.call('proponerPlan', r.id), 'Cotización del plan lista (incluye la opción de 3 meses con descuento).'); if (q) { D.closeAll(); D.go('cotizaciones'); setTimeout(() => D.openRecord('cotizaciones', q.id), 400); } };
  // planes de marca blanca
  const prevDetPl = D.DETAIL.planes;
  D.DETAIL.planes = (r) => { const b = prevDetPl ? prevDetPl(r) : {}; const base = typeof b === 'string' ? { top: b } : b; if (!/marca blanca/i.test(r.tipo || '')) return base;
    return { ...base, top: `<div class="grid g3" style="margin-bottom:14px"><div class="kpi"><div class="label">Entregados este mes</div><div class="v">${r._entregados_mes || 0}${r.reels_mes ? ` / ${r.reels_mes}` : ''}</div></div><div class="kpi"><div class="label">Precio por reel</div><div class="v">${D.money(r.precio_reel)}</div></div><div class="kpi"><div class="label">A facturar</div><div class="v">${D.money(r._a_facturar || 0)}</div></div></div>${canW('facturas') ? '<button class="btn violet" data-act="facturarEntregado" style="margin-bottom:12px">Facturar lo entregado</button>' : ''}${base.top || ''}` }; };
  D.HANDLERS.facturarEntregado = async (r) => { const v = await D.prompt('Facturar lo entregado', D.fieldHtml({ key: 'mes', label: 'Mes', required: true }, { mes: D.today().slice(0, 7) }), 'Crear factura'); if (!v) return; const f = await D.try(() => D.call('facturarEntregado', r.id, v.mes), 'Factura creada.'); if (f) { D.closeAll(); D.go('facturas'); setTimeout(() => D.openRecord('facturas', f.id), 400); } };

  // ═════════════════════ comisiones y pagos por pieza ═════════════════════
  D.views.pagos_equipo = async (el) => {
    const [pf, cm] = await Promise.all([D.try(() => D.call('pagosFreelance', {})), D.try(() => D.call('comisiones', {}))]); if (!pf || !cm) return;
    const fin = D.isAdmin() || D.me.rol === 'finanzas';
    el.innerHTML = `<div class="page">${D.pageHead('Comisiones y pagos por pieza', fin ? 'Lo que se le debe al equipo: pagos por pieza a freelancers (se habilitan cuando el cliente pagó ese mes) y comisiones de quien trajo cada cliente (solo sobre pagos verificados).' : 'Tus pagos por pieza y tus comisiones.')}
      <div class="grid g3" style="margin-bottom:16px"><div class="kpi ${pf.por_pagar ? 'alert' : ''}"><div class="label">Por pagar a freelancers</div><div class="v">${D.money(pf.por_pagar)}</div></div><div class="kpi"><div class="label">Esperando pago del cliente</div><div class="v">${D.money(pf.esperando)}</div></div><div class="kpi ${cm.por_pagar ? 'alert' : ''}"><div class="label">Comisiones por pagar</div><div class="v">${D.money(cm.por_pagar)}</div></div></div>
      <div class="card" style="margin-bottom:16px"><h2>Pagos por pieza</h2>${pf.lista.length ? D.table([{ key: 'pieza', label: 'Pieza', render: x => `${esc(x.pieza)}<span class="sub">${esc(x.cliente)} · ${esc(x.mes)}</span>` }, { key: 'freelancer', label: 'Freelancer' }, { key: 'monto', label: 'Monto', num: true, render: x => D.money(x.monto) }, { key: 'estado', label: 'Estado', render: x => `${D.badge(x.estado, x.estado === 'Pagado' ? 'ok' : x.estado === 'Por pagar' ? 'warn' : '')}${fin && x.estado !== 'Pagado' && (x.estado === 'Por pagar' || D.me.rol === 'founder') ? ` <button class="btn sm" data-pagar-pz="${esc(x.piece_id)}">Marcar pagado</button>` : ''}` }], pf.lista) : '<p class="muted">No hay piezas aprobadas con costo de producción.</p>'}</div>
      <div class="card"><h2>Comisiones</h2>${cm.lista.length ? D.table([{ key: 'cliente', label: 'Cliente', render: x => `${esc(x.cliente)}<span class="sub">${esc(x.factura)} · ${D.date(x.fecha)}</span>` }, { key: 'beneficiario', label: 'Para', render: x => `${esc(x.beneficiario)}<span class="sub">${esc(x.tipo)} · ${x.pct}%</span>` }, { key: 'monto', label: 'Comisión', num: true, render: x => `${D.money(x.monto)}<span class="sub">de ${D.money(x.base)}</span>` }, { key: 'estado', label: 'Estado', render: x => `${D.badge(x.estado, x.estado === 'Pagada' ? 'ok' : 'warn')}${fin && x.estado !== 'Pagada' ? ` <button class="btn sm" data-pagar-cm="${esc(x.pago_id)}">Marcar pagada</button>` : ''}` }], cm.lista) : '<p class="muted">Sin comisiones. Se calculan solas cuando un cliente tiene "Traído por" y paga.</p>'}
      <p class="small muted" style="margin-bottom:0">Vendedores: ${D.settings.comision_vendedor_pct}% durante los primeros ${D.settings.comision_meses} meses. Socios y clientes que recomiendan: ${D.settings.comision_socio_pct}% del primer mes. Se cambia en Ajustes → Cobros.</p></div></div>`;
    el.querySelectorAll('[data-pagar-pz]').forEach(b => b.onclick = async () => { if (await D.try(() => D.call('pagarFreelance', b.dataset.pagarPz), 'Pago registrado.')) D.views.pagos_equipo(el); });
    el.querySelectorAll('[data-pagar-cm]').forEach(b => b.onclick = async () => { if (await D.try(() => D.call('pagarComision', b.dataset.pagarCm), 'Comisión pagada.')) D.views.pagos_equipo(el); });
  };
  let MM = D.today().slice(0, 7);
  D.views.margen = async (el) => {
    const d = await D.try(() => D.call('margen', { mes: MM })); if (!d) return; const t = d.total;
    const meses = Array.from({ length: 12 }, (_, i) => { const x = new Date(); x.setDate(1); x.setMonth(x.getMonth() - i); return D.ymd(x).slice(0, 7); });
    el.innerHTML = `<div class="page">${D.pageHead('Margen por cliente', 'Lo cobrado (pagos verificados del mes) menos el costo de producción de las piezas aprobadas y las comisiones. Solo lo ven el CEO, el COO y Finanzas.', `<select class="input" data-mm style="width:auto">${meses.map(m => `<option ${m === MM ? 'selected' : ''}>${m}</option>`).join('')}</select>`)}
      <div class="grid g4" style="margin-bottom:16px"><div class="kpi"><div class="label">Cobrado</div><div class="v">${D.money(t.cobrado)}</div></div><div class="kpi"><div class="label">Producción</div><div class="v">${D.money(t.costo)}</div></div><div class="kpi"><div class="label">Comisiones</div><div class="v">${D.money(t.comision)}</div></div><div class="kpi ${t.margen < 0 ? 'alert' : ''}"><div class="label">Margen</div><div class="v">${D.money(t.margen)}</div><div class="s">${t.margen_pct !== null ? String(t.margen_pct).replace('.', ',') + '%' : '—'}</div></div></div>
      <div class="card">${d.filas.length ? D.table([{ key: 'cliente', label: 'Cliente' }, { key: 'cobrado', label: 'Cobrado', num: true, render: x => D.money(x.cobrado) }, { key: 'costo', label: 'Producción', num: true, render: x => D.money(x.costo) }, { key: 'comision', label: 'Comisiones', num: true, render: x => D.money(x.comision) }, { key: 'margen', label: 'Margen', num: true, render: x => `<b style="color:${x.margen < 0 ? 'var(--danger)' : 'inherit'}">${D.money(x.margen)}</b><span class="sub">${x.margen_pct !== null ? String(x.margen_pct).replace('.', ',') + '%' : ''}</span>` }], d.filas) : '<p class="muted">Sin movimientos este mes.</p>'}</div></div>`;
    el.querySelector('[data-mm]').onchange = (e) => { MM = e.target.value; D.views.margen(el); };
  };

  // ═════════════════════ alta y baja de freelancers ═════════════════════
  const prevActEq = D.ACTIONS.equipo;
  D.ACTIONS.equipo = (r) => `${prevActEq ? prevActEq(r) : ''}${canW('equipo') && r.activo && r.id !== D.me.id && r.rol !== 'founder' ? '<button class="btn danger" data-act="darBaja">Dar de baja</button>' : ''}`;
  D.HANDLERS.darBaja = async (r) => {
    if (!(await D.confirm('Dar de baja', `${esc(r.nombre)} pierde el acceso, sale de sus proyectos y sus tareas abiertas quedan sin responsable. Te diremos qué contraseñas de la bóveda cambiar.`, 'Dar de baja'))) return;
    const x = await D.try(() => D.call('bajaUsuario', r.id, {})); if (!x) return;
    await D.modal({ title: `Baja de ${r.nombre}: lista de pasos`, body: `<ul class="checklist">${x.pasos.map(p => `<li>✔ ${esc(p)}</li>`).join('')}</ul>${x.cambiar_contrasenas.length ? `<h3>Contraseñas a cambiar</h3><ul>${x.cambiar_contrasenas.map(v => `<li><b>${esc(v.nombre)}</b> ${esc(v.servicio || '')}</li>`).join('')}</ul>` : '<p class="muted">No tenía contraseñas de la bóveda compartidas.</p>'}<p class="small muted">Además: quítale el acceso a las carpetas de Drive y a las cuentas de los clientes donde lo hayas agregado (Meta Business Suite, TikTok).</p>`, buttons: [{ label: 'Listo', kind: 'primary', value: () => true }] });
    D.closeAll(); D.rerender();
  };
  const prevPA = D.PAGE_ACTIONS.equipo;
  D.PAGE_ACTIONS.equipo = () => `${prevPA ? prevPA() : ''}${canW('equipo') ? '<button class="btn" data-page-act="altaFreelancer">Alta de freelancer</button>' : ''}`;
  D.PAGE_HANDLERS.altaFreelancer = async () => {
    const v = await D.modal({ title: 'Alta de freelancer', body: `<p class="small muted" style="margin-top:0">Crea su acceso con fecha de vencimiento, lo suma al proyecto y te da la invitación para WhatsApp. Solo verá sus tareas y piezas.</p><div class="form">${D.fieldHtml({ key: 'nombre', label: 'Nombre', required: true })}${D.fieldHtml({ key: 'email', label: 'Correo', type: 'email', required: true })}${D.fieldHtml({ key: 'expira', label: 'Acceso hasta', type: 'date', required: true }, { expira: D.ymd(new Date(Date.now() + 60 * 864e5)) })}${D.fieldHtml({ key: 'proyecto', label: 'Proyecto', type: 'select', options: (D.refs.proyectos || []).map(p => ({ value: p.id, label: p.nombre })) })}</div>`, buttons: [{ label: 'Cancelar' }, { label: 'Dar de alta', kind: 'primary', value: (m) => D.readForm(m) }] });
    if (!v) return; const pw = Array.from(crypto.getRandomValues(new Uint8Array(14)), b => 'abcdefghjkmnpqrstuvwxyz23456789'[b % 31]).join('');
    const u = await D.try(() => D.call('save', 'equipo', { nombre: v.nombre, email: v.email, rol: 'freelancer', expira: v.expira, password: pw, puesto: 'Freelancer' })); if (!u) return;
    if (v.proyecto) { const p = await D.try(() => D.call('get', 'proyectos', v.proyecto)); if (p) await D.try(() => D.call('save', 'proyectos', { id: p.id, equipo: [...new Set([...(p.equipo || []), u.id])] })); }
    D.directory = await D.call('directory'); await D.HANDLERS.invitar(u);
    D.toast('Freelancer dado de alta. Lista: 1) invitación enviada, 2) compártele solo las contraseñas que necesite en la bóveda, 3) dale acceso a la carpeta de Drive del proyecto.'); D.rerender();
  };

  // ═════════════════════ Ajustes → Cobros, y roles con 2FA obligatoria ═════════════════════
  D.cobrosTab = (body, F) => {
    const s = D.settings; const lista = (s.metodos_info && s.metodos_info.length ? s.metodos_info : null) || [{ metodo: 'Zelle', monedas: ['USD'], instrucciones: 'Envía el pago al correo o teléfono indicado y reporta la referencia en tu portal.', activo: true }, { metodo: 'PayPal', monedas: ['USD', 'EUR'], instrucciones: 'Paga como "Amigos y familiares" o con la factura de PayPal.', activo: true }, { metodo: 'Payoneer', monedas: ['USD', 'EUR'], instrucciones: 'Paga con la solicitud de pago de Payoneer.', activo: true }, { metodo: 'Binance', monedas: ['USDT', 'USD'], instrucciones: 'Binance Pay o USDT por la red indicada.', activo: true }, { metodo: 'Pago Móvil', monedas: ['VES'], instrucciones: 'Al cambio del día.', activo: true }];
    body.innerHTML = `<div class="card"><h2>Métodos de pago</h2><p class="small muted" style="margin-top:0">El cliente ve en su factura y en su portal los métodos que aceptan su moneda, con estos datos e instrucciones. Los clientes fuera de Venezuela quedan en USD por defecto.</p>
      <div data-metodos>${lista.map((m, i) => `<div class="card" style="margin:10px 0;padding:12px" data-mi><div class="grid g3"><div class="field"><label>Método</label><input class="input" data-k="metodo" value="${esc(m.metodo)}"></div><div class="field"><label>Monedas (separadas por coma)</label><input class="input" data-k="monedas" value="${esc((m.monedas || []).join(', '))}"></div><div class="field"><label><input type="checkbox" data-k="activo" ${m.activo !== false ? 'checked' : ''}> Activo</label></div></div>
        <div class="grid g2"><div class="field"><label>Datos (correo, teléfono, cuenta…)</label><textarea class="input" rows="2" data-k="datos">${esc(m.datos || '')}</textarea></div><div class="field"><label>Instrucciones para el cliente</label><textarea class="input" rows="2" data-k="instrucciones">${esc(m.instrucciones || '')}</textarea></div></div></div>`).join('')}</div>
      <div style="display:flex;gap:8px"><button class="btn sm" data-mas-metodo>Agregar método</button><button class="btn primary" data-guardar-metodos>Guardar métodos</button></div></div>
      <div class="grid g2" style="margin-top:16px"><div class="card"><h2>Reglas de cobro</h2><form class="form" data-s>${F('adelanto_pct', 'Adelanto para empezar un proyecto (%)', 'number')}${F('precio_plan_mensual', 'Precio del plan mensual', 'money')}${F('reels_plan_mensual', 'Reels del plan mensual', 'number')}${F('descuento_3_meses', 'Descuento por 3 meses adelantados (%)', 'number')}</form><p class="small muted">Prueba y Plan mensual piden el 100% por adelantado. Solo el CEO puede empezar sin el adelanto verificado (queda registrado).</p></div>
        <div class="card"><h2>Comisiones y marca blanca</h2><form class="form" data-s>${F('comision_vendedor_pct', 'Comisión de vendedores (%)', 'number')}${F('comision_meses', 'Meses con comisión (vendedores)', 'number')}${F('comision_socio_pct', 'Comisión de socios y clientes que recomiendan (% del primer mes)', 'number')}${F('marca_blanca_nombre', 'Nombre que ven los clientes de marca blanca', 'text', { full: true })}</form></div></div>`;
    const leer = () => [...body.querySelectorAll('[data-mi]')].map(d => ({ metodo: d.querySelector('[data-k=metodo]').value.trim(), monedas: d.querySelector('[data-k=monedas]').value.split(',').map(x => x.trim().toUpperCase()).filter(Boolean), datos: d.querySelector('[data-k=datos]').value, instrucciones: d.querySelector('[data-k=instrucciones]').value, activo: d.querySelector('[data-k=activo]').checked })).filter(m => m.metodo);
    body.querySelector('[data-mas-metodo]').onclick = () => { D.settings = { ...D.settings, metodos_info: [...leer(), { metodo: 'Nuevo método', monedas: ['USD'], activo: true }] }; D.cobrosTab(body, F); };
    body.querySelector('[data-guardar-metodos]').onclick = async () => { if (await D.try(() => D.call('action', 'ajustes.guardar', { metodos_info: leer(), metodos_pago: [...new Set([...leer().map(m => m.metodo), 'Transferencia', 'Efectivo', 'Otro'])] }), 'Métodos guardados.')) D.settings = await D.call('settings'); };
  };
  const prevSeg = D.seguridadTab;
  D.seguridadTab = (body, F) => { prevSeg(body, F); const roles = D.settings.exigir_2fa_roles || ['founder', 'coo', 'finanzas']; const card = body.querySelector('.card');
    card.insertAdjacentHTML('beforeend', `<div class="field" style="margin-top:12px"><label>Obligatoria siempre para estos roles</label><div style="display:flex;gap:14px;flex-wrap:wrap" data-roles2fa>${Object.entries(D.meta.roles).filter(([k, r]) => r.staff).map(([k, r]) => `<label class="small"><input type="checkbox" value="${k}" ${roles.includes(k) ? 'checked' : ''}> ${esc(r.label)}</label>`).join('')}</div><button class="btn sm" data-guardar-roles2fa style="margin-top:8px">Guardar roles</button><span class="hint">Por defecto: CEO, COO y Finanzas.</span></div>`);
    body.querySelector('[data-guardar-roles2fa]').onclick = async () => { const sel = [...body.querySelectorAll('[data-roles2fa] input:checked')].map(i => i.value); if (await D.try(() => D.call('action', 'ajustes.guardar', { exigir_2fa_roles: sel }), 'Roles guardados.')) D.settings = await D.call('settings'); }; };

  // ═════════════════════ Inicio: avisos de cobro ═════════════════════
  const prevInicio = D.views.inicio;
  D.views.inicio = async (el) => { await prevInicio(el); const d = D._dash; if (!d || isClient()) { D.activarIdiomaPortal(); D.aplicarMarcaBlanca(); return; } const head = el.querySelector('.page-head'); if (!head) return;
    const notas = [];
    for (const p of d.pruebas_por_proponer || []) notas.push(`<div class="note" style="margin-bottom:10px">⏰ La prueba de <b>${esc(p.cliente)}</b> cierra el ${D.date(p.cierre)}: propón el plan mensual. <button class="btn sm violet" data-prop="${esc(p.id)}">Proponer plan</button></div>`);
    if (d.comisiones_por_pagar) notas.push(`<div class="note warn" style="margin-bottom:10px">Comisiones por pagar: <b>${D.money(d.comisiones_por_pagar)}</b>. <a href="#/pagos_equipo">Ver</a></div>`);
    if (d.freelance_por_pagar) notas.push(`<div class="note warn" style="margin-bottom:10px">Pagos por pieza habilitados para freelancers: <b>${D.money(d.freelance_por_pagar)}</b>. <a href="#/pagos_equipo">Ver</a></div>`);
    if (d.mis_pagos) notas.push(`<div class="note" style="margin-bottom:10px">Tus pagos por pieza: <b>${D.money(d.mis_pagos.por_pagar)}</b> por cobrar${d.mis_pagos.esperando ? ` y ${D.money(d.mis_pagos.esperando)} esperando el pago del cliente` : ''}.</div>`);
    if (d.mis_comisiones) notas.push(`<div class="note" style="margin-bottom:10px">Tus comisiones por cobrar: <b>${D.money(d.mis_comisiones)}</b>.</div>`);
    if (notas.length) head.insertAdjacentHTML('afterend', notas.join(''));
    el.querySelectorAll('[data-prop]').forEach(b => b.onclick = () => D.HANDLERS.proponerPlan({ id: b.dataset.prop }));
  };
  const prevRoute = window.addEventListener;
  window.addEventListener('hashchange', () => setTimeout(() => { if (D.me && isClient()) { D.activarIdiomaPortal(); D.aplicarMarcaBlanca(); } }, 50));
  void prevRoute;
})(window.DOS);
