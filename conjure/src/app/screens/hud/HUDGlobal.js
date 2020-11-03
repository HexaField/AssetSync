import ScreenBase from '../ScreenBase.js'
import HUDElementWatcher from './HUDElementWatcher.js'
import HUDElementConsole from './HUDElementConsole.js'
import HUDElementNotification from './HUDElementNotification.js'
import HUDElementAudioControls from './HUDElementAudioControls.js'


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

        global.CONSOLE = this

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
        
        if(this.conjure.getControls().getPointerLockState() !== this.autoHidden)
        {
            this.autoHidden = this.conjure.getControls().getPointerLockState()
            for(let element of this.hudElements)
                if(element.autoHidden)
                    element.autoHidden(this.autoHidden)
        }
    }
}