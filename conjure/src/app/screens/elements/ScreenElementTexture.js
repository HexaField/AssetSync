import ScreenElementBase from './ScreenElementBase';
import ScreenElementButton from './ScreenElementButton';
import { easyPlane } from '../../util/MeshTemplates'
import ScreenElementTextBox from './ScreenElementTextBox';

export default class ScreenElementTexture extends ScreenElementBase
{  
    constructor(screen, parent, callback, args = {})
    {
        super(screen, parent, args);

        this.loadCallback = callback;
        this.load = this.load.bind(this)
        this.openTextBox = this.openTextBox.bind(this)
        this.editButton = new ScreenElementButton(screen, this, { x: 0.15, width: 0.3, height: 0.2 });
        this.editButton.setOnClickCallback(this.openTextBox);
        this.editButton.setText("Edit");
        this.group.add(this.editButton.group);
        
        this.textBox = new ScreenElementTextBox(screen, screen, { z: 0.2, width: 2, height: 1, callback: this.load });
        this.textBox.setText('https://cdn.discordapp.com/attachments/711163360175194154/715404619177525269/Screen_Shot_2020-05-28_at_13.22.00.png');
        this.textBox.setActive(false);

        this.icon = easyPlane({ width: 0.2, height: 0.2 }, { color: 0xffffff });
        this.icon.position.set(-0.2, 0, 0)
        this.group.add(this.icon);

        this.selected = false;
        this.texture = undefined;
        this.load();
    }

    openTextBox()
    {
        if(!this.active) return;
        this.textBox.setActive(true);
        this.textBox.setHTMLActive(true);
        this.screen.setTextBox(this.textBox);
        this.screen.pause(this.load);
    }

    load()
    {
        this.textBox.setActive(false);
        this.textBox.setHTMLActive(false);
        this.textBox.updateValue();
        this.screen.setTextBox(undefined);
        this.screen.screenManager.conjure.load.texture('https://cors-anywhere.herokuapp.com/' + this.textBox.getValue()).then(function(tex) {
            this.texture = tex;
            this.onLoad();
        }.bind(this)).catch((e)=>
        {
            console.log(e)
        })
    }

    onLoad()
    {
        this.loadCallback();
        this.icon.material.map = this.texture;
    }

    setValue(tex)
    {
        this.texture = tex;
    }

    getValue()
    {
        return this.texture;
    }

    addIcon(icon)
    {
        // easyPlane(this.group, icon, 0xffffff, 0.4, 0.2);
    }
    
    update(updateArgs)
    {
        super.update(updateArgs);
        this.editButton.update(updateArgs);
        this.textBox.update(updateArgs);
    }

    setDisabled(disable)
    {
        super.setDisabled(disable);
    }

    onClick(clickable)
    {
        if(this.disabled) return;
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