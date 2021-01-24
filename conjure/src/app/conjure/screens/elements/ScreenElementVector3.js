import * as THREE from 'three'
import ScreenElementBase from './ScreenElementBase';
import ScreenElementScaler from './ScreenElementScaler';

export default class ScreenElementVector3 extends ScreenElementBase
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
        this.value.set(this.xElement.currentValue, this.yElement.currentValue, this.zElement.currentValue);
        if(this.onClickCallback)
            this.onClickCallback(this.onClickCallbackArgs, this.value)
        if(this.onChangeCallback)
            this.onChangeCallback(this.value)
    }
    
    setSubject(vector3)
    {
        this.subject = vector3;
        this.setValue(this.subject)
    }

    setValue(value)
    {
        this.value = value;
        let keys = Object.keys(value);
        this.xElement.setValue(value[keys[0]])
        this.yElement.setValue(value[keys[1]])
        this.zElement.setValue(value[keys[2]])
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