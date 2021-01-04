import ScreenBase from '../ScreenBase'
import HUDElementWatcher from './HUDElementWatcher'
import HUDElementConsole from './HUDElementConsole'
import HUDElementNotification from './HUDElementNotification'
import HUDElementAudioControls from './HUDElementAudioControls'


export default class HUDGlobal extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args)

        this.screenTitle.mesh.visible = false

        this.hudElements = []

        this.watcher = new HUDElementWatcher(this)
        this.hudElements.push(this.watcher)

        this.console = new HUDElementConsole(this)
        this.hudElements.push(this.console)

        this.notification = new HUDElementNotification(this)
        this.hudElements.push(this.notification)

        this.audioControls = new HUDElementAudioControls(this)
        this.hudElements.push(this.audioControls)

        window.CONSOLE = this

        this.autoHidden = false
    }

    getIsMouseOverhudElement()
    {
        for(let element of this.elements)
            if(element.mouseOver)
                return true
        return false
    }

    addWatchItem(label, reference, key)
    {
        this.watcher.addWatchItem(label, reference, key)
    }

    removeWatchItem(ref)
    {
        this.watcher.removeWatchItem(ref)
    }

    log(...text)
    {
        this.console.log(text)
    }

    showNotification(message, duration)
    {
        this.notification.showNotification(message, duration)
    }

    showScreen(active)
    {
        super.showScreen(active)
    }

    update(updateArgs)
    {
        super.update(updateArgs)
        for(let element of this.hudElements)
            element.update(updateArgs)
    }
}