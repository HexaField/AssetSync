import*as e from"https://cdn.skypack.dev/pin/three@v0.117.1-NetLzdTnw9ga3y6o633U/min/three.js";export default class n{constructor(t,r={}){var s=new e.SphereGeometry(64,60,40);let o=new e.TextureLoader().load("assets/textures/milkyway.jpg");var d=new e.MeshStandardMaterial({side:e.BackSide,opacity:r.opacity||1,transparent:!0,map:o,color:11184810});let a=new e.Mesh(s,d);a.renderDepth=1e3,t.add(a)}}