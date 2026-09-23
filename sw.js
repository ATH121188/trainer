/* Caches the whole trainer on first visit so it runs with no network afterwards. */
const CACHE='frsd-trainer-v46';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});

/* Cache first: once it is stored, the network is never needed again. */
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin)return;          // never intercept anything external
  e.respondWith(
    caches.match(e.request,{ignoreSearch:true}).then(hit=>{
      if(hit)return hit;
      return fetch(e.request).then(res=>{
        if(res&&res.status===200&&res.type==='basic'){
          const copy=res.clone();
          caches.open(CACHE).then(c=>c.put(e.request,copy));
        }
        return res;
      }).catch(()=>caches.match('./index.html'));
    })
  );
});
