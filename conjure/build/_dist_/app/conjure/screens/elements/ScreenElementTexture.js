import o from"./ScreenElementBase.js";import n from"./ScreenElementButton.js";import{easyPlane as h}from"../../util/MeshTemplates.js";import a from"./ScreenElementTextBox.js";export default class l extends o{constructor(t,e,i,s={}){super(t,e,s);this.loadCallback=i,this.load=this.load.bind(this),this.openTextBox=this.openTextBox.bind(this),this.editButton=new n(t,this,{x:.15,width:.3,height:.2}),this.editButton.setOnClickCallback(this.openTextBox),this.editButton.setText("Edit"),this.group.add(this.editButton.group),this.textBox=new a(t,t,{z:.2,width:2,height:1,callback:this.load}),this.textBox.setText("https://cdn.discordapp.com/attachments/711163360175194154/715404619177525269/Screen_Shot_2020-05-28_at_13.22.00.png"),this.textBox.setActive(!1),this.icon=h({width:.2,height:.2},{color:16777215}),this.icon.position.set(-.2,0,0),this.group.add(this.icon),this.selected=!1,this.texture=void 0,this.load()}openTextBox(){if(!this.active)return;this.textBox.setActive(!0),this.textBox.setHTMLActive(!0),this.screen.setTextBox(this.textBox),this.screen.pause(this.load)}load(){this.textBox.setActive(!1),this.textBox.setHTMLActive(!1),this.textBox.updateValue(),this.screen.setTextBox(void 0),this.screen.screenManager.conjure.load.texture("https://cors-anywhere.herokuapp.com/"+this.textBox.getValue()).then(function(t){this.texture=t,this.onLoad()}.bind(this)).catch(t=>{console.log(t)})}onLoad(){this.loadCallback(),this.icon.material.map=this.texture}setValue(t){this.texture=t}getValue(){return this.texture}addIcon(t){}update(t){super.update(t),this.editButton.update(t),this.textBox.update(t)}setDisabled(t){super.setDisabled(t)}onClick(t){if(this.disabled)return}onUnClick(t){if(this.disabled)return}onMouseOver(t){if(this.disabled)return}onMouseOut(t){if(this.disabled)return}}