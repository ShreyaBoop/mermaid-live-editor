function v(c,o,r){const h=/^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*:)*?:?0*1$/.test(location.hostname)||location.protocol==="file:";if(!o.trackLocalhost&&h)return console.warn("[Plausible] Ignoring event because website is running locally");try{if(window.localStorage.plausible_ignore==="true")return console.warn('[Plausible] Ignoring event because "plausible_ignore" is set to "true" in localStorage')}catch{}const p={n:c,u:o.url,d:o.domain,r:o.referrer,w:o.deviceWidth,h:o.hashMode?1:0,p:r&&r.props?JSON.stringify(r.props):void 0},a=new XMLHttpRequest;a.open("POST",`${o.apiHost}/api/event`,!0),a.setRequestHeader("Content-Type","text/plain"),a.send(JSON.stringify(p)),a.onreadystatechange=()=>{a.readyState===4&&r&&r.callback&&r.callback()}}function b(c){const o=()=>({hashMode:!1,trackLocalhost:!1,url:location.href,domain:location.hostname,referrer:document.referrer||null,deviceWidth:window.innerWidth,apiHost:"https://plausible.io",...c}),r=(t,n,i)=>{v(t,{...o(),...i},n)},h=(t,n)=>{r("pageview",n,t)};return{trackEvent:r,trackPageview:h,enableAutoPageviews:()=>{const t=()=>h(),n=history.pushState;return n&&(history.pushState=function(i,l,u){n.apply(this,[i,l,u]),t()},addEventListener("popstate",t)),c&&c.hashMode&&addEventListener("hashchange",t),h(),function(){n&&(history.pushState=n,removeEventListener("popstate",t)),c&&c.hashMode&&removeEventListener("hashchange",t)}},enableAutoOutboundTracking:(t=document,n={subtree:!0,childList:!0,attributes:!0,attributeFilter:["href"]})=>{function i(e){r("Outbound Link: Click",{props:{url:this.href}}),typeof process<"u"&&process,setTimeout(()=>{location.href=this.href},150),e.preventDefault()}const l=new Set;function u(e){e instanceof HTMLAnchorElement?e.host!==location.host&&(e.addEventListener("click",i),l.add(e)):"querySelectorAll"in e&&e.querySelectorAll("a").forEach(u)}function f(e){e instanceof HTMLAnchorElement?(e.removeEventListener("click",i),l.delete(e)):"querySelectorAll"in e&&e.querySelectorAll("a").forEach(f)}const d=new MutationObserver(e=>{e.forEach(s=>{s.type==="attributes"?(f(s.target),u(s.target)):s.type==="childList"&&(s.addedNodes.forEach(u),s.removedNodes.forEach(f))})});return t.querySelectorAll("a").forEach(u),d.observe(t,n),function(){l.forEach(s=>{s.removeEventListener("click",i)}),l.clear(),d.disconnect()}}}}export{b as default};