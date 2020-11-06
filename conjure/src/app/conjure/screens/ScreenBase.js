import * as THREE from 'three'
import { easyPlane, easyLine } from '../util/MeshTemplates'
import TextRenderer3D from './text/TextRenderer3D'
import { number } from '../util/number'

export default class ScreenBase
{  
    constructor(screenManager, args = {})
    {
        this.screenManager = screenManager;
        this.conjure = screenManager.conjure;
        this.camera = this.conjure.camera;
        this.world = this.conjure.getWorld();
        this.id = this.screenManager.screens === undefined ? -1 : this.screenManager.screens.length;
        this.screenName = args.name || "";
        this.anchor = Boolean(args.anchor) // this locks the x to be absolute from -1 to 1
        this.x = number(args.x);
        this.y = number(args.y);
        this.width = number(args.width);
        this.height = number(args.height);
        this.pauses = args.pauses;

        this.buttonWidth = 0.4
        this.buttonHeight = 0.1
        this.defaultColour = 0x2685ff
        this.defaultColour2 = 0x1E6ACC
        this.defaultColour3 = 0x1855A3
        this.defaultOpacity = 0.85
        this.background = easyPlane({ width: this.width, height: this.height}, { color: this.defaultColour3, transparent: true, opacity: this.defaultOpacity })
        this.background.receiveShadow = false
        // this.background.material.blending = THREE.MultiplyBlending

        this.aspectRatio = 1
        
        this.vec = new THREE.Vector3();
        this.group = new THREE.Group();
        // this.group.position.set(this.x, this.y, 0)

        this.screenManager.conjure.cameraScreenAttach.add(this.group); // this is for attaching to the camera follow

        // const light = new THREE.PointLight(0xa0a0a0, 0.5);
        // light.position.set(0, 2, 0);
        // this.group.add(light);

        this.screenTitle = new TextRenderer3D(this.screenManager.conjure, this.group, { string: this.screenName });
        this.screenTitle.group.position.set(0, this.height/2 + 0.1, 0.1);

        this.active = false;

        this.elements = [];

        this.debugLines = this.addDebugGrid();
        this.debugLines.visible = false;
        
        this.group.add(this.debugLines);

        this.mouseOver = false;
        this.activeTextBox = undefined;
        this.htmlObjects = [];

        this.draggingElement = undefined;
    }
    
    addHTML(obj)
    {
        this.htmlObjects.push(obj);
        obj.show(false);
    }

    setHTMLActive(active)
    {
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].setHTMLActive(active);
        
        for(let i = 0; i < this.htmlObjects.length; i++)
            this.htmlObjects[i].show(active);
    }

    setTextBox(box)
    {
        this.activeTextBox = box;
    }

    registerElement(element)
    {
        this.elements.push(element);
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

    showScreen(active, args = {})
    {
        this.active = active;
        this.group.visible = active;
        for(let i = 0; i < this.elements.length; i++)
        {
            this.elements[i].setActive(active);
            this.elements[i].setHTMLActive(active);
        }
        this.setHTMLActive(active)
    }

    addDebugGrid()
    {
        let group =  new THREE.Group();
        
        group.add(this.lines(false));
        group.add(this.lines(true));

        return group;
    }

    lines(rotated)
    {
        const grid_count = 2;
        const group = new THREE.Group();
        const size = 1
        for (let i = -grid_count; i <= grid_count; i++)
        {   
            group.add(easyLine({
                points: [
                    new THREE.Vector3(rotated ? -grid_count : i * size, rotated ? i * size: -grid_count, 0),
                    new THREE.Vector3(rotated ? grid_count : i * size, rotated ? i * size: grid_count, 0)
                ]
                }, { color: 0xffffff}
            ))
        }
        return group;
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

    update(updateArgs)
    {
        let intersections = updateArgs.mouseRaycaster.intersectObject(this.background, false);
        if(this.draggingElementOriginator)
        {
            if(intersections.length > 0)
            {
                if(updateArgs.input.isReleased('MOUSELEFT', true))
                {
                    if(this.draggingElementOriginator.endDrag)
                        this.draggingElementOriginator.endDrag(this.getAllElements())
                    // this.draggingElement = undefined;
                    this.draggingElementOriginator = undefined;
                }
                // if(updateArgs.input.isDown('MOUSELEFT', true))
                // {
                //     // console.log(intersections[0])
                //     this.draggingElement.group.position.setX(intersections[0].point.x)
                //     this.draggingElement.group.position.setY(intersections[0].point.y)
                // }
            }
        }
        if(intersections.length > 0 && this.active)
            this.mouseOver = true;
        else
            this.mouseOver = false;
        if(this.activeTextBox)
        {
            this.activeTextBox.update(updateArgs);
        }
        else
        {
            if(updateArgs.input.isPressed('k', true, true))
            {
                this.debugLines.visible = !this.debugLines.visible;
            }
            
            for(let i = 0; i < this.elements.length; i++)
                this.elements[i].update(updateArgs);

            for(let i = 0; i < this.htmlObjects.length; i++)
                this.htmlObjects[i].update();
        }
    }

    resizeScreen(ratio)
    {
        this.aspectRatio = ratio
        if(this.anchor)
            this.group.position.setX(this.x * ratio)
        for(let e of this.elements)
            e.resizeAnchor(ratio)
    }
}