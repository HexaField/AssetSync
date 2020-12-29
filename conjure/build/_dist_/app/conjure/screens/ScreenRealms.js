import l from"./ScreenBase.js";import i from"./elements/ScreenElementButton.js";import a from"./elements/ScreenElementBase.js";import o from"./elements/ScreenElementTextBox.js";import m from"./elements/ScreenElementScroll.js";import c,{REALM_TYPES as d}from"../../backend/realm/RealmData.js";import r from"./elements/ScreenElementSprite.js";export default class g extends l{constructor(t,e){super(t,e);this.buttonWidth=.4,this.buttonHeight=.1,this.background.visible=!0,this.group.add(this.background),this.createRealm=this.createRealm.bind(this),this.shareRealm=this.shareRealm.bind(this),this.forgetRealm=this.forgetRealm.bind(this),this.joinRealm=this.joinRealm.bind(this),this.realms=[],this.joinButton=new i(this,this,{x:-this.width/4,y:this.height/2-.1,width:this.buttonWidth,height:this.buttonHeight,text:"Join Realm"}),this.joinButton.setOnClickCallback(this.joinRealm),this.registerElement(this.joinButton),this.discordIdTextbox=new o(this,this,{x:this.width/4,y:this.height/2-.1,width:this.buttonWidth,height:this.buttonHeight}),this.discordIdTextbox.setValue(""),this.registerElement(this.discordIdTextbox),this.scrollPanel=new m(this,this,{width:this.width,height:this.height-.4}),this.registerElement(this.scrollPanel),this.createButton=new i(this,this,{x:-this.width/3,y:-this.height/2+.2,width:this.buttonWidth,height:this.buttonHeight,text:"Create Realm"}),this.createButton.setOnClickCallback(this.createRealm),this.registerElement(this.createButton),this.refreshButton=new i(this,this,{y:-this.height/2+.2,width:this.buttonWidth,height:this.buttonHeight,text:"Refresh"}),this.refreshButton.setOnClickCallback(this.screenManager.conjure.world.refreshKnownRealms),this.registerElement(this.refreshButton),this.shareButton=new i(this,this,{x:this.width/3,y:-this.height/2+.2,width:this.buttonWidth,height:this.buttonHeight,text:"Get Link"}),this.shareButton.setOnClickCallback(this.shareRealm),this.registerElement(this.shareButton),this.screenManager.conjure.world.on("realm:found",()=>{this.active&&this.displayRealms()}),this.getRealms()}showScreen(t){super.showScreen(t),this.scrollPanel.setActive(t),t&&this.getRealms()}getRealms(){this.realms=this.screenManager.conjure.world.getKnownRealms(),this.displayRealms()}createRealm(){this.screenManager.showScreen(this.screenManager.screenRealmSettings,{isCreating:!0})}shareRealm(){const t=this.screenManager.conjure.makeUrl();navigator.clipboard.writeText(t),CONSOLE.log("Copied",t,"to clipboard!")}displayRealms(){this.scrollPanel.removeAllItems();for(let t of this.realms){let e=new a(this,this.scrollPanel,{z:.025,width:this.buttonWidth*2,height:this.buttonHeight}),h=new i(this,e,{width:this.buttonWidth,height:this.buttonHeight});h.setOnClickCallback(this.joinRealm,t.id),h.setValue(t.name),e.registerElement(h);let n=new r(this,e,{x:-this.buttonWidth*.5,width:this.buttonHeight,height:this.buttonHeight});n.load(t.iconURL?t.iconURL:"default_realm"),e.registerElement(n);let s=new r(this,e,{x:this.buttonWidth*.5,width:this.buttonHeight,height:this.buttonHeight});s.load(t.type===d.GLOBAL?"global_icon":"pin_full"),s.setIconScale(.75),t.global||s.setOnClickCallback(this.forgetRealm,t),e.registerElement(s),this.scrollPanel.registerItem(e)}this.scrollPanel.updateItems(0)}async forgetRealm(t){await this.screenManager.conjure.realms.forgetRealm(t),this.getRealms()}async joinRealm(t){let e=await this.screenManager.conjure.getWorld().getRealm(t||this.discordIdTextbox.getValue());e?(this.screenManager.conjure.getWorld().joinRealm(new c(e)),this.screenManager.hideAllScreens()):console.log("Could not find realm with id",t||this.discordIdTextbox.getValue())}update(t){super.update(t)}}
