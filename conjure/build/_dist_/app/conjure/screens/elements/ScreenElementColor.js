import*as h from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import n from"./ScreenElementBase.js";import s from"./ScreenElementScaler.js";import{number as l}from"../../util/number.js";export default class a extends n{constructor(t,i,e={}){super(t,i,e);this.value=new h.Vector3,this.onValuesChanged=this.onValuesChanged.bind(this),this.xElement=new s(this.screen,this,{x:-this.width/2,width:.1,height:.075,...e.textSettings}),this.yElement=new s(this.screen,this,{width:.1,height:.075,...e.textSettings}),this.zElement=new s(this.screen,this,{x:this.width/2,width:.1,height:.075,...e.textSettings}),this.xElement.setUpdateCallback(this.onValuesChanged),this.yElement.setUpdateCallback(this.onValuesChanged),this.zElement.setUpdateCallback(this.onValuesChanged),this.registerElement(this.xElement),this.registerElement(this.yElement),this.registerElement(this.zElement)}onValuesChanged(){let t="0x"+this.hex(Math.min(255,Math.max(0,Math.round(this.xElement.currentValue*255))))+this.hex(Math.min(255,Math.max(0,Math.round(this.yElement.currentValue*255))))+this.hex(Math.min(255,Math.max(0,Math.round(this.zElement.currentValue*255))));console.log(t),this.value=t,console.log(this.value),this.onClickCallback&&this.onClickCallback(this.onClickCallbackArgs,this.value)}hex=t=>l(t).toString(16).padStart(2,"0");dec=t=>parseInt(t,16);setSubject(t){this.subject=t,this.setValue(this.subject)}setValue(t){this.value=t,console.log(t.toString().substring(2,4)),this.xElement.setValue(this.dec(t.toString().substring(2,4))),this.yElement.setValue(this.dec(t.toString().substring(4,6))),this.zElement.setValue(this.dec(t.toString().substring(6,8)))}getValue(){return this.value}onClick(t){}setDisabled(t){super.setDisabled(t)}setActive(t){super.setActive(t),this.setHTMLActive(t)}update(t){super.update(t),!this.xElement.isEditing&&!this.yElement.isEditing&&!this.zElement.isEditing&&this.setValue(this.subject)}}
