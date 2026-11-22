// Delirium OS web: guarda la interfaz para abrir rápido. Los datos siempre vienen de la nube (nunca se guardan aquí).
const CACHE = 'delirium-os-1.10.4';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(["icono-192.png","icono-app.png","spiro.png","app.js","conexiones.js","docs.js","guia.js","i18n-en.js","i18n-pt.js","idioma.js","qrcode.js","redes.js","schema.js","schema2.js","schema3.js","ui.js","v16.js","v17.js","v18.js","v19.js","views.js","views3.js","styles.css","dos-web.js","config.js","manifest.webmanifest","app.html"])).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return r; }).catch(() => caches.match(e.request)));
});
// Avisos al celular (1.9): el aviso llega vacío; aquí se piden los títulos a la nube con la propia suscripción.
const AVISOS = "https://cgvwclbjmysaesfblixp.supabase.co/functions/v1/delirium/avisos"; const CLAVE = "sb_publishable_swNHK_lU-SlE6FNeGyFYqg_Ttu3DGDG";
self.addEventListener('push', (e) => {
  e.waitUntil((async () => {
    let lista = [];
    try {
      const sub = await self.registration.pushManager.getSubscription();
      if (sub) { const r = await fetch(AVISOS, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: CLAVE, ...(String(CLAVE).startsWith('eyJ') ? { Authorization: `Bearer ${CLAVE}` } : {}) }, body: JSON.stringify({ endpoint: sub.endpoint }) }); lista = (await r.json()).avisos || []; }
    } catch (err) {}
    if (!lista.length) lista = [{ titulo: 'Delirium OS', cuerpo: 'Tienes avisos nuevos.' }];
    await Promise.all(lista.map((a, i) => self.registration.showNotification(a.titulo, { body: a.cuerpo || '', icon: 'icono-192.png', badge: 'spiro.png', tag: 'dos-' + Date.now() + '-' + i, data: { url: './app.html' } })));
  })());
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => { const w = ws.find(x => /app\.html/.test(x.url)); return w ? w.focus() : self.clients.openWindow('./app.html'); }));
});
