import"https://cdn.skypack.dev/pin/three@v0.117.1-NetLzdTnw9ga3y6o633U/min/three.js";import"./util/number.js";export default class t{constructor(e){this.conjure=e,this.worldSync=e.worldSync}async create(e){e&&(this.conjure.getLoadingScreen().setText(`WARNING!

This realm automatically plays audio.
Please click to continue.`),await this.conjure.getLoadingScreen().awaitInput())}async load(e,a){}createFromMediaSource(e,a,n={}){}play(e,a={}){}setMasterVolume(e){}async toggleMute(){}update(){}}
