// Delirium OS web: guarda la interfaz para abrir rápido. Los datos siempre vienen de la nube (nunca se guardan aquí).
const CACHE = 'delirium-os-1.4.1';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(["spiro.png","app.js","conexiones.js","docs.js","redes.js","schema.js","schema2.js","schema3.js","ui.js","views.js","views3.js","styles.css","dos-web.js","config.js","manifest.webmanifest","app.html"])).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return r; }).catch(() => caches.match(e.request)));
});
