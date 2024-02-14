function updateStaticCache(){return caches.open(cacheName).then(e=>e.addAll(["/assets/fonts/style.css?1707928737222141142","/assets/css/styles.css?1707928737222141142","/assets/css/style.css?1707928737222141142","/assets/js/scripts.js?1707928737222141142","/assets/images/logo-nature.svg","/assets/fonts/Politica/font.ttf","/assets/fonts/Poppins/Poppins-Medium.ttf","/assets/webfonts/fa-solid-900.woff2","/assets/webfonts/fa-brands-400.woff2","/horsligne"]))}function clearOldCache(){return caches.keys().then(e=>Promise.all(e.filter(e=>e!==cacheName).map(e=>(console.log("Service Worker: removing cache "+e),caches["delete"](e)))))}const version="1707928737222141142",cacheName="static::"+version;self.addEventListener("install",e=>{self.skipWaiting(),e.waitUntil(updateStaticCache().then(()=>{console.log("Service Worker: cache updated to version: "+cacheName)}))}),self.addEventListener("activate",e=>{e.waitUntil(clearOldCache())}),self.addEventListener("fetch",e=>{let s=e.request;
// Only deal with requests from the same domain.
new URL(s.url).origin===location.origin&&(
// Always fetch non-GET requests from the network.
"GET"===s.method?
// For HTML requests, try the network first else fall back to the offline page.
-1===s.headers.get("Accept").indexOf("text/html")?
// For non-HTML requests, look in the cache first else fall back to the network.
e.respondWith(caches.match(s).then(t=>t?(console.log("Serving cached: ",e.request.url),t):(console.log("Fetching: ",e.request.url),fetch(s)))):e.respondWith(fetch(s)["catch"](()=>caches.match("/horsligne"))):e.respondWith(fetch(s)))});