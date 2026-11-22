// Delirium OS — utilidades de interfaz (formato, íconos, avisos, paneles, formularios, tablas).
window.DOS = window.DOS || {};
(function (D) {
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  D.esc = esc;

  // ───── llamadas al proceso principal ─────
  D.call = async (method, ...args) => {
    const r = await window.dos.call(method, ...args);
    if (r && r.error) { const e = new Error(r.error); e.code = r.code; throw e; }
    return r ? r.data : null;
  };
  D.try = async (fn, okMsg) => {
    try { const r = await fn(); if (okMsg) D.toast(okMsg); return r; }
    catch (e) { D.toast(e.message || 'Algo salió mal.', 'error'); if (e.code === 'ACCESS' && /sesión/.test(e.message)) location.reload(); return undefined; }
  };

  // ───── formato ─────
  const MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  D.MESES_LARGOS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  D.ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  D.today = () => D.ymd(new Date());
  const local = (v) => { const s = String(v); if (/T.*(Z|[+-]\d\d:\d\d)$/.test(s)) { const t = new Date(s); if (!isNaN(t)) return `${D.ymd(t)}T${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}`; } return s; };
  D.date = (v) => { if (!v) return '—'; const [y, m, d] = local(v).slice(0, 10).split('-'); return `${Number(d)} ${MESES[Number(m) - 1]} ${y}`; };
  D.datetime = (v) => { if (!v) return '—'; const s = local(v); const t = s.length > 10 ? s.slice(11, 16) : ''; return `${D.date(s)}${t ? ' · ' + t : ''}`; };
  D.money = (n) => { const s = D.settings || {}; const v = Number(n || 0); return `${s.simbolo || '$'}${v.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; };
  D.num = (n) => Number(n || 0).toLocaleString('es-VE');
  D.days = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5) + 1;
  D.rel = (v) => {
    if (!v) return ''; const d = Math.round((new Date(local(v).slice(0, 10)) - new Date(D.today())) / 864e5);
    if (d === 0) return 'hoy'; if (d === 1) return 'mañana'; if (d === -1) return 'ayer';
    return d > 0 ? `en ${d} días` : `hace ${-d} días`;
  };
  D.pl = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  D.initials = (n) => String(n || '?').replace(/\(.*?\)/g, '').trim().split(/\s+/).slice(0, 2).map(x => x[0]).join('').toUpperCase();

  // ───── estados con color + texto (nunca solo color) ─────
  const TONES = {
    ok: ['Hecha','Cancelada','Aprobada','Aprobado','Verificado','Entregado','Actual','Aceptada','Firmado','Activo','Pagado','Entrada','Ajuste (+)','Resuelto','Publicado','Arreglado','Cubierta','Canjeada','Contratado','Terminada','Caliente','Disponible'],
    info: ['En curso','Contactado','Enviada','Enviado','Por verificar','Propuesta enviada','Abono parcial','Por iniciar','En atención','Revisión interna','Programado','Activa','Confirmado','En arreglo','Entrevista','Prueba técnica','Oferta','Tibio','Planeada','En producción','Verificado','Media'],
    warn: ['En revisión','Pendiente','Borrador','Por hacer','Pausado','De permiso','Por cobrar','Alta','Por cancelar','Por contactar','Salida','Ajuste (−)','Nuevo','Esperando cliente','Revisión del cliente','Cambios pedidos','Por aprobar','En diseño','Recibido','Pausada','Por renovar','Frío'],
    danger: ['Vencida','Vencido','Rechazada','Rechazado','Cancelado','Anulada','Inactivo','Urgente','Bloqueante','Descartado','No se arregla','Sin respuesta'],
  };
  D.tone = (s) => { for (const [t, arr] of Object.entries(TONES)) if (arr.includes(s)) return t; return ''; };
  D.badge = (s, tone) => s ? `<span class="badge ${tone ?? D.tone(s)}">${esc(s)}</span>` : '<span class="muted">—</span>';

  // ───── íconos (trazos simples) ─────
  const P = {
    inicio: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',
    clientes: 'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 19v-1a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8',
    recordatorios: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
    cotizaciones: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',
    catalogo: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
    proyectos: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    tareas: 'M9 11l3 3 8-8M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9',
    calendario: 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18',
    horas: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
    facturas: 'M4 2v20l3-2 3 2 3-2 3 2 3-2 1 .7V2l-1 .7-3-2-3 2-3-2-3 2-3-2zM8 8h8M8 12h8M8 16h5',
    gastos: 'M2 7h20v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM16 14h.01M2 7l3-4h14l3 4',
    reportes: 'M3 3v18h18M7 15l4-4 3 3 5-6',
    productos: 'M20 7l-8-4-8 4v10l8 4 8-4zM4 7l8 4 8-4M12 11v10',
    movimientos: 'M7 17l-4-4 4-4M3 13h13M17 7l4 4-4 4M21 11H8',
    proveedores: 'M1 4h15v12H1zM16 9h4l3 3v4h-7zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    empleados: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
    ausencias: 'M17 18a5 5 0 0 0-10 0M12 2v7M4.2 10.2l1.4 1.4M1 18h2M21 18h2M18.4 11.6l1.4-1.4M23 22H1',
    nomina: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    contratos: 'M12 20h9M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z',
    licencias: 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
    equipo: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    actividad: 'M22 12h-4l-3 9L9 3l-3 9H2',
    mapa: 'M1 6v16l7-4 8 4 7-4V2l-7 4-8-4zM8 2v16M16 6v16',
    ajustes: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
    plus: 'M12 5v14M5 12h14', search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3', x: 'M18 6L6 18M6 6l12 12',
    edit: 'M12 20h9M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z', trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6', pdf: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15l3 3 3-3',
    logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9', sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
    moon: 'M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z', user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
    check: 'M20 6L9 17l-5-5', arrow: 'M5 12h14M12 5l7 7-7 7', left: 'M15 18l-6-6 6-6', right: 'M9 18l6-6-6-6', download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
    upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12', folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    soporte: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 9h8M8 13h5',
    piezas: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21',
    redes: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4',
    anuncios: 'M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6',
    juegos: 'M6 11h4M8 9v4M15 12h.01M18 10h.01M17.3 5H6.7a4 4 0 0 0-4 3.6L2 16a2.8 2.8 0 0 0 5 1.8L9 15h6l2 2.8a2.8 2.8 0 0 0 5-1.8l-.7-7.4A4 4 0 0 0 17.3 5z',
    bugs: 'M8 2l1.9 1.9M16 2l-1.9 1.9M9 7.1V6a3 3 0 0 1 6 0v1.1M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6zM12 20v-9M6.5 13H3M21 13h-3.5M6 9.5 3.5 8M18 9.5 20.5 8M6.5 17.5 4 19M17.5 17.5 20 19',
    llaves: 'M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.8 7.8 5.5 5.5 0 0 1 7.8-7.8zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4',
    planes: 'M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3',
    pedidos: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0',
    candidatos: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6M23 11h-6',
    manuales: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
    timer: 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 10v4l2 2M10 2h4M12 2v4', play: 'M6 4l14 8-14 8z', stop: 'M6 6h12v12H6z',
    board: 'M4 4h5v16H4zM10.5 4h5v10h-5zM17 4h3v7h-3z', list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01', chevron: 'M6 9l6 6 6-6',
    clip: 'M21.4 11.1l-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5', send: 'M22 2L11 13M22 2l-7 20-4-9-9-4z', eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    alert: 'M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01',
    menu: 'M3 6h18M3 12h18M3 18h18',
    cuentas: 'M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7',
    evaluaciones: 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z',
    compras: 'M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM20 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6',
    boveda: 'M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM7 11V7a5 5 0 0 1 10 0v4M12 15v3',
    tienda: 'M3 9l1.5-5h15L21 9M3 9v11h18V9M3 9h18M9 20v-6h6v6',
  };
  D.icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[name] || P.inicio}"/></svg>`;

  // ───── avisos ─────
  D.toast = (msg, kind = 'ok') => {
    const el = document.createElement('div'); el.className = `toast ${kind === 'ok' ? '' : kind}`; el.setAttribute('role', kind === 'error' ? 'alert' : 'status');
    el.innerHTML = `<div>${esc(msg)}</div><button class="x" aria-label="Cerrar aviso">✕</button>`;
    el.querySelector('.x').onclick = () => el.remove();
    document.getElementById('toasts').appendChild(el);
    if (kind !== 'error') setTimeout(() => el.remove(), 4200); else setTimeout(() => el.remove(), 9000);
  };

  // ───── capas: panel lateral y modal ─────
  const overlay = () => document.getElementById('overlay');
  D.closeAll = () => { overlay().innerHTML = ''; document.removeEventListener('keydown', D._esc); };
  D._esc = (e) => { if (e.key === 'Escape') D.closeAll(); };
  D.drawer = ({ title, subtitle = '', body, footer = '', onMount }) => {
    overlay().innerHTML = `<div class="scrim" data-close></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="${esc(title)}">
      <header><div class="t"><h2>${esc(title)}</h2>${subtitle ? `<p>${subtitle}</p>` : ''}</div><button class="icon-btn" data-close aria-label="Cerrar">${D.icon('x')}</button></header>
      <div class="body">${body}</div>${footer ? `<footer>${footer}</footer>` : ''}</aside>`;
    overlay().querySelectorAll('[data-close]').forEach(b => b.onclick = D.closeAll);
    document.addEventListener('keydown', D._esc);
    const root = overlay().querySelector('.drawer');
    const first = root.querySelector('input:not([type=hidden]):not([type=checkbox]), select, textarea'); if (first) setTimeout(() => first.focus(), 60);
    if (onMount) onMount(root);
    return root;
  };
  D.modal = ({ title, body, buttons = [], wide = false, onMount }) => new Promise(resolve => {
    overlay().insertAdjacentHTML('beforeend', `<div class="scrim" data-m></div><div class="modal ${wide ? 'wide' : ''}" role="dialog" aria-modal="true" data-m>
      <div class="mb">${title ? `<h2 style="margin-bottom:10px">${esc(title)}</h2>` : ''}${body}</div>
      ${buttons.length ? `<div class="mf">${buttons.map((b, i) => `<button class="btn ${b.kind || ''}" data-i="${i}">${esc(b.label)}</button>`).join('')}</div>` : ''}</div>`);
    const nodes = overlay().querySelectorAll('[data-m]'); const m = nodes[nodes.length - 1];
    const close = (v) => { nodes.forEach(n => n.remove()); document.removeEventListener('keydown', onKey); resolve(v); };
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(null); } };
    document.addEventListener('keydown', onKey);
    nodes[0].onclick = () => close(null);
    m.querySelectorAll('[data-i]').forEach(b => b.onclick = async () => { const btn = buttons[Number(b.dataset.i)]; const v = btn.value ? await btn.value(m) : null; if (v !== false) close(v); });
    const first = m.querySelector('input, select, textarea, .btn.primary, .btn.danger'); if (first) setTimeout(() => first.focus(), 50);
    if (onMount) onMount(m, close);
  });
  D.confirm = (title, text, label = 'Sí, continuar', kind = 'danger') => D.modal({ title, body: `<p style="margin:0">${text}</p>`, buttons: [{ label: 'Cancelar' }, { label, kind, value: () => true }] }).then(v => v === true);
  D.prompt = (title, fieldsHtml, label = 'Guardar') => D.modal({ title, body: `<div class="form">${fieldsHtml}</div>`, buttons: [{ label: 'Cancelar' }, { label, kind: 'primary', value: (m) => D.readForm(m) }] });

  // ───── formularios ─────
  // Campo: { key, label, type, options, required, full, hint, help, ref, show(rec), readonly, placeholder }
  D.fieldHtml = (f, rec = {}) => {
    const v = rec[f.key] ?? (f.default !== undefined ? (typeof f.default === 'function' ? f.default() : f.default) : '');
    const id = `f_${f.key}`;
    const fl = typeof f.label === 'function' ? f.label() : f.label;
    const req = f.required ? ' <span class="req" aria-hidden="true">*</span>' : '';
    const lab = `<label for="${id}">${esc(fl)}${req}</label>`;
    const hint = f.hint ? `<span class="hint">${esc(f.hint)}</span>` : '';
    const cls = `field ${f.full || ['textarea','lines','users'].includes(f.type) ? 'full' : ''}`;
    const common = `id="${id}" name="${f.key}" data-type="${f.type || 'text'}" ${f.required ? 'required' : ''} ${f.readonly ? 'readonly' : ''}`;
    switch (f.type) {
      case 'textarea': return `<div class="${cls}">${lab}<textarea class="input" rows="${f.rows || 4}" ${common} placeholder="${esc(f.placeholder || '')}">${esc(v)}</textarea>${hint}</div>`;
      case 'select': {
        const opts = (typeof f.options === 'function' ? f.options() : f.options || []).map(o => typeof o === 'string' ? { value: o, label: o } : o);
        return `<div class="${cls}">${lab}<select class="input" ${common}>${f.required ? (v === '' ? '<option value="" disabled selected>— Elige una opción —</option>' : '') : '<option value="">— Sin elegir —</option>'}${opts.map(o => `<option value="${esc(o.value)}" ${String(o.value) === String(v) ? 'selected' : ''}>${esc(o.label)}</option>`).join('')}</select>${hint}</div>`;
      }
      case 'users': {
        const sel = Array.isArray(v) ? v : []; const people = D.directory || [];
        return `<div class="${cls}"><label>${esc(fl)}</label><div class="multi" data-multi="${f.key}">${people.map(p => `<label><input type="checkbox" value="${p.id}" ${sel.includes(p.id) ? 'checked' : ''}>${esc(p.nombre)}</label>`).join('') || '<span class="muted small">No hay personas del equipo todavía.</span>'}</div>${hint}</div>`;
      }
      case 'multi': {
        const opts = (typeof f.options === 'function' ? f.options() : f.options || []).map(o => typeof o === 'string' ? { value: o, label: o } : o); const sel = Array.isArray(v) ? v : [];
        return `<div class="${cls} full"><label>${esc(fl)}</label><div class="multi" data-multi="${f.key}">${opts.map(o => `<label><input type="checkbox" value="${esc(o.value)}" ${sel.includes(o.value) ? 'checked' : ''}>${esc(o.label)}</label>`).join('')}</div>${hint}</div>`;
      }
      case 'file': {
        const fv = v && typeof v === 'object' ? v : null;
        return `<div class="${cls} full">${lab}<div class="file-field" data-file="${f.key}"><input type="hidden" name="${f.key}" data-type="file" value="${esc(fv ? JSON.stringify(fv) : '')}">
          <button type="button" class="btn sm" data-pick>${D.icon('clip')} ${fv ? 'Cambiar archivo' : 'Adjuntar archivo…'}</button><span class="small" data-fname>${fv ? esc(fv.nombre) : '<span class="muted">Ningún archivo</span>'}</span>${fv ? '<button type="button" class="btn sm" data-unpick>Quitar</button>' : ''}</div>${hint || '<span class="hint">Se guarda una copia en la carpeta de datos de este equipo.</span>'}</div>`;
      }
      case 'checkbox': return `<div class="${cls}"><label class="check"><input type="checkbox" ${common} ${v === true ? 'checked' : ''}> ${esc(fl)}</label>${hint}</div>`;
      case 'lines': return `<div class="lines" data-lines="${f.key}" data-source="${f.source || 'catalogo'}">${D.linesEditor(Array.isArray(v) ? v : [], f.source)}</div>`;
      case 'money': case 'number': case 'pct':
        return `<div class="${cls}">${lab}<input class="input" type="number" step="${f.type === 'number' && !f.decimals ? '1' : '0.01'}" min="${f.min ?? (f.type === 'pct' ? 0 : '')}" ${common} value="${esc(v)}" placeholder="${esc(f.placeholder || (f.type === 'pct' ? '0' : ''))}">${hint}</div>`;
      case 'date': return `<div class="${cls}">${lab}<input class="input" type="date" ${common} value="${esc(String(v).slice(0, 10))}">${hint}</div>`;
      case 'datetime': return `<div class="${cls}">${lab}<input class="input" type="datetime-local" ${common} value="${esc(String(v).slice(0, 16))}">${hint}</div>`;
      case 'password': return `<div class="${cls}">${lab}<input class="input" type="password" autocomplete="new-password" ${common} ${f.key === 'password' ? 'minlength="8"' : ''} value="${esc(v)}">${hint}</div>`;
      default: return `<div class="${cls}">${lab}<input class="input" type="${f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'text'}" ${common} value="${esc(v)}" placeholder="${esc(f.placeholder || '')}">${hint}</div>`;
    }
  };
  D.readForm = (root) => {
    const out = {}; let missing = null;
    root.querySelectorAll('[name]').forEach(el => {
      const t = el.dataset.type; let v;
      if (el.type === 'checkbox') v = el.checked;
      else if (t === 'file') { try { v = el.value ? JSON.parse(el.value) : null; } catch (e) { v = null; } }
      else if (['money','number','pct'].includes(t)) v = el.value === '' ? '' : Number(el.value);
      else v = el.value.trim();
      if (el.required && (v === '' || v === null) && !missing) missing = el;
      out[el.name] = v;
    });
    root.querySelectorAll('[data-multi]').forEach(m => { out[m.dataset.multi] = [...m.querySelectorAll('input:checked')].map(i => i.value); });
    root.querySelectorAll('[data-lines]').forEach(l => { out[l.dataset.lines] = D.readLines(l); });
    if (missing) { const lab = root.querySelector(`label[for="${missing.id}"]`); D.toast(`Falta completar: ${lab ? lab.textContent.replace('*', '').trim() : 'un campo obligatorio'}.`, 'error'); missing.focus(); return false; }
    return out;
  };

  // líneas de cotización / factura
  D.lineSource = (src) => src === 'productos' ? (D.refs.productos || []).map(p => ({ nombre: p.nombre, precio: p.precio, extra: ` (stock: ${p.stock ?? 0})` })) : (D.servicesCache || []);
  D.linesEditor = (lines, source) => {
    const services = D.lineSource(source); const dl = `dl-${source || 'catalogo'}`;
    const row = (l = {}) => `<tr><td style="width:52%"><input class="input" list="${dl}" data-l="descripcion" value="${esc(l.descripcion || '')}" placeholder="${source === 'productos' ? 'Escribe y elige un producto' : 'Servicio o producto'}"></td>
      <td><input class="input" type="number" min="1" step="1" data-l="cantidad" value="${esc(l.cantidad || 1)}"></td>
      <td><input class="input" type="number" min="0" step="0.01" data-l="precio" value="${esc(l.precio ?? '')}"></td>
      <td class="num" data-sub>${D.money((l.cantidad || 1) * (l.precio || 0))}</td>
      <td><button type="button" class="icon-btn" data-del-line aria-label="Quitar línea">${D.icon('trash')}</button></td></tr>`;
    return `<label style="font-weight:500;font-size:14px;color:var(--text-2)">${source === 'productos' ? 'Productos' : 'Detalle'}</label>
      <datalist id="${dl}">${services.map(s => `<option value="${esc(s.nombre)}">${esc(s.extra || '')}</option>`).join('')}</datalist>
      <table><thead><tr><th>Descripción</th><th>Cant.</th><th>Precio</th><th class="num">Subtotal</th><th></th></tr></thead>
      <tbody>${(lines.length ? lines : [{}]).map(row).join('')}</tbody></table>
      <button type="button" class="btn sm" data-add-line style="margin-top:8px">${D.icon('plus')} Agregar línea</button>
      <template data-row>${row()}</template>`;
  };
  D.bindLines = (root, onChange) => {
    const box = root.querySelector('[data-lines]'); if (!box) return;
    const recalc = () => { box.querySelectorAll('tbody tr').forEach(tr => { const q = Number(tr.querySelector('[data-l=cantidad]').value || 0); const p = Number(tr.querySelector('[data-l=precio]').value || 0); tr.querySelector('[data-sub]').textContent = D.money(q * p); }); if (onChange) onChange(); };
    box.addEventListener('input', (e) => {
      if (e.target.dataset.l === 'descripcion') { const s = D.lineSource(box.dataset.source).find(x => x.nombre === e.target.value); if (s) { const p = e.target.closest('tr').querySelector('[data-l=precio]'); if (!p.value) p.value = s.precio; } }
      recalc();
    });
    box.addEventListener('click', (e) => {
      if (e.target.closest('[data-add-line]')) { box.querySelector('tbody').insertAdjacentHTML('beforeend', box.querySelector('template[data-row]').innerHTML); recalc(); }
      const del = e.target.closest('[data-del-line]'); if (del) { const rows = box.querySelectorAll('tbody tr'); if (rows.length > 1) del.closest('tr').remove(); else rows[0].querySelectorAll('input').forEach(i => i.value = i.dataset.l === 'cantidad' ? 1 : ''); recalc(); }
    });
    recalc();
  };
  D.readLines = (box) => [...box.querySelectorAll('tbody tr')].map(tr => ({ descripcion: tr.querySelector('[data-l=descripcion]').value.trim(), cantidad: Number(tr.querySelector('[data-l=cantidad]').value || 1), precio: Number(tr.querySelector('[data-l=precio]').value || 0) })).filter(l => l.descripcion || l.precio);
  D.linesTotal = (lines, desc, imp) => { const sub = lines.reduce((a, l) => a + l.cantidad * l.precio, 0); const d = sub * (Number(desc) || 0) / 100; const i = (sub - d) * (Number(imp) || 0) / 100; return { sub, d, i, total: sub - d + i }; };

  D.bindFiles = (root) => {
    root.querySelectorAll('[data-file]').forEach(box => {
      const inp = box.querySelector('input[type=hidden]');
      const draw = (fv) => { inp.value = fv ? JSON.stringify(fv) : ''; box.querySelector('[data-fname]').innerHTML = fv ? esc(fv.nombre) : '<span class="muted">Ningún archivo</span>'; box.querySelector('[data-pick]').innerHTML = `${D.icon('clip')} ${fv ? 'Cambiar archivo' : 'Adjuntar archivo…'}`; const u = box.querySelector('[data-unpick]'); if (u) u.classList.toggle('hidden', !fv); };
      box.querySelector('[data-pick]').onclick = async () => { const r = await window.dos.pickFile(); if (r && r.error) return D.toast(r.error, 'error'); if (r && r.data) { draw(r.data); D.toast('Archivo adjuntado.'); } };
      const un = box.querySelector('[data-unpick]'); if (un) un.onclick = () => draw(null);
    });
  };
  D.fileChip = (fv) => fv && fv.ruta ? `<button type="button" class="file-chip" data-openfile="${esc(fv.ruta)}">${D.icon('clip')} ${esc(fv.nombre)}</button>` : '';
  D.bindFileChips = (root) => root.querySelectorAll('[data-openfile]').forEach(b => b.onclick = async () => { const r = await window.dos.openFile(b.dataset.openfile); if (r && r.error) D.toast(r.error, 'error'); });

  // ───── tablas ─────
  D.table = (cols, rows, { sortKey, sortDir = 1, empty = '' } = {}) => {
    if (!rows.length) return empty;
    const sorted = sortKey ? [...rows].sort((a, b) => { const x = a[sortKey] ?? ''; const y = b[sortKey] ?? ''; return (x > y ? 1 : x < y ? -1 : 0) * sortDir; }) : rows;
    return `<div class="table-wrap"><table><thead><tr>${cols.map(c => `<th class="${c.num ? 'num' : ''}" data-sort="${c.sort || c.key}" title="Ordenar">${esc(c.label)}${sortKey === (c.sort || c.key) ? (sortDir > 0 ? ' ↑' : ' ↓') : ''}</th>`).join('')}</tr></thead>
      <tbody>${sorted.map(r => `<tr data-id="${esc(r.id)}">${cols.map(c => `<td class="${c.num ? 'num' : ''}">${c.render ? c.render(r) : esc(r[c.key] ?? '—')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  };
  D.empty = (title, text, btn = '') => `<div class="empty"><img src="assets/spiro.png" alt=""><h3>${esc(title)}</h3><p>${text}</p>${btn}</div>`;
})(window.DOS);
