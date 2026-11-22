// Delirium OS — Ajustes con pestañas, modo en línea (Supabase), conexiones (Discord, Meta, GitHub),
// tiempo real, actualizaciones automáticas, reportes de fallos y formulario web.
(function (D) {
  const esc = D.esc;
  const canW = (k) => (D.meta.modules.find(m => m.key === k) || {}).level === 'W';
  const copiar = async (texto, msg = 'Copiado.') => { try { await navigator.clipboard.writeText(texto); D.toast(msg); } catch (e) { D.toast('No se pudo copiar. Selecciona el texto y usa Ctrl + C.', 'error'); } };
  const res = (r) => { if (!r) return null; if (r.error) { D.toast(r.error, 'error'); return null; } return r.data; };
  let tab = 'estudio';
  D.info = null;
  D.enNube = () => !!(D.info && D.info.modo === 'nube');

  // ───────────── Ajustes ─────────────
  D.views.ajustes = async (el) => {
    const s = D.settings; const info = D.info = (await window.dos.info()).data;
    const F = (key, label, type = 'text', extra = {}) => D.fieldHtml({ key, label, type, ...extra }, s);
    const tabs = [['estudio', 'Estudio'], ['nube', 'Trabajar en línea'], ['conexiones', 'Conexiones'], ['redes', 'Redes sociales'], ['web', 'Tienda y app web'], ['copias', 'Copias y versión']].filter(([k]) => !(info.web && (k === 'nube' || k === 'copias')));
    if (!tabs.some(([k]) => k === tab)) tab = 'estudio';
    el.innerHTML = `<div class="page">${D.pageHead('Ajustes', 'Datos del estudio, modo en línea, conexiones con Discord, Meta y GitHub, y copias de seguridad.', tab === 'estudio' || tab === 'conexiones' || tab === 'web' || tab === 'redes' ? `<button class="btn primary" data-save-s>${D.icon('check')} Guardar ajustes</button>` : '')}
      <div class="seg tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" aria-selected="${tab === k}" class="${tab === k ? 'on' : ''}" data-tab="${k}">${l}</button>`).join('')}</div>
      <div data-tabbody style="margin-top:16px"></div></div>`;
    const body = el.querySelector('[data-tabbody]');
    el.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; D.views.ajustes(el); });

    if (tab === 'estudio') body.innerHTML = `<div class="grid g2">
        <div class="card"><h2>Delirium Studios</h2><form class="form" data-s>${F('empresa', 'Nombre del estudio', 'text', { required: true })}${F('web', 'Web')}${F('redes', 'Usuario en redes')}${F('rif', 'RIF / ID fiscal')}${F('telefono', 'Teléfono', 'tel')}${F('direccion', 'Dirección', 'text', { full: true })}
          ${F('correo_general', 'Correo general', 'email')}${F('correo_soporte', 'Correo de soporte', 'email')}${F('correo_ventas', 'Correo de ventas', 'email')}${F('correo_prensa', 'Correo de prensa', 'email')}</form></div>
        <div class="card"><h2>Valores por defecto</h2><form class="form" data-s>${F('moneda', 'Moneda (código)')}${F('simbolo', 'Símbolo')}${F('impuesto_nombre', 'Nombre del impuesto')}${F('impuesto_pct', 'Impuesto por defecto (%)', 'pct')}
          ${F('rondas_incluidas_defecto', 'Rondas incluidas por defecto', 'number')}${F('costo_ronda_extra_defecto', 'Costo por ronda extra', 'money')}${F('stock_minimo_defecto', 'Aviso de stock mínimo', 'number')}
          <div class="field full"><label for="f_metodos">Métodos de pago (separados por coma)</label><input class="input" id="f_metodos" name="metodos_pago_txt" value="${esc((s.metodos_pago || []).join(', '))}"></div></form></div></div>`;

    if (tab === 'nube') await nubeTab(body, info);
    if (tab === 'conexiones') conexionesTab(body, s, info);
    if (tab === 'web') webTab(body, s, info, F);
    if (tab === 'redes') await D.redesTab(body, s, info, F);
    if (tab === 'copias') {
      body.innerHTML = `<div class="grid g2">
        <div class="card"><h2>Copias de seguridad</h2><p class="muted" style="margin-top:0">${info.modo === 'nube' ? 'En modo en línea los datos están en tu proyecto de Supabase. Igual puedes exportar una copia completa para guardarla aparte.' : 'Delirium OS guarda una copia automática cada día (se conservan 30 días). También puedes exportar una copia completa para guardarla en otro lugar.'}</p>
          <div class="actions"><button class="btn" data-exp>${D.icon('download')} Exportar copia</button>${info.modo === 'nube' ? '' : `<button class="btn" data-imp>${D.icon('upload')} Restaurar copia</button>`}<button class="btn ghost" data-folder>${D.icon('folder')} Abrir carpeta de datos</button></div></div>
        <div class="card"><h2>Acerca de</h2><dl class="kv"><dt>Programa</dt><dd>Delirium OS ${esc(info.version)}</dd><dt>Modo</dt><dd>${info.modo === 'nube' ? `<span class="badge ok">En línea</span> <span class="small muted">${esc(info.nube)}</span>` : '<span class="badge">Solo este equipo</span>'}</dd><dt>Datos de este equipo</dt><dd class="small mono">${esc(info.datos)}</dd>
          <dt>Actualizaciones</dt><dd>${s.actualizaciones_repo ? `Se buscan solas en <b>github.com/${esc(s.actualizaciones_repo)}</b>. <button class="btn sm" data-buscar-upd>Buscar ahora</button>` : 'Configúralas en la pestaña Conexiones (GitHub).'}</dd><dt>Contacto</dt><dd>${esc(s.correo_general)} · ${esc(s.web)}${s.redes ? ' · ' + esc(s.redes) : ''}</dd></dl></div></div>`;
      body.querySelector('[data-exp]').onclick = async () => { const r = await window.dos.exportBackup(); if (r.error) D.toast(r.error, 'error'); else if (r.data) D.toast('Copia exportada.'); };
      const imp = body.querySelector('[data-imp]'); if (imp) imp.onclick = async () => { const r = await window.dos.importBackup(); if (r.error) D.toast(r.error, 'error'); else if (r.data) { D.toast('Copia restaurada. Vuelve a entrar.'); setTimeout(() => location.reload(), 900); } };
      body.querySelector('[data-folder]').onclick = () => window.dos.openData();
      const bu = body.querySelector('[data-buscar-upd]'); if (bu) bu.onclick = () => D.buscarActualizacion(true);
    }
    const sv = el.querySelector('[data-save-s]');
    if (sv) sv.onclick = async () => {
      const vals = {}; for (const f of el.querySelectorAll('form[data-s]')) { const v = D.readForm(f); if (!v) return; Object.assign(vals, v); }
      if ('metodos_pago_txt' in vals) { vals.metodos_pago = String(vals.metodos_pago_txt || '').split(',').map(x => x.trim()).filter(Boolean); delete vals.metodos_pago_txt; }
      if (vals.actualizaciones_repo) vals.actualizaciones_repo = vals.actualizaciones_repo.replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');
      const out = await D.try(() => D.call('action', 'ajustes.guardar', vals), 'Ajustes guardados.'); if (out) { D.settings = await D.call('settings'); D.views.ajustes(el); }
    };
  };

  function webTab(body, s, info, F) {
    const online = info.modo === 'nube';
    body.innerHTML = `<div class="grid g2">
      <div class="card"><h2>Tienda online de merch</h2><p class="muted" style="margin-top:0">Una página pública donde la gente ve los productos marcados con <b>"Mostrar en la tienda online"</b> y hace su pedido. Cada pedido llega a <b>Pedidos</b> (y a Discord si lo activaste), con el precio y el stock reales.</p>
        <form class="form" data-s>${F('tienda_activa', 'Tienda abierta (recibe pedidos)', 'checkbox')}${F('tienda_titulo', 'Título de la tienda', 'text', { full: true, placeholder: 'Delirium Merch' })}
        ${F('tienda_datos_pago', 'Datos de pago que verá el comprador', 'textarea', { placeholder: 'Pago Móvil: Banco… · Tel… · CI…\nZelle: …' })}${F('tienda_envios', 'Texto sobre entregas y envíos', 'textarea', { placeholder: 'Delivery en tu ciudad y envíos nacionales por MRW o Zoom.' })}</form>
        <p class="small muted">Los precios nunca salen de la página: la nube los toma de Productos al recibir el pedido, así nadie puede cambiarlos.</p></div>
      <div class="card"><h2>Publicar la tienda y la app web (gratis)</h2>
        ${!online ? '<p class="muted" style="margin-top:0">Primero pon el estudio en línea (pestaña <b>Trabajar en línea</b>). La tienda y la app del celular se conectan a esa nube.</p>' : info.web ? '<p class="muted" style="margin-top:0">Los archivos de la web se generan desde la app de escritorio.</p>' : `
        <p class="muted" style="margin-top:0">Delirium OS arma una carpeta con dos páginas listas para subir a <b>GitHub Pages</b> (gratis, sin dominio):</p>
        <ul class="small" style="margin:0 0 12px;padding-left:18px;line-height:1.7"><li><b>tienda.html</b>: la tienda de merch para tus redes.</li><li><b>app.html</b>: Delirium OS en el navegador del celular o de cualquier PC, con el mismo usuario y contraseña. Se puede "instalar" en la pantalla de inicio.</li></ul>
        <button class="btn violet" data-gen-web>${D.icon('folder')} Generar archivos de la web</button>
        <div class="guide-step" style="margin-top:16px"><div><b>Cómo subirla</b>1. En GitHub crea un repositorio público, por ejemplo <span class="mono">delirium-web</span>.<br>2. Pulsa <b>Add file → Upload files</b> y selecciona <b>todos los archivos</b> de la carpeta (Ctrl + A), arrástralos de la carpeta que se abrió.<br>3. Ve a <b>Settings → Pages</b>, elige la rama <b>main</b> y la carpeta <b>/ (root)</b> y guarda.<br>4. En un par de minutos queda en <span class="mono">https://TU-USUARIO.github.io/delirium-web/tienda.html</span> y <span class="mono">…/app.html</span>.<br>5. Cada vez que cambies la tienda o actualices Delirium OS, genera de nuevo y vuelve a subir los archivos.</div></div>`}</div></div>`;
    const g = body.querySelector('[data-gen-web]');
    if (g) g.onclick = async () => { g.disabled = true; const r = res(await window.dos.web.generar()); g.disabled = false; if (r) D.toast(`Listo: ${D.pl(r.archivos, 'archivo', 'archivos')} en la carpeta que se abrió.`); };
  }

  async function nubeTab(body, info) {
    if (info.modo === 'nube') {
      const codigo = D.isAdmin() ? (await window.dos.nube.codigo()).data : null;
      body.innerHTML = `<div class="grid g2"><div class="card"><h2>Estás en línea <span class="badge ok">Conectado</span></h2>
          <p style="margin-top:0">Todo el equipo y los clientes trabajan sobre los mismos datos, desde cualquier PC, y los cambios llegan solos en segundos.</p>
          <dl class="kv"><dt>Nube del estudio</dt><dd class="small mono">${esc(info.nube)}</dd><dt>Archivos adjuntos</dt><dd>Se guardan en Supabase Storage (hasta 50 MB cada uno en el plan gratis).</dd></dl></div>
        ${codigo ? `<div class="card"><h2>Código de conexión para tu equipo</h2><p class="muted" style="margin-top:0">Cada persona instala Delirium OS, pulsa <b>"Conectar a la nube de mi estudio"</b> en la pantalla de entrada y pega este código una sola vez. Después entra con su correo y contraseña.</p>
          <div class="keybox"><span class="mono small" style="word-break:break-all">${esc(codigo)}</span><button class="btn sm" data-copy-code>Copiar</button></div>
          <p class="small muted">El código no da acceso a nada por sí solo: cada persona necesita su usuario y contraseña, y solo ve lo de su rol.</p></div>` : ''}</div>
        ${D.isAdmin() && !info.web ? `<div class="card" style="margin-top:16px"><h2>Actualizar el servidor de la nube</h2><p class="muted" style="margin-top:0">Cuando instales una versión nueva de Delirium OS (esta es la <b>${esc(info.version)}</b>), actualiza también el servidor una vez, desde una sola PC:</p>
          <div class="guide-step"><div><b>3 pasos, 2 minutos</b>1. Pulsa <b>Guardar archivos del servidor</b> y elige una carpeta.<br>2. En Supabase abre <b>SQL Editor</b>, pega todo <span class="mono">instalar.sql</span> y pulsa <b>Run</b> (se puede repetir sin perder nada).<br>3. En <b>Edge Functions → delirium → Code</b> reemplaza todo por <span class="mono">index.ts</span> y pulsa <b>Deploy</b>. Deja "Verify JWT" apagado.</div></div>
          <div class="actions" style="margin-top:10px"><button class="btn sm violet" data-save-files>${D.icon('download')} Guardar archivos del servidor</button></div></div>` : ''}
        ${D.isAdmin() ? `<div class="grid g2" style="margin-top:16px">
          <div class="card"><h2>Copias diarias de la nube</h2><p class="muted" style="margin-top:0">El plan gratis de Supabase no guarda copias. Por eso esta PC descarga una copia completa de la nube cada día que la abres (se guardan las últimas 30).</p>
            <dl class="kv"><dt>Última copia</dt><dd data-ult-copia>—</dd></dl><div class="actions" style="margin-top:10px"><button class="btn sm violet" data-respaldar>Hacer copia ahora</button><button class="btn sm" data-abrir-copias>${D.icon('folder')} Abrir carpeta</button></div></div>
          <div class="card"><h2>Que la nube no se duerma</h2><p class="muted" style="margin-top:0">Supabase pausa los proyectos gratis si pasan 7 días sin uso (por ejemplo, en vacaciones). Mientras alguien use la app no pasa nada. Para más seguridad, este archivo hace que GitHub la "despierte" cada 2 días, gratis.</p>
            <p class="small" style="margin:0 0 8px">En tu repositorio de versiones de GitHub: <b>Add file → Create new file</b>, nombre <span class="mono">.github/workflows/despertar.yml</span>, pega el contenido y pulsa <b>Commit</b>.</p>
            <button class="btn sm" data-copy-yml>Copiar archivo de GitHub</button></div></div>
        <div class="card" style="margin-top:16px"><h2>Formulario de contacto para tu web</h2><p class="muted" style="margin-top:0">Pega este código en cualquier página web (cuando tengas staydelirious.com). Cada mensaje crea un cliente "Por contactar" y avisa al equipo.</p>
          <pre class="code" data-form-code>${esc(formularioHtml(info.nube))}</pre><div class="actions"><button class="btn sm" data-copy-form>Copiar código del formulario</button></div></div>
        <div class="card" style="margin-top:16px"><h2>Volver a trabajar solo en este equipo</h2><p class="muted" style="margin-top:0">Esta PC dejará de usar la nube. Los datos en línea no se borran; podrás volver a conectarte cuando quieras.</p><button class="btn danger" data-desconectar>Desconectar este equipo</button></div>` : ''}`;
      const sfc = body.querySelector('[data-save-files]'); if (sfc) sfc.onclick = async () => { const d = res(await window.dos.nube.guardarArchivos()); if (d) D.toast('Archivos del servidor guardados.'); };
      const cc = body.querySelector('[data-copy-code]'); if (cc) cc.onclick = () => copiar(codigo, 'Código copiado. Compártelo por un canal privado.');
      const cf = body.querySelector('[data-copy-form]'); if (cf) cf.onclick = () => copiar(formularioHtml(info.nube), 'Código del formulario copiado.');
      const rs = await window.dos.nube.respaldos(); const rd = rs.data || {};
      const ult = body.querySelector('[data-ult-copia]'); if (ult) ult.textContent = rd.lista && rd.lista[0] ? `${rd.lista[0].replace('nube-', '').replace('.json', '')} · ${rd.lista.length} guardadas` : 'Todavía ninguna';
      const ra = body.querySelector('[data-respaldar]'); if (ra) ra.onclick = async () => { ra.disabled = true; const r = res(await window.dos.nube.respaldarAhora()); ra.disabled = false; if (r) { D.toast('Copia de la nube guardada en esta PC.'); D.views.ajustes(document.getElementById('view')); } };
      const ac = body.querySelector('[data-abrir-copias]'); if (ac) ac.onclick = () => window.dos.nube.abrirRespaldos();
      const cy = body.querySelector('[data-copy-yml]'); if (cy && rd.cfg) cy.onclick = () => copiar(despertarYml(rd.cfg), 'Archivo copiado. Pégalo en GitHub como .github/workflows/despertar.yml');
      const ds = body.querySelector('[data-desconectar]'); if (ds) ds.onclick = async () => { if (await D.confirm('Desconectar este equipo', 'La app se reiniciará y usará los datos guardados en esta PC.', 'Desconectar')) window.dos.nube.desconectar(); };
      return;
    }
    if (!D.isAdmin()) { body.innerHTML = `<div class="card"><h2>Trabajar en línea</h2><p style="margin:0">Pídele a Dirección el <b>código de conexión</b> del estudio. Luego cierra sesión y usa "Conectar a la nube de mi estudio" en la pantalla de entrada.</p></div>`; return; }
    const step = (n, t, html) => `<li class="guide-step"><span class="n">${n}</span><div><b>${t}</b>${html}</div></li>`;
    body.innerHTML = `<div class="card"><h2>Trabajar en línea con Supabase (gratis)</h2>
        <p style="margin-top:0">Así todo el equipo y tus clientes entran desde su propia PC, con los mismos datos y en tiempo real. No necesitas dominio: Supabase te da una dirección propia. Toma unos 10 minutos y solo se hace una vez.</p>
        <ol class="guide">
          ${step(1, 'Crea el proyecto', `<p>Entra a supabase.com, crea una cuenta gratis y un proyecto nuevo (nombre: <span class="mono">delirium-os</span>, región: la más cercana, por ejemplo São Paulo o Virginia). Guarda la contraseña de la base de datos en un lugar seguro.</p><button class="btn sm" data-ext="https://supabase.com/dashboard/new">Abrir Supabase</button>`)}
          ${step(2, 'Crea las tablas', `<p>En el menú de Supabase abre <b>SQL Editor</b>, pega el SQL y pulsa <b>Run</b>. Debe decir "Success".</p><button class="btn sm" data-copy-sql>Copiar SQL</button>`)}
          ${step(3, 'Instala el servidor', `<p>Abre <b>Edge Functions</b> → <b>Deploy a new function</b> → <b>Via Editor</b>. Ponle de nombre <span class="mono">delirium</span>, borra el ejemplo, pega el código y pulsa <b>Deploy</b>. Después, en los detalles de la función, <b>desactiva "Verify JWT"</b> (Enforce JWT verification) y guarda.</p><div class="actions"><button class="btn sm" data-copy-server>Copiar código del servidor</button><button class="btn sm ghost" data-save-files>Guardar los archivos en mi PC</button></div>`)}
          ${step(4, 'Copia la dirección y la clave pública', `<p>En <b>Project Settings → API Keys</b> (o el botón <b>Connect</b>) copia la <b>Project URL</b> y la <b>Publishable key</b> (empieza con <span class="mono">sb_publishable_</span>). La clave secreta nunca se pega aquí.</p>
            <div class="form" style="margin-top:8px">${D.fieldHtml({ key: 'url', label: 'Project URL', full: true, placeholder: 'https://abcdefghijk.supabase.co' })}${D.fieldHtml({ key: 'key', label: 'Publishable key', full: true, placeholder: 'sb_publishable_…' })}</div>
            <div class="actions" style="margin-top:8px"><button class="btn violet" data-probar>Probar conexión</button><span class="small" data-probar-res></span></div>`)}
          ${step(5, 'Sube tus datos', `<p>Cuando la prueba diga que todo está listo, sube los datos de esta PC (clientes, proyectos, archivos…). La app se reinicia en modo en línea y entras con tu mismo correo y contraseña.</p><button class="btn primary" data-subir disabled>Subir mis datos y pasar a modo en línea</button><span class="small muted" data-subir-res></span>`)}
        </ol></div>`;
    const archivos = async () => res(await window.dos.nube.archivos());
    body.querySelector('[data-copy-sql]').onclick = async () => { const a = await archivos(); if (a) copiar(a.sql, 'SQL copiado. Pégalo en el SQL Editor y pulsa Run.'); };
    body.querySelector('[data-copy-server]').onclick = async () => { const a = await archivos(); if (a) copiar(a.codigo, 'Código del servidor copiado. Pégalo en el editor de la función "delirium".'); };
    body.querySelector('[data-save-files]').onclick = async () => { const d = res(await window.dos.nube.guardarArchivos()); if (d) D.toast('Archivos guardados.'); };
    body.querySelectorAll('[data-ext]').forEach(b => b.onclick = () => window.dos.openExternal(b.dataset.ext));
    const val = () => ({ url: body.querySelector('[name=url]').value.trim(), key: body.querySelector('[name=key]').value.trim() });
    const out = body.querySelector('[data-probar-res]'); const subir = body.querySelector('[data-subir]');
    body.querySelector('[data-probar]').onclick = async () => {
      out.innerHTML = '<span class="muted">Probando…</span>'; subir.disabled = true;
      const r = await window.dos.nube.probar(val());
      if (r.error) { out.innerHTML = `<span style="color:var(--danger)">✕ ${esc(r.error)}</span>`; return; }
      if (r.data.usuarios) { out.innerHTML = '<span style="color:var(--ok)">✔ Conectado. Esa nube ya tiene datos.</span>'; subir.textContent = 'Conectarme a esta nube'; subir.disabled = false; subir.dataset.modo = 'conectar'; }
      else { out.innerHTML = '<span style="color:var(--ok)">✔ Todo listo. La nube está vacía y esperando tus datos.</span>'; subir.disabled = false; subir.dataset.modo = 'subir'; }
    };
    window.dos.nube.onProgreso((p) => { const s = body.querySelector('[data-subir-res]'); if (s) s.textContent = ' ' + p.paso; });
    subir.onclick = async () => {
      const conectar = subir.dataset.modo === 'conectar';
      if (!(await D.confirm(conectar ? 'Conectarme a la nube' : 'Subir datos a la nube', conectar ? 'Esta PC usará los datos de la nube. Los datos de esta PC se quedan guardados aquí como respaldo.' : 'Se subirán todos los datos y archivos de esta PC. Después, la app se reinicia en modo en línea y entras con tu mismo usuario.', conectar ? 'Conectar' : 'Subir y conectar', 'violet'))) return;
      subir.disabled = true;
      const r = conectar ? await window.dos.nube.conectar(val()) : await window.dos.nube.subir(val());
      if (r.error) { D.toast(r.error, 'error'); subir.disabled = false; return; }
      D.toast(conectar ? 'Conectado. Reiniciando…' : `Listo: ${r.data.registros} registros y ${r.data.archivos} archivos en la nube. Reiniciando…`);
    };
  }
  function despertarYml({ url, key }) {
    return `# Delirium OS · mantiene despierta la nube gratuita de Supabase (cada 2 días)
name: Mantener despierta la nube de Delirium OS
on:
  schedule:
    - cron: '23 13 */2 * *'
  workflow_dispatch:
jobs:
  despertar:
    runs-on: ubuntu-latest
    steps:
      - name: Llamar a la nube
        run: |
          curl -fsS -X POST "${url}/functions/v1/delirium/api" \\
            -H "Content-Type: application/json" -H "apikey: ${key}" \\
            -d '{"metodo":"ping"}'
`;
  }
  function formularioHtml(url) {
    return `<form id="delirium-contacto">
  <input name="nombre" placeholder="Tu nombre" required>
  <input name="email" type="email" placeholder="Tu correo">
  <input name="telefono" placeholder="WhatsApp">
  <textarea name="mensaje" placeholder="¿Qué necesitas?"></textarea>
  <input name="website" style="display:none" tabindex="-1" autocomplete="off">
  <button>Enviar</button>
</form>
<script>
document.getElementById('delirium-contacto').onsubmit = async (e) => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(e.target));
  const r = await fetch('${url}/functions/v1/delirium/formulario', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) });
  const j = await r.json(); e.target.innerHTML = '<p>' + (j.mensaje || j.error) + '</p>';
};
</script>`;
  }

  function conexionesTab(body, s, info) {
    if (!D.isAdmin()) { body.innerHTML = '<div class="card"><p style="margin:0">Las conexiones las configura Dirección.</p></div>'; return; }
    const avisos = [['soporte', 'Solicitudes y mensajes de clientes'], ['piezas', 'Piezas aprobadas o con cambios'], ['pagos', 'Pagos reportados por clientes'], ['bugs', 'Bugs bloqueantes y fallos de juegos'], ['redes', 'Publicaciones aprobadas por clientes'], ['cotizaciones', 'Cotizaciones aceptadas o rechazadas']];
    const F = (key, label, type = 'text', extra = {}) => D.fieldHtml({ key, label, type, ...extra }, s);
    body.innerHTML = `<div class="grid g2">
      <div class="card"><h2>${D.icon('soporte')} Discord · avisos al equipo</h2><p class="muted" style="margin-top:0">Cuando pasa algo importante, llega un mensaje a un canal de tu servidor de Discord. En Discord: <b>Editar canal → Integraciones → Webhooks → Nuevo webhook → Copiar URL</b>.</p>
        <form class="form" data-s>${F('discord_webhook', 'URL del webhook', 'text', { full: true, placeholder: 'https://discord.com/api/webhooks/…' })}
          <div class="field full"><label>Avisar cuando…</label><div class="multi" data-multi="discord_avisos">${avisos.map(([k, l]) => `<label><input type="checkbox" value="${k}" ${(s.discord_avisos || []).includes(k) ? 'checked' : ''}>${l}</label>`).join('')}</div></div></form>
        <div class="actions" style="margin-top:10px"><button class="btn sm" data-probar-discord>Enviar mensaje de prueba</button></div></div>
      <div class="card"><h2>${D.icon('bugs')} Discord · reportes de bugs de la comunidad</h2><p class="muted" style="margin-top:0">Lo que tu comunidad escriba en un canal de bugs llega solo a <b>Bugs y QA</b> (cada 5 minutos), con los 👍 como votos. Crea un bot en <b>discord.com/developers</b>, activa <b>Message Content Intent</b>, invítalo con permiso de leer el canal y pega su token. El ID del canal se copia con clic derecho (modo desarrollador activado).</p>
        <form class="form" data-s>${F('discord_bot_token', 'Token del bot', 'password', { full: true })}${F('discord_canal_bugs', 'ID del canal de bugs', 'text', { placeholder: 'Ej.: 1234567890123456789' })}
          ${D.fieldHtml({ key: 'discord_juego_id', label: 'Juego de esos reportes', type: 'select', options: () => (D.refs.juegos || []).map(g => ({ value: g.id, label: g.nombre })) }, s)}</form>
        <div class="actions" style="margin-top:10px"><button class="btn sm" data-ext="https://discord.com/developers/applications">Abrir portal de Discord</button><button class="btn sm violet" data-leer-discord>Traer reportes ahora</button></div></div>
      <div class="card"><h2>${D.icon('anuncios')} Meta · Facebook e Instagram Ads</h2><p class="muted" style="margin-top:0">Trae solo el gasto, alcance y resultados de las campañas de tus clientes (cada 3 horas). No necesitas página de Delirium: basta tu cuenta personal de Facebook con acceso a las cuentas publicitarias de los clientes (como socio en su Business Manager). Crea una app en <b>developers.facebook.com</b> (tipo Empresa), agrega <b>Marketing API</b> y genera un token con permiso <span class="mono">ads_read</span>.</p>
        <form class="form" data-s>${F('meta_token', 'Token de acceso', 'password', { full: true })}${F('meta_version', 'Versión de la API', 'text', { hint: 'Déjalo en v26.0 salvo que Meta pida otra.' })}</form>
        <p class="small muted">Después, en cada cliente escribe su <b>cuenta publicitaria</b> (act_…) o en cada campaña su <b>ID de Meta</b>.</p>
        <div class="actions"><button class="btn sm" data-ext="https://developers.facebook.com/apps">Abrir Meta for Developers</button><button class="btn sm violet" data-sync-meta>Sincronizar ahora</button></div></div>
      <div class="card"><h2>${D.icon('download')} GitHub · actualizaciones automáticas</h2><p class="muted" style="margin-top:0">Cada PC busca sola la versión nueva y se actualiza con un clic. Crea en GitHub un repositorio <b>público</b> solo para las versiones (por ejemplo <span class="mono">delirium-os-versiones</span>; el código no va ahí). En cada versión nueva: <b>Releases → Draft a new release</b>, etiqueta <span class="mono">v1.4.1</span> y adjunta el instalador .exe y su archivo .sha256.</p>
        <form class="form" data-s>${F('actualizaciones_repo', 'Repositorio (usuario/repositorio)', 'text', { full: true, placeholder: 'tu-usuario/delirium-os-versiones' })}</form>
        <div class="actions" style="margin-top:10px"><button class="btn sm" data-ext="https://github.com/new">Crear repositorio</button><button class="btn sm violet" data-buscar-upd>Buscar actualización ahora</button></div></div>
    </div>
    <div class="card" style="margin-top:16px"><h2>${D.icon('juegos')} Reportes de fallos de los juegos (nuestro propio "Sentry")</h2><p style="margin-top:0">Cada juego tiene una <b>clave de reportes</b>. Cuando el juego se cierra o falla, envía el error al servidor del estudio y aparece en <b>Bugs y QA</b> agrupado: cuántas veces pasó, en qué versiones y en qué equipos. Si un bug arreglado vuelve a fallar, se reabre solo. Los errores de la propia app Delirium OS también se reportan solos.</p>
      <p class="small muted" style="margin:0">${info.modo === 'nube' ? 'Abre cada juego en la sección Juegos para ver su clave y el código para Godot, Unity, Roblox o web.' : 'Los juegos envían sus reportes por internet, así que esto funciona en modo en línea (pestaña "Trabajar en línea").'}</p></div>`;
    body.querySelectorAll('[data-ext]').forEach(b => b.onclick = () => window.dos.openExternal(b.dataset.ext));
    const guardarPrimero = async () => { const vals = {}; for (const f of body.querySelectorAll('form[data-s]')) Object.assign(vals, D.readForm(f) || {}); const out = await D.try(() => D.call('action', 'ajustes.guardar', vals)); if (out) D.settings = await D.call('settings'); return !!out; };
    body.querySelector('[data-probar-discord]').onclick = async () => { if (!(await guardarPrimero())) return; const r = await window.dos.ext('discordProbar'); if (res(r)) D.toast('Mensaje enviado. Revisa tu canal de Discord.'); };
    body.querySelector('[data-leer-discord]').onclick = async () => { if (!(await guardarPrimero())) return; const d = res(await window.dos.ext('discordLeer')); if (d) D.toast(`${D.pl(d.nuevos, 'bug nuevo', 'bugs nuevos')} desde Discord${d.actualizados ? ` · ${d.actualizados} con votos actualizados` : ''}.`); };
    body.querySelector('[data-sync-meta]').onclick = async () => { if (!(await guardarPrimero())) return; const d = res(await window.dos.ext('meta', {})); if (d) D.toast(`Meta: ${D.pl(d.actualizadas, 'campaña actualizada', 'campañas actualizadas')}${d.creadas ? `, ${d.creadas} nuevas` : ''}.${d.errores.length ? ' Algunas fallaron: ' + d.errores[0] : ''}`, d.errores.length ? 'warn' : 'ok'); };
    body.querySelector('[data-buscar-upd]').onclick = async () => { if (!(await guardarPrimero())) return; D.buscarActualizacion(true); };
  }

  // ───────────── actualizaciones automáticas ─────────────
  D.buscarActualizacion = async (manual = false) => {
    const repo = D.settings && D.settings.actualizaciones_repo; if (!repo) { if (manual) D.toast('Primero escribe el repositorio de GitHub en Conexiones.', 'error'); return; }
    const r = await window.dos.update.check(repo);
    if (r.error) { if (manual) D.toast(r.error, 'error'); return; }
    if (!r.data || !r.data.nueva) { if (manual) D.toast(`Tienes la última versión${r.data && r.data.version ? ` (${r.data.version})` : ''}.`); return; }
    mostrarActualizacion(r.data);
  };
  function mostrarActualizacion(info) {
    document.querySelectorAll('.update-bar').forEach(x => x.remove());
    const bar = document.createElement('div'); bar.className = 'update-bar'; bar.setAttribute('role', 'status');
    bar.innerHTML = `<span>✦ <b>Delirium OS ${esc(info.version)}</b> está disponible.</span><span class="small muted" data-up-txt>Tus datos se conservan.</span><button class="btn sm" data-up-notas>Qué cambió</button><button class="btn sm primary" data-up-go>Actualizar ahora</button><button class="icon-btn" data-up-x aria-label="Más tarde">${D.icon('x')}</button>`;
    document.body.appendChild(bar);
    bar.querySelector('[data-up-x]').onclick = () => bar.remove();
    bar.querySelector('[data-up-notas]').onclick = () => D.modal({ title: `Novedades de la ${info.version}`, body: `<div style="white-space:pre-wrap">${esc(info.notas || 'Mejoras y correcciones.')}</div>`, buttons: [{ label: 'Cerrar' }] });
    bar.querySelector('[data-up-go]').onclick = async (e) => {
      e.target.disabled = true; const txt = bar.querySelector('[data-up-txt]');
      window.dos.update.onProgreso(({ bajado, total }) => { txt.textContent = total ? `Descargando… ${Math.round(bajado / total * 100)}%` : `Descargando… ${Math.round(bajado / 1e6)} MB`; });
      const r = await window.dos.update.install(info);
      if (r.error) { D.toast(r.error, 'error'); e.target.disabled = false; txt.textContent = 'No se pudo actualizar.'; return; }
      txt.textContent = 'Instalando… la app se cerrará y volverá a abrirse sola.';
    };
  }

  // ───────────── tiempo real ─────────────
  let pendiente = false;
  const hayCapa = () => !!document.querySelector('#overlay .drawer, #overlay .modal');
  window.dos.onCambio((p) => {
    if (!D.me) return;
    D.updateBadges && D.updateBadges();
    const actual = (location.hash.replace('#/', '') || 'inicio').split('/')[0];
    const afecta = !p || !p.modulos || p.modulos.includes(actual) || ['inicio', 'calendario', 'reportes'].includes(actual);
    if (!afecta) return;
    if (hayCapa()) { if (!pendiente) { pendiente = true; aviso(); } return; }
    D.rerender();
  });
  function aviso() {
    const t = document.createElement('button'); t.className = 'fresh-pill'; t.innerHTML = `${D.icon('planes')} Hay cambios nuevos · Actualizar`;
    t.onclick = () => { pendiente = false; t.remove(); D.rerender(); };
    document.body.appendChild(t);
    const quitar = setInterval(() => { if (!hayCapa()) { clearInterval(quitar); if (t.isConnected) { t.remove(); pendiente = false; D.rerender(); } } }, 1500);
  }

  // ───────────── errores de la interfaz → Bugs y QA ─────────────
  let enviados = 0;
  const reportar = (mensaje, stack) => { if (enviados++ > 20) return; window.dos.reportError({ mensaje: String(mensaje).slice(0, 500), stack: String(stack || '').slice(0, 3000), rastro: location.hash, nivel: 'error' }); };
  window.addEventListener('error', (e) => reportar(e.message, e.error && e.error.stack));
  window.addEventListener('unhandledrejection', (e) => reportar(e.reason && e.reason.message || e.reason, e.reason && e.reason.stack));

  // ───────────── conectar con código (pantalla de entrada) ─────────────
  D.conectarConCodigo = async () => {
    const v = await D.prompt('Conectar a la nube de mi estudio', '<div class="note" style="grid-column:1/-1">Pega el <b>código de conexión</b> que te dio Dirección (empieza con DOS-). Solo se hace una vez en cada PC.</div>' + D.fieldHtml({ key: 'codigo', label: 'Código de conexión', type: 'textarea', required: true, rows: 3 }), 'Conectar');
    if (!v) return;
    const r = await window.dos.nube.conectar({ codigo: v.codigo });
    if (r.error) D.toast(r.error, 'error'); else D.toast('Conectado. Reiniciando…');
  };

  // ───────────── extras en módulos: Meta, Discord, fallos automáticos ─────────────
  D.after = D.after || {};
  D.PAGE_ACTIONS.anuncios = () => canW('anuncios') ? `<button class="btn violet" data-page-act="syncmeta">${D.icon('planes')} Sincronizar con Meta</button>` : '';
  D.PAGE_HANDLERS.syncmeta = async () => { const d = res(await window.dos.ext('meta', {})); if (d) { D.toast(`Meta: ${D.pl(d.actualizadas, 'campaña actualizada', 'campañas actualizadas')}${d.creadas ? `, ${d.creadas} nuevas` : ''}.${d.errores.length ? ' Con avisos: ' + d.errores[0] : ''}`, d.errores.length ? 'warn' : 'ok'); D.rerender(); } };
  D.PAGE_ACTIONS.bugs = () => D.isAdmin() && D.settings.discord_bot_token ? `<button class="btn" data-page-act="leerdiscord">Traer de Discord</button>` : '';
  D.PAGE_HANDLERS.leerdiscord = async () => { const d = res(await window.dos.ext('discordLeer')); if (d) { D.toast(`${D.pl(d.nuevos, 'bug nuevo', 'bugs nuevos')} desde Discord.`); D.rerender(); } };

  const prevBug = D.DETAIL.bugs;
  D.DETAIL.bugs = (r) => {
    const base = prevBug ? prevBug(r) : {};
    if (!r.automatico) return base;
    const ev = r.eventos || [];
    return { top: `${base.top || ''}<div class="grid g3" style="margin-bottom:14px"><div class="kpi ${r.regresion ? 'alert' : ''}"><div class="label">Veces que pasó</div><div class="v">${D.num(r.ocurrencias)}</div><div class="s">${r.regresion ? 'Volvió a fallar después de arreglado' : 'Reporte automático'}</div></div>
        <div class="kpi"><div class="label">Primera vez</div><div class="v" style="font-size:17px">${D.datetime(r.primera_vez)}</div></div><div class="kpi"><div class="label">Última vez</div><div class="v" style="font-size:17px">${D.datetime(r.ultima_vez)}</div><div class="s">${D.rel(r.ultima_vez)}</div></div></div>
        ${(r.versiones_afectadas || []).length ? `<p class="small" style="margin:0 0 12px">Versiones afectadas: ${r.versiones_afectadas.map(v => `<span class="badge">${esc(v)}</span>`).join(' ')}</p>` : ''}`,
      bottom: `${base.bottom || ''}<div class="section"><h3>Últimos reportes</h3>${ev.map((e, i) => `<details class="crash" ${i === 0 ? 'open' : ''}><summary>${D.datetime(e.fecha)} · ${esc(e.version || 's/v')} · ${esc(e.plataforma || '')}</summary>${e.dispositivo ? `<p class="small muted">${esc(e.dispositivo)}${e.usuario ? ' · ' + esc(e.usuario) : ''}</p>` : ''}${e.stack ? `<pre class="code">${esc(e.stack)}</pre>` : ''}${e.rastro ? `<p class="small"><b>Pasos previos:</b> ${esc(e.rastro)}</p>` : ''}</details>`).join('') || '<p class="muted">Sin detalles.</p>'}</div>` };
  };

  const prevGame = D.DETAIL.juegos;
  D.DETAIL.juegos = (r) => {
    const base = prevGame(r);
    if (!canW('juegos')) return base;
    const url = D.info && D.info.nube ? `${D.info.nube}/functions/v1/delirium/reportar` : null;
    return { top: base.top, bottom: `${base.bottom || ''}<div class="section"><h3>Reportes de fallos y métricas <button class="btn sm" data-act="nuevaclave">${r.clave_reportes ? 'Cambiar clave' : 'Crear clave'}</button></h3>
      ${!url ? '<p class="muted">Disponible cuando el estudio trabaje en línea (Ajustes → Trabajar en línea). Así el juego puede enviar sus errores por internet.</p>' : !r.clave_reportes ? '<p class="muted">Crea una clave para que este juego pueda enviar sus errores.</p>' : `
        <dl class="kv"><dt>Dirección</dt><dd class="small mono" style="word-break:break-all">${esc(url)}</dd><dt>Clave del juego</dt><dd class="mono small">${esc(r.clave_reportes)}</dd></dl>
        <div class="seg" style="margin:12px 0 8px" role="tablist">${['Godot', 'Unity', 'Roblox', 'Web'].map((m, i) => `<button class="${i === 0 ? 'on' : ''}" data-snip="${m}">${m}</button>`).join('')}</div>
        <pre class="code" data-snip-code>${esc(snippet('Godot', url, r.clave_reportes))}</pre><button class="btn sm" data-snip-copy>Copiar código</button>`}</div>` };
  };
  const prevMount = D.MOUNT.juegos;
  D.MOUNT.juegos = async (root, r) => {
    await prevMount(root, r);
    const url = D.info && D.info.nube ? `${D.info.nube}/functions/v1/delirium/reportar` : null;
    let cur = 'Godot';
    root.querySelectorAll('[data-snip]').forEach(b => b.onclick = () => { cur = b.dataset.snip; root.querySelectorAll('[data-snip]').forEach(x => x.classList.toggle('on', x === b)); root.querySelector('[data-snip-code]').textContent = snippet(cur, url, r.clave_reportes); });
    const cp = root.querySelector('[data-snip-copy]'); if (cp) cp.onclick = () => copiar(snippet(cur, url, r.clave_reportes), 'Código copiado.');
  };
  D.HANDLERS.nuevaclave = async (r) => {
    if (r.clave_reportes && !(await D.confirm('Cambiar clave', 'Las versiones del juego que usan la clave anterior dejarán de reportar. ¿Seguro?', 'Cambiar clave'))) return;
    if (await D.try(() => D.call('action', 'juego.clave', { id: r.id }), 'Clave lista.')) { D.rerender(); D.openRecord('juegos', r.id); }
  };
  function snippet(motor, url, clave) {
    const ev = url ? url.replace(/\/reportar$/, '/eventos') : '';
    if (motor === 'Godot') return `# Delirium OS · fallos y métricas (Godot 4). Agrégalo como Autoload con el nombre "Delirium".
