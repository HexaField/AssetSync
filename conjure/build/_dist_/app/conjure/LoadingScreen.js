import*as s from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import i from"../../../web_modules/three-typeable-text.js";import{CONJURE_MODE as c}from"./Conjure.js";export default class n{constructor(e){this.conjure=e,this.passcodeLoseFocus=this.passcodeLoseFocus.bind(this),this.active=!1,this.passcodeCallback=void 0,this.renderer=e.renderer,this.camera=new s.PerspectiveCamera(80,window.clientWidth/window.clientHeight,.1,100),this.scene=new s.Scene,document.addEventListener("keydown",t=>{if(this.active&&this.passcodeCallback){var a=t.key;a==="Escape"&&(this.passcodeCallback(),this.active=!1)}},!1),this.conjure.on("conjure:mode",t=>{this.active=t===c.LOADING})}setPasscodeCallback(e){this.passcodeCallback=e}passcodeLoseFocus(e){!e&&this.active&&(this.passcodeCallback&&this.passcodeCallback(this.passcodeTextEntry.getText()),this.passcodeTextEntry.actionFocus(!0))}setPasscodeVisible(e){this.passcodeText.getObject().visible=e,this.passcodeTextEntry.getObject().visible=e,this.passcodeTextEntry.actionFocus(e)}create(){this.passcodeTextEntry=new i({onFocus:this.passcodeLoseFocus,camera:this.camera,font:this.conjure.getFont("System"),align:"left",string:"",material:new s.MeshBasicMaterial({color:65280})}),this.passcodeText=new i({useDocumentListeners:!1,font:this.conjure.getFont("System"),align:"right",string:"Enter Passcode > ",material:new s.MeshBasicMaterial({color:65280})}),this.textObj=new i({useDocumentListeners:!1,font:this.conjure.getFont("System"),string:"",material:new s.MeshBasicMaterial({color:65280})}),this.passcodeText.getObject().position.set(.25,-4,0),this.passcodeTextEntry.getObject().position.set(-.25,-4,0),this.setPasscodeVisible(!1),this.camera.position.set(0,0,50),this.camera.lookAt(0,0,0),this.scene.add(this.passcodeTextEntry.getObject()),this.scene.add(this.passcodeText.getObject()),this.scene.add(this.textObj.getObject())}setText(e,t=!0){this.textObj.setText(t?e:this.textObj.getText()+`
`+e),e.includes(`
`)?this.textObj.getObject().position.setY(this.textObj._line_height*e.match(/\n/g).length):this.textObj.getObject().position.setY(0),this.update()}async awaitInput(){return new Promise((e,t)=>{document.addEventListener("click",()=>e())})}update(){this.passcodeTextEntry.updateCursor(),this.renderer.render(this.scene,this.camera)}}
