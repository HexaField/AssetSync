import{p as C}from"./common/process-e9e98960.js";import{g as u,B as b,i as Q}from"./common/buffer-es6-e6024076.js";import{e as J}from"./common/events-18451fd5.js";import{i as D}from"./common/util-8448a06b.js";import{R as M,W as H}from"./common/duplex-cfee46c4.js";import{u as Z}from"./common/url-e7878f21.js";class B extends Error{constructor(e,t,s,r){super();Object.defineProperty(this,"req",{enumerable:!1,value:e,writable:!1}),Object.defineProperty(this,"res",{enumerable:!1,value:t,writable:!1}),Object.defineProperty(this,"response",{enumerable:!1,value:s,writable:!1}),Object.defineProperty(this,"code",{value:t.statusCode,writable:!1});let a=`${this.name}: ${t.statusCode} ${t.statusMessage} on ${e.method} ${e.path}`;const o=this.flattenErrors(s);o.length>0&&(a+=`
  `+o.join(`
  `)),Object.defineProperty(this,"message",{value:a,writable:!1}),r?Object.defineProperty(this,"stack",{value:this.message+`
`+r,writable:!1}):Error.captureStackTrace(this,B)}get name(){return this.constructor.name}flattenErrors(e,t=""){let s=[];for(const r in e){if(!e.hasOwnProperty(r)||r==="message"||r==="code")continue;Array.isArray(e[r])&&(s=s.concat(e[r].map(a=>`${t+r}: ${a}`)))}return s}}var ee=B;class $ extends Error{constructor(e,t,s,r){super();Object.defineProperty(this,"req",{enumerable:!1,value:e,writable:!1}),Object.defineProperty(this,"res",{enumerable:!1,value:t,writable:!1}),Object.defineProperty(this,"response",{enumerable:!1,value:s,writable:!1}),Object.defineProperty(this,"code",{value:+s.code||-1,writable:!1});let a=this.name+": "+(s.message||"Unknown error");if(s.errors)a+=`
  `+this.flattenErrors(s.errors).join(`
  `);else{const o=this.flattenErrors(s);o.length>0&&(a+=`
  `+o.join(`
  `))}Object.defineProperty(this,"message",{value:a,writable:!1}),r?Object.defineProperty(this,"stack",{value:this.message+`
`+r,writable:!1}):Error.captureStackTrace(this,$)}get name(){return`${this.constructor.name} [${this.code}]`}flattenErrors(e,t=""){let s=[];for(const r in e){if(!e.hasOwnProperty(r)||r==="message"||r==="code")continue;e[r]._errors?s=s.concat(e[r]._errors.map(a=>`${t+r}: ${a.message}`)):Array.isArray(e[r])?s=s.concat(e[r].map(a=>`${t+r}: ${a}`)):typeof e[r]=="object"&&(s=s.concat(this.flattenErrors(e[r],t+r+".")))}return s}}var te=$,q=A(u.fetch)&&A(u.ReadableStream),I;function re(){if(typeof I!="undefined")return I;try{new u.Blob([new ArrayBuffer(1)]),I=!0}catch(e){I=!1}return I}var O;function P(e){O||(O=new u.XMLHttpRequest,O.open("GET",u.location.host?"/":"https://example.com"));try{return O.responseType=e,O.responseType===e}catch(t){return!1}}var L=typeof u.ArrayBuffer!="undefined",se=L&&A(u.ArrayBuffer.prototype.slice),ie=L&&P("arraybuffer"),ne=!q&&se&&P("ms-stream"),oe=!q&&L&&P("moz-chunked-arraybuffer"),j=A(O.overrideMimeType),ae=A(u.VBArray);function A(e){return typeof e=="function"}O=null;var w={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4};function N(e,t,s){var r=this;M.call(r),r._mode=s,r.headers={},r.rawHeaders=[],r.trailers={},r.rawTrailers=[],r.on("end",function(){C.nextTick(function(){r.emit("close")})});var a;if(s==="fetch"){r._fetchResponse=t,r.url=t.url,r.statusCode=t.status,r.statusMessage=t.statusText;for(var o,i,T=t.headers[Symbol.iterator]();o=(i=T.next()).value,!i.done;)r.headers[o[0].toLowerCase()]=o[1],r.rawHeaders.push(o[0],o[1]);var E=t.body.getReader();a=function(){E.read().then(function(h){if(r._destroyed)return;if(h.done){r.push(null);return}r.push(new b(h.value)),a()})},a()}else{r._xhr=e,r._pos=0,r.url=e.responseURL,r.statusCode=e.status,r.statusMessage=e.statusText;var f=e.getAllResponseHeaders().split(/\r?\n/);if(f.forEach(function(h){var m=h.match(/^([^:]+):\s*(.*)/);if(m){var p=m[1].toLowerCase();p==="set-cookie"?(r.headers[p]===void 0&&(r.headers[p]=[]),r.headers[p].push(m[2])):r.headers[p]!==void 0?r.headers[p]+=", "+m[2]:r.headers[p]=m[2],r.rawHeaders.push(m[1],m[2])}}),r._charset="x-user-defined",!j){var _=r.rawHeaders["mime-type"];if(_){var v=_.match(/;\s*charset=([^;])(;|$)/);v&&(r._charset=v[1].toLowerCase())}r._charset||(r._charset="utf-8")}}}D(N,M),N.prototype._read=function(){},N.prototype._onXHRProgress=function(){var e=this,t=e._xhr,s=null;switch(e._mode){case"text:vbarray":if(t.readyState!==w.DONE)break;try{s=new u.VBArray(t.responseBody).toArray()}catch(T){}if(s!==null){e.push(new b(s));break}case"text":try{s=t.responseText}catch(T){e._mode="text:vbarray";break}if(s.length>e._pos){var r=s.substr(e._pos);if(e._charset==="x-user-defined"){for(var a=new b(r.length),o=0;o<r.length;o++)a[o]=r.charCodeAt(o)&255;e.push(a)}else e.push(r,e._charset);e._pos=s.length}break;case"arraybuffer":if(t.readyState!==w.DONE||!t.response)break;s=t.response,e.push(new b(new Uint8Array(s)));break;case"moz-chunked-arraybuffer":if(s=t.response,t.readyState!==w.LOADING||!s)break;e.push(new b(new Uint8Array(s)));break;case"ms-stream":if(s=t.response,t.readyState!==w.LOADING)break;var i=new u.MSStreamReader;i.onprogress=function(){i.result.byteLength>e._pos&&(e.push(new b(new Uint8Array(i.result.slice(e._pos)))),e._pos=i.result.byteLength)},i.onload=function(){e.push(null)},i.readAsArrayBuffer(s);break}e._xhr.readyState===w.DONE&&e._mode!=="ms-stream"&&e.push(null)};function ce(e){if(e instanceof Uint8Array){if(e.byteOffset===0&&e.byteLength===e.buffer.byteLength)return e.buffer;if(typeof e.buffer.slice=="function")return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}if(Q(e)){for(var t=new Uint8Array(e.length),s=e.length,r=0;r<s;r++)t[r]=e[r];return t.buffer}else throw new Error("Argument must be a Buffer")}function le(e,t){return q&&t?"fetch":oe?"moz-chunked-arraybuffer":ne?"ms-stream":ie&&e?"arraybuffer":ae&&e?"text:vbarray":"text"}function l(e){var t=this;H.call(t),t._opts=e,t._body=[],t._headers={},e.auth&&t.setHeader("Authorization","Basic "+new b(e.auth).toString("base64")),Object.keys(e.headers).forEach(function(a){t.setHeader(a,e.headers[a])});var s,r=!0;if(e.mode==="disable-fetch")r=!1,s=!0;else if(e.mode==="prefer-streaming")s=!1;else if(e.mode==="allow-wrong-content-type")s=!j;else if(!e.mode||e.mode==="default"||e.mode==="prefer-fast")s=!0;else throw new Error("Invalid value for opts.mode");t._mode=le(s,r),t.on("finish",function(){t._onFinish()})}D(l,H);var he=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","date","dnt","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","user-agent","via"];l.prototype.setHeader=function(e,t){var s=this,r=e.toLowerCase();if(he.indexOf(r)!==-1)return;s._headers[r]={name:e,value:t}},l.prototype.getHeader=function(e){var t=this;return t._headers[e.toLowerCase()].value},l.prototype.removeHeader=function(e){var t=this;delete t._headers[e.toLowerCase()]},l.prototype._onFinish=function(){var e=this;if(e._destroyed)return;var t=e._opts,s=e._headers,r;if((t.method==="POST"||t.method==="PUT"||t.method==="PATCH")&&(re()?r=new u.Blob(e._body.map(function(i){return ce(i)}),{type:(s["content-type"]||{}).value||""}):r=b.concat(e._body).toString()),e._mode==="fetch"){var a=Object.keys(s).map(function(i){return[s[i].name,s[i].value]});u.fetch(e._opts.url,{method:e._opts.method,headers:a,body:r,mode:"cors",credentials:t.withCredentials?"include":"same-origin"}).then(function(i){e._fetchResponse=i,e._connect()},function(i){e.emit("error",i)})}else{var o=e._xhr=new u.XMLHttpRequest;try{o.open(e._opts.method,e._opts.url,!0)}catch(i){C.nextTick(function(){e.emit("error",i)});return}"responseType"in o&&(o.responseType=e._mode.split(":")[0]),"withCredentials"in o&&(o.withCredentials=!!t.withCredentials),e._mode==="text"&&"overrideMimeType"in o&&o.overrideMimeType("text/plain; charset=x-user-defined"),Object.keys(s).forEach(function(i){o.setRequestHeader(s[i].name,s[i].value)}),e._response=null,o.onreadystatechange=function(){switch(o.readyState){case w.LOADING:case w.DONE:e._onXHRProgress();break}},e._mode==="moz-chunked-arraybuffer"&&(o.onprogress=function(){e._onXHRProgress()}),o.onerror=function(){if(e._destroyed)return;e.emit("error",new Error("XHR error"))};try{o.send(r)}catch(i){C.nextTick(function(){e.emit("error",i)});return}}};function ue(e){try{var t=e.status;return t!==null&&t!==0}catch(s){return!1}}l.prototype._onXHRProgress=function(){var e=this;if(!ue(e._xhr)||e._destroyed)return;e._response||e._connect(),e._response._onXHRProgress()},l.prototype._connect=function(){var e=this;if(e._destroyed)return;e._response=new N(e._xhr,e._fetchResponse,e._mode),e.emit("response",e._response)},l.prototype._write=function(e,t,s){var r=this;r._body.push(e),s()},l.prototype.abort=l.prototype.destroy=function(){var e=this;e._destroyed=!0,e._response&&(e._response._destroyed=!0),e._xhr&&e._xhr.abort()},l.prototype.end=function(e,t,s){var r=this;typeof e=="function"&&(s=e,e=void 0),H.prototype.end.call(r,e,t,s)},l.prototype.flushHeaders=function(){},l.prototype.setTimeout=function(){},l.prototype.setNoDelay=function(){},l.prototype.setSocketKeepAlive=function(){};function x(e,t){typeof e=="string"&&(e=Z(e));var s=u.location.protocol.search(/^https?:$/)===-1?"http:":"",r=e.protocol||s,a=e.hostname||e.host,o=e.port,i=e.path||"/";a&&a.indexOf(":")!==-1&&(a="["+a+"]"),e.url=(a?r+"//"+a:"")+(o?":"+o:"")+i,e.method=(e.method||"GET").toUpperCase(),e.headers=e.headers||{};var T=new l(e);return t&&T.on("response",t),T}function G(e,t){var s=x(e,t);return s.end(),s}function U(){}U.defaultMaxSockets=4;var W=["CHECKOUT","CONNECT","COPY","DELETE","GET","HEAD","LOCK","M-SEARCH","MERGE","MKACTIVITY","MKCOL","MOVE","NOTIFY","OPTIONS","PATCH","POST","PROPFIND","PROPPATCH","PURGE","PUT","REPORT","SEARCH","SUBSCRIBE","TRACE","UNLOCK","UNSUBSCRIBE"],Y={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",300:"Multiple Choices",301:"Moved Permanently",302:"Moved Temporarily",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Time-out",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Request Entity Too Large",414:"Request-URI Too Large",415:"Unsupported Media Type",416:"Requested Range Not Satisfiable",417:"Expectation Failed",418:"I'm a teapot",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Unordered Collection",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Time-out",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"},de={request:x,get:G,Agent:U,METHODS:W,STATUS_CODES:Y},fe=Object.freeze({__proto__:null,request:x,get:G,Agent:U,METHODS:W,STATUS_CODES:Y,default:de});class me{constructor(e,t={latency:0}){this.limit=this.remaining=e,this.resetInterval=0,this.reset=0,this.processing=!1,this.latencyRef=t,this._queue=[]}queue(e,t){t?this._queue.unshift(e):this._queue.push(e),this.check()}check(e){if(this._queue.length===0){this.processing&&(clearTimeout(this.processing),this.processing=!1);return}if(this.processing&&!e)return;const t=Date.now(),s=this.latencyRef.latency+(this.latencyRef.offset||0);if(this.reset?this.reset<t-s&&(this.reset=t-s+(this.resetInterval||0),this.remaining=this.limit):(this.reset=t-s,this.remaining=this.limit),this.last=t,this.remaining<=0){this.processing=setTimeout(()=>{this.processing=!1,this.check(!0)},Math.max(0,(this.reset||0)-t)+s);return}--this.remaining,this.processing=!0,this._queue.shift()(()=>{this._queue.length>0?this.check(!0):this.processing=!1})}}var z=me;const pe="discord-oauth2",ge="2.6.0",ye="Easily interact with discord's oauth2 API",Te="index.js",be={lint:'eslint --ext .js ./ --no-error-on-unmatched-pattern && echo "[1m[32mOK - lint[39m[22m" || echo "[1m[31mNot OK - lint[39m[22m"'},Re={lib:"lib"},Oe={type:"git",url:"git+https://github.com/reboxer/discord-oauth2.git"},we=["api","discord","discordapp","oauth2"],Ee="reboxer",Se="MIT",ve={url:"https://github.com/reboxer/discord-oauth2/issues"},Ie="https://github.com/reboxer/discord-oauth2#readme",Ae={eslint:"^7.13.0"};var _e={name:pe,version:ge,description:ye,main:Te,scripts:be,directories:Re,repository:Oe,keywords:we,author:Ee,license:Se,bugs:ve,homepage:Ie,devDependencies:Ae};class Ne extends J{constructor(e){super();this.version=e.version,this.userAgent=`Discord-OAuth2 (https://github.com/reboxer/discord-oauth2, ${_e.version})`,this.ratelimits={},this.requestTimeout=e.requestTimeout,this.latencyThreshold=e.latencyThreshold,this.latencyRef={latency:500,offset:e.ratelimiterOffset,raw:new Array(10).fill(500),timeOffset:0,timeOffsets:new Array(10).fill(0),lastTimeOffsetCheck:0},this.globalBlock=!1,this.readyQueue=[]}globalUnblock(){for(this.globalBlock=!1;this.readyQueue.length>0;)this.readyQueue.shift()()}routefy(e){return e.replace(/\/([a-z-]+)\/(?:[0-9]{17,19})/g,function(t,s){return s==="guilds"?t:`/${s}/:id`})}request(e,t,s,r,a,o){const i=a||this.routefy(t,e),T={};return Error.captureStackTrace(T),new Promise((E,f)=>{let _=0;const v=h=>{const m={"User-Agent":this.userAgent,"Content-Type":r.contentType};let p;try{r.auth&&(m.Authorization=`${r.auth.type} ${r.auth.creds}`),m["Content-Type"]==="application/json"?p=JSON.stringify(s):p=s}catch(n){h(),f(n);return}const g=fe.request({method:e,host:"discord.com",path:`/api/${this.version}`+t,headers:m});let y;g.once("abort",()=>{h(),y=y||new Error(`Request aborted by client on ${e} ${t}`),y.req=g,f(y)}).once("error",n=>{y=n,g.abort()});let S=Date.now();g.once("response",n=>{S=Date.now()-S,this.latencyRef.raw.push(S),this.latencyRef.latency=this.latencyRef.latency-~~(this.latencyRef.raw.shift()/10)+~~(S/10);const F=Date.parse(n.headers.date);if(this.latencyRef.lastTimeOffsetCheck<Date.now()-5e3){const c=~~((this.latencyRef.lastTimeOffsetCheck=Date.now())-F);this.latencyRef.timeOffset-this.latencyRef.latency>=this.latencyThreshold&&c-this.latencyRef.latency>=this.latencyThreshold&&this.emit("warn",new Error(`Your clock is ${this.latencyRef.timeOffset}ms behind Discord's server clock. Please check your connection and system time.`)),this.latencyRef.timeOffset=~~(this.latencyRef.timeOffset-this.latencyRef.timeOffsets.shift()/10+c/10),this.latencyRef.timeOffsets.push(c)}n.once("aborted",()=>{h(),y=y||new Error(`Request aborted by server on ${e} ${t}`),y.req=g,f(y)});let d="";const X=n;X.on("data",c=>{d+=c}).on("error",c=>{y=c,g.abort()}).once("end",()=>{const c=Date.now();if(n.headers["x-ratelimit-limit"]&&(this.ratelimits[i].limit=+n.headers["x-ratelimit-limit"]),e!=="GET"&&(n.headers["x-ratelimit-remaining"]===void 0||n.headers["x-ratelimit-limit"]===void 0)&&this.ratelimits[i].limit!==1&&this.emit("debug",`Missing ratelimit headers for SequentialBucket(${this.ratelimits[i].remaining}/${this.ratelimits[i].limit}) with non-default limit
${n.statusCode} ${n.headers["content-type"]}: ${e} ${i} | ${n.headers["cf-ray"]}
content-type = 
x-ratelimit-remaining = `+n.headers["x-ratelimit-remaining"]+`
x-ratelimit-limit = `+n.headers["x-ratelimit-limit"]+`
x-ratelimit-reset = `+n.headers["x-ratelimit-reset"]+`
x-ratelimit-global = `+n.headers["x-ratelimit-global"]),this.ratelimits[i].remaining=n.headers["x-ratelimit-remaining"]===void 0?1:+n.headers["x-ratelimit-remaining"]||0,n.headers["retry-after"]?n.headers["x-ratelimit-global"]?(this.globalBlock=!0,setTimeout(()=>this.globalUnblock(),+n.headers["retry-after"]||1)):this.ratelimits[i].reset=(+n.headers["retry-after"]||1)+c:n.headers["x-ratelimit-reset"]?~i.lastIndexOf("/reactions/:id")&&+n.headers["x-ratelimit-reset"]*1e3-F===1e3?this.ratelimits[i].reset=Math.max(c+250-this.latencyRef.timeOffset,c):this.ratelimits[i].reset=Math.max(+n.headers["x-ratelimit-reset"]*1e3-this.latencyRef.timeOffset,c):this.ratelimits[i].reset=c,n.statusCode!==429&&this.emit("debug",`${s&&s.content} ${c} ${i} ${n.statusCode}: ${S}ms (${this.latencyRef.latency}ms avg) | ${this.ratelimits[i].remaining}/${this.ratelimits[i].limit} left | Reset ${this.ratelimits[i].reset} (${this.ratelimits[i].reset-c}ms left)`),n.statusCode>=300){if(n.statusCode===429)if(this.emit("debug",`${n.headers["x-ratelimit-global"]?"Global":"Unexpected"} 429 (\u256F\xB0\u25A1\xB0\uFF09\u256F\uFE35 \u253B\u2501\u253B: ${d}
${s&&s.content} ${c} ${i} ${n.statusCode}: ${S}ms (${this.latencyRef.latency}ms avg) | ${this.ratelimits[i].remaining}/${this.ratelimits[i].limit} left | Reset ${this.ratelimits[i].reset} (${this.ratelimits[i].reset-c}ms left)`),n.headers["retry-after"]){setTimeout(()=>{h(),this.request(e,t,s,r,i,!0).then(E).catch(f)},+n.headers["retry-after"]);return}else{h(),this.request(e,t,s,r,i,!0).then(E).catch(f);return}else if(n.statusCode===502&&++_<4)return this.emit("debug","A wild 502 appeared! Thanks CloudFlare!"),setTimeout(()=>{this.request(e,t,s,r,i,!0).then(E).catch(f)},Math.floor(Math.random()*1900+100)),h();if(h(),d.length>0&&n.headers["content-type"]==="application/json")try{d=JSON.parse(d)}catch(K){f(K);return}let{stack:R}=T;R.startsWith(`Error
`)&&(R=R.substring(6));let k;d.code?k=new te(g,n,d,R):k=new ee(g,n,d,R),f(k);return}if(d.length>0&&n.headers["content-type"]==="application/json")try{d=JSON.parse(d)}catch(R){h(),f(R);return}h(),E(d)})}),g.setTimeout(this.requestTimeout,()=>{y=new Error(`Request timed out (>${this.requestTimeout}ms) on ${e} ${t}`),g.abort()}),g.end(p)};this.globalBlock&&r.auth?this.readyQueue.push(()=>{this.ratelimits[i]||(this.ratelimits[i]=new z(1,this.latencyRef)),this.ratelimits[i].queue(v,o)}):(this.ratelimits[i]||(this.ratelimits[i]=new z(1,this.latencyRef)),this.ratelimits[i].queue(v,o))})}}var ke=Ne;class Ce extends ke{constructor(e={}){super({version:e.version||"v7",requestTimeout:e.requestTimeout||15e3,latencyThreshold:e.latencyThreshold||3e4,ratelimiterOffset:e.ratelimiterOffset||0});this.client_id=e.clientId,this.client_secret=e.clientSecret,this.redirect_uri=e.redirectUri,this.credentials=e.credentials}_encode(e){let t="";for(const[s,r]of Object.entries(e)){if(!r)continue;t+=`&${encodeURIComponent(s)}=${encodeURIComponent(r)}`}return t.substring(1)}tokenRequest(e={}){const t={client_id:e.clientId||this.client_id,client_secret:e.clientSecret||this.client_secret,grant_type:void 0,code:void 0,refresh_token:void 0,redirect_uri:e.redirectUri||this.redirect_uri,scope:e.scope instanceof Array?e.scope.join(" "):e.scope};if(e.grantType==="authorization_code")t.code=e.code,t.grant_type=e.grantType;else if(e.grantType==="refresh_token")t.refresh_token=e.refreshToken,t.grant_type=e.grantType;else throw new Error("Invalid grant_type provided, it must be either authorization_code or refresh_token");const s=this._encode(t);return this.request("POST","/oauth2/token",s,{contentType:"application/x-www-form-urlencoded"})}revokeToken(e,t){if(!t&&!this.credentials)throw new Error("Missing credentials for revokeToken method");return this.request("POST","/oauth2/token/revoke",`token=${e}`,{auth:{type:"Basic",creds:t||this.credentials},contentType:"application/x-www-form-urlencoded"})}getUser(e){return this.request("GET","/users/@me",void 0,{auth:{type:"Bearer",creds:e},contentType:"application/json"})}getUserGuilds(e){return this.request("GET","/users/@me/guilds",void 0,{auth:{type:"Bearer",creds:e},contentType:"application/json"})}getUserConnections(e){return this.request("GET","/users/@me/connections",void 0,{auth:{type:"Bearer",creds:e},contentType:"application/json"})}addMember(e){return this.request("PUT",`/guilds/${e.guildId}/members/${e.userId}`,{deaf:e.deaf,mute:e.mute,nick:e.nickname,roles:e.roles,access_token:e.accessToken},{auth:{type:"Bot",creds:e.botToken},contentType:"application/json"})}generateAuthUrl(e={}){const t={client_id:e.clientId||this.client_id,prompt:e.prompt||void 0,redirect_uri:e.redirectUri||this.redirect_uri,response_type:e.responseType||"code",scope:e.scope instanceof Array?e.scope.join(" "):e.scope,permissions:e.permissions||void 0,guild_id:e.guildId||void 0,disable_guild_select:e.disableGuildSelect||void 0,state:e.state||void 0},s=this._encode(t);return`https://discord.com/api/oauth2/authorize?${s}`}}var He=Ce,V=He;export default V;export{V as __moduleExports};