# Errores:   Delirium.reportar("No cargó el nivel", str(get_stack()))
# Contexto:  Delirium.paso("Entró al nivel 2")
# Métricas:  Delirium.evento("nivel_inicio", {"nivel": "2"})  ·  "nivel_fin"  ·  "nivel_fallo"
#            Delirium.evento("compra", {"monto": 4.99})  ·  Delirium.evento("logro", {"nombre": "primer_jefe"})
extends Node
const URL := "${url}"
const URL_EVENTOS := "${ev}"
const CLAVE := "${clave}"
var rastro: Array[String] = []
var jugador := ""
var cola: Array = []

func _ready() -> void:
	if FileAccess.file_exists("user://delirium_id"):
		jugador = FileAccess.open("user://delirium_id", FileAccess.READ).get_as_text()
	else:
		jugador = str(randi()) + str(int(Time.get_unix_time_from_system()))
		FileAccess.open("user://delirium_id", FileAccess.WRITE).store_string(jugador)
	evento("sesion")
	var t := Timer.new()
	t.wait_time = 30
	t.autostart = true
	t.timeout.connect(enviar_eventos)
	add_child(t)

func paso(texto: String) -> void:
	rastro.append(texto)
	if rastro.size() > 20:
		rastro.pop_front()

func evento(tipo: String, datos := {}) -> void:
	var e: Dictionary = datos.duplicate()
	e["tipo"] = tipo
	cola.append(e)
	if cola.size() >= 20:
		enviar_eventos()

