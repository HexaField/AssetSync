import*as o from" https://cdn.skypack.dev/pin/three@v0.123.0-STd7XeVUbImsNuMmqKGL/min/three.js";import{JoyStick as h}from"../../../web_modules/enable3d.js";import n from"./Keybindings.js";import l from"./util/pinput.js";import r from"../../../web_modules/events.js";export default class u extends r{constructor(i){super();this.conjure=i,this.isMobile=/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent),this.input=new l,this.mouse=new o.Vector2,this.mouseDelta=new o.Vector2,this.scroll=0,this.scrollVelocity=0,this.keybindings=new n(i),this.isMobile&&(this.touchBindings={},this.cameraSensitivity=4,this.joystick=new h,this.moveAxis=this.joystick.add.axis({styles:{left:35,bottom:35,size:100}}),this.moveAxis.onMove(s=>{const{top:t,right:e}=s;this.touchBindings.FORWARD=Math.abs(t>0?t:0),this.touchBindings.BACKWARD=Math.abs(t<0?t:0),this.touchBindings.LEFT=Math.abs(e<0?e:0),this.touchBindings.RIGHT=Math.abs(e>0?e:0)}),this.cameraAxis=this.joystick.add.axis({styles:{right:35,bottom:35,size:100}}),this.cameraAxis.onMove(s=>{const{top:t,right:e}=s;this.mouseDelta.y=t*-this.cameraSensitivity,this.mouseDelta.x=e*this.cameraSensitivity})),this.onMouseWheel=this.onMouseWheel.bind(this),document.addEventListener("wheel",this.onMouseWheel,!1),this.addKey("HOME","GRAVE")}getTouchInput(i){return this.touchBindings[i]||!1}isPressed(i,s){return this.isMobile?this.getTouchInput(i):this.input.isPressed(s?i:this.keybindings.getKey(i))}isReleased(i,s){return this.isMobile?this.getTouchInput(i):this.input.isReleased(s?i:this.keybindings.getKey(i))}isDown(i,s){return this.isMobile?this.getTouchInput(i):this.input.isDown(s?i:this.keybindings.getKey(i))}addKey(i,s){this.keybindings.addKey(i,s)}onMouseWheel(i){let s=0;i.wheelDelta?s=i.wheelDelta:i.detail&&(s=-i.detail),s*=.01,s>1&&(s=1),s<-1&&(s=-1),this.scrollVelocity=s,this.scroll+=this.scrollVelocity}update(){this.input.update(),this.isMobile||(this.mouseDelta.x=this.input.mouseMovement.x,this.mouseDelta.y=this.input.mouseMovement.y,this.mouse.x=this.input.mousePosition.x/window.innerWidth*2-1,this.mouse.y=-(this.input.mousePosition.y/window.innerHeight)*2+1),(this.scrollVelocity>0||this.scrollVelocity<0)&&(this.scrollVelocity*=.5),this.scroll>5&&(this.scroll=5),this.scroll<-5&&(this.scroll=-5),this.scroll>0&&(this.scroll*=.5),this.scroll<0&&(this.scroll*=.5),(this.scroll<.01&&this.scroll>0||this.scroll>-.01&&this.scroll<0)&&(this.scroll=0)}}
