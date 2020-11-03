import ScreenElementButton from './ScreenElementButton';
import { number } from '@AssetSync/common'

export default class ScreenElementToggleButton extends ScreenElementButton
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.value = false;
    }

    setValue(value)
    {
        this.value = number(value);
        this.setText(this.value ? 'True' : 'False');
        if(this.onChangeCallback)
            this.onChangeCallback(this.getValue())
    }

    setOnChangeCallback(callback)
    {
        this.onChangeCallback = callback;
    }

    getValue()
    {
        return this.value;
    }

    onClick(clickable)
    {
        super.onClick(clickable);
        this.setValue(!this.value);
    }

    onUnClick(clickable)
    {
        super.onClick(clickable);
    }
}