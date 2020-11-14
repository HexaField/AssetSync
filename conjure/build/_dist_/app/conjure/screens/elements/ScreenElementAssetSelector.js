import"https://cdn.skypack.dev/pin/three@v0.117.1-NetLzdTnw9ga3y6o633U/min/three.js";import n from"./ScreenElementBase.js";import r from"./ScreenElementMesh.js";import h from"./ScreenElementSprite.js";import{ASSET_TYPE as t}from"../../AssetManager.js";import c from"./ScreenElementButton.js";export default class a extends n{constructor(e,i,s={}){super(e,i,s);this.previewScale=s.previewScale,this.openAssetSelector=this.openAssetSelector.bind(this),this.onAssetSelected=this.onAssetSelected.bind(this),this.type=t.TEXTURE,this.selectorButton=new c(e,this,{x:this.width/2-.1,width:.2,height:this.height}),this.selectorButton.setOnClickCallback(this.openAssetSelector),this.selectorButton.setText("Browse"),this.registerElement(this.selectorButton)}onAssetSelected(e){this.setAsset(e),this.screen.screenManager.hideScreen(this.screen.screenManager.screenAssetSelect),this.onClickCallback&&this.onClickCallback(e)}openAssetSelector(){this.screen.screenManager.showScreen(this.screen.screenManager.screenAssetSelect),this.screen.screenManager.screenAssetSelect.setOnSelectCallback(this.onAssetSelected),this.screen.screenManager.screenAssetSelect.getAssetsByType(this.type)}onClick(){}getValue(e){return!this.asset||!this.asset.data?void 0:e?this.asset:this.asset.data}setAsset(e){if(!e||!e.type)return;this.asset=e,this.type=e.type,this.preview&&(this.group.remove(this.preview.group),this.preview.destroy());switch(e.type){case t.TEXTURE:this.preview=new h(this.screen,this,{x:-this.width/2+this.previewScale/2,width:1,height:1}),this.preview.setIconTexture(e.data),this.preview.setIconScale(this.previewScale);break;case t.MATERIAL:this.preview=new r(this.screen,this,{x:-this.width/2,geometry:this.screen.screenManager.conjure.assetManager.defaultGeometry,material:e.data,rotate:!0,scale:.05});break;case t.GEOMETRY:this.preview=new r(this.screen,this,{x:-this.width/2,geometry:e.data,material:this.screen.screenManager.conjure.assetManager.normalMaterial,rotate:!0,scale:.05});break;default:return}this.registerElement(this.preview)}update(e){super.update(e)}}