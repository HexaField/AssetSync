import ScreenElementBase from './ScreenElementBase';
import ScreenElementSprite from './ScreenElementSprite';
import ScreenElementText from './ScreenElementText';

export default class ScreenElementLabelled extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.value = false;
        this.element = args.element;
        this.gap = args.gap === undefined ? 0.02 : args.gap
        
        this.group.add(this.element.group);
        this.element.group.position.setX(this.width / 4 + this.gap)

        this.label = new ScreenElementText(screen, this, { x: -this.gap - this.width/4, width: this.width/4, height: this.height, text: args.label || 'label', textSettings: {...args.textSettings, anchorX:'right' } });

        this.updateCallback = Boolean(args.updateCallback)
        this.registerElement(this.element)
    }

    onValueUpdate()
    {
        if(this.updateCallback && this.onClickCallback)
            this.onClickCallback(this.onClickCallbackArgs)
    }

    destroy()
    {
        super.destroy();
    }

    setText(text, xOffset, yOffset)
    {
        this.label.setText(text);
    }

    getText()
    {
        return this.label.getText();
    }

    setIconFromTexture(texture)
    {
        this.label.setText('');

        this.icon = new ScreenElementSprite(this.screen, this, 0, 0, 0.1, 1, 1);
        this.icon.icon.material.map = texture;
    }

    setIconFromURL(textureURL)
    {
        this.label.setText('');

        this.icon = new ScreenElementSprite(this.screen, this, 0, 0, 0.1, 1, 1);
        this.icon.textureURL = textureURL;
        this.icon.load();
    }

    setIconSize(size)
    {
        if(this.icon && this.icon.icon)
        this.icon.icon.scale.set(size, size, size)
    }

    setValue(value)
    {
        this.element.setValue(value);
    }

    getValue()
    {
        return this.element.getValue();
    }

    setDisabled(disable)
    {
        super.setDisabled(disable);
    }

    setHidden(hidden)
    {
        super.setHidden(hidden);
    }

    setActive(active)
    {
        super.setActive(active);
        this.setHTMLActive(active);
    }

    update(updateArgs)
    {
        super.update(updateArgs)
    }
}