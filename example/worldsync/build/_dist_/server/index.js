import{isWebWorker as r}from"../../web_modules/@AssetSync/common.js";import{server as s}from"../../web_modules/@AssetSync/WorldSync.js";export async function runApp(e){console.log("Starting server...");const{default:o}=await import("./game/index.js");s(o,e)}r&&runApp();