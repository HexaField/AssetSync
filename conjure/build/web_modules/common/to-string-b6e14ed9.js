import{l as e,c as i}from"./constants-83de7adf.js";const{names:o}=i,{TextDecoder:a}=e,s=new a("utf8");function u(r){let t="";for(let n=0;n<r.length;n++)t+=String.fromCharCode(r[n]);return t}function c(r,t="utf8"){if(t==="utf8"||t==="utf-8")return s.decode(r);if(t==="ascii")return u(r);const n=o[t];if(!n)throw new Error("Unknown base");return n.encode(r)}var f=c;export{f as t};