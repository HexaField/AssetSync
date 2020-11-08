import * as THREE from 'three'
import { number } from './util/number';

export default class AudioManager
{
    constructor(conjure)
    {
        this.conjure = conjure
        this.worldSync = conjure.worldSync
    }

    async create(waitForInput)
    {
        if(waitForInput)
        {
            this.conjure.getLoadingScreen().setText('WARNING!\n\nThis realm automatically plays audio.\nPlease click to continue.') 
            await this.conjure.getLoadingScreen().awaitInput()
        }
        
    }

    async load(label, url)
    {
        
    }

    createFromMediaSource(mediaElement, mesh, args = {})
    {
        
    }
    
    // { loop, volume, refDistance,  }
    play(buffer, args = {})
    {
        
    }

    setMasterVolume(amount)
    {
        
    }

    async toggleMute()
    {

    }

    update() {
        // send cam pos and changes
    }

}