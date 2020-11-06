import * as THREE from 'three'
import ScreenElementBase from './ScreenElementBase';
import ScreenElementScaler from './ScreenElementScaler';
import { number } from '../../util/number'

export default class ScreenElementColor extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.value = new THREE.Vector3();
        this.onValuesChanged = this.onValuesChanged.bind(this);

        this.xElement = new ScreenElementScaler(this.screen, this, { x: -this.width/2, width: 0.1, height: 0.075, ...args.textSettings })
        this.yElement = new ScreenElementScaler(this.screen, this, { width: 0.1, height: 0.075, ...args.textSettings })
        this.zElement = new ScreenElementScaler(this.screen, this, { x: this.width/2, width: 0.1, height: 0.075, ...args.textSettings })
        this.xElement.setUpdateCallback(this.onValuesChanged)
        this.yElement.setUpdateCallback(this.onValuesChanged)
        this.zElement.setUpdateCallback(this.onValuesChanged)
        this.registerElement(this.xElement)
        this.registerElement(this.yElement)
        this.registerElement(this.zElement)
    }

    onValuesChanged()
    {
        let val = '0x'
            + this.hex(Math.min(255, Math.max(0, Math.round(this.xElement.currentValue * 255))))
            + this.hex(Math.min(255, Math.max(0, Math.round(this.yElement.currentValue * 255))))
            + this.hex(Math.min(255, Math.max(0, Math.round(this.zElement.currentValue * 255))));
        console.log(val)
        this.value = val;
        console.log(this.value)
        // this.setValue(this.value)
        if(this.onClickCallback)
            this.onClickCallback(this.onClickCallbackArgs, this.value)
    }
    
    hex = d => number(d).toString(16).padStart(2, '0')
    dec = d => parseInt(d, 16);

    
    setSubject(vector3)
    {
        this.subject = vector3;
        this.setValue(this.subject)
    }

    setValue(value)
    {
        this.value = value;
        console.log(value.toString().substring(2, 4))
        this.xElement.setValue(this.dec(value.toString().substring(2, 4)))
        this.yElement.setValue(this.dec(value.toString().substring(4, 6)))
        this.zElement.setValue(this.dec(value.toString().substring(6, 8)))
    }

    getValue()
    {
        return this.value;
    }

    onClick(clickable)
    {
    }

    setDisabled(disable)
    {
        super.setDisabled(disable);
    }

    setActive(active)
    {
        super.setActive(active);
        this.setHTMLActive(active);
    }

    update(updateArgs)
    {
        super.update(updateArgs)
        if(!this.xElement.isEditing && !this.yElement.isEditing && !this.zElement.isEditing)
            this.setValue(this.subject);
    }
}