import TextRenderer3D from '../text/TextRenderer3D.js'
import ScreenElementBase from './ScreenElementBase.js'
import { easyPlane } from '../../core/util/MeshTemplates.js'
import { number } from '@AssetSync/common'

export default class ScreenElementText extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);
        this.z = number(args.z || 0.025);
        this.group.position.set(this.x, this.y, this.z);

        this.textObj = new TextRenderer3D(screen.screenManager.conjure, this.group, {
            text: args.text,
            fit: { x: this.width - 0.025, y: this.height - 0.025 },
            ...args.textSettings
        });

        if(args.background)
        {
            this.background = easyPlane({ width: this.width, height: this.height }, { color: 0x2685ff, transparent: true, opacity: args.backgroundOpacity === undefined ? 0.5 : args.backgroundOpacity });
            this.background.visible = true;
            this.group.add(this.background);
        }
    }
    
    setActive(active)
    {
        super.setActive(active);
    }

    getText()
    {
        return this.textObj.string;
    }
    
    getValue()
    {
        return this.textObj.string;
    }

    setText(text)
    {
        this.textObj.setText(text);
    }

    addIcon(icon)
    {
        // easyPlane(this.group, icon, 0xffffff, 0.4, 0.2);
    }

    setOnClickCallback(callback, args)
    {
        this.onClickCallbackArgs = args;
        this.onClickCallback = callback;
    }

    setDisabled(disable)
    {
        if(!this.active) return;
        super.setDisabled(disable);

    }

    onClick(clickable)
    {
        if(this.disabled) return;
        
        if(this.onClickCallback)
            this.onClickCallback(this.onClickCallbackArgs)
    }

    onUnClick(clickable)
    {
        if(this.disabled) return;
    }

    onMouseOver(clickable)
    {
        if(this.disabled) return;
    }

    onMouseOut(clickable)
    {
        if(this.disabled) return;
    }
}