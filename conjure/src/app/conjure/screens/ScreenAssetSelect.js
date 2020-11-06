import ScreenBase from './ScreenBase'
import ScreenElementButton from './elements/ScreenElementButton'
import ScreenElementLabelled from './elements/ScreenElementLabelled'
import ScreenElementScroll from './elements/ScreenElementScroll'
import { ASSET_TYPE } from '../AssetManager'
import ScreenElementMesh from './elements/ScreenElementMesh'

export default class ScreenAssets extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);

        this.group.add(this.background);

        this.onAssetSelect = this.onAssetSelect.bind(this);

        this.assetPanel = new ScreenElementScroll(this, this, { width: 0.8, height: this.height, scrollSide: 'left'});
        this.registerElement(this.assetPanel)
        this.assetPanel.background.visible = false;

        this.assetList = [];
    }

    getAssetsByType(assetType)
    {
        this.screenTitle.setText(assetType)
        this.currentAssetType = assetType;
        for(let button of this.assetList)
            this.assetPanel.removeItem(button)
        this.assetList = [];
        let assets = this.screenManager.conjure.assetManager.getAllOfTypeByLastUsed(assetType)
        let keys = assets ? Object.keys(assets) : []
        for(let key of keys)
        {
            const assetButton = new ScreenElementButton(this, this.assetPanel, { width: 0.4, height: 0.1 });
            assetButton.setText(assets[key].name)
            assetButton.setOnClickCallback(this.onAssetSelect, assets[key]);
            const previewLabel = new ScreenElementLabelled(this, this.assetPanel, { x: 0.05, z: 0.1, width: 0.4, height: 0.1, element: assetButton });
            previewLabel.setText('');
            switch(assetType)
            {
                case ASSET_TYPE.TEXTURE:
                    previewLabel.setIconFromTexture(assets[key].data)
                    previewLabel.setIconSize(0.1);
                    previewLabel.icon.group.position.set(-0.2, 0, 0)
                    break;
                case ASSET_TYPE.MATERIAL:
                    previewLabel.registerElement(new ScreenElementMesh(this, previewLabel, { x: -0.2, geometry: this.screenManager.conjure.assetManager.defaultGeometry, material: assets[key].data, rotate:true, scale:0.075 }))
                    break;
                case ASSET_TYPE.GEOMETRY:
                    previewLabel.registerElement(new ScreenElementMesh(this, previewLabel, { x: -0.2, geometry: assets[key].data, material: this.screenManager.conjure.getWorld().defaultMaterial, rotate:true, scale:0.075 }))
                    break;
                default:break;
            }
            this.assetPanel.registerItem(previewLabel);
            this.assetList.push(previewLabel)
        }
        this.assetPanel.updateItems();
    }

    setOnSelectCallback(callback)
    {
        this.onSelectCallback = callback;
    }

    onAssetSelect(asset)
    {
        this.screenManager.conjure.assetManager.updateLastUsed(asset);
        if(this.onSelectCallback)
            this.onSelectCallback(asset)
    }

    updateAssets()
    {
        if(!this.active) return;
        this.getAssetsByType(this.currentAssetType);
    }

    update(updateArgs)
    {
        super.update(updateArgs);
    }
}