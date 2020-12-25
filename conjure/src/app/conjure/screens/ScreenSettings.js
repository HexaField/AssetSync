import ScreenBase from './ScreenBase'
import ScreenElementButton from './elements/ScreenElementButton'

export default class ScreenSettings extends ScreenBase
{  
    constructor(screenManager, args)
    {
        super(screenManager, args)

        this.group.add(this.background)
        this.toggleCam = this.toggleCam.bind(this)
        this.toggleFeeds = this.toggleFeeds.bind(this)
        
        this.getCamButton = new ScreenElementButton(this, this, { y: this.height / 2 - 0.1, width: this.buttonWidth, height: this.buttonHeight, text: 'Enable Camera and Microphone' });
        this.getCamButton.setOnClickCallback(this.toggleCam)
        this.registerElement(this.getCamButton)

        this.allowCamButton = new ScreenElementButton(this, this, { y: this.height / 2 - 0.3, width: this.buttonWidth, height: this.buttonHeight, text: 'Allow Incoming Streams' });
        this.allowCamButton.setOnClickCallback(this.toggleFeeds)
        this.registerElement(this.allowCamButton)
    }
    
    async toggleCam() {
        await this.conjure.toggleMediaStream()
        const enabled = this.conjure.userMediaStream !== undefined
        this.getCamButton.setText(enabled ? 'Disable Camera and Microphone' : 'Enable Camera and Microphone')
    }

    async toggleFeeds() {
        this.conjure.allowIncomingFeeds = !this.conjure.allowIncomingFeeds
        await this.conjure.updateIngoingMediaStream()
        this.allowCamButton.setText(this.conjure.allowIncomingFeeds ? 'Block Incoming Streams' : 'Allow Incoming Streams')
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