import s from"../text/TextRenderer3D.js";import{easyBox as a}from"../../util/MeshTemplates.js";import l from"./ScreenElementBase.js";import*as n from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";export default class r extends l{constructor(t,i,e={}){super(t,i,e);this.button=a({width:this.width,height:this.height,depth:.025},{color:this.defaultColour}),this.button.material.transparent=!0,this.button.material.opacity=this.defaultOpacity,this.button.material.blending=n.NormalBlending,this.group.add(this.button),this.textObj=new s(t.screenManager.conjure,this.group,{text:e.text===void 0?"button":e.text,scale:.75,fit:{x:this.width-.025,y:this.height-.025},...e.textSettings}),this.textObj.group.position.setZ(.025),this.value=""}setValue(t){this.value=String(t),this.setText(this.value)}getValue(){return this.value}setActive(t){super.setActive(t)}setText(t){this.textObj.setText(t)}getText(){return this.textObj.string}addIcon(t){}setOnClickCallback(t,i){this.onClickCallbackArgs=i,this.onClickCallback=t}update(t){super.update(t)}setDisabled(t){if(!this.active)return;super.setDisabled(t),t?this.button.material.opacity=.2:this.button.material.opacity=.5}onClick(t){if(this.disabled)return;this.button.material.opacity=1,this.onClickCallback&&this.onClickCallback(this.onClickCallbackArgs)}onUnClick(t){if(this.disabled)return}onMouseOver(t){if(this.disabled)return;this.button.material.opacity=.8}onMouseOut(t){if(this.disabled)return;this.button.material.opacity=.5}}
