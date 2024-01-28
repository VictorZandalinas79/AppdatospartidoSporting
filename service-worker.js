// service-worker.js

const CACHE_NAME = 'mi-cache-v1';
const urlsToCache = [
  '/registrominutaje1%20copia.html',
  '/cronometroWorker.js',
  '/fondo.png',
  '/iconofutbol.png',
  '/jugadoressporting.html',
  '/jugadoressporting.json',
  '/jugadoressporting1.html',
  '/jugadoressporting1.json',
  '/jugadoressporting2.json',
  '/jugadoressporting22.html',
  '/manifest.json',
  // Añade aquí otras URLs que necesites cachear
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados');
        return cache.addAll(urlsToCache);
      })
  );
});

// Manejo de solicitudes de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el recurso de la caché si está disponible
        if (response) {
          return response;
        }
        // Realiza una solicitud de red en caso contrario
        return fetch(event.request);
      }
    )
  );
});

// Activación del Service Worker y limpieza de cachés antiguos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
