import * as THREE from 'three'
import TextRenderer3D from '../text/TextRenderer3D'
import { easyBox, easyPlane } from '../../util/MeshTemplates'
import ScreenElementBase from './ScreenElementBase'
import { number } from '../../util/number'

export default class ScreenElementSlider extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.background = easyBox({ width: this.width, height: this.height, depth: 0.1 }, { color: 0x2685ff });
        this.background.castShadow = false;
        this.background.receiveShadow = false;
        this.background.material.transparent = true;
        this.background.material.opacity = 0.5;

        this.isEditing = false;
        this.slider = easyPlane({ width: this.width, height: this.height }, { color: 0xffffff });
        this.slider.castShadow = false;
        this.slider.receiveShadow = false;
        this.slider.position.setZ(0.06);

        this.sliderTarget = easyPlane({ width: this.width*1.2, height: this.height }, { color: 0xffffff, transparent: true, opacity: 0 });
        this.sliderTarget.castShadow = false;
        this.sliderTarget.receiveShadow = false;
        this.sliderTarget.position.setZ(0.06);

        this.minValue = 0;
        this.maxValue = 100;

        this.group.add(this.background);
        this.group.add(this.slider);
        this.group.add(this.sliderTarget);

        // this.registerElement(this.sliderTarget);

        //sceneCSS, parent, string, colour, width, height, scale, editable
        this.textObj = new TextRenderer3D(screen.screenManager.conjure, this.group, { 
            string: 'slider', 
            fit: { x: this.width - 0.025, y: this.height - 0.025 },
            ...args.textSettings
         });
    }

    setDefaultValue(value)
    {
        this.default = value;
    }

    defaultValue()
    {
        if(this.default !== undefined)
            this.updateSlider(this.default)
        else
            this.updateSlider(0)
    }

    getValue()
    {
        if(this.step)
            return number(Math.round(THREE.Math.lerp(this.minValue, this.maxValue, this.sliderPercent)));
        else
            return number(THREE.Math.lerp(this.minValue, this.maxValue, this.sliderPercent));
    }

    setValues(args)
    {
        if(this.disabled) return;
        if(!this.active) return;
        
        if(args.length <= 1) return;
        this.step = args[0];
        this.minValue = args[1];
        this.maxValue = args[2];
        this.setDefaultValue(args[3]);
        this.updateSlider(this.default / this.maxValue);
    }

    updateSlider(percent)
    {
        if(this.disabled) return;
        if(!this.active) return;

        this.sliderPercent = THREE.MathUtils.clamp(percent, 0, 1);
        if(this.step)
            this.sliderPercent = Math.round(this.sliderPercent * (this.maxValue - this.minValue)) / (this.maxValue - this.minValue);
        this.slider.position.setX((-this.width/2) + (this.width*this.sliderPercent/2));
        this.slider.scale.setX(this.sliderPercent);
        this.setText(this.getValue());
    }

    setText(text, xOffset, yOffset)
    {
        if(this.step)
            this.textObj.setText(text);
        else
            this.textObj.setText(text.toFixed(2));
    }
    
    // setActive(active)
    // {
    //     super.setActive(active);
    // }

    update(updateArgs)
    {
        super.update(updateArgs);
        if(this.disabled) return;
        if(!this.active) return;

        if(updateArgs.input.isPressed('MOUSELEFT', true))
            if(updateArgs.input.isDown('SHIFT', true))
                this.defaultValue();
            else
                this.isEditing = true;
        if(updateArgs.input.isReleased('MOUSELEFT', true))
            this.isEditing = false;
        
        if(this.isEditing)
        {
            let intersections = updateArgs.mouseRaycaster.intersectObject(this.sliderTarget, false);
            if(intersections.length > 0)
            {
                var vector = this.vec3.copy(intersections[0].point);
                intersections[0].object.worldToLocal(vector);
                
                // console.log('x', Math.round(vector.x*100));
                let percent = ((this.width/2 + vector.x)/(this.width));
                // console.log('%', Math.round(percent*100));
                this.updateSlider(percent);
                this.onClickCallback(this.onClickCallbackArgs)
            }
        }
    }

    setOnClickCallback(callback)
    {
        this.onClickCallbackArgs = this;
        this.onClickCallback = callback;
    }

    setDisabled(disable)
    {
        super.setDisabled(disable);
    }
}