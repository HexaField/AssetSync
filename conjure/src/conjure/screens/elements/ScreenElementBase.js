import * as THREE from 'three'
import { easyPlane } from '../../util/MeshTemplates'
import { number } from '../../util/number'

export default class ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        this.width = args.width;
        this.height = args.height;
        this.innerWidth = this.width; // these are used for things like panels to change where bounds are
        this.innerHeight = this.height;

        this.scale = number(args.scale) || 1
        this._x = number(args.x || 0);
        this.x = this._x * screen.aspectRatio;
        this.y = number(args.y || 0);
        this.z = number(args.z || 0);
        this.anchorX = Boolean(args.anchor) // this locks the x to be absolute from -1 to 1
        this.screen = screen;
        this.parent = parent;
        this.group = new THREE.Group();
        this.vec3 = new THREE.Vector3();
        this.group.position.set(this.x, this.y, this.z);
        this.parent.group.add(this.group);
        
        this.defaultColour = 0x2685ff
        this.defaultColour2 = 0x1E6ACC
        this.defaultColour3 = 0x1855A3
        this.defaultOpacity = 0.75
        
        this.targetBounds = easyPlane({ width: this.width, height: this.height }, { color: 0xffffff });
        this.targetBounds.material.visible = false;
        this.group.add(this.targetBounds);

        this.name = args.name || 'Element ' + screen.elements.length;
        
        this.active = true;
        this.mouseOver = false;
        this.down = false;
        this.disabled = false;
        this.elements = [];
        this.htmlObjects = [];
        this.selected = false;

        this.userData = {}
    }
    
    addHTML(obj)
    {
        this.htmlObjects.push(obj);
        obj.show(false);
    }

    destroy()
    {
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].destroy();
        for(let i = 0; i < this.htmlObjects.length; i++)
            this.screen.screenManager.conjure.sceneCSS.remove(this.htmlObjects[i].objectCSS);
    }

    setSelected(selected)
    {
        this.selected = selected;
        if(selected)
            this.addBorder();
        else
            this.removeBorder();
    }

    registerElement(element)
    {
        this.elements.push(element);
    }
    
    addBorder(thickness = 0.01)
    {
        this.border = new THREE.Group();
        this.border.position.setZ(this.z);

        this.borderTop = easyPlane({ width: this.width, height: thickness }, { color: 0xffffff });
        this.borderTop.position.setY(this.height/2);
        this.border.add(this.borderTop);

        this.borderBottom = easyPlane({ width: this.width, height: thickness }, { color: 0xffffff });
        this.borderBottom.position.setY(-this.height/2);
        this.border.add(this.borderBottom);

        this.borderLeft = easyPlane({ width: thickness, height: this.height }, { color: 0xffffff });
        this.borderLeft.position.setX(this.width/2);
        this.border.add(this.borderLeft);

        this.borderRight = easyPlane({ width: thickness, height: this.height }, { color: 0xffffff });
        this.borderRight.position.setX(-this.width/2);
        this.border.add(this.borderRight);
        this.group.add(this.border);
    }

    setHTMLActive(active)
    {
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].setHTMLActive(active);
        
        for(let i = 0; i < this.htmlObjects.length; i++)
            this.htmlObjects[i].show(active);
    }

    setHTMLHidden(hidden)
    {
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].setHTMLHidden(hidden);
        
        for(let i = 0; i < this.htmlObjects.length; i++)
            this.htmlObjects[i].show(!hidden);
    }

    setOnClickCallback(callback, args)
    {
        this.onClickCallbackArgs = args;
        this.onClickCallback = callback;
    }

    removeBorder()
    {
        if(this.border)
            this.group.remove(this.border);
    }

    setHidden(hidden)
    {
        this.hidden = hidden;
        this.group.visible = !hidden;
        for(let i = 0; i < this.elements.length; i++)
        {
            this.elements[i].setHidden(hidden);
        }
        this.setHTMLHidden(hidden)
        if(!hidden)
            this.setActive(this.parent.active)
    }

    setActive(active)
    {
        this.active = active;
        if(this.hidden)
            this.active = false
        this.group.visible = this.active;
        for(let i = 0; i < this.elements.length; i++)
        {
            this.elements[i].setActive(this.active);
        }
        this.setHTMLActive(this.active)
    }

    setDisabled(disable)
    {
        this.disabled = disable;
    }

    getAllElements()
    {
        let elements = [];
        for(let e of this.elements)
        {
            for(let e2 of e.getAllElements())
                elements.push(e2);
            elements.push(e);
        }
        return elements;
    }
    
    getElementByName(name)
    {
        for(let i = 0; i < this.elements.length; i++)
            if(this.elements[i].name === name)
                return this.elements[i]
    }

    removeElementByName(name)
    {
        for(let i = 0; i < this.elements.length; i++)
            if(this.elements[i].name === name)
                this.elements.splice(i, 1);
    }

    removeElement(element)
    {
        for(let i = 0; i < this.elements.length; i++)
            if(this.elements[i] === element)
                this.elements.splice(i, 1);
    }

    update(updateArgs)
    {
        for(let i = 0; i < this.elements.length; i++)
        {
            // if(this.elements[i].active)
            this.elements[i].update(updateArgs);
        }

        for(let i = 0; i < this.htmlObjects.length; i++)
            this.htmlObjects[i].update(updateArgs);
        
        if(this.disabled) return;
        if(!this.active) return;
        if(this.hidden) return;

        let intersections = updateArgs.mouseRaycaster.intersectObject(this.targetBounds, false);
        this.hover(this, intersections.length > 0)
        if(updateArgs.input.isPressed('MOUSELEFT', true, true))
            this.click(this, true);
        if(updateArgs.input.isReleased('MOUSELEFT', true, true))
            this.click(this, false);
    }

    onClick(clickable)
    {
        if(this.disabled) return;
        
        if(this.onClickCallback)
            this.onClickCallback(this.onClickCallbackArgs)
    }

    onClickOutside(clickable)
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

    click(clickable, isClicked)
    {
        if(this.disabled) return
        if(!this.active) return
        if(isClicked)
        {
            this.isClicked = true
            if(this.mouseOver)
                this.onClick(clickable)
            else
                this.onClickOutside(clickable)
        }
        else if(this.isClicked)
        {
            this.isClicked = false
            this.onUnClick(clickable)
        }
    }

    hover(clickable, over)
    {
        if(!this.active) return;
        // if(this.isClicked) return;

        if(over)
        {
            if(!this.mouseOver)
            {
                this.mouseOver = true;
                this.onMouseOver(clickable);
            }
        }
        else
        {
            this.mouseOver = false;
            this.onMouseOut(clickable);
        }
    }

    resizeAnchor(ratio)
    {
        for(let e of this.elements)
            e.resizeAnchor(ratio)
        if(!this.anchorX) return;
        this.group.position.setX(this._x * ratio)
    }
}

// export default ScreenElement;