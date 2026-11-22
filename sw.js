// Delirium OS web: guarda la interfaz para abrir rápido. Los datos siempre vienen de la nube (nunca se guardan aquí).
const CACHE = 'delirium-os-1.4.0';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(["./","assets/fonts/OFL.txt","assets/spiro.png","index.html","js/app.js","js/conexiones.js","js/docs.js","js/redes.js","js/schema.js","js/schema2.js","js/schema3.js","js/ui.js","js/views.js","js/views3.js","styles.css","dos-web.js","config.js","manifest.webmanifest"])).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return r; }).catch(() => caches.match(e.request)));
});