func enviar_eventos() -> void:
	if cola.is_empty():
		return
	_post(URL_EVENTOS, { "clave": CLAVE, "jugador": jugador, "eventos": cola })
	cola = []

func reportar(mensaje: String, detalle := "", nivel := "error") -> void:
	_post(URL, { "clave": CLAVE, "mensaje": mensaje, "stack": detalle, "nivel": nivel,
		"version": ProjectSettings.get_setting("application/config/version", "0"),
		"plataforma": OS.get_name(), "dispositivo": OS.get_model_name() + " · " + RenderingServer.get_video_adapter_name(),
		"usuario": jugador, "rastro": " > ".join(PackedStringArray(rastro)) })

func _post(destino: String, datos: Dictionary) -> void:
	var http := HTTPRequest.new()
	add_child(http)
	http.request_completed.connect(func(_a, _b, _c, _d): http.queue_free())
	http.request(destino, ["Content-Type: application/json"], HTTPClient.METHOD_POST, JSON.stringify(datos))

func _notification(what: int) -> void:
	if what == NOTIFICATION_WM_CLOSE_REQUEST or what == NOTIFICATION_APPLICATION_PAUSED:
		enviar_eventos()`;
    if (motor === 'Unity') return `// Delirium OS · fallos y métricas (Unity). Ponlo en un GameObject de la primera escena.
