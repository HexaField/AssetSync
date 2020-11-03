import ScreenBase from './ScreenBase'

export default class ScreenSettings extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args);

        this.group.add(this.background);
    }

    showScreen(active)
    {
        super.showScreen(active);
    }

    update(updateArgs)
    {
        super.update(updateArgs);
    }
}