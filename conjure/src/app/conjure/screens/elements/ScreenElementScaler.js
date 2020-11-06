import TextRenderer3D from '../text/TextRenderer3D'
import { easyPlane } from '../../util/MeshTemplates'
import ScreenElementBase from './ScreenElementBase';

// have option to do horz and vertz

export default class ScreenElementScaler extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.background = easyPlane({ width: this.width, height: this.height }, { color: 0x2685ff });
        this.background.castShadow = false;
        this.background.receiveShadow = false;
        this.background.material.transparent = true;
        this.background.material.opacity = 0.5;
        this.group.add(this.background);

        this.isEditing = false;

        this.value = 1;
        this.currentValue = 1;
        this.scalerValue = 0;
        this.clickY = 0;
        this.changeType = 'addition'; // 'multiply' 'addition'


        this.textObj = new TextRenderer3D(screen.screenManager.conjure, this.group, { 
            text: '0',
            scale: 0.75,
            fit: { x: this.width - 0.025, y: this.height - 0.025 },
            ...args.textSettings
        });
    }

    getValue()
    {
        return this.value;
    }

    setValue(value)
    {
        this.value = value;
        this.currentValue = value;
        this.setText(value);
        if(this.onChangeCallback)
            this.onChangeCallback(this.getValue())
    }

    setOnChangeCallback(callback)
    {
        this.onChangeCallback = callback;
    }

    updateSlider(difference)
    {
        if(this.disabled) return;
        if(!this.active) return;
        this.scalerValue = difference;
        this.currentValue = this.getNewValue(difference);
        this.setText(this.currentValue);
    }

    getNewValue(scalerValue)
    {
        if(this.changeType === 'multiply')
            return this.getValue() * (1 + scalerValue);
        else // addition
            return this.getValue() + scalerValue;
    }

    setText(text)
    {
        this.textObj.setText(Math.round(text * 100) / 100);
    }

    setDefaultValue(value)
    {
        this.default = value;
    }

    defaultValue()
    {
        console.log('default')
        if(this.default !== undefined)
            this.setValue(this.default)
        else
            this.setValue(0)
        if(this.updateCallback)
            this.updateCallback()
    }

    update(updateArgs)
    {
        super.update(updateArgs);
        if(this.disabled) return;
        if(!this.active) return;

        //

        if(updateArgs.input.isPressed('MOUSELEFT', true) && this.mouseOver)
        {
            if(updateArgs.input.isDown('SHIFT', true))
            {
                this.defaultValue();
            }
            else
            {
                this.clickY = updateArgs.input.mouse.y;
                this.isEditing = true;
            }
        }
        if(updateArgs.input.isReleased('MOUSELEFT', true) && this.isEditing)
        {
            this.isEditing = false;
            this.setValue(this.getNewValue(this.scalerValue));
            if(this.updateCallback)
                this.updateCallback()
        }
        
        if(this.isEditing)
        {
            this.updateSlider(-(this.clickY - updateArgs.input.mouse.y) * 10);
            if(this.updateCallback)
                this.updateCallback()
        }
    }

    setUpdateCallback(callback)
    {
        this.updateCallback = callback;
    }

    setDisabled(disable)
    {
        super.setDisabled(disable);
    }
}