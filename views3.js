// Delirium OS — pantallas de la versión 1.3: firma electrónica, reporte mensual, evaluaciones, compras,
// bóveda cifrada, tienda online y métricas de jugadores.
(function (D) {
  const esc = D.esc;
  const canW = (k) => (D.meta.modules.find(m => m.key === k) || {}).level === 'W';
  const isClient = () => ['cliente', 'cliente_eq'].includes(D.me.rol);
  const reopen = (k, id) => { D.rerender(); D.openRecord(k, id); };
  const PARTE = { cliente: 'Cliente', estudio: 'Delirium Studios', contraparte: 'Contraparte' };

  // ───────────── firma electrónica ─────────────
  function padFirma(root) {
    const c = root.querySelector('canvas'); const ctx = c.getContext('2d'); let dib = false, trazos = 0;
    const ajustar = () => { const r = c.getBoundingClientRect(); c.width = r.width * 2; c.height = r.height * 2; ctx.scale(2, 2); ctx.lineWidth = 2.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#111'; };
    ajustar();
    const pos = (e) => { const r = c.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    c.onpointerdown = (e) => { dib = true; try { c.setPointerCapture(e.pointerId); } catch (x) {} const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y); };
    c.onpointermove = (e) => { if (!dib) return; const [x, y] = pos(e); ctx.lineTo(x, y); ctx.stroke(); trazos++; };
    c.onpointerup = () => { dib = false; };
    root.querySelector('[data-limpiar]').onclick = () => { ctx.clearRect(0, 0, c.width, c.height); trazos = 0; };
    return { vacia: () => trazos < 8, png: () => c.toDataURL('image/png') };
  }
  D.firmar = async (modulo, r) => {
    const cli = isClient();
    const nombreDoc = modulo === 'cotizaciones' ? `la cotización ${r.codigo} por ${D.money(r._total)}` : `«${r.titulo}»`;
    let pad = null;
    const v = await D.modal({ title: cli ? 'Firmar y aceptar' : 'Firmar documento', body: `<div class="form">
        <div class="note" style="grid-column:1/-1">Vas a firmar ${esc(nombreDoc)}. Tu firma queda guardada con la fecha y una huella del documento: si alguien lo cambia después, se nota.</div>
        ${!cli && modulo === 'contratos' ? D.fieldHtml({ key: 'parte', label: 'Firma de', type: 'select', options: [{ value: 'estudio', label: 'Delirium Studios' }, { value: 'contraparte', label: 'La contraparte (está presente aquí)' }] }, { parte: 'estudio' }) : ''}
        ${D.fieldHtml({ key: 'nombre', label: 'Nombre completo', required: true, full: true }, { nombre: D.me.nombre.replace(/\s*\(.*?\)/g, '') })}
        <div class="field full"><label>Dibuja tu firma</label><div class="pad"><canvas aria-label="Recuadro para dibujar la firma"></canvas><button type="button" class="btn sm ghost" data-limpiar>Borrar</button></div><span class="hint">Usa el mouse, el dedo o un lápiz.</span></div>
        ${D.fieldHtml({ key: 'acepto', label: 'Leí el documento y acepto su contenido', type: 'checkbox' })}</div>`,
      onMount: (m) => { pad = padFirma(m); },
      buttons: [{ label: 'Cancelar' }, { label: 'Firmar', kind: 'primary', value: (m) => { const f = D.readForm(m); if (!f) return false; if (!f.acepto) { D.toast('Marca la casilla de aceptación.', 'error'); return false; } if (pad.vacia()) { D.toast('Dibuja tu firma en el recuadro.', 'error'); return false; } return { ...f, imagen: pad.png() }; } }] });
    if (!v || typeof v !== 'object') return;
    const out = await D.try(() => D.call('action', 'firmar', { modulo, id: r.id, ...v }), '¡Firmado! Gracias.');
    if (out) { D.updateBadges(); reopen(modulo, r.id); }
  };
  const firmasHtml = (r) => (r.firmas || []).length ? `<div class="section"><h3>Firmas</h3><div class="firmas-ui">${r.firmas.map(f => `<div class="firma-ui ${f._valida === false ? 'mal' : ''}"><img src="${f.imagen}" alt="Firma de ${esc(f.nombre)}"><b>${esc(f.nombre)}</b><span class="small muted">${PARTE[f.parte] || ''} · ${D.datetime(f.fecha)}</span>${f._valida === false ? '<span class="badge danger">El documento cambió después de firmarse</span>' : '<span class="badge ok">Firma válida</span>'}</div>`).join('')}</div></div>` : '';
  const prevContratos = D.DETAIL.contratos;
  D.DETAIL.contratos = (r) => { const b = prevContratos ? prevContratos(r) : {}; return { top: `${b.top || ''}${r.pedir_firma && !r._firmado_cliente && !isClient() ? '<div class="note" style="margin-bottom:14px">Esperando la firma del cliente en su portal.</div>' : ''}`, bottom: `${b.bottom || ''}${firmasHtml(r)}` }; };
  const prevCot = D.DETAIL.cotizaciones;
  D.DETAIL.cotizaciones = (r) => { const b = prevCot(r); return { top: b.top, bottom: `${b.bottom || ''}${firmasHtml(r)}` }; };
  D.ACTIONS.contratos = (r) => {
    const out = [];
    if ((r.firmas || []).length) out.push(`<button class="btn" data-act="constancia">${D.icon('pdf')} Constancia</button>`);
    if (isClient() && D.me.rol === 'cliente' && r.pedir_firma && !r._firmado_cliente) out.push('<button class="btn violet" data-act="firmarc">Firmar</button>');
    if (!isClient() && canW('contratos')) out.push(`<button class="btn violet" data-act="firmarc">${r._firmado_estudio ? 'Firmar (otra parte)' : 'Firmar'}</button>`);
    return out.join('');
  };
  const prevActCot = D.ACTIONS.cotizaciones;
  D.ACTIONS.cotizaciones = (r) => { let h = prevActCot(r); if (D.me.rol === 'cliente' && r.estado === 'Enviada') h = h.replace('<button class="btn violet" data-act="aceptada">Aceptar</button>', '<button class="btn violet" data-act="firmarq">Firmar y aceptar</button>'); return h; };
  Object.assign(D.HANDLERS, {
    firmarc: (r) => D.firmar('contratos', r), firmarq: (r) => D.firmar('cotizaciones', r), constancia: (r) => D.pdfConstancia(r),
  });

  // ───────────── reporte mensual por cliente ─────────────
  D.reporteMensual = async (clientId) => {
    const hoy = D.today();
    const v = await D.prompt('Reporte del mes', `<div class="note" style="grid-column:1/-1">Resumen en PDF con proyectos, piezas aprobadas, publicaciones, anuncios y pagos del mes.</div>` + D.fieldHtml({ key: 'mes', label: 'Mes', type: 'select', required: true, options: Array.from({ length: 6 }, (_, i) => { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i); const k = D.ymd(d).slice(0, 7); return { value: k, label: `${D.MESES_LARGOS[d.getMonth()]} ${d.getFullYear()}` }; }) }, { mes: hoy.slice(0, 7) }), 'Generar PDF');
    if (!v) return; const d = await D.try(() => D.call('reporteCliente', clientId, v.mes)); if (d) D.pdfReporte(d);
  };
  const prevActCli = D.ACTIONS.clientes;
  D.ACTIONS.clientes = (r) => `${prevActCli ? prevActCli(r) : ''}<button class="btn" data-act="reportecli">${D.icon('pdf')} Reporte PDF</button>`;
  D.HANDLERS.reportecli = (r) => D.reporteMensual(r.id);

  // ───────────── evaluaciones ─────────────
  D.DETAIL.evaluaciones = (r) => ({ top: `<div class="grid g3" style="margin-bottom:14px"><div class="kpi"><div class="label">Promedio</div><div class="v">${r._promedio ?? '—'}</div><div class="s">${D.estrellas(r._promedio)}</div></div><div class="kpi"><div class="label">Período</div><div class="v" style="font-size:17px">${esc(r.periodo)}</div></div><div class="kpi"><div class="label">Estado</div><div class="v" style="font-size:17px">${D.badge(r.estado)}</div><div class="s">Evaluó ${esc(r.evaluador || '')}</div></div></div>
      <div class="scores">${[['calidad', 'Calidad'], ['puntualidad', 'Puntualidad'], ['comunicacion', 'Comunicación'], ['creatividad', 'Creatividad'], ['equipo', 'Trabajo en equipo']].map(([k, l]) => `<div><span>${l}</span><div class="progress"><i style="width:${(Number(r[k]) || 0) * 20}%"></i></div><b>${r[k] || '—'}</b></div>`).join('')}</div>`,
    bottom: `${r.respuesta ? `<div class="section"><h3>Respuesta de ${esc(r._usuario_id || 'la persona')}</h3><div class="msg client" style="max-width:100%"><div class="txt">${esc(r.respuesta)}</div></div></div>` : ''}` });
  D.ACTIONS.evaluaciones = (r) => r.usuario_id === D.me.id && r.estado !== 'Borrador' ? `<button class="btn violet" data-act="responderev">${r.respuesta ? 'Editar mi respuesta' : 'Responder'}</button>` : '';
  D.HANDLERS.responderev = async (r) => { const v = await D.prompt('Responder evaluación', D.fieldHtml({ key: 'texto', label: '¿Qué opinas? ¿Qué necesitas para lograr los objetivos?', type: 'textarea', required: true }, { texto: r.respuesta || '' }), 'Enviar'); if (v && await D.try(() => D.call('action', 'evaluacion.responder', { id: r.id, texto: v.texto }), 'Respuesta guardada.')) reopen('evaluaciones', r.id); };

  // ───────────── órdenes de compra ─────────────
  D.DETAIL.compras = (r) => ({ top: `<div class="note" style="margin-bottom:16px">${D.badge(r.estado)} &nbsp;${esc(r._proveedor || '')} · total <b>${D.money(r._total)}</b>${r.fecha_recibida ? ` · recibida el ${D.date(r.fecha_recibida)}` : ''}</div>`,
    bottom: `<div class="section"><h3>Productos</h3><div class="table-wrap"><table><thead><tr><th>Producto</th><th class="num">Cant.</th><th class="num">Costo</th><th class="num">Subtotal</th></tr></thead><tbody>${(r.lineas || []).map(l => `<tr><td>${esc(l.descripcion)}${l.product_id ? '' : '<span class="sub">No está en Productos: no suma stock</span>'}</td><td class="num">${l.cantidad}</td><td class="num">${D.money(l.precio)}</td><td class="num">${D.money(l.cantidad * l.precio)}</td></tr>`).join('')}</tbody></table></div><div class="totals"><span class="big">Total</span><span class="big">${D.money(r._total)}</span></div></div>` });
  D.ACTIONS.compras = (r) => !canW('compras') ? '' : r.estado === 'Borrador' ? '<button class="btn" data-act="ocenviar">Marcar como enviada</button><button class="btn violet" data-act="ocrecibir">Recibir mercancía</button>' : r.estado === 'Enviada' ? '<button class="btn violet" data-act="ocrecibir">Recibir mercancía</button>' : '';
  Object.assign(D.HANDLERS, {
    ocenviar: async (r) => { if (await D.try(() => D.call('save', 'compras', { id: r.id, estado: 'Enviada' }), 'Marcada como enviada.')) reopen('compras', r.id); },
    ocrecibir: async (r) => { const v = await D.prompt('Recibir mercancía', '<div class="note" style="grid-column:1/-1">El stock de cada producto sube con las cantidades de la orden y se actualiza su costo.</div>' + D.fieldHtml({ key: 'gasto', label: `Registrar también el gasto de ${D.money(r._total)}`, type: 'checkbox' }, { gasto: true }), 'Recibir'); if (!v) return; const out = await D.try(() => D.call('action', 'compra.recibir', { id: r.id, gasto: v.gasto })); if (out) { D.toast(`Recibido: ${D.pl(out.piezas, 'unidad sumada', 'unidades sumadas')} al stock${out.gasto ? ' y gasto registrado' : ''}.`); reopen('compras', r.id); } },
    pedirprov: async () => { const out = await D.try(() => D.call('action', 'compra.sugerir', {})); if (out) { D.toast(out.length ? `Órdenes en borrador: ${out.join(', ')}. Revísalas y envíalas.` : 'Ya hay órdenes abiertas para esos productos.'); D.go('compras'); } },
  });
  D.PAGE_ACTIONS.compras = () => canW('compras') ? '<button class="btn" data-page-act="sugerirOC">Sugerir por stock bajo</button>' : '';
  D.PAGE_HANDLERS.sugerirOC = () => D.HANDLERS.pedirprov();
  const prevActProd = D.ACTIONS.productos;
  D.ACTIONS.productos = (r) => `${r._stock_bajo && canW('compras') ? '<button class="btn" data-act="pedirprov">Pedir al proveedor</button>' : ''}${prevActProd(r)}`;
  const prevProd = D.DETAIL.productos;
  D.DETAIL.productos = (r) => { const b = prevProd(r); return { top: `${b.top}${r.imagen ? '<div class="preview" data-prodimg></div>' : ''}${r.publicar_tienda ? '<p class="small" style="margin:0 0 12px"><span class="badge ok">En la tienda online</span></p>' : ''}`, bottom: b.bottom }; };
  D.MOUNT.productos = async (root, r) => { const box = root.querySelector('[data-prodimg]'); if (!box || !r.imagen) return; const res = await window.dos.previewFile(r.imagen.ruta); if (res && res.data) box.innerHTML = `<img src="${res.data}" alt="${esc(r.nombre)}" style="max-height:220px">`; };

  // ───────────── bóveda de contraseñas (cifrada en este equipo) ─────────────
  const enc = new TextEncoder(); const dec = new TextDecoder();
  const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))); const unb64 = (s) => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  async function derivar(clave, salt) { const base = await crypto.subtle.importKey('raw', enc.encode(clave), 'PBKDF2', false, ['deriveKey']); return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']); }
  async function cifrar(key, obj) { const iv = crypto.getRandomValues(new Uint8Array(12)); const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(JSON.stringify(obj))); return { iv: b64(iv), ct: b64(ct) }; }
  async function descifrar(key, c) { const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(c.iv) }, key, unb64(c.ct)); return JSON.parse(dec.decode(pt)); }
  let boveda = { key: null, hasta: 0 };
  const cerrarBoveda = () => { boveda = { key: null, hasta: 0 }; };
  D.cerrarBoveda = cerrarBoveda;
  async function abrirBoveda() {
    if (boveda.key && boveda.hasta > Date.now()) { boveda.hasta = Date.now() + 15 * 60000; return boveda.key; }
    const ver = D.settings.boveda_verificador;
    if (!ver) { D.toast(D.isAdmin() ? 'Primero crea la clave maestra (botón arriba).' : 'Dirección todavía no configuró la bóveda.', 'error'); return null; }
    const v = await D.prompt('Abrir la bóveda', '<div class="note" style="grid-column:1/-1">Escribe la clave maestra de la bóveda. Se queda abierta 15 minutos en esta PC.</div>' + D.fieldHtml({ key: 'clave', label: 'Clave maestra', type: 'password', required: true, full: true }), 'Abrir');
    if (!v) return null;
    try { const key = await derivar(v.clave, unb64(ver.salt)); const ok = await descifrar(key, ver); if (ok !== 'delirium-ok') throw 0; boveda = { key, hasta: Date.now() + 15 * 60000 }; return key; }
    catch (e) { D.toast('La clave maestra no es correcta.', 'error'); return null; }
  }
  D.PAGE_ACTIONS.boveda = () => D.isAdmin() ? `<button class="btn" data-page-act="clavemaestra">${D.settings.boveda_verificador ? 'Cambiar clave maestra' : 'Crear clave maestra'}</button>` : '';
  D.PAGE_HANDLERS.clavemaestra = async () => {
    const cambiar = !!D.settings.boveda_verificador; let viejaKey = null;
    if (cambiar) { viejaKey = await abrirBoveda(); if (!viejaKey) return; }
    const v = await D.prompt(cambiar ? 'Cambiar clave maestra' : 'Crear clave maestra', `<div class="note danger" style="grid-column:1/-1">Guárdala en un lugar seguro. <b>Si se pierde, nadie puede recuperar las contraseñas</b>, ni siquiera nosotros. Compártela solo con quien deba usar la bóveda.</div>` + D.fieldHtml({ key: 'clave', label: 'Clave maestra (mínimo 12 caracteres)', type: 'password', required: true, full: true }) + D.fieldHtml({ key: 'clave2', label: 'Repítela', type: 'password', required: true, full: true }), cambiar ? 'Cambiar y volver a cifrar' : 'Crear');
    if (!v) return; if (v.clave.length < 12) return D.toast('La clave maestra debe tener al menos 12 caracteres.', 'error'); if (v.clave !== v.clave2) return D.toast('Las claves no coinciden.', 'error');
    const salt = crypto.getRandomValues(new Uint8Array(16)); const key = await derivar(v.clave, salt);
    if (cambiar) { const items = (await D.try(() => D.call('list', 'boveda'))) || []; for (const it of items) if (it.cifrado) { const datos = await descifrar(viejaKey, it.cifrado); await D.call('save', 'boveda', { id: it.id, cifrado: await cifrar(key, datos) }); } }
    const ver = { ...(await cifrar(key, 'delirium-ok')), salt: b64(salt) };
    if (await D.try(() => D.call('action', 'ajustes.guardar', { boveda_verificador: ver }), cambiar ? 'Clave cambiada: todo quedó cifrado con la nueva.' : 'Bóveda lista.')) { D.settings = await D.call('settings'); boveda = { key, hasta: Date.now() + 15 * 60000 }; D.rerender(); }
  };
  const prevOpenForm = D.openForm;
  D.openForm = async (key, rec = null, preset = {}) => {
    if (key !== 'boveda') return prevOpenForm(key, rec, preset);
    const k = await abrirBoveda(); if (!k) return;
    const secreto = rec && rec.cifrado ? await descifrar(k, rec.cifrado).catch(() => ({})) : {};
    const sc = D.SCHEMA.boveda;
    const root = D.drawer({ title: rec ? 'Editar acceso' : sc.nuevo, subtitle: 'La contraseña y las notas se cifran en esta PC antes de guardarse.',
      body: `<form class="form" novalidate>${sc.fields.map(f => D.fieldHtml(f, rec || preset)).join('')}${D.fieldHtml({ key: '_clave', label: 'Contraseña', type: 'password', full: true }, { _clave: secreto.clave || '' })}${D.fieldHtml({ key: '_notas', label: 'Notas secretas (códigos de respaldo, PIN, preguntas…)', type: 'textarea' }, { _notas: secreto.notas || '' })}</form>`,
      footer: `<button class="btn" data-gen>Generar contraseña segura</button><button class="btn" data-close-form>Cancelar</button><button class="btn primary" data-save>${D.icon('check')} Guardar</button>` });
    const form = root.querySelector('form');
    root.querySelector('[data-gen]').onclick = () => { const a = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*?'; const r = crypto.getRandomValues(new Uint32Array(20)); const p = [...r].map(x => a[x % a.length]).join(''); const i = form.querySelector('[name=_clave]'); i.value = p; i.type = 'text'; D.toast('Contraseña generada.'); };
    root.querySelector('[data-close-form]').onclick = () => rec ? D.openRecord('boveda', rec.id) : D.closeAll();
    root.querySelector('[data-save]').onclick = async () => {
      const v = D.readForm(form); if (!v) return; const kk = await abrirBoveda(); if (!kk) return;
      const datos = { ...v, cifrado: await cifrar(kk, { clave: v._clave || '', notas: v._notas || '' }) }; delete datos._clave; delete datos._notas; if (rec) datos.id = rec.id;
      const out = await D.try(() => D.call('save', 'boveda', datos), 'Acceso guardado y cifrado.'); if (out) { D.closeAll(); D.rerender(); D.openRecord('boveda', out.id); }
    };
  };
  D.DETAIL.boveda = (r) => ({ top: `<div class="vault"><div class="kv"><dt>Contraseña</dt><dd><span class="mono" data-secret>••••••••••</span></dd><dt>Notas secretas</dt><dd data-notas class="muted">Ocultas</dd></div>
      <div class="actions" style="margin-top:10px"><button class="btn sm violet" data-mostrar>${D.icon('eye')} Mostrar</button><button class="btn sm" data-copiar>Copiar contraseña</button>${r.url ? `<button class="btn sm" data-ext="${esc(/^https?:/.test(r.url) ? r.url : 'https://' + r.url)}">Abrir página</button>` : ''}</div></div>` });
  D.MOUNT.boveda = (root, r) => {
    const sacar = async () => { const k = await abrirBoveda(); if (!k) return null; try { return await descifrar(k, r.cifrado); } catch (e) { D.toast('No se pudo descifrar (¿cambió la clave maestra?).', 'error'); return null; } };
    root.querySelector('[data-mostrar]').onclick = async () => { const s = await sacar(); if (!s) return; root.querySelector('[data-secret]').textContent = s.clave || '(vacía)'; const n = root.querySelector('[data-notas]'); n.textContent = s.notas || '—'; n.classList.remove('muted'); n.style.whiteSpace = 'pre-wrap'; setTimeout(() => { const x = root.querySelector('[data-secret]'); if (x) x.textContent = '••••••••••'; }, 30000); };
    root.querySelector('[data-copiar]').onclick = async () => { const s = await sacar(); if (!s) return; await navigator.clipboard.writeText(s.clave || ''); D.toast('Contraseña copiada. Se borrará del portapapeles en 30 s.'); setTimeout(() => navigator.clipboard.writeText('').catch(() => {}), 30000); };
  };

  // ───────────── métricas de jugadores (en el detalle del juego) ─────────────
  const prevGameDetail = D.DETAIL.juegos;
  D.DETAIL.juegos = (r) => { const b = prevGameDetail(r); return { top: b.top, bottom: `<div class="section"><h3>Métricas de jugadores <span class="muted small" style="font-weight:500">últimos 30 días</span></h3><div data-metricas><span class="muted">${D.enNube() ? 'Cargando…' : 'Disponible cuando el estudio trabaje en línea: el juego envía sus eventos por internet.'}</span></div></div>${b.bottom || ''}` }; };
  const prevGameMount = D.MOUNT.juegos;
  D.MOUNT.juegos = async (root, r) => {
    await prevGameMount(root, r);
    const box = root.querySelector('[data-metricas]'); if (!box || !D.enNube()) return;
    const res = await window.dos.call('metricasJuego', r.id, 30);
    if (res.error) { box.innerHTML = `<span class="muted">${esc(res.error)}</span>`; return; }
    const m = res.data || {}; const mt = m.metricas || {};
    if (!m.jugadores_total) { box.innerHTML = '<p class="muted" style="margin:0">Todavía no llegan eventos. Agrega el código de la sección "Reportes de fallos y métricas" al juego.</p>'; return; }
    const dias = Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - 13 + i); return D.ymd(d); });
    const dau = Object.fromEntries((m.dau || []).map(x => [String(x.dia).slice(0, 10), x.jugadores])); const max = Math.max(1, ...dias.map(d => dau[d] || 0));
    const niveles = [...new Set(Object.keys(mt).filter(k => k.startsWith('nivel_inicio:')).map(k => k.split(':')[1]))].sort((a, b) => (Number(a) - Number(b)) || a.localeCompare(b));
    const eventos = Object.entries(mt).filter(([k]) => k.startsWith('evento:')).sort((a, b) => b[1] - a[1]).slice(0, 8);
    box.innerHTML = `<div class="grid g2"><div class="kpi"><div class="label">Jugadores/div><div class="v">${D.num(m.activos)}</div><div class="s">${D.num(m.jugadores_total)} en total</div></div><div class="kpi"><div class="label">Sesiones</div><div class="v">${D.num(mt.sesiones || 0)}</div></div>
        <div class="kpi"><div class="label">Vuelven al día siguiente</div><div class="v">${m.retencion && m.retencion.d1 !== null ? m.retencion.d1 + '%' : '—'}</div><div class="s">Retención D1</div></div><div class="kpi"><div class="label">Vuelven a la semana</div><div class="v">${m.retencion && m.retencion.d7 !== null ? m.retencion.d7 + '%' : '—'}</div><div class="s">Retención D7${mt.ingresos ? ` · ingresos ${D.money(mt.ingresos)}` : ''}</div></div></div>
      <div class="label" style="margin:14px 0 6px">Jugadores por día</div><div class="bars mini">${dias.map(d => `<div class="b" title="${D.date(d)}: ${dau[d] || 0} jugadores"><div class="pair"><i class="in" style="height:${(dau[d] || 0) / max * 100}%;width:70%"></i></div><span class="m">${Number(d.slice(8))}</span></div>`).join('')}</div>
      ${niveles.length ? `<div class="label" style="margin:14px 0 6px">Niveles: dónde se atascan</div><div class="table-wrap"><table><thead><tr><th>Nivel</th><th class="num">Empezaron</th><th class="num">Terminaron</th><th class="num">Fallaron</th><th>Completan</th></tr></thead><tbody>${niveles.map(n => { const a = mt['nivel_inicio:' + n] || 0, f = mt['nivel_fin:' + n] || 0, x = mt['nivel_fallo:' + n] || 0, pct = a ? Math.round(f / a * 100) : 0; return `<tr><td>${esc(n)}</td><td class="num">${D.num(a)}</td><td class="num">${D.num(f)}</td><td class="num">${D.num(x)}</td><td><div class="progress ${pct < 40 ? 'over' : pct < 70 ? 'near' : ''}"><i style="width:${pct}%"></i></div><span class="sub">${pct}%</span></td></tr>`; }).join('')}</tbody></table></div>` : ''}
      ${eventos.length ? `<div class="label" style="margin:14px 0 6px">Eventos propios</div><div class="list">${eventos.map(([k, v]) => `<div class="item" style="cursor:default"><div class="t"><b>${esc(k.slice(7))}</b></div><span class="mono">${D.num(v)}</span></div>`).join('')}</div>` : ''}`;
  };

  // ───────────── portal del cliente: contratos por firmar y reporte ─────────────
  const prevInicio = D.views.inicio;
  D.views.inicio = async (el) => {
    await prevInicio(el);
    if (!isClient()) return;
    const d = (await D.try(() => D.call('dashboard'))) || {};
    const card = el.querySelector('.card.attention .list') || null;
    const pend = (d.contratos_por_firmar || []).map(c => `<div class="item" data-open="contratos:${c.id}"><div class="t"><b>${esc(c.titulo)}</b><span>Contrato · firma pendiente</span></div><span class="btn sm violet">Firmar</span></div>`).join('');
    if (pend) {
      if (card) { card.insertAdjacentHTML('afterbegin', pend); const b = card.closest('.card').querySelector('h2 .badge'); if (b) b.textContent = String(card.querySelectorAll('.item').length); }
      else el.querySelector('.page-head').insertAdjacentHTML('afterend', `<div class="card attention" style="margin-bottom:16px"><h2>Esperan tu respuesta</h2><div class="list">${pend}</div></div>`);
      el.querySelectorAll('[data-open^="contratos:"]').forEach(a => a.onclick = () => D.openRecord('contratos', a.dataset.open.split(':')[1]));
    }
    const acts = el.querySelector('.page-head .actions');
    if (acts && D.me.rol === 'cliente') { acts.insertAdjacentHTML('afterbegin', `<button class="btn" data-mi-reporte>${D.icon('pdf')} Mi reporte</button>`); acts.querySelector('[data-mi-reporte]').onclick = () => D.reporteMensual(null); }
  };
})(window.DOS);

