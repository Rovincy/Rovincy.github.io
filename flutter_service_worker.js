'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "fe09c82f2ae4dd38b22ade269c93e4ab",
"assets/assets/backgroundWebPage.jpg": "443f455f27b826a18851382b6941a79c",
"assets/assets/backgroundWebPage2.jpg": "7fa792352303a7a017ff03b3bf23109c",
"assets/assets/backgroundWebPage3.jpg": "e71f12602ad4149838e2db4ec4b5f228",
"assets/assets/CES_LOGO.png": "14f31884fb1863147cb97e1ea353668b",
"assets/assets/HomePage_Icon.png": "924e8ca11c68294812334a939ee8c1a3",
"assets/assets/IMG-20210524-WA0024.jpg": "3077370f1a0c59596039206bf14bd9d1",
"assets/assets/IMG-20210816-WA0016.jpg": "b0405d3552460dae76244d1d91a39ab5",
"assets/assets/L2D@V_Logo.jpg": "9ba3599223e76af0fa628610d540c060",
"assets/assets/Litia/contactus.jpg": "3c9ea80965ebb1ef8767b93247fd7e85",
"assets/assets/Litia/Litia1.jpg": "452717cb3de50ce62338d13fef9285d5",
"assets/assets/Litia/Litia2.jpg": "047ec45aca80d03bb15d5061784ee9cd",
"assets/assets/Litia/Litia3.jpg": "3ca73c293ca703acbfb5a0d9345fa53b",
"assets/assets/Litia/Litia4.jpg": "0b5ee036bd750680ab9c5a6ba60fbe17",
"assets/assets/Litia/Litia5.jpg": "7f616adb5a199fee8a7247b1964115d5",
"assets/assets/Litia/Litia6.jpg": "09871c1ac346f90f46aab054d3b01196",
"assets/assets/Litia/Litia7.jpg": "77bb1fae1f96fe180d6bf7416f050985",
"assets/assets/Litia/Litia8.jpg": "27c1d7682541686e5af7be87c3ac7e6b",
"assets/assets/Litia/Litia9.jpg": "1eef292d8d42bad1aff754a68195e7dd",
"assets/assets/Litia/Services.png": "99283f8f3d2700e2e10ee3d452449d79",
"assets/assets/LITIA-Logo.jpg": "e8ec3faaea76d2fee88773817acf23a0",
"assets/assets/Logo.jpeg": "b25cbd6946357f0409263234bab48d37",
"assets/assets/Republic_Logo.jpg": "ffe8b49423b1b436c5fd42aa73b69302",
"assets/backgroundWebPage.jpg": "443f455f27b826a18851382b6941a79c",
"assets/FontManifest.json": "c420a74793244cbf6f72d3283b6a1f2b",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/fonts/MrDafoe-Regular.ttf": "e2bba9cf49b298d6be781c2274694ea3",
"assets/fonts/NanumBrushScript-Regular.ttf": "16b91dccab2a7cab92c1dbf518d90a47",
"assets/fonts/proximanova-regular.otf": "bf9f5d50c1b928ff21436517a1a95ad9",
"assets/loadingImage.gif": "746222747b6e5491531bb1d251873549",
"assets/NOTICES": "d3896ea4d04c65da09e917fefcc610d8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "731ec599ee22c9cbc9616d05cd3208c3",
"/": "731ec599ee22c9cbc9616d05cd3208c3",
"main.dart.js": "97a3a5003ee56154c85fa7c2a702ade5",
"manifest.json": "15fc1bae81706dfaa9f6d3c51b9793e6",
"version.json": "472f5947a911094a12e72fd75203a012"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
