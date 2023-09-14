const CACHE_NAME = 'Horario DAM';
const OFFLINE_PAGE = './offline.html'; // Ruta de la página de "No hay conexión"

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll([OFFLINE_PAGE]);
            })
            .then(() => self.skipWaiting())
            .catch(err => console.log('Fallo en el registro del caché', err))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.match(OFFLINE_PAGE);
            })
    );
});
