import*as s from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import l from"../text/TextRenderer3D.js";import{easyBox as d,easyPlane as h}from"../../util/MeshTemplates.js";import n from"./ScreenElementBase.js";import{number as r}from"../../util/number.js";export default class u extends n{constructor(t,i,e={}){super(t,i,e);this.background=d({width:this.width,height:this.height,depth:.1},{color:2524671}),this.background.castShadow=!1,this.background.receiveShadow=!1,this.background.material.transparent=!0,this.background.material.opacity=.5,this.isEditing=!1,this.slider=h({width:this.width,height:this.height},{color:16777215}),this.slider.castShadow=!1,this.slider.receiveShadow=!1,this.slider.position.setZ(.06),this.sliderTarget=h({width:this.width*1.2,height:this.height},{color:16777215,transparent:!0,opacity:0}),this.sliderTarget.castShadow=!1,this.sliderTarget.receiveShadow=!1,this.sliderTarget.position.setZ(.06),this.minValue=0,this.maxValue=100,this.group.add(this.background),this.group.add(this.slider),this.group.add(this.sliderTarget),this.textObj=new l(t.screenManager.conjure,this.group,{string:"slider",fit:{x:this.width-.025,y:this.height-.025},...e.textSettings})}setDefaultValue(t){this.default=t}defaultValue(){this.default!==void 0?this.updateSlider(this.default):this.updateSlider(0)}getValue(){return this.step?r(Math.round(s.Math.lerp(this.minValue,this.maxValue,this.sliderPercent))):r(s.Math.lerp(this.minValue,this.maxValue,this.sliderPercent))}setValues(t){if(this.disabled)return;if(!this.active)return;if(t.length<=1)return;this.step=t[0],this.minValue=t[1],this.maxValue=t[2],this.setDefaultValue(t[3]),this.updateSlider(this.default/this.maxValue)}updateSlider(t){if(this.disabled)return;if(!this.active)return;this.sliderPercent=s.MathUtils.clamp(t,0,1),this.step&&(this.sliderPercent=Math.round(this.sliderPercent*(this.maxValue-this.minValue))/(this.maxValue-this.minValue)),this.slider.position.setX(-this.width/2+this.width*this.sliderPercent/2),this.slider.scale.setX(this.sliderPercent),this.setText(this.getValue())}setText(t,i,e){this.step?this.textObj.setText(t):this.textObj.setText(t.toFixed(2))}update(t){if(super.update(t),this.disabled)return;if(!this.active)return;if(t.input.isPressed("MOUSELEFT",!0)&&(t.input.isDown("SHIFT",!0)?this.defaultValue():this.isEditing=!0),t.input.isReleased("MOUSELEFT",!0)&&(this.isEditing=!1),this.isEditing){let e=t.mouseRaycaster.intersectObject(this.sliderTarget,!1);if(e.length>0){var i=this.vec3.copy(e[0].point);e[0].object.worldToLocal(i);let a=(this.width/2+i.x)/this.width;this.updateSlider(a),this.onClickCallback(this.onClickCallbackArgs)}}}setOnClickCallback(t){this.onClickCallbackArgs=this,this.onClickCallback=t}setDisabled(t){super.setDisabled(t)}}
