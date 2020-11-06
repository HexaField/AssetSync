import { easyPlane } from '../../util/MeshTemplates'
import HTMLObject from '../../util/HTMLObject'
import ScreenElementBase from './ScreenElementBase' 
import * as THREE from 'three'
import ThreeTypeableText from 'three-typeable-text'

export default class ScreenElementTextBox extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.background = easyPlane({ width: this.width, height: this.height }, { color: 0x2685ff, transparent: true, opacity: 0.2 });
        this.background.castShadow = false;
        this.background.receiveShadow = false;

        this.onClickCallback = args.callback;

        this.group.add(this.background);
        // this.registerElement(this.button);

        this.updateValue = this.updateValue.bind(this)

        this.textObj = new ThreeTypeableText({
            camera: screen.camera,
            font: screen.conjure.getDefaultFont(),
            string: args.string || args.text || '',
            fontScale: 0.04,
            onChange: this.updateValue
        })
        this.textObj.getObject().position.setY(-0.025)
        this.textObj.getObject().position.setZ(0.025)
        this.group.add(this.textObj.getObject())
    }

    setValue(value)
    {
        this.value = String(value);
        this.setText(this.value);
    }

    setSubject(subject)
    {
        this.subject = subject; 
        this.setValue(this.subject)
    }

    updateValue(newValue)
    {
        this.value = String(newValue);
        if(this.onChangeCallback)
            this.onChangeCallback(this.getValue())
    }

    setOnExitCallback(callback)
    {
        this.onExitCallback = callback
    }

    setOnChangeCallback(callback)
    {
        this.onChangeCallback = callback
    }

    getValue()
    {
        return this.value
    }

    setText(text)
    {
        this.textObj.setText(text);
    }

    setActive(active)
    {
        super.setActive(active);
        if(!active)
            this.edit(false);
    }

    getIsFocused()
    {
        return this.focused
    }

    edit(flag)
    {
        if(this.focused === flag) return
        this.focused = flag;
        this.screen.screenManager.conjure.input.setEnabled(!flag);
        this.textObj.actionFocus(flag)
    }

    update(updateArgs)
    {
        super.update(updateArgs);
        if(this.disabled) return;
        if(!this.active) return;       
        this.textObj.updateCursor()
        
        if(updateArgs.input.isPressed('ENTER', true, true))
        {
            if(this.focused && this.onClickCallback)
                this.onClickCallback(this.onClickCallbackArgs, this.getValue());
            this.edit(false);
        }
        
        if(updateArgs.input.isDown('CONTROL', true))
        {
            if(updateArgs.input.isPressed('V', true))
            {
                navigator.clipboard.readText().then(clipText => this.setValue(clipText))
            }
        }

        // if(!this.focused && this.subject !== this.value) // update only when necessary
        //     this.setValue(this.subject);
    }

    setOnClickCallback(callback, args)
    {
        this.onClickCallbackArgs = args;
        this.onClickCallback = callback;
    }

    setDisabled(disable)
    {
        super.setDisabled(disable);
    }

    onClick(clickable)
    {
        if(this.disabled) return;
        this.edit(this.mouseOver)
    }

    onClickOutside(clickable)
    {
        if(this.disabled) return;
        this.edit(false)
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

// export default ScreenElement;