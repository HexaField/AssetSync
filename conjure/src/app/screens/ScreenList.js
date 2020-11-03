import ScreenBase from './ScreenBase.js'
import ScreenElementButton from './elements/ScreenElementButton.js'
import ScreenElementLabelled from './elements/ScreenElementLabelled.js'
import ScreenElementScroll from './elements/ScreenElementScroll.js'

export default class ScreenList extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);

        this.group.add(this.background);

        this.onItemSelect = this.onItemSelect.bind(this);

        this.panel = new ScreenElementScroll(this, this, { width: 0.8, height: this.height, scrollSide: 'left'});
        this.registerElement(this.panel)
        this.panel.background.visible = false;

        this.list = [];
        this.buttonLabel = undefined
    }

    setOnSelectCallback(callback)
    {
        this.onSelectCallback = callback;
    }

    onItemSelect(item)
    {
        this.screenManager.hideLastOpenScreen()
        if(this.onSelectCallback)
            this.onSelectCallback(item)
    }

    setList(list, label)
    {
        this.panel.removeAllItems()
        if(list)
            this.list = list
        if(label)
            this.buttonLabel = label

        for(let i in this.list)
        {
            let button = new ScreenElementButton(this, this.panel, { width: 0.4, height: 0.1 })
            button.setText(this.buttonLabel ? this.list[i][this.buttonLabel] : this.list[i])
            button.setOnClickCallback(this.onItemSelect, this.list[i])
            // let label = new ScreenElementLabelled(this, this.panel, { x: 0.05, z: 0.1, width: 0.4, height: 0.1, element: button });
            this.panel.registerItem(button)
        }

        this.panel.updateItems()
    }

    // to instead process a list of objects, supply args.label
    showScreen(active, args = {})
    {
        super.showScreen(active)
    }

    update(updateArgs)
    {
        super.update(updateArgs);
    }
}