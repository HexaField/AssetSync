import l from"./ScreenBase.js";import*as s from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import m from"./elements/ScreenElementText.js";import{number as o}from"../util/number.js";export default class c extends l{constructor(t,e){super(t,e);this.segments=[],this.segmentTargets=[],this.labels=[],this.expandScale=1.25,this.hoverNumber=0,this.segmentItems=["Profile","Settings","Change Mode","Realms"],this.createRing()}createRing(){let t=new s.MeshBasicMaterial({color:this.defaultColour3,side:s.DoubleSide,transparent:!0,opacity:this.defaultOpacity});for(let e=0;e<this.segmentItems.length;e++){let r=new s.Mesh(new s.RingBufferGeometry(.25,.5,8,1,0,Math.PI*2/this.segmentItems.length),new s.MeshBasicMaterial({color:this.defaultColour3,side:s.DoubleSide,transparent:!0,opacity:this.defaultOpacity})),i=new s.Mesh(new s.RingBufferGeometry(.25,.5*this.expandScale,8,1,0,Math.PI*2/this.segmentItems.length),t);r.rotateZ(e*Math.PI*2/this.segmentItems.length),i.rotateZ(e*Math.PI*2/this.segmentItems.length),i.visible=!1,this.segments.push(r),this.segmentTargets.push(i),this.group.add(r),this.group.add(i);let h=(e+.5)*Math.PI*2/this.segmentItems.length,a=new s.Vector2(Math.cos(h),Math.sin(h));a.multiplyScalar(.35);let n=new m(this,this,{x:a.x,y:a.y,z:.025});n.setText(this.segmentItems[e]),this.registerElement(n),this.labels.push(n)}}clickItem(){switch(this.hoverNumber){case 0:this.screenManager.showScreen(this.screenManager.screenProfile);break;case 1:this.screenManager.showScreen(this.screenManager.screenSettings);break;case 2:this.screenManager.conjure.toggleConjureMode();break;case 3:this.screenManager.showScreen(this.screenManager.screenRealms);break;default:break}}showScreen(t){super.showScreen(t),this.enableButton(2,Boolean(this.world.realm))}enableButton(t,e){this.segments[t].material.opacity=e?this.defaultOpacity:this.defaultOpacity*.75,e?this.segmentTargets[t].layers.enable(0):this.segmentTargets[t].layers.disable(0)}update(t){super.update(t),this.segments.length>0&&this.segments[this.hoverNumber]&&this.segments[this.hoverNumber].scale.set(1,1,1);let e=t.mouseRaycaster.intersectObjects(this.segmentTargets,!1);if(e.length){let r=e[0].object;for(let i in this.segmentTargets)this.segmentTargets[i]===r&&(this.hoverNumber=o(i));this.segments[this.hoverNumber].scale.set(this.expandScale,this.expandScale,this.expandScale),t.input.isPressed("MOUSELEFT",!0)&&this.clickItem()}else this.hoverNumber=void 0}}
