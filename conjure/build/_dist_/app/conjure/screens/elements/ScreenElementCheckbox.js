import"../text/createText.js";import{easyPlane as s}from"../../util/MeshTemplates.js";import a from"./ScreenElementBase.js";export default class o extends a{constructor(t,i,e={}){super(t,i,e);this.button=s({width:e.width,height:e.height},{color:2524671}),this.button.castShadow=!1,this.button.receiveShadow=!1,this.button.material.transparent=!0,this.button.material.opacity=.5,this.group.add(this.button),this.checked=!1}setActive(t){super.setActive(t)}setChecked(t){this.checked=t,t?this.addBorder(.01):this.removeBorder()}setOnClickCallback(t){this.onClickCallback=t}update(t){super.update(t)}onClick(){if(this.disabled)return;this.button.material.opacity=1,this.setChecked(!this.checked),this.onClickCallback&&this.onClickCallback(this.checked)}onUnClick(){if(this.disabled)return;this.button.material.opacity=.8}onMouseOver(){if(this.disabled)return;this.button.material.opacity=.8}onMouseOut(){if(this.disabled)return;this.button.material.opacity=.5}}