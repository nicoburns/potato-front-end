// Here comes the install event!
// This only happens once, when the browser sees this
// version of the ServiceWorker for the first time.
self.addEventListener('install', function(event) {
  // We pass a promise to event.waitUntil to signal how 
  // long install takes, and if it failed
  event.waitUntil(
    // We open a cache…
    caches.open('simple-sw-v1').then(function(cache) {
      // And add resources to it
      return cache.addAll([
        './',
        './css/main.css',
        './js/main.js',
        './proxy/api.flickr.com/services/feeds/photos_public.gne?tagmode=all&format=json&tags=potato'
        // Cache resources can be from other origins.
        // This is a no-cors request, meaning it doesn't need
        // CORS headers to be stored in the cache
        //new Request('https://farm6.staticflickr.com/5594/14749918329_888df4f2ef.jpg', {mode: 'no-cors'})
      ]);
    })
  );
});

// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that
// page
self.addEventListener('fetch', function(event) {
  
  event.respondWith(new Promise(function (resolve, reject) {

    caches.open('simple-sw-v1').then(function(cache) {

      // Send request to network
      var fetchPromise = fetch(event.request)
        // If sucessful, cache and return the result
        .then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        // Else return generic 404 response
        .catch(function (error) { return new Response(error, {status: 404}); })

      // Check cache for entry matching the request
      cache.match(event.request).then(function(response) {
        // Return cached data and fall back to network 
        resolve(response || fetchPromise);
      })

    });

  }));
  
});