// Delirium OS (versión web y celular): reemplaza el puente de la app de escritorio (window.dos)
// y habla directo con la nube del estudio. Solo funciona en modo en línea.
(function () {
  const CFG = window.DOS_WEB || {}; const URL_API = `${CFG.url}/functions/v1/delirium/api`;
  const H = { 'Content-Type': 'application/json', apikey: CFG.key, ...(String(CFG.key).startsWith('eyJ') ? { Authorization: `Bearer ${CFG.key}` } : {}) };
  let token = null; try { token = localStorage.getItem('dos-token'); } catch (e) {}
  let version = null;
  const guardarToken = (t) => { token = t; try { t ? localStorage.setItem('dos-token', t) : localStorage.removeItem('dos-token'); } catch (e) {} };
  async function llamar(metodo, args = [], ms = 30000) {
    const c = new AbortController(); const t = setTimeout(() => c.abort(), ms); let r;
    try { r = await fetch(URL_API, { method: 'POST', headers: H, body: JSON.stringify({ metodo, args, token }), signal: c.signal }); }
    catch (e) { return { error: 'Sin conexión con la nube del estudio. Revisa tu internet e intenta de nuevo.', code: 'RED' }; }
    finally { clearTimeout(t); }
    let j; try { j = await r.json(); } catch (e) { return { error: `La nube respondió algo inesperado (${r.status}).`, code: 'RED' }; }
    if (j.token) guardarToken(j.token);
    if (metodo === 'logout') guardarToken(null);
    if (j.error) { if (j.code === 'ACCESS' && /sesión terminó/.test(j.error)) guardarToken(null); return { error: j.error, code: j.code || 'ERROR' }; }
    if (metodo === 'ping' && j.data) version = j.data.version;
    return { data: j.data };
  }
  const soloEscritorio = async () => ({ error: 'Esto se hace desde la app de escritorio de Delirium OS.' });
  const elegirArchivo = () => new Promise((res) => {
    const i = document.createElement('input'); i.type = 'file'; i.style.display = 'none'; document.body.appendChild(i);
    i.onchange = () => { res(i.files[0] || null); i.remove(); }; addEventListener('focus', () => setTimeout(() => { if (!i.files.length) { res(null); i.remove(); } }, 800), { once: true }); i.click();
  });
  const IMG = /\.(png|jpe?g|gif|webp)$/i;
  const escuchas = [];
  setInterval(async () => { if (!token || document.hidden) return; const antes = version; await llamar('ping', [], 10000); if (antes && version !== antes) escuchas.forEach(f => f({ cols: null, version })); }, 30000);
  document.addEventListener('visibilitychange', async () => { if (document.hidden || !token) return; const antes = version; await llamar('ping', [], 10000); if (antes && version !== antes) escuchas.forEach(f => f({ cols: null, version })); });
  window.dos = {
    web: true,
    call: (metodo, ...args) => llamar(metodo, args),
    pdf: async (html, nombre) => {
      const f = document.createElement('iframe'); f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0'; document.body.appendChild(f);
      f.contentDocument.open(); f.contentDocument.write(html.replace('<head>', `<head><title>${String(nombre).replace(/[<>]/g, '')}</title>`)); f.contentDocument.close();
      await new Promise(r => setTimeout(r, 700)); f.contentWindow.focus(); f.contentWindow.print(); setTimeout(() => f.remove(), 60000);
      return { data: 'Elige "Guardar como PDF" en la ventana de impresión.' };
    },
    exportBackup: soloEscritorio, importBackup: soloEscritorio, openData: soloEscritorio,
    openExternal: async (u) => { if (/^(https?:|mailto:|tel:)/.test(u)) window.open(u, '_blank', 'noopener'); return { data: true }; },
    pickFile: async () => {
      const f = await elegirArchivo(); if (!f) return { data: null };
      if (f.size > 50 * 1024 * 1024) return { error: 'En la nube gratuita cada archivo puede pesar hasta 50 MB. Súbelo a tu Drive y pega el enlace.' };
      const u = await llamar('subirArchivo', [f.name]); if (u.error) return u;
      const r = await fetch(u.data.url, { method: 'PUT', headers: { 'x-upsert': 'true', 'Content-Type': 'application/octet-stream' }, body: f }).catch(() => null);
      if (!r || !r.ok) return { error: 'No se pudo subir el archivo. Intenta de nuevo.' };
      return { data: { nombre: f.name, ruta: u.data.ruta, peso: f.size, nube: true } };
    },
    openFile: async (ruta) => { const w = window.open('', '_blank'); const u = await llamar('urlArchivo', [ruta]); if (u.error) { if (w) w.close(); return u; } if (w) w.location = u.data.url; else location.href = u.data.url; return { data: true }; },
    previewFile: async (ruta) => { if (!IMG.test(String(ruta))) return { data: null }; const u = await llamar('urlArchivo', [ruta]); return { data: u.error ? null : u.data.url }; },
    info: async () => ({ data: { version: CFG.version, datos: 'Nube del estudio', plataforma: 'web', modo: 'nube', nube: CFG.url, web: true } }),
    reportError: async (ev) => { if (token && ev && ev.mensaje) llamar('reportarError', [{ ...ev, plataforma: 'Web / celular', dispositivo: navigator.userAgent, version: CFG.version }]); return { data: true }; },
    nube: { archivos: soloEscritorio, guardarArchivos: soloEscritorio, probar: soloEscritorio, subir: soloEscritorio, conectar: soloEscritorio, desconectar: soloEscritorio,
      codigo: async () => ({ data: null }), onProgreso: () => {}, respaldos: async () => ({ data: { lista: [], carpeta: '', cfg: null } }), respaldarAhora: soloEscritorio, abrirRespaldos: soloEscritorio },
    ext: (accion, p) => accion === 'meta' ? llamar('sincronizarMeta', [p || {}], 120000) : accion === 'discordLeer' ? llamar('leerDiscord', [], 60000) : accion === 'discordProbar' ? llamar('probarDiscord') : Promise.resolve({ error: 'Acción desconocida.' }),
    web: { generar: soloEscritorio },
    update: { check: async () => ({ data: null }), install: soloEscritorio, onProgreso: () => {} },
    onGoto: () => {}, onCambio: (fn) => escuchas.push(fn),
  };
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
