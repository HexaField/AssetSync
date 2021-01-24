import"../../../../web_modules/@AssetSync/common.js";import*as o from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import{AmmoPhysics as c}from"../../../../web_modules/@enable3d/ammo-physics.js";import"./RealmPhysicsDelegation.js";export default class r{constructor(e){this.database=e,this.assetSync=e.assetSync,this.objects={},this.scene=new o.Scene,this.physics=new c(this.scene),this.vec3=new o.Vector3}async initialise(e,i){for(let t of await this.database.getObjects())this.loadObject(t);e(Object.keys(this.objects).length,"objs"),this.database.realmHandler.on("update",t=>this.update(t))}update(e){this.physics.update(e),this.physics.updateDebugger()}getObject(e){return this.objects[e]}getAllObjects(){return Object.values(this.objects)}loadObject(e){if(!e)return;this.objects[e.uuid]=e,this.scene.add(e)}updateObject(e,i,t){const s=this.getObject(e);if(!s){console.warn("trying to update unknown object",e);return}s.userData.needsSaving=!0,this.database.objectsToSave.push(s.uuid),s&&s[i]&&(i==="position"&&s.position.set(t.x,t.y,t.z),i==="rotation"&&s.rotation.setFromVector3(new o.Vector3(t._x,t._y,t._z),t._order),i==="scale"&&s.scale.set(t.x,t.y,t.z))}_iterateUpdateValues(e,i,t){if(typeof t=="object")for(let s of Object.keys(t))t[s]?this._iterateUpdateValues(e[i],s,t[s]):(e[i][s]={},this._iterateUpdateValues(e[i],s,t[s]));else e[i]=t}removeObject(e){const i=typeof e=="object"?e.uuid:e;if(!e||!this.objects[i])return;this.scene.remove(this.objects[i]),delete this.objects[i]}}
