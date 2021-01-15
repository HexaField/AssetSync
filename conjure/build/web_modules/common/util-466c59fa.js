import{p as w}from"./process-2545f00a.js";import{B as V,g as W}from"./buffer-es6-dff6eda2.js";var _;typeof Object.create=="function"?_=function(t,n){t.super_=n,t.prototype=Object.create(n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:_=function(t,n){t.super_=n;var r=function(){};r.prototype=n.prototype,t.prototype=new r,t.prototype.constructor=t};var v=_,q=/%[sdj%]/g;function O(e){if(!g(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(u(arguments[n]));return t.join(" ")}for(var n=1,r=arguments,f=r.length,o=String(e).replace(q,function(s){if(s==="%%")return"%";if(n>=f)return s;switch(s){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(a){return"[Circular]"}default:return s}}),i=r[n];n<f;i=r[++n])y(i)||!p(i)?o+=" "+i:o+=" "+u(i);return o}function D(e,t){if(l(W.process))return function(){return D(e,t).apply(this,arguments)};if(w.noDeprecation===!0)return e;var n=!1;function r(){if(!n){if(w.throwDeprecation)throw new Error(t);w.traceDeprecation?console.trace(t):console.error(t),n=!0}return e.apply(this,arguments)}return r}var S={},k;function C(e){if(l(k)&&(k=w.env.NODE_DEBUG||""),e=e.toUpperCase(),!S[e])if(new RegExp("\\b"+e+"\\b","i").test(k)){var t=0;S[e]=function(){var n=O.apply(null,arguments);console.error("%s %d: %s",e,t,n)}}else S[e]=function(){};return S[e]}function u(e,t){var n={seen:[],stylize:Q};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),z(t)?n.showHidden=t:t&&$(n,t),l(n.showHidden)&&(n.showHidden=!1),l(n.depth)&&(n.depth=2),l(n.colors)&&(n.colors=!1),l(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=K),E(n,e,n.depth)}u.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},u.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"};function K(e,t){var n=u.styles[t];return n?"["+u.colors[n][0]+"m"+e+"["+u.colors[n][1]+"m":e}function Q(e,t){return e}function X(e){var t={};return e.forEach(function(n,r){t[n]=!0}),t}function E(e,t,n){if(e.customInspect&&t&&m(t.inspect)&&t.inspect!==u&&!(t.constructor&&t.constructor.prototype===t)){var r=t.inspect(n,e);return g(r)||(r=E(e,r,n)),r}var f=Y(e,t);if(f)return f;var o=Object.keys(t),i=X(o);if(e.showHidden&&(o=Object.getOwnPropertyNames(t)),h(t)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return A(t);if(o.length===0){if(m(t)){var s=t.name?": "+t.name:"";return e.stylize("[Function"+s+"]","special")}if(d(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(b(t))return e.stylize(Date.prototype.toString.call(t),"date");if(h(t))return A(t)}var a="",c=!1,j=["{","}"];if(P(t)&&(c=!0,j=["[","]"]),m(t)){var Z=t.name?": "+t.name:"";a=" [Function"+Z+"]"}if(d(t)&&(a=" "+RegExp.prototype.toString.call(t)),b(t)&&(a=" "+Date.prototype.toUTCString.call(t)),h(t)&&(a=" "+A(t)),o.length===0&&(!c||t.length==0))return j[0]+a+j[1];if(n<0)return d(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special");e.seen.push(t);var N;return c?N=x(e,t,n,i,o):N=o.map(function(L){return R(e,t,n,i,L,c)}),e.seen.pop(),ee(N,a,j)}function Y(e,t){if(l(t))return e.stylize("undefined","undefined");if(g(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}if(M(t))return e.stylize(""+t,"number");if(z(t))return e.stylize(""+t,"boolean");if(y(t))return e.stylize("null","null")}function A(e){return"["+Error.prototype.toString.call(e)+"]"}function x(e,t,n,r,f){for(var o=[],i=0,s=t.length;i<s;++i)G(t,String(i))?o.push(R(e,t,n,r,String(i),!0)):o.push("");return f.forEach(function(a){a.match(/^\d+$/)||o.push(R(e,t,n,r,a,!0))}),o}function R(e,t,n,r,f,o){var i,s,a;if(a=Object.getOwnPropertyDescriptor(t,f)||{value:t[f]},a.get?a.set?s=e.stylize("[Getter/Setter]","special"):s=e.stylize("[Getter]","special"):a.set&&(s=e.stylize("[Setter]","special")),G(r,f)||(i="["+f+"]"),s||(e.seen.indexOf(a.value)<0?(y(n)?s=E(e,a.value,null):s=E(e,a.value,n-1),s.indexOf(`
`)>-1&&(o?s=s.split(`
`).map(function(c){return"  "+c}).join(`
`).substr(2):s=`
`+s.split(`
`).map(function(c){return"   "+c}).join(`
`))):s=e.stylize("[Circular]","special")),l(i)){if(o&&f.match(/^\d+$/))return s;i=JSON.stringify(""+f),i.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(i=i.substr(1,i.length-2),i=e.stylize(i,"name")):(i=i.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),i=e.stylize(i,"string"))}return i+": "+s}function ee(e,t,n){var r=e.reduce(function(f,o){return o.indexOf(`
`)>=0,f+o.replace(/\u001b\[\d\d?m/g,"").length+1},0);return r>60?n[0]+(t===""?"":t+`
 `)+" "+e.join(`,
  `)+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}function P(e){return Array.isArray(e)}function z(e){return typeof e=="boolean"}function y(e){return e===null}function B(e){return e==null}function M(e){return typeof e=="number"}function g(e){return typeof e=="string"}function I(e){return typeof e=="symbol"}function l(e){return e===void 0}function d(e){return p(e)&&F(e)==="[object RegExp]"}function p(e){return typeof e=="object"&&e!==null}function b(e){return p(e)&&F(e)==="[object Date]"}function h(e){return p(e)&&(F(e)==="[object Error]"||e instanceof Error)}function m(e){return typeof e=="function"}function U(e){return e===null||typeof e=="boolean"||typeof e=="number"||typeof e=="string"||typeof e=="symbol"||typeof e=="undefined"}function J(e){return V.isBuffer(e)}function F(e){return Object.prototype.toString.call(e)}function H(e){return e<10?"0"+e.toString(10):e.toString(10)}var te=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function ne(){var e=new Date,t=[H(e.getHours()),H(e.getMinutes()),H(e.getSeconds())].join(":");return[e.getDate(),te[e.getMonth()],t].join(" ")}function T(){console.log("%s - %s",ne(),O.apply(null,arguments))}function $(e,t){if(!t||!p(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e}function G(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var re={inherits:v,_extend:$,log:T,isBuffer:J,isPrimitive:U,isFunction:m,isError:h,isDate:b,isObject:p,isRegExp:d,isUndefined:l,isSymbol:I,isString:g,isNumber:M,isNullOrUndefined:B,isNull:y,isBoolean:z,isArray:P,inspect:u,deprecate:D,format:O,debuglog:C},ie=Object.freeze({__proto__:null,format:O,deprecate:D,debuglog:C,inspect:u,isArray:P,isBoolean:z,isNull:y,isNullOrUndefined:B,isNumber:M,isString:g,isSymbol:I,isUndefined:l,isRegExp:d,isObject:p,isDate:b,isError:h,isFunction:m,isPrimitive:U,isBuffer:J,log:T,inherits:v,_extend:$,default:re});export{m as a,u as b,b as c,d,U as e,h as f,p as g,g as h,v as i,B as j,y as k,ie as u};
