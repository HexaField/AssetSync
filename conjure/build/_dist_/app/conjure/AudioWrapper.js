import" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import{number as s}from"./util/number.js";export class AudioWrapper{constructor(e){this.conjure=e,this.worldSync=e.worldSync}async makeRequest(e,...t){return await this.worldSync.makeRequest("media",{type:"sound",request:{func:e,args:t}})}async create(e){return e&&(this.conjure.getLoadingScreen().setText(`WARNING!

This realm automatically plays audio.
Please click to continue.`),await this.conjure.getLoadingScreen().awaitInput()),await this.makeRequest("create",e)}async load(e,t){return await this.makeRequest("load",e,t)}async createFromMediaSource(e,t,a={}){return await this.makeRequest("createFromMediaSource",e,t,a)}play(e,t={}){this.makeRequest("play",e,t)}setMasterVolume(e){this.makeRequest("setMasterVolume",s(e))}toggleMute(){this.makeRequest("toggleMute")}}
