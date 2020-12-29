import i from"./realm/RealmDatabase.js";import r,{GLOBAL_REALMS as n,REALM_TYPES as o}from"./realm/RealmData.js";import"../../../web_modules/@AssetSync/common.js";export default class l{constructor(t){this.assetSync=t,this.dhtProtocol="/realm/",this.realms={}}async get(t,e){try{const a=await this.assetSync.dhtPlugin.get({key:this.dhtProtocol+t});if(a)return e&&await this.assetSync.dhtPlugin.putLocal({key:this.dhtProtocol+t,value:a}),JSON.parse(a)}catch(a){}return}async put(t,e){return await this.assetSync.dhtPlugin.put({key:this.dhtProtocol+t,value:e,minPeers:"1"})}receiveFromDHT(t,e,a){try{e?(this.assetSync.dhtPlugin.putLocal({key:this.dhtProtocol+t,value:e}),this.addDatabase(typeof e=="string"?JSON.parse(e):e)):this.removeDatabase(typeof e=="string"?JSON.parse(e):e)}catch(s){console.log(s,JSON.stringify(e,null,2))}}async initialise(){await this.preloadGlobalRealms();for(let t of await this.getPinnedRealms())await this.addDatabase(t)}async preloadGlobalRealms(){for(let t of Object.values(n))t.global=!0,await this.addDatabase(t)}async updateRealm(t){await this.createRealm(t)}async forgetRealm(t){await this.assetSync.dhtPlugin.removeLocal({key:this.dhtProtocol+t.id}),await this.removeDatabase(t)}async getPinnedRealms(){return(await this.assetSync.dhtPlugin.getAllLocal()).filter(t=>t.key.substring(0,7)==="/realm/"&&t.value!==void 0&&t.value!=="").map(t=>JSON.parse(t.value))}async getRealmById(t,e){return await this.get(t,e)}async createRealm(t){t.type===o.NONE&&(this.put(t.id,JSON.stringify(t)),await this.addDatabase(t))}getDatabase(t){return this.realms[t.id||t]}async addDatabase(t,e){return this.realms[t.id]||await this._createDatabase(t,e)}async _createDatabase(t,e){const a=new i(new r(t),this.assetSync,this.dhtProtocol);return await a.start(e),this.realms[t.id]=a,a}async removeDatabase(t){this.realms[t.id]&&(await this.assetSync.dhtPlugin.removeDHT(this.dhtProtocol+t.id),await this.realms[t.id].stop(),delete this.realms[t.id])}}
