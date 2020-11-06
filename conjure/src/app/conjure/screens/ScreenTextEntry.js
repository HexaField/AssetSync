import ScreenBase from './ScreenBase';
import ScreenElementTextBox from './elements/ScreenElementTextBox';
import ScreenElementButton from './elements/ScreenElementButton';

export default class ScreenTextEntry extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);

        this.group.add(this.background);
        this.callback = undefined

        this.textElement = new ScreenElementTextBox(this, this, { y: 0.075, width: 0.5, height: 0.1 })
        this.registerElement(this.textElement)

        this.doneButton = new ScreenElementButton(this, this, { y: -0.075, width: 0.5, height: 0.1, text: 'Done' })
        this.doneButton.setOnClickCallback(this.screenManager.hideLastOpenScreen)
        this.registerElement(this.doneButton)
        this.cancelled = false
    }

    setTitle(string)
    {
        this.screenTitle.setText(string)
    }

    setCallback(callback)
    {
        this.callback = callback
    }

    showScreen(active, args = {})
    {
        super.showScreen(active);
        if(args.callback)
            this.setCallback(args.callback)
    }

    update(updateArgs)
    {
        super.update(updateArgs);

        if(updateArgs.input.isPressed('ENTER', true))
        {
            if(this.callback)
                this.callback(this.textElement.getValue())
            this.screenManager.hideLastOpenScreen()
        }
        if(updateArgs.input.isPressed('HOME'))
        {
            this.screenManager.hideLastOpenScreen()
        }
    }
}