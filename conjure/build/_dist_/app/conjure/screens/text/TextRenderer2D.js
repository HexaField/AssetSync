import*as s from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import r from"../../../../../web_modules/three-spritetext.js";export default class o{constructor(t,e,i={}){this.group=new s.Group,this.text=new r(e),console.log(this.text),this.text.scale.set(1,.1,.1),this.group.add(this.text),t.add(this.group)}setText(t){this.text.text=t,console.log(this.text)}getText(){return this.text.text}show(t){this.group.visible=t}update(){}}
