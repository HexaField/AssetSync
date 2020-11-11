import*as o from"https://cdn.skypack.dev/pin/three@v0.117.1-NetLzdTnw9ga3y6o633U/min/three.js";import c,{REALM_PROTOCOLS as i,GLOBAL_REALMS as h}from"./realm/Realm.js";import d from"../user/User.js";import f from"../user/UserRemote.js";import{CONJURE_MODE as n}from"../Conjure.js";import{INTERACT_TYPES as m}from"../screens/hud/HUDInteract.js";import a,{REALM_WHITELIST as u}from"./realm/RealmData.js";import g from"../../../../web_modules/lodash.js";export default class p{constructor(e){this.conjure=e,this.scene=this.conjure.scene,this.realmHandler=e.realms,this.group=new o.Group,this.scene.add(this.group),this.user=new d(e),this.users=[],this.lastUserUpdate={},this.savePeriod=5,this.updatesPerSecond=20,this.updateCount=0,this.updateCountMax=60/this.updatesPerSecond,this.interactMaxDistance=4,this.deltaThreshold=.1,this.vec3=new o.Vector3,this.quat=new o.Quaternion,this.globalRealms=[],this.spawnLocation=new o.Vector3(0,2,0),this.lastRealmID="Lobby"}async loadDefault(){if(this.conjure.urlParams.r){if(await this.joinRealmByID(this.conjure.urlParams.r))return}else if(await this.joinRealmByID(await self.simpleStorage.get("conjure-profile-lastJoinedRealm")))return;await this.joinRealmByID("Lobby")}async getRealms(){let e={};for(let t of await this.conjure.getProfile().getServiceManager().getRealmsFromConnectedServices())e[t.id]=new a(t).getData();for(let t of await this.conjure.realms.getRealms())e[t.id]=new a(t).getData();for(let t of this.globalRealms)e[t.id]=t;return Object.values(e)}async getRealmsAndPinned(){let e={};for(let t of await this.conjure.getProfile().getServiceManager().getRealmsFromConnectedServices())e[t.id]={realmData:new a(t).getData(),pinned:!1};for(let t of await this.conjure.realms.getRealms())e[t.id]?e[t.id].pinned=!0:e[t.id]={realmData:new a(t).getData(),pinned:!0};for(let t of this.globalRealms)e[t.id]={realmData:t,pinned:"global"};return Object.values(e)}async getRealm(e,t){for(let s of this.globalRealms)if(e===s.id)return s;return await this.conjure.realms.getRealm(e)}async preloadGlobalRealms(){for(let e of Object.values(h)){const t=new a(e).getData();t.global=!0,this.globalRealms.push(t),await this.conjure.realms.pinRealm(t,!0)}}async joinRealm(e,t={}){if(!t.force&&this.realm&&e.getID()===this.realm.realmID)return!1;if(this.realm&&(this.lastRealmID=this.realm.realmID,await this.realm.leave(),this.destroyAllRemoteUsers(),this.realm=void 0),this.conjure.setConjureMode(n.LOADING),e.getData().whitelist){if(e.getData().whitelist.type===u.SERVICE&&!this.conjure.getProfile().getServiceManager().getServiceLinked("Discord"))return!1;if(e.getData().whitelist.type===u.PASSCODE){if(this.conjure.setConjureMode(n.LOADING),this.conjure.loadingScreen.setPasscodeVisible(!0),console.log("Waiting for valid passcode..."),!await this.waitForPasscode(e.getData().whitelist.ids))return console.log("Maybe another time..."),!1;console.log("Passcode successful!"),this.conjure.loadingScreen.setPasscodeVisible(!1),this.conjure.loadingScreen.setText("Passcode successful!")}}this.realm=new c(this,e),await self.simpleStorage.set("conjure-profile-lastJoinedRealm",e.getID()),await this.realm.preload(),await this.realm.load();let s=e.getData().worldData.spawnPosition||new o.Vector3(0,1,0);return this.spawnLocation=s,this.user.teleport(s.x,s.y,s.z),this.realm.sendData(i.USER.JOIN,{username:this.conjure.getProfile().getUsername()}),this.conjure.setConjureMode(n.EXPLORE),!0}async forceReloadCurrentRealm(){await this.getRealms(),await this.joinRealmByID(this.realm.realmID,{force:!0})}async waitForPasscode(e){return new Promise(t=>{this.conjure.loadingScreen.setPasscodeCallback(async s=>{s===void 0&&t(!1),e.includes(s)&&t(!0)})})}async joinRealmByID(e,t={}){if(!e)return!1;if(this.realm&&this.realm.loading)return!1;let s=await this.getRealm(e,!0);if(!s)return!1;let r=new a(s);return r?(await this.joinRealm(r,t)||await this.joinRealmByID(this.lastRealmID,t),!0):!1}getScreensDisabled(){return this.realm?!!this.realm.realmData.getData().worldData.disableScreens:!1}update(e){this.user.update(e),this.realm&&this.realm.update(e);let t=!1,s=this.interactMaxDistance;for(let r in this.users){if(this.users[r].timedOut)continue;if(this.users[r].update(e),this.users[r]&&this.users[r].group&&(!t&&this.conjure.conjureMode===n.EXPLORE)){let l=this.conjure.worldRaycaster.intersectObject(this.users[r].group,!0);l.length>0&&l[0].distance<s&&(s=l[0].distance,t=!0,this.conjure.screenManager.hudExplore.interact.setObject(this.users[r],m.USER))}}this.conjure.conjureMode===n.EXPLORE,this.user.group&&this.user.group.body&&this.getWorldUpdates(e)}getWorldUpdates(){let e=!0;if(this.updateCount++,this.updateCount>this.savePeriod*60&&(this.updateCount=0,e=!1),this.updateCount%this.updateCountMax===0){e||this.sendData(i.HEARTBEAT,{});let t={physics:{p:this.user.group.getWorldPosition(this.vec3),r:this.user.group.getWorldQuaternion(this.quat),v:this.user.group.body.velocity}};(e||!g.isEqual(this.lastUserUpdate,t))&&(this.lastUserUpdate=t,this.sendData(i.USER.MOVE,t))}}receiveDataFromPeer(e,t){switch(e.protocol){case i.HEARTBEAT:this.onUserUpdate({},t);break;case i.USER.JOIN:this.onUserJoin(e.content,t);break;case i.USER.UPDATE:this.onUserUpdate(e.content,t);break;case i.USER.MOVE:this.onUserMove(e.content,t);break;case i.USER.LEAVE:this.onUserLeave(t);break;case i.USER.ANIMATION:this.onUserAnimation(e.content,t);break;default:break}}async sendData(e,t){this.realm&&await this.realm.sendData(e,t)}async sendTo(e,t,s){this.realm&&await this.realm.sendTo(e,t,s)}onUserJoin(e,t){let s=!1;for(let r of this.users)if(t===r.peerID){s=!0;break}s&&this.onUserLeave(t),this.users.push(new f(this.conjure,e.username,t)),window.CONSOLE.log(e.username+" has joined")}destroyAllRemoteUsers(){for(let e=0;e<this.users.length;e++)this.scene.remove(this.users[e].group),this.users.splice(e,1)}onUserLeave(e){for(let t=0;t<this.users.length;t++)if(e===this.users[t].peerID){window.CONSOLE.log(this.users[t].username+" has left"),this.scene.remove(this.users[t].group),this.users.splice(t,1);break}}onUserUpdate(e,t){let s=!1;for(let r=0;r<this.users.length;r++)if(t===this.users[r].peerID){this.users[r].updateInfo(e),s=!0;break}s||this.onUserJoin(e,t)}onUserAnimation(e,t){for(let s of this.users)if(t===s.peerID){s.setAction(e.name,e.fadeTime,e.once,e.startTime);break}}onUserMove(e,t){for(let s of this.users)if(t===s.peerID){s.setPhysics(e.physics);break}}getObjects(){return this.realm?this.realm.getObjectManager().objects:[]}}
