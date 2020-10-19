import{A as E,B as Ae}from"./index-1cb6efae.js";import{p as A}from"./env-435c5b99.js";var N;function K(){if(typeof N=="undefined"){var e=new ArrayBuffer(2),t=new Uint8Array(e),r=new Uint16Array(e);if(t[0]=1,t[1]=2,r[0]===258)N="BE";else if(r[0]===513)N="LE";else throw new Error("unable to figure out endianess")}return N}function Z(){return typeof E.location!="undefined"?E.location.hostname:""}function q(){return[]}function x(){return 0}function Q(){return Number.MAX_VALUE}function ee(){return Number.MAX_VALUE}function te(){return[]}function re(){return"Browser"}function ne(){return typeof E.navigator!="undefined"?E.navigator.appVersion:""}function ie(){}function oe(){}function Ne(){return"javascript"}function Te(){return"browser"}function D(){return"/tmp"}var se=D,ae=`
`,ue={EOL:ae,tmpdir:se,tmpDir:D,networkInterfaces:ie,getNetworkInterfaces:oe,release:ne,type:re,cpus:te,totalmem:ee,freemem:Q,uptime:x,loadavg:q,hostname:Z,endianness:K},Ie=Object.freeze({__proto__:null,endianness:K,hostname:Z,loadavg:q,uptime:x,freemem:Q,totalmem:ee,cpus:te,type:re,release:ne,networkInterfaces:ie,getNetworkInterfaces:oe,arch:Ne,platform:Te,tmpDir:D,tmpdir:se,EOL:ae,default:ue}),P;typeof Object.create=="function"?P=function(t,r){t.super_=r,t.prototype=Object.create(r.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:P=function(t,r){t.super_=r;var n=function(){};n.prototype=r.prototype,t.prototype=new n,t.prototype.constructor=t};var _=P,Se=/%[sdj%]/g;function T(e){if(!g(e)){for(var t=[],r=0;r<arguments.length;r++)t.push(c(arguments[r]));return t.join(" ")}for(var r=1,n=arguments,a=n.length,s=String(e).replace(Se,function(o){if(o==="%%")return"%";if(r>=a)return o;switch(o){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(u){return"[Circular]"}default:return o}}),i=n[r];r<a;i=n[++r])m(i)||!h(i)?s+=" "+i:s+=" "+c(i);return s}function I(e,t){if(p(E.process))return function(){return I(e,t).apply(this,arguments)};if(A.noDeprecation===!0)return e;var r=!1;function n(){if(!r){if(A.throwDeprecation)throw new Error(t);A.traceDeprecation?console.trace(t):console.error(t),r=!0}return e.apply(this,arguments)}return n}var S={},L;function F(e){if(p(L)&&(L=A.env.NODE_DEBUG||""),e=e.toUpperCase(),!S[e])if(new RegExp("\\b"+e+"\\b","i").test(L)){var t=0;S[e]=function(){var r=T.apply(null,arguments);console.error("%s %d: %s",e,t,r)}}else S[e]=function(){};return S[e]}function c(e,t){var r={seen:[],stylize:we};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),w(t)?r.showHidden=t:t&&Y(r,t),p(r.showHidden)&&(r.showHidden=!1),p(r.depth)&&(r.depth=2),p(r.colors)&&(r.colors=!1),p(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=Re),R(r,e,r.depth)}c.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},c.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"};function Re(e,t){var r=c.styles[t];return r?"["+c.colors[r][0]+"m"+e+"["+c.colors[r][1]+"m":e}function we(e,t){return e}function je(e){var t={};return e.forEach(function(r,n){t[r]=!0}),t}function R(e,t,r){if(e.customInspect&&t&&O(t.inspect)&&t.inspect!==c&&!(t.constructor&&t.constructor.prototype===t)){var n=t.inspect(r,e);return g(n)||(n=R(e,n,r)),n}var a=He(e,t);if(a)return a;var s=Object.keys(t),i=je(s);if(e.showHidden&&(s=Object.getOwnPropertyNames(t)),b(t)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return z(t);if(s.length===0){if(O(t)){var o=t.name?": "+t.name:"";return e.stylize("[Function"+o+"]","special")}if(y(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(v(t))return e.stylize(Date.prototype.toString.call(t),"date");if(b(t))return z(t)}var u="",f=!1,l=["{","}"];if(C(t)&&(f=!0,l=["[","]"]),O(t)){var d=t.name?": "+t.name:"";u=" [Function"+d+"]"}if(y(t)&&(u=" "+RegExp.prototype.toString.call(t)),v(t)&&(u=" "+Date.prototype.toUTCString.call(t)),b(t)&&(u=" "+z(t)),s.length===0&&(!f||t.length==0))return l[0]+u+l[1];if(r<0)return y(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special");e.seen.push(t);var H;return f?H=De(e,t,r,i,s):H=s.map(function(ve){return U(e,t,r,i,ve,f)}),e.seen.pop(),Pe(H,u,l)}function He(e,t){if(p(t))return e.stylize("undefined","undefined");if(g(t)){var r="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(r,"string")}if(k(t))return e.stylize(""+t,"number");if(w(t))return e.stylize(""+t,"boolean");if(m(t))return e.stylize("null","null")}function z(e){return"["+Error.prototype.toString.call(e)+"]"}function De(e,t,r,n,a){for(var s=[],i=0,o=t.length;i<o;++i)pe(t,String(i))?s.push(U(e,t,r,n,String(i),!0)):s.push("");return a.forEach(function(u){u.match(/^\d+$/)||s.push(U(e,t,r,n,u,!0))}),s}function U(e,t,r,n,a,s){var i,o,u;if(u=Object.getOwnPropertyDescriptor(t,a)||{value:t[a]},u.get?u.set?o=e.stylize("[Getter/Setter]","special"):o=e.stylize("[Getter]","special"):u.set&&(o=e.stylize("[Setter]","special")),pe(n,a)||(i="["+a+"]"),o||(e.seen.indexOf(u.value)<0?(m(r)?o=R(e,u.value,null):o=R(e,u.value,r-1),o.indexOf(`
`)>-1&&(s?o=o.split(`
`).map(function(f){return"  "+f}).join(`
`).substr(2):o=`
`+o.split(`
`).map(function(f){return"   "+f}).join(`
`))):o=e.stylize("[Circular]","special")),p(i)){if(s&&a.match(/^\d+$/))return o;i=JSON.stringify(""+a),i.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(i=i.substr(1,i.length-2),i=e.stylize(i,"name")):(i=i.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),i=e.stylize(i,"string"))}return i+": "+o}function Pe(e,t,r){var n=e.reduce(function(a,s){return s.indexOf(`
`)>=0,a+s.replace(/\u001b\[\d\d?m/g,"").length+1},0);return n>60?r[0]+(t===""?"":t+`
 `)+" "+e.join(`,
  `)+" "+r[1]:r[0]+t+" "+e.join(", ")+" "+r[1]}function C(e){return Array.isArray(e)}function w(e){return typeof e=="boolean"}function m(e){return e===null}function M(e){return e==null}function k(e){return typeof e=="number"}function g(e){return typeof e=="string"}function fe(e){return typeof e=="symbol"}function p(e){return e===void 0}function y(e){return h(e)&&W(e)==="[object RegExp]"}function h(e){return typeof e=="object"&&e!==null}function v(e){return h(e)&&W(e)==="[object Date]"}function b(e){return h(e)&&(W(e)==="[object Error]"||e instanceof Error)}function O(e){return typeof e=="function"}function B(e){return e===null||typeof e=="boolean"||typeof e=="number"||typeof e=="string"||typeof e=="symbol"||typeof e=="undefined"}function le(e){return Ae.isBuffer(e)}function W(e){return Object.prototype.toString.call(e)}function G(e){return e<10?"0"+e.toString(10):e.toString(10)}var _e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Le(){var e=new Date,t=[G(e.getHours()),G(e.getMinutes()),G(e.getSeconds())].join(":");return[e.getDate(),_e[e.getMonth()],t].join(" ")}function ce(){console.log("%s - %s",Le(),T.apply(null,arguments))}function Y(e,t){if(!t||!h(t))return e;for(var r=Object.keys(t),n=r.length;n--;)e[r[n]]=t[r[n]];return e}function pe(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var Fe={inherits:_,_extend:Y,log:ce,isBuffer:le,isPrimitive:B,isFunction:O,isError:b,isDate:v,isObject:h,isRegExp:y,isUndefined:p,isSymbol:fe,isString:g,isNumber:k,isNullOrUndefined:M,isNull:m,isBoolean:w,isArray:C,inspect:c,deprecate:I,format:T,debuglog:F},ze=Object.freeze({__proto__:null,format:T,deprecate:I,debuglog:F,inspect:c,isArray:C,isBoolean:w,isNull:m,isNullOrUndefined:M,isNumber:k,isString:g,isSymbol:fe,isUndefined:p,isRegExp:y,isObject:h,isDate:v,isError:b,isFunction:O,isPrimitive:B,isBuffer:le,log:ce,inherits:_,_extend:Y,default:Fe}),Ue={};function he(e,t){for(var r=0,n=e.length-1;n>=0;n--){var a=e[n];a==="."?e.splice(n,1):a===".."?(e.splice(n,1),r++):r&&(e.splice(n,1),r--)}if(t)for(;r--;r)e.unshift("..");return e}var Ce=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,$=function(e){return Ce.exec(e).slice(1)};function j(){for(var e="",t=!1,r=arguments.length-1;r>=-1&&!t;r--){var n=r>=0?arguments[r]:"/";if(typeof n!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!n)continue;e=n+"/"+e,t=n.charAt(0)==="/"}return e=he(X(e.split("/"),function(a){return!!a}),!t).join("/"),(t?"/":"")+e||"."}function V(e){var t=J(e),r=ke(e,-1)==="/";return e=he(X(e.split("/"),function(n){return!!n}),!t).join("/"),!e&&!t&&(e="."),e&&r&&(e+="/"),(t?"/":"")+e}function J(e){return e.charAt(0)==="/"}function de(){var e=Array.prototype.slice.call(arguments,0);return V(X(e,function(t,r){if(typeof t!="string")throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))}function me(e,t){e=j(e).substr(1),t=j(t).substr(1);function r(f){for(var l=0;l<f.length&&!(f[l]!=="");l++);for(var d=f.length-1;d>=0&&!(f[d]!=="");d--);return l>d?[]:f.slice(l,d-l+1)}for(var n=r(e.split("/")),a=r(t.split("/")),s=Math.min(n.length,a.length),i=s,o=0;o<s;o++)if(n[o]!==a[o]){i=o;break}for(var u=[],o=i;o<n.length;o++)u.push("..");return u=u.concat(a.slice(i)),u.join("/")}var ge="/",ye=":";function be(e){var t=$(e),r=t[0],n=t[1];return!r&&!n?".":(n&&(n=n.substr(0,n.length-1)),r+n)}function Oe(e,t){var r=$(e)[2];return t&&r.substr(-1*t.length)===t&&(r=r.substr(0,r.length-t.length)),r}function Ee(e){return $(e)[3]}var Me={extname:Ee,basename:Oe,dirname:be,sep:ge,delimiter:ye,relative:me,join:de,isAbsolute:J,normalize:V,resolve:j};function X(e,t){if(e.filter)return e.filter(t);for(var r=[],n=0;n<e.length;n++)t(e[n],n,e)&&r.push(e[n]);return r}var ke="ab".substr(-1)==="b"?function(e,t,r){return e.substr(t,r)}:function(e,t,r){return t<0&&(t=e.length+t),e.substr(t,r)},Be=Object.freeze({__proto__:null,resolve:j,normalize:V,isAbsolute:J,join:de,relative:me,sep:ge,delimiter:ye,dirname:be,basename:Oe,extname:Ee,default:Me});export{g as a,M as b,m as c,ue as d,F as e,Ue as f,_ as g,I as h,h as i,O as j,c as k,v as l,y as m,B as n,Ie as o,Be as p,b as q,ze as u};
