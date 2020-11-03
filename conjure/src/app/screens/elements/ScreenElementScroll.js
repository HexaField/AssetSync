import * as THREE from 'three'
import { easyPlane } from '../../core/util/MeshTemplates.js'
import ScreenElementBase from './ScreenElementBase.js'
import ScreenElementButton from './ScreenElementButton.js'

export default class ScreenElementScroll extends ScreenElementBase
{  
    constructor(screen, parent, args = {})
    {
        super(screen, parent, args);

        this.background = easyPlane({ width: this.width, height: this.height }, { color: 0x2685ff, transparent: true, opacity: 0 });
        this.group.add(this.background);

        this.frameBorder = args.frameBorder || 0.05;
        this.onScrollerCallback = args.onScrollerCallback;
        
        this.scroller = easyPlane({ width: 0.05, height: 0.1 }, { color: 0x2685ff, transparent: true, opacity: 0.5 });
        this.scroller.position.set((args.scrollSide === 'left' ? -1 : 1) * (this.width / 2 - this.frameBorder), this.height / 2 - this.frameBorder, 0);
        this.group.add(this.scroller);

        this.scrollerTarget = easyPlane({ width: 0.05, height: this.height - this.frameBorder - this.frameBorder }, { color: 0x2685ff, transparent: true, opacity: 0.1 });
        this.scrollerTarget.position.set((args.scrollSide === 'left' ? -1 : 1) * (this.width / 2 - this.frameBorder), 0, 0);
        this.group.add(this.scrollerTarget);

        this.items = [];
        this.scrollerClicked = false;
        this.itemsHeight = 0.1;
        this.itemsGap = 0.05;
        this.scrollPercent = 0;
        this.y = 0;

        this.nestedElements = args.nestedElements;
    }

    registerItem(item)
    {
        this.items.push(item);
        this.registerElement(item);
    }

    addItem(item)
    {
        this.items.push(item);
    }

    updateItems(scrollPercent)
    {
        if(scrollPercent !== undefined)
            this.scrollPercent = scrollPercent;
        this.y = (this.height / 2) - (this.frameBorder * 2) + (this.scrollPercent * this.items.length * (this.itemsHeight + this.itemsGap));
        if(this.nestedElements)
            this.updateItemsRecursive(this.items)
        else
            for(let item of this.items)
            {
                item.group.position.setY(this.y);
                item.setHidden((this.y > this.height / 2 || this.y < -this.height / 2))
                this.y -= item.height + this.itemsGap;
            }
    }

    updateItemsRecursive(items)
    {
        for(let item of items)
        {
            if(!item.hidden)
            {
                item.group.position.setY(this.y);
                item.setHidden((this.y > this.height / 2 || this.y < -this.height / 2))
                this.y -= item.height + this.itemsGap;
                if(item.items)
                    this.updateItemsRecursive(item.items)
            }
        }
    }

    unSelectAll()
    {
        for(let i of this.items)
        {
            i.setSelected(false)
        }
    }

    removeAllItems()
    {
        for(let i of this.items)
        {
            i.destroy();
            this.removeElement(i);
            this.group.remove(i.group);
        }
        this.items = [];
    }
    
    removeItem(item)
    {
        for(let i in this.items)
            if(this.items[i] === item)
                {
                    this.removeElement(this.items[i]);
                    this.group.remove(this.items[i].group);
                    this.items.splice(i, 1);
                    return;
                }
    }

    setActive(active)
    {
        super.setActive(active)
        if(active)
            this.updateItems();
    }

    scrollerClick(pos)
    {
        this.scroller.position.setY(pos.y)
        
        if(pos.y > this.height/2 - this.frameBorder)
            this.scroller.position.setY(this.height/2 - this.frameBorder);
        if(pos.y < -this.height/2 + this.frameBorder)
            this.scroller.position.setY(-this.height/2 + this.frameBorder);

        let h = this.height - this.frameBorder - this.scroller.position.y - ((this.height + this.frameBorder) / 2)
        this.updateItems(h); // need to factor in how many items can fit into height of panel and adjust percentage accordingly

        if(this.onScrollerCallback)
            this.onScrollerCallback();
    }

    scrollerScroll(amount)
    {
        if(amount > 0 && this.scroller.position.y > this.height/2 - this.frameBorder)
            return;
        if(amount < 0 && this.scroller.position.y < -this.height/2 + this.frameBorder) 
            return;
        this.scroller.position.setY(this.scroller.position.y + amount * 0.05)

        if(this.scroller.position.y > this.height/2 - this.frameBorder)
            this.scroller.position.setY(this.height/2 - this.frameBorder);
        if(this.scroller.position.y < -this.height/2 + this.frameBorder)
            this.scroller.position.setY(-this.height/2 + this.frameBorder);

        let h = this.height - this.frameBorder - this.scroller.position.y - ((this.height + this.frameBorder) / 2)
        this.updateItems(h); // need to factor in how many items can fit into height of panel and adjust percentage accordingly

        if(this.onScrollerCallback)
            this.onScrollerCallback();
    }

    update(updateArgs)
    {
        super.update(updateArgs);

        let intersections = updateArgs.mouseRaycaster.intersectObject(this.background, false);
        if(intersections.length > 0)
        {
            if(updateArgs.input.scroll)
                this.scrollerScroll(updateArgs.input.scroll * 2);
            if(this.scrollerClicked)
                this.scrollerClick(this.group.worldToLocal(intersections[0].point));
        }

        intersections = updateArgs.mouseRaycaster.intersectObject(this.scrollerTarget, false);
        if(intersections.length > 0)
            if(updateArgs.input.isDown('MOUSELEFT', true))
                this.scrollerClick(this.group.worldToLocal(intersections[0].point));
            else if(updateArgs.input.isPressed('MOUSELEFT', true))
                this.scrollerClicked = true;

        if(this.scrollerClicked && updateArgs.input.isReleased('MOUSELEFT', true))
            this.scrollerClicked = false;
    }
}