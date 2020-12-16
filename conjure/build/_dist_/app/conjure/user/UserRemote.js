import a from"./User.js";import c from"../screens/text/TextRenderer3D.js";import*as u from"https://cdn.skypack.dev/pin/three@v0.117.1-NetLzdTnw9ga3y6o633U/min/three.js";const d={CONNECT:0,DISCONNECT:1,UPDATE:2,MOVE:3,ANIMATION:4};export default class l extends a{constructor(e,n,t){super(e,!0);this.peerID=t,this.velocity=new u.Vector3,console.log(n),this.username=n.username,this.group.name=n.username,this.nameplate=new c(e,this.group,{text:this.username}),this.nameplate.group.position.setY(2),this.nameplate.group.rotation.set(0,Math.PI,0),this.nameplate.group.visible=this.username!=="undefined"&&this.username!=="",this.timeoutLimit=603*60,this.timeoutCount=0,this.makeConnection(t)}onCreate(){super.onCreate()}updateInfo(e){this.timeoutCount=0,e.username&&(this.username=e.username,this.nameplate.setText(this.username),this.nameplate.group.visible=this.username!=="undefined"&&this.username!=="")}update(e){if(this.timeoutCount++,this.timeoutCount>this.timeoutLimit){console.log(this.group.name+" has timed out"),this.conjure.getWorld().onUserLeave(this.peerID);return}this.group.position.set(this.group.position.x+this.velocity.x*e.delta,this.group.position.y+this.velocity.y*e.delta,this.group.position.z+this.velocity.z*e.delta)}setPhysics(e){this.timeoutCount=0,this.group.position.set(e.position.x,e.position.y,e.position.z),this.group.quaternion.set(e.rotation.x,e.rotation.y,e.rotation.z,e.rotation.w),this.velocity.set(e.velocity.x,e.velocity.y,e.velocity.z)}destroy(){}async makeConnection(e){const n=await new Promise(async t=>{try{const i=this.conjure.assetSync.networkPlugin.getPeerID()>e,o=await this.conjure.assetSync.connectionPlugin.createConnection(e,i);console.log("isInitiator",i),o.on("ready",()=>{t(!0)}),o.on("error",()=>t(!1)),o.on("close",()=>t(!1)),i&&this.conjure.world.realm.sendTo("connection.signal."+this.conjure.assetSync.networkPlugin.getPeerID(),o.peerData,e),this.conjure.world.realm.database.on("connection.signal."+e,async(s,r)=>{if(console.log("connection.signal."+e),r!==e)return;o.signal(s),o.on("signal",()=>{this.conjure.world.realm.sendTo("connection.signal."+this.conjure.assetSync.networkPlugin.getPeerID(),o.peerData,e)})})}catch(i){console.log("CONNECTION ERROR",i),t(!1)}});n?console.log("Direct connection establish to",e):console.log("Could not establish direct connection to",e,". Falling back to libp2p.")}}
