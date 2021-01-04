import*as n from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import{NETWORKING_OPCODES as a}from"../../backend/Constants.js";import d from"./realm/Realm.js";import m from"./User.js";import f from"./UserRemote.js";import j from"./AvatarControls.js";import"../world/object/FlyControls.js";import g from"../world/object/ObjectControls.js";import{CONJURE_MODE as i}from"../Conjure.js";import{INTERACT_TYPES as w}from"../screens/hud/HUDInteract.js";import l,{REALM_WHITELIST as h,GLOBAL_REALMS as p,REALM_TYPES as R}from"../../backend/realm/RealmData.js";import"../../../../web_modules/lodash.js";import{number as y}from"../../../../web_modules/@AssetSync/common.js";import E from"../../../../web_modules/events.js";export default class b extends E{constructor(e){super();this.conjure=e,this.scene=this.conjure.scene,this.group=new n.Group,this.scene.add(this.group),this.user=new m(e),this.avatarControls=new j(e,this.user,this.conjure.canvas),this.objectControls=new g(this),this.remoteUsers={},this.lastUserUpdate={},this.savePeriod=5,this.updatesPerSecond=60,this.updateCount=0,this.updateCountMax=60/this.updatesPerSecond,this.interactMaxDistance=4,this.deltaThreshold=.1,this.vec3=new n.Vector3,this.quat=new n.Quaternion,this.globalRealms=[],this.spawnLocation=new n.Vector3(0,2,0),this.lastRealmID="Lobby",this.onUserData=this.onUserData.bind(this),this.onUserLeave=this.onUserLeave.bind(this),this.onUserMove=this.onUserMove.bind(this),this.onUserAnimation=this.onUserAnimation.bind(this),this.refreshKnownRealms=this.refreshKnownRealms.bind(this),this.knownRealms={}}async loadDefault(){if(this.conjure.urlParams.r){if(await this.joinRealmByID(this.conjure.urlParams.r))return}else if(await this.joinRealmByID(y(await window.clientDatastore.get("conjure-profile-lastJoinedRealm"))))return;await this.joinRealmByID("Lobby")}async refreshKnownRealms(){this.knownRealms={};for(let e of this.globalRealms)this.knownRealms[e.id]=e;for(let e of await this.conjure.realms.getPinnedRealms())this.knownRealms[e.id]=new l(e);this.conjure.getProfile().getServiceManager().getRealmsFromConnectedServices(e=>{this.knownRealms[e.id]=new l(e),this.emit("realm:found",e)})}getKnownRealms(){return Object.values(this.knownRealms).sort((e,t)=>e.timestamp>t.timestamp)}async getRealm(e,t){return this.knownRealms[e]?this.knownRealms[e]:(console.log("did not find realm locally, looking in dht"),await this.conjure.realms.getRealmById(e,t))}async preloadRealms(){for(let e of Object.values(p)){const t=new l(e);t.type=R.GLOBAL,this.globalRealms.push(t)}await this.refreshKnownRealms()}async joinRealm(e,t={}){if(!t.force&&this.realm&&e.getID()===this.realm.realmID)return!1;if(this.realm&&(this.lastRealmID=this.realm.realmID,this.sendData(a.USER.LEAVE),await this.realm.leave(),this.destroyAllRemoteUsers(),delete this.realm),this.conjure.setConjureMode(i.LOADING),this.conjure.loadingScreen.setText("Joining realm...",!1),e.whitelist){if(e.whitelist.type===h.SERVICE&&!this.conjure.getProfile().getServiceManager().getServiceLinked("Discord"))return!1;if(e.whitelist.type===h.PASSCODE){if(this.conjure.setConjureMode(i.LOADING),this.conjure.loadingScreen.setPasscodeVisible(!0),console.log("Waiting for valid passcode..."),!await this.waitForPasscode(e.whitelist.ids))return console.log("Maybe another time..."),!1;console.log("Passcode successful!"),this.conjure.loadingScreen.setPasscodeVisible(!1),this.conjure.loadingScreen.setText("Passcode successful!")}}this.realm=new d(this,e),await window.clientDatastore.put("conjure-profile-lastJoinedRealm",String(e.getID())),this.conjure.loadingScreen.setText("Pre-loading realm...",!1),await this.realm.preload(),this.conjure.loadingScreen.setText("Loading realm...",!1),await this.realm.load(),this.sendMetadata(),this.requestMetadata();let s=e.worldData.spawnPosition||new n.Vector3(0,1,0);return this.spawnLocation=s,this.user.teleport(s.x,s.y,s.z),this.conjure.setConjureMode(i.EXPLORE),!0}async forceReloadCurrentRealm(){await this.getKnownRealms(),await this.joinRealmByID(this.realm.realmID,{force:!0})}async waitForPasscode(e){return new Promise(t=>{this.conjure.loadingScreen.setPasscodeCallback(async s=>{s===void 0&&t(!1),e.includes(s)&&t(!0)})})}async joinRealmByID(e,t={}){if(!e)return!1;if(this.realm&&this.realm.loading)return!1;let s=await this.getRealm(e,!0);if(!s)return!1;let r=new l(s);return await this.joinRealm(r,t)||await this.joinRealmByID(this.lastRealmID,t),!0}getScreensDisabled(){return this.realm?!!this.realm.realmData.worldData.disableScreens:!1}update(e){this.avatarControls.update(e),this.user.update(e),this.realm&&this.realm.update(e);let t=!1,s=this.interactMaxDistance;for(let r of Object.values(this.remoteUsers)){if(r.timedOut)continue;if(r.update(e),r&&r.group&&(!t&&this.conjure.conjureMode===i.EXPLORE)){let o=this.conjure.worldRaycaster.intersectObject(r.group,!0);o.length>0&&o[0].distance<s&&(s=o[0].distance,t=!0,this.conjure.screenManager.hudExplore.interact.setObject(r,w.USER))}}(this.conjure.conjureMode===i.BUILD||this.conjure.conjureMode===i.SCREEN)&&this.objectControls.update(e),this.conjure.conjureMode===i.EXPLORE&&(e.input.isPressed("l",!0)&&(this.conjure.physics.debugDrawer.enabled?this.conjure.physics.debug.disable():this.conjure.physics.debug.enable())),this.realm&&this.user.group&&this.user.group.body&&this.getWorldUpdates(e)}roundInt(e,t){return parseFloat(String(e)).toFixed(t)}getWorldUpdates(){let e=!0;const t=this.user.group.getWorldPosition(this.vec3),s={x:Math.round(t.x*100),y:Math.round(t.y*100),z:Math.round(t.z*100)},r=this.user.group.getWorldQuaternion(this.quat),o={x:Math.round(r._x*100),y:Math.round(r._y*100),z:Math.round(r._z*100),w:Math.round(r._w*100)},c={x:Math.round(this.user.group.body.velocity.x*100),y:Math.round(this.user.group.body.velocity.y*100),z:Math.round(this.user.group.body.velocity.z*100)};let u={position:s,rotation:o,velocity:c};e&&this.sendData(a.USER.MOVE,u)}async sendData(e,t={}){if(!this.realm)return;this.realm.sendData(e,t)}async sendTo(e,t={},s){if(!this.realm)return;this.realm.sendTo(e,t,s)}sendMetadata(e){e?this.realm.sendTo(a.USER.METADATA,{username:this.conjure.getProfile().getUsername()},e):this.realm.sendData(a.USER.METADATA,{username:this.conjure.getProfile().getUsername()})}requestMetadata(e){e?this.realm.sendTo(a.USER.REQUEST_METADATA,{},e):this.realm.sendData(a.USER.REQUEST_METADATA,{})}onUserData(e,t){this.remoteUsers[t]?this.remoteUsers[t].updateInfo(e):(this.remoteUsers[t]=new f(this.conjure,e,t),window.CONSOLE.log(e.username+" has joined"),this.remoteUsers[t].getConnection())}destroyAllRemoteUsers(){for(let e of Object.values(this.remoteUsers))e.destroy(),delete this.remoteUsers[e.peerID]}onUserLeave(e){if(!this.remoteUsers[e])return;window.CONSOLE.log(this.remoteUsers[e].username+" has left"),this.remoteUsers[e].destroy(),delete this.remoteUsers[e]}onUserAnimation(e,t){if(!this.remoteUsers[t]){this.requestMetadata(t);return}this.remoteUsers[t].setAction(e.name.trim(),e.fadeTime,e.once,e.startTime)}onUserMove(e,t){if(!this.remoteUsers[t]){this.requestMetadata(t);return}this.remoteUsers[t].setPhysics(e)}getObjects(){return this.realm?this.realm.getObjectManager().objects:[]}}
