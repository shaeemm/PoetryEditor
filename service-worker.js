self.addEventListener("install", (event) => {
  const basePath = self.location.pathname.replace(/\/[^/]*$/, "");
  console.log(`basePath: ${basePath}`);
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        `${basePath}/`,
        `${basePath}/styles.css`,
        `${basePath}/script.js`,
        `${basePath}/favicon.ico`,
        `${basePath}/images/image_poetry.png`,
        `${basePath}/images/icon-192x192.png`,
        `${basePath}/images/icon-512x512.png`,
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
