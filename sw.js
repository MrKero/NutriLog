/* NutriLog – Service Worker: macht die App offline nutzbar.
   Eigene Dateien: zuerst aus dem Netz (damit Updates sofort ankommen), offline aus dem Speicher.
   Bibliotheken (Texterkennung/Barcode): einmal laden, danach aus dem Speicher.
   Deine Tagebuch-Daten liegen NICHT hier, sondern in IndexedDB – der Cache enthält nur Programmdateien. */
const CACHE = 'nutrilog-v2.24';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-64.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('nutrilog-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('openfoodfacts.org')) return;            // Produktdaten immer live
  if (url.origin === self.location.origin) {                          // eigene Dateien: Netz zuerst
    e.respondWith(
      fetch(req, { cache: 'no-cache' }).then(res => {   // immer beim Server nachfragen, ob es eine neue Version gibt
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true }).then(m => m || caches.match('./index.html')))
    );
    return;
  }
  if (/(^|\.)cdn\.jsdelivr\.net$|(^|\.)unpkg\.com$/.test(url.hostname)) {  // Bibliotheken: Speicher zuerst
    e.respondWith(
      caches.match(req).then(m => m || fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }))
    );
  }
});
