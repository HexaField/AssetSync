import{p as i}from"./process-e9e98960.js";const o=typeof self=="object"&&self.constructor&&self.constructor.name==="DedicatedWorkerGlobalScope",a=typeof i!="undefined"&&i.versions!=null&&i.versions.node!=null;function c(e){var e=Number(e);return isNaN(e)?0:e}const s=[];for(let e=0;e<256;e++)s[e]=(e<16?"0":"")+e.toString(16);function l(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,f=Math.random()*4294967295|0,r=Math.random()*4294967295|0,n=s[e&255]+s[e>>8&255]+s[e>>16&255]+s[e>>24&255]+"-"+s[t&255]+s[t>>8&255]+"-"+s[t>>16&15|64]+s[t>>24&255]+"-"+s[f&63|128]+s[f>>8&255]+"-"+s[f>>16&255]+s[f>>24&255]+s[r&255]+s[r>>8&255]+s[r>>16&255]+s[r>>24&255];return n.toUpperCase()}class d{constructor(){this._listeners={}}addEventListener(e,t){this._listeners[e]===void 0&&(this._listeners[e]=[]),this._listeners[e].indexOf(t)===-1&&this._listeners[e].push(t)}hasEventListener(e,t){return this._listeners[e]!==void 0&&this._listeners[e].indexOf(t)!==-1}removeEventListener(e,t){var f=this._listeners[e];if(f!==void 0){var r=f.indexOf(t);r!==-1&&f.splice(r,1)}}dispatchEvent(e){var t=this._listeners[e.type];if(t!==void 0){e.target=this;for(var f=t.slice(0),r=0,n=f.length;r<n;r++)f[r].call(this,e)}}}export{d as E,o as a,l as g,a as i,c as n};