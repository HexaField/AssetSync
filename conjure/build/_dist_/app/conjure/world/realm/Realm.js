import*as s from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import"./Terrain.js";import r from"../features/FeatureArtGallery.js";import i from"../features/FeatureLobby.js";import{REALM_TYPES as n}from"../../../backend/realm/RealmData.js";import d from"../Platform.js";import l from"../features/FeatureDiscord.js";import c from"../../../../../web_modules/events.js";import{NETWORKING_OPCODES as o}from"../../../backend/Constants.js";import{getParams as h}from"../../../../../web_modules/@AssetSync/common.js";export default class u extends c{constructor(e,t){super();this.world=e,this.conjure=this.world.conjure,this.group=new s.Group,this.world.group.add(this.group),this.objectLoader=new s.ObjectLoader,this.realmData=t,this.realmID=t.getID(),this.vec3=new s.Vector3,this.quat=new s.Quaternion,this.features=[],this.loading=!0,this.networkProtocolCallbacks={}}sendData(e,t){}sendTo(e,t,a){}async load(){this.realmData.getData().worldData.playsAudio&&await this.conjure.getAudioManager().create(!0),this.database=await this.world.conjure.realms.addDatabase(this.realmData,(...e)=>{this.conjure.loadingScreen.setText(...e,!1),console.log("Loading Realm:",...e)},h().network==="true"),this.conjure.physics=this.database.world.physics,this.world.group.add(this.database.world.scene),this.database.eventHooks.on("message",e=>{try{const{opcode:t,content:a}=JSON.parse(e.data);this.emit(t,a,e.from)}catch(t){console.log("hmm bad message",t,e)}}),this.database.eventHooks.on("onPeerJoin",e=>{this.world.sendMetadata(e),this.world.requestMetadata(e)}),this.database.eventHooks.on("onPeerLeave",e=>{this.world.onUserLeave(e)}),this.on(o.USER.METADATA,this.world.onUserData),this.on(o.USER.REQUEST_METADATA,(e,t)=>{this.world.sendMetadata(t)}),this.on(o.USER.MOVE,this.world.onUserMove),this.on(o.USER.ANIMATION,this.world.onUserAnimation),this.on(o.USER.LEAVE,(e,t)=>{this.world.onUserLeave(t)}),this.database.onObjectCreate=(e,t)=>{this.loadObject(e)},this.database.onObjectUpdate=(e,t)=>{console.log("onObjectUpdate",e)},this.database.onObjectGroup=(e,t)=>{},this.database.onObjectMove=(e,t)=>{for(let a of e.objects);},this.database.onObjectDestroy=async(e,t)=>{this.world.objectControls.detach(e)},this.network=this.database.network,this.sendData=(e,t)=>{this.network.broadcast(JSON.stringify({opcode:e,content:t}))},this.sendTo=(e,t,a)=>{this.network.sendTo(a,JSON.stringify({opcode:e,content:t}))},await this.loadFeatures(),this.loading=!1}async loadFeatures(){for(let e of this.realmData.getData().worldSettings.features)switch(e){case"Gallery":{let t=new r(this);await t.load(),this.features.push(t);break}case"Platform":{this.terrain=new d(this.conjure,this.world.group);break}case"Lobby":{let t=new i(this);await t.load(),this.features.push(t);break}case"Discord":{let t=new l(this);await t.load(),this.features.push(t);break}default:break}}async leave(){this.world.group.remove(this.database.world.scene),this.database.eventHooks.removeAllListeners(),this.removeAllListeners(),this.realmData.type===n.EPHEMERAL&&await this.conjure.realms.removeDatabase(this.realmData),this.terrain&&this.terrain.destroy();for(let e of this.features)await e.unload();this.conjure.physics=void 0,this.world.group.remove(this.group),console.log("successfully left realm")}getData(){return this.realmData}update(e){for(let t of this.features)t.update(e)}async createObject(e){e.userData.originatorID=this.conjure.assetSync.peerID,e.updateMatrixWorld(),await this.database.createObject(e)}async updateObject(e,t){await this.database.updateObject(e,t)}async destroyObject(e){await this.database.removeObject(e),this.world.objectControls.detachAll(e)}}
