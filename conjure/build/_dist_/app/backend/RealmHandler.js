import o from"./realm/RealmDatabase.js";import n,{GLOBAL_REALMS as l,REALM_TYPES as d}from"./realm/RealmData.js";import{isNode as i}from"../../../web_modules/@AssetSync/common.js";import c from"../../../web_modules/events.js";import*as r from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import{initialisePhysics as h}from"./functions/initialisePhysics.js";export default class m extends c{constructor({assetSync:t,verboseOutput:e,forceNetwork:s}){super();this.assetSync=t,this.verboseOutput=e,this.forceNetwork=s,this.dhtProtocol="/realm/",this.realms={},this.objectLoader=new r.ObjectLoader}async initialise(){if(i){const{nodePolyfillThree:s}=await import("./functions/nodePolyfillThree.js");s()}await h();const t=new r.Clock,e=()=>{const s=t.getDelta()*1e3;this.update(parseInt(s.toString())),window.requestAnimationFrame(e)};window.requestAnimationFrame(e)}cleanup(){i&&window.close()}update(t){this.emit("update",t)}_doValidation(t){return t===void 0||t.id===void 0?!1:!(t.name===void 0)}validateRealm(t){let e=t;if(typeof t=="string")try{e=JSON.parse(t)}catch(a){return}const s=this._doValidation(e);return s?t:void 0}async get(t,e){try{const s=await this.assetSync.dhtPlugin.get({key:this.dhtProtocol+t});if(!this.validateRealm(s))return;if(s)return e&&await this.assetSync.dhtPlugin.putLocal({key:this.dhtProtocol+t,value:s}),JSON.parse(s)}catch(s){console.log(s)}return}async put(t,e){try{return await this.assetSync.dhtPlugin.put({key:this.dhtProtocol+t,value:e,minPeers:"1"})}catch(s){console.log(s)}}receiveFromDHT(t,e,s){if(i)try{this.validateRealm(e)?(this.assetSync.dhtPlugin.putLocal({key:this.dhtProtocol+t,value:e}),this.addDatabase(typeof e=="string"?JSON.parse(e):e,this.assetSync.log,this.forceNetwork)):this.removeDatabase(typeof e=="string"?JSON.parse(e):e)}catch(a){console.log(a,JSON.stringify(e,null,2))}}async preloadGlobalRealms(){for(let t of Object.values(l))t.global=!0,await this.addDatabase(t,this.assetSync.log,this.forceNetwork)}async updateRealm(t){await this.createRealm(t)}async forgetRealm(t){await this.assetSync.dhtPlugin.removeLocal({key:this.dhtProtocol+t.id}),await this.removeDatabase(t)}async getPinnedRealms(){return(await this.assetSync.dhtPlugin.getAllLocal()).filter(t=>t.key.substring(0,7)==="/realm/"&&t.value!==void 0&&t.value!=="").map(t=>JSON.parse(t.value))}async getRealmById(t,e){return await this.get(t,e)}async createRealm(t){t.type===d.NONE&&(await this.put(t.id,JSON.stringify(t)),await this.addDatabase(t))}getDatabase(t){return this.realms[t.id||t]}async addDatabase(t,e,s=!1){return this.realms[t.id]||await this._createDatabase(t,this.verboseOutput?(...a)=>{console.log("Loading Realm "+t.id+":",...a)}:e,s)}async _createDatabase(t,e,s){const a=new o(this,new n(t),this.dhtProtocol);return await a.start(e,s),this.realms[t.id]=a,a}async removeDatabase(t){const e=typeof t=="object"?t.id:t;this.realms[e]&&(await this.assetSync.dhtPlugin.removeDHT(this.dhtProtocol+e),await this.realms[e].stop(),delete this.realms[e])}}
