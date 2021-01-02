import*as r from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import"./Terrain.js";import n from"../features/FeatureArtGallery.js";import c from"../features/FeatureLobby.js";import{REALM_TYPES as h}from"../../../backend/realm/RealmData.js";import d from"../Platform.js";import u from"./ObjectManager.js";import l from"../features/FeatureDiscord.js";import b from"../../../../../web_modules/events.js";import{NETWORKING_OPCODES as s}from"../../../backend/Constants.js";import{getParams as j}from"../../../../../web_modules/@AssetSync/common.js";export default class p extends b{constructor(e,t){super();this.world=e,this.conjure=this.world.conjure,this.group=new r.Group,this.world.group.add(this.group),this.objectLoader=new r.ObjectLoader,this.objectManager=new u(this),this.realmData=t,this.realmID=t.getID(),this.onObjectCreate=this.onObjectCreate.bind(this),this.onObjectUpdate=this.onObjectUpdate.bind(this),this.onObjectGroup=this.onObjectGroup.bind(this),this.onObjectMove=this.onObjectMove.bind(this),this.onObjectDestroy=this.onObjectDestroy.bind(this),this.vec3=new r.Vector3,this.quat=new r.Quaternion,this.features=[],this.loading=!0,this.networkProtocolCallbacks={}}async preload(){this.realmData.getData().worldData.playsAudio&&await this.conjure.getAudioManager().create(!0),await this.preloadFeatures()}async preloadFeatures(){for(let e of this.realmData.getData().worldSettings.features)switch(e){case"Gallery":{let t=new n(this);await t.preload(),this.features.push(t);break}case"Platform":{this.terrain=new d(this.conjure,this.world.group);break}case"Lobby":{let t=new c(this);await t.preload(),this.features.push(t);break}case"Discord":{let t=new l(this);await t.preload(),this.features.push(t);break}default:break}}sendData(e,t){}sendTo(e,t,a){}async load(){for(let e of this.features)await e.load();this.database=await this.world.conjure.realms.addDatabase(this.realmData,(...e)=>{this.conjure.loadingScreen.setText(...e,!1),console.log("Loading Realm:",...e)},j().network==="true"),this.database.network.on("message",e=>{try{const{opcode:t,content:a}=JSON.parse(e.data);this.emit(t,a,e.from)}catch(t){console.log("hmm bad message",t,e)}}),this.database.network.on("onPeerJoin",e=>{this.world.sendMetadata(e),this.world.requestMetadata(e)}),this.database.network.on("onPeerLeave",e=>{this.world.onUserLeave(e)}),this.on(s.USER.METADATA,this.world.onUserData),this.on(s.USER.REQUEST_METADATA,(e,t)=>{this.world.sendMetadata(t)}),this.on(s.USER.MOVE,this.world.onUserMove),this.on(s.USER.ANIMATION,this.world.onUserAnimation),this.on(s.USER.LEAVE,(e,t)=>{this.world.onUserLeave(t)}),this.on(s.OBJECT.RECEIVE,this.onObjectCreate),this.on(s.OBJECT.CREATE,this.onObjectCreate),this.on(s.OBJECT.UPDATE_PROPERTIES,this.onObjectUpdate),this.on(s.OBJECT.DESTROY,this.onObjectDestroy),this.on(s.OBJECT.MOVE,this.onObjectMove),this.on(s.OBJECT.GROUP,this.onObjectGroup);for(let e of await this.database.getObjects())this.loadObjectFromPeer(e.uuid,e.data);this.network=this.database.network,this.sendData=(e,t)=>{this.network.broadcast(JSON.stringify({opcode:e,content:t}))},this.sendTo=(e,t,a)=>{this.network.sendTo(a,JSON.stringify({opcode:e,content:t}))},this.loading=!1}async leave(){this.removeAllListeners(),this.getObjectManager().destroyAllObjects(),this.realmData.type===h.EPHEMERAL&&await this.conjure.realms.removeDatabase(this.realmData),this.terrain&&this.terrain.destroy();for(let e of this.features)await e.unload();this.world.group.remove(this.group),console.log("successfully left realm")}getData(){return this.realmData}update(e){for(let t of this.features)t.update(e)}getObjectManager(){return this.objectManager}onObjectCreate({uuid:e,data:t},a){this.loadObjectFromPeer(e,t)}onObjectUpdate({uuid:e,data:t},a){console.log("onObjectUpdate",{uuid:e,data:t})}onObjectGroup(e,t){this.objectManager.groupObjects(this.objectManager.getObjectByUUID(e.newParentUUID),this.objectManager.getObjectByUUID(e.newChildUUID),!0)}onObjectMove(e,t){for(let a of e.objects)this.objectManager.updateObjectFromClient(a.uuid,a.data)}async onObjectDestroy(e,t){this.objectManager.destroyObjectByHash(e)}async loadObjectFromPeer(e,t){try{await this.loadObject(t)}catch(a){console.log("REALM: could not load object",object.uuid,"with error",a)}}async createObject(e){e.userData.originatorID=this.conjure.getProfile().getID(),e.position.copy(this.world.user.previewMeshPoint.getWorldPosition(this.vec3)),e.quaternion.copy(this.world.user.previewMeshPoint.getWorldQuaternion(this.quat)),e.updateMatrixWorld();let t=await this.objectToJSON(e);const a=await this.database.createObject({uuid:e.uuid,data:t});a&&(this.objectManager.addObject(e,!0),this.conjure.screenManager.hideScreen())}async objectToJSON(e){let t=e.toJSON();return t;if(t.images)for(let a=0;a<t.images.length;a++){if(t.images[a].url===this.conjure.assetManager.missingTextureData)continue;t.images[a].hash=await this.conjure.assetManager.createAsset(ASSET_TYPE.TEXTURE,t.images[a].url,t.images[a].uuid);let i=this.conjure.assetManager.getByIPFSHash(ASSET_TYPE.TEXTURE,t.images[a].hash).data.uuid;if(i!==t.images[a].uuid){if(t.textures)for(let o=0;o<t.textures.length;o++)t.textures[o].image===t.images[a].uuid&&(t.textures[o].image=i);t.images[a].uuid=i}t.images[a].url=""}}async loadObject(e){if(!e)return;try{typeof e=="string"&&(e=JSON.parse(e));let t=this.loadObjectAssets(e);return this.objectManager.addObject(t),!0}catch(t){return console.log(t,e),!1}}loadObjectAssets(e){return this.objectLoader.parse(e)}async updateObjectPosition(e){await this.updateObject(e);const t=await this.database.updateObject(e.userData.hash,e.userData.lastUpdate)}async updateObject(e){if(!e)return;if(!e.uuid){console.log("Tried to update object without a hash! Are you sure this object is a top parent?");return}let t=await this.objectToJSON(e);await this.database.updateObject({realmID:this.realmID,uuid:object.uuid,data:t})}async destroyObject(e){if(e.userData.markedDestroyed=!0,this.objectManager.getObject(e)){let t=await this.database.dereferenceObject({realmID:this.realmID,uuid:object.uuid});t?this.objectManager.destroyObject(e):(e.userData.markedDestroyed=!1,console.log("failed to remove object",e.uuid))}else{let t=this.objectManager.getTopGroupObject(e);this.objectManager.destroyObject(e,{isChild:!0}),await this.updateObject(t)}}}
