import * as THREE from 'three'
import TextRenderer3D from '../text/TextRenderer3D'
import { easyPlane } from '../../util/MeshTemplates'
import ScreenElementBase from './ScreenElementBase';

export default class ScreenElementJSONCollapsible extends ScreenElementBase
{  
    constructor(screen, parent,  args = {})
    {
        super(screen, parent, args);

        this.tree = args.tree;
        this.selectable = args.selectable;

        this.button = easyPlane({ width: args.width, height: args.height }, { color: 0xffffff });
        this.button.castShadow = false;
        this.button.receiveShadow = false;
        this.button.material.transparent = true;
        this.button.material.opacity = 0.1;
        this.group.add(this.button);

        // this.registerElement(this.button);

        this.textObj = new TextRenderer3D(screen.screenManager.conjure, this.group, { 
            string: 'button',
            x: -this.width/2 + 0.05,
            anchorX: 'left',
            fit: { x: this.width - 0.025, y: this.height - 0.025 },
            scale: 0.75
        });
        this.textObj.group.position.set(0.05, 0.01, 0);
        this.selected = false;
        this.value = '';
        this.uncollapsed = true; // purpopsely negative so can easily read from JSON tree

        // let shape = new THREE.Shape();
        // shape.moveTo(-1, 0.1)
        // shape.moveTo(-1, -0.1)
        // shape.moveTo(0.05, 0)
        // let geometry = new THREE.ShapeBufferGeometry( shape );
        let geometry = new THREE.PlaneBufferGeometry( 0.03, 0.03, 1, 1 );

        let material = new THREE.MeshBasicMaterial( { side:THREE.DoubleSide, color: 0xffffff } );
        this.arrow = new THREE.Mesh( geometry, material ) ;
        this.arrow.position.set(-this.width / 2 + 0.05, 0, 0)
        this.group.add(this.arrow);

        this.setSelected = this.setSelected.bind(this)
        this.selected = false;

        this.items = [];
    }

    setSelected(selected, params = {})
    {
        this.selected = selected;
        if(this.onSelectedCallback && !params.ignoreCallback)
            this.onSelectedCallback(selected, this.onSelectedCallbackArgs)
        if(selected)
            this.addBorder()
        else
            this.removeBorder()
    }

    addItem(item)
    {
        this.items.push(item);
    }

    toggle()
    {
        this.uncollapsed = !this.uncollapsed;
        this.arrow.rotation.set(0, 0, this.uncollapsed ? 0 : Math.PI / 4)
    }

    setReference(ref)
    {
        this.reference = ref;
    }

    setHidden(hidden)
    {
        super.setHidden(hidden)
    }

    setValue(value)
    {
        this.value = String(value);
        this.setText(this.value);
    }

    getValue()
    {
        return this.value;
    }
    
    setActive(active)
    {
        super.setActive(active);
    }

    setText(text)
    {
        this.textObj.setText(text);
    }
    
    addIcon(icon)
    {
        // easyPlane(this.group, icon, 0xffffff, 0.4, 0.2);
    }

    setOnSelectedCallback(callback, args)
    {
        this.onSelectedCallbackArgs = args;
        this.onSelectedCallback = callback;
    }

    setOnHoverCallback(callback, args)
    {
        this.onHoverCallbackArgs = args;
        this.onHoverCallback = callback;
    }

    setOnClickCallback(callback, args)
    {
        this.onClickCallbackArgs = args;
        this.onClickCallback = callback;
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
        let intersections = updateArgs.mouseRaycaster.intersectObject(this.arrow, false);
        let overArrow = false;
        if(intersections.length > 0)
        {
            overArrow = true;
            if(updateArgs.input.isPressed('MOUSELEFT', true))
            {
                this.toggle();
                if(this.onClickCallback)
                   this.onClickCallback(this.onClickCallbackArgs)
            }
        }
        intersections = updateArgs.mouseRaycaster.intersectObject(this.targetBounds, false);
        if(intersections.length > 0)
        {
            this.hover(this, true);
            if(!overArrow && updateArgs.input.isPressed('MOUSELEFT', true))
                this.click(this, true);
        }
        else
        {
            if(updateArgs.input.isPressed('MOUSELEFT', true))
                this.click(this, false);
            this.hover(this, false);
        }
        if(updateArgs.input.isReleased('MOUSELEFT', true))
            this.click(this, false);
    }

    setDisabled(disable)
    {
        super.setDisabled(disable)
        if(disable)
            this.button.material.opacity = 0.2;
        else
            this.button.material.opacity = 0.5;

    }

    endDrag(elements)
    {
        for(let e of elements)
        {
            if(e.mouseOver && e instanceof ScreenElementJSONCollapsible)
            {
                if(e.reference && e.reference !== this.reference && e !== this && this.tree.collapsibleDragCallback)
                {
                    // console.log(e.reference, this.reference)
                    if(this.tree.collapsibleDragCallback(e.reference, this.reference))
                        this.tree.refresh();
                }
            }
        }
        // this.screen.draggingElement = undefined;
        this.screen.draggingElementOriginator = undefined;
    }

    onClick(clickable)
    {
        if(this.disabled) return;
        this.button.material.opacity = 0.8;
        if(this.reference)
        {
            // let el = new ScreenElementText(this.screen, this.screen, 0, 0, 0, this.width, this.height);
            // el.setText(this.getValue());
            // this.screen.draggingElement = el;
            this.screen.draggingElementOriginator = this;
        }
        if(this.selectable)
            this.setSelected(!this.selected)
    }
    
    onUnClick(clickable)
    {
        if(this.disabled) return;
        this.button.material.opacity = 0.5;
        if(this.reference)
        {
            // this.screen.draggingElement = undefined;
            this.screen.draggingElementOriginator = undefined;
        }
    }

    onMouseOver(clickable)
    {
        if(this.disabled) return;
        this.button.material.opacity = 0.5;
        if(this.onHoverCallback)
            this.onHoverCallback(true, this.onHoverCallbackArgs)
    }

    onMouseOut(clickable)
    {
        if(this.disabled) return;
        this.button.material.opacity = 0.2;
        if(this.onHoverCallback)
            this.onHoverCallback(false, this.onHoverCallbackArgs)
    }
}