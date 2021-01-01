import{b as w,n as b,r as V,as as g,o as y,at as L,u as M,au as B,av as q,V as s,W as z,e as j,L as W,a3 as G}from"../../../../common/three.module-36fff313.js";var c=function(R,n){w.call(this,R),this.type="Refractor";var u=this;n=n||{};var P=n.color!==void 0?new b(n.color):new b(8355711),f=n.textureWidth||512,x=n.textureHeight||512,T=n.clipBias||0,p=n.shader||c.RefractorShader,o=new V;o.matrixAutoUpdate=!1,o.userData.refractor=!0;var h=new g,d=new y,F={minFilter:W,magFilter:W,format:G},v=new L(f,x,F);(!M.isPowerOfTwo(f)||!M.isPowerOfTwo(x))&&(v.texture.generateMipmaps=!1),this.material=new B({uniforms:q.clone(p.uniforms),vertexShader:p.vertexShader,fragmentShader:p.fragmentShader,transparent:!0}),this.material.uniforms.color.value=P,this.material.uniforms.tDiffuse.value=v.texture,this.material.uniforms.textureMatrix.value=d;var U=function(){var e=new s,t=new s,r=new y,l=new s,i=new s;return function(m){return e.setFromMatrixPosition(u.matrixWorld),t.setFromMatrixPosition(m.matrixWorld),l.subVectors(e,t),r.extractRotation(u.matrixWorld),i.set(0,0,1),i.applyMatrix4(r),l.dot(i)<0}}(),O=function(){var e=new s,t=new s,r=new z,l=new s;return function(){u.matrixWorld.decompose(t,r,l),e.set(0,0,1).applyQuaternion(r).normalize(),e.negate(),h.setFromNormalAndCoplanarPoint(e,t)}}(),S=function(){var e=new g,t=new j,r=new j;return function(i){o.matrixWorld.copy(i.matrixWorld),o.matrixWorldInverse.copy(o.matrixWorld).invert(),o.projectionMatrix.copy(i.projectionMatrix),o.far=i.far,e.copy(h),e.applyMatrix4(o.matrixWorldInverse),t.set(e.normal.x,e.normal.y,e.normal.z,e.constant);var a=o.projectionMatrix;r.x=(Math.sign(t.x)+a.elements[8])/a.elements[0],r.y=(Math.sign(t.y)+a.elements[9])/a.elements[5],r.z=-1,r.w=(1+a.elements[10])/a.elements[14],t.multiplyScalar(2/t.dot(r)),a.elements[2]=t.x,a.elements[6]=t.y,a.elements[10]=t.z+1-T,a.elements[14]=t.w}}();function C(e){d.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),d.multiply(e.projectionMatrix),d.multiply(e.matrixWorldInverse),d.multiply(u.matrixWorld)}function D(e,t,r){u.visible=!1;var l=e.getRenderTarget(),i=e.xr.enabled,a=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(v),e.autoClear===!1&&e.clear(),e.render(t,o),e.xr.enabled=i,e.shadowMap.autoUpdate=a,e.setRenderTarget(l);var m=r.viewport;m!==void 0&&e.state.viewport(m),u.visible=!0}this.onBeforeRender=function(e,t,r){if(v.texture.encoding=e.outputEncoding,r.userData.refractor===!0)return;if(!U(r)===!0)return;O(),C(r),S(r),D(e,t,r)},this.getRenderTarget=function(){return v}};c.prototype=Object.create(w.prototype),c.prototype.constructor=c,c.RefractorShader={uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:["uniform mat4 textureMatrix;","varying vec4 vUv;","void main() {","	vUv = textureMatrix * vec4( position, 1.0 );","	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join(`
`),fragmentShader:["uniform vec3 color;","uniform sampler2D tDiffuse;","varying vec4 vUv;","float blendOverlay( float base, float blend ) {","	return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );","}","vec3 blendOverlay( vec3 base, vec3 blend ) {","	return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );","}","void main() {","	vec4 base = texture2DProj( tDiffuse, vUv );","	gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );","}"].join(`
`)};export{c as Refractor};
