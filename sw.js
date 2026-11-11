/* NutriLog – Service Worker: macht die App offline nutzbar.
   Automatische Updates AN:  eigene Dateien zuerst aus dem Netz (neue Versionen kommen sofort an), offline aus dem Speicher.
   Automatische Updates AUS: eigene Dateien aus dem Speicher – die App bleibt auf ihrer Version, bis du in den
                             Einstellungen „Nach Updates suchen“ → „Jetzt laden“ tippst.
   Bibliotheken (Texterkennung/Barcode): einmal laden, danach aus dem Speicher.
   Deine Tagebuch-Daten liegen NICHT hier, sondern in IndexedDB – der Cache enthält nur Programmdateien. */
const CACHE = 'nutrilog-v2.31';
const FLAGS = 'nutrilog-flags';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-64.png'];

async function autoOn() {
  try { const r = await (await caches.open(FLAGS)).match('./__auto-update'); return !r || (await r.text()) !== '0'; }
  catch (e) { return true; }
}
async function oldCaches() { return (await caches.keys()).filter(k => /^nutrilog-v/.test(k) && k !== CACHE); }

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    if (await autoOn()) { await c.addAll(CORE); }
    else {
      // Updates aus: bisherige Programmdateien übernehmen, nur Fehlendes neu laden
      for (const k of await oldCaches()) {
        const o = await caches.open(k);
        for (const req of await o.keys()) { const r = await o.match(req); if (r) await c.put(req, r); }
      }
      for (const u of CORE) { if (!(await c.match(u))) { try { await c.add(u); } catch (err) {} } }
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await oldCaches()) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => {
  const d = e.data || {}, port = e.ports && e.ports[0];
  const reply = v => { try { port ? port.postMessage(v) : e.source && e.source.postMessage(v); } catch (err) {} };
  if (d.type === 'auto') {
    e.waitUntil(caches.open(FLAGS).then(c => c.put('./__auto-update', new Response(d.on ? '1' : '0'))).then(() => reply(true), () => reply(false)));
  } else if (d.type === 'refresh') {
    // Manuelles Update: Programmdateien frisch vom Server holen
    e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => fetch(u, { cache: 'reload' }).then(r => r.ok ? c.put(u, r) : null).catch(() => null))))
      .then(() => reply(true), () => reply(false)));
  }
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('openfoodfacts.org')) return;            // Produktdaten immer live
  if (url.origin === self.location.origin) {
    if (url.pathname.endsWith('/__auto-update')) return;
    const network = () => fetch(req, { cache: 'no-cache' }).then(res => {
      if (res.ok && !url.searchParams.has('nocache')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    });
    const cached = () => caches.match(req, { ignoreSearch: true, cacheName: CACHE }).then(m => m || caches.match(req, { ignoreSearch: true }));
    if (url.searchParams.has('nocache')) { e.respondWith(fetch(req, { cache: 'no-store' })); return; }   // Update-Prüfung
    e.respondWith(autoOn().then(on => on
      ? network().catch(() => cached().then(m => m || caches.match('./index.html')))
      : cached().then(m => m || network().catch(() => caches.match('./index.html')))));
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
