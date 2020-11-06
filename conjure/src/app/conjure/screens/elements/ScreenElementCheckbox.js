import createText from '../text/createText'
import { easyPlane } from '../../util/MeshTemplates'
import ScreenElementBase from './ScreenElementBase';

export default class ScreenElementCheckbox extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.button = easyPlane({ width: args.width, height: args.height }, { color: 0x2685ff });
        this.button.castShadow = false;
        this.button.receiveShadow = false;
        this.button.material.transparent = true;
        this.button.material.opacity = 0.5;

        this.group.add(this.button);
        // this.registerElement(this.button);

        this.checked = false;
    }

    setActive(active)
    {
        super.setActive(active);
    }

    setChecked(checked)
    {
        this.checked = checked;
        if(checked)
            this.addBorder(0.01);
        else
            this.removeBorder();
    }

    setOnClickCallback(callback)
    {
        this.onClickCallback = callback;
    }
    
    update(updateArgs)
    {
        super.update(updateArgs);
    }

    onClick()
    {
        if(this.disabled) return;
        this.button.material.opacity = 1.0;
        this.setChecked(!this.checked)
        if(this.onClickCallback)
            this.onClickCallback(this.checked)
    }

    onUnClick()
    {
        if(this.disabled) return;
        this.button.material.opacity = 0.8;
    }

    onMouseOver()
    {
        if(this.disabled) return;
        this.button.material.opacity = 0.8;
    }

    onMouseOut()
    {
        if(this.disabled) return;
        this.button.material.opacity = 0.5;
    }
}