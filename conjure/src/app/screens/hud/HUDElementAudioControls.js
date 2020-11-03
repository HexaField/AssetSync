
import * as THREE from 'three'
import ScreenElementText from '../elements/ScreenElementText.js'
import ScreenElementSprite from '../elements/ScreenElementSprite.js'

export default class HUDElementAudioControls
{  
    constructor(screen)
    {
        this.screen = screen;
        this.active = false;
        this.group = new THREE.Group()
        this.screen.group.add(this.group)

        this.onMuteClick = this.onMuteClick.bind(this)

        // this.audioLevelText = new ScreenElementText(screen, this, { text: '0%', x: 0.75, width: 0.5, height: 0.2, autoUpdateSize:true, alignX: true })
        // this.audioLevelText.setHidden(true)
        this.audioLevelIcon = new ScreenElementSprite(screen, this, { x: 0.9, y: 0.9, width: 0.1, height: 0.1, anchor: true })
        this.screen.registerElement(this.audioLevelIcon)
        this.audioLevelIcon.load('speakermute')
        // this.audioLevelText.setHidden(true)
        this.audioLevelIcon.setOnClickCallback(this.onMuteClick)
    }

    autoHidden(hidden)
    {
        this.audioLevelIcon.group.visible = !hidden
    }

    async onMuteClick()
    {
        let muted = await this.audioManager.toggleMute()
        if(muted === 0)
            this.audioLevelIcon.load('speakermute')
        else
            this.audioLevelIcon.load('speaker')
    }

    setAudioManager(audioManager)
    {
        this.audioManager = audioManager
    }

    setLevel(amount)
    {

    }

    update(updateArgs)
    {
        
    }
}