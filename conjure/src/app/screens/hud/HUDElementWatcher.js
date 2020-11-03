import ScreenElementLabelled from '../elements/ScreenElementLabelled.js';
import ScreenElementText from '../elements/ScreenElementText.js';

export default class HUDElementWatcher
{  
    constructor(screen)
    {
        this.screen = screen
        this.watchItems = []
        this.watchItemsKey = []
        this.watchItemsLabel = []
        this.messageHeight = 0.06
    }

    addWatchItem(label, reference, key)
    {
        this.watchItems.push(reference)
        this.watchItemsKey.push(key)
        let element = new ScreenElementLabelled(
                        this.screen, this.screen, {
                            x: 1, height: 0.1, 
                            element: new ScreenElementText(this.screen, this.screen, { height: 0.1, textSettings: {scale:0.5, text:reference[key], anchorX:'left' } }),
                            autoUpdateSize:true, anchor:true, textSettings: {scale:0.5, anchorX:'right'}, label: label+': '
                        }
                    )
        this.screen.registerElement(element)
        this.watchItemsLabel.push(element)
        this.updateWatchItems()
    }

    removeWatchItem(reference)
    {
        for(let i in this.watchItems)
        {
            if(Object.is(this.watchItems[i], reference))
            {
                this.watchItemsLabel[i].destroy()
                this.screen.group.remove(this.watchItemsLabel[i].group)
                this.watchItems.splice(i, 1)
                this.watchItemsKey.splice(i, 1)
                this.watchItemsLabel.splice(i, 1)
                break;
            }
        }
        this.updateWatchItems()
    }

    updateWatchItems()
    {
        let y = 1
        for(let i in this.watchItems)
        {
            this.watchItemsLabel[i].group.position.setY(y)
            y -= this.messageHeight
        }
    }

    update()
    {
        for(let i in this.watchItems)
        {
            this.watchItemsLabel[i].element.setText(this.watchItems[i][this.watchItemsKey[i]])
        }
    }
}