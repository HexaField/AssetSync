import*as t from"https://cdn.skypack.dev/pin/three@v0.117.1-NetLzdTnw9ga3y6o633U/min/three.js";export function easyOrigin(){let e=new t.Group;return e.add(easyLine({points:[new t.Vector3,new t.Vector3(1,0,0)]},{color:16711680})),e.add(easyLine({points:[new t.Vector3,new t.Vector3(0,1,0)]},{color:65280})),e.add(easyLine({points:[new t.Vector3,new t.Vector3(0,0,1)]},{color:255})),e}export function easyLine(e={},n={}){return new t.Line(new t.BufferGeometry().setFromPoints(e.points),e.material||new t.LineBasicMaterial(n))}export function easyBox(e={},n={}){return new t.Mesh(new t.BoxGeometry(e.width,e.height,e.depth),e.material||easyMaterial(n))}export function easyPlane(e={},n={}){return new t.Mesh(new t.PlaneGeometry(e.width,e.height),e.material||easyMaterial(n))}export function easySphere(e={},n={}){return new t.Mesh(new t.SphereGeometry(e.radius,e.segments,e.segments),e.material||easyMaterial(n))}export function easyMaterial(e={}){return new t.MeshBasicMaterial(e)}export function createLineGeometry(e,n){let r=new t.BufferGeometry().setFromPoints([e,n]);return r}export function createCircleGeometry(e,n){let r=new t.EllipseCurve(0,0,e,e,0,2*Math.PI,!1,0),i=r.getPoints(n||e*32),o=new t.BufferGeometry().setFromPoints(i);return o.rotateX(Math.PI/2),o}