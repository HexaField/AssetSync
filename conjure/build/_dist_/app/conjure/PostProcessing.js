import*as s from"https://cdn.skypack.dev/pin/three@v0.117.1-NetLzdTnw9ga3y6o633U/min/three.js";import{EffectComposer as i}from"../../../web_modules/three/examples/jsm/postprocessing/EffectComposer.js";import{SSAARenderPass as c}from"../../../web_modules/three/examples/jsm/postprocessing/SSAARenderPass.js";import{ShaderPass as d}from"../../../web_modules/three/examples/jsm/postprocessing/ShaderPass.js";import{OutlinePass as o}from"../../../web_modules/three/examples/jsm/postprocessing/OutlinePass.js";import{UnrealBloomPass as a}from"../../../web_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";import{FXAAShader as n}from"../../../web_modules/three/examples/jsm/shaders/FXAAShader.js";export const POSTPROCESSING={ENTIRE_SCENE:0,BLOOM_SCENE:1};export default class h{constructor(e){this.conjure=e,this.conjure.renderer.autoClear=!1,this.composer=new i(this.conjure.renderer),this.conjure.renderer.toneMappingExposure=1,this.renderScene=new c(this.conjure.scene,this.conjure.camera),this.renderScene.sampleLevel=1,this.renderScene.clear=!1,this.composer.addPass(this.renderScene),this.addBloom(),this.addOutlines()}render(){this.conjure.renderer.clear(),this.conjure.camera.layers.set(POSTPROCESSING.BLOOM_SCENE),this.composer.render(),this.conjure.renderer.clearDepth(),this.conjure.camera.layers.set(POSTPROCESSING.ENTIRE_SCENE),this.conjure.renderer.render(this.conjure.scene,this.conjure.camera)}addBloom(){this.bloomPass=new a(new s.Vector2(window.innerWidth,window.innerHeight),1.5,.4,.85),this.bloomPass.threshold=0,this.bloomPass.strength=2.5,this.bloomPass.radius=.4,this.bloomPass.renderToScreen=!0,this.bloomPass.clear=!1,this.composer.addPass(this.bloomPass)}addOutlines(){this.objectSelectedPass=new o(new s.Vector2(window.innerWidth,window.innerHeight),this.conjure.scene,this.conjure.camera),this.selectedObjects=[],this.objectSelectedPass.edgeGlow=1,this.objectSelectedPass.edgeStrength=3,this.objectSelectedPass.edgeThickness=3,this.objectSelectedPass.pulsePeriod=0,this.objectSelectedPass.visibleEdgeColor=new s.Color(2524671),this.objectSelectedPass.hiddenEdgeColor=new s.Color(16777215),this.objectHoverPass=new o(new s.Vector2(window.innerWidth,window.innerHeight),this.conjure.scene,this.conjure.camera),this.objectHoverPass.edgeGlow=1,this.objectHoverPass.edgeStrength=3,this.objectHoverPass.edgeThickness=1,this.objectHoverPass.pulsePeriod=1,this.objectHoverPass.visibleEdgeColor=new s.Color(16777215),this.objectHoverPass.hiddenEdgeColor=new s.Color(2524671),this.effectFXAA=new d(n),this.effectFXAA.uniforms.resolution.value.set(1/window.innerWidth,1/window.innerHeight)}setHoverObject(e){e?this.objectHoverPass.selectedObjects=[e]:this.objectHoverPass.selectedObjects=[]}addSelectedObject(e){let t=!1;for(let r in this.selectedObjects)this.selectedObjects[r].uuid===e.uuid&&(t=!0);t||(this.selectedObjects.push(e),this.objectSelectedPass.selectedObjects=this.selectedObjects)}clearSelectedObjects(){this.selectedObjects=[],this.objectSelectedPass.selectedObjects=[]}removeSelectedObject(e){for(let t in this.selectedObjects)this.selectedObjects[t].uuid===e.uuid&&this.selectedObjects.splice(t,1);this.objectSelectedPass.selectedObjects=this.selectedObjects}}