import{isNode as o}from"../web_modules/@AssetSync/common.js";import s from"../web_modules/@AssetSync/WorldSync.js";import{runApp as a}from"./start.js";import{getParams as i}from"./urldecoder.js";async function c(){const e=await s({serverFunc:a,canvas:o?void 0:document.getElementById("canvas"),config:{assetSync:!1,urlParams:i(location.href),touchDevice:Boolean("ontouchstart"in window)}});if(e._isRunningInWorker){const{MediaHandler:r}=await import("./media/MediaHandler.js"),t=new r(e);e._peerSync.addEventListener("requestPointerLock",()=>{e._peerSync.canvas.requestPointerLock()}),e._peerSync.addEventListener("exitPointerLock",()=>{document.exitPointerLock()}),e._peerSync.addEventListener("open",(...n)=>{window.open(...n)}),e._peerSync.addRequestOpcode("media",async n=>await t.handle(n))}}c();
