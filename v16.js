// Delirium OS 1.6 — metas por cliente, mejor hora para publicar, reportes PDF para clientes, monedas,
// carga de trabajo del equipo, verificación en dos pasos y bandeja de comentarios y mensajes.
(function (D) {
  const esc = D.esc;
  const users = () => (D.directory || []).map(p => ({ value: p.id, label: `${p.nombre} · ${p.rol_label}` }));
  const ref = (mod) => () => (D.refs[mod] || []).map(r => ({ value: r.id, label: r.nombre }));
  const canW = (k) => (D.meta.modules.find(m => m.key === k) || {}).level === 'W';
  const isClient = () => ['cliente', 'cliente_eq'].includes(D.me.rol);
  const n = (x) => x === null || x === undefined ? '—' : D.num(x);
  const pct = (x) => x === null || x === undefined ? '—' : `${String(x).replace('.', ',')}%`;
  const chip = (red) => `<span class="red-chip red-${String(red).toLowerCase()}">${esc(red)}</span>`;
  const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const DIAS_L = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  const hh = (h) => `${h % 12 || 12} ${h < 12 ? 'a. m.' : 'p. m.'}`;
  const fechaCorta = (f) => String(f || '').slice(0, 10).split('-').reverse().join('/');

  // ═════════════════════ monedas ═════════════════════
  D.monedas = () => (D.settings.monedas || []).filter(m => Number(m.tasa) > 0);
  D.moneyIn = (v, codigo) => {
    const m = (D.settings.monedas || []).find(x => x.codigo === codigo); const base = D.settings.moneda || 'USD';
    if (!m || codigo === base) return D.money(v);
    const val = Number(v || 0) * Number(m.tasa || 0); const dec = val >= 100000 ? 0 : 2;
    return `${m.simbolo || m.codigo} ${val.toLocaleString('es-VE', { minimumFractionDigits: dec, maximumFractionDigits: dec })}`;
  };
  // Equivalentes de un monto: primero la moneda preferida del cliente, después las marcadas para mostrar.
  D.equivalentes = (monto, preferida) => {
    const base = D.settings.moneda || 'USD'; const lista = D.monedas().filter(m => m.codigo !== base && (m.mostrar || m.codigo === preferida));
    lista.sort((a, b) => (b.codigo === preferida) - (a.codigo === preferida));
    return lista.map(m => ({ codigo: m.codigo, texto: D.moneyIn(monto, m.codigo), preferida: m.codigo === preferida }));
  };
  D.equivHtml = (monto, preferida) => { const e = D.equivalentes(monto, preferida); return e.length ? `<span class="sub" style="display:block">≈ ${e.map(x => x.preferida ? `<b>${esc(x.texto)}</b>` : esc(x.texto)).join(' · ')}</span>` : ''; };
  const tasasNota = () => D.settings.tasas_al ? `Tasas del ${D.date(D.settings.tasas_al)}${D.settings.tasas_fuente ? ` (${esc(D.settings.tasas_fuente)}${D.monedas().some(m => !m.auto && m.codigo !== (D.settings.moneda || 'USD') && m.codigo !== 'USDT') ? ' y tasas manuales' : ''})` : ''}.` : 'Tasas escritas a mano.';
  const preferidaDe = (clientId) => (((D.refsFull && D.refsFull.clientes) || []).find(c => c.id === clientId) || {}).moneda || (isClient() ? D.me.moneda_cliente || '' : '');

  D.abrirTasas = async () => {
    const lista = D.settings.monedas || []; const base = D.settings.moneda || 'USD';
    const puede = D.isAdmin() || canW('facturas');
    const fila = (m) => `<tr data-cod="${esc(m.codigo)}"><td><b>${esc(m.codigo)}</b><span class="sub">${esc(m.nombre || '')}</span></td>
      <td class="num">${m.codigo === base ? '1 (base)' : `<input class="input" type="number" step="any" min="0" data-tasa value="${esc(m.tasa || '')}" style="width:130px;text-align:right" ${puede ? '' : 'disabled'}>`}</td>
      <td>${m.codigo === base ? '' : `<label class="small"><input type="checkbox" data-auto ${m.auto ? 'checked' : ''} ${puede ? '' : 'disabled'}> Automática</label>`}</td>
      <td class="small muted">${m.actualizada ? D.rel(m.actualizada) : ''}</td></tr>`;
    const v = await D.modal({ title: 'Tasas de cambio', wide: true, body: `<p class="small muted" style="margin-top:0">Cuánto vale <b>1 ${esc(base)}</b> en cada moneda. Las <b>automáticas</b> se actualizan solas una vez al día con ExchangeRate-API; si quieres usar otra tasa (por ejemplo la del BCV o la de Binance para USDT), quita "Automática" y escríbela.</p>
      <div class="table-wrap"><table><thead><tr><th>Moneda</th><th class="num">1 ${esc(base)} =</th><th></th><th>Cambió</th></tr></thead><tbody>${lista.map(fila).join('')}</tbody></table></div>
      <p class="small muted">${tasasNota()} <a href="#" data-ext-tasas>Rates By Exchange Rate API</a></p>`,
      onMount: (m) => { const a = m.querySelector('[data-ext-tasas]'); if (a) a.onclick = (e) => { e.preventDefault(); window.dos.openExternal('https://www.exchangerate-api.com'); };
        if (puede) { const b = document.createElement('button'); b.className = 'btn'; b.textContent = 'Actualizar automáticas ahora'; b.onclick = async () => { b.disabled = true; const r = await D.try(() => D.call('actualizarTasas'), 'Tasas actualizadas.'); if (r) { D.settings = await D.call('settings'); for (const x of D.settings.monedas || []) { const i = m.querySelector(`tr[data-cod="${x.codigo}"] [data-tasa]`); if (i && x.auto) i.value = x.tasa; } } b.disabled = false; }; const mf = m.querySelector('.mf'); if (mf) mf.prepend(b); } },
      buttons: puede ? [{ label: 'Cerrar' }, { label: 'Guardar tasas', kind: 'primary', value: (m) => [...m.querySelectorAll('tr[data-cod]')].filter(tr => tr.querySelector('[data-tasa]')).map(tr => ({ codigo: tr.dataset.cod, tasa: Number(tr.querySelector('[data-tasa]').value || 0), auto: tr.querySelector('[data-auto]').checked })) }] : [{ label: 'Cerrar' }] });
    if (!Array.isArray(v)) return;
    for (const x of v) { const antes = lista.find(m => m.codigo === x.codigo) || {}; if (Number(antes.tasa) !== x.tasa || !!antes.auto !== x.auto) await D.try(() => D.call('action', 'tasas.guardar', x)); }
    D.settings = await D.call('settings'); D.toast('Tasas guardadas.'); D.rerender();
  };
  for (const k of ['facturas', 'cotizaciones']) { const prev = D.PAGE_ACTIONS[k]; D.PAGE_ACTIONS[k] = () => `${prev ? prev() : ''}${isClient() ? '' : `<button class="btn" data-page-act="tasas" title="Tasas de cambio para mostrar equivalentes">${D.icon('planes')} Tasas del día</button>`}`; }
  D.PAGE_HANDLERS.tasas = () => D.abrirTasas();
  // equivalentes en facturas y cotizaciones (detalle)
  for (const k of ['facturas', 'cotizaciones']) {
    const prev = D.DETAIL[k];
    D.DETAIL[k] = (r) => { const b = prev ? prev(r) : {}; const base = typeof b === 'string' ? { top: b } : b; const total = k === 'facturas' && r._saldo > 0 ? r._saldo : r._total; const e = D.equivalentes(total, preferidaDe(r.client_id));
      if (!e.length) return base;
      return { ...base, top: `${base.top || ''}<div class="note" style="margin-bottom:16px"><b>${k === 'facturas' && r._saldo > 0 ? 'Saldo' : 'Total'} en otras monedas:</b> ${e.map(x => x.preferida ? `<b>${esc(x.texto)}</b>` : esc(x.texto)).join(' · ')}<span class="sub" style="display:block">${tasasNota()} Referencial: el monto se cobra al cambio del día del pago.</span></div>` }; };
  }

  // ═════════════════════ esquemas nuevos y campos ═════════════════════
  const METRICAS = [['seguidores', 'Seguidores (total a alcanzar)'], ['nuevos_seguidores', 'Seguidores nuevos (netos)'], ['alcance', 'Alcance'], ['vistas', 'Vistas'], ['interacciones', 'Interacciones'], ['er_alcance', 'Engagement (%)'], ['publicaciones', 'Publicaciones'], ['visitas_perfil', 'Visitas al perfil'], ['clics_web', 'Clics al enlace']];
  const finDeMes = () => { const d = new Date(); return D.ymd(new Date(d.getFullYear(), d.getMonth() + 1, 0)); };
  const inicioDeMes = () => D.today().slice(0, 8) + '01';
  D.SCHEMA.metas = {
    singular: 'meta', plural: 'metas', nuevo: 'Nueva meta', help: 'Objetivos de cada cliente en sus redes (seguidores, alcance, engagement…) con el avance calculado solo con las métricas reales. Avisa en Inicio cuando una meta va atrasada.',
    vacio: ['Sin metas', 'Crea una meta por cliente, por ejemplo "llegar a 10.000 seguidores en Instagram este trimestre". El avance se calcula solo.'],
    filtro: { key: '_ritmo', values: ['En camino', 'Atrasada', 'Cumplida', 'No se cumplió', 'Por empezar'] },
    columns: [
      { key: 'titulo', label: 'Meta', render: r => `${esc(r.titulo || '')}<span class="sub">${esc(r._cliente || '')}${r.red && r.red !== 'Todas' ? ' · ' + esc(r.red) : ' · todas sus redes'}</span>` },
      { key: '_avance', label: 'Avance', render: r => `<div class="progress ${r._ritmo === 'Atrasada' ? 'near' : r._ritmo === 'No se cumplió' ? 'over' : ''}" title="${r._avance}%"><i style="width:${Math.min(100, r._avance || 0)}%"></i></div><span class="sub">${r._avance || 0}% · ${r._actual === null || r._actual === undefined ? 'sin datos' : `${r.metrica === 'er_alcance' ? pct(r._actual) : n(r._actual)} de ${r.metrica === 'er_alcance' ? pct(r.objetivo) : n(r.objetivo)}`}</span>` },
      { key: '_esperado', label: 'Tiempo', render: r => `${r._esperado || 0}%<span class="sub">cierra ${D.date(r.hasta)}</span>` },
      { key: '_ritmo', label: 'Ritmo', render: r => D.badge(r._ritmo) },
    ],
    fields: [
      { key: 'client_id', label: 'Cliente', type: 'select', options: ref('clientes'), required: true },
      { key: 'red', label: 'Red', type: 'select', options: ['Todas', 'Instagram', 'Facebook', 'TikTok'], default: 'Todas' },
      { key: 'metrica', label: 'Qué se mide', type: 'select', options: () => METRICAS.map(([value, label]) => ({ value, label })), required: true, default: 'seguidores' },
      { key: 'objetivo', label: 'Número a alcanzar', type: 'number', decimals: true, required: true, hint: 'Para engagement escribe el porcentaje (ej.: 4,5).' },
      { key: 'desde', label: 'Desde', type: 'date', required: true, default: inicioDeMes }, { key: 'hasta', label: 'Hasta', type: 'date', required: true, default: finDeMes },
      { key: 'titulo', label: 'Nombre (opcional)', full: true, hideInDetail: true, placeholder: 'Se arma solo, ej.: 10.000 seguidores en Instagram' },
      { key: 'responsable', label: 'Responsable', type: 'select', options: users },
      { key: 'estado', label: 'Estado', type: 'select', options: ['Activa', 'Archivada'], default: 'Activa' },
      { key: 'notas', label: 'Plan para lograrla', type: 'textarea' },
    ],
  };
  D.DETAIL.metas = (r) => ({ top: `<div class="grid g3" style="margin-bottom:16px"><div class="kpi"><div class="label">Avance</div><div class="v">${r._avance || 0}%</div><div class="s">${D.badge(r._ritmo)}</div></div>
    <div class="kpi"><div class="label">Hoy</div><div class="v">${r.metrica === 'er_alcance' ? pct(r._actual) : n(r._actual)}</div><div class="s">de ${r.metrica === 'er_alcance' ? pct(r.objetivo) : n(r.objetivo)}${r._inicio !== null && r._inicio !== undefined ? ` · empezó en ${n(r._inicio)}` : ''}</div></div>
    <div class="kpi"><div class="label">Si sigue así</div><div class="v">${r.metrica === 'er_alcance' ? pct(r._proyeccion) : n(r._proyeccion)}</div><div class="s">al ${D.date(r.hasta)} · ${r._esperado}% del tiempo pasó</div></div></div>
    <div class="progress ${r._ritmo === 'Atrasada' ? 'near' : ''}" style="margin-bottom:16px;height:10px"><i style="width:${Math.min(100, r._avance || 0)}%"></i></div>` });
  // campos nuevos en esquemas existentes
  const meter = (mod, despues, campo) => { const fs = (D.SCHEMA[mod] || {}).fields; if (!fs || fs.some(f => f.key === campo.key)) return; const i = fs.findIndex(f => f.key === despues); fs.splice(i >= 0 ? i + 1 : fs.length, 0, campo); };
  meter('clientes', 'servicios', { key: 'moneda', label: 'Moneda en la que suele pagar', type: 'select', options: () => (D.settings.monedas || []).map(m => ({ value: m.codigo, label: `${m.codigo} · ${m.nombre}` })), hint: 'Sus facturas, cotizaciones y reportes muestran el equivalente en esta moneda.' });
  meter('empleados', 'tipo_contrato', { key: 'horas_semana', label: 'Horas disponibles por semana', type: 'number', decimals: true, hint: 'Para la carga del equipo. Si lo dejas vacío: 40 tiempo completo, 20 medio tiempo o freelance.' });

  // ═════════════════════ mejor hora para publicar ═════════════════════
  D.textoHoras = (h) => {
    if (!h) return '';
    const partes = [];
    if (h.mejores && h.mejores.length) partes.push(`Mejor rendimiento: <b>${h.mejores.slice(0, 3).map(x => `${DIAS_L[x.dia]} ${hh(x.hora)}`).join(', ')}</b>`);
    if (h.horas_activas && h.horas_activas.length) partes.push(`seguidores de Instagram más conectados cerca de las <b>${h.horas_activas.map(hh).join(', ')}</b>`);
    const txt = partes.join('; '); return txt + (txt.endsWith('.') ? '' : '.') + (h.poco ? ` <span class="muted">(todavía hay pocas publicaciones: ${h.publicaciones}; se afina con el tiempo)</span>` : '');
  };
  // mapa de calor día × hora (pantalla). En el PDF se usa otro con colores fijos.
  D.mapaHoras = (h, { pdf = false } = {}) => {
    const max = Math.max(0.01, ...h.matriz.flat().map(c => c.score));
    const top = new Set((h.mejores || []).slice(0, 3).map(x => `${x.dia}-${x.hora}`));
    const color = (c) => { if (!c.n) return pdf ? '#f4f2f8' : 'var(--surface-2, rgba(127,127,127,.08))'; const a = 0.18 + 0.82 * (c.score / max); return `rgba(125,57,235,${a.toFixed(2)})`; };
    const enL = h.en_linea; const maxL = enL ? Math.max(1, ...enL) : 1;
    const horas = Array.from({ length: 24 }, (_, i) => i);
    return `<div style="overflow-x:auto"><table class="mapa-horas" style="border-collapse:separate;border-spacing:2px;width:100%;min-width:560px;font-size:${pdf ? '7.5pt' : '11px'}">
      <thead><tr><th></th>${horas.map(x => `<th style="font-weight:500;text-align:center;padding:0;${pdf ? 'border:0;font:7pt SM,monospace;letter-spacing:0' : 'color:var(--muted)'}">${x % 3 === 0 ? (x % 12 || 12) + (x < 12 ? 'a' : 'p') : ''}</th>`).join('')}</tr></thead>
      <tbody>${h.matriz.map((fila, d) => `<tr><th style="text-align:left;font-weight:600;padding:0 6px 0 0;white-space:nowrap;${pdf ? 'border:0;font:7.5pt SM,monospace' : ''}">${DIAS[d]}</th>${fila.map((c, x) => `<td title="${DIAS_L[d]} ${hh(x)}: ${c.n} publicaciones${c.n ? `, ${c.inter} interacciones en promedio` : ''}" style="background:${color(c)};height:${pdf ? 13 : 20}px;padding:0;border-radius:3px;${top.has(`${d}-${x}`) ? `outline:2px solid ${pdf ? '#c6ff33' : 'var(--lime)'};outline-offset:-2px;` : ''}${pdf ? 'border:0' : ''}"></td>`).join('')}</tr>`).join('')}
      ${enL ? `<tr><th style="text-align:left;font-weight:600;padding:4px 6px 0 0;white-space:nowrap;${pdf ? 'border:0;font:7pt SM,monospace' : ''}">Conectados</th>${enL.map(v => `<td style="padding:4px 0 0;vertical-align:bottom;${pdf ? 'border:0' : ''}"><div style="height:${Math.max(2, Math.round(v / maxL * (pdf ? 16 : 24)))}px;background:${pdf ? '#c6ff33' : 'var(--lime)'};border-radius:2px"></div></td>`).join('')}</tr>` : ''}
      </tbody></table></div>`;
  };
  D.pintarHoras = async (box, filtro) => {
    if (!box) return; const h = await D.try(() => D.call('mejorHora', { ...filtro, dias: Math.max(90, Number(filtro.dias) || 120) })); if (!h) { box.remove(); return; }
    box.innerHTML = `<h2>Mejor hora para publicar</h2><p class="small muted" style="margin-top:0">Cada cuadro es un día y una hora (${esc(h.zona.replace('America/', '').replace('_', ' '))}). Más oscuro = las publicaciones de esa hora rindieron más que lo normal de su cuenta. Borde verde = las 3 mejores. ${h.en_linea ? 'La fila de abajo muestra cuántos seguidores de Instagram están conectados a cada hora.' : ''} Últimos ${h.dias} días · ${h.publicaciones} publicaciones.</p>
      ${h.publicaciones ? D.mapaHoras(h) : '<p class="muted">Todavía no hay publicaciones con métricas en este período.</p>'}
      ${h.publicaciones ? `<p style="margin-bottom:0">${D.textoHoras(h)}</p>` : ''}`;
  };
  // se agrega a Métricas de redes
  const prevMet = D.views.metricas;
  D.views.metricas = async (el) => {
    await prevMet(el);
    const ref_ = el.querySelector('[data-m="formatos"]'); if (!ref_) return;
    const filtro = {}; el.querySelectorAll('[data-mf]').forEach(s => { filtro[s.dataset.mf] = s.value; });
    const box = document.createElement('div'); box.className = 'card'; box.dataset.m = 'horas'; box.style.marginTop = '16px';
    ref_.parentElement.insertAdjacentElement('afterend', box); D.pintarHoras(box, filtro);
  };

  // ═════════════════════ reportes para clientes (PDF) ═════════════════════
  const SECCIONES = [['resumen', 'Resumen y recomendaciones'], ['redes', 'Cuentas y resultados por red'], ['evolucion', 'Evolución día a día'], ['publicaciones', 'Mejores publicaciones'], ['formatos', 'Formatos que mejor funcionan'], ['audiencia', 'Audiencia'], ['horas', 'Mejor hora para publicar'], ['metas', 'Metas'], ['calendario', 'Publicaciones del período'], ['proximas', 'Próximas publicaciones'], ['anuncios', 'Campañas de anuncios'], ['proyectos', 'Proyectos y piezas'], ['servicios', 'Servicios y planes'], ['facturacion', 'Facturación y pagos'], ['solicitudes', 'Solicitudes'], ['nota', 'Notas del equipo']];
  const periodo = (k) => { const hoy = new Date(); const y = hoy.getFullYear(), m = hoy.getMonth();
    if (k === 'mes_pasado') return [D.ymd(new Date(y, m - 1, 1)), D.ymd(new Date(y, m, 0))];
    if (k === 'este_mes') return [D.ymd(new Date(y, m, 1)), D.today()];
    if (k === '7') return [D.ymd(new Date(Date.now() - 6 * 864e5)), D.today()];
    if (k === '90') return [D.ymd(new Date(Date.now() - 89 * 864e5)), D.today()];
    if (k === 'trimestre') return [D.ymd(new Date(y, m - 3, 1)), D.ymd(new Date(y, m, 0))];
    return [D.ymd(new Date(Date.now() - 29 * 864e5)), D.today()]; };
  const IF = { client_id: '', periodo: 'mes_pasado', desde: '', hasta: '', moneda: '', secciones: SECCIONES.map(x => x[0]), nota: '', imagenes: true };

  function svgLinea(serie, campo, color = '#7d39eb') {
    const W = 680, H = 170, P = 44; const vals = serie.map(x => x[campo] || 0); const max = Math.max(1, ...vals); const min = campo === 'seguidores' ? Math.min(...vals) : 0; const r = Math.max(1, max - min);
    const X = (i) => P + (W - P - 6) * (serie.length > 1 ? i / (serie.length - 1) : 0.5); const Y = (v) => H - 18 - (H - 30) * ((v - min) / r);
    const pts = vals.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
    const marcas = [0, Math.floor((serie.length - 1) / 2), serie.length - 1].filter((v, i, a) => a.indexOf(v) === i);
    return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block"><line x1="${P}" y1="${H - 18}" x2="${W - 6}" y2="${H - 18}" stroke="#ccc"/>
      <text x="${P - 6}" y="${Y(max) + 4}" text-anchor="end" font-size="9" fill="#666" font-family="SM,monospace">${esc(D.num(max))}</text><text x="${P - 6}" y="${H - 15}" text-anchor="end" font-size="9" fill="#666" font-family="SM,monospace">${esc(D.num(min))}</text>
      <polygon points="${X(0)},${H - 18} ${pts} ${X(vals.length - 1)},${H - 18}" fill="${color}" opacity=".14"/><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round"/>
      ${marcas.map((i, k) => `<text x="${X(i)}" y="${H - 3}" text-anchor="${k === 0 ? 'start' : i === serie.length - 1 ? 'end' : 'middle'}" font-size="9" fill="#666" font-family="SM,monospace">${esc(fechaCorta(serie[i].fecha).slice(0, 5))}</text>`).join('')}</svg>`;
  }
  const barrasPdf = (obj, max = 6) => { const e = Object.entries(obj || {}).sort((a, b) => b[1] - a[1]).slice(0, max); const tot = Object.values(obj || {}).reduce((a, b) => a + b, 0) || 1;
    return e.map(([k, v]) => `<div class="bar"><span>${esc(k === 'F' ? 'Mujeres' : k === 'M' ? 'Hombres' : k === 'U' ? 'Sin dato' : k)}</span><i><b style="width:${(v / tot * 100).toFixed(1)}%"></b></i><em>${Math.round(v / tot * 100)}%</em></div>`).join(''); };

  D.htmlInforme = async (d, o = {}) => {
    const a = await D._pdf.loadAssets(); const S = new Set(o.secciones || SECCIONES.map(x => x[0]));
    const mon = o.moneda || d.cliente.moneda || ''; const base = D.settings.moneda || 'USD';
    const $ = (v) => `${D.money(v)}${mon && mon !== base ? ` <span class="eq">≈ ${esc(D.moneyIn(v, mon))}</span>` : ''}`;
    const m = d.metricas; const A = m ? m.actual : null; const C = m ? m.cambio : {};
    const flecha = (x) => x === null || x === undefined ? '' : `<span class="${x >= 0 ? 'up' : 'down'}">${x >= 0 ? '▲' : '▼'} ${String(Math.abs(x)).replace('.', ',')}%</span>`;
    const kp = (l, v, s = '') => `<div><span>${esc(l)}</span><b>${v}</b>${s ? `<small>${s}</small>` : ''}</div>`;
    const tabla = (cab, filas, der = []) => filas.length ? `<table><thead><tr>${cab.map((c, i) => `<th class="${der.includes(i) ? 'r' : ''}">${esc(c)}</th>`).join('')}</tr></thead><tbody>${filas.map(f => `<tr>${f.map((c, i) => `<td class="${der.includes(i) ? 'r' : ''}">${c ?? '—'}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '<p class="muted">Sin datos en este período.</p>';
    const sec = (k, titulo, cuerpo, extra = '') => S.has(k) && cuerpo ? `<section class="sec ${extra}"><h2>${esc(titulo)}</h2>${cuerpo}</section>` : '';
    const periodoTxt = `${fechaCorta(d.desde)} al ${fechaCorta(d.hasta)}`;
    const css = `<style>
      @page{size:Letter;margin:14mm 0 14mm 0} @page:first{margin-top:0}
      .wrap{padding:22px 40px 10px} .foot{display:none}
      h2{font:700 14pt Sora,Arial;margin:0 0 8px;padding-top:4px;break-after:avoid} .sec{margin-top:20px} .sec.chica{break-inside:avoid}
      table{font-size:9.5pt} td{padding:6px 6px} th{padding:6px} tr{break-inside:avoid}
      .hero{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #111;padding-bottom:12px;margin-bottom:6px}
      .hero h1{font:700 24pt Sora,Arial;margin:0;letter-spacing:-.02em} .hero p{margin:2px 0 0;color:#555}
      .k{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:12px 0} .k>div{background:#f3f0fb;border-radius:8px;padding:10px 12px;break-inside:avoid}
      .k span{display:block;font:8pt SM,monospace;letter-spacing:.06em;text-transform:uppercase;color:#6a28d9} .k b{display:block;font:700 17pt Sora,Arial;margin-top:2px} .k small{display:block;font-size:8.5pt;color:#555}
      .up{color:#0f8a57;font-weight:700} .down{color:#c62f45;font-weight:700} .eq{color:#6a28d9;font-size:8.5pt;white-space:nowrap}
      .ideas{background:#0b0b0d;color:#fff;border-radius:8px;padding:14px 18px;margin-top:10px;break-inside:avoid} .ideas li{margin:4px 0} .ideas h3{color:#c6ff33;margin:0 0 6px;font-size:11pt}
      .g2{display:grid;grid-template-columns:1fr 1fr;gap:16px} .card{border:1px solid #e3def0;border-radius:8px;padding:10px 12px;break-inside:avoid}
      .bar{display:grid;grid-template-columns:110px 1fr 34px;gap:8px;align-items:center;font-size:9pt;margin:3px 0} .bar i{display:block;height:8px;background:#eee;border-radius:4px;overflow:hidden} .bar i b{display:block;height:100%;background:#7d39eb} .bar em{font-style:normal;text-align:right;color:#555}
      .post{display:flex;gap:10px;align-items:flex-start} .post img{width:46px;height:46px;object-fit:cover;border-radius:6px;flex:none;background:#eee}
      .meta-bar{height:8px;background:#eee;border-radius:4px;overflow:hidden;margin-top:4px} .meta-bar b{display:block;height:100%;background:#7d39eb} .atr .meta-bar b{background:#e08a00}
      .pill{display:inline-block;font:7.5pt SM,monospace;padding:1px 6px;border-radius:10px;background:#eee;color:#333;text-transform:uppercase;letter-spacing:.04em} .pill.ok{background:#dff5ea;color:#0f8a57} .pill.mal{background:#fde3e7;color:#c62f45} .pill.va{background:#efe7ff;color:#6a28d9}
      .muted{color:#777} .nota{white-space:pre-wrap;background:#f3f0fb;border-left:4px solid #7d39eb;padding:10px 14px;border-radius:4px}
      .cierre{margin-top:26px;padding-top:10px;border-top:1px solid #ddd;font:8.5pt SM,monospace;color:#555;display:flex;justify-content:space-between;gap:10px}
      .chico{font-size:8.5pt;color:#666}
    </style>`;
    const pill = (r) => `<span class="pill ${['Cumplida', 'Publicado', 'Pagada', 'Entregado', 'Aprobada'].includes(r) ? 'ok' : ['Atrasada', 'No se cumplió', 'Vencida'].includes(r) ? 'mal' : 'va'}">${esc(r || '')}</span>`;
    const partes = [];
    partes.push(`${css}<div class="hero"><div><div class="lab">Reporte para</div><h1>${esc(d.cliente.nombre.replace(' (ejemplo)', ''))}</h1>${d.cliente.empresa ? `<p>${esc(d.cliente.empresa)}</p>` : ''}</div><div style="text-align:right"><div class="lab">Período</div><b style="font:700 12pt Sora,Arial">${esc(periodoTxt)}</b><p>${d.dias} días · comparado con los ${d.dias} días anteriores</p></div></div>`);
    if (S.has('resumen')) {
      const k = [];
      if (A) { k.push(kp('Seguidores', n(A.seguidores), `${A.crecimiento >= 0 ? '+' : ''}${n(A.crecimiento)} en el período`)); k.push(kp('Alcance', n(A.alcance), flecha(C.alcance))); k.push(kp('Interacciones', n(A.interacciones), flecha(C.interacciones))); k.push(kp('Engagement', pct(A.er_alcance), 'interacciones / alcance')); }
      k.push(kp('Publicaciones', n(A ? A.publicaciones : d.calendario.filter(x => x.estado === 'Publicado').length), A ? flecha(C.publicaciones) : ''));
      if (A) k.push(kp('Vistas', n(A.vistas), flecha(C.vistas)));
      if (d.ads.gasto) k.push(kp('Inversión en anuncios', $(d.ads.gasto), d.ads.resultados ? `${n(d.ads.resultados)} resultados` : ''));
      if (d.metas.length) k.push(kp('Metas cumplidas', `${d.metas.filter(x => x._ritmo === 'Cumplida').length} de ${d.metas.length}`, `${d.metas.filter(x => x._ritmo === 'En camino').length} en camino`));
      partes.push(`<section class="sec"><div class="k">${k.slice(0, 8).join('')}</div>${d.recomendaciones.length ? `<div class="ideas"><h3>Lo más importante</h3><ul style="margin:0;padding-left:18px">${d.recomendaciones.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}</section>`);
    }
    if (m) {
      partes.push(sec('redes', 'Cuentas y resultados por red', tabla(['Cuenta', 'Seguidores', 'Crecimiento', 'Alcance', 'Interacciones', 'Engagement', 'Publicaciones'], d.redes.filter(x => x.conectada).map(x => [`<b>${esc(x.red)}</b> · ${esc(x.nombre || '')}`, n(x.seguidores), x.crecimiento !== undefined ? `${x.crecimiento >= 0 ? '+' : ''}${n(x.crecimiento)}${x.crecimiento_pct !== null && x.crecimiento_pct !== undefined ? ` (${pct(x.crecimiento_pct)})` : ''}` : '—', n(x.alcance ?? x.vistas), n(x.interacciones), pct(x.er), n(x.publicaciones)]), [1, 2, 3, 4, 5, 6])
        + `<div class="g2" style="margin-top:10px"><div class="card"><div class="lab">Detalle de interacciones</div>${tabla([], [['Me gusta', n(A.me_gusta)], ['Comentarios', n(A.comentarios)], ['Compartidos', n(A.compartidos)], ['Guardados', n(A.guardados)]], [1])}</div><div class="card"><div class="lab">Perfil</div>${tabla([], [['Visitas al perfil', n(A.visitas_perfil)], ['Clics al enlace / web', n(A.clics_web)], ['Seguidores nuevos', n(A.nuevos_seguidores)], ['Dejaron de seguir', n(A.dejaron)]], [1])}</div></div>`));
      if (m.serie.length > 2) partes.push(sec('evolucion', 'Evolución día a día', `<div class="g2"><div class="card"><div class="lab">Alcance</div>${svgLinea(m.serie, 'alcance')}</div><div class="card"><div class="lab">Interacciones</div>${svgLinea(m.serie, 'interacciones', '#0b0b0d')}</div></div><div class="card" style="margin-top:12px"><div class="lab">Seguidores</div>${svgLinea(m.serie, 'seguidores', '#6a28d9')}</div>`));
      partes.push(sec('publicaciones', `Mejores publicaciones${d.total_publicaciones > d.publicaciones.length ? ` (top ${d.publicaciones.length} de ${d.total_publicaciones})` : ''}`, tabla(['Publicación', 'Fecha', 'Alcance / vistas', 'Interacciones', 'Engagement'], d.publicaciones.map(x => [`<div class="post">${o.imagenes && x.imagen ? `<img src="${esc(x.imagen)}" alt="">` : ''}<div><b>${esc(x.red)}</b> · ${esc(x.tipo || '')}<br><span class="chico">${esc((x.texto || '(sin texto)').slice(0, 110))}</span></div></div>`, fechaCorta(x.fecha), `${n(x.alcance)}${x.vistas ? `<br><span class="chico">${n(x.vistas)} vistas</span>` : ''}`, `<b>${n(x.interacciones)}</b><br><span class="chico">${[x.me_gusta !== null ? `${n(x.me_gusta)} ♥` : '', x.comentarios !== null ? `${n(x.comentarios)} com.` : '', x.compartidos ? `${n(x.compartidos)} comp.` : '', x.guardados ? `${n(x.guardados)} guard.` : ''].filter(Boolean).join(' · ')}</span>`, pct(x.er)]), [2, 3, 4])));
      if (m.formatos.length) partes.push(sec('formatos', 'Formatos que mejor funcionan', tabla(['Formato', 'Publicaciones', 'Interacciones promedio', 'Alcance total'], m.formatos.map(x => [esc(x.formato), n(x.publicaciones), `<b>${n(x.promedio)}</b>`, n(x.alcance)]), [1, 2, 3]), 'chica'));
      if (m.audiencia.length) partes.push(sec('audiencia', 'Audiencia', m.audiencia.map(x => `<div class="card" style="margin-bottom:10px"><div class="lab">${esc(x.red)} · ${esc(x.cuenta || '')}</div><div class="g2">${x.edad ? `<div><b class="chico">Edad</b>${barrasPdf(x.edad)}</div>` : ''}${x.genero ? `<div><b class="chico">Género</b>${barrasPdf(x.genero, 3)}</div>` : ''}${x.pais ? `<div><b class="chico">Países</b>${barrasPdf(x.pais, 5)}</div>` : ''}${x.ciudad ? `<div><b class="chico">Ciudades</b>${barrasPdf(x.ciudad, 5)}</div>` : ''}</div></div>`).join('')));
      if (d.horas && d.horas.publicaciones) partes.push(sec('horas', 'Mejor hora para publicar', `<p class="chico" style="margin-top:0">Cada cuadro es un día y una hora (hora de ${esc(d.horas.zona.replace('America/', '').replace('_', ' '))}). Más oscuro = las publicaciones de esa hora rindieron más que lo normal de la cuenta; borde verde = las 3 mejores. Basado en ${d.horas.publicaciones} publicaciones de los últimos ${d.horas.dias} días.</p>${D.mapaHoras(d.horas, { pdf: true })}<p>${D.textoHoras(d.horas).replace(/<span class="muted">/g, '<span class="chico">')}</p>`, 'chica'));
    } else if (S.has('redes')) partes.push(`<section class="sec"><h2>Redes</h2><p class="muted">Todavía no hay cuentas de redes conectadas a Delirium OS para este cliente.</p></section>`);
    if (d.metas.length) partes.push(sec('metas', 'Metas', d.metas.map(x => `<div class="card ${x._ritmo === 'Atrasada' ? 'atr' : ''}" style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;gap:10px"><b>${esc(x.titulo || x.metrica_txt)}</b>${pill(x._ritmo)}</div>
      <div class="meta-bar"><b style="width:${Math.min(100, x._avance || 0)}%"></b></div><div class="chico" style="margin-top:4px">${x._avance || 0}% · ${x.metrica === 'er_alcance' ? pct(x._actual) : n(x._actual)} de ${x.metrica === 'er_alcance' ? pct(x.objetivo) : n(x.objetivo)} · ${fechaCorta(x.desde)} al ${fechaCorta(x.hasta)}${x._proyeccion !== null && x._proyeccion !== undefined && x._ritmo !== 'Cumplida' ? ` · si sigue así: ${x.metrica === 'er_alcance' ? pct(x._proyeccion) : n(x._proyeccion)}` : ''}</div></div>`).join(''), 'chica'));
    partes.push(sec('calendario', `Publicaciones del período (${d.calendario.length})`, tabla(['Publicación', 'Fecha', 'Redes', 'Estado', 'Alcance', 'Interacciones'], d.calendario.map(x => [esc(x.titulo.replace(' (ejemplo)', '')) + (x.formato ? ` <span class="chico">· ${esc(x.formato)}</span>` : ''), fechaCorta(x.fecha), esc(x.redes), pill(x.estado), n(x.alcance), n(x.interacciones)]), [4, 5])));
    if (d.proximas.length) partes.push(sec('proximas', 'Próximas publicaciones (30 días)', tabla(['Publicación', 'Fecha', 'Redes', 'Estado'], d.proximas.map(x => [esc(x.titulo.replace(' (ejemplo)', '')) + (x.formato ? ` <span class="chico">· ${esc(x.formato)}</span>` : ''), `${fechaCorta(x.fecha)} ${String(x.fecha).slice(11, 16)}`, esc(x.redes), pill(x.estado)]))));
    if (d.campanas.length) partes.push(sec('anuncios', 'Campañas de anuncios', `<div class="k">${kp('Inversión', $(d.ads.gasto))}${kp('Resultados', n(d.ads.resultados))}${kp('Costo por resultado', d.ads.cpr !== null ? $(d.ads.cpr) : '—')}${kp('Alcance pagado', n(d.ads.alcance), d.ads.clics ? `${n(d.ads.clics)} clics` : '')}</div>`
      + tabla(['Campaña', 'Plataforma', 'Inversión', 'Resultados', 'Costo por resultado', 'CTR'], d.campanas.map(x => [`${esc(x.nombre.replace(' (ejemplo)', ''))}<br><span class="chico">${esc(x.objetivo || '')} · ${pill(x.estado)}</span>`, esc(x.plataforma), `${$(x.gastado)}${x.presupuesto ? `<br><span class="chico">de ${D.money(x.presupuesto)}</span>` : ''}`, `${n(x.resultados)}<br><span class="chico">${esc(x.tipo_resultado)}</span>`, x.cpr !== null ? $(x.cpr) : '—', pct(x.ctr)]), [2, 3, 4, 5])));
    if (d.proyectos.length || d.piezas.length) partes.push(sec('proyectos', 'Proyectos y piezas', (d.proyectos.length ? tabla(['Proyecto', 'Estado', 'Avance', 'Rondas de cambios', 'Entrega'], d.proyectos.map(x => [esc(x.nombre.replace(' (ejemplo)', '')), pill(x.estado), `${x.avance}%`, esc(x.rondas), fechaCorta(x.entrega)]), [2]) : '')
      + (d.piezas.length ? `<p style="margin:12px 0 4px"><b>${d.piezas.length} piezas aprobadas en el período:</b> <span class="chico">${d.piezas.map(x => esc(x.titulo.replace(' (ejemplo)', ''))).join(' · ')}</span></p>` : '')
      + (d.piezas_revision.length ? `<p style="margin:6px 0"><b>Esperan tu revisión:</b> <span class="chico">${d.piezas_revision.map(x => esc(x.titulo.replace(' (ejemplo)', ''))).join(' · ')}</span></p>` : '')));
    if (d.servicios.length || d.planes.length) partes.push(sec('servicios', 'Servicios y planes', `${d.servicios.length ? `<p style="margin:0 0 8px">${d.servicios.map(x => `<span class="pill va" style="margin:0 4px 4px 0">${esc(x)}</span>`).join('')}</p>` : ''}${d.planes.length ? tabla(['Plan', 'Frecuencia', 'Monto', 'Próximo cobro'], d.planes.map(x => [esc(x.nombre.replace(' (ejemplo)', '')), esc(x.frecuencia), $(x.monto), fechaCorta(x.proximo)]), [2]) : ''}`, 'chica'));
    const fa = d.facturacion;
    if (fa.emitidas.length || fa.pagos.length || fa.pendientes.length) partes.push(sec('facturacion', 'Facturación y pagos', `<div class="k">${kp('Pagado en el período', $(fa.pagado))}${kp('Saldo pendiente', $(fa.saldo), fa.pendientes.some(x => x.vencida) ? '<span class="down">Hay facturas vencidas</span>' : 'Al día')}${kp('Facturas del período', n(fa.emitidas.length))}${kp('Pagos recibidos', n(fa.pagos.length))}</div>`
      + (fa.pendientes.length ? `<div class="lab" style="margin-top:6px">Por pagar</div>${tabla(['Factura', 'Concepto', 'Vence', 'Saldo'], fa.pendientes.map(x => [esc(x.codigo), esc(x.concepto), `${fechaCorta(x.vence)}${x.vencida ? ' <span class="pill mal">Vencida</span>' : ''}`, $(x.saldo)]), [3])}` : '')
      + (fa.pagos.length ? `<div class="lab" style="margin-top:10px">Pagos recibidos</div>${tabla(['Fecha', 'Factura', 'Método', 'Monto'], fa.pagos.map(x => [fechaCorta(x.fecha), esc(x.factura), esc(x.metodo), $(x.monto)]), [3])}` : '')
      + (mon && mon !== base ? `<p class="chico">Montos en ${esc(base)}; el equivalente en ${esc(mon)} es referencial con la tasa del ${D.date(d.tasas_al || D.today())}. Se cobra al cambio del día del pago.</p>` : '')));
    if (d.solicitudes.nuevas || d.solicitudes.abiertas.length) partes.push(sec('solicitudes', 'Solicitudes', `<p style="margin:0 0 6px">${n(d.solicitudes.nuevas)} solicitudes en el período · ${n(d.solicitudes.resueltas)} resueltas.</p>${d.solicitudes.abiertas.length ? tabla(['Solicitud abierta', 'Estado', 'Desde'], d.solicitudes.abiertas.map(x => [esc(x.titulo), pill(x.estado), fechaCorta(x.creado)])) : ''}`, 'chica'));
    if (d.nota || o.nota) partes.push(sec('nota', 'Notas del equipo', `<div class="nota">${esc(o.nota || d.nota)}</div>`, 'chica'));
    const e = d.estudio; partes.push(`<div class="cierre"><span>Preparado por ${esc(e.empresa || 'Delirium Studios')} · ${esc(d.por || '')} · ${esc(D.datetime(d.generado))}</span><span>${[e.correo, e.web, e.telefono].filter(Boolean).map(esc).join(' · ')}</span></div>`);
    return D._pdf.shell(a, { tipo: 'Reporte de resultados', codigo: periodoTxt, fecha: d.generado }, partes.join(''));
  };
  const nombreArchivo = (d) => `Reporte ${d.cliente.nombre.replace(' (ejemplo)', '')} ${d.desde} a ${d.hasta}`;
  D.pdfInforme = async (d, o = {}, carpeta) => {
    const html = await D.htmlInforme(d, { ...o, imagenes: o.imagenes !== false && !window.dos.web });
    const r = await window.dos.pdf(html, nombreArchivo(d), carpeta ? { carpeta } : undefined); if (r.error) throw new Error(r.error); return r.data;
  };
  // ventana rápida desde la ficha del cliente o el portal
  D.reporteMensual = async (clientId) => { Object.assign(IF, { client_id: clientId || '' }); D.closeAll(); D.go('informes'); };

  D.views.informes = async (el) => {
    const cli = isClient(); const clientes = cli ? [] : (D.refs.clientes || []);
    if (!cli && !IF.client_id && clientes.length) IF.client_id = clientes[0].id;
    const mons = D.monedas(); const base = D.settings.moneda || 'USD';
    const sel = (attr, valor, opciones) => `<select class="input" ${attr}>${opciones.map(([v, t]) => `<option value="${esc(v)}" ${String(v) === String(valor) ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>`;
    el.innerHTML = `<div class="page">${D.pageHead(cli ? 'Mis reportes' : 'Reportes para clientes', cli ? 'Descarga el reporte de tus resultados en PDF: redes, metas, publicaciones, anuncios, proyectos y pagos.' : 'Arma el PDF de resultados de cada cliente con todos sus datos: redes, métricas, mejores publicaciones, audiencia, mejor hora, metas, anuncios, proyectos y pagos en su moneda.', !cli && !window.dos.web ? `<button class="btn" data-lote>${D.icon('pdf')} PDF de todos los clientes</button>` : '')}
      <div class="grid g2" style="align-items:start;grid-template-columns:minmax(0,360px) minmax(0,1fr)">
        <div class="card" data-if-form><form class="form">
          ${cli ? '' : `<div class="field full"><label>Cliente</label>${sel('name="client_id"', IF.client_id, clientes.map(c => [c.id, c.nombre]))}</div>`}
          <div class="field full"><label>Período</label>${sel('name="periodo"', IF.periodo, [['mes_pasado', 'Mes pasado'], ['este_mes', 'Este mes (hasta hoy)'], ['30', 'Últimos 30 días'], ['7', 'Últimos 7 días'], ['90', 'Últimos 90 días'], ['trimestre', 'Trimestre pasado (3 meses)'], ['otro', 'Otras fechas…']])}</div>
          <div class="field ${IF.periodo === 'otro' ? '' : 'hidden'}" data-otro><label>Desde</label><input class="input" type="date" name="desde" value="${esc(IF.desde || periodo('30')[0])}"></div>
          <div class="field ${IF.periodo === 'otro' ? '' : 'hidden'}" data-otro><label>Hasta</label><input class="input" type="date" name="hasta" value="${esc(IF.hasta || D.today())}"></div>
          <div class="field full"><label>Mostrar montos también en</label>${sel('name="moneda"', IF.moneda, [['', 'La moneda del cliente'], [base, `Solo ${base}`], ...mons.filter(m => m.codigo !== base).map(m => [m.codigo, `${m.codigo} · ${m.nombre}`])])}<span class="hint">${tasasNota()}</span></div>
          <div class="field full"><label>Qué incluir</label><div class="if-secs">${SECCIONES.filter(([k]) => !(cli && k === 'nota')).map(([k, l]) => `<label class="small"><input type="checkbox" name="sec" value="${k}" ${IF.secciones.includes(k) ? 'checked' : ''}> ${esc(l)}</label>`).join('')}</div></div>
          ${cli ? '' : `<div class="field full"><label>Notas del equipo para el cliente</label><textarea class="input" name="nota" rows="4" placeholder="Ej.: Este mes probamos reels con tendencias; el próximo mes vamos a…">${esc(IF.nota)}</textarea></div>`}
          <div style="display:flex;gap:8px;flex-wrap:wrap;grid-column:1/-1"><button class="btn" type="button" data-prev>Vista previa</button><button class="btn primary" type="button" data-pdf>${D.icon('pdf')} Descargar PDF</button></div>
        </form></div>
        <div class="card" data-if-prev style="min-height:420px;padding:0;overflow:hidden"><div class="empty" style="padding:40px"><h3>Vista previa</h3><p class="muted">Elige el cliente y el período, y pulsa <b>Vista previa</b> para ver el reporte antes de descargarlo.</p></div></div>
      </div></div>`;
    const f = el.querySelector('[data-if-form] form'); f.onsubmit = (e) => e.preventDefault();
    const leer = () => { const fd = new FormData(f); if (!cli) IF.client_id = fd.get('client_id'); IF.periodo = fd.get('periodo'); IF.moneda = fd.get('moneda'); IF.secciones = fd.getAll('sec'); if (!cli) IF.nota = fd.get('nota') || '';
      const [desde, hasta] = IF.periodo === 'otro' ? [fd.get('desde'), fd.get('hasta')] : periodo(IF.periodo); IF.desde = desde; IF.hasta = hasta; return { client_id: IF.client_id, desde, hasta, nota: IF.nota }; };
    f.querySelector('[name=periodo]').onchange = (e) => el.querySelectorAll('[data-otro]').forEach(x => x.classList.toggle('hidden', e.target.value !== 'otro'));
    const prevBox = el.querySelector('[data-if-prev]');
    el.querySelector('[data-prev]').onclick = async () => {
      const p = leer(); if (!cli && !p.client_id) return D.toast('Elige un cliente.', 'error');
      prevBox.innerHTML = '<div class="empty" style="padding:40px"><p class="muted">Armando el reporte…</p></div>';
      const d = await D.try(() => D.call('informeCliente', p)); if (!d) return;
      const html = await D.htmlInforme(d, { secciones: IF.secciones, moneda: IF.moneda, nota: IF.nota, imagenes: false });
      prevBox.innerHTML = ''; const fr = document.createElement('iframe'); fr.setAttribute('sandbox', ''); fr.title = 'Vista previa del reporte'; const z = Math.min(1, (prevBox.clientWidth || 700) / 820); fr.style.cssText = `width:820px;height:${Math.round(window.innerHeight * 0.78 / z)}px;border:0;background:#fff;display:block;zoom:${z}`; fr.srcdoc = html; prevBox.appendChild(fr);
    };
    el.querySelector('[data-pdf]').onclick = async (ev) => {
      const p = leer(); if (!cli && !p.client_id) return D.toast('Elige un cliente.', 'error');
      const b = ev.currentTarget; b.disabled = true; const t = b.innerHTML; b.textContent = 'Creando PDF…';
      try { const d = await D.try(() => D.call('informeCliente', p)); if (d) { const r = await D.pdfInforme(d, { secciones: IF.secciones, moneda: IF.moneda, nota: IF.nota }); if (typeof r === 'string' && window.dos.web) D.toast(r); else if (r) D.toast('Reporte listo.'); } }
      catch (e) { D.toast(e.message, 'error'); } finally { b.disabled = false; b.innerHTML = t; }
    };
    const lote = el.querySelector('[data-lote]'); if (lote) lote.onclick = async () => {
      leer(); const lista = clientes.filter(c => (D.refsFull && D.refsFull.clientes ? (D.refsFull.clientes.find(x => x.id === c.id) || {}).estado === 'Actual' : true));
      const todos = lista.length ? lista : clientes;
      if (!(await D.confirm('PDF de todos los clientes', `Se crearán <b>${todos.length}</b> reportes (${esc(fechaCorta(IF.desde))} al ${esc(fechaCorta(IF.hasta))}) con las mismas secciones, en una carpeta que eliges. Las notas del equipo no se incluyen en el lote.`, 'Elegir carpeta', 'primary'))) return;
      const c = await window.dos.carpeta('Carpeta para los reportes'); const carpeta = c && c.data; if (!carpeta) return;
      let ok = 0; const errores = [];
      for (const cl of todos) { lote.textContent = `Creando ${ok + errores.length + 1} de ${todos.length}…`; try { const d = await D.call('informeCliente', { client_id: cl.id, desde: IF.desde, hasta: IF.hasta }); await D.pdfInforme(d, { secciones: IF.secciones.filter(x => x !== 'nota'), moneda: IF.moneda }, carpeta); ok++; } catch (e) { errores.push(`${cl.nombre}: ${e.message}`); } }
      lote.innerHTML = `${D.icon('pdf')} PDF de todos los clientes`;
      D.toast(`${D.pl(ok, 'reporte creado', 'reportes creados')} en ${carpeta}${errores.length ? ` · ${errores.length} con error` : ''}.`, errores.length ? 'error' : undefined);
    };
  };

  // ═════════════════════ carga del equipo ═════════════════════
  let CS = 2;
  D.views.carga = async (el) => {
    const d = await D.try(() => D.call('cargaEquipo', { semanas: CS })); if (!d) return;
    const r = d.resumen; const todos = D.meta.modules.find(m => m.key === 'carga');
    const barra = (x) => `<div class="progress ${x.pct > 100 ? 'over' : x.pct > 85 ? 'near' : ''}" title="${x.pct}%" style="min-width:120px"><i style="width:${Math.min(100, x.pct)}%"></i></div><span class="sub">${x.capacidad ? `${String(x.horas).replace('.', ',')} h de ${x.capacidad} h · ${x.pct}%` : `${String(x.horas).replace('.', ',')} h · sin capacidad`}</span>`;
    el.innerHTML = `<div class="page">${D.pageHead('Carga del equipo', `Cuánto trabajo tiene cada persona del ${D.date(d.desde)} al ${D.date(d.hasta)} (${d.dias_habiles} días hábiles) frente a sus horas disponibles, descontando ausencias aprobadas.`, `<div class="seg" role="group" aria-label="Semanas">${[1, 2, 3, 4].map(w => `<button class="${CS === w ? 'on' : ''}" data-sem="${w}">${w} ${w === 1 ? 'semana' : 'semanas'}</button>`).join('')}</div>`)}
      ${d.personas.length > 1 ? `<div class="grid g4" style="margin-bottom:16px">
        <div class="kpi ${r.saturados ? 'alert' : ''}"><div class="label">Saturados</div><div class="v">${r.saturados}</div><div class="s">más de lo que alcanzan a hacer</div></div>
        <div class="kpi"><div class="label">Con espacio</div><div class="v">${r.libres}</div><div class="s">menos del 40% de su tiempo</div></div>
        <div class="kpi"><div class="label">Horas planificadas</div><div class="v">${D.num(r.horas)}</div><div class="s">de ${D.num(r.capacidad)} h disponibles</div></div>
        <div class="kpi ${r.sin_asignar ? 'alert' : ''}" ${r.sin_asignar ? 'data-go-tareas tabindex="0" role="button"' : ''}><div class="label">Tareas sin responsable</div><div class="v">${r.sin_asignar}</div><div class="s">${r.ausentes ? D.pl(r.ausentes, 'persona ausente', 'personas ausentes') : 'Nadie ausente'}</div></div></div>` : ''}
      <div class="card">${D.table([
        { key: 'nombre', label: 'Persona', render: x => `<b>${esc(x.nombre)}</b><span class="sub">${esc(x.puesto || (D.meta.roles[x.rol] || {}).label || '')}${x.ausente_hoy ? ` · <span class="badge warn">${esc(x.ausente_hoy)} hoy</span>` : ''}</span>` },
        { key: 'pct', label: 'Carga', render: barra }, { key: 'nivel', label: 'Estado', render: x => D.badge(x.nivel) },
        { key: 'en_ventana', label: 'Tareas', num: true, render: x => `${x.en_ventana}${x.atrasadas ? `<span class="sub" style="color:var(--danger)">${x.atrasadas} atrasadas</span>` : x.sin_estimar ? `<span class="sub">${x.sin_estimar} sin estimar</span>` : ''}` },
        { key: 'piezas', label: 'Piezas · posts', num: true, render: x => `${x.piezas} · ${x.publicaciones}` }, { key: 'proyectos', label: 'Proyectos', num: true },
        { key: 'registradas', label: 'Horas registradas', num: true, render: x => `${String(x.registradas).replace('.', ',')} h<span class="sub">últimos 7 días</span>` },
      ], d.personas)}
      <p class="small muted" style="margin-bottom:0">Cómo se calcula: horas estimadas de sus tareas abiertas que vencen en el período (o sin fecha, o atrasadas); si una tarea no tiene horas estimadas cuenta 2 h (3 h si es Alta o Urgente). Cada pieza en curso suma 2 h y cada publicación a su cargo 30 min. La capacidad sale de <b>Fichas del personal → Horas disponibles por semana</b>. Pulsa una persona para ver sus tareas.</p></div></div>`;
    el.querySelectorAll('[data-sem]').forEach(b => b.onclick = () => { CS = Number(b.dataset.sem); D.views.carga(el); });
    const gt = el.querySelector('[data-go-tareas]'); if (gt) gt.onclick = () => D.go('tareas');
    el.querySelectorAll('tbody tr').forEach((tr, i) => { const x = d.personas[i]; if (!x) return; tr.style.cursor = 'pointer'; tr.onclick = () => {
      const root = D.drawer({ title: x.nombre, subtitle: `${x.nivel} · ${x.pct}% de su tiempo`, body: `<div class="grid g3" style="margin-bottom:16px"><div class="kpi"><div class="label">Planificado</div><div class="v">${String(x.horas).replace('.', ',')} h</div><div class="s">de ${x.capacidad} h (${x.horas_semana} h/semana)</div></div><div class="kpi"><div class="label">Atrasadas</div><div class="v">${x.atrasadas}</div><div class="s">${x.vencen_semana} vencen esta semana</div></div><div class="kpi"><div class="label">Registró</div><div class="v">${String(x.registradas).replace('.', ',')} h</div><div class="s">últimos 7 días</div></div></div>
        ${x.ausencias.length ? `<div class="note" style="margin-bottom:12px">Ausencias: ${x.ausencias.map(a => `${esc(a.tipo)} del ${D.date(a.desde)} al ${D.date(a.hasta)}`).join(' · ')}</div>` : ''}
        <h3>Tareas en el período</h3>${x.lista.length ? x.lista.map(t => `<div style="display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)"><div><a href="#" data-open="tareas:${esc(t.id)}">${esc(t.titulo)}</a><span class="sub" style="display:block">${esc(t.proyecto || 'Sin proyecto')}${t.horas ? ` · ${t.horas} h` : ' · sin estimar'}</span></div><div class="small" style="text-align:right">${t.vence ? `<span style="${t.atrasada ? 'color:var(--danger);font-weight:600' : ''}">${D.date(t.vence)}</span>` : 'Sin fecha'}<br>${D.badge(t.estado)}</div></div>`).join('') : '<p class="muted">Sin tareas abiertas.</p>'}` });
      root.querySelectorAll('[data-open]').forEach(a => a.onclick = (e) => { e.preventDefault(); const [m, id] = a.dataset.open.split(':'); D.openRecord(m, id); });
    }; });
    void todos;
  };

  // ═════════════════════ bandeja de comentarios y mensajes ═════════════════════
  const BF = { estado: 'Nuevo', red: '', client_id: '', tipo: '', q: '' };
  D.views.bandeja = async (el) => {
    if (D._bandejaNegativos) { BF.negativo = true; BF.estado = ''; D._bandejaNegativos = false; }
    const online = D.enNube ? D.enNube() : true;
    const d = await D.try(() => D.call('bandeja', BF)); if (!d) return;
    const clientes = [...new Map(d.cuentas.map(c => [c.cliente, c])).values()];
    const sel = (attr, valor, opciones) => `<select class="input" ${attr} style="width:auto">${opciones.map(([v, t]) => `<option value="${esc(v)}" ${String(v) === String(valor) ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>`;
    const avisos = d.cuentas.filter(c => c.aviso);
    const item = (x) => {
      const hilo = x.tipo === 'mensaje' ? (x.mensajes || []).slice(-6).map(m => `<div class="msg ${m.nuestro ? 'yo' : ''}"><span>${esc(m.texto)}</span><small>${D.rel(m.fecha)}</small></div>`).join('')
        : `<div class="msg"><span>${esc(x.texto)}</span><small>${D.rel(x.fecha)}${x.me_gusta ? ` · ${x.me_gusta} ♥` : ''}</small></div>${[...(x.respuestas_red || []).map(r => ({ ...r, de: r.autor })), ...(x.respuestas || []).filter(r => !(x.respuestas_red || []).some(y => y.texto === r.texto)).map(r => ({ texto: r.texto, fecha: r.fecha, nuestro: true, de: r.por }))].map(r => `<div class="msg ${r.nuestro ? 'yo' : ''}"><span>${esc(r.texto)}</span><small>${esc(r.de || '')} · ${D.rel(r.fecha)}</small></div>`).join('')}`;
      return `<div class="card bx" data-bx="${esc(x.id)}" style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start"><div>${chip(x.red)} <b>${esc(x.autor || '')}</b> <span class="small muted">${x.tipo === 'mensaje' ? 'mensaje directo' : 'comentó'} · ${esc(x.cuenta)} · ${esc(x.cliente)}</span>
          ${x.tipo === 'comentario' && x.post_texto ? `<div class="small muted" style="margin-top:2px">En: «${esc(x.post_texto.slice(0, 90))}»</div>` : ''}</div>${x.negativo ? '<span class="badge danger" style="margin-right:4px">Negativo</span>' : ''}${D.badge(x.estado)}</div>
        <div class="hilo" style="margin:10px 0">${hilo}</div>
        ${d.puede ? `<div class="bx-resp hidden"><textarea class="input" rows="2" placeholder="Escribe la respuesta${x.tipo === 'comentario' ? ' (se publica debajo del comentario)' : ''}…"></textarea><div style="display:flex;gap:8px;margin-top:6px"><button class="btn primary sm" data-enviar>Enviar respuesta</button><button class="btn sm ghost" data-cancelar>Cancelar</button></div></div>
        <div style="display:flex;gap:6px;flex-wrap:wrap" data-bx-acts><button class="btn sm" data-responder ${online ? '' : 'disabled title="Funciona en modo en línea"'}>Responder</button>${x.estado !== 'Resuelto' ? '<button class="btn sm" data-resuelto>Marcar resuelto</button>' : '<button class="btn sm" data-reabrir>Volver a abrir</button>'}${x.tipo === 'comentario' ? `<button class="btn sm ghost" data-ocultar ${online ? '' : 'disabled'}>${x.estado === 'Oculto' ? 'Mostrar' : 'Ocultar'}</button>` : ''}${x.enlace || x.post_enlace ? `<button class="btn sm ghost" data-ver="${esc(x.enlace || x.post_enlace)}">Ver en ${esc(x.red)}</button>` : ''}</div>` : ''}
      </div>`;
    };
    el.innerHTML = `<div class="page">${D.pageHead('Bandeja de redes', 'Comentarios y mensajes de Instagram y Facebook, y comentarios de TikTok, de todos tus clientes en un solo lugar. Responde, oculta o marca como resuelto sin entrar a cada cuenta.', `${online && !isClient() ? `<button class="btn" data-bsync>${D.icon('upload')} Actualizar ahora</button>` : ''}`)}
      ${!online ? '<div class="note" style="margin-bottom:16px">La bandeja funciona cuando el estudio trabaja en línea (Ajustes → Trabajar en línea), porque las cuentas de redes viven en el servidor.</div>' : ''}
      ${!d.cuentas.length ? `<div class="card"><h2>Todavía no hay cuentas conectadas</h2><p class="muted">Conecta las cuentas de Instagram y Facebook de tus clientes en <b>Redes conectadas</b>. Los comentarios y mensajes se revisan cada 20 minutos.</p></div>` : ''}
      ${avisos.length ? `<details class="note" style="margin-bottom:16px"><summary><b>${D.pl(avisos.length, 'cuenta necesita', 'cuentas necesitan')} un permiso más</b> para traer todo (pulsa para ver)</summary><ul class="small" style="margin:8px 0 0">${avisos.map(c => `<li>${chip(c.red)} ${esc(c.nombre)} (${esc(c.cliente)}): ${esc(c.aviso)}</li>`).join('')}</ul><p class="small muted" style="margin:6px 0 0">Dirección los agrega en la app de Meta (Casos de uso → Permisos) y en la configuración del inicio de sesión; luego cada cliente vuelve a conectar su cuenta.</p></details>` : ''}
      ${d.tiktok ? '<p class="small muted" style="margin:-6px 0 14px">Hay cuentas de TikTok sin bandeja: ábrelas en <b>Redes conectadas</b> y pulsa "Conectar bandeja" para traer sus comentarios (TikTok no deja leer mensajes directos).</p>' : ''}
      <div class="toolbar" style="flex-wrap:wrap"><div class="chips" role="group" aria-label="Estado">${[['Nuevo', 'Sin responder'], ['Respondido', 'Respondidos'], ['Resuelto', 'Resueltos'], ['Oculto', 'Ocultos'], ['', 'Todos']].map(([v, t]) => `<button class="chip ${BF.estado === v && !BF.negativo ? 'on' : ''}" data-be="${v}">${t}${v && d.conteo[v] ? ` <span class="n">${d.conteo[v]}</span>` : ''}</button>`).join('')}<button class="chip ${BF.negativo ? 'on' : ''}" data-bneg>Negativos${d.conteo.negativos ? ` <span class="n">${d.conteo.negativos}</span>` : ''}</button></div>
        ${sel('data-bf="tipo"', BF.tipo, [['', 'Comentarios y mensajes'], ['comentario', 'Solo comentarios'], ['mensaje', 'Solo mensajes']])}${sel('data-bf="red"', BF.red, [['', 'Todas las redes'], ['Instagram', 'Instagram'], ['Facebook', 'Facebook'], ['TikTok', 'TikTok']])}
        ${clientes.length > 1 ? sel('data-bf="client_id"', BF.client_id, [['', 'Todos los clientes'], ...clientes.map(c => [c.cliente === 'Delirium Studios' ? 'estudio' : (D.refs.clientes || []).find(x => x.nombre === c.cliente)?.id || '', c.cliente])]) : ''}
        <input class="input" type="search" placeholder="Buscar…" data-bq value="${esc(BF.q)}" style="max-width:220px"></div>
      <div data-blist>${d.items.length ? d.items.map(item).join('') : D.empty(BF.estado === 'Nuevo' ? 'Todo respondido' : 'Nada por aquí', BF.estado === 'Nuevo' ? 'No hay comentarios ni mensajes sin responder.' : 'Prueba con otro filtro.', '')}</div></div>`;
    el.querySelectorAll('[data-be]').forEach(b => b.onclick = () => { BF.estado = b.dataset.be; BF.negativo = false; D.views.bandeja(el); });
    el.querySelector('[data-bneg]').onclick = () => { BF.negativo = !BF.negativo; BF.estado = ''; D.views.bandeja(el); };
    el.querySelectorAll('[data-bf]').forEach(s => s.onchange = () => { BF[s.dataset.bf] = s.value; D.views.bandeja(el); });
    let tq; const q = el.querySelector('[data-bq]'); q.oninput = () => { clearTimeout(tq); tq = setTimeout(() => { BF.q = q.value; D.views.bandeja(el).then(() => { const n_ = el.querySelector('[data-bq]'); n_.focus(); n_.setSelectionRange(n_.value.length, n_.value.length); }); }, 350); };
    const bs = el.querySelector('[data-bsync]'); if (bs) bs.onclick = async () => { bs.disabled = true; bs.textContent = 'Revisando…'; const r = await D.try(() => D.call('bandejaActualizar')); if (r) D.toast(`${D.pl(r.nuevos, 'nuevo', 'nuevos')} en ${D.pl(r.cuentas, 'cuenta', 'cuentas')}.`); D.views.bandeja(el); };
    el.querySelectorAll('[data-bx]').forEach(card => {
      const id = card.dataset.bx; const resp = card.querySelector('.bx-resp'); const acts = card.querySelector('[data-bx-acts]');
      const b = (s) => card.querySelector(s);
      if (b('[data-responder]')) b('[data-responder]').onclick = () => { resp.classList.remove('hidden'); acts.classList.add('hidden'); const ta = resp.querySelector('textarea'); ta.focus(); if (card.querySelector('.red-tiktok')) { ta.maxLength = 150; ta.placeholder = 'Respuesta (máximo 150 caracteres en TikTok)…'; } };
      if (b('[data-cancelar]')) b('[data-cancelar]').onclick = () => { resp.classList.add('hidden'); acts.classList.remove('hidden'); };
      if (b('[data-enviar]')) b('[data-enviar]').onclick = async (e) => { const t = resp.querySelector('textarea').value.trim(); if (!t) return; e.target.disabled = true; e.target.textContent = 'Enviando…'; const r = await D.try(() => D.call('bandejaResponder', id, t), 'Respuesta enviada.'); if (r) D.views.bandeja(el); else { e.target.disabled = false; e.target.textContent = 'Enviar respuesta'; } };
      if (b('[data-resuelto]')) b('[data-resuelto]').onclick = async () => { if (await D.try(() => D.call('action', 'bandeja.marcar', { id, estado: 'Resuelto' }))) D.views.bandeja(el); };
      if (b('[data-reabrir]')) b('[data-reabrir]').onclick = async () => { if (await D.try(() => D.call('action', 'bandeja.marcar', { id, estado: 'Nuevo' }))) D.views.bandeja(el); };
      if (b('[data-ocultar]')) b('[data-ocultar]').onclick = async (e) => { const mostrar = e.target.textContent === 'Mostrar'; if (await D.try(() => D.call('bandejaOcultar', id, !mostrar), mostrar ? 'Comentario visible otra vez.' : 'Comentario oculto: solo lo ve quien lo escribió.')) D.views.bandeja(el); };
      if (b('[data-ver]')) b('[data-ver]').onclick = () => window.dos.openExternal(b('[data-ver]').dataset.ver);
    });
  };

  // ═════════════════════ verificación en dos pasos ═════════════════════
  const qrSvg = (texto) => { try { const q = qrcode(0, 'M'); q.addData(texto); q.make(); return q.createSvgTag({ cellSize: 5, margin: 2, scalable: true }); } catch (e) { return ''; } };
  const mostrarCodigos = (codigos) => D.modal({ title: 'Guarda tus códigos de respaldo', body: `<p style="margin-top:0">Si pierdes el teléfono, cada uno de estos códigos te deja entrar <b>una vez</b>. Guárdalos en un lugar seguro (no en este equipo). No los volveremos a mostrar.</p>
    <div class="codigos mono">${codigos.map(c => `<span>${esc(c)}</span>`).join('')}</div>`,
    onMount: (m) => { const b = document.createElement('button'); b.className = 'btn'; b.textContent = 'Copiar'; b.onclick = () => { navigator.clipboard.writeText(codigos.join('\n')).then(() => D.toast('Códigos copiados.')); }; m.querySelector('.mf').prepend(b);
      const g = document.createElement('button'); g.className = 'btn'; g.textContent = 'Descargar .txt'; g.onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([`Códigos de respaldo de Delirium OS · ${D.me.email}\r\nCada código sirve una sola vez.\r\n\r\n${codigos.join('\r\n')}\r\n`], { type: 'text/plain' })); a.download = 'delirium-os-codigos-de-respaldo.txt'; document.body.appendChild(a); a.click(); setTimeout(() => a.remove(), 500); }; m.querySelector('.mf').prepend(g); },
    buttons: [{ label: 'Ya los guardé', kind: 'primary', value: () => true }] });
  D.dosPasosActivar = async ({ forzado = false } = {}) => {
    const p = await D.try(() => D.call('dosPasosPreparar')); if (!p) return false;
    const v = await D.modal({ title: forzado ? 'Activa la verificación en dos pasos para continuar' : 'Verificación en dos pasos', body: `${forzado ? '<div class="note" style="margin-bottom:12px">Dirección pide que todo el equipo use verificación en dos pasos. Toma un minuto.</div>' : ''}
      <ol style="padding-left:18px;margin-top:0"><li>Instala en tu teléfono una app de verificación: <b>Google Authenticator</b>, <b>Microsoft Authenticator</b> o <b>Authy</b> (gratis).</li><li>En la app pulsa <b>+</b> y escanea este código.</li><li>Escribe el número de 6 dígitos que aparece.</li></ol>
      <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><div class="qr" style="width:180px;height:180px;background:#fff;padding:6px;border-radius:10px">${qrSvg(p.uri)}</div>
      <div style="flex:1;min-width:200px"><div class="small muted">¿No puedes escanear? Escribe esta clave en la app:</div><div class="mono" style="font-size:15px;margin:4px 0 14px;word-break:break-all">${esc(p.secreto)}</div>
      <div class="field"><label for="f_cod2fa">Código de 6 dígitos</label><input class="input mono" id="f_cod2fa" name="codigo" inputmode="numeric" autocomplete="one-time-code" maxlength="7" placeholder="123456" style="font-size:20px;letter-spacing:.2em"></div><div class="err" role="alert" style="margin-top:6px"></div></div></div>`,
      buttons: [{ label: forzado ? 'Salir' : 'Cancelar' }, { label: 'Activar', kind: 'primary', value: async (m) => { const c = m.querySelector('[name=codigo]').value.trim(); try { return await D.call('dosPasosActivar', c); } catch (e) { m.querySelector('.err').textContent = e.message; return false; } } }] });
    if (!v || !v.codigos) return false;
    await mostrarCodigos(v.codigos); D.toast('Verificación en dos pasos activada.'); return true;
  };
  D.dosPasosPedirClave = async (titulo, metodo) => {
    const v = await D.prompt(titulo, `${metodo === 'dosPasosDesactivar' ? '<div class="note" style="grid-column:1/-1">Tu cuenta quedará protegida solo con la contraseña.</div>' : '<div class="note" style="grid-column:1/-1">Los códigos anteriores dejarán de servir.</div>'}${D.fieldHtml({ key: 'password', label: 'Tu contraseña', type: 'password', required: true, full: true })}`, 'Continuar');
    if (!v) return; const r = await D.try(() => D.call(metodo, v.password)); if (!r) return;
    if (r.codigos) await mostrarCodigos(r.codigos); else D.toast('Verificación en dos pasos desactivada.');
    D.me = await D.call('me');
  };
  // Usuarios y roles: estado y botón para quitarla (si alguien perdió el teléfono y sus códigos)
  const prevDetEq = D.DETAIL.equipo;
  D.DETAIL.equipo = (r) => { const b = prevDetEq ? prevDetEq(r) : {}; const base = typeof b === 'string' ? { top: b } : b; return { ...base, top: `${base.top || ''}<div class="note" style="margin-bottom:12px">${D.icon('lock')} Verificación en dos pasos: <b>${r.dos_pasos ? 'activa' : 'no activa'}</b>${r.dos_pasos && canW('equipo') ? ' · <button class="btn sm" data-quitar2fa>Quitarla (perdió el teléfono)</button>' : ''}</div>` }; };
  const prevMountEq = D.MOUNT.equipo;
  D.MOUNT.equipo = (root, r) => { if (prevMountEq) prevMountEq(root, r); const b = root.querySelector('[data-quitar2fa]'); if (b) b.onclick = async () => { if (!(await D.confirm('Quitar la verificación en dos pasos', `${esc(r.nombre)} podrá entrar solo con su contraseña${D.settings.exigir_2fa ? ' y tendrá que activarla de nuevo al entrar' : ''}. Hazlo solo si confirmaste que es esa persona.`, 'Sí, quitarla'))) return; if (await D.try(() => D.call('action', 'usuario.reiniciar2fa', { id: r.id }), 'Listo.')) { D.closeAll(); D.rerender(); } }; };

  // ═════════════════════ ajustes: monedas y seguridad ═════════════════════
  D.monedasTab = (body) => {
    const lista = D.settings.monedas || []; const base = D.settings.moneda || 'USD';
    body.innerHTML = `<div class="grid g2" style="align-items:start"><div class="card"><h2>Monedas</h2><p class="small muted" style="margin-top:0">Los precios se guardan en <b>${esc(base)}</b> (cámbiala en la pestaña Estudio). Aquí eliges en qué otras monedas se muestran los equivalentes en cotizaciones, facturas, PDFs, el portal del cliente y los reportes.</p>
      <div class="table-wrap"><table><thead><tr><th>Código</th><th>Nombre</th><th>Símbolo</th><th>Mostrar</th><th></th></tr></thead><tbody data-mlist>${lista.map(m => `<tr data-cod="${esc(m.codigo)}"><td><b>${esc(m.codigo)}</b></td><td><input class="input" data-k="nombre" value="${esc(m.nombre || '')}"></td><td><input class="input" data-k="simbolo" value="${esc(m.simbolo || '')}" style="width:80px"></td><td><input type="checkbox" data-k="mostrar" ${m.mostrar !== false ? 'checked' : ''} ${m.codigo === base ? 'disabled' : ''}></td><td>${m.codigo === base ? '<span class="small muted">base</span>' : '<button class="btn sm ghost" data-quitar>Quitar</button>'}</td></tr>`).join('')}</tbody></table></div>
      <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><input class="input" data-nueva placeholder="Código (ej.: PEN, ARS, CLP, BRL)" maxlength="6" style="max-width:220px"><button class="btn" data-agregar>Agregar moneda</button><button class="btn primary" data-guardar-mon>Guardar monedas</button></div></div>
      <div class="card"><h2>Tasas de cambio</h2><p class="small muted" style="margin-top:0">${tasasNota()}</p><button class="btn" data-tasas>Ver y editar tasas</button><p class="small muted">Finanzas también puede editarlas desde <b>Facturas y pagos → Tasas del día</b>.</p></div></div>`;
    const tb = body.querySelector('[data-mlist]');
    const quitar = () => tb.querySelectorAll('[data-quitar]').forEach(b => b.onclick = () => b.closest('tr').remove()); quitar();
    body.querySelector('[data-agregar]').onclick = () => { const i = body.querySelector('[data-nueva]'); const c = i.value.trim().toUpperCase(); if (!/^[A-Z]{2,6}$/.test(c)) return D.toast('Escribe un código de 3 letras, como PEN o ARS.', 'error'); if (tb.querySelector(`[data-cod="${c}"]`)) return;
      tb.insertAdjacentHTML('beforeend', `<tr data-cod="${c}" data-nueva-fila><td><b>${c}</b></td><td><input class="input" data-k="nombre" value="${c}"></td><td><input class="input" data-k="simbolo" value="${c}" style="width:80px"></td><td><input type="checkbox" data-k="mostrar" checked></td><td><button class="btn sm ghost" data-quitar>Quitar</button></td></tr>`); i.value = ''; quitar(); };
    body.querySelector('[data-guardar-mon]').onclick = async () => {
      const monedas = [...tb.querySelectorAll('tr[data-cod]')].map(tr => { const antes = lista.find(m => m.codigo === tr.dataset.cod) || { tasa: 0, auto: true }; return { ...antes, codigo: tr.dataset.cod, nombre: tr.querySelector('[data-k=nombre]').value, simbolo: tr.querySelector('[data-k=simbolo]').value, mostrar: tr.querySelector('[data-k=mostrar]').checked || tr.dataset.cod === base }; });
      if (await D.try(() => D.call('action', 'ajustes.guardar', { monedas }), 'Monedas guardadas.')) { D.settings = await D.call('settings'); if (monedas.some(m => m.auto && !m.tasa)) D.try(() => D.call('actualizarTasas')).then(async () => { D.settings = await D.call('settings'); }); D.monedasTab(body); }
    };
    body.querySelector('[data-tasas]').onclick = () => D.abrirTasas();
  };
  D.seguridadTab = (body, F) => {
    body.innerHTML = `<div class="grid g2" style="align-items:start"><div class="card"><h2>Verificación en dos pasos</h2><p class="small muted" style="margin-top:0">Además de la contraseña, al entrar se pide un código de 6 dígitos que cambia cada 30 segundos en el teléfono de cada persona (Google Authenticator, Microsoft Authenticator o Authy). Si alguien pierde el teléfono, usa uno de sus códigos de respaldo o Dirección se la quita desde <b>Usuarios y roles</b>.</p>
      <p>Tu cuenta: ${D.me.dos_pasos ? '<span class="badge ok">Activa</span>' : '<span class="badge warn">No activa</span> <button class="btn sm" data-activar-yo>Activarla ahora</button>'}</p>
      <form class="form" data-s>${F('exigir_2fa', 'Exigirla a todo el equipo (los clientes pueden activarla si quieren)', 'checkbox')}</form>
      <p class="small muted">Al exigirla, quien no la tenga deberá activarla la próxima vez que entre. Pulsa <b>Guardar ajustes</b> arriba.</p></div>
      <div class="card"><h2>Otras protecciones que ya tienes</h2><ul class="small" style="margin:0;padding-left:18px;line-height:1.7"><li>5 intentos fallidos bloquean la cuenta 5 minutos.</li><li>Contraseñas guardadas con scrypt (nadie puede leerlas).</li><li>Cada persona ve solo lo de su rol; los clientes solo lo suyo.</li><li>Las claves de las redes y de Meta nunca salen del servidor.</li><li>Todo queda en el Registro de actividad.</li></ul></div></div>`;
    const a = body.querySelector('[data-activar-yo]'); if (a) a.onclick = async () => { if (await D.dosPasosActivar()) { D.me = await D.call('me'); D.seguridadTab(body, F); } };
  };
})(window.DOS);
