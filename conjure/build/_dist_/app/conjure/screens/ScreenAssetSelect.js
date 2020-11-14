import c from"./ScreenBase.js";import o from"./elements/ScreenElementButton.js";import h from"./elements/ScreenElementLabelled.js";import m from"./elements/ScreenElementScroll.js";import{ASSET_TYPE as n}from"../AssetManager.js";import i from"./elements/ScreenElementMesh.js";export default class u extends c{constructor(e,s){super(e,s);this.group.add(this.background),this.onAssetSelect=this.onAssetSelect.bind(this),this.assetPanel=new m(this,this,{width:.8,height:this.height,scrollSide:"left"}),this.registerElement(this.assetPanel),this.assetPanel.background.visible=!1,this.assetList=[]}getAssetsByType(e){this.screenTitle.setText(e),this.currentAssetType=e;for(let a of this.assetList)this.assetPanel.removeItem(a);this.assetList=[];let s=this.screenManager.conjure.assetManager.getAllOfTypeByLastUsed(e),l=s?Object.keys(s):[];for(let a of l){const r=new o(this,this.assetPanel,{width:.4,height:.1});r.setText(s[a].name),r.setOnClickCallback(this.onAssetSelect,s[a]);const t=new h(this,this.assetPanel,{x:.05,z:.1,width:.4,height:.1,element:r});t.setText("");switch(e){case n.TEXTURE:t.setIconFromTexture(s[a].data),t.setIconSize(.1),t.icon.group.position.set(-.2,0,0);break;case n.MATERIAL:t.registerElement(new i(this,t,{x:-.2,geometry:this.screenManager.conjure.assetManager.defaultGeometry,material:s[a].data,rotate:!0,scale:.075}));break;case n.GEOMETRY:t.registerElement(new i(this,t,{x:-.2,geometry:s[a].data,material:this.screenManager.conjure.getWorld().defaultMaterial,rotate:!0,scale:.075}));break;default:break}this.assetPanel.registerItem(t),this.assetList.push(t)}this.assetPanel.updateItems()}setOnSelectCallback(e){this.onSelectCallback=e}onAssetSelect(e){this.screenManager.conjure.assetManager.updateLastUsed(e),this.onSelectCallback&&this.onSelectCallback(e)}updateAssets(){if(!this.active)return;this.getAssetsByType(this.currentAssetType)}update(e){super.update(e)}}