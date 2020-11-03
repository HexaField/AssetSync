
import * as THREE from 'three'
import SpriteText from 'three-spritetext';

export default class TextRenderer2D
{
    constructor(parent, string, params = {})
    {
        this.group = new THREE.Group();
        this.text = new SpriteText(string);
        console.log(this.text)
        this.text.scale.set(1, 0.1, 0.1);

        this.group.add(this.text);
        parent.add(this.group);
    }

    setText(text)
    {
        this.text.text = text
        console.log(this.text)
    }

    getText()
    {
        return this.text.text
    }

    show(show)
    {
        this.group.visible = show
    }

    update()
    {
        
    }
}