// Los errores se envían solos. Métricas: DeliriumReportes.Evento("nivel_inicio", nivel: "2");
// "nivel_fin", "nivel_fallo", DeliriumReportes.Evento("compra", valor: 4.99f), DeliriumReportes.Evento("logro", nombre: "primer_jefe");
using System; using System.Collections.Generic; using System.Text;
using UnityEngine; using UnityEngine.Networking;
public class DeliriumReportes : MonoBehaviour {
  const string URL = "${url}";
  const string URL_EVENTOS = "${ev}";
  const string CLAVE = "${clave}";
  static DeliriumReportes yo; string jugador; readonly List<Ev> cola = new List<Ev>();
  void Awake() {
    if (yo != null) { Destroy(gameObject); return; }
    yo = this; DontDestroyOnLoad(gameObject); Application.logMessageReceived += Capturar;
    jugador = PlayerPrefs.GetString("delirium_id", "");
    if (jugador == "") { jugador = Guid.NewGuid().ToString("N"); PlayerPrefs.SetString("delirium_id", jugador); }
    Evento("sesion"); InvokeRepeating(nameof(Enviar), 30, 30);
  }
  public static void Evento(string tipo, string nivel = "", string nombre = "", float valor = 1) {
    if (yo == null) return; yo.cola.Add(new Ev { tipo = tipo, nivel = nivel, nombre = nombre, valor = valor, monto = valor });
    if (yo.cola.Count >= 20) yo.Enviar();
  }
  void OnApplicationPause(bool pausa) { if (pausa) Enviar(); }
  void OnApplicationQuit() { Enviar(); }
  void Enviar() {
    if (cola.Count == 0) return;
    Post(URL_EVENTOS, JsonUtility.ToJson(new Lote { clave = CLAVE, jugador = jugador, eventos = cola.ToArray() })); cola.Clear();
  }
  void Capturar(string mensaje, string stack, LogType tipo) {
    if (tipo != LogType.Exception && tipo != LogType.Error) return;
    Post(URL, JsonUtility.ToJson(new Reporte { clave = CLAVE, mensaje = mensaje, stack = stack, nivel = tipo == LogType.Exception ? "fatal" : "error", usuario = jugador,
      version = Application.version, plataforma = Application.platform.ToString(), dispositivo = SystemInfo.deviceModel + " · " + SystemInfo.graphicsDeviceName }));
  }
  static void Post(string destino, string json) {
    var req = new UnityWebRequest(destino, "POST") { uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(json)), downloadHandler = new DownloadHandlerBuffer() };
    req.SetRequestHeader("Content-Type", "application/json"); req.SendWebRequest().completed += _ => req.Dispose();
  }
  [Serializable] class Reporte { public string clave, mensaje, stack, nivel, version, plataforma, dispositivo, usuario; }
  [Serializable] class Ev { public string tipo, nivel, nombre; public float valor, monto; }
  [Serializable] class Lote { public string clave, jugador; public Ev[] eventos; }
}`;
    if (motor === 'Roblox') return `-- Delirium OS · fallos y métricas (Roblox). Script en ServerScriptService. Activa "Allow HTTP Requests".
