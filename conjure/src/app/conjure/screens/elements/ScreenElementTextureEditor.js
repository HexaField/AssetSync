import ScreenElementBase from './ScreenElementBase'
import ScreenElementSprite from './ScreenElementSprite'
import ScreenElementButton from './ScreenElementButton'

export default class ScreenElementTextureEditor extends ScreenElementBase
{  
    constructor(screen, parent, previewScale, args = {})
    {
        super(screen, parent, args)

        this.previewScale = previewScale
        
        this.openTextureEditor = this.openTextureEditor.bind(this)
        this.onTextureEdited = this.onTextureEdited.bind(this)

        this.preview = new ScreenElementSprite(this.screen, this, { x: -this.width/2 + this.previewScale/2, width: 1, height: 1 })
        this.preview.setIconScale(this.previewScale)
        this.registerElement(this.preview)

        this.selectorButton = new ScreenElementButton(screen, this, { x: this.width/2 - 0.1, width: 0.2, height: this.height })
        this.selectorButton.setOnClickCallback(this.openTextureEditor)
        this.selectorButton.setText('Edit')
        this.registerElement(this.selectorButton)
    }

    onTextureEdited(asset)
    {
        this.setAsset(asset)
        this.screen.screenManager.hideScreen(this.screen.screenManager.screenAssetSelect)
        if(this.onClickCallback)
            this.onClickCallback(asset)
    }

    openTextureEditor()
    {
        this.screen.screenManager.showScreen(this.screen.screenManager.screenTextureEditor)
        this.screen.screenManager.screenTextureEditor.setOnSelectCallback(this.onTextureEdited)
        this.screen.screenManager.screenTextureEditor.setAsset(this.asset)
    }

    onClick(){} // this is needed to override normal behaviour

    getValue(returnAsset)
    {
        if(!this.asset || !this.asset.data) return
        if(returnAsset)
            return this.asset
        return this.asset.data
    }

    setAsset(asset)
    {
        if(!asset || !asset.type) return
        console.log(asset)
        this.asset = asset
        
        this.preview.setIconTexture(asset.data)
    }
    
    update(updateArgs)
    {
        super.update(updateArgs)
    }
}