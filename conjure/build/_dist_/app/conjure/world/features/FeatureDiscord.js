import*as t from"https://cdn.skypack.dev/pin/three@v0.117.1-NetLzdTnw9ga3y6o633U/min/three.js";import y from"./Feature.js";import"../structures/StructurePortal.js";import{POSTPROCESSING as m}from"../../PostProcessing.js";import{createLineGeometry as S,createCircleGeometry as C}from"../../util/MeshTemplates.js";import D from"../../screens/text/TextRenderer3D.js";export default class M extends y{constructor(e){super(e)}async preload(){const e={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({guildID:this.realm.realmData.getData().worldData.guildID,userID:this.realm.conjure.getProfile().getServiceManager().getService("Discord").getData().discordID})};try{this.guildData=await(await fetch("http://localhost:5600/",e)).json()}catch(r){return console.log("Could not access discord bot!",r),!1}console.log(this.guildData),this.nodeSize={guild:5,category:2,voice:5,text:2,undefined:1},this.nodeColors={guild:new t.Color("aqua"),category:new t.Color("aqua"),voice:new t.Color("yellow"),text:new t.Color("green"),undefined:new t.Color("white")},this.createNode({parent:this.realm.group,origin:new t.Vector3,data:this.guildData,depth:1})}createNode(e={}){let r=50/(e.depth*e.depth),n=this.nodeSize[e.data.type.toString()]||1,l=this.nodeColors[e.data.type.toString()],a=new t.Group;e.parent.add(a),a.position.copy(e.origin);let s=new D(this.realm.conjure,a,{text:e.data.name,color:l,glow:!0});s.group.lookAt(e.parent.position),s.group.position.setY(4),s.group.scale.setScalar(n*2);let u=new t.Line(C(n),new t.LineBasicMaterial({color:l,linewidth:2}));u.layers.enable(m.BLOOM_SCENE),a.add(u);let p=0,i=[];e.data.categories&&i.push(...e.data.categories),e.data.channels&&i.push(...e.data.channels);for(let d of i){let o=p*(e.angle?.75:1)*Math.PI*2/i.length-Math.PI/2+(e.angle||0);p++;let w=new t.Vector3(Math.cos(o)*r,0,Math.sin(o)*r);this.createNode({parent:a,origin:w,data:d,angle:o,depth:e.depth+1});let h=new t.Vector3(Math.cos(o)*n,0,Math.sin(o)*n),g=this.nodeSize[d.type.toString()]||1,f=new t.Vector3(Math.cos(o)*(r-g),0,Math.sin(o)*(r-g)),c=new t.Line(S(new t.Vector3(h.x,0,h.z),new t.Vector3(f.x,0,f.z)),new t.LineBasicMaterial({color:16777215,linewidth:2,vertexColors:!0}));c.layers.enable(m.BLOOM_SCENE),c.geometry.setAttribute("color",new t.Float32BufferAttribute([...l.clone().toArray(),...this.nodeColors[d.type.toString()].clone().toArray()],3)),a.add(c)}}async load(){}async unload(){}update(e){}}
