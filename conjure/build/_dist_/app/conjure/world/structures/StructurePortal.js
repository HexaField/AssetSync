import*as e from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import s from"../../screens/text/TextRenderer3D.js";export default class l{constructor(o,i,t={}){this.conjure=o,this.portalWidth=t.portalWidth||1,this.portalHeight=t.portalHeight||1,this.portalLength=t.portalLength||1,this.group=new e.Group,this.group.name="portal-group-"+t.realmData.id,i.add(this.group),this.group.position.set(t.position.x,t.position.y,t.position.z),this.portalMaterial=new e.MeshBasicMaterial({visible:!1}),this.portalEntered=!1,this.portal=new e.Mesh(new e.BoxBufferGeometry(this.portalWidth,this.portalLength,this.portalHeight),this.portalMaterial),this.group.add(this.portal),this.portal.name="portal-"+t.realmData.id,o.physics.add.existing(this.group,{collisionFlags:6}),this.group.body.on.collision((r,h)=>{if(this.portalEntered)return;this.portalEntered=!0,console.log(t.realmData.id),r===this.conjure.getWorld().user.group&&this.conjure.world.joinRealmByID(t.realmData.id)}),this.nameplate=new s(o,this.group,{text:t.realmData.name,color:t.color,glow:!0}),this.nameplate.group.lookAt(new e.Vector3),this.nameplate.group.position.setY(1),this.nameplate.group.scale.setScalar(4)}destroy(){this.group.body&&this.conjure.physics.destroy(this.group.body),this.group.parent&&this.group.parent.remove(this.group)}}
