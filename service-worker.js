self.addEventListener("install", (event) => {
  const basePath = self.location.pathname.startsWith("/PoetryEditor")
    ? "/PoetryEditor"
    : self.location.pathname.replace(/\/[^/]*$/, "");

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
        `${basePath}/images/screenshot-wide.png`,
        `${basePath}/images/screenshot-mobile.png`,
        `${basePath}/images/img-like-dislike.png`,
        `${basePath}/images/icon-bt-dwnld.png`,
        `${basePath}/fonts/Seravek-Bold.otf`,
        `${basePath}/fonts/Menlo-Regular.ttf`,
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch((error) => {
          console.error("Fetch failed:", error);
          return new Response("Network error occurred", { status: 408 });
        })
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  const currentCacheName = "v1";
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== currentCacheName) {
            console.log(`Deleting cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
