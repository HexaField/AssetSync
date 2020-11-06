import * as THREE from 'three'
import ScreenElementBase from './ScreenElementBase';
import ScreenElementMesh from './ScreenElementMesh';
import ScreenElementSprite from './ScreenElementSprite';
import { ASSET_TYPE } from '../../AssetManager';
import ScreenElementButton from './ScreenElementButton';

export default class ScreenElementAssetSelector extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.previewScale = args.previewScale;
        
        this.openAssetSelector = this.openAssetSelector.bind(this);
        this.onAssetSelected = this.onAssetSelected.bind(this);
        this.type = ASSET_TYPE.TEXTURE;

        this.selectorButton = new ScreenElementButton(screen, this, { x: this.width/2 - 0.1, width: 0.2, height: this.height })
        this.selectorButton.setOnClickCallback(this.openAssetSelector)
        this.selectorButton.setText('Browse')
        this.registerElement(this.selectorButton);
    }

    onAssetSelected(asset)
    {
        this.setAsset(asset);
        this.screen.screenManager.hideScreen(this.screen.screenManager.screenAssetSelect)
        if(this.onClickCallback)
            this.onClickCallback(asset)
    }

    openAssetSelector()
    {
        this.screen.screenManager.showScreen(this.screen.screenManager.screenAssetSelect)
        this.screen.screenManager.screenAssetSelect.setOnSelectCallback(this.onAssetSelected)
        this.screen.screenManager.screenAssetSelect.getAssetsByType(this.type)
    }

    onClick(){} // this is needed to override normal behaviour

    getValue(returnAsset)
    {
        if(!this.asset || !this.asset.data) return;
        if(returnAsset)
            return this.asset;
        return this.asset.data;
    }

    setAsset(asset)
    {
        if(!asset || !asset.type) return;
        this.asset = asset;
        this.type = asset.type;
        if(this.preview)
        {
            this.group.remove(this.preview.group);
            this.preview.destroy();
        }
        switch(asset.type)
        {
            case ASSET_TYPE.TEXTURE: 
                this.preview = new ScreenElementSprite(this.screen, this, { x: -this.width/2 + this.previewScale/2, width: 1, height: 1 });
                this.preview.setIconTexture(asset.data);
                this.preview.setIconScale(this.previewScale);
            break;
            case ASSET_TYPE.MATERIAL:
                this.preview = new ScreenElementMesh(this.screen, this, { x: -this.width/2, geometry: this.screen.screenManager.conjure.assetManager.defaultGeometry, material: asset.data, rotate:true, scale:0.05 });
            break;
            case ASSET_TYPE.GEOMETRY:
                this.preview = new ScreenElementMesh(this.screen, this, { x: -this.width/2, geometry: asset.data, material: this.screen.screenManager.conjure.assetManager.normalMaterial, rotate:true, scale:0.05 });
            break;
            default:return;
        }
        this.registerElement(this.preview);
    }
    
    update(updateArgs)
    {
        super.update(updateArgs);
    }
}