import ScreenBase from './ScreenBase'
import ScreenElementButton from './elements/ScreenElementButton'
import ScreenElementJSONTree from './elements/ScreenElementJSONTree'
import ScreenElementScroll from './elements/ScreenElementScroll'


export default class ScreenServices extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);

        this.serviceManager = this.screenManager.conjure.getProfile().getServiceManager();

        this.group.add(this.background);

        this.selectService = this.selectService.bind(this);

        this.selectedService = undefined

        this.servicesScrollPanel = new ScreenElementScroll(this, this, { x: -0.4, width: 0.8, height: this.height - 0.1, scrollSide: 'left' });
        this.registerElement(this.servicesScrollPanel);

        this.jsonTree = new ScreenElementJSONTree(this, this, { x: 0.4, width: 0.8, height: this.height - 0.1 })
        this.registerElement(this.jsonTree);
        this.jsonTree.setHidden(true)
    }

    addServices()
    {
        for(let service of Object.keys(this.serviceManager.services))
        {
            let serviceButton = new ScreenElementButton(this, this.servicesScrollPanel, { width: this.buttonWidth, height: this.buttonHeight, text: service });
            serviceButton.setOnClickCallback(this.selectService, serviceButton)
            this.servicesScrollPanel.registerItem(serviceButton)
        }
    }

    selectService(serviceButton)
    {
        if(serviceButton) // use undefined to refresh services
        {
            if(this.selectedService)
                this.servicesScrollPanel.unSelectAll()
            
            if(serviceButton.getText() === this.selectedService)
            {
                this.selectedService = undefined
            }
            else
            {
                this.selectedService = serviceButton.getText()
                serviceButton.setSelected(true)
            }
        }
        if(this.selectedService)
        {
            this.jsonTree.setHidden(false)
            this.jsonTree.setSchema(this.screenManager.conjure.getProfile().getServiceManager().getService(this.selectedService).getSchema());
            this.jsonTree.updateTree(this.screenManager.conjure.getProfile().getServiceManager().getService(this.selectedService).getData(), this.selectService);
        }
        else
        {
            this.jsonTree.setHidden(true)
        }
    }

    showScreen(active)
    {
        super.showScreen(active);
        this.servicesScrollPanel.setActive(active);
    }

    update(updateArgs)
    {
        super.update(updateArgs)
    }
}