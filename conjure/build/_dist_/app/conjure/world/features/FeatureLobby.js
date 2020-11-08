import*as e from"https://cdn.skypack.dev/pin/three@v0.117.1-NetLzdTnw9ga3y6o633U/min/three.js";import m from"./Feature.js";import u from"../structures/StructurePortal.js";import{POSTPROCESSING as l}from"../../PostProcessing.js";import{REALM_WHITELIST as p}from"../realm/RealmData.js";import{createLineGeometry as c,createCircleGeometry as i}from"../../util/MeshTemplates.js";export default class w extends m{constructor(t){super(t)}async preload(){this.portals=[],this.realmDatas=(await this.realm.world.getRealms()).filter(a=>a.id!=="Lobby"),this.realmDatas.length<8&&this.realmDatas.push(...new Array(8-this.realmDatas.length).fill("")),this.portalsCount=this.realmDatas.length;let t=new e.Line(i(2),new e.LineBasicMaterial({color:new e.Color("aqua"),linewidth:2}));t.layers.enable(l.BLOOM_SCENE),this.realm.group.add(t);for(let a=0;a<this.portalsCount;a++){let n=(a+.5)*Math.PI*2/this.portalsCount+Math.PI/2,r=new e.Vector2(Math.cos(n),Math.sin(n)),o=new e.Color("aqua");if(this.realmDatas[a]!==""){this.realmDatas[a].global?o=new e.Color("green"):this.realmDatas[a].whitelist.type!==p.NONE&&(o=new e.Color("red"));let h=new u(this.realm.conjure,this.realm.group,{realmData:this.realmDatas[a],position:{x:-r.x*10,y:2,z:-r.y*10},color:o});this.portals.push(h);let s=new e.Line(c(new e.Vector3(-r.x*2,0,-r.y*2),new e.Vector3(-r.x*9,0,-r.y*9)),new e.LineBasicMaterial({color:16777215,linewidth:2,vertexColors:!0}));s.layers.enable(l.BLOOM_SCENE),s.geometry.setAttribute("color",new e.Float32BufferAttribute([...new e.Color("aqua").toArray(),...o.clone().toArray()],3)),this.realm.group.add(s)}t=new e.Line(i(1),new e.LineBasicMaterial({color:o,linewidth:2})),this.realmDatas[a]!==""&&t.layers.enable(l.BLOOM_SCENE),t.position.set(-r.x*10,0,-r.y*10),this.realm.group.add(t)}t=new e.Line(i(20,this.portalsCount),new e.LineBasicMaterial({color:new e.Color("aqua"),linewidth:2})),t.layers.enable(l.BLOOM_SCENE),this.realm.group.add(t)}async load(){}async unload(){this.portals.forEach(t=>t.destroy())}update(t){}}
