import ScreenElementButton from './ScreenElementButton';

export default class ScreenElementCycleButton extends ScreenElementButton
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.values = ['undefined'];
        this.currentValue = 0;
    }

    setValues(values, def)
    {
        if(def)
            this.currentValue = def;
        this.values = values;
        this.setValue(this.currentValue);
    }

    setSubject(subject)
    {
        this.subject = subject;
        this.setValue(this.subject)
    }

    setValue(value)
    {
        if(typeof value === 'string')
            this.currentValue = this.getValueByString(value);
        else
            this.currentValue = value;
        this.setText(this.values[this.currentValue]);
        if(this.onChangeCallback)
            this.onChangeCallback(this.getValue(true))
    }

    setOnChangeCallback(callback)
    {
        this.onChangeCallback = callback;
    }

    getValue(actual)
    {
        if(actual)
            return this.values[this.currentValue];
        return this.currentValue;
    }

    getValueByString(str)
    {
        str = String(str);
        for(let val in this.values)
            if(str === this.values[val])
                return val;
        return -1;
    }

    setOnClickCallback(callback, returnValue)
    {
        this.returnValue = returnValue;
        this.onClickCallback = callback;
    }

    cycle()
    {
        this.currentValue++;
        if(this.currentValue >= this.values.length) 
            this.currentValue = 0;
        this.setValue(this.currentValue);
    }

    onClick(clickable)
    {
        if(this.disabled) return;
        this.cycle();
        if(this.onClickCallback)
            this.onClickCallback(this.returnValue ? this.values[this.currentValue] : this.currentValue);
    }
}