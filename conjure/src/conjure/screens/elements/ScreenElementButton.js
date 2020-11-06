import TextRenderer3D from '../text/TextRenderer3D'
import { easyBox } from '../../util/MeshTemplates'
import ScreenElementBase from './ScreenElementBase';
import * as THREE from 'three'

export default class ScreenElementButton extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.button = easyBox({ width: this.width, height: this.height, depth: 0.025 }, { color: this.defaultColour });
        this.button.material.transparent = true;
        this.button.material.opacity = this.defaultOpacity;
        this.button.material.blending = THREE.NormalBlending

        this.group.add(this.button);

        this.textObj = new TextRenderer3D(screen.screenManager.conjure, this.group, {
            text: args.text || 'button',
            scale: 0.75,
            fit: { x: this.width - 0.025, y: this.height - 0.025 },
            ...args.textSettings
        });
        this.textObj.group.position.setZ(0.025);
        this.value = '';
    }

    setValue(value)
    {
        this.value = String(value);
        this.setText(this.value);
    }

    getValue()
    {
        return this.value;
    }
    
    setActive(active)
    {
        super.setActive(active);
    }

    setText(text)
    {
        this.textObj.setText(text);
    }

    getText()
    {
        return this.textObj.string
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
    
    update(updateArgs)
    {
        super.update(updateArgs);
    }

    setDisabled(disable)
    {
        if(!this.active) return;
        super.setDisabled(disable);
        if(disable)
            this.button.material.opacity = 0.2;
        else
            this.button.material.opacity = 0.5;

    }

    onClick(clickable)
    {
        if(this.disabled) return;
        
        this.button.material.opacity = 1.0;
        if(this.onClickCallback)
            this.onClickCallback(this.onClickCallbackArgs)
    }

    onUnClick(clickable)
    {
        if(this.disabled) return;
        // this.button.material.opacity = 0.8;
    }

    onMouseOver(clickable)
    {
        if(this.disabled) return;
        this.button.material.opacity = 0.8;
    }

    onMouseOut(clickable)
    {
        if(this.disabled) return;
        this.button.material.opacity = 0.5;
    }
}

// export default ScreenElement;