import i from"../ScreenBase.js";import n from"../elements/ScreenElementButton.js";import{CONJURE_MODE as h}from"../../Conjure.js";export default class c extends i{constructor(e,r){super(e,r);this.screenTitle.mesh.visible=!1,this.clickTab=this.clickTab.bind(this),this.tabs={EXIT:"Exit",ASSETS:"Assets",OBJECTS:"Objects",FLY:"Fly",MANAGE:"Manage Realm"},this.tabKeys=Object.keys(this.tabs),this.tabHeight=this.tabKeys.length/50;let t=.5;for(let s of this.tabKeys){let a=new n(this,this,{x:-.95,y:t,width:.1,height:this.tabHeight,text:this.tabs[s],anchor:!0});a.setOnClickCallback(this.clickTab,this.tabs[s]),this.registerElement(a),t-=this.tabHeight*2}}clickTab(e){switch(e){default:case this.tabs.EXIT:this.screenManager.conjure.setConjureMode(h.EXPLORE);break;case this.tabs.ASSETS:this.screenManager.showScreen(this.screenManager.screenAssets);break;case this.tabs.OBJECTS:this.screenManager.showScreen(this.screenManager.screenObjectsHierarchy);break;case this.tabs.FLY:this.screenManager.conjure.getControls().toggleConjureControls();break;case this.tabs.MANAGE:this.screenManager.showScreen(this.screenManager.screenRealmSettings);break}}showScreen(e){super.showScreen(e)}update(e){super.update(e)}}