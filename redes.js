// Delirium OS — redes sociales conectadas: autorizar cuentas de clientes, publicar automáticamente y traer métricas.
(function (D) {
  const esc = D.esc;
  const ref = (mod) => () => (D.refs[mod] || []).map(r => ({ value: r.id, label: r.nombre }));
  const canW = (k) => (D.meta.modules.find(m => m.key === k) || {}).level === 'W';
  const isClient = () => ['cliente', 'cliente_eq'].includes(D.me.rol);
  const REDES = ['Instagram', 'Facebook', 'TikTok', 'YouTube', 'X'];
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
        { key: 'seguidores', label: 'Seguidores', render: r => r.estado === 'Conectada' ? D.num(r.seguidores || 0) : '—' },
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
    const cron = datos ? `create extension if not exists pg_cron;\ncreate extension if not exists pg_net;\nselect cron.unschedule(jobid) from cron.job where jobname = 'delirium-redes';\nselect cron.schedule('delirium-redes', '*/5 * * * *', $$\n  select net.http_post(\n    url := '${datos.tareas}',\n    headers := jsonb_build_object('Content-Type', 'application/json', 'x-delirium-cron', '${datos.cron}'),\n    body := '{}'::jsonb, timeout_milliseconds := 120000);\n$$);` : '';
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
          ${F('ig_app_id', 'Instagram: ID de la app de Instagram')}${F('ig_app_secret', 'Instagram: clave secreta de la app', 'password')}
          ${F('meta_app_id', 'Facebook: ID de la app')}${F('meta_app_secret', 'Facebook: clave secreta de la app', 'password')}</form>
          <p class="small muted">En Meta: app tipo Empresa → caso de uso "Administrar mensajes y contenido en Instagram" (Instagram) y "Administrar todo en tu página" (Facebook). Mientras la app esté en modo desarrollo, agrega a cada cliente como <b>Evaluador de Instagram</b> o haz que te den acceso de administrador a su página.</p></div>
        <div class="card"><h2>${chipRed('TikTok')}</h2><form class="form" data-s>${F('tiktok_client_key', 'Client key')}${F('tiktok_client_secret', 'Client secret', 'password')}${F('tiktok_auditada', 'TikTok ya aprobó la app (publicar en público)', 'checkbox')}</form>
          <p class="small muted">Productos: Login Kit y Content Posting API (Direct Post). Hasta la aprobación, los videos salen privados y como máximo 5 cuentas por día.</p></div>
        <div class="card"><h2>${chipRed('YouTube')}</h2><form class="form" data-s>${F('google_client_id', 'Client ID de Google')}${F('google_client_secret', 'Client secret', 'password')}${F('youtube_auditada', 'Google ya aprobó la app (subir en público)', 'checkbox')}</form>
          <p class="small muted">Google Cloud: activa "YouTube Data API v3", crea un ID de cliente OAuth tipo "Aplicación web" y agrega los correos de los clientes como usuarios de prueba.</p></div>
        <div class="card"><h2>${chipRed('X')}</h2><form class="form" data-s>${F('x_activo', 'Activar X (la API de X es de pago)', 'checkbox')}${F('x_client_id', 'Client ID (OAuth 2.0)')}${F('x_client_secret', 'Client secret', 'password')}</form>
          <p class="small muted">Desde febrero de 2026 la API de X cobra por uso (aprox. $0,015 por post y $0,20 si lleva enlace). Queda lista pero apagada.</p></div>
      </div>`;
    body.querySelectorAll('[data-copiar]').forEach(b => b.onclick = async () => { try { await navigator.clipboard.writeText(b.dataset.copiar); D.toast('Copiado.'); } catch (e) { D.toast('No se pudo copiar.', 'error'); } });
  };
})(window.DOS);
