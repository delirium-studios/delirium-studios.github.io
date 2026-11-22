// Delirium OS — redes sociales conectadas: autorizar cuentas de clientes, publicar automáticamente y traer métricas.
(function (D) {
  const esc = D.esc;
  const ref = (mod) => () => (D.refs[mod] || []).map(r => ({ value: r.id, label: r.nombre }));
  const canW = (k) => (D.meta.modules.find(m => m.key === k) || {}).level === 'W';
  const isClient = () => ['cliente', 'cliente_eq'].includes(D.me.rol);
  const REDES = ['Instagram', 'Facebook', 'TikTok']; // X (API de pago) y YouTube (Google Cloud no acepta Venezuela) quedan programados pero ocultos
  const TONO = { Conectada: 'ok', 'Sin conectar': '', Vencida: 'danger', 'Elegir página': 'warn' };
  const NOTA = {
    Instagram: 'Cuenta profesional (de empresa o creador). Fotos, carruseles de una imagen, reels y stories.',
    Facebook: 'Páginas de Facebook que administra la persona que autoriza. Texto, fotos y videos.',
    TikTok: 'Solo videos. Hasta que TikTok apruebe la app, se publican en privado ("Solo yo").',
    YouTube: 'Videos y shorts. Hasta que Google apruebe la app, se suben en privado.',
    X: 'Requiere créditos de la API de X (de pago). Se activa en Ajustes.',
  };
  const chipRed = (red) => `<span class="red-chip red-${String(red).toLowerCase()}">${esc(red)}</span>`;

  Object.assign(D.SCHEMA, {
    cuentas: {
      singular: 'cuenta', plural: 'cuentas', nuevo: 'Conectar una red',
      help: 'Las cuentas de redes de cada cliente (y de Delirium) autorizadas para publicar desde el Calendario de redes y traer seguidores y resultados.',
      vacio: ['Sin redes conectadas', 'Agrega la red de un cliente y envíale el enlace para que la autorice, o autorízala tú si la administras.'],
      filtro: { key: 'red', values: REDES },
      columns: [
        { key: 'red', label: 'Red', render: r => chipRed(r.red) },
        { key: 'nombre', label: 'Cuenta', render: r => `${esc(r.nombre || 'Sin nombre todavía')}<span class="sub">${esc(r._cliente || '')}</span>` },
        { key: 'estado', label: 'Estado', render: r => D.badge(r.estado, TONO[r.estado]) },
        { key: 'seguidores', label: 'Seguidores', render: r => r.estado === 'Conectada' ? `${D.num(r.seguidores || 0)}${r._m30 && r._m30.crecimiento !== null ? `<span class="sub">${r._m30.crecimiento >= 0 ? '+' : ''}${D.num(r._m30.crecimiento)} en 30 días</span>` : ''}` : '—' },
        { key: '_m30', label: 'Últimos 30 días', render: r => r._m30 && !r._m30.vacio ? `${D.num(r._m30.interacciones || 0)} interacciones<span class="sub">${r._m30.alcance !== null ? `${D.num(r._m30.alcance)} de alcance` : `${D.num(r._m30.vistas || 0)} vistas`}${r._m30.er !== null ? ` · ${String(r._m30.er).replace('.', ',')}% eng.` : ''}</span>` : '<span class="muted">—</span>' },
      ],
      fields: [
        { key: 'red', label: 'Red', type: 'select', options: REDES, required: true, default: 'Instagram' },
        { key: 'client_id', label: 'Cliente', type: 'select', options: ref('clientes'), hint: 'Déjalo vacío para una cuenta de Delirium Studios.', show: () => !isClient() },
        { key: 'nombre', label: 'Nombre o usuario (se completa solo al conectar)', placeholder: '@usuario' },
        { key: 'notas', label: 'Notas', type: 'textarea' },
      ],
    },
  });

  // ───── abrir el enlace de conexión ─────
  async function enlace(p) { return D.try(() => D.call('enlaceConexion', p)); }
  D.conectarRed = async (p, { copiar = false } = {}) => {
    const r = await enlace(p); if (!r) return null;
    if (copiar) {
      try { await navigator.clipboard.writeText(r.url); D.toast('Enlace copiado. Envíaselo al cliente: vale 7 días.'); } catch (e) { D.toast('No se pudo copiar el enlace.', 'error'); }
    } else { window.dos.openExternal(r.url); D.toast('Se abrió el navegador: inicia sesión en la red y acepta los permisos. Cuando termines, vuelve aquí.'); }
    return r.cuenta;
  };

  D.DETAIL.cuentas = (r) => {
    const hist = (r.historial || []).slice(-30); const max = Math.max(1, ...hist.map(h => h.seguidores));
    return {
      top: `<div class="note ${r.estado === 'Vencida' ? 'danger' : ''}" style="margin-bottom:16px">${chipRed(r.red)} &nbsp;${D.badge(r.estado, TONO[r.estado])} &nbsp;${esc(NOTA[r.red] || '')}</div>
        ${r.ultimo_error ? `<div class="note danger" style="margin-bottom:16px"><b>Último problema:</b> ${esc(r.ultimo_error)}</div>` : ''}
        ${r.estado === 'Elegir página' && (r.paginas || []).length ? `<div class="card" style="margin-bottom:16px"><h3>¿Qué página es la de ${esc(r._cliente || 'este cliente')}?</h3><div class="list">${r.paginas.map(p => `<div class="item" style="cursor:default"><div class="t"><b>${esc(p.name)}</b></div><button class="btn sm violet" data-pagina="${esc(p.id)}">Usar esta</button></div>`).join('')}</div></div>` : ''}
        ${r.estado === 'Conectada' ? `<div class="grid g3" style="margin-bottom:14px"><div class="kpi"><div class="label">Seguidores</div><div class="v">${D.num(r.seguidores || 0)}</div></div><div class="kpi"><div class="label">Publicaciones</div><div class="v">${D.num(r.publicaciones_total || 0)}</div></div><div class="kpi"><div class="label">Conectada</div><div class="v" style="font-size:16px">${D.date(r.conectada_el)}</div><div class="s">${r._vence_dias !== null && r._vence_dias !== undefined ? `Renovación: ${r._vence_dias} días` : 'Se renueva sola'}</div></div></div>` : ''}
        ${r.estado === 'Conectada' && r._m30 ? (r._m30.vacio ? `<div class="note" style="margin-bottom:14px">Las métricas de esta cuenta llegan en las próximas horas (se traen los últimos 30 días y después se actualizan solas cada 6 horas).</div>` : `<div class="label" style="margin:4px 0 6px">Últimos 30 días${r._m30.metricas_al ? ` · actualizado ${esc(new Date(r._m30.metricas_al).toLocaleString('es-VE', { dateStyle: 'short', timeStyle: 'short' }))}` : ''}</div>
          <div class="grid g4" style="margin-bottom:14px"><div class="kpi"><div class="label">${r._m30.alcance !== null ? 'Alcance' : 'Vistas'}</div><div class="v" style="font-size:22px">${D.num(r._m30.alcance !== null ? r._m30.alcance : r._m30.vistas || 0)}</div></div><div class="kpi"><div class="label">Interacciones</div><div class="v" style="font-size:22px">${D.num(r._m30.interacciones || 0)}</div></div><div class="kpi"><div class="label">Engagement</div><div class="v" style="font-size:22px">${r._m30.er !== null ? String(r._m30.er).replace('.', ',') + '%' : '—'}</div></div><div class="kpi"><div class="label">Publicaciones</div><div class="v" style="font-size:22px">${D.num(r._m30.publicaciones)}</div><div class="s">${r._m30.crecimiento !== null ? `${r._m30.crecimiento >= 0 ? '+' : ''}${D.num(r._m30.crecimiento)} seguidores` : ''}</div></div></div>
          <button class="btn sm" data-vermetricas style="margin-bottom:14px">${D.icon('metricas')} Ver todas sus métricas</button>`) : ''}
        ${hist.length > 1 ? `<div class="label" style="margin:4px 0 6px">Seguidores, últimos ${hist.length} registros</div><div class="bars mini">${hist.map(h => `<div class="b" title="${D.date(h.fecha)}: ${D.num(h.seguidores)}"><div class="pair"><i class="in" style="height:${Math.max(4, h.seguidores / max * 100)}%;width:70%"></i></div><span class="m">${Number(String(h.fecha).slice(8))}</span></div>`).join('')}</div>` : ''}`,
      bottom: r.enlace_perfil ? `<p class="small"><a href="#" data-ext="${esc(r.enlace_perfil)}">Ver el perfil en ${esc(r.red)}</a></p>` : '',
    };
  };
  D.ACTIONS.cuentas = (r) => {
    if (D.me.rol === 'cliente_eq' || !canW('cuentas')) return '';
    const out = [];
    if (r.estado !== 'Sin conectar') out.push('<button class="btn" data-act="desconectarRed">Desconectar</button>');
    if (!isClient()) out.push('<button class="btn" data-act="copiarEnlaceRed">Enlace para el cliente</button>');
    out.push(`<button class="btn violet" data-act="conectarRed">${r.estado === 'Conectada' ? 'Volver a conectar' : 'Conectar ahora'}</button>`);
    return out.join('');
  };
  Object.assign(D.HANDLERS, {
    conectarRed: (r) => D.conectarRed({ id: r.id }),
    copiarEnlaceRed: (r) => D.conectarRed({ id: r.id }, { copiar: true }),
    desconectarRed: async (r) => { if (!(await D.confirm('Desconectar', `Delirium OS dejará de publicar y medir en <b>${esc(r.nombre || r.red)}</b>. Puedes volver a conectarla cuando quieras.`, 'Desconectar'))) return; if (await D.try(() => D.call('action', 'cuenta.desconectar', { id: r.id }), 'Cuenta desconectada.')) { D.rerender(); D.openRecord('cuentas', r.id); } },
  });
  D.MOUNT.cuentas = (root, r) => {
    const vm = root.querySelector('[data-vermetricas]'); if (vm) vm.onclick = () => { MF.client_id = isClient() ? '' : (r.client_id || 'estudio'); MF.red = r.red; if (D.closeAll) D.closeAll(); D.go('metricas'); };
    root.querySelectorAll('[data-pagina]').forEach(b => b.onclick = async () => { if (await D.try(() => D.call('action', 'cuenta.pagina', { id: r.id, pagina_id: b.dataset.pagina }), 'Página conectada.')) { D.rerender(); D.openRecord('cuentas', r.id); } });
  };
  D.PAGE_ACTIONS.cuentas = () => {
    const a = [];
    if (canW('cuentas') && D.me.rol !== 'cliente_eq') a.push(`<button class="btn" data-page-act="redesNueva">${isClient() ? 'Conectar una red' : 'Conectar y enviar enlace'}</button>`);
    if (canW('cuentas') && !isClient()) a.push('<button class="btn" data-page-act="redesSync">Actualizar seguidores y resultados</button>');
    return a.join('');
  };
  D.PAGE_HANDLERS.redesNueva = async () => {
    const v = await D.prompt(isClient() ? 'Conectar una red' : 'Conectar la red de un cliente',
      D.fieldHtml({ key: 'red', label: 'Red', type: 'select', options: REDES, required: true }, { red: 'Instagram' })
      + (isClient() ? '' : D.fieldHtml({ key: 'client_id', label: 'Cliente', type: 'select', options: ref('clientes'), hint: 'Vacío = cuenta de Delirium Studios.' }))
      + (isClient() ? '<div class="note" style="grid-column:1/-1">Se abrirá la red para que inicies sesión y aceptes. Delirium solo podrá publicar lo que apruebes y ver los resultados.</div>' : D.fieldHtml({ key: 'como', label: '¿Quién la autoriza?', type: 'select', options: [{ value: 'enlace', label: 'El cliente: copiar enlace para enviárselo' }, { value: 'yo', label: 'Yo, ahora (administro esa cuenta)' }] }, { como: 'enlace' })),
      'Continuar');
    if (!v) return;
    const c = await D.conectarRed({ red: v.red, client_id: v.client_id || null }, { copiar: !isClient() && v.como !== 'yo' });
    if (c) { D.rerender(); D.openRecord('cuentas', c.id); }
  };
  D.PAGE_HANDLERS.redesSync = async () => {
    const r = await D.try(() => D.call('sincronizarRedes')); if (!r) return;
    D.toast(`Listo: ${D.pl(r.cuentas, 'cuenta actualizada', 'cuentas actualizadas')} y ${D.pl(r.metricas, 'publicación medida', 'publicaciones medidas')}.${r.errores.length ? ` ${r.errores.length} con problemas.` : ''}`, r.errores.length ? 'error' : 'ok');
    D.rerender();
  };

  // ───── publicación automática en el Calendario de redes ─────
  const addPost = () => { const fs = D.SCHEMA.redes.fields; if (fs.some(f => f.key === 'publicar_auto')) return; const i = fs.findIndex(f => f.key === 'hashtags');
    fs.splice(i + 1, 0,
      { key: 'medio', label: 'Foto o video a publicar', type: 'file', hint: 'JPG o PNG para fotos; MP4 para reels, TikTok y YouTube (hasta 50 MB).', show: () => !isClient() },
      { key: 'medio_url', label: 'O enlace público al archivo', placeholder: 'https://…', show: () => !isClient() },
      { key: 'publicar_auto', label: 'Publicar sola a la fecha y hora indicadas', type: 'checkbox', hint: 'Se publica cuando esté "Aprobado" o "Programado" en las redes marcadas con cuentas conectadas.', show: () => !isClient() });
  };
  addPost();
  const prevDetPost = D.DETAIL.redes;
  D.DETAIL.redes = (r) => {
    const b = prevDetPost ? prevDetPost(r) : {};
    const pubs = r.publicaciones || [];
    const sec = (r.publicar_auto || pubs.length) && !isClient() ? `<div class="section"><h3>Publicación automática</h3>
      ${r.publicar_auto && !pubs.length ? `<p class="muted" style="margin:0 0 8px">Se publicará el ${D.datetime(r.fecha)} en ${esc((r.redes || []).filter(x => REDES.includes(x)).join(', ') || '—')} si está Aprobado o Programado.</p>` : ''}
      ${pubs.length ? `<div class="list">${pubs.map(p => `<div class="item" style="cursor:default"><div class="t"><b>${chipRed(p.red)} ${esc(p.cuenta || '')}</b><span>${p.estado === 'Error' ? `<span style="color:var(--danger)">${esc(p.error)}</span>` : p.estado === 'Procesando' ? 'La red está procesando el video…' : `${D.datetime(p.fecha)}${p.privado ? ' · <b>privado</b> (la app aún no está aprobada por la red)' : ''}${p.metricas ? ` · alcance ${D.num(p.metricas.alcance || 0)} · ${D.num(p.metricas.interacciones || 0)} interacciones` : ''}`}</span></div>
        ${p.enlace ? `<button class="btn sm" data-ext="${esc(p.enlace)}">Ver</button>` : ''}${D.badge(p.estado, p.estado === 'Publicado' ? 'ok' : p.estado === 'Error' ? 'danger' : 'warn')}</div>`).join('')}</div>` : ''}</div>` : '';
    return { top: b.top, bottom: `${b.bottom || ''}${sec}` };
  };
  const prevActPost = D.ACTIONS.redes;
  D.ACTIONS.redes = (r) => `${prevActPost ? prevActPost(r) : ''}${canW('redes') && !isClient() && (r.redes || []).some(x => REDES.includes(x)) && r.estado !== 'Publicado' ? `<button class="btn violet" data-act="publicarYa">${D.icon('send')} Publicar ahora</button>` : ''}`;
  D.HANDLERS.publicarYa = async (r) => {
    const destinos = (r.redes || []).filter(x => REDES.includes(x));
    if (!(await D.confirm('Publicar ahora', `Se publicará <b>${esc(r.titulo)}</b> en ${esc(destinos.join(', '))}, en las cuentas conectadas de ${esc(r._cliente || 'el cliente')}. Esto no se puede deshacer desde aquí.`, 'Publicar', 'violet'))) return;
    const out = await D.try(() => D.call('publicarAhora', r.id)); if (!out) return;
    D.toast(out.errores.length ? `Con problemas: ${out.errores[0]}` : out.procesando ? 'Enviado: la red está procesando el video. Se completa solo en unos minutos.' : `¡Publicado en ${D.pl(out.publicadas, 'red', 'redes')}!`, out.errores.length ? 'error' : 'ok');
    D.rerender(); D.openRecord('redes', r.id);
  };

  // ───── Ajustes: pestaña "Redes sociales" ─────
  D.redesTab = async (body, s, info, F) => {
    const online = info.modo === 'nube';
    const datos = online && !info.web ? await D.try(() => D.call('datosRedes')) : null;
    const web = String(s.web_publica || 'https://delirium-studios.github.io').replace(/\/$/, '');
    const dato = (label, valor) => `<div class="keybox" style="margin:4px 0 8px"><span class="small"><b>${esc(label)}:</b> <span class="mono">${esc(valor)}</span></span><button class="btn sm" data-copiar="${esc(valor)}">Copiar</button></div>`;
    const cron = datos ? `create extension if not exists pg_cron;\ncreate extension if not exists pg_net;\nselect cron.unschedule(jobid) from cron.job where jobname = 'delirium-redes';\nselect cron.schedule('delirium-redes', '*/5 * * * *', $$\n  select net.http_post(\n    url := '${datos.tareas}',\n    headers := jsonb_build_object('Content-Type', 'application/json', 'x-delirium-cron', (select valor->>'cron_secreto' from public.dos_meta where clave = 'settings')),\n    body := '{}'::jsonb, timeout_milliseconds := 120000)\n  where exists (select 1 from public.dos_meta where clave = 'settings' and coalesce(valor->>'cron_secreto', '') <> '');\n$$);` : '';
    body.innerHTML = `${!online ? '<div class="note warn" style="margin-bottom:16px">Las redes necesitan el modo en línea: después de autorizar, cada red devuelve a la persona a la dirección de la nube del estudio.</div>' : ''}
      <div class="grid g2">
        <div class="card"><h2>Datos para los portales de desarrollador</h2><p class="muted" style="margin-top:0">Cópialos tal cual en Meta for Developers, TikTok for Developers y Google Cloud.</p>
          ${datos ? dato('Dirección de vuelta (redirect / callback)', datos.vuelta) : '<p class="muted">Aparece cuando el estudio esté en línea.</p>'}
          ${dato('Sitio web', web)}${dato('Política de privacidad', web + '/privacidad.html')}${dato('Términos del servicio', web + '/terminos.html')}${dato('Eliminación de datos', web + '/eliminar-datos.html')}
          <form class="form" data-s>${F('web_publica', 'Dirección de la web pública (GitHub Pages)', 'text', { full: true })}${F('correo_privacidad', 'Correo de contacto para privacidad', 'email', { full: true, hint: 'Debe existir y recibir correos: lo piden Meta, TikTok y Google.' })}${F('zona_horaria', 'Zona horaria de las publicaciones', 'select', { options: ['America/Caracas', 'America/Bogota', 'America/Mexico_City', 'America/New_York', 'America/Santiago', 'America/Argentina/Buenos_Aires', 'Europe/Madrid'] })}</form></div>
        <div class="card"><h2>Publicación automática</h2><p class="muted" style="margin-top:0">Supabase revisa cada 5 minutos si hay publicaciones que tocan, sigue los videos que las redes están procesando y cada 6 horas trae seguidores y resultados. Se instala una sola vez: pega esto en <b>SQL Editor</b> y pulsa <b>Run</b>.</p>
          ${datos ? `<pre class="code">${esc(cron)}</pre><button class="btn sm" data-copiar="${esc(cron)}">Copiar SQL</button>` : '<p class="muted">Aparece cuando el estudio esté en línea.</p>'}</div>
      </div>
      <div class="grid g2" style="margin-top:16px">
        <div class="card"><h2>${chipRed('Instagram')} ${chipRed('Facebook')} Meta</h2><form class="form" data-s>
          ${F('meta_app_id', 'ID de la app de Meta')}${F('meta_app_secret', 'Clave secreta de la app de Meta', 'password')}
          ${F('ig_config_id', 'Instagram: ID de la configuración (Unified login)', 'text', { hint: 'Inicio de sesión con Facebook para empresas → Configuraciones.' })}${F('fb_config_id', 'Facebook: ID de la configuración de páginas', 'text', { hint: 'Configuración con token de usuario y permisos de páginas.' })}</form>
          <p class="small muted">Instagram usa el "Unified login" de Meta: el cliente entra con Instagram o Facebook, elige su portfolio comercial y marca su cuenta profesional. Mientras la app esté en modo desarrollo, agrega a cada cliente como <b>Evaluador de Instagram</b> (para Facebook: que te den rol en la app o acceso a su página).</p></div>
        <div class="card"><h2>${chipRed('TikTok')}</h2><form class="form" data-s>${F('tiktok_client_key', 'Client key')}${F('tiktok_client_secret', 'Client secret', 'password')}${F('tiktok_auditada', 'TikTok ya aprobó la app (publicar en público)', 'checkbox')}</form>
          <p class="small muted">Productos: Login Kit y Content Posting API (Direct Post). Hasta la aprobación, los videos salen privados y como máximo 5 cuentas por día.</p></div>
      </div>`;
    body.querySelectorAll('[data-copiar]').forEach(b => b.onclick = async () => { try { await navigator.clipboard.writeText(b.dataset.copiar); D.toast('Copiado.'); } catch (e) { D.toast('No se pudo copiar.', 'error'); } });
  };

  // ───────────── panel de métricas para marketing ─────────────
  const MF = { dias: 30, client_id: '', red: '' }; let MSERIE = 'alcance';
  const n = (x) => x === null || x === undefined ? '—' : D.num(x);
  const pct = (x) => x === null || x === undefined ? '—' : `${String(x).replace('.', ',')}%`;
  const delta = (x) => x === null || x === undefined ? '' : `<span class="small" style="color:${x >= 0 ? 'var(--ok)' : 'var(--danger)'}">${x >= 0 ? '▲' : '▼'} ${String(Math.abs(x)).replace('.', ',')}%</span>`;
  const NOMBRES = { alcance: 'Alcance', vistas: 'Vistas', interacciones: 'Interacciones', seguidores: 'Seguidores' };

  function linea(serie, campo) {
    const W = 640, H = 260, P = 40; const vals = serie.map(x => x[campo] || 0); const max = Math.max(1, ...vals); const min = campo === 'seguidores' ? Math.min(...vals) : 0; const rango = Math.max(1, max - min);
    const X = (i) => P + (W - P - 8) * (serie.length > 1 ? i / (serie.length - 1) : 0.5); const Y = (v) => H - 22 - (H - 40) * ((v - min) / rango);
    const pts = vals.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
    const marcas = [0, Math.floor((serie.length - 1) / 2), serie.length - 1].filter((v, i, a) => a.indexOf(v) === i);
    return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto" role="img" aria-label="${esc(NOMBRES[campo])} por día">
      <line x1="${P}" y1="${H - 22}" x2="${W - 8}" y2="${H - 22}" stroke="var(--border)"/><text x="${P - 6}" y="${Y(max) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${esc(D.num(max))}</text><text x="${P - 6}" y="${H - 18}" text-anchor="end" font-size="11" fill="var(--muted)">${esc(D.num(min))}</text>
      <polygon points="${X(0)},${H - 22} ${pts} ${X(vals.length - 1)},${H - 22}" fill="var(--accent)" opacity=".12"/><polyline points="${pts}" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round"/>
      ${vals.map((v, i) => `<circle cx="${X(i)}" cy="${Y(v)}" r="7" fill="transparent"><title>${esc(serie[i].fecha)}: ${esc(D.num(v))}</title></circle>`).join('')}
      ${marcas.map((i, k) => `<text x="${X(i)}" y="${H - 4}" text-anchor="${k === 0 ? 'start' : i === serie.length - 1 ? 'end' : 'middle'}" font-size="11" fill="var(--muted)">${esc(serie[i].fecha.slice(8, 10) + '/' + serie[i].fecha.slice(5, 7))}</text>`).join('')}</svg>`;
  }
  const barrasDe = (obj, max = 6) => { const e = Object.entries(obj || {}).sort((a, b) => b[1] - a[1]).slice(0, max); const tot = Object.values(obj || {}).reduce((a, b) => a + b, 0) || 1;
    return e.map(([k, v]) => `<div style="display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr) 40px;gap:8px;align-items:center;margin:6px 0"><span class="small" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${esc(k)}">${esc(k === 'F' ? 'Mujeres' : k === 'M' ? 'Hombres' : k === 'U' ? 'Sin dato' : k)}</span><div class="progress"><i style="width:${(v / tot * 100).toFixed(1)}%"></i></div><span class="small mono" style="text-align:right">${Math.round(v / tot * 100)}%</span></div>`).join(''); };
  function csv(nombre, filas) {
    if (!filas.length) return D.toast('No hay datos para exportar.', 'error');
    const cols = Object.keys(filas[0]); const q = (x) => { const t = x === null || x === undefined ? '' : String(x); return /[",;\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
    const blob = new Blob(['﻿' + [cols.join(';'), ...filas.map(f => cols.map(c => q(f[c])).join(';'))].join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nombre; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  D.views.metricas = async (el) => {
    const d = await D.try(() => D.call('metricasRedes', MF)); if (!d) return;
    const a = d.actual, c = d.cambio; const online = D.enNube ? D.enNube() : true;
    const clientes = [...new Map(d.cuentas.map(x => [x.client_id, x.cliente])).entries()];
    if (MF.client_id && !clientes.some(([id]) => id === MF.client_id)) clientes.push([MF.client_id, 'Cliente elegido']);
    const sel = (attr, valor, opciones) => `<select class="input" ${attr} style="width:auto">${opciones.map(([v, t]) => `<option value="${esc(v)}" ${String(v) === String(valor) ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>`;
    const filtros = `${!isClient() ? sel('data-mf="client_id"', MF.client_id, [['', 'Todos los clientes'], ...clientes]) : ''}${sel('data-mf="red"', MF.red, [['', 'Todas las redes'], ...REDES.map(r => [r, r])])}${sel('data-mf="dias"', MF.dias, [[7, 'Últimos 7 días'], [30, 'Últimos 30 días'], [90, 'Últimos 90 días'], [180, 'Últimos 6 meses'], [365, 'Último año']])}
      ${canW('cuentas') && !isClient() ? `<button class="btn" data-msync>${D.icon('upload')} Actualizar ahora</button>` : ''}<button class="btn" data-mcsv>${D.icon('download')} Exportar</button>`;
    const kpi = (label, v, dl, sub = '') => `<div class="kpi"><div class="label">${esc(label)}</div><div class="v">${v}</div><div class="s">${dl || ''}${sub ? ` ${sub}` : ''}</div></div>`;
    const vacio = !d.cuentas.length;
    el.innerHTML = `<div class="page">${D.pageHead('Métricas de redes', `Resultados de las cuentas completas de cada cliente (también lo que se publica desde el teléfono), del ${esc(d.desde.split('-').reverse().join('/'))} al ${esc(d.hasta.split('-').reverse().join('/'))}, comparados con el período anterior. Se actualizan solas cada 6 horas.`, filtros)}
      ${vacio ? `<div class="card"><h2>Todavía no hay cuentas conectadas</h2><p class="muted">Conecta las cuentas de Instagram, Facebook o TikTok de cada cliente en <b>Redes conectadas</b>. Las métricas aparecen aquí unas horas después (se traen los últimos 30 días).</p>${online ? '' : '<p class="muted">Las métricas necesitan el modo en línea.</p>'}<button class="btn violet" data-go-cuentas>Ir a Redes conectadas</button></div></div>` : `
      <div class="grid g4">
        ${kpi('Seguidores', n(a.seguidores), a.crecimiento !== null ? `<span class="small" style="color:${a.crecimiento >= 0 ? 'var(--ok)' : 'var(--danger)'}">${a.crecimiento >= 0 ? '+' : ''}${D.num(a.crecimiento)}</span>` : '', a.crecimiento_pct !== null ? `(${pct(a.crecimiento_pct)})` : '')}
        ${kpi('Alcance', n(a.alcance), delta(c.alcance), 'cuentas únicas')}
        ${kpi('Vistas', n(a.vistas), delta(c.vistas))}
        ${kpi('Interacciones', n(a.interacciones), delta(c.interacciones), 'me gusta, comentarios, compartidos y guardados')}
      </div>
      <div class="grid g4" style="margin-top:12px">
        ${kpi('Engagement (sobre alcance)', pct(a.er_alcance), delta(c.er_alcance))}
        ${kpi('Engagement por publicación', pct(a.er_seguidores), '', 'sobre seguidores')}
        ${kpi('Publicaciones', n(a.publicaciones), delta(c.publicaciones))}
        ${kpi('Visitas al perfil · clics', `${n(a.visitas_perfil)} · ${n(a.clics_web)}`, '', 'Instagram')}
      </div>
      <div class="grid g2" style="margin-top:16px;align-items:start">
        <div class="card"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><h2 style="margin:0">Día a día</h2>${sel('data-mserie', MSERIE, Object.entries(NOMBRES))}</div>${linea(d.serie, MSERIE)}</div>
        <div class="card"><h2>Detalle del período</h2><div class="table-wrap"><table><tbody>
          ${[['Me gusta', a.me_gusta], ['Comentarios', a.comentarios], ['Compartidos', a.compartidos], ['Guardados', a.guardados], ['Cuentas que interactuaron', a.cuentas_interactuaron], ['Nuevos seguidores', a.nuevos_seguidores], ['Dejaron de seguir', a.dejaron], ['Toques en enlaces del perfil', a.toques_enlaces]].map(([k, v]) => `<tr><td>${esc(k)}</td><td class="num"><b>${n(v)}</b></td></tr>`).join('')}
        </tbody></table></div><p class="small muted">"—" significa que esa red no da ese dato. TikTok y YouTube no dan alcance ni métricas diarias de la cuenta: se suman las de sus videos.</p></div>
      </div>
      <div class="card" style="margin-top:16px"><h2>Por red</h2>${D.table([
        { key: 'red', label: 'Red', render: x => chipRed(x.red) }, { key: 'cuentas', label: 'Cuentas', num: true }, { key: 'seguidores', label: 'Seguidores', num: true, render: x => `${n(x.seguidores)}<span class="sub">${x.crecimiento >= 0 ? '+' : ''}${D.num(x.crecimiento)}</span>` },
        { key: 'alcance', label: 'Alcance', num: true, render: x => n(x.alcance) }, { key: 'vistas', label: 'Vistas', num: true, render: x => n(x.vistas) }, { key: 'interacciones', label: 'Interacciones', num: true, render: x => n(x.interacciones) },
        { key: 'er_alcance', label: 'Engagement', num: true, render: x => pct(x.er_alcance) }, { key: 'publicaciones', label: 'Publicaciones', num: true }], d.porRed)}</div>
      ${d.porCliente.length ? `<div class="card" style="margin-top:16px"><h2>Por cliente</h2><p class="small muted" style="margin-top:0">Pulsa un cliente para ver solo sus métricas.</p>${D.table([
        { key: 'cliente', label: 'Cliente', render: x => `<span data-mcli="${esc(x.client_id)}">${esc(x.cliente)}</span><span class="sub">${x.redes.map(chipRed).join(' ')}</span>` }, { key: 'seguidores', label: 'Seguidores', num: true, render: x => `${n(x.seguidores)}<span class="sub">${x.crecimiento >= 0 ? '+' : ''}${D.num(x.crecimiento)}</span>` },
        { key: 'alcance', label: 'Alcance', num: true, render: x => n(x.alcance) }, { key: 'interacciones', label: 'Interacciones', num: true, render: x => n(x.interacciones) }, { key: 'er_alcance', label: 'Engagement', num: true, render: x => pct(x.er_alcance) }, { key: 'publicaciones', label: 'Publicaciones', num: true }], d.porCliente)}</div>` : ''}
      <div class="card" style="margin-top:16px"><h2>Mejores publicaciones</h2>${d.publicaciones.length ? D.table([
          { key: 'fecha', label: 'Fecha', render: x => `${esc(String(x.fecha).slice(0, 10).split('-').reverse().join('/'))}<span class="sub">${chipRed(x.red)} ${esc(x.tipo || '')}</span>` },
          { key: 'texto', label: 'Publicación', render: x => `${esc((x.texto || '(sin texto)').slice(0, 90))}<span class="sub">${esc(x.cliente)}${x.enlace ? ` · <a href="#" data-abrir="${esc(x.enlace)}">ver</a>` : ''}</span>` },
          { key: 'alcance', label: 'Alcance / vistas', num: true, render: x => `${n(x.alcance)}<span class="sub">${n(x.vistas)} vistas</span>` }, { key: 'interacciones', label: 'Interacciones', num: true, render: x => `<b>${n(x.interacciones)}</b><span class="sub">${pct(x.er)}</span>` }], d.publicaciones.slice(0, 15)) : '<p class="muted">Sin publicaciones en este período.</p>'}</div>
      <div class="grid g2" style="margin-top:16px;align-items:start">
        <div class="card"><h2>Qué formato funciona mejor</h2>${d.formatos.length ? D.table([{ key: 'formato', label: 'Formato' }, { key: 'publicaciones', label: 'Publicaciones', num: true }, { key: 'promedio', label: 'Interacciones promedio', num: true, render: x => `<b>${D.num(x.promedio)}</b>` }], d.formatos) : '<p class="muted">Sin datos todavía.</p>'}</div>
      <div class="card"><h2>Cuentas incluidas</h2>${D.table([{ key: 'nombre', label: 'Cuenta', render: x => `${chipRed(x.red)} ${esc(x.nombre || '')}<span class="sub">${esc(x.cliente)}</span>` }, { key: 'seguidores', label: 'Seguidores', num: true, render: x => n(x.seguidores) },
        { key: 'metricas_al', label: 'Actualizada', render: x => x.metricas_al ? esc(new Date(x.metricas_al).toLocaleString('es-VE', { dateStyle: 'short', timeStyle: 'short' })) : '<span class="muted">Pendiente</span>' }, { key: 'estado', label: 'Estado', render: x => `${esc(x.estado)}${x.ultimo_error ? `<span class="sub" style="color:var(--warn)">${esc(x.ultimo_error.slice(0, 90))}</span>` : ''}` }], d.cuentas)}</div>
      </div>
      ${d.audiencia.length ? `<div class="card" style="margin-top:16px"><h2>Audiencia</h2><div>${d.audiencia.map(x => `<div style="margin-bottom:18px"><h3>${chipRed(x.red)} ${esc(x.cuenta || '')} <span class="small muted">· ${esc(x.cliente)}</span></h3><div class="grid g4" style="gap:24px">
        ${x.edad ? `<div><div class="small muted">Edad</div>${barrasDe(x.edad)}</div>` : ''}${x.genero ? `<div><div class="small muted">Género</div>${barrasDe(x.genero)}</div>` : ''}${x.pais ? `<div><div class="small muted">Países</div>${barrasDe(x.pais, 5)}</div>` : ''}${x.ciudad ? `<div><div class="small muted">Ciudades</div>${barrasDe(x.ciudad, 5)}</div>` : ''}</div></div>`).join('')}</div><p class="small muted">Instagram solo da la audiencia de cuentas con 100 seguidores o más.</p></div>` : ''}
      </div>`}`;
    el.querySelectorAll('[data-mf]').forEach(s => s.onchange = () => { MF[s.dataset.mf] = s.dataset.mf === 'dias' ? Number(s.value) : s.value; D.views.metricas(el); });
    const ms = el.querySelector('[data-mserie]'); if (ms) ms.onchange = () => { MSERIE = ms.value; D.views.metricas(el); };
    el.querySelectorAll('[data-mcli]').forEach(x => { const tr = x.closest('tr'); if (tr) { tr.style.cursor = 'pointer'; tr.onclick = () => { MF.client_id = x.dataset.mcli; D.views.metricas(el); }; } });
    el.querySelectorAll('[data-abrir]').forEach(x => x.onclick = (e) => { e.preventDefault(); e.stopPropagation(); window.dos.openExternal(x.dataset.abrir); });
    const go = el.querySelector('[data-go-cuentas]'); if (go) go.onclick = () => D.go('cuentas');
    const sy = el.querySelector('[data-msync]'); if (sy) sy.onclick = async () => { sy.disabled = true; sy.textContent = 'Actualizando…'; const r = await D.try(() => D.call('sincronizarRedes'), 'Métricas actualizadas.'); if (r && r.errores && r.errores.length) D.toast(r.errores[0], 'error'); D.views.metricas(el); };
    const ex = el.querySelector('[data-mcsv]'); if (ex) ex.onclick = () => {
      const pubs = d.publicaciones.map(x => ({ fecha: String(x.fecha).slice(0, 10), cliente: x.cliente, red: x.red, cuenta: x.cuenta, formato: x.tipo, texto: x.texto, enlace: x.enlace, alcance: x.alcance, vistas: x.vistas, me_gusta: x.me_gusta, comentarios: x.comentarios, compartidos: x.compartidos, guardados: x.guardados, interacciones: x.interacciones, engagement_pct: x.er }));
      csv(`metricas-publicaciones-${d.desde}-a-${d.hasta}.csv`, pubs.length ? pubs : d.serie);
      setTimeout(() => csv(`metricas-por-dia-${d.desde}-a-${d.hasta}.csv`, d.serie), 400);
    };
  };
})(window.DOS);