// ───── vista completa del cliente y quién tiene cada servicio ─────
(function (D) {
  const esc = D.esc; const n = (x) => D.num(x || 0);
  const chip = (red) => `<span class="red-chip red-${String(red).toLowerCase()}">${esc(red)}</span>`;
  const link = (m, id, t) => `<a href="#" data-o="${m}:${esc(id)}">${esc(t)}</a>`;
  const sec = (titulo, cuerpo, extra = '') => `<div class="section" data-sec="${titulo.normalize('NFD').replace(/[^a-zA-Z ]/g, '').trim().split(' ')[0].toLowerCase()}"><h3>${titulo}${extra}</h3>${cuerpo}</div>`;
  const vacio = (t) => `<p class="muted small" style="margin:0">${t}</p>`;
  const fila = (izq, der = '') => `<div style="display:flex;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px solid var(--border)"><div>${izq}</div><div class="small" style="text-align:right;white-space:nowrap">${der}</div></div>`;
  const pct = (x) => x === null || x === undefined ? '—' : `${String(x).replace('.', ',')}%`;
  const delta = (x) => x === null || x === undefined ? '' : ` <span class="small" style="color:${x >= 0 ? 'var(--ok)' : 'var(--danger)'}">${x >= 0 ? '▲' : '▼'} ${String(Math.abs(x)).replace('.', ',')}%</span>`;

  function render(f) {
    const p = f.puede || {}; const out = [];
    const kpis = [];
    if (p.metricas && f.metricas) { const a = f.metricas.actual, c = f.metricas.cambio;
      kpis.push(`<div class="kpi"><div class="label">Seguidores</div><div class="v" style="font-size:22px">${n(a.seguidores)}</div><div class="s">${a.crecimiento >= 0 ? '+' : ''}${n(a.crecimiento)} en 30 días</div></div>`);
      kpis.push(`<div class="kpi"><div class="label">Interacciones · 30 días</div><div class="v" style="font-size:22px">${n(a.interacciones)}</div><div class="s">${pct(a.er_alcance)} eng.${delta(c.interacciones)}</div></div>`); }
    if (p.facturas && f.cobros) kpis.push(`<div class="kpi ${f.cobros.saldo > 0 ? 'alert' : ''}"><div class="label">Por cobrar</div><div class="v" style="font-size:22px">${D.money(f.cobros.saldo)}</div><div class="s">${f.cobros.por_verificar ? `${D.money(f.cobros.por_verificar)} por verificar` : 'Al día'}</div></div>`);
    if (p.planes && f.planes) { const act = f.planes.filter(x => x.estado === 'Activo'); kpis.push(`<div class="kpi"><div class="label">Planes activos</div><div class="v" style="font-size:22px">${act.length}</div><div class="s">${D.money(act.reduce((a, x) => a + x.monto, 0))} recurrente</div></div>`); }
    if (kpis.length) out.push(`<div class="grid g2" data-sec="cifras" style="margin-bottom:6px">${kpis.join('')}</div>`);
    out.push(sec('Servicios que tiene con nosotros', (f.servicios.length ? f.servicios.map(x => fila(`${D.canRead('catalogo') ? link('catalogo', x.id, x.nombre) : esc(x.nombre)}<span class="sub" style="display:block">${esc(x.categoria)}${x.entregables ? ' · ' + esc(x.entregables) : ''}</span>`, x.precio !== undefined ? D.money(x.precio) : '')).join('') : vacio(((D.meta.modules.find(m => m.key === 'clientes') || {}).level === 'W') ? 'Sin servicios marcados. Edita el cliente y marca los que tiene en "Servicios que tiene con nosotros".' : 'Sin servicios marcados.'))
      + (p.planes && f.planes && f.planes.length ? `<div class="label" style="margin:12px 0 4px">Planes y alquileres</div>${f.planes.map(x => fila(`${link('planes', x.id, x.nombre)}<span class="sub" style="display:block">${esc(x.tipo || '')} · ${esc(x.frecuencia || '')}</span>`, `${D.money(x.monto)}<br>${D.badge(x.estado)}${x.proximo_cobro ? `<span class="sub" style="display:block">cobro ${D.date(x.proximo_cobro)}</span>` : ''}`)).join('')}` : '')));
    if (p.cuentas) out.push(sec('Redes que manejamos', (f.redes || []).length ? f.redes.map(x => fila(`${chip(x.red)} ${link('cuentas', x.id, x.nombre || x.red)}<span class="sub" style="display:block">${esc(x.estado)}${x.m30 && !x.m30.vacio ? ` · ${n(x.m30.interacciones)} interacciones en 30 días` : ''}</span>`, `${n(x.seguidores)} seguidores${x.m30 && x.m30.crecimiento !== null && x.m30.crecimiento !== undefined ? `<span class="sub" style="display:block">${x.m30.crecimiento >= 0 ? '+' : ''}${n(x.m30.crecimiento)}</span>` : ''}`)).join('') : vacio('No hay redes conectadas para este cliente.'), p.metricas ? ` <button class="btn sm" data-360-metricas>${D.icon('metricas')} Ver sus métricas</button>` : ''));
    if (p.metas) out.push(sec('Metas', (f.metas || []).length ? f.metas.map(x => `<div style="padding:7px 0;border-bottom:1px solid var(--border)"><div style="display:flex;justify-content:space-between;gap:10px"><span>${link('metas', x.id, x.titulo)}</span>${D.badge(x._ritmo)}</div>
      <div class="progress ${x._ritmo === 'Atrasada' ? 'near' : ''}" style="margin-top:6px" title="${x._avance}%"><i style="width:${Math.min(100, x._avance || 0)}%"></i></div><span class="sub" style="display:block">${x._avance || 0}% · ${x._esperado}% del tiempo · cierra ${D.date(x.hasta)}</span></div>`).join('') : vacio('Sin metas. Crea una en Metas por cliente para medir el avance del mes.')));
    if (f.horas && f.horas.mejores && f.horas.mejores.length && D.textoHoras) out.push(sec('Mejor hora para publicar', `<p class="small" style="margin:0">${D.textoHoras(f.horas)}</p>`));
    if (p.proyectos) out.push(sec('Proyectos', (f.proyectos || []).length ? f.proyectos.map(x => fila(`${link('proyectos', x.id, x.nombre)}<span class="sub" style="display:block">${esc(x.servicio || '')}</span>`, `${D.badge(x.estado)}${x.avance !== null ? `<span class="sub" style="display:block">${x.avance}% · entrega ${D.date(x.entrega)}</span>` : ''}`)).join('') : vacio('Sin proyectos.')));
    if (p.redes && f.publicaciones) out.push(sec('Calendario de redes', (f.publicaciones.proximas.length ? f.publicaciones.proximas.map(x => fila(`${link('redes', x.id, x.titulo)}<span class="sub" style="display:block">${esc((x.redes || []).join(', '))}</span>`, `${D.datetime(x.fecha)}<br>${D.badge(x.estado)}`)).join('') : vacio('No hay publicaciones próximas.')) + `<p class="small muted" style="margin:8px 0 0">${f.publicaciones.publicadas_mes} publicadas este mes · ${f.publicaciones.por_aprobar} esperando aprobación del cliente</p>`));
    if (p.anuncios && (f.campanas || []).length) out.push(sec('Campañas de anuncios activas', f.campanas.map(x => fila(`${link('anuncios', x.id, x.nombre)}<span class="sub" style="display:block">${esc(x.plataforma || '')}</span>`, `${D.money(x.gastado)} de ${D.money(x.presupuesto)}<span class="sub" style="display:block">${n(x.resultados)} ${esc(x.tipo_resultado || 'resultados')}</span>`)).join('')));
    if (p.piezas && (f.piezas || []).length) out.push(sec('Piezas en curso', f.piezas.map(x => fila(link('piezas', x.id, x.titulo), `${D.badge(x.estado)}${x.fecha_limite ? `<span class="sub" style="display:block">${D.date(x.fecha_limite)}</span>` : ''}`)).join('')));
    if (p.facturas && f.cobros && f.cobros.pendientes.length) out.push(sec('Facturas por cobrar', f.cobros.pendientes.map(x => fila(`${link('facturas', x.id, x.codigo)}<span class="sub" style="display:block">${esc(x.concepto || '')}</span>`, `${D.money(x.saldo)}<span class="sub" style="display:block">${esc(x.estado)}${x.vence ? ' · vence ' + D.date(x.vence) : ''}</span>`)).join('')));
    if (p.cotizaciones && (f.cotizaciones || []).length) out.push(sec('Cotizaciones abiertas', f.cotizaciones.map(x => fila(`${link('cotizaciones', x.id, x.codigo)}<span class="sub" style="display:block">${esc(x.titulo || '')}</span>`, `${D.money(x.total)}<br>${D.badge(x.estado)}`)).join('')));
    if (p.contratos && (f.contratos || []).length) out.push(sec('Contratos', f.contratos.map(x => fila(`${link('contratos', x.id, x.titulo)}<span class="sub" style="display:block">${esc(x.tipo || '')}</span>`, `${D.badge(x.estado)}${x.vence ? `<span class="sub" style="display:block">vence ${D.date(x.vence)}</span>` : ''}`)).join('')));
    if (p.soporte && (f.solicitudes || []).length) out.push(sec('Solicitudes abiertas', f.solicitudes.map(x => fila(`${link('soporte', x.id, x.codigo)}<span class="sub" style="display:block">${esc(x.asunto || '')}</span>`, `${D.badge(x.estado)}${x.prioridad ? `<span class="sub" style="display:block">${esc(x.prioridad)}</span>` : ''}`)).join('')));
    return out.join('');
  }

  const prevCli = D.MOUNT.clientes;
  D.MOUNT.clientes = async (root, r) => {
    if (prevCli) prevCli(root, r);
    const box = root.querySelector('[data-ficha360]'); if (!box) return;
    const f = await D.try(() => D.call('fichaCliente', r.id)); if (!f) { box.innerHTML = ''; return; }
    box.innerHTML = render(f);
    box.querySelectorAll('[data-o]').forEach(a => a.onclick = (e) => { e.preventDefault(); const [m, i] = a.dataset.o.split(':'); D.openRecord(m, i); });
    const bm = box.querySelector('[data-360-metricas]'); if (bm) bm.onclick = () => { if (D.verMetricas) D.verMetricas({ client_id: r.id }); else { D.closeAll(); D.go('metricas'); } };
  };

  // Catálogo: quién tiene cada servicio
  const prevCat = D.DETAIL.catalogo;
  D.DETAIL.catalogo = (r) => { const base = prevCat ? prevCat(r) : {}; const ids = r._clientes_ids || [];
    return { ...base, bottom: `${base.bottom || ''}<div class="section"><h3>Clientes con este servicio · ${ids.length}</h3>${ids.length ? ids.map((id, i) => `<div style="padding:4px 0">${D.canRead('clientes') ? `<a href="#" data-open="clientes:${esc(id)}">${esc(r._clientes[i])}</a>` : esc(r._clientes[i])}</div>`).join('') : '<p class="muted small">Ningún cliente lo tiene marcado todavía. Se marca en la ficha de cada cliente.</p>'}${r._ingreso_planes ? `<p class="small" style="margin-top:8px">Planes activos con este servicio: <b>${D.money(r._ingreso_planes)}</b> recurrente.</p>` : ''}</div>` }; };
})(window.DOS);
