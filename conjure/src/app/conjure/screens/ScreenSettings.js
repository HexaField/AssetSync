import * as THREE from 'three'
import ScreenBase from './ScreenBase'
import ScreenElementButton from './elements/ScreenElementButton'
import ScreenElementSprite from './elements/ScreenElementSprite'
import { easyPlane } from '../util/MeshTemplates'

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

        this.allowCamButton = new ScreenElementButton(this, this, { y: this.height / 2 - 0.25, width: this.buttonWidth, height: this.buttonHeight, text: 'Allow Incoming Streams' });
        this.allowCamButton.setOnClickCallback(this.toggleFeeds)
        this.registerElement(this.allowCamButton)

        this.camPreview = easyPlane({ width: this.buttonWidth * 1.2, height: this.buttonWidth, material: new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true }) });
        this.camPreview.position.set(0, this.height / 2 - 0.55, 0.1)
        this.group.add(this.camPreview)
    }
    
    async toggleCam() {
        await this.conjure.toggleMediaStream()
        const enabled = this.conjure.userMediaStream !== undefined
        this.getCamButton.setText(enabled ? 'Disable Camera and Microphone' : 'Enable Camera and Microphone')
        console.log(this.conjure.userMediaStream)
        if(enabled) {
            const video = document.createElement('video')
            this.camPreview.material.map = new THREE.VideoTexture(video)
            this.camPreview.material.map.format = THREE.RGBAFormat
            if ('srcObject' in video) {
                video.srcObject = this.conjure.userMediaStream
            } else {
                video.src = window.URL.createObjectURL(this.conjure.userMediaStream) // for older browsers
            }
            video.play()
            video.volume = 0
            this.camPreview.material.needsUpdate = true
        } else {
            this.camPreview.material.map =  undefined
        }

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