// Delirium OS 1.7 — prospección (Hoy, importar, plantillas, embudo), horarios flexibles, invitaciones sin correo,
// primer uso real, reportar problema, videos por enlace, medidor del plan gratis, competencia y comentarios negativos.
(function (D) {
  const esc = D.esc;
  const canW = (k) => (D.meta.modules.find(m => m.key === k) || {}).level === 'W';
  const isClient = () => ['cliente', 'cliente_eq'].includes(D.me.rol);
  const ETAPAS = ['Por contactar', 'Mensaje 1', 'Seguimiento 3 días', 'Seguimiento 7 días', 'Respondió', 'Llamada agendada', 'Prueba', 'Plan mensual', 'Descartado'];
  const TIPOS = ['Negocio', 'Agencia (marca blanca)', 'Streamer o creador', 'Estudio de juegos', 'Socio que recomienda'];
  const CANALES = ['DM de Instagram', 'Correo', 'WhatsApp', 'Recomendación'];
  const MOTIVOS = ['No respondió', 'Precio', 'Ya tiene agencia', 'No es buen momento', 'No le interesa', 'Fuera de nuestro perfil', 'Otro'];
  const DIAS = [['lun', 'Lunes'], ['mar', 'Martes'], ['mie', 'Miércoles'], ['jue', 'Jueves'], ['vie', 'Viernes']];
  const h12 = (t) => { const [h, m] = String(t).split(':').map(Number); return `${h % 12 || 12}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'a. m.' : 'p. m.'}`; };
  const corto = (t) => { const [h, m] = String(t).split(':').map(Number); return `${h % 12 || 12}${m ? ':' + String(m).padStart(2, '0') : ''}${h < 12 ? 'a' : 'p'}`; };
  const copiar = async (t, ok = 'Copiado.') => { try { await navigator.clipboard.writeText(t); D.toast(ok); return true; } catch (e) { D.toast('No se pudo copiar.', 'error'); return false; } };
  const mb = (b) => b >= 1073741824 ? `${(b / 1073741824).toFixed(2).replace('.', ',')} GB` : `${Math.round(b / 1048576 * 10) / 10} MB`.replace('.', ',');

  // ═════════════════════ campos nuevos ═════════════════════
  const meter = (mod, despues, campos) => { const fs = (D.SCHEMA[mod] || {}).fields; if (!fs) return; let i = fs.findIndex(f => f.key === despues); for (const c of campos) { if (fs.some(f => f.key === c.key)) continue; fs.splice(i >= 0 ? ++i : fs.length, 0, c); } };
  meter('clientes', 'origen', [
    { key: 'etapa', label: 'Etapa de prospección', type: 'select', options: ETAPAS, default: 'Por contactar' },
    { key: 'tipo_prospecto', label: 'Tipo', type: 'select', options: TIPOS, default: 'Negocio' },
    { key: 'canal', label: 'Canal de contacto', type: 'select', options: CANALES, default: 'DM de Instagram' },
    { key: 'motivo_descartado', label: 'Por qué se descartó', type: 'select', options: MOTIVOS, show: () => true },
    { key: 'rubro', label: 'Rubro', placeholder: 'Ej.: restaurante, barbería, clínica dental' },
    { key: 'ciudad', label: 'Ciudad' }, { key: 'pais', label: 'País', type: 'select', options: ['Estados Unidos', 'España', 'Panamá', 'Venezuela', 'México', 'Colombia', 'Otro'] },
    { key: 'zona_horaria', label: 'Zona horaria', type: 'select', options: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Panama', 'Europe/Madrid', 'America/Caracas', 'America/Bogota', 'America/Mexico_City'] },
    { key: 'detalle', label: 'Detalle para personalizar el mensaje', full: true, placeholder: 'Ej.: vi su reel del tres leches con 40 mil vistas' },
    { key: 'loom', label: 'Enlace del video de Loom', full: true },
    { key: 'ultimo_mensaje', label: 'Último mensaje', type: 'date' }, { key: 'proximo_seguimiento', label: 'Próximo seguimiento', type: 'date' },
    { key: 'competidores', label: 'Competidores en Instagram', full: true, placeholder: '@competidor1, @competidor2 (hasta 5)', hint: 'Para comparar sus números con los del cliente (solo cuentas profesionales).' },
  ]);
  const sc = D.SCHEMA.clientes; if (sc && !sc.columns.some(c => c.key === 'etapa')) sc.columns.splice(2, 0, { key: 'etapa', label: 'Prospección', render: r => r.etapa ? `${D.badge(r.etapa, r.etapa === 'Descartado' ? 'danger' : ['Prueba', 'Plan mensual'].includes(r.etapa) ? 'ok' : r.etapa === 'Respondió' || r.etapa === 'Llamada agendada' ? 'info' : 'warn')}${r.proximo_seguimiento ? `<span class="sub">seguimiento ${D.date(r.proximo_seguimiento)}</span>` : ''}` : '<span class="muted">—</span>' });

  // plantillas de mensajes
  D.SCHEMA.plantillas = {
    singular: 'plantilla', plural: 'plantillas', nuevo: 'Nueva plantilla', help: 'Mensajes de prospección listos para copiar, por tipo de prospecto y paso. Variables: [nombre], [negocio], [ciudad], [detalle]. El envío siempre es a mano: nada se manda solo por Instagram.',
    vacio: ['Sin plantillas', 'Crea tus mensajes base: primer mensaje, seguimiento a los 3 días y a los 7, para cada tipo de prospecto.'],
    filtro: { key: 'paso', values: ['Mensaje 1', 'Seguimiento 3 días', 'Seguimiento 7 días', 'Respuesta'] },
    columns: [{ key: 'nombre', label: 'Plantilla', render: r => `${esc(r.nombre)}<span class="sub">${esc(r.tipo_prospecto || 'Todos')} · ${esc(r.idioma || 'Español')}</span>` }, { key: 'paso', label: 'Paso', render: r => D.badge(r.paso, 'info') }, { key: 'texto', label: 'Texto', render: r => `<span class="small">${esc(String(r.texto || '').slice(0, 110))}…</span>` }],
    fields: [
      { key: 'nombre', label: 'Nombre', required: true, full: true, placeholder: 'Ej.: Restaurantes · primer mensaje' },
      { key: 'paso', label: 'Paso', type: 'select', options: ['Mensaje 1', 'Seguimiento 3 días', 'Seguimiento 7 días', 'Respuesta'], required: true, default: 'Mensaje 1' },
      { key: 'tipo_prospecto', label: 'Para', type: 'select', options: ['Todos', ...TIPOS], default: 'Todos' },
      { key: 'idioma', label: 'Idioma', type: 'select', options: ['Español', 'Inglés'], default: 'Español' },
      { key: 'texto', label: 'Mensaje', type: 'textarea', required: true, hint: 'Usa [nombre], [negocio], [ciudad] y [detalle]: se reemplazan al copiar.' },
      { key: 'activa', label: 'Activa', type: 'checkbox', default: true },
    ],
  };
  const rellenar = (t, p) => String(t || '').replace(/\[nombre\]/gi, (p.contacto || p.nombre || '').split(' ')[0] || '').replace(/\[negocio\]/gi, p.nombre || '').replace(/\[ciudad\]/gi, p.ciudad || 'tu ciudad').replace(/\[detalle\]/gi, p.detalle || '');
  const pasoDe = (etapa) => etapa === 'Por contactar' ? 'Mensaje 1' : etapa === 'Mensaje 1' ? 'Seguimiento 3 días' : etapa === 'Seguimiento 3 días' ? 'Seguimiento 7 días' : 'Respuesta';
  const plantillaPara = (pls, p) => pls.filter(x => x.paso === pasoDe(p.etapa) && (!x.tipo_prospecto || x.tipo_prospecto === 'Todos' || x.tipo_prospecto === p.tipo_prospecto)).sort((a, b) => (b.tipo_prospecto === p.tipo_prospecto) - (a.tipo_prospecto === p.tipo_prospecto));
  const perfil = (p) => p.instagram ? `https://www.instagram.com/${String(p.instagram).replace(/^@/, '')}/` : p.telefono ? `https://wa.me/${String(p.telefono).replace(/[^\d]/g, '')}` : '';

  // ═════════════════════ Hoy · prospección ═════════════════════
  let TAB = 'hoy'; const HF = { tipo: '', solo_mios: false };
  D.views.hoy = async (el) => {
    const tabs = [['hoy', 'Hoy'], ['embudo', 'Embudo semanal'], ['importar', 'Importar prospectos']];
    el.innerHTML = `<div class="page">${D.pageHead('Hoy · prospección', 'Los mensajes por enviar y los seguimientos que tocan hoy. Copias el mensaje, abres el perfil, lo envías tú y marcas "Enviado": la app agenda sola el siguiente seguimiento.', canW('plantillas') ? `<button class="btn" data-go-pl>Plantillas</button>` : '')}
      <div class="seg tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" aria-selected="${TAB === k}" class="${TAB === k ? 'on' : ''}" data-tab="${k}">${l}</button>`).join('')}</div><div data-body style="margin-top:16px"></div></div>`;
    el.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { TAB = b.dataset.tab; D.views.hoy(el); });
    const gp = el.querySelector('[data-go-pl]'); if (gp) gp.onclick = () => D.go('plantillas');
    const body = el.querySelector('[data-body]');
    if (TAB === 'embudo') return embudo(body);
    if (TAB === 'importar') return importar(body);
    const d = await D.try(() => D.call('hoyProspeccion', HF)); if (!d) return;
    const pct = Math.min(100, Math.round(d.hechos / d.meta * 100));
    const fila = (p, seg) => { const pl = plantillaPara(d.plantillas, p)[0];
      return `<div class="pros" data-p="${esc(p.id)}"><div class="pros-main"><b>${esc(p.nombre)}</b> ${p.instagram ? `<span class="small muted">${esc(p.instagram)}</span>` : ''}
        <span class="sub" style="display:block">${[p.tipo_prospecto, p.rubro, p.ciudad, p.pais].filter(Boolean).map(esc).join(' · ')}${seg ? ` · ${esc(p.etapa)} · ${p.atrasado ? `<span style="color:var(--danger)">atrasado desde ${D.date(p.proximo_seguimiento)}</span>` : 'hoy'}` : ''}</span>
        ${pl ? `<div class="small pros-msg">${esc(rellenar(pl.texto, p)).slice(0, 220)}${rellenar(pl.texto, p).length > 220 ? '…' : ''}</div>` : `<div class="small muted pros-msg">No hay plantilla para "${esc(pasoDe(p.etapa))}" de ${esc(p.tipo_prospecto)}.</div>`}</div>
        <div class="pros-acts">${pl ? `<button class="btn sm" data-copiar>Copiar</button>` : ''}${perfil(p) ? `<button class="btn sm" data-perfil>Abrir perfil</button>` : ''}${p.loom ? `<button class="btn sm ghost" data-loom>Loom</button>` : ''}
          <button class="btn sm primary" data-enviado>Enviado</button><button class="btn sm ghost" data-mas title="Respondió, llamada o descartar">Más…</button></div></div>`; };
    body.innerHTML = `<div class="grid g3" style="margin-bottom:16px"><div class="kpi ${d.hechos >= d.meta ? '' : 'alert'}"><div class="label">Mensajes de hoy</div><div class="v">${d.hechos} de ${d.meta}</div><div class="progress" style="margin-top:8px"><i style="width:${pct}%"></i></div></div>
        <div class="kpi"><div class="label">Seguimientos que tocan</div><div class="v">${d.seguimientos.length}</div><div class="s">${d.seguimientos.filter(x => x.atrasado).length} atrasados</div></div>
        <div class="kpi"><div class="label">Por contactar en la lista</div><div class="v">${d.nuevos.length}</div><div class="s">${d.nuevos.length ? 'Empieza por los de arriba' : 'Importa más prospectos'}</div></div></div>
      <div class="toolbar"><select class="input" data-hf="tipo" style="width:auto"><option value="">Todos los tipos</option>${TIPOS.map(t => `<option ${HF.tipo === t ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select><label class="small"><input type="checkbox" data-hf="solo_mios" ${HF.solo_mios ? 'checked' : ''}> Solo los míos</label></div>
      <div class="card" style="margin-bottom:16px"><h2>Seguimientos de hoy</h2>${d.seguimientos.length ? d.seguimientos.map(p => fila(p, true)).join('') : '<p class="muted" style="margin:0">Nada pendiente. 🎉</p>'}</div>
      ${!d.plantillas.length && canW('plantillas') ? `<div class="note" style="margin-bottom:16px">Todavía no hay plantillas de mensajes. <button class="btn sm" data-pl-base>Crear plantillas base (español e inglés)</button></div>` : ''}
      <div class="card"><h2>Mensajes nuevos</h2>${d.nuevos.length ? d.nuevos.map(p => fila(p, false)).join('') : '<p class="muted" style="margin:0">No quedan prospectos "Por contactar". Importa una lista en la pestaña de al lado.</p>'}
      <p class="small muted">El envío es siempre manual desde tu teléfono o computadora: automatizar mensajes directos en Instagram puede bloquear la cuenta.</p></div>`;
    const plb = body.querySelector('[data-pl-base]'); if (plb) plb.onclick = async () => { if (await D.try(() => D.call('crearPlantillasBase'), 'Plantillas creadas: ajústalas a tu estilo en Plantillas de mensajes.')) D.views.hoy(el); };
    body.querySelectorAll('[data-hf]').forEach(i => i.onchange = () => { HF[i.dataset.hf] = i.type === 'checkbox' ? i.checked : i.value; D.views.hoy(el); });
    const todos = [...d.seguimientos, ...d.nuevos];
    body.querySelectorAll('[data-p]').forEach(row => { const p = todos.find(x => x.id === row.dataset.p); const pl = plantillaPara(d.plantillas, p)[0]; const q = (s) => row.querySelector(s);
      if (q('[data-copiar]')) q('[data-copiar]').onclick = () => copiar(rellenar(pl.texto, p), 'Mensaje copiado: pégalo en el chat.');
      if (q('[data-perfil]')) q('[data-perfil]').onclick = () => window.dos.openExternal(perfil(p));
      if (q('[data-loom]')) q('[data-loom]').onclick = () => window.dos.openExternal(p.loom);
      q('[data-enviado]').onclick = async () => { if (await D.try(() => D.call('marcarMensaje', { id: p.id, plantilla: pl ? pl.nombre : '' }))) { D.toast(`Listo. ${p.etapa === 'Por contactar' ? 'Seguimiento agendado en 3 días.' : p.etapa === 'Mensaje 1' ? 'Último seguimiento en 4 días.' : 'Secuencia terminada.'}`); D.views.hoy(el); } };
      q('[data-mas]').onclick = async () => {
        const v = await D.modal({ title: p.nombre, body: `<div class="form">${D.fieldHtml({ key: 'accion', label: '¿Qué pasó?', type: 'select', options: [{ value: 'respondio', label: 'Respondió' }, { value: 'llamada', label: 'Agendó una llamada' }, { value: 'posponer', label: 'Posponer 1 día' }, { value: 'descartar', label: 'Descartar' }], full: true })}${D.fieldHtml({ key: 'fecha', label: 'Fecha de la llamada', type: 'date' })}${D.fieldHtml({ key: 'motivo', label: 'Motivo (si se descarta)', type: 'select', options: MOTIVOS })}</div>`, buttons: [{ label: 'Cancelar' }, { label: 'Guardar', kind: 'primary', value: (m) => D.readForm(m) }] });
        if (v && await D.try(() => D.call('marcarMensaje', { id: p.id, ...v }), 'Guardado.')) D.views.hoy(el);
      };
    });
  };
  async function embudo(body) {
    const d = await D.try(() => D.call('embudo', { tipo: HF.tipo, semanas: 6 })); if (!d) return;
    const a = d.actual, b = d.anterior; const PASOS = [['mensajes', 'Mensajes'], ['respuestas', 'Respuestas'], ['llamadas', 'Llamadas'], ['pruebas', 'Pruebas'], ['planes', 'Planes mensuales']];
    const conv = ['respuesta', 'llamada', 'prueba', 'plan'];
    const delta = (x, y) => y ? `<span class="small" style="color:${x >= y ? 'var(--ok)' : 'var(--danger)'}">${x >= y ? '▲' : '▼'} ${Math.abs(x - y)} vs semana anterior</span>` : '<span class="small muted">sin datos la semana anterior</span>';
    const max = Math.max(1, a.mensajes);
    body.innerHTML = `<div class="toolbar"><select class="input" data-hf="tipo" style="width:auto"><option value="">Todos los tipos</option>${TIPOS.map(t => `<option ${HF.tipo === t ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select><span class="small muted">Semana del ${D.date(a.desde)} al ${D.date(a.hasta)}</span></div>
      <div class="card"><h2>Embudo de esta semana</h2>${PASOS.map(([k, l], i) => `<div class="emb"><div class="emb-l"><b>${l}</b><br>${delta(a[k], b[k])}</div><div class="emb-b"><i style="width:${Math.max(2, a[k] / max * 100)}%"></i><span>${a[k]}</span></div><div class="emb-c">${i ? (a.conversion[conv[i - 1]] !== null ? `${String(a.conversion[conv[i - 1]]).replace('.', ',')}%<span class="sub">del paso anterior</span>` : '—') : ''}</div></div>`).join('')}
        <p class="small muted" style="margin-bottom:0">De mensaje a plan mensual: <b>${a.conversion.total !== null ? String(a.conversion.total).replace('.', ',') + '%' : '—'}</b> (semana anterior: ${b.conversion.total !== null ? String(b.conversion.total).replace('.', ',') + '%' : '—'}).</p></div>
      <div class="grid g2" style="margin-top:16px;align-items:start"><div class="card"><h2>Últimas 6 semanas</h2>${D.table([{ key: 'desde', label: 'Semana', render: x => D.date(x.desde) }, { key: 'mensajes', label: 'Mensajes', num: true }, { key: 'respuestas', label: 'Resp.', num: true }, { key: 'llamadas', label: 'Llamadas', num: true }, { key: 'pruebas', label: 'Pruebas', num: true }, { key: 'planes', label: 'Planes', num: true }], d.historia.slice().reverse())}</div>
        <div class="card"><h2>Por qué se perdieron</h2>${Object.keys(a.motivos).length || Object.keys(b.motivos).length ? Object.entries({ ...b.motivos, ...a.motivos }).map(([k]) => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border)"><span>${esc(k)}</span><b>${a.motivos[k] || 0}</b></div>`).join('') : '<p class="muted">Sin descartes esta semana.</p>'}</div></div>`;
    body.querySelector('[data-hf]').onchange = (e) => { HF.tipo = e.target.value; embudo(body); };
  }
  // ── importar CSV o Excel ──
  const CAMPOS_IMP = [['nombre', 'Nombre del negocio'], ['instagram', 'Usuario de Instagram'], ['telefono', 'Teléfono / WhatsApp'], ['email', 'Correo'], ['rubro', 'Rubro'], ['ciudad', 'Ciudad'], ['pais', 'País'], ['zona_horaria', 'Zona horaria'], ['tipo_prospecto', 'Tipo'], ['canal', 'Canal'], ['loom', 'Video de Loom'], ['detalle', 'Detalle'], ['notas', 'Notas'], ['web', 'Web']];
  // Lector mínimo de .xlsx (es un zip con XML): primera hoja, sin librerías externas.
  async function leerXlsx(buf) {
    const dv = new DataView(buf); const u8 = new Uint8Array(buf); let eocd = -1;
    for (let i = u8.length - 22; i >= Math.max(0, u8.length - 65557); i--) if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
    if (eocd < 0) throw new Error('No es un archivo .xlsx');
    const n = dv.getUint16(eocd + 10, true); let p = dv.getUint32(eocd + 16, true); const ent = {};
    for (let k = 0; k < n; k++) { const met = dv.getUint16(p + 10, true), csz = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), el = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), off = dv.getUint32(p + 42, true);
      ent[new TextDecoder().decode(u8.subarray(p + 46, p + 46 + nl))] = { met, csz, off }; p += 46 + nl + el + cl; }
    const leer = async (nombre) => { const e = ent[nombre]; if (!e) return null; const l = e.off + 30 + dv.getUint16(e.off + 26, true) + dv.getUint16(e.off + 28, true); const datos = u8.subarray(l, l + e.csz);
      const raw = e.met === 0 ? datos : new Uint8Array(await new Response(new Blob([datos]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer()); return new DOMParser().parseFromString(new TextDecoder().decode(raw), 'application/xml'); };
    const ss = await leer('xl/sharedStrings.xml'); const comp = ss ? [...ss.getElementsByTagName('si')].map(si => [...si.getElementsByTagName('t')].map(t => t.textContent).join('')) : [];
    const libro = await leer('xl/workbook.xml'); const rels = await leer('xl/_rels/workbook.xml.rels');
    let ruta = 'xl/worksheets/sheet1.xml'; try { const rid = libro.getElementsByTagName('sheet')[0].getAttribute('r:id'); const t = [...rels.getElementsByTagName('Relationship')].find(r => r.getAttribute('Id') === rid).getAttribute('Target'); ruta = 'xl/' + t.replace(/^\/?xl\//, ''); } catch (e) {}
    const hoja = await leer(ruta); if (!hoja) throw new Error('Sin hoja');
    const col = (ref) => { let c = 0; for (const ch of ref.replace(/\d+/g, '')) c = c * 26 + ch.charCodeAt(0) - 64; return c - 1; };
    return [...hoja.getElementsByTagName('row')].map(r => { const fila = []; for (const c of r.getElementsByTagName('c')) { const t = c.getAttribute('t'); const v = c.getElementsByTagName('v')[0]; const is = c.getElementsByTagName('is')[0];
      fila[col(c.getAttribute('r') || 'A1')] = t === 's' ? comp[Number(v && v.textContent)] || '' : t === 'inlineStr' ? (is ? is.textContent : '') : (v ? v.textContent : ''); } return Array.from(fila, x => x || ''); }).filter(r => r.some(x => String(x).trim()));
  }
  function parseCSV(txt) {
    const sep = (txt.split('\n')[0].match(/;/g) || []).length > (txt.split('\n')[0].match(/,/g) || []).length ? ';' : txt.split('\n')[0].includes('\t') ? '\t' : ',';
    const filas = []; let f = [], c = '', q = false;
    for (let i = 0; i < txt.length; i++) { const ch = txt[i];
      if (q) { if (ch === '"' && txt[i + 1] === '"') { c += '"'; i++; } else if (ch === '"') q = false; else c += ch; }
      else if (ch === '"') q = true; else if (ch === sep) { f.push(c); c = ''; } else if (ch === '\n' || ch === '\r') { if (ch === '\r' && txt[i + 1] === '\n') i++; f.push(c); if (f.some(x => x.trim())) filas.push(f); f = []; c = ''; } else c += ch; }
    f.push(c); if (f.some(x => x.trim())) filas.push(f); return filas;
  }
  const adivinar = (h) => { const n = String(h).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    return /insta|^ig$|usuario|handle/.test(n) ? 'instagram' : /tel|whats|movil|celular|phone/.test(n) ? 'telefono' : /mail|correo/.test(n) ? 'email' : /rubro|categ|industr|sector/.test(n) ? 'rubro' : /ciudad|city/.test(n) ? 'ciudad' : /pais|country/.test(n) ? 'pais' : /zona|timezone/.test(n) ? 'zona_horaria' : /tipo|type/.test(n) ? 'tipo_prospecto' : /canal/.test(n) ? 'canal' : /loom/.test(n) ? 'loom' : /detalle|gancho/.test(n) ? 'detalle' : /nota/.test(n) ? 'notas' : /web|sitio|url/.test(n) ? 'web' : /nombre|negocio|empresa|name|business/.test(n) ? 'nombre' : ''; };
  async function importar(body) {
    body.innerHTML = `<div class="card"><h2>Importar prospectos</h2><p class="muted" style="margin-top:0">Sube un archivo CSV o Excel (.xlsx; si es .xls viejo, guárdalo como .xlsx o CSV) con una fila por negocio. Después eliges qué columna es cada dato, ves la vista previa y la app avisa los duplicados (mismo Instagram, teléfono, correo o nombre + ciudad).</p>
      <input type="file" accept=".csv,.txt,.xlsx" data-imp-file class="input" style="max-width:420px"><div data-imp-paso style="margin-top:16px"></div></div>`;
    const paso = body.querySelector('[data-imp-paso]');
    body.querySelector('[data-imp-file]').onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return; let filas;
      try {
        if (/\.xlsx$/i.test(f.name)) filas = await leerXlsx(await f.arrayBuffer());
        else filas = parseCSV(await f.text());
      } catch (x) { return D.toast('No se pudo leer el archivo. Guárdalo como CSV o Excel e intenta otra vez.', 'error'); }
      if (filas.length < 2) return D.toast('El archivo no tiene filas de datos.', 'error');
      const cab = filas[0].map(String); const datos = filas.slice(1);
      paso.innerHTML = `<h3>1. ¿Qué es cada columna?</h3><div class="grid g3">${cab.map((h, i) => `<div class="field"><label>${esc(h || `Columna ${i + 1}`)}</label><select class="input" data-col="${i}"><option value="">(no importar)</option>${CAMPOS_IMP.map(([k, l]) => `<option value="${k}" ${adivinar(h) === k ? 'selected' : ''}>${l}</option>`).join('')}</select><span class="hint">Ej.: ${esc(String((datos[0] || [])[i] || '').slice(0, 40))}</span></div>`).join('')}</div>
        <div class="grid g3" style="margin-top:10px"><div class="field"><label>Tipo para todos (si la columna no existe)</label><select class="input" data-tipo-def>${TIPOS.map(t => `<option>${esc(t)}</option>`).join('')}</select></div><div class="field"><label>Si ya existe</label><select class="input" data-dup><option value="saltar">Saltarlo</option><option value="actualizar">Completar los datos que le falten</option></select></div></div>
        <button class="btn" data-prev-imp style="margin-top:12px">2. Ver vista previa</button><div data-imp-res style="margin-top:14px"></div>`;
      const leer = () => { const map = [...paso.querySelectorAll('[data-col]')].map(s => s.value); const tipo = paso.querySelector('[data-tipo-def]').value;
        return datos.map(r => { const o = {}; map.forEach((k, i) => { if (k && String(r[i] || '').trim()) o[k] = String(r[i]).trim(); }); if (!o.tipo_prospecto) o.tipo_prospecto = tipo; return o; }); };
      paso.querySelector('[data-prev-imp]').onclick = async () => {
        if (![...paso.querySelectorAll('[data-col]')].some(s => s.value === 'nombre' || s.value === 'instagram')) return D.toast('Elige al menos la columna del nombre o del Instagram.', 'error');
        const res = await D.try(() => D.call('importarProspectos', leer(), { aplicar: false })); if (!res) return;
        const box = paso.querySelector('[data-imp-res]');
        box.innerHTML = `<div class="grid g3"><div class="kpi"><div class="label">Nuevos</div><div class="v">${res.nuevos}</div></div><div class="kpi ${res.duplicados ? 'alert' : ''}"><div class="label">Duplicados</div><div class="v">${res.duplicados}</div></div><div class="kpi"><div class="label">Con error</div><div class="v">${res.errores}</div></div></div>
          <div class="table-wrap" style="max-height:320px;overflow:auto;margin-top:12px">${D.table([{ key: 'fila', label: 'Fila', num: true }, { key: 'nombre', label: 'Nombre', render: x => esc(x.nombre || '—') }, { key: 'estado', label: 'Resultado', render: x => D.badge(x.estado === 'nuevo' ? 'Nuevo' : x.estado === 'duplicado' ? 'Duplicado' : 'Error', x.estado === 'nuevo' ? 'ok' : x.estado === 'duplicado' ? 'warn' : 'danger') }, { key: 'motivo', label: 'Detalle', render: x => `<span class="small">${esc(x.motivo || '')}</span>` }], res.filas.slice(0, 200))}</div>
          <button class="btn primary" data-aplicar style="margin-top:12px" ${res.nuevos || paso.querySelector('[data-dup]').value === 'actualizar' ? '' : 'disabled'}>3. Importar ${res.nuevos} prospectos</button>`;
        box.querySelector('[data-aplicar]').onclick = async () => { const r = await D.try(() => D.call('importarProspectos', leer(), { aplicar: true, duplicados: paso.querySelector('[data-dup]').value })); if (r) { D.toast(`${D.pl(r.nuevos, 'prospecto importado', 'prospectos importados')}${r.actualizados ? ` · ${r.actualizados} completados` : ''}.`); D.refreshRefs(); TAB = 'hoy'; D.go('hoy'); } };
      };
    };
  }

  // ═════════════════════ horarios flexibles ═════════════════════
  D.editarHorario = async (persona) => {
    const d = await D.try(() => D.call('horarios')); if (!d) return;
    const yo = persona ? d.personas.find(x => x.id === persona) : d.personas.find(x => x.yo); if (!yo) return D.toast('No encontramos el horario.', 'error');
    const h = yo.horario; const inp = (dia, i, k, v) => `<input class="input" type="time" step="900" min="06:00" max="22:00" data-h="${dia}:${i}:${k}" value="${esc(v || '')}" style="width:112px;display:inline-block">`;
    const v = await D.modal({ title: `Horario de ${yo.nombre.replace(' (ejemplo)', '')}`, wide: true, body: `<p class="small muted" style="margin-top:0">Lunes a viernes, en hora de Venezuela. Cada quien arma su horario${d.nucleo ? `, cubriendo las horas núcleo del equipo (${h12(d.nucleo.d)} a ${h12(d.nucleo.h)})` : ''}. Deja vacío un bloque si no lo usas.</p>
      <div class="table-wrap"><table><thead><tr><th>Día</th><th>Bloque 1</th><th>Bloque 2</th><th class="num">Horas</th></tr></thead><tbody>${DIAS.map(([k, l]) => `<tr><td><b>${l}</b></td><td style="white-space:nowrap">${inp(k, 0, 'd', (h[k] || [])[0]?.d)} a ${inp(k, 0, 'h', (h[k] || [])[0]?.h)}</td><td style="white-space:nowrap">${inp(k, 1, 'd', (h[k] || [])[1]?.d)} a ${inp(k, 1, 'h', (h[k] || [])[1]?.h)}</td><td class="num" data-tot="${k}"></td></tr>`).join('')}</tbody></table></div>
      <div style="display:flex;gap:8px;align-items:center;margin-top:10px;flex-wrap:wrap"><button class="btn sm" type="button" data-copiar-lunes>Copiar el lunes a todos los días</button><button class="btn sm ghost" type="button" data-base>Usar el horario base</button><span class="small" style="margin-left:auto">Total: <b data-total></b></span></div>`,
      onMount: (m) => {
        const leer = () => Object.fromEntries(DIAS.map(([k]) => [k, [0, 1].map(i => ({ d: m.querySelector(`[data-h="${k}:${i}:d"]`).value, h: m.querySelector(`[data-h="${k}:${i}:h"]`).value })).filter(b => b.d && b.h)]));
        const tot = () => { let t = 0; const x = leer(); for (const [k] of DIAS) { const hs = x[k].reduce((a, b) => a + Math.max(0, (Date.parse(`2000-01-01T${b.h}`) - Date.parse(`2000-01-01T${b.d}`)) / 36e5), 0); t += hs; m.querySelector(`[data-tot="${k}"]`).textContent = `${String(Math.round(hs * 10) / 10).replace('.', ',')} h`; } m.querySelector('[data-total]').textContent = `${String(Math.round(t * 10) / 10).replace('.', ',')} h por semana`; };
        m.querySelectorAll('[data-h]').forEach(i => i.oninput = tot); tot(); m._leer = leer;
        m.querySelector('[data-copiar-lunes]').onclick = () => { for (const [k] of DIAS.slice(1)) for (const i of [0, 1]) for (const c of ['d', 'h']) m.querySelector(`[data-h="${k}:${i}:${c}"]`).value = m.querySelector(`[data-h="lun:${i}:${c}"]`).value; tot(); };
        m.querySelector('[data-base]').onclick = () => { for (const [k] of DIAS) for (const i of [0, 1]) for (const c of ['d', 'h']) m.querySelector(`[data-h="${k}:${i}:${c}"]`).value = ((d.base[k] || [])[i] || {})[c] || ''; tot(); };
      },
      buttons: [{ label: 'Cancelar' }, { label: 'Guardar horario', kind: 'primary', value: async (m) => { try { return await D.call('guardarHorario', { usuario_id: yo.id, horario: m._leer() }); } catch (e) { D.toast(e.message, 'error'); return false; } } }] });
    if (v) { D.toast(`Horario guardado: ${String(v.horas_semana).replace('.', ',')} h por semana.`); return true; }
    return false;
  };
  D.pintarHorarios = async (box) => {
    const d = await D.try(() => D.call('horarios')); if (!d || !box) return;
    const ahora = d.personas.filter(x => x.trabajando);
    const barra = (bloques) => `<div class="hor-barra">${bloques.map(b => { const ini = (Date.parse(`2000-01-01T${b.d}`) - Date.parse('2000-01-01T06:00')) / 36e5 / 16 * 100; const w = (Date.parse(`2000-01-01T${b.h}`) - Date.parse(`2000-01-01T${b.d}`)) / 36e5 / 16 * 100; return `<i style="left:${ini}%;width:${w}%" title="${h12(b.d)} a ${h12(b.h)}"></i>`; }).join('')}</div>`;
    box.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><h2 style="margin:0">Horarios del equipo</h2><button class="btn sm" data-mi-horario>Editar mi horario</button></div>
      <p class="small muted">Lunes a viernes, hora de Venezuela (son las ${h12(d.ahora)}). ${ahora.length ? `Trabajando ahora: <b>${ahora.map(x => esc(x.nombre.replace(' (ejemplo)', ''))).join(', ')}</b>.` : 'Nadie está en su horario ahora.'}</p>
      <div class="table-wrap"><table class="hor-tabla"><thead><tr><th>Persona</th>${DIAS.map(([, l]) => `<th>${l.slice(0, 3)}</th>`).join('')}<th class="num">h/sem</th></tr></thead><tbody>${d.personas.map(x => `<tr ${D.isAdmin() || canW('empleados') ? `data-hp="${esc(x.id)}" style="cursor:pointer"` : ''}><td><b>${esc(x.nombre.replace(' (ejemplo)', ''))}</b>${x.trabajando ? ' <span class="badge ok">ahora</span>' : x.ausente ? ` <span class="badge warn">${esc(x.ausente)}</span>` : ''}<span class="sub">${x.propio ? 'horario propio' : 'horario base'}</span></td>${DIAS.map(([k]) => `<td>${barra(x.horario[k] || [])}<span class="sub" style="white-space:nowrap">${(x.horario[k] || []).map(b => `${corto(b.d)}–${corto(b.h)}`).join(' · ') || 'libre'}</span></td>`).join('')}<td class="num">${String(x.horas_semana).replace('.', ',')}</td></tr>`).join('')}</tbody></table></div>`;
    box.querySelector('[data-mi-horario]').onclick = async () => { if (await D.editarHorario()) D.pintarHorarios(box); };
    box.querySelectorAll('[data-hp]').forEach(tr => tr.onclick = async () => { if (await D.editarHorario(tr.dataset.hp)) D.pintarHorarios(box); });
  };
  const prevCarga = D.views.carga;
  D.views.carga = async (el) => { await prevCarga(el); const pg = el.querySelector('.page'); if (!pg) return; const box = document.createElement('div'); box.className = 'card'; box.style.marginTop = '16px'; pg.appendChild(box); D.pintarHorarios(box); };

  // ═════════════════════ invitación de un solo uso ═════════════════════
  const prevActEq = D.ACTIONS.equipo;
  D.ACTIONS.equipo = (r) => `${prevActEq ? prevActEq(r) : ''}${canW('equipo') ? `<button class="btn" data-act="invitar">Copiar invitación</button>` : ''}`;
  D.HANDLERS.invitar = async (r) => {
    const i = await D.try(() => D.call('crearInvitacion', { id: r.id, horas: 72 })); if (!i) return;
    const msg = `Hola ${i.nombre.split(' ')[0]}, te damos acceso a Delirium OS.\n\n1. Abre este enlace (vale 3 días y sirve una sola vez): ${i.enlace}\n2. Elige tu contraseña.\n\nSi usas la app de escritorio: en la pantalla de entrada pulsa "Tengo un código de invitación" y pega: ${i.codigo}\nTu correo de acceso: ${i.email}`;
    await D.modal({ title: 'Invitación lista', body: `<p style="margin-top:0">Mándala por WhatsApp. Sirve <b>una sola vez</b> y vence el <b>${D.datetime(i.vence)}</b>. También sirve para que alguien que olvidó su contraseña elija una nueva.</p><pre class="code" style="white-space:pre-wrap">${esc(msg)}</pre>`,
      onMount: (m) => { const b = document.createElement('button'); b.className = 'btn'; b.textContent = 'Abrir WhatsApp'; b.onclick = () => window.dos.openExternal(`https://wa.me/?text=${encodeURIComponent(msg)}`); m.querySelector('.mf').prepend(b); },
      buttons: [{ label: 'Cerrar' }, { label: 'Copiar mensaje', kind: 'primary', value: async () => { await copiar(msg, 'Invitación copiada.'); return true; } }] });
  };
  // pantalla para canjear la invitación (enlace #invitacion=… o código pegado)
  D.pantallaInvitacion = async (root, token, volver) => {
    let info = null; try { info = await D.call('verInvitacion', token); } catch (e) { info = { error: e.message }; }
    root.innerHTML = `<div class="auth"><div class="panel"><form novalidate><div><span class="label">${esc((info && info.empresa) || 'Delirium Studios')}</span><h1>${info.error ? 'Invitación no válida' : `Hola, ${esc(info.nombre.split(' ')[0])}`}</h1></div>
      ${info.error ? `<p class="sub">${esc(info.error)}</p>` : `<p class="sub">Elige tu contraseña para entrar a Delirium OS. Tu correo de acceso es <b>${esc(info.email)}</b>.</p>${D.fieldHtml({ key: 'password', label: 'Nueva contraseña (mínimo 8)', type: 'password', required: true })}${D.fieldHtml({ key: 'password2', label: 'Repítela', type: 'password', required: true })}`}
      <div class="err" role="alert"></div>${info.error ? '' : '<button class="btn primary" type="submit">Entrar</button>'}<button class="btn ghost" type="button" data-volver>Volver a la entrada</button></form></div></div>`;
    root.querySelector('[data-volver]').onclick = () => { history.replaceState(null, '', location.pathname); volver(); };
    const f = root.querySelector('form'); f.onsubmit = async (e) => { e.preventDefault(); const v = D.readForm(f); if (!v) return; if (v.password !== v.password2) { f.querySelector('.err').textContent = 'Las contraseñas no coinciden.'; return; }
      try { const me = await D.call('canjearInvitacion', token, v.password); history.replaceState(null, '', location.pathname); D._start(me); } catch (x) { f.querySelector('.err').textContent = x.message; } };
  };

  // ═════════════════════ primer uso real ═════════════════════
  D.primerUsoReal = async () => {
    const ok = await D.modal({ title: 'Empezar con datos reales', wide: true, body: `<ol style="padding-left:18px;margin-top:0;line-height:1.7"><li>Se <b>borran todos los datos de ejemplo</b>: clientes, proyectos, facturas, cuentas "(ejemplo)" del equipo, etc. Tu cuenta, los manuales y el registro de actividad se quedan.</li><li>Completas los datos del estudio.</li><li>Creas tu primer cliente real, su acceso al portal y su primera pieza.</li></ol>
      <div class="form">${D.fieldHtml({ key: 'empresa', label: 'Nombre del estudio', required: true }, { empresa: D.settings.empresa })}${D.fieldHtml({ key: 'rif', label: 'RIF / ID fiscal' }, D.settings)}${D.fieldHtml({ key: 'telefono', label: 'Teléfono / WhatsApp' }, D.settings)}${D.fieldHtml({ key: 'correo', label: 'Correo del estudio', type: 'email' }, { correo: D.settings.correo_general })}
      ${D.fieldHtml({ key: 'confirmar', label: 'Escribe BORRAR para confirmar', required: true, full: true })}</div>`, buttons: [{ label: 'Cancelar' }, { label: 'Borrar ejemplos y seguir', kind: 'danger', value: (m) => D.readForm(m) }] });
    if (!ok) return; const r = await D.try(() => D.call('primerUsoReal', ok)); if (!r) return;
    D.settings = await D.call('settings'); D.directory = await D.call('directory'); await D.refreshRefs(); D.toast(`Listo: se borraron ${r.borrados} registros de ejemplo.`);
    // paso 2: primer cliente
    const c = await D.modal({ title: 'Tu primer cliente', body: `<div class="form">${D.fieldHtml({ key: 'nombre', label: 'Nombre del negocio', required: true, full: true })}${D.fieldHtml({ key: 'contacto', label: 'Nombre de la persona' })}${D.fieldHtml({ key: 'email', label: 'Correo (será su usuario del portal)', type: 'email', required: true })}${D.fieldHtml({ key: 'telefono', label: 'WhatsApp' })}${D.fieldHtml({ key: 'instagram', label: 'Instagram' })}${D.fieldHtml({ key: 'pais', label: 'País', type: 'select', options: ['Estados Unidos', 'España', 'Panamá', 'Venezuela', 'Otro'] })}</div>`, buttons: [{ label: 'Lo hago después' }, { label: 'Crear cliente', kind: 'primary', value: (m) => D.readForm(m) }] });
    if (!c) { D.rerender(); return; }
    const cli = await D.try(() => D.call('save', 'clientes', { nombre: c.nombre, email: c.email, telefono: c.telefono, instagram: c.instagram, pais: c.pais, estado: 'Actual', etapa: 'Plan mensual', origen: 'Prospección', notas: c.contacto ? `Contacto: ${c.contacto}` : '' })); if (!cli) return;
    // paso 3: acceso al portal
    const pw = Array.from(crypto.getRandomValues(new Uint8Array(12)), b => 'abcdefghjkmnpqrstuvwxyz23456789'[b % 31]).join('');
    const u = await D.try(() => D.call('save', 'equipo', { nombre: c.contacto || c.nombre, email: c.email, rol: 'cliente', client_id: cli.id, password: pw }));
    if (u && u.id) await D.HANDLERS.invitar(u);
    // paso 4: primera pieza
    const pz = await D.modal({ title: 'Su primera pieza', body: `<div class="form">${D.fieldHtml({ key: 'proyecto', label: 'Proyecto', required: true, full: true }, { proyecto: `Plan mensual · ${c.nombre}` })}${D.fieldHtml({ key: 'titulo', label: 'Primera pieza', required: true, full: true }, { titulo: 'Reel 1' })}${D.fieldHtml({ key: 'enlace', label: 'Enlace de Google Drive del video (si ya está)', full: true, placeholder: 'https://drive.google.com/file/d/…' })}</div>`, buttons: [{ label: 'Lo hago después' }, { label: 'Crear', kind: 'primary', value: (m) => D.readForm(m) }] });
    if (pz) { const pr = await D.try(() => D.call('save', 'proyectos', { nombre: pz.proyecto, client_id: cli.id, estado: 'En curso', inicio: D.today() })); if (pr) await D.try(() => D.call('save', 'piezas', { titulo: pz.titulo, project_id: pr.id, tipo: 'Video', enlace: pz.enlace || '', estado: pz.enlace ? 'Revisión interna' : 'En proceso' }), 'Primera pieza creada.'); }
    await D.refreshRefs(); D.go('clientes'); setTimeout(() => D.openRecord('clientes', cli.id), 400);
  };

  // ═════════════════════ reportar problema ═════════════════════
  const SENSIBLES = ['boveda', 'nomina', 'empleados'];
  D.reportarProblema = async () => {
    const pantalla = (location.hash.replace('#/', '') || 'inicio') + (document.querySelector('.drawer h2') ? ` › ${document.querySelector('.drawer h2').textContent.slice(0, 50)}` : '');
    const sensible = SENSIBLES.some(s => pantalla.startsWith(s)) || !!document.querySelector('.drawer [data-secret], .drawer .vault, .modal input[type=password]');
    let imagen = null;
    if (!sensible && window.dos.captura) { document.body.classList.add('captura-privada'); await new Promise(r => setTimeout(r, 80)); try { imagen = (await window.dos.captura()).data; } catch (e) {} document.body.classList.remove('captura-privada'); }
    const info = D.info || (await window.dos.info()).data || {};
    const v = await D.modal({ title: 'Reportar un problema', body: `<p class="small muted" style="margin-top:0">Llega a Dirección por Discord y queda en Bugs y QA. Se envía la pantalla (${esc(pantalla)}), la versión ${esc(info.version || '')} y tu usuario. ${imagen ? 'Incluye una captura: los campos de contraseña y datos privados salen tapados.' : sensible ? 'En esta pantalla no se envía captura porque tiene datos privados.' : 'En la versión web no se adjunta captura: descríbelo con detalle.'} Nunca se envían contraseñas, datos de la bóveda ni datos de pago.</p>
      ${imagen ? `<img src="${imagen}" alt="Captura" style="width:100%;border-radius:10px;border:1px solid var(--border);margin-bottom:10px">` : ''}
      <div class="form">${D.fieldHtml({ key: 'texto', label: '¿Qué pasó? ¿Qué esperabas que pasara?', type: 'textarea', required: true, full: true })}${imagen ? D.fieldHtml({ key: 'con_captura', label: 'Enviar la captura', type: 'checkbox', default: true }) : ''}</div>`,
      buttons: [{ label: 'Cancelar' }, { label: 'Enviar reporte', kind: 'primary', value: (m) => D.readForm(m) }] });
    if (!v) return;
    const r = await D.try(() => D.call('reportarProblema', { texto: v.texto, pantalla, version: info.version, plataforma: info.plataforma || (window.dos.web ? 'web' : 'escritorio'), imagen: imagen && v.con_captura !== false ? imagen : null }));
    if (r) D.toast(r.discord ? '¡Gracias! Dirección ya recibió el reporte.' : 'Guardado en Bugs y QA. (Discord no está configurado o no respondió.)');
  };
  const prevAyuda = D.botonAyuda;
  D.botonAyuda = (k) => { if (prevAyuda) prevAyuda(k); const acts = document.querySelector('#view .page-head .actions'); if (!acts || acts.querySelector('[data-reportar]')) return;
    acts.insertAdjacentHTML('beforeend', `<button class="icon-btn ayuda-btn" data-reportar title="Reportar un problema en esta pantalla" aria-label="Reportar un problema">${D.icon('bugs')}</button>`); acts.querySelector('[data-reportar]').onclick = () => D.reportarProblema(); };

  // ═════════════════════ videos por enlace ═════════════════════
  D.pegarEnlaceVideo = async (form, mensaje) => {
    const v = await D.modal({ title: 'Pega el enlace del video', body: `<p style="margin-top:0">${esc(mensaje)}</p><ol class="small" style="padding-left:18px;line-height:1.7"><li>Sube el video a Google Drive.</li><li>Clic derecho → <b>Compartir</b> → "Cualquier persona con el enlace" puede ver.</li><li>Copia el enlace y pégalo aquí.</li></ol>${D.fieldHtml({ key: 'enlace', label: 'Enlace de Google Drive', full: true, placeholder: 'https://drive.google.com/file/d/…/view' })}`,
      buttons: [{ label: 'Cancelar' }, { label: 'Usar este enlace', kind: 'primary', value: (m) => D.readForm(m) }] });
    if (!v || !v.enlace) return; const inp = form && form.querySelector('[name=enlace]'); if (inp) { inp.value = v.enlace; D.toast('Enlace puesto. Guarda la pieza.'); } else copiar(v.enlace);
  };
  D.verVideoPieza = (r) => D.modal({ title: r.titulo, wide: true, body: r._vista ? `<div style="position:relative;padding-top:56.25%;background:#000;border-radius:10px;overflow:hidden"><iframe src="${esc(r._vista)}" allow="autoplay; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div><p class="small muted">Si no carga, el archivo no está compartido con "cualquier persona con el enlace".</p>` : '<p>Este enlace no es de Google Drive: se abre en el navegador.</p>',
    onMount: (m) => { const b = document.createElement('button'); b.className = 'btn'; b.textContent = 'Abrir en Drive'; b.onclick = () => window.dos.openExternal(r.enlace); m.querySelector('.mf').prepend(b); }, buttons: [{ label: 'Cerrar' }] });
  const prevDetPz = D.DETAIL.piezas;
  D.DETAIL.piezas = (r) => { const b = prevDetPz ? prevDetPz(r) : {}; const base = typeof b === 'string' ? { top: b } : b; if (!r.enlace) return base;
    return { ...base, top: `${r._miniatura ? `<button class="pz-mini" data-ver-video title="Ver video"><img src="${esc(r._miniatura)}" alt="" loading="lazy"><span>▶</span></button>` : `<button class="btn" data-ver-video style="margin-bottom:12px">▶ Ver ${/drive\.google/.test(r.enlace) ? 'video' : 'enlace'}</button>`}${base.top || ''}` }; };
  const prevMountPz = D.MOUNT.piezas;
  D.MOUNT.piezas = (root, r) => { if (prevMountPz) prevMountPz(root, r); const b = root.querySelector('[data-ver-video]'); if (b) b.onclick = () => r._vista ? D.verVideoPieza(r) : window.dos.openExternal(r.enlace); const mi = root.querySelector('.pz-mini img'); if (mi) mi.onerror = () => { mi.parentElement.classList.add('sin-mini'); mi.remove(); }; };
  const fsPz = (D.SCHEMA.piezas || {}).fields || []; const fEn = fsPz.find(f => f.key === 'enlace'); if (fEn) { fEn.label = 'Enlace (Google Drive, Frame.io, Figma…)'; fEn.hint = 'Los videos van siempre por enlace de Google Drive compartido con "cualquier persona con el enlace": la nube gratis no guarda videos.'; }

  // ═════════════════════ medidor del plan gratis y respaldos ═════════════════════
  D.pintarUso = async (box) => {
    if (!box) return; if (!(D.enNube && D.enNube())) { box.innerHTML = '<h2>Uso del plan gratis</h2><p class="muted">Aparece cuando el estudio trabaja en línea.</p>'; return; }
    const d = await D.try(() => D.call('usoNube')); if (!d) return;
    const fila = (l, v, max, nota) => { const p = max ? Math.round(v / max * 100) : 0; return `<div style="margin:10px 0"><div style="display:flex;justify-content:space-between"><b>${l}</b><span class="small">${mb(v)} de ${mb(max)} · ${p}%</span></div><div class="progress ${p >= 90 ? 'over' : p >= 70 ? 'near' : ''}" style="height:9px;margin-top:4px"><i style="width:${Math.min(100, p)}%"></i></div>${nota ? `<span class="sub">${nota}</span>` : ''}</div>`; };
    const hace = (f) => f ? `${D.datetime(f)} (${D.rel(f)})` : 'todavía no';
    box.innerHTML = `<h2>Uso del plan gratis de Supabase</h2>
      ${d.falta_sql ? '<div class="note warn">Para medir base de datos y archivos, corre de nuevo el archivo <b>instalar.sql</b> (1.7) en Supabase → SQL Editor.</div>' : fila('Base de datos', d.uso.db_bytes, d.limites.db) + fila('Archivos', d.uso.archivos_bytes, d.limites.archivos, `${D.num(d.uso.archivos)} archivos · los respaldos ocupan ${mb(d.uso.respaldos_bytes || 0)}`)}
      ${fila('Tráfico del mes (aproximado)', d.trafico.bytes || 0, d.limites.trafico, 'Cuenta lo que responde la app; las descargas de archivos se ven exactas en el panel de Supabase → Usage.')}
      <dl class="kv" style="margin-top:12px"><dt>Último respaldo en la nube</dt><dd>${hace(d.respaldo && d.respaldo.fecha)}${d.respaldo && d.respaldo.bytes ? ` · ${mb(d.respaldo.bytes)}` : ''}</dd><dt>Último "ping" (anti-pausa)</dt><dd>${hace(d.ping && d.ping.fecha)}</dd></dl>
      <p class="small muted">Supabase pausa los proyectos gratis tras 7 días sin actividad: la tarea de cada 5 minutos lo mantiene activo y cada día guarda una copia completa (se conservan 7). Avisos al 70% y al 90%.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" data-bajar-resp ${d.respaldo ? '' : 'disabled'}>Descargar el último respaldo</button></div>`;
    const br = box.querySelector('[data-bajar-resp]'); if (br) br.onclick = async () => { const r = await D.try(() => D.call('descargarRespaldo')); if (r) window.dos.openExternal(r.url); };
    return d;
  };
  D.alertaUso = async (el) => {
    if (!D.isAdmin() || !(D.enNube && D.enNube())) return; let d; try { d = await D.call('usoNube'); } catch (e) { return; }
    const av = []; const pct = (v, m) => Math.round(v / m * 100);
    if (d.uso) { if (pct(d.uso.db_bytes, d.limites.db) >= 70) av.push(`Base de datos al ${pct(d.uso.db_bytes, d.limites.db)}%`); if (pct(d.uso.archivos_bytes, d.limites.archivos) >= 70) av.push(`Archivos al ${pct(d.uso.archivos_bytes, d.limites.archivos)}%`); }
    if (pct(d.trafico.bytes || 0, d.limites.trafico) >= 70) av.push(`Tráfico del mes al ${pct(d.trafico.bytes, d.limites.trafico)}%`);
    if (d.ping && Date.now() - Date.parse(d.ping.fecha) > 2 * 864e5) av.push('La tarea anti-pausa no corre hace más de 2 días');
    if (!av.length) return; const pg = el.querySelector('.page-head'); if (!pg) return;
    pg.insertAdjacentHTML('afterend', `<div class="note ${av.some(x => /9\d%|100%|anti-pausa/.test(x)) ? 'danger' : 'warn'}" style="margin-bottom:16px"><b>Plan gratis de Supabase:</b> ${av.map(esc).join(' · ')}. Revisa Ajustes → Copias y versión.</div>`);
  };

  // ═════════════════════ Inicio: primer uso real, prospección, comentarios negativos ═════════════════════
  const prevInicio = D.views.inicio;
  D.views.inicio = async (el) => {
    await prevInicio(el); if (isClient()) return;
    const head = el.querySelector('.page-head'); const d = D._dash || null;
    if (d && d.datos_ejemplo && head) { head.insertAdjacentHTML('afterend', `<div class="card onboarding" style="margin-bottom:16px;display:flex;gap:14px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:240px"><h2 style="margin:0 0 4px">¿Listo para el primer cliente real?</h2><p class="muted" style="margin:0">Borra los datos de ejemplo y te guío para crear el estudio, tu primer cliente, su portal y su primera pieza.</p></div><button class="btn primary" data-uso-real>Empezar con datos reales</button></div>`); el.querySelector('[data-uso-real]').onclick = () => D.primerUsoReal(); }
    if (d && d.prospeccion && head) { const p = d.prospeccion; const kp = el.querySelector('.grid.g4'); if (kp) kp.insertAdjacentHTML('afterend', `<div class="note ${p.hechos < p.meta ? 'warn' : ''}" style="margin:12px 0" data-go-hoy role="button" tabindex="0"><b>Prospección de hoy:</b> ${p.hechos} de ${p.meta} mensajes · ${D.pl(p.seguimientos, 'seguimiento pendiente', 'seguimientos pendientes')}. <u>Abrir Hoy</u></div>`); const g = el.querySelector('[data-go-hoy]'); if (g) g.onclick = () => D.go('hoy'); }
    if (d && d.bandeja_negativos && head) head.insertAdjacentHTML('afterend', `<div class="note danger" style="margin-bottom:16px" data-go-neg role="button" tabindex="0"><b>${D.pl(d.bandeja_negativos, 'comentario negativo sin responder', 'comentarios negativos sin responder')}</b> en las redes de tus clientes. Respóndelos pronto. <u>Ver</u></div>`);
    const gn = el.querySelector('[data-go-neg]'); if (gn) gn.onclick = () => { D._bandejaNegativos = true; D.go('bandeja'); };
    D.alertaUso(el);
  };

  // ═════════════════════ competencia (ficha del cliente) ═════════════════════
  const prevMountCli = D.MOUNT.clientes;
  D.MOUNT.clientes = async (root, r) => {
    if (prevMountCli) await prevMountCli(root, r);
    if (isClient() || !D.canRead('metricas') || !r.competidores) return;
    const box = root.querySelector('[data-ficha360]'); if (!box) return;
    const pintar = (c) => `<div class="section" data-sec="competencia"><h3>Competencia <button class="btn sm" data-comp style="margin-left:8px">${c ? 'Actualizar' : 'Comparar ahora'}</button></h3>${c ? `${D.table([{ key: 'usuario', label: 'Cuenta', render: x => `${x.propia ? '<b>' : ''}@${esc(x.usuario)}${x.propia ? ' (cliente)</b>' : ''}${x.error ? `<span class="sub" style="color:var(--danger)">${esc(x.error)}</span>` : ''}` }, { key: 'seguidores', label: 'Seguidores', num: true, render: x => x.error ? '—' : D.num(x.seguidores) }, { key: 'interacciones_promedio', label: 'Interacciones/post', num: true, render: x => x.error ? '—' : D.num(x.interacciones_promedio) }, { key: 'engagement', label: 'Eng.', num: true, render: x => x.engagement === null || x.engagement === undefined ? '—' : `${String(x.engagement).replace('.', ',')}%` }, { key: 'por_semana', label: 'Posts/sem', num: true, render: x => x.por_semana ?? '—' }], c.lista)}<span class="sub">Últimas 12 publicaciones de cada cuenta · ${D.rel(c.fecha)}</span>` : '<p class="muted small" style="margin:0">Compara seguidores, interacciones y frecuencia con sus competidores (datos públicos de cuentas profesionales de Instagram).</p>'}</div>`;
    box.insertAdjacentHTML('beforeend', pintar(r.competencia));
    const bind = () => { const b = box.querySelector('[data-comp]'); if (b) b.onclick = async () => { b.disabled = true; b.textContent = 'Consultando…'; const c = await D.try(() => D.call('competidores', r.id)); const s = box.querySelector('[data-sec=competencia]'); if (c && s) { s.outerHTML = pintar(c); bind(); } else if (b) { b.disabled = false; b.textContent = 'Comparar ahora'; } }; }; bind();
  };

  // ═════════════════════ mejor hora al programar ═════════════════════
  const prevMountRedes = D.MOUNT.redes;
  D.MOUNT.redes = async (root, r) => { if (prevMountRedes) prevMountRedes(root, r); if (isClient() || !D.canRead('metricas') || !r.client_id || r.estado === 'Publicado') return;
    let h; try { h = await D.call('mejorHora', { client_id: r.client_id, dias: 120 }); } catch (e) { return; } if (!h || !h.mejores || !h.mejores.length || !D.textoHoras) return;
    const b = root.querySelector('.body'); if (b) b.insertAdjacentHTML('afterbegin', `<div class="note" style="margin-bottom:12px">🕒 ${D.textoHoras(h)}</div>`); };
  // ═════════════════════ Mi cuenta: mi horario ═════════════════════
  D.miHorario = () => D.editarHorario();
})(window.DOS);