-- Métricas desde otros scripts del servidor:
--   _G.Delirium.evento(jugador, "nivel_inicio", { nivel = "2" })   ("nivel_fin", "nivel_fallo")
--   _G.Delirium.evento(jugador, "compra", { monto = 25 })   _G.Delirium.evento(jugador, "logro", { nombre = "primer_jefe" })
local HttpService = game:GetService("HttpService")
local ScriptContext = game:GetService("ScriptContext")
local Players = game:GetService("Players")
local URL, URL_EVENTOS, CLAVE = "${url}", "${ev}", "${clave}"
local enviados, cola = 0, {}

ScriptContext.Error:Connect(function(mensaje, stack, script)
  if enviados > 50 then return end
  enviados += 1
  pcall(function()
    HttpService:PostAsync(URL, HttpService:JSONEncode({ clave = CLAVE, mensaje = mensaje, stack = stack,
      version = tostring(game.PlaceVersion), plataforma = "Roblox", dispositivo = script and script:GetFullName() or "" }),
      Enum.HttpContentType.ApplicationJson)
  end)
end)

local function enviar()
  while #cola > 0 do
    local lote = {}
    for i = 1, math.min(100, #cola) do table.insert(lote, table.remove(cola, 1)) end
    pcall(function()
      HttpService:PostAsync(URL_EVENTOS, HttpService:JSONEncode({ clave = CLAVE, eventos = lote }), Enum.HttpContentType.ApplicationJson)
    end)
  end
end

local Delirium = {}
function Delirium.evento(jugador, tipo, datos)
  local e = datos or {}
  e.tipo = tipo
  e.jugador = tostring(jugador.UserId)
  table.insert(cola, e)
end
_G.Delirium = Delirium
Players.PlayerAdded:Connect(function(p) Delirium.evento(p, "sesion") end)
task.spawn(function() while true do task.wait(30) enviar() end end)
game:BindToClose(enviar)`;
    return `<!-- Delirium OS · fallos y métricas (juegos web o webs de clientes) -->
<!-- Métricas: Delirium.evento("nivel_inicio", { nivel: "2" }) · "nivel_fin" · "nivel_fallo" · Delirium.evento("compra", { monto: 4.99 }) · Delirium.evento("logro", { nombre: "primer_jefe" }) -->
<script>
(function () {
  var URL = "${url}", URL_EVENTOS = "${ev}", CLAVE = "${clave}", n = 0, cola = [], jugador;
  try { jugador = localStorage.getItem("delirium_id") || (Math.random().toString(36).slice(2) + Date.now().toString(36)); localStorage.setItem("delirium_id", jugador); } catch (e) { jugador = "anonimo"; }
  function post(destino, datos) { fetch(destino, { method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true, body: JSON.stringify(datos) }).catch(function () {}); }
  function enviar(mensaje, stack) { if (n++ > 30) return;
    post(URL, { clave: CLAVE, mensaje: String(mensaje), stack: String(stack || ""), version: (document.querySelector('meta[name=version]') || {}).content || "",
      plataforma: "Web", dispositivo: navigator.userAgent, usuario: jugador }); }
  function vaciar() { if (cola.length) post(URL_EVENTOS, { clave: CLAVE, jugador: jugador, eventos: cola.splice(0, 100) }); }
  window.Delirium = { evento: function (tipo, datos) { var e = Object.assign({}, datos || {}); e.tipo = tipo; cola.push(e); if (cola.length >= 20) vaciar(); } };
  addEventListener("error", function (e) { enviar(e.message, e.error && e.error.stack); });
  addEventListener("unhandledrejection", function (e) { enviar(e.reason && e.reason.message || e.reason, e.reason && e.reason.stack); });
  addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") vaciar(); });
  setInterval(vaciar, 30000);
  Delirium.evento("sesion");
})();
</script>`;
  }
})(window.DOS);
