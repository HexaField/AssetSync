import*as e from"https://cdn.skypack.dev/pin/three@v0.121.1-01UDfMGdzKBc6pDlaRa9/min/three.js";import{OrbitControls as y}from"./OrbitControls.js";import{Regions as x}from"./world/index.js";import{HeightmapGenerator as R}from"./world/HeightmapGenerator.js";import{easyWorldOrigin as b}from"./world/MeshTemplates.js";export default async function(d){const{assetSync:H,proxy:t}=d,n=new e.Scene;n.background=new e.Color(15790320);const r=new e.PerspectiveCamera(50,t.clientWidth/t.clientHeight,.1,1e5);r.position.set(10,10,20);const s=new e.WebGLRenderer({antialias:!0,canvas:t.canvas});s.setSize(t.clientWidth,t.clientHeight,!1);const h=t.devicePixelRatio;s.setPixelRatio(Math.min(2,h));const M=new y(r,t);n.add(new e.HemisphereLight(16777147,526368,.4));const m=new e.DirectionalLight(14674943,.8);m.position.set(50,200,100),m.position.multiplyScalar(1.3);const S=new e.Clock;function p(o){const i=o.domElement,a=t.clientWidth,c=t.clientHeight,l=i.width!==a||i.height!==c;return l&&o.setSize(a,c,!1),l}const g=new e.Mesh(new e.SphereBufferGeometry,new e.MeshBasicMaterial({color:65280}));n.add(g);const w=new R;n.add(b(1e3));const u=new x({generateFunction:async o=>{const i=new e.Mesh(new e.BufferGeometry,new e.MeshStandardMaterial({color:16777215,wireframe:!0}));i.position.set(o.center.x,0,o.center.y);const{vertices:a,indices:c}=await w.generate(o.coords);i.geometry.setAttribute("position",new e.BufferAttribute(new Float32Array(a),3)),i.geometry.setIndex(c),i.geometry.computeVertexNormals(),o.mesh=i},loadFunction:o=>{n.add(o.mesh)},unloadFunction:o=>{n.remove(o.mesh)}}),f=()=>{p(s)&&(r.aspect=t.clientWidth/t.clientHeight,r.updateProjectionMatrix()),u.updatePosition(r.position.x,r.position.z),s.render(n,r),requestAnimationFrame(f)};requestAnimationFrame(f)}
